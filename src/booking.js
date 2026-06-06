// API-URL till backend
const API_URL = "https://backend-projekt-api-qkmv.onrender.com";

// Hämtar formulärelement från HTML
const bookingBtn = document.getElementById("booking-btn");
const bookingMessage = document.getElementById("booking-message");

// Lyssnar på klick på boka-knappen
bookingBtn.addEventListener("click", async () => {
    // Hämtar värden från formuläret
    const name = document.getElementById("booking-name").value.trim();
    const phone = document.getElementById("booking-phone").value.trim();
    const date = document.getElementById("booking-date").value;
    const guests = document.getElementById("booking-guests").value;

    // Kontrollerar att alla fält är ifyllda
    if (!name || !phone || !date || !guests) {
        bookingMessage.textContent = "Vänligen fyll i alla fält";
        return;
    }

    try {
        // Skickar POST-förfrågan till API:et med bokningsdata
        const response = await fetch(`${API_URL}/api/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            // Omvandlar bokningsdata till JSON
            body: JSON.stringify({ name, phone, date, guests })
        });

        const data = await response.json();
        if (response.ok) {
            // Visar bekräftelsemeddelande om bokningen lyckades
            bookingMessage.textContent = "Bokning bekräftad! Vi ses snart.";
            bookingMessage.style.color = "#D4AF37";
        } else {
            // Visar felmeddelande från API:et
            bookingMessage.textContent = data.message;
        }
    } catch (err) {
        // Visar felmeddelande om något går fel
        bookingMessage.textContent = "Något gick fel, försök igen.";
    }
})