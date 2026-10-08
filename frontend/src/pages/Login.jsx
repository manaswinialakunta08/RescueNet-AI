import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'operator@rescuenet.gov.in',
      password: 'disasterResponse2026!'
    });
    setErrors({});
  };

  return (
    <div className="min-h-[calc(100vh-130px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 bg-grid-pattern">
      <div className="w-full max-w-5xl rounded-3xl bg-[#171925] backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(8,9,15,0.9)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Split: Branding & Environmental Visual */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0D0F17] to-[#12141F] p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#8B5CF6]/15 blur-[80px] pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#C084FC]/10 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A78BFA]">
                <ShieldAlert size={22} />
              </div>
              <span className="text-xl font-extrabold text-white font-mono">
                RescueNet<span className="text-[#8B5CF6]">-AI</span>
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Disaster Operations Portal
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Secure access for emergency coordinators, meteorological officers, and civil defence personnel.
              </p>
            </div>
          </div>

          {/* Mini Telemetry Status */}
          <div className="pt-8 space-y-3 relative z-10">
            <div className="rounded-2xl bg-[#171925] border border-white/[0.08] p-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-[#A78BFA]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span>Telemetry Link</span>
                </span>
                <span className="text-[#71717A]">Node #4</span>
              </div>
              <div className="text-[#F8FAFC] text-[11px]">
                Inundation Surveillance Active across 48 Indian River Stations
              </div>
            </div>

            <p className="text-[10px] text-[#71717A] font-mono">
              Phase 1 Client Prototype &bull; Spring Security in Phase 3
            </p>
          </div>
        </div>

        {/* Right Split: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-mono">
              Sign In to Station
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Enter your credentials to access the risk telemetry matrix.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3 animate-fade-in-up">
              <div className="w-14 h-14 rounded-full bg-[#34D399]/20 text-[#34D399] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="text-base font-bold text-white">Authentication Simulated</h4>
              <p className="text-xs text-[#A1A1AA] font-mono">
                Redirecting to operational telemetry dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5 font-mono">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="operator@rescuenet.gov.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0D0F17] border border-white/10 text-white placeholder-[#71717A] text-xs focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5 font-mono">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]"
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0D0F17] border border-white/10 text-white placeholder-[#71717A] text-xs focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all"
                  />
                </div>
                {errors.password && (
                  <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.password}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Authenticate Operator</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full py-2.5 rounded-2xl bg-[#0D0F17] hover:bg-[#1D2030] text-[#A1A1AA] hover:text-[#F8FAFC] border border-white/[0.08] text-[11px] font-mono transition-colors cursor-pointer"
              >
                Auto-fill Demo Credentials
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-white/[0.08] text-center text-xs text-[#A1A1AA]">
            <span>Don't have a response account? </span>
            <Link
              to="/register"
              className="text-[#A78BFA] hover:underline font-semibold"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
