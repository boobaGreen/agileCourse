import type { Module } from '../git/modules'

export const DOCKER_MODULES: Module[] = [
  {
    id: 'docker-1',
    track: 'docker',
    order: 1,
    title: 'What is a Container?',
    subtitle: 'Ships, not virtual machines',
    emoji: '🐳',
    duration: '15 min',
    xpReward: 100,
    funFact: 'The word "Docker" refers to a dock worker who loads and unloads ships. A perfect metaphor for moving software containers!',
    sections: [
      {
        type: 'intro',
        content: 'In the old days, software worked on one machine but failed on another. "It works on my machine" became the developer\'s excuse. Docker solved this by putting everything an app needs into a portable, standardized container.'
      },
      {
        type: 'video',
        title: '📺 Docker in 100 Seconds',
        content: 'A rapid, high-intensity breakdown of what Docker is and why it literally changed the entire tech industry.',
        videoUrl: 'https://www.youtube.com/watch?v=Gjnup-PuquQ'
      },
      {
        type: 'concept',
        title: '📦 Why not just use a Virtual Machine?',
        content: 'To understand containers, we must understand the old way of doing things: Virtual Machines (VMs). A VM runs a **full Guest Operating System** on top of virtualized hardware. It\'s slow to start and heavy on resources. A container, instead, shares the Host OS, making it start in milliseconds.'
      },
      {
        type: 'table',
        title: '📊 VM vs Container Comparison',
        content: 'Instead of running a full Guest OS inside a "fake computer", a Container just shares the host kernel:',
        tableData: {
          headers: ['Feature', 'Virtual Machine (VM) 🖥️', 'Container (Docker) 🐳'],
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
          { label: 'Dev Laptop\n(Messy Code)', icon: '💻', color: '#118ab2' },
          { label: 'Standard Docker Image\n(The Container)', icon: '📦', color: '#ffb703' },
          { label: 'Cloud Servers\n(The Ship)', icon: '☁️', color: '#06d6a0' },
          { label: 'Runs Exactly the Same\n(Delivery)', icon: '✅', color: '#118ab2' }
        ]
      },
      {
        type: 'video',
        title: '📺 Docker Architecture Full Breakdown',
        content: 'A fantastic visual explanation by TechWorld with Nana comparing VMs to Docker Engine.',
        videoUrl: 'https://www.youtube.com/watch?v=a1M_thDTqmU'
      },
      {
        type: 'tip',
        title: '💡 The Ultimate Takeaway',
        content: 'A container is a standardized unit of software that packages up code and all its dependencies so the application runs quickly and reliably from **any** computing environment to another.'
      }
    ],
    quiz: [
      {
        id: 'docker-1-q1',
        question: 'What is the primary architectural difference between a Container and a VM?',
        options: [
          'Containers are more secure than VMs at a hardware level',
          'Containers share the host OS kernel, while VMs include a full Guest OS',
          'VMs are faster to start than containers',
          'Containers can only run on Linux servers'
        ],
        correct: 1,
        explanation: 'Containers are lightweight because they share the host operating system kernel directly via the Docker Engine. VMs are "heavyweight" because each one boots an entirely separate OS on virtualized hardware.'
      },
      {
        id: 'docker-1-q2',
        question: 'What massive industry problem did Docker solve?',
        options: [
          'The lack of modern programming languages',
          'The "works on my machine" problem by ensuring perfect environment consistency',
          'The high cost of cloud storage solutions',
          'The inability to write functional UI code'
        ],
        correct: 1,
        explanation: 'By packaging an app together with its exact environment (libraries, config, runtime), Docker ensures it runs the exact same way on a laptop, in a testing lab, and in production.'
      },
      {
        id: 'docker-1-q3',
        question: 'Why are containers generally considered "lighter" than VMs?',
        options: [
          'They don\'t have IP addresses',
          'They don\'t include a Guest OS overhead',
          'They only run compiled languages like C++',
          'They bypass CPU and only use RAM'
        ],
        correct: 1,
        explanation: 'Because containers leverage the Host OS kernel directly, they skip the GigaBytes of bloat required to boot a separate Windows or Linux installation.'
      }
    ]
  },
  {
    id: 'docker-2',
    track: 'docker',
    order: 2,
    title: 'Images vs Containers',
    subtitle: 'Blueprint vs Live Instance',
    emoji: '🖼️',
    duration: '20 min',
    xpReward: 120,
    funFact: 'Docker Images are read-only. When you run one, Docker puts a tiny read-write layer on top of it. This is why you can run 10 containers from a 1GB image without using 10GB of disk space!',
    sections: [
      {
        type: 'intro',
        content: 'This is the most critical concept to master: the difference between an Image and a Container. If you understand this, everything else in Docker makes sense.'
      },
      {
        type: 'concept',
        title: '🖼️ The Image (The Blueprint)',
        content: 'An image is a **read-only** template. It contains the OS libraries, the app code, and the runtime. It doesn\'t "run" — it just sits on your disk. Think of it as a recipe in a cookbook, or an ISO file.'
      },
      {
        type: 'concept',
        title: '📦 The Container (The Running Instance)',
        content: 'A container is a **runnable instance** of an image. When you "run" an image, it becomes a container. You can have 100 isolated containers independently running from the same 1 image. Think of the container as the actual pizza baked using the recipe. Deleting a container does not affect the read-only image it was built from.'
      },
      {
        type: 'flowchart',
        content: '**One Image, Multiple Independent Containers**',
        diagramSteps: [
          { label: 'Image\n(Read-Only)', icon: '🖼️', color: '#118ab2' },
          { label: 'Container A\n(Port 80)', icon: '📦', color: '#06d6a0' },
          { label: 'Container B\n(Port 81)', icon: '📦', color: '#06d6a0' }
        ]
      },
      {
        type: 'video',
        title: '📺 Images vs Containers Visualized',
        content: 'Check out this clear explanation of how the read/write layers actually stack on top of each other.',
        videoUrl: 'https://www.youtube.com/watch?v=YFl2mCHdv24'
      },
      {
        type: 'concept',
        title: '🍰 The Layer Cake Architecture',
        content: 'Docker images are made of **layers**. Every command in a build process creates a new small layer. If you change your code but not your libraries, Docker only updates the code layer. This makes images incredibly fast to build and share over the network!'
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
        content: 'Correctly identify where each element belongs in a Docker system.',
        gameType: 'drag-classify',
        gameData: {
          categories: [
            { id: 'readonly', label: 'Read-Only (The Image)' },
            { id: 'writeable', label: 'Writeable (The Container)' }
          ],
          items: [
            { id: 'os', label: 'Ubuntu OS', categoryId: 'readonly' },
            { id: 'node', label: 'Node.js Runtime', categoryId: 'readonly' },
            { id: 'code', label: 'Compiled React App', categoryId: 'readonly' },
            { id: 'logs', label: 'Runtime Server Logs', categoryId: 'writeable' },
            { id: 'temp', label: 'Temporary Cached Files', categoryId: 'writeable' }
          ]
        }
      },
      {
        type: 'game',
        title: 'Terminal: Your First Container',
        content: 'Let\'s pull an image and run it. The command structure is: `docker [action] [image]`.',
        gameType: 'terminal-sim',
        gameData: {
          startText: 'ubuntu@docker-host:~$ ',
          steps: [
            {
              instruction: 'First, let\'s download the official alpine linux image. Type: docker pull alpine',
              expectedCommand: 'docker pull alpine',
              output: 'Using default tag: latest\nlatest: Pulling from library/alpine\n4abcf2066143: Pull complete\nDigest: sha256:c5b1261d6d3e...1ad6b\nStatus: Downloaded newer image for alpine:latest'
            },
            {
              instruction: 'Now verify it is on our disk. Type: docker images',
              expectedCommand: 'docker images',
              output: 'REPOSITORY    TAG       IMAGE ID       CREATED        SIZE\nalpine        latest    05455a08881e   2 weeks ago    7.38MB'
            },
            {
              instruction: 'Let\'s spin up a container from this image and echo a word. Type: docker run alpine echo hello',
              expectedCommand: 'docker run alpine echo hello',
              output: 'hello'
            },
            {
              instruction: 'See the list of currently running containers. Type: docker ps',
              expectedCommand: 'docker ps',
              output: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES\n(Empty list because the container exited immediately after echoing!)'
            },
            {
              instruction: 'To see containers that have finished executing, type: docker ps -a',
              expectedCommand: 'docker ps -a',
              output: 'CONTAINER ID   IMAGE     COMMAND        CREATED          STATUS                      PORTS     NAMES\na1b2c3d4e5f6   alpine    "echo hello"   14 seconds ago   Exited (0) 13 seconds ago             dazzling_turing'
            }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'docker-2-q1',
        question: 'An Image is to a Container as a...',
        options: [
          'Computer is to a Mouse',
          'Recipe is to a baked Pizza',
          'File is to a Folder',
          'User is to a Password'
        ],
        correct: 1,
        explanation: 'An image is a static template (recipe). A container is a live, running instance of that template (pizza).'
      },
      {
        id: 'docker-2-q2',
        question: 'What happens to the underlying Image when a Container is deleted?',
        options: [
          'The image is also deleted',
          'The image remains completely unchanged',
          'The image loses its most recent layer',
          'The image file size gets larger'
        ],
        correct: 1,
        explanation: 'Images are immutable (read-only). Containers are temporary. Deleting a container safely discards its read-write layer, leaving the template image untouched.'
      },
      {
        id: 'docker-2-q3',
        question: 'If you run `docker ps` and see nothing, but `docker ps -a` shows listed containers, what does this mean?',
        options: [
          'Docker has crashed',
          'Your user lacks permissions',
          'The containers have stopped or finished executing',
          'The images are downloading in the background'
        ],
        correct: 2,
        explanation: '`docker ps` only shows currently running containers. Appending `-a` (all) shows containers that have exited or crashed.'
      }
    ]
  },
  {
    id: 'docker-3',
    track: 'docker',
    order: 3,
    title: 'The Dockerfile',
    subtitle: 'Building your own custom images',
    emoji: '📝',
    duration: '25 min',
    xpReward: 150,
    sections: [
      {
        type: 'intro',
        content: 'You won\'t always rely on predefined images. To create an environment specifically for your app, you write a **Dockerfile** — a simple, standardized text document containing all the commands a user could call on the command line to assemble an image.'
      },
      {
        type: 'video',
        title: '📺 Writing a Dockerfile from Scratch',
        content: 'A perfect 12-minute breakdown on how to construct a Dockerfile and minimize its final size.',
        videoUrl: 'https://www.youtube.com/watch?v=WmcdMiyqfZs'
      },
      {
        type: 'game',
        title: 'Challenge: The Dockerfile Builder',
        content: 'Order the instructions logically to create a functional Node.js backend Dockerfile (from absolute base to final execution).',
        gameType: 'drag-order',
        gameData: [
          { id: '1', label: 'FROM node:18-alpine' },
          { id: '2', label: 'WORKDIR /app' },
          { id: '3', label: 'COPY package.json ./' },
          { id: '4', label: 'RUN npm install' },
          { id: '5', label: 'COPY . .' },
          { id: '6', label: 'CMD ["node", "server.js"]' }
        ]
      },
      {
        type: 'table',
        title: '🛠️ Core Instructions Reference',
        content: 'Memorize these five. They cover 90% of your Dockerfile needs:',
        tableData: {
          headers: ['Instruction', 'Purpose', 'When does it execute?'],
          rows: [
            ['**FROM**', 'Defines the base OS image to start from', 'Build Phase (Step 1)'],
            ['**WORKDIR**', 'Sets the active directory inside the container', 'Build Phase'],
            ['**COPY**', 'Copies files from your laptop into the image', 'Build Phase'],
            ['**RUN**', 'Executes shell commands (like `apt install` or `npm install`)', 'Build Phase (Creates a layer)'],
            ['**CMD**', 'Defines the default command that runs when the **container starts**', 'Runtime Phase (Once only)']
          ]
        }
      },
      {
        type: 'concept',
        title: '⚡ Layers & Caching',
        content: 'Docker caches each step. If you change a file, Docker rebuilds from that layer down. If you need a completely fresh build without using old cached layers, use the **`--no-cache`** flag:\n\n`docker build --no-cache -t my-app .`'
      },
      {
         type: 'concept',
         title: '🛑 The Container Lifecycle',
         content: 'A container is designed to run a specific task. **When the process defined in CMD finishes, the container exits automatically.** For example, a container running `echo hello` will exit immediately after printing, while a web server will keep running as long as the server process is alive.'
      },
      {
        type: 'concept',
        title: '⚡ Understanding the Build Cache',
        content: 'Docker builds images sequentially. To speed things up, it **caches** each layer. If you change a line of code, Docker tries to reuse the cache. **However**, if a layer is invalidated (e.g., a file changed in `COPY`), ALL subsequent layers are completely rebuilt.\n\nThis is why we `COPY package.json` and `RUN npm install` **BEFORE** we `COPY . .` (the rest of the code). We don\'t want to reinstall 500MB of Node modules just because we changed a typo in `index.html`!'
      },
      {
        type: 'game',
        title: 'Terminal: Build & Tag',
        content: 'Let\'s use the Docker CLI to build a Dockerfile.',
        gameType: 'terminal-sim',
        gameData: {
          startText: 'ubuntu@docker-host:~/my-app$ ',
          steps: [
            {
              instruction: 'Build the image in the current directory (.) and tag it with the name "myapp:v1". Type: docker build -t myapp:v1 .',
              expectedCommand: 'docker build -t myapp:v1 .',
              output: 'Sending build context to Docker daemon  2.048kB\nStep 1/5 : FROM node:18-alpine\n ---> 34c8w912f\nStep 2/5 : WORKDIR /app\n ---> Running in a2bf12\nRemoving intermediate container a2bf12\n ---> 78c31fe\nStep 3/5 : COPY . .\n ---> 21ad22f\nSuccessfully built 21ad22f\nSuccessfully tagged myapp:v1'
            },
            {
              instruction: 'Verify your new custom image exists. Type: docker images',
              expectedCommand: 'docker images',
              output: 'REPOSITORY    TAG       IMAGE ID       CREATED         SIZE\nmyapp         v1        21ad22f4b1e2   2 seconds ago   174MB\nalpine        latest    05455a08881e   2 weeks ago     7.38MB'
            }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'docker-3-q1',
        question: 'What is the critical difference between the RUN and CMD instructions?',
        options: [
          'There is no functional difference',
          'RUN executes during image creation, CMD defines the default runtime executable',
          'RUN is used for downloading images, CMD is used for pushing them',
          'RUN is for Windows containers, CMD is for Linux containers'
        ],
        correct: 1,
        explanation: '`RUN` runs during the `docker build` phase and bakes files into the image layers. `CMD` runs nothing during build; it simply tells the container what command to launch when someone calls `docker run`.'
      },
      {
        id: 'docker-3-q2',
        question: 'Why do sophisticated Dockerfiles separate `COPY package.json` from `COPY .` (the rest of the code)?',
        options: [
          'Because Docker cannot copy large folders all at once',
          'To optimize the layer cache so dependencies aren\'t re-installed every time code changes',
          'To ensure malicious files aren\'t copied',
          'Because package.json must be executed as a script'
        ],
        correct: 1,
        explanation: 'If `COPY . .` happens before `RUN npm install`, then ANY tiny code change invalidates the cache for the heavy install step, making builds incredibly slow. By copying package.json first, Docker caches the heavy install unless the dependencies actually change.'
      },
      {
        id: 'docker-3-q3',
        question: 'Which flag is used in `docker build` to assign a human-readable name to an image?',
        options: ['-n', '-name', '--tag', '-t'],
        correct: 3,
        explanation: 'The `-t` (or `--tag`) flag assigns a repository name and an optional tag (e.g. `docker build -t my-app:latest`).'
      }
    ]
  },
  {
    id: 'docker-4',
    track: 'docker',
    order: 4,
    title: 'Docker Hub & Registries',
    subtitle: 'The App Store for Containers',
    emoji: '🗄️',
    duration: '15 min',
    xpReward: 80,
    sections: [
      {
        type: 'intro',
        content: 'You don\'t have to build everything yourself. **Docker Hub** is the central public registry where millions of pre-built images live. From basic Linux distributions to giant databases, it\'s the App Store for developers.'
      },
      {
        type: 'concept',
        title: '🏠 Public vs Private Registries',
        content: 'Docker Hub is the default, public registry. But companies usually use **Private Registries** (like AWS ECR, Google GCR, or GitHub Container Registry) to keep their proprietary app images safe and secret.'
      },
      {
        type: 'video',
        title: '📺 Sharing Docker Images',
        content: 'Learn how to pull, tag, and push images to registries like a professional.',
        videoUrl: 'https://www.youtube.com/watch?v=mAzHELZWE-Y'
      },
      {
        type: 'table',
        title: '🏷️ Image Tags & Best Practices',
        content: 'Versioning your images is absolutely crucial for stability. The suffix after the colon `:` is the tag.',
        tableData: {
          headers: ['Tag Strategy', 'Example', 'When to use', 'Risk Level'],
          rows: [
            ['**Exact Semantic**', '`node:18.17.0`', 'Production environments & CI/CD', '🟢 Lowest'],
            ['**Minor Version**', '`node:18`', 'Development, accepting small updates', '🟡 Medium'],
            ['**Latest**', '`node:latest`', 'Trying things quickly locally', '🔴 High (Never in Prod)']
          ]
        }
      },
      {
        type: 'flowchart',
        content: '**The Push & Pull Cycle**',
        diagramSteps: [
          { label: 'Developer Laptop\n(docker push)', icon: '💻', color: '#ffb703' },
          { label: 'Docker Hub\n(The Cloud Registry)', icon: '☁️', color: '#118ab2' },
          { label: 'Prod Server\n(docker pull)', icon: '🖥️', color: '#06d6a0' }
        ]
      },
      {
        type: 'game',
        title: 'Terminal: Publish to the World',
        content: 'Let\'s log in and push an image to Docker Hub.',
        gameType: 'terminal-sim',
        gameData: {
          startText: 'ubuntu@docker-host:~$ ',
          steps: [
            {
              instruction: 'First, log into your Docker Hub account via CLI. Type: docker login',
              expectedCommand: 'docker login',
              output: 'Authenticating with existing credentials...\nLogin Succeeded'
            },
            {
              instruction: 'Tag your local "myapp:v1" image with your Docker Hub username. Type: docker tag myapp:v1 devguru/myapp:v1',
              expectedCommand: 'docker tag myapp:v1 devguru/myapp:v1',
              output: ''
            },
            {
              instruction: 'Now push it to the public cloud registry! Type: docker push devguru/myapp:v1',
              expectedCommand: 'docker push devguru/myapp:v1',
              output: 'The push refers to repository [docker.io/devguru/myapp]\n21ad22f4b1e2: Pushed\nv1: digest: sha256:8b4c3... size: 1993'
            }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'docker-4-q1',
        question: 'Why is using the `:latest` tag in a production deployment considered dangerous?',
        options: [
          'It costs more money to use the latest tag',
          'It is a mutable tag; it can point to a completely different, breaking version tomorrow',
          'The latest tag disables Docker\'s security sandbox',
          'The latest tag bypasses cache and takes hours to pull'
        ],
        correct: 1,
        explanation: '`:latest` simply points to whatever image was most recently uploaded. An update could introduce a breaking change overnight. Pinning exact versions (like `:1.14.2`) makes your deployments predictable.'
      },
      {
        id: 'docker-4-q2',
        question: 'What command prepares a local image to be pushed to a specific remote organization or user account?',
        options: ['docker push', 'docker rename', 'docker tag', 'docker commit'],
        correct: 2,
        explanation: 'You use `docker tag local_image user_name/repo_name:tag` to correctly label the image so the Docker Engine knows exactly where to route the upload.'
      }
    ]
  },
  {
    id: 'docker-5',
    track: 'docker',
    order: 5,
    title: 'Volumes & Persistence',
    subtitle: 'Where does the database data go?',
    emoji: '💾',
    duration: '20 min',
    xpReward: 100,
    sections: [
      {
        type: 'intro',
        content: 'Containers are meant to be **ephemeral** (temporary). If you delete a database container, everything on its internal disk is wiped out. To save our actual user data, we must bridge the gap to the Host machine\'s physical disk.'
      },
      {
        type: 'concept',
        title: '🧱 The Problem: The Writable Layer',
        content: 'When a container writes a file to its own disk, that file exists in a temporary "writable layer". If the container is destroyed, or crashes, the layer is destroyed.'
      },
      {
        type: 'flowchart',
        content: '**Ephemeral Data (Dangerous ❌)**',
        diagramSteps: [
          { label: 'PostgreSQL\n(Running Container)', icon: '🐘', color: '#ffb703' },
          { label: 'Writes to\nContainer Disk', icon: '📝', color: '#ff4b4b' },
          { label: 'Container Demolished\n(docker rm)', icon: '💥', color: '#ff4b4b' },
          { label: 'Data is\nGone Forever!', icon: '💀', color: '#000000' }
        ]
      },
      {
        type: 'video',
        title: '📺 Docker Volumes Masterclass',
        content: 'A deep dive into how data permanence works in Docker environments.',
        videoUrl: 'https://www.youtube.com/watch?v=p2PH_YPCsis'
      },
      {
        type: 'concept',
        title: '🔗 The Solution: Bind Mounts & Named Volumes',
        content: 'We solve this by "mounting" folders.\n\n**1. Bind Mounts**: You map a specific path from your laptop (e.g. `/Users/claudio/code`) straight into the container. Great for live-reloading code during development.\n\n**2. Named Volumes**: You let Docker manage a secure, hidden folder on the host disk. The best choice for Database data persistence.'
      },
      {
        type: 'table',
        title: '⚖️ Bind Mounts vs Named Volumes',
        content: 'Understanding when to use which type of storage:',
        tableData: {
          headers: ['Feature', 'Bind Mount 📂', 'Named Volume 🗃️'],
          rows: [
            ['**Managed By**', 'The User (You)', 'Docker'],
            ['**Host Location**', 'Specific path (e.g. `./src`)', 'Hidden Docker storage area'],
            ['**Best Use Case**', 'Sharing source code for live-reloading', 'Storing Database data securely'],
            ['**Syntax Example**', '`-v $(pwd)/src:/app/src`', '`-v postgres-data:/var/lib/postgresql`']
          ]
        }
      },
      {
        type: 'game',
        title: 'Terminal: Persist It',
        content: 'Let\'s create a named volume and mount it to a database container.',
        gameType: 'terminal-sim',
        gameData: {
          startText: 'ubuntu@docker-host:~$ ',
          steps: [
            {
              instruction: 'First, ask Docker to create a secure named volume called "dbstore". Type: docker volume create dbstore',
              expectedCommand: 'docker volume create dbstore',
              output: 'dbstore'
            },
            {
              instruction: 'Now run a postgres container in the background (-d), and mount the volume (-v) to its internal data path. Type: docker run -d -v dbstore:/var/lib/postgresql/data postgres',
              expectedCommand: 'docker run -d -v dbstore:/var/lib/postgresql/data postgres',
              output: '9f2a4b1c2d3e4f5a6b7c...\nYour database is now safe and persistent!'
            }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'docker-5-q1',
        question: 'What occurs to data saved inside a container\'s writable layer when the container is executing `docker rm`?',
        options: [
          'It is backed up to Docker Hub',
          'It is permanently deleted',
          'It is automatically converted to a Named Volume',
          'Nothing, it remains on the hard drive'
        ],
        correct: 1,
        explanation: 'The writable layer is deeply tied to the lifecycle of the container instance. When the container goes, the layer (and all its data) vanishes.'
      },
      {
        id: 'docker-5-q2',
        question: 'For a production MySQL database running in Docker, which storage method is strongly recommended?',
        options: [
          'Bind Mounts',
          'The default Writable Layer',
          'Named Volumes',
          'In-memory RAM allocation'
        ],
        correct: 2,
        explanation: 'Named Volumes are managed entirely by Docker, circumventing host OS file permission issues and providing the safest, most performant way to store persistent database information.'
      }
    ]
  },
  {
    id: 'docker-6',
    track: 'docker',
    order: 6,
    title: 'Networking & Ports',
    subtitle: 'Bridging containers to the outside world',
    emoji: '🔌',
    duration: '20 min',
    xpReward: 100,
    sections: [
      {
        type: 'intro',
        content: 'A container running a brilliantly crafted web server is useless if nobody can reach it. We need to bridge the isolation gap between the container\'s internal network, and our computer\'s local network.'
      },
      {
        type: 'video',
        title: '📺 Port Mapping Explained',
        content: 'Understand how host port forwarding routes traffic directly into your isolated containers.',
        videoUrl: 'https://www.youtube.com/watch?v=bKFMS5C4CG0'
      },
      {
        type: 'concept',
        title: '🚪 Port Mapping (`-p`)',
        content: 'By default, a container exposes no ports to the public. To view a React app running on port 3000 inside a container, we must **bind** it to a port on our laptop.\n\nSyntax: `-p [HOST_PORT]:[CONTAINER_PORT]`\n\nThe `HOST_PORT` is what you type in your browser (e.g., `localhost:8080`).'
      },
      {
        type: 'flowchart',
        content: '**How Port Mapping Works (`-p 8080:80`)**',
        diagramSteps: [
          { label: 'Browser User\n(localhost:8080)', icon: '🌍', color: '#118ab2' },
          { label: 'Host Port Tracker\n(Docker Daemon)', icon: '🚪', color: '#ffb703' },
          { label: 'Container Port 80\n(Nginx web server)', icon: '📦', color: '#06d6a0' }
        ]
      },
      {
        type: 'concept',
        title: '🌐 Docker User-Defined Networks',
        content: 'What if a Web Container needs to talk to a Database Container? They shouldn\'t go over the public internet! \n\nDocker can create virtual internal networks. When containers join the same network, they can securely talk to each other **using their container names** as hostnames (e.g., `http://my-db:5432`). This is built-in DNS!'
      },
      {
        type: 'game',
        title: 'Terminal: Bridge the Gap',
        content: 'Expose an internal NGINX server to your computer.',
        gameType: 'terminal-sim',
        gameData: {
          startText: 'ubuntu@docker-host:~$ ',
          steps: [
            {
              instruction: 'Run an nginx container in the background, mapping your laptop\'s port 8080 to the container\'s internal port 80. Type: docker run -d -p 8080:80 nginx',
              expectedCommand: 'docker run -d -p 8080:80 nginx',
              output: 'bf4d9a...'
            },
            {
              instruction: 'Now curl localhost on your laptop port to see if the web server responds. Type: curl localhost:8080',
              expectedCommand: 'curl localhost:8080',
              output: '<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome to nginx!</title>\n...\n</html>'
            }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'docker-6-q1',
        question: 'If you execute `docker run -p 5000:3000 app`, into which browser URL would you type to view the app?',
        options: ['localhost:3000', 'localhost:5000', 'app:3000', 'docker:5000:3000'],
        correct: 1,
        explanation: 'The mapping syntax is `host_port:container_port`. Since the host port is 5000, that is the entry door available to your browser.'
      },
      {
        id: 'docker-6-q2',
        question: 'How do two containers on the same custom Docker network communicate with each other?',
        options: [
          'Using the host\'s IP address',
          'Using port mapping on localhost',
          'Using their container names as DNS hostnames',
          'They cannot communicate directly for security reasons'
        ],
        correct: 2,
        explanation: 'Docker provides built-in DNS resolution for custom bridge networks. If a container is named "redis", another container on the same network can reach it simply by pinging "redis".'
      }
    ]
  },
  {
    id: 'docker-7',
    track: 'docker',
    order: 7,
    title: 'Docker Compose',
    subtitle: 'YAML orchestration for multi-container apps',
    emoji: '🐙',
    duration: '25 min',
    xpReward: 150,
    sections: [
      {
        type: 'intro',
        content: 'Real applications aren\'t just one container. They are a Database, a Redis cache, a Backend API, and a Frontend. Managing a dozen `docker run` commands manually is a nightmare. Enter **Docker Compose**.'
      },
      {
        type: 'video',
        title: '📺 Docker Compose Explained',
        content: 'See exactly how to transition from painful CLI commands to elegant, declarative YAML files.',
        videoUrl: 'https://www.youtube.com/watch?v=hP77Rua1E0c'
      },
      {
        type: 'table',
        title: '📝 The docker-compose.yml Syntax',
        content: 'Compose uses a YAML file to configure services. It\'s essentially a translated list of docker CLI flags.',
        tableData: {
          headers: ['YAML Property', 'CLI Equivalent', 'Example'],
          rows: [
            ['`image:`', '`docker run <image>`', '`image: postgres:15`'],
            ['`build:`', '`docker build ...`', '`build: ./frontend`'],
            ['`ports:`', '`-p 5000:80`', '`ports:\n  - "5000:80"`'],
            ['`volumes:`', '`-v db-data:/var/lib`', '`volumes:\n  - db-data:/var`'],
            ['`environment:`', '`-e NODE_ENV=prod`', '`environment:\n  - NODE_ENV=prod`']
          ]
        }
      },
      {
        type: 'code',
        title: 'Example: A Full Stack in One File',
        content: 'This single file spins up a backend server AND a postgres database, links them on a network, and creates a volume.',
        code: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      - DB_URL=postgresql://postgres@db:5432/mydb
  db:
    image: postgres:15
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`,
        language: 'yaml'
      },
      {
        type: 'table',
        title: '⚖️ Compose Lifecycle: stop vs down',
        content: 'These commands look similar but act very differently:',
        tableData: {
          headers: ['Command', 'What it does', 'Containers', 'Networks', 'Volumes'],
          rows: [
            ['**stop**', 'Gracefully stops services', '🟡 Kept (stopped)', '✅ Kept', '✅ Kept'],
            ['**down**', 'Stops AND removes services', '❌ Removed', '❌ Removed', '✅ Kept (unless `-v`)']
          ]
        }
      },
      {
        type: 'game',
        title: 'Terminal: Orchestrate the Stack',
        content: 'Launch a multi-container stack with a single command.',
        gameType: 'terminal-sim',
        gameData: {
          startText: 'ubuntu@docker-host:~/my-project$ ',
          steps: [
            {
              instruction: 'Start all the services defined in your docker-compose.yml, and run them detached in the background. Type: docker-compose up -d',
              expectedCommand: 'docker-compose up -d',
              output: 'Creating network "my-project_default" with the default driver\nCreating volume "my-project_db-data" with default driver\nCreating my-project_db_1 ... done\nCreating my-project_web_1 ... done'
            },
            {
              instruction: 'Your stack is running! If you want to check the live logs from ALL services at once, type: docker-compose logs -f',
              expectedCommand: 'docker-compose logs -f',
              output: 'db_1   | PostgreSQL init process complete; ready for start up.\nweb_1  | Server listening on port 5000...\n^C'
            },
            {
              instruction: 'Now, completely destroy the stack and clean up the networks. Type: docker-compose down',
              expectedCommand: 'docker-compose down',
              output: 'Stopping my-project_web_1 ... done\nStopping my-project_db_1 ... done\nRemoving my-project_web_1 ... done\nRemoving my-project_db_1 ... done\nRemoving network my-project_default'
            }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'docker-7-q1',
        question: 'What is the primary advantage of using Docker Compose over standard Docker CLI commands?',
        options: [
          'It runs containers 5x faster',
          'It allows you to declaratively define and manage multi-container applications in a single file',
          'It replaces the need for a Docker Hub account',
          'It allows Docker to run natively without virtualization'
        ],
        correct: 1,
        explanation: 'Compose translates dozens of complex CLI flags into a clean, repeatable YAML configuration file, perfect for spinning up complex dev environments instantly.'
      },
      {
        id: 'docker-7-q2',
        question: 'If you run `docker-compose down`, what happens to your Named Volumes?',
        options: [
          'They are deleted along with the containers',
          'They are uploaded to Docker Hub',
          'They are preserved safely by default',
          'They are compressed into a tarball'
        ],
        correct: 2,
        explanation: 'By default, `docker-compose down` removes containers and networks, but PRESERVES volumes to prevent accidental data loss. You must append `-v` to explicitly delete volumes.'
      }
    ]
  },
  {
    id: 'docker-8',
    track: 'docker',
    order: 8,
    title: 'Hands-on Labs: Playground',
    subtitle: 'Free environments to practice safely',
    emoji: '🧪',
    duration: '45+ min',
    xpReward: 100,
    externalLink: {
      label: 'Launch Play with Docker',
      url: 'https://labs.play-with-docker.com',
      xpPrompt: 'How many labs/exercises did you successfully complete? Enter the number to earn XP!'
    },
    sections: [
      {
        type: 'intro',
        content: 'Watching videos is great, but typing the commands builds muscle memory. In this module we introduce **the best free resources** to get your hands dirty without risking your local machine.'
      },
      {
        type: 'concept',
        title: '🌐 Tool 1: Play with Docker (PWD)',
        content: '**Play with Docker** gives you a free, temporary Docker environment **right in your browser**. No installation.\n\n- Get a fresh Linux VM with Docker pre-installed\n- Create multiple instances (nodes) to simulate swarm clusters\n- Each session lasts **4 hours**\n\n🔗 **URL**: [https://labs.play-with-docker.com](https://labs.play-with-docker.com)'
      },
      {
        type: 'video',
        title: '📺 Intro to Play with Docker',
        content: 'A quick tour of how the PWD interface works safely in the browser.',
        videoUrl: 'https://www.youtube.com/watch?v=KLTT4FfiKHQ'
      },
      {
        type: 'concept',
        title: '📚 Tool 2: Docker Classroom',
        content: '**Docker Classroom** is the guided, structured version of PWD.\n\n🔗 **URL**: [https://training.play-with-docker.com](https://training.play-with-docker.com)\n\n💡 **Recommended starter labs:**\n1. "Your First Linux Containers"\n2. "Doing More With Docker Images"\n3. "Docker Networking Hands-on Lab"'
      },
      {
        type: 'tip',
        title: '🎯 Suggested Learning Path',
        content: '**Step 1**: Use the PWD sandbox to rerun the commands we covered in the Terminal simulations.\n**Step 2**: Follow the 3 Recommended Labs in Docker Classroom.\n**Step 3**: Come back here and obliterate the Final Quiz! 🏆'
      }
    ]
  },
  {
    id: 'docker-9',
    track: 'docker',
    order: 9,
    title: 'Final Docker Challenge',
    subtitle: 'The Whale Master Certification',
    emoji: '🏆',
    duration: '20 min',
    xpReward: 200,
    sections: [
      {
        type: 'intro',
        content: 'Time to prove your container mastery. 10 comprehensive questions covering builds, lifecycle, volumes, networking, and compose. Take your time. Good luck!'
      }
    ],
    quiz: [
      {
        id: 'docker-9-q1',
        question: 'Which is NOT a structural benefit of Containers over VMs?',
        options: ['Lightweight filesystem', 'Fraction of a second startup time', 'Includes a completely isolated Guest OS kernel', 'High portability across clouds'],
        correct: 2,
        explanation: 'Containers explicitly DO NOT contain a Guest OS kernel; they share the Host OS kernel. That is what makes them lightweight.'
      },
      {
        id: 'docker-9-q2',
        question: 'What is the correct instruction to copy a local file named "server.js" into the "/app" directory of the image during build?',
        options: ['ADD server.js /app', 'RUN cp server.js /app', 'COPY server.js /app', 'MOVE server.js /app'],
        correct: 2,
        explanation: '`COPY` is the explicit, best-practice instruction for moving files from the host context into the image layers.'
      },
      {
        id: 'docker-9-q3',
        question: 'What happens when a container reaches the end of the script specified in its `CMD` instruction?',
        options: ['It waits for further user input', 'It gracefully exits and its status changes to "Exited"', 'It reboots continuously', 'It deletes itself entirely'],
        correct: 1,
        explanation: 'A container lives exactly as long as its main process (the CMD). Once that process concludes, the container naturally exits.'
      },
      {
        id: 'docker-9-q4',
        question: 'In a Dockerfile, why should `RUN npm install` typically be placed BEFORE `COPY . .`?',
        options: ['To bypass security checks', 'To ensure syntax errors are caught early', 'To maximize layer caching and drastically speed up future builds', 'To force npm to run as root'],
        correct: 2,
        explanation: 'Docker builds cache layer by layer. Copying only package.json and installing allows Docker to cache the heavy "node_modules" layer, bypassing the install step on future builds as long as dependencies haven\'t changed.'
      },
      {
        id: 'docker-9-q5',
        question: 'To guarantee that your PostgreSQL database doesn\'t lose records when its container crashes or updates, you MUST use:',
        options: ['Bind mounts on /var/log', 'Named Volumes or explicit Host Bind Mounts', 'A larger Docker Image', 'Redis Caching'],
        correct: 1,
        explanation: 'Without external mounts, data is written to the ephemeral container layer. Volumes ensure data physically resides on the host machine and outlives the container.'
      },
      {
        id: 'docker-9-q6',
        question: 'If you want to expose a Python Flask app running on port 5000 inside a container to your laptop\'s port 80, what flag do you use?',
        options: ['-p 5000:80', '-p 80:5000', '-e PORT=80', '-expose 80:5000'],
        correct: 1,
        explanation: 'The mapping syntax is always `host_port:container_port`. So `-p 80:5000`.'
      },
      {
        id: 'docker-9-q7',
        question: 'In Docker Compose, what does `depends_on` parameter achieve?',
        options: ['It guarantees the app won\'t crash', 'It delays the start of a service until its dependencies have successfully started', 'It installs node modules automatically', 'It mounts dependent volumes'],
        correct: 1,
        explanation: 'It controls the absolute startup order. If `web` depends on `db`, compose starts `db` first.'
      },
      {
        id: 'docker-9-q8',
        question: 'How do you force Docker to rebuild an image, ignoring the cached layers?',
        options: ['docker build --no-cache', 'docker build --force', 'docker build --clean', 'docker rebuild'],
        correct: 0,
        explanation: '`--no-cache` forces Docker Engine to execute every single instruction in the Dockerfile from scratch.'
      },
      {
        id: 'docker-9-q9',
        question: 'Which command cleanly removes all containers, networks, and images created by `docker-compose up` (without touching volumes)?',
        options: ['docker-compose stop', 'docker-compose kill', 'docker-compose clean', 'docker-compose down'],
        correct: 3,
        explanation: '`down` is the clean teardown command, destroying the ephemeral containers and networks while preserving volume data.'
      },
      {
        id: 'docker-9-q10',
        question: 'What is the danger of using the `latest` tag in `docker run ubuntu:latest` for a production critical application?',
        options: ['It violates GPL licensing', 'It disables volume mounts', 'It is non-deterministic; the underlying image it points to can unexpectedly change causing breaking bugs', 'It is a deprecated command syntax'],
        correct: 2,
        explanation: 'Pinning to specific versions (like `ubuntu:22.04`) ensures immutability. `latest` is a moving target.'
      }
    ]
  }
]
