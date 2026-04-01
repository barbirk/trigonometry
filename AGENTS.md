# TrigPath — Agent Guide

**TrigPath** (also known as *Académie Trigonométrique*) is an interactive Progressive Web Application (PWA) designed to teach trigonometry to secondary school students. It follows a pedagogical framework that progresses from Concrete → Numerical → Symbolic → Applied learning phases.

---

## Project Overview

| Attribute | Details |
|-----------|---------|
| **Name** | TrigPath |
| **Type** | Educational PWA (Progressive Web App) |
| **Target Audience** | Secondary school students (16-year-old learners) |
| **Languages** | English, French (i18n via react-i18next) |
| **Primary Device** | Tablets and laptops |

### Core Features
- **Interactive Triangle Explorer**: Visualize and manipulate right triangles with real-time trigonometric ratio calculations
- **Diagram Labeler**: Interactive drag-and-drop exercise for learning triangle terminology (hypotenuse, opposite, adjacent)
- **Calculator Guard**: Verifies student's calculator is in degree mode before proceeding
- **Spaced Repetition System**: SM-2 algorithm implementation for knowledge retention
- **Gamified Progress Tracking**: XP system, daily streaks, and module completion tracking
- **Bilingual Support**: Full French and English localization

---

## Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4.2 |
| **Routing** | React Router 7 |
| **State Management** | Zustand 5 (with persistence) |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Math Rendering** | KaTeX |
| **i18n** | i18next + react-i18next |
| **Date Utilities** | date-fns |
| **PWA** | vite-plugin-pwa |

---

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── CalculatorGuard.tsx    # Calculator mode verification
│   │   ├── DiagramLabeler.tsx     # Interactive triangle labeling
│   │   └── TriangleExplorer.tsx   # Interactive triangle visualization
│   ├── data/
│   │   ├── modules/         # Lesson content (JSON)
│   │   │   ├── en.json      # English curriculum
│   │   │   └── fr.json      # French curriculum
│   │   ├── problems/        # Problem sets (empty - future use)
│   │   └── scenarios/       # Real-world scenario images (empty - future use)
│   ├── pages/               # Route-level page components
│   │   ├── DashboardPage.tsx      # Learning journey map
│   │   ├── ExplorerPage.tsx       # Triangle lab/playground
│   │   └── LessonPage.tsx         # Individual lesson view
│   ├── store/
│   │   └── progressStore.ts       # Zustand store with SM-2 algorithm
│   ├── App.tsx              # Root layout with sidebar navigation
│   ├── App.css              # Component-specific styles
│   ├── i18n.ts              # Internationalization configuration
│   ├── index.css            # Global styles, Tailwind theme, CSS variables
│   └── main.tsx             # Application entry point with router
├── public/                  # Static assets (favicons, icons)
├── .github/workflows/       # GitHub Actions CI/CD
│   └── deploy.yml           # GitHub Pages deployment
├── vite.config.ts           # Vite configuration with PWA setup
├── tsconfig.app.json        # TypeScript config for application
├── tsconfig.node.json       # TypeScript config for build tools
├── eslint.config.js         # ESLint configuration
└── index.html               # HTML entry point
```

---

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint
```

### Key Build Details
- **Output Directory**: `dist/` (configured in Vite)
- **Base Path**: `/trigonometry/` (for GitHub Pages deployment)
- **TypeScript**: Strict mode enabled with no unused locals/parameters checks

---

## Code Style Guidelines

### TypeScript
- Strict TypeScript configuration is enforced
- All components use `.tsx` extension
- Props and state are explicitly typed
- No unused locals or parameters allowed (`noUnusedLocals: true`, `noUnusedParameters: true`)
- All imports must use explicit `.tsx` extensions

### React Patterns
- Functional components with hooks
- `useTranslation()` hook for internationalization
- Zustand `useProgressStore()` for state access
- React Router's `useNavigate()`, `useLocation()`, `useParams()` for routing

### CSS/Styling
- Tailwind CSS 4 with custom theme configuration in `index.css`
- CSS variables for theming (supports dark/light mode via `prefers-color-scheme`)
- Custom color palette:
  - Primary: `#4DFFA4` (electric mint)
  - Surface (dark): `#0F1117`
  - Surface container: `#1C1F2E`
  - Text primary: `#F0F4FF`
  - Error: `#FF6B6B`
  - Hint: `#FFD166`

### Fonts
- **Display**: Space Mono (headings, UI elements)
- **Body**: Literata (content text)
- **Math**: JetBrains Mono (formulas, numerical values)

---

## Routing Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `DashboardPage` | Learning journey map with modules and lessons |
| `/lesson/:lessonId` | `LessonPage` | Interactive lesson content |
| `/explorer` | `ExplorerPage` | Free-play triangle visualization lab |
| `/review` | (planned) | Spaced repetition review queue |

---

## State Management

### Progress Store (Zustand)
Location: `src/store/progressStore.ts`

**State Interface:**
```typescript
interface ProgressState {
  completedLessons: string[];    // Array of lesson IDs
  completedModules: number[];    // Array of module IDs
  sm2Deck: Record<string, SM2Item>;  // Spaced repetition cards
  streak: number;                // Consecutive days active
  lastActiveDate: string | null; // ISO date string
  xp: number;                    // Experience points
}
```

**SM-2 Algorithm:**
The store implements the SuperMemo-2 spaced repetition algorithm for flashcard scheduling:
- Tracks repetition count, interval (days), and ease factor
- Schedules next review dates based on quality ratings (0-5)
- Minimum ease factor capped at 1.3

**Persistence:**
All state is persisted to `localStorage` under the key `trigpath-progress`.

---

## Content Structure

Lessons are defined in JSON files (`src/data/modules/en.json`, `src/data/modules/fr.json`).

### Module Schema
```typescript
interface Module {
  moduleId: number;
  title: string;
  hook: {
    question: string;    // Engaging scenario question
    imageUrl: string;    // Scenario image path
  };
  lessons: Lesson[];
}
```

### Lesson Schema
```typescript
interface Lesson {
  lessonId: string;      // Format: "{moduleId}-{lessonNum}"
  title: string;
  type: "text" | "interactive" | "explorer";
  explorerConfig?: {     // For interactive lessons
    mode: "label_exploration" | "full_explorer";
    showRatios: boolean;
    highlightAngle: boolean;
  };
  content: ContentItem[];
}
```

### Content Item Types
```typescript
type ContentItem =
  | { type: "text"; body: string }
  | { type: "explorer"; prompt: string }
  | { type: "check"; question: string; options: string[]; correct: number; explanation: string }
```

---

## Internationalization

- **Default Language**: French (`fr`)
- **Fallback Language**: English (`en`)
- **Translation Files**: `src/i18n.ts` (currently inline, can be split into JSON files)
- **Language Toggle**: Available in sidebar (desktop) and header (mobile)
- **Module Content**: Separate JSON files per language in `src/data/modules/`

---

## Deployment

### GitHub Pages
The application is automatically deployed to GitHub Pages on push to `main` branch.

**Workflow:** `.github/workflows/deploy.yml`
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (`npm ci --legacy-peer-deps`)
4. Build (`npm run build`)
5. Deploy `dist/` folder to GitHub Pages

**Base URL**: `/trigonometry/` (configured in `vite.config.ts`)

### PWA Configuration
- **Service Worker**: Auto-registered via `vite-plugin-pwa`
- **Manifest**: Generated with app name, theme colors, and icons
- **Icons**: 192x192 and 512x512 PNG required in `public/`
- **Theme Color**: `#0F1117` (dark surface)

---

## Development Notes

### Triangle Explorer Coordinate System
- Mathematical coordinates: Origin at bottom-left, Y increases upward
- SVG coordinates: Origin at top-left, Y increases downward
- Helper functions `toSVGX()` and `toSVGY()` handle the conversion

### Calculator Guard Logic
- Tests if `sin(30) ≈ 0.5` (correct degrees mode)
- Catches `sin(30) ≈ -0.988` (radians mode error)
- Must pass before accessing calculation-heavy content

### Streak Calculation
- Uses `date-fns` for date comparison
- Increments streak if last active date was yesterday
- Resets streak if gap is more than one day
- No change if already active today

---

## Security Considerations

- All user progress stored locally in browser (`localStorage`)
- No backend or user authentication required
- No sensitive data transmitted
- XSS protection via React's built-in escaping
- i18next interpolation disabled (`escapeValue: false`) as React handles escaping

---

## Future Development Areas

Based on the PRD and codebase structure:

1. **Review System**: `/review` route implementation for spaced repetition
2. **Problem Sets**: Populate `src/data/problems/` with question banks
3. **Scenario Images**: Add real-world scenario images to `src/data/scenarios/`
4. **Additional Modules**: Expand curriculum in JSON files
5. **Animations**: More Framer Motion transitions for engagement
6. **Offline Support**: PWA service worker caching strategies

---

## File References

| File | Purpose |
|------|---------|
| `trigonometry_app_PRD.md` | Full Product Requirements Document |
| `vite.config.ts` | Build configuration, PWA settings |
| `src/store/progressStore.ts` | Learning progress and SM-2 algorithm |
| `src/i18n.ts` | Translation configuration |
| `src/data/modules/*.json` | Curriculum content |
