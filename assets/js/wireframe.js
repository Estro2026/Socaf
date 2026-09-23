/* ==========================================================================
   Socaf — Wireframe · script unico
   Solo interazioni funzionali: menu, fisarmonica mobile, FAQ, galleria,
   ricerca demo, pannello delle note DEV.
   Nessuna libreria, nessuna animazione decorativa.

   DUE PRINCÌPI:
   1. Le note DEV non stanno nel flusso. Sono richiami numerati in posizione
      assoluta + un pannello laterale: le altezze delle sezioni sono IDENTICHE
      con le note accese o spente, così la lunghezza delle pagine è reale.
   2. I template di catalogo (D1, D2, D3) sono alimentati da catalogo.js:
      ogni sottocategoria e ogni famiglia mostra i propri prodotti veri.
   ========================================================================== */
(function () {
  'use strict';

  var here = (document.currentScript && document.currentScript.src) || '';
  var BASE = here.replace(/assets\/js\/wireframe\.js.*$/, '');
  var CAT = window.SOCAF_CAT || null;

  /* ======================================================================
     1 · NAVIGAZIONE — da socaf_F4_menu_nuovo_sito_v02.html
     ====================================================================== */
  var NUMERO_VERDE = '800 480110';

  var MENU = [
    { label: 'Macchine', type: 'drop', note: 'Nessuna pagina propria', items: [
      ['Lavapavimenti', '/lavapavimenti/'], ['Spazzatrici', '/spazzatrici/'],
      ['Idropulitrici', '/idropulitrici/'], ['Aspiratori', '/aspiratori/'],
      ['Robot', '/robot/'], ['Altri macchinari', '/altri-macchinari/']
    ]},
    { label: 'Noleggio', type: 'flat', href: '/noleggio/' },
    { label: 'Settori', type: 'drop', note: 'Nessuna pagina nel menu', items: [
      ['Industria', '/settori/industria/'], ['Imprese di pulizia', '/settori/imprese-di-pulizia/'],
      ['Ho.Re.Ca.', '/settori/horeca/'], ['Retail', '/settori/retail/'],
      ['Logistica', '/settori/logistica/'], ['Officine e metalmeccanica', '/settori/officine-metalmeccanica/'],
      ['Edilizia e cantieri', '/settori/edilizia-cantieri/']
    ]},
    { label: 'Prodotti per la pulizia', type: 'flat', href: '/prodotti-per-la-pulizia/' },
    { label: 'Servizi', type: 'drop', note: 'Nessuna pagina propria', items: [
      ['Pronto intervento', '/servizi/pronto-intervento/'], ['Consulenza tecnica', '/servizi/consulenza-tecnica/'],
      ['Soluzioni finanziarie', '/servizi/soluzioni-finanziarie/'], ['Usato', '/usato/'],
      ["Supervalutazione dell'usato", '/servizi/supervalutazione-dell-usato/']
    ]},
    { label: 'Azienda', type: 'drop', note: 'Nessuna pagina propria', items: [
      ['Chi siamo', '/azienda/chi-siamo/'], ['Innovazione tecnologica', '/azienda/innovazione-tecnologica/'],
      ['Il nostro impegno', '/azienda/il-nostro-impegno/'], ['Referenze', '/azienda/referenze/'],
      ['Lavora con noi', '/azienda/lavora-con-noi/'], ['Contatti', '/contatti/']
    ]}
  ];

  var SEDI = [
    { slug:'osio-sotto', city:'Osio Sotto', co:'Socaf S.p.A.', addr:'Via Trieste, 14, 24046 Osio Sotto (BG)', tel:'+39 035 4876054', mail:'info@socaf.it', main:true },
    { slug:'brescia', city:'Brescia', co:'Socaf S.p.A.', addr:'Via dei Ponticelli, 47, 25014 Castenedolo (BS)', tel:'+39 030 2732674', mail:'info@socaf.it' },
    { slug:'milano', city:'Milano', co:'Socaf S.p.A.', addr:'Via De Gasperi, 120, 20017 Mazzo di Rho (MI)', tel:'+39 02 93904406', mail:'info@socaf.it' },
    { slug:'verona', city:'Verona', co:'Bottoni S.r.l.', addr:'Via E. Fermi, 1, 37026 Settimo di Pescantina (VR)', tel:'+39 045 6702122', mail:'info@bottonisrl.it' },
    { slug:'pordenone', city:'Pordenone', co:'Tecno Clean S.r.l.', addr:'Via Nicola Calipari, 7, 33084 Cordenons (PN)', tel:'+39 0434 540188', mail:'info@tecno-clean.it' }
  ];

  /* ======================================================================
     2 · ROUTING — indirizzo reale → file di wireframe (+ istanza)
     Gli slug non sono modificati: l'indirizzo vero resta nel tooltip.
     ====================================================================== */
  function route(path) {
    var p = path.replace(/^https?:\/\/[^/]+/, '');
    if (p === '/') return BASE + 'wireframes/16-home.html';
    if (p.indexOf('/?s=') === 0) return BASE + 'wireframes/17-risultati-ricerca.html';
    if (/^\/noleggio\/$/.test(p)) return BASE + 'wireframes/04-noleggio.html';
    if (/^\/noleggio\/[^/]+\/$/.test(p)) return BASE + 'wireframes/05-noleggio-famiglia.html?fam=' + p.split('/')[2];
    if (/^\/usato\/$/.test(p)) return BASE + 'wireframes/06-usato.html';
    if (/^\/usato\/[^/]+\/$/.test(p)) return BASE + 'wireframes/07-usato-famiglia.html?u=' + p.split('/')[2];
    if (/^\/settori\/$/.test(p)) return BASE + 'wireframes/08-settori.html';
    if (/^\/settori\/[^/]+\/$/.test(p)) return BASE + 'wireframes/09-settore.html?s=' + p.split('/')[2];
    if (/^\/prodotti-per-la-pulizia\/$/.test(p)) return BASE + 'wireframes/10-prodotti-pulizia.html';
    if (/^\/prodotti-per-la-pulizia\/[^/]+\/$/.test(p)) return BASE + 'wireframes/11-categoria-prodotto.html?c=' + p.split('/')[2];
    if (/^\/news\/$/.test(p)) return BASE + 'wireframes/13-approfondimenti.html';
    if (/^\/news\/[^/]+\/$/.test(p)) return BASE + 'wireframes/12-articolo.html';
    if (/^\/sedi\/[^/]+\/$/.test(p)) return BASE + 'wireframes/14-sede.html?sede=' + p.split('/')[2];
    if (/^\/contatti\/$/.test(p)) return BASE + 'wireframes/15-contatti.html';
    if (/^\/(servizi|azienda)\//.test(p)) return BASE + 'wireframes/20-pagina.html?p=' + p;
    var seg = p.split('/').filter(Boolean);
    if (seg.length === 3) return BASE + 'wireframes/01-scheda-macchina.html?m=' + encodeURIComponent(p);
    if (seg.length === 2) return BASE + 'wireframes/02-sottocategoria.html?sub=' + seg[0] + '/' + seg[1];
    if (seg.length === 1) return BASE + 'wireframes/03-famiglia.html?fam=' + seg[0];
    return BASE + 'index.html';
  }

  function a(path, label, cls) {
    var ext = /^https?:/.test(path);
    return '<a href="' + (ext ? path : route(path)) + '"' +
      (cls ? ' class="' + cls + '"' : '') +
      (ext ? ' target="_blank" rel="noopener"' : ' data-url="' + path + '" title="' + path + '"') +
      '>' + label + '</a>';
  }
  function param(n) {
    var m = location.search.match(new RegExp('[?&]' + n + '=([^&]*)'));
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* ======================================================================
     3 · HEADER / FOOTER / BLOCCHI GLOBALI
     ====================================================================== */
  function header() {
    var logo = BASE + 'assets/logo/socaf21-payoff-rgb.svg';
    var h = '<div class="topbar"><div class="wrap">' +
      a('/servizi/pronto-intervento/', 'Pronto intervento') + a('/news/', 'Approfondimenti') +
      '<a class="pushr" href="' + route('/?s=') + '" data-url="/?s=" title="/?s=">Cerca</a></div></div>';

    h += '<div class="mainbar"><div class="wrap">' +
      '<a class="brand" href="' + route('/') + '" data-url="/" title="/">' +
      '<img src="' + logo + '" alt="Socaf — Soluzioni per il cleaning"></a><ul class="nav-list">';

    MENU.forEach(function (m, i) {
      if (m.type === 'flat') {
        h += '<li><a class="nav-btn nav-flat" href="' + route(m.href) + '" data-url="' + m.href + '" title="' + m.href + '">' + m.label + '</a></li>';
      } else {
        var id = 'dd' + i;
        h += '<li><button class="nav-btn" type="button" aria-expanded="false" aria-controls="' + id + '" data-dd="' + id + '">' +
          m.label + '<span class="caret" aria-hidden="true"></span></button>' +
          '<div class="dropdown" id="' + id + '" data-open="false"><div class="dd-note">' + m.note + '</div><ul>' +
          m.items.map(function (it) { return '<li>' + a(it[1], it[0]) + '</li>'; }).join('') +
          '</ul></div></li>';
      }
    });

    h += '</ul><a class="phone-cta" href="tel:800480110"><span class="lbl">Numero verde</span>' + NUMERO_VERDE + '</a>' +
      '<button class="burger" type="button" aria-expanded="false" aria-controls="mobnav">Menu</button></div></div>';

    h += '<div class="mobile-panel" id="mobnav" data-open="false"><div class="mobile-sticky">' +
      '<a class="btn btn-ghost" href="' + route('/noleggio/') + '" data-url="/noleggio/">Noleggio</a>' +
      '<a class="btn btn-primary" href="tel:800480110">' + NUMERO_VERDE + '</a></div>';
    MENU.forEach(function (m, i) {
      if (m.type === 'flat') { h += '<div class="acc">' + a(m.href, m.label) + '</div>'; }
      else {
        h += '<div class="acc"><button type="button" data-acc="macc' + i + '" aria-expanded="false">' + m.label + '<span class="caret" aria-hidden="true"></span></button>' +
          '<div class="acc-body" id="macc' + i + '" data-open="false">' +
          m.items.map(function (it) { return a(it[1], it[0]); }).join('') + '</div></div>';
      }
    });
    h += '<div class="acc">' + a('/servizi/pronto-intervento/', 'Pronto intervento') + '</div>' +
      '<div class="acc">' + a('/news/', 'Approfondimenti') + '</div>' +
      '<div class="acc"><a href="' + route('/?s=') + '" data-url="/?s=">Cerca</a></div></div>';
    return h;
  }

  function footer() {
    return '<div class="wrap"><div class="footer-brand">' +
      '<a class="brand" href="' + route('/') + '" data-url="/" title="/"><img src="' + BASE + 'assets/logo/socaf21-payoff-rgb.svg" alt="Socaf — Soluzioni per il cleaning"></a>' +
      '<p>Specialista dal 1982 in soluzioni per il cleaning professionale e per la qualità degli ambienti di lavoro.</p>' +
      '<a class="phone-cta" href="tel:800480110"><span class="lbl">Numero verde</span>' + NUMERO_VERDE + '</a></div>' +
      '<div class="footer-grid">' +
      '<div><h4>Dove siamo</h4><ul>' +
      SEDI.map(function (s) { return '<li>' + a('/sedi/' + s.slug + '/', s.city + (s.main ? ' <span class="f-tag">sede principale</span>' : '')) + '</li>'; }).join('') +
      '</ul></div>' +
      '<div><h4>Catalogo</h4><ul>' +
      ['lavapavimenti','spazzatrici','idropulitrici','aspiratori','robot','altri-macchinari'].map(function (f) {
        return '<li>' + a('/' + f + '/', CAT && CAT.FAMIGLIE[f] ? CAT.FAMIGLIE[f].nome : f) + '</li>';
      }).join('') +
      '<li>' + a('/prodotti-per-la-pulizia/', 'Prodotti per la pulizia') + '</li></ul></div>' +
      '<div><h4>Formule e servizi</h4><ul>' +
      '<li>' + a('/noleggio/', 'Noleggio') + '</li><li>' + a('/usato/', 'Usato garantito') + '</li>' +
      '<li>' + a('/servizi/', 'Servizi') + '</li><li>' + a('/settori/', 'Settori') + '</li>' +
      '<li>' + a('/azienda/referenze/', 'Referenze') + '</li><li>' + a('/news/', 'Approfondimenti') + '</li>' +
      '<li>' + a('/contatti/', 'Contatti') + '</li></ul></div>' +
      '<div><h4>I marchi del gruppo</h4><ul>' +
      '<li>' + a('https://www.aquarial.it/', 'Aquarial <span class="f-tag">raffrescamento</span>') + '</li>' +
      '<li>' + a('https://www.caldofacile.it/', 'Caldofacile <span class="f-tag">riscaldamento</span>') + '</li></ul>' +
      '<h4 style="margin-top:22px">Recapiti</h4><p class="small" style="margin:0">Numero verde <b>' + NUMERO_VERDE + '</b><br>info@socaf.it</p></div>' +
      '</div><div class="footer-legal">' +
      '<span>Socaf S.p.A. · Via Trieste, 14, 24046 Osio Sotto (BG) · P. IVA IT 01331640167</span>' +
      '<a href="#">Privacy policy</a><a href="#">Cookie policy</a></div></div>';
  }

  function blocoSedi(escludi) {
    /* Elenco statico: un Listing Grid del CPT `sede`, nessun filtro e nessuna
       interazione. La sede principale è la prima e più larga. */
    return '<div class="sedi">' + SEDI.filter(function (s) { return s.slug !== escludi; }).map(function (s) {
      return '<div class="sede' + (s.main ? ' is-main' : '') + '">' +
        '<div class="main-flag' + (s.main ? '' : ' alt') + '">' + (s.main ? 'Sede principale' : 'Sede del gruppo') + '</div>' +
        '<div class="city">' + esc(s.city) + '</div>' +
        '<div class="co">' + esc(s.co) + '</div>' +
        '<address>' + esc(s.addr) + '</address>' +
        '<p class="sede-rec"><a href="tel:' + s.tel.replace(/\s/g, '') + '">' + esc(s.tel) + '</a>' +
        '<a href="mailto:' + s.mail + '">' + s.mail + '</a></p>' +
        a('/sedi/' + s.slug + '/', 'Vedi la sede', 'btn-link') + '</div>';
    }).join('') + '</div>';
  }

  /* Card macchina — UN SOLO disegno, riusato ovunque */
  function cardMacchina(m) {
    var img = m.img
      ? '<div class="card-media"><img src="' + BASE + 'assets/images/' + m.img + '" alt="' + esc(m.nome) + '"></div>'
      : '<div class="card-media ph ph-img">Prima immagine della galleria</div>';
    var tags = '';
    if (m.noleggio || m.usata) {
      tags = '<div class="tags">' +
        (m.noleggio ? '<span class="tag tag-nol">Noleggio</span>' : '') +
        (m.usata ? '<span class="tag tag-usa">Usato</span>' : '') + '</div>';
    }
    return '<article class="card">' + img + '<div class="card-body">' +
      '<span class="card-name">' + esc(m.nome) + '</span>' +
      (m.desc ? '<p class="card-desc">' + esc(m.desc) + '</p>' : '') + tags +
      '<a class="card-link" href="' + route(m.url) + '" data-url="' + m.url + '" title="' + m.url + '">Vedi</a>' +
      '</div></article>';
  }

  /* ======================================================================
     4 · NOTE DEV — richiami numerati + pannello. Zero impatto sul flusso.
     ====================================================================== */
  function initNote() {
    var notes = [].slice.call(document.querySelectorAll('.devnote'));
    if (!notes.length) return;

    var drawer = document.createElement('aside');
    drawer.className = 'dn-drawer';
    drawer.id = 'dn-drawer';
    drawer.setAttribute('hidden', '');
    drawer.innerHTML = '<div class="dn-drawer-head"><span class="dn-drawer-kicker">Nota per lo sviluppo</span>' +
      '<button type="button" class="dn-close" aria-label="Chiudi">×</button></div>' +
      '<div class="dn-drawer-body"></div>' +
      '<div class="dn-drawer-nav"><button type="button" data-step="-1">‹ Precedente</button>' +
      '<span class="dn-pos"></span><button type="button" data-step="1">Successiva ›</button></div>';
    document.body.appendChild(drawer);

    var store = document.createElement('div');
    store.style.display = 'none';
    document.body.appendChild(store);

    var data = [];

    notes.forEach(function (note, i) {
      /* blocco associato: il fratello precedente con classe .block */
      var blk = note.previousElementSibling;
      while (blk && blk.classList && !blk.classList.contains('block')) blk = blk.previousElementSibling;
      if (!blk) {
        var row = note.parentElement;
        blk = row ? row.querySelector('.block') : null;
      }

      var titolo = 'Nota ' + (i + 1);
      var extra = '';

      /* Sezione di sola documentazione: non è una parte del sito.
         Il suo contenuto passa nel pannello, la sezione sparisce dal flusso. */
      var docRow = note.closest && note.closest('.row.wf-doc');
      if (docRow && blk) {
        var bid0 = blk.querySelector('.block-id');
        if (bid0) titolo = bid0.textContent.replace(/\s+/g, ' ').trim();
        var clone = blk.cloneNode(true);
        var c0 = clone.querySelector('.block-id'); if (c0) c0.remove();
        extra = '<div class="dn-moved">' + clone.innerHTML + '</div>';
        docRow.parentNode.removeChild(docRow);
        blk = null;
      }

      if (blk) {
        var bid = blk.querySelector('.block-id');
        if (bid) { titolo = bid.textContent.replace(/\s+/g, ' ').trim(); bid.parentNode.removeChild(bid); }

        /* Tutto ciò che è annotazione esce dal flusso e finisce nel pannello,
           così la pagina ha ESATTAMENTE l'altezza che avrà il sito. */
        var moved = [];
        [].slice.call(blk.children).forEach(function (el) {
          if (el.matches && (el.matches('p.small') || el.matches('.notice') || el.matches('p.wordcount'))) moved.push(el);
          else if (el.tagName === 'P' && el.querySelector(':scope > .todo, :scope > .taskflag, :scope > .openpoint') &&
                   el.textContent.replace(/\s+/g, ' ').trim().length < 240) moved.push(el);
        });
        [].slice.call(blk.querySelectorAll('.wf-doc, p.wordcount')).forEach(function (el) {
          if (moved.indexOf(el) < 0) moved.push(el);
        });
        moved.forEach(function (el) { extra += '<div class="dn-moved">' + el.innerHTML + '</div>'; el.parentNode.removeChild(el); });

        var pin = document.createElement('button');
        pin.type = 'button';
        pin.className = 'dn-pin';
        pin.dataset.note = String(i);
        pin.textContent = String(i + 1);
        pin.title = titolo;
        pin.setAttribute('aria-label', 'Nota per lo sviluppo: ' + titolo);
        blk.appendChild(pin);
      }

      data.push({ titolo: titolo, html: extra + note.innerHTML });
      store.appendChild(note);
    });

    var cur = -1;
    function apri(i) {
      if (i < 0 || i >= data.length) return;
      cur = i;
      drawer.querySelector('.dn-drawer-kicker').textContent = data[i].titolo;
      drawer.querySelector('.dn-drawer-body').innerHTML = data[i].html;
      drawer.querySelector('.dn-pos').textContent = (i + 1) + ' / ' + data.length;
      drawer.removeAttribute('hidden');
      document.body.classList.add('dn-open');
      document.querySelectorAll('.dn-pin').forEach(function (p) {
        p.setAttribute('aria-current', p.dataset.note === String(i) ? 'true' : 'false');
      });
    }
    function chiudi() {
      drawer.setAttribute('hidden', '');
      document.body.classList.remove('dn-open');
      document.querySelectorAll('.dn-pin').forEach(function (p) { p.setAttribute('aria-current', 'false'); });
    }

    document.addEventListener('click', function (e) {
      var pin = e.target.closest && e.target.closest('.dn-pin');
      if (pin) { apri(parseInt(pin.dataset.note, 10)); return; }
      if (e.target.closest && e.target.closest('.dn-close')) { chiudi(); return; }
      var st = e.target.closest && e.target.closest('[data-step]');
      if (st && drawer.contains(st)) { apri(cur + parseInt(st.dataset.step, 10)); return; }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') chiudi(); });
    window.SOCAF_NOTE = { apri: apri, chiudi: chiudi, n: data.length };
  }

  /* ======================================================================
     5 · TEMPLATE DI CATALOGO alimentati dai dati reali
     ====================================================================== */
  function renderSottocategoria() {
    var host = document.querySelector('[data-tpl="sottocategoria"]');
    if (!host || !CAT) return;
    var key = param('sub') || 'lavapavimenti/lavapavimenti-uomo-terra';
    var s = CAT.SOTTO[key]; if (!s) { key = 'lavapavimenti/lavapavimenti-uomo-terra'; s = CAT.SOTTO[key]; }
    var fam = CAT.FAMIGLIE[s.fam];
    var list = CAT.MACCHINE[key] || [];
    var fratelli = CAT.sottoDiFamiglia(s.fam);
    FONTE = '/' + key + '/';

    set('[data-sub-crumb-fam]', a('/' + s.fam + '/', fam.nome));
    set('[data-sub-crumb]', esc(fam.nome + ' ' + s.nome.toLowerCase()));
    set('[data-sub-h1]', esc(s.h1));
    set('[data-sub-intro]', esc(fam.intro));
    set('[data-sub-h2]', 'Le ' + esc(fam.nome.toLowerCase()) + ' ' + esc(s.nome.toLowerCase()));
    set('[data-sub-list]', list.map(cardMacchina).join(''));
    set('[data-sub-count]', list.length + (list.length === 1 ? ' macchina' : ' macchine'));
    set('[data-sub-approf]', 'Come si sceglie: ' + esc(s.h1.toLowerCase()));
    set('[data-sub-faq-title]', 'Domande frequenti su ' + esc(s.nome.toLowerCase()));
    set('[data-sub-words]', s.lungo ? 'LUNGHEZZA PREVISTA · 400–600 PAROLE — una delle 8 sottocategorie con domanda misurabile'
                                    : 'LUNGHEZZA PREVISTA · 200–300 PAROLE — sottocategoria senza domanda misurabile');
    document.querySelectorAll('[data-sub-skel]').forEach(function (el, i) {
      el.dataset.lines = s.lungo ? [6, 7, 6, 7, 5][i % 5] : [5, 5, 4][i % 3];
      if (!s.lungo && i > 2) el.closest('[data-sub-par]') && el.closest('[data-sub-par]').remove();
    });
    set('[data-sub-siblings]', fratelli.map(function (f) {
      var t = CAT.SOTTO[f];
      return f === key ? '<span class="chip" aria-current="true">' + esc(t.nome) + '</span>'
                       : '<a class="chip" href="' + route('/' + f + '/') + '" data-url="/' + f + '/">' + esc(t.nome) + '</a>';
    }).join(''));
    set('[data-sub-siblings-title]', 'Le altre ' + esc(fam.nome.toLowerCase()));
    promo(fam, '[data-sub-promo]');
    document.title = 'D2 · ' + s.h1 + ' — Wireframe Socaf';
    setBar('/' + key + '/ · sottocategoria di ' + fam.nome);
  }

  function renderFamiglia() {
    var host = document.querySelector('[data-tpl="famiglia"]');
    if (!host || !CAT) return;
    var key = param('fam') || 'lavapavimenti';
    var f = CAT.FAMIGLIE[key]; if (!f) { key = 'lavapavimenti'; f = CAT.FAMIGLIE[key]; }
    var subs = CAT.sottoDiFamiglia(key);
    FONTE = '/' + key + '/';

    set('[data-fam-crumb]', esc(f.nome));
    set('[data-fam-h1]', esc(f.h1));
    set('[data-fam-intro]', esc(f.intro));
    set('[data-fam-h2]', 'Le tipologie di ' + esc(f.nome.toLowerCase()));
    set('[data-fam-subs]', subs.map(function (sk) {
      var s = CAT.SOTTO[sk], n = (CAT.MACCHINE[sk] || []).length;
      return '<article class="card"><div class="card-media ph ph-wide">Immagine sottocategoria</div>' +
        '<div class="card-body"><span class="card-name">' + esc(s.h1) + '</span>' +
        '<span class="card-meta">' + n + (n === 1 ? ' macchina' : ' macchine') + '</span>' +
        '<a class="card-link" href="' + route('/' + sk + '/') + '" data-url="/' + sk + '/">Vedi tutte</a></div></article>';
    }).join(''));
    /* Le più richieste: selezione commerciale Socaf — qui le prime della famiglia */
    var tutte = [];
    subs.forEach(function (sk) { tutte = tutte.concat(CAT.MACCHINE[sk] || []); });
    set('[data-fam-top]', tutte.slice(0, 6).map(cardMacchina).join(''));
    set('[data-fam-top-title]', 'Le ' + esc(f.nome.toLowerCase()) + ' più richieste');
    set('[data-fam-approf]', 'Come scegliere ' + (f.nome === 'Robot' ? 'un robot per la pulizia' : 'una ' + esc(f.nome.toLowerCase().replace(/i$/, 'e'))));
    set('[data-fam-words]', f.testoLungo ? 'LUNGHEZZA PREVISTA · 800–1200 PAROLE' : 'LUNGHEZZA PREVISTA · 250–350 PAROLE — testo breve, smistamento');
    set('[data-fam-others]', Object.keys(CAT.FAMIGLIE).map(function (k) {
      return k === key ? '<span class="chip" aria-current="true">' + esc(CAT.FAMIGLIE[k].nome) + '</span>'
                       : '<a class="chip" href="' + route('/' + k + '/') + '" data-url="/' + k + '/">' + esc(CAT.FAMIGLIE[k].nome) + '</a>';
    }).join(''));
    promo(f, '[data-fam-promo]');
    document.title = 'D3 · ' + f.h1 + ' — Wireframe Socaf';
    setBar('/' + key + '/ · una delle 6 famiglie');
  }

  function renderScheda() {
    var host = document.querySelector('[data-tpl="macchina"]');
    if (!host || !CAT) return;
    var url = param('m') || '/lavapavimenti/lavapavimenti-uomo-terra/lavapavimenti-socaf-la-511-40-bt/';
    var m = CAT.macchinaDaUrl(url);
    if (!m) return;
    var s = CAT.SOTTO[m.sub], f = CAT.FAMIGLIE[m.fam];
    var correlate = (CAT.MACCHINE[m.sub] || []).filter(function (x) { return x.url !== m.url; }).slice(0, 4);
    var reale = m.img ? true : false;

    set('[data-m-crumb-fam]', a('/' + m.fam + '/', f.nome));
    set('[data-m-crumb-sub]', a('/' + m.sub + '/', s.nome));
    set('[data-m-crumb]', esc(m.nome));
    set('[data-m-nome]', esc(m.nome));
    set('[data-m-desc]', esc(m.desc || ''));
    set('[data-m-correlate-title]', 'Altre ' + esc(f.nome.toLowerCase()) + ' ' + esc(s.nome.toLowerCase()));
    set('[data-m-correlate]', correlate.map(cardMacchina).join(''));
    set('[data-m-tags]',
      (m.noleggio ? '<span class="tag tag-nol">Disponibile a noleggio</span>' : '') +
      (m.usata ? '<span class="tag tag-usa">Disponibile usata</span>' : ''));
    set('[data-m-modello]', esc(m.nome));
    document.querySelectorAll('[data-m-if-nol]').forEach(function (e) { if (!m.noleggio) e.remove(); });
    document.querySelectorAll('[data-m-if-usa]').forEach(function (e) { if (!m.usata) e.remove(); });
    document.querySelectorAll('[data-m-nol-link]').forEach(function (e) {
      e.setAttribute('href', route('/noleggio/' + m.fam + '/')); e.dataset.url = '/noleggio/' + m.fam + '/';
    });
    document.querySelectorAll('[data-m-usa-link]').forEach(function (e) {
      var u = '/usato/' + (f.usato || '') + '/';
      e.setAttribute('href', route(u)); e.dataset.url = u;
    });
    if (!reale) document.querySelectorAll('[data-m-reale]').forEach(function (e) { e.remove(); });
    else document.querySelectorAll('[data-m-generico]').forEach(function (e) { e.remove(); });
    document.title = 'D1 · ' + m.nome + ' — Wireframe Socaf';
    setBar(m.url + ' · 1 delle 119 schede');
  }

  function promo(f, sel) {
    var el = document.querySelector(sel); if (!el) return;
    var h = '';
    if (f.noleggio) {
      h += '<div class="promo promo-nol"><span class="promo-mark"></span><h3>Si può noleggiare</h3>' +
        '<p>Formule brevi o pluriennali, assistenza e consegna incluse. Ritiro da tutte e cinque le sedi.</p>' +
        a('/noleggio/' + keyOf(f) + '/', 'Noleggio ' + f.nome.toLowerCase(), 'btn-link') + '</div>';
    }
    if (f.usato) {
      h += '<div class="promo promo-usa"><span class="promo-mark"></span><h3>Esiste anche usata</h3>' +
        '<p>Ricondizionate e garantite da 3 a 12 mesi, con supervalutazione della macchina che hai già.</p>' +
        a('/usato/' + f.usato + '/', f.nome + ' usate', 'btn-link') + '</div>';
    }
    if (!h) { var w = el.closest('.row') || el; w.remove(); return; }
    el.innerHTML = h;
  }
  function keyOf(f) {
    var out = '';
    Object.keys(CAT.FAMIGLIE).forEach(function (k) { if (CAT.FAMIGLIE[k] === f) out = k; });
    return out;
  }
  function set(sel, html) {
    document.querySelectorAll(sel).forEach(function (e) { e.innerHTML = html; });
  }
  function setBar(txt) {
    var b = document.querySelector('.devbar .dv-title span');
    if (b) b.textContent = '· ' + txt;
  }

  /* ======================================================================
     5b · TESTI REALI (testi.js, estratti da socaf.it) e ISTANZE
     Ogni segnaposto di testo riceve la sezione successiva della pagina
     socaf.it corrispondente. Dove socaf.it non ha testo: « Servono informazioni ».
     ====================================================================== */
  var TESTI = window.SOCAF_TESTI || {};
  var FONTE = null;           /* indirizzo socaf.it da cui vengono i testi della pagina */

  function testoHtml(b) {
    return (b || []).map(function (x) {
      return Array.isArray(x) ? '<ul>' + x.map(function (li) { return '<li>' + esc(li) + '</li>'; }).join('') + '</ul>'
                              : '<p>' + esc(x) + '</p>';
    }).join('');
  }
  function serveInfo(cosa) {
    return '<div class="need-info"><b>Servono informazioni</b><span>' + esc(cosa) + '</span></div>';
  }
  function sezioniDa(fonti) {
    var out = [];
    [].concat(fonti || []).forEach(function (f) {
      var k = typeof f === 'string' ? f : f.fonte, t = TESTI[k];
      if (!t) return;
      if (typeof f !== 'string' && f.h) out.push({ h: t.claim || f.h, b: [t.sub].filter(Boolean) });
      out = out.concat(t.s || []);
    });
    return out;
  }

  /* « Perché noleggiare » e simili: le ragioni numerate di socaf.it
     (« 1. Flessibilità », « 2. Costi iniziali ridotti »…) diventano le schede
     numerate del blocco, non un muro di testo. Le sezioni usate qui vengono
     tolte dall'elenco, così non si ripetono più sotto. */
  function renderRagioni(secs) {
    var box = document.querySelector('[data-why]');
    if (!box) return;
    var ragioni = [];
    for (var i = secs.length - 1; i >= 0; i--) {
      if (/^\s*\d+[.)]\s+/.test(secs[i].h || '')) ragioni.unshift(secs.splice(i, 1)[0]);
    }
    if (!ragioni.length) { box.outerHTML = serveInfo('Le ragioni per noleggiare: su socaf.it non c\'è un elenco.'); return; }
    /* Stessa forma degli altri testi lunghi: indice a sinistra, una ragione
       alla volta a destra. Qui l'indice è numerato. */
    var id = 'tt' + (nTabs++), nav = '', panes = '';
    ragioni.forEach(function (s, i) {
      var titolo = s.h.replace(/^\s*\d+[.)]\s*/, '');
      var n = (i < 9 ? '0' : '') + (i + 1);
      nav += '<button type="button" role="tab" id="' + id + 'b' + i + '" aria-controls="' + id + 'p' + i + '"' +
        ' aria-selected="' + (i ? 'false' : 'true') + '"><span class="t-num">' + n + '</span>' + esc(titolo) + '</button>';
      panes += '<div class="t-pane" role="tabpanel" id="' + id + 'p' + i + '" aria-labelledby="' + id + 'b' + i + '"' +
        (i ? ' hidden' : '') + '><span class="t-pane-num">' + n + '</span><h3>' + esc(titolo) + '</h3>' +
        '<div class="testo">' + testoHtml(s.b) + '</div></div>';
    });
    box.outerHTML = '<div class="t-tabs t-tabs--num">' +
      '<div class="t-nav" role="tablist" aria-label="Perché noleggiare">' + nav + '</div>' +
      '<div class="t-panes">' + panes + '</div></div>';
  }

  function riempiTesti() {
    var secs = sezioniDa(FONTE);
    renderRagioni(secs);
    document.querySelectorAll('.skel').forEach(function (el) {
      var faq = el.closest('.faq-body');
      if (faq) {
        var td = faq.querySelector('.todo'); if (td) td.remove();
        el.outerHTML = serveInfo('Risposta non presente su socaf.it: da scrivere con Socaf.');
        return;
      }
      var ul = el.closest('.strengths');
      if (ul) { if (!ul.dataset.fatto) { ul.dataset.fatto = '1'; ul.outerHTML = serveInfo('Punti di forza della macchina: da fornire (scheda tecnica del produttore).'); } return; }
      var h = el.previousElementSibling;
      if (h && !/^H[2-4]$/.test(h.tagName)) h = null;
      var s = secs.shift();
      if (s) {
        if (s.h) { if (h) h.textContent = s.h; else el.insertAdjacentHTML('beforebegin', '<h3>' + esc(s.h) + '</h3>'); }
        el.outerHTML = '<div class="testo">' + testoHtml(s.b) + '</div>';
      } else {
        el.outerHTML = serveInfo(h ? 'Su socaf.it non c\'è un testo per « ' + h.textContent.trim() + ' ».'
                                   : 'Su socaf.it non c\'è un testo per questo blocco.');
      }
    });
  }

  /* Istanze dei template D5, D7, D9, D11, D14: stesso impianto, contenuti propri */
  var ISTANZE = {
    settore: { param: 's', base: '/settori/', def: 'industria', lista: {
      'industria': { nome: 'Industria', h1: 'Macchine per la pulizia industriale', per: "l'industria", in: "nell'industria",
        approf: 'La pulizia nell\'industria', fonte: '/settore/macchine-per-la-pulizia-dedicate-all-industria/',
        subs: ['lavapavimenti/lavapavimenti-uomo-bordo', 'aspiratori/aspiratori-industriali', 'idropulitrici/idropulitrici-ad-acqua-calda', 'aspiratori/aspiratori-certificati-atex'],
        ref: ['amica-chips-s-p-a'] },
      'imprese-di-pulizia': { nome: 'Imprese di pulizia', h1: 'Macchine per la pulizia per imprese di pulizia', per: 'le imprese di pulizia', in: 'tra le imprese di pulizia',
        approf: 'Prodotti e servizi per le imprese di pulizia', fonte: '/settore/macchine-per-la-pulizia-dedicate-imprese-di-pulizia/',
        subs: ['lavapavimenti/lavapavimenti-uomo-terra', 'lavapavimenti/lavapavimenti-piccole', 'spazzatrici/spazzatrici-uomo-terra', 'altri-macchinari/monospazzole'],
        ref: ['progect-srl'] },
      'horeca': { nome: 'Ho.Re.Ca.', h1: 'Macchine per la pulizia nel settore Ho.Re.Ca.', per: "hotel, ristoranti e bar", in: "nell'Ho.Re.Ca.",
        approf: 'La pulizia di hotel, ristoranti e bar', fonte: '/settore/macchine-per-la-pulizia-dedicate-al-settore-horeca/',
        subs: ['lavapavimenti/lavapavimenti-piccole', 'lavapavimenti/i-mop', 'altri-macchinari/lavatappezzeria', 'altri-macchinari/generatori-di-vapore'],
        ref: ['lupo-srl'] },
      'retail': { nome: 'Retail', h1: 'Macchine per la pulizia nel settore retail', per: 'il retail e la GDO', in: 'nel retail',
        approf: 'La pulizia delle superfici di vendita', fonte: '/settore/macchine-per-la-pulizia-dedicate-al-settore-retail/',
        subs: ['lavapavimenti/lavapavimenti-uomo-terra', 'lavapavimenti/i-mop', 'robot/robot-lavapavimenti', 'spazzatrici/spazzatrici-uomo-terra'],
        ref: ['il-gigante', 'cisalfa'] },
      'logistica': { nome: 'Logistica', h1: 'Macchine per la pulizia nel settore logistica', per: 'la logistica', in: 'nella logistica',
        approf: 'La pulizia di capannoni e magazzini', fonte: '/settore/macchine-per-la-pulizia-dedicate-alla-logistica/',
        subs: ['lavapavimenti/lavapavimenti-uomo-bordo', 'spazzatrici/spazzatrici-uomo-bordo', 'robot/robot-spazzatrici', 'spazzatrici/spazzatrici-stradali'],
        ref: ['xpo-logistics'] },
      'officine-metalmeccanica': { nome: 'Officine e metalmeccanica', h1: 'Macchine per la pulizia di officine e metalmeccanica', per: 'officine e metalmeccanica', in: 'in officina',
        approf: 'La pulizia in officina', fonte: null, nuovo: true,
        subs: ['altri-macchinari/vasche-lavapezzi', 'aspiratori/aspiratori-per-olio-e-trucioli', 'idropulitrici/idropulitrici-ad-acqua-calda'], ref: [] },
      'edilizia-cantieri': { nome: 'Edilizia e cantieri', h1: 'Macchine per la pulizia in edilizia e cantieri', per: 'edilizia e cantieri', in: 'in cantiere',
        approf: 'La pulizia in cantiere', fonte: null, nuovo: true,
        subs: ['aspiratori/aspiratori-industriali', 'idropulitrici/idropulitrici-autonome', 'spazzatrici/spazzatrici-stradali'], ref: [] }
    }},
    noleggio: { param: 'fam', base: '/noleggio/', def: 'lavapavimenti', lista: {
      'lavapavimenti': { nome: 'Lavapavimenti', h1: 'Noleggio lavapavimenti e lavasciuga pavimenti', plur: 'lavapavimenti', sing: 'una lavapavimenti', famcat: 'lavapavimenti', usato: 'lavapavimenti-usate' },
      'idropulitrici': { nome: 'Idropulitrici', h1: 'Noleggio idropulitrici professionali', plur: 'idropulitrici', sing: "un'idropulitrice", famcat: 'idropulitrici', usato: 'idropulitrici-usate' },
      'spazzatrici': { nome: 'Spazzatrici', h1: 'Noleggio spazzatrici industriali', plur: 'spazzatrici', sing: 'una spazzatrice', famcat: 'spazzatrici', usato: 'spazzatrici-usate' },
      'lavamoquette': { nome: 'Lavamoquette', h1: 'Noleggio lavamoquette e lavatappezzeria', plur: 'lavamoquette', sing: 'una lavamoquette', famcat: 'altri-macchinari', usato: 'altri-macchinari-usati',
        subs: ['altri-macchinari/lavatappezzeria'] }
    }},
    usato: { param: 'u', base: '/usato/', def: 'lavapavimenti-usate', lista: {
      'lavapavimenti-usate': { nome: 'Lavapavimenti usate', h1: 'Lavapavimenti usate e lavasciuga industriali usate', sing: 'una lavapavimenti', famcat: 'lavapavimenti' },
      'idropulitrici-usate': { nome: 'Idropulitrici usate', h1: 'Idropulitrici usate', sing: "un'idropulitrice", famcat: 'idropulitrici' },
      'spazzatrici-usate': { nome: 'Spazzatrici usate', h1: 'Spazzatrici usate', sing: 'una spazzatrice', famcat: 'spazzatrici' },
      'aspiratori-usati': { nome: 'Aspiratori usati', h1: 'Aspiratori usati', sing: 'un aspiratore', famcat: 'aspiratori' },
      'altri-macchinari-usati': { nome: 'Altri macchinari usati', h1: 'Altri macchinari usati', sing: 'una macchina', famcat: 'altri-macchinari' }
    }},
    categoria: { param: 'c', base: '/prodotti-per-la-pulizia/', def: 'detergenti-pavimenti-parquet', lista: {
      'detergenti-pavimenti-parquet': { nome: 'Detergenti per pavimenti e parquet', h1: 'Detergente pavimenti professionale e detersivo per parquet', fonte: '/prodotti-per-la-pulizia/detergenti/', pdf: 'Catalogo Detergenti 2023' },
      'detergenti-enzimatici': { nome: 'Detergenti enzimatici', fonte: '/prodotti-per-la-pulizia/detergenti/', pdf: 'Catalogo Detergenti 2023' },
      'detergenti-disinfettanti': { nome: 'Detergenti disinfettanti e igienizzanti', fonte: '/prodotti-per-la-pulizia/detergenti/', pdf: 'Catalogo Detergenti 2023' },
      'detergenti-multiuso-sgrassanti': { nome: 'Detergenti multiuso e sgrassanti', fonte: '/prodotti-per-la-pulizia/detergenti/', pdf: 'Catalogo Detergenti 2023' },
      'detersivi-lavanderia-industriale': { nome: 'Detersivi per lavanderia industriale', fonte: null },
      'igiene-mani': { nome: 'Igiene mani', fonte: null },
      'carrelli-per-pulizie': { nome: 'Carrelli per pulizie', fonte: null },
      'attrezzature': { nome: 'Attrezzature', fonte: '/prodotti-per-la-pulizia/attrezzature/' },
      'panni-stracci-microfibra': { nome: 'Panni, stracci e microfibra', fonte: '/prodotti-per-la-pulizia/panni-e-spugne/' },
      'carta-e-dispenser': { nome: 'Carta e dispenser', fonte: ['/prodotti-per-la-pulizia/carta/', { fonte: '/prodotti-per-la-pulizia/dispenser/', h: 'Dispenser' }] },
      'sacchi': { nome: 'Sacchi', fonte: '/prodotti-per-la-pulizia/sacchi/' },
      'dispositivi-di-protezione-individuale': { nome: 'Dispositivi di protezione individuale', fonte: '/prodotti-per-la-pulizia/dispositivi-di-protezione-individuale/' },
      'ecolabel': { nome: 'Ecolabel', fonte: '/prodotti-per-la-pulizia/ecolabel/' }
    }},
    sede: { param: 'sede', base: '/sedi/', def: 'osio-sotto', lista: {} }
  };
  SEDI.forEach(function (s) { ISTANZE.sede.lista[s.slug] = { nome: s.city, h1: (s.co === 'Socaf S.p.A.' ? 'Socaf ' : s.co + ', ') + s.city, sede: s }; });

  var REFERENZE = {
    'amica-chips-s-p-a': { nome: 'Amica Chips', settore: 'industria', desc: 'Industria alimentare' },
    'cisalfa': { nome: 'Cisalfa Sport', settore: 'retail', desc: 'Retail · articoli sportivi' },
    'il-gigante': { nome: 'Il Gigante', settore: 'retail', desc: 'Grande distribuzione' },
    'lupo-srl': { nome: 'Lupo S.r.l.', settore: 'horeca', desc: 'Ristorazione' },
    'progect-srl': { nome: 'Progect S.r.l.', settore: 'imprese-di-pulizia', desc: 'Facility management' },
    'xpo-logistics': { nome: 'XPO Logistics', settore: 'logistica', desc: 'Logistica' }
  };
  function cardReferenza(k) {
    var r = REFERENZE[k], t = TESTI['/referenze/' + k + '/'];
    return '<article class="card"><div class="card-media ph ph-wide">Logo cliente</div><div class="card-body">' +
      '<span class="card-name">' + esc(r.nome) + '</span><p class="card-desc">' + esc(r.desc) + '</p>' +
      a('/azienda/referenze/' + k + '/', 'Vedi', 'card-link') + '</div></article>';
  }

  function tpl(s, v) { return s.replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); }

  function renderIstanza(tipo) {
    var I = ISTANZE[tipo], key = param(I.param) || I.def, v = I.lista[key];
    if (!v) { key = I.def; v = I.lista[key]; }
    v.h1 = v.h1 || v.nome;
    v.Nome = v.Nome || (v.plur ? v.plur.charAt(0).toUpperCase() + v.plur.slice(1) : v.nome);
    if (v.famcat && CAT && CAT.FAMIGLIE[v.famcat]) {
      var n = 0; CAT.sottoDiFamiglia(v.famcat).forEach(function (sk) { n += (CAT.MACCHINE[sk] || []).length; });
      v.catalogo = 'Le ' + n + ' ' + CAT.FAMIGLIE[v.famcat].nome.toLowerCase() + ' del catalogo, divise in ' + CAT.sottoDiFamiglia(v.famcat).length + ' tipologie.';
      if (tipo === 'usato') v.Nome = CAT.FAMIGLIE[v.famcat].nome;
    }
    v.approf = v.approf || 'Come si sceglie: ' + v.nome.toLowerCase();
    v.pdf = v.pdf || 'Catalogo ' + v.nome;

    /* intestazione */
    var h1 = document.querySelector('h1'); if (h1) h1.textContent = v.h1;
    var cr = document.querySelector('.crumbs [aria-current]'); if (cr) cr.textContent = tipo === 'noleggio' ? 'Noleggio ' + v.plur : v.nome;
    document.title = document.title.replace(/^(D\d+) · .*? — /, '$1 · ' + v.h1 + ' — ');
    setBar(I.base + key + '/');
    document.querySelectorAll('[data-hidden-field]').forEach(function (e) {
      e.dataset.hiddenField = e.dataset.hiddenField.split('|')[0] + '|' + v.h1;
    });

    /* testi: fonte socaf.it della singola istanza */
    if (tipo === 'settore' || tipo === 'categoria') FONTE = v.fonte;
    if (tipo === 'usato') FONTE = '/usato/' + key + '/';
    var lede = document.querySelector('.lede');
    var src = FONTE && TESTI[[].concat(FONTE)[0]];
    if (lede && key !== I.def) {
      if (src && src.sub) lede.textContent = src.sub;
      else if (tipo !== 'sede') lede.outerHTML = serveInfo('Testo introduttivo per « ' + v.h1 + ' »: su socaf.it la pagina non esiste' + (v.nuovo ? ' (settore nuovo).' : '.'));
    }

    document.querySelectorAll('[data-t]').forEach(function (e) { e.textContent = tpl(e.dataset.t, v); });
    document.querySelectorAll('[data-url-t]').forEach(function (e) { e.dataset.url = tpl(e.dataset.urlT, v); });
    document.querySelectorAll('[data-solo]').forEach(function (e) {
      if (e.dataset.solo !== key) e.outerHTML = serveInfo(e.dataset.soloInfo || 'Contenuto da fornire.');
    });

    /* macchine */
    var grid = document.querySelector('[data-grid]');
    if (grid && CAT) {
      var subs = v.subs || (v.famcat ? CAT.sottoDiFamiglia(v.famcat) : []), list = [];
      subs.forEach(function (sk) { list = list.concat((CAT.MACCHINE[sk] || []).slice(0, tipo === 'settore' ? 2 : 1)); });
      if (tipo === 'noleggio' || tipo === 'usato') { list = []; subs.forEach(function (sk) { list = list.concat(CAT.MACCHINE[sk] || []); }); }
      grid.innerHTML = list.slice(0, 8).map(cardMacchina).join('');
    }
    /* referenze del settore */
    var rg = document.querySelector('[data-referenze]');
    if (rg) {
      if (v.ref && v.ref.length) rg.innerHTML = v.ref.map(cardReferenza).join('');
      else { var rw = rg.closest('.row'); if (rw) rw.remove(); }
    }
    /* le altre istanze */
    var ch = document.querySelector('[data-altri]');
    if (ch) {
      var extra = [].slice.call(ch.querySelectorAll('.is-open')).map(function (e) { return e.outerHTML; }).join('');
      ch.innerHTML = Object.keys(I.lista).map(function (k) {
        return k === key ? '<span class="chip" aria-current="true">' + esc(I.lista[k].nome) + '</span>'
                         : '<a class="chip" href="' + route(I.base + k + '/') + '" data-url="' + I.base + k + '/">' + esc(I.lista[k].nome) + '</a>';
      }).join('') + extra;
    }
    /* sede */
    if (v.sede) {
      var s = v.sede, m = document.querySelector('[data-sede-main]');
      if (m && !s.main) m.remove();
      var ad = document.querySelector('[data-sede-addr]');
      if (ad) ad.innerHTML = esc(s.co) + '<br>' + s.addr.split(/, (?=\d{5})/).map(esc).join('<br>') + '<br>Italia';
      var te = document.querySelector('[data-sede-tel]');
      if (te) te.innerHTML = '<a href="tel:' + s.tel.replace(/\s/g, '') + '">' + esc(s.tel) + '</a><br><a href="mailto:' + s.mail + '">' + s.mail + '</a>';
      var sc = document.querySelector('[data-sedi-corrente]'); if (sc) sc.dataset.sedi = s.slug;
    }
  }

  /* D20 — pagine di Servizi e Azienda */
  var PAGINE = {
    '/servizi/': { h1: 'Servizi', fonte: '/servizi/', sez: 'Servizi', corpo: false,
      figli: ['/servizi/pronto-intervento/', '/servizi/consulenza-tecnica/', '/servizi/soluzioni-finanziarie/', '/servizi/supervalutazione-dell-usato/'] },
    '/servizi/pronto-intervento/': { fonte: '/servizi/pronto-intervento/', sez: 'Servizi', macchine: true, sedi: true, form: 'Richiedi un intervento' },
    '/servizi/consulenza-tecnica/': { fonte: '/servizi/consulenza-tecnica/', sez: 'Servizi', macchine: true, sedi: true, form: 'Richiedi una consulenza' },
    '/servizi/soluzioni-finanziarie/': { fonte: '/servizi/soluzioni-finanziarie/', sez: 'Servizi', form: 'Richiedi maggiori informazioni' },
    '/servizi/supervalutazione-dell-usato/': { h1: "Supervalutazione dell'usato", fonte: '/servizi/supervalutazione-dell-usato/', sez: 'Servizi', form: 'Richiedi la supervalutazione del tuo usato' },
    '/azienda/': { h1: 'Azienda', sez: 'Azienda', corpo: false, lede: 'Chi siamo, come lavoriamo, per chi lavoriamo.',
      figli: ['/azienda/chi-siamo/', '/azienda/innovazione-tecnologica/', '/azienda/il-nostro-impegno/', '/azienda/referenze/', '/azienda/lavora-con-noi/'] },
    '/azienda/chi-siamo/': { h1: 'Chi siamo', fonte: ['/socaf/', { fonte: '/aziende/', h: 'Socaf, Bottoni e Tecno Clean' }], sez: 'Azienda', sedi: true, form: 'Richiedi maggiori informazioni' },
    '/azienda/innovazione-tecnologica/': { fonte: '/servizi/innovazione-tecnologica/', sez: 'Azienda', form: 'Richiedi maggiori informazioni' },
    '/azienda/il-nostro-impegno/': { fonte: '/il-nostro-impegno/', sez: 'Azienda' },
    '/azienda/lavora-con-noi/': { h1: 'Lavora con noi', fonte: ['/careers/', { fonte: '/lavora-con-noi/', h: 'Candidati' }], sez: 'Azienda', form: 'Invia la tua candidatura' },
    '/azienda/referenze/': { h1: 'Referenze', sez: 'Azienda', corpo: false, referenze: true,
      lede: 'Alcune delle aziende che hanno scelto Socaf per le macchine, i prodotti e l\'assistenza.' }
  };
  Object.keys(REFERENZE).forEach(function (k) {
    PAGINE['/azienda/referenze/' + k + '/'] = { h1: REFERENZE[k].nome, fonte: '/referenze/' + k + '/', sez: 'Azienda', ref: k };
  });

  function renderPagina() {
    if (!document.body || document.body.dataset.tpl !== 'pagina') return;
    var url = param('p') || '/servizi/pronto-intervento/', P = PAGINE[url];
    if (!P) { url = '/servizi/pronto-intervento/'; P = PAGINE[url]; }
    var fonti = [].concat(P.fonte || []), t0 = TESTI[typeof fonti[0] === 'string' ? fonti[0] : ''] || {};
    var h1 = P.h1 || t0.t || '';
    var sezUrl = P.sez === 'Servizi' ? '/servizi/' : '/azienda/';

    /* breadcrumbs */
    var cr = a('/', 'Home') + '<span class="sep">/</span>';
    if (url !== sezUrl) cr += a(sezUrl, P.sez) + '<span class="sep">/</span>';
    if (P.ref) cr += a('/azienda/referenze/', 'Referenze') + '<span class="sep">/</span>';
    set('[data-p-crumbs]', cr + '<span aria-current="page">' + esc(h1) + '</span>');
    set('[data-p-h1]', esc(h1));
    var lede = P.lede || t0.sub;
    var ld = document.querySelector('[data-p-lede]');
    if (ld && t0.claim && !P.lede) ld.insertAdjacentHTML('beforebegin', '<p class="claim">' + esc(t0.claim) + '</p>');
    if (ld) { if (lede) ld.textContent = lede; else ld.outerHTML = serveInfo('Testo introduttivo: da fornire.'); }
    if (ld && t0.claim && !P.lede) ld.insertAdjacentHTML('beforebegin', '<p class="claim">' + esc(t0.claim) + '</p>');

    /* corpo */
    var secs = sezioniDa(P.fonte);
    if (P.corpo === false) drop('corpo');
    else set('[data-p-corpo]', secs.length ? secs.map(function (s) {
      return (s.h ? '<h2>' + esc(s.h) + '</h2>' : '') + '<div class="testo">' + testoHtml(s.b) + '</div>';
    }).join('') + (P.ref ? '<p class="small">Settore: ' + a('/settori/' + REFERENZE[P.ref].settore + '/', ISTANZE.settore.lista[REFERENZE[P.ref].settore].nome) + '</p>' : '')
      : serveInfo('Su socaf.it questa pagina ha solo il testo di apertura: il resto è da fornire.'));

    /* elenco */
    if (P.figli) {
      set('[data-p-elenco]', P.figli.map(function (f) {
        var Q = PAGINE[f], t = TESTI[[].concat(Q.fonte || [])[0]] || {};
        var nome = Q.h1 || t.t || f, desc = Q.lede || t.sub || '';
        if (desc.length > 170) desc = desc.slice(0, 167).replace(/\s+\S*$/, '') + '…';
        return '<article class="card"><div class="card-media ph ph-wide">Immagine</div><div class="card-body">' +
          '<span class="card-name">' + esc(nome) + '</span><p class="card-desc">' + esc(desc) + '</p>' +
          a(f, 'Vedi', 'card-link') + '</div></article>';
      }).join(''));
    } else if (P.referenze) {
      var el = document.querySelector('[data-p-elenco]'); if (el) el.className = 'grid grid-3';
      set('[data-p-elenco]', Object.keys(REFERENZE).map(cardReferenza).join(''));
    } else drop('elenco');

    if (!P.macchine) drop('macchine');
    if (!P.sedi) drop('sedi');
    if (!P.form) drop('form'); else set('[data-p-form]', esc(P.form));
    document.querySelectorAll('[data-p-hidden]').forEach(function (e) { e.dataset.hiddenField = 'pagina di provenienza|' + h1; });

    var hd = document.querySelector('[data-header]'); if (hd) hd.dataset.header = P.sez;
    document.title = 'D20 · ' + h1 + ' — Wireframe Socaf';
    setBar(url + (P.fonte ? ' · testi da socaf.it' + [].concat(P.fonte).map(function (f) { return ' ' + (f.fonte || f); }).join(' +') : ''));
    function drop(n) { var r = document.querySelector('[data-p-if="' + n + '"]'); if (r) r.remove(); }
  }

  /* Testi lunghi → pannello a schede: indice dei titoli a sinistra, un solo
     contenuto alla volta a destra. Su mobile l'indice è una fila di pillole.
     Si applica a ogni blocco con almeno due sezioni (titolo + testo). */
  var nTabs = 0;
  function schedeTesti() {
    document.querySelectorAll('section.block').forEach(function (blk) {
      var pezzi = [].slice.call(blk.querySelectorAll('.testo, .need-info')).filter(function (el) {
        return !el.closest('.faq, .form, .t-tabs, .grid, .hero, .why');
      });
      if (pezzi.length < 2) return;
      var id = 'tt' + (nTabs++);
      var box = document.createElement('div');
      box.className = 't-tabs';
      var first = pezzi[0].previousElementSibling && /^H[23]$/.test(pezzi[0].previousElementSibling.tagName) ? pezzi[0].previousElementSibling : pezzi[0];
      first.parentNode.insertBefore(box, first);
      var nav = '<div class="t-nav" role="tablist" aria-label="Argomenti">', panes = '';
      var nodi = [];
      pezzi.forEach(function (el, i) {
        var h = el.previousElementSibling, titolo = 'Approfondimento ' + (i + 1);
        if (h && /^H[23]$/.test(h.tagName)) { titolo = h.textContent.trim(); h.remove(); }
        nav += '<button type="button" role="tab" id="' + id + 'b' + i + '" aria-controls="' + id + 'p' + i + '" aria-selected="' + (i ? 'false' : 'true') + '"' +
          (el.classList.contains('need-info') ? ' class="is-vuoto"' : '') + '>' + esc(titolo) + '</button>';
        panes += '<div class="t-pane" role="tabpanel" id="' + id + 'p' + i + '" aria-labelledby="' + id + 'b' + i + '"' + (i ? ' hidden' : '') + '>' +
          '<h3>' + esc(titolo) + '</h3></div>';
        nodi.push(el);
      });
      box.innerHTML = nav + '</div><div class="t-panes">' + panes + '</div>';
      var pp = box.querySelectorAll('.t-pane');
      nodi.forEach(function (el, i) { pp[i].appendChild(el); });
      [].slice.call(blk.querySelectorAll('[data-sub-par]')).forEach(function (w) { if (!w.children.length) w.remove(); });
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.t-nav [role=tab]'); if (!b) return;
      var box = b.closest('.t-tabs');
      box.querySelectorAll('[role=tab]').forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
      box.querySelectorAll('.t-pane').forEach(function (p) { p.hidden = p.id !== b.getAttribute('aria-controls'); });
      if (b.parentNode.scrollWidth > b.parentNode.clientWidth) b.parentNode.scrollTo({ left: b.offsetLeft - 8, behavior: 'smooth' });
    });
    document.addEventListener('keydown', function (e) {
      var b = e.target.closest && e.target.closest('.t-nav [role=tab]'); if (!b) return;
      var d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (!d) return;
      e.preventDefault();
      var all = [].slice.call(b.parentNode.children), n = all[(all.indexOf(b) + d + all.length) % all.length];
      n.focus(); n.click();
    });
  }

  /* Linguaggio visivo della VI: fondo luminoso, due bolle e fasce alternate.
     Le bolle sono l'immagine fornita dal cliente (assets/bolla.webp): due sole,
     molto tenui, per richiamare la copertina della Visual Identity.

*/
  function decoraVI() {
    document.body.insertAdjacentHTML('afterbegin', '<div class="vi-bg" aria-hidden="true"><span class="vi-bolla b1"></span><span class="vi-bolla b2"></span></div>');
    var tipi = ['frost', 'contour', 'ribbed'], k = 0;
    [].slice.call(document.querySelectorAll('.wrap > .row')).forEach(function (r, i) {
      if (i === 0 || i % 3 !== 1 || r.classList.contains('wf-doc')) return;
      r.classList.add('vi-band', 'vi-band--' + tipi[k++ % 3]);
    });
  }

  /* ======================================================================
     6 · MONTAGGIO
     ====================================================================== */
  function boot() {
    var body = document.body;

    var bar = document.querySelector('[data-devbar]');
    if (bar) {
      bar.className = 'devbar';
      bar.innerHTML = '<div class="dv-title">' + (bar.dataset.code || '') + ' · ' + (bar.dataset.name || '') +
        ' <span>· ' + (bar.dataset.url || '') + '</span></div>' +
        '<div class="dv-actions"><a class="dv-btn" href="' + BASE + 'index.html">Tutti i template</a>' +
        '<button type="button" id="toggle-notes" aria-pressed="false">Mostra note DEV</button></div>';
    }

    FONTE = body.dataset.fonte || null;
    renderPagina();
    if (body.dataset.istanza) renderIstanza(body.dataset.istanza);
    renderSottocategoria();
    renderFamiglia();
    renderScheda();

    var hd = document.querySelector('[data-header]');
    if (hd) { hd.className = 'site-header'; hd.innerHTML = header(); }

    /* L'header si ferma sotto la barra DEV, così la riga di servizio
       (Pronto intervento · Approfondimenti · Cerca) resta sempre visibile. */
    function misuraBarre() {
      var d = document.querySelector('.devbar'), h = document.querySelector('.site-header');
      document.documentElement.style.setProperty('--devbar-h', (d ? d.offsetHeight : 0) + 'px');
      if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
    }
    misuraBarre();
    window.addEventListener('resize', misuraBarre);

    document.querySelectorAll('[data-sedi]').forEach(function (el) { el.innerHTML = blocoSedi(el.dataset.sedi); });
    document.querySelectorAll('[data-hidden-field]').forEach(function (el) {
      var p = el.dataset.hiddenField.split('|');
      el.outerHTML = '<div class="hidden-field">Campo nascosto — <b>' + p[0] + '</b>: ' + p[1] + '</div>';
    });

    riempiTesti();
    schedeTesti();
    decoraVI();

    /* Ogni link interno punta al wireframe dell'indirizzo reale, istanza compresa */
    document.querySelectorAll('a[data-url]').forEach(function (el) {
      if (el.dataset.url.charAt(0) === '/') el.setAttribute('href', route(el.dataset.url));
    });

    var ft = document.querySelector('[data-footer]');
    if (ft) { ft.className = 'site-footer'; ft.innerHTML = footer(); }

    initNote();

    /* ---- interazioni ---- */
    document.addEventListener('click', function (e) {
      var t = e.target;
      var dd = t.closest && t.closest('[data-dd]');
      if (dd) {
        var panel = document.getElementById(dd.dataset.dd);
        var open = panel.dataset.open === 'true';
        closeDrops();
        if (!open) { panel.dataset.open = 'true'; dd.setAttribute('aria-expanded', 'true'); }
        return;
      }
      if (!t.closest || !t.closest('.dropdown')) closeDrops();

      var acc = t.closest && t.closest('[data-acc]');
      if (acc) {
        var b = document.getElementById(acc.dataset.acc), o = b.dataset.open === 'true';
        b.dataset.open = o ? 'false' : 'true';
        acc.setAttribute('aria-expanded', o ? 'false' : 'true');

        return;
      }

      if (t.closest && t.closest('.burger')) {
        var mp = document.getElementById('mobnav'), mo = mp.dataset.open === 'true';
        mp.dataset.open = mo ? 'false' : 'true';
        var bt = t.closest('.burger');
        bt.setAttribute('aria-expanded', mo ? 'false' : 'true');
        bt.textContent = mo ? 'Menu' : 'Chiudi';
        return;
      }

      if (t.id === 'toggle-notes') {
        var on = body.classList.toggle('notes-on');
        t.setAttribute('aria-pressed', on ? 'true' : 'false');
        t.textContent = on ? 'Nascondi note DEV' : 'Mostra note DEV';
        if (!on && window.SOCAF_NOTE) window.SOCAF_NOTE.chiudi();
        try { localStorage.setItem('socaf-wf-notes', on ? 'on' : 'off'); } catch (err) {}
        return;
      }

      var th = t.closest && t.closest('.thumb');
      if (th && th.tagName === 'BUTTON') {
        var g = th.closest('[data-gallery]');
        g.querySelectorAll('.thumb').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        th.setAttribute('aria-selected', 'true');
        var main = g.querySelector('.gallery-main img'), src = th.querySelector('img');
        if (main && src) { main.src = src.src; main.alt = src.alt; }
      }
    });

    function closeDrops() {
      document.querySelectorAll('.dropdown').forEach(function (p) { p.dataset.open = 'false'; });
      document.querySelectorAll('[data-dd]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrops(); });

    document.querySelectorAll('form[data-search]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var q = f.querySelector('input').value.trim();
        location.href = route('/?s=') + (q ? '?q=' + encodeURIComponent(q) : '');
      });
    });
    document.querySelectorAll('form[data-demo-form]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var m = f.querySelector('[data-form-msg]');
        if (m) m.textContent = 'Wireframe: il form non invia. In produzione → Elementor Pro Form.';
      });
    });

    try {
      if (localStorage.getItem('socaf-wf-notes') === 'on') {
        body.classList.add('notes-on');
        var tb = document.getElementById('toggle-notes');
        if (tb) { tb.setAttribute('aria-pressed', 'true'); tb.textContent = 'Nascondi note DEV'; }
      }
    } catch (err) {}

    var qEl = document.querySelector('[data-query]');
    if (qEl) {
      var mq = location.search.match(/[?&]q=([^&]*)/);
      var q = mq ? decodeURIComponent(mq[1].replace(/\+/g, ' ')) : '';
      if (q) {
        document.querySelectorAll('[data-query]').forEach(function (e) { e.textContent = q; });
        document.querySelectorAll('input[data-query-input]').forEach(function (i) { i.value = q; });
        var vuoto = /^(zzz|xxx|nessun)/i.test(q);
        var full = document.querySelector('[data-results-full]'), empty = document.querySelector('[data-results-empty]');
        if (full && empty) { full.hidden = vuoto; empty.hidden = !vuoto; }
      }
    }
  }

  function avvia() {
    boot();
    /* La pagina si mostra solo a montaggio finito: niente comparsa a pezzi */
    document.body.classList.add('wf-pronto');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia);
  else avvia();

  window.SOCAF = { route: route, link: a, SEDI: SEDI, MENU: MENU, NUMERO_VERDE: NUMERO_VERDE, BASE: BASE, cardMacchina: cardMacchina };
})();
