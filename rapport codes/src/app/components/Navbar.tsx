import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, Heart } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setOpen(false);
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll after the page renders
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const links = [
    { label: 'Find a Counselor', sectionId: 'counselors' },
    { label: 'Communities', sectionId: 'communities' },
    { label: 'For Organizations', sectionId: 'organizations' },
    { label: 'How It Works', sectionId: 'how-it-works' },
  ];

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>Rapport</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-[#64748B] hover:text-[#3B82F6] transition-colors"
                style={{ fontSize: '0.9rem', fontWeight: 500 }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-[10px] border border-[#3B82F6] text-[#3B82F6] hover:bg-[#DBEAFE] transition-colors"
              style={{ fontSize: '0.875rem', fontWeight: 600 }}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-[10px] bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors"
              style={{ fontSize: '0.875rem', fontWeight: 600 }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[#64748B]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#E2E8F0] px-4 py-4 space-y-3">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.sectionId)}
              className="block w-full text-left text-[#64748B] hover:text-[#3B82F6] py-2"
              style={{ fontWeight: 500 }}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              className="flex-1 py-2 text-center rounded-[10px] border border-[#3B82F6] text-[#3B82F6]"
              style={{ fontWeight: 600 }}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="flex-1 py-2 text-center rounded-[10px] bg-[#3B82F6] text-white"
              style={{ fontWeight: 600 }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
