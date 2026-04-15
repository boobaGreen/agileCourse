import { K8sEngine } from './K8sEngine';

export class K8sParser {
  public static execute(engine: K8sEngine, command: string): { success: boolean, out: string } {
    const parts = command.trim().split(/\s+/);
    const isHelm = parts[0] === 'helm';

    if (parts[0] !== 'kubectl' && !isHelm) {
      return { success: false, out: `command not found: ${parts[0]}` };
    }

    const subCommand = parts[1];
    const type = parts[2];
    const name = parts[3];

    if (isHelm) {
        if (subCommand === 'install') {
            const chartName = parts[2];
            const releaseName = parts[3];
            if (!chartName) return { success: false, out: 'error: chart name required' };
            
            // Mock helm behavior: Install a complex app
            engine.apply({
              kind: 'Deployment',
              metadata: { name: 'redis' },
              spec: { replicas: 1, selector: { matchLabels: { app: 'redis' } } }
            });
            engine.apply({
              kind: 'Service',
              metadata: { name: 'redis' },
              spec: { selector: { app: 'redis' }, type: 'ClusterIP' }
            });
            engine.apply({
              kind: 'Deployment',
              metadata: { name: 'backend' },
              spec: { replicas: 2, selector: { matchLabels: { app: 'backend' } } }
            });
            
            return { success: true, out: `NAME: ${releaseName || 'my-release'}\nLAST DEPLOYED: now\nNAMESPACE: default\nSTATUS: deployed\nREVISION: 1\nNOTES:\nCongratulations! The chart "${chartName}" is now running in your cluster.` };
        }
        return { success: false, out: `Error: Unknown helm command "${subCommand}"` };
    }

    switch (subCommand) {
      case 'get': {
        const state = engine.getState();
        if (type === 'pods' || type === 'pod' || type === 'po') {
          if (state.pods.length === 0) return { success: true, out: 'No resources found in default namespace.' };
          let out = 'NAME                          READY   STATUS    RESTARTS   AGE\n';
          state.pods.forEach(p => {
            out += `${p.name.padEnd(30)} 1/1     ${p.status.padEnd(9)} 0          1m\n`;
          });
          return { success: true, out };
        }
        if (type === 'nodes' || type === 'node' || type === 'no') {
          let outString = 'NAME       STATUS   ROLES    AGE   VERSION\n';
          state.nodes.forEach(n => {
            outString += `${n.name.padEnd(10)} ${n.status.padEnd(8)} control-plane 5d   v1.28.3\n`;
          });
          return { success: true, out: outString };
        }
        if (type === 'deployments' || type === 'deployment' || type === 'deploy') {
          if (state.deployments.length === 0) return { success: true, out: 'No resources found in default namespace.' };
          let outString = 'NAME      READY   UP-TO-DATE   AVAILABLE   AGE\n';
          state.deployments.forEach(d => {
            const ready = state.pods.filter(p => Object.entries(d.selector).every(([k, v]) => p.labels[k] === v)).length;
            outString += `${d.name.padEnd(10)} ${ready}/${d.replicas}     ${d.replicas}            ${ready}           5m\n`;
          });
          return { success: true, out: outString };
        }
        if (type === 'pvc' || type === 'persistentvolumeclaim') {
          if (!state.pvc || state.pvc.length === 0) return { success: true, out: 'No resources found.' };
          let outString = 'NAME             STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE\n';
          state.pvc.forEach(p => {
            outString += `${p.name.padEnd(16)} ${p.status.padEnd(8)} pv-${p.name.padEnd(8)} ${p.size.padEnd(10)} RWO            standard       1m\n`;
          });
          return { success: true, out: outString };
        }
        if (type === 'cm' || type === 'configmap') {
          if (!state.configMaps || state.configMaps.length === 0) return { success: true, out: 'No resources found.' };
          let outString = 'NAME              DATA   AGE\n';
          state.configMaps.forEach(c => {
            outString += `${c.name.padEnd(17)} ${Object.keys(c.data).length}      1m\n`;
          });
          return { success: true, out: outString };
        }
        return { success: false, out: `error: the server doesn't have a resource type "${type}"` };
      }

      case 'apply': {
        // Mock manifest application for common exercises
        if (command.includes('nginx-deployment.yaml')) {
          const res = engine.apply({
            kind: 'Deployment',
            metadata: { name: 'nginx' },
            spec: { replicas: 2, selector: { matchLabels: { app: 'nginx' } } }
          });
          return { success: res.success, out: res.msg };
        }
        if (command.includes('web-pvc.yaml')) {
          const res = engine.apply({
            kind: 'PersistentVolumeClaim',
            metadata: { name: 'web-pvc' },
            spec: { resources: { requests: { storage: '1Gi' } } }
          });
          return { success: res.success, out: res.msg };
        }
        if (command.includes('app-config.yaml')) {
          const res = engine.apply({
            kind: 'ConfigMap',
            metadata: { name: 'app-config' },
            spec: {},
            data: { 'API_URL': 'http://api.prod.svc', 'DEBUG': 'false' }
          });
          return { success: res.success, out: res.msg };
        }
        if (command.includes('nginx-service.yaml')) {
          const res = engine.apply({
            kind: 'Service',
            metadata: { name: 'nginx-svc' },
            spec: { selector: { app: 'nginx' }, type: 'LoadBalancer' }
          });
          return { success: res.success, out: res.msg };
        }
        if (command.includes('web.yml')) {
          const res = engine.apply({
            kind: 'Deployment',
            metadata: { name: 'web-deployment' },
            spec: { replicas: 3, selector: { matchLabels: { app: 'web' } } }
          });
          return { success: res.success, out: res.msg };
        }
        return { success: false, out: 'error: file not found. Try "nginx-deployment.yaml" or "web.yml"' };
      }

      case 'scale': {
        // kubectl scale deployment [name] --replicas=[n] OR kubectl scale deployment/name --replicas=[n]
        const replicasArg = parts.find(p => p.startsWith('--replicas='));
        if (!replicasArg) return { success: false, out: 'error: --replicas is required' };
        
        const num = parseInt(replicasArg.split('=')[1]);
        let depName = parts[3];
        
        // Handle deployment/web-deployment syntax
        if (parts[2].includes('/')) {
          depName = parts[2].split('/')[1];
        }

        const res = engine.scale(depName, num);
        return { success: res.success, out: res.msg };
      }

      case 'delete': {
        if (type === 'pod' || type === 'pods') {
          const res = engine.deletePod(name);
          return { success: res.success, out: res.msg };
        }
        return { success: false, out: 'error: only pod deletion supported in this sim' };
      }

      case 'expose': {
          // kubectl expose deployment web-deployment --type=LoadBalancer --port=80
          const depName = parts[2];
          const typeArg = parts.find(p => p.startsWith('--type='));
          const portArg = parts.find(p => p.startsWith('--port='));
          
          if (!depName) return { success: false, out: 'error: deployment name required' };
          
          const state = engine.getState();
          const dep = state.deployments.find(d => d.name === depName);
          if (!dep) return { success: false, out: `error: deployment "${depName}" not found` };

          const res = engine.apply({
              kind: 'Service',
              metadata: { name: depName },
              spec: { 
                  selector: dep.selector, 
                  type: typeArg ? typeArg.split('=')[1] : 'ClusterIP',
                  port: portArg ? parseInt(portArg.split('=')[1]) : 80
              }
          });
          return { success: res.success, out: res.msg };
      }

      default:
        return { success: false, out: `kubectl: '${subCommand}' is not a valid command.` };
    }
  }
}
