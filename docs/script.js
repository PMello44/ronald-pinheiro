'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');navigation.classList.remove('is-open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');navigation.classList.toggle('is-open',open);});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
window.matchMedia('(min-width: 801px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

const config=window.SITE_CONFIG || {};
const notice=document.querySelector('.notice');
let noticeTimer;
function showNotice(message){clearTimeout(noticeTimer);notice.textContent=message;notice.hidden=false;noticeTimer=setTimeout(()=>{notice.hidden=true;},4500);}
function safeExternalUrl(value){if(typeof value!=='string'||!value)return null;try{const url=new URL(value);return url.protocol==='https:'?url.href:null;}catch{return null;}}
if(/^\+?\d[\d\s()-]{8,19}$/.test(config.whatsapp||'')){
  const phone=config.whatsapp.replace(/\D/g,'');
  document.querySelectorAll('[data-contact]').forEach(link=>{link.href=`https://wa.me/${phone}`;link.target='_blank';link.rel='noopener noreferrer';});
}
// Destinations stay empty until supplied by the office; never invent contact data.
for(const button of document.querySelectorAll('[data-unavailable]')){
  const url=safeExternalUrl(button.dataset.destination ? config[button.dataset.destination] : config.articles?.[Number(button.dataset.article)]);
  if(url){const link=document.createElement('a');for(const attribute of button.attributes)if(attribute.name!=='type')link.setAttribute(attribute.name,attribute.value);link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.append(...button.childNodes);button.replaceWith(link);}
  else button.addEventListener('click',()=>showNotice(button.dataset.unavailable));
}
const dialog=document.querySelector('.photo-dialog');
const portraits=[...document.querySelectorAll('.portrait')];
const expandedPhoto=document.querySelector('#expanded-photo');
const photoCaption=document.querySelector('#photo-caption');
let activePhoto=0;
function setPhoto(index){activePhoto=(index+portraits.length)%portraits.length;const portrait=portraits[activePhoto];const source=portrait.querySelector('img');expandedPhoto.src=source.src;expandedPhoto.alt=source.alt;expandedPhoto.style.transform=portrait.classList.contains('portrait--mirrored')?'scaleX(-1)':'';photoCaption.textContent=`Equipe Ronald Pinheiro · ${activePhoto+1} de ${portraits.length}`;}
portraits.forEach((portrait,index)=>portrait.addEventListener('click',()=>{setPhoto(index);dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelector('.photo-previous').addEventListener('click',()=>setPhoto(activePhoto-1));
document.querySelector('.photo-next').addEventListener('click',()=>setPhoto(activePhoto+1));
dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();setPhoto(activePhoto-1);}if(event.key==='ArrowRight'){event.preventDefault();setPhoto(activePhoto+1);}});
const navLinks=[...navigation.querySelectorAll('a')];
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;for(const link of navLinks){if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}},{rootMargin:'-10% 0px -65% 0px'});
for(const link of navLinks){const section=document.querySelector(link.hash);if(section)observer.observe(section);}
