import"./modulepreload-polyfill-Dezn_h7o.js";/* empty css              */var e=`https://backend-projekt-api-qkmv.onrender.com`,t=document.getElementById(`menu-items`),n=document.querySelectorAll(`.filter-btn`),r=[];async function i(){try{r=await(await fetch(`${e}/api/menu`)).json(),a(r)}catch{t.innerHTML=`<p>Kunde inte ladda menyn</p>`}}function a(e){if(t.innerHTML=``,e.length===0){t.innerHTML=`<p>Inga rätter i denna kategori</p>`;return}e.forEach(e=>{t.innerHTML+=`
        <div class="menu-card">
        <h3>${e.name}</h3>
        <p>${e.description}</p>
        <p class="price">${e.price} kr </p>
        <p>${e.category}</p>
        </div>
        `})}n.forEach(e=>{e.addEventListener(`click`,()=>{n.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let t=e.dataset.category;a(t===`all`?r:r.filter(e=>e.category===t))})});var o=document.getElementById(`search-input`);o.addEventListener(`input`,()=>{let e=o.value.toLowerCase();a(r.filter(t=>t.name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e)))}),i();var s=window.location.pathname;document.querySelectorAll(`.navbar a`).forEach(e=>{e.href.includes(s)&&e.classList.add(`active`)});