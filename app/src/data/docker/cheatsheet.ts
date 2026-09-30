import type { LocalizedString } from '../types';

export interface CheatsheetCommand {
  command: string;
  description: LocalizedString;
  visualType?: string;
  visualHighlight?: string;
  example?: string;
  output?: string;
}

export interface CheatsheetCategory {
  title: LocalizedString;
  level: 'beginner' | 'intermediate' | 'advanced';
  commands: CheatsheetCommand[];
}

export const DOCKER_CHEATSHEET: CheatsheetCategory[] = [
  {
    title: { en: 'Beginner', it: 'Principiante' },
    level: 'beginner',
    commands: [
      {
        command: 'docker run <image>',
        description: { en: 'Create and start a new container from an image', it: 'Crea e avvia un nuovo container da un\'immagine' },
        example: 'docker run -d -p 8080:80 --name my-web nginx:alpine',
        output: '4a2f8b1c9d0e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a'
      },
      {
        command: 'docker ps',
        description: { en: 'List running containers (-a to show all including stopped)', it: 'Elenca i container in esecuzione (-a per includere quelli arrestati)' },
        example: 'docker ps -a',
        output: 'CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                  NAMES\n4a2f8b1c9d0e   nginx:alpine   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:8080->80/tcp   my-web'
      },
      {
        command: 'docker stop <container>',
        description: { en: 'Stop one or more running containers gracefully', it: 'Arresta uno o più container in esecuzione in modo sicuro' },
        example: 'docker stop my-web',
        output: 'my-web'
      },
      {
        command: 'docker start <container>',
        description: { en: 'Start one or more stopped containers', it: 'Avvia uno o più container arrestati' },
        example: 'docker start my-web',
        output: 'my-web'
      },
      {
        command: 'docker rm <container>',
        description: { en: 'Remove one or more stopped containers (-f to force active ones)', it: 'Rimuovi uno o più container arrestati (-f per forzare quelli attivi)' },
        example: 'docker rm -f my-web',
        output: 'my-web'
      },
      {
        command: 'docker images',
        description: { en: 'List all locally downloaded container images', it: 'Elenca tutte le immagini container scaricate in locale' },
        example: 'docker images',
        output: 'REPOSITORY   TAG       IMAGE ID       CREATED        SIZE\nnginx        alpine    9a2b3c4d5e6f   2 days ago     23.5MB\nnode         18-alpine 1f2e3d4c5b6a   1 week ago     174MB'
      },
      {
        command: 'docker rmi <image>',
        description: { en: 'Remove one or more images from local cache', it: 'Rimuovi una o più immagini dalla cache locale' },
        example: 'docker rmi nginx:alpine',
        output: 'Untagged: nginx:alpine\nDeleted: sha256:9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f'
      },
      {
        command: 'docker pull <image>',
        description: { en: 'Download an image from Docker Hub or registry without running it', it: 'Scarica un\'immagine da Docker Hub senza avviarla' },
        example: 'docker pull redis:7-alpine',
        output: '7-alpine: Pulling from library/redis\na2abf6c4d321: Pull complete\nDigest: sha256:4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e\nStatus: Downloaded newer image for redis:7-alpine'
      }
    ]
  },
  {
    title: { en: 'Intermediate', it: 'Intermedio' },
    level: 'intermediate',
    commands: [
      {
        command: 'docker exec -it <container> <cmd>',
        description: { en: 'Run an interactive shell command inside a running container', it: 'Esegui un comando o una shell interattiva dentro un container in esecuzione' },
        example: 'docker exec -it my-web sh',
        output: '/ # ls -la /usr/share/nginx/html\ntotal 8\ndrwxr-xr-x 2 root root 4096 Apr 27 10:00 .\n-rw-r--r-- 1 root root  615 Apr 27 10:00 index.html'
      },
      {
        command: 'docker logs <container>',
        description: { en: 'Fetch and stream stdout/stderr logs from a container (-f to follow)', it: 'Mostra e segui i log stdout/stderr di un container (-f per il live streaming)' },
        example: 'docker logs -f --tail 50 my-web',
        output: '172.17.0.1 - - [27/Apr/2026:10:15:30 +0000] "GET / HTTP/1.1" 200 615 "-" "Mozilla/5.0"\n172.17.0.1 - - [27/Apr/2026:10:15:31 +0000] "GET /favicon.ico HTTP/1.1" 404 153'
      },
      {
        command: 'docker build -t <name:tag> .',
        description: { en: 'Build a custom container image from a Dockerfile in current directory', it: 'Crea un\'immagine personalizzata da un Dockerfile nella cartella corrente' },
        example: 'docker build -t my-app:v1.0 .',
        output: '[+] Building 3.2s (8/8) FINISHED\n => [internal] load build definition from Dockerfile\n => [1/3] FROM docker.io/library/node:18-alpine\n => [2/3] COPY . /app\n => [3/3] RUN npm install --omit=dev\n => exporting to image my-app:v1.0'
      },
      {
        command: 'docker inspect <container|image>',
        description: { en: 'Return low-level JSON configuration details of container or image', it: 'Mostra la configurazione dettagliata in JSON di un container o immagine' },
        example: 'docker inspect my-web',
        output: '[\n  {\n    "Id": "4a2f8b1c9d0e...",\n    "Created": "2026-04-27T10:00:00Z",\n    "State": { "Status": "running", "Running": true },\n    "NetworkSettings": { "IPAddress": "172.17.0.2" }\n  }\n]'
      },
      {
        command: 'docker volume create <name>',
        description: { en: 'Create a managed volume for persistent container data storage', it: 'Crea un volume gestito per la persistenza dei dati dei container' },
        example: 'docker volume create db-data',
        output: 'db-data'
      },
      {
        command: 'docker volume ls',
        description: { en: 'List all managed volumes on the host system', it: 'Elenca tutti i volumi gestiti nel sistema host' },
        example: 'docker volume ls',
        output: 'DRIVER    VOLUME NAME\nlocal     db-data\nlocal     redis-cache'
      },
      {
        command: 'docker network create <name>',
        description: { en: 'Create a user-defined bridge network for container-to-container DNS resolution', it: 'Crea una rete bridge personalizzata per la risoluzione DNS automatica tra container' },
        example: 'docker network create backend-net',
        output: '8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e'
      }
    ]
  },
  {
    title: { en: 'Advanced', it: 'Avanzato' },
    level: 'advanced',
    commands: [
      {
        command: 'docker compose up -d',
        description: { en: 'Build, create, and start multi-container applications defined in docker-compose.yml', it: 'Crea e avvia in background l\'intera applicazione multi-container definita in docker-compose.yml' },
        example: 'docker compose up -d',
        output: '[+] Running 3/3\n ✔ Network app_backend-net  Created\n ✔ Container app-db-1       Started\n ✔ Container app-api-1      Started'
      },
      {
        command: 'docker compose down -v',
        description: { en: 'Stop and remove containers, networks, and volumes created by compose', it: 'Arresta e rimuovi container, reti e volumi creati da Compose' },
        example: 'docker compose down -v',
        output: '[+] Running 3/3\n ✔ Container app-api-1      Removed\n ✔ Container app-db-1       Removed\n ✔ Network app_backend-net  Removed'
      },
      {
        command: 'docker compose logs -f',
        description: { en: 'Stream logs from all services in real-time', it: 'Mostra i log in tempo reale di tutti i servizi gestiti da Compose' },
        example: 'docker compose logs -f --tail 20',
        output: 'api-1  | [INFO] Server started on port 3000\ndb-1   | 2026-04-27 10:30:00.123 UTC [1] LOG: database system is ready'
      },
      {
        command: 'docker system prune -a --volumes',
        description: { en: 'Clean up unused containers, networks, dangling images, and build cache', it: 'Pulisci tutti i container fermi, le reti non usate, le immagini orfane e la cache' },
        example: 'docker system prune -a',
        output: 'WARNING! This will remove all stopped containers, networks, and unused images.\nTotal reclaimed space: 1.45GB'
      },
      {
        command: 'docker stats',
        description: { en: 'Display a live streaming usage metrics (CPU, RAM, Network I/O) of containers', it: 'Mostra le metriche in tempo reale di utilizzo risorse (CPU, RAM, I/O di rete)' },
        example: 'docker stats',
        output: 'CONTAINER ID   NAME        CPU %     MEM USAGE / LIMIT     MEM %     NET I/O\n4a2f8b1c9d0e   my-web      0.02%     12.4MiB / 7.67GiB     0.16%     1.2kB / 648B'
      },
      {
        command: 'docker cp <src> <dest>',
        description: { en: 'Copy files or directories between container and host filesystem', it: 'Copia file o cartelle tra l\'host ed un container in esecuzione' },
        example: 'docker cp ./config.json my-web:/etc/app/config.json',
        output: 'Successfully copied 2.05kB to my-web:/etc/app/config.json'
      },
      {
        command: 'docker push <username/repo:tag>',
        description: { en: 'Upload a local image to Docker Hub or remote registry', it: 'Carica un\'immagine locale su Docker Hub o un registro remoto' },
        example: 'docker push myusername/app:v1.0',
        output: 'The push refers to repository [docker.io/myusername/app]\n5f70bf18a086: Pushed\nv1.0: digest: sha256:8a7b6c5d4e3f2a1b0c9d8e7f size: 948'
      }
    ]
  }
];
