import type { Module } from '../../types'

export const k8s7: Module = {
  id: 'k8s-7',
  track: 'k8s',
  order: 7,
  title: { en: 'Storage & Persistence', it: 'Archiviazione e Persistenza' },
  subtitle: { en: 'Where data goes to survive', it: 'Dove i dati sopravvivono' },
  emoji: '💾',
  duration: '20 min',
  xpReward: 100,
  sections: [
    {
      type: 'intro',
      content: { en: 'Just like Docker, Kubernetes Pods are entirely ephemeral. When a pod is deleted, everything on its local disk is utterly wiped out. For a frontend app this is fine. For a Database, it\'s a disaster. Kubernetes introduces a complex but brilliant dual-layer system for permanent storage.', it: 'Proprio come in Docker, i Pod di Kubernetes sono interamente effimeri. Quando un pod viene eliminato, tutto ciò che si trova sul suo disco locale viene completamente cancellato. Per un\'app frontend questo va bene. Per un database, è un disastro. Kubernetes introduce un sistema a doppio strato complesso ma brillante per l\'archiviazione permanente.' }
    },
    {
      type: 'video',
      title: { en: '📺 Kubernetes Storage Explained', it: '📺 L\'archiviazione in Kubernetes spiegata' },
      content: { en: 'Understand why the PV and PVC objects are intentionally separated.', it: 'Capisci perché gli oggetti PV e PVC sono intenzionalmente separati.' },
      videoUrl: 'https://www.youtube.com/watch?v=0swOh5C3OVM'
    },
    {
      type: 'concept',
      title: { en: '💽 Persistent Volumes (PV)', it: '💽 Persistent Volume (PV)' },
      content: { en: 'A PV is the actual physical representation of storage. It is an AWS EBS drive, an Azure Disk, or an NFS share pre-provisioned by your infrastructure admin. It sits in the cluster, completely separate from any pods, waiting to be used.', it: 'Un PV è la rappresentazione fisica effettiva dello storage. È un disco AWS EBS, un disco Azure o una condivisione NFS pre-configurata dal tuo amministratore dell\'infrastruttura. Risiede nel cluster, completamente separato dai pod, in attesa di essere utilizzato.' }
    },
    {
      type: 'concept',
      title: { en: '📜 Persistent Volume Claims (PVC)', it: '📜 Persistent Volume Claim (PVC)' },
      content: { en: 'A PVC is a **request** by a Pod. \n\nThink of a PV as an empty hotel room. The PVC is the reservation ticket. \nThe application developer writes a PVC saying: "I need 10GB of fast SSD storage." \nKubernetes then searches the available PVs. If it finds a match, it **Binds** them together. The Pod then mounts the PVC.', it: 'Un PVC è una **richiesta** da parte di un Pod. \n\nPensa al PV come a una stanza d\'albergo vuota. Il PVC è il biglietto della prenotazione. \nLo sviluppatore dell\'applicazione scrive un PVC dicendo: "Ho bisogno di 10GB di storage SSD veloce". \nKubernetes cerca quindi tra i PV disponibili. Se trova una corrispondenza, li **collega** (Bind) insieme. Il Pod quindi monta il PVC.' }
    },
    {
      type: 'flowchart',
      content: { en: '**Separation of Concerns: DevOps vs Devs**', it: '**Separazione delle responsabilità: DevOps vs Dev**' },
      diagramSteps: [
        { label: { en: 'Cloud Admin\nCreates PV (100GB Disk)', it: 'Cloud Admin\nCrea PV (Disco 100GB)' }, icon: '☁️', color: '#118ab2' },
        { label: { en: 'Kubernetes\n(Binding Layer)', it: 'Kubernetes\n(Livello di Binding)' }, icon: '🤝', color: '#ffb703' },
        { label: { en: 'Developer\nRequests PVC (10GB)', it: 'Sviluppatore\nRichiede PVC (10GB)' }, icon: '📝', color: '#06d6a0' },
        { label: { en: 'Pod\nMounts PVC', it: 'Pod\nMonta PVC' }, icon: '🫛', color: '#06d6a0' }
      ]
    },
    {
      type: 'tip',
      title: { en: '💡 Remote Storage vs Local Disks', it: '💡 Storage Remoto vs Dischi Locali' },
      content: {
        en: 'Why is cloud-attached remote storage (like AWS EBS or Azure Disk) strongly recommended over local node hard drives for stateful workloads?\n\n' +
            'If a Worker Node crashes, Kubernetes will reschedule the Pod onto a different, healthy Worker Node. If your data was stored on the dead node\'s local hard drive, the new Pod cannot access it! With **remote cloud storage**, Kubernetes detaches the volume from the dead node and re-attaches it to the new node instantly.',
        it: 'Perché lo storage remoto in cloud (come AWS EBS o Azure Disk) è fortemente consigliato rispetto ai dischi rigidi locali dei nodi per i carichi di lavoro stateful?\n\n' +
            'Se un Nodo Worker crolla, Kubernetes ri-schedulerà il Pod su un nodo worker diverso e sano. Se i dati erano salvati sul disco fisicamente locale del vecchio nodo, il nuovo Pod non potrà più accedervi! Con lo **storage cloud remoto**, Kubernetes scollega il volume dal nodo morto e lo ricollega all\'istante al nuovo nodo!'
      }
    },
    {
      type: 'game',
      title: { en: 'Lab: Reserving the Disk', it: 'Lab: Prenotare il disco' },
      content: { en: 'In this simulation, you will apply a PersistentVolumeClaim. Watch how Kubernetes automatically binds it to a physical volume!', it: 'In questa simulazione, applicherai un PersistentVolumeClaim. Guarda come Kubernetes lo collega automaticamente a un volume fisico!' },
      gameType: 'k8s-sim',
      gameData: {
        startState: {
          nodes: [{ id: 'node-1', name: 'minikube', status: 'Ready' }],
          pods: [],
          services: [],
          deployments: [],
          pvc: [],
          pv: []
        },
        tasks: [
          {
            id: '1',
            instruction: { en: 'Apply the persistent volume claim manifest `web-pvc.yaml`', it: 'Applica il manifest PersistentVolumeClaim `web-pvc.yaml`' },
            condition: 'PVC_EXISTS:web-pvc',
            hints: [
              { en: 'Use `kubectl apply -f` to create the storage claim resource.', it: 'Usa `kubectl apply -f` per creare la risorsa di richiesta storage.' },
              { en: 'The claim manifest file in the directory is named `web-pvc.yaml`.', it: 'Il file manifesto della richiesta nella cartella si chiama `web-pvc.yaml`.' },
              { en: 'Run: `kubectl apply -f web-pvc.yaml`', it: 'Esegui: `kubectl apply -f web-pvc.yaml`' }
            ]
          },
          {
            id: '2',
            instruction: { en: 'Check the status of your persistent volume claims', it: 'Controlla lo stato delle tue richieste PersistentVolumeClaim' },
            condition: 'CMD_RAN:get pvc',
            hints: [
              { en: 'Use `kubectl get` to check storage claim statuses.', it: 'Usa `kubectl get` per verificare gli stati delle richieste di storage.' },
              { en: 'Specify `pvc` or `persistentvolumeclaims` as the resource type.', it: 'Specifica `pvc` o `persistentvolumeclaims` come tipo di risorsa.' },
              { en: 'Run: `kubectl get pvc`', it: 'Esegui: `kubectl get pvc`' }
            ]
          }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 'k8s-7-q1',
      question: { en: 'What is the primary reason K8s splits storage into two objects (PV and PVC)?', it: 'Qual è il motivo principale per cui K8s divide lo storage in due oggetti (PV e PVC)?' },
      options: [
        { en: 'To significantly increase the read/write speed of physical SSD drives', it: 'Aumentare significativamente la velocità di lettura/scrittura dei dischi SSD fisici' },
        { en: 'Separation of concerns between infrastructure admins and application developers', it: 'Separazione delle responsabilità tra amministratori dell\'infrastruttura e sviluppatori di applicazioni' },
        { en: 'Because cloud providers like AWS and Azure strictly require this separation', it: 'Perché i cloud provider come AWS e Azure richiedono rigorosamente questa separazione' },
        { en: 'To allow the Kubernetes engine to compress and deduplicate data automatically', it: 'Permettere al motore Kubernetes di comprimere e deduplicare i dati automaticamente' }
      ],
      correct: 1,
      explanation: { en: 'A developer shouldn\'t have to know the exact ARN of an AWS disk. They just want 10GB of space. By splitting the logic, the file becomes portable. It works on AWS, and if moved to Azure, it binds to Azure disks transparently.', it: 'Uno sviluppatore non dovrebbe conoscere l\'esatto ARN di un disco AWS. Vuole solo 10GB di spazio. Dividendo la logica, il file diventa portabile. Funziona su AWS e, se spostato su Azure, si collega ai dischi Azure in modo trasparente.' }
    },
    {
      id: 'k8s-7-q2',
      question: { en: 'If a PVC is stuck in the "Pending" state, what does it most likely mean?', it: 'Se un PVC è bloccato nello stato "Pending", cosa significa molto probabilmente?' },
      options: [
        { en: 'The underlying Kubernetes worker node has completely ran out of available RAM', it: 'Il nodo worker Kubernetes sottostante ha esaurito completamente la RAM disponibile' },
        { en: 'The specific Pod container has crashed or failed its internal health check', it: 'Lo specifico container del Pod è crashato o ha fallito il suo health check interno' },
        { en: 'Kubernetes could not find a physical volume matching the specific claim request', it: 'Kubernetes non ha trovato un volume fisico corrispondente alla specifica richiesta di claim' },
        { en: 'The base64 encoded secret failed to decrypt during the volume mounting phase', it: 'Il secret codificato in base64 non è riuscito a decriptarsi durante la fase di montaggio del volume' }
      ],
      correct: 2,
      explanation: { en: 'A claim must bind to a volume. If you ask for a 50GB fast SSD, and the cluster only has 10GB slow HDDs available, the claim stays Pending forever until an Admin provisions the right hardware.', it: 'Un claim deve collegarsi a un volume. Se richiedi un SSD veloce da 50GB e il cluster ha solo HDD lenti da 10GB disponibili, il claim rimarrà in Pending per sempre finché un amministratore non configurerà l\'hardware corretto.' }
    },
    {
      id: 'k8s-7-q3',
      question: { en: 'Which Kubernetes resource is written by an application developer to request storage space without knowing underlying cloud disk hardware details?', it: 'Quale risorsa Kubernetes viene scritta dallo sviluppatore dell\'applicazione per richiedere spazio di storage senza conoscere i dettagli dell\'hardware del disco cloud?' },
      options: [
        'PersistentVolumeClaim (PVC)',
        'PersistentVolume (PV)',
        'StorageClass',
        'VolumeAttachment'
      ],
      correct: 0,
      explanation: { en: 'The PersistentVolumeClaim (PVC) is the abstract request ticket submitted by the developer. The PersistentVolume (PV) is the actual storage volume provided by cluster administrators.', it: 'Il PersistentVolumeClaim (PVC) è il ticket di richiesta astratto inviato dallo sviluppatore. Il PersistentVolume (PV) è il volume di storage reale fornito dagli amministratori del cluster.' }
    }
  ]
}
