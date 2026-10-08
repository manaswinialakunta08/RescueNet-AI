import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Cpu, Activity, AlertCircle } from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#08090F] border-t border-white/[0.08] text-[#A1A1AA] text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white font-bold text-lg group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#8B5CF6]/25 to-[#C084FC]/10 border border-[#8B5CF6]/40 flex items-center justify-center text-[#A78BFA] group-hover:border-[#A78BFA] transition-all">
                <ShieldAlert size={18} />
              </div>
              <span className="font-mono">
                RescueNet<span className="text-[#8B5CF6]">-AI</span>
              </span>
            </Link>

            <p className="text-[#F8FAFC] max-w-md text-sm leading-relaxed">
              AI-powered flood prediction and smart disaster response.
            </p>

            <p className="text-[#A1A1AA] max-w-md text-xs leading-relaxed">
              Research-oriented project for intelligent flood-risk assessment and disaster decision support.
              Synthesizing hydrology, meteorological parameters, and predictive analytics for climate resilience.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#171925] border border-white/[0.08] text-[11px] font-mono text-[#FB923C]">
              <AlertCircle size={14} className="shrink-0" />
              <span>Current Status: Frontend Prototype (Simulated Telemetry Matrix)</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-[#A78BFA] transition-colors">
                  Overview & Architecture
                </Link>
              </li>
              <li>
                <Link to="/prediction" className="hover:text-[#A78BFA] transition-colors">
                  Flood Risk Prediction
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#A78BFA] transition-colors">
                  Regional Telemetry Dashboard
                </Link>
              </li>
              <li>
                <Link to="/risk-map" className="hover:text-[#A78BFA] transition-colors">
                  Geographic Risk Map
                </Link>
              </li>
              <li>
                <Link to="/disaster-response" className="hover:text-[#A78BFA] transition-colors">
                  Disaster Response & Protocols
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-[#A78BFA] transition-colors">
                  AI Emergency Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Research & Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono mb-4">
              Research & Technology
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                <span>Binary Classification Models</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC]" />
                <span>Explainable AI (SHAP) Planned</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span>Spring Boot 3 + MongoDB Base</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
                <span>Indian River Catchment Bounds</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                <span>FastAPI ML Microservice Planned</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-[#71717A]">
            &copy; {CURRENT_YEAR} RescueNet-AI Project. Built for Academic & Engineering Research.
          </p>

          <div className="flex items-center gap-4 text-[#71717A] text-[11px]">
            <span className="inline-flex items-center gap-1">
              <Cpu size={13} className="text-[#8B5CF6]" />
              <span>Phase 1 Frontend Simulation</span>
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1">
              <Activity size={13} className="text-[#34D399]" />
              <span>Hydrology ML Integration Pending</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
