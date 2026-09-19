// Required conversations explain the rules before a player makes a decision.
export const conversations = {
  referral: { speaker: 'Referral clerk', beats: [
    'Your sponsor has introduced H.R. SIM-1. We have a copy of the original, so you can see what changes along the way.',
    'Next stop: the communications committee. The Speaker makes the referral with advice from the Parliamentarian. It depends on what your bill covers.',
    'We start in the House here. Bills can also start in the Senate, though the Constitution requires bills that raise revenue to start in the House.'
  ] },
  committee: { speaker: 'Committee chair', beats: [
    'We handle communications policy, so your bill came to us. Plenty of bills arrive here and never get a hearing.',
    'I put yours on the schedule. At the hearing, a local operator raised a problem: some providers may struggle with these requirements.',
    'The subcommittee has suggested a change. We will consider it here in the full committee, which decides whether to send the bill to the House floor.'
  ] },
  markup: { speaker: 'Committee chair', beats: [
    'This meeting is called markup. Members propose changes to the bill, and we work through them.',
    'Here is the next amendment. Check what it changes, especially if it affects the provision you wanted to keep.',
    'You have heard people ask for different things. That is the kind of conflict Madison discusses in Federalist 10: groups bring different interests to lawmaking.'
  ] },
  report: { speaker: 'Committee clerk', beats: [
    'We have finished considering those changes. Now the full committee votes on whether to report the bill.',
    'For this game, our committee has 25 members and everyone votes. You need 13.',
    'If it passes, it goes on the calendar. House leaders still have to make room for it on the floor.'
  ] },
  houseRule: { speaker: 'House leadership aide', beats: [
    'Your bill has a spot on the schedule. First, the House needs to agree on the rules for this debate.',
    'The Rules Committee has proposed a structured rule allowing two amendments. Someone also submitted a school-uniform proposal. That one is outside the rule, so it will not get a vote here.',
    'Article I, Section 5 lets each chamber set its own procedures. A structured rule is one House option. Other bills follow different rules or the suspension process.'
  ] },
  houseAmend: { speaker: 'Representative Vale', beats: [
    'We can consider this amendment under the rule the House just adopted. It changes how the bill would work in practice.',
    'The other amendment just clarified the short title. Its sponsor withdrew it, so we can focus on this one.',
    'Tell us which wording you want to defend. Members will decide whether to adopt the change.'
  ] },
  houseVote: { speaker: 'House clerk', beats: [
    'Time for the passage vote. Some members want the upgrades for their districts. Others are worried about the cost.',
    'Passage usually takes a majority of those voting, with a quorum present. In this game, all 435 House members vote. That makes 218 the number to reach.',
    'If it passes, we send this version to the Senate. They can change it, reject it, or leave it waiting.'
  ] },
  senateAmend: { speaker: 'Senate committee staffer', beats: [
    'We have received the House bill. Senators represent whole states, two per state, so they may bring different concerns to it.',
    'We will keep the Senate committee work brief here. In real life, getting through the House does not guarantee Senate action.',
    'Our committee has a change to consider. If we adopt it, keep an eye on the House and Senate copies. They may no longer match.'
  ] },
  senateRoute: { speaker: 'Senator Rowan', beats: [
    'I might vote for your bill. That does not mean I agree to the proposed limits on debate.',
    'Check the two counts. One tells you who supports passage. The other tells you who would vote to end debate.',
    'If nobody objects, a consent agreement can get us to a vote. Otherwise, sponsors may negotiate or seek cloture. The Senate does not need a cloture vote on every bill.'
  ] },
  cloture: { speaker: 'Senate parliamentarian', beats: [
    'At least 16 senators have signed the cloture motion. There is a required waiting period. Here, that costs three session ticks.',
    'For ordinary legislation like this bill, cloture takes three-fifths of senators duly chosen and sworn. With all 100 seats filled, you need 60.',
    'If cloture passes, further debate is limited. We still have to hold a separate vote on the bill itself.'
  ] },
  senateVote: { speaker: 'Senate clerk', beats: [
    'We can vote on passage now. The number to reach is 51.',
    'Everyone votes in this game, and we leave out vice-presidential tie-breaks. These are made-up vote counts, not predictions about real senators.',
    'If the bill passes, we will check this version against the one the House approved.'
  ] },
  reconcile: { speaker: 'Bicameral clerk', beats: [
    'Both chambers voted yes. Let me check the paperwork before we send anything to the president.',
    'Under Article I, the House and Senate must approve the same text. Even one remaining difference has to be settled.',
    'Here are the two copies. We will use an exchange of amendments to reach agreement. Congress can also appoint a conference committee, but it does not have to.'
  ] },
  houseConcur: { speaker: 'House clerk', beats: [
    'This wording has changed since our last vote. The House needs to approve it too.',
    'The negotiators have made their proposal. Now let us see whether a majority of members will accept it.'
  ] },
  senateConcur: { speaker: 'Senate clerk', beats: [
    'The House has agreed to this version. Now it is our turn.',
    'Senators have agreed to a timetable for this vote. That agreement is part of this game’s story; it is not an automatic exception to Senate debate rules.',
    'We are voting on exactly the text the House approved.'
  ] },
  president: { speaker: 'Executive staffer', beats: [
    'Welcome. Both chambers have approved the same text, and the enrolled bill is ready for the president.',
    'The president wants to keep costs down, give providers time to make the upgrades, and improve access to alerts nationwide. We have been watching your changes.',
    'Article I, Section 7 sets out presentment. The president acts on the whole bill. In this version of the game, you will get a signature or a returned veto.'
  ] },
  overrideHouse: { speaker: 'House clerk', beats: [
    'The president sent the bill back with objections. It comes to the House first because this is where it started.',
    'We can try to override the veto, but we must vote on the same text. We cannot revise it during this vote.',
    'An override needs two-thirds of those voting, with a quorum. With everyone voting here, that means 290. If we reach it, the Senate votes next.'
  ] },
  overrideSenate: { speaker: 'Senate clerk', beats: [
    'The House voted to override. We still need to decide for ourselves.',
    'The bill has not changed. With all 100 senators voting, 67 must support the override for it to become law.'
  ] }
};
