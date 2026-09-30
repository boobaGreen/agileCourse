import type { LocalizedString } from '../types';

export interface CheatsheetCommand {
  command: string;
  description: LocalizedString;
  example?: string;
  output?: string;
}

export interface CheatsheetCategory {
  title: LocalizedString;
  level: 'beginner' | 'intermediate' | 'advanced';
  commands: CheatsheetCommand[];
}

export const K8S_CHEATSHEET: CheatsheetCategory[] = [
  {
    title: { en: 'Beginner', it: 'Principiante' },
    level: 'beginner',
    commands: [
      {
        command: 'kubectl run <name> --image=<image>',
        description: { en: 'Create and run a single standalone Pod container', it: 'Crea ed avvia un singolo Pod container autonomo' },
        example: 'kubectl run web-server --image=nginx:alpine',
        output: 'pod/web-server created'
      },
      {
        command: 'kubectl get pods',
        description: { en: 'List all Pods in the current namespace (-o wide for IP & Node info)', it: 'Elenca tutti i Pod nel namespace corrente (-o wide per IP e Nodo)' },
        example: 'kubectl get pods -o wide',
        output: 'NAME         READY   STATUS    RESTARTS   AGE   IP           NODE\nweb-server   1/1     Running   0          45s   10.244.0.5   minikube'
      },
      {
        command: 'kubectl get nodes',
        description: { en: 'List all worker and control plane nodes in the cluster', it: 'Elenca tutti i nodi worker e control plane nel cluster' },
        example: 'kubectl get nodes',
        output: 'NAME       STATUS   ROLES           AGE   VERSION\nminikube   Ready    control-plane   3d    v1.28.3'
      },
      {
        command: 'kubectl describe pod <pod-name>',
        description: { en: 'Show detailed lifecycle events, status, and warnings for a Pod', it: 'Mostra eventi del ciclo di vita, stato e avvisi dettagliati di un Pod' },
        example: 'kubectl describe pod web-server',
        output: 'Name:         web-server\nNamespace:    default\nNode:         minikube/192.168.49.2\nStatus:       Running\nEvents:\n  Type    Reason     Age   From               Message\n  ----    ------     ----  ----               -------\n  Normal  Scheduled  1m    default-scheduler  Successfully assigned default/web-server to minikube\n  Normal  Pulled     1m    kubelet            Container image "nginx:alpine" pulled successfully'
      },
      {
        command: 'kubectl logs <pod-name>',
        description: { en: 'Print stdout/stderr logs from a Pod container (-f to stream live)', it: 'Stampa i log stdout/stderr di un Pod (-f per lo streaming dal vivo)' },
        example: 'kubectl logs -f web-server',
        output: '/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will run initialization scripts\nConfiguration complete; ready for start up'
      },
      {
        command: 'kubectl apply -f <filename.yaml>',
        description: { en: 'Create or update cluster resources from a declarative YAML manifest', it: 'Crea o aggiorna le risorse nel cluster da un file manifesto YAML' },
        example: 'kubectl apply -f app-deployment.yaml',
        output: 'deployment.apps/backend-api created\nservice/backend-svc created'
      },
      {
        command: 'kubectl delete pod <pod-name>',
        description: { en: 'Delete a Pod from the cluster', it: 'Elimina un Pod dal cluster' },
        example: 'kubectl delete pod web-server',
        output: 'pod "web-server" deleted'
      },
      {
        command: 'kubectl get namespaces',
        description: { en: 'List all active isolation namespaces in the cluster (or kubectl get ns)', it: 'Elenca tutti i namespace di isolamento attivi nel cluster (o kubectl get ns)' },
        example: 'kubectl get ns',
        output: 'NAME              STATUS   AGE\ndefault           Active   5d\nkube-system       Active   5d\nkube-public       Active   5d'
      }
    ]
  },
  {
    title: { en: 'Intermediate', it: 'Intermedio' },
    level: 'intermediate',
    commands: [
      {
        command: 'kubectl get deployments',
        description: { en: 'List all active Deployments and their replica counts', it: 'Elenca tutti i Deployment attivi ed il numero di repliche' },
        example: 'kubectl get deployments',
        output: 'NAME          READY   UP-TO-DATE   AVAILABLE   AGE\nbackend-api   3/3     3            3           12m'
      },
      {
        command: 'kubectl get services',
        description: { en: 'List all network Services (ClusterIP, NodePort, LoadBalancer)', it: 'Elenca tutti i Servizi di rete (ClusterIP, NodePort, LoadBalancer)' },
        example: 'kubectl get svc',
        output: 'NAME          TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE\nkubernetes    ClusterIP      10.96.0.1      <none>        443/TCP        5d\nbackend-svc   LoadBalancer   10.96.142.10   127.0.0.1     80:31234/TCP   10m'
      },
      {
        command: 'kubectl expose deployment <name> --port=<P>',
        description: { en: 'Expose a Deployment as a Service on specified port', it: 'Esponi un Deployment come Servizio di rete sulla porta specificata' },
        example: 'kubectl expose deployment backend-api --type=LoadBalancer --port=80',
        output: 'service/backend-api exposed'
      },
      {
        command: 'kubectl scale deployment <name> --replicas=<N>',
        description: { en: 'Dynamically scale the number of Pod replicas up or down instantly', it: 'Scala dinamicamente il numero di repliche di un Deployment all\'istante' },
        example: 'kubectl scale deployment backend-api --replicas=5',
        output: 'deployment.apps/backend-api scaled'
      },
      {
        command: 'kubectl rollout restart deployment <name>',
        description: { en: 'Sequentially restart all Pods in a Deployment with zero downtime', it: 'Riavvia in sequenza tutti i Pod di un Deployment senza alcun downtime' },
        example: 'kubectl rollout restart deployment backend-api',
        output: 'deployment.apps/backend-api restarted'
      },
      {
        command: 'kubectl rollout status deployment <name>',
        description: { en: 'Watch the real-time progress of a deployment update rollout', it: 'Osserva in tempo reale l\'avanzamento del rollout di aggiornamento di un deployment' },
        example: 'kubectl rollout status deployment backend-api',
        output: 'Waiting for deployment "backend-api" rollout to finish: 1 of 3 updated replicas are available...\ndeployment "backend-api" successfully rolled out'
      },
      {
        command: 'kubectl exec -it <pod-name> -- sh',
        description: { en: 'Open an interactive shell session inside a running Pod container', it: 'Apri una sessione shell interattiva all\'interno di un Pod in esecuzione' },
        example: 'kubectl exec -it backend-api-7b8c9d0e1-x2y3z -- sh',
        output: '/app # hostname\nbackend-api-7b8c9d0e1-x2y3z'
      },
      {
        command: 'kubectl port-forward pod/<pod> <hostPort>:<podPort>',
        description: { en: 'Forward a local port to a specific port on a Pod for testing', it: 'Inoltra una porta locale verso una porta del Pod per test locali' },
        example: 'kubectl port-forward pod/backend-api-7b8c9d0e1-x2y3z 8080:80',
        output: 'Forwarding from 127.0.0.1:8080 -> 80\nHandling connection for 8080'
      }
    ]
  },
  {
    title: { en: 'Advanced', it: 'Avanzato' },
    level: 'advanced',
    commands: [
      {
        command: 'kubectl get configmaps',
        description: { en: 'List all plain-text configuration objects (or kubectl get cm)', it: 'Elenca tutti gli oggetti di configurazione in chiaro (o kubectl get cm)' },
        example: 'kubectl get cm',
        output: 'NAME         DATA   AGE\napp-config   2      2h'
      },
      {
        command: 'kubectl get secrets',
        description: { en: 'List all Base64 sensitive data Secrets in current namespace', it: 'Elenca tutti i Secret per i dati sensibili nel namespace corrente' },
        example: 'kubectl get secrets',
        output: 'NAME             TYPE     DATA   AGE\ndb-credentials   Opaque   2      2h'
      },
      {
        command: 'kubectl get pvc',
        description: { en: 'List all PersistentVolumeClaims and their binding status', it: 'Elenca tutte le richieste PersistentVolumeClaim ed il loro stato di collegameto' },
        example: 'kubectl get pvc',
        output: 'NAME           STATUS   VOLUME                                     CAPACITY   ACCESS MODES   AGE\ndatabase-pvc   Bound    pvc-1f2e3d4c-5b6a-7f8e-9d0c-1a2b3c4d5e6f   20Gi       RWO            1h'
      },
      {
        command: 'kubectl get pv',
        description: { en: 'List physical PersistentVolumes available in the cluster', it: 'Elenca i PersistentVolume fisici disponibili nel cluster' },
        example: 'kubectl get pv',
        output: 'NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                  AGE\npvc-1f2e3d4c-5b6a-7f8e-9d0c-1a2b3c4d5e6f   20Gi       RWO            Delete           Bound    default/database-pvc   1h'
      },
      {
        command: 'kubectl top pods',
        description: { en: 'Display real-time CPU and Memory usage per Pod (requires metrics-server)', it: 'Mostra il consumo in tempo reale di CPU e Memoria per Pod (richiede metrics-server)' },
        example: 'kubectl top pods',
        output: 'NAME                           CPU(cores)   MEMORY(bytes)\nbackend-api-7b8c9d0e1-x2y3z   12m          45Mi\nbackend-api-7b8c9d0e1-a1b2c   8m           42Mi'
      },
      {
        command: 'kubectl top nodes',
        description: { en: 'Display real-time CPU and Memory resource consumption per worker node', it: 'Mostra il consumo in tempo reale di risorse CPU e Memoria per ogni nodo worker' },
        example: 'kubectl top nodes',
        output: 'NAME       CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%\nminikube   340m         8%     1850Mi          23%'
      },
      {
        command: 'kubectl create secret generic <name> --from-literal=key=val',
        description: { en: 'Create a Secret resource directly from command line arguments', it: 'Crea una risorsa Secret direttamente da argomenti a riga di comando' },
        example: 'kubectl create secret generic db-pass --from-literal=password=supersecret',
        output: 'secret/db-pass created'
      },
      {
        command: 'kubectl get all',
        description: { en: 'List all workload components (Pods, Services, Deployments, ReplicaSets)', it: 'Elenca tutti i componenti principali del workload (Pod, Servizi, Deployment, ReplicaSet)' },
        example: 'kubectl get all',
        output: 'NAME                              READY   STATUS    RESTARTS   AGE\npod/backend-api-7b8c9d0e1-x2y3z   1/1     Running   0          2h\n\nNAME                  TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE\nservice/backend-api   LoadBalancer   10.96.142.10   127.0.0.1     80/TCP    2h\n\nNAME                          READY   UP-TO-DATE   AVAILABLE   AGE\ndeployment.apps/backend-api   1/1     1            1           2h'
      }
    ]
  }
];
