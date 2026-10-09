import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Cpu, Activity, AlertCircle } from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-[#E5E7F0] text-[#686B7D] text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2.5 text-[#17182B] font-bold text-lg group">
              <div className="h-8 w-8 rounded-xl bg-[#F1EBFF] border border-[#7047E8]/20 flex items-center justify-center text-[#7047E8]">
                <ShieldAlert size={18} />
              </div>
              <span className="font-extrabold">
                RescueNet<span className="text-[#7047E8] font-mono">-AI</span>
              </span>
            </Link>

            <p className="text-[#17182B] max-w-md text-sm font-semibold">
              AI-Powered Flood Prediction & Smart Disaster Response Platform.
            </p>

            <p className="text-[#686B7D] max-w-md text-xs leading-relaxed">
              Research-oriented platform for intelligent flood-risk assessment and disaster decision support.
              Synthesizing hydrology, meteorological parameters, and predictive analytics for climate resilience.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F3F4FA] border border-[#E5E7F0] text-[11px] font-medium text-[#686B7D]">
              <AlertCircle size={14} className="shrink-0 text-[#7047E8]" />
              <span>Simulated Demonstration &bull; Environmental metrics formatted for academic research</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <nav aria-label="Footer Modules">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17182B] mb-3.5">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#7047E8] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/prediction" className="hover:text-[#7047E8] transition-colors">
                  Flood Risk Prediction
                </Link>
              </li>
              <li>
                <Link to="/response" className="hover:text-[#7047E8] transition-colors">
                  Disaster Response SOPs
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-[#7047E8] transition-colors">
                  AI Emergency Assistant
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#7047E8] transition-colors">
                  Operational Dashboard
                </Link>
              </li>
            </ul>
          </nav>

          {/* Research & Architecture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17182B] mb-3.5">
              Research & Technology
            </h4>
            <ul className="space-y-2 text-xs text-[#686B7D]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7047E8]" />
                <span>Binary Classification Models</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                <span>Explainable AI (SHAP) Planned</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22A879]" />
                <span>Spring Boot 3 + MongoDB Base</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E9A23B]" />
                <span>Indian River Catchment Bounds</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3478DB]" />
                <span>FastAPI ML Microservice Planned</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#E5E7F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#686B7D]">
            &copy; {CURRENT_YEAR} RescueNet-AI Project. Built for Academic & Engineering Research.
          </p>

          <div className="flex items-center gap-4 text-[#686B7D] text-[11px]">
            <span className="inline-flex items-center gap-1">
              <Cpu size={13} className="text-[#7047E8]" />
              <span>Phase 1 Research Prototype</span>
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1">
              <Activity size={13} className="text-[#22A879]" />
              <span>Hydrology AI Integration Pending</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
