import { useState } from 'react';
import {
  LayoutDashboard, Shield, DollarSign, Users, Headphones,
  Heart, LogOut, Bell, ChevronDown, Menu, X, Settings,
  UserCheck, Building2, TrendingUp, FileText, Activity,
  Clock, AlertTriangle, Flag, BarChart2, MessageSquare,
  Search, RefreshCw, ArrowLeftRight, History, BookOpen,
  ChevronRight
} from 'lucide-react';
import type { AdminRole, AdminUser } from './AdminRoot';
import { SuperAdminView } from './views/SuperAdminView';
import { ComplianceView } from './views/ComplianceView';
import { FinanceView } from './views/FinanceView';
import { CommunityView } from './views/CommunityView';
import { SupportView } from './views/SupportView';

interface AdminShellProps {
  user: AdminUser;
  onLogout: () => void;
}

const ROLE_META: Record<AdminRole, { label: string; color: string; bg: string }> = {
  super: { label: 'Super Admin', color: '#3B82F6', bg: '#DBEAFE' },
  compliance: { label: 'Compliance', color: '#22C55E', bg: '#D1FAE5' },
  finance: { label: 'Finance', color: '#FACC15', bg: '#FEF9C3' },
  community: { label: 'Community Oversight', color: '#EC4899', bg: '#FCE7F3' },
  support: { label: 'Support', color: '#F59E0B', bg: '#FEF3C7' },
};

const NAV_ITEMS: Record<AdminRole, { icon: any; label: string; id: string }[]> = {
  super: [
    { icon: LayoutDashboard, label: 'Platform Overview', id: 'overview' },
    { icon: Users, label: 'User Management', id: 'users' },
    { icon: UserCheck, label: 'Counselors', id: 'counselors' },
    { icon: Building2, label: 'Organizations', id: 'orgs' },
    { icon: TrendingUp, label: 'Revenue Summary', id: 'revenue' },
    { icon: Activity, label: 'System Health', id: 'system' },
    { icon: Shield, label: 'Admin Management', id: 'admins' },
    { icon: FileText, label: 'Audit Log', id: 'audit' },
    { icon: Settings, label: 'Platform Settings', id: 'settings' },
  ],
  compliance: [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'overview' },
    { icon: Clock, label: 'Pending Queue', id: 'pending' },
    { icon: FileText, label: 'Document Review', id: 'docs' },
    { icon: AlertTriangle, label: 'Flagged Accounts', id: 'flagged' },
    { icon: History, label: 'Verification History', id: 'history' },
    { icon: BarChart2, label: 'Compliance Reports', id: 'reports' },
  ],
  finance: [
    { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
    { icon: TrendingUp, label: 'Revenue', id: 'revenue' },
    { icon: DollarSign, label: 'Payouts', id: 'payouts' },
    { icon: RefreshCw, label: 'Subscriptions', id: 'subscriptions' },
    { icon: ArrowLeftRight, label: 'Transactions', id: 'transactions' },
    { icon: BarChart2, label: 'Financial Reports', id: 'reports' },
  ],
  community: [
    { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
    { icon: Users, label: 'Communities', id: 'communities' },
    { icon: Flag, label: 'Flagged Content', id: 'flagged' },
    { icon: UserCheck, label: 'Moderators', id: 'moderators' },
    { icon: BarChart2, label: 'Analytics', id: 'analytics' },
    { icon: BookOpen, label: 'Content Policy', id: 'policy' },
  ],
  support: [
    { icon: Headphones, label: 'Ticket Queue', id: 'tickets' },
    { icon: AlertTriangle, label: 'High Priority', id: 'priority' },
    { icon: Search, label: 'User Lookup', id: 'lookup' },
    { icon: MessageSquare, label: 'Templates', id: 'templates' },
    { icon: Activity, label: 'SLA Tracker', id: 'sla' },
    { icon: BarChart2, label: 'Support Reports', id: 'reports' },
  ],
};

const SWITCH_ROLES: { key: AdminRole; label: string }[] = [
  { key: 'super', label: 'Super Admin' },
  { key: 'compliance', label: 'Compliance' },
  { key: 'finance', label: 'Finance' },
  { key: 'community', label: 'Community' },
  { key: 'support', label: 'Support' },
];

export function AdminShell({ user, onLogout }: AdminShellProps) {
  const [activeRole, setActiveRole] = useState<AdminRole>(user.role);
  const [activeNav, setActiveNav] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const role = ROLE_META[activeRole];
  const navItems = NAV_ITEMS[activeRole];
  const isSuperAdmin = user.role === 'super';

  const handleNavChange = (id: string) => {
    setActiveNav(id);
    setSidebarOpen(false);
  };

  const handleRoleSwitch = (newRole: AdminRole) => {
    setActiveRole(newRole);
    setActiveNav('overview');
    setShowRoleSwitcher(false);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#0A1628] z-50 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
        style={{ width: '260px', flexShrink: 0 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[#1E293B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center shadow-md shadow-blue-500/30">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <div>
              <span className="text-white" style={{ fontSize: '0.95rem', fontWeight: 800 }}>Rapport</span>
              <span className="ml-2 bg-[#FACC15] text-[#0F172A] px-1.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Admin</span>
            </div>
          </div>
          <button className="lg:hidden text-[#475569] hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active role badge */}
        <div className="px-4 py-3 border-b border-[#1E293B]">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background: role.color + '15' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: role.color + '25' }}>
              <span style={{ color: role.color, fontWeight: 800, fontSize: '0.75rem' }}>{activeRole.substring(0, 2).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white truncate" style={{ fontWeight: 700, fontSize: '0.8rem' }}>{role.label}</p>
              <p className="text-[#64748B] truncate" style={{ fontSize: '0.7rem' }}>{user.name}</p>
            </div>
            {isSuperAdmin && (
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className="text-[#64748B] hover:text-white transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showRoleSwitcher ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          {/* Role switcher dropdown */}
          {showRoleSwitcher && isSuperAdmin && (
            <div className="mt-2 bg-[#0F172A] rounded-xl border border-[#1E293B] overflow-hidden">
              <p className="text-[#475569] px-3 py-2" style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>View As Role</p>
              {SWITCH_ROLES.map(r => (
                <button
                  key={r.key}
                  onClick={() => handleRoleSwitch(r.key)}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors hover:bg-[#1E293B] ${activeRole === r.key ? 'text-white' : 'text-[#64748B]'}`}
                  style={{ fontSize: '0.82rem', fontWeight: activeRole === r.key ? 700 : 400 }}
                >
                  {r.label}
                  {activeRole === r.key && <div className="w-1.5 h-1.5 rounded-full" style={{ background: ROLE_META[r.key].color }} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <p className="text-[#374151] px-3 py-2" style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Navigation
          </p>
          {navItems.map(item => {
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left transition-all ${
                  active ? 'text-white' : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#0F172A]/50'
                }`}
                style={{ background: active ? role.color + '20' : 'transparent', fontWeight: active ? 700 : 400, fontSize: '0.85rem' }}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? role.color : undefined }} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5" style={{ color: role.color }} />}
              </button>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="p-3 border-t border-[#1E293B]">
          <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1E293B] flex items-center justify-center flex-shrink-0">
              <span className="text-[#94A3B8]" style={{ fontWeight: 700, fontSize: '0.72rem' }}>{user.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white truncate" style={{ fontWeight: 600, fontSize: '0.78rem' }}>{user.name}</p>
              <p className="text-[#475569] truncate" style={{ fontSize: '0.68rem' }}>Last: {user.lastLogin}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#64748B] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all"
            style={{ fontSize: '0.85rem', fontWeight: 600 }}
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center gap-4 px-4 sm:px-6 sticky top-0 z-30">
          <button className="lg:hidden p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[#94A3B8]" style={{ fontSize: '0.8rem' }}>{role.label}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1]" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
              {navItems.find(n => n.id === activeNav)?.label || 'Overview'}
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm hidden md:block mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search users, tickets, counselors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors"
                style={{ fontSize: '0.82rem' }}
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* System status */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#D1FAE5] rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[#166534]" style={{ fontSize: '0.72rem', fontWeight: 700 }}>All Systems Operational</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-xl relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white" />
              </button>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 hover:bg-[#F1F5F9] rounded-xl transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: role.color }}>
                  <span className="text-white" style={{ fontWeight: 800, fontSize: '0.72rem' }}>{user.initials}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#94A3B8] hidden sm:block transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-[#E2E8F0] shadow-xl z-50">
                  <div className="p-3 border-b border-[#F1F5F9]">
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{user.name}</p>
                    <p className="text-[#64748B]" style={{ fontSize: '0.75rem' }}>{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: role.color + '20', color: role.color }}>
                      {role.label}
                    </span>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] transition-colors" style={{ fontSize: '0.82rem' }}>
                      <Settings className="w-3.5 h-3.5 inline mr-2" />Profile Settings
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 rounded-xl text-[#EF4444] hover:bg-[#FEE2E2]/50 transition-colors"
                      style={{ fontSize: '0.82rem', fontWeight: 600 }}
                    >
                      <LogOut className="w-3.5 h-3.5 inline mr-2" />Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {activeRole === 'super' && <SuperAdminView activeNav={activeNav} />}
          {activeRole === 'compliance' && <ComplianceView activeNav={activeNav} />}
          {activeRole === 'finance' && <FinanceView activeNav={activeNav} />}
          {activeRole === 'community' && <CommunityView activeNav={activeNav} />}
          {activeRole === 'support' && <SupportView activeNav={activeNav} />}
        </main>
      </div>
    </div>
  );
}
