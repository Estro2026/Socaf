# Socaf — Open point

Punti rimasti aperti. **Nessuno di questi è stato risolto inventando una soluzione.**
Dove il wireframe doveva comunque disegnare qualcosa, la soluzione temporanea è dichiarata
e marcata come provvisoria nel file stesso (badge `OPEN`).

Tre categorie:
- **CONTRADDIZIONE** — due documenti dicono cose diverse
- **DA DECIDERE / DA CONFERMARE** — i materiali lo lasciano aperto esplicitamente
- **DA CHIEDERE A SOCAF** — serve una decisione commerciale o un dato del cliente

---

## OP-01 · Referenze: 7 o 6?
**Tipo**: contraddizione
**Documenti in conflitto**: `Brief mockup.md` §B (« Referenza · CPT `referenza` · **7** ») e
`socaf_alberatura_nuovo_sito_v02.html` (« 7 schede cliente ») contro `socaf.it/sitemap-pages.xml`,
che espone **6** schede: Il Gigante, XPO Logistics, Cisalfa, Amica Chips, Lupo Srl, Progect Srl.
**Problema**: la settima referenza non è identificabile dal sito attuale e non è nominata nei documenti.
**Soluzione temporanea nel wireframe**: D18 e D8 mostrano l'elenco con **6 schede reali + 1 slot
segnato `[REFERENZA DA IDENTIFICARE]`**, in modo che il conteggio del brief resti visibile.
Nessun nome inventato.
**Chi decide**: Socaf.

## OP-02 · Indirizzo della landing "Noleggio lavamoquette"
**Tipo**: da confermare (dichiarato aperto nei materiali)
**Fonte**: ALB — « Noleggio lavamoquette · *indirizzo da definire* · da confermare ».
BM §D5 — « 4 pagine, più due da confermare con Socaf ».
**Problema**: la famiglia di catalogo si chiama *Lavatappezzeria* (sottocategoria di Altri macchinari),
mentre la domanda di ricerca usa *lavamoquette* / *lavatappeti*
(KW Asse 2: `lavamoquette noleggio` 140, `noleggio lavamoquette` 140, `noleggio lavatappeti` 90).
Lo slug della landing non può essere derivato meccanicamente dal termine di tassonomia.
**Soluzione temporanea**: D5 usa `/noleggio/lavamoquette/` e lo marca `OPEN` in nota DEV.
**Chi decide**: Socaf + SEO.

## OP-03 · Landing di noleggio per monospazzole e aspiratori
**Tipo**: da chiedere a Socaf
**Fonte**: BM §D5 — entrambe « no — da aprire con Socaf ». Non sono nell'alberatura.
**Domanda misurabile esistente**: `noleggio monospazzola per pavimenti` 320,
`noleggio monospazzole` 320 (KW Asse 1 · Lavapavimenti); per gli aspiratori nessun volume isolato.
**Soluzione temporanea**: **non create**. D4 e D5 elencano le 4 landing confermate e mostrano le due
ipotesi come voci disattivate con badge `OPEN`. La stima ore non le conteggia.
**Chi decide**: Socaf (serve sapere se le due formule esistono commercialmente).

## OP-04 · "Altri macchinari usati": perimetro della pagina
**Tipo**: da chiedere a Socaf
**Fonte**: BM §D7 — « Altri macchinari usati va aperta con Socaf: contiene la domanda su monospazzole
e vasche lavapezzi usate, che oggi non hanno una pagina propria ».
**Nota**: l'indirizzo `/usato/altri-macchinari-usati/` **esiste già** e non va toccato (ALB: 2 clic,
« resta com'è »). Quello che è aperto è il contenuto, non l'URL.
**Soluzione temporanea**: D7 la elenca tra le 5 famiglie usate con l'indirizzo attuale, e annota
che il perimetro del contenuto è aperto.
**Chi decide**: Socaf.

## OP-05 · Macchine correlate: automatiche o scelte a mano?
**Tipo**: dichiarato aperto
**Fonte**: BM §D1 — « Resta aperto se le macchine correlate si prendono in automatico dalla
sottocategoria o si scelgono a mano ».
**Impatto sulle ore**: automatico = 0 h di data entry e una query JetEngine;
manuale = un campo relazione ACF su 119 schede (DATA ENTRY, fuori dalle 240 h).
**Soluzione temporanea**: il wireframe disegna il blocco **automatico** (stessa sottocategoria,
massimo 4, macchina corrente esclusa) perché è l'ipotesi a costo zero. La nota DEV dichiara
l'alternativa e il suo costo.
**Chi decide**: Socaf.

## OP-06 · Posizione del form sulla scheda macchina
**Tipo**: dichiarato aperto — « la sceglie chi disegna il mockup »
**Fonte**: BM §D1 — « una colonna laterale che resta visibile durante lo scorrimento è l'ipotesi
da provare per prima ».
**Soluzione adottata nel wireframe**: colonna laterale sticky da ≥1024px, che collassa a blocco
in linea sotto le specifiche a <1024px. È l'ipotesi indicata dal brief, non una scelta autonoma.
Il blocco 7 (richiamo al form) è un'ancora verso la colonna.
**Resta da approvare**: Socaf / direzione creativa.

## OP-07 · Home: peso e posizione del blocco noleggio/usato
**Tipo**: dichiarato aperto
**Fonte**: BM §D16 — « Da decidere: il peso relativo di noleggio e usato dentro il blocco 3,
e se il blocco va prima o dopo le famiglie ».
**Soluzione temporanea**: blocco 3 **dopo** le sei famiglie, con noleggio a peso maggiore
(due terzi della larghezza) coerentemente con F4, che tratta il noleggio come « l'unica cosa nel
menu che sembra un'offerta ». Marcato `OPEN` in pagina: entrambe le alternative sono un'ora di lavoro.
**Chi decide**: Socaf.

## OP-08 · Cataloghi PDF delle categorie prodotto
**Tipo**: da chiedere a Socaf
**Fonte**: BM §D11 — « Quali cataloghi esistono oltre "Detergenti 2023" e in che versione,
per riempire il blocco 5 senza pubblicare materiale vecchio ».
**Attenzione**: BM §E dichiara « Ogni categoria prodotto ha un catalogo → il blocco c'è sempre ».
Se per alcune delle 13 categorie il catalogo non esiste, quel blocco diventa condizionale e va
trattato come tutti gli altri (sparisce). **Contraddizione potenziale, non ancora attiva.**
**Soluzione temporanea**: D11 disegna il blocco come sempre presente (BM §E) e annota la condizione.
**Chi decide**: Socaf.

## OP-09 · Le sette selezioni di macchine e le sette di categorie prodotto per settore
**Tipo**: da chiedere a Socaf — CLIENT TASK, fuori dalle 240 h
**Fonte**: BM §D9 — « Le sette selezioni di macchine e le sette di categorie prodotto.
Quali settori portano più fatturato, per dare priorità alla scrittura dei testi ».
**Blocco tecnico**: nessuno. Il campo relazione esiste comunque; senza selezione il blocco è vuoto
e (regola §E) sparisce — ma su una pagina settore è il blocco principale.
**Soluzione temporanea**: D9 disegna 8 card macchina con nomi reali presi dal catalogo,
etichettate `[SELEZIONE COMMERCIALE SOCAF]`.

## OP-10 · Le sei selezioni famiglia → categorie prodotto
**Tipo**: da chiedere a Socaf — CLIENT TASK
**Fonte**: BM §B — « Sei decisioni. È una scelta commerciale, non una regola tecnica: la fa Socaf ».
**Effetto a cascata**: alimenta il blocco 14 di **tutte e 119** le schede macchina e il blocco 8
di tutte e 13 le pagine categoria prodotto. Senza queste 6 decisioni due blocchi restano vuoti.
**Soluzione temporanea**: D1 e D11 disegnano il blocco pieno con categorie plausibili per la
famiglia lavapavimenti, marcate `[SELEZIONE COMMERCIALE SOCAF]`.

## OP-11 · Font secondario Neue Haas Unica non disponibile
**Tipo**: contraddizione operativa
**Documenti in conflitto**: `socafvi.pdf` cap. 03 definisce **due** caratteri —
BC Novatica (primario) e **Neue Haas Unica** (secondario, « indicato per testi descrittivi,
contenuti estesi »). La cartella `/Font` del progetto contiene **solo** BC Novatica (10 tagli).
**Vincolo del brief**: « Non scaricare o inventare font. Usa esclusivamente il font presente
nella cartella font del progetto ».
**Soluzione adottata**: il wireframe è costruito **a due famiglie**, come prescrive la VI —
BC Novatica per titoli, voci di menu e pulsanti, Neue Haas Unica per testo corrente, paragrafi,
etichette e informazioni di supporto. Poiché i file non ci sono e **non vanno scaricati**,
la regola `@font-face` di Neue Haas Unica dichiara solo `local()`: usa il carattere se è installato
sulla macchina, altrimenti ripiega su un neo-grottesco di sistema (Helvetica Neue / Helvetica / Arial),
che è **la stessa classe tipografica**. Il contrasto gerarchico geometrico ↔ neo-grottesco è quindi
già visibile e corretto; cambia solo il disegno esatto delle lettere.
**Nessuna richiesta di rete e nessun 404**: la riga `url()` è presente ma commentata in
`assets/css/wireframe.css`, con l'istruzione per riattivarla.
**Da risolvere prima dello sviluppo**: procurare la licenza web di Neue Haas Unica, depositare
i due file (Regular e Bold) in `assets/fonts/` e togliere il commento. In alternativa, decidere
formalmente che il sito è monofamiglia. Impatta il peso delle pagine e il budget font.

## OP-12 · Categorie prodotto: URL nell'alberatura scritti in forma abbreviata
**Tipo**: contraddizione apparente, risolta
**Documenti**: ALB mostra le 13 categorie con indirizzi tipo `/detergenti-enzimatici/`
(senza prefisso), ma la nota della stessa ALB dice « sono tutti figli di `/prodotti-per-la-pulizia/`.
La categoria dei detergenti enzimatici, per esteso, è `/prodotti-per-la-pulizia/detergenti-enzimatici/` ».
BM §D11 conferma `/prodotti-per-la-pulizia/[categoria]/`.
**Soluzione adottata**: forma estesa, nidificata. Non è un open point residuo — è annotato per
evitare che qualcuno legga gli URL brevi dell'alberatura come indirizzi reali.

## OP-13 · Settori: "cinque esistenti" o "sei indirizzi da rediretare"?
**Tipo**: contraddizione apparente, risolta
**Documenti**: ALB intestazione « 5 esistenti + 2 proposti », ma la nota dice « cambiano tutti e sei
gli indirizzi esistenti ».
**Verifica su socaf.it**: esistono 5 pagine settore (`/settore/macchine-per-la-pulizia-dedicate-*`)
**più** la pagina contenitore `/settore/`. 5 + 1 = 6 redirect.
**Soluzione adottata**: 7 pagine settore nel nuovo sito; **6 redirect** nel piano di migrazione
(5 pagine + l'hub `/settore/` → `/settori/`). Registrato in `dev-notes.md` §SEO tecnico.

## OP-16 · Un nono blocco in home: il focus sulla fusione
**Tipo**: aggiunta richiesta dal cliente, in deroga al brief
**In conflitto con**: `Brief mockup.md` §D16, che elenca **otto** blocchi e prescrive
« Servizi, referenze e articoli recenti restano fuori dalla home »; e la regola generale
« non aggiungere alla home sezioni solo perché stanno bene ».
**Richiesta**: una sezione che metta a fuoco la fusione — « Dalla fusione di 3 aziende, il tuo partner
affidabile per la pulizia industriale » — con i loghi di Socaf, Bottoni e Tecno Clean,
collocata **prima** del blocco noleggio/usato.
**Stato**: realizzata. È una decisione esplicita di Socaf, non una deriva del wireframe: la annoto qui
perché resti tracciata la deroga.
**Fondatezza del contenuto**: il dato è verificabile. Le cinque sedi hanno tre ragioni sociali —
Socaf S.p.A. (Osio Sotto, Castenedolo, Mazzo di Rho), Bottoni S.r.l. (Settimo di Pescantina, VR),
Tecno Clean S.r.l. (Cordenons, PN) — e il gruppo ha già un articolo dedicato alla fusione.
Nessun claim è stato inventato.
**Cosa manca**: <span>CONTENT TASK</span> i **loghi di Bottoni e Tecno Clean** non sono negli asset
del progetto. Servono in vettoriale, possibilmente monocromatici, per stare su una riga sola.
Nel wireframe sono due segnaposto dichiarati.
**Effetto sul budget**: +1 h su D16 (vedi `dev-estimate.md`). Il testo lungo della fusione **non** va
duplicato qui: resta su `/azienda/chi-siamo/`, che per alberatura assorbe « Aziende ».

## OP-15 · 116 schede raggiungibili contro le 119 dichiarate
**Tipo**: contraddizione da verificare
**Documenti in conflitto**: `socaf_alberatura_nuovo_sito_v02.html` dichiara **119** schede macchina
(24+19+17+25+4+30). Le pagine di categoria di socaf.it, percorse una per una, linkano **116** schede.
Lo scarto è di 3, tutte nella famiglia **Lavapavimenti**: l'alberatura ne conta 24, le cinque pagine di
sottocategoria ne linkano 23 (5+5+7+2+4).
**Problema**: le schede mancanti esistono nella sitemap ma non sono raggiungibili dai listati di categoria,
oppure il conteggio dell'alberatura include schede dismesse.
**Soluzione temporanea**: il wireframe usa le **116 verificate**, con i conteggi reali per sottocategoria.
Nessuna scheda è stata inventata per arrivare a 119.
**Da verificare prima dello sviluppo**: è un controllo di 10 minuti sull'export del CMS attuale, ma va fatto,
perché determina quante schede vanno migrate e quindi il volume di data entry.

## OP-14 · Numero di categorie prodotto: "da 8 a 13"
**Tipo**: contraddizione apparente, risolta
**Documenti**: ALB intestazione « da 8 a 13 categorie » (descrive la transizione), elenco ALB = 13,
BM §D11 = 13.
**Soluzione adottata**: **13**. L'"8" è lo stato attuale, non un'alternativa.

---

## Attività non tecniche da non perdere di vista

Non rientrano nelle 240 h di sviluppo (vedi `dev-estimate.md` §Fuori perimetro),
ma senza di esse il sito non va online.

| Marcatura | Attività | Volume |
| --- | --- | --- |
| SEO TASK | Testi di approfondimento delle 6 pagine famiglia | 6 × 800–1200 parole |
| SEO TASK | Testi delle 28 sottocategorie | 8 × 400–600 + 20 × 200–300 parole |
| SEO TASK | Testi dei 7 settori | 2 lunghi, 2 brevi, 3 medi |
| SEO TASK | Testi di D4, D6, 4 D5, 5 D7, D10, 13 D11 | ~25 pagine |
| SEO TASK | FAQ di tutte le pagine di catalogo, noleggio, usato, settori, prodotti | ~60 set |
| CONTENT TASK | Fotografia delle 5 sedi, foto "human style" secondo VI | — |
| CLIENT TASK | 7 selezioni macchine per settore + 7 selezioni categorie prodotto (OP-09) | 14 decisioni |
| CLIENT TASK | 6 selezioni famiglia → categorie prodotto (OP-10) | 6 decisioni |
| CLIENT TASK | 6 selezioni "le più richieste" (5–6 macchine per famiglia) | 6 decisioni |
| CLIENT TASK | Orari, coordinate, referenti e testo delle 5 sedi | 5 schede |
| CLIENT TASK | Conferma OP-02, OP-03, OP-04, OP-08 | 4 decisioni |
| DATA ENTRY | Relazione articolo → macchina su 184 articoli, a scaglioni | 20 → 8 (noleggio) → 156 |
| DATA ENTRY | `disponibile_noleggio` e `disponibile_usata` su 119 schede | 238 flag |
| DATA ENTRY | Tassonomia settore su 119 schede | 119 assegnazioni |
| FASE FUTURA | E-commerce | fuori da questo progetto |
