import { useNavigate } from 'react-router';
import { Shield, Users, BookOpen, Star, CheckCircle, ArrowRight, HeartHandshake, Brain, MessageCircle, Building2 } from 'lucide-react';
import { Logo } from '../components/Logo';

const heroImage = 'https://images.unsplash.com/photo-1758273240360-76b908e7582a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjB3ZWxsbmVzcyUyMGNvdW5zZWxpbmclMjB0aGVyYXB5JTIwc2Vzc2lvbnxlbnwxfHx8fDE3NzI4OTY0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080';
const counselorWoman = 'https://images.unsplash.com/photo-1710778044102-56a3a6b69a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBBZnJpY2FuJTIwd29tYW4lMjB0aGVyYXBpc3QlMjBjb3Vuc2Vsb3J8ZW58MXx8fHwxNzcyODk2NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080';
const counselorMan = 'https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBBZnJpY2FuJTIwbWFuJTIwY291bnNlbG9yJTIwcHN5Y2hvbG9naXN0fGVufDF8fHx8MTc3Mjg5NjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080';
const communityImg = 'https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwb3J0JTIwZ3JvdXAlMjBjb21tdW5pdHklMjBtZWV0aW5nJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzcyODk2NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080';
const orgImg = 'https://images.unsplash.com/photo-1745920770891-b46fc1799646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMHByb2Zlc3Npb25hbCUyMG9mZmljZSUyMGNvcnBvcmF0ZSUyMHRlYW18ZW58MXx8fHwxNzcyODk2NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080';
const meditationImg = 'https://images.unsplash.com/photo-1655970580622-4a547789c850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVkaXRhdGlvbiUyMG1pbmRmdWxuZXNzJTIwYW54aWV0eSUyMHJlbGllZnxlbnwxfHx8fDE3NzI4OTY0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

const counselors = [
  { name: 'Dr. Amina Bello', specialization: 'Anxiety & Depression', rating: 4.9, reviews: 128, fee: '₦15,000', img: counselorWoman, badge: 'Top Rated' },
  { name: 'Dr. Chukwudi Eze', specialization: 'Relationship Counseling', rating: 4.8, reviews: 94, fee: '₦12,000', img: counselorMan, badge: 'Verified' },
  { name: 'Dr. Fatima Adeyemi', specialization: 'Trauma & PTSD', rating: 5.0, reviews: 76, fee: '₦18,000', img: meditationImg, badge: 'New' },
];

const communities = [
  { name: 'Anxiety Support Circle', category: 'Anxiety', members: 1240, fee: '₦2,000/mo', color: '#DBEAFE', icon: Brain },
  { name: 'Relationship Healing', category: 'Relationships', members: 890, fee: '₦1,500/mo', color: '#FEF9C3', icon: HeartHandshake },
  { name: 'Academic Stress Relief', category: 'Academic', members: 2100, fee: '₦1,000/mo', color: '#DCFCE7', icon: BookOpen },
  { name: 'Grief & Loss Support', category: 'Grief', members: 450, fee: '₦2,500/mo', color: '#FEE2E2', icon: MessageCircle },
];

const steps = [
  { step: '01', title: 'Create Your Account', desc: 'Sign up as a client, counselor, or organization in minutes.', color: '#DBEAFE' },
  { step: '02', title: 'Find Your Match', desc: 'Browse verified counselors filtered by specialization, location, and fee.', color: '#FEF9C3' },
  { step: '03', title: 'Start Your Journey', desc: 'Pay a consultation fee, book a session, and begin healing.', color: '#DCFCE7' },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#EFF6FF] via-white to-[#FEF9C3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#DBEAFE] text-[#2563EB] text-xs px-3 py-1.5 rounded-full mb-6">
                <Shield size={12} />
                <span style={{ fontWeight: 600 }}>Trusted by 10,000+ Nigerians</span>
              </div>
              <h1
                className="text-[#0F172A] mb-5"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}
              >
                Your Safe Space for{' '}
                <span className="text-[#3B82F6]">Mental Wellness</span>
              </h1>
              <p className="text-[#64748B] mb-8 max-w-lg" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                Connect with verified Nigerian counselors, join supportive communities, and access mental health resources — all in one trusted platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/client')}
                  className="flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-[10px] hover:bg-[#2563EB] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Find a Counselor
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate('/community')}
                  className="flex items-center gap-2 px-6 py-3 bg-[#FACC15] text-[#0F172A] rounded-[10px] hover:bg-[#EAB308] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Join a Community
                </button>
                <button
                  onClick={() => navigate('/organization')}
                  className="flex items-center gap-2 px-6 py-3 border border-[#CBD5E1] text-[#0F172A] rounded-[10px] hover:bg-[#F8FAFC] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <Building2 size={16} />
                  For Organizations
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 mt-10">
                {[
                  { label: 'Verified Counselors', value: '500+' },
                  { label: 'Active Communities', value: '48' },
                  { label: 'Clients Helped', value: '10K+' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[#0F172A]" style={{ fontWeight: 700, fontSize: '1.5rem' }}>{stat.value}</p>
                    <p className="text-[#64748B] text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hero image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img src={heroImage} alt="Mental wellness counseling" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/30 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <CheckCircle size={18} className="text-[#22C55E]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">License Verified</p>
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>All 500+ Counselors</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill="#FACC15" className="text-[#FACC15]" />
                  ))}
                </div>
                <p className="text-xs text-[#64748B]">Average Rating</p>
                <p className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>4.9 / 5.0</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#3B82F6] text-sm mb-2" style={{ fontWeight: 600 }}>SIMPLE & EASY</p>
            <h2 className="text-[#0F172A]" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800 }}>How Rapport Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-px border-t-2 border-dashed border-[#CBD5E1]" />
                )}
                <div
                  className="rounded-2xl p-7"
                  style={{ background: step.color, boxShadow: '0px 6px 20px rgba(15,23,42,0.06)' }}
                >
                  <span className="inline-block text-sm text-[#64748B] mb-4" style={{ fontWeight: 700 }}>{step.step}</span>
                  <h3 className="text-[#0F172A] mb-2" style={{ fontWeight: 700, fontSize: '1.1rem' }}>{step.title}</h3>
                  <p className="text-[#64748B] text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Counselors */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <p className="text-[#3B82F6] text-sm mb-1" style={{ fontWeight: 600 }}>PROFESSIONALS YOU CAN TRUST</p>
              <h2 className="text-[#0F172A]" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800 }}>Featured Counselors</h2>
            </div>
            <button
              onClick={() => navigate('/client')}
              className="flex items-center gap-2 text-[#3B82F6] text-sm hover:underline"
              style={{ fontWeight: 600 }}
            >
              View all counselors <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {counselors.map((c, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                style={{ boxShadow: '0px 6px 20px rgba(15,23,42,0.06)' }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full ${
                    c.badge === 'Top Rated' ? 'bg-[#FACC15] text-[#0F172A]' :
                    c.badge === 'Verified' ? 'bg-[#DBEAFE] text-[#2563EB]' :
                    'bg-[#DCFCE7] text-[#16A34A]'
                  }`} style={{ fontWeight: 600 }}>
                    {c.badge === 'Verified' && <span>✓ </span>}{c.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-[#0F172A]" style={{ fontWeight: 700, fontSize: '1rem' }}>{c.name}</h3>
                  <p className="text-[#64748B] text-sm mb-3">{c.specialization}</p>
                  <div className="flex items-center gap-1 mb-4">
                    <Star size={12} fill="#FACC15" className="text-[#FACC15]" />
                    <span className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>{c.rating}</span>
                    <span className="text-xs text-[#64748B]">({c.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#3B82F6]" style={{ fontWeight: 700 }}>{c.fee}</span>
                    <button
                      onClick={() => navigate('/client')}
                      className="px-4 py-2 bg-[#3B82F6] text-white text-sm rounded-[10px] hover:bg-[#2563EB] transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#3B82F6] text-sm mb-2" style={{ fontWeight: 600 }}>COMMUNITY SUPPORT</p>
              <h2 className="text-[#0F172A] mb-5" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800 }}>
                You're Not Alone — Join a Community
              </h2>
              <p className="text-[#64748B] mb-8" style={{ lineHeight: 1.7 }}>
                Our problem-based communities connect people facing similar challenges, moderated by verified counselors. Access discussion feeds, pinned resources, and monthly live sessions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {communities.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
                      style={{ background: c.color, boxShadow: '0px 4px 12px rgba(15,23,42,0.05)' }}
                    >
                      <Icon size={20} className="text-[#0F172A] mb-2 opacity-70" />
                      <p className="text-[#0F172A] text-sm" style={{ fontWeight: 600 }}>{c.name}</p>
                      <p className="text-[#64748B] text-xs mt-1">{c.members.toLocaleString()} members · {c.fee}</p>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => navigate('/community')}
                className="mt-8 flex items-center gap-2 px-6 py-3 bg-[#FACC15] text-[#0F172A] rounded-[10px] hover:bg-[#EAB308] transition-colors"
                style={{ fontWeight: 600 }}
              >
                Browse All Communities <ArrowRight size={16} />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src={communityImg} alt="Support community" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* For Organizations */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0F172A] to-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src={orgImg} alt="Corporate mental wellness" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[#FACC15] text-sm mb-2" style={{ fontWeight: 600 }}>FOR ORGANIZATIONS</p>
              <h2 className="text-white mb-5" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800 }}>
                Prioritize Your Team's Mental Health
              </h2>
              <p className="text-[#94A3B8] mb-8" style={{ lineHeight: 1.7 }}>
                As an organization, you can browse and hire verified counselors for your employees, creating a healthier, more productive workplace.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Access 500+ verified Nigerian counselors',
                  'Pay a transparent hiring access fee',
                  'Save and compare counselor profiles',
                  'Dedicated organization dashboard',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#E2E8F0] text-sm">
                    <CheckCircle size={16} className="text-[#22C55E] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/organization')}
                className="flex items-center gap-2 px-6 py-3 bg-[#FACC15] text-[#0F172A] rounded-[10px] hover:bg-[#EAB308] transition-colors"
                style={{ fontWeight: 600 }}
              >
                Get Started for Organizations <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators / Testimonials */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#3B82F6] text-sm mb-2" style={{ fontWeight: 600 }}>WHAT PEOPLE SAY</p>
            <h2 className="text-[#0F172A]" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800 }}>
              Stories of Healing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Adaeze O.', role: 'Client', text: 'Rapport connected me with an amazing counselor who truly understood me. The process was so simple and I felt safe from the very first session.', rating: 5 },
              { name: 'Emeka T.', role: 'Client', text: 'The anxiety community on Rapport saved me during my most difficult months. Knowing others understood what I was going through made all the difference.', rating: 5 },
              { name: 'Zainab H.', role: 'HR Manager', text: "We partnered with Rapport for our employees' mental wellness. The counselors are professional, verified, and the platform is incredibly easy to use.", rating: 5 },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6"
                style={{ boxShadow: '0px 6px 20px rgba(15,23,42,0.06)' }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="#FACC15" className="text-[#FACC15]" />
                  ))}
                </div>
                <p className="text-[#0F172A] text-sm mb-4" style={{ lineHeight: 1.7 }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#3B82F6] text-xs" style={{ fontWeight: 700 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>{t.name}</p>
                    <p className="text-xs text-[#64748B]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#3B82F6] to-[#2563EB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText textColor="#FFFFFF" />
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800 }}>
            Start Your Wellness Journey Today
          </h2>
          <p className="text-[#BFDBFE] mb-8" style={{ lineHeight: 1.7 }}>
            Join thousands of Nigerians taking charge of their mental health with verified counselors and supportive communities.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-white text-[#2563EB] rounded-[10px] hover:bg-[#F8FAFC] transition-colors"
              style={{ fontWeight: 700 }}
            >
              Create Free Account
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 border-2 border-white text-white rounded-[10px] hover:bg-white/10 transition-colors"
              style={{ fontWeight: 600 }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
