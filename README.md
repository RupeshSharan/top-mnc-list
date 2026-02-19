# Top MNC List

A college workshop project website that explains the campus placement process and highlights top recruiting companies. Built to present the placement flow clearly and give students a quick view of leading employers.

## What This Site Covers
- Step-by-step placement process overview
- Eligibility and key stages (registration, tests, interviews)
- Top recruiting companies list
- Clean, student-friendly UI for quick understanding

## Tech Stack
- Vite
- React + TypeScript
- Tailwind CSS
- shadcn-ui

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment (optional)
If you are connecting Supabase, create `.env.local` and add:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
If you are not using Supabase, you can skip this step.

### 3) Run locally
```bash
npm run dev
```

Open `http://localhost:5173/companies`

## Scripts
- `npm run dev` Start dev server
- `npm run build` Production build
- `npm run preview` Preview production build
- `npm run lint` Lint code
- `npm run test` Run tests

## Project Structure
- `src/pages` Routes and page-level UI
- `src/hooks` Data fetching hooks
- `src/services` Data services
- `src/lib` Client setup and shared utils
- `public` Static assets

## Notes
- This project was created during a college workshop.
- Content focuses on placement guidance and company listings.
