import type { Module } from '../git/modules'

export const DOCKER_MODULES: Module[] = [
  {
    id: 'docker-1',
    track: 'docker',
    order: 1,
    title: 'What is a Container?',
    subtitle: 'Ships, not virtual machines',
    emoji: '🐳',
    duration: '10 min',
    xpReward: 50,
    funFact: 'The word "Docker" refers to a dock worker who loads and unloads ships. A perfect metaphor for moving software containers!',
    sections: [
      {
        type: 'intro',
        content: 'In the old days, software worked on one machine but failed on another. "It works on my machine" became the developer\'s excuse. Docker solved this by putting everything an app needs into a portable container.'
      },
      {
        type: 'concept',
        title: '📦 Why not just use a Virtual Machine?',
        content: 'To understand containers, we must understand the old way of doing things: Virtual Machines (VMs).'
      },
      {
        type: 'flowchart',
        content: '',
        diagramSteps: [
          { label: 'VM\n(Heavy)', icon: '🖥️', color: '#ff4b4b' },
          { label: 'Hypervisor\n(Full OS)', icon: '🛡️', color: '#ffd166' },
          { label: 'Container\n(Light)', icon: '🐳', color: '#06d6a0' },
          { label: 'Docker Engine\n(Shared OS)', icon: '⚙️', color: '#118ab2' }
        ]
      },
      {
        type: 'table',
        title: '📊 VM vs Container Comparison',
        content: 'Instead of running a full Guest OS inside a "fake computer", a Container just shares the host kernel:',
        tableData: {
          headers: ['Feature', 'Virtual Machine (VM)', 'Container (Docker)'],
          rows: [
            ['**Architecture**', 'Hardware → Hypervisor → **Guest OS** → App', 'Hardware → Host OS → **Docker Engine** → App'],
            ['**Size**', 'Gigabytes (GBs) per machine', 'Megabytes (MBs) per container'],
            ['**Startup Time**', 'Minutes (Booting a full OS)', 'Seconds (Just starting a process)'],
            ['**Isolation**', 'Complete, hardware-level isolation', 'Process-level isolation'],
            ['**Overhead**', 'High resource consumption', 'Extremely lightweight']
          ]
        }
      },
      {
        type: 'flowchart',
        content: '**The Shipping Container Analogy**\nBefore standard containers, moving software was exactly like moving random-sized cargo. Docker standardized the shape!',
        diagramSteps: [
          { label: 'Developer Laptop\n(Pack)', icon: '💻', color: '#118ab2' },
          { label: 'Standard Docker Image\n(Container)', icon: '📦', color: '#ffb703' },
          { label: 'Cloud Servers\n(Ship)', icon: '☁️', color: '#06d6a0' },
          { label: 'Runs Exactly the Same\n(Deliver)', icon: '✅', color: '#118ab2' }
        ]
      },
      {
        type: 'animation',
        content: 'Shipping Container visualization'
      },
      {
        type: 'game',
        title: 'Challenge: The Lifecycle',
        content: 'Put the steps of the Docker workflow in the correct sequence.',
        gameType: 'drag-order',
        gameData: [
          { id: '1', label: 'Write a Dockerfile' },
          { id: '2', label: 'Run "docker build" to create an Image' },
          { id: '3', label: 'Run "docker push" to Registry' },
          { id: '4', label: 'Run "docker run" to create a Container' }
        ]
      },
      {
        type: 'tip',
        title: '💡 Key Takeaway',
        content: 'A container is a standardized unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.'
      }
    ],
    quiz: [
      {
        id: 'docker-1-q1',
        question: 'What is the primary difference between a Container and a VM?',
        options: [
          'Containers are more secure than VMs',
          'Containers share the host OS kernel, while VMs include a full OS',
          'VMs are faster to start than containers',
          'Containers can only run on Linux'
        ],
        correct: 1,
        explanation: 'Containers are lightweight because they share the host operating system kernel. VMs are "heavyweight" because they each run their own full copy of an OS.'
      },
      {
        id: 'docker-1-q2',
        question: 'What problem did Docker primarily solve?',
        options: [
          'Slow internet speeds',
          'The "works on my machine" problem by ensuring environment consistency',
          'The need for more hard drive space',
          'Writing better CSS code'
        ],
        correct: 1,
        explanation: 'By packaging an app with its exact environment, Docker ensures it runs the same way in development, testing, and production.'
      }
    ]
  },
  {
    id: 'docker-2',
    track: 'docker',
    order: 2,
    title: 'The Whale & The Dock',
    subtitle: 'Origins and the 2013 revolution',
    emoji: '🐋',
    duration: '6 min',
    xpReward: 50,
    funFact: 'Docker was originally an internal project at a company called dotCloud. They open-sourced it in 2013 and it took the world by storm.',
    sections: [
      {
        type: 'intro',
        content: 'Why is the logo a whale? Why is it called Docker? Understanding the culture helps you understand the tool.'
      },
      {
        type: 'flowchart',
        content: '**The Docker Revolution Timeline**',
        diagramSteps: [
          { label: 'Pre-2013\n(Messy VMs)', icon: '🖥️', color: '#ff4b4b' },
          { label: '2013: dotCloud\n(Open Sourced)', icon: '🔓', color: '#ffb703' },
          { label: '2015: Docker Inc.\n(Explosion)', icon: '🚀', color: '#118ab2' },
          { label: 'Today\n(Industry Standard)', icon: '🌍', color: '#06d6a0' }
        ]
      },
      {
        type: 'concept',
        title: '📍 The "Dock" in Docker',
        content: 'A "Docker" is a person who works at a port (a dock worker). Just as dockers load standardized metal containers onto any ship, Docker (the software) loads standardized software containers onto any server.'
      },
      {
        type: 'concept',
        title: '🐳 Moby Dock: The Whale',
        content: 'The Docker whale is named **Moby Dock**. The whale represents the massive platform that carries the heavy load of your applications. It\'s a symbol of strength, reliability, and the ability to travel across different "oceans" (environments).'
      },
      {
        type: 'tip',
        title: '🚀 The 2013 Turning Point',
        content: 'Container technology existed before 2013 (like LXC), but it was very hard to use. Solomon Hykes and the dotCloud team made containers **accessible to mortals** by providing a simple CLI and a way to share images.'
      }
    ],
    quiz: [
      {
        id: 'docker-2-q1',
        question: 'What was the company name where Docker was originally created?',
        options: ['Google', 'Amazon', 'dotCloud', 'Microsoft'],
        correct: 2,
        explanation: 'Docker started as an internal tool at dotCloud, a Platform-as-a-Service provider.'
      },
      {
        id: 'docker-2-q2',
        question: 'What is the name of the Docker Whale?',
        options: ['Willy', 'Moby Dock', 'Blue', 'Container Shark'],
        correct: 1,
        explanation: 'The official name of the Docker mascot is Moby Dock.'
      }
    ]
  },
  {
    id: 'docker-3',
    track: 'docker',
    order: 3,
    title: 'Images vs Containers',
    subtitle: 'Blueprint vs Live Instance',
    emoji: '🖼️',
    duration: '12 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'This is the most important concept in Docker. If you understand the difference between an Image and a Container, you\'ve won half the battle.'
      },
      {
        type: 'concept',
        title: '🖼️ The Image (The Blueprint)',
        content: 'An image is a **read-only** template. It contains the OS, the app code, and the libraries. It doesn\'t "run" — it just sits there. Think of it as a recipe in a cookbook or an ISO file for an OS.'
      },
      {
        type: 'concept',
        title: '📦 The Container (The Pizza)',
        content: 'A container is a **runnable instance** of an image. When you "run" an image, it becomes a container. You can have 10 containers running from the same 1 image. Think of the container as the pizza made from the recipe. Deleting a container does not affect the read-only image it was built from.'
      },
      {
        type: 'flowchart',
        content: '**One Image, Multiple Containers**',
        diagramSteps: [
          { label: 'Image\n(Read-Only)', icon: '🖼️', color: '#118ab2' },
          { label: 'Container A\n(Port 80)', icon: '📦', color: '#06d6a0' },
          { label: 'Container B\n(Port 81)', icon: '📦', color: '#06d6a0' }
        ]
      },
      {
        type: 'concept',
        title: '🍰 The Layer Cake',
        content: 'Docker images are made of **layers**. Every time you change something in an image, a new small layer is added. If you change your code but not your libraries, Docker only updates the code layer. This makes images incredibly fast to build and share!'
      },
      {
        type: 'flowchart',
        content: '**Image Architecture (Layers)**',
        diagramSteps: [
          { label: 'Base OS\n(Ubuntu 50MB)', icon: '🐧', color: '#ff4b4b' },
          { label: 'Dependencies\n(Node.js 20MB)', icon: '📚', color: '#ffd166' },
          { label: 'Your App\n(index.js 2KB)', icon: '💻', color: '#06d6a0' },
          { label: 'R/W Layer\n(Container)', icon: '✏️', color: '#118ab2' }
        ]
      },
      {
        type: 'game',
        title: 'Challenge: Identify the Layer',
        content: 'Correctly identify where each element belongs in a Docker image stack.',
        gameType: 'drag-classify',
        gameData: {
          categories: [
            { id: 'readonly', label: 'Read-Only (Image)' },
            { id: 'writeable', label: 'Writeable (Container)' }
          ],
          items: [
            { id: 'os', label: 'Ubuntu OS', categoryId: 'readonly' },
            { id: 'node', label: 'Node.js Runtime', categoryId: 'readonly' },
            { id: 'code', label: 'My index.js', categoryId: 'readonly' },
            { id: 'logs', label: 'Runtime Log files', categoryId: 'writeable' },
            { id: 'temp', label: 'Temporary cache', categoryId: 'writeable' }
          ]
        }
      },
      {
        type: 'code',
        title: 'Basic CLI Commands',
        content: 'Try these in your terminal (if you have Docker installed):',
        code: `# Download an image from Hub
docker pull alpine

# See your images
docker images

# Run a container from an image
docker run alpine echo "Hello World"

# See running containers
docker ps

# See ALL containers (including stopped ones)
docker ps -a`,
        language: 'bash'
      }
    ],
    quiz: [
      {
        id: 'docker-3-q1',
        question: 'An Image is to a Container as a...',
        options: [
          'Computer is to a Mouse',
          'Recipe is to a Pizza',
          'File is to a Folder',
          'User is to a Password'
        ],
        correct: 1,
        explanation: 'An image is the static template (recipe), and a container is the live, running instance (pizza).'
      },
      {
        id: 'docker-3-q2',
        question: 'What happens to the Image when a Container is deleted?',
        options: [
          'The image is also deleted',
          'The image remains unchanged',
          'The image is corrupted',
          'The image gets larger'
        ],
        correct: 1,
        explanation: 'Images are read-only templates. Containers are temporary instances. Deleting a container has no effect on the image it was built from.'
      }
    ]
  },
  {
    id: 'docker-4',
    track: 'docker',
    order: 4,
    title: 'The Dockerfile',
    subtitle: 'Building your own custom image',
    emoji: '📝',
    duration: '15 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'How do you create your own images? You write a **Dockerfile** — a simple text file with instructions on how to build the environment.'
      },
      {
        type: 'game',
        title: 'Challenge: Dockerfile Builder',
        content: 'Order the instructions correctly to create a functional Dockerfile (from base to execution).',
        gameType: 'drag-order',
        gameData: [
          { id: '1', label: 'FROM alpine' },
          { id: '2', label: 'WORKDIR /app' },
          { id: '3', label: 'COPY . .' },
          { id: '4', label: 'RUN npm install' },
          { id: '5', label: 'CMD ["node", "app.js"]' }
        ]
      },
      {
        type: 'flowchart',
        content: '**The Docker Build Pipeline**',
        diagramSteps: [
          { label: 'Dockerfile\n(Code)', icon: '📝', color: '#ffd166' },
          { label: '`docker build`\n(Compile)', icon: '🔨', color: '#ffb703' },
          { label: 'Image\n(Artifact)', icon: '🖼️', color: '#118ab2' },
          { label: '`docker run`\n(Execute)', icon: '▶️', color: '#06d6a0' },
          { label: 'Container\n(Live App)', icon: '📦', color: '#06d6a0' }
        ]
      },
      {
        type: 'code',
        title: 'A simple Dockerfile example',
        content: 'Let\'s package a simple Python app:',
        code: `# 1. Choose a base image
FROM python:3.9-slim

# 2. Set the working directory
WORKDIR /app

# 3. Copy your app files
COPY . .

# 4. Install dependencies
RUN pip install flask

# 5. Define the command to run
CMD ["python", "app.py"]`,
        language: 'dockerfile'
      },
      {
        type: 'table',
        title: '🛠️ Core Instructions Reference',
        content: 'These five instructions cover 90% of your Dockerfile needs:',
        tableData: {
          headers: ['Instruction', 'Purpose', 'When does it execute?'],
          rows: [
            ['**FROM**', 'Defines the base image to start from', 'Build Phase (Step 1)'],
            ['**WORKDIR**', 'Sets the active directory inside the container', 'Build Phase'],
            ['**COPY**', 'Copies files from your laptop into the image', 'Build Phase'],
            ['**RUN**', 'Executes shell commands (like `apt install` or `pip install`)', 'Build Phase'],
            ['**CMD**', 'Defines the default command that runs when the container starts', '**Runtime** (When you `docker run`)']
          ]
        }
      },
      {
        type: 'flowchart',
        content: '**Understanding Build Cache**\nDocker caches each layer. If layer 3 changes, only layer 3 and below are rebuilt!',
        diagramSteps: [
          { label: 'Layer 1: FROM\n(Cached)', icon: '✅', color: '#06d6a0' },
          { label: 'Layer 2: COPY reqs\n(Cached)', icon: '✅', color: '#06d6a0' },
          { label: 'Layer 3: COPY app.py\n(Changed!)', icon: '⚠️', color: '#ff4b4b' },
          { label: 'Layer 4: CMD\n(Rebuilt)', icon: '⏳', color: '#ffb703' }
        ]
      }
    ],
    quiz: [
      {
        id: 'docker-4-q1',
        question: 'Which Dockerfile instruction specifies the starting base image?',
        options: ['START', 'BASE', 'FROM', 'ROOT'],
        correct: 2,
        explanation: 'Every Dockerfile must start with a `FROM` instruction to specify which parent image to build upon.'
      },
      {
        id: 'docker-4-q2',
        question: 'What is the difference between RUN and CMD?',
        options: [
          'There is no difference',
          'RUN executes during the build process; CMD executes when the container starts',
          'RUN starts the container; CMD installs software',
          'RUN is for Windows; CMD is for Linux'
        ],
        correct: 1,
        explanation: '`RUN` is used to build the image (installing things), while `CMD` is the default command that runs every time a container is launched from that image.'
      }
    ]
  },
  {
    id: 'docker-5',
    track: 'docker',
    order: 5,
    title: 'Docker Hub & Registry',
    subtitle: 'The App Store for Containers',
    emoji: '📦',
    duration: '10 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'You don\'t have to build everything from scratch. Docker Hub is a massive public library of pre-built images for almost any software you can imagine.'
      },
      {
        type: 'concept',
        title: '🏠 Docker Hub',
        content: 'The official cloud registry for Docker images. You can find "Official Images" for Linux (Ubuntu, Alpine), Databases (PostgreSQL, Redis), and Languages (Node, Python, Go).'
      },
      {
        type: 'flowchart',
        content: '**The Push & Pull Cycle**',
        diagramSteps: [
          { label: 'Developer A\n(Laptop)', icon: '💻', color: '#ffb703' },
          { label: '`docker push`\n(Upload)', icon: '⬆️', color: '#118ab2' },
          { label: 'Docker Hub\n(Registry)', icon: '☁️', color: '#06d6a0' },
          { label: '`docker pull`\n(Download)', icon: '⬇️', color: '#118ab2' },
          { label: 'Prod Server\n(Cloud)', icon: '☁️', color: '#ffb703' }
        ]
      },
      {
        type: 'table',
        title: '🏷️ Image Tags Best Practices',
        content: 'Versioning your images is crucial for stability:',
        tableData: {
          headers: ['Tag Strategy', 'Example', 'When to use', 'Risk Level'],
          rows: [
            ['**Specific Version**', '`python:3.9.15`', 'Production environments', '🟢 Low'],
            ['**Minor Version**', '`python:3.9`', 'Development, accepting small updates', '🟡 Medium'],
            ['**Floating Version**', '`python:3`', 'Local testing only', '🔴 High'],
            ['**Latest**', '`python:latest`', 'Trying things quickly', '🔥 Very High (Never use in Prod)']
          ]
        }
      },
      {
        type: 'code',
        title: 'Pushing your own image',
        content: 'Share your work with the world (or your team):',
        code: `# 1. Tag your image with your username
docker tag my-app claudio/my-app:v1.0

# 2. Login
docker login

# 3. Push!
docker push claudio/my-app:v1.0`,
        language: 'bash'
      }
    ],
    quiz: [
      {
        id: 'docker-5-q1',
        question: 'What is Docker Hub?',
        options: [
          'A hardware device for Docker',
          'A central public registry for sharing and finding Docker images',
          'The Docker customer support portal',
          'A brand of shipping containers'
        ],
        correct: 1,
        explanation: 'Docker Hub is the official repository for finding and sharing container images.'
      }
    ]
  },
  {
    id: 'docker-6',
    track: 'docker',
    order: 6,
    title: 'Volumes & Persistence',
    subtitle: 'Where does the data go?',
    emoji: '💾',
    duration: '15 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'Containers are "ephemeral" — if you delete a container, everything inside it is gone forever. How do we keep our database data safe?'
      },
      {
        type: 'concept',
        title: '🧱 The Problem: Ephemeral Storage',
        content: 'When a container writes a file to its own disk, that file exists in a "writable layer" specific to that container instance. Delete the container, lose the files.'
      },
      {
        type: 'flowchart',
        content: '**Ephemeral Data (Dangerous ❌)**',
        diagramSteps: [
          { label: 'Database App\n(Running)', icon: '🐘', color: '#ffb703' },
          { label: 'Writes to\nContainer Disk', icon: '📝', color: '#ff4b4b' },
          { label: 'Container Dies\n(Crash)', icon: '💥', color: '#ff4b4b' },
          { label: 'Data is\nGone Forever!', icon: '💀', color: '#000000' }
        ]
      },
      {
        type: 'concept',
        title: '🔗 The Solution: Volumes',
        content: 'Volumes are folders on your **host machine** that are "mounted" into the container. The container thinks it\'s writing to its own disk, but it\'s actually writing to your host machine. If the container dies, the data stays safe on the host.'
      },
      {
        type: 'flowchart',
        content: '**Persistent Data with Volumes (Safe ✅)**',
        diagramSteps: [
          { label: 'Database App\n(Running)', icon: '🐘', color: '#ffb703' },
          { label: 'Writes to Volume\n(Mapped)', icon: '🔗', color: '#118ab2' },
          { label: 'Host Machine\n(Laptop/Server)', icon: '💾', color: '#06d6a0' },
          { label: 'Container Dies\n(Data survives)', icon: '🛡️', color: '#06d6a0' }
        ]
      },
      {
        type: 'code',
        title: 'Mounting a volume',
        content: 'Keep your DB data safe:',
        code: `# -v [host-path]:[container-path]
docker run -d \
  -v /my/db/data:/var/lib/postgresql/data \
  postgres`,
        language: 'bash'
      }
    ],
    quiz: [
      {
        id: 'docker-6-q1',
        question: 'What happens to data stored *inside* a container\'s writable layer when the container is deleted?',
        options: [
          'It is moved to the host automatically',
          'It is deleted permanently',
          'It is stored in Docker Hub',
          'Nothing, it remains on the disk'
        ],
        correct: 1,
        explanation: 'Without volumes, data in a container is ephemeral — it disappears when the container is removed.'
      }
    ]
  },
  {
    id: 'docker-7',
    track: 'docker',
    order: 7,
    title: 'Networking & Ports',
    subtitle: 'Talking to the outside world',
    emoji: '🔌',
    duration: '12 min',
    xpReward: 50,
    sections: [
      {
        type: 'intro',
        content: 'A container running a web server is useless if no one can reach it. We need to bridge the gap between the container\'s internal network and our computer.'
      },
      {
        type: 'concept',
        title: '🚪 Port Mapping',
        content: 'By default, containers are isolated. To expose a web app running on port 80 inside the container, we map it to a port on our machine.\n\nSyntax: `-p [hostPort]:[containerPort]`\n\nThe `hostPort` is what you type in your browser (e.g., `localhost:3000`).'
      },
      {
        type: 'flowchart',
        content: '**How Port Mapping Works (`-p 8080:80`)**',
        diagramSteps: [
          { label: 'Browser\n(localhost:8080)', icon: '🌍', color: '#118ab2' },
          { label: 'Host Port Tracker\n(Docker Daemon)', icon: '🚪', color: '#ffb703' },
          { label: 'Container Port 80\n(Nginx web server)', icon: '📦', color: '#06d6a0' }
        ]
      },
      {
        type: 'code',
        title: 'Running a web server',
        content: 'Map internal port 80 to external 8080:',
        code: `docker run -d -p 8080:80 nginx`,
        language: 'bash'
      },
      {
        type: 'concept',
        title: '🌐 Docker Networks',
        content: 'Docker can create virtual internal networks where containers can talk to each other by their **name**. A "web" container can talk to a "db" container without exposing the database to the internet.'
      },
      {
        type: 'flowchart',
        content: '**Internal Docker Network**',
        diagramSteps: [
          { label: 'Web Container\n(Wordpress)', icon: '🌐', color: '#06d6a0' },
          { label: 'Isolated Bridge\n("my-network")', icon: '🔌', color: '#ffb703' },
          { label: 'DB Container\n(MySQL)', icon: '🗄️', color: '#ff4b4b' }
        ]
      }
    ],
    quiz: [
      {
        id: 'docker-7-q1',
        question: 'If you run `docker run -p 3000:80 my-app`, which port do you use in your browser?',
        options: ['80', '3000', 'No port needed', '8080'],
        correct: 1,
        explanation: 'The first number is the host port. You would visit `localhost:3000` to reach the container\'s internal port 80.'
      }
    ]
  },
  {
    id: 'docker-8',
    track: 'docker',
    order: 8,
    title: 'Docker Compose',
    subtitle: 'YAML orchestration for multi-container apps',
    emoji: '🐙',
    duration: '20 min',
    xpReward: 80,
    sections: [
      {
        type: 'intro',
        content: 'Real applications have a database, a cache, a frontend, and a backend. Managing 4 `docker run` commands manually is a nightmare. Enter Docker Compose.'
      },
      {
        type: 'table',
        title: '📝 The docker-compose.yml Reference',
        content: 'Compose uses a YAML file to configure services. Here are the core keys:',
        tableData: {
          headers: ['Property', 'What it does', 'Example'],
          rows: [
            ['`services:`', 'Defines the containers (web, db, redis)', '`services: web:`'],
            ['`image:`', 'Specifies the Docker Hub image to use', '`image: postgres:15`'],
            ['`build:`', 'Tells Compose to build a Dockerfile instead of pulling', '`build: ./frontend`'],
            ['`ports:`', 'Maps host ports to container ports', '`ports: - "5000:80"`'],
            ['`depends_on:`', 'Boot order (e.g. start DB before Web)', '`depends_on: - db`'],
            ['`volumes:`', 'Persists data to the host machine', '`volumes: - db-data:/var/lib/xyz`']
          ]
        }
      },
      {
        type: 'flowchart',
        content: '**Multi-service Architecture**\nA single docker-compose project running many containers linked together.',
        diagramSteps: [
          { label: 'Web Frontend\n(React)', icon: '🌍', color: '#118ab2' },
          { label: 'Backend API\n(Node.js)', icon: '⚙️', color: '#06d6a0' },
          { label: 'Redis Cache\n(Memory)', icon: '⚡', color: '#ff4b4b' },
          { label: 'Database\n(PostgreSQL)', icon: '🗄️', color: '#ffb703' }
        ]
      },
      {
        type: 'code',
        title: 'A full stack in one file',
        content: 'Save this as `docker-compose.yml`:',
        code: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "5000:5000"
  db:
    image: postgres
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`,
        language: 'yaml'
      },
      {
        type: 'concept',
        title: '📦 Optimization: Multi-stage Builds',
        content: 'To keep production images small, Docker supports **multi-stage builds**. You use one "heavy" image (with build tools) to compile your app, then copy only the final binary into a "lightweight" image (like Alpine Linux) for production. This can reduce image size from 1GB to 50MB!'
      },
      {
        type: 'flowchart',
        content: '**Multi-stage Build Process**',
        diagramSteps: [
          { label: 'Stage 1: Build\n(Heavy Image: 1GB)', icon: '🔨', color: '#ffb703' },
          { label: 'Copy final binary\n(Extract)', icon: '✂️', color: '#ff4b4b' },
          { label: 'Stage 2: Runtime\n(Light Image: 50MB)', icon: '🍃', color: '#06d6a0' },
          { label: 'Lean Prod Container\n(Ship!)', icon: '🚀', color: '#118ab2' }
        ]
      },
      {
        type: 'code',
        title: 'The Magic Commands',
        content: 'Start everything at once (in the background) and stop it:',
        code: `# Start and run in background
docker-compose up -d

# Stop and remove containers and networks
docker-compose down`,
        language: 'bash'
      }
    ],
    quiz: [
      {
        id: 'docker-8-q1',
        question: 'What is the primary purpose of Docker Compose?',
        options: [
          'To code faster',
          'To manage multi-container applications using a single YAML file',
          'To replace Docker Hub',
          'To install Docker on Windows'
        ],
        correct: 1,
        explanation: 'Docker Compose allows you to define complex apps with multiple services (web, db, etc.) in a single file and control them with one command.'
      }
    ]
  },
  {
    id: 'docker-8b',
    track: 'docker',
    order: 9,
    title: 'Hands-on Labs: Docker Playground',
    subtitle: 'Free browser-based environments to practice Docker',
    emoji: '🎮',
    duration: '45+ min',
    xpReward: 80,
    externalLink: {
      label: 'Open Play with Docker',
      url: 'https://labs.play-with-docker.com',
      xpPrompt: 'How many labs/exercises did you complete? Enter the number to earn XP!'
    },
    sections: [
      {
        type: 'intro',
        content: 'Reading about Docker is one thing — running real containers is another. In this module we introduce **three completely free** resources to get your hands dirty without installing anything heavy.'
      },
      {
        type: 'concept',
        title: '🌐 Tool 1: Play with Docker (PWD)',
        content: '**Play with Docker** gives you a free, temporary Docker environment **right in your browser**. No installation, no setup.\n\n- Get a fresh Linux VM with Docker pre-installed\n- Create multiple instances (nodes) to simulate multi-node setups\n- Each session lasts **4 hours** — more than enough to experiment\n- Perfect for trying all the commands from modules 1-8\n\n🔗 **URL**: https://labs.play-with-docker.com'
      },
      {
        type: 'concept',
        title: '📚 Tool 2: Play with Docker Classroom',
        content: '**Docker Classroom** is the guided, structured version of PWD. It provides complete **step-by-step labs** with explanations.\n\n- Labs organized by difficulty: Beginner → Intermediate → Advanced\n- Topics include: first container, images, volumes, networking, Compose, Swarm\n- Each lab has built-in quizzes and verification steps\n- 100% free, browser-based\n\n🔗 **URL**: https://training.play-with-docker.com\n\n💡 **Recommended starting labs:**\n1. "Your First Linux Containers" (Beginner)\n2. "Doing More With Docker Images" (Beginner)\n3. "Docker Networking Hands-on Lab" (Intermediate)\n4. "Docker Compose with Swarm Secrets" (Advanced)'
      },
      {
        type: 'concept',
        title: '💻 Tool 3: Docker Desktop (Local)',
        content: '**Docker Desktop** (also called **Docker Personal**) is the official Docker application for your local machine.\n\n✅ **Free for**: personal use, education, open source, small businesses (< 250 employees & < $10M revenue)\n⚠️ **Paid plans required for**: large enterprise use\n\n- Download: https://www.docker.com/products/docker-desktop/\n- Available for Windows, Mac (Intel & Apple Silicon), Linux\n- Includes Docker Engine, Docker CLI, Docker Compose, Kubernetes (single-node)\n- GUI dashboard for managing containers, images, and volumes'
      },
      {
        type: 'tip',
        title: '🎯 Which should I start with?',
        content: '**Just exploring?** → Play with Docker (zero install, instant)\n\n**Want structured learning?** → Play with Docker Classroom (guided labs)\n\n**Ready for daily use?** → Docker Desktop on your machine\n\n🏆 We recommend completing at least 3 Classroom labs before moving to the Final Quiz!'
      }
    ]
  },
  {
    id: 'docker-9',
    track: 'docker',
    order: 10,
    title: 'Final Docker Quiz',
    subtitle: 'The Whale Master Certification',
    emoji: '🏅',
    duration: '20 min',
    xpReward: 150,
    sections: [
      {
        type: 'intro',
        content: 'Time to prove your container mastery. 15 questions covering build, run, volumes, networking, and compose. Good luck!'
      }
    ],
    quiz: [
      {
        id: 'docker-9-q1',
        question: 'Which is NOT a benefit of containers?',
        options: ['Lightweight', 'Fast startup', 'Include a full Guest OS', 'Portable'],
        correct: 2,
        explanation: 'VMs include a full guest OS; containers share the host kernel.'
      },
      {
        id: 'docker-9-q2',
        question: 'Instruction to copy local file "app.js" to "/app" in image:',
        options: ['ADD app.js /app', 'RUN cp app.js /app', 'COPY app.js /app', 'MOVE app.js /app'],
        correct: 2,
        explanation: '`COPY` is the standard instruction for moving files from host to image.'
      },
      {
        id: 'docker-9-q3',
        question: 'Command to see all containers (including stopped ones):',
        options: ['docker ps', 'docker ls', 'docker ps -a', 'docker list'],
        correct: 2,
        explanation: '`-a` (or `--all`) shows both running and stopped containers.'
      },
      {
        id: 'docker-9-q4',
        question: 'How do you stop all containers in a Compose file?',
        options: ['docker-compose stop', 'docker-compose down', 'docker-compose kill', 'docker-compose quit'],
        correct: 1,
        explanation: '`docker-compose down` stops and REMOVES containers, networks, and images (but not volumes by default).'
      },
      {
        id: 'docker-9-q5',
        question: 'What is a multi-stage build?',
        options: [
          'Building for both Windows and Linux',
          'Using multiple FROM statements to keep the final image small by leaving build-tools behind',
          'Having multiple developers build at once',
          'Using multiple Docker Hub accounts'
        ],
        correct: 1,
        explanation: 'Multi-stage builds let you use one image to build your app and another smaller one to run it, resulting in a tiny production image.'
      }
    ]
  }
]
