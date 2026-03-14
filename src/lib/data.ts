export interface MegaMenuSection {
  title: string;
  items: string[];
}

export const categories = [
  {
    id: "graphics-design",
    name: "Graphics & Design",
    icon: "🎨",
    count: 2340,
    subcategories: ["Logo Design", "Brand Style Guides", "Illustration", "Web & App Design", "Social Media Design"],
    megaMenuSections: [
      {
        title: "Logo & Brand Identity",
        items: ["Logo Design", "Brand Style Guides", "Icon Design", "Business Cards & Stationery", "Brand Kits"],
      },
      {
        title: "Web & App Design",
        items: ["Website Design", "Mobile App Design", "UX/UI Design", "Landing Pages", "Wireframes & Prototypes"],
      },
      {
        title: "Print & Packaging",
        items: ["Packaging & Label Design", "Poster & Flyer Design", "T-Shirt & Merchandise", "Book & Magazine Covers", "Brochure Design"],
      },
      {
        title: "Social & Marketing",
        items: ["Social Media Design", "Infographic Design", "Presentation Design", "Banner & Ad Design", "Email Templates"],
      },
    ] as MegaMenuSection[],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    icon: "📈",
    count: 1820,
    subcategories: ["Social Media Marketing", "SEO", "Content Marketing", "Email Marketing", "SEM"],
    megaMenuSections: [
      {
        title: "Social Media",
        items: ["Social Media Marketing", "Social Media Management", "UGC Videos", "Paid Social Media", "Organic Social Promotions"],
      },
      {
        title: "Search Engines",
        items: ["SEO", "Local SEO", "SEM / Google Ads", "E-Commerce SEO", "Video SEO"],
      },
      {
        title: "Content & Email",
        items: ["Content Marketing", "Email Marketing", "Copywriting", "Influencer Marketing", "Marketing Automation"],
      },
      {
        title: "Strategy & Analytics",
        items: ["Marketing Strategy", "Brand Strategy", "Web Analytics", "Conversion Optimization", "Affiliate Marketing"],
      },
    ] as MegaMenuSection[],
  },
  {
    id: "writing-translation",
    name: "Writing & Translation",
    icon: "✍️",
    count: 1560,
    subcategories: ["Articles & Blog Posts", "Translation", "Proofreading", "Technical Writing", "Creative Writing"],
    megaMenuSections: [
      {
        title: "Content Writing",
        items: ["Articles & Blog Posts", "Website Content", "Product Descriptions", "Technical Writing", "Ghost Writing"],
      },
      {
        title: "Copywriting",
        items: ["Sales Copy", "Ad Copywriting", "UX Writing", "Social Media Copy", "Email Copy"],
      },
      {
        title: "Translation & Localization",
        items: ["Translation", "Localization", "Transcription", "Subtitles & Captions", "Proofreading & Editing"],
      },
      {
        title: "Creative & Business",
        items: ["Creative Writing", "Screenwriting", "Business Plans", "Resume Writing", "Grant Writing"],
      },
    ] as MegaMenuSection[],
  },
  {
    id: "video-animation",
    name: "Video & Animation",
    icon: "🎬",
    count: 980,
    subcategories: ["Video Editing", "Animation", "Motion Graphics", "Explainer Videos", "Short Video Ads"],
    megaMenuSections: [
      {
        title: "Editing & Post Production",
        items: ["Video Editing", "Color Grading", "Video Templates", "YouTube Video Editing", "Corporate Videos"],
      },
      {
        title: "Animation",
        items: ["2D Animation", "3D Animation", "Motion Graphics", "Whiteboard Videos", "Character Animation"],
      },
      {
        title: "Explainers & Ads",
        items: ["Explainer Videos", "Product Videos", "Video Ads & Commercials", "Live Action Videos", "Short Video Ads"],
      },
      {
        title: "Social & Content",
        items: ["Social Media Videos", "TikTok & Reels", "Slideshow Videos", "Intros & Outros", "Subtitles & Captions"],
      },
    ] as MegaMenuSection[],
  },
  {
    id: "music-audio",
    name: "Music & Audio",
    icon: "🎵",
    count: 720,
    subcategories: ["Voice Over", "Mixing & Mastering", "Producers & Composers", "Podcast Editing", "Sound Design"],
    megaMenuSections: [
      {
        title: "Voice & Vocals",
        items: ["Voice Over", "Jingles & Intros", "Audio Ads & Commercials", "Podcast Editing", "Audiobook Production"],
      },
      {
        title: "Music Production",
        items: ["Producers & Composers", "Beat Making", "Mixing & Mastering", "Songwriting", "Music Licensing"],
      },
      {
        title: "Sound Design",
        items: ["Sound Effects", "Audio Editing", "Background Music", "Audio Logo & Jingle", "Podcast Production"],
      },
      {
        title: "Lessons & Coaching",
        items: ["Music Lessons", "Vocal Coaching", "Music Theory", "Music Transcription", "Session Musicians"],
      },
    ] as MegaMenuSection[],
  },
  {
    id: "programming-tech",
    name: "Programming & Tech",
    icon: "💻",
    count: 3120,
    subcategories: ["Web Development", "Mobile Apps", "Desktop Apps", "Game Development", "AI Services"],
    megaMenuSections: [
      {
        title: "Web Development",
        items: ["Web Development", "WordPress", "Shopify & E-Commerce", "Full Stack", "Landing Pages"],
      },
      {
        title: "Mobile & Software",
        items: ["Mobile App Development", "iOS Apps", "Android Apps", "Desktop Apps", "Game Development"],
      },
      {
        title: "AI & Data",
        items: ["AI Development", "Machine Learning", "Data Science", "Web Scraping", "Scripting & Automation"],
      },
      {
        title: "DevOps & Support",
        items: ["QA Testing", "DevOps & Cloud", "Database Management", "Cybersecurity", "Tech Support & IT Help"],
      },
    ] as MegaMenuSection[],
  },
  {
    id: "business",
    name: "Business",
    icon: "💼",
    count: 1450,
    subcategories: ["Virtual Assistant", "Market Research", "Business Plans", "Financial Consulting", "Legal Consulting"],
    megaMenuSections: [
      {
        title: "Admin & Operations",
        items: ["Virtual Assistant", "Data Entry", "Project Management", "HR Consulting", "Office Administration"],
      },
      {
        title: "Finance & Legal",
        items: ["Financial Consulting", "Accounting & Bookkeeping", "Legal Consulting", "Business Plans", "Notary Services"],
      },
      {
        title: "Strategy & Research",
        items: ["Business Consulting", "Market Research", "Competitive Analysis", "Startup Consulting", "Growth Strategy"],
      },
      {
        title: "Sales & Marketing",
        items: ["Sales & Lead Generation", "Customer Support", "PR & Communications", "Brand Consulting", "E-Commerce Management"],
      },
    ] as MegaMenuSection[],
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    icon: "🌟",
    count: 890,
    subcategories: ["Online Tutoring", "Fitness Coaching", "Life Coaching", "Astrology", "Gaming"],
    megaMenuSections: [
      {
        title: "Health & Wellness",
        items: ["Fitness Coaching", "Nutrition Planning", "Yoga & Meditation", "Wellness Coaching", "Personal Training"],
      },
      {
        title: "Education & Tutoring",
        items: ["Online Tutoring", "Language Lessons", "Test Prep", "Homework Help", "Academic Writing"],
      },
      {
        title: "Personal Development",
        items: ["Life Coaching", "Career Coaching", "Interview Prep", "Relationship Coaching", "Motivation & Mindset"],
      },
      {
        title: "Arts & Hobbies",
        items: ["Astrology & Tarot", "Cooking Lessons", "Craft Lessons", "Travel Planning", "Gaming"],
      },
    ] as MegaMenuSection[],
  },
  {
    id: "ai-services",
    name: "AI Services",
    icon: "🤖",
    count: 1670,
    subcategories: ["AI Chatbots", "AI Image Generation", "AI Content", "Machine Learning", "Data Science"],
    megaMenuSections: [
      {
        title: "AI Development",
        items: ["AI Chatbots", "AI Agents", "Machine Learning Models", "Prompt Engineering", "AI Automation"],
      },
      {
        title: "AI Content Creation",
        items: ["AI Content Generation", "AI Image Generation", "AI Video Generation", "AI Voiceover", "AI Music"],
      },
      {
        title: "AI Integration",
        items: ["ChatGPT & LLM Development", "AI Website Integration", "AI App Development", "Data Analysis", "NLP Services"],
      },
      {
        title: "Consulting & Strategy",
        items: ["AI Consulting", "AI Strategy", "Generative Engine Optimization (GEO)", "Computer Vision", "AI Technology Consulting"],
      },
    ] as MegaMenuSection[],
  },
  {
    id: "consulting",
    name: "Consulting",
    icon: "🧠",
    count: 560,
    subcategories: ["Strategy", "Product Management", "UX Research", "Data Analysis", "Operations"],
    megaMenuSections: [
      {
        title: "Business Consulting",
        items: ["Strategy Consulting", "Management Consulting", "Operations Consulting", "Growth Strategy", "Market Entry Strategy"],
      },
      {
        title: "Tech & Product",
        items: ["IT Consulting", "Product Management", "Digital Transformation", "System Architecture", "Agile Consulting"],
      },
      {
        title: "Research & Analytics",
        items: ["UX Research", "Data Analysis", "Market Research", "Competitive Intelligence", "User Testing"],
      },
      {
        title: "Specialized Consulting",
        items: ["Legal Consulting", "Financial Advisory", "HR Consulting", "Sustainability Consulting", "Change Management"],
      },
    ] as MegaMenuSection[],
  },
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

