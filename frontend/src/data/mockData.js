// MOCK DATA — will be replaced by backend/API integration later
// RescueNet-AI: Flood Prediction & Smart Disaster Response Platform

export const mockRiskLevels = {
  LOW: {
    label: 'LOW',
    color: '#34D399',
    bgColor: 'rgba(52, 211, 153, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.35)',
    textColor: 'text-emerald-400',
    description: 'Minimal flood risk. Environmental parameters are within seasonal baselines.',
    range: '0% - 30% Probability',
    leadTime: 'Nominal Surveillance',
    action: 'Standard drainage maintenance'
  },
  MODERATE: {
    label: 'MODERATE',
    color: '#FBBF24',
    bgColor: 'rgba(251, 191, 36, 0.12)',
    borderColor: 'rgba(251, 191, 36, 0.35)',
    textColor: 'text-amber-400',
    description: 'Elevated moisture and water levels. Close monitoring of low-lying basins advised.',
    range: '31% - 65% Probability',
    leadTime: '6 - 12 Hour Window',
    action: 'Protect low-lying equipment'
  },
  HIGH: {
    label: 'HIGH',
    color: '#F97316',
    bgColor: 'rgba(249, 115, 22, 0.15)',
    borderColor: 'rgba(249, 115, 22, 0.40)',
    textColor: 'text-orange-400',
    description: 'Significant flood probability. Inundation likely in floodplains and urban zones.',
    range: '66% - 85% Probability',
    leadTime: '3 - 6 Hour Lead Time',
    action: 'Safe ground relocation'
  },
  CRITICAL: {
    label: 'CRITICAL',
    color: '#FF4D6D',
    bgColor: 'rgba(255, 77, 109, 0.15)',
    borderColor: 'rgba(255, 77, 109, 0.45)',
    textColor: 'text-rose-400',
    description: 'Severe flood danger imminent. Emergency response and evacuation protocols active.',
    range: '86% - 100% Probability',
    leadTime: '< 3 Hour Window',
    action: 'Mandatory evacuation'
  }
};

export const mockDashboardStats = {
  currentRisk: 'HIGH',
  floodProbability: 82,
  rainfall24h: 174.2,
  riverDischarge: 3410,
  activeStations: 48,
  activeAlerts: 6,
  modelConfidence: 87,
  lastUpdated: 'Just now'
};

export const mockLiveTelemetry = {
  floodProbability: 82,
  riskLevel: 'HIGH',
  rainfall: '248 mm',
  waterLevel: '7.4 m',
  riverDischarge: '3,842 m³/s',
  confidence: '89%',
  stationName: 'Ganges Basin Node #4 (Patna Corridor)',
  status: 'Inundation Warning Active'
};

export const mockWhyItems = [
  {
    title: 'Rapid Monsoon Cloudbursts',
    description: 'Climate anomalies cause unprecedented high-intensity rainfall over compressed timescales, overwhelming traditional storm drainage in minutes.',
    stat: '4.2x',
    statLabel: 'Frequency of Flash Inundations'
  },
  {
    title: 'Critical Evacuation Windows',
    description: 'Conventional flood warnings arrive too late. Predictive AI extends actionable lead time by 3 to 6 critical hours for early warning sirens.',
    stat: '3-6h',
    statLabel: 'Earlier Warning Window'
  },
  {
    title: 'High-Density Lowland Exposure',
    description: 'Over 40 million citizens in Indian river catchments live in vulnerable riparian and deltaic zones requiring granular geospatial risk modeling.',
    stat: '40M+',
    statLabel: 'Citizens in Basin Floodplains'
  }
];

export const mockEnvironmentalSummary = [
  {
    id: 'rainfall',
    title: 'Precipitation (24h)',
    value: '174.2',
    unit: 'mm',
    status: 'High Accumulation',
    trend: '+18.4% vs 24h baseline',
    isPositiveTrend: false,
    severity: 'high'
  },
  {
    id: 'temperature',
    title: 'Ambient Temperature',
    value: '27.8',
    unit: '°C',
    status: 'Monsoon Normal',
    trend: '-1.2°C past 12h',
    isPositiveTrend: true,
    severity: 'normal'
  },
  {
    id: 'humidity',
    title: 'Atmospheric Humidity',
    value: '89.4',
    unit: '%',
    status: 'Near Saturation',
    trend: '+5.1% since dawn',
    isPositiveTrend: false,
    severity: 'warning'
  },
  {
    id: 'water_level',
    title: 'River Water Level',
    value: '7.85',
    unit: 'm',
    status: '0.65m Below Danger Mark',
    trend: '+0.42 m/hr rise',
    isPositiveTrend: false,
    severity: 'critical'
  }
];

export const mockTrendData = [
  { time: '00:00', probability: 45, rainfall: 42, discharge: 1600 },
  { time: '04:00', probability: 52, rainfall: 65, discharge: 1950 },
  { time: '08:00', probability: 61, rainfall: 98, discharge: 2400 },
  { time: '12:00', probability: 74, rainfall: 145, discharge: 2980 },
  { time: '16:00', probability: 82, rainfall: 174, discharge: 3410 },
  { time: '20:00 (Est)', probability: 85, rainfall: 190, discharge: 3650 },
  { time: '24:00 (Est)', probability: 79, rainfall: 160, discharge: 3500 }
];

export const mockRecentPredictions = [
  {
    id: 'PRED-1049',
    location: 'Mumbai (Mithi Basin)',
    state: 'Maharashtra',
    coordinates: '19.0760° N, 72.8777° E',
    riskLevel: 'HIGH',
    probability: 82,
    date: '2026-10-08 14:30',
    status: 'Alert Dispatched'
  },
  {
    id: 'PRED-1048',
    location: 'Guwahati (Brahmaputra)',
    state: 'Assam',
    coordinates: '26.1445° N, 91.7362° E',
    riskLevel: 'CRITICAL',
    probability: 91,
    date: '2026-10-08 12:15',
    status: 'Evacuation Advisory'
  },
  {
    id: 'PRED-1047',
    location: 'Patna (Gangetic Basin)',
    state: 'Bihar',
    coordinates: '25.5941° N, 85.1376° E',
    riskLevel: 'MODERATE',
    probability: 58,
    date: '2026-10-08 10:45',
    status: 'Active Watch'
  },
  {
    id: 'PRED-1046',
    location: 'Hyderabad (Musi Basin)',
    state: 'Telangana',
    coordinates: '17.3850° N, 78.4867° E',
    riskLevel: 'LOW',
    probability: 24,
    date: '2026-10-08 08:20',
    status: 'Normal Telemetry'
  },
  {
    id: 'PRED-1045',
    location: 'Chennai (Adyar Basin)',
    state: 'Tamil Nadu',
    coordinates: '13.0827° N, 80.2707° E',
    riskLevel: 'MODERATE',
    probability: 61,
    date: '2026-10-07 19:10',
    status: 'Advisory Active'
  },
  {
    id: 'PRED-1044',
    location: 'Kolkata (Hooghly Delta)',
    state: 'West Bengal',
    coordinates: '22.5726° N, 88.3639° E',
    riskLevel: 'HIGH',
    probability: 78,
    date: '2026-10-07 16:00',
    status: 'Sluice Gates Opened'
  }
];

export const mockRiskLocations = [
  {
    id: 'LOC-01',
    name: 'Guwahati',
    state: 'Assam',
    basin: 'Brahmaputra Basin',
    lat: 26.1445,
    lng: 91.7362,
    riskLevel: 'CRITICAL',
    probability: 91,
    waterLevel: 9.2,
    rainfall: 284.5,
    discharge: 4620,
    elevation: 54,
    advisory: 'River running 1.2m above danger level. Evacuation recommended in lowlands.'
  },
  {
    id: 'LOC-02',
    name: 'Mumbai',
    state: 'Maharashtra',
    basin: 'Mithi & Coastal Basins',
    lat: 19.0760,
    lng: 72.8777,
    riskLevel: 'HIGH',
    probability: 82,
    waterLevel: 7.85,
    rainfall: 235.4,
    discharge: 3840,
    elevation: 14,
    advisory: 'High tide coincides with persistent heavy precipitation. Surcharge risk.'
  },
  {
    id: 'LOC-03',
    name: 'Kolkata',
    state: 'West Bengal',
    basin: 'Hooghly / Sundarbans Delta',
    lat: 22.5726,
    lng: 88.3639,
    riskLevel: 'HIGH',
    probability: 78,
    waterLevel: 7.10,
    rainfall: 195.0,
    discharge: 3510,
    elevation: 9,
    advisory: 'Tidal backflow reported in drainage canals. Pump stations on high duty.'
  },
  {
    id: 'LOC-04',
    name: 'Patna',
    state: 'Bihar',
    basin: 'Mid-Gangetic Basin',
    lat: 25.5941,
    lng: 85.1376,
    riskLevel: 'MODERATE',
    probability: 58,
    waterLevel: 5.40,
    rainfall: 145.2,
    discharge: 2680,
    elevation: 53,
    advisory: 'Continuous inflow from upstream tributaries. River embankment inspected.'
  },
  {
    id: 'LOC-05',
    name: 'Chennai',
    state: 'Tamil Nadu',
    basin: 'Adyar & Cooum Basins',
    lat: 13.0827,
    lng: 80.2707,
    riskLevel: 'MODERATE',
    probability: 61,
    waterLevel: 4.90,
    rainfall: 110.8,
    discharge: 2150,
    elevation: 7,
    advisory: 'Chembarambakkam reservoir release monitored. Low-lying watch active.'
  },
  {
    id: 'LOC-06',
    name: 'Hyderabad',
    state: 'Telangana',
    basin: 'Musi River Catchment',
    lat: 17.3850,
    lng: 78.4867,
    riskLevel: 'LOW',
    probability: 24,
    waterLevel: 2.80,
    rainfall: 42.0,
    discharge: 850,
    elevation: 542,
    advisory: 'Catchment inflow normal. Reservoirs holding sufficient buffer capacity.'
  },
  {
    id: 'LOC-07',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    basin: 'Ganges River Basin',
    lat: 25.3176,
    lng: 82.9739,
    riskLevel: 'MODERATE',
    probability: 52,
    waterLevel: 4.60,
    rainfall: 98.4,
    discharge: 1980,
    elevation: 80,
    advisory: 'Ghat steps partially submerged. Boat movements restricted as precaution.'
  },
  {
    id: 'LOC-08',
    name: 'Kochi',
    state: 'Kerala',
    basin: 'Periyar River Basin',
    lat: 9.9312,
    lng: 76.2673,
    riskLevel: 'HIGH',
    probability: 74,
    waterLevel: 6.80,
    rainfall: 212.0,
    discharge: 3340,
    elevation: 4,
    advisory: 'Dam shutter opening triggered alert across downstream coastal settlements.'
  }
];

export const mockSampleScenarios = [
  {
    id: 'monsoon_critical',
    title: 'Severe Monsoon Inundation (High Risk)',
    description: 'Cloudburst rainfall, peak river discharge, high water level in low-lying delta.',
    data: {
      latitude: '19.0760',
      longitude: '72.8777',
      rainfall: '248.5',
      temperature: '26.4',
      humidity: '94.2',
      riverDischarge: '4250.0',
      waterLevel: '8.45',
      elevation: '45.0',
      landCover: 'Urban',
      soilType: 'Clay',
      populationDensity: '8900',
      infrastructure: '1',
      historicalFloods: '1'
    }
  },
  {
    id: 'moderate_transitional',
    title: 'Moderate Upstream Swell',
    description: 'Consistent monsoon rain with elevated discharge in agricultural floodplain.',
    data: {
      latitude: '25.5941',
      longitude: '85.1376',
      rainfall: '138.0',
      temperature: '29.5',
      humidity: '72.0',
      riverDischarge: '2450.0',
      waterLevel: '5.20',
      elevation: '180.0',
      landCover: 'Agricultural',
      soilType: 'Loam',
      populationDensity: '4200',
      infrastructure: '1',
      historicalFloods: '1'
    }
  },
  {
    id: 'normal_dry',
    title: 'Dry Season Baseline (Low Risk)',
    description: 'Nominal rainfall, safe river discharge, elevated terrain.',
    data: {
      latitude: '17.3850',
      longitude: '78.4867',
      rainfall: '18.5',
      temperature: '32.1',
      humidity: '41.0',
      riverDischarge: '620.0',
      waterLevel: '1.95',
      elevation: '550.0',
      landCover: 'Forest',
      soilType: 'Sandy',
      populationDensity: '1850',
      infrastructure: '0',
      historicalFloods: '0'
    }
  }
];

export const mockDisasterContacts = [
  {
    name: 'National Disaster Response Force (NDRF)',
    type: 'National Rapid Response',
    phone: '011-24363260 / 9711077372',
    description: 'Specialized force for rescue operations during major flooding and natural calamities.',
    availability: '24/7 Operations Room',
    badge: 'Central Force'
  },
  {
    name: 'State Disaster Management Authority (SDMA)',
    type: 'State Emergency Operations',
    phone: '1070 (State Control Room)',
    description: 'Coordinates state-level emergency mitigation, shelter allocations, and relief logistics.',
    availability: 'Toll-free 24/7',
    badge: 'State Agency'
  },
  {
    name: 'District Disaster Emergency Helpline',
    type: 'Local Response',
    phone: '1077 (District Control)',
    description: 'Local administration control room for boats, rescue squads, and emergency evacuation.',
    availability: '24/7 Hotlines',
    badge: 'Local Control'
  },
  {
    name: 'Central Water Commission (CWC) Flood Cell',
    type: 'Hydrological Advisory',
    phone: '011-26106523',
    description: 'Official river basin telemetry, dam release notifications, and flood stage bulletins.',
    availability: '06:00 - 22:00 IST',
    badge: 'Technical Agency'
  },
  {
    name: 'National Emergency Ambulance Service',
    type: 'Medical Relief',
    phone: '108 / 112',
    description: 'Medical transport, casualty triage, and mobile emergency trauma support.',
    availability: '24/7 Emergency',
    badge: 'Medical'
  },
  {
    name: 'Indian Red Cross Disaster Relief',
    type: 'Humanitarian Assistance',
    phone: '011-23716441',
    description: 'Safe drinking water supply, temporary shelters, dry rations, and hygiene kits.',
    availability: 'Day & Night Shifts',
    badge: 'NGO / Relief'
  }
];

export const mockSafetyChecklist = [
  { id: 1, text: 'Emergency "Go-Bag" prepared with waterproof sealing', defaultChecked: true },
  { id: 2, text: 'Government photo IDs and critical documents secured in dry bags', defaultChecked: true },
  { id: 3, text: 'Mobile phones and auxiliary power banks charged to 100%', defaultChecked: false },
  { id: 4, text: 'Minimum 3-day potable drinking water (3L per person/day) stored', defaultChecked: false },
  { id: 5, text: 'Prescription medications and basic first-aid supplies packed', defaultChecked: true },
  { id: 6, text: 'Family evacuation route & elevated rally point agreed upon', defaultChecked: false },
  { id: 7, text: 'Main electrical breaker and gas connections turned off before evacuation', defaultChecked: false },
  { id: 8, text: 'Local emergency broadcast radio / battery receiver tested', defaultChecked: false }
];

export const mockChatInitialMessages = [
  {
    id: 1,
    sender: 'assistant',
    text: 'Hello. I am the RescueNet AI Assistant. I provide operational guidance on flood risk, preparedness protocols, and emergency response actions. How can I assist your team today?',
    time: '10:00 AM'
  },
  {
    id: 2,
    sender: 'user',
    text: 'What should I do if flood risk is high in my neighborhood?',
    time: '10:01 AM'
  },
  {
    id: 3,
    sender: 'assistant',
    text: 'If flood risk reaches HIGH or authorities issue warnings, follow these steps immediately:\n\n1. Move to higher ground or upper floors; avoid basements and underground structures.\n2. Disconnect electrical mains and gas supply valves.\n3. Never walk, swim, or drive through flooded roadways — 15 cm of moving water can knock you down, and 30 cm can float vehicles.\n4. Keep emergency kit and communication devices close at hand.\n5. Follow evacuation announcements from the State Disaster Management Authority.',
    time: '10:01 AM'
  }
];

export const mockKnowledgeBase = [
  {
    keywords: ['prepare', 'preparation', 'how can i prepare for a flood'],
    answer: 'To prepare effectively before floodwaters rise:\n• Identify elevated community rally points and safe evacuation corridors away from low-lying culverts.\n• Assemble a sealed waterproof "Go-Bag" with 72 hours of water, ready-to-eat rations, and first-aid supplies.\n• Protect essential identification, property deeds, and medical prescriptions in airtight dry bags.\n• Inspect household drainage traps and elevate ground-floor electronics and valuable items.'
  },
  {
    keywords: ['score', 'high flood-risk score', 'what does a high flood-risk score mean', 'meaning', 'threshold'],
    answer: 'A HIGH flood-risk score (66% - 85% probability) indicates:\n• Runoff volume is approaching or exceeding local stormwater drainage absorption capacity.\n• Upstream river discharge and rainfall accumulation are significantly above historical safe margins.\n• Low-lying floodplains, basements, and underpasses face imminent waterlogging within 3 to 6 hours.\n• Operational Recommendation: Stage emergency evacuation equipment and prepare to relocate vulnerable family members.'
  },
  {
    keywords: ['heavy rainfall', 'what should i do during heavy rainfall', 'rain', 'downpour', 'cloudburst'],
    answer: 'During periods of torrential downpours and heavy rainfall:\n• Stay indoors and avoid basement levels or underground transit hubs.\n• Never attempt to drive or walk through flooded streets — just 15 cm of moving water can sweep an adult off their feet.\n• Disconnect high-voltage household electrical appliances and turn off LPG gas valves.\n• Continuously monitor local district disaster management alerts (SDMA/NDRF) on battery-operated radios or mobile networks.'
  },
  {
    keywords: ['communities', 'reduce flood damage', 'how can communities reduce flood damage', 'infrastructure', 'prevention'],
    answer: 'Communities can systematically mitigate flood devastation through:\n• Preserving natural wetland buffer zones and restoring urban water retention ponds.\n• Upgrading storm drainage networks and installing non-return backflow valves on coastal sluices.\n• Implementing granular sensor-based early warning networks and community flood barrier programs.\n• Enforcing strict zoning regulations preventing unauthorized construction on designated riparian floodplains.'
  },
  {
    keywords: ['evacuate', 'evacuation', 'leave', 'escape'],
    answer: 'When an evacuation advisory is issued:\n• Pack only essential supplies (medication, documents, water).\n• Disconnect home utilities (power, gas, water main).\n• Follow designated evacuation corridors; avoid shortcuts near canals or culverts.\n• Register at your local designated evacuation shelter to enable tracking.'
  },
  {
    keywords: ['kit', 'supplies', 'bag', 'go-bag', 'food'],
    answer: 'A standard flood emergency kit should contain:\n• 3-day supply of drinking water (3L/person/day) & non-perishable foods.\n• First-aid kit, waterproof flashlight, and extra batteries.\n• Whistle to signal rescue teams.\n• Waterproof pouch with ID cards, property deeds, and insurance copies.\n• Power bank, charging cables, and essential prescription medications.'
  },
  {
    keywords: ['discharge', 'river', 'water level', 'cwc'],
    answer: 'Elevated river discharge (>3,000 m³/s) and rising water levels indicate substantial upstream runoff. Residents in riparian floodplains should observe river gauge markers and prepare for channel overspill within 2 to 6 hours.'
  },
  {
    keywords: ['vehicle', 'car', 'driving', 'road'],
    answer: 'Rule of thumb: "Turn Around, Don\'t Drown."\n• More than half of flood-related fatalities occur in vehicles.\n• Just 30 cm (1 foot) of rushing water can sweep a passenger car away.\n• Hidden sinkholes, washed-out roads, and live electrical wires often lurk under murky floodwaters.'
  }
];

export const mockRiskDistribution = {
  total: 48,
  low: { count: 24, percent: 50 },
  moderate: { count: 14, percent: 29 },
  high: { count: 7, percent: 15 },
  critical: { count: 3, percent: 6 }
};

export const mockEssentialSupplies = [
  { category: 'Hydration & Food', items: ['Potable Water (3L/person/day for 3 days)', 'High-calorie non-perishable rations', 'Manual can opener & disposable utensils'] },
  { category: 'Medical & Sanitation', items: ['7-day supply of prescription medications', 'First-aid kit (gauze, antiseptic, burn cream)', 'Water purification tablets & hand sanitizer'] },
  { category: 'Power & Communication', items: ['Auxiliary 20,000mAh waterproof power bank', 'Battery-operated emergency radio', 'Heavy-duty LED flashlight & spare batteries'] },
  { category: 'Safety & Documentation', items: ['High-pitch emergency rescue whistle', 'Airtight waterproof pouch for national IDs & deeds', 'Sturdy non-slip rubber boots & thermal emergency blankets'] }
];

export const mockCapabilities = [
  {
    title: 'AI Flood Prediction',
    description: 'Multi-parameter machine learning models assess hydrological and meteorological factors to predict inundation probability.',
    icon: 'BrainCircuit',
    badge: 'Core ML Model',
    highlight: '85%+ Accuracy Target'
  },
  {
    title: 'Geospatial Risk Monitoring',
    description: 'Spatial risk mapping pinpointing vulnerable lowlands, urban drainage corridors, and coastal catchments across India.',
    icon: 'MapPin',
    badge: 'Geospatial Intelligence',
    highlight: 'WGS84 Coordinate Grid'
  },
  {
    title: 'Environmental Intelligence',
    description: 'Holistic synthesis of topography, soil porosity, land cover, and population density for defensible decision support.',
    icon: 'Layers',
    badge: 'Telemetry Matrix',
    highlight: '13 Raw Dataset Vectors'
  },
  {
    title: 'Smart Disaster Response',
    description: 'Actionable emergency guidance, localized checklists, and pre-configured communication matrices for rapid deployment.',
    icon: 'ShieldAlert',
    badge: 'SOP Automation',
    highlight: 'NDMA Standard Aligned'
  },
  {
    title: 'Explainable AI (SHAP)',
    description: 'Transparent feature attribution showing emergency personnel exactly which meteorological factors caused the surge.',
    icon: 'Cpu',
    badge: 'Interpretability',
    highlight: 'SHAP Waterfall Analysis'
  },
  {
    title: 'AI Emergency Assistant',
    description: 'Interactive natural language guidance offering immediate flood safety protocols, preparedness steps, and evacuation procedures.',
    icon: 'Bot',
    badge: 'Decision Support',
    highlight: '24/7 Protocol Advisor'
  }
];

export const mockWorkflowSteps = [
  {
    step: '01',
    title: 'Environmental Data',
    description: 'Telemetry collected across precipitation gauges, upstream river velocity sensors, and satellite land cover indices.',
    icon: 'CloudRain',
    tag: 'Raw Ingestion'
  },
  {
    step: '02',
    title: 'Data Processing',
    description: 'Feature validation, normalization, and outlier detection across physical hydrological and terrain boundaries.',
    icon: 'Sliders',
    tag: 'ETL Pipeline'
  },
  {
    step: '03',
    title: 'Machine Learning',
    description: 'Trained binary classification models evaluate localized flood probability against historical hazard patterns.',
    icon: 'Cpu',
    tag: 'Ensemble Models'
  },
  {
    step: '04',
    title: 'Flood Risk Prediction',
    description: 'Risk categorisation into Low, Moderate, High, or Critical threat bands based on calibrated probability thresholds.',
    icon: 'Gauge',
    tag: 'Inference Engine'
  },
  {
    step: '05',
    title: 'Smart Response',
    description: 'Automated operational recommendations, resource positioning, and emergency advisories triggered.',
    icon: 'LifeBuoy',
    tag: 'Disaster Ops'
  }
];
