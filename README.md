# Happy Birthday Kia 🎀

A static birthday website (HTML + CSS + JavaScript). No build step needed.

## Put it on GitHub Pages
1. Create a new GitHub repository (for example `happy-birthday-kia`).
2. Upload **everything in this folder** (index.html, css/, js/, assets/) to the repository root.
3. In the repo go to **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` and `/ (root)`, then Save.
4. After a minute your site is live at `https://<your-username>.github.io/happy-birthday-kia/`.

## Customise
Open `js/data.js`:
- `CONFIG.fromName` – your name (appears in the letter signature)
- `CONFIG.viberNumber` – where Kia's thank-you message goes (currently +94762720808)
- `GALLERY`, `WISHES`, `MARQUEE` – painting titles, wish texts, scrolling banner words

## What's inside
- **Intro gift box** → confetti, fireworks and a music-box "Happy Birthday" tune
- **Flight transition** – every tab change flies Kia Airways between cities (Colombo → London → Paris → Rome…)
- **Home** – today's-birthday highlight, 1992 → 2026 counter, live countdowns (birthday ends / 35th milestone), days lived
- **Her Story** – 12 animated chapters: birth at Kalutara Teaching Hospital, childhood, Montessori, school,
  University of Kelaniya, career, UK Master's, England, Paris, Rome, Disneyland Paris, today
- **Gallery** – 26 photos re-painted as oil/watercolour artworks in museum frames, with lightbox
- **Wishes** – flip cards (education, profession, life goals, travel…) + wish lanterns
- **About Kia** – profile, education timeline, passport stamps
- **Surprises** – 8 gifts: blow-out candles (mic supported), scratch card, balloon pop, boarding pass,
  fortune cookie, fireworks, quiz, letter
- **Say Thanks** – Kia writes a note; Viber opens to the chat with the message pre-filled (it's also copied to the clipboard as backup)

Note: Viber has to be installed on the device. Static sites can't send messages by themselves, so Kia taps "send" in Viber.
