export function getShippingAdvice(yourCountryCode: string, partnerCountryCode: string, yourCountryName: string, partnerCountryName: string): string {
  if (yourCountryCode === partnerCountryCode) {
    return `Since you both live in the <strong>${yourCountryName}</strong>, physical shipping is straightforward! Traditional courier delivery will face no custom duties, and shipping times are minimal. You can also order from local shops directly.`;
  } else {
    return `Warning: Sending packages between <strong>${yourCountryName}</strong> and <strong>${partnerCountryName}</strong> can result in customs duties of up to 40% and take weeks. <strong>Recommendation:</strong> Use regional vendors (e.g. Amazon ${partnerCountryName} if buying for them, or Amazon ${yourCountryName} if buying for you) or purchase digital experiences to avoid customs.`;
  }
}
