import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Logo } from '../components/Logo';
import { LogOut, Menu, X, Bell, ChevronDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  id: string;
}

interface DashboardLayoutProps {
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  userName: string;
  userRole: string;
  userAvatar?: string;
  children: React.ReactNode;
  notifications?: number;
}

export function DashboardLayout({
  navItems,
  activeTab,
  onTabChange,
  userName,
  userRole,
  userAvatar,
  children,
  notifications = 0,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-[#F1F5F9]">
        <Link to="/">
          <Logo size="md" />
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { onTabChange(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-colors text-sm ${
                isActive
                  ? 'bg-[#DBEAFE] text-[#2563EB]'
                  : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: isActive ? 600 : 400 }}
            >
              <Icon size={16} className={isActive ? 'text-[#3B82F6]' : 'text-[#94A3B8]'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="p-4 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-3 mb-3">
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#3B82F6] text-sm font-semibold">
              {userName.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#0F172A] truncate" style={{ fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {userName}
            </p>
            <p className="text-xs text-[#64748B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{userRole}</p>
          </div>
          <ChevronDown size={14} className="text-[#94A3B8] flex-shrink-0" />
        </div>
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-[10px] text-[#EF4444] hover:bg-[#FEF2F2] transition-colors text-sm"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-[#F1F5F9] flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-white flex flex-col shadow-xl">
            <SidebarContent />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-[#F1F5F9] px-4 sm:px-6 h-14 flex items-center justify-between flex-shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg text-[#64748B] hover:bg-[#F1F5F9]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm text-[#64748B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {new Date().toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-[#F1F5F9] text-[#64748B]">
              <Bell size={18} />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#3B82F6] text-sm font-semibold">
                  {userName.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
