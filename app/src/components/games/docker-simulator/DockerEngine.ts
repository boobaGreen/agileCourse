import type { DockerState } from '../../../data/types';

export class DockerEngine {
  private state: DockerState;

  constructor(initialState?: DockerState) {
    if (initialState) {
      this.state = JSON.parse(JSON.stringify(initialState));
      if (!this.state.volumes) this.state.volumes = [];
      if (!this.state.networks) this.state.networks = [];
    } else {
      this.state = {
        images: [
          { id: 'img-1', name: 'hello-world', tag: 'latest', size: '13kB' }
        ],
        containers: [],
        volumes: [],
        networks: [
          { id: 'net-1', name: 'bridge', driver: 'bridge' }
        ]
      };
    }
  }

  public getState(): DockerState {
    return JSON.parse(JSON.stringify(this.state));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  public pull(imageName: string): { success: boolean, msg: string } {
    const exists = this.state.images.find(img => img.name === imageName);
    if (exists) {
      return { success: true, msg: `Image ${imageName}:latest already exists` };
    }

    const newImage = {
      id: `img-${this.generateId()}`,
      name: imageName,
      tag: 'latest',
      size: `${Math.floor(Math.random() * 100) + 10}MB`
    };
    this.state.images.push(newImage);
    return { success: true, msg: `Using default tag: latest\nlatest: Pulling from library/${imageName}\nDigest: sha256:...\nStatus: Downloaded newer image for ${imageName}:latest` };
  }

  public volumeCreate(name: string): { success: boolean, msg: string } {
    if (this.state.volumes?.find(v => v.name === name)) {
      return { success: false, msg: `Error: Volume "${name}" already exists` };
    }
    this.state.volumes?.push({ id: this.generateId(), name });
    return { success: true, msg: name };
  }

  public networkCreate(name: string): { success: boolean, msg: string } {
    if (this.state.networks?.find(n => n.name === name)) {
      return { success: false, msg: `Error: Network "${name}" already exists` };
    }
    this.state.networks?.push({ id: this.generateId(), name, driver: 'bridge' });
    return { success: true, msg: name };
  }

  public run(options: string[]): { success: boolean, msg: string } {
    // Basic parser for "docker run [-d] [-p host:cont] [-v vol:path] [--network name] image"
    const ports: string[] = [];
    const volumes: string[] = [];
    const networks: string[] = [];
    let imageName = '';
    let containerName = '';

    for (let i = 0; i < options.length; i++) {
      if (options[i] === '-d') {
        // Detached mode simulation
      }
      else if (options[i] === '-p') {
        ports.push(options[++i]);
      } else if (options[i] === '-v') {
        volumes.push(options[++i]);
      } else if (options[i] === '--network' || options[i] === '--net') {
        networks.push(options[++i]);
      } else if (options[i] === '--name') {
        containerName = options[++i];
      } else if (!imageName && !options[i].startsWith('-')) {
        imageName = options[i];
      }
    }

    if (!imageName) return { success: false, msg: '"docker run" requires at least 1 argument.' };

    const image = this.state.images.find(img => img.name === imageName || `${img.name}:${img.tag}` === imageName);
    if (!image) {
      return { success: false, msg: `Unable to find image '${imageName}' locally` };
    }

    const id = this.generateId();
    const newContainer = {
      id,
      name: containerName || `nostalgic_${id}`,
      image: image.name,
      status: 'running' as const,
      ports,
      volumes,
      networks
    };

    this.state.containers.push(newContainer);
    
    return { success: true, msg: `Starting container ${newContainer.name}...\nApplication started on ${networks.length > 0 ? networks.join(',') : 'bridge'} network.` };
  }

  public tag(source: string, target: string): { success: boolean, msg: string } {
    const sourceImage = this.state.images.find(img => img.name === source || `${img.name}:${img.tag}` === source);
    if (!sourceImage) return { success: false, msg: `Error: No such image: ${source}` };

    const targetParts = target.split(':');
    const newImage = {
      ...sourceImage,
      id: `img-${this.generateId()}`,
      name: targetParts[0],
      tag: targetParts[1] || 'latest'
    };

    this.state.images.push(newImage);
    return { success: true, msg: `Successfully tagged ${source} as ${target}` };
  }

  public push(imageName: string): { success: boolean, msg: string } {
    const image = this.state.images.find(img => img.name === imageName || `${img.name}:${img.tag}` === imageName);
    if (!image) return { success: false, msg: `Error: No such image: ${imageName}` };

    return { 
      success: true, 
      msg: `The push refers to repository [docker.io/${imageName}]\n${image.id.replace('img-', '')}: Pushed\nlatest: digest: sha256:77bc... size: ${image.size}` 
    };
  }

  public stop(nameOrId: string): { success: boolean, msg: string } {
    const container = this.state.containers.find(c => c.id === nameOrId || c.name === nameOrId);
    if (!container) return { success: false, msg: `Error: No such container: ${nameOrId}` };
    
    container.status = 'exited';
    return { success: true, msg: nameOrId };
  }

  public remove(nameOrId: string): { success: boolean, msg: string } {
    const index = this.state.containers.findIndex(c => c.id === nameOrId || c.name === nameOrId);
    if (index === -1) return { success: false, msg: `Error: No such container: ${nameOrId}` };
    
    if (this.state.containers[index].status === 'running') {
      return { success: false, msg: 'Error response from daemon: You cannot remove a running container. Stop the container before attempting removal or force remove' };
    }

    this.state.containers.splice(index, 1);
    return { success: true, msg: nameOrId };
  }

  public build(imageName: string): { success: boolean, msg: string } {
    const id = this.generateId();
    const newImage = {
      id: `img-${id}`,
      name: imageName.split(':')[0],
      tag: imageName.split(':')[1] || 'latest',
      size: `${Math.floor(Math.random() * 50) + 100}MB`
    };
    
    this.state.images.push(newImage);
    
    const output = [
      `Sending build context to Docker daemon  2.048kB`,
      `Step 1/5 : FROM node:18-alpine`,
      ` ---> 34c8w912f`,
      `Step 2/5 : WORKDIR /app`,
      ` ---> Running in ${this.generateId()}`,
      `Removing intermediate container ${this.generateId()}`,
      `Step 3/5 : COPY . .`,
      ` ---> ${id}`,
      `Successfully built ${id}`,
      `Successfully tagged ${imageName}`
    ].join('\n');

    return { success: true, msg: output };
  }
}
