import { Link } from 'react-router';
import {
  ShieldCheck, Users, BookOpen, Star, ArrowRight,
  CheckCircle2, ChevronRight, Brain, Heart, Handshake,
  Phone, FileText, Building2, Sparkles
} from 'lucide-react';

const HERO_IMG = "https://images.unsplash.com/photo-1758273240403-052b3c99f636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjB3ZWxsbmVzcyUyMGNvdW5zZWxpbmclMjBjYWxtfGVufDF8fHx8MTc3MjkwMzU5OHww&ixlib=rb-4.1.0&q=80&w=1080";
const COUNSELOR_F1 = "https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI5MDM1OTh8MA&ixlib=rb-4.1.0&q=80&w=400";
const COUNSELOR_M1 = "https://images.unsplash.com/photo-1742569184536-77ff9ae46c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwY291bnNlbG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTAzNTk4fDA&ixlib=rb-4.1.0&q=80&w=400";
const COUNSELOR_F2 = "https://images.unsplash.com/photo-1616291446004-b89a8453561c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMEFmcmljYW4lMjBmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyOTAzNjAyfDA&ixlib=rb-4.1.0&q=80&w=400";

const counselors = [
  { name: 'Dr. Adaeze Okonkwo', specialty: 'Anxiety & Depression', rating: 4.9, reviews: 128, location: 'Lagos', img: COUNSELOR_F1 },
  { name: 'Mr. Emeka Nwosu', specialty: 'Relationship Counseling', rating: 4.8, reviews: 97, location: 'Abuja', img: COUNSELOR_M1 },
  { name: 'Dr. Kemi Adeyemi', specialty: 'Trauma & Recovery', rating: 4.9, reviews: 214, location: 'Port Harcourt', img: COUNSELOR_F2 },
];

const howItWorks = [
  { step: '01', icon: Users, title: 'Create your account', desc: 'Sign up and tell us what you\'re dealing with. We personalise your counselor matches instantly.' },
  { step: '02', icon: ShieldCheck, title: 'Browse verified counselors', desc: 'Every counselor on Rapport holds a valid Nigerian professional licence — verified by our compliance team before going live.' },
  { step: '03', icon: Phone, title: 'Pay once, get direct contact', desc: 'Pay a small one-time access fee and instantly receive the counselor\'s phone number, email, office address, and external booking link.' },
];

const communities = [
  { name: 'Anxiety Support', members: '1.2k', icon: Brain, color: '#DBEAFE', iconColor: '#3B82F6' },
  { name: 'Academic Stress', members: '892', icon: BookOpen, color: '#FEF9C3', iconColor: '#EAB308' },
  { name: 'Relationship Issues', members: '2.1k', icon: Heart, color: '#FCE7F3', iconColor: '#EC4899' },
  { name: 'Grief & Loss', members: '654', icon: Handshake, color: '#D1FAE5', iconColor: '#22C55E' },
];

const stats = [
  { value: '500+', label: 'Verified Counselors' },
  { value: '12k+', label: 'Clients Helped' },
  { value: '4.8', label: 'Average Rating' },
  { value: '98%', label: 'Satisfaction Rate' },
];

export function Landing() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#DBEAFE] text-[#1D4ED8] px-3 py-1.5 rounded-full mb-6" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                <Sparkles className="w-3.5 h-3.5" />
                Nigeria's #1 Mental Wellness Platform
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15, color: '#0F172A' }} className="mb-5">
                Your Mental Health{' '}
                <span style={{ color: '#3B82F6' }}>Matters.</span>{' '}
                <br />Find the Right{' '}
                <span className="relative inline-block">
                  Counselor
                  <span className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-[#FACC15]"></span>
                </span>
              </h1>

              <p className="text-[#64748B] mb-8" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                Rapport connects you with <strong>verified, licensed Nigerian counselors</strong>. Browse profiles, pay a small access fee, and receive the counselor's direct contact details — no sessions hosted on-platform, just a trusted connection.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  to="/client"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#3B82F6] text-white rounded-[10px] hover:bg-[#2563EB] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Find a Counselor <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/client"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FACC15] text-[#0F172A] rounded-[10px] hover:bg-[#EAB308] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  <Users className="w-4 h-4" /> Join a Community
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-[#64748B]" style={{ fontSize: '0.85rem' }}>
                  <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                  Verified Counselors
                </div>
                <div className="w-1 h-1 bg-[#CBD5E1] rounded-full"></div>
                <div className="flex items-center gap-1.5 text-[#64748B]" style={{ fontSize: '0.85rem' }}>
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
                  Licensed Professionals
                </div>
                <div className="w-1 h-1 bg-[#CBD5E1] rounded-full"></div>
                <div className="flex items-center gap-1.5 text-[#64748B]" style={{ fontSize: '0.85rem' }}>
                  <Star className="w-4 h-4 text-[#FACC15]" fill="#FACC15" />
                  4.8 / 5 avg rating
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:mt-0 mt-4">
              <div className="relative rounded-2xl overflow-hidden" style={{ height: '480px' }}>
                <img
                  src={HERO_IMG}
                  alt="Mental wellness counseling"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#E2E8F0]" style={{ minWidth: '200px' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#DBEAFE] rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0F172A' }}>500+</p>
                    <p className="text-[#64748B]" style={{ fontSize: '0.75rem' }}>Verified Counselors</p>
                  </div>
                </div>
              </div>

              {/* Online badge */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl px-3 py-2 shadow-lg border border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>12 counselors online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[#3B82F6] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <p style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800 }}>{s.value}</p>
                <p className="text-[#BFDBFE]" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#3B82F6]" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>How It Works</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem' }}>
              Find & connect with a counselor in 3 steps
            </h2>
            <p className="text-[#64748B] mt-3 max-w-xl mx-auto" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
              Rapport is a <strong>discovery marketplace</strong> — we don't host sessions. We connect you to the right professional and hand you their verified contact details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <span className="text-[#CBD5E1]" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>{step.step}</span>
                    <div className="w-11 h-11 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                  </div>
                  <h3 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                  <p className="text-[#64748B]" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-[#CBD5E1]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Counselors */}
      <section id="counselors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[#3B82F6]" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our Counselors</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem' }}>
                Meet our verified professionals
              </h2>
            </div>
            <Link
              to="/client"
              className="inline-flex items-center gap-1.5 text-[#3B82F6] hover:text-[#2563EB]"
              style={{ fontWeight: 600, fontSize: '0.9rem' }}
            >
              View all counselors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {counselors.map((c) => (
              <Link key={c.name} to="/counselor/1" className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] hover:shadow-[0px_12px_30px_rgba(15,23,42,0.12)] hover:border-[#BFDBFE] transition-all">
                  <div className="relative h-52 overflow-hidden">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#22C55E' }}>Verified</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem', marginBottom: '0.25rem' }}>{c.name}</h3>
                    <p className="text-[#3B82F6]" style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.75rem' }}>{c.specialty}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-[#FACC15]" fill="#FACC15" />
                        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{c.rating}</span>
                        <span className="text-[#94A3B8]" style={{ fontSize: '0.8rem' }}>({c.reviews})</span>
                      </div>
                      <span className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>📍 {c.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Communities */}
      <section id="communities" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#3B82F6]" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Communities</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem', marginBottom: '1rem' }}>
                You don't have to face it alone
              </h2>
              <p className="text-[#64748B] mb-8" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Join problem-based communities moderated by licensed counselors. Share, learn, and grow with others who understand what you're going through.
              </p>
              <Link
                to="/client"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-[10px] hover:bg-[#2563EB] transition-colors"
                style={{ fontWeight: 600 }}
              >
                Browse Communities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {communities.map((c) => (
                <div key={c.name} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: c.color }}
                  >
                    <c.icon className="w-5 h-5" style={{ color: c.iconColor }} />
                  </div>
                  <h4 style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{c.name}</h4>
                  <p className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>{c.members} members</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Organizations */}
      <section id="organizations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 bg-[#FACC15]/20 text-[#FACC15] px-3 py-1.5 rounded-full mb-5" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                <Building2 className="w-3.5 h-3.5" />
                For Organizations
              </div>
              <h2 className="text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '1rem' }}>
                Invest in your team's mental wellness
              </h2>
              <p className="text-[#94A3B8] mb-8" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Access a curated network of verified counselors for your employees. Improve productivity, reduce burnout, and build a healthier workplace culture.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/organization"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FACC15] text-[#0F172A] rounded-[10px] hover:bg-[#EAB308] transition-colors"
                  style={{ fontWeight: 700 }}
                >
                  Get Started for Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/organization"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white rounded-[10px] hover:bg-white/10 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0 grid grid-cols-1 gap-3 w-full md:w-64">
              {[
                { icon: ShieldCheck, text: 'License-verified counselors' },
                { icon: Phone, text: 'Direct counselor contact details' },
                { icon: FileText, text: 'Usage analytics & reports' },
                { icon: Users, text: 'Bulk hiring access' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <item.icon className="w-4 h-4 text-[#FACC15]" />
                  <span className="text-white" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
            Ready to take the first step?
          </h2>
          <p className="text-[#64748B] mb-8" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
            Join thousands of Nigerians who have found support, clarity, and healing through Rapport.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3B82F6] text-white rounded-[10px] hover:bg-[#2563EB] transition-colors"
              style={{ fontWeight: 700, fontSize: '1rem' }}
            >
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/client"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#3B82F6] text-[#3B82F6] rounded-[10px] hover:bg-[#DBEAFE] transition-colors"
              style={{ fontWeight: 600, fontSize: '1rem' }}
            >
              Browse Counselors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}