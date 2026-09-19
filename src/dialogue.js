// Required conversations explain institutional rules with authentic character voices.
export const conversations = {
  referral: { speaker: 'Referral clerk', beats: [
    'H.R. SIM-1 is officially on the docket. The sponsor dropped it in the hopper, and we have preserved the original text right here in your bill file so every future amendment can be tracked.',
    'Next stop: the communications committee. Under House procedure, the Speaker refers the bill based on formal advice from the Parliamentarian, matching the bill’s subject to committee jurisdiction.',
    'Because your bill touches interstate communications, Article I, Section 8 provides authority. Note that while bills can start in the Senate, the Origination Clause requires revenue measures to start right here in the House.'
  ] },
  committee: { speaker: 'Committee chair', beats: [
    'Welcome to my committee room. As chair, I determine our agenda—hundreds of bills land on my desk every term and die quietly without ever receiving a hearing.',
    'I granted your bill a hearing because emergency alerts save lives. But a municipal operator testified earlier that small local systems simply don’t have the funding to upgrade immediately.',
    'My subcommittee drafted a compromise amendment. We’ll debate it here in full committee markup before deciding whether to report the bill to the House floor.'
  ] },
  markup: { speaker: 'Committee chair', beats: [
    'The committee will come to order for markup. This is where members offer specific textual amendments and battle over policy language.',
    'Here is the first proposed amendment. Review the changes carefully, especially if it alters the core provision you promised your coalition.',
    'You are watching Madison’s Federalist 10 in real time. Competing economic and regional factions will always push their own interests. Our job is hammering out a coalition.'
  ] },
  report: { speaker: 'Committee clerk', beats: [
    'The amendment period is closed. The question now before the full committee is whether to order H.R. SIM-1 favorably reported.',
    'Under our rules, this committee has 25 members, and all 25 will vote today. To report the bill out, you must secure 13 votes.',
    'Reporting the bill places it on the House Union Calendar. But remember: getting on the calendar does not guarantee floor consideration. That decision belongs to party leadership.'
  ] },
  houseRule: { speaker: 'House leadership aide', beats: [
    'Listen quickly: leadership wants this bill on the floor, but first we must pass a special rule from the Rules Committee to govern debate.',
    'The Rules Committee shaped a structured rule allowing only two specific amendments. Someone tried offering an unrelated school-uniform rider, but it was ruled out of order for lacking germaneness.',
    'Article I, Section 5 allows each chamber to set its own rules. Unlike the Senate’s open debate, the House relies on special rules or suspension to manage 435 members efficiently.'
  ] },
  houseAmend: { speaker: 'Representative Vale', beats: [
    'I support modernizing alerts for my suburban commuters, but colleagues from rural districts worry about the compliance timeline for their local utilities.',
    'Under the structured rule, we can debate this single substantive amendment. The other filed amendment was noncontroversial and withdrawn.',
    'Will your supporters back this amendment or defend the existing text? Your choice will shape how my colleagues cast their votes on final passage.'
  ] },
  houseVote: { speaker: 'House clerk', beats: [
    'The House is assembled for final passage. Members have heard from their districts on both public safety benefits and financial burdens.',
    'Article I passage requires a majority of members present and voting. In our simulation, all 435 seats vote, making 218 the constitutional target.',
    'If the yeas prevail, the clerk will engross this version and transmit it to the Senate. If not, the bill dies on the floor.'
  ] },
  senateAmend: { speaker: 'Senate committee staffer', beats: [
    'H.R. SIM-1 has arrived from the House. Every senator here represents an entire state, which brings distinct regional challenges to the table.',
    'We have streamlined our Senate committee markup here. In the real Senate, passing the House gives a bill zero guarantee of even being taken up.',
    'Our senators drafted an amendment addressing rural broadband carriers. Adopting it will mean the House and Senate texts no longer match.'
  ] },
  senateRoute: { speaker: 'Senator Rowan', beats: [
    'I am sympathetic to this policy, but in the United States Senate, every individual member holds significant leverage over floor scheduling.',
    'Look at your forecasts: one shows support for passage, but the other shows whether senators will vote to limit debate. Those are two entirely separate tests.',
    'A unanimous consent agreement can schedule a final vote quickly, provided no senator objects. If someone holds the bill, sponsors must file for cloture.'
  ] },
  cloture: { speaker: 'Senate parliamentarian', beats: [
    'A cloture petition signed by sixteen senators has been filed under Senate Rule XXII. A mandatory procedural waiting period applies, costing three session ticks.',
    'On ordinary legislation, invoking cloture requires three-fifths of all senators duly chosen and sworn—a rigid 60 votes out of 100.',
    'Cloture merely cuts off the filibuster and limits debate to thirty hours. It is not final passage; the Senate must still hold an independent vote on the bill itself.'
  ] },
  senateVote: { speaker: 'Senate clerk', beats: [
    'The Senate proceeds to the question of passage. With all 100 senators participating, 51 affirmative votes are required to pass.',
    'These totals reflect simulated voting blocs, omitting vice-presidential tie-breakers. If approved, we will compare this Senate engrossment with the House version.'
  ] },
  reconcile: { speaker: 'Bicameral clerk', beats: [
    'Both the House and Senate have voted yes. But under the Bicameralism Clause of Article I, Section 7, Congress cannot present differing texts to the President.',
    'Even minor differences must be resolved. Congress often uses an amendment exchange—sending amendments between the chambers—or convenes a formal conference committee.',
    'Here are the two approved versions side by side. We will resolve this through amendment exchange, sending one unified proposal for chamber approval.'
  ] },
  houseConcur: { speaker: 'House clerk', beats: [
    'The Senate has returned our bill with modified language. Under Article I, the House must vote to concur in the Senate amendment before it can become law.',
    'Members will now vote on whether to accept this compromised wording or insist on their original version.'
  ] },
  senateConcur: { speaker: 'Senate clerk', beats: [
    'The House has agreed to a final compromise package. The Senate must now vote on whether to concur in the House amendment.',
    'By prior consent agreement, this final concurrence vote is scheduled without delay. The identical text must be ratified.'
  ] },
  president: { speaker: 'Executive staffer', beats: [
    'Welcome to the Executive Office. Both chambers have formally enrolled identical text and presented it to the President pursuant to Article I, Section 7.',
    'The President evaluates the entire enrolled bill together—there is no line-item veto. Our administration balances rapid public alert safety against compliance costs for rural infrastructure.',
    'If the bill aligns with administration priorities, the President signs it into law. If not, the President returns it with objections for a regular veto.'
  ] },
  overrideHouse: { speaker: 'House clerk', beats: [
    'The President has vetoed H.R. SIM-1 and returned it with objections to the House, where the bill originated as required by the Constitution.',
    'We cannot amend the text during an override. We must vote on the enrolled bill as returned, requiring two-thirds of voting members—290 votes.',
    'If the House achieves two-thirds, the bill and objections move immediately to the Senate for their reconsideration.'
  ] },
  overrideSenate: { speaker: 'Senate clerk', beats: [
    'The House has successfully voted to override the executive veto. The constitutional question now recurs to the Senate: shall the bill become law, the President’s objections notwithstanding?',
    'The text is completely frozen. Overriding requires two-thirds of the Senate—67 votes out of 100. If we reach 67, the bill becomes public law immediately.'
  ] }
};
