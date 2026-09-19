# Exploration interaction rebuild

## Implemented loop

Walk → notice a person or object → approach → interact → short dialogue → actual decision or optional explanation → return to movement.

The legislative reducer remains authoritative. Walking, optional conversations, and opening the evidence shelf do not spend session ticks or change the bill. Only explicit institutional actions commit changes or resolve votes. A room transition never substitutes for a legislative vote.

## Spaces and teaching

| Space | Environmental cue | Required interaction | Optional depth |
| --- | --- | --- | --- |
| Capitol corridor | Six separately labeled institutional doors, drafting desk, source shelf | Counsel and referral clerk | Visitor guide, archivist, custodian atmosphere |
| Committee room | Narrower footprint, small hearing seating, chair's desk | Technical amendment, markup, report | Staffer on referral/hearings; witness on implementation |
| House chamber | Larger floor, many desks, central aisle | Structured rule, amendment, passage | Constituency and scheduling conversations |
| Senate chamber | Smaller distinct chamber, different seating and palette | Committee compression, consent/cloture, passage | Senator and parliamentarian explain distinct coalitions |
| Bicameral room | HOUSE and SENATE papers share one table | Compare actual approved text and select exchange package | Liaison explains exchange versus conference |
| Executive office | Separate destination and exit toward the Capitol | Whole-bill presidential action | Staffer explains the executive check and inaction rule |
| Archive | Shelves and permanent record desk | Bill comparison and evidence-based claim | Historian distinguishes enactment from policy merit |

All maps, sprites, rendering, and dialogue are original. The named reference games inform the broad interaction principles only. This is an initial pixel-art environment pass, not a claim of matching their finished animation or visual richness.

## Input and accessibility

- Arrow keys or WASD walk when the map is focused. Single presses take one tile; holding repeats at a controlled rate.
- E, Enter, or Space interacts with a nearby person/object. NPCs turn toward the approaching bill.
- Click the floor to walk using collision-aware paths. Click an NPC/object to approach and interact on arrival.
- Optional accessible destination buttons use the same walking/pathfinding, rather than teleportation or bypassing gates.
- Gold markers identify the current actor or the exit/door leading toward the current objective.
- Movement stops while a modal is open and resumes when it closes. Escape cancels a conversation without committing its pending decision.
- Dialogue uses short complete beats, generally two or three for instructional scenes. Actual amendment and vote controls appear after required dialogue.
- Mandatory conversations and the required debrief carry core AP evidence. Optional NPCs and shelves supplement them.
- Reduced motion removes bobbing/encounter animation; no required rapid input, typewriter waiting, or sound.
- Client-side saving retains legislative state and valid room/tile position. Invalid or stale positions fall back to a safe room entry. Storage denial leaves in-memory play available.

## Major encounters

Institutional votes and presentment use a distinct encounter panel after the actor introduces the stakes. It displays authority, a separate institutional forecast, and an explicit action. Consequences return as short dialogue, and the player resumes movement with the updated bill. Accepted amendments add visible stamps to the bill sprite.

The shared ledger, bill file, drafting sheet, and final comparison remain readable document overlays. They are opened from the world; ordinary progression is no longer a sequence of full-page lesson panels.

## Remaining work

The earlier release's missing legislative branches and additional issues remain outstanding. This change rebuilds interaction for the implemented Alerts route. More art detail, varied portraits, sound, cinematic effects, and first-student pacing measurements are separate work. Chrome on a real managed Chromebook and the school's hosting policy still need a live test.
