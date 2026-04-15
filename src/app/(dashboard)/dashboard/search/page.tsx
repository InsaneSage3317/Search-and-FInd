import { getItems } from "@/app/actions/items";
import { getZones } from "@/app/actions/zones";
import { SearchPageClient } from "./search-client";

export default async function SearchPage() {
  const [items, zones] = await Promise.all([getItems(), getZones()]);

  return <SearchPageClient initialItems={items} zones={zones} />;
}
