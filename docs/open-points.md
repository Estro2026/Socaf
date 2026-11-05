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
**Cosa manca**: <span>CONTENT TASK</span> i **loghi di Bottoni e Tecno Clean** sono in `assets/` solo come bitmap bianco (`Bottoni.webp`, `Tecnoclean.webp`):
nel mockup sono resi monocromatici scuri via CSS. Per il sito servono in vettoriale.
Nel mockup sono usati i due bitmap.
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
**Confermato dal cliente il 03/11/2026**: « vanno bene le 13 categorie che ci sono nel mockup ». Chiude la domanda aperta del 02/11 (nomi e numero definitivi).

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

## OP-17 · Referenze: le card portano al sito del cliente

**Decisione di revisione**: le card delle referenze (settori e pagina Referenze) non aprono più
una pagina interna `/azienda/referenze/[cliente]/`, ma il sito del cliente in una scheda nuova.
**Da confermare con Socaf**: gli indirizzi usati nel mockup sono quelli pubblici noti dei marchi
(amicachips.it, cisalfasport.it, ilgigante.net, xpo.com) e vanno verificati, insieme
all'autorizzazione a linkarli. **Mancano** i siti di Lupo S.r.l. e Progect S.r.l.: nel mockup la
card lo dichiara ("[Sito del cliente da fornire]").
**Effetto**: se le schede interne delle referenze non servono più come destinazione, si può
valutare se tenerle (SEO, contenuto esistente su socaf.it) o reindirizzarle.

## OP-18 · Fotografie mancanti per le card di categoria
Le card usano le foto reali di `assets/STATICHE` (copie web in `assets/images/categorie/`). Mancano fotografie per: famiglie **Aspiratori** (cartella vuota), **Robot**, **Altri macchinari**; sottocategorie **i-mop**, **Spazzatrici stradali**, **Idropulitrici acqua calda / alte prestazioni / impianti fissi / autonome**, **Robot**. Lì resta il segnaposto: servono foto dal cliente.
- (01/10) Home · « I marchi del gruppo »: nelle card ora ci sono i loghi ufficiali (`assets/acquarial.svg`, `assets/caldofacile.svg`); il logo Aquarial esiste solo in versione bianca e sul fondo chiaro è reso scuro via CSS.
- (01/10) Ricerca (D17): rimossa dal mockup la sezione « Pagine » dei risultati su richiesta; restano Macchine e Approfondimenti. Da confermare se le pagine vanno escluse anche dall'indice di ricerca o solo dalla visualizzazione.
- (01/10) Pagine di servizi e azienda (D20): dove il corpo è un pannello a schede senza titolo proprio, il mockup usa come titolo il nome della pagina. Serve un titolo di sezione dal cliente.
- (01/10) Pagine sede (D14): le tre foto della galleria sono segnaposto (sede di Osio Sotto, showroom, officina da `assets/STATICHE/Sito`), uguali per tutte le sedi. Servono le foto di ciascuna sede.
- (02/10) Chi siamo · sezione « Le persone »: foto segnaposto ritagliate dagli scatti Socaf in `assets/STATICHE` (operatori al lavoro); nomi e ruoli sono segnaposto `[Nome Cognome]` / `[Ruolo]`. Servono foto ritratto e dati delle persone dal cliente.
- (02/10) Testate seguite da una sezione a schede: il testo d'apertura è accorciato automaticamente alla frase che chiude entro ~220 caratteri. Da validare con il cliente il testo breve definitivo.
- (02/10) Lavora con noi · prima voce della lista: il titolo della sezione su socaf.it è una frase lunga (« Chi entra in Socaf trova un ambiente fatto di sguardi… »). Nella lista serve un'etichetta breve da concordare con il cliente.

## OP-19 · Famiglie di macchine nuove: Lavastoviglie, Macchine del ghiaccio, Trattamento acqua, Lavatrici, Essiccatoi (03/11)
**Richiesta CLIENTE** (sostituisce la voce del 13/10 su Cucina e Lavanderia): al posto di Cucina e Lavanderia, cinque famiglie; sotto Lavastoviglie: lavabicchieri, lavapiatti, lavaoggetti. Elenco prodotti ricevuto il 02/11.
**Fatto nel mockup**: 11 famiglie, 38 sottocategorie, 143 schede con nome (27 nuove, descrizioni in arrivo: `"ph":true` in `assets/js/catalogo.js`); menu, footer, home, ricerca, famiglie, sottocategorie, schede. Cucina e Lavanderia non esistono più.
**Letture mie (INFERENZA) da confermare**
- « Lavatrici, Essicatoi » = **due famiglie** a sé (non una famiglia « Lavanderia »). Ortografia usata: **Essiccatoi** (il cliente scrive « Essicatoi »).
- **Lavastoviglie**: le tre sottocategorie indicate + **Lavastoviglie a traino** (1 prodotto, in elenco sotto la stessa voce).
- **Trattamento acqua**: nessuna sottocategoria indicata → divisa per **marca** (Walo 3, Brita 2), unico dato certo dell'elenco.
- **Lavatrici**: FX (105, 135, 180) e Lavacentrifughe (GVH80). **Essiccatoi**: GD450, GDZ 275/350/600 sotto « Professionali » (nome mio) e **Small Pro** (GDC201, GH10): l'elenco non dice se Small Pro è una linea di lavatrici o di essiccatoi.
- **Macchine del ghiaccio**: nessun prodotto nell'elenco → pagina con stato vuoto dichiarato.
- Errori di battitura corretti: « Dhir » → **Dihr**; **Meico** è il nome giusto (Sara, 04/11: non Meiko). Sigle lasciate come nel file (M-ICLEAN, FX, GD…).
- Indirizzi: `/lavastoviglie/`, `/macchine-del-ghiaccio/`, `/trattamento-acqua/`, `/lavatrici/`, `/essiccatoi/` (nessun dato di ricerca).
**Conteggio**: hero « 146 macchine » = 119 dichiarate dal brief + 27 nuove (le 3 schede non raggiungibili di OP-15 restano contate).
**Mancano**: descrizioni e schede (promesse per la settimana del 19/10), testi di famiglia e sottocategoria, foto vere (oggi scatti Socaf generici: segnaposto), icone per lavaoggetti, lavastoviglie a traino e macchine del ghiaccio (le altre usano le icone illustrate dell'agenzia), flag noleggio/usato, settori collegati.
**Documenti di input non aggiornati**: alberatura v02, menu F4, Brief mockup (sei famiglie, 119 schede).

## OP-20 · Settori: due nuovi, ordine alfabetico, macrosettore Industria (03/11)
**Richiesta CLIENTE**: aggiungere *Assistenza sociosanitaria* e *Pubblica Amministrazione* (home e pagina Settori); Officine meccaniche ed Edilizia e cantieri dentro Industria; ordine alfabetico.
**Fatto**: 7 settori di primo livello in ordine alfabetico in home, pagina Settori, menu e elenchi « Dove si usa »; Officine ed Edilizia annidate sotto Industria (menu, card « Dentro l'industria », briciole). **Gli indirizzi non cambiano** (`/settori/officine-metalmeccanica/`, `/settori/edilizia-cantieri/`): la gerarchia è di navigazione, non di URL → da confermare (alternativa: `/settori/industria/officine…/` con redirect).
**Da confermare**: nome « Officine meccaniche » (il cliente) contro « Officine e metalmeccanica » (mockup: lasciato). Selezione delle macchine dei due settori nuovi = PROPOSTA mia (nomi di sottocategorie reali). Testi: da fornire. Icone: **segnaposto** nello stile V01 (croce, edificio con colonne): servono quelle dell'agenzia. Foto dei due settori: mancano. Per la PA ho aggiunto un blocco « Acquisti verdi » con CAM ed Ecolabel (testi del cliente): proposta mia.

## OP-21 · Homepage: titolo, ricerca, CTA, Numero Verde e WhatsApp (03/11)
**Fatto**: titolo « Macchine, detergenti, attrezzature e consumabili professionali » (ridotto di corpo per stare in 4 righe senza spingere fuori la prima schermata); « Cerca la soluzione che ti serve » al posto di « Cerca la macchina che ti serve » (quella frase stava nel sottotitolo sopra la barra: il segnaposto del campo, « Cerca macchine, prodotti, settori », è rimasto); **una sola barra di ricerca** in home, la ricerca resta nell'icona della barra sticky; quattro CTA intermedie (famiglie, noleggio e usato, settori, detergenti) verso il modulo (`#richiesta`), oltre a hero e modulo finale; Numero Verde in **verde** nel corpo della home (hero e modulo) + pulsante **WhatsApp** con il logo.
**Da fornire / confermare**: il **numero WhatsApp** (il link è `https://wa.me/` senza numero: un numero verde 800 non riceve WhatsApp); il Numero Verde nella barra in alto resta rosso (è globale: se va verde anche lì lo cambio); testi delle CTA = proposta.

## OP-22 · « Prodotti per la pulizia » → « Detergenti, attrezzature e consumabili » (03/11)
**Fatto**: titolo, voce di menu, piè di pagina, briciole, titolo/meta della pagina. **L'indirizzo `/prodotti-per-la-pulizia/` non cambia.** **Rischio SEO**: l'hub raccoglie ~4.500 ricerche/mese sulla dicitura precedente (cluster 36.460): l'espressione « prodotti per la pulizia professionale » resta nel testo introduttivo e nella meta description. Le **13 categorie sono confermate** (chiude OP-14). L'etichetta lunga sta in una riga nel menu da 1100px in su.

## OP-23 · « Oltre 40.000 clienti attivi » (03/11)
Dato fornito dal cliente nella sezione di affidabilità (blocco « Il gruppo » in home). Fonte, data di riferimento e aggiornamento da definire: non è verificabile da qui.

## OP-24 · Integrazione Socaf · Bottoni · Tecno Clean e video-intervista (03/11)
**Fatto**: in **Chi siamo** un blocco « L'integrazione » con i cinque vantaggi (ampliamento dell'offerta, copertura territoriale, competenze complementari, capacità di assistenza, nuovi prodotti e servizi) (il blocco « Il video-intervista » è stato **tolto il 04/11**: il video andrà come sfondo della hero); in **home** (blocco « Il gruppo ») i cinque vantaggi in forma breve e un collegamento a Chi siamo.
**Da fornire**: il **file o link del video-intervista** per la hero (sfondo, muto e in loop come il video della home; da decidere se sulla hero di Chi siamo o di un'altra pagina); le **tappe e le date** del percorso di integrazione. I testi dei vantaggi sono **PROPOSTA**: ricavati da fatti dei documenti (Tecno Clean esperta di consumabili e detergenti; Bottoni forte sulle imprese di servizi e a est; Tecno Clean sull'Ho.Re.Ca.; cinque sedi) e da validare.

## OP-25 · Pagina Certificazioni (03/11)
**Fatto**: pagina `/azienda/certificazioni/` nel menu Azienda, prima di Contatti: ISO 9001, Ecolabel UE, ISO 14001, ISO 45001, CAM, EPD, con i testi del cliente (non riscritti; « ISOO » → ISO). ISO 9001 documentata dal PDF: Bureau Veritas, certificato IT335877, norma ISO 9001:2015, **scade il 17/09/2027**, campo di applicazione (vendita, noleggio e assistenza di macchine per la pulizia industriale; raffrescamento industriale). Il PDF è in `assets/certificazioni/` e scaricabile. Ecolabel anche come card tra le categorie (già una delle 13) con richiamo alla certificazione.
**Da chiarire con il cliente**: il certificato riguarda **solo Socaf S.p.A., sede di Osio Sotto**: dopo la fusione si estende a Bottoni e Tecno Clean? Per **ISO 14001, ISO 45001, CAM, EPD ed Ecolabel** non c'è documento: servono estremi (ente, numero, scadenza, perimetro) prima di pubblicare, altrimenti si afferma un possesso non verificato. Altre certificazioni (politica qualità: PDF già nel piè di pagina). **Loghi ufficiali** dei marchi: oggi sigle tipografiche.

## OP-26 · BClean e « Prodotti consigliati » (03/11)
**BClean**: voce dedicata in « Detergenti, attrezzature e consumabili » (banner in cima all'hub, pagina `/prodotti-per-la-pulizia/bclean/`) con il testo del cliente e l'elenco dal file xlsx, per linea. **Discrepanze**: il file ha **45 detergenti** (8 linee) e **5 articoli in carta**, il brief diceva « circa venti » e « tre o quattro ». Le righe della « Linea Lavanderia » sono doppie (3 unite) e i nomi non uniformi (« BCLEAN VORTEX » / « B-CLEAN … »): lasciati come nel file. Codici articolo, barcode e **fornitori** (LU&MI, IRCA, MADAL, Cartiere Carrara) **non sono pubblicati**. Descrizioni dei singoli prodotti: da fornire.
**Ecolabel e riciclato**: la linea « Ecolabel » (GREEN CLEAN, 10 prodotti) è marcata Ecolabel UE; **quali prodotti abbiano flaconi e imballaggi in materiali riciclati non è indicato** (segnaposto visibile).
**Prodotti consigliati**: dove vada la sezione non è detto: l'ho messa in **home** (blocco detergenti), nell'**hub** dei prodotti e nelle famiglie **Lavastoviglie, Lavatrici, Essiccatoi** (abbinando i detergenti BClean per lavastoviglie e lavanderia: INFERENZA). La selezione dei prodotti è un segnaposto: la sceglie Socaf. Se la intendevi solo in un punto, lo tolgo dagli altri.

- **OP-27 · Schede prodotto BClean (04/11/2026)** — Sara chiede una scheda per ognuno dei 50 prodotti BClean. Cambia il perimetro (prima: solo elenco, nessuna scheda singola) e la stima (CPT + import CSV: 6–8 h al posto di 4 h, PROPOSTA). Da confermare con Socaf; da fornire: descrizioni, foto, schede tecniche e di sicurezza.
