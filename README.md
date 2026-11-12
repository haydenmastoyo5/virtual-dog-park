# Virtual Dog Park

A beginner-friendly website built with only HTML, CSS, and vanilla JavaScript — no frameworks, no backend, no external APIs, and no package manager. Visitors can browse a small dog encyclopedia and adopt a virtual dog that grows over time.

The SVG illustrations in the `assets/` folder are project-created illustrations, not real dog photographs.

## Features

- **Dog Encyclopedia** — read about three breeds (Beagle, Golden Retriever, Poodle) with notes on size, personality, and everyday care. Each card has a "Show care tips" button that reveals extra advice.
- **My Virtual Dog** — adopt a virtual dog by choosing a breed and entering a name. The dog starts on Day 1 as a Puppy with happiness 50.
- **Feed and Play** — each button increases happiness by 10, up to a maximum of 100.
- **Next Day** — advances the day by 1 and decreases happiness by 5 (never below 0). The dog's growth stage may change.
- **Growth stages** — the dog's stage is shown as text, as a growth bar, and through illustration size changes.
- **Auto-save** — pet progress is saved in the browser's `localStorage` and restored automatically after a page refresh.
- **Start Over** — deletes saved progress and returns to the adoption form, but only after the visitor confirms via a dialog. Canceling keeps the dog.
- **Responsive design** — the layout adapts for phones and laptops.

## How to Preview

The project is static — you can open `index.html` directly in a browser. For a better experience (especially for `localStorage` to work consistently), use a local server.

### Option A: VS Code Live Server (recommended)

1. Open the project folder in VS Code.
2. Install the **Live Server** extension by Ritwick Dey (if not already installed).
3. Right-click `index.html` in the file explorer and choose **Open with Live Server**.
4. Your browser will open automatically at something like `http://127.0.0.1:5500/index.html`.

### Option B: Python built-in server

If you have Python installed, run this in the project folder:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Option C: Open the file directly

Double-click `index.html` to open it in your default browser. This works for most features, but some browsers restrict `localStorage` on the `file://` protocol. If saving does not work, use a local server instead.

## Growth and Happiness Rules

| Action | Effect |
|--------|--------|
| Adopt a new dog | Day 1, Puppy stage, happiness 50 |
| Feed | Happiness +10 (max 100) |
| Play | Happiness +10 (max 100) |
| Next Day | Day +1, happiness −5 (min 0) |

Growth stages by day:

| Day | Stage |
|-----|-------|
| 1 | Puppy |
| 2–3 | Young Dog |
| 4+ | Adult Dog |

The growth stage is shown as **text** in the stats list, as a **green growth bar** that fills up, and through the **illustration size** (small for Puppy, medium for Young Dog, largest for Adult Dog).

## Where Pet Progress Is Stored

Pet progress (name, breed, day, and happiness) is saved in the **browser's `localStorage`** under the key `virtualDogParkPetV1`. This data lives only in the visitor's own browser on their own computer — it is **not** uploaded to a server, not stored in a GitHub account, and not shared across devices or browsers. Clearing the browser's site data or using a different browser will start fresh.

Only one dog is stored at a time. Adopting a new dog or clicking Start Over replaces or removes the saved data.

## Manual Testing Checklist

These checks should be performed manually in a browser. They have not been auto-run by any test script.

- [ ] Page loads without console errors.
- [ ] All three breed illustrations display in the encyclopedia section.
- [ ] "Show care tips" button toggles the tips panel open and closed for each breed.
- [ ] Adopting with an empty name shows an error message and does not adopt.
- [ ] Adopting with a name longer than 20 characters shows an error message.
- [ ] Entering a valid name and clicking Adopt shows the dog status panel.
- [ ] Dog starts on Day 1, Puppy stage, happiness 50.
- [ ] Feed button increases happiness by 10 and caps at 100.
- [ ] Play button increases happiness by 10 and caps at 100.
- [ ] Next Day increases the day by 1 and decreases happiness by 5.
- [ ] Happiness never drops below 0 after Next Day.
- [ ] Growth stage changes from Puppy to Young Dog on Day 2, and to Adult Dog on Day 4.
- [ ] Growth stage text is visible in the stats list (not only color or size).
- [ ] Growth bar fills as the dog grows.
- [ ] Illustration size changes with the growth stage.
- [ ] Refreshing the page restores the saved dog automatically.
- [ ] Start Over asks for confirmation. Canceling keeps the dog.
- [ ] Start Over (confirmed) deletes the dog and shows the adoption form.
- [ ] Page layout looks correct on a narrow phone-width viewport.
