/**
 * TELEMETRY.JS — Live Observability & Telemetry Simulation
 * Faisal Ansari Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const kafkaLagVal = document.getElementById('telemetryKafkaLag');
  const karpenterTimeVal = document.getElementById('telemetryKarpenterTime');
  const clusterHealthVal = document.getElementById('telemetryClusterHealth');
  const mttiReductionVal = document.getElementById('telemetryMttiReduction');

  // Chart paths
  const kafkaChartPath = document.getElementById('kafkaChartPath');
  const karpenterChartPath = document.getElementById('karpenterChartPath');
  const clusterChartPath = document.getElementById('clusterChartPath');
  const mttiChartPath = document.getElementById('mttiChartPath');

  // Initial datasets
  let kafkaData = [18, 22, 16, 28, 14, 19, 21, 15, 12, 17, 14, 16];
  let karpenterData = [45, 42, 39, 38, 36, 35, 37, 34, 33, 35, 34, 32];
  let clusterData = [99.99, 99.99, 99.98, 99.99, 100, 99.99, 99.99, 100, 99.99, 99.99, 99.99, 99.998];
  let mttiData = [68, 62, 58, 52, 45, 40, 35, 32, 28, 26, 24, 21];

  function renderSparkline(data, pathElement, minVal, maxVal, height = 40, width = 160) {
    if (!pathElement) return;
    const len = data.length;
    const range = (maxVal - minVal) || 1;
    const step = width / (len - 1);

    const points = data.map((d, i) => {
      const x = i * step;
      const normalized = (d - minVal) / range;
      const y = height - (normalized * (height - 8)) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    pathElement.setAttribute('d', `M ${points.join(' L ')}`);
  }

  function updateTelemetry() {
    // 1. Kafka lag fluctuation (12 - 25 messages)
    const newLag = Math.floor(12 + Math.random() * 8);
    kafkaData.shift();
    kafkaData.push(newLag);
    if (kafkaLagVal) kafkaLagVal.textContent = `${newLag} msgs`;
    renderSparkline(kafkaData, kafkaChartPath, 10, 30);

    // 2. Karpenter provision time jitter (32s - 38s)
    const newTime = (33 + Math.random() * 4).toFixed(1);
    karpenterData.shift();
    karpenterData.push(parseFloat(newTime));
    if (karpenterTimeVal) karpenterTimeVal.textContent = `${newTime}s`;
    renderSparkline(karpenterData, karpenterChartPath, 30, 50);

    // 3. Cluster availability
    if (clusterHealthVal) clusterHealthVal.textContent = '99.998%';
    renderSparkline(clusterData, clusterChartPath, 99.95, 100);

    // 4. MTTI Reduction
    if (mttiReductionVal) mttiReductionVal.textContent = '-64%';
    renderSparkline(mttiData, mttiChartPath, 15, 75);
  }

  // Initial draw
  updateTelemetry();

  // Periodic heartbeat every 3.5 seconds
  setInterval(updateTelemetry, 3500);
});
