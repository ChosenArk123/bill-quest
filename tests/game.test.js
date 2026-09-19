import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,reduce,forecast,equal,validateSave} from '../src/game.js';
function act(s,type){if(s.notice)s=reduce(s,{type:'dismiss'});return reduce(s,{type});}
function run(decide=()=> 'accept',draft=['standard','grants','deadline'],priority=draft[0]){
 let s={...initial(),draft,priority};const visited=[];
 for(let i=0;i<70&&s.phase!=='end';i++){
  visited.push(s.phase);
  const type=s.phase==='builder'?'introduce':s.phase==='senateRoute'?(forecast(s,'cloture').total>=60?'consent':'negotiate'):s.phase==='reconcile'?(equal(s.house,s.senate)?'identical':'packageSenate'):['committee','markup','houseAmend','senateAmend'].includes(s.phase)?decide(s):'continue';
  try{s=act(s,type);}catch(e){if(/Action accept/.test(e.message))s=act(s,'continue');else throw e;}
 }
 return {s,visited};
}
test('canonical Alerts route signs identical text and preserves introduced snapshot',()=>{
 const {s,visited}=run();assert.equal(s.outcome,'Signed into law');assert.deepEqual(s.introduced,{standard:0,grants:0,deadline:0});assert.ok(equal(s.house,s.senate));assert.deepEqual(s.current,s.enrolled);assert.ok(visited.includes('president'));assert.ok(s.history.some(e=>e.adopted));assert.ok(s.evidence.includes('veto'));
});
test('all twelve Alerts starting/priority states have a viable complete route',()=>{
 const ids=['standard','grants','deadline','waiver'];let count=0;
 for(const omitted of ids){const draft=ids.filter(x=>x!==omitted);for(const priority of draft){const {s}=run(undefined,draft,priority);assert.equal(s.outcome,'Signed into law',`${omitted}/${priority}`);count++;}}
 assert.equal(count,12);
});
test('uncompromised bill can fail committee; checkpoint rewinds without editing introduced snapshot',()=>{
 const {s}=run(()=> 'retain',['standard','deadline','waiver']);assert.equal(s.outcome,'Not enacted');assert.equal(s.failure.phase,'report');const retry=act(s,'retry');assert.equal(retry.phase,'committee');assert.deepEqual(retry.introduced,s.introduced);assert.deepEqual(retry.current,retry.introduced);assert.equal(retry.history.filter(e=>e.vote).length,0);
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
test('insufficient override votes sustain veto',()=>{
 const text={standard:0,grants:0,deadline:0};let s={...initial(),phase:'overrideHouse',current:text,introduced:text,house:text,senate:text,enrolled:text};s=act(s,'continue');assert.equal(s.outcome,'Not enacted');assert.equal(s.failure.phase,'overrideHouse');
});
test('expired session does not create a pocket veto',()=>{let s={...initial(),phase:'referral',ticks:1};s=act(s,'continue');assert.equal(s.outcome,'Not enacted');assert.match(s.failure.reason,/reintroduction/);});
test('save validation rejects unsupported content',()=>{assert.ok(validateSave(initial()));assert.equal(validateSave({version:42}),false);assert.equal(validateSave({...initial(),draft:['bad']}),false);});
