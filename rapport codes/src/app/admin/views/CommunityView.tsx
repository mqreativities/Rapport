import { useState } from 'react';
import {
  Users, Flag, UserCheck, BarChart2, BookOpen, Eye,
  Plus, Trash2, CheckCircle2, XCircle, Search, Download,
  ArrowUpRight, MessageSquare, Shield
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, AreaChart, Area
} from 'recharts';

interface Props { activeNav: string; }

// ─── Shared sub-components (defined outside to keep stable identity) ─────────

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

const SeverityBadge = ({ sev }: { sev: string }) => {
  const map: Record<string, string> = {
    High: 'bg-[#FEE2E2] text-[#991B1B]',
    Medium: 'bg-[#FEF9C3] text-[#92400E]',
    Low: 'bg-[#F1F5F9] text-[#475569]',
  };
  return <span className={`px-2 py-0.5 rounded-full ${map[sev]}`} style={{ fontSize: '0.7rem', fontWeight: 700 }}>{sev}</span>;
};

// ─────────────────────────────────────────────────────────────────────────────

export function CommunityView({ activeNav }: Props) {
  const [reportStatuses, setReportStatuses] = useState<Record<string, string>>({});

  const communities = [
    { id: 1, name: 'Anxiety Support', members: 1248, posts: 342, moderator: 'Dr. Adaeze Okonkwo', reports: 2, status: 'Active', growth: '+12%' },
    { id: 2, name: 'Academic Stress', members: 892, posts: 218, moderator: 'Mr. Emeka Nwosu', reports: 0, status: 'Active', growth: '+8%' },
    { id: 3, name: 'Relationship Issues', members: 2145, posts: 591, moderator: 'Unassigned', reports: 5, status: 'Needs Review', growth: '+21%' },
    { id: 4, name: 'Grief & Loss', members: 654, posts: 187, moderator: 'Dr. Kemi Adeyemi', reports: 0, status: 'Active', growth: '+4%' },
    { id: 5, name: 'Workplace Burnout', members: 438, posts: 104, moderator: 'Ms. Chisom Okoro', reports: 1, status: 'Active', growth: '+18%' },
    { id: 6, name: 'Addiction Recovery', members: 317, posts: 98, moderator: 'Unassigned', reports: 3, status: 'Needs Review', growth: '+7%' },
  ];

  const flaggedContent = [
    { id: 'RPT-401', community: 'Relationship Issues', type: 'Harmful Advice', user: 'Anonymous', reported: 'Mar 9', severity: 'High', status: 'Pending' },
    { id: 'RPT-399', community: 'Anxiety Support', type: 'Misinformation', user: 'user_44k', reported: 'Mar 8', severity: 'Medium', status: 'Under Review' },
    { id: 'RPT-397', community: 'Addiction Recovery', type: 'Spam', user: 'user_88x', reported: 'Mar 7', severity: 'Low', status: 'Pending' },
    { id: 'RPT-395', community: 'Relationship Issues', type: 'Inappropriate Content', user: 'user_22m', reported: 'Mar 6', severity: 'High', status: 'Removed' },
    { id: 'RPT-390', community: 'Workplace Burnout', type: 'Self-harm Reference', user: 'Anonymous', reported: 'Mar 5', severity: 'High', status: 'Escalated' },
  ];

  const moderators = [
    { name: 'Dr. Adaeze Okonkwo', communities: ['Anxiety Support'], actions: 42, joined: 'Nov 2025', status: 'Active' },
    { name: 'Mr. Emeka Nwosu', communities: ['Academic Stress'], actions: 28, joined: 'Dec 2025', status: 'Active' },
    { name: 'Dr. Kemi Adeyemi', communities: ['Grief & Loss'], actions: 19, joined: 'Jan 2026', status: 'Active' },
    { name: 'Ms. Chisom Okoro', communities: ['Workplace Burnout'], actions: 11, joined: 'Feb 2026', status: 'Active' },
  ];

  const growthData = [
    { month: 'Oct', members: 2840, posts: 680 },
    { month: 'Nov', members: 3120, posts: 810 },
    { month: 'Dec', members: 3480, posts: 920 },
    { month: 'Jan', members: 4010, posts: 1080 },
    { month: 'Feb', members: 4520, posts: 1240 },
    { month: 'Mar', members: 4694, posts: 1540 },
  ];

  const policyItems = [
    { title: 'Community Guidelines', updated: 'Jan 15, 2026', sections: 8, status: 'Active' },
    { title: 'Content Moderation Policy', updated: 'Feb 2, 2026', sections: 12, status: 'Active' },
    { title: 'Crisis Response Protocol', updated: 'Mar 1, 2026', sections: 5, status: 'Active' },
    { title: 'Moderator Code of Conduct', updated: 'Jan 20, 2026', sections: 7, status: 'Active' },
  ];

  // ─── OVERVIEW ───────────────────────────────────────────────────────────────
  if (activeNav === 'overview') return (
    <div className="space-y-6">
      <SectionHeader title="Community Oversight" subtitle="Monitor all mental health support communities" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Communities', value: '12', bg: '#DBEAFE', ic: '#3B82F6', Icon: Users },
          { label: 'Total Members', value: '4,694', bg: '#D1FAE5', ic: '#22C55E', Icon: Users },
          { label: 'Content Reports', value: '7', bg: '#FEF9C3', ic: '#EAB308', Icon: Flag },
          { label: 'Needs Review', value: '2', bg: '#FEE2E2', ic: '#EF4444', Icon: Shield },
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
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Member & Post Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={growthData} isAnimationActive={false}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
              <Area type="monotone" dataKey="members" name="Members" stroke="#EC4899" strokeWidth={2.5} fill="#EC4899" fillOpacity={0.12} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Top Communities by Members</h3>
          <div className="space-y-3">
            {communities.slice(0, 5).map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-[#94A3B8] w-5 text-right flex-shrink-0" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#0F172A' }}>{c.name}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>{c.members.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#EC4899]" style={{ width: `${(c.members / 2145) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  // ─── COMMUNITIES ─────────────────────────────────────────────────────────────
  if (activeNav === 'communities') return (
    <div className="space-y-6">
      <SectionHeader title="All Communities" subtitle="Manage and monitor individual community spaces" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Community List</h3>
          <button className="flex items-center gap-2 bg-[#EC4899] text-white px-4 py-2 rounded-xl hover:bg-[#DB2777] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
            <Plus className="w-3.5 h-3.5" /> New Community
          </button>
        </div>
        <div className="space-y-3">
          {communities.map(c => (
            <div key={c.id} className={`p-4 rounded-2xl border ${c.status === 'Needs Review' ? 'border-[#FCA5A5] bg-[#FFF5F5]' : 'border-[#E2E8F0] bg-[#F8FAFC]'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.status === 'Needs Review' ? '#FEE2E2' : '#FCE7F3' }}>
                  <Users className="w-5 h-5" style={{ color: c.status === 'Needs Review' ? '#EF4444' : '#EC4899' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{c.name}</p>
                    {c.reports > 0 && (
                      <span className="bg-[#FEE2E2] text-[#991B1B] px-1.5 py-0.5 rounded-full" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                        {c.reports} reports
                      </span>
                    )}
                  </div>
                  <p className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>
                    {c.members.toLocaleString()} members · {c.posts} posts · Mod: {c.moderator}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[#22C55E] flex items-center gap-0.5" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                    <ArrowUpRight className="w-3.5 h-3.5" />{c.growth}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full ${c.status === 'Active' ? 'bg-[#D1FAE5] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`} style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                    {c.status}
                  </span>
                  <button className="p-1.5 text-[#94A3B8] hover:text-[#3B82F6] hover:bg-[#DBEAFE] rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // ─── FLAGGED CONTENT ─────────────────────────────────────────────────────────
  if (activeNav === 'flagged') return (
    <div className="space-y-6">
      <SectionHeader title="Flagged Content" subtitle="User-reported posts and content violations" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>
            Content Reports
            <span className="ml-2 bg-[#FEE2E2] text-[#991B1B] px-2 py-0.5 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>
              {flaggedContent.filter(f => f.status === 'Pending').length} Pending
            </span>
          </h3>
          <button className="flex items-center gap-2 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="space-y-3">
          {flaggedContent.map(f => {
            const resolved = reportStatuses[f.id];
            return (
              <div key={f.id} className={`p-4 rounded-2xl border transition-all ${
                resolved === 'remove' ? 'bg-[#FFF5F5] border-[#FCA5A5]' :
                resolved === 'dismiss' ? 'bg-[#F8FAFC] border-[#E2E8F0] opacity-60' :
                f.severity === 'High' ? 'bg-[#FFF5F5] border-[#FECACA]' :
                'bg-[#F8FAFC] border-[#E2E8F0]'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#94A3B8]" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{f.id}</span>
                      <SeverityBadge sev={f.severity} />
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        f.status === 'Removed' ? 'bg-[#FEE2E2] text-[#991B1B]' :
                        f.status === 'Escalated' ? 'bg-[#FCE7F3] text-[#9D174D]' :
                        f.status === 'Under Review' ? 'bg-[#DBEAFE] text-[#1D4ED8]' :
                        'bg-[#FEF9C3] text-[#92400E]'
                      }`}>{resolved ? (resolved === 'remove' ? 'Removed' : 'Dismissed') : f.status}</span>
                    </div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{f.type}</p>
                    <p className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>
                      in <span style={{ fontWeight: 600 }}>{f.community}</span> · by {f.user} · {f.reported}
                    </p>
                  </div>
                  {!resolved && f.status !== 'Removed' && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="flex items-center gap-1.5 border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                      <button
                        onClick={() => setReportStatuses(prev => ({ ...prev, [f.id]: 'remove' }))}
                        className="flex items-center gap-1.5 bg-[#EF4444] text-white px-3 py-2 rounded-xl hover:bg-[#DC2626] transition-colors"
                        style={{ fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                      <button
                        onClick={() => setReportStatuses(prev => ({ ...prev, [f.id]: 'dismiss' }))}
                        className="flex items-center gap-1.5 bg-[#D1FAE5] text-[#166534] px-3 py-2 rounded-xl hover:bg-[#22C55E] hover:text-white transition-colors"
                        style={{ fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  // ─── MODERATORS ──────────────────────────────────────────────────────────────
  if (activeNav === 'moderators') return (
    <div className="space-y-6">
      <SectionHeader title="Community Moderators" subtitle="Manage assigned moderators across all communities" />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Active Moderators</h3>
          <button className="flex items-center gap-2 bg-[#EC4899] text-white px-4 py-2 rounded-xl hover:bg-[#DB2777] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
            <Plus className="w-3.5 h-3.5" /> Assign Moderator
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {moderators.map((m, i) => (
            <div key={i} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FCE7F3] flex items-center justify-center flex-shrink-0">
                  <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#EC4899' }}>{m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{m.name}</p>
                  <p className="text-[#94A3B8]" style={{ fontSize: '0.72rem' }}>Joined {m.joined}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{m.communities.join(', ')}</p>
                  <p className="text-[#94A3B8]" style={{ fontSize: '0.72rem' }}>{m.actions} actions taken</p>
                </div>
                <span className="bg-[#D1FAE5] text-[#166534] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>{m.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-[#FEF9C3] border border-[#FDE68A] rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <Flag className="w-4 h-4 text-[#92400E]" />
            <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#92400E' }}>2 Communities Without Moderators</p>
          </div>
          <p className="text-[#92400E]" style={{ fontSize: '0.82rem' }}>Relationship Issues · Addiction Recovery — please assign moderators promptly.</p>
        </div>
      </Card>
    </div>
  );

  // ─── ANALYTICS ────────────────────────────────────────────────────────────────
  if (activeNav === 'analytics') return (
    <div className="space-y-6">
      <SectionHeader title="Community Analytics" subtitle="Growth, engagement, and health metrics" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Member Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={growthData} isAnimationActive={false}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
              <Line type="monotone" dataKey="members" name="Members" stroke="#EC4899" strokeWidth={2.5} dot={{ fill: '#EC4899', r: 4 }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Post Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={growthData} isAnimationActive={false}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
              <Bar dataKey="posts" name="Posts" fill="#EC4899" radius={[4, 4, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );

  // ─── CONTENT POLICY ───────────────────────────────────────────────────────────
  if (activeNav === 'policy') return (
    <div className="space-y-6">
      <SectionHeader title="Content Policy" subtitle="Platform policies governing community behaviour" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {policyItems.map((p, i) => (
          <Card key={i} className="p-5">
            <div className="w-10 h-10 rounded-xl bg-[#FCE7F3] flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-[#EC4899]" />
            </div>
            <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{p.title}</p>
            <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>Updated {p.updated} · {p.sections} sections</p>
            <div className="flex items-center justify-between mt-4">
              <span className="bg-[#D1FAE5] text-[#166534] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>{p.status}</span>
              <div className="flex items-center gap-2">
                <button className="text-[#3B82F6] hover:text-[#2563EB]" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Edit</button>
                <button className="flex items-center gap-1.5 text-[#64748B] hover:text-[#3B82F6]" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return null;
}