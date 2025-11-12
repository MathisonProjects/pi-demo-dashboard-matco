# PI Demo Dashboard

A modern data dashboard built with React, TypeScript, Radix UI, and shadcn/ui components.

## Features

- **Modern UI Components**: Built with Radix UI primitives and shadcn/ui
- **Data Visualizations**: Interactive charts using Recharts
- **Responsive Design**: Tailwind CSS for styling
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- React 18
- TypeScript
- Vite
- Radix UI
- shadcn/ui
- Recharts
- Tailwind CSS
- Lucide React (icons)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── StatCards.tsx
│   ├── RecoupmentHistory.tsx
│   ├── TopTreatmentCategories.tsx
│   └── ClaimGroups.tsx
├── lib/
│   └── utils.ts     # Utility functions
├── App.tsx          # Main application component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Components

### Dashboard Components

- **Header**: Top navigation bar with user profile
- **Sidebar**: Left navigation menu
- **StatCards**: Key metrics display cards
- **RecoupmentHistory**: Line chart showing recoupment trends
- **TopTreatmentCategories**: Horizontal bar chart of top categories
- **ClaimGroups**: Scatter plot visualization of claim groups

## License

MIT

