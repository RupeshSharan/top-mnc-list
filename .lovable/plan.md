

# SRM DCC Companies Research & Placement Analytics Portal

A comprehensive web portal for SRM University students to explore company profiles, placement insights, and skill requirements for career planning.

---

## 🎨 Design & Branding

- **Color Scheme**: SRM University branding (Navy Blue #1E3A5F, Amber Gold #F5A623, clean whites)
- **Style**: Modern, professional dashboard with clean card-based layouts
- **Typography**: Clear hierarchy with readable fonts
- **Responsive**: Mobile-first design that works on all devices

---

## 📄 Pages to Build

### 1. Dashboard (Home)
- Welcome header with search bar
- Key statistics cards (Total Companies, Avg Package, Top Hiring Sector)
- Quick access tiles for Companies, Skills, and Analytics
- Recent/Featured companies carousel
- Upcoming placement drives section

### 2. Companies List Page
- Searchable, filterable grid/list of all companies
- Filters: Sector, Location, Package Range, Company Type
- Sort options: Name, Package, Hiring Volume
- Company cards showing logo, name, sector, package range, and quick stats

### 3. Company Detail Page
- Company header with logo, name, and key info
- Tabbed sections:
  - **Overview**: Description, headquarters, founded year, employee count
  - **Placement Stats**: Historical hiring data, package trends
  - **Required Skills**: Technical and soft skills needed
  - **Selection Process**: Rounds, eligibility criteria
  - **Alumni**: SRM alumni working there

### 4. Skills Page
- Skills categorized by type (Technical, Soft Skills, Tools)
- Each skill shows:
  - Demand level across companies
  - Related roles
  - Learning resources links
- Filter by skill category and demand level

### 5. Analytics Page
- Interactive charts and visualizations:
  - Placement trends over years
  - Sector-wise hiring distribution
  - Package distribution analysis
  - Skills demand heatmap
  - Top hiring companies comparison

### 6. Innovation Page
- Research initiatives and industry partnerships
- Innovation projects showcase
- Collaboration opportunities
- Contact/inquiry section

---

## 🧩 Key Features

- **Global Search**: Search across companies, skills, and content
- **Responsive Navigation**: Sidebar on desktop, mobile-friendly menu
- **Mock Data Structure**: Ready for Supabase integration with 10 tables
- **Loading States**: Skeleton loaders for smooth UX
- **Empty States**: Graceful handling when no data exists

---

## 🗂️ Data Structure (Mock Data Ready for Supabase)

Prepared data models for:
- Companies, Sectors, Skills
- Placement Statistics, Hiring Trends
- Selection Processes, Alumni Data
- Innovation Projects, Skill Categories

---

## 📱 Navigation Structure

```
├── Dashboard (/)
├── Companies (/companies)
│   └── Company Detail (/companies/:id)
├── Skills (/skills)
├── Analytics (/analytics)
└── Innovation (/innovation)
```

---

This plan creates a polished, functional portal that students can use to explore placement opportunities. The mock data structure will make it seamless to connect to Supabase later when you're ready to add real data.

