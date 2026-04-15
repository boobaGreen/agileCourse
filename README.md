# 🚀 Agile DevOps Course Platform

A high-fidelity, gamified educational platform designed to turn complex DevOps concepts into interactive, state-driven learning experiences. This platform focuses on **Git**, **Docker**, and **Kubernetes**, replacing static reading with real-time laboratory simulations.

## 🔗 Live Demo
Experience the platform here: **[https://agile.claudiodallara.it/](https://agile.claudiodallara.it/)**

## 🌟 Key Features

### 🏛️ Interactive Simulation Engines
Custom-built state engines that track infrastructure changes:
- **Git Simulator**: Visualizes the DAG (Directed Acyclic Graph), branching, and merging logic in real-time.
- **Docker Simulator**: Tracks image layers, container lifecycles, named volumes, and virtual bridge networks.
- **Kubernetes Simulator**: Simulates a live cluster topology including Nodes, Pods, Deployments, Services (LoadBalancers), ConfigMaps, and Persistent Storage.

### 🎨 Premium Visualizers
State-of-the-art UI components that react to every command:
- **Cluster Topology**: See Pods being scheduled, scaled, and auto-healed.
- **Infrastructure Overlays**: View networking connections and storage bindings with modern iconography and smooth animations (Framer Motion).
- **Gamified Feedback**: An integrated XP system that rewards students for completing tasks and conquering certification challenges.

## 🚀 Detailed Curriculum (Modules)

### 🐳 Docker Track (9 Modules)
1. **L'Inizio del Viaggio**: Basi di Docker e containerizzazione.
2. **Primi Passi**: Terminale e gestione dei container (start/stop/rm).
3. **Build & Run**: Creazione di Dockerfile e gestione dei cicli di vita.
4. **Immagini & Registry**: Tagging, versionamento e push su Docker Hub.
5. **Persistenza & Volumi**: Gestione dei dati oltre il ciclo di vita del container.
6. **Network & Orchestrazione**: Reti bridge e comunicazione tra container.
7. **Docker Compose**: Orchestrazione multi-container (Web + DB).
8. **Lab Arena**: Playground libero per esercitarsi in sicurezza.
9. **Sicurezza & Best Practices**: Ottimizzazione immagini e final quiz.

### ☸️ Kubernetes Track (9 Modules)
1. **Benvenuti su K8s**: Storia e utilità dell'orchestratore.
2. **Il Cervello (Architecture)**: Control Plane, Nodi e Kubelet.
3. **Deploy & Scaling**: Scheduling di Pod e replica sets.
4. **Self-Healing**: Auto-ripristino dei pod e strategie di rollout.
5. **Networking (Services)**: Ingress, LoadBalancer e DNS interno.
6. **Config & Secrets**: ConfigMaps e gestione dati sensibili.
7. **Persistence (PV/PVC)**: Binding dinamico dello storage.
8. **Cluster Playground**: Sandbox per testare scenari reali.
9. **Helm & Certification**: Package management e sfida finale.

### 🌿 Git Track (11 Modules)
1. **L'Origine**: Installazione e workflow locale.
2. **Commit & History**: La macchina del tempo di Git.
3. **Branching**: Creazione di flussi di lavoro paralleli.
4. **Merging**: Unione dei rami e fast-forward.
5. **Conflict Mastery**: Risoluzione manuale dei conflitti.
6. **Remote Sync**: `push`, `pull` e sincronizzazione globale.
7. **Rebase vs Merge**: Tecniche avanzate per una storia pulita.
8. **Stashing**: Salvare il lavoro a metà nel limbo.
9. **Rewind & Undo**: Ripristino commit e cancellazioni sicure.
10. **Games Hub**: Mini-giochi interattivi ispirati a "Oh My Git!".
11. **Final Challenge**: Sfida di certificazione per il comando Git.

## 💻 Technology Stack

- **Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6+](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/) / Static Hosting

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/boobaGreen/agileCourse.git
   ```
2. Navigate to the app directory:
   ```bash
   cd app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Launch the interactive development server:
```bash
npm run dev
```

### Production Build
Generate the optimized production bundle:
```bash
npm run build
```

## 📖 License
This project is for educational purposes. All rights reserved.

---
Built with ❤️ for the DevOps Community.
