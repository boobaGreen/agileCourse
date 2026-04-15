import { DockerEngine } from './DockerEngine';

export class DockerParser {
  public static execute(engine: DockerEngine, command: string): { success: boolean, out: string } {
    const parts = command.trim().split(/\s+/);
    const isCompose = parts[0] === 'docker-compose';

    if (parts[0] !== 'docker' && !isCompose) {
      return { success: false, out: `command not found: ${parts[0]}` };
    }

    const subCommand = parts[1];
    const args = parts.slice(2);

    if (isCompose) {
        if (subCommand === 'up') {
            engine.pull('postgres:15');
            engine.run(['-d', '--name', 'db', '-v', 'db-data:/var/lib/postgresql/data', 'postgres:15']);
            engine.run(['-d', '--name', 'web', '-p', '5000:5000', 'myapp:latest']);
            return { success: true, out: 'Creating network "default" ...\nCreating volume "db-data" ...\nCreating db ... done\nCreating web ... done' };
        }
        if (subCommand === 'down') {
            engine.stop('web');
            engine.remove('web');
            engine.stop('db');
            engine.remove('db');
            return { success: true, out: 'Stopping web ... done\nStopping db ... done\nRemoving web ... done\nRemoving db ... done\nRemoving network default' };
        }
        return { success: false, out: `Unknown compose command: ${subCommand}` };
    }

    switch (subCommand) {
      case 'ps': {
        const containers = engine.getState().containers;
        if (containers.length === 0) return { success: true, out: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES' };
        let outPs = 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES\n';
        containers.forEach(c => {
          outPs += `${c.id.padEnd(14)} ${c.image.padEnd(9)} "..."      now       ${c.status.padEnd(9)} ${c.ports.join(',').padEnd(9)} ${c.name}\n`;
        });
        return { success: true, out: outPs };
      }

      case 'images': {
        const images = engine.getState().images;
        let outImg = 'REPOSITORY   TAG       IMAGE ID       CREATED   SIZE\n';
        images.forEach(img => {
          outImg += `${img.name.padEnd(12)} ${img.tag.padEnd(9)} ${img.id.padEnd(14)} now       ${img.size}\n`;
        });
        return { success: true, out: outImg };
      }

      case 'run': {
        const res = engine.run(args);
        return { success: res.success, out: res.msg };
      }

      case 'build': {
        // docker build -t [name] .
        const tIndex = args.indexOf('-t');
        if (tIndex === -1 || !args[tIndex + 1]) return { success: false, out: 'Error: "-t" flag with image name is required for build.' };
        const res = engine.build(args[tIndex + 1]);
        return { success: res.success, out: res.msg };
      }

      case 'stop': {
        if (args.length === 0) return { success: false, out: '"docker stop" requires at least 1 argument.' };
        const res = engine.stop(args[0]);
        return { success: res.success, out: res.msg };
      }

      case 'rm': {
        if (args.length === 0) return { success: false, out: '"docker rm" requires at least 1 argument.' };
        const res = engine.remove(args[0]);
        return { success: res.success, out: res.msg };
      }

      case 'pull': {
        if (args.length === 0) return { success: false, out: '"docker pull" requires at least 1 argument.' };
        const res = engine.pull(args[0]);
        return { success: res.success, out: res.msg };
      }

      case 'volume': {
        const action = args[0];
        if (action === 'create') {
           const name = args[1];
           if (!name) return { success: false, out: '"docker volume create" requires a name.' };
           const res = engine.volumeCreate(name);
           return { success: res.success, out: res.msg };
        }
        if (action === 'ls') {
           const state = engine.getState();
           let outV = 'DRIVER    VOLUME NAME\n';
           state.volumes?.forEach(v => {
             outV += `local     ${v.name}\n`;
           });
           return { success: true, out: outV };
        }
        return { success: false, out: `Error: Unknown volume command "${action}"` };
      }

      case 'network': {
        const action = args[0];
        if (action === 'create') {
           const name = args[1];
           if (!name) return { success: false, out: '"docker network create" requires a name.' };
           const res = engine.networkCreate(name);
           return { success: res.success, out: res.msg };
        }
        if (action === 'ls' || action === 'list') {
           const state = engine.getState();
           let outN = 'NETWORK ID     NAME      DRIVER    SCOPE\n';
           state.networks?.forEach(n => {
             outN += `${n.id.padEnd(14)} ${n.name.padEnd(9)} ${n.driver.padEnd(9)} local\n`;
           });
           return { success: true, out: outN };
        }
        return { success: false, out: `Error: Unknown network command "${action}"` };
      }

      case 'tag': {
        if (args.length < 2) return { success: false, out: '"docker tag" requires SOURCE_IMAGE and TARGET_IMAGE[:TAG]' };
        const res = engine.tag(args[0], args[1]);
        return { success: res.success, out: res.msg };
      }

      case 'push': {
        if (args.length === 0) return { success: false, out: '"docker push" requires an image name.' };
        const res = engine.push(args[0]);
        return { success: res.success, out: res.msg };
      }

      default:
        return { success: false, out: `docker: '${subCommand}' is not a docker command.\nSee 'docker --help'` };
    }
  }
}
