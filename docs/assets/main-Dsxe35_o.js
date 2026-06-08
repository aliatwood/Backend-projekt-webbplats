import"./modulepreload-polyfill-Dezn_h7o.js";/* empty css              */var e=`https://backend-projekt-api-qkmv.onrender.com`;async function t(){let t=document.getElementById(`container-items`);if(t)try{let n=(await(await fetch(`${e}/api/menu`)).json()).slice(0,3);if(n.length===0){t.innerHTML=`<p> Inga rätter tillgängliga just nu </p>`;return}n.forEach(e=>{t.innerHTML+=`
                <div class = "menu-card">
                    <h3> ${e.name} </h3>
                    <p> ${e.description} </p>
                    <p class="price"> ${e.price} kr </p>
                    <p> ${e.category} </p>
                </div>
            `})}catch{t.innerHTML=`<p> Kunde inte ladda rätter </p>`}}t();var n=window.location.pathname;document.querySelectorAll(`.navbar a`).forEach(e=>{e.href.includes(n)&&e.classList.add(`active`)});