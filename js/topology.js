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
    portfolio: {
      name: 'faisal.host Production Cloud & Edge Architecture',
      render: renderPortfolioTopology,
      defaultDetails: {
        title: 'faisal.host Production Cloud Infrastructure & Edge Ecosystem',
        desc: 'Complete end-to-end cloud platform hosting Faisal’s portfolio. Powered by GitHub Actions GitOps CI/CD, AWS S3 origin storage with OAC, AWS CloudFront global edge CDN with Route 53 DNS and ACM TLS 1.3, automated status monitoring (status.faisal.host), and zero-bloat client simulation engines.',
        chips: ['AWS CloudFront', 'Amazon S3', 'Route 53', 'GitHub Actions', 'status.faisal.host', 'Zero-Framework']
      }
    },
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

  let currentTopology = 'portfolio';

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
      'portfolio-gitops': {
        title: '🚀 GitHub Actions Automated GitOps Pipeline',
        desc: 'Every commit to the main branch triggers an automated CI/CD pipeline in GitHub Actions. It validates static assets, checks integrity, syncs files idempotently to the AWS S3 origin bucket with caching headers, and executes a CloudFront distribution invalidation in <45s.',
        chips: ['GitHub Actions', 'AWS S3 Sync', 'Cache Invalidation (/*)', 'Zero Downtime']
      },
      'portfolio-s3': {
        title: '🪣 AWS S3 Secure Origin Storage',
        desc: 'Production static assets, favicons, stylesheets, and client JavaScript bundles hosted in high-availability Amazon S3 storage with Origin Access Control (OAC), restricting public direct bucket access and enforcing HTTPS via CloudFront.',
        chips: ['Amazon S3', 'Origin Access Control (OAC)', '99.999999999% Durability', 'Private Bucket']
      },
      'portfolio-cloudfront': {
        title: '🌐 AWS CloudFront Global Edge CDN & Route 53 DNS',
        desc: 'Global Anycast Edge CDN across 450+ Points of Presence (PoPs), HTTP/2 & HTTP/3 protocol support, automated gzip/Brotli compression, and managed TLS 1.3 certificates provisioned via AWS Certificate Manager (ACM). Sub-50ms global TTFB latency.',
        chips: ['CloudFront CDN', 'Route 53 DNS', 'ACM TLS 1.3', 'Sub-50ms TTFB', 'Anycast PoPs']
      },
      'portfolio-status': {
        title: '🟢 status.faisal.host — Automated Upptime & SLA Monitor',
        desc: 'Independent uptime monitoring engine hosted on GitHub Pages with automated cron workflows every 5 minutes. Live endpoint health telemetry, automated SLA uptime calculations, incident issue creation, and Let’s Encrypt SSL on custom domain.',
        chips: ['status.faisal.host', '5-Min Cron Healthcheck', 'Live SLA Tracking', 'Incident Dispatch']
      },
      'portfolio-core': {
        title: '⚡ High-Performance Zero-Framework Web Engine',
        desc: 'Engineered entirely with semantic HTML5, modern CSS custom properties (design tokens), and optimized vanilla JavaScript. Zero heavy npm bundles, 100/100 Lighthouse performance score, and sub-100ms first contentful paint.',
        chips: ['Vanilla JS', 'Zero Runtime Bloat', '100 Lighthouse Score', 'Pure CSS Tokens']
      },
      'portfolio-ecosystem': {
        title: '✍️ Cloud Subdomains & Engineering Knowledge Base',
        desc: 'Connected ecosystem including blog.faisal.host for in-depth engineering write-ups and notes.faisal.host for architectural runbooks, alongside 1:1 mentorship scheduling on Topmate.',
        chips: ['blog.faisal.host', 'notes.faisal.host', 'Topmate.io', 'Knowledge Base']
      },
      'portfolio-runtime': {
        title: '💻 Client-Side Interactive Cloud Simulation Engine',
        desc: 'Fully client-side interactive suite: In-browser terminal emulator executing simulated Kubernetes/Terraform/Observability CLI commands, interactive SVG topology inspector with live node data, and reactive contact dispatchers.',
        chips: ['Terminal Emulator', 'Interactive SVG', 'LGTM Telemetry', 'Direct Mailto/WA']
      },
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
  function renderPortfolioTopology() {
    return `
      <svg class="topology-svg" viewBox="0 0 960 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="portBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#172338"/>
            <stop offset="100%" stop-color="#131b2e"/>
          </linearGradient>
          <linearGradient id="portEmerald" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#122c26"/>
            <stop offset="100%" stop-color="#0e231e"/>
          </linearGradient>
          <linearGradient id="portPurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#261b3b"/>
            <stop offset="100%" stop-color="#1c142d"/>
          </linearGradient>
          <linearGradient id="portAmber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2c2214"/>
            <stop offset="100%" stop-color="#1c160e"/>
          </linearGradient>
          <linearGradient id="portCyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0e2838"/>
            <stop offset="100%" stop-color="#0c1d28"/>
          </linearGradient>
          <filter id="softShadowPort" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.55"/>
          </filter>
        </defs>

        <!-- Connecting Flow Lines -->
        <!-- 1. GitOps to S3 -->
        <path d="M155 210 L215 210" stroke="#a855f7" stroke-width="2.5" class="flow-line" />
        
        <!-- 2. S3 to CloudFront -->
        <path d="M345 210 L405 210" stroke="#3b82f6" stroke-width="2.5" class="flow-line" />
        
        <!-- 3. Route 53 to CloudFront -->
        <path d="M480 132 L480 155" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3" />
        
        <!-- 4A. CloudFront to status.faisal.host -->
        <path d="M555 190 C 585 190, 585 117.5, 615 117.5" stroke="#10b981" stroke-width="2.5" class="flow-line" />
        
        <!-- 4B. CloudFront to Core Website -->
        <path d="M555 210 L615 217.5" stroke="#38bdf8" stroke-width="2.5" class="flow-line" />
        
        <!-- 4C. CloudFront to Subdomains & Docs -->
        <path d="M555 230 C 585 230, 585 317.5, 615 317.5" stroke="#f59e0b" stroke-width="2.5" class="flow-line" />
        
        <!-- 5. Core to Client Interactive Runtime -->
        <path d="M760 217.5 L805 217.5" stroke="#38bdf8" stroke-width="2.5" class="flow-line" />

        <!-- Node 1: GitOps CI/CD (GitHub Actions) -->
        <g class="topo-node" onclick="handleNodeClick('portfolio-gitops')" transform="translate(30, 165)">
          <rect width="125" height="90" rx="12" fill="url(#portPurple)" stroke="#a855f7" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadowPort)"/>
          <circle cx="62.5" cy="35" r="16" fill="#a855f7" fill-opacity="0.2"/>
          <text x="62.5" y="40" font-size="16" text-anchor="middle">🚀</text>
          <text x="62.5" y="63" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">GitOps CI/CD</text>
          <text x="62.5" y="77" font-size="9" fill="#c084fc" text-anchor="middle" font-family="Plus Jakarta Sans">GitHub Actions</text>
        </g>

        <!-- Node 2: AWS S3 Origin Bucket -->
        <g class="topo-node" onclick="handleNodeClick('portfolio-s3')" transform="translate(215, 165)">
          <rect width="130" height="90" rx="12" fill="url(#portBlue)" stroke="#3b82f6" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadowPort)"/>
          <circle cx="65" cy="35" r="16" fill="#3b82f6" fill-opacity="0.2"/>
          <text x="65" y="40" font-size="16" text-anchor="middle">🪣</text>
          <text x="65" y="63" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">AWS S3 Origin</text>
          <text x="65" y="77" font-size="9" fill="#93c5fd" text-anchor="middle" font-family="Plus Jakarta Sans">OAC Private Bucket</text>
        </g>

        <!-- Node 3: AWS CloudFront CDN (Global Edge Core) -->
        <g class="topo-node" onclick="handleNodeClick('portfolio-cloudfront')" transform="translate(405, 155)">
          <rect width="150" height="110" rx="14" fill="url(#portCyan)" stroke="#38bdf8" stroke-width="2" filter="url(#softShadowPort)"/>
          <circle cx="75" cy="40" r="18" fill="#38bdf8" fill-opacity="0.2"/>
          <text x="75" y="46" font-size="18" text-anchor="middle">🌐</text>
          <text x="75" y="72" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle" font-family="Plus Jakarta Sans">AWS CloudFront</text>
          <text x="75" y="87" font-size="9.5" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">Global Edge PoPs</text>
          <text x="75" y="100" font-size="8.5" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">TLS 1.3 • ACM Managed</text>
        </g>

        <!-- Route 53 DNS Pill Tag above CloudFront -->
        <g class="topo-node" onclick="handleNodeClick('portfolio-cloudfront')" transform="translate(425, 98)">
          <rect width="110" height="34" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.2"/>
          <text x="55" y="21" font-size="9.5" font-weight="700" fill="#fbbf24" text-anchor="middle" font-family="Plus Jakarta Sans">🛡️ Route 53 DNS</text>
        </g>

        <!-- Node 4A: status.faisal.host -->
        <g class="topo-node" onclick="handleNodeClick('portfolio-status')" transform="translate(615, 75)">
          <rect width="145" height="85" rx="12" fill="url(#portEmerald)" stroke="#10b981" stroke-opacity="0.5" stroke-width="1.5" filter="url(#softShadowPort)"/>
          <circle cx="72.5" cy="33" r="15" fill="#10b981" fill-opacity="0.2"/>
          <text x="72.5" y="38" font-size="15" text-anchor="middle">🟢</text>
          <text x="72.5" y="59" font-size="10.5" font-weight="700" fill="#34d399" text-anchor="middle" font-family="Plus Jakarta Sans">status.faisal.host</text>
          <text x="72.5" y="73" font-size="8.5" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">5-Min Cron • Upptime SLA</text>
        </g>

        <!-- Node 4B: faisal.host Core Engine -->
        <g class="topo-node" onclick="handleNodeClick('portfolio-core')" transform="translate(615, 175)">
          <rect width="145" height="85" rx="12" fill="url(#portBlue)" stroke="#38bdf8" stroke-width="2" filter="url(#softShadowPort)"/>
          <circle cx="72.5" cy="33" r="15" fill="#38bdf8" fill-opacity="0.2"/>
          <text x="72.5" y="38" font-size="15" text-anchor="middle">⚡</text>
          <text x="72.5" y="59" font-size="10.5" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">faisal.host (Core)</text>
          <text x="72.5" y="73" font-size="8.5" fill="#60a5fa" text-anchor="middle" font-family="Plus Jakarta Sans">Zero-Bloat Vanilla Web</text>
        </g>

        <!-- Node 4C: Subdomains & Docs -->
        <g class="topo-node" onclick="handleNodeClick('portfolio-ecosystem')" transform="translate(615, 275)">
          <rect width="145" height="85" rx="12" fill="url(#portAmber)" stroke="#f59e0b" stroke-opacity="0.4" stroke-width="1.5" filter="url(#softShadowPort)"/>
          <circle cx="72.5" cy="33" r="15" fill="#f59e0b" fill-opacity="0.2"/>
          <text x="72.5" y="38" font-size="15" text-anchor="middle">✍️</text>
          <text x="72.5" y="59" font-size="10.5" font-weight="700" fill="#fbbf24" text-anchor="middle" font-family="Plus Jakarta Sans">Subdomains &amp; Docs</text>
          <text x="72.5" y="73" font-size="8.5" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">blog. &amp; notes.faisal.host</text>
        </g>

        <!-- Node 5: Client Interactive Runtime -->
        <g class="topo-node" onclick="handleNodeClick('portfolio-runtime')" transform="translate(805, 165)">
          <rect width="135" height="105" rx="12" fill="url(#portPurple)" stroke="#a855f7" stroke-width="1.5" filter="url(#softShadowPort)"/>
          <circle cx="67.5" cy="36" r="16" fill="#a855f7" fill-opacity="0.2"/>
          <text x="67.5" y="41" font-size="16" text-anchor="middle">💻</text>
          <text x="67.5" y="66" font-size="11" font-weight="700" fill="#f8fafc" text-anchor="middle" font-family="Plus Jakarta Sans">Client Runtime</text>
          <text x="67.5" y="80" font-size="9" fill="#c084fc" text-anchor="middle" font-family="Plus Jakarta Sans">Interactive CLI &amp; SVG</text>
          <text x="67.5" y="93" font-size="8" fill="#94a3b8" text-anchor="middle" font-family="Plus Jakarta Sans">Direct Contact Dispatch</text>
        </g>
      </svg>
    `;
  }

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

  // Initial load: faisal.host Cloud Architecture
  setTopology('portfolio');
});
