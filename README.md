# AI-Driven Digital Twin for Aerobic Landfill Remediation and Rapid Stabilization

## Run locally

```bash
npm install
npm run dev
```

## Major features

- Futuristic dark-blue digital twin dashboard with KPI row, control sidebar, central pseudo-3D remediation scene, intelligence panel, and timeline controls.
- Rich central scene (SVG + CSS) with zone selection (A/B/C/D), command center, wells, subsurface layers (0 to -50m), and depth labels.
- Interactive controls: view mode switching, layer toggles, phase switching, play/pause timeline, manual/AI auto mode switch, and recommendation apply workflow.
- AI recommendation action updates Zone B oxygen value and emits status toast.
- Right panel charts built with ECharts mini time-series widgets.
- 1-second boot/loading overlay and subtle scanline effect for presentation polish.

## Data structure

All mock data is centralized in:

- `src/data/mockDigitalTwin.ts`

It includes:

- KPI data
- Zones metrics
- Alert feed
- Timeline phases
- Time-series chart data

## Replacing mock data with real sensor data

1. Keep the same data shape in `src/data/mockDigitalTwin.ts`.
2. Replace exported constants with API fetch hooks (e.g., React Query or SWR).
3. Normalize incoming telemetry to the current zone and chart schema.
4. Add WebSocket/SSE stream updates for near-real-time timeline and alert updates.
5. Maintain UI state transitions (selection, active phase, and mode toggles) while merging live data snapshots.
