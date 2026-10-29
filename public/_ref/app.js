'use strict';
document.documentElement.classList.add('js');
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
$$('.reveal').forEach(el=>observer.observe(el));
$$('nav a').forEach(a=>a.classList.toggle('active',location.pathname===a.getAttribute('href')));
let lastFocus;
function openModal(id){lastFocus=document.activeElement;const d=$(id);if(!d.open)d.showModal();document.body.classList.add('modal-open');}
function closeModal(d){d.close();document.body.classList.remove('modal-open');lastFocus?.focus();}
$$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal(d)}});$('.modal-close',d).addEventListener('click',()=>closeModal(d));d.addEventListener('cancel',()=>document.body.classList.remove('modal-open'));});
function enquiry(program=''){const prompt=$('.callback-prompt');if(prompt)prompt.hidden=true;if(program)$('select[name="program"]').value=program;$('.form-result').textContent='';openModal('#enquiry');try{sessionStorage.setItem('pathak-enquiry-seen','1')}catch{}}
$$('[data-enquire]').forEach(b=>b.addEventListener('click',()=>enquiry(b.dataset.enquire)));
let autoSeen=false;try{autoSeen=!!sessionStorage.getItem('pathak-enquiry-seen')}catch{}
if(!autoSeen){const autoTimer=setInterval(()=>{if(!document.hidden&&!$('dialog[open]')&&$('.mobile-menu').hidden){const prompt=$('.callback-prompt');if(prompt)prompt.hidden=false;try{sessionStorage.setItem('pathak-enquiry-seen','1')}catch{}clearInterval(autoTimer)}},30000)}
$$('[data-photo]').forEach(b=>b.addEventListener('click',()=>{$('#photo-dialog img').src=b.dataset.photo;openModal('#photo-dialog')}));
$$('[data-book]').forEach(b=>b.addEventListener('click',()=>{$('#booking-title').textContent=b.dataset.book;$('#booking-copy').textContent='Your chosen program is ready for the next step. The live website will take you to its dedicated payment page.';openModal('#booking-dialog')}));
const menu=$('.mobile-menu'),menuBtn=$('.menu-button');menuBtn.addEventListener('click',()=>{menu.hidden=!menu.hidden;menuBtn.setAttribute('aria-expanded',String(!menu.hidden));menuBtn.setAttribute('aria-label',menu.hidden?'Open menu':'Close menu');document.body.classList.toggle('modal-open',!menu.hidden)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){menu.hidden=true;menuBtn.setAttribute('aria-expanded','false');document.body.classList.remove('modal-open');menuBtn.focus();}});
const trialText={bowling:['Know your action. Understand your pace.','Expert bowling action analysis','Accurate pace testing and improvement guidance','Career guidance for your next steps'],batting:['Understand your technique. Build your innings.','Expert batting technique analysis','Shot-selection evaluation and improvement strategies','Career guidance for your next steps']};
function chooseTrial(b){$$('[data-trial]').forEach(x=>x.setAttribute('aria-selected',String(x===b)));const t=b.dataset.trial,content=$('#trial-content'),v=trialText[t];content.setAttribute('aria-labelledby',b.id);content.innerHTML='<h3>'+v[0]+'</h3><ul class="checklist">'+v.slice(1).map(s=>'<li>'+s+'</li>').join('')+'</ul>';$('#trial-pay').innerHTML='Book '+t+' assessment <span>↗</span>';}
$$('[data-trial]').forEach((b,i)=>{b.addEventListener('click',()=>chooseTrial(b));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const next=$$('[data-trial]')[1-i];chooseTrial(next);next.focus()}})});
if(!reduced&&matchMedia('(pointer:fine)').matches){$$('.event').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1000px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-4px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});}

// Capsule reflections follow the pointer; motion respects accessibility preferences.
const capsuleHeader=document.querySelector('.header');
function updateCapsuleHeader(){capsuleHeader?.classList.toggle('scrolled',window.scrollY>20)}
window.addEventListener('scroll',updateCapsuleHeader,{passive:true});updateCapsuleHeader();
if(!reduced&&matchMedia('(pointer:fine)').matches){
 $$('.pathway,.event.pending').forEach(el=>{el.addEventListener('pointermove',e=>{const rect=el.getBoundingClientRect();el.style.setProperty('--shine-x',((e.clientX-rect.left)/rect.width*100)+'%');el.style.setProperty('--shine-y',((e.clientY-rect.top)/rect.height*100)+'%')});el.addEventListener('pointerleave',()=>{el.style.removeProperty('--shine-x');el.style.removeProperty('--shine-y')})});
}

const promptClose=document.querySelector(".prompt-close");promptClose?.addEventListener("click",()=>{document.querySelector(".callback-prompt").hidden=true;});
// Compact horizontal rails work with touch, keyboard and desktop controls.
$$('.review-rail,.reel-rail,.player-rail,.partner-grid,.events-grid,.insights .blog-grid,.plans').forEach(rail=>{rail.tabIndex=0;rail.addEventListener('keydown',e=>{if(e.target!==rail)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();rail.scrollBy({left:(e.key==='ArrowRight'?1:-1)*(rail.firstElementChild.getBoundingClientRect().width+20),behavior:reduced?'instant':'smooth'});}})});
$$('.checklist-tool').forEach(panel=>{const inputs=$$('input',panel),out=$('output',panel);const update=()=>out.textContent=inputs.filter(x=>x.checked).length+' of '+inputs.length+' selected';inputs.forEach(x=>x.addEventListener('change',update));$('.reset-checklist',panel).addEventListener('click',()=>{inputs.forEach(x=>x.checked=false);update()});});
const progress=$('.reading-progress');if(progress){const update=()=>{const total=document.documentElement.scrollHeight-innerHeight;progress.style.width=(total>0?Math.min(100,scrollY/total*100):100)+'%'};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();}
const processMedia=matchMedia('(min-width: 761px)');const setProcess=()=>$$('.compact-process details').forEach(d=>d.open=processMedia.matches);setProcess();processMedia.addEventListener('change',setProcess);// Position the mobile menu beneath the floating header, including the announcement bar.
function alignMobileMenu(){if(capsuleHeader)document.documentElement.style.setProperty('--menu-top',(capsuleHeader.getBoundingClientRect().bottom+10)+'px');}
menuBtn.addEventListener('click',alignMobileMenu);addEventListener('resize',alignMobileMenu);addEventListener('scroll',()=>{if(!menu.hidden)alignMobileMenu()},{passive:true});alignMobileMenu();// Keep country identity, dial code and the normalized phone number as distinct form fields.
const leadForm=$('#enquiry-form'),leadCountry=$('[name="country"]',leadForm),leadPhone=$('[name="phone"]',leadForm);
function updateLeadPhone(showError=false){
 const opt=leadCountry.selectedOptions[0],dial=opt.dataset.dial;
 $('#phone-prefix').textContent=dial;
 $('[name="country_name"]',leadForm).value=opt.dataset.countryName;
 $('[name="dial_code"]',leadForm).value=dial;
 $('[name="phone_international"]',leadForm).value='';
 leadPhone.setCustomValidity('');
 const raw=leadPhone.value.trim();let parsed;
 try{parsed=window.libphonenumber?.parsePhoneNumberFromString(raw,leadCountry.value)}catch{}
 const valid=parsed?.isValid()&&parsed.countryCallingCode===dial.slice(1)&&(!parsed.country||parsed.country===leadCountry.value);
 if(valid){$('[name="phone_international"]',leadForm).value=parsed.number;$('#phone-preview').textContent='International number: '+parsed.formatInternational();}
 else{$('#phone-preview').textContent=raw?'Check the number and selected country.':'Country code: '+dial;if(showError&&raw)leadPhone.setCustomValidity('Enter a valid phone number for the selected country.');}
 return valid;
}
leadCountry.addEventListener('change',()=>updateLeadPhone());leadPhone.addEventListener('input',()=>updateLeadPhone());leadPhone.addEventListener('blur',()=>updateLeadPhone(true));leadForm.addEventListener('reset',()=>setTimeout(()=>updateLeadPhone(),0));
leadForm.addEventListener('submit',e=>{e.preventDefault();const valid=updateLeadPhone(true);if(!valid||!leadForm.reportValidity()){leadPhone.reportValidity();return;}$('.form-result').textContent='Preview complete. Country: '+$('[name="country_name"]',leadForm).value+'. Phone: '+$('[name="phone_international"]',leadForm).value+'. No details have been sent.';});updateLeadPhone();

// Galleries use native touch scrolling, keyboard navigation and explicit controls.
$$('.hero-carousel').forEach(carousel=>{
 const rail=$('.hero-slides',carousel),slides=$$('.hero-slide',carousel),out=$('.carousel-count',carousel);
 const index=()=>Math.max(0,Math.min(slides.length-1,Math.round(rail.scrollLeft/rail.clientWidth)));
 const go=delta=>{const next=(index()+delta+slides.length)%slides.length;rail.scrollTo({left:next*rail.clientWidth,behavior:reduced?'instant':'smooth'});};
 $('[data-hero-prev]',carousel).addEventListener('click',()=>go(-1));$('[data-hero-next]',carousel).addEventListener('click',()=>go(1));
 rail.addEventListener('scroll',()=>out.textContent=(index()+1)+' / '+slides.length,{passive:true});
 rail.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(e.key==='ArrowRight'?1:-1)}});
});
$$('.results').forEach(section=>{
 const rail=$('.player-rail',section),prev=$('[data-results-prev]',section),next=$('[data-results-next]',section);if(!prev||!next)return;
 const step=()=>rail.firstElementChild.getBoundingClientRect().width+parseFloat(getComputedStyle(rail).gap);
 const update=()=>{prev.disabled=rail.scrollLeft<2;next.disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-2;};
 prev.addEventListener('click',()=>rail.scrollBy({left:-step(),behavior:reduced?'instant':'smooth'}));next.addEventListener('click',()=>rail.scrollBy({left:step(),behavior:reduced?'instant':'smooth'}));
 rail.addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
});
