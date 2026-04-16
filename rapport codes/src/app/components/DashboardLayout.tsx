import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Heart, LogOut, Menu, X, Bell, ChevronDown } from 'lucide-react';

interface NavItem {
  icon: any;
  label: string;
  key: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
  userName: string;
  userRole: string;
  userAvatar?: string;
  accentColor?: string;
}

export function DashboardLayout({
  children,
  navItems,
  activeTab,
  onTabChange,
  userName,
  userRole,
  userAvatar,
  accentColor = '#3B82F6',
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-[#E2E8F0] z-40 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
        style={{ width: '260px', flexShrink: 0 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[#E2E8F0]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accentColor }}>
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Rapport</span>
          </Link>
          <button className="lg:hidden text-[#64748B]" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        <div className="px-5 py-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <span style={{ fontWeight: 700, color: accentColor }}>{userName.charAt(0)}</span>
              )}
            </div>
            <div className="min-w-0">
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }} className="truncate">{userName}</p>
              <p className="text-[#64748B]" style={{ fontSize: '0.75rem' }}>{userRole}</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="p-3 flex-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { onTabChange(item.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all text-left ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`}
                style={{
                  background: isActive ? accentColor : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                }}
              >
                <item.icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: '1.1rem', height: '1.1rem' }} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[#E2E8F0]">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#64748B] hover:bg-[#FEE2E2] hover:text-[#EF4444] transition-all"
            style={{ fontWeight: 500, fontSize: '0.9rem' }}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
          <button
            className="lg:hidden p-2 text-[#64748B] hover:text-[#0F172A]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-[#0F172A]" style={{ fontWeight: 700, fontSize: '1.05rem' }}>
              {navItems.find(n => n.key === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#DBEAFE] overflow-hidden flex items-center justify-center">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', color: accentColor }}>{userName.charAt(0)}</span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-[#94A3B8] hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
