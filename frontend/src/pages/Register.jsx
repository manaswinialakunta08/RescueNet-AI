import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import SimulationBanner from '../components/SimulationBanner';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setRegistered(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-130px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 bg-grid-pattern">
      <div className="w-full max-w-5xl rounded-3xl bg-[#171925] backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(8,9,15,0.9)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Split: Branding & Information */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0D0F17] to-[#12141F] p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#8B5CF6]/15 blur-[80px] pointer-events-none" aria-hidden="true" />

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
                Disaster Response Network
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Join the platform linking regional meteorological sensors, emergency relief squads, and evacuation coordination.
              </p>
            </div>
          </div>

          <div className="pt-8 space-y-3 relative z-10">
            <div className="rounded-2xl bg-[#171925] border border-white/[0.08] p-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-[#A78BFA]">
                <span>Role: Response Coordinator</span>
                <span className="text-[#71717A]">Read/Write</span>
              </div>
              <div className="text-[#F8FAFC] text-[11px]">
                Enables telemetry notifications and basin risk dispatch alerts.
              </div>
            </div>

            <p className="text-[10px] text-[#71717A] font-mono">
              MongoDB user persistence planned in Phase 3
            </p>
          </div>
        </div>

        {/* Right Split: Register Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white tracking-tight font-mono">
                Create Response Account
              </h2>
              <SimulationBanner compact title="SIMULATED AUTH" variant="violet" />
            </div>
            <p className="text-xs text-[#A1A1AA]">
              Enter your details to register as an emergency operator.
            </p>
          </div>

          {registered ? (
            <div className="py-12 text-center space-y-3 animate-fade-in-up">
              <div className="w-14 h-14 rounded-full bg-[#34D399]/20 text-[#34D399] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="text-base font-bold text-white">Account Created</h4>
              <p className="text-xs text-[#A1A1AA] font-mono">
                Redirecting to operator login portal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              <div>
                <label htmlFor="reg-name" className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1 font-mono">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]"
                    aria-hidden="true"
                  />
                  <input
                    id="reg-name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0D0F17] border border-white/10 text-white placeholder-[#71717A] text-xs focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1 font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]"
                    aria-hidden="true"
                  />
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="officer@rescuenet.gov.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0D0F17] border border-white/10 text-white placeholder-[#71717A] text-xs focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="reg-password" className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1 font-mono">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]"
                      aria-hidden="true"
                    />
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min 6 chars"
                      className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#0D0F17] border border-white/10 text-white placeholder-[#71717A] text-xs focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#A78BFA] transition-colors p-1"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="reg-confirm-password" className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1 font-mono">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]"
                      aria-hidden="true"
                    />
                    <input
                      id="reg-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#0D0F17] border border-white/10 text-white placeholder-[#71717A] text-xs focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#A78BFA] transition-colors p-1"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Create Account</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          <div className="pt-3 border-t border-white/[0.08] text-center text-xs text-[#A1A1AA]">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-[#A78BFA] hover:underline font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
