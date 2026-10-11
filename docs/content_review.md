# Report di correttezza contenuti: Git, Docker, Kubernetes

Data revisione: 11 ottobre 2026
Perimetro: tutti i moduli in `app/src/data/{git,docker,k8s}/modules`, le tre cheat sheet, `certifications.ts`, `translations.ts`. Verificati con richiesta HTTP tutti i 17 video YouTube, la playlist e i 13 link esterni.

## Sintesi

| Track | Moduli | Quiz | Errori sostanziali | Imprecisioni | Giudizio |
|---|---|---|---|---|---|
| Git | 11 | 60 | 2 | 9 | Buono. Ben scritto, qualche ridondanza e lacune di curriculum. |
| Docker | 9 | 34 | 5 | 8 | Buono, ma 2 moduli non sono tradotti in italiano. |
| Kubernetes | 9 | 40 | 3 | 8 | Buono. Un'affermazione sui Secret va corretta in 3 punti. |

- La qualità tecnica e linguistica è decisamente superiore a quella del corso KCNA in MultiCourse. Il contenuto è riutilizzabile quasi integralmente nel nuovo sito.
- Tutti i video esistono. Due hanno un titolo nella piattaforma che non corrisponde al video reale (vedi sezione Link).
- L'audit precedente in `docs/audits/docker_course_audit.md` dichiara "nessun errore tecnico" e "9 moduli bilingui": entrambe le affermazioni sono false (vedi Docker, punti D1 e D2).
- Il README descrive un curriculum Git (Stashing, Conflict Mastery, Rebase vs Merge) che non corrisponde ai moduli reali.

## Errori sostanziali (da correggere prima del porting)

### Git

| # | Dove | Problema | Correzione |
|---|------|----------|-----------|
| G1 | `git-1` tabella "Why use Version Control" | Dice che Git salva "Smart diffs" invece di copie complete. Contraddice il modulo 2 (quiz `git-2-q5`) che insegna correttamente che Git salva snapshot. | Sostituire con "Snapshot compressi e deduplicati". |
| G2 | Cheat sheet, output di `git log` e `git blame` | Gli hash di esempio contengono lettere non esadecimali: `140g8h9`, `060i0j1`, `140g8h91`. Un lettore attento li riconosce come falsi. | Usare solo caratteri 0-9 a-f. |

### Docker

| # | Dove | Problema | Correzione |
|---|------|----------|-----------|
| D1 | `docker-2` e `docker-9` | Titolo, sottotitolo, funFact, intro e due sezioni concept di `docker-2` sono stringhe semplici solo in inglese. Idem titolo e sottotitolo di `docker-9`. In modalità italiana l'utente vede testo inglese. | Localizzare i campi come `{ en, it }`. |
| D2 | `docker-3` tabella istruzioni, riga ADD | "può estrarre archivi (.tar, .zip)". ADD estrae solo tar (anche compressi gz, bz2, xz), mai zip. | Togliere .zip. |
| D3 | `docker-3-q3` | Due risposte corrette: `-t (tag)` e `--tag (label)` sono lo stesso flag. Solo `-t` è segnata come giusta. | Sostituire il distrattore `--tag` con un flag inesistente, es. `-l (label)`. |
| D4 | `docker-9-q9` | Chiede quale comando rimuove "container, reti e immagini" create da compose. `docker compose down` non rimuove le immagini senza `--rmi`. | Togliere "immagini" dalla domanda. |
| D5 | `docker-4` tabella tag | `node:18` è etichettato "Minor Version". È una major version. | Rinominare "Major Version" e usare `node:18.17` come esempio di minor. |

### Kubernetes

| # | Dove | Problema | Correzione |
|---|------|----------|-----------|
| K1 | `k8s-6` (analogia, concept Secret, tabella) | "I Secret non vengono mai salvati su disco fisico, solo in RAM tmpfs". Falso a livello cluster: i Secret sono persistiti in etcd, in chiaro salvo encryption at rest. Il tmpfs riguarda solo il mount sul nodo worker. | Riformulare: "persistiti in etcd (cifrare con EncryptionConfiguration), montati nei Pod in tmpfs". |
| K2 | `k8s-9-q9` | La risposta corretta recita "Secret Kubernetes sicuro e criptato". Contraddice `k8s-6-q2` che insegna che i Secret NON sono criptati. | Riscrivere: "Come Secret Kubernetes (protetto da RBAC, da cifrare a riposo)". |
| K3 | `k8s-7` YAML StorageClass | `provisioner: kubernetes.io/aws-ebs` è il provisioner in-tree rimosso in Kubernetes 1.27. | Usare `provisioner: ebs.csi.aws.com`. |

## Imprecisioni e aggiornamenti consigliati

### Git

| # | Dove | Nota |
|---|------|------|
| G3 | `git-3` | "Un hash garantisce che la cronologia non possa mai essere manomessa": l'hash rileva la manomissione, non la impedisce. La storia si riscrive con rebase o reset. |
| G4 | `git-3` funFact | "Il repo medio su GitHub ha 6,7 branch, il kernel oltre 700": statistiche senza fonte, da rimuovere o citare. |
| G5 | `git-9` "Bisect Logic" | "`git bisect start` segna i punti Bad e Good": no, li segnano `git bisect bad` e `git bisect good`. |
| G6 | `git-8-q2` | Il quiz chiede di `git stash`, ma lo stash non è spiegato in nessun modulo (solo nella cheat sheet). Stesso problema già segnalato in passato per `checkout <hash>`. |
| G7 | `git-11-q14`, `git-11-q2`, `git-5-q4` | Le opzioni contengono la spiegazione tra parentesi ("git fetch (downloads only for your inspection)"), che rivela la risposta. |
| G8 | `git-11-q14` | "Quale comando mostra le modifiche non in stage": anche `git status` le mostra. Ambiguo senza il suggerimento tra parentesi. |
| G9 | `git-6-q3` | Il distrattore "A single-branch model without PRs" è troppo vicino al trunk-based development, che può non usare PR. |
| G10 | Cheat sheet | Insegna `git checkout <name>` mentre i moduli promuovono `git switch`. Aggiungere `git switch` e `git restore`. |
| G11 | `git-4` e `git-9` | Merge vs Rebase è spiegato due volte con contenuti sovrapposti. |

### Docker

| # | Dove | Nota |
|---|------|------|
| D6 | `docker-7` YAML | `version: '3.8'` è obsoleto in Compose v2 e genera un warning. Rimuovere. |
| D7 | `docker-7` lab e quiz `docker-9-q2`, `q9` | Il modulo insegna `docker compose` (v2) ma i suggerimenti e i quiz usano `docker-compose`. Uniformare alla sintassi moderna. |
| D8 | `docker-7` e `docker-9-q7` | `depends_on` garantisce solo l'ordine di avvio, non che il servizio sia pronto. Citare `condition: service_healthy`. |
| D9 | `docker-4` | "Google GCR" è deprecato, sostituito da Artifact Registry. |
| D10 | `docker-3` | `COPY package.json ./` esclude il lockfile. Best practice: `COPY package*.json ./`. Il Dockerfile del video usa Ubuntu 18.04 e Node 10, entrambi fuori supporto: va dichiarato come esempio storico. |
| D11 | Cheat sheet | Il comando è `docker system prune -a --volumes` ma esempio, descrizione e output ignorano `--volumes`, che cancella tutti i volumi non usati. Pericoloso se copiato. |
| D12 | Cheat sheet, output di `docker build` | Mostra `COPY . /app` prima di `RUN npm install`, il pattern che il modulo 3 insegna a evitare. |
| D13 | `docker-1` | Il testo dice "avvio in millisecondi", la tabella dice "secondi". |

### Kubernetes

| # | Dove | Nota |
|---|------|------|
| K4 | `k8s-1` | "Kybernitis" non è la traslitterazione di κυβερνήτης: è "kybernētēs". |
| K5 | `k8s-1` infografica | Foto di Jeri Ryan (Star Trek) servita da `/seven_of_nine.jpg`. Immagine protetta da copyright e diritto d'immagine: rischio legale in un prodotto professionale. Sostituire con un'illustrazione originale. |
| K6 | `k8s-2` | "Master Node" è terminologia deprecata dal 2020. Usare "Control Plane node" anche nel gioco drag-classify. |
| K7 | `k8s-5` | NodePort definito "UNSECURE" (refuso per INSECURE) e "non sicuro per la produzione". Overstated: è scomodo e espone i nodi, ma è usato in produzione dietro un load balancer esterno. Riformulare come "sconsigliato". |
| K8 | `k8s-6` | "I file montati si aggiornano in tempo reale": in realtà entro il sync period della kubelet (circa un minuto) e mai se montati con `subPath`. |
| K9 | `k8s-6` YAML Secret | Il Deployment di esempio non ha `selector` né `labels` nel template: non passerebbe la validazione. |
| K10 | `k8s-3` | I nomi Pod reali hanno due suffissi (`auth-service-7f9c6d8b5-x2k4p`), non uno (`auth-service-7f9`). |
| K11 | `k8s-9-q2` | La risposta "aggiorna replicas nello YAML" è corretta, ma i lab del modulo 3 e 4 premiano `kubectl scale`. Chiarire nella spiegazione che entrambi funzionano e quale preferire. |

## Lacune di curriculum

- **Git**: nessun modulo su risoluzione conflitti (solo 4 righe di codice in `git-4`), stash, tag, reflog, `.gitignore` approfondito. Il README promette "Conflict Mastery" e "Stashing".
- **Kubernetes**: i Namespace compaiono solo nella cheat sheet e in una nota di `k8s-5`. Mai spiegati.
- **Docker**: multi-stage, ENTRYPOINT, `.dockerignore`, healthcheck sono dichiarati esplicitamente come "prossimi passi". Coerente.

## Link e video

| Dove | Stato |
|------|-------|
| `certifications.ts` GitLab | `https://about.gitlab.com/learn/certifications/` risponde 404. |
| `certifications.ts` GitHub | Redirect a `learn.github.com`. Funziona, aggiornare l'URL. |
| `certifications.ts` Docker | Mirantis reindirizza a `/certification/dca-certification-exam/`. Verificare che l'esame DCA sia ancora erogato. |
| `docker-7` video | Titolo nella piattaforma "Docker Compose in 6 Minutes". Il video reale è "Docker Compose will BLOW your MIND!!" di NetworkChuck, durata molto maggiore. |
| `docker-6` video | Titolo "Docker Networking in 5 Minutes". Il video reale è una lezione del corso LearnCantrill, più lunga. |
| Tutti gli altri 15 video e la playlist | Esistenti e pertinenti. |

## Lingua italiana

Qualità complessiva buona. Refusi trovati:

- `docker-1` funFact: "il scaricatore" → "lo scaricatore"
- `docker-6` lab: "creerei una rete" → "creerai una rete"
- `docker-7` tabella: "Riscossi/Rimossi" → "Rimossi"
- `git-5-q1`: "rilascini" → "rilasci"
- `git-2` funFact: "ha detto famosamente" → "è celebre la frase di"
- `k8s-6` titolo: "L'Agenda ed la Cassaforte" → "e la Cassaforte"
- Cheat sheet K8s: "collegameto" → "collegamento"
- Uso diffuso di "ed" davanti a consonante ("ed il", "ed esponi"): la norma attuale lo riserva alla vocale uguale.

## Coerenza e struttura (utile per il redesign)

- **Branding incoerente**: "Agile Learning" (landing), "Agile Lab" (profilo, README), "DevHarbor" (badge certificati), "Enter Harbor" (pulsante). Va scelto un nome.
- **XP sbilanciati**: moduli Git da 50 a 100 XP, Docker da 80 a 200, K8s da 100 a 250. Il radar delle competenze penalizza Git a parità di impegno.
- **Durata "∞ min"** nel modulo Git 10 rompe la semantica del campo durata.
- **Numero quiz per modulo** variabile da 3 a 5, finali da 10 a 20.
- **Nessun quiz** nei moduli Git 10, Docker 8, K8s 8: coerente con il loro ruolo di playground.

## Verdetto

Contenuto solido e riutilizzabile. Prima del porting nel nuovo sito vanno fatte 10 correzioni sostanziali (2 Git, 5 Docker, 3 Kubernetes), la localizzazione italiana di `docker-2` e `docker-9`, la correzione del link GitLab e la sostituzione dell'immagine di Jeri Ryan. Le imprecisioni e i refusi si possono applicare in un'unica passata durante la migrazione dei dati.
