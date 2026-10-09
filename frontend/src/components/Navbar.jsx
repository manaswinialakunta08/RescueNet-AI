import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  Menu,
  X,
  LogIn,
  UserPlus
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Prediction', path: '/prediction' },
  { name: 'Response', path: '/response' },
  { name: 'AI Assistant', path: '/ai-assistant' },
  { name: 'Dashboard', path: '/dashboard' }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full bg-white border-b border-[#E5E7F0] transition-all duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Shield Icon */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="RescueNet-AI Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#F1EBFF] border border-[#7047E8]/20 flex items-center justify-center text-[#7047E8] transition-all group-hover:scale-105 shadow-xs">
              <ShieldAlert size={20} className="text-[#7047E8]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-[#17182B] group-hover:text-[#7047E8] transition-colors">
                RescueNet<span className="text-[#7047E8] font-mono">-AI</span>
              </span>
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#686B7D] -mt-1 font-semibold">
                Disaster Intelligence
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-xs tracking-wide transition-all ${
                    isActive
                      ? 'text-[#7047E8] bg-[#F1EBFF] font-bold shadow-xs'
                      : 'text-[#686B7D] hover:text-[#17182B] hover:bg-[#F3F4FA] font-medium'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Auth Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#686B7D] hover:text-[#17182B] hover:bg-[#F3F4FA] transition-all flex items-center gap-1.5"
            >
              <LogIn size={14} className="text-[#686B7D]" />
              <span>Login</span>
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#7047E8] hover:bg-[#5E35D1] shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <UserPlus size={14} />
              <span>Register</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/prediction"
              className="px-2.5 py-1 rounded-lg bg-[#F1EBFF] text-[#7047E8] text-xs font-semibold border border-[#7047E8]/20"
            >
              Predict
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#686B7D] hover:text-[#17182B] hover:bg-[#F3F4FA] transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E7F0] bg-white p-4 space-y-2 shadow-lg animate-fade-in-up">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#F1EBFF] text-[#7047E8] font-bold'
                    : 'text-[#686B7D] hover:bg-[#F3F4FA] hover:text-[#17182B]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="pt-3 mt-2 border-t border-[#E5E7F0] flex items-center gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl text-xs font-medium text-[#686B7D] bg-[#F3F4FA] border border-[#E5E7F0]"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold text-white bg-[#7047E8]"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
