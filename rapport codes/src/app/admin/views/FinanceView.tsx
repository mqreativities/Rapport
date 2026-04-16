import { useState } from 'react';
import {
  DollarSign, TrendingUp, ArrowUpRight, CheckCircle2, RefreshCw,
  Download, Filter, Search, MoreHorizontal, AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

interface Props { activeNav: string; }

const monthlyData = [
  { month: 'Oct', revenue: 1850000, payouts: 1110000, commission: 370000 },
  { month: 'Nov', revenue: 2120000, payouts: 1272000, commission: 424000 },
  { month: 'Dec', revenue: 1950000, payouts: 1170000, commission: 390000 },
  { month: 'Jan', revenue: 2540000, payouts: 1524000, commission: 508000 },
  { month: 'Feb', revenue: 2280000, payouts: 1368000, commission: 456000 },
  { month: 'Mar', revenue: 2960000, payouts: 1776000, commission: 592000 },
];

const subData = [
  { month: 'Oct', subs: 125 },
  { month: 'Nov', subs: 148 },
  { month: 'Dec', subs: 137 },
  { month: 'Jan', subs: 182 },
  { month: 'Feb', subs: 167 },
  { month: 'Mar', subs: 214 },
];

const pendingPayouts = [
  { counselor: 'Dr. Adaeze Okonkwo', sessions: 16, amount: '₦98,500', bank: 'GTBank ****4421' },
  { counselor: 'Mr. Emeka Nwosu', sessions: 12, amount: '₦72,000', bank: 'Access ****8812' },
  { counselor: 'Dr. Kemi Adeyemi', sessions: 19, amount: '₦115,000', bank: 'First Bank ****2290' },
  { counselor: 'Ms. Chisom Okoro', sessions: 9, amount: '₦54,000', bank: 'Zenith ****7743' },
  { counselor: 'Mr. Tunde Adewale', sessions: 14, amount: '₦84,000', bank: 'UBA ****3310' },
];

const transactions = [
  { id: 'TXN-8821', type: 'Session Fee', user: 'Amara Okonkwo', amount: '+₦7,800', date: 'Mar 10', status: 'Completed' },
  { id: 'TXN-8820', type: 'Subscription', user: 'Anxiety Support Community', amount: '+₦2,000', date: 'Mar 10', status: 'Completed' },
  { id: 'TXN-8819', type: 'Payout', user: 'Dr. Adaeze Okonkwo', amount: '-₦98,500', date: 'Mar 9', status: 'Completed' },
  { id: 'TXN-8818', type: 'Session Fee', user: 'Bode Tunde', amount: '+₦6,500', date: 'Mar 9', status: 'Completed' },
  { id: 'TXN-8817', type: 'Refund', user: 'Chidi Obiora', amount: '-₦7,800', date: 'Mar 8', status: 'Refunded' },
  { id: 'TXN-8816', type: 'Org Package', user: 'TechCorp Nigeria', amount: '+₦48,000', date: 'Mar 8', status: 'Completed' },
];

const subPlans = [
  { plan: 'Individual Monthly', price: '₦2,000/mo', subs: 892, revenue: '₦1,784,000', renewal: '88%' },
  { plan: 'Individual Yearly', price: '₦20,000/yr', subs: 314, revenue: '₦6,280,000', renewal: '94%' },
  { plan: 'Org Standard', price: '₦18,000/mo', subs: 21, revenue: '₦378,000', renewal: '91%' },
  { plan: 'Org Enterprise', price: '₦48,000/mo', subs: 8, revenue: '₦384,000', renewal: '100%' },
];

const revenueStreams = [
  { name: 'Session Fees', value: 58, color: '#3B82F6' },
  { name: 'Subscriptions', value: 27, color: '#FACC15' },
  { name: 'Resources', value: 15, color: '#22C55E' },
];

// ─── Shared sub-components ───────────────────────────────────────────────────

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl border border-[#E2E8F0] shadow-[0px_4px_16px_rgba(15,23,42,0.06)] ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-6">
    <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A' }}>{title}</h1>
    <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>{subtitle}</p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────

export function FinanceView({ activeNav }: Props) {
  const [payoutStatuses, setPayoutStatuses] = useState<Record<string, boolean>>({});
  const [txSearch, setTxSearch] = useState('');

  // ─── OVERVIEW ───────────────────────────────────────────────────────────────
  if (activeNav === 'overview') return (
    <div className="space-y-6">
      <SectionHeader title="Finance Overview" subtitle="Revenue tracking and financial health at a glance" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'March Revenue', value: '₦2.96M', sub: '+29.8%', bg: '#DBEAFE', ic: '#3B82F6' },
          { label: 'Active Subscriptions', value: '1,235', sub: '+14.2%', bg: '#D1FAE5', ic: '#22C55E' },
          { label: 'Pending Payouts', value: '₦423.5K', sub: '5 counselors', bg: '#FEF9C3', ic: '#EAB308' },
          { label: 'Platform Commission', value: '₦592K', sub: '20% rate', bg: '#FCE7F3', ic: '#EC4899' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <DollarSign className="w-5 h-5" style={{ color: s.ic }} />
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <ArrowUpRight className="w-3 h-3 text-[#22C55E]" />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#22C55E' }}>{s.sub}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Revenue vs. Payouts</h3>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={monthlyData} isAnimationActive={false}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => `₦${v.toLocaleString()}`} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3B82F6" strokeWidth={2.5} fill="#3B82F6" fillOpacity={0.12} isAnimationActive={false} />
              <Area type="monotone" dataKey="payouts" name="Payouts" stroke="#FACC15" strokeWidth={2} fill="#FACC15" fillOpacity={0.12} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Revenue Streams</h3>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={revenueStreams} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value" isAnimationActive={false}>
                {revenueStreams.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {revenueStreams.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  // ─── REVENUE ─────────────────────────────────────────────────────────────────
  if (activeNav === 'revenue') return (
    <div className="space-y-6">
      <SectionHeader title="Revenue Analytics" subtitle="Detailed breakdown of all income streams" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Monthly Revenue Breakdown</h3>
          <button className="flex items-center gap-2 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v/1000000).toFixed(1)}M`} />
            <Tooltip formatter={(v: number) => `₦${v.toLocaleString()}`} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
            <Bar dataKey="revenue" name="Total Revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} isAnimationActive={false} />
            <Bar dataKey="commission" name="Commission" fill="#22C55E" radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  // ─── PAYOUTS ─────────────────────────────────────────────────────────────────
  if (activeNav === 'payouts') return (
    <div className="space-y-6">
      <SectionHeader title="Counselor Payouts" subtitle="Review and approve pending counselor disbursements" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Pending Payouts', value: '₦423.5K', bg: '#FEF9C3', ic: '#EAB308' },
          { label: 'Paid This Month', value: '₦1.78M', bg: '#D1FAE5', ic: '#22C55E' },
          { label: 'Counselors in Queue', value: '5', bg: '#DBEAFE', ic: '#3B82F6' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <DollarSign className="w-4 h-4" style={{ color: s.ic }} />
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Pending Payout Queue</h3>
          <button
            onClick={() => setPayoutStatuses(Object.fromEntries(pendingPayouts.map(p => [p.counselor, true])))}
            className="flex items-center gap-2 bg-[#22C55E] text-white px-4 py-2 rounded-xl hover:bg-[#16A34A] transition-colors"
            style={{ fontSize: '0.82rem', fontWeight: 700 }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Approve All
          </button>
        </div>
        <div className="space-y-3">
          {pendingPayouts.map((p, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${payoutStatuses[p.counselor] ? 'bg-[#F0FDF4] border-[#86EFAC]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
              <div className="flex-1 min-w-0">
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{p.counselor}</p>
                <p className="text-[#64748B]" style={{ fontSize: '0.75rem' }}>{p.sessions} sessions · {p.bank}</p>
              </div>
              <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem' }}>{p.amount}</span>
              {payoutStatuses[p.counselor] ? (
                <span className="bg-[#22C55E] text-white px-3 py-1.5 rounded-xl" style={{ fontWeight: 700, fontSize: '0.8rem' }}>Approved</span>
              ) : (
                <button
                  onClick={() => setPayoutStatuses(prev => ({ ...prev, [p.counselor]: true }))}
                  className="bg-[#DBEAFE] text-[#1D4ED8] px-3 py-1.5 rounded-xl hover:bg-[#3B82F6] hover:text-white transition-colors"
                  style={{ fontWeight: 700, fontSize: '0.8rem' }}
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // ─── SUBSCRIPTIONS ───────────────────────────────────────────────────────────
  if (activeNav === 'subscriptions') return (
    <div className="space-y-6">
      <SectionHeader title="Subscriptions" subtitle="Active subscription plans and renewal analytics" />
      <Card className="p-6">
        <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Subscription Growth</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={subData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
            <Line type="monotone" dataKey="subs" name="Subscribers" stroke="#FACC15" strokeWidth={2.5} dot={{ fill: '#FACC15', r: 4 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6">
        <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Plan Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                {['Plan', 'Price', 'Subscribers', 'Monthly Revenue', 'Renewal Rate'].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subPlans.map((s, i) => (
                <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC]">
                  <td className="py-3 pr-4" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{s.plan}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{s.price}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{s.subs.toLocaleString()}</td>
                  <td className="py-3 pr-4" style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{s.revenue}</td>
                  <td className="py-3 pr-4" style={{ fontWeight: 700, fontSize: '0.875rem', color: '#22C55E' }}>{s.renewal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── TRANSACTIONS ────────────────────────────────────────────────────────────
  if (activeNav === 'transactions') return (
    <div className="space-y-6">
      <SectionHeader title="Transaction Log" subtitle="All platform financial transactions" />
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              value={txSearch}
              onChange={e => setTxSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#3B82F6] transition-colors"
              style={{ fontSize: '0.85rem' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <button className="flex items-center gap-2 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                {['Transaction ID', 'Type', 'User/Entity', 'Amount', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter(t => t.user.toLowerCase().includes(txSearch.toLowerCase()) || t.id.toLowerCase().includes(txSearch.toLowerCase()))
                .map((t, i) => (
                  <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC]">
                    <td className="py-3 pr-4" style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>{t.id}</td>
                    <td className="py-3 pr-4">
                      <span className="bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-md" style={{ fontSize: '0.72rem', fontWeight: 600 }}>{t.type}</span>
                    </td>
                    <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{t.user}</td>
                    <td className="py-3 pr-4" style={{ fontWeight: 700, fontSize: '0.875rem', color: t.amount.startsWith('+') ? '#166534' : '#991B1B' }}>{t.amount}</td>
                    <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{t.date}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${t.status === 'Completed' ? 'bg-[#D1FAE5] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── REPORTS ─────────────────────────────────────────────────────────────────
  if (activeNav === 'reports') return (
    <div className="space-y-6">
      <SectionHeader title="Financial Reports" subtitle="Generated summaries and downloadable statements" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Q1 2026 Financial Summary', date: 'Mar 22, 2026', size: '16 pages', ready: true },
          { title: 'March 2026 Revenue Report', date: 'Mar 22, 2026', size: '8 pages', ready: true },
          { title: 'Payout Ledger — March', date: 'Mar 22, 2026', size: '5 pages', ready: true },
          { title: 'Subscription Analytics Q1', date: 'Mar 22, 2026', size: '10 pages', ready: true },
          { title: 'Tax Summary 2025–2026', date: 'Mar 15, 2026', size: '22 pages', ready: true },
          { title: 'April 2026 Forecast', date: 'Scheduled', size: '—', ready: false },
        ].map((r, i) => (
          <Card key={i} className="p-5">
            <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ background: r.ready ? '#DBEAFE' : '#F1F5F9' }}>
              {r.ready ? <TrendingUp className="w-5 h-5 text-[#3B82F6]" /> : <RefreshCw className="w-5 h-5 text-[#94A3B8]" />}
            </div>
            <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{r.title}</p>
            <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>{r.date} · {r.size}</p>
            <div className="flex items-center justify-between mt-4">
              {r.ready
                ? <span className="bg-[#D1FAE5] text-[#166534] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>Ready</span>
                : <span className="bg-[#F1F5F9] text-[#94A3B8] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>Pending</span>}
              {r.ready && (
                <button className="flex items-center gap-1.5 text-[#3B82F6] hover:text-[#2563EB]" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return null;
}