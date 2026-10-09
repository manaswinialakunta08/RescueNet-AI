import React, { useState } from 'react';
import {
  BrainCircuit,
  RotateCcw,
  Sparkles,
  MapPin,
  CloudRain,
  Waves,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import PredictionCard from '../components/PredictionCard';
import SimulationBanner from '../components/SimulationBanner';
import { mockSampleScenarios } from '../data/mockData';

const INITIAL_FORM_STATE = {
  latitude: '19.0760',
  longitude: '72.8777',
  elevation: '142.0',
  rainfall: '215.4',
  temperature: '28.5',
  humidity: '88.0',
  riverDischarge: '3840.0',
  waterLevel: '7.85',
  historicalFloods: '1',
  landCover: 'Urban',
  soilType: 'Clay',
  populationDensity: '7250',
  infrastructure: '1'
};

const LAND_COVER_OPTIONS = [
  'Water Body',
  'Desert',
  'Forest',
  'Agricultural',
  'Urban'
];

const SOIL_TYPE_OPTIONS = [
  'Clay',
  'Peat',
  'Loam',
  'Sandy',
  'Silt'
];

export default function Prediction() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const loadScenario = (scenario) => {
    setFormData(scenario.data);
    setErrors({});
    setPredictionResult(null);
  };

  const validateForm = () => {
    const newErrors = {};

    const lat = parseFloat(formData.latitude);
    if (isNaN(lat) || lat < 6.0 || lat > 38.0) {
      newErrors.latitude = 'Indian lat bounds (~6° to 38° N)';
    }

    const lng = parseFloat(formData.longitude);
    if (isNaN(lng) || lng < 68.0 || lng > 98.0) {
      newErrors.longitude = 'Indian lng bounds (~68° to 98° E)';
    }

    const elev = parseFloat(formData.elevation);
    if (isNaN(elev) || elev < 0 || elev > 9000) {
      newErrors.elevation = 'Elevation (0 - 9000 m)';
    }

    const rain = parseFloat(formData.rainfall);
    if (isNaN(rain) || rain < 0 || rain > 1000) {
      newErrors.rainfall = 'Rainfall (0 - 1000 mm)';
    }

    const temp = parseFloat(formData.temperature);
    if (isNaN(temp) || temp < -10 || temp > 60) {
      newErrors.temperature = 'Temperature (-10°C - 60°C)';
    }

    const hum = parseFloat(formData.humidity);
    if (isNaN(hum) || hum < 0 || hum > 100) {
      newErrors.humidity = 'Humidity (0% - 100%)';
    }

    const discharge = parseFloat(formData.riverDischarge);
    if (isNaN(discharge) || discharge < 0 || discharge > 25000) {
      newErrors.riverDischarge = 'River discharge (0 - 25000 m³/s)';
    }

    const waterLvl = parseFloat(formData.waterLevel);
    if (isNaN(waterLvl) || waterLvl < 0 || waterLvl > 30) {
      newErrors.waterLevel = 'Water level (0 - 30 m)';
    }

    const pop = parseFloat(formData.populationDensity);
    if (isNaN(pop) || pop < 0) {
      newErrors.populationDensity = 'Cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsAnalyzing(true);
    setPredictionResult(null);

    // Realistic Mock Prediction Calculation
    setTimeout(() => {
      const rain = parseFloat(formData.rainfall) || 0;
      const discharge = parseFloat(formData.riverDischarge) || 0;
      const waterLvl = parseFloat(formData.waterLevel) || 0;
      const elev = parseFloat(formData.elevation) || 100;
      const hist = parseInt(formData.historicalFloods, 10) || 0;
      const isUrban = formData.landCover === 'Urban';
      const isClay = formData.soilType === 'Clay' || formData.soilType === 'Peat';

      let score = 0;
      score += Math.min(40, (rain / 250) * 40);
      score += Math.min(25, (discharge / 4500) * 25);
      score += Math.min(25, (waterLvl / 9.0) * 25);
      if (elev < 100) score += 10;
      else if (elev > 1000) score -= 15;
      if (hist === 1) score += 5;
      if (isUrban) score += 5;
      if (isClay) score += 5;

      const probability = Math.min(96, Math.max(8, Math.round(score)));

      let riskLevel = 'LOW';
      let recommendation = '';
      if (probability >= 85) {
        riskLevel = 'CRITICAL';
        recommendation =
          'CRITICAL FLOOD DANGER: Impending channel overspill detected. Immediate evacuation of low-lying floodplains is strongly advised. Follow local NDRF and emergency directives.';
      } else if (probability >= 65) {
        riskLevel = 'HIGH';
        recommendation =
          'HIGH RISK: Exercise caution and monitor local emergency guidance. Consider moving valuable assets and vulnerable residents to higher ground before drainage systems surcharge.';
      } else if (probability >= 35) {
        riskLevel = 'MODERATE';
        recommendation =
          'MODERATE CAUTION: Water levels are elevated. Keep local emergency notifications enabled and inspect flood protection gates.';
      } else {
        riskLevel = 'LOW';
        recommendation =
          'NORMAL BASELINE: Hydro-meteorological readings are within seasonal buffer limits. No immediate inundation hazard detected.';
      }

      setPredictionResult({
        floodProbability: probability,
        riskLevel,
        modelConfidence: Math.floor(84 + Math.random() * 8),
        recommendation,
        timestamp: new Date().toISOString(),
        isMock: true
      });

      setIsAnalyzing(false);
    }, 600);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setPredictionResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div>
        <SectionTitle
          badge="Predictive Inundation Engine"
          title="Flood Risk Prediction"
          subtitle="Provide environmental and geographic conditions to estimate flood risk using calibrated simulation models."
        />

        {/* Integration Status Notice */}
        <SimulationBanner
          title="SIMULATION INTERFACE &bull; CALIBRATED MODEL DEMO"
          message="Parameters reflect the 13 raw India dataset features. Inundation probabilities are computed using a calibrated simulation algorithm while trained XGBoost / LightGBM models are prepared in Python."
          variant="orange"
        />
      </div>

      {/* Benchmark Presets */}
      <div className="rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#C084FC]" />
            Quick Benchmark Scenarios
          </span>
          <span className="text-[#71717A] font-mono text-[11px]">Click to auto-populate parameters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mockSampleScenarios.map((scen) => (
            <button
              key={scen.id}
              type="button"
              onClick={() => loadScenario(scen)}
              className="text-left p-3.5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] hover:border-[#8B5CF6]/40 hover:bg-[#1D2030] transition-all group cursor-pointer"
            >
              <div className="text-xs font-bold text-white group-hover:text-[#A78BFA] transition-colors font-mono">
                {scen.title}
              </div>
              <p className="text-[11px] text-[#A1A1AA] mt-1 leading-snug">
                {scen.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: 4-Group Form on Left / Result on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container with 4 Grouped Cards */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GROUP 1: Location */}
            <div className="rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-6 space-y-4 hover:border-[#8B5CF6]/25 transition-all">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
                <div className="p-2 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA]">
                  <MapPin size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    1. Geographic Location & Topography
                  </h3>
                  <p className="text-[11px] text-[#A1A1AA]">Spatial telemetry and terrain elevation</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Latitude (°N) <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    placeholder="e.g. 19.0760"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all placeholder:text-[#71717A]"
                  />
                  {errors.latitude && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.latitude}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Longitude (°E) <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    placeholder="e.g. 72.8777"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all placeholder:text-[#71717A]"
                  />
                  {errors.longitude && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.longitude}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Elevation (m) <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="elevation"
                    value={formData.elevation}
                    onChange={handleInputChange}
                    placeholder="e.g. 142.0"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all placeholder:text-[#71717A]"
                  />
                  {errors.elevation && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.elevation}</p>
                  )}
                </div>
              </div>
            </div>

            {/* GROUP 2: Weather */}
            <div className="rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-6 space-y-4 hover:border-[#8B5CF6]/25 transition-all">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
                <div className="p-2 rounded-xl bg-[#C084FC]/15 text-[#C084FC]">
                  <CloudRain size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    2. Meteorological Conditions
                  </h3>
                  <p className="text-[11px] text-[#A1A1AA]">Precipitation and atmospheric state</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Rainfall (mm) <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleInputChange}
                    placeholder="0 - 300 mm"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC]/50 transition-all placeholder:text-[#71717A]"
                  />
                  {errors.rainfall && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.rainfall}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Temperature (°C) <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    placeholder="15 - 45 °C"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC]/50 transition-all placeholder:text-[#71717A]"
                  />
                  {errors.temperature && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.temperature}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Humidity (%) <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleInputChange}
                    placeholder="20 - 100 %"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC]/50 transition-all placeholder:text-[#71717A]"
                  />
                  {errors.humidity && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.humidity}</p>
                  )}
                </div>
              </div>
            </div>

            {/* GROUP 3: Hydrology */}
            <div className="rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-6 space-y-4 hover:border-[#8B5CF6]/25 transition-all">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
                <div className="p-2 rounded-xl bg-[#F97316]/15 text-[#FB923C]">
                  <Waves size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    3. Hydrological Factors
                  </h3>
                  <p className="text-[11px] text-[#A1A1AA]">River flow velocity and channel heights</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    River Discharge (m³/s) <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="riverDischarge"
                    value={formData.riverDischarge}
                    onChange={handleInputChange}
                    placeholder="0 - 5000 m³/s"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/50 transition-all placeholder:text-[#71717A]"
                  />
                  {errors.riverDischarge && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.riverDischarge}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Water Level (m) <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="waterLevel"
                    value={formData.waterLevel}
                    onChange={handleInputChange}
                    placeholder="0 - 10 m"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/50 transition-all placeholder:text-[#71717A]"
                  />
                  {errors.waterLevel && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.waterLevel}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Historical Floods <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <select
                    name="historicalFloods"
                    value={formData.historicalFloods}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/50 transition-all"
                  >
                    <option value="1">1 — Documented Prior Floods</option>
                    <option value="0">0 — No Prior Flood Record</option>
                  </select>
                </div>
              </div>
            </div>

            {/* GROUP 4: Environment */}
            <div className="rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-6 space-y-4 hover:border-[#8B5CF6]/25 transition-all">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
                <div className="p-2 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA]">
                  <Layers size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    4. Land, Soil & Demographics
                  </h3>
                  <p className="text-[11px] text-[#A1A1AA]">Surface retention and population exposure</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Land Cover <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <select
                    name="landCover"
                    value={formData.landCover}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all"
                  >
                    {LAND_COVER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Soil Type <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all"
                  >
                    {SOIL_TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Population Density <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="populationDensity"
                    value={formData.populationDensity}
                    onChange={handleInputChange}
                    placeholder="e.g. 5000"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all placeholder:text-[#71717A]"
                  />
                  {errors.populationDensity && (
                    <p className="text-[10px] text-[#FF4D6D] mt-1 font-mono">{errors.populationDensity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Infrastructure <span className="text-[#FF4D6D]">*</span>
                  </label>
                  <select
                    name="infrastructure"
                    value={formData.infrastructure}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all"
                  >
                    <option value="1">1 — Reinforced</option>
                    <option value="0">0 — Weak/None</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5)] disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono">Processing 13 Hydro-Meteorological Features...</span>
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    <span>Analyze Flood Risk</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-4 rounded-2xl bg-[#171925] hover:bg-[#1D2030] text-[#A1A1AA] hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                title="Reset Parameters"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Prediction Result Column */}
        <div className="lg:col-span-5 space-y-6">
          {predictionResult ? (
            <PredictionCard result={predictionResult} onReset={handleReset} />
          ) : (
            <div className="rounded-3xl bg-[#171925]/60 backdrop-blur-md border border-dashed border-white/10 p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A78BFA] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <BrainCircuit size={32} />
              </div>
              <h4 className="text-base font-bold text-white">AI Inference Engine Standing By</h4>
              <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto leading-relaxed">
                Configure your 13 environmental parameters or choose a benchmark scenario above, then execute <strong>Analyze Flood Risk</strong> to simulate threat classification.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#71717A]">
                Awaiting input telemetry vectors...
              </div>
            </div>
          )}

          {/* Feature Guide Info */}
          <div className="rounded-3xl bg-[#171925] border border-white/[0.08] p-5 space-y-3 text-xs text-[#A1A1AA]">
            <div className="flex items-center gap-2 font-mono text-white text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} className="text-[#8B5CF6]" />
              <span>Hydrological Validation Rules</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
              <li><strong>Rainfall Accumulation:</strong> Drives flash and pluvial surface water ponding.</li>
              <li><strong>River Discharge:</strong> Primary fluvial capacity marker for riparian basins.</li>
              <li><strong>Elevation & Land Cover:</strong> Determines low-gradient runoff retention.</li>
              <li><strong>Soil Permeability:</strong> Silt/clay accelerate surface runoff vs sandy soils.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
