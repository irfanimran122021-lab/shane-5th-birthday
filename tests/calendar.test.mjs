import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {EVENT,countdownParts} from '../public/event.js';
import {calendarEvent,googleCalendarUrl} from '../public/calendar.js';

test('party is Saturday November 21 at 4:30 PM in Guyana',()=>{
  assert.equal(EVENT.startsAt,'2026-11-21T16:30:00-04:00');
  assert.equal(new Intl.DateTimeFormat('en-US',{timeZone:EVENT.timeZone,weekday:'long'}).format(new Date(EVENT.startsAt)),'Saturday');
  assert.deepEqual(countdownParts(Date.parse('2026-11-21T20:29:59Z')),{days:0,hours:0,minutes:0,seconds:1,ended:false});
  assert.equal(countdownParts(Date.parse('2026-11-21T20:30:00Z')).ended,true);
});
test('calendar export has correct start, title, exact venue and no invented duration',()=>{
  const lines=calendarEvent().replace(/\r\n /g,'').split('\r\n');
  assert.ok(lines.includes('DTSTART:20261121T203000Z'));
  assert.ok(lines.includes("SUMMARY:Shane's 5th Birthday"));
  assert.ok(lines.includes(`LOCATION:${EVENT.venue}`));
  assert.ok(!lines.some(line=>/^(DTEND|DURATION):/.test(line)));
  assert.ok(lines.includes('BEGIN:VEVENT'));assert.ok(lines.includes('END:VEVENT'));
  for(const line of calendarEvent().split('\r\n'))assert.ok(Buffer.byteLength(line)<=75);
  assert.ok(!/(?<!\r)\n/.test(calendarEvent()));
});
test('Google Calendar uses the same instant and venue without adding a duration',()=>{
  const url=new URL(googleCalendarUrl());
  assert.equal(url.origin,'https://calendar.google.com');
  assert.equal(url.searchParams.get('dates'),'20261121T203000Z/20261121T203000Z');
  assert.equal(url.searchParams.get('ctz'),'America/Guyana');
  assert.equal(url.searchParams.get('text'),"Shane's 5th Birthday");
  assert.equal(url.searchParams.get('location'),EVENT.venue);
});
test('downloadable source file stays in sync with event configuration',async()=>{
  assert.equal(await readFile(new URL('../public/shane-birthday.ics',import.meta.url),'utf8'),calendarEvent());
});
test('display and metadata contain the corrected date without stale Friday references',async()=>{
  for(const path of ['../public/index.html','../public/app.js']){
    const text=await readFile(new URL(path,import.meta.url),'utf8');
    assert.doesNotMatch(text,/November 20\b|20 November|20 · 11|20 <i>|Friday/i);
    assert.match(text,/November 21, 2026/i);
  }
});
