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
    var logo = BASE + 'assets/logo/socaf21-payoff-rgb-white.svg';   /* logo bianco nella barra di navigazione */
    var h = '<div class="topbar"><div class="wrap">' +
      a('/servizi/pronto-intervento/', 'Pronto intervento') + a('/news/', 'Approfondimenti') +
      '</div></div><div class="hdr-shell">';

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

    h += '</ul><a class="hdr-search" href="' + route('/?s=') + '" data-url="/?s=" title="Cerca · /?s=" aria-label="Cerca"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg></a><a class="phone-cta" href="tel:800480110"><span class="lbl">Numero verde</span>' + NUMERO_VERDE + '</a>' +
      '<button class="burger" type="button" aria-expanded="false" aria-controls="mobnav">Menu</button></div></div></div>';

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
    /* testi, recapiti, link legali e social: come il footer di socaf.it (verificato il 01/10/2026) */
    var SOCIAL = [
      ['Facebook', 'https://www.facebook.com/socafspa/', '<path d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.6V21z"/>'],
      ['X (Twitter)', 'https://twitter.com/SocafSpa', '<path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.3 4.7H5.5z"/>'],
      ['Instagram', 'https://www.instagram.com/socaf_spa/', '<path fill-rule="evenodd" d="M7.8 2.5h8.4a5.3 5.3 0 0 1 5.3 5.3v8.4a5.3 5.3 0 0 1-5.3 5.3H7.8a5.3 5.3 0 0 1-5.3-5.3V7.8a5.3 5.3 0 0 1 5.3-5.3zm0 1.9a3.4 3.4 0 0 0-3.4 3.4v8.4a3.4 3.4 0 0 0 3.4 3.4h8.4a3.4 3.4 0 0 0 3.4-3.4V7.8a3.4 3.4 0 0 0-3.4-3.4zM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4zm0 1.9a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zm5-3.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/>'],
      ['LinkedIn', 'https://it.linkedin.com/company/socaf-s-p-a-', '<path d="M4.4 9.1h3.2V20H4.4zM6 3.8a1.85 1.85 0 1 1 0 3.7 1.85 1.85 0 0 1 0-3.7zM9.8 9.1h3.1v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20h-3.2v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H9.8z"/>'],
      ['YouTube', 'https://www.youtube.com/user/SOCAFspa', '<path fill-rule="evenodd" d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15.1V8.9l5.3 3.1z"/>']
    ];
    var social = '<div class="f-social"><h4>Seguici su</h4><ul>' + SOCIAL.map(function (s) {
      return '<li><a href="' + s[1] + '" target="_blank" rel="noopener" aria-label="Socaf su ' + s[0] + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + s[2] + '</svg></a></li>';
    }).join('') + '</ul></div>';
    return '<div class="wrap"><div class="footer-brand">' +
      '<p>Specialista in soluzioni per il cleaning professionale<br>e per la qualità degli ambienti di lavoro.</p>' +
      '</div>' +
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
      '<li>' + a('/contatti/', 'Contatti') + '</li>' +
      '<li>' + a('/azienda/lavora-con-noi/', 'Lavora con noi · posizioni aperte') + '</li></ul></div>' +
      '<div><h4>I marchi del gruppo</h4><ul>' +
      '<li>' + a('https://www.aquarial.it/', 'Aquarial <span class="f-tag">raffrescamento</span>') + '</li>' +
      '<li>' + a('https://www.caldofacile.it/', 'Caldofacile <span class="f-tag">riscaldamento</span>') + '</li></ul>' +
      '<h4 style="margin-top:22px">Recapiti</h4><p class="small" style="margin:0">Numero verde <b>' + NUMERO_VERDE + '</b><br>info@socaf.it</p>' + social + '</div>' +
      '</div><div class="footer-legal">' +
      '<div class="f-links">' +
      '<a href="https://socaf.it/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>' +
      '<a href="https://socaf.it/cookie-policy/" target="_blank" rel="noopener">Cookie Policy</a>' +
      '<a href="https://socafspa.wallbreakers.it/" target="_blank" rel="noopener">Whistleblowing</a>' +
      '<a href="https://www.datocms-assets.com/60899/1715936223-politica-per-la-qualita.pdf" target="_blank" rel="noopener">Politica per la Qualità</a>' +
      '<a href="https://www.datocms-assets.com/60899/1734692553-socaf-s-p-a.pdf" target="_blank" rel="noopener">ISO 9001</a></div>' +
      '<p class="f-societa">Socaf S.p.A. – Via Trieste, 14 – 24046 Osio Sotto (BG) – Cap. Soc. € 1.000.000,00 i.v. – REA BG 197182 – Reg. Imp. BG – Cod. Fisc. e Part. IVA IT 01331640167<br>' +
      'Soggetta alla Direzione e Coordinamento (Art. 2497 bis C.c.) di AMA HOLDING SRL CF 04792850168 – Sede Legale: Via Trieste, 14 – 24046 Osio Sotto (BG)</p>' +
      '</div></div>';
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
    set('[data-sub-faq-title]', 'Domande frequenti');
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

  /* COPY UX delle pagine famiglia (documenti « D3 … copy per UX »): sostituisce i testi del wireframe
     solo dove il documento li cambia. Le schede sono le prime sei sezioni del testo di approfondimento;
     null = scheda invariata, h = null = titolo invariato. */
  var COPY_UX = {
    lavapavimenti: {
      title: 'Lavapavimenti professionali e lavasciuga industriali | Socaf',
      meta: 'Lavapavimenti professionali e lavasciuga pavimenti industriali: piccole, uomo a terra, uomo a bordo, combinate e i-mop. Nuove, a noleggio o usate.',
      intro: 'Le lavapavimenti professionali Socaf lavano e asciugano in una sola passata: aspirano i liquidi e lasciano il pavimento pulito e asciutto. Silenziose e veloci, sono progettate per grandi superfici come magazzini, fabbriche e centri commerciali, in cinque tipologie, dalle piccole alle i-mop.',
      h2Sub: 'Tipi di lavasciuga pavimenti',
      h2Approf: 'Qual è la miglior lavapavimenti?',
      alt: { 'lavapavimenti/lavapavimenti-combinate': 'Lavapavimenti combinate', 'lavapavimenti/i-mop': 'Lavasciuga i-mop Socaf' },
      schede: [
        { h: 'Le cinque tipologie di lavapavimenti professionali del catalogo Socaf', b: ['Tra le macchine per la pulizia Socaf trovi le lavapavimenti industriali adatte al tuo ambiente di lavoro. Scopri le lavapavimenti professionali piccole, uomo a terra, uomo a bordo, combinate e la lavasciuga i-mop.'] },
        { h: null, b: ['Le lavapavimenti professionali piccole puliscono le superfici di piccole dimensioni. Compatte e leggere, si usano nelle abitazioni private e negli spazi commerciali di dimensioni limitate, come uffici, negozi, ristoranti e hotel, per la pulizia quotidiana. Lavano i pavimenti di cucine, bagni, corridoi e altre aree di passaggio, dove la pulizia manuale è faticosa e poco efficiente. Le dimensioni ridotte consentono di manovrarle negli spazi stretti e di raggiungere angoli e zone difficili da pulire con altri strumenti. L\'ambiente resta pulito e accogliente, e lascia a visitatori e clienti un\'impressione positiva.'] },
        { h: null, b: ['Le lavapavimenti uomo a terra puliscono le ampie superfici, interne ed esterne. Coprono una grande area di pavimento in poco tempo: la potenza e le spazzole cilindriche, o gli accessori specifici, rimuovono lo sporco ostinato, le macchie e i liquidi. Il tempo di pulizia si riduce, le risorse si usano meglio e la produttività complessiva aumenta. Chi le usa lavora con comodità: i comandi sono intuitivi e il sistema di guida ergonomico permette di manovrarle con facilità e con meno affaticamento. Il progetto riduce rumore e vibrazioni e rende più confortevole l\'ambiente di lavoro.'] },
        { h: null, b: ['Le lavapavimenti uomo a bordo uniscono la potenza di pulizia di una lavapavimenti industriale alla mobilità di un veicolo guidato da un operatore. Servono per il lavaggio e l\'asciugatura quotidiani. La configurazione a bordo copre un\'ampia area in tempi rapidi e riduce al minimo i tempi di pulizia. Alcuni modelli sono equipaggiati con sistemi di spazzamento, aspirazione delle foglie e raccolta dei rifiuti: la pulizia delle aree esterne risulta completa e integrata. Le aree pubbliche restano ordinate e richiedono meno interventi aggiuntivi, con un aspetto complessivo più curato.'] },
        { h: null, b: ['Le lavapavimenti combinate Socaf spazzano e lavano in un\'unica passata. Le spazzole rotanti e il sistema di erogazione di acqua e detergente rimuovono lo sporco e i residui dalla superficie e lavano il pavimento nello stesso passaggio. Si usano su diversi tipi di pavimentazione e su superfici di dimensioni diverse, dai piccoli spazi interni alle ampie aree esterne.'] },
        { h: null, b: ['La i-mop unisce la manovrabilità di un mocio alla potenza di pulizia di una lavapavimenti industriale. Leggera e agile, raggiunge gli angoli stretti, le aree di difficile accesso e gli spazi ristretti, anche dove gli strumenti tradizionali non arrivano. Lavora con due spazzole controrotanti, lava e asciuga fino al bordo e pulisce intorno e sotto gli ostacoli senza interruzioni. Il quadrante dei comandi è semplice e intuitivo. La modalità ECO riduce il consumo d\'acqua: nella 36 la riduzione è del 40%. I serbatoi hanno un\'infusione antibatterica nella plastica, che riduce gli odori. Quando non è in funzione, la i-mop occupa poco spazio e si ripone nell\'apposito armadio. La 36 è la più piccola e maneggevole della gamma i-mop, con pista di lavaggio da 36 cm e pressione delle spazzole di 14 kg: serve gli spazi ridotti e le pulizie dinamiche. La XL ha una pista da 46 cm e una pressione di 22,5 kg, e si manovra con una sola mano. La XXL ha una pista da 62 cm e una pressione di 32 kg. La produttività pratica è di 700-900 m²/h nella 36, 1.000-1.300 nella XL e 1.200-1.800 nella XXL.'] }
      ],
      promo: { nolAlt: 'Consegna di una lavapavimenti Socaf a noleggio', usaAlt: 'Lavapavimenti usate nello showroom Socaf' }
    },
    spazzatrici: {
      title: 'Spazzatrice professionale e motoscopa | Socaf',
      meta: 'Spazzatrice e motoscopa per pavimenti interni ed esterni: uomo a terra, uomo a bordo e stradali. Nuove, a noleggio o usate. Richiedi consulenza.',
      intro: 'La spazzatrice Socaf raccoglie polveri, detriti e rifiuti da superfici interne ed esterne in una sola passata e senza sollevare polvere. Tre tipologie, dalla motoscopa a spinta alle spazzatrici stradali.',
      schede: [
        { h: null, b: ['Le nostre spazzatrici e le nostre motoscope trattengono facilmente i residui di sporco e la polvere e velocizzano fino a 40 volte i tempi di pulizia. Rispetto a una spazzatrice domestica sono macchine più vantaggiose.', 'Socaf offre consulenza per identificare la spazzatrice adatta alle esigenze di ogni cliente. Le schede seguenti descrivono le caratteristiche principali delle nostre spazzatrici, per aiutarti a scegliere la macchina giusta per pulire i tuoi pavimenti.'] },
        { h: 'Quali sono le caratteristiche principali di una motoscopa industriale?', b: ['Le spazzatrici e le motoscope industriali sono macchine essenziali per la pulizia e la manutenzione di aree industriali, commerciali e urbane.', 'Sono progettate per rimuovere detriti, polvere, rifiuti e altre particelle di sporco da pavimenti, strade e altre superfici estese.', 'Dalle loro caratteristiche dipendono l\'efficienza e l\'adattabilità alle diverse esigenze di pulizia.'] },
        { h: null, b: ['Le spazzatrici hanno dimensioni e design specifici per affrontare ampie superfici e garantire una pulizia efficiente.', 'Le configurazioni sono tre: spazzatrici uomo a terra, spazzatrici uomo a bordo e spazzatrici stradali.', 'Il design facilita la manovra e la copertura dell\'area da pulire.'] },
        { h: null, b: ['Le spazzatrici sono dotate di un sistema di spazzolatura che varia a seconda del modello.', 'Le spazzole hanno setole dure o morbide, a seconda delle esigenze di pulizia.', 'Ruotano a velocità elevata e spazzano via sporco, detriti e rifiuti dal pavimento.'] },
        { h: null, b: ['Le spazzatrici sono dotate di un serbatoio di raccolta (raccoglitore) o di una cassetta, che contiene una notevole quantità di sporco e detriti.', 'La capacità varia in base al modello. Una capacità maggiore riduce la frequenza di svuotamento e permette di lavorare più a lungo senza interruzioni.'] },
        { h: null, b: ['Le spazzatrici sono dotate di un sistema di filtrazione che trattiene le particelle di polvere e le tiene fuori dall\'ambiente.', 'Tra i filtri ci sono quelli a cartuccia e quelli a sacco, scelti in base alle esigenze dell\'applicazione. La TK 706 ET ha un filtro a pannello da 2,9 m², pulito dallo scuotifiltro elettrico.', 'Un\'adeguata filtrazione migliora la qualità dell\'aria nell\'ambiente di lavoro.'] }
      ],
      promo: { nolAlt: 'Consegna di una spazzatrice Socaf a noleggio', usaAlt: 'Spazzatrici in showroom Socaf' }
    },
    idropulitrici: {
      title: 'Idropulitrici professionali ad alta pressione | Socaf',
      meta: 'Idropulitrici professionali Socaf: idropulitrice ad alta pressione a freddo o ad acqua calda, con motore elettrico o a scoppio. Nuove, a noleggio o usate.',
      intro: 'Le idropulitrici professionali Socaf rimuovono sporco tenace, grasso e incrostazioni da ogni superficie. Sono a freddo o ad acqua calda, elettriche o autonome a scoppio, mobili o a parete.',
      h2Approf: 'Come scegliere un\'idropulitrice',
      schede: [
        { h: null, b: ['Le idropulitrici professionali si dividono in più tipologie.', 'Le schede seguenti ne descrivono le caratteristiche e gli ambiti di utilizzo.'] },
        { h: null, b: ['L\'idropulitrice professionale ad acqua calda è una macchina versatile e potente, che offre numerosi vantaggi per la pulizia in ambienti industriali, commerciali e domestici. Grazie alla combinazione di acqua calda e alta pressione, queste macchine affrontano lo sporco più ostinato e le macchie difficili da rimuovere.',
          'Le caratteristiche principali sono cinque: acqua calda ad alta pressione, pressione regolabile, temperatura regolabile, serbatoio di combustibile, robustezza e durata. Un sistema di riscaldamento genera acqua ad alta temperatura, che viene poi spruzzata ad alta pressione: questa combinazione scioglie lo sporco, il grasso e le altre incrostazioni ostinate con maggiore facilità rispetto a un\'idropulitrice a freddo. Un regolatore consente di adattare la pressione dell\'acqua alle esigenze specifiche di pulizia: permette di affrontare diversi tipi di sporco e di proteggere le superfici più delicate dai danni di una pressione eccessiva.',
          'Anche la temperatura dell\'acqua è regolabile: si imposta il valore adatto alla pulizia da eseguire, e l\'acqua calda sgrassa e rimuove il grasso in modo più efficace dell\'acqua fredda. Poiché l\'acqua viene riscaldata, la macchina ha un serbatoio di gasolio che alimenta il sistema di riscaldamento e mantiene costante la temperatura dell\'acqua durante l\'utilizzo. Le idropulitrici ad acqua calda sono costruite con materiali resistenti, che garantiscono la durata e la resistenza necessarie in ambienti impegnativi: la progettazione per l\'utilizzo professionale assicura prestazioni affidabili e una lunga durata nel tempo.'] },
        { h: null, b: ['L\'idropulitrice professionale ad acqua calda si usa in moltissimi contesti. Nel settore industriale è ampiamente utilizzata per la pulizia di macchinari pesanti, attrezzature industriali, pavimenti, strutture e aree di lavoro. La capacità di rimuovere lo sporco e il grasso resistenti è particolarmente utile in ambienti come officine meccaniche, industrie alimentari, cantieri e impianti chimici.',
          'Negli ambienti commerciali, come ristoranti, hotel e strutture sanitarie, l\'idropulitrice rimuove dai pavimenti e da qualsiasi altra superficie i residui di cibo, lo sporco, i batteri e i germi. Nelle autofficine si usa nel lavaggio auto e nel settore dei trasporti: la temperatura elevata dell\'acqua scioglie lo sporco ostinato e il grasso sui veicoli e rende più efficiente la pulizia di autocarri, furgoni, macchine agricole e mezzi pesanti.',
          'Per l\'uso esterno, cioè la pulizia di facciate, muri, persiane e altre superfici esterne, le idropulitrici professionali ad acqua calda per pulizia esterna sono la soluzione adatta: con la potenza regolabile e gli accessori appositi rimuovono lo sporco più tenace senza danneggiare le superfici. Per l\'uso domestico, l\'idropulitrice professionale ad acqua calda pulisce terrazze, cortili, piscine, pavimenti, barbecue e altre superfici esterne che richiedono una pulizia profonda e accurata.'] },
        { h: null, b: ['A differenza dell\'idropulitrice professionale ad acqua calda, l\'idropulitrice a freddo utilizza l\'acqua a temperatura ambiente per rimuovere lo sporco e le macchie. Le idropulitrici a freddo sono dotate di un regolatore di pressione, che permette di adattare la pressione dell\'acqua in base alle esigenze specifiche di pulizia.',
          'Le idropulitrici a freddo sono realizzate con materiali di qualità, resistenti e duraturi: l\'apparecchiatura è in grado di sopportare un utilizzo intenso e prolungato senza subire danni.',
          'Anche le idropulitrici a freddo si usano in più contesti: il settore domestico, il settore commerciale, il settore industriale e il settore agricolo.'] },
        { h: null, b: ['Le idropulitrici professionali con motore elettrico offrono facilità d\'uso e manutenzione ridotta. Richiedono una fonte di alimentazione elettrica e sono adatte a utilizzi domestici e commerciali di piccola scala.',
          'Le idropulitrici professionali con motore a scoppio sono alimentate a benzina o diesel. Si usano dove non è disponibile una fonte di alimentazione elettrica, come in zone rurali o cantieri edili.',
          'L\'idropulitrice professionale con motore trifase è progettata per lavori intensivi in ambito industriale. Questi modelli offrono una potenza significativa e sono indicati per l\'uso prolungato in ambienti di grande scala.'] },
        { h: null, b: ['Il costo medio e la durata media di un\'idropulitrice dipendono da più fattori: la qualità del prodotto, la marca, il modello, la frequenza e l\'intensità dell\'uso e la manutenzione regolare.', 'Valutare insieme questi aspetti permette di capire meglio il costo e la durata di un\'idropulitrice.'] }
      ],
      /* alt delle immagini noleggio/usato invariati */
      promo: {}
    },
    aspiratori: {
      title: 'Aspirapolvere industriale e aspiraliquidi | Socaf',
      meta: 'Aspirapolvere industriale e aspiraliquidi Socaf per polveri, liquidi, olio e trucioli, fino alle versioni ATEX. Nuovi o usati. Richiedi consulenza.',
      intro: 'Aspirapolvere industriale e aspiraliquidi Socaf: aspirano polveri, liquidi, olio e trucioli. Le versioni certificate ATEX servono per aree a rischio esplosione.',
      h2Approf: 'Come scegliere un aspiratore',
      topTitle: 'Gli aspiratori più richiesti',
      schede: [
        { h: null, b: ['Le schede seguenti descrivono le caratteristiche e gli ambiti di utilizzo dell\'aspirapolvere industriale.'] },
        { h: null, b: ['L\'aspirapolvere industriale viene utilizzato in moltissimi ambiti. Nel settore industriale è ampiamente utilizzato per la pulizia di fabbriche, officine, magazzini e siti di produzione. Queste macchine rimuovono polvere, detriti, liquidi e altri materiali presenti in ambienti ad alta intensità di lavoro.',
          'Nelle attività commerciali, come ristoranti, hotel, negozi e uffici, l\'aspirapolvere industriale serve a mantenere pulito l\'ambiente: rimuove sporco, residui di cibo, peli e polvere da pavimenti, tappeti, sedie, divani e altre superfici. Nel settore sanitario viene utilizzato in ospedali, cliniche e strutture sanitarie, per la pulizia delle stanze dei pazienti e di altre aree.',
          'L\'aspirapolvere industriale è impiegato anche nel settore dell\'automotive, per la pulizia interna di veicoli come automobili, camion, autobus e treni: rimuove sporco, briciole, polvere e peli dagli interni dei veicoli, inclusi tappeti, sedili, pannelli e vani di stivaggio. Nel settore edile, nell\'ambito delle attività di costruzione e ristrutturazione, rimuove la polvere di cantiere e i detriti derivanti dai lavori e mantiene pulito l\'ambiente di lavoro durante il processo di costruzione.'] },
        { h: null, b: ['Prima di acquistare un aspirapolvere industriale è importante valutare due aspetti.', 'Sono il prezzo e la durata media dell\'apparecchio.'] },
        { h: null, b: ['Il prezzo di un aspirapolvere industriale varia in base al marchio, alle caratteristiche specifiche del modello e alle dimensioni dell\'apparecchio. Gli aspiratori di fascia alta sono progettati per utilizzi intensi e per ambienti industriali impegnativi.',
          'Il prezzo medio non è l\'unico fattore decisivo. Per determinare il valore effettivo dell\'investimento bisogna valutare la qualità, la potenza, la capacità di raccolta e la durata dell\'apparecchio, oltre alle esigenze specifiche dell\'applicazione.'] },
        { h: null, b: ['La durata media di un aspirapolvere industriale dipende da diversi fattori, tra cui la qualità del prodotto, la manutenzione regolare e l\'intensità dell\'uso.',
          'La durata dipende anche dal tipo di ambiente in cui l\'apparecchio viene utilizzato: negli ambienti industriali impegnativi, con particelle abrasive o sostanze corrosive, una durata più lunga richiede una maggiore attenzione alla manutenzione.',
          'È importante seguire le istruzioni del produttore per la manutenzione regolare dell\'aspirapolvere, come la pulizia dei filtri e la sostituzione delle parti usurabili. Effettuare interventi di manutenzione preventiva e risolvere tempestivamente eventuali problemi contribuisce a estendere la durata dell\'apparecchio.'] },
        { h: null, b: ['L\'aspirapolvere industriale e quello domestico servono entrambi alla pulizia, ma differiscono in modo significativo per caratteristiche e prestazioni.', 'Il confronto riguarda i vantaggi dell\'aspirapolvere industriale rispetto a quello domestico.'] }
      ],
      /* solo il blocco usato (niente noleggio per gli aspiratori); alt invariato */
      promo: {}
    },
    robot: {
      title: 'Robot pulizia pavimenti e pulizia industriale | Socaf',
      meta: 'Robot pulizia pavimenti Socaf: lavano, aspirano e spazzano in autonomia. Per industria, logistica, retail e ospedali. Richiedi una consulenza.',
      intro: 'Robot pulizia pavimenti Socaf: lavano o spazzano senza operatore a bordo, programmabili e integrabili nei processi di pulizia industriale.',
      topTitle: 'I robot più richiesti',
      schede: [
        { h: null, b: ['I robot Socaf automatizzano la pulizia dei pavimenti e portano tre vantaggi: più tecnologia in azienda, più spazio per le attività strategiche, più prestigio e marketing.',
          'La pulizia robotizzata serve sia alle aziende manifatturiere sia alle imprese di servizi: in modalità automatica il robot lavora senza operatore a bordo.'] },
        { h: null, b: ['La pulizia degli ambienti non è direttamente legata alla produzione.', 'Affidarla ai robot libera la forza lavoro, che può dedicarsi ad altre attività.'] },
        { h: null, b: ['Le soluzioni robotiche automatizzano la pulizia industriale convenzionale e aumentano il valore di innovazione e l\'immagine dell\'azienda. Il ritorno d\'immagine nasce da livelli di pulizia industriale elevati e costanti.',
          'Il parco macchine Socaf comprende gli ECOBOT, lavasciuga robot che aspirano, lavano e asciugano. Adatti a molteplici applicazioni, sono ideali dove si pulisce di frequente e con alto traffico pedonale: industria, ospedali, logistica, scuole e istituti, aeroporti, retail, centri commerciali.'] },
        { h: null, b: ['La programmazione è facile e intuitiva e si fa direttamente a bordo macchina. L\'utilizzo è duplice, automatico o manuale, e si regolano tutti i parametri di pulizia: pressione e rotazione delle spazzole, quantità d\'acqua, velocità di avanzamento.',
          'Il riciclo dell\'acqua permette di coprire aree più estese e riduce l\'utilizzo. I cicli di lavaggio si programmano anche da remoto.',
          'Ogni robot rileva gli ostacoli lungo il percorso con sensori laser e telecamere di profondità.'] },
        { h: null, b: ['Phantas integra 4 modalità di pulizia dei pavimenti in un unico robot all-in-one.'] },
        { h: null, b: ['Phantas è un robot agile e dal design compatto: pulisce in spazi stretti, in punti difficili da raggiungere e lungo i bordi.',
          'Con la tecnologia "deep learning" identifica i tipi di pavimento e riconosce gli ostacoli lungo il percorso. La funzione "spot cleaning" rileva in autonomia le macchie di sporco.',
          'Con workstation e IoT l\'intervento umano si riduce al minimo.'] }
      ],
      promo: {}
    }
  };
  /* promo noleggio/usato: il copy UX vale per tutte le famiglie che hanno un documento */
  var COPY_UX_PROMO = { nolKicker: 'Assistenza inclusa', nolH: 'Anche a noleggio', nolP: 'Noleggio a breve o lungo periodo, con consegna inclusa. Ritiro e consegna da tutte e cinque le sedi.',
    usaKicker: 'Garanzia 3-12 mesi', usaH: 'Anche usata', usaP: 'Ricondizionate e controllate prima della consegna. Valutiamo e ritiriamo la tua macchina usata.' };
  function applicaCopyUx(key) {
    var C = COPY_UX[key]; if (!C) return null;
    var T = (window.SOCAF_TESTI || {})['/' + key + '/'];
    if (T && T.s && C.schede) C.schede.forEach(function (sc, i) {
      if (!sc || !T.s[i]) return;
      if (sc.h) T.s[i].h = sc.h;
      if (sc.b) T.s[i].b = sc.b;
    });
    /* SEO: nel codice (head) e nelle note DEV */
    var hd = document.head;
    [['title', C.title], ['description', C.meta]].forEach(function (m) {
      var el = hd.querySelector('meta[name="' + m[0] + '"]');
      if (!el) { el = document.createElement('meta'); el.name = m[0]; hd.appendChild(el); }
      el.content = m[1];
    });
    var primo = document.querySelector('.devnote');
    if (primo) primo.insertAdjacentHTML('beforebegin', '<div class="devnote"><div class="dn-h">DEV NOTE — SEO della famiglia (copy UX D3)</div><dl>' +
      '<dt>Title</dt><dd>' + esc(C.title) + '</dd><dt>Meta description</dt><dd>' + esc(C.meta) + '</dd>' +
      '<dt>Dove</dt><dd>Plugin SEO (Yoast / Rank Math) della pagina di archivio della famiglia. Nel mockup sono anche nell\'<code>&lt;head&gt;</code>, generati dallo script.</dd>' +
      '<dt>Alt delle immagini</dt><dd>Card delle tipologie: nome della tipologia' + (C.alt ? ' (eccezioni: ' + Object.keys(C.alt).map(function (k) { return '«' + esc(C.alt[k]) + '»'; }).join(', ') + ')' : '') +
      '. Noleggio: «' + esc(C.promo.nolAlt || 'Consegna di una macchina Socaf a noleggio') + '». Usato: «' + esc(C.promo.usaAlt || 'Macchine nello showroom Socaf') + '».</dd></dl></div>');
    return C;
  }

  function renderFamiglia() {
    var host = document.querySelector('[data-tpl="famiglia"]');
    if (!host || !CAT) return;
    var key = param('fam') || 'lavapavimenti';
    var f = CAT.FAMIGLIE[key]; if (!f) { key = 'lavapavimenti'; f = CAT.FAMIGLIE[key]; }
    var subs = CAT.sottoDiFamiglia(key);
    FONTE = '/' + key + '/';
    var C = applicaCopyUx(key) || {};

    set('[data-fam-crumb]', esc(f.nome));
    set('[data-fam-h1]', esc(f.h1));
    set('[data-fam-intro]', esc(C.intro || f.intro));
    set('[data-fam-h2]', C.h2Sub ? esc(C.h2Sub) : 'Le tipologie di ' + esc(f.nome.toLowerCase()));
    set('[data-fam-subs]', subs.map(function (sk) {
      var s = CAT.SOTTO[sk], n = (CAT.MACCHINE[sk] || []).length;
      return '<article class="card">' + (FOTO_SOTTO[sk] ? '<div class="card-media foto"><img src="' + BASE + 'assets/images/categorie/sub-' + sk.split("/")[1] + '.jpg" alt="' + esc((C.alt && C.alt[sk]) || s.h1) + '" loading="lazy"></div>' : '<div class="card-media ph ph-wide">Immagine sottocategoria</div>') +
        '<div class="card-body"><span class="card-name">' + esc(s.h1) + '</span>' +
        '<span class="card-meta">' + n + (n === 1 ? ' macchina' : ' macchine') + '</span>' +
        '<a class="card-link" href="' + route('/' + sk + '/') + '" data-url="/' + sk + '/">Vedi tutte</a></div></article>';
    }).join(''));
    /* Le più richieste: selezione commerciale Socaf — qui le prime della famiglia */
    var tutte = [];
    subs.forEach(function (sk) { tutte = tutte.concat(CAT.MACCHINE[sk] || []); });
    set('[data-fam-top]', tutte.slice(0, 6).map(cardMacchina).join(''));
    set('[data-fam-top-title]', C.topTitle ? esc(C.topTitle) : 'Le ' + esc(f.nome.toLowerCase()) + ' più richieste');
    set('[data-fam-approf]', C.h2Approf ? esc(C.h2Approf) : 'Come scegliere ' + (f.nome === 'Robot' ? 'un robot per la pulizia' : 'una ' + esc(f.nome.toLowerCase().replace(/i$/, 'e'))));
    set('[data-fam-words]', f.testoLungo ? 'LUNGHEZZA PREVISTA · 800–1200 PAROLE' : 'LUNGHEZZA PREVISTA · 250–350 PAROLE — testo breve, smistamento');
    set('[data-fam-others]', Object.keys(CAT.FAMIGLIE).map(function (k) {
      return k === key ? '<span class="chip" aria-current="true">' + esc(CAT.FAMIGLIE[k].nome) + '</span>'
                       : '<a class="chip" href="' + route('/' + k + '/') + '" data-url="/' + k + '/">' + esc(CAT.FAMIGLIE[k].nome) + '</a>';
    }).join(''));
    promo(f, '[data-fam-promo]', C.promo ? C : null);
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

  /* Rimandi a noleggio e usato: stessa costruzione delle card della home
     (sezione « Non serve per forza comprarla »): immagine a colori, sopratitolo,
     titolo nel colore della formula, testo e CTA. Il contenitore prende la classe
     .formule, così valgono le stesse regole e la stessa gelatina della home. */
  /* sottocategorie con una fotografia reale (assets/STATICHE → assets/images/categorie) */
  var FOTO_SOTTO = { 'lavapavimenti/lavapavimenti-piccole': 1, 'lavapavimenti/lavapavimenti-uomo-terra': 1,
    'lavapavimenti/lavapavimenti-uomo-bordo': 1, 'lavapavimenti/lavapavimenti-combinate': 1, 'lavapavimenti/i-mop': 1,
    'spazzatrici/spazzatrici-uomo-terra': 1, 'spazzatrici/spazzatrici-uomo-bordo': 1,
    'idropulitrici/idropulitrici-ad-acqua-fredda': 1 };
  function promo(f, sel, C) {
    var el = document.querySelector(sel); if (!el) return;
    var h = '', P = C ? COPY_UX_PROMO : null, X = C ? C.promo : {};
    if (f.noleggio) {
      h += '<div class="formula formula-nol"><span class="formula-art foto"><img src="' + BASE + 'assets/images/categorie/formula-noleggio.jpg" alt="' + esc(X.nolAlt || 'Consegna di una macchina Socaf a noleggio') + '" loading="lazy"></span><span class="formula-body">' +
        '<span class="kicker">' + (P ? P.nolKicker : 'Formula · noleggio') + '</span><span class="formula-h">' + (P ? P.nolH : 'Si può noleggiare') + '</span>' +
        '<span class="formula-p">' + (P ? P.nolP : 'Formule brevi o pluriennali, assistenza e consegna incluse. Ritiro da tutte e cinque le sedi.') + '</span>' +
        a('/noleggio/' + keyOf(f) + '/', 'Noleggio ' + f.nome.toLowerCase(), 'formula-go') + '</span></div>';
    }
    if (f.usato) {
      h += '<div class="formula formula-usa"><span class="formula-art foto"><img src="' + BASE + 'assets/images/categorie/formula-usato.jpg" alt="' + esc(X.usaAlt || 'Macchine nello showroom Socaf') + '" loading="lazy"></span><span class="formula-body">' +
        '<span class="kicker">' + (P ? P.usaKicker : 'Formula · usato') + '</span><span class="formula-h">' + (P ? P.usaH : 'Esiste anche usata') + '</span>' +
        '<span class="formula-p">' + (P ? P.usaP : 'Ricondizionate e garantite da 3 a 12 mesi, con supervalutazione della macchina che hai già.') + '</span>' +
        a('/usato/' + f.usato + '/', f.nome + ' usate', 'formula-go') + '</span></div>';
    }
    if (!h) { var w = el.closest('.row') || el; w.remove(); return; }
    el.classList.add('formule');
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
    'amica-chips-s-p-a': { nome: 'Amica Chips', settore: 'industria', desc: 'Industria alimentare', sito: 'https://www.amicachips.it/' },
    'cisalfa': { nome: 'Cisalfa Sport', settore: 'retail', desc: 'Retail · articoli sportivi', sito: 'https://www.cisalfasport.it/' },
    'il-gigante': { nome: 'Il Gigante', settore: 'retail', desc: 'Grande distribuzione', sito: 'https://ilgigante.net/' },
    'lupo-srl': { nome: 'Lupo S.r.l.', settore: 'horeca', desc: 'Ristorazione', sito: 'http://www.luporistoranti.it/' },
    'progect-srl': { nome: 'Progect S.r.l.', settore: 'imprese-di-pulizia', desc: 'Facility management' },
    'xpo-logistics': { nome: 'XPO Logistics', settore: 'logistica', desc: 'Logistica', sito: 'https://www.xpo.com/' }
  };
  /* Card referenza: porta al sito del cliente, in una scheda nuova (non più a
     una pagina interna). Gli indirizzi sono da confermare con Socaf (OP-17);
     dove manca, la card resta senza link e lo dichiara. */
  function cardReferenza(k) {
    var r = REFERENZE[k];
    var link = r.sito
      ? '<span class="card-meta">Sito del cliente ↗</span><a class="card-link" href="' + r.sito + '" target="_blank" rel="noopener">Vai al sito di ' + esc(r.nome) + '</a>'
      : '<span class="card-meta">[Sito del cliente da fornire]</span>';
    return '<article class="card"><div class="card-media ph ph-wide">Logo cliente</div><div class="card-body">' +
      '<span class="card-name">' + esc(r.nome) + '</span><p class="card-desc">' + esc(r.desc) + '</p>' + link + '</div></article>';
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
    document.body.dataset.slug = url;   /* per regole di pagina (es. testata di Referenze) */
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
    /* Chi siamo: sezione delle persone (fotografie quadrate, composizione editoriale).
       Foto segnaposto ritagliate dagli scatti Socaf; nomi e ruoli da fornire (vedi open points) */
    if (url === '/azienda/chi-siamo/') {
      var rc = document.querySelector('[data-p-if="corpo"]');
      if (rc) {
        var pers = ['p1', 'p2', 'p4', 'p3', 'p6', 'p8'];
        rc.insertAdjacentHTML('afterend', '<div class="row row-persone"><section class="block">' +
          '<span class="block-id">BLOCCO · Le persone</span>' +
          '<h2>Le persone</h2>' +
          '<div class="persone">' + pers.map(function (p, i) {
            return '<figure class="persona persona-' + (i + 1) + '"><img src="' + BASE + 'assets/images/persone/' + p + '.jpg" alt="" loading="lazy">' +
              '<figcaption><b>[Nome Cognome]</b><span>[Ruolo]</span></figcaption></figure>';
          }).join('') + '</div></section></div>');
      }
    }
    /* Lavora con noi: il modulo è quello di candidatura del sito attuale (campi e testi reali) */
    if (url === '/azienda/lavora-con-noi/') {
      var fc = document.querySelector('[data-p-if="form"] .form');
      if (fc) {
        set('[data-p-form]', 'Compila la form per inviare la tua candidatura.');
        var sub = fc.querySelector('.form-sub'); if (sub) sub.remove();
        fc.querySelector('.fields').innerHTML =
          '<div class="field"><label for="c-nome">Nome *</label><input id="c-nome" required></div>' +
          '<div class="field"><label for="c-cognome">Cognome *</label><input id="c-cognome" required></div>' +
          '<div class="field"><label for="c-mail">Email *</label><input id="c-mail" type="email" required></div>' +
          '<div class="field"><label for="c-tel">Telefono *</label><input id="c-tel" type="tel" required></div>' +
          '<div class="field full"><label for="c-cv">Carica il CV *</label><input id="c-cv" type="file" required accept=".pdf,.doc,.docx"></div>' +
          '<div class="field full"><label for="c-msg">Messaggio</label><textarea id="c-msg"></textarea></div>' +
          '<div class="field full" data-hidden-field="pagina di provenienza|Lavora con noi"></div>' +
          '<label class="consent full"><input type="checkbox" required> Acconsento a che i miei dati personali vengano utilizzati in accordo con la <a href="#">Privacy</a> e <a href="#">Cookie Policy</a>. *</label>' +
          '<label class="consent consent-lungo full"><input type="checkbox"> Acconsento all\'uso dei miei dati personali per essere aggiornato sui nuovi arrivi, prodotti in esclusiva e per le finalità di marketing diretto correlate ai servizi offerti e ricevere proposte in linea con i miei interessi attraverso l\'analisi dei miei precedenti acquisti</label>';
        var inv = fc.querySelector('button[type=submit]'); if (inv) inv.textContent = 'Invia candidatura';
        var tel = fc.querySelector('a[href^="tel:"]'); if (tel) tel.remove();
      }
    }
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
  /* Hero: video in loop + onda liquida che segue il puntatore.
     Il filtro SVG (turbolenza + spostamento) è quello che dà l'effetto liquido:
     una sola definizione per pagina, riusata da tutti gli elementi .liquid. */
  /* GRUPPO · scie liquide. Derivate dalla materia della hero (stessi rumori,
     palette iridescente blu VI, luce di vetro) ma ridotte a tre scie che
     attraversano il fondo in diagonale (42°, la Slice): larghe da un lato,
     si assottigliano fino a sparire dall'altro. Il canvas vive nello strato
     fisso del fondo azzurro (.mood .azzurro): compare e sparisce con lui, quindi
     accompagna tutte le sezioni azzurre, dal gruppo fino a « I marchi del gruppo ».
     Lo scroll le fa scorrere lungo la diagonale, il puntatore le sposta appena.
     Fuori dalle scie il canvas è trasparente. Movimento ridotto / niente WebGL: nulla. */
  function gruppoScia(tono, bersaglio) {
    tono = tono || 'azzurro';   /* 'azzurro' = blu VI (gruppo → noleggio), 'rosso' = rossi VI (marchi → contatti) */
    /* 'hero' = stessa palette della hero (blu → rosa → rosso), montata dentro un elemento (bersaglio) */
    var strato = bersaglio || document.querySelector('.mood .' + tono);
    if (!strato || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var cv = document.createElement('canvas');
    cv.className = 'scia-canvas';
    var gl = cv.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'low-power' });
    if (!gl) return;
    var VS = '#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    var FS = [
      '#version 300 es', 'precision highp float;', 'out vec4 o;',
      'uniform vec2 R;uniform float T;uniform vec2 M;uniform float S;',
      'vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453123);}',
      'float gn(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);',
      ' return mix(mix(dot(h2(i),f),dot(h2(i+vec2(1,0)),f-vec2(1,0)),u.x),',
      '            mix(dot(h2(i+vec2(0,1)),f-vec2(0,1)),dot(h2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}',
      'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*gn(p);p*=2.;a*=.5;}return v;}',
      (tono === 'hero'
        ? 'vec3 iride(float t){vec3 ele=vec3(0.,.522,.812),blu=vec3(.31,.741,.969),cri=vec3(.98,.76,.8),bia=vec3(.894,0.,.169);'
        : tono === 'rosso'
        ? 'vec3 iride(float t){vec3 ele=vec3(.639,.063,0.),blu=vec3(.894,0.,.169),cri=vec3(.953,.247,.329),bia=vec3(1.,.95,.96);'
        : 'vec3 iride(float t){vec3 ele=vec3(.008,.333,.702),blu=vec3(0.,.522,.812),cri=vec3(.31,.741,.969),bia=vec3(.97,.99,1.);'),
      ' t=clamp(t,0.,1.);vec3 c=mix(ele,blu,smoothstep(0.,.35,t));c=mix(c,cri,smoothstep(.35,.7,t));return mix(c,bia,smoothstep(.72,1.,t));}',
      /* una scia: asse ondulato, spessore che si assottiglia, sezione a tubo di vetro */
      'vec4 scia(vec2 q,float off,float wmax,float fase,float t){',
      ' q.y-=off;',
      ' float asse=.13*sin(q.x*1.2+t*.5+fase)+.05*sin(q.x*2.7-t*.8+fase*2.)+.12*fbm(vec2(q.x*.7+fase,t*.18))+.035*fbm(vec2(q.x*3.+t*.6,fase));',
      ' float d=q.y-asse;',
      ' float coda=smoothstep(-1.6,.6,q.x+.3*sin(fase));',
      ' float w=mix(.01,wmax,coda)*(1.+.55*fbm(vec2(q.x*1.7,t*.3+fase)));',
      ' float s=clamp(d/w,-1.,1.);float n=sqrt(max(0.,1.-s*s));',
      ' float band=1.-smoothstep(.45*w,w,abs(d));',
      ' float bordo=pow(1.-n,3.)*band;',                       /* luce sui bordi, come vetro */
      ' float spec=pow(max(0.,1.-abs(s+.5)),16.)*n;',
      ' vec3 col=iride(.08+.42*n+.18*fbm(q*2.6+t*.08+fase));',
      ' col=mix(col,' + (tono === 'azzurro' ? 'vec3(.72,.88,.98)' : 'vec3(1.,.86,.89)') + ',bordo*.35)+vec3(1.)*spec*.28;',
      ' float al=band*(.2+.3*(1.-n)+.12*n)+exp(-abs(d)/(w*2.2+.02))*.08*coda;',
      ' return vec4(col,clamp(al,0.,1.));}',
      /* goccia di gelatina: contorno che ondeggia, più densa sul bordo, trasparente al centro */
      'vec4 goccia(vec2 p,vec2 c,float r,float fase,float t){',
      ' vec2 d=p-c;float a=atan(d.y,d.x);',
      ' float rr=r*(1.+.16*sin(a*3.+t*.55+fase)+.09*sin(a*5.-t*.8+fase*2.)+.14*fbm(d*1.6+vec2(t*.15,fase)));',
      ' float dist=length(d)-rr;',
      ' float s=clamp(-dist/rr,0.,1.);',
      ' float den=1.-smoothstep(-.012,.012,dist);',
      ' float bordo=exp(-abs(dist)/(.035*r+.004));',
      ' float spec=pow(max(0.,1.-length(d/rr-vec2(-.32,.38))*1.6),6.)*den;',
      ' vec3 col=iride(.12+.45*(1.-s)+.2*fbm(d*3.+t*.1));',
      ' col=mix(col,vec3(1.),bordo*.25)+vec3(1.)*spec*.35;',
      ' float al=den*(.10+.34*pow(1.-s,1.6))+bordo*.16;',
      ' return vec4(col,clamp(al,0.,1.));}',
      'void main(){',
      ' vec2 p=(gl_FragCoord.xy-.5*R)/R.y;',
      ' float a=.733;mat2 ro=mat2(cos(a),-sin(a),sin(a),cos(a));vec2 q=ro*p;',
      ' q+=M*.05;q.x+=S;',                                     /* lo scroll le fa scorrere lungo la diagonale */
      ' float t=T;',
      ' vec4 a1=scia(q,.05,.34,0.,t);',
      ' vec4 a2=scia(q*vec2(.9,1.),-.42,.2,2.1,t*.9);',
      ' vec4 a3=scia(q*vec2(1.1,1.),.5,.14,4.3,t*1.1);',
      /* composizione "over": la scia principale sopra le altre */
      ' vec4 c=vec4(a3.rgb*a3.a,a3.a);',
      ' c=vec4(a2.rgb*a2.a+c.rgb*(1.-a2.a),a2.a+c.a*(1.-a2.a));',
      ' c=vec4(a1.rgb*a1.a+c.rgb*(1.-a1.a),a1.a+c.a*(1.-a1.a));',
      /* due gocce di gelatina che galleggiano lente, spinte dallo scroll */
      ' vec4 g1=goccia(p,vec2(.55*sin(t*.23)+.35,.25*cos(t*.19)-.1*S+.2),.26,1.,t);',
      ' vec4 g2=goccia(p,vec2(-.6+.2*cos(t*.17),-.3+.2*sin(t*.21)+.08*S),.2,3.,t*1.1);',
      ' c=vec4(g2.rgb*g2.a+c.rgb*(1.-g2.a),g2.a+c.a*(1.-g2.a));',
      ' c=vec4(g1.rgb*g1.a+c.rgb*(1.-g1.a),g1.a+c.a*(1.-g1.a));',
      ' o=c*.8;}'
    ].join('\n');
    function sh(t, s) { var x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); return x; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var lp = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
    var uR = gl.getUniformLocation(pr, 'R'), uT = gl.getUniformLocation(pr, 'T'),
        uM = gl.getUniformLocation(pr, 'M'), uS = gl.getUniformLocation(pr, 'S');
    strato.appendChild(cv);
    function misura() {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      if (bersaglio) { var rb = bersaglio.getBoundingClientRect(); cv.width = Math.round(rb.width * dpr); cv.height = Math.round(rb.height * dpr); }
      else { cv.width = Math.round(window.innerWidth * dpr); cv.height = Math.round(window.innerHeight * dpr); }
    }
    misura(); window.addEventListener('resize', misura);
    var mx = 0, my = 0, tx = 0, ty = 0, sc = 0, t0 = performance.now();
    window.addEventListener('pointermove', function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    function disegna(ora) {
      mx += (tx - mx) * 0.03; my += (ty - my) * 0.03;
      sc += (window.scrollY / window.innerHeight * 0.35 - sc) * 0.08;
      gl.viewport(0, 0, cv.width, cv.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uR, cv.width, cv.height); gl.uniform1f(uT, (ora - t0) / 1000 * 0.3);
      gl.uniform2f(uM, mx, my); gl.uniform1f(uS, sc);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    disegna(t0);
    /* disegna solo mentre il fondo azzurro è attivo */
    var vista = true;
    if (bersaglio && 'IntersectionObserver' in window) new IntersectionObserver(function (v) { vista = v[0].isIntersecting; }).observe(bersaglio);
    (function giro(ora) { requestAnimationFrame(giro); if (bersaglio ? vista : document.body.classList.contains('mood-' + tono)) disegna(ora); })(t0);
  }

  /* HERO VIVA · la stessa materia del video, ma calcolata in tempo reale:
     il puntatore spinge e fa ruotare il fluido, quindi le forme si modellano
     con il mouse. Se WebGL manca, o il movimento è ridotto, resta il video. */
  /* Materia della hero: shader condiviso da heroFluido e dalle forme laterali */
  var FLUIDO_FS = [
      '#version 300 es', 'precision highp float;', 'out vec4 o;',
      'uniform vec2 R;uniform float T;uniform vec2 M;uniform float MI;',
      'vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453123);}',
      'float gn(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*f*(f*(f*6.-15.)+10.);',
      ' return mix(mix(dot(h2(i),f),dot(h2(i+vec2(1,0)),f-vec2(1,0)),u.x),',
      '            mix(dot(h2(i+vec2(0,1)),f-vec2(0,1)),dot(h2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}',
      'float fbm(vec2 p){float v=0.,a=.55;mat2 r=mat2(.8,.6,-.6,.8);',
      ' for(int i=0;i<3;i++){v+=a*gn(p);p=r*p*1.85;a*=.48;}return v;}',
      /* la mano del puntatore: spinge il dominio e lo fa girare attorno al punto */
      'vec2 mano(vec2 p){',
      ' vec2 d=p-M;float r=length(d);',
      ' float f=exp(-1.6*r*r)*MI;',
      ' float a=1.0*f;float c=cos(a),s=sin(a);',
      ' vec2 ruot=mat2(c,-s,s,c)*d;',
      ' return M+ruot+d*0.34*f;}',
      'float altezza(vec2 p,float th){',
      ' p=mano(p);',
      ' vec2 d1=0.26*vec2(cos(th),sin(th));vec2 d2=0.20*vec2(cos(th*2.+2.1),sin(th*2.+.7));',
      ' vec2 q=vec2(fbm(p*0.42+d1),fbm(p*0.42+d1.yx+5.2));',
      ' vec2 r2=vec2(fbm(p*0.60+1.9*q+d2),fbm(p*0.60+1.9*q.yx+d2.yx+1.7));',
      ' return 1.35*fbm(p*0.52+2.4*r2);}',
      'vec3 iride(float t){vec3 blu=vec3(0.,.522,.812),cri=vec3(.31,.741,.969),bia=vec3(.98,.992,1.),',
      ' ros=vec3(.98,.76,.8),red=vec3(.894,0.,.169);t=clamp(t,0.,1.);',
      ' vec3 c=mix(blu,cri,smoothstep(0.,.44,t));c=mix(c,bia,smoothstep(.54,.74,t));',
      ' c=mix(c,ros,smoothstep(.70,.88,t));return mix(c,red,smoothstep(.90,1.,t)*.95);}',
      'void main(){',
      ' vec2 uv=gl_FragCoord.xy/R;vec2 p=(gl_FragCoord.xy-.5*R)/R.y*1.15;float th=6.2831853*T;',
      ' float e=7./R.y;float h=altezza(p,th),hx=altezza(p+vec2(e,0.),th),hy=altezza(p+vec2(0.,e),th);',
      ' vec3 n=normalize(vec3((h-hx)/e,(h-hy)/e,2.6));',
      ' vec3 vi=vec3(0,0,1),l1=normalize(vec3(-.45,.75,.85)),l2=normalize(vec3(.65,-.55,.6));',
      ' float d1=max(dot(n,l1),0.),d2=max(dot(n,l2),0.);',
      ' float s1=pow(max(dot(normalize(l1+vi),n),0.),42.),s2=pow(max(dot(normalize(l2+vi),n),0.),14.);',
      ' float fr=pow(1.-max(dot(n,vi),0.),2.6);',
      ' vec3 col=iride(.42+.72*h+.24*n.x-.12*n.y);',
      ' col*=.72+.42*d1+.20*d2;col+=vec3(.52,.66,.78)*fr*.45;',
      ' col+=vec3(1.)*s1*.85;col+=vec3(.9,.96,1.)*s2*.30;',
      ' float vig=smoothstep(1.45,.15,length(uv-vec2(.5,.52)));col*=.84+.20*vig;',
      ' o=vec4(clamp(col,0.,1.),1.);}'
  ].join('\n');

  /* Il fluido della hero. Vive su un contenitore qualsiasi: in home è la hero,
     nelle pagine interne è la scena dietro la testata, così l'effetto e il
     gesto del mouse sono gli stessi ovunque. */
  function heroFluido(bersaglio, classe) {
    var hero = bersaglio || document.querySelector('.hero-full');
    if (!hero) return;
    if (hero.querySelector('.hero-vimeo')) return;   /* c'è il video Vimeo: la materia WebGL non serve e lo coprirebbe */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var cv = document.createElement('canvas');
    cv.className = classe || 'hero-canvas';
    cv.setAttribute('aria-hidden', 'true');
    var gl = cv.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    var VS = '#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    var FS = FLUIDO_FS;

    function sh(t, s) { var x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); return x; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;   /* niente shader: resta il video */
    gl.useProgram(pr);
    var b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var lp = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(lp);
    gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
    var uR = gl.getUniformLocation(pr, 'R'), uT = gl.getUniformLocation(pr, 'T'),
        uM = gl.getUniformLocation(pr, 'M'), uMI = gl.getUniformLocation(pr, 'MI');

    hero.appendChild(cv);
    hero.classList.add('ha-canvas');

    var mx = 0, my = 0, tx = 0, ty = 0, forza = 0, obiettivo = 0, visibile = true;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * (r.width / r.height) * 0.575;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 2 * 0.575;
      obiettivo = 1;
    });
    hero.addEventListener('pointerleave', function () { obiettivo = 0; });

    function misura() {
      var r = hero.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
    }
    misura();
    window.addEventListener('resize', misura);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (v) { visibile = v[0].isIntersecting; })
        .observe(hero);
    }

    var t0 = performance.now();
    (function giro(ora) {
      requestAnimationFrame(giro);
      if (!visibile) return;
      mx += (tx - mx) * 0.08; my += (ty - my) * 0.08;      /* la mano insegue, non salta */
      forza += (obiettivo - forza) * 0.035;
      var fase = ((ora - t0) / 26000) % 1;                  /* giro lento: 26 secondi */
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uR, cv.width, cv.height);
      gl.uniform1f(uT, fase);
      gl.uniform2f(uM, mx, my);
      gl.uniform1f(uMI, forza);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    })(t0);
  }



  /* Claim jelly: in hover il titolo diventa vetro lattiginoso e ondeggia come
     gelatina. L'onda è sincronizzata con il fondo: legge lo stesso cursore con
     la stessa inerzia del canvas (0.08 / 0.035), quindi il liquido del fondo e
     quello delle lettere si muovono insieme, nella stessa direzione. */
  function claimJelly() {
    var hero = document.querySelector('.hero-full');
    var bersagli = [].slice.call(document.querySelectorAll(
      '.hero-copy h1, .hero-cnt h1, .row-testata h1, .scheda-mosaico .intro-testata h1, .pagina-intro h1'));
    if (!bersagli.length || window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    /* un filtro per elemento (titolo e ogni numero), stesso rumore: area ampia
       e fissa, così gli aloni non vengono ritagliati a rettangolo */
    svg.innerHTML = bersagli.map(function (el, i) {
      return '<filter id="jelly' + i + '" filterUnits="userSpaceOnUse" x="-120" y="-120" width="1500" height="620" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.007 0.016" numOctaves="1" seed="4" result="n"/>' +
        '<feOffset in="n" dx="0" dy="0" result="m"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="m" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>';
    }).join('');
    document.body.appendChild(svg);
    var stati = bersagli.map(function (el, i) {
      var f = svg.querySelector('#jelly' + i);
      var st = { el: el, id: 'jelly' + i, disp: f.querySelector('feDisplacementMap'), off: f.querySelector('feOffset'),
        sopra: 0, forza: 0, t0: 0, carta: el.classList.contains('card') || el.classList.contains('formula'),
        amp: /^H[1-3]$/.test(el.tagName) ? 1 : (el.classList.contains('card') || el.classList.contains('formula')) ? 1.6 : 0.8 };
      el.addEventListener('mouseenter', function () { st.sopra = 1; st.t0 = performance.now(); });
      el.addEventListener('mouseleave', function () { st.sopra = 0; });
      return st;
    });

    var tx = 0, ty = 0, mx = 0, my = 0, px = 0, py = 0, vel = 0, attivo = false;
    document.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!attivo) { mx = px = tx; my = py = ty; attivo = true; }
    });

    (function giro(ora) {
      requestAnimationFrame(giro);
      if (!attivo) return;
      mx += (tx - mx) * 0.08; my += (ty - my) * 0.08;        /* stessa inerzia del fondo */
      var v = Math.hypot(mx - px, my - py); px = mx; py = my;
      vel += (Math.min(v, 30) - vel) * 0.08;
      stati.forEach(function (st) {
        st.forza += (st.sopra - st.forza) * 0.035;
        if (st.forza < 0.003 && !st.sopra) { if (st.el.style.filter) st.el.style.filter = ''; return; }
        /* il rumore scorre con il cursore: l'onda segue la mano come il fondo */
        st.off.setAttribute('dx', (-mx * 0.35).toFixed(1));
        st.off.setAttribute('dy', (-my * 0.35).toFixed(1));
        /* oscillazione all'ingresso (gelatina toccata) + onda che cresce col movimento */
        var p = Math.min((ora - st.t0) / 1400, 1);
        var tocco = st.sopra ? (st.carta ? 9 : 7) * Math.sin(p * Math.PI * 3) * (1 - p) : 0;
        var s = (st.forza * (3 + vel * 0.45) + tocco) * st.amp;
        st.disp.setAttribute('scale', s.toFixed(2));
        st.el.style.filter = Math.abs(s) > 0.15 ? 'url(#' + st.id + ')' : '';
      });
    })(0);
  }
  function heroLiquido() {
    var fig = document.querySelector('[data-liquid]');
    if (!fig) return;

    if (!document.getElementById('wf-liquid')) {
      document.body.insertAdjacentHTML('beforeend',
        '<svg class="wf-filtri" aria-hidden="true" focusable="false"><filter id="wf-liquid">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="rumore">' +
        '<animate attributeName="baseFrequency" dur="14s" values="0.012 0.02;0.02 0.01;0.012 0.02" repeatCount="indefinite"/>' +
        '</feTurbulence>' +
        '<feDisplacementMap in="SourceGraphic" in2="rumore" scale="46" xChannelSelector="R" yChannelSelector="G"/>' +
        '</filter></svg>');
    }

    var onda = fig.querySelector('.liquid');
    fig.addEventListener('pointermove', function (e) {
      var r = fig.getBoundingClientRect();
      onda.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
      onda.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
    });

    /* La nota « video da fornire » sparisce appena c'è un video vero */
    var v = fig.querySelector('video');
    if (v) {
      v.addEventListener('loadeddata', function () { fig.classList.add('ha-video'); });
      if (v.readyState >= 2) fig.classList.add('ha-video');
    }
  }

  /* HOME · regia visiva: il fondo cambia colore lungo la pagina, la sezione
     macchine è una lavagna che si trascina, la hero ha il riflesso che segue
     il puntatore. Tutto solo sulla home: le altre pagine non cambiano. */
  function homeScena() {
    if (document.body.dataset.pagina !== 'home') return;

    /* 1 · gli strati di colore del fondo */
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="mood" aria-hidden="true"><span class="chiaro"></span><span class="macchine"></span><span class="azzurro"></span><span class="rosso"></span></div>');
    document.body.classList.add('mood-chiaro');

    /* larghezza utile senza barra di scorrimento: serve alle tessere a piena larghezza */
    function misuraVw() {
      var vw = document.documentElement.clientWidth;
      document.body.style.setProperty('--vw', vw + 'px');
      /* le tessere a piena larghezza escono dalla griglia esattamente fino ai bordi */
      document.querySelectorAll('.wrap > .row.t-piena').forEach(function (r) {
        var w = r.parentElement, cs = getComputedStyle(w), q = w.getBoundingClientRect();
        var sx = q.left + parseFloat(cs.paddingLeft), dx = q.right - parseFloat(cs.paddingRight);
        r.style.setProperty('margin-left', (-sx) + 'px', 'important');
        r.style.setProperty('margin-right', (-(vw - dx)) + 'px', 'important');
        document.body.style.setProperty('--sx', sx + 'px');
        document.body.style.setProperty('--dx', (vw - dx) + 'px');
      });
    }
    misuraVw(); window.addEventListener('resize', misuraVw);

    var righe = [].slice.call(document.querySelectorAll('.wrap > .row'));
    function umore(u) {
      if (document.body.classList.contains('mood-' + u)) return;
      document.body.classList.remove('mood-chiaro', 'mood-macchine', 'mood-azzurro', 'mood-rosso');
      document.body.classList.add('mood-' + u);
      /* il fondo è cambiato: l'header ricalcola subito il colore delle voci di servizio */
      window.dispatchEvent(new Event('scroll'));
    }
    /* la soglia è il titolo della sezione: dopo « Le macchine » si vira
       all'azzurro, da « I marchi del gruppo » al rosso */
    function titolo(r) { var h = r.querySelector('h2'); return h ? h.textContent : ''; }
    function trova(re) { for (var i = 0; i < righe.length; i++) if (re.test(titolo(righe[i]))) return righe[i]; return null; }
    var rAzzurro = document.querySelector(".row[data-mood=azzurro]") || trova(/Dalla fusione/);
    var rRosso = document.querySelector(".row[data-mood=rosso]") || trova(/I nostri marchi|marchi del gruppo/);
    var atteso = false;
    function guarda() {
      atteso = false;
      var meta = window.innerHeight * 0.55;
      var u = 'chiaro';
      /* le macchine accendono il rosso sul fondo della pagina; arrivando al
         gruppo il rosso si dissolve nell'azzurro (dissolvenza lunga in CSS) */
      var rMac = document.querySelector('.row[data-mood=macchine]');
      if (rMac && rMac.getBoundingClientRect().top < window.innerHeight * 0.85) u = 'macchine';
      /* fusione hero → macchine: il rosso non scatta, sale con lo scroll.
         --fonde va da 0 (la sezione entra dal basso) a 1 (il titolo è in alto) */
      if (rMac) {
        var fonde = (window.innerHeight - rMac.getBoundingClientRect().top) / (window.innerHeight * 1.3);
        document.body.style.setProperty('--fonde', (function (p) { p = Math.max(0, Math.min(1, p || 0)); return (p * p * (3 - 2 * p)).toFixed(3); })(fonde));
      }
      /* il fondale passa al bianco quando « Il gruppo » (tessera bianca a piena larghezza) copre già lo schermo */
      if (rAzzurro && rAzzurro.getBoundingClientRect().top < 0) u = 'azzurro';
      if (rRosso && rRosso.getBoundingClientRect().top < meta) u = 'rosso';
      umore(u);
    }
    window.addEventListener('scroll', function () {
      if (!atteso) { atteso = true; requestAnimationFrame(guarda); }
    }, { passive: true });
    window.addEventListener('resize', guarda);
    guarda();

    /* 2 · materia che prosegue verso il basso dietro noleggio e settori */
    var rMateria = trova(/Noleggio e usato garantito|Non serve per forza/);
    if (rMateria) {
      rMateria.style.position = "relative";
      rMateria.insertAdjacentHTML("afterbegin", "<span class=\"materia\" aria-hidden=\"true\"></span>");
    }

    /* 3 · lavagna dei prodotti: si trascina con il mouse, scorre con il dito */
    document.querySelectorAll('[data-board]').forEach(function (b) {
      var giu = false, x0 = 0, s0 = 0, mosso = 0;
      b.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch') return;
        giu = true; mosso = 0; x0 = e.clientX; s0 = b.scrollLeft;
        b.classList.add('is-drag');   /* niente cattura del puntatore: rubava il clic ai link delle card */
      });
      b.addEventListener('pointermove', function (e) {
        if (!giu) return;
        var d = e.clientX - x0; mosso = Math.abs(d);
        b.scrollLeft = s0 - d;
      });
      ['pointerup', 'pointercancel'].forEach(function (ev) {
        b.addEventListener(ev, function () { giu = false; b.classList.remove('is-drag'); });
      });
      /* un trascinamento non deve aprire la scheda che sta sotto */
      b.addEventListener('click', function (e) { if (mosso > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
      /* clic su qualsiasi punto della card: apre la sua pagina (anche se il bersaglio è la superficie o l'immagine) */
      b.addEventListener('click', function (e) {
        if (mosso > 6 || e.defaultPrevented) return;
        var card = e.target.closest && e.target.closest('.card'); if (!card) return;
        var link = card.querySelector('a.card-link'); if (!link || e.target.closest('a')) return;
        location.href = link.href;
      });
    });

    /* 3bis · gallery "jelly sheet" (reference: Infinite Jelly Glass, reinterpretata in DOM).
       Catena fisica, niente transition CSS:
         puntatore → contenitore (molla) → ogni card (molla propria, in ritardo)
       - drag: il contenitore segue il trascinamento in modo elastico (con
         resistenza) e al rilascio torna al centro con overshoot;
       - senza drag il mouse sposta appena il contenitore (parallasse lieve);
       - ogni card insegue il contenitore con una molla: la differenza tra le due
         posizioni è la "gelatina". Quella differenza e la velocità producono
         skew, schiacciamento/allungamento e una piccola rotazione 3D, sempre
         opposti al movimento. Dopo lo stop la card oscilla e si smorza.
       - propagazione: le card più lontane dal punto di presa hanno una molla più
         morbida → rispondono dopo, e l'onda attraversa la griglia;
       - deformazione ∝ velocità (curva quadratica: quasi nulla a bassa velocità);
       - --jv (0…1) guida l'intensità del bordo di vetro refrattivo in CSS.
       Mobile / touch: versione ridotta, reagisce solo alla velocità di scroll. */
    document.querySelectorAll('[data-board]').forEach(function (b) {
      if (b.dataset.g3d) return;
      b.dataset.g3d = '1';
      b.classList.add('is-gallery');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var track = b.querySelector('.board-track');
      var carte = [].slice.call(b.querySelectorAll('.card'));
      var touch = window.matchMedia('(hover: none)').matches;
      return;   /* niente più deformazione del contenitore al trascinamento */
      var C = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };           /* contenitore */
      var S = carte.map(function () { return { x: 0, y: 0, vx: 0, vy: 0 }; });
      var giu = false, gx = 0, gy = 0, px = 0, py = 0, raf = 0, ultimoScroll = window.scrollY;
      function avvia() { if (!raf) raf = requestAnimationFrame(passo); }

      if (!touch) {
        b.addEventListener('pointerdown', function (e) {
          giu = true; gx = e.clientX - C.tx * 2.2; gy = e.clientY - C.ty * 2.2; px = e.clientX; py = e.clientY; avvia();
        });
        window.addEventListener('pointerup', function () { if (giu) { giu = false; C.tx = 0; C.ty = 0; avvia(); } });
        b.addEventListener('pointermove', function (e) {
          px = e.clientX; py = e.clientY;
          if (giu) {
            /* resistenza elastica: più tiri, meno si sposta (max ~90px) */
            var dx = (e.clientX - gx) / 2.2, dy = (e.clientY - gy) / 2.2;
            C.tx = 90 * Math.tanh(dx / 90); C.ty = 40 * Math.tanh(dy / 40);
          } else {
            var r = b.getBoundingClientRect();
            C.tx = 0; /* senza drag il contenitore resta fermo: modella la card (3ter) */
            C.ty = 0;
          }
          avvia();
        });
        b.addEventListener('pointerleave', function () { if (!giu) { C.tx = 0; C.ty = 0; avvia(); } });
      } else {
        window.addEventListener('scroll', function () {
          var d = window.scrollY - ultimoScroll; ultimoScroll = window.scrollY;
          C.vy += Math.max(-30, Math.min(30, d)) * 0.12; avvia();
        }, { passive: true });
      }

      function passo() {
        raf = 0;
        /* contenitore: molla abbastanza rigida, poco attrito → overshoot controllato */
        C.vx = (C.vx + (C.tx - C.x) * 0.10) * 0.80; C.x += C.vx;
        C.vy = (C.vy + (C.ty - C.y) * 0.10) * 0.80; C.y += C.vy;
        track.style.transform = 'translate3d(' + C.x.toFixed(2) + 'px,' + C.y.toFixed(2) + 'px,0)';
        var br = b.getBoundingClientRect(), attivo = Math.abs(C.vx) + Math.abs(C.vy) + Math.abs(C.tx - C.x) + Math.abs(C.ty - C.y) > 0.02;
        for (var i = 0; i < carte.length; i++) {
          var c = carte[i], s = S[i];
          /* distanza dal puntatore → molla più morbida per le card lontane (onda) */
          var cx = br.left + c.offsetLeft + c.offsetWidth / 2, cy = br.top + c.offsetTop + c.offsetHeight / 2;
          var dist = touch ? 0 : Math.min(Math.hypot(cx - px, cy - py) / 700, 1);
          var k = 0.16 - dist * 0.07, att = 0.82 + dist * 0.04;
          s.vx = (s.vx + (C.x - s.x) * k) * att; s.x += s.vx;
          s.vy = (s.vy + (C.y - s.y) * k) * att; s.y += s.vy;
          /* ritardo della card rispetto al contenitore (in px) e sua velocità */
          var lx = s.x - C.x, ly = s.y - C.y;
          var v = Math.hypot(s.vx, s.vy), e2 = Math.min(1, Math.pow(v / 14, 2));   /* sottile a bassa velocità */
          var sk = Math.max(-1, Math.min(1, lx / 30)), sy = Math.max(-1, Math.min(1, ly / 30));
          c.style.transform = 'translate3d(' + lx.toFixed(2) + 'px,' + ly.toFixed(2) + 'px,0) ' +
            'perspective(1000px) rotateY(' + (sk * 4).toFixed(2) + 'deg) rotateX(' + (-sy * 3).toFixed(2) + 'deg) ' +
            'skew(' + (sk * 3.2).toFixed(2) + 'deg,' + (sy * 1.6).toFixed(2) + 'deg) ' +
            'scale(' + (1 + Math.abs(sk) * 0.018 - Math.abs(sy) * 0.012).toFixed(4) + ',' + (1 + Math.abs(sy) * 0.018 - Math.abs(sk) * 0.012).toFixed(4) + ')';
          c.style.setProperty('--jv', Math.max(e2, Math.min(1, (Math.abs(sk) + Math.abs(sy)) * 0.8)).toFixed(3));
          c.style.setProperty('--jx', sk.toFixed(3));
          if (Math.abs(lx) + Math.abs(ly) + v > 0.03) attivo = true;
        }
        if (attivo || giu) raf = requestAnimationFrame(passo);
        else { track.style.transform = ''; carte.forEach(function (c) { c.style.transform = ''; c.style.setProperty('--jv', 0); }); }
      }
    });


    /* 4 · la hero occupa esattamente lo spazio che resta sotto le barre */
    var heroFull = document.querySelector('.hero-full');
    if (heroFull) {
      var misuraHero = function () {
        heroFull.style.minHeight = '';
        var top = heroFull.getBoundingClientRect().top + window.scrollY;
        heroFull.style.minHeight = Math.max(420, window.innerHeight - top) + 'px';
      };
      misuraHero();
      window.addEventListener('resize', misuraHero);
      window.addEventListener('load', misuraHero);
    }

    /* 5 · riflesso della hero che segue il puntatore */
    var hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty('--hx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
        hero.style.setProperty('--hy', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
      });
    }
  }

  /* Il testo guida della ricerca si scrive da solo, come nella reference:
     una lettera ogni 60 ms, e si ferma appena si clicca dentro. */
  function ricercaScritta() {
    var campo = document.querySelector('.hero-cnt .search input');
    if (!campo) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var frasi = ['Cerca macchine, prodotti, settori', 'Lavapavimenti per capannoni',
                 'Noleggio spazzatrice', 'Detergente per gres'];
    var f = 0, i = 0, cancella = false, fermo = false;
    campo.placeholder = '';
    function passo() {
      if (fermo) return;
      var testo = frasi[f];
      i += cancella ? -1 : 1;
      campo.placeholder = testo.slice(0, i);
      var attesa = cancella ? 28 : 60;
      if (!cancella && i === testo.length) { cancella = true; attesa = 2200; }
      else if (cancella && i === 0) { cancella = false; f = (f + 1) % frasi.length; attesa = 320; }
      setTimeout(passo, attesa);
    }
    setTimeout(passo, 900);
    ['focus', 'pointerdown'].forEach(function (ev) {
      campo.addEventListener(ev, function () {
        fermo = true;
        campo.placeholder = frasi[0];
      }, { once: true });
    });
  }

  /* CARTE JELLY · su tutto il sito (prima solo in home).
     Card, formule e sedi si modellano come gelatina sotto il mouse. */
  /* Card: risposta al puntatore SENZA filtri di deformazione.
     Il filtro SVG produceva bordi frastagliati e lasciava intravedere il fondo:
     al suo posto la card si inclina verso il puntatore e una luce morbida
     scorre sulla superficie. Nessun pixel viene spostato, quindi niente difetti. */
  /* GELATINA DI VETRO (rif. infinite-jelly-glass.shader.se)
     Là tutta la pagina è una canvas WebGL e le card sono texture dentro lo
     shader. Qui le card sono HTML, quindi la lente si costruisce con un filtro
     SVG: una mappa radiale morbida (spinta verso l'esterno + rigonfiamento)
     che segue il puntatore con una molla poco smorzata. Effetto: la superficie
     si gonfia sotto il dito, il contenuto attorno si piega come dietro al
     vetro e, uscendo, rientra ondeggiando.
     Regole fisse: il testo non entra mai nel filtro, l'area del filtro è
     proporzionale alla card (niente tagli), sotto c'è sempre una superficie
     opaca (niente buchi). */
  function carteGelatina() {
    var DEFORMA = false;   /* gelatina spenta su tutte le card (richiesta di revisione): resta solo la superficie */
    /* GELATINA VETTORIALE. La deformazione non sposta più pixel (il filtro SVG
       dava bordi a scalini e linee che non combaciavano): la superficie della
       card è un tracciato SVG e il contorno dell'immagine è un clip-path, e
       tutti e due vengono ricalcolati dalla STESSA funzione di deformazione.
       Così i bordi restano vettoriali, lisci a qualsiasi intensità, e
       superficie e immagine si piegano insieme.
       La funzione: una "mano" che insegue il puntatore con una molla poco
       smorzata. Vicino alla mano il contorno si gonfia verso l'esterno e viene
       trascinato nella direzione del gesto; uscendo rientra ondeggiando.
       Il testo non si deforma mai. */
    var carte = [].slice.call(document.querySelectorAll('.card, .formula, .sede'));
    if (!carte.length || window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;
    var NS = 'http://www.w3.org/2000/svg';

    /* contorno di un rettangolo arrotondato campionato in n punti (senso orario) */
    function contorno(w, h, r, n) {
      r = Math.min(r, w / 2, h / 2);
      var lati = [w - 2 * r, h - 2 * r, w - 2 * r, h - 2 * r], arco = Math.PI * r / 2;
      var tot = 2 * (w + h) - 8 * r + 4 * arco, pts = [];
      for (var i = 0; i < n; i++) {
        var s = tot * i / n, k = 0, x, y;
        var seg = [lati[0], arco, lati[1], arco, lati[2], arco, lati[3], arco];
        while (s > seg[k]) { s -= seg[k]; k++; }
        var a = s / r;
        switch (k) {
          case 0: x = r + s; y = 0; break;
          case 1: x = w - r + Math.sin(a) * r; y = r - Math.cos(a) * r; break;
          case 2: x = w; y = r + s; break;
          case 3: x = w - r + Math.cos(a) * r; y = h - r + Math.sin(a) * r; break;
          case 4: x = w - r - s; y = h; break;
          case 5: x = r - Math.sin(a) * r; y = h - r + Math.cos(a) * r; break;
          case 6: x = 0; y = h - r - s; break;
          default: x = r - Math.cos(a) * r; y = r - Math.sin(a) * r;
        }
        pts.push([x, y]);
      }
      return pts;
    }
    /* tracciato liscio (Catmull-Rom → Bézier) da una lista chiusa di punti */
    function liscio(p, ox, oy) {
      var n = p.length, d = 'M' + (p[0][0] - ox).toFixed(1) + ' ' + (p[0][1] - oy).toFixed(1);
      for (var i = 0; i < n; i++) {
        var p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
        d += 'C' + (p1[0] + (p2[0] - p0[0]) / 6 - ox).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6 - oy).toFixed(1) + ' ' +
          (p2[0] - (p3[0] - p1[0]) / 6 - ox).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6 - oy).toFixed(1) + ' ' +
          (p2[0] - ox).toFixed(1) + ' ' + (p2[1] - oy).toFixed(1);
      }
      return d + 'Z';
    }

    carte.forEach(function (c) {
      var sagoma = document.createElementNS(NS, 'svg');
      sagoma.setAttribute('class', 'card-sagoma'); sagoma.setAttribute('aria-hidden', 'true');
      var path = document.createElementNS(NS, 'path'); sagoma.appendChild(path);
      c.insertBefore(sagoma, c.firstChild);
      c.classList.add('ha-sagoma');
      var media = c.querySelector('.card-media, .formula-art');
      var W, H, R, base, baseM, mo = [0, 0], RM;

      function misura() {
        W = c.offsetWidth; H = c.offsetHeight;
        if (W < 2 || H < 2) { base = null; return; }   /* card nascosta: si misura al primo passaggio */
        R = parseFloat(getComputedStyle(c).borderTopLeftRadius) || 24;
        sagoma.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        base = contorno(W, H, R, 96);
        if (media) {
          mo = [media.offsetLeft, media.offsetTop];
          RM = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--raggio')) || 22;   /* stesso raggio di tutto il sito */
          baseM = contorno(media.offsetWidth - 20, media.offsetHeight - 20, RM, 72).map(function (q) { return [q[0] + mo[0] + 10, q[1] + mo[1] + 10]; });
        }
        disegna(0, 0, 0, 0, 0);
      }
      /* deformazione di un punto: gonfiore radiale + trascinamento col gesto */
      function deforma(p, hx, hy, gon, tx, ty, sig) {
        var dx = p[0] - hx, dy = p[1] - hy, d2 = dx * dx + dy * dy, g = Math.exp(-d2 / (2 * sig * sig));
        var d = Math.sqrt(d2) || 1;
        return [p[0] + (dx / d) * gon * g + tx * g, p[1] + (dy / d) * gon * g + ty * g];
      }
      function disegna(hx, hy, gon, tx, ty) {
        if (!base) return;
        var sig = Math.max(W, H) * 0.32;
        var P = base.map(function (p) { return deforma(p, hx, hy, gon, tx, ty, sig); });
        path.setAttribute('d', liscio(P, 0, 0));
        if (media && baseM) {
          var M = baseM.map(function (p) { return deforma(p, hx, hy, gon * 0.8, tx * 0.9, ty * 0.9, sig); });
          media.style.clipPath = 'path("' + liscio(M, mo[0], mo[1]) + '")';
        }
      }

      var mx = 0, my = 0, hx = 0, hy = 0, vx = 0, vy = 0, forza = 0, sopra = 0, raf = 0, dxs = 0, dys = 0;
      function giro() {
        raf = 0;
        /* la mano insegue il puntatore: molla morbida, coda lunga */
        vx = (vx + (mx - hx) * 0.06) * 0.88; hx += vx;
        vy = (vy + (my - hy) * 0.06) * 0.88; hy += vy;
        forza += (sopra - forza) * 0.06;
        /* trascinamento = ritardo della mano, ammorbidito e limitato */
        dxs += ((mx - hx) - dxs) * 0.2; dys += ((my - hy) - dys) * 0.2;
        var lim = Math.min(W, H) * 0.08;
        var tx = Math.max(-lim, Math.min(lim, dxs * 0.35)) * forza, ty = Math.max(-lim, Math.min(lim, dys * 0.35)) * forza;
        var gon = forza * (6 + Math.min(Math.hypot(dxs, dys), 60) * 0.17);    /* gonfiore: 6px fermi, fino a ~16 */
        disegna(hx, hy, gon, tx, ty);
        if (sopra || forza > 0.003 || Math.abs(vx) + Math.abs(vy) > 0.05) raf = requestAnimationFrame(giro);
        else disegna(0, 0, 0, 0, 0);
      }
      function locale(e) {
        var r = c.getBoundingClientRect();
        return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height];
      }
      misura();
      window.addEventListener('resize', misura);
      window.addEventListener('load', misura);
      c.addEventListener('pointerenter', function (e) {
        misura(); var q = locale(e); mx = hx = q[0]; my = hy = q[1]; vx = vy = dxs = dys = 0; sopra = DEFORMA ? 1 : 0;
        if (!raf) raf = requestAnimationFrame(giro);
      });
      c.addEventListener('pointermove', function (e) {
        var q = locale(e); mx = q[0]; my = q[1];
        if (!raf) raf = requestAnimationFrame(giro);
      });
      c.addEventListener('pointerleave', function () { sopra = 0; if (!raf) raf = requestAnimationFrame(giro); });
    });
  }

  /* Testate delle pagine interne (non la home): il testo sotto il titolo è largo quanto il titolo.
     Si misura la riga più lunga del titolo così com'è impaginato e la si usa come larghezza massima del testo. */
  function testoComeTitolo() {
    if (document.body.dataset.pagina === 'home') return;
    var testate = [].slice.call(document.querySelectorAll('.row-testata > .block, .scheda-mosaico .intro-testata, .pagina-intro'));
    if (!testate.length) return;
    function misura() {
      testate.forEach(function (b) {
        var h = b.querySelector('h1'); if (!h) return;
        var testi = [].slice.call(b.querySelectorAll(':scope > :is(.lede, p.claim, p:not([class]))'));
        if (!testi.length) return;
        testi.forEach(function (t) { t.style.maxWidth = ''; t.style.width = ''; });
        var rg = document.createRange(); rg.selectNodeContents(h);
        var w = 0; [].forEach.call(rg.getClientRects(), function (r) { w = Math.max(w, r.right - h.getBoundingClientRect().left); });
        if (w > 0) testi.forEach(function (t) { var px = Math.max(Math.ceil(w), 380); t.style.setProperty('max-width', 'calc(100vw - 32px)', 'important'); t.style.setProperty('width', px + 'px', 'important'); });
      });
    }
    misura();
    window.addEventListener('load', misura);
    window.addEventListener('resize', function () { clearTimeout(misura.t); misura.t = setTimeout(misura, 120); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(misura);
  }

  function carteTilt() {
    var carte = [].slice.call(document.querySelectorAll('.card, .formula, .sede'));
    carte.forEach(function (c) {
      if (!c.querySelector('.card-fondo')) {
        var f = document.createElement('span');
        f.className = 'card-fondo'; f.setAttribute('aria-hidden', 'true');
        c.insertBefore(f, c.firstChild);
      }
    });
    /* niente inclinazione 3D: la card in focus resta nitida (solo sollevamento via CSS) */
    return;
    if (!carte.length || window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;

    carte.forEach(function (c) {
      var rx = 0, ry = 0, tx = 0, ty = 0, gx = 50, gy = 50, dentro = 0, raf = 0;
      function giro() {
        raf = 0;
        rx += (tx - rx) * 0.12; ry += (ty - ry) * 0.12;
        c.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        c.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        c.style.setProperty('--gx', gx.toFixed(1) + '%');
        c.style.setProperty('--gy', gy.toFixed(1) + '%');
        if (dentro || Math.abs(rx) + Math.abs(ry) > 0.01) raf = requestAnimationFrame(giro);
      }
      function muovi(e) {
        var r = c.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        gx = px * 100; gy = py * 100;
        ty = (px - 0.5) * 7;          /* rotazione su Y: massimo 3,5° per lato */
        tx = (0.5 - py) * 5;          /* rotazione su X: più contenuta */
        if (!raf) raf = requestAnimationFrame(giro);
      }
      c.addEventListener('pointerenter', function (e) { dentro = 1; c.classList.add('is-tilt'); muovi(e); });
      c.addEventListener('pointermove', muovi);
      c.addEventListener('pointerleave', function () {
        dentro = 0; tx = ty = 0; c.classList.remove('is-tilt');
        if (!raf) raf = requestAnimationFrame(giro);
      });
    });
  }

  function carteJellyDisattivata() {
    /* 3ter · card modellabili come gelatina liquida.
       Sotto il puntatore una "mano" invisibile deforma localmente la card (filtro
       SVG feDisplacementMap con mappe create una volta su canvas):
       - la mano insegue il mouse con una molla morbida e poco smorzata: la
         gelatina viene trascinata dal gesto e, a mouse fermo, rientra ondeggiando;
       - tenendo premuto la superficie si incava attorno al punto e al rilascio
         rimbalza;
       - si deformano solo la lastra (strato .card-fondo) e l'immagine: il testo
         resta nitido e fermo. Le due parti usano la stessa mano, riportata nelle
         coordinate di ciascuna, così si muovono come un unico corpo.
       Touch / movimento ridotto: disattivato. */
    (function () {
      var carte = [].slice.call(document.querySelectorAll('.card, .formula, .sede'));
      carte.forEach(function (c) {
        if (c.querySelector('.card-fondo')) return;
        var f = document.createElement('span'); f.className = 'card-fondo'; f.setAttribute('aria-hidden', 'true');
        c.insertBefore(f, c.firstChild);
      });
      if (!carte.length || window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;
      var N = 256, D = 320;
      function mappa(tipo) {
        var cv = document.createElement('canvas'); cv.width = cv.height = N;
        var g = cv.getContext('2d'), im = g.createImageData(N, N), d = im.data;
        for (var yy = 0; yy < N; yy++) for (var xx = 0; xx < N; xx++) {
          var nx = (xx / (N - 1)) * 2 - 1, ny = (yy / (N - 1)) * 2 - 1, r2 = nx * nx + ny * ny;
          /* campana larga e morbida, che si annulla dolcemente sul bordo */
          var gau = r2 < 1 ? Math.exp(-r2 * 2.2) * Math.pow(1 - r2, 2) : 0;
          var o = (yy * N + xx) * 4, R, G;
          if (tipo === 'blob') { R = G = 0.5 + 0.5 * gau; }
          else { R = 0.5 + 0.8 * nx * gau; G = 0.5 + 0.8 * ny * gau; }
          d[o] = Math.round(Math.max(0, Math.min(1, R)) * 255); d[o + 1] = Math.round(Math.max(0, Math.min(1, G)) * 255);
          d[o + 2] = 128; d[o + 3] = 255;
        }
        g.putImageData(im, 0, 0); return cv.toDataURL();
      }
      var BLOB = mappa('blob'), LENTE = mappa('lente'), n = 0;
      function filtro() {
        var id = 'modella' + (n++);
        document.body.insertAdjacentHTML('beforeend', '<svg width="0" height="0" aria-hidden="true" style="position:absolute">' +
          '<filter id="' + id + '" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">' +
          '<feFlood flood-color="rgb(128,128,128)" result="neutro"/>' +
          '<feImage href="' + BLOB + '" x="0" y="0" width="' + D + '" height="' + D + '" preserveAspectRatio="none" result="b"/>' +
          '<feImage href="' + LENTE + '" x="0" y="0" width="' + D + '" height="' + D + '" preserveAspectRatio="none" result="l"/>' +
          '<feColorMatrix in="b" type="matrix" values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 1 0" result="dir"/>' +
          '<feComposite in="dir" in2="l" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" result="somma"/>' +
          '<feGaussianBlur in="somma" stdDeviation="7" result="liscia"/>' +
          '<feMerge result="m"><feMergeNode in="neutro"/><feMergeNode in="liscia"/></feMerge>' +
          '<feDisplacementMap in="SourceGraphic" in2="m" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></svg>');
        var f = document.getElementById(id);
        return { id: id, imgs: f.querySelectorAll('feImage'), cm: f.querySelector('feColorMatrix'),
          comp: f.querySelector('feComposite'), disp: f.querySelector('feDisplacementMap') };
      }

      /* Ogni card si deforma secondo quello che contiene: l'acqua delle
         lavapavimenti ondeggia a lungo, il getto delle idropulitrici è secco,
         l'aspiratore risucchia, il robot è preciso e quasi meccanico. */
      function materia(c) {
        var u = (c.querySelector('[data-url]') || {}).dataset;
        u = (u && u.url) || c.dataset.url || '';
        var m = {                       /* molla, smorzamento, ampiezza, lente, pressione */
          'lavapavimenti':   { k: .030, s: .93, a: 1.15, l:  .26, p: 42 },   /* acqua: onda lunga */
          'spazzatrici':     { k: .055, s: .86, a:  .95, l:  .16, p: 38 },   /* spazzola: trascina e rientra */
          'idropulitrici':   { k: .085, s: .80, a: 1.35, l:  .10, p: 56 },   /* getto: colpo secco */
          'aspiratori':      { k: .040, s: .90, a:  .80, l: -.34, p: 64 },   /* risucchio: si incava */
          'robot':           { k: .110, s: .74, a:  .62, l:  .12, p: 30 },   /* preciso, poco elastico */
          'altri-macchinari':{ k: .028, s: .94, a: 1.05, l:  .22, p: 44 },
          'noleggio':        { k: .045, s: .90, a: 1.10, l:  .24, p: 46 },
          'usato':           { k: .060, s: .85, a:  .88, l:  .18, p: 40 },
          'sedi':            { k: .070, s: .84, a:  .55, l:  .14, p: 26 }
        };
        for (var chiave in m) if (u.indexOf('/' + chiave) === 0 || u.indexOf(chiave) > -1) return m[chiave];
        if (c.classList.contains('sede')) return m['sedi'];
        if (c.classList.contains('formula')) return c.classList.contains('formula-usa') ? m['usato'] : m['noleggio'];
        return { k: .040, s: .90, a: 1.0, l: .20, p: 48 };
      }

      carte.forEach(function (c) {
        var M = materia(c);
        /* i filtri si creano al primo passaggio: pagine con molte card restano leggere */
        var parti = null;
        var media = c.querySelector('.card-media, .formula-art');
        function prepara() {
          if (parti) return;
          parti = [{ el: c.querySelector('.card-fondo'), f: filtro() }];
          if (media) parti.push({ el: media, f: filtro() });
        }
        var Ls = 0, mx = 0, my = 0, hx = 0, hy = 0, vx = 0, vy = 0, ax = 0, ay = 0, forza = 0, sopra = 0, prem = 0, p = 0, pv = 0, raf = 0;
        function giro() {
          raf = 0;
          /* molla morbida: la mano arriva lenta e ondeggia a lungo → liquido */
          vx = (vx + (mx - hx) * M.k) * M.s; hx += vx;
          vy = (vy + (my - hy) * M.k) * M.s; hy += vy;
          forza += (sopra - forza) * 0.04;
          pv = (pv + (prem - p) * 0.07) * 0.86; p += pv;
          var lx = mx - hx, ly = my - hy, L = Math.hypot(lx, ly);
          /* direzione del trascinamento, a sua volta ammorbidita */
          ax += (Math.max(-1, Math.min(1, lx / 55)) - ax) * 0.09;
          ay += (Math.max(-1, Math.min(1, ly / 55)) - ay) * 0.09;
          var lente = Math.max(-0.4, p * (M.l < 0 ? 1.3 : 1)) + forza * M.l;
          Ls += (L - Ls) * 0.08;                               /* intensità che cresce e cala piano */
          var sc = forza * (Math.min(Ls, 120) * 0.95 + 20) * M.a + Math.abs(p) * M.p;
          var vals = ax.toFixed(3) + ' 0 0 0 ' + (0.5 - 0.5 * ax).toFixed(3) + '  0 ' + ay.toFixed(3) + ' 0 0 ' + (0.5 - 0.5 * ay).toFixed(3) + '  0 0 0 0 .5  0 0 0 1 0';
          parti.forEach(function (q) {
            var ox = q.el === media ? media.offsetLeft : 0, oy = q.el === media ? media.offsetTop : 0;
            q.f.cm.setAttribute('values', vals);
            q.f.comp.setAttribute('k3', lente.toFixed(3)); q.f.comp.setAttribute('k4', (-0.5 * lente).toFixed(3));
            for (var k = 0; k < q.f.imgs.length; k++) {
              q.f.imgs[k].setAttribute('x', (hx - ox - D / 2).toFixed(1)); q.f.imgs[k].setAttribute('y', (hy - oy - D / 2).toFixed(1));
            }
            q.f.disp.setAttribute('scale', sc.toFixed(2));
            var u = (sopra || forza > 0.002) ? 'url(#' + q.f.id + ')' : '';   /* niente scatto on/off */
            if (q.el.style.filter !== u) q.el.style.filter = u;
          });
          if (sopra || forza > 0.004 || L > 0.3 || Math.abs(pv) + Math.abs(p) > 0.003) raf = requestAnimationFrame(giro);
          else parti.forEach(function (q) { q.el.style.filter = ''; });
        }
        function avvia() { if (parti && !raf) raf = requestAnimationFrame(giro); }
        function locale(e) { var r = c.getBoundingClientRect(); return [(e.clientX - r.left) * c.offsetWidth / r.width, (e.clientY - r.top) * c.offsetHeight / r.height]; }
        c.addEventListener('pointerenter', function (e) { prepara(); var q = locale(e); mx = hx = q[0]; my = hy = q[1]; vx = vy = 0; sopra = 1; avvia(); });
        c.addEventListener('pointermove', function (e) { var q = locale(e); mx = q[0]; my = q[1]; avvia(); });
        c.addEventListener('pointerdown', function () { prem = 0.9; avvia(); });
        c.addEventListener('pointerup', function () { prem = 0; avvia(); });
        c.addEventListener('pointerleave', function () { sopra = 0; prem = 0; avvia(); });
      });
    })();

  }

  /* HOME · forma di fondo. Una sola forma continua che dal gruppo in giù
     attraversa la pagina da destra a sinistra e ritorno, legando le sezioni.
     La materia è VERA: il tubo è riempito con la stessa materia della hero
     (lo shader FLUIDO_FS, pieghe di raso liquido con luce e riflessi),
     calcolata una volta e poi ferma; blu VI in alto, rossi VI dai marchi in
     giù, con passaggio sfumato. Sopra, solo una luce morbida lungo il dorso
     e un bordo che sfuma nel fondo: niente linee nette.
     Il percorso passa per punti morbidi (Catmull-Rom), con ampiezze diverse
     a ogni passaggio, ed entra ed esce fuori dallo schermo: non si vede mai
     un capo tagliato. */
  function formeLaterali() {
    if (window.matchMedia('(max-width: 767px)').matches) return;   /* home e pagine interne */
    var righe = [].slice.call(document.querySelectorAll('.wrap > .row')).filter(function (r) {
      return !r.classList.contains('wf-doc') && !r.querySelector('.hero-full') && r.getAttribute('data-mood') !== 'macchine';
    });
    if (!righe.length) return;

    /* materia: due tessere (blu e rossa) dallo shader della hero */
    var cv = document.createElement('canvas'); cv.width = 900; cv.height = 900;
    var gl = cv.getContext('webgl2', { antialias: false, alpha: false, preserveDrawingBuffer: true });
    if (!gl) return;
    var VS = '#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    var FS_BLU = FLUIDO_FS
      .replace('vec3 blu=vec3(0.,.522,.812),cri=vec3(.31,.741,.969)', 'vec3 blu=vec3(.008,.333,.702),cri=vec3(0.,.522,.812)')
      .replace('ros=vec3(.98,.76,.8),red=vec3(.894,0.,.169)', 'ros=vec3(.31,.741,.969),red=vec3(.008,.333,.702)')
      .replace('c=mix(c,bia,smoothstep(.54,.74,t));', 'c=mix(c,vec3(.31,.741,.969),smoothstep(.40,.62,t));c=mix(c,bia,smoothstep(.62,.80,t));')
      .replace('float vig=smoothstep(1.45,.15,length(uv-vec2(.5,.52)));col*=.84+.20*vig;', '');
    var FS_ROSSO = FLUIDO_FS
      .replace('vec3 blu=vec3(0.,.522,.812),cri=vec3(.31,.741,.969)', 'vec3 blu=vec3(.639,.063,0.),cri=vec3(.894,0.,.169)')
      .replace('ros=vec3(.98,.76,.8),red=vec3(.894,0.,.169)', 'ros=vec3(.953,.247,.329),red=vec3(.639,.063,0.)')
      .replace('c=mix(c,bia,smoothstep(.54,.74,t));', 'c=mix(c,vec3(.953,.247,.329),smoothstep(.40,.62,t));c=mix(c,bia,smoothstep(.62,.80,t));')
      .replace('col+=vec3(.52,.66,.78)*fr*.45;', 'col+=vec3(.95,.55,.6)*fr*.35;')
      .replace('col+=vec3(.9,.96,1.)*s2*.30;', 'col+=vec3(1.,.93,.94)*s2*.30;')
      .replace('float vig=smoothstep(1.45,.15,length(uv-vec2(.5,.52)));col*=.84+.20*vig;', '');
    function tessera(fs, fase) {
      function sh(t, s) { var x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); return x; }
      var pr = gl.createProgram();
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
      gl.useProgram(pr);
      var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      var lp = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(gl.getUniformLocation(pr, 'R'), cv.width, cv.height);
      gl.uniform1f(gl.getUniformLocation(pr, 'T'), fase);
      gl.uniform2f(gl.getUniformLocation(pr, 'M'), 0, 0);
      gl.uniform1f(gl.getUniformLocation(pr, 'MI'), 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      return cv.toDataURL('image/jpeg', 0.9);
    }
    var TB = tessera(FS_BLU, 0.31), TR = tessera(FS_ROSSO, 0.63);
    if (!TB || !TR) return;

    var box = document.createElement('div');
    box.className = 'forme-laterali'; box.setAttribute('aria-hidden', 'true');
    document.body.appendChild(box);

    /* Catmull-Rom → Bézier: curve continue, senza spigoli né tratti piatti */
    function curva(p) {
      var d = 'M' + p[0][0].toFixed(1) + ' ' + p[0][1].toFixed(1);
      for (var i = 0; i < p.length - 1; i++) {
        var p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)];
        d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' +
          (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' +
          p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
      }
      return d;
    }

    function posa() {
      /* fondale STATICO: la forma è composta sulla sola finestra e resta ferma;
         scorrendo cambia solo il suo colore, insieme al fondo */
      var W = document.documentElement.clientWidth, Hdoc = window.innerHeight;
      box.style.height = Hdoc + 'px';
      var y0 = Hdoc * 0.02;
      var ult = righe[righe.length - 1], r1 = ult.getBoundingClientRect();
      var y1 = Hdoc * 0.98;
      var rosso = righe.filter(function (r) { return r.getAttribute('data-mood') === 'rosso'; })[0];
      var yR = rosso ? rosso.getBoundingClientRect().top + window.scrollY : y1;
      var spess = Math.max(300, Math.min(W * 0.36, 560));

      /* punti morbidi: ampiezze diverse a ogni passaggio, capi fuori schermo */
      var n = 2, amp = [1.1, .95, 1.15, .9];   /* una sola grande U nella finestra */
      var pts = [[W * 1.35, y0 - spess * 1.6]];
      for (var i = 0; i <= n; i++) {
        var y = y0 + (y1 - y0) * (i / n);
        var a = amp[i % amp.length];
        /* le svolte cadono fuori schermo: a vista resta solo il tratto morbido */
        var x = i % 2 === 0 ? W * (0.5 + 0.46 * a) : W * (0.5 - 0.46 * a);   /* le curve a U restano visibili ai lati */
        pts.push([x, y]);
      }
      var last = pts[pts.length - 1];
      pts.push([last[0] < W / 2 ? -W * 0.35 : W * 1.35, y1 + spess * 1.6]);
      var d = curva(pts);
      var sR = Math.max(0, Math.min(1, (yR - y0) / Math.max(1, y1 - y0)));
      var Y0 = y0 - spess * 2, Y1 = y1 + spess * 2;
      var fu = 'filterUnits="userSpaceOnUse" x="' + (-W) + '" y="' + (Y0 - 200) + '" width="' + (W * 3) + '" height="' + (Y1 - Y0 + 400) + '"';

      /* Stile della reference (bolla di vetro a U): la forma è quasi tutta
         trasparente. Si vedono solo
           - il contorno: due fili di luce sottili lungo i bordi, con un alone;
           - dentro, alcune fiamme di luce morbide che seguono la curva.
         Viene disegnata in DUE toni (blu VI e rosso VI) su due tele
         sovrapposte: il CSS accende quella del colore di fondo attivo, con la
         stessa dissolvenza del fondo, così forma e fondo cambiano insieme e
         non c'è mai un tratto del colore sbagliato. */
      var bordo = Math.max(5, spess * 0.014), fu2 = fu;   /* sul fondo chiaro i fili sono nel colore pieno VI */
      function tono(t) {
        var P = t === 'blu'
          ? { alone: '#4fbdf7', filo: '#0085cf', filo2: '#4fbdf7', corpo: '#4fbdf7', fiamme: ['#4fbdf7', '#0085cf', '#bfe6fb', '#0085cf'] }
          : { alone: '#f33f54', filo: '#e4002b', filo2: '#f33f54', corpo: '#f33f54', fiamme: ['#f33f54', '#e4002b', '#ffd3d9', '#e4002b'] };
        var id = 'u' + t;
        /* contorno ottenuto con una maschera: nastro pieno meno nastro poco più stretto */
        var maschera = '<mask id="' + id + 'm" maskUnits="userSpaceOnUse" x="' + (-W) + '" y="' + Y0 + '" width="' + (W * 3) + '" height="' + (Y1 - Y0) + '">' +
          '<path d="' + d + '" fill="none" stroke="#fff" stroke-width="' + spess + '" stroke-linecap="round"/>' +
          '<path d="' + d + '" fill="none" stroke="#000" stroke-width="' + (spess - bordo * 2) + '" stroke-linecap="round"/></mask>' +
          '<mask id="' + id + 'm2" maskUnits="userSpaceOnUse" x="' + (-W) + '" y="' + Y0 + '" width="' + (W * 3) + '" height="' + (Y1 - Y0) + '">' +
          '<path d="' + d + '" transform="translate(' + (spess * .05) + ' ' + (spess * .09) + ')" fill="none" stroke="#fff" stroke-width="' + (spess * .82) + '" stroke-linecap="round"/>' +
          '<path d="' + d + '" transform="translate(' + (spess * .05) + ' ' + (spess * .09) + ')" fill="none" stroke="#000" stroke-width="' + (spess * .82 - bordo * 1.4) + '" stroke-linecap="round"/></mask>';
        var f = function (n, s) { return '<filter id="' + id + n + '" ' + fu2 + '><feGaussianBlur stdDeviation="' + s.toFixed(1) + '"/></filter>'; };
        var rett = function (fill, m, filt, op) {
          return '<g' + (filt ? ' filter="url(#' + id + filt + ')"' : '') + ' opacity="' + op + '"><rect x="' + (-W) + '" y="' + Y0 + '" width="' + (W * 3) + '" height="' + (Y1 - Y0) +
            '" fill="' + fill + '" mask="url(#' + id + m + ')"/></g>';
        };
        /* fiamme: tratti della curva (tratteggio lungo) spostati verso l'interno e sfocati */
        var fiamme = P.fiamme.map(function (c, k) {
          var off = spess * (0.12 + k * 0.08), dash = spess * (0.9 + k * 0.35), gap = spess * (3.2 + k * 1.1);
          return '<path d="' + d + '" transform="translate(' + (off * .3).toFixed(1) + ' ' + off.toFixed(1) + ')" fill="none" stroke="' + c +
            '" stroke-opacity="' + (k === 3 ? .5 : .75) + '" stroke-width="' + (spess * (0.07 - k * 0.012)).toFixed(1) + '" stroke-linecap="round"' +
            ' stroke-dasharray="' + dash.toFixed(0) + ' ' + gap.toFixed(0) + '" stroke-dashoffset="' + (k * spess * 1.3).toFixed(0) + '" filter="url(#' + id + 'f' + ')"/>';
        }).join('');
        /* MATERIA: dentro la forma scorre la stessa materia della hero (pieghe di
           raso liquido), molto trasparente e con i bordi sciolti: dà alla
           gelatina spessore, rifrazione e luce interna, non solo un contorno */
        var tex = t === 'blu' ? TB : TR;
        var materia = '<pattern id="' + id + 'p" patternUnits="userSpaceOnUse" width="' + (W * 1.2).toFixed(0) + '" height="' + (W * 1.2).toFixed(0) + '">' +
            '<image href="' + tex + '" width="' + (W * 1.2).toFixed(0) + '" height="' + (W * 1.2).toFixed(0) + '" preserveAspectRatio="none"/></pattern>' +
          '<mask id="' + id + 'mm" maskUnits="userSpaceOnUse" x="' + (-W) + '" y="' + Y0 + '" width="' + (W * 3) + '" height="' + (Y1 - Y0) + '">' +
            '<path d="' + d + '" fill="none" stroke="#fff" stroke-width="' + (spess * .92).toFixed(1) + '" stroke-linecap="round" filter="url(#' + id + 'c)"/></mask>';
        var corpoMateria = '<rect x="' + (-W) + '" y="' + Y0 + '" width="' + (W * 3) + '" height="' + (Y1 - Y0) + '" fill="url(#' + id + 'p)" mask="url(#' + id + 'mm)" opacity=".42"/>' +
          /* luce interna: una banda chiara morbida verso il lato illuminato */
          '<path d="' + d + '" transform="translate(' + (-spess * .06).toFixed(1) + ' ' + (-spess * .16).toFixed(1) + ')" fill="none" stroke="#fff" stroke-opacity=".30" stroke-width="' + (spess * .22).toFixed(1) + '" stroke-linecap="round" filter="url(#' + id + 'c)"/>';
        return '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + Hdoc + '" viewBox="0 0 ' + W + ' ' + Hdoc + '">' +
          '<defs>' + maschera + materia + f('a', spess * .035) + f('g', bordo * 1.6) + f('c', spess * .12) + f('f', spess * .03) + '</defs>' +
          rett(P.alone, 'm', 'a', .8) +           /* alone del contorno */
          corpoMateria +
          '<path d="' + d + '" fill="none" stroke="' + P.corpo + '" stroke-opacity=".16" stroke-width="' + (spess * .9).toFixed(1) + '" stroke-linecap="round" filter="url(#' + id + 'c)"/>' +   /* corpo di gelatina: volume traslucido */
          rett(P.filo, 'm', 'g', .55) +           /* filo di luce esterno, morbido */
          rett(P.filo2, 'm2', 'g', .4) +          /* secondo filo, più interno */
          fiamme +
          '</svg>';
      }
      var sc = 0.5;
      box.innerHTML = '';
      ['blu', 'rosso'].forEach(function (t) {
        var img = new Image(), tela = document.createElement('canvas');
        tela.className = 'tono-' + t;
        tela.width = Math.round(W * sc); tela.height = Math.round(Hdoc * sc);
        tela.style.cssText = 'position:absolute;left:0;top:0;width:' + W + 'px;height:' + Hdoc + 'px';
        img.onload = function () { var g = tela.getContext('2d'); g.scale(sc, sc); g.drawImage(img, 0, 0); };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(tono(t));
        box.appendChild(tela);
      });
    }
    posa();
    /* fondo quasi fermo: lo strato delle forme scorre al 70% della pagina, così
       il contenuto sopra sembra muoversi e la forma resta come un fondale.
       Il disegno viene compresso in altezza dello stesso fattore, quindi a
       metà pagina la forma è ancora dove deve essere. */
    var K = 0, attesa = false;   /* 0 = fermo: la pagina scorre sopra un fondale immobile */
    box.classList.add('is-fondale');
    function fondale() {
      attesa = false;
      var H = document.documentElement.scrollHeight, vh = window.innerHeight;
      box.style.height = ((H - vh) * K + vh) + 'px';
      box.style.transform = 'translate3d(0,' + (-window.scrollY * K).toFixed(1) + 'px,0)';
      [].forEach.call(box.children, function (c) { c.style.height = ((H - vh) * K + vh) + 'px'; });
    }
    fondale();
    window.addEventListener('scroll', function () { if (!attesa) { attesa = true; requestAnimationFrame(fondale); } }, { passive: true });
    window.addEventListener('load', posa);
    window.addEventListener('resize', posa);
    window.addEventListener('load', fondale);
    window.addEventListener('resize', fondale);
  }

  /* PAGINE INTERNE · stessa grammatica della home (docs/linguaggio-visivo.md).
     La prima sezione (titolo e introduzione) è la "testata" su fondo rosso VI;
     scorrendo, il fondo vira all'azzurro con la stessa dissolvenza della home. */
    var ICONE = {
      'industria': '<path d="M3 21V10l6 4V10l6 4V6h6v15z"/><path d="M7 17h2M13 17h2M17 10h2"/>',
      'imprese-di-pulizia': '<path d="M6 10h12l-1.5 11h-9z"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M10 14v3M14 14v3"/>',
      'horeca': '<path d="M5 3v8a3 3 0 0 0 6 0V3M8 3v18"/><path d="M17 3c-2 2-2 7 0 9v9"/>',
      'retail': '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
      'logistica': '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
      'officine-metalmeccanica': '<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L3 18l3 3 6.2-6.2a4 4 0 0 0 5.3-5.3l-2.6 2.6-2.4-.6-.6-2.4z"/>',
      'edilizia-cantieri': '<path d="M3 18h18"/><path d="M5 18a7 7 0 0 1 14 0"/><path d="M12 7v4M9.5 8l.7 3.3M14.5 8l-.7 3.3"/>',
      'lavapavimenti': '<path d="M8 3v10"/><path d="M5 13h12a3 3 0 0 1 3 3v1H4v-1a3 3 0 0 1 1-3z"/><circle cx="8" cy="20" r="1.5"/><circle cx="16" cy="20" r="1.5"/>',
      'spazzatrici': '<path d="M15 3l-4 9"/><path d="M6 12h9l2 9H4z"/><path d="M8 16v4M12 16v4"/>',
      'idropulitrici': '<path d="M3 8h10l3 3v2h-3l-1 7H8l1-7H3z"/><path d="M17 10h3M18.5 6.5l2-1M18.5 13.5l2 1"/>',
      'aspiratori': '<rect x="5" y="8" width="11" height="11" rx="3"/><path d="M10.5 8V4h6l3 4"/><circle cx="8" cy="21" r="1"/><circle cx="13" cy="21" r="1"/>',
      'robot': '<rect x="5" y="8" width="14" height="10" rx="3"/><path d="M12 4v4"/><circle cx="12" cy="3" r="1"/><circle cx="9.5" cy="13" r="1"/><circle cx="14.5" cy="13" r="1"/>',
      'altri-macchinari': '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'
    };
  function scenaInterna() {
    if (document.body.dataset.pagina === 'home' || document.querySelector('.mood')) return;
    if (!document.body.dataset.slug) {   /* indirizzo della pagina, per regole di pagina (es. testate in nero) */
      var db = document.querySelector('[data-devbar]'); if (db && db.dataset.url) document.body.dataset.slug = db.dataset.url.split(' ')[0];
    }
    /* APPROFONDIMENTI: ogni card porta al modello d'articolo con il proprio titolo (?t=),
       così ogni approfondimento ha la sua testata, la sua immagine e lo stesso impaginato */
    /* il titolo si aggiunge al momento del clic (i link vengono riscritti dopo il caricamento) */
    document.addEventListener('click', function (e) {
      var c = e.target.closest && e.target.closest('.card'); if (!c) return;
      var l = c.querySelector('.card-link'), n = c.querySelector('.card-name');
      if (!l || !n || !/12-articolo\.html/.test(l.getAttribute('href') || '')) return;
      l.setAttribute('href', l.getAttribute('href').split('?')[0] + '?t=' + encodeURIComponent(n.textContent.trim()));
    }, true);
    var tArt = (location.search.match(/[?&]t=([^&]+)/) || [])[1];
    if (tArt && /12-articolo\.html/.test(location.pathname)) {
      tArt = decodeURIComponent(tArt.replace(/\+/g, ' '));
      var h1a = document.querySelector('.wrap > .row h1'); if (h1a) h1a.textContent = tArt;
      var cra = document.querySelector('.crumbs [aria-current="page"]'); if (cra) cra.textContent = tArt;
      document.title = 'D12 · ' + tArt + ' — Wireframe Socaf';
    }

    /* contenitori di stato visibili (es. risultati della ricerca): le loro sezioni
       diventano sezioni della pagina, così valgono le stesse regole di tutte le altre */
    document.querySelectorAll('.wrap > div:not(.row):not([hidden]):not(.split)').forEach(function (c) {
      [].slice.call(c.querySelectorAll(':scope > .row')).forEach(function (r) { if (c.hasAttribute('data-results-full')) r.setAttribute('data-da-risultati', ''); c.parentNode.insertBefore(r, c); });
      if (!c.querySelector('.row')) c.style.display = 'none';
    });
    var righe = [].slice.call(document.querySelectorAll('.wrap > .row, .wrap > div:not(.row) > .row')).filter(function (r) { return !r.classList.contains('wf-doc'); });
    righe.forEach(function (r) { r.classList.add('row-int'); });   /* anche le sezioni dentro i contenitori di stato (ricerca) */
    /* scheda macchina: colonne (.split) invece di righe. Stesso mosaico: le
       sezioni a sinistra sono tessere bianche, la colonna del modulo è vetro */
    if (!righe.length && document.querySelector('.wrap > .split')) {
      document.body.classList.add('pagina-interna', 'scheda-mosaico', 'mood-macchine');
  document.body.removeAttribute('data-testata');
      document.body.insertAdjacentHTML('afterbegin', '<div class="mood" aria-hidden="true"><span class="chiaro"></span><span class="macchine"></span><span class="blu"></span><span class="azzurro"></span><span class="rosso"></span></div>');
      document.querySelectorAll('.wrap > .split > div:not(.sticky-col) > .block').forEach(function (b) { b.classList.add('t-bianca'); });
      document.querySelectorAll('.wrap > .split .sticky-col .block, .wrap > .split .sticky-col > .form').forEach(function (b) { b.classList.add('t-vetro'); });
  immaginiSegnaposto();
  /* « Dove si usa »: striscia a icone come « Per il tuo settore » */
  document.querySelectorAll('.wrap > .split .block').forEach(function (b) {
    var h = b.querySelector('h2'), ch = b.querySelector('.chips');
    if (!h || !ch || !/Dove si usa|Su quali macchine/i.test(h.textContent)) return;
    b.classList.add('striscia-scheda');
    ch.classList.add('tiles', 'tiles-icone');
    ch.querySelectorAll('a, span.chip').forEach(function (c) {
      var u = c.getAttribute('data-url') || c.getAttribute('href') || '', k = null;
      Object.keys(ICONE).forEach(function (x) { if (!k && (u.indexOf('/' + x + '/') > -1 || u.indexOf('=' + x) > -1)) k = x; });
      var nm = c.textContent.trim();
      c.className = 'tile';
      c.innerHTML = '<svg class="tile-ico" viewBox="0 0 24 24" aria-hidden="true">' + (ICONE[k] || ICONE['altri-macchinari']) + '</svg><span>' + nm + '</span>';
    });
  });
  /* galleria della scheda senza foto: foto del modello se esiste, altrimenti quella della famiglia */
  var nomeM = ((document.querySelector('[data-m-nome]') || {}).textContent || '').trim();
  var chiaveM = nomeM.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  var famM = (decodeURIComponent((location.search.match(/[?&]m=([^&]+)/) || [])[1] || '').split('/')[1]) || '';
  var MOD = ['mini', 'viva', 'la-360-8-b', 'la-410-15-b', 'la-510-40-bt', 'la-560-67-b', 'la-660-110-b', 'la-700-110-r', 'la-1300-280-r', 'sp-1300', 'tk-306', 'tk-706', 'af-k-120-11', 'af-k-200-15'];
  var fotoM = MOD.indexOf(chiaveM) > -1 ? 'macchine/' + chiaveM : (famM ? 'categorie/fam-' + famM : null);
  var gm = document.querySelector('.gallery-main.ph');
  if (gm && gm.offsetParent && fotoM) {
    gm.className = 'gallery-main foto';
    gm.innerHTML = '<img src="' + BASE + 'assets/images/' + fotoM + '.jpg" alt="' + nomeM.replace(/"/g, '') + '">';
    var alt = ['categorie/fam-' + famM, 'categorie/sub-lavapavimenti-uomo-terra', 'categorie/formula-noleggio'];
    [].forEach.call(document.querySelectorAll('.thumb.ph'), function (t, i) {
      if (!t.offsetParent) return;
      t.className = 'thumb foto' + (i === 0 ? ' is-attiva' : '');
      t.innerHTML = '<img src="' + BASE + 'assets/images/' + (i === 0 ? fotoM : alt[i % alt.length]) + '.jpg" alt="">';
    });
  }
      return;
    }
    if (!righe.length) return;
    /* pagine fatte di una sola sezione (es. ricerca): la testata tiene solo
       titolo, introduzione e campo di ricerca; il resto passa in una nuova
       sezione di vetro, così i contenuti non finiscono sul rosso */
    if (righe.length === 1) {
      var blocco = righe[0].querySelector(':scope > .block');
      var primoH2 = blocco && blocco.querySelector(':scope > h2, :scope > .risultati, :scope > [data-results]');
      if (primoH2) {
        var nuova = document.createElement('div'); nuova.className = 'row';
        var sez = document.createElement('section'); sez.className = 'block'; nuova.appendChild(sez);
        var n = primoH2;
        while (n) { var dopo = n.nextSibling; sez.appendChild(n); n = dopo; }
        righe[0].insertAdjacentElement('afterend', nuova);
        righe.push(nuova);
      }
    }
    /* testate che contengono già il corpo della pagina (es. articolo): la testata
       tiene titolo e introduzione, il corpo va in una tessera bianca da leggere */
    var bt = righe[0].querySelector(':scope > .block');
    if (bt && bt.querySelectorAll(':scope > h2, :scope > .testo').length >= 2) {
      var primo = bt.querySelector(':scope > .ph, :scope > .testo, :scope > h2, :scope > figure');
      if (primo) {
        var riga = document.createElement('div'); riga.className = 'row row-int row-articolo';
        var sezione = document.createElement('section'); sezione.className = 'block'; riga.appendChild(sezione);
        var nodo = primo;
        while (nodo) { var poi = nodo.nextSibling; if (!(nodo.classList && nodo.classList.contains('dn-pin'))) sezione.appendChild(nodo); nodo = poi; }
        righe[0].insertAdjacentElement('afterend', riga);
        righe.splice(1, 0, riga);
        /* immagine in evidenza dell'articolo: segnaposto scelto in base al tema del titolo */
        var ev = sezione.querySelector(':scope > .ph');
        if (ev) {
          var tt = ((righe[0].querySelector('h1') || {}).textContent || '').toLowerCase();
          var fev = /noleggi/.test(tt) ? 'formula-noleggio' : /usat/.test(tt) ? 'formula-usato' : /spazzatric/.test(tt) ? 'fam-spazzatrici' :
            /idropul/.test(tt) ? 'fam-idropulitrici' : /aspirat/.test(tt) ? 'fam-aspiratori' : /lavapavim|lavasciuga/.test(tt) ? 'fam-lavapavimenti' : 'sett-industria';
          ev.className = 'articolo-foto';
          ev.innerHTML = '<img src="' + BASE + 'assets/images/categorie/' + fev + '.jpg" alt="">';
        }
        /* colonna laterale: indice dei paragrafi (dai titoli dell'articolo) e richiesta informazioni */
        var corpoArt = document.createElement('div'); corpoArt.className = 'articolo-corpo';
        while (sezione.firstChild) corpoArt.appendChild(sezione.firstChild);
        var titoli = [].slice.call(corpoArt.querySelectorAll(':scope > h2'));
        var indice = titoli.map(function (h, i) { h.id = h.id || 'par-' + (i + 1); return '<li><a href="#' + h.id + '">' + h.textContent.trim() + '</a></li>'; }).join('');
        var lato = document.createElement('aside'); lato.className = 'articolo-lato';
        lato.innerHTML = (indice ? '<nav class="articolo-indice" aria-label="Indice dell\'articolo"><p class="kicker">In questo articolo</p><ol>' + indice + '</ol></nav>' : '') +
          '<div class="articolo-cta">' +
          '<a class="btn btn-primary" href="#richiesta">Richiedi informazioni</a><a class="btn btn-ghost" href="tel:800480110">800 480110</a></div>';
        sezione.appendChild(corpoArt); sezione.appendChild(lato);
        var rf = [].slice.call(document.querySelectorAll('.wrap > .row')).filter(function (x) { return x.querySelector('form, .form'); }).pop();
        if (rf && !document.getElementById('richiesta')) rf.id = 'richiesta';
      }
    }
    document.body.classList.add('pagina-interna');
    righe[0].classList.add('row-testata');
    /* titoli lunghi (oltre ~40 caratteri): su tutta la larghezza, in tre righe equilibrate */
    var h1t = righe[0].querySelector('h1'); if (h1t && h1t.textContent.trim().length > 40) h1t.classList.add('titolo-lungo');
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="mood" aria-hidden="true"><span class="chiaro"></span><span class="macchine"></span><span class="blu"></span><span class="azzurro"></span><span class="rosso"></span></div>');
    /* la testata è rossa per default; i template del mondo macchine e prodotti
       dichiarano data-testata="blu" e partono dall'azzurro profondo della VI */
    var testata = document.body.dataset.testata === 'blu' ? 'blu' : 'macchine';
    /* tutte le testate ora sono rosse: l'attributo « blu » non deve più attivare le vecchie regole azzurre */
    document.body.removeAttribute('data-testata'); testata = 'macchine';
    function umore(u) {
      if (document.body.classList.contains('mood-' + u)) return;
      document.body.classList.remove('mood-chiaro', 'mood-macchine', 'mood-blu', 'mood-azzurro', 'mood-rosso');
      document.body.classList.add('mood-' + u);
      /* il fondo è cambiato: l'header ricalcola subito il colore delle voci di servizio */
      window.dispatchEvent(new Event('scroll'));
    }
    /* MOSAICO (stesso linguaggio della home): ogni sezione dopo la testata è una
       tessera. La materia dipende dal contenuto:
         moduli ............................ vetro (come la nav)
         griglie di card, sedi, formule .... solo contorno (le card bianche stanno sul rosso)
         percorsi a tappe, schede a tab .... bianca a piena larghezza
         tutto il resto (testi, FAQ, tabelle) bianca */
    /* immagini segnaposto e loghi clienti: usata anche dalla scheda macchina */
    function immaginiSegnaposto() {
    /* galleria della sede: fotografie Socaf (sede, showroom, officina) come segnaposto */
    document.querySelectorAll('.ph').forEach(function (p) {
      var n = (p.textContent.match(/Foto sede\s*(\d)/i) || [])[1]; if (!n) return;
      p.className = 'foto-sede'; p.innerHTML = '<img src="' + BASE + 'assets/images/categorie/sede-' + n + '.jpg" alt="Sede Socaf" loading="lazy">';
    });
    /* card di famiglia o tipologia ancora a segnaposto: se esiste la fotografia
       reale (assets/images/categorie) la mettiamo, riconoscendola dal nome */
    var FOTO = [
      [/uomo a terra.*spazz|spazzatric.*uomo a terra|motoscop.*terra/i, 'sub-spazzatrici-uomo-terra'],
      [/uomo a bordo.*spazz|spazzatric.*uomo a bordo|motoscop.*bordo/i, 'sub-spazzatrici-uomo-bordo'],
      [/lavapavimenti.*piccol|piccole/i, 'sub-lavapavimenti-piccole'],
      [/lava.*uomo a terra|lavasciuga.*terra/i, 'sub-lavapavimenti-uomo-terra'],
      [/lava.*uomo a bordo/i, 'sub-lavapavimenti-uomo-bordo'],
      [/combinat/i, 'sub-lavapavimenti-combinate'], [/i-mop/i, 'sub-i-mop'],
      [/acqua fredda/i, 'sub-idropulitrici-ad-acqua-fredda'],
      [/lavapavimenti|lavasciuga/i, 'fam-lavapavimenti'], [/spazzatric/i, 'fam-spazzatrici'],
      [/idropulitric/i, 'fam-idropulitrici'], [/aspirator/i, 'fam-aspiratori'],
      [/robot/i, 'fam-robot'], [/altri macchinari/i, 'fam-altri-macchinari'],
      [/lavamoquette|lavatappezz|monospazzol|vapore|lavapezzi|generator/i, 'fam-altri-macchinari']
    ];
    /* modelli con foto reale (assets/images/macchine, ricavate da assets/STATICHE) */
    var MODELLI = ['mini', 'viva', 'la-360-8-b', 'la-410-15-b', 'la-510-40-bt', 'la-560-67-b', 'la-660-110-b', 'la-700-110-r',
      'la-1300-280-r', 'sp-1300', 'tk-306', 'tk-706', 'af-k-120-11', 'af-k-200-15'];
    var FAMIGLIE_FOTO = ['lavapavimenti', 'spazzatrici', 'idropulitrici', 'aspiratori', 'robot', 'altri-macchinari'];
    var VARIANTI = { 'categorie/fam-aspiratori': ['categorie/fam-aspiratori', 'categorie/asp-1', 'categorie/asp-2', 'categorie/asp-3'],
      'categorie/fam-lavapavimenti': ['categorie/fam-lavapavimenti', 'categorie/sub-lavapavimenti-uomo-bordo', 'categorie/sub-lavapavimenti-uomo-terra', 'categorie/sub-lavapavimenti-combinate'],
      'categorie/fam-spazzatrici': ['categorie/fam-spazzatrici', 'categorie/sub-spazzatrici-uomo-bordo', 'categorie/sub-spazzatrici-uomo-terra'],
      'categorie/fam-idropulitrici': ['categorie/fam-idropulitrici', 'categorie/sub-idropulitrici-ad-acqua-fredda'],
      'categorie/art': ['categorie/formula-noleggio', 'categorie/sett-industria', 'categorie/fam-spazzatrici', 'categorie/sett-officine-metalmeccanica', 'categorie/formula-usato', 'categorie/sett-logistica'],
      'categorie/prod-1': ['categorie/prod-1', 'categorie/prod-2', 'categorie/prod-3', 'categorie/prod-4'] };
    document.querySelectorAll('.card .card-media.ph').forEach(function (m) {
      var card = m.closest('.card'), nome = (card.querySelector('.card-name') || {}).textContent || '';
      var chiave = nome.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      var file = MODELLI.indexOf(chiave) > -1 ? 'macchine/' + chiave : null;
      /* modello senza foto propria: segnaposto con la foto della sua famiglia */
      /* settori (segnaposto: ambienti Socaf che richiamano il settore) */
      var SETTORI = [[/industria/i, 'industria'], [/imprese di pulizia/i, 'imprese-di-pulizia'], [/ho\.?re\.?ca/i, 'horeca'],
        [/retail/i, 'retail'], [/logistica/i, 'logistica'], [/officin|metalmeccan/i, 'officine-metalmeccanica'], [/edilizia|cantier/i, 'edilizia-cantieri']];
      if (!file && /settore/i.test(m.textContent)) for (var s = 0; s < SETTORI.length; s++) if (SETTORI[s][0].test(nome)) { file = 'categorie/sett-' + SETTORI[s][1]; break; }
      /* categorie di prodotti per la pulizia: foto degli scaffali, a rotazione */
      if (!file && /categoria|prodott/i.test(m.textContent)) file = 'categorie/prod-1';
      /* approfondimenti: immagine in evidenza segnaposto, ambienti e macchine Socaf a rotazione */
      if (!file && /in evidenza|senza immagine/i.test(m.textContent)) file = 'categorie/art';
      /* nome riconosciuto (famiglia o tipologia) */
      if (!file) for (var i = 0; i < FOTO.length; i++) if (FOTO[i][0].test(nome)) { file = 'categorie/' + FOTO[i][1]; break; }
      /* altrimenti segnaposto con la foto della famiglia della card (o della pagina) */
      if (!file) {
        var link = card.querySelector('[data-url]'), url = (link && link.getAttribute('data-url')) || document.body.dataset.slug || '';
        var fam = url.split('/')[1] === 'noleggio' || url.split('/')[1] === 'usato' ? url.split('/')[2] : url.split('/')[1];
        fam = (fam || '').replace(/-(usate|usati)$/, '').replace(/^noleggio-/, '');
        if (FAMIGLIE_FOTO.indexOf(fam) > -1) file = 'categorie/fam-' + fam;
      }
      if (!file) return;
      /* più card della stessa famiglia: foto diverse, a rotazione */
      var v = VARIANTI[file];
      if (v) { VARIANTI._n = (VARIANTI._n || 0) + 1; file = v[VARIANTI._n % v.length]; }
      m.className = 'card-media foto';
      m.innerHTML = '<img src="' + BASE + 'assets/images/' + file + '.jpg" alt="' + nome.replace(/"/g, '') + '" loading="lazy">';
    });

    /* come in home: contenuti da leggere (testi, FAQ, tabelle, tappe, tab, sedi)
       su sezioni bianche a piena larghezza; griglie di card alternano vetro e
       contorno; i moduli stanno sul vetro */
    /* CLIENTI: loghi ufficiali (assets/) e collegamento al sito del cliente.
       Tutta la card porta al sito, in una scheda nuova. */
    var CLIENTI = [
      [/amica chips/i, 'amicachips.webp', 'https://www.amicachips.it/'],
      [/progect|project/i, 'projectsrl.avif', null],
      [/lupo/i, 'luposrl.avif', 'http://www.luporistoranti.it/'],
      [/gigante/i, 'ilgigante.svg', 'https://ilgigante.net/'],
      [/cisalfa/i, 'cisalfa.svg', 'https://www.cisalfasport.it/'],
      [/xpo/i, 'xpo.svg', 'https://www.xpo.com/']
    ];
    document.querySelectorAll('.card').forEach(function (c) {
      var m = c.querySelector('.card-media.ph'), nome = ((c.querySelector('.card-name') || {}).textContent || '').trim();
      if (!m || !/logo/i.test(m.textContent)) return;
      for (var i = 0; i < CLIENTI.length; i++) if (CLIENTI[i][0].test(nome)) {
        m.className = 'card-media marchio-logo cliente-logo';
        m.innerHTML = '<img src="' + BASE + 'assets/' + CLIENTI[i][1] + '" alt="' + nome.replace(/"/g, '') + '">';
        var l = c.querySelector('.card-link');
        if (l && CLIENTI[i][2]) {
          l.setAttribute('href', CLIENTI[i][2]); l.setAttribute('target', '_blank'); l.setAttribute('rel', 'noopener');
          l.removeAttribute('data-url'); l.textContent = 'Vai al sito di ' + nome;
          var meta = c.querySelector('.card-meta'); if (meta && /sito/i.test(meta.textContent)) meta.textContent = 'Sito del cliente ↗';
        }
        break;
      }
    });

    }
    immaginiSegnaposto();

    /* sezioni a schede senza un titolo proprio (pagine di servizi e azienda): il
       titolo della sezione è il nome della pagina, così nessuna sezione resta senza testata */
    var nomePagina = ((righe[0].querySelector('h1') || {}).textContent || '').trim();
    righe.slice(1).forEach(function (r) {
      var b = r.querySelector(':scope > .block'), tabs = b && b.querySelector('.t-tabs');
      if (!tabs || !nomePagina) return;
      var haTitolo = [].some.call(b.querySelectorAll('h2'), function (h) { return !h.closest('.t-tabs'); });
      if (!haTitolo) tabs.insertAdjacentHTML('beforebegin', '<h2 class="titolo-sezione">' + nomePagina + '</h2>');
    });
    /* sezioni nascoste (es. « nessun risultato » della ricerca) fuori dallo schema */
    var nascoste = righe.filter(function (r) { return r.closest('[hidden]'); });
    nascoste.forEach(function (r) { r.classList.add('t-bianca', 't-piena'); });
    righe = righe.filter(function (r) { return nascoste.indexOf(r) < 0; });
    /* l'ultima sezione tocca il footer: niente striscia di rosso fra le due */
    righe[righe.length - 1].classList.add('row-ultima');

    /* STRISCE A ICONE (come « Per il tuo settore » in home): gli elenchi di settori
       e di famiglie diventano una fila di icone con il nome sotto */
    /* griglie di card che portano solo a famiglie o settori (es. « Su quali macchine si usano »):
       diventano elenchi da trattare come striscia a icone */
    righe.slice(1).forEach(function (r) {
      var g = r.querySelector('.grid'); if (!g || r.querySelector('.chips')) return;
      var cards = [].slice.call(g.querySelectorAll(':scope > .card'));
      var RE = /^\/(lavapavimenti|spazzatrici|idropulitrici|aspiratori|robot|altri-macchinari)\/$/;
      if (cards.length < 2 || !cards.every(function (c) { var l = c.querySelector('.card-link'); return l && RE.test(l.getAttribute('data-url') || ''); })) return;
      var html = cards.map(function (c) { var l = c.querySelector('.card-link'), n = (c.querySelector('.card-name') || {}).textContent || '';
        return '<a class="chip" href="' + l.getAttribute('href') + '" data-url="' + l.getAttribute('data-url') + '">' + n.trim() + '</a>'; }).join('');
      g.outerHTML = '<div class="chips">' + html + '</div>';
      r.dataset.striscia = '1';
    });
    righe.slice(1).forEach(function (r) {
      var h = r.querySelector('h2'), chips = r.querySelector('.chips');
      if (!h || !chips || !(r.dataset.striscia || r.querySelector('[data-sub-siblings], [data-altri]') || /Cos.altro puoi noleggiare|Le altre |Dove si usano|Le altre macchine|Gli altri settori|Su quali macchine|Altri settori|Le altre famiglie/i.test(h.textContent))) return;
      r.classList.add('row-striscia');
      chips.classList.add('tiles', 'tiles-icone');
      chips.querySelectorAll('a, span.chip').forEach(function (c) {
        var url = c.getAttribute('data-url') || c.getAttribute('href') || '', chiave = null;
        /* tipologie (sottocategorie): icona propria, riconosciuta dall'indirizzo */
        var SUB = {
          'piccole': '<rect x="7" y="13" width="10" height="6" rx="2"/><path d="M12 13V4M10 4h4"/><circle cx="9" cy="20.5" r=".8"/><circle cx="15" cy="20.5" r=".8"/>',
          'uomo-terra': '<path d="M6 4l3 8"/><rect x="8" y="12" width="11" height="6" rx="2"/><circle cx="10" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/>',
          'uomo-bordo': '<path d="M8 11V7h4l1 4"/><rect x="4" y="11" width="16" height="6" rx="2"/><circle cx="7.5" cy="19.5" r="1.5"/><circle cx="16.5" cy="19.5" r="1.5"/>',
          'combinate': '<rect x="4" y="9" width="16" height="7" rx="2"/><path d="M6 19h12M8 19l-1 2M12 19v2M16 19l1 2"/><path d="M12 2.5s-2 2.4-2 3.8a2 2 0 0 0 4 0c0-1.4-2-3.8-2-3.8z"/>',
          'i-mop': '<path d="M12 3v12M10 3h4"/><path d="M6 15h12l1 3H5z"/><path d="M7 21h10"/>',
          'stradali': '<path d="M8 3L4 21M16 3l4 18M12 5v2M12 11v2M12 17v2"/>',
          'acqua-fredda': '<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/>',
          'acqua-calda': '<path d="M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z"/>',
          'alte-prestazioni': '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/><circle cx="12" cy="16" r="1"/>',
          'impianti-fissi': '<rect x="4" y="3" width="10" height="18" rx="2"/><path d="M14 10h4v4M18 14l2 2M8 7h2M8 11h2"/>',
          'autonome': '<path d="M6 21V7l4-4h6a2 2 0 0 1 2 2v16z"/><path d="M10 3v4H6M9 12h6M9 16h6"/>',
          'robot-': ICONE['robot']
        };
        Object.keys(SUB).forEach(function (k) { if (!chiave && url.indexOf(k) > -1) { chiave = 'sub:' + k; ICONE[chiave] = SUB[k]; } });
        /* voce corrente senza link: riconosciuta dal nome (« Piccole », « Uomo a terra »…) */
        if (!chiave) {
          var tx = c.textContent.toLowerCase().replace(/\s+a\s+/g, '-').replace(/\s+/g, '-');
          Object.keys(SUB).forEach(function (k) { if (!chiave && tx.indexOf(k.replace(/-$/, '')) > -1) { chiave = 'sub:' + k; ICONE[chiave] = SUB[k]; } });
        }
        Object.keys(ICONE).forEach(function (k) { if (!chiave && (url.indexOf('/' + k + '/') > -1 || url.indexOf('=' + k) > -1)) chiave = k; });
        if (!chiave) { var t = c.textContent.toLowerCase(); Object.keys(ICONE).forEach(function (k) { if (!chiave && t.indexOf(k.split('-')[0].slice(0, 6)) > -1) chiave = k; }); }
        var nome = c.textContent.trim();
        c.className = 'tile' + (c.getAttribute('aria-current') || c.classList.contains('is-active') ? ' is-corrente' : '');
        c.innerHTML = '<svg class="tile-ico" viewBox="0 0 24 24" aria-hidden="true">' + (ICONE[chiave] || ICONE['altri-macchinari']) + '</svg><span>' + nome + '</span>';
      });
    });

    /* schema fisso, come in home: bianca a piena larghezza → vetro → contorno → bianca …
       (il modulo sta sempre sul vetro: se cade altrove, scambia con la precedente) */
    var slugP = document.body.dataset.slug || '';
    var testataB = righe[0].querySelector(':scope > .block');
    /* Pronto intervento: le icone delle macchine entrano nella testata, sotto titolo e testo */
    if (slugP === '/servizi/pronto-intervento/') {
      var sI = righe.filter(function (r) { return r.classList.contains('row-striscia'); })[0];
      if (sI && testataB) {
        var tl = sI.querySelector('.tiles-icone'); tl.classList.add('testata-icone');
        var hI = sI.querySelector('h2');
        var gr = document.createElement('div'); gr.className = 'testata-macchine';
        gr.innerHTML = '<p class="testata-macchine-label">' + (hI ? hI.textContent.trim() : '') + '</p>';
        gr.appendChild(tl); testataB.appendChild(gr); sI.remove(); righe = righe.filter(function (r) { return r !== sI; });
      }
    }
    /* testata con video (come l'hero della home) */
    if (/^\/azienda\/(chi-siamo|lavora-con-noi)\/$/.test(slugP)) {
      righe[0].classList.add('testata-video');
      righe[0].insertAdjacentHTML('afterbegin', '<div class="hero-bg hero-vimeo testata-vimeo" aria-hidden="true">' +
        '<iframe src="https://player.vimeo.com/video/1231598499?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1" title="" tabindex="-1" allow="autoplay; fullscreen; picture-in-picture" frameborder="0"></iframe></div>');
      /* il video sale fin sotto l'header: la testata si allunga verso l'alto di quanto dista dalla cima della pagina */
      var tv = righe[0], suTv = function () { tv.style.setProperty('--su', Math.max(0, tv.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(tv).marginTop) || 0)) + 'px'); };
      suTv(); window.addEventListener('load', suTv); window.addEventListener('resize', suTv);
    }
    /* sezione a schede subito sotto la testata: testata a una sola colonna (titolo + testo)
       e testo d'apertura più breve (si ferma alla fine della frase entro ~220 caratteri) */
    if (righe[1] && righe[1].querySelector('.t-tabs') && testataB) {
      righe[0].classList.add('testata-breve');
      var ld = testataB.querySelector(':scope > .lede');
      if (ld && ld.textContent.length > 240) {
        var tx = ld.textContent.trim(), frasi = tx.match(/[^.!?]+[.!?]+/g) || [tx], out = '';
        for (var fi = 0; fi < frasi.length; fi++) { if (out && (out + frasi[fi]).length > 220) break; out += frasi[fi]; }
        ld.textContent = out.trim();
      }
    }
    var SCHEMA = [['t-bianca', 't-piena'], ['t-vetro'], ['t-outline']];
    /* le strisce a icone sono sempre a contorno: contano come il passo « contorno »
       dello schema, e dopo di loro si riparte dal bianco */
    /* tipi fissi: strisce a icone = contorno, moduli = vetro. Le altre seguono lo
       schema saltando il tipo della sezione prima e di quella fissa subito dopo:
       due sezioni dello stesso tipo non stanno mai una dietro l'altra */
    /* mai due strisce a icone una dietro l'altra: la seconda scende sotto la sezione
       successiva (se non è il modulo), così fra le due c'è sempre un contenuto */
    for (var si = 2; si < righe.length - 1; si++) {
      var a1 = righe[si - 1], a2 = righe[si], a3 = righe[si + 1];
      if (a1.classList.contains('row-striscia') && a2.classList.contains('row-striscia') &&
          !a3.classList.contains('row-striscia') && !a3.querySelector('form, .form')) {
        a3.insertAdjacentElement('afterend', a2);
        righe[si] = a3; righe[si + 1] = a2; si++;
      } else if (a1.classList.contains('row-striscia') && a2.classList.contains('row-striscia') && si >= 3 &&
          !righe[si - 2].classList.contains('row-striscia')) {
        /* dopo c'è il modulo: la prima striscia sale sopra la sezione precedente */
        righe[si - 2].insertAdjacentElement('beforebegin', a1);
        var tmp = righe[si - 2]; righe[si - 2] = a1; righe[si - 1] = tmp;
      }
    }
    var corpo = righe.slice(1), passo = 0, prima = -1;
    var fisso = function (r) { return !r ? -1 : r.classList.contains('row-striscia') ? 2 : r.querySelector('form, .form') ? 1 : -1; };
    corpo.forEach(function (r, i) {
      var t = fisso(r);
      if (t === 2 && prima === 2) t = fisso(corpo[i + 1]) === 1 ? 0 : 1;   /* due strisce di fila: la seconda va sul vetro (o sul bianco, se dopo c'è il modulo) */
      if (t < 0) {
        var dopo = fisso(corpo[i + 1]);
        for (var k = 0; k < 3; k++) { var c = (passo + k) % 3; if (c !== prima && c !== dopo) { t = c; break; } }
        passo = t + 1;
      } else passo = t + 1;
      SCHEMA[t].forEach(function (c) { r.classList.add(c); });
      prima = t;
    });
    /* sulle sezioni bianche il titoletto che ripete il titolo della testata è superfluo */
    var h1T = ((righe[0].querySelector('h1') || {}).textContent || '').trim().toLowerCase();
    righe.slice(1).forEach(function (r) {
      if (!r.classList.contains('t-bianca') || !h1T) return;
      r.querySelectorAll(':scope > .block > h2, :scope > .block > .testo-pagina > h2').forEach(function (h) { if (h.textContent.trim().toLowerCase() === h1T) h.remove(); });
    });
    righe[0].classList.add('t-piena');
    /* le tessere a piena larghezza escono dalla griglia fino ai bordi; --sx/--dx
       allineano il loro contenuto a quello delle altre tessere */
    function misuraVw() {
      var vw = document.documentElement.clientWidth;
      document.body.style.setProperty('--vw', vw + 'px');
      document.querySelectorAll('.wrap > .row.t-piena').forEach(function (r) {
        var w = r.parentElement, cs = getComputedStyle(w), q = w.getBoundingClientRect();
        var sx = q.left + parseFloat(cs.paddingLeft), dx = q.right - parseFloat(cs.paddingRight);
        r.style.setProperty('margin-left', (-sx) + 'px', 'important');
        r.style.setProperty('margin-right', (-(vw - dx)) + 'px', 'important');
        document.body.style.setProperty('--sx', sx + 'px');
        document.body.style.setProperty('--dx', (vw - dx) + 'px');
      });
    }
    misuraVw(); window.addEventListener('resize', misuraVw);

    var atteso = false;
    function guarda() {
      atteso = false;
      var fine = righe[0].getBoundingClientRect().bottom;
      umore(fine > window.innerHeight * 0.45 ? testata : 'azzurro');
    }
    window.addEventListener('scroll', function () { if (!atteso) { atteso = true; requestAnimationFrame(guarda); } }, { passive: true });
    window.addEventListener('resize', guarda);
    guarda();
    window.dispatchEvent(new Event('scroll'));   /* aggiorna subito i colori della riga di servizio */
  }

  /* INGRESSI · le sezioni entrano quando arrivano nello schermo: salgono di poco
     e si accendono, con un ritardo sfalsato tra titolo, testo e card. La
     testata ha il suo ingresso al caricamento. Movimento ridotto: tutto fermo. */
  function ingressi() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    var righe = [].slice.call(document.querySelectorAll('.wrap > .row')).filter(function (r) {
      return !r.classList.contains('wf-doc') && !r.querySelector('.hero-full');
    });
    /* la riga della hero e la testata non entrano: sono già in scena */
    document.querySelectorAll('.wrap > .row').forEach(function (r) { if (r.querySelector('.hero-full') || r.classList.contains('wf-doc')) r.classList.add('in-vista'); });
    document.body.classList.add('ha-ingressi');
    var io = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (!v.isIntersecting) return;
        v.target.classList.add('in-vista');
        io.unobserve(v.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    righe.forEach(function (r) {
      /* ritardo sfalsato per i figli principali della sezione */
      [].slice.call(r.querySelectorAll('.block > *, .card, .sede, .formula')).slice(0, 14).forEach(function (el, i) {
        el.style.setProperty('--ritardo', (i * 60) + 'ms');
      });
      io.observe(r);
    });
  }

  /* PERCORSO A TAPPE (« Come funziona »): le tappe diventano selezionabili.
     Cliccando un numero la tappa si attiva e il suo testo compare, più grande,
     nel riquadro sotto il percorso. Accessibile: pulsanti con aria-pressed. */
  function percorsoTappe() {
    document.querySelectorAll('.steps').forEach(function (box) {
      var tappe = [].slice.call(box.querySelectorAll('.step'));
      if (!tappe.length || box.dataset.tappe) return;
      box.dataset.tappe = '1';
      box.classList.add('is-interattivo');
      var dett = document.createElement('div');
      dett.className = 'steps-dettaglio'; dett.setAttribute('aria-live', 'polite');
      box.insertAdjacentElement('afterend', dett);
      function scegli(i) {
        tappe.forEach(function (t, k) { t.classList.toggle('is-attiva', k === i); t.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
        var h = tappe[i].querySelector('h4'), p = tappe[i].querySelector('p');
        dett.innerHTML = '<span class="steps-dettaglio-n">' + String(i + 1).padStart(2, '0') + '</span><div><h4>' +
          (h ? h.textContent : '') + '</h4><p>' + (p ? p.textContent : '') + '</p></div>';
        dett.classList.remove('entra'); void dett.offsetWidth; dett.classList.add('entra');
      }
      tappe.forEach(function (t, i) {
        t.setAttribute('role', 'button'); t.tabIndex = 0;
        t.addEventListener('click', function () { scegli(i); });
        t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scegli(i); } });
      });
      scegli(0);
    });
  }

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

    /* Scorrendo, la capsula dell'header si stringe: la barra risponde al
       movimento invece di restare uguale a sé stessa. */
    if (hd) {
      var ultimo = null;
      var heroSotto = document.querySelector('.hero-full');
      var guardaHeader = function () {
        /* sulla home l'header sta sopra il video: finché lo copre, testi chiari */
        if (heroSotto) {
          var sopra = heroSotto.getBoundingClientRect().bottom > hd.getBoundingClientRect().bottom;
          hd.classList.toggle('su-hero', sopra);
        }
        /* riga di servizio: guarda cosa passa sotto le due voci e sceglie il
           testo chiaro o scuro, così restano leggibili su ogni fondo */
        var voce = hd.querySelector('.topbar a');
        if (voce) {
          var rv = voce.getBoundingClientRect(), scuro = false;
          var sotto = document.elementsFromPoint(rv.left + rv.width / 2, rv.top + rv.height / 2)
            .filter(function (el) { return !hd.contains(el) && !el.closest('.devbar'); });
          var el0 = sotto[0] || document.body;
          if (el0.closest('.board .card, .card')) scuro = false;          /* sopra le card bianche: nero */
          else if (el0.closest('.hero-full, .row[data-mood="macchine"], .site-footer, .row-testata')) scuro = true;
          else if (document.body.classList.contains('mood-macchine') && !el0.closest('.wrap > .row > .block')) scuro = true;
          /* pagine interne: bianco sul rosso, nero sull'azzurro, sempre */
          if (document.body.classList.contains('pagina-interna')) scuro = !el0.closest('.t-bianca, .card, .formula, .sede, .form input, .form textarea');   /* fondale sempre rosso: voci scure solo sulle superfici chiare */
          /* all'atterraggio, prima che la pagina scelga il fondo: le interne partono sul rosso */
          else if (document.body.dataset.pagina !== 'home' && !document.querySelector('.mood')) scuro = true;
          /* pagine con fondo di colore dichiarato: sopra la nav si sta sempre
             sul colore, a meno di essere finiti sopra una lastra bianca */
          else if (document.body.dataset.testata && !el0.closest('.block, .card, .form')) scuro = true;
          /* home: con il fondale bianco le voci sono scure, tranne sopra le tessere rosse */
          if (document.body.dataset.pagina === 'home' && document.body.classList.contains('fondo-bianco')) scuro = !!el0.closest('.t-rossa, .hero-full');
          hd.classList.toggle('topbar-su-scuro', scuro);
        }
        /* logo: bianco su rosso e video, a colori sul bianco. Guarda cosa passa
           sotto il centro del logo, come per la riga di servizio */
        var marchio = hd.querySelector('.brand img');
        if (marchio) {
          var rl = marchio.getBoundingClientRect();
          var sottoL = document.elementsFromPoint(rl.left + rl.width / 2, rl.top + rl.height / 2)
            .filter(function (el) { return !hd.contains(el) && !el.closest('.devbar'); })[0] || document.body;
          /* sulla home il fondale è sempre rosso: logo a colori solo sopra le tessere bianche */
          /* superfici chiare: tessere bianche e tutto ciò che è card o lastra bianca */
          var chiaro = '.t-bianca, .card, .formula, .tile-ico, .logo-item, .marchio-logo, .foto-prodotti, .form input, .form textarea, .site-header .dropdown';
          var suRosso = !sottoL.closest(chiaro);
          var voluto = BASE + 'assets/logo/' + (suRosso ? 'socaf21-payoff-rgb-white.svg' : 'socaf21-payoff-rgb.svg');
          if (marchio.getAttribute('src') !== voluto) marchio.setAttribute('src', voluto);
        }
        var ridotto = window.scrollY > 40;
        if (ridotto === ultimo) return;
        ultimo = ridotto;
        /* forma fissa: lo stato ridotto non cambia più l'header */
        misuraBarre();
      };
      guardaHeader();
      window.addEventListener('scroll', guardaHeader, { passive: true });
      /* niente dissolvenza di colore finché la pagina non è pronta */
      setTimeout(function () { hd.classList.add('hdr-pronto'); }, 700);
    }

    document.querySelectorAll('[data-sedi]').forEach(function (el) { el.innerHTML = blocoSedi(el.dataset.sedi); });
    document.querySelectorAll('[data-hidden-field]').forEach(function (el) {
      var p = el.dataset.hiddenField.split('|');
      el.outerHTML = '<div class="hidden-field">Campo nascosto — <b>' + p[0] + '</b>: ' + p[1] + '</div>';
    });

    riempiTesti();
    schedeTesti();
    heroLiquido();
    heroFluido();
    homeScena();
    scenaInterna();
    ingressi();
    percorsoTappe();
    formeLaterali();

    /* Pagine interne: la prima sezione diventa l'intestazione della pagina.
       Vive sul colore, come la hero della home; tutto il resto sta sulle
       lastre bianche. Una classe sola, così la regola è una sola nel CSS.
       Va assegnata prima di carteTilt/claimJelly: quelle funzioni cercano
       i loro bersagli con selettori che partono da .pagina-intro. */
    if (body.dataset.pagina !== 'home') {
      var primo = document.querySelector('.wrap .block');
      if (primo) {
        primo.classList.add('pagina-intro');
        /* Sulle pagine con testata dichiarata il fondo è il vetro cannettato
           della reference: una lastra fissa dietro tutta la pagina. */
        if (body.dataset.testata) {
          var vetro = document.createElement('div');
          vetro.className = 'intro-vetro';
          vetro.setAttribute('aria-hidden', 'true');
          document.body.insertBefore(vetro, document.body.firstChild);
        }
      }
    }

    /* Consenso privacy: il testo è un nodo sciolto accanto alla casella, e
       la distanza fra i due dipendeva da gap, spazi e margini sparsi. Lo
       chiudiamo in uno span, così la riga diventa una griglia esplicita
       "casella + testo" e la distanza è una sola misura. */
    document.querySelectorAll('.consent').forEach(function (c) {
      if (c.querySelector('.consent-txt')) return;
      var span = document.createElement('span');
      span.className = 'consent-txt';
      [].slice.call(c.childNodes).forEach(function (n) {
        if (n.nodeType === 3 || (n.nodeType === 1 && n.tagName !== 'INPUT')) span.appendChild(n);
      });
      span.textContent = span.textContent.trim();
      c.appendChild(span);
    });

    /* Blocchi rimasti senza contenuto (tutti i pezzi condizionali nascosti:
       per esempio noleggio e usato su una macchina che non è né a noleggio
       né usata) non devono restare come lastre vuote. */
    document.querySelectorAll('.wrap section.block').forEach(function (b) {
      if (b.classList.contains('pagina-intro')) return;
      var vivo = [].slice.call(b.children).some(function (e) {
        if (e.classList.contains('block-id') || e.classList.contains('dn-pin')) return false;
        if (getComputedStyle(e).display === 'none') return false;
        return e.getBoundingClientRect().height > 0 || e.textContent.trim() !== '';
      });
      if (!vivo) b.hidden = true;
    });

    carteTilt();
    /* carteGelatina();  tolta: la lente liquida (filtro SVG) sfocava la card in focus */
    /* effetto acqua sui titoli rimosso da tutto il sito (hero comprese) */
    /* ricercaScritta();  tolta: il testo guida della ricerca è fermo */
    decoraVI();
    testoComeTitolo();
    /* liste cliccabili più alte dello schermo (es. « Lavora con noi »): stesso layout a due colonne,
       ma la lista scorre al suo interno (CSS .t-lunga), così il testo della voce resta sempre accanto.
       Al clic, se l'inizio del testo non è in vista, la pagina lo porta sotto l'header. */
    (function listeLunghe() {
      function marca() {
        [].forEach.call(document.querySelectorAll('.t-tabs'), function (T) {
          var nav = T.querySelector('.t-nav'); if (!nav) return;
          T.classList.remove('t-lunga');
          var alt = nav.scrollHeight, lim = window.innerHeight - 180;
          if (alt > lim) T.classList.add('t-lunga');
        });
      }
      marca(); window.addEventListener('resize', function () { clearTimeout(marca.t); marca.t = setTimeout(marca, 150); });
      document.addEventListener('scroll', function (e) {
        var n = e.target.closest && e.target.closest('.t-lunga > .t-nav'); if (!n) return;
        n.parentNode.classList.toggle('a-fondo', n.scrollTop + n.clientHeight >= n.scrollHeight - 4);
      }, true);
      document.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('.t-tabs [role=tab]'); if (!b) return;
        var T = b.closest('.t-tabs'), hd = document.querySelector('.site-header');
        var lim = (hd ? hd.getBoundingClientRect().bottom : 0) + 16;
        requestAnimationFrame(function () {
          var p = document.getElementById(b.getAttribute('aria-controls')); if (!p) return;
          var t = p.getBoundingClientRect().top;
          if (t < lim || t > window.innerHeight * 0.6) window.scrollBy({ top: t - lim, behavior: 'smooth' });
        });
      });
    })();
    /* niente parola sola sull'ultima riga, in ogni browser: le ultime due parole di titoli e testi
       sono unite da uno spazio indivisibile; i trattini dell'ultima parola (« i-mop ») non spezzano */
    (function nienteVedove() {
      document.querySelectorAll('h1, h2, h3, h4, p, li, dd, .card-desc, .formula-p, .card-name, .formula-h').forEach(function (el) {
        if (el.closest('.devnote, script, style, [contenteditable], .row-striscia, .row-settori, .striscia-scheda')) return;
        var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n, last = null;
        while ((n = w.nextNode())) if (n.nodeValue.trim()) last = n;
        if (!last) return;
        var v = last.nodeValue.replace(/\s+$/, ''), coda = last.nodeValue.slice(v.length);
        var i = v.lastIndexOf(' ');
        if (i < 0 || el.textContent.trim().split(/\s+/).length < 3) return;
        var parola = v.slice(i + 1).replace(/-/g, '‑');
        last.nodeValue = v.slice(0, i) + ' ' + parola + coda;
      });
    })();
    /* strisce a icone: il titolo su più righe si stringe alla sua riga più lunga,
       così lo stacco dalle icone è sempre quello previsto (40px) e non resta un vuoto */
    (function titoliStrisce() {
      var hs = [].slice.call(document.querySelectorAll('.row-striscia > .block > h2, .row-settori > .block > h2'));
      function stringi() {
        hs.forEach(function (h) {
          h.style.removeProperty('width');
          var rg = document.createRange(); rg.selectNodeContents(h);
          var x0 = h.getBoundingClientRect().left, w = 0;
          [].forEach.call(rg.getClientRects(), function (r) { w = Math.max(w, r.right - x0); });
          if (w > 0) h.style.setProperty('width', Math.ceil(w) + 'px', 'important');
        });
      }
      stringi(); window.addEventListener('load', stringi);
      window.addEventListener('resize', function () { clearTimeout(stringi.t); stringi.t = setTimeout(stringi, 120); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(stringi);
    })();
    document.body.classList.add('scena-pronta');
    /* liste cliccabili fisse allo scroll: si fermano subito sotto l'header (misurato), così a riposo
       restano allineate al titoletto del contenuto e scorrendo la sezione rimangono visibili */
    (function stickyLista() {
      var hd = document.querySelector('.site-header');
      function quota() {
        var b = hd ? Math.max(0, hd.getBoundingClientRect().bottom) : 0;
        document.documentElement.style.setProperty('--lista-top', Math.round(b + 16) + 'px');
      }
      quota(); window.addEventListener('resize', quota); window.addEventListener('load', quota);
      /* modulo della scheda macchina: sotto l'header se ci sta, altrimenti fermo con il fondo a 16px dal bordo */
      var col = document.querySelector('.scheda-mosaico .sticky-col');
      if (col) {
        var mod = function () {
          var b = hd ? Math.max(0, hd.getBoundingClientRect().bottom) + 16 : 16;
          var t = Math.min(b, window.innerHeight - col.offsetHeight - 16);
          document.documentElement.style.setProperty('--modulo-top', Math.round(t) + 'px');
        };
        mod(); window.addEventListener('resize', mod); window.addEventListener('load', mod);
        if (window.ResizeObserver) new ResizeObserver(mod).observe(col);
      }
    })();
    /* tutta la card è cliccabile (immagine compresa): apre il link della card.
       I link e i pulsanti interni (telefono, mail, CTA secondarie) mantengono il loro comportamento. */
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      var c = e.target.closest('.card, .formula, .sede'); if (!c) return;
      if (e.target.closest('a[href], button, input, select, textarea, label')) return;
      var l = null; ['a.card-link[href]', 'a.formula-go[href]', 'a.btn-link[href]', '.card-name a[href]', 'a[href]:not([href^="tel:"]):not([href^="mailto:"])'].some(function (s) { return (l = c.querySelector(s)); });
      if (!l) return;
      if (e.ctrlKey || e.metaKey) window.open(l.href, '_blank'); else l.click();
    });
    document.querySelectorAll('.card, .formula, .sede').forEach(function (c) { if (c.querySelector('a[href]')) c.style.cursor = 'pointer'; });
    /* testi a due colonne solo quando sono lunghi e c'è spazio: altrimenti una colonna */
    (function colonne() {
      var testi = [].slice.call(document.querySelectorAll('.t-pane .testo, body[data-slug^="/usato/"] .block .testo'));
      function decidi() {
        /* il testo continua sotto in una colonna; passa alla seconda solo se, su una colonna,
           diventerebbe molto più alto della lista delle voci accanto (o di 560px se non c'è lista) */
        testi.forEach(function (t) {
          t.classList.remove('testo-colonne');
          var w = t.getBoundingClientRect().width; if (!w) return;
          var nav = t.closest('.t-tabs') && t.closest('.t-tabs').querySelector('.t-nav');
          var lim = Math.max(nav ? nav.getBoundingClientRect().height : 0, 560) * 1.25;
          t.classList.toggle('testo-colonne', w >= 760 && t.getBoundingClientRect().height > lim);
        });
      }
      decidi(); window.addEventListener('resize', function () { clearTimeout(decidi.t); decidi.t = setTimeout(decidi, 150); });
      document.addEventListener('click', function (e) { if (e.target.closest('[role=tab]')) setTimeout(decidi, 30); });
    })();


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
        document.querySelectorAll('.row[data-da-risultati]').forEach(function (r) { r.hidden = vuoto; });
        if (vuoto && empty) { [].slice.call(empty.querySelectorAll(':scope > .row')).forEach(function (r) { r.classList.add('row-int', 't-bianca', 't-piena', 'in-vista'); empty.parentNode.insertBefore(r, empty); }); window.dispatchEvent(new Event('resize')); }
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
