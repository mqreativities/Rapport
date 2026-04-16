import { useState } from 'react';
import {
  Users, UserCheck, Building2, TrendingUp, Activity, Shield, FileText,
  Settings, ArrowUpRight, ArrowDownRight, MoreHorizontal, Search, Filter,
  Plus, Eye, Trash2, Edit2, RefreshCw, CheckCircle2, XCircle, AlertTriangle,
  Download, Server, Cpu, Database, Wifi, Clock, ChevronRight, ToggleLeft, ToggleRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

interface Props { activeNav: string; }

const revenueData = [
  { month: 'Oct', revenue: 1850000, users: 9800 },
  { month: 'Nov', revenue: 2120000, users: 10400 },
  { month: 'Dec', revenue: 1950000, users: 11200 },
  { month: 'Jan', revenue: 2540000, users: 12100 },
  { month: 'Feb', revenue: 2280000, users: 13300 },
  { month: 'Mar', revenue: 2960000, users: 14291 },
];

const pieData = [
  { name: 'Consultation Fees', value: 58, color: '#3B82F6' },
  { name: 'Subscriptions', value: 27, color: '#FACC15' },
  { name: 'Resources', value: 15, color: '#22C55E' },
];

const systemMetrics = [
  { label: 'API Response', value: '142ms', status: 'good', detail: 'Avg over 1hr' },
  { label: 'Uptime', value: '99.97%', status: 'good', detail: 'Last 30 days' },
  { label: 'CPU Usage', value: '34%', status: 'good', detail: 'Across all nodes' },
  { label: 'Memory', value: '61%', status: 'warn', detail: '4.9 / 8 GB' },
  { label: 'DB Queries', value: '2,841/min', status: 'good', detail: 'Peak: 6,200' },
  { label: 'Error Rate', value: '0.03%', status: 'good', detail: 'Last 24hrs' },
];

const adminAccounts = [
  { name: 'Ifeanyi Okafor', role: 'Compliance Admin', email: 'compliance@rapport.ng', active: '2 hrs ago', status: 'Active', initials: 'IO', color: '#22C55E' },
  { name: 'Sade Martins', role: 'Finance Admin', email: 'finance@rapport.ng', active: '1 day ago', status: 'Active', initials: 'SM', color: '#FACC15' },
  { name: 'Kola Adeyemi', role: 'Community Admin', email: 'community@rapport.ng', active: '3 hrs ago', status: 'Active', initials: 'KA', color: '#EC4899' },
  { name: 'Uju Bassey', role: 'Support Admin', email: 'support@rapport.ng', active: '30 min ago', status: 'Active', initials: 'UB', color: '#F59E0B' },
];

const auditLog = [
  { time: '10:34 AM', user: 'Ifeanyi O.', action: 'Approved counselor', target: 'Dr. Amaka Chukwu', type: 'approve' },
  { time: '10:12 AM', user: 'Sade M.', action: 'Processed payout', target: '₦98,500 → Dr. Adaeze O.', type: 'finance' },
  { time: '09:58 AM', user: 'Kola A.', action: 'Removed flagged post', target: 'Community: Anxiety Support', type: 'remove' },
  { time: '09:45 AM', user: 'Uju B.', action: 'Resolved ticket', target: 'TKT-001 — Billing Issue', type: 'resolve' },
  { time: '09:14 AM', user: 'Chukwuemeka O.', action: 'Updated platform settings', target: 'Session pricing config', type: 'settings' },
  { time: '08:52 AM', user: 'Ifeanyi O.', action: 'Flagged account for review', target: 'Mr. Yusuf Bello', type: 'flag' },
  { time: 'Yesterday', user: 'Sade M.', action: 'Generated finance report', target: 'Q1 2026 Summary', type: 'report' },
  { time: 'Yesterday', user: 'Kola A.', action: 'Assigned moderator', target: 'Dr. Kemi → Grief & Loss', type: 'assign' },
];

const userRows = [
  { name: 'Amara Okonkwo', email: 'amara@email.com', role: 'Client', joined: 'Jan 12, 2026', sessions: 8, status: 'Active' },
  { name: 'Bode Tunde', email: 'bode@email.com', role: 'Client', joined: 'Feb 3, 2026', sessions: 3, status: 'Active' },
  { name: 'Dr. Adaeze Okonkwo', email: 'adaeze@rapport.ng', role: 'Counselor', joined: 'Nov 5, 2025', sessions: 142, status: 'Active' },
  { name: 'TechCorp Nigeria', email: 'hr@techcorp.ng', role: 'Organization', joined: 'Dec 1, 2025', sessions: 0, status: 'Active' },
  { name: 'Funmi Adeyemi', email: 'funmi@email.com', role: 'Client', joined: 'Mar 1, 2026', sessions: 1, status: 'Active' },
  { name: 'Mr. Segun Adebisi', email: 'segun@rapport.ng', role: 'Counselor', joined: 'Mar 10, 2026', sessions: 0, status: 'Pending' },
  { name: 'Chidi Obiora', email: 'chidi@email.com', role: 'Client', joined: 'Feb 28, 2026', sessions: 5, status: 'Suspended' },
];

const counselorRows = [
  { name: 'Dr. Adaeze Okonkwo', specialty: 'Anxiety & CBT', rating: 4.9, sessions: 142, earnings: '₦1.24M', status: 'Active', verified: true },
  { name: 'Mr. Emeka Nwosu', specialty: 'Family Therapy', rating: 4.7, sessions: 98, earnings: '₦856K', status: 'Active', verified: true },
  { name: 'Dr. Kemi Adeyemi', specialty: 'Trauma Recovery', rating: 4.8, sessions: 115, earnings: '₦987K', status: 'Active', verified: true },
  { name: 'Dr. Amaka Chukwu', specialty: 'Grief Counseling', rating: 0, sessions: 0, earnings: '—', status: 'Pending', verified: false },
  { name: 'Mr. Segun Adebisi', specialty: 'Addiction', rating: 0, sessions: 0, earnings: '—', status: 'Under Review', verified: false },
];

const orgRows = [
  { name: 'TechCorp Nigeria Ltd', contact: 'Taiwo Obi', email: 'hr@techcorp.ng', employees: 42, plan: 'Enterprise', status: 'Active' },
  { name: 'Lagos State University', contact: 'Prof. Ade Bello', email: 'wellness@lasu.edu.ng', employees: 120, plan: 'Academic', status: 'Active' },
  { name: 'HealthBridge Clinic', contact: 'Dr. Ngozi Eze', email: 'admin@healthbridge.ng', employees: 18, plan: 'Pro', status: 'Active' },
  { name: 'Sterling Bank HR', contact: 'Femi Adeyemi', email: 'hr@sterling.ng', employees: 210, plan: 'Enterprise', status: 'Pending' },
];

const platformSettings = [
  { section: 'Session Management', settings: [
    { key: 'session_duration', label: 'Default Session Duration', value: '60 minutes', type: 'text' },
    { key: 'session_pricing', label: 'Base Session Price', value: '₦6,500', type: 'text' },
    { key: 'session_limit', label: 'Max Sessions per Day (Counselor)', value: '8', type: 'text' },
  ]},
  { section: 'Platform Fees', settings: [
    { key: 'commission', label: 'Platform Commission Rate', value: '20%', type: 'text' },
    { key: 'access_fee', label: 'Consultation Access Fee (₦)', value: '₦5,000', type: 'text' },
    { key: 'payout_cycle', label: 'Payout Cycle', value: 'Bi-weekly', type: 'text' },
    { key: 'sub_fee', label: 'Community Subscription Fee', value: '₦2,000/mo', type: 'text' },
  ]},
  { section: 'Features', settings: [
    { key: 'crisis_alert', label: 'Crisis Alert System', value: true, type: 'toggle' },
    { key: 'org_portal', label: 'Organization Portal', value: true, type: 'toggle' },
    { key: 'community', label: 'Community Forums', value: true, type: 'toggle' },
  ]},
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

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    Active: 'bg-[#D1FAE5] text-[#166534]',
    Pending: 'bg-[#FEF9C3] text-[#92400E]',
    Suspended: 'bg-[#FEE2E2] text-[#991B1B]',
    'Under Review': 'bg-[#DBEAFE] text-[#1D4ED8]',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full ${map[status] || 'bg-[#F1F5F9] text-[#64748B]'}`}
      style={{ fontSize: '0.72rem', fontWeight: 700 }}>
      {status}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

export function SuperAdminView({ activeNav }: Props) {

  const [userSearch, setUserSearch] = useState('');
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    crisis_alert: true, org_portal: true, community: true,
  });

  // ─ OVERVIEW ───────────────────────────────────────────────────────────────
  if (activeNav === 'overview') return (
    <div className="space-y-6">
      <SectionHeader title="Platform Overview" subtitle="Real-time analytics and system health" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '14,291', change: '+12.4%', up: true, bg: '#DBEAFE', ic: '#3B82F6', Icon: Users },
          { label: 'Active Counselors', value: '487', change: '+8 this week', up: true, bg: '#D1FAE5', ic: '#22C55E', Icon: UserCheck },
          { label: 'Monthly Revenue', value: '₦2.96M', change: '+29.8%', up: true, bg: '#FEF9C3', ic: '#EAB308', Icon: TrendingUp },
          { label: 'Open Tickets', value: '23', change: '−5 today', up: false, bg: '#FCE7F3', ic: '#EC4899', Icon: AlertTriangle },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <s.Icon className="w-5 h-5" style={{ color: s.ic }} />
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
            <div className="flex items-center gap-1 mt-1.5">
              {s.up ? <ArrowUpRight className="w-3 h-3 text-[#22C55E]" /> : <ArrowDownRight className="w-3 h-3 text-[#22C55E]" />}
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#22C55E' }}>{s.change}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Revenue & User Growth</h3>
            <span className="bg-[#DBEAFE] text-[#1D4ED8] px-2.5 py-1 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2.5} fill="#3B82F6" fillOpacity={0.15} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Revenue Mix</h3>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value" isAnimationActive={false}>
                {pieData.map((e, i) => <Cell key={`cell-${i}`} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Audit */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Recent Admin Activity</h3>
          <button className="text-[#3B82F6] hover:text-[#2563EB]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>View All →</button>
        </div>
        <div className="space-y-3">
          {auditLog.slice(0, 5).map((log, i) => {
            const colorMap: Record<string, string> = {
              approve: '#22C55E', finance: '#3B82F6', remove: '#EF4444',
              resolve: '#22C55E', settings: '#8B5CF6', flag: '#F59E0B',
            };
            return (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-[#F8FAFC] last:border-0">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: (colorMap[log.type] || '#94A3B8') + '18' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: colorMap[log.type] || '#94A3B8' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: '0.85rem', color: '#0F172A' }}>
                    <span style={{ fontWeight: 700 }}>{log.user}</span>{' '}
                    <span className="text-[#64748B]">{log.action}</span>
                  </p>
                  <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>{log.target}</p>
                </div>
                <span className="text-[#CBD5E1] flex-shrink-0" style={{ fontSize: '0.72rem' }}>{log.time}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  // ─── USERS ───────────────────────────────────────────────────────────────────
  if (activeNav === 'users') return (
    <div className="space-y-6">
      <SectionHeader title="User Management" subtitle="All clients, counselors, and organizations on the platform" />
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2.5 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors"
              style={{ fontSize: '0.85rem' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-xl hover:bg-[#2563EB] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
              <Plus className="w-3.5 h-3.5" /> Add User
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                {['Name', 'Email', 'Role', 'Joined', 'Sessions', 'Status', ''].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userRows
                .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                .map((u, i) => (
                  <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC] transition-colors">
                    <td className="py-3 pr-4" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{u.name}</td>
                    <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{u.email}</td>
                    <td className="py-3 pr-4">
                      <span className="bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-md" style={{ fontSize: '0.72rem', fontWeight: 600 }}>{u.role}</span>
                    </td>
                    <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{u.joined}</td>
                    <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{u.sessions}</td>
                    <td className="py-3 pr-4"><StatusBadge status={u.status} /></td>
                    <td className="py-3">
                      <button className="p-1.5 text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F1F5F9]">
          <p className="text-[#94A3B8]" style={{ fontSize: '0.78rem' }}>Showing 7 of 14,291 users</p>
          <div className="flex items-center gap-1">
            {[1,2,3,'...',128].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${p === 1 ? 'bg-[#3B82F6] text-white' : 'text-[#64748B] hover:bg-[#F1F5F9]'}`}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  // ─── COUNSELORS ──────────────────────────────────────────────────────────────
  if (activeNav === 'counselors') return (
    <div className="space-y-6">
      <SectionHeader title="Counselor Management" subtitle="Verified practitioners and pending applicants" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active', value: '487', bg: '#D1FAE5', ic: '#22C55E' },
          { label: 'Pending Review', value: '12', bg: '#FEF9C3', ic: '#EAB308' },
          { label: 'Suspended', value: '3', bg: '#FEE2E2', ic: '#EF4444' },
          { label: 'Avg. Rating', value: '4.78', bg: '#DBEAFE', ic: '#3B82F6' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <UserCheck className="w-4.5 h-4.5" style={{ color: s.ic }} />
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>All Counselors</h3>
          <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-xl hover:bg-[#2563EB] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                {['Counselor', 'Specialty', 'Rating', 'Sessions', 'Earnings', 'Status', 'Verified', ''].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {counselorRows.map((c, i) => (
                <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC] transition-colors">
                  <td className="py-3 pr-4" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{c.name}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{c.specialty}</td>
                  <td className="py-3 pr-4" style={{ fontWeight: 700, fontSize: '0.85rem', color: '#EAB308' }}>{c.rating > 0 ? `★ ${c.rating}` : '—'}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{c.sessions}</td>
                  <td className="py-3 pr-4" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0F172A' }}>{c.earnings}</td>
                  <td className="py-3 pr-4"><StatusBadge status={c.status} /></td>
                  <td className="py-3 pr-4">
                    {c.verified
                      ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                      : <XCircle className="w-4 h-4 text-[#94A3B8]" />}
                  </td>
                  <td className="py-3">
                    <button className="p-1.5 text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── ORGANIZATIONS ──────────────────────────────────────────────────────────
  if (activeNav === 'orgs') return (
    <div className="space-y-6">
      <SectionHeader title="Organizations" subtitle="Corporate and institutional accounts" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Orgs', value: '24', bg: '#DBEAFE', ic: '#3B82F6' },
          { label: 'Active', value: '21', bg: '#D1FAE5', ic: '#22C55E' },
          { label: 'Total Employees', value: '3,840', bg: '#FEF9C3', ic: '#EAB308' },
          { label: 'Monthly Revenue', value: '₦784K', bg: '#FCE7F3', ic: '#EC4899' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <Building2 className="w-4.5 h-4.5" style={{ color: s.ic }} />
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Organization Accounts</h3>
          <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-xl hover:bg-[#2563EB] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
            <Plus className="w-3.5 h-3.5" /> Onboard Org
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                {['Organization', 'Contact', 'Email', 'Employees', 'Plan', 'Status', ''].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orgRows.map((o, i) => (
                <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC] transition-colors">
                  <td className="py-3 pr-4" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{o.name}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{o.contact}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{o.email}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{o.employees}</td>
                  <td className="py-3 pr-4">
                    <span className="bg-[#DBEAFE] text-[#1D4ED8] px-2 py-0.5 rounded-md" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{o.plan}</span>
                  </td>
                  <td className="py-3 pr-4"><StatusBadge status={o.status} /></td>
                  <td className="py-3">
                    <button className="text-[#3B82F6] hover:text-[#2563EB]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── REVENUE SUMMARY ─────────────────────────────────────────────────────────
  if (activeNav === 'revenue') return (
    <div className="space-y-6">
      <SectionHeader title="Revenue Summary" subtitle="Financial performance across all streams" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Mar Revenue', value: '₦2.96M', change: '+29.8%', bg: '#DBEAFE', ic: '#3B82F6' },
          { label: 'YTD Revenue', value: '₦13.7M', change: '+22.1%', bg: '#D1FAE5', ic: '#22C55E' },
          { label: 'Avg Session Fee', value: '₦7,800', change: '+6.5%', bg: '#FEF9C3', ic: '#EAB308' },
          { label: 'MRR', value: '₦892K', change: '+18.3%', bg: '#FCE7F3', ic: '#EC4899' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <TrendingUp className="w-4.5 h-4.5" style={{ color: s.ic }} />
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3 text-[#22C55E]" />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#22C55E' }}>{s.change}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[6, 6, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Revenue by Stream</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value" isAnimationActive={false}>
                {pieData.map((e, i) => <Cell key={`cell-${i}`} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2.5 mt-3">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-[#64748B]" style={{ fontSize: '0.82rem' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  // ─── SYSTEM HEALTH ────────────────────────────────────────────────────────────
  if (activeNav === 'system') return (
    <div className="space-y-6">
      <SectionHeader title="System Health" subtitle="Infrastructure monitoring and performance metrics" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {systemMetrics.map(m => (
          <Card key={m.label} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.status === 'warn' ? '#FEF9C3' : '#D1FAE5' }}>
                <Activity className="w-4.5 h-4.5" style={{ color: m.status === 'warn' ? '#EAB308' : '#22C55E' }} />
              </div>
              <span className={`w-2.5 h-2.5 rounded-full mt-1 ${m.status === 'warn' ? 'bg-[#EAB308]' : 'bg-[#22C55E] animate-pulse'}`} />
            </div>
            <p style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{m.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem', fontWeight: 600 }}>{m.label}</p>
            <p className="text-[#94A3B8] mt-0.5" style={{ fontSize: '0.7rem' }}>{m.detail}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>User Growth Trend</h3>
          <button className="flex items-center gap-1.5 text-[#64748B] hover:text-[#3B82F6]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
            <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Users']} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
            <Line type="monotone" dataKey="users" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: '#22C55E', r: 4 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'API Server', status: 'Operational', icon: Server },
          { label: 'Database', status: 'Operational', icon: Database },
          { label: 'CDN / Edge', status: 'Operational', icon: Wifi },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] flex items-center justify-center">
                <s.icon className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{s.label}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[#22C55E]" style={{ fontSize: '0.72rem', fontWeight: 600 }}>{s.status}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // ─── ADMIN MANAGEMENT ───────────────────────────────────────────────────────
  if (activeNav === 'admins') return (
    <div className="space-y-6">
      <SectionHeader title="Admin Management" subtitle="Manage all administrative accounts and permissions" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Admin Accounts</h3>
          <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-xl hover:bg-[#2563EB] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
            <Plus className="w-3.5 h-3.5" /> Create Admin
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                {['Admin', 'Role', 'Email', 'Last Active', 'Status', ''].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminAccounts.map((a, i) => (
                <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC] transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: a.color + '22' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.72rem', color: a.color }}>{a.initials}</span>
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{a.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{a.role}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{a.email}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{a.active}</td>
                  <td className="py-3 pr-4"><StatusBadge status={a.status} /></td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-[#94A3B8] hover:text-[#3B82F6] hover:bg-[#DBEAFE] rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── AUDIT LOG ───────────────────────────────────────────────────────────────
  if (activeNav === 'audit') return (
    <div className="space-y-6">
      <SectionHeader title="Audit Log" subtitle="Complete history of all admin actions and system events" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>All Activity</h3>
          <button className="flex items-center gap-2 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
        <div className="space-y-1">
          {auditLog.map((log, i) => {
            const colorMap: Record<string, string> = {
              approve: '#22C55E', finance: '#3B82F6', remove: '#EF4444',
              resolve: '#22C55E', settings: '#8B5CF6', flag: '#F59E0B',
              report: '#3B82F6', assign: '#EC4899',
            };
            return (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: (colorMap[log.type] || '#94A3B8') + '18' }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: colorMap[log.type] || '#94A3B8' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: '0.875rem', color: '#0F172A' }}>
                    <span style={{ fontWeight: 700 }}>{log.user}</span>{' '}
                    <span className="text-[#64748B]">{log.action}</span>
                  </p>
                  <p className="text-[#94A3B8]" style={{ fontSize: '0.78rem' }}>{log.target}</p>
                </div>
                <span className="text-[#CBD5E1] flex-shrink-0 mt-1" style={{ fontSize: '0.72rem' }}>{log.time}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  // ─── SETTINGS ───────────────────────────────────────────────────────────────
  if (activeNav === 'settings') return (
    <div className="space-y-6">
      <SectionHeader title="Platform Settings" subtitle="Configure core platform behaviour and feature flags" />
      {platformSettings.map(section => (
        <Card key={section.section} className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem' }}>{section.section}</h3>
          <div className="space-y-4">
            {section.settings.map(setting => (
              <div key={setting.key} className="flex items-center justify-between py-3 border-b border-[#F8FAFC] last:border-0">
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{setting.label}</p>
                </div>
                {setting.type === 'toggle' ? (
                  <button
                    onClick={() => setToggleStates(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                    className="flex items-center gap-2 transition-all"
                  >
                    {toggleStates[setting.key]
                      ? <ToggleRight className="w-9 h-9 text-[#22C55E]" />
                      : <ToggleLeft className="w-9 h-9 text-[#CBD5E1]" />}
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: toggleStates[setting.key] ? '#22C55E' : '#94A3B8' }}>
                      {toggleStates[setting.key] ? 'Enabled' : 'Disabled'}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="bg-[#F1F5F9] border border-[#E2E8F0] px-3 py-1.5 rounded-lg" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>
                      {setting.value as string}
                    </span>
                    <button className="p-1.5 text-[#94A3B8] hover:text-[#3B82F6] hover:bg-[#DBEAFE] rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
      <div className="flex justify-end gap-3">
        <button className="px-5 py-2.5 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8FAFC] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
          Reset to Defaults
        </button>
        <button className="px-5 py-2.5 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-colors" style={{ fontSize: '0.875rem', fontWeight: 700 }}>
          Save Changes
        </button>
      </div>
    </div>
  );

  return null;
}