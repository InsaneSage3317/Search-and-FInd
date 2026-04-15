import { getItems } from "@/app/actions/items";
import { getZones } from "@/app/actions/zones";
import { SearchPageClient } from "./search-client";

export default async function SearchPage() {
  try {
    const [items, zones] = await Promise.all([getItems(), getZones()]);
    return <SearchPageClient initialItems={items} zones={zones} />;
  } catch (error) {
    console.error("SearchPage Fetch Error:", error);
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <PackageSearch className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold italic tracking-tight text-white">Something went wrong</h2>
          <p className="text-sm text-muted-foreground">Failed to load search data. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
}
