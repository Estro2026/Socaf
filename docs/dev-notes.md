# Socaf — Note per lo sviluppatore WordPress

Documento unico di traduzione del wireframe in WordPress + ACF Pro + Elementor Pro + JetEngine.
Le note numerate in pagina (DEV NOTE 01 → 141) rimandano qui per il contesto.

**Regola di fondo dello stack**: ACF Pro definisce e conserva il dato, JetEngine lo mostra,
Elementor lo impagina. **Nessun dato vive in due posti.**

---

## GLOBAL

### Stack e ruoli

| Strumento | Ruolo | Cosa NON fa |
| --- | --- | --- |
| WordPress | Pagine, articoli, utenti, ricerca | — |
| ACF Pro | Registra CPT e tassonomie, definisce tutti i campi, gestisce le relazioni bidirezionali | Non impagina |
| Elementor Pro | Theme Builder, pagine di catalogo, single, header, footer, form | Non definisce dati |
| JetEngine (Crocoblock) | Listing Grid e query per gli elenchi dinamici | Non registra CPT né tassonomie |
| The SEO Framework | Titoli, description, canonici, sitemap, breadcrumb | — |
| Code Snippets | Funzioni PHP su misura | Mai nel tema |

- **Della suite Crocoblock si usa solo JetEngine.** Niente JetSmartFilters, niente JetPopup,
  niente JetBooking, niente altri moduli.
- **CPT e tassonomie si registrano da ACF Pro**, non da JetEngine.
- **Il codice su misura sta in Code Snippets**, mai nel tema o in un child theme.
- **Nessun widget Elementor su misura.** Se una resa richiede un widget custom, si semplifica la resa.
- **Nessun plugin oltre quelli elencati** senza motivazione scritta e impatto a budget.

### Convenzioni di naming

- Campi e gruppi in `snake_case`, in italiano, senza abbreviazioni:
  `disponibile_noleggio`, non `disp_nol`.
- I gruppi ACF prendono il nome del contenuto a cui si applicano:
  `Macchina — dati tecnici`, `Macchina — collegamenti`, `Settore — contenuti`, `Sede — recapiti`.
- **Un gruppo per blocco funzionale**, non un gruppo unico da quaranta campi.

### Tipografia — due famiglie, contrasto gerarchico

| Ruolo | Carattere | Dove |
| --- | --- | --- |
| Display | **BC Novatica** (600/700) | H1–H4, nome delle card, voci di menu, pulsanti, numeri |
| Testo | **Neue Haas Unica** (400/700) | paragrafi, lede, descrizioni, etichette dei campi, occhielli, tabelle |

È la prescrizione di `socafvi.pdf` cap. 03. ⚠ I file di Neue Haas Unica **non sono nel progetto**:
vedi OP-11 per come è cablato e cosa fare quando arrivano.

### The Slice — l'elemento grafico del brand

`socafvi.pdf` cap. 01 definisce « The Slice »: « nasce dal taglio distintivo del logotipo e ne traduce il
linguaggio in una forma autonoma », usata per « definire composizioni, evidenziare contenuti, creare
divisioni tra le informazioni o caratterizzare layout ».

**L'angolo è 48° sull'orizzontale** (42° dalla verticale). Non è una stima: è misurato sui tracciati del
logo ufficiale in `assets/logo/socaf21-payoff-rgb.svg`, dove il taglio della A e della F ha
Δx 11,58 / Δy 12,85. Coincide con il « 42° » citato a testo nella VI.

Nel wireframe il segno compare in tre modi, sempre come **segnaposto**:
- **taglio** sull'immagine di apertura e sui pannelli delle formule (`clip-path` / gradiente a 48°)
- **triangolo** come marcatore d'angolo su blocchi noleggio, usato e « perché »
- **pattern** a righe diagonali a 48° per i segnaposto di texture e sfondi

⚠ **Non ho potuto vedere le pagine illustrate del PDF**: sono immagini e l'ambiente non le rende.
Il segno è quindi derivato dalla **descrizione a testo della VI + la geometria del logo**, non copiato
dalle tavole. Va verificato a occhio sulle pagine 16–18 e 20–22 del PDF prima di consolidarlo.

### Segnaposto: tre nature diverse

Non tutti i riquadri grigi vogliono dire la stessa cosa. Il wireframe li distingue:

| Classe | Significa | Dove |
| --- | --- | --- |
| `.ph` | fotografia o immagine di prodotto | card macchina, gallerie, foto sedi |
| `.ph-pattern` | texture, sfondo, superficie del sistema VI | card categoria prodotto, pannelli |
| `.ph-volume` | elemento tridimensionale, dettaglio luminoso | apertura, formule, immagine principale |

Serve a non far sembrare « tutto uguale » ciò che in produzione sarà materiale molto diverso,
e a dire al fotografo e al designer che cosa va prodotto.

### Linguaggio visivo — vetro

La VI descrive « superfici traslucide, riflessi, sfumature luminose ed elementi fluidi ».
Nel wireframe si traduce in: superfici semitrasparenti con `backdrop-filter`, bordi chiari a 1px,
ombre morbide, raggi ampi (14px per le superfici, pillola per pulsanti e chip), sopra un fondo
luminoso con sfumature molto tenui nei due colori primari.

**In Elementor** non serve nulla di custom: sono `background-color` con alpha, `backdrop-filter`
nelle Custom CSS di un paio di classi globali, `border-radius` e `box-shadow` dai controlli nativi.
Conviene definirlo **una volta** nei Global Styles del sito (colori, tipografia, bottoni, form),
non widget per widget: è quello che tiene la resa coerente e la manutenzione a costo zero.

⚠ Dove `backdrop-filter` non è supportato le superfici restano opache: il fallback è già il
`background-color` con alpha, quindi la leggibilità non dipende dall'effetto.

### Regole di resa

- **Gli elenchi dinamici sono griglie di elementi identici.** Nessuna card più grande delle altre,
  nessuna differenza che non dipenda da un campo.
- **Gli elementi condizionali si disegnano pieni, ma quando il campo è vuoto l'elemento sparisce.**
  Nessun « nessun elemento da mostrare » dentro le pagine. Unica eccezione: D17.
- **I blocchi ricorrenti sono modelli salvati di Elementor**, richiamati e non ricostruiti.

### Breakpoint

| Larghezza | Comportamento |
| --- | --- |
| ≥1180 | Note DEV a margine (solo wireframe) |
| ≥1024 | Menu orizzontale con tendine · colonna form sticky su D1 |
| 768–1023 | Burger + fisarmonica · griglie a 2 colonne |
| ≤560 | Griglie a 1 colonna · tabelle in scroll orizzontale interno |

⚠ Il breakpoint Tablet di Elementor va impostato a **1024**. Con sei voci lunghe
(« Prodotti per la pulizia ») la barra orizzontale va a capo già intorno ai 1100px:
verificare a 1024 **e** a 1100.

---

## DATA MODEL

### Tre CPT, due tassonomie, i post nativi, ~30 pagine

| Contenuto | Tipo | Quanti | Indirizzo | Archivio |
| --- | --- | --- | --- | --- |
| Macchina | CPT `macchina` | 119 | `/[famiglia]/[sottocategoria]/[modello]/` | **attivo e interrogabile** |
| Famiglia + sottocategoria | Tassonomia gerarchica `famiglia` | 6 + 28 | — | **spento** |
| Settore | Tassonomia non gerarchica `settore` | 7 | — | **spento** |
| Referenza | CPT `referenza` | 7 (⚠ OP-01) | `/azienda/referenze/[cliente]/` | **spento** |
| Sede | CPT `sede` | 5 | `/sedi/[sede]/` | **spento → `/sedi/` è 404** |
| Articolo | Post nativi | 184 | `/news/[titolo]/` | attivo |
| Tutto il resto | Pagine | ~30 | come da alberatura | — |

### Le due regole della tassonomia `famiglia`

1. **Una sola tassonomia gerarchica su due livelli**, non due tassonomie separate.
   `lavapavimenti` è il padre, `lavapavimenti-uomo-terra` il figlio.
   Registrata con `rewrite = ['slug' => '', 'hierarchical' => true, 'with_front' => false]`,
   produce da sola entrambi i livelli di indirizzo.
2. **Una macchina sta in una sola sottocategoria**, e **si assegna solo la sottocategoria**,
   mai anche la famiglia: la famiglia si eredita dal termine padre.
   Regola redazionale da rispettare anche sulle macchine future.

**La generazione degli archivi della tassonomia va spenta** (`public = false` / `publicly_queryable = false`
mantenendo `show_ui = true`): altrimenti il termine e la pagina si contendono lo stesso indirizzo.
**Il CPT `macchina` resta invece pubblico e interrogabile.**

⚠ **Rinominare un termine è un'operazione doppia**: va cambiato anche lo slug della pagina
corrispondente. Sono 34 coppie termine/pagina da tenere allineate.

### Gli slug reali (verificati sulla sitemap di socaf.it — non modificarli)

**Famiglie (6)**: `lavapavimenti` · `spazzatrici` · `idropulitrici` · `aspiratori` · `robot` · `altri-macchinari`

**Sottocategorie (28)**

| Famiglia | Slug delle sottocategorie |
| --- | --- |
| Lavapavimenti (24) | `lavapavimenti-piccole` · `lavapavimenti-uomo-terra` · `lavapavimenti-uomo-bordo` · `lavapavimenti-combinate` · `i-mop` |
| Spazzatrici (19) | `spazzatrici-uomo-terra` · `spazzatrici-uomo-bordo` · `spazzatrici-stradali` |
| Idropulitrici (17) | `idropulitrici-ad-acqua-fredda` · `idropulitrici-ad-acqua-calda` · `idropulitrici-alte-prestazioni` · `idropulitrici-impianti-fissi` · `idropulitrici-autonome` |
| Aspiratori (25) | `aspiratori-professionali` · `aspiratori-industriali` · `aspiratori-per-olio-e-trucioli` · `aspiratori-certificati-atex` · `elettroventilatori` |
| Robot (4) | `robot-lavapavimenti` · `robot-spazzatrici` |
| Altri macchinari (30) | `vasche-lavapezzi` · `generatori-di-vapore` · `lavatappezzeria` · `monospazzole` · `purificatori-aria` · `pulizia-pannelli-solari` · `nebulizzatori` · `battitappeti` |

**Usato (5, indirizzi invariati)**: `lavapavimenti-usate` · `idropulitrici-usate` · `spazzatrici-usate` ·
`aspiratori-usati` · `altri-macchinari-usati`
⚠ Il suffisso cambia genere (usate/usati): **non derivabile per concatenazione, serve una mappa esplicita.**

**Settori (7)**: `industria` · `imprese-di-pulizia` · `horeca` · `retail` · `logistica` ·
`officine-metalmeccanica` · `edilizia-cantieri`

**Categorie prodotto (13)**: `detergenti-pavimenti-parquet` · `detergenti-enzimatici` ·
`detergenti-disinfettanti` · `detergenti-multiuso-sgrassanti` · `detersivi-lavanderia-industriale` ·
`igiene-mani` · `carrelli-per-pulizie` · `attrezzature` · `panni-stracci-microfibra` ·
`carta-e-dispenser` · `sacchi` · `dispositivi-di-protezione-individuale` · `ecolabel`

### Campi della scheda macchina

| Campo | Tipo ACF | Obbl. | Note |
| --- | --- | --- | --- |
| `sottocategoria` | Tassonomia `famiglia`, valore singolo | Sì | Determina l'indirizzo |
| `descrizione_breve` | Textarea, 200 caratteri | Sì | Usata nelle card |
| `galleria_immagini` | Galleria | Sì | La prima immagine fa da principale |
| `punti_di_forza` | Repeater, 3–5 righe | Sì | `titolo` + `testo` |
| `specifiche_tecniche` | Repeater | Sì | `etichetta` + `valore`, libero |
| `scheda_tecnica` | File (PDF) | No | Ha uno stato vuoto |
| `settori_di_utilizzo` | Tassonomia `settore`, multipla | No | Bidirezionale automatica |
| `disponibile_noleggio` | Vero/falso | Sì | Accende etichetta e blocco |
| `disponibile_usata` | Vero/falso | Sì | Accende etichetta e blocco |
| — detergenti e consumabili | — | — | **Non si compila**: ereditato dalla famiglia |
| — articoli collegati | — | — | **Non si compila**: arriva dal lato articolo |

### Campi sui termini

| Dove | Campo | Tipo | Alimenta |
| --- | --- | --- | --- |
| Termine famiglia (liv. 1) | `categorie_prodotto_collegate` | Relationship → pagine | D1 blocco 14, D11 blocco 8 |
| Termine famiglia (liv. 1) | `macchine_piu_richieste` | Relationship → `macchina`, 5–6 | D3 blocco 7 |
| Termine famiglia (liv. 1) | `ha_landing_noleggio`, `ha_pagina_usato` | Vero/falso | Blocchi condizionali su D1/D2/D3 |
| Termine sottocat. (liv. 2) | `immagine`, `nome_seo`, `descrizione_breve` | Image, Text, Textarea | D3 blocco 4 (card sottocategoria) |
| Termine settore | `macchine_selezionate` | Relationship → `macchina`, 8–12 | D9 blocco 4 |
| Termine settore | `categorie_prodotto_selezionate` | Relationship → pagine | D9 blocco 5 |

### Le relazioni

| Relazione | Come | Quante decisioni | Dove si compila |
| --- | --- | --- | --- |
| Macchina ↔ settore | **Automatica** nei due sensi | 119 assegnazioni | Scheda macchina |
| Famiglia → categorie prodotto | Manuale | 6 | Termine famiglia |
| Settore → macchine | Manuale | 7 | Termine settore |
| Referenza ↔ settore | **Automatica** nei due sensi | 7 | Scheda referenza |
| Articolo ↔ macchina | Manuale, **bidirezionale** | 184, a scaglioni | Articolo |
| Articolo → settore | **Ereditata** dalle macchine | 0 | — |

Le relazioni bidirezionali di ACF vanno usate ovunque la tabella le indichi: si compila un lato,
l'altro si popola da solo. **Non costruire elenchi inversi con query sui campi.**

⚠ **Eccezione**: ACF Relationship **non è bidirezionale sui termini**. Per il verso inverso
famiglia → categorie prodotto (D11 blocco 8) serve un campo speculare mantenuto da un hook
`acf/save_post`, **non** una `meta_query LIKE` su campo serializzato (fragile).

### Le pagine di catalogo sono pagine, non archivi

Famiglie e sottocategorie sono **34 pagine WordPress costruite a mano** con Elementor:
`/lavapavimenti/` è una pagina, `/lavapavimenti/lavapavimenti-uomo-terra/` è una sua pagina figlia.
Le pagine settore seguono la stessa logica sotto `/settori/`, le categorie prodotto sotto
`/prodotti-per-la-pulizia/`.

| Pagina | Il loop gira su | Filtro |
| --- | --- | --- |
| Famiglia | Termini | Sottocategorie figlie di quella famiglia |
| Sottocategoria | Macchine | Termine corrispondente |
| Settore | Macchine | Selezione manuale, 8–12 |
| Noleggio famiglia | Macchine | Famiglia + `disponibile_noleggio` |
| Usato famiglia | Macchine | Famiglia + `disponibile_usata` |

⚠ Nelle query di noleggio e usato la `tax_query` deve avere **`include_children = true`**:
le macchine sono assegnate alle sottocategorie, mai alla famiglia.

### Code Snippets — l'elenco completo del PHP su misura

| # | Funzione | Righe ~ | Serve a |
| --- | --- | --- | --- |
| 1 | `socaf_url_famiglia()` — mappa termine → pagina famiglia | 25 | D1, D2, D3, blocchi noleggio/usato |
| 2 | `socaf_url_settore()` — mappa termine settore → pagina | 20 | D1 blocco 13, D12 blocco 7 |
| 3 | `socaf_url_usato()` — mappa famiglia → slug usato (usate/usati) | 15 | D1, D2, D3, D5 |
| 4 | `socaf_categorie_da_famiglia()` — risale al padre e legge il campo | 15 | D1 blocco 14 |
| 5 | `socaf_settori_del_loop()` — termini distinti dei post del loop, con transient | 30 | D2 blocco 10, D3 blocco 10 |
| 6 | `socaf_articoli_correlati()` — articoli delle macchine del loop, con transient | 35 | D2, D3, D5, D9 |
| 7 | `socaf_famiglie_per_categoria()` — hook `acf/save_post` per il campo speculare | 30 | D11 blocco 8 |
| 8 | `socaf_breadcrumb_fix()` — filtro su The SEO Framework per D14 e D12 | 25 | Breadcrumbs |
| 9 | `socaf_search_descrizione_breve()` — include il campo nella ricerca | 15 | D17 |
| 10 | `socaf_suggerisci_macchine()` — propone i modelli citati nel testo dell'articolo | 60 | D12 blocco 6 |

**Totale ~270 righe di PHP.** Tutto in Code Snippets, tutto commentato, nessuna riga nel tema.
I transient (punti 5 e 6) non sono opzionali: sono le query più costose del sito.

---

## HEADER

- **Elementor Pro · Theme Builder → Header**, condizione « Entire Site ». Uno solo.
- **Widget nativi**: Site Logo, Nav Menu, Button (numero verde), Search Form.
- **Due menu WordPress**: `principale` (6 voci + sottovoci) e `servizio` (3 voci).
- **Voci non cliccabili** (Macchine, Settori, Servizi, Azienda): Custom Link con URL `#`.
- **Tendine**: elenchi verticali semplici. **Niente mega-menu a colonne, niente immagini.**
- **Le 28 sottocategorie non entrano nel menu.**
- **Numero verde 800 480110**: unico elemento in evidenza, presente su ogni pagina, `href="tel:800480110"`.
- **Mobile** (<1024px): fisarmonica. Noleggio e numero verde fissi in cima al pannello.
  Il numero verde resta anche in barra. Ottenuto con le Responsive Visibility di Elementor,
  **zero JS su misura**.
- **Accessibilità**: le voci con tendina sono `<button aria-expanded>`, chiusura con Esc e clic esterno.

**Stima: 6 h** (dentro le 23 h di D19 + componenti globali)

---

## FOOTER

- **Elementor Pro · Theme Builder → Footer**, condizione « Entire Site ».
- Contiene: **le cinque sedi** (elenco dinamico dal CPT `sede`, non riscritto a mano),
  i collegamenti ad **Aquarial e Caldofacile** (diretti ai loro siti, `target="_blank" rel="noopener"`),
  le **pagine legali**, i **recapiti** con numero verde, le scorciatoie al catalogo e alle formule.
- Le schede sede si raggiungono da qui e da `/contatti/`, **non dal menu**.
- Responsive: 4 → 2 → 1 colonna.

**Stima: 3 h**

---

## FORMS

Due varianti di **un solo modello globale** Elementor Pro Form. Nessun plugin form aggiuntivo.

### Variante generica — ovunque tranne D1
nome · azienda · email · telefono · messaggio · **campo nascosto `pagina_provenienza`**
(titolo della pagina, via Dynamic Tag) · consenso privacy obbligatorio.

Su `/contatti/` si aggiunge un **secondo consenso facoltativo** (marketing diretto), separato
e mai precompilato.

L'etichetta del pulsante cambia per contesto (« Invia richiesta », « Richiedi preventivo »,
« Richiedi disponibilità », « Richiedi un intervento »): **è un'etichetta sovrascritta,
non una variante del form**.

### Variante scheda macchina — solo D1
nome · azienda · email · telefono · messaggio · **`tipo_di_richiesta`** (radio: macchina nuova /
usata / a noleggio) · **campo nascosto `modello`** (titolo del post corrente) · consenso.

⚠ **Nel wireframe si disegnano tutte e tre le voci.** Nel sito reale:
- « usata » compare solo se `disponibile_usata = true`
- « a noleggio » compare solo se `disponibile_noleggio = true`
- se entrambi falsi resta la sola voce « macchina nuova » e il campo si può nascondere

Si ottiene con **Display Conditions sulle opzioni di un unico form**, non con tre form diversi.

**Posizione su D1** (OP-06): colonna laterale sticky ≥1024px, blocco in linea sotto le specifiche
sotto. Il blocco 7 « richiamo al form » è un'ancora interna.

**Client task aperto**: instradamento delle email per le sedi partecipate
(Verona → Bottoni S.r.l., Pordenone → Tecno Clean S.r.l.).

**Stima: 4 h complessive** (dentro D19 + componenti globali)

---

## SEARCH

- Ricerca **nativa** di WordPress, `/?s=termine`. Nessun plugin di ricerca, nessun autocomplete,
  nessun suggerimento in tempo reale.
- Template: **Elementor Pro · Theme Builder → Search Results**.
- **Tre query separate** per tipo di contenuto, **macchine per prime**: `macchina` → `page` → `post`.
  Esclusi `sede` e `referenza`.
- ⚠ Il CPT `macchina` deve avere **`exclude_from_search = false`**.
- **Miglioramento a costo quasi zero**: includere `descrizione_breve` nella ricerca
  (Code Snippets #9, ~15 righe).
- **Stato vuoto disegnato**: le sei famiglie + collegamento ai contatti.
  È **l'unica eccezione del sito** alla regola « un blocco senza dati sparisce ».
- **SEO**: `noindex, follow`.

**Stima: 8 h** (D17)

---

## D1 · Scheda macchina

| Voce | Contenuto |
| --- | --- |
| **Elementor** | Theme Builder → Single `macchina` |
| **ACF** | `descrizione_breve`, `galleria_immagini`, `punti_di_forza`, `specifiche_tecniche`, `scheda_tecnica`, `settori_di_utilizzo`, `disponibile_noleggio`, `disponibile_usata` |
| **JetEngine** | Listing macchine correlate (stessa sottocategoria, corrente escluso, limite 4) · Listing articoli collegati (relazione, limite 3) · Listing categorie prodotto (dalla famiglia) |
| **Query** | Correlate: `tax_query famiglia = termine corrente`, `post__not_in = [corrente]`, `posts_per_page = 4` |
| **Condizioni** | Etichette e blocchi noleggio/usato · miniature galleria (>1 immagine) · PDF · settori · articoli · correlate |
| **Relazioni** | Settore (bidirezionale, si compila qui) · articoli (bidirezionale, si compila dall'articolo) · categorie prodotto (ereditate dalla famiglia) |
| **Custom code** | Snippets #1, #2, #3, #4 |
| **Responsive** | Galleria + info a 2 colonne ≥768px · form sticky ≥1024px · tabella specifiche in scroll interno ≤560px |
| **SEO** | Title da template `[nome] \| [sottocategoria] \| Socaf` · nessun testo lungo · schema `Product` **senza `offers`** · URL invariati |
| **Stima** | **14 h** |

---

## D2 · Archivio sottocategoria

| Voce | Contenuto |
| --- | --- |
| **Elementor** | Pagina (28 istanze), un template di partenza duplicato |
| **ACF** | Nessuno sulla pagina. Campi sul termine per la card (D3). |
| **JetEngine** | Listing macchine (tutte) · Listing sottocategorie fratelli · Listing articoli |
| **Query** | Macchine: `tax_query famiglia = termine`, **nessun limite** |
| **Condizioni** | Blocchi noleggio/usato · « dove si usano » · articoli collegati |
| **Custom code** | Snippets #5, #6 |
| **Responsive** | Griglia 3 → 2 → 1 |
| **SEO** | **Il titolo usa le parole della ricerca, non il nome del termine.** 8 pagine con testo 400–600 parole, 20 con 200–300. Sottotitoli fissi: cosa sono, come si scelgono, dove si usano, cosa cambia tra i modelli, manutenzione. |
| **Stima** | **10 h** |

**Le 8 sottocategorie con testo lungo e i titoli su cui costruirle**

| Sottocategoria | Titolo costruito su |
| --- | --- |
| Idropulitrici → Autonome | idropulitrici a scoppio |
| Altri macchinari → Monospazzole | monospazzola, monospazzola per pavimenti |
| Idropulitrici → Ad acqua calda | idropulitrice acqua calda |
| Robot → Robot lavapavimenti | robot lavapavimenti |
| Altri macchinari → Generatori di vapore | generatore di vapore |
| Altri macchinari → Vasche lavapezzi | vasca lavapezzi, lavapezzi officina |
| Lavapavimenti → Uomo a terra | lavasciuga pavimenti a batteria |
| Spazzatrici → Stradali | spazzatrici stradali |

⚠ **Dentro la stessa famiglia le etichette delle specifiche vanno scritte uguali.**
Non c'è validazione tecnica: è disciplina di data entry.

---

## D3 · Pagina famiglia

| Voce | Contenuto |
| --- | --- |
| **Elementor** | Pagina (6 istanze) |
| **ACF** | Sul termine: `categorie_prodotto_collegate`, `macchine_piu_richieste`, `ha_landing_noleggio`, `ha_pagina_usato`. Sui termini figli: `immagine`, `nome_seo`, `descrizione_breve`. |
| **JetEngine** | **Listing su termini** (sottocategorie figlie) · Listing « le più richieste » (relazione) · Listing articoli |
| **Query** | Sottocategorie: loop su termini, `parent = termine corrente` |
| **Condizioni** | Noleggio/usato · articoli collegati |
| **Custom code** | Snippets #1, #5, #6 |
| **Responsive** | Griglia 3 → 2 → 1 |
| **SEO** | **Il lavoro redazionale più pesante del sito**: 800–1200 parole × 5 famiglie. Altri macchinari fa eccezione (testo breve, smistamento). Testo **sotto** l'elenco. Intercettare qui anche le comparative (`miglior lavapavimenti` 5.400). |
| **Stima** | **10 h** |

---

## D4 + D5 · Noleggio

| Voce | Contenuto |
| --- | --- |
| **Elementor** | 2 pagine (D4 ingresso, D5 template duplicato ×4) |
| **ACF** | Nessuno di rilievo. Tabella formule statica. |
| **JetEngine** | D4: listing pagine figlie · D5: listing macchine con `disponibile_noleggio` |
| **Query** | D5: `tax_query famiglia = padre` **con `include_children`** + `meta_query disponibile_noleggio = 1` |
| **Condizioni** | Articoli sul noleggio · landing senza macchine attive → **la landing non si crea** |
| **Blocco obbligatorio** | **Le cinque sedi su D5**: requisito SEO locale, non rimovibile dal template |
| **Custom code** | Snippet #3 |
| **SEO** | D4: cluster Noleggio (830 vol). D5: `noleggio lavapavimenti` 720 + `noleggio lavasciuga pavimenti` 720. Testo 400–600 parole sotto l'elenco. |
| **Aperto** | OP-02 (slug lavamoquette) · OP-03 (monospazzole e aspiratori: **non creare**) |
| **Stima** | **12 h** |

**Al lancio**: gli 8 articoli che parlano di noleggio vanno collegati a queste pagine, non dopo.

---

## D6 + D7 · Usato

| Voce | Contenuto |
| --- | --- |
| **Elementor** | 2 pagine (D6 ingresso nuovo, D7 template ×5) |
| **JetEngine** | D6: listing pagine figlie · D7: listing macchine con `disponibile_usata` |
| **Query** | Identica a D5 con `meta_query disponibile_usata = 1` → **si duplica il listing, 0,5 h invece di 1 h** |
| **Condizioni** | Famiglia senza macchine usate → **la pagina non si crea** |
| **Vincolo duro** | **I 5 indirizzi non si toccano.** Sono le pagine meglio posizionate del sito (405 clic/3 mesi, idropulitrici usate 8ª, lavapavimenti usate 10ª). |
| **Migrazione** | **Le 24 schede di singola macchina usata non si ricreano**: redirect 301 alla pagina della famiglia corrispondente (~89 clic da recuperare) |
| **Modelli globali** | « Garanzia e revisione » e « Hai una macchina da sostituire » sono condivisi tra D6 e D7 |
| **SEO** | ⚠ Queste pagine sono **già posizionate**: il testo va **aggiunto, non sostituito**. Verifica in QA SEO. |
| **Aperto** | OP-04 (perimetro di « altri macchinari usati ») |
| **Stima** | **10 h** |

---

## D8 + D9 · Settori

| Voce | Contenuto |
| --- | --- |
| **Elementor** | 2 pagine (D8 ingresso, D9 template ×7) |
| **ACF** | Sul termine settore: `macchine_selezionate` (8–12), `categorie_prodotto_selezionate` |
| **JetEngine** | Listing macchine (relazione manuale) · Listing categorie · Listing referenze (limite 3) · Listing articoli (limite 3) |
| **Due meccanismi da non confondere** | **Macchina → settore** (tassonomia sulla scheda) alimenta « dove si usa », referenze e articoli. **Settore → macchina** (selezione manuale) decide le 8–12 card. **I due elenchi non coincidono, ed è voluto.** |
| **Condizioni** | Referenze (se almeno una) · approfondimenti (se almeno uno) |
| **Custom code** | Snippet #2, #6 |
| **Migrazione** | **6 redirect**: 5 pagine settore + l'hub `/settore/` → `/settori/` (OP-13) |
| **SEO** | Testo lungo su Industria e Imprese di pulizia (800–1200), breve su Retail e Logistica. ⚠ Il cluster « Imprese di pulizia » (12.920 vol) è dominato da domanda **informativa** (`come aprire un'impresa di pulizie`): scrivere per chi **ha già** un'impresa e compra macchine. |
| **Aperto** | OP-09 (7 selezioni macchine + 7 selezioni categorie) |
| **Stima** | **12 h** |

---

## D10 + D11 · Prodotti per la pulizia

| Voce | Contenuto |
| --- | --- |
| **Elementor** | 2 pagine (D10 hub, D11 template ×13) |
| **ACF** | `cataloghi` (Repeater File) su D10 · `catalogo` (File) su D11 |
| **JetEngine** | Listing pagine figlie · Listing famiglie collegate (verso inverso) |
| **Query** | Blocco 8 di D11: campo speculare mantenuto da hook `acf/save_post` (Snippet #7) |
| **Condizioni** | « Su quali macchine si usano » (se almeno una famiglia) · cataloghi (OP-08) |
| **Regola** | **Nessuna scheda di singolo prodotto.** « Cosa comprende » è un elenco testuale, **non** una griglia di card. |
| **Migrazione** | 5 slug restano · `panni-e-spugne` → `panni-stracci-microfibra` · `carta` + `dispenser` → `carta-e-dispenser` · `detergenti` → 5 nuove pagine · 2 nuove senza predecessore |
| **SEO** | D10: 800–1200 parole, ~4.500 ricerche/mese. Domanda « ingrosso » (~1.600/mese) **nei testi, non con una pagina dedicata**. D11: 5 categorie con testo lungo, 8 con testo breve. |
| **E-commerce** | Fuori progetto. Nessun prezzo, nessun carrello. La struttura non crea impedimenti a un'integrazione futura, ma **oggi non si costruisce nulla per quel caso**. |
| **Stima** | **12 h** |

---

## D12 · Articolo

| Voce | Contenuto |
| --- | --- |
| **Elementor** | Theme Builder → Single Post |
| **ACF** | `macchine_citate` — Relationship bidirezionale verso `macchina` |
| **Posizione del campo** | **In evidenza nella schermata di modifica** (Field Group position « After content », priorità alta), **non** in fondo alla colonna laterale. Non è estetica: è la condizione perché 184 compilazioni vengano fatte davvero. |
| **Blocco 7** | **Non si compila**: i settori si ereditano dalle macchine del blocco 6 (Snippet #2 + #5) |
| **Niente** | **Nessuna categoria, nessun tag, nessuna pagina di raccolta.** Archivi disattivati. |
| **URL** | **Nessuno dei 184 indirizzi cambia.** Permalink `/news/%postname%/`. Le due citazioni più autorevoli che Socaf possiede da altri siti puntano a due articoli. |
| **Automazione** | Snippet #10 propone i modelli citati nel testo; **chi scrive conferma o toglie**. Non si aggancia automaticamente: un articolo che cita tre modelli come esempio finirebbe legato a tre schede che non tratta. |
| **Ordine di lavorazione** | 1) gli 8 sul noleggio, **al lancio** · 2) i 20 con più traffico · 3) i restanti 156. **Il lancio non aspetta.** |
| **Stima** | **6 h** |

---

## D13 · Archivio Approfondimenti

| Voce | Contenuto |
| --- | --- |
| **Elementor** | Archive Template, o pagina impostata come « Pagina degli articoli » |
| **URL** | `/news/` — **indirizzo invariato**, nome visibile « Approfondimenti » |
| **Query** | Post nativi, data discendente, **12 per pagina** |
| **Niente** | Nessun filtro, nessuna barra di categorie, nessun « carica altri » AJAX |
| **Condizione** | Articolo senza immagine in evidenza → **la card resta della stessa altezza** (`aspect-ratio` fisso + fallback neutro, **non** `display:none`) |
| **⚠ Paginazione** | Oggi arriva a `/news/15/`. Con 12 per pagina diventano 16. **Verificare il numero attuale di articoli per pagina** prima di fissare 12, per non spostare gli articoli tra le pagine. |
| **SEO** | `index, follow` sulla prima pagina, **`noindex, follow` dalla seconda** |
| **Stima** | **6 h** |

---

## D14 · Scheda sede

| Voce | Contenuto |
| --- | --- |
| **Elementor** | Theme Builder → Single `sede` |
| **ACF** | Gruppo `Sede — recapiti`: `ragione_sociale`, `via`, `cap`, `comune`, `provincia`, `telefono`, `email`, `latitudine`, `longitudine`, `referente`, `sede_principale`. Gruppo `Sede — orari`: Repeater `giorno` + `fascia`. Più `cosa_si_fa` e `foto`. |
| **Regola** | **Campi separati, mai un blocco di testo.** Gli stessi campi alimentano la pagina e i dati strutturati: il recapito non può divergere. |
| **Condizioni** | Referente (se compilato) · foto (se caricate) |
| **⚠ `/sedi/`** | **Non è una pagina.** `has_archive = false`: chi apre quell'indirizzo trova un 404. **Da non creare.** |
| **Ordine** | **Osio Sotto per prima**, marcata come principale |
| **Mappa** | Coordinate numeriche separate (non un campo Google Map, che richiederebbe la API key anche in redazione). **Lazy load dietro il consenso cookie.** |
| **SEO** | Schema `LocalBusiness` per ogni sede, `Organization` su Osio Sotto. Cluster geografico Asse 2 (6.690 vol). |
| **⚠ Attenzione** | Tre sedi sono Socaf S.p.A., una è **Bottoni S.r.l.** (Verona), una **Tecno Clean S.r.l.** (Pordenone), con email e domini propri. `ragione_sociale` non è decorativo. |
| **Stima** | **6 h** |

**Dati reali già disponibili**

| Sede | Ragione sociale | Indirizzo | Telefono |
| --- | --- | --- | --- |
| Osio Sotto (principale) | Socaf S.p.A. | Via Trieste, 14 — 24046 Osio Sotto (BG) | +39 035 4876054 |
| Brescia | Socaf S.p.A. | Via dei Ponticelli, 47 — 25014 Castenedolo (BS) | +39 030 2732674 |
| Milano | Socaf S.p.A. | Via De Gasperi, 120 — 20017 Mazzo di Rho (MI) | +39 02 93904406 |
| Verona | Bottoni S.r.l. | Via E. Fermi, 1 — 37026 Settimo di Pescantina (VR) | +39 045 6702122 |
| Pordenone | Tecno Clean S.r.l. | Via Nicola Calipari, 7 — 33084 Cordenons (PN) | +39 0434 540188 |

**Da chiedere a Socaf**: orari, coordinate, referenti, testo « cosa si fa in questa sede », foto.

---

## D15 · Contatti

| Voce | Contenuto |
| --- | --- |
| **Elementor** | Pagina |
| **Query** | Recapiti principali letti **dinamicamente** dalla sede con `sede_principale = 1`. **Il recapito non si riscrive a mano.** |
| **JetEngine** | Listing delle 5 sedi (blocco globale) |
| **Mappa** | **Una sola mappa** con cinque marcatori, non cinque iframe. Lazy load dietro il consenso. |
| **Form** | Variante generica + secondo consenso facoltativo (marketing), l'unica pagina con entrambi |
| **URL** | `/contatti/` — resta com'è |
| **Stima** | **6 h** |

---

## D16 · Home

| Voce | Contenuto |
| --- | --- |
| **Elementor** | Pagina statica impostata come home |
| **Blocchi** | **Esattamente 8**: ricerca · 6 famiglie · noleggio/usato · settori · prodotti · Aquarial e Caldofacile · 5 sedi · form |
| **Fuori** | **Servizi, referenze e articoli recenti restano fuori dalla home.** E anche: slider, caroselli, video di sfondo, pop-up newsletter, loghi clienti, contatori, testimonianze. |
| **JetEngine** | Listing famiglie (termini liv. 1) · Listing settori (pagine figlie) · Listing sedi |
| **Riuso** | L'elenco delle 6 famiglie è **una sola sorgente** per home, tendina Macchine, blocco 12 di D3 e stato vuoto di D17 |
| **Marchi** | Link diretti ai siti di Aquarial e Caldofacile, scheda nuova. `/raffrescamento/` e `/riscaldamento/` vengono **eliminate**. |
| **Performance** | Pagina più visitata e più leggera: niente slider, niente mappa. Immagini famiglie in `loading="lazy"` tranne le prime tre. |
| **Aperto** | OP-07 (peso e posizione del blocco 3) |
| **Stima** | **8 h** |

---

## D17 · Risultati di ricerca

Vedi la sezione **SEARCH**. **Stima: 8 h**

---

## D18 · Servizi, azienda, referenze

| Voce | Contenuto |
| --- | --- |
| **Elementor** | **Un solo template** di pagina di testo (9 istanze) + 2 elenchi + 1 Single `referenza` |
| **ACF** | Su `referenza`: `logo`, `partner_dal`, `sede_assistita`, `prodotti_scelti` (Repeater), `sito_web`, `settore` (tassonomia bidirezionale) |
| **URL referenze** | `/azienda/referenze/[cliente]/`. Il CPT va registrato con `rewrite = ['slug' => 'azienda/referenze', 'with_front' => false]` e **archivio disattivato**: la pagina di elenco è una pagina, non l'archivio del CPT. |
| **Condizioni** | « A quali macchine si applica » e blocco sedi compaiono solo dove hanno senso |
| **Redirect** | ~12: Aziende → Chi siamo · Careers → Lavora con noi · `/il-nostro-impegno/` · `/servizi/innovazione-tecnologica/` · `/referenze/` + 6 schede · `/servizi/noleggio-macchine/` → `/noleggio/` · `/servizi/usato/` → `/usato/` |
| **Non si fanno** | `/raffrescamento/` e `/riscaldamento/`: eliminate. **Client task**: redirect alla home o 410 (un redirect verso un sito esterno non è consigliabile). |
| **Attenzione** | Non collegare le referenze alle singole macchine: il brief prevede solo la relazione con il settore. |
| **Aperto** | OP-01 (la settima referenza) |
| **Stima** | **8 h** (D18 + D20, template unico) |

## Linguaggio visivo VI · pannello testi · stili form

Classi CSS globali per fondo e fasce, un solo SVG per le bolle, widget Tabs nativo di Elementor per i testi lunghi,
stili di radio a pillole e consenso. Nessuna libreria, nessun JavaScript su misura. **Stima: 6 h** (area 20 di `dev-estimate.md`).

---

## D19 · Header, menu e footer

Vedi le sezioni **HEADER** e **FOOTER**. **Stima: 23 h** con i componenti globali
(breadcrumbs, ricerca, form).

---

## SEO tecnico e migrazione

### Piano redirect — riepilogo

| Origine | Destinazione | Quanti |
| --- | --- | --- |
| `/settore/` + 5 pagine settore | `/settori/` + nuove pagine | 6 |
| 24 schede di singola macchina usata | pagina usato della famiglia | 24 |
| `/servizi/noleggio-macchine/` | `/noleggio/` | 1 |
| `/servizi/usato/` | `/usato/` | 1 |
| `/servizi/innovazione-tecnologica/` | `/azienda/innovazione-tecnologica/` | 1 |
| `/il-nostro-impegno/` | `/azienda/il-nostro-impegno/` | 1 |
| `/aziende/` + `/socaf/` | `/azienda/chi-siamo/` | 2 |
| `/careers/` + `/lavora-con-noi/` | `/azienda/lavora-con-noi/` | 2 |
| `/referenze/` + 6 schede | `/azienda/referenze/` + schede | 7 |
| `/prodotti-per-la-pulizia/panni-e-spugne/` | `.../panni-stracci-microfibra/` | 1 |
| `/prodotti-per-la-pulizia/carta/` + `/dispenser/` | `.../carta-e-dispenser/` | 2 |
| `/prodotti-per-la-pulizia/detergenti/` | `.../detergenti-multiuso-sgrassanti/` | 1 |
| `/raffrescamento/` + `/riscaldamento/` | da decidere (client task) | 2 |
| Pagine « prova gratis » e residui | da valutare | ~6 |
| **Totale indicativo** | | **~57 redirect 301** |

**Nessun redirect su**: le 119 schede macchina, le 6 famiglie, le 28 sottocategorie,
le 5 pagine usato di famiglia, i 184 articoli, `/contatti/`, `/prodotti-per-la-pulizia/`,
i 4 servizi che restano.

### Checklist SEO tecnico

- [ ] The SEO Framework: title template per CPT `macchina`, non 119 title a mano
- [ ] Sitemap XML: includere `macchina`, pagine, post, `sede`, `referenza`
- [ ] `noindex` su `/?s=`, sulle pagine 2+ dell'archivio news, sugli archivi di tassonomia (spenti comunque)
- [ ] Canonici su tutte le pagine di catalogo
- [ ] Dati strutturati: `Product` (senza `offers`), `LocalBusiness` ×5, `Organization`,
      `BreadcrumbList`, `FAQPage` sulle pagine con FAQ
- [ ] Verifica che le 5 pagine usato **mantengano** il contenuto che le posiziona
- [ ] Core Web Vitals: home e D1 sono le pagine da misurare
- [ ] Mappa in lazy load dietro il consenso cookie (D14, D15)
- [ ] Transient di cache sulle query di secondo grado (Snippets #5 e #6)

**Stima: 12 h**

---

## QA — cosa testare prima della consegna

| Test | Perché |
| --- | --- |
| Una scheda macchina « povera »: nessun PDF, una sola immagine, nessun settore, nessun articolo, né noleggio né usato | Verifica che **sei blocchi spariscano** invece di svuotarsi |
| Una sottocategoria con una sola macchina | Le macchine correlate non devono comparire |
| Una famiglia senza noleggio (robot) | Il blocco non deve comparire su **nessuna** delle sue pagine |
| Un settore senza referenze | Il blocco non deve comparire |
| Una sede senza foto e senza referente | Due blocchi non devono comparire |
| Un articolo senza immagine in evidenza | La card deve restare della stessa altezza |
| Ricerca con termine senza risultati | **L'unico empty state disegnato** |
| Menu a 1024 **e a 1100 px** | Il punto in cui la barra orizzontale rischia di andare a capo |
| Tabella specifiche a 390px | Deve scorrere dentro il suo contenitore, non mandare in overflow la pagina |
| Breadcrumbs di D1 a 390px | 4 livelli con nomi lunghi: deve andare a capo, non scorrere |
| Breadcrumbs di D14 e D12 | Le due eccezioni forzate via Snippet #8 |
| `/sedi/` | Deve restituire **404** |

**Stima: 20 h** (responsive, accessibilità, cross-browser e QA)
