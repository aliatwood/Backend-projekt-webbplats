# Projekt - King Dynasty Restaurang

En webbapplikation för restaurangen King Dynasty som består av en REST API backend samt en frontend som konsumerar API:et.  
Systemet hanterar en dynamisk meny, bordsbokning och adminhantering via JWT-autentisering.

## Sidor
- **index.html** - Startsida med hero-bild och populära rätter från API:et
- **pages/menu.html** - Menysida med filtrering och sökfunktion
- **pages/booking.html** - Sida för att boka bord
- **pages/contact.html** - Kontaktsida med formulär och karta
- **pages/about.html** - Om oss-sida med historia, värderingar och team
- **pages/reviews.html** - Recensionssida där gäster kan lämna omdömen
- **pages/admin.html** - Adminpanel för att hantera meny och bokningar

## Funktionalitet
Webbplatsen använder Fetch API för att kommunicera med ett REST API byggt i Node.js och Express.

Funktioner:
- Dynamisk meny hämtad från API:et
- Filtrering av rätter per kategori
- Sökfunktion för rätter
- Bordsbokning med namn, telefon, datum och antal gäster
- Kontaktformulär
- Google Maps-karta
- Recensioner sparade i localStorage
- Adminpanel med inloggning via JWT
- Lägg till och radera menyrätter via admin
- Se och radera bokningar via admin

## Admin
Adminpanelen nås via `/pages/admin.html`

Inloggningsuppgifter för testning:
- **Användarnamn:** admin
- **Lösenord:** admin123
**OBS:** Databasen kan nollställas vid serveromstart på Render (gratis-plan). Om inloggning inte fungerar, kör följande kommando i PowerShell för att registrera admin igen:

```powershell
Invoke-WebRequest -Uri "https://backend-projekt-api-qkmv.onrender.com/api/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"username":"admin","password":"admin123"}' -UseBasicParsing
```

## API
Webbplatsen kommunicerar med detta API:
https://backend-projekt-api-qkmv.onrender.com/

### Endpoints
| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| GET | / | API-status |
| POST | /api/auth/register | Registrera användare |
| POST | /api/auth/login | Logga in användare |
| GET | /api/auth/protected | Skyddad route |
| GET | /api/menu | Hämta alla rätter |
| POST | /api/menu | Lägg till rätt (kräver JWT) |
| PUT | /api/menu/:id | Uppdatera rätt (kräver JWT) |
| DELETE | /api/menu/:id | Radera rätt (kräver JWT) |
| POST | /api/bookings | Skapa bokning |
| GET | /api/bookings | Hämta bokningar (kräver JWT) |
| DELETE | /api/bookings/:id | Radera bokning (kräver JWT) |

## Installation
Följ stegen nedan för att köra projektet lokalt:
1. Kör `npm install`
2. Starta projektet med `npm run dev`
3. Bygg projektet med `npm run build`

## Tekniker
HTML, CSS och JavaScript  
Byggverktyg: Vite  
Backend: Node.js, Express  
Databas: SQLite (better-sqlite3)  
Autentisering: JWT (JSON Web Token)  
Hashning: bcrypt  
Deployment: GitHub Pages + Render

## Publicerad webbplats
Webbplatsen publiceras automatiskt via **GitHub Pages**.
[Länk till den publicerade webbplatsen](https://aliatwood.github.io/Backend-projekt-webbplats/)
