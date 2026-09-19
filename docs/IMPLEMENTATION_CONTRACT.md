# Executable contract — first playable

This supersedes the original plan's late deployment decision and framework recommendation. The user requires a static Chrome game. The implementation uses local ES modules and CSS with a dependency-free Node build that copies browser files into `dist`. Node is not required on a Chromebook.

## Phase-transition table

The canonical implementation is `src/game.js`. Every action passes through `reduce`; invalid phase/action pairs throw before changing state. Previewing a forecast never commits a change.

| Phase | Action and transition | Snapshot / checkpoint |
| --- | --- | --- |
| builder | Choose exactly 3; set included priority; introduce → referral | Freeze introduced snapshot once |
| referral | Continue → committee | Checkpoint `committee` before technical response |
| committee | Support / defend technical text → markup | Adoption records clause, actor, before/after |
| markup | Support / defend priority demand → report | Preserve same committee checkpoint |
| report | Committee ≥13 → houseRule; otherwise end | Introduced snapshot unchanged |
| houseRule | Rule ≥218 → houseAmend; otherwise end | Checkpoint `houseAmend` |
| houseAmend | Support / defend eligible amendment → houseVote | Second eligible amendment withdrawn; unrelated rider excluded |
| houseVote | House ≥218 → senateAmend; otherwise end | Freeze House text; checkpoint `senateAmend` |
| senateAmend | Support / defend → senateRoute | House snapshot remains fixed |
| senateRoute | Consent / negotiated amendment → senateVote; seek → cloture; refuse → end | Consent is an authored institutional disposition, not a majority vote |
| cloture | ≥60 → senateVote; otherwise end | Separate vote, 3 ticks |
| senateVote | ≥51 → reconcile; otherwise end | Freeze Senate text; checkpoint `reconcile` |
| reconcile | Identical → president; propose House → senateConcur; propose Senate → houseConcur | Player proposes package; approval still required |
| houseConcur | ≥218 → president if Senate already agrees, otherwise senateConcur | Update House-approved snapshot |
| senateConcur | ≥51 → president | Update Senate-approved snapshot |
| president | Alignment ≥3 → signed ending; otherwise overrideHouse | Enrollment only after equality check; locked text |
| overrideHouse | ≥290 → overrideSenate; otherwise end | No amendments allowed |
| overrideSenate | ≥67 → enacted-over-veto ending; otherwise end | Both votes required |
| end | Claim; restart; retry saved checkpoint | Retry restores whole prior timeline; no new text edits in failed timeline |

Result notices must be dismissed before another game action. Each ordinary resolved stage costs one tick; introduction itself costs none, referral costs one, cloture costs three. Proposal selection in reconciliation and presentment cost none. Eighteen ticks are a fictional scheduling budget. Reaching zero before completion ends the congressional route; no pocket-veto inference is made. Presidential inaction is not yet implemented.

## Numerical configuration table

All numbers below are authored gameplay values, never empirical voting estimates. Original / amended values are in `src/content.js`. Each tuple is **House passage, Senate passage, Senate cloture, presidential alignment**.

| Provision | Original tuple | Amended tuple |
| --- | --- | --- |
| Accessibility standard | 10, 3, 2, 3 | 14, 5, 5, 1 |
| Upgrade grants | 18, 6, 4, -3 | 12, 7, 7, 2 |
| Deadline | -8, -3, -5, -2 | 8, 6, 8, 2 |
| Waiver | 10, 4, 4, 1 | 8, 3, 2, 3 |

| Decision | Exact rule |
| --- | --- |
| House passage | 200 + sum of House factors; 218 needed |
| Senate passage | 45 + sum of Senate factors; 51 needed |
| Cloture | 48 + sum of cloture factors; 60 needed |
| Committee report | 9 + floor(sum of House factors / 5); 13 of 25 needed |
| Structured rule | Scripted leadership coalition of 225; 218 needed |
| White House | Sum of alignment factors; ≥3 signature, otherwise regular veto |
| House override | House forecast +60, capped at 435; 290 needed |
| Senate override | Senate forecast +9, capped at 100; 67 needed |
| Consent availability | At cloture forecast ≥60, this authored scenario has no objection; otherwise a remaining-clause concession produces a scripted consent agreement |

The consent condition is explicitly simulation selection, not a claim that 60 supporters establish unanimous consent. Override bonuses represent a distinct, fictional reconsideration coalition; they must be shown as reasons in the UI. No random values are used in this build. All unchanged retries reproduce the same result.

## Vocabulary/evidence coverage matrix

| Scenes | Terms applied | Supporting evidence |
| --- | --- | --- |
| Builder/referral | Sponsor, enumerated powers, introduction, jurisdiction | Article I §8; institutional process reference |
| Committee/markup/report | Chair, hearing, subcommittee, amendment, markup, gatekeeping, reporting | Institutional process; Federalist 10 |
| House | Leadership, structured rule, rider, suspension, majority | Article I §5; House Rules Committee |
| Senate | Hold, unanimous consent, cloture, final passage | Senate explanation of Rule XXII |
| Agreement | Bicameralism, identical text, amendment exchange; conference explained | Article I §§1 and 7 |
| President/override | Enrollment, presentment, whole-bill veto, override | Article I §7 |
| Debrief | Competing interests, checks, consent versus policy merit | Federalist 10 and 51; run's clause history |

The glossary covers additional terms, but does not by itself satisfy applied vocabulary coverage. Missing full-spec contextual treatment includes co-sponsorship, majority-leader identification, conference-report voting, and detailed germaneness mechanics. No claim of full rubric or vocabulary completion is made.

## Fixture table

Tests run with `node --test`. Unless noted, initial cards are standard/grants/deadline; priority standard; all versions 0; 18 ticks.

| Fixture | Exact actions / setup | Expected |
| --- | --- | --- |
| Canonical signature | Introduce; continue referral; accept technical deadline, priority standard, House grants; continue votes; no unresolved Senate amendment; consent; pass Senate; identical; present | Signed; introduced all 0; final all 1; House=Senate=enrolled |
| Initial-state coverage | Omit each of 4 cards; for each combination choose each of 3 priorities; follow acceptance route | All 12 Alerts states sign; full three-issue scope would have 36 |
| Committee failure/retry | standard/deadline/waiver; reject both committee changes; report | 11<13; fail at report; retry returns to committee with original text and no vote history |
| Cloture distinction | Direct cloture fixture: standard/grants/deadline all 0 | Senate passage 51; cloture 49<60; no passage or enrollment |
| Reconciliation | House {standard:0, grants:1, deadline:1}; Senate {standard:1, grants:1, deadline:1}; propose Senate package | House concurrence required; president only after approval/equality |
| Successful override | Enrolled {standard:1, grants:0, waiver:0}; observe president; resolve House then Senate | Alignment -1 → veto; House302≥290; Senate69≥67; enact only after Senate |
| Sustained veto | overrideHouse with standard/grants/deadline all 0 | House280<290; no Senate override or enactment |
| Expiration | referral, 1 tick; continue | Not enacted; reintroduction explanation; no pocket veto |
| Illegal action | packageSenate during builder; present without identical approved text | Reject transition |
| Invalid save | Wrong schema or unrecognized clause | Reject saved data and start clean |

These fixtures test the first build. Inaction, pocket veto, chair stalls, and conference are future fixtures attached to future implementations, not tests claimed as passing.
