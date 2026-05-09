// ============================================================
// Aviation Weather Academy — App Configuration
// RANKS, LEVELS, LEVEL_META, SAMPLE_METAR
// ============================================================

const RANKS=[
  {id:'student',title:'Student Pilot',minXP:0,maxXP:500,emoji:'🎓',color:'#94A3B8',bg:'#F1F5F9'},
  {id:'private',title:'Private Pilot',minXP:500,maxXP:1500,emoji:'✈️',color:'#38BDF8',bg:'#E0F2FE'},
  {id:'instrument',title:'Instrument Rated',minXP:1500,maxXP:3500,emoji:'🛩️',color:'#6366F1',bg:'#EEF2FF'},
  {id:'commercial',title:'Commercial Pilot',minXP:3500,maxXP:7000,emoji:'🌤️',color:'#F59E0B',bg:'#FEF3C7'},
  {id:'atp',title:'ATP Captain',minXP:7000,maxXP:99999,emoji:'🏆',color:'#10B981',bg:'#D1FAE5'}
];

// Learner-level taxonomy — drives module grouping, dashboard recommendations,
// onboarding "where are you in your training" pick, and the progression CTA.
// Order is meaningful: each level is a stretch goal of the one before.
const LEVELS = ['student', 'private', 'instrument', 'commercial'];

const LEVEL_META = [
  {id:'student',    order:1, title:'Student Pilot',    subtitle:'Atmosphere, pressure, wind, clouds, METAR — the foundations every certificate starts with', icon:'🎓', color:'#0284C7', bg:'#E0F2FE', faa:'Chs. 4, 7–8, 9–10, 12, 24'},
  {id:'private',    order:2, title:'Private Pilot',    subtitle:'Operational weather: fronts, thunderstorms, fog, mountain, TAF, water vapor', icon:'🛩️', color:'#10B981', bg:'#D1FAE5', faa:'Chs. 5–6, 11, 16, 18, 22, 27'},
  {id:'instrument', order:3, title:'Instrument',       subtitle:'IMC hazards: icing, turbulence, radar, advisories, tropical & arctic',  icon:'🌧️', color:'#6366F1', bg:'#EEF2FF', faa:'Chs. 15, 17, 19, 20, 21, 26'},
  {id:'commercial', order:4, title:'Commercial+',      subtitle:'Advanced products: space weather, surface analysis, forecast charts',     icon:'🌤️', color:'#F59E0B', bg:'#FEF3C7', faa:'Chs. 23, 25'}
];

// METAR Practice library — 10 annotated examples covering decoding situations
// a Part-61 student actually encounters. Each entry has a raw METAR, a short
// scenario label/title for the picker, and per-token annotations.
//
// Token color/bg conventions (kept consistent across the library):
//   station=#7C3AED, time=#0284C7, modifier=#64748B, wind=#DC2626,
//   vis=#065F46, weather=#7C3AED, sky=#1D4ED8, temp=#059669,
//   altimeter=#9333EA, remarks=#6B7280, RVR=#0369A1, peak/special=#DC2626
const METAR_LIBRARY = [
  {
    id: 'lib_clean_vfr',
    title: 'Clean VFR — quiet daytime',
    summary: 'Light wind, clear, large T-Td spread. The "no surprises" baseline.',
    raw: 'KCLT 011755Z 18004KT 10SM CLR 22/12 A3010',
    tokens: [
      {token:'KCLT',     label:'Station ID',         color:'#7C3AED', bg:'#F5F3FF', detail:'Charlotte-Douglas International. K = CONUS. ICAO 4-letter identifier. Alaska stations start PA, Hawaii PH.'},
      {token:'011755Z',  label:'Date/Time',          color:'#0284C7', bg:'#E0F2FE', detail:'Day 01 at 1755 UTC. Always Zulu. Format DDHHMM Z. Look at the date to be sure you are reading today\'s METAR — METARs cycle hourly.'},
      {token:'18004KT',  label:'Wind',               color:'#DC2626', bg:'#FEF2F2', detail:'180° true at 4 kt. No gust group because peak/lull variation is under 10 kt. 00000KT would be calm.'},
      {token:'10SM',     label:'Visibility',         color:'#065F46', bg:'#D1FAE5', detail:'10 statute miles prevailing visibility — the maximum value reported in US METARs. Greater than 10 SM is also reported as 10SM (unbounded above).'},
      {token:'CLR',      label:'Sky Condition',      color:'#1D4ED8', bg:'#EFF6FF', detail:'CLR = no clouds detected below 12,000 ft AGL by the automated sensor. SKC (manual report) means the human observer saw no clouds anywhere. CLR is automated-station-only.'},
      {token:'22/12',    label:'Temp/Dewpoint',      color:'#059669', bg:'#ECFDF5', detail:'Temperature 22°C, dewpoint 12°C. T-Td spread = 10°C — comfortably dry. No fog or BR risk in the next few hours from this state.'},
      {token:'A3010',    label:'Altimeter',          color:'#9333EA', bg:'#FAF5FF', detail:'29.92 inHg standard, this is 30.10 — slightly higher than standard. Set in the Kollsman window before takeoff. Outside the US, altimeter is reported as QNH in hPa (Q1019).'}
    ]
  },
  {
    id: 'lib_marginal_br',
    title: 'Marginal VFR with BR (mist)',
    summary: 'Visibility 5 SM with mist; broken layer; T-Td near-saturation. Fog watch.',
    raw: 'KAVL 121355Z 04003KT 5SM BR SCT004 OVC012 18/17 A3018 RMK AO2 SLP223',
    tokens: [
      {token:'KAVL',     label:'Station ID',         color:'#7C3AED', bg:'#F5F3FF', detail:'Asheville Regional, NC — a Blue Ridge–edge field that lifts moist Carolina air upslope and is fog-prone in early morning.'},
      {token:'121355Z',  label:'Date/Time',          color:'#0284C7', bg:'#E0F2FE', detail:'Day 12 at 1355 UTC. In the eastern US that is mid-morning local — radiation fog from overnight is often still burning off at this hour.'},
      {token:'04003KT',  label:'Wind',               color:'#DC2626', bg:'#FEF2F2', detail:'040° at 3 kt. Light-and-variable conditions tend to keep moisture pooled near the surface — a fog/mist driver.'},
      {token:'5SM',      label:'Visibility',         color:'#065F46', bg:'#D1FAE5', detail:'5 SM prevailing — that is MVFR by visibility (3–5 SM band).'},
      {token:'BR',       label:'Weather (Mist)',     color:'#7C3AED', bg:'#F5F3FF', detail:'BR = mist. In a METAR, BR is reported when visibility is 5/8 SM up to less than 7 SM AND T−Td is small (typically ≤ ~20 °C / 40 °F). When T-Td gets larger you would see HZ instead.'},
      {token:'SCT004',   label:'Sky — Scattered',    color:'#1D4ED8', bg:'#EFF6FF', detail:'Scattered clouds at 400 ft AGL (3/8 to 4/8 coverage). SCT does not count as a ceiling; only BKN/OVC/VV define a ceiling.'},
      {token:'OVC012',   label:'Sky — Ceiling',      color:'#1D4ED8', bg:'#EFF6FF', detail:'Overcast at 1,200 ft AGL — this is the ceiling. 1,200 ft puts the ceiling in the MVFR band (1,000–3,000 ft).'},
      {token:'18/17',    label:'Temp/Dewpoint',      color:'#059669', bg:'#ECFDF5', detail:'18 °C / 17 °C — only 1 °C spread. Saturation is one degree of cooling away. If the surface cools after sunrise (uncommon) or upslope flow continues, expect FG to replace BR.'},
      {token:'A3018',    label:'Altimeter',          color:'#9333EA', bg:'#FAF5FF', detail:'30.18 inHg — ~26 hPa above standard. High pressure typically means fair weather, but moist surface air under a high can still trap fog/mist.'},
      {token:'RMK',      label:'Remarks Start',      color:'#6B7280', bg:'#F9FAFB', detail:'Body ends here; everything after RMK is additional info. AO1/AO2/SLP/PK WND/TS times/precipitation amount all live in remarks.'},
      {token:'AO2',      label:'Station Type',       color:'#6B7280', bg:'#F9FAFB', detail:'Automated station WITH precipitation discriminator. AO1 = without (precipitation type is unreliable from AO1).'},
      {token:'SLP223',   label:'Sea Level Pressure', color:'#6B7280', bg:'#F9FAFB', detail:'Sea-level pressure 1022.3 hPa. Decode: prepend "10" if value < 500, prepend "9" otherwise. 223 → 1022.3.'}
    ]
  },
  {
    id: 'lib_ifr_fg',
    title: 'IFR with FG — fog at minimums',
    summary: 'Vis 1/4 SM, fog, vertical visibility — saturated, no defined ceiling.',
    raw: 'KGSO 060955Z VRB02KT 1/4SM FG VV001 12/12 A3008 RMK AO2 SLP186',
    tokens: [
      {token:'KGSO',     label:'Station ID',         color:'#7C3AED', bg:'#F5F3FF', detail:'Piedmont Triad International, Greensboro NC. Sits in a basin that traps radiation fog overnight.'},
      {token:'060955Z',  label:'Date/Time',          color:'#0284C7', bg:'#E0F2FE', detail:'Day 06 at 0955 UTC ≈ 0455 local EDT. Pre-dawn — radiation fog peak.'},
      {token:'VRB02KT',  label:'Wind — Variable',    color:'#DC2626', bg:'#FEF2F2', detail:'VRB = direction varies and speed is ≤ 6 kt, so a single direction is not reliable. Calm-ish conditions favor fog formation.'},
      {token:'1/4SM',    label:'Visibility',         color:'#065F46', bg:'#D1FAE5', detail:'1/4 statute mile prevailing visibility. Below 1 SM = LIFR. M1/4SM (with M-prefix) would be "less than 1/4 SM".'},
      {token:'FG',       label:'Weather (Fog)',      color:'#7C3AED', bg:'#F5F3FF', detail:'FG = fog. Reported in a METAR when visibility is less than 5/8 SM. FZFG would be freezing fog (T < 0 °C).'},
      {token:'VV001',    label:'Vertical Visibility',color:'#1D4ED8', bg:'#EFF6FF', detail:'VV = indefinite ceiling — sky is obscured (e.g. by fog) and the observer cannot determine cloud heights. VV001 = vertical visibility 100 ft. Treat as ceiling for IFR/MVFR classification.'},
      {token:'12/12',    label:'Temp/Dewpoint',      color:'#059669', bg:'#ECFDF5', detail:'12 °C / 12 °C — saturated, T-Td spread = 0 °C. Fog is at the surface and will not lift until the surface warms to break the inversion or wind picks up.'},
      {token:'A3008',    label:'Altimeter',          color:'#9333EA', bg:'#FAF5FF', detail:'30.08 inHg.'},
      {token:'RMK',      label:'Remarks Start',      color:'#6B7280', bg:'#F9FAFB', detail:'Marker for the end of the body and the start of supplementary info.'},
      {token:'AO2',      label:'Station Type',       color:'#6B7280', bg:'#F9FAFB', detail:'Automated with precipitation discriminator. Precipitation type reports from AO2 are usable.'},
      {token:'SLP186',   label:'Sea Level Pressure', color:'#6B7280', bg:'#F9FAFB', detail:'Sea-level pressure 1018.6 hPa.'}
    ]
  },
  {
    id: 'lib_thunderstorm',
    title: 'Active thunderstorm — TSRA + CB',
    summary: 'Heavy thunderstorm with rain, gusty wind, CB layer, distant lightning, TS start time noted.',
    raw: 'KCLT 232055Z 28017G31KT 2SM +TSRA BR BKN015CB OVC025 26/22 A3001 RMK AO2 LTG DSNT NW TSB45 SLP163',
    tokens: [
      {token:'KCLT',         label:'Station ID',           color:'#7C3AED', bg:'#F5F3FF', detail:'Charlotte-Douglas. Convective season afternoons in the Carolinas often start with isolated cells along the foothills and propagate east.'},
      {token:'232055Z',      label:'Date/Time',            color:'#0284C7', bg:'#E0F2FE', detail:'Day 23 at 2055 UTC ≈ 1655 local EDT. Peak diurnal heating window for convection.'},
      {token:'28017G31KT',   label:'Wind with Gusts',      color:'#DC2626', bg:'#FEF2F2', detail:'280° at 17 kt, gusting 31 kt. Gusts are reported when peak/lull variation ≥ 10 kt. Active convection nearby — gust front is producing the variation.'},
      {token:'2SM',          label:'Visibility',           color:'#065F46', bg:'#D1FAE5', detail:'2 SM prevailing — IFR by visibility (1–3 SM). Visibility in a thunderstorm cell can drop further with little warning.'},
      {token:'+TSRA BR',     label:'Weather',              color:'#7C3AED', bg:'#F5F3FF', detail:'+TSRA = heavy thunderstorm with rain. BR follows because residual mist is reducing visibility outside the rain shaft. Intensity prefix: "-" light, no prefix moderate, "+" heavy. TS by itself = thunderstorm with no precipitation reaching ground.'},
      {token:'BKN015CB',     label:'Sky — CB Layer',       color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken layer at 1,500 ft AGL with cumulonimbus. CB suffix on a layer means thunderstorm/severe-WX cloud type. TCU = towering cumulus (developing, not yet a thunderstorm).'},
      {token:'OVC025',       label:'Sky — Overcast',       color:'#1D4ED8', bg:'#EFF6FF', detail:'Overcast at 2,500 ft. The lower BKN015CB defines the ceiling for IFR purposes.'},
      {token:'26/22',        label:'Temp/Dewpoint',        color:'#059669', bg:'#ECFDF5', detail:'26 °C / 22 °C. T-Td spread = 4 °C — moist, supports continued convective development. LCL ≈ 4×400 = 1,600 ft AGL — matches the BKN015CB base.'},
      {token:'A3001',        label:'Altimeter',            color:'#9333EA', bg:'#FAF5FF', detail:'30.01 inHg.'},
      {token:'RMK',          label:'Remarks Start',        color:'#6B7280', bg:'#F9FAFB', detail:'Remarks group flagging additional convection details.'},
      {token:'AO2',          label:'Station Type',         color:'#6B7280', bg:'#F9FAFB', detail:'Automated with precipitation discriminator.'},
      {token:'LTG DSNT NW',  label:'Lightning Location',   color:'#DC2626', bg:'#FEF2F2', detail:'Lightning distant northwest. DSNT = distant (10–30 NM). VC = vicinity (5–10 NM). Without a qualifier, lightning is at the station. CG/CC/CA = cloud-to-ground / cloud-to-cloud / cloud-to-air.'},
      {token:'TSB45',        label:'TS Begin Time',        color:'#DC2626', bg:'#FEF2F2', detail:'Thunderstorm began at :45 past the hour. TSE = ended. TSB10E35 = began :10, ended :35.'},
      {token:'SLP163',       label:'Sea Level Pressure',   color:'#6B7280', bg:'#F9FAFB', detail:'Sea-level pressure 1016.3 hPa.'}
    ]
  },
  {
    id: 'lib_freezing_rain',
    title: 'Winter precipitation — FZRA + SLP',
    summary: 'Light freezing rain at 3 SM, OVC008, sub-freezing temperatures. SLD risk.',
    raw: 'KORD 081453Z 09010KT 3SM -FZRA BR BKN008 OVC020 M01/M02 A3015 RMK AO2 SLP207',
    tokens: [
      {token:'KORD',     label:'Station ID',           color:'#7C3AED', bg:'#F5F3FF', detail:'Chicago O\'Hare International. Northern-tier winter precipitation typing situation.'},
      {token:'081453Z',  label:'Date/Time',            color:'#0284C7', bg:'#E0F2FE', detail:'Day 08 at 1453 UTC ≈ 0853 CST.'},
      {token:'09010KT',  label:'Wind',                 color:'#DC2626', bg:'#FEF2F2', detail:'090° at 10 kt — easterly. In Chicago that flow can advect Lake Michigan moisture inland.'},
      {token:'3SM',      label:'Visibility',           color:'#065F46', bg:'#D1FAE5', detail:'3 SM — at the IFR/MVFR boundary (IFR is < 3 SM, so 3 SM exactly is MVFR).'},
      {token:'-FZRA',    label:'Weather (FZRA)',       color:'#7C3AED', bg:'#F5F3FF', detail:'Light freezing rain. Drops are liquid above the surface but freeze on contact with sub-freezing surfaces (including the airframe). FZRA implies a warm layer aloft above a sub-freezing surface layer — and SLD is possible. Highest priority hazard in this report.'},
      {token:'BR',       label:'Weather (Mist)',       color:'#7C3AED', bg:'#F5F3FF', detail:'Mist alongside FZRA — visibility-reducing moisture at the surface.'},
      {token:'BKN008',   label:'Sky — Ceiling',        color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 800 ft AGL — the ceiling. Below 1,000 ft = IFR by ceiling. Below 500 ft = LIFR.'},
      {token:'OVC020',   label:'Sky — Overcast',       color:'#1D4ED8', bg:'#EFF6FF', detail:'Overcast at 2,000 ft. The lower BKN008 already defines the ceiling.'},
      {token:'M01/M02',  label:'Temp/Dewpoint',        color:'#059669', bg:'#ECFDF5', detail:'M = minus. Temperature −1 °C / dewpoint −2 °C. Surface is sub-freezing — confirms the FZRA reading; surface ice accumulation likely.'},
      {token:'A3015',    label:'Altimeter',            color:'#9333EA', bg:'#FAF5FF', detail:'30.15 inHg.'},
      {token:'RMK',      label:'Remarks Start',        color:'#6B7280', bg:'#F9FAFB', detail:'Marker.'},
      {token:'AO2',      label:'Station Type',         color:'#6B7280', bg:'#F9FAFB', detail:'Automated with precipitation discriminator. The discriminator is what allows the report to type FZRA vs PL vs SN.'},
      {token:'SLP207',   label:'Sea Level Pressure',   color:'#6B7280', bg:'#F9FAFB', detail:'Sea-level pressure 1020.7 hPa.'}
    ]
  },
  {
    id: 'lib_high_gusts',
    title: 'Strong gusts — wind alone',
    summary: 'Sustained 23 kt gusting 37 kt, otherwise clear. Crosswind / mechanical-turbulence focus.',
    raw: 'KJQF 142155Z 26023G37KT 10SM SKC 28/14 A2995',
    tokens: [
      {token:'KJQF',     label:'Station ID',           color:'#7C3AED', bg:'#F5F3FF', detail:'Concord-Padgett Regional, NC — Charlotte Flight Academy\'s home field.'},
      {token:'142155Z',  label:'Date/Time',            color:'#0284C7', bg:'#E0F2FE', detail:'Day 14 at 2155 UTC ≈ 1755 local EDT. Late-afternoon dry post-frontal flow on Carolinas Piedmont.'},
      {token:'26023G37KT', label:'Wind with Gusts',    color:'#DC2626', bg:'#FEF2F2', detail:'260° true at 23 kt, gusting 37 kt. Gust = G prefix. The 14-kt spread between sustained and peak is well above the 10-kt reporting threshold. Crosswind component on KJQF\'s 02/20 runway is substantial.'},
      {token:'10SM',     label:'Visibility',           color:'#065F46', bg:'#D1FAE5', detail:'10 SM — unrestricted.'},
      {token:'SKC',      label:'Sky Condition',        color:'#1D4ED8', bg:'#EFF6FF', detail:'SKC = sky clear. Manual report (a human observer is reporting). SKC vs CLR: SKC = no clouds anywhere; CLR = no clouds detected by an automated sensor below 12,000 ft.'},
      {token:'28/14',    label:'Temp/Dewpoint',        color:'#059669', bg:'#ECFDF5', detail:'28 °C / 14 °C. Spread = 14 °C — quite dry. No fog/BR risk.'},
      {token:'A2995',    label:'Altimeter',            color:'#9333EA', bg:'#FAF5FF', detail:'29.95 inHg — 0.03 below standard. Slightly lower-than-standard pressure pairs naturally with this kind of post-frontal NW gradient.'}
    ]
  },
  {
    id: 'lib_low_ceiling_high_vis',
    title: 'Low ceiling, high visibility',
    summary: 'OVC at 600 ft with 10 SM under it. Teaches that ceiling alone defines IFR.',
    raw: 'KAVL 011854Z 14005KT 10SM OVC006 16/14 A3022 RMK AO2 SLP232',
    tokens: [
      {token:'KAVL',     label:'Station ID',           color:'#7C3AED', bg:'#F5F3FF', detail:'Asheville Regional. Mountain-shoulder field where stratus often clamps a low ceiling under clear visibility above.'},
      {token:'011854Z',  label:'Date/Time',            color:'#0284C7', bg:'#E0F2FE', detail:'Day 01 at 1854 UTC.'},
      {token:'14005KT',  label:'Wind',                 color:'#DC2626', bg:'#FEF2F2', detail:'140° at 5 kt — light SE flow.'},
      {token:'10SM',     label:'Visibility',           color:'#065F46', bg:'#D1FAE5', detail:'10 SM — looks like VFR-quality visibility in isolation. Do not stop reading the METAR here.'},
      {token:'OVC006',   label:'Sky — Ceiling',        color:'#1D4ED8', bg:'#EFF6FF', detail:'Overcast at 600 ft AGL. THIS is the ceiling. IFR is defined as ceiling < 1,000 ft OR vis < 3 SM. Ceiling drives IFR here even though visibility is unrestricted underneath.'},
      {token:'16/14',    label:'Temp/Dewpoint',        color:'#059669', bg:'#ECFDF5', detail:'T-Td spread = 2 °C — saturation close to the ground; matches a low stratus ceiling.'},
      {token:'A3022',    label:'Altimeter',            color:'#9333EA', bg:'#FAF5FF', detail:'30.22 inHg.'},
      {token:'RMK',      label:'Remarks Start',        color:'#6B7280', bg:'#F9FAFB', detail:'Marker.'},
      {token:'AO2',      label:'Station Type',         color:'#6B7280', bg:'#F9FAFB', detail:'Automated with precipitation discriminator.'},
      {token:'SLP232',   label:'Sea Level Pressure',   color:'#6B7280', bg:'#F9FAFB', detail:'1023.2 hPa.'}
    ]
  },
  {
    id: 'lib_cavok',
    title: 'VRB winds + CAVOK (international)',
    summary: 'Variable light winds with CAVOK in lieu of vis/cloud groups. ICAO format.',
    raw: 'EHAM 071420Z VRB02KT CAVOK 19/08 Q1024 NOSIG',
    tokens: [
      {token:'EHAM',     label:'Station ID',           color:'#7C3AED', bg:'#F5F3FF', detail:'Amsterdam Schiphol. EH = the Netherlands. ICAO format used outside CONUS.'},
      {token:'071420Z',  label:'Date/Time',            color:'#0284C7', bg:'#E0F2FE', detail:'Day 07 at 1420 UTC.'},
      {token:'VRB02KT',  label:'Wind — Variable',      color:'#DC2626', bg:'#FEF2F2', detail:'Variable direction at 2 kt. VRB is used when speed is ≤ 6 kt and direction is not steady.'},
      {token:'CAVOK',    label:'Ceiling & Vis OK',     color:'#065F46', bg:'#D1FAE5', detail:'CAVOK = "Ceiling and Visibility OK". Replaces the visibility, weather, and cloud groups all at once when ALL of these are true: visibility ≥ 10 km, no cloud below 5,000 ft (or below the highest minimum-sector altitude, whichever is greater) AND no CB/TCU regardless of altitude, AND no significant weather. Used worldwide except in the US.'},
      {token:'19/08',    label:'Temp/Dewpoint',        color:'#059669', bg:'#ECFDF5', detail:'19 °C / 8 °C — comfortably dry.'},
      {token:'Q1024',    label:'Altimeter (QNH)',      color:'#9333EA', bg:'#FAF5FF', detail:'Q-prefix means hPa (QNH). 1024 hPa. US uses A-prefix for inHg (e.g. A3024). Convert: 1 inHg = 33.8639 hPa, so 1024 hPa ≈ 30.24 inHg.'},
      {token:'NOSIG',    label:'Trend Forecast',       color:'#6B7280', bg:'#F9FAFB', detail:'NOSIG = no significant change expected in the next two hours. Other trends: BECMG (becoming) and TEMPO (temporary). Not used in US METARs.'}
    ]
  },
  {
    id: 'lib_pk_wnd',
    title: 'PK WND remark — peak wind',
    summary: 'Substantive remarks: peak wind, T1xxx precise temperature. The back half of the METAR.',
    raw: 'KSFO 281756Z 25018G28KT 10SM FEW015 SCT200 18/12 A2998 RMK AO2 PK WND 25033/1745 SLP153 T01780122',
    tokens: [
      {token:'KSFO',         label:'Station ID',         color:'#7C3AED', bg:'#F5F3FF', detail:'San Francisco International. Marine-influenced afternoon westerlies.'},
      {token:'281756Z',      label:'Date/Time',          color:'#0284C7', bg:'#E0F2FE', detail:'Day 28 at 1756 UTC ≈ 1056 PDT — late morning when the marine push starts.'},
      {token:'25018G28KT',   label:'Wind with Gusts',    color:'#DC2626', bg:'#FEF2F2', detail:'250° at 18 kt, gusting 28 kt — the marine push.'},
      {token:'10SM',         label:'Visibility',         color:'#065F46', bg:'#D1FAE5', detail:'10 SM.'},
      {token:'FEW015',       label:'Sky — Few',          color:'#1D4ED8', bg:'#EFF6FF', detail:'Few clouds at 1,500 ft AGL. FEW = 1–2/8 coverage. Doesn\'t count as a ceiling.'},
      {token:'SCT200',       label:'Sky — Scattered',    color:'#1D4ED8', bg:'#EFF6FF', detail:'Scattered at 20,000 ft (200 hundreds). High-level cirrus or contrails.'},
      {token:'18/12',        label:'Temp/Dewpoint',      color:'#059669', bg:'#ECFDF5', detail:'18 °C / 12 °C. Spread = 6 °C.'},
      {token:'A2998',        label:'Altimeter',          color:'#9333EA', bg:'#FAF5FF', detail:'29.98 inHg.'},
      {token:'RMK',          label:'Remarks Start',      color:'#6B7280', bg:'#F9FAFB', detail:'Body ends. Substantive remarks follow.'},
      {token:'AO2',          label:'Station Type',       color:'#6B7280', bg:'#F9FAFB', detail:'Automated with precipitation discriminator.'},
      {token:'PK WND 25033/1745', label:'Peak Wind',     color:'#DC2626', bg:'#FEF2F2', detail:'Peak wind since the last hourly METAR was 250° at 33 kt at 17:45 UTC. PK WND ddd ff/(hh)mm. The hour digits are dropped if it\'s in the same hour as the report. 33 kt is 5 kt higher than the 28 kt sustained-period gust shown in the body — a useful signal that gusts are still topping the body group.'},
      {token:'SLP153',       label:'Sea Level Pressure', color:'#6B7280', bg:'#F9FAFB', detail:'Sea-level pressure 1015.3 hPa.'},
      {token:'T01780122',    label:'Precise Temp/Dew',   color:'#059669', bg:'#ECFDF5', detail:'T-group: temperature 17.8 °C / dewpoint 12.2 °C, to the tenth of a °C. Format T(s)(TTT)(s)(TTT) where s = sign (0 = positive, 1 = negative). 0178 → +17.8 °C; 0122 → +12.2 °C. Use this for precision; the body 18/12 is rounded.'}
    ]
  },
  {
    id: 'lib_auto_dollar',
    title: 'AUTO with $ maintenance flag',
    summary: 'Fully automated, sub-zero dewpoint, sensor needs maintenance — be skeptical.',
    raw: 'KDEN 162253Z AUTO 36015G24KT 10SM CLR 24/M03 A3015 RMK AO2 SLP145 $',
    tokens: [
      {token:'KDEN',     label:'Station ID',           color:'#7C3AED', bg:'#F5F3FF', detail:'Denver International. High-elevation field — density-altitude implications even with this 24 °C surface temperature.'},
      {token:'162253Z',  label:'Date/Time',            color:'#0284C7', bg:'#E0F2FE', detail:'Day 16 at 2253 UTC ≈ 1653 MDT.'},
      {token:'AUTO',     label:'Report Type',          color:'#64748B', bg:'#F8FAFC', detail:'AUTO = fully automated, no human input. COR would be a corrected report. The absence of a modifier means manual / human-augmented. AUTO has known reporting limits — see the $ flag at the end.'},
      {token:'36015G24KT', label:'Wind with Gusts',    color:'#DC2626', bg:'#FEF2F2', detail:'360° at 15 kt, gusting 24 kt. Convergence-line wind common over the high plains in the afternoon.'},
      {token:'10SM',     label:'Visibility',           color:'#065F46', bg:'#D1FAE5', detail:'10 SM — unrestricted. Visibility sensors are reasonably reliable on AUTO stations.'},
      {token:'CLR',      label:'Sky Condition',        color:'#1D4ED8', bg:'#EFF6FF', detail:'CLR = no clouds detected below 12,000 ft AGL. Note that AO2 sensors do not look above 12,000 ft, so cirrus could be present but unreported.'},
      {token:'24/M03',   label:'Temp/Dewpoint',        color:'#059669', bg:'#ECFDF5', detail:'24 °C / −3 °C. Very large spread (27 °C) — high-plains dry. Density altitude on a hot Denver afternoon is the headline; this T-Td drives that.'},
      {token:'A3015',    label:'Altimeter',            color:'#9333EA', bg:'#FAF5FF', detail:'30.15 inHg.'},
      {token:'RMK',      label:'Remarks Start',        color:'#6B7280', bg:'#F9FAFB', detail:'Marker.'},
      {token:'AO2',      label:'Station Type',         color:'#6B7280', bg:'#F9FAFB', detail:'Automated with precipitation discriminator.'},
      {token:'SLP145',   label:'Sea Level Pressure',   color:'#6B7280', bg:'#F9FAFB', detail:'1014.5 hPa.'},
      {token:'$',        label:'Maintenance Indicator',color:'#DC2626', bg:'#FEF2F2', detail:'$ = the automated station has detected that one of its sensors needs maintenance. Treat all values from this report as suspect — especially precipitation type, ceiling, and any group dependent on the flagged sensor. Get a second source (PIREP, neighbouring METAR, ATIS) before trusting marginal numbers.'}
    ]
  }
];

// Backward-compat alias: keeps any old caller of SAMPLE_METAR working without modification.
const SAMPLE_METAR = METAR_LIBRARY[0];

// ============================================================
// TAF Practice library — 8 annotated examples covering the core
// change-group vocabulary a Part-61 student needs. Companion to
// METAR_LIBRARY. All annotations cite FAA-H-8083-28B Chapter 27.
//
// Shape:
//   { id, title, summary, raw, rows: [
//       { kind: 'header', tokens: [...] },
//       { kind: 'change', groupType: 'FM'|'TEMPO'|'BECMG'|'PROB'|'WS', tokens: [...] }
//     ] }
//
// Token color/bg conventions parallel METAR_LIBRARY where the field
// is the same (wind=#DC2626, vis=#065F46, sky=#1D4ED8, weather=#7C3AED,
// station=#7C3AED, time/valid=#0284C7, modifier=#64748B). Change-group
// keyword tokens carry per-type colors that match the row gutter:
//   FM    sky       #0284C7 / bg #E0F2FE
//   TEMPO pink      #EC4899 / bg #FDF2F8
//   BECMG emerald   #10B981 / bg #D1FAE5
//   PROB  violet    #8B5CF6 / bg #F5F3FF
//   WS    amber     #F59E0B / bg #FEF3C7
// ============================================================
const TAF_LIBRARY = [
  {
    id: 'taf_lib_fm_only',
    title: 'FM-only progression — clean morning to evening',
    summary: 'Three FROM groups walk a quiet day from morning calm to evening shift. No TEMPO/PROB/BECMG — every change is rapid and total.',
    raw: 'TAF KCLT 011130Z 0112/0218 27006KT P6SM SKC FM011500 31010KT P6SM FEW040 FM012100 33012KT P6SM SCT040 FM020600 35008KT P6SM SKC',
    rows: [
      { kind:'header', tokens:[
        {token:'TAF',       label:'Report Type',  color:'#64748B', bg:'#F8FAFC', detail:'Terminal Aerodrome Forecast — the standard 24- to 30-hour airport forecast described in FAA-H-8083-28B §27.3. TAF AMD = an amendment that supersedes the prior TAF immediately; TAF COR = a correction.'},
        {token:'KCLT',      label:'Station ID',   color:'#7C3AED', bg:'#F5F3FF', detail:'Charlotte-Douglas International. Same ICAO 4-letter convention as METAR (§27.3).'},
        {token:'011130Z',   label:'Issued',       color:'#0284C7', bg:'#E0F2FE', detail:'Issued day 01 at 1130 UTC. TAFs are issued ~30 minutes before the start of the valid period (§27.3).'},
        {token:'0112/0218', label:'Valid Period', color:'#0284C7', bg:'#E0F2FE', detail:'Valid day 01 1200Z through day 02 1800Z = 30-hour TAF. Format DDHH/DDHH per §27.3.'},
        {token:'27006KT',   label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'Initial conditions: 270° at 6 kt. Light westerly post-frontal flow.'},
        {token:'P6SM',      label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'Prevailing visibility greater than 6 SM (P = "plus"). Per §27.3, vis greater than 6 SM is encoded as P6SM in TAFs.'},
        {token:'SKC',       label:'Sky',          color:'#1D4ED8', bg:'#EFF6FF', detail:'Sky clear. SKC is used in forecasts to indicate no clouds expected.'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM011500', label:'FROM group',     color:'#0284C7', bg:'#E0F2FE', detail:'FROM group (FAA-H-8083-28B §27.3). At day 01 1500Z, ALL prior conditions are replaced by the conditions that follow on this line — wind, visibility, weather, and sky. The FROM group describes a rapid change expected to complete within minutes; everything after FM applies until the next change indicator or end of TAF.'},
        {token:'31010KT',  label:'Wind',           color:'#DC2626', bg:'#FEF2F2', detail:'After 1500Z: 310° at 10 kt — daytime mixing brings the gradient wind down to the surface, shifting NW.'},
        {token:'P6SM',     label:'Visibility',     color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM throughout this period.'},
        {token:'FEW040',   label:'Sky — Few',      color:'#1D4ED8', bg:'#EFF6FF', detail:'Few clouds at 4,000 ft AGL — diurnal cumulus development. FEW = 1–2 oktas.'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM012100', label:'FROM group',     color:'#0284C7', bg:'#E0F2FE', detail:'FROM group at day 01 2100Z (§27.3). Another rapid, total change — afternoon wind shift forecast as the gradient veers further. Three sequential FROM groups in one TAF means the forecaster expects three distinct, abrupt phases — they\'re NOT using BECMG because each transition is expected to complete quickly, not gradually.'},
        {token:'33012KT',  label:'Wind',           color:'#DC2626', bg:'#FEF2F2', detail:'After 2100Z: 330° at 12 kt — wind veering further with afternoon mixing.'},
        {token:'P6SM',     label:'Visibility',     color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM continues.'},
        {token:'SCT040',   label:'Sky — Scattered',color:'#1D4ED8', bg:'#EFF6FF', detail:'Scattered at 4,000 ft AGL (3–4 oktas). Cumulus filling in mid-afternoon.'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM020600', label:'FROM group',     color:'#0284C7', bg:'#E0F2FE', detail:'FROM group at day 02 0600Z (§27.3). Overnight settle — wind backs to N at lower speed as nocturnal cooling stabilises the boundary layer. The complete chain (initial → 3 FROM groups) gives four distinct phases over the 30-hour TAF, each separated by a rapid transition.'},
        {token:'35008KT',  label:'Wind',           color:'#DC2626', bg:'#FEF2F2', detail:'After 0600Z: 350° at 8 kt — light N flow under the radiational cooling.'},
        {token:'P6SM',     label:'Visibility',     color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'SKC',      label:'Sky',            color:'#1D4ED8', bg:'#EFF6FF', detail:'Sky clear under post-frontal high pressure.'}
      ]}
    ]
  },
  {
    id: 'taf_lib_tempo',
    title: 'TEMPO group — temporary showers',
    summary: 'Base forecast plus one TEMPO window for showers and visibility reduction. Teaches what "temporary" means and the timing format.',
    raw: 'TAF KAVL 121734Z 1218/1318 22008KT 5SM -SHRA BKN025 OVC050 TEMPO 1218/1224 2SM SHRA OVC015 FM130200 25006KT P6SM BKN040',
    rows: [
      { kind:'header', tokens:[
        {token:'TAF',       label:'Report Type',  color:'#64748B', bg:'#F8FAFC', detail:'Terminal Aerodrome Forecast (FAA-H-8083-28B §27.3).'},
        {token:'KAVL',      label:'Station ID',   color:'#7C3AED', bg:'#F5F3FF', detail:'Asheville Regional, NC — Blue Ridge upslope flow keeps shower activity going through the afternoon.'},
        {token:'121734Z',   label:'Issued',       color:'#0284C7', bg:'#E0F2FE', detail:'Issued day 12 at 1734 UTC. About 26 minutes before the 1800Z valid-period start.'},
        {token:'1218/1318', label:'Valid Period', color:'#0284C7', bg:'#E0F2FE', detail:'Day 12 1800Z through day 13 1800Z = 24-hour TAF.'},
        {token:'22008KT',   label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'220° at 8 kt — moist S flow upslope to the Blue Ridge.'},
        {token:'5SM',       label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'5 SM prevailing in the base forecast — MVFR by visibility.'},
        {token:'-SHRA',     label:'Weather',      color:'#7C3AED', bg:'#F5F3FF', detail:'Light rain showers. SH = shower descriptor, RA = rain. Light intensity. The base forecast has continuous (or near-continuous) light showers.'},
        {token:'BKN025',    label:'Sky — Ceiling',color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 2,500 ft AGL — the ceiling. MVFR by ceiling (1,000–3,000 ft).'},
        {token:'OVC050',    label:'Sky — Overcast',color:'#1D4ED8', bg:'#EFF6FF', detail:'Overcast at 5,000 ft. The lower BKN025 already defines the ceiling.'}
      ]},
      { kind:'change', groupType:'TEMPO', tokens:[
        {token:'TEMPO 1218/1224', label:'TEMPO group', color:'#EC4899', bg:'#FDF2F8', detail:'TEMPO group (FAA-H-8083-28B §27.3). Temporary fluctuations between day 12 1800Z and day 12 2400Z — each occurrence expected to last less than one hour, and the total of all occurrences less than half the period (so < 3 hours of the 6-hour window). Critically, TEMPO does NOT replace the base forecast — base conditions (5SM/-SHRA/BKN025/OVC050) continue between TEMPO events.'},
        {token:'2SM',     label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'During TEMPO occurrences: 2 SM — IFR visibility. Base 5SM resumes between occurrences.'},
        {token:'SHRA',    label:'Weather',      color:'#7C3AED', bg:'#F5F3FF', detail:'Moderate rain showers (no intensity prefix). Heavier than the base -SHRA.'},
        {token:'OVC015',  label:'Sky — Ceiling',color:'#1D4ED8', bg:'#EFF6FF', detail:'Overcast at 1,500 ft during TEMPO occurrences — IFR ceiling. Base BKN025 resumes between events.'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM130200', label:'FROM group',     color:'#0284C7', bg:'#E0F2FE', detail:'FROM group at day 13 0200Z (§27.3). The shower regime ends and conditions clear — total replacement of the base + TEMPO forecast at this time.'},
        {token:'25006KT',  label:'Wind',           color:'#DC2626', bg:'#FEF2F2', detail:'After 0200Z: 250° at 6 kt — wind backing as the trough departs.'},
        {token:'P6SM',     label:'Visibility',     color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM — clearing.'},
        {token:'BKN040',   label:'Sky — Ceiling',  color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 4,000 ft — VFR ceiling, residual stratocumulus.'}
      ]}
    ]
  },
  {
    id: 'taf_lib_prob30',
    title: 'PROB30 — probability of thunderstorms',
    summary: 'Base forecast with a PROB30 thunderstorm window. Teaches the probability keyword and why PROB30 is not PROB40 is not TEMPO.',
    raw: 'TAF KGSO 022030Z 0221/0324 21010KT P6SM SCT050 PROB30 0302/0306 5SM TSRA BKN030CB FM030800 27008KT P6SM FEW040',
    rows: [
      { kind:'header', tokens:[
        {token:'TAF',       label:'Report Type',  color:'#64748B', bg:'#F8FAFC', detail:'Terminal Aerodrome Forecast (FAA-H-8083-28B §27.3).'},
        {token:'KGSO',      label:'Station ID',   color:'#7C3AED', bg:'#F5F3FF', detail:'Piedmont Triad International, Greensboro NC.'},
        {token:'022030Z',   label:'Issued',       color:'#0284C7', bg:'#E0F2FE', detail:'Issued day 02 at 2030 UTC.'},
        {token:'0221/0324', label:'Valid Period', color:'#0284C7', bg:'#E0F2FE', detail:'Day 02 2100Z through day 03 2400Z = 27-hour TAF.'},
        {token:'21010KT',   label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'210° at 10 kt — moist SW flow.'},
        {token:'P6SM',      label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'SCT050',    label:'Sky — Scattered',color:'#1D4ED8', bg:'#EFF6FF', detail:'Scattered at 5,000 ft — afternoon cumulus.'}
      ]},
      { kind:'change', groupType:'PROB', tokens:[
        {token:'PROB30 0302/0306', label:'Probability group', color:'#8B5CF6', bg:'#F5F3FF', detail:'PROB group (FAA-H-8083-28B §27.3). 30% probability that the conditions in this group will occur between day 03 0200Z and 0600Z. PROB30 means the forecaster considers it unlikely but significant enough to plan for. Per §27.3, PROB30 is the only PROB group used by NWS in U.S. domestic TAFs; PROB40 appears only in U.S. military and international TAFs. Crucially, PROB ≠ TEMPO — TEMPO means the conditions WILL occur briefly; PROB means they MIGHT occur at all. Treat any PROB TS group near your ETA as a real planning factor.'},
        {token:'5SM',     label:'Visibility',     color:'#065F46', bg:'#D1FAE5', detail:'If conditions occur: 5 SM — MVFR.'},
        {token:'TSRA',    label:'Weather',        color:'#7C3AED', bg:'#F5F3FF', detail:'Thunderstorm with rain. TS = thunderstorm (active CB with lightning), RA = rain. TSRA in a PROB30 group means there is a 30% chance of an active thunderstorm during the window.'},
        {token:'BKN030CB',label:'Sky — CB',       color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 3,000 ft with cumulonimbus. CB suffix indicates the cloud type is convective — same convention as METAR.'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM030800', label:'FROM group',    color:'#0284C7', bg:'#E0F2FE', detail:'FROM group at day 03 0800Z (§27.3). Convection ends overnight; complete change to clearing conditions.'},
        {token:'27008KT',  label:'Wind',          color:'#DC2626', bg:'#FEF2F2', detail:'After 0800Z: 270° at 8 kt — post-convective W flow.'},
        {token:'P6SM',     label:'Visibility',    color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'FEW040',   label:'Sky — Few',     color:'#1D4ED8', bg:'#EFF6FF', detail:'Few clouds at 4,000 ft.'}
      ]}
    ]
  },
  {
    id: 'taf_lib_becmg',
    title: 'BECMG transition — gradual change',
    summary: 'Gradual change with a BECMG window. Teaches how BECMG (becoming) differs from FM (instant) — the transition unfolds across the window, not at a single time.',
    raw: 'TAF KJQF 141720Z 1418/1518 17012KT P6SM BKN025 BECMG 1422/1424 19015G22KT P6SM SCT040 FM150500 21010KT P6SM BKN035',
    rows: [
      { kind:'header', tokens:[
        {token:'TAF',       label:'Report Type',  color:'#64748B', bg:'#F8FAFC', detail:'Terminal Aerodrome Forecast (FAA-H-8083-28B §27.3).'},
        {token:'KJQF',      label:'Station ID',   color:'#7C3AED', bg:'#F5F3FF', detail:'Concord-Padgett Regional, NC — Charlotte Flight Academy\'s home field.'},
        {token:'141720Z',   label:'Issued',       color:'#0284C7', bg:'#E0F2FE', detail:'Issued day 14 at 1720 UTC.'},
        {token:'1418/1518', label:'Valid Period', color:'#0284C7', bg:'#E0F2FE', detail:'Day 14 1800Z through day 15 1800Z = 24-hour TAF.'},
        {token:'17012KT',   label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'170° at 12 kt — S flow ahead of an approaching trough.'},
        {token:'P6SM',      label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'BKN025',    label:'Sky — Ceiling',color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 2,500 ft — MVFR ceiling.'}
      ]},
      { kind:'change', groupType:'BECMG', tokens:[
        {token:'BECMG 1422/1424', label:'BECOMING group', color:'#10B981', bg:'#D1FAE5', detail:'BECMG group (FAA-H-8083-28B §27.3). Conditions are forecast to change "becoming" the new state during the window day 14 2200Z to 2400Z. The transition is gradual and complete by the END of the window. Per §27.3, BECMG describes a gradual, permanent change — distinct from a FROM group, which is a rapid change at a single time. At any moment INSIDE the BECMG window the actual conditions could be the old, the new, or somewhere between. After the window closes, the new conditions apply until the next change indicator.'},
        {token:'19015G22KT',label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'After the BECMG completes: 190° at 15 kt gusting 22 kt — pre-frontal increase.'},
        {token:'P6SM',      label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM continues.'},
        {token:'SCT040',    label:'Sky — Scattered',color:'#1D4ED8', bg:'#EFF6FF', detail:'Scattered at 4,000 ft — ceiling lifts to VFR as the BECMG completes (BKN025 → SCT040).'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM150500', label:'FROM group',     color:'#0284C7', bg:'#E0F2FE', detail:'FROM group at day 15 0500Z (§27.3). Post-frontal rapid shift after the trough passes.'},
        {token:'21010KT',  label:'Wind',           color:'#DC2626', bg:'#FEF2F2', detail:'After 0500Z: 210° at 10 kt — wind backing.'},
        {token:'P6SM',     label:'Visibility',     color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'BKN035',   label:'Sky — Ceiling',  color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 3,500 ft — VFR ceiling.'}
      ]}
    ]
  },
  {
    id: 'taf_lib_ws',
    title: 'WS layer — non-convective low-level wind shear',
    summary: 'TAF with a standalone WS line. Teaches that WS in a TAF is a forecast of non-convective low-level wind shear at a specific altitude — not the wind shear that\'s already implied by an embedded thunderstorm.',
    raw: 'TAF KORD 060530Z 0606/0712 22018KT P6SM BKN040 WS020/26045KT FM061600 24015KT P6SM SCT060',
    rows: [
      { kind:'header', tokens:[
        {token:'TAF',       label:'Report Type',  color:'#64748B', bg:'#F8FAFC', detail:'Terminal Aerodrome Forecast (FAA-H-8083-28B §27.3).'},
        {token:'KORD',      label:'Station ID',   color:'#7C3AED', bg:'#F5F3FF', detail:'Chicago O\'Hare International — frequent low-level inversion shear after frontal passages.'},
        {token:'060530Z',   label:'Issued',       color:'#0284C7', bg:'#E0F2FE', detail:'Issued day 06 at 0530 UTC.'},
        {token:'0606/0712', label:'Valid Period', color:'#0284C7', bg:'#E0F2FE', detail:'Day 06 0600Z through day 07 1200Z = 30-hour TAF.'},
        {token:'22018KT',   label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'Surface wind 220° at 18 kt.'},
        {token:'P6SM',      label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'BKN040',    label:'Sky — Ceiling',color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 4,000 ft — VFR ceiling.'}
      ]},
      { kind:'change', groupType:'WS', tokens:[
        {token:'WS020/26045KT', label:'Wind shear group', color:'#F59E0B', bg:'#FEF3C7', detail:'WS group (FAA-H-8083-28B §27.3). Forecast of NON-CONVECTIVE low-level wind shear: at 2,000 ft AGL the wind is forecast to be 260° at 45 kt — well above the 18 kt surface wind, a substantial shear layer. Format: WS<3-digit altitude in hundreds of ft AGL>/<wind direction & speed>. The standalone WS line in a TAF is what the forecaster is forecasting — typically caused by inversions, frontal boundaries, or strong nocturnal jets. This is DIFFERENT from convective wind shear, which is the wind shear implied by an embedded thunderstorm group (TSRA / VCTS / CB) — convective shear isn\'t coded as WS, it\'s an implicit hazard wherever TS/CB appears. Per §27.3, WS is reserved for non-convective LLWS forecasts.'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM061600', label:'FROM group',     color:'#0284C7', bg:'#E0F2FE', detail:'FROM group at day 06 1600Z (§27.3). Daytime mixing erodes the inversion; the LLWS layer is no longer forecast after this time.'},
        {token:'24015KT',  label:'Wind',           color:'#DC2626', bg:'#FEF2F2', detail:'After 1600Z: 240° at 15 kt — surface aligns with the gradient as mixing matures.'},
        {token:'P6SM',     label:'Visibility',     color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'SCT060',   label:'Sky — Scattered',color:'#1D4ED8', bg:'#EFF6FF', detail:'Scattered at 6,000 ft.'}
      ]}
    ]
  },
  {
    id: 'taf_lib_convective_tempo',
    title: 'Convective TEMPO — TSRA + CB with vicinity',
    summary: 'Base forecast with VCTS hint, then a TEMPO group containing thunderstorms with cumulonimbus. Teaches convective TEMPO and the difference between TS (at the airport) and VCTS (in the vicinity).',
    raw: 'TAF KCLT 232017Z 2320/2424 18014G24KT P6SM VCTS BKN035 TEMPO 2322/2402 3SM TSRA BKN025CB OVC060 FM240500 31012KT P6SM BKN050',
    rows: [
      { kind:'header', tokens:[
        {token:'TAF',       label:'Report Type',  color:'#64748B', bg:'#F8FAFC', detail:'Terminal Aerodrome Forecast (FAA-H-8083-28B §27.3).'},
        {token:'KCLT',      label:'Station ID',   color:'#7C3AED', bg:'#F5F3FF', detail:'Charlotte-Douglas — pop-up convection along an outflow boundary.'},
        {token:'232017Z',   label:'Issued',       color:'#0284C7', bg:'#E0F2FE', detail:'Issued day 23 at 2017 UTC.'},
        {token:'2320/2424', label:'Valid Period', color:'#0284C7', bg:'#E0F2FE', detail:'Day 23 2000Z through day 24 2400Z = 28-hour TAF.'},
        {token:'18014G24KT',label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'180° at 14 kt gusting 24 kt — moist S inflow into a destabilizing afternoon airmass.'},
        {token:'P6SM',      label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM in the base forecast — convection is in the vicinity, not at the field.'},
        {token:'VCTS',      label:'Vicinity TS',  color:'#7C3AED', bg:'#F5F3FF', detail:'VC = vicinity, TS = thunderstorm. Per §27.3, VCTS in the base forecast means thunderstorms are expected within 5–10 SM of the airport but NOT at the airport itself. If they reach the airport, the report type would change to TS (no VC prefix). VC is a flag that the airport is exposed but not yet impacted.'},
        {token:'BKN035',    label:'Sky — Ceiling',color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 3,500 ft — base ceiling.'}
      ]},
      { kind:'change', groupType:'TEMPO', tokens:[
        {token:'TEMPO 2322/2402', label:'TEMPO group', color:'#EC4899', bg:'#FDF2F8', detail:'TEMPO group (FAA-H-8083-28B §27.3). Temporary fluctuations between day 23 2200Z and day 24 0200Z — when the convection actually reaches the airport. Each occurrence less than 1 hour, total less than half the period. Base forecast (P6SM/VCTS/BKN035) continues between TEMPO events. Note the upgrade from VCTS in the base to TS in the TEMPO — the storm is no longer just nearby.'},
        {token:'3SM',       label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'During TEMPO occurrences: 3 SM — IFR by visibility.'},
        {token:'TSRA',      label:'Weather',      color:'#7C3AED', bg:'#F5F3FF', detail:'Thunderstorm with rain — moderate intensity. TS without a VC prefix means the storm is AT the airport, not just nearby.'},
        {token:'BKN025CB',  label:'Sky — CB',     color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 2,500 ft with cumulonimbus. CB indicates the active convective cloud type. This implicitly forecasts strong convective wind shear, hail, lightning — all the standard CB hazards.'},
        {token:'OVC060',    label:'Sky — Overcast',color:'#1D4ED8', bg:'#EFF6FF', detail:'Overcast at 6,000 ft above the lower CB layer.'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM240500', label:'FROM group',    color:'#0284C7', bg:'#E0F2FE', detail:'FROM group at day 24 0500Z (§27.3). Convection ends overnight as the airmass stabilises.'},
        {token:'31012KT',  label:'Wind',          color:'#DC2626', bg:'#FEF2F2', detail:'After 0500Z: 310° at 12 kt — post-convective NW.'},
        {token:'P6SM',     label:'Visibility',    color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'BKN050',   label:'Sky — Ceiling', color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 5,000 ft.'}
      ]}
    ]
  },
  {
    id: 'taf_lib_vicinity',
    title: 'Vicinity weather (VCSH) in the main line',
    summary: 'Base forecast includes VCSH — showers in the vicinity but not at the airport. Teaches how the VC prefix changes the operational picture compared to the same weather without VC.',
    raw: 'TAF KAVL 081020Z 0810/0912 24008KT P6SM VCSH SCT040 BKN080 FM082000 27010KT P6SM BKN050',
    rows: [
      { kind:'header', tokens:[
        {token:'TAF',       label:'Report Type',  color:'#64748B', bg:'#F8FAFC', detail:'Terminal Aerodrome Forecast (FAA-H-8083-28B §27.3).'},
        {token:'KAVL',      label:'Station ID',   color:'#7C3AED', bg:'#F5F3FF', detail:'Asheville Regional, NC — terrain-induced shower development is common just upwind.'},
        {token:'081020Z',   label:'Issued',       color:'#0284C7', bg:'#E0F2FE', detail:'Issued day 08 at 1020 UTC.'},
        {token:'0810/0912', label:'Valid Period', color:'#0284C7', bg:'#E0F2FE', detail:'Day 08 1000Z through day 09 1200Z = 26-hour TAF.'},
        {token:'24008KT',   label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'240° at 8 kt — moist W flow.'},
        {token:'P6SM',      label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM at the airport itself — the showers are not at the field.'},
        {token:'VCSH',      label:'Vicinity SH',  color:'#7C3AED', bg:'#F5F3FF', detail:'VC = vicinity, SH = shower descriptor. Per FAA-H-8083-28B §27.3, VCSH means showers are expected within 5–10 SM of the airport but not at the airport. Critical operational distinction: VCSH does NOT trigger any visibility/ceiling restriction in the report itself, but it warns you that conditions can deteriorate quickly if a cell approaches. SHRA (without VC) would mean the shower is at the airport with the associated visibility/ceiling impact baked in.'},
        {token:'SCT040',    label:'Sky — Scattered',color:'#1D4ED8', bg:'#EFF6FF', detail:'Scattered at 4,000 ft — supports the vicinity-shower forecast (parent cumulus visible).'},
        {token:'BKN080',    label:'Sky — Ceiling',color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 8,000 ft — VFR ceiling, mid-level deck.'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM082000', label:'FROM group',    color:'#0284C7', bg:'#E0F2FE', detail:'FROM group at day 08 2000Z (§27.3). Diurnal showers dissipate by evening; complete change to drier conditions.'},
        {token:'27010KT',  label:'Wind',          color:'#DC2626', bg:'#FEF2F2', detail:'After 2000Z: 270° at 10 kt.'},
        {token:'P6SM',     label:'Visibility',    color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'BKN050',   label:'Sky — Ceiling', color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 5,000 ft — VFR ceiling.'}
      ]}
    ]
  },
  {
    id: 'taf_lib_nsw',
    title: 'NSW ending a TEMPO — the bad stuff stops',
    summary: 'A TEMPO snow window followed by a BECMG that includes NSW. Teaches that NSW (no significant weather) is how a TAF says "the previously forecast weather ends".',
    raw: 'TAF KDEN 151123Z 1512/1618 32018G28KT 3SM -SN BKN015 OVC030 TEMPO 1512/1518 1SM SN VV008 BECMG 1518/1520 31012KT P6SM NSW SCT040 FM160300 28006KT P6SM SKC',
    rows: [
      { kind:'header', tokens:[
        {token:'TAF',       label:'Report Type',  color:'#64748B', bg:'#F8FAFC', detail:'Terminal Aerodrome Forecast (FAA-H-8083-28B §27.3).'},
        {token:'KDEN',      label:'Station ID',   color:'#7C3AED', bg:'#F5F3FF', detail:'Denver International — upslope snow on a NW-flow setup.'},
        {token:'151123Z',   label:'Issued',       color:'#0284C7', bg:'#E0F2FE', detail:'Issued day 15 at 1123 UTC.'},
        {token:'1512/1618', label:'Valid Period', color:'#0284C7', bg:'#E0F2FE', detail:'Day 15 1200Z through day 16 1800Z = 30-hour TAF.'},
        {token:'32018G28KT',label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'320° at 18 kt gusting 28 kt — strong NW upslope.'},
        {token:'3SM',       label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'3 SM — base forecast at the IFR/MVFR boundary in -SN.'},
        {token:'-SN',       label:'Weather',      color:'#7C3AED', bg:'#F5F3FF', detail:'Light snow — base forecast.'},
        {token:'BKN015',    label:'Sky — Ceiling',color:'#1D4ED8', bg:'#EFF6FF', detail:'Broken at 1,500 ft — IFR ceiling.'},
        {token:'OVC030',    label:'Sky — Overcast',color:'#1D4ED8', bg:'#EFF6FF', detail:'Overcast at 3,000 ft.'}
      ]},
      { kind:'change', groupType:'TEMPO', tokens:[
        {token:'TEMPO 1512/1518', label:'TEMPO group', color:'#EC4899', bg:'#FDF2F8', detail:'TEMPO group (FAA-H-8083-28B §27.3). Temporary heavier-snow occurrences during day 15 1200Z–1800Z. Each event < 1 hour; total < half the period. Base -SN/BKN015 continues between events.'},
        {token:'1SM',     label:'Visibility',  color:'#065F46', bg:'#D1FAE5', detail:'During TEMPO occurrences: 1 SM — LIFR.'},
        {token:'SN',      label:'Weather',     color:'#7C3AED', bg:'#F5F3FF', detail:'Moderate snow (no intensity prefix) — heavier than the base -SN.'},
        {token:'VV008',   label:'Vert Vis',    color:'#1D4ED8', bg:'#EFF6FF', detail:'Vertical visibility 800 ft — sky obscured by heavy snow; treat as ceiling for IFR/MVFR classification.'}
      ]},
      { kind:'change', groupType:'BECMG', tokens:[
        {token:'BECMG 1518/1520', label:'BECOMING group', color:'#10B981', bg:'#D1FAE5', detail:'BECMG group (FAA-H-8083-28B §27.3). Conditions are forecast to "become" the new state during the window day 15 1800Z–2000Z. Gradual change, complete by the end of the window.'},
        {token:'31012KT', label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'After the BECMG completes: 310° at 12 kt — wind backing as the gradient relaxes.'},
        {token:'P6SM',    label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'NSW',     label:'No Significant Wx',color:'#94A3B8', bg:'#F1F5F9', detail:'NSW = No Significant Weather (FAA-H-8083-28B §27.3). NSW explicitly clears the previously forecast weather group — it\'s the TAF\'s way of saying "the snow ends here." Without NSW, the snow weather group could be assumed to continue. NSW is only used in change groups (BECMG / TEMPO / FM) to terminate a previously forecast weather phenomenon.'},
        {token:'SCT040',  label:'Sky — Scattered',color:'#1D4ED8', bg:'#EFF6FF', detail:'Scattered at 4,000 ft — clouds dissipating as the snow ends.'}
      ]},
      { kind:'change', groupType:'FM', tokens:[
        {token:'FM160300', label:'FROM group',   color:'#0284C7', bg:'#E0F2FE', detail:'FROM group at day 16 0300Z (§27.3). Final clearing overnight.'},
        {token:'28006KT',  label:'Wind',         color:'#DC2626', bg:'#FEF2F2', detail:'After 0300Z: 280° at 6 kt — light W flow under clearing skies.'},
        {token:'P6SM',     label:'Visibility',   color:'#065F46', bg:'#D1FAE5', detail:'Greater than 6 SM.'},
        {token:'SKC',      label:'Sky',          color:'#1D4ED8', bg:'#EFF6FF', detail:'Sky clear.'}
      ]}
    ]
  }
];

// Backward-compat alias for any old caller. The original TAF reference card
// used a flat groups array; expose the first row's tokens so legacy code can
// still tap through them while the picker is the new home.
const SAMPLE_TAF = TAF_LIBRARY[0];
