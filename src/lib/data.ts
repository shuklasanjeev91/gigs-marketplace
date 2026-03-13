export const categories = [
  { id: "graphics-design", name: "Graphics & Design", icon: "🎨", count: 2340, subcategories: ["Logo Design", "Brand Style Guides", "Illustration", "Web & App Design", "Social Media Design"] },
  { id: "digital-marketing", name: "Digital Marketing", icon: "📈", count: 1820, subcategories: ["Social Media Marketing", "SEO", "Content Marketing", "Email Marketing", "SEM"] },
  { id: "writing-translation", name: "Writing & Translation", icon: "✍️", count: 1560, subcategories: ["Articles & Blog Posts", "Translation", "Proofreading", "Technical Writing", "Creative Writing"] },
  { id: "video-animation", name: "Video & Animation", icon: "🎬", count: 980, subcategories: ["Video Editing", "Animation", "Motion Graphics", "Explainer Videos", "Short Video Ads"] },
  { id: "music-audio", name: "Music & Audio", icon: "🎵", count: 720, subcategories: ["Voice Over", "Mixing & Mastering", "Producers & Composers", "Podcast Editing", "Sound Design"] },
  { id: "programming-tech", name: "Programming & Tech", icon: "💻", count: 3120, subcategories: ["Web Development", "Mobile Apps", "Desktop Apps", "Game Development", "AI Services"] },
  { id: "business", name: "Business", icon: "💼", count: 1450, subcategories: ["Virtual Assistant", "Market Research", "Business Plans", "Financial Consulting", "Legal Consulting"] },
  { id: "lifestyle", name: "Lifestyle", icon: "🌟", count: 890, subcategories: ["Online Tutoring", "Fitness Coaching", "Life Coaching", "Astrology", "Gaming"] },
  { id: "ai-services", name: "AI Services", icon: "🤖", count: 1670, subcategories: ["AI Chatbots", "AI Image Generation", "AI Content", "Machine Learning", "Data Science"] },
  { id: "consulting", name: "Consulting", icon: "🧠", count: 560, subcategories: ["Strategy", "Product Management", "UX Research", "Data Analysis", "Operations"] },
];

export type Category = typeof categories[number];

/** Shape of a gig enriched with seller profile data and review stats */
export interface GigCardData {
  id: string;
  title: string;
  category: string;
  price: number;
  delivery_days: number;
  tags: string[] | null;
  image_url: string | null;
  seller_id: string;
  seller?: {
    display_name: string | null;
    avatar_url: string | null;
    country: string | null;
    seller_level: string | null;
  } | null;
  avg_rating?: number | null;
  review_count?: number | null;
}

/** Alias kept for any remaining imports */
export type Gig = GigCardData;

