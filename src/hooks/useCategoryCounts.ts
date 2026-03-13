import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Map of category id → count of active gigs in that category. */
export function useCategoryCounts() {
  return useQuery<Record<string, number>>({
    queryKey: ["category-counts"],
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    queryFn: async (): Promise<Record<string, number>> => {
      const { data, error } = await supabase
        .from("gigs")
        .select("category")
        .eq("status", "active");

      if (error || !data) return {};

      const counts: Record<string, number> = {};
      for (const { category } of data) {
        counts[category] = (counts[category] ?? 0) + 1;
      }
      return counts;
    },
  });
}
