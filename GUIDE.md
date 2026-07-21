# POIMURI – Game Guide 🫐

A comprehensive guide to the berry-picking match-3 roguelike. The game itself is in Finnish; this guide uses the Finnish in-game names with English explanations.

▶ Play: <https://p1p3tt1.github.io/poimuri/>

---

## 1. The goal

POIMURI is a roguelike *vaellus* (trek) through three haunted backwoods regions (*korpi*), each ten stages deep:

| Act | Region | Miniboss (stage 5) | Boss (stage 10) |
|---|---|---|---|
| 1 | **Metsä** (forest) | Menninkäinen | Hiisi |
| 2 | **Suo** (bog) | Näkki | Vetehinen |
| 3 | **Pohjola** (the far north) | Pakkanen | Louhi |

Each region swaps in its own six berry/mushroom species for the board tiles. Beat Louhi at stage 3·10 and the trek is complete. Run out of moves with no protection left and the trek ends — the next one starts from stage 1·1. Berries you picked still bank into the **Aitta** (storehouse), the permanent meta-currency.

---

## 2. Board basics

- 8×8 board, six tile species per region. Swap two adjacent tiles (tap or swipe) to make a line of 3+.
- Every swap costs one **move** (*siirto*). Each stage gives a move budget; the stage is failed if moves run out before the goal is met.
- Chain reactions (*ketju*) multiply score. Every cleared berry also adds **+1 🫐** to your trek haul.

### Stage types

| Stage | Goal |
|---|---|
| **Marjareissu** | Collect a quota of 1–2 specific species |
| **Sammalikko** | Clear all moss (*sammal*) — each moss cell has 1–2 layers; matching next to or on it thins one layer |
| **Kangasmaasto** | A lighter mix of both |
| **Korinkanto** | Carry 1–2 **käpykori** baskets from the top of the board to the bottom row by clearing tiles beneath them |
| **Hiisi** (every ~4th stage) | A heavier combined-goal stage |
| Stages 5 & 10 | Boss battles (see §5) |

### Obstacles

| Obstacle | Behavior |
|---|---|
| **Jää** (ice) | Tile is locked; one adjacent match shatters the ice, a second collects the tile. The **Tuohivirsut** perk does both in one hit. |
| **Usva** (mist, act 2+) | Hides the species under fog; the first hit only reveals it. |
| **Pyry** (snowfall, act 3) | Every 3rd move freezes a random tile mid-stage. |
| **Leviävä sammal** (spreading moss) | On some stages (and always under the Rämeen kutsu curse) moss regrows into an adjacent cell every turn you don't thin it. |

Acts 2 and 3 also tighten move budgets (~7 % / ~14 %) — later regions expect an equipped picker.

---

## 3. Special pieces and combos

| Piece | Made by | Effect |
|---|---|---|
| **Harava** (rake) | line of 4 | Clears a full row *or* column |
| **Karhunkäpälä** (bear paw) | L/T-shaped match | Digs a 3×3 area (5×5 with **Karhunkynsi**) |
| **Kultakäpy** (golden cone, joker) | line of 5 | Swap with any berry to clear that whole species — or swap with another special to copy that special onto every tile of its color (Käpäläsade/Haravasade) |

Swapping two specials into each other makes the big plays:

| Combo | Effect |
|---|---|
| Harava + harava | **Risti** — row *and* column cross (Suurristi with Puukko) |
| Käpälä + harava | **Kolmoiskaato** — three parallel lines (five with Karhunkynsi) |
| Käpälä + käpälä | **Karhuemo** — 5×5 blast (7×7 **Jättiemo** with Karhunkynsi) |

### Scoring

- Cleared tiles: **10 p × chain multiplier** (chain 2 = ×2, etc.; **Hunajapurkki** adds +1 per stack from chain 2 on).
- Special piece born: **+50 p** (+100 per **Kultavaskooli** stack).
- Ice broken **+20 p**, mist lifted **+15 p**.
- End-of-stage points are added to the trek total; the **Ahneus** curse multiplies stage score ×1.5.

### Sadonkorjuu (harvest)

Finish a stage with moves to spare and the leftovers convert into haravas that all detonate in cascading waves. Conversion cap: **12**, +6 per **Reppu** stack, +12 under Rämeen kutsu, +4 as Poimija, +2 with the Vankempi kori upgrade. Moves beyond the cap pay **30 p** each.

---

## 4. The path between stages

After every cleared stage:

1. **Kohtaaminen** (encounter) — sometimes (60 % chance once at least 2 stages have passed since the last one; 80 % with the Retkikartta upgrade). See §7.
2. **Varustevalinta** (draft) — always: pick **one of three cards**.

### The draft

The three cards are normally two perks plus a third slot that is a curse (~25 %), an Ukonvaaja (~17 %) or a third perk. When the perk pool runs dry (each perk has a max stack), empty slots fill from a **renewable pool** instead, so the choice never degenerates:

| Card | Effect |
|---|---|
| 🔥 **Nuotiohetki** | Next stage +4 moves |
| 🐾 **Käpälänjälki** | Next stage starts with a karhunkäpälä on the board |
| 🌰 **Kultakäpy** | Next stage starts with a joker on the board |
| 🫐 **Marjasäkki** | +120 berries to the trek haul |
| 💠 **Vaajan siru** | An amulet fragment — three fuse into an Ukonvaaja |
| 🐻 **Karhuntalja** (boss draft only) | +50 % damage in the next battle |
| 🪵 **Tervaskanto** (boss draft only) | The boss's first attack fails |
| ⚒️ **Hionta** (rare) | Push one owned stacking perk past its normal max |

Karhuntalja and Tervaskanto only enter the pool when the *next* stage is a boss fight (stage 5 or 10).

Curses can appear as one option among three, but you are never forced to take one.

---

## 5. Boss battles

Stage 5 is a **miniboss** (18 moves), stage 10 a **boss** (22 moves). Deal damage by clearing tiles: **damage = tiles cleared × chain multiplier**, plus +25 per special born and +15 per special detonated. Moss-covered tiles deal no damage until cleaned (Sammalpanssari armor).

Boss HP scales per act (~242 / 310 / 378 for bosses, ~162 / 208 / 253 for minibosses). Win bonus: miniboss **+400 p**, boss **+700 p and an Ukonvaaja**.

The boss strikes every 2nd move. At half HP a main boss **enrages**: it strikes *every* move and its attacks strengthen.

| Attack | Effect |
|---|---|
| ❄ **Halla** | Freezes 2 tiles (3 enraged) |
| 🌿 **Sammalpanssari** | Grows 3 moss cells (4 enraged) |
| 🫳 **Ryöstö** | Steals a special piece from the board (or a move if there are none; enraged also −1 move) |
| ⏳ **Ahmaisu** | Eats one move |

Each boss has its own attack repertoire — Pakkanen leans hard on Halla, Louhi uses everything. Everyone sees the boss's *next* attack telegraphed; **Tietäjä** with skill II also sees the one after that.

**When a stage fails:** one **Ukonvaaja** ⚡ is consumed and the stage restarts. With none left, the trek ends.

**Ukonvaajat** cap at 3; overflow converts to +300 p. Sources: beating a main boss, drafts, encounters, minigames (15+ gates), and three 💠 sirut fusing into one.

---

## 6. Perks, curses and battle boons

### Varusteet (perks)

| Perk | Max | Effect |
|---|---|---|
| 🎲 Marjanoppa | 3 | +2 moves every stage |
| 🔪 Puukko | 1 | Harava clears row *and* column; upgrades combos; opens encounter options |
| 🐾 Karhunkynsi | 1 | Käpälä digs 5×5; upgrades combos |
| 🍯 Hunajapurkki | 2 | Chain multiplier +1 in every cascade |
| 🥾 Tuohivirsut | 1 | Ice shatters and the tile collects in one hit; opens encounter options |
| 🧦 Sammalsukat | 1 | Each hit thins moss two layers |
| 🐻 Karhunkaato | 2 | Every stage starts with a karhunkäpälä on the board |
| 🎒 Reppu | 2 | Harvest converts +6 more moves; opens encounter options |
| 🥇 Kultavaskooli | 2 | +100 p whenever a special piece is born |
| 🧺 Täkykori | 2 | Baskets are collected one row higher per stack |

### Kiroukset (curses)

| Curse | Upside | Downside |
|---|---|---|
| ❄️ Hallanhenki | +3 moves every stage | 4 tiles start frozen |
| 🪙 Ahneus | Stage score ×1.5 | Collect quotas +25 % |
| 🌫️ Rämeen kutsu | Harvest +12 conversions | Moss always spreads |

A curse can be washed away at the **Kirkas lähde** or **Vanha noita** encounters.

### Eväskortit before a boss

Two draft cards apply only to a boss fight and are offered only in the draft that precedes one (see §4): 🐻 **Karhuntalja** (+50 % damage) and 🪵 **Tervaskanto** (the boss's first attack fails).

---

## 7. Encounters and the berry economy

Berries 🫐 are the trek's trade currency: encounters price their deals in berries, and whatever you don't spend banks into the Aitta at trek's end (one quarter survives the trip home; +20 % with the Aitan avain upgrade).

| Encounter | Options |
|---|---|
| 🍄 **Outo sieni** | Taste: 50 % → 💠 siru +100 🫐, else a curse (or −2 moves). Puukko: safe +150 🫐. |
| 👵 **Marjaeukko** | Trade a random perk for 2 ⚡ · buy a mytty for 250 🫐 → 💠💠 |
| 🪵 **Kaatunut kelo** | Puukko: carve → random perk (or ⚡) · climb: +150 🫐 but −2 moves next stage |
| 💧 **Kirkas lähde** | Drink: washes a curse, or +4 moves next stage if curse-free |
| 🏚 **Hylätty aitta** | Search: 💠 siru · rest: +3 moves next stage |
| 🐜 **Muurahaispesä** | Dig: 45 % → 💠 siru, else −2 moves · Tuohivirsut: guaranteed 💠 |
| 🕳️ **Hiidenkirnu** | Reach in: 55 % → 💠 siru, else −100 🫐 |
| 🧙 **Vanha noita** | Pay 200 🫐: removes a curse, or grants ⚡ if curse-free |
| 🐻 **Karhunpesä** (act 1) | Peek: 50 % → Karhunkaato perk or +200 🫐, else −3 moves |
| 🔥 **Nuotiopaikka** | Rest: +4 moves next stage · Reppu: +150 🫐 |
| 🐦 / 🐸 / 🛷 | Minigame forks (act 1/2/3) — see below |

### Minigames

**Käpylintu** (flappy flight, act 1), **Suohyppely** (bog hopping, act 2), **Ahkio** (sled run, act 3). Same reward ladder in all three, counted in gates/rows:

- Points: 20 p per gate, +400 bonus at 5 gates
- **10 gates → a random perk**
- **15 gates → an Ukonvaaja**

Skipping a minigame is always safe (at worst −1 move next stage in Suohyppely).

---

## 8. The Aitta (storehouse)

Between treks, spend banked berries in the shop:

**Permanent upgrades:** Vankempi kori (harvest +2, 450 🫐) · Retkikartta (more encounters, 600 🫐) · Emännän eväät (first stage of each act +3 moves, 500 🫐) · Aitan avain (banking +20 %, 750 🫐)

**Provisions** (one trek): Ukonvaaja matkaan (200 🫐) · Tuohikontti (random starting perk, 160 🫐)

**Hero skill II** (900 🫐 each): see below.

---

## 9. Characters

| Character | Power | Skill II | Unlock |
|---|---|---|---|
| 🧺 **Poimija** | Harvest +4 conversions · starts with 1 ⚡ | Starts with 2 ⚡ | available from the start |
| 🔮 **Tietäjä** | Sees the upcoming encounter on the path | Sees the boss's next 2 attacks | reach act 2 |
| 🗡️ **Karhunkaataja** | Boss damage +25 % · starts with Puukko · field stages −2 moves | Damage +40 % | complete the trek |

---

## 10. Strategy notes

- **Chains beat singles.** The chain multiplier drives both score and boss damage; set up cascades low on the board.
- **Save specials for bosses** — but not *on* the board between moves: Ryöstö steals unspent specials. Detonate before the boss's strike lands (watch the counter above the board).
- **Clean moss first in battles.** Armored tiles deal zero damage.
- **Hoard sirut and berries with a plan.** 300 🫐 held to the end banks 75 to the Aitta; spent at the noita it can erase a bad curse mid-trek. Early trek, spending is usually better.
- **Karhunkaato + Käpälänjälki stack.** Starting a boss with two or three paws on the board is a huge opening burst.
- **Take Hallanhenki with Tuohivirsut**, Rämeen kutsu with Sammalsukat — the right perk turns a curse's downside off.
- **Marjanoppa is quietly the best perk**: +2 moves per stage is +2 harvest haravas on every clean win.
- **Enrage half of a boss fight is a race.** Plan to have specials banked as the boss crosses 50 % HP.

---

## 11. Versions

- `index.html` — the game.
- `poimuri-dev.html` — same game plus a developer panel (🛠 bottom right) for jumping to any stage, boss, encounter or minigame, granting perks/berries, and wiping the save.

Saving (Aitta, records, unlocks) uses `localStorage`; in sandboxed previews progress lasts only for the session.
