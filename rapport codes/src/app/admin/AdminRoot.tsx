import { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminShell } from './AdminShell';

export type AdminRole = 'super' | 'compliance' | 'finance' | 'community' | 'support';

export interface AdminUser {
  name: string;
  email: string;
  role: AdminRole;
  initials: string;
  lastLogin: string;
}

const CREDENTIALS: Record<string, { password: string; user: AdminUser }> = {
  'admin@rapport.ng': {
    password: 'SuperAdmin2026!',
    user: { name: 'Chukwuemeka Obi', email: 'admin@rapport.ng', role: 'super', initials: 'CO', lastLogin: 'Today, 09:14 AM' },
  },
  'compliance@rapport.ng': {
    password: 'Comply2026!',
    user: { name: 'Ifeanyi Okafor', email: 'compliance@rapport.ng', role: 'compliance', initials: 'IO', lastLogin: 'Today, 08:52 AM' },
  },
  'finance@rapport.ng': {
    password: 'Finance2026!',
    user: { name: 'Sade Martins', email: 'finance@rapport.ng', role: 'finance', initials: 'SM', lastLogin: 'Yesterday, 05:30 PM' },
  },
  'community@rapport.ng': {
    password: 'Community2026!',
    user: { name: 'Kola Adeyemi', email: 'community@rapport.ng', role: 'community', initials: 'KA', lastLogin: 'Today, 10:01 AM' },
  },
  'support@rapport.ng': {
    password: 'Support2026!',
    user: { name: 'Uju Bassey', email: 'support@rapport.ng', role: 'support', initials: 'UB', lastLogin: 'Today, 07:45 AM' },
  },
};

const SESSION_KEY = 'rapport_admin_session_v2';

export function AdminRoot() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setChecked(true);
  }, []);

  const handleLogin = (email: string, password: string): string | null => {
    const record = CREDENTIALS[email.toLowerCase().trim()];
    if (!record) return 'No admin account found with that email.';
    if (record.password !== password) return 'Incorrect password. Please try again.';
    setUser(record.user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(record.user));
    return null;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  if (!checked) return null;
  if (!user) return <AdminLogin onLogin={handleLogin} />;
  return <AdminShell user={user} onLogout={handleLogout} />;
}
