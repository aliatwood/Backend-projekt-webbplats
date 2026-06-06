// API-URL till backend
const API_URL = "https://backend-projekt-api-qkmv.onrender.com";

// Hämtar element från HTML
const loginSection = document.getElementById("login-section");
const adminPanel = document.getElementById("admin-panel");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginMessage = document.getElementById("login-message");

// Hämtar token från localStorage
let token = localStorage.getItem("token");

// Visar admin-panel om token finns
if (token) {
    showAdminPanel();
}

// Lyssnar på klick på login-knappen
loginBtn.addEventListener("click", async () => {
    // Hämtar värden från formuläret
    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value.trim();

    // Kontrollerar att alla fält är ifyllda
    if (!username || !password) {
        loginMessage.textContent = "Vänligen fyll i alla fält";
        return;
    }

    try{
        // Skickar POST-förfrågan till API:et för inloggning
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Sparar token i localStorage
            localStorage.setItem("token", data.token);
            token = data.token;
            showAdminPanel();
        } else {
            // Visar felmeddelande från API:et
            loginMessage.textContent = data.message;
        }
    } catch (err) {
        // Visar felmeddelande om något går fel
        loginMessage.textContent = "Något gick fel, försök igen.";
    }
});

// Lyssnar på klick på logout-knappen
logoutBtn.addEventListener("click", () => {
    // Tar bort token från localStorage
    localStorage.removeItem("token");
    token = null;

    // Visar login-sektionen
    loginSection.style.display = "block";
    adminPanel.style.display = "none";
    logoutBtn.style.display = "none";
});

// Visar admin-panel och döljer login-sektion
function showAdminPanel() {
    loginSection.style.display = "none";
    adminPanel.style.display = "block";
    logoutBtn.style.display = "block";

    // Hämtar meny och bokningar
    fetchAdminMenu();
    fetchAdminBookings();
}

// Hämtar alla rätter för admin
async function fetchAdminMenu() {
    const menuList = document.getElementById("admin-menu-list");

    try {
        // Skickar GET-förfrågan till API:et
        const response = await fetch(`${API_URL}/api/menu`);
        const dishes = await response.json();

        // Rensar listan
        menuList.innerHTML = "";

        // Loopar igenom rätterna och skapar HTML för varje rätt
        dishes.forEach(dish => {
            menuList.innerHTML += `
            <div class ="admin-item">
            <span>${dish.name} - ${dish.price} kr (${dish.category})</span>
            <button onclick="deleteDish(${dish.id})">Radera</button>
            </div>
            `;
        });
    } catch (err) {
        // Visar felmeddelande om något går fel
        menuList.innerHTML = "<p>Kunde inte ladda menyn</p>";
    }
}

// Hämtar alla bokningar för admin
async function fetchAdminBookings() {
    const bookingList = document.getElementById("admin-booking-list");

    try {
        // Skickar GET-förfrågan till API:et med token
        const response = await fetch(`${API_URL}/api/bookings`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const bookings = await response.json();

        // Rensar listan
        bookingList.innerHTML = "";

        if (bookings.length === 0) {
            bookingList.innerHTML = "<p>Inga bokningar ännu</p>";
            return;
        }

        // Loopar igenom bokningarna och skapar HTML för varje bokning
        bookings.forEach(booking => {
            bookingList.innerHTML += `
            <div class ="admin-item">
            <span>${booking.name} - ${booking.date} - ${booking.guests} gäster - ${booking.phone}</span>
            <button onclick="deleteBooking(${booking.id})">Radera</button>
            </div>
            `;
        });
    } catch (err) {
        // Visar felmeddelande om något går fel
        bookingList.innerHTML = "<p>Kunde inte ladda bokningar</p>";
    }
}

// Lägger till en ny rätt
const addDishBtn = document.getElementById("add-dish-btn");
const dishMessage = document.getElementById("dish-message");

addDishBtn.addEventListener("click", async () => {
    // Hämtar värden från formuläret
    const name = document.getElementById("dish-name").value.trim();
    const description = document.getElementById("dish-description").value.trim();
    const price = document.getElementById("dish-price").value;
    const category = document.getElementById("dish-category").value;

    // Kontrollerar att alla fält är ifyllda
    if (!name || !price || !category) {
        dishMessage.textContent = "Vänligen fyll i alla fält";
        return;
    }
    
    try{
        // Skickar POST-förfrågan till API:et med token
        const response = await fetch(`${API_URL}/api/menu`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, description, price, category })
        });

        const data = await response.json();
        if (response.ok) {
            // Visar bekräftelsemeddelande
            dishMessage.textContent = "Rätt tillagd!";

            // Rensar formuläret
            document.getElementById("dish-name").value = "";
            document.getElementById("dish-description").value = "";
            document.getElementById("dish-price").value = "";

            // Uppdaterar menylistan
            fetchAdminMenu();
        } else {
            dishMessage.textContent = data.message;
        }
    } catch (err) {
        // Visar felmeddelande om något går fel
        dishMessage.textContent = "Något gick fel, försök igen.";
    }
});

// Raderar en rätt
async function deleteDish(id) {
    try {
        // Skickar DELETE-förfrågan till API:et med token
        await fetch(`${API_URL}/api/menu/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        // Uppdaterar menylistan
        fetchAdminMenu();
    } catch (err) {
        // Visar felmeddelande om något går fel
        console.error("Kunde inte radera rätten");
    }
}

// Raderar en bokning
async function deleteBooking(id) {
    try {
        // Skickar DELETE-förfrågan till API:et med token
        await fetch(`${API_URL}/api/bookings/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        // Uppdaterar bokningslistan
        fetchAdminBookings();
    } catch (err) {
        // Visar felmeddelande om något går fel
        console.error("Kunde inte radera bokning");
    }
}

// Gör funktionerna globala så att onclick i HTML kan nå dem
window.deleteDish = deleteDish;
window.deleteBooking = deleteBooking;