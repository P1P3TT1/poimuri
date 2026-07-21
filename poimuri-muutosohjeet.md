# POIMURI – toteutusohjeet Claude Codelle

Kaksi toisistaan riippumatonta muutosta `game.js`:ään (ja pieniä liitännäismuutoksia `dev.js`:ään sekä dokumentaatioon). Tee ne **kahtena erillisenä committina** tässä järjestyksessä. Vaihe 1 on mekaaninen siivous, vaihe 2 koskettaa kohtaamisten arvontalogiikkaa, joten pidä ne erillään.

Testaus: peliä ei käännetä. Avaa `poimuri-dev.html` selaimessa ja käytä oikean alakulman 🛠-paneelia (siirry kenttiin, pomoihin, kohtaamisiin, minipeleihin).

---

## Tausta

Nykyiset "tuntemattomat esineet" (`MYSTERY_ITEMS`, 6 kpl) poistetaan kategoriana. Idea on epäselvä: ne ovat viivästettyjä passiivisia bufeja ilman pelaajan toimijuutta, eikä "mysteeri" kanna riskiä, koska kaikki kuusi ovat pelkästään positiivisia.

Kuudesta esineestä neljällä on jo käytännössä vastine muualla (siirtobonukset, HP-alennus, varavaaja), joten ne karsitaan. Kaksi aidosti erottuvaa vaikutusta säilytetään **eväskortteina** (`BOON_CARDS`), jotka ilmestyvät draftiin vain ennen pomotaisteluita:

- **Karhuntalja** 🐻 – vahinko +50 % seuraavassa taistelussa
- **Tervaskanto** 🪵 – pomon ensimmäinen isku hukkaa

Lisäksi Tietäjä-hahmon kyvyt uudistetaan, koska sen entinen "tunnistaa esineet" -etu kuolee esineiden mukana.

---

## Vaihe 1 – Poista mysteeriesineet, siirrä kaksi booneihin

### 1.1 Uudet eväskortit

**`ASSETS`-rekisteri:** lisää kaksi ikonia. Voit poistaa vanhat `myst_`-avaimet (`myst_karhuntalja`, `myst_hiidenhammas`, `myst_ukonkivi`, `myst_evaskaary`, `myst_tervaskanto`, `myst_noidanrumpu`) ja lisätä tilalle:

```js
boon_talja:  "🐻",
boon_tervas: "🪵",
```

**`BOON_CARDS`:** lisää kaksi korttia. Näiden `apply` vie vaikutuksen `addNextMod`-putken läpi (sama mekanismi kuin muilla booneilla):

```js
{ id: "talja",  icon: ico("boon_talja"),  name: "Karhuntalja",
  desc: "Vahinko +50 % seuraavassa taistelussa.",
  apply: () => addNextMod({ dmgMult: 0.5 }) },
{ id: "tervas", icon: ico("boon_tervas"), name: "Tervaskanto",
  desc: "Pomon ensimmäinen isku hukkaa.",
  apply: () => addNextMod({ skipFirst: 1 }) },
```

**`openDraft` – rajaus pomoja edeltäväksi:** nämä kaksi korttia saavat esiintyä vain kun seuraava etappi on taistelu. `openDraft`:n suoritushetkellä `RUN.stage` on jo *tuleva* etappi, joten ehto on `RUN.stage === 5 || RUN.stage === 10`.

Muut boonit täydentävät `fillers`-listaa aina. Erottele talja ja tervas omaksi haarakseen: lisää ne `fillers`-listaan vain kun ehto täyttyy, ja jätä ne pois muuten. Konkreettisesti: `BOON_CARDS.map(...)` tuottaa nyt kaikki boonit fillereiksi – suodata talja ja tervas pois kun seuraava etappi ei ole pomo:

```js
const bossNext = RUN.stage === 5 || RUN.stage === 10;
const fillers = BOON_CARDS
  .filter(b => bossNext || (b.id !== "talja" && b.id !== "tervas"))
  .map(b => ({ kind: "boon", id: b.id }));
```

### 1.2 Vaikutusten luku `newGame`:ssä

Nyt taistelun alussa luetaan esineitä `RUN.items`-listasta `setTimeout`-paljastuksilla (`karhuntalja`, `hiidenhammas`, `tervaskanto`, `noidanrumpu`) ja kentän alussa `evaskaary`. **Poista koko tämä esineiden lukulohko** sekä taistelu- että tavoitekenttähaarasta.

Korvaa se `nextMod`-lukemisella. `newGame`:ssä on jo rivi, joka lukee siirtobonuksen:

```js
NM = RUN.nextMod;
RUN.nextMod = null;
if (NM && NM.moves) moves = Math.max(6, moves + NM.moves);
```

Lisää heti tämän jälkeen taistelukohtaiset vaikutukset. `BATTLE` on jo rakennettu tässä vaiheessa (jos etappi on taistelu), joten mutatoi sitä suoraan:

```js
if (BATTLE && NM && NM.dmgMult) BATTLE.dmgMult = 1 + NM.dmgMult;
if (BATTLE && NM && NM.skipFirst) BATTLE.skipFirst = true;
```

Tarkista, että `BATTLE.dmgMult`-oletusarvo (`dmgMult: 1` `BATTLE`-oliossa) ja `BATTLE.skipFirst`-käsittely pomon iskulogiikassa (`performBossAttack`) toimivat edelleen – niiden pitäisi, koska poistetut esineet käyttivät jo samoja kenttiä.

### 1.3 Poista `MYSTERY_ITEMS`-infrastruktuuri

Poista kokonaan:

- `const MYSTERY_ITEMS = { ... }`
- `function giveMysteryItem()`
- `function consumeItem(id)`
- `RUN.items`-kentän alustus `startRun`:ssa (`items: []`) ja `dev.js`:n `devRun`:ssa
- Draftin `kind: "item"` -käsittely: nappikäsittelijän haara `else if (s.kind === "item") giveMysteryItem();`, `cardInfo`:n `s.kind === "item"` -haara, ja `fillers`-listan `if (Object.keys(MYSTERY_ITEMS).some(...)) fillers.push({ kind: "item" });`
- `renderInventory`:n "Esineet"-osio (`if (RUN.items.length){ ... }`), johon kuuluu myös Tietäjän `charIs("tietaja")`-esinepaljastus
- `runLevelFail`:n Ukonkivi-pelastus (`if (RUN.amulets === 0 && RUN.items.includes("ukonkivi")){ ... }`) – poista koko lohko, jolloin häviö etenee suoraan Ukonvaaja-tarkistukseen

**🎒-repun laskuri:** tarkista `updateStats` (tai vastaava), jossa reppupainikkeen luku `🎒<span class="inv-count">${n}</span>` lasketaan. Jos `n` viittaa `RUN.items.length`:iin, korjaa laskuri: joko poista numeromerkki tai laske sen tilalle esimerkiksi varusteiden määrä. Reppu-näkymä (Suojat, Varusteet, Kiroukset) jää muuten ennalleen.

### 1.4 Poista esinepalkinnot muualta

**Aitta – Kääro pois.** Poista `AITTA_GOODS.once`-listasta `{ id: "kaaro", ... }`. Poista `startRun`:sta `if (provisions.kaaro){ giveMysteryItem(); }`. Tarkista päävalikon `provLine`, joka listaa pakatut eväät `AITTA_GOODS.once`-listasta – sen ei pitäisi kaatua, kunhan Kääro on poistettu listalta.

**Kohtaamiset – korvaa kolme esinepalkintoa.** Kolme kohtaamista jakaa nyt esineitä `giveMysteryItem`:llä. Korvaa palkinnot olemassa olevilla resursseilla (siru, marjat, vaaja):

- **Marjaeukko** (`eukko`) – valinta "Osta mytty" (250 🫐 → esine): muuta esimerkiksi kahdeksi sirulle tai vaajaksi. Ehdotus:
  ```js
  { label: "Osta amuletti", desc: "250 🫐 → 💠💠 kaksi vaajan sirua", minBerries: 250,
    act(){ RUN.berries -= 250; gainSiru(2);
      return "Eukko ojentaa kaksi kimaltavaa sirua. <b>💠💠</b>"; } },
  ```
- **Hylätty aitta** (`aitta`) – valinta "Tutki sisältö": nyt esine tai siru. Jätä pelkkä siru:
  ```js
  act(){ gainSiru(); return "Nurkasta kimaltaa vanhojen tuohien alta. <b>💠 Vaajan siru</b>"; }
  ```
- **Hiidenkirnu** (`kirnu`) – valinta "Kurota pohjalle": nyt esine/siru tai −100 🫐. Korvaa esinehaara sirulla:
  ```js
  act(){
    if (Math.random() < 0.55){ gainSiru(); return "Pohjalla kimaltaa ukonvaajan siru. <b>💠 Vaajan siru</b>"; }
    RUN.berries = Math.max(0, RUN.berries - 100);
    return "Kurottaessasi korista kirpoaa marjoja kuoppaan. <b>−100 🫐</b>";
  }
  ```

Käy kohtaamiset läpi ja varmista, ettei yksikään viittaa enää `giveMysteryItem`:iin.

**`dev.js` – poista "+ esine" -työkalu.** Poista `<button id="devItem">+ esine</button>` paneelin HTML:stä ja sen käsittelijä (`document.getElementById("devItem")...` joka kutsuu `giveMysteryItem`).

### 1.5 Dokumentaatio

- `game.js`:n opasteksti (`guideBody` / Poimijan opas): jos esineet mainitaan, päivitä.
- `GUIDE.md`: poista tai korvaa luvun 6 "Tuntemattomat esineet" -taulukko. Lisää Karhuntalja ja Tervaskanto boonien yhteyteen (luvut 4 ja 5). Päivitä Ukonvaajan lähteet ja kohtaamistaulukon (luku 7) muuttuneet palkinnot.
- `README.md`: poista maininnat mysteeriesineistä ja Käärosta.

### Vaiheen 1 hyväksyntäkriteerit

- Peli käynnistyy ja vaellus etenee ilman virheitä konsolissa.
- Koodissa ei ole viittauksia nimiin `MYSTERY_ITEMS`, `giveMysteryItem`, `consumeItem`, `RUN.items`, `ukonkivi`, `kaaro`.
- Ennen etappia 5 tai 10 draftissa voi esiintyä Karhuntalja tai Tervaskanto; muina etappeina ei.
- Karhuntalja nostaa taisteluvahinkoa (`BATTLE.dmgMult === 1.5`); Tervaskanto estää pomon ensimmäisen iskun.
- Edistymisen nollaus (`resetProgress`) ja tallennuksen lataus toimivat.

---

## Vaihe 2 – Tietäjän uudistus

Kolme muutosta: perustaidoksi tulee polun ennakointi, entinen iskuennuste siirtyy Tietäjä II -parannukseen, ja kykytekstit päivitetään.

### 2.1 Perustaito: näkee tulevan kohtaamisen

**Ongelma:** kohtaaminen arvotaan vasta `proceedBetweenStages`-hetkellä (`openEncounter` valitsee kohtaamisen satunnaisesti juuri silloin). Jotta Tietäjä voi nähdä sen etukäteen kentän aikana, tapahtuma pitää arpoa ennalta ja tallentaa `RUN`-tilaan.

**Ratkaisu – esiarvonta:**

1. Lisää apufunktio, joka arpoo tulevan tapahtuman ja tallentaa sen. Se korvaa `proceedBetweenStages`:n sisäisen arvonnan. Talleta `RUN.nextEnc`-kenttään joko kohtaamisen id tai `null` (ei kohtaamista → pelkkä draft):

   ```js
   function rollNextEncounter(){
     if (RUN.sinceEnc >= 1 && Math.random() < (permOwned("kartta") ? 0.8 : 0.6)){
       const pool = ENCOUNTERS.filter(e =>
         (!e.act || e.act === RUN.act) && e.id !== RUN.lastEnc);
       RUN.nextEnc = pool.length
         ? pool[Math.floor(Math.random() * pool.length)].id
         : null;
     } else {
       RUN.nextEnc = null;
     }
   }
   ```

   Huom. `sinceEnc`-ehto: nykyinen logiikka vaatii `sinceEnc >= 2` ja kasvattaa laskuria `proceedBetweenStages`:n alussa. Kun arvonta siirtyy aikaisemmaksi, säädä laskurin kasvatus ja ehto niin, että kohtaamisten tiheys pysyy samana. Yksinkertaisin tapa: kasvata `RUN.sinceEnc` heti `rollNextEncounter`:n alussa ja käytä ehtoa `>= 2` kuten ennen. Testaa dev-paneelilla, ettei kohtaamisia tule joka etapin jälkeen eikä liian harvoin.

2. **Kutsu `rollNextEncounter` kun tavoitekenttä alkaa** (ei taistelukentissä – niitä ei edellä kohtaaminen samalla tavalla, tarkista nykyinen käytös). Luonteva paikka on `newGame`:n loppu tai `proceedBetweenStages`:a edeltävä kohta. Tärkeää: arvonnan pitää tapahtua *ennen* kuin pelaaja pelaa kentän, jotta Tietäjä ehtii näyttää sen.

3. **`proceedBetweenStages` lukee esiarvotun tuloksen** sen sijaan, että arpoisi uudelleen:

   ```js
   function proceedBetweenStages(){
     if (RUN.nextEnc){
       RUN.sinceEnc = 0;
       RUN.pendingDraft = true;
       openEncounter(ENCOUNTERS.find(e => e.id === RUN.nextEnc));
       RUN.nextEnc = null;
     } else {
       openDraft();
     }
   }
   ```

   `openEncounter` ottaa jo `forced`-parametrin, joten voit antaa esiarvotun kohtaamisen suoraan.

4. **Näyttö Tietäjälle:** kun `charIs("tietaja")` ja `RUN.nextEnc` on asetettu, näytä tulevan kohtaamisen ikoni ja nimi kentän aikana. Luonteva paikka on matkajana (`trailHTML`) tai tilastorivi. Ehdotus: lisää `trailHTML`:n loppuun rivi, joka näkyy vain Tietäjälle:

   ```js
   if (charIs("tietaja") && RUN.nextEnc){
     const e = ENCOUNTERS.find(x => x.id === RUN.nextEnc);
     s += `<div class="trail-foresee">Edessä: ${e.icon} ${e.title}</div>`;
   }
   ```

   Minipelit näkyvät automaattisesti osana kohtaamista: `lintu` → Käpylintu, `suonsilma` → Suohyppely, `rinne` → Ahkio. Halutessasi voit näyttää minipelin oman ikonin, jos tuleva kohtaaminen on jokin näistä.

   Lisää `styles.css`:ään kevyt tyyli `.trail-foresee`-luokalle (pieni, himmeä teksti).

### 2.2 Siirrä iskuennuste Tietäjä II:een

Nyt pomon kahden seuraavan iskun näyttö (`BATTLE.next` ja `BATTLE.next2`) on kytketty perus-Tietäjään. Etsi kohta, jossa iskut renderöidään (todennäköisesti `renderBossBar`), ja **vaihda ehto perus-Tietäjästä Tietäjä II:een**. Käytä olemassa olevaa apufunktiota:

```js
// ennen: charIs("tietaja")
// jälkeen:
charIs("tietaja") && heroUpgraded()
```

`heroUpgraded()` palauttaa tosi, kun kuluvan hahmon II-parannus on ostettu (`owned["tietaja2"]`).

**Poista Tietäjä II:n −10 % HP -etu.** Tietäjä II:n ainoa vaikutus on jatkossa iskuennuste. Poista `newGame`:stä rivi:

```js
if (owned[RUN.char + "2"] && RUN.char === "tietaja")
  BATTLE.hp = BATTLE.maxHp = Math.round(BATTLE.hp * 0.9);
```

### 2.3 Kykytekstit

**`CHARS.tietaja.power`** – korvaa:

```js
power: "Näkee tulevan kohtaamisen polulla",
```

**`AITTA_GOODS.hero` – Tietäjä II:n kuvaus** – korvaa iskuennusteella. Esimerkiksi:

```js
{ id: "tietaja2", char: "tietaja", icon: ico("char_tietaja"),
  name: "Tietäjän taito II",
  desc: "Näkee pomon 2 seuraavaa iskua.", price: 900 },
```

### 2.4 Dokumentaatio

- `GUIDE.md` luku 9 (hahmot): päivitä Tietäjän kyky ja Skill II.
- `README.md`: päivitä hahmojen kuvaus.
- `game.js`:n opasteksti, jos siinä kuvataan hahmoja.

### Vaiheen 2 hyväksyntäkriteerit

- Perus-Tietäjällä matkajanassa (tai tilastorivillä) näkyy tulevan kohtaamisen ikoni ja nimi, muilla hahmoilla ei.
- Kohtaamisten tiheys pysyy suunnilleen ennallaan (esiarvonta ei muuta todennäköisyyksiä).
- Ilman Tietäjä II:ta pomon iskuennuste ei näy; II:n ostamisen jälkeen näkyy, ja pomo aloittaa 10 % heikompana.
- Muut hahmot (Poimija, Karhunkaataja) toimivat ennallaan.

---

## Yleistä

- Ei build-vaihetta. Testaa suoraan `poimuri-dev.html`:llä.
- Testaa myös reunatapaukset: edistymisen nollaus, tallennuksen lataus vanhalla datalla (mahdolliset vanhat `RUN`-rakenteet localStoragessa – kesken oleva vaellus ei säily istuntojen välillä, joten tämä koskee vain Aittaa, ennätystä ja avauksia).
- Pidä vaiheet 1 ja 2 erillisinä committeina selkeillä viesteillä.
