export interface Country {
  name: string;
  tzOffset: number;
  tzName: string;
  currency: string;
  currencyName?: string;
  flag?: string;
}

export const countries: Record<string, Country> = {
  US: { name: "United States", tzOffset: -5, tzName: "EST", currency: "$", currencyName: "USD", flag: "🇺🇸" },
  IN: { name: "India", tzOffset: 5.5, tzName: "IST", currency: "₹", currencyName: "INR", flag: "🇮🇳" },
  CA: { name: "Canada", tzOffset: -5, tzName: "EST", currency: "C$", currencyName: "CAD", flag: "🇨🇦" },
  GB: { name: "United Kingdom", tzOffset: 0, tzName: "GMT", currency: "£", currencyName: "GBP", flag: "🇬🇧" },
  AU: { name: "Australia", tzOffset: 10, tzName: "AEST", currency: "A$", currencyName: "AUD", flag: "🇦🇺" },
  SG: { name: "Singapore", tzOffset: 8, tzName: "SGT", currency: "S$", currencyName: "SGD", flag: "🇸🇬" },
  DE: { name: "Germany", tzOffset: 1, tzName: "CET", currency: "€", currencyName: "EUR", flag: "🇩🇪" },
  FR: { name: "France", tzOffset: 1, tzName: "CET", currency: "€", currencyName: "EUR", flag: "🇫🇷" },
  JP: { name: "Japan", tzOffset: 9, tzName: "JST", currency: "¥", currencyName: "JPY", flag: "🇯🇵" },
  RU: { name: "Russia", tzOffset: 3, tzName: "MSK", currency: "₽", currencyName: "RUB", flag: "🇷🇺" }
};

export interface TzOverlap {
  timeA: string;
  timeB: string;
  note: string;
}

export const tzOverlapMap: Record<string, TzOverlap> = {
  "IN-US": { timeA: "7:30 PM - 10:30 PM", timeB: "10:00 AM - 1:00 PM", note: "Post-dinner wind-down & Morning coffee check-in" },
  "US-IN": { timeA: "10:00 AM - 1:00 PM", timeB: "7:30 PM - 10:30 PM", note: "Morning coffee & Post-dinner catch-up" },
  "IN-GB": { timeA: "6:00 PM - 9:00 PM", timeB: "12:30 PM - 3:30 PM", note: "Evening wind-down & Late lunch break chat" },
  "GB-IN": { timeA: "12:30 PM - 3:30 PM", timeB: "6:00 PM - 9:00 PM", note: "Late lunch break & Evening wind-down" },
  "US-GB": { timeA: "9:00 AM - 12:00 PM", timeB: "2:00 PM - 5:00 PM", note: "Morning check-in & Afternoon chat" },
  "GB-US": { timeA: "2:00 PM - 5:00 PM", timeB: "9:00 AM - 12:00 PM", note: "Afternoon chat & Morning check-in" },
  "US-DE": { timeA: "9:00 AM - 12:00 PM", timeB: "3:00 PM - 6:00 PM", note: "Morning catch-up & Late afternoon break" },
  "DE-US": { timeA: "3:00 PM - 6:00 PM", timeB: "9:00 AM - 12:00 PM", note: "Late afternoon break & Morning catch-up" },
  "US-CA": { timeA: "9:00 AM - 5:00 PM", timeB: "9:00 AM - 5:00 PM", note: "Fully aligned daytime working and awake hours" },
  "CA-US": { timeA: "9:00 AM - 5:00 PM", timeB: "9:00 AM - 5:00 PM", note: "Fully aligned daytime working and awake hours" },
  "US-AU": { timeA: "7:00 PM - 10:00 PM", timeB: "10:00 AM - 1:00 PM", note: "Evening wind-down & Morning coffee next day" },
  "AU-US": { timeA: "10:00 AM - 1:00 PM", timeB: "7:00 PM - 10:00 PM", note: "Morning coffee & Evening wind-down previous day" },
  "US-SG": { timeA: "8:00 PM - 10:00 PM", timeB: "9:00 AM - 11:00 AM", note: "Night chat & Morning check-in next day" },
  "SG-US": { timeA: "9:00 AM - 11:00 AM", timeB: "8:00 PM - 10:00 PM", note: "Morning check-in & Night chat previous day" },
  "IN-CA": { timeA: "7:30 PM - 10:30 PM", timeB: "10:00 AM - 1:00 PM", note: "Post-dinner catch up & Morning check-in" },
  "CA-IN": { timeA: "10:00 AM - 1:00 PM", timeB: "7:30 PM - 10:30 PM", note: "Morning check-in & Post-dinner catch up" },
  "IN-DE": { timeA: "5:30 PM - 8:30 PM", timeB: "2:00 PM - 5:00 PM", note: "Late afternoon tea & Lunch break" },
  "DE-IN": { timeA: "2:00 PM - 5:00 PM", timeB: "5:30 PM - 8:30 PM", note: "Lunch break & Late afternoon tea" },
  "IN-AU": { timeA: "2:00 PM - 5:00 PM", timeB: "6:30 PM - 9:30 PM", note: "Afternoon check-in & Evening wind-down" },
  "AU-IN": { timeA: "6:30 PM - 9:30 PM", timeB: "2:00 PM - 5:00 PM", note: "Evening wind-down & Afternoon check-in" },
  "IN-SG": { timeA: "10:00 AM - 6:00 PM", timeB: "12:30 PM - 8:30 PM", note: "Mid-day chat & Afternoon tea" },
  "SG-IN": { timeA: "12:30 PM - 8:30 PM", timeB: "10:00 AM - 6:00 PM", note: "Afternoon tea & Mid-day chat" },
  "GB-DE": { timeA: "9:00 AM - 5:00 PM", timeB: "10:00 AM - 6:00 PM", note: "Fully aligned daytime and working hours" },
  "DE-GB": { timeA: "10:00 AM - 6:00 PM", timeB: "9:00 AM - 5:00 PM", note: "Fully aligned daytime and working hours" },
  "GB-AU": { timeA: "8:00 AM - 11:00 AM", timeB: "6:00 PM - 9:00 PM", note: "Morning coffee & Evening catch-up" },
  "AU-GB": { timeA: "6:00 PM - 9:00 PM", timeB: "8:00 AM - 11:00 AM", note: "Evening catch-up & Morning coffee" },
  "GB-SG": { timeA: "9:00 AM - 12:00 PM", timeB: "5:00 PM - 8:00 PM", note: "Morning check-in & Evening wind-down" },
  "SG-GB": { timeA: "5:00 PM - 8:00 PM", timeB: "9:00 AM - 12:00 PM", note: "Evening wind-down & Morning check-in" },
  "CA-DE": { timeA: "9:00 AM - 12:00 PM", timeB: "3:00 PM - 6:00 PM", note: "Morning coffee & Late afternoon break" },
  "DE-CA": { timeA: "3:00 PM - 6:00 PM", timeB: "9:00 AM - 12:00 PM", note: "Late afternoon break & Morning coffee" },
  "CA-AU": { timeA: "7:00 PM - 10:00 PM", timeB: "10:00 AM - 1:00 PM", note: "Evening wind-down & Morning coffee next day" },
  "AU-CA": { timeA: "10:00 AM - 1:00 PM", timeB: "7:00 PM - 10:00 PM", note: "Morning coffee & Evening wind-down previous day" },
  "CA-SG": { timeA: "8:00 PM - 10:00 PM", timeB: "9:00 AM - 11:00 AM", note: "Night chat & Morning check-in next day" },
  "SG-CA": { timeA: "9:00 AM - 11:00 AM", timeB: "8:00 PM - 10:00 PM", note: "Morning check-in & Night chat previous day" },
  "DE-AU": { timeA: "8:00 AM - 11:00 AM", timeB: "4:00 PM - 7:00 PM", note: "Morning catch-up & Late afternoon tea" },
  "AU-DE": { timeA: "4:00 PM - 7:00 PM", timeB: "8:00 AM - 11:00 AM", note: "Late afternoon tea & Morning catch-up" },
  "DE-SG": { timeA: "9:00 AM - 12:00 PM", timeB: "4:00 PM - 7:00 PM", note: "Morning check-in & Late afternoon tea" },
  "SG-DE": { timeA: "4:00 PM - 7:00 PM", timeB: "9:00 AM - 12:00 PM", note: "Late afternoon tea & Morning check-in" },
  "AU-SG": { timeA: "11:00 AM - 7:00 PM", timeB: "9:00 AM - 5:00 PM", note: "Mid-day chat & Work hours alignment" },
  "SG-AU": { timeA: "9:00 AM - 5:00 PM", timeB: "11:00 AM - 7:00 PM", note: "Work hours alignment & Mid-day chat" },
  
  // France, Japan, Russia mappings
  "FR-US": { timeA: "3:00 PM - 6:00 PM", timeB: "9:00 AM - 12:00 PM", note: "Late afternoon catch-up & Morning check-in" },
  "JP-US": { timeA: "9:00 AM - 11:00 AM", timeB: "7:00 PM - 9:00 PM", note: "Morning coffee & Evening chat previous day" },
  "RU-US": { timeA: "5:00 PM - 7:00 PM", timeB: "9:00 AM - 11:00 AM", note: "Evening check-in & Morning coffee" },
  "FR-IN": { timeA: "1:00 PM - 4:00 PM", timeB: "5:30 PM - 8:30 PM", note: "Lunch break & Late afternoon tea" },
  "JP-IN": { timeA: "9:30 PM - 12:30 AM", timeB: "6:00 PM - 9:00 PM", note: "Night chat & Evening check-in" },
  "RU-IN": { timeA: "4:00 PM - 7:00 PM", timeB: "6:30 PM - 9:30 PM", note: "Afternoon check-in & Evening wind-down" },
  "FR-GB": { timeA: "10:00 AM - 6:00 PM", timeB: "9:00 AM - 5:00 PM", note: "Fully aligned daytime and working hours" },
  "JP-GB": { timeA: "5:00 PM - 8:00 PM", timeB: "8:00 AM - 11:00 AM", note: "Evening catch-up & Morning coffee" },
  "RU-GB": { timeA: "1:00 PM - 8:00 PM", timeB: "10:00 AM - 5:00 PM", note: "Highly aligned daytime hours" }
};

export interface BudgetTier {
  value: string;
  text: string;
  selected?: boolean;
}

export const budgetTiers: Record<string, BudgetTier[]> = {
  US: [
    { value: "low", text: "Under $25 (Budget-friendly)" },
    { value: "medium", text: "$25 - $75 (Sweet Spot)", selected: true },
    { value: "high", text: "$75 - $200 (Premium Care)" },
    { value: "premium", text: "$200+ (Luxury & Milestones)" }
  ],
  IN: [
    { value: "low", text: "Under ₹2,000 (Budget-friendly)" },
    { value: "medium", text: "₹2,000 - ₹6,000 (Sweet Spot)", selected: true },
    { value: "high", text: "₹6,000 - ₹15,000 (Premium Care)" },
    { value: "premium", text: "₹15,000+ (Luxury & Milestones)" }
  ],
  CA: [
    { value: "low", text: "Under C$30 (Budget-friendly)" },
    { value: "medium", text: "C$30 - C$100 (Sweet Spot)", selected: true },
    { value: "high", text: "C$100 - C$250 (Premium Care)" },
    { value: "premium", text: "C$250+ (Luxury & Milestones)" }
  ],
  GB: [
    { value: "low", text: "Under £20 (Budget-friendly)" },
    { value: "medium", text: "£20 - £60 (Sweet Spot)", selected: true },
    { value: "high", text: "£60 - £160 (Premium Care)" },
    { value: "premium", text: "£160+ (Luxury & Milestones)" }
  ],
  AU: [
    { value: "low", text: "Under A$35 (Budget-friendly)" },
    { value: "medium", text: "A$35 - A$100 (Sweet Spot)", selected: true },
    { value: "high", text: "A$100 - A$300 (Premium Care)" },
    { value: "premium", text: "A$300+ (Luxury & Milestones)" }
  ],
  SG: [
    { value: "low", text: "Under S$35 (Budget-friendly)" },
    { value: "medium", text: "S$35 - S$100 (Sweet Spot)", selected: true },
    { value: "high", text: "S$100 - S$300 (Premium Care)" },
    { value: "premium", text: "S$300+ (Luxury & Milestones)" }
  ],
  DE: [
    { value: "low", text: "Under €25 (Budget-friendly)" },
    { value: "medium", text: "€25 - €75 (Sweet Spot)", selected: true },
    { value: "high", text: "€75 - €200 (Premium Care)" },
    { value: "premium", text: "€200+ (Luxury & Milestones)" }
  ],
  FR: [
    { value: "low", text: "Under €25 (Budget-friendly)" },
    { value: "medium", text: "€25 - €75 (Sweet Spot)", selected: true },
    { value: "high", text: "€75 - €200 (Premium Care)" },
    { value: "premium", text: "€200+ (Luxury & Milestones)" }
  ],
  JP: [
    { value: "low", text: "Under ¥3,000 (Budget-friendly)" },
    { value: "medium", text: "¥3,000 - ¥10,000 (Sweet Spot)", selected: true },
    { value: "high", text: "¥10,000 - ¥25,000 (Premium Care)" },
    { value: "premium", text: "¥25,000+ (Luxury & Milestones)" }
  ],
  RU: [
    { value: "low", text: "Under ₽2,000 (Budget-friendly)" },
    { value: "medium", text: "₽2,000 - ₽6,000 (Sweet Spot)", selected: true },
    { value: "high", text: "₽6,000 - ₽15,000 (Premium Care)" },
    { value: "premium", text: "₽15,000+ (Luxury & Milestones)" }
  ]
};
