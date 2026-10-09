import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms to register';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-[#F8FAFC]">
      <div className="w-full max-w-4xl rounded-3xl bg-white border border-[#E5E7F0] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* ----------------- LEFT HERO (Panel 7) ----------------- */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#17182B] via-[#20153D] to-[#2E1854] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#7047E8]/30 blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7047E8] to-[#8B5CF6] flex items-center justify-center text-white shadow-md">
                <ShieldAlert size={22} />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                RescueNet<span className="text-[#8B5CF6]">-AI</span>
              </span>
            </div>

            <div className="space-y-3 pt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C084FC] text-xs font-semibold backdrop-blur-xs">
                <Sparkles size={12} />
                <span>Next-Gen Climate AI</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Join the Next-Gen Disaster Defense Platform
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Collaborate with emergency teams, configure hydrological sensors, and receive automated community evacuation alerts.
              </p>
            </div>
          </div>

          {/* Bottom 3 Feature Pills */}
          <div className="pt-8 space-y-2 relative z-10 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#22A879]" />
              <span>Free Researcher & Operator Access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#22A879]" />
              <span>Instant Basin ML Simulations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#22A879]" />
              <span>Multi-Agency Coordinated Dispatch</span>
            </div>
          </div>
        </div>

        {/* ----------------- RIGHT FORM (Panel 7) ----------------- */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold text-[#17182B] tracking-tight">
                Create Your Account
              </h2>
              <p className="text-xs sm:text-sm text-[#686B7D] mt-1">
                Start monitoring river basins and evaluating flood risks
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#17182B] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#686B7D]">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E5E7F0] bg-[#F8FAFC] focus:bg-white focus:border-[#7047E8] text-xs font-medium text-[#17182B] outline-none transition-colors"
                    placeholder="Dr. Rajesh Sharma"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-[#E5484D] mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-[#17182B] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#686B7D]">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E5E7F0] bg-[#F8FAFC] focus:bg-white focus:border-[#7047E8] text-xs font-medium text-[#17182B] outline-none transition-colors"
                    placeholder="rajesh.sharma@imd.gov.in"
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-[#E5484D] mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-[#17182B] mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#686B7D]">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5E7F0] bg-[#F8FAFC] focus:bg-white focus:border-[#7047E8] text-xs font-medium text-[#17182B] outline-none transition-colors"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#686B7D] hover:text-[#17182B]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-[#E5484D] mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs font-bold text-[#17182B] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#686B7D]">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5E7F0] bg-[#F8FAFC] focus:bg-white focus:border-[#7047E8] text-xs font-medium text-[#17182B] outline-none transition-colors"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#686B7D] hover:text-[#17182B]"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-[#E5484D] mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Agree Terms Checkbox */}
              <div>
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E5E7F0] text-[#7047E8] focus:ring-[#7047E8]"
                  />
                  <label htmlFor="terms" className="ml-2 text-xs text-[#686B7D] cursor-pointer">
                    I agree to the Terms of Service & Privacy Policy
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-[11px] text-[#E5484D] mt-1">{errors.agreeTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#7047E8] hover:bg-[#5E35D1] text-white font-semibold text-xs shadow-md shadow-[#7047E8]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E5E7F0] w-full" />
              <span className="bg-white px-3 text-[11px] text-[#686B7D] absolute">
                Or continue with
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="py-2.5 px-3 rounded-xl border border-[#E5E7F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#17182B] flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="py-2.5 px-3 rounded-xl border border-[#E5E7F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#17182B] flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current text-[#17182B]" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Bottom Login Link */}
            <div className="text-center pt-2">
              <p className="text-xs text-[#686B7D]">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-[#7047E8] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
