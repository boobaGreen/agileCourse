import type { Module } from '../../types'

export const k8s8: Module = {
  id: 'k8s-8',
  track: 'k8s',
  order: 8,
  title: { en: 'Hands-on Labs: Playground', it: 'Lab Pratici: Playground' },
  subtitle: { en: 'Free clusters to practice safely', it: 'Cluster gratuiti per esercitarsi in sicurezza' },
  emoji: '🧪',
  duration: '45+ min',
  xpReward: 100,
  externalLink: {
    label: { en: 'Launch Killercoda K8s Lab', it: 'Avvia il Lab K8s su Killercoda' },
    url: 'https://killercoda.com/playgrounds/scenario/kubernetes',
    xpPrompt: { en: 'How many Killercoda tasks did you conquer? Enter below!', it: 'Quanti task di Killercoda hai completato? Inserisci il numero qui sotto!' }
  },
  sections: [
    {
      type: 'intro',
      content: { en: 'You cannot learn Kubernetes entirely by reading theory. You MUST use `kubectl`. The good news? You do not need to install Minikube or pay Google Cloud. Free browser-based cluster environments exist.', it: 'Non puoi imparare Kubernetes interamente leggendo la teoria. DEVI usare `kubectl`. La buona notizia? Non è necessario installare Minikube o pagare Google Cloud. Esistono ambienti cluster gratuiti basati su browser.' }
    },
    {
      type: 'concept',
      title: { en: '🌐 Tool 1: Killercoda Playgrounds', it: '🌐 Strumento 1: Killercoda Playground' },
      content: { en: '**Killercoda** is the absolute best free Kubernetes playground. \n\n- Gives you a two-node cluster (1 Master, 1 Worker)\n- Already configured with autocomplete and right permissions\n- 100% Free, runs instantly in the browser\n\n🔗 **URL**: [https://killercoda.com](https://killercoda.com)', it: '**Killercoda** è in assoluto il miglior playground gratuito per Kubernetes. \n\n- Ti fornisce un cluster a due nodi (1 Master, 1 Worker)\n- Già configurato con autocompletamento e permessi corretti\n- 100% gratuito, si avvia istantaneamente nel browser\n\n🔗 **URL**: [https://killercoda.com](https://killercoda.com)' }
    },
    {
      type: 'concept',
      title: { en: '📚 Tool 2: K8s Official Tutorials', it: '📚 Strumento 2: Tutorial Ufficiali K8s' },
      content: { en: 'The official K8s documentation has an excellent interactive tutorial track.\n\n🔗 **URL**: [https://kubernetes.io/docs/tutorials/kubernetes-basics/](https://kubernetes.io/docs/tutorials/kubernetes-basics/)\n\n💡 **Recommended Focus:**\nDeploy an App -> Expose your app (Service) -> Scale your app -> Update your app.', it: 'La documentazione ufficiale di K8s ha un eccellente percorso di tutorial interattivi.\n\n🔗 **URL**: [https://kubernetes.io/docs/tutorials/kubernetes-basics/](https://kubernetes.io/docs/tutorials/kubernetes-basics/)\n\n💡 **Focus consigliato:**\nDistribuisci un\'App -> Esponi la tua app (Service) -> Scala la tua app -> Aggiorna la tua app.' }
    },
    {
      type: 'tip',
      title: { en: '🎯 The Golden Rule of Debugging', it: '🎯 La Regola d\'Oro del Debugging' },
      content: { en: 'When things break in your lab, follow the **K8s Debugging Trinity** in this exact order:\n1. `kubectl get pods` (Are they running or crashing?)\n2. `kubectl describe pod [name]` (Look at the "Events" at the bottom for errors!)\n3. `kubectl logs [name]` (Read the actual application error stacktrace)', it: 'Quando le cose non funzionano nel tuo lab, segui la **Trinità del Debugging K8s** in questo esatto ordine:\n1. `kubectl get pods` (Stanno girando o sono in crash?)\n2. `kubectl describe pod [name]` (Guarda gli "Events" in fondo per trovare gli errori!)\n3. `kubectl logs [name]` (Leggi lo stacktrace reale degli errori dell\'applicazione)' }
    },
    {
      type: 'table',
      title: { en: '🚩 Common Pod Statuses & Fixes', it: '🚩 Stati Comuni dei Pod e Soluzioni' },
      content: { en: 'If `kubectl get pods` shows anything other than `Running`, use this guide:', it: 'Se `kubectl get pods` mostra qualcosa di diverso da `Running`, usa questa guida:' },
      tableData: {
        headers: [{ en: 'Status', it: 'Stato' }, { en: 'Meaning', it: 'Significato' }, { en: 'Primary Cause', it: 'Causa Principale' }],
        rows: [
          ['`ImagePullBackOff`', { en: 'K8s cannot download your container image', it: 'K8s non riesce a scaricare l\'immagine del container' }, { en: 'Typo in image name or private registry credentials missing', it: 'Errore nell\'immagine o credenziali del registro privato mancanti' }],
          ['`CrashLoopBackOff`', { en: 'The app starts but then crashes recursively', it: 'L\'app si avvia ma poi crasha ricorsivamente' }, { en: 'Code bug, missing secret, or database connection timeout', it: 'Bug nel codice, secret mancante o timeout della connessione al database' }],
          ['`Pending`', { en: 'The pod is "waiting in line" for a node', it: 'Il pod è "in attesa in fila" per un nodo' }, { en: 'Cluster is out of CPU/RAM or no PV is available for storage', it: 'Il cluster ha esaurito CPU/RAM o non ci sono PV disponibili' }],
          ['`OOMKilled`', { en: 'The container tried to use more RAM than allowed', it: 'Il container ha cercato di usare più RAM di quella consentita' }, { en: 'Memory leak or resource limit set too low', it: 'Memory leak o limite di risorse impostato troppo basso' }]
        ]
      }
    },
    {
      type: 'game',
      title: { en: 'Lab: The Internal Sandbox', it: 'Lab: La Sandbox Interna' },
      content: { en: 'Practice your skills right here! This simulator tracks state just like a real cluster. Try to deploy an app and expose it.', it: 'Esercita le tue abilità proprio qui! Questo simulatore traccia lo stato proprio come un cluster reale. Prova a distribuire un\'app ed esporla.' },
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'minikube', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: []
        },
        tasks: [
          { id: '1', instruction: { en: 'Deploy the nginx application: `kubectl apply -f nginx-deployment.yaml`', it: 'Distribuisci l\'applicazione nginx: `kubectl apply -f nginx-deployment.yaml`' }, condition: 'PODS_RUNNING:2' },
          { id: '2', instruction: { en: 'Expose it to the world: `kubectl expose deployment nginx --type=LoadBalancer --port=80`', it: 'Esponila al mondo: `kubectl expose deployment nginx --type=LoadBalancer --port=80`' }, condition: 'SERVICE_EXISTS:nginx' }
        ]
      }
    }
  ]
}
