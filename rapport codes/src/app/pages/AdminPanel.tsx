import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  LayoutDashboard, Shield, DollarSign, Users, HeadphonesIcon,
  Heart, LogOut, Bell, ChevronDown, TrendingUp, UserCheck,
  UserX, AlertTriangle, CheckCircle2, XCircle, Clock,
  BarChart2, Settings, Menu, X, Building2, FileText,
  MessageSquare, Flag, CreditCard, ArrowUpRight, ArrowDownRight,
  Search, Filter, Eye, Trash2, Star
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

type AdminRole = 'super' | 'compliance' | 'finance' | 'community' | 'support';

const revenueData = [
  { month: 'Oct', revenue: 1850000, subs: 125 },
  { month: 'Nov', revenue: 2120000, subs: 148 },
  { month: 'Dec', revenue: 1950000, subs: 137 },
  { month: 'Jan', revenue: 2540000, subs: 182 },
  { month: 'Feb', revenue: 2280000, subs: 167 },
  { month: 'Mar', revenue: 2960000, subs: 214 },
];

const pieData = [
  { name: 'Consultation Fees', value: 58, color: '#3B82F6' },
  { name: 'Subscriptions', value: 27, color: '#FACC15' },
  { name: 'Resources', value: 15, color: '#22C55E' },
];

const COUNSELOR_F1 = "https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI5MDM1OTh8MA&ixlib=rb-4.1.0&q=80&w=400";
const COUNSELOR_M1 = "https://images.unsplash.com/photo-1742569184536-77ff9ae46c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwY291bnNlbG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTAzNTk4fDA&ixlib=rb-4.1.0&q=80&w=400";

const pendingCounselors = [
  { id: 1, name: 'Dr. Amaka Chukwu', specialty: 'Trauma Recovery', submitted: '2 days ago', img: COUNSELOR_F1, status: 'pending' },
  { id: 2, name: 'Mr. Segun Adebisi', specialty: 'Addiction Counseling', submitted: '4 days ago', img: COUNSELOR_M1, status: 'pending' },
  { id: 3, name: 'Dr. Ngozi Eze', specialty: 'Grief Counseling', submitted: '5 days ago', img: COUNSELOR_F1, status: 'reviewing' },
];

const tickets = [
  { id: 'TKT-001', user: 'Amara O.', type: 'Billing Issue', priority: 'High', status: 'Open', date: 'March 7, 2026' },
  { id: 'TKT-002', user: 'Bode T.', type: 'Account Access', priority: 'Medium', status: 'In Progress', date: 'March 6, 2026' },
  { id: 'TKT-003', user: 'Funmi A.', type: 'Counselor Complaint', priority: 'High', status: 'Open', date: 'March 6, 2026' },
  { id: 'TKT-004', user: 'Chidi O.', type: 'Payout Delay', priority: 'Medium', status: 'Resolved', date: 'March 5, 2026' },
];

const communities = [
  { id: 1, name: 'Anxiety Support', members: 1248, moderator: 'Dr. Adaeze Okonkwo', reports: 2, status: 'Active' },
  { id: 2, name: 'Academic Stress', members: 892, moderator: 'Mr. Emeka Nwosu', reports: 0, status: 'Active' },
  { id: 3, name: 'Relationship Issues', members: 2145, moderator: 'Unassigned', reports: 5, status: 'Needs Review' },
  { id: 4, name: 'Grief & Loss', members: 654, moderator: 'Dr. Kemi Adeyemi', reports: 0, status: 'Active' },
];

const adminRoles: { key: AdminRole; label: string; icon: any; color: string }[] = [
  { key: 'super', label: 'Super Admin', icon: LayoutDashboard, color: '#3B82F6' },
  { key: 'compliance', label: 'Compliance', icon: Shield, color: '#22C55E' },
  { key: 'finance', label: 'Finance', icon: DollarSign, color: '#FACC15' },
  { key: 'community', label: 'Community', icon: Users, color: '#EC4899' },
  { key: 'support', label: 'Support', icon: HeadphonesIcon, color: '#F59E0B' },
];

export function AdminPanel() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<AdminRole>('super');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counselorStatus, setCounselorStatus] = useState<Record<number, string>>({});

  const currentRole = adminRoles.find(r => r.key === activeRole)!;

  const handleCounselorAction = (id: number, action: 'approve' | 'reject') => {
    setCounselorStatus(prev => ({ ...prev, [id]: action }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#0F172A] z-40 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
        style={{ width: '260px', flexShrink: 0 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[#1E293B]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <div>
              <span className="text-white" style={{ fontSize: '1rem', fontWeight: 700 }}>Rapport</span>
              <span className="ml-1.5 text-[#FACC15] bg-[#FACC15]/10 px-1.5 py-0.5 rounded text-xs font-bold">ADMIN</span>
            </div>
          </Link>
          <button className="lg:hidden text-[#64748B]" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin info */}
        <div className="px-5 py-4 border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: currentRole.color }}>
              <currentRole.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Admin Portal</p>
              <p className="text-[#64748B]" style={{ fontSize: '0.72rem' }}>{currentRole.label}</p>
            </div>
          </div>
        </div>

        {/* Role selector */}
        <div className="p-3 border-b border-[#1E293B]">
          <p className="text-[#475569] px-2 mb-2" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Switch Role</p>
          {adminRoles.map((role) => (
            <button
              key={role.key}
              onClick={() => { setActiveRole(role.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all text-left ${
                activeRole === role.key ? 'bg-[#1E293B] text-white' : 'text-[#64748B] hover:text-white hover:bg-[#1E293B]/50'
              }`}
              style={{ fontSize: '0.875rem', fontWeight: activeRole === role.key ? 600 : 400 }}
            >
              <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: activeRole === role.key ? role.color : 'transparent' }}>
                <role.icon className="w-3.5 h-3.5" style={{ color: activeRole === role.key ? 'white' : role.color }} />
              </div>
              {role.label}
              {activeRole === role.key && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: role.color }}></span>
              )}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="p-3 mt-auto absolute bottom-0 left-0 right-0">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#64748B] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all"
            style={{ fontSize: '0.875rem' }}
          >
            <LogOut className="w-4 h-4" /> Exit Admin Portal
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 text-[#64748B]" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: currentRole.color }}>
                <currentRole.icon className="w-3.5 h-3.5 text-white" />
              </div>
              <h2 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>{currentRole.label} Dashboard</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: currentRole.color }}>
                <span className="text-white" style={{ fontWeight: 700, fontSize: '0.75rem' }}>A</span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#94A3B8] hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* SUPER ADMIN */}
          {activeRole === 'super' && (
            <div className="space-y-6">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Platform Overview</h1>
                <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Real-time analytics and system management</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users', value: '14,291', change: '+12.4%', up: true, color: '#DBEAFE', iconColor: '#3B82F6', icon: Users },
                  { label: 'Active Counselors', value: '487', change: '+8 this week', up: true, color: '#D1FAE5', iconColor: '#22C55E', icon: UserCheck },
                  { label: 'Monthly Revenue', value: '₦2.96M', change: '+29.8%', up: true, color: '#FEF9C3', iconColor: '#EAB308', icon: TrendingUp },
                  { label: 'Open Tickets', value: '23', change: '-5 today', up: false, color: '#FCE7F3', iconColor: '#EC4899', icon: HeadphonesIcon },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color }}>
                      <s.icon className="w-5 h-5" style={{ color: s.iconColor }} />
                    </div>
                    <p style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
                    <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {s.up ? <ArrowUpRight className="w-3.5 h-3.5 text-[#22C55E]" /> : <ArrowDownRight className="w-3.5 h-3.5 text-[#22C55E]" />}
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#22C55E' }}>{s.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Revenue chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                  <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Revenue Trend</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid key="area-grid" strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis key="area-x" dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <YAxis key="area-y" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₦${v/1000000}M`} />
                      <Tooltip key="area-tooltip" formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} />
                      <Area key="area-series" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2.5} fill="#3B82F6" fillOpacity={0.15} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                  <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Revenue Breakdown</h3>
                  <ResponsiveContainer width="100%" height={130}>
                    <PieChart>
                      <Pie key="pie-series" data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value" isAnimationActive={false}>
                        {pieData.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {pieData.map((d) => (
                      <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }}></span>
                          <span className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{d.name}</span>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Admin accounts */}
              <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Admin Accounts</h3>
                  <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-[10px] hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    + Create Admin
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#F1F5F9]">
                        {['Name', 'Role', 'Email', 'Last Active', 'Status'].map(h => (
                          <th key={h} className="text-left pb-3 text-[#94A3B8]" style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Ifeanyi O.', role: 'Compliance Admin', email: 'ifeanyi@rapport.ng', active: '2 hrs ago', status: 'Active' },
                        { name: 'Sade M.', role: 'Finance Admin', email: 'sade@rapport.ng', active: '1 day ago', status: 'Active' },
                        { name: 'Kola A.', role: 'Community Admin', email: 'kola@rapport.ng', active: '3 hrs ago', status: 'Active' },
                        { name: 'Uju B.', role: 'Support Admin', email: 'uju@rapport.ng', active: '30 min ago', status: 'Active' },
                      ].map((a, i) => (
                        <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#F8FAFC] transition-colors">
                          <td className="py-3" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>{a.name}</td>
                          <td className="py-3 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{a.role}</td>
                          <td className="py-3 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{a.email}</td>
                          <td className="py-3 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{a.active}</td>
                          <td className="py-3">
                            <span className="bg-[#D1FAE5] text-[#166534] px-2.5 py-0.5 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{a.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* COMPLIANCE ADMIN */}
          {activeRole === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Compliance Panel</h1>
                <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Review and verify counselor license applications</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Pending Review', value: '12', color: '#FEF9C3', iconColor: '#EAB308' },
                  { label: 'Under Review', value: '5', color: '#DBEAFE', iconColor: '#3B82F6' },
                  { label: 'Approved (Month)', value: '34', color: '#D1FAE5', iconColor: '#22C55E' },
                  { label: 'Rejected (Month)', value: '3', color: '#FEE2E2', iconColor: '#EF4444' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color }}>
                      <Shield className="w-5 h-5" style={{ color: s.iconColor }} />
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
                    <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Pending counselors */}
              <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Pending Verifications</h3>
                <div className="space-y-4">
                  {pendingCounselors.map((c) => {
                    const status = counselorStatus[c.id] || c.status;
                    return (
                      <div key={c.id} className={`p-4 rounded-xl border transition-colors ${
                        status === 'approve' ? 'bg-[#D1FAE5] border-[#86EFAC]' :
                        status === 'reject' ? 'bg-[#FEE2E2] border-[#FCA5A5]' :
                        'bg-[#F8FAFC] border-[#E2E8F0]'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <img src={c.img} alt={c.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{c.name}</p>
                            <p className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>{c.specialty}</p>
                            <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>Submitted {c.submitted}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button className="flex items-center gap-1.5 border border-[#CBD5E1] px-3 py-2 rounded-[10px] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors" style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                              <Eye className="w-3.5 h-3.5" /> Review Docs
                            </button>
                            {status === 'pending' || status === 'reviewing' ? (
                              <>
                                <button
                                  onClick={() => handleCounselorAction(c.id, 'approve')}
                                  className="flex items-center gap-1.5 bg-[#22C55E] text-white px-3 py-2 rounded-[10px] hover:bg-[#16A34A] transition-colors"
                                  style={{ fontWeight: 600, fontSize: '0.8rem' }}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                                </button>
                                <button
                                  onClick={() => handleCounselorAction(c.id, 'reject')}
                                  className="flex items-center gap-1.5 bg-[#EF4444] text-white px-3 py-2 rounded-[10px] hover:bg-[#DC2626] transition-colors"
                                  style={{ fontWeight: 600, fontSize: '0.8rem' }}
                                >
                                  <XCircle className="w-3.5 h-3.5" /> Reject
                                </button>
                              </>
                            ) : (
                              <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                                status === 'approve' ? 'bg-[#22C55E] text-white' : 'bg-[#EF4444] text-white'
                              }`}>
                                {status === 'approve' ? 'Approved' : 'Rejected'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verification table */}
              <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Verification Status Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#F1F5F9]">
                        {['Counselor', 'Specialty', 'Submitted', 'Documents', 'Status', 'Action'].map(h => (
                          <th key={h} className="text-left pb-3 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Dr. Chika Obi', spec: 'CBT Therapy', date: 'Mar 1', docs: '3/3', status: 'Approved' },
                        { name: 'Mr. Yusuf Bello', spec: 'Addiction', date: 'Mar 3', docs: '2/3', status: 'Pending' },
                        { name: 'Dr. Chinwe O.', spec: 'Child Psychology', date: 'Mar 4', docs: '3/3', status: 'Reviewing' },
                        { name: 'Ms. Fatima A.', spec: 'Family Therapy', date: 'Mar 5', docs: '1/3', status: 'Rejected' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-[#F8FAFC]">
                          <td className="py-3" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{row.name}</td>
                          <td className="py-3 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{row.spec}</td>
                          <td className="py-3 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{row.date}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              row.docs === '3/3' ? 'bg-[#D1FAE5] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'
                            }`}>{row.docs}</span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              row.status === 'Approved' ? 'bg-[#D1FAE5] text-[#166534]' :
                              row.status === 'Pending' ? 'bg-[#FEF9C3] text-[#92400E]' :
                              row.status === 'Reviewing' ? 'bg-[#DBEAFE] text-[#1D4ED8]' :
                              'bg-[#FEE2E2] text-[#991B1B]'
                            }`}>{row.status}</span>
                          </td>
                          <td className="py-3">
                            <button className="text-[#3B82F6] hover:text-[#2563EB]" style={{ fontWeight: 600, fontSize: '0.8rem' }}>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* FINANCE ADMIN */}
          {activeRole === 'finance' && (
            <div className="space-y-6">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Finance Dashboard</h1>
                <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Revenue tracking and payout management</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'March Revenue', value: '₦2.96M', color: '#DBEAFE', iconColor: '#3B82F6', up: '+29.8%' },
                  { label: 'Total Subscriptions', value: '1,842', color: '#D1FAE5', iconColor: '#22C55E', up: '+14.2%' },
                  { label: 'Pending Payouts', value: '₦845K', color: '#FEF9C3', iconColor: '#EAB308', up: '18 counselors' },
                  { label: 'Platform Commission', value: '₦592K', color: '#FCE7F3', iconColor: '#EC4899', up: '20% rate' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color }}>
                      <DollarSign className="w-5 h-5" style={{ color: s.iconColor }} />
                    </div>
                    <p style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
                    <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
                    <p className="text-[#22C55E] mt-0.5" style={{ fontSize: '0.72rem', fontWeight: 600 }}>{s.up}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                  <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Monthly Revenue</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueData}>
                      <CartesianGrid key="bar-grid" strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis key="bar-x" dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <YAxis key="bar-y" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₦${v/1000000}M`} />
                      <Tooltip key="bar-tooltip" contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }} formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} />
                      <Bar key="bar-series" dataKey="revenue" fill="#3B82F6" radius={[6, 6, 0, 0]} isAnimationActive={false} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Pending Payouts</h3>
                    <button className="text-[#3B82F6]" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Approve All</button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { counselor: 'Dr. Adaeze Okonkwo', amount: '₦98,500', sessions: 16 },
                      { counselor: 'Mr. Emeka Nwosu', amount: '₦72,000', sessions: 12 },
                      { counselor: 'Dr. Kemi Adeyemi', amount: '₦115,000', sessions: 19 },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl">
                        <div className="flex-1">
                          <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{p.counselor}</p>
                          <p className="text-[#64748B]" style={{ fontSize: '0.75rem' }}>{p.sessions} sessions</p>
                        </div>
                        <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>{p.amount}</span>
                        <button className="bg-[#22C55E] text-white px-3 py-1.5 rounded-[8px] hover:bg-[#16A34A] transition-colors" style={{ fontWeight: 600, fontSize: '0.78rem' }}>
                          Approve
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subscription tracking */}
              <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Subscription Tracking</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#F1F5F9]">
                        {['Community', 'Members', 'Revenue/Month', 'Status', 'Renewal Rate'].map(h => (
                          <th key={h} className="text-left pb-3 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { community: 'Anxiety Support', members: 1248, revenue: '₦2,496,000', status: 'Active', renewal: '92%' },
                        { community: 'Academic Stress', members: 892, revenue: '₦1,338,000', status: 'Active', renewal: '87%' },
                        { community: 'Relationship Issues', members: 2145, revenue: '₦4,290,000', status: 'Active', renewal: '89%' },
                        { community: 'Grief & Loss', members: 654, revenue: '₦981,000', status: 'Active', renewal: '94%' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-[#F8FAFC]">
                          <td className="py-3" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{row.community}</td>
                          <td className="py-3 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{row.members.toLocaleString()}</td>
                          <td className="py-3" style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{row.revenue}</td>
                          <td className="py-3">
                            <span className="bg-[#D1FAE5] text-[#166534] px-2.5 py-0.5 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{row.status}</span>
                          </td>
                          <td className="py-3" style={{ fontWeight: 700, fontSize: '0.875rem', color: '#22C55E' }}>{row.renewal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* COMMUNITY OVERSIGHT */}
          {activeRole === 'community' && (
            <div className="space-y-6">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Community Oversight</h1>
                <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Manage communities, moderators, and content</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Communities', value: '12', color: '#DBEAFE', iconColor: '#3B82F6' },
                  { label: 'Total Members', value: '4,939', color: '#D1FAE5', iconColor: '#22C55E' },
                  { label: 'Content Reports', value: '7', color: '#FEF9C3', iconColor: '#EAB308' },
                  { label: 'Unmoderated', value: '2', color: '#FEE2E2', iconColor: '#EF4444' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color }}>
                      <Users className="w-5 h-5" style={{ color: s.iconColor }} />
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
                    <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontWeight: 700, color: '#0F172A' }}>All Communities</h3>
                  <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-[10px] hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    + New Community
                  </button>
                </div>
                <div className="space-y-3">
                  {communities.map((c) => (
                    <div key={c.id} className={`p-4 rounded-xl border ${c.status === 'Needs Review' ? 'bg-[#FEF9C3] border-[#FDE68A]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{c.name}</p>
                            {c.reports > 0 && (
                              <span className="flex items-center gap-1 bg-[#FEE2E2] text-[#991B1B] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                                <Flag className="w-3 h-3" /> {c.reports} reports
                              </span>
                            )}
                          </div>
                          <p className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>{c.members.toLocaleString()} members · Moderator: {c.moderator}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            c.status === 'Active' ? 'bg-[#D1FAE5] text-[#166534]' : 'bg-[#FDE68A] text-[#92400E]'
                          }`}>{c.status}</span>
                          <button className="border border-[#CBD5E1] text-[#64748B] px-3 py-1.5 rounded-[8px] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors" style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                            Manage
                          </button>
                          {c.moderator === 'Unassigned' && (
                            <button className="bg-[#EC4899] text-white px-3 py-1.5 rounded-[8px] hover:bg-[#DB2777] transition-colors" style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                              Assign Moderator
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Harmful content */}
              <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Reported Content</h3>
                <div className="space-y-3">
                  {[
                    { community: 'Relationship Issues', reporter: 'Anonymous', content: 'User spreading misinformation about medications', severity: 'High' },
                    { community: 'Relationship Issues', reporter: 'Moderator', content: 'Inappropriate personal contact request in comments', severity: 'Medium' },
                  ].map((r, i) => (
                    <div key={i} className="p-4 bg-[#FEF9C3] rounded-xl border border-[#FDE68A]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-[#EAB308]" />
                            <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{r.community}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              r.severity === 'High' ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#FEF9C3] text-[#92400E]'
                            }`}>{r.severity}</span>
                          </div>
                          <p className="text-[#64748B]" style={{ fontSize: '0.85rem' }}>{r.content}</p>
                          <p className="text-[#94A3B8] mt-1" style={{ fontSize: '0.75rem' }}>Reported by: {r.reporter}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button className="border border-[#CBD5E1] text-[#64748B] px-3 py-1.5 rounded-[8px] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors" style={{ fontWeight: 600, fontSize: '0.78rem' }}>
                            Review
                          </button>
                          <button className="bg-[#EF4444] text-white px-3 py-1.5 rounded-[8px] hover:bg-[#DC2626] transition-colors flex items-center gap-1" style={{ fontWeight: 600, fontSize: '0.78rem' }}>
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUPPORT ADMIN */}
          {activeRole === 'support' && (
            <div className="space-y-6">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Support Panel</h1>
                <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Manage user tickets, disputes, and account issues</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Open Tickets', value: '23', color: '#FEE2E2', iconColor: '#EF4444' },
                  { label: 'In Progress', value: '11', color: '#FEF9C3', iconColor: '#EAB308' },
                  { label: 'Resolved Today', value: '8', color: '#D1FAE5', iconColor: '#22C55E' },
                  { label: 'Avg. Resolution', value: '4.2h', color: '#DBEAFE', iconColor: '#3B82F6' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color }}>
                      <HeadphonesIcon className="w-5 h-5" style={{ color: s.iconColor }} />
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
                    <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Tickets table */}
              <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Support Tickets</h3>
                  <div className="sm:ml-auto flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
                      <input placeholder="Search tickets..." className="h-9 pl-9 pr-3 rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.85rem', width: '180px' }} />
                    </div>
                    <button className="flex items-center gap-1.5 border border-[#CBD5E1] px-3 h-9 rounded-[8px] text-[#64748B] hover:border-[#3B82F6]" style={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      <Filter className="w-3.5 h-3.5" /> Filter
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#F1F5F9]">
                        {['Ticket ID', 'User', 'Type', 'Priority', 'Status', 'Date', 'Action'].map(h => (
                          <th key={h} className="text-left pb-3 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((t, i) => (
                        <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#F8FAFC] transition-colors">
                          <td className="py-3" style={{ fontWeight: 700, fontSize: '0.82rem', color: '#3B82F6' }}>{t.id}</td>
                          <td className="py-3" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{t.user}</td>
                          <td className="py-3 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{t.type}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              t.priority === 'High' ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#FEF9C3] text-[#92400E]'
                            }`}>{t.priority}</span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              t.status === 'Open' ? 'bg-[#FEE2E2] text-[#991B1B]' :
                              t.status === 'In Progress' ? 'bg-[#DBEAFE] text-[#1D4ED8]' :
                              'bg-[#D1FAE5] text-[#166534]'
                            }`}>{t.status}</span>
                          </td>
                          <td className="py-3 text-[#64748B]" style={{ fontSize: '0.82rem' }}>{t.date}</td>
                          <td className="py-3">
                            <button className="text-[#3B82F6] hover:text-[#2563EB]" style={{ fontWeight: 600, fontSize: '0.8rem' }}>Handle</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dispute resolution */}
              <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Open Disputes</h3>
                <div className="space-y-3">
                  {[
                    { id: 'DSP-001', client: 'Amara O.', counselor: 'Dr. Adaeze O.', issue: 'Session not conducted but fee charged', amount: '₦15,000', days: 2 },
                    { id: 'DSP-002', client: 'Tunde O.', counselor: 'Mr. Emeka N.', issue: 'Unprofessional conduct during session', amount: '₦12,000', days: 5 },
                  ].map((d, i) => (
                    <div key={i} className="p-4 bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span style={{ fontWeight: 700, color: '#991B1B', fontSize: '0.85rem' }}>{d.id}</span>
                            <span className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>· {d.days} days old</span>
                          </div>
                          <p style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.9rem' }}>{d.issue}</p>
                          <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{d.client} vs {d.counselor} · {d.amount}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button className="bg-[#3B82F6] text-white px-3 py-1.5 rounded-[8px] hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 600, fontSize: '0.78rem' }}>Resolve</button>
                          <button className="border border-[#CBD5E1] text-[#64748B] px-3 py-1.5 rounded-[8px]" style={{ fontWeight: 600, fontSize: '0.78rem' }}>Escalate</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}