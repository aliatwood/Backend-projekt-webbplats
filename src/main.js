// API-URL till backend
const API_URL = "https://backend-projekt-api-qkmv.onrender.com";

// Hämtar och visar de tre första rätterna från API:et på startsidan
async function fetchDishes() {

    // Hämtar grid-elementet från HTML
    const grid = document.getElementById("container-items");

    // Om elementet inte finns, avbryt funktionen
    if (!grid) return;

    try{
        // Skickar GET-förfrågan till API:et för att hämta menyn
        const response = await fetch(`${API_URL}/api/menu`);

        // Omvandlar svaret till JSON
        const items = await response.json();

        // Tar bara de tre första rätterna
        const dishes = items.slice(0, 3);

        // Om inga rätter finns, visas meddelande
        if (dishes.length === 0) {
            grid.innerHTML = "<p> Inga rätter tillgängliga just nu </p>";
            return;
        }

        // Loopar igenom rätterna och skapar HTML-kort för varje rätt
        dishes.forEach(dish => {
            grid.innerHTML += `
                <div class = "menu-card">
                    <h3> ${dish.name} </h3>
                    <p> ${dish.description} </p>
                    <p class="price"> ${dish.price} kr </p>
                    <p> ${dish.category} </p>
                </div>
            `;
        });

    } catch (err){
        // Visar felmeddelande om något går fel
        grid.innerHTML = "<p> Kunde inte ladda rätter </p>"
    }
}

// Anropar funktionen
fetchDishes();