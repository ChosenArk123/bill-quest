# Bill Quest

> **An interactive, browser-based AP Government & Politics simulation built specifically for school Chromebooks.**  
> Walk through pixel-art Capitol spaces, negotiate with institutional actors, manage the scarce congressional calendar, and navigate the constitutional hurdles required to turn an introduced bill into public law.

---

## Classroom Quick Start: How Students Play

Bill Quest is designed as a **zero-install, 100% web-native application** that runs entirely within **Google Chrome on school-managed Chromebooks**.

### 1. For Students in Class
Students simply open the web link in Google Chrome on their Chromebooks:
```
https://chosenark123.github.io/bill-quest/
```
*(Or the static link provided by your teacher on Google Classroom / Canvas / school website).*

- ❌ **No downloads or software installation**
- ❌ **No command line, terminal, or bash access**
- ❌ **No browser extensions or plugins**
- ❌ **No accounts, logins, or student data collection**
- ❌ **No Node.js or Python runtime needed on student devices**

Students click the link and immediately begin drafting their bill.

---

## How to Deploy for Your Class

The game builds into a completely static, standalone directory (`dist/`) requiring no backend server or database:

### Option A: GitHub Pages (Recommended & Automated)
The repository includes an automated GitHub Actions deployment workflow (`.github/workflows/pages.yml`):
1. In your GitHub repository, go to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Every push to the `main` branch automatically runs the test suite, builds the production bundle, and deploys it to your public GitHub Pages URL:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```
4. Share that link with students in Google Classroom.

### Option B: School Web Server or LMS Hosting
You can upload the contents of the `dist/` directory directly to any school static host, Google Sites, or LMS (Canvas, Schoology, Blackboard). `index.html` sits at the root; all asset paths are relative (`./`) so it runs cleanly from any subdirectory (e.g., `/apgov/bill-quest/`).

---

## Built for School-Managed Chromebooks

School Chromebooks operate under strict administrative controls, device constraints, and network filters. Bill Quest was engineered specifically to meet these requirements:

### 🛡️ School Content Filter & Firewall Compliant
- **100% Self-Contained**: The game bundles all fonts, SVGs, styles, and logic locally.
- **Zero External Network Calls**: Uses no external CDNs, third-party libraries, tracking scripts, web sockets, or remote APIs.
- **Whitelist Friendly**: Will never trigger blocks from school web filters such as **GoGuardian**, **Securly**, **Lightspeed Systems**, or **Fortinet**.

### 💻 Chromebook Display & Screen Optimization
- **Native Chromebook Resolutions**: Specifically optimized for standard 11.6" and 13.3" student Chromebook screens (native **1366×768** and **1280×720** viewports).
- **No Overflow**: Layout and responsive canvas dynamically fit within the browser window without clipping text, cutting off buttons, or forcing horizontal scrollbars.

### 🎮 Multi-Modal Chromebook Controls
- **Keyboard**: Full navigation with Arrow keys or `W`, `A`, `S`, `D`. Press `E` or `Enter` to interact; `Space` to toggle; `Esc` to close dialogs.
- **Trackpad**: Full click-to-walk pathfinding and click-to-interact support.
- **Touchscreen**: Seamless tap-to-walk and tap-to-talk support on 2-in-1 convertible Chromebooks in tablet or tent mode.
- **Tab Navigation**: Accessible destination buttons allow students to navigate between rooms and objects using only the `Tab` and `Enter` keys.

### 💾 Safe Handling of School Storage Policies
- Many school-managed Chromebooks clear `localStorage` upon logout or restrict local storage in ephemeral/guest sessions.
- Bill Quest detects restricted storage environments and gracefully falls back to in-memory state—ensuring students can complete their simulation run without error popups or crashes.

### ♿ Classroom-Friendly & IEP / 504 Accommodations
- **Silent Operation**: Requires zero sound or audio cues. Students can play in quiet classrooms, school libraries, or shared computer labs without disturbing others.
- **No Timed Panic**: Lawmaking is deliberative. There are no quick-time events, countdown panics, or dexterity tests.
- **Reduced Motion**: Fully respects system-level motion preferences and includes an in-game **Reduce Motion** toggle in Settings for students with vestibular sensitivities.
- **High-Contrast Typography**: Uses clear Georgia and sans-serif typography on warm paper-toned backgrounds, tested for high legibility under bright classroom fluorescent lighting.

---

## Key Educational Features

### 🏛️ 7 Living Pixel-Art Chambers
Students physically navigate their character through 7 authentic Capitol spaces:
1. **Capitol Corridor** — Neoclassical central hallway with drafting desks and referral clerk.
2. **Committee Room** — Energy & Commerce committee room with witness tables and markup rostrum.
3. **House Floor** — The House of Representatives chamber with speaker rostrum and voting desks.
4. **Senate Chamber** — The United States Senate with podiums for unanimous consent and filibusters.
5. **Agreement Room** — Bicameral room for resolving House and Senate text differences through amendment exchange.
6. **Executive Suite** — Oval Office setting with the Resolute Desk for presidential presentment.
7. **Archival Records Hall** — Capitol archives for bill enrollment, comparison tables, failure autopsies, and analytical reflection.

### 📜 6-Provision Dynamic Bill Builder
Draft legislation from **6 distinct policy provisions** across 3 policy levers, yielding **$\binom{6}{3} = 20$ unique starting bills** and **60 priority states**:
- **Accessibility standard** — Universal multimodal alerts vs. Flexible media standards.
- **Federal grant funding** — Direct infrastructure grants vs. Matching formula aid.
- **Compliance deadline** — Strict 18-month timeline vs. Phased 36-month transition.
- **Hardship waiver** — Bounded FCC review process vs. Broad regional exemptions.
- **State preemption standard** — National regulatory uniformity (Article VI Supremacy Clause) vs. Preserving state police powers (Tenth Amendment).
- **FCC enforcement penalties** — Mandatory civil fines vs. Warning-first compliance assistance.

### ⚖️ Procedural Realism & Constitutional Alignment
- **Madisonian Factions & Checks (*Federalist 10* & *Federalist 51*)** — Competing economic interests and regional factions force statutory compromises.
- **Committee Referral & Markup** — Committee chair scheduling authority, witness testimony, and germane amendments.
- **House Rules Committee** — Structured floor rules determining amendment admissibility and debate limits.
- **Senate Cloture (Rule XXII)** — Unanimous consent agreements vs. extended debate filibusters requiring a 60-vote (three-fifths) supermajority to invoke cloture.
- **Bicameral Concurrence (Article I, §§ 1 & 7)** — Both chambers must pass identical statutory text before presentment; differences are resolved through amendment exchanges.
- **Presidential Presentment & Veto Override** — 10-day signing window, regular veto, and the rigorous two-thirds bicameral override threshold (290 House votes, 67 Senate votes).
- **Session Ticks & The Legislative Calendar** — 18-tick budget simulating the two-year congressional term under Article I and the 20th Amendment; unpassed bills die automatically upon *sine die* adjournment.
- **Animated Roll Calls** — Real-time visual voting ceremonies displaying required majority/supermajority thresholds.

### 🎓 Classroom Evidence & Synthesis
- **Constitutional Evidence Dossier** — In-game primary sources connecting simulation events to the U.S. Constitution (Article I, Article VI, 10th & 20th Amendments), *Federalist No. 10*, *Federalist No. 51*, and congressional procedural rules.
- **AP Gov Glossary** — In-game definitions for key curricular terms (cloture, discharge petition, markup, presentment, sine die, unanimous consent, rider, standing committee).
- **Bill Diff & Version Tracker** — Visual side-by-side comparison tracking how statutory text evolved from introduction to final enrollment.
- **Failure Autopsy & Checkpoint Rewind** — Instructive debrief explaining exactly which institution killed the bill and why, with non-punitive rewinds.
- **Analytical Claim Builder** — Scaffolding for FRQ-style argumentative synthesis connecting student outcomes to foundational AP Gov concepts.

---

## Local Development & Testing (For Teachers / Developers)

On a computer with Node.js 18 or newer installed:

```sh
# Run automated verification test suite (25 tests)
npm test

# Build the production release to dist/
npm run build

# Start local preview server at http://127.0.0.1:4173/
npm run preview
```

### Automated Test Suite Highlights
- **Universal Route Reachability**: All 20 provision combinations across all 60 priority configurations have a viable pathway to enactment.
- **Constitutional Thresholds**: Verified Rule XXII cloture (60 votes) vs. simple majority passage (51 votes), and 2/3 bicameral veto overrides.
- **Adjournment Mechanics**: Validated sine die session tick expiration under Article I and the 20th Amendment.
- **World Pathfinding**: All 7 chambers verified for obstacle-free entry tiles, collision detection, and reachable NPCs/doors.
- **Air-Gap Static Contract**: Verified that the production build in `dist/` contains zero external runtime APIs or remote dependencies.

---

## Documentation

- [`AP_Gov_Bill_to_Law_Master_Design_Specification.md`](AP_Gov_Bill_to_Law_Master_Design_Specification.md) — Master educational and structural design specification.
- [`docs/IMPLEMENTATION_CONTRACT.md`](docs/IMPLEMENTATION_CONTRACT.md) — Procedural transition tables, numeric forecasts, and evidence citations.
- [`docs/QA.md`](docs/QA.md) — Verification checklists and test evidence.
- [`docs/INTERACTION_REBUILD.md`](docs/INTERACTION_REBUILD.md) — Exploration grammar and room staging architecture.
- [`docs/GATES.md`](docs/GATES.md) — Project milestones and implementation gates.

---

## License

Created for educational use in AP U.S. Government and Politics coursework.
