export const EVENT = Object.freeze({
  name: 'Shane',
  age: 5,
  startsAt: '2026-11-21T16:30:00-04:00',
  timeZone: 'America/Guyana',
  venue: 'Guyana Marriott Hotel Georgetown',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Guyana%20Marriott%20Hotel%20Georgetown',
});
export function countdownParts(now = Date.now()) {
  const total = Math.max(0, Math.floor((Date.parse(EVENT.startsAt) - now) / 1000));
  return {days:Math.floor(total/86400),hours:Math.floor(total%86400/3600),minutes:Math.floor(total%3600/60),seconds:total%60,ended:total===0};
}
export function validateRSVP(values) {
  const name = String(values.name || '').trim();
  const attendance = values.attendance;
  const adults = Number(values.adults), children = Number(values.children);
  if (!name || name.length > 100) return 'Please enter your name (up to 100 characters).';
  if (!['yes','no'].includes(attendance)) return 'Please let us know whether you can attend.';
  if (attendance === 'yes' && (!Number.isInteger(adults) || !Number.isInteger(children) || adults<1 || children<0 || adults>50 || children>50)) return 'Please enter 1–50 adults and 0–50 children.';
  if (String(values.message||'').length > 1000) return 'Please keep your message under 1,000 characters.';
  return '';
}
