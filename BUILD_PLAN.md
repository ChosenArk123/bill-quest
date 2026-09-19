# Bill Quest Federal Edition — Build Plan

> Implementation update: the user requires Chrome on school-managed Chromebooks and a deployable static build at every gate. See `docs/GATES.md`, `docs/IMPLEMENTATION_CONTRACT.md`, and `README.md` for the current implemented approach. They supersede this document's late hosting decision, React/Vite recommendation, and calendar promises. The first playable uses dependency-free browser modules and a static `dist/` artifact.

Planning date: September 18, 2026. Submission deadline: Wednesday, September 23, 2026; the assignment does not specify a time. Target a finished release on September 22.

## Recommendation

Build a compact, choice-driven browser game with pixel-art staging, readable text, and one shared institutional encounter system. First complete Emergency Alert Accessibility from bill construction through a source-linked debrief. Then add the other two issues as content using the same mechanics.

The folder currently contains a design specification and a two-page assignment/rubric. There is no existing implementation. This document plans the build; it does not begin production code or create final art.

Authority order: the assignment governs submission and grading; `AP_Gov_Bill_to_Law_Master_Design_Specification.md` governs game content and required features; this plan supplies implementation decisions. Procedural claims below are inherited from that specification, not independently re-verified in this planning pass. Verify the cited primary sources during content production and record the result.

The central deliverable is a game that explains **why a bill changed or failed**, with evidence. The rubric allocates 35 points to concepts, 30 to foundational evidence, 30 to reasoning, and 5 to presentation. A beautiful game with shallow explanations would miss most of the assignment.

## Risks and decisions to lock before implementation

| Problem in the current design | Proposed implementation decision |
| --- | --- |
| The six-day sequence treats evidence and accessibility as late additions. | Integrate evidence links, keyboard navigation, and the debrief into the first complete route. September 23 is submission time, not a planned development day. |
| Three selected provisions can become two when the referral preview removes a clause; the introduced snapshot is ambiguous. | Treat all builder and referral-preview choices as drafting. Narrow the clause in place, or replace a removed card with the unused fourth card. Require three provisions at introduction, then freeze the exact introduced text. |
| The chair can block action before the player gets any amendment response; retrying the same state would stall forever. | A chair stall returns to the last checkpoint with a meaningful legal choice, potentially the pre-introduction draft. A committee vote failure returns to committee amendment choices. Never offer an identical retry as the only escape. |
| Accept/reject buttons could imply that a bill has authority to control legislators. | Label the player response as a narrative abstraction. Store the response separately from the institutional decision. The named authorized actor adopts or rejects the amendment; declining an amendment does not itself veto a legislative vote. |
| Cross-jurisdiction clauses are not specified for the twelve starting cards. | Map each proposed trigger to a defensible jurisdictional explanation before enabling it. Do not manufacture a referral solely to create a penalty. If no verified trigger applies, show a correct primary referral; the spec allows explanation instead of a second playable room. |
| A forced threat to the priority clause might produce an irrelevant amendment. | Author a valid demand for each selectable priority. Select among those matching the current text; never invent a nonsensical amendment just to hit the priority. |
| The House description mentions two amendments in order and an unrelated amendment being excluded. | Show three submitted proposals: one excluded and two eligible. Resolve both eligible proposals, with one compact scripted disposition if necessary. Do not describe an excluded proposal as being in order. |
| A single current-text object cannot prove what each chamber passed. | Store immutable House-approved and Senate-approved versions separately. Compare their canonical clause IDs and versions before presentment. |
| Session ticks could be confused with constitutional days. | Use separate session-budget and presentment-calendar state. Ticks are fictional scheduling costs. A no-action result card explicitly advances the constitutional ten-day period, excluding Sundays. Zero ticks must not automatically mean pocket veto. |
| Coalition numbers, time costs, and presidential cutoffs are unspecified. | Author small, explicit configuration tables. Treat every number as fictional tuning; expose reasons and thresholds. Test reachability and fairness before tuning for drama. |
| A source list and an obvious multiple-choice thesis can become decorative evidence. | Connect evidence to the actual event in every debrief. Retain the required claim builder, then show the player's concrete text change, institutional cause, relevant source proposition, and trade-off. |

These are proposed clarifications, not changes to constitutional or chamber powers. If implementation uncovers a conflict, preserve the specification's substantive limits and resolve the content issue before proceeding.

## Submission scope

The release must contain all sixteen required features in the specification. One issue is a development milestone, not the final submission.

| System | Required release treatment |
| --- | --- |
| Bill builder | Three issues, four cards each, choose three, priority clause, constitutional basis, pre-introduction preview. |
| Persistent bill | Immutable introduced text; evolving text; every amendment, addition, removal, and actor recorded. |
| Encounters | Shared authority, purpose, objection, proposed text, forecast, response, and consequence interface. |
| Committee route | Referral, chair access, short hearing context, subcommittee response, two markup demands, full-committee report vote. |
| House | Leadership scheduling, structured rule, separate rule and passage votes, permitted/excluded amendments. Explain suspension and open/closed rules in a comparison panel. |
| Senate | Compressed committee step, take-up, conditional objection, consent negotiation, distinct cloture and passage forecasts and resolutions. |
| Bicameral agreement | Side-by-side versions, reconciliation, appropriate chamber approvals, identical-text bypass. Reuse the comparison interface for exchange and conference. |
| President | Earlier disclosed priorities drive whole-bill action. Signature, regular veto, and both inaction outcomes; inaction uses compact result cards. |
| Override | Locked text; House first, Senate only after House success; separate thresholds. |
| Ending | Introduced/final comparison, provenance, neutral outcome dimensions, claim builder, run-specific evidence and trade-offs. |
| Failure and retry | Institutional Autopsy, end-run debrief, retry from a meaningful checkpoint. |
| Supporting UI | Bill File, Evidence Ledger, contextual glossary, source list, simulation labels, keyboard controls, reduced motion, sound-off. |

Exclude exploration, combat, individual legislator simulation, accounts, multiplayer, generated policy text, and bespoke minigames. Optional playable House routes, music, elaborate animation, and replay history stay outside the critical path.

## Technical structure

Use a small static web application: TypeScript, React, Vite, and CSS. Use ordinary accessible HTML for cards, buttons, dialogs, and comparisons, with pixel-art scenery behind it. No backend or game engine is needed for this set of interactions. Select and lock dependency versions when scaffolding; this plan makes no claim about current package versions.

Separate three concerns:

1. **Content:** issues, clause variants, amendment proposals, coalition explanations, dialogue, vocabulary, and sources.
2. **Rules:** valid transitions, actor permissions, text versions, forecasts, votes, time costs, reconciliation, and outcomes.
3. **Presentation:** encounter layout, document comparisons, readable explanations, portraits, stamps, transitions, and sound.

Suggested structure:

- `src/game/`: state types, transition reducer, text operations, forecasts, seeded resolution, calendar logic, checkpoint handling.
- `src/content/`: three issue definitions, encounters, amendments, evidence, glossary, outcome copy.
- `src/components/`: encounter panel, authority card, forecast, clause cards, Bill File, Evidence Ledger, version comparison, autopsy, claim builder.
- `src/screens/`: builder, institutional encounter, reconciliation, presentment, ending.
- `src/assets/`: shared backgrounds, portraits, bill sprite, icons, optional sound.
- `tests/`: procedural invariants, seeded scenario fixtures, and browser journeys.

Use a single transition function for game actions. UI buttons request an action; the rules validate it and return the next state plus explanatory events. Components must not independently mutate votes or text.

### State contract

Preserve every persistent variable required by the specification and add:

- Stable provision IDs and authored version IDs; immutable introduced, House-approved, Senate-approved, and enrolled snapshots.
- Phase and subphase, including separate House-rule, Senate-cloture, and passage votes.
- Event records: actor, source-of-authority tag, before/after text, response, institutional disposition, coalition effects, and evidence IDs.
- Forecast breakdowns with named factors and separate values for committee, House rule, House passage, Senate cloture, Senate passage, president, and override.
- Seed and stable encounter-resolution keys for reproducibility.
- Checkpoint state, including clock and random state, captured before a consequential choice.
- Presentment conditions: whether the ten-day period has elapsed and whether adjournment prevents return.
- Schema version for a best-effort local save. Storage failure must leave in-memory play working.

Freeze text at introduction, each chamber's approval, and enrollment. Previewing a choice cannot commit it. Rejected proposals remain in the history as rejected; only adopted changes modify the bill.

### Forecasts and balance

Start with deterministic outcomes and authored sample runs. Add seeded uncertainty only after the full route works.

For each vote, combine an issue baseline with named provision and negotiation effects, then show a bounded estimate. If the entire band meets the threshold, pass; if its maximum is below the threshold, fail. Draw only within a crossing band, clamp counts to the relevant body size, and record the result. Repeating an unchanged checkpoint uses the same result; retries teach different decisions, not rerolling.

Use a declared fictional committee size for report votes. Keep ordinary passage, cloture, rule adoption, and override as separate vote kinds. State the full-participation assumptions behind the specification's fixed chamber counts. Do not derive cloture support mechanically from passage support.

Configure one disclosed White House profile per issue. Keep clear alignment/conflict deterministic; do not add presidential randomness unless it serves a tested purpose. Model no-action eligibility and its result separately from policy alignment.

Balance targets:

- Every one of the twelve starting combinations has at least one viable route to enactment, though it may require concessions.
- Accepting every demand is not a universal solution; a concession can help one institution and hurt another for an explained reason.
- Preserving a priority and losing remains a coherent result.
- At least one reachable scenario demonstrates each required outcome and major procedural branch.
- Broad-support Senate passage without cloture is visibly possible.

## Player experience and pacing

At 1280×720, use a compact header for stage and simulation clock, a central institution/encounter area, a nearby bill summary, and a stable response area. Open deeper evidence and provenance on demand. Keep decisive information visible before the player commits.

Each consequential choice shows the exact proposed clause change, likely coalition effects, relevant threshold, and time cost. After resolution, one short consequence panel explains what changed, who did it, and why it mattered.

Use a single Capitol background family, a bill sprite that gains stamps and patches, and small institutional portraits. Prioritize visual differences between institutions and readable document changes. Pixel headings are decorative; body text uses a readable sans serif. Controls must expose labels, focus, and disabled reasons without relying on color.

Target about 13 minutes for a successful first run. Measure this with someone unfamiliar with the game; the specification's timing is a hypothesis. Keep required screen copy concise and move supplementary material into the Ledger. If testing exceeds 15 minutes, shorten repeated exposition and combine result panels before removing substantive mechanics.

## Build order and schedule

Dates are targets, not estimates of known available work hours. The dependencies and acceptance gates matter more than the calendar labels.

| Target | Deliverable | Exit gate |
| --- | --- | --- |
| Sept 18 — foundation | Scaffold, state contract, Alerts builder, introduction snapshot, shared encounter, Bill File, first evidence entries, keyboard navigation. | A valid three-card bill advances, an authorized amendment changes current text only, and the Bill File explains it. |
| Sept 19 — complete first route | Connect committee, House, Senate, reconciliation, president, and ending using deterministic Alerts content. Include failure, retry, source-linked debrief, and claim builder. | One complete run reaches the ending; a Senate cloture failure reaches an accurate autopsy and recoverable checkpoint. |
| Sept 20 — full content and branches | Add Data Breach and Bridges, all priority amendments, seeded vote bands, consent route, both reconciliation labels, veto/override, inaction cards, and session expiration. | Three complete issue runs; all required branches reachable through stored scenario fixtures. |
| Sept 21 — verification and presentation | Audit facts and vocabulary coverage, balance all twelve starting combinations, integrate final shared art, test readability and keyboard use, perform timed first-player test. | Required content and mechanics complete; no procedural blocker; a first-time successful run fits 10–15 minutes. |
| Sept 22 — release | Fix failures, check target browsers and school-device access where available, publish static build, verify release URL, prepare description and submission evidence. | Working release, local backup, description, and completed rubric checklist. |
| Sept 23 — submission buffer | Final link/access check and user submission to Google Classroom. | Submitted before the actual teacher/Classroom cutoff. |

At the end of Sept 19, an incomplete route means art work stops. At the end of Sept 20, missing required mechanics means all optional features are cut. Do not silently cut required issue sets, text history, bicameral agreement, evidence, or debrief to claim completion.

Hosting choice is intentionally deferred until release tooling and school access can be checked. Keep the build portable to a static host and prepare a local-server backup. Do not assume opening the built HTML directly from disk will work. Classroom submission is a separate action from building or publishing the game.

## Verification plan

Use focused rule tests for high-impact procedural behavior, plus real browser journeys for the UI. Do not spend time testing decorative CSS with implementation-mirroring unit tests.

| Test | Required result |
| --- | --- |
| Introduction and amendment | Introduced text remains unchanged; current text and provenance update exactly once on adoption. |
| Gate and actor authority | Player cannot select a committee, force scheduling, choose presidential action, or change enrolled text. |
| House rule failure | Cannot proceed as though the special rule passed. |
| Senate majority without cloture | Passage support over 50 does not satisfy a contested cloture requirement. |
| Consent/no cloture | Can reach passage without invoking a 60-vote requirement. |
| Identical text | Presentment is impossible while approved versions differ; unchanged Senate text takes the short bypass. |
| Conference treatment | Negotiation precedes approvals; report is not editable during floor approval. |
| Override | House failure stops the attempt; House success alone never enacts the bill. |
| Presidential inaction | Ten-day/Sunday explanation and return conditions produce the correct result card; pocket veto cannot be overridden. |
| Session expiration | Ends legislative progress appropriately; does not substitute for the separate presentment rules. |
| Retry and refresh | Restore a coherent checkpoint without duplicated events or fresh random rolls for unchanged decisions. |
| All starting combinations | Twelve valid combinations render, resolve content references, and have reachable outcomes; no missing amendment for any selectable priority. |
| Evidence | Each required term is defined and applied in context; each cited proposition connects to a real mechanic or recorded event. |
| Browser/accessibility | Complete keyboard-only play; visible focus; usable dialogs; readable 1280×720 layout; reduced-motion and sound-off behavior; no horizontal clipping. |

Scenario fixtures must cover signature, regular veto with sustained veto, successful override, law without signature, pocket veto, committee stall, House failure, cloture failure, final passage failure, bicameral rejection, and expiration. These are development checks, not extra player-facing modes.

Test Chrome, Edge, Firefox, and Safari where actually available. Record any untested browser or unavailable school-device check honestly. A desktop screenshot does not prove school network access.

## Rubric and delivery checklist

- **Concepts, 35 points:** every gate names the power holder, defines the relevant concept, applies it, and explains an institutional purpose and cost.
- **Evidence, 30 points:** Constitution and Federalist 10/51 support specific events; 62/73 provide the specified supporting arguments. A linked title without its proposition does not count as integration.
- **Reasoning, 30 points:** ending connects the player's actual choices and textual changes to shifting coalitions, institutional consent, and a defensible trade-off.
- **Presentation, 5 points:** readable, coherent, neutral, functional, and free of distracting factual or mechanical errors.
- **Delivery:** working browser game; source/build backup and launch instructions; visible sources and simulation disclosures; concise project description using the specification's submission copy; screenshots demonstrating House/Senate differences, reconciliation, and the evidence-linked ending.

The first coding milestone is a complete Alerts route with plain presentation and an accurate ending. Until that works, additional scenery and alternate routes are premature.
