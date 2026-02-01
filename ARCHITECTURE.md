# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser / React App                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              React Components                             │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │  Companies   │  │   Company    │  │   Dashboard  │   │   │
│  │  │    Page      │  │   Detail     │  │    Page      │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  │         △                 △                  △             │   │
│  │         │                 │                  │             │   │
│  │         └─────────────────┴──────────────────┘             │   │
│  │                           │                                │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                      │
│  ┌──────────────────────────▼──────────────────────────────────┐   │
│  │          Custom React Hooks (src/hooks/)                   │   │
│  │                                                             │   │
│  │  useCompanies()  │ useCulture()  │ useBusinessInfo()     │   │
│  │  useCompany()    │ useFinancials │ useCompensation()      │   │
│  │  useCompleteCP   │ useLogistics  │ useTalentGrowth()      │   │
│  │  usePeople()     │ useTechnologies() useBrandReputation() │   │
│  │                                                             │   │
│  │  ✓ Real-time subscriptions automatic                      │   │
│  │  ✓ Loading and error states handled                       │   │
│  │  ✓ Cleanup subscriptions on unmount                       │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                      │
│  ┌──────────────────────────▼──────────────────────────────────┐   │
│  │         Service Functions (src/services/)                  │   │
│  │                                                             │   │
│  │  fetch* functions    subscribe* functions                 │   │
│  │  ├─ fetchAllCompanies     ├─ subscribeToCompanies       │   │
│  │  ├─ fetchCompanyById      ├─ subscribeToCompany        │   │
│  │  ├─ searchCompanies       ├─ subscribeToBusinessInfo   │   │
│  │  ├─ fetchCulture         ├─ subscribeToCulture        │   │
│  │  ├─ fetchFinancials      ├─ subscribeToFinancials     │   │
│  │  ├─ fetchCompensation    ├─ subscribeToCompensation   │   │
│  │  └─ ... (10 tables total) └─ ... (real-time sync)      │   │
│  │                                                             │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                      │
│  ┌──────────────────────────▼──────────────────────────────────┐   │
│  │        Supabase Client (src/lib/)                           │   │
│  │                                                             │   │
│  │  supabase-client.ts     supabase.types.ts                │   │
│  │  ├─ Initialize client   ├─ Company types                │   │
│  │  ├─ Environment vars    ├─ BrandReputation types        │   │
│  │  ├─ Error handling      ├─ Business types               │   │
│  │  └─ Connection config   ├─ ... (50+ types)              │   │
│  │                         └─ All table types               │   │
│  │                                                             │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                      │
│                    HTTPS/WebSocket                                 │
│                             │                                      │
└─────────────────────────────┼──────────────────────────────────────┘
                              │
                              │ Real-Time
                              │ Subscriptions
                              │
                    ┌─────────▼────────┐
                    │  PostgreSQL DB   │
                    │   (Supabase)     │
                    └──────────────────┘
                              │
                    ┌─────────▼────────────────────┐
                    │   10 Related Tables:         │
                    ├──────────────────────────────┤
                    │  • companies                 │
                    │  • company_brand_reputation  │
                    │  • company_business          │
                    │  • company_compensation      │
                    │  • company_culture           │
                    │  • company_financials        │
                    │  • company_logistics         │
                    │  • company_people            │
                    │  • company_talent_growth     │
                    │  • company_technologies      │
                    └──────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│  User Interaction                                                   │
│  (Opens Companies Page)                                             │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
         ┌─────────────────────────────────────┐
         │ Component Renders                   │
         │ <Companies />                       │
         └──────────────────┬──────────────────┘
                            │
                            ▼
         ┌──────────────────────────────────────┐
         │ Hook Invoked                         │
         │ useCompanies()                       │
         └──────────────────┬───────────────────┘
                            │
                            ▼
         ┌──────────────────────────────────────┐
         │ useEffect() runs                     │
         │ • Call fetchAllCompanies()           │
         │ • Subscribe to real-time updates     │
         └──────────────────┬───────────────────┘
                            │
                            ▼
         ┌──────────────────────────────────────┐
         │ Service Function Called              │
         │ fetchAllCompanies()                  │
         └──────────────────┬───────────────────┘
                            │
                            ▼
         ┌──────────────────────────────────────┐
         │ Database Query Executed              │
         │ SELECT * FROM companies              │
         └──────────────────┬───────────────────┘
                            │
                            ▼
         ┌──────────────────────────────────────┐
         │ Results Returned                     │
         │ Company[] → Hook State               │
         └──────────────────┬───────────────────┘
                            │
                            ▼
         ┌──────────────────────────────────────┐
         │ Component Re-renders                 │
         │ Displays Company List                │
         └──────────────────┬───────────────────┘
                            │
      ┌─────────────────────┴──────────────────┐
      │                                         │
      ▼                                         ▼
┌──────────────────┐                ┌──────────────────┐
│ Real-Time Event  │                │ User Interaction │
│ (DB Updated)     │                │ (Click, Type)    │
└────────┬─────────┘                └────────┬─────────┘
         │                                   │
         ▼                                   ▼
┌──────────────────────────────────────────────────┐
│ Auto-Sync / Filter / Search                     │
│ Component Updates Instantly                      │
└─────────────────────────────────────────────────┘
```

## State Management Flow

```
                    ┌────────────────────────┐
                    │  Hook State Variables  │
                    ├────────────────────────┤
                    │ - companies: []        │
                    │ - loading: boolean     │
                    │ - error: Error | null  │
                    └──────────┬─────────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
        ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
        │  Loading    │ │   Success   │ │    Error    │
        │   State     │ │   State     │ │    State    │
        ├─────────────┤ ├─────────────┤ ├─────────────┤
        │ Show spinner│ │ Render list │ │ Show message│
        │ Disable UI  │ │ Enable sort │ │ Log error   │
        │             │ │ Enable search│ │ Offer retry │
        └─────────────┘ └─────────────┘ └─────────────┘
                │              │              │
                └──────────────┼──────────────┘
                               │
                               ▼
                    ┌────────────────────────┐
                    │  Component Renders     │
                    │  User Sees Data        │
                    └────────────────────────┘
```

## Real-Time Synchronization

```
┌─────────────────────────────────────────────────────────────┐
│                    Multiple Users                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User A                   User B                User C      │
│  ┌────────┐              ┌────────┐           ┌────────┐   │
│  │Browser │              │Browser │           │Browser │   │
│  │ (USA)  │              │ (UK)   │           │(India) │   │
│  └───┬────┘              └───┬────┘           └───┬────┘   │
│      │                       │                    │         │
│      │  Supabase Client      │  Supabase Client   │         │
│      │  Subscribed to:       │  Subscribed to:    │         │
│      │  • companies          │  • companies       │         │
│      │  • company_business   │  • company_culture │         │
│      │                       │                    │         │
│      └───────────┬───────────┴────────────┬───────┘         │
│                  │                        │                 │
│                  │     WebSocket          │                 │
│                  │   (Real-time)          │                 │
│                  │                        │                 │
└──────────────────┼────────────────────────┼─────────────────┘
                   │                        │
                   │  Real-Time Event       │
                   │  Company data updated  │
                   │  in Supabase           │
                   │                        │
        ┌──────────┴────────────────────────┴─────────┐
        │                                             │
        │     Supabase Realtime Broadcast             │
        │     (Published in < 100ms)                  │
        │                                             │
        └──────────┬────────────────────────────────┬─┘
                   │                                │
        ┌──────────▼──────────┐        ┌────────────▼──────────┐
        │ User A sees update  │        │ User B sees update    │
        │ Component re-renders│        │ Component re-renders  │
        │ Data displayed live │        │ Data displayed live   │
        └─────────────────────┘        └───────────────────────┘
```

## Component Lifecycle with Real-Time

```
React Component Lifecycle
┌────────────────────────────────────┐
│    Component Mounts                │
└───────────────┬────────────────────┘
                │
                ▼
        ┌──────────────────┐
        │ useCompanies()   │ ◄─ Hook called
        │ Hook runs        │
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │ useEffect()      │ ◄─ Once on mount
        │ • Fetch data     │
        │ • Subscribe      │
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │ Component renders│ ◄─ First render
        │ Shows loading    │
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │ Data arrives     │ ◄─ Async
        │ State updates    │
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │ Component renders│ ◄─ Second render
        │ Shows data       │
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │ Real-time event  │ ◄─ Data changed
        │ State updates    │   in Supabase
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │ Component renders│ ◄─ Auto re-render
        │ Shows new data   │
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │ User navigates   │
        │ away / unmounts  │
        └───────┬──────────┘
                │
                ▼
        ┌──────────────────┐
        │ Cleanup runs     │ ◄─ useEffect cleanup
        │ • Unsubscribe    │
        │ • Release memory │
        └──────────────────┘
```

## Error Handling Flow

```
                    ┌──────────────────┐
                    │  Operation starts│
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
        ┌──────────────┐         ┌──────────────┐
        │  Success ✓   │         │  Error ✗     │
        ├──────────────┤         ├──────────────┤
        │• Data loaded │         │• Error caught│
        │• Render UI   │         │• setState    │
        │• Subscribe   │         │• Show message│
        │• Display data│         │• Log console │
        └──────────────┘         └──────────────┘
                                        │
                    ┌───────────────────┴───────────────┐
                    │                                   │
                    ▼                                   ▼
            ┌──────────────────┐            ┌──────────────────┐
            │ Network Error    │            │ Validation Error │
            │ • Retry button   │            │ • Show details   │
            │ • Offline notice │            │ • Log error data │
            └──────────────────┘            └──────────────────┘
```

## File Organization

```
project-root/
├── src/
│   ├── lib/                          ◄─ Core library
│   │   ├── supabase-client.ts        ◄─ Client init
│   │   ├── supabase.types.ts         ◄─ All types
│   │   ├── types.ts                  ◄─ App types (existing)
│   │   └── ...
│   ├── services/                     ◄─ Business logic
│   │   ├── companyService.ts         ◄─ DB operations
│   │   └── ...
│   ├── hooks/                        ◄─ React hooks
│   │   ├── useCompanies.ts           ◄─ Company hooks
│   │   ├── use-mobile.tsx            ◄─ Existing
│   │   └── ...
│   ├── pages/                        ◄─ UI Pages
│   │   ├── Companies.tsx             ◄─ Updated
│   │   ├── CompanyDetail.tsx         ◄─ Updated
│   │   └── ...
│   └── ...
├── .env.example                      ◄─ Config template
├── .env.local                        ◄─ Local secrets (YOU ADD THIS)
├── SUPABASE_SETUP.md                 ◄─ Setup guide
├── SUPABASE_QUICKSTART.md            ◄─ Quick ref
├── INTEGRATION_CHECKLIST.md          ◄─ Checklist
├── EXAMPLE_DATA_AND_SQL.md           ◄─ Examples
├── QUICK_REFERENCE.md                ◄─ Cheat sheet
├── IMPLEMENTATION_SUMMARY.md         ◄─ Overview
└── ...
```

---

**Created**: January 31, 2026  
**Architecture Version**: 1.0  
**Status**: ✅ Production Ready
