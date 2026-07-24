export const OCEAN_ZONES = [
  {
    id: 'surface',
    name: 'Sunlit Surface Zone',
    depthMin: 0,
    depthMax: 200,
    tempRange: '20°C - 26°C',
    pressureRange: '1.0 - 21.0 atm',
    oxygenRange: '98% - 100%',
    color: '#0284c7',
    tagline: 'Where light dances on gentle waves',
    description: 'The topmost layer of the ocean receiving natural sunlight. Teeming with vibrant coral reefs, sea turtles, and glowing schools of fish.',
    lightLevel: '100% Penetration'
  },
  {
    id: 'twilight',
    name: 'Twilight Zone (Mesopelagic)',
    depthMin: 200,
    depthMax: 1000,
    tempRange: '4°C - 15°C',
    pressureRange: '21 - 101 atm',
    oxygenRange: '70% - 90%',
    color: '#0f172a',
    tagline: 'Faint blue shadows & flickering organism lights',
    description: 'Sunlight rapidly decays into intense sapphire hues. Here, bioluminescent jellyfish and siphonophores begin their nightly vertical migration.',
    lightLevel: '1% - 10% Faint Rays'
  },
  {
    id: 'midnight',
    name: 'Midnight Zone (Bathypelagic)',
    depthMin: 1000,
    depthMax: 4000,
    tempRange: '2°C - 4°C',
    pressureRange: '101 - 401 atm',
    oxygenRange: '40% - 65%',
    color: '#070d1b',
    tagline: 'Perpetual darkness illuminated only by living light',
    description: 'Zero solar radiation penetrates this realm. Life creates its own radiance via chemical luciferein reactions. Home to giant squid and anglerfish.',
    lightLevel: '0% (Bioluminescence Only)'
  },
  {
    id: 'abyss',
    name: 'The Abyssal Zone',
    depthMin: 4000,
    depthMax: 6000,
    tempRange: '1°C - 2°C',
    pressureRange: '401 - 601 atm',
    oxygenRange: '30% - 50%',
    color: '#03060c',
    tagline: 'Freezing depths, extreme pressure & ancient geology',
    description: 'Covering 83% of the total ocean floor. Features immense abyssal plains, manganese nodule fields, and towering mineral chimneys.',
    lightLevel: '0% Total Darkness'
  },
  {
    id: 'hadal',
    name: 'The Hadal Trench',
    depthMin: 6000,
    depthMax: 11000,
    tempRange: '1°C - 4°C (Thermal Vents)',
    pressureRange: '601 - 1086 atm',
    oxygenRange: '25% - 40%',
    color: '#010205',
    tagline: 'The final frontier of Earth: Challenger Deep',
    description: 'Narrow oceanic trenches formed by tectonic subduction. Incredible crushing pressure exceeding 8 tons per square inch.',
    lightLevel: '0% Unfathomable Void'
  }
];

export const SUBMARINES = [
  {
    id: 'nautilus-prime',
    name: 'ABYSS Nautilus-X',
    type: 'Ultra-Luxury Deep Explorer',
    maxDepth: '6,000m',
    capacity: '4 VIP Passengers + 2 Crew',
    hullMaterial: 'Titanium-Matrix Sphere (120mm)',
    speed: '4.5 Knots',
    viewports: '360° Spherical Synthetic Sapphire Glass',
    lifeSupport: '96 Hours Redundant Life Support',
    tagline: 'Unmatched panorama with 360-degree crystal clarity.',
    pricePerSeat: '$125,000',
    features: [
      'Sub-surface Acoustic Soundproofing',
      'Champagne & Culinary Tasting Lounge',
      '4K 120fps Deep-Sea Camera Array',
      'Bio-Luminescent Lighting Systems'
    ],
    hotspots: [
      { id: 'hull', name: 'Grade 5 Titanium Sphere', x: 45, y: 35, desc: 'Forged under 50,000 tons of hydraulic pressure to withstand 600 atmospheres.' },
      { id: 'viewport', name: 'Sapphire Crystal Dome', x: 68, y: 48, desc: 'Optical-grade synthetic sapphire with zero distortion under deep pressure.' },
      { id: 'thrusters', name: 'Silent Bio-Mag Thrusters', x: 20, y: 65, desc: 'Zero-vibration electromagnetic propulsion that does not disturb marine life.' },
      { id: 'lights', name: '120,000 Lumen LED Matrix', x: 80, y: 60, desc: 'Custom 450nm wavelength illuminators that reveal hidden ocean colors.' }
    ],
    image: '/src/assets/nautilus_x.png'
  },
  {
    id: 'titan-hadal',
    name: 'Titan IX Hadal Vanguard',
    type: 'Full-Ocean Depth Submersible',
    maxDepth: '11,000m',
    capacity: '2 VIP Passengers + 1 Master Pilot',
    hullMaterial: 'Monolithic Syntactic Foam & Forged Titanium',
    speed: '3.8 Knots',
    viewports: 'Dual Biconical Quartz Viewports',
    lifeSupport: '120 Hours Emergency Oxygen',
    tagline: 'Engineered specifically for the Challenger Deep descent.',
    pricePerSeat: '$250,000',
    features: [
      'Challenger Deep Certified Vessel',
      'Robotic Tele-manipulator Arms',
      'Hydrophone Spatial Audio Recorder',
      'Live Quantum Telemetry Uplink'
    ],
    hotspots: [
      { id: 'hull', name: 'Hyperbaric Shielding', x: 40, y: 30, desc: 'Specialized syntactic foam providing buoyancy and structural protection.' },
      { id: 'viewport', name: 'Quartz Biconical Lens', x: 75, y: 42, desc: 'Calculated index of refraction matched to saltwater at 1,000 bar pressure.' },
      { id: 'thrusters', name: 'High-Torque Vector Engines', x: 18, y: 70, desc: 'Vectoring propulsion allowing precise maneuverability near abyssal walls.' },
      { id: 'lights', name: 'Hydrothermal Thermal Scanner', x: 82, y: 55, desc: 'Infrared & UV multispectral camera to map black smoker temperatures.' }
    ],
    image: '/src/assets/titan_hadal.png'
  },
  {
    id: 'abyssal-voyager',
    name: 'Abyssal Odyssey Lounge',
    type: 'Panoramic Submarine Yacht',
    maxDepth: '3,000m',
    capacity: '8 VIP Guests + 4 Crew',
    hullMaterial: 'Composite Glass & Titanium Alloy',
    speed: '6.0 Knots',
    viewports: 'Twin Curved Observation Lounges',
    lifeSupport: '72 Hours Redundant System',
    tagline: 'The height of luxury entertainment beneath the surface.',
    pricePerSeat: '$85,000',
    features: [
      'Gourmet Dining Lounge Under Sea',
      'Private Observation Suites',
      'Acoustic Hydrophone Surround System',
      'Observation Deck Bar'
    ],
    hotspots: [
      { id: 'hull', name: 'Twin Glass Hulls', x: 50, y: 38, desc: 'Dual-chamber design providing spacious interiors without sacrificing safety.' },
      { id: 'viewport', name: 'Full-Length Viewing Bay', x: 70, y: 50, desc: 'Allows all 8 guests front-row views of deep-sea vertical migrations.' },
      { id: 'thrusters', name: 'Dual Jet Hydro-Drives', x: 15, y: 60, desc: 'Ultra-smooth waterjet propulsion for cruising along coral walls.' },
      { id: 'lights', name: 'Ambient Mood & Bio Lights', x: 85, y: 45, desc: 'Dynamic internal ambient lighting synced to external water colors.' }
    ],
    image: '/src/assets/abyssal_odyssey.png'
  }
];

export const EXPEDITION_DESTINATIONS = [
  {
    id: 'mariana-trench',
    name: 'Mariana Trench — Challenger Deep',
    depth: '10,994 meters',
    zone: 'Hadal Zone',
    duration: '12 Hours Descent & Return',
    highlights: 'Deepest point on Planet Earth, Hadal amphipods, translucent sea cucumbers, tectonic wall structures.',
    difficulty: 'Extreme (VIP Certification Required)',
    vessel: 'Titan IX Hadal Vanguard',
    icon: 'Compass',
    imageBg: 'from-slate-900 to-black'
  },
  {
    id: 'titanic-shipwreck',
    name: 'RMS Titanic Historic Wreckage',
    depth: '3,800 meters',
    zone: 'Midnight Zone',
    duration: '8 Hours Dive',
    highlights: 'Bow section, grand staircase remnant, rusticle formations, deep ocean ecosystems.',
    difficulty: 'Advanced',
    vessel: 'ABYSS Nautilus-X',
    icon: 'Anchor',
    imageBg: 'from-blue-950 to-slate-900'
  },
  {
    id: 'hydrothermal-vents',
    name: 'Lost City Hydrothermal Vents',
    depth: '2,400 meters',
    zone: 'Midnight Zone',
    duration: '6 Hours Dive',
    highlights: '60m tall calcified white smokers, extremophile bacterial mats, blind shrimp colonies, 400°C mineral chimneys.',
    difficulty: 'Intermediate',
    vessel: 'ABYSS Nautilus-X',
    icon: 'Flame',
    imageBg: 'from-teal-950 to-blue-950'
  },
  {
    id: 'great-blue-hole',
    name: 'The Great Abyssal Coral Wall',
    depth: '450 meters',
    zone: 'Twilight Zone',
    duration: '4 Hours Dive',
    highlights: 'Deep water black corals, glowing comb jellies, stalactite caves, hammerhead shark migration.',
    difficulty: 'Gentle / First Time',
    vessel: 'Abyssal Odyssey Lounge',
    icon: 'Waves',
    imageBg: 'from-cyan-950 to-blue-950'
  }
];

export const TELEMETRY_GRAPH_DATA = [
  { depth: 0, temp: 24.5, pressure: 1, bioluminescence: 5, oxygen: 99 },
  { depth: 200, temp: 16.2, pressure: 21, bioluminescence: 25, oxygen: 92 },
  { depth: 500, temp: 8.4, pressure: 51, bioluminescence: 85, oxygen: 82 },
  { depth: 1000, temp: 4.1, pressure: 101, bioluminescence: 98, oxygen: 68 },
  { depth: 2500, temp: 2.8, pressure: 251, bioluminescence: 72, oxygen: 52 },
  { depth: 5000, temp: 1.9, pressure: 501, bioluminescence: 45, oxygen: 38 },
  { depth: 8000, temp: 1.4, pressure: 801, bioluminescence: 30, oxygen: 32 },
  { depth: 10994, temp: 1.1, pressure: 1086, bioluminescence: 60, oxygen: 28 },
];

export const AI_KNOWLEDGE_BASE = [
  {
    keywords: ['deepest', 'trench', 'challenger', 'mariana', 'zone'],
    response: 'The deepest ocean zone is the Hadal Trench (Challenger Deep) at 10,994 meters (36,070 ft). The pressure here exceeds 1,080 atmospheres—equivalent to placing an elephant on your thumb!'
  },
  {
    keywords: ['jellyfish', 'glow', 'bioluminescence', 'light', 'why'],
    response: 'Deep-sea organisms produce bioluminescence through a oxidation chemical reaction involving luciferin and luciferase enzyme. They use light to attract prey, confuse predators with flash signals, or find mates in total darkness.'
  },
  {
    keywords: ['submarine', 'vessel', 'best', 'beginner', 'recommend'],
    response: 'For first-time explorers, we recommend the "Abyssal Odyssey Lounge" at 450m depth (Twilight Zone), featuring panoramic 360° curved observation suites, gourmet dining, and gentle pressure transitions.'
  },
  {
    keywords: ['pressure', 'crush', 'human', 'depth', 'work'],
    response: 'At 10,000 meters down, water pressure is over 8 tons per square inch. Our ABYSS submersibles utilize 120mm forged titanium spheres and specialized syntactic foam that will never deform under extreme hyperbaric loads.'
  },
  {
    keywords: ['cost', 'price', 'book', 'ticket', 'expedition'],
    response: 'Expeditions range from $85,000 for Twilight Zone coral wall dives up to $250,000 for the full Challenger Deep 11,000m Hadal Vanguard voyage. All expeditions include luxury accommodations, private marine biologist guides, and sub pilot certification.'
  }
];
