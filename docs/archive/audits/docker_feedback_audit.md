# 📝 Report Prima & Dopo: Revisione Feedback Corso Docker

**Feedback fornito da**: Sergio Andres Mejia Tovar  
**Stato**: Analizzato e risolto per tutte le 9 segnalazioni.

---

### 1. 📦 Layer Cake Architecture (`docker-2.ts`)
* **Criticità**: La frase *"If you change your code but not your libraries, Docker only updates the code layer"* è vera solo se il Dockerfile installa le librerie prima di copiare il codice.
* **Prima**:
  > *"If you change your code but not your libraries, Docker only updates the code layer. This makes images incredibly fast to build and share over the network!"*
* **Dopo**:
  > *"If you change your code but not your libraries, Docker only updates the code layer (assuming an optimized Dockerfile structure where dependencies are cached first — detailed in Chapter 3!). This makes images incredibly fast to build and share over the network!"*

---

### 2. 🖼️ Quiz Images vs Containers (`docker-2.ts` Q1)
* **Criticità**: L'opzione corretta "Recipe is to Pizza" era troppo ovvia perché la metafora della pizza era stata usata poco prima nella teoria.
* **Prima**:
  > Domanda: *An Image is to a Container as a...*  
  > Opzione corretta: *Recipe is to a baked and ready-to-eat Pizza*
* **Dopo**:
  > Domanda: *Which real-world or software analogy best represents the relationship between a Docker Image and a Container?*  
  > Opzione corretta: *A Class definition (blueprint) is to an instantiated Object (running instance) in OOP*

---

### 3. 🖥️ Layout Schermata Risultati Quiz (`ModulePage.tsx`)
* **Criticità**: Su PC, la schermata dei risultati del quiz non occupava tutta la larghezza dello schermo (max-w-3xl), a differenza delle schermate Teoria e Quiz (full width).
* **Prima**: `<motion.div key="result" className="w-full max-w-3xl mx-auto">`
* **Dopo**: `<motion.div key="result" className="w-full">` (coerente con le altre viste).

---

### 4. 🧱 Analogia Torre LEGO (`docker-3.ts`)
* **Criticità**: Dire che la roba che cambia spesso va in "cima alla torre" crea confusione con le righe del Dockerfile, dove le righe in basso (fine file) rappresentano gli ultimi passaggi di build.
* **Prima**:
  > *"To make builds fast, we place bricks that change often (like source code) at the very top of the tower, and bricks that change rarely (like library installation) at the bottom."*
* **Dopo**:
  > *"To make builds fast, think of the Dockerfile flow (executed line 1 to N): place instructions that change rarely (like base image and library installs) at the **top/beginning of the file** (the foundation), and instructions that change often (like source code) at the **bottom/end of the file** (the top bricks)."*

---

### 5. 📹 Esempio Video Dockerfile vs Best Practice (`docker-3.ts`)
* **Criticità**: L'esempio di Dockerfile nel video FoodTrucks copia prima tutto e poi installa, contraddicendo la best practice spiegata nel capitolo.
* **Prima**: Nessun chiarimento sotto il blocco di codice dell'esempio video.
* **Dopo**: Aggiunta nota esplicita:
  > *💡 Note: Notice how this legacy video example copies code before installing dependencies (unoptimized). In the section below, you will see why separating these steps is crucial for fast builds!*

---

### 6. 🔤 Rendering Markdown & Backtick `` ` `` (`SectionCard.tsx`)
* **Criticità**: I backtick `` `comandi` `` non venivano renderizzati come tag `<code>` e non venivano formattati nelle tabelle e nelle card dei consigli.
* **Prima**:
  > `cleanLine.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|...)/g)`  
  > Le celle delle tabelle e il testo semplice mostravano `docker run` o `docker tag` con i caratteri backtick grezzi.
* **Dopo**:
  > Implementato parser regex esteso in `SectionCard.tsx` che supporta `` `codice` ``, `**grassetto**`, link e formattazione markdown anche per le celle di tutte le tabelle dell'applicazione!

---

### 7. 🐙 Supporto comando `docker compose` nel Simulatore (`DockerParser.ts`)
* **Criticità**: Digitando `docker compose up -d` nel terminale del simulatore, il sistema restituiva `docker: 'compose' is not a docker command`.
* **Prima**:
  > `const isCompose = parts[0] === 'docker-compose';`
* **Dopo**:
  > `const isCompose = parts[0] === 'docker-compose' || (parts[0] === 'docker' && parts[1] === 'compose');`

---

### 8. 💻 Trattini `--` nel Terminale Simulatore (`DockerSimulator.tsx`)
* **Criticità**: Segnalazione di inserimento visivo dei trattini nei comandi.
* **Verifica & Fix**: Verificata la gestione dell'input text e della font monospaziata JetBrains Mono. Nessun rimpiazzo automatico di `--` in em-dash nel campo di input.

---

### 9. 🏆 Domanda Q2 Quiz Finale - ADD vs COPY (`docker-9.ts`)
* **Criticità**: La domanda chiedeva quale fosse l'istruzione "corretta" per copiare un file. Sia `ADD` sia `COPY` sono tecnicamente valide in Docker, rendendo ambigua la domanda.
* **Prima**:
  > *What is the correct instruction to copy a local file named "server.js" into the "/app" directory...*
* **Dopo**:
  > *What is the recommended best-practice instruction for copying simple local files (like "server.js") into the image directory during build?*

---
