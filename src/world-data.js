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
        5,
        "shelf"
      ],
      [
        18,
        5,
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
          "They are still debating upstairs. Good thing I packed dinner."
        ]
      },
      {
        "id": "guide",
        "x": 5,
        "y": 8,
        "name": "Visitor guide",
        "color": "#849875",
        "beats": [
          "People send Congress ideas from all over the country. A member has to introduce one as a bill before Congress can work on it.",
          "The drafting desk is straight ahead. They will help you put yours together."
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
          "The House and Senate keep their own records. Before a bill goes to the president, we check that they approved the same words.",
          "That is a constitutional requirement. Rules about hearings, scheduling, and debate add other steps along the way."
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
          "A referral means this subject is our responsibility. The chair still decides whether to spend time on your bill.",
          "At a hearing, we listen to witnesses. At markup, members consider changes to the text.",
          "Subcommittees handle the detailed work, then send it back to the full committee. The full committee decides whether to report the bill."
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
          "Our alert equipment is old. We can upgrade it, but replacing it takes money and time.",
          "I would like a longer deadline. I also know people need these alerts now."
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
          "People in my district want these upgrades. A colleague from another district might be hearing more complaints about the cost.",
          "We each bring those concerns here. Getting enough of us to agree can take some changes."
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
          "Your bill is on the calendar. I still need to find time for it on the floor.",
          "The structured rule tells members which amendments they can offer. We vote on that before we vote on the bill."
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
          "My state has big cities and small rural systems. They will not all find these upgrades equally easy.",
          "I may support the bill but want more debate before a final vote. Those are two different decisions."
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
          "A senator who places a hold is warning the leaders that they may object or delay things. A hold does not legally veto a bill.",
          "On ordinary legislation, ending debate through cloture normally takes 60 votes with all 100 seats filled. Passage has its own vote.",
          "Sometimes everyone agrees on how to proceed. Then we can get to a vote without cloture."
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
          "The House likes its version. The Senate likes its version. We need one version they can both accept.",
          "We can send amendments back and forth or ask for a conference committee. Conference is one option, not a required stop.",
          "We are using amendment exchange here. Whichever chamber has not approved the proposed text still needs to vote on it."
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
          "The president has to consider the whole bill. They cannot sign the parts they like and cross out the rest.",
          "If they return it with objections, Congress can try to override. That takes two-thirds in each chamber.",
          "There is also a rule for taking no action: ten days, excluding Sundays. Whether Congress can receive a returned bill matters. The ledger explains it; that ending is not playable yet."
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
          "A bill becoming law tells you that it got through the required approvals. You still have to judge what the law actually does.",
          "When a bill fails, look at where it stopped. A committee chair, a chamber vote, or a veto can stop a proposal even when plenty of people support it."
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
 list.push({id:'ledger',x:room==='corridor'?18:base.size[2]-2,y:4,name:'Evidence shelf',type:'evidence'});
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
