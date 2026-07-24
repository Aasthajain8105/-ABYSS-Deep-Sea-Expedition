import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CreatureSVG } from './CreatureSVG';
import TitanicLandmark from './TitanicLandmark';

/** 1 meter = PX_PER_M pixels of scroll height */
const PX_PER_M = 6;
const MAX_DEPTH_M = 11000;
const TOTAL_HEIGHT = MAX_DEPTH_M * PX_PER_M; // 66,000px

// ─── Full Creature Roster with real depths ────────────────────────────────────
const CREATURES = [
  // ══════ SUNLIT / EPIPELAGIC (0–200m) ══════
  { id: 'barnacle', name: 'Giant Barnacle', depthM: 4, x: 8, type: 'barnacle', color: '#9a9a8a', glow: '#bababc', size: 50, fact: 'Permanently cemented to rock by its own secreted cement — the strongest biological adhesive known to science.', stationary: true },
  { id: 'flying_fish', name: 'Pacific Flying Fish', depthM: 6, x: 65, type: 'flying_fish', color: '#38bdf8', glow: '#7dd3fc', size: 60, fact: 'Launches out of water at 60 km/h and glides over 200 meters using wing-like pectoral fins to escape predators.' },
  { id: 'sardine_school', name: 'Sardine Shoal', depthM: 8, x: 38, type: 'fish_small', color: '#7dd3fc', glow: '#bae6fd', size: 45, fact: 'Forms tight synchronized defensive bait balls when threatened by predators.' },
  { id: 'staghorn_coral', name: 'Staghorn Coral Reef', depthM: 10, x: 82, type: 'coral', color: '#e8b060', glow: '#ffd080', size: 70, fact: 'Fastest-growing hard coral — up to 20cm/year. Provides nursery habitat for 25% of all marine life.', stationary: true },
  { id: 'clownfish', name: 'Clownfish', depthM: 14, x: 20, type: 'fish_small', color: '#ff6000', glow: '#ff9030', size: 48, fact: 'Immune to anemone venom — lives exclusively inside them. Can change sex from male to female when needed.' },
  { id: 'manatee', name: 'West Indian Manatee', depthM: 18, x: 72, type: 'manatee', color: '#5a6a70', glow: '#7a9a8a', size: 90, fact: 'Eats 10% of its body weight daily in seagrass. Its closest living relatives are elephants and hyraxes.' },
  { id: 'blue_tang', name: 'Blue Tang', depthM: 20, x: 68, type: 'fish_small', color: '#1845cc', glow: '#4070ff', size: 52, fact: 'The scalpel-sharp spine at its tail base can inflict serious wounds. Feeds exclusively on algae, protecting coral reefs.' },
  { id: 'sea_turtle', name: 'Green Sea Turtle', depthM: 22, x: 55, type: 'turtle', color: '#2a5c35', glow: '#4a9c55', size: 80, fact: 'Navigates using Earth\'s geomagnetic field over migrations of 2,300km. Has been doing so for 100 million years.' },
  { id: 'leafy_dragon', name: 'Leafy Sea Dragon', depthM: 26, x: 88, type: 'seahorse', color: '#c8a830', glow: '#f0d050', size: 55, fact: 'The flowing leaf-like appendages are purely for camouflage — it propels itself via near-invisible dorsal fins.' },
  { id: 'spinner_dolphin', name: 'Spinner Dolphin', depthM: 28, x: 42, type: 'dolphin', color: '#2a3a4a', glow: '#4a6a8a', size: 80, fact: 'Performs up to 14 aerial rotations per jump. Uses echolocation to herd prey schools at dawn and dusk.' },
  { id: 'mahi_mahi', name: 'Mahi-Mahi', depthM: 35, x: 28, type: 'fish_colorful', color: '#00aa88', glow: '#00ffaa', size: 70, fact: 'Changes color dramatically when excited — electric green, gold, and blue pulses flash across its flanks in seconds.' },
  { id: 'hammerhead', name: 'Hammerhead Shark', depthM: 42, x: 62, type: 'hammerhead', color: '#3a4a5a', glow: '#5a7090', size: 100, fact: 'The wide-set eyes provide 360° vertical vision. Uses 3,000+ electroreceptor pores to detect prey buried in sand.' },
  { id: 'moon_jelly', name: 'Moon Jellyfish', depthM: 45, x: 76, type: 'jellyfish', color: '#38bdf8', glow: '#7dd3fc', size: 60, fact: 'Consists of 95% water and has no brain, blood, or heart. Drifts on ocean currents.' },
  { id: 'bluefin_tuna', name: 'Atlantic Bluefin Tuna', depthM: 48, x: 38, type: 'fish', color: '#1a2a5a', glow: '#3050a0', size: 85, fact: 'Can reach 70km/h and maintain body temperature 10°C above ambient water — a warm-blooded fish.' },
  { id: 'sea_pen_surface', name: 'Sea Pen (Shallow)', depthM: 55, x: 6, type: 'sea_pen', color: '#ff6090', glow: '#ff80b0', size: 65, fact: 'A colonial organism — one polyp forms the shaft while others specialize in feeding, reproduction, or water circulation.', stationary: true },
  { id: 'mola_mola', name: 'Ocean Sunfish (Mola mola)', depthM: 80, x: 55, type: 'mola', color: '#6a7a8a', glow: '#8aaacc', size: 85, fact: 'Heaviest bony fish on Earth — up to 2.3 tonnes. Basks at the surface to re-warm after cold deep-water dives.' },
  { id: 'orca_pod', name: 'Orca (Killer Whale)', depthM: 90, x: 25, type: 'orca', color: '#0f172a', glow: '#38bdf8', size: 130, fact: 'Apex predator of the oceans with complex vocal dialects unique to individual pod matriarchal families.' },
  { id: 'moray_eel', name: 'Giant Moray Eel', depthM: 95, x: 15, type: 'eel', color: '#4a5a2a', glow: '#7a9a3a', size: 95, fact: 'Has a second set of jaws in its throat (pharyngeal jaws) that extend forward to pull prey inward — like the Alien film.' },
  { id: 'blue_shark', name: 'Blue Shark', depthM: 110, x: 48, type: 'shark', color: '#1d4ed8', glow: '#60a5fa', size: 90, fact: 'One of the fastest sharks on Earth. Highly migratory, traveling across entire ocean basins annually.' },
  { id: 'nautilus', name: 'Chambered Nautilus', depthM: 120, x: 75, type: 'nautilus', color: '#c09060', glow: '#e0b080', size: 65, fact: 'A living fossil unchanged for 500 million years. Uses jet propulsion and up to 90 tentacles to hunt crabs and fish.' },
  { id: 'octopus', name: 'Giant Pacific Octopus', depthM: 140, x: 35, type: 'octopus', color: '#8a3020', glow: '#cc5030', size: 80, fact: 'Three hearts, blue copper-based blood, and 500 million neurons — the most complex brain of any invertebrate.' },
  { id: 'great_white', name: 'Great White Shark', depthM: 160, x: 62, type: 'shark', color: '#2a3540', glow: '#4a6070', size: 110, fact: 'Can detect a single drop of blood in 100 liters of water from 5km away. Has multiple rows of 300 teeth.' },
  { id: 'coral2', name: 'Brain Coral', depthM: 170, x: 90, type: 'coral', color: '#b07040', glow: '#d09050', size: 60, fact: 'Lives up to 900 years — one of the oldest living organisms on Earth. The maze-like grooves house symbiotic algae.', stationary: true },

  // ══════ TWILIGHT / MESOPELAGIC (200–1,000m) ══════
  { id: 'manta_ray', name: 'Giant Oceanic Manta Ray', depthM: 240, x: 50, type: 'manta', color: '#1a2a4a', glow: '#3050a0', size: 110, fact: 'Brain-to-body ratio exceeds all other fish. Passes the mirror self-recognition test, indicating self-awareness.' },
  { id: 'lanternfish_school', name: 'Lanternfish School', depthM: 280, x: 65, type: 'fish_small', color: '#818cf8', glow: '#c7d2fe', size: 45, fact: 'Comprises over 65% of all deep-sea fish biomass on Earth.' },
  { id: 'spider_crab', name: 'Japanese Spider Crab', depthM: 300, x: 18, type: 'crab', color: '#cc5030', glow: '#ff7050', size: 95, fact: 'Largest known arthropod — leg span to 3.8m. Lives to 100 years old. Molts its exoskeleton to grow larger.' },
  { id: 'sea_pen_deep', name: 'Deep Sea Pen', depthM: 350, x: 85, type: 'sea_pen', color: '#ff5580', glow: '#ff80a0', size: 70, fact: 'Anchors in soft sediment by a muscular peduncle. The colony can retract entirely into the seafloor when threatened.', stationary: true },
  { id: 'atolla_jelly', name: 'Atolla Jellyfish', depthM: 370, x: 68, type: 'jellyfish', color: '#00c0ff', glow: '#00f3ff', size: 70, fact: '"Burglar alarm" bioluminescence — the strobe attracts larger predators to attack the smaller attacker on the Atolla.' },
  { id: 'comb_jelly', name: 'Comb Jelly (Ctenophore)', depthM: 420, x: 32, type: 'comb_jelly', color: '#ff40a0', glow: '#ff60c0', size: 65, fact: 'Oldest extant animal lineage. Uses no neurons for locomotion — reacts purely through direct epithelial signaling.' },
  { id: 'hatchetfish', name: 'Marine Hatchetfish', depthM: 460, x: 58, type: 'hatchetfish', color: '#aaaacc', glow: '#ccccff', size: 50, fact: 'Counter-illumination master: belly photophores match downwelling light precisely to eliminate its own shadow from below.' },
  { id: 'viperfish', name: 'Pacific Viperfish', depthM: 500, x: 22, type: 'viperfish', color: '#1a3a1a', glow: '#00ff44', size: 70, fact: 'Fang length prevents its mouth from fully closing. Can impale prey on its teeth from a distance using jet-propulsion lunge.' },
  { id: 'lanternfish', name: 'Myctophid Lanternfish', depthM: 540, x: 78, type: 'fish_small', color: '#2a3a5a', glow: '#4060a0', size: 45, fact: 'Performs the largest mass migration on Earth nightly — millions ascend 500m to feed at the surface then return at dawn.' },
  { id: 'dragonfish', name: 'Deep Sea Dragonfish', depthM: 620, x: 70, type: 'viperfish', color: '#4c1d95', glow: '#a78bfa', size: 72, fact: 'Produces invisible red bioluminescent light that other deep sea prey cannot see, acting as a secret night-vision headlamp.' },
  { id: 'sunken_anchor', name: 'Sunken Galleon Anchor', depthM: 650, x: 12, type: 'shipwreck', color: '#78716c', glow: '#a8a29e', size: 85, fact: '17th-century iron anchor covered in coral encrustations and deep sea pens.', stationary: true },
  { id: 'phronima', name: 'Phronima (Barrel Rider)', depthM: 680, x: 45, type: 'phronima', color: '#c0d0e0', glow: '#ddeeff', size: 60, fact: 'Hollows out a salp barrel and lives inside it, steering from within. Widely believed to have inspired H.R. Giger\'s Alien.' },
  { id: 'oarfish', name: 'Giant Oarfish', depthM: 730, x: 50, type: 'oarfish', color: '#8090a0', glow: '#c0d0ff', size: 50, fact: 'World\'s longest bony fish — to 11m. The origin of sea-serpent legends. Swims vertically, head upward, in the water column.' },
  { id: 'bigfin_squid', name: 'Bigfin Reef Squid', depthM: 780, x: 28, type: 'squid', color: '#8040a0', glow: '#c060f0', size: 75, fact: 'Fin runs the entire length of its body. Communicates with chromatophore skin patterns at up to 50 flashes per second.' },
  { id: 'barreleye', name: 'Barreleye Fish (Macropinna)', depthM: 850, x: 72, type: 'barreleye', color: '#1a2a3a', glow: '#0080c0', size: 65, fact: 'The transparent dome is its actual forehead — the green tubular "eyes" rotate upward to detect prey silhouettes above.' },
  { id: 'worm_meso', name: 'Polychaete Bristle Worm', depthM: 920, x: 14, type: 'worm', color: '#882222', glow: '#ff4444', size: 75, fact: 'Each body segment bears its own pair of parapodia — muscular paddle-like limbs. Some species produce bioluminescent flashes.' },
  { id: 'squid_deep', name: 'Glacial Glass Squid', depthM: 980, x: 80, type: 'squid', color: '#38bdf8', glow: '#93c5fd', size: 70, fact: 'Completely transparent body with bioluminescent light organs situated beneath its large eyes.' },

  // ══════ MIDNIGHT / BATHYPELAGIC (1,000–4,000m) ══════
  { id: 'blue_whale', name: 'Blue Whale', depthM: 1020, x: 46, type: 'whale', color: '#1a2838', glow: '#3a5878', size: 60, fact: 'Heart slows to just 2 BPM during a deep dive. Produces 188-decibel calls — the loudest sound of any animal on Earth.' },
  { id: 'underwater_cave', name: 'Abyssal Cave Passage', depthM: 1100, x: 88, type: 'shipwreck', color: '#1e1b4b', glow: '#6366f1', size: 90, fact: 'Subterranean basalt cave fissure leading into ancient underwater limestone caverns.', stationary: true },
  { id: 'siphonophore', name: 'Apolemia Siphonophore', depthM: 1200, x: 88, type: 'siphonophore', color: '#00cc66', glow: '#00ff88', size: 50, fact: 'The longest animal on Earth at up to 40m. A supercolony of interdependent clones — each zooid specializes differently.' },
  { id: 'black_dragonfish', name: 'Black Dragonfish', depthM: 1300, x: 40, type: 'viperfish', color: '#0f172a', glow: '#38bdf8', size: 68, fact: 'Emits chin-barbel bioluminescence to hunt in absolute darkness.' },
  { id: 'cusk_eel', name: 'Cusk Eel', depthM: 1400, x: 22, type: 'eel', color: '#202830', glow: '#3a5a70', size: 80, fact: 'One of the deepest-dwelling fish families. Navigates by detecting pressure waves with its extraordinarily sensitive lateral line.' },
  { id: 'fangtooth', name: 'Fangtooth Fish (Anoplogaster)', depthM: 1600, x: 68, type: 'fangtooth', color: '#080810', glow: '#2020ff', size: 62, fact: 'Largest teeth relative to body size of any fish. The upper fangs fit into sockets beside the brain when the mouth closes.' },
  { id: 'polychaete_deep', name: 'Scale Worm (Polynoidae)', depthM: 1650, x: 90, type: 'worm_small', color: '#aa2244', glow: '#ff3366', size: 55, fact: 'Covered in iridescent scales (elytra) that emit brilliant bioluminescent pulses when detached as a defense distraction.' },
  { id: 'vampire_squid', name: 'Vampire Squid (Vampyroteuthis)', depthM: 1800, x: 38, type: 'vampire_squid', color: '#4a0060', glow: '#9000ff', size: 72, fact: 'Its own ancient order — neither octopus nor squid. Thrives in oxygen minimum zones where most predators cannot survive.' },
  { id: 'sixgill_shark', name: 'Bluntnose Sixgill Shark', depthM: 2100, x: 55, type: 'shark', color: '#1a2028', glow: '#304050', size: 105, fact: 'A living fossil — anatomically unchanged for 200 million years. Six gill slits; most modern sharks have only five.' },
  { id: 'shipwreck_debris', name: 'Galleon Hull Debris', depthM: 2200, x: 16, type: 'shipwreck', color: '#57534e', glow: '#d6d3d1', size: 95, fact: 'Sunken 18th-century wooden hull timbers overgrown with deep-sea barnacles.', stationary: true },
  { id: 'treasure_remains', name: 'Sunken Specie Chest', depthM: 2250, x: 22, type: 'shipwreck', color: '#ca8a04', glow: '#fde047', size: 60, fact: 'Ancient brass sea chest spilled with silver doubloons and oxidized nautical artifacts.', stationary: true },
  { id: 'ghost_shark', name: 'Chimaera (Ghost Shark)', depthM: 2400, x: 65, type: 'fish', color: '#64748b', glow: '#cbd5e1', size: 85, fact: 'Uses smooth scaleless skin and electroreceptors to detect electrical impulses from prey buried under seabed mud.' },
  { id: 'giant_squid', name: 'Giant Squid (Architeuthis)', depthM: 2600, x: 30, type: 'squid', color: '#3a1828', glow: '#802040', size: 100, fact: 'Eyes the size of dinner plates — 27cm diameter — the largest eyes of any living animal. For detecting bio-light in darkness.' },
  { id: 'gulper_eel', name: 'Pelican / Gulper Eel', depthM: 3000, x: 70, type: 'gulper', color: '#0a0a18', glow: '#2030a0', size: 85, fact: 'The massive expandable jaw can swallow prey larger than itself whole. A glowing pink tail tip lures prey into range.' },
  { id: 'tripodfish', name: 'Tripod Fish (Bathypterois)', depthM: 3400, x: 80, type: 'tripodfish', color: '#1a1820', glow: '#3040a0', size: 70, fact: 'Stands perfectly motionless on three elongated fin rays on the seafloor, facing the current, sensing vibrations in its stillness.', stationary: true },
  { id: 'sea_pig', name: 'Sea Pig (Scotoplanes globosa)', depthM: 3600, x: 25, type: 'sea_pig', color: '#d890a0', glow: '#ffb0c0', size: 70, fact: 'Moves across the abyssal plain on inflated tube feet, vacuuming the sediment for organic debris from the surface.' },
  { id: 'abyssal_anemone', name: 'Venus Flytrap Anemone', depthM: 3850, x: 12, type: 'coral', color: '#f43f5e', glow: '#fb7185', size: 65, fact: 'Closes its disc like a venus flytrap to capture swimming prey drifting across abyssal currents.', stationary: true },

  // ══════ ABYSS / ABYSSOPELAGIC (4,000–6,000m) ══════
  { id: 'anglerfish', name: 'Deep-Sea Anglerfish', depthM: 4200, x: 30, type: 'anglerfish', color: '#050508', glow: '#f0b000', size: 80, fact: 'The glowing lure hosts symbiotic bioluminescent bacteria. The male permanently fuses to the female, sharing her bloodstream.' },
  { id: 'black_smoker_vent1', name: 'Hydrothermal Black Smoker', depthM: 4400, x: 88, type: 'shipwreck', color: '#44403c', glow: '#f97316', size: 95, fact: 'Spews 350°C mineral-rich superheated fluids from Earth\'s crust into freezing ocean waters.', stationary: true },
  { id: 'tube_worms_vent', name: 'Giant Hydrothermal Tube Worms', depthM: 4420, x: 85, type: 'worm', color: '#e11d48', glow: '#fda4af', size: 70, fact: 'Grows up to 2.4m tall around hydrothermal vents with no mouth or digestive tract, nourished entirely by symbiotic chemosynthetic bacteria.', stationary: true },
  { id: 'giant_isopod', name: 'Giant Isopod (Bathynomus)', depthM: 4600, x: 65, type: 'isopod', color: '#6a7890', glow: '#9ab0d0', size: 80, fact: 'Can survive 5+ years without food. Rolls into a perfect sphere when threatened. A classic example of deep-sea gigantism.' },
  { id: 'sea_spider_abyss', name: 'Giant Sea Spider', depthM: 4750, x: 32, type: 'crab', color: '#a855f7', glow: '#c084fc', size: 75, fact: 'Has a leg span up to 90cm. Organs extend into its legs because its abdomen is too tiny.' },
  { id: 'sea_cucumber_abyss', name: 'Deep Sea Cucumber', depthM: 4900, x: 42, type: 'sea_cucumber', color: '#d08060', glow: '#ffb080', size: 75, fact: 'Can comprise up to 93% of all biomass at abyssal depths. Expels its internal organs as a defense and then regenerates them.' },
  { id: 'dumbo_octopus', name: 'Dumbo Octopus (Grimpoteuthis)', depthM: 5100, x: 50, type: 'dumbo', color: '#c04820', glow: '#ff6030', size: 75, fact: 'Deepest-living octopus species. Named for its ear-like fins. Unlike all other octopods, it swallows prey completely whole.' },
  { id: 'glass_sponge', name: 'Venus Flower Basket Sponge', depthM: 5200, x: 85, type: 'sponge', color: '#c0d8f0', glow: '#ddf0ff', size: 70, fact: 'Its silica fiber lattice is so perfectly engineered it inspired fiber-optic cable design and modern bridge engineering principles.', stationary: true },
  { id: 'zombie_worm', name: 'Zombie Worm (Osedax)', depthM: 5500, x: 18, type: 'worm_small', color: '#cc2040', glow: '#ff4060', size: 50, fact: 'Bores into whale bones using acid-secreting roots to feed on lipids inside. Discovered only in 2002 on a sunken whale carcass.', stationary: true },
  { id: 'black_smoker_vent2', name: 'Abyssal Thermal Chimney', depthM: 5800, x: 14, type: 'shipwreck', color: '#292524', glow: '#ef4444', size: 90, fact: 'Forms massive mineral deposits beneath 600 atmospheres of crushing abyssal pressure.', stationary: true },

  // ══════ HADAL (6,000–11,000m) ══════
  { id: 'hadal_medusa', name: 'Hadal Bioluminescent Medusa', depthM: 6400, x: 75, type: 'jellyfish', color: '#a855f7', glow: '#d8b4fe', size: 65, fact: 'Pulsates with intense purple bioluminescent pulses in Hadal trench darkness.' },
  { id: 'hadal_coral', name: 'Deep Hadal Coral (Lophelia)', depthM: 7100, x: 20, type: 'coral', color: '#38bdf8', glow: '#bae6fd', size: 70, fact: 'A cold-water coral colony thriving in total darkness without photosynthetic zooxanthellae.', stationary: true },
  { id: 'abyssal_xenophyophore', name: 'Giant Xenophyophore', depthM: 7700, x: 60, type: 'sponge', color: '#94a3b8', glow: '#e2e8f0', size: 65, fact: 'Single-celled multinucleated giant organism up to 20cm across, found only on trench plains.', stationary: true },
  { id: 'snailfish', name: 'Mariana Snailfish', depthM: 8336, x: 42, type: 'snailfish', color: '#b0a0d0', glow: '#d0c0f0', size: 70, fact: 'The deepest fish ever recorded — found at 8,336m in the Mariana Trench. Its skull is unfused to withstand crushing pressure.' },
  { id: 'hadal_crinoid', name: 'Hadal Sea Lily (Crinoid)', depthM: 8800, x: 82, type: 'sea_pen', color: '#c084fc', glow: '#e9d5ff', size: 65, fact: 'Feathered echinoderm anchored to Hadal basalt, filtering bacterial marine snow.', stationary: true },
  { id: 'hadal_amphipod', name: 'Hadal Amphipod (Hirondellea)', depthM: 9500, x: 28, type: 'amphipod', color: '#a0c0e0', glow: '#c0e0ff', size: 50, fact: 'Feeds on wood-cellulose from driftwood fallen to the trench floor, digesting it with unique gut enzymes evolved for this purpose.' },
  { id: 'hadal_sea_cucumber', name: 'Hadal Sea Cucumber', depthM: 10100, x: 65, type: 'sea_cucumber', color: '#e0a080', glow: '#ffc0a0', size: 70, fact: 'Documented at 10,902m in Challenger Deep. Crawls through the ooze consuming sediment bacteria in total darkness and cold.' },
  { id: 'hadal_worm', name: 'Nereid Hadal Worm', depthM: 10500, x: 38, type: 'worm', color: '#a030a0', glow: '#e050e0', size: 60, fact: 'Found only in the Hadal zone below 6,000m. Feeds on organic material that drifts down from 11km above — marine snow.' },
];

// ─── Background gradient per depth ──────────────────────────────────────────
function getBgGradient(depthM) {
  if (depthM < 20) return 'linear-gradient(180deg, #0a6090 0%, #0a4870 60%, #083060 100%)';
  if (depthM < 200) return 'linear-gradient(180deg, #083060 0%, #051a40 60%, #030d28 100%)';
  if (depthM < 600) return 'linear-gradient(180deg, #030d28 0%, #020818 60%, #010510 100%)';
  if (depthM < 1200) return 'linear-gradient(180deg, #010510 0%, #010308 60%, #000204 100%)';
  if (depthM < 4000) return 'linear-gradient(180deg, #000204 0%, #000102 60%, #000001 100%)';
  return 'linear-gradient(180deg, #000001 0%, #000000 100%)';
}

// ─── Individual creature element ─────────────────────────────────────────────
// ─── Individual creature element (Memoized for zero re-render overhead) ──────
const CreatureElement = React.memo(function CreatureElement({ creature, pxPerM, onCreatureClick }) {
  const [hovered, setHovered] = useState(false);
  const yPos = creature.depthM * pxPerM;
  const isStationary = creature.stationary;

  // Swim animation name
  const animName = isStationary ? 'none' : (creature.type === 'jellyfish' || creature.type === 'comb_jelly' ? 'floatVertical' : 'swimFloat');

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group select-none"
      style={{
        left: `${creature.x}%`,
        top: `${yPos}px`,
        transform: 'translateX(-50%)',
        zIndex: 5,
        willChange: 'transform',
        animation: isStationary ? 'none' : `${animName} ${6 + (creature.id.length % 4)}s ease-in-out infinite ${(creature.depthM % 5) * 0.4}s`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        onCreatureClick(creature, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Creature SVG */}
      <div
        style={{
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          filter: hovered ? `brightness(1.3) drop-shadow(0 0 12px ${creature.glow}88)` : 'none',
        }}
      >
        <CreatureSVG
          type={creature.type}
          color={creature.color}
          glowColor={creature.glow}
          size={creature.size}
        />
      </div>

      {/* Name label */}
      <div
        className="mt-1 text-center transition-all duration-200"
        style={{
          opacity: hovered ? 1 : 0.75,
          transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        }}
      >
        <div
          className="text-[9px] font-mono tracking-[0.25em] uppercase"
          style={{
            color: hovered ? '#e0f4ff' : 'rgba(180,200,220,0.7)',
            textShadow: hovered ? `0 0 12px ${creature.glow}80` : 'none',
            fontFamily: "'JetBrains Mono', monospace",
            whiteSpace: 'nowrap',
          }}
        >
          {creature.name}
        </div>
      </div>

      {/* Hover glow ring */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: `radial-gradient(circle, ${creature.glow}12 0%, transparent 70%)`,
            transform: 'scale(1.5)',
          }}
        />
      )}
    </div>
  );
});

// ─── Zone transition markers ──────────────────────────────────────────────────
const ZONE_MARKERS = [
  { id: 'twilight', depthM: 200, label: 'TWILIGHT ZONE', sublabel: 'Mesopelagic • 200–1,000m', color: '#818cf8' },
  { id: 'midnight', depthM: 1000, label: 'MIDNIGHT ZONE', sublabel: 'Bathypelagic • 1,000–4,000m', color: '#6366f1' },
  { id: 'abyss', depthM: 4000, label: 'ABYSSAL ZONE', sublabel: 'Abyssopelagic • 4,000–6,000m', color: '#00f3ff' },
  { id: 'hadal', depthM: 6000, label: 'HADAL ZONE', sublabel: 'Hadal Trench • 6,000–11,000m', color: '#c4b5fd' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OceanDepthScroll({ onCreatureClick, onTitanicClick, depthRatio, currentDepth = 0 }) {
  const containerRef = useRef(null);

  // Virtualized filtering: Only render creatures near the current depth window (+/- 400m)
  const visibleCreatures = CREATURES.filter((c) => Math.abs(c.depthM - currentDepth) <= 450);

  return (
    <div
      ref={containerRef}
      id="ocean-scroll"
      className="relative w-full max-w-full overflow-x-hidden bg-transparent"
      style={{
        height: `${TOTAL_HEIGHT}px`,
      }}
    >
      {/* Surface wave effect at top */}
      <div
        className="sticky top-0 z-0 pointer-events-none"
        style={{ height: 0, overflow: 'visible' }}
      >
        <svg
          width="100%"
          height="60"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, opacity: Math.max(0, 1 - currentDepth / 150) }}
        >
          <path
            d="M0 30 Q 180 10 360 30 Q 540 50 720 30 Q 900 10 1080 30 Q 1260 50 1440 30 L1440 0 L0 0 Z"
            fill="rgba(10,96,144,0.6)"
          />
        </svg>
      </div>

      {/* ── Zone transition dividers ────────────────────────────────────── */}
      {ZONE_MARKERS.map(zone => (
        <div
          key={zone.depthM}
          id={zone.id}
          className="absolute w-full flex flex-col items-center pointer-events-none"
          style={{ top: zone.depthM * PX_PER_M - 40 }}
        >
          {/* Horizontal separator line */}
          <div
            className="w-full"
            style={{
              height: '1px',
              background: `linear-gradient(90deg, transparent 0%, ${zone.color}30 20%, ${zone.color}60 50%, ${zone.color}30 80%, transparent 100%)`,
            }}
          />
          {/* Zone label */}
          <div className="mt-3 flex flex-col items-center gap-1">
            <div
              className="text-[8px] font-mono tracking-[0.5em] uppercase"
              style={{
                color: zone.color,
                textShadow: `0 0 20px ${zone.color}60`,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ▼ ENTERING {zone.label}
            </div>
            <div
              className="text-[7px] font-mono tracking-widest"
              style={{
                color: `${zone.color}70`,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {zone.sublabel}
            </div>
          </div>
        </div>
      ))}

      {/* ── Virtualized Creatures (only 5-10 rendered at a time instead of 96) ── */}
      {visibleCreatures.map(creature => (
        <CreatureElement
          key={creature.id}
          creature={creature}
          pxPerM={PX_PER_M}
          onCreatureClick={onCreatureClick}
        />
      ))}

      {/* ── Titanic Landmark at 3,784m ──────────────────────────────────── */}
      <div
        className="absolute w-full"
        style={{ top: 3784 * PX_PER_M - 280 }}
      >
        <TitanicLandmark onClick={() => onTitanicClick?.({
          name: 'R.M.S. Titanic',
          depth: '3,784m',
          color: '#c87830',
          glow: '#e0a050',
          fact: 'Struck an iceberg at 11:40 PM on April 14, 1912. Sank in 2h 40m. Discovered in 1985 by Robert Ballard. The wreck splits between bow (intact) and stern (collapsed), separated by 600m of debris field.',
        })} />
      </div>

      {/* ── Abyssal Seafloor at 11,000m ─────────────────────────────────── */}
      <div
        className="absolute bottom-0 w-full"
        style={{ height: '120px' }}
      >
        {/* Sediment layer */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '80px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(20,15,8,0.5) 40%, rgba(30,20,10,0.85) 100%)',
            borderTop: '1px solid rgba(60,40,20,0.25)',
          }}
        />
        {/* Challenger Deep inscription */}
        <div className="absolute bottom-16 w-full flex flex-col items-center gap-1.5">
          <div className="w-48 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,181,253,0.3), transparent)' }} />
          <div
            className="text-[8px] font-mono tracking-[0.4em] uppercase"
            style={{
              color: 'rgba(196,181,253,0.4)',
              textShadow: '0 0 15px rgba(196,181,253,0.3)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            CHALLENGER DEEP · 10,994m
          </div>
          <div
            className="text-[7px] font-mono tracking-widest"
            style={{ color: 'rgba(196,181,253,0.25)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            THE DEEPEST KNOWN POINT ON EARTH
          </div>
          <div className="w-48 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,181,253,0.3), transparent)' }} />
        </div>
      </div>

      {/* ── Bioluminescence particles in deep zones ─────────────────────── */}
      {currentDepth > 200 && Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '3px',
            height: '3px',
            left: `${8 + i * 8}%`,
            top: `${currentDepth * PX_PER_M + 200 + i * 60}px`,
            backgroundColor: i % 3 === 0 ? '#00f3ff' : i % 3 === 1 ? '#00ff88' : '#c4b5fd',
            boxShadow: `0 0 8px currentColor`,
            animation: `bioGlow ${3 + i * 0.5}s ease-in-out infinite ${i * 0.4}s`,
            opacity: Math.min(0.6, (currentDepth - 200) / 800),
          }}
        />
      ))}

      {/* CSS animations injected */}
      <style>{`
        @keyframes swimFloat {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          25% { transform: translateX(-50%) translateY(-12px); }
          50% { transform: translateX(-50%) translateY(-4px); }
          75% { transform: translateX(-50%) translateY(-16px); }
        }
        @keyframes floatVertical {
          0%, 100% { transform: translateX(-50%) translateY(0px) scaleY(1); }
          50% { transform: translateX(-50%) translateY(-18px) scaleY(0.92); }
        }
      `}</style>
    </div>
  );
}

export { CREATURES, PX_PER_M, TOTAL_HEIGHT };
