import { Link } from 'react-router';
import { Heart, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Rapport</span>
            </div>
            <p className="text-[#94A3B8]" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
              Nigeria's trusted platform for mental wellness and professional counseling.
            </p>
            <div className="flex gap-3 mt-4">
              {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#3B82F6] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600, fontSize: '0.875rem' }}>Platform</h4>
            <ul className="space-y-2">
              {['Find a Counselor', 'Join Communities', 'Digital Resources', 'For Organizations'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors" style={{ fontSize: '0.875rem' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Counselors */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600, fontSize: '0.875rem' }}>Counselors</h4>
            <ul className="space-y-2">
              {['Become a Counselor', 'Verification Process', 'Counselor Dashboard', 'Payout Info'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors" style={{ fontSize: '0.875rem' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600, fontSize: '0.875rem' }}>Legal & Support</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Help Center', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors" style={{ fontSize: '0.875rem' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E293B] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#64748B]" style={{ fontSize: '0.8rem' }}>
            © 2026 Rapport. All rights reserved. Made in Nigeria 🇳🇬
          </p>
          <div className="flex items-center gap-2 text-[#64748B]" style={{ fontSize: '0.8rem' }}>
            <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
