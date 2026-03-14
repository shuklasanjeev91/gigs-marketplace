import type { GigCardData } from "@/lib/data";

/**
 * Fiverr-inspired mock gig data covering all 10 service categories.
 * Shown alongside real user-created gigs on the marketplace.
 * IDs are prefixed with "mock-" so they are distinguishable from Supabase rows.
 */

const MOCK_SELLERS = [
  { id: "mock-seller-1",  display_name: "Alex Rivera",     country: "US", seller_level: "Top Rated", avatar_url: null },
  { id: "mock-seller-2",  display_name: "Priya Sharma",    country: "IN", seller_level: "Level 2",   avatar_url: null },
  { id: "mock-seller-3",  display_name: "Carlos Mendez",   country: "MX", seller_level: "Level 2",   avatar_url: null },
  { id: "mock-seller-4",  display_name: "Sophie Laurent",  country: "FR", seller_level: "Top Rated", avatar_url: null },
  { id: "mock-seller-5",  display_name: "David Chen",      country: "SG", seller_level: "Level 1",   avatar_url: null },
  { id: "mock-seller-6",  display_name: "Aisha Nwosu",     country: "NG", seller_level: "Level 2",   avatar_url: null },
  { id: "mock-seller-7",  display_name: "Ivan Petrov",     country: "UA", seller_level: "Top Rated", avatar_url: null },
  { id: "mock-seller-8",  display_name: "Yuki Tanaka",     country: "JP", seller_level: "Level 1",   avatar_url: null },
  { id: "mock-seller-9",  display_name: "Emma Wilson",     country: "GB", seller_level: "Top Rated", avatar_url: null },
  { id: "mock-seller-10", display_name: "Ravi Gupta",      country: "IN", seller_level: "Level 2",   avatar_url: null },
  { id: "mock-seller-11", display_name: "Maria Santos",    country: "BR", seller_level: "Level 1",   avatar_url: null },
  { id: "mock-seller-12", display_name: "James Okafor",    country: "GH", seller_level: "New",        avatar_url: null },
  { id: "mock-seller-13", display_name: "Lena Fischer",    country: "DE", seller_level: "Top Rated", avatar_url: null },
  { id: "mock-seller-14", display_name: "Omar Farooq",     country: "PK", seller_level: "Level 2",   avatar_url: null },
  { id: "mock-seller-15", display_name: "Sara Kim",        country: "KR", seller_level: "Level 1",   avatar_url: null },
];

export const mockGigs: GigCardData[] = [
  // ── Graphics & Design ───────────────────────────────────────────────────
  {
    id: "mock-gd-1",
    title: "I will design a professional minimalist logo for your brand",
    category: "graphics-design",
    price: 1499,
    delivery_days: 3,
    tags: ["logo", "branding", "minimalist"],
    image_url: null,
    seller_id: "mock-seller-1",
    seller: MOCK_SELLERS[0],
    avg_rating: 4.9,
    review_count: 1243,
  },
  {
    id: "mock-gd-2",
    title: "I will create stunning social media graphics and banner designs",
    category: "graphics-design",
    price: 799,
    delivery_days: 2,
    tags: ["social media", "banner", "graphics"],
    image_url: null,
    seller_id: "mock-seller-4",
    seller: MOCK_SELLERS[3],
    avg_rating: 4.8,
    review_count: 875,
  },
  {
    id: "mock-gd-3",
    title: "I will design a complete brand identity with logo and guidelines",
    category: "graphics-design",
    price: 4999,
    delivery_days: 7,
    tags: ["brand identity", "logo", "guidelines"],
    image_url: null,
    seller_id: "mock-seller-7",
    seller: MOCK_SELLERS[6],
    avg_rating: 5.0,
    review_count: 312,
  },
  {
    id: "mock-gd-4",
    title: "I will design a modern UI/UX for your mobile app",
    category: "graphics-design",
    price: 5999,
    delivery_days: 7,
    tags: ["ui/ux", "mobile", "figma"],
    image_url: null,
    seller_id: "mock-seller-9",
    seller: MOCK_SELLERS[8],
    avg_rating: 4.9,
    review_count: 547,
  },
  {
    id: "mock-gd-5",
    title: "I will illustrate a custom character or mascot for your brand",
    category: "graphics-design",
    price: 2999,
    delivery_days: 5,
    tags: ["illustration", "character", "mascot"],
    image_url: null,
    seller_id: "mock-seller-13",
    seller: MOCK_SELLERS[12],
    avg_rating: 4.7,
    review_count: 683,
  },

  // ── Digital Marketing ────────────────────────────────────────────────────
  {
    id: "mock-dm-1",
    title: "I will manage your Facebook and Instagram ads for maximum ROI",
    category: "digital-marketing",
    price: 3999,
    delivery_days: 7,
    tags: ["facebook ads", "instagram", "paid ads"],
    image_url: null,
    seller_id: "mock-seller-2",
    seller: MOCK_SELLERS[1],
    avg_rating: 4.8,
    review_count: 921,
  },
  {
    id: "mock-dm-2",
    title: "I will do complete SEO audit and on-page optimization",
    category: "digital-marketing",
    price: 2499,
    delivery_days: 5,
    tags: ["seo", "audit", "on-page"],
    image_url: null,
    seller_id: "mock-seller-6",
    seller: MOCK_SELLERS[5],
    avg_rating: 4.7,
    review_count: 634,
  },
  {
    id: "mock-dm-3",
    title: "I will create and manage your Google Ads PPC campaign",
    category: "digital-marketing",
    price: 4499,
    delivery_days: 3,
    tags: ["google ads", "ppc", "search ads"],
    image_url: null,
    seller_id: "mock-seller-10",
    seller: MOCK_SELLERS[9],
    avg_rating: 4.9,
    review_count: 402,
  },
  {
    id: "mock-dm-4",
    title: "I will create an email marketing strategy and automated sequences",
    category: "digital-marketing",
    price: 1999,
    delivery_days: 4,
    tags: ["email marketing", "automation", "mailchimp"],
    image_url: null,
    seller_id: "mock-seller-14",
    seller: MOCK_SELLERS[13],
    avg_rating: 4.6,
    review_count: 285,
  },
  {
    id: "mock-dm-5",
    title: "I will grow your YouTube channel with organic SEO strategies",
    category: "digital-marketing",
    price: 2999,
    delivery_days: 7,
    tags: ["youtube", "seo", "growth"],
    image_url: null,
    seller_id: "mock-seller-3",
    seller: MOCK_SELLERS[2],
    avg_rating: 4.8,
    review_count: 510,
  },

  // ── Writing & Translation ────────────────────────────────────────────────
  {
    id: "mock-wt-1",
    title: "I will write SEO-optimized blog posts and articles for your website",
    category: "writing-translation",
    price: 999,
    delivery_days: 3,
    tags: ["blog", "seo", "content writing"],
    image_url: null,
    seller_id: "mock-seller-9",
    seller: MOCK_SELLERS[8],
    avg_rating: 4.9,
    review_count: 1876,
  },
  {
    id: "mock-wt-2",
    title: "I will translate your document from English to Spanish or French",
    category: "writing-translation",
    price: 699,
    delivery_days: 2,
    tags: ["translation", "spanish", "french"],
    image_url: null,
    seller_id: "mock-seller-4",
    seller: MOCK_SELLERS[3],
    avg_rating: 5.0,
    review_count: 743,
  },
  {
    id: "mock-wt-3",
    title: "I will write compelling product descriptions for your e-commerce store",
    category: "writing-translation",
    price: 799,
    delivery_days: 2,
    tags: ["product descriptions", "ecommerce", "copywriting"],
    image_url: null,
    seller_id: "mock-seller-11",
    seller: MOCK_SELLERS[10],
    avg_rating: 4.7,
    review_count: 429,
  },
  {
    id: "mock-wt-4",
    title: "I will proofread and edit your academic papers or essays",
    category: "writing-translation",
    price: 599,
    delivery_days: 1,
    tags: ["proofreading", "academic", "editing"],
    image_url: null,
    seller_id: "mock-seller-13",
    seller: MOCK_SELLERS[12],
    avg_rating: 4.8,
    review_count: 1102,
  },
  {
    id: "mock-wt-5",
    title: "I will write a professional business plan for your startup",
    category: "writing-translation",
    price: 3999,
    delivery_days: 7,
    tags: ["business plan", "startup", "investor ready"],
    image_url: null,
    seller_id: "mock-seller-7",
    seller: MOCK_SELLERS[6],
    avg_rating: 4.9,
    review_count: 267,
  },

  // ── Video & Animation ────────────────────────────────────────────────────
  {
    id: "mock-va-1",
    title: "I will create a professional explainer video for your product",
    category: "video-animation",
    price: 4999,
    delivery_days: 5,
    tags: ["explainer video", "animation", "2d"],
    image_url: null,
    seller_id: "mock-seller-1",
    seller: MOCK_SELLERS[0],
    avg_rating: 4.9,
    review_count: 892,
  },
  {
    id: "mock-va-2",
    title: "I will edit your YouTube videos with professional color grading",
    category: "video-animation",
    price: 1999,
    delivery_days: 3,
    tags: ["video editing", "youtube", "color grading"],
    image_url: null,
    seller_id: "mock-seller-8",
    seller: MOCK_SELLERS[7],
    avg_rating: 4.7,
    review_count: 467,
  },
  {
    id: "mock-va-3",
    title: "I will create a stunning 3D product animation for marketing",
    category: "video-animation",
    price: 7999,
    delivery_days: 7,
    tags: ["3d animation", "product", "marketing"],
    image_url: null,
    seller_id: "mock-seller-5",
    seller: MOCK_SELLERS[4],
    avg_rating: 4.8,
    review_count: 198,
  },
  {
    id: "mock-va-4",
    title: "I will create motion graphic intros and outros for your channel",
    category: "video-animation",
    price: 1499,
    delivery_days: 2,
    tags: ["motion graphics", "intro", "outro"],
    image_url: null,
    seller_id: "mock-seller-15",
    seller: MOCK_SELLERS[14],
    avg_rating: 4.9,
    review_count: 1354,
  },

  // ── Music & Audio ────────────────────────────────────────────────────────
  {
    id: "mock-ma-1",
    title: "I will record a professional male voice over in American accent",
    category: "music-audio",
    price: 1299,
    delivery_days: 1,
    tags: ["voice over", "american", "narration"],
    image_url: null,
    seller_id: "mock-seller-3",
    seller: MOCK_SELLERS[2],
    avg_rating: 4.9,
    review_count: 2341,
  },
  {
    id: "mock-ma-2",
    title: "I will mix and master your music track professionally",
    category: "music-audio",
    price: 2499,
    delivery_days: 3,
    tags: ["mixing", "mastering", "music production"],
    image_url: null,
    seller_id: "mock-seller-7",
    seller: MOCK_SELLERS[6],
    avg_rating: 5.0,
    review_count: 673,
  },
  {
    id: "mock-ma-3",
    title: "I will compose original background music for your video or game",
    category: "music-audio",
    price: 3499,
    delivery_days: 5,
    tags: ["music composition", "background music", "original"],
    image_url: null,
    seller_id: "mock-seller-9",
    seller: MOCK_SELLERS[8],
    avg_rating: 4.8,
    review_count: 415,
  },
  {
    id: "mock-ma-4",
    title: "I will edit and enhance your podcast audio professionally",
    category: "music-audio",
    price: 999,
    delivery_days: 2,
    tags: ["podcast", "audio editing", "noise removal"],
    image_url: null,
    seller_id: "mock-seller-12",
    seller: MOCK_SELLERS[11],
    avg_rating: 4.7,
    review_count: 289,
  },

  // ── Programming & Tech ───────────────────────────────────────────────────
  {
    id: "mock-pt-1",
    title: "I will build a full-stack React web application with Supabase backend",
    category: "programming-tech",
    price: 14999,
    delivery_days: 14,
    tags: ["react", "supabase", "fullstack"],
    image_url: null,
    seller_id: "mock-seller-2",
    seller: MOCK_SELLERS[1],
    avg_rating: 4.9,
    review_count: 328,
  },
  {
    id: "mock-pt-2",
    title: "I will develop a cross-platform mobile app using React Native",
    category: "programming-tech",
    price: 19999,
    delivery_days: 21,
    tags: ["react native", "mobile app", "ios", "android"],
    image_url: null,
    seller_id: "mock-seller-10",
    seller: MOCK_SELLERS[9],
    avg_rating: 4.8,
    review_count: 213,
  },
  {
    id: "mock-pt-3",
    title: "I will create a Shopify store with custom theme and integrations",
    category: "programming-tech",
    price: 6999,
    delivery_days: 7,
    tags: ["shopify", "ecommerce", "custom theme"],
    image_url: null,
    seller_id: "mock-seller-5",
    seller: MOCK_SELLERS[4],
    avg_rating: 4.7,
    review_count: 587,
  },
  {
    id: "mock-pt-4",
    title: "I will build and optimize your REST or GraphQL API",
    category: "programming-tech",
    price: 9999,
    delivery_days: 10,
    tags: ["api", "rest", "graphql", "backend"],
    image_url: null,
    seller_id: "mock-seller-7",
    seller: MOCK_SELLERS[6],
    avg_rating: 5.0,
    review_count: 152,
  },
  {
    id: "mock-pt-5",
    title: "I will fix bugs and improve performance in your web application",
    category: "programming-tech",
    price: 2999,
    delivery_days: 3,
    tags: ["bug fix", "debugging", "performance"],
    image_url: null,
    seller_id: "mock-seller-14",
    seller: MOCK_SELLERS[13],
    avg_rating: 4.8,
    review_count: 904,
  },

  // ── Business ─────────────────────────────────────────────────────────────
  {
    id: "mock-biz-1",
    title: "I will be your professional virtual assistant for admin tasks",
    category: "business",
    price: 1499,
    delivery_days: 1,
    tags: ["virtual assistant", "admin", "data entry"],
    image_url: null,
    seller_id: "mock-seller-11",
    seller: MOCK_SELLERS[10],
    avg_rating: 4.8,
    review_count: 1567,
  },
  {
    id: "mock-biz-2",
    title: "I will conduct thorough market research for your business niche",
    category: "business",
    price: 3499,
    delivery_days: 5,
    tags: ["market research", "competitive analysis", "report"],
    image_url: null,
    seller_id: "mock-seller-4",
    seller: MOCK_SELLERS[3],
    avg_rating: 4.9,
    review_count: 478,
  },
  {
    id: "mock-biz-3",
    title: "I will provide financial modeling and analysis for your startup",
    category: "business",
    price: 4999,
    delivery_days: 5,
    tags: ["financial model", "excel", "startup"],
    image_url: null,
    seller_id: "mock-seller-1",
    seller: MOCK_SELLERS[0],
    avg_rating: 5.0,
    review_count: 193,
  },
  {
    id: "mock-biz-4",
    title: "I will create professional pitch deck for investors",
    category: "business",
    price: 5999,
    delivery_days: 5,
    tags: ["pitch deck", "investor", "presentation"],
    image_url: null,
    seller_id: "mock-seller-13",
    seller: MOCK_SELLERS[12],
    avg_rating: 4.9,
    review_count: 341,
  },

  // ── Lifestyle ─────────────────────────────────────────────────────────────
  {
    id: "mock-ls-1",
    title: "I will be your online personal trainer and create a fitness plan",
    category: "lifestyle",
    price: 1999,
    delivery_days: 2,
    tags: ["fitness", "workout plan", "personal training"],
    image_url: null,
    seller_id: "mock-seller-6",
    seller: MOCK_SELLERS[5],
    avg_rating: 4.8,
    review_count: 923,
  },
  {
    id: "mock-ls-2",
    title: "I will provide online tutoring in Math, Physics, or Chemistry",
    category: "lifestyle",
    price: 999,
    delivery_days: 1,
    tags: ["tutoring", "math", "physics"],
    image_url: null,
    seller_id: "mock-seller-8",
    seller: MOCK_SELLERS[7],
    avg_rating: 4.9,
    review_count: 712,
  },
  {
    id: "mock-ls-3",
    title: "I will be your life coach and help you achieve your goals",
    category: "lifestyle",
    price: 2999,
    delivery_days: 1,
    tags: ["life coaching", "goals", "mindset"],
    image_url: null,
    seller_id: "mock-seller-9",
    seller: MOCK_SELLERS[8],
    avg_rating: 4.7,
    review_count: 384,
  },

  // ── AI Services ───────────────────────────────────────────────────────────
  {
    id: "mock-ai-1",
    title: "I will build a custom AI chatbot for your website or app",
    category: "ai-services",
    price: 8999,
    delivery_days: 7,
    tags: ["chatbot", "ai", "nlp"],
    image_url: null,
    seller_id: "mock-seller-2",
    seller: MOCK_SELLERS[1],
    avg_rating: 4.9,
    review_count: 412,
  },
  {
    id: "mock-ai-2",
    title: "I will create AI-generated artwork and illustrations for your brand",
    category: "ai-services",
    price: 999,
    delivery_days: 1,
    tags: ["ai art", "midjourney", "dall-e"],
    image_url: null,
    seller_id: "mock-seller-15",
    seller: MOCK_SELLERS[14],
    avg_rating: 4.7,
    review_count: 1893,
  },
  {
    id: "mock-ai-3",
    title: "I will fine-tune an LLM model on your custom data",
    category: "ai-services",
    price: 19999,
    delivery_days: 14,
    tags: ["llm", "fine-tuning", "gpt", "machine learning"],
    image_url: null,
    seller_id: "mock-seller-7",
    seller: MOCK_SELLERS[6],
    avg_rating: 5.0,
    review_count: 87,
  },
  {
    id: "mock-ai-4",
    title: "I will automate your workflows using AI and Python scripts",
    category: "ai-services",
    price: 4999,
    delivery_days: 5,
    tags: ["automation", "python", "ai", "workflow"],
    image_url: null,
    seller_id: "mock-seller-10",
    seller: MOCK_SELLERS[9],
    avg_rating: 4.8,
    review_count: 256,
  },
  {
    id: "mock-ai-5",
    title: "I will build a machine learning model for your data analysis",
    category: "ai-services",
    price: 12999,
    delivery_days: 10,
    tags: ["machine learning", "data science", "python"],
    image_url: null,
    seller_id: "mock-seller-5",
    seller: MOCK_SELLERS[4],
    avg_rating: 4.9,
    review_count: 134,
  },

  // ── Consulting ────────────────────────────────────────────────────────────
  {
    id: "mock-con-1",
    title: "I will provide 1-hour business strategy consultation session",
    category: "consulting",
    price: 2999,
    delivery_days: 1,
    tags: ["strategy", "business consulting", "startup"],
    image_url: null,
    seller_id: "mock-seller-1",
    seller: MOCK_SELLERS[0],
    avg_rating: 4.9,
    review_count: 823,
  },
  {
    id: "mock-con-2",
    title: "I will conduct UX research and provide actionable insights report",
    category: "consulting",
    price: 5999,
    delivery_days: 7,
    tags: ["ux research", "user testing", "insights"],
    image_url: null,
    seller_id: "mock-seller-13",
    seller: MOCK_SELLERS[12],
    avg_rating: 5.0,
    review_count: 189,
  },
  {
    id: "mock-con-3",
    title: "I will review your product roadmap and provide strategic feedback",
    category: "consulting",
    price: 4499,
    delivery_days: 3,
    tags: ["product management", "roadmap", "strategy"],
    image_url: null,
    seller_id: "mock-seller-4",
    seller: MOCK_SELLERS[3],
    avg_rating: 4.8,
    review_count: 274,
  },
  {
    id: "mock-con-4",
    title: "I will analyze your data and deliver a comprehensive insights dashboard",
    category: "consulting",
    price: 6999,
    delivery_days: 7,
    tags: ["data analysis", "dashboard", "tableau"],
    image_url: null,
    seller_id: "mock-seller-2",
    seller: MOCK_SELLERS[1],
    avg_rating: 4.9,
    review_count: 312,
  },
];

/**
 * Filter mock gigs using the same criteria as the useGigs hook.
 */
export function filterMockGigs(
  gigs: GigCardData[],
  options: {
    query?: string;
    category?: string;
    priceMin?: number;
    priceMax?: number;
    deliveryDays?: number | null;
    sellerLevel?: string | null;
    sellerId?: string;
    limit?: number;
    sortBy?: "recommended" | "price-low" | "price-high" | "rating" | "reviews";
  }
): GigCardData[] {
  let result = [...gigs];

  if (options.category && options.category !== "all") {
    result = result.filter((g) => g.category === options.category);
  }
  if (options.priceMin !== undefined) {
    result = result.filter((g) => g.price >= options.priceMin!);
  }
  if (options.priceMax !== undefined) {
    result = result.filter((g) => g.price <= options.priceMax!);
  }
  if (options.deliveryDays) {
    result = result.filter((g) => g.delivery_days <= options.deliveryDays!);
  }
  if (options.query) {
    const q = options.query.toLowerCase();
    result = result.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        (g.tags ?? []).some((t) => t.toLowerCase().includes(q))
    );
  }
  if (options.sellerLevel && options.sellerLevel !== "all") {
    result = result.filter(
      (g) => g.seller?.seller_level === options.sellerLevel
    );
  }
  if (options.sellerId) {
    result = result.filter((g) => g.seller_id === options.sellerId);
  }

  if (options.sortBy === "price-low") {
    result = result.sort((a, b) => a.price - b.price);
  } else if (options.sortBy === "price-high") {
    result = result.sort((a, b) => b.price - a.price);
  } else if (options.sortBy === "rating") {
    result = result.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
  } else if (options.sortBy === "reviews") {
    result = result.sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0));
  }

  if (options.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
}
