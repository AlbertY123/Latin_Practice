const CASES = ['nominative', 'accusative', 'genitive', 'dative', 'ablative'];
const COLS = ['sg-m', 'sg-f', 'sg-n', 'pl-m', 'pl-f', 'pl-n'];

const score = {
  verb: { ok: 0, total: 0, streak: 0 },
  pronoun: { ok: 0, total: 0, streak: 0 },
  noun: { ok: 0, total: 0, streak: 0 },
  macron: { ok: 0, total: 0, streak: 0 },
  vocab: { ok: 0, total: 0, streak: 0 }
};

const verbForms = [
  { form: 'amo', lemma: 'amo', meaning: 'love', person: '1st', number: 'singular', tense: 'present', mood: 'indicative', voice: 'active' },
  { form: 'amabam', lemma: 'amo', meaning: 'love', person: '1st', number: 'singular', tense: 'imperfect', mood: 'indicative', voice: 'active' },
  { form: 'amavero', lemma: 'amo', meaning: 'love', person: '1st', number: 'singular', tense: 'future perfect', mood: 'indicative', voice: 'active' },
  { form: 'ducimur', lemma: 'duco', meaning: 'lead', person: '1st', number: 'plural', tense: 'present', mood: 'indicative', voice: 'passive' },
  { form: 'duceris', lemma: 'duco', meaning: 'lead', person: '2nd', number: 'singular', tense: 'present', mood: 'indicative', voice: 'passive' },
  { form: 'videbamus', lemma: 'video', meaning: 'see', person: '1st', number: 'plural', tense: 'imperfect', mood: 'indicative', voice: 'active' },
  { form: 'viderat', lemma: 'video', meaning: 'see', person: '3rd', number: 'singular', tense: 'pluperfect', mood: 'indicative', voice: 'active' },
  { form: 'sim', lemma: 'sum', meaning: 'be', person: '1st', number: 'singular', tense: 'present', mood: 'subjunctive', voice: 'active' },
  { form: 'essent', lemma: 'sum', meaning: 'be', person: '3rd', number: 'plural', tense: 'imperfect', mood: 'subjunctive', voice: 'active' }
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
    { key: 'plan', lS: 'consilium', lP: 'consilia', eS: 'the plan', eP: 'the plans' },
    { key: 'letter', lS: 'epistulam', lP: 'epistulas', eS: 'the letter', eP: 'the letters' },
    { key: 'city', lS: 'urbem', lP: 'urbes', eS: 'the city', eP: 'the cities' }
  ],
  verbs: [
    { lS: 'scribit', lP: 'scribunt', eS: 'writes', eP: 'write', objectKeys: ['letter'] },
    { lS: 'parat', lP: 'parant', eS: 'prepares', eP: 'prepare', objectKeys: ['plan'] },
    { lS: 'defendit', lP: 'defendunt', eS: 'defends', eP: 'defend', objectKeys: ['city'] },
    { lS: 'expugnat', lP: 'expugnant', eS: 'storms', eP: 'storm', objectKeys: ['city'] }
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
  parat: 'paro, parare, paravi, paratum: prepares',
  parant: 'paro, parare, paravi, paratum: prepare',
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
  defendere: 'defendo, defendere: to defend',

  // Extra vocab used by curated unseens
  puella: 'puella, puellae (f): girl',
  rosam: 'rosa, rosae (f): rose (acc. sg.)',
  portat: 'porto, portare: carries',
  servus: 'servus, servi (m): slave',
  aquam: 'aqua, aquae (f): water (acc. sg.)',
  villam: 'villa, villae (f): house/villa (acc. sg.)',
  nauta: 'nauta, nautae (m): sailor',
  mare: 'mare, maris (n): sea',
  videt: 'video, videre: sees',
  laudat: 'laudo, laudare: praises',
  pueros: 'puer, pueri (m): boys (acc. pl.)',

  legit: 'lego, legere: reads/read',
  discessit: 'discedo, discedere: left',
  fessus: 'fessus: tired',
  curiam: 'curia, curiae (f): senate-house (acc. sg.)',
  venit: 'venio, venire: comes/came',
  pontem: 'pons, pontis (m): bridge (acc. sg.)',
  defendunt: 'defendo, defendere: defend',
  ne: 'ne: lest / so that…not',
  transeant: 'transeo, transire: they may cross',
  amici: 'amicus, amici (m): friends (nom. pl.)',
  adsint: 'adsum, adesse: are present (subj.)',
  laeti: 'laetus: happy (nom. pl.)',

  hostes: 'hostis, hostis (m/f): enemies',
  appropinquarent: 'appropinquo, appropinquare: were approaching',
  dux: 'dux, ducis (m): leader',
  portas: 'porta, portae (f): gates (acc. pl.)',
  duxit: 'duco, ducere: led',
  nuntiavit: 'nuntio, nuntiare: announced',
  defendi: 'defendo: to be defended (passive infinitive)',
  audivit: 'audio, audire: heard',
  intellexit: 'intellego, intellegere: understood',
  periculo: 'periculum, periculi (n): danger (abl.)',
  esse: 'sum, esse: to be',
  libro: 'liber, libri (m): book (abl.)',
  aperto: 'apertus: open (abl.)',
  verba: 'verbum, verbi (n): words',
  diligenter: 'diligenter: carefully',
  scripsit: 'scribo, scribere: wrote',

  haec: 'hic, haec, hoc: these things',
  dixisset: 'dico, dicere: had said (subj.)',
  rex: 'rex, regis (m): king',
  imperavit: 'impero, imperare: ordered',
  ut: 'ut: that / so that',
  legati: 'legatus, legati (m): envoys (nom. pl.)',
  romam: 'Roma (acc.): to Rome',
  mitterentur: 'mitto, mittere: were sent (subj. passive)',
  dubito: 'dubito, dubitare: I doubt',
  quin: 'quin: that (after non dubito)',
  tempus: 'tempus, temporis (n): time',
  habeant: 'habeo, habere: they have (subj.)',
  expugnent: 'expugno, expugnare: they storm (subj.)',
  dum: 'dum: while',
  cives: 'civis, civis (m/f): citizens',
  foro: 'forum, fori (n): forum (abl.)',
  clamant: 'clamo, clamare: shout',
  consilium: 'consilium, consilii (n): plan',
  capit: 'capio, capere: takes',
  quo: 'quo: by which / so that',
  servet: 'servo, servare: may save (subj.)',
  quoque: 'quoque: also',
  facilius: 'facile: more easily',
  vincerent: 'vinco, vincere: might win (subj.)',
  nocte: 'nox, noctis (f): at night (abl.)',
  ex: 'ex: out of/from',
  castris: 'castra, castrorum (n pl.): camp (abl.)',
  egressi: 'egredior: having gone out'
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

// -------------------------------
// Macron Learn + Vocab Learn
// -------------------------------

const MACRON_STRIP = {
  ā: 'a', ē: 'e', ī: 'i', ō: 'o', ū: 'u', ȳ: 'y',
  Ā: 'A', Ē: 'E', Ī: 'I', Ō: 'O', Ū: 'U', Ȳ: 'Y'
};

const MACRON_ADD = {
  a: 'ā', e: 'ē', i: 'ī', o: 'ō', u: 'ū', y: 'ȳ',
  A: 'Ā', E: 'Ē', I: 'Ī', O: 'Ō', U: 'Ū', Y: 'Ȳ'
};

function stripMacrons(s) {
  return (s || '').split('').map((ch) => MACRON_STRIP[ch] || ch).join('');
}

function addMacron(ch) {
  return MACRON_ADD[ch] || ch;
}

function isVowel(ch) {
  return /[aeiouyAEIOUY]/.test(stripMacrons(ch));
}

// For now this is a curated starter list.
// If you want, we can later import a bigger macron list from a trusted source.
const macronItems = [
  { latin: 'nōn', english: 'not' },
  { latin: 'sī', english: 'if' },
  { latin: 'nē', english: 'lest / so that…not' },
  { latin: 'cūr', english: 'why' },
  { latin: 'quō', english: 'to where / whither; by which' },
  { latin: 'quā', english: 'by which way / where' },
  { latin: 'hūc', english: 'to here' },
  { latin: 'illūc', english: 'to there' },
  { latin: 'dō', english: 'I give' },
  { latin: 'nūllus', english: 'no / none' },
  { latin: 'ūnus', english: 'one' },
  { latin: 'tū', english: 'you (sg.)' },
  { latin: 'nōs', english: 'we' },
  { latin: 'vōs', english: 'you (pl.)' },
  { latin: 'Rōma', english: 'Rome' },
  { latin: 'rēx', english: 'king' },
  { latin: 'vīta', english: 'life' },
  { latin: 'lūna', english: 'moon' },
  { latin: 'amīcus', english: 'friend' },
  { latin: 'fīlius', english: 'son' },
  { latin: 'fīlia', english: 'daughter' },
  { latin: 'cīvis', english: 'citizen' },
  { latin: 'vīlla', english: 'house / villa' },
  { latin: 'pūer', english: 'boy' },
  { latin: 'puella', english: 'girl' },
  { latin: 'glōria', english: 'glory' },
  { latin: 'nauta', english: 'sailor' },
  { latin: 'pōpulus', english: 'people' },
  { latin: 'bōnus', english: 'good' },
  { latin: 'māgnus', english: 'great / big' },
  { latin: 'māter', english: 'mother' },
  { latin: 'pāter', english: 'father' },
  { latin: 'frāter', english: 'brother' },
  { latin: 'soror', english: 'sister' },
  { latin: 'pāx', english: 'peace' },
  { latin: 'pōns', english: 'bridge' },
  { latin: 'mōns', english: 'mountain' },
  { latin: 'mōnstrum', english: 'monster / portent' },
  { latin: 'rēs', english: 'thing / matter' }
];

const vocabDeck = [
  // Core connectors / function words
  { id: 'et', la: 'et', en: ['and'], tags: ['core'] },
  { id: 'sed', la: 'sed', en: ['but'], tags: ['core'] },
  { id: 'aut', la: 'aut', en: ['or'], tags: ['core'] },
  { id: 'vel', la: 'vel', en: ['or'], tags: ['core'] },
  { id: 'non', la: 'nōn', en: ['not'], tags: ['core'] },
  { id: 'in', la: 'in', en: ['in', 'on'], tags: ['core'] },
  { id: 'ad', la: 'ad', en: ['to', 'towards'], tags: ['core'] },
  { id: 'cum', la: 'cum', en: ['with', 'when', 'since'], tags: ['core'] },
  { id: 'sine', la: 'sine', en: ['without'], tags: ['core'] },
  { id: 'per', la: 'per', en: ['through', 'by'], tags: ['core'] },
  { id: 'pro', la: 'prō', en: ['for', 'on behalf of'], tags: ['core'] },
  { id: 'de', la: 'dē', en: ['down from', 'about', 'concerning'], tags: ['core'] },
  { id: 'e', la: 'ē', en: ['out of', 'from'], tags: ['core'] },
  { id: 'ex', la: 'ex', en: ['out of', 'from'], tags: ['core'] },
  { id: 'a', la: 'ā', en: ['from', 'by'], tags: ['core'] },
  { id: 'ab', la: 'ab', en: ['from', 'by'], tags: ['core'] },

  // Pronouns
  { id: 'ego', la: 'ego', en: ['i'], tags: ['core', 'pronoun'] },
  { id: 'tu', la: 'tū', en: ['you'], tags: ['core', 'pronoun'] },
  { id: 'nos', la: 'nōs', en: ['we'], tags: ['core', 'pronoun'] },
  { id: 'vos', la: 'vōs', en: ['you (plural)'], tags: ['core', 'pronoun'] },
  { id: 'is', la: 'is', en: ['he', 'that', 'this'], tags: ['core', 'pronoun'] },
  { id: 'ea', la: 'ea', en: ['she', 'that', 'this'], tags: ['core', 'pronoun'] },
  { id: 'id', la: 'id', en: ['it', 'that', 'this'], tags: ['core', 'pronoun'] },
  { id: 'hic', la: 'hic', en: ['this (near)'], tags: ['core', 'pronoun'] },
  { id: 'ille', la: 'ille', en: ['that (over there)'], tags: ['core', 'pronoun'] },
  { id: 'qui', la: 'quī', en: ['who', 'which'], tags: ['core', 'pronoun'] },
  { id: 'quae', la: 'quae', en: ['who', 'which'], tags: ['core', 'pronoun'] },
  { id: 'quod', la: 'quod', en: ['which', 'that'], tags: ['core', 'pronoun'] },

  // Verbs (common)
  { id: 'sum', la: 'sum', en: ['i am'], tags: ['core', 'verb'] },
  { id: 'es', la: 'es', en: ['you are'], tags: ['core', 'verb'] },
  { id: 'est', la: 'est', en: ['he is', 'she is', 'it is'], tags: ['core', 'verb'] },
  { id: 'sunt', la: 'sunt', en: ['they are'], tags: ['core', 'verb'] },
  { id: 'possum', la: 'possum', en: ['i am able', 'i can'], tags: ['core', 'verb'] },
  { id: 'habeo', la: 'habeō', en: ['i have'], tags: ['core', 'verb'] },
  { id: 'facio', la: 'faciō', en: ['i do', 'i make'], tags: ['core', 'verb'] },
  { id: 'dico', la: 'dīcō', en: ['i say', 'i tell'], tags: ['core', 'verb'] },
  { id: 'venio', la: 'veniō', en: ['i come'], tags: ['core', 'verb'] },
  { id: 'video', la: 'videō', en: ['i see'], tags: ['core', 'verb'] },
  { id: 'audio', la: 'audiō', en: ['i hear'], tags: ['core', 'verb'] },
  { id: 'amo', la: 'amō', en: ['i love', 'i like'], tags: ['core', 'verb'] },
  { id: 'do', la: 'dō', en: ['i give'], tags: ['core', 'verb'] },

  // Adjectives
  { id: 'bonus', la: 'bonus', en: ['good'], tags: ['core', 'adj'] },
  { id: 'malus', la: 'malus', en: ['bad'], tags: ['core', 'adj'] },
  { id: 'magnus', la: 'māgnus', en: ['big', 'great'], tags: ['core', 'adj'] },
  { id: 'parvus', la: 'parvus', en: ['small'], tags: ['core', 'adj'] },
  { id: 'multus', la: 'multus', en: ['much', 'many'], tags: ['core', 'adj'] },
  { id: 'novus', la: 'novus', en: ['new'], tags: ['core', 'adj'] },

  // Nouns
  { id: 'puer', la: 'pūer', en: ['boy'], tags: ['core', 'noun'] },
  { id: 'puella', la: 'puella', en: ['girl'], tags: ['core', 'noun'] },
  { id: 'vir', la: 'vir', en: ['man'], tags: ['core', 'noun'] },
  { id: 'femina', la: 'fēmina', en: ['woman'], tags: ['core', 'noun'] },
  { id: 'mater', la: 'māter', en: ['mother'], tags: ['core', 'noun'] },
  { id: 'pater', la: 'pāter', en: ['father'], tags: ['core', 'noun'] },
  { id: 'frater', la: 'frāter', en: ['brother'], tags: ['core', 'noun'] },
  { id: 'soror', la: 'soror', en: ['sister'], tags: ['core', 'noun'] },
  { id: 'amicus', la: 'amīcus', en: ['friend'], tags: ['core', 'noun'] },

  { id: 'domus', la: 'domus', en: ['house', 'home'], tags: ['core', 'noun'] },
  { id: 'urbs', la: 'urbs', en: ['city'], tags: ['core', 'noun'] },
  { id: 'via', la: 'via', en: ['road', 'way'], tags: ['core', 'noun'] },
  { id: 'aqua', la: 'aqua', en: ['water'], tags: ['core', 'noun'] },
  { id: 'terra', la: 'terra', en: ['land', 'earth'], tags: ['core', 'noun'] },
  { id: 'mare', la: 'mare', en: ['sea'], tags: ['core', 'noun'] },
  { id: 'bellum', la: 'bellum', en: ['war'], tags: ['core', 'noun'] },
  { id: 'pax', la: 'pāx', en: ['peace'], tags: ['core', 'noun'] },
  { id: 'rex', la: 'rēx', en: ['king'], tags: ['core', 'noun'] },
  { id: 'regina', la: 'rēgīna', en: ['queen'], tags: ['core', 'noun'] },

  { id: 'dies', la: 'diēs', en: ['day'], tags: ['core', 'noun'] },
  { id: 'annus', la: 'annus', en: ['year'], tags: ['core', 'noun'] },
  { id: 'tempus', la: 'tempus', en: ['time'], tags: ['core', 'noun'] },
  { id: 'res', la: 'rēs', en: ['thing', 'matter'], tags: ['core', 'noun'] }
];

let currentVerb = null;
let currentPronoun = null;
let currentNoun = null;
let currentUnseen = null;

let currentMacron = null;
let currentMacronState = null;
let lastMacronCheck = null;

let currentVocab = null;

let currentHex = null;
let currentHexState = null;
let lastHexCheck = null;

const byId = (id) => document.getElementById(id);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function updateScore(kind) {
  const s = score[kind];
  const map = {
    verb: 'v-score',
    pronoun: 'p-score',
    noun: 'n-score',
    macron: 'm-score',
    vocab: 'vb-score'
  };
  const id = map[kind];
  if (!id) return;
  const el = byId(id);
  if (!el) return;
  el.textContent = `Score: ${s.ok}/${s.total} · Streak: ${s.streak}`;
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
  // Unicode-safe tokenization so macronized words are handled correctly.
  const tokens = sentence.match(/[\p{L}\p{M}]+|[^\p{L}\p{M}\s]+|\s+/gu) || [sentence];
  return tokens.map((tk) => {
    if (/^\s+$/u.test(tk) || /^[^\p{L}\p{M}]+$/u.test(tk)) return escapeHtml(tk);

    const raw = tk.toLowerCase();
    const keyA = raw;
    const keyB = stripMacrons(raw);

    const gloss = unseenLexicon[keyA] || unseenLexicon[keyB];
    const title = gloss || `No gloss yet for: ${keyB}`;

    // Always provide a title so hover works consistently
    const cls = gloss ? 'latin-word known' : 'latin-word';
    return `<span class="${cls}" title="${escapeHtml(title)}">${escapeHtml(tk)}</span>`;
  }).join('');
}

function setVerbModeUI() {
  const mode = byId('v-mode')?.value || 'parse';
  const parse = byId('v-parse-ui');
  const trans = byId('v-translate-ui');
  const desc = byId('v-desc');
  const revealBtn = byId('verb-reveal');

  if (mode === 'translate') {
    if (desc) desc.textContent = 'Translate the inflected Latin verb into natural English.';
    if (parse) parse.style.display = 'none';
    if (trans) trans.style.display = 'block';
    if (revealBtn) revealBtn.style.display = 'inline-block';
  } else {
    if (desc) desc.textContent = 'Identify person, number, tense, mood, and voice.';
    if (parse) parse.style.display = 'block';
    if (trans) trans.style.display = 'none';
    if (revealBtn) revealBtn.style.display = 'none';
  }

  // keep lemma hidden by default (user asked for "just verb")
  const lemmaRow = byId('v-lemma-row');
  if (lemmaRow) lemmaRow.style.display = 'none';
}

const EN_LEMMA = {
  amo: { base: 'love', past: 'loved', pastPart: 'loved', ing: 'loving' },
  duco: { base: 'lead', past: 'led', pastPart: 'led', ing: 'leading' },
  video: { base: 'see', past: 'saw', pastPart: 'seen', ing: 'seeing' },
  sum: { base: 'be', past: 'was', pastPart: 'been', ing: 'being' }
};

function verbPronoun(v) {
  const key = `${v.person} ${v.number}`;
  const text = {
    '1st singular': 'I',
    '2nd singular': 'you',
    '3rd singular': 'he',
    '1st plural': 'we',
    '2nd plural': 'you',
    '3rd plural': 'they'
  }[key] || '';
  const isPlural = v.number === 'plural' || v.person === '2nd' && v.number === 'plural';
  const is3Sg = v.person === '3rd' && v.number === 'singular';
  return { key, text, isPlural, is3Sg };
}

function enBePresent({ is3Sg, key }) {
  if (key === '1st singular') return 'am';
  if (is3Sg) return 'is';
  return 'are';
}

function enBePast({ is3Sg, key }) {
  if (key === '1st singular' || is3Sg) return 'was';
  return 'were';
}

function enHavePresent({ is3Sg }) {
  return is3Sg ? 'has' : 'have';
}

function thirdPersonS(base) {
  if (!base) return base;
  if (/(s|x|z|ch|sh|o)$/.test(base)) return base + 'es';
  if (/[^aeiou]y$/.test(base)) return base.slice(0, -1) + 'ies';
  return base + 's';
}

function verbToEnglish(v) {
  const pro = verbPronoun(v);
  const lex = EN_LEMMA[v.lemma] || { base: v.meaning || v.lemma || '' };

  // sum: handle cleanly
  if (v.lemma === 'sum') {
    if (v.mood === 'subjunctive') {
      return `${pro.text} ${v.tense === 'imperfect' ? 'might be' : 'may be'}`.trim();
    }

    const map = {
      present: `${pro.text} ${enBePresent(pro)}`,
      imperfect: `${pro.text} ${enBePast(pro)}`,
      future: `${pro.text} will be`,
      perfect: `${pro.text} ${enHavePresent(pro)} been`,
      pluperfect: `${pro.text} had been`,
      'future perfect': `${pro.text} will have been`
    };
    return (map[v.tense] || `${pro.text} ${enBePresent(pro)}`).trim();
  }

  const base = lex.base;
  const past = lex.past || (base ? base + 'ed' : base);
  const pastPart = lex.pastPart || past;
  const ing = lex.ing || (base ? base + 'ing' : base);

  // subjunctive: keep it simple and natural
  if (v.mood === 'subjunctive') {
    if (v.voice === 'passive') {
      return `${pro.text} ${v.tense === 'imperfect' ? 'might be' : 'may be'} ${pastPart}`.trim();
    }
    return `${pro.text} ${v.tense === 'imperfect' ? 'might' : 'may'} ${base}`.trim();
  }

  // indicative
  if (v.voice === 'active') {
    const map = {
      present: `${pro.text} ${pro.is3Sg ? thirdPersonS(base) : base}`,
      imperfect: `${pro.text} ${enBePast(pro)} ${ing}`,
      future: `${pro.text} will ${base}`,
      perfect: `${pro.text} ${past}`,
      pluperfect: `${pro.text} had ${pastPart}`,
      'future perfect': `${pro.text} will have ${pastPart}`
    };
    return (map[v.tense] || `${pro.text} ${base}`).trim();
  }

  // passive
  const map = {
    present: `${pro.text} ${enBePresent(pro)} ${pastPart}`,
    imperfect: `${pro.text} ${enBePast(pro)} being ${pastPart}`,
    future: `${pro.text} will be ${pastPart}`,
    perfect: `${pro.text} ${enHavePresent(pro)} been ${pastPart}`,
    pluperfect: `${pro.text} had been ${pastPart}`,
    'future perfect': `${pro.text} will have been ${pastPart}`
  };
  return (map[v.tense] || `${pro.text} ${enBePresent(pro)} ${pastPart}`).trim();
}

function verbEnglishAlternatives(v) {
  const pro = verbPronoun(v);
  const lex = EN_LEMMA[v.lemma] || { base: v.meaning || v.lemma || '' };

  const expected = verbToEnglish(v);
  const out = [expected];

  // allow dropping the pronoun (common in answers)
  if (expected.toLowerCase().startsWith((pro.text + ' ').toLowerCase())) {
    out.push(expected.slice(pro.text.length).trim());
  }

  // allow he/she/it swaps for 3rd singular
  if (pro.key === '3rd singular') {
    const tail = expected.toLowerCase().startsWith('he ') ? expected.slice(3) : null;
    if (tail) {
      out.push(`she ${tail}`);
      out.push(`it ${tail}`);
      out.push(tail.trim());
    }
  }

  // allow present-perfect reading for Latin perfect (esp. common learner expectation)
  if (v.mood === 'indicative' && v.voice === 'active' && v.tense === 'perfect' && v.lemma !== 'sum') {
    const pastPart = lex.pastPart || (lex.past || (lex.base ? lex.base + 'ed' : ''));
    const alt = `${pro.text} ${enHavePresent(pro)} ${pastPart}`.trim();
    out.push(alt);
    out.push(alt.slice(pro.text.length).trim());
  }

  // allow "used to" for imperfect
  if (v.mood === 'indicative' && v.voice === 'active' && v.tense === 'imperfect' && lex.base) {
    const alt = `${pro.text} used to ${lex.base}`.trim();
    out.push(alt);
    out.push(alt.slice(pro.text.length).trim());
  }

  return Array.from(new Set(out.filter(Boolean)));
}

function normalizeEnglish(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s/()-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function nextVerb() {
  currentVerb = pick(verbForms);
  byId('verb-form').textContent = currentVerb.form;
  byId('verb-lemma').textContent = currentVerb.lemma;
  ['v-person', 'v-number', 'v-tense', 'v-mood', 'v-voice'].forEach((id) => {
    const el = byId(id);
    if (el) el.value = '';
  });
  if (byId('v-en')) byId('v-en').value = '';
  setFeedback('verb-feedback', '');
  setVerbModeUI();
}

function revealVerb() {
  if (!currentVerb) return;
  const ans = verbToEnglish(currentVerb);
  setFeedback('verb-feedback', `Answer: ${ans} (${currentVerb.lemma})`, true);
}

function checkVerb() {
  const mode = byId('v-mode')?.value || 'parse';

  if (mode === 'translate') {
    const expectedList = verbEnglishAlternatives(currentVerb);
    const expectedNorm = expectedList.map((s) => normalizeEnglish(s));
    const user = normalizeEnglish(byId('v-en')?.value || '');

    score.verb.total++;
    if (user && expectedNorm.includes(user)) {
      score.verb.ok++; score.verb.streak++;
      setFeedback('verb-feedback', '✅ Correct.', true);
    } else {
      score.verb.streak = 0;
      const shown = expectedList.slice(0, 3).join(' / ');
      setFeedback('verb-feedback', `❌ Key: ${shown} (${currentVerb.lemma}).`, false);
    }
    updateScore('verb');
    return;
  }

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
    <tbody>${CASES.map((c) => `<tr><th class="rowhead">${c}</th>${COLS.map((col) => `<td class="cell"><input data-case="${c}" data-col="${col}" /><span class="cell-mark" aria-hidden="true"></span></td>`).join('')}</tr>`).join('')}</tbody>`;
}

function loadPronoun() {
  currentPronoun = pronounParadigms[Number(byId('pro-pronoun').value) || 0];
  document.querySelectorAll('#pronoun-table input').forEach((i) => { i.value = ''; i.classList.remove('ok', 'bad'); });
  document.querySelectorAll('#pronoun-table .cell-mark').forEach((m) => { m.textContent = ''; m.classList.remove('ok', 'bad'); });
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

    inp.classList.remove('ok', 'bad');
    inp.classList.add(good ? 'ok' : 'bad');

    const mark = inp.parentElement?.querySelector('.cell-mark');
    if (mark) {
      mark.textContent = good ? '✓' : '✗';
      mark.classList.remove('ok', 'bad');
      mark.classList.add(good ? 'ok' : 'bad');
    }

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
    <tbody>${CASES.map((c) => `<tr><th class="rowhead">${c}</th><td class="cell"><input data-case="${c}" data-num="0" /><span class="cell-mark" aria-hidden="true"></span></td><td class="cell"><input data-case="${c}" data-num="1" /><span class="cell-mark" aria-hidden="true"></span></td></tr>`).join('')}</tbody>`;
}

function nextNoun() {
  currentNoun = pick(nounParadigms);
  byId('noun-lemma').textContent = currentNoun.lemma;
  byId('noun-meta').textContent = `(${currentNoun.decl})`;
  document.querySelectorAll('#noun-table input').forEach((i) => { i.value = ''; i.classList.remove('ok', 'bad'); });
  document.querySelectorAll('#noun-table .cell-mark').forEach((m) => { m.textContent = ''; m.classList.remove('ok', 'bad'); });
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

    inp.classList.remove('ok', 'bad');
    inp.classList.add(good ? 'ok' : 'bad');

    const mark = inp.parentElement?.querySelector('.cell-mark');
    if (mark) {
      mark.textContent = good ? '✓' : '✗';
      mark.classList.remove('ok', 'bad');
      mark.classList.add(good ? 'ok' : 'bad');
    }

    if (showAnswers && !good) inp.value = expected;
  });
  if (!showAnswers) {
    score.noun.total++;
    if (correct === total) { score.noun.ok++; score.noun.streak++; } else score.noun.streak = 0;
    updateScore('noun');
  }
  setFeedback('noun-feedback', correct === total ? '✅ Full grid correct.' : `❌ ${correct}/${total} correct.`, correct === total);
}

const unseenSentences = [
  // Easy
  { level: 'easy', latin: 'Puella rosam portat.', english: 'The girl carries a rose.' },
  { level: 'easy', latin: 'Servus aquam in villam portat.', english: 'The slave carries water into the house.' },
  { level: 'easy', latin: 'Nauta mare videt.', english: 'The sailor sees the sea.' },
  { level: 'easy', latin: 'Magistra pueros laudat.', english: 'The teacher praises the boys.' },

  // Medium
  { level: 'medium', latin: 'Postquam epistulam legit, mercator statim discessit.', english: 'After he read the letter, the merchant left at once.' },
  { level: 'medium', latin: 'Senator, quamquam fessus erat, in curiam venit.', english: 'The senator, although he was tired, came into the senate-house.' },
  { level: 'medium', latin: 'Milites pontem defendunt ne hostes transeant.', english: 'The soldiers defend the bridge so that the enemies do not cross.' },
  { level: 'medium', latin: 'Cum amici adsint, nōs laeti sumus.', english: 'When friends are present, we are happy.' },

  // Hard
  { level: 'hard', latin: 'Cum hostes appropinquarent, dux milites celeriter ad portas duxit.', english: 'When the enemies were approaching, the leader quickly led the soldiers to the gates.' },
  { level: 'hard', latin: 'Senator nuntiavit urbem a militibus defendi.', english: 'The senator announced that the city was being defended by the soldiers.' },
  { level: 'hard', latin: 'Quī hoc audīvit, statim intellexit sē in perīculō esse.', english: 'When he heard this, he immediately understood that he was in danger.' },
  { level: 'hard', latin: 'Puer, librō apertō, verba magistrae diligenter scrīpsit.', english: 'With his book open, the boy carefully wrote down the teacher’s words.' },

  // Very hard
  { level: 'very-hard', latin: 'Cum haec dīxisset, rēx imperāvit ut legātī ad Rōmam mitterentur.', english: 'When he had said these things, the king ordered that envoys be sent to Rome.' },
  { level: 'very-hard', latin: 'Nōn dubitō quīn hostēs, sī tempus habeant, pontem expugnent.', english: 'I do not doubt that the enemies, if they have time, will storm the bridge.' },
  { level: 'very-hard', latin: 'Dum cīvēs in forō clamant, miles cōnsilium capit quō urbem servet.', english: 'While the citizens shout in the forum, the soldier forms a plan by which he may save the city.' },
  { level: 'very-hard', latin: 'Mīlitēs, quō facilius vincerent, nocte clam ex castrīs ēgressī sunt.', english: 'In order to win more easily, the soldiers secretly went out from the camp at night.' }
];

function renderUnseenLatin() {
  if (!currentUnseen) return;
  const el = byId('unseen-latin');
  const glossOn = !!byId('u-gloss')?.checked;
  if (glossOn) el.innerHTML = renderGlossedLatin(currentUnseen.latin);
  else el.textContent = currentUnseen.latin;
}

function nextUnseen() {
  const level = byId('u-level')?.value || 'hard';
  const pool = unseenSentences.filter((s) => s.level === level);
  currentUnseen = pick(pool.length ? pool : unseenSentences);

  renderUnseenLatin();

  const eng = byId('unseen-english');
  eng.textContent = '(hidden)';
  eng.classList.add('hidden');

  const inp = byId('unseen-input');
  if (inp) inp.value = '';

  setFeedback('unseen-feedback', '');
  byId('unseen-input')?.focus();
}

function revealUnseen() {
  if (!currentUnseen) return;
  const eng = byId('unseen-english');
  eng.textContent = currentUnseen.english;
  eng.classList.remove('hidden');
}

function normalizeUnseenEnglish(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(the|a|an)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordSet(s) {
  const out = new Set();
  normalizeUnseenEnglish(s).split(' ').filter(Boolean).forEach((w) => out.add(w));
  return out;
}

function jaccard(a, b) {
  const A = wordSet(a);
  const B = wordSet(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  A.forEach((w) => { if (B.has(w)) inter++; });
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}

function checkUnseen() {
  if (!currentUnseen) return;
  const user = byId('unseen-input')?.value || '';
  const expected = currentUnseen.english;

  const nu = normalizeUnseenEnglish(user);
  const ne = normalizeUnseenEnglish(expected);

  const sim = nu && ne ? jaccard(nu, ne) : 0;
  const exact = nu && nu === ne;
  const ok = exact || sim >= 0.62;

  if (ok) {
    setFeedback('unseen-feedback', `✅ Close enough. Similarity: ${Math.round(sim * 100)}%.`, true);
  } else {
    setFeedback('unseen-feedback', `❌ Not quite. Similarity: ${Math.round(sim * 100)}%. Key: ${expected}`, false);
    revealUnseen();
  }
}

// -------------------------------
// Macron Learn
// -------------------------------

function macronModelFromLatin(latinWithMacrons) {
  const chars = latinWithMacrons.split('');
  return chars.map((ch) => {
    const base = stripMacrons(ch);
    const vowel = isVowel(base);
    const longExpected = vowel && stripMacrons(ch) !== ch; // macron present
    return { base, vowel, longExpected };
  });
}

function renderMacronWorkbench() {
  const host = byId('macron-workbench');
  if (!host || !currentMacron || !currentMacronState) return;

  const model = currentMacron.model;

  const spelled = model.map((m, i) => {
    const longNow = currentMacronState.long[i];
    return m.vowel && longNow ? addMacron(m.base) : m.base;
  }).join('');
  const cur = byId('m-current');
  if (cur) cur.textContent = spelled;

  let html = '<div class="macron-row">';
  model.forEach((m, i) => {
    const isV = m.vowel;
    const longNow = currentMacronState.long[i];
    const disp = isV && longNow ? addMacron(m.base) : m.base;

    const mark = lastMacronCheck?.[i];
    const checkCls = mark === true ? 'ok' : mark === false ? 'bad' : '';

    if (!isV) {
      html += `<span class="macron-char">${escapeHtml(disp)}</span>`;
    } else {
      const onCls = longNow ? 'on' : '';
      html += `<button class="macron-char vowel ${onCls} ${checkCls}" data-i="${i}" type="button">${escapeHtml(disp)}</button>`;
    }
  });
  html += '</div>';

  host.innerHTML = html;
  host.querySelectorAll('button.macron-char.vowel').forEach((b) => {
    b.addEventListener('click', () => {
      const i = Number(b.dataset.i);
      currentMacronState.long[i] = !currentMacronState.long[i];
      // changing input clears old check marks
      lastMacronCheck = null;
      renderMacronWorkbench();
    });
  });
}

function nextMacron() {
  const item = pick(macronItems);
  const model = macronModelFromLatin(item.latin);
  const plain = stripMacrons(item.latin);

  currentMacron = { ...item, model, plain };
  currentMacronState = {
    long: model.map(() => false)
  };
  lastMacronCheck = null;

  byId('m-english').textContent = item.english;
  byId('m-plain').textContent = plain;
  setFeedback('m-feedback', '');
  renderMacronWorkbench();
}

function checkMacron(showAnswers = false) {
  if (!currentMacron || !currentMacronState) return;

  const expected = currentMacron.model.map((m) => (m.vowel ? m.longExpected : null));
  const marks = currentMacron.model.map((m, i) => {
    if (!m.vowel) return null;
    return currentMacronState.long[i] === m.longExpected;
  });

  lastMacronCheck = marks;
  renderMacronWorkbench();

  const vowelCount = expected.filter((x) => x !== null).length;
  const correct = marks.filter((x) => x === true).length;
  const perfect = correct === vowelCount;

  if (showAnswers) {
    // Set state to correct answer
    currentMacronState.long = currentMacron.model.map((m) => (m.vowel ? m.longExpected : false));
    lastMacronCheck = null;
    renderMacronWorkbench();
    setFeedback('m-feedback', `Answer: ${currentMacron.latin}`, true);
    return;
  }

  score.macron.total++;
  if (perfect) {
    score.macron.ok++;
    score.macron.streak++;
    setFeedback('m-feedback', '✅ Perfect.', true);
  } else {
    score.macron.streak = 0;
    setFeedback('m-feedback', `❌ ${correct}/${vowelCount} vowels right. Answer: ${currentMacron.latin}`, false);
  }
  updateScore('macron');
}

// -------------------------------
// Vocab Learn (simple mastery system)
// - Wrong → goes into Review
// - Right → goes into Mastered (won’t appear again)
// -------------------------------

const VB_STORE_KEY = 'latinPractice.vocabState.v2.mastery';

function nowMs() { return Date.now(); }

function loadVocabState() {
  try {
    const raw = localStorage.getItem(VB_STORE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveVocabState(state) {
  try { localStorage.setItem(VB_STORE_KEY, JSON.stringify(state)); } catch {}
}

let vocabState = typeof localStorage !== 'undefined' ? loadVocabState() : {};
let vocabReviewQueue = [];

function vbGet(cardId) {
  return vocabState[cardId] || null;
}

function vbEnsure(cardId) {
  const existing = vocabState[cardId];
  if (existing && existing.status) return existing;

  // migrate old v1 SRS objects (best-effort)
  if (existing && typeof existing === 'object') {
    const migrated = {
      status: existing.intervalDays >= 21 ? 'mastered' : (existing.reps > 0 ? 'review' : 'new'),
      right: existing.reps || 0,
      wrong: existing.lapses || 0,
      last: existing.last || null
    };
    vocabState[cardId] = migrated;
    saveVocabState(vocabState);
    return migrated;
  }

  vocabState[cardId] = { status: 'new', right: 0, wrong: 0, last: null };
  saveVocabState(vocabState);
  return vocabState[cardId];
}

function vbStatus(cardId) {
  return vbEnsure(cardId).status;
}

function vbStats() {
  const st = { due: 0, new: 0, mastered: 0 };

  vocabDeck.forEach((c) => {
    const s = vbStatus(c.id);
    if (s === 'new') st.new++;
    else if (s === 'review') st.due++;
    else if (s === 'mastered') st.mastered++;
  });

  return st;
}

function renderVbStats() {
  const st = vbStats();
  const a = byId('vb-stat-due');
  const b = byId('vb-stat-new');
  const c = byId('vb-stat-mastered');
  if (a) a.textContent = `Review: ${st.due}`;
  if (b) b.textContent = `New: ${st.new}`;
  if (c) c.textContent = `Mastered: ${st.mastered}`;
}

function vbMark(cardId, ok, { toReview = false } = {}) {
  const s = vbEnsure(cardId);
  s.last = nowMs();

  if (ok) {
    s.right = (s.right || 0) + 1;
    s.status = 'mastered';
  } else {
    s.wrong = (s.wrong || 0) + 1;
    if (toReview) {
      s.status = 'review';
      vocabReviewQueue.push(cardId);
    } else {
      // Keep as new unless user explicitly moves it to review.
      s.status = 'new';
    }
  }

  vocabState[cardId] = s;
  saveVocabState(vocabState);
  renderVbStats();
}

function resetVocab() {
  if (!confirm('Reset all vocab progress?')) return;
  vocabState = {};
  vocabReviewQueue = [];
  try { localStorage.removeItem(VB_STORE_KEY); } catch {}

  score.vocab = { ok: 0, total: 0, streak: 0 };
  updateScore('vocab');
  renderVbStats();
  nextVocab();
  setFeedback('vb-feedback', 'Progress reset.', true);
}

function moveCurrentVocabToReview() {
  if (!currentVocab) return;
  vbMark(currentVocab.card.id, false, { toReview: true });
  setFeedback('vb-feedback', 'Moved to REVIEW.', true);
  revealVocab();
}

function normalizeText(s, { ignoreMacrons = true } = {}) {
  let t = (s || '').trim().toLowerCase();
  if (ignoreMacrons) t = stripMacrons(t);
  t = t.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  t = t.replace(/[^a-z0-9\s-]/g, '');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

function formatAnswerList(arr) {
  return (arr || []).join(' / ');
}

function pickVocabDirection() {
  const mode = byId('vb-mode')?.value || 'la-en';
  return mode === 'mixed' ? (Math.random() < 0.5 ? 'la-en' : 'en-la') : mode;
}

function expectedVocabAnswers({ card, dir }) {
  if (dir === 'la-en') return card.en;
  const out = [card.la].concat(card.laAlt || []);
  return out;
}

function vbPromptText({ card, dir }) {
  return dir === 'la-en' ? `${card.la}` : `${card.en[0]}`;
}

function vbReviewCards() {
  return vocabDeck.filter((c) => vbStatus(c.id) === 'review');
}

function vbNewCards() {
  return vocabDeck.filter((c) => vbStatus(c.id) === 'new');
}

function vbActiveCards() {
  return vocabDeck.filter((c) => vbStatus(c.id) !== 'mastered');
}

function pickVocabCard() {
  const session = byId('vb-session')?.value || 'review';

  const review = vbReviewCards();
  const fresh = vbNewCards();
  let pool = [];

  if (session === 'review') pool = review;
  else if (session === 'learn') pool = fresh;
  else pool = review.concat(fresh);

  if (!pool.length) pool = vbActiveCards();

  // If we have a queued wrong answer, prefer it (only when review/mix)
  if ((session === 'review' || session === 'all') && vocabReviewQueue.length) {
    const nextId = vocabReviewQueue.shift();
    const card = vocabDeck.find((c) => c.id === nextId);
    if (card && vbStatus(card.id) !== 'mastered') {
      return { card, dir: pickVocabDirection() };
    }
  }

  const card = pick(pool);
  const dir = pickVocabDirection();
  return { card, dir };
}

// (Flashcard/self-grade UI removed — keeping vocab as a clean typing trainer.)

function renderVocabPrompt() {
  if (!currentVocab) return;

  renderVbStats();

  const { card, dir } = currentVocab;
  byId('vb-prompt').textContent = vbPromptText({ card, dir });

  const ansEl = byId('vb-answer');
  ansEl.textContent = '(hidden)';
  ansEl.classList.add('hidden');

  byId('vb-meta').textContent = `Card: ${card.id} · Tags: ${(card.tags || []).join(', ') || '—'} · Status: ${vbStatus(card.id)}`;

  if (byId('vb-input')) byId('vb-input').value = '';
  setFeedback('vb-feedback', '');

  byId('vb-input')?.focus();
}

function nextVocab() {
  currentVocab = pickVocabCard();
  renderVocabPrompt();
}

function revealVocab() {
  if (!currentVocab) return;
  const ansEl = byId('vb-answer');
  const expected = expectedVocabAnswers(currentVocab);
  ansEl.textContent = formatAnswerList(expected);
  ansEl.classList.remove('hidden');

}

// (Old vbSchedule removed — vocab now uses a mastery model.)

function checkVocab() {
  if (!currentVocab) return;

  const ignoreMacrons = !!byId('vb-ignore-macrons')?.checked;
  const user = normalizeText(byId('vb-input')?.value || '', { ignoreMacrons });
  const expectedRaw = expectedVocabAnswers(currentVocab);
  const expected = expectedRaw.map((x) => normalizeText(x, { ignoreMacrons }));

  score.vocab.total++;

  const ok = user.length && expected.includes(user);
  if (ok) {
    score.vocab.ok++;
    score.vocab.streak++;
    setFeedback('vb-feedback', '✅ Correct. Marked MASTERED (won’t appear again).', true);
    vbMark(currentVocab.card.id, true);
  } else {
    score.vocab.streak = 0;
    setFeedback('vb-feedback', `❌ Correct answer: ${formatAnswerList(expectedRaw)}. Use “Move to Review” if you want it in review.`, false);
    vbMark(currentVocab.card.id, false, { toReview: false });
  }

  // If user is drilling NEW words, auto-switch to ALL after each check.
  const ses = byId('vb-session');
  if (ses && ses.value === 'learn') ses.value = 'all';

  updateScore('vocab');
  revealVocab();
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
    const qtyCls = q === 'L' ? 'long' : q === 'S' ? 'short' : '';
    const mark = lastHexCheck?.qty?.[i];
    const checkCls = mark === true ? 'ok' : mark === false ? 'bad' : '';
    const markChar = mark === true ? '✓' : mark === false ? '✗' : '';

    html += `<button class="syll-btn ${qtyCls} ${checkCls}" data-act="qty" data-i="${i}">${syll}<br><small>${qSymbol(q)}</small><span class="syll-mark ${checkCls}">${markChar}</span></button>`;

    if (i < displaySyllables.length - 1) {
      const bOn = currentHexState.breaks[i] ? 'active' : '';
      const cOn = currentHexState.caesura === i ? 'active' : '';

      const bMark = lastHexCheck?.break?.[i];
      const bCls = bMark === true ? 'ok' : bMark === false ? 'bad' : '';

      const cMark = lastHexCheck?.caesura?.[i];
      const cCls = cMark === true ? 'ok' : cMark === false ? 'bad' : '';

      html += `<span class="mark-group">
        <button class="mark-btn ${bOn} ${bCls}" data-act="break" data-i="${i}" title="Foot break">|</button>
        <button class="mark-btn ${cOn} ${cCls}" data-act="caesura" data-i="${i}" title="Caesura">‖</button>
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
  lastHexCheck = null;
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

function checkHex() {
  // Per-syllable quantity marks
  const qtyMarks = currentHex.quantities.map((q, i) => currentHexState.quantities[i] === q);
  const qtyOk = qtyMarks.filter(Boolean).length;

  // Breaks: accept any valid pattern; for marking, compare against the first valid pattern
  const validBreakPatterns = computeValidHexBreakPatterns(currentHex.quantities);
  const expectedBreaks = validBreakPatterns[0] || currentHex.breaks || [];

  const userBreakPositions = currentHexState.breaks
    .map((v, i) => (v ? i : -1))
    .filter((i) => i >= 0);
  const userBreakCount = userBreakPositions.length;

  const breaksExact = validBreakPatterns.some((pat) => pat.join(',') === userBreakPositions.join(','));

  const breakMarks = currentHexState.breaks.map((v, i) => {
    const expected = expectedBreaks.includes(i);
    return v === expected;
  });

  const caesuraOk = currentHexState.caesura === currentHex.caesura;

  // Save marks for UI render (check mode only)
  lastHexCheck = {
    qty: qtyMarks,
    break: breakMarks,
    caesura: currentHexState.breaks.map((_, i) => {
      if (currentHexState.caesura === null) return null;
      if (i !== currentHexState.caesura) return null;
      return currentHexState.caesura === currentHex.caesura;
    })
  };
  renderHexWorkbench();

  const caesuraInReasonablePlace = currentHexState.caesura !== null && currentHexState.caesura >= 4 && currentHexState.caesura <= currentHex.quantities.length - 4;

  const total = currentHex.quantities.length + 2;
  const got = qtyOk + (breaksExact ? 1 : 0) + (caesuraInReasonablePlace ? 1 : 0);
  const perfect = qtyOk === currentHex.quantities.length && breaksExact && caesuraOk && userBreakCount === 5;

  let msg = perfect
    ? '✅ Excellent: quantities, 6-foot division, and caesura all match.'
    : `❌ ${got}/${total} checks right.`;

  if (userBreakCount !== 5) {
    msg += ` You placed ${userBreakCount} foot breaks; hexameter needs exactly 5 breaks for 6 feet.`;
  } else if (!breaksExact) {
    msg += ' Foot divisions are not matching a valid pattern for this line.';
  }

  if (currentHexState.caesura === null) {
    msg += ' Place one caesura (‖).';
  } else if (!caesuraInReasonablePlace) {
    msg += ' Caesura should be in the middle of the line.';
  } else if (!caesuraOk) {
    msg += ' Caesura position differs from the key for this line.';
  }

  setFeedback('hex-feedback', msg, perfect);

  if (!perfect) {
    const useMacron = byId('hex-macron-toggle')?.checked;
    const displaySyllables = useMacron ? (currentHex.syllablesMacron || currentHex.syllables) : currentHex.syllables;
    const qtyText = displaySyllables
      .map((s, i) => `${s}(${currentHex.quantities[i] === 'L' ? '—' : '∪'})`)
      .join(' ');
    const breaksText = expectedBreaks.map((i) => i + 1).join(', ');
    byId('hex-answer').textContent = `Answer → ${qtyText} · One valid break-set after syllables: ${breaksText} · Caesura after syllable ${currentHex.caesura + 1}.`;
  }
}

function showHexScansion() {
  const validBreakPatterns = computeValidHexBreakPatterns(currentHex.quantities);
  const expectedBreaks = validBreakPatterns[0] || currentHex.breaks || [];

  currentHexState.quantities = [...currentHex.quantities];
  currentHexState.breaks = Array(currentHex.syllables.length - 1).fill(false);
  expectedBreaks.forEach((i) => { if (i >= 0 && i < currentHexState.breaks.length) currentHexState.breaks[i] = true; });
  currentHexState.caesura = currentHex.caesura;

  // Show-answer mode: do not mark user correctness
  lastHexCheck = null;
  renderHexWorkbench();

  const useMacron = byId('hex-macron-toggle')?.checked;
  const displaySyllables = useMacron ? (currentHex.syllablesMacron || currentHex.syllables) : currentHex.syllables;
  const qtyText = displaySyllables
    .map((s, i) => `${s}(${currentHex.quantities[i] === 'L' ? '—' : '∪'})`)
    .join(' ');
  const breaksText = expectedBreaks.map((i) => i + 1).join(', ');

  setFeedback('hex-feedback', 'Showing the correct scansion directly on the buttons.', true);
  byId('hex-answer').textContent = `Answer → ${qtyText} · One valid break-set after syllables: ${breaksText} · Caesura after syllable ${currentHex.caesura + 1}.`;
}

function init() {
  setupTabs();
  updateScore('verb');
  updateScore('pronoun');
  updateScore('noun');
  updateScore('macron');
  updateScore('vocab');

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

  byId('unseen-next').addEventListener('click', nextUnseen);
  byId('unseen-check').addEventListener('click', checkUnseen);
  byId('unseen-reveal').addEventListener('click', revealUnseen);
  byId('u-level').addEventListener('change', nextUnseen);
  byId('u-gloss').addEventListener('change', renderUnseenLatin);
  byId('unseen-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') checkUnseen(); });

  // Macron Learn
  byId('m-check').addEventListener('click', () => checkMacron(false));
  byId('m-show').addEventListener('click', () => checkMacron(true));
  byId('m-next').addEventListener('click', nextMacron);

  // Verbs mode toggle
  byId('v-mode').addEventListener('change', () => {
    setVerbModeUI();
    setFeedback('verb-feedback', '');
    if (byId('v-mode')?.value === 'translate') byId('v-en')?.focus();
  });
  byId('verb-reveal').addEventListener('click', revealVerb);
  byId('v-en').addEventListener('keydown', (e) => { if (e.key === 'Enter') checkVerb(); });

  // Vocab Learn
  byId('vb-check').addEventListener('click', checkVocab);
  byId('vb-reveal').addEventListener('click', revealVocab);
  byId('vb-next').addEventListener('click', nextVocab);
  byId('vb-mark-review').addEventListener('click', moveCurrentVocabToReview);
  byId('vb-reset').addEventListener('click', resetVocab);
  byId('vb-mode').addEventListener('change', nextVocab);
  byId('vb-session').addEventListener('change', nextVocab);
  byId('vb-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkVocab();
  });

  // Hexameter
  byId('hex-check').addEventListener('click', checkHex);
  byId('hex-show').addEventListener('click', showHexScansion);
  byId('hex-reset').addEventListener('click', resetHexMarkup);
  byId('hex-next').addEventListener('click', nextHexLine);
  byId('hex-macron-toggle').addEventListener('change', () => {
    updateHexLineDisplay();
    renderHexWorkbench();
  });

  nextVerb();
  loadPronoun();
  nextNoun();
  nextUnseen();
  nextMacron();
  nextVocab();
  nextHexLine();
}

document.addEventListener('DOMContentLoaded', init);
