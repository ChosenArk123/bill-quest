import { conversations } from './dialogue.js';
import { mountWorld } from './world.js';
import { rooms, roomOrder, roomFor, objectsFor, isWalkable } from './world-data.js';
import { cards, sources, scenes, stages, glossary } from './content.js';
import { initial, reduce, forecast, proposal, voteKind, equal, validateSave } from './game.js';

let app = document.querySelector('#app'), dialog = document.querySelector('#dialog');
function getApp() { if (!app) app = document.querySelector('#app'); return app; }
function getDialog() { if (!dialog) dialog = document.querySelector('#dialog'); return dialog; }
const KEY = 'billquest-v1';
let state = initial(), storage = true, lastFocus = null;
let world = null, location = null, conversation = null, resumeDialogue = null;

try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (validateSave(saved)) state = saved;
} catch {
  storage = false;
}

location = { room: roomFor(state.phase), x: 11, y: 11 };
try {
  const saved = JSON.parse(localStorage.getItem(KEY + '-world'));
  if (saved?.phase === state.phase && rooms[saved.room] && roomOrder.indexOf(saved.room) <= highestRoom() && Number.isInteger(saved.x) && Number.isInteger(saved.y) && isWalkable(saved.room, saved.x, saved.y, objectsFor(saved.room, state.phase, highestRoom()))) {
    location = { room: saved.room, x: saved.x, y: saved.y };
  }
} catch {}

const esc = x => String(x).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function button(label, action, extra = '') {
  return `<button data-action="${action}" ${extra}>${label}</button>`;
}
function saveWorld() {
  try {
    localStorage.setItem(KEY + '-world', JSON.stringify({ ...location, phase: state.phase }));
  } catch {
    storage = false;
  }
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    saveWorld();
  } catch {
    storage = false;
  }
}
function textOf(id, v) {
  return cards[id].versions[v];
}

function billSprite() {
  return `<div class="bill-sprite" aria-hidden="true"><div class="fold"></div><div class="bill-eyes">▪ ▪</div><div class="bill-line"></div><div class="bill-line short"></div><span>H.R.</span></div>`;
}
function scenic() {
  return `<div class="scene-art" aria-hidden="true"><div class="moon"></div><div class="stars">· &nbsp; ✦ &nbsp; ·</div><div class="capitol"><div class="spire"></div><div class="dome"></div><div class="roof"></div><div class="columns"></div><div class="steps"></div></div><div class="land"></div>${billSprite()}<div class="art-label">WASHINGTON, D.C. <span> / </span> A FICTIONAL CONGRESS</div></div>`;
}
function header() {
  return `<header class="world-header"><a class="brand" href="#world"><span class="brand-mark">▤</span><span>BILL QUEST</span></a><div class="top-actions">${button('Bill file', 'file')}${button('Evidence', 'evidence')}${button('Glossary', 'glossary')}${button('Settings', 'settings')}</div></header>`;
}

function builder() {
  return `<section class="builder-intro"><div><p class="eyebrow">A BILL-TO-LAW STRATEGY GAME</p><h1>How much of your bill<br>will survive?</h1><p class="lede">Put your bill together, take it through Congress, and decide which changes you can live with.</p><div class="chips"><span>AP U.S. Government</span><span>Keyboard + trackpad</span><span>Emergency Alerts Route</span></div></div>${scenic()}</section><section class="workspace"><div class="builder-heading"><div><p class="eyebrow">01 / EMERGENCY ALERT ACCESSIBILITY</p><h2>What goes in your bill?</h2><p>Choose <strong>three provisions</strong>. Then pick the one you most want to keep.</p></div><span class="count">${state.draft.length} / 3 SELECTED</span></div><div class="cards">${Object.entries(cards).map(([id, c], i) => `<button class="provision ${state.draft.includes(id) ? 'selected' : ''}" data-action="toggle" data-id="${id}" aria-pressed="${state.draft.includes(id)}" ${state.draft.length === 3 && !state.draft.includes(id) ? 'aria-describedby="selection-help"' : ''}><span class="card-top"><span class="card-icon">${c.icon}</span><span class="check">${state.draft.includes(id) ? '✓' : '+'}</span></span><span class="card-number">PROVISION ${String(i + 1).padStart(2, '0')}</span><strong>${c.name}</strong><span class="card-copy">${c.versions[0]}</span><span class="card-reason">${c.reason}</span></button>`).join('')}</div><p id="selection-help" class="hint">To swap a provision, uncheck one first. Each choice gives lawmakers different reasons to support or oppose your bill.</p><div class="draft-footer"><label>Which provision matters most to you? <select id="priority" ${state.draft.length ? '' : 'disabled'}>${state.draft.map(id => `<option value="${id}" ${state.priority === id ? 'selected' : ''}>${cards[id].name}</option>`).join('')}</select></label><div class="basis"><strong>Federal authority</strong><span>Interstate commerce + Necessary and Proper Clause</span></div>${button('Introduce my bill <span aria-hidden="true">→</span>', 'introduce', `class="primary" ${state.draft.length !== 3 ? 'disabled' : ''}`)}</div><details class="disclosure"><summary>How this game works</summary><p>As the bill sponsor, you choose how your coalition responds to proposed changes and amendments as the legislation navigates committee and floor votes. People, costs, and vote counts are simulated for learning purposes.</p><p>This version follows one route through Congress. The vote counts are fixed, so the same choices produce the same results. Real bills can take other routes.</p><p>The president wants lower costs, enough time for upgrades, and accessible alerts across the country. Marking a provision as your priority does not protect it from amendments.</p><p><strong>Congressional Calendar &amp; Session Ticks:</strong> Under Article I and the 20th Amendment, each Congress spans a two-year term. Bills not enacted before <em>sine die</em> adjournment expire. You begin with 18 session ticks representing this limited calendar. Routine actions cost 1 tick, while overcoming a Senate filibuster via cloture costs 3 ticks due to required petition layover and debate time. If your ticks reach 0, the session ends and the bill expires.</p></details></section>`;
}

function forecastPanel(kind, text = state.current) {
  const f = forecast(state, kind, text);
  const label = { committee: 'Committee report', rule: 'House special rule', house: 'House passage', senate: 'Senate passage', cloture: 'Senate cloture', president: 'Match with the president’s priorities', overrideHouse: 'House override', overrideSenate: 'Senate override' }[kind];
  return `<section class="forecast"><div class="forecast-top"><span>${label}</span><span class="tag">SIMULATION</span></div><div class="forecast-value"><strong>${f.total}</strong><span>/ ${f.threshold} ${kind === 'president' ? 'points needed for a signature' : 'votes needed'}</span></div><div class="meter" role="img" aria-label="${f.total} of ${f.threshold} required"><div style="width:${Math.max(0, Math.min(100, f.total / f.max * 100))}%"></div><i style="left:${Math.min(100, f.threshold / f.max * 100)}%"></i></div><p class="forecast-verdict">${kind === 'president' ? (f.total >= f.threshold ? 'The bill meets the president’s priorities.' : 'The president still has objections.') : (f.total >= f.threshold ? 'Enough support for now.' : 'Still short of the votes needed.')}</p><details><summary>Where do these numbers come from?</summary><p>The count starts at ${f.base}. The factors below change it. These numbers are made up for the game; there is no random roll.</p>${f.reasons.map(r => `<div class="factor"><span>${esc(r.label)}</span><b>${r.value > 0 ? '+' : ''}${r.value}</b></div>`).join('')}<p>For these counts, everyone votes and a quorum is present. Passage, cloture, and overrides have different requirements.</p></details></section>`;
}

function amendment() {
  const id = proposal(state);
  if (!id) return `<div class="proposal"><h3>No further changes proposed</h3><p>The proposed changes to these provisions have already been made. The bill is ready for the next decision.</p></div>${button('Return the reviewed text →', 'continue', 'class="primary"')}`;
  const c = cards[id];
  const preview = { ...state.current, [id]: 1 };
  const kind = state.phase === 'senateAmend' ? 'cloture' : state.phase === 'houseAmend' ? 'house' : 'committee';
  return `<div class="proposal"><p class="eyebrow">PROPOSED AMENDMENT ${id === state.priority ? ' · YOUR PRIORITY' : ''}</p><h3>${c.name}</h3><div class="redline"><div><span>CURRENT</span><p>${textOf(id, state.current[id])}</p></div><div><span>PROPOSED</span><p>${textOf(id, 1)}</p></div></div><p class="trade">${c.trade}</p><p class="hint">${kind === 'cloture' ? 'Cloture' : kind === 'committee' ? 'Committee report' : 'House passage'} support: ${forecast(state, kind).total} → ${forecast(state, kind, preview).total}. Costs 1 session tick.</p></div><div class="choice-row">${button('Support the amendment →', 'accept', 'class="primary"')}${button('Defend current text', 'retain')}</div><p class="hint">Adopting this amendment builds coalition support by addressing committee concerns. Defending the current text preserves your original policy language.</p>`;
}

function compare(a, b, original = false) {
  return `<div class="comparison"><div><h3>${original ? 'As introduced' : 'House-approved text'}</h3>${Object.entries(a || {}).map(([id, v]) => `<article><strong>${cards[id].name}</strong><p>${textOf(id, v)}</p></article>`).join('')}</div><div><h3>${original ? 'Current / final text' : 'Senate-approved text'}</h3>${Object.entries(b || {}).map(([id, v]) => `<article class="${a?.[id] !== v ? 'changed' : ''}"><span class="status">${a?.[id] === v ? 'UNCHANGED' : 'AMENDED'}</span><strong>${cards[id].name}</strong><p>${textOf(id, v)}</p></article>`).join('')}</div></div>`;
}

function controls() {
  if (['committee', 'markup', 'houseAmend', 'senateAmend'].includes(state.phase)) return amendment();
  if (state.phase === 'senateRoute') {
    const broad = forecast(state, 'cloture').total >= 60, id = proposal(state);
    return `<div class="proposal"><h3>${broad ? 'Senators agree on a timetable.' : 'A senator objects to the agreement.'}</h3><p>${broad ? 'Nobody objects to the proposed timetable. The Senate can reach a passage vote without cloture.' : (id ? `A senator still has concerns about how the bill would work. The proposed deal changes this wording: ${textOf(id, 1)}` : 'A senator objects to the timetable, and all compromise amendments have already been exhausted. The sponsors must seek cloture to reach a vote.')}</p></div><div class="choices">${broad ? button('Use the consent agreement · 1 tick', 'consent', 'class="primary"') : (id ? button('Accept the deal · 1 tick', 'negotiate', 'class="primary"') : '')}${button('Ask sponsors to seek cloture · 3 ticks', 'seek', !broad && !id ? 'class="primary"' : '')}${broad ? '' : button('Keep the bill as it is; stop here', 'refuse', 'class="danger-text"')}</div>`;
  }
  if (state.phase === 'reconcile') {
    return `${compare(state.house, state.senate)}${equal(state.house, state.senate) ? `<p>The texts already match. No reconciliation is needed.</p>${button('Enroll identical text →', 'identical', 'class="primary"')}` : `<div class="choice-row">${button('Propose House version', 'packageHouse')}${button('Propose Senate version →', 'packageSenate', 'class="primary"')}</div><p class="hint">The other chamber still has to agree to this version. Choosing a version does not pass it.</p>`}`;
  }
  const isVote = Boolean(voteKind(state.phase));
  return button(
    state.phase === 'president' ? 'Present the enrolled bill →' : isVote ? 'Hear the roll call →' : 'Hand the bill to the referral clerk →',
    isVote ? 'startRollCall' : 'continue',
    'class="primary"'
  );
}

function ending() {
  const changed = Object.keys(state.current).filter(id => state.current[id] !== state.introduced[id]);
  return `<section class="ending"><p class="eyebrow">THE RESULT / ${state.outcome === 'Not enacted' ? 'WHY IT STOPPED' : 'LEGISLATIVE RECORD'}</p><h1>${state.outcome}.</h1><p class="lede">${state.failure ? esc(state.failure.reason) : 'Your bill made it into law. Both chambers agreed on the same text, and it cleared the final approval. Now look at what changed along the way.'}</p><div class="result-stats"><div><strong>${3 - changed.length}/3</strong><span>original provisions unchanged</span></div><div><strong>${changed.length}</strong><span>provisions amended</span></div><div><strong>${state.current[state.priority] === state.introduced[state.priority] ? 'Preserved' : 'Amended'}</strong><span>your priority clause</span></div></div>${compare(state.introduced, state.current, true)}<div class="analysis-box"><p class="eyebrow">LOOK BACK AT YOUR BILL</p><h2>What does your bill’s story show?</h2><p>${changed.length ? `${cards[changed[0]].name} changed while lawmakers worked out what they could support. ${cards[changed[0]].trade}` : 'You kept the original wording. Lawmakers still had the power to hold it up or vote against it.'} Article I requires agreement from both chambers and presentment to the president. Chamber rules add more decisions along the way.</p><div class="choices">${button('Requiring several institutions to agree checks power, but can delay a bill or change what it does.', 'claim', 'data-value="checks"')}${button('If most people want a bill, it is guaranteed to become law.', 'claim', 'data-value="majority"')}</div>${state.claim ? `<div class="feedback" role="status">${state.claim === 'correct' ? 'That fits what happened. Federalist 51 explains how divided power creates checks; Federalist 10 explains the competing interests you heard from. Getting more people to agree can take time and change the bill.' : 'Try again. A popular bill can still stall in committee, lose a chamber vote, or face a veto. Article I, Sections 5 and 7 help explain those hurdles.'}</div>` : ''}</div><div class="choice-row">${state.checkpoint ? button('Try the last decision again', 'retry') : ''}${button('Start a new bill →', 'restart', 'class="primary"')}${button('Read the full bill history', 'file')}</div></section>`;
}

function highestRoom() {
  return Math.max(roomOrder.indexOf(roomFor(state.phase)), ...state.history.map(h => roomOrder.indexOf(roomFor(h.phase))));
}
function objective() {
  const target = roomFor(state.phase);
  if (location.room !== target) return `Find ${rooms[target].name.toLowerCase()}. That is your next stop.`;
  return state.phase === 'builder' ? 'Head to the drafting desk to put your bill together.' : state.phase === 'end' ? 'Visit the records desk to see what changed and finish your explanation.' : `Approach ${objectsFor(location.room, state.phase, highestRoom()).find(o => o.id === 'main').name}. Look for the gold marker.`;
}

function render(focus = false) {
  world?.dispose();
  const root = getApp();
  if (!root) return;
  const place = rooms[location.room];
  root.innerHTML = `${header()}<main id="main" class="world-main"><div class="room-heading"><div><p class="eyebrow">${place.subtitle}</p><h1>${place.name}</h1></div><div class="world-clock">${state.phase === 'builder' ? 'DRAFT IN PROGRESS' : state.phase === 'end' ? esc(state.outcome) : 'H.R. SIM-1'}<button type="button" class="ticks-badge" data-action="explainTicks" title="Click to learn about session ticks and the legislative calendar" aria-label="${state.ticks} session ticks remaining. Click to learn about session ticks.">${state.ticks} session ticks ⓘ</button></div></div><div class="world-objective"><span>◆</span><p>${objective()}</p></div><div class="world-frame"><canvas id="world" tabindex="0" role="application" aria-label="Explorable ${place.name}. Move with arrow keys or W A S D. E or Enter interacts nearby. Click the floor to walk; click a person to approach and talk. Accessible destinations follow the map."></canvas><div class="location-tag">${place.name.toUpperCase()}</div></div><div class="exploration-bar"><p id="nearby" aria-live="polite">Walk toward someone, or choose a destination below.</p>${button('Interact · E', 'interact', 'id="interact" disabled')}</div><div class="walk-help"><span>ARROWS / WASD <b>walk</b></span><span>E / ENTER <b>interact</b></span><span>TRACKPAD <b>click to walk</b></span><span>ESC <b>close dialogue</b></span></div><details class="destinations"><summary>People, objects & doors · keyboard / trackpad navigation</summary><div id="destinations"></div></details><p class="world-footnote">${storage ? 'Progress saved in this browser.' : 'Storage unavailable. Keep this tab open.'} Take your time. The people and vote counts are fictional; the government rules are real.</p></main>`;

  world = mountWorld(document.querySelector('#world'), {
    phase: state.phase,
    highest: highestRoom(),
    location,
    amended: Object.values(state.current).filter(v => v === 1).length,
    blocked: () => Boolean(getDialog()?.open),
    reduced: () => document.documentElement.classList.contains('reduce-motion') || matchMedia('(prefers-reduced-motion: reduce)').matches,
    onNearby: (o) => {
      document.querySelector('#nearby').textContent = o ? `${o.name}${o.locked ? ' · awaiting your bill' : ' · press E to interact'}` : 'Walk toward someone, or choose a destination below.';
      document.querySelector('#interact').disabled = !o;
    },
    onMove: (point) => {
      Object.assign(location, point);
      saveWorld();
    },
    onRoom: (room) => {
      location = { room, x: 11, y: 11 };
      saveWorld();
      conversation = null;
      render(true);
    },
    onInteract: interactObject
  });

  document.querySelector('#destinations').innerHTML = world.objects.map(o => button(`${o.type === 'door' ? '↗' : o.type === 'evidence' ? '▤' : '●'} ${o.name}${o.locked ? ' · closed' : ''}`, 'walk', `data-id="${o.id}"`)).join('');
  if (state.notice && !state.outcome && !(state.phase === 'overrideHouse' && state.notice.title === 'Regular veto')) {
    showNotice();
  } else if (focus) {
    document.querySelector('#world')?.focus();
  }
}

function chunks(text) {
  return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(t => t.trim()).filter(Boolean) || [text];
}

function startConversation(name, beats, finish = null, source = null) {
  resumeDialogue = null;
  conversation = { name, beats, index: 0, finish, source };
  showBeat();
}

function showBeat() {
  const c = conversation;
  if (!c) return;
  const last = c.index === c.beats.length - 1;
  openModal(
    esc(c.name),
    `<div class="conversation"><div class="portrait" aria-hidden="true"><span class="portrait-head"></span><span class="portrait-body"></span></div><div><p class="dialogue-beat" aria-live="polite">${esc(c.beats[c.index])}</p><span class="beat-count">${c.index + 1} / ${c.beats.length}</span></div></div><div class="dialogue-actions">${button(last ? (c.finish === 'notice' ? 'Back to the room' : c.finish === 'draft' ? 'Open the drafting desk →' : c.finish === 'ending' ? 'Read the record →' : c.finish === 'evidence' ? 'Open the ledger →' : c.finish ? 'Take a look →' : 'Back to the room') : 'Next →', 'talkNext', 'class="primary"')}${last && c.source ? button('Ask more', 'source', `data-id="${c.source}"`) : ''}</div>`
  );
  dialog.classList.add('conversation-dialog');
  dialog.querySelector('[data-action="talkNext"]')?.focus();
}

function nextBeat() {
  const c = conversation;
  if (!c) return;
  if (++c.index < c.beats.length) return showBeat();
  conversation = null;
  if (c.finish === 'draft') return openModal('Drafting desk · Emergency Alerts', builder());
  if (c.finish === 'ending') return openModal('Your legislative record', ending());
  if (c.finish === 'encounter') return openEncounter();
  if (c.finish === 'notice') return dispatch({ type: 'dismiss' });
  if (c.finish === 'evidence') return evidence();
  closeModal();
}

function interactObject(o) {
  if (o.type === 'evidence') return startConversation('Evidence shelf', ['Wondering where these rules come from? The sources are here.', 'Each entry explains what the source says and how it relates to your bill.'], 'evidence');
  if (o.id === 'main') {
    if (location.room !== roomFor(state.phase)) return startConversation(o.name, ['We are finished here for now.', objective()]);
    if (state.phase === 'builder') return startConversation('Legislative counsel', ['Let’s put your bill together. Pick three provisions from the cards on this desk.', 'Because these alerts travel across state lines, Congress can draw on its interstate commerce power. A member of Congress will need to introduce your bill.', 'Pick the provision you most want to keep. Lawmakers may still ask to change it.', 'You will choose how your coalition responds to proposed amendments as the legislation moves forward.'], 'draft', 'powers');
    if (state.phase === 'end') return startConversation('Records clerk', [state.outcome === 'Not enacted' ? 'Your bill stopped before it could become law. Let’s look at who stopped it and why.' : 'Your bill became law. Let’s compare it with the version you brought in.', 'Check what you kept, what you changed, and which decisions mattered. Then put together your explanation.'], 'ending', 'checks');
    const c = scenes[state.phase], talk = conversations[state.phase];
    return startConversation(talk?.speaker || c.actor, talk?.beats || [...chunks(c.text), ...chunks(c.lesson)], 'encounter', c.evidence);
  }
  startConversation(o.name, o.beats || ['A quiet corner of the Capitol.'], null, o.source);
}

function openEncounter() {
  const c = scenes[state.phase];
  const kind = voteKind(state.phase) || (state.phase === 'president' ? 'president' : null);

  const chamberBanner = (() => {
    if (['committee', 'markup'].includes(state.phase)) {
      return `<div class="chamber-banner chamber-committee"><span>⚖</span> COMMITTEE ON ENERGY & COMMERCE · MARKUP</div>`;
    }
    if (state.phase === 'report') {
      return `<div class="chamber-banner chamber-committee"><span>⚖</span> COMMITTEE ON ENERGY & COMMERCE · REPORT VOTE</div>`;
    }
    if (state.phase.startsWith('house') || state.phase === 'overrideHouse') {
      return `<div class="chamber-banner chamber-house"><span>🏛</span> HOUSE OF REPRESENTATIVES · FLOOR PROCEEDINGS</div>`;
    }
    if (state.phase.startsWith('senate') || state.phase === 'cloture' || state.phase === 'overrideSenate') {
      return `<div class="chamber-banner chamber-senate"><span>🦅</span> UNITED STATES SENATE · LEGISLATIVE SESSION</div>`;
    }
    if (state.phase === 'reconcile') {
      return `<div class="chamber-banner chamber-agreement"><span>▤</span> BICAMERAL CONFERENCE · AMENDMENT EXCHANGE</div>`;
    }
    if (state.phase === 'president') {
      return `<div class="chamber-banner chamber-executive"><span>★</span> THE WHITE HOUSE · PRESIDENTIAL PRESENTMENT</div>`;
    }
    return '';
  })();

  openModal(
    c.actor,
    `${chamberBanner}<div class="encounter-intro"><span class="tag">${c.tag}</span><h2>${c.title}</h2></div>${kind ? forecastPanel(kind) : ''}${state.phase === 'senateRoute' ? `<div class="dual-forecast">${forecastPanel('senate')}${forecastPanel('cloture')}</div>` : ''}${controls()}`
  );
  dialog.classList.add(kind ? 'major-encounter' : 'decision-dialog');
}

function openModal(title, body, notice = false) {
  dialog.className = '';
  lastFocus = document.activeElement;
  dialog.innerHTML = `<div class="dialog-head"><h2 id="dialog-title">${title}</h2>${button(notice ? 'Continue →' : 'Close ✕', notice ? 'dismiss' : 'close', notice ? 'class="primary"' : '')}</div><div class="dialog-body">${body}</div>`;
  if (!dialog.open) dialog.showModal();
  dialog.querySelector('button')?.focus();
}

function showNotice() {
  startConversation(state.notice.title, chunks(state.notice.text), 'notice');
}

function closeModal() {
  if (resumeDialogue) {
    conversation = resumeDialogue;
    resumeDialogue = null;
    showBeat();
    return;
  }
  conversation = null;
  dialog.close();
  document.querySelector('#world')?.focus();
}

function file() {
  openModal('Your bill file', `${state.introduced ? compare(state.introduced, state.current, true) : '<p>Your bill history starts when a member introduces it.</p>'}<h3>What happened along the way</h3><ol class="history">${state.history.map(h => `<li><strong>${esc(h.actor)}</strong><p>${esc(h.text)}</p></li>`).join('')}</ol><p>The original copy stays in this file. Retrying a decision takes you back to an earlier point in the game.</p>`);
}

function evidence(id) {
  if (conversation && dialog.classList.contains('conversation-dialog')) resumeDialogue = { ...conversation };
  const entries = id ? [[id, sources[id]]] : Object.entries(sources);
  openModal('Evidence ledger', entries.map(([key, s]) => `<article class="source"><span class="tag">${s.tag}</span><h3>${s.title}</h3><p>${s.text}</p><p class="hint">${state.evidence.includes(key) ? 'Used in your bill’s story' : 'More background'}</p><a href="${s.url}" target="_blank" rel="noopener noreferrer">Read the source ↗</a></article>`).join(''));
}

// Tension-filled Recorded Roll Call overlay
function triggerRollCall(kind) {
  const f = forecast(state, kind);
  const passed = f.total >= f.threshold;
  const nays = f.max - f.total;
  const pct = Math.min(100, Math.max(0, (f.total / f.max) * 100));
  const threshPct = Math.min(100, Math.max(0, (f.threshold / f.max) * 100));
  const isReduced = document.documentElement.classList.contains('reduce-motion') || matchMedia('(prefers-reduced-motion: reduce)').matches;

  const titles = {
    report: { badge: 'COMMITTEE ON ENERGY & COMMERCE', title: 'Full Committee Report Vote', body: '25 committee members voting' },
    houseRule: { badge: 'HOUSE OF REPRESENTATIVES', title: 'Adoption of Structured Rule', body: '435 members present and voting' },
    houseVote: { badge: 'HOUSE OF REPRESENTATIVES', title: 'Final Passage of H.R. SIM-1', body: '435 members present and voting' },
    cloture: { badge: 'UNITED STATES SENATE', title: 'Vote on Cloture (Senate Rule XXII)', body: '100 senators duly chosen and sworn' },
    senateVote: { badge: 'UNITED STATES SENATE', title: 'Final Passage in the Senate', body: '100 senators voting' },
    houseConcur: { badge: 'HOUSE OF REPRESENTATIVES', title: 'Concurrence in Senate Amendment', body: '435 members voting' },
    senateConcur: { badge: 'UNITED STATES SENATE', title: 'Concurrence in House Amendment', body: '100 senators voting' },
    overrideHouse: { badge: 'HOUSE OF REPRESENTATIVES', title: 'Veto Override Reconsideration', body: 'Two-thirds supermajority required' },
    overrideSenate: { badge: 'UNITED STATES SENATE', title: 'Veto Override Reconsideration', body: 'Two-thirds supermajority required' }
  }[state.phase] || { badge: 'LEGISLATIVE VOTE', title: 'Recorded Roll Call', body: 'Members voting' };

  openModal(titles.title, `
    <div class="rollcall-wrap">
      <span class="rollcall-badge">${titles.badge}</span>
      <h2 class="rollcall-title">${titles.title}</h2>
      <p class="rollcall-sub">${titles.body} · ${f.threshold} affirmative votes required to pass</p>
      <div class="tally-grid">
        <div class="tally-box yea">
          <span class="tally-label">YEAS (IN FAVOR)</span>
          <strong id="roll-yeas">${isReduced ? f.total : 0}</strong>
          <span class="tally-needed">Needed to pass: ${f.threshold}</span>
        </div>
        <div class="tally-box nay">
          <span class="tally-label">NAYS (OPPOSED)</span>
          <strong id="roll-nays">${isReduced ? nays : 0}</strong>
          <span class="tally-needed">Total chamber size: ${f.max}</span>
        </div>
      </div>
      <div class="roll-meter-wrap">
        <div id="roll-meter-fill" class="roll-meter-fill" style="width: ${isReduced ? pct : 0}%"></div>
        <div class="roll-threshold-marker" style="left: ${threshPct}%">
          <span class="roll-threshold-label">${f.threshold} TO PASS</span>
        </div>
      </div>
      <div id="roll-stamp-wrap" class="roll-stamp-wrap ${isReduced ? '' : 'hidden'}">
        <div class="roll-stamp ${passed ? 'stamp-pass' : 'stamp-fail'}">${passed ? 'AGREED TO' : 'REJECTED'}</div>
        <p class="roll-summary">${passed ? `${f.total} members voted Yea, exceeding the constitutional requirement of ${f.threshold}.` : `The affirmative votes (${f.total}) fell short of the required threshold of ${f.threshold}.`}</p>
      </div>
      <div id="roll-action-btn" class="${isReduced ? '' : 'hidden'}" style="margin-top:20px">
        ${button('Record Result & Proceed →', 'confirmRollCall', 'class="primary"')}
      </div>
    </div>
  `);
  dialog.classList.add('rollcall-dialog');

  if (!isReduced) {
    const startTime = performance.now();
    const duration = 850;
    function updateTally(now) {
      if (!dialog.open) return;
      const progress = Math.min(1, (now - startTime) / duration);
      const curYeas = Math.round(f.total * progress);
      const curNays = Math.round(nays * progress);
      const curPct = pct * progress;
      const yeasEl = document.querySelector('#roll-yeas');
      const naysEl = document.querySelector('#roll-nays');
      const fillEl = document.querySelector('#roll-meter-fill');
      if (yeasEl) yeasEl.textContent = curYeas;
      if (naysEl) naysEl.textContent = curNays;
      if (fillEl) fillEl.style.width = `${curPct}%`;

      if (progress < 1) {
        requestAnimationFrame(updateTally);
      } else {
        const stampEl = document.querySelector('#roll-stamp-wrap');
        const btnEl = document.querySelector('#roll-action-btn');
        if (stampEl) stampEl.classList.remove('hidden');
        if (btnEl) btnEl.classList.remove('hidden');
        btnEl?.querySelector('button')?.focus();
      }
    }
    requestAnimationFrame(updateTally);
  }
}

// Official Enactment Ceremony
function showSigningCeremony() {
  openModal('Enacted into Law', `
    <div class="ceremony">
      <span class="ceremony-badge">THE WHITE HOUSE · WASHINGTON</span>
      <h1>ENACTED INTO PUBLIC LAW</h1>
      <p class="ceremony-sub">H.R. SIM-1 has received the presidential signature and is codified into federal statute.</p>
      <div class="ceremony-parchment">
        <div class="parchment-header">
          <span>ONE HUNDRED NINETEENTH CONGRESS OF THE UNITED STATES</span>
          <strong>Public Law 119-SIM</strong>
          <em>An Act to modernize and ensure nationwide accessibility for emergency alerts.</em>
        </div>
        <div class="parchment-body">
          <p>Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled,</p>
          <p>Having passed both the House of Representatives and the Senate in identical form pursuant to Article I, Section 7, and having been presented to the President:</p>
        </div>
        <div class="parchment-sign">
          <span class="sign-seal">THE GREAT SEAL</span>
          <div class="sign-line">
            <span class="sign-signature">Approved — The President</span>
            <small>THE WHITE HOUSE</small>
          </div>
        </div>
      </div>
      <div style="margin-top:22px">
        ${button('Proceed to Legislative Debrief & Analysis →', 'viewDebrief', 'class="primary"')}
      </div>
    </div>
  `);
}

// Congressional Veto Override Ceremony
function showOverrideCeremony() {
  openModal('Veto Overridden', `
    <div class="ceremony">
      <span class="ceremony-badge">CONGRESS OF THE UNITED STATES</span>
      <h1>VETO OVERRIDDEN — ENACTED INTO LAW</h1>
      <p class="ceremony-sub">Two-thirds of both the House and the Senate have voted to override the President’s disapproval.</p>
      <div class="ceremony-parchment">
        <div class="parchment-header">
          <span>BICAMERAL SUPERMAJORITY · ARTICLE I, SECTION 7</span>
          <strong>Public Law 119-SIM (Enacted Over Veto)</strong>
          <em>The objections of the President of the United States notwithstanding.</em>
        </div>
        <div class="parchment-body">
          <p>The House of Representatives having voted by two-thirds (290+) to approve the bill, and the Senate having likewise approved the bill by two-thirds (67+):</p>
          <p>Resolved, that the bill do pass, the objections of the President to the contrary notwithstanding.</p>
        </div>
        <div class="parchment-sign">
          <span class="sign-seal">CONGRESSIONAL SEAL</span>
          <div class="sign-line">
            <span class="sign-signature">Ratified by Congress</span>
            <small>CAPITOL HILL</small>
          </div>
        </div>
      </div>
      <div style="margin-top:22px">
        ${button('Proceed to Legislative Debrief & Analysis →', 'viewDebrief', 'class="primary"')}
      </div>
    </div>
  `);
}

// Official Institutional Autopsy Ceremony
function showFailureCeremony() {
  const failPhase = state.failure?.phase || state.phase;
  const hurdleName = {
    report: 'Committee Gatekeeping Defeat',
    houseVote: 'Defeated on the House Floor',
    cloture: 'Senate Filibuster / Cloture Shortfall',
    senateRoute: 'Unanimous Consent Standoff / Filibuster',
    senateVote: 'Defeated on the Senate Floor',
    houseConcur: 'Bicameral Concurrence Rejection',
    senateConcur: 'Bicameral Concurrence Rejection',
    overrideHouse: 'Veto Sustained in the House',
    overrideSenate: 'Veto Sustained in the Senate'
  }[failPhase] || 'Session Adjournment Sine Die';

  openModal('Bill Not Enacted', `
    <div class="ceremony">
      <span class="ceremony-badge">CONGRESSIONAL RECORD · BILL DISPOSITION</span>
      <div class="roll-stamp stamp-fail" style="margin: 12px 0 16px;">NOT ENACTED</div>
      <h1>${hurdleName}</h1>
      <p class="ceremony-sub">${esc(state.failure?.reason || 'The bill stalled before clearing all constitutional hurdles.')}</p>
      <div class="autopsy-box">
        <h3>Institutional Autopsy</h3>
        <div class="autopsy-point">
          <strong>Where the Process Stopped</strong>
          <span>${scenes[failPhase]?.actor || 'Congressional Process'} (${scenes[failPhase]?.tag || 'PROCEDURE'})</span>
        </div>
        <div class="autopsy-point">
          <strong>Constitutional Principle</strong>
          <span>As Madison warned in Federalist 51, the American legislative process creates multiple institutional veto points. A proposal must build successive, durable coalitions to survive.</span>
        </div>
      </div>
      <div class="choice-row" style="justify-content:center;margin-top:20px">
        ${state.checkpoint ? button('Try the last decision again', 'retry', 'class="primary"') : ''}
        ${button('Review Full History & Debrief', 'viewDebrief')}
        ${button('Start a new bill', 'restart')}
      </div>
    </div>
  `);
}

// Regular Veto Return Ceremony
function showVetoCeremony() {
  openModal('Regular Veto', `
    <div class="ceremony">
      <span class="ceremony-badge">EXECUTIVE MANSION · ARTICLE I, SECTION 7</span>
      <div class="roll-stamp stamp-fail" style="margin: 12px 0 16px;">REGULAR VETO</div>
      <h1>Returned With Objections</h1>
      <p class="ceremony-sub">The President has refused to sign H.R. SIM-1 and returned the enrolled text to the House of Representatives.</p>
      <div class="autopsy-box">
        <h3>Presidential Veto Message</h3>
        <p>The President concluded that the bill’s compliance timeline or costs do not align with administration priorities. Under Article I, Section 7, the President cannot strike individual provisions (no line-item veto) and must veto the bill as a whole.</p>
        <p>Congress now has the constitutional authority to attempt an override. An override requires a two-thirds supermajority in both chambers on the exact, locked text.</p>
      </div>
      <div style="margin-top:20px">
        ${button('Reconsider on the House Floor →', 'dismiss', 'class="primary"')}
      </div>
    </div>
  `);
}

function dispatch(action) {
  try {
    state = reduce(state, action);
    save();
    if (['toggle', 'priority'].includes(action.type)) {
      openModal('Drafting desk · Emergency Alerts', builder());
      return;
    }
    if (action.type === 'claim') {
      openModal('Your legislative record', ending());
      return;
    }
    conversation = null;
    if (['restart'].includes(action.type)) {
      location = { room: 'corridor', x: 11, y: 11 };
      saveWorld();
    }
    if (action.type === 'retry') {
      location = { room: roomFor(state.phase), x: 11, y: 11 };
      saveWorld();
    }
    if (dialog.open) dialog.close();
    render(true);

    if (state.outcome === 'Signed into law') {
      showSigningCeremony();
    } else if (state.outcome === 'Enacted over veto') {
      showOverrideCeremony();
    } else if (state.outcome === 'Not enacted') {
      showFailureCeremony();
    } else if (state.phase === 'overrideHouse' && state.notice?.title === 'Regular veto') {
      showVetoCeremony();
    }
  } catch (e) {
    openModal('Action unavailable', `<p>${esc(e.message)}</p>`);
  }
}

function handle(e) {
  const b = e.target.closest('[data-action]');
  if (!b) return;
  const a = b.dataset.action;

  if (a === 'walk') return world.go(world.objects.find(o => o.id === b.dataset.id));
  if (a === 'interact') return world.interact();
  if (a === 'talkNext') return nextBeat();
  if (a === 'file') return file();
  if (a === 'evidence' || a === 'source') return evidence(b.dataset.id);
  if (a === 'startRollCall') return triggerRollCall(voteKind(state.phase));
  if (a === 'confirmRollCall') return dispatch({ type: 'continue' });
  if (a === 'viewDebrief') return openModal('Your legislative record', ending());
  if (a === 'retry') return dispatch({ type: 'retry' });
  if (a === 'restart') return dispatch({ type: 'restart' });

  if (a === 'close') {
    if (state.notice) return dispatch({ type: 'dismiss' });
    return closeModal();
  }
  if (a === 'explainTicks') return openModal('Session Ticks & The Legislative Calendar', `
    <article class="tick-explainer">
      <p class="lede"><strong>Session ticks simulate the scarce legislative calendar of a two-year congressional term.</strong></p>
      <h3>Constitutional Deadline: Article I &amp; the 20th Amendment</h3>
      <p>Under the U.S. Constitution, each Congress lasts exactly <strong>two years</strong> across two annual sessions. Every bill introduced is in a race against the calendar. When a Congress adjourns <em>sine die</em> at the end of its two-year term, any bill that has not been passed by both chambers and signed into law dies automatically. Bills never carry over to a new Congress; sponsors must reintroduce them from scratch.</p>
      <h3>Why Legislative Actions Cost Ticks</h3>
      <p>A legislative term has a finite number of working floor days. You begin with <strong>18 session ticks</strong> simulating that limited calendar budget:</p>
      <ul>
        <li><strong>Committee referral &amp; markup (1 tick):</strong> Committees review thousands of measures, but chairs have limited days to hold hearings, mark up text, and report bills out.</li>
        <li><strong>House special rules &amp; floor passage (1 tick):</strong> Navigating the Rules Committee and finding debate time on the busy House floor consumes calendar days.</li>
        <li><strong>Senate filibuster &amp; cloture (3 ticks):</strong> Under Senate Rule XXII, overcoming extended debate requires filing a 16-signature petition, observing a mandatory layover period, holding a vote requiring three-fifths of all senators (60 votes), and up to 30 hours of post-cloture debate.</li>
        <li><strong>Bicameral reconciliation &amp; veto overrides (1–2 ticks):</strong> Resolving House-Senate differences via amendment exchange or conference committee, or voting in both chambers to override a presidential veto, requires additional legislative days late in the session.</li>
      </ul>
      <p class="hint">Watch your tick budget in the upper right. If your ticks reach 0 before your bill becomes law, Congress adjourns and the bill dies!</p>
    </article>
  `);
  if (a === 'glossary') return openModal('Government terms', `<dl>${Object.entries(glossary).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`);
  if (a === 'settings') return openModal('Play settings', `<label class="setting"><input type="checkbox" id="motion" ${document.documentElement.classList.contains('reduce-motion') ? 'checked' : ''}> Reduce motion</label><p>Walk with arrow keys or WASD. Press E or Enter near a person or object. Click the floor to walk, or click an NPC to approach and talk. Tab reaches accessible destination buttons; these walk your character to the destination. Escape closes dialogue. This build has no audio or timed input.</p><p>Progress stays on this browser only. School policies may clear storage; the game works without it.</p><p>This version includes the Emergency Alerts bill, fixed vote counts, amendment exchange, signatures, vetoes, and overrides.</p>${button('Restart this run', 'confirmRestart', 'class="danger-text"')}`);
  if (a === 'confirmRestart') return openModal('Start over?', `<p>This clears the current run on this browser.</p>${button('Start a new bill', 'resetAll', 'class="primary"')}`);
  if (a === 'resetAll') {
    state = initial();
    location = { room: 'corridor', x: 11, y: 11 };
    conversation = null;
    save();
    dialog.close();
    return render(true);
  }
  if (a === 'toggle' && !state.draft.includes(b.dataset.id) && state.draft.length === 3) {
    document.querySelector('#selection-help').textContent = 'Deselect one of the three checked provisions first, then choose this one.';
    document.querySelector('#selection-help').setAttribute('role', 'status');
    return;
  }

  dispatch({ type: a, id: b.dataset.id, value: b.dataset.value });
  if (a === 'toggle') document.querySelector(`[data-action="toggle"][data-id="${b.dataset.id}"]`)?.focus();
}

document.addEventListener('click', handle);
document.addEventListener('change', e => {
  if (e.target.id === 'priority') {
    dispatch({ type: 'priority', id: e.target.value });
    document.querySelector('#priority')?.focus();
  }
  if (e.target.id === 'motion') {
    document.documentElement.classList.toggle('reduce-motion', e.target.checked);
    try {
      localStorage.setItem('billquest-motion', String(e.target.checked));
    } catch {}
  }
});
function init() {
  const d = getDialog();
  if (d && !d._hasCancelListener) {
    d._hasCancelListener = true;
    d.addEventListener('cancel', e => {
      e.preventDefault();
      if (state.notice) dispatch({ type: 'dismiss' });
      else closeModal();
    });
  }
  try {
    document.documentElement.classList.toggle('reduce-motion', localStorage.getItem('billquest-motion') === 'true');
  } catch {}
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
