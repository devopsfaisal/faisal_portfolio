/**
 * TOPOLOGY.JS — Interactive Cloud Architecture Playground
 * Faisal Ansari Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const topoStage = document.getElementById('topologyStage');
  const tabButtons = document.querySelectorAll('.topo-tab-btn');
  const detailTitle = document.getElementById('topoDetailTitle');
  const detailDesc = document.getElementById('topoDetailDesc');
  const detailChips = document.getElementById('topoDetailChips');

  if (!topoStage || !tabButtons.length) return;

  const topologies = {
    aws: {
      name: 'AWS Elastic EKS & Karpenter Autoscaling',
      render: renderAWSTopology,
      defaultDetails: {
        title: 'Dynamic Workload-Driven AWS EKS Infrastructure',
        desc: 'Modern cloud platform provisioned 100% via Terraform. Features dynamic node lifecycle management via Karpenter (sub-40s node provisioning for workload spikes), ALB ingress controllers, and a full LGTM (Prometheus, Loki, Tempo, Grafana) observability pipeline.',
        chips: ['AWS EKS', 'Karpenter', 'Terraform', 'LGTM Stack', 'DevSecOps']
      }
    },
    appliance: {
      name: 'Air-Gapped On-Premises Kubernetes Appliance',
      render: renderApplianceTopology,
      defaultDetails: {
        title: 'Portable Kubernetes Appliance (VMDK Packaging)',
        desc: 'Pre-packaged application appliance engineered for enterprise clients on VMware & Nutanix on-premise infrastructure. Incorporates MicroK8s, S3 artifact syncing, personally engineered Sealed Secrets automation, and automated DB backup/recovery workflows.',
        chips: ['MicroK8s', 'VMware VMDK', 'Sealed Secrets', 'Helm Stack', 'Air-Gapped']
      }
    },
    observability: {
      name: 'Multi-Cloud GitOps & LGTM Observability Platform',
      render: renderObservabilityTopology,
      defaultDetails: {
        title: 'Enterprise LGTM Observability & GitOps Delivery Pipeline',
        desc: 'End-to-end continuous delivery and platform telemetry stack. Unifies Terraform IaC with GitHub Actions, OpenTelemetry collectors, Prometheus metrics, Grafana Loki log streams, and Grafana Tempo distributed trace graphs.',
        chips: ['Prometheus', 'Grafana Loki', 'Grafana Tempo', 'OpenTelemetry', 'GitOps']
      }
    }
  };

  let currentTopology = 'aws';

  function updateDetails(title, desc, chips) {
    if (detailTitle) detailTitle.innerHTML = title;
    if (detailDesc) detailDesc.innerHTML = desc;
    if (detailChips) {
      detailChips.innerHTML = chips.map(c => `<span class="badge badge-blue">${c}</span>`).join('');
    }
  }

  // Node Click Handlers Map
  window.handleNodeClick = function(nodeId) {
    const nodeDetails = {
      'aws-karpenter': {
        title: '🚀 Karpenter Just-In-Time Node Autoscaler',
        desc: 'Replaced rigid Cluster Autoscaler with Karpenter. Automatically provisions heterogeneous EC2 spot/on-demand instances matched precisely to pod compute/memory requests in ~35 seconds, slashing cloud compute costs by 38%.',
        chips: ['Sub-minute Provisioning', 'Multi-Arch Support', '38% Cost Reduction']
      },
      'aws-eks': {
        title: '☸️ Amazon EKS v1.30 Managed Cluster',
        desc: 'Production Kubernetes cluster deployed across multiple Availability Zones with automated Control Plane scaling, IRSA (IAM Roles for Service Accounts), and dynamic volume provisioning.',
        chips: ['Multi-AZ', 'IRSA', 'ALB Ingress Controller', 'Karpenter Managed']
      },
      'aws-lgtm': {
        title: '📊 Full-Stack LGTM Observability Engine',
        desc: 'Unified correlation across metrics (Prometheus), logs (Loki), traces (Tempo), and single-pane-of-glass dashboards (Grafana). Significantly reduced Mean Time to Detect (MTTD) and Isolate (MTTI).',
        chips: ['Distributed Tracing', 'PromQL', 'LogQL', 'SLO/SLA Tracking']
      },
      'app-sealed-secrets': {
        title: '🔐 Personally Engineered Sealed Secrets Automation',
        desc: 'Built custom automation using kubeseal to securely encrypt sensitive credentials into git-safe SealedSecret manifests, preventing plain Kubernetes Secret exposure across external customer release bundles.',
        chips: ['Asymmetric Encryption', 'GitOps Safe', 'Zero-Plaintext Delivery']
      },
      'app-microk8s': {
        title: '⚙️ MicroK8s Portable Runtime',
        desc: 'Zero-friction on-premise lightweight Kubernetes cluster running within customer VMware ESXi and Nutanix virtual machines, configured with internal container registries and offline caching.',
        chips: ['Air-Gap Enabled', 'VMDK Packaged', 'Self-Healing']
      },
      'gitops-cicd': {
        title: '🏗️ GitOps CI/CD & Terraform Engine',
        desc: 'Declarative pipelines validating pull requests, executing automated SAST/DAST container scans, and rolling out infrastructure updates idempotently with zero drift.',
        chips: ['GitHub Actions', 'Terraform Cloud', 'Idempotent IaC', 'Shift-Left']
      }
    };

    if (nodeDetails[nodeId]) {
      const item = nodeDetails[nodeId];
      updateDetails(item.title, item.desc, item.chips);
    }
  };

  // Render Functions
  function renderAWSTopology() {
    return `
      <svg class="topology-svg" viewBox="0 0 960 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="awsBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#172338"/>
            <stop offset="100%" stop-color="#131b2e"/>
          </linearGradient>
          <linearGradient id="awsEmerald" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#122c26"/>
            <stop offset="100%" stop-color="#0e231e"/>
          </linearGradient>
          <linearGradient id="awsPurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#261b3b"/>
            <stop offset="100%" stop-color="#1c142d"/>
          </linearGradient>
          <filter id="softShadow2" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
          </filter>
        </defs>

        <!-- Connecting Flow Lines -->
        <path d="M150 210 L240 210" stroke="#3b82f6" stroke-width="2.5" class="flow-line" />
        <path d="M380 210 L470 140" stroke="#10b981" stroke-width="2.5" class="flow-line" />
        <path d="M380 210 L470 280" stroke="#a855f7" stroke-width="2.5" class="flow-line" />
        <path d="M610 140 L700 210" stroke="#38bdf8" stroke-width="2.5" class="flow-line" />
        <path d="M610 280 L700 210" stroke="#38bdf8" stroke-width="2.5" class="flow-line" />
        <path d="M840 210 L890 210" stroke="#10b981" stroke-width="2.5" class="flow-line" />

        <!-- Node 1: Terraform IaC Pipeline -->
        <g class="topo-node" onclick="handleNodeClick('gitops-cicd')" transform="translate(30, 165)">
          <rect width="120" height="90" rx="12" fill="url(#awsBlue)" stroke="#2a3d5e" stroke-width="1.5" filter="url(#softShadow2)"/>
          <circle cx="60" cy="36" r="16" fill="#a855f7" fill-opacity="0.2"/>
          <text x="60" y="41" font-size="16" text-anchor="middle">🏗️</text>
          <text x="60" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">Terraform IaC</text>
          <text x="60" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">GitHub Actions CI</text>
        </g>

        <!-- Node 2: Amazon EKS Cluster -->
        <g class="topo-node" onclick="handleNodeClick('aws-eks')" transform="translate(240, 165)">
          <rect width="140" height="90" rx="12" fill="url(#awsEmerald)" stroke="#10b981" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadow2)"/>
          <circle cx="70" cy="36" r="16" fill="#10b981" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">☸️</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">Amazon EKS</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Multi-AZ VPC Core</text>
        </g>

        <!-- Node 3A: Karpenter Dynamic Node Autoscaler -->
        <g class="topo-node" onclick="handleNodeClick('aws-karpenter')" transform="translate(470, 95)">
          <rect width="140" height="90" rx="12" fill="url(#awsBlue)" stroke="#3b82f6" stroke-width="2" filter="url(#softShadow2)"/>
          <circle cx="70" cy="36" r="16" fill="#3b82f6" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">🚀</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#60a5fa" text-anchor="middle" font-family="Plus Jakarta Sans">Karpenter Autoscaler</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Dynamic &lt;40s Scale</text>
        </g>

        <!-- Node 3B: DevSecOps Gate -->
        <g class="topo-node" transform="translate(470, 235)">
          <rect width="140" height="90" rx="12" fill="url(#awsPurple)" stroke="#a855f7" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadow2)"/>
          <circle cx="70" cy="36" r="16" fill="#a855f7" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">🔒</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">DevSecOps Pipeline</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Trivy + SonarQube</text>
        </g>

        <!-- Node 4: LGTM Full Observability -->
        <g class="topo-node" onclick="handleNodeClick('aws-lgtm')" transform="translate(700, 165)">
          <rect width="140" height="90" rx="12" fill="url(#awsBlue)" stroke="#38bdf8" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadow2)"/>
          <circle cx="70" cy="36" r="16" fill="#38bdf8" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">📈</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">LGTM Observability</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Prom + Loki + Tempo</text>
        </g>

        <!-- Node 5: Enterprise Multi-AZ Storage -->
        <g class="topo-node" transform="translate(850, 165)">
          <rect width="90" height="90" rx="12" fill="url(#awsEmerald)" stroke="#10b981" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadow2)"/>
          <circle cx="45" cy="36" r="16" fill="#10b981" fill-opacity="0.2"/>
          <text x="45" y="41" font-size="16" text-anchor="middle">🗄️</text>
          <text x="45" y="64" font-size="10" font-weight="700" fill="#34d399" text-anchor="middle" font-family="Plus Jakarta Sans">RDS &amp; S3</text>
          <text x="45" y="78" font-size="8" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Automated DR</text>
        </g>
      </svg>
    `;
  }

  function renderApplianceTopology() {
    return `
      <svg class="topology-svg" viewBox="0 0 960 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="appGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1e2c45"/>
            <stop offset="100%" stop-color="#141d2e"/>
          </linearGradient>
          <filter id="softShadow3" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
          </filter>
        </defs>

        <!-- Connecting Flow Lines -->
        <path d="M160 210 L250 210" stroke="#3b82f6" stroke-width="2.5" class="flow-line" />
        <path d="M390 210 L480 140" stroke="#a855f7" stroke-width="2.5" class="flow-line" />
        <path d="M390 210 L480 280" stroke="#10b981" stroke-width="2.5" class="flow-line" />
        <path d="M620 140 L710 210" stroke="#38bdf8" stroke-width="2.5" class="flow-line" />
        <path d="M620 280 L710 210" stroke="#38bdf8" stroke-width="2.5" class="flow-line" />
        <path d="M850 210 L900 210" stroke="#10b981" stroke-width="2.5" class="flow-line" />

        <!-- Node 1: S3 Artifact & Image Sync -->
        <g class="topo-node" transform="translate(30, 165)">
          <rect width="130" height="90" rx="12" fill="url(#appGrad)" stroke="#2a3d5e" stroke-width="1.5" filter="url(#softShadow3)"/>
          <circle cx="65" cy="36" r="16" fill="#3b82f6" fill-opacity="0.2"/>
          <text x="65" y="41" font-size="16" text-anchor="middle">📦</text>
          <text x="65" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">S3 Image Sync</text>
          <text x="65" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Offline Tarballs</text>
        </g>

        <!-- Node 2: VMDK Appliance Packaging -->
        <g class="topo-node" transform="translate(250, 165)">
          <rect width="140" height="90" rx="12" fill="url(#appGrad)" stroke="#38bdf8" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadow3)"/>
          <circle cx="70" cy="36" r="16" fill="#38bdf8" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">💾</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">VMDK Appliance</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">VMware / Nutanix</text>
        </g>

        <!-- Node 3A: Sealed Secrets Automation -->
        <g class="topo-node" onclick="handleNodeClick('app-sealed-secrets')" transform="translate(480, 95)">
          <rect width="140" height="90" rx="12" fill="url(#appGrad)" stroke="#a855f7" stroke-width="2" filter="url(#softShadow3)"/>
          <circle cx="70" cy="36" r="16" fill="#a855f7" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">🔐</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#c084fc" text-anchor="middle" font-family="Plus Jakarta Sans">Sealed Secrets</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Encrypted Manifests</text>
        </g>

        <!-- Node 3B: MicroK8s Runtime Engine -->
        <g class="topo-node" onclick="handleNodeClick('app-microk8s')" transform="translate(480, 235)">
          <rect width="140" height="90" rx="12" fill="url(#appGrad)" stroke="#10b981" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadow3)"/>
          <circle cx="70" cy="36" r="16" fill="#10b981" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">⚙️</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">MicroK8s Engine</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">App &amp; Tunnel Pods</text>
        </g>

        <!-- Node 4: Helm Stack (Prometheus + Kafka) -->
        <g class="topo-node" transform="translate(710, 165)">
          <rect width="140" height="90" rx="12" fill="url(#appGrad)" stroke="#2a3d5e" stroke-width="1.5" filter="url(#softShadow3)"/>
          <circle cx="70" cy="36" r="16" fill="#3b82f6" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">☸️</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">Helm Monitoring</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Prometheus &amp; Kafka</text>
        </g>

        <!-- Node 5: Customer Network Target -->
        <g class="topo-node" transform="translate(860, 165)">
          <rect width="80" height="90" rx="12" fill="url(#appGrad)" stroke="#10b981" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadow3)"/>
          <circle cx="40" cy="36" r="16" fill="#10b981" fill-opacity="0.2"/>
          <text x="40" y="41" font-size="16" text-anchor="middle">🏢</text>
          <text x="40" y="64" font-size="10" font-weight="700" fill="#34d399" text-anchor="middle" font-family="Plus Jakarta Sans">Customer DC</text>
          <text x="40" y="78" font-size="8" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Isolated Airgap</text>
        </g>
      </svg>
    `;
  }

  function renderObservabilityTopology() {
    return `
      <svg class="topology-svg" viewBox="0 0 960 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="obsGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#182338"/>
            <stop offset="100%" stop-color="#121b2d"/>
          </linearGradient>
          <filter id="softShadow4" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
          </filter>
        </defs>

        <!-- Connecting Flow Lines -->
        <path d="M150 210 L240 210" stroke="#3b82f6" stroke-width="2.5" class="flow-line" />
        <path d="M380 210 L470 130" stroke="#f59e0b" stroke-width="2.5" class="flow-line" />
        <path d="M380 210 L470 210" stroke="#38bdf8" stroke-width="2.5" class="flow-line" />
        <path d="M380 210 L470 290" stroke="#a855f7" stroke-width="2.5" class="flow-line" />
        <path d="M610 130 L700 210" stroke="#10b981" stroke-width="2.5" class="flow-line" />
        <path d="M610 210 L700 210" stroke="#10b981" stroke-width="2.5" class="flow-line" />
        <path d="M610 290 L700 210" stroke="#10b981" stroke-width="2.5" class="flow-line" />
        <path d="M840 210 L900 210" stroke="#f59e0b" stroke-width="2.5" class="flow-line" />

        <!-- Node 1: Workload Spans & Telemetry -->
        <g class="topo-node" transform="translate(30, 165)">
          <rect width="120" height="90" rx="12" fill="url(#obsGrad)" stroke="#2a3d5e" stroke-width="1.5" filter="url(#softShadow4)"/>
          <circle cx="60" cy="36" r="16" fill="#3b82f6" fill-opacity="0.2"/>
          <text x="60" y="41" font-size="16" text-anchor="middle">📡</text>
          <text x="60" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">OTel Collector</text>
          <text x="60" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Sidecars &amp; Daemons</text>
        </g>

        <!-- Node 2: Pipeline Gateway -->
        <g class="topo-node" transform="translate(240, 165)">
          <rect width="140" height="90" rx="12" fill="url(#obsGrad)" stroke="#38bdf8" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadow4)"/>
          <circle cx="70" cy="36" r="16" fill="#38bdf8" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">⚡</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">Data Stream</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Correlated Routing</text>
        </g>

        <!-- Node 3A: Prometheus Metrics -->
        <g class="topo-node" onclick="handleNodeClick('aws-lgtm')" transform="translate(470, 85)">
          <rect width="140" height="90" rx="12" fill="url(#obsGrad)" stroke="#f59e0b" stroke-width="1.5" filter="url(#softShadow4)"/>
          <circle cx="70" cy="36" r="16" fill="#f59e0b" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">📈</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#fbbf24" text-anchor="middle" font-family="Plus Jakarta Sans">Prometheus</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">PromQL &amp; Alerts</text>
        </g>

        <!-- Node 3B: Grafana Loki Logs -->
        <g class="topo-node" onclick="handleNodeClick('aws-lgtm')" transform="translate(470, 165)">
          <rect width="140" height="90" rx="12" fill="url(#obsGrad)" stroke="#38bdf8" stroke-width="1.5" filter="url(#softShadow4)"/>
          <circle cx="70" cy="36" r="16" fill="#38bdf8" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">📜</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="middle" font-family="Plus Jakarta Sans">Grafana Loki</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">High-Throughput Logs</text>
        </g>

        <!-- Node 3C: Grafana Tempo Traces -->
        <g class="topo-node" onclick="handleNodeClick('aws-lgtm')" transform="translate(470, 245)">
          <rect width="140" height="90" rx="12" fill="url(#obsGrad)" stroke="#a855f7" stroke-width="1.5" filter="url(#softShadow4)"/>
          <circle cx="70" cy="36" r="16" fill="#a855f7" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">🔍</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#c084fc" text-anchor="middle" font-family="Plus Jakarta Sans">Grafana Tempo</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Distributed Tracing</text>
        </g>

        <!-- Node 4: Grafana Unified Console -->
        <g class="topo-node" transform="translate(700, 165)">
          <rect width="140" height="90" rx="12" fill="url(#obsGrad)" stroke="#10b981" stroke-width="2" filter="url(#softShadow4)"/>
          <circle cx="70" cy="36" r="16" fill="#10b981" fill-opacity="0.2"/>
          <text x="70" y="41" font-size="16" text-anchor="middle">🖥️</text>
          <text x="70" y="64" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle" font-family="Plus Jakarta Sans">Grafana Dashboard</text>
          <text x="70" y="78" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Unified Single Pane</text>
        </g>

        <!-- Node 5: PagerDuty / OpsGenie Alerts -->
        <g class="topo-node" transform="translate(860, 165)">
          <rect width="80" height="90" rx="12" fill="url(#obsGrad)" stroke="#f59e0b" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadow4)"/>
          <circle cx="40" cy="36" r="16" fill="#f59e0b" fill-opacity="0.2"/>
          <text x="40" y="41" font-size="16" text-anchor="middle">🚨</text>
          <text x="40" y="64" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="middle" font-family="Plus Jakarta Sans">Alerts</text>
          <text x="40" y="78" font-size="8" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">24/7 SRE</text>
        </g>
      </svg>
    `;
  }

  function setTopology(key) {
    if (!topologies[key]) return;
    currentTopology = key;

    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-topo') === key);
    });

    topoStage.innerHTML = topologies[key].render();
    const def = topologies[key].defaultDetails;
    updateDetails(def.title, def.desc, def.chips);
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-topo');
      setTopology(key);
    });
  });

  // Initial load: AWS EKS
  setTopology('aws');
});
