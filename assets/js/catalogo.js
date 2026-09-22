/* ==========================================================================
   Socaf — Catalogo reale, estratto da socaf.it (sitemap + pagine di categoria)
   Serve a far vedere OGNI sottocategoria e OGNI famiglia con i suoi prodotti
   veri, invece di un unico esempio ripetuto.

   Cosa è REALE qui: slug, nomi dei modelli, descrizioni brevi, conteggi,
   titoli e testi introduttivi delle pagine esistenti.
   Cosa è SEGNAPOSTO: i flag `disponibile_noleggio` / `disponibile_usata` sulle
   singole macchine (sono un DATA ENTRY di 238 valori che Socaf deve ancora
   fare) e le immagini, tranne quelle della LA 511-40 BT.

   Nota di allineamento: le pagine di categoria di socaf.it linkano 116 delle
   119 schede dichiarate dall'alberatura. Le 3 mancanti non sono raggiungibili
   dai listati (vedi docs/open-points.md, OP-15).
   ========================================================================== */
(function () {
  'use strict';

  /* --------------------------------------------------------- Famiglie --- */
  var FAMIGLIE = {
    'lavapavimenti': {
      nome: 'Lavapavimenti',
      h1: 'Lavapavimenti professionali e lavasciuga industriali',
      kw: 'lavapavimenti professionali · 4.400 ricerche/mese',
      intro: 'Le lavapavimenti industriali Socaf sono macchine professionali progettate per l\'uso su grandi superfici, come magazzini, fabbriche, centri commerciali e altri ambienti industriali. Sono silenziose, efficaci e veloci: aspirano i liquidi e lasciano il pavimento asciutto e pulito in una sola passata.',
      schede: 24, noleggio: true, usato: 'lavapavimenti-usate', testoLungo: true
    },
    'spazzatrici': {
      nome: 'Spazzatrici',
      h1: 'Spazzatrici industriali e motoscope professionali',
      kw: 'spazzatrice · 1.300 ricerche/mese',
      intro: 'Le spazzatrici Socaf raccolgono polveri, detriti e rifiuti da superfici interne ed esterne, in una sola passata e senza sollevare polvere. Dalla motoscopa a spinta alle spazzatrici stradali.',
      schede: 19, noleggio: true, usato: 'spazzatrici-usate', testoLungo: true
    },
    'idropulitrici': {
      nome: 'Idropulitrici',
      h1: 'Idropulitrici professionali ad acqua calda e fredda',
      kw: 'idropulitrici professionali · 590 ricerche/mese',
      intro: 'Le idropulitrici Socaf rimuovono sporco tenace, grasso e incrostazioni da ogni superficie. Acqua fredda o calda, elettriche o autonome a scoppio, mobili o installate a parete.',
      schede: 17, noleggio: true, usato: 'idropulitrici-usate', testoLungo: true
    },
    'aspiratori': {
      nome: 'Aspiratori',
      h1: 'Aspiratori industriali e aspiraliquidi professionali',
      kw: 'aspirapolvere industriale · 1.600 ricerche/mese',
      intro: 'Aspiratori professionali e industriali per polveri, liquidi, olio e trucioli, fino alle versioni certificate ATEX per le aree a rischio esplosione.',
      schede: 25, noleggio: false, usato: 'aspiratori-usati', testoLungo: true
    },
    'robot': {
      nome: 'Robot',
      h1: 'Robot lavapavimenti e robot spazzatrici industriali',
      kw: 'robot lavapavimenti · 390 ricerche/mese',
      intro: 'Macchine autonome che lavano o spazzano senza operatore a bordo, programmabili e integrabili nei processi di pulizia industriale.',
      schede: 4, noleggio: false, usato: false, testoLungo: true
    },
    'altri-macchinari': {
      nome: 'Altri macchinari',
      h1: 'Altri macchinari per la pulizia professionale',
      kw: 'smistamento verso le 8 sottocategorie',
      intro: 'Vasche lavapezzi, generatori di vapore, lavamoquette, monospazzole, purificatori d\'aria e altre macchine per esigenze specifiche.',
      schede: 30, noleggio: false, usato: 'altri-macchinari-usati', testoLungo: false
    }
  };

  /* --------------------------------------------------- Sottocategorie ---
     `h1` è il titolo costruito sulle parole della ricerca quando il Brief
     mockup lo prescrive; `nome` resta il termine di catalogo.
     `lungo: true` = una delle 8 pagine con testo 400–600 parole.          */
  var SOTTO = {
    'lavapavimenti/lavapavimenti-piccole':      { fam:'lavapavimenti', nome:'Piccole', h1:'Lavapavimenti professionali piccole', lungo:false, kwn:'' },
    'lavapavimenti/lavapavimenti-uomo-terra':   { fam:'lavapavimenti', nome:'Uomo a terra', h1:'Lavasciuga pavimenti a batteria uomo a terra', lungo:true, kwn:'lavasciuga pavimenti a batteria · 390' },
    'lavapavimenti/lavapavimenti-uomo-bordo':   { fam:'lavapavimenti', nome:'Uomo a bordo', h1:'Lavapavimenti industriali uomo a bordo', lungo:false, kwn:'' },
    'lavapavimenti/lavapavimenti-combinate':    { fam:'lavapavimenti', nome:'Combinate', h1:'Lavapavimenti combinate: spazza e lava', lungo:false, kwn:'' },
    'lavapavimenti/i-mop':                      { fam:'lavapavimenti', nome:'i-mop', h1:'i-mop, la lavasciuga flessibile', lungo:false, kwn:'' },

    'spazzatrici/spazzatrici-uomo-terra':       { fam:'spazzatrici', nome:'Uomo a terra', h1:'Motoscope e spazzatrici uomo a terra', lungo:false, kwn:'' },
    'spazzatrici/spazzatrici-uomo-bordo':       { fam:'spazzatrici', nome:'Uomo a bordo', h1:'Motoscope industriali uomo a bordo', lungo:false, kwn:'' },
    'spazzatrici/spazzatrici-stradali':         { fam:'spazzatrici', nome:'Stradali', h1:'Spazzatrici stradali', lungo:true, kwn:'spazzatrici stradali' },

    'idropulitrici/idropulitrici-ad-acqua-fredda': { fam:'idropulitrici', nome:'Ad acqua fredda', h1:'Idropulitrici ad acqua fredda professionali', lungo:false, kwn:'' },
    'idropulitrici/idropulitrici-ad-acqua-calda':  { fam:'idropulitrici', nome:'Ad acqua calda', h1:'Idropulitrice acqua calda professionale', lungo:true, kwn:'idropulitrice acqua calda · 2.900' },
    'idropulitrici/idropulitrici-alte-prestazioni':{ fam:'idropulitrici', nome:'Alte prestazioni', h1:'Idropulitrici ad altissima pressione', lungo:false, kwn:'' },
    'idropulitrici/idropulitrici-impianti-fissi':  { fam:'idropulitrici', nome:'Impianti fissi', h1:'Idropulitrici a parete e impianti fissi', lungo:false, kwn:'' },
    'idropulitrici/idropulitrici-autonome':        { fam:'idropulitrici', nome:'Autonome', h1:'Idropulitrici a scoppio autonome', lungo:true, kwn:'idropulitrici a scoppio · 2.900' },

    'robot/robot-lavapavimenti':                { fam:'robot', nome:'Robot lavapavimenti', h1:'Robot lavapavimenti professionali', lungo:true, kwn:'robot lavapavimenti · 390' },
    'robot/robot-spazzatrici':                  { fam:'robot', nome:'Robot spazzatrici', h1:'Robot spazzatrici industriali', lungo:false, kwn:'' },

    'aspiratori/aspiratori-professionali':      { fam:'aspiratori', nome:'Professionali', h1:'Aspirapolvere professionale e aspiraliquidi', lungo:false, kwn:'' },
    'aspiratori/aspiratori-industriali':        { fam:'aspiratori', nome:'Industriali', h1:'Aspiratori industriali per polveri e solidi', lungo:false, kwn:'' },
    'aspiratori/aspiratori-per-olio-e-trucioli':{ fam:'aspiratori', nome:'Per olio e trucioli', h1:'Aspiratori per olio e trucioli da officina', lungo:false, kwn:'' },
    'aspiratori/aspiratori-certificati-atex':   { fam:'aspiratori', nome:'Certificati ATEX', h1:'Aspiratori industriali certificati ATEX', lungo:false, kwn:'' },
    'aspiratori/elettroventilatori':            { fam:'aspiratori', nome:'Elettroventilatori', h1:'Elettroventilatori e depolveratori', lungo:false, kwn:'' },

    'altri-macchinari/vasche-lavapezzi':        { fam:'altri-macchinari', nome:'Vasche lavapezzi', h1:'Vasca lavapezzi per officina', lungo:true, kwn:'vasca lavapezzi · 480 · lavapezzi officina · 390' },
    'altri-macchinari/generatori-di-vapore':    { fam:'altri-macchinari', nome:'Generatori di vapore', h1:'Generatore di vapore professionale', lungo:true, kwn:'generatore di vapore · 1.000' },
    'altri-macchinari/lavatappezzeria':         { fam:'altri-macchinari', nome:'Lavatappezzeria', h1:'Lavamoquette e lavatappezzeria professionali', lungo:false, kwn:'' },
    'altri-macchinari/monospazzole':            { fam:'altri-macchinari', nome:'Monospazzole', h1:'Monospazzola per pavimenti', lungo:true, kwn:'monospazzola per pavimenti · 1.900' },
    'altri-macchinari/purificatori-aria':       { fam:'altri-macchinari', nome:'Purificatori aria', h1:'Purificatori d\'aria professionali', lungo:false, kwn:'' },
    'altri-macchinari/pulizia-pannelli-solari': { fam:'altri-macchinari', nome:'Pulizia pannelli solari', h1:'Pulizia pannelli solari e fotovoltaici', lungo:false, kwn:'' },
    'altri-macchinari/nebulizzatori':           { fam:'altri-macchinari', nome:'Nebulizzatori', h1:'Nebulizzatori professionali', lungo:false, kwn:'' },
    'altri-macchinari/battitappeti':            { fam:'altri-macchinari', nome:'Battitappeti', h1:'Battitappeto professionale', lungo:false, kwn:'' }
  };

  /* ------------------------------------------- Macchine (dati reali) --- */
  var MACCHINE = {
"lavapavimenti/lavapavimenti-piccole":[{"url":"/lavapavimenti/lavapavimenti-piccole/lavapavimenti-socaf-mini/","nome":"MINI","desc":"Lavapavimenti commerciale, due serbatoi separati per la massima igiene."},{"url":"/lavapavimenti/lavapavimenti-piccole/lavapavimenti-socaf-viva/","nome":"VIVA","desc":"Lavapavimenti industriale facile da trasportare e con manico pieghevole."},{"url":"/lavapavimenti/lavapavimenti-piccole/lavapavimenti-socaf-la-360-8-c/","nome":"LA 360-8 C","desc":"Lavapavimenti industriale con manubrio inclinabile, ripiegabile. Versione a disco alimentata a cavo."},{"url":"/lavapavimenti/lavapavimenti-piccole/lavapavimenti-socaf-la-360-8-b/","nome":"LA 360-8 B","desc":"Lavapavimenti industriale con serbatoio estraibile. Versione a disco alimentata a batteria."},{"url":"/lavapavimenti/lavapavimenti-piccole/lavapavimenti-v1/","nome":"V1","desc":"Lavapavimenti compatta e maneggevole per pavimenti di piccole e medie superfici. Batteria al litio e tecnologia Weightless."}],
"lavapavimenti/lavapavimenti-uomo-terra":[{"url":"/lavapavimenti/lavapavimenti-uomo-terra/lavapavimenti-socaf-la-410-15-b/","nome":"LA 410-15 B","desc":"Lavapavimenti industriale con grande manovrabilità, perfetta anche in curva."},{"url":"/lavapavimenti/lavapavimenti-uomo-terra/lavapavimenti-industriale-uomo-a-terra-la-430-30-la-500-30/","nome":"LA 430-30 – LA 500-30","desc":"Lavapavimenti industriale uomo a terra LA 430-30 – LA 500-30"},{"url":"/lavapavimenti/lavapavimenti-uomo-terra/lavapavimenti-socaf-la-511-40-bt/","nome":"LA 511-40 BT","desc":"Lavasciuga pavimenti industriale uomo a terra, robusta, semplice e Made in Italy, per prestazioni affidabili e massima semplicità operativa.","img":"la511-40-bt-01.png"},{"url":"/lavapavimenti/lavapavimenti-uomo-terra/lavapavimenti-emx-50-bt-pro/","nome":"EMX 50 BT PRO","desc":"Lavapavimenti orientata a zero emissioni. Configurabile e con pannello di controllo soft touch."},{"url":"/lavapavimenti/lavapavimenti-uomo-terra/lavapavimenti-vip-66-76-bt/","nome":"VIP 76 BT","desc":"Lavapavimenti industriale ad alte prestazioni"}],
"lavapavimenti/lavapavimenti-uomo-bordo":[{"url":"/lavapavimenti/lavapavimenti-uomo-bordo/lavapavimenti-socaf-la-560-67-b/","nome":"LA 560-67 B","desc":"Lavapavimenti industriale compatta e con riduzione automatica della velocità in curva."},{"url":"/lavapavimenti/lavapavimenti-uomo-bordo/lavapavimenti-socaf-la-651-751-851-110b/","nome":"LA 651-110 B LA 751-110 B LA 851-110 B","desc":"Lavapavimenti industriali uomo a bordo essenziali nel costo del pulito. Tre larghezze di lavoro, orientate al risparmio delle risorse."},{"url":"/lavapavimenti/lavapavimenti-uomo-bordo/lavapavimenti-socaf-1020-110-b/","nome":"LA 1020-110 B","desc":"Lavapavimenti industriali semplici e intuitive. Con ruote antiscivolo e antitraccia."},{"url":"/lavapavimenti/lavapavimenti-uomo-bordo/lavapavimenti-uomo-a-bordo-mmg-base-e-mmg-cylindrical/","nome":"MMG BASE MMG CYLINDRICAL","desc":"Lavapavimenti con lampeggiante di serie e trazione posteriore. Controllo elettronico della stabilità."},{"url":"/lavapavimenti/lavapavimenti-uomo-bordo/lavapavimenti-vip-105/","nome":"VIP 105","desc":"Macchina lavapavimenti industriale"},{"url":"/lavapavimenti/lavapavimenti-uomo-bordo/lavapavimenti-serie-magna/","nome":"MAGNA BASE MAGNA PLUS MAGNA CYLINDRICAL","desc":"Lavapavimenti configurabili secondo esigenze con descent control per discese rapide."},{"url":"/lavapavimenti/lavapavimenti-uomo-bordo/lavapavimenti-mg-pro-e-mg-pro-cylindrical/","nome":"MG PRO E MG PRO CYLINDRICAL","desc":"Potenza, efficienza e tecnologia per la pulizia industriale"}],
"lavapavimenti/lavapavimenti-combinate":[{"url":"/lavapavimenti/lavapavimenti-combinate/lavapavimenti-socaf-la-700-110-r/","nome":"LA 700-110 R","desc":"Lavapavimenti industriale semplice da utilizzare con cassetto di raccolta residui solidi."},{"url":"/lavapavimenti/lavapavimenti-combinate/lavapavimenti-combinata-uomo-a-bordo-gmg/","nome":"GMG Combinata","desc":"Lavapavimenti uomo a bordo, progettata per ambienti interni o esterni molto ampi."}],
"lavapavimenti/i-mop":[{"url":"/lavapavimenti/i-mop/socaf-i-mop/","nome":"SOCAF I-MOP","desc":"Un modo più intelligente di pulire!"},{"url":"/lavapavimenti/i-mop/lavapavimenti-i-mop-36/","nome":"i-mop 36","desc":"Pulizia ancora più leggera, ma sempre più efficiente"},{"url":"/lavapavimenti/i-mop/lavapavimenti-i-mop-xl/","nome":"i-mop XL","desc":"i-mop XL: rapidità, precisione e design"},{"url":"/lavapavimenti/i-mop/lavapavimenti-i-mop-xxl/","nome":"i-mop XXL","desc":"i-mop XXL: potenza e agilità in un'unica lavasciuga"}],
"spazzatrici/spazzatrici-uomo-terra":[{"url":"/spazzatrici/spazzatrici-uomo-terra/spazzatrice-socaf-tk-306/","nome":"TK 306","desc":"Spazzatrice compatta, dalla massima efficienza."},{"url":"/spazzatrici/spazzatrici-uomo-terra/spazzatrice-socaf-tk-506/","nome":"TK 506","desc":"Spazzatrice efficace, compatta e resistente."},{"url":"/spazzatrici/spazzatrici-uomo-terra/spazzatrice-socaf-tk-706/","nome":"TK 706","desc":"Spazzatrice uomo a terra di alta efficienza."}],
"spazzatrici/spazzatrici-uomo-bordo":[{"url":"/spazzatrici/spazzatrici-uomo-bordo/spazzatrice-socaf-sp-1000/","nome":"SP 1000","desc":"Spazzatrice industriale molto compatta, estremamente confortevole e intuitiva."},{"url":"/spazzatrici/spazzatrici-uomo-bordo/spazzatrice-socaf-sp-1300/","nome":"SP 1300","desc":"Spazzatrice industriale compatta ed ergonomica alla guida."},{"url":"/spazzatrici/spazzatrici-uomo-bordo/spazzatrice-sw-3000/","nome":"SW 3000","desc":"Spazzatrice a batteria per interni ed esterni"},{"url":"/spazzatrici/spazzatrici-uomo-bordo/spazzatrice-socaf-sp-1500-e-sp-1500-sa/","nome":"SP 1500 e SP 1500 SA","desc":"Progettate per migliorare la pulizia anche negli ambienti più ampi."},{"url":"/spazzatrici/spazzatrici-uomo-bordo/spazzatrice-pb-115e/","nome":"PB 115 E","desc":"Motoscopa elettrica a batteria a spazzamento diretto"},{"url":"/spazzatrici/spazzatrici-uomo-bordo/spazzatrice-pb-120dy-pb-120e/","nome":"PB 120 DY - PB 120 E","desc":"Motoscopa a spazzamento diretto con raccolta anteriore"},{"url":"/spazzatrici/spazzatrici-uomo-bordo/spazzatrici-pb-160e-pb-160dk/","nome":"PB 160 E - PB 160 DK","desc":"Motoscopa con pista di pulizia fino a 160 cm"},{"url":"/spazzatrici/spazzatrici-uomo-bordo/spazzatrice-uomo-a-bordo-pb-180-dk/","nome":"PB 180 DK","desc":"Motoscopa a gasolio ideale per spazi superiori ai 1000 mq"},{"url":"/spazzatrici/spazzatrici-uomo-bordo/spazzatrice-pb-200d/","nome":"PB 200D","desc":"Motoscopa con pista di pulizia fino a 240 cm per grandi spazi"}],
"spazzatrici/spazzatrici-stradali":[{"url":"/spazzatrici/spazzatrici-stradali/spazzatrice-stradale-elettrica-maxwind/","nome":"MaxWind","desc":"Spazzatrice da marciapiede elettrica"},{"url":"/spazzatrici/spazzatrici-stradali/spazzatrice-stradale-electra-2-0/","nome":"Electra 2.0","desc":"Spazzatrice Stradale Elettrica"},{"url":"/spazzatrici/spazzatrici-stradali/spazzatrice-stradale-elettrica-electra-1-0/","nome":"Electra 1.0","desc":"Spazzatrice Stradale Elettrica"},{"url":"/spazzatrici/spazzatrici-stradali/spazzatrice-stradale-mc-250/","nome":"MC 250","desc":"Spazzatrice aspirante ecologica"},{"url":"/spazzatrici/spazzatrici-stradali/spazzatrice-macro-m7/","nome":"M10","desc":"Motoscopa con contenitore rifiuti fino a 1000 Kg"},{"url":"/spazzatrici/spazzatrici-stradali/spazzatrice-macro-m40/","nome":"MACRO M40","desc":"Motoscopa con contenitore rifiuti fino a 4000 Kg"},{"url":"/spazzatrici/spazzatrici-stradali/spazzatrice-macro-m60/","nome":"MACRO M60","desc":"Motoscopa con contenitore rifiuti fino a 6000 Kg"}],
"idropulitrici/idropulitrici-ad-acqua-fredda":[{"url":"/idropulitrici/idropulitrici-ad-acqua-fredda/af-k-120-11/","nome":"AF K 120-11","desc":"Perfetta per lavori quotidiani grazie alla sua affidabilità e lunga durata."},{"url":"/idropulitrici/idropulitrici-ad-acqua-fredda/idropulitrice-af-pro-150-af-pro-170/","nome":"AF PRO 150-9","desc":"Elettrica ed a basso consumo di corrente"},{"url":"/idropulitrici/idropulitrici-ad-acqua-fredda/af-k-200-15/","nome":"AF K 200-15","desc":"Ad alte prestazioni con consumi energetici contenuti."},{"url":"/idropulitrici/idropulitrici-ad-acqua-fredda/idropulitrice-af-inox-200-15-200-21-250-15/","nome":"AF INOX 200-15, 200-21, 250-15","desc":"Idropulitrice professionale ad acqua fredda ad uso intensivo"}],
"idropulitrici/idropulitrici-ad-acqua-calda":[{"url":"/idropulitrici/idropulitrici-ad-acqua-calda/idropulitrice-tl-150-ts-plus/","nome":"TL 150 TS PLUS","desc":"Idropulitrice ad acqua calda entry level con pompa albero biella"},{"url":"/idropulitrici/idropulitrici-ad-acqua-calda/idropulitrici-srl-150-tsi-srl-170-tsi-srl-200-tsi-srl-201/","nome":"SRL 150 - 170 - 200 - 201 TSI","desc":"Idropulitrici professionali elettriche a 200 bar"},{"url":"/idropulitrici/idropulitrici-ad-acqua-calda/idropulitrice-serie-srl-super-200-201-250/","nome":"SERIE SRL SUPER 200, 201, 250","desc":"Idropulitrici professionali elettriche ad alta pressione"},{"url":"/idropulitrici/idropulitrici-ad-acqua-calda/idropulitrici-spl-180-tsi-spl-200-tsi-spl-201-tsi/","nome":"SPL 200 - 201 TSI","desc":"Idropulitrice elettrica trifase a 200 bar"},{"url":"/idropulitrici/idropulitrici-ad-acqua-calda/idropulitrice-pw-e100-12kw-24-kw/","nome":"PW E 100 P12 e P24","desc":"Idropulitrici professionali elettriche a 200 bar"}],
"idropulitrici/idropulitrici-alte-prestazioni":[{"url":"/idropulitrici/idropulitrici-alte-prestazioni/idropulitrice-af-ind-200-30-ind-250-21-ind-350-18/","nome":"AF Serie Pro IND","desc":"Idropulitrice professionale ad acqua fredda alta pressione AF Pro IND"},{"url":"/idropulitrici/idropulitrici-alte-prestazioni/idropulitrice-autonoma-a-benzina-blitz-cwp/","nome":"BLITZ CWP","desc":"Idropulitrice autonoma a benzina"}],
"idropulitrici/idropulitrici-impianti-fissi":[{"url":"/idropulitrici/idropulitrici-impianti-fissi/idropulitrici-industriali-a-parete-psl/","nome":"PSL","desc":"Idropulitrici industriali a parete"},{"url":"/idropulitrici/idropulitrici-impianti-fissi/idropulitrici-industriali-a-parete-psl-hot/","nome":"PSL HOT","desc":"Idropulitrici industriali a parete ad acqua calda"},{"url":"/idropulitrici/idropulitrici-impianti-fissi/idropulitrici-serie-hot-modus-2015-tst-2021-tst/","nome":"HOT MODUS 2015 TST - 2021 TST","desc":"Impianto fisso per esterni"},{"url":"/idropulitrici/idropulitrici-impianti-fissi/idropulitrici-sh-solar-5m-1501020g-e-sh-solar-7p-1701200g/","nome":"SOLAR BOOSTER","desc":"Impianto fisso a gas"}],
"idropulitrici/idropulitrici-autonome":[{"url":"/idropulitrici/idropulitrici-autonome/idropulitrice-ad-acqua-fredda-hc-pro-10-d/","nome":"HC PRO 10 D","desc":"L’autonoma Diesel per i lavori impegnativi"},{"url":"/idropulitrici/idropulitrici-autonome/idropulitrice-hc-pro-13-l-h/","nome":"HC PRO 13 L - HC PRO 13 H","desc":"Autonoma, robusta con una pressione di 250 bar"}],
"robot/robot-lavapavimenti":[{"url":"/robot/robot-lavapavimenti/robot-lavapavimenti-phantas/","nome":"Phantas","desc":"Il robot lavapavimenti guidato dall'intelligenza artificiale"},{"url":"/robot/robot-lavapavimenti/ecobot-50/","nome":"ECOBOT 50 PRO","desc":"Pulizia automatizzata in ambienti di piccole dimensioni"},{"url":"/robot/robot-lavapavimenti/ecobot-75/","nome":"ECOBOT 75","desc":"Lavasciuga robotizzata per pulizia automatizzata industriale"}],
"robot/robot-spazzatrici":[{"url":"/robot/robot-spazzatrici/robot-spazzatrice-beetle/","nome":"BEETLE","desc":"Spazzatrice industriale autonoma per impieghi gravosi"}],
"aspiratori/aspiratori-professionali":[{"url":"/aspiratori/aspiratori-professionali/aspiratori-spalla-serie-gd-gd5-gd-battery-gd-10/","nome":"GD5 - GD10","desc":"Aspiratori a spalla a cavo e batteria"},{"url":"/aspiratori/aspiratori-professionali/aspiratore-professionale-as-130-270-370/","nome":"AS 130 - 270 - 370","desc":"Aspiratori wet & dry professionali"},{"url":"/aspiratori/aspiratori-professionali/yp-1-6-eco-b/","nome":"YP 1/6 ECO B","desc":"Aspiratore professionale only-dry compatto e leggero"}],
"aspiratori/aspiratori-industriali":[{"url":"/aspiratori/aspiratori-industriali/aspiratore-dm3-el-100/","nome":"DM 3 EL - DM 3 EL LP","desc":"Aspiratori industriali monofase per utilizzi impegnativi"},{"url":"/aspiratori/aspiratori-industriali/aspiratore-industriale-mistral-202-ds/","nome":"Mistral 202 DS","desc":"Aspiratore industriale compatto monofase per polveri e solidi"},{"url":"/aspiratori/aspiratori-industriali/aspiratore-452-ds/","nome":"452 DS","desc":"Aspiratore monofase compatto e potente"},{"url":"/aspiratori/aspiratori-industriali/aspiratore-industriale-dg-50-export-dg-70-export/","nome":"DG50 EXPORT - DG70 EXPORT SE","desc":"Aspirazione in continuo per grandi quantità di detriti"},{"url":"/aspiratori/aspiratori-industriali/aspiratore-zefiro-el-60-t-el-t4-hd/","nome":"ZEFIRO EL TR - EL HD","desc":"Aspiratori industriali trifase per servizio in continuo"},{"url":"/aspiratori/aspiratori-industriali/aspiratori-industriali-dg200-dg-300-hd/","nome":"DG 200 - DG 300 HD","desc":"Aspiratori industriale trifase per solidi, liquidi e polveri"},{"url":"/aspiratori/aspiratori-industriali/aspiratori-industriali-dbf-10-dbf-20-dbf-30/","nome":"DBF 10 - DBF 20 - DBF 30","desc":"Aspiratori per il recupero costante degli scarti di produzione"},{"url":"/aspiratori/aspiratori-industriali/aspiratori-industriali-dbfv-5-10-20-30/","nome":"DBF/V 5-10-20-30","desc":"Aspiratori per installazione su macchinari di produzione"},{"url":"/aspiratori/aspiratori-industriali/aspiratore-industriale-serie-dm-3-clear-aut-dm-3-clear-aut-endless-bag/","nome":"DM 3 CLEAR-AUT","desc":"Aspiratori industriali per polveri sottili con pulizia del filtro in continuo"}],
"aspiratori/aspiratori-per-olio-e-trucioli":[{"url":"/aspiratori/aspiratori-per-olio-e-trucioli/aspiratore-tecnoil-dm-40-oil/","nome":"TECNOIL DM40 OIL","desc":"Il più compatto aspiratore liquidi e olio industriale"},{"url":"/aspiratori/aspiratori-per-olio-e-trucioli/serie-tecnoil-tc-100-if-tc-100-mpi/","nome":"TECNOIL TC 100 IF – TC 100 MPI","desc":"Aspiratore con svuotamento automatico per liquidi, oli ed emulsioni"},{"url":"/aspiratori/aspiratori-per-olio-e-trucioli/aspiratore-tecnoil-220-if/","nome":"TECNOIL TC 220 IF – TC 220 MPI","desc":"Aspirazione e separazione con svuotamento automatico 220 litri"},{"url":"/aspiratori/aspiratori-per-olio-e-trucioli/serie-tecnoil-tc-400-if-tc-400-t43/","nome":"TECNOIL TC 400 IF – TC 400 T43","desc":"Aspirazione e separazione liquidi ad alta resa capacità 400 litri"},{"url":"/aspiratori/aspiratori-per-olio-e-trucioli/aspiratore-tecnoil-600/","nome":"TECNOIL TC 600","desc":"Aspiratore industriale e separatore olio trucioli in continuo 600 litri"}],
"aspiratori/aspiratori-certificati-atex":[{"url":"/aspiratori/aspiratori-certificati-atex/aspiratore-industriale-dm-airex-1-2d/","nome":"DM AIREX 1/2D","desc":"Certificato ATEX zona 20 interna e zona 21 esterna"},{"url":"/aspiratori/aspiratori-certificati-atex/aspiratore-industriale-mtl-201-bl/","nome":"MTL 201 BL","desc":"Massima affidabilità anche nelle aree a rischio esplosione"},{"url":"/aspiratori/aspiratori-certificati-atex/aspiratore-industriale-dm-2-el-1-3-d/","nome":"DM 2 EL 1/3 D","desc":"Garantisce massima sicurezza ed efficienza"},{"url":"/aspiratori/aspiratori-certificati-atex/aspiratore-industriale-zefiro-z22/","nome":"ZEFIRO Z22","desc":"Progettato per la raccolta di polveri e solidi combustibili"},{"url":"/aspiratori/aspiratori-certificati-atex/aspiratore-industriale-mtl-452/","nome":"MTL 452","desc":"Progettato per l’aspirazione sicura di polveri e solidi potenzialmente reattivi"}],
"aspiratori/elettroventilatori":[{"url":"/aspiratori/elettroventilatori/aspiratore-zefiro-ev-420/","nome":"ZEFIRO EV 420","desc":"Depolveratore per polveri sottili e fumi in sospensione nell'aria"},{"url":"/aspiratori/elettroventilatori/aspiratore-zefiro-ev-ap-560/","nome":"ZEFIRO EV AP 560","desc":"Depolveratore per polveri in sospensione nell'aria e aspiratrucioli"}],
"altri-macchinari/vasche-lavapezzi":[{"url":"/altri-macchinari/vasche-lavapezzi/vasca-lavapezzi-top-cleaner-1200-top-cleaner-1200-power/","nome":"TOP CLEANER 1200 - 1200 POWER","desc":"Vasca manuale a caldo e freddo con pennello a setole rigide"},{"url":"/altri-macchinari/vasche-lavapezzi/vasca-lavapezzi-top-cleaner-90-power/","nome":"TOP CLEANER 90 Power","desc":"Lavaggio manuale a caldo con acqua e detergenti riscaldati"},{"url":"/altri-macchinari/vasche-lavapezzi/top-cleaner-140-bio-power/","nome":"TOP CLEANER 140 Bio Power","desc":"Vasca lavapezzi per il lavaggio manuale di pezzi di medie e grandi dimensioni"},{"url":"/altri-macchinari/vasche-lavapezzi/hp-compact/","nome":"HP COMPACT","desc":"Vasca lavapezzi compatta per prestazioni professionali"},{"url":"/altri-macchinari/vasche-lavapezzi/top-tinwash/","nome":"TOP TINWASH","desc":"Vasca lavapezzi automatica con cestello per lavaggio a solvente"},{"url":"/altri-macchinari/vasche-lavapezzi/vasca-lavapezzi-manuale-eco-high-pressure/","nome":"Eco HP","desc":"Vasca lavapezzi manuale in acciaio Inox Aisi 304"},{"url":"/altri-macchinari/vasche-lavapezzi/vasca-lavapezzi-manuale-eco-110-high-pressure/","nome":"Eco 110 HP","desc":"Vasca lavapezzi manuale in acciaio Inox Aisi 304"},{"url":"/altri-macchinari/vasche-lavapezzi/vasca-lavapezzi-washer-60/","nome":"Washer 60","desc":"Vasca lavapezzi in acciaio Inox Aisi 304"},{"url":"/altri-macchinari/vasche-lavapezzi/vasca-lavapezzi-washer-750-e/","nome":"Washer 750 - E","desc":"Vasca lavapezzi in acciaio Inox Aisi 304"},{"url":"/altri-macchinari/vasche-lavapezzi/vasca-lavapezzi-washer-1150-e-power/","nome":"Washer 1150 E Power","desc":"Vasca lavapezzi in acciaio Inox Aisi 304"}],
"altri-macchinari/generatori-di-vapore":[{"url":"/altri-macchinari/generatori-di-vapore/generatore-di-vapore-professionale-metis/","nome":"METIS","desc":"Caldaia alimentata a diesel di autonomia illimitata"},{"url":"/altri-macchinari/generatori-di-vapore/generatore-di-vapore-kolumbo/","nome":"KOLUMBO","desc":"Vapore saturo immediato anche senza corrente"},{"url":"/altri-macchinari/generatori-di-vapore/generatore-di-vapore-eco-air-plus/","nome":"ECO AIR PLUS","desc":"Macchina professionale con minimo ingombro"},{"url":"/altri-macchinari/generatori-di-vapore/generatori-di-vapore-serie-gv-vesuvio/","nome":"GV 18 - GV 30","desc":"Macchine professionali per la pulizia industriale"},{"url":"/altri-macchinari/generatori-di-vapore/generatore-di-vapore-gv-8t-plus/","nome":"GV 8T PLUS","desc":"Pressione 9 bar ad una temperatura di 175°C"},{"url":"/altri-macchinari/generatori-di-vapore/generatore-di-vapore-vapor-3000-plus/","nome":"VAPOR 3000 A PLUS","desc":"Pulizia e sanificazione industriale con aspirazione"},{"url":"/altri-macchinari/generatori-di-vapore/generatore-di-vapore-vapor-9000/","nome":"VAPOR 9000 A","desc":"Macchina professionale per la pulizia industriale con aspirazione"}],
"altri-macchinari/lavatappezzeria":[{"url":"/altri-macchinari/lavatappezzeria/aspirolava-socaf-car/","nome":"Socaf Car","desc":"Aspirolava professionale per interni e tessuti"},{"url":"/altri-macchinari/lavatappezzeria/lavatessuti-aspirolava-grace/","nome":"GRACE","desc":"70 litri d’acqua e due motori d’aspirazione"},{"url":"/altri-macchinari/lavatappezzeria/lavatessuti-aspirolava-lava/","nome":"LAVA","desc":"Sistema di iniezione estrazione su ogni tipo di superficie"},{"url":"/altri-macchinari/lavatappezzeria/sw-15/","nome":"SW 15","desc":"Lavatessuti professionale a iniezione-estrazione per tessuti imbottiti e interni auto"},{"url":"/altri-macchinari/lavatappezzeria/sabrina/","nome":"SABRINA","desc":"Aspirolava compatta per moquette, tappeti e pavimenti duri"}],
"altri-macchinari/monospazzole":[{"url":"/altri-macchinari/monospazzole/monospazzola-sb-143-l/","nome":"SB 143 L","desc":"Monospazzola professionale per il lavaggio e la lucidatura dei pavimenti"},{"url":"/altri-macchinari/monospazzole/monospazzola-monofase-hg-17-kr-grinder/","nome":"HG 17 KR GRINDER","desc":"Monospazzola monofase con funzione levigatrice"}],
"altri-macchinari/purificatori-aria":[{"url":"/altri-macchinari/purificatori-aria/aeramax-pro-am2/","nome":"AERAMAX PRO AM2 - AM3 - AM4","desc":"La misura perfetta per le stanze di media dimensione"},{"url":"/altri-macchinari/purificatori-aria/generatore-di-ozono-storm-pro-20/","nome":"Storm PRO 20","desc":"Generatore di ozono per la sanificazione degli ambienti"}],
"altri-macchinari/pulizia-pannelli-solari":[{"url":"/altri-macchinari/pulizia-pannelli-solari/lava-pannelli-serie-solar/","nome":"Solar E - Solar JET E - Solar JET S","desc":"Idropulitrice per la pulizia pannelli fotovoltaici"}],
"altri-macchinari/nebulizzatori":[{"url":"/altri-macchinari/nebulizzatori/nebulizzatori-24lt-50lt-100lt/","nome":"24LT - 50LT - 100LT","desc":"Efficaci per lavaggio automezzi, lubrificazione, distribuzione oli disarmanti"}],
"altri-macchinari/battitappeti":[{"url":"/altri-macchinari/battitappeti/battitappeto-sebo/","nome":"Battitappeto professionale SEBO","desc":"Prestazioni di pulizia eccezionali nel rispetto degli standard ambientali"}]
  };

  /* Flag noleggio / usato: SEGNAPOSTO deterministico, in attesa del data entry
     dei 238 valori. Serve solo a far vedere le etichette nel wireframe. */
  function flags(url) {
    var h = 0, i;
    for (i = 0; i < url.length; i++) h = (h * 31 + url.charCodeAt(i)) >>> 0;
    return { noleggio: h % 10 < 5, usata: (h >> 3) % 10 < 4 };
  }

  Object.keys(MACCHINE).forEach(function (s) {
    var fam = SOTTO[s] ? SOTTO[s].fam : '';
    MACCHINE[s].forEach(function (m) {
      var f = flags(m.url);
      m.noleggio = f.noleggio && !!(FAMIGLIE[fam] && FAMIGLIE[fam].noleggio);
      m.usata = f.usata && !!(FAMIGLIE[fam] && FAMIGLIE[fam].usato);
      m.sub = s;
      m.fam = fam;
    });
  });

  function sottoDiFamiglia(fam) {
    return Object.keys(SOTTO).filter(function (s) { return SOTTO[s].fam === fam; });
  }
  function macchinaDaUrl(url) {
    var found = null;
    Object.keys(MACCHINE).forEach(function (s) {
      MACCHINE[s].forEach(function (m) { if (m.url === url) found = m; });
    });
    return found;
  }
  function tutteLeMacchine() {
    var out = [];
    Object.keys(MACCHINE).forEach(function (s) { out = out.concat(MACCHINE[s]); });
    return out;
  }

  window.SOCAF_CAT = {
    FAMIGLIE: FAMIGLIE,
    SOTTO: SOTTO,
    MACCHINE: MACCHINE,
    sottoDiFamiglia: sottoDiFamiglia,
    macchinaDaUrl: macchinaDaUrl,
    tutteLeMacchine: tutteLeMacchine
  };
})();
