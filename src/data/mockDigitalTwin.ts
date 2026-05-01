export type ZoneKey = 'Zone A' | 'Zone B' | 'Zone C' | 'Zone D'

export const kpis = [
  { title: 'Sensor Online Rate', value: '98.6%', subtitle: '187 / 190 Online', tone: 'cyan' },
  { title: 'Remediation Progress', value: '64.2%', subtitle: '+3.6% vs last week', tone: 'green' },
  { title: 'Average O₂', value: '12.4%', subtitle: 'Target 10–18%', tone: 'cyan' },
  { title: 'Average Temperature', value: '38.7 °C', subtitle: 'Target < 60 °C', tone: 'blue' },
  { title: 'Average Humidity', value: '42.1%', subtitle: 'Target 30–60%', tone: 'blue' },
  { title: 'Risk Score', value: 'Low', subtitle: '2.3 / 10', tone: 'green' }
]

export const zones = {
  'Zone A': { o2: 13.2, temperature: 36.4, humidity: 40.2, degradationRate: 0.62, stabilizationIndex: 0.71, activeWells: '31/32', status: 'Normal' },
  'Zone B': { o2: 8.7, temperature: 45.2, humidity: 41.3, degradationRate: 0.68, stabilizationIndex: 0.62, activeWells: '12/14', status: 'Aerating' },
  'Zone C': { o2: 14.5, temperature: 63.2, humidity: 45.9, degradationRate: 0.51, stabilizationIndex: 0.58, activeWells: '28/29', status: 'Warning' },
  'Zone D': { o2: 11.8, temperature: 39.8, humidity: 43.6, degradationRate: 0.59, stabilizationIndex: 0.66, activeWells: '22/23', status: 'Normal' }
}

export const phases = ['Phase 1 Initial Assessment', 'Phase 2 Active Remediation', 'Phase 3 Stabilization', 'Phase 4 Post-Closure']
export const alerts = [
  { title: 'High Temperature in Zone C', time: '10:21 AM' },
  { title: 'Low O₂ in Zone B', time: '10:20 AM' },
  { title: 'Leachate Level Rising in MW-12', time: '10:18 AM' }
]
export const chartSeries = Array.from({ length: 24 }).map((_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  o2: 10 + Math.sin(i / 2) * 1.5 + (i > 14 ? 1.4 : 0),
  temp: 35 + Math.sin(i / 3) * 8 + (i > 8 && i < 14 ? 6 : 0),
  deg: 0.55 + Math.sin(i / 2) * 0.09,
  stab: 0.58 + Math.cos(i / 2) * 0.08
}))
