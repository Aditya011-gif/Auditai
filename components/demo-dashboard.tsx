"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowDownRight, Sparkles } from "lucide-react";

const data = [
  { month: "Jan", spend: 720, optimized: 620 },
  { month: "Feb", spend: 940, optimized: 690 },
  { month: "Mar", spend: 1180, optimized: 760 },
  { month: "Apr", spend: 1320, optimized: 810 },
  { month: "May", spend: 1470, optimized: 850 }
];

export function DemoDashboard() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-4 sm:p-6">
      <div className="absolute -right-16 -top-16 size-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Projected savings</p>
          <motion.p className="mt-1 text-4xl font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>$7,440</motion.p>
        </div>
        <span className="rounded-full bg-primary/15 px-3 py-1 text-sm text-primary">+31%</span>
      </div>
      <div className="mt-8 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="spend" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#fb7185" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="optimized" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#111827", border: "1px solid #243041", borderRadius: 12 }} />
            <Area type="monotone" dataKey="spend" stroke="#fb7185" fill="url(#spend)" strokeWidth={2} />
            <Area type="monotone" dataKey="optimized" stroke="#2dd4bf" fill="url(#optimized)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {["Downgrade Cursor Business", "Move writing API calls to Claude Max"].map((item, index) => (
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3 + index, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
            key={item}
          >
            <div className="flex items-center gap-2 text-sm font-medium"><Sparkles className="size-4 text-primary" /> {item}</div>
            <p className="mt-2 flex items-center gap-1 text-sm text-teal-200"><ArrowDownRight className="size-4" /> saves ${index === 0 ? 80 : 383}/mo</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

