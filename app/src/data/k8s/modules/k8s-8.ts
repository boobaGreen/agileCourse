import type { Module } from '../../types'

export const k8s8: Module = {
  id: 'k8s-8',
  track: 'k8s',
  order: 8,
  title: 'Hands-on Labs: Playground',
  subtitle: 'Free clusters to practice safely',
  emoji: '🧪',
  duration: '45+ min',
  xpReward: 100,
  externalLink: {
    label: 'Launch Killercoda K8s Lab',
    url: 'https://killercoda.com/playgrounds/scenario/kubernetes',
    xpPrompt: 'How many Killercoda tasks did you conquer? Enter below!'
  },
  sections: [
    {
      type: 'intro',
      content: 'You cannot learn Kubernetes entirely by reading theory. You MUST use `kubectl`. The good news? You do not need to install Minikube or pay Google Cloud. Free browser-based cluster environments exist.'
    },
    {
      type: 'concept',
      title: '🌐 Tool 1: Killercoda Playgrounds',
      content: '**Killercoda** is the absolute best free Kubernetes playground. \n\n- Gives you a two-node cluster (1 Master, 1 Worker)\n- Already configured with autocomplete and right permissions\n- 100% Free, runs instantly in the browser\n\n🔗 **URL**: [https://killercoda.com](https://killercoda.com)'
    },
    {
      type: 'concept',
      title: '📚 Tool 2: K8s Official Tutorials',
      content: 'The official K8s documentation has an excellent interactive tutorial track.\n\n🔗 **URL**: [https://kubernetes.io/docs/tutorials/kubernetes-basics/](https://kubernetes.io/docs/tutorials/kubernetes-basics/)\n\n💡 **Recommended Focus:**\nDeploy an App -> Expose your app (Service) -> Scale your app -> Update your app.'
    },
    {
      type: 'tip',
      title: '🎯 The Golden Rule of Debugging',
      content: 'When things break in your lab, follow the **K8s Debugging Trinity** in this exact order:\n1. `kubectl get pods` (Are they running or crashing?)\n2. `kubectl describe pod [name]` (Look at the "Events" at the bottom for errors!)\n3. `kubectl logs [name]` (Read the actual application error stacktrace)'
    },
    {
      type: 'table',
      title: '🚩 Common Pod Statuses & Fixes',
      content: 'If `kubectl get pods` shows anything other than `Running`, use this guide:',
      tableData: {
        headers: ['Status', 'Meaning', 'Primary Cause'],
        rows: [
          ['`ImagePullBackOff`', 'K8s cannot download your container image', 'Typo in image name or private registry credentials missing'],
          ['`CrashLoopBackOff`', 'The app starts but then crashes recursively', 'Code bug, missing secret, or database connection timeout'],
          ['`Pending`', 'The pod is "waiting in line" for a node', 'Cluster is out of CPU/RAM or no PV is available for storage'],
          ['`OOMKilled`', 'The container tried to use more RAM than allowed', 'Memory leak or resource limit set too low']
        ]
      }
    }
  ]
}
