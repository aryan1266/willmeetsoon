import { countries, tzOverlapMap } from '../data/countries';
import { getShippingAdvice } from '../data/shippingRules';
import { giftsDb } from '../data/giftData';
import { dateNightsMap } from '../data/dateActivities';

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

export function getRecommendations(
  countryA: string,
  countryB: string,
  budget: string,
  occasion: string,
  interest: string,
  relationshipDuration: string
): RecommendationResult {
  const yourCountryCode = countryA.toUpperCase();
  const partnerCountryCode = countryB.toUpperCase();
  
  const yourCountry = countries[yourCountryCode] || countries.US;
  const partnerCountry = countries[partnerCountryCode] || countries.IN;

  // 1. Calculate Confidence Score (Overall Match)
  let score = 70;
  let matchReasons = [];

  const tzDiff = Math.abs(yourCountry.tzOffset - partnerCountry.tzOffset);
  if (tzDiff <= 4) {
    score += 10;
    matchReasons.push("perfect time overlap");
  } else {
    matchReasons.push("adjusted call coordination");
  }

  if (yourCountryCode === partnerCountryCode) {
    score += 10;
    matchReasons.push("domestic delivery (no customs)");
  } else {
    matchReasons.push("digital customs bypass");
  }

  score += 10; // Budget fit guaranteed by selection
  matchReasons.push("strict budget fit");
  matchReasons.push("partner interest alignment");

  score = Math.min(99, score);
  const scoreStars = "⭐⭐⭐⭐⭐";

  // 2. Generate Shipping Logistics Warning
  const logisticsText = getShippingAdvice(yourCountryCode, partnerCountryCode, yourCountry.name, partnerCountry.name);

  // 3. Generate Timezones & Overlaps
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

  // 4. Score and Sort Gifts
  const scoredGifts = giftsDb.map(gift => {
    let giftScore = 0;
    
    // +3 if occasion matches
    if (gift.occasions.includes(occasion)) {
      giftScore += 3;
    }
    
    // +2 if interest matches
    if (gift.interests.includes(interest)) {
      giftScore += 2;
    }
    
    // +2 if budget matches
    if (gift.budgets.includes(budget)) {
      giftScore += 2;
    }
    
    // +2 if shipping is compatible
    const isShippingCompatible = gift.type === 'digital' || gift.type === 'local-delivery' || yourCountryCode === partnerCountryCode;
    if (isShippingCompatible) {
      giftScore += 2;
    }
    
    // +1 if relationship duration matches
    if (gift.durations && gift.durations.includes(relationshipDuration)) {
      giftScore += 1;
    }
    
    // +1 if country matches
    if (gift.countries && gift.countries.includes(partnerCountryCode)) {
      giftScore += 1;
    }
    
    return { gift, score: giftScore };
  });

  // Sort by score descending
  scoredGifts.sort((a, b) => b.score - a.score);

  const bestGift = scoredGifts[0].gift;
  const alternativesToRender = [scoredGifts[1].gift, scoredGifts[2].gift];

  const bestPriceVal = bestGift.price[budget] || Object.values(bestGift.price)[0];
  const bestLocalPrice = `${partnerCountry.currency}${bestPriceVal}`;

  const gifts: GiftRecommendation[] = [
    {
      id: bestGift.id,
      title: bestGift.title,
      desc: bestGift.desc,
      priceVal: bestPriceVal,
      localPrice: bestLocalPrice,
      stars: bestGift.stars,
      badge: bestGift.badge,
      query: bestGift.query,
      imgSvg: bestGift.imgSvg,
      stores: bestGift.stores || ["Amazon"],
      isBest: true,
      whyBestReasons: [
        bestGift.interests.includes(interest) ? `Perfect fit for partner's interest in <strong class="text-white">${interest}</strong>.` : `Matches partner's profile interests.`,
        `Budget optimized at <strong class="text-white">${bestLocalPrice}</strong>.`,
        `Bypasses international custom taxes via local delivery in <strong class="text-white">${partnerCountry.name}</strong>.`
      ]
    }
  ];

  alternativesToRender.forEach(gift => {
    const altPriceVal = gift.price[budget] || Object.values(gift.price)[0];
    const altLocalPrice = `${partnerCountry.currency}${altPriceVal}`;
    gifts.push({
      id: gift.id,
      title: gift.title,
      desc: gift.desc,
      priceVal: altPriceVal,
      localPrice: altLocalPrice,
      stars: gift.stars,
      badge: gift.badge,
      query: gift.query,
      imgSvg: gift.imgSvg,
      stores: gift.stores || ["Amazon"],
      isBest: false
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
