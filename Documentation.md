# Documentation - Expense Tracker Pro

## Overview
Multi-page client-side app. Data stored in `localStorage` key `trackerpro_v1`.

## Main files
- `assets/js/app.js` - storage & common helpers
- `assets/js/transactions.js` - page logic for transactions
- `assets/js/dashboard.js` - dashboard rendering & preview chart
- `assets/js/analytics.js` - charts
- `assets/js/reports.js` - CSV export
- `assets/js/settings.js` - theme & reset

## Extending
- To convert to server-backed app: create REST APIs and replace localStorage with API calls.
- To add auth: JWT + backend + per-user collections.
- For PDF reports: integrate jsPDF or server-side PDF generator.

## Notes
- For best visuals include `assets/css/animations.css` and AOS library for scroll animations.
- To deploy, push repo to GitHub and connect Netlify/Vercel.
