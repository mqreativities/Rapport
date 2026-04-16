import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, ShieldCheck, Star, MapPin,
  BookOpen, Users, CheckCircle2,
  Share2, Heart, Award, FileText, Phone, Mail, MapPinned,
  ExternalLink, Lock, CreditCard, X, Download
} from 'lucide-react';

const COUNSELOR_IMG = "https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI5MDM1OTh8MA&ixlib=rb-4.1.0&q=80&w=800";

const reviews = [
  { name: 'Chidimma A.', rating: 5, text: 'Dr. Adaeze is incredibly empathetic and professional. She helped me understand my anxiety and gave me practical tools to manage it.', date: '2 weeks ago' },
  { name: 'Bode T.', rating: 5, text: 'Excellent counselor. Very understanding and provides actionable steps. Highly recommend getting her contact details through Rapport.', date: '1 month ago' },
  { name: 'Funmi O.', rating: 4, text: 'Great experience overall. The process of getting her contact was seamless. Highly recommend for anyone dealing with depression.', date: '1 month ago' },
];

const resources = [
  { title: 'Anxiety Management Workbook', type: 'PDF', price: '₦3,500', downloads: 142 },
  { title: 'Mindfulness for Beginners', type: 'eBook', price: '₦2,000', downloads: 89 },
  { title: 'CBT Self-Help Toolkit', type: 'PDF', price: '₦5,000', downloads: 67 },
];

// Contact details revealed after payment
const CONTACT_DETAILS = {
  phone: '+234 803 456 7890',
  email: 'dr.adaeze@clinicalpsych.ng',
  office: '14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
  bookingLink: 'https://calendly.com/dr-adaeze-okonkwo',
};

export function CounselorProfile() {
  const navigate = useNavigate();
  const [showPayModal, setShowPayModal] = useState(false);
  const [payStep, setPayStep] = useState<'details' | 'confirm' | 'success'>('details');
  const [unlocked, setUnlocked] = useState(false);
  const [savedResource, setSavedResource] = useState<number | null>(null);

  const handlePay = () => {
    setPayStep('confirm');
  };

  const handleConfirmPay = () => {
    setPayStep('success');
    setTimeout(() => {
      setUnlocked(true);
      setShowPayModal(false);
      setPayStep('details');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Top bar */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] transition-colors"
            style={{ fontWeight: 500, fontSize: '0.9rem' }}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile header */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative flex-shrink-0">
                  <img
                    src={COUNSELOR_IMG}
                    alt="Dr. Adaeze Okonkwo"
                    className="w-28 h-28 rounded-2xl object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-[#E2E8F0]">
                    <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>Dr. Adaeze Okonkwo</h1>
                      <p className="text-[#3B82F6] mt-0.5" style={{ fontWeight: 600, fontSize: '0.95rem' }}>Clinical Psychologist</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#D1FAE5] px-3 py-1 rounded-full">
                      <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#166534' }}>Licence Verified</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 text-[#64748B]" style={{ fontSize: '0.875rem' }}>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#3B82F6]" /> Lagos, Nigeria
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#3B82F6]" /> 8 years experience
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#3B82F6]" /> 350+ clients
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className="w-4 h-4 text-[#FACC15]" fill="#FACC15" />
                      ))}
                    </div>
                    <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>4.9</span>
                    <span className="text-[#94A3B8]" style={{ fontSize: '0.85rem' }}>(128 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What Rapport Provides Notice */}
            <div className="bg-[#DBEAFE] border border-[#BFDBFE] rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontWeight: 700, color: '#1D4ED8', fontSize: '0.9rem' }}>How Rapport Works</p>
                  <p className="text-[#1E40AF]" style={{ fontSize: '0.82rem', lineHeight: 1.6, marginTop: '0.25rem' }}>
                    Rapport is a <strong>counselor discovery platform</strong>. We do not host sessions, video calls, or messages. Pay a one-time access fee to unlock Dr. Adaeze's verified contact details — then connect directly to arrange your sessions.
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>About</h3>
              <p className="text-[#64748B]" style={{ fontSize: '0.9rem', lineHeight: 1.8 }}>
                Dr. Adaeze Okonkwo is a licensed clinical psychologist with over 8 years of experience helping individuals navigate anxiety, depression, and life transitions. She earned her doctorate from the University of Lagos and is registered with the Nigerian Board of Clinical Psychology.
              </p>
              <p className="text-[#64748B] mt-3" style={{ fontSize: '0.9rem', lineHeight: 1.8 }}>
                Her approach integrates Cognitive Behavioral Therapy (CBT), mindfulness practices, and culturally-sensitive counseling techniques tailored to the Nigerian context.
              </p>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Areas of Specialization</h3>
              <div className="flex flex-wrap gap-2">
                {['Anxiety Disorders', 'Depression', 'Stress Management', 'Grief & Loss', 'Life Transitions', 'Trauma', 'Relationship Issues', 'Self-esteem'].map(s => (
                  <span key={s} className="bg-[#DBEAFE] text-[#1D4ED8] px-3 py-1.5 rounded-full" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Digital Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Digital Resources by Dr. Adaeze</h3>
              <div className="space-y-3">
                {resources.map((r, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors">
                    <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{r.title}</p>
                      <p className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>{r.type} · {r.downloads} downloads</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>{r.price}</p>
                      <button
                        onClick={() => setSavedResource(savedResource === i ? null : i)}
                        className="text-[#3B82F6] hover:text-[#2563EB]"
                        style={{ fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        {savedResource === i ? '✓ Added' : 'Purchase'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Client Reviews</h3>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#DBEAFE] rounded-full flex items-center justify-center">
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B82F6' }}>{r.name.charAt(0)}</span>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>{r.name}</span>
                      </div>
                      <span className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>{r.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(r.rating)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 text-[#FACC15]" fill="#FACC15" />
                      ))}
                    </div>
                    <p className="text-[#64748B]" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Access Fee card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0] sticky top-24">
              {!unlocked ? (
                <>
                  <div className="text-center mb-5 pb-5 border-b border-[#F1F5F9]">
                    <p className="text-[#64748B] mb-1" style={{ fontSize: '0.85rem' }}>Consultation Access Fee</p>
                    <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>₦5,000</p>
                    <p className="text-[#64748B]" style={{ fontSize: '0.78rem' }}>One-time · Non-refundable</p>
                  </div>

                  <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                    What you unlock:
                  </p>
                  <div className="space-y-3 mb-5">
                    {[
                      { icon: Phone, text: 'Direct phone number' },
                      { icon: Mail, text: 'Professional email address' },
                      { icon: MapPinned, text: 'Office / clinic address' },
                      { icon: ExternalLink, text: 'External booking link' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[#64748B]" style={{ fontSize: '0.875rem' }}>
                        <item.icon className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                        {item.text}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowPayModal(true)}
                    className="w-full py-3.5 bg-[#3B82F6] text-white rounded-[10px] hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2"
                    style={{ fontWeight: 700 }}
                  >
                    <Lock className="w-4 h-4" /> Unlock Contact Details
                  </button>

                  <div className="mt-4 p-3 bg-[#F8FAFC] rounded-xl text-center">
                    <p className="text-[#64748B]" style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
                      Rapport does not host sessions. After unlocking, you contact the counselor directly to arrange your session.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4 p-3 bg-[#D1FAE5] rounded-xl border border-[#86EFAC]">
                    <CheckCircle2 className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                    <p style={{ fontWeight: 700, color: '#166534', fontSize: '0.85rem' }}>Contact details unlocked!</p>
                  </div>

                  <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem', marginBottom: '1rem' }}>Dr. Adaeze's Verified Contacts</p>

                  <div className="space-y-3">
                    <a
                      href={`tel:${CONTACT_DETAILS.phone}`}
                      className="flex items-center gap-3 p-3.5 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl hover:bg-[#D1FAE5] transition-colors"
                    >
                      <div className="w-9 h-9 bg-[#22C55E] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[#94A3B8]" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</p>
                        <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.875rem' }}>{CONTACT_DETAILS.phone}</p>
                      </div>
                    </a>

                    <a
                      href={`mailto:${CONTACT_DETAILS.email}`}
                      className="flex items-center gap-3 p-3.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl hover:bg-[#DBEAFE] transition-colors"
                    >
                      <div className="w-9 h-9 bg-[#3B82F6] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[#94A3B8]" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</p>
                        <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.875rem' }}>{CONTACT_DETAILS.email}</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-3 p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <div className="w-9 h-9 bg-[#F59E0B] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPinned className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[#94A3B8]" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Office Address</p>
                        <p style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.82rem', lineHeight: 1.4 }}>{CONTACT_DETAILS.office}</p>
                      </div>
                    </div>

                    <a
                      href={CONTACT_DETAILS.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#0F172A] text-white rounded-xl hover:bg-[#1E293B] transition-colors"
                      style={{ fontWeight: 700, fontSize: '0.875rem' }}
                    >
                      <ExternalLink className="w-4 h-4" /> Book a Session (External)
                    </a>
                  </div>

                  <button className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8FAFC] transition-colors" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    <Download className="w-3.5 h-3.5" /> Save Contact Card
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            {payStep === 'details' && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-[#F1F5F9]">
                  <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Unlock Contact Details</h2>
                  <button onClick={() => setShowPayModal(false)} className="p-1.5 text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] mb-5">
                    <img src={COUNSELOR_IMG} alt="Counselor" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>Dr. Adaeze Okonkwo</p>
                      <p className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>Clinical Psychologist · Lagos</p>
                    </div>
                    <div className="ml-auto text-right flex-shrink-0">
                      <p style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.1rem' }}>₦5,000</p>
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
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#CBD5E1] bg-white focus:outline-none focus:border-[#3B82F6]"
                          style={{ fontSize: '0.875rem' }}
                        />
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

                  <button
                    onClick={handlePay}
                    className="w-full py-3.5 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2"
                    style={{ fontWeight: 700, fontSize: '0.95rem' }}
                  >
                    <Lock className="w-4 h-4" /> Pay ₦5,000 & Unlock
                  </button>
                  <p className="text-center text-[#94A3B8] mt-3" style={{ fontSize: '0.72rem' }}>
                    Secured by Paystack · One-time charge · Non-refundable
                  </p>
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
                  You are about to pay <strong>₦5,000</strong> to unlock Dr. Adaeze Okonkwo's verified contact details.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setPayStep('details')} className="flex-1 py-3 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8FAFC]" style={{ fontWeight: 600 }}>
                    Back
                  </button>
                  <button onClick={handleConfirmPay} className="flex-1 py-3 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 700 }}>
                    Confirm & Pay
                  </button>
                </div>
              </div>
            )}

            {payStep === 'success' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#D1FAE5] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.5rem' }}>Payment Successful!</h2>
                <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>
                  Unlocking Dr. Adaeze's contact details...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
