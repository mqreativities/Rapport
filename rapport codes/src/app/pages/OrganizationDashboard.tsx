import { useState } from 'react';
import {
  Home, Search, BookmarkCheck, User, Settings,
  Star, ShieldCheck, MapPin, Users, Bookmark,
  Building2, TrendingUp, CreditCard,
  Phone, Mail, ExternalLink, ChevronRight, Lock,
  CheckCircle2, X, MapPinned, Download, Plus, Filter
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const COUNSELOR_F1 = "https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI5MDM1OTh8MA&ixlib=rb-4.1.0&q=80&w=400";
const COUNSELOR_M1 = "https://images.unsplash.com/photo-1742569184536-77ff9ae46c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwY291bnNlbG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTAzNTk4fDA&ixlib=rb-4.1.0&q=80&w=400";
const COUNSELOR_F2 = "https://images.unsplash.com/photo-1616291446004-b89a8453561c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMEFmcmljYW4lMjBmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyOTAzNjAyfDA&ixlib=rb-4.1.0&q=80&w=400";
const COUNSELOR_M2 = "https://images.unsplash.com/photo-1604783020105-a1c1a856a55d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFsZSUyMHByb2Zlc3Npb25hbCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTAzNjAyfDA&ixlib=rb-4.1.0&q=80&w=400";

const allCounselors = [
  { id: '1', name: 'Dr. Adaeze Okonkwo', specialty: 'Anxiety & Depression', rating: 4.9, reviews: 128, location: 'Lagos', hiringFee: '₦25,000', img: COUNSELOR_F1,
    phone: '+234 803 456 7890', email: 'dr.adaeze@clinicalpsych.ng', office: '14 Admiralty Way, Lekki Phase 1, Lagos', bookingLink: 'https://calendly.com/dr-adaeze' },
  { id: '2', name: 'Mr. Emeka Nwosu', specialty: 'Relationship & Team Dynamics', rating: 4.8, reviews: 97, location: 'Abuja', hiringFee: '₦20,000', img: COUNSELOR_M1,
    phone: '+234 807 234 5678', email: 'emeka.nwosu@counseling.ng', office: 'Suite 4B, Wuse Zone 5, Abuja', bookingLink: 'https://calendly.com/emeka-nwosu' },
  { id: '3', name: 'Dr. Kemi Adeyemi', specialty: 'Workplace Burnout & Stress', rating: 4.9, reviews: 214, location: 'Port Harcourt', hiringFee: '₦28,000', img: COUNSELOR_F2,
    phone: '+234 809 876 5432', email: 'kemi.adeyemi@wellnesshub.ng', office: '7 Stadium Road, Port Harcourt', bookingLink: 'https://calendly.com/kemi-adeyemi' },
  { id: '4', name: 'Dr. Chidi Okafor', specialty: 'Academic Stress & Career', rating: 4.7, reviews: 81, location: 'Enugu', hiringFee: '₦18,000', img: COUNSELOR_M2,
    phone: '+234 806 543 2100', email: 'chidi.okafor@counselors.ng', office: '22 Independence Layout, Enugu', bookingLink: 'https://calendly.com/chidi-okafor' },
];

const specializations = ['All', 'Anxiety', 'Relationship', 'Burnout', 'Career', 'Depression', 'Trauma'];
const locations = ['All Locations', 'Lagos', 'Abuja', 'Port Harcourt', 'Enugu', 'Ibadan'];

const navItems = [
  { icon: Home, label: 'Overview', key: 'overview' },
  { icon: Search, label: 'Find Counselors', key: 'counselors' },
  { icon: Phone, label: 'Hired Counselors', key: 'hired' },
  { icon: BookmarkCheck, label: 'Shortlist', key: 'saved' },
  { icon: Building2, label: 'Org Profile', key: 'profile' },
  { icon: Settings, label: 'Settings', key: 'settings' },
];

export function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [savedList, setSavedList] = useState<string[]>(['1', '2']);
  const [hiredList, setHiredList] = useState<string[]>(['1', '2']);
  const [specFilter, setSpecFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [search, setSearch] = useState('');
  const [expandedHired, setExpandedHired] = useState<string | null>(null);

  // Payment modal
  const [payModal, setPayModal] = useState<typeof allCounselors[0] | null>(null);
  const [payStep, setPayStep] = useState<'details' | 'confirm' | 'success'>('details');

  const toggleSave = (id: string) => {
    setSavedList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const openPayModal = (counselor: typeof allCounselors[0]) => {
    setPayModal(counselor);
    setPayStep('details');
  };

  const handleConfirm = () => setPayStep('confirm');

  const handleFinalPay = () => {
    setPayStep('success');
    setTimeout(() => {
      if (payModal) setHiredList(prev => [...prev, payModal.id]);
      setPayModal(null);
      setPayStep('details');
      setActiveTab('hired');
    }, 1800);
  };

  const filteredCounselors = allCounselors.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specFilter === 'All' || c.specialty.toLowerCase().includes(specFilter.toLowerCase());
    const matchLoc = locationFilter === 'All Locations' || c.location === locationFilter;
    return matchSearch && matchSpec && matchLoc;
  });

  const hiredCounselors = allCounselors.filter(c => hiredList.includes(c.id));

  return (
    <>
      <DashboardLayout
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="TechCorp Nigeria Ltd."
        userRole="Organization Account"
        accentColor="#1D4ED8"
      >
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] rounded-2xl p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[#BFDBFE]" style={{ fontSize: '0.875rem' }}>Welcome back,</p>
                  <h1 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 800 }}>TechCorp Nigeria 👋</h1>
                  <p className="text-[#BFDBFE] mt-1" style={{ fontSize: '0.875rem' }}>Invest in your team's mental wellness</p>
                </div>
                <button
                  onClick={() => setActiveTab('counselors')}
                  className="inline-flex items-center gap-2 bg-[#FACC15] text-[#0F172A] px-5 py-2.5 rounded-[10px] hover:bg-[#EAB308] transition-colors flex-shrink-0"
                  style={{ fontWeight: 700, fontSize: '0.875rem' }}
                >
                  <Search className="w-4 h-4" /> Find Counselors
                </button>
              </div>
            </div>

            {/* Info banner */}
            <div className="bg-[#DBEAFE] border border-[#BFDBFE] rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontWeight: 700, color: '#1D4ED8', fontSize: '0.9rem' }}>How Rapport Works for Organizations</p>
                  <p className="text-[#1E40AF]" style={{ fontSize: '0.82rem', lineHeight: 1.6, marginTop: '0.25rem' }}>
                    Pay a one-time <strong>Hiring Access Fee</strong> per counselor to unlock their verified contact details. You then reach out to them directly to arrange employee counseling sessions. Rapport does not facilitate or host the sessions.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Counselors Hired', value: `${hiredList.length}`, icon: Users, color: '#DBEAFE', iconColor: '#3B82F6' },
                { label: 'On Shortlist', value: `${savedList.length}`, icon: BookmarkCheck, color: '#FEF9C3', iconColor: '#EAB308' },
                { label: 'Total Access Fees', value: '₦45,000', icon: CreditCard, color: '#FCE7F3', iconColor: '#EC4899' },
                { label: 'Total Counselors', value: `${allCounselors.length}`, icon: ShieldCheck, color: '#D1FAE5', iconColor: '#22C55E' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color }}>
                    <s.icon className="w-5 h-5" style={{ color: s.iconColor }} />
                  </div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</p>
                  <p className="text-[#64748B] mt-1" style={{ fontSize: '0.8rem' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Hired counselors quick view */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Hired Counselors</h3>
                <button onClick={() => setActiveTab('hired')} className="text-[#3B82F6] flex items-center gap-1" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {hiredCounselors.slice(0, 2).map((c) => (
                  <div key={c.id} className="flex items-center gap-4 p-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl">
                    <img src={c.img} alt={c.name} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }} className="truncate">{c.name}</p>
                      <p className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{c.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 text-[#FACC15]" fill="#FACC15" />
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{c.rating}</span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Wellness insight */}
            <div className="bg-[#DBEAFE] rounded-2xl p-5 border border-[#BFDBFE]">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontWeight: 700, color: '#1D4ED8', fontSize: '0.9rem' }}>Wellness Insight</p>
                  <p className="text-[#1E40AF]" style={{ fontSize: '0.85rem', lineHeight: 1.6, marginTop: '0.25rem' }}>
                    Organizations that invest in employee mental health see a 4:1 ROI through reduced absenteeism and increased productivity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FIND COUNSELORS */}
        {activeTab === 'counselors' && (
          <div className="space-y-6">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Browse Verified Counselors</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Pay a hiring access fee to unlock a counselor's contact details for your team</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-[0px_6px_20px_rgba(15,23,42,0.06)]">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name or specialization..."
                    className="w-full h-12 pl-10 pr-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                    style={{ fontSize: '0.875rem' }}
                  />
                </div>
                <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="h-12 px-3 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.875rem' }}>
                  {locations.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {specializations.map(s => (
                  <button key={s} onClick={() => setSpecFilter(s)}
                    className={`px-3 py-1.5 rounded-full border transition-all ${specFilter === s ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]' : 'border-[#E2E8F0] text-[#64748B] hover:border-[#1D4ED8]'}`}
                    style={{ fontSize: '0.8rem', fontWeight: 500 }}
                  >{s}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCounselors.map((c) => {
                const isHired = hiredList.includes(c.id);
                return (
                  <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] hover:shadow-[0px_12px_30px_rgba(15,23,42,0.12)] transition-shadow">
                    <div className="relative h-44 overflow-hidden">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                      <button onClick={() => toggleSave(c.id)} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${savedList.includes(c.id) ? 'bg-[#FACC15]' : 'bg-white'}`}>
                        <Bookmark className={`w-4 h-4 ${savedList.includes(c.id) ? 'text-[#92400E]' : 'text-[#64748B]'}`} fill={savedList.includes(c.id) ? '#92400E' : 'none'} />
                      </button>
                      <div className="absolute top-3 left-3 bg-white rounded-full p-1 shadow-md">
                        <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                      </div>
                      {isHired && (
                        <div className="absolute bottom-3 left-3 bg-[#22C55E] rounded-full px-2 py-0.5">
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'white' }}>Hired</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{c.name}</h3>
                      <p className="text-[#3B82F6]" style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.75rem' }}>{c.specialty}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#FACC15]" fill="#FACC15" />
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{c.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#64748B]" style={{ fontSize: '0.75rem' }}>
                          <MapPin className="w-3 h-3" /> {c.location}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] mb-3">
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>{c.hiringFee}</span>
                        <span className="text-[#64748B]" style={{ fontSize: '0.72rem' }}>Hiring Access</span>
                      </div>
                      {isHired ? (
                        <button onClick={() => { setActiveTab('hired'); setExpandedHired(c.id); }} className="w-full py-2.5 bg-[#D1FAE5] text-[#166534] rounded-[10px] flex items-center justify-center gap-2" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                          <CheckCircle2 className="w-4 h-4" /> View Contact
                        </button>
                      ) : (
                        <button onClick={() => openPayModal(c)} className="w-full py-2.5 bg-[#1D4ED8] text-white rounded-[10px] hover:bg-[#1E40AF] transition-colors flex items-center justify-center gap-2" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                          <Lock className="w-4 h-4" /> Pay Hiring Access Fee
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HIRED COUNSELORS (contact details) */}
        {activeTab === 'hired' && (
          <div className="space-y-6">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Hired Counselors</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Counselors whose contact details your organisation has unlocked</p>
            </div>

            {hiredCounselors.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0]">
                <Lock className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />
                <p style={{ fontWeight: 700, color: '#0F172A' }}>No counselors hired yet</p>
                <p className="text-[#64748B] mb-4" style={{ fontSize: '0.875rem' }}>Browse counselors and pay the hiring access fee to see their contact details here.</p>
                <button onClick={() => setActiveTab('counselors')} className="bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl hover:bg-[#1E40AF] transition-colors" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                  Browse Counselors
                </button>
              </div>
            )}

            {hiredCounselors.map(c => (
              <div key={c.id} className="bg-white rounded-2xl shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] overflow-hidden">
                <div
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 cursor-pointer hover:bg-[#FAFBFC] transition-colors"
                  onClick={() => setExpandedHired(expandedHired === c.id ? null : c.id)}
                >
                  <img src={c.img} alt={c.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>{c.name}</h3>
                      <span className="flex items-center gap-1 bg-[#D1FAE5] text-[#166534] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <p className="text-[#3B82F6]" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{c.specialty}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#FACC15]" fill="#FACC15" />
                        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0F172A' }}>{c.rating}</span>
                      </div>
                      <span className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>📍 {c.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="bg-[#D1FAE5] text-[#166534] px-3 py-1 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>Contact Unlocked</span>
                    <ChevronRight className={`w-4 h-4 text-[#94A3B8] transition-transform ${expandedHired === c.id ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {expandedHired === c.id && (
                  <div className="border-t border-[#F1F5F9] p-5 bg-[#F8FAFC]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <a href={`tel:${c.phone}`} className="flex items-center gap-3 p-3.5 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#22C55E] hover:bg-[#F0FDF4] transition-colors">
                        <div className="w-9 h-9 bg-[#D1FAE5] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="w-4 h-4 text-[#22C55E]" />
                        </div>
                        <div>
                          <p className="text-[#94A3B8]" style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase' }}>Phone</p>
                          <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{c.phone}</p>
                        </div>
                      </a>
                      <a href={`mailto:${c.email}`} className="flex items-center gap-3 p-3.5 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#3B82F6] hover:bg-[#EFF6FF] transition-colors">
                        <div className="w-9 h-9 bg-[#DBEAFE] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-[#3B82F6]" />
                        </div>
                        <div>
                          <p className="text-[#94A3B8]" style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase' }}>Email</p>
                          <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{c.email}</p>
                        </div>
                      </a>
                      <div className="flex items-start gap-3 p-3.5 bg-white border border-[#E2E8F0] rounded-xl sm:col-span-2">
                        <div className="w-9 h-9 bg-[#FEF3C7] rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPinned className="w-4 h-4 text-[#F59E0B]" />
                        </div>
                        <div>
                          <p className="text-[#94A3B8]" style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase' }}>Office Address</p>
                          <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{c.office}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a href={c.bookingLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1D4ED8] text-white rounded-xl hover:bg-[#1E40AF] transition-colors" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                        <ExternalLink className="w-4 h-4" /> Book Session (External)
                      </a>
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8FAFC]" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                        <Download className="w-3.5 h-3.5" /> Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SHORTLIST */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Shortlisted Counselors</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Counselors bookmarked for future hiring consideration</p>
            </div>

            <div className="space-y-4">
              {allCounselors.filter(c => savedList.includes(c.id)).map((c) => (
                <div key={c.id} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <img src={c.img} alt={c.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>{c.name}</h3>
                        <span className="flex items-center gap-1 bg-[#D1FAE5] text-[#166534] px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      </div>
                      <p className="text-[#3B82F6]" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{c.specialty}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#FACC15]" fill="#FACC15" />
                          <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0F172A' }}>{c.rating} ({c.reviews})</span>
                        </div>
                        <span className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>📍 {c.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-3 flex-shrink-0">
                      <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.05rem' }}>{c.hiringFee}</span>
                      <p className="text-[#94A3B8]" style={{ fontSize: '0.72rem' }}>Hiring access fee</p>
                      <div className="flex gap-2">
                        {hiredList.includes(c.id) ? (
                          <button onClick={() => { setActiveTab('hired'); setExpandedHired(c.id); }} className="flex items-center gap-1.5 bg-[#D1FAE5] text-[#166534] px-3 py-2 rounded-[10px]" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                            <CheckCircle2 className="w-3.5 h-3.5" /> View Contact
                          </button>
                        ) : (
                          <button onClick={() => openPayModal(c)} className="flex items-center gap-1.5 bg-[#1D4ED8] text-white px-3 py-2 rounded-[10px] hover:bg-[#1E40AF] transition-colors" style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                            <Lock className="w-3.5 h-3.5" /> Hire
                          </button>
                        )}
                        <button onClick={() => toggleSave(c.id)} className="p-2 border border-[#E2E8F0] rounded-[10px] text-[#EF4444] hover:bg-[#FEE2E2] transition-colors">
                          <Bookmark className="w-4 h-4" fill="#EF4444" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {allCounselors.filter(c => savedList.includes(c.id)).length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0]">
                  <BookmarkCheck className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />
                  <p style={{ fontWeight: 700, color: '#0F172A' }}>No shortlisted counselors yet</p>
                  <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>Browse and bookmark counselors to see them here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Organization Profile</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Manage your organization account details</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] space-y-4">
              {[
                { label: 'Organization Name', value: 'TechCorp Nigeria Ltd.' },
                { label: 'Industry', value: 'Information Technology' },
                { label: 'Number of Employees', value: '250–500' },
                { label: 'Contact Email', value: 'hr@techcorp.ng' },
                { label: 'Phone', value: '+234 802 345 6789' },
                { label: 'Address', value: 'Victoria Island, Lagos, Nigeria' },
                { label: 'RC Number (CAC)', value: 'RC-1234567' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{f.label}</label>
                  <input type="text" defaultValue={f.value} className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.875rem' }} />
                </div>
              ))}
              <div className="pt-4">
                <button className="bg-[#1D4ED8] text-white px-6 py-3 rounded-[10px] hover:bg-[#1E40AF] transition-colors" style={{ fontWeight: 700 }}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-[#E2E8F0]">
            <div className="text-center">
              <Settings className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />
              <p style={{ fontWeight: 700, color: '#0F172A' }}>Settings</p>
              <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>Coming soon</p>
            </div>
          </div>
        )}
      </DashboardLayout>

      {/* Payment Modal */}
      {payModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            {payStep === 'details' && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-[#F1F5F9]">
                  <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Pay Hiring Access Fee</h2>
                  <button onClick={() => setPayModal(null)} className="p-1.5 text-[#94A3B8] hover:bg-[#F1F5F9] rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] mb-5">
                    <img src={payModal.img} alt={payModal.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{payModal.name}</p>
                      <p className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>{payModal.specialty} · {payModal.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.1rem' }}>{payModal.hiringFee}</p>
                      <p className="text-[#94A3B8]" style={{ fontSize: '0.7rem' }}>Hiring Fee</p>
                    </div>
                  </div>
                  <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.85rem', marginBottom: '0.5rem' }}>You will receive:</p>
                  <ul className="space-y-2 mb-5">
                    {['Phone number', 'Email address', 'Office / clinic address', 'External booking link'].map(item => (
                      <li key={item} className="flex items-center gap-2 text-[#64748B]" style={{ fontSize: '0.85rem' }}>
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3 mb-5">
                    <div>
                      <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.8rem' }}>Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.875rem' }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.8rem' }}>Expiry</label>
                        <input type="text" placeholder="MM / YY" className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.875rem' }} />
                      </div>
                      <div>
                        <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.8rem' }}>CVV</label>
                        <input type="text" placeholder="•••" className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.875rem' }} />
                      </div>
                    </div>
                  </div>
                  <button onClick={handleConfirm} className="w-full py-3.5 bg-[#1D4ED8] text-white rounded-xl hover:bg-[#1E40AF] transition-colors flex items-center justify-center gap-2" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    <Lock className="w-4 h-4" /> Pay {payModal.hiringFee} & Unlock
                  </button>
                  <p className="text-center text-[#94A3B8] mt-3" style={{ fontSize: '0.72rem' }}>Secured by Paystack · One-time charge · Non-refundable</p>
                </div>
              </>
            )}
            {payStep === 'confirm' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#DBEAFE] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-[#1D4ED8]" />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.5rem' }}>Confirm Payment</h2>
                <p className="text-[#64748B] mb-6" style={{ fontSize: '0.875rem' }}>
                  Pay <strong>{payModal.hiringFee}</strong> to unlock <strong>{payModal.name}'s</strong> contact details for your team.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setPayStep('details')} className="flex-1 py-3 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8FAFC]" style={{ fontWeight: 600 }}>Back</button>
                  <button onClick={handleFinalPay} className="flex-1 py-3 bg-[#1D4ED8] text-white rounded-xl hover:bg-[#1E40AF] transition-colors" style={{ fontWeight: 700 }}>Confirm & Pay</button>
                </div>
              </div>
            )}
            {payStep === 'success' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#D1FAE5] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.5rem' }}>Payment Successful!</h2>
                <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>Unlocking {payModal.name}'s contact details...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
