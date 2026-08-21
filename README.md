# Swasthya Compare (React)

A starter React frontend for comparing indicative hospital treatment packages.

## Run locally

Install a current Node.js LTS version, then run:

```bash
npm install
npm run dev
```

Open the local address Vite prints in the terminal (normally `http://localhost:5173`).

## Structure

- `src/App.jsx` — page and React state
- `src/data.js` — temporary treatment and hospital data; replace this with API data later
- `src/styles.css` — responsive styling

## Suggested backend next

Use an authenticated API for hospitals to submit and update package estimates. Keep fields for price range, inclusions/exclusions, validity date, locality, and verification status. Display only reviewed estimates to patients.
