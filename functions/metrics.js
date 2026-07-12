import fs from 'fs';

let _snapshotCache = null;

export function loadMetricsSnapshot(snapshotPath) {
  if (_snapshotCache) return _snapshotCache;

  const csvContent = fs.readFileSync(snapshotPath, 'utf-8');
  const [headerLine, ...rows] = csvContent.trim().split('\n');
  const headers = headerLine.split(',');

  const snapshot = {};
  for (const row of rows) {
    const values = row.split(',');
    const record = Object.fromEntries(headers.map((h, i) => [h, values[i]]));
    snapshot[record.provider] = {
      successRate: parseFloat(record.success_rate),
      avgSlaMs: parseFloat(record.avg_sla_ms),
    };
  }

  _snapshotCache = snapshot;
  return snapshot;
}