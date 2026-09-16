/**
 * TERMINAL.JS — Interactive Cloud & DevOps CLI Simulator
 * Faisal Ansari Portfolio
 * State Bank of India Production Platform Environment
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  const quickChips = document.querySelectorAll('.quick-cmd-chip');
  const clearBtn = document.getElementById('termClearBtn');
  const copyBtn = document.getElementById('termCopyBtn');

  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const PROMPT_PATH = '~/cloud-platform';
  const PROMPT_USER = 'faisal@cloud-node';

  // Core Command Handlers
  const commands = {
    help: () => `
<span class="term-hl-blue">Available Platform Commands:</span>
  <span class="term-hl-purple">kubectl get nodes</span>      List production EKS cluster nodes & Karpenter dynamic instances
  <span class="term-hl-purple">kubectl get pods -A</span>    Display platform workloads across system & application namespaces
  <span class="term-hl-purple">terraform plan</span>        Simulate Terraform IaC execution for EKS + Karpenter + VPC
  <span class="term-hl-purple">istioctl analyze</span>      Validate service-mesh mTLS & traffic routing policies
  <span class="term-hl-amber">promql --kafka-lag</span>    Query Prometheus for Kafka consumer lag across message streams
  <span class="term-hl-purple">loki --gemfire-logs</span>   Stream Grafana Loki logs for in-memory cache health
  <span class="term-hl-blue">tempo --trace</span>         Inspect distributed microservice trace span waterfall
  <span class="term-hl-green">grafana alerts</span>        Check production SLI/SLO threshold health status
  <span class="term-hl-cyan">docker ps</span>             Inspect active container runtimes
  <span class="term-hl-cyan">helm list</span>             List deployed enterprise Helm releases
  <span class="term-hl-cyan">telemetry</span>             Query live AWS CloudFront edge latency & S3 origin health
  <span class="term-hl-green">status</span>                Inspect live platform SLA uptime (status.faisal.host)
  <span class="term-hl-purple">topmate</span>               Book 1:1 DevOps mentorship session (topmate.io)
  <span class="term-hl-purple">blog</span>                  Open engineering blog & deep dives (blog.faisal.host)
  <span class="term-hl-purple">notes</span>                 Open Notion architecture runbooks & notes (notes.faisal.host)
  <span class="term-hl-purple">resume</span>                Download official PDF resume (Faisal_Ansari_Resume.pdf)
  <span class="term-hl-purple">faisal --experience</span>   Summarize 8+ years of progressive DevOps & Cloud roles
  <span class="term-hl-purple">faisal --certifications</span> Print verified AWS & GitHub enterprise credentials
  <span class="term-hl-purple">faisal --contact</span>        Show direct communication channels
  <span class="term-hl-dim">whoami | pwd | ls | git status | uname -a | uptime | clear</span>
`,

    'kubectl get nodes': () => `
<span class="term-hl-dim">NAME                         STATUS   ROLES           AGE   VERSION         INSTANCE-TYPE</span>
eks-core-control-plane-01    <span class="term-hl-green">Ready</span>    control-plane   180d  v1.30.2-eks     m6i.2xlarge (Multi-AZ)
eks-core-control-plane-02    <span class="term-hl-green">Ready</span>    control-plane   180d  v1.30.2-eks     m6i.2xlarge (Multi-AZ)
eks-karpenter-c6i-4xl-9af8   <span class="term-hl-green">Ready</span>    worker,dynamic  42m   v1.30.2-eks     c6i.4xlarge (Auto-Provisioned)
eks-karpenter-m6i-2xl-3b1c   <span class="term-hl-green">Ready</span>    worker,dynamic  15m   v1.30.2-eks     m6i.2xlarge (Spot Instance)
eks-karpenter-r6i-4xl-7e2a   <span class="term-hl-green">Ready</span>    worker,memory   2h    v1.30.2-eks     r6i.4xlarge (Cache Tier)
<span class="term-hl-blue">ℹ Karpenter dynamic capacity provisioned 2 spot nodes in 34.2s for workload spike.</span>
`,

    'kubectl get pods -A': () => `
<span class="term-hl-dim">NAMESPACE          NAME                                READY   STATUS    RESTARTS   AGE</span>
kube-system        karpenter-6c849b7754-w9f2l          1/1     <span class="term-hl-green">Running</span>   0          45d
kube-system        aws-load-balancer-controller-7bd8   1/1     <span class="term-hl-green">Running</span>   0          45d
production         api-gateway-v2-broker-0             2/2     <span class="term-hl-green">Running</span>   0          38d
production         payment-processor-cluster-1         2/2     <span class="term-hl-green">Running</span>   0          38d
observability      prometheus-k8s-0                    2/2     <span class="term-hl-green">Running</span>   0          75d
observability      grafana-loki-stack-8f921-xz7        1/1     <span class="term-hl-green">Running</span>   0          75d
observability      tempo-distributed-tracer-4k9l       1/1     <span class="term-hl-green">Running</span>   0          75d
security           sealed-secrets-controller-6d4b      1/1     <span class="term-hl-green">Running</span>   0          90d
<span class="term-hl-green">✔ 8/8 core cloud workloads &amp; observability platform pods healthy. Zero restarts.</span>
`,

    'kubectl get services': () => `
<span class="term-hl-dim">NAMESPACE     NAME                          TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)</span>
default       kubernetes                    ClusterIP      172.20.0.1      &lt;none&gt;          443/TCP
production    api-gateway-v2                LoadBalancer   172.20.14.82    k8s-alb-prod    80:31280/TCP,443:31443/TCP
production    inmemory-cache-cluster        ClusterIP      172.20.89.103   &lt;none&gt;          10334/TCP,40404/TCP
observability prometheus-operated           ClusterIP      172.20.120.45   &lt;none&gt;          9090/TCP
security      sealed-secrets-controller     ClusterIP      172.20.210.19   &lt;none&gt;          8080/TCP
<span class="term-hl-green">✔ All production service mesh endpoints registered and healthy.</span>
`,

    'kubectl cluster-info': () => `
<span class="term-hl-green">Kubernetes control plane</span> is running at <span class="term-hl-blue">https://eks-core-prod.internal.sbi:6443</span>
<span class="term-hl-green">CoreDNS</span> is running at <span class="term-hl-blue">https://eks-core-prod.internal.sbi:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy</span>
<span class="term-hl-dim">Metrics Server, Karpenter CRDs, and Istio CNI active.</span>
`,

    'terraform plan': () => `
<span class="term-hl-blue">[TERRAFORM PLAN: AWS MULTI-REGION INFRASTRUCTURE]</span>
Initializing provider plugins:
- hashicorp/aws v5.42.0 (verified)
- hashicorp/kubernetes v2.26.0 (verified)
- hashicorp/helm v2.12.0 (verified)

<span class="term-hl-green">+ module.vpc.aws_vpc.primary (10.0.0.0/16 Multi-AZ)</span>
<span class="term-hl-green">+ module.eks_cluster.aws_eks_cluster.core_platform (v1.30)</span>
<span class="term-hl-green">+ module.karpenter.aws_iam_role.karpenter_controller (IRSA)</span>
<span class="term-hl-green">+ module.observability.lgtm_stack_helm_release</span>

<span class="term-hl-dim">Plan: 14 to add, 0 to change, 0 to destroy.</span>
<span class="term-hl-green">✔ Plan verified against AWS Well-Architected Framework &amp; CIS Benchmarks.</span>
`,

    'istioctl analyze': () => `
<span class="term-hl-blue">✔ Analyzed 38 Istio service-mesh resources across 5 namespaces.</span>
<span class="term-hl-green">✔ STRICT mTLS 1.3 policy active on ingress gateway and mesh workloads.</span>
<span class="term-hl-green">✔ VirtualService 'cloud-ingress-router' validated with zero routing ambiguities.</span>
<span class="term-hl-green">✔ Envoy sidecar injection enabled on all production pods.</span>
<span class="term-hl-dim">No configuration issues detected. (0 warnings, 0 errors)</span>
`,

    'promql --kafka-lag': () => `
<span class="term-hl-blue">[PROMETHEUS PromQL: sum by (consumergroup) (kafka_consumergroup_lag{topic=~"event-stream-.*"})]</span>
<span class="term-hl-dim">TIMESTAMP: 2026-09-11T00:15:00Z  EVALUATION_DURATION: 3.8ms  STATUS: SUCCESS</span>

<span class="term-hl-dim">CONSUMER_GROUP                  PARTITIONS  CURRENT_OFFSET  LOG_END_OFFSET  LAG (MSGS)  HEALTH</span>
instant-settlement-processor    12          14,892,104      14,892,108      <span class="term-hl-green">4</span>           <span class="term-hl-green">OPTIMAL</span>
event-streaming-pipeline        24          28,491,230      28,491,244      <span class="term-hl-green">14</span>          <span class="term-hl-green">OPTIMAL</span>
notification-dispatcher         16          52,190,442      52,190,459      <span class="term-hl-green">17</span>          <span class="term-hl-green">OPTIMAL</span>
audit-ledger-archiver           8           9,401,290       9,401,299       <span class="term-hl-green">9</span>           <span class="term-hl-green">OPTIMAL</span>

<span class="term-hl-green">✔ All topic partitions operating within normal thresholds.</span>
<span class="term-hl-blue">ℹ Max partition lag is 17 msgs (Alert threshold: 500 msgs). Consumer group rebalance count: 0.</span>
`,

    'loki --gemfire-logs': () => `
<span class="term-hl-blue">[GRAFANA LOKI LogQL: {app="inmemory-cache", namespace="production"} |= "memory" | json]</span>
<span class="term-hl-dim">Showing latest log streams from cache-server-0, cache-server-1:</span>

<span class="term-hl-dim">00:14:52.104</span> [cache-server-0] <span class="term-hl-green">INFO</span> CacheService: Heap allocated: 24.2GB / 32GB (75.6%). Off-heap: 48GB.
<span class="term-hl-dim">00:14:53.489</span> [cache-server-0] <span class="term-hl-green">INFO</span> PartitionManager: 113 primary buckets balanced across active nodes.
<span class="term-hl-dim">00:14:54.012</span> [cache-server-1] <span class="term-hl-green">INFO</span> GCManager: G1GC Young Gen pause time: <span class="term-hl-green">8.4ms</span> (P99 threshold: 50ms).
<span class="term-hl-dim">00:14:55.720</span> [cache-server-1] <span class="term-hl-green">INFO</span> EvictionPolicy: Zero critical evictions triggered. Cache hit ratio: <span class="term-hl-green">99.2%</span>.
<span class="term-hl-dim">00:14:56.115</span> [cache-server-0] <span class="term-hl-green">INFO</span> HealthCheck: In-memory transaction fabric healthy. 0 OutOfMemory exceptions.
`,

    'tempo --trace': () => `
<span class="term-hl-blue">[GRAFANA TEMPO: Distributed Trace Span Waterfall: 429f-8a12-cloud-transact]</span>
<span class="term-hl-dim">Root Span: HTTP POST /api/v2/workload/execute  Total Latency: 41.8ms  Status: 200 OK</span>

<span class="term-hl-purple">istio-ingressgateway</span>        |████████████████████████████████| <span class="term-hl-dim">41.8ms (root)</span>
  ↳ <span class="term-hl-blue">envoy.mtls.handshake</span>     |█                               | <span class="term-hl-green">1.2ms (mTLS 1.3 verified)</span>
  ↳ <span class="term-hl-blue">auth-service</span>             |████                            | <span class="term-hl-green">5.4ms (JWT + IAM valid)</span>
  ↳ <span class="term-hl-blue">workload-orchestrator</span>    |██████████████                  | <span class="term-hl-green">18.2ms</span>
     ↳ <span class="term-hl-green">cache-server.get</span>      |█                               | <span class="term-hl-green">1.4ms (P99 memory hit)</span>
     ↳ <span class="term-hl-green">kafka.produce-event</span>   |██                              | <span class="term-hl-green">2.8ms (ack=all, broker-0)</span>
     ↳ <span class="term-hl-green">rds-aurora.commit</span>     |████████                        | <span class="term-hl-green">10.6ms (ACID TX saved)</span>

<span class="term-hl-green">✔ Trace completed in 41.8ms (SLA target: &lt;150ms). Zero errors or dropped spans.</span>
`,

    'grafana alerts': () => `
<span class="term-hl-blue">[GRAFANA ENTERPRISE ALERTING: Active Platform Rules]</span>
<span class="term-hl-green">[OK]</span>  <span class="term-hl-purple">KafkaConsumerLagSurge</span>        Lag &lt; 500 msgs               (Current: 14 msgs)
<span class="term-hl-green">[OK]</span>  <span class="term-hl-purple">EKSClusterNodeMemoryPressure</span> Memory &lt; 85%                 (Current: 64.2%)
<span class="term-hl-green">[OK]</span>  <span class="term-hl-purple">CacheOffHeapSpike</span>            Off-heap free &gt; 20%          (Current: 41% free)
<span class="term-hl-green">[OK]</span>  <span class="term-hl-purple">IstioMTLSRoutingErrors</span>       5xx Error Rate &lt; 0.05%       (Current: 0.001%)
<span class="term-hl-green">[OK]</span>  <span class="term-hl-purple">KarpenterScaleLatency</span>        Provision Time &lt; 60s         (Current: 34.2s)
<span class="term-hl-green">[OK]</span>  <span class="term-hl-purple">SecurityAuditLogSync</span>         SIEM ingest delay &lt; 5s       (Current: 0.8s)

<span class="term-hl-green">✔ 6/6 critical platform and cloud alert rules are green. Zero active firing incidents.</span>
`,

    'docker ps': () => `
<span class="term-hl-dim">CONTAINER ID   IMAGE                                     COMMAND                  STATUS         PORTS</span>
c381a9f140de   registry.sbi.co.in/prod/api-gateway:v2.4  "/entrypoint.sh"         <span class="term-hl-green">Up 38 days</span>     0.0.0.0:8443->8443/tcp
7b92dc1a03f4   registry.sbi.co.in/prod/cache-engine:v3.1 "bin/gemfire run"        <span class="term-hl-green">Up 38 days</span>     10334/tcp,40404/tcp
f9a44bc28d11   registry.sbi.co.in/sec/sealed-secrets:0.24 "/sealed-secrets"       <span class="term-hl-green">Up 90 days</span>     8080/tcp
<span class="term-hl-green">✔ 3 local container runtimes active and isolated.</span>
`,

    'helm list': () => `
<span class="term-hl-dim">NAME                         NAMESPACE      REVISION  UPDATED                   STATUS    CHART                 APP VERSION</span>
karpenter                    kube-system    4         2026-08-01 11:20:14 IST   <span class="term-hl-green">deployed</span>  karpenter-v0.36.0     v0.36.0
aws-load-balancer-controller kube-system    3         2026-07-28 09:15:02 IST   <span class="term-hl-green">deployed</span>  aws-load-balancer-2.7 2.7.2
sealed-secrets               security       1         2026-06-12 14:02:11 IST   <span class="term-hl-green">deployed</span>  sealed-secrets-2.15   0.26.0
lgtm-enterprise-stack        observability  8         2026-08-25 18:44:30 IST   <span class="term-hl-green">deployed</span>  lgtm-bundle-3.8.0     3.8.0
`,

    'git status': () => `
<span class="term-hl-dim">On branch main
Your branch is up to date with 'origin/main'.</span>

<span class="term-hl-green">nothing to commit, working tree clean</span>
<span class="term-hl-blue">Latest Commit:</span> 8f2c019 - feat(mesh): enforce strict mTLS 1.3 across tier-1 workloads
`,

    whoami: () => `
<span class="term-hl-blue">faisal</span> (Faisal Ansari)
<span class="term-hl-dim">Title:</span> Deputy Manager (Systems) @ State Bank of India
<span class="term-hl-dim">Specialization:</span> Cloud Platform Architect &amp; Senior DevOps Engineer
<span class="term-hl-dim">Clearance / Verification:</span> Enterprise Banking Infrastructure Tier-1
`,

    pwd: () => `<span class="term-hl-green">/home/faisal/cloud-platform</span>`,

    ls: () => `
<span class="term-hl-blue">k8s-manifests/</span>   <span class="term-hl-blue">terraform/</span>   <span class="term-hl-blue">helm-charts/</span>   <span class="term-hl-blue">istio-policies/</span>   <span class="term-hl-blue">observability/</span>
<span class="term-hl-green">scripts/</span>         <span class="term-hl-dim">architecture-spec.md</span>        <span class="term-hl-dim">README.md</span>
`,

    'uname -a': () => `<span class="term-hl-dim">Linux cloud-node-01 6.6.0-enterprise-aws #1 SMP PREEMPT_DYNAMIC aarch64 GNU/Linux</span>`,

    uptime: () => `<span class="term-hl-dim">20:30:00 up 180 days, 14:32, 1 user, load average: 0.12, 0.18, 0.15</span>`,

    date: () => `<span class="term-hl-dim">${new Date().toUTCString()}</span>`,

    'faisal --welcome': () => `
<span class="term-hl-blue">★ Welcome to Faisal Ansari's Cloud Architect Terminal ★</span>
Enterprise Platform Engineer &amp; Technical Lead | Deputy Manager (Systems) @ State Bank of India
Type <span class="term-hl-purple">help</span> or click any quick command chip below to explore.
`,

    'faisal --experience': () => `
<span class="term-hl-blue">Faisal Ansari — Career Milestones &amp; Compliance Frameworks:</span>
1. <span class="term-hl-green">State Bank of India (SBI)</span> | Deputy Manager (Systems) [Sep 2025 – Present]
   - Enterprise platform ops, in-memory cache fabric, Kafka consumer lag optimization, Istio mesh.
   - <span class="term-hl-amber">Compliance:</span> RBI Regulatory Mandates &amp; Digital Personal Data Protection Act (DPDPA).
2. <span class="term-hl-green">Incedo</span> | Technical Lead (DevOps) [Jan 2025 – Sep 2025]
   - Air-gapped on-prem K8s appliance (VMDK), Sealed Secrets automation, AWS &amp; Terraform CI/CD.
   - <span class="term-hl-amber">Compliance:</span> Applied HIPAA &amp; GDPR requirements across Kubernetes and cloud workflows.
3. <span class="term-hl-green">Binmile Technologies</span> | Sr. DevOps Engineer (AWS) [Jun 2024 – Jan 2025]
   - EKS + Karpenter dynamic node autoscaling, LGTM (Prometheus, Loki, Tempo, Grafana), DevSecOps.
   - <span class="term-hl-amber">Compliance:</span> Embedded security controls adhering to GDPR, HIPAA, SAMA &amp; DPDPA standards.
4. <span class="term-hl-green">Eye Care Leaders / Sightview</span> | DevOps Engineer (AWS) [Feb 2023 – May 2024]
   - Python pyVmomi automation, AWS Control Tower, Jenkins Declarative pipelines, S3-to-RDS backup/restore.
   - <span class="term-hl-amber">Compliance:</span> Enforced healthcare security in compliance with HIPAA &amp; GDPR.
5. <span class="term-hl-green">Viiking Paymaster &amp; Indicsoft</span> | DevOps / Python [2018 – 2023]
   - FinTech ERP, Docker/Nginx, AWS cost optimization, Linux systems engineering.
`,

    'faisal --compliance': () => `
<span class="term-hl-blue">★ Global Regulatory Compliance &amp; Governance Matrix ★</span>
Faisal has embedded enterprise security and compliance guardrails across regulated environments:

1. <span class="term-hl-green">DPDPA (Digital Personal Data Protection Act)</span>
   - <span class="term-hl-cyan">Applied at:</span> State Bank of India (SBI) &amp; Binmile Technologies
   - <span class="term-hl-dim">Scope:</span> Data privacy governance, data localization, banking audit logging, encrypted storage.

2. <span class="term-hl-green">GDPR (General Data Protection Regulation)</span>
   - <span class="term-hl-cyan">Applied at:</span> Binmile Technologies, Incedo &amp; Eye Care Leaders (Sightview)
   - <span class="term-hl-dim">Scope:</span> Strict cross-border data protection, elimination of plaintext secrets, container vulnerability gates.

3. <span class="term-hl-green">HIPAA (Health Insurance Portability and Accountability Act)</span>
   - <span class="term-hl-cyan">Applied at:</span> Eye Care Leaders (Sightview), Incedo &amp; Binmile Technologies
   - <span class="term-hl-dim">Scope:</span> ePHI safeguards, encrypted backup automation (S3-to-RDS), AWS SSO/Guacamole isolated bastion access.

4. <span class="term-hl-green">SAMA (Saudi Central Bank Cybersecurity &amp; Governance)</span>
   - <span class="term-hl-cyan">Applied at:</span> Binmile Technologies
   - <span class="term-hl-dim">Scope:</span> Enterprise financial cloud hardening, secure hybrid connectivity, SAST/DAST CI/CD policies.

5. <span class="term-hl-green">RBI Regulatory Guidelines</span>
   - <span class="term-hl-cyan">Applied at:</span> State Bank of India (SBI)
   - <span class="term-hl-dim">Scope:</span> Mission-critical platform availability (99.999%), mutual TLS (mTLS) zero trust, controlled change management.
`,

    'compliance': () => commands['faisal --compliance'](),

    'faisal --certifications': () => `
<span class="term-hl-blue">Verified Enterprise Certifications &amp; Badges:</span>
★ <span class="term-hl-amber">AWS Certified Solutions Architect – Associate</span> (Credly ID: 6a683a9d-70e0-48e2-af4b-965830228ddb)
★ <span class="term-hl-amber">AWS Certified SysOps Administrator – Associate</span> (Credly ID: 92deb50b-89b3-448c-a6ab-832a265cdb58)
★ <span class="term-hl-amber">AWS Certified AI Practitioner</span> (Credly ID: f1a558a0-0910-4e6e-a0c3-c25c18c9c566)
★ <span class="term-hl-purple">GitHub Foundations</span>
★ <span class="term-hl-green">Master of Computer Science and Applications (MCA)</span> — Aligarh Muslim University (AMU)
★ <span class="term-hl-green">B.Sc. (Hons.) Statistics</span> — Aligarh Muslim University (AMU)
`,

    'faisal --contact': () => `
<span class="term-hl-blue">Get in Touch / Direct Channels:</span>
- <span class="term-hl-dim">WhatsApp &amp; Phone:</span> <a href="https://wa.me/919990622210?text=Hi%20Faisal,%20I%20came%20across%20your%20cloud%20portfolio%20and%20would%20love%20to%20connect." target="_blank" style="color:#10b981; text-decoration:underline; font-weight:700;">+91 9990622210</a> (Direct WhatsApp Link)
- <span class="term-hl-dim">Direct Email:</span> <a href="mailto:hello@faisal.host" style="color:#38bdf8; text-decoration:underline; font-weight:600;">hello@faisal.host</a>
- <span class="term-hl-dim">1:1 Mentorship:</span> <a href="https://topmate.io/clumsyfaisal" target="_blank" style="color:#c084fc; text-decoration:underline; font-weight:600;">topmate.io/clumsyfaisal</a> ↗ (Book Session)
- <span class="term-hl-dim">GitHub Profile:</span> <a href="https://github.com/devopsfaisal" target="_blank" style="color:#38bdf8; text-decoration:underline; font-weight:600;">github.com/devopsfaisal</a> ↗ (Open-Source Repos)
- <span class="term-hl-dim">LinkedIn:</span> <a href="https://linkedin.com/in/clumsyfaisal" target="_blank" style="color:#3b82f6; text-decoration:underline;">linkedin.com/in/clumsyfaisal</a> ↗
- <span class="term-hl-dim">X (Twitter):</span> <a href="https://x.com/clumsyfaisal" target="_blank" style="color:#e2e8f0; text-decoration:underline;">x.com/clumsyfaisal</a> ↗ (@clumsyfaisal)
- <span class="term-hl-dim">Platform Status:</span> <a href="https://status.faisal.host" target="_blank" style="color:#10b981; text-decoration:underline; font-weight:600;">https://status.faisal.host</a> ↗ (Live SLA)
- <span class="term-hl-dim">Engineering Blog:</span> <a href="https://blog.faisal.host" target="_blank" style="color:#38bdf8; text-decoration:underline; font-weight:600;">https://blog.faisal.host</a> ↗
- <span class="term-hl-dim">Notion Notes:</span> <a href="https://notes.faisal.host" target="_blank" style="color:#f59e0b; text-decoration:underline; font-weight:600;">https://notes.faisal.host</a> ↗
- <span class="term-hl-dim">Availability:</span> Open for Technical Lead, Cloud Architect &amp; Senior DevOps leadership roles.
`,

    'traffic': () => {
      const liveLatency = window.currentEdgeLatency ? `${window.currentEdgeLatency}ms` : '18.2ms';
      const livePoP = window.currentEdgePoP || 'CloudFront Anycast PoP';
      return `
<span class="term-hl-blue">★ CloudFront Edge Telemetry &amp; S3 Origin Diagnostics ★</span>
<span class="term-hl-dim">Distribution:</span> AWS CloudFront Edge Anycast (<span class="term-hl-green">https://faisal.host</span>)
<span class="term-hl-dim">Active Origin:</span> Amazon S3 Private Bucket (<span class="term-hl-green">Origin Access Control - OAC</span>)
<span class="term-hl-dim">Your Session Latency:</span> <span class="term-hl-cyan">${liveLatency}</span> ➔ <span class="term-hl-purple">${livePoP}</span>

<span class="term-hl-purple">Edge CDN &amp; Security Telemetry:</span>
- <span class="term-hl-dim">Origin Cache Hit Ratio:</span> <span class="term-hl-green">98.6%</span> (S3 Origin Shield Active)
- <span class="term-hl-dim">S3 Public Access:</span> <span class="term-hl-green">Blocked</span> (Restricted to CloudFront OAC Principal)
- <span class="term-hl-dim">Origin Encryption:</span> <span class="term-hl-amber">SSE-S3 AES-256</span> (Server-Side Encryption)
- <span class="term-hl-dim">HTTP Protocols:</span> HTTP/2 (91.4%), HTTP/3 QUIC (8.6%)
- <span class="term-hl-dim">TLS Security:</span> TLSv1.3 Strict HSTS (ACM Managed)
- <span class="term-hl-dim">Edge SLA Availability:</span> <span class="term-hl-green">99.99%</span> (Zero 5xx Incidents)

<span class="term-hl-purple">Geographic Visitor Distribution (Real-Time Mesh):</span>
  [IN] India (DEL/BOM)   <span class="term-hl-green">████████████████████</span>  64.2%
  [US] North America     <span class="term-hl-blue">█████████</span>             21.8%
  [EU] Europe (FRA/LHR)  <span class="term-hl-amber">████</span>                  8.7%
  [AP] APAC (SIN/NRT)    <span class="term-hl-cyan">██</span>                    5.3%

<span class="term-hl-purple">Top Ingress Sources:</span>
  1. LinkedIn (in/clumsyfaisal)    48.2%
  2. Google Search (Organic SERP)  31.5%
  3. GitHub (devopsfaisal)         14.1%
  4. Direct / Cloud Terminal       6.2%
`;
    },

    'edge-stats': () => commands['traffic'](),
    'telemetry': () => commands['traffic'](),

    'status': () => {
      setTimeout(() => window.open('https://status.faisal.host', '_blank', 'noopener,noreferrer'), 400);
      return `
<span class="term-hl-blue">★ Opening Faisal Ansari's System Status ★</span>
URL: <a href="https://status.faisal.host" target="_blank" style="color:#10b981; text-decoration:underline; font-weight:700;">https://status.faisal.host</a> ↗
<span class="term-hl-dim">Live SLA uptime, incident history, and synthetic latency metrics for hosted systems and services (faisal.host, blog, notes).</span>
`;
    },

    'faisal --status': () => commands['status'](),

    'topmate': () => {
      setTimeout(() => window.open('https://topmate.io/clumsyfaisal', '_blank', 'noopener,noreferrer'), 400);
      return `
<span class="term-hl-blue">★ Opening Topmate 1:1 Mentorship Booking ★</span>
URL: <a href="https://topmate.io/clumsyfaisal" target="_blank" style="color:#c084fc; text-decoration:underline; font-weight:700;">https://topmate.io/clumsyfaisal</a> ↗
<span class="term-hl-dim">Book a 1:1 session for DevOps career guidance, AWS architecture reviews, Kubernetes troubleshooting, and interview prep.</span>
`;
    },

    'faisal --topmate': () => commands['topmate'](),

    'github': () => {
      setTimeout(() => window.open('https://github.com/devopsfaisal', '_blank', 'noopener,noreferrer'), 400);
      return `
<span class="term-hl-blue">★ Opening Faisal Ansari's GitHub Repositories ★</span>
URL: <a href="https://github.com/devopsfaisal" target="_blank" style="color:#38bdf8; text-decoration:underline; font-weight:700;">https://github.com/devopsfaisal</a> ↗
<span class="term-hl-dim">Explore open-source DevOps repositories, Terraform AWS modules, Kubernetes manifests, and CI/CD pipelines.</span>
`;
    },

    'faisal --github': () => commands['github'](),

    'x': () => {
      setTimeout(() => window.open('https://x.com/clumsyfaisal', '_blank', 'noopener,noreferrer'), 400);
      return `
<span class="term-hl-blue">★ Opening Faisal Ansari on X (Twitter) ★</span>
URL: <a href="https://x.com/clumsyfaisal" target="_blank" style="color:#e2e8f0; text-decoration:underline; font-weight:700;">https://x.com/clumsyfaisal</a> ↗
<span class="term-hl-dim">Tech thoughts, cloud architecture breakdowns, and DevOps engineering notes by @clumsyfaisal.</span>
`;
    },

    'twitter': () => commands['x'](),
    'faisal --x': () => commands['x'](),

    'linkedin': () => {
      setTimeout(() => window.open('https://linkedin.com/in/clumsyfaisal', '_blank', 'noopener,noreferrer'), 400);
      return `
<span class="term-hl-blue">★ Opening Faisal Ansari's LinkedIn Profile ★</span>
URL: <a href="https://linkedin.com/in/clumsyfaisal" target="_blank" style="color:#3b82f6; text-decoration:underline; font-weight:700;">https://linkedin.com/in/clumsyfaisal</a> ↗
<span class="term-hl-dim">Connect for enterprise cloud leadership, Staff/Lead DevOps roles, and technical collaborations.</span>
`;
    },

    'faisal --linkedin': () => commands['linkedin'](),

    'blog': () => {
      setTimeout(() => window.open('https://blog.faisal.host', '_blank', 'noopener,noreferrer'), 400);
      return `
<span class="term-hl-blue">★ Opening Faisal Ansari's Engineering Blog ★</span>
URL: <a href="https://blog.faisal.host" target="_blank" style="color:#38bdf8; text-decoration:underline; font-weight:700;">https://blog.faisal.host</a> ↗
<span class="term-hl-dim">Deep-dive technical articles on OpenShift multi-DC operations, Amazon EKS Karpenter autoscaling, Apache Kafka lag remediation, Tanzu GemFire cache tuning, and DevSecOps pipelines.</span>
`;
    },

    'faisal --blog': () => {
      setTimeout(() => window.open('https://blog.faisal.host', '_blank', 'noopener,noreferrer'), 400);
      return `
<span class="term-hl-blue">★ Opening Faisal Ansari's Engineering Blog ★</span>
URL: <a href="https://blog.faisal.host" target="_blank" style="color:#38bdf8; text-decoration:underline; font-weight:700;">https://blog.faisal.host</a> ↗
<span class="term-hl-dim">Redirecting to blog.faisal.host in a new tab...</span>
`;
    },

    'notes': () => {
      setTimeout(() => window.open('https://notes.faisal.host', '_blank', 'noopener,noreferrer'), 400);
      return `
<span class="term-hl-blue">★ Opening Faisal Ansari's Architecture Notes (Notion) ★</span>
URL: <a href="https://notes.faisal.host" target="_blank" style="color:#f59e0b; text-decoration:underline; font-weight:700;">https://notes.faisal.host</a> ↗
<span class="term-hl-dim">Personal Notion workspace containing Cloud Runbooks, Kubernetes cheatsheets, Istio mTLS reference guides, and Infrastructure as Code design blueprints.</span>
`;
    },

    'faisal --notes': () => {
      setTimeout(() => window.open('https://notes.faisal.host', '_blank', 'noopener,noreferrer'), 400);
      return `
<span class="term-hl-blue">★ Opening Faisal Ansari's Architecture Notes (Notion) ★</span>
URL: <a href="https://notes.faisal.host" target="_blank" style="color:#f59e0b; text-decoration:underline; font-weight:700;">https://notes.faisal.host</a> ↗
<span class="term-hl-dim">Redirecting to notes.faisal.host in a new tab...</span>
`;
    },

    'resume': () => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'assets/Faisal_Ansari_Resume.pdf';
        link.download = 'Faisal_Ansari_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 250);
      return `
<span class="term-hl-green">✔ Initiating download: Faisal_Ansari_Resume.pdf</span>
<span class="term-hl-dim">Serving verified resume PDF. If download did not start automatically, <a href="assets/Faisal_Ansari_Resume.pdf" download="Faisal_Ansari_Resume.pdf" style="color:#38bdf8; text-decoration:underline; font-weight:700;">click here to download</a>.</span>
`;
    },

    'faisal --resume': () => commands['resume']()
  };

  // Smart Resolver for Subcommands & Aliases
  function resolveCommand(rawCmd) {
    let cmd = rawCmd.trim();
    if (!cmd) return null;

    // Normalize dashes (em-dash, en-dash) to standard hyphens
    cmd = cmd.replace(/[\u2010\u2012\u2013\u2014\u2015]/g, '-');
    // Normalize unicode non-breaking space
    cmd = cmd.replace(/\u00A0/g, ' ');
    // Strip leading prompt characters ($ , ❯, #)
    cmd = cmd.replace(/^[$❯#]\s*/, '').trim();
    if (!cmd) return null;

    // Clean multi-spaces
    const singleSpaced = cmd.replace(/\s+/g, ' ');
    const lower = singleSpaced.toLowerCase();

    // 1. Direct exact or lower match
    if (commands[singleSpaced]) return commands[singleSpaced]();
    if (commands[lower]) return commands[lower]();

    // 2. Tokenize binary and arguments
    const parts = singleSpaced.split(' ');
    const binary = parts[0].toLowerCase();
    const args = parts.slice(1);
    const argStr = args.join(' ').toLowerCase();

    // Handle kubectl queries flexibly
    if (binary === 'kubectl' || binary === 'k') {
      if (argStr.includes('pod') || argStr.includes('po')) {
        return commands['kubectl get pods -A']();
      }
      if (argStr.includes('node') || argStr.includes('no')) {
        return commands['kubectl get nodes']();
      }
      if (argStr.includes('svc') || argStr.includes('service')) {
        return commands['kubectl get services']();
      }
      if (argStr.includes('cluster-info') || argStr.includes('version')) {
        return commands['kubectl cluster-info']();
      }
      if (argStr === '' || argStr === 'help' || argStr === '--help') {
        return `
<span class="term-hl-blue">kubectl controls the Kubernetes cluster manager.</span>
Find more information at: <span class="term-hl-dim">https://kubernetes.io/docs/reference/kubectl/</span>
<span class="term-hl-green">Available simulator subcommands:</span>
  kubectl get nodes [-o wide]
  kubectl get pods -A [--all-namespaces]
  kubectl get services
  kubectl cluster-info
`;
      }
      return commands['kubectl get pods -A']();
    }

    // Handle terraform
    if (binary === 'terraform' || binary === 'tf') {
      if (argStr.includes('plan') || argStr.includes('apply') || argStr.includes('init') || argStr.includes('validate') || argStr === '') {
        return commands['terraform plan']();
      }
    }

    // Handle istioctl
    if (binary === 'istioctl') {
      return commands['istioctl analyze']();
    }

    // Handle promql / prometheus
    if (binary === 'promql' || binary === 'prometheus') {
      return commands['promql --kafka-lag']();
    }

    // Handle loki
    if (binary === 'loki') {
      return commands['loki --gemfire-logs']();
    }

    // Handle tempo
    if (binary === 'tempo') {
      return commands['tempo --trace']();
    }

    // Handle grafana
    if (binary === 'grafana') {
      return commands['grafana alerts']();
    }

    // Handle docker
    if (binary === 'docker') {
      return commands['docker ps']();
    }

    // Handle helm
    if (binary === 'helm') {
      return commands['helm list']();
    }

    // Handle git
    if (binary === 'git') {
      if (argStr.includes('log')) {
        return `
<span class="term-hl-amber">commit 8f2c0199e4b7c10b</span> (HEAD -> main, origin/main)
Author: Faisal Ansari &lt;faisal@cloud-node&gt;
Date:   Thu Sep 10 18:22:15 2026 +0530

    feat(mesh): enforce strict mTLS 1.3 across tier-1 workloads
`;
      }
      return commands['git status']();
    }

    // Handle blog, notes, resume, status, topmate, github, x, linkedin
    if (binary === 'blog') return commands['blog']();
    if (binary === 'notes' || binary === 'notion') return commands['notes']();
    if (binary === 'resume' || binary === 'cv') return commands['resume']();
    if (binary === 'status' || binary === 'uptime') return commands['status']();
    if (binary === 'topmate' || binary === 'mentor' || binary === 'mentorship') return commands['topmate']();
    if (binary === 'github' || binary === 'gh') return commands['github']();
    if (binary === 'x' || binary === 'twitter' || binary === 'tweet') return commands['x']();
    if (binary === 'linkedin') return commands['linkedin']();

    // Handle Unix utilities
    if (binary === 'whoami') return commands['whoami']();
    if (binary === 'pwd') return commands['pwd']();
    if (binary === 'ls' || binary === 'll') return commands['ls']();
    if (binary === 'uname') return commands['uname -a']();
    if (binary === 'uptime') return commands['uptime']();
    if (binary === 'date') return commands['date']();
    if (binary === 'cat') {
      return `<span class="term-hl-blue"># SBI Production Multi-Region Platform</span>\nHigh-throughput banking platform managed by Faisal Ansari (Deputy Manager Systems). Built with EKS, OpenShift, Istio, and LGTM observability.`;
    }
    if (binary === 'echo') {
      return escapeHTML(args.join(' '));
    }
    if (binary === 'history') {
      if (commandHistory.length === 0) return `<span class="term-hl-dim">No recent history.</span>`;
      return commandHistory.map((c, i) => `<span class="term-hl-dim">${i + 1}</span>  ${escapeHTML(c)}`).join('<br>');
    }

    // Handle faisal personal CLI
    if (binary === 'faisal') {
      if (argStr.includes('exp') || argStr.includes('experience')) return commands['faisal --experience']();
      if (argStr.includes('comp') || argStr.includes('gdpr') || argStr.includes('hipaa') || argStr.includes('sama') || argStr.includes('dpdpa')) return commands['faisal --compliance']();
      if (argStr.includes('cert') || argStr.includes('badge')) return commands['faisal --certifications']();
      if (argStr.includes('blog')) return commands['blog']();
      if (argStr.includes('note') || argStr.includes('notion')) return commands['notes']();
      if (argStr.includes('resume') || argStr.includes('cv')) return commands['resume']();
      if (argStr.includes('status')) return commands['status']();
      if (argStr.includes('topmate') || argStr.includes('mentor')) return commands['topmate']();
      if (argStr.includes('contact') || argStr.includes('email') || argStr.includes('linkedin')) return commands['faisal --contact']();
      if (argStr.includes('welcome')) return commands['faisal --welcome']();
      return `
<span class="term-hl-blue">Faisal Ansari — Cloud &amp; Platform Architect</span>
Options:
  --experience      Career timeline & roles (SBI, Incedo, Binmile, ECL)
  --compliance      Global governance matrix (GDPR, DPDPA, HIPAA, SAMA, RBI)
  --certifications  AWS Solutions Architect, SysOps, AI, GitHub
  --resume          Download official PDF resume (Faisal_Ansari_Resume.pdf)
  --status          Check live infrastructure SLA (status.faisal.host)
  --topmate         Book 1:1 mentorship session (topmate.io)
  --blog            Read engineering deep-dives (blog.faisal.host)
  --notes           Read Notion architecture notes (notes.faisal.host)
  --contact         Direct WhatsApp, email, LinkedIn and contact info
`;
    }

    // Unrecognized command — accurately identify the unknown binary
    return null;
  }

  function executeCommand(rawCmd) {
    let cmd = rawCmd.trim();
    if (!cmd) return;

    // Normalize prompt prefix
    cmd = cmd.replace(/^[$❯#]\s*/, '').trim();
    if (!cmd) return;

    // Add to history
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Render prompt line in terminal
    const promptLine = document.createElement('div');
    promptLine.className = 'term-line';
    promptLine.innerHTML = `
      <div class="term-prompt-row">
        <span class="term-user">${PROMPT_USER}</span>
        <span class="term-path">${PROMPT_PATH}</span>
        <span class="term-git">(main)</span>
        <span class="term-cmd">$ ${escapeHTML(cmd)}</span>
      </div>
    `;
    terminalBody.appendChild(promptLine);

    // Handle clear
    if (cmd.trim().toLowerCase() === 'clear') {
      terminalBody.innerHTML = '';
      terminalInput.value = '';
      return;
    }

    // Process output
    const outputLine = document.createElement('div');
    outputLine.className = 'term-output';

    const result = resolveCommand(cmd);

    if (result !== null) {
      outputLine.innerHTML = result;
    } else {
      const parts = cmd.replace(/\s+/g, ' ').split(' ');
      const unknownBinary = parts[0] || cmd;
      outputLine.innerHTML = `<span class="term-hl-red">zsh: command not found: ${escapeHTML(unknownBinary)}</span>. Type <span class="term-hl-blue">help</span> for a list of available commands.`;
    }

    terminalBody.appendChild(outputLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
    terminalInput.value = '';
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Keyboard Navigation & Shortcuts
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.trim().toLowerCase();
      const autocompletePool = [
        'kubectl get nodes',
        'kubectl get pods -A',
        'kubectl get services',
        'kubectl cluster-info',
        'terraform plan',
        'istioctl analyze',
        'promql --kafka-lag',
        'loki --gemfire-logs',
        'tempo --trace',
        'grafana alerts',
        'docker ps',
        'helm list',
        'git status',
        'whoami',
        'pwd',
        'ls',
        'traffic',
        'telemetry',
        'faisal --experience',
        'faisal --compliance',
        'faisal --certifications',
        'faisal --contact',
        'help',
        'clear'
      ];
      const match = autocompletePool.find(c => c.startsWith(current));
      if (match) {
        terminalInput.value = match;
      }
    }
  });

  // Quick Chips Click Handlers
  quickChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const cmd = chip.getAttribute('data-cmd') || chip.textContent.trim();
      terminalInput.value = cmd;
      executeCommand(cmd);
      // Visual feedback
      chip.style.transform = 'scale(0.95)';
      setTimeout(() => { chip.style.transform = ''; }, 150);
    });
  });

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalBody.innerHTML = `
        <div class="term-line">
          <div class="term-prompt-row">
            <span class="term-user">${PROMPT_USER}</span>
            <span class="term-path">${PROMPT_PATH}</span>
            <span class="term-git">(main)</span>
            <span class="term-cmd">$ help</span>
          </div>
          <div class="term-output">${commands['help']()}</div>
        </div>
      `;
      terminalInput.value = '';
    });
  }

  // Copy output button
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = terminalBody.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => { copyBtn.innerText = originalText; }, 1800);
      });
    });
  }

  // Focus input when clicking terminal window
  terminalBody.addEventListener('click', () => {
    if (!window.getSelection().toString()) {
      terminalInput.focus();
    }
  });
});
