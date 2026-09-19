import { rooms, roomOrder, roomFor, objectsFor, isWalkable, pathTo, W, H, T } from './world-data.js';

export function mountWorld(canvas, { phase, highest, location, onInteract, onRoom, onNearby, onMove = () => {}, blocked, amended = 0, reduced = () => false }) {
  const room = location.room;
  const layout = rooms[room];
  const objects = objectsFor(room, phase, highest);
  let player = { x: location.x ?? 11, y: location.y ?? 11 };
  let facing = 'down', last = 0, frame = 0, keys = new Set(), path = [], arrival = null, disposed = false, lastNear = '';
  const ctx = canvas.getContext('2d');
  canvas.width = W * T;
  canvas.height = H * T;

  function nearest() {
    return objects.find(o => Math.abs(o.x - player.x) + Math.abs(o.y - player.y) <= 1) || null;
  }

  function rect(x, y, w, h, c) {
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  // Draw living Bill player sprite with rich pixel details and animations
  function drawBill(x, y, dir, bob, walking) {
    // Drop shadow
    rect(x + 4, y + 19, 16, 4, '#10222a66');

    const lean = walking ? (dir === 'left' ? -1 : dir === 'right' ? 1 : 0) : 0;
    const px = x + 5 + lean;
    const py = y + 2 + bob;

    // Outer border / deckle edge
    rect(px, py, 14, 18, '#8e7039');
    // Parchment paper body
    rect(px + 1, py + 1, 12, 16, '#faedd0');
    // Paper interior texture
    rect(px + 2, py + 2, 10, 14, '#fff9e6');

    // Folded top-right corner
    rect(px + 9, py + 1, 4, 4, '#8e7039');
    rect(px + 10, py + 1, 3, 3, '#c29f58');
    rect(px + 11, py + 1, 2, 2, '#ebd594');
    rect(px + 9, py + 3, 2, 2, '#705423');

    // Simulated legislative lines
    rect(px + 3, py + 4, 5, 1, '#cdb37a');
    rect(px + 3, py + 6, 8, 1, '#d8c592');

    // Official wax seal & ribbon on chest
    rect(px + 8, py + 12, 4, 4, '#b03527');
    rect(px + 9, py + 13, 2, 2, '#eec55c');
    rect(px + 9, py + 16, 1, 2, '#962b1e');
    rect(px + 11, py + 16, 1, 2, '#962b1e');

    // Expressive Eyes with blinking
    const isBlinking = !reduced() && (frame % 130 < 6);
    let eyeY = py + 8;
    let eyeX1 = px + 4, eyeX2 = px + 8;
    if (dir === 'left') { eyeX1 = px + 3; eyeX2 = px + 6; }
    else if (dir === 'right') { eyeX1 = px + 6; eyeX2 = px + 9; }
    else if (dir === 'up') { eyeY = py + 7; }

    if (isBlinking || dir === 'up') {
      rect(eyeX1, eyeY + 1, 2, 1, '#2c373b');
      rect(eyeX2, eyeY + 1, 2, 1, '#2c373b');
    } else {
      rect(eyeX1, eyeY, 2, 2, '#202f34');
      rect(eyeX2, eyeY, 2, 2, '#202f34');
      // Eye reflection glint
      rect(eyeX1, eyeY, 1, 1, '#ffffff');
      rect(eyeX2, eyeY, 1, 1, '#ffffff');
    }

    // Friendly determined smile
    if (dir !== 'up') {
      rect(px + 5, py + 11, 4, 1, '#b5975d');
    }

    // Attached riders/amendments (colored seals pinned to document edge)
    const riderColors = ['#2f7053', '#39607e', '#b86e28'];
    for (let i = 0; i < Math.min(3, amended); i++) {
      const rx = px - 2;
      const ry = py + 7 + i * 3;
      rect(rx, ry, 3, 3, riderColors[i]);
      rect(rx + 1, ry + 1, 1, 1, '#e8cf82'); // brass pin
    }

    // Walking stride legs
    const stride = !reduced() && walking ? (Math.floor(frame / 6) % 2) : 0;
    rect(px + 3, py + 18, 3, 2 + stride, '#725629');
    rect(px + 8, py + 18, 3, 3 - stride, '#725629');
  }

  // Draw role-specific NPC sprites with distinct silhouettes
  function drawNPC(x, y, o, dir, near) {
    const bob = reduced() ? 0 : (Math.floor((frame + o.x * 7) / 28) % 2);
    // Shadow
    rect(x + 5, y + 19, 14, 4, '#10222a66');

    const px = x + 5;
    const py = y + 1 + bob;
    const color = o.color || '#8c9ea6';
    const id = o.id || '';

    // Head base (skin tone)
    const skin = (id === 'witness' || id === 'senator') ? '#d4ad88' : (id === 'caretaker') ? '#b88a68' : '#cba482';
    rect(px + 3, py + 2, 8, 8, skin);

    // Hair / Headwear styles by role
    if (id === 'senator' || id === 'main' && room === 'committee') {
      // Distinguished silver/grey side-parted hair
      rect(px + 2, py + 1, 10, 3, '#c2c8cf');
      rect(px + 1, py + 2, 2, 5, '#9aa1a8');
      rect(px + 10, py + 2, 2, 5, '#9aa1a8');
    } else if (id === 'caretaker') {
      // Blue utility service cap
      rect(px + 1, py, 11, 4, '#2d4352');
      rect(px + 2, py + 3, 10, 1, '#1b2c37');
    } else if (id === 'procedure' || id === 'archive') {
      // Academic hair with spectacles
      rect(px + 2, py + 1, 9, 3, '#6e523f');
      rect(px + 2, py + 3, 2, 4, '#553d2d');
      rect(px + 9, py + 3, 2, 4, '#553d2d');
    } else if (id === 'representative' || id === 'guide') {
      // Professional neat parted hairstyle
      rect(px + 2, py + 1, 10, 3, '#382a24');
      rect(px + 2, py + 3, 2, 5, '#382a24');
      rect(px + 9, py + 3, 2, 4, '#382a24');
    } else {
      // Standard professional hair
      rect(px + 2, py + 1, 10, 3, '#433732');
      rect(px + 2, py + 3, 2, 4, '#433732');
      rect(px + 9, py + 3, 2, 4, '#433732');
    }

    // Eyes and Facial expressions
    if (dir === 'up') {
      // Back of head
      rect(px + 2, py + 2, 10, 6, id === 'senator' ? '#c2c8cf' : id === 'caretaker' ? '#2d4352' : '#433732');
    } else {
      let ex1 = px + 4, ex2 = px + 8;
      if (dir === 'left') { ex1 = px + 3; ex2 = px + 6; }
      else if (dir === 'right') { ex1 = px + 6; ex2 = px + 9; }

      rect(ex1, py + 5, 2, 2, '#21272a');
      if (dir !== 'left' && dir !== 'right') rect(ex2, py + 5, 2, 2, '#21272a');

      // Glasses for parliamentarian / archivist
      if (id === 'procedure' || id === 'archive') {
        rect(px + 3, py + 4, 4, 3, 'rgba(180, 210, 230, 0.4)');
        rect(px + 7, py + 4, 4, 3, 'rgba(180, 210, 230, 0.4)');
        rect(px + 3, py + 4, 8, 1, '#7a91a0');
      }
    }

    // Body / Suit Coat
    rect(px + 1, py + 10, 12, 9, color);

    // Collar, Lapels, and Ties
    if (dir !== 'up') {
      rect(px + 5, py + 10, 4, 2, '#ffffff'); // shirt collar
      const tieColor = id === 'senator' ? '#7e2d3b' : id === 'representative' ? '#2f4f6e' : id === 'executive-aide' ? '#c99e46' : '#4a3f3a';
      rect(px + 6, py + 12, 2, 4, tieColor); // tie

      // Congressional Lapel Pin (gold badge)
      if (id === 'representative' || id === 'senator' || id === 'main') {
        rect(px + 3, py + 12, 2, 2, '#eec55c');
      }
      // ID Lanyard for aides/clerks
      if (id === 'staff' || id === 'leader' || id === 'negotiator') {
        rect(px + 5, py + 13, 4, 3, '#f2e8c4');
        rect(px + 6, py + 14, 2, 1, '#4a6572');
      }
      // Wooden gavel for committee chair
      if (room === 'committee' && o.id === 'main') {
        rect(px + 10, py + 13, 3, 2, '#a07038');
        rect(px + 11, py + 15, 1, 3, '#754f24');
      }
      // Book / Folio for Parliamentarian / Archivist
      if (id === 'procedure' || id === 'archive' || id === 'historian') {
        rect(px + 10, py + 12, 3, 5, '#782d22');
        rect(px + 11, py + 13, 2, 1, '#e8cf82');
      }
    } else {
      // Suit back seam
      rect(px + 6, py + 11, 2, 8, 'rgba(0,0,0,0.15)');
    }

    // Legs / Pants
    const pants = id === 'caretaker' ? '#24343f' : '#1e262d';
    rect(px + 3, py + 19, 3, 3, pants);
    rect(px + 8, py + 19, 3, 3, pants);
  }

  function draw() {
    if (disposed) return;
    frame++;

    // Base background
    rect(0, 0, W * T, H * T, '#0d161e');
    const [l, t, r, b] = layout.size;

    // 1. Draw floor and walls with architectural distinction
    for (let y = t; y <= b; y++) {
      for (let x = l; x <= r; x++) {
        const isWall = x === l || x === r || y < 3 || y === b;
        if (isWall) {
          rect(x * T, y * T, T, T, layout.walls);
          // Wall paneling or trim
          if (y === 2) {
            rect(x * T, y * T + 14, T, 6, '#b5a97f');
            rect(x * T, y * T + 20, T, 4, '#1b2a2b');
          } else if (y === 1) {
            rect(x * T, y * T + 2, T, 2, 'rgba(255,255,255,0.06)');
          }
        } else {
          // Floor rendering per room style
          if (room === 'corridor') {
            // Checkered marble Capitol floor
            const check = (x + y) % 2 === 0;
            rect(x * T, y * T, T, T, check ? '#5d756d' : '#526961');
            rect(x * T, y * T, T, 1, 'rgba(255, 255, 255, 0.08)');
            rect(x * T, y * T, 1, T, 'rgba(0, 0, 0, 0.08)');
          } else if (room === 'house') {
            // House blue carpet with border trim
            rect(x * T, y * T, T, T, '#496b79');
            if ((x * 5 + y * 7) % 8 === 0) rect(x * T + 8, y * T + 8, 4, 4, '#5c8191');
          } else if (room === 'senate') {
            // Senate crimson/purple carpet
            rect(x * T, y * T, T, T, '#674d6b');
            if ((x * 7 + y * 3) % 9 === 0) rect(x * T + 10, y * T + 10, 3, 3, '#7d5f82');
          } else if (room === 'committee') {
            // Warm wood parquet flooring
            rect(x * T, y * T, T, T, '#76684a');
            rect(x * T, y * T + 11, T, 1, '#615438');
            rect(x * T + 11, y * T, 1, T, '#615438');
          } else if (room === 'executive') {
            // Polished Oval Office parquet
            rect(x * T, y * T, T, T, '#5d7567');
          } else {
            // Default handsome tile
            rect(x * T, y * T, T, T, layout.floor);
            rect(x * T, y * T, T, 1, 'rgba(255, 255, 255, 0.07)');
            rect(x * T, y * T, 1, T, 'rgba(0, 0, 0, 0.07)');
          }
        }
      }
    }

    // 2. Specialized Chamber Architecture & Staging
    if (room === 'corridor') {
      // Marble neoclassical fluted columns along the hallway
      for (const cx of [l + 2, l + 5, r - 5, r - 2]) {
        rect(cx * T, 10, 20, 58, '#dce3d5');
        rect(cx * T + 2, 12, 16, 54, '#f0f5ea');
        rect(cx * T + 5, 14, 2, 50, '#cad4c0');
        rect(cx * T + 9, 14, 2, 50, '#cad4c0');
        rect(cx * T + 13, 14, 2, 50, '#cad4c0');
        rect(cx * T - 2, 10, 24, 4, '#c2cbba'); // capital
        rect(cx * T - 2, 64, 24, 5, '#a6b09e'); // base
      }
      // Grand central runner carpet
      rect(10 * T, 3 * T, 4 * T, 11 * T, '#753b3b');
      rect(10 * T, 3 * T, 2, 11 * T, '#e0be6c');
      rect(14 * T - 2, 3 * T, 2, 11 * T, '#e0be6c');
    } else if (room === 'house') {
      // Speaker's Rostrum backdrop & House Mace silhouette
      rect(10 * T, 20, 4 * T, 48, '#2a4454');
      rect(10 * T + 4, 22, 4 * T - 8, 44, '#39576b');
      // Gilded Eagle Crest on rostrum wall
      rect(11 * T + 12, 28, 24, 16, '#cca542');
      rect(11 * T + 18, 25, 12, 6, '#edd379');
      // Blue runner aisle
      rect(10 * T, 3 * T, 4 * T, 11 * T, '#345263');
      rect(10 * T, 3 * T, 2, 11 * T, '#d9be6f');
      rect(14 * T - 2, 3 * T, 2, 11 * T, '#d9be6f');
    } else if (room === 'senate') {
      // Vice President / Presiding Officer Dais & Walnut Canopy
      rect(10 * T, 18, 4 * T, 52, '#422838');
      rect(10 * T + 4, 22, 4 * T - 8, 44, '#56354a');
      // Senate seal & draped velvet swag
      rect(11 * T + 10, 26, 28, 14, '#bfa254');
      rect(10 * T + 6, 24, 3 * T + 12, 4, '#942b3d');
      // Crimson runner aisle with gold Greek key borders
      rect(10 * T, 3 * T, 4 * T, 11 * T, '#522b3e');
      rect(10 * T, 3 * T, 2, 11 * T, '#dfc476');
      rect(14 * T - 2, 3 * T, 2, 11 * T, '#dfc476');
    } else if (room === 'executive') {
      // Iconic Oval Office Medallion Rug
      rect(6 * T, 5 * T, 12 * T, 8 * T, '#2f515e');
      rect(6 * T + 6, 5 * T + 6, 12 * T - 12, 8 * T - 12, '#3c6677');
      rect(8 * T, 6 * T, 8 * T, 6 * T, '#487587');
      // Gold laurel wreath ring representation
      rect(7 * T, 5 * T + 10, 10 * T, 2, '#d4bc72');
      rect(7 * T, 13 * T - 12, 10 * T, 2, '#d4bc72');
    } else if (room === 'committee') {
      // Elevated Committee Dais Rostrum
      rect(8 * T, 3 * T + 12, 8 * T, 20, '#54422b');
      rect(8 * T + 2, 3 * T + 14, 8 * T - 4, 4, '#876b47');
      // Aisle
      rect(10 * T, 4 * T, 4 * T, 10 * T, '#67583f');
      rect(10 * T, 4 * T, 2, 10 * T, '#ba9e63');
      rect(14 * T - 2, 4 * T, 2, 10 * T, '#ba9e63');
    } else if (room === 'archive') {
      // Archive center runner
      rect(10 * T, 3 * T, 4 * T, 11 * T, '#6a5639');
      rect(10 * T, 3 * T, 2, 11 * T, '#cca864');
      rect(14 * T - 2, 3 * T, 2, 11 * T, '#cca864');
    }

    // 3. Tall Palladian Windows with Volumetric Light Shafts
    if (room !== 'corridor') {
      for (const wx of [l + 2, r - 3]) {
        // Window Frame
        rect(wx * T, 14, 44, 38, '#182736');
        rect(wx * T + 3, 16, 38, 32, '#5e858d');
        // Transom arch
        rect(wx * T + 6, 17, 32, 4, '#a2b8be');
        // Muntins (panes)
        rect(wx * T + 21, 16, 3, 33, '#d5cb9f');
        rect(wx * T + 2, 31, 40, 3, '#d5cb9f');
        // Warm angled light shaft
        ctx.fillStyle = room === 'executive' ? 'rgba(255, 245, 190, 0.08)' : 'rgba(210, 235, 230, 0.06)';
        ctx.beginPath();
        ctx.moveTo(wx * T, 52);
        ctx.lineTo(wx * T + 44, 52);
        ctx.lineTo(wx * T + 78, 175);
        ctx.lineTo(wx * T - 22, 175);
        ctx.fill();
      }
    }

    // 4. Glowing Wall Sconces with soft radial gradients
    const sconcePositions = room === 'corridor' ? [l + 1, l + 7, l + 14, r - 1] : [l + 1, r - 1];
    for (const sx of sconcePositions) {
      const px = sx * T + 12;
      const py = 35;
      // Brass torch bracket
      rect(px - 2, py + 2, 4, 8, '#9c8141');
      rect(px - 3, py + 1, 6, 2, '#d4b768');
      // Torch flame
      rect(px - 1, py - 3, 2, 4, '#f5d378');
      // Subtle ambient light radial halo
      const grad = ctx.createRadialGradient(px, py - 1, 2, px, py - 1, 26);
      grad.addColorStop(0, 'rgba(255, 228, 145, 0.22)');
      grad.addColorStop(1, 'rgba(255, 228, 145, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py - 1, 26, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Rich Props Rendering
    for (const [x, y, kind] of layout.props) {
      const px = x * T;
      const py = y * T;
      // Prop shadow
      rect(px + 2, py + 19, 25, 6, '#10222a55');

      if (kind === 'plant') {
        // Terracotta pot with gold band
        rect(px + 6, py + 13, 14, 11, '#946648');
        rect(px + 5, py + 12, 16, 3, '#ba8b68');
        rect(px + 7, py + 18, 12, 2, '#d6ab76');
        // Lush layered foliage
        rect(px + 2, py + 4, 22, 9, '#28523c');
        rect(px + 5, py - 2, 16, 14, '#3d7355');
        rect(px + 8, py - 4, 10, 10, '#5ba179');
      } else if (kind === 'flag') {
        // Brass flagpole with eagle finial
        rect(px + 4, py - 16, 2, 40, '#cfba78');
        rect(px + 3, py - 18, 4, 3, '#f0d98f');
        // Draped cloth
        const flagColor = room === 'senate' ? '#782d3b' : room === 'executive' ? (x < 12 ? '#244572' : '#8a2b38') : '#2f527c';
        rect(px + 6, py - 14, 16, 22, flagColor);
        // Gold fringe & tassel
        rect(px + 6, py + 8, 16, 2, '#ebd17a');
        rect(px + 8, py - 11, 4, 4, '#ffffff'); // star canton
      } else if (kind === 'shelf') {
        // Rich wooden bookcase
        rect(px, py - 14, 26, 38, '#453323');
        rect(px + 1, py - 13, 24, 36, '#2e2015');
        // Shelves
        rect(px + 1, py - 1, 24, 3, '#75593e');
        rect(px + 1, py + 11, 24, 3, '#75593e');
        // Multi-colored leather bound books with gold spine text
        const spineColors = ['#8f2d2b', '#284f6e', '#2e5e3a', '#946c2b', '#5c3968'];
        for (let i = 0; i < 6; i++) {
          rect(px + 2 + i * 4, py - 10, 3, 9, spineColors[i % spineColors.length]);
          rect(px + 2 + i * 4, py - 6, 3, 1, '#f2d480'); // gold tooling
          rect(px + 2 + i * 4, py + 2, 3, 9, spineColors[(i + 2) % spineColors.length]);
          rect(px + 2 + i * 4, py + 6, 3, 1, '#f2d480');
        }
      } else {
        // Desks & Chairs
        if (kind === 'chair') {
          // Leather upholstered chair with polished wooden frame
          rect(px + 3, py + 2, 20, 19, '#433425');
          const leather = room === 'senate' ? '#683547' : room === 'committee' ? '#2f5240' : '#2b4454';
          rect(px + 5, py + 4, 16, 14, leather);
          rect(px + 6, py + 5, 14, 2, 'rgba(255,255,255,0.15)');
        } else {
          // Polished Legislative Desk
          rect(px + 1, py + 3, 24, 18, '#4a3622');
          rect(px, py, 26, 17, '#785b3b');
          rect(px + 1, py + 1, 24, 3, '#a8865c');
          rect(px + 2, py + 6, 8, 8, '#594129'); // drawer
          rect(px + 16, py + 6, 8, 8, '#594129');

          // Desk Accessories
          if (kind.includes('paper')) {
            rect(px + 6, py + 4, 14, 10, kind === 'house-paper' ? '#2f5a7d' : '#6b2d4b');
            rect(px + 7, py + 5, 12, 8, '#f5ecd5');
            ctx.font = 'bold 7px monospace';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(kind === 'house-paper' ? 'HOUSE' : 'SENATE', px + 2, py - 4);
          } else {
            // Paper blotter and inkwell/microphone
            rect(px + 6, py + 4, 14, 9, '#2a3d47');
            rect(px + 8, py + 5, 10, 7, '#f7f0dc');
            // Small brass desk lamp or mic
            rect(px + 2, py + 2, 3, 4, '#cca849');
          }
        }
      }
    }

    // 6. Doors & Interactive Portals
    for (const o of objects) {
      const x = o.x * T;
      const y = o.y * T;

      if (o.type === 'door') {
        // Portal archway
        rect(x - 8, y - 24, 40, 48, '#131e28');
        rect(x - 10, y - 26, 44, 4, '#c2ab6d');
        rect(x - 8, y - 22, 4, 46, '#96834f');
        rect(x + 28, y - 22, 4, 46, '#96834f');
        // Heavy wood door with panels
        rect(x - 4, y - 22, 32, 44, o.locked ? '#353942' : '#3d6166');
        rect(x - 1, y - 18, 12, 16, o.locked ? '#282a30' : '#2b494d');
        rect(x + 13, y - 18, 12, 16, o.locked ? '#282a30' : '#2b494d');
        rect(x - 1, y + 2, 12, 16, o.locked ? '#282a30' : '#2b494d');
        rect(x + 13, y + 2, 12, 16, o.locked ? '#282a30' : '#2b494d');
        // Brass handle
        rect(x + 21, y + 5, 3, 5, '#eec55c');

        // Portal Destination Plate
        ctx.font = 'bold 6px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = o.locked ? '#858880' : '#faecc0';
        ctx.fillText((o.to === 'corridor' ? 'CAPITOL' : o.to).toUpperCase(), x + 12, y - 30);
        ctx.textAlign = 'left';
      } else if (o.type === 'evidence') {
        // Evidence Ledger Table
        rect(x - 2, y - 2, 28, 24, '#4f3b28');
        rect(x, y, 24, 20, '#75583b');
        rect(x + 2, y + 2, 10, 14, '#ebdcb2');
        rect(x + 13, y + 2, 9, 14, '#b03b2e'); // red bound Constitution
        rect(x + 4, y + 5, 6, 1, '#665338');
        rect(x + 15, y + 5, 5, 1, '#f2d480');
      } else {
        const near = Math.abs(o.x - player.x) + Math.abs(o.y - player.y) <= 1;
        const dir = near ? (player.x < o.x ? 'left' : player.x > o.x ? 'right' : player.y < o.y ? 'up' : 'down') : 'down';
        drawNPC(x, y, o, dir, near);
      }
    }

    // 7. Draw Player Character (Bill)
    const isWalking = keys.size > 0 || path.length > 0;
    const playerBob = reduced() ? 0 : isWalking ? (Math.floor(frame / 6) % 2) : (Math.floor(frame / 24) % 2);
    drawBill(player.x * T, player.y * T, facing, playerBob, isWalking);

    // 8. Interaction Markers & Indicators
    const near = nearest();
    for (const o of objects) {
      const isTarget = (o.id === 'main' && room === roomFor(phase)) ||
        (o.type === 'door' && (room === 'corridor' ? o.to === roomFor(phase) : room !== roomFor(phase) && o.to === 'corridor')) ||
        o === near;

      if (isTarget) {
        const mx = o.x * T + 10;
        const my = o.y * T - 14;
        const isFocus = o === near;

        // Bouncing indicator
        const markerBounce = reduced() ? 0 : Math.sin(frame * 0.1) * 2;
        rect(mx - 6, my - 6 + markerBounce, 14, 13, isFocus ? '#fce89f' : '#d9b657');
        rect(mx - 5, my - 5 + markerBounce, 12, 11, isFocus ? '#fff4cc' : '#edd079');

        ctx.font = 'bold 9px monospace';
        ctx.fillStyle = '#1c2830';
        ctx.fillText(isFocus ? 'E' : '!', mx - 2, my + 4 + markerBounce);
      }
    }

    // Top and bottom ambient framing
    rect(0, 0, W * T, 4, 'rgba(10, 20, 28, 0.6)');
    rect(0, H * T - 4, W * T, 4, 'rgba(8, 16, 24, 0.8)');

    if (near?.id !== lastNear) {
      lastNear = near?.id;
      onNearby(near, player);
    }
    location.x = player.x;
    location.y = player.y;
  }

  function interact(o = nearest()) {
    if (blocked()) return;
    if (!o) {
      onNearby(null, player);
      return;
    }
    if (o.type === 'door') {
      if (o.locked) {
        onInteract({ name: 'Door notice', beats: ['Your bill has not reached this room yet. Check the note above the map for your next stop.'] });
        return;
      }
      onRoom(o.to);
      return;
    }
    onInteract(o);
  }

  function step(dx, dy) {
    facing = dx < 0 ? 'left' : dx > 0 ? 'right' : dy < 0 ? 'up' : 'down';
    if (isWalkable(room, player.x + dx, player.y + dy, objects)) {
      player.x += dx;
      player.y += dy;
      onMove({ ...player });
    }
    draw();
  }

  function keydown(e) {
    if (blocked() || e.target !== canvas) return;
    const key = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', 'e', 'enter', ' '].includes(key)) {
      e.preventDefault();
      if (['e', 'enter', ' '].includes(key)) {
        if (!e.repeat) interact();
      } else {
        keys.add(key);
        path = [];
        arrival = null;
        if (!e.repeat) {
          const [dx, dy] = ({ arrowup: [0, -1], w: [0, -1], arrowdown: [0, 1], s: [0, 1], arrowleft: [-1, 0], a: [-1, 0], arrowright: [1, 0], d: [1, 0] })[key];
          step(dx, dy);
          last = performance.now();
        }
      }
    }
  }

  function keyup(e) {
    keys.delete(e.key.toLowerCase());
  }

  function clear() {
    keys.clear();
  }

  function go(o) {
    canvas.focus();
    if (blocked()) return;
    keys.clear();
    if (Math.abs(o.x - player.x) + Math.abs(o.y - player.y) <= 1) {
      interact(o);
      return;
    }
    path = pathTo(room, player, o, objects);
    arrival = o;
  }

  function click(e) {
    const b = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - b.left) / b.width * W);
    const y = Math.floor((e.clientY - b.top) / b.height * H);
    const o = objects.find(o => o.x === x && Math.abs(o.y - y) <= 1);
    if (o) return go(o);
    canvas.focus();
    keys.clear();
    arrival = null;
    path = pathTo(room, player, { x, y }, objects);
    const end = path.at(-1) || player;
    if (isWalkable(room, x, y, objects) && Math.abs(end.x - x) + Math.abs(end.y - y) === 1) {
      path.push({ x, y });
    }
  }

  function loop(time) {
    if (disposed) return;
    if (!blocked() && time - last > 115) {
      last = time;
      if (path.length) {
        player = path.shift();
        onMove({ ...player });
        if (!path.length && arrival) {
          const o = arrival;
          arrival = null;
          interact(o);
        }
      } else if (keys.size) {
        if (keys.has('arrowup') || keys.has('w')) step(0, -1);
        else if (keys.has('arrowdown') || keys.has('s')) step(0, 1);
        else if (keys.has('arrowleft') || keys.has('a')) step(-1, 0);
        else if (keys.has('arrowright') || keys.has('d')) step(1, 0);
      }
    } else if (blocked()) {
      keys.clear();
      path = [];
      arrival = null;
    }
    draw();
    requestAnimationFrame(loop);
  }

  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);
  window.addEventListener('blur', clear);
  canvas.addEventListener('click', click);
  requestAnimationFrame(loop);

  return {
    go,
    objects,
    interact,
    dispose() {
      disposed = true;
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', clear);
      canvas.removeEventListener('click', click);
    }
  };
}
