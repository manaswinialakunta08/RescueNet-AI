import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Menu,
  X,
  Activity,
  MapPin,
  LifeBuoy,
  Bot,
  BrainCircuit,
  LogIn,
  UserPlus,
  Radio
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: Activity },
  { name: 'Prediction', path: '/prediction', icon: BrainCircuit },
  { name: 'Dashboard', path: '/dashboard', icon: Radio },
  { name: 'Risk Map', path: '/risk-map', icon: MapPin },
  { name: 'Response', path: '/disaster-response', icon: LifeBuoy },
  { name: 'AI Assistant', path: '/ai-assistant', icon: Bot }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 pt-3 pb-2 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-[#0D0F17]/90 backdrop-blur-xl border border-[#8B5CF6]/20 shadow-[0_8px_32px_rgba(8,9,15,0.8)]'
            : 'bg-[#0D0F17]/60 backdrop-blur-md border border-white/[0.08] shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo with Shield + Pulse aesthetic */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6]/25 to-[#C084FC]/10 border border-[#8B5CF6]/40 group-hover:border-[#A78BFA] transition-all shadow-[0_0_15px_rgba(139,92,246,0.25)]">
              <span className="absolute inset-0 rounded-xl bg-[#8B5CF6]/10 animate-pulse-ring" />
              <ShieldAlert size={20} className="text-[#A78BFA] relative z-10 transition-transform group-hover:scale-105" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#A78BFA] transition-colors flex items-center gap-1">
                RescueNet<span className="text-[#8B5CF6] font-mono">-AI</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#A78BFA]/80 -mt-1 hidden sm:inline">
                Disaster Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#08090F]/70 px-2 py-1.5 rounded-xl border border-white/[0.08]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'text-white bg-[#171925] border border-[#8B5CF6]/30 shadow-[0_0_12px_rgba(139,92,246,0.2)]'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-[#A78BFA]' : 'text-[#71717A]'} />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#8B5CF6] rounded-full shadow-[0_0_6px_#8B5CF6]" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Auth Links */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-[#A1A1AA] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              <span className="flex items-center gap-1.5">
                <LogIn size={13} className="text-[#71717A]" />
                <span>Login</span>
              </span>
            </Link>

            <Link
              to="/register"
              className="relative group overflow-hidden px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <UserPlus size={13} />
                <span>Register</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/prediction"
              className="md:hidden px-2.5 py-1 rounded-lg bg-[#8B5CF6]/20 text-[#A78BFA] text-xs font-mono font-medium border border-[#8B5CF6]/40"
            >
              Analyze
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/5 border border-white/[0.08]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-[#0D0F17]/95 backdrop-blur-xl border border-[#8B5CF6]/20 p-4 space-y-1.5 shadow-2xl animate-fade-in-up">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#171925] text-[#A78BFA] border border-[#8B5CF6]/30 font-semibold'
                    : 'text-[#A1A1AA] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#A78BFA]' : 'text-[#71717A]'} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl text-xs font-medium text-[#A1A1AA] bg-[#08090F] border border-white/[0.08]"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#C084FC]"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
