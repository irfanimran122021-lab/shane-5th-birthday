import { EVENT } from './event.js';

export const CALENDAR_TITLE = `${EVENT.name}'s ${EVENT.age}th Birthday`;
const description = 'Birthday celebration at 4:30 PM in Georgetown, Guyana (UTC-04:00). End time has not been specified.';
const utcStamp = value => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escapeText = value => value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');

// Google requires a date range. Equal endpoints represent a start-only reminder,
// not an invented duration; the guest can review their calendar's suggested end.
export function googleCalendarUrl() {
  const start = utcStamp(EVENT.startsAt);
  const params = new URLSearchParams({action:'TEMPLATE', text:CALENDAR_TITLE,
    dates:`${start}/${start}`, ctz:EVENT.timeZone, location:EVENT.venue, details:description});
  return `https://calendar.google.com/calendar/render?${params}`;
}

// Fold content lines at 75 UTF-8 octets, as required by RFC 5545.
function fold(line) {
  const lines=[];let current='',size=0;
  for(const character of line){const bytes=new TextEncoder().encode(character).length;
    if(size+bytes>75){lines.push(current);current=' ';size=1;}
    current+=character;size+=bytes;
  }
  return [...lines,current].join('\r\n');
}
export function calendarEvent() {
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Shane Birthday//Invitation//EN',
    'CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:shane-fifth-birthday-2026@invitation',
    'DTSTAMP:20261006T000000Z','SEQUENCE:1',`DTSTART:${utcStamp(EVENT.startsAt)}`,
    `SUMMARY:${escapeText(CALENDAR_TITLE)}`,`LOCATION:${escapeText(EVENT.venue)}`,
    `DESCRIPTION:${escapeText(description)}`,'END:VEVENT','END:VCALENDAR']
    .map(fold).join('\r\n')+'\r\n';
}
