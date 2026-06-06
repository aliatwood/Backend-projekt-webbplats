// Hämtar element från HTML
const reviewBtn = document.getElementById("review-btn");
const reviewMessage = document.getElementById("review-message");
const reviewsList = document.getElementById("reviews-list");

// Hämtar recensioner från localStorage
function getReviews() {
    const reviews = localStorage.getItem("reviews");
    return reviews ? JSON.parse(reviews) : [];
}

// Sparar recensioner i localStorage
function saveReviews(reviews) {
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Visar alla recensioner
function displayReviews() {
    const reviews = getReviews();

    // Rensar listan
    reviewsList.innerHTML = "";

    // Om inga recensioner finns, visa meddelande
    if (reviews.length === 0) {
        reviewsList.innerHTML = "<p>Inga recensioner ännu, var först!</p>";
        return;
    }

    // Loopar igenom recensionerna och skapar HTML för varje recension
    reviews.forEach(review => {
        reviewsList.innerHTML += `
        <div class="review-card">
        <div class="review-header">
        <h3>${review.name}</h3>
        <span class="review-rating">${"⭐".repeat(review.rating)}</span>
        </div>
        <p>${review.comment}</p>
        <p class="review-date">${review.date}</p>
        </div>
        `;
    });
}

// Lyssnar på klick på skicka-knappen
reviewBtn.addEventListener("click", () => {
    // Hämtar värden från formuläret
    const name = document.getElementById("review-name").value.trim();
    const rating = document.getElementById("review-rating").value;
    const comment = document.getElementById("review-comment").value.trim();

    // Kontrollerar att alla fält är ifyllda
    if (!name || !comment) {
        reviewMessage.textContent = "Vänligen fyll i alla fält";
        return;
    }

    // Skapar ett recensionsobjekt
    const review = {
        name,
        rating: parseInt(rating),
        comment,
        date: new Date().toLocaleDateString("sv-SE")
    };

    // Hämtar befintliga recensioner och lägger till den nya
    const reviews = getReviews();
    reviews.unshift(review);
    saveReviews(reviews);

    // Visar bekräftelsemeddelande
    reviewMessage.textContent = "Tack för din recension!";
    reviewMessage.style.color = "#D4AF37";

    // Rensar formuläret
    document.getElementById("review-name").value = "";
    document.getElementById("review-comment").value = "";

    // Uppdaterar recensionslistan
    displayReviews();
});

// Visar recensioner vid sidladdning
displayReviews();