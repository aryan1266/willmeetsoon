// src/utils/plannerService.ts - Fast, Private, Offline Connection Planner & Dual-Timezone Choreographer
import { countries, tzOverlapMap } from '../data/countries';
import { occasionMappings } from '../data/occasionMappings';
import { dateNightsMap } from '../data/dateActivities';
import { 
  getRecommendations, 
  generateCountryShippingAdvice, 
  getGiftEmoji, 
  generateLoveNoteIdea 
} from './recommendationEngine';

export { generateCountryShippingAdvice };

export interface FlowchartStep {
  stepNumber: number;
  title: string;
  yourTime: string;
  partnerTime: string;
  action: string;
  iconEmoji: string;
}

export interface GiftResult {
  title: string;
  desc: string;
  estimatedPrice: string;
  badge: string;
  whyBestReasons: string[];
  sourcingTip: string;
  iconEmoji: string;
  loveNoteIdea?: string;
}

export type AIGiftResult = GiftResult;

export interface ConnectionPlanResponse {
  matchScore: number;
  matchStars: string;
  matchReasons: string[];
  shippingAdvice: string;
  gift: GiftResult;
  flowchart: FlowchartStep[];
  isAiGenerated: boolean;
  modelUsed?: string;
}

export type AIPlannerResponse = ConnectionPlanResponse;

/**
 * Intelligent, deterministic connection planner driven by catalog matching,
 * regional customs intelligence, and dual-timezone synchronization.
 * 100% private, instant (0ms latency), and works completely offline.
 */
export function getConnectionPlan(
  yourCountryCode: string,
  partnerCountryCode: string,
  budget: string,
  occasion: string,
  interest: string,
  duration: string = "mid",
  userNote: string = ""
): ConnectionPlanResponse {
  const cA = countries[yourCountryCode.toUpperCase()] || { name: yourCountryCode, tzName: "Local", currency: "$" };
  const cB = countries[partnerCountryCode.toUpperCase()] || { name: partnerCountryCode, tzName: "Partner", currency: "$" };

  // Query enriched recommendation engine across giftsDb
  const rec = getRecommendations(
    yourCountryCode,
    partnerCountryCode,
    budget,
    occasion,
    interest,
    duration,
    userNote
  );

  const bestGiftRec = rec.gifts[0] || {
    id: "touch-lamps",
    title: "Long-Distance Touch Lamps & Handwritten Letter",
    desc: "A pair of connected ambient touch lamps. When you gently touch your lamp before bed, their lamp across the miles glows warmly.",
    priceVal: 45,
    localPrice: `${cB.currency || "$"}45`,
    stars: "⭐⭐⭐⭐⭐",
    badge: "Heartfelt Pick 💕",
    query: "long distance touch lamps",
    imgSvg: "",
    stores: ["Local City Artisan", "Domestic Courier"],
    isBest: true,
    whyBestReasons: [
      "Warm sensory reminder of your presence",
      "Sourced domestically with zero customs fees",
      "Synchronized with your shared evening chats"
    ],
    iconEmoji: "💡",
    loveNoteIdea: generateLoveNoteIdea(occasion, userNote, cB.name)
  };

  const key = `${yourCountryCode.toUpperCase()}-${partnerCountryCode.toUpperCase()}`;
  const reverseKey = `${partnerCountryCode.toUpperCase()}-${yourCountryCode.toUpperCase()}`;
  
  let timeA = "10:00 AM";
  let timeB = "7:30 PM";

  if (tzOverlapMap[key]) {
    timeA = tzOverlapMap[key].timeA.split(" - ")[0] || "10:00 AM";
    timeB = tzOverlapMap[key].timeB.split(" - ")[0] || "7:30 PM";
  } else if (tzOverlapMap[reverseKey]) {
    timeA = tzOverlapMap[reverseKey].timeB.split(" - ")[0] || "10:00 AM";
    timeB = tzOverlapMap[reverseKey].timeA.split(" - ")[0] || "7:30 PM";
  }

  const shippingAdvice = rec.shippingAdvice.text;
  const emoji = bestGiftRec.iconEmoji || getGiftEmoji(bestGiftRec, interest);
  const loveNote = bestGiftRec.loveNoteIdea || generateLoveNoteIdea(occasion, userNote, cB.name);
  const estimatedPriceFormatted = bestGiftRec.localPrice;

  const sourcing = (bestGiftRec.stores && bestGiftRec.stores.length > 0)
    ? `Order through ${bestGiftRec.stores.join(" or ")} inside ${cB.name} for direct doorstep arrival.`
    : `Order directly through a local merchant or domestic courier inside ${cB.name}.`;

  const occasionLabel = occasionMappings[occasion] || occasion;

  // Retrieve category-specific virtual date activity
  const dateData = dateNightsMap[interest] || dateNightsMap.art;
  const virtualDateTitle = dateData?.virtual?.title || "Golden Hour Video Chat";
  const virtualDateAction = dateData?.virtual?.desc || "Hop on FaceTime or Discord with your favorite drinks. Catch up on your week over camera with zero distractions.";

  const flowchart: FlowchartStep[] = [
    {
      stepNumber: 1,
      title: "Morning Surprise Arrives",
      yourTime: timeA,
      partnerTime: timeB,
      action: `Your surprise (${bestGiftRec.title}) is delivered locally to their door in ${cB.name} without customs fees or border screening.`,
      iconEmoji: "📦"
    },
    {
      stepNumber: 2,
      title: virtualDateTitle,
      yourTime: timeA,
      partnerTime: timeB,
      action: virtualDateAction,
      iconEmoji: "💻"
    },
    {
      stepNumber: 3,
      title: `Unbox & Celebrate ${occasionLabel}`,
      yourTime: "11:30 AM",
      partnerTime: "9:00 PM",
      action: `Unwrap "${bestGiftRec.title}" together on camera, read the handwritten note, and share a sweet date moment.`,
      iconEmoji: emoji
    },
    {
      stepNumber: 4,
      title: "Bedtime Voice Note & Countdown",
      yourTime: "1:00 PM",
      partnerTime: "10:30 PM",
      action: "Share tender bedtime wishes and count down the heartbeats until your next airport reunion embrace.",
      iconEmoji: "🌙"
    }
  ];

  return {
    matchScore: rec.timezoneAdvice.score,
    matchStars: rec.timezoneAdvice.scoreStars,
    matchReasons: rec.timezoneAdvice.matchReasons,
    shippingAdvice,
    gift: {
      title: bestGiftRec.title,
      desc: bestGiftRec.desc,
      estimatedPrice: estimatedPriceFormatted,
      badge: bestGiftRec.badge || "Top Pick 💕",
      whyBestReasons: bestGiftRec.whyBestReasons || [
        `Curated for your ${occasionLabel} celebration`,
        `Comfortable fit for ${budget.toUpperCase()} budget tier`,
        `Zero customs delivery inside ${cB.name}`
      ],
      sourcingTip: sourcing,
      iconEmoji: emoji,
      loveNoteIdea: loveNote
    },
    flowchart,
    isAiGenerated: false,
    modelUsed: "Will Meet Soon Curated Engine"
  };
}

// Aliases for seamless drop-in compatibility across the project
export const getSmartOfflinePlan = getConnectionPlan;

export async function generateConnectionPlan(
  yourCountryCode: string,
  partnerCountryCode: string,
  budget: string,
  occasion: string,
  interest: string,
  duration: string = "mid",
  userNote: string = ""
): Promise<ConnectionPlanResponse> {
  return getConnectionPlan(yourCountryCode, partnerCountryCode, budget, occasion, interest, duration, userNote);
}

export const generateAIRecommendations = generateConnectionPlan;

