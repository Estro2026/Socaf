# Socaf — Source map (audit preliminare)

Matrice di copertura costruita **prima** di disegnare i wireframe e usata come checklist.
Fonti, in ordine di autorità: `Brief mockup.md` → `socaf_alberatura_nuovo_sito_v02.html` →
`socaf_F4_menu_nuovo_sito_v02.html` → `socaf_cluster_keyword.xlsx` → `brief strategico sito web.html`
→ `socafvi.pdf` → `socaf.it` (solo contenuti reali).

Legenda fonti: **BM** = Brief mockup · **ALB** = alberatura v02 · **F4** = menu v02 ·
**KW** = socaf_cluster_keyword.xlsx · **VI** = socafvi.pdf · **SITE** = socaf.it (contenuti reali)

---

## 0 · Conteggi da rispettare

| Entità | Quante | Verifica |
| --- | --- | --- |
| Famiglie | 6 | ALB ✓ — lavapavimenti 24, spazzatrici 19, idropulitrici 17, aspiratori 25, robot 4, altri macchinari 30 |
| Sottocategorie | 28 | ALB ✓ — 5+3+5+5+2+8 = 28 |
| Schede macchina | 119 | ALB ✓ — 24+19+17+25+4+30 = 119 |
| Settori | 7 | ALB ✓ — 5 esistenti + 2 proposti |
| Categorie prodotti pulizia | 13 | ALB ✓ — 8 attuali → 13 |
| Sedi | 5 | ALB + SITE ✓ |
| Referenze | 7 | ⚠ sul sito attuale ne risultano 6 → OP-01 |
| Articoli | 184 | ALB ✓ — indirizzi invariati |

**Nessun template genera 119 file HTML.** I file prodotti sono 19 template + dashboard.

---

## 1 · Matrice template

### D1 — Scheda macchina · `/[famiglia]/[sottocategoria]/[modello]/` · 119 istanze
- **File**: `wireframes/01-scheda-macchina.html`
- **Fonte**: BM §D1 (17 blocchi) · ALB (URL invariati) · SITE (dati reali)
- **Istanza reale usata**: `Lavapavimenti SOCAF LA 511-40 BT` →
  `/lavapavimenti/lavapavimenti-uomo-terra/lavapavimenti-socaf-la-511-40-bt/`
- **Blocchi obbligatori**: breadcrumbs, titolo, galleria, descrizione breve, richiamo al form,
  punti di forza (3–5), specifiche tecniche, detergenti e consumabili, macchine correlate, form
- **Blocchi condizionali**: etichetta noleggio, etichetta usato, scheda tecnica PDF, blocco noleggio,
  blocco usato, "dove si usa", articoli collegati, miniature galleria
- **Collegamenti interni**: famiglia, sottocategoria, `/noleggio/[famiglia]/`,
  `/usato/[famiglia]-usate/`, `/settori/[settore]/`, categorie prodotto, articoli, altre schede
- **Cluster SEO**: KW Asse 1 — cluster della famiglia. Nessun testo lungo su questo template.
- **Contenuti disponibili**: nome, descrizione, 2 punti di forza, 20 righe di specifiche,
  PDF scheda tecnica, 2 immagini — tutti reali da SITE
- **Contenuti mancanti**: 3° punto di forza (SITE ne espone 2) → placeholder
- **Open point**: OP-05 (macchine correlate auto vs manuali), OP-06 (posizione del form)

### D2 — Archivio sottocategoria · `/[famiglia]/[sottocategoria]/` · 28 pagine
- **File**: `wireframes/02-sottocategoria.html`
- **Fonte**: BM §D2 (12 blocchi) · ALB (slug reali) · KW (titoli sulle parole della ricerca)
- **Istanza mostrata**: Lavapavimenti → Uomo a terra (`/lavapavimenti/lavapavimenti-uomo-terra/`),
  una delle 8 sottocategorie con testo lungo
- **Blocchi obbligatori**: breadcrumbs, titolo, testo introduttivo, elenco macchine (tutte),
  testo di approfondimento, FAQ, le altre sottocategorie, form
- **Blocchi condizionali**: blocco noleggio, blocco usato, "dove si usano", articoli collegati (max 3)
- **Cluster SEO**: KW Asse 1 · Lavapavimenti (148 kw / 82.370 vol) →
  primaria `lavasciuga pavimenti a batteria` (390), varianti `lavasciuga pavimenti professionale`
  (4.400), `lavapavimenti industriale` (2.400). Intent commerciale.
- **Testo**: 400–600 parole (una delle 8 con domanda misurabile) → placeholder dimensionato
- **Contenuti disponibili**: intro e nomi macchina reali da SITE
- **Contenuti mancanti**: approfondimento strutturato e FAQ → `[CONTENUTO DA REDIGERE]` (SEO TASK)

### D3 — Pagina famiglia · `/[famiglia]/` · 6 pagine
- **File**: `wireframes/03-famiglia.html`
- **Fonte**: BM §D3 (13 blocchi) · ALB · KW
- **Istanza mostrata**: `/lavapavimenti/`
- **Blocchi obbligatori**: breadcrumbs, titolo, intro, elenco sottocategorie, approfondimento,
  FAQ, le più richieste (5–6, selezione manuale), "dove si usano", le altre famiglie, form
- **Blocchi condizionali**: blocco noleggio, blocco usato, articoli collegati
- **Cluster SEO**: KW Asse 1 · Lavapavimenti — primaria `lavapavimenti professionali` (4.400),
  varianti `lavasciuga pavimenti` (5.400), `lavapavimenti industriale` (2.400)
- **Testo**: 800–1200 parole (il più pesante del sito) → placeholder dimensionato.
  Eccezione dichiarata: Altri macchinari = testo breve
- **Open point**: OP-10 (le 6 selezioni famiglia → categorie prodotto sono decisioni Socaf)

### D4 — Ingresso noleggio · `/noleggio/` · 1 pagina
- **File**: `wireframes/04-noleggio.html`
- **Fonte**: BM §D4 (10 blocchi) · ALB (sezione nuova) · F4 (voce semplice del menu)
- **Blocchi obbligatori**: breadcrumbs, titolo, come funziona, formule e durate,
  cosa si può noleggiare (famiglie), perché noleggiare, FAQ, le 5 sedi, form preventivo
- **Blocchi condizionali**: articoli sul noleggio (gli 8 vanno collegati al lancio)
- **Vincolo**: la pagina **non elenca macchine**
- **Cluster SEO**: KW Asse 2 · Noleggio (8 kw / 830 vol) — `noleggio macchine pulizia` (140)
- **Contenuti disponibili**: testo reale da `/servizi/noleggio-macchine/` (SITE)

### D5 — Noleggio per famiglia · `/noleggio/[famiglia]/` · 4 pagine + 2 da confermare
- **File**: `wireframes/05-noleggio-famiglia.html`
- **Fonte**: BM §D5 (12 blocchi) · ALB
- **URL**: `/noleggio/lavapavimenti/`, `/noleggio/idropulitrici/`, `/noleggio/spazzatrici/`,
  `/noleggio/lavamoquette/` (⚠ da confermare → OP-02) · monospazzole e aspiratori → OP-03
- **Blocco obbligatorio e non negoziabile**: le 5 sedi
- **Cluster SEO**: `noleggio lavapavimenti` (720) + `noleggio lavasciuga pavimenti` (720) — Asse 1
- **Testo**: 400–600 parole sotto l'elenco macchine
- **Elenco macchine**: automatico — famiglia + `disponibile_noleggio = vero`

### D6 — Ingresso usato · `/usato/` · 1 pagina nuova
- **File**: `wireframes/06-usato.html`
- **Fonte**: BM §D6 (9 blocchi) · ALB
- **Blocchi**: breadcrumbs, titolo, come funziona, garanzia e revisione, le 5 famiglie usate,
  rimando alla supervalutazione, FAQ, le 5 sedi, form disponibilità
- **Contenuti disponibili**: testo reale da `/servizi/usato/` (SITE) — garanzia 3–12 mesi,
  ricondizionamento
- **Cluster SEO**: `lavapavimenti usato` (480), `idropulitrice acqua calda usata` (390)

### D7 — Usato per famiglia · `/usato/[famiglia]-usate/` · 5 pagine
- **File**: `wireframes/07-usato-famiglia.html`
- **Fonte**: BM §D7 (12 blocchi) · ALB
- **URL invariati (vincolo duro)**: `/usato/idropulitrici-usate/`, `/usato/lavapavimenti-usate/`,
  `/usato/spazzatrici-usate/`, `/usato/aspiratori-usati/`, `/usato/altri-macchinari-usati/`
- **Vincolo**: le 24 schede di singola macchina usata **non si ricreano** → redirect alla famiglia
- **Cluster SEO**: `lavapavimenti industriale usata` (390), `lavasciuga pavimenti industriali usate` (390)

### D8 — Ingresso settori · `/settori/` · 1 pagina
- **File**: `wireframes/08-settori.html`
- **Fonte**: BM §D8 (6 blocchi) · ALB (cambia indirizzo) · F4 (non è nel menu, non è in home)
- **Blocchi**: breadcrumbs, titolo, testo breve, i 7 settori, le referenze, form
- **Ruolo**: atterraggio esterno + destinazione dei breadcrumbs delle 7 pagine settore

### D9 — Pagina settore · `/settori/[settore]/` · 7 pagine
- **File**: `wireframes/09-settore.html`
- **Fonte**: BM §D9 (11 blocchi) · ALB (5 cambiano indirizzo, 2 nuove)
- **URL**: `industria`, `imprese-di-pulizia`, `horeca`, `retail`, `logistica`,
  `officine-metalmeccanica` (nuova), `edilizia-cantieri` (nuova)
- **Blocchi condizionali**: referenze del settore (max 3), approfondimenti (max 3)
- **Cluster SEO**: KW Asse 2 — Settore industriale (42 kw / 11.310), Imprese di pulizia (28 kw / 12.920),
  Ho.Re.Ca. (12 kw / 1.700), Retail (4 kw / 280), Logistica (2 kw / 20)
- **Testo**: lungo su Industria e Imprese di pulizia (800–1200), breve su Retail e Logistica
- **Open point**: OP-09 (le 7 selezioni di macchine e le 7 di categorie prodotto)

### D10 — Ingresso prodotti per la pulizia · `/prodotti-per-la-pulizia/` · 1 pagina
- **File**: `wireframes/10-prodotti-pulizia.html`
- **Fonte**: BM §D10 (8 blocchi) · ALB · F4 (voce semplice, ~4.500 ricerche/mese)
- **Cluster SEO**: KW Asse 1 · Prodotti per la pulizia (130 kw / 36.460 vol) —
  `prodotti per la pulizia` (1.000) + famiglia `prodotti per pulizie professionali` (880 ×6 varianti)
- **Testo**: 800–1200 parole. Domanda "ingrosso" (~1.600/mese) da intercettare **nel testo**,
  senza pagina dedicata
- **Contenuti disponibili**: intro reale da SITE

### D11 — Categoria prodotto · `/prodotti-per-la-pulizia/[categoria]/` · 13 pagine
- **File**: `wireframes/11-categoria-prodotto.html`
- **Fonte**: BM §D11 (10 blocchi) · ALB
- **13 slug**: detergenti-pavimenti-parquet, detergenti-enzimatici, detergenti-disinfettanti,
  detergenti-multiuso-sgrassanti, detersivi-lavanderia-industriale, igiene-mani,
  carrelli-per-pulizie, attrezzature, panni-stracci-microfibra, carta-e-dispenser, sacchi,
  dispositivi-di-protezione-individuale, ecolabel
- **Vincolo**: nessuna scheda di singolo prodotto sotto queste pagine
- **Cluster SEO** (5 con testo lungo): `stracci per pavimenti` (1.900), `pasta lavamani` (1.900),
  `carrelli per pulizie` (1.300), `detergente pavimenti professionale` (590) +
  `detersivo per parquet` (720), `detergenti enzimatici` (1.000)
- **Open point**: OP-08 (quali cataloghi PDF esistono)

### D12 — Articolo · `/news/[titolo]/` · 184 post nativi
- **File**: `wireframes/12-articolo.html`
- **Fonte**: BM §D12 (9 blocchi) · ALB (nessun indirizzo cambia)
- **Vincolo**: niente categorie, niente tag, nessuna pagina di raccolta
- **Blocco 6 (macchine di cui parla)**: unico lavoro di volume → DATA ENTRY, a scaglioni
- **Istanza reale**: `/news/noleggio-lavapavimenti/` (SITE)

### D13 — Archivio Approfondimenti · `/news/` · 1 pagina
- **File**: `wireframes/13-approfondimenti.html`
- **Fonte**: BM §D13 (5 blocchi) · ALB (nuovo nome, stesso indirizzo)
- **Vincolo**: nessun filtro, nessuna barra di categorie · 12 articoli per pagina

### D14 — Scheda sede · `/sedi/[sede]/` · 5 schede
- **File**: `wireframes/14-sede.html`
- **Fonte**: BM §D14 (11 blocchi) · ALB · SITE (dati reali di tutte e 5 le sedi)
- **Vincolo**: `/sedi/` non è una pagina (archivio CPT disattivato → 404)
- **Blocchi condizionali**: referente, foto
- **Contenuti disponibili**: indirizzo, telefono, email di tutte e 5 le sedi (reali)
- **Contenuti mancanti**: orari, coordinate, referenti, "cosa si fa qui" → CLIENT TASK

### D15 — Contatti · `/contatti/` · 1 pagina
- **File**: `wireframes/15-contatti.html`
- **Fonte**: BM §D15 (6 blocchi) · ALB (diventa l'elenco delle sedi)

### D16 — Home · `/` · 1 pagina
- **File**: `wireframes/16-home.html`
- **Fonte**: BM §D16 (8 blocchi — esattamente questi)
- **Esclusioni esplicite**: servizi, referenze, articoli recenti **non** vanno in home
- **Blocco 6**: Aquarial e Caldofacile → siti esterni, scheda nuova
- **Open point**: OP-07 (peso e posizione del blocco noleggio/usato)

### D17 — Risultati di ricerca · `/?s=` · 1 template
- **File**: `wireframes/17-risultati-ricerca.html`
- **Fonte**: BM §D17 (5 blocchi)
- **Unico empty state disegnato del sito**: 6 famiglie + contatti
- **SEO**: `noindex`

### D18 — Pagine restanti
- **File**: `wireframes/18-pagine-restanti.html`
- **Fonte**: BM §D18 · ALB
- **Copre**: `/servizi/` + 4 servizi, `/azienda/` + 4 istituzionali, `/azienda/referenze/`,
  `/azienda/referenze/[cliente]/`
- **Vincolo**: riscaldamento industriale e raffrescamento evaporativo **non si fanno**

### D19 — Header, menu, footer
- **File**: `wireframes/19-header-menu-footer.html`
- **Fonte**: F4 (integrale, senza reinterpretazioni) · BM §D19
- **Riga di servizio**: Pronto intervento · Approfondimenti · Cerca
- **6 voci**: Macchine (tendina), Noleggio (link), Settori (tendina),
  Prodotti per la pulizia (link), Servizi (tendina), Azienda (tendina)
- **CTA unica in evidenza**: 800 480110
- **Vincolo verificato**: le 28 sottocategorie **non** entrano nel menu
- **Mobile**: fisarmonica, niente mega-menu a colonne, Noleggio e numero verde fissi in alto

---

## 2 · Componenti ricorrenti (BM §C) — definiti una volta

| Componente | Definito in | Riusato in |
| --- | --- | --- |
| Breadcrumbs | `assets/css` + `assets/js` | D1–D15, D18 (non in home) |
| Card macchina | D1 | D2, D3, D5, D7, D9, D17 |
| Card sottocategoria | D3 | D3 |
| Card articolo | D13 | D1, D2, D3, D5, D9, D12, D13 |
| Etichette noleggio / usato | D1 | card macchina ovunque |
| Blocco noleggio | D1 | D2, D3 |
| Blocco usato | D1 | D2, D3 |
| Blocco sedi | D4 | D5, D6, D7, D15, D16 |
| FAQ (accordion, tutte chiuse) | D2 | D3, D4, D5, D6, D7, D9, D10, D11 |
| Form generico | D2 | ovunque tranne D1 |
| Form macchina (3 opzioni) | D1 | solo D1 |
| Ricerca | D19 | D16, D17 |

---

## 3 · Copertura keyword (KW) — nessuna pagina nuova generata dal file

| Asse | Cluster | Volume | Pagina che lo intercetta |
| --- | --- | --- | --- |
| 1 | Lavapavimenti (148 kw) | 82.370 | D3 `/lavapavimenti/` + 5 D2 + D5 + D7 |
| 1 | Idropulitrici (125 kw) | 45.360 | D3 `/idropulitrici/` + 5 D2 + D5 + D7 |
| 1 | Prodotti per la pulizia (130 kw) | 36.460 | D10 + 13 D11 |
| 1 | Aspiratori (67 kw) | 29.550 | D3 `/aspiratori/` + 5 D2 + D7 |
| 1 | Altri macchinari (77 kw) | 28.120 | D3 `/altri-macchinari/` + 8 D2 + D7 |
| 1 | Spazzatrici (55 kw) | 8.210 | D3 `/spazzatrici/` + 3 D2 + D5 + D7 |
| 1 | Robot (38 kw) | 8.180 | D3 `/robot/` + 2 D2 |
| 2 | Imprese di pulizia (28 kw) | 12.920 | D9 `/settori/imprese-di-pulizia/` |
| 2 | Settore industriale (42 kw) | 11.310 | D9 `/settori/industria/` |
| 2 | Geografico (25 kw) | 6.690 | D14 schede sede + D15 |
| 2 | Ho.Re.Ca. (12 kw) | 1.700 | D9 `/settori/horeca/` |
| 2 | Noleggio (8 kw) | 830 | D4 + 4 D5 |
| 2 | Retail (4 kw) | 280 | D9 `/settori/retail/` |
| 2 | Logistica (2 kw) | 20 | D9 `/settori/logistica/` |
| 3 | Guide e long tail (28 kw) | 8.960 | D12 articoli esistenti — nessuna pagina nuova |
| 3 | Comparativo/decisionale (4 kw) | 640 | D12 articoli esistenti — nessuna pagina nuova |

**Verificato**: l'Asse 3 non genera pagine. Alimenta articoli già pubblicati (184, indirizzi invariati).

---

## 4 · Visual identity (VI) — cosa entra nel wireframe e cosa no

| Elemento VI | Valore | Uso nel wireframe |
| --- | --- | --- |
| Socaf Red | `#e4002b` (Pantone 186 C) | solo CTA, link, stati — accento controllato |
| Socaf Blue | `#0085cf` (Pantone Process Blue) | solo link e note DEV |
| Jet Black | `#001e2a` | testo |
| Steel Gray | `#636362` | testo secondario |
| Liquid Gray | `#dbdbdb` | bordi, placeholder |
| White | `#ffffff` | fondo |
| Font primario | BC Novatica (locale, `@font-face`) | tutto il wireframe |
| Font secondario | Neue Haas Unica | ⚠ non presente in `/Font` → OP-11, non usato |
| Elemento grafico "The Slice" | taglio diagonale del logotipo | **non riprodotto** — solo citato nelle note |
| Gradienti (red burst, blue frost, fluid energy) | — | **esclusi**: art direction, non wireframe |
| Tone of voice | chiaro, competente, concreto, vicino | guida le note, non genera copy |

Colori secondari VI (Soft Red `#f33f54`, Deep Red `#a31000`, Electric Blue `#0255b3`,
Crystal Blue `#4fbdf7`) sono registrati ma **non usati**: il wireframe resta bianco/grigio/antracite.

---

## 5 · Stato della checklist

| Verifica | Esito |
| --- | --- |
| Tutti i 19 template del Brief mockup rappresentati | ✓ |
| Tutti i blocchi obbligatori presenti template per template | ✓ |
| Tutte le condizioni "quando appare" annotate | ✓ (note DEV) |
| URL conformi all'alberatura, slug non modificati | ✓ (slug reali verificati su sitemap socaf.it) |
| Menu conforme a F4 | ✓ |
| Nessuna sottocategoria nel menu | ✓ |
| Numero verde 800 480110 presente su ogni pagina | ✓ |
| Cluster SEO consultati, nessuna pagina inventata | ✓ |
| Nessun filtro, prezzo, carrello, checkout, scheda ecommerce | ✓ |
| Nessuna scheda di singola macchina usata | ✓ |
| Font dalla cartella locale, nessun Google Font | ✓ |
| Stima entro 240 h | ✓ 228 + 12 buffer |
