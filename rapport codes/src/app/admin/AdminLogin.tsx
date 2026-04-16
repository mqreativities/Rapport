import { useState } from 'react';
import { Heart, Lock, Mail, Eye, EyeOff, Shield, AlertCircle, ChevronRight } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => string | null;
}

const DEMO_ACCOUNTS = [
  { role: 'Super Admin', email: 'admin@rapport.ng', pw: 'SuperAdmin2026!', color: '#3B82F6' },
  { role: 'Compliance', email: 'compliance@rapport.ng', pw: 'Comply2026!', color: '#22C55E' },
  { role: 'Finance', email: 'finance@rapport.ng', pw: 'Finance2026!', color: '#FACC15' },
  { role: 'Community', email: 'community@rapport.ng', pw: 'Community2026!', color: '#EC4899' },
  { role: 'Support', email: 'support@rapport.ng', pw: 'Support2026!', color: '#F59E0B' },
];

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const err = onLogin(email, password);
    if (err) setError(err);
    setLoading(false);
  };

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.pw);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#080F1E] flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-gradient-to-br from-[#0F172A] to-[#0A1628] border-r border-[#1E293B] relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#3B82F6]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FACC15]/6 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#3B82F6] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <span className="text-white" style={{ fontSize: '1.15rem', fontWeight: 800 }}>Rapport</span>
              <span className="ml-2 bg-[#FACC15] text-[#0F172A] px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Admin</span>
            </div>
          </div>

          <h2 className="text-white mb-3" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>
            Internal Operations<br />Command Centre
          </h2>
          <p className="text-[#64748B]" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            Secure access for authorized Rapport administrators. Monitor platform health, manage users, review compliance, and oversee all operational functions.
          </p>
        </div>

        {/* Role pills */}
        <div className="relative space-y-3">
          <p className="text-[#475569] mb-4" style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Admin Roles</p>
          {DEMO_ACCOUNTS.map(acc => (
            <div key={acc.role} className="flex items-center gap-3 p-3 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: acc.color + '20' }}>
                <Shield className="w-4 h-4" style={{ color: acc.color }} />
              </div>
              <span className="text-[#94A3B8]" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{acc.role}</span>
              <div className="ml-auto w-2 h-2 rounded-full" style={{ background: acc.color }} />
            </div>
          ))}
        </div>

        <p className="relative text-[#334155]" style={{ fontSize: '0.72rem' }}>
          © 2026 Rapport Mental Health Platform · admin.rapport.com<br />
          Unauthorized access is strictly prohibited and monitored.
        </p>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-[#3B82F6] rounded-xl flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-white" style={{ fontSize: '1.1rem', fontWeight: 800 }}>Rapport</span>
            <span className="bg-[#FACC15] text-[#0F172A] px-2 py-0.5 rounded text-xs font-bold uppercase">Admin</span>
          </div>

          <div className="mb-8">
            <h1 className="text-white mb-1" style={{ fontSize: '1.6rem', fontWeight: 800 }}>Sign In</h1>
            <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>Access is restricted to authorized personnel only.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl p-3 mb-5">
              <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
              <p className="text-[#EF4444]" style={{ fontSize: '0.85rem' }}>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-[#94A3B8] mb-1.5" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@rapport.ng"
                  required
                  className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] transition-colors"
                  style={{ fontSize: '0.875rem' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[#94A3B8] mb-1.5" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-10 pr-11 py-3.5 text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] transition-colors"
                  style={{ fontSize: '0.875rem' }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#64748B]">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
              style={{ fontWeight: 700, fontSize: '0.95rem' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>Sign in to Admin Portal <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B]">
            <p className="text-[#FACC15] mb-3" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Quick Access — Demo Accounts
            </p>
            <div className="space-y-1">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#1E293B] transition-colors text-left group"
                >
                  <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: acc.color + '20' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: acc.color }} />
                  </div>
                  <span className="text-[#94A3B8] group-hover:text-white transition-colors" style={{ fontSize: '0.78rem', fontWeight: 500 }}>
                    <span style={{ color: acc.color, fontWeight: 700 }}>{acc.role}</span> — {acc.email}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
