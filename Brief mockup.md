# Socaf — Brief tecnico per il mockup

2026-09-17 · @Bardo

## Premessa e istruzioni

Questo documento serve a costruire il prompt iniziale del mockup del nuovo sito Socaf. Il lettore è Claude, non un cliente: la scrittura è strutturata e senza prosa persuasiva.

Il documento si appoggia a due lavori già chiusi: l'alberatura del nuovo sito, che fissa gli indirizzi e i collegamenti, e il workbook dei cluster keyword, che dice quale domanda ogni pagina deve intercettare.

Colori, tipografia e impaginazione non sono stati decisi e non stanno qui: i riferimenti visivi li porta chi disegna. Quello che questo documento fissa è cosa sta in ogni pagina, da dove arriva e quando compare.

### Come impostare la richiesta

**Il documento si dà intero come contesto**, una volta sola. Poi si lavora un template alla volta. Chiedere diciannove template in un colpo produce diciannove pagine superficiali.

**Due passaggi per ogni template.** Prima il wireframe: blocchi, gerarchia, proporzioni, senza grafica. Si approva quello, poi si passa alla versione con l'aspetto. Discutere di colori mentre la struttura è ancora aperta fa perdere entrambe le discussioni.

**Il wireframe porta le note tecniche a margine**: richiami numerati accanto ai blocchi, con il campo di origine, la condizione che li accende e la destinazione dei collegamenti. Nel mockup finito le note non ci vanno: quello lo guarda il cliente.

**Consegna**: un file HTML autonomo per template, che funzioni anche da telefono.

**Per la scheda macchina conviene partire da una macchina vera** — nome, specifiche e descrizione reali presi dal sito attuale. È il template che definisce tutti i componenti, e con i segnaposto si valuta male.

**I primi tre template vengono prima di tutto il resto.** Scheda macchina, archivio sottocategoria e pagina famiglia definiscono card, etichette, blocchi di noleggio e usato, breadcrumbs e form, cioè quasi tutti i componenti del sito. Dal quarto in poi l'ordine è indifferente: chi disegna può fare tutto il noleggio di fila, o tenere insieme le pagine che si somigliano.

### Cosa va rispettato

- Gli indirizzi, esattamente come sono scritti
- La presenza di tutti i blocchi previsti da ogni template
- Le condizioni della colonna "quando appare"
- Il menu, la riga di servizio e il piè di pagina
- I titoli costruiti sulle parole della ricerca, dove il documento lo indica
- I limiti di quantità degli elenchi
- La lunghezza indicativa dei testi: dove il documento dice 800-1200 parole, il segnaposto deve occupare quello spazio

**L'ordine dei blocchi nelle tabelle è un suggerimento, non un vincolo.** Chi disegna può riorganizzarlo, purché i blocchi ci siano tutti e le condizioni siano rispettate.

### Cosa è segnaposto

- Tutti i testi: introduzioni, approfondimenti, domande frequenti
- Le immagini
- Le selezioni commerciali: macchine per settore, categorie di prodotto per famiglia, le più richieste
- I contenuti delle specifiche tecniche

I nomi delle famiglie, delle sottocategorie, dei settori e delle categorie di prodotto sono quelli veri e vanno usati. Il numero verde è 800 480110.

### Cosa non va aggiunto

- Filtri di qualsiasi tipo
- Prezzi, pulsanti di acquisto, carrello: il commercio elettronico è fuori dal progetto
- Schede di singolo prodotto per la pulizia
- Pagine per la singola macchina usata
- Voci di menu oltre le sei previste
- Sezioni non presenti in questo documento

## A · Stack

ACF Pro definisce e conserva il dato, Crocoblock lo mostra, Elementor lo impagina. Nessun dato vive in due posti.

| Strumento | Ruolo |
| --- | --- |
| WordPress | Pagine, articoli, utenti |
| ACF Pro | Registra CPT e tassonomie, definisce tutti i campi, gestisce le relazioni bidirezionali |
| Elementor Pro | Theme builder, pagine di catalogo, template di singolo, header, footer, form |
| Crocoblock | Listing grid e query per gli elenchi dinamici, con JetEngine |
| The SEO Framework | Titoli, descrizioni, indirizzi canonici, sitemap |
| Code Snippets | Le funzioni PHP su misura |

Della suite Crocoblock si usa solo JetEngine.

CPT e tassonomie si registrano da ACF Pro, non da JetEngine.

Il codice su misura sta in Code Snippets, mai nel tema.

### Regole per il mockup

**Gli elenchi dinamici sono griglie di elementi identici.** In un elenco di macchine le card hanno tutte lo stesso disegno: nessuna card più grande delle altre, nessuna differenza che non dipenda da un campo.

**Gli elementi condizionali si disegnano pieni.** Quando il campo è vuoto l'elemento sparisce. La colonna "quando appare" di ogni template dice quali possono mancare.

### Convenzioni

Nomi di campi e gruppi in `snake_case`, in italiano, senza abbreviazioni: `disponibile_noleggio`, non `disp_nol`.

I gruppi di campi ACF prendono il nome del contenuto a cui si applicano: `Macchina — dati tecnici`, `Macchina — collegamenti`, `Settore — contenuti`. Un gruppo per blocco funzionale, non un gruppo unico da quaranta campi.

## B · Modello dati

Il sito ha **tre tipi di contenuto personalizzati, due tassonomie, gli articoli nativi e un insieme di pagine statiche**. Tutto il resto sono campi.

| Contenuto | Tipo | Quanti | Indirizzo |
| --- | --- | --- | --- |
| Macchina | CPT `macchina` | 119 | `/[famiglia]/[sottocategoria]/[modello]/` |
| Famiglia e sottocategoria | Tassonomia gerarchica `famiglia`, senza archivi | 6 + 28 | Pagine: `/[famiglia]/` e `/[famiglia]/[sottocategoria]/` |
| Settore | Tassonomia non gerarchica `settore`, senza archivi | 7 | Pagina: `/settori/[settore]/` |
| Referenza | CPT `referenza` | 7 | `/azienda/referenze/[cliente]/` |
| Sede | CPT `sede` | 5 | `/sedi/[sede]/` — senza archivio |
| Articolo | Post nativi | 184 | `/news/[titolo]/` |
| Tutto il resto | Pagine | \~30 | come da alberatura |

I prodotti per la pulizia sono 13 pagine di categoria sotto `/prodotti-per-la-pulizia/`, senza schede sotto. Noleggio e usato sono pagine che rimandano alle macchine, non un secondo catalogo.

### Le due regole della tassonomia famiglia

Una sola tassonomia gerarchica su due livelli, non due tassonomie separate. `lavapavimenti` è il termine padre, `lavapavimenti-uomo-terra` il figlio. Registrata con base vuota e indirizzi gerarchici, produce da sola entrambi i livelli di indirizzo.

**Una macchina sta in una sola sottocategoria.** Regola redazionale da rispettare anche sulle macchine che verranno aggiunte in futuro.

**Si assegna solo la sottocategoria, mai anche la famiglia.** La famiglia si eredita dal termine padre.

### Campi della scheda macchina

| Campo | Tipo ACF | Obbligatorio | Note |
| --- | --- | --- | --- |
| Sottocategoria | Tassonomia, valore singolo | Sì | Determina l'indirizzo |
| Descrizione breve | Textarea, 200 caratteri | Sì | Usata nelle card di elenco |
| Galleria immagini | Galleria | Sì | La prima immagine fa da principale |
| Punti di forza | Repeater, 3-5 righe | Sì |  |
| Specifiche tecniche | Repeater etichetta + valore | Sì |  |
| Scheda tecnica | File PDF | No | Ha uno stato vuoto |
| Settori di utilizzo | Tassonomia, valori multipli | No | Bidirezionale automatico |
| Disponibile a noleggio | Vero/falso | Sì | Accende etichetta e blocco |
| Disponibile usata | Vero/falso | Sì | Accende etichetta e blocco |
| Detergenti e consumabili | — | — | Non si compila: ereditato dalla famiglia |
| Articoli collegati | — | — | Non si compila: arriva dal lato articolo |

### Le pagine di catalogo sono pagine, non archivi

Famiglie e sottocategorie si costruiscono come pagine WordPress con Elementor: `/lavapavimenti/` è una pagina, `/lavapavimenti/lavapavimenti-uomo-terra/` è una sua pagina figlia. Sono 34 pagine costruite a mano. Le pagine settore seguono la stessa logica sotto `/settori/`.

Le tassonomie servono a organizzare le macchine, comporre il loro indirizzo e tenere il collegamento con i settori. **La generazione dei loro archivi va spenta**, altrimenti il termine e la pagina si contendono lo stesso indirizzo.

**Il CPT macchina resta pubblico e interrogabile**: si spegne l'archivio della tassonomia, non quello delle macchine.

Gli elenchi dentro le pagine si costruiscono con le listing grid di JetEngine:

| Pagina | Il loop gira su | Filtro |
| --- | --- | --- |
| Famiglia | Termini | Sottocategorie figlie di quella famiglia |
| Sottocategoria | Macchine | Termine corrispondente |
| Settore | Macchine | Selezione manuale, 8-12 |

Il modello della card macchina si costruisce una volta e si riusa in tutte le pagine.

**Rinominare un termine è un'operazione doppia**: va cambiato anche lo slug della pagina corrispondente.

**I blocchi ricorrenti sono modelli salvati di Elementor**, richiamati e non ricostruiti: card macchina, blocco noleggio, blocco usato, richiesta informazioni.

### Le relazioni

Ogni relazione si compila da un lato solo.

| Relazione | Come | Quante decisioni | Dove si compila |
| --- | --- | --- | --- |
| Macchina ↔ settore | Automatica nei due sensi | 119 assegnazioni, una volta | Scheda macchina |
| Famiglia → categorie prodotto | Ereditata dalle schede | 6 | Termine famiglia |
| Settore → macchine | Manuale | 7 | Termine settore |
| Referenza → settore | Automatica nei due sensi | 7 | Scheda referenza |
| Articolo ↔ macchina | Manuale, bidirezionale | 184, a scaglioni | Articolo |
| Articolo → settore | Ereditata dalle macchine | 0 | — |

Le relazioni bidirezionali di ACF vanno usate ovunque la tabella le indichi: si compila un lato e l'altro si popola da solo, senza costruire elenchi inversi con query sui campi.

**Articolo → macchina si compila a scaglioni**, partendo dai venti articoli con più traffico. Il lancio non aspetta i restanti 164.

### Le sedi

Cinque schede con indirizzo, telefono, email, orari, referente e coordinate in campi separati, non in un blocco di testo. Gli stessi campi alimentano la pagina e i dati strutturati.

`/sedi/` non è una pagina: l'archivio del CPT va disattivato, chi apre quell'indirizzo trova un 404.

## C · Componenti

Blocchi che compaiono su più template. Si disegnano una volta e si richiamano; nei template della sezione D sono citati per nome.

| Componente | Dove compare |
| --- | --- |
| Breadcrumbs | Ovunque tranne la home |
| Card macchina | Sottocategoria, famiglia, settore, landing noleggio, macchine correlate, risultati di ricerca |
| Card sottocategoria | Pagina famiglia |
| Card articolo | Archivio news, articolo, scheda macchina, settore, pagine di catalogo |
| Etichette noleggio e usato | Scheda macchina, card macchina |
| Blocco noleggio | Scheda macchina, sottocategoria, famiglia |
| Blocco usato | Scheda macchina, sottocategoria, famiglia |
| Blocco sedi | Noleggio, usato, contatti, home |
| Domande frequenti | Tutte le pagine di catalogo, noleggio, usato, settori, prodotti |
| Richiesta informazioni | Ovunque |

### Card macchina

Prima immagine della galleria, nome, descrizione breve, etichette noleggio e usato quando presenti. Nient'altro: le specifiche stanno nella scheda.

Tutta la card è cliccabile e porta alla scheda. Nessun pulsante interno.

### Card sottocategoria

Immagine, nome costruito sulle parole della ricerca, numero di macchine contenute.

### Card articolo

Immagine in evidenza, titolo, data, prime righe. Senza immagine la card resta della stessa altezza delle altre.

### Etichette noleggio e usato

Piccole, non cliccabili, accanto al nome della macchina. Dicono solo che la formula esiste.

### Blocco noleggio

Titolo, due righe sulla formula, collegamento alla landing di noleggio della famiglia. Compare solo se `disponibile_noleggio` è vero, o se la famiglia ha una landing.

### Blocco usato

Stessa forma del blocco noleggio, collegamento alla pagina usato della famiglia.

### Blocco sedi

Cinque sedi con città, indirizzo, telefono e collegamento alla scheda. Osio Sotto per prima.

### Domande frequenti

Accordion, tutte le voci chiuse all'apertura della pagina.

### Richiesta informazioni

Due varianti.

**Sulla scheda macchina**: nome, azienda, email, telefono, messaggio, più il campo "tipo di richiesta" con le voci macchina nuova, usata, a noleggio. Un campo nascosto porta il nome del modello.

**Ovunque altrove**: nome, azienda, email, telefono, messaggio. Un campo nascosto porta il titolo della pagina di provenienza.

Nel mockup si disegnano entrambe le varianti, e quella della scheda macchina con tutte e tre le voci visibili.

## D · I template

Per ogni template: indirizzo, quante istanze, e la tabella degli elementi con la loro origine, la condizione che li accende e la destinazione dei collegamenti.

### D1 · Scheda macchina

`/[famiglia]/[sottocategoria]/[modello]/` · 119 istanze · CPT `macchina`

La scheda non porta testo lungo: specifiche leggibili e collegamenti in evidenza.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Sottocategoria | Sempre | Famiglia, sottocategoria |
| 2 | Titolo | Nome macchina | Sempre | — |
| 3 | Etichetta noleggio | `disponibile_noleggio` | Solo se vero | Nessun collegamento |
| 4 | Etichetta usato | `disponibile_usata` | Solo se vero | Nessun collegamento |
| 5 | Galleria immagini | Campo galleria | Sempre | — |
| 6 | Descrizione breve | Campo testo | Sempre | — |
| 7 | Richiamo al form | — | Sempre | Al form |
| 8 | Punti di forza | Repeater, 3-5 voci | Sempre | — |
| 9 | Specifiche tecniche | Repeater etichetta + valore | Sempre | — |
| 10 | Scheda tecnica | File PDF | Solo se caricato | Scaricamento |
| 11 | Blocco noleggio | `disponibile_noleggio` | Solo se vero | `/noleggio/[famiglia]/` |
| 12 | Blocco usato | `disponibile_usata` | Solo se vero | `/usato/[famiglia]-usate/` |
| 13 | Dove si usa | Tassonomia settore, uno o più | Se almeno uno | `/settori/[settore]/` |
| 14 | Detergenti e consumabili per questa macchina | Ereditati dalla famiglia, una o più categorie | Sempre | Categorie prodotto |
| 15 | Articoli collegati | Relazione con gli articoli | Se almeno uno | Articoli |
| 16 | Macchine correlate | Stessa sottocategoria | Sempre | Altre schede |
| 17 | Form richiesta informazioni | — | Sempre | Invio |

**Una sola galleria, niente immagine principale separata.** La prima immagine della galleria fa da principale nella scheda e nelle card. Con una sola immagine caricata non compaiono le miniature.

**I prodotti non si compilano sulla macchina**: le categorie arrivano dalla famiglia, che le decide una volta per tutte le sue schede.

**Gli articoli collegati non si compilano qui**: si indicano dal lato articolo.

Settori e categorie di prodotto sono valori multipli.

**L'ordine dei blocchi** segue tre momenti: riconoscere la macchina (galleria, descrizione, punti di forza, specifiche), ottenerla (noleggio, usato, form), esplorare intorno (settori, prodotti, articoli, correlate). Le due etichette stanno in alto.

**Il form.** Un campo "tipo di richiesta" con tre voci: macchina nuova, usata, a noleggio. Nel mockup si disegnano tutte e tre. Nel sito, usato e noleggio compaiono solo quando i campi corrispondenti sono veri. Un campo nascosto porta con sé il nome del modello, così la richiesta arriva già qualificata.

**Si disegna la sola versione estesa.** Possono mancare: le miniature della galleria, la scheda tecnica, le etichette e i blocchi di noleggio e usato, i settori, gli articoli collegati, le macchine correlate. Su molte delle 119 schede ne mancherà più di uno.

**Da decidere.** La posizione del form la sceglie chi disegna il mockup; una colonna laterale che resta visibile durante lo scorrimento è l'ipotesi da provare per prima. Resta aperto se le macchine correlate si prendono in automatico dalla sottocategoria o si scelgono a mano.

### D2 · Archivio sottocategoria

`/[famiglia]/[sottocategoria]/` · 28 pagine

**Queste otto sottocategorie ricevono il testo lungo**, le altre venti il testo breve.

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

**Il titolo della pagina usa le parole della ricerca, non il nome del termine.** "Autonome" diventa "a scoppio", "Uomo a terra" diventa "a batteria", "Lavatappezzeria" diventa "moquette". Il nome del termine resta quello del catalogo.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | Famiglia |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Testo introduttivo | Contenuto della pagina | Sempre | — |
| 4 | Elenco macchine | Macchine della sottocategoria | Sempre | Schede macchina |
| 5 | Testo di approfondimento | Contenuto della pagina | Sempre | — |
| 6 | Domande frequenti | Contenuto della pagina | Sempre | — |
| 7 | Le altre sottocategorie | Termini fratelli | Sempre | Altre sottocategorie |
| 8 | Blocco noleggio | Famiglia noleggiabile | Se vero | `/noleggio/[famiglia]/` |
| 9 | Blocco usato | Esiste la pagina usato | Se vero | `/usato/[famiglia]-usate/` |
| 10 | Dove si usano | Settori delle macchine in elenco | Se almeno uno | `/settori/[settore]/` |
| 11 | Articoli collegati | Articoli delle macchine in elenco | Se almeno uno | Articoli |
| 12 | Richiesta informazioni | — | Sempre | Invio |

**Il testo di approfondimento è obbligatorio e corposo.** È il contenuto che fa posizionare la pagina, e va costruito sul cluster: sottotitoli che coprono le intenzioni di ricerca, non un paragrafo unico. Come ordine di grandezza, 400-600 parole dove c'è domanda misurabile, 200-300 dove non c'è. Sta sotto l'elenco delle macchine, non sopra: chi arriva deve vedere subito i prodotti.

**Le domande frequenti** aggiungono la coda lunga che il testo principale non copre e rispondono alle obiezioni prima della richiesta di preventivo. Nota: Google mostra i risultati arricchiti delle FAQ solo a una minoranza di siti, quindi vanno scritte per chi legge, non per il frammento in pagina.

**La card della macchina** è lo stesso componente qui, nella pagina famiglia, nelle pagine settore e nelle macchine correlate: prima immagine della galleria, nome, descrizione breve, etichette noleggio e usato quando presenti. Nient'altro.

**Niente filtri, in nessuna pagina del sito.** JetSmartFilters non entra nel progetto e le specifiche restano un repeater libero.

**Dentro la stessa famiglia le etichette delle specifiche vanno scritte uguali.**

**La struttura del testo è la stessa su tutte e 28 le pagine**, cambia solo quanto viene sviluppata. I sottotitoli sono: cosa sono, come si scelgono, dove si usano, cosa cambia tra i modelli, manutenzione. Le otto pagine con domanda forte sviluppano tutti i punti, le altre venti ne tengono due o tre.

### D3 · Pagina famiglia

`/[famiglia]/` · 6 pagine

La pagina elenca sottocategorie, non macchine.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | Home |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Testo introduttivo | Contenuto della pagina | Sempre | — |
| 4 | Elenco sottocategorie | Termini figli | Sempre | Pagine sottocategoria |
| 5 | Testo di approfondimento | Contenuto della pagina | Sempre | — |
| 6 | Domande frequenti | Contenuto della pagina | Sempre | — |
| 7 | Le più richieste | Selezione manuale, 5-6 macchine | Sempre | Schede macchina |
| 8 | Blocco noleggio | Famiglia noleggiabile | Se vero | `/noleggio/[famiglia]/` |
| 9 | Blocco usato | Esiste la pagina usato | Se vero | `/usato/[famiglia]-usate/` |
| 10 | Dove si usano | Settori | Sempre | `/settori/[settore]/` |
| 11 | Articoli collegati | Articoli sulle macchine della famiglia | Se almeno uno | Articoli |
| 12 | Le altre famiglie | — | Sempre | Altre pagine famiglia |
| 13 | Richiesta informazioni | — | Sempre | Invio |

**Il testo qui è il lavoro più pesante di tutto il sito.** Ordine di grandezza 800-1200 parole per famiglia, strutturate su sottotitoli che coprono le intenzioni di ricerca del cluster: cosa sono, come si scelgono, differenze tra i tipi, per quali ambienti, costi indicativi, cosa serve per la manutenzione. La keyword principale nel titolo, le varianti nei sottotitoli.

Il testo sta sotto l'elenco delle sottocategorie, non sopra.

**Altri macchinari fa eccezione**: testo breve, con il compito di smistare verso le sottocategorie.

**Le più richieste sta in basso**, dopo il contenuto: cinque o sei macchine per famiglia, scelte da Socaf.

### D4 · Pagina d'ingresso del noleggio

`/noleggio/` · 1 pagina

**Questa pagina non elenca macchine.** Spiega la formula — durate, cosa è incluso, assistenza, consegna — e manda alle landing di famiglia.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | Home |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Come funziona il noleggio | Contenuto della pagina | Sempre | — |
| 4 | Le formule e le durate | Contenuto della pagina | Sempre | — |
| 5 | Cosa si può noleggiare | Elenco delle famiglie a noleggio | Sempre | Landing di famiglia |
| 6 | Perché noleggiare | Contenuto della pagina | Sempre | — |
| 7 | Domande frequenti | Contenuto della pagina | Sempre | — |
| 8 | Dove ritirare e consegnare | Le cinque sedi | Sempre | `/sedi/[sede]/` |
| 9 | Articoli sul noleggio | Relazione con gli articoli | Se almeno uno | Articoli |
| 10 | Richiesta preventivo | — | Sempre | Invio |

**Gli otto articoli sul noleggio vanno collegati a questa pagina al lancio**, non dopo.

### D5 · Landing di noleggio per famiglia

`/noleggio/[famiglia]/` · 4 pagine, più due da confermare con Socaf

Una landing per famiglia, in quest'ordine di priorità:

| Landing | Prevista dall'alberatura |
| --- | --- |
| Noleggio lavapavimenti | sì |
| Noleggio idropulitrici | sì |
| Noleggio monospazzole | no — da aprire con Socaf |
| Noleggio spazzatrici | sì |
| Noleggio lavamoquette | sì, indirizzo da confermare |
| Noleggio aspiratori | no — da aprire con Socaf |

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | `/noleggio/` |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Testo introduttivo | Contenuto della pagina | Sempre | — |
| 4 | Le macchine a noleggio | Macchine della famiglia con noleggio attivo | Sempre | Schede macchina |
| 5 | Formule e durate per questa famiglia | Contenuto della pagina | Sempre | — |
| 6 | Testo di approfondimento | Contenuto della pagina | Sempre | — |
| 7 | Domande frequenti | Contenuto della pagina | Sempre | — |
| 8 | Comprare invece di noleggiare | — | Sempre | Pagina famiglia, pagina usato |
| 9 | Le altre famiglie a noleggio | — | Sempre | Altre landing |
| 10 | Dove ritirare e consegnare | Le cinque sedi | Sempre | `/sedi/[sede]/` |
| 11 | Articoli collegati | Relazione con gli articoli | Se almeno uno | Articoli |
| 12 | Richiesta preventivo | — | Sempre | Invio |

**L'elenco delle macchine è automatico**: loop sulle macchine della famiglia dove `disponibile_noleggio` è vero. Le card portano alle schede normali.

**Il blocco delle sedi è obbligatorio su queste pagine**: risponde alle ricerche di noleggio con riferimento locale.

**Testo di approfondimento**: 400-600 parole, strutturate sul cluster, sotto l'elenco delle macchine.

### D6 · Pagina d'ingresso dell'usato

`/usato/` · 1 pagina nuova

Spiega la formula: garanzia, revisione, disponibilità, supervalutazione della macchina vecchia.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | Home |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Come funziona l'usato Socaf | Contenuto della pagina | Sempre | — |
| 4 | Garanzia e revisione | Contenuto della pagina | Sempre | — |
| 5 | Cosa c'è di usato | Elenco delle cinque famiglie | Sempre | Pagine usato di famiglia |
| 6 | Hai una macchina da sostituire | — | Sempre | `/servizi/supervalutazione-dell-usato/` |
| 7 | Domande frequenti | Contenuto della pagina | Sempre | — |
| 8 | Dove vedere le macchine | Le cinque sedi | Sempre | `/sedi/[sede]/` |
| 9 | Richiesta disponibilità | — | Sempre | Invio |

### D7 · Pagine usato di famiglia

`/usato/[famiglia]-usate/` · 5 pagine, indirizzi invariati

**Gli indirizzi di queste cinque pagine non si toccano.** Sono le pagine meglio posizionate del sito.

**Altri macchinari usati va aperta con Socaf**: contiene la domanda su monospazzole e vasche lavapezzi usate, che oggi non hanno una pagina propria.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | `/usato/` |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Testo introduttivo | Contenuto della pagina | Sempre | — |
| 4 | Le macchine che si vendono usate | Macchine della famiglia con `disponibile_usata` vero | Sempre | Schede macchina |
| 5 | Garanzia e revisione | Contenuto della pagina | Sempre | — |
| 6 | Testo di approfondimento | Contenuto della pagina | Sempre | — |
| 7 | Domande frequenti | Contenuto della pagina | Sempre | — |
| 8 | Le stesse macchine nuove | — | Sempre | Pagina famiglia |
| 9 | Hai una macchina da sostituire | — | Sempre | `/servizi/supervalutazione-dell-usato/` |
| 10 | Le altre famiglie usate | — | Sempre | Altre pagine usato |
| 11 | Dove vederle | Le cinque sedi | Sempre | `/sedi/[sede]/` |
| 12 | Richiesta disponibilità | — | Sempre | Invio |

**Le 24 schede della singola macchina usata non si ricreano.** I vecchi indirizzi vanno rediretti alla pagina della famiglia corrispondente.

**L'elenco è automatico**, come sulle landing di noleggio: loop sulle macchine della famiglia dove `disponibile_usata` è vero. Dice quali modelli si vendono usati, non quali unità sono in magazzino in questo momento.

### D8 · Pagina d'ingresso dei settori

`/settori/` · 1 pagina

**Non ci si arriva né dal menu né dalla home.** Serve da atterraggio per chi arriva da fuori e da destinazione dei breadcrumbs delle sette pagine settore. Testo breve.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | Home |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Testo introduttivo | Contenuto della pagina | Sempre | — |
| 4 | I sette settori | Elenco delle pagine figlie | Sempre | Pagine settore |
| 5 | Le referenze | CPT referenza | Sempre | Schede referenza |
| 6 | Richiesta informazioni | — | Sempre | Invio |

### D9 · Pagina settore

`/settori/[settore]/` · 7 pagine

Cinque esistono e cambiano indirizzo, due sono nuove: officine e metalmeccanica, edilizia e cantieri.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | `/settori/` |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Testo introduttivo | Contenuto della pagina | Sempre | — |
| 4 | Le macchine per questo settore | Selezione manuale, 8-12 | Sempre | Schede macchina |
| 5 | I prodotti più usati | Selezione manuale di categorie | Sempre | Categorie prodotto |
| 6 | Testo di approfondimento | Contenuto della pagina | Sempre | — |
| 7 | Domande frequenti | Contenuto della pagina | Sempre | — |
| 8 | Le referenze del settore | CPT referenza con questo settore | Se almeno una | Schede referenza |
| 9 | Approfondimenti | Articoli sulle macchine di questo settore | Se almeno uno | Articoli |
| 10 | Gli altri settori | — | Sempre | Altre pagine settore |
| 11 | Richiesta informazioni | — | Sempre | Invio |

**Due meccanismi diversi, da non confondere.** La tassonomia settore assegnata alle macchine governa il verso macchina → settore: alimenta il blocco "dove si usa" della scheda, le referenze e gli articoli. La selezione manuale sulla pagina governa il verso settore → macchina: decide quali 8-12 macchine compaiono qui. I due elenchi non coincidono, ed è voluto.

**L'elenco delle macchine è una scelta, non un filtro.** Otto-dodici macchine per settore, decise da Socaf. Sono sette decisioni commerciali.

**Testo lungo su Industria e Imprese di pulizia**, 800-1200 parole. Testo breve su Retail e Logistica.

**I due settori nuovi nascono da macchine già a catalogo**: dieci vasche lavapezzi e cinque aspiratori per olio e trucioli per le officine, gli aspiratori per polveri per i cantieri. Il testo va scritto su quelle macchine.

**Da chiedere a Socaf.** Le sette selezioni di macchine e le sette di categorie prodotto. Quali settori portano più fatturato, per dare priorità alla scrittura dei testi.

### D10 · Pagina d'ingresso dei prodotti

`/prodotti-per-la-pulizia/` · 1 pagina

A differenza degli altri hub, questa pagina riceve domanda propria: circa 4.500 ricerche al mese. Va trattata come pagina di contenuto, non solo di smistamento.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | Home |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Testo introduttivo | Contenuto della pagina | Sempre | — |
| 4 | Le tredici categorie | Elenco delle pagine figlie | Sempre | Pagine categoria |
| 5 | Testo di approfondimento | Contenuto della pagina | Sempre | — |
| 6 | Domande frequenti | Contenuto della pagina | Sempre | — |
| 7 | Cataloghi da scaricare | File PDF | Sempre | Scaricamento |
| 8 | Richiesta informazioni | — | Sempre | Invio |

**Testo lungo**, 800-1200 parole.

### D11 · Pagina categoria di prodotto

`/prodotti-per-la-pulizia/[categoria]/` · 13 pagine

Sette sono nuove — cinque nascono dalla divisione dei detergenti, più igiene mani e carrelli per pulizie. Carta e dispenser unisce due pagine esistenti.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | `/prodotti-per-la-pulizia/` |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Testo introduttivo | Contenuto della pagina | Sempre | — |
| 4 | Cosa comprende | Contenuto della pagina | Sempre | — |
| 5 | Catalogo da scaricare | File PDF | Sempre | Scaricamento |
| 6 | Testo di approfondimento | Contenuto della pagina | Sempre | — |
| 7 | Domande frequenti | Contenuto della pagina | Sempre | — |
| 8 | Su quali macchine si usano | Famiglie che hanno scelto questa categoria | Se almeno una | Pagine famiglia |
| 9 | Le altre categorie | — | Sempre | Altre pagine categoria |
| 10 | Richiesta informazioni | — | Sempre | Invio |

**Non ci sono schede di prodotto sotto queste pagine.** Il blocco "cosa comprende" è un elenco testuale di tipologie, non una griglia di card. Il testo è l'unico contenuto della pagina.

**Il blocco 8 è il verso inverso della relazione famiglia → categorie**, già compilata sulle famiglie. Non si compila qui.

**Testo lungo su queste cinque categorie**, testo breve sulle altre otto:

| Categoria | Titolo costruito su |
| --- | --- |
| Panni, stracci e microfibra | stracci per pavimenti, panni in microfibra professionali |
| Igiene mani | pasta lavamani, sapone mani |
| Carrelli per pulizie | carrelli per pulizie |
| Detergenti per pavimenti e parquet | detergente pavimenti professionale, detersivo per parquet |
| Detergenti enzimatici | detergenti enzimatici |

**C'è domanda di acquisto all'ingrosso**: "detersivi ingrosso" e varianti valgono circa 1.600 ricerche al mese. Va intercettata nei testi dell'hub e delle categorie di detergenti, non con una pagina dedicata.

**Da chiedere a Socaf.** Quali cataloghi esistono oltre "Detergenti 2023" e in che versione, per riempire il blocco 5 senza pubblicare materiale vecchio.

### D12 · Articolo

`/news/[titolo]/` · 184 articoli · post nativi

**Nessuno dei 184 indirizzi cambia.**

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | `/news/` |
| 2 | Titolo | Titolo dell'articolo | Sempre | — |
| 3 | Data | Data di pubblicazione | Sempre | — |
| 4 | Immagine in evidenza | Immagine dell'articolo | Se caricata | — |
| 5 | Corpo dell'articolo | Contenuto | Sempre | — |
| 6 | Le macchine di cui parla | Relazione manuale | Se almeno una | Schede macchina |
| 7 | Dove si usano | Settori ereditati dalle macchine | Se almeno uno | Pagine settore |
| 8 | Altri articoli | Articoli recenti | Sempre | Articoli |
| 9 | Richiesta informazioni | — | Sempre | Invio |

**Niente categorie e niente tag.** Non vanno create pagine di raccolta.

**Il blocco 6 è l'unico lavoro di volume del progetto.** Il campo relazione va messo in evidenza nella schermata di modifica dell'articolo, non in fondo alla colonna laterale. Chi scrive deve trovarlo senza cercarlo.

**Il blocco 7 non si compila**: i settori arrivano dalle macchine indicate nel blocco 6.

**Ordine di lavorazione**: i venti articoli con più traffico, poi gli otto che parlano di noleggio, poi il resto.

### D13 · Archivio degli approfondimenti

`/news/` · 1 pagina · si chiama Approfondimenti, l'indirizzo resta `/news/`

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | Pagina genitore | Sempre | Home |
| 2 | Titolo | — | Sempre | — |
| 3 | Elenco articoli | Post, dal più recente | Sempre | Articoli |
| 4 | Paginazione | Numero di articoli | Sempre | Altre pagine dell'elenco |
| 5 | Richiesta informazioni | — | Sempre | Invio |

**La card dell'articolo** è un componente riusato qui, sulla scheda macchina, sulle pagine settore e sulle pagine di catalogo: immagine, titolo, data, prime righe.

**Nessun filtro e nessuna barra di categorie.**

### D14 · Scheda sede

`/sedi/[sede]/` · 5 schede · CPT `sede`

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | — | Sempre | `/contatti/` |
| 2 | Nome della sede | Campo | Sempre | — |
| 3 | Indirizzo completo | Campi separati | Sempre | — |
| 4 | Telefono ed email | Campi | Sempre | Chiamata, invio |
| 5 | Orari | Repeater giorno + fascia | Sempre | — |
| 6 | Referente | Campo | Se compilato | — |
| 7 | Mappa | Coordinate | Sempre | — |
| 8 | Cosa si fa in questa sede | Campo testo | Sempre | — |
| 9 | Foto | Galleria | Se caricata | — |
| 10 | Le altre sedi | CPT sede | Sempre | Altre schede sede |
| 11 | Richiesta informazioni | — | Sempre | Invio |

**Indirizzo, telefono, orari e coordinate stanno in campi separati**, mai dentro un blocco di testo: gli stessi campi alimentano la pagina e i dati strutturati.

**`/sedi/` non è una pagina**: archivio del CPT disattivato.

**Osio Sotto è la sede principale** e va marcata come tale.

### D15 · Contatti

`/contatti/` · 1 pagina

Diventa l'elenco delle cinque sedi.

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Breadcrumbs | — | Sempre | Home |
| 2 | Titolo | Contenuto della pagina | Sempre | — |
| 3 | Recapiti principali | Sede di Osio Sotto | Sempre | Chiamata, invio |
| 4 | Le cinque sedi | CPT sede | Sempre | Schede sede |
| 5 | Mappa con tutte le sedi | Coordinate | Sempre | Schede sede |
| 6 | Form di contatto | — | Sempre | Invio |

**Le schede sede non entrano nel menu**: si raggiungono da qui e dal piè di pagina.

### D16 · Home

`/` · 1 pagina

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Apertura con ricerca | — | Sempre | Pagina dei risultati |
| 2 | Le sei famiglie | Termini di primo livello | Sempre | Pagine famiglia |
| 3 | Noleggio e usato | — | Sempre | `/noleggio/`, `/usato/` |
| 4 | I settori | Pagine settore | Sempre | Pagine settore |
| 5 | Prodotti per la pulizia | — | Sempre | `/prodotti-per-la-pulizia/` |
| 6 | Aquarial e Caldofacile | — | Sempre | Siti dei due marchi |
| 7 | Le cinque sedi | CPT sede | Sempre | Schede sede |
| 8 | Richiesta informazioni | — | Sempre | Invio |

**Il blocco 6 porta direttamente ai siti di Aquarial e Caldofacile**, in una scheda nuova. Le due pagine ponte di socaf.it vengono eliminate.

**Servizi, referenze e articoli recenti restano fuori dalla home.** Si raggiungono dal menu e dal piè di pagina.

**Da decidere: il peso relativo di noleggio e usato** dentro il blocco 3, e se il blocco va prima o dopo le famiglie.

### D17 · Risultati di ricerca

`/?s=` · 1 template

| # | Elemento | Dipende da | Quando appare | Dove porta |
| --- | --- | --- | --- | --- |
| 1 | Campo di ricerca con il termine cercato | Query | Sempre | — |
| 2 | Risultati macchine | CPT macchina | Se almeno uno | Schede macchina |
| 3 | Risultati pagine | Pagine | Se almeno uno | Pagine |
| 4 | Risultati articoli | Post | Se almeno uno | Articoli |
| 5 | Nessun risultato | — | Se zero risultati | Famiglie, contatti |

**Le macchine vengono per prime**, raggruppate per tipo di contenuto.

**Lo stato "nessun risultato" va disegnato**: elenco delle sei famiglie e collegamento ai contatti.

**La pagina dei risultati non va indicizzata.**

### D18 · Note sulle pagine restanti

Servizi, azienda, referenze e pagine ponte hanno tutte la stessa forma: breadcrumbs, titolo, testo, eventuali collegamenti al catalogo, richiesta di contatto.

| Pagina | Note |
| --- | --- |
| `/servizi/` e le 4 pagine servizio | Noleggio e usato escono da qui |
| `/servizi/supervalutazione-dell-usato/` | Collegamento reciproco con `/usato/` |
| `/azienda/` e le 4 pagine istituzionali | Chi siamo assorbe Aziende, Lavora con noi assorbe Careers |
| `/azienda/referenze/` | Elenco delle 7 schede |
| `/azienda/referenze/[cliente]/` | CPT `referenza` con campo settore: alimenta le pagine settore |

**Le pagine di riscaldamento industriale e raffrescamento evaporativo non si fanno.** I due marchi si raggiungono dal blocco in home e dal piè di pagina, direttamente sui loro siti.

### D19 · Header, menu e piè di pagina

Definiti in Fase 4. Il mockup li riprende senza modifiche.

**Riga di servizio**, sopra la barra: Pronto intervento, Approfondimenti, Cerca.

**Barra principale**: logo, sei voci, numero verde a destra come unico elemento in evidenza.

| Voce | Comportamento | Contenuto |
| --- | --- | --- |
| Macchine | Tendina, nessuna pagina propria | Le sei famiglie |
| Noleggio | Voce semplice | `/noleggio/` |
| Settori | Tendina, nessuna pagina nel menu | I sette settori |
| Prodotti per la pulizia | Voce semplice | `/prodotti-per-la-pulizia/` |
| Servizi | Tendina, nessuna pagina propria | Pronto intervento, consulenza tecnica, soluzioni finanziarie, usato, supervalutazione |
| Azienda | Tendina, nessuna pagina propria | Chi siamo, innovazione, impegno, referenze, lavora con noi, contatti |

**Le 28 sottocategorie non entrano nel menu.** Si raggiungono dalla pagina di famiglia.

**Il numero verde è la chiamata all'azione principale del sito**, su ogni pagina.

**Su telefono** il menu si apre a fisarmonica. Noleggio e numero verde restano fissi in alto. Nessun pannello a colonne.

**Piè di pagina**: le cinque sedi, i collegamenti ad Aquarial e Caldofacile, le pagine legali, i recapiti.

## E · Stati ed eccezioni

**Regola generale: un blocco senza dati non si mostra vuoto, sparisce.** Nessun "nessun elemento da mostrare" dentro le pagine. L'unica eccezione è la pagina dei risultati di ricerca, che ha uno stato vuoto disegnato.

### Casi da disegnare

| Situazione | Cosa succede |
| --- | --- |
| Macchina senza scheda tecnica | Il blocco del PDF non compare |
| Macchina con una sola immagine | Nessuna miniatura sotto l'immagine |
| Macchina senza settori assegnati | Il blocco "dove si usa" non compare |
| Macchina né a noleggio né usata | Etichette e blocchi non compaiono |
| Macchina senza articoli collegati | Il blocco non compare. È il caso della maggior parte delle schede al lancio |
| Sottocategoria con una sola macchina | L'elenco resta, le macchine correlate non compaiono |
| Famiglia senza noleggio | Il blocco non compare su nessuna delle sue pagine |
| Landing noleggio senza macchine attive | La landing non va creata |
| Famiglia senza macchine marcate usate | La pagina usato di quella famiglia non va creata |
| Settore senza referenze | Il blocco non compare |
| Ogni categoria prodotto ha un catalogo | Il blocco c'è sempre |
| Articolo senza immagine in evidenza | La card resta della stessa altezza delle altre |
| Sede senza foto o senza referente | I blocchi non compaiono |
| Ricerca senza risultati | Stato vuoto disegnato: le sei famiglie e i contatti |

### Limiti di quantità

Gli elenchi automatici vanno limitati, altrimenti una macchina molto trattata trascina venti articoli in fondo alla scheda.

| Elenco | Massimo |
| --- | --- |
| Macchine correlate | 4 |
| Articoli collegati su scheda macchina | 3 |
| Articoli collegati su pagine di catalogo e settore | 3 |
| Referenze su pagina settore | 3 |
| Articoli per pagina nell'archivio news | 12 |
| Macchine negli elenchi di sottocategoria | Tutte |

### Come disegnare

**Si disegna sempre la versione piena**, con tutti i campi compilati. Gli elementi che possono mancare stanno nella tabella qui sopra e nella colonna "quando appare" di ogni template: chi disegna li tratta come blocchi che spariscono, non come blocchi da svuotare.
