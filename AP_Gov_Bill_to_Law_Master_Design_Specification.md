# AP U.S. Government Bill to Law Game Master Design Specification

## Purpose and product boundary

This document is the content and game-design authority for a 10-15 minute pixel-art browser game for AP U.S. Government students. The player constructs a fictional federal bill, then tries to preserve enough of it to survive the federal legislative process. This phase ends with a verified specification. It does not authorize production code or final art.

The attached assignment permits a digital game for AP Government students and awards 95 of 100 points for accurate course concepts, specific foundational evidence, and a defensible line of reasoning. Only five points concern presentation mechanics. The game therefore must make an argument through its systems, not decorate a list of steps.

The game must remain achievable by one student with heavy Codex assistance before September 23, 2026. Any feature that threatens a complete, accurate, polished build is subordinate to the required list near the end.

## Final analytical thesis

Federal lawmaking combines constitutional concurrence requirements with chamber-created agenda gates. The House, Senate, and president do not form one continuous majority. Different actors control access, amendment, debate, and consent at different stages. A proposal may therefore need changing coalitions and textual compromise to survive. This can broaden consultation, represent different constituencies, and check concentrated power. It can also empower gatekeepers and organized minorities, delay action, dilute policy, and favor the status quo.

This wording is more precise than calling every obstacle an independent constitutional veto point. House and Senate concurrence and presidential presentment are constitutional requirements. Committee scheduling, House special rules, Senate holds, and cloture are products of chamber rules, precedents, or practice. They can still stop a bill, but the game must label their different legal sources.

The recurring player question is:

> How much of the bill as introduced will you change to improve its chance of becoming law?

The game does not assume that compromise is always wise or that enactment is always better than failure. Preserving a core provision and losing can be a coherent result. Passing a hollowed-out bill is not scored as a moral victory.

## Concise final gameplay loop

1. Choose one of three neutral policy issues.
2. Select three of four provisions to create the bill as introduced.
3. Enter an institutional encounter.
4. Read the institution's authority, objection, vote threshold, and support forecast.
5. Accept, reject, or negotiate a textual change. The player controls the bill's response, not the government actor.
6. Resolve the encounter from the bill state, coalition state, procedure, and a narrow band of political uncertainty.
7. Record every change and its institutional source.
8. Repeat through referral, committee work, markup, the House, the Senate, bicameral reconciliation, and presentment.
9. Compare the introduced bill with the final law or failed version and explain the result with constitutional evidence.

The encounter presentation may use boss-battle staging, escalating music, portraits, threshold bars, and dramatic reveals. It may not use arbitrary combat, reflex dodging, or hit points. The “boss” is an institutional barrier with real powers and incentives.

## Source and accuracy framework

Substantive procedure is verified against the Constitution, Congressional Research Service, and official House and Senate materials. Sources are listed at the end.

Every procedural explanation receives one visible tag:

| Tag | Meaning | Examples |
| --- | --- | --- |
| `CONSTITUTION` | Required by constitutional text or structure | Bicameral Congress, chamber rulemaking authority, presentment, veto, override |
| `HOUSE RULE` | A House rule or precedent | Special rules, House germaneness requirements |
| `SENATE RULE` | A Senate rule or precedent | Rule XXII cloture |
| `PRACTICE` | A political convention or common method | Holds, leadership scheduling, veto signals |
| `SIMULATION` | A transparent compression for playability | Session ticks, forecast bands, a fixed number of provisions |

The game follows one common route, but it must never say that every bill follows it. CRS expressly warns that legislative paths vary and often depart from the familiar classroom sequence.[3]

## Player role

The player is the bill's text. The player is not a representative, senator, committee chair, party leader, or president.

The player may:

- choose the initial issue and provisions;
- decide whether to accept, reject, or counter an amendment;
- decide which provision is essential when a compromise is unavoidable;
- choose whether to risk failure rather than surrender a provision;
- inspect evidence, support forecasts, and the change history.

The player may not:

- select a friendly committee;
- command a chair to schedule a hearing;
- decide which House amendments are in order;
- force unanimous consent;
- order senators to invoke cloture;
- choose the president's action;
- bypass a failed vote by spending a generic power-up.

The interface must always name the actor with formal power. A player button should read `ACCEPT THE COMMITTEE AMENDMENT`, not `MAKE THE COMMITTEE PASS ME`.

## Three issue and provision sets

All people, coalitions, cost estimates, vote forecasts, and bill texts are fictional. The institutional rules are not. Each route begins in the House by simulation design. None of the three is a bill for raising revenue, so the Origination Clause does not require House origination. The Evidence Ledger must correct the common claim that every bill starts in the House.

The player chooses three of four provisions. Four cards are enough to create meaningful variation without creating three separate games. Every issue uses the same encounter engine, clause-card UI, amendment system, vote resolution, and debrief.

### Issue A Emergency Alert Accessibility

**Policy question:** How should federal law improve the accessibility and reliability of interstate emergency alerts?

**Asserted constitutional basis:** Commerce Clause and Necessary and Proper Clause because the fictional legislation regulates interstate communications and implements federal communications authority.

**Committee model:** House communications jurisdiction modeled on Energy and Commerce; Senate communications jurisdiction modeled on Commerce, Science, and Transportation. Exact subcommittee names should remain fictional unless re-verified for the current Congress.

| Provision card | Introduced text summary | Support created | Pressure created |
| --- | --- | --- | --- |
| National accessibility standard | FCC must establish minimum visual, audio, and assistive-technology standards | Accessibility and national-uniformity coalitions | Broadcaster compliance and federalism concerns |
| Upgrade grants | Federal grants help state and local systems meet the standard | State, local, and rural implementation support | Fiscal-cost objections and grant conditions |
| Two-year deadline | Standards take effect within two years | Urgency and beneficiary support | Feasibility and small-provider concerns |
| Hardship waiver | Limited temporary waivers for documented technical hardship | State and rural flexibility support | Weaker uniformity and delayed coverage concerns |

**Mechanical usefulness:** This issue foregrounds the difference between policy ambition and implementation capacity. Committee and subcommittee amendments tend to target deadlines, grant size, and waivers.

### Issue B National Data Breach Notice

**Policy question:** What national rules should govern notice after a company discovers a consumer-data breach?

**Asserted constitutional basis:** Commerce Clause and Necessary and Proper Clause because the fictional law regulates businesses engaged in interstate commerce.

**Committee model:** House consumer-protection jurisdiction modeled on Energy and Commerce; Senate commerce jurisdiction modeled on Commerce, Science, and Transportation.

| Provision card | Introduced text summary | Support created | Pressure created |
| --- | --- | --- | --- |
| Thirty-day notice floor | Covered firms must notify affected consumers within 30 days, with a limited law-enforcement delay | Consumer and uniform-baseline support | Operational and investigation-timing concerns |
| National preemption clause | Federal timing rules replace different state timing requirements | Business-uniformity support | State-autonomy and stronger-state-standard objections |
| Federal civil enforcement | FTC may enforce the statute and seek civil penalties | Enforcement and accountability support | Compliance-cost and agency-discretion concerns |
| Limited private action | Affected consumers may sue for specified notice violations | Individual-remedy support | Strong litigation and coalition resistance |

**Mechanical usefulness:** This issue foregrounds federalism, enforcement design, and legal exposure. It creates the strongest chance of a contested Senate debate if the final text combines broad preemption or a private action with weak cross-coalition support. That is a gameplay consequence, not an endorsement of either position.

### Issue C Interstate Bridge Safety and Repair

**Policy question:** How should Congress structure federal inspection and repair support for bridges carrying interstate traffic?

**Asserted constitutional basis:** Spending for the general welfare, regulation of interstate commerce, and the Necessary and Proper Clause.

**Committee model:** House transportation jurisdiction modeled on Transportation and Infrastructure; Senate surface-transportation jurisdiction modeled on Environment and Public Works.

| Provision card | Introduced text summary | Support created | Pressure created |
| --- | --- | --- | --- |
| Inspection cycle | Covered bridges receive a federal minimum inspection cycle | Safety and national-baseline support | State administrative-cost concerns |
| Repair grants | A fictional multi-year grant authorization supports eligible repairs | State and local project support | Fiscal-cost and allocation disputes |
| Local match | Recipients supply a 20 percent nonfederal match, with defined hardship relief | Cost-sharing and fiscal support | Low-resource and rural-state objections |
| Public condition dashboard | Federal agency publishes standardized condition and grant-status data | Transparency and oversight support | Reporting burden and data-standard concerns |

**Mechanical usefulness:** This issue foregrounds distributive politics. House members respond to district projects; senators respond to state-wide and small-state concerns. Conference pressure tends to concern grant formulas, matching requirements, and national standards.

### Neutrality rule for all three issues

No provision is labeled moderate, extreme, smart, wasteful, compassionate, or business-friendly. The game describes constituencies, implementation effects, and institutional consequences. It never awards points for selecting or removing a particular policy.

## Persistent state and variable model

The implementation may represent this data in any technical form, but every field below must persist across scenes.

### Bill identity

| Variable | Required contents | Player visibility |
| --- | --- | --- |
| `issue` | One of the three issue identifiers | Always visible |
| `bill_id` | `H.R. SIM-1`, explicitly fictional | Always visible after introduction |
| `introduced_provisions` | Immutable snapshot of the three selected cards | Available in Bill File |
| `current_provisions` | Current text, including amendments, removals, and additions | Always available |
| `provision_status` | Unchanged, amended, removed, or added | Color plus icon and text label |
| `change_provenance` | Stage, institutional actor, proposal, player response, and result for every textual change | Full history in Bill File |
| `protected_provision` | One provision the player has marked as the bill's priority | Visible; can be changed only between encounters |

`protected_provision` does not make the clause mechanically immune. It tells the debrief which compromise the player considered most costly and allows one dialogue line to emphasize the player's stated priority.

### Political and procedural state

| Variable | Function | Required treatment |
| --- | --- | --- |
| `support_factors` | Named coalition reasons at the current institution | Store reasons, not only numbers |
| `house_floor_forecast` | Expected support under the current House procedure | Recalculate after every amendment |
| `senate_passage_forecast` | Expected support for final passage | Separate from cloture |
| `senate_cloture_forecast` | Expected support for limiting debate | Never merge with passage forecast |
| `presidential_alignment` | Match between final text and disclosed White House priorities | Determines signature or veto tendency |
| `time_ticks` | Abstract remaining floor and calendar time | Tagged `SIMULATION`; reaches zero at end of Congress |
| `house_route` | Suspension or special rule | Determined by leadership conditions, not player command |
| `house_rule_type` | Open, structured, or closed | Canonical build uses structured; alternatives explained |
| `senate_route` | Unanimous-consent agreement, ordinary debate, or cloture attempt | Determined during Senate encounter |
| `difference_set` | Provisions on which House and Senate texts differ | Drives bicameral encounter |
| `presidential_action` | Sign, regular veto, no-action law, or pocket veto | Calculated from bill and calendar state |
| `outcome` | Current, stalled, defeated, expired, vetoed, or enacted | Final debrief input |

### Learning state

| Variable | Function |
| --- | --- |
| `evidence_unlocked` | Constitutional and foundational entries encountered |
| `terms_unlocked` | AP vocabulary encountered in context |
| `institution_history` | Gate reached, power holder, threshold, decision, outcome |
| `misconceptions_corrected` | Optional flags for the debrief, such as cloture versus passage |

### Support forecast and uncertainty model

Votes may contain bounded uncertainty, but the game must not use unexplained random success.

For each encounter:

1. Start with an issue-specific fictional coalition baseline.
2. Apply named effects from current provisions.
3. Apply named effects from prior accepted amendments and compromises.
4. Apply the institution's procedure and threshold.
5. Display a whip-estimate band and every major reason that moved it.
6. If the entire band is above the threshold, pass deterministically.
7. If the entire band is below the threshold, fail deterministically.
8. Only if the band crosses the threshold may a seeded draw resolve the small set of uncertain votes.

Example UI:

> **House passage threshold:** 218 in this full-participation simulation  
> **Whip estimate:** 214-222  
> **Moves support up:** rural assistance, committee report  
> **Moves support down:** high authorization, short compliance deadline  
> **Uncertain votes:** members balancing district benefit against cost

The game assumes full chamber membership and participation to make thresholds legible. A tooltip gives the legal nuance: ordinary passage is generally a majority of those voting with a quorum; override is two-thirds of those voting in each chamber with a quorum. The simulation uses 218, 290, 51, 60, and 67 only under its stated full-participation assumption.

Randomness represents imperfect whip counts, absences, late decisions, and political uncertainty. It must never be narrated as lawmakers rolling dice.

## Universal institutional encounter format

Every boss encounter uses the same six-part grammar:

1. **Authority card:** who controls the next action and under what source of authority.
2. **Institutional purpose:** why the gate exists.
3. **Objection:** a concrete concern created by the current bill state.
4. **Text demand:** the exact amendment, concession, or procedural condition offered.
5. **Forecast:** threshold, forecast band, and named support factors.
6. **Response:** accept, reject, or counter when a legitimate counter exists.

After resolution, the game states:

- what happened procedurally;
- what changed in the bill;
- what coalition changed;
- what trade-off the decision created.

This reusable structure is the main scope control. Different issues swap provision cards, objections, and dialogue while using the same system and scenes.

## Scene and encounter map

| Scene | Target | Encounter | Main player decision | Required AP lesson |
| --- | ---: | --- | --- | --- |
| 0 Bill Builder | 1:20 | Choose issue and three provisions | Define the introduced bill and priority clause | Policy design creates later coalitions and conflicts |
| 1 Introduction and Referral | 0:50 | Sponsor and jurisdiction gate | At the final draft preview, retain a cross-jurisdiction clause or narrow the draft | Only members introduce; jurisdiction, not preference, determines referral |
| 2 Committee and Subcommittee | 1:25 | Chair gate, hearing, specialized review | Respond to one technical amendment | Committees combine expertise with agenda control |
| 3 Markup | 1:30 | Two amendment demands and report vote | Preserve text or improve report prospects | Markup converts bargaining into statutory language |
| 4 House Floor | 1:35 | Leadership scheduling, special rule, permitted amendments, passage | Respond under the rule leadership secured | House procedure favors majority control and predictable limits |
| 5 Senate Floor | 2:15 | Compressed Senate committee, take-up, surprise objection, possible cloture, passage | Negotiate consent or preserve text and seek cloture | Majority support for passage may not end debate; not every bill requires cloture |
| 6 Bicameral Fake-Out | 1:35 | Reveal differing texts and reconcile them | Choose provision-by-provision compromise | Both chambers must approve identical text; conference is not automatic |
| 7 Presidential Presentment | 1:00 | Whole-bill signature, veto, or no-action outcome | No command; observe result of accumulated bill state | Presentment is an independent constitutional check |
| 8 Override if Vetoed | 0:45 | Separate two-thirds votes | Choose one final compromise message, not new text | Veto is not always final, but override is difficult and bicameral |
| 9 Debrief | 1:10 | Compare bill and result | Build the analytical claim | Institutional structure caused textual and coalition change |

Expected first successful run: about 13 minutes. Experienced replay: 8-10 minutes.

## Detailed encounter specifications

## Scene 0 Bill Builder

### Procedure and concepts

Ideas may come from citizens, organized interests, executive agencies, the president, or members of Congress. Only a member of the House or Senate may formally introduce a bill. Members and staff commonly use legislative counsel to translate policy goals into text. Article I, Section 8 supplies enumerated powers; Article II, Section 3 allows the president to recommend measures but not introduce legislation.[2][3]

Target terms: agenda setting, sponsor, co-sponsor, interest group, enumerated power, Commerce Clause, Spending Clause, Necessary and Proper Clause.

### Mechanic

The player selects an issue, reads a neutral one-sentence problem, and chooses three provision cards. Each card previews constituencies likely to support or resist it. The player then marks one provision as the bill's priority.

A fictional House member agrees to sponsor the completed text. This sponsorship is scripted after the player identifies the bill's federal action and constitutional basis from three cards. The player does not select a party or real officeholder.

### Teaching division

- **Mechanical:** Provision choice creates persistent text and later political pressure.
- **Dialogue:** Legislative counsel distinguishes a goal from enforceable statutory language.
- **UI:** Constitutional-power card and `SIMULATION` label for the fictional bill.

### States

Every valid three-card combination advances. The builder has no ideological correct answer.

## Scene 1 Introduction and Referral Boss

### Real procedure and power

The sponsor introduces the bill. It receives a House designation and number. In the House, the Speaker refers it on the advice of the Parliamentarian according to standing rules and precedents. House measures may receive multiple referrals when provisions cross jurisdictions. In the Senate, referral usually centers on the committee with jurisdiction over the predominant subject.[3]

Referral authorizes committee consideration. It does not guarantee a hearing, markup, report, or floor vote.

Target terms: introduction, H.R., jurisdiction, standing committee, Parliamentarian, primary referral, multiple referral.

### Why the gate exists and its costs

Jurisdiction divides Congress's workload and builds subject-matter specialization. It can also fragment broad bills and create more gatekeepers.

### Encounter

Before introduction, the builder previews likely jurisdictional consequences. The player may then retain a cross-jurisdictional provision or remove it while the text is still a draft. After the sponsor introduces the chosen text, the provision cards slide across a jurisdiction map and the Parliamentarian identifies the primary committee; a cross-jurisdictional provision may trigger an additional referral and one time cost.

The player cannot rewrite an introduced bill merely to evade referral, and cannot choose a preferred committee. Changing the text after introduction must occur through the amendment process or by introducing a new measure, which is outside this run. If implementation cannot support a second referral branch, show the added gate and explanation without a second playable room.

### Cause and effect

The forecast panel says exactly which clause broadened jurisdiction. A wrong player prediction about jurisdiction receives correction but does not reroute the bill incorrectly.

### Success and failure

Introduction succeeds after valid sponsorship. The cost here is an additional time tick or a voluntarily narrower pre-introduction draft, not random rejection by the Parliamentarian.

## Scene 2 Committee and Subcommittee Boss

### Real procedure and power

Committees receive more referrals than they can formally pursue. The chair has primary agenda-setting authority and chooses which subjects receive hearings or markups. Hearings gather testimony and create a public record, but a hearing is not legally required for every bill. Subcommittees may conduct specialized work depending on committee practice, but only the full committee reports a bill to the chamber.[3]

Target terms: committee chair, gatekeeping, hearing, testimony, subcommittee, specialization, ranking member, status quo bias.

### Why the gate exists and its costs

Committees conserve floor time and develop expertise. Chair control also allows a small group to prevent full-chamber consideration and advantages the status quo. Witness selection can improve information while privileging some voices.

### Encounter

The chair displays one agenda slot and three waiting measures. Whether the player's bill receives the slot is determined by its current coalition factors; there is no “schedule me” button.

If scheduled, the hearing presents two short statements chosen from the current bill state. Examples:

- an administrator identifies an impossible deadline;
- a state official objects to preemption;
- a rural county cannot meet the match;
- a consumer advocate argues that enforcement is too weak.

The subcommittee then proposes one technical amendment tailored to the issue. The player may accept, reject, or choose one defined compromise. Examples include a phased deadline, a narrower preemption clause, or hardship relief on a matching requirement.

### Cause and effect

The UI shows that accepting the amendment improves committee scheduling or report support for a named reason. Rejecting preserves text but leaves the concern active at markup.

### States

- **Advance:** Chair schedules action and subcommittee returns the text to the full committee.
- **Alteration:** One provision changes.
- **Stall:** Chair withholds action. Institutional Autopsy identifies agenda control. The player retries from the encounter with a different textual response.

### What is taught mechanically versus stated

- **Mechanical:** Scarce agenda slot and specialized amendment.
- **Dialogue:** Hearings are informative and strategic; subcommittee cannot report to the chamber.
- **UI:** `PRACTICE` for agenda selection; chamber-rule note for committee structure.

## Scene 3 Markup Boss

### Real procedure and power

Markup is the formal meeting where committee members debate, offer amendments, and vote on the text. Amendments may alter clauses or substitute new text. The full committee decides by majority whether to report the bill. Committees rarely schedule markup unless majority support appears plausible.[3]

Target terms: markup, amendment, substitute amendment, report favorably, committee report, calendar.

### Why the gate exists and its costs

Markup turns information and bargaining into legal language. Specialists can repair defects and build coalitions. They can also narrow, redirect, or burden the proposal before most members see it.

### Encounter

Two amendment cards are generated from unresolved pressures. At least one must threaten the player's priority provision during a normal first run.

For each amendment:

- **Accept:** adopt the offered text and update support.
- **Reject:** preserve the clause and accept the forecast risk.
- **Counter:** choose one prewritten middle position when procedurally plausible.

The report vote uses the forecast-band system. On success, the bill receives a one-screen committee report summarizing purpose, constitutional authority, adopted amendments, and neutral majority and minority views. It is stamped `ELIGIBLE FOR FLOOR CONSIDERATION`, not `SCHEDULED`.

### Required issue examples

- Alerts: reduce grant authorization or extend the deadline.
- Data breach: narrow preemption or remove the private action.
- Bridges: add hardship relief or alter the grant match.

### States

- **Advance:** Majority reports current text.
- **Alteration:** Zero to two amendments adopted.
- **Failure:** Report vote loses. Retry markup, not the whole game.

## Scene 4 House Floor Boss

### Real procedure and power

House majority leaders strongly influence the floor agenda. Many bills are considered under suspension of the rules, which limits debate to 40 minutes, prohibits floor amendments, and requires two-thirds of members voting. Major legislation commonly proceeds under a special rule reported by the Rules Committee. The House first adopts the rule, then debates and considers only the amendments allowed under its terms. Special rules may be open, structured, or closed. House amendments generally must be germane unless applicable requirements are altered or waived.[3][5]

Target terms: majority leader, Rules Committee, special rule, open rule, structured rule, closed rule, germaneness, Committee of the Whole, suspension of the rules.

### Why the gate exists and its costs

The 435-member House uses central scheduling and debate limits to act efficiently. Majority control can create clear responsibility and predictable proceedings. Restrictive rules can reduce minority participation and protect the majority from unwanted amendment votes.

### Encounter

Leadership, not the player, selects a route from the bill state:

- **Suspension:** available for a bill with very broad forecast support; faster, no floor amendments, two-thirds threshold.
- **Special rule:** canonical route; simple-majority passage after a separate rule vote, but subject to the rule's permitted amendments.

Version 1 implements one structured rule. A comparison panel defines open and closed rules without building separate amendment engines.

The special rule makes two submitted amendments in order. An unrelated amendment visibly fails the germaneness or rule-eligibility gate; a relevant amendment receives a vote. The player may accept the relevant amendment's substance beforehand or defend the committee text and risk votes.

The House takes a separate vote on the special rule and final passage. The forecast identifies majority-party scheduling support, cross-coalition support, provision costs, and district effects.

### States

- **Advance:** House passes its version.
- **Alteration:** One floor amendment may change it.
- **Failure:** Rule or final passage loses; suspension can also fall short of two-thirds.

### Accuracy warning

Do not say the Rules Committee is a gate for Senate bills in the Senate. Do not say every House bill uses a special rule.

## Scene 5 Senate Floor Boss

### Compressed Senate committee step

House passage does not compel Senate action. The engrossed House bill is messaged to the Senate and may be referred to the relevant Senate committee. That committee may report the House text, amend it, or report substitute text. To avoid replaying the full committee level, the game uses one short Senate substitute encounter and labels it `SIMULATION COMPRESSION`.[3]

### Real floor procedure and power

The Senate commonly takes up a bill by unanimous consent or by agreeing to a motion to proceed. A hold is an informal notice that a senator intends to object or delay; it is not a constitutional veto. Under ordinary Senate procedure, debate on many legislative questions is not automatically limited, and amendments often need not be germane before cloture. A senator or group can threaten extended debate or procedural delay.[3][4]

For ordinary legislation, Rule XXII cloture requires a motion signed by at least 16 senators and, after the rule's waiting period, support from three-fifths of senators duly chosen and sworn, normally 60 when all seats are filled. Cloture limits further consideration and amendment opportunities. It does not pass the bill. Final passage normally requires a simple majority.[3][4]

Not every Senate bill needs 60 votes. The chamber often acts through unanimous consent, opponents may permit a final vote, and some statutes create expedited procedures. Budget reconciliation has separate debate limits and is outside these three ordinary bills. The game must display this limitation before the cloture result.

Target terms: unanimous consent, motion to proceed, hold, filibuster, cloture, three-fifths, rider, final passage.

### Why the gate exists and its costs

Senate procedure gives individual senators more opportunity to debate and amend than House procedure usually permits. This can protect minority participation and encourage negotiation. It can also let a minority prevent a majority from reaching a final vote and consume scarce floor time.

### Conditional surprise encounter

The player first sees a final-passage forecast that may exceed a simple majority. A celebratory cue begins. A senator then objects to the proposed unanimous-consent agreement or threatens extended debate because of a current provision.

The reveal is fair because the UI immediately explains:

> You may have enough support to pass if a final vote occurs. You do not yet have agreement to end debate and reach that vote.

The encounter triggers only for ordinary legislation when at least one of these state conditions exists:

- the text contains a strongly contested enforcement, preemption, cost, or mandate provision;
- the coalition has majority support but insufficient cross-coalition support to end debate;
- the player rejected an earlier amendment whose sponsor retained Senate leverage.

The player chooses:

1. **Negotiate a unanimous-consent agreement:** accept a defined amendment or debate limit; save time.
2. **Seek cloture:** ask the sponsor to pursue the route, preserve more text, spend time, and face the separate three-fifths forecast. An animation shows Senate proponents—not the bill—filing a motion signed by at least 16 senators.
3. **Refuse both:** preserve the text but risk expiration or indefinite delay in the simulation.

If cloture is invoked, the game visibly resets from the cloture threshold to the final-passage threshold. A non-germane rider may appear before cloture but is restricted after cloture under the modeled conditions. Do not teach that all pre-cloture amendments are non-germane or that cloture automatically defeats every amendment.

### States

- **Advance:** Senate passes its version by simple majority after consent or cloture.
- **Alteration:** Committee substitute, negotiated amendment, or floor amendment changes text.
- **Failure:** Bill is not taken up, cloture fails, final passage fails, or time expires.

### House-Senate contrast shown through mechanics

| House | Senate |
| --- | --- |
| Majority leadership and special rule structure the encounter | One objection can disrupt the negotiated fast route |
| Amendment list is predictable under the structured rule | Amendment and debate environment is broader before agreement or cloture |
| Final passage majority is usually the central threshold | Cloture and passage may require different coalitions |
| Fast but centralized | Negotiated and potentially time-consuming |

## Scene 6 Bicameral Fake-Out and Resolution Boss

### Constitutional requirement

Both chambers must agree to the same bill in the same form before presentment. If the second chamber passes an amended version, Congress can resolve differences by exchanging amendments between the houses or by appointing a conference committee. Conference is not automatic and is not required by the Constitution.[3]

Target terms: bicameralism, identical text, amendments between the houses, conference committee, conferee, conference report.

### Dramatic fake-out

After Senate passage, the game plays a two-second victory cue and displays `PASSED THE HOUSE` and `PASSED THE SENATE`. A clerk then overlays the documents:

> **HOUSE VERSION DOES NOT EQUAL SENATE VERSION**  
> Passing twice is insufficient when the text is different.

The reveal teaches a constitutional condition rather than withholding arbitrary information.

### Legitimate resolution routes

The institutional route is selected from the size of the difference set, time, and scripted leadership posture. This is a simulation choice, not a legal rule.

- **Amendment exchange:** One chamber concurs in the other's amendment or sends a counterproposal. Best for a small difference set.
- **Conference:** House and Senate conferees negotiate a package. Separate majorities of each delegation approve a conference report; then each chamber votes on the report. The report cannot be amended on the floor.

Both routes reuse the same clause-comparison interface. They differ through labels, dialogue, and the final ratification sequence. This models legitimate alternatives without building two games.

### Encounter

The screen compares each current House and Senate provision. For every difference, the player may accept the House text, accept the Senate text, or select one defined compromise. Two forecast panels update separately.

The player succeeds only when one identical package can pass both chambers. Maximizing one chamber while ignoring the other fails. Every surviving, removed, amended, or added clause receives provenance.

### Why and consequences

Bicameral concurrence forces agreement between population-based House representation and equal state representation in the Senate. This can broaden consent and check impulsive action. It can also create delay, empower negotiators, and produce a narrower compromise.[2][8][9]

### States

- **Advance:** Both chambers approve identical text.
- **Alteration:** One or more provisions change or disappear.
- **Failure:** Either chamber rejects the common text.
- **Bypass:** If the Senate passed the House text without amendment, show a short “identical text” explanation and proceed. This should be possible but uncommon in a first run.

## Scene 7 Presidential Presentment Final Boss

### Constitutional procedure and power

After both chambers pass identical text, the bill is enrolled and presented to the president. Under Article I, Section 7, the president may sign it or return it with objections. If the president takes no action for ten days, Sundays excluded, it becomes law if Congress remains able to receive a return. If an adjournment prevents return, it does not become law, the basis of a pocket veto. A regular veto may be overridden only by two-thirds in each chamber, voting separately.[2][3][11]

The president acts on the whole enrolled bill. The optional Evidence Ledger note on *Clinton v. City of New York* explains why federal line-item cancellation is not available.[12]

Target terms: enrollment, presentment, sign, regular veto, veto message, law without signature, pocket veto, override.

### State-driven presidential action

At the start of the run, the game discloses one fictional White House priority profile relevant to the chosen issue, such as cost restraint, national uniformity, state flexibility, or enforceability. This is not a real administration.

Every amendment updates a visible `WHITE HOUSE SIGNAL` using named reasons. The president's final action follows the complete bill state:

- clear alignment produces a signature;
- clear conflict produces a regular veto while Congress is in session;
- a narrow contested band may use bounded uncertainty;
- no action produces law without signature if return remains possible;
- only a late-presentment state combined with an adjournment that prevents return produces the game's pocket-veto card.

The player does not choose the president's action. Earlier decisions created it.

### Why and consequences

The veto protects executive independence and checks legislation. Federalist No. 73 describes it as an executive shield and a safeguard against improper laws. Because override is difficult, presidential preferences influence bargaining before presentment.[10]

### States

- **Enacted:** signature or law without signature.
- **Vetoed:** enter Scene 8.
- **Pocket vetoed:** end run; no returned bill exists for an override attempt.

### Scope treatment of presidential inaction

The no-action and pocket-veto outcomes use result cards, not new levels. This preserves constitutionally useful content at minimal development cost. Do not add disputed intra-session pocket-veto edge cases.

## Scene 8 Veto Override Boss

### Procedure and power

A regular veto returns the bill with objections to the chamber of origin. That chamber reconsiders first. If two-thirds of those voting, with a quorum, approve, the other chamber then votes under the same threshold. Only success in both chambers overrides the veto.[2][3]

### Encounter

The veto message identifies the provisions that caused the objection. Text is locked; the player cannot rewrite an enrolled bill during reconsideration. The only player action is choosing which existing justification to emphasize in the bill's defense. This changes a narrow forecast factor but does not create magical votes.

The House and Senate override bars resolve separately. Under the full-participation simulation, the displayed reference thresholds are 290 House votes and 67 Senate votes, with a tooltip explaining the actual “two-thirds voting with a quorum” rule.

### States

- **Enacted over veto:** both chambers reach two-thirds.
- **Veto sustained:** either chamber fails. The run ends with the institution and threshold identified.

Override should be possible but uncommon. It is not a consolation roll.

## Scene 9 End-of-Run Bill Comparison and Debrief

### Required visual comparison

The main ending screen has two full columns:

| Bill as Introduced | Law as Enacted or Final Failed Text |
| --- | --- |
| Original three provisions | Every surviving and added provision |
| Player's original priority | Final status of that priority |
| Initial constitutional basis | Same basis, plus any scope warning if text changed materially |

Each clause receives one status:

- `UNCHANGED`
- `AMENDED` with before-and-after language
- `REMOVED`
- `ADDED` with institutional origin

Selecting a clause opens its provenance timeline: committee, markup, House, Senate, bicameral compromise, or no change.

### Neutral result dimensions

The game reports facts, not a political quality score:

- enacted or not enacted;
- original provisions preserved;
- provisions amended, removed, or added;
- number and location of compromises;
- stage and rule that ended a failed run;
- AP concepts and evidence correctly identified in the final claim.

Do not calculate an overall “good law,” ideology, or policy-success score.

### Claim builder

The player completes:

> Federal lawmaking combines **[constitutional concurrence requirements / a single national majority]** with **[chamber-created agenda and debate rules / presidential control of Congress]**. In this run, those institutions **[required changing coalitions and altered or threatened the bill's text / guaranteed the introduced text a vote]**. This structure can **[broaden deliberation and check power while also favoring delay and the status quo / remove trade-offs from policymaking]**.

Incorrect choices receive a source-linked explanation and can be revised. This is the explicit rubric line of reasoning.

### Outcome-specific explanation

If enacted:

> The law survived because its current text assembled the coalition required at each gate. Enactment did not prove that every provision was popular or optimal. It proved that identical text secured the necessary institutional consent.

If defeated:

> Failure does not prove that the original idea lacked public support or policy merit. The bill failed because one actor or coalition with procedural power withheld access or consent under the rule shown above.

## Evidence Ledger

The Ledger is available from every scene and uses five fields: source, authority type, proposition, scene experienced, and analytical consequence.

| Evidence | Proposition used | Mechanical connection |
| --- | --- | --- |
| Constitution Article I Section 1 | Legislative power is vested in a House and Senate | Two-chamber route and identical-text requirement |
| Constitution Article I Sections 2 and 3 plus Seventeenth Amendment context | Chambers have different representation bases and terms | Different House and Senate coalition pressures |
| Constitution Article I Section 5 | Each chamber determines its proceedings | House special rule versus Senate consent and cloture |
| Constitution Article I Section 7 Clause 1 | Revenue bills originate in the House; Senate may amend | Corrects “all bills start in the House” |
| Constitution Article I Section 7 Clauses 2 and 3 | Presentment, veto, ten-day rule, and override | Final boss and override |
| Constitution Article I Section 8 | Enumerated powers support federal legislation | Issue builder |
| Constitution Article II Section 3 | President may recommend measures | White House influence before presentment |
| Federalist No. 10 | Legislation manages competing interests and factions | Provision-based coalitions and hearings |
| Federalist No. 51 | Divided institutions check concentrated power | Overall thesis |
| Federalist No. 62 | Distinct chambers and mixed representation add security | Bicameral fake-out and compromise |
| Federalist No. 73 | Qualified veto protects executive independence and checks legislation | Presidential final boss |
| Clinton v City of New York 1998 | Federal line-item cancellation violated the prescribed lawmaking process | Whole-bill action note only |

Federalist Nos. 10 and 51 and the Constitution carry the core AP foundational-evidence burden. Nos. 62 and 73 are supporting founding-era sources because they directly explain bicameralism and veto. The court case is narrow and optional; do not add unrelated required AP cases for decoration.

## Required vocabulary

The game must define and apply: agenda setting, amendment, bicameralism, calendar, cloture, committee chair, conference committee, conference report, co-sponsor, enumerated power, filibuster, germaneness, hearing, hold, jurisdiction, majority leader, markup, presentment, rider, sponsor, standing committee, subcommittee, unanimous consent, veto, veto point, and veto override.

Definitions must name the source of authority and the action the term permits. A glossary entry alone does not satisfy the rubric; each required term must appear in a scene or debrief.

## UI and art specification

### Persistent HUD

- Current institution and authority tag.
- Session clock labeled as a simulation abstraction.
- Current threshold and support forecast band.
- House passage, Senate passage, Senate cloture, or White House signal only when relevant.
- Three current provision icons plus any added clause.
- Bill File and Evidence Ledger buttons.

### Bill File

For each provision show introduced text, current text, status, source of change, support consequences, and policy consequence. Never display a bare `+10 votes` without the political reason.

### Pixel-art direction

- Crisp 16x16 or 32x32 tiles scaled with nearest-neighbor rendering.
- One Capitol tile family recolored for committee, House, Senate, conference, and executive scenes.
- Shared NPC bodies with small portraits and institutional props.
- Majority and minority use fictional gold and violet, not real party branding.
- The bill sprite gains stamps, attachments, strikeouts, and patches as its text changes.
- No combat animation is required.

### Accessibility

- Keyboard controls; mouse optional.
- No required rapid input.
- Pixel font for headings only; readable sans serif for explanations.
- Icons and labels in addition to color.
- Reduced motion and sound-off options.
- Captions for all audio cues.
- Target current school-laptop Chrome, Edge, Firefox, and Safari at 1280x720.

## Dialogue rules and approved samples

Dialogue is concise, dry, politically neutral, and institutionally specific.

- Clerk: “You have been introduced. You have not been promised attention.”
- Chair: “Referral gave this committee jurisdiction. It did not give you a hearing.”
- Markup clerk: “The committee is voting on your text, not your intentions.”
- Rules clerk: “First the House votes on how it will debate you.”
- Senator: “I may support your final passage and still object to ending debate on these terms.”
- Bicameral clerk: “Both chambers passed a bill. They did not pass the same bill.”
- President: “I receive one enrolled text. I do not get an eraser.”

Avoid partisan jokes, claims that Congress is inherently corrupt or useless, “talking forever” as the complete definition of filibuster, claims that lobbyists vote, and dialogue that treats compromise as moral weakness or automatic wisdom.

## Required features for submission

1. Three issues with four cards each and choose-three bill construction.
2. Immutable introduced-text snapshot and persistent current text.
3. Provenance for every amended, removed, or added clause.
4. Universal institutional encounter interface.
5. Introduction and jurisdiction scene.
6. Chair gate, hearing explanation, subcommittee amendment, and markup/report vote.
7. House structured-rule scene with separate rule and passage logic.
8. Senate scene with separate passage and cloture forecasts and conditional objection.
9. Bicameral fake-out and at least one legitimate resolution route; the second route may reuse the interface.
10. State-driven presidential response.
11. Regular-veto override with separate chamber thresholds.
12. Bill-as-introduced versus final-text debrief.
13. Evidence Ledger, glossary, and analytical claim builder.
14. Checkpoint retry and Institutional Autopsy after failure.
15. Keyboard accessibility and readable browser layout.
16. Visible source list and `SIMULATION` disclosures.

## Optional only after the required build is stable

- Suspension-of-the-rules playable House branch. The required build may explain it and use the structured-rule route.
- Distinct open-rule and closed-rule gameplay. A comparison panel is sufficient.
- Both amendment exchange and conference as meaningfully different animations. Shared logic is sufficient.
- No-action and pocket-veto animated sequences. Result cards are sufficient.
- Music beyond one loop and a few procedural sound effects.
- Local replay history showing earlier runs.
- Randomized White House priority profiles beyond one balanced profile per issue.
- Controller support.

## Six-day production plan

| Day | Required result |
| --- | --- |
| 1 | Core scene flow, bill builder, persistent state, Bill File |
| 2 | Universal encounter system, referral, committee, markup |
| 3 | House and Senate procedures, thresholds, bounded uncertainty |
| 4 | Bicameral comparison, presentment, override, debrief |
| 5 | Pixel-art pass, evidence, glossary, accessibility, responsive layout |
| 6 | Factual QA, three complete issue runs, bug fixes, deployment, rubric capture |

If behind, cut optional animation and alternate routes. Do not cut persistent text, House-Senate differences, bicameral reconciliation, presentment, evidence, or debrief.

## Factual accuracy audit

### Corrected and locked

| Risk | Required correction |
| --- | --- |
| One mandatory conveyor-belt path | State that routes vary; label compressed and selected routes |
| All obstacles called constitutional veto points | Separate constitutional concurrence from chamber rules and practice |
| All bills start in the House | State that only revenue-raising bills face House origination; these start there by design |
| Referral equals consideration | Chair gate follows referral; hearing and markup are not guaranteed |
| Hearing required | Hearing is optional but informative and strategic |
| Subcommittee reports to chamber | Full committee must report |
| Calendar equals floor vote | Calendar creates eligibility; leadership still schedules |
| Every House bill uses Rules Committee | Explain suspension; canonical build uses a special rule |
| House always needs 218 | Explain majority of those voting with quorum; fixed count is a simulation assumption |
| Every Senate bill needs 60 | Limit surprise cloture to ordinary contested legislation; explain UC and expedited exceptions |
| Cloture equals passage | Maintain separate forecasts and votes |
| Hold is a formal veto | Label hold as informal practice |
| All Senate amendments are non-germane | State that germaneness often is not required before cloture, subject to agreements and rules |
| Conference always follows two versions | Teach amendment exchange and conference; do not make conference automatic |
| President edits clauses | Whole-bill action only |
| No action always pocket-vetoes | Distinguish law without signature from adjournment preventing return |
| Override is one congressional vote | Two separate chamber votes at two-thirds |
| Bill persists forever | Time expiration requires reintroduction in a later Congress |

### Implementation-time verification required

1. Recheck House and Senate rules if implementation moves beyond the 119th Congress.
2. Use generic committee and subcommittee names unless current jurisdiction and names are re-verified.
3. Do not add budget reconciliation, fast-track statutes, nominations, or treaty procedure to the ordinary-legislation Senate encounter.
4. Keep the pocket-veto branch to the clear case in which adjournment prevents return; do not improvise disputed edge cases.
5. If an issue's operative text changes materially, recheck its asserted constitutional basis and referral.

## Rubric coverage audit

### Application of Course Concepts 35 points

The game names and applies course concepts through consequences. Jurisdiction determines the route; the chair controls attention; subcommittee expertise produces technical change; markup changes text; House rules constrain amendments; Senate debate rules create a coalition distinct from final passage; bicameralism requires identical text; presentment creates an executive check. Each encounter explains who has power, why it exists, and the representation and policymaking trade-off.

### Foundational Evidence 30 points

The Evidence Ledger ties exact constitutional provisions and relevant Federalist arguments to the mechanic they explain. Article I, Sections 1, 5, 7, and 8 do the central work. Federalist Nos. 10 and 51 provide required AP evidence. Federalist Nos. 62 and 73 add directly relevant support. *Clinton* appears only to clarify the absence of a federal line-item cancellation power.

### Analysis and Line of Reasoning 30 points

The thesis appears at the start, recurs in the compromise loop, and is completed in the ending claim builder. The causal chain is explicit: constitutional concurrence plus chamber rules creates sequential gates; each gate changes the coalition required; changing coalitions can alter, delay, or defeat the text; the structure checks power and represents different constituencies while also strengthening gatekeepers and the status quo.

### Presentation and Mechanics 5 points

One encounter grammar, a persistent Bill File, readable thresholds, checkpoint retries, neutral language, and browser accessibility keep the project organized. The acceptance checks below prevent the common conceptual errors that would distract from the content.

### Final rubric acceptance checks

- Can the player explain why the bill changed, not merely where?
- Can the player identify the actor with formal power at every gate?
- Are House and Senate procedures mechanically different?
- Are cloture and passage visibly separate?
- Does the fake-out require identical text before presentment?
- Does the final action follow accumulated bill state?
- Does the debrief cite specific constitutional evidence and state a defensible trade-off?
- Can the full run be completed and understood in 15 minutes?

## Cut list before submission

These ideas sound attractive but should not be built before the required game is complete:

1. Open-world Capitol exploration.
2. Combat, bullet-dodging amendments, or reflex-based vote collection.
3. Procedurally generated policy issues or bill text.
4. More than three issue sets or more than four starting cards per issue.
5. Real legislators, parties, current vote counts, or contemporary partisan branding.
6. A simulation of all 535 members.
7. Playable lobbying, campaign finance, elections, or public-opinion systems.
8. A full discharge-petition route.
9. Separate bespoke minigames for hearings, subcommittees, markup, and conference.
10. Distinct codebases or maps for each policy issue.
11. Full budget reconciliation, appropriations, Byrd Rule, or omnibus procedure.
12. Nominations, treaties, judicial review, agency rulemaking, or implementation after enactment.
13. Multiple playable presidents or ideological administration selection.
14. Voice acting, elaborate cutscenes, or custom animation for every branch.
15. Online accounts, multiplayer, leaderboards, or cloud saves.
16. A morality score, ideology score, “best law” rating, or reward for one policy outcome.
17. A second full ping-pong game if the clause-comparison interface already teaches bicameral agreement.
18. Detailed pocket-veto edge-case simulation.
19. Mobile-first touch controls before the school-laptop build works.
20. Any polish pass that delays factual QA or a complete deployed run.

## Submission description

> **Bill Quest Federal Edition** is a 10-15 minute pixel-art browser game for AP U.S. Government students. The player chooses a neutral policy issue, builds a fictional federal bill, and decides how much of its original text to change as committees, House rules, Senate debate, bicameral disagreement, and presidential presentment act on it. The bill's support forecast comes from its provisions and compromises rather than arbitrary luck. At the end, the game compares the bill as introduced with the law as enacted or the text that failed, identifies which institutions changed it, and connects the run to the Constitution and relevant Federalist Papers.

## Handoff rule for the coding agent

Implement required systems and content before optional polish. Technical decisions may change layout, animation, and data structures. They may not change who holds institutional power, the distinction between constitutional requirements and chamber rules, the vote thresholds, the difference between cloture and passage, the identical-text requirement, or the relationship between accumulated bill state and presidential action without new source verification.

## Source ledger

1. **Attached assignment:** *Activity 5 Legislative Branch Bill to a Law Mini Project with Rubric*, deadline September 23, 2026. Source for format, audience, description requirement, and scoring categories.
2. **U.S. Constitution, National Archives transcript:** https://www.archives.gov/founding-docs/constitution-transcript. Primary source for Article I, Sections 1, 2, 3, 5, 7, and 8 and Article II, Section 3.
3. **Congressional Research Service, R42843, Introduction to the Legislative Process in the U.S. Congress, updated November 19, 2025:** https://www.everycrsreport.com/reports/R42843.html. Nonpartisan institutional source for introduction, referral, committees, hearings, markup, scheduling, House and Senate floor procedures, resolving differences, and presidential action. The page reproduces the CRS report because direct CRS access may block automated retrieval.
4. **U.S. Senate, About Filibusters and Cloture:** https://www.senate.gov/about/powers-procedures/filibusters-cloture/overview.htm. Official source for filibuster history and the modern three-fifths cloture threshold on legislation.
5. **U.S. House Committee on Rules, Special Rule Types:** https://rules.house.gov/about/special-rule-types. Official source for open, structured, and closed special rules.
6. **GovInfo, House Rules and Manual and House Practice:** https://www.govinfo.gov/app/collection/HMAN and https://www.govinfo.gov/help/house-practice. Official sources for House rules, precedents, jurisdiction, and floor procedure.
7. **Federalist No. 10:** https://avalon.law.yale.edu/18th_century/fed10.asp. Primary founding-era argument on factions and competing interests in legislation.
8. **Federalist No. 51:** https://avalon.law.yale.edu/18th_century/fed51.asp. Primary founding-era argument for divided institutions and checks on power.
9. **Federalist No. 62:** https://avalon.law.yale.edu/18th_century/fed62.asp. Primary founding-era argument on Senate representation, stability, and concurrence by distinct bodies.
10. **Federalist No. 73:** https://avalon.law.yale.edu/18th_century/fed73.asp. Primary founding-era defense of the executive veto.
11. **Constitution Annotated, Article I Section 7:** https://constitution.congress.gov/browse/article-1/section-7/. Institutional legal reference for origination and presentment.
12. **Clinton v. City of New York, 524 U.S. 417 1998:** https://supreme.justia.com/cases/federal/us/524/417/. Opinion reference for the optional line-item-cancellation note.
