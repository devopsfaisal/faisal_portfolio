/**
 * APP.JS — Core Application Logic, Modal System & Case Studies Database
 * Faisal Ansari Portfolio
 */

// Comprehensive Case Studies Data
const caseStudiesData = {
  'case-sbi-ocp': {
    title: 'Enterprise OpenShift Banking Platform Operations',
    org: 'State Bank of India (SBI)',
    category: 'banking',
    shortDesc: 'Production platform engineering across geographically distributed enterprise data centers supporting India’s tier-1 digital banking services.',
    metrics: { 'Availability': '99.999%', 'Scale': 'Multi-DC DR', 'Compliance': 'RBI & DPDPA', 'MTTR': '<12 mins' },
    tags: ['OpenShift / OCP', 'Red Hat Enterprise Linux', 'High Availability', 'RBI Guidelines'],
    challenge: 'State Bank of India runs mission-critical core digital banking workloads serving millions of citizens daily. High availability, strict regulatory compliance (RBI guidelines & DPDPA), and seamless zero-downtime cluster lifecycle operations across geographically separated active-active data centers were paramount requirements.',
    solution: 'Engineered and standardized multi-cluster OpenShift / OCP environments. Implemented robust platform-level configurations, automated validation gates for configuration changes, fine-tuned Pod Disruption Budgets, and established unified operational playbooks for emergency failovers and rolling platform maintenance.',
    impact: 'Achieved verified 99.999% platform availability across critical banking transaction windows. Ensured zero regulatory audit non-conformances with complete adherence to RBI cybersecurity and data localization mandates.'
  },

  'case-kafka-lag': {
    title: 'Kafka Consumer Lag Troubleshooting & High-Throughput Tuning',
    org: 'State Bank of India (SBI)',
    category: 'banking',
    shortDesc: 'Real-time detection and root-cause isolation of abnormal Kafka consumer group lags across distributed banking message queues.',
    metrics: { 'Lag Detection': '<30s', 'Throughput': '100k+ msg/s', 'Zero Data Loss': '100%', 'Incident MTTR': '-55%' },
    tags: ['Apache Kafka', 'Prometheus', 'Consumer Lag', 'SIEM Logs', 'Broker IOPS'],
    challenge: 'In high-velocity banking operations, unexpected message processing delays can cause delayed OTPs, transaction timeouts, and ledger reconciliation backlogs. Isolating whether consumer lag was triggered by broker network saturation, JVM GC pauses, or slow downstream consumers was a complex multi-team bottleneck.',
    solution: 'Designed specialized Grafana dashboards correlating Kafka partition offset lag with consumer CPU/memory metrics, GC pause times, and distributed tracing. Implemented alerting thresholds that trigger prior to consumer group rebalance cascades.',
    impact: 'Reduced production investigation time for delayed message processing by 55%. Prevented consumer lag cascade failures during peak festive and month-end banking volume surges.'
  },

  'case-gemfire-health': {
    title: 'VMware Tanzu GemFire In-Memory Platform Monitoring & Anomaly Detection',
    org: 'State Bank of India (SBI)',
    category: 'banking',
    shortDesc: 'Resource-utilization anomaly detection, heap/off-heap memory tuning, and correlation with banking transaction spikes.',
    metrics: { 'Latency': '<2ms P99', 'Cache Hit Ratio': '98.6%', 'Heap Stability': 'Zero OOM', 'Anomaly MTTD': '<45s' },
    tags: ['VMware GemFire', 'In-Memory Grid', 'JVM Heap Tuning', 'Grafana', 'Off-Heap Memory'],
    challenge: 'GemFire acts as the distributed ultra-low latency cache tier for high-frequency banking sessions. Memory anomalies, unexpected cache evictions, or GC pauses directly degraded end-user response times during peak core banking load.',
    solution: 'Configured deep JVM telemetry and custom Prometheus scrapers to monitor GemFire memory utilization, bucket distribution, and lock wait times. Established operational runbooks correlating cache memory spikes with specific microservice query patterns.',
    impact: 'Sustained sub-2ms P99 cache response latencies, eradicated unexpected OutOfMemory (OOM) eviction cascades, and stabilized multi-node distributed cache fabric across all peak load periods.'
  },

  'case-istio-mesh': {
    title: 'Istio Service-Mesh Zero-Trust Security & Observability',
    org: 'State Bank of India (SBI)',
    category: 'banking',
    shortDesc: 'Enterprise service-to-service mTLS encryption, traffic routing validation, and platform-wide telemetry injection.',
    metrics: { 'mTLS': '100% Strict', 'Sidecar Injection': 'Automated', 'Cert Rotation': 'Zero-Touch', 'Failure Isolation': 'Instant' },
    tags: ['Istio', 'Envoy Proxy', 'Zero Trust', 'Strict mTLS', 'Traffic Management'],
    challenge: 'Regulatory mandates necessitated strict mutual TLS encryption between all banking microservices with granular policy controls, without introducing unmanageable latency or operational friction.',
    solution: 'Maintained and monitored enterprise Istio service mesh across production namespaces. Validated traffic routing rules, circuit breaking, and canary deployments. Integrated Envoy access logs with centralized SIEM for compliance audits.',
    impact: 'Enforced 100% strict mutual TLS across all microservice communication paths, satisfying strict RBI audit criteria while providing end-to-end telemetry on inter-service communications.'
  },

  'case-karpenter-eks': {
    title: 'AWS EKS + Karpenter Dynamic Just-In-Time Autoscaling',
    org: 'Binmile Technologies',
    category: 'aws',
    shortDesc: 'Workload-driven dynamic node provisioning, heterogeneous instance lifecycle management, and substantial cloud cost reduction.',
    metrics: { 'Cost Reduction': '38%', 'Provisioning Time': '<40 seconds', 'Spot Utilization': '65%', 'Cluster Density': '+45%' },
    tags: ['AWS EKS', 'Karpenter', 'Terraform', 'Spot Instances', 'Cost Optimization'],
    challenge: 'Legacy Kubernetes Cluster Autoscaler was bound by static Auto Scaling Groups, causing slow node spin-up times (3-5 minutes) during sudden traffic spikes and inefficient resource bin-packing that bloated monthly AWS cloud bills.',
    solution: 'Architected and deployed Karpenter on Amazon EKS. Designed NodePools that evaluate unfulfillable pod requests in real-time, provisioning the most cost-effective instance type (combining Spot and On-Demand) in under 40 seconds. Implemented automated node consolidation during idle periods.',
    impact: 'Slashed AWS compute spend by 38% while accelerating node provisioning speed by over 400%, maintaining ironclad workload resilience across bursty production traffic.'
  },

  'case-lgtm-stack': {
    title: 'Full-Stack LGTM Observability Engine (Prometheus, Loki, Tempo, Grafana)',
    org: 'Binmile Technologies',
    category: 'observability',
    shortDesc: 'End-to-end correlation across metrics, logs, and distributed traces to drastically reduce Mean Time to Isolate (MTTI).',
    metrics: { 'MTTI Reduction': '64%', 'Trace Retention': '14 Days', 'Log Throughput': '2TB+/day', 'Unified Dashboards': '25+' },
    tags: ['Prometheus', 'Grafana', 'Loki', 'Tempo', 'Distributed Tracing'],
    challenge: 'Engineers struggled with fragmented debugging tools—inspecting metrics in one console, hunting SSH logs in another, and lacking end-to-end tracing for distributed microservices.',
    solution: 'Personally built a modern LGTM observability stack. Connected Prometheus for infrastructure & application metrics, Grafana Loki for centralized high-efficiency log streaming, and Grafana Tempo for OpenTelemetry-based distributed tracing—all indexed under a unified Grafana workspace.',
    impact: 'Decreased Mean Time to Isolate (MTTI) by 64%. Allowed engineers to click on a high-latency metric spike and jump directly into the exact log line and distributed trace span with zero context switching.'
  },

  'case-appliance-vmdk': {
    title: 'On-Premises Air-Gapped Kubernetes Appliance (VMDK Packaging)',
    org: 'Incedo',
    category: 'cicd',
    shortDesc: 'Portable application appliance delivered as a self-contained VMDK for VMware & Nutanix on-premise enterprise environments.',
    metrics: { 'Deploy Time': '<30 mins', 'Air-Gap Ready': '100%', 'Package Size': 'Optimized', 'Customer Adoption': 'Multi-Enterprise' },
    tags: ['MicroK8s', 'VMware VMDK', 'Nutanix', 'Bash Automation', 'Helm Charts'],
    challenge: 'Enterprise financial and industrial clients required running complex multi-container platforms within air-gapped on-premise data centers without internet access or manual dependency installation.',
    solution: 'Engineered Bash/Jenkins automation workflows that bundled container images from AWS S3, manifests, MicroK8s runtime, certificates, and Helm-based Prometheus/Kafka monitoring into a bootable VMDK appliance compatible with VMware and Nutanix.',
    impact: 'Reduced customer on-prem deployment time from multiple days of manual provisioning to a self-configuring 30-minute automated VM import workflow.'
  },

  'case-sealed-secrets': {
    title: 'Automated Kubernetes Sealed Secrets CI/CD Pipeline',
    org: 'Incedo',
    category: 'cicd',
    shortDesc: 'Personally built end-to-end asymmetric encryption pipeline using kubeseal to eradicate plaintext credentials in release bundles.',
    metrics: { 'Zero Plaintext': '100%', 'Security Audit': 'Zero Flaws', 'Automation': '100% CI/CD', 'Developer Friction': 'None' },
    tags: ['kubeseal', 'Sealed Secrets', 'GitOps Security', 'Python Automation', 'CI/CD'],
    challenge: 'Shipping Kubernetes manifests to customer infrastructure posed high security risks of accidental credential leakage or plaintext secret exposure in version control and release archives.',
    solution: 'Personally engineered a custom automated pipeline using `kubeseal`. The automation ingests deployment secret data, generates Kubernetes Secret representations, seals them with the cluster’s public key into SealedSecret manifests, and injects them into the deployment package.',
    impact: 'Completely eliminated plaintext credentials from software release artifacts, satisfying rigorous enterprise information security policies and enabling secure GitOps workflows.'
  },

  'case-devsecops': {
    title: 'Multi-Stage DevSecOps Pipeline & Container Hardening',
    org: 'Binmile Technologies / Eye Care Leaders',
    category: 'devsecops',
    shortDesc: 'Integrated SAST, DAST, and container vulnerability scanning into Jenkins and GitHub Actions pipelines.',
    metrics: { 'Critical CVEs': '0 Allowed', 'Pipeline Speed': '<7 mins', 'Compliance': 'HIPAA & GDPR', 'Audit Ready': 'Yes' },
    tags: ['SonarQube (SAST)', 'OWASP ZAP (DAST)', 'Trivy & Black Duck', 'AWS IAM', 'SAML SSO'],
    challenge: 'Balancing rapid automated releases with strict healthcare (HIPAA) and enterprise regulatory standards requiring zero unresolved high/critical CVEs prior to production deployment.',
    solution: 'Embedded automated SAST (SonarQube) for code quality and secret scanning, DAST (OWASP ZAP) for dynamic API endpoint testing, and container scanning (Trivy & Black Duck) directly into CI/CD release gates. Paired with SAML SSO via Google Workspace & AWS Identity Center.',
    impact: 'Prevented vulnerable code and container images from ever reaching production environments, passing external HIPAA/SOC2 compliance audits on the first pass.'
  },

  'case-vmware-migration': {
    title: 'Automated VMware Cloud VM Migration & pyVmomi Integration',
    org: 'Eye Care Leaders / Sightview',
    category: 'aws',
    shortDesc: 'Automated hypervisor VM migration pipelines using Python pyVmomi API, Jenkins Declarative, Chef, and Terraform under HIPAA compliance.',
    metrics: { 'Migration Window': '-70%', 'pyVmomi Automation': '100%', 'Compliance': 'HIPAA & GDPR', 'Availability': '99.9%' },
    tags: ['Python pyVmomi', 'VMware vCenter', 'Jenkins Declarative', 'Terraform', 'Chef', 'AWS Cloud'],
    challenge: 'Migrating legacy VMware virtual machine workloads to AWS cloud while maintaining strict configuration consistency and zero unplanned clinical system downtime under stringent healthcare (HIPAA) requirements.',
    solution: 'Engineered Python automation scripts leveraging the pyVmomi API for programmatic vCenter orchestration. Combined with Jenkins declarative pipelines, Chef configuration management, and Terraform to automate pre-flight validation, disk image conversion, and VPC networking.',
    impact: 'Decreased per-instance VM migration windows by 70%, eliminated manual operator configuration errors, and successfully migrated mission-critical healthcare environments with zero data loss.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Case Study Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      caseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Case Study Deep Dive Modal Logic
  const modalOverlay = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalCaseTitle');
  const modalOrg = document.getElementById('modalCaseOrg');
  const modalTags = document.getElementById('modalCaseTags');
  const modalMetrics = document.getElementById('modalCaseMetrics');
  const modalChallenge = document.getElementById('modalCaseChallenge');
  const modalSolution = document.getElementById('modalCaseSolution');
  const modalImpact = document.getElementById('modalCaseImpact');

  const actionButtons = document.querySelectorAll('.case-action-btn');

  actionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const caseKey = btn.getAttribute('data-case');
      const data = caseStudiesData[caseKey];

      if (!data) return;

      modalTitle.textContent = data.title;
      modalOrg.textContent = data.org;
      modalChallenge.textContent = data.challenge;
      modalSolution.textContent = data.solution;
      modalImpact.textContent = data.impact;

      // Render tags
      modalTags.innerHTML = data.tags.map(t => `<span class="badge badge-blue">${t}</span>`).join('');

      // Render metrics
      modalMetrics.innerHTML = Object.entries(data.metrics).map(([key, val]) => `
        <div class="metric-micro-item">
          <span class="metric-micro-val">${val}</span>
          <span class="metric-micro-label">${key}</span>
        </div>
      `).join('');

      modalOverlay.style.display = 'flex';
      modalOverlay.setAttribute('aria-hidden', 'false');
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      modalOverlay.style.display = 'none';
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (modalTitle) modalTitle.textContent = '';
      if (modalOrg) modalOrg.textContent = '';
      if (modalChallenge) modalChallenge.textContent = '';
      if (modalSolution) modalSolution.textContent = '';
      if (modalImpact) modalImpact.textContent = '';
      if (modalTags) modalTags.innerHTML = '';
      if (modalMetrics) modalMetrics.innerHTML = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 4. Copy to Clipboard Functionality
  const copyElements = document.querySelectorAll('.copy-trigger');
  copyElements.forEach(el => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy') || el.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = el.innerHTML;
        el.innerHTML = `<span>Copied to Clipboard! ✓</span>`;
        el.style.borderColor = 'var(--accent-k8s)';
        el.style.color = 'var(--accent-k8s)';
        setTimeout(() => {
          el.innerHTML = originalText;
          el.style.borderColor = '';
          el.style.color = '';
        }, 2000);
      });
    });
  });

  // 5. Mobile Navigation Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-nav-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-nav-open');
      });
    });
  }

  // 6. Two-Color Theme Switcher (Dark Slate <-> Muted Dull Light)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeLabelText = document.getElementById('themeLabelText');

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('faisal_theme_preference');
  if (savedTheme === 'warm-light') {
    document.documentElement.setAttribute('data-theme', 'warm-light');
    if (themeLabelText) themeLabelText.textContent = 'Muted';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeLabelText) themeLabelText.textContent = 'Dark';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isWarmLight = document.documentElement.getAttribute('data-theme') === 'warm-light';
      if (isWarmLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('faisal_theme_preference', 'dark');
        if (themeLabelText) themeLabelText.textContent = 'Dark';
      } else {
        document.documentElement.setAttribute('data-theme', 'warm-light');
        localStorage.setItem('faisal_theme_preference', 'warm-light');
        if (themeLabelText) themeLabelText.textContent = 'Muted';
      }
    });
  }

  // 7. Interactive Contact Dispatcher Form Logic (WhatsApp & hello@faisal.host)
  const dispatcherForm = document.getElementById('contactDispatcherForm');
  const topicChips = document.querySelectorAll('.topic-chip');
  const dispatchSubject = document.getElementById('dispatchSubject');
  const dispatchName = document.getElementById('dispatchName');
  const dispatchEmail = document.getElementById('dispatchEmail');
  const dispatchMessage = document.getElementById('dispatchMessage');
  const dispatchStatus = document.getElementById('dispatchStatus');
  const btnDispatchWhatsApp = document.getElementById('btnDispatchWhatsApp');
  const btnCopyDraft = document.getElementById('btnCopyDraft');
  const btnCopyPhone = document.getElementById('btnCopyPhone');
  const btnRunContactTerm = document.getElementById('btnRunContactTerm');

  // Topic chip click handler
  topicChips.forEach(chip => {
    chip.addEventListener('click', () => {
      topicChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const topic = chip.getAttribute('data-topic');
      if (dispatchSubject) {
        dispatchSubject.value = `${topic} | Inquiry for Faisal`;
      }
    });
  });

  // WhatsApp Direct Dispatch button
  if (btnDispatchWhatsApp) {
    btnDispatchWhatsApp.addEventListener('click', () => {
      const name = dispatchName && dispatchName.value.trim() ? dispatchName.value.trim() : '';
      const email = dispatchEmail && dispatchEmail.value.trim() ? dispatchEmail.value.trim() : '';
      const subject = dispatchSubject && dispatchSubject.value.trim() ? dispatchSubject.value.trim() : 'Platform Engineering & Cloud Architecture';
      const message = dispatchMessage && dispatchMessage.value.trim() ? dispatchMessage.value.trim() : '';

      if (!message) {
        if (dispatchMessage) dispatchMessage.focus();
        if (dispatchStatus) {
          dispatchStatus.style.display = 'block';
          dispatchStatus.className = 'dispatcher-status-banner';
          dispatchStatus.style.background = 'rgba(239, 68, 68, 0.15)';
          dispatchStatus.style.border = '1px solid rgba(239, 68, 68, 0.35)';
          dispatchStatus.style.color = '#ef4444';
          dispatchStatus.innerHTML = '<strong>Please provide a message outline</strong> before transmitting to WhatsApp.';
        }
        return;
      }

      let waText = `Hi Faisal,\n\nI am contacting you regarding: ${subject}\n\n`;
      if (name) waText += `From: ${name}\n`;
      if (email) waText += `Email: ${email}\n`;
      waText += `\nMessage:\n${message}\n\n---\nSent via Faisal Ansari Cloud Portfolio`;

      const waUrl = `https://wa.me/919990622210?text=${encodeURIComponent(waText)}`;

      if (dispatchStatus) {
        dispatchStatus.style.display = 'block';
        dispatchStatus.className = 'dispatcher-status-banner status-success';
        dispatchStatus.style.background = '';
        dispatchStatus.style.border = '';
        dispatchStatus.style.color = '';
        dispatchStatus.innerHTML = `
          <strong>✓ Transmitting to WhatsApp (+91 9990622210)!</strong><br>
          <span style="font-size:0.82rem; opacity:0.9;">Opening WhatsApp chat with your formatted message draft.</span>
        `;
      }

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Dispatcher form submission: routes to hello@faisal.host
  if (dispatcherForm) {
    dispatcherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = dispatchName ? dispatchName.value.trim() : '';
      const email = dispatchEmail ? dispatchEmail.value.trim() : '';
      const subject = dispatchSubject ? dispatchSubject.value.trim() : 'Platform Engineering & Cloud Inquiry';
      const message = dispatchMessage ? dispatchMessage.value.trim() : '';

      const bodyContent = `Hi Faisal,\n\nName / Organization: ${name}\nContact Email: ${email}\n\nMessage:\n${message}\n\n---\nTransmitted via faisal.host Cloud Dispatcher`;

      const mailtoUrl = `mailto:hello@faisal.host?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

      if (dispatchStatus) {
        dispatchStatus.style.display = 'block';
        dispatchStatus.className = 'dispatcher-status-banner status-success';
        dispatchStatus.style.background = '';
        dispatchStatus.style.border = '';
        dispatchStatus.style.color = '';
        dispatchStatus.innerHTML = `
          <strong>✓ Transmission Queued!</strong> Opening your email client directed to <code>hello@faisal.host</code>.<br>
          <span style="font-size:0.82rem; opacity:0.85;">If your client didn't launch automatically, click <strong>"Copy Draft"</strong> and email directly to <code>hello@faisal.host</code>.</span>
        `;
      }

      window.location.href = mailtoUrl;
    });
  }

  // Copy Draft button
  if (btnCopyDraft) {
    btnCopyDraft.addEventListener('click', () => {
      const name = dispatchName && dispatchName.value.trim() ? dispatchName.value.trim() : '[Your Name / Org]';
      const email = dispatchEmail && dispatchEmail.value.trim() ? dispatchEmail.value.trim() : '[Your Email]';
      const subject = dispatchSubject && dispatchSubject.value.trim() ? dispatchSubject.value.trim() : 'Cloud & DevOps Platform Inquiry';
      const message = dispatchMessage && dispatchMessage.value.trim() ? dispatchMessage.value.trim() : '[Your Message]';

      const fullDraft = `To: hello@faisal.host\nSubject: ${subject}\n\nHi Faisal,\n\nName / Organization: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

      navigator.clipboard.writeText(fullDraft).then(() => {
        const originalHtml = btnCopyDraft.innerHTML;
        btnCopyDraft.innerHTML = `<span>Draft Copied! ✓</span>`;
        btnCopyDraft.style.borderColor = 'var(--accent-k8s)';
        btnCopyDraft.style.color = 'var(--accent-k8s)';
        setTimeout(() => {
          btnCopyDraft.innerHTML = originalHtml;
          btnCopyDraft.style.borderColor = '';
          btnCopyDraft.style.color = '';
        }, 2200);
      });
    });
  }

  // Dedicated Copy Phone Handler
  if (btnCopyPhone) {
    btnCopyPhone.addEventListener('click', () => {
      const phone = btnCopyPhone.getAttribute('data-copy') || '+919990622210';
      navigator.clipboard.writeText(phone).then(() => {
        const originalHtml = btnCopyPhone.innerHTML;
        btnCopyPhone.innerHTML = `<span>Number Copied! ✓</span>`;
        btnCopyPhone.style.borderColor = '#25d366';
        btnCopyPhone.style.color = '#25d366';
        setTimeout(() => {
          btnCopyPhone.innerHTML = originalHtml;
          btnCopyPhone.style.borderColor = '';
          btnCopyPhone.style.color = '';
        }, 2200);
      });
    });
  }

  // CLI Shortcut: run faisal --contact in terminal
  if (btnRunContactTerm) {
    btnRunContactTerm.addEventListener('click', () => {
      const terminalSection = document.getElementById('terminal');
      const terminalInput = document.getElementById('terminalInput');
      if (terminalSection) {
        terminalSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (terminalInput) {
            terminalInput.focus();
            terminalInput.value = 'faisal --contact';
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13 });
            terminalInput.dispatchEvent(enterEvent);
          }
        }, 500);
      }
    });
  }
});
