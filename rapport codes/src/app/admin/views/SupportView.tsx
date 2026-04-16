import { useState } from 'react';
import {
  Headphones, AlertTriangle, Search, MessageSquare,
  BarChart2, Clock, CheckCircle2, ArrowUpRight,
  Filter, Download, User, Plus
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line
} from 'recharts';

interface Props { activeNav: string; }

type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Escalated';

const allTickets = [
  { id: 'TKT-001', user: 'Amara Okonkwo', email: 'amara@email.com', type: 'Billing Issue', priority: 'High', status: 'Open' as TicketStatus, date: 'Mar 10, 2026', msg: 'I was charged twice for my subscription this month.' },
  { id: 'TKT-002', user: 'Bode Tunde', email: 'bode@email.com', type: 'Account Access', priority: 'Medium', status: 'In Progress' as TicketStatus, date: 'Mar 9, 2026', msg: 'I cannot log in to my account. Password reset not working.' },
  { id: 'TKT-003', user: 'Funmi Adeyemi', email: 'funmi@email.com', type: 'Counselor Complaint', priority: 'High', status: 'Open' as TicketStatus, date: 'Mar 9, 2026', msg: 'My counselor missed our appointment without notice.' },
  { id: 'TKT-004', user: 'Chidi Obiora', email: 'chidi@email.com', type: 'Payout Delay', priority: 'Medium', status: 'Resolved' as TicketStatus, date: 'Mar 8, 2026', msg: 'Payout has not arrived after 10 business days.' },
  { id: 'TKT-005', user: 'Ngozi Obi', email: 'ngozi@email.com', type: 'Technical Issue', priority: 'Low', status: 'Open' as TicketStatus, date: 'Mar 8, 2026', msg: 'Video sessions not loading on mobile browser.' },
  { id: 'TKT-006', user: 'TechCorp HR', email: 'hr@techcorp.ng', type: 'Org Billing', priority: 'High', status: 'Escalated' as TicketStatus, date: 'Mar 7, 2026', msg: 'Invoice discrepancy for March billing period.' },
  { id: 'TKT-007', user: 'Yinka Fadele', email: 'yinka@email.com', type: 'Data Privacy', priority: 'High', status: 'In Progress' as TicketStatus, date: 'Mar 7, 2026', msg: 'Request for data export under NDPR.' },
];

const templates = [
  { title: 'Billing Confirmation', category: 'Billing', uses: 142 },
  { title: 'Account Access Restored', category: 'Account', uses: 98 },
  { title: 'Counselor Complaint Acknowledged', category: 'Complaints', uses: 76 },
  { title: 'Payout Processed', category: 'Finance', uses: 63 },
  { title: 'Technical Issue — Follow-up', category: 'Technical', uses: 55 },
  { title: 'Escalation Notice', category: 'Escalations', uses: 31 },
];

const ticketVolumeData = [
  { day: 'Mon', open: 12, resolved: 9 },
  { day: 'Tue', open: 8, resolved: 11 },
  { day: 'Wed', open: 15, resolved: 10 },
  { day: 'Thu', open: 6, resolved: 14 },
  { day: 'Fri', open: 10, resolved: 8 },
  { day: 'Sat', open: 4, resolved: 3 },
  { day: 'Sun', open: 2, resolved: 2 },
];

const slaData = [
  { month: 'Oct', target: 95, actual: 91 },
  { month: 'Nov', target: 95, actual: 93 },
  { month: 'Dec', target: 95, actual: 89 },
  { month: 'Jan', target: 95, actual: 94 },
  { month: 'Feb', target: 95, actual: 96 },
  { month: 'Mar', target: 95, actual: 97 },
];

const userLookupResults = [
  { name: 'Amara Okonkwo', email: 'amara@email.com', role: 'Client', joined: 'Jan 12, 2026', tickets: 3, status: 'Active' },
];

// ─── Shared sub-components (defined outside to keep stable identity) ──────────

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

const PriorityBadge = ({ p }: { p: string }) => {
  const map: Record<string, string> = {
    High: 'bg-[#FEE2E2] text-[#991B1B]',
    Medium: 'bg-[#FEF9C3] text-[#92400E]',
    Low: 'bg-[#F1F5F9] text-[#475569]',
  };
  return <span className={`px-2 py-0.5 rounded-full ${map[p]}`} style={{ fontSize: '0.7rem', fontWeight: 700 }}>{p}</span>;
};

const StatusBadge = ({ s }: { s: TicketStatus }) => {
  const map: Record<TicketStatus, string> = {
    Open: 'bg-[#DBEAFE] text-[#1D4ED8]',
    'In Progress': 'bg-[#FEF9C3] text-[#92400E]',
    Resolved: 'bg-[#D1FAE5] text-[#166534]',
    Escalated: 'bg-[#FEE2E2] text-[#991B1B]',
  };
  return <span className={`px-2.5 py-0.5 rounded-full ${map[s]}`} style={{ fontSize: '0.72rem', fontWeight: 700 }}>{s}</span>;
};

// ─────────────────────────────────────────────────────────────────────────────

export function SupportView({ activeNav }: Props) {
  const [ticketStatuses, setTicketStatuses] = useState<Record<string, TicketStatus>>({});
  const [search, setSearch] = useState('');
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResults, setLookupResults] = useState<typeof userLookupResults>([]);
  const [activeTicket, setActiveTicket] = useState<string | null>(null);

  const resolveTicket = (id: string) =>
    setTicketStatuses(prev => ({ ...prev, [id]: 'Resolved' }));

  const escalateTicket = (id: string) =>
    setTicketStatuses(prev => ({ ...prev, [id]: 'Escalated' }));

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupQuery.trim()) setLookupResults(userLookupResults);
    else setLookupResults([]);
  };

  // ─── TICKET QUEUE ────────────────────────────────────────────────────────────
  if (activeNav === 'tickets') return (
    <div className="space-y-6">
      <SectionHeader title="Ticket Queue" subtitle="All incoming support requests" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Open', value: `${allTickets.filter(t => t.status === 'Open').length}`, bg: '#DBEAFE', ic: '#3B82F6' },
          { label: 'In Progress', value: `${allTickets.filter(t => t.status === 'In Progress').length}`, bg: '#FEF9C3', ic: '#EAB308' },
          { label: 'Resolved Today', value: '8', bg: '#D1FAE5', ic: '#22C55E' },
          { label: 'Escalated', value: `${allTickets.filter(t => t.status === 'Escalated').length}`, bg: '#FEE2E2', ic: '#EF4444' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <Headphones className="w-4 h-4" style={{ color: s.ic }} />
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tickets..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#F59E0B] transition-colors"
              style={{ fontSize: '0.85rem' }}
            />
          </div>
          <button className="flex items-center gap-2 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>
        <div className="space-y-2">
          {allTickets
            .filter(t => t.user.toLowerCase().includes(search.toLowerCase()) || t.type.toLowerCase().includes(search.toLowerCase()))
            .map(t => {
              const status = ticketStatuses[t.id] || t.status;
              const isExpanded = activeTicket === t.id;
              return (
                <div key={t.id} className={`rounded-2xl border transition-all ${
                  status === 'Resolved' ? 'border-[#86EFAC] bg-[#F0FDF4]' :
                  status === 'Escalated' ? 'border-[#FCA5A5] bg-[#FFF5F5]' :
                  'border-[#E2E8F0] bg-[#F8FAFC]'
                }`}>
                  <button
                    className="w-full p-4 text-left"
                    onClick={() => setActiveTicket(isExpanded ? null : t.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[#94A3B8]" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{t.id}</span>
                        <PriorityBadge p={t.priority} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>
                          {t.type} <span className="text-[#94A3B8]">—</span> <span className="text-[#64748B]">{t.user}</span>
                        </p>
                        <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>{t.date}</p>
                      </div>
                      <StatusBadge s={status} />
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-[#E2E8F0]">
                      <p className="text-[#64748B] mt-3 mb-4" style={{ fontSize: '0.875rem' }}>"{t.msg}"</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[#94A3B8]" style={{ fontSize: '0.78rem' }}>{t.email}</p>
                        {status !== 'Resolved' && status !== 'Escalated' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => resolveTicket(t.id)}
                              className="flex items-center gap-1.5 bg-[#22C55E] text-white px-3 py-1.5 rounded-xl hover:bg-[#16A34A] transition-colors"
                              style={{ fontSize: '0.8rem', fontWeight: 600 }}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                            </button>
                            <button
                              onClick={() => escalateTicket(t.id)}
                              className="flex items-center gap-1.5 bg-[#EF4444] text-white px-3 py-1.5 rounded-xl hover:bg-[#DC2626] transition-colors"
                              style={{ fontSize: '0.8rem', fontWeight: 600 }}
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" /> Escalate
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );

  // ─── HIGH PRIORITY ───────────────────────────────────────────────────────────
  if (activeNav === 'priority') return (
    <div className="space-y-6">
      <SectionHeader title="High Priority Tickets" subtitle="Urgent issues requiring immediate attention" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>
            Critical Queue
            <span className="ml-2 bg-[#FEE2E2] text-[#991B1B] px-2 py-0.5 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>
              {allTickets.filter(t => t.priority === 'High').length} High Priority
            </span>
          </h3>
        </div>
        <div className="space-y-4">
          {allTickets.filter(t => t.priority === 'High').map(t => {
            const status = ticketStatuses[t.id] || t.status;
            return (
              <div key={t.id} className={`p-4 rounded-2xl border ${status === 'Resolved' ? 'border-[#86EFAC] bg-[#F0FDF4]' : 'border-[#FECACA] bg-[#FFF5F5]'}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{t.type}</p>
                      <span className="text-[#94A3B8]" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{t.id}</span>
                    </div>
                    <p className="text-[#64748B]" style={{ fontSize: '0.82rem' }}>From: {t.user} · {t.date}</p>
                    <p className="text-[#64748B] mt-1" style={{ fontSize: '0.82rem' }}>"{t.msg}"</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge s={status} />
                    {status !== 'Resolved' && (
                      <button
                        onClick={() => resolveTicket(t.id)}
                        className="flex items-center gap-1.5 bg-[#22C55E] text-white px-3 py-2 rounded-xl hover:bg-[#16A34A] transition-colors"
                        style={{ fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  // ─── USER LOOKUP ─────────────────────────────────────────────────────────────
  if (activeNav === 'lookup') return (
    <div className="space-y-6">
      <SectionHeader title="User Lookup" subtitle="Search for any platform user by name or email" />
      <Card className="p-6">
        <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Search User</h3>
        <form onSubmit={handleLookup} className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              value={lookupQuery}
              onChange={e => setLookupQuery(e.target.value)}
              placeholder="Enter name, email, or user ID..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-[#F59E0B] transition-colors"
              style={{ fontSize: '0.875rem' }}
            />
          </div>
          <button
            type="submit"
            className="bg-[#F59E0B] text-white px-5 py-2.5 rounded-xl hover:bg-[#D97706] transition-colors flex-shrink-0"
            style={{ fontWeight: 700, fontSize: '0.875rem' }}
          >
            Search
          </button>
        </form>
        {lookupResults.length > 0 && (
          <div className="space-y-4">
            {lookupResults.map((u, i) => (
              <div key={i} className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
                    <User className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>{u.name}</p>
                    <p className="text-[#64748B]" style={{ fontSize: '0.82rem' }}>{u.email}</p>
                  </div>
                  <span className="ml-auto bg-[#D1FAE5] text-[#166534] px-2.5 py-1 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{u.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Role', value: u.role },
                    { label: 'Joined', value: u.joined },
                    { label: 'Open Tickets', value: String(u.tickets) },
                  ].map(d => (
                    <div key={d.label} className="p-3 bg-white border border-[#F1F5F9] rounded-xl">
                      <p className="text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600 }}>{d.label}</p>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {lookupResults.length === 0 && lookupQuery && (
          <p className="text-center text-[#94A3B8] py-8" style={{ fontSize: '0.875rem' }}>No users found for "{lookupQuery}"</p>
        )}
      </Card>
    </div>
  );

  // ─── TEMPLATES ───────────────────────────────────────────────────────────────
  if (activeNav === 'templates') return (
    <div className="space-y-6">
      <SectionHeader title="Response Templates" subtitle="Pre-written replies for common support scenarios" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Message Templates</h3>
          <button className="flex items-center gap-2 bg-[#F59E0B] text-white px-4 py-2 rounded-xl hover:bg-[#D97706] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
            <Plus className="w-3.5 h-3.5" /> New Template
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {templates.map((t, i) => (
            <div key={i} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl hover:border-[#F59E0B] transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <span className="bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-md" style={{ fontSize: '0.7rem', fontWeight: 600 }}>{t.category}</span>
              </div>
              <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', marginBottom: '0.25rem' }}>{t.title}</p>
              <p className="text-[#94A3B8]" style={{ fontSize: '0.72rem' }}>Used {t.uses} times</p>
              <button className="mt-3 text-[#F59E0B] group-hover:text-[#D97706] opacity-0 group-hover:opacity-100 transition-all" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                Use Template →
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // ─── SLA TRACKER ─────────────────────────────────────────────────────────────
  if (activeNav === 'sla') return (
    <div className="space-y-6">
      <SectionHeader title="SLA Tracker" subtitle="Service Level Agreement performance monitoring" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'First Response Time', value: '1.2 hrs', target: '< 2 hrs' },
          { label: 'Resolution Time', value: '8.4 hrs', target: '< 12 hrs' },
          { label: 'SLA Compliance', value: '97%', target: '> 95%' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#D1FAE5] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#22C55E]" />
              </div>
              <span className="bg-[#D1FAE5] text-[#166534] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>On Track</span>
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
            <p className="text-[#94A3B8] mt-0.5" style={{ fontSize: '0.7rem' }}>Target: {s.target}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>SLA Compliance Trend</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={slaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} domain={[80, 100]} tickFormatter={v => `${v}%`} />
            <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
            <Line type="monotone" dataKey="target" name="Target" stroke="#E2E8F0" strokeWidth={2} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="actual" name="Actual" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: '#22C55E', r: 4 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6">
        <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Weekly Ticket Volume</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={ticketVolumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
            <Bar dataKey="open" name="Opened" fill="#F59E0B" radius={[4, 4, 0, 0]} isAnimationActive={false} />
            <Bar dataKey="resolved" name="Resolved" fill="#22C55E" radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  // ─── REPORTS ─────────────────────────────────────────────────────────────────
  if (activeNav === 'reports') return (
    <div className="space-y-6">
      <SectionHeader title="Support Reports" subtitle="Performance summaries and team analytics" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Weekly Support Summary', date: 'Mar 10–16, 2026', pages: '6 pages' },
          { title: 'Monthly Report — March', date: 'Mar 22, 2026', pages: '10 pages' },
          { title: 'Q1 Support Analysis', date: 'Mar 22, 2026', pages: '18 pages' },
        ].map((r, i) => (
          <Card key={i} className="p-5">
            <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center mb-3">
              <BarChart2 className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{r.title}</p>
            <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>{r.date} · {r.pages}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="bg-[#D1FAE5] text-[#166534] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>Ready</span>
              <button className="flex items-center gap-1.5 text-[#F59E0B] hover:text-[#D97706]" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return null;
}