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
