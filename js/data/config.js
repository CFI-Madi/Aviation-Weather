// ============================================================
// Aviation Weather Academy — App Configuration
// RANKS, ACT_META, SAMPLE_METAR
// ============================================================

const RANKS=[
  {id:'student',title:'Student Pilot',minXP:0,maxXP:500,emoji:'🎓',color:'#94A3B8',bg:'#F1F5F9'},
  {id:'private',title:'Private Pilot',minXP:500,maxXP:1500,emoji:'✈️',color:'#38BDF8',bg:'#E0F2FE'},
  {id:'instrument',title:'Instrument Rated',minXP:1500,maxXP:3500,emoji:'🛩️',color:'#6366F1',bg:'#EEF2FF'},
  {id:'commercial',title:'Commercial Pilot',minXP:3500,maxXP:7000,emoji:'🌤️',color:'#F59E0B',bg:'#FEF3C7'},
  {id:'atp',title:'ATP Captain',minXP:7000,maxXP:99999,emoji:'🏆',color:'#10B981',bg:'#D1FAE5'}
];

const ACT_META = [
  {act:1,title:'Act 1 — The Sky System',subtitle:'Atmosphere, Pressure, Wind, Clouds, Fronts, Heat, Water Vapor',icon:'🌤️',color:'#0284C7',bg:'#E0F2FE',faa:'Chs. 4–13'},
  {act:2,title:'Act 2 — Hazard Zone',subtitle:'Thunderstorms, Icing, Turbulence, Fog, Mountain, Tropical, Arctic',icon:'⚡',color:'#DC2626',bg:'#FEF2F2',faa:'Chs. 16–22'},
  {act:3,title:'Act 3 — The Products',subtitle:'METAR, TAF, PIREPs, Radar, Advisories, Space Wx, Charts',icon:'📡',color:'#7C3AED',bg:'#F5F3FF',faa:'Chs. 23–27'}
];

// Reference METAR for Act 3 interactive decoder (M11)
const SAMPLE_METAR = {
  raw: 'KOKC 011955Z AUTO 22015G25KT 180V250 3/4SM R17L/2600FT +TSRA BR OVC010CB 18/16 A2992 RMK AO2 TSB25 SLP132',
  tokens: [
    {token:'KOKC', label:'Station ID', color:'#7C3AED', bg:'#F5F3FF', detail:'ICAO 4-letter identifier. K = CONUS. OKC = Oklahoma City (Will Rogers World Airport). Alaska starts PA, Hawaii PH.'},
    {token:'011955Z', label:'Date/Time', color:'#0284C7', bg:'#E0F2FE', detail:'Day 01, time 1955 UTC (Z = Zulu/UTC). Always in UTC regardless of local time zone. The "Z" is mandatory — always Zulu.'},
    {token:'AUTO', label:'Report Type', color:'#64748B', bg:'#F8FAFC', detail:'AUTO = fully automated, no human input. If human-corrected: COR. Manual stations have no modifier. Most US airports are AUTO.'},
    {token:'22015G25KT', label:'Wind', color:'#DC2626', bg:'#FEF2F2', detail:'220° true at 15 kt, gusting to 25 kt. Direction = true north. KT = knots (US standard). VRB = variable direction. 00000KT = calm. G = gust (≥10 kt variation between peaks/lulls).'},
    {token:'180V250', label:'Variable Wind Dir', color:'#EA580C', bg:'#FFF7ED', detail:'Wind direction varying between 180° and 250°. Reported when variation ≥60° and speed >6 kt. Direction shown clockwise from low to high.'},
    {token:'3/4SM', label:'Visibility', color:'#065F46', bg:'#D1FAE5', detail:'3/4 statute mile prevailing visibility. SM = statute miles. M1/4SM = less than 1/4 SM. P6SM = greater than 6 SM. IFR: <3 SM. LIFR: <1 SM.'},
    {token:'R17L/2600FT', label:'RVR', color:'#0369A1', bg:'#DBEAFE', detail:'Runway Visual Range for Runway 17 Left: 2,600 ft. Reported when prevailing vis ≤1 SM or RVR ≤6,000 ft. More precise than prevailing visibility for approach decisions.'},
    {token:'+TSRA BR', label:'Weather', color:'#7C3AED', bg:'#F5F3FF', detail:'+ = heavy intensity. TS = thunderstorm. RA = rain. BR = mist (visibility 5/8–6 SM). Other: - (light), FG (fog <5/8), SN (snow), GR (hail), FZRA (freezing rain).'},
    {token:'OVC010CB', label:'Sky Condition', color:'#1D4ED8', bg:'#EFF6FF', detail:'Overcast at 1,000 ft AGL (010 = hundreds of feet). CB = cumulonimbus. Coverage: FEW (1-2), SCT (3-4), BKN (5-7 = ceiling), OVC (8 = ceiling). CLR = clear below 12,000 ft (automated).'},
    {token:'18/16', label:'Temp/Dewpoint', color:'#059669', bg:'#ECFDF5', detail:'Temperature 18°C / Dewpoint 16°C. T-Td spread = 2°C — near saturation! Fog likely. Negative: M06 = -6°C. Used for density altitude and fog potential.'},
    {token:'A2992', label:'Altimeter', color:'#9333EA', bg:'#FAF5FF', detail:'Altimeter setting 29.92 inHg. Set this in your Kollsman window. hPa equivalent: 1013.25 mb. Outside the US, QNH is used (in hPa).'},
    {token:'RMK', label:'Remarks Start', color:'#6B7280', bg:'#F9FAFB', detail:'RMK separates the METAR body from remarks. Everything after RMK is additional info — often critical for operations.'},
    {token:'AO2', label:'Station Type', color:'#6B7280', bg:'#F9FAFB', detail:'AO2 = automated WITH precipitation discriminator (can distinguish rain from snow). AO1 = WITHOUT. Important for trusting precipitation type reports.'},
    {token:'TSB25', label:'TS Begin Time', color:'#DC2626', bg:'#FEF2F2', detail:'Thunderstorm began at :25 past the hour. TSE = thunderstorm ended. Combined: TSB10E35 = began :10, ended :35.'},
    {token:'SLP132', label:'Sea Level Pressure', color:'#6B7280', bg:'#F9FAFB', detail:'Sea level pressure 1013.2 mb. Decode: 132 → add 10 if result <800 → 1013.2 mb. SLPNO = not available.'},
  ]
};
