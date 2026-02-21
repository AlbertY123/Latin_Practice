const CASES = ['nominative', 'accusative', 'genitive', 'dative', 'ablative'];
const COLS = ['sg-m', 'sg-f', 'sg-n', 'pl-m', 'pl-f', 'pl-n'];

const score = {
  verb: { ok: 0, total: 0, streak: 0 },
  pronoun: { ok: 0, total: 0, streak: 0 },
  noun: { ok: 0, total: 0, streak: 0 }
};

const verbForms = [
  { form: 'amo', lemma: 'amo', person: '1st', number: 'singular', tense: 'present', mood: 'indicative', voice: 'active' },
  { form: 'amabam', lemma: 'amo', person: '1st', number: 'singular', tense: 'imperfect', mood: 'indicative', voice: 'active' },
  { form: 'amavero', lemma: 'amo', person: '1st', number: 'singular', tense: 'future perfect', mood: 'indicative', voice: 'active' },
  { form: 'ducimur', lemma: 'duco', person: '1st', number: 'plural', tense: 'present', mood: 'indicative', voice: 'passive' },
  { form: 'duceris', lemma: 'duco', person: '2nd', number: 'singular', tense: 'present', mood: 'indicative', voice: 'passive' },
  { form: 'videbamus', lemma: 'video', person: '1st', number: 'plural', tense: 'imperfect', mood: 'indicative', voice: 'active' },
  { form: 'viderat', lemma: 'video', person: '3rd', number: 'singular', tense: 'pluperfect', mood: 'indicative', voice: 'active' },
  { form: 'sim', lemma: 'sum', person: '1st', number: 'singular', tense: 'present', mood: 'subjunctive', voice: 'active' },
  { form: 'essent', lemma: 'sum', person: '3rd', number: 'plural', tense: 'imperfect', mood: 'subjunctive', voice: 'active' }
];

const pronounParadigms = [
  {
    name: 'hic, haec, hoc',
    forms: {
      nominative: ['hic', 'haec', 'hoc', 'hi', 'hae', 'haec'],
      accusative: ['hunc', 'hanc', 'hoc', 'hos', 'has', 'haec'],
      genitive: ['huius', 'huius', 'huius', 'horum', 'harum', 'horum'],
      dative: ['huic', 'huic', 'huic', 'his', 'his', 'his'],
      ablative: ['hoc', 'hac', 'hoc', 'his', 'his', 'his']
    }
  },
  {
    name: 'ille, illa, illud',
    forms: {
      nominative: ['ille', 'illa', 'illud', 'illi', 'illae', 'illa'],
      accusative: ['illum', 'illam', 'illud', 'illos', 'illas', 'illa'],
      genitive: ['illius', 'illius', 'illius', 'illorum', 'illarum', 'illorum'],
      dative: ['illi', 'illi', 'illi', 'illis', 'illis', 'illis'],
      ablative: ['illo', 'illa', 'illo', 'illis', 'illis', 'illis']
    }
  },
  {
    name: 'is, ea, id',
    forms: {
      nominative: ['is', 'ea', 'id', 'ei', 'eae', 'ea'],
      accusative: ['eum', 'eam', 'id', 'eos', 'eas', 'ea'],
      genitive: ['eius', 'eius', 'eius', 'eorum', 'earum', 'eorum'],
      dative: ['ei', 'ei', 'ei', 'eis', 'eis', 'eis'],
      ablative: ['eo', 'ea', 'eo', 'eis', 'eis', 'eis']
    }
  },
  {
    name: 'iste, ista, istud',
    forms: {
      nominative: ['iste', 'ista', 'istud', 'isti', 'istae', 'ista'],
      accusative: ['istum', 'istam', 'istud', 'istos', 'istas', 'ista'],
      genitive: ['istius', 'istius', 'istius', 'istorum', 'istarum', 'istorum'],
      dative: ['isti', 'isti', 'isti', 'istis', 'istis', 'istis'],
      ablative: ['isto', 'ista', 'isto', 'istis', 'istis', 'istis']
    }
  },
  {
    name: 'qui, quae, quod',
    forms: {
      nominative: ['qui', 'quae', 'quod', 'qui', 'quae', 'quae'],
      accusative: ['quem', 'quam', 'quod', 'quos', 'quas', 'quae'],
      genitive: ['cuius', 'cuius', 'cuius', 'quorum', 'quarum', 'quorum'],
      dative: ['cui', 'cui', 'cui', 'quibus', 'quibus', 'quibus'],
      ablative: ['quo', 'qua', 'quo', 'quibus', 'quibus', 'quibus']
    }
  },
  {
    name: 'ipse, ipsa, ipsum',
    forms: {
      nominative: ['ipse', 'ipsa', 'ipsum', 'ipsi', 'ipsae', 'ipsa'],
      accusative: ['ipsum', 'ipsam', 'ipsum', 'ipsos', 'ipsas', 'ipsa'],
      genitive: ['ipsius', 'ipsius', 'ipsius', 'ipsorum', 'ipsarum', 'ipsorum'],
      dative: ['ipsi', 'ipsi', 'ipsi', 'ipsis', 'ipsis', 'ipsis'],
      ablative: ['ipso', 'ipsa', 'ipso', 'ipsis', 'ipsis', 'ipsis']
    }
  }
];

const nounParadigms = [
  {
    lemma: 'puella, puellae (f)', decl: '1st declension',
    forms: {
      nominative: ['puella', 'puellae'], accusative: ['puellam', 'puellas'],
      genitive: ['puellae', 'puellarum'], dative: ['puellae', 'puellis'], ablative: ['puella', 'puellis']
    }
  },
  {
    lemma: 'servus, servi (m)', decl: '2nd declension',
    forms: {
      nominative: ['servus', 'servi'], accusative: ['servum', 'servos'],
      genitive: ['servi', 'servorum'], dative: ['servo', 'servis'], ablative: ['servo', 'servis']
    }
  },
  {
    lemma: 'bellum, belli (n)', decl: '2nd declension',
    forms: {
      nominative: ['bellum', 'bella'], accusative: ['bellum', 'bella'],
      genitive: ['belli', 'bellorum'], dative: ['bello', 'bellis'], ablative: ['bello', 'bellis']
    }
  },
  {
    lemma: 'rex, regis (m)', decl: '3rd declension',
    forms: {
      nominative: ['rex', 'reges'], accusative: ['regem', 'reges'],
      genitive: ['regis', 'regum'], dative: ['regi', 'regibus'], ablative: ['rege', 'regibus']
    }
  },
  {
    lemma: 'nomen, nominis (n)', decl: '3rd declension',
    forms: {
      nominative: ['nomen', 'nomina'], accusative: ['nomen', 'nomina'],
      genitive: ['nominis', 'nominum'], dative: ['nomini', 'nominibus'], ablative: ['nomine', 'nominibus']
    }
  }
];

const unseenData = {
  subjects: [
    { lS: 'senator', lP: 'senatores', eS: 'the senator', eP: 'the senators' },
    { lS: 'miles', lP: 'milites', eS: 'the soldier', eP: 'the soldiers' },
    { lS: 'mercator', lP: 'mercatores', eS: 'the merchant', eP: 'the merchants' },
    { lS: 'magistra', lP: 'magistrae', eS: 'the teacher', eP: 'the teachers' }
  ],
  objects: [
    { lS: 'consilium', lP: 'consilia', eS: 'the plan', eP: 'the plans' },
    { lS: 'epistulam', lP: 'epistulas', eS: 'the letter', eP: 'the letters' },
    { lS: 'urbem', lP: 'urbes', eS: 'the city', eP: 'the cities' }
  ],
  verbs: [
    { lS: 'scribit', lP: 'scribunt', eS: 'writes', eP: 'write' },
    { lS: 'mittit', lP: 'mittunt', eS: 'sends', eP: 'send' },
    { lS: 'defendit', lP: 'defendunt', eS: 'defends', eP: 'defend' },
    { lS: 'expugnat', lP: 'expugnant', eS: 'storms', eP: 'storm' }
  ],
  adverbs: ['celeriter', 'statim', 'clam', 'saepe'],
  connectives: ['quamquam', 'postquam', 'cum']
};

const unseenLexicon = {
  senator: 'senator, senatoris (m): senator',
  senatores: 'senator, senatoris (m): senators',
  miles: 'miles, militis (m): soldier',
  milites: 'miles, militis (m): soldiers',
  mercator: 'mercator, mercatoris (m): merchant',
  mercatores: 'mercator, mercatoris (m): merchants',
  magistra: 'magistra, magistrae (f): teacher',
  magistrae: 'magistra, magistrae (f): teachers',
  consilium: 'consilium, consilii (n): plan/advice',
  consilia: 'consilium, consilii (n): plans',
  epistulam: 'epistula, epistulae (f): letter (acc. sg.)',
  epistulas: 'epistula, epistulae (f): letters (acc. pl.)',
  urbem: 'urbs, urbis (f): city (acc. sg.)',
  urbes: 'urbs, urbis (f): cities (acc. pl.)',
  scribit: 'scribo, scribere, scripsi, scriptum: writes',
  scribunt: 'scribo, scribere, scripsi, scriptum: write',
  mittit: 'mitto, mittere, misi, missum: sends',
  mittunt: 'mitto, mittere, misi, missum: send',
  defendit: 'defendo, defendere, defendi, defensum: defends',
  defendunt: 'defendo, defendere, defendi, defensum: defend',
  expugnat: 'expugno, expugnare, expugnavi, expugnatum: storms',
  expugnant: 'expugno, expugnare, expugnavi, expugnatum: storm',
  celeriter: 'celeriter: quickly',
  statim: 'statim: immediately',
  clam: 'clam: secretly',
  saepe: 'saepe: often',
  quamquam: 'quamquam: although',
  postquam: 'postquam: after',
  cum: 'cum: when/since',
  hostes: 'hostis, hostis (m/f): enemies',
  appropinquant: 'appropinquo, appropinquare: approach',
  tum: 'tum: then',
  nuntiat: 'nuntio, nuntiare: announces/reports',
  se: 'se (reflexive pronoun): himself/herself/themselves',
  defendere: 'defendo, defendere: to defend'
};

const hexameterLines = [
  {
    line: 'Arma virumque cano, Troiae qui primus ab oris',
    lineMacron: 'Ārma virumque canō, Trōiae quī prīmus ab ōrīs',
    syllables: ['Ar', 'ma', 'vi', 'rum', 'que', 'ca', 'no', 'Troi', 'ae', 'qui', 'pri', 'mus', 'ab', 'o', 'ris'],
    syllablesMacron: ['Ār', 'ma', 'vi', 'rūm', 'que', 'ca', 'nō', 'Trōi', 'ae', 'quī', 'prī', 'mus', 'ab', 'ō', 'rīs'],
    quantities: ['L', 'S', 'S', 'L', 'S', 'S', 'L', 'L', 'L', 'L', 'L', 'S', 'S', 'L', 'S'],
    breaks: [2, 5, 7, 9, 12],
    caesura: 9
  },
  {
    line: 'Italiam, fato profugus, Laviniaque venit',
    lineMacron: 'Ītaliam fātō profugus Lāvīniaque vēnit',
    syllables: ['I', 'ta', 'li', 'am', 'fa', 'to', 'pro', 'fu', 'gus', 'La', 'vi', 'nja', 'que', 've', 'nit'],
    syllablesMacron: ['Ī', 'ta', 'li', 'ām', 'fā', 'tō', 'pro', 'fu', 'gūs', 'Lā', 'vī', 'nja', 'que', 'vē', 'nit'],
    quantities: ['L', 'S', 'S', 'L', 'L', 'L', 'S', 'S', 'L', 'L', 'L', 'S', 'S', 'L', 'S'],
    breaks: [2, 5, 7, 10, 12],
    caesura: 7
  },
  {
    line: 'litora, multum ille et terris iactatus et alto',
    lineMacron: 'lītora, multum ille et terrīs iactātus et altō',
    syllables: ['li', 'to', 'ra', 'mult', 'ill', 'et', 'ter', 'ris', 'iac', 'ta', 'tus', 'et', 'al', 'to'],
    syllablesMacron: ['lī', 'to', 'ra', 'mūlt', 'īll', 'et', 'tēr', 'rīs', 'iāc', 'tā', 'tus', 'et', 'āl', 'tō'],
    quantities: ['L', 'S', 'S', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'S', 'S', 'L', 'S'],
    breaks: [2, 4, 6, 8, 11],
    caesura: 6
  },
  {
    line: 'vi superum, saevae memorem Iunonis ob iram',
    lineMacron: 'vī superum, saevae memorem Iūnōnis ob īram',
    syllables: ['vi', 'su', 'pe', 'rum', 'sae', 'vae', 'me', 'mo', 'rem', 'Iu', 'no', 'nis', 'ob', 'i', 'ram'],
    syllablesMacron: ['vī', 'su', 'pe', 'rūm', 'sae', 'vae', 'me', 'mo', 'rēm', 'Iū', 'nō', 'nis', 'ob', 'ī', 'ram'],
    quantities: ['L', 'S', 'S', 'L', 'L', 'L', 'S', 'S', 'L', 'L', 'L', 'S', 'S', 'L', 'S'],
    breaks: [2, 4, 6, 9, 12],
    caesura: 8
  }
];

let currentVerb = null;
let currentPronoun = null;
let currentNoun = null;
let currentUnseen = null;
let currentHex = null;
let currentHexState = null;

const byId = (id) => document.getElementById(id);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function updateScore(kind) {
  const s = score[kind];
  const map = { verb: 'v-score', pronoun: 'p-score', noun: 'n-score' };
  byId(map[kind]).textContent = `Score: ${s.ok}/${s.total} · Streak: ${s.streak}`;
}

function setupTabs() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      byId(tab.dataset.tab).classList.add('active');
    });
  });
}

function setFeedback(id, text, ok = null) {
  const el = byId(id);
  el.textContent = text;
  el.className = 'feedback';
  if (ok === true) el.classList.add('ok');
  if (ok === false) el.classList.add('bad');
}

function escapeHtml(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderGlossedLatin(sentence) {
  const tokens = sentence.match(/\w+|[^\w\s]+|\s+/g) || [sentence];
  return tokens.map((tk) => {
    if (/^\s+$/.test(tk) || /^[^\w]+$/.test(tk)) return escapeHtml(tk);
    const key = tk.toLowerCase();
    const gloss = unseenLexicon[key] || 'No entry in mini-lexicon yet';
    return `<span class="latin-word" title="${escapeHtml(gloss)}">${escapeHtml(tk)}</span>`;
  }).join('');
}

function nextVerb() {
  currentVerb = pick(verbForms);
  byId('verb-form').textContent = currentVerb.form;
  byId('verb-lemma').textContent = currentVerb.lemma;
  ['v-person', 'v-number', 'v-tense', 'v-mood', 'v-voice'].forEach((id) => byId(id).value = '');
  setFeedback('verb-feedback', '');
}

function checkVerb() {
  const guess = {
    person: byId('v-person').value,
    number: byId('v-number').value,
    tense: byId('v-tense').value,
    mood: byId('v-mood').value,
    voice: byId('v-voice').value
  };
  const wrong = Object.keys(guess).filter((k) => guess[k] !== currentVerb[k]);
  score.verb.total++;
  if (!wrong.length) {
    score.verb.ok++; score.verb.streak++;
    setFeedback('verb-feedback', '✅ Correct.', true);
  } else {
    score.verb.streak = 0;
    const ans = `${currentVerb.person}, ${currentVerb.number}, ${currentVerb.tense}, ${currentVerb.mood}, ${currentVerb.voice}`;
    setFeedback('verb-feedback', `❌ Correct answer: ${ans}.`, false);
  }
  updateScore('verb');
}

function initPronounOptions() {
  const sel = byId('pro-pronoun');
  sel.innerHTML = pronounParadigms.map((p, i) => `<option value="${i}">${p.name}</option>`).join('');
}

function buildPronounTable() {
  const table = byId('pronoun-table');
  table.innerHTML = `
    <thead><tr><th>Case</th><th>Sg M</th><th>Sg F</th><th>Sg N</th><th>Pl M</th><th>Pl F</th><th>Pl N</th></tr></thead>
    <tbody>${CASES.map((c) => `<tr><th class="rowhead">${c}</th>${COLS.map((col) => `<td><input data-case="${c}" data-col="${col}" /></td>`).join('')}</tr>`).join('')}</tbody>`;
}

function loadPronoun() {
  currentPronoun = pronounParadigms[Number(byId('pro-pronoun').value) || 0];
  document.querySelectorAll('#pronoun-table input').forEach((i) => { i.value = ''; i.classList.remove('ok', 'bad'); });
  setFeedback('pro-feedback', '');
}

function checkPronoun(showAnswers = false) {
  let total = 0, correct = 0;
  document.querySelectorAll('#pronoun-table input').forEach((inp) => {
    const row = inp.dataset.case;
    const col = COLS.indexOf(inp.dataset.col);
    const expected = currentPronoun.forms[row][col];
    const actual = inp.value.trim().toLowerCase();
    const good = actual === expected;
    total++; if (good) correct++;
    inp.classList.remove('ok', 'bad'); inp.classList.add(good ? 'ok' : 'bad');
    if (showAnswers && !good) inp.value = expected;
  });
  if (!showAnswers) {
    score.pronoun.total++;
    if (correct === total) { score.pronoun.ok++; score.pronoun.streak++; } else score.pronoun.streak = 0;
    updateScore('pronoun');
  }
  setFeedback('pro-feedback', correct === total ? '✅ Full grid correct.' : `❌ ${correct}/${total} correct.`, correct === total);
}

function buildNounTable() {
  const table = byId('noun-table');
  table.innerHTML = `
    <thead><tr><th>Case</th><th>Singular</th><th>Plural</th></tr></thead>
    <tbody>${CASES.map((c) => `<tr><th class="rowhead">${c}</th><td><input data-case="${c}" data-num="0" /></td><td><input data-case="${c}" data-num="1" /></td></tr>`).join('')}</tbody>`;
}

function nextNoun() {
  currentNoun = pick(nounParadigms);
  byId('noun-lemma').textContent = currentNoun.lemma;
  byId('noun-meta').textContent = `(${currentNoun.decl})`;
  document.querySelectorAll('#noun-table input').forEach((i) => { i.value = ''; i.classList.remove('ok', 'bad'); });
  setFeedback('noun-feedback', '');
}

function checkNoun(showAnswers = false) {
  let total = 0, correct = 0;
  document.querySelectorAll('#noun-table input').forEach((inp) => {
    const row = inp.dataset.case;
    const num = Number(inp.dataset.num);
    const expected = currentNoun.forms[row][num];
    const actual = inp.value.trim().toLowerCase();
    const good = actual === expected;
    total++; if (good) correct++;
    inp.classList.remove('ok', 'bad'); inp.classList.add(good ? 'ok' : 'bad');
    if (showAnswers && !good) inp.value = expected;
  });
  if (!showAnswers) {
    score.noun.total++;
    if (correct === total) { score.noun.ok++; score.noun.streak++; } else score.noun.streak = 0;
    updateScore('noun');
  }
  setFeedback('noun-feedback', correct === total ? '✅ Full grid correct.' : `❌ ${correct}/${total} correct.`, correct === total);
}

function generateUnseen() {
  const level = byId('u-level').value;
  const subjPlural = Math.random() < 0.5;
  const objPlural = Math.random() < 0.45;
  const s = pick(unseenData.subjects);
  const o = pick(unseenData.objects);
  const v = pick(unseenData.verbs);
  const adv = pick(unseenData.adverbs);
  const conn = pick(unseenData.connectives);

  const lSubj = subjPlural ? s.lP : s.lS;
  const eSubj = subjPlural ? s.eP : s.eS;
  const lObj = objPlural ? o.lP : o.lS;
  const eObj = objPlural ? o.eP : o.eS;
  const lVerb = subjPlural ? v.lP : v.lS;
  const eVerb = subjPlural ? v.eP : v.eS;

  let latin = `${lSubj} ${adv} ${lVerb} ${lObj}, ${conn} hostes appropinquant.`;
  let english = `${eSubj} ${eVerb} ${eObj} ${adv}, although the enemies are approaching.`;

  if (level === 'very-hard') {
    const s2 = pick(unseenData.subjects);
    const v2 = pick(unseenData.verbs);
    latin = `${latin} tum ${s2.lS} nuntiat se urbem defendere.`;
    english = `${english} then ${s2.eS} announces that he/she is defending the city.`;
  }

  currentUnseen = { latin, english };
  byId('unseen-latin').innerHTML = renderGlossedLatin(latin);
  const eng = byId('unseen-english');
  eng.textContent = '(hidden)';
  eng.classList.add('hidden');
}

function revealUnseen() {
  if (!currentUnseen) return;
  const eng = byId('unseen-english');
  eng.textContent = currentUnseen.english;
  eng.classList.remove('hidden');
}

function cycleQuantity(i) {
  const now = currentHexState.quantities[i];
  currentHexState.quantities[i] = now === '' ? 'L' : now === 'L' ? 'S' : '';
  renderHexWorkbench();
}

function toggleBoundary(type, i) {
  if (type === 'break') {
    currentHexState.breaks[i] = !currentHexState.breaks[i];
  } else {
    currentHexState.caesura = currentHexState.caesura === i ? null : i;
  }
  renderHexWorkbench();
}

function renderHexWorkbench() {
  const host = byId('hex-workbench');
  const qSymbol = (q) => (q === 'L' ? '—' : q === 'S' ? '∪' : '?');
  const useMacron = byId('hex-macron-toggle')?.checked;
  const displaySyllables = useMacron ? (currentHex.syllablesMacron || currentHex.syllables) : currentHex.syllables;

  let html = '<div class="hex-line-row">';
  displaySyllables.forEach((syll, i) => {
    const q = currentHexState.quantities[i];
    const cls = q === 'L' ? 'long' : q === 'S' ? 'short' : '';
    html += `<button class="syll-btn ${cls}" data-act="qty" data-i="${i}">${syll}<br><small>${qSymbol(q)}</small></button>`;

    if (i < displaySyllables.length - 1) {
      const bOn = currentHexState.breaks[i] ? 'active' : '';
      const cOn = currentHexState.caesura === i ? 'active' : '';
      html += `<span class="mark-group">
        <button class="mark-btn ${bOn}" data-act="break" data-i="${i}" title="Foot break">|</button>
        <button class="mark-btn ${cOn}" data-act="caesura" data-i="${i}" title="Caesura">‖</button>
      </span>`;
    }
  });
  html += '</div>';

  const breakCount = currentHexState.breaks.filter(Boolean).length;
  html += `<div class="foot-summary">Foot breaks placed: ${breakCount}/5 (Hexameter = 6 feet)</div>`;
  host.innerHTML = html;

  host.querySelectorAll('[data-act="qty"]').forEach((el) => {
    el.addEventListener('click', () => cycleQuantity(Number(el.dataset.i)));
  });
  host.querySelectorAll('[data-act="break"]').forEach((el) => {
    el.addEventListener('click', () => toggleBoundary('break', Number(el.dataset.i)));
  });
  host.querySelectorAll('[data-act="caesura"]').forEach((el) => {
    el.addEventListener('click', () => toggleBoundary('caesura', Number(el.dataset.i)));
  });
}

function updateHexLineDisplay() {
  const useMacron = byId('hex-macron-toggle')?.checked;
  byId('hex-line').textContent = useMacron ? (currentHex.lineMacron || currentHex.line) : currentHex.line;
}

function resetHexMarkup() {
  currentHexState = {
    quantities: Array(currentHex.syllables.length).fill(''),
    breaks: Array(currentHex.syllables.length - 1).fill(false),
    caesura: null
  };
  updateHexLineDisplay();
  renderHexWorkbench();
  setFeedback('hex-feedback', '');
  byId('hex-answer').textContent = '';
}

function nextHexLine() {
  currentHex = pick(hexameterLines);
  resetHexMarkup();
}

function computeValidHexBreakPatterns(quantities) {
  const n = quantities.length;
  const out = [];

  function rec(pos, foot, breaks) {
    if (foot === 6) {
      if (pos === n) out.push([...breaks]);
      return;
    }

    if (foot === 5) {
      if (pos + 2 === n && quantities[pos] === 'L') {
        out.push([...breaks]);
      }
      return;
    }

    if (pos + 3 <= n && quantities[pos] === 'L' && quantities[pos + 1] === 'S' && quantities[pos + 2] === 'S') {
      breaks.push(pos + 2);
      rec(pos + 3, foot + 1, breaks);
      breaks.pop();
    }

    if (pos + 2 <= n && quantities[pos] === 'L' && quantities[pos + 1] === 'L') {
      breaks.push(pos + 1);
      rec(pos + 2, foot + 1, breaks);
      breaks.pop();
    }
  }

  rec(0, 0, []);
  return out.filter((b) => b.length === 5);
}

function checkHex(show = false) {
  let qtyOk = 0;
  currentHex.quantities.forEach((q, i) => {
    if (currentHexState.quantities[i] === q) qtyOk++;
  });

  const validBreakPatterns = computeValidHexBreakPatterns(currentHex.quantities);
  const expectedBreaks = validBreakPatterns[0] || currentHex.breaks || [];

  const userBreakPositions = currentHexState.breaks
    .map((v, i) => (v ? i : -1))
    .filter((i) => i >= 0);
  const userBreakCount = userBreakPositions.length;

  const breaksExact = validBreakPatterns.some((pat) => pat.join(',') === userBreakPositions.join(','));

  const caesuraInReasonablePlace = currentHexState.caesura !== null && currentHexState.caesura >= 4 && currentHexState.caesura <= currentHex.quantities.length - 4;

  const total = currentHex.quantities.length + 2;
  const got = qtyOk + (breaksExact ? 1 : 0) + (caesuraInReasonablePlace ? 1 : 0);
  const perfect = qtyOk === currentHex.quantities.length && breaksExact && caesuraInReasonablePlace && userBreakCount === 5;

  let msg = perfect
    ? '✅ Excellent: quantities, 6-foot division, and caesura all match.'
    : `❌ ${got}/${total} checks right.`;

  if (userBreakCount !== 5) {
    msg += ` You placed ${userBreakCount} foot breaks; hexameter needs exactly 5 breaks for 6 feet.`;
  } else if (!breaksExact) {
    msg += ' Foot divisions are not matching a valid pattern for this line.';
  }

  if (!caesuraInReasonablePlace) {
    msg += ' Place one caesura in the middle of the line.';
  }

  setFeedback('hex-feedback', msg, perfect);

  if (show || !perfect) {
    const useMacron = byId('hex-macron-toggle')?.checked;
    const displaySyllables = useMacron ? (currentHex.syllablesMacron || currentHex.syllables) : currentHex.syllables;
    const qtyText = displaySyllables
      .map((s, i) => `${s}(${currentHex.quantities[i] === 'L' ? '—' : '∪'})`)
      .join(' ');
    const breaksText = expectedBreaks.map((i) => i + 1).join(', ');
    byId('hex-answer').textContent = `Answer → ${qtyText} · One valid break-set after syllables: ${breaksText} · Suggested caesura near syllable ${currentHex.caesura + 1}.`;
  }
}

function init() {
  setupTabs();
  updateScore('verb'); updateScore('pronoun'); updateScore('noun');

  byId('verb-check').addEventListener('click', checkVerb);
  byId('verb-next').addEventListener('click', nextVerb);

  initPronounOptions();
  buildPronounTable();
  byId('pro-pronoun').addEventListener('change', loadPronoun);
  byId('pro-check').addEventListener('click', () => checkPronoun(false));
  byId('pro-show').addEventListener('click', () => checkPronoun(true));

  buildNounTable();
  byId('noun-check').addEventListener('click', () => checkNoun(false));
  byId('noun-show').addEventListener('click', () => checkNoun(true));
  byId('noun-next').addEventListener('click', nextNoun);

  byId('unseen-generate').addEventListener('click', generateUnseen);
  byId('unseen-reveal').addEventListener('click', revealUnseen);

  byId('hex-check').addEventListener('click', () => checkHex(false));
  byId('hex-show').addEventListener('click', () => checkHex(true));
  byId('hex-reset').addEventListener('click', resetHexMarkup);
  byId('hex-next').addEventListener('click', nextHexLine);
  byId('hex-macron-toggle').addEventListener('change', () => {
    updateHexLineDisplay();
    renderHexWorkbench();
  });

  nextVerb();
  loadPronoun();
  nextNoun();
  generateUnseen();
  nextHexLine();
}

document.addEventListener('DOMContentLoaded', init);
