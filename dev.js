(function(){
  "use strict";
  const panel = document.getElementById("devPanel");
  document.getElementById("devBtn").addEventListener("click", () =>
    panel.classList.toggle("open"));

  function devRun(act, stage){
    RUN = {
      act, stage, char: selectedChar,
      score: 0, berries: 0,
      perks: {}, curses: {}, amulets: 3, sirut: 0, items: [],
      spec: null, finished: false,
      sinceEnc: 0, pendingDraft: false, lastEnc: null, nextMod: null
    };
  }
  function enterField(act, stage){
    devRun(act, stage);
    RUN.spec = nextSpec();
    overlay.classList.remove("show", "menu");
    newGame();
    panel.classList.remove("open");
  }

  // --- paneelin sisältö ---
  const bossRows = ACTS.map((a, i) =>
    `<button data-boss="${i + 1},5">⚔️ ${a.miniboss}</button>` +
    `<button data-boss="${i + 1},10">👑 ${a.boss}</button>`).join("");
  const miniRows = Object.keys(MINIGAMES).map(id =>
    `<button data-mini="${id}">${MINIGAMES[id].icon} ${MINIGAMES[id].name}</button>`).join("");
  const encRows = ENCOUNTERS.map(e =>
    `<button data-enc="${e.id}">${e.icon} ${e.title}</button>`).join("");

  panel.innerHTML =
    `<h4>Kenttä</h4>
     <div class="row">
       <select id="devAct">${[1,2,3].map(a =>
         `<option value="${a}">${a}. korpi – ${ACTS[a-1].name}</option>`).join("")}</select>
       <select id="devStage">${Array.from({length:10},(_, i) =>
         `<option value="${i+1}">kenttä ${i+1}</option>`).join("")}</select>
       <button id="devGo" class="wide">Siirry kenttään</button>
     </div>
     <h4>Pomot</h4><div class="row">${bossRows}</div>
     <h4>Minipelit</h4><div class="row">${miniRows}</div>
     <h4>Kohtaamiset</h4><div class="row">${encRows}</div>
     <h4>Työkalut</h4>
     <div class="row">
       <button id="devWin">Voita kenttä</button>
       <button id="devMoves">+10 siirtoa</button>
       <button id="devPerks">Kaikki varusteet</button>
       <button id="devItem">+ esine</button>
       <button id="devBerry">+1000 🫐</button>
       <button id="devUnlock">Avaa hahmot</button>
       <button id="devWipe">Tyhjennä tallennus</button>
     </div>`;

  document.getElementById("devGo").addEventListener("click", () =>
    enterField(+document.getElementById("devAct").value,
               +document.getElementById("devStage").value));

  panel.querySelectorAll("[data-boss]").forEach(b =>
    b.addEventListener("click", () => {
      const [a, s] = b.dataset.boss.split(",").map(Number);
      enterField(a, s);
    }));

  panel.querySelectorAll("[data-mini]").forEach(b =>
    b.addEventListener("click", () => {
      const id = b.dataset.mini;
      devRun(id === "suohyppely" ? 2 : id === "ahkio" ? 3 : 1, 2);
      overlay.classList.remove("show", "menu");
      launchMinigame(id);
      panel.classList.remove("open");
    }));

  panel.querySelectorAll("[data-enc]").forEach(b =>
    b.addEventListener("click", () => {
      const enc = ENCOUNTERS.find(e => e.id === b.dataset.enc);
      devRun(enc.act || 1, 2);
      overlay.classList.remove("show", "menu");
      openEncounter(enc);
      panel.classList.remove("open");
    }));

  document.getElementById("devWin").addEventListener("click", () => {
    if (!RUN || RUN.finished) return;
    if (BATTLE){ dealBossDamage(BATTLE.hp + 999); }
    else { collectGoals = {}; mossLeft = 0; dropLeft = 0; }
    runLevelWin();
    panel.classList.remove("open");
  });
  document.getElementById("devMoves").addEventListener("click", () => {
    if (!RUN) return;
    moves += 10; updateStats();
  });
  document.getElementById("devPerks").addEventListener("click", () => {
    if (!RUN) return;
    for (const id in PERKS) RUN.perks[id] = PERKS[id].max;
    renderPerks();
  });
  document.getElementById("devItem").addEventListener("click", () => {
    if (!RUN) return;
    giveMysteryItem(); renderPerks();
  });
  document.getElementById("devBerry").addEventListener("click", () =>
    bankBerries(4000)); // /4-pankituksen läpi -> +1000
  document.getElementById("devUnlock").addEventListener("click", () => {
    unlockChar("tietaja"); unlockChar("kaataja");
    if (!RUN) showMainMenu();
  });
  document.getElementById("devWipe").addEventListener("click", () => {
    try { localStorage.removeItem("poimuri-vaellus"); } catch(e){}
    location.reload();
  });
})();
