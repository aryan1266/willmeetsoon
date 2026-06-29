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
  stores: string[];
}

const giftModules = import.meta.glob('./gifts/*.json', { eager: true });

export const giftsDb: Gift[] = [];

for (const path in giftModules) {
  const module = giftModules[path] as { default: Gift[] };
  if (module && module.default) {
    giftsDb.push(...module.default);
  }
}
