import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Heart, User, Stethoscope, Building2, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';

type Role = 'client' | 'counselor' | 'organization';

export function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === '/signup';
  const [mode, setMode] = useState<'login' | 'signup'>(isSignup ? 'signup' : 'login');
  const [role, setRole] = useState<Role>('client');
  const [showPass, setShowPass] = useState(false);

  const roles: { key: Role; label: string; desc: string; icon: any }[] = [
    { key: 'client', label: 'Client', desc: 'I need counseling support', icon: User },
    { key: 'counselor', label: 'Counselor', desc: 'I provide counseling services', icon: Stethoscope },
    { key: 'organization', label: 'Organization', desc: 'Hiring counselors for my team', icon: Building2 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'counselor') {
      navigate('/counselor-dashboard');
    } else if (role === 'organization') {
      navigate('/organization');
    } else {
      navigate('/client');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 bg-gradient-to-br from-[#1D4ED8] to-[#0F172A] p-10 text-white">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-16">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Rapport</span>
          </Link>

          <h2 className="text-white" style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '1rem' }}>
            Your mental health journey starts here.
          </h2>
          <p style={{ color: '#93C5FD', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Connect with verified Nigerian counselors, join supportive communities, and access resources — all in one place.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { icon: ShieldCheck, text: '500+ verified counselors' },
            { icon: User, text: '12,000+ clients helped' },
            { icon: Building2, text: 'Trusted by organizations' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <item.icon className="w-4 h-4 text-[#FACC15]" />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>Rapport</span>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#F1F5F9] rounded-xl p-1 mb-8">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg transition-all ${mode === m ? 'bg-white shadow-sm text-[#0F172A]' : 'text-[#64748B]'}`}
                style={{ fontWeight: 600, fontSize: '0.9rem' }}
              >
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-[#64748B] mb-6" style={{ fontSize: '0.9rem' }}>
            {mode === 'login'
              ? 'Sign in to continue your journey'
              : 'Join thousands of Nigerians on Rapport'}
          </p>

          {/* Role selection (signup only) */}
          {mode === 'signup' && (
            <div className="mb-6">
              <label className="block text-[#0F172A] mb-3" style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                I am joining as a...
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setRole(r.key)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      role === r.key
                        ? 'border-[#3B82F6] bg-[#DBEAFE]'
                        : 'border-[#E2E8F0] bg-white hover:border-[#BFDBFE]'
                    }`}
                  >
                    <r.icon className={`w-5 h-5 mx-auto mb-1 ${role === r.key ? 'text-[#3B82F6]' : 'text-[#64748B]'}`} />
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: role === r.key ? '#1D4ED8' : '#0F172A' }}>
                      {r.label}
                    </p>
                    <p style={{ fontSize: '0.65rem', color: '#94A3B8', lineHeight: 1.3 }}>{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ── Individual signup fields (client / counselor) ── */}
            {mode === 'signup' && role !== 'organization' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 500, fontSize: '0.85rem' }}>First Name</label>
                  <input
                    type="text"
                    placeholder="Ada"
                    className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 500, fontSize: '0.85rem' }}>Last Name</label>
                  <input
                    type="text"
                    placeholder="Okonkwo"
                    className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>
            )}

            {/* ── Organization signup fields ── */}
            {mode === 'signup' && role === 'organization' && (
              <>
                {/* Company Name */}
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 500, fontSize: '0.85rem' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corp Ltd."
                    className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                {/* Industry — free text */}
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 500, fontSize: '0.85rem' }}>
                    Industry
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Healthcare, Technology, Finance"
                    className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                {/* Contact Person Name + Role (side by side) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      Contact Person's Name
                    </label>
                    <input
                      type="text"
                      placeholder="Chidi Okafor"
                      className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      Role / Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. HR Manager"
                      className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 500, fontSize: '0.85rem' }}>
                {mode === 'signup' && role === 'organization' ? 'Company Email Address' : 'Email Address'}
              </label>
              <input
                type="email"
                placeholder={mode === 'signup' && role === 'organization' ? 'hr@company.com' : 'you@example.com'}
                className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 500, fontSize: '0.85rem' }}>Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 pr-12 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <a href="#" className="text-[#3B82F6] hover:text-[#2563EB]" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-[#3B82F6] text-white rounded-[10px] hover:bg-[#2563EB] transition-colors mt-2"
              style={{ fontWeight: 700 }}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-[#64748B]" style={{ fontSize: '0.875rem' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#3B82F6] hover:text-[#2563EB]"
              style={{ fontWeight: 600 }}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A]"
              style={{ fontSize: '0.85rem' }}
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
