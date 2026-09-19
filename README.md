# Bill Quest — exploration build

A client-side AP Government game about how a bill changes as institutions act on it. Walk through seven compact original pixel-art spaces, talk to fictional institutional actors, and carry the Emergency Alert Accessibility bill through lawmaking.

## Play and build

On a development machine with Node 18 or newer:

```sh
node --test
node scripts/build.mjs
node scripts/serve.mjs
```

Open `http://127.0.0.1:4173/`. The preview server serves only the contents of `dist/`. It is a developer tool, **not** a production dependency. No package installation is required. The equivalent npm scripts are `npm test`, `npm run build`, and `npm run preview`.

The finished production artifact is **`dist/`**: `index.html`, `style.css`, `app.js`, `game.js`, `content.js`, `world.js`, `world-data.js`, and `dialogue.js`. Upload its contents to any ordinary static host. Students need only Chrome and the hosted URL. No server application, database, runtime installation, extension, account, remote fonts, CDN scripts, or API access is used by gameplay. Source links open external sites only when a student requests them; built-in explanations remain available without visiting those sites.

## Deployment path established in Gate 1

The checked-in `.github/workflows/pages.yml` tests, builds, uploads `dist`, and deploys it through GitHub Pages on pushes to `main` or a manual workflow run. To use it, place this repository in GitHub and set Settings → Pages → Source to **GitHub Actions**. This session has not created a remote repository or published a public URL.

Alternatively, upload the contents of `dist` as a static directory on the school's approved host. `index.html` must sit at the published directory root; use ordinary JavaScript and CSS MIME types. No rewrite rules or functions are needed. Relative paths support a subdirectory such as `/bill-quest/`; the preview server also exposes that path for testing.

Run tests and rebuild for every milestone. Only the static `dist` artifact is deployed, never the source documents, tests, preview script, or this README. The next milestone must pass the same build checks before it replaces this release.

## Controls and persistence

Move with arrow keys or WASD. Approach a person or object and press E or Enter. Click the floor to walk, or click a person to approach and talk. Tab also reaches accessible destination buttons that walk the character along valid paths. The priority selector uses standard keyboard controls. Escape closes dialogue; no timed input or audio is required. Reduced motion follows the operating system and can be set in Settings.

Progress is saved in localStorage on this browser, with a versioned schema. If school policy blocks storage, play continues in memory; closing or refreshing the tab then loses the run. No data leaves the browser. Checkpoint retry rewinds the simulation to the preceding choice; it does not grant the player authority to edit an introduced bill later in the same timeline.

## Implemented

- Seven explorable rooms, collision-aware walking, NPC facing/reactions, short required character dialogue, optional depth, physical doors, and room-position saving.
- Choose three of four Alerts provisions and one priority (12 initial states).
- Introduction snapshot, current text, chamber-approved versions, enrollment, and event history.
- Committee amendments/report, structured House rule and passage, Senate amendment/consent/cloture/passage, amendment exchange, signature, regular veto, and separate override votes.
- Deterministic forecasts with fictional numerical factors and visible thresholds.
- Failure autopsy, checkpoint retry, source ledger, glossary, comparison, analytical claim feedback.
- Responsive layout, semantic buttons, keyboard activation, focus handling, and no runtime network dependency.

## Not yet complete

This is a playable Gate 1–2 implementation, not the final assignment release. Remaining specification work: Data Breach and Bridges content; chair-stall branch; richer hearing/markup content; conference package; presidential inaction result cards with a distinct calendar; bounded uncertainty if retained; complete contextual vocabulary coverage; source/content audit; real-student timing; and managed-Chromebook / school-host smoke test. The current game discloses its narrower route and does not present missing branches as implemented.

See `docs/IMPLEMENTATION_CONTRACT.md` for transition, numeric, evidence, and fixture tables and `docs/QA.md` for verification evidence and remaining checks.

See `docs/INTERACTION_REBUILD.md` for the implemented exploration grammar and room-by-room teaching design.
