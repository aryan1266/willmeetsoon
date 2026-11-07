// src/utils/recommendationEngine.ts - Enriched recommendation logic with regional awareness and smart multi-attribute scoring
import { countries, tzOverlapMap } from '../data/countries';
import { giftsDb, type Gift } from '../data/giftData';
import { dateNightsMap } from '../data/dateActivities';
import { occasionMappings } from '../data/occasionMappings';

export interface GiftRecommendation {
  id: string;
  title: string;
  desc: string;
  priceVal: number;
  localPrice: string;
  stars: string;
  badge: string;
  query: string;
  imgSvg: string;
  stores: string[];
  isBest: boolean;
  whyBestReasons?: string[];
  iconEmoji?: string;
  loveNoteIdea?: string;
}

export interface ActivityRecommendation {
  type: 'virtual' | 'inPerson';
  title: string;
  desc: string;
  steps: string[];
  perfectFor?: string;
}

export interface RecommendationResult {
  gifts: GiftRecommendation[];
  activities: ActivityRecommendation[];
  shippingAdvice: {
    text: string;
    isDomestic: boolean;
  };
  timezoneAdvice: {
    score: number;
    scoreStars: string;
    matchReasons: string[];
    yourTzLabel: string;
    partnerTzLabel: string;
    timeA: string;
    timeB: string;
    note: string;
    perfectForNote: string;
    timelineTimes: Array<{
      a: string;
      b: string;
    }>;
  };
}

// Country-specific shipping & customs intelligence
export function generateCountryShippingAdvice(countryA: string, countryB: string): string {
  const cA = countries[countryA.toUpperCase()] || { name: countryA };
  const cB = countries[countryB.toUpperCase()] || { name: countryB };

  if (countryA.toUpperCase() === countryB.toUpperCase()) {
    return `Because you both live in <strong>${cA.name}</strong>, delivery is fast with domestic couriers, zero customs screening, and reliable local arrival.`;
  }

  const codeB = countryB.toUpperCase();
  const codeA = countryA.toUpperCase();

  if (codeB === "RU" || codeA === "RU") {
    return `<strong>Customs & Courier Notice for Russia:</strong> International couriers (FedEx, DHL) face suspension and strict parcel holds. <strong>Bespoke Workaround:</strong> Sourcing directly through local Russian city services (local bakeries, flower shops, or domestic marketplaces like Ozon/Yandex) bypasses border screening completely with zero customs fees.`;
  }

  if (codeB === "CN" || codeA === "CN") {
    return `<strong>Customs Notice for China:</strong> Parcels sent across borders face intense customs inspections and 20%–40% import taxes. <strong>Bespoke Workaround:</strong> Order directly through local merchants inside China (local city florists, Meituan delivery, or WeChat services) for seamless, duty-free doorstep arrival.`;
  }

  if (codeB === "IN") {
    return `<strong>Customs Warning for India:</strong> Foreign gift packages entering India face customs tariffs of 42%+. <strong>Bespoke Workaround:</strong> Never ship packages from abroad; order directly through local Indian merchants (Swiggy, Zomato, local city bakers, or Ferns N Petals) to guarantee duty-free delivery.`;
  }

  return `<strong>Border-Free Strategy:</strong> Shipping packages from <strong>${cA.name}</strong> to <strong>${cB.name}</strong> risks 20%–40% import duties and postal delays. <strong>Bespoke Workaround:</strong> Order directly through local merchants or domestic couriers inside <strong>${cB.name}</strong> to ensure fresh, zero-tariff arrival.`;
}

export function getGiftEmoji(gift: Gift | GiftRecommendation, interest: string): string {
  const t = ((gift.title || "") + " " + (gift.desc || "")).toLowerCase();
  if (t.includes("lamp") || t.includes("light")) return "💡";
  if (t.includes("tea") || t.includes("kettle")) return "🍵";
  if (t.includes("coffee") || t.includes("mug") || t.includes("roast")) return "☕";
  if (t.includes("book") || t.includes("journal") || t.includes("sketchbook")) return "📖";
  if (t.includes("paint") || t.includes("art") || t.includes("pencil") || t.includes("canvas") || t.includes("sculpt")) return "🎨";
  if (t.includes("game") || t.includes("switch") || t.includes("controller") || t.includes("arcade")) return "🎮";
  if (t.includes("music") || t.includes("vinyl") || t.includes("cassette") || t.includes("song") || t.includes("box")) return "🎵";
  if (t.includes("cook") || t.includes("baking") || t.includes("recipe") || t.includes("chef") || t.includes("kitchen")) return "🍳";
  if (t.includes("travel") || t.includes("passport") || t.includes("luggage") || t.includes("map")) return "✈️";
  if (t.includes("chocolate") || t.includes("candy") || t.includes("sweet") || t.includes("bakery")) return "🍫";
  if (t.includes("plant") || t.includes("flower") || t.includes("succulent")) return "🌸";
  if (t.includes("bracelet") || t.includes("ring") || t.includes("necklace") || t.includes("jewelry") || t.includes("token")) return "✨";
  if (t.includes("blanket") || t.includes("hoodie") || t.includes("pillow") || t.includes("cuddle")) return "🧸";
  
  const interestEmojis: Record<string, string> = {
    art: "🎨",
    coffee: "☕",
    cooking: "🍳",
    gaming: "🎮",
    music: "🎵",
    travel: "✈️",
    books: "📚",
    fitness: "🏃",
    movies: "🎬"
  };
  return interestEmojis[interest] || "🎁";
}

export function generateLoveNoteIdea(occasion: string, userNote: string, partnerCountryName: string): string {
  const noteSnippet = userNote ? userNote.trim() : "";
  
  if (occasion === "anniversary") {
    if (noteSnippet) {
      return `"Another beautiful year of us. Every mile between here and ${partnerCountryName} disappears when I think of you—especially ${noteSnippet.length > 35 ? noteSnippet.slice(0, 32) + '...' : noteSnippet}. Happy Anniversary, my heart."`;
    }
    return `"Distance means so little when someone means so much. Another year closer to our forever together. Happy Anniversary, my love."`;
  }
  
  if (occasion === "birthday") {
    if (noteSnippet) {
      return `"Wishing the happiest birthday to my favorite human in the world! I hope this brings you the warmest smile today. Counting every heartbeat until I can celebrate with you in person."`;
    }
    return `"Happy Birthday, darling! Even from across the ocean, you brighten every single day of my life. Sending you all my love today."`;
  }
  
  if (occasion === "holiday") {
    return `"Wishing we were curled up together tonight, but sending all my warmth straight to your doorstep in ${partnerCountryName}. Happy holidays, my love."`;
  }
  
  if (occasion === "first-meet") {
    return `"Every call, every time-zone calculation, and every countdown has led to this. I cannot wait to hold your hand in person. See you so soon!"`;
  }
  
  // default / just-because
  if (noteSnippet) {
    return `"No special holiday on the calendar—just thought of you and wanted to remind you how much you mean to me across the distance. Thinking of you always."`;
  }
  return `"A little reminder from across the miles that you are always in my thoughts, in my heart, and worth every second of the wait."`;
}

function addMinutesToTime(timeStr: string, minsToAdd: number): string {
  if (!timeStr) return "";
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return timeStr;
  
  let hour = parseInt(match[1]);
  const min = parseInt(match[2]);
  const ampm = match[3].toUpperCase();
  
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  
  let totalMins = hour * 60 + min + minsToAdd;
  totalMins = (totalMins + 24 * 60) % (24 * 60);
  
  const newHour24 = Math.floor(totalMins / 60);
  const newMin = totalMins % 60;
  
  const newAmpm = newHour24 >= 12 ? "PM" : "AM";
  const newHour12 = newHour24 % 12 || 12;
  
  return `${newHour12}:${String(newMin).padStart(2, '0')} ${newAmpm}`;
}

// Exchange rates relative to 1 USD
export const exchangeRatesToUSD: Record<string, number> = {
  US: 1.0,
  IN: 85.0,
  CA: 1.38,
  GB: 0.78,
  AU: 1.55,
  SG: 1.34,
  DE: 0.93,
  FR: 0.93,
  JP: 155.0,
  RU: 95.0
};

export function formatPriceForCountry(usdPrice: number, countryCode: string): string {
  const code = countryCode.toUpperCase();
  const c = countries[code] || countries.US;
  const rate = exchangeRatesToUSD[code] || 1.0;
  
  if (code === "US") {
    return `$${usdPrice} USD`;
  }
  
  const localVal = Math.round(usdPrice * rate);
  return `$${usdPrice} USD (~${c.currency}${localVal.toLocaleString()})`;
}

export function getRecommendations(
  countryA: string,
  countryB: string,
  budget: string,
  occasion: string,
  interest: string,
  relationshipDuration: string = "mid",
  userNote: string = ""
): RecommendationResult {
  const yourCountryCode = countryA.toUpperCase();
  const partnerCountryCode = countryB.toUpperCase();
  
  const yourCountry = countries[yourCountryCode] || countries.US;
  const partnerCountry = countries[partnerCountryCode] || countries.IN;

  // Confidence Score
  let score = 85;
  let matchReasons: string[] = [];

  const tzDiff = Math.abs(yourCountry.tzOffset - partnerCountry.tzOffset);
  if (tzDiff <= 4) {
    score += 8;
    matchReasons.push("harmonized time overlap");
  } else {
    matchReasons.push("adjusted evening & morning call window");
  }

  if (yourCountryCode === partnerCountryCode) {
    score += 5;
    matchReasons.push("domestic local delivery");
  } else {
    matchReasons.push("customs-safe domestic ordering strategy");
  }

  matchReasons.push(`${budget.toUpperCase()} budget tier`);
  matchReasons.push(`${occasionMappings[occasion] || occasion} celebration`);
  if (userNote) {
    matchReasons.push("personalized partner note");
  }

  score = Math.min(99, score);
  const scoreStars = "⭐⭐⭐⭐⭐";

  // Logistics text
  const logisticsText = generateCountryShippingAdvice(yourCountryCode, partnerCountryCode);

  // Timezones & Overlaps
  const key = `${yourCountryCode}-${partnerCountryCode}`;
  const reverseKey = `${partnerCountryCode}-${yourCountryCode}`;
  
  let timeA = "9:00 AM - 10:00 PM";
  let timeB = "9:00 AM - 10:00 PM";
  let note = "Fully synchronized local schedules";

  if (yourCountryCode === partnerCountryCode) {
    timeA = "9:00 AM - 10:00 PM";
    timeB = "9:00 AM - 10:00 PM";
    note = "You are in the same country! Pick any local time.";
  } else if (tzOverlapMap[key]) {
    timeA = tzOverlapMap[key].timeA;
    timeB = tzOverlapMap[key].timeB;
    note = tzOverlapMap[key].note;
  } else if (tzOverlapMap[reverseKey]) {
    timeA = tzOverlapMap[reverseKey].timeB;
    timeB = tzOverlapMap[reverseKey].timeA;
    note = tzOverlapMap[reverseKey].note;
  } else {
    const diff = Math.abs(yourCountry.tzOffset - partnerCountry.tzOffset);
    timeA = "7:00 PM - 10:00 PM";
    const startHour = (19 - diff + 24) % 24;
    const endHour = (22 - diff + 24) % 24;
    const formatHour = (h: number) => `${h % 12 || 12}:00 ${h >= 12 ? 'PM' : 'AM'}`;
    timeB = `${formatHour(startHour)} - ${formatHour(endHour)}`;
    note = `Adjusted call hours with a ${diff}h timezone difference.`;
  }

  // Category alias mapping (e.g. books -> reading)
  const interestAliases: Record<string, string[]> = {
    books: ["reading", "books", "book"],
    reading: ["reading", "books", "book"],
    art: ["art", "creativity"],
    coffee: ["coffee", "tea"],
    cooking: ["cooking", "food"],
    gaming: ["gaming", "game"],
    music: ["music"],
    travel: ["travel"],
    fitness: ["fitness", "wellness"],
    movies: ["movies", "movie", "film"]
  };

  const allowedInterests = interestAliases[interest] || [interest];
  const noteLower = userNote.toLowerCase();
  const stopWords = new Set(["the", "and", "for", "with", "her", "his", "she", "him", "are", "you", "that", "this", "from", "they", "them", "like", "loves", "very", "much", "gets", "when"]);
  const noteKeywords = noteLower
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w));

  // Score gifts
  const scoredGifts = giftsDb.map(gift => {
    let giftScore = 0;
    const giftTitleLower = (gift.title || "").toLowerCase();
    const giftDescLower = (gift.desc || "").toLowerCase();
    const giftQueryLower = (gift.query || "").toLowerCase();
    const giftPrice = gift.price[budget] || (gift as any).price?.['medium'] || (gift as any).price?.['low'] || Object.values(gift.price)[0] || 25;

    // 1. Category Alignment (CRITICAL: +100 pts so right category always wins)
    const matchesCategory = gift.interests && gift.interests.some(i => allowedInterests.includes(i));
    if (matchesCategory) {
      giftScore += 100;
    }

    // 2. Occasion Alignment (+25 pts)
    if (gift.occasions && gift.occasions.includes(occasion)) {
      giftScore += 25;
    }

    // 3. Budget Alignment (+25 pts)
    const primaryBudget = (gift as any).budget || "";
    if (primaryBudget === budget || (gift.budgets && gift.budgets.includes(budget))) {
      giftScore += 25;
    }
    if (budget === "low" && giftPrice <= 25) giftScore += 15;
    if (budget === "medium" && giftPrice >= 25 && giftPrice <= 75) giftScore += 15;
    if (budget === "high" && giftPrice >= 70 && giftPrice <= 150) giftScore += 20;
    if (budget === "premium" && giftPrice >= 120) giftScore += 25;

    // 4. Partner Notes Relevance (+15 pts per keyword)
    for (const kw of noteKeywords) {
      if (giftTitleLower.includes(kw) || giftDescLower.includes(kw) || giftQueryLower.includes(kw)) {
        giftScore += 15;
      }
    }

    // 5. Domestic compatibility
    if (gift.type === 'digital' || gift.type === 'local-delivery' || yourCountryCode === partnerCountryCode) {
      giftScore += 5;
    }

    return { gift, score: giftScore, priceVal: giftPrice };
  });

  // Sort descending
  scoredGifts.sort((a, b) => b.score - a.score);

  const bestMatch = scoredGifts[0] || { gift: giftsDb[0], score: 50, priceVal: 25 };
  const bestGift = bestMatch.gift;
  const bestPriceVal = bestMatch.priceVal;
  const bestLocalPrice = formatPriceForCountry(bestPriceVal, partnerCountryCode);

  const alternativesToRender = [
    scoredGifts[1]?.gift || giftsDb[1], 
    scoredGifts[2]?.gift || giftsDb[2]
  ];

  const getSourcingBadges = (countryCode: string) => {
    if (countryCode === "RU") return ["Local City Florist/Courier", "Domestic Delivery"];
    if (countryCode === "CN") return ["Domestic Service", "City Gift Delivery"];
    if (countryCode === "IN") return ["Local Bakery/Merchant", "City Courier"];
    return ["Local City Artisan", "Domestic Online Shop"];
  };

  const localSourcingTips = getSourcingBadges(partnerCountryCode);

  const whyBestReasons: string[] = [
    `Directly caters to your partner's love for <strong class="text-[#2D2226] dark:text-[#FDFBF7]">${interest}</strong>.`,
    `Selected to celebrate your <strong class="text-[#2D2226] dark:text-[#FDFBF7]">${occasionMappings[occasion] || occasion}</strong> across the distance.`,
    `Fits your <strong class="text-[#2D2226] dark:text-[#FDFBF7]">${budget}</strong> budget target (${bestLocalPrice}).`,
    `Avoids courier customs tariffs via domestic fulfillment inside <strong class="text-[#2D2226] dark:text-[#FDFBF7]">${partnerCountry.name}</strong>.`
  ];

  if (userNote) {
    whyBestReasons.splice(2, 0, `Personalized for your partner's notes: <em class="text-[#E15B7B] dark:text-[#FBBF24]">"${userNote.length > 38 ? userNote.slice(0, 35) + '...' : userNote}"</em>.`);
  }

  const gifts: GiftRecommendation[] = [
    {
      id: bestGift.id,
      title: bestGift.title,
      desc: bestGift.desc,
      priceVal: bestPriceVal,
      localPrice: bestLocalPrice,
      stars: bestGift.stars,
      badge: bestGift.badge || "Top Pick 💕",
      query: bestGift.query,
      imgSvg: bestGift.imgSvg,
      stores: localSourcingTips,
      isBest: true,
      whyBestReasons,
      iconEmoji: getGiftEmoji(bestGift, interest),
      loveNoteIdea: generateLoveNoteIdea(occasion, userNote, partnerCountry.name)
    }
  ];

  alternativesToRender.forEach(gift => {
    if (!gift) return;
    const altPriceVal = gift.price[budget] || (gift as any).price?.['medium'] || Object.values(gift.price)[0] || 20;
    const altLocalPrice = formatPriceForCountry(altPriceVal, partnerCountryCode);
    gifts.push({
      id: gift.id,
      title: gift.title,
      desc: gift.desc,
      priceVal: altPriceVal,
      localPrice: altLocalPrice,
      stars: gift.stars,
      badge: gift.badge || "Alternative Pick",
      query: gift.query,
      imgSvg: gift.imgSvg,
      stores: localSourcingTips,
      isBest: false,
      iconEmoji: getGiftEmoji(gift, interest)
    });
  });

  // 5. Curate Date Nights
  const dateData = dateNightsMap[interest] || dateNightsMap.art;
  const perfectForNote = `${note} & ${dateData.virtual.perfectFor || ''}`;

  const activities: ActivityRecommendation[] = [
    {
      type: 'virtual',
      title: dateData.virtual.title,
      desc: dateData.virtual.desc,
      steps: dateData.virtual.steps,
      perfectFor: dateData.virtual.perfectFor
    },
    {
      type: 'inPerson',
      title: dateData.inPerson.title,
      desc: dateData.inPerson.desc,
      steps: dateData.inPerson.steps
    }
  ];

  // 6. Generate timeline times
  const startA = timeA.split(" - ")[0];
  const startB = timeB.split(" - ")[0];

  const timelineTimes = [
    { a: startA, b: startB },
    { a: addMinutesToTime(startA, 30), b: addMinutesToTime(startB, 30) },
    { a: addMinutesToTime(startA, 45), b: addMinutesToTime(startB, 45) },
    { a: addMinutesToTime(startA, 90), b: addMinutesToTime(startB, 90) },
    { a: addMinutesToTime(startA, 210), b: addMinutesToTime(startB, 210) }
  ];

  return {
    gifts,
    activities,
    shippingAdvice: {
      text: logisticsText,
      isDomestic: yourCountryCode === partnerCountryCode
    },
    timezoneAdvice: {
      score,
      scoreStars,
      matchReasons,
      yourTzLabel: `${yourCountry.name} (${yourCountry.tzName}):`,
      partnerTzLabel: `${partnerCountry.name} (${partnerCountry.tzName}):`,
      timeA,
      timeB,
      note,
      perfectForNote,
      timelineTimes
    }
  };
}
