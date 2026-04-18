import Fuse from "fuse.js";

/**
 * Smart Lost & Found Matching Engine
 * 
 * Scoring algorithm:
 *   - Text Similarity (Fuse.js):  60% weight — fuzzy matches on title + description + category
 *   - Zone Proximity:             25% weight — same zone = full score, different = 0
 *   - Temporal Validity:          15% weight — found AFTER lost = full score, decays over 14 days
 * 
 * Only LOST↔FOUND pairs are matched. A match score ≥ 0.55 triggers a notification.
 */

export type MatchableItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "LOST" | "FOUND";
  zoneId: string;
  zoneName: string;
  createdAt: Date;
};

export type MatchResult = {
  lostItemId: string;
  foundItemId: string;
  score: number;           // 0-1 composite score
  textScore: number;       // 0-1 fuse.js similarity
  zoneScore: number;       // 0 or 1 (same zone)
  temporalScore: number;   // 0-1 time decay
  lostItem: MatchableItem;
  foundItem: MatchableItem;
};

const WEIGHTS = {
  text: 0.60,
  zone: 0.25,
  temporal: 0.15,
};

const MATCH_THRESHOLD = 0.65;  // Increased from 0.55 for higher confidence
const TEMPORAL_DECAY_DAYS = 14; 
const CATEGORY_MISMATCH_PENALTY = 0.4; // 40% of original score if categories differ

/**
 * Calculate text similarity between two items using multiple signals
 */
function getTextScore(lostItem: MatchableItem, foundItem: MatchableItem): number {
  // Signal 1: Search lost title in found item fields
  const fuse1 = new Fuse([foundItem], {
    keys: ["title", "description", "category"],
    includeScore: true,
    threshold: 0.6, // Stricter threshold (0.7 -> 0.6)
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
  const r1 = fuse1.search(lostItem.title);
  const score1 = r1.length > 0 ? 1 - (r1[0].score ?? 1) : 0;

  // Signal 2: Search found title in lost item fields
  const fuse2 = new Fuse([lostItem], {
    keys: ["title", "description", "category"],
    includeScore: true,
    threshold: 0.6, // Stricter threshold
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
  const r2 = fuse2.search(foundItem.title);
  const score2 = r2.length > 0 ? 1 - (r2[0].score ?? 1) : 0;

  // Signal 3: Keyword overlap (simple but effective)
  const lostWords = new Set(
    `${lostItem.title} ${lostItem.description}`.toLowerCase()
      .split(/\W+/).filter(w => w.length > 2)
  );
  const foundWords = new Set(
    `${foundItem.title} ${foundItem.description}`.toLowerCase()
      .split(/\W+/).filter(w => w.length > 2)
  );
  const overlap = [...lostWords].filter(w => foundWords.has(w)).length;
  const totalUnique = new Set([...lostWords, ...foundWords]).size;
  const score3 = totalUnique > 0 ? overlap / totalUnique : 0;

  // Take the best of all signals
  return Math.max(score1, score2, score3);
}

/**
 * Zone proximity: 1 if same zone, 0 otherwise
 */
function getZoneScore(lostItem: MatchableItem, foundItem: MatchableItem): number {
  return lostItem.zoneId === foundItem.zoneId ? 1.0 : 0.0;
}

/**
 * Temporal validity:
 *  - Found MUST be after Lost (or same day) → otherwise 0
 *  - Score decays linearly over TEMPORAL_DECAY_DAYS
 */
function getTemporalScore(lostItem: MatchableItem, foundItem: MatchableItem): number {
  const lostTime = lostItem.createdAt.getTime();
  const foundTime = foundItem.createdAt.getTime();
  
  // Found before lost → invalid temporal match
  if (foundTime < lostTime - 86400000) return 0; // 1 day grace
  
  const daysDiff = Math.abs(foundTime - lostTime) / (1000 * 60 * 60 * 24);
  
  if (daysDiff <= 1) return 1.0;  // Same day or next day = perfect
  if (daysDiff >= TEMPORAL_DECAY_DAYS) return 0.0;
  
  return 1.0 - (daysDiff / TEMPORAL_DECAY_DAYS);
}

/**
 * Find matches for a single item against a list of candidate items.
 * If the item is LOST, candidates should be FOUND items, and vice versa.
 */
export function findMatchesForItem(
  item: MatchableItem,
  candidates: MatchableItem[]
): MatchResult[] {
  const isLost = item.type === "LOST";
  
  // Filter to opposite type only
  const oppositeCandidates = candidates.filter(
    (c) => c.type !== item.type && c.id !== item.id
  );

  const results: MatchResult[] = [];

  for (const candidate of oppositeCandidates) {
    const lostItem = isLost ? item : candidate;
    const foundItem = isLost ? candidate : item;

    const categoryMatch = lostItem.category === foundItem.category;
    const isOtherCategory = lostItem.category === "Other" || foundItem.category === "Other";
    
    // Category mismatch penalty (unless one is 'Other')
    const categoryPenalty = (!categoryMatch && !isOtherCategory) ? CATEGORY_MISMATCH_PENALTY : 1.0;

    const textScore = getTextScore(lostItem, foundItem);
    const zoneScore = getZoneScore(lostItem, foundItem);
    const temporalScore = getTemporalScore(lostItem, foundItem);

    // Bonus if categories match exactly
    const categoryBonus = categoryMatch ? 0.05 : 0;

    const rawScore = (
      textScore * WEIGHTS.text +
      zoneScore * WEIGHTS.zone +
      temporalScore * WEIGHTS.temporal +
      categoryBonus
    );

    const compositeScore = Math.min(1, rawScore * categoryPenalty);

    if (compositeScore >= MATCH_THRESHOLD) {
      results.push({
        lostItemId: lostItem.id,
        foundItemId: foundItem.id,
        score: Math.round(compositeScore * 100) / 100,
        textScore: Math.round(textScore * 100) / 100,
        zoneScore,
        temporalScore: Math.round(temporalScore * 100) / 100,
        lostItem,
        foundItem,
      });
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Run full matching across all REPORTED items.
 * Returns all match pairs above threshold, deduplicated.
 */
export function runFullMatching(items: MatchableItem[]): MatchResult[] {
  const lostItems = items.filter((i) => i.type === "LOST");
  const foundItems = items.filter((i) => i.type === "FOUND");

  const allMatches: MatchResult[] = [];
  const seen = new Set<string>();

  for (const lost of lostItems) {
    const matches = findMatchesForItem(lost, foundItems);
    for (const match of matches) {
      const key = `${match.lostItemId}:${match.foundItemId}`;
      if (!seen.has(key)) {
        seen.add(key);
        allMatches.push(match);
      }
    }
  }

  return allMatches.sort((a, b) => b.score - a.score);
}
