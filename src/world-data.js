import { conversations } from './dialogue.js';
// Original tile layouts. Institutional progression is separate from movement.
export const W=24,H=15,T=24;
export const rooms = {
  "corridor": {
    "name": "Capitol corridor",
    "subtitle": "Welcome to the Capitol",
    "tone": "#41605b",
    "floor": "#577063",
    "walls": "#203a3b",
    "size": [
      0,
      0,
      23,
      14
    ],
    "props": [
      [
        6,
        5,
        "desk"
      ],
      [
        7,
        5,
        "desk"
      ],
      [
        11,
        5,
        "desk"
      ],
      [
        12,
        5,
        "desk"
      ],
      [
        17,
        6,
        "shelf"
      ],
      [
        18,
        6,
        "shelf"
      ],
      [
        4,
        10,
        "plant"
      ],
      [
        19,
        10,
        "plant"
      ]
    ],
    "npcs": [
      {
        "id": "caretaker",
        "x": 4,
        "y": 11,
        "name": "Evening custodian",
        "color": "#71858c",
        "beats": [
          "Floor debate went past midnight again. When leadership wants a bill through before recess, the coffee pots never get cold."
        ]
      },
      {
        "id": "guide",
        "x": 5,
        "y": 8,
        "name": "Visitor guide",
        "color": "#849875",
        "beats": [
          "Welcome to the Capitol! Citizens bring thousands of petition ideas here every week. But under Article I, only a member of Congress can formally introduce a bill.",
          "The drafting desk is straight ahead. Counsel will help frame your policy idea into statutory language."
        ],
        "source": "powers"
      },
      {
        "id": "archive",
        "x": 18,
        "y": 8,
        "name": "Archivist",
        "color": "#ac875c",
        "beats": [
          "The House and Senate maintain separate legislative journals. Before enrollment for the White House, our clerks verify that every single word and punctuation mark matches.",
          "That bicameral concurrence is non-negotiable under Article I, Section 7. Procedural rules along the way determine whether a bill ever gets that far."
        ],
        "source": "checks"
      }
    ]
  },
  "committee": {
    "name": "Committee room",
    "subtitle": "Hearings and committee business",
    "tone": "#716440",
    "floor": "#7c7458",
    "walls": "#393d31",
    "size": [
      3,
      1,
      20,
      14
    ],
    "props": [
      [
        10,
        4,
        "desk"
      ],
      [
        11,
        4,
        "desk"
      ],
      [
        12,
        4,
        "desk"
      ],
      [
        13,
        4,
        "desk"
      ],
      [
        7,
        7,
        "chair"
      ],
      [
        16,
        7,
        "chair"
      ],
      [
        7,
        10,
        "chair"
      ],
      [
        16,
        10,
        "chair"
      ],
      [
        5,
        3,
        "shelf"
      ],
      [
        18,
        3,
        "plant"
      ]
    ],
    "npcs": [
      {
        "id": "staff",
        "x": 6,
        "y": 8,
        "name": "Committee staffer",
        "color": "#8ba293",
        "beats": [
          "Referral establishes our committee's legal jurisdiction. But don't celebrate yet—the chair exercises absolute gatekeeping power over what gets scheduled.",
          "At hearings, we gather witness testimony. In markup, members debate textual amendments. Only if the full committee votes to report does your bill reach the floor calendar."
        ],
        "source": "procedure"
      },
      {
        "id": "witness",
        "x": 17,
        "y": 9,
        "name": "Local system operator",
        "color": "#b08a69",
        "beats": [
          "My county has forty-year-old alert relays. We want dependable emergency alerts for our families as much as anyone, but equipment costs real money.",
          "Give small municipal providers realistic phase-in time and grant support, and we can actually make these upgrades work."
        ],
        "source": "faction"
      }
    ]
  },
  "house": {
    "name": "House chamber",
    "subtitle": "435 seats · districts across the country",
    "tone": "#476b7a",
    "floor": "#54727b",
    "walls": "#22343e",
    "size": [
      0,
      0,
      23,
      14
    ],
    "props": [
      [
        10,
        3,
        "desk"
      ],
      [
        11,
        3,
        "desk"
      ],
      [
        12,
        3,
        "desk"
      ],
      [
        13,
        3,
        "desk"
      ],
      [
        5,
        6,
        "desk"
      ],
      [
        5,
        9,
        "desk"
      ],
      [
        8,
        6,
        "desk"
      ],
      [
        8,
        9,
        "desk"
      ],
      [
        15,
        6,
        "desk"
      ],
      [
        15,
        9,
        "desk"
      ],
      [
        18,
        6,
        "desk"
      ],
      [
        18,
        9,
        "desk"
      ],
      [
        3,
        4,
        "flag"
      ],
      [
        20,
        4,
        "flag"
      ]
    ],
    "npcs": [
      {
        "id": "representative",
        "x": 5,
        "y": 11,
        "name": "Representative Vale",
        "color": "#a6a076",
        "beats": [
          "My suburban constituents demand immediate alert access. But across the aisle, rural members face intense pushback regarding compliance mandates.",
          "Every representative answers to a distinct congressional district. Forging a 218-member majority demands compromises."
        ],
        "source": "faction"
      },
      {
        "id": "leader",
        "x": 18,
        "y": 11,
        "name": "Leadership aide",
        "color": "#7999ab",
        "beats": [
          "Your bill holds a spot on the calendar, but floor time is intensely contested. That’s why the Rules Committee drafts structured rules to restrict floor amendments.",
          "Without special rules, 435 members offering floor amendments would bring House legislative business to a dead halt."
        ],
        "source": "rules"
      }
    ]
  },
  "senate": {
    "name": "Senate chamber",
    "subtitle": "100 seats · two senators per state",
    "tone": "#665375",
    "floor": "#70677b",
    "walls": "#312d42",
    "size": [
      2,
      0,
      21,
      14
    ],
    "props": [
      [
        10,
        3,
        "desk"
      ],
      [
        11,
        3,
        "desk"
      ],
      [
        12,
        3,
        "desk"
      ],
      [
        13,
        3,
        "desk"
      ],
      [
        6,
        6,
        "desk"
      ],
      [
        8,
        9,
        "desk"
      ],
      [
        15,
        9,
        "desk"
      ],
      [
        17,
        6,
        "desk"
      ],
      [
        4,
        3,
        "flag"
      ],
      [
        19,
        3,
        "flag"
      ]
    ],
    "npcs": [
      {
        "id": "senator",
        "x": 6,
        "y": 10,
        "name": "Senator Rowan",
        "color": "#a58dab",
        "beats": [
          "My state encompasses massive agricultural valleys and dense metropolitan centers. A one-size-fits-all timeline simply doesn't fit every local utility.",
          "I may favor your bill's policy, but I will vigorously defend our Senate tradition of unlimited debate until our concerns are addressed."
        ],
        "source": "cloture"
      },
      {
        "id": "procedure",
        "x": 18,
        "y": 10,
        "name": "Senate parliamentarian",
        "color": "#a99a6e",
        "beats": [
          "Senate Rule XXII governs the filibuster. Cloture requires three-fifths of all senators duly chosen and sworn—a mandatory 60 votes.",
          "Holds are merely informal notices that a senator plans to object. If leadership cannot negotiate unanimous consent, a roll call on cloture is inevitable."
        ],
        "source": "cloture"
      }
    ]
  },
  "agreement": {
    "name": "Bicameral meeting room",
    "subtitle": "Working out the differences",
    "tone": "#70704d",
    "floor": "#7a795f",
    "walls": "#3b4333",
    "size": [
      2,
      1,
      21,
      14
    ],
    "props": [
      [
        9,
        5,
        "house-paper"
      ],
      [
        10,
        5,
        "desk"
      ],
      [
        11,
        5,
        "desk"
      ],
      [
        12,
        5,
        "desk"
      ],
      [
        13,
        5,
        "desk"
      ],
      [
        14,
        5,
        "senate-paper"
      ],
      [
        5,
        3,
        "flag"
      ],
      [
        18,
        3,
        "flag"
      ]
    ],
    "npcs": [
      {
        "id": "negotiator",
        "x": 7,
        "y": 9,
        "name": "Chamber liaison",
        "color": "#b2a47d",
        "beats": [
          "The House passed its bill; the Senate passed its version. Under Article I, Section 7, the President can only sign an identical text.",
          "We can resolve differences via amendment exchange—often called 'amendment ping-pong'—or convene a formal conference committee to draft a conference report."
        ],
        "source": "concurrence"
      }
    ]
  },
  "executive": {
    "name": "Executive office",
    "subtitle": "At the White House",
    "tone": "#41696b",
    "floor": "#667e6e",
    "walls": "#243f46",
    "size": [
      2,
      1,
      21,
      14
    ],
    "props": [
      [
        10,
        4,
        "desk"
      ],
      [
        11,
        4,
        "desk"
      ],
      [
        12,
        4,
        "desk"
      ],
      [
        13,
        4,
        "desk"
      ],
      [
        5,
        3,
        "plant"
      ],
      [
        18,
        3,
        "plant"
      ],
      [
        5,
        9,
        "chair"
      ],
      [
        18,
        9,
        "chair"
      ],
      [
        16,
        3,
        "flag"
      ]
    ],
    "npcs": [
      {
        "id": "executive-aide",
        "x": 17,
        "y": 8,
        "name": "Executive staffer",
        "color": "#91aaa0",
        "beats": [
          "Under Article I, Section 7, the President must consider the enrolled bill as a single package. The Supreme Court struck down line-item vetoes decades ago.",
          "The President can sign, return the bill with objections for a regular veto, or allow it to become law without signature after ten days (excluding Sundays) if Congress remains in session."
        ],
        "source": "veto"
      }
    ]
  },
  "archive": {
    "name": "Legislative archive",
    "subtitle": "What happened to your bill?",
    "tone": "#756446",
    "floor": "#827556",
    "walls": "#3d3b30",
    "size": [
      2,
      1,
      21,
      14
    ],
    "props": [
      [
        5,
        3,
        "shelf"
      ],
      [
        6,
        3,
        "shelf"
      ],
      [
        17,
        3,
        "shelf"
      ],
      [
        18,
        3,
        "shelf"
      ],
      [
        10,
        5,
        "desk"
      ],
      [
        11,
        5,
        "desk"
      ],
      [
        12,
        5,
        "desk"
      ],
      [
        13,
        5,
        "desk"
      ]
    ],
    "npcs": [
      {
        "id": "historian",
        "x": 17,
        "y": 9,
        "name": "Congressional historian",
        "color": "#aa9363",
        "beats": [
          "Enactment proves a coalition navigated every constitutional hurdle. But Madison reminded us in Federalist 51 that checks and balances are designed to make lawmaking deliberate, not easy.",
          "When a proposal fails, examine where the institutional brake applied: committee gatekeeping, structured rules, the Senate filibuster, or the executive veto."
        ],
        "source": "checks"
      }
    ]
  }
};
export const roomOrder=Object.keys(rooms);
export function roomFor(phase){if(['builder','referral'].includes(phase))return 'corridor';if(['committee','markup','report'].includes(phase))return 'committee';if(phase.startsWith('house')||phase==='overrideHouse')return 'house';if(phase.startsWith('senate')||phase==='cloture'||phase==='overrideSenate')return 'senate';if(phase==='reconcile')return 'agreement';if(phase==='president')return 'executive';return 'archive';}
export function objectsFor(room,phase,highest=0){
 const base=rooms[room];const list=base.npcs.map(n=>({...n,type:'npc'}));
 list.push({id:'ledger',x:room==='corridor'?18:base.size[2]-2,y:room==='corridor'?5:4,name:'Evidence shelf',type:'evidence'});
 if(room==='corridor'){
  list.push({id:'main',x:11,y:6,name:phase==='builder'?'Drafting desk':'Referral clerk',type:'main'});
  ['committee','house','senate','agreement','executive','archive'].forEach((to,i)=>list.push({id:`door-${to}`,x:2+i*4,y:2,type:'door',to,name:rooms[to].name,locked:roomOrder.indexOf(to)>highest}));
 }else{
  list.push({id:'exit',x:11,y:13,type:'door',to:'corridor',name:room==='executive'?'Courtyard → Capitol corridor':'Capitol corridor'});
  list.push({id:'main',x:11,y:room==='agreement'||room==='archive'?6:5,type:'main',name:({committee:'Committee chair',house:'House clerk',senate:'Senate clerk',agreement:'Bill comparison table',executive:'Presidential desk',archive:'Your legislative record'})[room]});
 }
 if(room===roomFor(phase)&&conversations[phase])list.find(o=>o.id==='main').name=conversations[phase].speaker;
 return list;
}
export function isWalkable(room,x,y,objects=[]){const [l,t,r,b]=rooms[room].size;if(x<=l||x>=r||y<=Math.max(t,2)||y>=b)return false;return !rooms[room].props.some(p=>p[0]===x&&p[1]===y)&&!objects.some(o=>o.x===x&&o.y===y&&o.type!=='door');}
export function pathTo(room,start,target,objects){
 const queue=[start],seen=new Set([`${start.x},${start.y}`]),parent=new Map();let goal=null;
 for(let i=0;i<queue.length;i++){const p=queue[i];if(Math.abs(p.x-target.x)+Math.abs(p.y-target.y)<=1){goal=p;break;}for(const [dx,dy] of [[0,-1],[1,0],[0,1],[-1,0]]){const n={x:p.x+dx,y:p.y+dy},key=`${n.x},${n.y}`;if(!seen.has(key)&&isWalkable(room,n.x,n.y,objects)){seen.add(key);parent.set(key,p);queue.push(n);}}}
 if(!goal)return [];const result=[];while(goal.x!==start.x||goal.y!==start.y){result.unshift(goal);goal=parent.get(`${goal.x},${goal.y}`);}return result;
}
