// ============================================================
// Aviation Weather Academy — FAA Validation Map
// ============================================================

const FAA_VALIDATION_SCHEMA = {
  sourceTypes: ['AWH', 'PHAK', 'AIM'],
  validationStatuses: ['validated_exact', 'validated_paraphrase', 'training_simplification', 'needs_review'],
  learnerLevels: ['student', 'private', 'instrument', 'commercial'],
  contentContexts: ['beginner_foundation', 'checkride_core', 'operational_refresh', 'advanced_weather_awareness'],
  relevanceLevels: ['low', 'medium', 'high']
};

const FAA_VALIDATION_SOURCES = {
  AWH: {
    sourceType: 'AWH',
    sourceTitle: 'Aviation Weather Handbook',
    sourceEdition: 'FAA-H-8083-28B (Apr. 2026)',
    sourceUrl: 'https://www.faa.gov/regulationspolicies/handbooksmanuals/aviation/faa-h-8083-28b-aviation-weather-handbook'
  },
  PHAK: {
    sourceType: 'PHAK',
    sourceTitle: "Pilot's Handbook of Aeronautical Knowledge",
    sourceEdition: 'FAA-H-8083-25C (2023, addendum Oct. 2025)',
    sourceUrl: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation'
  },
  AIM: {
    sourceType: 'AIM',
    sourceTitle: 'Aeronautical Information Manual',
    sourceEdition: 'Basic with Change 1 and 2 (effective Jan. 22, 2026)',
    sourceUrl: 'https://www.faa.gov/air_traffic/publications/atpubs/aim_html/'
  }
};

// Level-target presets mirror the four-level taxonomy from config.js LEVELS.
// CFI / ATP Refresher use cases now sit under 'commercial' for filtering purposes.
const ALL_LEVELS = ['student', 'private', 'instrument', 'commercial'];
const ADV_LEVELS = ['private', 'instrument', 'commercial'];
const PRO_LEVELS = ['instrument', 'commercial'];
const FOUNDATION = ['beginner_foundation', 'checkride_core'];
const CORE_OPS = ['checkride_core', 'operational_refresh'];
const OPS_ADV = ['operational_refresh', 'advanced_weather_awareness'];

function recordFrom(sourceType, data) {
  const source = FAA_VALIDATION_SOURCES[sourceType] || {};
  return {
    topicId: data.topicId,
    topicTitle: data.topicTitle,
    moduleId: data.moduleId || null,
    sectionId: data.sectionId || null,
    sectionTitle: data.sectionTitle || null,
    sourceType,
    sourceTitle: source.sourceTitle || '',
    sourceEdition: source.sourceEdition || '',
    sourceChapter: data.sourceChapter || '',
    sourceSection: data.sourceSection || '',
    validationStatus: data.validationStatus || 'needs_review',
    learnerLevel: data.learnerLevel || ['student', 'private'],
    contentContext: data.contentContext || ['beginner_foundation'],
    checkrideRelevance: data.checkrideRelevance || 'medium',
    operationalRelevance: data.operationalRelevance || 'medium',
    notes: data.notes || ''
  };
}

const FAA_MODULE_VALIDATION = {
  m1: recordFrom('AWH', { topicId: 'm1', moduleId: 'm1', topicTitle: 'The Atmosphere', sourceChapter: 'Chapters 4-7', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: ['beginner_foundation', 'checkride_core', 'operational_refresh'], checkrideRelevance: 'high', operationalRelevance: 'medium', notes: 'Module framing aligns with FAA atmosphere, moisture, and heating chapters. Examples and memory aids are paraphrased.' }),
  m2: recordFrom('AWH', { topicId: 'm2', moduleId: 'm2', topicTitle: 'Pressure & Altimetry', sourceChapter: 'Chapter 8', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: ['beginner_foundation', 'checkride_core', 'operational_refresh'], checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Core concepts are FAA-grounded. Product wording remains explanatory rather than quoted from FAA text.' }),
  m3: recordFrom('AWH', { topicId: 'm3', moduleId: 'm3', topicTitle: 'Wind & Circulation', sourceChapter: 'Chapters 9-10', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: ['beginner_foundation', 'checkride_core', 'operational_refresh'], checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Pressure-gradient, Coriolis, friction, jet stream, and local-wind coverage track handbook concepts.' }),
  m4: recordFrom('AWH', { topicId: 'm4', moduleId: 'm4', topicTitle: 'Clouds & Stability', sourceChapter: 'Chapters 12-14', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: ['beginner_foundation', 'checkride_core', 'operational_refresh'], checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Foundational stability and cloud-type instruction is FAA-grounded. Some labels compress more nuanced parcel theory.' }),
  m5: recordFrom('AWH', { topicId: 'm5', moduleId: 'm5', topicTitle: 'The Weather Machine', sourceChapter: 'Chapter 11', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Air masses and frontal-weather sequences are traceable to FAA material, though some timing guidance is taught as shorthand.' }),
  m6: recordFrom('AWH', { topicId: 'm6', moduleId: 'm6', topicTitle: 'Thunderstorms', sourceChapter: 'Chapter 22', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS.concat(['advanced_weather_awareness']), checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Hazard fundamentals are FAA-grounded. Avoidance heuristics are conservative training language rather than direct FAA phrasing.' }),
  m7: recordFrom('AWH', { topicId: 'm7', moduleId: 'm7', topicTitle: 'Structural Icing', sourceChapter: 'Chapter 20', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS.concat(['advanced_weather_awareness']), checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Structural icing coverage maps well to AWH. Engine-icing details blend weather and aircraft-system guidance.' }),
  m8: recordFrom('AWH', { topicId: 'm8', moduleId: 'm8', topicTitle: 'Turbulence', sourceChapter: 'Chapter 19', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS.concat(['advanced_weather_awareness']), checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Weather-driven turbulence content is handbook-aligned. Some examples extend into general flight-operations guidance.' }),
  m9: recordFrom('AWH', { topicId: 'm9', moduleId: 'm9', topicTitle: 'Fog & Low IFR', sourceChapter: 'Chapter 18', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Fog-formation and low-visibility material is FAA-grounded. Some decision-making copy uses strong cautionary wording and non-FAA anecdotes.' }),
  m10: recordFrom('AWH', { topicId: 'm10', moduleId: 'm10', topicTitle: 'Mountain Weather', sourceChapter: 'Chapter 16', validationStatus: 'validated_paraphrase', learnerLevel: ADV_LEVELS, contentContext: CORE_OPS.concat(['advanced_weather_awareness']), checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'Mountain-wave, rotor, and downslope concepts are traceable to FAA mountain-weather coverage.' }),
  m11: recordFrom('AWH', { topicId: 'm11', moduleId: 'm11', topicTitle: 'METAR Decoder', sourceChapter: 'Chapter 24', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: ['beginner_foundation', 'checkride_core', 'operational_refresh'], checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Report structure and decode order are FAA-grounded; instructional wording is paraphrased for usability.' }),
  m12: recordFrom('AWH', { topicId: 'm12', moduleId: 'm12', topicTitle: 'TAF - Terminal Forecasts', sourceChapter: 'Chapter 27', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'TAF coding and operational reading are handbook-aligned. Change-group nuance should continue to be treated as paraphrase.' }),
  m13: recordFrom('AWH', { topicId: 'm13', moduleId: 'm13', topicTitle: 'PIREPs - Pilot Reports', sourceChapter: 'Chapter 24', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'Format and interpretation are FAA-grounded. Some duty-language around filing reports needs tighter operational sourcing.' }),
  m14: recordFrom('AWH', { topicId: 'm14', moduleId: 'm14', topicTitle: 'Weather Radar', sourceChapter: 'Chapters 15, 24', validationStatus: 'validated_paraphrase', learnerLevel: ADV_LEVELS, contentContext: ['checkride_core', 'operational_refresh', 'advanced_weather_awareness'], checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'Radar fundamentals and limitations align with FAA weather-radar instruction. Some provider-specific color and buffer guidance is training shorthand.' }),
  m15: recordFrom('AWH', { topicId: 'm15', moduleId: 'm15', topicTitle: 'Advisories', sourceChapter: 'Chapter 26', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: ['checkride_core', 'operational_refresh', 'advanced_weather_awareness'], checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Advisory product families are FAA-grounded. The app uses a simplified hierarchy to teach priority and should not be mistaken for official legal language.' }),
  m1a: recordFrom('AWH', { topicId: 'm1a', moduleId: 'm1a', topicTitle: 'The Weather Service System', sourceChapter: 'Chapters 1-3', validationStatus: 'needs_review', learnerLevel: ALL_LEVELS, contentContext: ['beginner_foundation', 'checkride_core', 'operational_refresh'], checkrideRelevance: 'medium', operationalRelevance: 'medium', notes: 'Agency-role details and briefing-process wording should be cross-checked against current AIM and FAA services material.' }),
  m16: recordFrom('AWH', { topicId: 'm16', moduleId: 'm16', topicTitle: 'Weather Service & Briefings', sourceChapter: 'Chapters 2-3', validationStatus: 'needs_review', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'This module mixes handbook concepts with regulatory and service-provider statements. It needs a tighter AIM-facing pass.' }),
  m17: recordFrom('AWH', { topicId: 'm17', moduleId: 'm17', topicTitle: 'Heat, Water Vapor & Precipitation', sourceChapter: 'Chapters 5, 6, 14', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: ['beginner_foundation', 'checkride_core', 'operational_refresh'], checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Thermodynamic and precipitation-type instruction is handbook-grounded. Warm-nose teaching language is a useful training abstraction.' }),
  m18: recordFrom('AWH', { topicId: 'm18', moduleId: 'm18', topicTitle: 'Tropical & Arctic Weather', sourceChapter: 'Chapters 17, 21', validationStatus: 'validated_paraphrase', learnerLevel: ADV_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'low', operationalRelevance: 'medium', notes: 'Topic selection tracks FAA handbook scope. Operational checklist items remain paraphrased guidance.' }),
  m19: recordFrom('AWH', { topicId: 'm19', moduleId: 'm19', topicTitle: 'Space Weather & Analysis Charts', sourceChapter: 'Chapters 23, 25', validationStatus: 'needs_review', learnerLevel: PRO_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'low', operationalRelevance: 'medium', notes: 'Analysis-chart coverage is handbook-grounded, but the space-weather portion should be rechecked carefully for current operational framing.' }),
  m20: recordFrom('AWH', { topicId: 'm20', moduleId: 'm20', topicTitle: 'Advanced Weather Products', sourceChapter: 'Chapters 7, 26, 27', validationStatus: 'training_simplification', learnerLevel: PRO_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'This module intentionally condenses multiple FAA products into one briefing workflow. It is useful, but it is not a direct restatement of a single FAA source.' })
};

const FAA_SECTION_VALIDATION = [
  recordFrom('AWH', { topicId: 'm1:s1_1', moduleId: 'm1', sectionId: 's1_1', sectionTitle: 'Layers of the Atmosphere', topicTitle: 'Layers of the Atmosphere', sourceChapter: 'Chapter 4', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: FOUNDATION, checkrideRelevance: 'high', operationalRelevance: 'medium', notes: 'Atmospheric-layer descriptions are handbook-based. Aviation examples are paraphrased for learner clarity.' }),
  recordFrom('AWH', { topicId: 'm2:s2_4', moduleId: 'm2', sectionId: 's2_4', sectionTitle: 'Altimeter Errors & Setting', topicTitle: 'Altimeter Errors & Setting', sourceChapter: 'Chapter 8', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Altimeter-setting concepts are FAA-grounded. The app teaches them with simplified pilot mnemonics.' }),
  recordFrom('AWH', { topicId: 'm3:s3_3', moduleId: 'm3', sectionId: 's3_3', sectionTitle: 'Jet Streams', topicTitle: 'Jet Streams', sourceChapter: 'Chapter 9', validationStatus: 'validated_paraphrase', learnerLevel: ADV_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'Jet-stream structure and planning significance are handbook-aligned.' }),
  recordFrom('AWH', { topicId: 'm4:s4_1', moduleId: 'm4', sectionId: 's4_1', sectionTitle: 'Atmospheric Stability', topicTitle: 'Atmospheric Stability', sourceChapter: 'Chapter 12', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: FOUNDATION, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Parcel-behavior overview is FAA-grounded at concept level.' }),
  recordFrom('AWH', { topicId: 'm4:s4_2', moduleId: 'm4', sectionId: 's4_2', sectionTitle: 'Stability Categories', topicTitle: 'Stability Categories', sourceChapter: 'Chapter 12', validationStatus: 'training_simplification', learnerLevel: ['student', 'private', 'instrument', 'commercial', 'cfi'], contentContext: FOUNDATION, checkrideRelevance: 'high', operationalRelevance: 'medium', notes: 'The red/amber/green stability buckets are a teaching simplification layered on top of FAA parcel theory.' }),
  recordFrom('AWH', { topicId: 'm5:s5_2', moduleId: 'm5', sectionId: 's5_2', sectionTitle: 'Cold Fronts', topicTitle: 'Cold Fronts', sourceChapter: 'Chapter 11', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Cold-front structure and hazard tendencies track FAA treatment.' }),
  recordFrom('AWH', { topicId: 'm5:s5_3', moduleId: 'm5', sectionId: 's5_3', sectionTitle: 'Warm Fronts', topicTitle: 'Warm Fronts', sourceChapter: 'Chapter 11', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Weather-sequence concepts are FAA-grounded. Timeline phrasing remains pilot-training shorthand.' }),
  recordFrom('AWH', { topicId: 'm6:s6_4', moduleId: 'm6', sectionId: 's6_4', sectionTitle: 'The 10 Thunderstorm Hazards', topicTitle: 'The 10 Thunderstorm Hazards', sourceChapter: 'Chapter 22', validationStatus: 'training_simplification', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'The handbook supports thunderstorm hazards, but the numbered list is an app-authored teaching package rather than an FAA list title.' }),
  recordFrom('AWH', { topicId: 'm6:s6_5', moduleId: 'm6', sectionId: 's6_5', sectionTitle: 'Avoidance Rules & Go/No-Go', topicTitle: 'Avoidance Rules & Go/No-Go', sourceChapter: 'Chapter 22', validationStatus: 'training_simplification', learnerLevel: ADV_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'This section is intentionally conservative and operationally useful, but the absolute rule language should not be mistaken for verbatim FAA text.' }),
  recordFrom('AWH', { topicId: 'm7:s7_4', moduleId: 'm7', sectionId: 's7_4', sectionTitle: 'Icing Intensity & PIREPs', topicTitle: 'Icing Intensity & PIREPs', sourceChapter: 'Chapter 20', validationStatus: 'validated_paraphrase', learnerLevel: ADV_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Operational severity categories are FAA-grounded, though reporting format should continue to be cross-checked against AIM wording.' }),
  recordFrom('AWH', { topicId: 'm7:engine-icing', moduleId: 'm7', sectionId: 's7_5', sectionTitle: 'Engine Icing - Carb Ice & HIWC', topicTitle: 'Engine Icing - Carb Ice & HIWC', sourceChapter: 'Chapter 20', validationStatus: 'needs_review', learnerLevel: ADV_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'This section now separates atmospheric icing setup from aircraft-specific response, but it still blends weather teaching with POH/AFM-dependent system guidance and remains below full FAA-backed confidence.' }),
  recordFrom('AWH', { topicId: 'm8:s8_3', moduleId: 'm8', sectionId: 's8_3', sectionTitle: 'Clear Air Turbulence (CAT)', topicTitle: 'Clear Air Turbulence (CAT)', sourceChapter: 'Chapter 19', validationStatus: 'validated_paraphrase', learnerLevel: PRO_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'CAT causes and planning implications are FAA-grounded.' }),
  recordFrom('AWH', { topicId: 'm8:s8_4', moduleId: 'm8', sectionId: 's8_4', sectionTitle: 'Low-Level Wind Shear (LLWS)', topicTitle: 'Low-Level Wind Shear (LLWS)', sourceChapter: 'Chapter 19', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'LLWS treatment fits FAA weather-hazard coverage.' }),
  recordFrom('AWH', { topicId: 'm9:s9_2', moduleId: 'm9', sectionId: 's9_2', sectionTitle: 'Five Types of Fog', topicTitle: 'Five Types of Fog', sourceChapter: 'Chapter 18', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Fog-type descriptions map closely to FAA weather categories.' }),
  recordFrom('AWH', { topicId: 'm9:s9_4', moduleId: 'm9', sectionId: 's9_4', sectionTitle: 'IFR Planning & Fog Decision-Making', topicTitle: 'IFR Planning & Fog Decision-Making', sourceChapter: 'Chapter 18', validationStatus: 'needs_review', learnerLevel: ADV_LEVELS, contentContext: ['operational_refresh'], checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'The wording is now safer and more uncertainty-aware, but this section still includes operational coaching rather than purely source-traceable FAA phrasing.' }),
  recordFrom('AWH', { topicId: 'm11:s11_3', moduleId: 'm11', sectionId: 's11_3', sectionTitle: 'Wind, Visibility & Sky Condition', topicTitle: 'Wind, Visibility & Sky Condition', sourceChapter: 'Chapter 24', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: ['beginner_foundation', 'checkride_core', 'operational_refresh'], checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'METAR field interpretation is handbook-grounded; decode sequencing is instructional rather than regulatory.' }),
  recordFrom('AWH', { topicId: 'm11:s11_4', moduleId: 'm11', sectionId: 's11_4', sectionTitle: 'Present Weather & Remarks', topicTitle: 'Present Weather & Remarks', sourceChapter: 'Chapter 24', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Present-weather coding is FAA-grounded; this record covers the main remarks and weather-phenomena lesson block.' }),
  recordFrom('AWH', { topicId: 'm11:s11_4b', moduleId: 'm11', sectionId: 's11_4b', sectionTitle: 'Weather Code Builder', topicTitle: 'Weather Code Builder', sourceChapter: 'Chapter 24', validationStatus: 'training_simplification', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'medium', operationalRelevance: 'medium', notes: 'The interactive code-builder is a study aid built from FAA weather-code structure rather than a direct FAA presentation format.' }),
  recordFrom('AWH', { topicId: 'm12:s12_2', moduleId: 'm12', sectionId: 's12_2', sectionTitle: 'TAF Format & Change Groups', topicTitle: 'TAF Format & Change Groups', sourceChapter: 'Chapter 27', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Change-group teaching aligns with FAA TAF usage at concept level.' }),
  recordFrom('AWH', { topicId: 'm12:s12_4', moduleId: 'm12', sectionId: 's12_4', sectionTitle: 'Probability Groups & AMD', topicTitle: 'Probability Groups & AMD', sourceChapter: 'Chapter 27', validationStatus: 'needs_review', learnerLevel: PRO_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'Exact operational wording for PROB and amendment usage should be checked carefully against current FAA publication language.' }),
  recordFrom('AWH', { topicId: 'm13:s13_2', moduleId: 'm13', sectionId: 's13_2', sectionTitle: 'PIREP Format', topicTitle: 'PIREP Format', sourceChapter: 'Chapter 24', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'Basic PIREP elements are FAA-grounded.' }),
  recordFrom('AIM', { topicId: 'm13:s13_4', moduleId: 'm13', sectionId: 's13_4', sectionTitle: 'Filing PIREPs - Practical Reporting Guidance', topicTitle: 'Filing PIREPs - Practical Reporting Guidance', sourceChapter: 'Weather information / PIREP guidance', validationStatus: 'needs_review', learnerLevel: ADV_LEVELS, contentContext: ['operational_refresh'], checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'The section now emphasizes safety value and workload/permitting nuance, but it still needs tighter AIM-level sourcing before stronger FAA-authoritative claims would be appropriate.' }),
  recordFrom('AWH', { topicId: 'm14:s14_2', moduleId: 'm14', sectionId: 's14_2', sectionTitle: 'Radar Products', topicTitle: 'Radar Products', sourceChapter: 'Chapters 15, 24', validationStatus: 'training_simplification', learnerLevel: PRO_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'Product-selection guidance is useful, but provider-specific legends and clearance buffers should remain labeled as instructional simplification.' }),
  recordFrom('AWH', { topicId: 'm14:s14_3', moduleId: 'm14', sectionId: 's14_3', sectionTitle: 'Radar Limitations', topicTitle: 'Radar Limitations', sourceChapter: 'Chapters 15, 24', validationStatus: 'validated_paraphrase', learnerLevel: ADV_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Beam overshoot, attenuation, and latency are FAA-grounded hazard concepts.' }),
  recordFrom('AWH', { topicId: 'm15:s15_1', moduleId: 'm15', sectionId: 's15_1', sectionTitle: 'The Advisory Hierarchy', topicTitle: 'The Advisory Hierarchy', sourceChapter: 'Chapter 26', validationStatus: 'training_simplification', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'The hierarchy helps learners prioritize products, but the FAA does not present all advisories as a single official rank-order ladder.' }),
  recordFrom('AWH', { topicId: 'm15:s15_2', moduleId: 'm15', sectionId: 's15_2', sectionTitle: 'Convective SIGMETs in Detail', topicTitle: 'Convective SIGMETs in Detail', sourceChapter: 'Chapter 26', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Product purpose and hazard categories are FAA-grounded. Legal-sounding wording should stay paraphrase unless sourced more precisely.' }),
  recordFrom('AWH', { topicId: 'm15:s15_5', moduleId: 'm15', sectionId: 's15_5', sectionTitle: 'G-AIRMET & GFA Tool', topicTitle: 'G-AIRMET & GFA Tool', sourceChapter: 'Chapter 26', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Graphical advisory use is handbook-grounded.' }),
  recordFrom('AWH', { topicId: 'm1a:s1a_2', moduleId: 'm1a', sectionId: 's1a_2', sectionTitle: 'How a Standard Briefing Is Built', topicTitle: 'How a Standard Briefing Is Built', sourceChapter: 'Chapters 2-3', validationStatus: 'needs_review', learnerLevel: ['student', 'private', 'instrument', 'commercial', 'cfi'], contentContext: CORE_OPS, checkrideRelevance: 'medium', operationalRelevance: 'medium', notes: 'Useful for study flow, but the briefing-component wording should be aligned more tightly to FAA services publications.' }),
  recordFrom('AWH', { topicId: 'm16:s16_2', moduleId: 'm16', sectionId: 's16_2', sectionTitle: 'The Three Types of Briefings', topicTitle: 'The Three Types of Briefings', sourceChapter: 'Chapters 2-3', validationStatus: 'needs_review', learnerLevel: ['student', 'private', 'instrument', 'commercial', 'cfi'], contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'medium', notes: 'This topic is appropriate but should be cross-checked with current AIM and Flight Services publications.' }),
  recordFrom('AWH', { topicId: 'm16:s16_3', moduleId: 'm16', sectionId: 's16_3', sectionTitle: 'Product Latency & Self-Briefing', topicTitle: 'Product Latency & Self-Briefing', sourceChapter: 'Chapter 3', validationStatus: 'training_simplification', learnerLevel: ADV_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'Latency cautions are operationally sound, but the section intentionally compresses product-age concepts into practical training language.' }),
  recordFrom('AWH', { topicId: 'm17:s17_3', moduleId: 'm17', sectionId: 's17_3', sectionTitle: 'Precipitation Types - Temperature Profiles', topicTitle: 'Precipitation Types - Temperature Profiles', sourceChapter: 'Chapter 14', validationStatus: 'validated_paraphrase', learnerLevel: ALL_LEVELS, contentContext: CORE_OPS, checkrideRelevance: 'high', operationalRelevance: 'high', notes: 'Precipitation-type formation is handbook-grounded.' }),
  recordFrom('AWH', { topicId: 'm17:s17_precip_types', moduleId: 'm17', sectionId: 's17_precip_types', sectionTitle: 'Precipitation Types & the Warm-Nose Trap', topicTitle: 'Precipitation Types & the Warm-Nose Trap', sourceChapter: 'Chapter 14', validationStatus: 'training_simplification', learnerLevel: PRO_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'The warm-nose label is useful pilot shorthand for a temperature-profile setup, not an FAA canonical phrase.' }),
  recordFrom('AWH', { topicId: 'm18:s18_2', moduleId: 'm18', sectionId: 's18_2', sectionTitle: 'Tropical Cyclones - Classification', topicTitle: 'Tropical Cyclones - Classification', sourceChapter: 'Chapter 17', validationStatus: 'validated_paraphrase', learnerLevel: ADV_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'low', operationalRelevance: 'medium', notes: 'Classification overview fits handbook scope.' }),
  recordFrom('AWH', { topicId: 'm19:s19_1', moduleId: 'm19', sectionId: 's19_1', sectionTitle: 'Space Weather - Effects on Aviation', topicTitle: 'Space Weather - Effects on Aviation', sourceChapter: 'Chapter 23', validationStatus: 'needs_review', learnerLevel: PRO_LEVELS, contentContext: ['advanced_weather_awareness'], checkrideRelevance: 'low', operationalRelevance: 'medium', notes: 'The lesson is now more clearly scoped as awareness for specialized operations, but it should still not imply operational precision until the text is re-checked more tightly against FAA source language.' }),
  recordFrom('AWH', { topicId: 'm20:s20_4', moduleId: 'm20', sectionId: 's20_4', sectionTitle: 'Complete Advisory Suite', topicTitle: 'Complete Advisory Suite', sourceChapter: 'Chapters 23, 26, 27', validationStatus: 'training_simplification', learnerLevel: PRO_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'low', operationalRelevance: 'medium', notes: 'This overview intentionally compresses several specialized advisory products into an awareness-oriented survey rather than a full FAA procedural treatment.' }),
  recordFrom('AWH', { topicId: 'm20:s20_5', moduleId: 'm20', sectionId: 's20_5', sectionTitle: 'Pre-Flight Briefing Flow - The Full Process', topicTitle: 'Pre-Flight Briefing Flow - The Full Process', sourceChapter: 'Chapters 3, 26, 27', validationStatus: 'training_simplification', learnerLevel: PRO_LEVELS, contentContext: OPS_ADV, checkrideRelevance: 'medium', operationalRelevance: 'high', notes: 'The workflow is useful product coaching, but it is an app-authored study sequence rather than a single FAA-prescribed process.' })
];

const FAA_VALIDATION_RECORDS = [
  ...Object.values(FAA_MODULE_VALIDATION),
  ...FAA_SECTION_VALIDATION
];

const FAAValidation = {
  schema: FAA_VALIDATION_SCHEMA,
  sources: FAA_VALIDATION_SOURCES,
  records: FAA_VALIDATION_RECORDS,
  getModuleRecord(moduleId) {
    return FAA_MODULE_VALIDATION[moduleId] || null;
  },
  getSectionRecord(moduleId, section) {
    const sectionId = section && typeof section === 'object' ? section.id : section;
    const sectionTitle = section && typeof section === 'object' ? section.title : '';
    return FAA_SECTION_VALIDATION.find(record =>
      record.moduleId === moduleId &&
      ((sectionId && record.sectionId === sectionId) || (sectionTitle && record.sectionTitle === sectionTitle))
    ) || this.getModuleRecord(moduleId);
  },
  formatStatus(status) {
    return ({
      validated_exact: 'FAA exact',
      validated_paraphrase: 'FAA paraphrase',
      training_simplification: 'Training simplification',
      needs_review: 'Needs review'
    })[status] || 'Needs review';
  },
  statusTone(status) {
    return ({
      validated_exact: { fg: '#065F46', bg: '#D1FAE5', border: '#10B981' },
      validated_paraphrase: { fg: '#1D4ED8', bg: '#DBEAFE', border: '#60A5FA' },
      training_simplification: { fg: '#92400E', bg: '#FEF3C7', border: '#F59E0B' },
      needs_review: { fg: '#991B1B', bg: '#FEE2E2', border: '#EF4444' }
    })[status] || { fg: '#475569', bg: '#F1F5F9', border: '#CBD5E1' };
  },
  formatContentContext(tags) {
    const labels = {
      beginner_foundation: 'Beginner foundation',
      checkride_core: 'Checkride core',
      operational_refresh: 'Operational refresh',
      advanced_weather_awareness: 'Advanced awareness'
    };
    return (tags || []).map(tag => labels[tag] || tag);
  }
};

window.FAAValidation = FAAValidation;
