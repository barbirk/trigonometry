# TrigPath — Product Requirements Document & Implementation Plan
**Trigonometry Learning Web Application for Secondary Students**
Version 1.0 | April 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [User Persona](#4-user-persona)
5. [Pedagogical Framework](#5-pedagogical-framework)
6. [Product Overview & Feature Set](#6-product-overview--feature-set)
7. [Information Architecture](#7-information-architecture)
8. [Detailed Feature Requirements](#8-detailed-feature-requirements)
9. [UI/UX Design Requirements](#9-uiux-design-requirements)
10. [Technical Architecture](#10-technical-architecture)
11. [Implementation Plan](#11-implementation-plan)
12. [Testing & Quality Assurance](#12-testing--quality-assurance)
13. [Risks & Mitigations](#13-risks--mitigations)
14. [Appendix](#14-appendix)

---

## 1. Executive Summary

**TrigPath** is a self-paced, interactive web application designed to teach trigonometry on triangles to 16-year-old learners. It is structured around a proven four-phase pedagogical framework (Concrete → Numerical → Symbolic → Applied) and leverages dynamic visualizations, spaced repetition, gamified progress tracking, and a real-world problem-first approach to build both procedural fluency and deep conceptual understanding.

The application is a single-user tool, operable entirely in the browser with no backend required in its MVP state, and is designed to be completed progressively over 6–8 weeks of self-study (approximately 20–30 hours of guided learning).

---

## 2. Problem Statement

Trigonometry is one of the most feared and misunderstood topics in secondary mathematics. Students typically encounter three compounding difficulties:

- **Rote memorization without intuition**: Students memorize SOH-CAH-TOA without understanding *why* ratios are constant, leading to brittle knowledge that fails under novel problem types.
- **Procedural collapse**: Students know formulas but cannot decide *which* one to apply or *where* to start when given a word problem.
- **Context blindness**: Geometry is taught as abstract symbols disconnected from any physical reality, destroying motivation.

Existing tools (Khan Academy, textbooks, YouTube) address pieces of this problem but lack a tightly integrated, adaptive experience that scaffolds a student from zero intuition to full problem-solving independence.

---

## 3. Goals & Success Metrics

### Primary Goals

| Goal | Metric | Target |
|---|---|---|
| Build conceptual understanding | Score on post-module concept quizzes | ≥ 80% across all modules |
| Develop problem-solving independence | Can solve unseen word problems without hints | ≥ 75% accuracy |
| Sustain engagement | Session completion rate | ≥ 70% of started sessions completed |
| Ensure knowledge retention | 2-week delayed recall quiz score | ≥ 70% |
| Reduce math anxiety | Self-reported confidence rating (1–5) | Increase of ≥ 1.5 points from start to finish |

### Secondary Goals

- Learner can explain a concept back in their own words (teach-back prompts scored by AI)
- Zero reliance on calculator mode errors by the end of Module 2
- 100% of sessions start with drawing a labeled diagram

---

## 4. User Persona

**Name**: Alex, 16 years old
**Context**: High school sophomore or junior; has covered basic algebra and geometry. May have been introduced to trig briefly in class but lacks confidence.
**Motivations**: Wants to actually understand math, not just pass tests. Responds well to real-world connections and hates being talked down to.
**Pain Points**: Gets lost when formulas arrive before intuition. Loses motivation when exercises feel repetitive or pointless. Easily intimidated by long walls of text.
**Device**: Primarily laptop (school or personal), occasionally tablet. Rarely mobile for focused study sessions.
**Learning Style**: Learns well through visual interaction, trial-and-error, and immediate feedback. Benefits from short bursts (15–25 min sessions) over marathon study.

---

## 5. Pedagogical Framework

Every learning unit in TrigPath follows the **C→N→S→A Learning Loop**, reinforced by proven cognitive science strategies.

### 5.1 The Four-Phase Learning Loop

Each concept is introduced and practiced through four sequential phases:

```
CONCRETE ──► NUMERICAL ──► SYMBOLIC ──► APPLIED
  Draw it      Calculate it   Formula it   Real problem
  Measure it   By hand        Name it      From scratch
  Explore it   Simple nums    Use it       With diagram
```

**Concrete**: The student sees and manipulates a dynamic triangle. They observe what changes and what stays the same. No formulas yet.

**Numerical**: The student calculates ratios using simple triangles (3-4-5, 5-12-13). They do it by hand (or with on-screen division), building feel for the numbers before the calculator appears.

**Symbolic**: The formula is introduced as a *summary* of what they have already discovered, not as a new fact to memorize.

**Applied**: A real-world scenario (building, ramp, shadow, GPS, satellite) is presented. The student must draw a diagram, label it, choose the correct ratio, solve, and interpret the answer.

### 5.2 Reinforcement Strategies

| Strategy | Implementation |
|---|---|
| **Spaced Repetition** | Flashcard-style review of past concepts at the start of each session, scheduled via a lightweight SM-2-inspired algorithm |
| **Interleaving** | Problem sets always mix sin, cos, and tan; student cannot go on autopilot |
| **Error Analysis** | "Spot the Mistake" exercises present worked solutions with a deliberate error; student must identify and correct it |
| **Teach-Back** | After each module, student must write or record a plain-English explanation; AI grades for correctness of reasoning |
| **Low-Stakes Quizzing** | Every session opens with a 3-question warm-up from previous material |
| **Diagram-First Enforcement** | Every problem type requires the student to label a diagram before an input field unlocks |

### 5.3 Anxiety Reduction Tactics

- Progress is always visible and framed as additive (you gain, you never lose)
- Mistakes are framed as "not yet" not "wrong"
- Every module starts with a hook question, not a formula
- Worked examples are the first thing shown, not the last

---

## 6. Product Overview & Feature Set

### 6.1 Module Structure

TrigPath is organized into **6 modules** that map to the pedagogical phases:

| Module | Title | Phase | Est. Time |
|---|---|---|---|
| 0 | The Why of Trig | Hook / Motivation | 30 min |
| 1 | Right Triangle Foundations | Concrete + Numerical | 3–4 hrs |
| 2 | SOH-CAH-TOA | Symbolic | 3–4 hrs |
| 3 | Inverse Trig & Angle Finding | Symbolic + Applied | 3 hrs |
| 4 | Real-World Applied Problems | Applied | 4–5 hrs |
| 5 | Beyond Right Triangles (Law of Sines & Cosines) | Extension | 4–5 hrs |

Each module contains: Lesson pages, Interactive Explorer, Guided Examples, Practice Problems, Error Analysis exercises, a Teach-Back prompt, and a Module Quiz.

### 6.2 Core Features (MVP)

**F01 — Interactive Triangle Explorer**
A live GeoGebra-style canvas where the student drags vertices, observes how side lengths and angles change, and sees ratio calculations update in real time. Built natively in the app using SVG + JavaScript.

**F02 — Diagram-First Problem Interface**
Every problem presents a blank triangle. The student must click/tap to label the Hypotenuse, Opposite, and Adjacent sides relative to the highlighted angle before any input field becomes active.

**F03 — Step-by-Step Solver**
Guided problem-solving flow: Draw → Label → Choose Ratio → Set Up Equation → Solve → Interpret. Each step must be completed before the next unlocks. Hints available at each step (with hint usage tracked).

**F04 — Spaced Repetition Review Deck**
An SM-2-inspired flashcard system that surfaces past concepts at optimal review intervals. Runs for 5 minutes at the start of each session.

**F05 — Error Analysis Exercises**
Pre-written worked solutions with one deliberate mistake embedded. Student must identify the error, explain what went wrong, and redo the step correctly.

**F06 — Teach-Back Prompt**
At the end of each module, a free-text (or optional voice) prompt asks the student to explain the concept in their own words. The app uses an AI call to score the explanation for conceptual completeness.

**F07 — Progress Dashboard**
Visual progress tracker showing: modules completed, concepts mastered, streak days, time studied, accuracy per concept, and upcoming review cards.

**F08 — Calculator Mode Guard**
Before any problem involving inverse trig, a required one-time check forces the student to verify their calculator/app is in Degree mode. Reinforced with a persistent banner during all angle-finding problems.

**F09 — Real-World Scenario Library**
A curated set of 30+ applied problems with authentic contexts (architecture, navigation, sports, astronomy, engineering). Each includes a photograph or illustration as the problem prompt.

**F10 — Session Warm-Up Quiz**
Automatically generated 3-question quiz at session start, pulling from completed content according to spaced repetition schedule.

### 6.3 Stretch Features (Post-MVP)

- **F11 — Peer Challenge Mode**: Generate a problem and share via link for a friend to solve
- **F12 — Voice Explain Mode**: Record a teach-back, transcribed and scored by AI
- **F13 — Parent/Teacher View**: Read-only dashboard showing progress and time-on-task
- **F14 — Printable Practice Sheets**: Auto-generated PDF of mixed practice problems
- **F15 — Dark Mode**: Full dark theme option

---

## 7. Information Architecture

```
TrigPath
│
├── Home / Dashboard
│   ├── Today's Warm-Up Quiz (3 questions)
│   ├── Continue Learning (resume last position)
│   ├── Progress Overview
│   └── Review Deck (Spaced Repetition)
│
├── Modules (0–5)
│   ├── Module Overview Page
│   │   ├── Learning Objectives
│   │   ├── Real-World Hook (video/image + question)
│   │   └── Estimated Time
│   │
│   ├── Lessons (per module: 3–6 lessons)
│   │   ├── Reading Content (short, visual-first)
│   │   ├── Interactive Explorer (F01)
│   │   └── "Check Your Understanding" (2–3 inline questions)
│   │
│   ├── Guided Examples (2–3 per module)
│   │   └── Step-by-Step Solver (F03)
│   │
│   ├── Practice Problems (8–15 per module)
│   │   ├── Diagram-First Interface (F02)
│   │   └── Hint System
│   │
│   ├── Error Analysis (2 per module) (F05)
│   │
│   ├── Real-World Scenario (1–2 per module) (F09)
│   │
│   ├── Teach-Back Prompt (F06)
│   │
│   └── Module Quiz (10 questions, scored)
│
├── Review Deck (F04)
│
├── Progress & Stats (F07)
│
└── Settings
    ├── Calculator Mode Reminder Toggle
    ├── Session Length Preference
    └── Notifications
```

---

## 8. Detailed Feature Requirements

### F01 — Interactive Triangle Explorer

**Description**: An SVG-based interactive canvas where the student can manipulate a right triangle and observe how trigonometric ratios behave.

**Functional Requirements**:
- FR01.1: Display a right triangle with three draggable vertices; one vertex fixed as the right angle
- FR01.2: As vertices are dragged, update in real time: all three side lengths, all three angles, and the sin/cos/tan values for the selected reference angle
- FR01.3: Allow the user to "pin" one angle and observe the ratio remaining constant as the triangle scales
- FR01.4: Display a visual label overlay: highlight which side is Hypotenuse, Opposite, Adjacent when a reference angle is selected
- FR01.5: Include a "Freeze & Compare" mode where two triangles are shown side-by-side (same angles, different sizes) to build intuition for why ratios are constant
- FR01.6: Angle input field: type a specific angle and the triangle auto-adjusts
- FR01.7: "3-4-5 Mode" button instantly sets triangle to the classic Pythagorean triple

**Non-Functional Requirements**:
- Render at 60fps on any modern laptop browser
- Fully keyboard accessible (tab through vertices, arrow keys to adjust)
- Mobile-touch compatible (pinch-drag on tablet)

### F02 — Diagram-First Problem Interface

**Description**: Enforces the pedagogical habit of drawing and labeling before solving.

**Functional Requirements**:
- FR02.1: Every problem shows a triangle image with three unlabeled sides
- FR02.2: Student must drag-and-drop labels (H, O, A) onto the correct sides before input fields appear
- FR02.3: A highlighted angle marker indicates which angle is the reference angle
- FR02.4: Incorrect labeling shows a gentle error: "Check which side is across from the angle"
- FR02.5: Once correctly labeled, input fields unlock with a smooth animation
- FR02.6: A "Why does this matter?" tooltip explains the labeling requirement the first three times it appears, then disappears

### F03 — Step-by-Step Solver

**Description**: Scaffolded problem-solving flow that mirrors expert mathematical thinking.

**Steps**:
1. Draw / observe the diagram (F02)
2. Label sides (F02)
3. Identify known and unknown values (checkboxes)
4. Choose which ratio to use (sin / cos / tan — presented as three buttons)
5. Set up the equation (fill-in-the-blank algebraic expression)
6. Solve (enter numerical answer)
7. Interpret (multiple choice: what does this number mean in context?)

**Functional Requirements**:
- FR03.1: Each step is visually distinct and numbered; future steps are locked and grayed out
- FR03.2: Wrong answers at any step show targeted feedback tied to the specific mistake type (e.g., "You chose cos but your unknown is opposite the angle — which ratio uses Opposite?")
- FR03.3: Up to 3 hints available per step; hint usage is logged but does not penalize the student
- FR03.4: "Show me how" button reveals the full worked solution after 2 failed attempts
- FR03.5: Students can navigate backwards to review previous steps

### F04 — Spaced Repetition Review Deck

**Description**: Lightweight flashcard system to combat forgetting.

**Algorithm**: SM-2-inspired. Each card has an ease factor and interval. Correct answers increase the interval; incorrect answers reset to 1 day. The student rates recall difficulty: Easy / Medium / Hard after each card.

**Functional Requirements**:
- FR04.1: Cards cover: ratio definitions, triangle labeling, identifying which formula to use, inverse trig interpretation, and key vocabulary
- FR04.2: At session start, the app shows how many cards are due for review
- FR04.3: Review session is capped at 5 minutes or 10 cards (whichever comes first) to avoid review fatigue
- FR04.4: Card types include: text-answer, multiple choice, and diagram-label
- FR04.5: Progress persists in localStorage
- FR04.6: Student can add custom cards from any lesson page ("Save as Flashcard" button)

### F05 — Error Analysis Exercises

**Description**: "Spot the Mistake" problems that develop critical mathematical thinking.

**Format**: A fully worked-out problem is displayed step-by-step. One step contains a deliberate error (wrong ratio chosen, adjacent/opposite confused, wrong inverse used, calculator in radian mode, etc.). The student must identify which step is wrong and write a one-sentence correction.

**Functional Requirements**:
- FR05.1: Steps are numbered and clickable; clicking highlights that step
- FR05.2: Student selects the incorrect step from a numbered list
- FR05.3: Student types a brief explanation of the error
- FR05.4: AI scores the explanation (binary: correct reasoning identified / not)
- FR05.5: Error library contains at minimum 2 exercises per module (12 total for MVP)
- FR05.6: Errors intentionally cover the most common real mistakes documented in pedagogical research

### F06 — Teach-Back Prompt

**Description**: Forces retrieval and consolidation at the end of each module.

**Functional Requirements**:
- FR06.1: Prompt appears as the final activity before the module quiz
- FR06.2: Prompt is specific (e.g., "Explain to a friend who has never heard of sin, cos, or tan: what do these ratios actually tell you? Use a specific triangle in your explanation.")
- FR06.3: Student types a free-text explanation (minimum 50 words enforced)
- FR06.4: App sends explanation to Claude API with a scoring rubric; returns a score (0–3) and specific, encouraging feedback
- FR06.5: Score of 2 or above required to unlock module quiz; below 2, the student is given feedback and invited to revise once

### F07 — Progress Dashboard

**Description**: Motivating, at-a-glance view of the learner's journey.

**Sections**:
- **Journey Map**: Visual path through the 6 modules, showing completion status
- **Streak Counter**: Days in a row with a completed session
- **Mastery Heatmap**: Grid of all concepts, colored by confidence level (from quiz performance)
- **Time Studied**: Total and per-week
- **Accuracy Chart**: Per-concept accuracy over time (line chart)
- **Upcoming Reviews**: Cards due in the next 7 days (from F04)
- **Milestone Badges**: Unlockable achievements (e.g., "Diagram Master", "3-4-5 Pro", "Error Hunter")

### F08 — Calculator Mode Guard

**Functional Requirements**:
- FR08.1: On first encounter with inverse trig problems, a mandatory modal explains degrees vs. radians with a visual
- FR08.2: Student must click "I have set my calculator to Degree mode" to proceed
- FR08.3: A persistent yellow banner "⚠️ Degree Mode Active?" appears on all angle-finding problems thereafter
- FR08.4: A quick-check problem is embedded: "What is sin(30°)? If your calculator says 0.5, you're in Degree mode. ✓"

### F09 — Real-World Scenario Library

**Scenarios by Category**:

| Category | Example Scenarios |
|---|---|
| Architecture | Find the height of a building from shadow length and sun angle |
| Navigation | Find how far a plane has traveled horizontally at a given climb angle |
| Sports | Find the launch angle for a basketball free throw |
| Engineering | Calculate the length of a ramp given rise and angle |
| Astronomy | Find the distance to a star using parallax angle |
| Emergency | Find the length of a fire truck ladder needed to reach a window |

Each scenario includes: a real photograph or illustration, a narrative setup, embedded diagram, step-by-step solver (F03), and a real-world interpretation question.

---

## 9. UI/UX Design Requirements

### 9.1 Visual Design Direction

**Theme**: Scientific journal meets modern learning tool. Clean, precision-focused, with warmth.

**Color Palette**:
```
Primary Background:  #0F1117  (deep graphite)
Surface:             #1C1F2E  (navy-dark)
Accent Primary:      #4DFFA4  (electric mint — for active elements, success)
Accent Secondary:    #FF6B6B  (coral — for errors, warnings)
Accent Tertiary:     #FFD166  (amber — for hints, in-progress)
Text Primary:        #F0F4FF  (off-white)
Text Secondary:      #8892A4  (slate)
Grid Lines:          #2A2D3E  (subtle)
```

**Typography**:
```
Display / Headings:  "Space Mono" (technical, precise, mathematical feel)
Body / Reading:      "Literata" (warm, readable, designed for long-form learning)
Math / Numbers:      "JetBrains Mono" (monospaced, clear numerals)
```

**Visual Motifs**:
- Subtle graph-paper grid texture on backgrounds (very low opacity)
- Triangle-shaped decorative elements in empty states and loading screens
- Smooth, physics-based animations for interactive elements
- Progress bars use a glowing "energy fill" effect in mint green

### 9.2 Layout Principles

- **Single-column reading flow** for lesson content (max-width: 720px, centered)
- **Two-column split** for problem-solving screens: diagram left, input right
- **Full-width** for the Interactive Triangle Explorer
- Generous whitespace; never more than 3 concepts visible on screen at once
- Mobile breakpoint at 768px: two-column collapses to single column, explorer becomes scrollable

### 9.3 Navigation

- Persistent left sidebar on desktop: module list, progress indicators
- Bottom tab bar on mobile: Home, Modules, Review, Progress
- Breadcrumb trail: Module → Lesson → Activity
- Keyboard shortcut cheat sheet accessible via `?` key

### 9.4 Accessibility

- WCAG 2.1 AA compliant
- All interactive elements keyboard navigable with visible focus rings
- Color-blind safe: no information conveyed by color alone (always paired with icon or text)
- Screen reader labels on all SVG interactive elements
- Minimum tap target: 44×44px
- Reduced-motion mode: replaces all animations with instant transitions

### 9.5 Tone of Voice

- Direct and encouraging, never patronizing
- Error messages: "Not quite — here's a hint:" not "Wrong."
- Success messages: "Exactly right. You just used the same reasoning engineers use every day."
- Hint messages: specific, directed, never just "Try again"

---

## 10. Technical Architecture

### 10.1 Technology Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 18 + Vite | Fast HMR, ecosystem, component reuse |
| Styling | Tailwind CSS + CSS Variables | Utility-first, consistent design tokens |
| State Management | Zustand | Lightweight, no boilerplate |
| Routing | React Router v6 | SPA routing, nested layouts |
| Interactive Canvas | Custom SVG + D3.js | Full control of triangle explorer without GeoGebra dependency |
| Animations | Framer Motion | Physics-based, declarative |
| AI Integration | Anthropic Claude API (claude-sonnet-4) | Teach-back scoring, error analysis |
| Persistence | localStorage (MVP) | Zero-backend, instant setup |
| Math Rendering | KaTeX | Fast, beautiful formula rendering |
| Charts | Recharts | Lightweight, React-native |
| Testing | Vitest + React Testing Library | Co-located with Vite |
| Deployment | Vercel / Netlify | Zero-config static deployment |

### 10.2 Data Models

```typescript
// User Progress
interface UserProgress {
  userId: string;           // generated UUID, stored in localStorage
  startedAt: Date;
  totalTimeMinutes: number;
  currentModule: number;
  currentLesson: number;
  streak: number;
  lastSessionDate: string;  // ISO date
  modules: ModuleProgress[];
  reviewCards: ReviewCard[];
  badges: string[];
}

// Module Progress
interface ModuleProgress {
  moduleId: number;
  status: 'locked' | 'in_progress' | 'completed';
  lessons: LessonProgress[];
  quizScore: number | null;        // 0–100
  teachBackScore: number | null;   // 0–3
  completedAt: Date | null;
}

// Review Card (Spaced Repetition)
interface ReviewCard {
  cardId: string;
  concept: string;
  front: string;
  back: string;
  type: 'text' | 'multiple_choice' | 'diagram';
  easeFactor: number;    // SM-2: starts at 2.5
  interval: number;      // days until next review
  repetitions: number;
  nextReviewDate: string;
  isCustom: boolean;
}

// Problem Attempt
interface ProblemAttempt {
  problemId: string;
  userId: string;
  completedAt: Date;
  hintsUsed: number;
  stepsAttempted: number;
  correct: boolean;
  timeSpentSeconds: number;
}

// Concept Mastery
interface ConceptMastery {
  conceptId: string;
  label: string;
  attemptsTotal: number;
  attemptsCorrect: number;
  lastAttempted: Date;
  confidenceLevel: 'new' | 'learning' | 'reviewing' | 'mastered';
}
```

### 10.3 Component Architecture

```
src/
├── components/
│   ├── explorer/
│   │   ├── TriangleExplorer.tsx      # Main SVG interactive canvas
│   │   ├── TriangleCanvas.tsx        # SVG rendering layer
│   │   ├── RatioDisplay.tsx          # Live sin/cos/tan readout
│   │   └── AngleSelector.tsx         # Reference angle picker
│   │
│   ├── problems/
│   │   ├── DiagramLabeler.tsx        # Drag-and-drop H/O/A labeling
│   │   ├── StepSolver.tsx            # Step-by-step scaffold
│   │   ├── HintSystem.tsx            # Contextual hints
│   │   ├── ErrorAnalysis.tsx         # Spot-the-mistake UI
│   │   └── RealWorldScenario.tsx     # Scenario card with photo
│   │
│   ├── review/
│   │   ├── ReviewDeck.tsx            # Flashcard session manager
│   │   ├── FlashCard.tsx             # Individual card (flip animation)
│   │   └── SM2Engine.ts              # Spaced repetition algorithm
│   │
│   ├── progress/
│   │   ├── Dashboard.tsx             # Main progress view
│   │   ├── JourneyMap.tsx            # Visual module path
│   │   ├── MasteryHeatmap.tsx        # Concept grid
│   │   ├── StreakCounter.tsx         # Streak display
│   │   └── BadgeSystem.tsx           # Achievement display
│   │
│   ├── ai/
│   │   ├── TeachBackPrompt.tsx       # Teach-back input + scoring UI
│   │   └── claudeApi.ts             # API call wrapper
│   │
│   └── shared/
│       ├── MathExpression.tsx        # KaTeX renderer
│       ├── ProgressBar.tsx
│       ├── Modal.tsx
│       ├── Tooltip.tsx
│       └── CalculatorGuard.tsx      # Degree mode warning
│
├── pages/
│   ├── Home.tsx
│   ├── ModuleOverview.tsx
│   ├── Lesson.tsx
│   ├── Practice.tsx
│   ├── Progress.tsx
│   └── Settings.tsx
│
├── store/
│   ├── progressStore.ts              # Zustand — all user progress
│   ├── sessionStore.ts               # Current session state
│   └── reviewStore.ts                # Spaced repetition state
│
├── data/
│   ├── modules/                      # JSON: all module content
│   │   ├── module0.json
│   │   ├── module1.json
│   │   └── ...
│   ├── problems/                     # JSON: all problem definitions
│   ├── scenarios/                    # JSON: real-world scenarios
│   └── reviewCards/                  # JSON: default flashcard set
│
└── utils/
    ├── trigMath.ts                   # Triangle calculation utilities
    ├── sm2.ts                        # SM-2 algorithm
    └── validation.ts                 # Answer checking logic
```

### 10.4 AI Integration (Teach-Back Scoring)

```typescript
// claudeApi.ts
export async function scoreTeachBack(
  concept: string,
  studentExplanation: string,
  rubric: string
): Promise<{ score: number; feedback: string }> {

  const systemPrompt = `
    You are an expert mathematics tutor evaluating a 16-year-old student's
    explanation of a trigonometry concept. Score their explanation 0–3:
    
    0 = Fundamentally wrong or missing the point entirely
    1 = Partially correct but missing key ideas
    2 = Correct with minor gaps or imprecision
    3 = Clear, correct, and demonstrates genuine understanding
    
    Return ONLY valid JSON: { "score": number, "feedback": string }
    Feedback must be specific, encouraging, and under 80 words.
    Address the student directly as "you".
  `;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: `
          Concept being explained: ${concept}
          Scoring rubric: ${rubric}
          Student's explanation: "${studentExplanation}"
        `
      }]
    })
  });

  const data = await response.json();
  const text = data.content[0].text;
  return JSON.parse(text);
}
```

### 10.5 Content Data Format

```json
// Example: module1.json (excerpt)
{
  "moduleId": 1,
  "title": "Right Triangle Foundations",
  "hook": {
    "question": "A rescue helicopter spots a stranded hiker. The pilot knows the angle of depression is 32° and the helicopter is 800m above the ground. How far away is the hiker? You'll know how to find this in 30 minutes.",
    "imageUrl": "/scenarios/helicopter.jpg"
  },
  "lessons": [
    {
      "lessonId": "1-1",
      "title": "The Parts of a Right Triangle",
      "type": "interactive",
      "explorerConfig": {
        "mode": "label_exploration",
        "showRatios": false,
        "highlightAngle": true
      },
      "content": [
        {
          "type": "text",
          "body": "Before we calculate anything, we need to speak the language of triangles..."
        },
        {
          "type": "explorer",
          "prompt": "Drag the reference angle marker to each corner. Watch how the labels H, O, A change. What do you notice?"
        },
        {
          "type": "check",
          "question": "If the reference angle is at the bottom-left, which side is the Hypotenuse?",
          "options": ["The longest side", "The side across from the angle", "The side next to the angle"],
          "correct": 0,
          "explanation": "The Hypotenuse is always the longest side — opposite the right angle, not the reference angle."
        }
      ]
    }
  ]
}
```

---

## 11. Implementation Plan

### Phase 0 — Foundation (Week 1–2)

**Goal**: Project scaffolding, design system, and data layer ready.

| Task | Owner | Priority | Est. Hours |
|---|---|---|---|
| Initialize Vite + React + TypeScript project | Dev | P0 | 2 |
| Set up Tailwind CSS with custom design tokens | Dev | P0 | 3 |
| Implement Zustand stores (progress, session, review) | Dev | P0 | 4 |
| Build localStorage persistence layer with migration support | Dev | P0 | 3 |
| Create routing structure (React Router v6) | Dev | P0 | 2 |
| Design and implement base Layout components (sidebar, header, breadcrumb) | Dev/Design | P0 | 5 |
| Set up KaTeX integration and MathExpression component | Dev | P1 | 2 |
| Author all module content JSON files (modules 0–5) | Content | P0 | 20 |
| Author all problem definitions (80+ problems) | Content | P0 | 15 |
| Author default flashcard set (50 cards) | Content | P1 | 6 |
| Set up Vitest + RTL testing infrastructure | Dev | P1 | 2 |

**Milestone**: App boots, routing works, design system renders correctly, all content data exists in JSON.

---

### Phase 1 — Core Interactive Engine (Week 3–5)

**Goal**: Triangle Explorer and Diagram-First Interface working end-to-end.

| Task | Owner | Priority | Est. Hours |
|---|---|---|---|
| Build TriangleCanvas SVG component (static render) | Dev | P0 | 6 |
| Add draggable vertices to TriangleCanvas | Dev | P0 | 8 |
| Implement real-time side length + angle calculation (trigMath.ts) | Dev | P0 | 5 |
| Build RatioDisplay component (live sin/cos/tan readout) | Dev | P0 | 4 |
| Add reference angle selector with H/O/A label overlay | Dev | P0 | 5 |
| Implement "Freeze & Compare" two-triangle mode | Dev | P1 | 6 |
| Build DiagramLabeler drag-and-drop component | Dev | P0 | 8 |
| Implement label validation logic | Dev | P0 | 3 |
| Build StepSolver multi-step scaffold | Dev | P0 | 10 |
| Implement per-step feedback and hint system | Dev | P0 | 6 |
| Add "Show me how" worked solution reveal | Dev | P1 | 4 |
| Write unit tests for trigMath.ts | Dev | P0 | 4 |

**Milestone**: Student can manipulate a triangle and see ratios update; can complete a full step-by-step problem from diagram labeling to final answer.

---

### Phase 2 — Learning Loop & Content (Week 6–8)

**Goal**: All 6 modules playable start-to-finish.

| Task | Owner | Priority | Est. Hours |
|---|---|---|---|
| Build Lesson page renderer (reads from JSON, renders content blocks) | Dev | P0 | 8 |
| Implement inline "Check Your Understanding" quiz component | Dev | P0 | 4 |
| Build ErrorAnalysis (Spot the Mistake) component | Dev | P0 | 6 |
| Build RealWorldScenario card component | Dev | P0 | 5 |
| Integrate TeachBackPrompt + Claude API scoring | Dev | P0 | 8 |
| Build ModuleQuiz (10-question timed quiz, scored) | Dev | P0 | 7 |
| Implement module lock/unlock logic based on quiz score | Dev | P0 | 3 |
| Add CalculatorGuard modal and persistent banner | Dev | P1 | 3 |
| Build Module Overview page with hook display | Dev | P1 | 4 |
| Playtest all 6 modules end-to-end | QA | P0 | 10 |
| Fix content errors and UX issues from playtesting | Dev/Content | P0 | 8 |

**Milestone**: A user can start at Module 0 and complete all 6 modules including teach-back scoring and module quizzes.

---

### Phase 3 — Progress, Retention & Polish (Week 9–10)

**Goal**: Spaced repetition, dashboard, animations, and accessibility complete.

| Task | Owner | Priority | Est. Hours |
|---|---|---|---|
| Implement SM-2 algorithm (sm2.ts) | Dev | P0 | 4 |
| Build ReviewDeck session manager | Dev | P0 | 6 |
| Build FlashCard component with flip animation | Dev | P0 | 4 |
| Implement session warm-up quiz (auto-generated from due cards) | Dev | P0 | 5 |
| Build Dashboard page (Journey Map, Streak, Heatmap) | Dev | P0 | 10 |
| Implement MasteryHeatmap with Recharts | Dev | P1 | 5 |
| Build BadgeSystem (define 12 badges, implement unlock logic) | Dev | P2 | 6 |
| Add Framer Motion animations throughout app | Dev | P1 | 8 |
| Conduct WCAG 2.1 AA audit | Dev | P0 | 5 |
| Fix accessibility issues | Dev | P0 | 6 |
| Mobile responsiveness pass (all screens ≤768px) | Dev | P1 | 8 |
| Performance optimization (bundle size, lazy loading) | Dev | P1 | 5 |

**Milestone**: Full app feature-complete, accessible, animated, and performant.

---

### Phase 4 — Testing & Launch (Week 11–12)

**Goal**: QA complete, user testing done, deployed to production.

| Task | Owner | Priority | Est. Hours |
|---|---|---|---|
| Write component tests for all interactive features | Dev | P0 | 12 |
| End-to-end testing (Playwright) for critical paths | Dev | P0 | 8 |
| User testing session with 2–3 actual 16-year-olds | Product | P0 | 6 |
| Incorporate user testing feedback | Dev | P0 | 10 |
| Set up Vercel deployment pipeline | Dev | P0 | 2 |
| Configure environment variables (API key proxy) | Dev | P0 | 2 |
| Final content review (all 6 modules, all problems) | Content | P0 | 8 |
| Write user onboarding guide (in-app tooltip tour) | Dev/Content | P1 | 5 |
| Launch | All | P0 | — |

---

### Summary Timeline

```
Week 01–02   ████████░░░░░░░░░░░░░░░░  Phase 0: Foundation
Week 03–05   ░░░░████████████░░░░░░░░  Phase 1: Interactive Engine
Week 06–08   ░░░░░░░░████████████░░░░  Phase 2: Learning Loop
Week 09–10   ░░░░░░░░░░░░████████░░░░  Phase 3: Progress & Polish
Week 11–12   ░░░░░░░░░░░░░░░░████████  Phase 4: Testing & Launch
```

**Total Estimated Development Hours: ~280 hours (solo developer + content author)**
**Recommended Team: 1 developer, 1 math content specialist (can be same person)**

---

## 12. Testing & Quality Assurance

### 12.1 Unit Testing (Vitest)

- All trigonometric calculation functions in `trigMath.ts`
- SM-2 algorithm edge cases in `sm2.ts`
- Answer validation logic (floating-point tolerance: ±0.01)
- Progress store state transitions
- Review card scheduling logic

### 12.2 Component Testing (React Testing Library)

- DiagramLabeler: correct labeling unlocks fields; incorrect shows feedback
- StepSolver: steps lock/unlock correctly; hints decrement; solution reveal
- FlashCard: flip animation triggers; SM-2 scores update state
- TeachBackPrompt: min word count enforced; API response rendered correctly
- CalculatorGuard: modal appears on first inverse trig; banner persists

### 12.3 End-to-End Testing (Playwright)

Critical user paths:
1. New user → completes Module 0 → Module 1 unlocks
2. Complete a full step-by-step problem with 0 hints, with 3 hints, with "show me"
3. Complete teach-back → score ≥ 2 → quiz unlocks; score < 2 → revision required
4. Review deck session: 10 cards, all paths (Easy / Medium / Hard ratings)
5. Progress persists across browser refresh (localStorage)

### 12.4 User Testing Protocol

**Participants**: 2–3 students aged 15–17 with beginner trig knowledge.

**Session structure (60 min)**:
- 5 min: Introduction and context (no training on the app)
- 40 min: Think-aloud session through Module 0 and the first two lessons of Module 1
- 10 min: Retrospective interview
- 5 min: Confidence rating survey (pre/post)

**Key observations to capture**:
- Where does the student get stuck without prompting?
- Does the diagram-first flow feel natural or frustrating?
- Is error feedback helpful or confusing?
- What do they say out loud when they see the triangle explorer?

### 12.5 Mathematical Accuracy Review

All problems, solutions, and worked examples must be reviewed by a mathematics educator or verified against an authoritative secondary curriculum source (e.g., UK A-Level Maths syllabus, US Common Core HSG-SRT). Any AI-generated content must be independently verified.

---

## 13. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Claude API latency ruins teach-back UX | Medium | High | Show streaming response; add loading skeleton; cache previous results |
| localStorage quota exceeded | Low | Medium | Compress stored data; prune old attempt logs after 90 days |
| SVG triangle explorer is slow on low-spec devices | Medium | High | Profile early; provide a "simplified mode" with static images as fallback |
| Content errors in math problems | Medium | High | Dual-review process; student "Report an error" button feeds to a log |
| Student abandons before completing a module | High | High | Short session targets (15 min); save progress at every step; email/notification nudge (post-MVP) |
| API key exposure in client-side code | High | High | Route all API calls through a simple serverless proxy (Vercel Edge Function); never expose key in bundle |
| Over-reliance on hints removes productive struggle | Medium | Medium | Track hint usage; after 3 hints on same problem type, suggest revisiting the lesson rather than giving answer |

---

## 14. Appendix

### A. Milestone Badge Definitions

| Badge | Unlock Condition |
|---|---|
| **First Triangle** | Complete the triangle explorer for the first time |
| **3-4-5 Pro** | Correctly identify all three sides of a 3-4-5 triangle 5 times |
| **Diagram Master** | Label 25 diagrams correctly without any errors |
| **SOH-CAH-TOA** | Score 100% on the Module 2 quiz |
| **Error Hunter** | Complete all Error Analysis exercises |
| **Degree Mode** | Trigger and correctly resolve the calculator guard |
| **Week Streak** | Study 7 days in a row |
| **Teach-Back Pro** | Score 3/3 on any Teach-Back prompt |
| **Problem Solver** | Complete 50 practice problems |
| **Real World Ready** | Complete all Real-World Scenarios |
| **Law Abider** | Complete Module 5 (Law of Sines & Cosines) |
| **Trig Master** | Complete all 6 modules with ≥ 80% quiz average |

### B. Recommended Problem Type Distribution (Per Module)

| Problem Type | % of Practice Set |
|---|---|
| Find a missing side (given angle + side) | 35% |
| Find a missing angle (inverse trig) | 25% |
| Multi-step problems | 20% |
| Real-world application | 15% |
| Error analysis | 5% |

### C. Flashcard Concept Coverage

Core concepts to cover in the default flashcard deck:

- Hypotenuse, Opposite, Adjacent definitions (relative to reference angle)
- sin(θ) = O/H definition and visual
- cos(θ) = A/H definition and visual
- tan(θ) = O/A definition and visual
- When to use sin vs cos vs tan (decision tree)
- Inverse trig notation: sin⁻¹, cos⁻¹, tan⁻¹
- Special triangle values: sin(30°), cos(45°), sin(90°)
- Degree vs radian mode
- Law of Sines formula and when to use it
- Law of Cosines formula and when to use it
- The ambiguous case (SSA)
- Reading an angle of elevation / depression from a diagram

### D. Content Writing Guidelines

When authoring lesson content, writers must follow these rules:

1. **Maximum 120 words per content block** before a break or interaction
2. **Every concept introduction must start with an observation** ("Look at what happens when...") not a definition
3. **All examples must use whole numbers or simple fractions** in the Concrete and Numerical phases
4. **Diagrams accompany every formula**
5. **No passive voice in instructions** ("Drag the vertex" not "The vertex can be dragged")
6. **Worked examples show reasoning, not just steps** (explain why each choice is made)

---

*TrigPath PRD v1.0 — Built on the C→N→S→A Framework*
*For questions about this document, refer to the Pedagogical Framework (Section 5) for learning decisions and the Technical Architecture (Section 10) for implementation decisions.*
