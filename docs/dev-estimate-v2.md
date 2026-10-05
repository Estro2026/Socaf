# Socaf — Stima di sviluppo v2 (ottobre 2026)

Aggiorna `dev-estimate.md` (v1, 232 h + 8 h di buffer). Due cambiamenti di perimetro:

1. **Il sito da sviluppare è il mockup attuale**, non il wireframe di partenza: dentro ci sono ora le strisce a icone,
   le liste cliccabili fisse allo scroll, le testate con video, la sezione persone, il sistema di tessere e colori
   (bianco / vetro / contorno, azzurro sul bianco, varianti Noleggio rossa e Usato azzurra), le card cliccabili per intero
   e il copy UX di circa 50 pagine.
2. **La migrazione rientra nelle 240 h**: import di 184 articoli, 119 schede macchina, ~30 pagine, media e PDF
   dall'attuale sito Ghost (contenuti da headless CMS), più la compilazione dei dati delle schede.

Stack invariato: WordPress · ACF Pro · Elementor Pro · JetEngine · The SEO Framework · Code Snippets.

Restano **fuori** da entrambi gli scenari: scrittura di nuovi testi, fotografia e video, risposte alle FAQ,
decisioni commerciali di Socaf, e-commerce (vedi §Fuori perimetro).

---

## Riepilogo

| # | Area | v1 | **Caso base** | **Caso peggiore** |
| --- | --- | ---: | ---: | ---: |
| 1 | Fondamenta: WordPress, ACF, CPT, tassonomie, permalink, staging | 20 | **17** | 24 |
| 2 | D19 e componenti globali: header, footer, menu, breadcrumbs, ricerca, form | 22 | **20** | 26 |
| 3 | Componenti riutilizzabili: card, listing, FAQ, noleggio/usato, sedi, strisce a icone | 18 | **17** | 22 |
| 4 | D1 · Scheda macchina (modulo sticky "dal basso", galleria, specifiche, PDF) | 14 | **12** | 16 |
| 5 | D2 · Sottocategoria | 10 | **7** | 10 |
| 6 | D3 · Famiglia | 10 | **8** | 10 |
| 7 | D4 + D5 · Noleggio (4 landing; lavamoquette sospesa) | 12 | **9** | 13 |
| 8 | D6 + D7 · Usato | 10 | **8** | 10 |
| 9 | D8 + D9 · Settori (7 istanze) | 12 | **9** | 12 |
| 10 | D10 + D11 · Prodotti (13 categorie, descrizione breve statica) | 12 | **8** | 10 |
| 11 | D12 · Articolo | 6 | **5** | 6 |
| 12 | D13 · Archivio approfondimenti | 6 | **4** | 6 |
| 13 | D14 · Sede | 6 | **5** | 6 |
| 14 | D15 · Contatti | 6 | **5** | 6 |
| 15 | D16 · Home (9 blocchi, video, marchi, icone settore illustrate) | 7 | **6** | 9 |
| 16 | D17 · Ricerca | 8 | **5** | 8 |
| 17 | D18 + D20 · Servizi, azienda, referenze (testate video, persone, liste lunghe) | 8 | **8** | 11 |
| 18 | Responsive, accessibilità, cross-browser, QA | 20 | **14** | 22 |
| 19 | SEO tecnico, redirect, dati strutturati, performance | 12 | **10** | 16 |
| 20 | Linguaggio visivo e comportamenti del mockup | 13 | **14** | 22 |
| 21 | **Nuova** · Inserimento del copy UX (~50 pagine, title, meta, alt) | — | **6** | 10 |
| 22 | **Nuova** · Migrazione contenuti e dati | fuori | **34** | 62 |
| | **Totale sviluppo** | 232 | **231** | **337** |
| | Buffer | 8 | **9** | 0 |
| | **Totale** | 240 | **240** | **337** |

**Caso base: 240 h esatte, buffer di 9 h.** **Caso peggiore: 337 h, cioè +97 h (+40%) oltre il tetto.**

---

## Come il caso base resta nelle 240 h

Aggiungere migrazione (34 h), copy (6 h) e i comportamenti del mockup (+1 h netta sull'area 20) costa 41 h.
Le ore si recuperano così, senza togliere pagine, contenuti obbligatori, relazioni o requisiti SEO:

| Recupero | Ore | Perché è possibile |
| --- | ---: | --- |
| Le 28 sottocategorie, 13 categorie, 7 settori e 5 sedi si creano da script durante l'import, non a mano | −8 | Le pagine nascono già con slug, gerarchia e campi |
| I dati del catalogo e i testi sono **già estratti e strutturati** nel mockup (`catalogo.js`: 119 schede, famiglie, sottocategorie; `testi.js`: testi di socaf.it per indirizzo) | −6 | La base dell'import esiste: si trasforma, non si raccoglie da capo |
| Il mockup ha già **eliminato** gli effetti costosi della v1: gelatina, inclinazione 3D, onda liquida sui titoli, lavagna trascinabile | −5 | Area 20 più semplice da realizzare |
| D11: niente testo lungo a schede, descrizione breve statica e FAQ come segnaposto | −4 | Deciso nel mockup |
| D20 unico per servizi e azienda; liste lunghe gestite dallo stesso componente | −2 | Nessun layout in più |
| QA più rapida: il mockup è già la checklist visiva, con stati condizionali e casi limite verificati | −6 | Si testa contro un riferimento, non si scopre in produzione |
| Ricerca nativa, nessun plugin | −3 | Come da v1 |
| Componenti e template comprimibili di 1–2 h ciascuno grazie al mockup già validato | −7 | Meno giri di revisione con il cliente |

**Condizioni del caso base** (se una salta, si scivola verso il caso peggiore):
- Ghost fornisce un **export JSON completo** (post, tag, autori, immagini) e i 184 articoli non contengono shortcode o embed da riscrivere.
- Le specifiche tecniche delle 119 schede arrivano in **un foglio di calcolo** (o si possono leggere in modo affidabile dal sito attuale).
- Immagini, PDF e cataloghi arrivano **pronti e nominati**; nessun ritocco o conversione manuale.
- Le **decisioni di Socaf** (selezioni per settore, "le più richieste", formule del noleggio, open point) arrivano prima dell'area 7.
- **Nessuna funzionalità nuova** dopo l'approvazione di D1–D3. Le richieste nuove si quotano a parte.

---

## Dettaglio delle aree nuove o cambiate

### 20 · Linguaggio visivo e comportamenti del mockup — 14 h (peggiore 22)

Tutto come **classi CSS globali** e widget nativi, assegnati alle sezioni Elementor:
- sistema delle tessere: bianco pieno → vetro → contorno, regole di alternanza, footer (2 h);
- palette sul fondo: azzurro VI sul bianco, Noleggio rosso, Usato azzurro, contorni e triangoli delle sedi (2 h);
- card cliccabili per intero, hover nitido con sollevamento, velo sulle non selezionate (1 h);
- strisce a icone, titolo e icone su un'unica griglia centrata (1,5 h);
- liste cliccabili sticky, e scorrevoli quando sono più lunghe dello schermo (2 h);
- testate con video su Chi siamo e Lavora con noi, testata di Pronto intervento con icone (1,5 h);
- sezione persone con composizione editoriale (1 h);
- titoli senza parole sole, testo della testata largo quanto il titolo (1 h, piccolo JS);
- video della home, CTA, form, pillole (2 h).

**Peggiore (+8 h)**: il widget Tabs di Elementor non regge lista sticky e scorrevole, oppure la larghezza del testo
legata al titolo. Serve JS su misura e QA su 4 breakpoint.

### 21 · Inserimento del copy UX — 6 h (peggiore 10)

Circa 50 pagine con documento (home, 6 famiglie, noleggio e 4 famiglie, usato e 1 famiglia, 7 settori, prodotti e 12 categorie, 3 servizi):
testi, H1, title e meta, alt. Gran parte arriva con l'import; le ore servono a revisione e casi particolari.
**Peggiore**: i documenti arrivano a più riprese o con revisioni dopo l'inserimento.

### 22 · Migrazione contenuti e dati — 34 h (peggiore 62)

| Voce | Base | Peggiore | Rischio principale |
| --- | ---: | ---: | --- |
| Script di import (Ghost JSON / API → WordPress, media, slug invariati) | 8 | 12 | Contenuti dall'headless CMS non presenti nell'export |
| 184 articoli: import, immagini, autori, date, verifica degli indirizzi | 6 | 14 | HTML sporco, embed, shortcode, immagini con nomi casuali |
| 119 schede: CPT + ACF (specifiche, galleria, PDF, famiglia, settore, flag noleggio/usato) | 12 | 22 | Specifiche non strutturate: tabelle da ricomporre a mano |
| ~30 pagine istituzionali e di servizio | 2 | 4 | — |
| Media e PDF: ottimizzazione, rinomina, collegamento | 2 | 4 | Formati misti, pesi eccessivi |
| Mappa vecchio → nuovo indirizzo e QA della migrazione (campioni, conteggi, link interni) | 4 | 6 | Link interni rotti negli articoli |

Le relazioni editoriali (articolo → macchina su 184 articoli) restano **data entry di Socaf**: lo snippet di D12 propone i modelli,
ma la scelta resta redazionale.

---

## Caso peggiore — da dove vengono le +97 h

| Causa | Ore in più | Probabilità | Come si previene |
| --- | ---: | --- | --- |
| Migrazione da Ghost/headless più sporca del previsto | +28 | **alta** | Chiedere subito export di prova e un campione di 10 schede |
| Comportamenti del mockup non nativi in Elementor (liste sticky, larghezze, strisce) | +8 | media | Prototipo tecnico su D1–D3 prima di estendere |
| QA allargata: stati condizionali, schede "povere", 4 breakpoint | +8 | media | Checklist dal mockup, test su schede reali già nell'area 4 |
| Conflitti di rewrite (tassonomia a base vuota contro le pagine) | +7 | media | Test in staging prima di popolare |
| Redirect oltre i ~57 previsti, dati strutturati per 3 ragioni sociali | +6 | media | Mappa dei redirect firmata prima del lancio |
| Revisioni del cliente su componenti già approvati (si propagano su 15 template) | +10 | media | Approvazione formale di D1–D3 |
| Decisioni commerciali in ritardo (settori, noleggio, open point) | +6 | alta | Calendario delle decisioni con date |
| Nuove landing noleggio (monospazzole, aspiratori, lavamoquette) | +4 | bassa | Solo con conferma, quotate a parte |
| Copy consegnato a più riprese | +4 | media | Un solo giro di inserimento |
| Buffer interamente consumato | +16 sul totale | — | — |

---

## Lettura per decidere

- **240 h si tengono** solo alle condizioni del caso base: export pulito, dati delle schede in tabella, decisioni nei tempi, nessuna funzionalità nuova.
- **Il rischio vero è la migrazione**: da sola vale fino a 28 h di scostamento. Un'**analisi preliminare dell'export Ghost (2–3 h, prima di firmare)** dice in quale scenario siamo.
- Se il caso peggiore si avvicina, si **semplifica la resa**, non il perimetro: liste a schede non sticky, testate con immagine al posto del video, meno varianti visive. Ogni scelta vale 1–4 h.

---

## Fuori perimetro (invariato rispetto alla v1, tranne l'import ora incluso)

- Scrittura dei testi mancanti, risposte alle FAQ (~60 set), segnaposti "[DA DEFINIRE CON SOCAF]".
- Fotografie (sedi, persone, prodotti), video della home, ~55 immagini di famiglie, settori e categorie.
- Decisioni commerciali: selezioni per settore, "le più richieste", formule e durate del noleggio, cataloghi PDF, open point.
- Data entry editoriale: relazione articolo → macchina sui 184 articoli.
- E-commerce.
