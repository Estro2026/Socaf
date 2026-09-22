# Socaf — Stima di sviluppo WordPress

Stima dello sviluppo del nuovo sito a partire da questo wireframe.
Stack: WordPress · ACF Pro · Elementor Pro · JetEngine · The SEO Framework · Code Snippets.

**Non include** scrittura testi, copywriting, fotografia, video, selezioni commerciali di Socaf,
associazioni editoriali degli articoli, caricamenti manuali massivi, e-commerce futuro.
Vedi §Fuori perimetro.

---

## Riepilogo

| # | Area | Template coinvolti | Ore | Complessità |
| --- | --- | --- | --- | --- |
| 1 | Fondamenta WordPress, ACF, CPT, tassonomie, permalink | — | **20** | Alta |
| 2 | D19 + componenti globali: header, footer, menu, breadcrumbs, ricerca, form | D19 | **24** | Media |
| 3 | Componenti dinamici riutilizzabili: card, listing, FAQ, noleggio, usato, sedi | tutti | **20** | Media |
| 4 | Scheda macchina | D1 | **14** | Alta |
| 5 | Archivio sottocategoria | D2 | **10** | Media |
| 6 | Pagina famiglia | D3 | **10** | Media |
| 7 | Noleggio | D4 + D5 | **12** | Media |
| 8 | Usato | D6 + D7 | **10** | Bassa |
| 9 | Settori | D8 + D9 | **12** | Media |
| 10 | Prodotti per la pulizia | D10 + D11 | **12** | Bassa |
| 11 | Articolo | D12 | **6** | Media |
| 12 | Archivio Approfondimenti | D13 | **6** | Bassa |
| 13 | Scheda sede | D14 | **6** | Bassa |
| 14 | Contatti | D15 | **6** | Bassa |
| 15 | Home | D16 | **10** | Media |
| 16 | Risultati di ricerca | D17 | **8** | Media |
| 17 | Pagine istituzionali, servizi, referenze | D18 | **10** | Bassa |
| 18 | Responsive, accessibilità, cross-browser, QA | tutti | **20** | Media |
| 19 | SEO tecnico, redirect, performance, QA tecnico | tutti | **12** | Alta |

**PREVISIONE: 228 h** · **BUFFER: 12 h** · **MASSIMO: 240 h**

---

## Dettaglio per area

### 1 · Fondamenta — 20 h · complessità alta

**Cosa comprende**
Installazione e configurazione, registrazione da ACF Pro di 3 CPT (`macchina`, `sede`, `referenza`)
e 2 tassonomie (`famiglia` gerarchica, `settore` non gerarchica), definizione di tutti i gruppi di campi,
relazioni bidirezionali, struttura dei permalink, creazione dell'alberatura delle ~34 pagine di catalogo
con la gerarchia corretta, ambiente di staging.

**Dipendenze**: nessuna. È il primo blocco e blocca tutto il resto.

**Rischi**
- ⚠ **Il punto più delicato dell'intero progetto** è la convivenza tra la tassonomia `famiglia`
  con URL gerarchici a base vuota e le 34 pagine che devono occupare gli stessi indirizzi.
  Archivi spenti + permalink verificati a uno a uno.
- ⚠ La tassonomia a base vuota può entrare in conflitto con gli slug delle pagine di primo livello
  (`/noleggio/`, `/usato/`, `/settori/`, `/servizi/`, `/azienda/`, `/contatti/`, `/news/`).
  **Da testare prima di popolare.**
- ⚠ Gli slug dell'usato cambiano genere (`-usate` / `-usati`): serve una mappa esplicita, non una regola.

**Cosa può far salire le ore**
Conflitti di rewrite non previsti; una migrazione dei contenuti dall'attuale Ghost più complessa
del previsto (il sito oggi non è WordPress: i 184 articoli e le 119 schede vanno importati).
**L'import dei contenuti non è in questa stima** — vedi §Fuori perimetro.

---

### 2 · D19 + componenti globali — 24 h · complessità media

**Cosa comprende**
Header (6 h) · footer (3 h) · riga di servizio (1,5 h) · menu desktop (2 h) · menu mobile (2 h) ·
numero verde (0,5 h) · breadcrumbs con le due eccezioni (2 h) · ricerca come componente (1,5 h) ·
i due form come modelli globali (4 h) · impostazione dei breakpoint e prima passata responsive (1,5 h).

**Componenti riutilizzati da qui in poi**: header, footer, breadcrumbs, form generico, form macchina, ricerca.

**Dipendenze**: area 1.

**Rischi**
- ⚠ Il breakpoint Tablet di Elementor (1024) va verificato anche a **1100 px**: con sei voci lunghe
  la barra orizzontale rischia di andare a capo prima del breakpoint.
- Le due eccezioni dei breadcrumbs (D14 → Contatti, D12 → Approfondimenti) richiedono un filtro PHP.

**Cosa può far salire le ore**
Un mega-menu con immagini o contenuti dinamici: **+4–6 h e QA aggiuntiva**. È escluso dal documento F4
e non va introdotto. Un overlay di ricerca animato al posto del link semplice: +2 h senza beneficio misurabile.

---

### 3 · Componenti dinamici riutilizzabili — 20 h · complessità media

**Cosa comprende**
Card macchina (3 h) · card sottocategoria (1,5 h) · card articolo (1,5 h) · etichette noleggio e usato (1 h) ·
blocco noleggio e blocco usato (2 h) · blocco sedi (1,5 h) · accordion FAQ (1 h) ·
blocco « garanzia e revisione » (1 h) · blocco « supervalutazione » (0,5 h) ·
Code Snippets #1–#5 e #8–#9 (5 h) · impostazione della struttura dei Listing Grid JetEngine (2 h).

**Perché vale 20 h e non meno**
Questi componenti compaiono su 15 template. Farli bene una volta è quello che tiene D1–D18
a 10–14 h l'uno invece di 20. **È l'investimento che rende il budget possibile.**

**Dipendenze**: aree 1 e 2.

**Rischi**
- ⚠ **Ogni variante grafica dello stesso componente moltiplica la manutenzione.**
  Una card macchina, non tre. Il wireframe è stato costruito apposta con un solo disegno per componente.
- I transient di cache sugli snippet #5 e #6 non sono opzionali: sono le query più costose del sito.

**Cosa può far salire le ore**
Richieste di card differenziate per contesto ("sulla pagina settore la card potrebbe mostrare anche…"):
ogni variante è +1,5 h di sviluppo e +1 h di QA responsive.

---

### 4 · D1 — Scheda macchina — 14 h · complessità alta

**Cosa comprende**
Single template (3 h) · punti di forza (1 h) · specifiche tecniche con scroll responsive (1,5 h) ·
PDF condizionale (0,5 h) · blocchi noleggio/usato (1,5 h) · dove si usa (1 h) ·
detergenti ereditati dalla famiglia (1,5 h) · articoli collegati (1 h) · macchine correlate (1 h) ·
form con le tre opzioni condizionali (2 h) · SEO e dati strutturati (1 h).

**Componenti riutilizzati**: card macchina, card articolo, etichette, blocchi noleggio/usato,
breadcrumbs, form macchina.

**Dipendenze**: aree 1, 2, 3.

**Rischi**
- ⚠ **Sei blocchi condizionali su diciassette.** Il test su una scheda « povera » è obbligatorio:
  su molte delle 119 schede mancherà più di un blocco.
- Il blocco 14 (detergenti ereditati) dipende da **6 decisioni commerciali di Socaf** non ancora prese:
  senza, resta vuoto su tutte e 119 le schede.

**Cosa può far salire le ore**
Se OP-05 si chiude su « macchine correlate scelte a mano »: 0 h di sviluppo in più, ma 119 compilazioni
di data entry fuori perimetro. Se il form deve instradare le email in modo diverso per famiglia: +1,5 h.

---

### 5 · D2 — Archivio sottocategoria — 10 h · media

Template di pagina (1,5 h) · elenco macchine (1,5 h) · FAQ (riusata) · sottocategorie fratelli (0,5 h) ·
dove si usano (1 h) · articoli collegati di secondo grado (1,5 h) · impostazione delle 28 pagine (3 h) ·
responsive e QA (1 h).

**Componenti riutilizzati**: card macchina, card articolo, FAQ, blocchi noleggio/usato, form.

**Rischi**: la query degli articoli di secondo grado è la più costosa del sito — cache obbligatoria.

**Cosa può far salire le ore**: se si volesse un elenco paginato o ordinabile. **Non previsto e da evitare:
niente filtri in nessuna pagina del sito.**

---

### 6 · D3 — Pagina famiglia — 10 h · media

Template (1,5 h) · **listing su termini** per le card sottocategoria (1,5 h) · le più richieste (0,5 h) ·
dove si usano + articoli (riusati) · le altre famiglie (0,5 h) · impostazione delle 6 pagine (2 h) ·
campi sui termini, 34 termini (2 h) · responsive e QA (2 h).

**Rischi**: il loop su termini è meno immediato del loop su post in JetEngine.
Le 6 selezioni « le più richieste » sono decisioni di Socaf.

---

### 7 · D4 + D5 — Noleggio — 12 h · media

D4 (2 h) · come funziona a 4 colonne (1 h) · tabella formule (0,5 h) · cosa si può noleggiare (0,5 h) ·
articoli sul noleggio (0,5 h) · D5 template (2,5 h) · listing automatico con `include_children` (1 h) ·
comprare invece di noleggiare (0,5 h) · impostazione delle 4 landing (2,5 h) · responsive e QA (1 h).

**Rischi**
- ⚠ La `tax_query` deve includere i termini discendenti: le macchine sono sulle sottocategorie.
- ⚠ Il blocco sedi su D5 **non è rimovibile**: è un requisito SEO locale.
- OP-02 e OP-03 aperti. **Se Socaf conferma monospazzole e aspiratori: +2 landing, +2 h.**
  Non è nel budget e non va fatto con il buffer.

---

### 8 · D6 + D7 — Usato — 10 h · bassa

D6 (2 h) · garanzia e revisione come modello globale (1 h) · le 5 famiglie (0,5 h) ·
supervalutazione (0,5 h) · D7 template (2 h) · listing duplicato da D5 con flag diverso (0,5 h) ·
impostazione delle 5 pagine (2 h) · responsive e QA (1,5 h).

**Perché costa meno di D5 a parità di struttura**: il listing si duplica da D5 cambiando la meta query,
e i blocchi « garanzia » e « supervalutazione » sono condivisi tra D6 e D7.

**Rischi**
- ⚠ **Gli indirizzi non si toccano**: sono le pagine meglio posizionate del sito.
- ⚠ Il testo va **aggiunto**, non sostituito: verificare che il contenuto che le posiziona resti.
- I 24 redirect delle schede usate sono contabilizzati nell'area 19.

---

### 9 · D8 + D9 — Settori — 12 h · media

D8 (2 h) · elenco dei 7 settori (0,5 h) · referenze su D8 (0,5 h) · D9 template (3 h) ·
selezione manuale 8–12 macchine (1,5 h) · prodotti più usati (0,5 h) · referenze di settore (1 h) ·
approfondimenti di secondo grado (1 h) · impostazione delle 7 pagine (1 h) · responsive e QA (1 h).

**Rischi**
- ⚠ **Due meccanismi diversi da non confondere** (macchina→settore automatico,
  settore→macchina manuale). Un errore qui produce elenchi sbagliati su 7 pagine.
- 14 decisioni commerciali di Socaf ancora aperte (OP-09).
- 6 redirect nel piano di migrazione.

---

### 10 · D10 + D11 — Prodotti — 12 h · bassa

D10 (3 h) · le 13 card (1 h) · cataloghi repeater (0,5 h) · D11 template (2,5 h) ·
cosa comprende (0,5 h) · **verso inverso famiglia → categoria con hook `acf/save_post`** (1,5 h) ·
impostazione delle 13 pagine (2 h) · responsive e QA (1 h).

**Rischi**
- ⚠ Il verso inverso della relazione sui **termini** non è nativo in ACF: serve un campo speculare
  mantenuto da un hook. Una `meta_query LIKE` su campo serializzato funziona ma è fragile.
- ⚠ **Rischio di scope creep**: « già che ci siamo, mettiamo i prodotti ». L'e-commerce è una fase separata.
  Aggiungere anche solo schede prodotto statiche significherebbe un CPT, un template e centinaia
  di caricamenti: **decine di ore fuori budget.**

---

### 11 · D12 — Articolo — 6 h · media

Single template (3 h) · campo relazione in evidenza nell'editor (0,5 h) ·
snippet che propone i modelli citati nel testo (2 h) · settori ereditati e altri articoli (0,5 h).

**Perché lo snippet #10 vale le sue 2 h**: risparmia decine di ore redazionali su 184 articoli.
È l'unico caso in cui il PHP su misura è chiaramente conveniente.

**Rischi**: nessuno tecnico. Il rischio è organizzativo: se il campo non è in evidenza nell'editor,
le 184 compilazioni non vengono fatte.

---

### 12 · D13 — Archivio — 6 h · bassa

Archive template (2 h) · card articolo con altezza costante senza immagine (1 h) ·
paginazione (0,5 h) · form e SEO (1 h) · responsive e QA (1,5 h).

**Rischio**: ⚠ verificare il numero attuale di articoli per pagina prima di fissare 12,
per non spostare gli articoli tra le pagine della paginazione già indicizzata.

---

### 13 · D14 — Sede — 6 h · bassa

Single template (3 h) · orari repeater (0,5 h) · mappa con lazy load dietro consenso (1 h) ·
galleria condizionale (0,5 h) · dati strutturati `LocalBusiness` (1 h).

**Rischi**: le tre ragioni sociali diverse (Socaf, Bottoni, Tecno Clean) vanno gestite nei dati strutturati.
Instradamento delle email per sede: client task aperto.

---

### 14 · D15 — Contatti — 6 h · bassa

Pagina (1,5 h) · recapiti letti dinamicamente dalla sede principale (1 h) ·
mappa multi-sede (1,5 h) · form con doppio consenso (1,5 h) · responsive e QA (0,5 h).

---

### 15 · D16 — Home — 10 h · media

Apertura con ricerca (2 h) · le 6 famiglie (1 h) · noleggio e usato (1 h) · settori (0,5 h) ·
prodotti (0,5 h) · Aquarial e Caldofacile (0,5 h) · sedi (riusato) · form (riusato) ·
responsive e QA accurate (3 h) · performance (1,5 h).

**Perché il responsive costa più che altrove**: è la pagina più vista, su tutti i dispositivi.

**Rischi**
- ⚠ **Il rischio principale della home è l'aggiunta di blocchi.** Ogni sezione in più è 2–4 h
  di sviluppo, QA responsive e manutenzione. Il brief prevede otto blocchi: sono otto.
- OP-07 aperto (peso e posizione del blocco 3): entrambe le alternative valgono circa 1 h.

---

### 16 · D17 — Ricerca — 8 h · media

Search Results template (1,5 h) · tre query separate per tipo di contenuto (2 h) ·
risultati pagine in formato elenco (0,5 h) · **stato vuoto disegnato** (1 h) ·
snippet per includere `descrizione_breve` (0,5 h) · SEO `noindex` (0,5 h) · responsive e QA (2 h).

**Rischi**
- ⚠ Il CPT `macchina` deve avere `exclude_from_search = false`, altrimenti i risultati principali
  del sito non compaiono.
- **Rischio di scope creep**: autocomplete, ricerca live, plugin di ricerca avanzata.
  Sono 6–10 h che il budget non ha. Su 147 pagine la ricerca nativa, con lo snippet #9, basta.

---

### 17 · D18 — Pagine istituzionali — 10 h · bassa

Template di pagina di testo (3 h) · due pagine di elenco (2 h) · elenco referenze (1,5 h) ·
Single referenza (2 h) · impostazione delle 9 pagine di testo (1,5 h).

**Rischi**: il CPT `referenza` con rewrite annidato sotto `/azienda/referenze/` e archivio spento
è la stessa insidia delle tassonomie. OP-01 aperto.

---

### 18 · Responsive, accessibilità, cross-browser, QA — 20 h · media

Passata responsive su tutti i template a 1440 / 1024 / 768 / 390 (8 h) ·
**test degli stati condizionali** secondo la checklist di `dev-notes.md` (5 h) ·
accessibilità: contrasti, focus, `aria`, navigazione da tastiera (3 h) ·
cross-browser Chrome/Firefox/Safari/Edge, iOS e Android (3 h) · correzioni (1 h).

**Perché non si può comprimere**: il sito ha **decine di blocchi condizionali**. Testare solo la
versione piena significa scoprire in produzione che una scheda povera mostra cinque blocchi vuoti.

---

### 19 · SEO tecnico, redirect, performance — 12 h · alta

Configurazione The SEO Framework e title template (2 h) · sitemap e canonici (1 h) ·
**~57 redirect 301** (3 h) · dati strutturati (2 h) · verifica che le 5 pagine usato mantengano
il posizionamento (1 h) · Core Web Vitals su home e D1 (2 h) · QA tecnico finale (1 h).

**Rischi**
- ⚠ **Il piano redirect è la parte più rischiosa della migrazione.** Un errore sulle 5 pagine usato
  o sui 184 articoli costa traffico reale, non teorico.
- ⚠ Le due citazioni più autorevoli che Socaf possiede da altri siti puntano a **due articoli**:
  quei due indirizzi non possono rompersi.

---

## Riepilogo dei componenti riutilizzati

| Componente | Definito in | Riusato in | Ore risparmiate (stima) |
| --- | --- | --- | --- |
| Card macchina | area 3 | D1, D2, D3, D5, D7, D9, D17 | ~9 h |
| Card articolo | area 3 | D1, D2, D3, D5, D9, D12, D13 | ~6 h |
| Card categoria/sottocategoria | area 3 | D3, D8, D10, D11, D18 | ~4 h |
| Blocchi noleggio e usato | area 3 | D1, D2, D3 | ~3 h |
| Blocco sedi | area 3 | D4, D5, D6, D7, D15, D16 | ~7 h |
| FAQ | area 3 | D2, D3, D4, D5, D6, D7, D9, D10, D11 | ~8 h |
| Form generico | area 2 | 16 template | ~15 h |
| Breadcrumbs | area 2 | 17 template | ~8 h |
| « Garanzia e revisione » | area 3 | D6, D7 | ~1 h |
| Snippet settori/articoli di secondo grado | area 3 | D2, D3, D5, D9, D12 | ~5 h |

**Senza questa disciplina il progetto costerebbe circa 60–70 ore in più** e uscirebbe dal budget.

---

## Dipendenze — ordine di esecuzione consigliato

```
1 Fondamenta
      ↓
2 D19 + globali ──→ 3 Componenti riutilizzabili
                          ↓
                    4 D1 ─→ 5 D2 ─→ 6 D3      (approvazione cliente sui tre)
                          ↓
              7 D4+D5 · 8 D6+D7 · 9 D8+D9 · 10 D10+D11   (parallelizzabili)
                          ↓
              11 D12 · 12 D13 · 13 D14 · 14 D15 · 17 D18
                          ↓
                    15 D16 · 16 D17
                          ↓
                 18 QA ─→ 19 SEO tecnico
```

D1, D2 e D3 vanno **approvati dal cliente** prima di procedere: definiscono quasi tutti i componenti,
e una modifica ai componenti dopo l'area 10 si propaga su quindici template.

---

## Cosa potrebbe far aumentare le ore

| Fattore | Impatto | Come si evita |
| --- | --- | --- |
| Filtri di catalogo / JetSmartFilters | **+25–40 h** | Esclusi dal brief. Non introdurli. |
| E-commerce, anche solo « le schede prodotto » | **+60 h e oltre** | Fase separata |
| Mega-menu con immagini | +4–6 h | F4 lo esclude |
| Varianti della card macchina per contesto | +1,5 h ciascuna | Una card, sempre la stessa |
| Ricerca con autocomplete / plugin dedicato | +6–10 h | Ricerca nativa + snippet #9 |
| Widget Elementor su misura | +8 h ciascuno | Se serve un widget custom, si semplifica la resa |
| Animazioni, parallax, librerie di motion | +10 h e QA | Esclusi |
| Blocchi aggiunti alla home | +2–4 h ciascuno | La home ha otto blocchi |
| Landing noleggio monospazzole e aspiratori (OP-03) | +2 h | Solo se Socaf le apre — **non con il buffer** |
| Conflitti di rewrite non previsti | +4–8 h | Test in staging prima di popolare |
| Import da Ghost più complesso del previsto | **fuori stima** | Vedi §Fuori perimetro |

**Se una soluzione porta il progetto oltre il budget: si semplifica l'implementazione.**
Non si eliminano pagine, contenuti obbligatori, relazioni o requisiti SEO.
Si riducono personalizzazioni, effetti, codice su misura, varianti e complessità delle interazioni.

---

## Il buffer

**12 h.** Serve a coprire imprevisti tecnici: conflitti di rewrite, comportamenti inattesi di
JetEngine su query annidate, correzioni emerse in QA, un browser che si comporta diversamente.

**Il buffer non va usato per introdurre funzionalità nuove.** Se una richiesta nuova arriva a progetto
avviato, va quotata a parte, non assorbita.

---

## Fuori perimetro — da non far sparire

Attività necessarie al lancio che **non sono sviluppo** e non rientrano nelle 240 h.

| Marcatura | Attività | Volume indicativo |
| --- | --- | --- |
| SEO TASK | Testi delle 6 pagine famiglia | 5 × 800–1200 parole + 1 breve |
| SEO TASK | Testi delle 28 sottocategorie | 8 × 400–600 + 20 × 200–300 parole |
| SEO TASK | Testi dei 7 settori | 2 lunghi, 2 brevi, 3 medi |
| SEO TASK | Testi di D4, D6, 4 × D5, 5 × D7 | ~11 pagine |
| SEO TASK | Testi di D10 e delle 13 categorie | 1 lungo + 5 lunghi + 8 brevi |
| SEO TASK | FAQ di tutte le pagine di catalogo, noleggio, usato, settori, prodotti | ~60 set da 4–5 domande |
| CONTENT TASK | Fotografia delle 5 sedi | 5 servizi |
| CONTENT TASK | Fotografia « human style » secondo la Visual Identity | — |
| CONTENT TASK | Immagini di famiglie, sottocategorie, settori e categorie prodotto | ~55 immagini |
| CLIENT TASK | 7 selezioni di macchine per settore (8–12 ciascuna) | 7 decisioni |
| CLIENT TASK | 7 selezioni di categorie prodotto per settore | 7 decisioni |
| CLIENT TASK | 6 selezioni famiglia → categorie prodotto | 6 decisioni |
| CLIENT TASK | 6 selezioni « le più richieste » (5–6 macchine) | 6 decisioni |
| CLIENT TASK | Orari, coordinate, referenti e testo delle 5 sedi | 5 schede |
| CLIENT TASK | Formule e durate del noleggio, perimetro di « cosa è incluso » | — |
| CLIENT TASK | Cataloghi PDF esistenti e loro versione (OP-08) | — |
| CLIENT TASK | Chiusura di OP-01, OP-02, OP-03, OP-04, OP-05, OP-07, OP-11 | 7 decisioni |
| DATA ENTRY | Relazione articolo → macchina su 184 articoli | 8 + 20 + 156, a scaglioni |
| DATA ENTRY | `disponibile_noleggio` e `disponibile_usata` su 119 schede | 238 flag |
| DATA ENTRY | Tassonomia settore su 119 schede | 119 assegnazioni |
| DATA ENTRY | Compilazione delle 119 schede: gallerie, punti di forza, specifiche, PDF | 119 schede |
| **DA QUOTARE** | **Import dei contenuti dall'attuale sito Ghost** verso WordPress (184 articoli, 119 schede, ~30 pagine) | **non stimato qui** |
| FASE FUTURA | E-commerce | fuori progetto |

⚠ **L'import dei contenuti merita attenzione**: il sito attuale è su Ghost con contenuti da un headless CMS,
non su WordPress. La migrazione dei 184 articoli e delle 119 schede non è un'esportazione nativa.
**Va quotata separatamente** prima di fissare la data di lancio.

---

## PREVISIONE

```
PREVISIONE     228 h
BUFFER          12 h
────────────────────
MASSIMO        240 h
```
