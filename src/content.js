export const cards = {
  "standard": {
    "name": "National accessibility standard",
    "icon": "◈",
    "reason": "People who need accessible alerts gain a nationwide standard. Providers worry about the work needed to meet it.",
    "versions": [
      "FCC must establish minimum visual, audio, and assistive-technology standards for interstate emergency alerts.",
      "FCC must establish accessibility standards with phased compliance for small providers."
    ],
    "effects": [
      [
        10,
        3,
        2,
        3
      ],
      [
        14,
        5,
        5,
        1
      ]
    ],
    "trade": "Smaller providers get more time to adjust. People who need accessible alerts have to wait longer."
  },
  "grants": {
    "name": "Upgrade grants",
    "icon": "▦",
    "reason": "State and local officials welcome help paying for upgrades. Other lawmakers worry about the federal bill.",
    "versions": [
      "Authorize $600 million in grants for state and local emergency-alert upgrades.",
      "Authorize $300 million in targeted grants, prioritizing systems with the greatest technical need."
    ],
    "effects": [
      [
        18,
        6,
        4,
        -3
      ],
      [
        12,
        7,
        7,
        2
      ]
    ],
    "trade": "The smaller grant program costs less, but it leaves fewer systems with funding."
  },
  "deadline": {
    "name": "Two-year deadline",
    "icon": "◷",
    "reason": "People would get better alerts sooner. Small providers may struggle to finish the work in time.",
    "versions": [
      "Require covered emergency-alert upgrades within two years.",
      "Require covered emergency-alert upgrades within four years, with annual progress reports."
    ],
    "effects": [
      [
        -8,
        -3,
        -5,
        -2
      ],
      [
        8,
        6,
        8,
        2
      ]
    ],
    "trade": "Providers have more time to finish the upgrades. People wait two more years for the improvements."
  },
  "waiver": {
    "name": "Hardship waiver",
    "icon": "◇",
    "reason": "Rural providers get extra time when technical problems get in the way. Some communities will receive improvements later.",
    "versions": [
      "Permit temporary hardship waivers of up to two years for documented technical barriers.",
      "Limit hardship waivers to one year and require a public corrective-action plan."
    ],
    "effects": [
      [
        10,
        4,
        4,
        1
      ],
      [
        8,
        3,
        2,
        3
      ]
    ],
    "trade": "Providers have less time to fix technical problems, but fewer people are left waiting for better alerts."
  }
};

export const sources = {
  "powers": {
    "title": "Article I, Section 8",
    "tag": "CONSTITUTION",
    "text": "Article I, Section 8 lists Congress’s powers. This bill deals with communications across state lines, so it draws on the Commerce Clause and the Necessary and Proper Clause.",
    "url": "https://www.archives.gov/founding-docs/constitution-transcript"
  },
  "procedure": {
    "title": "Congressional legislative process",
    "tag": "PRACTICE",
    "text": "A referral sends a bill to the committee responsible for its subject. The committee may hear testimony and work on the text, but it can also leave the bill waiting. Leaders decide which bills get floor time. This game follows one possible route.",
    "url": "https://www.congress.gov/legislative-process"
  },
  "rules": {
    "title": "Article I, Section 5 · House special rules",
    "tag": "HOUSE RULE",
    "text": "Article I, Section 5 lets each chamber set its rules. Under a structured House rule, only specified amendments can be considered. Open rules allow more amendments; closed rules generally allow none.",
    "url": "https://rules.house.gov/about/special-rule-types"
  },
  "cloture": {
    "title": "Senate Rule XXII · Cloture",
    "tag": "SENATE RULE",
    "text": "For ordinary legislation, cloture normally takes three-fifths of senators duly chosen and sworn. It limits debate, but passage still needs its own vote. A consent agreement may let senators reach that vote without cloture.",
    "url": "https://www.senate.gov/about/powers-procedures/filibusters-cloture/overview.htm"
  },
  "concurrence": {
    "title": "Article I, Sections 1 and 7",
    "tag": "CONSTITUTION",
    "text": "Both chambers must approve exactly the same bill before it goes to the president. If the Senate changes the House version, those differences have to be settled first.",
    "url": "https://www.archives.gov/founding-docs/constitution-transcript"
  },
  "veto": {
    "title": "Article I, Section 7 · Presentment",
    "tag": "CONSTITUTION",
    "text": "The president can sign the whole bill or return it with objections. Congress can override a returned veto with two-thirds voting in each chamber, with a quorum. After ten days, excluding Sundays, an unsigned bill becomes law unless an adjournment prevents its return.",
    "url": "https://www.archives.gov/founding-docs/constitution-transcript"
  },
  "faction": {
    "title": "Federalist No. 10",
    "tag": "FOUNDATIONAL ARGUMENT",
    "text": "Madison describes how groups with different interests compete over public policy. You can see that in this bill: a deadline that helps people get alerts sooner can also worry the providers who must meet it.",
    "url": "https://avalon.law.yale.edu/18th_century/fed10.asp"
  },
  "checks": {
    "title": "Federalist No. 51",
    "tag": "FOUNDATIONAL ARGUMENT",
    "text": "Madison argues that divided powers help keep one part of government from taking control. Your bill needs agreement from several institutions. That gives more people a say, but it also gives them more chances to stop it.",
    "url": "https://avalon.law.yale.edu/18th_century/fed51.asp"
  }
};

export const stages = [
  "Draft",
  "Referral",
  "Committee",
  "House",
  "Senate",
  "Agreement",
  "President",
  "Debrief"
];

export const scenes = {
  "referral": {
    "step": 1,
    "tag": "PRACTICE",
    "actor": "Speaker · Parliamentarian",
    "title": "Your bill has a committee.",
    "text": "Your sponsor has introduced H.R. SIM-1. We have a copy of the original, so you can see what changes along the way. Next stop: the communications committee. The Speaker makes the referral with advice from the Parliamentarian. It depends on what your bill covers.",
    "lesson": "We start in the House here. Bills can also start in the Senate, though the Constitution requires bills that raise revenue to start in the House.",
    "evidence": "procedure"
  },
  "committee": {
    "step": 2,
    "tag": "PRACTICE",
    "actor": "Committee chair · Subcommittee",
    "title": "The chair has a question.",
    "text": "We handle communications policy, so your bill came to us. Plenty of bills arrive here and never get a hearing. I put yours on the schedule. At the hearing, a local operator raised a problem: some providers may struggle with these requirements.",
    "lesson": "The subcommittee has suggested a change. We will consider it here in the full committee, which decides whether to send the bill to the House floor.",
    "evidence": "procedure"
  },
  "markup": {
    "step": 2,
    "tag": "HOUSE RULE",
    "actor": "Full committee",
    "title": "A change to consider",
    "text": "This meeting is called markup. Members propose changes to the bill, and we work through them. Here is the next amendment. Check what it changes, especially if it affects the provision you wanted to keep.",
    "lesson": "You have heard people ask for different things. That is the kind of conflict Madison discusses in Federalist 10: groups bring different interests to lawmaking.",
    "evidence": "faction"
  },
  "report": {
    "step": 2,
    "tag": "HOUSE RULE",
    "actor": "Full committee",
    "title": "The committee is ready to vote.",
    "text": "We have finished considering those changes. Now the full committee votes on whether to report the bill. For this game, our committee has 25 members and everyone votes. You need 13.",
    "lesson": "If it passes, it goes on the calendar. House leaders still have to make room for it on the floor.",
    "evidence": "procedure"
  },
  "houseRule": {
    "step": 3,
    "tag": "HOUSE RULE",
    "actor": "House majority leadership · Rules Committee",
    "title": "Set the rules for debate",
    "text": "Your bill has a spot on the schedule. First, the House needs to agree on the rules for this debate. The Rules Committee has proposed a structured rule allowing two amendments. Someone also submitted a school-uniform proposal. That one is outside the rule, so it will not get a vote here.",
    "lesson": "Article I, Section 5 lets each chamber set its own procedures. A structured rule is one House option. Other bills follow different rules or the suspension process.",
    "evidence": "rules"
  },
  "houseAmend": {
    "step": 3,
    "tag": "HOUSE RULE",
    "actor": "House members",
    "title": "A member proposes a change.",
    "text": "We can consider this amendment under the rule the House just adopted. It changes how the bill would work in practice. The other amendment just clarified the short title. Its sponsor withdrew it, so we can focus on this one.",
    "lesson": "Tell us which wording you want to defend. Members will decide whether to adopt the change.",
    "evidence": "rules"
  },
  "houseVote": {
    "step": 3,
    "tag": "CONSTITUTION",
    "actor": "House of Representatives",
    "title": "The House takes a vote.",
    "text": "Time for the passage vote. Some members want the upgrades for their districts. Others are worried about the cost. Passage usually takes a majority of those voting, with a quorum present. In this game, all 435 House members vote. That makes 218 the number to reach.",
    "lesson": "If it passes, we send this version to the Senate. They can change it, reject it, or leave it waiting.",
    "evidence": "concurrence"
  },
  "senateAmend": {
    "step": 4,
    "tag": "SIMULATION",
    "actor": "Senate communications committee",
    "title": "The Senate has its own concerns.",
    "text": "We have received the House bill. Senators represent whole states, two per state, so they may bring different concerns to it. We will keep the Senate committee work brief here. In real life, getting through the House does not guarantee Senate action.",
    "lesson": "Our committee has a change to consider. If we adopt it, keep an eye on the House and Senate copies. They may no longer match.",
    "evidence": "concurrence"
  },
  "senateRoute": {
    "step": 4,
    "tag": "SENATE RULE",
    "actor": "Senate leaders · Individual senators",
    "title": "Can we get to a vote?",
    "text": "I might vote for your bill. That does not mean I agree to the proposed limits on debate. Check the two counts. One tells you who supports passage. The other tells you who would vote to end debate.",
    "lesson": "If nobody objects, a consent agreement can get us to a vote. Otherwise, sponsors may negotiate or seek cloture. The Senate does not need a cloture vote on every bill.",
    "evidence": "cloture"
  },
  "cloture": {
    "step": 4,
    "tag": "SENATE RULE",
    "actor": "Senators pursuing cloture",
    "title": "The vote to limit debate",
    "text": "At least 16 senators have signed the cloture motion. There is a required waiting period. Here, that costs three session ticks. For ordinary legislation like this bill, cloture takes three-fifths of senators duly chosen and sworn. With all 100 seats filled, you need 60.",
    "lesson": "If cloture passes, further debate is limited. We still have to hold a separate vote on the bill itself.",
    "evidence": "cloture"
  },
  "senateVote": {
    "step": 4,
    "tag": "CONSTITUTION",
    "actor": "United States Senate",
    "title": "The Senate votes on passage.",
    "text": "We can vote on passage now. The number to reach is 51. Everyone votes in this game, and we leave out vice-presidential tie-breaks. These are made-up vote counts, not predictions about real senators.",
    "lesson": "If the bill passes, we will check this version against the one the House approved.",
    "evidence": "cloture"
  },
  "reconcile": {
    "step": 5,
    "tag": "CONSTITUTION",
    "actor": "House and Senate negotiators",
    "title": "Do the two copies match?",
    "text": "Both chambers voted yes. Let me check the paperwork before we send anything to the president. Under Article I, the House and Senate must approve the same text. Even one remaining difference has to be settled.",
    "lesson": "Here are the two copies. We will use an exchange of amendments to reach agreement. Congress can also appoint a conference committee, but it does not have to.",
    "evidence": "concurrence"
  },
  "houseConcur": {
    "step": 5,
    "tag": "CONSTITUTION",
    "actor": "House of Representatives",
    "title": "Will the House agree?",
    "text": "This wording has changed since our last vote. The House needs to approve it too.",
    "lesson": "The negotiators have made their proposal. Now let us see whether a majority of members will accept it.",
    "evidence": "concurrence"
  },
  "senateConcur": {
    "step": 5,
    "tag": "CONSTITUTION",
    "actor": "United States Senate",
    "title": "Will the Senate agree?",
    "text": "The House has agreed to this version. Now it is our turn. Senators have agreed to a timetable for this vote. That agreement is part of this game’s story; it is not an automatic exception to Senate debate rules.",
    "lesson": "We are voting on exactly the text the House approved.",
    "evidence": "concurrence"
  },
  "president": {
    "step": 6,
    "tag": "CONSTITUTION",
    "actor": "President",
    "title": "The bill reaches the president.",
    "text": "Welcome. Both chambers have approved the same text, and the enrolled bill is ready for the president. The president wants to keep costs down, give providers time to make the upgrades, and improve access to alerts nationwide. We have been watching your changes.",
    "lesson": "Article I, Section 7 sets out presentment. The president acts on the whole bill. In this version of the game, you will get a signature or a returned veto.",
    "evidence": "veto"
  },
  "overrideHouse": {
    "step": 6,
    "tag": "CONSTITUTION",
    "actor": "House of Representatives",
    "title": "The House considers an override.",
    "text": "The president sent the bill back with objections. It comes to the House first because this is where it started. We can try to override the veto, but we must vote on the same text. We cannot revise it during this vote.",
    "lesson": "An override needs two-thirds of those voting, with a quorum. With everyone voting here, that means 290. If we reach it, the Senate votes next.",
    "evidence": "veto"
  },
  "overrideSenate": {
    "step": 6,
    "tag": "CONSTITUTION",
    "actor": "United States Senate",
    "title": "The Senate considers an override.",
    "text": "The House voted to override. We still need to decide for ourselves.",
    "lesson": "The bill has not changed. With all 100 senators voting, 67 must support the override for it to become law.",
    "evidence": "veto"
  }
};

export const glossary = {
  "Agenda setting": "Choosing which problems or bills get attention and time on the schedule.",
  "Amendment": "A proposed change to a bill’s wording. The committee or chamber decides whether to adopt it.",
  "Bicameralism": "Having two legislative chambers. In Congress, the House and Senate must agree on the same text to pass a law.",
  "Calendar": "A list of bills that may be considered. Being listed does not guarantee a floor vote.",
  "Cloture": "A Senate procedure that limits further debate. For ordinary legislation, it normally needs three-fifths of senators duly chosen and sworn.",
  "Committee chair": "The member who leads a committee and has substantial control over what it considers.",
  "Conference committee": "Members from both chambers appointed to work out differences between their versions of a bill.",
  "Conference report": "The agreement reached by House and Senate negotiators. Each delegation must approve it, and each chamber then votes on it without floor amendments.",
  "Enumerated power": "A power listed in the Constitution, such as Congress’s power to regulate interstate commerce.",
  "Filibuster": "Using extended debate or other delaying procedures to block Senate action.",
  "Germaneness": "Whether an amendment is relevant to the bill. House amendments generally must be germane unless that requirement is waived.",
  "Hearing": "A meeting where a committee hears testimony and gathers information. A bill does not always need a hearing.",
  "Hold": "An informal notice that a senator intends to object to or delay action.",
  "Jurisdiction": "The subjects a committee is responsible for. It helps determine where a bill is referred.",
  "Markup": "A committee meeting to consider amendments and decide what text to report.",
  "Presentment": "Sending the bill to the president after both chambers have approved the same text.",
  "Rider": "A provision attached to a bill, often on a different subject.",
  "Sponsor": "The member who introduces a bill. A co-sponsor signs on to support it.",
  "Standing committee": "A permanent committee that handles a particular set of subjects.",
  "Subcommittee": "A smaller group within a committee that handles more specialized work.",
  "Unanimous consent": "An agreement that can go ahead only if nobody objects.",
  "Veto": "The president returns an entire bill to Congress with objections.",
  "Veto override": "Both chambers vote by two-thirds to pass a returned bill despite the president’s objections."
};
