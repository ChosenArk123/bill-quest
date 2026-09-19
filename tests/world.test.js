import test from 'node:test';
import assert from 'node:assert/strict';
import {rooms,roomFor,objectsFor,isWalkable,pathTo} from '../src/world-data.js';
test('every NPC, object and door can be approached from the room entry',()=>{
 for(const room of Object.keys(rooms)){
  const objects=objectsFor(room,'committee',6);
  assert.ok(isWalkable(room,11,11,objects),`${room}: entry blocked`);
  for(const target of objects){
   const path=pathTo(room,{x:11,y:11},target,objects);
   assert.ok(path.length||Math.abs(11-target.x)+Math.abs(11-target.y)<=1,`${room}: ${target.name} unreachable`);
   let previous={x:11,y:11};
   for(const p of path){assert.ok(isWalkable(room,p.x,p.y,objects));assert.equal(Math.abs(previous.x-p.x)+Math.abs(previous.y-p.y),1);previous=p;}
   assert.ok(Math.abs(previous.x-target.x)+Math.abs(previous.y-target.y)<=1);
  }
 }
});
test('walls, furniture and people block walking',()=>{const objects=objectsFor('committee','committee',1);assert.equal(isWalkable('committee',0,0,objects),false);assert.equal(isWalkable('committee',11,4,objects),false);assert.equal(isWalkable('committee',11,5,objects),false);});
test('doors respect progression and override returns to the correct chamber',()=>{const first=objectsFor('corridor','builder',0);assert.ok(first.filter(o=>o.type==='door').every(o=>o.locked));const later=objectsFor('corridor','houseRule',2);assert.equal(later.find(o=>o.to==='house').locked,false);assert.equal(later.find(o=>o.to==='senate').locked,true);assert.equal(roomFor('overrideHouse'),'house');assert.equal(roomFor('overrideSenate'),'senate');assert.equal(roomFor('president'),'executive');});

test('every institutional stage has a short required character conversation',async()=>{
 const {scenes}=await import('../src/content.js');const {conversations}=await import('../src/dialogue.js');
 for(const phase of Object.keys(scenes)){assert.ok(conversations[phase],phase);assert.ok(conversations[phase].beats.length>=2);for(const beat of conversations[phase].beats)assert.ok(beat.split(/\s+/).length<=65,`${phase}: overlong beat`);}
});

test('retry places player in correct room for restored phase and supports navigation from entry tile',()=>{
 const checkpointPhases=[
  {phase:'committee',expectedRoom:'committee'},
  {phase:'houseRule',expectedRoom:'house'},
  {phase:'senateAmend',expectedRoom:'senate'},
  {phase:'reconcile',expectedRoom:'agreement'}
 ];
 for(const {phase,expectedRoom} of checkpointPhases){
  const room=roomFor(phase);
  assert.equal(room,expectedRoom,`phase ${phase} must map to ${expectedRoom}`);
  const objects=objectsFor(room,phase,4);
  const entry={x:11,y:11};
  assert.ok(isWalkable(room,entry.x,entry.y,objects),`${room} entry tile (11,11) must be walkable`);
  const mainObj=objects.find(o=>o.id==='main');
  assert.ok(mainObj,`${room} must have main interactive target`);
  const path=pathTo(room,entry,mainObj,objects);
  assert.ok(path.length>0,`Must be able to navigate to main object from entry in ${room}`);
  let curr=entry;
  for(const step of path){
   assert.ok(isWalkable(room,step.x,step.y,objects),`Tile (${step.x},${step.y}) in path must be walkable`);
   assert.equal(Math.abs(curr.x-step.x)+Math.abs(curr.y-step.y),1,`Path step must be adjacent to previous tile`);
   curr=step;
  }
  assert.ok(Math.abs(curr.x-mainObj.x)+Math.abs(curr.y-mainObj.y)<=1,`Path must reach adjacency with main object`);
 }
});

test('executive door in corridor is unblocked and not shadowed by the evidence shelf',()=>{
 const objects=objectsFor('corridor','president',5);
 const execDoor=objects.find(o=>o.id==='door-executive');
 assert.ok(execDoor, 'Executive door must exist in corridor');
 assert.equal(execDoor.x, 18);
 assert.equal(execDoor.y, 2);
 // The tile directly in front of the door (18, 3) must be walkable
 assert.ok(isWalkable('corridor', 18, 3, objects), 'Tile (18,3) in front of executive door must be walkable');
 const ledger=objects.find(o=>o.id==='ledger');
 assert.ok(ledger, 'Ledger must exist');
 // Ledger must be at y >= 5 so it is not within interaction distance 1 from (18, 3)
 const distToDoor=Math.abs(18 - execDoor.x) + Math.abs(3 - execDoor.y);
 const distToLedger=Math.abs(18 - ledger.x) + Math.abs(3 - ledger.y);
 assert.equal(distToDoor, 1, 'Player at (18, 3) must be adjacent to door');
 assert.ok(distToLedger > 1, `Ledger at (${ledger.x}, ${ledger.y}) must not collide with player interacting at (18, 3)`);
});


