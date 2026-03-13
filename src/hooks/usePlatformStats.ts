import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PlatformStats {
  sellerCount: number;
  completedOrders: number;
  avgRating: number | null;
  countryCount: number;
}

/** Fetches live platform-wide aggregate statistics from Supabase. */
export function usePlatformStats() {
  return useQuery<PlatformStats>({
    queryKey: ["platform-stats"],
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    queryFn: async (): Promise<PlatformStats> => {
      const [sellersRes, ordersRes, ratingsRes, countriesRes] = await Promise.all([
        // Number of verified sellers
        supabase
          .from("profiles")
          .select("user_id", { count: "exact", head: true })
          .eq("is_seller", true),

        // Number of completed orders
        supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("status", "completed"),

        // Average review rating across the entire platform
        supabase.from("reviews").select("rating"),

        // Number of distinct countries represented by sellers
        supabase
          .from("profiles")
          .select("country")
          .eq("is_seller", true)
          .not("country", "is", null),
      ]);

      const sellerCount = sellersRes.count ?? 0;
      const completedOrders = ordersRes.count ?? 0;

      const ratings = ratingsRes.data ?? [];
      const avgRating =
        ratings.length > 0
          ? Math.round(
              (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length) * 10
            ) / 10
          : null;

      const uniqueCountries = new Set(
        (countriesRes.data ?? []).map((p) => p.country).filter(Boolean)
      );
      const countryCount = uniqueCountries.size;

      return { sellerCount, completedOrders, avgRating, countryCount };
    },
  });
}
