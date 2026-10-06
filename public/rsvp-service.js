import { validateRSVP } from './event.js';
// Replace null with an HTTPS endpoint when the host is ready to receive RSVPs.
// An endpoint must accept the documented JSON payload and return a 2xx response.
export const RSVP_ENDPOINT = null;
export const isDemo = !RSVP_ENDPOINT;
export async function submitRSVP(values) {
  const error = validateRSVP(values);
  if (error) throw new Error(error);
  const attending = values.attendance === 'yes';
  const payload = {
    event: 'shane-fifth-birthday-2026',
    name: values.name.trim(),
    attendance: values.attendance,
    adults: attending ? Number(values.adults) : 0,
    children: attending ? Number(values.children) : 0,
    totalGuests: attending ? Number(values.adults) + Number(values.children) : 0,
    message: (values.message || '').trim(),
  };
  if (isDemo) {
    await new Promise(resolve => setTimeout(resolve, 650));
    return {demo:true, attendance:payload.attendance};
  }
  const response = await fetch(RSVP_ENDPOINT, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload),
    signal:AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Your reply could not be sent. Please try again in a moment.');
  return {demo:false, attendance:payload.attendance};
}
