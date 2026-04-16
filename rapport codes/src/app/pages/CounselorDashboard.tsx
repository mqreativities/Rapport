import { useState } from 'react';
import {
  Home, User, Upload, BarChart2, DollarSign, Users,
  Settings, TrendingUp, Star, Clock, CheckCircle2,
  AlertCircle, FileText, Plus, ChevronRight, Phone,
  Mail, MapPin, ExternalLink, Edit2, Trash2, Eye,
  Shield, X, Download
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const COUNSELOR_IMG = "https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI5MDM1OTh8MA&ixlib=rb-4.1.0&q=80&w=400";

// Income from consultation access fees + resource sales
const earningsData = [
  { month: 'Oct', accessFees: 42000, resourceSales: 18500 },
  { month: 'Nov', accessFees: 56000, resourceSales: 24000 },
  { month: 'Dec', accessFees: 49000, resourceSales: 21000 },
  { month: 'Jan', accessFees: 73000, resourceSales: 31500 },
  { month: 'Feb', accessFees: 63000, resourceSales: 28000 },
  { month: 'Mar', accessFees: 87500, resourceSales: 38000 },
];

const profileViewsData = [
  { month: 'Oct', views: 180, unlocks: 8 },
  { month: 'Nov', views: 240, unlocks: 11 },
  { month: 'Dec', views: 210, unlocks: 9 },
  { month: 'Jan', views: 320, unlocks: 14 },
  { month: 'Feb', views: 290, unlocks: 12 },
  { month: 'Mar', views: 390, unlocks: 17 },
];

// Clients who paid access fee to unlock this counselor's contact
const clientAccessList = [
  { name: 'Chioma Adeola', date: 'Mar 10, 2026', gender: 'Female', problem: 'Anxiety', status: 'Unlocked' },
  { name: 'Tunde Okonkwo', date: 'Mar 9, 2026', gender: 'Male', problem: 'Stress Management', status: 'Unlocked' },
  { name: 'Blessing Nwosu', date: 'Mar 7, 2026', gender: 'Female', problem: 'Depression', status: 'Unlocked' },
  { name: 'Emeka Chukwu', date: 'Mar 5, 2026', gender: 'Male', problem: 'Anxiety', status: 'Unlocked' },
  { name: 'Ngozi Obi', date: 'Mar 3, 2026', gender: 'Female', problem: 'Grief & Loss', status: 'Unlocked' },
  { name: 'Femi Adeyemi', date: 'Feb 28, 2026', gender: 'Male', problem: 'Relationship Issues', status: 'Unlocked' },
];

const resources = [
  { id: 1, title: 'Anxiety Management Workbook', type: 'PDF', price: '₦3,500', sales: 142, revenue: '₦497,000', status: 'Active', desc: 'A comprehensive CBT-based workbook for daily anxiety management.' },
  { id: 2, title: 'Mindfulness for Beginners', type: 'eBook', price: '₦2,000', sales: 89, revenue: '₦178,000', status: 'Active', desc: 'A step-by-step mindfulness guide for complete beginners.' },
  { id: 3, title: 'CBT Self-Help Toolkit', type: 'PDF', price: '₦5,000', sales: 67, revenue: '₦335,000', status: 'Active', desc: 'Professional CBT worksheets and exercises for self-guided therapy.' },
];

const navItems = [
  { icon: Home, label: 'Overview', key: 'overview' },
  { icon: User, label: 'Profile', key: 'profile' },
  { icon: Upload, label: 'Verification', key: 'verification' },
  { icon: Phone, label: 'Client Access', key: 'clients' },
  { icon: BarChart2, label: 'Analytics', key: 'analytics' },
  { icon: FileText, label: 'Resources', key: 'resources' },
  { icon: DollarSign, label: 'Payouts', key: 'payouts' },
  { icon: Settings, label: 'Settings', key: 'settings' },
];

export function CounselorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [verificationStep] = useState<'pending' | 'uploaded' | 'verified'>('uploaded');
  const [showAddResource, setShowAddResource] = useState(false);
  const [resourceList, setResourceList] = useState(resources);

  // Community tab only visible when admin has assigned this counselor as a manager
  const isCommunityManager = false; // toggled to true by admin assignment
  const visibleNavItems = isCommunityManager
    ? [...navItems.slice(0, 6), { icon: Users, label: 'Community', key: 'community' }, ...navItems.slice(6)]
    : navItems;

  // Resource form
  const [resTitle, setResTitle] = useState('');
  const [resType, setResType] = useState('PDF');
  const [resPrice, setResPrice] = useState('');
  const [resDesc, setResDesc] = useState('');

  const handleAddResource = () => {
    if (!resTitle || !resPrice) return;
    setResourceList(prev => [
      ...prev,
      { id: Date.now(), title: resTitle, type: resType, price: `₦${parseInt(resPrice).toLocaleString()}`, sales: 0, revenue: '₦0', status: 'Active', desc: resDesc },
    ]);
    setResTitle(''); setResPrice(''); setResDesc(''); setResType('PDF');
    setShowAddResource(false);
  };

  return (
    <DashboardLayout
      navItems={visibleNavItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userName="Dr. Adaeze Okonkwo"
      userRole="Counselor"
      userAvatar={COUNSELOR_IMG}
      accentColor="#3B82F6"
    >
      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Welcome */}
          <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] rounded-2xl p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={COUNSELOR_IMG} alt="Profile" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <p className="text-[#BFDBFE]" style={{ fontSize: '0.875rem' }}>Welcome back,</p>
                  <h1 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Dr. Adaeze 👋</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-[#FACC15]" />
                    <span className="text-[#BFDBFE]" style={{ fontSize: '0.8rem' }}>Licence Verified · Profile Live</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>₦125,500</p>
                <p className="text-[#BFDBFE]" style={{ fontSize: '0.8rem' }}>This month's earnings</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Profile Unlocks (Month)', value: '17', icon: Phone, color: '#DBEAFE', iconColor: '#3B82F6', change: '+5 vs last month' },
              { label: 'Total Unlocks (All-time)', value: '71', icon: TrendingUp, color: '#D1FAE5', iconColor: '#22C55E', change: '+17% this year' },
              { label: 'Avg Rating', value: '4.9', icon: Star, color: '#FEF9C3', iconColor: '#EAB308', change: 'Stable' },
              { label: 'Payout Balance', value: '₦87.5k', icon: DollarSign, color: '#FCE7F3', iconColor: '#EC4899', change: 'Pending' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color }}>
                  <s.icon className="w-5 h-5" style={{ color: s.iconColor }} />
                </div>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
                <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
                <p className="text-[#22C55E] mt-0.5" style={{ fontSize: '0.72rem', fontWeight: 600 }}>{s.change}</p>
              </div>
            ))}
          </div>

          {/* Earnings chart */}
          <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
            <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem' }}>Earnings Overview (Access Fees + Resource Sales)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${v/1000}k`} />
                <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, '']} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.85rem' }} />
                <Area type="monotone" dataKey="accessFees" name="Access Fees" stroke="#3B82F6" strokeWidth={2.5} fill="#3B82F6" fillOpacity={0.15} isAnimationActive={false} />
                <Area type="monotone" dataKey="resourceSales" name="Resource Sales" stroke="#22C55E" strokeWidth={2} fill="none" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent client accesses */}
          <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Recent Profile Unlocks</h3>
              <button onClick={() => setActiveTab('clients')} className="text-[#3B82F6] flex items-center gap-1" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {clientAccessList.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <div className="w-9 h-9 bg-[#DBEAFE] rounded-full flex items-center justify-center flex-shrink-0">
                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#3B82F6' }}>{c.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>{c.name}</p>
                    <p className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{c.problem} · {c.gender} · {c.date}</p>
                  </div>
                  <span className="bg-[#D1FAE5] text-[#166534] px-2.5 py-1 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>Access Unlocked</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VERIFICATION */}
      {activeTab === 'verification' && (
        <div className="max-w-2xl space-y-6">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Licence Verification</h1>
            <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Your profile goes live only after admin verification. Upload your credentials below.</p>
          </div>

          {/* Status */}
          <div className={`rounded-2xl p-5 border-2 ${
            verificationStep === 'verified' ? 'bg-[#D1FAE5] border-[#86EFAC]' :
            verificationStep === 'uploaded' ? 'bg-[#FEF9C3] border-[#FDE68A]' :
            'bg-white border-[#E2E8F0]'
          }`}>
            <div className="flex items-center gap-3">
              {verificationStep === 'verified' ? (
                <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
              ) : verificationStep === 'uploaded' ? (
                <Clock className="w-6 h-6 text-[#EAB308]" />
              ) : (
                <AlertCircle className="w-6 h-6 text-[#64748B]" />
              )}
              <div>
                <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>
                  {verificationStep === 'verified' ? 'Verification Complete — Profile is Live' :
                   verificationStep === 'uploaded' ? 'Documents Under Review' :
                   'Verification Required'}
                </p>
                <p className="text-[#64748B]" style={{ fontSize: '0.82rem' }}>
                  {verificationStep === 'verified' ? 'Your licence has been verified. Clients can now discover and unlock your contact details.' :
                   verificationStep === 'uploaded' ? 'Your documents are being reviewed by our Compliance team (2–5 business days). Your profile is not yet live.' :
                   'Upload your professional licence to begin the verification process.'}
                </p>
              </div>
            </div>
          </div>

          {/* Verification flow steps */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0]">
            <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem', marginBottom: '1rem' }}>Verification Process</p>
            <div className="space-y-3">
              {[
                { step: '1', label: 'Upload documents', done: true },
                { step: '2', label: 'Compliance team reviews licence', done: false },
                { step: '3', label: 'Admin approves or rejects', done: false },
                { step: '4', label: 'Profile goes live', done: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? 'bg-[#22C55E]' : 'bg-[#F1F5F9]'}`}>
                    {s.done ? <CheckCircle2 className="w-4 h-4 text-white" /> : <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8' }}>{s.step}</span>}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: s.done ? '#166534' : '#64748B', fontWeight: s.done ? 600 : 400 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upload form */}
          <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] space-y-5">
            <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Required Documents</h3>
            {[
              { label: 'Professional Licence / Certificate', desc: 'Issued by Nigerian Board of Clinical Psychology or equivalent body', uploaded: verificationStep !== 'pending' },
              { label: 'Government-issued ID', desc: 'NIN slip, National Passport, or Driver\'s Licence', uploaded: verificationStep !== 'pending' },
              { label: 'Academic Certificate', desc: 'Bachelor\'s, Master\'s, or Doctorate in Psychology/Counseling', uploaded: false },
            ].map((doc, i) => (
              <div key={i} className="p-4 border border-[#E2E8F0] rounded-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{doc.label}</p>
                    <p className="text-[#64748B] mt-0.5" style={{ fontSize: '0.78rem' }}>{doc.desc}</p>
                  </div>
                  {doc.uploaded ? (
                    <span className="flex items-center gap-1 bg-[#D1FAE5] text-[#166534] px-2.5 py-1 rounded-full flex-shrink-0" style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                      <CheckCircle2 className="w-3 h-3" /> Uploaded
                    </span>
                  ) : (
                    <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-3 py-1.5 rounded-[8px] hover:bg-[#2563EB] transition-colors flex-shrink-0" style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                      <Upload className="w-3.5 h-3.5" /> Upload
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CLIENT ACCESS LIST */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Client Access Purchases</h1>
            <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Clients who have paid the access fee to unlock your contact details</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Unlocks', value: '71', bg: '#DBEAFE', ic: '#3B82F6' },
              { label: 'This Month', value: '17', bg: '#D1FAE5', ic: '#22C55E' },
              { label: 'Access Fee Income (Month)', value: '₦87,500', bg: '#FEF9C3', ic: '#EAB308' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-[0px_4px_16px_rgba(15,23,42,0.06)]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                  <Phone className="w-4 h-4" style={{ color: s.ic }} />
                </div>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
                <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] overflow-hidden">
            <div className="p-6 border-b border-[#F1F5F9]">
              <h3 style={{ fontWeight: 700, color: '#0F172A' }}>All Client Unlocks</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F1F5F9]">
                    {['Client', 'Problem Area', 'Gender', 'Unlock Date', 'Status'].map(h => (
                      <th key={h} className="text-left p-4 text-[#94A3B8]" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clientAccessList.map((c, i) => (
                    <tr key={i} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC]">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-[#DBEAFE] rounded-full flex items-center justify-center flex-shrink-0">
                            <span style={{ fontWeight: 700, fontSize: '0.75rem', color: '#3B82F6' }}>{c.name.charAt(0)}</span>
                          </div>
                          <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{c.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{c.problem}</td>
                      <td className="p-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{c.gender}</td>
                      <td className="p-4 text-[#64748B]" style={{ fontSize: '0.85rem' }}>{c.date}</td>
                      <td className="p-4">
                        <span className="bg-[#D1FAE5] text-[#166534] px-2.5 py-0.5 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Analytics</h1>
            <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Track profile performance, access fee income, and resource sales</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Access Fee Income', value: '₦370,000', change: '+23% vs last quarter' },
              { label: 'Resource Sales Income', value: '₦161,000', change: '+31% vs last quarter' },
              { label: 'Total Profile Unlocks', value: '71', change: '+18% vs last quarter' },
              { label: 'Profile Views', value: '1,630', change: '+45% vs last quarter' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{s.value}</p>
                <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
                <p className="text-[#22C55E] mt-1" style={{ fontSize: '0.7rem', fontWeight: 600 }}>{s.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Monthly Earnings (₦)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${v/1000}k`} />
                  <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, '']} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.85rem' }} />
                  <Bar dataKey="accessFees" name="Access Fees" fill="#3B82F6" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                  <Bar dataKey="resourceSales" name="Resource Sales" fill="#22C55E" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Profile Views vs Unlocks</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={profileViewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.85rem' }} />
                  <Area type="monotone" dataKey="views" name="Profile Views" stroke="#8B5CF6" strokeWidth={2.5} fill="#8B5CF6" fillOpacity={0.12} isAnimationActive={false} />
                  <Area type="monotone" dataKey="unlocks" name="Unlocks" stroke="#3B82F6" strokeWidth={2} fill="none" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* RESOURCES */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Digital Resources</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Upload and manage digital products. Set your own price in . Earn from every sale.</p>
            </div>
            <button
              onClick={() => setShowAddResource(true)}
              className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2.5 rounded-[10px] hover:bg-[#2563EB] transition-colors"
              style={{ fontWeight: 600, fontSize: '0.875rem' }}
            >
              <Plus className="w-4 h-4" /> Upload Resource
            </button>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Products', value: `${resourceList.length}`, bg: '#DBEAFE', ic: '#3B82F6' },
              { label: 'Total Sales', value: `${resourceList.reduce((a, r) => a + r.sales, 0)}`, bg: '#D1FAE5', ic: '#22C55E' },
              { label: 'Total Revenue', value: '₦1,010,000', bg: '#FEF9C3', ic: '#EAB308' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-[0px_4px_16px_rgba(15,23,42,0.06)]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                  <FileText className="w-4 h-4" style={{ color: s.ic }} />
                </div>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
                <p className="text-[#64748B] mt-1" style={{ fontSize: '0.78rem' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {resourceList.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{r.title}</p>
                        <p className="text-[#64748B]" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{r.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button className="p-1.5 text-[#94A3B8] hover:text-[#3B82F6] hover:bg-[#DBEAFE] rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-md" style={{ fontSize: '0.72rem', fontWeight: 600 }}>{r.type}</span>
                      <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>{r.price}</span>
                      <span className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>{r.sales} sales</span>
                      <span style={{ fontWeight: 700, color: '#22C55E', fontSize: '0.85rem' }}>{r.revenue}</span>
                      <span className="bg-[#D1FAE5] text-[#166534] px-2.5 py-1 rounded-full ml-auto" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{r.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAYOUTS */}
      {activeTab === 'payouts' && (
        <div className="max-w-2xl space-y-6">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Payouts</h1>
            <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Your earnings from consultation access fees and resource sales</p>
          </div>

          <div className="bg-[#DBEAFE] border border-[#BFDBFE] rounded-2xl p-4">
            <p style={{ fontWeight: 700, color: '#1D4ED8', fontSize: '0.875rem' }}>How your earnings work</p>
            <p className="text-[#1E40AF]" style={{ fontSize: '0.82rem', marginTop: '0.25rem', lineHeight: 1.6 }}>
              You earn 80% of every consultation access fee paid by clients who unlock your profile. You also earn 80% of every digital resource sale. Rapport retains a 20% platform commission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Available Balance', value: '₦87,500', color: '#DBEAFE', text: '#1D4ED8', action: 'Withdraw' },
              { label: 'Pending (Processing)', value: '₦43,500', color: '#FEF9C3', text: '#92400E', action: null },
              { label: 'Total Earned', value: '₦531,000', color: '#D1FAE5', text: '#166534', action: null },
            ].map((b) => (
              <div key={b.label} className="rounded-2xl p-5 border border-[#E2E8F0]" style={{ background: b.color }}>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{b.value}</p>
                <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>{b.label}</p>
                {b.action && (
                  <button className="mt-3 bg-[#3B82F6] text-white px-3 py-1.5 rounded-[8px] hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    {b.action}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
            <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Bank Account (Payout Settings)</h3>
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between mb-4">
              <div>
                <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>First Bank of Nigeria</p>
                <p className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>•••• •••• •••• 4521 · Dr. Adaeze Okonkwo</p>
              </div>
              <button className="px-3 py-1.5 border border-[#CBD5E1] rounded-[8px] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors" style={{ fontWeight: 600, fontSize: '0.8rem' }}>Change</button>
            </div>

            <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem', marginTop: '1.5rem' }}>Payout History</h3>
            <div className="space-y-3">
              {[
                { date: 'Feb 28, 2026', amount: '₦85,000', status: 'Completed', source: 'Access Fees + Resources' },
                { date: 'Jan 31, 2026', amount: '₦72,000', status: 'Completed', source: 'Access Fees + Resources' },
                { date: 'Dec 31, 2025', amount: '₦68,000', status: 'Completed', source: 'Access Fees + Resources' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl">
                  <div>
                    <span className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>{p.date}</span>
                    <p className="text-[#94A3B8]" style={{ fontSize: '0.72rem' }}>{p.source}</p>
                  </div>
                  <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{p.amount}</span>
                  <span className="bg-[#D1FAE5] text-[#166534] px-2.5 py-0.5 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl space-y-6">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Profile Management</h1>
            <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>This information is displayed on your public profile page</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] space-y-4">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#F1F5F9]">
              <img src={COUNSELOR_IMG} alt="Profile" className="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <p style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>Dr. Adaeze Okonkwo</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Shield className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span className="text-[#22C55E]" style={{ fontSize: '0.75rem', fontWeight: 700 }}>Licence Verified</span>
                </div>
              </div>
              <button className="ml-auto border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                Change Photo
              </button>
            </div>
            {[
              { label: 'Full Name', value: 'Dr. Adaeze Okonkwo' },
              { label: 'Professional Title', value: 'Clinical Psychologist' },
              { label: 'Years of Experience', value: '8' },
              { label: 'Location', value: 'Lagos, Nigeria' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{f.label}</label>
                <input type={f.type || 'text'} defaultValue={f.value} className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.875rem' }} />
                {f.hint && <p className="text-[#94A3B8] mt-1" style={{ fontSize: '0.75rem' }}>{f.hint}</p>}
              </div>
            ))}
            {/* Consultation Access Fee — read-only, set by Super Admin */}
            <div>
              <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Consultation Access Fee</label>
              <div className="flex items-center gap-3 h-12 px-4 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC]">
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>₦5,000</span>
                <span className="ml-auto flex items-center gap-1.5 bg-[#FEF9C3] text-[#92400E] px-2.5 py-1 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                  <Shield className="w-3 h-3" /> Set by Admin
                </span>
              </div>
              <p className="text-[#94A3B8] mt-1" style={{ fontSize: '0.75rem' }}>This fee is set platform-wide by the Super Admin and applies to all counselors.</p>
            </div>
            <div>
              <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Professional Bio</label>
              <textarea rows={4} defaultValue="Dr. Adaeze Okonkwo is a licensed clinical psychologist with over 8 years of experience helping individuals navigate anxiety, depression, and life transitions." className="w-full px-4 py-3 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6] resize-none" style={{ fontSize: '0.875rem' }} />
            </div>
            <div>
              <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Contact Details (Shown to clients who unlock your profile)</label>
              <div className="space-y-3 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                {[
                  { icon: Phone, label: 'Phone Number', placeholder: '+234 803 456 7890' },
                  { icon: Mail, label: 'Email Address', placeholder: 'dr.adaeze@example.ng' },
                  { icon: MapPin, label: 'Office Address', placeholder: '14 Admiralty Way, Lekki Phase 1, Lagos' },
                  { icon: ExternalLink, label: 'External Booking Link', placeholder: 'https://calendly.com/your-name' },
                ].map(f => (
                  <div key={f.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#DBEAFE] rounded-lg flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-4 h-4 text-[#3B82F6]" />
                    </div>
                    <input type="text" placeholder={f.placeholder} className="flex-1 h-10 px-3 rounded-lg border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.82rem' }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <button className="bg-[#3B82F6] text-white px-6 py-3 rounded-[10px] hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 700 }}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMMUNITY */}
      {(activeTab === 'community' || activeTab === 'settings') && (
        <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-[#E2E8F0]">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#DBEAFE] rounded-2xl flex items-center justify-center mx-auto mb-3">
              {activeTab === 'community' ? <Users className="w-6 h-6 text-[#3B82F6]" /> : <Settings className="w-6 h-6 text-[#3B82F6]" />}
            </div>
            <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>
              {activeTab === 'community' ? 'Community Management' : 'Settings'}
            </p>
            <p className="text-[#64748B]" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Content coming soon</p>
          </div>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddResource && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#F1F5F9]">
              <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Upload New Resource</h2>
              <button onClick={() => setShowAddResource(false)} className="p-1.5 text-[#94A3B8] hover:bg-[#F1F5F9] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Title</label>
                <input value={resTitle} onChange={e => setResTitle(e.target.value)} type="text" placeholder="e.g. Anxiety Management Workbook" className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.875rem' }} />
              </div>
              <div>
                <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Description</label>
                <textarea value={resDesc} onChange={e => setResDesc(e.target.value)} rows={3} placeholder="Brief description of this resource..." className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] resize-none" style={{ fontSize: '0.875rem' }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Type</label>
                  <select value={resType} onChange={e => setResType(e.target.value)} className="w-full h-12 px-3 rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] bg-white text-[#0F172A]" style={{ fontSize: '0.875rem' }}>
                    <option>PDF</option>
                    <option>eBook</option>
                    <option>Course</option>
                    <option>Toolkit</option>
                    <option>Audio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Price (₦)</label>
                  <input value={resPrice} onChange={e => setResPrice(e.target.value)} type="number" placeholder="e.g. 3500" className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.875rem' }} />
                </div>
              </div>
              <div className="p-4 border-2 border-dashed border-[#CBD5E1] rounded-xl text-center hover:border-[#3B82F6] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
                <p style={{ fontWeight: 600, color: '#64748B', fontSize: '0.875rem' }}>Click to upload file</p>
                <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>PDF, EPUB, MP3 up to 100MB</p>
              </div>
              <button onClick={handleAddResource} className="w-full py-3 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 700 }}>
                Upload Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}