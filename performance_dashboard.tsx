import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const salesData = [
  { month:"Jan", Revenue:210000, Target:200000 },
  { month:"Feb", Revenue:195000, Target:210000 },
  { month:"Mar", Revenue:230000, Target:215000 },
  { month:"Apr", Revenue:248000, Target:225000 },
  { month:"May", Revenue:262000, Target:240000 },
  { month:"Jun", Revenue:255000, Target:250000 },
  { month:"Jul", Revenue:278000, Target:260000 },
  { month:"Aug", Revenue:290000, Target:270000 },
  { month:"Sep", Revenue:275000, Target:275000 },
  { month:"Oct", Revenue:305000, Target:285000 },
  { month:"Nov", Revenue:318000, Target:295000 },
  { month:"Dec", Revenue:334000, Target:310000 },
];

const budgetData = [
  { category:"Payroll",    Budget:120000, Actual:118500 },
  { category:"Marketing",  Budget:35000,  Actual:38200  },
  { category:"Operations", Budget:52000,  Actual:49800  },
  { category:"Technology", Budget:28000,  Actual:31400  },
  { category:"R&D",        Budget:20000,  Actual:17600  },
  { category:"Travel",     Budget:12000,  Actual:14100  },
];

const supportData = [
  { month:"Jan", Tickets:142, CSAT:82 },
  { month:"Feb", Tickets:158, CSAT:79 },
  { month:"Mar", Tickets:134, CSAT:84 },
  { month:"Apr", Tickets:167, CSAT:77 },
  { month:"May", Tickets:149, CSAT:81 },
  { month:"Jun", Tickets:172, CSAT:76 },
  { month:"Jul", Tickets:161, CSAT:80 },
  { month:"Aug", Tickets:145, CSAT:85 },
  { month:"Sep", Tickets:138, CSAT:87 },
  { month:"Oct", Tickets:153, CSAT:83 },
  { month:"Nov", Tickets:160, CSAT:81 },
  { month:"Dec", Tickets:144, CSAT:86 },
];

const commodityData = [
  { month:"Jan", Gold:1920, Oil:76, Copper:3.82, NatGas:2.95 },
  { month:"Feb", Gold:1875, Oil:78, Copper:3.91, NatGas:2.60 },
  { month:"Mar", Gold:1940, Oil:81, Copper:4.01, NatGas:2.30 },
  { month:"Apr", Gold:1985, Oil:85, Copper:4.15, NatGas:2.10 },
  { month:"May", Gold:2010, Oil:83, Copper:4.22, NatGas:2.25 },
  { month:"Jun", Gold:1960, Oil:79, Copper:4.08, NatGas:2.40 },
  { month:"Jul", Gold:1930, Oil:82, Copper:3.98, NatGas:2.70 },
  { month:"Aug", Gold:1955, Oil:88, Copper:4.10, NatGas:2.90 },
  { month:"Sep", Gold:2045, Oil:91, Copper:4.28, NatGas:3.10 },
  { month:"Oct", Gold:2090, Oil:89, Copper:4.35, NatGas:3.40 },
  { month:"Nov", Gold:2150, Oil:86, Copper:4.41, NatGas:3.75 },
  { month:"Dec", Gold:2210, Oil:90, Copper:4.55, NatGas:4.10 },
];

const fmt = (v) => v >= 1000 ? `$${(v/1000).toFixed(0)}k` : `$${v}`;
const fmtFull = (v) => `$${v.toLocaleString()}`;

const KPICard = ({ label, value, sub, color, up }) => (
  <div style={{
    background:"#1e2433", borderRadius:12, padding:"18px 22px",
    flex:1, minWidth:160, borderTop:`3px solid ${color}`
  }}>
    <div style={{ fontSize:12, color:"#8892a4", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</div>
    <div style={{ fontSize:26, fontWeight:700, color:"#f0f4ff" }}>{value}</div>
    <div style={{ fontSize:12, marginTop:6, color: up ? "#4ade80" : "#f87171" }}>{sub}</div>
  </div>
);

const SectionTitle = ({ children, note }) => (
  <div style={{ marginBottom:12 }}>
    <div style={{ fontSize:14, fontWeight:600, color:"#c8d0e0", letterSpacing:"0.03em" }}>{children}</div>
    {note && <div style={{ fontSize:11, color:"#6b7a99", marginTop:3 }}>{note}</div>}
  </div>
);

const tooltipStyle = { backgroundColor:"#1e2433", border:"1px solid #2e3a55", borderRadius:8, color:"#e0e8ff", fontSize:12 };

export default function Dashboard() {
  const [activeComm, setActiveComm] = useState({ Gold:true, Oil:true, Copper:true, NatGas:true });

  const toggleComm = (k) => setActiveComm(p => ({ ...p, [k]: !p[k] }));

  const totalRev = salesData.reduce((s,d) => s + d.Revenue, 0);
  const totalBudget = budgetData.reduce((s,d) => s + d.Budget, 0);
  const totalActual = budgetData.reduce((s,d) => s + d.Actual, 0);
  const budgetPct = ((totalActual / totalBudget) * 100).toFixed(1);
  const avgCSAT = (supportData.reduce((s,d) => s + d.CSAT, 0) / supportData.length).toFixed(1);
  const totalTickets = supportData.reduce((s,d) => s + d.Tickets, 0);

  const commColors = { Gold:"#f5c842", Oil:"#60a5fa", Copper:"#fb923c", NatGas:"#a78bfa" };
  const commLabels = { Gold:"Gold ($/oz)", Oil:"Oil ($/bbl)", Copper:"Copper ($/lb)", NatGas:"Nat Gas ($/MMBtu)" };

  return (
    <div style={{ background:"#131720", minHeight:"100vh", padding:"24px", fontFamily:"'Inter',system-ui,sans-serif", color:"#e0e8ff" }}>
      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:22, fontWeight:700, color:"#f0f4ff" }}>Monthly Performance Dashboard</div>
        <div style={{ fontSize:12, color:"#6b7a99", marginTop:4 }}>FY 2024 · Sample Data · All figures in USD</div>
      </div>

      {/* KPI Cards */}
      <div style={{ display:"flex", gap:14, marginBottom:28, flexWrap:"wrap" }}>
        <KPICard label="Total Revenue (YTD)" value={`$${(totalRev/1e6).toFixed(2)}M`} sub="▲ 12.4% vs prior year" color="#4ade80" up={true} />
        <KPICard label="Budget Utilization" value={`${budgetPct}%`} sub="▲ 2.1% over budget" color="#f87171" up={false} />
        <KPICard label="Support Tickets (YTD)" value={totalTickets.toLocaleString()} sub={`Avg CSAT: ${avgCSAT}%`} color="#60a5fa" up={true} />
        <KPICard label="Gold YTD Change" value="+15.1%" sub="$1,920 → $2,210/oz" color="#f5c842" up={true} />
      </div>

      {/* Row 2: Sales + Budget */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
        {/* Sales */}
        <div style={{ background:"#1e2433", borderRadius:12, padding:"20px" }}>
          <SectionTitle>Sales & Revenue — Monthly</SectionTitle>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={salesData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e3a55" vertical={false} />
              <XAxis dataKey="month" tick={{ fill:"#8892a4", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmt} tick={{ fill:"#8892a4", fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => fmtFull(v)} contentStyle={tooltipStyle} cursor={{ fill:"#ffffff08" }} />
              <Legend wrapperStyle={{ fontSize:12, color:"#8892a4" }} />
              <Bar dataKey="Revenue" fill="#4ade80" radius={[4,4,0,0]} />
              <Bar dataKey="Target" fill="#2e3a55" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Budget */}
        <div style={{ background:"#1e2433", borderRadius:12, padding:"20px" }}>
          <SectionTitle>Budget vs. Actual by Category</SectionTitle>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={budgetData} layout="vertical" barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e3a55" horizontal={false} />
              <XAxis type="number" tickFormatter={fmt} tick={{ fill:"#8892a4", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="category" type="category" tick={{ fill:"#8892a4", fontSize:11 }} axisLine={false} tickLine={false} width={72} />
              <Tooltip formatter={(v) => fmtFull(v)} contentStyle={tooltipStyle} cursor={{ fill:"#ffffff08" }} />
              <Legend wrapperStyle={{ fontSize:12, color:"#8892a4" }} />
              <Bar dataKey="Budget" fill="#60a5fa" radius={[0,4,4,0]} />
              <Bar dataKey="Actual" fill="#f87171" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Support + Commodities */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        {/* Support */}
        <div style={{ background:"#1e2433", borderRadius:12, padding:"20px" }}>
          <SectionTitle>Customer Support — Tickets & CSAT</SectionTitle>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={supportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e3a55" />
              <XAxis dataKey="month" tick={{ fill:"#8892a4", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill:"#8892a4", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[60,100]} tick={{ fill:"#8892a4", fontSize:11 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize:12, color:"#8892a4" }} />
              <Line yAxisId="left" type="monotone" dataKey="Tickets" stroke="#60a5fa" strokeWidth={2} dot={{ r:3 }} />
              <Line yAxisId="right" type="monotone" dataKey="CSAT" stroke="#4ade80" strokeWidth={2} dot={{ r:3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Commodities */}
        <div style={{ background:"#1e2433", borderRadius:12, padding:"20px" }}>
          <SectionTitle
            note="External market context — commodity price trends help explain shifts in client revenue & costs not captured internally."
          >
            Commodity Prices — Market Context
          </SectionTitle>
          {/* Toggle buttons */}
          <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
            {Object.keys(commColors).map(k => (
              <button key={k} onClick={() => toggleComm(k)} style={{
                background: activeComm[k] ? commColors[k] + "22" : "#131720",
                border:`1px solid ${activeComm[k] ? commColors[k] : "#2e3a55"}`,
                borderRadius:20, padding:"3px 11px", fontSize:11,
                color: activeComm[k] ? commColors[k] : "#4a5568", cursor:"pointer"
              }}>{k}</button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={195}>
            <LineChart data={commodityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e3a55" />
              <XAxis dataKey="month" tick={{ fill:"#8892a4", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#8892a4", fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v,n) => [`${v}`, commLabels[n] || n]} />
              {Object.keys(commColors).map(k => activeComm[k] && (
                <Line key={k} type="monotone" dataKey={k} stroke={commColors[k]} strokeWidth={2} dot={{ r:2 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop:20, fontSize:11, color:"#3d4a63", textAlign:"center" }}>
        Sample data for illustration purposes · Commodity prices indexed to general market trends
      </div>
    </div>
  );
}
