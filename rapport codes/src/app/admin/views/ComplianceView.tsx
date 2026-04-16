import { useState } from 'react';
import {
  Shield, Clock, CheckCircle2, XCircle, AlertTriangle, Eye,
  Download, Search, Filter, FileText, ChevronRight, RefreshCw,
  History, BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell
} from 'recharts';

interface Props { activeNav: string; }

const COUNSELOR_F = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80&fit=crop';
const COUNSELOR_M = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop';
const COUNSELOR_F2 = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80&fit=crop';

const pendingQueue = [
  { id: 1, name: 'Dr. Amaka Chukwu', specialty: 'Trauma Recovery', submitted: '2 days ago', img: COUNSELOR_F, docs: '3/3', risk: 'Low' },
  { id: 2, name: 'Mr. Segun Adebisi', specialty: 'Addiction Counseling', submitted: '4 days ago', img: COUNSELOR_M, docs: '2/3', risk: 'Medium' },
  { id: 3, name: 'Dr. Ngozi Eze', specialty: 'Grief Counseling', submitted: '5 days ago', img: COUNSELOR_F2, docs: '3/3', risk: 'Low' },
  { id: 4, name: 'Mr. Yusuf Bello', specialty: 'CBT Therapy', submitted: '6 days ago', img: COUNSELOR_M, docs: '1/3', risk: 'High' },
];

const verificationHistory = [
  { name: 'Dr. Chika Obi', spec: 'CBT Therapy', date: 'Mar 1', docs: '3/3', action: 'Approved', by: 'Ifeanyi O.' },
  { name: 'Ms. Fatima Aliyu', spec: 'Family Therapy', date: 'Mar 3', docs: '1/3', action: 'Rejected', by: 'Ifeanyi O.' },
  { name: 'Dr. Chinwe Okafor', spec: 'Child Psychology', date: 'Mar 4', docs: '3/3', action: 'Approved', by: 'Ifeanyi O.' },
  { name: 'Mr. Tunde Adewale', spec: 'Couples Therapy', date: 'Feb 28', docs: '2/3', action: 'Rejected', by: 'Ifeanyi O.' },
  { name: 'Dr. Bola Akintunde', spec: 'Depression', date: 'Feb 25', docs: '3/3', action: 'Approved', by: 'Ifeanyi O.' },
];

const flaggedAccounts = [
  { name: 'Mr. Yusuf Bello', reason: 'Incomplete documentation', severity: 'High', flagged: 'Mar 5', status: 'Under Review' },
  { name: 'Dr. Rashida Musa', reason: 'Expired license submitted', severity: 'High', flagged: 'Mar 3', status: 'Suspended' },
  { name: 'Ms. Joy Okeke', reason: 'Client complaint — multiple', severity: 'Medium', flagged: 'Feb 28', status: 'Under Review' },
];

const complianceData = [
  { month: 'Oct', approved: 22, rejected: 2 },
  { month: 'Nov', approved: 28, rejected: 3 },
  { month: 'Dec', approved: 19, rejected: 1 },
  { month: 'Jan', approved: 31, rejected: 4 },
  { month: 'Feb', approved: 27, rejected: 2 },
  { month: 'Mar', approved: 34, rejected: 3 },
];

const docTypes = [
  { name: 'License/Certificate', value: 45, color: '#3B82F6' },
  { name: 'Degree Certificate', value: 30, color: '#22C55E' },
  { name: 'ID Verification', value: 25, color: '#FACC15' },
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

const RiskBadge = ({ risk }: { risk: string }) => {
  const map: Record<string, string> = {
    Low: 'bg-[#D1FAE5] text-[#166534]',
    Medium: 'bg-[#FEF9C3] text-[#92400E]',
    High: 'bg-[#FEE2E2] text-[#991B1B]',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full ${map[risk]}`} style={{ fontSize: '0.7rem', fontWeight: 700 }}>{risk} Risk</span>
  );
};

// ────────────────────────────────────────────────────────────────────────────

export function ComplianceView({ activeNav }: Props) {
  const [statuses, setStatuses] = useState<Record<number, string>>({});

  const act = (id: number, action: 'approve' | 'reject') =>
    setStatuses(prev => ({ ...prev, [id]: action }));

  // ── OVERVIEW ───────────────────────────────────────────────────────────────
  if (activeNav === 'overview') return (
    <div className="space-y-6">
      <SectionHeader title="Compliance Dashboard" subtitle="Counselor verification and regulatory oversight" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Pending Review', value: '12', bg: '#FEF9C3', ic: '#EAB308', Icon: Clock },
          { label: 'Under Review', value: '5', bg: '#DBEAFE', ic: '#3B82F6', Icon: Eye },
          { label: 'Approved (Month)', value: '34', bg: '#D1FAE5', ic: '#22C55E', Icon: CheckCircle2 },
          { label: 'Rejected (Month)', value: '3', bg: '#FEE2E2', ic: '#EF4444', Icon: XCircle },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <s.Icon className="w-5 h-5" style={{ color: s.ic }} />
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Approval vs. Rejection Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
              <Bar dataKey="approved" fill="#22C55E" radius={[4, 4, 0, 0]} name="Approved" isAnimationActive={false} />
              <Bar dataKey="rejected" fill="#EF4444" radius={[4, 4, 0, 0]} name="Rejected" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Document Submission Types</h3>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={docTypes} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value" isAnimationActive={false}>
                {docTypes.map((e, i) => <Cell key={`cell-${i}`} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {docTypes.map(d => (
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

  // ─── PENDING QUEUE ──────────────────────────────────────────────────────────
  if (activeNav === 'pending') return (
    <div className="space-y-6">
      <SectionHeader title="Pending Queue" subtitle="Counselor applications awaiting first review" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Awaiting Review <span className="ml-2 bg-[#FEF9C3] text-[#92400E] px-2 py-0.5 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{pendingQueue.length}</span></h3>
          <button className="flex items-center gap-1.5 text-[#64748B] hover:text-[#3B82F6]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
        <div className="space-y-4">
          {pendingQueue.map(c => {
            const status = statuses[c.id];
            return (
              <div key={c.id} className={`p-4 rounded-2xl border transition-all ${
                status === 'approve' ? 'bg-[#F0FDF4] border-[#86EFAC]' :
                status === 'reject' ? 'bg-[#FFF5F5] border-[#FCA5A5]' :
                'bg-[#F8FAFC] border-[#E2E8F0]'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <img src={c.img} alt={c.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{c.name}</p>
                      <RiskBadge risk={c.risk} />
                    </div>
                    <p className="text-[#64748B]" style={{ fontSize: '0.82rem' }}>{c.specialty}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>Submitted {c.submitted}</span>
                      <span className={`px-2 py-0.5 rounded-full ${c.docs === '3/3' ? 'bg-[#D1FAE5] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`} style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                        Docs: {c.docs}
                      </span>
                    </div>
                  </div>
                  {!status ? (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="flex items-center gap-1.5 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors" style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        <Eye className="w-3.5 h-3.5" /> View Docs
                      </button>
                      <button onClick={() => act(c.id, 'approve')} className="flex items-center gap-1.5 bg-[#22C55E] text-white px-3 py-2 rounded-xl hover:bg-[#16A34A] transition-colors" style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button onClick={() => act(c.id, 'reject')} className="flex items-center gap-1.5 bg-[#EF4444] text-white px-3 py-2 rounded-xl hover:bg-[#DC2626] transition-colors" style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className={`px-4 py-2 rounded-xl ${status === 'approve' ? 'bg-[#22C55E] text-white' : 'bg-[#EF4444] text-white'}`} style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                      {status === 'approve' ? '✓ Approved' : '✕ Rejected'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  // ─── DOCUMENT REVIEW ─────────────────────────────────────────────────────────
  if (activeNav === 'docs') return (
    <div className="space-y-6">
      <SectionHeader title="Document Review" subtitle="Submitted credentials and verification documents" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Submitted', value: '89', bg: '#DBEAFE', ic: '#3B82F6' },
          { label: 'Complete Sets', value: '67', bg: '#D1FAE5', ic: '#22C55E' },
          { label: 'Incomplete', value: '22', bg: '#FEF9C3', ic: '#EAB308' },
          { label: 'Avg Review Time', value: '2.1 days', bg: '#FCE7F3', ic: '#EC4899' },
        ].map(s => (
          <Card key={s.label} className="p-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <FileText className="w-4.5 h-4.5" style={{ color: s.ic }} />
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Document Submissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                {['Counselor', 'Specialty', 'Submitted', 'Documents', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Dr. Amaka Chukwu', spec: 'Trauma Recovery', date: 'Mar 8', docs: '3/3', status: 'Ready' },
                { name: 'Mr. Segun Adebisi', spec: 'Addiction', date: 'Mar 6', docs: '2/3', status: 'Incomplete' },
                { name: 'Dr. Ngozi Eze', spec: 'Grief Counseling', date: 'Mar 5', docs: '3/3', status: 'Ready' },
                { name: 'Mr. Yusuf Bello', spec: 'CBT Therapy', date: 'Mar 4', docs: '1/3', status: 'Incomplete' },
                { name: 'Dr. Bola Akintunde', spec: 'Depression', date: 'Feb 25', docs: '3/3', status: 'Reviewed' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC]">
                  <td className="py-3 pr-4" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{row.name}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{row.spec}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{row.date}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${row.docs === '3/3' ? 'bg-[#D1FAE5] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>{row.docs}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      row.status === 'Ready' ? 'bg-[#DBEAFE] text-[#1D4ED8]' :
                      row.status === 'Reviewed' ? 'bg-[#D1FAE5] text-[#166534]' :
                      'bg-[#FEE2E2] text-[#991B1B]'
                    }`}>{row.status}</span>
                  </td>
                  <td className="py-3">
                    <button className="text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1" style={{ fontWeight: 600, fontSize: '0.82rem' }}>
                      <Eye className="w-3.5 h-3.5" /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── FLAGGED ACCOUNTS ────────────────────────────────────────────────────────
  if (activeNav === 'flagged') return (
    <div className="space-y-6">
      <SectionHeader title="Flagged Accounts" subtitle="Accounts flagged for compliance violations or suspicious activity" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Flagged Counselors</h3>
          <span className="bg-[#FEE2E2] text-[#991B1B] px-3 py-1 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>
            {flaggedAccounts.length} Active Flags
          </span>
        </div>
        <div className="space-y-4">
          {flaggedAccounts.map((f, i) => (
            <div key={i} className="p-4 bg-[#FFF5F5] border border-[#FCA5A5] rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{f.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${f.severity === 'High' ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#FEF9C3] text-[#92400E]'}`}>{f.severity}</span>
                  </div>
                  <p className="text-[#64748B]" style={{ fontSize: '0.82rem' }}>{f.reason}</p>
                  <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>Flagged: {f.flagged}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'Suspended' ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#FEF9C3] text-[#92400E]'}`}>{f.status}</span>
                  <button className="flex items-center gap-1.5 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                    <Eye className="w-3.5 h-3.5" /> Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // ─── VERIFICATION HISTORY ────────────────────────────────────────────────────
  if (activeNav === 'history') return (
    <div className="space-y-6">
      <SectionHeader title="Verification History" subtitle="Complete record of all compliance decisions" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Decision Log</h3>
          <button className="flex items-center gap-2 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                {['Counselor', 'Specialty', 'Date', 'Documents', 'Decision', 'Reviewed By'].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {verificationHistory.map((v, i) => (
                <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC]">
                  <td className="py-3 pr-4" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{v.name}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{v.spec}</td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{v.date}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v.docs === '3/3' ? 'bg-[#D1FAE5] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>{v.docs}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${v.action === 'Approved' ? 'bg-[#D1FAE5] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>{v.action}</span>
                  </td>
                  <td className="py-3 pr-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{v.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── COMPLIANCE REPORTS ──────────────────────────────────────────────────────
  if (activeNav === 'reports') return (
    <div className="space-y-6">
      <SectionHeader title="Compliance Reports" subtitle="Monthly summaries and regulatory documentation" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Q1 2026 Compliance Summary', date: 'Mar 22, 2026', status: 'Ready', pages: '12 pages' },
          { title: 'Counselor Verification Report — March', date: 'Mar 22, 2026', status: 'Ready', pages: '8 pages' },
          { title: 'Flagged Accounts Report — Q1', date: 'Mar 15, 2026', status: 'Ready', pages: '5 pages' },
        ].map((r, i) => (
          <Card key={i} className="p-5">
            <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center mb-3">
              <BarChart2 className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{r.title}</p>
            <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>{r.date} · {r.pages}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="bg-[#D1FAE5] text-[#166534] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>{r.status}</span>
              <button className="flex items-center gap-1.5 text-[#3B82F6] hover:text-[#2563EB]" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Monthly Compliance Trend</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={complianceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
            <Bar dataKey="approved" fill="#22C55E" radius={[4, 4, 0, 0]} name="Approved" isAnimationActive={false} />
            <Bar dataKey="rejected" fill="#EF4444" radius={[4, 4, 0, 0]} name="Rejected" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  return null;
}