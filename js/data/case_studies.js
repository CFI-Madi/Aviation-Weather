// ============================================================
// Aviation Weather Academy — Case Studies Data
// ============================================================

const CASE_STUDIES = [
  {
    id:'cs1',
    caseType: 'verified',
    verified: true,
    title:'Into the Haze',
    subtitle:'Night VFR, spatial disorientation over water',
    category:'VFR into IMC',
    hazard:'Spatial Disorientation',
    severity:'fatal',
    faaRef:'Ch. 10, 13',
    icon:'🌫️',
    color:'#7C3AED',
    aircraft:'Piper PA-32 Saratoga II HP',
    pilot:'Private pilot, instrument-rated, 310 hours total, 55 hours at night',
    date:'Summer evening, coastal New England',
    ntsbAccidentNumber:'NYC99MA178',
    ntsbSourceType:'docket', // enum: 'docket' | 'final_report' | 'carol' | 'safety_alert'
    ntsbTitle:'NTSB Docket: Aviation Investigation - PA-32-R301, Vineyard Haven, Massachusetts',
    ntsbUrl:'https://data.ntsb.gov/Docket?ProjectID=46975',
    brief:`
      <p>A private pilot departed a resort island airport at dusk for a 40-mile over-water flight to the mainland. The destination airport was reporting 8 miles visibility in haze. Surface temperature and dewpoint were close. No IFR flight plan was filed.</p>
      <p>The pilot had not flown at night in recent months and had not flown the instrument approach procedures in over 15 months — well past the 6-month IFR currency requirement. A weather briefer later confirmed the pilot had received a briefing and was told about reduced visibility over the water due to haze.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">WEATHER AT DEPARTURE</div>
        <div style="color:#38BDF8">METAR KACK 162345Z 22009KT 8SM HZ SKC 23/21 A3002</div>
        <div style="color:#94A3B8;margin-top:8px">T/Td spread: 2°C — near saturation</div>
        <div style="color:#94A3B8">Winds: 220° at 9 kt — light, favorable</div>
        <div style="color:#F59E0B;margin-top:8px">Over water: No visible horizon. Stars obscured by haze. No ground lights. Black hole effect.</div>
      </div>
    `,
    narrative:`
      <p>Sixteen minutes after departure, radar contact was lost. The aircraft wreckage was found 7.5 miles from the airport in 116 feet of water. The flight data showed the aircraft entered a gradual right turn that steepened over approximately 5 minutes. The final radar return showed the aircraft descending rapidly.</p>
      <p>The NTSB determined that the pilot — flying VFR at night over dark water with no visible horizon — lost spatial orientation. Without visual reference, the vestibular system provided false sensations of straight-and-level flight during the developing spiral. By the time the pilot may have sensed the problem, the descent rate was likely several thousand feet per minute.</p>
      <p>There were no mechanical anomalies found with the aircraft or engine. The aircraft was structurally intact at water impact, indicating controlled flight into terrain (CFIT) from spatial disorientation, not structural failure.</p>
    `,
    probableCause:`The pilot's failure to maintain control of the aircraft as a result of spatial disorientation during a night flight over water in hazy conditions. Contributing factors: reduced visibility in haze, no visible horizon, and the pilot's lack of recent instrument flight experience.`,
    lessons:[
      'Over dark water at night with haze, there is NO visual horizon — instrument flight skills are required even for a "VFR" flight.',
      'A T-Td spread of 2°C over water at night means haze/mist will likely reduce visibility further — a trend the pilot had data to recognize.',
      'IFR currency exists for a reason. Without recent instrument practice, even an instrument-rated pilot cannot reliably control the aircraft in IMC.',
      'The "black hole" approach — dark water, dark sky, no ground lights — is one of the most disorienting environments in aviation. Always treat night over-water flights as instrument flights.',
      'File an IFR flight plan for any over-water night flight, regardless of forecast conditions.'
    ],
    discoveryQuestions: [
      {
        q: 'At what point in the pre-flight planning should this pilot have made a different decision?',
        opts: [
          'When he saw the destination reporting 8 SM visibility in haze',
          'When he discovered his IFR currency had lapsed 15 months ago',
          'When he filed a VFR rather than IFR flight plan',
          'When the weather briefer confirmed haze over the water'
        ],
        response: 'Currency lapses matter most before engine start — not after radar contact is lost. The 15-month IFR currency gap, combined with a night over-water route in haze, meant that any weather deterioration was unrecoverable. The T-Td spread of 2°C over water was also a visible warning sign in the briefing data — near saturation at night over water reliably produces haze and mist.'
      },
      {
        q: 'What made the over-water, no-horizon environment specifically fatal for this VFR night flight?',
        opts: [
          'Salt air accelerates airframe icing even at warm temperatures',
          'ATC radar returns from water are unreliable, reducing coverage',
          'No visible horizon and no ground lights — the vestibular system became the only sensory reference, and it cannot detect a gradual turn',
          'Aircraft altimeters are less accurate over water at night'
        ],
        response: 'Without any visual reference — no lights below, stars obscured by haze, no horizon — the vestibular system became the only sensory input. The inner ear cannot detect a gradual roll. What felt like level flight was a slowly steepening turn. This is why instrument flight skills are required, not optional, for this kind of environment — and why IFR currency is not a formality.'
      }
    ],
    quiz:[
      {id:'qcs1_1',question:'Spatial disorientation during night flight over dark water occurs primarily because:',options:['Aircraft instruments become unreliable over saltwater','The vestibular (inner ear) system provides false sensations of straight-and-level flight without a visible horizon — the brain cannot detect a gradual turn','Night reduces engine power and makes aircraft harder to control','Stars provide false visual cues that confuse the pilot'],correct:1,explanation:'The vestibular system detects rapid changes in motion but cannot detect gradual changes. A slow turn develops without triggering the "turn" sensation — the pilot feels level while turning. Without visual reference to the horizon (dark water, no lights, haze), there is nothing to correct this false sensation. This is why "flying by the seat of your pants" is lethal.'},
      {id:'qcs1_2',question:'For a pilot with an instrument rating who has not logged actual or simulated instrument time in 8 months, what is their legal status for IFR flight?',options:['Fully current — instrument ratings do not expire','Current for VFR flight only — instrument currency lapses after 6 months without 6 approaches, holding, and intercepting/tracking','Current if weather is VMC at both departure and destination','Current if another instrument-rated pilot is on board'],correct:1,explanation:'IFR currency requires within the preceding 6 months: 6 instrument approaches, holding procedures, and intercepting/tracking courses. After 6 months without these, the pilot is not current for IFR flight and must complete an IPC (Instrument Proficiency Check) with an authorized instructor before acting as PIC on an IFR flight plan.'},
      {id:'qcs1_3',question:'A T-Td spread of 2°C over water at night most accurately predicts:',options:['Excellent visibility — dewpoint depression prevents fog formation','Near-saturation conditions — expect haze, mist, or fog formation, especially over water where additional moisture is available','Thunderstorm development due to instability','Strong winds from the nearby water temperature gradient'],correct:1,explanation:'T-Td spread of 2°C means the air is very near saturation (RH ~89%). Over water at night, with cooling occurring, this spread will likely reach zero — producing fog or mist. Over land, radiation fog requires a spread reaching zero, but over water the continuous moisture source means haze and mist persist even before technical fog formation. This METAR was a clear warning sign.'}
    ]
  },
  {
    id:'cs2',
    caseType: 'simulated',
    verified: false,
    title:'The Valley Closes In',
    subtitle:'Scud running into rising terrain, mountain valleys',
    category:'VFR into IMC',
    hazard:'Terrain + Lowering Ceilings',
    severity:'fatal',
    faaRef:'Ch. 16, 18',
    icon:'⛰️',
    color:'#DC2626',
    aircraft:'Cessna 172',
    pilot:'Private pilot, 243 hours, no instrument rating',
    date:'Afternoon, Appalachian mountain region',
    brief:`
      <p>A private pilot departed a valley airport for a mountain crossing, planning to stay VFR. A standard briefing that morning had indicated IMC conditions over the mountains with ceilings at 1,500–2,000 ft MSL and IFR conditions possible through mountain passes. The pilot departed anyway, telling passengers they would "see how it looks."</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">EN ROUTE CONDITIONS</div>
        <div style="color:#38BDF8">Ceiling: 2,000 ft MSL (1,200 ft AGL in valley) — dropping</div>
        <div style="color:#38BDF8">Visibility: 3–5 SM in mountain mist and light rain</div>
        <div style="color:#F59E0B">Terrain ahead: ridgeline at 3,800 ft MSL</div>
        <div style="color:#EF4444;margin-top:8px">Aircraft could not climb above terrain + clouds. No room to turn around in narrowing valley.</div>
      </div>
    `,
    narrative:`
      <p>Witnesses reported the aircraft flying northbound through a mountain valley at approximately 500 feet above the valley floor. The aircraft was below the cloud layer and appeared to be following the terrain. As the valley narrowed and the terrain rose, the ceiling dropped simultaneously.</p>
      <p>The aircraft impacted the forested terrain at 3,200 ft MSL — approximately 600 feet below the ridgeline the pilot was apparently attempting to cross. Wreckage distribution indicated the aircraft was in level flight, under control, and at low speed at impact — consistent with continued visual flight into terrain that the pilot could not see through the clouds above.</p>
      <p>The classic "scud running" scenario: the pilot had committed to continuing through deteriorating conditions, had descended below cloud bases to maintain visual contact, and then reached a point where the terrain rose faster than the aircraft could climb, and turning around was no longer physically possible in the valley width available.</p>
    `,
    probableCause:`The pilot's decision to continue VFR flight into IMC conditions in mountainous terrain. Contributing factors: the pilot's failure to obtain or heed the weather briefing (which had predicted IMC), continued flight after encountering deteriorating conditions, and inadequate altitude to maintain terrain clearance.`,
    lessons:[
      '"See how it looks" is not a weather decision — it is an abdication of responsibility to a plan.',
      'In mountain valleys, the geometry works against you: terrain rises as you proceed, ceiling drops, and eventually you are in a box with no exit.',
      'The NTSB calls scud running a "continued VFR into IMC" accident. It is the most common fatal weather accident category in GA.',
      'The correct action on receiving a "VFR not recommended" briefing or encountering lowering ceilings en route: land at the nearest airport and wait.',
      'Know your personal minimums BEFORE departure — not while you are in the deteriorating conditions.'
    ],
    discoveryQuestions: [
      {
        q: 'The pilot told passengers they would "see how it looks." What was the fundamental problem with this approach?',
        opts: [
          'It violated the VNR advisory, which is a regulatory prohibition',
          'It placed the go/no-go decision inside the deteriorating weather — where the geometry of valley, terrain, and ceiling may already make the correct decision impossible to execute',
          'It delegated the weather decision to the passengers',
          'It meant the pilot had not received a proper weather briefing'
        ],
        response: 'Placing the go/no-go decision inside the weather hands the decision to conditions rather than to the pilot. By the time the pilot "sees how it looks" inside a mountain valley with a lowering ceiling, the terrain is rising ahead, the ceiling is dropping, and the valley may already be too narrow to reverse course safely. The briefing contained all the information needed to make the right call before engine start.'
      },
      {
        q: 'What physical geometry makes mountain valley scud running uniquely dangerous compared to flat terrain scud running?',
        opts: [
          'Mountains produce more severe turbulence that makes aircraft control difficult',
          'Magnetic compass errors near mountains prevent accurate navigation',
          'The terrain rises as you proceed, the ceiling drops due to orographic effects, and the valley narrows — at some point a 180° turn is physically impossible',
          'Mountain airports have no instrument approaches, preventing a legal IFR escape'
        ],
        response: 'In flat terrain, scud running is dangerous but allows a 180° turn at almost any point. In a narrowing mountain valley, the terrain rises ahead, the ceiling descends, and the valley width shrinks simultaneously. There is a point — usually reached gradually and unnoticed — where turning around is no longer physically possible. This geometry trap is the defining feature of scud running in mountains: the exit closes behind you.'
      }
    ],
    quiz:[
      {id:'qcs2_1',question:'The fatal trap in "scud running" through mountain valleys is:',options:['Aircraft fuel consumption increases in mountainous terrain','The terrain rises and ceiling drops simultaneously, creating a narrowing box with no viable exit and insufficient room to reverse course','Mountain turbulence prevents maintaining altitude','Magnetic compass errors in mountain terrain prevent navigation'],correct:1,explanation:'Scud running in mountainous terrain creates a geometry trap: as you proceed, the terrain rises (ridgeline ahead), the ceiling may lower (orographic effects), the valley narrows, and eventually the aircraft cannot climb above the terrain (already in clouds) or turn around (valley too narrow). The fatal mistake is entering this trap — once committed, options disappear rapidly.'},
      {id:'qcs2_2',question:'A pilot receives a standard briefing with "VFR not recommended" for their mountain crossing. The legally correct interpretation is:',options:['VNR is a regulatory prohibition — the flight cannot depart','VNR is a pilot advisory — the pilot may still legally depart but the decision rests with the pilot in command. Experienced pilots treat a VNR as a serious signal and reconsider the flight.','VNR only applies to student pilots, not certificated pilots','VNR means clouds will be at or below 1,000 ft throughout the route'],correct:1,explanation:'"VFR not recommended" is a pilot advisory from the briefer — it is not a regulatory prohibition. Certificated pilots may legally depart, and the decision rests with the pilot in command. A VNR reflects the professional judgment of a qualified weather briefer who has evaluated current and forecast conditions. NTSB accident data shows continued VFR flight after a VNR briefing is a recurring pattern in fatal GA accidents. Experienced pilots treat a VNR as a serious signal warranting reconsideration of the flight.'},
      {id:'qcs2_3',question:'The CORRECT action when encountering unexpectedly lowering ceilings and visibility en route VFR is:',options:['Descend to maintain visual contact with the ground as long as possible','Continue at reduced speed — slower flight gives more reaction time','Make a 180° turn and return to VMC conditions or land at the nearest available airport immediately','Contact ATC to declare an emergency and get IFR vectors'],correct:1,explanation:'The "180-degree turn" rule: when VFR conditions deteriorate, the correct action is to immediately reverse course before you are committed. Descending to maintain visual contact puts you lower with less terrain clearance. Continuing at reduced speed only delays the inevitable. The 180° turn should be made at the first sign of deteriorating conditions — not when the valley narrows to the point that a turn is no longer possible.'}
    ]
  },
  {
    id:'cs3',
    caseType: 'simulated',
    verified: false,
    title:'The Shortcut That Wasn\'t',
    subtitle:'Convective SIGMET active, pilot attempted shortcut through storm',
    category:'Thunderstorm Penetration',
    hazard:'Thunderstorm Turbulence & Hail',
    severity:'fatal',
    faaRef:'Ch. 22',
    icon:'⛈️',
    color:'#DC2626',
    aircraft:'Beechcraft A36 Bonanza',
    pilot:'Private pilot, instrument rated, 1,840 hours',
    date:'Afternoon, Great Plains states',
    brief:`
      <p>An experienced private pilot was conducting a cross-country flight when a rapidly developing squall line crossed his planned route. A Convective SIGMET had been issued covering the area with tops reported at FL380. Radar data showed a line of severe thunderstorms 80 miles wide with no apparent gaps.</p>
      <p>ATC offered multiple deviation options — south was clear of weather with a 45-minute delay. The pilot elected to fly north to attempt to circumnavigate what appeared on his datalink radar to be a "gap" in the line.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">RADAR DATA — EFB DISPLAY (7-min delay)</div>
        <div style="color:#38BDF8">Squall line: tops FL380, moving ENE at 45 kt</div>
        <div style="color:#F59E0B">Apparent gap in line: ~8 NM wide on datalink</div>
        <div style="color:#EF4444">Convective SIGMET: severe thunderstorms, hail 2 in, wind gusts 60+ kt</div>
        <div style="color:#94A3B8;margin-top:6px">Note: 7-min-old data. At 45 kt motion, line moved 5+ NM since last scan.</div>
      </div>
    `,
    narrative:`
      <p>ATC radar showed the aircraft entering the gap area. Approximately 4 minutes later, ATC lost radar and radio contact. Radar data showed the aircraft in a rapid, uncontrolled descent. The aircraft impacted terrain 6 miles inside the storm line.</p>
      <p>Post-accident investigation revealed hail damage consistent with large hailstones on recovered airframe sections. The horizontal stabilizer showed signs of structural failure. The apparent "gap" on the pilot's datalink display had been filled by storm cell growth during the 7-minute data lag.</p>
      <p>The pilot was experienced. The aircraft was well-equipped. The Convective SIGMET was explicitly active for this area. The gap appeared on a display showing data from 7 minutes ago. In 7 minutes, a squall line moving at 45 kt travels more than 5 nautical miles — more than enough to close an 8-mile gap.</p>
    `,
    probableCause:`The pilot's decision to attempt to navigate through a gap in an active squall line using NEXRAD datalink imagery with known latency, resulting in inadvertent thunderstorm penetration. Contributing: failure to heed the active Convective SIGMET and overconfidence in datalink weather depiction.`,
    lessons:[
      'A Convective SIGMET is a high-priority aviation weather advisory describing hazardous convective conditions. Unlike AIRMETs, Convective SIGMETs demand immediate attention — the hazards described are potentially fatal to aircraft of any size.',
      'Datalink NEXRAD has 5-15 minutes of latency. A 45-kt squall line moves 4-11 NM during that time. "Gaps" visible on datalink may not exist when you arrive.',
      'Hail can extend 20+ miles from the visible CB. Clear air does not mean hail-free air near active thunderstorms.',
      'The south deviation was available and added 45 minutes. Faced with that option versus known catastrophic risk from an active Convective SIGMET, the reasoning is straightforward — but acting on it requires making the decision before the situation becomes critical.',
      'Airborne weather radar provides real-time in-close convective awareness that datalink cannot. Datalink NEXRAD, with 5–15 minutes of latency, is appropriate for strategic routing decisions only — not for navigating near active convection.'
    ],
    discoveryQuestions: [
      {
        q: 'What was the critical flaw in using the datalink NEXRAD gap as a navigation route through the squall line?',
        opts: [
          'Datalink NEXRAD only shows turbulence, not precipitation',
          'The pilot should have used onboard VHF radio weather broadcasts instead',
          'The data was 7 minutes old — at 45 kt, the squall line had moved 5+ NM since the image was captured, likely closing the gap entirely',
          'NEXRAD gaps are always narrower than they appear due to beam width limitations'
        ],
        response: 'A squall line moving at 45 knots travels nearly 5.5 nautical miles in 7 minutes. The 8-NM gap visible on the display may have been 2.5 NM — or already closed — by the time the aircraft arrived. Datalink NEXRAD is useful for strategic decisions made far in advance of the weather; it cannot be used for real-time gap navigation near active convection. The data is always history, not present reality.'
      },
      {
        q: 'ATC offered a safe deviation adding 45 minutes. What drove the pilot to choose the high-risk gap option instead?',
        opts: [
          'The southern deviation would have required filing a new flight plan with ATC',
          'The pilot believed the aircraft was equipped to handle brief convective penetration',
          'Get-there-itis — schedule pressure and confidence in the datalink display overrode objective risk assessment of an active Convective SIGMET',
          'The deviation distance exceeded the aircraft\'s fuel range for the flight'
        ],
        response: 'The 45-minute delay was available, safe, and offered by ATC. Something — schedule pressure, overconfidence in the datalink imagery, underestimation of the Convective SIGMET, or destination urgency — drove the pilot to choose a gap that existed only on a 7-minute-old radar image. This decision pattern appears repeatedly in NTSB convective accident data: a safe option was available and declined.'
      }
    ],
    quiz:[
      {id:'qcs3_1',question:'A pilot uses datalink NEXRAD to identify an 8-NM gap in a squall line moving at 40 kt. The NEXRAD data is 8 minutes old. How much has the squall line moved since the image was captured?',options:['Less than 1 NM — squall lines are slow-moving','Approximately 5.3 NM — the "gap" may no longer exist','About 0.5 NM — negligible for navigation','The squall line speed doesn\'t affect gap size'],correct:1,explanation:'At 40 kt, the line moves 40 NM/hour = 0.67 NM/minute × 8 minutes = 5.3 NM. An 8-NM gap that was safe 8 minutes ago may now be a 2.7-NM gap — or have closed entirely. This math should make any pilot reject using datalink radar for convective avoidance. Use it only for knowing where storm systems ARE, not for navigating between cells.'},
      {id:'qcs3_2',question:'Hail from a severe thunderstorm can be encountered:',options:['Only directly under the storm\'s main precipitation shaft','Only inside visible cloud','In clear air 20+ miles from the visible cumulonimbus, especially under and beyond the anvil','Only when lightning is visible'],correct:2,explanation:'Large hailstones are carried outward by the CB\'s upper-level outflow and can fall in clear air 20+ miles from the storm. The anvil marks the direction of hail travel — hail falls under and beyond the anvil even in clear skies. This is why standard thunderstorm avoidance guidance is to maintain at least 20 NM from any CB, even in apparently clear air. A pilot who thinks "I can see clear sky ahead" near a severe thunderstorm is wrong.'},
      {id:'qcs3_3',question:'When ATC offers a weather deviation option that adds 45 minutes to a flight to avoid active Convective SIGMETs, the correct response is:',options:['Request a shorter deviation — 45 minutes is too long for a GA flight','Accept the deviation without hesitation — time is never worth the risk of thunderstorm penetration','Ask ATC to vector you through the least-intense portion of the weather','Descend to 3,000 ft where convective activity is less intense'],correct:1,explanation:'Thunderstorm penetration in GA aircraft is potentially fatal. No schedule pressure, no time constraint, no destination urgency justifies the risk. The NTSB consistently finds that accident pilots had a safe option available and chose not to take it. "Get-there-itis" — the psychological pressure to complete the flight on schedule — is a leading causal factor in weather accidents. Always take the safe option.'}
    ]
  },
  {
    id:'cs4',
    caseType: 'verified',
    verified: true,
    title:'Wind Shear on Final',
    subtitle:'Microburst encounter during approach in convective weather',
    category:'Wind Shear / Microburst',
    hazard:'Microburst / Low-Level Wind Shear',
    severity:'fatal',
    faaRef:'Ch. 22',
    icon:'💨',
    color:'#EA580C',
    aircraft:'Commercial airliner (pattern applies to all aircraft)',
    pilot:'Captain and first officer, thousands of hours combined',
    date:'August afternoon, Dallas/Fort Worth area',
    ntsbAccidentNumber:'DCA85AA031',
    ntsbSourceType:'final_report',
    ntsbTitle:'Delta Air Lines, Inc., Lockheed L-1011-385-1, N726DA',
    ntsbUrl:'https://www.ntsb.gov/investigations/Pages/DCA85AA031.aspx',
    brief:`
      <p>This case is based on the well-documented August 1985 wind shear accident at Dallas/Fort Worth. A commercial aircraft on approach encountered a microburst generated by a convective cell that had developed over the final approach course. A Convective SIGMET had been issued and LLWS advisories were active for the airport.</p>
      <p>Multiple aircraft had diverted or gone around due to weather. The accident crew elected to continue the approach. A PIREP from the preceding aircraft reported strong wind shear on final.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">APPROACH CONDITIONS</div>
        <div style="color:#38BDF8">LLWS advisory: active for all runways</div>
        <div style="color:#F59E0B">Convective SIGMET: active, CB over approach</div>
        <div style="color:#EF4444">PIREP: preceding aircraft — sudden 30-kt airspeed loss on final</div>
        <div style="color:#EF4444">Microburst: estimated 100+ kt differential wind over 2-mile path</div>
      </div>
    `,
    narrative:`
      <p>On final approach, the aircraft first encountered a headwind increase (+20 kt), causing it to fly above glidepath. The crew reduced power. Then the aircraft crossed into the downdraft core and encountered a sudden, massive headwind-to-tailwind shift of approximately 50 kt over a very short distance.</p>
      <p>With the power reduced from the headwind phase and now fighting a tailwind with a strong downdraft, the aircraft lost approximately 30 kts of airspeed within seconds. The crew added full power but the aircraft could not recover altitude before impacting terrain short of the runway.</p>
      <p>The physics of a microburst make recovery extremely difficult even with immediate recognition and maximum power application: the transition from headwind to tailwind can occur in seconds, and the aircraft is simultaneously fighting a downdraft of 1,000–6,000 fpm.</p>
    `,
    probableCause:`The flight crew's decision to continue the approach despite an active LLWS advisory and PIREPs of severe wind shear on the approach course. The encounter with a microburst produced airspeed and altitude loss that exceeded the aircraft's recovery capability.`,
    lessons:[
      'An active LLWS advisory combined with a PIREP reporting severe wind shear is an unambiguous "go around" signal. Never continue into known wind shear.',
      'The microburst headwind-to-tailwind transition is the lethal phase: the headwind phase feels like good performance; cutting power for the glidepath exceedance sets you up for the tailwind phase to be unsurvivable.',
      'If airspeed suddenly increases and you are above glidepath on approach in convective weather — DO NOT reduce power. Assume wind shear and go around immediately.',
      'The correct procedure: at first sign of wind shear on approach, go-around at maximum rated power, level pitch attitude to stop descent, then climb away.',
      'PIREP of "30-kt airspeed loss on final" from the preceding aircraft = mandatory go-around for all subsequent aircraft until the LLWS advisory is cancelled.'
    ],
    discoveryQuestions: [
      {
        q: 'The crew received a PIREP of severe wind shear on final from the preceding aircraft. What should have happened immediately after receiving that information?',
        opts: [
          'Continue but slow to minimum approach speed to provide more energy margin',
          'Go around immediately — a PIREP of severe wind shear on the approach course means the approach should not be continued',
          'Contact the preceding aircraft directly for more detail before deciding',
          'Add 10 knots to approach speed and continue with increased vigilance'
        ],
        response: 'A PIREP of severe wind shear on final from the preceding aircraft is direct pilot-to-pilot information that a hazard exists on the exact approach path. There is no reasonable argument for continuing. The crew already had an active LLWS advisory and an active Convective SIGMET — three independent signals all pointing to the same conclusion. The only professional decision was a go-around before initiating the approach.'
      },
      {
        q: 'During the headwind phase of the microburst, the aircraft flew above glidepath. The crew reduced power to correct. Why was this the worst possible response?',
        opts: [
          'Reducing power in headwind conditions always causes an immediate descent below glidepath',
          'Reducing power depleted the aircraft\'s energy reserve for the tailwind phase that followed seconds later — when sudden airspeed loss required maximum power instantly',
          'The glidepath deviation was not significant enough to warrant any power change at all',
          'Only thrust reversers should be used for glidepath corrections on approach'
        ],
        response: 'The headwind phase of a microburst is a trap. It gives you extra performance — so you reduce power to correct back to glidepath. Then the tailwind phase hits: sudden 30-50 kt airspeed loss while a powerful downdraft pushes the aircraft toward the ground. Now you have no power reserve, a massive tailwind, and a downdraft — simultaneously. The only correct response to unexpected airspeed gain in convective weather on approach is to go around immediately, not correct the glidepath.'
      }
    ],
    quiz:[
      {id:'qcs4_1',question:'During a microburst encounter on final approach, the most dangerous phase for the aircraft is:',options:['The initial headwind increase — excess lift causes glidepath exceedance','The transition from headwind to tailwind — simultaneous airspeed loss and downburst creates unrecoverable energy state','The downdraft core — descending air reduces thrust','The recovery from the tailwind — too much power causes overspeed'],correct:1,explanation:'The headwind phase actually gives better-than-normal performance (airspeed increase). The danger is that pilots reduce power to correct the glidepath exceedance — then the tailwind phase hits, causing a sudden 30-50 kt airspeed loss while simultaneously a strong downdraft pushes the aircraft down. With power already reduced and a massive tailwind/downdraft combination, the aircraft may not be able to recover before ground impact.'},
      {id:'qcs4_2',question:'The correct initial response when you suddenly gain 20 kts of airspeed and fly above glidepath during an approach in convective weather is:',options:['Reduce power to correct back to glidepath — you are too high','Maintain or increase power and go around immediately — the airspeed gain indicates a headwind increase that will likely be followed by a tailwind decrease','Increase descent rate to return to glidepath','Call for full flaps to increase drag'],correct:1,explanation:'Sudden airspeed increase above glidepath in convective weather is a wind shear warning sign. The headwind phase is the warning; the tailwind phase is the killer. Do not reduce power in response to glidepath exceedance when wind shear is suspected. The correct response is to go around with maximum power. Every second of continued approach in wind shear increases exposure to the tailwind/downdraft phase.'},
      {id:'qcs4_3',question:'An active LLWS advisory and a fresh PIREP reporting severe wind shear on the approach course require:',options:['Increased airspeed for approach to provide more energy margin','A go-around from any approach attempt until the conditions are confirmed to have improved','Continuous monitoring of airspeed with minor power adjustments as needed','Diversion to an alternate — the approach cannot be attempted'],correct:1,explanation:'The go-around option always remains available until touchdown. With an active LLWS advisory AND a PIREP of severe wind shear, continuing the approach means knowingly flying into a hazard that has already been reported as severe by another pilot. The professional and safe decision is to go around (or not initiate the approach), hold for the weather to pass or improve, or divert to an alternate. If an alternate is not available, hold until the microburst dissipates (typically 5-15 minutes).'}
    ]
  },
  {
    id:'cs5',
    caseType: 'simulated',
    verified: false,
    title:'The AIRMET They Ignored',
    subtitle:'Non-ice-certified GA aircraft into moderate icing, AIRMET Zulu active',
    category:'Structural Icing',
    hazard:'Structural Icing — Non-Certificated Aircraft',
    severity:'fatal',
    faaRef:'Ch. 20',
    icon:'🧊',
    color:'#0EA5E9',
    aircraft:'Piper PA-28-181 Archer (non-ice-certificated)',
    pilot:'Private pilot, 489 hours, instrument rated and current',
    date:'November morning, Midwest',
    brief:`
      <p>An instrument-rated pilot filed IFR for a 200-mile cross-country. An AIRMET Zulu for moderate icing was active from the surface to 12,000 ft along the entire route. The pilot acknowledged the AIRMET during the preflight briefing. The forecast called for improving conditions in approximately 6 hours.</p>
      <p>The pilot had a business meeting and elected to depart. Passengers included the pilot's family members.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">ICING ENVIRONMENT</div>
        <div style="color:#38BDF8">AIRMET ZULU: MOD ICG BTN SFC-120 INTSFY</div>
        <div style="color:#F59E0B">Freezing level: surface to 8,000 ft</div>
        <div style="color:#EF4444">Temp at cruise altitude (8,000 ft): -6°C in OVC</div>
        <div style="color:#94A3B8">Aircraft: no deicing equipment, no TKS, no hot props</div>
      </div>
    `,
    narrative:`
      <p>Approximately 45 minutes into the flight, the pilot requested a lower altitude from ATC. ATC offered 4,000 ft. The pilot accepted, then shortly after requested 2,000 ft. ATC complied. The pilot declared an emergency 4 minutes later, reporting "complete loss of power" and significant control difficulty.</p>
      <p>The aircraft impacted a farm field in wings-level attitude. Post-accident examination found 1.5 inches of mixed icing on the leading edges, clear ice on the propeller, and significant ice on the control surfaces. The carburetor heat was found in the ON position.</p>
      <p>The pilot had been building ice for 45 minutes before recognizing the emergency. By the time the aircraft was at 2,000 ft, the accumulated ice had so significantly degraded performance that the pilot could not maintain altitude even at full power.</p>
    `,
    probableCause:`The pilot's decision to conduct IFR flight in a non-ice-certificated aircraft into known icing conditions (AIRMET Zulu active for the entire route). The accumulated structural icing degraded aircraft performance beyond recovery capability.`,
    lessons:[
      '"Known icing conditions" means visible moisture AND temperature at or below 0°C. Operating a non-ice-certificated aircraft in known icing conditions is illegal (14 CFR 91.9) and life-threatening.',
      'AIRMET Zulu for the entire route, surface to 12,000 ft, with no VFR-on-top option should be an automatic no-go for non-ice-certificated aircraft.',
      'Ice accumulation is often gradual — by the time a pilot recognizes the severity, aerodynamic degradation may already be unrecoverable.',
      'Schedule pressure is cited as a contributing factor in a disproportionate number of weather accidents. The meeting can be rescheduled. There is no equivalent remedy for a fatal accident.',
      'Requesting lower altitudes during an icing encounter means flying through more of the icing layer, not less. Get OUT of the icing layer — either climb above it (if ice-certificated and able) or request an immediate deviation/divert.'
    ],
    discoveryQuestions: [
      {
        q: 'The pilot knew about AIRMET Zulu covering the full route before departure. What made the decision to depart fundamentally different from legitimate risk acceptance?',
        opts: [
          'The pilot lacked current instrument currency, making the flight illegal for a second reason',
          'AIRMET Zulu is a regulatory prohibition — no aircraft may depart when one is active',
          'The aircraft was not certificated for known icing — flying into it was outside the aircraft\'s approved limitations, not a risk calculation',
          'The passenger manifest included the pilot\'s family, which should have changed the analysis'
        ],
        response: 'Flying a non-ice-certificated aircraft into known icing conditions is not a risk calculation — it is operating outside the aircraft\'s certified limitations. The Piper PA-28 was not designed or approved for that environment. The certification requirement exists precisely because ice accumulation on an unapproved aircraft is unmanageable by design. Schedule pressure turned a limitation question into a risk question, and that framing was itself the error.'
      },
      {
        q: 'The pilot requested progressively lower altitudes as the flight continued. What was actually happening, and why didn\'t descending help?',
        opts: [
          'The pilot was correctly attempting to descend below the freezing level where icing would stop',
          'Ice was accumulating and degrading performance — requiring lower altitudes to maintain level flight. But in a layer extending to the surface, descending didn\'t exit the icing; it bought minutes in the same environment with less terrain clearance',
          'Lower altitudes have higher air density, partially compensating for the added ice weight',
          'The pilot was testing different altitudes to find the least-intense icing layer'
        ],
        response: 'Each lower altitude request was the aircraft describing its own degradation. Accumulated ice was reducing lift and increasing drag, making the previous altitude unsustainable. But the AIRMET Zulu described icing from the surface to 12,000 ft — descending within that layer doesn\'t exit the icing environment. It just provides a few more minutes in the same hazard with less terrain clearance and less margin for the forced landing that was becoming inevitable.'
      }
    ],
    quiz:[
      {id:'qcs5_1',question:'An instrument-rated pilot in a non-ice-certificated PA-28 wants to file IFR with AIRMET Zulu active for the entire route (surface to 12,000 ft). The correct legal and safety determination is:',options:['Legal — instrument-rated pilots may fly in icing conditions regardless of aircraft certification','Illegal and extremely dangerous — 14 CFR 91.9 prohibits operating any aircraft in excess of its certificated limitations, which includes flight in known icing conditions for non-ice-certificated aircraft','Legal if the pilot briefs passengers on the risk','Legal if the forecast calls for improvement within 6 hours'],correct:1,explanation:'14 CFR 91.9 requires that no person may operate an aircraft except in accordance with the limitations established for that aircraft. For non-ice-certificated aircraft, "known icing conditions" (visible moisture + temp ≤ 0°C) is outside the aircraft\'s operating limitations. Filing IFR with AIRMET Zulu active for the full route in IMC is operating in known icing — both illegal and extremely dangerous.'},
      {id:'qcs5_2',question:'A pilot flying IFR encounters moderate icing and begins requesting progressively lower altitudes from ATC. This strategy:',options:['Is correct — lower altitudes are below the freezing level where icing stops','Is likely counterproductive — descending within an icing layer keeps the aircraft in icing conditions longer without resolving the problem. The correct actions are: request a divert, request a higher altitude to get above the icing, or declare an emergency.','Is correct if the airspeed is reduced to minimize ice accumulation rate','Always removes the aircraft from icing conditions'],correct:1,explanation:'Requesting lower altitudes within an icing layer means: (1) you may still be in icing conditions at the lower altitude, (2) you have less obstacle clearance margin, (3) you are still accumulating ice. The correct responses to an icing encounter in a non-certificated aircraft: (1) immediately request diversion to the nearest airport, (2) if below freezing level, consider requesting a climb ABOVE the layer (if aircraft performance permits), (3) declare emergency if performance is degrading — do not delay.'},
      {id:'qcs5_3',question:'Ice accumulation on an aircraft airfoil primarily degrades performance by:',options:['Adding weight — the extra mass reduces fuel efficiency','Disrupting boundary layer airflow, reducing lift by up to 30%, increasing drag by up to 40%, and raising stall speed — potentially simultaneously with reduced control authority','Blocking carburetor intake only — no effect on wings','Reducing engine power by cooling the intake air'],correct:1,explanation:'Structural ice changes the shape of the airfoil. Even a thin layer of rough ice on the leading edge can: reduce lift coefficient by up to 30%, increase drag by up to 40%, raise stall speed significantly (potentially by 30+ kts for severe ice), and reduce control effectiveness (ice on control surfaces and hinges). The aircraft may stall at an airspeed that previously felt perfectly safe, with reduced ability to recover. This is why ice-certificated aircraft have deicing systems — not just to remove ice but to maintain aerodynamic integrity.'}
    ]
  },
  {
    id:'cs6',
    caseType: 'simulated',
    verified: false,
    title:'Silent Engine at 3,000 Feet',
    subtitle:'Carburetor ice during descent, power loss over populated area',
    category:'Engine Icing',
    hazard:'Carburetor Icing',
    severity:'serious injury',
    faaRef:'Ch. 20',
    icon:'🔴',
    color:'#EF4444',
    aircraft:'Cessna 172 (carbureted)',
    pilot:'Private pilot, 340 hours',
    date:'Spring afternoon, mid-Atlantic states',
    brief:`
      <p>A private pilot was conducting a solo cross-country flight in a carbureted Cessna 172. Conditions were suitable for carburetor icing: OAT 18°C (64°F), dewpoint 14°C (57°F) — a spread of only 4°C, indicating high relative humidity. The pilot had been in cruise for 1.5 hours at 4,500 ft and began descent for the destination airport.</p>
      <p>During the preflight briefing, the forecaster had noted "conditions favorable for carburetor icing at glide power." The pilot had not applied carburetor heat during the cruise portion of the flight.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">CARB ICE RISK ASSESSMENT</div>
        <div style="color:#38BDF8">OAT: 18°C — well above freezing, no structural icing risk</div>
        <div style="color:#F59E0B">T-Td spread: 4°C — HIGH carb ice risk zone</div>
        <div style="color:#EF4444">Power setting at descent: throttle reduced to ~1,500 RPM</div>
        <div style="color:#94A3B8">Carb ice prime zone: 20°F-70°F OAT + high humidity at low power</div>
      </div>
    `,
    narrative:`
      <p>After reducing power for descent, the pilot noticed the engine running roughly approximately 5 minutes later. The pilot initially attributed this to turbulence. The RPM continued to decay. At 3,000 ft AGL over a suburban area, the engine quit entirely.</p>
      <p>The pilot attempted a forced landing on a highway, narrowly missing vehicles. The aircraft sustained significant damage and the pilot received serious injuries. No fire occurred.</p>
      <p>Post-accident examination found no mechanical anomalies with the engine. The carburetor was found ice-free (the engine had been at low power during the accident and temperature had risen post-impact), but residual moisture patterns and the flight profile were consistent with carburetor icing. The pilot later confirmed carb heat had not been applied during cruise or during the descent.</p>
    `,
    probableCause:`Engine power loss due to carburetor ice accumulation during descent at reduced power in conditions conducive to carburetor icing. The pilot's failure to apply carburetor heat prior to and during the power reduction for descent.`,
    lessons:[
      'Carburetor ice can form at OAT up to 70°F (21°C) in high humidity — you do NOT need to be near freezing temperatures.',
      'Low power settings (descent, approach, glide) are when carburetor ice forms fastest — this is exactly when pilots are busiest and most likely to miss the gradual RPM decay.',
      'Apply carb heat BEFORE reducing power, not after noticing the rough engine.',
      'If rough running occurs AFTER applying carb heat, that is ice melting — normal. Continue carb heat until smooth running returns. Do NOT cycle it off.',
      'Many common training aircraft — including carbureted PA-28 variants and Cessna 172s with carbureted engines — share this vulnerability. Understanding carburetor icing risk is directly relevant to every pilot who flies a carbureted aircraft.'
    ],
    discoveryQuestions: [
      {
        q: 'The OAT was 18°C (64°F) — well above freezing. What made carburetor icing possible in these conditions?',
        opts: [
          'A warm front passage caused localized freezing in the carburetor heat exchanger',
          'Ice crystals present at altitude entered the carburetor even at this OAT',
          'Fuel evaporation and air expansion inside the carburetor venturi drop the local temperature 20-70°F below OAT — reaching below freezing even in warm, humid air',
          'The engine had an unusual design defect that concentrated moisture at the throttle plate'
        ],
        response: 'The OAT tells you what the air outside feels like. Inside a carbureted engine\'s venturi, fuel evaporation and rapid air expansion cause a local temperature drop of 20-70°F below OAT. At 64°F outside with a T-Td spread of only 4°C, the carburetor throat temperature drops well below freezing — ideal for ice to build on the venturi walls. This is why carburetor ice is specifically a warm, humid weather problem, not a cold weather problem.'
      },
      {
        q: 'The rough running started 5 minutes after power reduction and the pilot attributed it to turbulence. What recognition failure occurred?',
        opts: [
          'The carburetor heat gauge was reading incorrectly, providing false confidence',
          'Flight training doesn\'t cover carburetor ice recognition adequately',
          'Carburetor icing develops gradually — the early symptoms (slight roughness, RPM decay) mimic turbulence and are easy to dismiss until ice accumulation is already significant',
          'The pilot was distracted by ATC communications during the descent'
        ],
        response: 'Carburetor icing develops slowly — a slight engine roughness, a gradual RPM decay. The onset mimics turbulence well enough that busy pilots frequently dismiss early symptoms as something else. By the time RPM decay is clearly noticeable, substantial ice has already built. This is why the POH specifies applying carb heat before reducing power — proactively, as a habit — not reactively after the engine begins failing.'
      }
    ],
    quiz:[
      {id:'qcs6_1',question:'Carburetor ice is most likely to form when:',options:['OAT is below 0°C — the carburetor freezes like any other water','OAT is between -7°C and 21°C (20°F to 70°F) with high relative humidity, especially at low power settings during descent','OAT is above 25°C — heat causes vapor lock in the carburetor','Only when visible moisture (rain or clouds) is present'],correct:1,explanation:'Fuel evaporation and air expansion in the carb venturi can drop temperature 20-70°F. At OAT 18°C (64°F) with high humidity, the carb throat temperature can drop to below freezing, forming ice on the venturi walls and throttle plate — even though it "feels warm" outside. Low power settings accelerate ice formation because the lower manifold pressure creates more expansion cooling. This is why carb ice is a warm, humid weather phenomenon.'},
      {id:'qcs6_2',question:'After reducing power for descent, you notice the engine running roughly and RPM dropping. You apply carburetor heat and the engine runs even rougher for a few seconds. You should:',options:['Immediately turn carb heat off — it is making the problem worse','Continue with carb heat on — the roughness indicates ice is melting. Maintain carb heat until smooth running returns.','Declare an emergency — rough engine after carb heat application indicates mechanical failure','Apply carb heat only in 5-second pulses to prevent overcooling the engine'],correct:1,explanation:'When carb heat is applied to an ice-contaminated carburetor, the warm air melts the ice, which temporarily increases fuel-air mixture richness (adding water vapor) — causing momentary rough running and possible RPM drop. This is NORMAL and is confirmation that ice was present. Continue applying carb heat. The engine will smooth out as the ice passes through. Turning carb heat off because it causes rough running is exactly the wrong response.'},
      {id:'qcs6_3',question:'When should carburetor heat be applied in a carbureted aircraft?',options:['Only when the OAT drops below 0°C','Prior to any power reduction (approach, descent, pattern entry), during extended cruise in high-humidity conditions, and any time RPM decay is noticed','Only during flight in visible moisture (IMC)','Only when the engine begins running rough — applying it preventively wastes fuel'],correct:1,explanation:'Carb heat should be used preventively: before reducing power (not after the ice has already formed), during pattern operations at reduced power, and during any extended flight in conditions favorable for icing (warm, humid). For the PA-28 and similar carbureted aircraft, POH procedures specify when to use carb heat. Many CFIs teach "carb heat on for every power reduction below cruise." The habit should be automatic — not a response to symptoms.'}
    ]
  },
  {
    id:'cs7',
    caseType: 'simulated',
    verified: false,
    title:'Density Altitude Death Trap',
    subtitle:'Hot day, high elevation, obstacle-laden departure, overloaded aircraft',
    category:'Density Altitude',
    hazard:'Performance Degradation',
    severity:'fatal',
    faaRef:'Ch. 8, 16',
    icon:'🌡️',
    color:'#F59E0B',
    aircraft:'Cessna 182 (normally aspirated)',
    pilot:'Private pilot, 612 hours',
    date:'July afternoon, western mountain airport',
    brief:`
      <p>A pilot loaded four adults and full fuel into a Cessna 182 for a departure from a mountain airport at 6,200 ft MSL on a July afternoon. OAT was 38°C (100°F). The pilot did not compute weight and balance or density altitude prior to departure. The runway was 4,500 ft with trees on departure end.</p>
      <p>A local flight instructor had expressed concern about the load to the pilot before departure. The pilot replied "I've taken off here dozens of times."</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">DENSITY ALTITUDE CALCULATION</div>
        <div style="color:#38BDF8">Field elevation: 6,200 ft MSL</div>
        <div style="color:#38BDF8">OAT: 38°C (100°F) vs ISA at 6,200 ft: ~5°C</div>
        <div style="color:#F59E0B">Pressure altitude: ~6,100 ft</div>
        <div style="color:#EF4444">Density altitude: ~10,300 ft</div>
        <div style="color:#EF4444">Aircraft POH: sea-level takeoff roll 900 ft. At DA 10,300 ft: ~2,800+ ft</div>
        <div style="color:#94A3B8">Aircraft was also at or above max gross weight</div>
      </div>
    `,
    narrative:`
      <p>Witnesses observed the aircraft use approximately 3,800 feet of runway before becoming airborne. The aircraft climbed slowly and failed to clear the trees at the end of the runway, impacting them at approximately 50 feet AGL. The aircraft cartwheeled into a field beyond the trees.</p>
      <p>The pilot's comment "I\'ve taken off here dozens of times" reflects the core trap: previous successful departures were in cooler conditions, lighter loads, or both. Density altitude is not a fixed property of an airport — it changes dramatically with temperature and aircraft loading.</p>
      <p>At DA of 10,300 ft, the aircraft had roughly 30% less engine power, 30% less propeller efficiency, and required approximately 3× the sea-level takeoff distance. The aircraft at maximum gross weight had a climb rate of perhaps 200-300 fpm at these conditions — insufficient to clear the trees.</p>
    `,
    probableCause:`The pilot's failure to compute density altitude and aircraft performance before departure. The aircraft was overloaded and operated from a high-elevation airport in extreme heat, resulting in performance that was insufficient to clear departure-end obstacles.`,
    lessons:[
      'Density altitude is the MOST deceptive hazard in aviation — on a hot day at a mountain airport, the air feels the same but performs like high altitude.',
      'Previous successful departures at the same airport prove nothing when conditions change. Each departure must be evaluated independently.',
      '"I\'ve done it before" is not a performance calculation.',
      'When density altitude exceeds available runway length × safety factor, the departure should be delayed to cooler conditions (early morning), weight should be reduced, or a different route/aircraft should be used.',
      'Obstacle clearance is not just about "getting airborne" — it is about having climb performance to clear everything between departure and pattern altitude.'
    ],
    discoveryQuestions: [
      {
        q: 'The pilot said "I\'ve taken off here dozens of times." Why did previous successful departures give false confidence?',
        opts: [
          'Previous departures in similar conditions validated the pilot\'s judgment — the confidence was well-founded',
          'Density altitude changes with temperature and load — previous departures in cooler conditions or with lighter loads were fundamentally different performance situations, not comparable to this flight',
          'The aircraft had been recently modified, changing its performance characteristics',
          'The runway surface had deteriorated, increasing the effective takeoff roll required'
        ],
        response: 'Density altitude is not a fixed property of an airport — it is the product of field elevation, temperature, and pressure, and it changes with every flight. A pilot who has made 20 successful departures from a mountain airport in the morning, solo, in cooler weather has zero information about performance with four adults, full fuel, at 100°F in the afternoon. Each departure requires its own performance calculation. Past success at a location doesn\'t transfer to different conditions.'
      },
      {
        q: 'A density altitude of 10,300 ft means what, exactly, for this aircraft\'s performance?',
        opts: [
          'The altimeter will read 10,300 ft even though the field is at 6,200 ft MSL',
          'Only the altimeter is affected — engines use sea-level performance charts regardless of density altitude',
          'The air is as thin as it would be at 10,300 ft MSL — the engine produces roughly 30% less power, the propeller bites thinner air, and the wing requires more speed for the same lift — all simultaneously',
          'Performance degrades linearly by exactly 10% per 1,000 ft above sea level'
        ],
        response: 'Density altitude means the atmosphere is performing as if the aircraft were at 10,300 ft, regardless of what the altimeter reads. Engine power is roughly 30% below sea level. Propeller efficiency drops proportionally. The wing needs higher airspeed to generate the same lift. All three degrade at the same time and they compound each other. At 10,300 ft DA, expect roughly 3× the sea-level takeoff distance and a climb rate that may be insufficient to clear departure-end obstacles.'
      }
    ],
    quiz:[
      {id:'qcs7_1',question:'Density altitude at a field with elevation 5,000 ft MSL on a hot day (OAT 35°C, altimeter 30.10) is approximately:',options:['About 5,000 ft — density altitude equals field elevation at all temperatures','About 8,500 ft — high temperature significantly raises effective density altitude above field elevation','About 4,800 ft — high altimeter setting lowers density altitude below field elevation','About 6,000 ft — only 1,000 ft above field elevation'],correct:1,explanation:'Pressure altitude ≈ (29.92 - 30.10) × 1000 + 5000 = 5000 - 180 = ~4,820 ft. Temperature deviation from ISA at 4,820 ft: ISA temp = 15 - (4820 × 0.00357) = 15-17.2 = -2.2°C. Actual temp: 35°C. Deviation: +37.2°C. DA ≈ pressure altitude + (temperature deviation × 120) = 4,820 + (37.2 × 120) = 4,820 + 4,464 = ~9,284 ft. At density altitude nearly 9,300 ft, expect dramatic performance reduction from sea-level book values.'},
      {id:'qcs7_2',question:'An aircraft POH shows a sea-level takeoff roll of 800 ft and a 50-ft obstacle clearance distance of 1,350 ft. At density altitude 8,000 ft with a full load, you should expect:',options:['800 ft takeoff roll — DA only affects cruise performance','Approximately 2,400 ft takeoff roll and 4,000+ ft obstacle clearance distance — performance degrades significantly with altitude and temperature','1,000 ft takeoff roll — modest increase','The same performance — modern aircraft are not significantly affected by density altitude'],correct:1,explanation:'As a rough rule of thumb, for every 1,000 ft increase in density altitude, takeoff distance increases approximately 10-15% and climb performance decreases approximately 10-15%. At 8,000 ft DA vs sea level, expect roughly 3x the sea-level takeoff roll. This is why you MUST use the POH performance charts (or FAA approved methods) for density altitude corrections — every departure at a mountain airport or hot summer day requires this calculation.'},
      {id:'qcs7_3',question:'The best mitigation strategy when density altitude would significantly reduce performance at your departure airport is:',options:['Fly faster on takeoff to compensate for reduced engine power','Depart in the early morning when temperatures are lowest and density altitude is minimized, reduce aircraft weight, or use a longer runway','Add fuel to increase engine power at high density altitude','Density altitude only affects turbine aircraft — piston aircraft are unaffected above 8,000 ft DA'],correct:1,explanation:'Practical strategies for high DA operations: (1) depart early morning when OAT is 15-20°C lower (reducing DA 2,000-3,000 ft); (2) reduce weight — offload passengers, baggage, or fuel for a ferry leg; (3) use the longest available runway; (4) ensure a clear departure path with no obstacles; (5) lean the mixture properly for max power at altitude. Never depart with a density altitude that requires performance exceeding what the aircraft can provide with a safety margin.'}
    ]
  },
  {
    id:'cs8',
    caseType: 'simulated',
    verified: false,
    title:'Swallowed by the Rotor',
    subtitle:'Mountain wave turbulence, unexpected downdraft over ridge',
    category:'Mountain Weather',
    hazard:'Mountain Wave / Rotor Turbulence',
    severity:'fatal',
    faaRef:'Ch. 16',
    icon:'🏔️',
    color:'#059669',
    aircraft:'Beechcraft Bonanza A36',
    pilot:'Private pilot, instrument rated, 1,200 hours',
    date:'February afternoon, Sierra Nevada mountains',
    brief:`
      <p>A pilot planned a mountain crossing at 12,500 ft MSL. Surface winds at the departure airport (valley) were 15 kt. Winds aloft at 12,000 ft: 280°/55 kt. The mountains ahead had ridgelines at 10,500 ft MSL. No PIREPs existed for the route; no AIRMET Tango had been issued yet.</p>
      <p>The pilot had crossed these mountains many times. Skies were clear on the west side.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">MOUNTAIN WAVE CONDITIONS</div>
        <div style="color:#38BDF8">Winds at 12,000 ft: 280°/55 kt — perpendicular to ridgeline</div>
        <div style="color:#F59E0B">Ridge height: 10,500 ft MSL</div>
        <div style="color:#F59E0B">Crossing altitude: 12,500 ft — only 2,000 ft above ridge</div>
        <div style="color:#EF4444">Rotor zone: extends from surface to 12,000-15,000 ft on lee side</div>
        <div style="color:#94A3B8">No visual indicators observed (no lenticular clouds — dry air)</div>
      </div>
    `,
    narrative:`
      <p>Radar data showed the aircraft crossing the ridge normally, then entering a rapid descent on the lee side. The aircraft descended from 12,500 to 8,200 ft in approximately 90 seconds before radar contact was lost. The wreckage was found in a lee-side canyon.</p>
      <p>The NTSB reconstruction showed the aircraft had encountered a downdraft estimated at 4,000-6,000 fpm on the lee side of the ridge. At the aircraft's normal cruise power, the maximum climb rate was approximately 900 fpm — insufficient to counter the downdraft by a factor of 5.</p>
      <p>The pilot had 2,000 ft of clearance above the ridge. In the rotor zone, with a 5,000 fpm downdraft, 2,000 ft of clearance disappears in approximately 24 seconds. There is no recovery from a 5,000 fpm downdraft in a light aircraft — the only survival strategy is not entering the rotor zone.</p>
    `,
    probableCause:`Encounter with mountain wave rotor turbulence on the lee side of a high ridge in strong cross-ridge wind conditions. The downdraft velocities encountered exceeded the aircraft's maximum climb performance by a significant margin.`,
    lessons:[
      '55 kt winds perpendicular to a major ridgeline virtually guarantee mountain wave activity — whether or not an AIRMET has been issued.',
      'Clear skies do NOT mean wave-free air. In dry conditions, mountain wave activity occurs without lenticular clouds or any visual indicators.',
      'The FAA recommends crossing mountain ridges at a minimum of 1,000 ft above the highest terrain in the area — but in strong wave conditions, this margin is insufficient. Cross at 2,000 ft minimum, preferably 3,000+ ft above the ridge.',
      'If you encounter unexpected downdrafts near a mountain ridgeline, do not attempt to fight the downdraft by pulling back. Turn AWAY from the ridge — downwind (direction of wind travel) provides the only escape path.',
      'The standard mountain crossing technique: approach the ridge at 45° angle so a turn away is always available; if the aircraft cannot maintain altitude, do not cross.'
    ],
    discoveryQuestions: [
      {
        q: 'The pilot had crossed these mountains many times. Skies were clear. What weather signal should have triggered a more cautious assessment of this particular crossing?',
        opts: [
          'Cirrus clouds at high altitude indicating jet stream proximity',
          'A PIREP from the previous day showing moderate turbulence',
          'Winds aloft at 12,000 ft: 55 kt perpendicular to the ridgeline — the textbook trigger for significant mountain wave activity, with or without an AIRMET, with or without visual cues',
          'Surface winds at the departure airport were 15 kt — already above the threshold for mechanical turbulence'
        ],
        response: '55-knot winds perpendicular to a major ridgeline are the textbook trigger for mountain wave activity. An AIRMET may not yet be issued — PIREPs often come after accidents, not before. In dry air, mountain waves produce identical dynamics with zero visual indicators: no lenticular clouds, no rotor clouds, no visible warning. The winds aloft forecast was the signal available to this pilot before departure. The clear skies provided false reassurance.'
      },
      {
        q: 'The aircraft encountered a downdraft estimated at 5,000 fpm. The aircraft\'s maximum climb rate was 900 fpm. Why was maximum climb power irrelevant as a survival strategy?',
        opts: [
          'Emergency power reserves above maximum climb power should have been used',
          'At high altitude, the engine cannot produce maximum power, reducing the effective climb rate further',
          '900 fpm is only 18% of the downdraft rate — fighting vertically against a 5:1 downdraft is not viable. The only escape is lateral: turn downwind to exit the wave system',
          'Turbulence in the rotor zone would have caused structural failure before the climb rate became meaningful'
        ],
        response: 'When the atmosphere pushes you down at 5,000 fpm and your aircraft climbs at 900 fpm, you have a net downward rate of over 4,000 fpm. Pulling back harder increases drag and risks a stall. The only viable escape from a wave downdraft is lateral — turn downwind, away from the ridge, to exit the wave system before it drives you into the terrain below. This is why mountain crossing technique emphasizes the 45° approach angle: so a retreat is always available.'
      }
    ],
    quiz:[
      {id:'qcs8_1',question:'Perpendicular winds of 25+ kt over a mountain ridgeline indicate:',options:['Safe mountain crossing conditions — strong winds reduce turbulence by smoothing the airflow','High probability of mountain wave activity with potentially severe rotor turbulence on the lee side, regardless of whether an AIRMET has been issued','Mountain wave only occurs with winds above 50 kt','Conditions only dangerous for jet aircraft at high altitude'],correct:1,explanation:'Mountain waves form when stable air flows over ridges with wind speeds of 25+ kt perpendicular to the ridge. The resulting wave pattern on the lee side can produce: severe updrafts (several thousand fpm), severe downdrafts (several thousand fpm), and rotor zones with extreme turbulence. These conditions can exist with clear skies and no visual indicators. AIRMET Tango for mountain wave is often issued AFTER accidents, when PIREPs confirm the hazard — not before.'},
      {id:'qcs8_2',question:'In a mountain wave downdraft that exceeds the aircraft\'s climb rate, the correct action is:',options:['Pull back to maximum angle of attack — extract maximum lift from the wings','Turn away from the ridge (downwind) to exit the wave system — do not fight the downdraft with attitude alone','Descend voluntarily to below the rotor zone altitude','Add full power and maintain altitude'],correct:1,explanation:'You cannot out-climb a severe mountain wave downdraft in a light aircraft. Pulling back increases induced drag and may approach stall. The correct action is to turn downwind (away from the ridge) to exit the wave system. Once clear of the wave, use full power to establish a climb. If already in IMC, this is a controlled emergency — declare as such and get ATC assistance. The critical insight: exit laterally, do not fight vertically.'},
      {id:'qcs8_3',question:'The minimum recommended altitude above the highest terrain for a mountain crossing in strong wind conditions is:',options:['500 ft AGL — the standard VFR cruising altitude above terrain','At least 1,000 ft above the highest terrain, with 2,000-3,000 ft preferred in strong wind conditions to provide margin against wave downdrafts','At or above the ridge height — you only need to clear the ridge','FL150 or higher — mountain wave only affects aircraft below 15,000 ft'],correct:1,explanation:'The FAA recommends 1,000 ft above the highest terrain for mountain crossings, but this is a minimum, not an operational standard for strong winds. With 50+ kt winds, rotor zones can extend 1,000-3,000 ft above the ridge. Using 2,000-3,000 ft of clearance provides margin against wave downdrafts. Additionally: cross ridges at a 45° angle so a retreat is always available, and if the aircraft cannot maintain the crossing altitude, do not cross.'}
    ]
  },
  {
    id:'cs9',
    caseType: 'simulated',
    verified: false,
    title:'The Weather Deviation That Ran Out of Fuel',
    subtitle:'En route weather deviation, new routing, fuel not recalculated',
    category:'Fuel Management',
    hazard:'Weather Diversion + Fuel Planning',
    severity:'fatal',
    faaRef:'Ch. 3',
    icon:'⛽',
    color:'#7C3AED',
    aircraft:'Piper PA-28-235',
    pilot:'Private pilot, 890 hours',
    date:'Summer afternoon, Southeast US',
    brief:`
      <p>A pilot filed IFR for a 3-hour cross-country with 4.5 hours of fuel aboard. En route, ATC issued a series of weather deviations totaling approximately 45 minutes of additional flight time due to a large area of embedded thunderstorms. The pilot accepted all deviations without re-evaluating fuel status.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">DEVIATION FUEL MATH</div>
        <div style="color:#38BDF8">Planned fuel: 4.5 hours (against 3.0-hour flight)</div>
        <div style="color:#38BDF8">Weather deviation: +45 min flight time added</div>
        <div style="color:#F59E0B">New total flight time: ~3.75 hours</div>
        <div style="color:#F59E0B">Reserve after deviation: 45 min (legal minimum)</div>
        <div style="color:#EF4444">BUT: pilot flew 15 min extra looking for the destination in marginal vis</div>
        <div style="color:#EF4444">RESULT: engine quit 4 miles from destination on 5-mile final</div>
      </div>
    `,
    narrative:`
      <p>After accepting three ATC weather deviations totaling approximately 45 minutes of additional flight time, the pilot did not request a fuel stop or recalculate fuel remaining. Upon reaching the destination area, marginal visibility required additional maneuvering to find the airport.</p>
      <p>The engine quit on final approach from fuel exhaustion. The pilot executed a forced landing in a residential area. The aircraft struck a vehicle, fatally injuring a bystander.</p>
      <p>The deviation ate the planned reserve. The search for the airport ate the legal reserve. The pilot had multiple decision points where a fuel stop was clearly indicated but the decision to continue prevailed each time.</p>
    `,
    probableCause:`Fuel exhaustion resulting from the pilot's failure to recalculate fuel status after accepting significant en route weather deviations. Contributing: the pilot's decision to continue to the original destination without declaring minimum fuel or diverting for fuel.`,
    lessons:[
      'Every significant weather deviation should prompt an immediate fuel reassessment. Deviations that consume your reserves require an immediate divert for fuel — not a mental note.',
      'The legal fuel reserve (VFR: 30 min day/45 min night; IFR: 45 min) is a MINIMUM — not a comfortable cushion. Arriving at your destination at exactly legal reserve means you have NO margin for any unexpected delays.',
      '"Minimum fuel" is a notification to ATC that does not carry the urgency of an emergency. "MAYDAY — fuel exhaustion" is an emergency. Declare minimum fuel early enough to divert if needed.',
      'Weather deviations compound: one 15-minute deviation is manageable; three deviations that add 45 minutes total should trigger an immediate fuel evaluation and probable divert.',
      'The destination was 4 miles ahead. The bystander who died would have been alive if the pilot had stopped for fuel 45 minutes earlier. The cost of a fuel stop is never more than inconvenience.'
    ],
    discoveryQuestions: [
      {
        q: 'The pilot accepted three weather deviations totaling 45 minutes of additional flight time. What calculation should have happened immediately after the first significant deviation?',
        opts: [
          'A recalculation of estimated time of arrival for passenger notification',
          'A request to ATC for direct routing to compensate for the delay',
          'An immediate fuel status assessment: fuel remaining minus new total flight time minus required reserve — and if that math doesn\'t work, divert for fuel now',
          'A passenger advisory about the expected delay from the weather deviation'
        ],
        response: 'Every deviation that materially changes flight time should trigger an immediate fuel calculation: fuel remaining minus time to destination minus required reserve. If the result is zero or negative, the divert decision has already been made by the math — the only question is whether the pilot acts on it. The time to divert for fuel is when the numbers first fail, not when the engine stops.'
      },
      {
        q: 'The pilot had three deviation decision points, and each time chose to continue. What psychological mechanism made continuing easier than diverting at each step?',
        opts: [
          'The pilot\'s instruments were showing incorrect fuel levels, creating false confidence',
          'ATC clearances implied the routing was safe, removing personal responsibility',
          'Progressive commitment — each decision to continue made the next decision to stop psychologically harder, while the destination kept getting physically closer',
          'Weather at the destination was improving, reducing the objective need to divert'
        ],
        response: 'Each time the pilot continued, the destination got closer and the perceived cost of diverting got higher. "I\'m almost there" becomes more powerful as proximity increases — even as the actual fuel margin is becoming more critical. This is progressive commitment: the psychological difficulty of accepting a divert grows with proximity to the goal, just as the objective need for that divert also grows. The destination was 4 miles away when the engine stopped.'
      }
    ],
    quiz:[
      {id:'qcs9_1',question:'You are IFR with 1.5 hours of fuel remaining, and ATC offers a deviation that will add 30 minutes to your flight. Your destination is 1 hour away. What is the correct action?',options:['Accept the deviation — you still have 30 minutes of reserve after arrival','Divert to the nearest airport for fuel before accepting the deviation — after the deviation you will arrive with exactly 30 minutes reserve, which provides no margin for unexpected delays at the destination'],correct:1,explanation:'1.5 hours fuel - 1.0 hour to destination = 0.5 hours reserve. Minus 0.5 hour deviation = 0 hours reserve. You would arrive at the destination with exactly the legal minimum (IFR requires 45 min reserve). Any delay, unexpected vectoring, or missed approach consumes that reserve. The correct action is to divert for fuel BEFORE the deviation — arriving at a fuel stop with 0.5 hours remaining is far better than arriving at the destination with an empty tank.'},
      {id:'qcs9_2',question:'"Minimum fuel" declared to ATC means:',options:['The aircraft must immediately divert to the nearest airport','The pilot advises ATC of a fuel situation that requires priority handling, but is not a declaration of emergency. ATC will provide priority if workload permits but you are still responsible for the decision to divert or continue.'],correct:1,explanation:'"Minimum fuel" is an advisory, not an emergency declaration. ATC will note it and may provide priority handling, but it does not obligate them to do so and does not receive the same immediate priority as "Mayday" or "Pan-Pan." If you are in a true fuel emergency situation, declare "Mayday — minimum fuel" to receive immediate emergency priority. Declare minimum fuel early — before you are truly in an emergency — so you have options.'},
      {id:'qcs9_3',question:'IFR fuel requirements for a Part 91 flight require fuel to fly to the destination, then to the alternate (if required), plus:',options:['30 minutes at cruise speed','45 minutes at normal cruise speed after the alternate (or destination if no alternate required)','1 hour at normal cruise speed','2 hours total fuel for all IFR flights'],correct:1,explanation:'14 CFR 91.167: IFR fuel requirements = fuel to destination + (alternate if required) + 45 minutes at normal cruise speed. VFR requirements: destination + 30 min day / 45 min night. These are minimums. Most experienced pilots plan for significantly more reserve, especially for cross-countries with potential weather deviations. A practical planning rule: if you might deviate for weather, plan extra fuel from the outset.'}
    ]
  },
  {
    id:'cs10',
    caseType: 'simulated',
    verified: false,
    title:'Frost on the Wings',
    subtitle:'Frost not removed before takeoff, stall during initial climb',
    category:'Ground Icing',
    hazard:'Frost / Ground Icing',
    severity:'fatal',
    faaRef:'Ch. 20, 21',
    icon:'❄️',
    color:'#0284C7',
    aircraft:'Cessna 172',
    pilot:'Student pilot on solo cross-country',
    date:'Early winter morning',
    brief:`
      <p>A student pilot preflight the aircraft in the pre-dawn darkness. Temperature had dropped to -3°C overnight. The aircraft had been parked outside. The student noticed the wings "looked a little frosty" but believed it would "blow off during the takeoff roll" based on a comment heard from another pilot. The CFI was not present for the preflight.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">FROST CONDITIONS</div>
        <div style="color:#38BDF8">Overnight low: -3°C</div>
        <div style="color:#38BDF8">Clear sky, calm winds — ideal radiation cooling</div>
        <div style="color:#F59E0B">Aircraft parked outside: cold-soaked metal surfaces</div>
        <div style="color:#EF4444">Frost on upper wing surface: thin, uniform, appeared "light"</div>
        <div style="color:#94A3B8">Aircraft had no deicing equipment — standard GA training aircraft</div>
      </div>
    `,
    narrative:`
      <p>The aircraft used approximately 1,800 feet of runway (normal for the aircraft was 750 feet) before becoming airborne. The aircraft climbed slowly to approximately 50 feet AGL, then the nose dropped suddenly and the aircraft struck terrain approximately 400 feet off the departure end of the runway in a wings-level attitude.</p>
      <p>The NTSB determined the frost was responsible for a premature stall approximately 8-12 kts above the normal Vso. The thin frost layer — which appeared visually harmless — had disrupted the boundary layer airflow sufficiently to reduce the maximum lift coefficient and raise the stall speed by an estimated 15%.</p>
      <p>A visual inspection of frost can be deeply deceiving. A thin but rough coating of frost crystals functions aerodynamically like sandpaper on the leading edge — it triggers early boundary layer separation at angles of attack that would normally be well within the safe range.</p>
    `,
    probableCause:`The pilot's failure to remove frost from the aircraft's wings before flight. The frost degraded the wing's aerodynamic performance sufficiently to cause a stall at an airspeed above the aircraft's published stall speed.`,
    lessons:[
      '14 CFR 91.527 prohibits takeoff when frost, snow, or ice adheres to the lifting surfaces of large and turbine-powered multiengine aircraft. For GA pilots, the aircraft POH/AFM and 14 CFR 91.9 govern — virtually no GA aircraft POH authorizes flight with contaminated surfaces, and departure with frost present is almost never within the aircraft\'s published limitations. The prohibition is not a technicality: even thin frost raises stall speed and degrades lift.',
      '"It will blow off during the takeoff roll" is a fatal myth. Frost does not blow off — it adheres to the cold metal. By the time lift-off occurs, the frost has already degraded the wing\'s performance.',
      'Frost\'s danger is not its weight — it is its texture. Even a thin rough frost coating raises stall speed by up to 15% and reduces maximum lift. At the most critical phase of flight (just above the runway), this margin can disappear entirely.',
      'Deicing is always available — hot water, approved deicing fluid, or allowing the aircraft to warm in a heated hangar. The time cost of proper deicing is measured in minutes. The cost of skipping it can be measured otherwise.',
      'A CFI endorsing a student for solo cross-country should explicitly brief ground icing procedures and verify aircraft condition before solo operations in fall/winter conditions.'
    ],
    discoveryQuestions: [
      {
        q: 'The student saw frost on the wings and believed it would "blow off during the takeoff roll." What is the aerodynamic reality?',
        opts: [
          'Thin frost does blow off during the ground roll — the student\'s belief was reasonable for light frost',
          'Frost adds weight but does not affect aerodynamics until accumulation exceeds 1/4 inch',
          'Frost adheres to cold metal and does not blow off — it disrupts boundary layer airflow before rotation, raising stall speed by up to 15% and reducing available lift',
          'Frost effects are only significant at temperatures below -10°C'
        ],
        response: 'Frost bonds to cold metal surfaces and does not blow off during the ground roll. The rough texture of frost crystals on the upper wing surface disrupts the smooth airflow the wing depends on for lift. By the time the aircraft rotates, the frost has already changed the wing\'s aerodynamic character — higher stall speed, less available lift. The aircraft rotated, briefly flew, and stalled at airspeeds that would have been safe with clean wings.'
      },
      {
        q: 'This was a solo student on a cross-country, making a decision about frost without specific knowledge of the consequences. What systemic failure allowed this situation to occur?',
        opts: [
          'The student had passed all required knowledge tests, which should have covered this',
          'Student pilots are permitted to make independent go/no-go decisions, so no systemic failure occurred',
          'The CFI was not present and had not specifically briefed winter contaminated-surface procedures — placing a critical safety decision entirely on a student with no relevant training',
          'The aircraft log did not contain frost warning markings as required by regulations'
        ],
        response: 'A CFI endorsing a student for solo cross-country operations in fall or winter should explicitly brief contaminated surface procedures — including the consequences of frost and the steps for removal. A student pilot, alone, pre-dawn, in below-freezing temperatures should not be encountering this decision for the first time without specific prior instruction. The solo endorsement carries instructional responsibility, not just a legal signature.'
      }
    ],
    quiz:[
      {id:'qcs10_1',question:'A thin, uniform layer of frost on a wing upper surface primarily affects aircraft performance by:',options:['Adding significant weight that increases required takeoff speed','Disrupting boundary layer airflow on the upper surface, reducing maximum lift coefficient and raising stall speed by up to 15% or more','Only affecting range — aerodynamic performance is unchanged','Causing asymmetric lift — the left wing ices more than the right'],correct:1,explanation:'Frost crystals create a rough surface similar to sandpaper on the leading edge and upper surface. This roughness triggers premature boundary layer transition from laminar to turbulent flow, causing early separation at lower angles of attack. The result is a reduced maximum CL (less lift available) and a higher stall speed. An aircraft that normally stalls at 55 kts might stall at 63+ kts with even a light frost coating — a 15%+ increase that can be fatal in the takeoff/climb phase.'},
      {id:'qcs10_2',question:'Regarding frost removal before flight, 14 CFR Part 91 requires:',options:['Frost removal only if it exceeds 1/4 inch thickness','Frost removal only during IFR operations','ALL frost, ice, and snow must be removed from wings, control surfaces, and propellers before takeoff — no exceptions for thin or light frost','Frost removal is required only for aircraft above 12,500 lbs gross weight'],correct:1,explanation:'14 CFR 91.527 (and general airworthiness standards) require that no aircraft may take off with frost, snow, or ice adhering to the propeller, windshield, wings, stabilizing or control surfaces, or powerplant installation. There is no exception for "light" frost, no exception for training aircraft, and no exception based on forecast weather improvement. The regulation exists because even a thin frost coating has killed pilots.'},
      {id:'qcs10_3',question:'An aircraft on the ramp shows frost on the wings during a winter preflight. The proper action is:',options:['Depart quickly before more frost accumulates','Wipe the frost off with a cloth — this is sufficient for light frost','Remove all frost using approved methods (deicing fluid, warm water, or heated hangar) and verify all surfaces are completely clean before departure. Inspect again if the aircraft sits outside while loading passengers.'],correct:2,explanation:'Proper frost removal: use hot water (effective, inexpensive), FAA-approved glycol deicing fluid, or move the aircraft to a heated hangar. After deicing, if the aircraft sits outside in subfreezing temperatures, re-inspect all surfaces before departure — refreezing can occur quickly. Simply wiping frost with a cloth may leave residual ice crystals and does not constitute proper deicing. The "clean aircraft concept" means truly clean — visually verify every critical surface before engine start.'}
    ]
  },
  {
    id:'cs11',
    caseType: 'simulated',
    verified: false,
    title:'IMC in Two Minutes',
    subtitle:'VFR pilot enters clouds, graveyard spiral, impact within 90 seconds',
    category:'VFR into IMC',
    hazard:'Spatial Disorientation / Graveyard Spiral',
    severity:'fatal',
    faaRef:'Ch. 13',
    icon:'🌀',
    color:'#6366F1',
    aircraft:'Piper PA-28-161 Warrior',
    pilot:'Student pilot on cross-country, solo, 42 hours total',
    date:'Early afternoon, mid-Atlantic states',
    brief:`
      <p>A student pilot on a solo cross-country encountered an area of unexpected clouds that moved in and reduced visibility below VFR minimums. The student had been briefed on possible afternoon cumulus development but had not been briefed on cloud build-up to IFR levels. The flight was approximately 35 minutes into a 2-hour cross-country when clouds closed in.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">CONDITIONS AT TIME OF ENTRY</div>
        <div style="color:#38BDF8">Forecast: "Scattered cumulus, tops to 5,000 ft" (morning briefing)</div>
        <div style="color:#F59E0B">Actual: Cumulus had built to BKN 2,500 ft with bases dropping</div>
        <div style="color:#EF4444">Aircraft altitude: 3,500 ft — now inside cloud layer</div>
        <div style="color:#94A3B8">Student had no instrument training, no IFR flight experience</div>
      </div>
    `,
    narrative:`
      <p>Radar data showed the aircraft enter what appeared to be cloud layer. The aircraft maintained heading and altitude initially, then began a gradual right turn that steepened over approximately 60 seconds. The aircraft entered a spiral dive with a descent rate exceeding 4,000 fpm. Radar contact was lost. Wreckage was found in a wooded area.</p>
      <p>The graveyard spiral is the predictable outcome when a pilot without instrument training enters IMC: the vestibular system senses the bank as the aircraft rolls into the spiral, but the sensation fades as the turn continues. The pilot, feeling "level," senses only increased G-forces (which feel like level flight at high speed, not a spiral) and pulls back. Pulling back in a bank tightens the spiral, increasing G-load and descent rate. The whole sequence takes as little as 90 seconds.</p>
    `,
    probableCause:`The student pilot's inadvertent entry into IMC conditions and subsequent loss of aircraft control due to spatial disorientation. Contributing: insufficient pilot experience for conditions, deteriorating weather not anticipated in the preflight briefing.`,
    lessons:[
      'A student pilot (or any VFR-only pilot) who enters clouds has approximately 90-180 seconds before spatial disorientation produces a graveyard spiral. This is not a theoretical risk — it is a statistical reality.',
      'The graveyard spiral kills because pulling back in a spiral tightens it — the instinctive "recovery" response makes the situation worse.',
      'The ONLY safe action for a VFR pilot entering IMC: wings level (trust the instruments only), maintain altitude, turn 180° and exit. Do this within the FIRST 10 seconds — before spatial disorientation sets in.',
      'Afternoon cumulus forecasts must include the possibility of CB development. A forecast of "scattered cumulus" in unstable air should trigger a VFR pilot\'s planning for the possibility of deteriorating conditions.',
      'Every student pilot should know the standard 180° turn procedure for inadvertent IMC entry — not as a survival skill but as a mandatory response to execute before the situation deteriorates.'
    ],
    discoveryQuestions: [
      {
        q: 'The student had approximately 10-15 seconds to take the correct action after entering the cloud layer. What is that action, and why does timing matter so precisely?',
        opts: [
          'Climb above the cloud layer as rapidly as possible',
          'Maintain current heading and altitude and immediately contact ATC for IFR vectors',
          'Establish wings-level attitude on instruments, maintain altitude, and execute a 180° turn to exit — this must happen before vestibular disorientation sets in, which begins within about 20 seconds',
          'Descend through the cloud layer to VMC below'
        ],
        response: 'Spatial disorientation begins within about 20 seconds in IMC without visual references. Once the vestibular system adapts to a bank, it stops detecting the turn — the pilot feels level while spiraling. The 180° turn must be executed on instruments immediately, before this false sensation establishes itself. After disorientation sets in, recovery requires the same disciplined instrument response — but now against sensory inputs actively telling the pilot the instruments are wrong.'
      },
      {
        q: 'Why does pulling back on the controls make the graveyard spiral worse rather than better?',
        opts: [
          'Pulling back reduces airspeed, which reduces the energy available to exit the spiral',
          'In a bank, pulling back tightens the turn radius and increases G-load — speeding up the descent and tightening the spiral instead of recovering from it',
          'Aircraft controls reverse their normal function in a spiral dive',
          'Full elevator deflection is required to break out, not a partial pull'
        ],
        response: 'In straight-and-level flight, pulling back raises the nose. In a bank, pulling back pulls the aircraft around the arc of the turn — tightening the spiral, increasing G-load, and steepening the descent. The pilot\'s instinct to stop the descent by pulling makes the spiral faster and tighter. The only correct recovery is to level the wings first using the attitude indicator — only then does pulling back raise the nose. Instinct and correct technique point in opposite directions.'
      }
    ],
    quiz:[
      {id:'qcs11_1',question:'A VFR pilot inadvertently enters IMC. Statistically, how long does the average untrained pilot maintain control of the aircraft?',options:['15-20 minutes — sufficient time to climb above the clouds','Approximately 90-180 seconds before spatial disorientation produces loss of control','5-10 minutes if the pilot maintains straight-and-level flight','Indefinitely if the aircraft is on autopilot'],correct:1,explanation:'The FAA and AOPA research documents that untrained pilots typically lose control within 90-180 seconds of entering IMC. The vestibular system cannot detect a gradual roll. Without visual reference, the pilot feels level while in a bank. As the aircraft accelerates in the spiral, increased G-force feels like level flight at high speed — confirming the false sensation of being upright. Pulling back tightens the spiral. This sequence is predictable, fast, and nearly impossible to reverse once fully developed.'},
      {id:'qcs11_2',question:'The correct IMMEDIATE action for a VFR pilot who inadvertently enters IMC is:',options:['Climb above the clouds using visual attitude reference','Maintain current heading and altitude and contact ATC for vectors','Establish wings-level attitude using the attitude indicator, maintain altitude with pitch, and execute a standard-rate 180° turn to exit the cloud — do this within the first 10-15 seconds','Descend through the cloud to VMC conditions below'],correct:2,explanation:'The standard procedure for inadvertent IMC entry: (1) immediately transition to instrument scan — DO NOT rely on feel; (2) level the wings using the attitude indicator; (3) maintain altitude with pitch; (4) execute a standard-rate 180° turn to exit the way you came; (5) do this IMMEDIATELY — within the first 10-15 seconds before spatial disorientation develops. Every second of delay reduces the chance of a successful recovery. This procedure must be practiced and memorized before it is needed.'},
      {id:'qcs11_3',question:'The "graveyard spiral" occurs because:',options:['The aircraft enters a dive due to reduced engine power in IMC','The pilot, feeling level due to vestibular adaptation, pulls back in an increasing bank — which tightens the spiral rather than recovering from it','Gyroscopic instruments fail in IMC conditions','The aircraft\'s center of gravity shifts in IMC'],correct:1,explanation:'The graveyard spiral sequence: aircraft banks (pilot doesn\'t feel it after 20 seconds). Nose drops as lift vector tilts. Airspeed increases. Increased G-force feels like level flight. Pilot pulls back to arrest the descent — but in the bank, pulling back increases the turn radius and G-load, tightening the spiral. Descent rate increases. Eventually exceeds aircraft design limits or terrain is contacted. The ONLY recovery is to level the wings FIRST using instruments, then apply back pressure. Level wings + pull back = recovery. Banked + pull back = tighter spiral.'}
    ]
  },
  {
    id:'cs12',
    caseType: 'verified',
    verified: true,
    title:'The Ice Boots Weren\'t Enough',
    subtitle:'SLD icing overwhelms de-icing system, stall on approach',
    category:'Structural Icing',
    hazard:'Supercooled Large Droplets (SLD)',
    severity:'fatal',
    faaRef:'Ch. 20',
    icon:'🌧️',
    color:'#0284C7',
    aircraft:'Turboprop commuter (pattern applicable to all aircraft)',
    pilot:'Captain and first officer, 4,800 and 1,400 hours',
    date:'October evening, Great Lakes region',
    ntsbAccidentNumber:'DCA95MA001',
    ntsbSourceType:'final_report',
    ntsbTitle:'In-flight Icing Encounter and Loss of Control, American Eagle Flight 4184 ATR 72-212, N401AM',
    ntsbUrl:'https://www.ntsb.gov/investigations/Pages/DCA95MA001.aspx',
    brief:`
      <p>This case is based on the well-documented 1994 Roselawn, Indiana accident involving a commuter turboprop. The aircraft was in a holding pattern at 10,000 ft in freezing drizzle conditions. The crew was using the pneumatic de-icing boots per procedure. Unknown to the crew, the aircraft was in an SLD (Supercooled Large Droplet) environment where freezing drizzle droplets exceeded the design limits of the de-icing system.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">SLD ICING CONDITIONS</div>
        <div style="color:#38BDF8">Temperature: -4°C at altitude</div>
        <div style="color:#38BDF8">Precipitation: freezing drizzle (SLD)</div>
        <div style="color:#EF4444">SLD droplets: 100-400 microns (vs design max ~40 microns)</div>
        <div style="color:#EF4444">Ice accumulated: BEHIND the protected zone of the de-ice boots</div>
        <div style="color:#F59E0B">Autopilot masked roll oscillations as ice accumulated on ailerons</div>
      </div>
    `,
    narrative:`
      <p>While holding, ice accumulated beyond the de-icing boot coverage area, forming ridges on the unprotected surfaces behind the boots. The crew was unaware because (1) the aircraft was on autopilot which masked the increasing control difficulty, and (2) the boots appeared to be working normally in the protected zone.</p>
      <p>When the crew disengaged the autopilot to begin the approach, the aircraft suddenly rolled rapidly to one side. The crew was unable to recover. The aileron hinge area had accumulated ice that severely reduced roll control authority.</p>
      <p>The NTSB investigation led to a landmark ruling: the ATR-42 was prohibited from flying in SLD conditions. The investigation revealed that SLD environments were far more common than understood, and that pneumatic boot de-icing systems were not effective against SLD because droplets ran back behind the boots before freezing.</p>
    `,
    probableCause:`Encounter with SLD icing conditions that exceeded the certificated capabilities of the aircraft's de-icing system. Ice accumulated on unprotected surfaces behind the de-icing boots, severely degrading roll control authority.`,
    lessons:[
      'De-icing systems are certified for specific icing conditions. SLD environments (freezing drizzle, freezing rain) may exceed the certification envelope of even ice-certificated aircraft.',
      'Pneumatic boot de-icing systems are most effective against small supercooled droplets. Large droplets (SLD) run back behind the boots before freezing, depositing ice on unprotected areas the boots cannot reach.',
      'Autopilot can mask developing control problems — an aircraft on autopilot with accumulating ice may "feel" normal until the autopilot can no longer compensate, then suddenly be uncontrollable.',
      'PIREPs of SLD conditions (freezing drizzle, freezing rain) must be taken extremely seriously by ALL aircraft — including ice-certificated aircraft. Exit the icing environment immediately when SLD is encountered.',
      'For GA pilots: if you encounter freezing drizzle or freezing rain, immediate exit from the icing environment is the ONLY safe response — there is no protective system on a GA aircraft that can handle SLD.'
    ],
    discoveryQuestions: [
      {
        q: 'The crew was using the de-icing boots properly and they appeared to be working. What was happening that the boots couldn\'t address?',
        opts: [
          'The boots were cycling too frequently, creating ice bridges on the leading edge',
          'Cold temperatures had reduced boot inflation pressure below effective levels',
          'SLD droplets ran back beyond the boots\' coverage zone and froze on unprotected surfaces behind them — depositing ice ridges where the boots couldn\'t reach',
          'The boots had mechanically failed but showed no warning indication on the panel'
        ],
        response: 'The boots protect a specific zone — the leading edge and a few inches behind it. SLD droplets have enough mass to run back several inches along the wing surface before freezing, depositing ice ridges just behind the protected zone. The crew saw the boots working correctly in the zone they covered. They had no indication of ice building on the unprotected surfaces behind them — and the autopilot masked the growing control difficulty until the approach.'
      },
      {
        q: 'The autopilot was engaged throughout the icing encounter. Why was this a critical factor in how the accident developed?',
        opts: [
          'Autopilots are not certificated for icing conditions and should have been disengaged',
          'The autopilot continuously adjusted control surfaces to compensate for accumulating ice — masking all feedback to the crew. When they disengaged it for the approach, they inherited a severely compromised aircraft with no gradual warning',
          'The autopilot should have triggered an ice accumulation alert that it failed to generate',
          'Autopilots automatically disconnect in severe turbulence, which removed the masking effect suddenly'
        ],
        response: 'The autopilot continuously worked to maintain heading and altitude as ice built on the ailerons and unprotected wing surfaces. It used increasing aileron deflection to counter degrading roll response — invisibly. The crew felt nothing unusual because the autopilot was absorbing all the difficulty. When they disengaged it for the approach, they immediately inherited a severely compromised aircraft with extreme roll tendencies and no gradual buildup of awareness.'
      }
    ],
    quiz:[
      {id:'qcs12_1',question:'Supercooled Large Drops (SLD) are more dangerous than standard icing conditions because:',options:['SLD is colder and freezes faster than standard supercooled droplets','SLD droplets have enough momentum to run back behind de-icing boots and heat mats, depositing ice ridges on unprotected surfaces that cannot be removed by the de-icing system','SLD only affects jet aircraft','SLD only forms in certain geographic regions'],correct:1,explanation:'Standard supercooled water droplets (less than ~50 microns) tend to freeze close to the impact point — within the coverage zone of de-icing boots. SLD droplets (50-2000+ microns) have more mass and momentum, and run back along the wing surface before freezing. They deposit ice ridges at the back edge of the protected zone and on unprotected areas behind the boots. These ridges can severely alter wing aerodynamics and cannot be removed by the de-icing system that was already working.'},
      {id:'qcs12_2',question:'What is the primary indicator that you are in an SLD icing environment rather than standard icing?',options:['More rapid ice accumulation than normal','Presence of freezing drizzle or freezing rain rather than freezing cloud droplets — SLD originates from precipitation, not cloud. PIREPs specifically noting FZDZ or FZRA indicate SLD.','Lower temperature than normal icing conditions','SLD only occurs at night'],correct:1,explanation:'SLD environments are associated with freezing drizzle (FZDZ) and freezing rain (FZRA) — precipitation that has passed through a warm layer above and refrozen as large supercooled drops. Standard icing occurs in supercooled cloud droplets. When PIREPs report FZDZ or FZRA, or when your aircraft\'s pitot tube, propeller hub, or windshield wiper base accumulate ice faster than the wings (indicating large droplets hitting flat surfaces), suspect SLD and exit immediately.'},
      {id:'qcs12_3',question:'When the autopilot is engaged in icing conditions, a developing control problem may be masked because:',options:['The autopilot increases power to compensate for ice accumulation','The autopilot continuously adjusts control surfaces to maintain the desired flight path, potentially reaching control limits before the crew notices anything unusual'],correct:1,explanation:'An autopilot will continuously work to maintain heading and altitude as ice accumulates. It may use increasing aileron deflection to counteract asymmetric ice or degraded roll response — all invisibly to the crew. When the autopilot disconnects (manually or automatically because it cannot maintain the flight path), the crew suddenly inherits a severely degraded control situation with no warning buildup. In icing conditions, periodically disengage the autopilot and manually evaluate the aircraft\'s handling characteristics.'}
    ]
  },
  {
    id:'cs13',
    caseType: 'simulated',
    verified: false,
    title:'The Schedule Killed Him',
    subtitle:'Progressive go/no-go failures, "get-there-itis," known deteriorating conditions',
    category:'Decision Making',
    hazard:'Get-There-Itis / Pressure to Continue',
    severity:'fatal',
    faaRef:'Ch. 3',
    icon:'📅',
    color:'#EF4444',
    aircraft:'Piper Cherokee PA-28-180',
    pilot:'Private pilot, 387 hours, no instrument rating',
    date:'Friday evening, southeastern US',
    brief:`
      <p>A pilot planned a Friday evening flight to attend a family event. Weather at the destination had been deteriorating all afternoon — TAF showed TEMPO conditions with 3SM and 1,000 ft ceiling. AIRMET Sierra was active. Three separate weather checks throughout the day had all shown marginal conditions for VFR.</p>
      <p>Passengers, hotel reservations, and a significant family commitment were awaiting. The pilot departed 1 hour before the destination's weather reached IFR conditions.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">DECISION TIMELINE</div>
        <div style="color:#38BDF8">0900L: Weather check — AIRMET Sierra. VFR marginal.</div>
        <div style="color:#38BDF8">1300L: Weather check — conditions unchanged. Pilot "decided to try."</div>
        <div style="color:#F59E0B">1700L: Weather check — ceilings at 1,200 ft and falling. Pilot departed.</div>
        <div style="color:#EF4444">1830L: Destination: OVC006, 1SM, fog. Aircraft missing.</div>
        <div style="color:#EF4444">Found: terrain impact 14 miles from destination, night, low ceiling</div>
      </div>
    `,
    narrative:`
      <p>The pilot departed with the destination weather already below comfortable VFR minimums and forecast to deteriorate further. En route, the ceiling lowered. The pilot descended to maintain visual contact with the ground, flying at approximately 500 ft AGL in the dark, 14 miles from the destination.</p>
      <p>The aircraft struck a radio tower. No terrain alerts, no ATC contact, no flight following.</p>
      <p>Post-accident review of the pilot's cellphone showed 14 texts to family members during the flight, indicating awareness of the weather but persistent optimism. The last text, sent approximately 20 minutes before impact: "Almost there, a little foggy but should be fine."</p>
    `,
    probableCause:`The pilot's decision to depart and continue VFR flight into IMC conditions for which neither the pilot nor the aircraft were equipped or certified. Contributing factors: schedule pressure, personal commitment, and progressive normalization of increasingly marginal conditions.`,
    lessons:[
      'The accident chain in "get-there-itis" cases is almost always the same: early recognition that conditions are marginal → rationalization → departure → progressive deterioration → fatal commitment → impact.',
      '"Almost there" is statistically the most dangerous phrase in aviation. The destination\'s proximity creates irresistible pressure to continue past the point where a rational evaluation would say stop.',
      'Each weather check that showed marginal conditions was a decision point. The pilot had three opportunities to say "not today" before the fatal departure. The decision to continue was made four times.',
      'Flying under lowering ceilings at night — descending to 500 ft AGL to maintain visual contact — means obstructions (towers, wires, terrain) exist that are completely invisible. ATC can see your radar return but cannot see the tower.',
      'The family event, hotel reservation, and personal embarrassment of canceling are not factors in accident causation — they are factors in go/no-go decision contamination. None of them matter after the accident.'
    ],
    discoveryQuestions: [
      {
        q: 'The pilot had three separate weather checks — all showing the same marginal-to-IFR picture. At which check should the flight have been cancelled?',
        opts: [
          'The third check at 1700L — only when conditions were actually IFR at the destination',
          'The first check at 0900L — any AIRMET Sierra is an automatic cancellation for VFR flight',
          'The second check at 1300L — when a trend of 4+ hours of consistent marginal weather with no improvement shows no sign of changing, there is no rational basis to expect improvement before ETA',
          'Weather cancellation decisions should only be made at the aircraft, not on the ground hours before departure'
        ],
        response: 'Three consecutive checks showing the same marginal-to-deteriorating picture is a trend, not bad luck. Weather that has been consistently marginal for 4 hours with an active AIRMET and no improvement trend is not going to spontaneously clear on a pilot\'s schedule. By the second check, the pattern was established. Each subsequent check that didn\'t produce a cancellation made the next cancellation psychologically harder — progressive commitment at its most recognizable.'
      },
      {
        q: 'The pilot texted "almost there, a little foggy but should be fine" approximately 20 minutes before impact. What does this tell us about how get-there-itis distorts situational assessment?',
        opts: [
          'The pilot was being deceptive to avoid worrying family members',
          'Night conditions made it genuinely impossible to assess fog density accurately from the cockpit',
          'Proximity to the destination creates optimism that overrides objective weather assessment — "almost there" makes hazardous conditions feel more manageable than they are',
          'The pilot had radio problems and was relying on visual assessment rather than current weather data'
        ],
        response: '"Almost there" is the most dangerous phrase in weather decision-making. The closer you are to the destination, the more the goal displaces objective assessment of conditions. At 500 ft AGL at night in fog, 14 miles from an airport, conditions were not fine — but the destination was close, the family was waiting, and optimism was stronger than assessment. This is the core mechanism of get-there-itis: the destination stops being a place and becomes a pressure that reshapes everything the pilot perceives.'
      }
    ],
    quiz:[
      {id:'qcs13_1',question:'"Get-there-itis" is characterized in NTSB accident reports primarily as:',options:['A failure of weather forecasting that leaves pilots with inadequate information','A pattern of progressive go/no-go rationalization where schedule, personal commitment, or destination pressure overrides objective weather assessment at each successive decision point','A specific meteorological phenomenon that creates false VFR conditions','A regulatory failure to provide adequate VFR minimums'],correct:1,explanation:'Get-there-itis is a psychological pattern, not a weather phenomenon. NTSB reports consistently find that accident pilots had multiple decision points where objective conditions warranted stopping — but each time, rationalization ("it\'s only a little farther," "the forecast says it should be clearing," "other pilots made it") allowed continuation. The psychological trap is progressive commitment: each decision to continue makes the next decision to stop harder to make.'},
      {id:'qcs13_2',question:'A pilot on the ground observes that destination weather has been at MVFR or IFR all afternoon, with three successive weather checks showing no improvement. The correct pre-departure decision is:',options:['Depart and assess conditions en route — ground conditions don\'t always reflect in-flight conditions','Do not depart. Conditions that have been consistently marginal or IFR for hours with no improvement trend are unlikely to improve spontaneously before or during your flight. Delay or cancel.'],correct:1,explanation:'A consistent pattern of marginal or IFR conditions at the destination with no improvement trend is a reliable forecast of what you will encounter. Weather systems don\'t spontaneously improve on your schedule. The pilot in this case had data showing three consecutive weather checks all pointing to the same conclusion — conditions were deteriorating, not improving. Three data points is a trend. Departing into a known deteriorating trend requires either IFR certification and equipment or a decision to not depart.'},
      {id:'qcs13_3',question:'A VFR pilot en route discovers the destination ceiling has dropped to 400 ft and 1 SM visibility. The nearest alternate is 25 miles away with 1,500 ft and 5 SM. The correct action is:',options:['Continue to the destination — 25 extra miles of fuel burn is significant','Divert to the alternate immediately. The destination is IFR; attempting to land there VFR at night with 400 ft ceiling and 1 SM is not a survivable option. The alternate is clear and reachable.'],correct:1,explanation:'An IFR destination for a VFR pilot means the flight is over. The only question is which runway you land on. Diverting to a clear alternate is not a failure — it is the correct execution of a complete flight. The extra 25 miles represents approximately 15 minutes of flying time and a modest fuel burn. Every NTSB accident report involving a VFR pilot who pressed on to an IFR destination reinforces the same lesson: the destination is not special. Land where you can.'}
    ]
  },
  {
    id:'cs14',
    caseType: 'simulated',
    verified: false,
    title:'The Night the Radar Lied',
    subtitle:'IFR night flight, no airborne radar, embedded CB penetration',
    category:'Thunderstorm',
    hazard:'Embedded Thunderstorms at Night',
    severity:'fatal',
    faaRef:'Ch. 22',
    icon:'🌩️',
    color:'#7C3AED',
    aircraft:'Cessna 310 (twin engine)',
    pilot:'Private pilot, instrument rated, 1,100 hours',
    date:'Summer night, southeast US',
    brief:`
      <p>An IFR pilot planned a night cross-country. A Convective SIGMET was active for an area 50 miles south of the route. The pilot's aircraft had no weather radar and no stormscope. The pilot had a tablet with datalink NEXRAD showing the convective area to the south and a seemingly clear route ahead.</p>
      <p>En route at FL110, the pilot requested no deviations from ATC, indicating confidence in the route based on the datalink display.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">CONVECTIVE ENVIRONMENT</div>
        <div style="color:#38BDF8">Convective SIGMET: 50 miles south, severe TS</div>
        <div style="color:#F59E0B">Embedded CBs: documented in PIREP north of the SIGMET area</div>
        <div style="color:#EF4444">Datalink NEXRAD: 8 minutes old — did not show developing CBs</div>
        <div style="color:#EF4444">Night: no visual detection possible of embedded CBs in IMC</div>
        <div style="color:#94A3B8">Aircraft: no weather radar, no stormscope</div>
      </div>
    `,
    narrative:`
      <p>Approximately 45 minutes into the flight, ATC noted the aircraft's radar return show rapid altitude fluctuations, then loss of the primary target. The aircraft had entered an area that later NEXRAD data showed to contain an embedded severe thunderstorm cell that was developing rapidly at the time of the flight.</p>
      <p>The aircraft wreckage showed evidence of severe in-flight structural overload — likely from extreme turbulence within the CB. Hail damage was also documented. The pilot had no way to detect the embedded CB at night in IMC with no onboard weather detection equipment.</p>
    `,
    probableCause:`Inadvertent penetration of a severe embedded thunderstorm during night IFR flight. Contributing: the pilot's reliance on datalink NEXRAD imagery for in-close convective avoidance, absence of airborne weather detection equipment, and inability to visually detect embedded CBs at night in IMC.`,
    lessons:[
      'Embedded thunderstorms are CBs hidden inside other cloud layers — completely invisible at night or in IMC unless you have airborne weather radar or a stormscope.',
      'A Convective SIGMET 50 miles south of your route in an active convective environment is NOT "clear ahead" — it is a warning that convection is active and can develop rapidly anywhere in the region.',
      'Datalink NEXRAD with 8-minute latency does not show developing convection. A CB can grow from a moderate cell to a severe threat in less than 8 minutes.',
      'Night IFR flight near convective weather without airborne weather detection (radar, stormscope) is operating without awareness. You are navigating blind through a minefield.',
      'Conservative operational practice for night IFR in a convective environment: certified airborne weather radar OR significant route deviation to stay well clear of any convective activity. This reflects the approach of experienced instrument pilots — not a regulatory minimum.'
    ],
    discoveryQuestions: [
      {
        q: 'The Convective SIGMET was 50 miles south. The datalink showed clear ahead. What critical information could neither source provide?',
        opts: [
          'Wind direction and speed at the planned cruise altitude',
          'Real-time detection of embedded CBs developing along the route right now — both sources only showed what had already happened, not what was developing in the moment',
          'Altitude of the documented storm tops in the SIGMET area',
          'Turbulence intensity inside the active convective area to the south'
        ],
        response: 'A Convective SIGMET describes active convection at the time of issuance. Datalink NEXRAD shows precipitation 5-15 minutes in the past. Neither source can detect a CB that is developing right now along your route. Active convective environments generate new cells continuously — a clear datalink image and a SIGMET boundary 50 miles away do not certify your route as free of developing embedded cells. That gap is exactly what airborne weather radar fills: real-time, close-range detection.'
      },
      {
        q: 'Why is night IFR in a convective environment categorically more dangerous than the same weather in daytime VMC?',
        opts: [
          'Night turbulence from convection is statistically more severe than daytime turbulence',
          'ATC radar coverage is reduced during nighttime operations',
          'In daytime VMC, pilots can see CBs and towering cumulus visually. At night in IMC, every cloud looks identical — including a severe thunderstorm. Without onboard weather detection, there is no warning before you are inside it',
          'Night IFR operations legally require higher weather minimums near convection'
        ],
        response: 'In daytime or VMC conditions, pilots can see developing CBs visually and route around them. At night in IMC, there is no visual information — every cloud looks the same. An embedded CB is indistinguishable from a benign stratiform cloud without airborne weather radar or a lightning detector. The accident pilot was navigating what appeared to be routine IMC; one of those clouds was a severe thunderstorm. The darkness removed the only early warning available to an unequipped aircraft.'
      }
    ],
    quiz:[
      {id:'qcs14_1',question:'Embedded thunderstorms are particularly dangerous during night IFR because:',options:['They produce more lightning than visible thunderstorms','They cannot be detected without airborne weather radar or lightning detection — they are invisible inside other cloud layers and at night. A pilot flying toward an embedded CB has no warning.','Night air is more turbulent than day air near CBs','Embedded CBs are less intense than visible CBs'],correct:1,explanation:'An embedded CB is surrounded by other cloud layers, making it invisible visually from any direction. At night in IMC, there is zero visual information about developing convection. Without airborne weather radar (showing reflectivity) or a lightning detector/stormscope (showing electrical activity), the pilot has no awareness of the embedded CB until entering it. By then, the extreme turbulence and hail can be immediately fatal.'},
      {id:'qcs14_2',question:'A Convective SIGMET is active 50 miles south of your planned IFR route. This means:',options:['Your route is clear — the Convective SIGMET area is well separated from your path','Active convective weather exists in the region and developing cells may not be limited to the SIGMET area. Adjacent or developing embedded cells along your route cannot be ruled out without airborne weather detection.'],correct:1,explanation:'Convective SIGMETs describe active convection at the time of issuance. They do not prevent convection from developing outside their boundaries during their valid period (up to 2 hours). A Convective SIGMET 50 miles from your route in an active convective environment means convective development is ongoing in the region — not that your specific route is certified clear. In an active convective environment, route deviation away from the entire affected area is the safest option.'},
      {id:'qcs14_3',question:'The minimum equipment standard for operating IFR at night in areas with potential embedded convection is:',options:['Standard IFR equipment — no additional weather avoidance equipment is required','Functioning airborne weather radar OR a stormscope/lightning detector, plus ATC traffic advisories and PIREPs from other aircraft in the area','VHF radio only — the pilot can request weather deviation from ATC based on radar contacts','A certified instrument rating is sufficient for any IFR conditions'],correct:1,explanation:'Standard IFR equipment includes navigation, communication, and basic flight instruments — it does not include weather detection. For night IFR in potential embedded convective environments, airborne weather radar provides real-time precipitation imagery; stormscopes/lightning detectors display electrical activity from CBs. Without these, the pilot is operating without awareness in a potentially fatal environment. This is why many experienced IFR pilots decline night flights near convective activity in aircraft not equipped with weather detection.'}
    ]
  },
  {
    id:'cs15',
    caseType: 'simulated',
    verified: false,
    title:'Trapped on Top',
    subtitle:'VFR departure on top, destination socks in, no instrument rating',
    category:'VFR into IMC',
    hazard:'VFR-on-Top / Undercast',
    severity:'fatal',
    faaRef:'Ch. 3, 18',
    icon:'☁️',
    color:'#64748B',
    aircraft:'Piper Cherokee PA-28-140',
    pilot:'Private pilot, 210 hours, no instrument rating',
    date:'Winter morning, southeast US',
    brief:`
      <p>A private pilot planned a cross-country flight. At departure, his airport had a 1,000-foot broken layer below 3,500 ft where skies were clear. The pilot climbed through a hole in the clouds and flew VFR on top at 4,500 ft — technically legal if VFR cloud clearance is maintained above. The destination was initially reporting 1,500 ft broken.</p>
      <p>The TAF for the destination showed BECMG 1315/1318 OVC008 — conditions becoming overcast at 800 ft between 1:00 and 6:00 PM. The flight would take approximately 2 hours.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">WEATHER EVOLUTION</div>
        <div style="color:#38BDF8">Departure: BKN010, clear above — departed VFR on top</div>
        <div style="color:#F59E0B">En route: layer thickening, holes closing</div>
        <div style="color:#EF4444">Destination at ETA: OVC005 — solid overcast, no descent possible VFR</div>
        <div style="color:#EF4444">Departure airport (return): OVC003 — also closed</div>
        <div style="color:#94A3B8">Nearest alternate (clear): 65 miles away, unknown to pilot</div>
      </div>
    `,
    narrative:`
      <p>The pilot contacted destination ASOS en route and heard the deteriorating ceiling. The pilot attempted to descend through the overcast but could not find a hole. The pilot then turned back toward the departure airport, found it also closed. The pilot contacted ATC in distress — no instrument rating, no descent option, fuel becoming critical.</p>
      <p>ATC attempted to provide vectors to an airport with a clear area 65 miles away. The aircraft ran out of fuel before reaching it. The pilot executed a forced landing in a field.</p>
      <p>The pilot survived with serious injuries. Three passengers were hospitalized. The aircraft was destroyed.</p>
    `,
    probableCause:`The pilot's decision to depart VFR on top without confirmed instrument approaches or alternate airports available for descent, combined with the forecast deterioration of destination weather which was explicitly shown in the pre-flight TAF.`,
    lessons:[
      'VFR on top is a legal but dangerous configuration for a non-instrument-rated pilot: you can get there but you may not be able to get back down.',
      'Before departing VFR on top, you must have: (1) confirmed descent capability at destination, (2) a confirmed alternate, and (3) a return option — all independently verified for your ETA.',
      'The TAF said OVC008 by 1800 UTC (in the BECMG). The pilot had this information before departure. A BECMG to 800-ft OVC is a significant forecast change that should have triggered either a delay, an IFR flight plan, or a route change.',
      '"The hole is there now" does not mean the hole will be there when you need to descend. VFR-on-top over a deepening overcast is a one-way trap.',
      'Every VFR pilot should know the phone number for Flight Service (1-800-WX-BRIEF) and be willing to declare an emergency for ATC assistance when options are running out.'
    ],
    discoveryQuestions: [
      {
        q: 'The destination TAF showed BECMG 1315/1318 OVC008 and the pilot\'s ETA fell within that window. What was the correct pre-departure decision?',
        opts: [
          'Depart anyway — BECMG forecasts often verify late, and conditions might stay above minimums',
          'File IFR — the forecast was the pilot\'s problem to solve with a rating, not a reason to cancel',
          'Verify that a confirmed alternate airport with VFR conditions was within fuel range for ETA, or delay departure until the destination\'s trend clarified',
          'Ask ATC for special VFR clearance at the destination as a contingency'
        ],
        response: 'BECMG means the conditions will change during that window — and the ETA fell inside it. A non-instrument pilot has no way to safely descend through 800-ft OVC. The correct pre-departure action: identify an alternate airport with confirmed VFR conditions within fuel range for ETA, or delay until the destination showed clear conditions. The TAF contained the complete answer. The information was available before engine start.'
      },
      {
        q: 'Trapped on top with a solid overcast below and fuel becoming critical — what actions were available, and why does the timing of declaring an emergency matter?',
        opts: [
          'Spiral down through the overcast at minimum airspeed to minimize the risk of overspeeding in the descent',
          'Continue toward the original destination hoping the TAF forecast didn\'t verify',
          'Declare emergency immediately, squawk 7700, and contact ATC for vectors to the nearest airport with VFR conditions or an instrument approach — while fuel time still allows reaching it',
          'Search for holes in the overcast before declaring emergency — ATC should be a last resort'
        ],
        response: 'Trapped on top with deteriorating fuel is an emergency before the engine stops. Every minute spent searching for holes is a minute of range lost toward the one airport with clear conditions 65 miles away. The correct response is to declare early — while options still exist. Squawk 7700, contact ATC, state the situation clearly: VFR pilot, above overcast, unable to descend, need vectors. ATC cannot create fuel from nothing. Use the time you have while you still have it.'
      }
    ],
    quiz:[
      {id:'qcs15_1',question:'A VFR pilot considering VFR-on-top must verify which conditions BEFORE departure?',options:['Only that current weather allows departure above the cloud layer','Confirmed VFR descent capability at the destination AND alternate for the planned ETA, plus a confirmed return option — not just current conditions at departure'],correct:1,explanation:'VFR on top places the aircraft above a cloud layer with no visual descent path. Before departure, a non-instrument-rated pilot must verify: (1) the destination will allow a VFR descent at ETA (not just currently); (2) an alternate airport with VFR conditions will be available within fuel range; (3) a return to the departure airport is possible if needed. If any of these cannot be confirmed for the planned ETA, VFR-on-top is a trap. Check TAFs — not just METARs.'},
      {id:'qcs15_2',question:'A non-instrument-rated pilot trapped on top of a solid overcast with deteriorating weather at all known airports should:',options:['Continue searching for a hole in the clouds — one will appear eventually','Immediately contact ATC (on 121.5 if necessary), declare emergency, and request vectors to the nearest airport with VFR conditions or an IFR approach. Use all remaining fuel time wisely — don\'t waste time looking for holes that may not exist.'],correct:1,explanation:'A VFR pilot trapped above an undercast is in an emergency situation, even if the aircraft is currently operating normally. The correct immediate actions: (1) squawk 7700 (emergency); (2) contact ATC on 121.5 or known center frequency; (3) state situation clearly — "non-instrument-rated pilot above overcast, unable to descend, need assistance"; (4) accept ATC vectors to the nearest VFR conditions or airport with an instrument approach; (5) do not delay — every minute of searching burns fuel that could have been used reaching the alternate.'},
      {id:'qcs15_3',question:'A TAF shows "BECMG 1315/1318 OVC008" for your destination. Your ETA is 1330Z. This means:',options:['Conditions will be 800-ft OVC by exactly 1315Z — you will arrive just in time','Conditions are becoming OVC at 800 ft sometime between 1315 and 1318Z. At your 1330Z ETA, conditions will be OVC008 — below safe VFR minimums for an unfamiliar airport. Plan accordingly.'],correct:1,explanation:'BECMG 1315/1318 OVC008 means the ceiling will become 800 ft overcast sometime within that 3-hour window. Your 1330Z ETA falls right in the middle of this transition — you may arrive to find conditions at or below IFR minimums. At 800 ft OVC, VFR entry into the traffic pattern at an unfamiliar airport is at or below safe operating limits. The correct pre-flight decision: either have an IFR alternate, depart later, or accept that the flight may need to divert.'}
    ]
  },
  {
    id:'cs16',
    caseType: 'verified',
    verified: true,
    title:'The Storm at the End of the Runway',
    subtitle:'Microburst-induced wind shear during takeoff, New Orleans 1982',
    category:'Microburst on Takeoff',
    hazard:'Microburst on Takeoff',
    severity:'fatal',
    faaRef:'Ch. 22',
    icon:'⛈️',
    color:'#DC2626',
    aircraft:'Boeing 727-235 (N4737)',
    pilot:'Captain (11,727 hrs total, 10,595 in 727), First Officer (6,127 hrs total, 3,914 in 727), Flight Engineer (19,904 hrs total, 10,508 in 727) — all senior, current, 727-experienced',
    date:'July 9, 1982, 1607 CDT, New Orleans International Airport (MSY)',
    ntsbAccidentNumber:'NTSB-AAR-83/02',
    ntsbSourceType:'final_report',
    ntsbTitle:'Pan American World Airways, Clipper 759, Boeing 727-235, N4737, New Orleans International Airport, Kenner, Louisiana, July 9, 1982',
    ntsbUrl:'https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR8302.pdf',
    brief:`
      <p>Pan American Flight 759 was a scheduled multi-leg flight Miami–New Orleans–Las Vegas–San Diego. The crew taxied for departure on Runway 10 at MSY in the late afternoon. Thunderstorms were active east and east-northeast of the departure end. Tower-reported winds at takeoff clearance were "gusty and swirling."</p>
      <p>The Low-Level Wind Shear Alert System (LLWAS) at MSY was a 1980s-generation perimeter-anemometer system that detected surface gradients between sensors. It had no capability to detect an airborne microburst column descending over the departure path. No microburst alert was issued, because no system on the field could issue one.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">DEPARTURE CONDITIONS — MSY RUNWAY 10</div>
        <div style="color:#38BDF8">Surface winds: gusty, swirling, variable direction</div>
        <div style="color:#F59E0B">Thunderstorms: east and east-northeast of departure end</div>
        <div style="color:#EF4444">Microburst: developing over departure path, undetected</div>
        <div style="color:#94A3B8">LLWAS: 1980s perimeter anemometer system — surface only</div>
        <div style="color:#94A3B8">Forecast: scattered to broken at 3,000 ft, moderate rain in cells</div>
      </div>
    `,
    narrative:`
      <p>Flight 759 lifted off Runway 10 at 16:07:57 CDT. The aircraft climbed to between 95 and 150 feet AGL — and then began to descend. The crew applied recovery inputs but the descent continued.</p>
      <p>Approximately 2,376 feet beyond the end of the runway, the 727 struck a row of trees while still in a near-level pitch attitude at about 50 feet AGL. The aircraft continued forward another 2,234 feet, breaking up as it impacted trees and houses in the suburb of Kenner.</p>
      <p>All 145 occupants were killed. Eight people on the ground were also killed. The total of 153 fatalities made the accident the second-deadliest in U.S. aviation history at the time.</p>
      <p>The NTSB investigation concluded that the aircraft had encountered a microburst on the departure path — a downdraft column with a strong divergent outflow that produced a rapid headwind-to-tailwind transition during the climb. The crew's training and the era's wind shear detection technology were inadequate for the scenario. The accident drove the FAA's subsequent push for Terminal Doppler Weather Radar (TDWR) at major airports, the standardization of the windshear escape maneuver, and the deployment of onboard predictive wind shear systems on transport aircraft.</p>
    `,
    probableCause:`The aircraft's encounter with a microburst-induced wind shear which imposed a downdraft and decreasing headwind shear of such magnitude during liftoff that the pilots could not recognize and react to it in time to prevent impact with trees beyond the departure end of the runway. Contributing to the accident was the limited capability of then-current wind shear detection technology to provide the crew with timely warnings of the encounter.`,
    lessons:[
      'On takeoff, the microburst pattern is the mirror of the approach pattern: a brief headwind boost during initial climb, followed by a fatal headwind-to-tailwind transition. Recognizing the boost as a warning — rather than enjoying it as a tailwind — is the key.',
      'Visible thunderstorms over or near the departure path are an unconditional reason to delay takeoff, even with no specific wind shear advisory issued. The absence of an alert does not mean the absence of shear.',
      '1980s-era LLWAS perimeter systems detected surface wind gradients, not airborne microbursts. Modern Terminal Doppler Weather Radar (TDWR) and onboard predictive wind shear systems were direct policy responses to this class of accident.',
      'Crew experience does not protect against an unrecognized microburst. The Pan Am 759 crew had over 37,000 combined flight hours — the threat was not a skill gap, it was a detection-and-recognition gap that 1982 technology could not close.',
      'If you see CB or TS within 2-3 miles of the departure or arrival path, treat it as an active hazard. Wait. The economic cost of a delay is trivial compared to the survivability of a microburst penetration.'
    ],
    discoveryQuestions: [
      {
        q: 'The crew received "gusty and swirling" surface winds at takeoff clearance. Why was that report insufficient warning of the microburst hazard?',
        opts: [
          'Surface wind reports always understate the severity of conditions aloft',
          'A microburst is a vertical-axis phenomenon descending from aloft — its existence and intensity cannot be inferred from surface anemometer readings, which is what 1980s LLWAS measured',
          'The tower controller failed to relay an LLWAS alert that was active at the time',
          'The crew should have requested a different runway because of the wind report'
        ],
        response: 'The 1980s LLWAS detected horizontal wind gradients between perimeter sensors. A microburst column forms aloft and slams downward — by the time the outflow reaches the surface and crosses two perimeter sensors, an aircraft on the takeoff roll is already committed. The "gusty and swirling" report told the crew the air was disturbed; it did not and could not tell them a microburst was over the departure path. The visible TS to the east was the actual warning the crew needed to weight more heavily.'
      },
      {
        q: 'A 727 climbing through 100 ft AGL begins to lose altitude despite normal pitch attitude and full takeoff thrust. What is the only correct response?',
        opts: [
          'Reduce pitch to gain airspeed before climbing again',
          'Maintain full thrust, hold the pitch attitude that produces stick-shaker minus a small margin, and accept altitude deviation rather than chase airspeed — the goal is to clear obstacles, not maintain Vy',
          'Lower the nose to fly through the shear and re-establish normal climb on the other side',
          'Reduce thrust briefly to allow the aircraft to settle, then re-apply'
        ],
        response: 'The microburst escape maneuver as it has been refined since this accident: max thrust, pitch to stick-shaker minus a small margin, accept airspeed bleed and altitude deviation, do not pursue normal climb performance. The objective is clearing the windshear region with the aircraft still flying — not maintaining Vy. A 727 climbing through 100 ft with the throttles already at takeoff thrust has no remaining performance reserve except angle of attack. Lowering the nose into a tailwind-and-downdraft is fatal; it exchanges the only remaining margin (AOA) for an airspeed gain that the next moment of the encounter consumes anyway.'
      }
    ],
    quiz:[
      {id:'qcs16_1',question:'The microburst on takeoff vs. on approach has a key tactical difference. What is it?',options:['On takeoff, you have more energy reserve and the encounter is easier to survive','On takeoff, the aircraft is at maximum thrust with no remaining performance reserve except angle of attack — there is no power left to add when the tailwind hits','On takeoff, the autopilot can fly the escape maneuver more reliably than on approach','Microbursts on takeoff are weaker than on approach because of ground effect'],correct:1,explanation:'On approach, an aircraft typically has reduced power and configuration drag — adding power and going around recovers most encounters. On takeoff, the aircraft is already at takeoff thrust. When the tailwind/downdraft phase hits, there is no extra thrust to add. The only remaining margin is angle of attack — pitching to stick-shaker. This is why takeoff microburst encounters have historically had poorer survival rates than approach encounters.'},
      {id:'qcs16_2',question:'The Pan Am 759 crew had over 37,000 combined flight hours and was current and trained per the standards of the era. Why did the accident happen anyway?',options:['Crew fatigue from a multi-leg day reduced their reaction time','The detection and recognition gap — 1980s wind shear detection technology and crew training procedures were not capable of providing timely microburst warning','A maintenance issue with the 727 reduced its climb performance below specification','The runway was too short for the 727\'s takeoff weight that day'],correct:1,explanation:'This was a procedural and technological gap, not a skill gap. The crew did everything the era\'s training and equipment supported. The accident drove direct FAA action: terminal Doppler weather radar deployment at major airports, modern microburst-aware crew training, the windshear escape maneuver standardization, and onboard predictive wind shear systems on transport aircraft. Modern crews are protected by systems that did not exist in 1982.'},
      {id:'qcs16_3',question:'You are taxiing for departure. A thunderstorm cell is visible 2-3 miles east of the departure end, moving slowly. ATC has not issued any wind shear advisory. The correct action is:',options:['Continue with takeoff — no advisory means no detected hazard','Hold short. A visible CB within 2-3 miles of the departure or arrival path is an unconditional reason to delay regardless of advisory state','Request an immediate departure to beat the storm','Request a runway change to put the storm behind you'],correct:1,explanation:'A visible CB is direct visual evidence of a convective hazard. The absence of an advisory means current detection technology has not yet identified shear — not that no shear exists. Microburst lifecycles are minutes; a cell that looked benign 5 minutes ago may have a microburst column descending now. The conservative answer — hold for the cell to pass or move — has zero survival downside.'}
    ]
  },
  {
    id:'cs17',
    caseType: 'verified',
    verified: true,
    title:'The Gap That Closed',
    subtitle:'Beechcraft A36 IFR through line of thunderstorms, datalink NEXRAD lag',
    category:'Thunderstorm Penetration',
    hazard:'Datalink NEXRAD Latency',
    severity:'fatal',
    faaRef:'Ch. 14, 25',
    icon:'⛈️',
    color:'#7C3AED',
    aircraft:'Beechcraft A36 Bonanza (N976S)',
    pilot:'Instrument-rated private pilot, IR earned <2 years prior, ~32 hours actual instrument time',
    date:'May 31, 2012, ~1656 CDT, Macon, Mississippi',
    ntsbAccidentNumber:'ERA12FA376',
    ntsbSourceType:'carol',
    ntsbTitle:'Aviation Investigation Final Report — Beechcraft A36 Bonanza, N976S, Macon MS, 31 May 2012',
    ntsbUrl:'https://data.ntsb.gov/carol-main-public/basic-search/aviation?searchTerm=ERA12FA376',
    brief:`
      <p>The pilot was on an IFR flight plan flying a long cross-country leg in a single-engine Bonanza equipped with XM WX Satellite Weather (datalink NEXRAD Composite) and a stormscope. The route crossed a line of thunderstorms ahead. The pilot identified an apparent gap in the cockpit NEXRAD imagery and elected to fly through it.</p>
      <p>The pilot's logged actual-instrument time was approximately 32 hours. The instrument rating had been earned within the prior two years.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">WEATHER PRODUCTS ON BOARD</div>
        <div style="color:#38BDF8">XM WX Satellite Weather: NEXRAD Composite — datalink, age 6-7 minutes</div>
        <div style="color:#38BDF8">Stormscope/strikefinder: real-time lightning, low spatial detail</div>
        <div style="color:#94A3B8">No onboard radar (which would have given real-time precip detail)</div>
        <div style="color:#F59E0B">NEXRAD frame at 1650: aircraft position depicted clear of precip</div>
        <div style="color:#EF4444">Ground-based radar truth at 1656: aircraft inside ≥50 dBZ Level 5 cell</div>
        <div style="color:#EF4444">The "gap" had filled in during the latency window</div>
      </div>
    `,
    narrative:`
      <p>At 1650, the satellite-delivered NEXRAD composite image displayed in the cockpit showed the aircraft's position in clear air between cells — an apparent gap in the convective line. The pilot continued.</p>
      <p>Six minutes later, at 1656, ground-based NEXRAD recorded the aircraft inside a cell of 50 dBZ or greater reflectivity (Level 5 — extreme). The cockpit display, pulling from the same 1650 frame plus normal processing latency, still showed the aircraft clear of precipitation. The "gap" had filled in during the latency window.</p>
      <p>The aircraft broke up in flight. The wreckage path was consistent with structural failure inside the cell. The pilot was fatally injured.</p>
      <p>The NTSB cited the pilot's decision to attempt to fly between cells while relying on weather products that did not provide real-time information. The Board's discussion noted that XM-style datalink NEXRAD is fundamentally a strategic planning tool — the latency is intrinsic to how the product is generated and distributed (sweep aggregation, ground processing, satellite uplink). It is not suitable for tactical avoidance of cells in close proximity.</p>
    `,
    probableCause:`The pilot's decision to attempt to fly between thunderstorm cells while utilizing weather information that was not capable of providing real-time data. Contributing to the accident was the pilot's limited actual instrument experience and his reliance on a NEXRAD product that was 6-7 minutes old at the time of the encounter.`,
    lessons:[
      'Datalink NEXRAD (XM WX Satellite Weather, FIS-B, etc.) is a strategic tool — useful for route-level decisions hundreds of miles ahead. It is NOT a tactical tool for picking gaps in nearby convective lines. End-to-end latency is typically 5-15 minutes from radar sweep to cockpit display.',
      'A "gap" between cells on a datalink image may be a 5-10 minute old snapshot of a region that has since closed. Convective cells can develop from clear air to Level 5 reflectivity inside the latency window.',
      'Onboard real-time radar or visual avoidance with a wide margin is the only safe approach to convective penetration. Without onboard radar, the only safe path is a deviation around the entire line — measured in tens of miles, not within-line gap-picking.',
      'A stormscope/strikefinder provides real-time lightning data but with low spatial resolution. It complements NEXRAD; it does not substitute for it. Lightning gaps are not necessarily safe corridors — cells can produce heavy precipitation and severe turbulence with low lightning activity.',
      'A pilot with 32 hours actual instrument time and a recently-earned IR is not flying with the experience margin a thunderstorm-line decision requires. Adopting the conservative deviation pattern as a default identity — "I am the kind of pilot who deviates 30 miles around the line" — prevents the gap-picking decision from being available in the first place.'
    ],
    discoveryQuestions: [
      {
        q: 'The cockpit NEXRAD image at 1650 showed clear air. Ground truth at 1656 was the aircraft inside a Level 5 cell. What property of datalink NEXRAD made the displayed image fundamentally misleading?',
        opts: [
          'The XM antenna had a partial obstruction reducing data fidelity',
          'Datalink NEXRAD has inherent end-to-end latency (radar sweep → ground processing → satellite uplink → cockpit display) of 5-15 minutes — what you see is always a snapshot of the past',
          'The pilot had filtered out low-reflectivity returns to declutter the display',
          'NEXRAD does not detect cells over flat terrain'
        ],
        response: 'The datalink NEXRAD chain has structural latency: ground radar sweeps every ~5 min, reflectivity data is mosaicked into a composite, the composite is uplinked to the satellite and broadcast on a cycle, the receiver decodes and renders. By the time you see the image, it is 5-15 minutes old. For a slow-developing weather pattern hundreds of miles away, this is fine. For a thunderstorm cell that can intensify from clear to Level 5 in 10 minutes, the displayed image and reality diverge dangerously. This case shows that divergence reaching its terminal point.'
      },
      {
        q: 'A pilot with limited actual instrument time, no onboard radar, and a datalink NEXRAD product is approaching a line of convective cells with a visible gap. What is the conservatively correct decision?',
        opts: [
          'Fly through the gap with reduced airspeed for turbulence',
          'Climb above the line if cells are reported below FL200',
          'Deviate around the entire line — the deviation should be measured in tens of miles, not minutes — and accept the ~30-minute time penalty',
          'Request vectors through the gap from ATC, who has more current radar'
        ],
        response: 'The structural latency makes any gap an unverifiable target. ATC radar is more current but radar in general (ground or air) shows precipitation, not turbulence — and a "clear" gap can contain severe turbulence and updrafts even without heavy precipitation. The conservative answer is the only safe answer: deviate around the line. A 30-minute deviation is trivial compared to the ~100% fatality rate of a Level 5 penetration in a single-engine piston. The flight plan absorbs the time. The aircraft does not absorb the cell.'
      }
    ],
    quiz:[
      {id:'qcs17_1',question:'A pilot equipped with XM WX Satellite Weather sees a clear gap between two cells on the cockpit display. The pilot is 15 minutes from the gap. What is the safest interpretation?',options:['The gap is real and will remain open as the pilot transits','The gap is 5-15 minutes old; by the time the pilot reaches it, the cells may have grown and closed it','The gap is conservative — the cells on the display are likely larger than reality','If any cell is visible the entire route is unsafe'],correct:1,explanation:'Datalink NEXRAD is structurally latent: 5-15 minutes from radar sweep to cockpit display. A "gap" on the screen is a snapshot of the past. Convective cells can develop or fill in faster than the latency window. Treating a datalink image as ground truth — especially for cells you will reach in less than the latency interval — is the failure mode of the entire ERA12FA376 sequence and many similar accidents.'},
      {id:'qcs17_2',question:'For tactical avoidance of nearby thunderstorm cells, the only equipment-class that provides real-time spatial data is:',options:['Datalink NEXRAD (XM, FIS-B)','Stormscope / strikefinder (lightning detection)','Onboard real-time weather radar','A current METAR for the destination'],correct:2,explanation:'Onboard radar transmits and receives in real time, providing current returns at the aircraft\'s exact range. Datalink NEXRAD is delayed. Stormscope provides real-time lightning data but low spatial resolution. METARs are point observations of surface conditions, not aloft. For close-in tactical decisions about specific cells, onboard radar (or visual avoidance with wide margin) is the standard. GA aircraft without onboard radar must use wide deviation, measured in tens of miles around an entire line — not within-line gap-picking.'},
      {id:'qcs17_3',question:'The pilot in ERA12FA376 had earned the instrument rating less than 2 years prior with approximately 32 hours of actual instrument experience. How should this experience profile have shaped the convective-line decision?',options:['The IR demonstrates the pilot can handle convective penetration if needed','32 hours of actual is sufficient for any IFR decision','A pilot with limited actual experience should adopt a stable identity as "the kind of pilot who deviates wide around convective lines" — this case shows the cost of trying to thread the gap','Actual instrument time is irrelevant to convective avoidance decisions'],correct:2,explanation:'Convective penetration decisions amplify the consequence of every other variable: weather product limitations, aircraft equipment, pilot experience. A low-time IR holder has not yet built the pattern recognition that distinguishes a survivable buildup from a developing cell. The conservative deviation pattern is not a tax on capability — it is what experienced convective-flying pilots do too. Adopting it as default identity prevents the gap-picking decision from being available.'}
    ]
  },
  {
    id:'cs18',
    caseType: 'verified',
    verified: true,
    title:'Circling Until the Tank Was Empty',
    subtitle:'Piper Comanche fuel exhaustion after weather circling, four occupants survived',
    category:'Fuel Management',
    hazard:'Weather Decision → Fuel Cascade',
    severity:'serious injury',
    faaRef:'Ch. 26',
    icon:'⛽',
    color:'#F59E0B',
    aircraft:'Piper PA-24-250 Comanche (N5897P)',
    pilot:'Private pilot (son), with father (aircraft owner, also pilot) acting as co-pilot. Two additional family members on board.',
    date:'November 28, 2014, late afternoon, near Andrews University Airpark (C20), Berrien Springs, Michigan',
    ntsbAccidentNumber:'CEN15CA064',
    ntsbSourceType:'carol',
    ntsbTitle:'Aviation Investigation Final Report — Piper PA-24-250 Comanche, N5897P, Berrien Springs MI, 28 Nov 2014',
    ntsbUrl:'https://data.ntsb.gov/carol-main-public/basic-search/aviation?searchTerm=CEN15CA064',
    brief:`
      <p>The pilot, his father (the aircraft owner, also a pilot, acting as co-pilot), the father's wife, and the pilot's girlfriend departed Richmond, Indiana for a Thanksgiving family gathering at Andrews University Airpark, Berrien Springs, Michigan. The pilot calculated approximately 90 minutes of fuel on board for a flight planned at approximately 70 minutes.</p>
      <p>The fuel margin was thin but presented as legal: a 20-minute reserve over a 70-minute leg. The plan presumed weather and routing as briefed.</p>
    `,
    weather:`
      <div style="background:#0C1B33;border-radius:12px;padding:14px;margin:12px 0;font-family:var(--font-mono);font-size:11px;color:white">
        <div style="color:#94A3B8;margin-bottom:8px;font-family:var(--font-display);font-size:10px;font-weight:700">FUEL & WEATHER MARGIN</div>
        <div style="color:#38BDF8">Planned flight time: ~70 minutes</div>
        <div style="color:#38BDF8">Fuel on board: ~90 minutes</div>
        <div style="color:#F59E0B">Reserve buffer: ~20 minutes (operationally thin)</div>
        <div style="color:#EF4444">At destination: weather present — pilot elected to circle waiting for clearance</div>
        <div style="color:#EF4444">Circling consumed the reserve before weather cleared</div>
        <div style="color:#94A3B8">No diversion attempted</div>
      </div>
    `,
    narrative:`
      <p>The flight proceeded as planned until the aircraft approached Berrien Springs. The pilot encountered weather at the destination and elected to circle the area, waiting for the weather to clear rather than diverting to an alternate.</p>
      <p>The 20-minute reserve was consumed by the circling. Approximately 4 miles from the runway, the engine quit — fuel exhaustion, total loss of power. The aircraft was no longer powered. A forced landing into trees and terrain followed.</p>
      <p>Two occupants were seriously injured. Two received minor injuries. All four survived.</p>
      <p>The NTSB cited the pilot's inadequate fuel planning. The teaching frame is broader than the cause statement: the pilot's plan was nominally legal, but it had no margin for the most common contingency on a cross-country flight — weather requiring time. Once the decision to circle was made, the fuel reserve was committed to a process whose termination was outside the pilot's control.</p>
    `,
    probableCause:`The pilot's inadequate fuel planning, which resulted in fuel exhaustion and a total loss of engine power during the approach to the destination airport.`,
    lessons:[
      'Legal fuel reserves (45 min night VFR, 30 min day VFR under 14 CFR 91.151) are minimums, not plans. The 20-minute buffer in this flight was below the 30-minute day-VFR reserve and operationally inadequate — it had no margin for any contingency that requires time-on-station.',
      'Weather decisions are silent fuel decisions. Every minute spent circling, holding, or routing around weather consumes the same fuel as forward progress — but the reserve was sized for forward progress only.',
      'When weather appears at destination, the choice between circling and diverting is a fuel decision before it is a weather decision. Calculate: at current burn, how many minutes can I wait? Compare to: how long can the weather plausibly stay this bad? If wait-budget is shorter than the weather forecast, divert.',
      'The "I will just wait it out" psychology is structurally biased toward the dangerous option: the cost of waiting (fuel) is invisible while you do it, while the cost of diverting (time, inconvenience) is visible. Make the invisible cost visible by writing the math before you start circling.',
      'A four-occupant family flight is high-stakes not because of the aircraft but because of the cargo. The non-fatal outcome here was luck. The same decision sequence in slightly different terrain or weather is a four-fatality accident.'
    ],
    discoveryQuestions: [
      {
        q: 'The pilot calculated 90 minutes of fuel for a 70-minute flight — a 20-minute buffer. What was wrong with this plan as a cross-country plan, even before weather appeared?',
        opts: [
          'The flight was illegal — VFR reserves require 60 minutes day, not 20',
          'The plan had no margin for the most common cross-country contingency (weather requiring time-on-station). A buffer that is legal-minimum is a minimum, not a plan — and weather hold is the contingency that consumes margin most aggressively',
          'The pilot should have calculated 60 minutes for the flight, not 70',
          'The aircraft\'s fuel gauges are unreliable on the PA-24, requiring a different reserve standard'
        ],
        response: '14 CFR 91.151 requires 30 minutes day-VFR / 45 minutes night-VFR reserve beyond planned arrival. The pilot\'s 20-minute buffer was below the legal day-VFR minimum and well below any operationally sound contingency-aware plan. Cross-country flights regularly require 20-30 minutes of unplanned holding for weather; a flight plan that cannot absorb that contingency is a flight plan that has not accounted for the standard contingencies. "Legal minimum + nothing" is not planning — it is gambling with the smallest visible margin.'
      },
      {
        q: 'When the pilot encountered weather at the destination, the decision was between circling and diverting. What calculation should drive that decision?',
        opts: [
          'Circle if the destination is the planned airport — the plan should be honored',
          'Divert if an alternate is within fuel range — always',
          'Calculate fuel-time available at current burn rate. Compare to weather forecast time. If wait-budget is shorter than weather, divert. Make the invisible cost (fuel) visible by writing the math before circling',
          'Call the destination for a visual conditions report before deciding'
        ],
        response: 'The decision to circle is a decision to spend fuel — and that cost is invisible while you are doing it. The decision to divert is a decision to spend time and inconvenience — those costs are visible. The bias is structural: circle. The corrective practice is to make the fuel cost visible by calculating it explicitly: at 13 GPH and 8 gallons remaining, I have 36 minutes. The METAR trend says weather may not clear for 45 minutes. The math is the answer. Diverting is the answer. Without that calculation, "I will just wait" is the default — and it is wrong here.'
      }
    ],
    quiz:[
      {id:'qcs18_1',question:'A pilot is approaching destination with 30 minutes of fuel on board. Weather at the destination requires a hold. The METAR trend suggests weather may improve in 15-30 minutes. The pilot should:',options:['Hold for 30 minutes — fuel will be at zero but weather should clear','Hold for 15 minutes, then divert if weather has not improved','Divert immediately to an alternate that is in current VMC and within fuel range','Land VFR-direct on the runway despite the IMC weather'],correct:2,explanation:'A 30-minute fuel buffer with a 15-30 minute weather window is the worst-case match — the weather may resolve before fuel is exhausted, or it may not. Holding commits the fuel to a process whose termination is outside the pilot\'s control. Diverting commits the fuel to a process whose termination is in the pilot\'s control (you arrive at the alternate). Always prefer a process you control over one you do not, especially when fuel is the resource at risk.'},
      {id:'qcs18_2',question:'The "I will just wait it out" psychology when weather appears at destination is dangerous because:',options:['Waiting is illegal under 14 CFR Part 91','The cost of waiting (fuel consumption) is invisible during the wait, while the cost of diverting (time, inconvenience) is visible — creating structural bias toward the more dangerous option','Waiting always produces worse outcomes than diverting','Diverting requires a new clearance that takes too long to obtain'],correct:1,explanation:'The decision is structurally biased: while you are circling, fuel consumption is silent — you do not feel it tick down. While you are considering diverting, the inconvenience is loud — extra time, ground transport, family delay. The corrective practice is to make the fuel cost visible by writing the math before circling: minutes of fuel at current burn vs. minutes of weather expected. When the math is on paper, the decision is obvious. When the math stays in your head, the bias wins.'},
      {id:'qcs18_3',question:'A planned 70-minute cross-country with 90 minutes of fuel represents:',options:['A safe operational plan with a 20-minute reserve','A plan below the 14 CFR 91.151 day-VFR 30-minute reserve and well below the operationally sound "flight time + 30 min reserve + 30 min weather contingency" pattern. Cross-country flights regularly require 20-30 minutes of unplanned holding for weather; the plan must absorb that at minimum','A reasonable plan if weather is forecast to be VMC','A plan that exceeds the FAA recommended fuel margin of 1.2x flight time'],correct:1,explanation:'A 20-minute buffer over flight time is below the standard 30-minute day-VFR reserve and well below the operationally sound flight-time + reserve + weather-contingency + diversion pattern. The cs18 plan was technically close to legal but had no operational margin for the contingency that actually occurred. Build flight plans against the contingency that actually happens, not the contingency you would prefer.'}
    ]
  }
];
