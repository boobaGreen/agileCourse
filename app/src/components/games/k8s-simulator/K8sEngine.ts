import type { K8sState } from '../../../data/types';

export class K8sEngine {
  private state: K8sState;

  constructor(initialState?: K8sState) {
    if (initialState) {
      this.state = JSON.parse(JSON.stringify(initialState));
      if (!this.state.configMaps) this.state.configMaps = [];
      if (!this.state.secrets) this.state.secrets = [];
      if (!this.state.pvc) this.state.pvc = [];
      if (!this.state.pv) this.state.pv = [];
    } else {
      this.state = {
        nodes: [{ id: 'node-1', name: 'minikube', status: 'Ready' }],
        pods: [],
        services: [],
        deployments: [],
        configMaps: [],
        secrets: [],
        pvc: [],
        pv: []
      };
    }
  }

  public getState(): K8sState {
    return JSON.parse(JSON.stringify(this.state));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 7);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public apply(resource: { kind: string, metadata: { name: string }, spec: any, data?: any, type?: string }): { success: boolean, msg: string } {
    if (resource.kind === 'Deployment') {
      const existing = this.state.deployments.find(d => d.name === resource.metadata.name);
      if (existing) {
        existing.replicas = resource.spec.replicas;
        this.syncPods(existing);
        return { success: true, msg: `deployment.apps/${resource.metadata.name} configured` };
      } else {
        const newDep = {
          id: this.generateId(),
          name: resource.metadata.name,
          replicas: resource.spec.replicas || 1,
          selector: resource.spec.selector.matchLabels
        };
        this.state.deployments.push(newDep);
        this.syncPods(newDep);
        return { success: true, msg: `deployment.apps/${resource.metadata.name} created` };
      }
    }
    
    if (resource.kind === 'Service') {
      const newSvc = {
        id: this.generateId(),
        name: resource.metadata.name,
        type: resource.spec.type || 'ClusterIP',
        selector: resource.spec.selector,
        clusterIP: `10.96.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
        externalIP: resource.spec.type === 'LoadBalancer' ? `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}` : undefined
      };
      this.state.services.push(newSvc);
      return { success: true, msg: `service/${resource.metadata.name} created` };
    }

    if (resource.kind === 'ConfigMap') {
      this.state.configMaps?.push({
        id: this.generateId(),
        name: resource.metadata.name,
        data: resource.data || {}
      });
      return { success: true, msg: `configmap/${resource.metadata.name} created` };
    }

    if (resource.kind === 'Secret') {
      this.state.secrets?.push({
        id: this.generateId(),
        name: resource.metadata.name,
        data: resource.data || {},
        type: resource.type || 'Opaque'
      });
      return { success: true, msg: `secret/${resource.metadata.name} created` };
    }

    if (resource.kind === 'PersistentVolumeClaim') {
       const newPvc = {
         id: this.generateId(),
         name: resource.metadata.name,
         size: resource.spec.resources.requests.storage,
         status: 'Bound' as const
       };
       this.state.pvc?.push(newPvc);
       // Auto-provide a PV if it doesn't exist for simplified simulation
       this.state.pv?.push({
         id: this.generateId(),
         name: `pv-${newPvc.name}`,
         capacity: newPvc.size,
         status: 'Bound' as const
       });
       return { success: true, msg: `persistentvolumeclaim/${resource.metadata.name} created and bound` };
    }

    return { success: false, msg: `error: unknown kind "${resource.kind}"` };
  }

  private syncPods(deployment: K8sState['deployments'][0]) {
    const currentPods = this.state.pods.filter(p => {
      return Object.entries(deployment.selector).every(([k, v]) => p.labels[k] === v);
    });

    if (currentPods.length < deployment.replicas) {
      // Add pods
      for (let i = currentPods.length; i < deployment.replicas; i++) {
        this.state.pods.push({
          id: `${deployment.name}-${this.generateId()}`,
          name: `${deployment.name}-${this.generateId()}`,
          node: this.state.nodes[0].id,
          status: 'Running',
          labels: { ...deployment.selector }
        });
      }
    } else if (currentPods.length > deployment.replicas) {
      // Remove pods
      const toRemove = currentPods.length - deployment.replicas;
      for (let i = 0; i < toRemove; i++) {
        const podIndex = this.state.pods.findIndex(p => p.id === currentPods[i].id);
        this.state.pods.splice(podIndex, 1);
      }
    }
  }

  public scale(name: string, replicas: number): { success: boolean, msg: string } {
    const dep = this.state.deployments.find(d => d.name === name);
    if (!dep) return { success: false, msg: `Error from server (NotFound): deployments.apps "${name}" not found` };
    
    dep.replicas = replicas;
    this.syncPods(dep);
    return { success: true, msg: `deployment.apps/${name} scaled` };
  }

  public deletePod(name: string): { success: boolean, msg: string } {
    const podIndex = this.state.pods.findIndex(p => p.name === name);
    if (podIndex === -1) return { success: false, msg: `Error from server (NotFound): pods "${name}" not found` };
    
    const pod = this.state.pods[podIndex];
    this.state.pods.splice(podIndex, 1);

    // Self-healing: Find if this pod was managed by a deployment
    const managingDep = this.state.deployments.find(d => 
      Object.entries(d.selector).every(([k, v]) => pod.labels[k] === v)
    );

    if (managingDep) {
      this.syncPods(managingDep);
      return { success: true, msg: `pod "${name}" deleted (Self-healing: New pod scheduled by deployment/${managingDep.name})` };
    }

    return { success: true, msg: `pod "${name}" deleted` };
  }
}
