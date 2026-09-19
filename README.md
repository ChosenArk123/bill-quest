# Bill Quest

> **An interactive, client-side AP Government & Politics simulation of the legislative process.**  
> Walk through pixel-art Capitol spaces, negotiate with institutional actors, manage the scarce congressional calendar, and navigate the constitutional hurdles required to turn an introduced bill into public law.

---

## Overview

**Bill Quest** puts high-school AP U.S. Government and Politics students in the shoes of legislative sponsors guiding a policy proposal through Congress and the Executive Branch. Rather than treating lawmaking as a linear textbook chart, Bill Quest models the strategic friction, institutional veto points, and constitutional mechanics of American government.

As students make decisions in committee markups, special rules debates, Senate filibusters, and amendment exchanges, they experience firsthand how competing factions (Federalist 10) and checks and balances (Federalist 51) alter statutory language.

---

## Key Features

### 🏛️ 7 Living Pixel-Art Chambers
Explore handcrafted, responsive pixel-art environments rendered with crisp high-DPI canvas scaling and neoclassical architectural details:
1. **Capitol Corridor** — Central hallway featuring neoclassical fluted columns, drafting desks, referral clerks, and chamber entrance portals.
2. **Committee Room** — Energy & Commerce committee room with wooden dais, markup witness tables, and gavel podium.
3. **House Floor** — The House of Representatives chamber with speaker rostrum, party desks, and legislative voting galleries.
4. **Senate Chamber** — The United States Senate with marble columns, senior desks, and podiums for unanimous consent and filibusters.
5. **Agreement Room** — Bicameral meeting room for resolving House and Senate text differences through amendment exchange.
6. **Executive Suite** — Oval Office setting with the Resolute Desk, presidential fireplace, and presidential presentment.
7. **Archival Records Hall** — Capitol archives for bill enrollment, comparison tables, failure autopsies, and analytical reflection.

### 📜 Dynamic 6-Provision Bill Builder
Draft legislation from **6 distinct policy provisions** across 3 policy levers, yielding **$\binom{6}{3} = 20$ unique starting bills** and **60 priority states**:
- **Accessibility standard** — Universal multimodal alerts vs. Flexible media standards.
- **Federal grant funding** — Direct infrastructure grants vs. Matching formula aid.
- **Compliance deadline** — Strict 18-month timeline vs. Phased 36-month transition.
- **Hardship waiver** — Bounded FCC review process vs. Broad regional exemptions.
- **State preemption standard** — National regulatory uniformity (Article VI Supremacy Clause) vs. Preserving state police powers (Tenth Amendment).
- **FCC enforcement penalties** — Mandatory civil fines vs. Warning-first compliance assistance.

### ⚖️ Procedural Realism & Constitutional Alignment
- **Madisonian Factions & Checks (Fed 10 & Fed 51)** — Competing interest groups and regional constituencies force policy concessions.
- **Committee Referral & Markup** — Chair scheduling power, hearing debates, and germane amendments.
- **House Rules Committee** — Structured floor rules determining amendment access and debate time.
- **Senate Cloture (Rule XXII)** — Unanimous consent agreements vs. filibusters requiring a 60-vote three-fifths supermajority to limit debate.
- **Bicameral Concurrence (Article I, §§ 1 & 7)** — Both chambers must pass identical statutory text before enrollment; differences are resolved through amendment exchanges.
- **Presidential Presentment & Override** — 10-day signing window, regular veto, and the two-thirds bicameral override threshold (290 House votes, 67 Senate votes).
- **Session Ticks & The Legislative Calendar** — 18-tick calendar simulating the two-year congressional term under Article I and the 20th Amendment; bills not passed before *sine die* adjournment die and must be reintroduced.
- **Animated Roll Calls & Stage Branding** — Visual voting ceremonies displaying majority/supermajority thresholds, yeas, and nays.

### 🎓 Educational Tools & Scaffolding
- **Constitutional Evidence Shelf** — Built-in primary source dossier linking game mechanics directly to the U.S. Constitution (Article I, Article VI, Tenth Amendment, Twentieth Amendment), *Federalist No. 10*, *Federalist No. 51*, and House/Senate procedural rules.
- **AP Gov Glossary** — Integrated definitions for essential vocabulary (cloture, discharge petition, markup, presentment, sine die, unanimous consent, rider, etc.).
- **Bill Diff & Version Tracker** — Visual side-by-side comparison tracking how text shifted between introduction, House passage, Senate passage, and final enrollment.
- **Failure Autopsy & Checkpoint Retry** — Instructive post-mortems explaining exactly which institution killed the bill and why, with non-punitive rewinds.
- **Analytical Claim Builder** — Scaffolding for FRQ-style argumentative synthesis connecting student outcomes to foundational AP Gov concepts.

---

## Quick Start / How to Play

### Option 1: Double-Click Launcher (macOS)
Double-click **`Play_Game.command`** in the project folder.  
It automatically starts a lightweight local server and opens Bill Quest in your default browser.

### Option 2: Run with Node.js
Requirements: Node.js 18 or newer (no `npm install` needed).

```sh
# Run automated test suite (25 tests)
npm test

# Build the production release to dist/
npm run build

# Start preview server and open http://127.0.0.1:4173/
npm run preview
```

### Option 3: Run with Python
```sh
# Build static assets
node scripts/build.mjs

# Serve with Python built-in server
python3 -m http.server 4173 -d dist
```
Then navigate to `http://localhost:4173` in any modern web browser.

---

## Controls & Accessibility

- **Movement**: Arrow keys or `W`, `A`, `S`, `D`.
- **Interact**: Walk up to any person or object and press `E` or `Enter`.
- **Mouse / Touch**:
  - Click anywhere on the floor to pathfind and walk there.
  - Click directly on an NPC, door, or desk to approach and start interaction.
- **Keyboard Navigation**: `Tab` jumps through accessible destination buttons that automatically walk the character along valid collision-free paths.
- **Dialogues & Menus**: Standard keyboard navigation; `Escape` closes active dialogue.
- **Accessibility & Motion**: Fully respects system-level `prefers-reduced-motion` settings, toggleable in the in-game Settings menu.
- **Zero Audio & Timed Panic**: No quick-time events, audio requirements, or dexterity tests.

---

## Technical Architecture

- **Zero Runtime Dependencies**: Written in pure vanilla HTML5, CSS3, and modern ES6 modules. No external frameworks, CDNs, databases, or remote fonts.
- **Offline & Air-Gap Friendly**: Runs completely self-contained. Perfect for school Chromebooks, secure testing environments, and firewalled networks.
- **Canvas 2D Rendering**: Tile-based pixel rendering with `devicePixelRatio` scaling, pathfinding, wall collisions, character facing, and z-ordering.
- **State Architecture**: Deterministic, pure state-machine reducer (`reduce(state, action)`) ensuring clean state transitions, save/restore, and reproducibility.
- **Local Persistence**: Versioned client-side storage via `localStorage` (with graceful fallback to in-memory state if storage is restricted by school policy).

---

## Verification & Automated Testing

The project includes an extensive test suite verifying mechanics, constitutional thresholds, and world pathfinding:

```sh
npm test
```

### Test Coverage Highlights:
- **Comprehensive Route Matrix**: Verified that all 20 provision combinations across all 60 priority states have at least one viable pathway to enactment.
- **Procedural Checkpoints**: Validated that committee markups, Rules Committee obstacles, and reconciliation preserve checkpoints without state corruption.
- **Supermajority Thresholds**: Cloture (60 votes) vs. simple majority passage (51 votes); Presidential veto overrides (2/3 bicameral supermajority).
- **Adjournment & Session Ticks**: Sine die expiration behavior under Article I and the 20th Amendment.
- **Collision & Pathfinding**: Validated that all 7 rooms have clear entrance tiles, unobstructed interactive objects, and navigable doors.
- **Production Asset Integrity**: Verified that `dist/` contains zero external network calls (`fetch`, `XMLHttpRequest`, `WebSocket`, or remote imports).

---

## Deployment to GitHub Pages

The repository includes an automated GitHub Actions deployment workflow in `.github/workflows/pages.yml`:
1. Push this repository to GitHub on branch `main`.
2. In your repository settings, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Every push to `main` automatically runs the test suite, builds `dist/`, and publishes the site to GitHub Pages.

---

## Documentation

- [`AP_Gov_Bill_to_Law_Master_Design_Specification.md`](AP_Gov_Bill_to_Law_Master_Design_Specification.md) — Master educational and structural specification.
- [`docs/IMPLEMENTATION_CONTRACT.md`](docs/IMPLEMENTATION_CONTRACT.md) — Transition tables, numeric forecasts, evidence sources, and fixture specifications.
- [`docs/QA.md`](docs/QA.md) — Verification checklists and test evidence.
- [`docs/INTERACTION_REBUILD.md`](docs/INTERACTION_REBUILD.md) — Exploration grammar and room staging architecture.
- [`docs/GATES.md`](docs/GATES.md) — Gate completion and milestones.

---

## License

Created for educational use in AP U.S. Government and Politics coursework.
