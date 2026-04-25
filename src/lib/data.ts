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
  // ── 40 additional categories ─────────────────────────────────────────────
  {
    id: "photography",
    name: "Photography",
    icon: "📷",
    count: 1240,
    subcategories: ["Photo Editing", "Portrait Retouching", "Product Photography", "Real Estate Photos", "Photo Restoration"],
    megaMenuSections: [
      { title: "Editing & Retouching", items: ["Photo Editing", "Portrait Retouching", "Product Photo Editing", "Real Estate Photo Editing", "Fashion Retouching"] },
      { title: "Specialty Photography", items: ["Food Photography Editing", "Wedding Photo Editing", "Headshot Retouching", "Newborn & Family Photos", "Sports Photography Editing"] },
      { title: "Digital Manipulation", items: ["Photo Manipulation", "Background Removal", "Photo Compositing", "Color Grading", "Photo Restoration"] },
      { title: "Virtual & Immersive", items: ["360° Virtual Tours", "Drone Photo Editing", "Stock Photo Editing", "Architectural Photography", "Long Exposure Effects"] },
    ] as MegaMenuSection[],
  },
  {
    id: "architecture-interior",
    name: "Architecture & Interior",
    icon: "🏗️",
    count: 870,
    subcategories: ["3D Rendering", "Interior Design", "Floor Plans", "AutoCAD Drawings", "BIM & Revit"],
    megaMenuSections: [
      { title: "3D Visualization", items: ["3D Architectural Rendering", "3D Floor Plans", "Exterior Rendering", "Interior 3D Rendering", "Walkthrough Animation"] },
      { title: "Interior Design", items: ["Home Interior Design", "Office Interior Design", "Kitchen & Bathroom Design", "Retail & Commercial Spaces", "Virtual Staging"] },
      { title: "Technical Drawing", items: ["AutoCAD Drawings", "Construction Drawings", "BIM & Revit Modeling", "Site Plans", "As-Built Drawings"] },
      { title: "Specialty Design", items: ["Landscape Design", "Restaurant & Cafe Design", "Furniture Design", "Urban Planning", "Tiny Home Design"] },
    ] as MegaMenuSection[],
  },
  {
    id: "fashion-apparel",
    name: "Fashion & Apparel",
    icon: "👗",
    count: 760,
    subcategories: ["Fashion Design", "Pattern Making", "Streetwear Design", "Textile Prints", "Fashion Illustration"],
    megaMenuSections: [
      { title: "Clothing Design", items: ["Fashion Design", "Streetwear Design", "Activewear Design", "Swimwear Design", "Children's Clothing"] },
      { title: "Technical Services", items: ["Fashion Flat Sketches", "Pattern Making", "Technical Specifications", "Grading & Sizing", "Production Documentation"] },
      { title: "Print & Textile", items: ["Textile & Fabric Prints", "Embroidery Design", "Print-on-Demand Design", "Sustainable Fashion Design", "Knitting & Crochet Patterns"] },
      { title: "Branding & Media", items: ["Fashion Brand Identity", "Lookbook Design", "Fashion Illustration", "Accessories Design", "Fashion E-Commerce Design"] },
    ] as MegaMenuSection[],
  },
  {
    id: "legal-services",
    name: "Legal Services",
    icon: "⚖️",
    count: 540,
    subcategories: ["Contract Drafting", "Legal Review", "Privacy Policy", "IP & Trademark", "Compliance"],
    megaMenuSections: [
      { title: "Business Contracts", items: ["NDA & Confidentiality", "Partnership Agreements", "Freelancer Agreements", "Employment Contracts", "Business Sale Agreements"] },
      { title: "Online & IP", items: ["Terms of Service", "Privacy Policy & GDPR", "Software Licensing", "IP Assignment", "Trademark Assistance"] },
      { title: "Finance & Property", items: ["Loan Agreements", "Lease Agreements", "Shareholder Agreements", "Promissory Notes", "Asset Purchase Agreements"] },
      { title: "Research & Advisory", items: ["Legal Research", "Contract Review", "Compliance Documentation", "Cease & Desist Letters", "Startup Legal Guidance"] },
    ] as MegaMenuSection[],
  },
  {
    id: "finance-accounting",
    name: "Finance & Accounting",
    icon: "💰",
    count: 980,
    subcategories: ["Bookkeeping", "Financial Modeling", "Tax Preparation", "Payroll", "Accounting Setup"],
    megaMenuSections: [
      { title: "Bookkeeping & Accounting", items: ["Bookkeeping", "Financial Statements", "Accounts Reconciliation", "QuickBooks & Xero Setup", "Month-End Close"] },
      { title: "Financial Modeling", items: ["Financial Modeling", "Three-Statement Projections", "Startup Valuation", "SaaS Financial Models", "Cash Flow Analysis"] },
      { title: "Tax & Payroll", items: ["Tax Preparation", "Sales Tax Compliance", "Payroll Processing", "Audit Preparation", "Crypto Accounting"] },
      { title: "Strategy & Advisory", items: ["Budget Planning", "Investment Analysis", "KPI Dashboards", "Break-Even Analysis", "Personal Finance Coaching"] },
    ] as MegaMenuSection[],
  },
  {
    id: "hr-recruitment",
    name: "HR & Recruitment",
    icon: "👥",
    count: 670,
    subcategories: ["Job Descriptions", "Onboarding", "HR Policy", "Recruiting", "Performance Reviews"],
    megaMenuSections: [
      { title: "Recruiting & Hiring", items: ["Job Descriptions", "LinkedIn Recruiting", "Candidate Sourcing", "Interview Questions", "Offer Letters"] },
      { title: "Employee Experience", items: ["Onboarding Programs", "Employee Handbook", "Engagement Programs", "Org Charts", "30-60-90 Day Plans"] },
      { title: "HR Policy & Compliance", items: ["HR Policy Manuals", "Labor Law Compliance", "Remote Work Policy", "Diversity & Inclusion", "Termination Procedures"] },
      { title: "Learning & Development", items: ["L&D Curriculum", "Competency Frameworks", "Performance Reviews", "Succession Planning", "Salary Benchmarking"] },
    ] as MegaMenuSection[],
  },
  {
    id: "sales-growth",
    name: "Sales & Growth",
    icon: "🎯",
    count: 810,
    subcategories: ["Sales Strategy", "Sales Funnels", "Cold Email", "CRM Setup", "Lead Generation"],
    megaMenuSections: [
      { title: "Sales Strategy", items: ["B2B Sales Strategy", "Sales Playbooks", "Go-to-Market Strategy", "Pricing Strategy", "Sales Process Audit"] },
      { title: "Outreach & Funnels", items: ["Cold Email Campaigns", "Sales Funnels", "LinkedIn Prospecting", "Lead Qualification", "Account-Based Marketing"] },
      { title: "Tools & Automation", items: ["CRM Setup", "Sales Automation", "HubSpot & Salesforce", "Sales Deck Design", "Demo Scripts"] },
      { title: "Revenue Optimization", items: ["Upsell & Cross-sell", "Referral Programs", "Win-Back Campaigns", "Conversion Optimization", "KPI Dashboards"] },
    ] as MegaMenuSection[],
  },
  {
    id: "customer-support",
    name: "Customer Support",
    icon: "🎧",
    count: 590,
    subcategories: ["Help Desk Setup", "Knowledge Base", "Chat Support", "Customer Success", "Support Templates"],
    megaMenuSections: [
      { title: "Support Systems", items: ["Zendesk Setup", "Intercom Setup", "Freshdesk Setup", "Live Chat Setup", "AI Chatbot Support"] },
      { title: "Content & Templates", items: ["Knowledge Base", "Response Templates", "FAQ Documentation", "Product Tutorials", "Return & Refund Docs"] },
      { title: "Customer Success", items: ["Customer Success Playbook", "Onboarding Flows", "Customer Journey Maps", "NPS Improvement", "Voice of Customer Research"] },
      { title: "Operations & Training", items: ["Support Team Training", "SLA Templates", "Escalation Procedures", "Reputation Monitoring", "Feedback Analysis"] },
    ] as MegaMenuSection[],
  },
  {
    id: "e-commerce",
    name: "E-Commerce",
    icon: "🛒",
    count: 1380,
    subcategories: ["Shopify Stores", "Amazon FBA", "WooCommerce", "Dropshipping", "E-Commerce SEO"],
    megaMenuSections: [
      { title: "Store Setup", items: ["Shopify Store Setup", "WooCommerce Setup", "Dropshipping Setup", "Subscription Box Setup", "Multi-Currency Setup"] },
      { title: "Amazon & Marketplaces", items: ["Amazon Listing Optimization", "Amazon FBA Strategy", "Etsy Shop Optimization", "Product Research", "Amazon PPC"] },
      { title: "Marketing & Conversion", items: ["E-Commerce SEO", "Abandoned Cart Recovery", "Email Automation", "Loyalty Programs", "A/B Testing"] },
      { title: "Operations", items: ["Product Photography Mockups", "Competitor Analysis", "Checkout Optimization", "Upsell Strategy", "Shopify Audit"] },
    ] as MegaMenuSection[],
  },
  {
    id: "game-development",
    name: "Game Development",
    icon: "🎮",
    count: 920,
    subcategories: ["Unity Games", "Mobile Games", "Pixel Art", "Game Design", "Multiplayer Games"],
    megaMenuSections: [
      { title: "Game Creation", items: ["Unity Game Development", "Mobile Game Development", "Hyper-Casual Games", "VR Games", "Roblox Games"] },
      { title: "Art & Assets", items: ["Pixel Art", "3D Game Characters", "Game UI/UX", "Concept Art", "Game Sound Effects"] },
      { title: "Design & Writing", items: ["Game Design Documents", "Level Design", "Narrative & Story Design", "Card & Board Games", "Puzzle Game Design"] },
      { title: "Tech & Backend", items: ["Multiplayer Backend", "Game Monetization", "In-App Purchases", "Game Porting", "Discord Bots"] },
    ] as MegaMenuSection[],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "🔒",
    count: 730,
    subcategories: ["Penetration Testing", "Security Audits", "Cloud Security", "Compliance", "Security Training"],
    megaMenuSections: [
      { title: "Testing & Assessment", items: ["Penetration Testing", "Network Security Audit", "Web App Security Testing", "Mobile App Security", "API Security Testing"] },
      { title: "Cloud & Infrastructure", items: ["Cloud Security Review", "Zero-Trust Architecture", "VPN & Remote Access", "CI/CD Security", "Endpoint Protection"] },
      { title: "Compliance & Policy", items: ["GDPR Compliance", "SOC2 Documentation", "Cybersecurity Policy", "Incident Response Plan", "Data Classification"] },
      { title: "Identity & Monitoring", items: ["MFA & Identity Management", "Security Monitoring", "Dark Web Monitoring", "Disaster Recovery", "Security Training"] },
    ] as MegaMenuSection[],
  },
  {
    id: "data-science",
    name: "Data Science",
    icon: "📊",
    count: 1150,
    subcategories: ["Data Analysis", "Machine Learning", "Data Visualization", "NLP", "Statistical Modeling"],
    megaMenuSections: [
      { title: "Analysis & Visualization", items: ["Data Analysis", "Tableau Dashboards", "Power BI Reports", "Exploratory Data Analysis", "Geospatial Analysis"] },
      { title: "Machine Learning", items: ["Predictive Modeling", "Classification & Regression", "Customer Segmentation", "Time Series Forecasting", "Recommendation Engines"] },
      { title: "Data Engineering", items: ["Data Pipelines", "Data Warehouse Design", "SQL Reporting", "Kafka & Airflow", "BigQuery & Redshift"] },
      { title: "Advanced Analytics", items: ["NLP & Text Analytics", "Sentiment Analysis", "Fraud Detection", "A/B Testing", "Marketing Attribution"] },
    ] as MegaMenuSection[],
  },
  {
    id: "blockchain-web3",
    name: "Blockchain & Web3",
    icon: "⛓️",
    count: 840,
    subcategories: ["Smart Contracts", "NFT Development", "DeFi Protocols", "Web3 dApps", "Tokenomics"],
    megaMenuSections: [
      { title: "Smart Contracts & Tokens", items: ["Solidity Smart Contracts", "ERC-20 & ERC-721 Tokens", "Smart Contract Audits", "DAO Contracts", "Staking Contracts"] },
      { title: "NFT & Marketplaces", items: ["NFT Collection Development", "NFT Marketplace", "NFT Minting Website", "NFT Art Generation", "Opensea Integration"] },
      { title: "DeFi & Web3 Apps", items: ["DeFi Protocols", "Web3 dApp Frontend", "MetaMask Integration", "Cross-Chain Bridges", "Crypto Wallet Development"] },
      { title: "Consulting & Strategy", items: ["Blockchain Consulting", "Tokenomics Design", "Whitepaper Writing", "Solana Programs", "Layer 2 Solutions"] },
    ] as MegaMenuSection[],
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    icon: "☁️",
    count: 1060,
    subcategories: ["AWS Infrastructure", "Kubernetes", "CI/CD Pipelines", "Terraform", "Monitoring"],
    megaMenuSections: [
      { title: "Cloud Infrastructure", items: ["AWS Setup & Architecture", "Google Cloud Platform", "Azure Infrastructure", "Terraform & IaC", "Serverless Applications"] },
      { title: "Containers & Orchestration", items: ["Docker Setup", "Kubernetes Clusters", "Microservices Architecture", "Container Orchestration", "Service Mesh"] },
      { title: "CI/CD & Automation", items: ["GitHub Actions Pipelines", "Jenkins CI/CD", "Automated Testing", "Deployment Automation", "GitOps Workflows"] },
      { title: "Monitoring & Security", items: ["Prometheus & Grafana", "ELK Stack Logging", "Cost Optimization", "SSL & HTTPS Setup", "Secrets Management"] },
    ] as MegaMenuSection[],
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    icon: "📱",
    count: 1430,
    subcategories: ["iOS Apps", "Android Apps", "Flutter Apps", "React Native", "App Store Publishing"],
    megaMenuSections: [
      { title: "Native Development", items: ["iOS App Development", "Android App Development", "Swift & SwiftUI", "Kotlin & Jetpack", "Wearable Integration"] },
      { title: "Cross-Platform", items: ["Flutter Development", "React Native", "Ionic Apps", "Xamarin Development", "PWA Development"] },
      { title: "Features & Integrations", items: ["Push Notifications", "In-App Purchases", "Biometric Authentication", "Offline Sync", "Third-Party API Integration"] },
      { title: "Publishing & Growth", items: ["App Store Publishing", "Google Play Publishing", "App Performance Optimization", "App UI/UX Design", "App Analytics Setup"] },
    ] as MegaMenuSection[],
  },
  {
    id: "qa-testing",
    name: "QA & Testing",
    icon: "🧪",
    count: 620,
    subcategories: ["Manual Testing", "Test Automation", "API Testing", "Performance Testing", "Security Testing"],
    megaMenuSections: [
      { title: "Manual Testing", items: ["Web App Testing", "Mobile App Testing", "Cross-Browser Testing", "Usability Testing", "Exploratory Testing"] },
      { title: "Test Automation", items: ["Selenium & Cypress", "Playwright & Puppeteer", "Jest & Mocha", "E2E Test Suites", "Regression Testing"] },
      { title: "Performance & Security", items: ["JMeter Load Testing", "Performance Optimization", "Security Testing", "WCAG Accessibility Audit", "API Security Testing"] },
      { title: "Strategy & Docs", items: ["Test Plans", "Test Case Documentation", "Bug Tracking Workflow", "QA Strategy", "SCRUM Testing Processes"] },
    ] as MegaMenuSection[],
  },
  {
    id: "education-training",
    name: "Education & Training",
    icon: "🎓",
    count: 940,
    subcategories: ["Online Courses", "E-Learning Design", "Curriculum Writing", "Corporate Training", "LMS Setup"],
    megaMenuSections: [
      { title: "Course Creation", items: ["Online Course Development", "Video Tutorial Creation", "SCORM E-Learning", "Microlearning Modules", "Gamified Learning"] },
      { title: "Instructional Design", items: ["Instructional Design", "Articulate Storyline", "Curriculum Writing", "Lesson Plans", "Assessment Design"] },
      { title: "Corporate Training", items: ["Employee Onboarding", "Compliance Training", "Soft Skills Training", "Leadership Development", "Sales Training"] },
      { title: "Platforms & Tools", items: ["Moodle & Thinkific", "LMS Setup", "Certification Programs", "Mentoring Frameworks", "Training Needs Analysis"] },
    ] as MegaMenuSection[],
  },
  {
    id: "healthcare-wellness",
    name: "Healthcare & Wellness",
    icon: "🏥",
    count: 750,
    subcategories: ["Medical Content", "Health Apps", "HIPAA Compliance", "Wellness Coaching", "Telemedicine"],
    megaMenuSections: [
      { title: "Digital Health", items: ["Health App UI/UX", "Telemedicine Platforms", "Mental Health Apps", "Wearable Data Integration", "EMR/EHR Documentation"] },
      { title: "Medical Content", items: ["Patient Education Materials", "Medical Writing", "Healthcare Blogging", "Clinical Documentation", "Medical Billing"] },
      { title: "Compliance & Legal", items: ["HIPAA Compliance", "Privacy Policies", "Healthcare Business Plans", "Grant Proposals", "Clinical Trial Protocols"] },
      { title: "Wellness Programs", items: ["Wellness Coaching", "Nutrition Content", "Rehabilitation Programs", "Remote Patient Monitoring", "Healthcare Staffing Design"] },
    ] as MegaMenuSection[],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: "🏡",
    count: 870,
    subcategories: ["Property Listings", "Real Estate Websites", "Virtual Staging", "Investment Analysis", "Real Estate Marketing"],
    megaMenuSections: [
      { title: "Listings & Marketing", items: ["Listing Presentations", "Property Descriptions", "Real Estate Flyers", "Open House Materials", "Real Estate Branding"] },
      { title: "Digital & Tech", items: ["Real Estate Websites", "Property Search Portals", "Lead Generation Funnels", "Email Drip Campaigns", "Property Management Dashboards"] },
      { title: "Visual & Virtual", items: ["Virtual Staging", "Video Tours", "3D Walkthroughs", "Drone Photo Editing", "Floor Plan Design"] },
      { title: "Investment & Analysis", items: ["Investment Analysis", "Market Research", "ROI Modeling", "Feasibility Studies", "Lease Agreement Templates"] },
    ] as MegaMenuSection[],
  },
  {
    id: "travel-hospitality",
    name: "Travel & Hospitality",
    icon: "✈️",
    count: 680,
    subcategories: ["Travel Itineraries", "Tourism Websites", "Hotel Marketing", "Travel Content", "Booking Systems"],
    megaMenuSections: [
      { title: "Planning & Content", items: ["Travel Itinerary Planning", "Destination Guides", "Travel Blog Writing", "SEO Travel Content", "Sustainable Tourism Strategy"] },
      { title: "Branding & Design", items: ["Travel Brand Identity", "Hotel & Resort Materials", "Restaurant Menu Design", "Tour Package Design", "Luxury Travel Packages"] },
      { title: "Digital & Tech", items: ["Travel Website Design", "Booking System Prototype", "Travel App UI/UX", "Travel Agency Sites", "Social Media for Travel"] },
      { title: "Hospitality Services", items: ["Hospitality Training", "Tourism Market Research", "Destination Wedding Planning", "Competitive Pricing Analysis", "Travel Insurance Docs"] },
    ] as MegaMenuSection[],
  },
  {
    id: "event-management",
    name: "Event Management",
    icon: "🎪",
    count: 730,
    subcategories: ["Event Planning", "Event Marketing", "Virtual Events", "Wedding Planning", "Corporate Events"],
    megaMenuSections: [
      { title: "Event Planning", items: ["Corporate Event Planning", "Wedding Planning", "Product Launch Events", "Team Building", "Gala & Fundraiser Planning"] },
      { title: "Marketing & Design", items: ["Event Marketing Materials", "Event Websites", "Invitations & Save-the-Dates", "Sponsorship Proposals", "Event Branding"] },
      { title: "Virtual & Production", items: ["Virtual Event Production", "Live Streaming Setup", "Event Scripts & MC Notes", "Event Photography Brief", "Event Videos"] },
      { title: "Operations & Logistics", items: ["Vendor Management", "Event Floor Plans", "Budget Tracking", "Post-Event Reports", "Trade Show Booths"] },
    ] as MegaMenuSection[],
  },
  {
    id: "social-media-mgmt",
    name: "Social Media Management",
    icon: "📲",
    count: 1120,
    subcategories: ["Instagram Management", "Content Creation", "TikTok Growth", "LinkedIn Management", "Social Media Strategy"],
    megaMenuSections: [
      { title: "Account Management", items: ["Instagram Management", "Facebook Management", "LinkedIn Management", "Twitter/X Management", "Pinterest Management"] },
      { title: "Content Creation", items: ["Monthly Content Calendars", "Reels & Short Videos", "Story Templates", "Infographics for Social", "UGC Campaigns"] },
      { title: "Growth & Analytics", items: ["TikTok Growth Strategy", "Audience Growth", "Social Media Analytics", "Competitor Benchmarking", "Social Media Audit"] },
      { title: "Strategy & Crisis", items: ["Social Media Strategy", "Brand Voice Guidelines", "Crisis Communications", "Influencer Management", "Giveaway Campaigns"] },
    ] as MegaMenuSection[],
  },
  {
    id: "public-relations",
    name: "Public Relations",
    icon: "📣",
    count: 490,
    subcategories: ["Press Releases", "Media Outreach", "PR Strategy", "Reputation Management", "Crisis Communications"],
    megaMenuSections: [
      { title: "Media & Outreach", items: ["Press Releases", "Media Outreach", "Journalist Pitching", "Media List Building", "Product Launch PR"] },
      { title: "Strategy & Content", items: ["PR Strategy", "Brand Story Writing", "Thought Leadership Articles", "Award Submissions", "Bylined Articles"] },
      { title: "Corporate Communications", items: ["Investor Relations", "Executive Speeches", "Employee Newsletters", "Annual Report Content", "Shareholder Communications"] },
      { title: "Reputation & Crisis", items: ["Reputation Management", "Crisis Communications", "PR Monitoring", "CSR Communications", "Influencer Program Materials"] },
    ] as MegaMenuSection[],
  },
  {
    id: "product-management",
    name: "Product Management",
    icon: "🗂️",
    count: 780,
    subcategories: ["Product Roadmaps", "User Research", "PRDs", "Product Strategy", "OKRs & Metrics"],
    megaMenuSections: [
      { title: "Strategy & Planning", items: ["Product Roadmaps", "Product Vision & Strategy", "Go-to-Market Plans", "Revenue & Pricing Models", "OKRs & Success Metrics"] },
      { title: "Research & Discovery", items: ["User Research", "Jobs-to-Be-Done", "Persona Development", "Competitive Analysis", "Product Discovery Workshops"] },
      { title: "Documentation", items: ["Product Requirements Docs", "User Stories & Acceptance Criteria", "Feature Specifications", "API Product Documentation", "Post-Launch Analysis"] },
      { title: "Execution & Analytics", items: ["Backlog Prioritization", "Design Sprints", "Product Analytics Plan", "A/B Testing Strategy", "Stakeholder Management"] },
    ] as MegaMenuSection[],
  },
  {
    id: "supply-chain",
    name: "Supply Chain & Logistics",
    icon: "📦",
    count: 520,
    subcategories: ["Inventory Management", "Supplier Sourcing", "Logistics Planning", "Demand Forecasting", "Warehouse Operations"],
    megaMenuSections: [
      { title: "Planning & Forecasting", items: ["Demand Forecasting", "Inventory Optimization", "Production Planning", "Supply Chain SOPs", "S&OP Process Design"] },
      { title: "Procurement & Sourcing", items: ["Supplier Sourcing", "Vendor Management", "Procurement Policy", "Supplier Diversity Programs", "Total Landed Cost Analysis"] },
      { title: "Operations & Logistics", items: ["Warehouse Layout Optimization", "Last-Mile Delivery Strategy", "Logistics Planning", "Cold Chain Management", "Import/Export Compliance"] },
      { title: "Risk & Sustainability", items: ["Supply Chain Risk Assessment", "Reverse Logistics", "ESG Reporting", "Supply Chain Technology Evaluation", "KPI Dashboards"] },
    ] as MegaMenuSection[],
  },
  {
    id: "environment-sustainability",
    name: "Environment & Sustainability",
    icon: "🌿",
    count: 430,
    subcategories: ["Sustainability Reports", "Carbon Footprint", "ESG Reporting", "Green Strategy", "Environmental Policy"],
    megaMenuSections: [
      { title: "Reporting & Assessment", items: ["Sustainability Reports", "ESG Reporting", "Carbon Footprint Analysis", "Life Cycle Assessment", "Scope 1-2-3 Emissions Inventory"] },
      { title: "Strategy & Policy", items: ["Green Strategy Documentation", "Environmental Policy", "Net-Zero Roadmap", "Circular Economy Plan", "Sustainable Procurement Policy"] },
      { title: "Research & Compliance", items: ["Environmental Impact Assessments", "Climate Risk Assessment", "Biodiversity Assessments", "Energy Audits", "LEED Certification Docs"] },
      { title: "Communication & Training", items: ["Green Marketing Content", "Employee Sustainability Training", "Grant Applications", "Supplier Sustainability Assessment", "Science-Based Targets"] },
    ] as MegaMenuSection[],
  },
  {
    id: "nonprofit-social",
    name: "Nonprofit & Social Impact",
    icon: "🤝",
    count: 410,
    subcategories: ["Grant Writing", "Fundraising Strategy", "Nonprofit Marketing", "Donor Engagement", "Impact Measurement"],
    megaMenuSections: [
      { title: "Fundraising & Grants", items: ["Grant Proposals", "Fundraising Strategy", "Case Statements", "Major Donor Solicitation", "Foundation Partnership Proposals"] },
      { title: "Marketing & Communications", items: ["Nonprofit Marketing Materials", "Annual Reports", "Press Releases", "Advocacy Materials", "Awareness Campaigns"] },
      { title: "Operations & Technology", items: ["Volunteer Management Programs", "Donation Website", "Nonprofit CRM Setup", "Board Governance Handbook", "Community Outreach Strategy"] },
      { title: "Impact & Finance", items: ["Impact Measurement", "Program Evaluation", "Nonprofit Financial Health", "Donor Retention Campaigns", "Peer-to-Peer Fundraising"] },
    ] as MegaMenuSection[],
  },
  {
    id: "sports-recreation",
    name: "Sports & Recreation",
    icon: "⚽",
    count: 570,
    subcategories: ["Sports Training", "Sports Marketing", "Sports Analytics", "Athlete Branding", "Esports"],
    megaMenuSections: [
      { title: "Training & Coaching", items: ["Athlete Training Programs", "Sports Nutrition Plans", "Coaching Documentation", "Injury Prevention Plans", "Youth Sports Coaching"] },
      { title: "Branding & Marketing", items: ["Sports Team Logo & Branding", "Sponsorship Proposals", "Athlete Personal Branding", "Sports Social Media Content", "Sports Event Programs"] },
      { title: "Analytics & Strategy", items: ["Sports Analytics Dashboards", "Scouting Reports", "Game Plans & Tactical Analysis", "Sports Journalism", "Fantasy Sports Apps"] },
      { title: "Digital & Esports", items: ["Esports Tournament Management", "Sports Betting Analysis", "Sports Facility Design", "Sports Camp Curriculum", "Sports Sponsorship ROI"] },
    ] as MegaMenuSection[],
  },
  {
    id: "beauty-personal-care",
    name: "Beauty & Personal Care",
    icon: "💅",
    count: 650,
    subcategories: ["Skincare Guides", "Beauty Branding", "Beauty Content", "Salon Design", "Beauty E-Commerce"],
    megaMenuSections: [
      { title: "Content & Guides", items: ["Skincare Routine Guides", "Makeup Tutorials", "Beauty Blog Content", "Haircare Routines", "Color Analysis & Styling"] },
      { title: "Branding & Design", items: ["Beauty Brand Identity", "Product Packaging Design", "Salon & Spa Menus", "Beauty E-Commerce Websites", "Fragrance Brand Identity"] },
      { title: "Marketing & Influencer", items: ["Beauty Social Media Content", "Beauty Influencer Media Kits", "Promotional Materials", "Beauty Events", "Men's Grooming Strategy"] },
      { title: "Business & Education", items: ["Beauty Academy Curriculum", "Product Descriptions", "Beauty Subscription Boxes", "Sustainable Beauty Strategy", "Beauty Industry Research"] },
    ] as MegaMenuSection[],
  },
  {
    id: "home-improvement",
    name: "Home Improvement",
    icon: "🔨",
    count: 590,
    subcategories: ["Renovation Planning", "Interior Color Consulting", "Smart Home", "Garden Design", "Home Staging"],
    megaMenuSections: [
      { title: "Planning & Design", items: ["Renovation Plans", "Kitchen & Bathroom Remodels", "Interior Color Consulting", "Furniture Layout Design", "Lighting Design Plans"] },
      { title: "DIY & Guides", items: ["DIY Home Improvement Guides", "Home Maintenance Schedules", "Contractor Management Docs", "Budget Renovation Plans", "HVAC & Plumbing Planning"] },
      { title: "Smart & Outdoor", items: ["Smart Home Automation Setup", "Garden & Landscape Design", "Outdoor Living Spaces", "Tiny Home Floor Plans", "Home Security Planning"] },
      { title: "Staging & Selling", items: ["Home Staging Checklists", "Home Energy Audit", "Home Organization Plans", "ADU Design", "First-Time Homeowner Guides"] },
    ] as MegaMenuSection[],
  },
  {
    id: "automotive-vehicles",
    name: "Automotive & Vehicles",
    icon: "🚗",
    count: 460,
    subcategories: ["Car Wraps", "Automotive Content", "Dealership Websites", "Fleet Management", "EV Planning"],
    megaMenuSections: [
      { title: "Branding & Design", items: ["Car Wrap & Decal Design", "Racing Livery Design", "Automotive 3D Renderings", "Motorcycle Graphics", "Fleet Branding"] },
      { title: "Marketing & Content", items: ["Automotive Marketing Materials", "Car Review Content", "Dealership Websites", "Automotive Social Media", "Automotive Blog Writing"] },
      { title: "Operations & Tech", items: ["Fleet Management Systems", "Vehicle Tracking Apps", "Connected Car App UI", "Car Rental System Design", "Driver Training Programs"] },
      { title: "Research & Specialty", items: ["Automotive Market Research", "Used Car Valuations", "EV Conversion Planning", "Vintage Car Restoration", "Road Trip Itineraries"] },
    ] as MegaMenuSection[],
  },
  {
    id: "pets-animals",
    name: "Pets & Animals",
    icon: "🐾",
    count: 480,
    subcategories: ["Pet Care Guides", "Pet Branding", "Vet Websites", "Pet Training", "Pet E-Commerce"],
    megaMenuSections: [
      { title: "Care & Training", items: ["Dog Training Programs", "Cat Care Guides", "Horse Care Programs", "Exotic Pet Guides", "Wildlife Rescue Documentation"] },
      { title: "Branding & Design", items: ["Pet Brand Identity", "Pet Product Packaging", "Personalized Pet Portraits", "Pet Shop Interior Design", "Pet Memorial Page Design"] },
      { title: "Content & Marketing", items: ["Pet Care Blog Content", "Pet Social Media Content", "Pet Influencer Media Kits", "Veterinary Website Design", "Pet Insurance FAQs"] },
      { title: "Business & Services", items: ["Pet Boarding Business Plan", "Pet-Friendly Travel Guides", "Pet Product Descriptions", "Aquarium & Reptile Guides", "Bird Keeper Guides"] },
    ] as MegaMenuSection[],
  },
  {
    id: "wedding-celebrations",
    name: "Weddings & Celebrations",
    icon: "💒",
    count: 760,
    subcategories: ["Wedding Planning", "Wedding Invitations", "Wedding Websites", "Wedding Speeches", "Party Planning"],
    megaMenuSections: [
      { title: "Planning & Logistics", items: ["Wedding Planning Timelines", "Wedding Budget Trackers", "Vendor Scheduling", "Destination Wedding Guides", "Wedding Day-Of Timelines"] },
      { title: "Design & Stationery", items: ["Wedding Invitations", "Save-the-Dates", "Seating Charts", "Mood Boards", "Wedding Favor Guides"] },
      { title: "Digital & Web", items: ["Wedding Websites", "RSVP Systems", "Wedding Photo Galleries", "Wedding Social Media", "Virtual Ceremony Setup"] },
      { title: "Writing & Speeches", items: ["Wedding Vows", "Wedding Speeches & Toasts", "Ceremony Scripts", "Thank You Notes", "Anniversary Tributes"] },
    ] as MegaMenuSection[],
  },
  {
    id: "arts-crafts",
    name: "Arts & Crafts",
    icon: "🖌️",
    count: 570,
    subcategories: ["Calligraphy", "Watercolor Art", "Embroidery Patterns", "Custom Portraits", "DIY Crafts"],
    megaMenuSections: [
      { title: "Visual Art", items: ["Calligraphy & Hand Lettering", "Watercolor Paintings", "Custom Portrait Art", "Botanical Illustration", "Abstract Digital Art"] },
      { title: "Patterns & Textiles", items: ["Fabric & Textile Prints", "Embroidery Patterns", "Knitting & Crochet Patterns", "Macrame & Weaving Patterns", "Zentangle Designs"] },
      { title: "Crafts & DIY", items: ["Paper Craft & Origami", "Jewelry Making Tutorials", "Candle & Soap Making", "Leatherworking Patterns", "Woodworking Plans"] },
      { title: "Digital & Print", items: ["Printable Coloring Pages", "Scrapbooking Templates", "Comic Strip Illustration", "Print-on-Demand Designs", "Pottery Workshop Curriculum"] },
    ] as MegaMenuSection[],
  },
  {
    id: "fitness-nutrition",
    name: "Fitness & Nutrition",
    icon: "🥗",
    count: 830,
    subcategories: ["Workout Plans", "Nutrition Plans", "Personal Training", "Corporate Wellness", "Sports Performance"],
    megaMenuSections: [
      { title: "Training Programs", items: ["Custom Workout Plans", "Body Transformation Programs", "HIIT Exercise Guides", "Marathon Training Plans", "Functional Fitness Programs"] },
      { title: "Nutrition & Diet", items: ["Personalized Nutrition Plans", "Meal Prep Programs", "Weight Loss Cookbooks", "Sports Performance Nutrition", "Prenatal Exercise Programs"] },
      { title: "Business & Marketing", items: ["Gym Marketing Materials", "Fitness Content Writing", "Fitness App UI Design", "Corporate Wellness Programs", "Fitness Challenge Programs"] },
      { title: "Assessment & Coaching", items: ["Client Intake Forms", "Recovery & Mobility Plans", "Senior Fitness Programs", "Evidence-Based Fitness Articles", "Supplement Reviews"] },
    ] as MegaMenuSection[],
  },
  {
    id: "language-learning",
    name: "Language Learning",
    icon: "🌐",
    count: 720,
    subcategories: ["Language Tutoring", "Curriculum Design", "Test Prep", "Business Language", "Language Apps"],
    megaMenuSections: [
      { title: "Language Tutoring", items: ["Spanish Lessons", "French Lessons", "Mandarin Chinese Lessons", "German Lessons", "Portuguese Lessons"] },
      { title: "Specialized Learning", items: ["Business English", "Accent Reduction Coaching", "IELTS & TOEFL Prep", "Arabic Lessons", "Japanese Lessons"] },
      { title: "Curriculum & Materials", items: ["Language Curriculum Design", "Flashcard Sets", "Vocabulary Study Materials", "Bilingual Educational Materials", "Pronunciation Training"] },
      { title: "Digital & Community", items: ["Language App Content", "Language Learning Games", "Sign Language Lessons", "Immersion Programs", "Language Exchange Guides"] },
    ] as MegaMenuSection[],
  },
  {
    id: "music-lessons",
    name: "Music Lessons",
    icon: "🎸",
    count: 640,
    subcategories: ["Guitar Lessons", "Piano Lessons", "Vocal Coaching", "Music Production", "Music Theory"],
    megaMenuSections: [
      { title: "Instrument Lessons", items: ["Guitar Lessons", "Piano Lessons", "Drum Lessons", "Bass Guitar Lessons", "Violin & String Instruments"] },
      { title: "Vocal & Songwriting", items: ["Singing & Vocal Technique", "Songwriting & Composition", "R&B & Soul Vocals", "Music Audition Prep", "Ukulele Lessons"] },
      { title: "Production & Theory", items: ["Music Theory & Ear Training", "Music Production Lessons", "Ableton Live Tutorials", "FL Studio Lessons", "DJ Lessons"] },
      { title: "Specialty & Practice", items: ["Classical Guitar Lessons", "Jazz Improvisation", "Sight-Reading Lessons", "Lo-Fi Beat Production", "Music Practice Routines"] },
    ] as MegaMenuSection[],
  },
  {
    id: "career-development",
    name: "Career Development",
    icon: "🚀",
    count: 780,
    subcategories: ["Resume Writing", "LinkedIn Optimization", "Interview Coaching", "Career Coaching", "Salary Negotiation"],
    megaMenuSections: [
      { title: "Job Search", items: ["ATS Resume Writing", "Cover Letters", "LinkedIn Profile Optimization", "Job Application Strategy", "Portfolio & Personal Website"] },
      { title: "Interview & Negotiation", items: ["Interview Preparation", "Mock Interviews", "Salary Negotiation Coaching", "Performance Review Coaching", "Promotion Strategy"] },
      { title: "Career Planning", items: ["Career Change Strategy", "Career Assessment & Coaching", "90-Day New Job Plans", "Skill Gap Analysis", "Personal Brand Strategy"] },
      { title: "Growth & Freelancing", items: ["Executive Coaching", "Networking Strategy", "Freelance Business Setup", "Side Hustle Strategy", "Retirement & Second Career Coaching"] },
    ] as MegaMenuSection[],
  },
  {
    id: "ar-vr",
    name: "AR & VR",
    icon: "🥽",
    count: 560,
    subcategories: ["WebAR Experiences", "VR Training", "AR Filters", "Virtual Showrooms", "Mixed Reality"],
    megaMenuSections: [
      { title: "Augmented Reality", items: ["WebAR Experiences", "AR Product Try-On", "AR Filters for Instagram & Snapchat", "AR Navigation", "AR Marketing Campaigns"] },
      { title: "Virtual Reality", items: ["VR Training Simulations", "VR Meditation Experiences", "VR Games", "VR Healthcare Training", "360° Video Experiences"] },
      { title: "Metaverse & Mixed Reality", items: ["Metaverse Experiences", "Digital Twin Visualization", "HoloLens Applications", "Virtual Events with Avatars", "Spatial Audio Experiences"] },
      { title: "Business Applications", items: ["Virtual Showrooms", "AR E-Commerce Try-On", "WebXR Applications", "AR Business Cards", "AR Packaging Experiences"] },
    ] as MegaMenuSection[],
  },
  {
    id: "3d-modeling",
    name: "3D Modeling",
    icon: "🧊",
    count: 710,
    subcategories: ["Product 3D Models", "Character Modeling", "Architectural Models", "3D Printing", "Game Assets"],
    megaMenuSections: [
      { title: "Product & Industrial", items: ["Product 3D Modeling", "Product Prototype Rendering", "Hard Surface Modeling", "3D Printing Models", "Jewelry 3D Design"] },
      { title: "Characters & Organic", items: ["3D Character Modeling", "ZBrush Sculpting", "Character Rigging", "Fantasy & Creature Characters", "3D Fashion & Clothing"] },
      { title: "Architecture & Environment", items: ["Architectural 3D Models", "3D Environmental Design", "Furniture 3D Models", "3D Terrain & Landscapes", "3D Interior Design Models"] },
      { title: "Animation & Visual", items: ["3D Logo Reveal Animation", "3D Motion Graphics", "3D Typography Effects", "Medical & Scientific 3D", "Automotive 3D Rendering"] },
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

