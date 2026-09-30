# Linguaggio visivo del mockup — analisi della home e regole per le altre pagine

Questo documento fissa come è costruita la home del mockup, dopo le revisioni, e
come lo stesso linguaggio si applica alle altre pagine. Descrive il **mockup**:
non cambia struttura, contenuti, URL o budget del wireframe (restano validi
`dev-notes.md`, `dev-estimate.md`, `open-points.md`).

Palette: solo Visual Identity Socaf. Socaf Red `#e4002b`, Soft Red `#f33f54`,
Deep Red `#a31000`, Socaf Blue `#0085cf`, Electric Blue `#0255b3`, Crystal Blue
`#4fbdf7`, Jet Black `#001e2a`, Steel Gray `#636362`, Liquid Gray `#dbdbdb`,
bianco. Niente verde, giallo o viola, anche se compaiono nelle reference.

---

## 1. Analisi della home

### 1.1 Il racconto per colore
La home è una sequenza di **stati di colore del fondo** che cambiano mentre si
scorre (strato fisso `.mood`, dissolvenza 0,6 s):

| Zona | Sezioni | Fondo |
|---|---|---|
| Hero | video + materia liquida WebGL | blu profondo del video |
| Rossa | Le macchine | rosso VI pieno (Socaf Red → Soft Red) |
| Azzurra | Il gruppo → Prodotti | azzurro chiaro con aloni Crystal/Socaf Blue |
| Rossa chiara | I marchi → form | rosa chiaro con aloni Socaf/Soft Red |
| Chiusura | Footer | rosso VI in gradiente diagonale |

Il fondo è **fermo**: è la pagina a scorrere sopra. Questo dà profondità.

### 1.2 Il fondale
Sopra il colore di fondo, fissa e immobile, c'è **una sola forma a U**
(`formeLaterali`): una bolla di vetro gelatinoso quasi trasparente, con
- contorno di due fili di luce morbidi nel colore VI della zona;
- materia interna (la stessa della hero, pieghe di raso liquido) molto velata;
- fiamme di luce sfumate che seguono la curva.

È disegnata in due toni (blu e rosso) e cambia tono **insieme** al fondo: non
esiste un momento in cui forma e fondo hanno colori diversi.

### 1.3 Le superfici (tre livelli, mai vetro su vetro)
1. **Fondo** — colore di zona + fondale.
2. **Contenitori** — lastre di vetro smerigliato (`--vetro`): sfocatura forte,
   tinta leggerissima, filo di luce sul bordo, riflesso appena accennato,
   ombra morbida. Raggio 28 px.
3. **Card** — superfici deformabili (vettoriali) di vetro lucido chiaro, raggio
   26 px, immagine interna con raggio 18 px e margine 10 px.

Sezioni "speciali" che rompono il ritmo: *Il gruppo* (contenitore di vetro con
loghi su pastiglie Socaf Blue) e *Prodotti* (lastra a tutta larghezza).

### 1.4 Movimento
- **Claim jelly**: i titoli principali in hover ondeggiano come gelatina,
  sincronizzati con il puntatore (hero, numeri, gruppo, prodotti, form).
- **Card gelatina**: il contorno si gonfia sotto il mouse e viene trascinato
  dal gesto; il testo non si deforma mai.
- **Card macchine**: in hover le altre card ricevono un velo di vetro leggero.
- Nessuna animazione del fondo fuori dalla hero.

### 1.5 Testo e leggibilità
- Titoli BC Novatica, testo corrente Neue Haas Unica (fallback di sistema, OP-11).
- Su fondi chiari: Jet Black / grigio scuro `#2c3a42`. Su rosso/blu pieni: bianco.
- Testi fuori dai vetri: alone chiaro leggerissimo (una sola ombra).
- La riga di servizio (Pronto intervento, Approfondimenti) è solo bianco o nero,
  scelto leggendo cosa passa sotto (anche sopra le card: nero).
- Nessuna frase chiude con una parola sola (`text-wrap:pretty`, `&nbsp;`).

### 1.6 Componenti
- **Nav**: capsula di vetro della reference, voci Jet Black, Noleggio e Prodotti
  in grassetto, tendine quasi opache con hover "box macchine".
- **Pulsanti**: vetro chiaro (secondari), vetro tinto Socaf Red (primari),
  hover = lastra più piena, pressione = leggera compressione.
- **CTA a testo**: Jet Black grassetto con triangolo rosso fermo.
- **Divisori**: lamine di vetro scanalato sottilissime, inclinate.

### 1.7 Cosa non fare (emerso dalle revisioni)
Niente glow esagerati, niente forme dentro i contenitori, niente righe oblique
decorative, niente triangoli che scivolano, niente bordi rettangolari dietro le
card deformate, niente cursori speciali, niente colori fuori VI.

---

## 2. Applicazione alle altre pagine

Stessa grammatica, adattata a pagine ricche di testo:

1. **Testata rossa** — la prima sezione di ogni pagina (titolo e introduzione)
   sta sul fondo **rosso VI**, senza contenitore: titolo bianco con la luce del
   claim della hero e l'effetto jelly in hover. È la "hero" della pagina interna.
2. **Contenuto azzurro** — scorrendo, il fondo vira all'azzurro (stessa
   dissolvenza della home). Ogni sezione è un contenitore `--vetro` (raggio
   28 px), testo scuro.
3. **Fondale** — la stessa forma a U statica, nel tono della zona.
4. **Card** — tutte le card (`.card`, `.formula`, `.sede`) diventano superfici
   di gelatina vettoriale con il vetro chiaro.
5. **Footer** — identico alla home.

Implementazione: `scenaInterna()` in `wireframe.js` (stati di colore delle pagine
interne), `formeLaterali()` e `carteGelatina()` estese a tutte le pagine,
sezione 109 di `wireframe.css`.

---

## 3. Impatto — direzione "editoriale liquida" (sezione 110 del CSS)

- **Testata alta e asimmetrica**: titolo molto grande (fino a ~104 px) a
  sinistra, introduzione a destra allineata in basso; al caricamento il titolo
  emerge da una maschera, poi entra il testo.
- **Sezioni come capitoli**: ogni sezione di contenuto è numerata (01, 02, …)
  con un'etichetta Socaf Red sopra il titolo; titoli più grandi, più aria.
- **Ingressi allo scroll**: le sezioni salgono e si accendono quando entrano
  nello schermo, le card con un ritardo sfalsato. Nessun movimento con
  "riduci movimento" attivo.
- **Grana**: una grana quasi invisibile sui vetri dei contenitori, perché la
  lastra sembri materiale e non plastica.

## Principio guida · le sezioni sono tessere di un mosaico
(indicazione di progetto, 30/09/2026)
Ogni sezione è un blocco autonomo, con forma, raggio e fondo propri, che si accosta agli altri come una tessera: insieme compongono un'unica superficie.
- Nessuna sezione "galleggia" sul fondo pagina: ognuna è una tessera con bordi netti e lo stesso raggio (`--raggio`).
- Tra le tessere c'è un giunto costante (stessa distanza orizzontale e verticale), come la fuga di un mosaico.
- Le tessere possono avere larghezze diverse (intera, 2/3 + 1/3, metà + metà) ma sempre sulla stessa griglia.
- Le tessere NON cambiano colore né regole visive tra loro: un solo linguaggio per tutte, liquid glass + rosso + bianco + il fondo rosso a vetro cannettato di « Le macchine » (sezione 131/133 del CSS).
- L'hero e la sua transizione verso « Le macchine » restano come sono (approvate): il mosaico parte da « Le macchine » in giù.
