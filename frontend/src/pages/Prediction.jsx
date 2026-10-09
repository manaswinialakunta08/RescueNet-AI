import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  RotateCcw,
  MapPin,
  CloudRain,
  Waves,
  Thermometer,
  Droplets,
  ChevronRight,
  Sliders,
  ArrowRight
} from 'lucide-react';
import PredictionCard from '../components/PredictionCard';
import SimulationBanner from '../components/SimulationBanner';
import { mockSampleScenarios } from '../data/mockData';

const INITIAL_FORM_STATE = {
  location: 'Hyderabad, Telangana',
  latitude: '17.3850',
  longitude: '78.4867',
  elevation: '505.0',
  rainfall: '248.0',
  temperature: '28.5',
  humidity: '88.0',
  riverDischarge: '3840.0',
  waterLevel: '7.4',
  historicalFloods: '1',
  landCover: 'Urban',
  soilType: 'Clay',
  populationDensity: '7250',
  infrastructure: '1'
};

const DEFAULT_PREDICTION = {
  floodProbability: 82,
  riskLevel: 'HIGH',
  modelConfidence: 89,
  recommendation:
    'HIGH FLOOD RISK: Elevated water volume detected across Musi River basin. Low-lying urban sectors and floodplains face imminent inundation. Coordinate immediate safe ground relocation and monitor drainage barriers.',
  timestamp: new Date().toISOString(),
  location: 'Hyderabad, Telangana',
  isMock: true
};

export default function Prediction() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(DEFAULT_PREDICTION);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const loadScenario = (scenario) => {
    setFormData({
      ...INITIAL_FORM_STATE,
      ...scenario.data,
      location: scenario.name
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    const rain = parseFloat(formData.rainfall);
    if (isNaN(rain) || rain < 0 || rain > 1000) {
      newErrors.rainfall = 'Rainfall (0 - 1000 mm)';
    }

    const waterLvl = parseFloat(formData.waterLevel);
    if (isNaN(waterLvl) || waterLvl < 0 || waterLvl > 30) {
      newErrors.waterLevel = 'Water level (0 - 30 m)';
    }

    const temp = parseFloat(formData.temperature);
    if (isNaN(temp) || temp < -10 || temp > 60) {
      newErrors.temperature = 'Temperature (-10°C - 60°C)';
    }

    const hum = parseFloat(formData.humidity);
    if (isNaN(hum) || hum < 0 || hum > 100) {
      newErrors.humidity = 'Humidity (0% - 100%)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const rain = parseFloat(formData.rainfall) || 0;
      const discharge = parseFloat(formData.riverDischarge) || 0;
      const waterLvl = parseFloat(formData.waterLevel) || 0;
      const elev = parseFloat(formData.elevation) || 100;
      const isUrban = formData.landCover === 'Urban';
      const isClay = formData.soilType === 'Clay' || formData.soilType === 'Peat';

      let score = 0;
      score += Math.min(45, (rain / 250) * 45);
      score += Math.min(25, (discharge / 4500) * 25);
      score += Math.min(25, (waterLvl / 8.5) * 25);
      if (elev < 100) score += 10;
      else if (elev > 1000) score -= 15;
      if (isUrban) score += 5;
      if (isClay) score += 5;

      const probability = Math.min(96, Math.max(10, Math.round(score)));

      let riskLevel = 'LOW';
      let recommendation = '';
      if (probability >= 85) {
        riskLevel = 'CRITICAL';
        recommendation =
          'CRITICAL FLOOD DANGER: Impending channel overspill detected. Immediate evacuation of low-lying floodplains is strongly advised. Follow local emergency directives.';
      } else if (probability >= 65) {
        riskLevel = 'HIGH';
        recommendation =
          'HIGH RISK: Water level exceeds warning thresholds. Low-lying zones face severe waterlogging. Coordinate safe relocation and monitor drainage barriers.';
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
        modelConfidence: Math.floor(85 + Math.random() * 8),
        recommendation,
        timestamp: new Date().toISOString(),
        location: formData.location || 'Selected Basin',
        isMock: true
      });

      setIsAnalyzing(false);
    }, 600);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setPredictionResult(DEFAULT_PREDICTION);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F8FAFC]">
      {/* ----------------- BREADCRUMB ----------------- */}
      <nav className="flex items-center gap-2 text-xs text-[#686B7D]">
        <Link to="/" className="hover:text-[#7047E8] transition-colors">
          Home
        </Link>
        <ChevronRight size={13} />
        <span className="font-semibold text-[#17182B]">Flood Prediction</span>
      </nav>

      {/* ----------------- PAGE HEADER ----------------- */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EBFF] text-[#7047E8] text-xs font-semibold mb-2">
          <BrainCircuit size={13} />
          <span>Machine Learning Simulation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17182B] tracking-tight">
          AI Flood Prediction Model
        </h1>
        <p className="text-sm sm:text-base text-[#686B7D] max-w-2xl mt-1.5">
          Enter environmental and geospatial parameters to predict flood probability and generate proactive risk assessments.
        </p>
      </div>

      <SimulationBanner />

      {/* ----------------- 3-COLUMN MAIN LAYOUT ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3-Step Stepper & Preset Scenarios */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stepper Card */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#686B7D] uppercase tracking-wider">
              Workflow Steps
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#7047E8] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#17182B]">Location Details</h4>
                  <p className="text-[11px] text-[#686B7D]">Target basin & coordinates</p>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-[#7047E8]/30 ml-3.5" />

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#7047E8] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#17182B]">Environmental Data</h4>
                  <p className="text-[11px] text-[#686B7D]">Rainfall, river levels, soil</p>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-[#E5E7F0] ml-3.5" />

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#F1EBFF] text-[#7047E8] border border-[#7047E8]/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#17182B]">Prediction Result</h4>
                  <p className="text-[11px] text-[#686B7D]">Risk score & emergency response</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Preset Scenarios */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-[#686B7D] uppercase tracking-wider">
              Load Preset Scenarios
            </h3>
            <p className="text-[11px] text-[#686B7D]">
              Select a benchmark profile to quickly test the ML inference engine:
            </p>

            <div className="space-y-2 pt-1">
              {mockSampleScenarios.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => loadScenario(sc)}
                  className="w-full text-left p-3 rounded-xl border border-[#E5E7F0] hover:border-[#7047E8] bg-[#F8FAFC] hover:bg-[#F1EBFF]/40 transition-all text-xs"
                >
                  <div className="font-bold text-[#17182B] flex items-center justify-between">
                    <span>{sc.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        sc.expectedRisk === 'HIGH'
                          ? 'bg-[#FEF2F2] text-[#E5484D]'
                          : sc.expectedRisk === 'MODERATE'
                          ? 'bg-[#FFFBEB] text-[#E9A23B]'
                          : 'bg-[#ECFDF5] text-[#22A879]'
                      }`}
                    >
                      {sc.expectedRisk}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#686B7D] mt-1 line-clamp-1">{sc.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Form Inputs */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7F0] mb-5">
              <div>
                <h2 className="text-base font-bold text-[#17182B]">Location & Environmental Data</h2>
                <p className="text-xs text-[#686B7D]">Fill in telemetry parameters for inference</p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#686B7D] hover:text-[#17182B] flex items-center gap-1 font-medium"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Location */}
              <div>
                <label className="block text-xs font-semibold text-[#17182B] mb-1">
                  Target Basin / Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#686B7D]">
                    <MapPin size={16} />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5E7F0] bg-[#F8FAFC] focus:bg-white focus:border-[#7047E8] text-xs font-medium text-[#17182B] outline-none transition-colors"
                    placeholder="e.g. Hyderabad, Telangana"
                  />
                </div>
              </div>

              {/* Field 2 & 3: Rainfall & Water Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17182B] mb-1">
                    Rainfall (24h) [mm]
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#686B7D]">
                      <CloudRain size={16} />
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      name="rainfall"
                      value={formData.rainfall}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5E7F0] bg-[#F8FAFC] focus:bg-white focus:border-[#7047E8] text-xs font-medium text-[#17182B] outline-none transition-colors"
                      placeholder="248"
                    />
                  </div>
                  {errors.rainfall && (
                    <p className="text-[11px] text-[#E5484D] mt-1">{errors.rainfall}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17182B] mb-1">
                    Water Level [m]
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#686B7D]">
                      <Waves size={16} />
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      name="waterLevel"
                      value={formData.waterLevel}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5E7F0] bg-[#F8FAFC] focus:bg-white focus:border-[#7047E8] text-xs font-medium text-[#17182B] outline-none transition-colors"
                      placeholder="7.4"
                    />
                  </div>
                  {errors.waterLevel && (
                    <p className="text-[11px] text-[#E5484D] mt-1">{errors.waterLevel}</p>
                  )}
                </div>
              </div>

              {/* Field 4 & 5: Temperature & Humidity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17182B] mb-1">
                    Temperature [°C]
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#686B7D]">
                      <Thermometer size={16} />
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5E7F0] bg-[#F8FAFC] focus:bg-white focus:border-[#7047E8] text-xs font-medium text-[#17182B] outline-none transition-colors"
                      placeholder="28.5"
                    />
                  </div>
                  {errors.temperature && (
                    <p className="text-[11px] text-[#E5484D] mt-1">{errors.temperature}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17182B] mb-1">
                    Humidity [%]
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#686B7D]">
                      <Droplets size={16} />
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      name="humidity"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5E7F0] bg-[#F8FAFC] focus:bg-white focus:border-[#7047E8] text-xs font-medium text-[#17182B] outline-none transition-colors"
                      placeholder="88.0"
                    />
                  </div>
                  {errors.humidity && (
                    <p className="text-[11px] text-[#E5484D] mt-1">{errors.humidity}</p>
                  )}
                </div>
              </div>

              {/* Advanced Parameters Toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-[#7047E8] font-semibold flex items-center gap-1 hover:underline"
                >
                  <Sliders size={13} />
                  <span>{showAdvanced ? 'Hide Advanced ML Features' : 'Configure Additional 8 ML Features'}</span>
                </button>
              </div>

              {/* Advanced Parameters Grid */}
              {showAdvanced && (
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7F0] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#17182B] mb-1">
                        River Discharge (m³/s)
                      </label>
                      <input
                        type="number"
                        name="riverDischarge"
                        value={formData.riverDischarge}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-[#E5E7F0] bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#17182B] mb-1">
                        Elevation (m)
                      </label>
                      <input
                        type="number"
                        name="elevation"
                        value={formData.elevation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-[#E5E7F0] bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#17182B] mb-1">
                        Land Cover
                      </label>
                      <select
                        name="landCover"
                        value={formData.landCover}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-[#E5E7F0] bg-white text-xs"
                      >
                        <option value="Urban">Urban</option>
                        <option value="Agricultural">Agricultural</option>
                        <option value="Forest">Forest</option>
                        <option value="Water Body">Water Body</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#17182B] mb-1">
                        Soil Type
                      </label>
                      <select
                        name="soilType"
                        value={formData.soilType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-[#E5E7F0] bg-white text-xs"
                      >
                        <option value="Clay">Clay</option>
                        <option value="Loam">Loam</option>
                        <option value="Sandy">Sandy</option>
                        <option value="Silt">Silt</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#7047E8] hover:bg-[#5E35D1] text-white font-semibold text-sm shadow-md shadow-[#7047E8]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Computing Hydrological Risk...</span>
                    </>
                  ) : (
                    <>
                      <span>Predict Flood Risk</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Prediction Result Card (Panel 2) */}
        <div className="lg:col-span-4">
          <PredictionCard result={predictionResult} inputData={formData} />
        </div>
      </div>
    </div>
  );
}
