import"./modulepreload-polyfill-Dezn_h7o.js";/* empty css              */var e=document.getElementById(`review-btn`),t=document.getElementById(`review-message`),n=document.getElementById(`reviews-list`);function r(){let e=localStorage.getItem(`reviews`);return e?JSON.parse(e):[]}function i(e){localStorage.setItem(`reviews`,JSON.stringify(e))}function a(){let e=r();if(n.innerHTML=``,e.length===0){n.innerHTML=`<p>Inga recensioner ännu, var först!</p>`;return}e.forEach(e=>{n.innerHTML+=`
        <div class="review-card">
        <div class="review-header">
        <h3>${e.name}</h3>
        <span class="review-rating">${`⭐`.repeat(e.rating)}</span>
        </div>
        <p>${e.comment}</p>
        <p class="review-date">${e.date}</p>
        </div>
        `})}e.addEventListener(`click`,()=>{let e=document.getElementById(`review-name`).value.trim(),n=document.getElementById(`review-rating`).value,o=document.getElementById(`review-comment`).value.trim();if(!e||!o){t.textContent=`Vänligen fyll i alla fält`;return}let s={name:e,rating:parseInt(n),comment:o,date:new Date().toLocaleDateString(`sv-SE`)},c=r();c.unshift(s),i(c),t.textContent=`Tack för din recension!`,t.style.color=`#D4AF37`,document.getElementById(`review-name`).value=``,document.getElementById(`review-comment`).value=``,a()}),a();var o=window.location.pathname;document.querySelectorAll(`.navbar a`).forEach(e=>{e.href.includes(o)&&e.classList.add(`active`)});