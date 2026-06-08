// API-URL till backend
const API_URL = "https://backend-projekt-api-qkmv.onrender.com";

// Hämtar element från HTML
const menuGrid = document.getElementById("menu-items");
const filterBtns = document.querySelectorAll(".filter-btn");

// Sparar alla rätter för filtrering
let allDishes = [];

// Hämtar alla rätter från API:et
async function fetchMenu() {
    try {
        // Skickar GET-förfrågan till API:et
        const response = await fetch(`${API_URL}/api/menu`);

        // Omvandlar svaret till JSON
        allDishes = await response.json();

        // Visar alla rätter från start
        displayDishes(allDishes);
    } catch (err) {
        // Visar felmeddelande om något går fel
        menuGrid.innerHTML = "<p>Kunde inte ladda menyn</p>";
    }
}

// Visar rätter i gridet
function displayDishes(dishes) {
    // Rensar grid:et
    menuGrid.innerHTML = "";

    // Om inga rätter finns, visa meddelande
    if (dishes.length === 0) {
        menuGrid.innerHTML = "<p>Inga rätter i denna kategori</p>";
        return;
    }

    // Loopar igenom rätterna och skapar HTML kort för varje rätt
    dishes.forEach(dish => {
        menuGrid.innerHTML += `
        <div class="menu-card">
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>
        <p class="price">${dish.price} kr </p>
        <p>${dish.category}</p>
        </div>
        `;
    });
}

// Lyssnar på klick på filterknappar
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Tar bort active-klass från alla knappar
        filterBtns.forEach(b => b.classList.remove("active"));

        // Lägger till active-klass på klickad knapp
        btn.classList.add("active");

        // Hämtar kategori från knappens data-category attribut
        const category = btn.dataset.category;

        // Filtrerar rätter baserat på kategori
        if (category === "all") {
            displayDishes(allDishes);
        } else {
            const filtered = allDishes.filter(dish => dish.category === category);
            displayDishes(filtered);
        }
    });
});

// Lyssnar på input i sökfältet
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
    // Hämtar sökvärdet och omvandlar till lowercase
    const searchValue = searchInput.value.toLowerCase();

    // Filtrerar rätter baserat på sökvärdet
    const filtered = allDishes.filter(dish =>
        dish.name.toLowerCase().includes(searchValue) ||
        dish.description.toLowerCase().includes(searchValue)
    );

    // Visar filtrerade rätter
    displayDishes(filtered);
});

// Anropar funktionen
fetchMenu();

// Markerar aktiv sida i navbar
const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach(link => {
    if (link.href.includes(currentPage)) {
        link.classList.add("active");
    }
});