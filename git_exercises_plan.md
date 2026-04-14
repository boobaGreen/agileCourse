# Piano di Implementazione Esercizi Git Interattivi 🎮

Questo documento descrive come integrare esercizi in stile *Learn Git Branching* utilizzando e, in minima parte, estendendo l'infrastruttura di mini-giochi già presente nella piattaforma (React/Vite).

## Approccio Scelto: "Learn Git Branching" Lite + "Oh My Git" Checklist

L'idea principale è mantenere l'interfaccia **web-native** e **terminal-driven** di Learn Git Branching, ma aggiungere la **Task List visuale interattiva** in stile Oh My Git!.

---

## FASE 1: I Quick Wins (Pronto all'Uso) ⚡
Possiamo inserire subito 3 esercizi pratici usando i componenti ESISTENTI, senza scrivere un rigo di codice React, solo modificando i file dati `app/src/data/git/modules/git-*.ts`.

### 1. Terminale Interattivo: Crea e Metti in Stash
**File**: `git-8.ts`
**Tipo**: `terminal-sim`
**Come funziona**: Usa il simulatore già testato su Docker.
**Aggiunta in `sections`**:
```typescript
{
  type: 'game',
  title: 'Terminal: The Safety Net (Stash & Checkout)',
  content: 'Sei sul branch "main", ma hai modificato dei file sporchi. Devi spostarti su "hotfix" per un\'emergenza. Usa lo stash!',
  gameType: 'terminal-sim',
  gameData: {
    startText: 'user@agile:~/project$ ',
    steps: [
      {
        instruction: '1. Verifica lo stato dei tuoi file.',
        expectedCommand: 'git status',
        output: 'On branch main\nChanges not staged for commit:\n  modified:   index.html'
      },
      {
        instruction: '2. Salva il tuo lavoro in sospeso in modo sicuro senza fare commit.',
        expectedCommand: 'git stash',
        output: 'Saved working directory and index state WIP on main: a1b2c3d initial commit'
      },
      {
        instruction: '3. Ora che il workspace è pulito, spostati sul branch "hotfix" (esistente).',
        expectedCommand: 'git checkout hotfix',
        output: 'Switched to branch \'hotfix\''
      }
    ]
  }
}
```

### 2. Classifica: Merge 🔀 vs Rebase 🔄
**File**: `git-4.ts`
**Tipo**: `drag-classify`
**Come funziona**: Drag and drop degli scenari nel secchio giusto.
**Aggiunta in `sections`**:
```json
{
  "categories": [
    { "id": "merge", "label": "Use Merge" },
    { "id": "rebase", "label": "Use Rebase" }
  ],
  "items": [
    { "id": "1", "label": "Pulire la mia history locale prima di fare push", "categoryId": "rebase" },
    { "id": "2", "label": "Unire un branch condiviso su cui team lavora", "categoryId": "merge" },
    { "id": "3", "label": "Mantengo traccia del fatto che la feature era separata", "categoryId": "merge" }
  ]
}
```

---

## FASE 2: Estensione del Terminale (Checklist) 🚀

Per avere il vero feeling di gioco, possiamo fare un **piccolo upgrade al componente `TerminalSimulatorGame`** in `app/src/pages/ModulePage.tsx` (~30 righe di modifica).

### L'idea (Task List)
Invece di mostrare una singola frase di task "Fai questo...", mostriamo una checklist a lato (o sopra) del terminale, ispirata allo stile Oh My Git!.

```typescript
// Modifica in types.ts per supportare la checklist
interface TerminalGameData {
  startText: string;
  tasks: { id: string, desc: string }[]; // Lista visuale sfide
  steps: { expectedCommand: string, output: string, completesTaskId?: string }[];
}
```
**Aggiornamento UI**: 
Sopra il terminale appare un pannello "Obiettivi":
- 🔴 Crea branch 'feature'
- 🔴 Fai un commit
- 🔴 Torna su main e fai merge
Ogni volta che `currentStep` avanza e `completesTaskId` mappa a un task, l'icona 🔴 diventa un 🟢 animato.

---

## FASE 3: Il Sacro Graal — `GitSimulatorGame` ⚛️

Se vogliamo spingerci oltre e creare un VERO clone lite di *Learn Git Branching*, dobbiamo creare un modulo React interamente nuovo. 

**Perché serve codice nuovo?**
Perché il terminale attuale accetta *una singola sequenza esatta*. Un vero simulatore accetta comandi che modificano un "modello mentale" in background (generando commit grafici).

**Architettura della soluzione (Nuovo Componente `GitSimulatorGame.tsx`)**:

1. **Il Modello di Stato (State)**:
   ```typescript
   type GitGraphState = {
     commits: Map<string, { id: string, parent: string, message: string }>;
     branches: Map<string, string>; // branchName -> commitId
     HEAD: { type: 'branch' | 'commit', name: string };
   };
   ```

2. **Il Parser Terminale (Input)**:
   Interrompe la libreria di parsing di testuale per comandi mock.
   - User scrive: `git commit -m "bla"`
   - Parser logica: Crea un nuovo node ID => Appende al Graph State => Muove Pointer HEAD/Branch.

3. **Il Renderer (Output Visuale)**:
   Si usa **Framer Motion** (già presente e usato in abbondanza in `ModulePage.tsx`) per disegnare piccoli cerchi SVG che si connettono. Quando lo State cambia, un nuovo cerchio "poppa" sul layout con animazione elastica.

**Sforzo per questa Fase**: 15-25 ore.
**File coinvolti**: 
- Estensione di `types.ts`
- Creazione `app/src/components/games/GitSimulatorGame.tsx`
- Integrazione in `ModulePage.tsx`

---

## Riepilogo Piano d'Azione

Se vuoi procedere, ordina la priorità:

1. **[Esecuzione immediata]** Inserisco nei moduli esistenti le definizioni per `terminal-sim`, `drag-order` e `drag-classify` per la pratica (Fase 1)?
2. **[Medium effort]** Modifico l'attuale componente Terminale in React per aggiungere la Task List in stile game (Fase 2)?
3. **[High effort]** Implementiamo il vero motore di validazione Git a grafi (Fase 3)?