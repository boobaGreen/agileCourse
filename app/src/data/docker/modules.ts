import type { Module } from '../git/modules'

export const DOCKER_MODULES: Module[] = [
  {
    id: 'docker-1',
    track: 'git', // We'll update the type but for now the interface says 'git'. I should really update the interface in git/modules.ts
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
        content: '**Virtual Machines (VMs)** include a full copy of an operating system. They are heavy, slow to start, and consume GBs of RAM.\n\n**Containers** share the host machine\'s OS kernel. They are lightweight, start in seconds, and use very little memory. Think of a VM as a whole house and a Container as a specialized room in an apartment building.'
      },
      {
        type: 'analogy',
        title: '🚢 The Shipping Container Analogy',
        content: 'Before standard shipping containers, moving goods was a mess. Every ship had to be loaded differently. With standard containers, a crane doesn\'t care if it\'s moving TVs or bananas. Docker does the same for software: the server doesn\'t care if it\'s running Java or Python — it just runs the container.'
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
        type: 'concept',
        title: '🍰 The Layer Cake',
        content: 'Docker images are made of **layers**. Every time you change something in an image, a new small layer is added. If you change your code but not your libraries, Docker only updates the code layer. This makes images incredibly fast to build and share!'
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
        type: 'concept',
        title: '🛠️ Common Instructions',
        content: '**FROM**: The starting point (usually an OS or language runtime)\n**WORKDIR**: The directory where commands will run\n**COPY**: Move files from your computer into the image\n**RUN**: Run a command during the *build* (like installing software)\n**CMD**: The command the container runs *when it starts*'
      },
      {
        type: 'tip',
        title: '💡 Build caching',
        content: 'Docker remembers each line. If you don\'t change the first 3 lines, it won\'t re-run them. This is why you should copy your `requirements.txt` and run `pip install` **before** copying your whole project code!'
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
        type: 'concept',
        title: '🏷️ Image Tags',
        content: 'Images have versions called **tags**. For example `python:3.9` and `python:3.10`. The tag `latest` usually points to the most recent version, but it\'s better to use specific numbers for stability!'
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
        type: 'concept',
        title: '🔗 The Solution: Volumes',
        content: 'Volumes are folders on your **host machine** that are "mounted" into the container. The container thinks it\'s writing to its own disk, but it\'s actually writing to your host machine. If the container dies, the data stays safe on the host.'
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
        type: 'concept',
        title: '📝 The docker-compose.yml',
        content: 'Compose is a tool for defining and running multi-container Docker applications. You use a YAML file to configure your application\'s services.'
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
