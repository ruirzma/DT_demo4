import ReactECharts from 'echarts-for-react'

export default function MiniChart({ title, color, values, cursor }: { title: string; color: string; values: number[]; cursor: number }) {
  return <div className="glass p-2 rounded-xl border border-cyan-900/50"><div className="text-xs text-slate-300 mb-1">{title}</div><ReactECharts style={{ height: 110 }} option={{
    grid: { top: 10, bottom: 20, left: 20, right: 8 }, xAxis: { type: 'category', show: false, data: values.map((_, i) => i) }, yAxis: { type: 'value', show: false },
    series: [{ data: values, type: 'line', smooth: true, symbol: 'none', lineStyle: { color, width: 2 }, areaStyle: { color: `${color}33` }, markPoint: { symbol: 'circle', symbolSize: 10, data: [{ coord: [cursor, values[cursor]], value: '' }], itemStyle: { color: '#22d3ee' } } }],
    animation: false
  }} /></div>
}
