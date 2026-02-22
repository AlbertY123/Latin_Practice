# Latin Practice Website — *Ludus Latinus*

A polished, self-contained Latin learning tool. Open `index.html` directly in your browser.

## Features

### Verbs
- **Parse mode**: Identify person, number, tense, mood, voice
- **Translate mode**: Type natural English translations (accepts variants like "we were seeing" / "we used to see")
- Smart grammar engine handles irregulars (*sum*, *duco*, *video*, *amo*) correctly

### Pronouns
- Full-grid paradigm drills (6 pronouns: *hic, ille, is, iste, qui, ipse*)
- Case order: nominative → accusative → genitive → dative → ablative

### Nouns
- Full declension grids (1st, 2nd, 3rd declensions + neuter patterns)
- Singular + plural forms

### Unseens
- **Curated Latin sentences** (not generated) across 4 difficulty levels
- Hover gloss on individual words (toggleable)
- Type your English translation → smart fuzzy-match checking
- Key revealed on request

### Macrons
- Click vowels to toggle macrons
- Real-time "Your spelling" preview
- Curated list of high-frequency words

### Vocab
- Spaced repetition (SRS) — correct answers space out, incorrect come back soon
- Session types: Review (due) / Learn (new) / All
- Direction: Latin→English / English→Latin / Mixed
- Stats: Due / New / Mastered counts
- Clean typing interface (no flashcard complexity)

### Hexameter
- Interactive scansion: click syllables for quantity (— / ∪)
- Place 5 foot breaks + caesura
- Valid pattern checking

## Run

Open `index.html` directly in a browser.

Optional local server:
```bash
python -m http.server 8080
```
Then visit `http://127.0.0.1:8080`.

## Design

Roman-inspired theme: Cinzel headings, gold/green palette, glassmorphism panels, subtle texture overlay.

## Run
Open `index.html` directly in browser.

Optional local server:
```bash
python -m http.server 8080
```
then open `http://127.0.0.1:8080`.
