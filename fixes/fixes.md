# Git Course Review - Feedback & Fixes

**Reviewer Note:** _Ciao Claudio, ho appena finito di fare la review del corso su Git. Ottimo lavoro!_

## General Feedback & UI/UX

- [ ] **Chapter Navigation**: Quando si cambia capitolo la vista rimane a fondo pagina, sarebbe bello ripartisse dall'alto.
- [ ] **Quiz Pitfalls**: Nei quiz la risposta più lunga é generalmente quella corretta (95% delle volte), questo é un pitfall delle risposte generate dall AI.
- [ ] **Interactive Sessions (NICE TO HAVE)**: Nelle sessioni interattive con comandi premere il tasto ⬆️ UP portasse all'autocompletamento del comando precedente.

## Bug Report & Detailed Issues

### 1. Command Parser - Quotes Handling

- [ ] **Issue**: Quote/double quotes spaiate non generano errori nel terminale. Esempio: `git commit -m 'init"` (l'uso di virgolette miste o non chiuse non viene rilevato come errore).

### 2. Module 5 - Game Logic

- [ ] **Issue**: Nel modulo 5 il simulatore non riconosce comandi base di rete.
- **Dettagli**: Comandi come `git pull`, `git pull origin main`, `git fetch` restituiscono l'errore: `git: 'command' is not a git command or not supported in this simulator`.

### 3. Terminology Review

- [ ] **Issue**: Minor: qui "feature flag" é un abuso di terminologia o mi sbaglio?
- **Location**: Git Modulo 11, Domanda 7 ("Which workflow uses feature flags for continuous deployment?")

---

_Based on review feedback from 2026-04-23_
