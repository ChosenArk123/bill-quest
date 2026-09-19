import { cards, scenes } from './content.js';
export const VERSION = 1;
export const clone = value => JSON.parse(JSON.stringify(value));
export const equal = (a,b) => JSON.stringify(Object.entries(a || {}).sort()) === JSON.stringify(Object.entries(b || {}).sort());
export function initial() { return { version:VERSION, phase:'builder', draft:['standard','grants','deadline'], priority:'standard', current:{}, introduced:null, house:null, senate:null, enrolled:null, history:[], evidence:[], ticks:18, outcome:null, checkpoint:null, notice:null, claim:null }; }
export function forecast(s, kind, text = s.current) {
 const index = { house:0, senate:1, cloture:2, president:3 }[kind] ?? 0;
 const base = { house:200, senate:45, cloture:48, president:0 }[kind] ?? 200;
 const reasons = Object.entries(text).map(([id,v])=>({label:`${cards[id].name}${v ? ' · amended' : ''}`, value:cards[id].effects[v][index]}));
 const total = base + reasons.reduce((a,x)=>a+x.value,0);
 if (kind === 'committee') return {total:9+Math.floor((total-200)/5), threshold:13,max:25,base:9,reasons:[{label:'Support for how the bill would work',value:Math.floor((total-200)/5)}]};
 if (kind === 'rule') return {total:225,threshold:218,max:435,base:225,reasons:[{label:'Members backing the leaders’ proposed rule',value:0}]};
 if (kind === 'overrideHouse') return {total:Math.min(435,total+60), threshold:290,max:435,base:200,reasons:[...reasons,{label:'Extra House support against the veto (game assumption)',value:60}]};
 if (kind === 'overrideSenate') {const f=forecast(s,'senate',text); return {...f,total:Math.min(100,f.total+9),threshold:67,reasons:[...f.reasons,{label:'Extra Senate support for the agreed bill (game assumption)',value:9}]};}
 return {total,base,reasons,threshold:{house:218,senate:51,cloture:60,president:3}[kind],max:{house:435,senate:100,cloture:100,president:12}[kind]};
}
export function proposal(s) {
 const pending = Object.keys(s.current).filter(id=>s.current[id]===0);
 const order = s.phase === 'markup' ? [s.priority,...pending] : s.phase === 'senateAmend' ? ['waiver','standard','grants','deadline'] : ['deadline','grants','waiver','standard'];
 return order.find(id=>pending.includes(id)) || null;
}
export function voteKind(phase) { return ({report:'committee',houseRule:'rule',houseVote:'house',cloture:'cloture',senateVote:'senate',houseConcur:'house',senateConcur:'senate',overrideHouse:'overrideHouse',overrideSenate:'overrideSenate'})[phase]; }
function record(s, text, data={}) { s.history.push({phase:s.phase,actor:scenes[s.phase]?.actor || 'Bill sponsors',text,...data}); }
function enter(s, phase) { s.phase=phase; const e=scenes[phase]?.evidence;if(e&&!s.evidence.includes(e))s.evidence.push(e); }
function checkpoint(s) { const c=clone(s);c.checkpoint=null;c.notice=null;s.checkpoint=c; }
function fail(s, message) { record(s,message);s.outcome='Not enacted';s.failure={phase:s.phase,reason:message};enter(s,'end');s.notice={title:'Why the bill stopped',text:message}; }
function spend(s,n=1) { s.ticks=Math.max(0,s.ticks-n);if(s.ticks===0){fail(s,'Congress has reached the end of its term, and this bill ran out of time. It would need reintroduction in the next Congress. Session ticks are just the game’s way of tracking time.');return false;}return true; }
function amend(s,id) { if(!id)return;const before=s.current[id];s.current[id]=1;record(s,`${cards[id].name}: amendment adopted. ${cards[id].trade}`,{id,before,after:1,adopted:true}); }
export function actions(s) {
 if(s.notice)return ['dismiss'];
 if(s.phase==='builder')return ['toggle','priority','introduce'];
 if(s.phase==='end')return ['retry','restart','claim'];
 if(['committee','markup','houseAmend','senateAmend'].includes(s.phase))return proposal(s)?['accept','retain']:['continue'];
 if(s.phase==='senateRoute')return forecast(s,'cloture').total>=60?['consent','seek']:['negotiate','seek','refuse'];
 if(s.phase==='reconcile')return equal(s.house,s.senate)?['identical']:['packageHouse','packageSenate'];
 return ['continue'];
}
export function reduce(state,action) {
 if(!actions(state).includes(action.type))throw Error(`Action ${action.type} is invalid in ${state.phase}`);
 const s=clone(state);
 if(action.type==='dismiss'){s.notice=null;return s;}
 if(action.type==='restart')return initial();
 if(action.type==='retry') {if(!s.checkpoint)return s;const c=clone(s.checkpoint);c.checkpoint=clone(s.checkpoint);c.notice={title:'Checkpoint restored',text:'You are back at the earlier decision. This is a retry of the game, not a chance to change an introduced bill outside the amendment process.'};return c;}
 if(action.type==='claim'){s.claim=action.value==='checks'?'correct':'retry';return s;}
 if(s.phase==='builder') {
  if(action.type==='toggle') {if(!cards[action.id])return s;if(s.draft.includes(action.id))s.draft=s.draft.filter(x=>x!==action.id);else if(s.draft.length<3)s.draft.push(action.id);if(!s.draft.includes(s.priority))s.priority=s.draft[0]||null;return s;}
  if(action.type==='priority'){if(s.draft.includes(action.id))s.priority=action.id;return s;}
  if(s.draft.length!==3||!s.draft.includes(s.priority))throw Error('Select three provisions and a priority');
  s.current=Object.fromEntries(s.draft.map(id=>[id,0]));s.introduced=clone(s.current);s.evidence=['powers','faction','checks'];record(s,'The sponsor introduced your three provisions. The original copy is saved in this file.');enter(s,'referral');return s;
 }
 const previous=s.phase;
 if(s.phase==='referral'){if(!spend(s))return s;record(s,'The bill went to the committee responsible for its subject. The chair gave it a place on the schedule.');enter(s,'committee');checkpoint(s);return s;}
 if(['committee','markup','houseAmend','senateAmend'].includes(s.phase)) {
  const id=proposal(s);
  if(action.type==='accept')amend(s,id);else if(id)record(s,`${cards[id].name}: supporters kept the current wording; the proposed amendment did not get enough backing.`,{id,adopted:false});
  if(!spend(s))return s;
  enter(s,({committee:'markup',markup:'report',houseAmend:'houseVote',senateAmend:'senateRoute'})[previous]);
  s.notice={title:action.type==='accept'?'Text amended':'Text preserved',text:id?(action.type==='accept'?cards[id].trade:'You kept the wording, but the objections are still there. They will affect the vote count. Lawmakers, rather than the bill itself, decide whether an amendment passes.'):'No further amendment is proposed here.'};
  return s;
 }
 const kind=voteKind(s.phase);
 if(kind) {
  const f=forecast(s,kind);record(s,`${f.total} votes; ${f.threshold} required.`,{vote:kind,total:f.total,threshold:f.threshold});
  if(f.total<f.threshold){fail(s,`${scenes[s.phase].actor} vote came up short: ${f.total} votes, ${f.threshold} needed. ${s.phase==='cloture'?'Enough senators may support passage, but they have not agreed to end debate.':''}`);return s;}
  if(!spend(s,s.phase==='cloture'?3:1))return s;
  if(s.phase==='houseVote')s.house=clone(s.current);
  if(s.phase==='senateVote')s.senate=clone(s.current);
  if(s.phase==='houseConcur')s.house=clone(s.current);
  if(s.phase==='senateConcur')s.senate=clone(s.current);
  let next=({report:'houseRule',houseRule:'houseAmend',houseVote:'senateAmend',cloture:'senateVote',senateVote:'reconcile',houseConcur:'senateConcur',senateConcur:'president',overrideHouse:'overrideSenate',overrideSenate:'end'})[previous];
  if(previous==='houseConcur'&&equal(s.current,s.senate))next='president';
  if(next==='president'){if(!equal(s.house,s.senate))throw Error('Identical text required');s.enrolled=clone(s.current);}
  if(previous==='overrideSenate')s.outcome='Enacted over veto';
  enter(s,next);
  if(['houseAmend','senateAmend','reconcile'].includes(next))checkpoint(s);
  s.notice={title:kind.startsWith('override')?'Override vote passed':previous==='cloture'?'Cloture invoked · bill not yet passed':'Vote passed',text:`${f.total} voted yes. You needed ${f.threshold}. ${previous==='report'?'The bill can go to the floor once the leaders schedule it.':''}`};return s;
 }
 if(s.phase==='senateRoute') {
  if(action.type==='refuse'){fail(s,'The sponsors turned down the consent deal and chose not to seek cloture. With no agreement on how to proceed, the bill stalled.');return s;}
  if(action.type==='seek'){enter(s,'cloture');return s;}
  if(action.type==='negotiate'){const id=proposal(s);if(id)amend(s,id);record(s,'After the change, no senator objected to the consent agreement. This is part of the game’s story; a majority alone cannot give unanimous consent.');}
  else record(s,'No senator objected to the timetable, so the bill can reach a vote without cloture.');
  if(!spend(s))return s;enter(s,'senateVote');return s;
 }
 if(s.phase==='reconcile') {
  if(action.type==='identical'){s.enrolled=clone(s.current);enter(s,'president');return s;}
  const previousText=clone(s.current);
  s.current=clone(action.type==='packageHouse'?s.house:s.senate);
  record(s,`Negotiators propose the ${action.type==='packageHouse'?'House':'Senate'} package. The other chamber still has to approve it.`);
  for(const id of Object.keys(s.current))if(previousText[id]!==s.current[id])record(s,`${cards[id].name}: the proposed deal brings back the House wording. The Senate still needs to agree.`,{id,before:previousText[id],after:s.current[id],adopted:false});
  enter(s,equal(s.house,s.current)?'senateConcur':'houseConcur');return s;
 }
 if(s.phase==='president') {
  if(!s.enrolled||!equal(s.house,s.senate))throw Error('Cannot present differing texts');
  const f=forecast(s,'president');
  if(f.total>=f.threshold){s.outcome='Signed into law';record(s,'The president signed the entire enrolled text.');enter(s,'end');}
  else {record(s,`The president vetoed the bill. It scored ${f.total} on the game’s measure of presidential support; a signature needs 3.`);enter(s,'overrideHouse');s.notice={title:'Regular veto',text:'The president still has concerns about the cost or how the bill would work. Congress can try to override the veto on the same text.'};}return s;
 }
 throw Error(`Unhandled phase: ${s.phase}`);
}
export function validateSave(s) {
 try {
  if(!s||s.version!==VERSION||!['builder','end',...Object.keys(scenes)].includes(s.phase))return false;
  if(!Array.isArray(s.draft)||s.draft.some(id=>!cards[id])||new Set(s.draft).size!==s.draft.length||s.draft.length>3)return false;
  if(!Array.isArray(s.history)||s.history.some(h=>!h||typeof h.text!=='string'||typeof h.actor!=='string')||!Array.isArray(s.evidence)||!Number.isFinite(s.ticks)||s.ticks<0)return false;
  if(!s.current||Array.isArray(s.current)||typeof s.current!=='object')return false;
  for(const field of ['current','introduced','house','senate','enrolled'])if(s[field]&&Object.entries(s[field]).some(([id,v])=>!cards[id]||![0,1].includes(v)))return false;
  if(s.phase!=='builder'&&(!s.introduced||Object.keys(s.introduced).length!==3||Object.keys(s.current).length!==3||!Object.hasOwn(s.current,s.priority)))return false;
  if(s.phase==='end'&&typeof s.outcome!=='string')return false;
  if(s.checkpoint&&!validateSave({...s.checkpoint,checkpoint:null}))return false;
  return true;
 }catch{return false;}
}
