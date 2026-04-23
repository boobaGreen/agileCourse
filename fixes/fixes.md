# Git Course Review - Feedback & Fixes

## General Feedback & UI/UX

- [x] **Chapter Navigation**: Quando si cambia capitolo la vista rimane a fondo pagina, sarebbe bello ripartisse dall'alto.
- [x] **Quiz Pitfalls**: Nei quiz la risposta più lunga é generalmente quella corretta (95% delle volte), questo é un pitfall delle risposte generate dall AI.
- [x] **Interactive Sessions (NICE TO HAVE)**: Nelle sessioni interattive con comandi premere il tasto ⬆️ UP portasse all'autocompletamento del comando precedente.

## Bug Report & Detailed Issues

### 1. Command Parser - Quotes Handling

- [x] **Issue**: Quote/double quotes spaiate non generano errori nel terminale. Esempio: `git commit -m 'init"` (l'uso di virgolette miste o non chiuse non viene rilevato come errore).

### 2. Module 5 - Game Logic

- [ ] **Issue**: Nel modulo 5 il simulatore non riconosce comandi base di rete.
- **Dettagli**: Comandi come `git pull`, `git pull origin main`, `git fetch` restituiscono l'errore: `git: 'command' is not a git command or not supported in this simulator`.

### 3. Terminology Review

- [x] **Issue**: Minor: qui "feature flag" é un abuso di terminologia o mi sbaglio?
- **Location**: Git Modulo 11, Domanda 7 ("Which workflow uses feature flags for continuous deployment?")

---

## Verifica Manuale (User Check)

*Queste voci rappresentano i fix effettuati da Antigravity che richiedono una verifica manuale da parte dell'utente.*

- [ ] **Scroll to Top**: Verifica che al cambio modulo o inizio quiz la pagina torni in cima.
- [ ] **Quiz Balance**: Verifica che nei moduli Git, Docker e K8s le risposte corrette non siano sistematicamente le più lunghe.
- [ ] **Terminal History (UP Arrow)**: Verifica che nel simulatore il tasto ⬆️ funzioni correttamente.
- [ ] **Quote Parser**: Verifica che `git commit -m 'init"` (o simili errori di virgolette) restituisca errore nel simulatore.
- [ ] **Terminologia (Feature Flags)**: Verifica la nuova formulazione della domanda 7 nel Modulo 11.
- [ ] **Spiegazione SVN**: Verifica che la differenza tra sistemi centralizzati (SVN) e distribuiti nel Modulo 1 sia ora più chiara.

---

_Based on review feedback from 2026-04-23_
