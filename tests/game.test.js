import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,reduce,forecast,equal,validateSave,proposal,actions} from '../src/game.js';
function act(s,type){if(s.notice)s=reduce(s,{type:'dismiss'});return reduce(s,{type});}
function run(decide=()=> 'accept',draft=['standard','grants','deadline'],priority=draft[0]){
 let s={...initial(),draft,priority};const visited=[];
 for(let i=0;i<70&&s.phase!=='end';i++){
  visited.push(s.phase);
  const cloture=forecast(s,'cloture').total;
  const type=s.phase==='builder'?'introduce':s.phase==='senateRoute'?(cloture>=60?'consent':(proposal(s)?'negotiate':'seek')):s.phase==='reconcile'?(equal(s.house,s.senate)?'identical':'packageSenate'):['committee','markup','houseAmend','senateAmend'].includes(s.phase)?decide(s):'continue';
  try{s=act(s,type);}catch(e){if(/Action accept/.test(e.message))s=act(s,'continue');else throw e;}
 }
 return {s,visited};
}
function findViableRoute(draft,priority){
 function dfs(s){
  if(s.outcome==='Signed into law'||s.outcome==='Enacted over veto')return s;
  if(s.outcome==='Not enacted'||s.phase==='end')return null;
  let choices;
  if(s.phase==='builder')choices=['introduce'];
  else if(['committee','markup','houseAmend','senateAmend'].includes(s.phase)){
   choices=proposal(s)?['accept','retain']:['continue'];
  }else if(s.phase==='senateRoute'){
   const cloture=forecast(s,'cloture').total;
   if(cloture>=60)choices=['consent'];
   else if(proposal(s))choices=['negotiate','seek'];
   else choices=['seek'];
  }else if(s.phase==='reconcile'){
   choices=equal(s.house,s.senate)?['identical']:['packageSenate','packageHouse'];
  }else choices=['continue'];
  for(const a of choices){
   try{
    const next=act(s,a);
    const res=dfs(next);
    if(res)return res;
   }catch(e){}
  }
  return null;
 }
 return dfs({...initial(),draft,priority});
}
test('canonical Alerts route signs identical text and preserves introduced snapshot',()=>{
 const {s,visited}=run();assert.equal(s.outcome,'Signed into law');assert.deepEqual(s.introduced,{standard:0,grants:0,deadline:0});assert.ok(equal(s.house,s.senate));assert.deepEqual(s.current,s.enrolled);assert.ok(visited.includes('president'));assert.ok(s.history.some(e=>e.adopted));assert.ok(s.evidence.includes('veto'));
});
test('all twenty Alerts three-provision combinations across all sixty priority states have a viable complete route',()=>{
 const ids=['standard','grants','deadline','waiver','preemption','penalties'];
 function subsets(arr,k){if(k===0)return [[]];if(!arr.length)return [];return subsets(arr.slice(1),k-1).map(s=>[arr[0],...s]).concat(subsets(arr.slice(1),k));}
 const combos=subsets(ids,3);
 assert.equal(combos.length,20);
 let count=0;
 for(const draft of combos){
  for(const priority of draft){
   const s=findViableRoute(draft,priority);
   assert.ok(s&&(s.outcome==='Signed into law'||s.outcome==='Enacted over veto'),`${draft.join('+')}/${priority}: ${s?.outcome}`);
   count++;
  }
 }
 assert.equal(count,60);
});
test('uncompromised bill with new provisions can fail committee and rewind via checkpoint',()=>{
 const {s}=run(()=> 'retain',['standard','deadline','preemption']);assert.equal(s.outcome,'Not enacted');assert.equal(s.failure.phase,'report');const retry=act(s,'retry');assert.equal(retry.phase,'committee');assert.deepEqual(retry.introduced,s.introduced);assert.deepEqual(retry.current,retry.introduced);assert.equal(retry.history.filter(e=>e.vote).length,0);
});
test('passage majority does not satisfy cloture',()=>{
 let s={...initial(),phase:'cloture',current:{standard:0,grants:0,deadline:0},introduced:{standard:0,grants:0,deadline:0}};
 assert.equal(forecast(s,'senate').total,51);assert.equal(forecast(s,'cloture').total,49);s=act(s,'continue');assert.equal(s.outcome,'Not enacted');assert.equal(s.failure.phase,'cloture');
});
test('invalid commands cannot bypass legislative phases',()=>{
 assert.throws(()=>reduce(initial(),{type:'packageSenate'}));assert.throws(()=>act({...initial(),phase:'president',house:{standard:0},senate:{standard:1},enrolled:null},'continue'));
});
test('reconciliation requires the nonconcurrent chamber to approve',()=>{
 let s={...initial(),phase:'reconcile',current:{standard:1,grants:1,deadline:1},house:{standard:0,grants:1,deadline:1},senate:{standard:1,grants:1,deadline:1},introduced:{standard:0,grants:0,deadline:0}};
 s=act(s,'packageSenate');assert.equal(s.phase,'houseConcur');s=act(s,'continue');assert.equal(s.phase,'president');assert.ok(equal(s.house,s.senate));assert.deepEqual(s.enrolled,s.current);
});
test('override requires both chambers on locked text',()=>{
 const text={standard:1,grants:0,waiver:0};let s={...initial(),phase:'president',current:text,introduced:text,house:text,senate:text,enrolled:text};
 s=act(s,'continue');assert.equal(s.phase,'overrideHouse');s=act(s,'continue');assert.equal(s.phase,'overrideSenate');assert.equal(s.outcome,null);s=act(s,'continue');assert.equal(s.outcome,'Enacted over veto');assert.deepEqual(s.enrolled,text);
});
test('new provisions support regular veto and bicameral override',()=>{
 const text={standard:1,grants:0,preemption:1};let s={...initial(),phase:'president',current:text,introduced:text,house:text,senate:text,enrolled:text};
 s=act(s,'continue');assert.equal(s.phase,'overrideHouse');assert.equal(s.notice.title,'Regular veto');
 s=act(s,'continue');assert.equal(s.phase,'overrideSenate');assert.equal(s.outcome,null);
 s=act(s,'continue');assert.equal(s.outcome,'Enacted over veto');assert.deepEqual(s.enrolled,text);
});
test('insufficient override votes sustain veto',()=>{
 const text={standard:0,grants:0,deadline:0};let s={...initial(),phase:'overrideHouse',current:text,introduced:text,house:text,senate:text,enrolled:text};s=act(s,'continue');assert.equal(s.outcome,'Not enacted');assert.equal(s.failure.phase,'overrideHouse');
});
test('expired session does not create a pocket veto',()=>{let s={...initial(),phase:'referral',ticks:1};s=act(s,'continue');assert.equal(s.outcome,'Not enacted');assert.match(s.failure.reason,/reintroduction/);});
test('save validation rejects unsupported content',()=>{assert.ok(validateSave(initial()));assert.equal(validateSave({version:42}),false);assert.equal(validateSave({...initial(),draft:['bad']}),false);});
test('identical House/Senate text does not overwrite checkpoint in reconcile, allowing retry from veto failure',()=>{
  const text={standard:1,grants:1,deadline:0};
  let s={
    ...initial(),
    phase:'senateVote',
    draft:['standard','grants','deadline'],
    priority:'standard',
    current:text,
    house:text,
    introduced:{standard:0,grants:0,deadline:0},
    checkpoint:{...initial(),phase:'senateAmend',draft:['standard','grants','deadline'],priority:'standard',current:text,introduced:{standard:0,grants:0,deadline:0}}
  };
  // senateVote passes (62 >= 51) and enters reconcile with identical texts
  s=act(s,'continue');
  assert.equal(s.phase,'reconcile');
  // Checkpoint must NOT be overwritten with reconcile
  assert.equal(s.checkpoint.phase,'senateAmend');
  // Proceed through reconcile -> identical -> president
  s=act(s,'identical');
  assert.equal(s.phase,'president');
  // President vetoes: alignment is 1 + 2 + (-2) = 1 < 3
  s=act(s,'continue');
  assert.equal(s.phase,'overrideHouse');
  // House override: 224 + 60 = 284 < 290 -> veto sustained
  s=act(s,'continue');
  assert.equal(s.outcome,'Not enacted');
  assert.equal(s.failure.phase,'overrideHouse');
  // Retry must restore senateAmend checkpoint rather than trapping the player in reconcile
  const retried=act(s,'retry');
  assert.equal(retried.phase,'senateAmend');
});
test('reconciliation history identifies selected chamber wording and responding chamber for both packages',()=>{
  const houseText={standard:0,grants:1,deadline:1};
  const senateText={standard:1,grants:1,deadline:1};
  const base={...initial(),phase:'reconcile',current:senateText,house:houseText,senate:senateText,introduced:{standard:0,grants:0,deadline:0}};
  const sSenate=act(base,'packageSenate');
  assert.equal(sSenate.phase,'houseConcur');
  assert.ok(sSenate.history.some(h=>h.text.includes('Senate package')&&h.text.includes('House still has to approve it')));
  assert.ok(sSenate.history.some(h=>h.text.includes('Senate wording')&&h.text.includes('House still needs to agree')));
  const sHouse=act(base,'packageHouse');
  assert.equal(sHouse.phase,'senateConcur');
  assert.ok(sHouse.history.some(h=>h.text.includes('House package')&&h.text.includes('Senate still has to approve it')));
  assert.ok(sHouse.history.some(h=>h.text.includes('House wording')&&h.text.includes('Senate still needs to agree')));
});
test('empty negotiation cannot bypass cloture when all provisions are already amended',()=>{
  const allAmended={standard:1,waiver:1,penalties:1};
  const sRoute={...initial(),phase:'senateRoute',draft:['standard','waiver','penalties'],priority:'standard',current:allAmended,introduced:{standard:0,waiver:0,penalties:0}};
  assert.equal(forecast(sRoute,'cloture').total,59);
  const avail=import('../src/game.js').then; // sanity
  assert.throws(()=>reduce(sRoute,{type:'negotiate'}));
});
test('restart action is directly available in end phase and safely resets game state',()=>{
  // Simulate failure ending
  const failedState={
    ...initial(),
    phase:'overrideHouse',
    current:{standard:0,grants:0,deadline:0},
    checkpoint:initial()
  };
  const endState=reduce(failedState,{type:'continue'});
  assert.equal(endState.phase,'end');
  assert.equal(endState.outcome,'Not enacted');
  // Actions in end phase must include restart, retry, claim
  const availActions=actions(endState);
  assert.ok(availActions.includes('restart'), 'actions(endState) must include restart');
  assert.ok(availActions.includes('retry'), 'actions(endState) must include retry');
  assert.ok(availActions.includes('claim'), 'actions(endState) must include claim');
  // Calling restart directly must succeed and return initial state
  const restarted=reduce(endState,{type:'restart'});
  assert.deepEqual(restarted,initial());
  // Calling restart even with an active notice must reset to initial
  const withNotice={...endState,notice:{title:'Notice',text:'Testing'}};
  assert.deepEqual(reduce(withNotice,{type:'restart'}),initial());
});
test('retaining an amendment does not state patronizing phrases about lawmakers vs the bill itself',()=>{
  let s={...initial(),phase:'committee',draft:['standard','grants','deadline'],priority:'standard',current:{standard:0,grants:0,deadline:0}};
  s=reduce(s,{type:'retain'});
  assert.ok(s.notice);
  assert.equal(s.notice.title,'Text preserved');
  assert.ok(!s.notice.text.includes('rather than the bill itself'));
  assert.ok(!s.notice.text.includes('Lawmakers, rather than'));
});
test('glossary and sources explain session ticks and congressional calendar',async()=>{
  const {glossary,sources}=await import('../src/content.js');
  assert.ok(glossary['Session ticks'], 'Glossary must define Session ticks');
  assert.match(glossary['Session ticks'], /Article I|20th Amendment/);
  assert.match(glossary['Session ticks'], /sine die/);
  assert.match(glossary['Session ticks'], /calendar/i);
  assert.ok(sources['calendar'], 'Sources must include calendar');
  assert.match(sources['calendar'].text, /sine die/);
  assert.match(sources['calendar'].text, /two-year term/);
});
test('session tick exhaustion failure message explains sine die adjournment without dismissive phrasing',()=>{
  let s={...initial(),phase:'referral',ticks:1};
  s=act(s,'continue');
  assert.equal(s.outcome,'Not enacted');
  assert.match(s.failure.reason, /sine die/);
  assert.match(s.failure.reason, /Article I and the 20th Amendment/);
  assert.match(s.failure.reason, /reintroduction/);
  assert.ok(!s.failure.reason.includes("just the game’s way of tracking time"));
});


