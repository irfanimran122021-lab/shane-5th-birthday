import test from 'node:test';
import assert from 'node:assert/strict';
import { EVENT, countdownParts, validateRSVP } from '../public/event.js';
import { submitRSVP } from '../public/rsvp-service.js';
test('Georgetown 4:30 PM is 20:30 UTC',()=>assert.equal(new Date(EVENT.startsAt).toISOString(),'2026-11-21T20:30:00.000Z'));
test('countdown handles a day boundary',()=>assert.deepEqual(countdownParts(Date.parse(EVENT.startsAt)-90061000),{days:1,hours:1,minutes:1,seconds:1,ended:false}));
test('countdown never becomes negative',()=>assert.deepEqual(countdownParts(Date.parse(EVENT.startsAt)+1),{days:0,hours:0,minutes:0,seconds:0,ended:true}));
test('attending guests need a name and whole nonnegative counts',()=>{
  assert.ok(validateRSVP({name:'  ',attendance:'yes',adults:1,children:0}));
  assert.ok(validateRSVP({name:'Guest',attendance:'yes',adults:0,children:2}));
  assert.ok(validateRSVP({name:'Guest',attendance:'yes',adults:1,children:1.5}));
  assert.ok(validateRSVP({name:'Guest',attendance:'yes',adults:1,children:-1}));
  assert.equal(validateRSVP({name:'Guest',attendance:'yes',adults:2,children:3}),'');
});
test('declining does not require guest counts',()=>assert.equal(validateRSVP({name:'Guest',attendance:'no'}),''));
test('demo submission never sends a network request',async()=>{
  const original=globalThis.fetch;globalThis.fetch=()=>{throw new Error('Unexpected network request');};
  try{assert.deepEqual(await submitRSVP({name:'Guest',attendance:'yes',adults:1,children:0}),{demo:true,attendance:'yes'});}finally{globalThis.fetch=original;}
});
