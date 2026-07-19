# POIMURI 🫐

**A berry-picking match-3 roguelike set in the Finnish wilderness.**

Pick blueberries, lingonberries and chanterelles across three haunted backwoods, wield rakes and bear paws as match-3 power pieces, and survive encounters with creatures of Finnish folklore – all the way to Louhi, mistress of Pohjola.

▶ **Play it here: <https://p1p3tt1.github.io/poimuri/>**

The game is written in Finnish. No installs, no accounts, no dependencies – it runs entirely in the browser and works on both desktop and mobile (tap or swipe).

---

## The game

POIMURI is a roguelike *vaellus* (trek): three korpi regions – **Metsä**, **Suo** and **Pohjola** – each ten stages deep. Every region swaps in its own berry species for the board tiles. Stage 5 hides a miniboss and stage 10 a boss drawn from Finnish mythology (Menninkäinen, Hiisi, Näkki, Vetehinen, Pakkanen, Louhi), who fight back with freezing frost, moss armor, and stolen moves. Defeat is final – the next trek starts from the beginning.

### Special pieces

| Piece | Made by | Effect |
|---|---|---|
| **Harava** (rake) | match of 4 | clears a full row or column |
| **Karhunkäpälä** (bear paw) | L/T-shaped match | digs a 3×3 area |
| **Kultakäpy** (golden cone) | match of 5 | swap with any berry to clear that species – or swap with another special to copy it onto every berry of that color |

Swapping two specials together produces bigger combos: crosses, triple sweeps, and the 5×5 Karhuemo. Finish a stage with moves to spare and **Sadonkorjuu** (harvest) converts them into rakes that all detonate in cascading waves.

### Roguelike layer

- **Perks** (Puukko, Karhunkynsi, Hunajapurkki, …) upgrade your specials and picking between stages; **curses** offer power at a price; **Ukonvaaja** amulets save a failed stage.
- **Three playable characters** – Poimija, Tietäjä, Karhunkaataja – with distinct powers, two of them unlocked by playing.
- **Path encounters**: strange mushrooms, berry crones, witches and bear dens present risk/reward choices between stages.
- **Minigames** at path forks: fly a crossbill through the spruces, hop across the bog, sled down the fell.
- **Aitta**, the storehouse: berries picked on every trek accumulate into a meta-currency spent on permanent upgrades and provisions for the next run.

## Project structure

```
index.html          production page (thin shell: markup + links)
poimuri-dev.html    dev page: same game + developer tool panel
styles.css          all game styles (shared)
game.js             all game logic (shared, vanilla JS, no dependencies)
dev.css             dev panel styles
dev.js              dev panel: jump to any stage/boss/encounter/minigame
```

Both pages load the **same** `styles.css` and `game.js` – a gameplay change is a single edit. The dev page adds only the panel (🛠 button, bottom-right) for jumping straight to any stage, boss fight, encounter, or minigame.

## Development

There is no build step and no framework. Clone and open `index.html` in a browser – that's the whole loop. (A local server such as `python -m http.server` works too, and will be required if assets later move behind `fetch`.)

Some orientation for the code in `game.js`:

- **Board logic**: `findRuns` → `planClears` → `resolveCascades` → `expandSpecials` is the match-resolution pipeline; all special-piece detonations flow through it, so perk effects apply everywhere automatically.
- **Icon registry**: every UI icon (perks, encounters, bosses…) resolves through the `ASSETS` map + `ico(id)` helper near the top of `game.js`. Icons are emoji today; replacing any value with an inline `<svg>` string upgrades that icon everywhere at once. Board tiles (berries, kultakäpy, käpykori, moss) are already hand-drawn inline SVG (`ICON_SET_1..3`, `WILD_ICON`, `DROP_ICON`, `MOSS_ICON`). A planned next step is moving UI icons to an SVG sprite sheet (`sprite.svg` + `<symbol>`/`<use>`).
- **Audio** is synthesized at runtime with the Web Audio API – no sound files.
- **Persistence** (unlocks, Aitta savings, settings) uses `localStorage`.

Deployment is GitHub Pages serving this repository as-is: push to `main` and the site updates.

## License

No license granted yet – all rights reserved. (Add a LICENSE file if you want to permit reuse.)
