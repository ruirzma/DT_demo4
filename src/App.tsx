import { useEffect, useMemo, useState } from 'react'
import { Bell, CircleUserRound, HelpCircle, Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { alerts, chartSeries, kpis, phases, zones, type ZoneKey } from './data/mockDigitalTwin'
import MiniChart from './components/charts/MiniChart'

const layers = ['O₂ Layer', 'Temperature', 'Humidity', 'Pollutant', 'Microbial', 'Sensor Layout']
const views = ['3D View', 'Split View', 'Dashboard View']

export default function App() {
  const [boot, setBoot] = useState(true)
  const [zone, setZone] = useState<ZoneKey>('Zone B')
  const [layer, setLayer] = useState(layers[0])
  const [view, setView] = useState(views[0])
  const [auto, setAuto] = useState(true)
  const [phase, setPhase] = useState(phases[1])
  const [playing, setPlaying] = useState(false)
  const [tick, setTick] = useState(16)
  const [toast, setToast] = useState('')
  const [zoneBBoost, setZoneBBoost] = useState(0)

  useEffect(() => { const t = setTimeout(() => setBoot(false), 1000); return () => clearTimeout(t) }, [])
  useEffect(() => { if (!playing) return; const t = setInterval(() => setTick((n) => (n + 1) % 24), 700); return () => clearInterval(t) }, [playing])
  const zoneData = useMemo(() => ({ ...zones[zone], o2: zone === 'Zone B' ? +(zones['Zone B'].o2 + zoneBBoost).toFixed(1) : zones[zone].o2 }), [zone, zoneBBoost])

  return <div className="h-screen bg-[#020817] text-slate-100 p-4 font-sans overflow-hidden">
    <AnimatePresence>{boot && <motion.div className="fixed inset-0 z-50 bg-[#020817] grid place-items-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="text-cyan-300 text-2xl tracking-widest">INITIALIZING DIGITAL TWIN...</div></motion.div>}</AnimatePresence>
    <div className="panel p-3 h-full flex flex-col gap-3">
      <header className="glass h-16 rounded-xl px-4 flex items-center justify-between"><div className="font-semibold">AI-Driven Digital Twin for Aerobic Landfill Remediation and Rapid Stabilization</div><div className="flex gap-5 items-center text-slate-300"><span>Home</span><span>Site Twin</span><span>Subsurface</span><Bell size={18}/><HelpCircle size={18}/><CircleUserRound /><span className="text-cyan-300">Engineer</span></div></header>
      <div className="grid grid-cols-6 gap-2">{kpis.map(k => <div key={k.title} className="glass rounded-xl p-3 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"><div className="text-xs text-slate-400">{k.title}</div><div className="text-3xl text-cyan-300 font-bold">{k.value}</div><div className="text-sm text-slate-300">{k.subtitle}</div></div>)}</div>
      <div className="flex gap-3 min-h-0 flex-1">
        <aside className="w-56 glass rounded-xl p-3 space-y-2">{views.concat(layers).map(i => <button key={i} onClick={() => { views.includes(i) ? setView(i) : setLayer(i); setToast(`${i} activated`) }} className={`w-full text-left p-3 rounded-lg border ${view===i||layer===i?'border-cyan-300 bg-cyan-500/15':'border-slate-700 bg-slate-900/20'} hover:border-cyan-700`}>{i}</button>)}</aside>
        <main className="flex-1 glass rounded-xl p-3 relative overflow-hidden">
          <div className="absolute inset-0 scan" />
          <svg viewBox="0 0 1200 620" className="w-full h-full">
            <defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#17324f"/><stop offset="1" stopColor="#081120"/></linearGradient></defs>
            <rect width="1200" height="620" fill="url(#bg)"/>
            <ellipse cx="580" cy="190" rx="500" ry="150" fill="#3b3a2f" opacity=".8"/>
            {(['Zone A','Zone B','Zone C','Zone D'] as ZoneKey[]).map((z,idx)=><g key={z} onClick={()=>setZone(z)} className="cursor-pointer"><path d={`M ${220+idx*220} ${200+(idx%2)*35} Q ${280+idx*220} ${140+(idx%2)*30}, ${370+idx*220} ${205+(idx%2)*20} Q ${310+idx*220} ${250}, ${220+idx*220} ${200+(idx%2)*35}`} fill="none" stroke={zone===z?'#22d3ee':'#34d399'} strokeWidth="4"/><text x={280+idx*220} y={140+(idx%2)*35} fill="#bbf7ff">{z}</text></g>)}
            <rect x="730" y="275" width="190" height="70" rx="8" fill="#111827" stroke="#22d3ee"/><text x="745" y="305" fill="#e0f2fe">AI COMMAND CENTER</text>
            {[220,420,620,820,980].map((x)=><line key={x} x1={x} y1={220} x2={x} y2={540} stroke="#93c5fd" strokeWidth="4" opacity=".7"/>) }
            {['0 m','-10 m','-20 m','-30 m','-40 m','-50 m'].map((d,i)=><text key={d} x="20" y={320+i*45} fill="#93c5fd">{d}</text>)}
            <rect x="80" y="320" width="1040" height="240" fill="#0b1222" opacity=".9"/>
            {['#3b82f6','#22c55e','#f59e0b','#ef4444'].map((c,i)=><path key={c} d={`M80 ${340+i*55} C 260 ${370+i*55}, 440 ${320+i*55}, 1120 ${350+i*55} L 1120 ${385+i*55} C 740 ${405+i*55}, 420 ${375+i*55}, 80 ${390+i*55} Z`} fill={c} opacity=".3"/>) }
          </svg>
          <div className="absolute right-4 bottom-4 glass p-3 rounded-xl text-sm border border-cyan-700"><div className="font-semibold text-cyan-200">{zone}</div><div>O₂: {zoneData.o2}%</div><div>Temperature: {zoneData.temperature} °C</div><div>Humidity: {zoneData.humidity}%</div><div>Status: {zoneData.status}</div><div>Layer: {layer}</div><div>View: {view}</div></div>
        </main>
        <aside className="w-[360px] space-y-3">
          <div className="glass rounded-xl p-3"><div className="text-green-400 font-bold">All Systems Operational</div><div>Sensors 187/190 · Equipment 32/32 · Wells 124/128 · Network 100%</div></div>
          <div className="glass rounded-xl p-3"><div className="text-cyan-300 text-xl font-semibold">Increase aeration in Zone B by 12%</div><div className="text-slate-300 text-sm">AI model predicts O₂ below optimal range within 6 hours based on current trends and weather forecast. Confidence: 92%</div><button className="mt-2 px-3 py-2 rounded bg-cyan-500/20 border border-cyan-500" onClick={()=>{setZoneBBoost(0.8); setToast('Recommendation applied. Zone B O₂ improved.')}}>Apply Recommendation</button></div>
          <div className="glass rounded-xl p-3"><div className="text-orange-300 font-semibold">Alerts (3 Active)</div>{alerts.map(a=><div key={a.title} className="py-1 text-sm">• {a.title} <span className="text-slate-400">{a.time}</span></div>)}</div>
          <div className="grid grid-cols-2 gap-2"><MiniChart title="O₂ (%)" color="#22d3ee" values={chartSeries.map(d=>d.o2)} cursor={tick} /><MiniChart title="Temperature (°C)" color="#fb923c" values={chartSeries.map(d=>d.temp)} cursor={tick} /><MiniChart title="Degradation Rate (1/day)" color="#4ade80" values={chartSeries.map(d=>d.deg)} cursor={tick} /><MiniChart title="Stabilization Index" color="#2dd4bf" values={chartSeries.map(d=>d.stab)} cursor={tick} /></div>
        </aside>
      </div>
      <footer className="glass h-28 rounded-xl px-4 flex items-center justify-between"><div className="flex items-center gap-2"><button onClick={()=>setTick((tick+23)%24)}><SkipBack/></button><button onClick={()=>setPlaying(!playing)}>{playing?<Pause/>:<Play/>}</button><button onClick={()=>setTick((tick+1)%24)}><SkipForward/></button><div className="text-cyan-300">{String(tick).padStart(2,'0')}:00</div></div><div className="flex gap-2">{phases.map(p=><button key={p} onClick={()=>setPhase(p)} className={`px-3 py-2 rounded ${phase===p?'bg-cyan-500/20 border border-cyan-400':'bg-slate-800/50'}`}>{p}</button>)}</div><button onClick={()=>setAuto(!auto)} className="px-3 py-2 rounded border border-cyan-700">{auto?'AI Auto Mode':'Manual Mode'}</button></footer>
    </div>
    <AnimatePresence>{toast && <motion.div className="fixed right-6 top-20 glass px-4 py-2 rounded-xl" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}} onAnimationComplete={()=>setTimeout(()=>setToast(''),1400)}>{toast}</motion.div>}</AnimatePresence>
  </div>
}
