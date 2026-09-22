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
    { slug:'osio-sotto', city:'Osio Sotto', co:'Socaf S.p.A.', addr:'Via Trieste, 14 — 24046 Osio Sotto (BG)', tel:'+39 035 4876054', mail:'info@socaf.it', main:true },
    { slug:'brescia', city:'Brescia', co:'Socaf S.p.A.', addr:'Via dei Ponticelli, 47 — 25014 Castenedolo (BS)', tel:'+39 030 2732674', mail:'info@socaf.it' },
    { slug:'milano', city:'Milano', co:'Socaf S.p.A.', addr:'Via De Gasperi, 120 — 20017 Mazzo di Rho (MI)', tel:'+39 02 93904406', mail:'info@socaf.it' },
    { slug:'verona', city:'Verona', co:'Bottoni S.r.l.', addr:'Via E. Fermi, 1 — 37026 Settimo di Pescantina (VR)', tel:'+39 045 6702122', mail:'info@bottonisrl.it' },
    { slug:'pordenone', city:'Pordenone', co:'Tecno Clean S.r.l.', addr:'Via Nicola Calipari, 7 — 33084 Cordenons (PN)', tel:'+39 0434 540188', mail:'info@tecno-clean.it' }
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
    if (/^\/(servizi|azienda)\//.test(p)) return BASE + 'wireframes/18-pagine-restanti.html';
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
          m.label + '<span class="caret">▾</span></button>' +
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
        h += '<div class="acc"><button type="button" data-acc="macc' + i + '" aria-expanded="false">' + m.label + '<span>+</span></button>' +
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
    return '<div class="wrap"><div class="footer-grid">' +
      '<div><h4>Le cinque sedi</h4><ul>' +
      SEDI.map(function (s) { return '<li>' + a('/sedi/' + s.slug + '/', s.city + (s.main ? ' — sede principale' : '')) + '</li>'; }).join('') +
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
      '<li>' + a('https://www.aquarial.it/', 'Aquarial — raffrescamento') + '</li>' +
      '<li>' + a('https://www.caldofacile.it/', 'Caldofacile — riscaldamento') + '</li></ul>' +
      '<h4 style="margin-top:22px">Recapiti</h4><p class="small" style="margin:0">Numero verde <b>' + NUMERO_VERDE + '</b><br>info@socaf.it</p></div>' +
      '</div><div class="footer-legal">' +
      '<span>Socaf S.p.A. — Via Trieste, 14 — 24046 Osio Sotto (BG) — P. IVA IT 01331640167</span>' +
      '<a href="#">Privacy policy</a><a href="#">Cookie policy</a><a href="#">Whistleblowing</a></div></div>';
  }

  function blocoSedi(escludi) {
    return '<div class="sedi">' + SEDI.filter(function (s) { return s.slug !== escludi; }).map(function (s) {
      return '<div class="sede' + (s.main ? ' is-main' : '') + '">' +
        (s.main ? '<div class="main-flag">Sede principale</div>' : '') +
        '<div class="city">' + s.city + '</div><div class="co">' + s.co + '</div>' +
        '<address>' + s.addr + '<br>' + s.tel + '</address>' +
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

    var hd = document.querySelector('[data-header]');
    if (hd) { hd.className = 'site-header'; hd.innerHTML = header(); }

    renderSottocategoria();
    renderFamiglia();
    renderScheda();

    document.querySelectorAll('[data-sedi]').forEach(function (el) { el.innerHTML = blocoSedi(el.dataset.sedi); });
    document.querySelectorAll('[data-hidden-field]').forEach(function (el) {
      var p = el.dataset.hiddenField.split('|');
      el.outerHTML = '<div class="hidden-field">Campo nascosto — <b>' + p[0] + '</b>: ' + p[1] + '</div>';
    });

    document.querySelectorAll('.skel').forEach(function (el) {
      var n = parseInt(el.dataset.lines || '6', 10), out = '';
      for (var i = 0; i < n; i++) out += '<i style="width:' + (88 + ((i * 37) % 12)) + '%"></i>';
      el.innerHTML = out;
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
        acc.querySelector('span').textContent = o ? '+' : '–';
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.SOCAF = { route: route, link: a, SEDI: SEDI, MENU: MENU, NUMERO_VERDE: NUMERO_VERDE, BASE: BASE, cardMacchina: cardMacchina };
})();
