// API-URL till backend
const API_URL = "https://backend-projekt-api-qkmv.onrender.com";

// Hämtar formulärelement från HTML
const sendBtn = document.getElementById("send-btn");
const contactMessage = document.getElementById("contact-message");

// Lyssnar på klick på skicka-knappen
sendBtn.addEventListener("click", () => {

    // Hämtar värden från formuläret
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Kontrollerar att alla fält är ifyllda
    if (!name || !email || !message) {
        contactMessage.textContent = "Vänligen fyll i alla fält";
        return;
    }

    // Visar bekräftelsemeddelande
    contactMessage.textContent = "Tack för ditt meddelande! Vi återkommer så snart som möjligt.";
    contactMessage.style.color = "#D4AF37";

    // Rensar formuläret
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
});