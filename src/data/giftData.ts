export interface StaticGift {
  title: string;
  desc: string;
  priceVal: number;
  stars: string;
  badge: string;
  query: string;
  imgSvg: string;
}

export interface Gift {
  id: string;
  title: string;
  desc: string;
  price: Record<string, number>;
  budgets: string[];
  occasions: string[];
  interests: string[];
  type: string;
  query: string;
  badge: string;
  stars: string;
  imgSvg: string;
  countries: string[];
  durations: string[];
}

export const staticBestGift: StaticGift = {
  title: "Under Lucky Stars Star Map",
  desc: "A beautifully printed map of the alignment of the stars at the exact time and location you met, fell in love, or got committed.",
  priceVal: 45,
  stars: "⭐⭐⭐⭐⭐",
  badge: "Ships locally",
  query: "custom star map poster",
  imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-[#ea2261]"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11.48 3.499c.195-.39.68-.39.874 0l2.232 4.474 4.884.71c.433.063.606.592.293.898l-3.535 3.45.835 4.86c.074.437-.384.77-.777.561l-4.364-2.297-4.364 2.297c-.393.209-.851-.124-.777-.561l.835-4.86-3.535-3.45c-.313-.306-.14-.835.293-.898l4.884-.71 2.232-4.474z" /></svg>`
};

export const staticAlternatives: StaticGift[] = [
  {
    title: "Bond Touch Connection Bracelets",
    desc: "Touch your bracelet and your partner's bracelet vibrates and lights up, letting them know they are on your mind instantly.",
    priceVal: 108,
    stars: "⭐⭐⭐⭐⭐",
    badge: "Ships locally",
    query: "Bond Touch Connection Bracelets",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-[#533afd]"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697-.056-4.024-.166C6.845 7.996 6 7.014 6 5.874V5.75L12 3l6 2.75v.124c0 1.14-.845 2.122-1.976 2.21-1.327.11-2.67.166-4.024.166zm-4.024-.166C6.845 7.996 6 7.014 6 5.874V5.75L12 3l6 2.75v.124c0 1.14-.845 2.122-1.976 2.21-1.327.11-2.67.166-4.024.166z" /></svg>`
  },
  {
    title: "Cozymeal Cooking Class",
    desc: "A live, interactive cooking class hosted by world-class chefs. Cook the same recipe side-by-side on video call.",
    priceVal: 39,
    stars: "⭐⭐⭐⭐⭐",
    badge: "Ships locally",
    query: "cozymeal virtual cooking class gift card",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-yellow-500"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.75 3.104v1.244c0 .41-.195.794-.527 1.036L4.25 9.098a1.5 1.5 0 00-.5 1.13v8.522c0 .828.672 1.5 1.5 1.5h13.5c.828 0 1.5-.672 1.5-1.5v-8.522a1.5 1.5 0 00-.5-1.13l-4.973-3.714a1.296 1.296 0 00-.527-1.036V3.104c0-.83-.672-1.5-1.5-1.5h-3c-.828 0-1.5.672-1.5 1.5z" /></svg>`
  }
];

const allCountries = ["US", "IN", "CA", "GB", "AU", "SG", "DE", "FR", "JP", "RU"];

export const giftsDb: Gift[] = [
  {
    id: "touch-bracelets",
    title: "Bond Touch Connection Bracelets",
    desc: "Touch your bracelet and your partner's bracelet vibrates and lights up, letting them know they are on your mind instantly.",
    price: { low: 108, medium: 108, high: 108, premium: 108 },
    budgets: ["high", "premium"],
    occasions: ["anniversary", "birthday", "just-because"],
    interests: ["travel", "fitness"],
    type: "local-delivery",
    query: "Bond Touch Connection Bracelets",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-[#533afd]"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697-.056-4.024-.166C6.845 7.996 6 7.014 6 5.874V5.75L12 3l6 2.75v.124c0 1.14-.845 2.122-1.976 2.21-1.327.11-2.67.166-4.024.166zm-4.024-.166C6.845 7.996 6 7.014 6 5.874V5.75L12 3l6 2.75v.124c0 1.14-.845 2.122-1.976 2.21-1.327.11-2.67.166-4.024.166z" /></svg>`,
    countries: allCountries,
    durations: ["medium", "high", "premium"]
  },
  {
    id: "star-map",
    title: "Under Lucky Stars Star Map",
    desc: "A beautifully printed map of the alignment of the stars at the exact time and location you met, fell in love, or got committed.",
    price: { low: 45, medium: 45, high: 45, premium: 45 },
    budgets: ["medium", "high", "premium"],
    occasions: ["anniversary", "birthday", "first-meet"],
    interests: ["art", "travel"],
    type: "local-delivery",
    query: "custom star map poster",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-[#ea2261]"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11.48 3.499c.195-.39.68-.39.874 0l2.232 4.474 4.884.71c.433.063.606.592.293.898l-3.535 3.45.835 4.86c.074.437-.384.77-.777.561l-4.364-2.297-4.364 2.297c-.393.209-.851-.124-.777-.561l.835-4.86-3.535-3.45c-.313-.306-.14-.835.293-.898l4.884-.71 2.232-4.474z" /></svg>`,
    countries: allCountries,
    durations: ["medium", "high", "premium"]
  },
  {
    id: "cozy-cooking",
    title: "Cozymeal Cooking Class",
    desc: "A live, interactive cooking class hosted by world-class chefs. Cook the same recipe side-by-side on video call.",
    price: { low: 29, medium: 29, high: 39, premium: 59 },
    budgets: ["low", "medium", "high", "premium"],
    occasions: ["anniversary", "just-because", "birthday"],
    interests: ["cooking", "coffee"],
    type: "digital",
    query: "cozymeal virtual cooking class gift card",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-yellow-500"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.75 3.104v1.244c0 .41-.195.794-.527 1.036L4.25 9.098a1.5 1.5 0 00-.5 1.13v8.522c0 .828.672 1.5 1.5 1.5h13.5c.828 0 1.5-.672 1.5-1.5v-8.522a1.5 1.5 0 00-.5-1.13l-4.973-3.714a1.296 1.296 0 00-.527-1.036V3.104c0-.83-.672-1.5-1.5-1.5h-3c-.828 0-1.5.672-1.5 1.5z" /></svg>`,
    countries: allCountries,
    durations: ["low", "medium", "high", "premium"]
  },
  {
    id: "scent-candles",
    title: "Homesick State Scents",
    desc: "Specially formulated candles styled to smell like the exact state, city, or country they miss, keeping home close to heart.",
    price: { low: 34, medium: 34, high: 34, premium: 34 },
    budgets: ["medium", "high", "premium"],
    occasions: ["just-because", "holiday"],
    interests: ["coffee", "travel"],
    type: "local-delivery",
    query: "Homesick State scented candle",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-teal-400"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /></svg>`,
    countries: allCountries,
    durations: ["low", "medium", "high", "premium"]
  },
  {
    id: "paired-app",
    title: "Paired App Premium",
    desc: "An app for couples containing daily relationship questions, quiz games, and exercises to maintain deep emotional connection.",
    price: { low: 15, medium: 30, high: 30, premium: 30 },
    budgets: ["low", "medium", "high", "premium"],
    occasions: ["anniversary", "just-because"],
    interests: ["reading", "gaming"],
    type: "digital",
    query: "Paired couples app premium",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-pink-400"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>`,
    countries: allCountries,
    durations: ["low", "medium", "high", "premium"]
  },
  {
    id: "food-feast",
    title: "Surprise Local Feast",
    desc: "Pre-order a gourmet meal from their favorite restaurant using a delivery app in their city and have it arrive hot right as you call.",
    price: { low: 20, medium: 45, high: 70, premium: 100 },
    budgets: ["low", "medium", "high", "premium"],
    occasions: ["birthday", "anniversary", "just-because"],
    interests: ["cooking", "coffee"],
    type: "digital",
    query: "DoorDash UberEats Zomato gift card",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-orange-400"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.825-13.5a1.125 1.125 0 00-1.122-1.056H3.375a1.125 1.125 0 00-1.125 1.125v1.5m17.25 0V5.25m0 9v-6m0 6a2.25 2.25 0 01-2.25-2.25v-1.5m0-3h-12m12 0a2.25 2.25 0 00-2.25-2.25H6.75" /></svg>`,
    countries: allCountries,
    durations: ["low", "medium", "high", "premium"]
  },
  {
    id: "gaming-pass",
    title: "Xbox / Steam Gaming Gift Card",
    desc: "Instant access to hundreds of high-quality multiplayer games, perfect for playing co-op together online.",
    price: { low: 15, medium: 50, high: 100, premium: 150 },
    budgets: ["low", "medium", "high", "premium"],
    occasions: ["birthday", "just-because"],
    interests: ["gaming"],
    type: "digital",
    query: "Xbox Game Pass Ultimate Steam gift card",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-emerald-400"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.75m0 0l-3-3m3 3l3-3m-6.75 3a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>`,
    countries: allCountries,
    durations: ["low", "medium", "high", "premium"]
  },
  {
    id: "noise-headphones",
    title: "Premium Wireless Noise-Cancelling Headphones",
    desc: "Bose or Sony noise-cancelling headphones, perfect for crystal-clear long-distance video calls without echo.",
    price: { low: 199, medium: 199, high: 249, premium: 349 },
    budgets: ["high", "premium"],
    occasions: ["birthday", "anniversary", "holiday"],
    interests: ["music", "gaming"],
    type: "local-delivery",
    query: "noise cancelling wireless headphones",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-[#665efd]"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>`,
    countries: allCountries,
    durations: ["high", "premium"]
  },
  {
    id: "coffee-beans",
    title: "Gourmet Specialty Coffee Beans Selection",
    desc: "A handpicked selection of single-origin coffee beans freshly roasted and delivered to their doorstep from local premium roasters.",
    price: { low: 22, medium: 35, high: 60, premium: 90 },
    budgets: ["low", "medium", "high", "premium"],
    occasions: ["birthday", "just-because"],
    interests: ["coffee"],
    type: "local-delivery",
    query: "specialty coffee beans sampler gift set",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-amber-600"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>`,
    countries: allCountries,
    durations: ["low", "medium", "high", "premium"]
  },
  {
    id: "kindle-reader",
    title: "Amazon Kindle Paperwhite",
    desc: "Thin, lightweight, and waterproof. Perfect for reading their favorite books or sharing e-book selections together on calls.",
    price: { low: 139, medium: 139, high: 139, premium: 189 },
    budgets: ["high", "premium"],
    occasions: ["birthday", "anniversary", "holiday"],
    interests: ["reading"],
    type: "local-delivery",
    query: "Kindle Paperwhite waterproof",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-purple-400"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`,
    countries: allCountries,
    durations: ["high", "premium"]
  },
  {
    id: "art-set",
    title: "Professional Acrylic & Watercolor Kit",
    desc: "Includes high-grade pigments, brush selection, palette, and table easel. Perfect for conducting virtual paint date nights.",
    price: { low: 24, medium: 45, high: 80, premium: 120 },
    budgets: ["low", "medium", "high", "premium"],
    occasions: ["birthday", "anniversary", "just-because"],
    interests: ["art"],
    type: "local-delivery",
    query: "complete acrylic paint set easel",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-rose-500"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.53 16.122l.188.188a1.5 1.5 0 11-2.122 2.122l-.188-.188m2.122-2.122A1.5 1.5 0 106.608 14m2.922 2.122a1.5 1.5 0 11-2.922-2.122m3.844-3.844L12 9l3.844 3.844m-7.688 0A1.5 1.5 0 116.608 14m6.447-4.47l.884-.884a1.5 1.5 0 112.122 2.122l-.884.884m-2.122-2.122A1.5 1.5 0 1012 9m1.055.53a1.5 1.5 0 11-1.055-.53" /></svg>`,
    countries: allCountries,
    durations: ["low", "medium", "high", "premium"]
  },
  {
    id: "fitness-bands",
    title: "Resistance Band & Wellness Kit",
    desc: "Stackable workout bands with heavy-duty anchors, dynamic instructions, and a virtual couples challenge program.",
    price: { low: 18, medium: 30, high: 50, premium: 80 },
    budgets: ["low", "medium", "high", "premium"],
    occasions: ["just-because", "birthday"],
    interests: ["fitness"],
    type: "local-delivery",
    query: "heavy duty resistance bands workout set",
    badge: "Ships locally",
    stars: "⭐⭐⭐⭐⭐",
    imgSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-blue-500"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>`,
    countries: allCountries,
    durations: ["low", "medium", "high", "premium"]
  }
];
