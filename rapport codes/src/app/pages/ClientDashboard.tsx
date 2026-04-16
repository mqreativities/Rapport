import { useState } from 'react';
import { Link } from 'react-router';
import {
  Home, Search, Users, ShoppingBag, Settings, Star,
  ShieldCheck, MapPin, Filter, Brain,
  Heart, BookOpen, Handshake, ChevronRight,
  CreditCard, Bell, Lock, Phone, Mail, MapPinned,
  ExternalLink, CheckCircle2, X, Download, FileText,
  User, Briefcase, GraduationCap, TrendingUp, AlertCircle
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const COUNSELOR_F1 = "https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI5MDM1OTh8MA&ixlib=rb-4.1.0&q=80&w=400";
const COUNSELOR_M1 = "https://images.unsplash.com/photo-1742569184536-77ff9ae46c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwY291bnNlbG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTAzNTk4fDA&ixlib=rb-4.1.0&q=80&w=400";
const COUNSELOR_F2 = "https://images.unsplash.com/photo-1616291446004-b89a8453561c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMEFmcmljYW4lMjBmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyOTAzNjAyfDA&ixlib=rb-4.1.0&q=80&w=400";
const COUNSELOR_M2 = "https://images.unsplash.com/photo-1604783020105-a1c1a856a55d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFsZSUyMHByb2Zlc3Npb25hbCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTAzNjAyfDA&ixlib=rb-4.1.0&q=80&w=400";

const counselors = [
  { id: '1', name: 'Dr. Adaeze Okonkwo', specialty: 'Anxiety & Depression', rating: 4.9, reviews: 128, location: 'Lagos', accessFee: '₦5,000', img: COUNSELOR_F1 },
  { id: '2', name: 'Mr. Emeka Nwosu', specialty: 'Relationship Counseling', rating: 4.8, reviews: 97, location: 'Abuja', accessFee: '₦4,500', img: COUNSELOR_M1 },
  { id: '3', name: 'Dr. Kemi Adeyemi', specialty: 'Trauma & Recovery', rating: 4.9, reviews: 214, location: 'Port Harcourt', accessFee: '₦5,000', img: COUNSELOR_F2 },
  { id: '4', name: 'Dr. Chidi Okafor', specialty: 'Academic Stress', rating: 4.7, reviews: 81, location: 'Enugu', accessFee: '₦4,000', img: COUNSELOR_M2 },
];

// Already-unlocked counselors (paid access fee)
const unlockedContacts = [
  {
    id: '1', name: 'Dr. Adaeze Okonkwo', specialty: 'Anxiety & Depression', img: COUNSELOR_F1,
    unlockedOn: 'Mar 5, 2026',
    phone: '+234 803 456 7890', email: 'dr.adaeze@clinicalpsych.ng',
    office: '14 Admiralty Way, Lekki Phase 1, Lagos', bookingLink: 'https://calendly.com/dr-adaeze',
  },
  {
    id: '2', name: 'Mr. Emeka Nwosu', specialty: 'Relationship Counseling', img: COUNSELOR_M1,
    unlockedOn: 'Feb 20, 2026',
    phone: '+234 807 234 5678', email: 'emeka.nwosu@counseling.ng',
    office: 'Suite 4B, Wuse Zone 5, Abuja', bookingLink: 'https://calendly.com/emeka-nwosu',
  },
];

const communities = [
  { id: '1', name: 'Anxiety Support', members: '1.2k', icon: Brain, color: '#DBEAFE', iconColor: '#3B82F6', joined: true, fee: '₦2,000/mo', desc: 'Moderated by Dr. Adaeze Okonkwo' },
  { id: '2', name: 'Academic Stress', members: '892', icon: GraduationCap, color: '#FEF9C3', iconColor: '#EAB308', joined: false, fee: '₦1,500/mo', desc: 'Moderated by Mr. Emeka Nwosu' },
  { id: '3', name: 'Relationship Issues', members: '2.1k', icon: Heart, color: '#FCE7F3', iconColor: '#EC4899', joined: true, fee: '₦2,000/mo', desc: 'Moderated by Dr. Kemi Adeyemi' },
  { id: '4', name: 'Grief & Loss', members: '654', icon: Handshake, color: '#D1FAE5', iconColor: '#22C55E', joined: false, fee: '₦1,500/mo', desc: 'Moderated by Dr. Chidi Okafor' },
  { id: '5', name: 'Workplace Burnout', members: '438', icon: Briefcase, color: '#EDE9FE', iconColor: '#8B5CF6', joined: false, fee: '₦1,500/mo', desc: 'Moderated by Ms. Chisom Okoro' },
  { id: '6', name: 'Career Confusion', members: '312', icon: TrendingUp, color: '#FEE2E2', iconColor: '#EF4444', joined: false, fee: '₦1,500/mo', desc: 'Moderated by Mr. Tunde Adewale' },
];

const resources = [
  { id: 1, title: 'Anxiety Management Workbook', author: 'Dr. Adaeze Okonkwo', type: 'PDF', price: '₦3,500', purchased: true, img: COUNSELOR_F1 },
  { id: 2, title: 'CBT Self-Help Toolkit', author: 'Dr. Adaeze Okonkwo', type: 'PDF', price: '₦5,000', purchased: true, img: COUNSELOR_F1 },
  { id: 3, title: 'Mindfulness for Beginners', author: 'Mr. Emeka Nwosu', type: 'eBook', price: '₦2,000', purchased: false, img: COUNSELOR_M1 },
  { id: 4, title: 'Relationships & Healing', author: 'Mr. Emeka Nwosu', type: 'PDF', price: '₦4,000', purchased: false, img: COUNSELOR_M1 },
  { id: 5, title: 'Grief & Loss Recovery Guide', author: 'Dr. Kemi Adeyemi', type: 'eBook', price: '₦3,000', purchased: false, img: COUNSELOR_F2 },
  { id: 6, title: 'Stress-Free Academic Toolkit', author: 'Dr. Chidi Okafor', type: 'PDF', price: '₦2,500', purchased: false, img: COUNSELOR_M2 },
];

const problems = [
  { key: 'anxiety', label: 'Anxiety', icon: Brain, color: '#DBEAFE', ic: '#3B82F6' },
  { key: 'depression', label: 'Depression', icon: Heart, color: '#FEE2E2', ic: '#EF4444' },
  { key: 'relationship', label: 'Relationship Issues', icon: Handshake, color: '#FCE7F3', ic: '#EC4899' },
  { key: 'academic', label: 'Academic Stress', icon: GraduationCap, color: '#FEF9C3', ic: '#EAB308' },
  { key: 'career', label: 'Career Confusion', icon: TrendingUp, color: '#DBEAFE', ic: '#3B82F6' },
  { key: 'burnout', label: 'Workplace Burnout', icon: Briefcase, color: '#EDE9FE', ic: '#8B5CF6' },
  { key: 'grief', label: 'Grief & Loss', icon: BookOpen, color: '#D1FAE5', ic: '#22C55E' },
  { key: 'trauma', label: 'Trauma', icon: AlertCircle, color: '#FEF9C3', ic: '#F59E0B' },
];

const specializations = ['All', 'Anxiety', 'Depression', 'Relationship', 'Trauma', 'Academic Stress', 'Grief', 'Addiction'];
const locations = ['All Locations', 'Lagos', 'Abuja', 'Port Harcourt', 'Enugu', 'Ibadan'];

const navItems = [
  { icon: Home, label: 'Overview', key: 'overview' },
  { icon: Search, label: 'Find Counselors', key: 'counselors' },
  { icon: Phone, label: 'My Contacts', key: 'contacts' },
  { icon: Users, label: 'Communities', key: 'communities' },
  { icon: ShoppingBag, label: 'Resources', key: 'resources' },
  { icon: Settings, label: 'Profile & Settings', key: 'profile' },
];

export function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All Locations');

  // Payment modal
  const [payModal, setPayModal] = useState<typeof counselors[0] | null>(null);
  const [payStep, setPayStep] = useState<'details' | 'confirm' | 'success'>('details');
  const [unlockedIds, setUnlockedIds] = useState<string[]>(['1', '2']);

  // Resource purchase
  const [purchasedResources, setPurchasedResources] = useState<number[]>([1, 2]);
  const [communityJoined, setCommunityJoined] = useState<string[]>(['1', '3']);

  // Contact detail expansion
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  const filtered = counselors.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specFilter === 'All' || c.specialty.toLowerCase().includes(specFilter.toLowerCase());
    const matchLoc = locationFilter === 'All Locations' || c.location === locationFilter;
    return matchSearch && matchSpec && matchLoc;
  });

  const handleUnlock = (counselor: typeof counselors[0]) => {
    setPayModal(counselor);
    setPayStep('details');
  };

  const handleConfirmPay = () => {
    setPayStep('confirm');
  };

  const handleFinalPay = () => {
    setPayStep('success');
    setTimeout(() => {
      if (payModal) setUnlockedIds(prev => [...prev, payModal.id]);
      setPayModal(null);
      setPayStep('details');
      setActiveTab('contacts');
    }, 1800);
  };

  return (
    <>
      <DashboardLayout
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Amara Okafor"
        userRole="Client"
      >
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Welcome banner */}
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] rounded-2xl p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[#BFDBFE] mb-1" style={{ fontSize: '0.875rem' }}>Good morning,</p>
                  <h1 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Amara 👋</h1>
                  <p className="text-[#BFDBFE] mt-1" style={{ fontSize: '0.875rem' }}>Ready to find the right counselor today?</p>
                </div>
                <button
                  onClick={() => setActiveTab('counselors')}
                  className="inline-flex items-center gap-2 bg-white text-[#3B82F6] px-5 py-2.5 rounded-[10px] hover:bg-[#F8FAFC] transition-colors flex-shrink-0"
                  style={{ fontWeight: 700, fontSize: '0.875rem' }}
                >
                  <Search className="w-4 h-4" /> Browse Counselors
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Counselors Unlocked', value: `${unlockedContacts.length}`, icon: Phone, color: '#DBEAFE', iconColor: '#3B82F6' },
                { label: 'Communities Joined', value: `${communityJoined.length}`, icon: Users, color: '#D1FAE5', iconColor: '#22C55E' },
                { label: 'Resources Purchased', value: `${purchasedResources.length}`, icon: ShoppingBag, color: '#FEF9C3', iconColor: '#EAB308' },
                { label: 'Total Spent', value: '₦21k', icon: CreditCard, color: '#FCE7F3', iconColor: '#EC4899' },
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

            {/* Unlocked contacts summary */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Unlocked Counselors</h3>
                <button onClick={() => setActiveTab('contacts')} className="text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unlockedContacts.map(c => (
                  <div key={c.id} className="flex items-center gap-3 p-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl">
                    <img src={c.img} alt={c.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }} className="truncate">{c.name}</p>
                      <p className="text-[#64748B]" style={{ fontSize: '0.75rem' }}>{c.specialty}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended counselors */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Recommended for You</h3>
                <button onClick={() => setActiveTab('counselors')} className="text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {counselors.slice(0, 2).map(c => (
                  <div key={c.id} className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors">
                    <img src={c.img} alt={c.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }} className="truncate">{c.name}</p>
                      <p className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{c.specialty}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-[#FACC15]" fill="#FACC15" />
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0F172A' }}>{c.rating}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#3B82F6' }}>{c.accessFee}</p>
                      <p className="text-[#94A3B8]" style={{ fontSize: '0.68rem' }}>access fee</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Communities joined */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Your Communities</h3>
                <button onClick={() => setActiveTab('communities')} className="text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {communities.filter(c => communityJoined.includes(c.id)).map(c => (
                  <Link key={c.id} to={`/community/${c.id}`} className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.color }}>
                      <c.icon className="w-5 h-5" style={{ color: c.iconColor }} />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>{c.name}</p>
                      <p className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{c.members} members · {c.fee}</p>
                    </div>
                    <span className="w-2 h-2 bg-[#22C55E] rounded-full"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FIND COUNSELORS */}
        {activeTab === 'counselors' && (
          <div className="space-y-6">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Find a Counselor</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Browse verified, licensed professionals. Pay a small access fee to get their direct contact details.</p>
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
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
                <select
                  value={locationFilter}
                  onChange={e => setLocationFilter(e.target.value)}
                  className="h-12 px-3 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6] text-[#0F172A]"
                  style={{ fontSize: '0.875rem' }}
                >
                  {locations.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {specializations.map(s => (
                  <button
                    key={s}
                    onClick={() => setSpecFilter(s)}
                    className={`px-3 py-1.5 rounded-full border transition-all ${
                      specFilter === s
                        ? 'bg-[#3B82F6] text-white border-[#3B82F6]'
                        : 'border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6]'
                    }`}
                    style={{ fontSize: '0.8rem', fontWeight: 500 }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Counselor cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(c => {
                const isUnlocked = unlockedIds.includes(c.id);
                return (
                  <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] hover:shadow-[0px_12px_30px_rgba(15,23,42,0.12)] hover:border-[#BFDBFE] transition-all">
                    <Link to={`/counselor/${c.id}`} className="block">
                      <div className="relative h-44 overflow-hidden">
                        <img src={c.img} alt={c.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md">
                          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                        </div>
                        {isUnlocked && (
                          <div className="absolute top-3 left-3 bg-[#22C55E] rounded-full px-2 py-0.5">
                            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'white' }}>Unlocked</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 pb-0">
                        <h3 style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{c.name}</h3>
                        <p className="text-[#3B82F6]" style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.75rem' }}>{c.specialty}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[#FACC15]" fill="#FACC15" />
                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{c.rating}</span>
                            <span className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>({c.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#64748B]" style={{ fontSize: '0.75rem' }}>
                            <MapPin className="w-3 h-3" /> {c.location}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4 pt-2">
                      <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] mb-3">
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>{c.accessFee}</span>
                        <span className="text-[#64748B]" style={{ fontSize: '0.72rem' }}>Access fee</span>
                      </div>
                      {isUnlocked ? (
                        <button
                          onClick={() => setActiveTab('contacts')}
                          className="w-full py-2.5 bg-[#D1FAE5] text-[#166534] rounded-[10px] flex items-center justify-center gap-2"
                          style={{ fontWeight: 700, fontSize: '0.875rem' }}
                        >
                          <CheckCircle2 className="w-4 h-4" /> View Contact
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnlock(c)}
                          className="w-full py-2.5 bg-[#3B82F6] text-white rounded-[10px] hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2"
                          style={{ fontWeight: 700, fontSize: '0.875rem' }}
                        >
                          <Lock className="w-4 h-4" /> Unlock Contact
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MY CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>My Unlocked Contacts</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Counselors whose contact details you have unlocked</p>
            </div>

            {unlockedContacts.map(c => (
              <div key={c.id} className="bg-white rounded-2xl shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] overflow-hidden">
                <div
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 cursor-pointer hover:bg-[#FAFBFC] transition-colors"
                  onClick={() => setExpandedContact(expandedContact === c.id ? null : c.id)}
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
                    <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Unlocked {c.unlockedOn}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="bg-[#D1FAE5] text-[#166534] px-3 py-1 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>Contact Unlocked</span>
                    <ChevronRight className={`w-4 h-4 text-[#94A3B8] transition-transform ${expandedContact === c.id ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {expandedContact === c.id && (
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
                      <a
                        href={c.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#0F172A] text-white rounded-xl hover:bg-[#1E293B] transition-colors"
                        style={{ fontWeight: 700, fontSize: '0.875rem' }}
                      >
                        <ExternalLink className="w-4 h-4" /> Book Session (External)
                      </a>
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8FAFC] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                        <Download className="w-3.5 h-3.5" /> Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {unlockedContacts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0]">
                <Lock className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />
                <p style={{ fontWeight: 700, color: '#0F172A' }}>No contacts unlocked yet</p>
                <p className="text-[#64748B] mb-4" style={{ fontSize: '0.875rem' }}>Find a counselor and pay the access fee to see their contact details here.</p>
                <button onClick={() => setActiveTab('counselors')} className="bg-[#3B82F6] text-white px-5 py-2.5 rounded-xl hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                  Browse Counselors
                </button>
              </div>
            )}
          </div>
        )}

        {/* COMMUNITIES */}
        {activeTab === 'communities' && (
          <div className="space-y-6">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Communities</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Join problem-based communities moderated by licensed counselors</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {communities.map(c => {
                const joined = communityJoined.includes(c.id);
                return (
                  <div key={c.id} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: c.color }}>
                        <c.icon className="w-6 h-6" style={{ color: c.iconColor }} />
                      </div>
                      {joined && (
                        <span className="bg-[#D1FAE5] text-[#166534] px-2.5 py-1 rounded-full" style={{ fontSize: '0.7rem', fontWeight: 700 }}>Subscribed</span>
                      )}
                    </div>
                    <h3 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem', marginBottom: '0.25rem' }}>{c.name}</h3>
                    <p className="text-[#64748B]" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>{c.desc}</p>
                    <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>{c.members} members</p>
                    <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
                      <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>{c.fee}</span>
                      {joined ? (
                        <Link to={`/community/${c.id}`} className="text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                          Open <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => setCommunityJoined(prev => [...prev, c.id])}
                          className="bg-[#3B82F6] text-white px-4 py-2 rounded-[10px] hover:bg-[#2563EB] transition-colors"
                          style={{ fontWeight: 700, fontSize: '0.8rem' }}
                        >
                          Subscribe
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Resource Marketplace</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Purchase digital resources created by verified counselors</p>
            </div>

            {/* My purchased resources */}
            {purchasedResources.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
                <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Your Purchases</h3>
                <div className="space-y-3">
                  {resources.filter(r => purchasedResources.includes(r.id)).map(r => (
                    <div key={r.id} className="flex items-center gap-4 p-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl">
                      <div className="w-10 h-10 bg-[#D1FAE5] rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#22C55E]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{r.title}</p>
                        <p className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{r.type} · By {r.author}</p>
                      </div>
                      <button className="flex items-center gap-1.5 bg-[#22C55E] text-white px-3 py-1.5 rounded-lg hover:bg-[#16A34A] transition-colors" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Browse all resources */}
            <h3 style={{ fontWeight: 700, color: '#0F172A' }}>Browse All Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {resources.filter(r => !purchasedResources.includes(r.id)).map(r => (
                <div key={r.id} className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={r.img} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.82rem', color: '#0F172A' }}>{r.author}</p>
                      <span className="bg-[#DBEAFE] text-[#1D4ED8] px-2 py-0.5 rounded-md" style={{ fontSize: '0.7rem', fontWeight: 600 }}>{r.type}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <h4 style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem', marginBottom: '1rem' }}>{r.title}</h4>
                  <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
                    <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem' }}>{r.price}</span>
                    <button
                      onClick={() => setPurchasedResources(prev => [...prev, r.id])}
                      className="bg-[#3B82F6] text-white px-4 py-2 rounded-[10px] hover:bg-[#2563EB] transition-colors"
                      style={{ fontWeight: 700, fontSize: '0.8rem' }}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE & SETTINGS */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Profile & Settings</h1>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem' }}>Manage your account details and preferences</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F1F5F9]">
                <div className="w-16 h-16 bg-[#DBEAFE] rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-[#3B82F6]" />
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>Amara Okafor</p>
                  <p className="text-[#64748B]" style={{ fontSize: '0.85rem' }}>amara.okafor@email.com</p>
                  <span className="bg-[#DBEAFE] text-[#1D4ED8] px-2 py-0.5 rounded-full" style={{ fontSize: '0.72rem', fontWeight: 700 }}>Client</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'First Name', value: 'Amara' },
                  { label: 'Last Name', value: 'Okafor' },
                  { label: 'Email Address', value: 'amara.okafor@email.com' },
                  { label: 'Phone Number', value: '+234 802 345 6789' },
                  { label: 'Location', value: 'Lagos, Nigeria' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{f.label}</label>
                    <input
                      type="text"
                      defaultValue={f.value}
                      className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                      style={{ fontSize: '0.875rem' }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[#0F172A] mb-1.5" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Gender</label>
                  <select className="w-full h-12 px-4 rounded-[10px] border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6] text-[#0F172A]" style={{ fontSize: '0.875rem' }}>
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button className="bg-[#3B82F6] text-white px-6 py-3 rounded-[10px] hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 700 }}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Notification preferences */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Notifications</h3>
              {[
                { label: 'Community updates', sub: 'New posts from communities you joined' },
                { label: 'New counselors', sub: 'Counselors matching your interests' },
                { label: 'Resource releases', sub: 'New digital resources from counselors you follow' },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[#F8FAFC] last:border-0">
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{n.label}</p>
                    <p className="text-[#94A3B8]" style={{ fontSize: '0.78rem' }}>{n.sub}</p>
                  </div>
                  <div className="w-10 h-6 bg-[#3B82F6] rounded-full relative cursor-pointer">
                    <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
              ))}
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
                  <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Unlock Contact Details</h2>
                  <button onClick={() => setPayModal(null)} className="p-1.5 text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] rounded-lg">
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
                      <p style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.1rem' }}>{payModal.accessFee}</p>
                      <p className="text-[#94A3B8]" style={{ fontSize: '0.7rem' }}>Access Fee</p>
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
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]" style={{ fontSize: '0.875rem' }} />
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

                  <button onClick={handleConfirmPay} className="w-full py-3.5 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    <Lock className="w-4 h-4" /> Pay {payModal.accessFee} & Unlock
                  </button>
                  <p className="text-center text-[#94A3B8] mt-3" style={{ fontSize: '0.72rem' }}>Secured by Paystack · One-time charge · Non-refundable</p>
                </div>
              </>
            )}

            {payStep === 'confirm' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#DBEAFE] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-[#3B82F6]" />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.5rem' }}>Confirm Payment</h2>
                <p className="text-[#64748B] mb-6" style={{ fontSize: '0.875rem' }}>
                  You are about to pay <strong>{payModal.accessFee}</strong> to unlock <strong>{payModal.name}'s</strong> verified contact details.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setPayStep('details')} className="flex-1 py-3 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8FAFC]" style={{ fontWeight: 600 }}>Back</button>
                  <button onClick={handleFinalPay} className="flex-1 py-3 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 700 }}>Confirm & Pay</button>
                </div>
              </div>
            )}

            {payStep === 'success' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#D1FAE5] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.5rem' }}>Payment Successful!</h2>
                <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>Taking you to {payModal.name}'s contact details...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}