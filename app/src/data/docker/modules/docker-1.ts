import type { Module } from '../../types'

export const docker1: Module = {
  id: 'docker-1',
  track: 'docker',
  order: 1,
  title: { en: 'What is a Container?', it: 'Cos\'è un Container?' },
  subtitle: { en: 'Ships, not virtual machines', it: 'Navi, non macchine virtuali' },
  emoji: '🐳',
  duration: '15 min',
  xpReward: 100,
  funFact: {
    en: 'The word "Docker" refers to a dock worker who loads and unloads ships. A perfect metaphor for moving software containers!',
    it: 'La parola "Docker" indica il scaricatore di porto che carica e scarica le navi. Una metafora perfetta per lo spostamento dei container software!'
  },
  sections: [
    {
      type: 'intro',
      content: {
        en: 'In the old days, software worked on one machine but failed on another. "It works on my machine" became the developer\'s excuse. Docker solved this by putting everything an app needs into a portable, standardized container.',
        it: 'In passato, il software funzionava su un computer ma falliva su un altro. "Funziona sulla mia macchina" era la classica scusa degli sviluppatori. Docker ha risolto questo problema racchiudendo tutto ciò di cui un\'app ha bisogno in un container portatile e standardizzato.'
      }
    },
    {
      type: 'video',
      title: { en: '📺 Docker in 100 Seconds', it: '📺 Docker in 100 Secondi' },
      content: {
        en: 'A rapid, high-intensity breakdown of what Docker is and why it literally changed the entire tech industry.',
        it: 'Un\'analisi rapida e ad alta intensità su cos\'è Docker e perché ha letteralmente rivoluzionato l\'intero settore tecnologico.'
      },
      videoUrl: 'https://www.youtube.com/watch?v=Gjnup-PuquQ'
    },
    {
      type: 'concept',
      title: { en: '📦 Why not just use a Virtual Machine?', it: '📦 Perché non usare semplicemente una Macchina Virtuale?' },
      content: {
        en: 'To understand containers, we must understand the old way of doing things: Virtual Machines (VMs). A VM runs a **full Guest Operating System** on top of virtualized hardware. It\'s slow to start and heavy on resources. A container, instead, shares the Host OS, making it start in milliseconds.',
        it: 'Per capire i container, dobbiamo comprendere il vecchio modo di lavorare: le Macchine Virtuali (VM). Una VM esegue un **Guest OS completo** su hardware virtualizzato. È lenta ad avviarsi e pesante per le risorse. Un container, invece, condivide l\'OS host, avviandosi in pochi millisecondi.'
      }
    },
    {
      type: 'table',
      title: { en: '📊 VM vs Container Comparison', it: '📊 Confronto tra VM e Container' },
      content: {
        en: 'Instead of running a full Guest OS inside a "fake computer", a Container just shares the host kernel:',
        it: 'Invece di eseguire un intero Guest OS in un "finto computer", un Container condivide direttamente il kernel dell\'host:'
      },
      tableData: {
        headers: [
          { en: 'Feature', it: 'Caratteristica' },
          { en: 'Virtual Machine (VM) 🖥️', it: 'Macchina Virtuale (VM) 🖥️' },
          { en: 'Container (Docker) 🐳', it: 'Container (Docker) 🐳' }
        ],
        rows: [
          [
            { en: '**Architecture**', it: '**Architettura**' },
            { en: 'Hardware → Hypervisor → **Guest OS** → App', it: 'Hardware → Hypervisor → **Guest OS** → App' },
            { en: 'Hardware → Host OS → **Docker Engine** → App', it: 'Hardware → Host OS → **Docker Engine** → App' }
          ],
          [
            { en: '**Size**', it: '**Dimensione**' },
            { en: 'Gigabytes (GBs) per machine', it: 'Gigabyte (GB) per macchina' },
            { en: 'Megabytes (MBs) per container', it: 'Megabyte (MB) per container' }
          ],
          [
            { en: '**Startup Time**', it: '**Tempo di Avvio**' },
            { en: 'Minutes (Booting a full OS)', it: 'Minuti (Avvio di un intero OS)' },
            { en: 'Seconds (Just starting a process)', it: 'Secondi (Avvio di un singolo processo)' }
          ],
          [
            { en: '**Isolation**', it: '**Isolamento**' },
            { en: 'Complete, hardware-level isolation', it: 'Isolamento completo a livello hardware' },
            { en: 'Process-level isolation', it: 'Isolamento a livello di processo' }
          ],
          [
            { en: '**Overhead**', it: '**Sovraccarico**' },
            { en: 'High resource consumption', it: 'Elevato consumo di risorse' },
            { en: 'Extremely lightweight', it: 'Estremamente leggero' }
          ]
        ]
      }
    },
    {
      type: 'flowchart',
      content: {
        en: '**The Shipping Container Analogy**\nBefore standard containers, moving software was exactly like moving random-sized cargo. Docker standardized the shape!',
        it: '**L\'Analogia del Container Marittimo**\nPrima dei container standard, spostare il software era come trasportare merci di dimensioni casuali. Docker ha standardizzato la forma!'
      },
      diagramSteps: [
        { label: { en: 'Dev Laptop\n(Messy Code)', it: 'Laptop Sviluppatore\n(Codice disordinato)' }, icon: '💻', color: '#118ab2' },
        { label: { en: 'Standard Docker Image\n(The Container)', it: 'Immagine Docker Standard\n(Il Container)' }, icon: '📦', color: '#ffb703' },
        { label: { en: 'Cloud Servers\n(The Ship)', icon: '☁️', color: '#06d6a0' }, label_it: 'Server Cloud\n(La Nave)' },
        { label: { en: 'Runs Exactly the Same\n(Delivery)', it: 'Esecuzione Identica\n(Consegna)' }, icon: '✅', color: '#118ab2' }
      ]
    },
    {
      type: 'video',
      title: { en: '📺 Docker Architecture Full Breakdown', it: '📺 Analisi Completa dell\'Architettura Docker' },
      content: {
        en: 'A fantastic visual explanation comparing VMs to Docker Engine.',
        it: 'Una fantastica spiegazione visiva che confronta le VM con il Docker Engine.'
      },
      videoUrl: 'https://www.youtube.com/watch?v=a1M_thDTqmU'
    },
    {
      type: 'tip',
      title: { en: '💡 The Ultimate Takeaway', it: '💡 La Lezione Fondamentale' },
      content: {
        en: 'A container is a standardized unit of software that packages up code and all its dependencies so the application runs quickly and reliably from **any** computing environment to another.',
        it: 'Un container è un\'unità software standardizzata che racchiude il codice e tutte le sue dipendenze, permettendo all\'applicazione di funzionare in modo rapido e affidabile tra **qualsiasi** ambiente di calcolo.'
      }
    }
  ],
  quiz: [
    {
      id: 'docker-1-q1',
      question: {
        en: 'What is the primary architectural difference between a Container and a VM?',
        it: 'Qual è la principale differenza architetturale tra un Container e una VM?'
      },
      options: [
        {
          en: 'Containers provide a higher level of security than VMs at a physical hardware level',
          it: 'I container offrono un livello di sicurezza maggiore rispetto alle VM a livello di hardware fisico'
        },
        {
          en: 'Containers share the host OS kernel, while VMs include a full Guest OS',
          it: 'I container condividono il kernel dell\'OS host, mentre le VM includono un Guest OS completo'
        },
        {
          en: 'Virtual Machines are significantly faster to start and shut down than containers',
          it: 'Le macchine virtuali sono significativamente più veloci da avviare e arrestare rispetto ai container'
        },
        {
          en: 'Docker containers can only ever be executed on servers running a Linux kernel',
          it: 'I container Docker possono essere eseguiti solo su server con kernel Linux'
        }
      ],
      correct: 1,
      explanation: {
        en: 'Containers are lightweight because they share the host operating system kernel directly via the Docker Engine. VMs are "heavyweight" because each one boots an entirely separate OS on virtualized hardware.',
        it: 'I container sono leggeri perché condividono direttamente il kernel del sistema operativo host tramite il Docker Engine. Le VM sono "pesanti" perché ciascuna avvia un sistema operativo completamente separato su hardware virtualizzato.'
      }
    },
    {
      id: 'docker-1-q2',
      question: {
        en: 'What massive industry problem did Docker solve?',
        it: 'Quale enorme problema del settore tecnologico ha risolto Docker?'
      },
      options: [
        {
          en: 'The lack of modern high-performance programming languages for backend development',
          it: 'La mancanza di linguaggi di programmazione moderni ad alte prestazioni per lo sviluppo backend'
        },
        {
          en: 'The "works on my machine" problem by ensuring perfect environment consistency',
          it: 'Il problema del "funziona sulla mia macchina", garantendo una perfetta coerenza dell\'ambiente'
        },
        {
          en: 'The excessively high cost of storing large amounts of data in cloud storage solutions',
          it: 'Il costo eccessivamente elevato dell\'archiviazione di grandi quantità di dati in soluzioni cloud'
        },
        {
          en: 'The inherent inability of web developers to write functional and responsive UI code',
          it: 'L\'incapacità intrinseca degli sviluppatori web di scrivere codice UI funzionale e reattivo'
        }
      ],
      correct: 1,
      explanation: {
        en: 'By packaging an app together with its exact environment (libraries, config, runtime), Docker ensures it runs the exact same way on a laptop, in a testing lab, and in production.',
        it: 'Impacchettando un\'app insieme al suo ambiente esatto (librerie, configurazioni, runtime), Docker garantisce che funzioni allo stesso identico modo su un laptop, in un laboratorio di test e in produzione.'
      }
    },
    {
      id: 'docker-1-q3',
      question: {
        en: 'Why are containers generally considered "lighter" than VMs?',
        it: 'Perché i container sono generalmente considerati più "leggeri" delle VM?'
      },
      options: [
        {
          en: 'Containers do not require their own unique IP addresses for network communication',
          it: 'I container non richiedono indirizzi IP univoci per la comunicazione di rete'
        },
        {
          en: 'Containers do not include the heavy resource overhead of a full Guest OS',
          it: 'I container non includono il pesante sovraccarico di risorse di un intero Guest OS'
        },
        {
          en: 'They are specifically designed to only run compiled languages such as C++ or Rust',
          it: 'Sono specificamente progettati per eseguire solo linguaggi compilati come C++ o Rust'
        },
        {
          en: 'They completely bypass the system CPU and only utilize available system RAM',
          it: 'Escludono completamente la CPU del sistema e utilizzano solo la RAM di sistema disponibile'
        }
      ],
      correct: 1,
      explanation: {
        en: 'Because containers leverage the Host OS kernel directly, they skip the GigaBytes of bloat required to boot a separate Windows or Linux installation.',
        it: 'Poiché i container sfruttano direttamente il kernel del sistema operativo host, evitano i gigabyte di bloatware necessari per avviare un\'installazione separata di Windows o Linux.'
      }
    }
  ]
}
