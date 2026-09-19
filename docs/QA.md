# Verification — first playable

## Completed

- `node --test`: 15 tests pass (10 game rules, the static production contract, and four world/dialogue checks), including all 12 Alerts card/priority initial states.
- `node scripts/build.mjs`: emits only 8 browser files into `dist`.
- Production artifact served locally over HTTP; no source directory is served.
- In-app browser route completed with keyboard Enter activation: introduction → committee → markup → rule → House amendment defended → House passage → Senate amendment accepted → consent → Senate passage → differing-text reconciliation → House concurrence → signature → debrief.
- 1366×768, 1280×720, and 1024×768 layouts checked; document width equals viewport width (no horizontal overflow).
- Production build also loads at `/bill-quest/`, proving relative asset loading from a subdirectory.
- Committee failure exercised in-browser: 11/13 votes; Escape dismissed the autopsy; retry restored committee choices and unchanged introduced text.
- Keyboard Space toggled provision cards, Enter advanced the route, and Tab moved from the restored heading to the first response.
- Correct and incorrect claim responses displayed distinct feedback; reload preserved the ending.
- Source checks consulted the National Archives Constitution, official House rule types, Senate cloture overview, Congress.gov legislative-process reference, and Federalist 10/51. Full content audit remains open.
- Deployment workflow follows GitHub’s [custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages); actual remote deployment has not been run.

## Explicit limitations / required school check

Google Chrome was unavailable through the connected browser controller. The observed UI test used the Codex in-app browser, not a managed Chromebook. Do not label it Chrome-certified or school-network verified.

Before submission, open the deployed URL on an actual school Chromebook:

1. Confirm the host is allowed and the game loads without an extension, account, installation, or external runtime.
2. Play a complete run with keyboard and trackpad at 1366×768 and the device's actual scaling; also inspect 1280×720.
3. Open/close evidence, change priority, trigger failure, retry, and reload a saved run.
4. Confirm behavior when school policy clears or denies browser storage; keep-tab play must still work.
5. Time a first-time player; the 10–15-minute target has not been measured. The current compact route may be shorter.

No public deployment is claimed. The static release, deployment workflow, and host contract exist now; the actual repository/host and school policy remain unverified.


## Exploration rebuild checks

- Existing Alerts reducer tests still pass; every institutional phase has a required character conversation, with no beat over 65 words.
- Every NPC, object, and door is reachable from the safe entry tile in each of seven rooms. Paths never cross walls, furniture, or actors. Door unlocks and override chamber mapping are tested.
- Actual arrow-key presses moved the bill four tiles to counsel; E opened the conversation.
- Browser playthrough used physical travel from corridor to committee, House, Senate, bicameral room, back to House for concurrence, and executive office for signature. A later preview reload resumed in the archive, where the required debrief and claim feedback were verified.
- Direct pointer click on the historian made the bill approach and open the correct dialogue. Ask more opened the matching Federalist 51 ledger entry.
- An automated playtest selector initially failed to recognize the executive exit's distinct “Courtyard → Capitol corridor” label. The game had reached signature normally; this was a test selector mismatch, not a failed legislative transition.
- The local preview process needed restarting after the user resumed the task. Production remains static; the preview process is development-only.

### Follow-up verification

- The rebuilt archive presents the enacted/failed text comparison and accepts the correct evidence-based claim.
- Committee failure was played through in the new world: defend both amendments → 11/13 report vote → autopsy → walk through corridor to archive → debrief → retry. Retry restored the committee checkpoint and 17 ticks, with an explicit rewind explanation.
- Closing a result notice now dismisses the underlying notice state as well as the dialog. This avoids a hidden action lock.
- Ask more opens a source and returns to the same NPC conversation beat on close; it does not force the conversation to restart.
- Refresh after talking to the historian restored the same room and nearby position.
- Direct pointer interaction, single-step keyboard movement, destination pathfinding, short dialogue, institutional decisions, and room transitions were exercised. Browser console error/warning check returned none.
- Exploration layout checked at 1280×720 and 1024×768; 1024-wide document had no horizontal overflow. Actual managed-Chromebook validation remains open.
