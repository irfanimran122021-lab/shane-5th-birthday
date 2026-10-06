import { EVENT, countdownParts, validateRSVP } from './event.js';
import { submitRSVP, isDemo } from './rsvp-service.js';
const stars = document.querySelector('#stars');
for(let i=0;i<35;i++){const s=document.createElement('span');s.className='star';s.textContent=i%5===0?'✧':'·';s.style.cssText='left:'+((i*37.3)%100)+'%;top:'+((i*23.7)%100)+'%;--speed:'+(3+i%5)+'s;--delay:-'+i%7+'s';stars.append(s);}
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const main = document.querySelector('main');
const iconPaths = {
  calendar:'<rect x="4" y="6" width="16" height="15" rx="2"/><path d="M8 3v6m8-6v6M4 12h16m-12 4h2m4 0h2"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  crown:'<path d="m3 7 4 4 5-7 5 7 4-4-2 12H5L3 7Zm3 8h12"/>',
  heart:'<path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z"/>',
};
function icon(name){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+iconPaths[name]+'</svg>';}
function ornament(){return '<div class="ornament" aria-hidden="true"><span></span>✦<span></span></div>';}
function animals(extra=''){return '<div class="animal-art '+extra+'"><img src="./assets/safari-watercolor.webp" width="1152" height="768" alt="Watercolor lion cub, baby elephant, giraffe, monkey and zebra among blue and gold leaves" decoding="async"><span class="animal-sparkle spark-one" aria-hidden="true">✦</span><span class="animal-sparkle spark-two" aria-hidden="true">✧</span></div>';}
main.innerHTML = `
  <nav class="nav" aria-label="Celebration navigation"><a href="#invitation" class="wordmark" aria-label="Shane's invitation">Shane <span>IS FIVE</span></a><div class="nav-links"><a href="#details">The celebration</a><a href="#dress">Dress code</a><a href="#rsvp" class="nav-rsvp">RSVP ${icon('arrow')}</a></div></nav>
  <section class="invitation-section" id="invitation" aria-labelledby="invite-title">
    <div class="card-topline"><span>AN AFTERNOON OF WONDER</span><span>20 · 11 · 2026</span></div>
    <div class="invitation-paper">
      <div class="paper-corner corner-tl" aria-hidden="true"></div><div class="paper-corner corner-tr" aria-hidden="true"></div><div class="paper-corner corner-bl" aria-hidden="true"></div><div class="paper-corner corner-br" aria-hidden="true"></div>
      <div class="paper-heading"><div class="tiny-crown">${icon('crown')}</div><p class="eyebrow">YOU’RE CORDIALLY INVITED</p><h1 id="invite-title" tabindex="-1">Shane</h1><p class="turning">is turning <span>FIVE!</span></p></div>
      <div class="hero-center"><span class="hero-star star-left" aria-hidden="true">✧</span><span class="hero-five" aria-hidden="true">5</span><span class="hero-star star-right" aria-hidden="true">✦</span></div>
      <p class="hero-message">Five years of smiles, laughter and adventure<br class="desktop-break"> deserve a celebration to remember.</p>
      <div class="invite-date"><span>FRIDAY</span><strong>20 <i>/</i> 11 <i>/</i> 2026</strong><span>4:30 PM · GUYANA</span></div>
      <p class="invite-venue">Guyana Marriott Hotel Georgetown</p>
      <a class="button button-navy" href="#details">View celebration ${icon('arrow')}</a>
      ${animals('hero-animals')}
      <span class="card-footnote">A LITTLE WILD. A LITTLE ROYAL. A WHOLE LOT OF FIVE.</span>
    </div>
    <a href="#details" class="scroll-cue">THE ADVENTURE CONTINUES <span>↓</span></a>
  </section>
  <section class="details section-shell reveal" id="details" aria-labelledby="details-title">
    <div class="section-heading"><p class="eyebrow">SAVE THE DATE</p><h2 id="details-title">A grand day for<br>a <em>little gentleman.</em></h2><p>Join us for a magical afternoon of laughter,<br>beautiful memories and birthday fun.</p></div>
    <div class="detail-grid">
      <article class="detail-item"><div class="detail-icon">${icon('calendar')}</div><p class="eyebrow">THE DATE</p><h3>November 20, 2026</h3><p>Friday, a day for making memories</p></article>
      <article class="detail-item"><div class="detail-icon">${icon('clock')}</div><p class="eyebrow">THE TIME</p><h3>4:30 PM</h3><p>Let the birthday adventure begin</p></article>
      <article class="detail-item"><div class="detail-icon">${icon('pin')}</div><p class="eyebrow">THE PLACE</p><h3>Guyana Marriott Hotel</h3><p>Georgetown, Guyana</p></article>
    </div>
    <a class="button button-outline" href="${EVENT.mapsUrl}" target="_blank" rel="noopener noreferrer">Get directions ${icon('arrow')}</a>
    ${ornament()}
  </section>
  <section class="dress reveal" id="dress" aria-labelledby="dress-title">
    <div class="dress-inner"><div class="dress-copy"><p class="eyebrow">A PALETTE FOR THE PARTY</p><h2 id="dress-title">Dress in<br><em>shades of blue.</em></h2><p>Help us make Shane’s celebration picture-perfect! We’d love our guests to wear shades of blue, white or soft neutral tones.</p><p class="dress-note">A little inspiration, never a strict dress code.<br>Come in what makes you feel wonderful.</p></div>
    <div class="palette" aria-label="Suggested clothing colors">${[['Royal blue','#3157a5'],['Baby blue','#b5d2e4'],['Navy blue','#152e50'],['White','#fffefa'],['Beige / cream','#e5d7bb']].map(([name,color],i)=>'<div class="swatch-item swatch-'+i+'"><div class="swatch" style="--swatch:'+color+'"><span>✦</span></div><span>'+name+'</span></div>').join('')}<p class="palette-caption">FIVE SHADES. ONE BEAUTIFUL CELEBRATION.</p></div></div>
  </section>
  <section class="rsvp section-shell reveal" id="rsvp" aria-labelledby="rsvp-title"><div class="rsvp-intro"><p class="eyebrow">YOUR PRESENCE IS THE BEST PRESENT</p><h2 id="rsvp-title">Will you be<br><em>celebrating with us?</em></h2><p>We’d love to know if you’ll be joining us<br>for Shane’s special day.</p><div class="rsvp-decoration" aria-hidden="true">${icon('heart')}<span>Little moments.<br>Lifetime memories.</span></div></div>
    <div class="rsvp-paper"><form id="rsvp-form">
      <div class="form-heading"><span>A NOTE TO THE FAMILY</span><span>✦</span></div>
      <label for="guest-name">Guest name <span aria-hidden="true">*</span></label><input id="guest-name" name="name" autocomplete="name" placeholder="Your full name" required maxlength="100">
      <fieldset class="attendance"><legend>Will you attend? <span aria-hidden="true">*</span></legend><div class="radio-options"><label><input type="radio" name="attendance" value="yes" required checked><span>Yes, with joy</span></label><label><input type="radio" name="attendance" value="no"><span>Sadly, I can’t</span></label></div></fieldset>
      <fieldset id="guest-counts"><legend>Number of guests <span class="legend-note">including you</span></legend><div class="guest-grid"><div><label for="adults">Adults</label><input id="adults" name="adults" type="number" inputmode="numeric" min="1" max="50" step="1" value="1" required></div><div><label for="children">Children</label><input id="children" name="children" type="number" inputmode="numeric" min="0" max="50" step="1" value="0" required></div><div class="total-guests"><span>Total guests</span><output id="total-guests" for="adults children" aria-live="polite">1</output></div></div></fieldset>
      <label for="message">A little message for Shane <span class="optional">(optional)</span></label><textarea id="message" name="message" rows="3" maxlength="1000" placeholder="Birthday wishes, happy thoughts…"></textarea>
      <p id="form-error" class="form-error" role="alert" hidden></p><button type="submit" class="button button-navy submit-button"><span>Send RSVP</span>${icon('arrow')}</button>
      <p class="demo-note" id="demo-note" ${isDemo?'':'hidden'}>RSVP preview · Replies aren’t sent to the family yet.</p>
    </form><div id="rsvp-confirmation" class="confirmation" role="status" tabindex="-1" hidden><div class="confirmation-stars" aria-hidden="true">✧　✦　✧</div><div class="confirmation-heart">${icon('heart')}</div><h3>Thank You! 💙</h3><p id="confirmation-message"></p><p class="demo-note" id="confirmation-demo"></p><button class="text-button" id="edit-rsvp" type="button">Edit my response ${icon('arrow')}</button><div id="rsvp-particles" class="opening-particles" aria-hidden="true"></div></div></div>
  </section>
  <section class="countdown-section reveal" aria-labelledby="countdown-title"><p class="eyebrow">EVERY MOMENT BRINGS US CLOSER</p><h2 id="countdown-title">The countdown to <em>FIVE</em> is on!</h2><div class="countdown" role="timer" aria-label="Time until Shane’s birthday celebration">${['days','hours','minutes','seconds'].map(unit=>'<div class="count-unit"><span class="count-number" id="count-'+unit+'">00</span><span class="count-label">'+unit+'</span></div>').join('')}</div><p class="countdown-date" id="countdown-caption">NOVEMBER 20, 2026 · 4:30 PM · GEORGETOWN</p></section>
  <footer class="final-message reveal">${ornament()}<p class="eyebrow">LET’S MAKE A LITTLE MAGIC</p><h2>A little gentleman<br>is turning <em>five.</em></h2><p>Come celebrate a magical afternoon filled<br>with laughter, memories and birthday fun.</p>${animals('footer-animals')}<p class="with-love">With love,</p><p class="signature">Shane <span>&</span> Family</p><div class="footer-bottom"><span>20 NOVEMBER 2026</span><button id="replay" type="button">Open the magic again <span>↗</span></button><span>MADE WITH LOVE, FOR SHANE</span></div></footer>
`;

function burst(container, count=20) {
  if(reducedMotion.matches) return;
  for(let i=0;i<count;i++){const el=document.createElement('span');el.className='burst';el.textContent=i%3?'✦':'✧';el.style.cssText='--x:'+((Math.random()-.5)*450)+'px;--y:'+(-60-Math.random()*280)+'px;--r:'+((Math.random()-.5)*200)+'deg;animation-delay:'+Math.random()*.4+'s';container.append(el);el.addEventListener('animationend',()=>el.remove(),{once:true});}
}
const opening = document.querySelector('#opening');
const seal = document.querySelector('#open-seal');
let openingInProgress = false;
const wait = ms => new Promise(resolve=>setTimeout(resolve,reducedMotion.matches?0:ms));
async function openInvitation() {
  if(openingInProgress) return;
  openingInProgress=true;seal.disabled=true;
  document.querySelector('#opening-status').textContent='Opening your invitation…';
  document.querySelector('#opening-instruction').textContent='A little magic is unfolding…';
  opening.classList.add('releasing');await wait(650);
  opening.classList.add('flap-open');await wait(1000);
  opening.classList.add('card-rising');burst(document.querySelector('#opening-particles'));await wait(2100);
  opening.classList.add('zooming');await wait(1050);
  opening.hidden=true;main.hidden=false;document.body.classList.remove('is-sealed');
  window.scrollTo({top:0,behavior:'instant'});
  document.querySelector('#invite-title').focus({preventScroll:true});
  document.querySelector('#opening-status').textContent='';
  main.classList.add('arrived');observeReveals();
}
seal.addEventListener('click',openInvitation);
document.querySelector('#replay').addEventListener('click',()=>{
  main.hidden=true;main.classList.remove('arrived');opening.hidden=false;opening.classList.remove('releasing','flap-open','card-rising','zooming');
  document.body.classList.add('is-sealed');seal.disabled=false;openingInProgress=false;
  document.querySelector('#opening-instruction').textContent='Tap the seal to open';
  window.scrollTo({top:0,behavior:'instant'});seal.focus({preventScroll:true});
});
function observeReveals(){
  if(reducedMotion.matches || !('IntersectionObserver' in window)){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function updateCountdown(){
  const parts=countdownParts();
  for(const unit of ['days','hours','minutes','seconds']){
    const el=document.querySelector('#count-'+unit),next=String(parts[unit]).padStart(2,'0');
    if(el.textContent!==next){el.textContent=next;el.classList.remove('tick');void el.offsetWidth;el.classList.add('tick');}
  }
  if(parts.ended)document.querySelector('#countdown-caption').textContent='THE BIG DAY IS HERE. LET THE MAGIC BEGIN!';
}
updateCountdown();setInterval(()=>{if(!document.hidden)updateCountdown();},1000);document.addEventListener('visibilitychange',updateCountdown);

const form=document.querySelector('#rsvp-form');
const adults=document.querySelector('#adults'),children=document.querySelector('#children'),total=document.querySelector('#total-guests');
function updateTotal(){total.value=String((Number(adults.value)||0)+(Number(children.value)||0));}
adults.addEventListener('input',updateTotal);children.addEventListener('input',updateTotal);
form.addEventListener('change',event=>{if(event.target.name==='attendance'){const declining=event.target.value==='no';document.querySelector('#guest-counts').hidden=declining;adults.disabled=declining;children.disabled=declining;}});
form.addEventListener('submit',async event=>{
  event.preventDefault();
  const error=document.querySelector('#form-error');error.hidden=true;
  if(!form.reportValidity())return;
  const button=form.querySelector('[type=submit]');
  const data=Object.fromEntries(new FormData(form));
  button.disabled=true;button.querySelector('span').textContent='Sending your wishes…';form.setAttribute('aria-busy','true');
  try {
    const result=await submitRSVP(data);
    form.hidden=true;
    document.querySelector('#confirmation-message').textContent=result.attendance==='yes'?'We can’t wait to celebrate Shane’s 5th birthday with you!':'You’ll be missed! Thank you for sending a little love for Shane’s special day.';
    document.querySelector('#confirmation-demo').textContent=result.demo?'This is a preview. Your response has not been sent.':'Your response has been sent to the family.';
    const confirmation=document.querySelector('#rsvp-confirmation');confirmation.hidden=false;confirmation.focus({preventScroll:true});
    burst(document.querySelector('#rsvp-particles'),24);
  }catch(err){error.textContent=err.name==='TimeoutError'?'The reply took too long to send. Please try again.':err.message||'Something went wrong. Please try again.';error.hidden=false;}
  finally{button.disabled=false;button.querySelector('span').textContent='Send RSVP';form.removeAttribute('aria-busy');}
});
document.querySelector('#edit-rsvp').addEventListener('click',()=>{document.querySelector('#rsvp-confirmation').hidden=true;form.hidden=false;document.querySelector('#guest-name').focus({preventScroll:true});});

// Progressive enhancement: stage the same visible form when a browser supports WebMCP.
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  const tool={
    name:'prepare_birthday_rsvp',
    title:'Prepare a reply for Shane’s birthday',
    description:'Fill the invitation RSVP form for the guest to review. Does not submit or send a response.',
    inputSchema:{type:'object',properties:{name:{type:'string',maxLength:100},attendance:{type:'string',enum:['yes','no']},adults:{type:'integer',minimum:1,maximum:50},children:{type:'integer',minimum:0,maximum:50},message:{type:'string',maxLength:1000}},required:['name','attendance'],additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    async execute(input){
      const values={adults:1,children:0,message:'',...input};
      const error=validateRSVP(values);if(error)throw new Error(error);
      if(main.hidden){if(openingInProgress)throw new Error('Please wait for the invitation to finish opening.');await openInvitation();}
      document.querySelector('#rsvp-confirmation').hidden=true;form.hidden=false;
      form.elements.name.value=values.name;
      form.elements.attendance.value=values.attendance;
      adults.value=values.adults;children.value=values.children;
      form.elements.message.value=values.message;
      const choice=form.querySelector('input[name="attendance"]:checked');
      choice.dispatchEvent(new Event('change',{bubbles:true}));updateTotal();
      document.querySelector('#rsvp').scrollIntoView({behavior:'instant'});
      return {status:'prepared_for_review',sent:false,demo:isDemo};
    },
  };
  try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
  window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
