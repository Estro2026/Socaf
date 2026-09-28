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
    return '<div class="wrap"><div class="footer-brand">' +
      '<p>Specialista dal 1982 in soluzioni per il cleaning professionale<br>e per la qualità degli ambienti di lavoro.</p>' +
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

  /* Rimandi a noleggio e usato: stessa costruzione delle card della home
     (sezione « Non serve per forza comprarla »): immagine a colori, sopratitolo,
     titolo nel colore della formula, testo e CTA. Il contenitore prende la classe
     .formule, così valgono le stesse regole e la stessa gelatina della home. */
  function promo(f, sel) {
    var el = document.querySelector(sel); if (!el) return;
    var h = '';
    if (f.noleggio) {
      h += '<div class="formula formula-nol"><span class="formula-art ph ph-volume"></span><span class="formula-body">' +
        '<span class="kicker">Formula · noleggio</span><span class="formula-h">Si può noleggiare</span>' +
        '<span class="formula-p">Formule brevi o pluriennali, assistenza e consegna incluse. Ritiro da tutte e cinque le sedi.</span>' +
        a('/noleggio/' + keyOf(f) + '/', 'Noleggio ' + f.nome.toLowerCase(), 'formula-go') + '</span></div>';
    }
    if (f.usato) {
      h += '<div class="formula formula-usa"><span class="formula-art ph ph-pattern"></span><span class="formula-body">' +
        '<span class="kicker">Formula · usato</span><span class="formula-h">Esiste anche usata</span>' +
        '<span class="formula-p">Ricondizionate e garantite da 3 a 12 mesi, con supervalutazione della macchina che hai già.</span>' +
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
      '.hero-copy h1, .hero-cnt .hero-stats > div, .row-prodotti h2, .row-gruppo .gruppo-h, .row-form .form > h3, .row-testata h1, .pagina-intro h1, .sticky-col .form > h3, .pagina-interna .form > h3, .pagina-interna .block:has(> .faq) > h2, .pagina-interna .block:has(.t-tabs) > h2'));
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

    var righe = [].slice.call(document.querySelectorAll('.wrap > .row'));
    function umore(u) {
      if (document.body.classList.contains('mood-' + u)) return;
      document.body.classList.remove('mood-chiaro', 'mood-macchine', 'mood-azzurro', 'mood-rosso');
      document.body.classList.add('mood-' + u);
    }
    /* la soglia è il titolo della sezione: dopo « Le macchine » si vira
       all'azzurro, da « I marchi del gruppo » al rosso */
    function titolo(r) { var h = r.querySelector('h2'); return h ? h.textContent : ''; }
    function trova(re) { for (var i = 0; i < righe.length; i++) if (re.test(titolo(righe[i]))) return righe[i]; return null; }
    var rAzzurro = document.querySelector(".row[data-mood=azzurro]") || trova(/Dalla fusione/);
    var rRosso = document.querySelector(".row[data-mood=rosso]") || trova(/marchi del gruppo/);
    var atteso = false;
    function guarda() {
      atteso = false;
      var meta = window.innerHeight * 0.55;
      var u = 'chiaro';
      /* le macchine accendono il rosso sul fondo della pagina; arrivando al
         gruppo il rosso si dissolve nell'azzurro (dissolvenza lunga in CSS) */
      var rMac = document.querySelector('.row[data-mood=macchine]');
      if (rMac && rMac.getBoundingClientRect().top < window.innerHeight * 0.85) u = 'macchine';
      if (rAzzurro && rAzzurro.getBoundingClientRect().top < meta) u = 'azzurro';
      if (rRosso && rRosso.getBoundingClientRect().top < meta) u = 'rosso';
      umore(u);
    }
    window.addEventListener('scroll', function () {
      if (!atteso) { atteso = true; requestAnimationFrame(guarda); }
    }, { passive: true });
    window.addEventListener('resize', guarda);
    guarda();

    /* 2 · materia che prosegue verso il basso dietro noleggio e settori */
    var rMateria = trova(/Non serve per forza/);
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
        b.classList.add('is-drag'); b.setPointerCapture(e.pointerId);
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
          RM = 18;   /* il riquadro visibile è 10px dentro il suo box: spazio per gonfiarsi */
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
        misura(); var q = locale(e); mx = hx = q[0]; my = hy = q[1]; vx = vy = dxs = dys = 0; sopra = 1;
        if (!raf) raf = requestAnimationFrame(giro);
      });
      c.addEventListener('pointermove', function (e) {
        var q = locale(e); mx = q[0]; my = q[1];
        if (!raf) raf = requestAnimationFrame(giro);
      });
      c.addEventListener('pointerleave', function () { sopra = 0; if (!raf) raf = requestAnimationFrame(giro); });
    });
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
  function scenaInterna() {
    if (document.body.dataset.pagina === 'home' || document.querySelector('.mood')) return;
    var righe = [].slice.call(document.querySelectorAll('.wrap > .row')).filter(function (r) { return !r.classList.contains('wf-doc'); });
    if (!righe.length) return;
    document.body.classList.add('pagina-interna');
    righe[0].classList.add('row-testata');
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="mood" aria-hidden="true"><span class="chiaro"></span><span class="macchine"></span><span class="blu"></span><span class="azzurro"></span><span class="rosso"></span></div>');
    /* la testata è rossa per default; i template del mondo macchine e prodotti
       dichiarano data-testata="blu" e partono dall'azzurro profondo della VI */
    var testata = document.body.dataset.testata === 'blu' ? 'blu' : 'macchine';
    function umore(u) {
      if (document.body.classList.contains('mood-' + u)) return;
      document.body.classList.remove('mood-chiaro', 'mood-macchine', 'mood-blu', 'mood-azzurro', 'mood-rosso');
      document.body.classList.add('mood-' + u);
    }
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
          /* pagine con fondo di colore dichiarato: sopra la nav si sta sempre
             sul colore, a meno di essere finiti sopra una lastra bianca */
          else if (document.body.dataset.testata && !el0.closest('.block, .card, .form')) scuro = true;
          hd.classList.toggle('topbar-su-scuro', scuro);
        }
        var ridotto = window.scrollY > 40;
        if (ridotto === ultimo) return;
        ultimo = ridotto;
        /* forma fissa: lo stato ridotto non cambia più l'header */
        misuraBarre();
      };
      guardaHeader();
      window.addEventListener('scroll', guardaHeader, { passive: true });
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
    carteGelatina();
    claimJelly();          /* per ultimo: i bersagli esistono tutti */
    ricercaScritta();
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
