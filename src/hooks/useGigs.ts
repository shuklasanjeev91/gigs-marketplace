import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { GigCardData } from "@/lib/data";

export interface UseGigsOptions {
  query?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  /** Max delivery days (null = any) */
  deliveryDays?: number | null;
  sellerLevel?: string | null;
  /** Filter gigs to a specific seller */
  sellerId?: string;
  limit?: number;
  sortBy?: "recommended" | "price-low" | "price-high" | "rating" | "reviews";
}

export function useGigs(options: UseGigsOptions = {}) {
  return useQuery({
    queryKey: ["gigs", options],
    queryFn: async (): Promise<GigCardData[]> => {
      // ── 1. Seller-level pre-filter (get matching seller_ids) ──────────────
      let sellerIdFilter: string[] | null = null;
      if (options.sellerLevel && options.sellerLevel !== "all") {
        const { data: levelProfiles } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("seller_level", options.sellerLevel)
          .eq("is_seller", true);

        if (!levelProfiles || levelProfiles.length === 0) return [];
        sellerIdFilter = levelProfiles.map((p) => p.user_id);
      }

      // ── 2. Gigs query ─────────────────────────────────────────────────────
      let gigsQuery = supabase
        .from("gigs")
        .select("id, title, category, price, delivery_days, tags, image_url, seller_id")
        .eq("status", "active");

      if (options.category && options.category !== "all") {
        gigsQuery = gigsQuery.eq("category", options.category);
      }
      if (options.priceMin !== undefined) {
        gigsQuery = gigsQuery.gte("price", options.priceMin);
      }
      if (options.priceMax !== undefined) {
        gigsQuery = gigsQuery.lte("price", options.priceMax);
      }
      if (options.deliveryDays) {
        gigsQuery = gigsQuery.lte("delivery_days", options.deliveryDays);
      }
      if (options.query) {
        gigsQuery = gigsQuery.or(
          `title.ilike.%${options.query}%,description.ilike.%${options.query}%`
        );
      }
      if (sellerIdFilter) {
        gigsQuery = gigsQuery.in("seller_id", sellerIdFilter);
      }
      if (options.sellerId) {
        gigsQuery = gigsQuery.eq("seller_id", options.sellerId);
      }
      if (options.sortBy === "price-low") {
        gigsQuery = gigsQuery.order("price", { ascending: true });
      } else if (options.sortBy === "price-high") {
        gigsQuery = gigsQuery.order("price", { ascending: false });
      } else {
        gigsQuery = gigsQuery.order("created_at", { ascending: false });
      }
      if (options.limit) {
        gigsQuery = gigsQuery.limit(options.limit);
      }

      const { data: gigsData, error: gigsError } = await gigsQuery;
      if (gigsError) throw gigsError;
      if (!gigsData || gigsData.length === 0) return [];

      // ── 3. Enrich with seller profile ─────────────────────────────────────
      const sellerIds = [...new Set(gigsData.map((g) => g.seller_id))];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, country, seller_level")
        .in("user_id", sellerIds);

      const profileMap = new Map(
        (profilesData ?? []).map((p) => [p.user_id, p])
      );

      // ── 4. Enrich with review stats ───────────────────────────────────────
      const gigIds = gigsData.map((g) => g.id);
      const { data: reviewStats } = await supabase
        .from("reviews")
        .select("gig_id, rating")
        .in("gig_id", gigIds);

      const ratingMap = new Map<string, { sum: number; count: number }>();
      (reviewStats ?? []).forEach((r) => {
        const cur = ratingMap.get(r.gig_id) ?? { sum: 0, count: 0 };
        ratingMap.set(r.gig_id, { sum: cur.sum + r.rating, count: cur.count + 1 });
      });

      // ── 5. Merge ──────────────────────────────────────────────────────────
      let result: GigCardData[] = gigsData.map((gig) => {
        const profile = profileMap.get(gig.seller_id);
        const stats = ratingMap.get(gig.id);
        return {
          id: gig.id,
          title: gig.title,
          category: gig.category,
          price: gig.price,
          delivery_days: gig.delivery_days,
          tags: gig.tags,
          image_url: gig.image_url,
          seller_id: gig.seller_id,
          seller: profile
            ? {
                display_name: profile.display_name,
                avatar_url: profile.avatar_url,
                country: profile.country,
                seller_level: profile.seller_level,
              }
            : null,
          avg_rating: stats ? Math.round((stats.sum / stats.count) * 10) / 10 : null,
          review_count: stats?.count ?? null,
        };
      });

      // Client-side sort by rating / review-count (needs full result set)
      if (options.sortBy === "rating") {
        result = result.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
      } else if (options.sortBy === "reviews") {
        result = result.sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0));
      }

      return result;
    },
  });
}

/** Fetch a single gig by id, enriched with seller profile and reviews. */
export function useGig(id: string | undefined) {
  return useQuery({
    queryKey: ["gig", id],
    enabled: !!id,
    queryFn: async (): Promise<GigCardData | null> => {
      if (!id) return null;
      const { data: gig, error } = await supabase
        .from("gigs")
        .select("id, title, category, price, delivery_days, tags, image_url, seller_id, description")
        .eq("id", id)
        .single();

      if (error || !gig) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, country, seller_level, member_since, bio, skills")
        .eq("user_id", gig.seller_id)
        .single();

      const { data: reviewStats } = await supabase
        .from("reviews")
        .select("rating")
        .eq("gig_id", id);

      const count = reviewStats?.length ?? 0;
      const sum = (reviewStats ?? []).reduce((s, r) => s + r.rating, 0);

      return {
        id: gig.id,
        title: gig.title,
        category: gig.category,
        price: gig.price,
        delivery_days: gig.delivery_days,
        tags: gig.tags,
        image_url: gig.image_url,
        seller_id: gig.seller_id,
        seller: profile
          ? {
              display_name: profile.display_name,
              avatar_url: profile.avatar_url,
              country: profile.country,
              seller_level: profile.seller_level,
            }
          : null,
        avg_rating: count > 0 ? Math.round((sum / count) * 10) / 10 : null,
        review_count: count > 0 ? count : null,
      };
    },
  });
}
