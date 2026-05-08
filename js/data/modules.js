// ============================================================
// Aviation Weather Academy — Modules Data
// 15 modules across 3 acts, FAA-H-8083-28A (2024)
// ============================================================

const MODULES = [

  // ====== ACT 1: THE SKY SYSTEM ======
  // ================================================
  // MODULE 1: THE ATMOSPHERE
  // ================================================
  {
    id: 'm1', act: 1, title: 'The Atmosphere', subtitle: 'Layers, composition & temperature',
    icon: '🌍', color: '#38BDF8', bgColor: '#E0F2FE', prerequisites: [],
    xpReward: 150, estimatedMin: 12,
    faaRef: 'FAA-H-8083-28A Chapters 4, 5, 6, 7',
    sections: [
      {
        id: 's1_1', title: 'Layers of the Atmosphere',
        content: `
          <p>The atmosphere surrounding Earth is divided into distinct layers. As a pilot, understanding where you operate—and what happens in each layer—is foundational to all weather knowledge.</p>
          <div class="fact-box">
            <span style="font-size:28px">🌤️</span>
            <div><strong>The Troposphere</strong> extends from the surface to approximately <span class="data-tag">36,000 ft</span> (7 miles). This is where <em>virtually all weather occurs</em> and where nearly 75% of the atmosphere's mass resides.</div>
          </div>
          <p>Temperature in the troposphere <strong>decreases with altitude</strong> at the Standard Lapse Rate of <span class="data-tag">2°C / 1,000 ft</span> (3.5°F/1,000 ft). This is critical for understanding stability and cloud formation.</p>
          <div class="callout">☁️ <strong>Tropopause:</strong> The boundary between troposphere and stratosphere. Temperature stops decreasing here. Jet streams live at this boundary, and it acts as a "lid" that caps thunderstorm vertical development.</div>
          <p>The <strong>Stratosphere</strong> extends from the tropopause to about 160,000 ft. Temperature initially remains stable then begins increasing due to ozone absorbing UV radiation. Almost no weather occurs here, but supersonic aircraft and U-2 reconnaissance planes operate in this layer.</p>
          <p>Above the stratosphere lie the <strong>Mesosphere</strong> (up to ~280,000 ft) and the <strong>Thermosphere</strong>, where temperatures rise dramatically but the air is so thin it has negligible effect on aviation.</p>
        `,
        diagram: {
          type: 'hotspot',
          title: '🔍 Atmospheric Layers — Tap Each Zone',
          svgKey: 'atmosphere_layers'
        }
      },
      {
        id: 's1_2', title: 'Atmospheric Composition',
        content: `
          <p>The composition of the atmosphere is remarkably consistent from the surface to the stratosphere. The major components by volume:</p>
          <div style="background:#F8FAFC;border-radius:16px;padding:18px;margin:16px 0">
            <div style="display:grid;gap:10px">
              ${[['Nitrogen (N₂)','78.09%','#3B82F6'],['Oxygen (O₂)','20.95%','#10B981'],['Argon (Ar)','0.93%','#8B5CF6'],['Carbon Dioxide (CO₂)','0.042%','#F59E0B'],['Water Vapor (H₂O)','0–4%','#38BDF8']].map(([name,pct,col])=>`
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:12px;height:12px;border-radius:3px;background:${col};flex-shrink:0"></div>
                <div style="flex:1;font-weight:600;color:#334155;font-size:14px">${name}</div>
                <div style="font-family:var(--font-mono);font-size:13px;font-weight:700;color:${col}">${pct}</div>
              </div>`).join('')}
            </div>
          </div>
          <div class="callout">💧 <strong>Water vapor is the wildcard.</strong> While only 0–4% of total volume, it is the most important component for weather formation—it is the source of all clouds, precipitation, and the release of latent heat that drives atmospheric dynamics.</div>
          <p>At the revised <span class="data-tag">0.042%</span> CO₂ level noted in FAA-H-8083-28A Revision A (updated from 0.033%), CO₂ plays an increasing role in atmospheric heat retention but has negligible direct effect on aircraft performance.</p>
        `
      },
      {
        id: 's1_3', title: 'The Standard Atmosphere',
        content: `
          <p>The <strong>International Standard Atmosphere (ISA)</strong> provides a reference model for aviation calculations. It defines "standard" conditions at sea level and how they change with altitude.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">SEA LEVEL STANDARD CONDITIONS</div>
            <div style="display:grid;gap:8px">
              <div style="display:flex;justify-content:space-between"><span style="color:#94A3B8;font-size:12px">Temperature</span><span style="color:#38BDF8;font-size:14px">59°F / 15°C</span></div>
              <div style="display:flex;justify-content:space-between"><span style="color:#94A3B8;font-size:12px">Pressure</span><span style="color:#38BDF8;font-size:14px">29.92 inHg / 1013.25 mb</span></div>
              <div style="display:flex;justify-content:space-between"><span style="color:#94A3B8;font-size:12px">Lapse Rate</span><span style="color:#38BDF8;font-size:14px">2°C or 3.5°F per 1,000 ft</span></div>
              <div style="display:flex;justify-content:space-between"><span style="color:#94A3B8;font-size:12px">Tropopause</span><span style="color:#38BDF8;font-size:14px">~36,089 ft (7 mi)</span></div>
            </div>
          </div>
          <div class="danger-callout">⚠️ <strong>Real atmosphere rarely matches ISA.</strong> Temperature deviations from standard directly affect your altimeter accuracy, density altitude calculations, and engine/propeller performance. Always check actual OAT.</div>
          <p>The lapse rate applies only in the <strong>troposphere</strong>. Above the tropopause, temperature in the stratosphere remains near <span class="data-tag">-56.5°C (-70°F)</span> for several miles before rising again.</p>
        `
      },
      {
        id: 's1_4', title: 'Heat Transfer & Temperature Inversions',
        content: `
          <p>Heat moves through the atmosphere via three mechanisms, each creating distinct aviation weather patterns:</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['🌡️','Radiation','Energy transfer by electromagnetic waves. The Sun heats the Earth; the Earth radiates that heat back upward as longwave (infrared) radiation.','#EEF2FF','#6366F1'],
              ['🤲','Conduction','Direct contact energy transfer. The lowest few feet of air are heated by contact with warm ground. Minimal vertical extent but creates turbulence.','#FEF3C7','#F59E0B'],
              ['🌀','Convection','Mass movement of air. Warm, less-dense air rises; cool, dense air sinks. This is the primary driver of cumulus clouds and thunderstorms.','#D1FAE5','#10B981']
            ].map(([icon,title,content,bg,col])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;display:flex;gap:12px;align-items:flex-start">
              <span style="font-size:24px">${icon}</span>
              <div><strong style="color:${col};font-family:var(--font-display)">${title}</strong><p style="margin:4px 0 0;font-size:14px;color:#475569">${content}</p></div>
            </div>`).join('')}
          </div>
          <p>A <strong>temperature inversion</strong> occurs when temperature <em>increases</em> with altitude instead of decreasing—the opposite of normal. Inversions act as a cap on convection and trap pollution and moisture below.</p>
          <div class="callout">🌫️ <strong>Pilot Alert — Inversions mean:</strong> Restricted visibility and ceiling below the inversion; smooth flying conditions above it; potential for fog formation; turbulence at the inversion boundary.</div>
        `
      }
    ],
    quiz: [
      {
        id: 'q_m1_1', type: 'mc',
        question: 'The troposphere extends from the surface to approximately:',
        options: ['7 miles (36,000 ft) — varies by latitude','50 miles above sea level','3.5 miles — fixed worldwide','100 kilometers (60 miles)'],
        correct: 0, xp: 10,
        explanation: 'The troposphere averages about 7 miles (36,000 ft) at mid-latitudes, but ranges from ~5 miles at the poles to ~10 miles at the equator. It contains ~75% of atmospheric mass and ALL significant weather.',
        faaRef: 'Ch. 4'
      },
      {
        id: 'q_m1_2', type: 'mc',
        question: 'What is the Standard (ICAO) Lapse Rate in the troposphere?',
        options: ['1°C per 1,000 ft','2°C or 3.5°F per 1,000 ft','3°C per 1,000 ft (DALR)','5°C per 1,000 ft'],
        correct: 1, xp: 10,
        explanation: 'The Standard Lapse Rate is 2°C (3.5°F) per 1,000 ft. This is different from the Dry Adiabatic Lapse Rate (DALR) of 3°C/1,000 ft — a common source of confusion on checkrides!',
        faaRef: 'Ch. 4, 5'
      },
      {
        id: 'q_m1_3', type: 'mc',
        question: 'What percentage of the atmosphere by volume is oxygen (O₂)?',
        options: ['78%','21%','1%','0.93%'],
        correct: 1, xp: 10,
        explanation: 'Nitrogen makes up ~78%, Oxygen ~21%, and Argon ~1%. These proportions remain remarkably consistent from the surface through the stratosphere.',
        faaRef: 'Ch. 4'
      },
      {
        id: 'q_m1_4', type: 'scenario',
        scenario: 'You are departing Denver (5,431 ft MSL) on a hot summer afternoon. Temperature is 95°F. You calculate your density altitude is 9,800 ft.',
        question: 'Which atmospheric layer property MOST directly explains the degraded takeoff performance you are experiencing?',
        options: ['Lower air pressure at high elevation reduces air density','Temperature inversion traps cold air below the tropopause','Higher oxygen percentage at altitude improves combustion','Standard lapse rate increases air density with altitude'],
        correct: 0, xp: 15,
        explanation: 'At higher elevations, atmospheric pressure is lower, meaning fewer air molecules per unit volume — reduced density. Add heat (which further expands and thins air), and density altitude climbs well above field elevation. Less dense air = less engine power, less propeller thrust, less lift.',
        faaRef: 'Ch. 4, 8'
      },
      {
        id: 'q_m1_5', type: 'scenario',
        scenario: 'Cruising at 8,000 ft pressure altitude, the OAT gauge reads 25°C. Standard temperature at 8,000 ft is approximately −1°C.',
        question: 'What does this temperature deviation mean for the air around you, and why does it matter for performance?',
        options: [
          'Air is denser than ISA — the aircraft will outperform book numbers; expect shorter takeoff and better climb',
          'Air is less dense than ISA (warmer than standard by ~26°C) — density altitude is far above pressure altitude; expect degraded climb, longer ground roll, higher TAS for same IAS',
          'Temperature deviation only affects piston engines; turbine performance is unaffected',
          'Above 5,000 ft, OAT no longer affects performance because the air is already thin'
        ],
        correct: 1, xp: 20,
        explanation: 'OAT 25°C is ~26°C above ISA at 8,000 ft. Warmer-than-standard air is less dense — fewer molecules per cubic foot means less lift per knot of IAS, less thrust, and a true airspeed noticeably higher than indicated for the same dynamic pressure. The ISA baseline at sea level is 15°C / 29.92 inHg; the standard lapse rate carries you 2°C cooler per 1,000 ft up to the tropopause. Recognizing OAT-vs-ISA quickly is the foundation of density-altitude reasoning.',
        faaRef: 'Ch. 4', concept: 'standard_atmosphere'
      },
      {
        id: 'q_m1_6', type: 'mc',
        question: 'Where are jet streams predominantly located?',
        options: ['Mid-troposphere at ~18,000 ft MSL','Near the tropopause, at the boundary of troposphere and stratosphere','In the stratosphere, above the tropopause','At the surface near the poles'],
        correct: 1, xp: 10,
        explanation: 'Jet streams form near the tropopause where large temperature gradients between air masses generate high-speed wind rivers of 60–200+ kt. They are a critical consideration for IFR flight planning and are a source of Clear Air Turbulence (CAT).',
        faaRef: 'Ch. 4, 9'
      },
      {
        id: 'q_m1_7', type: 'mc',
        question: 'A temperature inversion occurs when:',
        options: ['Temperature decreases at exactly the standard lapse rate','Temperature increases with altitude instead of decreasing','Humidity reaches 100% at the dewpoint','Temperature remains constant with altitude (isothermal layer)'],
        correct: 1, xp: 10,
        explanation: 'A temperature inversion is a layer where temperature INCREASES with altitude — the inverse of the normal lapse rate. Inversions are absolutely stable, trap moisture and pollutants below, and create major IFR hazards. They are most common near the surface at night (radiation inversions) and in high-pressure subsidence.',
        faaRef: 'Ch. 5, 13'
      },
      {
        id: 'q_m1_8', type: 'timed',
        timeLimit: 12,
        question: 'Which atmospheric layer contains approximately 75% of the atmosphere\'s mass and virtually all weather?',
        options: ['Stratosphere','Mesosphere','Troposphere','Thermosphere'],
        correct: 2, xp: 15,
        explanation: 'The TROPOSPHERE contains ~75% of all atmospheric mass and is where virtually all weather occurs. It extends from the surface to about 36,000 ft (7 miles) at mid-latitudes. Its name comes from the Greek "tropos" meaning turning — constant convective overturning drives all weather.',
        faaRef: 'Ch. 4'
      },
      {
        id: 'q_m1_9', type: 'mc',
        question: 'The tropopause acts as a "lid" on convective weather because:',
        options: [
          'Wind speeds reach zero at the tropopause, stopping updrafts',
          'Temperature stops decreasing at the tropopause — rising air meets air as warm as itself and stops rising',
          'Jet streams physically block upward movement of clouds',
          'Pressure drops too low above the tropopause for liquid water to exist'
        ],
        correct: 1, xp: 10,
        explanation: 'The tropopause is where temperature stops decreasing with altitude. A rising convective parcel, cooling at the moist adiabatic lapse rate, eventually reaches the tropopause temperature — at that point it is no longer warmer than its surroundings and can rise no further. Only the most powerful supercell thunderstorms can "bust" through the tropopause as "overshooting tops."',
        faaRef: 'Ch. 4'
      },
      {
        id: 'q_m1_10', type: 'timed',
        timeLimit: 10,
        question: 'The standard temperature at sea level in the International Standard Atmosphere (ISA) is:',
        options: ['0°C (32°F)', '15°C (59°F)', '20°C (68°F)', '25°C (77°F)'],
        correct: 1, xp: 15,
        explanation: 'The ISA defines standard sea-level conditions as: Temperature = 15°C (59°F), Pressure = 29.92 inHg (1013.25 mb), Density = 0.002377 slug/ft³. The standard temperature lapse rate is 2°C per 1,000 ft to the tropopause at ~36,000 ft. Deviations from ISA affect density altitude and aircraft performance.',
        faaRef: 'Ch. 4'
      }
    ,
      {id:'q_m1_11',type:'mc',question:'The tropopause is important to aviation primarily because:',options:['It marks the boundary where aircraft must switch to 100LL fuel','Temperature stops decreasing with altitude at the tropopause, making it the effective ceiling for most convective weather — thunderstorm tops flatten into anvils here','Oxygen becomes insufficient for combustion above the tropopause','Radio communication is impossible above the tropopause'],correct:1,xp:10,explanation:'The tropopause is the boundary between the troposphere and stratosphere. In the troposphere, temperature decreases with altitude (enabling convection). At the tropopause, temperature stabilizes — stopping upward convective development. Thunderstorm tops flatten into classic anvil shapes when they hit the tropopause. The average tropopause height is ~36,000 ft at mid-latitudes, higher in the tropics (~55,000 ft) and lower over the poles (~25,000 ft).',faaRef:'Ch. 4',concept:'standard_atmosphere'},
      {id:'q_m1_12',type:'scenario',scenario:'Flying at 9,500 ft over the Piedmont in summer. OAT reads -1°C. Standard temperature at 9,500 ft should be about +10°C.',question:'What does a temperature 11°C colder than ISA indicate about current atmospheric conditions?',options:['ISA deviation doesn’t affect anything at this altitude','Temperature is colder than standard — density altitude is lower than pressure altitude, giving better-than-book performance','Temperature is colder than standard — this indicates an approaching cold front and likely IFR conditions','Non-standard temperatures only matter for aircraft certification tests, not actual flight'],correct:1,xp:15,explanation:'When OAT is colder than ISA (negative ISA deviation), air is denser than standard. Denser air means: better engine performance, shorter takeoff roll, higher true altitude than pressure altitude for altimetry. However, colder-than-standard temperatures also compress your freezing level downward. At 9,500 ft with OAT -1°C, visible moisture (clouds) means icing is possible even though the METAR might show above-freezing temps at the surface.',faaRef:'Ch. 4',concept:'standard_atmosphere'}
    ]
  },

  // ================================================
  // MODULE 2: PRESSURE & ALTIMETRY
  // ================================================
  {
    id: 'm2', act: 1, title: 'Pressure & Altimetry', subtitle: 'Density altitude & altimeter errors',
    icon: '🌡️', color: '#6366F1', bgColor: '#EEF2FF', prerequisites:['m1'],
    xpReward: 175, estimatedMin: 14,
    faaRef: 'FAA-H-8083-28A Chapter 8',
    sections: [
      {
        id: 's2_1', title: 'Atmospheric Pressure',
        content: `
          <p>Atmospheric pressure is the <strong>force per unit area exerted by the weight of the air column above you</strong>. It decreases with altitude because there is less atmosphere overhead.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">PRESSURE UNITS — EQUIVALENTS</div>
            ${[['inHg (US Aviation)','29.92'],['hPa / mb (Metric)','1013.25'],['psi (Engineering)','14.7']].map(([unit,val])=>`
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);padding:8px 0;font-size:13px">
              <span style="color:#94A3B8">${unit}</span><span style="color:#F59E0B;font-weight:700">${val}</span>
            </div>`).join('')}
          </div>
          <p>Pressure does not decrease uniformly with altitude. The decrease is <strong>exponential</strong> — pressure drops rapidly in the lower atmosphere and more slowly at higher altitudes. A useful rule of thumb: pressure decreases approximately <span class="data-tag">~1 inHg per 1,000 ft</span> in the lower atmosphere.</p>
          <div class="callout">🗺️ <strong>On weather maps:</strong> Lines connecting equal pressure values are called <em>isobars</em>. Closely spaced isobars indicate a strong pressure gradient — and strong winds. Widely spaced isobars mean weaker winds.</div>
        `,
        diagram: { type: 'process', key: 'density_altitude' }
      },
      {
        id: 's2_2', title: 'The Five Types of Altitude',
        content: `
          <p>Pilots work with multiple definitions of "altitude." Confusing them is a common checkride mistake:</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['Indicated Altitude (IA)','What the altimeter reads with current altimeter setting (Kollsman window)','#38BDF8','🔵'],
              ['True Altitude (TA)','Actual height above Mean Sea Level (MSL). What terrain clearance maps use.','#10B981','🟢'],
              ['Pressure Altitude (PA)','Altimeter set to 29.92 inHg. Used for density altitude calc and FL above 18,000 ft.','#6366F1','🟣'],
              ['Density Altitude (DA)','Pressure altitude corrected for non-standard temperature. The PERFORMANCE altitude.','#F59E0B','🟡'],
              ['Absolute Altitude (AA)','Height above ground level (AGL). Used for obstacle clearance planning.','#F43F5E','🔴']
            ].map(([title,desc,color,dot])=>`
            <div style="background:white;border-radius:14px;padding:14px 16px;border-left:4px solid ${color};box-shadow:0 2px 8px rgba(0,0,0,0.05)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                <span style="font-size:14px">${dot}</span>
                <strong style="font-family:var(--font-display);color:var(--navy)">${title}</strong>
              </div>
              <p style="font-size:13px;color:#64748B;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
        `
      },
      {
        id: 's2_3', title: 'Density Altitude — The Silent Killer',
        content: `
          <p><strong>Density altitude is pressure altitude corrected for non-standard temperature.</strong> It is the altitude at which the aircraft "thinks" it's operating based on how dense (or thin) the air actually is.</p>
          <div class="danger-callout">☠️ <strong>HIGH DENSITY ALTITUDE = DEGRADED PERFORMANCE:</strong> Reduced engine power (less oxygen), reduced propeller/rotor efficiency, increased true airspeed for same IAS, longer takeoff roll, reduced climb rate, and higher landing speed.</div>
          <div class="fact-box">
            <span style="font-size:28px">🌡️</span>
            <div><strong>The "Hot, High, Humid" Rule:</strong> All three factors increase density altitude. A summer afternoon at a high-elevation airport (Denver, Telluride, Aspen) can produce density altitudes thousands of feet above field elevation — putting performance in the stratosphere while your aircraft is still on the ground.</div>
          </div>
          <p>Quick estimation formula: <span class="data-tag">DA ≈ PA + 120 × (OAT°C − ISA°C)</span></p>
          <p>where <span class="data-tag">ISA°C = 15 − 2 × (alt_ft / 1000)</span> — ISA temperature drops about 2°C for every 1,000 ft of altitude.</p>
          <p><strong>Worked example:</strong> Pressure altitude 5,500 ft, OAT 35°C (95°F).<br>
          ISA at 5,500 ft = 15 − 2 × 5.5 = 4°C. Deviation = 35 − 4 = 31°C.<br>
          DA = 5,500 + 120 × 31 = 5,500 + 3,720 = <strong>~9,200 ft DA</strong>.</p>
          <div class="callout">📏 <strong>Convert to °C first.</strong> The 120-ft-per-°C rule of thumb (and every E6B) uses Celsius. Plugging Fahrenheit values into the same multiplier produces an answer that is wildly too high. Convert with °C = (°F − 32) × 5/9.</div>
        `
      },
      {
        id: 's2_4', title: 'Altimeter Errors & Setting',
        content: `
          <p>Your altimeter is a <strong>barometric pressure sensor</strong>, not a true altitude device. It converts pressure to altitude using the ISA standard relationship — which is only accurate when conditions match ISA.</p>
          <div class="callout">📏 <strong>Two distinct altimeter errors with the same outcome — different physics, both make you lower than the altimeter shows:</strong><br><br>
          🔴 <strong>Pressure error — "From HIGH to LOW, LOOK OUT BELOW."</strong> Flying from a region of higher altimeter setting to a region of lower altimeter setting without re-baroing the Kollsman window: each 0.01 inHg you fail to adjust ≈ 10 ft of over-read. Cause: the altimeter is a barometer; lower ambient pressure means a given pressure surface lies at a lower true altitude than the calibration assumes. <em>Fix: get current ATIS/AWOS and dial it in.</em><br><br>
          🌡️ <strong>Temperature error — "Hot to cold, look out below" (a separate phenomenon).</strong> In colder-than-ISA air, the true altitude of a given pressure surface is lower than the altimeter (which is calibrated to ISA) reports — even with the correct local altimeter setting. Cause: the column of cold air is denser/shorter; the ISA altitude–pressure curve no longer applies. Errors of several hundred to over a thousand feet are possible at very cold temperatures. <em>Fix: apply the cold-temperature altitude correction tables (AC 91-79); Canada and many cold-climate operations mandate it on instrument approaches.</em></div>
          <p>Above <span class="data-tag">18,000 ft MSL (FL180)</span> in the US, all aircraft set 29.92 inHg and use Flight Levels. This creates a standard reference above the altitude where regional pressure variations matter most to en route separation.</p>
          <div class="danger-callout">⚠️ <strong>Always set the current altimeter setting when provided by ATC or ATIS.</strong> Failure to update can result in altitude errors of hundreds of feet — enough to violate airspace, lose separation, or collide with terrain.</div>
        `,
        diagram: { type: 'slider', svgKey: 'altimeter_error' }
      }
    ],
    quiz: [
      {
        id: 'q_m2_1', type: 'mc',
        question: 'Standard sea-level atmospheric pressure is expressed as:',
        options: ['14.7 psi only','29.92 inHg only','1013.25 mb only','All of the above — they are equivalent'],
        correct: 3, xp: 10,
        explanation: '29.92 inHg = 1013.25 hPa (mb) = 14.7 psi. These are all expressing the same standard sea-level pressure in different unit systems. For US aviation, inHg is used for altimeter settings.',
        faaRef: 'Ch. 8'
      },
      {
        id: 'q_m2_2', type: 'mc',
        question: 'You are flying from high pressure to low pressure without updating your altimeter setting. Your indicated altitude will:',
        options: ['Read accurately — pressure cancels out','Read higher than your actual altitude','Read lower than your actual altitude','Only be affected above 10,000 ft'],
        correct: 1, xp: 10,
        explanation: '"From HIGH to LOW, LOOK OUT BELOW!" In low pressure, the atmosphere is thinner, so the pressure at your actual altitude corresponds to a higher standard altitude. Your altimeter over-reads — you appear higher than you are. This is a terrain clearance hazard.',
        faaRef: 'Ch. 8'
      },
      {
        id: 'q_m2_3', type: 'mc',
        question: 'Density altitude equals pressure altitude when:',
        options: ['Wind is calm','ISA (standard temperature) conditions exist','RH is 0%','You are at FL180 or above'],
        correct: 1, xp: 10,
        explanation: 'Density altitude = pressure altitude only when temperature equals the ISA standard temperature for that altitude. Any deviation — hot OR cold — makes DA differ from PA.',
        faaRef: 'Ch. 8'
      },
      {
        id: 'q_m2_4', type: 'scenario',
        scenario: 'You are departing Telluride Regional Airport (KTEX), elevation 9,078 ft MSL. It is a summer afternoon: OAT 88°F (≈31°C). Your calculated pressure altitude is 9,400 ft. ISA temperature at that altitude is approximately −4°C (15 − 2 × 9.4).',
        question: 'What is the approximate density altitude and what primary performance concern should you brief?',
        options: [
          'DA ~13,600 ft — significant degradation: longer takeoff roll, reduced climb gradient, higher true airspeed for the same indicated airspeed',
          'DA ~9,400 ft — standard conditions, no special concerns',
          'DA ~17,000 ft — aircraft cannot legally depart at this DA',
          'DA ~7,000 ft — high terrain provides a performance advantage'
        ],
        correct: 0, xp: 20,
        explanation: 'DA ≈ PA + 120 × (OAT°C − ISA°C). OAT 88°F = 31°C; ISA at 9,400 ft = 15 − 2 × 9.4 = −4°C; deviation = 35°C. DA ≈ 9,400 + 120 × 35 = 13,600 ft. At this density altitude, engine power, propeller efficiency, and lift generation are all degraded. Telluride-style departures demand detailed performance calculations and often dictate early-morning operations to capture cooler temperatures.',
        faaRef: 'Ch. 8'
      },
      {
        id: 'q_m2_5', type: 'timed',
        timeLimit: 10,
        question: 'Above what altitude do all IFR aircraft in the US set their altimeters to 29.92 inHg?',
        options: ['14,500 ft MSL','17,500 ft MSL','18,000 ft MSL (FL180)','24,000 ft MSL'],
        correct: 2, xp: 20,
        explanation: 'At FL180 (18,000 ft MSL) and above, all aircraft in the US use standard altimeter setting 29.92 inHg (QNE) and refer to altitude in Flight Levels. Below FL180, use local altimeter setting.',
        faaRef: 'Ch. 8'
      },
      {
        id: 'q_m2_6', type: 'scenario',
        scenario: 'You are inbound to a mountain airport on a winter IFR approach. Local altimeter setting is current at 29.95 inHg. OAT at the FAF altitude (5,200 ft MSL) is −20°C; ISA at that altitude is approximately +5°C — a 25°C colder-than-standard deviation. The MDA is 600 ft AGL.',
        question: 'Which statement is correct about your true altitude on this approach?',
        options: [
          'No correction is needed — the altimeter setting is current, so indicated altitude equals true altitude',
          'The altimeter will over-read by hundreds of feet because the cold air column is denser/shorter than ISA — your true altitude is lower than indicated, and a cold-temperature altitude correction (per AC 91-79) should be applied',
          'The cold temperature reduces engine power but has no effect on the altimeter',
          'Cold air makes the altimeter under-read, so you are higher than indicated — no correction needed'
        ],
        correct: 1, xp: 20,
        explanation: 'This is the temperature error, not the high-to-low pressure mnemonic. Even with a current altimeter setting, the altimeter is calibrated to ISA. In air ~25°C colder than standard, the column from MSL to your true altitude is denser and shorter than ISA assumes — true altitude is below indicated. At 5,000 ft MSL with a 25°C deviation, the error is on the order of several hundred feet, which can erase MDA terrain margins on instrument approaches. AC 91-79 publishes the cold-temperature altitude correction tables; Canada and many cold-climate operators mandate them.',
        faaRef: 'Ch. 8', concept: 'pressure_altitude'
      },
      {
        id: 'q_m2_7', type: 'scenario',
        scenario: 'You are cruising at 8,500 ft indicated. OAT is -25°C. Standard temperature at 8,500 ft is approximately -6°C. You are flying a winter IFR approach in Canada.',
        question: 'How does cold temperature affect your true altitude versus indicated altitude?',
        options: [
          'Cold air is less dense — true altitude is HIGHER than indicated. No correction needed.',
          'Cold air is MORE dense — the actual altitude producing that pressure is LOWER than indicated. You are lower than your altimeter shows.',
          'Temperature only affects density altitude, not true altitude vs. indicated.',
          'Below -20°C, altimeters are not affected because pressure is stable.'
        ],
        correct: 1, xp: 20,
        explanation: 'This is the temperature error (separate from the "high to low" pressure mnemonic). Cold air is denser than ISA — the column is "compressed", so the true altitude of a given pressure surface is LOWER than the standard atmospheric model predicts. In very cold conditions (-30°C or colder), errors can exceed 1,000 ft. Canada mandates cold-temperature corrections on approach.',
        faaRef: 'Ch. 8'
      },
      {
        id: 'q_m2_8', type: 'mc',
        question: 'On a hot summer afternoon at a high-elevation airport, density altitude is much higher than pressure altitude. What practical effect does this have?',
        options: [
          'The altimeter reads higher than actual — a dangerous overread',
          'The aircraft performs as if it were at a much higher altitude — reduced lift, thrust, and climb performance',
          'Fuel burn decreases because air is thinner',
          'Density altitude only affects jet engines, not piston aircraft'
        ],
        correct: 1, xp: 10,
        explanation: 'High density altitude (hot, high, humid) means the air is less dense. Less dense air = less air molecules per cubic foot = less lift generated per knot of airspeed, less thrust from the engine, longer takeoff roll, reduced climb rate. Many fatal accidents occur at mountain airports on hot afternoons when pilots fail to compute density altitude. Always calculate DA before takeoff.',
        faaRef: 'Ch. 8'
      },
      {
        id: 'q_m2_9', type: 'timed',
        timeLimit: 12,
        question: 'The mnemonic "From HIGH to LOW, LOOK OUT BELOW" refers to flying from:',
        options: [
          'High altitude to low altitude without updating altimeter',
          'High pressure to low pressure without updating the altimeter setting — causing the altimeter to over-read (you are lower than indicated)',
          'Hot temperatures to cold temperatures',
          'High-humidity air to dry air'
        ],
        correct: 1, xp: 15,
        explanation: 'Flying from an area of high pressure to an area of lower pressure without updating the Kollsman window causes the altimeter to OVER-read — indicated altitude is higher than true altitude. You are LOWER than you think — hence "look out below." The altimeter was set for higher pressure; in lower pressure air, the same pressure occurs at a lower true altitude.',
        faaRef: 'Ch. 8'
      }
    ,
      {id:'q_m2_10',type:'timed',timeLimit:12,question:'Your altimeter reads 6,500 ft. OAT is -15°C; standard temp at 6,500 ft is +0.5°C. You are flying toward a mountain with true height 6,200 ft MSL. Are you clear?',options:['Yes — you read 6,500 ft which is 300 ft above the mountain','No — cold-temperature error means your true altitude is LOWER than indicated. You may be closer to the terrain than you think.','No — hot temperature makes altimeters over-read','Yes — altimeter error only matters below 3,000 ft AGL'],correct:1,xp:15,explanation:'This is the temperature error, not the pressure mnemonic. The altimeter is calibrated to ISA, and at -15°C versus a standard +0.5°C the column of air is denser and shorter — true altitude is LOWER than indicated. Apply the cold-temperature altitude correction tables (AC 91-79). Many fatal CFIT accidents in cold climates result from ignoring this error.',faaRef:'Ch. 8',concept:'pressure_altitude'},
      {id:'q_m2_11',type:'mc',question:'You depart an airport with altimeter 30.12 inHg and fly to a destination where the current altimeter is 29.75 inHg. If you forget to update your altimeter setting, your altimeter will:',options:['Read correctly — altimeter settings only matter at departure','Show you HIGHER than you actually are — you will be lower than indicated, a terrain hazard','Show you LOWER than you actually are — you will be higher than indicated','The error is negligible for VFR flight'],correct:1,xp:10,explanation:'Each 0.01 inHg change in altimeter setting equals approximately 10 ft of altitude error. The difference here is 0.37 inHg = ~370 ft error. Flying into lower pressure with a high altimeter setting makes the altimeter over-read — you will be 370 ft LOWER than your altimeter indicates. This is the origin of "From High to Low — Look Out Below" for pressure changes. Always get current ATIS/AWOS before descending into a destination airport.',faaRef:'Ch. 8',concept:'pressure_altitude'},
      {id:'q_m2_12',type:'scenario',scenario:'KJQF (elevation 705 ft). Current conditions: temp 35°C, dewpoint 22°C, altimeter 29.92. Density altitude chart shows approximately 3,200 ft density altitude.',question:'How should you expect a normally-aspirated piston single to perform on takeoff today versus a standard sea-level day?',options:['Identical takeoff roll — DA effects only show up in cruise performance','Significantly longer takeoff roll — at 3,200 ft density altitude, expect roughly 30–40% more runway required and reduced climb gradient','Slightly shorter roll — summer humidity reduces tire friction','No expected effect — density altitude only matters at high-elevation airports'],correct:1,xp:20,explanation:'Density altitude directly degrades engine power (naturally-aspirated engines lose ~3% power per 1,000 ft DA) and propeller/wing efficiency. At ~3,200 ft DA versus sea-level, expect roughly 30–40% more runway required and a notably weaker initial climb. Consult the specific airframe POH for actual performance numbers; the weather lesson here is that density altitude is the variable doing the work. Always compute DA before operations on hot summer days at low- and mid-elevation fields.',faaRef:'Ch. 8',concept:'density_altitude'}
    ]
  },

  // ================================================
  // MODULE 3: WIND & CIRCULATION
  // ================================================
  {
    id: 'm3', act: 1, title: 'Wind & Circulation', subtitle: 'Forces, jet streams & local winds',
    icon: '💨', color: '#10B981', bgColor: '#D1FAE5', prerequisites:['m1','m2'],
    xpReward: 175, estimatedMin: 15,
    faaRef: 'FAA-H-8083-28A Chapters 9, 10',
    sections: [
      {
        id: 's3_1', title: 'Three Forces That Drive Wind',
        content: `
          <p>Wind is air in motion caused by pressure differences. Three fundamental forces govern how wind behaves from the upper atmosphere to the surface:</p>
          <div style="display:grid;gap:14px;margin:16px 0">
            <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06)">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <div style="width:36px;height:36px;border-radius:12px;background:#EEF2FF;display:flex;align-items:center;justify-content:center;font-size:18px">➡️</div>
                <strong style="font-family:var(--font-display);font-size:16px;color:var(--navy)">Pressure Gradient Force (PGF)</strong>
              </div>
              <p style="font-size:14px;color:#475569;margin:0">Acts <em>perpendicular to isobars</em>, directing wind from <strong>high to low pressure</strong>. The closer the isobars, the stronger the PGF, and the faster the wind. This is the primary driving force of all wind.</p>
            </div>
            <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06)">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <div style="width:36px;height:36px;border-radius:12px;background:#D1FAE5;display:flex;align-items:center;justify-content:center;font-size:18px">🌀</div>
                <strong style="font-family:var(--font-display);font-size:16px;color:var(--navy)">Coriolis Force</strong>
              </div>
              <p style="font-size:14px;color:#475569;margin:0">A result of Earth's rotation. Deflects moving air <strong>to the RIGHT in the Northern Hemisphere</strong>, to the left in the Southern Hemisphere. Zero effect at the Equator. Increases with latitude and wind speed. It is the reason wind spirals around pressure systems.</p>
            </div>
            <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06)">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <div style="width:36px;height:36px;border-radius:12px;background:#FEF3C7;display:flex;align-items:center;justify-content:center;font-size:18px">🏔️</div>
                <strong style="font-family:var(--font-display);font-size:16px;color:var(--navy)">Friction Force</strong>
              </div>
              <p style="font-size:14px;color:#475569;margin:0">Acts only near the surface (below ~3,000 ft AGL). <strong>Slows wind speed</strong> and reduces Coriolis effect, causing surface wind to <em>cross isobars at an angle toward low pressure</em> (typically 10–45°). Strongest over rough terrain, mountains, forests. Negligible over water.</p>
            </div>
          </div>
        `,
        diagram: { type: 'hotspot', svgKey: 'wind_forces' }
      },
      {
        id: 's3_2', title: 'Upper Air vs. Surface Wind',
        content: `
          <p>Wind behaves very differently at altitude compared to near the surface, due to the presence (or absence) of the friction force:</p>
          <div class="fact-box">
            <span style="font-size:28px">🌐</span>
            <div><strong>Geostrophic Wind (Upper Air):</strong> Above ~2,000 ft AGL over flat terrain (the top of the friction layer), friction is negligible. PGF and Coriolis balance each other, resulting in wind that flows <em>parallel to isobars</em>. High pressure is to the right of the wind flow in the Northern Hemisphere (Buys-Ballot's Law).</div>
          </div>
          <p>At the surface, friction slows the wind. This reduces Coriolis force while PGF remains constant, causing the wind to turn toward low pressure and cross isobars at an angle:</p>
          <ul style="margin:12px 0;padding-left:20px;display:grid;gap:6px">
            <li><strong>Over water/smooth terrain:</strong> ~10° cross-isobar angle</li>
            <li><strong>Over rough terrain/mountains:</strong> up to 45° cross-isobar angle</li>
          </ul>
          <div class="callout">🧭 <strong>In the Northern Hemisphere:</strong> Surface wind flows <em>counterclockwise and inward</em> into Low pressure systems; <em>clockwise and outward</em> from High pressure systems. (Reversed in Southern Hemisphere.)</div>
        `,
        diagram: { type: 'hotspot', svgKey: 'surface_wind_forces' }
      },
      {
        id: 's3_3', title: 'Jet Streams',
        content: `<p>Jet streams are narrow ribbons of fast-moving air that meander around the globe near the tropopause. They form where large temperature gradients exist between air masses — the bigger the temperature difference, the faster the jet.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">JET STREAM QUICK REFERENCE</div>
            ${[
              ['Polar Jet Stream','30–60°N latitude','35,000–40,000 ft','60–200 kt (can exceed 250 kt)'],
              ['Subtropical Jet','20–30°N latitude','~40,000 ft','50–150 kt'],
            ].map(([name,...vals])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,0.08);padding:10px 0">
              <div style="color:#38BDF8;font-weight:700;font-size:14px;margin-bottom:6px">${name}</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                ${['Latitude','Altitude','Speed'].map((k,i)=>`<div style="font-size:12px"><span style="color:#94A3B8">${k}: </span><span>${vals[i]}</span></div>`).join('')}
              </div>
            </div>`).join('')}
          </div>
          <div class="danger-callout">⚠️ <strong>Clear Air Turbulence (CAT):</strong> Strong wind shear on the edges of jet streams causes CAT — severe turbulence with no visual warning (no clouds). Most common 150 miles north of the jet core, and near troughs in the jet stream. CAT is a primary reason to check winds/temps aloft forecasts before every IFR flight.</div>
          <p>For westbound flights, jet streams increase headwinds dramatically. For eastbound flights, riding the jet core can save significant fuel and time. Flight planning software always considers jet position.</p>
        `,
        diagram: { type: 'hotspot', svgKey: 'jet_stream' }
      },
      {
        id: 's3_4', title: 'Local Winds',
        content: `<p>Local winds are small-scale circulations, driven by <strong>diurnal (daily) heating and cooling</strong> of different surface types. They can dominate when synoptic winds are weak.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['🌊 Sea Breeze','Day','Sea → Land','Land heats faster than water. Low pressure over warm land, high over cool sea. Blows inland during afternoon. Can trigger thunderstorms over Florida!'],
              ['🌙 Land Breeze','Night','Land → Sea','Land cools faster than water at night. Reversal of sea breeze. Usually weaker than sea breeze.'],
              ['⛰️ Valley Breeze','Day','Valley → Mountain','Sun-heated slopes are warmer than air above valley. Air rises up slopes. Can build cumulus over peaks by afternoon.'],
              ['❄️ Mountain Breeze','Night','Mountain → Valley','Slopes cool via radiation. Dense cold air drains downslope. Creates cold pooling in valleys.'],
              ['💨 Downslope Winds','Any','Mountain → Plains','Chinook (Rockies), Santa Ana (CA), Foehn (Alps). Warm, dry, fast winds on lee side of mountains. Can cause rapid fire weather.']
            ].map(([icon,time,dir,desc])=>`
            <div style="background:white;border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">${icon}</strong>
                <div style="display:flex;gap:6px">
                  <span style="background:#F1F5F9;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;color:#64748B">${time}</span>
                  <span style="background:#E0F2FE;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;color:#0284C7">${dir}</span>
                </div>
              </div>
              <p style="font-size:13px;color:#475569;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
        `
      }
    ],
    quiz: [
      {
        id: 'q_m3_1', type: 'mc',
        question: 'The Pressure Gradient Force (PGF) directs wind:',
        options: ['Parallel to isobars, from west to east','From high pressure to low pressure, perpendicular to isobars','From low pressure to high pressure','Vertically, from surface to tropopause'],
        correct: 1, xp: 10,
        explanation: 'PGF acts perpendicular to isobars, pushing air from HIGH toward LOW pressure. The magnitude of PGF depends on how tightly packed the isobars are — closely-spaced isobars = strong PGF = fast wind.',
        faaRef: 'Ch. 10'
      },
      {
        id: 'q_m3_2', type: 'mc',
        question: 'Coriolis force deflects wind in the Northern Hemisphere:',
        options: ['To the left','To the right','Downward','It has no effect in the Northern Hemisphere'],
        correct: 1, xp: 10,
        explanation: 'Coriolis deflects wind to the RIGHT in the Northern Hemisphere (to the left in the Southern Hemisphere). This is why NH low-pressure systems spin counterclockwise (winds deflected right create the rotation pattern) and highs spin clockwise.',
        faaRef: 'Ch. 10'
      },
      {
        id: 'q_m3_3', type: 'mc',
        question: 'Geostrophic (upper-level) winds flow:',
        options: ['Perpendicular to isobars, toward low pressure','Parallel to isobars — PGF and Coriolis are balanced','In a circular pattern around high pressure only','From equator to poles at all altitudes'],
        correct: 1, xp: 10,
        explanation: 'Above ~2,000 ft AGL over flat terrain (the top of the friction layer), friction is negligible. PGF and Coriolis come into balance, resulting in wind flowing parallel to isobars. This is the geostrophic wind. It\'s why you can determine pressure gradient from wind direction at altitude.',
        faaRef: 'Ch. 10'
      },
      {
        id: 'q_m3_4', type: 'scenario',
        scenario: 'You are planning a westbound IFR flight at FL360. The winds-aloft forecast shows 280°/85 knots — unusually strong headwinds. You note the jet stream is positioned directly along your route.',
        question: 'What is the BEST strategic response to this situation?',
        options: [
          'Fly at FL360 as planned — jet stream winds are always favorable',
          'Request a routing south of the jet core to avoid peak headwinds, or consider a lower altitude outside the jet',
          'Increase cruise speed to counteract headwinds — thrust will overcome the jet',
          'File IFR alternate only — jet stream has no impact on fuel planning'
        ],
        correct: 1, xp: 20,
        explanation: 'The jet core creates maximum headwinds for westbound flights. Routing south of the jet (laterally) or selecting an altitude outside the jet stream (below ~30,000 ft often) can significantly reduce headwind component. Fuel planning must account for actual winds, not just forecast winds — always check SIGWX and winds aloft charts.',
        faaRef: 'Ch. 9'
      },
      {
        id: 'q_m3_5', type: 'timed',
        timeLimit: 10,
        question: 'A sea breeze blows:',
        options: ['From land to sea, during the night','From sea to land, during the day','From sea to land, during the night','From land to sea, all day'],
        correct: 1, xp: 20,
        explanation: 'Sea breeze blows FROM sea TO land during the DAY, because land heats faster than water → lower pressure over hot land → air flows from high (cool sea) to low (warm land). Land breeze is the night reversal (land cools faster).',
        faaRef: 'Ch. 10'
      },
      {
        id: 'q_m3_6', type: 'mc',
        question: 'Clear Air Turbulence (CAT) most commonly occurs:',
        options: ['Inside thunderstorm anvils','On the edges of jet streams, especially the northern periphery','Near the surface in unstable air','Only below 10,000 ft MSL'],
        correct: 1, xp: 10,
        explanation: 'CAT forms from strong wind shear at the edges of jet streams — especially the northern (cyclonic shear) side. It provides NO visual warning (no clouds). It is most severe in jet streaks and near troughs in the jet stream pattern.',
        faaRef: 'Ch. 9'
      },
      {
        id: 'q_m3_7', type: 'scenario',
        scenario: 'You are westbound from KCLT to KAVL at 6,000 ft. ATIS at KCLT reported wind 200°/12 kt. ATIS at KAVL is now reporting wind 280°/18 kt G28. ATC has just issued a SIGMET for severe turbulence and an AIRMET Tango update along your route. No fronts were forecast at briefing time.',
        question: 'What is the most likely cause of the wind shift, and what action should you consider?',
        options: [
          'Normal diurnal change — continue as planned; the wind difference is mechanical from terrain',
          'A cold front is passing or has just passed between the two airports — the abrupt clockwise wind shift, gusts, and new turbulence advisory are classic frontal-passage signatures. Reassess: descend to a lower altitude unaffected by frontal turbulence, divert, or hold short of the boundary until the front clears.',
          'A warm front is approaching — expect smoother conditions and continue',
          'Coriolis deflection has reversed; this happens routinely in mountain regions'
        ],
        correct: 1, xp: 20,
        explanation: 'A clockwise wind shift (veering) from south to west, combined with new turbulence advisories and gust onset, is a textbook surface signature of a cold-front passage in the Northern Hemisphere. Even when not forecast, these in-flight clues should drive an immediate reassessment. Buys-Ballot\'s Law (NH wind: Low to your left when back is to the wind) is the static framework; a moving front is the dynamic application. The practical tool: when in-flight winds and observations diverge from the brief, the brief is stale.',
        faaRef: 'Ch. 10, 12', concept: 'wind_mechanics'
      },
      {
        id: 'q_m3_8', type: 'timed',
        timeLimit: 10,
        question: 'In the Northern Hemisphere, surface winds around a LOW pressure system circulate:',
        options: ['Clockwise and outward','Counterclockwise and inward','Counterclockwise and outward','Clockwise and inward'],
        correct: 1, xp: 15,
        explanation: 'NH surface winds spiral COUNTERCLOCKWISE and INWARD into Low pressure centers (friction causes inflow). HIGH pressure spirals CLOCKWISE and OUTWARD. Reversed in Southern Hemisphere. This is a foundational concept for reading surface weather charts.',
        faaRef: 'Ch. 10'
      },
      {
        id: 'q_m3_9', type: 'mc',
        question: 'The Coriolis force causes wind to deflect to the RIGHT in the Northern Hemisphere. At what location is the Coriolis effect ZERO?',
        options: ['The North Pole', 'The Equator', 'At 45° North latitude', 'Above the tropopause'],
        correct: 1, xp: 10,
        explanation: 'Coriolis force is caused by Earth\'s rotation and is proportional to the sine of latitude. At the equator (0° latitude), sin(0°) = 0, so Coriolis force is zero — winds move directly from high to low pressure without deflection. At the poles (90°), Coriolis is maximum. This is why tropical weather systems can develop rotation only when they drift far enough from the equator.',
        faaRef: 'Ch. 9'
      },
      {
        id: 'q_m3_10', type: 'mc',
        question: 'Why do winds at altitude (above the friction layer) flow nearly parallel to isobars rather than crossing them?',
        options: [
          'Friction is reduced at altitude, so only pressure gradient force and Coriolis force are in balance — producing geostrophic flow parallel to isobars',
          'Jet streams force winds to follow isobars at all altitudes',
          'The tropopause acts as a physical boundary preventing cross-isobar flow',
          'Upper-level winds have no pressure gradient, so they follow the contours of constant pressure surfaces'
        ],
        correct: 0, xp: 10,
        explanation: 'Near the surface, friction slows the wind — the Coriolis force is reduced, and the pressure gradient force can push air across isobars toward low pressure (15–45° angle). Above ~2,000 ft (the friction layer), friction is negligible. Coriolis fully balances the pressure gradient force, producing GEOSTROPHIC wind that flows parallel to isobars (or height contours on constant-pressure charts).',
        faaRef: 'Ch. 10'
      }
    ,
      {id:'q_m3_11',type:'mc',question:'Buys-Ballot’s Law states that in the Northern Hemisphere, if you stand with your back to the wind:',options:['High pressure is to your left, low pressure is to your right','Low pressure is to your left, high pressure is to your right','High pressure is directly ahead, low pressure is directly behind','Wind always blows from high to low pressure in a straight line'],correct:1,xp:10,explanation:'Buys-Ballot’s Law: stand with your back to the wind in the NH — low pressure is to your LEFT (slightly ahead), high pressure is to your RIGHT. This works because the Coriolis force deflects wind to the right, causing it to spiral counterclockwise around lows and clockwise around highs. Practical use: if a storm system is to your north and you’re flying south, the wind will be from the west (favorable tailwind). If flying north, the wind will be from the east (headwind).',faaRef:'Ch. 10',concept:'wind_mechanics'},
      {id:'q_m3_12',type:'scenario',scenario:'You are at KJQF planning a flight to KRDU (47 NM northeast). Winds aloft at 6,000 ft show 25018KT. At 3,000 ft: 27015KT. Surface wind at departure: 290/08KT.',question:'Based on wind data, what can you conclude about today’s winds in the Piedmont?',options:['Winds are calm and variable — no useful information','Westerly winds throughout all levels with increasing speed aloft. Consistent with the normal pattern — backing from surface (290) to 3,000 ft (270) then shifting slightly more northwesterly aloft (250) with increasing speed. Good for an eastbound flight with tailwind component to KRDU.','The westerly winds indicate an approaching cold front — delay the flight','You should fly at 3,000 ft to minimize headwind'],correct:1,xp:15,explanation:'The wind data shows consistent westerly flow increasing with altitude: surface 290/8kt, 3,000 ft 270/15kt, 6,000 ft 250/18kt. This is a normal westerly wind profile. An eastbound flight to KRDU (northeast) with a westerly wind component will have a favorable tailwind/crosswind. No frontal pattern indicated — just synoptic westerly flow. Flying at 6,000 ft gives the most favorable wind for this eastbound leg.',faaRef:'Ch. 10'}
    ]
  },

  // ================================================
  // MODULE 4: CLOUDS & STABILITY
  // ================================================
  {
    id: 'm4', act: 1, title: 'Clouds & Stability', subtitle: 'Lapse rates, inversions & cloud types',
    icon: '☁️', color: '#8B5CF6', bgColor: '#F5F3FF', prerequisites:['m1','m2'],
    xpReward: 200, estimatedMin: 16,
    faaRef: 'FAA-H-8083-28A Chapters 12, 13, 14',
    sections: [
      {
        id: 's4_1', title: 'Atmospheric Stability',
        content: `
          <p>Atmospheric stability determines <em>whether a parcel of air, when lifted, will continue to rise (unstable) or sink back down (stable)</em>. It is the single most important concept for predicting cloud type, turbulence, and weather severity.</p>
          <p>The key comparison is between <strong>how fast a rising air parcel cools</strong> versus <strong>how fast the surrounding atmosphere cools with altitude</strong>:</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">LAPSE RATE QUICK REFERENCE</div>
            ${[
              ['DALR — Dry Adiabatic Lapse Rate','3°C / 1,000 ft (5.4°F)','Unsaturated rising parcel'],
              ['MALR — Moist (Saturated) Adiabatic LR','~1.5–2°C / 1,000 ft (varies)','Saturated rising parcel (condensing)'],
              ['SLR — Standard (ISA) Lapse Rate','2°C / 1,000 ft (3.5°F)','ISA model atmosphere'],
              ['ELR — Environmental Lapse Rate','Variable (measured)','Actual atmosphere you fly through'],
            ].map(([name,rate,note])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,0.08);padding:10px 0">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                <span style="color:#38BDF8;font-size:12px;font-weight:700;font-family:var(--font-display);flex:1">${name}</span>
                <span style="color:#F59E0B;font-size:13px;white-space:nowrap">${rate}</span>
              </div>
              <div style="font-size:11px;color:#64748B;margin-top:3px;font-family:var(--font-display)">${note}</div>
            </div>`).join('')}
          </div>
        `,
        diagram: { type: 'slider', svgKey: 'stability_comparison' }
      },
      {
        id: 's4_1b', title: 'Lapse Rate Graph',
        content: `<p>Use this interactive graph to visualize how different Environmental Lapse Rates (ELR) relate to the DALR and MALR reference lines — and how that determines stability. Drag the slider and watch the stability category change.</p>`,
        diagram: { type: 'slider', svgKey: 'lapse_rate_graph' }
      },
      {
        id: 's4_2', title: 'Stability Categories',
        content: `
          <p>By comparing the Environmental Lapse Rate (ELR — the actual atmosphere) to the adiabatic lapse rates, we can classify atmospheric stability:</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['🔴 Absolutely Unstable','ELR > DALR (>3°C/1,000 ft)','A lifted parcel is ALWAYS warmer than surroundings. Vigorous convection guaranteed. Think towering cumulus, thunderstorms, extreme turbulence.','var(--rose-light)','var(--rose)'],
              ['🟡 Conditionally Unstable','MALR < ELR < DALR','MOST COMMON state. Stable for unsaturated (dry) parcels, unstable once saturation is reached. Key trigger: enough moisture + lift. Afternoon thunderstorms in summer.','var(--amber-light)','var(--amber)'],
              ['🟢 Absolutely Stable','ELR < MALR (<1.5°C/1,000 ft)','A lifted parcel is ALWAYS cooler than surroundings — it sinks back. Stratus clouds, widespread fog, steady light precip, smooth flying.','var(--emerald-light)','var(--emerald)']
            ].map(([title,condition,desc,bg,col])=>`
            <div style="background:${bg};border-radius:16px;padding:16px;border-left:4px solid ${col}">
              <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">${title}</strong>
              <div style="font-family:var(--font-mono);font-size:11px;color:#475569;margin:4px 0 8px;background:rgba(0,0,0,0.05);display:inline-block;padding:2px 8px;border-radius:6px">${condition}</div>
              <p style="font-size:13px;color:#475569;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
        
          <div style="background:#F5F3FF;border-radius:12px;padding:14px;margin-top:14px;border-left:3px solid #7C3AED">
            <strong style="font-family:var(--font-display);font-size:13px;color:var(--navy)">Lifting Condensation Level (LCL) & Level of Free Convection (LFC)</strong>
            <p style="font-size:13px;color:#475569;margin:6px 0 0">The <strong>LCL</strong> is where a rising unsaturated parcel first becomes saturated — the cloud base. Estimated from surface T-Td: LCL ≈ (T−Td in °C) × 400 ft AGL. Spread of 10°C = ~4,000 ft cloud base. The <strong>LFC</strong> is where the parcel becomes warmer than surrounding air and rises freely without further forcing. Above the LFC the atmosphere is absolutely unstable for that parcel. <strong>Popcorn convection</strong> develops when afternoon heating lifts many parcels past their LFC simultaneously — isolated CBs pop up across a region with little warning.</p>
          </div>`
      },
      {
        id: 's4_3', title: 'Cloud Classification',
        content: `
          <p>Clouds are classified by their <strong>form</strong> (cumuliform vs. stratiform) and <strong>altitude level</strong>. FAA Appendix A covers all cloud types — here are the pilot-critical ones:</p>
          <div style="display:grid;gap:8px;margin:16px 0">
            ${[
              ['HIGH (>20,000 ft)','Ice crystal clouds','☁️','#E0F2FE','#0284C7',['Cirrus (Ci) — thin wispy streaks, first sign of approaching warm front','Cirrostratus (Cs) — thin sheet, produces halos around sun/moon','Cirrocumulus (Cc) — "mackerel sky," rippled appearance, rare']],
              ['MIDDLE (6,500–20,000 ft)','Mixed ice & water','🌤️','#EEF2FF','#6366F1',['Altostratus (As) — gray/blue sheet, "ground glass" appearance; can produce continuous rain','Altocumulus (Ac) — gray/white patches; "castellanus" type signals instability']],
              ['LOW (<6,500 ft)','Liquid water droplets','🌫️','#D1FAE5','#10B981',['Stratus (St) — gray uniform layer, drizzle; IFR hazard with low ceilings','Stratocumulus (Sc) — lumpy rolls, most common cloud type worldwide','Nimbostratus (Ns) — dark, featureless, continuous moderate to heavy rain/snow']],
              ['VERTICAL DEVELOPMENT','Surface to tropopause','⛈️','#FFE4E6','#F43F5E',['Cumulus (Cu) — fair weather to towering; indicates convective instability','Cumulonimbus (Cb) — THE hazard cloud. Thunderstorm. Avoid by 20 NM in IMC.']]
            ].map(([level,desc,icon,bg,col,clouds])=>`
            <div style="background:${bg};border-radius:14px;padding:14px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:20px">${icon}</span>
                <div>
                  <strong style="font-family:var(--font-display);font-size:14px;color:${col}">${level}</strong>
                  <div style="font-size:12px;color:#64748B">${desc}</div>
                </div>
              </div>
              <ul style="margin:0;padding-left:16px;display:grid;gap:4px">
                ${clouds.map(c=>`<li style="font-size:13px;color:#334155">${c}</li>`).join('')}
              </ul>
            </div>`).join('')}
          </div>
        `,
        diagram: { type: 'hotspot', svgKey: 'cloud_gallery' }
      },
      {
        id: 's4_4', title: 'Temperature Inversions',
        content: `
          <p>A <strong>temperature inversion</strong> is a layer where temperature <em>increases</em> with altitude — the inverse of the normal lapse rate. Inversions are <strong>absolutely stable</strong> layers that have major aviation implications.</p>
          <div class="fact-box">
            <span style="font-size:28px">🌡️</span>
            <div><strong>How Inversions Form:</strong> Radiation cooling of the surface at night; subsidence (sinking air in high-pressure systems); advection of warm air over cold surface; cold air drainage into valleys.</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">
            ${[
              ['✅ Above the inversion','Smooth VMC flying conditions','Clear visibility','Low turbulence','Temperature increases'],
              ['⚠️ Below the inversion','Restricted visibility & ceilings','Fog formation likely','Trapped pollution / smoke haze','Temperature decreases normally']
            ].map(([title,...items])=>`
            <div style="background:white;border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,0.05)">
              <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:var(--navy);margin-bottom:8px">${title}</div>
              ${items.map(i=>`<div style="font-size:12px;color:#475569;padding:3px 0;border-bottom:1px solid #F1F5F9">• ${i}</div>`).join('')}
            </div>`).join('')}
          </div>
          <div class="danger-callout">⚠️ <strong>Wind Shear at Inversion Boundary:</strong> The transition from calm inversion air to normal flow above can create significant low-level wind shear — a critical hazard during approach and takeoff. PIREP wind shear reports are vital when inversions are present.</div>
        `,
        diagram: { type: 'process', key: 'temperature_inversion' }
      }
    ],
    quiz: [
      {
        id: 'q_m4_1', type: 'mc',
        question: 'Cumuliform clouds indicate that the atmosphere is:',
        options: ['Stable — air is resistant to vertical motion','Unstable — air parcel rises freely when lifted','In a temperature inversion — smooth conditions','Absolutely stable — stratus will follow'],
        correct: 1, xp: 10,
        explanation: 'Cumuliform clouds (cumulus, cumulonimbus) are the "fingerprint" of an UNSTABLE atmosphere. Their vertical development means lifted parcels are warmer than surroundings and keep rising. Stratiform clouds indicate stability.',
        faaRef: 'Ch. 12, 13'
      },
      {
        id: 'q_m4_2', type: 'mc',
        question: 'The Dry Adiabatic Lapse Rate (DALR) is:',
        options: ['2°C per 1,000 ft — same as the Standard Lapse Rate','3°C (5.4°F) per 1,000 ft','1.5°C per 1,000 ft — the Moist Adiabatic Lapse Rate','Variable, changes with humidity'],
        correct: 1, xp: 10,
        explanation: 'The DALR is 3°C (5.4°F) per 1,000 ft — the rate at which an UNSATURATED parcel of air cools as it rises adiabatically. Once saturation is reached, latent heat release slows the cooling to the MALR (~1.5–2°C/1,000 ft).',
        faaRef: 'Ch. 13'
      },
      {
        id: 'q_m4_3', type: 'mc',
        question: 'For the atmosphere to be ABSOLUTELY UNSTABLE, the Environmental Lapse Rate (ELR) must:',
        options: ['Be less than the MALR','Equal the Standard Lapse Rate exactly','Exceed the DALR (>3°C/1,000 ft)','Exceed the MALR but be less than the DALR'],
        correct: 2, xp: 10,
        explanation: 'Absolutely unstable: ELR > DALR. In this case, a rising parcel (even unsaturated) is always warmer than the environment and keeps rising freely. This produces vigorous convection, towering cumulus, and thunderstorms.',
        faaRef: 'Ch. 13'
      },
      {
        id: 'q_m4_4', type: 'drag_drop',
        question: 'Match each cloud type to its correct altitude level:',
        items: ['Cirrus', 'Altostratus', 'Stratus', 'Cumulonimbus'],
        targets: ['HIGH (>20,000 ft)', 'MIDDLE (6,500–20,000 ft)', 'LOW (<6,500 ft)', 'VERTICAL DEVELOPMENT'],
        answers: {'Cirrus':'HIGH (>20,000 ft)', 'Altostratus':'MIDDLE (6,500–20,000 ft)', 'Stratus':'LOW (<6,500 ft)', 'Cumulonimbus':'VERTICAL DEVELOPMENT'},
        xp: 20,
        explanation: 'Cloud altitude classification: HIGH = cirrus family (ice crystals); MIDDLE = alto prefix; LOW = strato prefix; Vertical development = cumulus family (surface to tropopause).',
        faaRef: 'Ch. 12, App. A'
      },
      {
        id: 'q_m4_5', type: 'timed',
        timeLimit: 8,
        question: 'A temperature inversion ALWAYS creates:',
        options: ['Absolute instability — cumulonimbus likely','Absolute stability — the inverted layer resists convection','Conditionally unstable conditions','Geostrophic wind at the surface'],
        correct: 1, xp: 25,
        explanation: 'A temperature inversion (temperature INCREASING with altitude) is absolutely stable. The layer strongly resists any vertical motion. Air forced upward into the inversion will be colder than the environment and sink back down.',
        faaRef: 'Ch. 13'
      },
      {
        id: 'q_m4_6', type: 'scenario',
        scenario: 'You are on an IFR approach in IMC. The PIREP 30 minutes ago reported "smooth below 3,000, top of smooth at 3,500, encountered moderate turbulence just above 3,500 ft." OAT at the surface is 48°F. The 3,000 ft temperature is 55°F.',
        question: 'What meteorological phenomenon does this describe, and what primary hazard should you brief for the approach?',
        options: [
          'Cold front passage — expect improving conditions during approach',
          'Temperature inversion with wind shear at the inversion top — low-level wind shear during approach',
          'Absolutely unstable atmosphere — expect convective turbulence',
          'Tropopause intersection — no hazard below 3,500 ft'
        ],
        correct: 1, xp: 25,
        explanation: 'Temperature increasing from 48°F at surface to 55°F at 3,000 ft = temperature inversion. The turbulence at 3,500 ft marks the top of the inversion where wind shear occurs. Low-level wind shear during approach is a serious hazard — sudden airspeed loss and/or sink rate changes require significant power/attitude corrections.',
        faaRef: 'Ch. 13'
      },
      {
        id: 'q_m4_7', type: 'mc',
        question: 'Altocumulus castellanus clouds in the morning sky are a strong signal of:',
        options: ['Stable conditions — expect smooth flights all day','Significant instability aloft — afternoon thunderstorms likely','A warm front approaching within 6 hours','High-altitude icing but stable surface conditions'],
        correct: 1, xp: 10,
        explanation: 'Altocumulus castellanus (Ac cas) are turreted, castle-like cumulus towers growing from an altocumulus layer. They indicate significant instability in the MIDDLE troposphere. When seen in the morning, they are a reliable predictor of severe afternoon convection — a classic "severe storm day" indicator used by forecasters.',
        faaRef: 'Ch. 12'
      },
      {
        id: 'q_m4_8', type: 'drag_drop',
        question: 'Match each cloud description to the correct cloud type:',
        items: ['Wispy ice streaks — warm front signal', 'Dark featureless — continuous rain', 'Lumpy rolls — most common worldwide', 'Extreme hazard — avoid 20 NM'],
        targets: ['Cirrus', 'Nimbostratus', 'Stratocumulus', 'Cumulonimbus'],
        answers: {
          'Wispy ice streaks — warm front signal': 'Cirrus',
          'Dark featureless — continuous rain': 'Nimbostratus',
          'Lumpy rolls — most common worldwide': 'Stratocumulus',
          'Extreme hazard — avoid 20 NM': 'Cumulonimbus'
        },
        xp: 20,
        explanation: 'Cloud ID key: Cirrus = wispy ice streaks (warm front signal); Nimbostratus = dark featureless continuous precip (IFR hazard); Stratocumulus = most common cloud type globally; Cumulonimbus = thunderstorm, avoid 20 NM in IMC.',
        faaRef: 'Ch. 12, App. A'
      },
      {
        id: 'q_m4_9', type: 'mc',
        question: 'An Environment Lapse Rate (ELR) of 2.5°C/1,000 ft means the atmosphere is:',
        options: [
          'Absolutely unstable — ELR exceeds the DALR (3°C/1,000 ft)',
          'Conditionally unstable — ELR is between the MALR (~1.5°C) and DALR (3°C/1,000 ft)',
          'Absolutely stable — ELR is less than the MALR (1.5°C/1,000 ft)',
          'Neutrally stable — ELR exactly equals the DALR'
        ],
        correct: 1, xp: 10,
        explanation: 'Stability categories by ELR: Absolutely Unstable = ELR > DALR (3°C/1,000 ft) — any parcel rises freely. Conditionally Unstable = ELR between MALR (~1.5°C) and DALR (3°C) — dry parcels are stable, saturated (cloudy) parcels are unstable. Absolutely Stable = ELR < MALR (1.5°C) — all parcels are stable. At 2.5°C/1,000 ft, the atmosphere is CONDITIONALLY UNSTABLE — the most common aviation scenario.',
        faaRef: 'Ch. 13'
      },
      {
        id: 'q_m4_10', type: 'timed',
        timeLimit: 10,
        question: 'Towering cumulus clouds (TCu) are a visual indication of:',
        options: [
          'A stable atmosphere with strong inversions',
          'Strong convective instability — significant turbulence within and below, potential CB development',
          'Cirrus-level ice clouds indicating a distant warm front',
          'Orographic lift producing harmless cumulus over terrain'
        ],
        correct: 1, xp: 15,
        explanation: 'Towering cumulus (TCu) are the visual fingerprint of strong convective instability. They signal: severe turbulence below and inside the cloud, strong updrafts exceeding 1,000 fpm, icing above the freezing level, and potential cumulonimbus (CB) development. Give TCu the same respect as CB — treat the cloud top as the approximate upper limit of severe turbulence and stay well clear.',
        faaRef: 'Ch. 12, 13'
      }
    ,
      {id:'q_m4_11',type:'mc',question:'The Lifting Condensation Level (LCL) can be quickly estimated from a METAR using:',options:['Pressure and altimeter setting only','Temperature-dewpoint spread: LCL ≈ (T−Td in °C) × 400 ft AGL','Wind speed and direction at the surface','The difference between reported altitude and pressure altitude'],correct:1,xp:10,explanation:'LCL ≈ (T−Td)×400 ft AGL. A METAR showing T=24/Td=14 (spread=10°C) gives LCL≈4,000 ft AGL. This is why surface dewpoint matters so much — a spread of 2°C means cloud base near 800 ft AGL. Low T-Td spread = low ceilings. High spread = high bases, better VFR conditions.',faaRef:'Ch. 12',concept:'stability'}
    ]
  },

  // ================================================
  // MODULE 5: THE WEATHER MACHINE
  // ================================================
  {
    id: 'm5', act: 1, title: 'The Weather Machine', subtitle: 'Air masses, fronts & wave cyclones',
    icon: '🌪️', color: '#F59E0B', bgColor: '#FEF3C7', prerequisites:['m1','m3','m4'],
    xpReward: 225, estimatedMin: 18,
    faaRef: 'FAA-H-8083-28A Chapter 11',
    sections: [
      {
        id: 's5_1', title: 'Air Masses',
        content: `
          <p>An <strong>air mass</strong> is a large body of air with roughly uniform temperature and moisture properties. Air masses acquire these properties from their <em>source region</em> — where they form and stagnate. They then carry those properties across the continent.</p>
          <div style="display:grid;gap:8px;margin:16px 0">
            ${[
              ['cP','Continental Polar','Cold & DRY','Canadian prairies, Siberia','Winter outbreaks, clear air behind cold fronts, dangerous in icing conditions when modified','#E0F2FE','#0284C7'],
              ['mP','Maritime Polar','Cold & MOIST','N. Pacific, N. Atlantic','Fog, drizzle, and low ceilings on the West Coast; northeast US storms; lake-effect snow trigger','#EEF2FF','#6366F1'],
              ['cT','Continental Tropical','Hot & DRY','Desert SW, Mexico','Summer heat, dust storms, excellent visibility if no dust; contributes to fire weather','#FEF3C7','#D97706'],
              ['mT','Maritime Tropical','Warm & MOIST','Gulf of Mexico, Caribbean, subtropical Pacific','Primary moisture source for SE US weather; summer thunderstorms; warm front IFR conditions','#FFE4E6','#E11D48'],
              ['cA','Continental Arctic','Bitterly cold & DRY','Arctic Canada, Greenland, far interior Siberia','Deep winter cold air outbreaks behind strong cold fronts; clear/dry but extreme low temperatures; severe icing where it overruns moist air','#F5F3FF','#7C3AED'],
            ].map(([code,name,props,source,effects,bg,col])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;display:flex;gap:12px;align-items:flex-start">
              <div style="min-width:40px;height:40px;border-radius:12px;background:${col};display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;color:white;font-size:14px">${code}</div>
              <div>
                <strong style="font-family:var(--font-display);color:var(--navy);font-size:14px">${name} — <span style="color:${col}">${props}</span></strong>
                <div style="font-size:12px;color:#64748B;margin:3px 0">📍 Source: ${source}</div>
                <div style="font-size:12px;color:#475569">✈️ ${effects}</div>
              </div>
            </div>`).join('')}
          </div>
        `,
        diagram: { type: 'hotspot', svgKey: 'fronts_diagram' }
      },
      {
        id: 's5_2', title: 'Cold Fronts',
        content: `
          <p>A <strong>cold front</strong> forms where advancing cold, dense air forces lighter warm air upward. The front has a <em>steep slope</em> — the cold air acts "like a snowplow," aggressively undercutting the warm air.</p>
          <div style="background:#EFF6FF;border-radius:16px;padding:16px;margin:16px 0;border:2px solid #93C5FD">
            <div style="font-family:var(--font-display);font-weight:800;color:#1E40AF;margin-bottom:12px">❄️ COLD FRONT PASSAGE SEQUENCE</div>
            <div style="display:grid;gap:8px">
              ${[
                ['BEFORE (hours ahead)','Cirrus → Ci/Cs → towering cumulus. Pressure falling. Wind S/SW. Rising dewpoint.'],
                ['DURING PASSAGE','CB, heavy showers, possible thunderstorms, hail, lightning. Wind shift to W/NW — often abrupt. Rapid pressure drop then sharp rise. Visibility poor.'],
                ['AFTER PASSAGE','Rapidly improving visibility. Gusty NW winds. Temperature drop. Pressure rising. Cumulus to clearing. Classic \'cold, clear, and windy.\' ']
              ].map(([phase,desc])=>`
              <div style="background:white;border-radius:10px;padding:12px">
                <div style="font-family:var(--font-mono);font-size:10px;color:#3B82F6;font-weight:700;margin-bottom:4px">${phase}</div>
                <div style="font-size:13px;color:#334155">${desc}</div>
              </div>`).join('')}
            </div>
          </div>
          <div class="callout">📏 <strong>Speed:</strong> Cold fronts typically move 25–30 mph (can exceed 60 mph). Their <em>steep slope and fast movement</em> mean weather impacts are intense but shorter-duration than warm fronts.</div>
        `,
        diagram: { type: 'process', key: 'frontal_lifting' }
      },
      {
        id: 's5_3', title: 'Warm Fronts',
        content: `<p>A <strong>warm front</strong> is the boundary where advancing warm air rises gradually over a retreating cold air mass. The frontal slope is shallow (about 1:100 to 1:200) and movement is slow (typically 10–25 mph). The <em>gentle slope</em> means warm air rises gradually over a vast area, producing widespread weather hundreds of miles ahead of the surface front.</p>
          <div style="background:#FFF7ED;border-radius:16px;padding:16px;margin:16px 0;border:2px solid #FCD34D">
            <div style="font-family:var(--font-display);font-weight:800;color:#92400E;margin-bottom:12px">🔥 WARM FRONT PASSAGE SEQUENCE</div>
            <div style="display:grid;gap:8px">
              ${[
                ['FAR AHEAD (500–1000 mi)','Cirrus (first sign), Ci → Cs (halos), then As as front approaches. Pressure falling slowly.'],
                ['APPROACHING (50–200 mi)','Altostratus → Nimbostratus. Continuous rain or snow. Low ceilings, poor visibility, fog common. Classic IFR conditions.'],
                ['AFTER PASSAGE','Stratus/Stratocumulus. Drizzle possible. Temperature rises. Wind shifts S/SW. Visibility improves but haze may persist.']
              ].map(([phase,desc])=>`
              <div style="background:white;border-radius:10px;padding:12px">
                <div style="font-family:var(--font-mono);font-size:10px;color:#D97706;font-weight:700;margin-bottom:4px">${phase}</div>
                <div style="font-size:13px;color:#334155">${desc}</div>
              </div>`).join('')}
            </div>
          </div>
          <div class="callout">📏 <strong>Speed:</strong> Warm fronts move slowly — typically 10–25 mph. Their <em>gentle slope and slow movement</em> mean IFR conditions can persist for days. The widespread low ceilings and visibility restrictions make warm fronts a primary IFR planning challenge.</div>
        `
      },
      {
        id: 's5_4', title: 'Stationary, Occluded & Wave Cyclone',
        content: `
          <p>When cold and warm fronts become complex, two additional front types emerge — both with significant aviation implications:</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06)">
              <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">⏸️ Stationary Front</strong>
              <p style="font-size:14px;color:#475569;margin:8px 0 0">When two air masses are in equilibrium and neither advances. Weather is a mix of warm and cold front types. Can persist for days, producing prolonged IFR conditions. Depicted as alternating red/blue symbols on weather maps.</p>
            </div>
            <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06)">
              <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">🔄 Occluded Front</strong>
              <p style="font-size:14px;color:#475569;margin:8px 0 0">Cold fronts move faster and eventually overtake warm fronts. The cold air undercuts both fronts, forcing the warm air aloft. Result: weather from BOTH front types simultaneously. Embedded thunderstorms and icing are possible. Depicted as purple on weather maps.</p>
            </div>
          </div>
          <p>The <strong>Wave Cyclone Model</strong> describes the life cycle of mid-latitude weather systems that produce most significant weather in the continental US:</p>
          <div style="background:#F8FAFC;border-radius:14px;padding:14px;margin:12px 0">
            <div style="display:flex;align-items:center;gap:0;overflow-x:auto;padding-bottom:8px">
              ${['Stationary Front','Wave Forms','Low Intensifies','Mature Low','Occlusion','Dissipation'].map((stage,i)=>`
              <div style="text-align:center;flex-shrink:0;padding:0 8px">
                <div style="width:40px;height:40px;border-radius:50%;background:${['#E2E8F0','#DBEAFE','#EDE9FE','#FCE7F3','#D1FAE5','#F1F5F9'][i]};display:flex;align-items:center;justify-content:center;font-size:16px;margin:0 auto 6px">${['⏸️','🌀','⬆️','🌩️','🔄','☀️'][i]}</div>
                <div style="font-size:10px;font-weight:700;font-family:var(--font-display);color:#64748B;white-space:nowrap">${stage}</div>
              </div>
              ${i<5?'<div style="color:#CBD5E1;font-size:18px;flex-shrink:0">→</div>':''}`).join('')}
            </div>
          </div>
          <div class="callout">🗺️ <strong>Key Insight:</strong> A mature wave cyclone brings the full spectrum of weather hazards simultaneously: cold front thunderstorms to the southwest, warm sector IFR to the east, and warm front fog/low ceilings to the northeast — all rotating around the low pressure center.</div>
        `,
        diagram: { type: 'slider', svgKey: 'wave_cyclone' }
      },
      {
        id:'s5_5',title:'The Dryline',
        content:`
          <p>The <strong>dryline</strong> is one of the most potent severe weather triggers in the US. It appears directly on the FAA written exam and is critical for Central US operations.</p>
          <div class="fact-box"><span style="font-size:28px">🌾</span><div><strong>Definition:</strong> A boundary between dry continental air (SW deserts) and moist maritime tropical (mT) air from the Gulf. Unlike a cold front — temperatures are similar on both sides. Only moisture differs dramatically. Found in TX/OK/KS in spring.</div></div>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[['🌵 Dry Side (West)','Hot, dry — dewpoints 15–25°F. Excellent vis. No clouds. Looks benign.'],['🌊 Moist Side (East)','Warm, humid Gulf air — dewpoints 55–70°F. Hazy. Developing cumulus.'],['⚡ The Boundary','Invisible on temperature charts — only on dewpoint maps. Can produce the most violent thunderstorms in North America.']].map(([s,d])=>`<div style="background:white;border-radius:12px;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,.06)"><strong style="font-family:var(--font-display);color:var(--navy)">${s}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${d}</p></div>`).join('')}
          </div>
          <p>The dryline bulges <strong>eastward in the afternoon</strong> as heating intensifies — often triggering supercell thunderstorms by 3–5 PM. Combined with a shortwave trough, it can spawn a squall line with tornadoes and large hail with little visual warning to VFR pilots.</p>
          <div class="callout">📍 On a surface analysis chart, look for a sharp dewpoint gradient across the Southern Plains. On EFBs it often appears as a brown dashed line symbol.</div>
        `
      }
    ],
    quiz: [
      {
        id: 'q_m5_1', type: 'mc',
        question: 'Cold fronts are typically characterized by:',
        options: ['A gentle slope and slow movement (10–25 mph)','A steep slope, fast movement (25–30+ mph), and narrow intense weather band','Widespread stratiform clouds 500 miles ahead of the surface front','Gradual warming and improving conditions over 2–3 days'],
        correct: 1, xp: 10,
        explanation: 'Cold fronts have steep slopes (cold dense air acts like a snowplow) and move quickly (25–30 mph, up to 60 mph). This creates a NARROW band of intense weather — often squall lines — but weather clears quickly after passage.',
        faaRef: 'Ch. 11'
      },
      {
        id: 'q_m5_2', type: 'mc',
        question: 'The cloud sequence as a warm front approaches (from ahead to passage) is:',
        options: ['CB → As → Cs → Ci (deteriorating rapidly)','Ci → Cs → As → Ns → St (gradually lowering)','St → Ns → As → Cs → Ci (improving)','Ci → Cu → CB → clearing (unstable sequence)'],
        correct: 1, xp: 10,
        explanation: 'Warm front sequence from far ahead to passage: Cirrus (first sign, 500–1000 mi ahead) → Cirrostratus (halos) → Altostratus → Nimbostratus (continuous precip) → Stratus after passage. Think HIGH → MIDDLE → LOW as the front approaches.',
        faaRef: 'Ch. 11'
      },
      {
        id: 'q_m5_3', type: 'mc',
        question: 'Maritime Tropical (mT) air masses that affect the continental United States primarily originate from:',
        options: ['The Arctic Ocean north of Canada','The Canadian prairies and Great Plains','The Gulf of Mexico and Caribbean Sea','The North Pacific Ocean west of California'],
        correct: 2, xp: 10,
        explanation: 'Maritime Tropical (mT) air from the Gulf of Mexico and Caribbean is warm and VERY moist — the primary fuel for most severe weather events in the eastern and central US, including the tornado-prone "Tornado Alley" when mT air clashes with cold, dry cP air.',
        faaRef: 'Ch. 11'
      },
      {
        id: 'q_m5_4', type: 'scenario',
        scenario: 'You are planning a VFR cross-country from Dallas to Atlanta for tomorrow. Your weather briefing shows: a warm front 300 miles south of Atlanta moving northeast at 15 mph; ceiling at Atlanta is currently 3,500 BKN; forecast shows ceilings dropping to 500 OVC by arrival time; AIRMET Sierra for IFR conditions; fog and low visibility in precipitation.',
        question: 'What is your most appropriate course of action?',
        options: [
          'Depart as planned — warm fronts are slow, you can outrun it by flying fast',
          'Delay departure; the warm front will bring widespread IFR conditions before arrival — this flight requires an IFR rating and current IFR conditions filing',
          'Fly VFR at low altitude to stay below the lowering ceiling all the way to Atlanta',
          'Divert to a destination west of the warm front where conditions are clear'
        ],
        correct: 1, xp: 25,
        explanation: 'Warm fronts produce classic "scud running" traps — ceilings and visibility gradually lower over a vast area. VFR flight into IMC is the #1 killer in GA. The correct response: either delay/cancel VFR, divert to clear area, OR fly IFR if rated and current. Never attempt to "stay under" a lowering warm front ceiling.',
        faaRef: 'Ch. 11'
      },
      {
        id: 'q_m5_5', type: 'timed',
        timeLimit: 10,
        question: 'An occluded front forms when:',
        options: ['Two warm air masses converge','A cold front overtakes a warm front','A stationary front begins moving','High pressure absorbs a low-pressure system'],
        correct: 1, xp: 20,
        explanation: 'Cold fronts move faster than warm fronts. When the cold front catches the warm front, the three-way intersection creates an occluded front. The cold air undercuts both fronts, lifting warm air entirely off the surface. Result: complex weather from both front types.',
        faaRef: 'Ch. 11'
      },
      {
        id: 'q_m5_6', type: 'mc',
        question: 'Continental Polar (cP) air masses are characterized by:',
        options: ['Warm, moist conditions ideal for summer flying','Cold and dry conditions; clear air, high visibility','Cold and moist conditions; low ceilings and drizzle','Hot and dry conditions; dust and reduced visibility'],
        correct: 1, xp: 10,
        explanation: 'Continental Polar (cP) air originates over land (no moisture source) at high latitudes (cold). Result: cold, dry, and generally clear — excellent VFR conditions. However, cP air is the trigger for lake-effect snow when it crosses the Great Lakes, picking up moisture and instability.',
        faaRef: 'Ch. 11'
      },
      {
        id: 'q_m5_7', type: 'timed',
        timeLimit: 12,
        question: 'A dryline is best described as:',
        options: [
          'A line of dry thunderstorms with no precipitation reaching the ground',
          'A surface boundary separating moist air from dry air — often triggers severe storms',
          'A dry cold front with no precipitation',
          'An area of high pressure blocking moisture flow'
        ],
        correct: 1, xp: 15,
        explanation: 'A dryline is a low-level boundary separating moist maritime tropical (mT) air from dry continental tropical (cT) air. In the US it typically runs north-south through the southern plains. The clash of moist and dry air makes drylines prime initiation zones for severe thunderstorms and tornadoes — "Tornado Alley" in spring.',
        faaRef: 'Ch. 11'
      },
      {
        id: 'q_m5_8', type: 'scenario',
        scenario: 'You are flying VFR from Oklahoma City to Dallas on a spring afternoon. Weather briefing showed a stationary front along your route, now weakening. Surface analysis shows a dryline 50 miles west of your route. Skies are partly cloudy with developing cumulus. SA at OKC: 3 hours ago showed Ac castellanus.',
        question: 'What is the PRIMARY weather concern for this flight?',
        options: [
          'Fog forming along the stationary front — expect IFR near the boundary',
          'Rapid severe thunderstorm development along the dryline — potential for quickly deteriorating VFR conditions',
          'Structural icing in the cumulus clouds — request higher altitude',
          'Reduced visibility from dust storms on the dry side of the dryline'
        ],
        correct: 1, xp: 25,
        explanation: 'This scenario has multiple severe weather indicators stacked: stationary front (instability trigger), dryline (moisture/dry contrast = explosive development), spring afternoon heating, Ac castellanus seen earlier (middle-level instability). This is a classic setup for rapid, severe thunderstorm development along the dryline. The correct call: get a weather update and seriously consider delaying or canceling.',
        faaRef: 'Ch. 11'
      },
      {
        id: 'q_m5_9', type: 'mc',
        question: 'A cold front overtakes a warm front, forming an occluded front. What type of weather is most associated with an occlusion?',
        options: [
          'Clear, cold, and calm — the fronts cancel each other out',
          'Complex weather combining elements of both fronts — icing, embedded CBs, and widespread IFR',
          'Only light rain along a narrow band',
          'Fog only — no precipitation above the freezing level'
        ],
        correct: 1, xp: 10,
        explanation: 'An occluded front is the most complex frontal system. It combines elements of both the cold and warm fronts it replaced — you can get embedded thunderstorms, significant icing, widespread IFR, and complex ceiling/visibility conditions simultaneously. Occluded fronts also mark the later stages of a cyclone\'s life cycle — the low is often deepest and most intense near the point of occlusion.',
        faaRef: 'Ch. 11'
      },
      {
        id: 'q_m5_10', type: 'scenario',
        scenario: 'Mid-April afternoon along the I-20 corridor in Alabama and Georgia: a strong cold front is forecast to sweep east overnight. Surface dewpoints south of the front are 21–23°C; behind the front, dewpoints drop to 4–7°C. SPC has a Day-1 Enhanced Risk for severe storms across the warm sector. Temps aloft show steep mid-level lapse rates.',
        question: 'Which two air masses are colliding, and what does that mean for your evening departure from KATL?',
        options: [
          'cP overrunning mT — expect snow showers behind the front; depart now',
          'mT (warm and very moist Gulf air) being undercut by advancing cP (cold dry continental air) — the classic severe-weather setup. Tonight\'s squall line and discrete supercell potential make a delayed departure the right call.',
          'cT meeting mP — expect light drizzle and stable conditions',
          'cA overrunning cT — desert air movement, no significant weather expected'
        ],
        correct: 1, xp: 20,
        explanation: 'This is the textbook ingredients diagram for an Alabama/Georgia severe-weather episode: warm/moist mT from the Gulf in the warm sector, cold/dry cP advancing from the north-northwest, steep mid-level lapse rates supporting strong updrafts. SPC outlooks treat this air-mass collision as the primary driver of evening squall lines and discrete supercells along the front. Recognizing the air-mass labels lets you connect the briefing\'s SPC outlook to the underlying physics and plan a no-go or delayed departure.',
        faaRef: 'Ch. 11, 12', concept: 'air_masses'
      }
    ,
      {id:'q_m5_11',type:'mc',question:'The wave cyclone model describes the typical life cycle of a mid-latitude low pressure system. In which stage is the system most intense?',options:['The initial wave stage — when the front first develops a kink','The mature stage when the low has deepened and the cold front is catching the warm front, forming an occlusion','The occluded stage is weakening — intensity peaks during initial wave formation','Intensity remains constant throughout the wave cyclone life cycle'],correct:1,xp:10,explanation:'The wave cyclone life cycle: (1) initial wave — stationary or slow-moving front develops a kink; (2) open wave — low deepens, warm and cold fronts extend; (3) mature/maximum intensity — cold front accelerates, catching warm front; (4) occlusion — cold front overtakes warm front, lifting warm air completely off the ground; (5) dissolution — energy dissipates. Weather is most severe during the mature stage when pressure is lowest and fronts are most active.',faaRef:'Ch. 11',concept:'fronts'},
      {id:'q_m5_12',type:'scenario',scenario:'You are flying VFR northbound at 4,500 ft. Looking northwest, you observe: a thin band of cirrus, then a thicker layer of altostratus moving in from the northwest. Barometric pressure has been steadily falling for the past 3 hours.',question:'What synoptic situation does this pattern indicate, and what should you expect?',options:['Dissipating high pressure system — conditions will improve overnight','Classic warm front approach: cirrus first, then altostratus (with halos), then nimbostratus, rain, low ceilings. With falling pressure, expect IFR conditions within 6-12 hours. Consider diverting or landing before conditions deteriorate.','Cold front passage — quick clearing expected after heavy thunderstorms','Normal morning weather in the Piedmont — no action required'],correct:1,xp:20,explanation:'This is the textbook warm front sequence: Ci → Cs (halos) → As → Ns (rain) → St/fog (after passage). Falling pressure confirms an approaching low/warm front. Timeline: cirrus (12-24 hrs out), altostratus (6-12 hrs out), rain begins (3-6 hrs out). As a VFR pilot, this gives you a clear weather window closing. Land or divert to get ahead of the weather. If you wait for rain to begin, you may already be in IFR conditions. Trust the progression — it is very reliable.',faaRef:'Ch. 11'}
    ]
  },

  // ====== ACT 2: HAZARD ZONE ======
  // ============================================================
  // M6: THUNDERSTORMS
  // ============================================================
  {
    id:'m6',act:2,title:'Thunderstorms',subtitle:'Lifecycle, types & avoidance rules',
    icon:'⛈️',color:'#DC2626',bgColor:'#FEF2F2',prerequisites:['m4','m5'],
    xpReward:200,estimatedMin:18,faaRef:'FAA-H-8083-28A Chapter 22',
    sections:[
      {
        id:'s6_1',title:'The Three Ingredients',
        content:`
          <p>Every thunderstorm—from a garden-variety afternoon cell to a destructive supercell—requires the same three ingredients. Remove any one and the storm cannot form.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['💧','Moisture','Sufficient water vapor (high dewpoint). The fuel. Maritime Tropical (mT) air from the Gulf of Mexico supplies most US thunderstorm moisture. Dewpoints ≥55°F in summer signal significant potential.','#E0F2FE','#0284C7'],
              ['📈','Instability','Conditionally unstable air — the atmosphere must be willing to accelerate a lifted parcel upward. High lapse rates, warm surface temps, and cold air aloft all increase instability.','#FEF3C7','#D97706'],
              ['⬆️','Lifting Mechanism','Something must trigger the initial lift to release the instability: cold fronts, warm fronts, drylines, orographic lift, sea breeze convergence, outflow boundaries from prior storms.','#F5F3FF','#7C3AED']
            ].map(([icon,title,desc,bg,col])=>`
            <div style="background:${bg};border-radius:16px;padding:16px;border-left:4px solid ${col};display:flex;gap:12px">
              <span style="font-size:28px;flex-shrink:0">${icon}</span>
              <div><strong style="font-family:var(--font-display);color:${col}">${title}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p></div>
            </div>`).join('')}
          </div>
          <div class="danger-callout">☠️ <strong>All thunderstorms are hazardous.</strong> The FAA handbook states: "Weather recognizable as a thunderstorm should be considered hazardous, as penetration of any thunderstorm can lead to an aircraft accident and fatalities." There is no such thing as a "safe" thunderstorm to penetrate.</div>
        `,
        diagram:{type:'interactive',key:'cb_ingredients'}
      },
      {
        id:'s6_2',title:'Thunderstorm Cell Life Cycle',
        content:`
          <p>A single thunderstorm cell has a predictable three-stage lifecycle lasting approximately <span class="data-tag">30 minutes</span> total. Understanding each stage is critical for situational awareness when a storm develops near your route.</p>
        `,
        diagram:{type:'process',key:'thunderstorm_lifecycle'}
      },
      {
        id:'s6_3',title:'Thunderstorm Types',
        content:`
          <p>The FAA recognizes three principal thunderstorm types. All are hazardous; they differ in organization, duration, and threat level.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['Single-Cell','The "ordinary" storm. One convective cell through its 30-min lifecycle. Easiest to circumnavigate visually. Rare — almost all storms are multicell.','#FEF3C7','#D97706','⛅'],
              ['Multicell Cluster / Squall Line','Multiple cells at different lifecycle stages. Can persist for hours. Squall lines (QLCS) form along or ahead of cold fronts — hundreds of miles long. The primary convective barrier to air traffic. QLCS systems generate the bulk of weak (EF0–EF1) tornadoes nationally.','#FFE4E6','#DC2626','⛈️'],
              ['Supercell','A single, quasi-steady ROTATING updraft (mesocyclone). Updrafts can reach 9,000 fpm (100 kt). Produces extreme hail, damaging winds, and the majority — over 75% — of all significant (EF2+) tornadoes. May persist for hours. Hardest to circumnavigate.','#7F1D1D','#EF4444','🌪️']
            ].map(([title,desc,bg,col,icon])=>`
            <div style="background:${bg};border-radius:16px;padding:16px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:24px">${icon}</span>
                <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">${title}</strong>
              </div>
              <p style="font-size:13px;color:#475569;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
        `
      },
      {
        id:'s6_4',title:'The 10 Thunderstorm Hazards',
        content:`
          <p>Every thunderstorm contains multiple simultaneous hazards. You cannot visually determine which hazards a cell contains — assume all of them.</p>
          <div style="display:grid;gap:8px;margin:16px 0">
            ${[
              ['⚡','Lightning','Every CB produces it by definition. Can puncture skin, disable avionics, ignite fuel vapors, temporarily blind pilots, and permanently deviate the magnetic compass. Roughly 100 cloud-to-ground strikes per second worldwide (~8 million/day) — about 70,000 of those over CONUS.'],
              ['🌀','Severe Turbulence','Updrafts 3,000–9,000 fpm. Downdrafts alongside. Shear turbulence outside the cloud up to 20 mi laterally, and CAT beyond the anvil. Worst turbulence between updrafts and downdrafts.'],
              ['💨','Microburst / Downburst','Intense downdraft that spreads out on the surface. Microbursts: intense, < 2.5 mi diameter, ≤ 5 min duration. Creates severe low-level wind shear with headwind-to-tailwind transitions of 30–90 kt in seconds. Fatal to aircraft on approach.'],
              ['🌧️','Hail','Updrafts carry ice pellets to great heights. Hailstones can be baseball-sized. Can fall several miles outside the visible cloud. Can destroy an aircraft\'s airframe, engine, and windshield in seconds.'],
              ['🌫️','Low Ceiling & Visibility','Visibility near zero inside the cloud. Reduced ceiling and visibility in precipitation and rain-reduced visibility below the cloud base.'],
              ['🔋','Static Electricity','St. Elmo\'s Fire — corona discharge from sharp edges. Disrupts radio communications, especially HF/MF frequencies. Creates noise on comm radios.'],
              ['❄️','Icing','Severe icing at all levels above the freezing level. Clear ice most common; SLDs (Supercooled Large Drops) in heavy rain can accrete ice far aft of deicing equipment coverage.'],
              ['🌪️','Tornado','Supercells produce over 75% of significant (EF2+) tornadoes; QLCS/squall lines dominate weak (EF0–EF1) tornado counts. Wind > 200 kt estimated. Vortex typically hundreds of yards wide.'],
              ['📈','Rapid Altimeter Changes','Pressure falls as storm approaches, then rises sharply with the gust front. Cycle in 15 min. Uncorrected altimeter error > 100 ft possible.'],
              ['💧','Engine Water Ingestion','Heavy rain and hail can flameout or damage jet engines. Carbureted piston engines: carb ice risk in heavy moisture.']
            ].map(([icon,title,desc])=>`
            <div style="background:white;border-radius:14px;padding:12px 14px;border-left:4px solid #DC2626;box-shadow:0 2px 8px rgba(0,0,0,.05)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                <span>${icon}</span><strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${title}</strong>
              </div>
              <p style="font-size:13px;color:#475569;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
        `
      },
      {
        id:'s6_5',title:'Avoidance Rules & Go/No-Go',
        content:`
          <div class="danger-callout"><strong>FAA guidance (AC 00-24C / AIM 7-1-29):</strong> Do not penetrate, fly under, or enter embedded convective cloud layers. The avoidance distances below are FAA-published recommendations — treat them as floors, not aspirations.</div>
          <p>FAA-recommended avoidance distances:</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">MINIMUM AVOIDANCE DISTANCES (AC 00-24C / AIM 7-1-29)</div>
            ${[
              ['Severe / extreme intensity CBs, tops > FL350','Avoid by at least 20 NM'],
              ['Other CBs in VMC','Avoid by at least 5 NM laterally; more is better'],
              ['Beneath CB anvil','Avoid — hail and severe turbulence can extend well outside the visible core'],
              ['Circumnavigation','Upwind side is preferred, but evaluate the full storm picture'],
              ['Embedded CBs (no onboard radar)','Do not enter the convective cloud layer'],
            ].map(([scenario,rule])=>`
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;border-bottom:1px solid rgba(255,255,255,.08);padding:10px 0;font-size:12px">
              <span style="color:#94A3B8;flex:1">${scenario}</span>
              <span style="color:#F43F5E;font-weight:700;text-align:right">${rule}</span>
            </div>`).join('')}
          </div>
          <div class="callout">💡 <strong>Pirep strategy:</strong> When in doubt, deviate upwind (typically north or northwest of the storm in the Northern Hemisphere). This avoids the hail shaft and main precipitation core, which are typically on the northeast (downwind) side of the storm.</div>
          <div class="fact-box">
            <span style="font-size:28px">📡</span>
            <div><strong>Onboard radar limitation:</strong> Radar shows precipitation, NOT turbulence. Clear air between radar returns can contain severe turbulence. The "scalloped" or ragged edge of a storm return on radar typically indicates the most severe turbulence zone — the updraft/downdraft interface.</div>
          </div>
        `,
        diagram:{type:'interactive',key:'microburst_approach'}
      }
    ],
    quiz:[
      {
        id:'q_m6_1',type:'mc',
        question:'The three necessary ingredients for thunderstorm formation are:',
        options:['Fronts, cold air, and precipitation','Moisture, instability, and a lifting mechanism','Wind shear, moisture, and cold temperatures','Unstable air, jet stream, and maritime air'],
        correct:1,xp:10,
        explanation:'Every thunderstorm requires: (1) sufficient moisture/water vapor, (2) conditionally unstable air, and (3) a lifting mechanism (front, dryline, orographic lift, sea breeze, etc.) to release the instability. Remove any one and storm formation stops.',
        faaRef:'Ch. 22',concept:'thunderstorm_formation'
      },
      {
        id:'q_m6_2',type:'mc',
        question:'During which stage of the thunderstorm lifecycle does weather hazard intensity peak?',
        options:['Towering Cumulus stage — updraft is building','Early Mature stage — rain just reached surface','Late Mature stage — updrafts and downdrafts both active','Dissipating stage — storm weakening'],
        correct:2,xp:10,
        explanation:'The mature stage (marked by precipitation reaching the surface) has both powerful updrafts AND downdrafts simultaneously active — the most hazardous combination. Hazard intensity peaks toward the END of the mature stage. Total single-cell lifecycle: ~30 minutes.',
        faaRef:'Ch. 22',concept:'thunderstorm_formation'
      },
      {
        id:'q_m6_3',type:'mc',
        question:'What is a microburst and why is it particularly dangerous on approach?',
        options:[
          'A small but intense updraft that increases aircraft performance suddenly',
          'A concentrated downdraft that creates a headwind-to-tailwind wind shear transition, causing sudden airspeed and lift loss',
          'A tornado that forms from small-cell thunderstorms',
          'A type of clear air turbulence only found above the anvil'
        ],
        correct:1,xp:15,
        explanation:'A microburst is a small (< 2.5 mi), intense downdraft. An aircraft on approach first encounters a headwind (increasing airspeed/lift), then the transition to the downdraft and tailwind causes a sudden, potentially catastrophic loss of airspeed and lift. The aircraft drops below the glidepath. This sequence has caused numerous fatal accidents.',
        faaRef:'Ch. 22',concept:'wind_shear'
      },
      {
        id:'q_m6_4',type:'timed',
        timeLimit:10,
        question:'The minimum recommended clearance from a visible cumulonimbus in IMC is:',
        options:['5 NM','10 NM','20 NM','50 NM'],
        correct:2,xp:20,
        explanation:'The FAA recommends 20 NM clearance from a visible CB in IMC. In VMC, 5 NM is the minimum but 20 NM is strongly recommended. Hail can fall miles from the visible cloud boundary, and severe turbulence extends well beyond the visible cloud.',
        faaRef:'Ch. 22',concept:'thunderstorm_avoidance'
      },
      {
        id:'q_m6_5',type:'scenario',
        scenario:'You are flying IFR en route at FL240. Your onboard weather radar shows a large storm cell, but there appears to be a narrow gap between two return echoes. The gap is approximately 15 NM wide. You are low on fuel and the alternate is behind you.',
        question:'What is the safest course of action?',
        options:[
          'Penetrate the gap — radar shows no precipitation in the corridor',
          'Declare emergency, divert to nearest suitable airport for fuel, do not penetrate the storm area',
          'Descend to below the clouds to circumnavigate visually',
          'Speed up through the gap to minimize exposure time'
        ],
        correct:1,xp:25,
        explanation:'Radar gaps are not proof of a safe corridor - severe turbulence can exist between returns in the updraft/downdraft shear zones. Low fuel plus an embedded storm area supports declaring an emergency and diverting to the nearest suitable airport rather than trying to thread the gap.',
        faaRef:'Ch. 22'
      },
      {
        id:'q_m6_6',type:'mc',
        question:'A supercell thunderstorm is distinguished from other storm types by:',
        options:[
          'Its small size — supercells are compact single-cell storms',
          'A single, quasi-steady rotating updraft (mesocyclone) and potential for extreme hazards',
          'Its formation only in tropical environments',
          'Absence of lightning — supercells produce primarily hail and wind'
        ],
        correct:1,xp:10,
        explanation:'A supercell has a persistent, rotating updraft (mesocyclone) fed by directional wind shear. Updrafts can reach 9,000 fpm. It produces the most extreme weather: large hail, EF4-5 tornadoes, damaging winds. About 25% of supercells produce tornadoes. Duration can exceed several hours.',
        faaRef:'Ch. 22',concept:'thunderstorm_formation'
      },
      {
        id:'q_m6_7',type:'mc',
        question:'What does onboard weather radar primarily detect?',
        options:['Turbulence intensity and location','Ice crystal clouds and icing conditions','Precipitation (water droplets and hail)','Wind shear and microburst activity'],
        correct:2,xp:10,
        explanation:'Weather radar detects precipitation — reflected energy from water droplets and hail. It does NOT directly detect turbulence, icing, CAT, or wind shear. A clear corridor between radar returns can still contain severe turbulence. Radar is a precipitation avoidance tool, not an all-hazard detector.',
        faaRef:'Ch. 22',concept:'radar_products'
      },
      {
        id:'q_m6_8',type:'drag_drop',
        question:'Match each thunderstorm hazard to its primary threat to the aircraft:',
        items:['Lightning','Microburst','Hail','Icing above freezing level'],
        targets:['Avionics damage / temporary blindness','Sudden airspeed loss on approach','Airframe structural damage','Performance degradation / control loss'],
        answers:{
          'Lightning':'Avionics damage / temporary blindness',
          'Microburst':'Sudden airspeed loss on approach',
          'Hail':'Airframe structural damage',
          'Icing above freezing level':'Performance degradation / control loss',concept:'thunderstorm_hazards'
        },
        xp:20,
        explanation:'Each CB hazard has a specific threat profile: Lightning → avionics/temporary blindness; Microburst → wind shear on approach; Hail → structural damage at any altitude near CBs; Icing → degraded performance above the freezing level inside CBs.',
        faaRef:'Ch. 22'
      },
      {
        id:'q_m6_9',type:'scenario',
        scenario:'You are listening to ATC en route at 9,500 ft. A nearby aircraft files a PIREP: "UA /OV LIT270025 /TM 2010 /FL095 /TP BE36 /TB SEV /WX +TSRA /SK CB TOPS FL480 /RM HOOK ECHO ON RADAR W OF LIT." NEXRAD on your EFB shows an isolated cell with a pronounced curl on its southwest flank, ~30 NM ahead on your route. Convective SIGMET is active.',
        question:'Which is the correct read of the situation and the right action?',
        options:[
          'Multicell cluster — penetrate the gap between cores; multicell storms have predictable lulls',
          'A supercell signature: extreme tops (FL480), severe turbulence PIREP, hook echo, and an active Convective SIGMET. Deviate well clear (≥20 NM per AC 00-24C / AIM 7-1-29) on the upwind side; do NOT thread between cores.',
          'A dissipating cell — the high tops indicate it is no longer a hazard',
          'A regular squall-line cell — request lower altitude to fly under it'
        ],
        correct:1,xp:20,
        explanation:'Hook echo + extreme tops + severe-turb PIREP + active Convective SIGMET is the supercell calling card. The mesocyclone (rotating updraft) supports the most violent weather: large hail, damaging winds, and the majority of significant tornadoes. The FAA recommendation for severe/extreme intensity CBs is at least 20 NM avoidance — and the upwind side keeps you out of the hail core that typically falls downwind/right of the updraft.',
        faaRef:'Ch. 22',concept:'thunderstorm_formation'
      },
      {
        id:'q_m6_10',type:'timed',
        timeLimit:10,
        question:'A thunderstorm gust front can precede the visible storm by up to:',
        options:['1–2 miles','5 miles','15 miles','50 miles'],
        correct:2,xp:15,
        explanation:'Gust fronts — the arc-shaped leading edge of thunderstorm downdraft outflow — can surge up to 15 miles ahead of the parent storm. This means a seemingly clear airspace can suddenly experience severe turbulence, dramatic wind shifts, and rapidly deteriorating conditions well before the visible precipitation arrives.',
        faaRef:'Ch. 22',concept:'thunderstorm_hazards'
      }
    ,
      {id:'q_m6_11',type:'mc',question:'A squall line is considered the most effective barrier to air traffic because:',options:['Squall lines produce more lightning than any other storm type','Squall lines typically extend hundreds of miles, are too tall to fly over (CB tops FL400+), too dangerous to penetrate, and difficult to circumnavigate at the ends in time','Squall lines only form at night when ATC radar coverage is reduced','Squall lines produce exclusively ground-level hazards'],correct:1,xp:10,explanation:'Squall lines (organized lines of convection, often along or ahead of cold fronts) present the most comprehensive barrier: they extend hundreds of miles laterally, CB tops exceed FL400 (untoppable in GA and most airline aircraft), penetration is extremely hazardous, and circumnavigating the ends often means flying hundreds of miles off course. About 25% of all US tornadoes are spawned by squall lines. Early weather awareness and significant route deviation (or flight cancellation/delay) are the only safe options.',faaRef:'Ch. 22',concept:'thunderstorm_hazards'},
      {id:'q_m6_12',type:'scenario',scenario:'You observe a severe thunderstorm warning on your EFB for an area 45 NM to your west. The storm is moving northeast at 35 kt. Current position puts the storm on your route in approximately 77 minutes. Flight time to destination: 25 minutes.',question:'What is the most appropriate decision?',options:['Continue at maximum speed — you will arrive before the storm reaches your route','Divert to a closer airport and wait. The storm will pass through your route area in about 45 minutes at 35 kt — the timing is too close, and severe thunderstorms can produce hazards well ahead of the visible cell.','Request flight following and ask ATC to vector you through a gap in the storm','Descend to 1,500 ft AGL where convective turbulence is less severe'],correct:1,xp:20,explanation:'At 35 kt, the storm covers 45 NM in about 77 minutes. Your 25-minute flight puts you at the destination about 50 minutes before storm arrival — tight margin that ignores several hazards: (1) severe storms can produce hazards (hail, severe turbulence, microbursts) well outside the visible cell; (2) 35 kt is the estimated storm motion, actual speed may vary; (3) outflow boundaries can extend 30+ miles ahead. With a nearby alternate available, diverting and waiting 45-60 minutes is the low-risk choice. 25 minutes is not enough margin for a severe thunderstorm.',faaRef:'Ch. 22'},
      {id:'wb_m6_1',type:'wx_brief',
       title:'Afternoon Convection — KJQF to KAVL',
       mission:{departure:'KJQF',destination:'KAVL',aircraft:'Single-engine piston (no airborne weather radar)',
         pilot:'Private pilot, 320 hours, VFR only',ete:'1+10',fuel:'4.5 hours usable',
         departureTime:'1800Z (1400L EDT) — July'},
       products:[
         {type:'metar',label:'KJQF 1756Z',
          raw:'KJQF 131756Z 27010KT 10SM SCT040TCU BKN090 34/20 A3002 RMK AO2 TCU W SLP102',
          decoded:'Wind 270/10kt, 10SM, scattered towering cumulus at 4,000ft to the west, broken 9,000ft. Temp 34C / dew 20C — 14C spread, active surface heating. VFR at departure. Note the TCU remark: towering cumulus building to the west toward the mountains.'},
         {type:'taf',label:'KAVL TAF (issued 1140Z)',
          raw:'TAF KAVL 131140Z 1312/1412 18006KT P6SM SCT035 BKN070 TEMPO 1316/1322 VRB20G35KT 1 1/2SM TSRA BKN020CB OVC050 FM132200 22008KT P6SM SCT045',
          decoded:'Base: S wind 6kt, VFR. TEMPO 1600Z-2200Z: variable winds gusting 35kt, 1.5SM in thunderstorm/rain, cumulonimbus at 2,000ft AGL, overcast 5,000ft. Your ETE window — 1800Z departure, ~1910Z arrival — falls entirely within the TEMPO period. After 2200Z: clearing.'},
         {type:'sigmet',label:'Convective SIGMET 45C (active)',
          text:'CONVECTIVE SIGMET 45C VALID UNTIL 1955Z NC SC ...FROM 30SSW GSP TO 40WNW AVL TO 60SE GSP... AREA DVLPG TSTMS TOPS TO FL390...HAIL TO 3/4 IN WIND GUSTS TO 55KTS POSS. Covers the corridor from south of GSP through western NC to the Asheville region. Tops to FL390. Covers the destination area and en route segment.'},
         {type:'pirep',label:'PIREP over AVL — 1720Z',
          text:'UA /OV AVL /TM 1720 /FL075 /TP C182 /SK BKN035 OVC060 /WX TSRA /TB MOD /RM NUMEROUS CB W AND SW OF AVL TOPS OBSCD. Over Asheville at 7,500ft: broken 3,500, overcast 6,000, thunderstorm/rain, moderate turbulence. Numerous CBs west and southwest of Asheville, tops obscured. Filed 40 minutes before your planned departure.'}
       ],
       options:[
         {id:'A',label:'Go — KJQF is clear now; fly direct and divert if conditions deteriorate en route',value:'go'},
         {id:'B',label:'No-go — Active Convective SIGMET over the route; TEMPO thunderstorms at KAVL cover your entire ETE window',value:'no_go'},
         {id:'C',label:'Delay — Wait until after 2200Z when the TAF shows clearing (1800L EDT)',value:'delay'},
         {id:'D',label:'Go with alternate routing — Route south of the SIGMET boundary approaching KAVL from the southeast',value:'go_with_alternate'}
       ],
       analysis:{
         correct:'no_go',
         explanation:'Your 1800Z departure puts you over the Blue Ridge at approximately 1910Z — squarely inside the KAVL TAF TEMPO window (1600Z-2200Z) showing thunderstorms, 1.5SM visibility, and cumulonimbus at 2,000ft AGL. The Convective SIGMET 45C is active right now with hail to 3/4 inch and 55kt gusts covering the destination area. The PIREP filed 40 minutes ago confirms moderate turbulence and numerous CBs over Asheville. This is not a forecast risk — it is current reality at your destination. Note: delaying until after 2200Z (Option C) is also a sound PIC decision and the TAF supports that timing. The critical error is Option A — fixating on departure conditions while ignoring where you will be in 70 minutes.',
         keyFactors:[
           'KAVL TAF TEMPO 1600Z-2200Z: thunderstorms, 1.5SM, CB at 2,000ft AGL — your arrival at ~1910Z falls inside this window',
           'Convective SIGMET 45C active: hail to 3/4 inch, 55kt gusts, covers destination and en route segment now',
           'PIREP 1720Z: moderate turbulence and numerous CBs over Asheville 40 minutes ago — observed, not forecast',
           'Afternoon Blue Ridge convection is a predictable, recurring summer hazard — the TAF correctly anticipated it'
         ],
         trap:'KJQF is VMC and the sky at departure looks inviting. The error is fixating on current departure conditions while ignoring where you will be in 70 minutes. The TEMPO window is not "later" — it begins before you even reach the mountains and continues through your entire arrival window.'
       },
       xp:30,concept:'thunderstorm_avoidance',faaRef:'FAA-H-8083-28A Ch. 22, 26'},
      {id:'wb_m6_2',type:'wx_brief',
       title:'Embedded Thunderstorms — Night IFR KCLT to KATL',
       mission:{departure:'KCLT',destination:'KATL',aircraft:'Single-engine piston (no airborne weather radar)',
         pilot:'Instrument-rated private, 580 hours, 120 hours IFR',ete:'1+25',fuel:'5.0 hours usable',
         departureTime:'0100Z (2100L EDT) — August night'},
       products:[
         {type:'metar',label:'KCLT 0056Z',
          raw:'KCLT 140056Z 18008KT 5SM BR BKN025 BKN060 OVC090 24/22 A2985 RMK AO2 SLP116',
          decoded:'S wind 8kt, 5SM in mist, broken 2,500ft, broken 6,000ft, overcast 9,000ft. Temp 24C / dew 22C — 2C spread, very moist. MVFR.'},
         {type:'metar',label:'KATL 0053Z',
          raw:'KATL 140053Z 21010KT 7SM FEW030 SCT060 BKN110 23/20 A2990 RMK AO2 SLP115',
          decoded:'S wind 10kt, 7SM, few 3,000ft, scattered 6,000ft, broken 11,000ft. VFR at destination. Both airport METARs appear workable — this is the trap setup.'},
         {type:'sigmet',label:'Convective SIGMET 62W (active)',
          text:'CONVECTIVE SIGMET 62W VALID UNTIL 0155Z GA SC NC ...FROM 30NNW ATL TO 40NE ATL TO 30SE CLT TO 40SSW CLT... AREA EMBD TSTMS TOPS ABV FL450...LTGCC LTGCG...HAIL TO 1 IN...WIND GUSTS TO 65KTS. Covers the entire Charlotte-to-Atlanta corridor. EMBD = embedded inside overcast — these storms are invisible until you are inside them. Tops above FL450, cloud-to-ground lightning, 1-inch hail, 65kt gusts.'},
         {type:'pirep',label:'PIREP CLT-ATL corridor — 0015Z',
          text:'UA /OV CLT-ATL /TM 0015 /FL090 /TP BE58 /WX EMBEDDED TS /TB SEV /RM UNFORECAST EMBEDDED TS BETWEEN CLT AND ATL AT 090 DEVIATED 30 MILES WEST UNABLE TO SAFELY PENETRATE. Beechcraft Baron at 9,000ft between CLT and ATL: severe turbulence, embedded thunderstorms. Deviated 30 miles west and was unable to safely penetrate the line. Filed 46 minutes ago.'}
       ],
       options:[
         {id:'A',label:'Go — Both airports look fine; navigate around cells using ForeFlight datalink NEXRAD',value:'go'},
         {id:'B',label:'No-go — Active Convective SIGMET on route with embedded TS in IMC; BE58 just turned around with severe turbulence',value:'no_go'},
         {id:'C',label:'Go with alternate — File KMGM as alternate and route west of the SIGMET boundary',value:'go_with_alternate'},
         {id:'D',label:'Delay — Wait 2 hours; nighttime convection often dissipates by 0300Z',value:'delay'}
       ],
       analysis:{
         correct:'no_go',
         explanation:'Convective SIGMET 62W covers the entire CLT-to-ATL corridor with embedded thunderstorms — the word EMBD is critical. In IMC at night you cannot see or avoid these cells visually. Datalink NEXRAD has 5-15 minutes of latency and cannot substitute for real-time radar in an embedded convective environment. The PIREP filed 46 minutes ago shows a BE58 — a more capable twin-engine aircraft — attempted this route and could not penetrate it, filing severe turbulence. The endpoint METARs look acceptable because the hazard is en route, not at either airport. This is one of the highest-risk combinations in GA aviation: night IFR, embedded convection, no onboard weather radar.',
         keyFactors:[
           'Convective SIGMET 62W: EMBEDDED thunderstorms — invisible in IMC until you are inside them',
           'PIREP 0015Z: a BE58 attempted this route 46 minutes ago and could not penetrate; filed severe turbulence',
           'No airborne weather radar — datalink NEXRAD latency makes it unsuitable for real-time embedded TS avoidance',
           'Night IFR + embedded Convective SIGMET + no onboard radar = one of the highest-risk combinations in GA aviation'
         ],
         trap:'Both airport METARs look reasonable — KCLT MVFR, KATL VFR. The error is fixating on endpoint conditions and assuming the route is safe because both ends report acceptable weather. EMBD means you will not see these cells until you are inside them. Option C (alternate routing) is tempting but the SIGMET covers the entire corridor, not a discrete cell that can be routed around.'
       },
       xp:30,concept:'thunderstorm_avoidance',faaRef:'FAA-H-8083-28A Ch. 22, 26'}
    ]
  },

  // ============================================================
  // M7: STRUCTURAL ICING
  // ============================================================
  {
    id:'m7',act:2,title:'Structural Icing',subtitle:'Types, effects & escape strategies',
    icon:'🧊',color:'#0EA5E9',bgColor:'#F0F9FF',prerequisites:['m4'],
    xpReward:200,estimatedMin:16,faaRef:'FAA-H-8083-28A Chapter 20',
    sections:[
      {
        id:'s7_1',title:'How Ice Forms on Aircraft',
        content:`
          <p>Structural icing occurs when <strong>supercooled water droplets</strong> — liquid water existing below 0°C — strike the airframe and freeze on contact. The existence of supercooled liquid water is the critical requirement: pure water droplets can remain liquid down to <span class="data-tag">-40°C</span> due to surface tension effects.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">SUPERCOOLED WATER — TEMPERATURE ZONES</div>
            ${[
              ['0°C to -10°C','Mostly supercooled water droplets','HIGHEST ICING RISK'],
              ['-10°C to -20°C','Mixed — supercooled water + ice crystals','MODERATE ICING RISK'],
              ['Below -20°C','Mostly ice crystals — little icing','LOWER RISK (but SLDs in CBs possible)'],
              ['Below -40°C','All ice crystals — no supercooled water','ICING VERY UNLIKELY'],
            ].map(([temp,state,risk])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;font-size:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
                <span style="color:#38BDF8;white-space:nowrap">${temp}</span>
                <span style="color:#94A3B8;flex:1;text-align:center;font-size:11px">${state}</span>
                <span style="color:${risk.includes('HIGH')?'#F43F5E':risk.includes('MOD')?'#F59E0B':'#10B981'};white-space:nowrap;font-size:11px">${risk}</span>
              </div>
            </div>`).join('')}
          </div>
          <div class="callout">🌡️ <strong>Peak icing occurrence:</strong> About half of all icing reports occur between <span class="data-tag">-8°C and -12°C</span>, with the peak altitude near 10,000 ft. Between 5,000 and 13,000 ft accounts for roughly half of all icing incidents.</div>
        `
      },
      {
        id:'s7_2',title:'Three Types of Structural Ice',
        content:`
          <p>Ice type matters because different types affect aircraft performance differently and respond differently to de/anti-icing systems.</p>
        `,
        diagram:{type:'process',key:'icing_accretion'}
      },
      {
        id:'s7_3',title:'Icing Effects on Aircraft Performance',
        content:`
          <p>Even a thin layer of ice can have catastrophic effects on aerodynamic performance. The FAA handbook notes that even a <em>small amount of ice on the lower and upper airfoil surfaces can seriously disrupt aerodynamic properties.</em></p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['⬇️ Lift','Ice roughens the wing surface and changes its shape, disrupting the boundary layer. Lift can be reduced by 30% or more with significant accretion. The stall AoA decreases significantly.','#FEF2F2','#DC2626'],
              ['⬆️ Drag','Rough ice surface dramatically increases parasite drag. Can increase total drag by 100–200% in severe icing. Performance available for climb and cruise deteriorates rapidly.','#FEF2F2','#DC2626'],
              ['⬇️ Thrust (Props)','Ice on propeller blades disrupts airfoil shape, reducing efficiency and thrust. Can cause severe vibration from asymmetric shedding. Prop-driven aircraft particularly vulnerable.','#FFF7ED','#D97706'],
              ['⬇️ Critical AoA','The stall angle of attack can drop drastically — meaning the aircraft stalls at a LOWER pitch angle than normal. The pilot may not receive the normal pre-stall buffet.','#FEF2F2','#DC2626'],
              ['🧊 SLD Hazard','Supercooled Large Drops (freezing rain, freezing drizzle) accrete ice BEHIND deicing equipment, where it cannot be removed. This residual ice acts as a spoiler and can cause uncommanded roll.','#7F1D1D','#EF4444'],
            ].map(([title,desc,bg,col])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;border-left:4px solid ${col}">
              <strong style="font-family:var(--font-display);font-size:14px;color:${col}">${title}</strong>
              <p style="font-size:13px;color:#475569;margin:6px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="danger-callout">🚨 <strong>Cold-soaked airframe:</strong> An aircraft that has been in cold temperatures can collect ice even when OAT is ABOVE freezing, because the airframe itself remains below 0°C. Fuel tanks flush with the wing skin are especially vulnerable. Always check your aircraft-specific AFM for cold-soak limitations.</div>
        `
      },
      {
        id:'s7_4',title:'Icing Intensity & PIREPs',
        content:`
          <p>Icing is reported and forecast using standardized intensity categories. Understanding these helps you evaluate PIREPs and forecast products accurately.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">ICING INTENSITY CATEGORIES (AIM)</div>
            ${[
              ['TRACE','Ice barely perceptible. Accumulation slightly faster than sublimation. Not hazardous unless encountered > 1 hr. Deicing/anti-icing not required.','#94A3B8'],
              ['LIGHT','Rate of accumulation may create problems in extended exposure (> 1 hr). Occasional use of deicing/anti-icing equipment removes/prevents accumulation.','#38BDF8'],
              ['MODERATE','Rate of accumulation is such that short encounters become potentially hazardous. Use of deicing/anti-icing equipment or diversion necessary.','#F59E0B'],
              ['SEVERE','Rate of accumulation is such that deicing/anti-icing equipment FAILS to reduce or control hazard. IMMEDIATE diversion necessary.','#EF4444'],
            ].map(([intensity,desc,col])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:10px 0">
              <span style="color:${col};font-family:var(--font-display);font-weight:800;font-size:13px">${intensity}</span>
              <p style="font-size:12px;color:#94A3B8;margin:4px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="callout">📋 <strong>Icing PIREP format:</strong> /IC MOD RIME 080-095 — means Moderate Rime Icing between 8,000 and 9,500 ft. Always note the altitudes — a 3,000-4,000 ft altitude change may exit stratiform icing entirely.</div>
          <p>The key escape strategy for <strong>stratiform icing</strong>: icing layers are typically only 3,000–4,000 ft thick in stratiform clouds. A climb or descent of just a few thousand feet often exits the icing layer entirely — even while remaining in cloud.</p>
        `,
        diagram:{type:'interactive',key:'icing_severity'}
      },
      {
        id:'s7_5',title:'Engine Icing — Weather Awareness (Carb Ice & HIWC)',
        content:`
          <p>This section covers the <strong>atmospheric conditions</strong> associated with engine icing — recognizing environments where carburetor icing and high ice water content are relevant concerns. <strong>Aircraft-specific procedures</strong> (recognition cues, checklists, and response actions) vary by engine type and certification. Always consult your POH/AFM for your specific aircraft.</p>
          <div style="background:#FEF2F2;border-radius:16px;padding:16px;border-left:4px solid #EF4444;margin:16px 0">
            <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">🔴 Carburetor Icing — Atmospheric Context</strong>
            <p style="font-size:13px;color:#475569;margin:8px 0">Carburetor icing risk is a function of ambient moisture and temperature. From a weather-awareness standpoint, carbureted-engine aircraft are susceptible in moist air across a range of temperatures — including conditions well above freezing OAT. The atmospheric setup (high relative humidity, visible moisture, proximity to cloud layers) creates the environment; whether ice actually forms in a specific engine depends on design, power setting, and aircraft-specific factors.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              ${[['Atmospheric Driver','Moist air with high relative humidity is the primary environmental risk factor'],['Temperature Range Awareness','Risk exists across a broad range — not limited to below-freezing OAT. Training ranges vary; treat all moist air with caution'],['Higher-Risk Environments','High humidity, visible moisture, proximity to cloud bases, and moist stable air masses'],['Aircraft Response','Consult your POH/AFM for recognition cues and procedures — these are aircraft-specific, not universal']].map(([k,v])=>`<div style="background:rgba(255,255,255,.6);border-radius:8px;padding:8px"><div style="font-size:10px;color:#EF4444;font-weight:800">${k}</div><div style="font-size:12px;color:#475569">${v}</div></div>`).join('')}
            </div>
            <div class="danger-callout" style="margin-top:10px"><strong>Important:</strong> Carburetor icing procedures — including when to apply carb heat, how to recognize symptoms, and when to expect ice — are aircraft-specific. Do not apply one aircraft's procedures to another. Consult your POH/AFM.</div>
          </div>
          <div style="background:#FFF7ED;border-radius:16px;padding:16px;border-left:4px solid #F97316">
            <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">🟠 High Ice Water Content (HIWC) — Awareness</strong>
            <p style="font-size:13px;color:#475569;margin:8px 0">Large deep convective systems — particularly tropical and organized mesoscale systems — can generate high concentrations of ice crystals at altitude, sometimes well away from obvious radar returns. HIWC is primarily a concern for turbine-powered aircraft operating at higher altitudes. It is included here as advanced weather awareness, not as a standard GA operational hazard. GA pilots should be aware that intense convective systems can produce effects well beyond what radar depicts.</p>
          </div>
        `
      }
    ],
    quiz:[
      {
        id:'q_m7_1',type:'mc',
        question:'Clear ice (glaze ice) is considered MORE hazardous than rime ice primarily because:',
        options:[
          'It forms at lower temperatures and is more common',
          'It forms horns at the leading edge, spreads beyond deicing equipment, is hard to see, and causes greater airflow disruption',
          'It is heavier and adds more weight to the airframe',
          'It only forms in cumuliform clouds where turbulence is also severe'
        ],
        correct:1,xp:15,
        explanation:'Clear ice is more hazardous than rime for several reasons: (1) It forms horns near the top/bottom of the leading edge that greatly disrupt airflow; (2) It can spread beyond deicing equipment coverage; (3) It is transparent and hard to detect; (4) SLDs (freezing rain/drizzle) form clear ice far aft of equipment. Rime ice is brittle and more easily removed.',
        faaRef:'Ch. 20',concept:'structural_icing'
      },
      {
        id:'q_m7_2',type:'mc',
        question:'The temperature range with the HIGHEST icing risk for aircraft is approximately:',
        options:['0°C to -2°C (just below freezing)','0°C to -10°C (supercooled water dominant)','−20°C to -30°C (mixed ice crystals and water)','Below −40°C (all ice crystals)'],
        correct:1,xp:10,
        explanation:'Between 0°C and -10°C, clouds consist mainly of supercooled liquid water droplets — the highest icing risk. About half of all icing PIREP reports occur between -8°C and -12°C. Below -20°C, clouds are mostly ice crystals (which do not accrete on airframes the same way).',
        faaRef:'Ch. 20',concept:'structural_icing'
      },
      {
        id:'q_m7_3',type:'scenario',
        scenario:'You are level at 7,000 ft in IMC, OAT −3°C, light intermittent ice on the leading edges. A new PIREP arrives: "UA /OV YKM /TM 1530 /FL070 /TP PC12 /IC SEV CLR FZRA /RM ICE BEHIND BOOTS UNCOMMANDED ROLL ON A/P DISC." Your aircraft has pneumatic boots and is approved for known-icing.',
        question:'What is the immediate priority action?',
        options:[
          'Continue at 7,000 ft — boots are working; the report is from a different aircraft type',
          'This PIREP is the SLD/freezing-rain calling card: ice behind protected surfaces, autopilot masking until disconnect, uncommanded roll. Exit the SLD environment NOW — request an immediate altitude change (typically descend to warmer air below the freezing layer if a safe altitude exists, or climb above the SLD layer if conditions support it) and disconnect the autopilot to feel airframe behavior.',
          'Increase airspeed to maximum to shed ice — speed alone solves SLD',
          'Continue and monitor — SLD only affects turbine aircraft'
        ],
        correct:1,xp:10,
        explanation:'SLDs (droplets > 40 microns — freezing drizzle or freezing rain) flow along the airfoil before freezing, accreting ice BEHIND the coverage area of deicing equipment. This residual aft ice acts as a spoiler and can cause flow separation over a large portion of the wing, potentially triggering uncommanded roll at speeds well above normal stall.',
        faaRef:'Ch. 20',concept:'structural_icing'
      },
      {
        id:'q_m7_4',type:'scenario',
        scenario:'You are flying IFR in a light turboprop at 9,000 ft, OAT -8°C. You have picked up moderate rime ice over the past 20 minutes. Your deicing boots are cycling but the ice accumulation continues at the same rate. A PIREP from 15 minutes ago reported "light rime 7,000-10,000, trace below 7,000." You have an MEA of 6,500 ft.',
        question:'What is the most appropriate action?',
        options:[
          'Continue at 9,000 ft — moderate rime ice is within equipment limitations',
          'Climb to 12,000 ft — warmer air is always found above icing layers',
          'Request descent to 7,000 ft or below to exit the icing layer, consistent with MEA and ATC',
          'Increase airspeed — higher speed heats the airframe through friction, reducing ice accretion'
        ],
        correct:2,xp:25,
        explanation:'Stratiform icing layers are typically 3,000-4,000 ft thick. The PIREP shows trace ice below 7,000 ft, meaning descending should exit the moderate icing. Climbing is NOT guaranteed to find warmer air — you may find colder, icier conditions. The correct move: request lower altitude to exit the icing layer while remaining above MEA. Always declare an emergency if icing is severe and equipment is ineffective.',
        faaRef:'Ch. 20'
      },
      {
        id:'q_m7_5',type:'timed',
        timeLimit:10,
        question:'"SEVERE" icing intensity means:',
        options:[
          'Ice accumulation rate requires occasional use of deicing equipment',
          'Deicing/anti-icing equipment FAILS to control hazard — immediate diversion required',
          'Ice barely perceptible — not hazardous unless encountered over 1 hour',
          'Moderate accumulation requiring continuous use of deicing equipment'
        ],
        correct:1,xp:20,
        explanation:'SEVERE icing = deicing/anti-icing equipment FAILS to reduce or control the hazard. Immediate diversion is required — this is not a "manage and continue" situation. If you ever see SEVERE icing in a PIREP or AIRmet/SIGMET, plan around it completely.',
        faaRef:'Ch. 20',concept:'structural_icing'
      },
      {
        id:'q_m7_6',type:'mc',
        question:'Icing in stratiform clouds typically extends through a layer approximately how thick?',
        options:['500-1,000 ft — very shallow layer','3,000-4,000 ft — relatively thin layer','10,000-15,000 ft — deep layer','Entire troposphere from freezing level to tropopause'],
        correct:1,xp:10,
        explanation:'Stratiform icing is typically confined to a 3,000-4,000 ft thick layer. This is good news for escape: a relatively small altitude change — even while remaining in cloud — can exit the icing layer entirely. By contrast, cumuliform icing extends through the full depth of the cloud, potentially to -40°C.',
        faaRef:'Ch. 20',concept:'structural_icing'
      },
      {
        id:'q_m7_7',type:'mc',
        question:'Supercooled Large Drops (SLDs) — freezing rain and freezing drizzle — are especially hazardous because:',
        options:['They freeze instantly at the leading edge like rime ice','They flow aft along the airfoil before freezing, accreting ice beyond deicing equipment coverage','They only form in cumulonimbus clouds where turbulence dominates','They require temperatures below -20°C to form'],
        correct:1,xp:10,
        explanation:'SLDs (droplets >40 microns) travel along the airfoil surface before freezing — accreting ice well aft of the protected leading-edge deicing equipment. This residual aft ice acts as a spoiler, disrupts airflow over a large portion of the wing, and can cause uncommanded roll at speeds well above normal stall speed.',
        faaRef:'Ch. 20',concept:'structural_icing'
      },
      {
        id:'q_m7_8',type:'timed',
        timeLimit:12,
        question:'An aircraft is "cold-soaked" after a high-altitude flight. Why does this create an icing risk during descent into warmer air?',
        options:['Cold-soaked aircraft have reduced engine performance','The airframe temperature remains below 0°C even when OAT rises above freezing — ice can accumulate even in above-freezing air','Cold-soaking causes pitot tube blockage regardless of temperature','Cold air trapped in fuel tanks expands and causes structural damage'],
        correct:1,xp:15,
        explanation:'A cold-soaked airframe — one that has been flying in very cold temperatures — can remain below 0°C for some time after entering warmer air. If the airframe skin is below freezing while OAT is above freezing, moisture from the warmer air can freeze on contact. Aircraft with wing-mounted fuel tanks flush with the skin are especially vulnerable. Always check AFM limitations for cold-soak conditions.',
        faaRef:'Ch. 20',concept:'structural_icing'
      }
    ,
      {id:'q_m7_9',type:'mc',question:'Mountain icing is particularly hazardous because icing can exist:',options:['Only on the leeward (downwind) side of the mountain in the rotor zone','In clear air outside visible clouds within mountain wave and lenticular cloud systems — invisible until encountered','Only below 10,000 ft MSL where supercooled water droplets exist','Only when OAT is below −10°C'],correct:1,xp:10,explanation:'Mountain waves create localized zones of orographic lifting that produce supercooled water content even in apparently clear air between cloud layers. Lenticular clouds and cap clouds have high liquid water content. Rotors below wave crests combine turbulence with icing. Always check AIRMET Zulu and the Current Icing Product before crossing mountains, even in what appears to be clear air between cloud layers.',faaRef:'Ch. 16, 20',concept:'structural_icing'}
    ,
      {id:'q_m7_10',type:'mc',question:'Which type of structural icing is generally considered most hazardous to aircraft?',options:['Rime icing — opaque and brittle, easier to break off with de-ice boots','Clear (glaze) icing — hard, transparent, adheres tenaciously, conforms to airfoil shape making it hardest to detect and remove','Mixed icing — dangerous only on turbine aircraft','Frost — only dangerous on jet aircraft during takeoff'],correct:1,xp:10,explanation:'Clear (glaze) icing forms from large supercooled droplets that spread across the surface before freezing, creating a hard transparent sheet that adheres strongly to the airfoil. It can significantly distort the wing shape, reduce lift, increase drag and weight, and is extremely difficult to see or remove. Rime icing is milky/opaque and more brittle. Mixed icing has characteristics of both. All types degrade aerodynamics, but clear ice’s conforming nature and tenacity make it particularly hazardous.',faaRef:'Ch. 20',concept:'structural_icing'},
      {id:'q_m7_11',type:'scenario',scenario:'KJQF METAR: OVC018 BKN010 2SM -RA BR. OAT +1°C/Dew +0°C. AIRMET Zulu for moderate icing FL020-FL120. You are planning to climb through the overcast in a non-ice-certificated piston single.',question:'What is the correct decision?',options:['Climb through quickly — brief exposure to icing is acceptable in a non-ice-certificated aircraft','The AIRMET Zulu starts at FL020 so the first 2,000 ft of clouds are safe to fly through','Do not attempt VFR-on-top or an IFR climb through these clouds — this icing setup can exceed a non-ice-certificated airframe\'s operating limitations and creates serious risk','Icing is only a hazard above 10,000 ft in spring — this situation is safe'],correct:2,xp:20,explanation:'Visible moisture with temperatures near freezing, an active AIRMET Zulu, and a non-ice-protected airframe create a serious icing risk. The safer training answer is to avoid a climb through these clouds. An AIRMET Zulu beginning at FL020 does not guarantee the lower cloud layer is free of icing.',faaRef:'Ch. 20'},
      {id:'q_m7_12',type:'timed',timeLimit:10,question:'Supercooled Large Drops (SLD) icing is especially dangerous because:',options:['SLD only occurs above FL200 where aircraft rarely fly','SLD droplets run back behind the protected areas (boots/heater) and freeze on unprotected surfaces, defeating standard ice protection systems','SLD produces rime ice which is easy to detect visually','SLD only affects jet engines, not piston aircraft'],correct:1,xp:15,explanation:'SLD (drizzle drops >50 microns or freezing rain) have enough momentum to run back behind wing leading edge de-ice boots and heat mats before freezing — forming ice ridges behind the protected zone on unprotected surfaces. This can actually worsen aerodynamic performance even with ice protection active. SLD conditions are identified on PIREPs and in AIRMET Zulu. When SLD is reported, the safest option for most GA aircraft is to exit the icing environment immediately.',faaRef:'Ch. 20',concept:'structural_icing'}
    ]
  },

  // ============================================================
  // M8: TURBULENCE
  // ============================================================
  {
    id:'m8',act:2,title:'Turbulence',subtitle:'Types, intensities & wind shear',
    icon:'💥',color:'#7C3AED',bgColor:'#F5F3FF',prerequisites:['m3','m4'],
    xpReward:175,estimatedMin:14,faaRef:'FAA-H-8083-28A Chapter 19',
    sections:[
      {
        id:'s8_1',title:'Turbulence Intensity Scale',
        content:`
          <p>The FAA defines turbulence intensity by its effect on the aircraft and crew. The same meteorological turbulence can affect different aircraft very differently — larger aircraft experience less effect from a given turbulence intensity.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['LIGHT','Slight, erratic changes in altitude/attitude. Or rhythmic bumpiness without altitude changes (Light Chop). Occupants may feel slight strain against seatbelts. Objects may be dislodged.','#D1FAE5','#065F46','🟢'],
              ['MODERATE','Greater intensity changes in altitude/attitude. Aircraft remains in positive control. Variations in IAS. Occupants feel definite strains against seatbelts; unsecured objects dislodged. Food service difficult.','#FEF3C7','#92400E','🟡'],
              ['SEVERE','Large, abrupt changes in altitude/attitude. Large IAS variations. Aircraft momentarily out of control. Occupants forced violently against seatbelts. Walking impossible.','#FFE4E6','#9F1239','🔴'],
              ['EXTREME','Aircraft violently tossed about — practically impossible to control. May cause structural damage. NEVER seek to penetrate areas of known extreme turbulence.','#7F1D1D','#EF4444','⛔'],
            ].map(([level,desc,bg,col,dot])=>`
            <div style="background:${bg};border-radius:16px;padding:14px;border-left:4px solid ${col}">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                <span style="font-size:16px">${dot}</span>
                <strong style="font-family:var(--font-display);font-size:15px;color:${col}">${level}</strong>
              </div>
              <p style="font-size:13px;color:#475569;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
        `,
        diagram:{type:'interactive',key:'turbulence_scale'}
      },
      {
        id:'s8_2',title:'Three Causes of Turbulence',
        content:`
          <p>All turbulence results from one of three physical mechanisms — understanding the cause helps you predict where it will occur:</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['🌡️','Convective Turbulence','Caused by convective currents (thermals) from surface heating. Most active on warm summer afternoons with light winds. Cumuliform clouds mark the top of the convective column. Smooth above the cloud tops; turbulent below and inside. At night over desert terrain, thermals can continue after dark from residual surface heat.','#FEF3C7','#D97706'],
              ['🏔️','Mechanical Turbulence','Caused by obstructions to wind flow — trees, buildings, ridges, mountains. Intensity depends on wind speed AND roughness of terrain. Mountain waves are the most severe form, extending to 60,000 ft. Rotor zones beneath wave crests contain severe-to-extreme turbulence.','#F5F3FF','#7C3AED'],
              ['💨','Wind Shear Turbulence','Generated between two air currents of different speed and/or direction. Sources: jet stream edges (CAT), temperature inversion tops, frontal zones, thunderstorm gust fronts. No visual warning in clear air (CAT). Can cause sudden upset with no pre-warning.','#E0F2FE','#0284C7'],
            ].map(([icon,title,desc,bg,col])=>`
            <div style="background:${bg};border-radius:16px;padding:16px;display:flex;gap:12px">
              <span style="font-size:28px;flex-shrink:0">${icon}</span>
              <div><strong style="font-family:var(--font-display);color:${col}">${title}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p></div>
            </div>`).join('')}
          </div>
        `,
        diagram:{type:'interactive',key:'turbulence_sources'}
      },
      {
        id:'s8_3',title:'Clear Air Turbulence (CAT)',
        content:`
          <p><strong>Clear Air Turbulence (CAT)</strong> is turbulence occurring in clear air with no visual warning. It is most often discussed in the context of jet streams (where it is most common) but the AIM definition has no strict altitude floor — CAT can occur wherever strong wind shear exists in cloud-free air, including near mountain waves and below the tropopause.</p>
          <div class="danger-callout">⚠️ <strong>CAT gives NO warning.</strong> Passengers and crew can be thrown from their seats in seconds. Flight attendants have been seriously injured. Always require seatbelts when seated, regardless of turbulence forecast.</div>
          <div style="display:grid;gap:10px;margin:16px 0">
            <div class="fact-box">
              <span style="font-size:28px">✈️</span>
              <div><strong>Where CAT is most likely:</strong> On the edges (especially north side) of jet streams; near jet streaks; in areas of strong horizontal temperature gradient; 150 miles north of the jet core; near troughs in the jet pattern. Check winds/temps aloft forecast and Turbulence SIGMETs before every IFR flight above FL180.</div>
            </div>
          </div>
          <p><strong>Convectively Induced Turbulence (CIT):</strong> Shear turbulence found outside thunderstorm clouds. Can occur several thousand feet above and up to <span class="data-tag">20 NM laterally</span> from a severe thunderstorm, and even further beyond the anvil edge. Another reason to keep 20 NM clear of severe CBs.</p>
          <div class="callout">🛡️ <strong>In-flight turbulence protocol:</strong> Slow to maneuvering speed (Va) — this limits the structural load from a single gust. Do not attempt to maintain exact altitude — hold attitude. The stress of fighting the turbulence is worse than riding it out at constant attitude.</div>
        `
      },
      {
        id:'s8_4',title:'Low-Level Wind Shear (LLWS)',
        content:`
          <p><strong>Low-Level Wind Shear (LLWS)</strong> is wind shear occurring below <span class="data-tag">2,000 ft AGL</span> — the most critical zone for aircraft on approach and departure. LLWS is one of the leading causes of approach/departure accidents.</p>
          <p>Sources of LLWS:</p>
          <ul style="margin:12px 0;padding-left:20px;display:grid;gap:6px">
            <li style="font-size:14px;color:#334155">Thunderstorm gust fronts — most severe; can precede storm by up to 15 miles</li>
            <li style="font-size:14px;color:#334155">Temperature inversion tops — wind direction/speed change across the inversion boundary</li>
            <li style="font-size:14px;color:#334155">Frontal passage — especially cold fronts with abrupt wind shift</li>
            <li style="font-size:14px;color:#334155">Terrain effects — mechanical turbulence from ridges near the airport</li>
          </ul>
          <div class="danger-callout">🚨 <strong>The microburst sequence on approach:</strong> Headwind (airspeed increase) → Downdraft (glidepath steepening) → Tailwind (airspeed LOSS) → Aircraft drops below glidepath. The insidious part: the initial headwind-induced airspeed INCREASE can mask the approaching tailwind. Any sudden airspeed increase near convective weather is a warning to discontinue the approach.</div>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">LLWS DETECTION RESOURCES</div>
            ${[['LLWAS','Low-Level Wind Shear Alert System — airport anemometers detect divergent winds; ATC issues alert'],['PIREP','Best real-time source — check recent PIREPs on the approach path'],['ATIS','Reports known wind shear on approach/departure when detected'],['SIGMET/AIRMET','AIRMET Sierra includes LLWS; Convective SIGMETs for thunderstorm-related shear']].map(([k,v])=>`<div style="display:flex;gap:12px;border-bottom:1px solid rgba(255,255,255,.08);padding:8px 0;font-size:12px"><span style="color:#38BDF8;min-width:80px">${k}</span><span style="color:#94A3B8">${v}</span></div>`).join('')}
          </div>
        `
      }
    ],
    quiz:[
      {
        id:'q_m8_1',type:'scenario',
        scenario:'You are cruising at 9,500 ft along the eastern slope of the Appalachians on a windy spring afternoon. Surface winds are 280°/22 G35; winds aloft at 9,000 ft are 280°/45. ATC asks if you can take a PIREP. Over the past 10 minutes you\'ve experienced multiple sharp jolts that briefly lifted your headset clear of your head; one bump pushed your IAS from 105 to 130 kt, and you had to reduce throttle and hold attitude rather than chase altitude.',
        question:'What turbulence intensity should you report, and what additional information makes the PIREP useful?',
        options:[
          'Light — passengers feel slight strain; report only if asked',
          'Moderate to severe chop — sustained sharp jolts and a 25-kt IAS swing exceed the "moderate" threshold. Report as severe (continuous or intermittent), include altitude, location, aircraft type, OAT, and that you are slowed to maneuvering speed.',
          'Extreme — only extreme turbulence is worth a PIREP',
          'No PIREP needed — turbulence below FL180 is rarely actionable'
        ],
        correct:1,xp:20,
        explanation:'FAA intensity ladder: Light (slight erratic altitude/attitude changes), Moderate (similar but more intense; aircraft remains in control; food and unsecured items move), Severe (large abrupt altitude/attitude changes, large IAS variations, aircraft momentarily out of control), Extreme (aircraft virtually impossible to control; structural damage possible). A 25-kt IAS swing and being briefly thrown against restraints is at the moderate-severe boundary; pilots are explicitly directed to report severe immediately. Useful PIREP elements: position (/OV), time (/TM), altitude (/FL), aircraft type (/TP), and turbulence intensity/type (/TB) — and slow to maneuvering speed (Va) before reporting.',
        faaRef:'Ch. 17, 24',concept:'turbulence_types'
      },
      {
        id:'q_m8_2',type:'mc',
        question:'Clear Air Turbulence (CAT) is primarily associated with:',
        options:[
          'Convective currents from surface heating on summer afternoons',
          'Strong wind shear at the boundaries of jet streams, above 15,000 ft',
          'Mechanical turbulence behind mountain ridges at low altitude',
          'Thunderstorm outflow at the surface only'
        ],
        correct:1,xp:10,
        explanation:'CAT is primarily caused by strong wind shear at jet stream boundaries, typically above 15,000 ft. It offers NO visual warning (no clouds). The north side of the jet core (cyclonic shear side) is most turbulent. Always check Turbulence SIGMETs and winds aloft before high-altitude IFR flight.',
        faaRef:'Ch. 19',concept:'turbulence_types'
      },
      {
        id:'q_m8_3',type:'timed',
        timeLimit:12,
        question:'When encountering unexpected moderate-to-severe turbulence, the recommended action is:',
        options:[
          'Climb immediately to exit the turbulence layer',
          'Slow to maneuvering speed (Va) and maintain attitude rather than fighting altitude deviations',
          'Increase speed to fly through the turbulence quickly',
          'Descend immediately to smoother air below'
        ],
        correct:1,xp:20,
        explanation:'In turbulence: reduce to Va (maneuvering speed) to protect the airframe from exceeding design load limits. Then maintain ATTITUDE rather than altitude — fighting altitude deviations adds structural stress. Announce to cabin, notify ATC, file a PIREP. Do NOT randomly climb or descend without ATC coordination.',
        faaRef:'Ch. 19',concept:'turbulence_types'
      },
      {
        id:'q_m8_4',type:'scenario',
        scenario:'You are on a 3-degree ILS approach, 5 miles from the threshold, gear and flaps down. ATIS reported winds 270/12. Suddenly your airspeed increases from 120 KIAS to 135 KIAS with no power change. You are approaching a large area of convective activity to the northwest.',
        question:'What does this sudden airspeed increase indicate, and what should you do?',
        options:[
          'A favorable tailwind — continue the approach with reduced power',
          'Possible leading edge of a microburst headwind component — be prepared for an imminent airspeed LOSS; consider go-around now',
          'Faulty airspeed indicator — cross-check with VSI and altimeter',
          'Normal wind gradient effect — maintain current configuration and continue'
        ],
        correct:1,xp:25,
        explanation:'A sudden airspeed increase near convective weather is the classic WARNING sign of an approaching microburst — you are in the initial headwind phase. The tailwind and downdraft phases follow, with sudden airspeed LOSS. The correct response: go-around IMMEDIATELY, report wind shear to ATC, and do not attempt another approach until conditions clear. "Any sudden airspeed increase should be viewed as a possible indication of a forthcoming airspeed decrease." — FAA-H-8083-28A',
        faaRef:'Ch. 22, 19'
      },
      {
        id:'q_m8_5',type:'mc',
        question:'Convectively Induced Turbulence (CIT) can be found:',
        options:[
          'Only inside the thunderstorm cloud itself',
          'Up to 20 NM laterally from a severe thunderstorm and thousands of feet above it, including beyond the anvil',
          'Only at low altitude below the cloud base',
          'Only in CAT-designated airspace above FL300'
        ],
        correct:1,xp:10,
        explanation:'CIT extends outside the visible thunderstorm: several thousand feet above the cloud, up to 20 NM laterally, and CAT-type turbulence can be found beyond the anvil edge. This is one key reason the 20 NM avoidance distance is recommended even in VMC — the turbulence boundary extends well beyond the visible cloud.',
        faaRef:'Ch. 19',concept:'turbulence_types'
      },
      {
        id:'q_m8_6',type:'mc',
        question:'Temperature inversions are associated with turbulence because:',
        options:[
          'Cold air above warm air creates convective instability and thermals',
          'Strong wind shear often exists across inversion boundaries, generating turbulence between the two air layers',
          'Inversions trap moisture, forming turbulent cumulonimbus clouds',
          'The temperature change causes rapid pressure fluctuations that buffet the aircraft'
        ],
        correct:1,xp:10,
        explanation:'Temperature inversions — layers where temperature increases with altitude — commonly produce strong wind shear at their boundaries. The shear between the stable, slower air below and the faster-moving air above generates turbulence. This is a frequent source of low-level turbulence near fronts, at night over land, and in valley areas with cold air pooling.',
        faaRef:'Ch. 19',concept:'turbulence_types'
      },
      {
        id:'q_m8_7',type:'timed',
        timeLimit:10,
        question:'What is the recommended technique when flying through unavoidable turbulence?',
        options:[
          'Maintain altitude precisely — use aggressive control inputs to stay on altitude',
          'Slow to maneuvering speed (Va) and maintain a constant attitude — do not chase altitude',
          'Increase airspeed to fly through the turbulence as quickly as possible',
          'Climb immediately — turbulence is always worse at lower altitudes'
        ],
        correct:1,xp:15,
        explanation:'In turbulence: slow to Va (maneuvering speed) to limit structural loads — at or below Va, a single maximum control input or gust will not exceed the design load limit. Then maintain ATTITUDE, not altitude. Fighting altitude deviations with aggressive control inputs dramatically increases structural stress. Altitude will recover naturally once through the turbulence. Announce to cabin, notify ATC, and file a PIREP.',
        faaRef:'Ch. 19',concept:'turbulence_types'
      }
    ,
      {id:'q_m8_8',type:'mc',question:'Wake turbulence is most hazardous during which phase of flight and why?',options:['Cruise at altitude — wake vortices are strongest in thinner air','Takeoff and landing behind heavy aircraft — vortices sink and drift, and you have minimal altitude to recover','Only during IFR approaches in IMC — wake is invisible at night','Wake turbulence dissipates within 60 seconds and is not a significant hazard for most GA aircraft'],correct:1,xp:10,explanation:'Wake vortex turbulence (wingtip vortices) is generated whenever an aircraft generates lift. Vortices sink at about 300-500 ft/min and drift with the wind. Near the ground during takeoff and landing, there is minimal altitude margin for recovery. For a light aircraft behind a heavy jet, encountering a vortex can exceed the aircraft’s roll authority. Key rules: land beyond the touchdown point of the preceding heavy, rotate before the heavy’s rotation point, and allow 2-3 minutes separation (or per ATC).',faaRef:'Ch. 19',concept:'turbulence_types'},
      {id:'q_m8_9',type:'mc',question:'Clear Air Turbulence (CAT) is most commonly encountered:',options:['Inside visible clouds, especially cumulonimbus','In clear air on the northern/cyclonic shear side of the polar jet stream and near upper-level troughs','Only at FL350 and above where jet aircraft operate','Near mountain ranges exclusively — CAT does not occur over flat terrain'],correct:1,xp:10,explanation:'CAT occurs in clear air with no visual warning, most commonly near the jet stream — particularly on the poleward (northern) side where the wind shear is strongest, and near upper-level troughs. The FAA winds aloft forecast and GTG (Graphical Turbulence Guidance) help identify CAT risk. Turbulence intensities: Light, Moderate, Severe (exceeds aircraft design limits transiently), Extreme (structural damage possible). Severe and extreme CAT are rare but have caused fatalities.',faaRef:'Ch. 19',concept:'turbulence_types'},
      {id:'q_m8_10',type:'scenario',scenario:'En route at 8,500 ft over the Appalachians in a single-engine piston. You receive a PIREP: "UA /OV VUJ/TM 1430/FL085/TP BE36/TB MOD CHOP." Winds aloft at 9,000 ft show 280/35KT.',question:'What is the most appropriate response to this PIREP?',options:['Continue as planned — PIREP is from a Beechcraft, lighter aircraft experience less turbulence','Request a lower altitude or deviation around the area — the turbulence is likely orographic. Moderate chop in a piston single will be uncomfortable and fatiguing.','Descend to 5,500 ft immediately — turbulence below 6,000 ft is always calmer over mountains','Moderate turbulence only affects instrument currency, not safety — continue normally'],correct:1,xp:20,explanation:'A fresh PIREP of moderate chop (continuous irregular bumps) over the mountains with strong westerly winds at 35 kt is a reliable indicator of orographic turbulence. In a light piston single, moderate turbulence will be noticeably uncomfortable. Options: request a lower altitude (below ridge level, often smoother), fly a more direct route through the area, or deviate to the north or south. Sustained moderate turbulence also increases pilot fatigue and reduces performance. Always brief your passengers.',faaRef:'Ch. 16, 19'},
      {id:'q_m8_11',type:'timed',timeLimit:10,question:'Mechanical turbulence near the surface is most intense when:',options:['Surface winds are calm and skies are clear','Winds are strong, terrain is rough, and the atmosphere is unstable — turbulence generated by surface friction is amplified by instability','Visibility is low in fog — water vapor increases mechanical friction','Mechanical turbulence only occurs above 3,000 ft AGL'],correct:1,xp:10,explanation:'Mechanical turbulence forms as surface friction slows and deflects wind flowing over obstacles (trees, buildings, terrain). Intensity increases with: stronger winds (more shear), rougher terrain (more obstruction), and atmospheric instability (amplifies vertical mixing). Over smooth water, mechanical turbulence is minimal. Over forested mountains with strong winds, it can be severe within several thousand feet of the surface. Land/sea breeze boundaries also generate mechanical turbulence along the convergence zone.',faaRef:'Ch. 19',concept:'turbulence_types'},
      {id:'q_m8_12',type:'mc',question:'The FAA defines severe turbulence as turbulence that:',options:['Causes uncommanded altitude deviations of 200-300 ft','Causes large, abrupt changes in altitude/attitude that momentarily cause loss of aircraft control, and occupants are forced violently against seat belts','Causes any uncommanded bank angle exceeding 30°','Causes any turbulence above FL180'],correct:1,xp:10,explanation:'FAA turbulence intensity definitions — Light: slight erratic changes in altitude/attitude. Moderate: similar to light but more intense, aircraft remains in control. Severe: large abrupt changes, may momentarily cause loss of control, occupants forced violently against restraints. Extreme: aircraft practically impossible to control, may cause structural damage. PIREP reports use these same intensity terms. Severe or extreme turbulence requires immediate ATC notification.',faaRef:'Ch. 19',concept:'turbulence_types'}
    ]
  },

  // ============================================================
  // M9: FOG & LOW IFR
  // ============================================================
  {
    id:'m9',act:2,title:'Fog & Low IFR',subtitle:'Fog types, formation & visibility hazards',
    icon:'🌫️',color:'#64748B',bgColor:'#F8FAFC',prerequisites:['m4','m5'],
    xpReward:175,estimatedMin:14,faaRef:'FAA-H-8083-28A Chapter 18',
    sections:[
      {
        id:'s9_1',title:'What Is Fog?',
        content:`
          <p>Fog is a cloud with its base at the Earth's surface, reducing horizontal visibility to <span class="data-tag">less than 5/8 SM (1 km)</span>. When visibility is 5/8 SM or less, it is reported as FG in a METAR; between 5/8 and 6 SM, it is reported as BR (mist). HZ (haze) is reported when reduced visibility is from suspended dry particles rather than water droplets.</p>
          <div class="fact-box">
            <span style="font-size:28px">💧</span>
            <div><strong>The fog trigger:</strong> Fog forms when temperature and dewpoint converge — either by <em>cooling the air to its dewpoint</em> (radiation, advection, upslope fog) OR by <em>adding moisture to raise the dewpoint</em> (frontal fog, steam fog). Fog rarely forms when the temperature-dewpoint spread exceeds <span class="data-tag">2°C (4°F)</span>.</div>
          </div>
          <div class="callout">✈️ <strong>The #1 VFR weather killer:</strong> VFR flight into IMC — often fog — is the single most lethal category of weather accidents. A VFR pilot inadvertently entering fog has an average of approximately 178 seconds before spatial disorientation and loss of control. The correct response: NEVER continue VFR into deteriorating visibility.</div>
        `,
        diagram:{type:'interactive',key:'fog_types'}
      },
      {
        id:'s9_2',title:'Five Types of Fog',
        content:`
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['🌙 Radiation Fog','Forms when clear skies allow the surface to cool by radiation at night, cooling the adjacent air to its dewpoint. Conditions: shallow moist layer, clear sky, light wind (calm = no mixing, >5 kt = dispersal). Restricted to land. Burns off after sunrise. Most common in valleys. Classic "morning fog."','#F8FAFC','#64748B'],
              ['🌊 Advection Fog','Warm moist air moves over a cooler surface. Common along coastlines (CA coast, Gulf Coast). Can form any time of day. More extensive and persistent than radiation fog. Deepens with wind up to 15 kt; wind >15 kt lifts it to low stratus.','#E0F2FE','#0284C7'],
              ['⛰️ Upslope Fog','Moist stable air cools adiabatically as it moves up terrain. Can form under overcast skies (unlike radiation fog). Common on eastern slopes of Rockies. Often quite dense and extensive.','#F5F3FF','#7C3AED'],
              ['🌧️ Frontal / Precipitation-Induced Fog','Warm rain/drizzle falls through colder air below a warm front, evaporating and saturating the cold air. Creates continuous fog from ground through cloud. Most common with warm fronts. Can be very dense and widespread.','#FEF3C7','#D97706'],
              ['♨️ Steam Fog','Very cold air moves over relatively warm water. Water vapor evaporates into cold air and immediately condenses — appears as steam wisps. Common over lakes/rivers on cold autumn mornings. Shallow and unstable; expect light turbulence flying through it.','#FFE4E6','#DC2626'],
            ].map(([title,desc,bg,col])=>`
            <div style="background:${bg};border-radius:16px;padding:16px;border-left:4px solid ${col}">
              <strong style="font-family:var(--font-display);font-size:15px;color:${col}">${title}</strong>
              <p style="font-size:13px;color:#475569;margin:8px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
        `,
        diagram:{type:'interactive',key:'fog_formation'}
      },
      {
        id:'s9_3',title:'Other Visibility Hazards',
        content:`
          <p>Beyond fog, several other phenomena can restrict visibility to IFR levels:</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['Mist (BR)','Visibility 5/8 – 7 SM. Temperature at or very near dewpoint. Precursor to fog — watch the T/Td spread closely.'],
              ['Haze (HZ)','Fine particles (smoke, dust, salt) suspended in the air. No temperature-dewpoint requirement. Visibility decreases. Not reported as fog but can reach IFR levels. Obscures distant terrain.'],
              ['Blowing Snow (BLSN)','Wind drives snow horizontally. Can reduce visibility to near zero in minutes. Common in Plains states with strong cP outbreaks. Blowing snow can fill instrument bores and pitot tubes.'],
              ['Dust/Sandstorm (DS/SS)','Strong winds lift dust/sand. Common in desert SW. Can arrive as a wall (haboob) with almost no warning. Severe abrasive damage to airframe and engine if flown through.'],
              ['Freezing Fog (FZFG)','Fog with OAT at or below 0°C. Supercooled droplets freeze on contact with airframe, taxiways, windshields. Ground icing hazard even with no precipitation.'],
              ['Volcanic Ash','Extremely abrasive and corrosive to turbine engines. Can cause flameout. Has NO distinctive smell in cockpit until it\'s too late. Avoid all volcanic ash areas — no safe exposure level for jet engines.'],
            ].map(([title,desc])=>`
            <div style="background:white;border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.05)">
              <strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${title}</strong>
              <p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="danger-callout">⚠️ <strong>Freezing fog on ground ops:</strong> Airports with FZFG must be treated like winter precipitation events. Runways can become extremely slippery. Aircraft parked overnight may have frost on wing upper surfaces — frost must be removed before flight as it disrupts boundary layer airflow the same way ice does.</div>
        `
      }
    ,
      {
        id:'s9_4',title:'IFR Planning & Fog Decision-Making',
        content:`
          <p>Fog management is one of the most operationally critical weather-planning skills for pilots. Because fog behavior is highly variable, the safest use of this lesson is as risk awareness and planning context rather than as a prediction tool.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">THE FOG FORECAST TOOLKIT</div>
            ${[['T–Td ≤2°C at surface','Near-saturation signal — fog risk may increase if other ingredients support it'],['Clear sky + light wind + moist surface','Classic radiation-fog setup — monitor trends near sunrise'],['TEMPO/BECMG in TAF','Fog is part of the forecast picture — plan alternates and updates'],['AIRMET Sierra (IFG)','Widespread IFR conditions may already be affecting the area'],['PIREPs with OVC003 or less','Useful real-time ceiling confirmation, but still time-sensitive'],['Rapidly falling pressure','Frontal influence may change the fog and ceiling picture quickly']].map(([sig,action])=>`<div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;display:grid;grid-template-columns:1.2fr 1.8fr;gap:8px"><span style="color:#38BDF8;font-size:12px;font-weight:700">${sig}</span><span style="color:#94A3B8;font-size:12px">${action}</span></div>`).join('')}
          </div>
          <div class="callout"><strong>Training caution:</strong> If fog is present and you cannot legally maintain VFR after takeoff, treat that as a strong signal to delay, divert, or reassess. IFR may be appropriate only if the aircraft, crew, clearance, and full weather picture support it.</div>
          <div class="fact-box"><span style="font-size:28px">Trend</span><div><strong>Radiation Fog Trend Note:</strong> Surface heating often helps radiation fog improve after sunrise, but timing varies widely with cloud cover, wind, moisture, and terrain. Improvement is not guaranteed, so verify with current observations before launching.</div></div>
        `
      },
      {
        id:'s9_upslope',title:'Upslope Fog',
        content:`
          <p>Upslope fog forms when <strong>moist, stable air is forced up rising terrain</strong> and cools adiabatically to its dewpoint. Unlike radiation fog, it requires no clear skies or calm winds — the continuous orographic lift provides the cooling mechanism.</p>
          <div class="fact-box">
            <span style="font-size:28px">⛰️</span>
            <div><strong>Formation mechanism:</strong> Wind-driven moist air flows up a sloping surface, cooling at the dry adiabatic lapse rate (~3°C/1,000 ft) until temperature reaches the dewpoint — fog forms along the slope and at the surface. No radiational cooling required. Can form under an overcast sky, day or night.</div>
          </div>
          <p><strong>Geography — directly relevant to KJQF pilots:</strong> The Blue Ridge escarpment rises 40–60 NM to the west and northwest of KJQF (Concord, NC). When easterly surface winds push moist maritime Tropical (mT) air up the Piedmont gradient, upslope fog forms along the foothills and blocks western approaches.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['📍 Key Trigger — Easterly Winds','Easterly surface winds (060°–160°) push moist mT air up the Piedmont slope toward the Blue Ridge. Light-to-moderate winds of 5–15 kt are ideal. The flow does not need to be strong — sustained gentle easterlies are sufficient to maintain fog along the terrain.'],
              ['🌫️ Persistence — No Burn-Off','Upslope fog has no radiation fog burn-off mechanism. It persists as long as the upslope flow continues. Mountain gaps, ridge crossings, and western approaches can remain socked in for extended periods even as lower Piedmont terrain stays clear or marginal VFR.'],
              ['✈️ Asymmetric Conditions — The KJQF Trap','VFR departure from KJQF (705 ft MSL) may be possible while western checkpoints are zero-zero. KAND (Anderson, SC) and KAVL (Asheville, NC) at 2,165 ft can be solidly IFR in upslope fog while KJQF stays marginal VFR — a classic trap for westbound Piedmont pilots.'],
              ['🗺️ Classic Locations — Appalachians and Rockies','Most common on the eastern slopes of the Appalachians (including the NC Piedmont) and eastern slopes of the Rockies (Front Range). The classic synoptic setup is a coastal High pressure center driving persistent onshore (easterly) flow into the terrain.'],
            ].map(([title,desc])=>`
            <div style="background:white;border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.05)">
              <strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${title}</strong>
              <p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="danger-callout">⚠️ <strong>Upslope fog does NOT burn off like radiation fog.</strong> Waiting for post-sunrise clearing is not a valid strategy. The fog persists as long as the upslope flow continues. When easterly winds are forecast to hold through the day, plan for all-day IFR conditions along the Blue Ridge and Piedmont approaches. FAA Ref: Ch. 18</div>
          <div class="callout">✈️ <strong>KJQF Westbound Pre-Flight:</strong> Any time surface winds have an easterly component, check KAND, KAVL, and KHKY (Hickory, NC) METARs before departing westbound. KJQF may report 5 SM haze while KAVL is zero-zero in upslope fog. This asymmetry is the defining hazard of upslope fog for Piedmont NC pilots.</div>
        `
      }],
    quiz:[
      {
        id:'q_m9_1',type:'mc',
        question:'Radiation fog is most likely to form under which conditions?',
        options:[
          'Overcast skies, strong winds, and high humidity',
          'Clear skies, light winds (calm to ~5 kt), and a shallow moist layer near the surface',
          'Warm moist air moving over a cold water surface',
          'Cold frontal passage with precipitation'
        ],
        correct:1,xp:10,
        explanation:'Radiation fog requires: clear skies (to allow radiational cooling), light winds (calm-5 kt — allows cooling without mixing; >5 kt disperses fog or lifts it to stratus), and sufficient surface moisture. Restricted to land; water surfaces cool too little at night. Typically forms overnight, most dense near sunrise, burns off after surface heating begins.',
        faaRef:'Ch. 18',concept:'fog_types'
      },
      {
        id:'q_m9_2',type:'mc',
        question:'Advection fog differs from radiation fog primarily in that:',
        options:[
          'Advection fog is shallower and burns off more quickly',
          'Advection fog can form any time of day, is more extensive, and is more persistent',
          'Advection fog only forms over water surfaces',
          'Advection fog requires overcast skies to form'
        ],
        correct:1,xp:10,
        explanation:'Advection fog (warm moist air over cooler surface): can form any time of day or night; more extensive than radiation fog; more persistent — can last days; can move inland from coastal areas. Radiation fog is restricted to land, forms at night, and typically clears with surface heating. Advection fog is a major challenge for coastal IFR operations.',
        faaRef:'Ch. 18',concept:'fog_types'
      },
      {
        id:'q_m9_3',type:'drag_drop',
        question:'Match each fog type to its formation mechanism:',
        items:['Radiation Fog','Advection Fog','Upslope Fog','Steam Fog'],
        targets:['Surface cools air at night via radiation','Warm air moves over cooler surface','Air cools adiabatically rising terrain','Cold air over warm water evaporation'],
        answers:{
          'Radiation Fog':'Surface cools air at night via radiation',
          'Advection Fog':'Warm air moves over cooler surface',
          'Upslope Fog':'Air cools adiabatically rising terrain',
          'Steam Fog':'Cold air over warm water evaporation',concept:'fog_types'
        },
        xp:20,
        explanation:'Fog formation mechanisms: Radiation = surface radiates heat at night cooling air to dewpoint; Advection = warm moist air advects over cooler surface; Upslope = orographic adiabatic cooling; Steam = cold air over warm water causes immediate condensation of evaporating water vapor.',
        faaRef:'Ch. 18'
      },
      {
        id:'q_m9_4',type:'scenario',
        scenario:'You are planning a VFR departure at 0600 local time. Current METAR: BKN020 OVC050 Temp 12°C Dewpoint 11°C Wind calm. A radiation fog advisory is in effect. Sky condition 2 hours ago was CLR.',
        question:'What should you expect and what is the best course of action?',
        options:[
          'Depart immediately — broken ceiling at 2,000 ft is VFR',
          'Fog risk is increasing: the near-zero temp/dewpoint spread, calm wind, and recent clear sky support possible radiation fog formation — delay departure and monitor updates',
          'The CLR sky 2 hours ago guarantees good VFR conditions — proceed normally',
          'The 020 broken ceiling is caused by advection fog — it will move away with the wind'
        ],
        correct:1,xp:25,
        explanation:'This is a strong radiation-fog setup: near-zero temp/dewpoint spread (12°C/11°C), calm winds, and a recently clear sky all support fog risk. The broken ceiling may be residual cloud from the previous evening — or fog may already be forming. Because the trend can still change, the safest training answer is to delay, get an updated METAR, and avoid departing into deteriorating or uncertain conditions.',
        faaRef:'Ch. 18'
      },
      {
        id:'q_m9_5',type:'timed',
        timeLimit:10,
        question:'Fog is officially reported in a METAR when horizontal visibility is:',
        options:['Less than 1 SM','Less than 5/8 SM (1 km)','Less than 3 SM','Less than 1/4 SM only'],
        correct:1,xp:15,
        explanation:'FG (fog) is reported in a METAR when horizontal visibility is less than 5/8 SM (approximately 1 km). Between 5/8 SM and 6 SM with near-dewpoint temperature, BR (mist) is reported. HZ (haze) is used when the obstruction is aerosols without temperature-dewpoint convergence.',
        faaRef:'Ch. 18',concept:'fog_types'
      },
      {
        id:'q_m9_6',type:'mc',
        question:'Steam fog is associated with which hazard pilots should anticipate?',
        options:[
          'Severe icing — steam fog always forms in below-freezing conditions',
          'Light convective turbulence — the shallow unstable air layer beneath steam fog produces bumpiness',
          'Reduced magnetic compass accuracy — moisture affects navigation instruments',
          'High density altitude — warm water vapor reduces air density significantly'
        ],
        correct:1,xp:10,
        explanation:'Steam fog forms when very cold air moves over warmer water. The air is destabilized — cooled from below by the water temperature and heated at the surface — creating a shallow, unstable layer. Pilots flying through steam fog should expect light convective turbulence (bumpiness). Steam fog is commonly observed over lakes and rivers on cold mornings and can appear as wispy "smoke" rising from the surface.',
        faaRef:'Ch. 18',concept:'fog_types'
      },
      {
        id:'q_m9_7',type:'scenario',
        scenario:'You are planning a morning VFR departure. Current conditions: clear sky, calm wind, temperature 8°C, dewpoint 7°C (spread = 1°C). The TAF shows no significant weather but winds increase to 20 kt after 1200Z. Sunrise is at 0645Z and your departure is planned for 0600Z.',
        question:'What is the primary fog-related concern and recommended action?',
        options:[
          'No concern — the clear sky means fog cannot form',
          'High radiation fog risk: 1°C T–Td spread with calm winds and clear sky are classic conditions. Expect dense fog at/before sunrise. Delay departure, monitor updated METARs, consider filing IFR.',
          'Advection fog risk — the temperature-dewpoint spread indicates moisture advection from nearby water',
          'No concern — winds will increase to 20 kt which will disperse any fog before your departure'
        ],
        correct:1,xp:25,
        explanation:'Classic radiation fog setup: T–Td spread of 1°C (near saturation), calm winds (no mixing to disperse fog), and clear sky (maximum radiational cooling). Radiation fog typically peaks at or just after sunrise — precisely when you plan to depart. The 20 kt winds after 1200Z will disperse fog, but that is 6 hours away. Correct action: delay departure, get an updated METAR closer to sunrise, and be prepared to file IFR or wait for the fog to clear.',
        faaRef:'Ch. 18'
      }
    ,
      {id:'q_m9_8',type:'scenario',scenario:'METAR at 0600L: KJQF 151155Z 00000KT 1/4SM FG OVC002 14/14 A3010. Your planned 0700L VFR departure requires 3SM and 1,000ft ceiling. TAF shows BECMG 1315/1317 VFR.',question:'What is the most appropriate action?',options:['Depart now — the fog will dissipate once airborne','Wait for the BECMG window and verify with a fresh METAR before departing','File IFR immediately — current conditions require it regardless of forecast','Cancel — radiation fog never clears predictably'],correct:1,xp:20,explanation:'You cannot depart VFR in 1/4SM fog. Wait for the BECMG window (1315-1317Z), then get an updated METAR confirming 3SM+ and 1,000ft+ before departing. If conditions haven’t improved by then, reassess or file IFR if rated and equipped. Filing IFR is also valid — but you still need ceiling/vis to legally depart VFR.',faaRef:'Ch. 18'}
    ,
      {id:'q_m9_9',type:'mc',question:'Upslope fog forms when:',options:['Cold air drains down mountain slopes into valleys at night','Moist stable air is carried up rising terrain by the wind, cooling adiabatically until it reaches its dewpoint','Warm moist air moves horizontally over a cold surface','Water evaporates from a warm lake into cold overlying air'],correct:1,xp:10,explanation:'Upslope fog forms when moist, stable air flows up rising terrain (e.g., the eastern slopes of the Rockies, Appalachian windward slopes). As air rises, it cools at the dry adiabatic lapse rate until it reaches its dewpoint — forming fog or low clouds. Unlike radiation fog, upslope fog persists as long as the onshore/upslope wind continues. It can cover vast areas along the Front Range and Appalachians. Not to be confused with orographic clouds — upslope fog forms at/near the surface.',faaRef:'Ch. 18',concept:'fog_types'},
      {id:'q_m9_10',type:'scenario',scenario:'Departing KJQF (elevation 705 ft) at 0530L. METAR: 02000KT 1/4SM FZFG OVC002 -1/-1. Airport reports ice on taxiways.',question:'What are the TWO most critical hazards in this situation?',options:['High crosswind component and turbulence — 02000KT indicates frontal passage','Freezing fog reducing vis to 1/4SM and ice on the airport surface — structural icing probable in cloud, ground vehicles slippery, runway condition unknown','Overcast at 200 ft is below VFR minimums only, IFR is still safe','The -1°C temperature means conditions will quickly warm above freezing — brief exposure acceptable'],correct:1,xp:20,explanation:'FZFG (freezing fog) creates two simultaneous hazards: (1) ground ice — taxiways, ramps, and runway surfaces are icy and extremely slippery; aircraft without anti-skid need extra stopping distance and directional control is reduced. (2) structural icing — climbing into OVC002 at -1°C will produce immediate clear or mixed icing on an unprotected airframe. The 1/4SM visibility is also well below VFR minimums. This is a definitive no-go for VFR and requires careful IFR planning even for equipped aircraft.',faaRef:'Ch. 18, 20'},
      {id:'q_m9_11',type:'mc',question:'Steam fog differs from radiation fog primarily in that:',options:['Steam fog forms only over saltwater, radiation fog only over land','Steam fog forms when cold air moves over a warmer water surface — evaporation exceeds the air’s capacity, creating rising wisps. It is shallow and typically burns off quickly.','Steam fog requires wind speeds above 15 kt to form','Steam fog only forms in winter months'],correct:1,xp:10,explanation:'Steam fog (also called sea smoke or arctic sea smoke) forms when very cold air moves over relatively warm water. Evaporation is rapid because the air is far from saturation, but the cold air quickly becomes saturated near the water surface, forming shallow wisps that rise. It typically extends only a few hundred feet above the surface. Common in autumn/winter when cold continental air moves over the Great Lakes or ocean. Shallow depth means it generally doesn’t persist but can reduce visibility for low-altitude operations.',faaRef:'Ch. 18',concept:'fog_types'},
      {id:'q_m9_12',type:'timed',timeLimit:10,question:'METAR: KJQF 011555Z 00000KT 1/4SM FG OVC002 15/14 A3008. What is the flight category and what does it indicate for your planned VFR departure?',options:['MVFR — marginal VFR, proceed with caution','IFR — ceiling 200 ft and 1/4SM visibility are well below VFR minimums of 3SM/1,000 ft ceiling','LIFR — conditions are extremely severe and improve rapidly with sunrise','VFR — the 15°C temperature means conditions will clear in minutes'],correct:1,xp:15,explanation:'IFR: ceiling <1,000 ft and/or visibility <3 SM. This METAR shows OVC002 (200 ft ceiling) and 1/4 SM visibility in fog — well into IFR, actually approaching LIFR (below 500 ft / below 1 SM). The T-Td spread of 1°C and calm winds indicate radiation fog. VFR departure is not legal (FAR 91.155) and not safe. Options: wait for conditions to improve (check TAF for BECMG/TEMPO), file IFR, or cancel. The T-Td spread and calm wind are consistent with radiation fog that may clear 2-3 hours after sunrise.',faaRef:'Ch. 18',concept:'fog_types'},
      {id:'wb_m9_1',type:'wx_brief',
       title:'Radiation Fog at Destination — KCLT to KHKY',
       mission:{departure:'KCLT',destination:'KHKY',aircraft:'Single-engine piston',
         pilot:'Private pilot, 180 hours, VFR only',ete:'0+35',fuel:'4.0 hours usable',
         departureTime:'1030Z (0630L EDT) — October'},
       products:[
         {type:'metar',label:'KCLT 1056Z',
          raw:'KCLT 141056Z 00000KT 10SM CLR 18/17 A3015 RMK AO2 SLP210',
          decoded:'Calm, 10SM, clear. Temp 18C / dew 17C — 1C spread at Charlotte. Fog has already cleared here, but the near-saturated dewpoint spread indicates dense fog was present earlier this morning. VFR at departure.'},
         {type:'metar',label:'KHKY 1056Z',
          raw:'KHKY 141056Z 00000KT 1/4SM FG OVC001 16/15 A3016 RMK AO2 SLP207',
          decoded:'Calm, 1/4SM in dense fog, overcast at 100ft AGL. Temp 16C / dew 15C — 1C spread. LIFR. Ceiling 100ft — well below any VFR or approach minimums. Dense radiation fog that has not received enough solar heating to lift.'},
         {type:'taf',label:'KHKY TAF (issued 1020Z)',
          raw:'TAF KHKY 141020Z 1412/1512 00000KT 1/4SM FG OVC001 BECMG 1413/1414 1SM BR OVC008 BECMG 1414/1416 P6SM SCT015 BKN040',
          decoded:'Currently LIFR/fog. Forecast to improve to 1SM mist/OVC008 by 1400Z (1000L EDT), then to VFR by 1600Z (1200L EDT). TAF shows improvement — but radiation fog lift timing is uncertain and notoriously difficult to forecast accurately.'},
         {type:'pirep',label:'PIREP over HKY — 1020Z',
          text:'UA /OV HKY /TM 1020 /FL002 /TP C182 /WX FG /VIS 0 /RM FOG SOLID TO GROUND ATTEMPTED VFR ON TOP UNABLE TOPS AT 3000 RETURNED TO KCLT. C182 attempted Hickory at 1020Z. Fog solid to the ground; attempted VFR-on-top but fog tops at 3,000ft MSL. Returned to Charlotte. Filed 10 minutes ago.'}
       ],
       options:[
         {id:'A',label:'Go — Fly direct; wait airborne for KHKY to clear before descending',value:'go'},
         {id:'B',label:'No-go — KHKY is LIFR right now; VFR flight to this destination is not legal or safe today',value:'no_go'},
         {id:'C',label:'Delay — Fog has not lifted; re-brief at 1300Z with actual KHKY conditions before departing',value:'delay'},
         {id:'D',label:'Go — TAF shows improvement by 1400Z; depart at 1330Z when conditions should be better',value:'go_taf'}
       ],
       analysis:{
         correct:'delay',
         explanation:'KHKY is currently LIFR with a 100ft ceiling and 1/4SM visibility — you physically cannot land there right now. The TAF forecasts improvement to VFR by 1600Z (1200L EDT), but that forecast was issued at 1020Z. The PIREP from 10 minutes ago confirms fog solid to the ground with tops at 3,000ft MSL — VFR-on-top is not an option for a piston single in this scenario. Radiation fog lift timing is among the most uncertain short-range forecasts in aviation meteorology. The correct action is to delay and re-brief with actual KHKY conditions at 1300Z. You have 4 hours of fuel and no schedule pressure that justifies the risk.',
         keyFactors:[
           'KHKY current conditions: 1/4SM FG OVC001 — you cannot land there right now regardless of the TAF',
           'PIREP confirms fog solid to ground with tops at 3,000ft — VFR-on-top is not accessible for a piston single',
           'TAF BECMG timing for radiation fog is a forecast, not a guarantee — actual heating rate determines lift time',
           'Re-briefing at 1300Z costs 2.5 hours; your 4.0 hours of fuel supports waiting without pressure'
         ],
         trap:'The TAF says KHKY improves to 1SM by 1400Z — if you depart at 1330Z it looks like you will just make it. The trap is treating the TAF BECMG timing as a precision guarantee. Radiation fog lift depends on solar heating rate, which varies with cloud albedo, humidity, and wind. A fog layer that traps its own moisture can delay burn-off by 1-3 hours beyond TAF forecasts. Actual KHKY conditions at 1300Z are more reliable than a 3-hour-old forecast.'
       },
       xp:30,concept:'fog_types',faaRef:'FAA-H-8083-28A Ch. 18'},
      {id:'wb_m9_2',type:'wx_brief',
       title:'Advection Fog, Persistent IFR — KGSP to KCAE',
       mission:{departure:'KGSP',destination:'KCAE',aircraft:'Single-engine piston',
         pilot:'Private pilot, 420 hours, VFR only',ete:'0+55',fuel:'4.5 hours usable',
         departureTime:'2100Z (1700L EDT) — March'},
       products:[
         {type:'metar',label:'KGSP 2056Z',
          raw:'KGSP 142056Z 21012KT 10SM FEW040 BKN090 26/20 A2998 RMK AO2 SLP145',
          decoded:'SSW wind 12kt, 10SM, few 4,000ft, broken 9,000ft. Temp 26C / dew 20C. VFR at departure. Warm moist southerly flow is the setup for advection fog downstream over the coastal plain.'},
         {type:'metar',label:'KCAE 2053Z',
          raw:'KCAE 142053Z 20008KT 3SM BR OVC004 22/21 A2999 RMK AO2 SLP145',
          decoded:'S wind 8kt, 3SM in mist, overcast at 400ft AGL. Temp 22C / dew 21C — 1C spread. IFR. Ceiling 400ft AGL. Active advection fog driven by warm moist air moving over the cooler SC coastal plain.'},
         {type:'taf',label:'KCAE TAF (issued 1720Z)',
          raw:'TAF KCAE 141720Z 1418/1518 20010KT 2SM BR OVC006 TEMPO 1418/1422 1SM FG OVC002 BECMG 1504/1506 22012KT P6SM BKN040',
          decoded:'Forecast: 2SM mist, overcast 600ft, with fog periods during evening. No significant improvement until 0400-0600Z (0000-0200L EDT) when increasing winds are expected to mix out the moist surface layer. That is 7-9 hours from now.'},
         {type:'pirep',label:'PIREP near CAE — 2020Z',
          text:'UA /OV CAE /TM 2020 /FL004 /TP C182 /WX FG BR /VIS 2 /TB NEG /RM IFR CONDS S OF GSP AREA HOLDING LAST 2 HRS NOT IMPROVING. C182 near Columbia at 400ft AGL: 2SM in fog/mist, no turbulence. IFR conditions south of GSP area holding for last 2 hours — not improving. Filed 40 minutes ago.'}
       ],
       options:[
         {id:'A',label:'Go — 3SM at KCAE is above legal VFR minimums; fly low under the ceiling',value:'go'},
         {id:'B',label:'No-go — Destination is IFR; TAF shows no improvement for 7-9 hours; PIREP confirms conditions stable',value:'no_go'},
         {id:'C',label:'Delay — Wait 2 hours and re-brief; advection fog may lift after dark',value:'delay'},
         {id:'D',label:'Go with alternate — File KCUB as alternate in case KCAE is below minimums on arrival',value:'go_with_alternate'}
       ],
       analysis:{
         correct:'no_go',
         explanation:'KCAE has a ceiling of 400ft AGL — IFR conditions that prohibit VFR flight. The TAF issued 3.5 hours ago shows no improvement for 7-9 more hours, tied to a wind increase after midnight. The PIREP from 40 minutes ago confirms conditions have been holding unchanged for 2 hours. Advection fog — unlike radiation fog — has no diurnal cycle. It does not burn off with sunrise. It persists until wind speed increases enough to mechanically mix the moist surface layer. There is no basis for expecting improvement within a flyable timeframe tonight.',
         keyFactors:[
           'KCAE OVC004 (400ft AGL) is IFR — below legal VFR minimums regardless of visibility',
           'TAF shows no improvement for 7-9 hours; improvement tied to wind increase after midnight',
           'PIREP confirms conditions unchanged for 2 hours — advection fog has no burn-off mechanism tonight',
           'Unlike radiation fog, advection fog persists until wind speed increases to mix the surface layer'
         ],
         trap:'Option A: "3SM is above VFR minimums." Two errors: (1) the ceiling at 400ft AGL means you must fly at or below 400ft above ground in Class E airspace — legally prohibited and dangerous near terrain; (2) Options D: filing KCUB as alternate provides no protection — KCUB is 3nm from KCAE in the same advection fog airmass. Both airports will have identical conditions.'
       },
       xp:30,concept:'fog_types',faaRef:'FAA-H-8083-28A Ch. 18'}
    ]
  },

  // ============================================================
  // M10: MOUNTAIN WEATHER
  // ============================================================
  {
    id:'m10',act:2,title:'Mountain Weather',subtitle:'Waves, rotors & downslope winds',
    icon:'⛰️',color:'#059669',bgColor:'#ECFDF5',prerequisites:['m3','m8'],
    xpReward:225,estimatedMin:18,faaRef:'FAA-H-8083-28A Chapter 16',
    sections:[
      {
        id:'s10_1',title:'Mountain Wave Mechanics',
        content:`
          <p>When stable air flows over a mountain ridge at sufficient speed, the displaced air oscillates in a <strong>standing wave</strong> pattern — much like water flowing over a submerged rock creates downstream waves. These atmospheric waves can extend to <span class="data-tag">60,000 ft MSL</span> and persist for hundreds of miles downwind.</p>
          <div class="fact-box">
            <span style="font-size:28px">🏔️</span>
            <div><strong>Required conditions for mountain wave:</strong> (1) Wind approximately perpendicular to the ridge, (2) wind speed increasing with altitude, (3) a stable atmospheric layer near mountaintop level. Strongest waves occur from late autumn to early spring when synoptic winds are strongest.</div>
          </div>
          <p>Two primary wave types:</p>
          <ul style="padding-left:20px;display:grid;gap:8px;margin:12px 0">
            <li style="font-size:14px;color:#334155"><strong>Vertically Propagating Waves:</strong> Energy propagates upward with height. Wave amplitude can actually <em>increase</em> with altitude (decreasing air density). Can cause turbulence from mountain level to the stratosphere. Strong downslope winds at the surface (100 kt gusts recorded).</li>
            <li style="font-size:14px;color:#334155"><strong>Trapped Lee Waves:</strong> Energy is trapped in the lower troposphere, creating repeating wave crests downwind of the ridge. Cloud bands (lenticular clouds) mark each crest. Most turbulence below cloud base. Moderate-to-severe turbulence common.</li>
          </ul>
        `,
        diagram:{type:'process',key:'orographic_effect'}
      },
      {
        id:'s10_2',title:'Rotor Zones & Lenticular Clouds',
        content:`
          <p>Mountain waves produce several distinctive cloud types and a critically dangerous flight hazard — the rotor zone:</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['🌥️ Lenticular Clouds (ACSL/CCSL)','Smooth, lens-shaped clouds that form at wave crests. Appear stationary (they are standing waves — air flows through them). Laminar appearance = lighter turbulence; lumpy/rolling appearance = heavier turbulence. Seeing lenticulars confirms mountain wave activity is present.','#E0F2FE','#0284C7'],
              ['🌪️ Rotor Clouds / Rotor Zone','Form below and downwind of a wave crest, at or below ridge level. Rolling, turbulent motion. SEVERE TO EXTREME turbulence. Contains intense wind shear. Can cause loss of control — rolling moments may exceed aircraft roll authority. AVOID completely. Especially dangerous during takeoff/landing at mountain airports.','#FEF2F2','#DC2626'],
              ['🌊 Cap Cloud','Forms over the mountain summit itself as air rises and cools. May hide the mountain peak. Marks the upstream side of the wave. If the cap cloud appears to be "boiling" or churning, significant wave activity is likely.','#F5F3FF','#7C3AED'],
            ].map(([title,desc,bg,col])=>`
            <div style="background:${bg};border-radius:16px;padding:16px;border-left:4px solid ${col}">
              <strong style="font-family:var(--font-display);font-size:15px;color:${col}">${title}</strong>
              <p style="font-size:13px;color:#475569;margin:8px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="danger-callout">🚨 <strong>Rotor zones can cause structural failure.</strong> The rotor beneath a mountain wave may have extreme vertical and horizontal wind components. Aircraft have been broken apart in rotor zones. A rotor cloud may look like an innocuous cumulus — the downwind side will have rounded, frothy edges that indicate rotation. If you see these, stay well clear.</div>
        `
      },
      {
        id:'s10_3',title:'Downslope Winds & Mountain Airports',
        content:`
          <p>Strong downslope winds on the lee side of mountains are a severe hazard. These are known by regional names:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">
            ${[
              ['Chinook','Eastern Rockies (CO/WY)','Warm, dry, gusty. Can raise temperatures 40°F in an hour. Associated with virga.'],
              ['Santa Ana','Southern California','Strong offshore flow. Extreme fire weather. Gusts > 60 kt recorded.'],
              ['Foehn','European Alps','The "archetype" — warm dry wind on lee side causes snow melt.'],
              ['Bora','Adriatic coast','Cold, dense katabatic wind. Extremely powerful gusts.'],
            ].map(([name,region,desc])=>`
            <div style="background:white;border-radius:14px;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,.05)">
              <strong style="font-family:var(--font-display);color:#059669">${name}</strong>
              <div style="font-size:11px;color:#94A3B8;margin:2px 0">${region}</div>
              <p style="font-size:12px;color:#475569;margin:4px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
          <p><strong>Mountain airport hazards:</strong></p>
          <div style="display:grid;gap:8px;margin:12px 0">
            ${[
              ['Density altitude','High elevation + warm temps = extreme DA. Performance calculations are critical — many mountain airports have density altitudes exceeding 10,000 ft on summer afternoons.'],
              ['Terrain-induced turbulence','Mechanical turbulence from ridges upwind. Surface winds often differ dramatically from the reported AWOS due to terrain channeling. PIREP current conditions from recently departed aircraft.'],
              ['One-way runway pressure','Some mountain airports have limited escape routes — a missed approach may commit you to terrain. Know the escape route before you descend.'],
              ['Valley/mountain breeze cycles','Expect dramatic wind shifts between morning (mountain breeze, downslope) and afternoon (valley breeze, upslope). Plan fuel and performance around worst-case direction.'],
            ].map(([title,desc])=>`
            <div style="background:#ECFDF5;border-radius:12px;padding:12px;border-left:4px solid #059669">
              <strong style="font-family:var(--font-display);font-size:13px;color:#065F46">${title}</strong>
              <p style="font-size:12px;color:#475569;margin:4px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
        
          <div style="background:#E0F2FE;border-radius:12px;padding:14px;margin-top:14px;border-left:3px solid #0284C7">
            <strong style="font-family:var(--font-display);font-size:13px;color:var(--navy)">🧊 Mountain Icing</strong>
            <p style="font-size:13px;color:#475569;margin:6px 0 0">Mountains significantly <strong>enhance icing conditions</strong> compared to flat terrain. Orographic lift forces moist air upward, creating large supercooled water content on windward slopes. Icing can be severe in lenticular clouds, cap clouds capping the summit, and in rotor zones below wave crests. <strong>Key hazard:</strong> icing can exist in clear air (outside visible cloud) inside wave systems. Always check CIP/AIRMET Zulu before mountain crossings, even in apparently clear conditions aloft.</p>
          </div>`
      },
      {
        id:'s10_4',title:'Mountain Wave Flight Planning',
        content:`
          <div class="danger-callout">☠️ <strong>Mountain waves have destroyed aircraft at cruise altitude — including airline jets.</strong> Never assume smooth flight over mountain terrain just because you are at high altitude. The wave can extend to 60,000+ ft.</div>
          <p>Pre-flight planning checklist for mountain flying:</p>
          <div style="display:grid;gap:8px;margin:16px 0">
            ${[
              ['Check winds aloft at mountain level','Wind perpendicular to ridge + strong + increasing with altitude = wave possible. 25+ kt crossing wind at mountain level suggests wave activity.'],
              ['Check SIGMETs and AIRMETs','Mountain Wave SIGMETs are issued for severe turbulence. AIRMET Sierra covers IFR conditions; AIRMET Tango covers turbulence including mountain wave.'],
              ['Obtain current PIREPs','PIREPs over the mountains are the best real-time source. Note altitude, intensity, and aircraft type.'],
              ['Know the visual cues','Lenticular clouds (wave active), cap cloud (upstream), rotor cloud below wave crest (avoid!). Absence of clouds does NOT mean absence of wave.'],
              ['Compute worst-case DA','Use forecast high temp and current pressure altitude for every significant airfield along the route.'],
            ].map(([title,desc],i)=>`
            <div style="background:white;border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.05);display:flex;gap:12px">
              <div style="width:28px;height:28px;border-radius:50%;background:#059669;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:900;font-size:14px;color:white;flex-shrink:0">${i+1}</div>
              <div><strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${title}</strong><p style="font-size:12px;color:#475569;margin:4px 0 0">${desc}</p></div>
            </div>`).join('')}
          </div>
        `
      }
    ],
    quiz:[
      {
        id:'q_m10_1',type:'mc',
        question:'What conditions are required for mountain wave formation?',
        options:[
          'Unstable air mass, wind parallel to the ridge, and high moisture content',
          'Stable air, wind approximately perpendicular to the ridge, and wind speed increasing with altitude',
          'Cold front passage, strong convective activity, and low dewpoint',
          'Thermal updrafts over heated terrain and cross-mountain wind from any direction'
        ],
        correct:1,xp:10,
        explanation:'Mountain waves require: (1) stable air (allows oscillation rather than convective disruption), (2) wind approximately perpendicular to the ridge (to maximize displacement), and (3) wind speed increasing with altitude. Strongest waves occur late autumn to early spring when synoptic flow is strongest.',
        faaRef:'Ch. 16',concept:'mountain_wave'
      },
      {
        id:'q_m10_2',type:'mc',
        question:'Lenticular clouds (standing lenticular altostratus) associated with mountain waves indicate:',
        options:[
          'No significant turbulence — their smooth shape confirms laminar flow',
          'Mountain wave activity is present; turbulence intensity depends on cloud appearance',
          'Surface fog formation is imminent in the valleys below',
          'The mountain crest is obscured — approach the terrain cautiously'
        ],
        correct:1,xp:10,
        explanation:'Lenticular clouds confirm mountain wave activity is present. Their appearance tells you about turbulence: smooth, laminar edges = lighter turbulence; lumpy, churning, or rolling appearance = significant turbulence. Their ABSENCE does not mean no wave — dry air produces no clouds even in strong wave conditions.',
        faaRef:'Ch. 16',concept:'mountain_wave'
      },
      {
        id:'q_m10_3',type:'mc',
        question:'Rotor zones in mountain wave are most dangerous because:',
        options:[
          'They produce moderate icing at high altitudes',
          'They contain severe-to-extreme turbulence with rolling moments that can exceed aircraft roll authority, especially dangerous near the ground',
          'They reduce visibility to IFR conditions inside the rotor cloud',
          'They redirect surface winds to directly oppose landing aircraft'
        ],
        correct:1,xp:10,
        explanation:'Rotor zones contain the most intense turbulence in mountain wave — severe to extreme. The rolling/twisting motion can generate moments that exceed the aircraft\'s roll authority, causing loss of control. Aircraft have been broken apart. Rotors are especially deadly at low altitude (takeoff/landing at mountain airports) where there is no recovery altitude. Avoid completely.',
        faaRef:'Ch. 16',concept:'mountain_wave'
      },
      {
        id:'q_m10_4',type:'scenario',
        scenario:'You are planning a westbound VFR flight crossing the Rocky Mountains at 14,500 ft. Winds at 14,000 ft are forecast 280°/35 kt. A Mountain Wave SIGMET is in effect for severe turbulence between 12,000 and 45,000 ft. Current METARs at mountain airports show lenticular clouds. You are flying a light single-engine aircraft.',
        question:'What is the safest decision?',
        options:[
          'Proceed at 14,500 ft — your altitude puts you above the worst rotor zone',
          'Do not cross the mountains today — the SIGMET, lenticulars, and strong perpendicular winds indicate severe mountain wave. Wait for conditions to change.',
          'Cross at night when surface heating is absent and wave activity diminishes',
          'File IFR and the controller will route you around the worst turbulence'
        ],
        correct:1,xp:25,
        explanation:'Multiple indicators of severe mountain wave: SIGMET for severe turbulence 12,000-45,000 ft (your entire crossing altitude is inside the SIGMET), lenticular clouds confirming active wave, 35 kt perpendicular flow. The SIGMET means the wave is already severe enough to be officially hazardous. For a light single crossing mountains, this is a no-go. Mountain wave can cause structural damage or complete loss of control. Wait for the pattern to change.',
        faaRef:'Ch. 16'
      },
      {
        id:'q_m10_5',type:'timed',
        timeLimit:10,
        question:'Mountain wave activity is MOST severe during which season?',
        options:['Summer — afternoon heating maximizes convection','Late autumn to early spring — strongest synoptic winds','Early morning in all seasons — temperature inversions','Summer nights — strongest radiational cooling'],
        correct:1,xp:15,
        explanation:'Mountain wave is most severe late autumn through early spring when synoptic (large-scale) wind flow is strongest. Summer brings weaker large-scale flow, so hazardous mountain-area winds are more likely from thunderstorm outflows than from sustained wave patterns. However, mountain wave can occur any season.',
        faaRef:'Ch. 16',concept:'mountain_wave'
      },
      {
        id:'q_m10_6',type:'mc',
        question:'The Chinook wind is:',
        options:[
          'A cold, dense outflow wind from mountain glaciers in the Canadian Rockies',
          'A warm, dry, gusty downslope wind on the eastern side of the Rocky Mountains',
          'A moisture-laden coastal wind that produces orographic rain on the windward slopes',
          'A katabatic wind that flows down mountain slopes at night'
        ],
        correct:1,xp:10,
        explanation:'The Chinook is a warm, dry, gusty downslope (foehn) wind on the lee (east) side of the Rocky Mountains. As air descends the lee slope, it warms dry-adiabatically, producing sudden temperature rises (40°F in an hour is not unusual), rapid snow melt, low humidity, and extreme fire weather conditions. Wind speeds can be destructive.',
        faaRef:'Ch. 16',concept:'local_winds'
      },
      {
        id:'q_m10_7',type:'mc',
        question:'A pilot reports "smooth, lens-shaped clouds stationary over the mountain peaks" on a preflight weather call. What do these clouds indicate and what should the pilot do?',
        options:[
          'Orographic cumulus — harmless, indicates moist air but no significant hazard',
          'Lenticular clouds confirming active mountain wave — the pilot should obtain current PIREPs, check for wave SIGMETs, and plan the route carefully with altitude and fuel reserves for wave activity',
          'Cap clouds — indicating the mountain is below the freezing level and icing will be present',
          'Standing wave clouds are only visible from the air; surface reports of them can be ignored for flight planning'
        ],
        correct:1,xp:10,
        explanation:'Lenticular clouds (ACSL/CCSL) are a definitive visual indicator that mountain wave activity is present. They form at wave crests where upward-moving air cools to saturation. Their presence means: get PIREPs from pilots who have flown through the area recently; check for mountain wave SIGMETs and AIRMETs; plan for possible severe turbulence, large altitude deviations, and strong downdrafts on the lee side; carry extra fuel.',
        faaRef:'Ch. 16',concept:'mountain_wave'
      },
      {
        id:'q_m10_8',type:'scenario',
        scenario:'You are approaching a mountain airport for landing. Winds on the ATIS are calm. However, you notice ragged, rapidly churning clouds at ridge level to the north of the airport, and your airspeed has varied ±25 kt on final approach with no pilot input. The METAR 30 minutes ago showed winds calm but gusting to 35 kt alternating in direction.',
        question:'What are these cues indicating and what is the safest action?',
        options:[
          'Faulty airspeed indicator — land normally and have it checked after shutdown',
          'A rotor zone is likely affecting the approach — go around immediately, do not attempt to land until conditions stabilize. Rotor-induced rolling moments may exceed aircraft roll authority near the ground.',
          'Normal mountain mechanical turbulence — slow to Va and continue the approach',
          'Wake turbulence from an aircraft that departed recently — wait 3 minutes then try again'
        ],
        correct:1,xp:25,
        explanation:'Multiple rotor zone signatures: ragged churning clouds at ridge level (rotor cloud appearance), ±25 kt uncommanded airspeed variations, and alternating gusts in the METAR — all are classic rotor indicators. At low altitude on approach, rotor turbulence can generate rolling moments that exceed the aircraft\'s roll authority, causing loss of control. Go around immediately, exit the area, and do not return until PIREPs and METARs confirm stable conditions. Rotor zones are most dangerous at low altitude where there is no recovery margin.',
        faaRef:'Ch. 16'
      }
    ,
      {id:'q_m10_9',type:'mc',question:'Lenticular clouds (lens-shaped clouds) over or downwind of mountains indicate:',options:['Normal cumulus development — no hazard present','Active mountain wave conditions — severe turbulence and icing may exist even where skies appear clear between wave crests','Fog forming on the mountain summit — only a hazard to aircraft on the ground','Light winds and stable conditions — these are friendly clouds for mountain flying'],correct:1,xp:10,explanation:'Lenticular (lens-shaped, stationary) clouds form at the crests of mountain waves. Their smooth, layered appearance is deceptive — the air flowing through them is in violent up-and-down motion. Moderate to severe turbulence and significant icing can exist within and near lenticulars. The rotor zone below the wave (often marked by ragged cumulus at ridge level) contains the most violent turbulence. NEVER fly into or under a lenticular cloud without understanding current wave conditions.',faaRef:'Ch. 16',concept:'mountain_wave'},
      {id:'q_m10_10',type:'scenario',scenario:'Planning a VFR mountain crossing in a normally-aspirated single-engine piston. Mountains rise to 5,500 ft MSL. Winds at 9,000 ft: 280/45KT. Current ceiling is clear, visibility unlimited. No AIRMETs issued yet.',question:'Should you proceed? What factors determine if this crossing is safe?',options:['Proceed — clear skies and no AIRMETs mean the crossing is safe','Strong perpendicular winds (45 kt at 280°) across north-south ridges create mountain wave hazard even under clear skies. Assess: Can you cross at least 1,000 ft above the highest ridges? Do you have an escape route? File a flight plan.','Only check AIRMETs for mountain weather — if none issued, it’s safe to cross','45 kt is the safe maximum wind speed for any mountain crossing'],correct:1,xp:20,explanation:'Strong winds (25+ kt) perpendicular to mountain ridges are the primary trigger for hazardous mountain wave activity — with or without an AIRMET. AIRMETs are issued in advance and may not yet reflect rapidly developing wave conditions. Key mountain crossing rules: (1) cross ridges at least 1,000 ft above the highest point with an escape route, (2) if the airplane can’t climb to that altitude, don’t cross, (3) if you encounter unexpected downdrafts that exceed your climb rate, turn back immediately, (4) normally-aspirated piston singles are typically underpowered for high mountain work in density altitude conditions.',faaRef:'Ch. 16'},
      {id:'q_m10_11',type:'mc',question:'The primary danger of rotor zones in mountain wave systems is:',options:['Rotor zones are only a visual hazard — they don’t affect aircraft performance','Extreme turbulence within the rotor that can exceed aircraft structural limits, combined with icing — particularly hazardous at low altitude where recovery is impossible','Rotor zones only produce light to moderate turbulence — mainly an inconvenience','Rotors only form above 15,000 ft MSL'],correct:1,xp:10,explanation:'Rotor zones form in the turbulent lower portion of mountain wave systems, typically at or below ridge height on the lee side. They contain extremely violent turbulence (often severe to extreme) with rapidly changing wind directions and speeds. An aircraft entering a rotor zone at low altitude has little margin for recovery. Rotors are often marked by a roll cloud or ragged cumulus at ridge level. If you see churning, boiling-looking cumulus at ridge height in the lee of mountains with strong winds, stay well clear.',faaRef:'Ch. 16',concept:'mountain_wave'},
      {id:'q_m10_12',type:'timed',timeLimit:10,question:'Density altitude at KAVL (elevation 2,165 ft MSL) on a summer day: OAT 32°C, altimeter 30.05. Approximate density altitude is:',options:['About 2,165 ft — density altitude equals field elevation at standard conditions','About 5,500 ft — high temperature significantly raises effective density altitude above field elevation','About 3,000 ft — only slightly above field elevation','About 1,000 ft — high altimeter setting lowers density altitude'],correct:1,xp:15,explanation:'Rough density altitude calculation: pressure altitude ≈ (29.92-30.05)× 1,000 + 2,165 = 2,165 - 130 = ~2,035 ft pressure altitude. Then add temperature correction: (32-ISA at 2,035ft)×120 ≈ (32-11)×120 = 21×120 = 2,520 ft added. Total density altitude ≈ 4,555 ft. With density altitude near 5,000+ ft, a normally-aspirated piston single can expect significantly degraded climb performance, longer takeoff roll, and reduced obstacle clearance. Always compute DA before operations at KAVL.',faaRef:'Ch. 16',concept:'density_altitude'}
    ]
  },

  // ====== ACT 3: THE PRODUCTS ======
  // ============================================================
  // M11: METAR DECODER
  // ============================================================
  {
    id:'m11',act:3,title:'METAR Decoder',subtitle:'Read any aviation weather observation',
    icon:'📋',color:'#7C3AED',bgColor:'#F5F3FF',prerequisites:['m1','m2'],
    xpReward:200,estimatedMin:20,faaRef:'FAA-H-8083-28A Chapter 24',
    sections:[
      {
        id:'s11_1',title:'What Is a METAR?',
        content:`
          <p>A <strong>METAR</strong> (Aviation Routine Weather Report) is the standard surface weather observation used worldwide. It provides a snapshot of current conditions at an airport — the most critical piece of weather information for departure, approach, and alternate planning.</p>
          <div class="fact-box">
            <span style="font-size:28px">⏱️</span>
            <div><strong>Routine METARs</strong> are issued near the top of each hour. <strong>SPECIs</strong> (Special reports) are issued whenever conditions change significantly — visibility crosses key thresholds, thunderstorm begins/ends, wind shifts 45°+ in under 15 min at ≥10 kt.</div>
          </div>
          <p>The METAR code is used worldwide (ICAO standard), though some elements differ between countries. This course focuses on the US format as defined in FAA-H-8083-28A.</p>
          <div class="callout">📖 <strong>Format overview:</strong> TYPE · STATION · DATE/TIME · MODIFIER · WIND · VISIBILITY · RVR · WEATHER · SKY · TEMP/DEW · ALTIMETER · RMK (remarks)</div>
          <p>Modern weather apps decode METARs automatically — but <em>every pilot must understand the raw code</em> because the decoded version may not always be available, and understanding the format lets you spot unusual or critical items quickly.</p>
        `
      },
      {
        id:'s11_2',title:'Interactive METAR Decoder',
        content:`<p>Tap any highlighted group in the METAR below to see a full explanation. Work through each element from left to right — this is how a dispatcher or examiner will expect you to read it.</p>`,
        diagram:{type:'process',key:'metar_syntax'}
      },
      {
        id:'s11_3',title:'Wind, Visibility & Sky Condition',
        content:`
          <p>Three elements form the backbone of every weather decision: <strong>wind, visibility, and ceiling</strong>.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['💨','Wind Group','Format: DDD/FF[G{f}f]KT — Direction in true degrees, speed in knots, optional gust. VRB = variable direction (speed ≤6 kt). Variable range shown as DDDVddd when variation ≥60° and speed >6 kt. 00000KT = calm.'],
              ['👁️','Visibility Group','Prevailing visibility in statute miles (SM) in the US. M1/4SM = less than 1/4 SM. P6SM = more than 6 SM. The threshold: <3 SM = IFR; <1 SM = LIFR; <1/4 SM = zero-zero conditions.'],
              ['☁️','Sky Condition','Coverage (FEW/SCT/BKN/OVC) + height in hundreds of feet AGL. <strong>FEW = 1–2/8</strong> (a few clouds), <strong>SCT = 3–4/8</strong> (scattered), <strong>BKN = 5–7/8</strong> (broken — counts as a ceiling), <strong>OVC = 8/8</strong> (overcast — counts as a ceiling). CB suffix = cumulonimbus. TCU = towering cumulus. CLR = clear below 12,000 ft (automated). SKC = clear (manual).'],
            ].map(([icon,title,desc])=>`
            <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,.06);display:flex;gap:12px">
              <span style="font-size:28px;flex-shrink:0">${icon}</span>
              <div><strong style="font-family:var(--font-display);color:var(--product)">${title}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p></div>
            </div>`).join('')}
          </div>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">VFR/IFR FLIGHT CATEGORIES</div>
            ${[['VFR','Ceiling >3,000 ft AGL AND visibility >5 SM','#10B981'],['MVFR','Ceiling 1,000–3,000 ft OR visibility 3–5 SM (or both)','#F59E0B'],['IFR','Ceiling 500–1,000 ft OR visibility 1–3 SM (or both)','#F97316'],['LIFR','Ceiling <500 ft OR visibility <1 SM (or both)','#EF4444']].map(([cat,def,col])=>`
            <div style="display:flex;align-items:flex-start;gap:10px;border-bottom:1px solid rgba(255,255,255,.08);padding:8px 0;font-size:12px">
              <span style="color:${col};font-weight:900;min-width:40px">${cat}</span>
              <span style="color:#94A3B8">${def}</span>
            </div>`).join('')}
          </div>
        `
      },
      {
        id:'s11_4',title:'Present Weather & Remarks',
        content:`
          <p>The <strong>present weather</strong> group uses a structured prefix + descriptor + phenomenon code. Understanding it is essential for immediate go/no-go decisions.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">WEATHER CODE STRUCTURE</div>
            ${[['Intensity','-  (light) | [none] (moderate) | +  (heavy)','#38BDF8'],['Descriptor','MI (shallow) | BC (patches) | PR (partial) | DR (drifting) | BL (blowing) | SH (shower) | TS (thunderstorm) | FZ (freezing)','#F59E0B'],['Phenomenon','RA (rain) | SN (snow) | GR (hail) | FG (fog) | BR (mist) | HZ (haze) | TS (tstorm alone) | FZRA (frz rain) | BLSN (blowing snow) | VA (volcanic ash)','#10B981']].map(([cat,val,col])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;font-size:11px">
              <div style="color:${col};font-weight:700;margin-bottom:4px;font-family:var(--font-display)">${cat}</div>
              <div style="color:#94A3B8">${val}</div>
            </div>`).join('')}
          </div>
          <p>The <strong>RMK</strong> (remarks) section contains often-critical information:</p>
          <div style="display:grid;gap:8px;margin:12px 0">
            ${[['AO1/AO2','Station type: AO2 has precip discriminator (can tell rain from snow). AO1 cannot.'],['TSB##','Thunderstorm began at ##-past-the-hour. TSE## = ended.'],['PRESRR/PRESFR','Pressure rising/falling rapidly — front approaching or passing.'],['SLP###','Sea level pressure in mb (decode: 132 = 1013.2 mb, add 10 if <800).'],['CIG ### RWY##','Ceiling at a second sensor location (often runway touchdown zone).'],['PK WND DDD/FF','Peak wind since last METAR — important for crosswind planning.'],['WSHFT####','Wind shift at time shown — often associated with frontal passage.'],].map(([code,desc])=>`
            <div style="background:white;border-radius:12px;padding:12px 14px;display:flex;gap:10px;align-items:flex-start">
              <code style="background:var(--navy);color:#38BDF8;padding:3px 8px;border-radius:6px;font-size:11px;white-space:nowrap;flex-shrink:0">${code}</code>
              <span style="font-size:13px;color:#475569">${desc}</span>
            </div>`).join('')}
          </div>
        `,
        diagram:{type:'flight_category_calc'}
      },
      {
        id:'s11_4b',title:'Weather Code Builder',
        content:`
          <p>The <strong>present weather</strong> group uses a structured prefix + descriptor + phenomenon code. Understanding it is essential for immediate go/no-go decisions.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">WEATHER CODE STRUCTURE</div>
            ${[['Intensity','-  (light) | [none] (moderate) | +  (heavy)','#38BDF8'],['Descriptor','SH (shower) | TS (thunderstorm) | FZ (freezing) | BL (blowing)','#F59E0B'],['Phenomenon','RA (rain) | SN (snow) | GR (hail) | FG (fog) | BR (mist) | HZ (haze) | FZRA (freezing rain)','#10B981']].map(([cat,val,col])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;font-size:11px">
              <div style="color:${col};font-weight:700;margin-bottom:4px;font-family:var(--font-display)">${cat}</div>
              <div style="color:#94A3B8">${val}</div>
            </div>`).join('')}
          </div>
          <p>The <strong>RMK</strong> (remarks) section contains often-critical information:</p>
          <div style="display:grid;gap:8px;margin:12px 0">
            ${[['AO1/AO2','AO2 = automated WITH precip discriminator. AO1 = without.'],['TSB##','Thunderstorm began at ##-past-the-hour. TSE## = ended.'],['PRESRR/PRESFR','Pressure rising/falling rapidly — frontal passage imminent.'],['SLP###','Sea level pressure in mb (decode: 132 = 1013.2 mb).'],['PK WND DDD/FF','Peak wind since last METAR.'],['WSHFT####','Wind shift — often associated with frontal passage.']].map(([code,desc])=>`
            <div style="background:white;border-radius:12px;padding:10px 14px;display:flex;gap:10px;align-items:flex-start">
              <code style="background:var(--navy);color:#38BDF8;padding:3px 8px;border-radius:6px;font-size:11px;white-space:nowrap;flex-shrink:0">${code}</code>
              <span style="font-size:13px;color:#475569">${desc}</span>
            </div>`).join('')}
          </div>
        `,
        diagram:{type:'weather_code_builder'}
      },
      {
        id:'s11_5',title:'Decode Practice',
        content:`<p>Put it all together. Tap each group in these real-world METARs to test your decoding speed.</p>`,
        diagram:{type:'decode_practice'}
      }
    ],
    quiz:[
      {id:'q_m11_1',type:'mc',question:'In the METAR group "22015G25KT", what does "G25" indicate?',options:['The wind is gusting to 25 kt','The wind direction varies 25 degrees','The gust lasts 25 seconds','The wind speed is 25 kt at 2,200 ft'],correct:0,xp:10,explanation:'G = gust. 22015G25KT = wind from 220° at 15 kt, gusting to 25 kt. Gusts are reported when the variation between peak and lull wind speeds is 10 kt or more.',faaRef:'Ch. 24',concept:'metar_decode'},
      {id:'q_m11_2',type:'mc',question:'Sky condition "OVC010CB" means:',options:['Overcast at 1,000 ft AGL with cumulonimbus','Occasional clouds at 10,000 ft with CB','Overcast at 10 ft — zero ceiling','Obscured visibility at 1,000 ft'],correct:0,xp:10,explanation:'OVC = overcast (ceiling). 010 = 1,000 ft AGL. CB = cumulonimbus — active thunderstorm. Serious IFR conditions.',faaRef:'Ch. 24',concept:'metar_decode'},
      {id:'q_m11_3',type:'mc',question:'A METAR showing "M1/4SM FG" describes:',options:['MVFR conditions','VFR — fog is minimal','LIFR — less than 1/4 SM in fog','IFR — between 1 and 3 SM'],correct:2,xp:10,explanation:'M1/4SM = less than 1/4 statute mile = LIFR. FG = fog (visibility < 5/8 SM). Zero-zero conditions.',faaRef:'Ch. 24',concept:'metar_decode'},
      {id:'q_m11_4',type:'timed',timeLimit:10,question:'The METAR timestamp "181350Z" means:',options:['1350 local time on the 18th','Day 18 at 13:50 UTC','18 knots at 1350 ft','1350 hours on runway 18'],correct:1,xp:15,explanation:'METAR timestamps: DDHHMM Z. Day = 18, Hour = 13, Minute = 50, Z = UTC. Always in UTC — never local time.',faaRef:'Ch. 24',concept:'metar_decode'},
      {id:'q_m11_5',type:'scenario',scenario:'Destination METAR: KXXX 151455Z 28012KT 5SM -RA BKN025 OVC050 12/10 A2985 RMK AO2',question:'What is the flight category and primary concern?',options:['VFR — well above minimums','MVFR — 5 SM and 2,500 ft ceiling; light rain and near-saturation T/Td spread suggest worsening','IFR — any rain creates IFR','LIFR — low altimeter'],correct:1,xp:20,explanation:'MVFR: ceiling 1,000-3,000 ft OR vis 3-5 SM. BKN025 = 2,500 ft ceiling; vis 5 SM. T/Td spread = 2°C — near saturation. Monitor trends.',faaRef:'Ch. 24'},
      {id:'q_m11_6',type:'mc',question:'"AO2" in METAR remarks means:',options:['Automated station WITH precipitation discriminator','Aircraft observation 2','Altimeter offset 2 inHg','ATC observation 2'],correct:0,xp:10,explanation:'AO2 = automated station WITH precipitation discriminator (can distinguish rain from snow). AO1 = without — precipitation type unreliable.',faaRef:'Ch. 24',concept:'metar_decode'},
      {id:'q_m11_7',type:'drag_drop',question:'Match each METAR group to what it reports:',items:['22015G25KT','3/4SM','OVC010CB','18/16'],targets:['Wind direction/speed/gusts','Prevailing visibility','Ceiling height & cloud type','Temperature & dewpoint'],answers:{'22015G25KT':'Wind direction/speed/gusts','3/4SM':'Prevailing visibility','OVC010CB':'Ceiling height & cloud type','18/16':'Temperature & dewpoint'},xp:20,explanation:'METAR sequence: Wind DDD/FF[G]KT → Visibility [number]SM → Sky COVHHH[type] → Temp/Dew TT/DD. Always in this order.',faaRef:'Ch. 24',concept:'metar_decode'},
      {id:'q_m11_8',type:'timed',timeLimit:10,question:'Flight category for: OVC008, 1 1/2SM -RA?',options:['VFR','MVFR','IFR — ceiling 500-1,000 ft OR vis 1-3 SM','LIFR'],correct:2,xp:15,explanation:'IFR: ceiling 500-1,000 ft OR visibility 1-3 SM. OVC008 = 800 ft (IFR). 1.5 SM vis (IFR). Both qualify.',faaRef:'Ch. 24',concept:'metar_decode'},
      {id:'q_m11_9',type:'mc',question:'"180V250" after a wind group means:',options:['Wind at 180 kt varying to 250 kt','Wind direction varying between 180° and 250°','Visibility varying 1.8 to 2.5 SM','Cross-runway wind component'],correct:1,xp:10,explanation:'Variable wind direction (DDDVddd): direction varies ≥60° and speed >6 kt. "180V250" = varying from 180° to 250°.',faaRef:'Ch. 24',concept:'metar_decode'}
    ,
      {id:'q_m11_10',type:'timed',timeLimit:15,question:'METAR: KCLT 121856Z 33012G22KT 10SM FEW035 BKN080 24/12 A2998 RMK AO2 SLP150. What is the T-Td spread and what does it suggest?',options:['T-Td = 6°C — moderate humidity, convective development possible this afternoon','T-Td = 12°C — relatively dry air, low fog risk, but afternoon convection possible with heating','T-Td = 24°C — extremely dry air, no convection possible','T-Td = 0°C — saturation imminent, fog expected within the hour'],correct:1,xp:15,explanation:'T=24°C, Td=12°C. Spread = 12°C. This indicates moderate humidity — not near saturation (no fog risk), but sufficient moisture for afternoon convective development if heating continues. LCL ≈ 12×400 = 4,800 ft AGL — cloud base if convection develops. SLP=1015.0 mb (150 = 1015.0 since result >500, add 10). Winds 330/12G22 suggest a northwest flow, probably post-frontal or pre-convective. The BKN080 layer plus moderate moisture plus daytime heating = afternoon CB development possible.',faaRef:'Ch. 24',concept:'metar_decode'},
      {id:'q_m11_11',type:'mc',question:'A METAR contains "TSRA" in the weather group. What does this mean and what is the minimum flight category?',options:['Trace amounts of rain — flight category VFR','Thunderstorm with rain — automatically requires IFR weather evaluation regardless of ceiling/visibility','Thunder and rain have ended — TSRA indicates recent weather only','Tropical storm activity — only relevant for Gulf operations'],correct:1,xp:10,explanation:'TSRA = Thunderstorm (TS) with Rain (RA). A METAR reporting active thunderstorms requires immediate evaluation for pilot safety regardless of the listed ceiling and visibility. Thunderstorms bring rapid condition changes, microburst risk, wind shear, hail, and lightning. Even if the METAR shows 10SM visibility (temporarily between cells), the presence of TS means conditions can deteriorate to near-zero in minutes. VFR flight into known thunderstorm activity is extremely dangerous.',faaRef:'Ch. 24',concept:'metar_decode'},
      {id:'q_m11_12',type:'scenario',scenario:'METAR: KHKY 151252Z AUTO 27008KT 3SM -RA BR BKN012 OVC030 16/15 A2985. This is an automated observation.',question:'What additional limitation should you note about this METAR’s reliability?',options:['Automated METARs are less reliable than human-observed METARs in specific weather phenomena such as thunderstorms, freezing precipitation, and visibility obstructions near the station','Automated observations are always more accurate than human observers','The 3SM visibility is impossible in rain and mist — this METAR is invalid','AO2 stations cannot report wind'],correct:0,xp:15,explanation:'Automated stations (ASOS/AWOS) have limitations: they cannot detect all weather phenomena that human observers can (e.g., they may miss a thunderstorm overhead, cannot report cumulonimbus type, may under-report snow depth, may report sky cover less accurately in precipitation). Always note "AUTO" in the METAR. When conditions are marginal or changing rapidly, try to get a human-augmented report if available. At KHKY, T-Td spread of 1°C with BKN012 means the area is nearly saturated and conditions could drop to IFR quickly.',faaRef:'Ch. 24'}
    ]
  },

  // ============================================================
  // M12: TAF DECODER
  // ============================================================
  {
    id:'m12',act:3,title:'TAF — Terminal Forecasts',subtitle:'Read and decode aerodrome forecasts',
    icon:'📅',color:'#0284C7',bgColor:'#E0F2FE',prerequisites:['m11'],
    xpReward:200,estimatedMin:18,faaRef:'FAA-H-8083-28A Chapter 27',
    sections:[
      {
        id:'s12_1',title:'What Is a TAF?',
        content:`
          <p>A <strong>TAF</strong> (Terminal Aerodrome Forecast) is a concise forecast of expected meteorological conditions within <span class="data-tag">5 SM</span> of an airport's runway complex. TAFs use the same weather codes as METARs.</p>
          <div class="fact-box">
            <span style="font-size:28px">🕐</span>
            <div><strong>Issuance:</strong> NWS Weather Forecast Offices issue TAFs for ~700 US airports, 4 times per day at 0000, 0600, 1200, and 1800 UTC. Standard TAFs cover 24 hours; major airports get 30-hour TAFs. TAF AMD = amended forecast (supersedes prior TAF immediately).</div>
          </div>
          <p>TAFs are the primary forecasting tool for IFR flight planning — specifically for determining alternate airport requirements and planning fuel loads. If the destination TAF shows conditions below alternate minimums during the expected arrival window, an alternate is legally required.</p>
          <div class="callout">📋 <strong>The 1-2-3 Alternate Rule (14 CFR 91.169):</strong> If from 1 hour before to 1 hour after your estimated arrival time, the destination TAF shows ceilings <2,000 ft OR visibility <3 SM, you must file an alternate. The alternate must have forecast conditions at or above alternate minimums.</div>
        `
      },
      {
        id:'s12_2',title:'TAF Format & Change Groups',
        content:`
          <p>A TAF begins like a METAR (station, date/time, wind, vis, weather, sky) — then uses <strong>change group indicators</strong> to show how conditions evolve:</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">TAF CHANGE INDICATOR REFERENCE</div>
            ${[
              ['FM####','FROM — abrupt change at stated time. New conditions replace ALL previous. Most common change type. FM0300 = conditions change entirely at 0300Z.','#38BDF8'],
              ['TEMPO DD/DD HH/HH','TEMPORARY — conditions fluctuate, each occurrence lasting <1 hr, total <½ the period. Does NOT replace main forecast. Expect intermittent IFR.','#F59E0B'],
              ['BECMG DDHH/DDHH','BECOMING — gradual change expected to be complete by end of period. Gradual transition. Not as abrupt as FM.','#10B981'],
              ['PROB30/PROB40','PROBABILITY — 30% or 40% probability of conditions in following group. PROB30 = less likely than not; PROB40 = more likely. Signals significant uncertainty.','#8B5CF6'],
              ['NSW','No Significant Weather — clears previous weather group when conditions improve and no precip/restrictions expected.','#94A3B8'],
            ].map(([code,desc,col])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:10px 0">
              <div style="color:${col};font-weight:700;font-size:12px;margin-bottom:4px;font-family:var(--font-display)">${code}</div>
              <div style="font-size:11px;color:#94A3B8">${desc}</div>
            </div>`).join('')}
          </div>
        `,
        diagram:{type:'process',key:'taf_change_groups'}
      },
      {
        id:'s12_3',title:'Decoding a Real TAF',
        content:`
          <p>Let's decode a complete TAF step by step:</p>
          <div style="background:#0C1B33;border-radius:16px;padding:18px;margin:16px 0;font-family:var(--font-mono);font-size:13px;line-height:2;color:white;word-break:break-all">
            TAF KDFW 061737Z <span style="color:#38BDF8">0618/0718</span> <span style="color:#F43F5E">23010KT</span> <span style="color:#10B981">P6SM</span> <span style="color:#F59E0B">SKC</span><br>
            <span style="color:#8B5CF6">FM061900</span> <span style="color:#F43F5E">24015G25KT</span> <span style="color:#10B981">5SM</span> <span style="color:#F59E0B">-TSRA SCT030CB BKN060</span><br>
            <span style="color:#EC4899">TEMPO 0621/0702</span> <span style="color:#10B981">1SM</span> <span style="color:#F59E0B">+TSRA OVC015CB</span><br>
            <span style="color:#8B5CF6">FM070200</span> <span style="color:#F43F5E">29020G35KT</span> <span style="color:#10B981">P6SM</span> <span style="color:#F59E0B">SCT040</span><br>
            <span style="color:#8B5CF6">FM070800</span> <span style="color:#F43F5E">31012KT</span> <span style="color:#10B981">P6SM</span> <span style="color:#F59E0B">FEW030</span>
          </div>
          <div style="display:grid;gap:8px;margin:16px 0">
            ${[
              ['🕐 Valid Period','0618/0718 = Day 06 at 1800Z through Day 07 at 1800Z (24-hour TAF)'],
              ['🟣 Initial Conditions','Day 06 1800Z: Wind 230/10, >6 SM, Sky Clear. VFR departure window.'],
              ['🔵 FM061900','At 1900Z: Wind 240/15G25, 5 SM, light TSRA (thunderstorm/rain), scattered CB at 3,000 ft, broken at 6,000 ft. IFR conditions with convective activity.'],
              ['🩷 TEMPO 0621/0702','Between 2100Z and 0200Z, temporary periods of 1 SM + heavy TSRA + OVC015CB (1,500 ft ceiling with CB). LIFR possible in storm cores.'],
              ['🔵 FM070200','After 0200Z: Wind 290/20G35 (post-frontal gusty NW), >6 SM, few clouds at 4,000. VFR improving.'],
              ['🔵 FM070800','After 0800Z: Wind 310/12, >6 SM, FEW030. Classic post-frontal VFR conditions.'],
            ].map(([title,desc])=>`
            <div style="background:white;border-radius:12px;padding:12px 14px">
              <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:var(--navy);margin-bottom:4px">${title}</div>
              <div style="font-size:13px;color:#475569">${desc}</div>
            </div>`).join('')}
          </div>
          <div class="danger-callout">⚠️ <strong>Alternate planning:</strong> The TEMPO period (0621–0702) shows OVC015CB — ceiling 1,500 ft. From 1 hour before to 1 hour after any arrival in this window, ceilings are below 2,000 ft. An alternate is legally required if arriving during or near this window.</div>
        `
      }
    ,
      {
        id:'s12_4',title:'Probability Groups & AMD',
        content:`
          <p>A TAF is only as good as the forecaster’s confidence. Probability groups and amendment codes tell you how much to trust each part of the forecast.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[['TEMPO','<em>Temporary</em> — conditions lasting less than 1 hour at a time, total less than half the period. TEMPO TS means thunderstorms WILL occur, just briefly.','#FEF2F2','#EF4444'],['BECMG','<em>Becoming</em> — permanent change expected within the 2-hour window. Conditions after the window should match the forecast group.','#D1FAE5','#059669'],['PROB30','30% probability of listed conditions. Forecaster considers it unlikely but notable. Not issued for TS within 8 hours.','#FEF3C7','#D97706'],['PROB40','40% probability — more likely than PROB30 but below even odds. Often used for thunderstorms beyond 8 hours.','#E0F2FE','#0284C7'],['AMD / COR','TAF has been amended (AMD) or corrected (COR). Always check the issuance time — an AMD may significantly change your planning.','#F5F3FF','#7C3AED']].map(([code,desc,bg,col])=>`<div style="background:${bg};border-radius:14px;padding:14px;border-left:4px solid ${col}"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><code style="background:${col};color:white;padding:3px 10px;border-radius:8px;font-family:var(--font-mono);font-size:13px;font-weight:700">${code}</code></div><p style="font-size:13px;color:#475569;margin:0">${desc}</p></div>`).join('')}
          </div>
          <div class="danger-callout">⚠️ <strong>PROB30 vs TEMPO:</strong> PROB30 means it’s unlikely (30%) — a TEMPO thunderstorm means it WILL happen briefly. Never fly into a TEMPO TS period treating it as optional. Treat any TS in a TAF as a real threat during your ETA window.</div>
        `
      }],
    quiz:[
      {id:'q_m12_1',type:'mc',question:'A TAF change group "FM061500" means:',options:['Forecast modification at 1500 local','From day 6, starting at 1500Z, ALL conditions change to those listed','Frequency modification — minor tweak to the previous group','Fifty percent chance of conditions changing at 1500Z'],correct:1,xp:10,explanation:'FM = FROM. At the stated time (day 6 at 1500 UTC), ALL conditions replace the previous forecast group — it is an abrupt, complete change. The new wind, visibility, weather, and sky apply from that time until the next FM or end of TAF.',faaRef:'Ch. 27',concept:'taf_decode'},
      {id:'q_m12_2',type:'mc',question:'TEMPO in a TAF means conditions will:',options:['Last the entire valid period','Be permanent — replacing the base forecast','Fluctuate temporarily, each occurrence <1 hr, total <half the period','Be probable (40% or greater chance)'],correct:2,xp:10,explanation:'TEMPO = temporary fluctuations. Each occurrence is expected to last less than 1 hour, and the total of all TEMPO occurrences is less than half the period. Critically, TEMPO does NOT replace the base forecast — the base conditions continue between TEMPO events.',faaRef:'Ch. 27',concept:'taf_decode'},
      {id:'q_m12_3',type:'timed',timeLimit:12,question:'The TAF valid period "1512/1612" covers:',options:['15th at 1200Z to 16th at 1200Z (24 hours)','15th at noon local to 16th at noon local','15 minutes to 16 hours after issuance','12th of the month from 1500 to 1600Z'],correct:0,xp:15,explanation:'TAF valid period format: DDHH/DDHH. 1512 = day 15, hour 12 (1200 UTC). 1612 = day 16, hour 12 (1200 UTC). This is a standard 24-hour TAF running from noon UTC on the 15th to noon UTC on the 16th.',faaRef:'Ch. 27',concept:'taf_decode'},
      {id:'q_m12_4',type:'scenario',scenario:'You are planning an IFR flight arriving at KDFW at 2300 UTC. The TAF reads: "FM2100 24015KT 3SM -RA BKN020 OVC060 TEMPO 2200/0100 1SM +TSRA OVC008CB FM0200 30020G30KT P6SM SCT040"',question:'Do you need to file an alternate? What is your primary concern?',options:['No — the base forecast at arrival shows 3 SM and BKN020, which meets alternate requirements','Yes — within 1 hour of your arrival, the TAF shows TEMPO periods with OVC008CB (800 ft ceiling). Both ceiling and visibility are below 2,000 ft/3 SM, requiring an alternate.','No — TEMPO periods do not count for alternate requirement calculations','Yes — any TAF with CB automatically requires an alternate'],correct:1,xp:25,explanation:'The 1-2-3 rule: from 1 hour before (2200Z) to 1 hour after (0000Z) your ETA, check conditions. TEMPO 2200/0100 shows OVC008CB (800 ft ceiling) — below 2,000 ft. AND 1SM visibility in +TSRA — below 3 SM. Both criteria for alternate are triggered. An alternate is required. Also note the CB — a serious safety concern for this arrival window.',faaRef:'Ch. 27'},
      {id:'q_m12_5',type:'mc',question:'PROB30 in a TAF indicates:',options:['30% chance of conditions in the next group — used when significant uncertainty exists','Conditions are probable (>50%) for 30 minutes','30 knot winds are probable','30% of the forecast period has those conditions'],correct:0,xp:10,explanation:'PROB30 = 30% probability of the conditions in the following group. PROB40 = 40%. These are used when there is meaningful uncertainty about whether a significant change will occur. PROB30 suggests the change is less likely than not, but significant enough to flag. Neither PROB30 nor PROB40 can be used with TEMPO.',faaRef:'Ch. 27',concept:'taf_decode'},
      {id:'q_m12_6',type:'mc',question:'A TAF marked "TAF AMD" means:',options:['An automated TAF with no human oversight','An amended forecast — it supersedes and cancels the previous TAF immediately upon issuance','A 30-hour extended TAF for a major airport','A TAF for a military aerodrome only'],correct:1,xp:10,explanation:'TAF AMD = Amended Terminal Aerodrome Forecast. It supersedes and cancels the previous TAF IMMEDIATELY — do not wait for the valid period start. Amendments are issued when forecasters determine conditions differ significantly from the original forecast. Always use the most recently issued TAF, checking its issue time.',faaRef:'Ch. 27',concept:'taf_decode'},
      {id:'q_m12_7',type:'timed',timeLimit:12,question:'BECMG in a TAF differs from FM in that:',options:['BECMG is always associated with frontal passage; FM is not','BECMG indicates a gradual change over the period; FM is an abrupt complete replacement','BECMG applies only to wind; FM applies to all conditions','BECMG is 50% probability; FM is certain to occur'],correct:1,xp:15,explanation:'FM (From) = abrupt, complete replacement of ALL conditions at the stated time. BECMG (Becoming) = gradual change expected to be complete by the end of the stated period — conditions transition gradually. In practice: if the ceiling is lowering gradually, BECMG is used; if an abrupt frontal passage will rapidly change all conditions, FM is appropriate.',faaRef:'Ch. 27',concept:'taf_decode'}
    ,
      {id:'q_m12_8',type:'timed',timeLimit:12,question:'A TAF reads "PROB30 2115/2118 2SM TSRA OVC010". Your planned arrival is 2200Z. What is the correct interpretation?',options:['Thunderstorms are certain in that period — divert to alternate','30% chance of 2SM, TS, rain, OVC010 from 2115-2118Z. Your 2200Z arrival is after this window but the TS could affect approach timing.','PROB30 is too low to consider for planning purposes','PROB30 groups only apply to departures, not arrivals'],correct:1,xp:15,explanation:'PROB30 indicates a 30% probability — the forecaster thinks it unlikely but worth noting. Your 2200Z arrival is after the PROB30 window (2115-2118Z), but a slow-moving thunderstorm could persist past 2118Z. Always have a legal alternate for IFR when PROB TS groups are in the TAF near your ETA. Never dismiss PROB30 TS groups entirely.',faaRef:'Ch. 27'}
    ,
      {id:'q_m12_9',type:'mc',question:'A TAF shows "FM2000 21015KT P6SM SKC." What does FM mean and how does it differ from BECMG?',options:['FM (Forming) is the same as BECMG — just a different code for the same forecast type','FM (From) indicates a rapid, permanent change at precisely that time. Unlike BECMG, the change is expected within minutes, not over a 2-hour transition period.','FM means future maximum winds will reach 15 kt at 2000Z','FM applies only when conditions are improving, BECMG only when deteriorating'],correct:1,xp:10,explanation:'FM (From) indicates that from that exact time, all previous forecast conditions are replaced by the new group. The change is expected to be rapid (within minutes). BECMG indicates a gradual change occurring within a 2-hour window. FM 2000 21015KT P6SM SKC means: from 2000Z, expect wind 210° at 15 kt, visibility greater than 6 SM, sky clear. All forecast groups before the FM line no longer apply after 2000Z.',faaRef:'Ch. 27',concept:'taf_decode'},
      {id:'q_m12_10',type:'timed',timeLimit:15,question:'TAF: "BECMG 1416/1418 VFR" — your ETA is 1417Z. Is the TAF saying conditions WILL be VFR when you arrive?',options:['Yes — BECMG means conditions will definitely be VFR by 1417Z','No — BECMG means conditions are becoming VFR sometime between 1416 and 1418Z. At 1417Z, conditions might still be IFR.','BECMG is a guarantee that conditions will improve by the start time (1416Z)','BECMG only applies to wind changes, not flight category'],correct:1,xp:15,explanation:'BECMG describes a gradual change that begins at the start time and completes by the end time. At 1417Z (in the middle of the window), the transition may or may not be complete. You cannot count on VFR conditions at exactly 1417Z — you might arrive during the transition with IFR conditions still present. Always plan to arrive after the BECMG window closes (1418Z) and verify with a fresh METAR before departing.',faaRef:'Ch. 27'},
      {id:'q_m12_11',type:'scenario',scenario:'TAF KJQF 281720Z 2818/2918: 27012KT P6SM SKC... TEMPO 2902/2906 4SM -TSRA BKN030CB... FM2906 30008KT P6SM SCT040. Your ETA at KJQF is 0400Z.',question:'The TEMPO period is 0200-0600Z. What does this mean for your 0400Z arrival?',options:['The storm will be over by 0400Z since TEMPO periods are short by definition','At 0400Z you are IN the TEMPO window — thunderstorm, 4SM visibility, BKN030CB conditions are possible. Have a legal alternate.','TEMPO conditions never affect IFR operations, only VFR','TEMPO only applies to departures, not arrivals'],correct:1,xp:20,explanation:'TEMPO means the listed conditions are expected for less than 1 hour at a time, and for less than half of the period. At 0400Z you are well within the TEMPO window (0200-0600Z). Thunderstorm, 4SM visibility, and BKN030CB cumulonimbus are all possible at your ETA. For IFR operations: you need a legal alternate unless the 1-2-3 rule is met, which it isn’t here. For VFR: thunderstorms at your destination require a divert plan. The FM2906 shows conditions improve AFTER 0600Z — consider delaying arrival.',faaRef:'Ch. 27',concept:'taf_decode'},
      {id:'q_m12_12',type:'mc',question:'TAFs are issued by which facility and how often for most airports?',options:['ARTCC facilities issue TAFs every 3 hours based on radar data','NWS Weather Forecast Offices (WFOs) issue TAFs four times daily (00, 06, 12, 18 UTC) for airports meeting issuance criteria','Flight Service Stations issue TAFs on request only','TAFs are issued every hour at all certificated airports'],correct:1,xp:10,explanation:'TAFs are issued by NWS Weather Forecast Offices four times daily at 0000, 0600, 1200, and 1800 UTC. They cover a 24 to 30-hour period and are valid for a 5-SM radius around the airport. Amendments (TAF AMD) are issued as needed when conditions deviate significantly from the forecast. Not all airports have TAFs — they are issued for airports meeting specific criteria (typically scheduled airline service). For airports without TAFs, use the GFA tool or Area Forecast.',faaRef:'Ch. 27',concept:'taf_decode'}
    ]
  },

  // ============================================================
  // M13: PIREPs
  // ============================================================
  {
    id:'m13',act:3,title:'PIREPs — Pilot Reports',subtitle:'Read, interpret and file pilot weather reports',
    icon:'📻',color:'#059669',bgColor:'#ECFDF5',prerequisites:['m11'],
    xpReward:175,estimatedMin:14,faaRef:'FAA-H-8083-28A Chapter 24',
    sections:[
      {
        id:'s13_1',title:'PIREP Fundamentals',
        content:`
          <p>A <strong>PIREP</strong> (Pilot Report) is a weather observation made by a pilot in flight and relayed to ATC or Flight Service. PIREPs are the <em>most real-time source of in-flight weather information</em> available — METARs and TAFs are at airports, but PIREPs report what's actually happening en route.</p>
          <div class="fact-box">
            <span style="font-size:28px">🎯</span>
            <div><strong>When PIREPs matter most:</strong> Icing conditions; turbulence intensity and altitude; cloud bases and tops en route; mountain wave activity; volcanic ash; low-level wind shear on approach. PIREP information updates forecasts and triggers AIRMETs/SIGMETs.</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">
            <div style="background:var(--rose-light);border-radius:14px;padding:14px;border-left:4px solid var(--rose)">
              <strong style="font-family:var(--font-display);color:#9F1239">UUA — URGENT PIREP</strong>
              <p style="font-size:12px;color:#7F1D1D;margin:6px 0 0">Severe or extreme turbulence · Severe icing · Tornado/funnel cloud/waterspout · Hail · Low-level wind shear ≥15 kt change · Volcanic ash. Issued IMMEDIATELY and broadcast to all affected traffic.</p>
            </div>
            <div style="background:#E0F2FE;border-radius:14px;padding:14px;border-left:4px solid #0284C7">
              <strong style="font-family:var(--font-display);color:#075985">UA — ROUTINE PIREP</strong>
              <p style="font-size:12px;color:#0C4A6E;margin:6px 0 0">All other pilot weather observations. Light/moderate turbulence · Light/moderate icing · Cloud bases/tops · Mountain wave conditions. Collected and distributed through normal channels.</p>
            </div>
          </div>
          <div class="callout"><strong>Training note:</strong> Filing a PIREP is a strong safety practice. Your report may be the only real-time weather information available between reporting stations, especially for icing, turbulence, or rapidly changing conditions.</div>
        `
      },
      {
        id:'s13_2',title:'PIREP Format',
        content:`
          <p>PIREPs use a standardized format. Each element is preceded by a <strong>slash-letter identifier</strong>. Understanding this format lets you quickly extract the relevant data:</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">PIREP ELEMENT REFERENCE</div>
            ${[
              ['/OV','Location','Navaid, airport, or lat/lon. E.g., /OV OKC or /OV OKC230025 (230° at 25 NM from OKC)'],
              ['/TM','Time','4-digit UTC. Time the phenomenon was observed.'],
              ['/FL','Altitude','Altitude in hundreds of feet MSL. /FL085 = 8,500 ft. /FLUNKN = unknown.'],
              ['/TP','Aircraft Type','ICAO type designator. /TP B738 /TP C182. Required for icing/turbulence PIREPs.'],
              ['/SK','Sky Condition','Cloud bases and tops. /SK BKN040-TOP080/OVC200.'],
              ['/WX','Weather','/WX FV05SM -RA = flight visibility 5 SM, light rain.'],
              ['/TA','Temperature','/TA M12 = -12°C OAT at altitude.'],
              ['/WV','Wind','/WV 270045KT = wind 270° at 45 kt.'],
              ['/TB','Turbulence','/TB MOD-SEV CHOP 065-080 = moderate to severe chop 6,500–8,000 ft.'],
              ['/IC','Icing','/IC LGT RIME 080 = light rime icing at 8,000 ft.'],
              ['/RM','Remarks','Free text. LLWS reports, additional weather details.'],
            ].map(([code,name,desc])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:8px 0;font-size:11px">
              <div style="display:flex;align-items:baseline;gap:8px">
                <span style="color:#10B981;font-weight:700;min-width:30px">${code}</span>
                <span style="color:#38BDF8;min-width:80px">${name}</span>
                <span style="color:#94A3B8">${desc}</span>
              </div>
            </div>`).join('')}
          </div>
        `,
        diagram:{type:'pirep_decoder'}
      },
      {
        id:'s13_3',title:'Reading PIREPs in Flight Planning',
        content:`
          <p>Here's a real PIREP chain you might see on a preflight weather brief. Practice parsing each one:</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              {raw:'UUA /OV OKC315020/TM 1423/FL060/TP C182/IC SEV CLR 040-080/RM UNCONTROLLED ICE ACCUMULATION',color:'#DC2626',bg:'#FEF2F2',label:'⚠️ URGENT',decode:'Urgent PIREP. 315° at 20 NM from OKC. 1423Z. 6,000 ft MSL. Cessna 182 (single-engine piston). SEVERE clear icing from 4,000 to 8,000 ft. Uncontrolled ice accumulation — pilot likely declared emergency.'},
              {raw:'UA /OV OKC-TUL/TM 1250/FL090/TP B738/SK OVC070-TOP100/TB LGT CHOP/TA M12',color:'#059669',bg:'#ECFDF5',label:'📋 ROUTINE',decode:'Routine PIREP. En route OKC to TUL. 1250Z. FL090. Boeing 737-800. Overcast at 7,000 ft, tops 10,000 ft. Light chop. OAT -12°C.'},
              {raw:'UA /OV ABQ/TM 1810/FL140/TP BE20/TB SEV/RM MOUNTAIN WAVE SEVERE LLWS ON APPROACH RY35',color:'#7C3AED',bg:'#F5F3FF',label:'⚠️ URGENT (implied)',decode:'Near ABQ. 1810Z. 14,000 ft. King Air 200. SEVERE turbulence. Mountain wave with severe low-level wind shear on approach to Runway 35. This would be elevated to UUA status for the LLWS report.'},
            ].map(p=>`
            <div style="background:${p.bg};border-radius:16px;padding:14px;border-left:4px solid ${p.color}">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
                <span style="font-family:var(--font-display);font-weight:800;font-size:13px;color:${p.color}">${p.label}</span>
              </div>
              <code style="font-family:var(--font-mono);font-size:11px;color:${p.color};display:block;margin-bottom:8px;word-break:break-all">${p.raw}</code>
              <p style="font-size:13px;color:#475569;margin:0"><strong style="color:var(--navy)">Decoded:</strong> ${p.decode}</p>
            </div>`).join('')}
          </div>
          <div class="callout">📡 <strong>PIREP age matters.</strong> Always note the time (/TM). A PIREP from 2+ hours ago may not reflect current conditions — weather changes rapidly. Fresh PIREPs (within 30–60 min) are far more reliable than old ones. Note aircraft type too — a heavy jet at FL350 experiences turbulence very differently than a single-engine piston at 6,000 ft.</div>
        `
      }
    ,
      {
        id:'s13_4',title:'Filing PIREPs - Practical Reporting Guidance',
        content:`
          <p>PIREPs are not just something you read - they are also something you may choose to file when workload and communication conditions permit. Reporting significant or unexpected weather is valuable because your PIREP may be the only real-time information available for pilots behind you.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">PIREP FORMAT REFERENCE</div>
            <div style="font-family:var(--font-mono);font-size:11px;color:#38BDF8;margin-bottom:12px">UA /OV KJQF /TM 1530 /FL065 /TP C182 /SK OVC030 /TA 12 /TB LGT /IC LGT RIME</div>
            ${[['/OV','Location (airport or fix)','KJQF, CLT090025'],['/TM','Time UTC','1530'],['/FL','Altitude MSL','065 = 6,500 ft'],['/TP','Aircraft type','C182, BE36, B738'],['/SK','Sky coverage/tops','OVC030-TOP060'],['/WX','Weather/vis','FV03SM TSRA'],['/TA','Air temp °C','M05 = -5°C'],['/TB','Turbulence','NEG LGT MOD SEV'],['/IC','Icing','LGT RIME, MOD CLR'],['/RM','Remarks','Free text — very useful']].map(([code,desc,ex])=>`<div style="border-bottom:1px solid rgba(255,255,255,.08);padding:7px 0;display:grid;grid-template-columns:.5fr 1.5fr 1fr;gap:8px;font-size:11px"><span style="color:#F59E0B;font-family:var(--font-mono);font-weight:700">${code}</span><span style="color:#CBD5E1">${desc}</span><span style="color:#64748B">${ex}</span></div>`).join('')}
          </div>
          <p>File PIREPs by calling ATC (Center, Approach, Tower) or Flight Service on 122.2. When workload permits, reports are especially valuable for hazards such as severe turbulence, severe icing, LLWS, tornadoes, hail, or volcanic ash.</p>
          <div class="callout"><strong>You are an in-flight sensor:</strong> METARs are tied to reporting sites and radar does not show every hazard. When practical and workload permits, a timely PIREP can improve system awareness for aircraft behind you.</div>
        `
      }],
    quiz:[
      {id:'q_m13_1',type:'mc',question:'An "UUA" PIREP (Urgent PIREP) is issued for:',options:['Any turbulence encounter at flight level','Severe/extreme turbulence, severe icing, tornadoes, hail, or LLWS ≥15 kt change','Moderate icing only above FL180','Any deviation from filed route due to weather'],correct:1,xp:10,explanation:'UUA = Urgent PIREP. Triggers: severe or extreme turbulence; severe icing; tornadoes/waterspouts/funnel clouds; hail; low-level wind shear with ≥15 kt airspeed change; volcanic ash. Urgent PIREPs are transmitted immediately and broadcast to all affected aircraft in the area.',faaRef:'Ch. 24',concept:'pirep_format'},
      {id:'q_m13_2',type:'mc',question:'In a PIREP, "/IC LGT RIME 085" means:',options:['Light rim ice forming at 8,500 ft ASL','Light rime icing at 8,500 ft MSL','Icing cleared — light conditions at 8,500 ft','Low icing conditions — trace rime at Flight Level 085'],correct:1,xp:10,explanation:'/IC = icing element. LGT = light intensity. RIME = rime ice type. 085 = 8,500 ft MSL (altitude in hundreds of feet). This PIREP says there is light rime icing at 8,500 ft. For IFR planning: check if your route crosses 8,500 ft in the area of this report.',faaRef:'Ch. 24',concept:'pirep_format'},
      {id:'q_m13_3',type:'timed',timeLimit:10,question:'A PIREP reads "/TB SEV CHOP 065-085". What does this mean?',options:['Slight turbulence between 6,500 and 8,500 ft','Severe turbulence (chop type) between 6,500 and 8,500 ft MSL','Seven seconds of severe chop beginning at 6,500 ft','Severe turbulence only below 6,500 ft and above 8,500 ft'],correct:1,xp:15,explanation:'/TB = turbulence. SEV = severe intensity. CHOP = chop type (rapid jolts without major altitude changes). 065-085 = altitude range 6,500 to 8,500 ft MSL. SEVERE turbulence can cause structural damage and means the aircraft may be momentarily out of control. PIREPs of SEV turbulence trigger Turbulence SIGMETs.',faaRef:'Ch. 24',concept:'pirep_format'},
      {id:'q_m13_4',type:'mc',question:'Why is aircraft type important in a turbulence or icing PIREP?',options:['Aircraft type is not required — intensity alone is sufficient','Different aircraft respond differently to the same meteorological intensity — a 737 feels less turbulence than a C172','The FAA uses aircraft type to track equipment reliability','Only turboprop and jet PIREPs are used operationally'],correct:1,xp:10,explanation:'Aircraft type is required in turbulence and icing PIREPs because the same meteorological turbulence affects aircraft very differently. A heavy transport jet may report "light chop" in conditions that would give a light aircraft "severe" turbulence. A C172 PIREP of "moderate" icing is more critical than a similar report from a large turboprop with powerful deicing. Context is everything.',faaRef:'Ch. 24',concept:'pirep_format'},
      {id:'q_m13_5',type:'scenario',scenario:'During your preflight weather check, you find this PIREP on your route: "UA /OV DEN270040/TM 0215/FL120/TP C182/IC MOD CLR 100-130/TA M08". Your planned routing at 12,000 ft crosses 40 NM west of Denver. Your departure is at 0600Z.',options:['Ignore it — 4-hour-old PIREPs are not relevant to flight planning','Treat it seriously: Moderate clear icing at 12,000 ft on your route. Check for newer PIREPs, AIRMETs, and consider altitude adjustment or route change. The 4-hour age means conditions may have changed.','"MOD CLR" means moderate clear skies — no icing concern','Refile at FL200 immediately — any icing report requires climbing above it'],correct:1,xp:25,question:'How should you use this PIREP in your planning?',explanation:'Moderate clear icing at FL120 (10,000–13,000 ft) by a C172 at 0215Z, your route at 0600Z. Four hours is old — conditions may have changed — but this is exactly the route and altitude you plan. Actions: (1) Check for newer PIREPs, AIRMETs, and CIPs along route. (2) If AIRMET for icing is active, take it seriously. (3) Consider filing at a different altitude to avoid the icing layer. (4) Verify your aircraft has deicing equipment for the altitude range if icing likely persists.',faaRef:'Ch. 24'},
      {id:'q_m13_6',type:'mc',question:'The /OV field in a PIREP reports:',options:['The aircraft\'s current GPS position when filing','The location WHERE the phenomenon was observed — not the aircraft\'s filing position','The overcast base altitude in hundreds of feet','The origin airport of the reporting flight'],correct:1,xp:10,explanation:'/OV = location of the PHENOMENON, not the aircraft\'s position when filing. Pilots often report weather encountered earlier in flight. The location can be referenced to a NAVAID (e.g., /OV OKC230025 = 230° at 25 NM from OKC) or airport identifier. Accurate location is critical — it tells other pilots exactly where to expect those conditions.',faaRef:'Ch. 24',concept:'pirep_format'},
      {id:'q_m13_7',type:'timed',timeLimit:10,question:'Which element is REQUIRED in icing and turbulence PIREPs but optional in others?',options:['Temperature (/TA)','Wind direction and speed (/WV)','Aircraft type (/TP)','Remarks (/RM)'],correct:2,xp:15,explanation:'Aircraft type (/TP) is REQUIRED in icing and turbulence PIREPs. The same meteorological intensity affects different aircraft very differently — a C172 reporting moderate icing is far more critical than a Boeing 757 with pneumatic deicing boots reporting the same. Without aircraft type, the report cannot be properly evaluated.',faaRef:'Ch. 24',concept:'pirep_format'}
    ,
      {id:'q_m13_8',type:'scenario',scenario:'Departing your airport at 6,500 ft you encounter moderate turbulence and light rime icing in OVC. No PIREPs exist for this area.',question:'What is the most appropriate action?',options:['Land immediately — turbulence and icing require immediate return','Continue and log conditions in your personal logbook after landing','Report promptly to Approach Control when workload permits: location, altitude, aircraft type, ceiling, turbulence (MOD), icing (LGT RIME), cloud tops','Wait until landing and file on 1800wxbrief.com'],correct:2,xp:20,explanation:'A timely PIREP can help other aircraft and ATC build a more current weather picture. If workload permits, a short report to ATC such as "Approach, [callsign], PIREP, over [position] at 6,500, [type], OVC tops 8,000, MOD turbulence, LGT rime icing" is useful. Filing only after landing delays information that may matter to aircraft behind you.',faaRef:'Ch. 24'},
      {id:'q_m13_9',type:'mc',question:'An "Urgent PIREP" (UUA) differs from a routine PIREP (UA) in that:',options:['UUAs are filed at a different frequency and cannot be relayed by ATC','UUAs report severe or extreme turbulence, severe icing, tornadoes, waterspouts, hail, low-level wind shear, or volcanic ash and are distributed immediately by ATC and NWS without delay','UUAs are only required from airline crews, not GA pilots','UUAs require a specific ATC clearance to file'],correct:1,xp:10,explanation:'Urgent PIREPs (UUA) contain reports of especially hazardous conditions such as severe or extreme turbulence, severe icing, tornadoes, waterspouts, hail, LLWS, and volcanic ash or dust. When filed with ATC, they receive rapid distribution through the system. Pilots who encounter those conditions should report them as soon as practical when workload permits.',faaRef:'Ch. 24',concept:'pirep_format'},
      {id:'q_m13_10',type:'mc',question:'A PIREP reads: "UA /OV CLT090020 /TM 1345 /FL080 /TP C182 /SK BKN065 /WX FV04SM HZ /TA 18 /TB LGT." What is the location of this report?',options:['20 miles northeast of CLT at 8,000 ft','20 miles east (090°) from CLT VOR at 8,000 ft MSL','CLT airport at 8,000 ft AGL, 20 nm visibility','20 miles at 090° from the CLT 345° radial'],correct:1,xp:10,explanation:'/OV CLT090020 = located on the 090° radial (east) from CLT VOR, 20 nautical miles. /FL080 = 8,000 ft MSL. So the reporting aircraft (a C182) was 20 miles east of Charlotte at 8,000 ft. /SK BKN065 = broken clouds at 6,500 ft. /WX FV04SM HZ = 4 SM visibility in haze. /TA 18 = temperature 18°C. /TB LGT = light turbulence. This PIREP would be directly relevant to any flight in the Charlotte area at similar altitudes.',faaRef:'Ch. 24',concept:'pirep_format'},
      {id:'q_m13_11',type:'scenario',scenario:'You are at 6,500 ft northbound and encounter unexpected moderate turbulence. The previous PIREP for your route (30 min old, same altitude, same aircraft type) reported light turbulence.',question:'What is the most appropriate action?',options:['Continue — PIREPs are 30 minutes old and conditions change. Your experience is anecdotal.','Slow to maneuvering speed (Va), contact ATC, file a new PIREP immediately, and request a deviation or altitude change if the turbulence is sustained'],correct:1,xp:15,explanation:'Maneuvering speed (Va) is the maximum speed at which full or abrupt control inputs won’t cause structural damage — always slow to Va in turbulence. Immediately filing a new PIREP updates the system with current conditions, protecting other pilots. The 30-minute-old PIREP may reflect conditions at a different time — turbulence intensity can change rapidly. Report the discrepancy to ATC so they can broadcast it. This is exactly the situation where your PIREP has maximum value.',faaRef:'Ch. 24'},
      {id:'q_m13_12',type:'mc',question:'Which element is REQUIRED in all PIREPs?',options:['Aircraft type, location, time, and altitude — these four are the mandatory minimum','Only location and time are required — other elements are optional','Turbulence and icing intensity — all other elements are optional','All nine PIREP elements must always be reported'],correct:0,xp:10,explanation:'The four mandatory PIREP elements are: /OV (location), /TM (time), /FL (altitude), and /TP (aircraft type). All other elements (/SK, /WX, /TA, /WV, /TB, /IC, /RM) are reported only when relevant and observed. In practice, always include /SK (sky coverage and tops) and the specific hazard you’re reporting. For turbulence PIREPs, /TB is obviously required. For icing, /IC with severity and type. If you don’t know an element, omit it rather than guessing.',faaRef:'Ch. 24',concept:'pirep_format'}
    ]
  },

  // ============================================================
  // M14: RADAR
  // ============================================================
  {
    id:'m14',act:3,title:'Weather Radar',subtitle:'Reading NEXRAD, dBZ & radar products',
    icon:'📡',color:'#DC2626',bgColor:'#FEF2F2',prerequisites:['m6'],
    xpReward:175,estimatedMin:14,faaRef:'FAA-H-8083-28A Chapters 15, 24',
    sections:[
      {
        id:'s14_1',title:'How Weather Radar Works',
        content:`
          <p>Weather radar (NEXRAD/WSR-88D) detects <strong>precipitation</strong> by transmitting a microwave pulse and measuring the energy reflected back. The return signal strength, measured in <span class="data-tag">dBZ (decibels of Z)</span>, correlates with precipitation intensity.</p>
          <div class="danger-callout">⚠️ <strong>Critical limitation: Radar detects PRECIPITATION, not turbulence.</strong> Clear air between radar returns can contain severe turbulence. Smooth corridors between echoes are NOT proven safe routes — they are the updraft/downdraft interface where the worst turbulence lives.</div>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono)">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">dBZ INTENSITY SCALE (US ATC Correlation)</div>
            ${[['<30 dBZ','Light precipitation — barely worth noting','#86EFAC'],['30–40 dBZ','Moderate — affecting aircraft performance','#FDE68A'],['40–50 dBZ','Heavy — serious operational impact','#F97316'],['>50 dBZ','Extreme — structural threat; AVOID','#EF4444']].map(([range,desc,col])=>`
            <div style="display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.08);padding:8px 0">
              <div style="width:14px;height:14px;border-radius:3px;background:${col};flex-shrink:0"></div>
              <span style="color:${col};font-size:11px;min-width:90px">${range}</span>
              <span style="color:#94A3B8;font-size:11px">${desc}</span>
            </div>`).join('')}
          </div>
          <p>Color scales vary between providers — always check the legend. The NEXRAD color scale used by the NWS may differ from what your EFB or cockpit display shows.</p>
        `,
        diagram:{type:'radar_guide'}
      },
      {
        id:'s14_2',title:'Radar Products',
        content:`
          <p>Different radar products show different aspects of a storm. Knowing which product to use is as important as reading the colors correctly.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['Base Reflectivity','Lowest elevation scan (0.5° above horizon). Shows surface precipitation. Quick to update. May miss precipitation aloft. Use for general situational awareness and surface conditions.','#E0F2FE','#0284C7'],
              ['Composite Reflectivity','Maximum reflectivity from ALL elevation scans in each vertical column. Shows the strongest returns at ANY altitude. Better for identifying severe storm cores. Used by NEXRAD avionics displays.','#FEF3C7','#D97706'],
              ['Echo Tops','Displays the altitude of the 18 dBZ radar echo top (in thousands of feet MSL). Cloud tops are higher than echo tops. Use to estimate required altitude to clear convective cells (add 1,000–4,000 ft buffer above echo tops for thunderstorms).','#ECFDF5','#059669'],
              ['Velocity (Doppler)','Displays wind speed toward/away from the radar. Reveals rotation (mesocyclone signatures), storm-relative winds, and potential tornadoes. Green = toward radar, red = away. Pair with reflectivity for complete storm picture.','#F5F3FF','#7C3AED'],
            ].map(([title,desc,bg,col])=>`
            <div style="background:${bg};border-radius:16px;padding:14px;border-left:4px solid ${col}">
              <strong style="font-family:var(--font-display);font-size:14px;color:${col}">${title}</strong>
              <p style="font-size:13px;color:#475569;margin:6px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="callout">⏱️ <strong>Radar age matters critically.</strong> Datalinked radar in the cockpit (ADS-B FIS-B, XM/SiriusXM) is delayed by 5–20+ minutes — the storm has moved since the image was captured. Never use datalinked radar for tactical storm penetration decisions. "Where the precipitation WAS, not where it IS."</div>
        `
      },
      {
        id:'s14_3',title:'Radar Limitations',
        content:`
          <p>Misunderstanding radar limitations kills pilots. Know these before you rely on any radar product:</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['Beam Overshoot','At long distances from the radar, the beam angle may clear over the top of precipitation — showing nothing when a storm exists below. Cells more than 100-150 NM from a radar site may be underrepresented.','var(--rose)'],
              ['Beam Blockage','Mountains and terrain features can block the radar beam, creating "shadows" with no data behind terrain. AK and mountainous Western US are particularly affected.','#F97316'],
              ['Cone of Silence','Directly above the radar site (within ~20 NM, high altitude), the beam cannot sample — a blind spot exists overhead.','#7C3AED'],
              ['Ground Clutter','Nearby objects (buildings, terrain) produce false returns near the radar site. Normally filtered, but can break through.','#059669'],
              ['Virga','Rain or snow that evaporates before reaching the ground produces radar returns at altitude but no surface precipitation. Can fool pilots into thinking a storm is weaker than it is.','#0284C7'],
              ['Datalink Delay','FIS-B ADS-B radar: up to 5 min delay. SiriusXM: varies. No cockpit datalink radar is current enough for tactical storm penetration. Use for strategic routing only.','#DC2626'],
            ].map(([title,desc,col])=>`
            <div style="background:white;border-radius:14px;padding:14px;border-left:4px solid ${col};box-shadow:0 2px 8px rgba(0,0,0,.05)">
              <strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${title}</strong>
              <p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
        `
      }
    ,
      {
        id:'s14_4',title:'Satellite Imagery — Visible, IR & Water Vapor',
        content:`
          <p>While radar shows <em>precipitation</em>, satellite imagery shows <em>clouds</em> — including non-precipitating clouds and fog that radar completely misses.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[['Visible Imagery ☀️','Shows reflected sunlight — what you’d see from space. Best during daylight. Shows cloud texture, convective towers, fog and stratus. Useless at night.','#FEF3C7','#D97706'],['Infrared (IR) 🌡️','Measures cloud-top temperature. Cold tops = high clouds = tall clouds. Works 24/7. Enhanced IR color scale: deep red/black = coldest tops = highest CBs. Best for identifying convective hazards at night.','#FEF2F2','#EF4444'],['Water Vapor (WV) 💧','Shows moisture in the mid-to-upper troposphere (~500 mb). Bright = moist, dark = dry. Excellent for jet stream position and identifying areas of potential convective development. Does not show surface fog or low clouds well.','#E0F2FE','#0284C7']].map(([type,desc,bg,col])=>`<div style="background:${bg};border-radius:16px;padding:16px;border-left:4px solid ${col}"><strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${type}</strong><p style="font-size:13px;color:#475569;margin:8px 0 0">${desc}</p></div>`).join('')}
          </div>
          <p>GOES-East and GOES-West update every 5 minutes (1 minute during active weather). Access via aviationweather.gov or your EFB. Always use the <strong>animated loop</strong> — a single frame tells you little; 2 hours of animation shows movement, development, and speed.</p>
          <div class="callout">🌙 <strong>Night Ops:</strong> Visible is useless after sunset. Switch to enhanced IR. A patch of deep red/black on IR at night = towering CB. Avoid it regardless of what radar shows — the CB may not yet be producing precipitation.</div>
        `
      },
      {
        id:'s14_beam_geometry',title:'Why Radar Lies at Distance — Beam Geometry',
        content:`
          <p>Understanding why distant radar returns are unreliable requires understanding the physics of how the beam travels through the atmosphere. Two effects combine to make long-range radar systematically misleading: <strong>beam overshoot</strong> and <strong>Earth curvature</strong>.</p>
          <div style="background:#0C1B33;border-radius:16px;overflow:hidden;margin:16px 0">
            <div style="padding:10px 16px;border-bottom:1px solid rgba(255,255,255,.06)">
              <span style="font-family:var(--font-display);font-weight:800;font-size:13px;color:#F59E0B">📡 WSR-88D Beam Elevation — 0.5° Tilt + Earth Curvature Effect</span>
            </div>
            <svg viewBox="0 0 320 165" style="width:100%;display:block">
              <rect width="320" height="165" fill="#0C1B33"/>
              <line x1="0" y1="148" x2="320" y2="148" stroke="#334155" stroke-width="2"/>
              <text x="160" y="163" text-anchor="middle" font-family="Nunito" font-size="7" fill="#475569">Ground (Earth Surface)</text>
              <polygon points="24,148 20,148 22,130 26,130" fill="#38BDF8" opacity=".9"/>
              <circle cx="23" cy="127" r="4" fill="#38BDF8" opacity=".7"/>
              <text x="22" y="122" text-anchor="middle" font-family="Nunito" font-size="7" fill="#38BDF8" font-weight="800">NEXRAD</text>
              <path d="M24,145 C80,143 155,130 220,100 Q265,78 295,52" stroke="#F59E0B" stroke-width="2.5" fill="none"/>
              <path d="M24,143 C80,140 155,124 220,93 Q265,71 295,44" stroke="#F59E0B" stroke-width="0.8" fill="none" opacity=".35" stroke-dasharray="4,3"/>
              <path d="M24,147 C80,146 155,136 220,107 Q265,85 295,60" stroke="#F59E0B" stroke-width="0.8" fill="none" opacity=".35" stroke-dasharray="4,3"/>
              <rect x="213" y="115" width="16" height="33" rx="2" fill="rgba(239,68,68,.5)" stroke="#EF4444" stroke-width="1.5"/>
              <line x1="155" y1="130" x2="155" y2="148" stroke="#475569" stroke-width="0.8" stroke-dasharray="3,2"/>
              <text x="115" y="128" text-anchor="middle" font-family="Nunito" font-size="7" fill="#38BDF8" font-weight="800">5,000 ft AGL</text>
              <text x="115" y="121" text-anchor="middle" font-family="Nunito" font-size="6" fill="#64748B">beam @ 100 NM</text>
              <line x1="220" y1="100" x2="220" y2="148" stroke="#475569" stroke-width="0.8" stroke-dasharray="3,2"/>
              <text x="221" y="97" text-anchor="middle" font-family="Nunito" font-size="7" fill="#38BDF8" font-weight="800">12,000 ft AGL</text>
              <text x="221" y="112" text-anchor="middle" font-family="Nunito" font-size="7" fill="#EF4444" font-weight="800">8,000 ft tops</text>
              <text x="278" y="103" text-anchor="middle" font-family="Nunito" font-size="8" fill="#EF4444" font-weight="800">OVERSHOOT</text>
              <text x="278" y="114" text-anchor="middle" font-family="Nunito" font-size="6.5" fill="#94A3B8">no radar return</text>
              <text x="90" y="138" text-anchor="middle" font-family="Nunito" font-size="7" fill="#F59E0B">0.5° beam tilt</text>
              <text x="30" y="160" text-anchor="start" font-family="Nunito" font-size="6.5" fill="#475569">0 NM</text>
              <text x="155" y="160" text-anchor="middle" font-family="Nunito" font-size="6.5" fill="#475569">100 NM</text>
              <text x="220" y="160" text-anchor="middle" font-family="Nunito" font-size="6.5" fill="#475569">150 NM</text>
            </svg>
          </div>
          <p><strong>Beam overshoot by range:</strong> The WSR-88D transmits at elevation angles from <span class="data-tag">0.5° to 19.5°</span>. Due to Earth curvature and beam angle, the 0.5° tilt beam center is already at:</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">0.5° BEAM HEIGHT vs. RANGE FROM RADAR</div>
            ${[
              ['100 NM','~5,000 ft AGL','Misses storm tops below 5,000 ft entirely — including many GA-relevant cells'],
              ['150 NM','~12,000 ft AGL','Most convection below 12,000 ft is completely invisible'],
              ['200 NM','~19,000 ft AGL','Only the tallest convective cells register at all'],
            ].map(([range,height,impact])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;display:grid;grid-template-columns:.7fr .9fr 1.4fr;gap:8px">
              <span style="color:#38BDF8;font-size:12px;font-weight:700;font-family:var(--font-display)">${range}</span>
              <span style="color:#F59E0B;font-size:12px;font-weight:700">${height}</span>
              <span style="color:#94A3B8;font-size:12px">${impact}</span>
            </div>`).join('')}
          </div>
          <p><strong>Undershoot — Beam Blockage:</strong> Within ~10 NM of the radar site, terrain, buildings, and trees can block the low-angle beam. Precipitation inside these shadow zones is invisible. Areas directly behind mountains from the radar perspective have permanent blind zones — especially in the Appalachians and Rockies.</p>
          <p><strong>Datalink latency compounds the problem:</strong> NEXRAD data delivered to the cockpit via SiriusXM, Stratus, or FIS-B has <span class="data-tag">5–19 minutes of latency</span>. At 150 NM range, the beam already misses low-level storms. Add 10 minutes of lag and a cell moving at 40 kt has traveled 7 NM since the image was captured. The display shows neither where the storm is now, nor the full vertical extent of what is depicted.</p>
          <div class="callout">📏 <strong>40 / 80 / 150 NM Rule of Thumb:</strong>
            <div style="display:grid;gap:6px;margin-top:8px">
              ${[
                ['Within 40 NM','Datalink reasonably accurate for cell position — latency still matters but beam geometry is manageable'],
                ['40–80 NM','Use for strategic routing — position is approximate, low-topped cells may be invisible'],
                ['80–150 NM','Treat as showing upper-level weather only — significant low-topped storms may be completely absent from the display'],
                ['Beyond 150 NM','General situational awareness only — overshoot makes it unreliable for cell-level avoidance decisions'],
              ].map(([range,note])=>`
              <div style="display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap">
                <span class="data-tag">${range}</span>
                <span style="font-size:12px;color:#334155">${note}</span>
              </div>`).join('')}
            </div>
          </div>
          <div class="danger-callout">🚫 <strong>A clear sector on datalink at 120+ NM does not mean that sector is clear.</strong> Storms with tops below the beam altitude are completely invisible. Never use long-range datalink radar to thread gaps between cells — the gaps may not exist, and the cells flanking them extend far below what the radar shows. FAA Ref: Ch. 15, Ch. 27</div>
        `
      }],
    quiz:[
      {id:'q_m14_1',type:'mc',question:'Weather radar primarily detects:',options:['Turbulence intensity and location','Temperature gradients and icing potential','Precipitation (water droplets and hail) — NOT turbulence','Wind speed and direction at all altitudes'],correct:2,xp:10,explanation:'NEXRAD/WSR-88D radar detects the reflectivity of precipitation — water droplets and hail. It does NOT directly detect turbulence, icing, CAT, or wind shear. Clear corridors between radar echoes can contain the most severe turbulence (updraft/downdraft interface). Radar is a precipitation tool, not an all-hazard detector.',faaRef:'Ch. 15, 24',concept:'radar_products'},
      {id:'q_m14_2',type:'mc',question:'Composite Reflectivity differs from Base Reflectivity in that it:',options:['Updates faster — every 2 minutes','Shows only the lowest elevation scan (0.5°)','Shows the MAXIMUM reflectivity from ALL elevation scans in each vertical column','Is only available for storms above 30,000 ft'],correct:2,xp:10,explanation:'Composite Reflectivity = maximum echo from any elevation scan in the vertical column. This reveals intense cells that may have cores well aloft — missed by the lowest-tilt Base Reflectivity scan. Most onboard NEXRAD avionics displays use Composite Reflectivity. It is the better product for identifying severe storm intensity.',faaRef:'Ch. 24',concept:'radar_products'},
      {id:'q_m14_3',type:'timed',timeLimit:10,question:'A radar return showing 55 dBZ is characterized as:',options:['Light — trace precipitation','Moderate — routine operational impact','Heavy — serious concern','Extreme — structural threat; avoid at all costs'],correct:3,xp:15,explanation:'50+ dBZ = EXTREME intensity — correlates with very heavy precipitation, large hail, and almost certain severe to extreme turbulence. This is a no-fly zone. The FAA correlation table: <26=Light; 26-40=Moderate; 41-50=Heavy; >50=Extreme. Color scales vary by provider but always check the legend.',faaRef:'Ch. 24',concept:'radar_products'},
      {id:'q_m14_4',type:'mc',question:'Datalinked radar in the cockpit (FIS-B via ADS-B) is NOT suitable for:',options:['General route planning around large storm systems','Understanding the overall convective pattern','Tactical storm penetration decisions — the image may be 5-20+ minutes old','Identifying areas of precipitation during cruise'],correct:2,xp:10,explanation:'FAA and industry guidance: datalinked radar (FIS-B, XM, etc.) has delays of 5–20+ minutes. Storms move and grow rapidly — the radar shows where precipitation WAS, not where it IS. Tactical decisions (penetrating a gap, flying close to cells) require real-time onboard radar, not datalink. Use datalink for strategic routing only.',faaRef:'Ch. 24',concept:'radar_products'},
      {id:'q_m14_5',type:'scenario',scenario:'You are en route at FL200. Your EFB shows a large area of radar returns, but there appears to be a 15-NM gap between two cells. The returns show 35-45 dBZ on both sides of the gap. The datalink radar timestamp shows 12 minutes ago.',options:['Fly through the gap — radar shows no returns in the corridor','Avoid the gap — 12-minute-old radar may show a corridor that no longer exists; 35-45 dBZ cells indicate heavy precipitation; the gap may contain severe turbulence at the updraft/downdraft boundary','Descend to 10,000 ft where radar shows clear','Request ATC vectors through the gap — they have better radar'],correct:1,question:'What is your assessment of the gap?',xp:25,explanation:'Multiple red flags: (1) 12-minute-old datalink radar — the storms have moved; the gap may be closed. (2) 35-45 dBZ = Heavy-to-extreme returns on both sides — severe turbulence likely in the boundary zones. (3) Radar gaps = updraft/downdraft interface = worst turbulence. ATC radar is also not real-time enough for tactical decisions. The only safe choice is to deviate around the storm system entirely.',faaRef:'Ch. 24'},
      {id:'q_m14_6',type:'mc',question:'Echo Tops radar product displays:',options:['The height of the 18 dBZ echo top above sea level — cloud tops are higher','The maximum wind speed at the top of each storm cell','The altitude of maximum reflectivity within each storm','The depth of precipitation from cloud base to surface'],correct:0,xp:10,explanation:'Echo Tops shows the height of the 18 dBZ radar echo above sea level (in thousands of feet). This is the top of detectable precipitation — cloud tops are higher still. Pilots use Echo Tops to gauge whether they can safely fly above a storm system. Rule of thumb: add 1,000–4,000 ft above Echo Tops as a buffer for thunderstorm avoidance.',faaRef:'Ch. 24',concept:'radar_products'},
      {id:'q_m14_7',type:'mc',question:'Why might a radar show no returns even when precipitation exists?',options:['Radar only updates every 30 minutes — old data is removed','Beam overshoot — at long range the radar beam passes over the top of precipitation','Radar cannot detect frozen precipitation at any range','All precipitation appears on radar if the gain is properly set'],correct:1,xp:10,explanation:'Beam overshoot: as radar range increases, the beam angle takes it higher in the atmosphere. At 150-250 NM from the radar site, the beam may completely overshoot precipitation — showing nothing when significant weather exists. Always be aware of the nearest radar site location and consider areas far from radar as potentially underrepresented.',faaRef:'Ch. 24',concept:'radar_products'}
    ,
      {id:'q_m14_8',type:'timed',timeLimit:10,question:'At night, which satellite imagery type is most useful for identifying active thunderstorm locations and heights?',options:['Visible — shows cloud texture and shadows clearly','Water vapor — shows moisture at 500 mb level','Enhanced infrared (IR) — shows cold cloud tops in color, works 24/7','Surface radar reflectivity — satellite is not useful at night'],correct:2,xp:15,explanation:'Visible satellite requires sunlight and is useless at night. Enhanced infrared measures cloud-top temperature 24/7, using colors where coldest (highest) tops appear bright red or black — identifying CB anvils and active storm cores. Always use an animated loop to assess movement. Water vapor shows upper-level moisture but doesn’t resolve individual storm cells as precisely.',faaRef:'Ch. 24',concept:'radar_products'}
    ,
      {id:'q_m14_9',type:'mc',question:'Why does aircraft weather radar show only the LEADING EDGE of an intense storm cell rather than its full extent?',options:['Aircraft radar has limited range and cannot detect storms beyond 50 NM','Heavy precipitation at the leading edge attenuates (absorbs/scatters) the 3-cm radar beam, preventing energy from penetrating to show storms behind the leading edge','Aircraft radar uses a different wavelength that only shows precipitation intensity, not distance','Modern aircraft radar has been updated to show full storm extent — older aircraft had this limitation'],correct:1,xp:10,explanation:'Aircraft weather radar typically uses 3-cm wavelength. At 3 cm, precipitation attenuation is severe — heavy rain near the radar absorbs and scatters so much energy that little reaches storms behind it. What appears to be a gap between storm cells on aircraft radar may actually be a continuation of intense precipitation hidden by attenuation. This is a critical limitation: never attempt to fly through a gap shown on airborne radar in a convective environment — it may not be a real gap.',faaRef:'Ch. 15',concept:'radar_products'},
      {id:'q_m14_10',type:'timed',timeLimit:10,question:'On a NEXRAD reflectivity display, which color typically indicates the most intense precipitation requiring immediate avoidance?',options:['Green — moderate rainfall, safe to penetrate in most aircraft','Yellow/orange — heavy rain, use caution','Red and magenta/purple — extreme reflectivity (65+ dBZ), large hail, severe thunderstorm'],correct:2,xp:10,explanation:'Standard NEXRAD reflectivity color scale: Green = light (15-30 dBZ, light rain). Yellow = moderate (35-40 dBZ, moderate rain). Orange/red = heavy (45-55 dBZ, heavy rain, possible hail). Magenta/purple = extreme (60-75 dBZ, large hail, severe thunderstorm). The NWS uses 35 dBZ as the threshold for significant precipitation. Any cell showing red should be avoided by at least 20 NM; magenta/purple cells should be given maximum available separation.',faaRef:'Ch. 15',concept:'radar_products'},
      {id:'q_m14_11',type:'mc',question:'Anomalous propagation (AP) on a radar display refers to:',options:['Unusual storm motion caused by jet stream winds','False echoes created when the radar beam bends toward the ground due to a temperature inversion, showing ground targets as precipitation','Loss of radar signal caused by beam blockage from terrain','Precipitation that appears to move backward on radar loop'],correct:1,xp:10,explanation:'Anomalous propagation (AP) occurs when a temperature inversion causes the radar beam to bend downward (super-refraction) and strike the ground, producing false echoes that look like precipitation. AP typically shows as: irregular, flat echoes near the radar, a "bulls-eye" pattern, or returns that appear in clear weather overnight/early morning when inversions are common. Key diagnostic: AP doesn’t move coherently on a loop animation — use the animated loop to distinguish AP from real precipitation.',faaRef:'Ch. 15',concept:'radar_products'},
      {id:'q_m14_12',type:'scenario',scenario:'You are 40 NM from a line of cells and your EFB shows a NEXRAD image with 5-minute-old data. The cells appear to be moving at 35 kt toward your position. Your aircraft cruises at 110 kt.',question:'Using only NEXRAD to navigate between two gaps in the cells, what is the critical hazard?',options:['None — 40 NM provides plenty of decision time at 35 kt cell motion','The NEXRAD data is 5+ minutes old. Cells move and develop rapidly. Gaps visible now may have closed. Airborne radar with REAL-TIME display must be used for in-close convective avoidance — NEXRAD is for STRATEGIC avoidance only.','NEXRAD is accurate enough for in-close avoidance at distances under 50 NM','The 35 kt cell motion means you have 69 minutes before the cells reach you — adequate time'],correct:1,xp:20,explanation:'NEXRAD datalink (FIS-B, ForeFlight, etc.) has 5-15 minutes of latency from scan to your cockpit. At 35 kt cell motion, a cell can move 3-9 NM during that latency. A gap that appears safe may have closed. For this reason, NEXRAD is used ONLY for strategic avoidance (staying well clear of storm systems) — NEVER for navigating between cells. Airborne weather radar with real-time display is required for in-close avoidance. If you don’t have airborne radar, stay at least 20 NM from any convective activity.',faaRef:'Ch. 3, 15'}
    ]
  },

  // ============================================================
  // M15: ADVISORIES (SIGMETs, AIRMETs, CWAs)
  // ============================================================
  {
    id:'m15',act:3,title:'Advisories',subtitle:'SIGMETs, AIRMETs, CWAs & convective products',
    icon:'⚠️',color:'#EA580C',bgColor:'#FFF7ED',prerequisites:['m6','m7','m8'],
    xpReward:225,estimatedMin:18,faaRef:'FAA-H-8083-28A Chapter 26',
    sections:[
      {
        id:'s15_1',title:'The Advisory Hierarchy',
        content:`
          <p>Aviation weather advisories form a <strong>priority hierarchy</strong> based on severity. Each type targets a different threat level and pilot population. Knowing which advisory applies to your flight is a fundamental pre-flight skill.</p>
          <p>The four categories below map operational domain to validity window — Convective SIGMETs and CWAs are short-fuse hazard products, SIGMETs span the moderate window, and AIRMETs cover the standard six-hour forecast period. Each card lists the coverage and issuing agency you'll see on the official products.</p>
        `,
        diagram:{type:'advisory_hierarchy'}
      },
      {
        id:'s15_2',title:'Convective SIGMETs in Detail',
        content:`
          <p>Convective SIGMETs are among the most serious aviation weather products for route planning. Issued by the Aviation Weather Center (AWC), they describe significant convective hazards and should be reviewed carefully by any pilot planning to operate near that weather.</p>
          <div class="danger-callout"><strong>Training caution:</strong> An active Convective SIGMET is a strong signal to reassess route, timing, alternates, and escape options before launch.</div>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0;font-family:var(--font-mono);font-size:12px;line-height:1.8">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:10px;font-family:var(--font-display);font-weight:700">EXAMPLE CONVECTIVE SIGMET</div>
            CONVECTIVE SIGMET 15C<br>
            VALID UNTIL 2155Z<br>
            OK TX<br>
            FROM 40NW OKC-60SW TUL-40NNW DAL-40NW OKC<br>
            AREA EMBD TS MOV FROM 25040KT. TOPS ABV FL450.<br>
            WIND GREATER THAN 40 KT POSS.
          </div>
          <div style="display:grid;gap:8px;margin:16px 0">
            ${[['15C','15th bulletin. C = Central US SIGMET (E = Eastern, W = Western). Issued at H+55 and H+25 past the hour.'],['VALID UNTIL 2155Z','All convective SIGMETs are valid for 2 hours. Check the time before using.'],['FROM ... TO ...','Geographical polygon defining the affected area. Defined by NAVAIDs or lat/lon.'],['EMBD TS','Embedded thunderstorms (hidden in clouds — the most dangerous type for IFR flight).'],['MOV FROM 25040KT','Storm movement from 250° at 40 kt. Used to project future storm position.'],['TOPS ABV FL450','Echo tops above Flight Level 450 — cannot be overflown by most aircraft. Must deviate around.'],['WIND > 40 KT POSS','Associated hazard — surface wind gusts expected with this convective system.']].map(([code,desc])=>`
            <div style="background:white;border-radius:12px;padding:10px 14px;display:flex;gap:10px">
              <code style="background:var(--navy);color:#F59E0B;padding:2px 8px;border-radius:6px;font-size:11px;white-space:nowrap;flex-shrink:0">${code}</code>
              <span style="font-size:13px;color:#475569">${desc}</span>
            </div>`).join('')}
          </div>
        `
      },
      {
        id:'s15_5',title:'G-AIRMET & GFA Tool',
        content:`
          <p><strong>G-AIRMETs</strong> (Graphical AIRMETs) have replaced the legacy text AIRMET format on aviationweather.gov. Students who learned the old text-block system need to understand the modern graphical interface — it is what they will use from Day 1 of flying.</p>
          <div class="fact-box">
            <span style="font-size:28px">🗺️</span>
            <div><strong>What changed:</strong> Legacy text AIRMETs (dense paragraphs of codes and coordinates) have been replaced by <strong>G-AIRMETs — shaded graphical polygons</strong> on the aviationweather.gov GFA map. Pilots tap or click a shaded region to read the hazard details — no text decoding required.</div>
          </div>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              {name:'G-AIRMET Sierra',emoji:'🌫️',color:'#64748B',bg:'#F8FAFC',desc:'IFR conditions: ceilings below 1,000 ft and/or visibility below 3 SM affecting more than 50% of an area. Also covers mountain obscuration. Primary concern for VFR pilots. An active Sierra on your route means IFR conditions ahead — plan alternates.'},
              {name:'G-AIRMET Tango',emoji:'💥',color:'#F59E0B',bg:'#FEF3C7',desc:'Moderate turbulence, sustained surface winds above 30 kt, and non-convective low-level wind shear (LLWS). Does not include severe turbulence — that level of intensity triggers a non-convective SIGMET, not an AIRMET.'},
              {name:'G-AIRMET Zulu',emoji:'❄️',color:'#0284C7',bg:'#E0F2FE',desc:'Moderate icing not related to thunderstorms, plus freezing level information. For many non-ice-protected aircraft, an active Zulu on your planned route and altitude is a strong signal to reassess carefully and may make that route unacceptable.'},
            ].map(a=>`
            <div style="background:${a.bg};border-radius:16px;padding:14px;border-left:4px solid ${a.color}">
              <strong style="font-family:var(--font-display);font-size:14px;color:${a.color}">${a.emoji} ${a.name}</strong>
              <p style="font-size:13px;color:#475569;margin:8px 0 0">${a.desc}</p>
            </div>`).join('')}
          </div>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">G-AIRMET TIMING AND FORMAT</div>
            ${[
              ['Issuance Frequency','Every 3 hours at synoptic times: 00, 03, 06, 09, 12, 15, 18, 21 UTC'],
              ['Valid Period','Each G-AIRMET covers a 3-hour window — contrast with legacy text AIRMETs which were valid for 6 hours'],
              ['Snapshot','Current conditions — the active shaded polygons on the GFA map right now'],
              ['Outlook','Forecast G-AIRMETs up to 12 hours ahead — use for pre-flight planning of later departures'],
              ['How to Use','On aviationweather.gov: open the GFA tool, select the AIRMET layer, tap any shaded polygon, read the popup for hazard type, affected altitudes, and valid period'],
            ].map(([label,val])=>`<div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;display:grid;grid-template-columns:1.3fr 1.7fr;gap:8px"><span style="color:#38BDF8;font-size:12px;font-weight:700">${label}</span><span style="color:#94A3B8;font-size:12px">${val}</span></div>`).join('')}
          </div>
          <div class="danger-callout"><strong>Training caution:</strong> Treat an active G-AIRMET Zulu as a serious icing signal. For many non-ice-protected aircraft, that can make the planned route or altitude unacceptable unless the full weather picture supports a safer alternative.</div>
          <div class="callout">📋 <strong>Checkride tip:</strong> On your checkride, if asked to interpret AIRMETs, describe the G-AIRMET graphical system — that is what you will actually use in the real world. Know that Sierra = IFR/mountain obscuration, Tango = Turbulence/LLWS, Zulu = Icing. Know that G-AIRMETs are issued every 3 hours, valid for 3-hour periods, and found on the aviationweather.gov GFA tool.</div>
        `
      }
    ,
      {
        id:'s15_6',title:'Center Weather Advisories & MIS',
        content:`
          <p>While AIRMETs and SIGMETs cover the broad picture, two products provide more tactical, real-time guidance from meteorologists embedded with ATC:</p>
          <div style="display:grid;gap:14px;margin:16px 0">
            <div style="background:#E0F2FE;border-radius:16px;padding:16px;border-left:4px solid #0284C7">
              <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">📡 Center Weather Advisory (CWA)</strong>
              <p style="font-size:13px;color:#475569;margin:8px 0">Issued by Center Weather Service Units (CWSU) co-located with ARTCCs. Valid for up to 2 hours. Issued when conditions will affect safety of flight within that ARTCC’s airspace — even before a national SIGMET or AIRMET is issued. Think of it as an ARTCC-specific, short-fuse weather alert.</p>
              <div style="background:rgba(2,132,199,.1);border-radius:10px;padding:10px;font-size:12px;color:#0369A1;margin-top:8px"><strong>Issued for:</strong> IFR conditions, icing, turbulence, LLWS, strong surface winds, or any condition affecting NAS traffic flow.</div>
            </div>
            <div style="background:#EEF2FF;border-radius:16px;padding:16px;border-left:4px solid #6366F1">
              <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">📋 Meteorological Impact Statement (MIS)</strong>
              <p style="font-size:13px;color:#475569;margin:8px 0">Issued by CWSUs up to 12 hours in advance to inform ATC management of weather that will significantly affect traffic flow. MIS data drives ground stops and miles-in-trail restrictions that directly affect your flight. Available on aviationweather.gov.</p>
            </div>
          </div>
          <div class="callout"><strong>Study note:</strong> This lesson uses a simple priority order to help organize advisory products. In real planning, read active SIGMETs, Convective SIGMETs, G-AIRMETs, CWAs, and PIREPs together to build the full hazard picture.</div>
        `
      }],
    quiz:[
      {id:'q_m15_1',type:'mc',question:'Which advisory has the HIGHEST priority and applies to ALL aircraft?',options:['AIRMET Sierra (IFR conditions)','AIRMET Tango (turbulence)','Convective SIGMET','CWA (Center Weather Advisory)'],correct:2,xp:10,explanation:'In this app, Convective SIGMET is treated as the highest-priority convective advisory because it describes serious hazards such as embedded thunderstorms, severe turbulence, large hail, tornadoes, and strong convective wind. It is relevant to all aircraft because those hazards are not limited by aircraft category or equipment.',faaRef:'Ch. 26',concept:'advisories'},
      {id:'q_m15_2',type:'mc',question:'AIRMET Sierra is issued for:',options:['Severe turbulence and sustained winds >30 kt','Moderate icing not related to thunderstorms','IFR conditions (ceilings <1,000 ft and/or visibility <3 SM) and mountain obscuration','Severe icing associated with thunderstorms'],correct:2,xp:10,explanation:'AIRMET Sierra = IFR conditions (ceiling <1,000 ft AND/OR visibility <3 SM covering >50% of an area) and mountain obscuration. Primarily aimed at VFR pilots who may inadvertently enter IMC. AIRMETs: Sierra=IFR/mountain; Tango=Turbulence/LLWS; Zulu=Icing.',faaRef:'Ch. 26',concept:'advisories'},
      {id:'q_m15_3',type:'timed',timeLimit:10,question:'A Convective SIGMET is valid for:',options:['6 hours — same as AIRMET','2 hours — requires re-check after expiration','Until the thunderstorms dissipate — no expiration','24 hours — covers entire operational day'],correct:1,xp:15,explanation:'All Convective SIGMETs are valid for a maximum of 2 hours. They are issued at H+55 and H+25 (approximately 55 minutes past the hour and 25 minutes past), with special bulletins as needed. Always check the valid time before using a Convective SIGMET — if it expired, check for a new one.',faaRef:'Ch. 26',concept:'advisories'},
      {id:'q_m15_4',type:'drag_drop',question:'Match each advisory type to what hazard it covers:',items:['Convective SIGMET','AIRMET Sierra','AIRMET Tango','AIRMET Zulu'],targets:['Embedded CBs / severe convective hazards','IFR ceilings & mountain obscuration','Moderate turbulence & surface winds >30 kt','Moderate icing & freezing levels'],answers:{'Convective SIGMET':'Embedded CBs / severe convective hazards','AIRMET Sierra':'IFR ceilings & mountain obscuration','AIRMET Tango':'Moderate turbulence & surface winds >30 kt','AIRMET Zulu':'Moderate icing & freezing levels'},xp:20,explanation:'Advisory types: Convective SIGMET = severe convective (CBs, large hail, severe turbulence, tornadoes); AIRMET Sierra = IFR/mountain obs; AIRMET Tango = Turbulence/LLWS; AIRMET Zulu = Icing. Non-convective SIGMET covers severe icing, severe turbulence (non-CB), and volcanic ash.',faaRef:'Ch. 26',concept:'advisories'},
      {id:'q_m15_5',type:'scenario',scenario:'You are pre-flighting for a VFR cross-country. Your weather app shows: Active AIRMET Sierra for your route (ceilings 900 ft OVC). Active AIRMET Tango for moderate turbulence below 10,000 ft. The METAR at your destination confirms: OVC008 (800 ft ceiling) 2SM -RA. The TAF shows no improvement for 6 hours.',question:'What is the correct go/no-go decision for a VFR student pilot?',options:['Go — AIRMETs are advisories only, not prohibitions. If you can see 2 SM, you can fly.','Go with caution — fly at 500 ft AGL under the cloud layer','No go — 800 ft OVC ceiling and 2 SM visibility are IFR conditions. VFR flight into IMC is the leading cause of weather-related fatal accidents.','Call ATC for a special VFR clearance and proceed'],correct:2,xp:25,explanation:'This is an unambiguous NO GO for a VFR student pilot. 800 ft ceiling (OVC008) and 2 SM visibility are IFR conditions — below VFR minimums in all airspace classes. Flying VFR into IMC is the #1 weather-related killer in general aviation. AIRMET Sierra confirms widespread IFR. The active AIRMET Tango adds turbulence risk. The TAF shows no improvement. No mission, schedule, or social pressure justifies VFR flight into these conditions.',faaRef:'Ch. 26'},
      {id:'q_m15_6',type:'mc',question:'A CWA (Center Weather Advisory) is valid for a maximum of:',options:['6 hours — same as AIRMET','24 hours — operational day coverage','2 hours — supplements SIGMETs for quickly developing conditions','30 minutes — urgent immediate hazard only'],correct:2,xp:10,explanation:'A CWA (Center Weather Advisory) is valid for a maximum of 2 hours. Issued by CWSU meteorologists embedded in ARTCCs, CWAs address rapidly developing weather hazards that are not yet covered by existing SIGMETs or G-AIRMETs. They are the most "real-time" of the formal advisory products.',faaRef:'Ch. 26',concept:'advisories'},
      {id:'q_m15_7',type:'mc',question:'AIRMET Tango covers which hazard?',options:['Ceilings below 1,000 ft and visibility below 3 SM','Moderate icing not from thunderstorms','Moderate turbulence, sustained surface winds >30 kt, and LLWS','Severe icing associated with embedded thunderstorms'],correct:2,xp:10,explanation:'AIRMET Tango = Turbulence: moderate turbulence, sustained surface winds ≥30 kt, and non-convective LLWS (Low-Level Wind Shear). It does NOT cover severe turbulence — that triggers a non-convective SIGMET. The three AIRMETs: Sierra (IFR/mountain), Tango (Turbulence/LLWS), Zulu (icing/freezing levels).',faaRef:'Ch. 26',concept:'advisories'},
      {id:'q_m15_8',type:'scenario',scenario:'You are pre-flighting for an IFR cross-country at FL090. Your weather brief includes: Convective SIGMET 22C valid until 1955Z covering your route. Current time: 1910Z. G-AIRMET Zulu active (moderate icing 7,000-11,000 ft). PIREPs showing moderate rime at FL090 over your route 45 min ago.',question:'What is the most complete and correct assessment of your situation?',options:['Proceed — the SIGMET expires in 45 min and you should be past the area','The combination of an active Convective SIGMET, AIRMET Zulu, and recent moderate icing PIREPs at your altitude creates a compounding hazard picture. Delay, reroute, or select an altitude above or below the icing layer after the SIGMET expires.','The AIRMET Zulu overrides the Convective SIGMET — prioritize the icing concern only','File the route but request vectors around any radar returns from ATC'],correct:1,xp:25,explanation:'Multiple concurrent advisories compound risk: (1) An active Convective SIGMET signals serious convective hazard on your route. (2) AIRMET Zulu highlights icing at your planned altitude. (3) A recent PIREP confirms that icing. Together they support delaying, rerouting, or choosing a safer altitude only after the convective and icing picture improves. No single advisory exists in isolation - evaluate the full weather picture.',faaRef:'Ch. 26'}
    ,
      {id:'q_m15_9',type:'mc',question:'A Center Weather Advisory (CWA) differs from an AIRMET primarily in that:',options:['CWAs cover larger geographic areas than AIRMETs','CWAs are issued by ARTCC meteorologists for their specific airspace and are valid for only 2 hours — more tactical and timely','CWAs require pilot reports before they can be issued','CWAs only cover IFR conditions; AIRMETs cover turbulence and icing'],correct:1,xp:10,explanation:'CWAs are issued by CWSUs co-located with ARTCCs, valid up to 2 hours, covering only that ARTCC’s airspace. They are more tactical than AIRMETs — they can be issued when conditions exist NOW. AIRMETs cover broader areas with 6-hour valid periods. Use both: AIRMET for the big picture, CWA for immediate ARTCC-specific hazards.',faaRef:'Ch. 26',concept:'advisories'}
    ,
      {id:'q_m15_10',type:'mc',question:'AIRMET Tango is issued for which conditions?',options:['Icing and freezing level information','Non-convective low-level wind shear below 2,000 ft AGL, moderate turbulence below FL180, and strong surface winds (sustained/gusts ≥30 kt at the surface)','IFR conditions (ceilings <1,000 ft or visibility <3 SM)','Volcanic ash and tropical cyclone advisories'],correct:1,xp:10,explanation:'AIRMET types: Sierra (IFR) = ceiling <1,000 ft or vis <3 SM, mountain obscuration. Tango (Turbulence) = moderate turbulence below FL180, sustained surface winds ≥30 kt, non-convective LLWS below 2,000 ft. Zulu (icing/freezing) = moderate icing, freezing level information. G-AIRMETs use the same Sierra/Tango/Zulu designations graphically. Tango is issued when turbulence meets the moderate threshold but is below severe (which would require a SIGMET). KJQF frequently gets AIRMET Tango during cold season frontal passages.',faaRef:'Ch. 26',concept:'advisories'},
      {id:'q_m15_11',type:'timed',timeLimit:12,question:'A Convective SIGMET is automatically issued when which conditions are observed or forecast?',options:['Any cumulonimbus within 50 NM of an airport','Severe or extreme turbulence within any cloud','Embedded thunderstorms, a line of thunderstorms 60+ NM long, area of thunderstorms covering 40%+ of an area of 3,000 sq mi, or any tornado, hail ≥3/4 in, or wind gusts ≥50 kt'],correct:2,xp:15,explanation:'Convective SIGMETs are issued by the AWC for: (1) severe thunderstorms with surface winds ≥50 kt, hail ≥3/4 in diameter, or tornadoes; (2) embedded thunderstorms; (3) lines of thunderstorms at least 60 NM long; (4) areas of thunderstorms covering at least 40% of an area of 3,000 sq mi. They are issued as needed and valid for up to 2 hours (1 hour for isolated severe thunderstorms). Issued hourly at H+55 regardless of conditions. Always check for Convective SIGMETs before and during any flight near convective weather.',faaRef:'Ch. 26',concept:'advisories'},
      {id:'q_m15_12',type:'mc',question:'How do AIRMETs differ from SIGMETs in terms of aircraft affected?',options:['SIGMETs affect only jet aircraft; AIRMETs affect only piston aircraft','AIRMETs are primarily for light general aviation aircraft and VFR pilots. SIGMETs apply to all aircraft and involve more intense, potentially hazardous conditions to all aircraft including airliners.','They are identical products with different names for different regions','AIRMETs cover smaller geographic areas than SIGMETs'],correct:1,xp:10,explanation:'AIRMETs are issued primarily for conditions potentially hazardous to light aircraft (non-severe icing, non-severe turbulence, IFR conditions). However, IFR pilots in instrument-equipped aircraft still need to be aware of AIRMETs. SIGMETs describe conditions hazardous to ALL aircraft: severe/extreme turbulence, severe icing, volcanic ash, and tropical cyclones. A Convective SIGMET applies to every aircraft flying in US airspace. Severity: AIRMET < SIGMET. Both require pilot attention and route planning.',faaRef:'Ch. 26',concept:'advisories'},
      {id:'wb_m15_1',type:'wx_brief',
       title:'Stacked AIRMETs — KAND to KAVL',
       mission:{departure:'KAND',destination:'KAVL',aircraft:'Single-engine piston (non-ice-certificated)',
         pilot:'Private pilot, 210 hours, VFR only',ete:'1+00',fuel:'4.0 hours usable',
         departureTime:'1500Z (1100L EDT) — late October'},
       products:[
         {type:'metar',label:'KAND 1456Z',
          raw:'KAND 151456Z 07008KT 4SM BR BKN025 OVC060 10/09 A3008 RMK AO2 SLP192',
          decoded:'NE wind 8kt, 4SM in mist, broken 2,500ft, overcast 6,000ft. Temp 10C / dew 9C — 1C spread. MVFR. Ceiling 2,500ft. The moist dewpoint spread at 10C means any terrain encounter could result in IMC.'},
         {type:'metar',label:'KAVL 1453Z',
          raw:'KAVL 151453Z 01015KT 2SM BR OVC008 06/06 A3005 RMK AO2 SLP183',
          decoded:'N wind 15kt, 2SM in mist, overcast at 800ft AGL (ceiling ~2,965ft MSL at KAVL elevation 2,165ft). Temp 6C / dew 6C — saturated. IFR. In the mountains, an 800ft AGL ceiling obscures terrain.'},
         {type:'sigmet',label:'AIRMET Sierra — IFR conditions',
          text:'AIRMET SIERRA UPDT 2 FOR IFR VALID UNTIL 0000Z ...FROM GSP TO AVL TO AND TO GSP... CIGS BLW 1000 FT AND/OR VIS BLW 3 SM. COND CONTG BYD 0000Z. Covers the triangular area between GSP, AVL, and AND — exactly your route. Ceilings below 1,000ft and/or visibility below 3SM, continuing beyond midnight.'},
         {type:'sigmet',label:'AIRMET Zulu — icing',
          text:'AIRMET ZULU UPDT 1 FOR ICE VALID UNTIL 0000Z ...FROM HMV TO AVL TO UKF TO HMV... MOD ICE BLW FL140 FZLVL 4000-6000 FT MSL. COND CONTG BYD 0000Z. Moderate icing below FL140. Freezing level 4,000-6,000ft MSL. KAVL elevation is 2,165ft MSL — the freezing level is only 1,800-3,800ft above the airport. Any clouds in the approach environment are at or near freezing in this non-ice-certificated aircraft.'}
       ],
       options:[
         {id:'A',label:'Go — AIRMETs are advisory only; I will stay clear of clouds throughout the flight',value:'go'},
         {id:'B',label:'No-go — Stacked AIRMET Sierra and Zulu; KAVL already IFR at 800ft ceiling in a non-ice aircraft',value:'no_go'},
         {id:'C',label:'Delay — Wait until afternoon when mountain ceilings typically lift',value:'delay'},
         {id:'D',label:'Go IFR — The ceilings allow an IFR climb above the overcast',value:'go_ifr'}
       ],
       analysis:{
         correct:'no_go',
         explanation:'AIRMET Sierra covers your entire route with ceilings below 1,000ft and visibility below 3SM — conditions already confirmed by the KAVL METAR showing 800ft AGL ceiling and 2SM. The destination is IFR right now, not forecast. AIRMET Zulu adds moderate icing below FL140 with a freezing level of 4,000-6,000ft MSL. In a non-ice-certificated piston single, flying through clouds in this temperature range exceeds the airframe\'s approved operating limitations. These two AIRMETs are describing the same airmass from two different hazard perspectives — stacked advisories that together make the route impassable for a VFR-only, non-ice aircraft.',
         keyFactors:[
           'AIRMET Sierra covers the entire route: ceilings below 1,000ft, vis below 3SM — VFR completion is not possible',
           'KAVL METAR confirms IFR right now: 800ft AGL ceiling, 2SM — this is observation, not forecast',
           'AIRMET Zulu: moderate icing below FL140 with freezing level at 4,000-6,000ft MSL in a non-ice aircraft',
           'Stacked advisories describe the same airmass from two hazard angles — both validated by current observations'
         ],
         trap:'"AIRMETs are just advisories — they do not prohibit flight." Correct, but the KAVL METAR is not advisory. It is what exists at the destination right now. When an AIRMET Sierra is issued and the destination METAR confirms IFR conditions, the advisory has been validated by observation. "Staying clear of clouds" is not physically possible when ceilings are confirmed at 800-1,000ft across the entire route.'
       },
       xp:30,concept:'advisories',faaRef:'FAA-H-8083-28A Ch. 26'},
      {id:'wb_m15_2',type:'wx_brief',
       title:'Convective SIGMET on Direct Route — KJQF to KGSP',
       mission:{departure:'KJQF',destination:'KGSP',aircraft:'Single-engine piston',
         pilot:'Private pilot, 380 hours, VFR only',ete:'0+50',fuel:'5.0 hours usable',
         departureTime:'1930Z (1530L EDT) — July'},
       products:[
         {type:'metar',label:'KJQF 1956Z',
          raw:'KJQF 141956Z 26012KT 10SM FEW050 SCT090 30/18 A3004 RMK AO2 SCT TCU N SLP143',
          decoded:'W wind 12kt, 10SM, few 5,000ft, scattered 9,000ft, scattered towering cumulus to the north. Temp 30C / dew 18C. VFR. Note TCU north — convective activity building north of the field.'},
         {type:'metar',label:'KGSP 1953Z',
          raw:'KGSP 141953Z 24010KT 10SM FEW060 BKN100 28/19 A3006 RMK AO2 SLP142',
          decoded:'WSW wind 10kt, 10SM, few 6,000ft, broken 10,000ft. VFR. Both airports look excellent — this is the trap setup.'},
         {type:'sigmet',label:'Convective SIGMET 44C (active)',
          text:'CONVECTIVE SIGMET 44C VALID UNTIL 2155Z NC SC ...FROM 30WNW CLT TO 25NW GSP TO 30NE GSP TO 25E CLT... ISOLD SVRSTM D30 TOPS ABV FL450 HAIL TO 1 IN MOV FROM 26040KT. Isolated severe storm, 30nm diameter, tops above FL450, 1-inch hail, moving northeast at 40kt. The SIGMET boundary straddles the Foothills corridor directly on the KJQF to KGSP direct route at approximately the 40nm midpoint.'},
         {type:'pirep',label:'PIREP near SIGMET boundary — 1940Z',
          text:'UA /OV GSP105035 /TM 1940 /FL095 /TP BE36 /TB SEV /SK OVC018 /WX TSRA /RM LARGE CB AT 12 OCLOCK AT SIGMET BOUNDARY TOPS OBSCD VIS INSIDE 0. Beechcraft Bonanza, 35nm east-northeast of KGSP at 9,500ft: severe turbulence, overcast 1,800ft, thunderstorm/rain, large CB directly ahead at the SIGMET boundary, tops obscured, visibility zero inside the storm.'}
       ],
       options:[
         {id:'A',label:'No-go — Active Convective SIGMET with severe turbulence PIREP; too dangerous regardless of routing',value:'no_go'},
         {id:'B',label:'Go direct — Both airports are clear; navigate around the cell visually using datalink NEXRAD',value:'go'},
         {id:'C',label:'Go with alternate routing — Use the southeastern routing to avoid the SIGMET; adds ~40nm, keeps entirely outside the boundary',value:'go_with_alternate'},
         {id:'D',label:'Delay — Wait 90 minutes; the storm is moving northeast at 40kt and will clear the route by ~2130Z',value:'delay'}
       ],
       analysis:{
         correct:'go_with_alternate',
         explanation:'Both airports are VFR and the hazard is route-specific — a 30nm-diameter discrete cell on the direct route midpoint. This is the scenario where the answer is neither "no-go" nor "go direct" but rather "go, with a planned routing that avoids the known hazard." The southeastern routing adds approximately 40nm, keeps entirely outside the SIGMET boundary, and both endpoints remain VFR. This is a correct PIC decision: identify the hazard, plan around it, execute the safe route. Option A (no-go) is overly conservative when a safe routing exists. Option D (delay) is tempting but unnecessary — the alternate route is available now.',
         keyFactors:[
           'Both airports are VFR — the hazard is confined to the route midpoint, not widespread across the area',
           'The SIGMET is a 30nm discrete cell, not a corridor — pre-planned routing keeps entirely outside the boundary',
           'Southeastern routing: ~118nm total, adds ~40nm, avoids the SIGMET entirely, both endpoints remain VFR',
           'This teaches that go/no-go is not binary — route planning is a legitimate and correct PIC tool'
         ],
         trap:'"Go direct and deviate around the cell if needed." Treating in-flight deviation as equivalent to pre-planned routing puts you in a reactive position near a severe storm moving at 40kt. A 30nm-diameter cell at 40kt closes distance at nearly 1nm per minute. The alternate route is pre-planned, known-safe, and eliminates the reactive decision entirely. No reason to improvise when the safe option is already planned.'
       },
       xp:30,concept:'thunderstorm_avoidance',faaRef:'FAA-H-8083-28A Ch. 22, 26'}
    ]
  }
,

  // ============================================================
  // M1A: THE WEATHER SERVICE SYSTEM (Ch. 1, 2, 3)
  // ============================================================
  {
    id:'m1a',act:1,title:'The Weather Service System',subtitle:'NOAA, NWS, AWC, FSS & how a briefing is built',
    icon:'🏛️',color:'#0284C7',bgColor:'#E0F2FE',prerequisites:['m1'],
    xpReward:100,estimatedMin:10,faaRef:'FAA-H-8083-28A Chapters 1, 2, 3',
    sections:[
      {
        id:'s1a_1',title:'Who Makes Your Weather Briefing',
        content:`
          <p>The US aviation weather system is a <strong>network of agencies and services</strong>. This lesson uses a simplified study model so you can see who originates major products and who helps distribute them.</p>
          <p style="font-size:13px;color:#64748B;margin:0 0 12px">Tap each tier for detail:</p>
          <div style="display:grid;gap:8px;margin:0 0 12px">
            ${[
              ['🌐','NOAA','Parent agency. Operates the NESDIS satellite network (GOES-East/West) and the National Weather Service. The satellite imagery on every aviation weather app flows from NOAA/NESDIS.','#E0F2FE','#0284C7','noaa'],
              ['🏢','NWS / AWC','National Weather Service — 122 local WFOs plus the Aviation Weather Center (AWC, Kansas City). AWC issues all SIGMETs, G-AIRMETs, Convective SIGMETs, CWAs, and operates aviationweather.gov.','#ECFDF5','#059669','nws'],
              ['✈️','FAA / Leidos FSS','The FAA does not produce weather — it distributes it. Leidos Flight Service (1-800-WX-BRIEF) synthesizes NWS products for your specific route. PIREPs entered by pilots and FSS are the only real-time in-flight observations.','#FEF3C7','#D97706','faa'],
            ].map(([icon,name,desc,bg,col,oid])=>`
            <div onclick="Diagrams.showOrgInfo('${oid}')" style="background:${bg};border-radius:14px;padding:14px;cursor:pointer;border:2px solid ${col}30;display:flex;gap:12px;align-items:flex-start;transition:all .15s">
              <span style="font-size:24px;flex-shrink:0">${icon}</span>
              <div>
                <div style="font-family:var(--font-display);font-weight:800;font-size:14px;color:${col};margin-bottom:4px">${name}</div>
                <div style="font-size:12px;color:#475569;line-height:1.5">${desc}</div>
              </div>
            </div>`).join('')}
          </div>
          <div id="org-detail" style="background:var(--navy);border-radius:14px;padding:14px;color:white;font-family:var(--font-display);font-size:13px;line-height:1.6;margin-top:4px;display:none">
            <strong id="org-title" style="color:#38BDF8;display:block;margin-bottom:6px"></strong>
            <span id="org-text"></span>
          </div>
          <div class="callout">📡 <strong>AAWU:</strong> The Alaska Aviation Weather Unit (Anchorage) issues SIGMETs, AIRMETs, and route forecasts for Alaska — the AWC equivalent for AK operations. FAA Ref: Ch. 2</div>
        `
      },
      {
        id:'s1a_2',title:'How a Standard Briefing Is Built',
        content:`
          <p>A standard briefing is not a single document. In practice, a briefer pulls together several core weather and flight-planning elements from current FAA/NWS sources. This six-part study layout is a training simplification to help you remember the flow.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">6 ELEMENTS OF A STANDARD BRIEFING — IN ORDER</div>
            ${[
              ['1 — Adverse Conditions','SIGMETs, Convective SIGMETs, G-AIRMETs, and significant PIREPs are commonly reviewed first.','#EF4444'],
              ['2 — VFR Not Recommended','Issued when the briefer believes VFR is inadvisable. Advisory only — a certificated pilot may legally depart but owns the decision and the risk.','#F59E0B'],
              ['3 — Synopsis','The big picture: where are the fronts, highs, and lows. The structural framework into which all other briefing elements fit.','#38BDF8'],
              ['4 — Current Conditions','METARs, surface observations, and PIREPs for departure and en route points.','#10B981'],
              ['5 — En Route Forecast','G-AIRMETs, winds and temps aloft, area forecasts for your route.','#A78BFA'],
              ['6 — Destination Forecast','TAF for your destination and alternates. GFA is used when a TAF is unavailable.','#94A3B8'],
            ].map(([elem,desc,col])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;display:grid;grid-template-columns:1.4fr 1.6fr;gap:8px">
              <span style="color:${col};font-size:12px;font-weight:700;font-family:var(--font-display)">${elem}</span>
              <span style="font-size:12px;color:#94A3B8">${desc}</span>
            </div>`).join('')}
          </div>
          <div class="callout">💡 <strong>The briefer synthesizes current weather products.</strong> Learning to read the same raw products yourself can make your briefing more informed and help you ask better follow-up questions.</div>
          <div class="fact-box">
            <span style="font-size:28px">📞</span>
            <div><strong>1-800-WX-BRIEF</strong> connects you to Leidos Flight Service. You can also file flight plans, receive inflight weather updates on <span class="data-tag">122.0 MHz</span> (En Route FSS), or relay a PIREP through ATC. FAA Ref: Ch. 3</div>
          </div>
        `
      },
      {
        id:'s1a_3',title:'The Three Briefing Types',
        content:`
          <p>Each briefing type serves a different phase of flight planning. Requesting the right type saves time and ensures you get exactly what you need.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['🟢','Standard Briefing','First briefing for a planned flight, or when you want a full current picture.','A full set of current briefing elements: adverse conditions, VNR if applicable, synopsis, current conditions, en route forecast, destination forecast. A strong default choice when you want the full weather picture.','#D1FAE5','#059669'],
              ['🟡','Abbreviated Briefing','Already have a standard briefing and need an update, or need only specific elements.','Only what you request — saves time. Example: "I have weather from 1400Z, I just need the convective update and the KGSO TAF."','#FEF3C7','#D97706'],
              ['🟠','Outlook Briefing','Departure is more than 6 hours away — planning phase only.','General forecast trends only. Forecasts beyond 6 hours carry significant uncertainty. Follow up with a standard briefing before you go.','#FFF7ED','#EA580C'],
            ].map(([dot,type,useWhen,gets,bg,col])=>`
            <div style="background:${bg};border-radius:16px;padding:16px;border-left:4px solid ${col}">
              <div style="font-family:var(--font-display);font-weight:800;font-size:15px;color:${col};margin-bottom:8px">${dot} ${type}</div>
              <div style="font-size:12px;color:#475569;margin-bottom:6px"><strong style="color:var(--navy)">Use when:</strong> ${useWhen}</div>
              <div style="font-size:12px;color:#475569"><strong style="color:var(--navy)">You get:</strong> ${gets}</div>
            </div>`).join('')}
          </div>
          <div class="callout">💡 <strong>Helpful briefing habit:</strong> Tell the briefer your certificate level and the kind of flight you are planning so the conversation can stay focused and useful.</div>
          <div class="danger-callout"><strong>Always note the issue time.</strong> A METAR or TAF obtained well before departure should be refreshed before flight because stale data can create false confidence.</div>
        `
      },
      {
        id:'s1a_4',title:'aviationweather.gov — Your Primary Tool',
        content:`
          <p>The AWC website is what every student, instrument candidate, and professional pilot actually uses. Every product a briefer cites is available here — learn to read them directly.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['🗺️ GFA Tool','Replaced the Area Forecast (FA). Four panels: Clouds/Visibility, IFR, Turbulence, Icing — current to 15-hr forecast in 3-hr steps. G-AIRMETs overlaid. The primary situational awareness tool for any flight plan review.'],
              ['📋 METARs / TAFs','Text and decoded format. Always note the issue time and use the most current report or forecast available.'],
              ['👁️ PIREPs','Plotted geographically or listed by text. Absence of PIREPs does NOT mean no hazards — it means no one has filed a report in that area recently.'],
              ['⚠️ SIGMETs / AIRMETs','Mapped on the GFA tool or listed by text. Always verify valid times before acting on any advisory product.'],
              ['💨 Winds Aloft (FB Winds)','AWC-issued forecast wind direction, speed, and temperature at standard altitudes. Used for fuel planning, altitude selection, density altitude, and turbulence avoidance.'],
              ['📊 Prog Charts','Surface analysis and 12/24/36/48-hr prognosis. Shows where fronts and pressure systems are now and where they are forecast to be — the big-picture framework for every flight plan.'],
            ].map(([title,desc])=>`
            <div style="background:white;border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.05)">
              <strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${title}</strong>
              <p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="fact-box">
            <span style="font-size:28px">📡</span>
            <div><strong>PIREP decoded example:</strong>
              <div style="margin-top:6px"><span class="data-tag">UA /OV KJQF /TM 1530 /FL070 /TP C182 /SK BKN060 /IC LGT RIME /RM CARB ICE ENCOUNTERED</span></div>
              <p style="font-size:12px;color:#475569;margin:6px 0 0">A single-engine piston (C182) over KJQF at 1530Z, 7,000 ft. Broken at 6,000 ft. Light rime icing. Remark: carburetor ice encountered.</p>
            </div>
          </div>
          <div class="callout">🎓 <strong>Oral exam tip:</strong> When asked how you get a weather briefing, describe using <em>both</em> aviationweather.gov AND 1-800-WX-BRIEF. The examiner wants to know you can read raw products, not just listen to a briefer. FAA Ref: Ch. 2, Ch. 3</div>
        `
      }],
    quiz:[
      {
        id:'q_m1a_1',type:'mc',
        question:'Which NWS facility issues SIGMETs, Convective SIGMETs, G-AIRMETs, and operates aviationweather.gov?',
        options:[
          'National Hurricane Center (NHC) — Miami, FL',
          'Storm Prediction Center (SPC) — Norman, OK',
          'Aviation Weather Center (AWC) — Kansas City, MO',
          'NOAA National Centers for Environmental Prediction (NCEP) headquarters'
        ],
        correct:2,xp:10,
        explanation:'The AWC in Kansas City is the central hub for all pilot-facing hazard products. It issues every SIGMET, Convective SIGMET, G-AIRMET, and CWA. It operates aviationweather.gov and produces the GFA tool. SPC issues severe weather watches and NHC issues tropical advisories — both feed into AWC products but neither directly issues pilot-facing advisories.',
        faaRef:'Ch. 2',concept:'briefing_products'
      },
      {
        id:'q_m1a_2',type:'scenario',
        scenario:'You call 1-800-WX-BRIEF for a preflight briefing. The briefer concludes: "VFR flight is not recommended on your route due to embedded IMC in cloud layers at 3,500 to 5,500 ft."',
        question:'What are your legal and professional options?',
        options:[
          'Cancel — VNR is a legal prohibition equivalent to a TFR',
          'VNR is advisory only — you may legally depart as a certificated pilot but you bear full responsibility. The professional response is to understand the specific hazards cited, evaluate them honestly, and depart only if you have a clear plan for each cited condition.',
          'Proceed — VNR only applies to student pilots under instructor supervision',
          'File IFR immediately — VNR triggers an automatic IFR requirement under 14 CFR 91.103'
        ],
        correct:1,xp:20,
        explanation:'VNR (VFR Not Recommended) is an advisory, not a legal prohibition. A certificated pilot may legally depart after a VNR. The professional response is to understand the specific hazards the briefer cited, evaluate whether you have the skills and equipment to manage them, and delay or cancel if you do not.',
        faaRef:'Ch. 3'
      },
      {
        id:'q_m1a_3',type:'mc',
        question:'You received an outlook briefing 6 hours ago. One hour before your planned departure, you should:',
        options:[
          'Use the outlook briefing — it is still valid and no additional briefing is required',
          'Get a standard briefing — the outlook covered planning, but current METARs, updated TAFs, and any new SIGMETs or G-AIRMETs issued in the past 6 hours are not in your picture',
          'Get only a winds aloft update — the weather picture does not change significantly in 6 hours',
          'The outlook briefing is sufficient for flights under 3 hours with no IFR conditions'
        ],
        correct:1,xp:10,
        explanation:'An outlook briefing is a planning tool for departures more than 6 hours away. It does not include current METARs, and the forecasts have aged significantly. New SIGMETs and G-AIRMETs may have been issued since then. Always get a standard or abbreviated briefing with current conditions within 1-2 hours of departure — the outlook is background context, not an operational brief.',
        faaRef:'Ch. 3',concept:'briefing_products'
      },
      {
        id:'q_m1a_4',type:'scenario',
        scenario:'A PIREP in the AWC system reads: UA /OV KJQF /TM 1830 /FL065 /TP C182 /IC MOD RIME /RM CARB ICE ENCOUNTERED',
        question:'What does this report tell you, and what is the operational implication?',
        options:[
          'A single-engine piston reported light turbulence at 6,500 ft over KJQF at 1830Z — no icing mentioned',
          'A single-engine piston reported moderate rime icing at 6,500 ft over KJQF at 1830Z, with carburetor icing noted in the remarks. Non-ice-certificated aircraft should avoid that altitude block in that area.',
          'The PIREP is invalid — carburetor ice is not a standard PIREP category so the report should be discarded',
          'This only applies to carbureted aircraft — turbocharged or fuel-injected aircraft may proceed normally'
        ],
        correct:1,xp:15,
        explanation:'PIREP fields: /OV = location (KJQF), /TM = time (1830Z), /FL = altitude (6,500 ft), /TP = aircraft type (C182, a single-engine piston), /IC = icing type (moderate rime), /RM = remarks (carb ice). The MOD RIME entry in /IC is the primary hazard flag — moderate icing is a go/no-go item for non-ice-certificated aircraft. The carb ice remark is supplemental operational information worth noting for any carbureted aircraft planning that area.',
        faaRef:'Ch. 2'
      },
      {
        id:'q_m1a_5',type:'mc',
        question:'The GFA (Graphical Forecast for Aviation) tool on aviationweather.gov replaced which legacy aviation weather product?',
        options:[
          'The SIGMET — replaced with a graphical polygon format',
          'The METAR — replaced with a gridded observational analysis',
          'The Area Forecast (FA) — GFA provides graphical cloud/visibility, IFR, turbulence, and icing panels out to 15 hours with G-AIRMETs overlaid',
          'The Terminal Area Forecast (TAF) — GFA gives airport-by-airport graphical forecasts'
        ],
        correct:2,xp:10,
        explanation:'The Area Forecast (FA) was a text-based product covering en-route clouds and weather for large geographic regions. It was replaced by the GFA tool at aviationweather.gov. The GFA provides four graphical panels (Clouds/Visibility, IFR, Turbulence, Icing) in 3-hour time steps out to 15 hours, with G-AIRMETs displayed as shaded overlays. TAFs remain unchanged and continue to serve individual airport forecasts.',
        faaRef:'Ch. 2, Ch. 3',concept:'briefing_products'
      }
    ]
  },

  // ====== ACT 4: THE FULL PICTURE (New Modules M16-M20) ======

  // ============================================================
  // M16: WEATHER SERVICE & BRIEFINGS (Ch. 2, 3)
  // ============================================================
  {
    id:'m16',act:1,title:'Weather Service & Briefings',subtitle:'NWS, FAA, FSS & the self-briefing process',
    icon:'📞',color:'#0369A1',bgColor:'#E0F2FE',prerequisites:['m11','m12','m15'],
    xpReward:175,estimatedMin:16,faaRef:'FAA-H-8083-28A Chapters 2, 3',
    sections:[
      {
        id:'s16_1',title:'The Aviation Weather Team',
        content:`
          <p>Aviation weather in the US is a <strong>shared system of agencies and providers</strong>. No single agency does it all — each has a specific role.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['🌐','NOAA / NWS','Produces the primary weather data, forecasts, and products. NWS field offices (WFOs) issue TAFs, airport warnings, and severe weather alerts. The Aviation Weather Center (AWC) in Kansas City issues AIRMETs, SIGMETs, and the GFA tool.','#E0F2FE','#0284C7'],
              ['🏛️','FAA','Sets aviation weather-reporting requirements, oversees flight-information services used by pilots, and supports distribution through operational systems and ATC.','#D1FAE5','#059669'],
              ['🏢','NCEP Centers','AWC (Kansas City) — AIRMETs/SIGMETs. SPC (Norman) — severe weather watches. NHC (Miami) — tropical advisories. SWPC (Boulder) — space weather. AAWU (Anchorage) — Alaska aviation.','#EEF2FF','#6366F1'],
              ['💼','Commercial Providers','Repackage NWS data into EFB apps (ForeFlight, Garmin Pilot, etc.) and may produce proprietary forecasts. FAA does NOT certify internet weather providers — pilots are responsible for assessing their products.','#FEF3C7','#D97706'],
            ].map(([icon,name,desc,bg,col])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;border-left:4px solid ${col}">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
                <span style="font-size:22px">${icon}</span>
                <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">${name}</strong>
              </div>
              <p style="font-size:13px;color:#475569;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="callout">💡 <strong>Key Reg:</strong> 14 CFR § 91.103 requires the PIC to become familiar with available information before a flight not in the vicinity of the departure airport, including weather reports and forecasts.</div>
        `
      },
      {
        id:'s16_2',title:'The Three Types of Briefings',
        content:`
          <p>Flight Service offers three distinct briefing types. Knowing which to request — and what each contains — is tested on the PPL written exam.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['🟢','Standard Briefing','Use when: first briefing for a flight, no previous weather knowledge.','Complete weather picture: adverse conditions, VFR-not-recommended advisory, synopsis, current conditions, en route forecast, destination forecast, winds/temps aloft, NOTAMs/ATC delays.','A strong default choice when you want the full weather picture.'],
              ['🟡','Abbreviated Briefing','Use when: updating a previous standard briefing, departure delayed, specific info needed.','Only the new or changed information since your last briefing. Tell the specialist when and where you got your last briefing.','Good for preflight day-of update after an earlier standard briefing.'],
              ['🟠','Outlook Briefing','Use when: departure is 6+ hours away.','General forecast trends only. Limited in scope due to forecast timeframe.','Follow up with a standard briefing before departure. This is a planning tool only.'],
            ].map(([dot,type,when,contains,tip])=>`
            <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,.06)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:18px">${dot}</span>
                <strong style="font-family:var(--font-display);font-size:16px;color:var(--navy)">${type}</strong>
              </div>
              <div style="font-size:13px;color:#475569;margin-bottom:6px"><strong>When:</strong> ${when}</div>
              <div style="font-size:13px;color:#475569;margin-bottom:6px"><strong>Contains:</strong> ${contains}</div>
              <div style="background:#F0F9FF;border-radius:8px;padding:8px 10px;font-size:12px;color:#0284C7;font-weight:600">💡 ${tip}</div>
            </div>`).join('')}
          </div>
          <div class="fact-box">
            <span style="font-size:28px">📞</span>
            <div><strong>How to call:</strong> 1-800-WX-BRIEF (1-800-992-7433). Online: 1800wxbrief.com. Have ready: VFR or IFR, aircraft ID and type, departure point, ETD, cruising altitude, route, destination, ETE, and for abbreviated briefings — time/source of last briefing.</div>
          </div>
        `
      },
      {
        id:'s16_3',title:'Product Latency & Self-Briefing',
        content:`
          <p><strong>Latency</strong> is the age of weather data — the time between when a phenomenon actually occurs and when you see it on your device. Understanding latency is critical for safe decision-making.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">DATA LATENCY REFERENCE</div>
            ${[
              ['Windsock','~0 seconds','Zero latency — always current'],
              ['ASOS/AWOS Wind Broadcast','Up to 3 minutes','2-min average, updated every minute'],
              ['METAR','~5 minutes','Issued hourly (or special)'],
              ['Onboard (airborne) Radar','~0 seconds','Real-time — current precipitation only'],
              ['NEXRAD / Datalink Radar','5–15+ minutes','Strategic avoidance only — NEVER navigate through storms using datalink'],
              ['TAF','Up to 6 hours valid','Forecast — not current conditions'],
            ].map(([product,latency,note])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;display:grid;grid-template-columns:1fr 1fr 1.5fr;gap:8px;font-size:12px">
              <span style="color:#38BDF8;font-weight:700">${product}</span>
              <span style="color:#F59E0B;font-family:var(--font-mono)">${latency}</span>
              <span style="color:#94A3B8">${note}</span>
            </div>`).join('')}
          </div>
          <div class="danger-callout"><strong>Critical limitation:</strong> NEXRAD data displayed in the cockpit has 5–15+ minute latency. It shows where storms were, not necessarily where they are. Never use datalink radar for in-close maneuvering between storm cells.</div>
          <p>The <strong>self-briefing process</strong> using aviationweather.gov or an EFB app can satisfy Part 91 preflight planning when it uses complete, current, and authoritative information. The GFA tool is useful because it pulls multiple FAA/NWS weather layers into one planning view, but it still requires pilot judgment and current updates.</p>
        `
      }
    ,
      {
        id:'s16_4',title:'In-Flight Weather Resources',
        content:`
          <p>The pre-flight briefing gives you a plan. These in-flight resources let you update it when conditions change.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[['📡','FIS-B (ADS-B In)','Weather broadcast over ADS-B UAT datalink. Includes METARs, TAFs, AIRMETs, SIGMETs, Convective SIGMETs, NEXRAD radar, NOTAMs. NEXRAD via FIS-B has 5–15 min latency. Requires ADS-B In receiver. Works throughout most of the US.'],['\ud83d\udcfb','Flight Service (122.2)','En route advisory service. Reach any FSS on 122.2 MHz throughout the US. Request updated weather, file/activate/close flight plans, request advisories.'],['\ud83d\udcf1','EFB Datalink','ForeFlight, Garmin Pilot etc. connected to ADS-B In or internet. Best graphical weather including animated NEXRAD and satellite loops. Always account for NEXRAD latency.'],['\ud83c\udfa4','ATC Weather Updates','Center and Approach controllers can provide weather advisories within 150 NM of their sector. Request “pilot weather report” or “deviation for weather” through ATC.']].map(([icon,name,desc])=>`<div style="background:white;border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.05);display:flex;gap:12px"><span style="font-size:24px;flex-shrink:0">${icon}</span><div><strong style="font-family:var(--font-display);font-size:13px;color:var(--navy)">${name}</strong><p style="font-size:12px;color:#475569;margin:4px 0 0">${desc}</p></div></div>`).join('')}
          </div>
        `
      }],
    quiz:[
      {id:'q_m16_1',type:'mc',question:'Which NWS center issues AIRMETs, SIGMETs, and Convective SIGMETs for the contiguous US?',options:['Storm Prediction Center (SPC)','Weather Prediction Center (WPC)','Aviation Weather Center (AWC)','National Hurricane Center (NHC)'],correct:2,xp:10,explanation:'The AWC in Kansas City issues the aviation-specific advisories: AIRMETs (Sierra, Tango, Zulu), SIGMETs, and Convective SIGMETs. The SPC issues severe weather watches (tornado/severe thunderstorm); the WPC issues surface analysis charts; the NHC issues tropical cyclone forecasts.',faaRef:'Ch. 2',concept:'briefing_products'},
      {id:'q_m16_2',type:'mc',question:'A pilot plans to depart in 8 hours and calls Flight Service for weather information. What type of briefing is most appropriate?',options:['Standard Briefing','Abbreviated Briefing','Outlook Briefing','No briefing needed — too early'],correct:2,xp:10,explanation:'An Outlook Briefing is used when departure is 6 or more hours away. It provides general forecast trends but is limited in scope. A follow-up Standard Briefing is essential before actual departure. An Abbreviated Briefing would be used to update a previous standard briefing.',faaRef:'Ch. 3',concept:'briefing_products'},
      {id:'q_m16_3',type:'timed',timeLimit:10,question:'What is the most significant hazard of using NEXRAD radar data from a cockpit datalink display?',options:['The display is too small to read accurately','NEXRAD data has 5–15+ minute latency — it shows past storm positions, not current','NEXRAD only shows precipitation above 10,000 ft','Datalink radar cannot detect light rain'],correct:1,xp:15,explanation:'NEXRAD datalink has 5–15 minutes or more of latency from scan to cockpit display. A thunderstorm cell can move several miles in that time. This is why NEXRAD is used for broad strategic avoidance — to stay well clear of storm systems — never for threading between cells.',faaRef:'Ch. 3',concept:'radar_products'},
      {id:'q_m16_4',type:'mc',question:'Per 14 CFR § 91.103, before beginning a flight the PIC must:',options:['File a flight plan for all flights over 50 NM','Become familiar with all available information concerning the flight, including weather','Brief all passengers on weather conditions','Contact ATC for a weather advisory'],correct:1,xp:10,explanation:'14 CFR § 91.103 (Preflight Action) requires PICs to become familiar with all available information for any flight not in the vicinity of the departure airport — including weather reports and forecasts. This is the regulatory basis for the preflight weather briefing requirement.',faaRef:'Ch. 3',concept:'briefing_products'},
      {id:'q_m16_5',type:'scenario',scenario:'You received a Standard Briefing 3 hours ago before your planned 2-hour cross-country. Departure has been delayed. Weather has changed and a new AIRMET Sierra has been issued for your route.',question:'What type of briefing should you request before departing?',options:['Outlook Briefing — your flight is still hours away','Standard Briefing — you need a complete new weather picture','Abbreviated Briefing — you have prior information and need only the updates','No briefing needed — you already have a standard briefing on file'],correct:2,xp:20,explanation:'An Abbreviated Briefing is appropriate when updating a prior standard briefing. Tell the specialist the time and source of your last briefing so they can provide only what has changed. The new AIRMET would be highlighted. If conditions have changed significantly, you may opt for a full standard briefing.',faaRef:'Ch. 3'},
      {id:'q_m16_6',type:'mc',question:'The FAA certifies internet aviation weather providers — true or false?',options:['True — all aviation weather websites must be FAA certified','True — only government-operated sites require certification','False — the FAA does NOT certify internet weather providers; pilots are responsible for assessing product quality','False — only commercial apps require certification'],correct:2,xp:10,explanation:'The FAA does not certify internet providers of aviation weather services. Pilots are responsible for evaluating the accuracy and reliability of any commercial weather product they use. Always cross-reference with official NWS products.',faaRef:'Ch. 3',concept:'briefing_products'}
    ,
      {id:'q_m16_7',type:'timed',timeLimit:10,question:'En route at 6,500 ft, FIS-B NEXRAD shows red cells 30 NM ahead. The data timestamp is 12 minutes old. What is the most appropriate response?',options:['Turn around immediately based on the radar data','Use the 12-minute-old data for broad strategic awareness only — contact ATC or Flight Service for current PIREPs before altering route','NEXRAD via FIS-B is real-time — the cells are exactly where shown','Red on NEXRAD means light rain — continue as planned'],correct:1,xp:15,explanation:'FIS-B NEXRAD has 5–15 min of latency. In 12 minutes, a fast-moving line can move 5–15 NM. The data confirms there IS a hazard ahead, but not precisely where. Contact ATC (Center) for current reports and PIREPs before making a deviation decision. Never thread between cells based on stale radar.',faaRef:'Ch. 3'}
    ,
      {id:'q_m16_8',type:'mc',question:'Which NWS center provides official tropical cyclone forecasts for the Atlantic, Caribbean, and Gulf of Mexico?',options:['Aviation Weather Center (AWC) in Kansas City','Storm Prediction Center (SPC) in Norman, OK','National Hurricane Center (NHC) in Miami, FL','Weather Prediction Center (WPC) in College Park, MD'],correct:2,xp:10,explanation:'The NHC in Miami provides official NWS forecasts for tropical cyclone movement, intensity, and associated watches/warnings for the Atlantic, Caribbean, Gulf of Mexico, and NE Pacific. For ICAO purposes, the NHC also functions as a Tropical Cyclone Advisory Center (TCAC). The NHC is the authoritative source for hurricane tracks, intensity, and timing. Always check NHC products when flying to/from the Caribbean, Gulf Coast, or Florida during hurricane season (June 1 – November 30).',faaRef:'Ch. 2',concept:'briefing_products'},
      {id:'q_m16_9',type:'mc',question:'What is the primary function of Center Weather Service Units (CWSUs)?',options:['Issue AIRMETs and SIGMETs for the national airspace','Provide weather consultation, forecasts, and Center Weather Advisories (CWAs) to ARTCC facilities and supported FAA facilities, specializing in conditions affecting NAS traffic flow','Operate the primary weather briefing service for GA pilots calling 1-800-WX-BRIEF','Maintain the national radar network (NEXRAD)'],correct:1,xp:10,explanation:'CWSUs are NWS units co-located with FAA ARTCCs. Their primary mission is supporting ATC operations — providing real-time weather consultation to ARTCC management and issuing Center Weather Advisories (CWAs) for weather affecting their ARTCC’s airspace. This is different from AWC (which issues national AIRMETs/SIGMETs) or WFOs (which issue TAFs and local warnings). CWSUs have a more tactical, real-time focus on conditions affecting en route air traffic.',faaRef:'Ch. 2',concept:'briefing_products'},
      {id:'q_m16_10',type:'scenario',scenario:'You plan a 0900L VFR flight. You got a standard briefing yesterday at 1800L showing good conditions. It’s now 0700L and you’re preparing to depart.',question:'What type of weather briefing is most appropriate, and what specific information should you prioritize?',options:['No briefing needed — conditions haven’t changed since your standard briefing','An abbreviated briefing — request only what has changed since your 1800L standard briefing. Prioritize: any new SIGMETs/AIRMETs, updated METARs/TAFs at departure/destination, and any new NOTAMs.','A new standard briefing is required by regulation every flight morning','An outlook briefing — your departure is more than 6 hours from your original briefing'],correct:1,xp:15,explanation:'You have a standard briefing from 13 hours ago. Request an abbreviated briefing, specifically telling the FSS specialist "I have a briefing from yesterday at 1800Z." The specialist will provide only new information. Priorities: (1) any new SIGMETs or convective SIGMETs, (2) new AIRMETs, (3) updated METARs and TAFs, (4) new NOTAMs. If conditions have changed significantly, you may need a full standard briefing. Always confirm with a fresh METAR immediately before takeoff.',faaRef:'Ch. 3'},
      {id:'q_m16_11',type:'timed',timeLimit:10,question:'The statement "VFR flight not recommended" (VNR) in a weather briefing:',options:['Is a regulatory prohibition — you cannot legally depart after receiving a VNR','Is an advisory only — the final go/no-go decision rests solely with the pilot. The briefer believes conditions may make VFR flight unsafe, but cannot prevent a properly rated pilot from departing.','Only applies to student pilots on solo flights','Triggers an automatic TFR around the departure airport'],correct:1,xp:10,explanation:'"VFR flight not recommended" is an advisory statement, not a regulatory prohibition. The briefer is expressing professional judgment that conditions may make VFR flight doubtful. The PIC retains responsibility for the go/no-go decision, but a VNR should be treated as a strong caution signal and a prompt to review hazards, alternatives, and personal limits carefully. VNR is not provided via internet briefing tools.',faaRef:'Ch. 3'},
      {id:'q_m16_12',type:'mc',question:'What are the three types of weather briefings and when is each appropriate?',options:['Departure, En Route, Arrival — requested at each phase of flight','Standard (first briefing, complete picture), Abbreviated (updating previous briefing), Outlook (departure 6+ hours away — planning only)','Full, Partial, Abbreviated — determined by flight distance','Short, Long, International — determined by flight duration'],correct:1,xp:10,explanation:'Standard Briefing: complete weather picture, use for first briefing or when you want all available information. Abbreviated Briefing: updates a previous briefing or provides specific requested information only — tell the specialist when and where you got your last briefing. Outlook Briefing: departure 6+ hours away, general forecast trends only, limited in scope. Always follow an outlook with a standard or abbreviated briefing closer to departure. These terms are recognized by Flight Service and EFB/online platforms.',faaRef:'Ch. 3'}
    ]
  },

  // ============================================================
  // M17: HEAT, WATER VAPOR & PRECIPITATION (Ch. 5, 6, 14)
  // ============================================================
  {
    id:'m17',act:1,title:'Heat, Water Vapor & Precipitation',subtitle:'Heat transfer, dewpoint, latent heat & precip types',
    icon:'💧',color:'#0EA5E9',bgColor:'#F0F9FF',prerequisites:['m1','m4'],
    xpReward:200,estimatedMin:18,faaRef:'FAA-H-8083-28A Chapters 5, 6, 14',
    sections:[
      {
        id:'s17_1',title:'Heat Transfer — Three Mechanisms',
        content:`
          <p>The Sun is the atmosphere's heat engine. Understanding how heat moves through the atmosphere explains why weather forms where and when it does.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['☀️','Radiation','Transfer of heat energy through space by electromagnetic waves at the speed of light. Does not require a medium. Solar radiation warms the Earth\u2019s surface; the surface then radiates longer-wavelength infrared energy back into the atmosphere (terrestrial radiation). Dark surfaces absorb more radiation and warm faster.','#FEF3C7','#D97706'],
              ['🌡️','Conduction','Transfer of heat by molecular activity through direct contact. Heat always flows from warmer to cooler. Air is a POOR conductor — conduction only heats a shallow surface layer. Critical fact: the ground heats and cools much faster than bodies of water because water has a much higher specific heat capacity.','#FEF2F2','#EF4444'],
              ['🌪️','Convection','Transfer of heat within a fluid (air or water) by motions of the fluid itself. The primary heat transport mechanism in the atmosphere. Warm air is less dense — it rises. Cool air sinks to replace it. This is how surface heating drives thermals, sea breezes, and thunderstorms.','#E0F2FE','#0284C7'],
            ].map(([icon,type,desc,bg,col])=>`
            <div style="background:${bg};border-radius:16px;padding:16px;border-left:4px solid ${col}">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <span style="font-size:26px">${icon}</span>
                <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">${type}</strong>
              </div>
              <p style="font-size:13px;color:#475569;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="fact-box">
            <span style="font-size:28px">🏖️</span>
            <div><strong>Water vs. Land:</strong> Water has a specific heat capacity more than 5 times that of sand. It takes much more energy to heat a given mass of water than sand. This is why beach sand is scorching hot while the water remains cool — and why coastal climates are milder than inland climates.</div>
          </div>
          <div class="callout">🌡️ <strong>Diurnal Temperature Variation:</strong> Maximum surface temperature usually occurs <em>midafternoon</em> — not noon — because time is needed for convection to warm the air. Minimum temperature occurs just after sunrise, when outgoing terrestrial radiation has been cooling the surface all night.</div>
        `
      },
      {
        id:'s17_2',title:'Water Vapor — RH, Dewpoint & Latent Heat',
        content:`
          <p>Water vapor is only 0–4% of the atmosphere by volume, yet it drives virtually all weather phenomena — clouds, precipitation, fog, icing, and thunderstorms. It is the atmosphere's most critical variable.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">KEY MOISTURE CONCEPTS</div>
            ${[
              ['Saturation','Maximum water vapor an air parcel can hold at a given temperature and pressure. Warm air can hold far more water vapor than cold air.','#38BDF8'],
              ['Relative Humidity (RH)','Ratio of actual water vapor to the maximum possible, expressed as a percentage. 100% RH = saturated air. RH can change without changing actual moisture content — just by changing temperature.','#F59E0B'],
              ['Dewpoint','Temperature to which air must be cooled (at constant pressure) for saturation to occur. A direct measure of actual moisture content. Dewpoint ≤ temperature always.','#10B981'],
              ['T–Td Spread','Temperature minus dewpoint. When spread ≤ 2°C, fog formation is likely. Spread = 0 means RH = 100% and saturation is occurring.','#EF4444'],
            ].map(([term,def,col])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:10px 0">
              <div style="color:${col};font-weight:800;font-size:13px;font-family:var(--font-display);margin-bottom:4px">${term}</div>
              <div style="font-size:12px;color:#94A3B8">${def}</div>
            </div>`).join('')}
          </div>
          <p><strong>Latent heat</strong> is the energy absorbed or released during water phase changes. It's invisible — the temperature doesn't change during the transition — but it is the energy that powers thunderstorms, drives tropical cyclones, and fuels icing conditions.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:16px 0">
            ${[
              ['Evaporation\n→ Vapor','Absorbs\n2,501 J/g','Cools the environment'],
              ['Condensation\n→ Liquid','Releases\n2,501 J/g','Warms the environment'],
              ['Sublimation\n→ Vapor','Absorbs\n2,834 J/g','Ice to vapor directly'],
              ['Deposition\n→ Ice','Releases\n2,834 J/g','Vapor to ice directly'],
              ['Melting\n→ Liquid','Absorbs\n334 J/g','Cools the environment'],
              ['Freezing\n→ Ice','Releases\n334 J/g','Warms the environment'],
            ].map(([trans,energy,effect])=>`
            <div style="background:white;border-radius:12px;padding:10px 8px;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,.06)">
              <div style="font-size:11px;font-weight:800;font-family:var(--font-display);color:var(--navy);white-space:pre-line;margin-bottom:4px">${trans}</div>
              <div style="font-size:10px;font-family:var(--font-mono);color:#6366F1;font-weight:700">${energy}</div>
              <div style="font-size:10px;color:#94A3B8;margin-top:2px">${effect}</div>
            </div>`).join('')}
          </div>
          <div class="danger-callout">⚡ <strong>Power of Latent Heat:</strong> An average hurricane releases energy equivalent to about 40 times total worldwide energy consumption per day — almost entirely from the latent heat of water vapor condensing into clouds and rain.</div>
        `
      },
      {
        id:'s17_3',title:'Precipitation Types — Temperature Profiles',
        content:`
          <p>The type of precipitation reaching the ground is determined almost entirely by the <strong>vertical temperature profile</strong> of the atmosphere. Understanding this is critical for forecasting icing and inflight hazards.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['❄️ Snow','Entire column below freezing from cloud base to ground. Snowflakes reach surface without melting. Flight hazard: reduced visibility, runway contamination.','#EEF2FF','#6366F1','Below 0°C throughout'],
              ['🧊 Ice Pellets (Sleet)','Snow falls into a <em>shallow warm layer aloft</em> (above freezing), partially melts, then refreezes in a <em>deep cold layer at the surface</em>. The partially-melted drops refreeze before reaching the ground. Key diagnostic: ice pellets indicate a warm layer aloft — freezing rain or rain possible at higher altitudes above.','#E0F2FE','#0284C7','Warm aloft, cold surface'],
              ['🌧️❄️ Freezing Rain (FZRA)','Snow/rain falls through a <em>deep warm layer aloft</em> and becomes rain, then falls into a <em>shallow cold layer at the surface</em>. Rain doesn\'t have time to refreeze — it hits surfaces (aircraft, roads) and freezes on contact. The MOST hazardous precipitation type for aircraft. Associated with warm fronts overrunning cold air.','#FFE4E6','#EF4444','Deep warm, shallow cold at surface'],
              ['🌧️ Rain','Deep layer of above-freezing air all the way to the surface. No icing concern in precipitation itself, though icing possible in clouds above.','#D1FAE5','#059669','Above 0°C throughout'],
              ['⛈️ Hail','Formed in thunderstorms with strong updrafts. Supercooled water freezes onto nuclei; updraft recycles hailstones through liquid water and ice, building layers. Hailstones can travel miles from parent CB. Can be encountered in clear air beneath CB anvil.','#FEF3C7','#D97706','Inside CBs with strong updrafts'],
            ].map(([type,desc,bg,col,profile])=>`
            <div style="background:${bg};border-radius:16px;padding:16px;border-left:4px solid ${col}">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px">
                <strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">${type}</strong>
                <span style="background:${col};color:white;font-size:10px;font-weight:800;padding:3px 8px;border-radius:20px;white-space:nowrap;flex-shrink:0">${profile}</span>
              </div>
              <p style="font-size:13px;color:#475569;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
          <div class="danger-callout">⚠️ <strong>Ice Pellets = Icing Warning:</strong> If you encounter ice pellets at your altitude, a warm layer exists above you, meaning freezing rain likely exists at higher altitudes. Do NOT climb in an attempt to escape ice pellets — you may fly into severe icing conditions.</div>
        `
      }
    ,
      {
        id:'s17_4',title:'Temperature Inversions & Aviation Effects',
        content:`
          <p>A temperature inversion — where temperature <em>increases</em> with altitude — is one of the most important atmospheric structures for pilots to recognize. It affects fog, turbulence, pollution trapping, and aircraft performance.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[['🌅','Surface-Based Inversion','Forms on clear nights when the ground cools rapidly by radiation. Cold dense air at the bottom, warmer air above. Results in: radiation fog, smooth air within the inversion, reduced visibility from trapped pollutants. Breaks up 2-3 hours after sunrise.','#FEF3C7','#D97706'],['✈️','Subsidence Inversion','Forms when air sinks in a high-pressure system and warms by compression aloft. Can trap moisture and pollution for days. Classic “June Gloom” marine layer in coastal California is a subsidence inversion scenario.','#E0F2FE','#0284C7'],['🌊','Frontal Inversion','Warm air overrides cold air along a warm front, creating an inversion at the frontal surface. Responsible for the classic warm front icing/IFR pattern: rain falling into sub-freezing air below the inversion.','#FEF2F2','#EF4444']].map(([icon,name,desc,bg,col])=>`<div style="background:${bg};border-radius:14px;padding:14px;border-left:4px solid ${col}"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="font-size:22px">${icon}</span><strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${name}</strong></div><p style="font-size:13px;color:#475569;margin:0">${desc}</p></div>`).join('')}
          </div>
          <div class="callout">🌡️ <strong>Inversion + Wind Shear:</strong> The top of a temperature inversion is often a sharp wind shear zone. The stable layer prevents mixing, allowing very different wind speeds and directions just feet apart. Always consider LLWS when morning soundings show low-altitude inversions.</div>
        
          <div style="background:#F0F9FF;border-radius:12px;padding:14px;margin-top:14px;border-left:3px solid #38BDF8">
            <strong style="font-family:var(--font-display);font-size:13px;color:var(--navy)">Isothermal Layer</strong>
            <p style="font-size:13px;color:#475569;margin:6px 0 0">An <strong>isothermal layer</strong> is a layer within the atmosphere where temperature remains constant with height (unlike the normal lapse rate where it decreases). When the standard lapse rate of 2°C/1,000 ft doesn’t apply, your freezing level estimate will be wrong. Isothermal layers are visible on atmospheric soundings and are significant for icing forecasts.</p>
          </div>`
      },
      {
        id:'s17_precip_types',title:'Precipitation Types & the Warm-Nose Trap',
        content:`
          <p>The precipitation type reaching the ground reveals the <strong>vertical temperature profile</strong> of the atmosphere above you — and therefore tells you exactly what icing hazard exists at altitude. This is one of the most operationally critical diagnostic skills in aviation weather.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['🌧️ Rain','Entire column above 0°C. No structural icing in the precipitation itself, though icing may exist in clouds above the freezing level.','#D1FAE5','#059669','Warm column throughout'],
              ['❄️ Snow','Entire column below 0°C. Precipitation remains frozen from cloud to surface. Hazards: reduced visibility, contaminated runways, carburetor icing on approach.','#EEF2FF','#6366F1','Cold column throughout'],
              ['🌧️❄️ Freezing Rain (FZRA)','Rain falls from a deep warm layer aloft through a shallow sub-freezing layer at the surface. Drops remain supercooled and freeze instantly on contact with aircraft surfaces. The most dangerous precipitation icing scenario — associated with warm fronts overrunning cold surface air.','#FFE4E6','#EF4444','Deep warm aloft — shallow cold at surface'],
              ['🧊 Ice Pellets (PL)','Snow melts in a warm layer aloft then refreezes in a deep cold layer before reaching the surface. Key diagnostic: ice pellets confirm a warm layer exists above — freezing rain is likely at higher altitudes above you.','#E0F2FE','#0284C7','Warm layer aloft — deep cold near surface'],
              ['🌦️ Freezing Drizzle (FZDZ)','Small drops form in a shallow cold fog or cloud layer. Similar to freezing rain but smaller drop size — still SLD-capable. Common on approach in freezing fog conditions.','#FEF3C7','#D97706','At or below 0°C at surface'],
              ['⛈️ Hail','CB updrafts loft supercooled water and ice through the freezing level repeatedly, building concentric ice layers. Can fall miles from the parent cell in clear air beneath the anvil. Structural damage risk.','#F5F3FF','#7C3AED','Convective — inside and below CBs'],
            ].map(([type,desc,bg,col,profile])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;border-left:4px solid ${col}">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:6px;flex-wrap:wrap">
                <strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${type}</strong>
                <span style="background:${col};color:white;font-size:10px;font-weight:800;padding:3px 8px;border-radius:20px;white-space:nowrap;flex-shrink:0">${profile}</span>
              </div>
              <p style="font-size:13px;color:#475569;margin:0">${desc}</p>
            </div>`).join('')}
          </div>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">THE WARM-NOSE TEMPERATURE PROFILE</div>
            <p style="font-size:13px;color:#94A3B8;margin:0 0 12px">A warm nose is an above-freezing layer sandwiched between two below-freezing layers — the most treacherous icing structural hazard:</p>
            ${[
              ['Surface (0–1,500 ft)','Below 0°C — ice pellets or freezing rain reach the ground here','#EF4444'],
              ['Warm Nose (2,000–8,000 ft)','Above 0°C — snow from above melts into rain in this layer. THIS IS THE SLD ZONE — supercooled large drops form here, too big for standard de-ice boots','#F59E0B'],
              ['Above the Warm Nose','Below 0°C — snow above the inversion, melting as it descends through the warm nose','#38BDF8'],
            ].map(([layer,desc,col])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;display:grid;grid-template-columns:1.2fr 1.8fr;gap:8px">
              <span style="color:${col};font-size:12px;font-weight:700;font-family:var(--font-display)">${layer}</span>
              <span style="font-size:12px;color:#94A3B8">${desc}</span>
            </div>`).join('')}
          </div>
          <div class="fact-box">
            <span style="font-size:28px">🌡️</span>
            <div><strong>Surface Precip Diagnostic Shortcut — what the surface report tells you about the profile above:</strong>
              <div style="display:grid;gap:6px;margin-top:8px">
                ${[
                  ['Rain at surface','Column above 0°C — no structural icing from precipitation in the warm layer'],
                  ['Snow at surface','Column below 0°C — cold throughout, icing possible in clouds only'],
                  ['Ice pellets at surface','Warm nose EXISTS above — freezing rain (SLD) likely at some altitude above you'],
                  ['Freezing rain at surface','You are below the warm nose — SLD icing directly above in the warm layer'],
                ].map(([sig,meaning])=>`
                <div style="display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap">
                  <span class="data-tag">${sig}</span>
                  <span style="font-size:12px;color:#475569">${meaning}</span>
                </div>`).join('')}
              </div>
            </div>
          </div>
          <div class="danger-callout">🧊 <strong>Ice pellets at the surface = warm nose aloft = SLD icing exists somewhere above you.</strong> Non-ice-certificated aircraft: no-go. If airborne and encountering ice pellets, do not climb — you may enter severe SLD icing conditions in the warm layer above.</div>
          <div class="callout">📋 <strong>SLD — Supercooled Large Drops:</strong> Freezing rain produces drops large enough to overwhelm standard de-ice boot systems, running back past the boot and freezing on unprotected airfoil surfaces. SLD icing is a separate certification category under <strong>14 CFR Part 25 Appendix O</strong>. An aircraft approved only for standard icing conditions (Appendix C) is NOT approved for SLD flight. FAA Ref: Ch. 14, Ch. 20</div>
        `
      }],
    quiz:[
      {id:'q_m17_1',type:'mc',question:'Freezing rain is most commonly associated with:',options:['Cold fronts — steep slope lifts air rapidly','An unstable air mass with strong convective updrafts','Warm fronts — warm air overriding a shallow cold surface layer creates a temperature inversion','Orographic lifting — air rises over terrain and cools'],correct:2,xp:10,explanation:'Freezing rain requires a temperature inversion: a deep above-freezing layer aloft with a shallow below-freezing layer at the surface. This classic setup occurs when warm air overrides a retreating cold air mass along a warm front. The rain falls from the warm layer, passes through the thin cold layer, and freezes on contact with surfaces.',faaRef:'Ch. 14',concept:'heat_moisture'},
      {id:'q_m17_2',type:'mc',question:'You are in cruise flight and encounter ice pellets. What does this indicate about conditions at higher altitudes?',options:['Conditions are likely clearer and warmer above — climb to escape','Ice pellets indicate a warm layer exists aloft — freezing rain is likely at higher altitudes. Do not climb.','Ice pellets are harmless and indicate stable conditions throughout','The warm layer is below you — descend to escape the ice'],correct:1,xp:15,explanation:'Ice pellets form when snow falls through a shallow warm layer aloft and partially melts, then refreezes before reaching the surface. Encountering ice pellets is a warning that a warm (above-freezing) layer exists above you — potentially with freezing rain conditions. Climbing to "escape" ice pellets can put you into severe freezing rain. The safe action is to descend below the cold layer or divert.',faaRef:'Ch. 14',concept:'structural_icing'},
      {id:'q_m17_3',type:'mc',question:'Which heat transfer mechanism is MOST responsible for transporting heat from the Earth\'s surface into the troposphere?',options:['Radiation — long-wave infrared energy from the warm surface','Conduction — direct contact between ground and air molecules','Convection — rising thermals and convective currents transport heat upward','Advection — horizontal winds carry warm surface air aloft'],correct:2,xp:10,explanation:'Air is a poor thermal conductor, so conduction only heats a very shallow surface layer. Radiation transfers energy but not effectively through air. Convection — the rising of warm, less-dense air and sinking of cool, dense air — is the primary mechanism for transferring heat from the surface into the troposphere. This is why thermals, cumulus clouds, and thunderstorms are all products of convective heating.',faaRef:'Ch. 5',concept:'heat_moisture'},
      {id:'q_m17_4',type:'timed',timeLimit:10,question:'When T–Td spread is 2°C, what does this indicate?',options:['Conditions are too dry for fog formation','Air is near saturation — fog or low cloud formation is likely','Icing is imminent at all altitudes','Precipitation is occurring'],correct:1,xp:15,explanation:'T–Td spread (temperature minus dewpoint) is a direct measure of how close the air is to saturation. When spread is ≤ 2°C, RH is approximately 89%+ — very near saturation. Fog, low clouds, or drizzle are likely. When spread = 0, RH = 100% and saturation is occurring. This is why METAR T/Td groups are critical — a spread of 18°C and a spread of 2°C are completely different weather situations.',faaRef:'Ch. 6',concept:'heat_moisture'},
      {id:'q_m17_5',type:'mc',question:'Water has a much higher specific heat capacity than land. The PRIMARY aviation consequence of this is:',options:['Water surfaces produce more radiation fog','Coastal and maritime areas have smaller diurnal and seasonal temperature variations — and thus less convective activity','Water surfaces cause stronger pressure gradients','Maritime air masses are always colder than continental air masses'],correct:1,xp:10,explanation:'High specific heat capacity means water resists temperature changes. Water heats and cools more slowly than land. This moderates temperature near coastlines — resulting in smaller daily and seasonal temperature swings (less diurnal variation). Less temperature variation means weaker sea breezes, less afternoon convection, and milder flying conditions compared to inland continental areas with large diurnal temperature swings.',faaRef:'Ch. 5',concept:'heat_moisture'},
      {id:'q_m17_6',type:'mc',question:'Hail is most commonly found under which part of a thunderstorm?',options:['On the upwind side — where the storm is intensifying','Within and below the anvil — hailstones can travel miles from the parent CB in clear air','Only inside the main precipitation shaft — never in clear air','In the dissipating stage only — when updrafts weaken'],correct:1,xp:10,explanation:'Hailstones travel outward from the CB with the storm\'s upper-level outflow and can fall in clear air miles from the parent thunderstorm — especially under and beyond the anvil. This is why the standard avoidance guidance says to avoid ALL cumulonimbus by 20 NM, and to avoid areas beneath anvil clouds even when skies appear clear.',faaRef:'Ch. 14',concept:'thunderstorm_hazards'}
    ,
      {id:'q_m17_7',type:'scenario',scenario:'Landing KJQF at 0700L. METAR: OVC003 14/13. Forecast high 28°C with clear afternoon skies. KJQF elevation 705 ft MSL.',question:'What type of inversion is causing these conditions and what should you expect?',options:['Frontal inversion — conditions will worsen all day as the warm front approaches','Surface-based radiation inversion — likely to clear 2-3 hours after sunrise, but verify with updated METARs','Subsidence inversion — will persist all day requiring an IFR alternate','Marine layer — will require sea breeze to dissipate'],correct:1,xp:20,explanation:'A 14/13 T/Td spread (1°C) with OVC003 at 0700L before a warm clear day is a classic surface-based radiation inversion/fog scenario. Overnight radiational cooling saturated the surface layer. These typically clear 2-3 hours after sunrise as solar heating mixes the stable layer. However — if overcast prevents solar heating, it may persist longer. Always verify with an updated METAR before departing.',faaRef:'Ch. 5, 18'}
    ,
      {id:'q_m17_8',type:'mc',question:'Why does temperature typically decrease with altitude in the troposphere?',options:['The Sun heats the upper atmosphere directly, so heat decreases downward','The Earth’s surface is the primary heat source — it absorbs solar radiation, warms the air above by conduction and convection, so temperature decreases with distance from the surface','Pressure decreasing with altitude causes temperature to decrease proportionally','Humidity decreasing with altitude causes a cooling effect'],correct:1,xp:10,explanation:'The troposphere is heated from below — the Earth’s surface absorbs solar radiation and transfers heat upward through conduction, convection, and radiation. Temperature therefore decreases with altitude (the lapse rate) because heat is dissipating further from its source. This contrasts with the stratosphere, where ozone absorbs UV radiation and temperature increases with altitude — which is why the tropopause is a temperature inversion that limits convective development.',faaRef:'Ch. 5',concept:'standard_atmosphere'},
      {id:'q_m17_9',type:'mc',question:'Relative humidity can reach 100% without any water vapor being added to the air. How?',options:['Relative humidity cannot reach 100% without adding moisture — it requires precipitation','Cooling the air reduces its capacity to hold water vapor. If cooled to the dewpoint, RH reaches 100% even with the same actual water vapor content.','Increasing altitude always causes RH to reach 100%','Only occurs during frontal passages when two air masses mix'],correct:1,xp:10,explanation:'Relative humidity measures how close air is to saturation relative to its current capacity. Since warm air can hold more water vapor than cold air, cooling air at constant moisture content reduces capacity, raising RH. Cool air enough to the dewpoint and RH reaches 100% — without adding any moisture. This is why radiation fog, dew, and frost form at night (cooling) without any added moisture. This is also why cloud bases form at the LCL where rising air cools to its dewpoint.',faaRef:'Ch. 6',concept:'heat_moisture'},
      {id:'q_m17_10',type:'scenario',scenario:'KJQF surface: T=28°C, Td=22°C. You are planning an afternoon cross-country to KAVL. The forecast shows afternoon heating to 32°C.',question:'What does this moisture data tell you about potential afternoon convection?',options:['T-Td spread of 6°C means conditions are too dry for convection','LCL ≈ (28-22)×400 = 2,400 ft AGL. With additional heating to 32°C and Td=22°C: LCL ≈ (32-22)×400 = 4,000 ft AGL. Sufficient moisture for afternoon convection — expect cumulus development, possible afternoon thunderstorms.','Surface dewpoint only matters for fog forecasting, not convection','A T-Td spread of 6°C means thunderstorms are certain this afternoon'],correct:1,xp:20,explanation:'A surface Td of 22°C (about 72°F) is quite high — humid air. Estimated LCL from 2,400-4,000 ft AGL indicates cloud bases will be relatively low. Combined with afternoon heating, unstable air mass (typical SE summer), and orographic lift from the Appalachians near KAVL, afternoon convective development is probable. Depart early (before noon) when possible, monitor convective SIGMETs and METARs en route, and have a divert plan for KAVL if afternoon thunderstorms develop.',faaRef:'Ch. 6, 7'},
      {id:'q_m17_11',type:'timed',timeLimit:10,question:'Latent heat release during condensation is significant for thunderstorm development because:',options:['Condensation cools the surrounding air, making the updraft buoyant','Condensation releases heat into the rising air column, warming it further, increasing buoyancy and updraft velocity — it is the energy engine of convective storms','Latent heat prevents ice from forming in thunderstorms','Latent heat only affects tropical storm development, not mid-latitude convection'],correct:1,xp:10,explanation:'When water vapor condenses into liquid (cloud droplets), it releases 2,501 J/g of latent heat INTO the surrounding air. This warming effect makes the rising air even warmer than the surrounding environment, increasing buoyancy and updraft velocity — a positive feedback loop. The higher the moisture content, the more latent heat released per unit of lift, and the more explosive the convective development. This is why high dewpoints (moist air) are one of the three ingredients for thunderstorm formation.',faaRef:'Ch. 6, 22',concept:'heat_moisture'},
      {id:'q_m17_12',type:'mc',question:'Freezing rain requires which specific temperature profile?',options:['Temperature must be below 0°C from cloud base to ground with a brief warm spike','A temperature inversion: deep layer of above-freezing air aloft, shallow layer of below-freezing air at the surface. Rain falls from warm layer, enters cold layer but doesn’t have time to refreeze before hitting surfaces.','Temperature below 0°C throughout the entire column from cloud to ground','Temperature above 0°C throughout with a brief cold spike near the surface'],correct:1,xp:10,explanation:'Freezing rain requires the warm nose inversion: above-freezing temperatures aloft (where precipitation forms as rain or snow melts) with sub-freezing temperatures in a shallow layer at the surface. Rain falls through the warm layer, enters the cold layer, and reaches the surface as a supercooled liquid that freezes on contact. The shallow cold layer means the rain doesn’t have time to refreeze into ice pellets before hitting the ground. This pattern is classic for warm front overrunning cold air.',faaRef:'Ch. 14',concept:'structural_icing'}
    ]
  },

  // ============================================================
  // M18: TROPICAL & ARCTIC WEATHER (Ch. 17, 21)
  // ============================================================
  {
    id:'m18',act:2,title:'Tropical & Arctic Weather',subtitle:'ITCZ, tropical cyclones, Arctic hazards & whiteout',
    icon:'🌏',color:'#0891B2',bgColor:'#ECFEFF',prerequisites:['m1','m5','m6'],
    xpReward:200,estimatedMin:16,faaRef:'FAA-H-8083-28A Chapters 17, 21',
    sections:[
      {
        id:'s18_1',title:'Tropical Circulation & ITCZ',
        content:`
          <p>The tropics extend between 23.5°N and 23.5°S, but tropical weather patterns can influence flight operations as far as 45° from the equator. Rather than "uniformly rainy," the tropics contain both the wettest and driest regions on Earth.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">TROPICAL CIRCULATION SYSTEMS</div>
            ${[
              ['☀️ Subtropical High-Pressure Belts (~30°N/S)','Sinking, subsiding air — strong temperature inversions. West coast of continents: stable, dry, persistent fog/low stratus (California "June Gloom"). East coast: inversion weakest — convection possible, showers and thunderstorms.','#38BDF8'],
              ['💨 Trade Wind Belts','Steady NE trades (NH) and SE trades (SH) blowing from subtropical highs toward equator. Trade wind inversion — strongest on offshore side, weakest on onshore side. Generally good flying but watch for active weather on windward sides of mountains.','#F59E0B'],
              ['⬆️ ITCZ — Intertropical Convergence Zone','Band where NE and SE trades converge. Forced uplift produces showers and CBs encircling the globe near the equator. Tops to 40,000 ft. Copious rainfall. Flying through ITCZ: avoid CBs as usual. Cloud tops significantly higher than surrounding clouds mark island positions.','#10B981'],
              ['🌧️ Monsoon','Large-scale seasonal wind reversal over Asia, Australia, Africa, and South America. Summer: moist onshore flow → abundant rainfall. Winter: dry offshore flow. Freezing level in tropics is high (~14,000 ft) — icing is mostly a high-altitude concern.','#A78BFA'],
            ].map(([name,desc,col])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:10px 0">
              <div style="color:${col};font-weight:800;font-size:13px;font-family:var(--font-display);margin-bottom:4px">${name}</div>
              <div style="font-size:12px;color:#94A3B8;line-height:1.5">${desc}</div>
            </div>`).join('')}
          </div>
        `
      },
      {
        id:'s18_2',title:'Tropical Cyclones — Classification',
        content:`
          <p>A <strong>tropical cyclone</strong> is any low-pressure system originating over tropical oceans. They are classified by intensity. In the North Atlantic and NE Pacific:</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['🌀','Tropical Depression','Sustained winds up to 34 kt (39 mph). Organized circulation, closed isobars. No eye. Significant rain and thunderstorms.','#94A3B8','#F8FAFC'],
              ['🌀','Tropical Storm','35–64 kt (40–73 mph). Named storms. Significant weather hazard — avoid by wide margins.','#38BDF8','#E0F2FE'],
              ['🌀','Hurricane','65+ kt (74+ mph). Category 1–5 on the Saffir-Simpson scale. Cat 5 = 137+ kt. Extreme hazard — avoid entirely.','#EF4444','#FEF2F2'],
            ].map(([icon,name,desc,col,bg])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;border-left:4px solid ${col};display:flex;gap:12px">
              <span style="font-size:28px;flex-shrink:0">${icon}</span>
              <div><strong style="font-family:var(--font-display);font-size:15px;color:var(--navy)">${name}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p></div>
            </div>`).join('')}
          </div>
          <p><strong>Tropical waves</strong> (easterly waves) are common disturbances in the trade wind belt that move from east to west. They are preceded by excellent weather but followed by extensive cloudiness, rain, and thunderstorms. A tall cumulus marking the wave's position can indicate land — useful if you need to ditch in the ocean.</p>
          <div class="callout">🌍 <strong>Terminology by Region:</strong> North Atlantic/NE Pacific = Hurricane. NW Pacific = Typhoon. Indian Ocean = Cyclone. Same phenomenon, different names. NHC (Miami) and CPHC (Honolulu) are the responsible centers for US areas.</div>
          <div class="fact-box">
            <span style="font-size:28px">💡</span>
            <div><strong>Survival tip:</strong> If ditching over tropical ocean, look for an unusually tall cumulus cloud — it almost certainly marks a land surface (island), increasing your chances of survival. Islands force orographic lift, building higher clouds than the surrounding ocean-influenced convection.</div>
          </div>
        `
      },
      {
        id:'s18_3',title:'Arctic Weather Hazards',
        content:`
          <p>Arctic aviation presents a unique set of hazards that differ significantly from mid-latitude operations. Alaska pilots and polar-route crews face conditions with no equivalent elsewhere.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['🌫️','Ice Fog','Forms at temperatures below -30°C when water vapor freezes directly into suspended ice crystals. Almost always present below -45°C near sources of moisture or combustion (aircraft engines, vehicles, buildings). Reduces visibility drastically. Unlike water-droplet fog, does not "burn off" with morning heating.','#E0F2FE','#0284C7'],
              ['❄️','Blowing & Drifting Snow','Arctic snow is extremely fine and dry — picked up by light winds and raised several feet off the ground. Unlimited visibility can drop to near-zero in minutes with no warning. Especially common over the Arctic Ocean and coastal areas in autumn/winter.','#EEF2FF','#6366F1'],
              ['👁️','Whiteout','Occurs when overcast clouds overly a snow/ice-covered surface. Light is diffused in all directions — shadows disappear, horizon vanishes, depth perception is lost. Buildings and people appear to float. Common in spring and autumn. Disorienting for VFR pilots — can lead to controlled flight into terrain.','#F5F3FF','#7C3AED'],
              ['🌡️','Temperature Inversion Effects','Strong low-level inversions trap pollutants and moisture, creating persistent haze/smog. Light rays bent at low angles through inversions create "looming" mirages — objects beyond the horizon appear above it. The Sun may appear as an oval. Mountains can appear in unexpected locations.','#FEF3C7','#D97706'],
              ['🌨️','Frost','Thin ice crystals form on surfaces below 0°C. Critical for pilots: frost on wings must be removed before flight — even a thin layer disrupts airflow and reduces lift. Unlike most icing, frost forms on the ground before departure, not during flight.','#FFE4E6','#EF4444'],
            ].map(([icon,type,desc,bg,col])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;display:flex;gap:12px">
              <span style="font-size:26px;flex-shrink:0">${icon}</span>
              <div><strong style="font-family:var(--font-display);font-size:14px;color:${col}">${type}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p></div>
            </div>`).join('')}
          </div>
          <div class="callout">🌅 <strong>Arctic Illumination:</strong> Above the Arctic Circle, summer days have 24-hour sunlight; winter days have 24-hour darkness. Even at night, moonlight, starlight, and aurora are intense enough for visual reference. Twilight is prolonged due to the shallow angle of the Sun. Polar nights are not as dark as one might expect.</div>
        `
      }
    ,
      {
        id:'s18_4',title:'Arctic Operations Checklist',
        content:`
          <p>Arctic operations demand a fundamentally different approach. Many standard mid-latitude assumptions break down above 60°N.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">ARCTIC HAZARDS CHECKLIST</div>
            ${[['Carburetor/Induction Icing','Extremely cold moist air = constant carb ice risk. Use carb heat continuously at low power settings.'],['Frost on Aircraft Surfaces','Forms in minutes when a cold-soaked aircraft moves into warmer humid air. Remove completely before every takeoff.'],['Whiteout Conditions','Overcast + snow-covered terrain = no horizon, no depth perception. IFR required.'],['Magnetic Compass Unreliability','Near the Magnetic Pole, compass swings wildly. Use GPS heading or DG reset frequently.'],['Limited Weather Data','Sparse METARs in remote Arctic. PIREPs and AAWU (Anchorage) products are critical.'],['Polar Lows','Small intense lows form rapidly over open water in winter. Can produce severe weather with little warning.']].map(([h,a])=>`<div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0"><div style="color:#38BDF8;font-weight:700;font-size:12px;margin-bottom:3px">${h}</div><div style="color:#94A3B8;font-size:11px">${a}</div></div>`).join('')}
          </div>
          <p>The <strong>AAWU (Alaska Aviation Weather Unit)</strong> in Anchorage provides Alaska-specific AIRMETs, SIGMETs, and graphical forecasts for the Anchorage FIR. Always consult AAWU products for any Alaska or polar operation.</p>
        `
      }],
    quiz:[
      {id:'q_m18_1',type:'mc',question:'The Intertropical Convergence Zone (ITCZ) forms because:',options:['Cold air from both poles meets at the equator','Northeast and southeast trade winds converge near the equator, forcing air upward','Subtropical high-pressure belts produce subsidence near the equator','The equatorial low-pressure belt prevents convective development'],correct:1,xp:10,explanation:'The ITCZ forms where the northeast trade winds of the Northern Hemisphere converge with the southeast trade winds of the Southern Hemisphere. This convergence forces air upward, producing a nearly continuous band of showers and thunderstorms circling the globe near the equator. Cloud tops can exceed 40,000 ft.',faaRef:'Ch. 17',concept:'air_masses'},
      {id:'q_m18_2',type:'mc',question:'A pilot ditching in the open Pacific tropics should look for:',options:['Low stratus clouds — they mark deep ocean water','A cumulus cloud taller than surrounding clouds — it likely marks an island','The ITCZ — the convergence zone always creates near-shore weather','A clear area — absence of clouds indicates land is nearby'],correct:1,xp:10,explanation:'Islands in the tropical ocean cause orographic lift that forces air to rise and build taller cumulus clouds than the surrounding oceanic convection. "A cumulus top higher than the average top of surrounding cumulus usually marks the approximate location of an island" (FAA-H-8083-28A). Any land surface dramatically increases survival chances after ditching.',faaRef:'Ch. 17'},
      {id:'q_m18_3',type:'mc',question:'Ice fog is most likely when temperature is:',options:['Near 0°C with high humidity and calm winds','-10°C to -20°C — the prime freezing fog range','Below -30°C, especially near sources of water vapor or combustion','Above 0°C near large bodies of open water'],correct:2,xp:10,explanation:'Ice fog requires very low temperatures — it is rare above -30°C and becomes increasingly frequent as temperature drops below that threshold. It forms when water vapor freezes directly into suspended ice crystals and is almost always present at -45°C near sources of moisture (open water, aircraft engines, buildings). Unlike regular fog, it does not burn off with daytime heating.',faaRef:'Ch. 21',concept:'fog_types'},
      {id:'q_m18_4',type:'timed',timeLimit:10,question:'Whiteout conditions are most dangerous for VFR pilots because:',options:['Visibility drops below 1/4 SM in snow','All shadows disappear and the horizon vanishes — loss of depth perception creates CFIT risk','Icing accumulates on all aircraft surfaces during whiteout','Radio communications are blocked by blowing snow'],correct:1,xp:15,explanation:'Whiteout eliminates shadows and the horizon by diffusing light in all directions between overcast clouds and a snow/ice-covered surface. Pilots lose spatial orientation and depth perception — buildings and terrain features appear to float. The result is a loss of the visual cues needed for VFR flight and a serious risk of controlled flight into terrain (CFIT). Always fly IFR if whiteout is possible.',faaRef:'Ch. 21',concept:'fog_types'},
      {id:'q_m18_5',type:'mc',question:'A tropical cyclone is classified as a Hurricane when sustained winds reach:',options:['At least 34 kt','35–64 kt','65 kt (approximately 74 mph) or more','100 kt or more — below this is "tropical storm"'],correct:2,xp:10,explanation:'Tropical cyclone classification: Tropical Depression = up to 34 kt; Tropical Storm = 35–64 kt; Hurricane = 65 kt (74 mph) or more. The NHC uses 1-minute average wind speeds for this classification. Category 5 hurricanes (Saffir-Simpson scale) have sustained winds of 137+ kt.',faaRef:'Ch. 17',concept:'air_masses'},
      {id:'q_m18_6',type:'scenario',scenario:'During a ground preflight in Alaska at -35°C, you notice a thin layer of frost covering both wings. The METAR shows clear skies, winds calm, temp -35/DP -37.',question:'What is the correct action before departure?',options:['Frost can be left on — it will sublimate quickly once airborne at these temperatures','Reduced performance is acceptable for a short-duration flight in calm conditions','All frost must be removed — even a thin layer disrupts airflow and can reduce lift enough to prevent safe takeoff or cause loss of control','Frost only matters on turbine aircraft — light aircraft can depart with frost on wings'],correct:2,xp:20,explanation:'Frost must ALWAYS be removed before flight regardless of aircraft type or mission. Even a thin coating of frost disrupts the smooth airflow over the wing, reduces lift, increases drag, and can cause premature stall. The FAA requires aircraft surfaces to be clean of frost, ice, and snow before takeoff. The thin film of frost that looks harmless is enough to cause a catastrophic accident.',faaRef:'Ch. 21'}
    ,
      {id:'q_m18_7',type:'mc',question:'In Arctic operations near the Magnetic North Pole, why does the magnetic compass become unreliable?',options:['Cold temperatures cause compass fluid to freeze and the card to stick','The lines of magnetic force converge nearly vertically near the pole, causing large rapid compass swings that make it unusable','Auroral activity creates electromagnetic interference','The Earth’s magnetic field is too weak near the pole to align the compass'],correct:1,xp:10,explanation:'Near the geographic and magnetic North Pole, magnetic field lines are nearly vertical rather than horizontal. This causes the compass card to swing wildly and become useless for navigation. Pilots must rely on GPS (true heading) or a directional gyro (DG) aligned to a GPS-verified heading. This is a fundamental limitation — not a cold-weather equipment failure.',faaRef:'Ch. 21'}
    ,
      {id:'q_m18_8',type:'mc',question:'The trade wind inversion is strongest and lowest on which side of a subtropical high?',options:['On the equatorial side where ITCZ convection breaks it down','On the east side of the high over west coasts of continents — where stable subsiding air overrides cool upwelling ocean water, creating persistent low ceilings and fog','On the poleward side where cold air intrusions reinforce it','On the western side over east coasts of continents'],correct:1,xp:10,explanation:'The trade wind inversion is most pronounced where the subtropical high’s east side overlies west coasts of continents. Here, cool ocean upwelling (e.g., California Current, Canary Current) keeps the marine layer cold while warm subsiding air creates a strong inversion above. This produces the classic "June Gloom" persistent low stratus and fog of coastal California, the Canary Islands, and similar locations. The inversion is weakest where trade winds blow onto east coasts of continents.',faaRef:'Ch. 17',concept:'air_masses'},
      {id:'q_m18_9',type:'mc',question:'Flying through the ITCZ, the primary strategy for a safe crossing is:',options:['Fly at high altitude (above FL400) where most ITCZ activity is below you','Treat ITCZ like any convective environment — avoid individual CB cells by at least 20 NM and navigate between cells using radar and satellite imagery','Cross at night when convection subsides','Fly low (below 3,000 ft) under the convective clouds where the air is more stable'],correct:1,xp:10,explanation:'The ITCZ presents as a band of convective activity (showers and CBs) encircling the globe near the equator. Tops can exceed 40,000 ft — you cannot fly over it in any GA aircraft. The standard approach is to navigate around/between the CB cells just as you would in any convective environment: use onboard weather radar, satellite imagery, and PIREPs to identify gaps. The ITCZ is often broken into segments with clear areas between them. Flying through it usually presents no great problem if standard CB avoidance practices are followed.',faaRef:'Ch. 17'},
      {id:'q_m18_10',type:'scenario',scenario:'You are planning a fall flight from Florida to the Bahamas. A tropical wave is located 200 miles south of Cuba and moving WNW at 15 kt. The NHC has issued a tropical weather outlook stating 20% chance of tropical cyclone development in 48 hours.',question:'What resources and decisions apply to this flight?',options:['20% probability is too low to affect flight planning — proceed normally','Check NHC tropical weather outlooks and track forecasts. 20% in 48 hours is a planning consideration. Get a thorough standard briefing including TCA (Tropical Cyclone Advisory) if issued. Have a divert plan. If probability increases, reconsider the trip timing.','Tropical weather only affects aircraft above FL250 — VFR flights at 7,500 ft are unaffected','Cancel immediately — any tropical activity within 500 miles requires flight cancellation'],correct:1,xp:20,explanation:'20% development probability within 48 hours warrants monitoring and planning. NHC tropical outlooks are updated every 6 hours and development probability can change rapidly. Key actions: (1) Check aviationweather.gov for any TCA (Tropical Cyclone Advisory) that may be issued, (2) get a standard briefing that includes tropical outlook, (3) have divert airports identified in case conditions deteriorate, (4) monitor the NHC website continuously. If probability rises above 60% or a tropical cyclone forms, delay the trip.',faaRef:'Ch. 17, 26'},
      {id:'q_m18_11',type:'mc',question:'Polar lows are particularly hazardous because:',options:['They are large slow-moving systems that give ample warning time','They develop rapidly (sometimes within hours) over open water, produce severe weather, and can be poorly forecast due to limited observational data in remote areas','They only produce light snow and are primarily an icing hazard','Polar lows are a synonym for Arctic air masses'],correct:1,xp:10,explanation:'Polar lows are small, intense low-pressure systems that form over relatively warm open ocean waters when very cold Arctic air flows offshore. They can develop to severe intensity within hours — much faster than typical mid-latitude cyclones — and produce hurricane-force winds, heavy snow, and severe turbulence. The remote areas where they form (Arctic Ocean, Norwegian Sea, etc.) have sparse surface observations, making them difficult to forecast accurately. They are a significant hazard for polar route operations.',faaRef:'Ch. 21',concept:'air_masses'},
      {id:'q_m18_12',type:'mc',question:'A pilot flying in the Caribbean in August encounters a "tropical wave" passing overhead. What weather pattern should they expect?',options:['Excellent flying conditions throughout — tropical waves are areas of stable, benign weather','Good weather ahead of the wave; then as the wave passes, expect a shift from northeasterly to southeasterly winds, extensive cloudiness, rain showers, and possible thunderstorms','Continuous severe thunderstorm activity throughout the day','The tropical wave will quickly develop into a hurricane'],correct:1,xp:10,explanation:'Tropical waves (easterly waves) move from east to west. Ahead of the wave: slightly more northerly trades, generally good weather. At and behind the wave: wind shifts to the southeast, extensive cloudiness develops, showers and occasional thunderstorms. The disturbed weather can cover a large north-south area. Most tropical waves do NOT develop into tropical cyclones, but they should be treated as convective weather and standard CB avoidance applied. They are more frequent and stronger in summer and early fall.',faaRef:'Ch. 17',concept:'air_masses'}
    ]
  },

  // ============================================================
  // M19: SPACE WEATHER & ANALYSIS CHARTS (Ch. 23, 25)
  // ============================================================
  {
    id:'m19',act:3,title:'Space Weather & Analysis Charts',subtitle:'Solar events, GPS disruption, surface analysis & skew-T',
    icon:'🛰️',color:'#7C3AED',bgColor:'#F5F3FF',prerequisites:['m1','m3'],
    xpReward:200,estimatedMin:18,faaRef:'FAA-H-8083-28A Chapters 23, 25',
    sections:[
      {
        id:'s19_1',title:'Space Weather — Effects on Aviation',
        content:`
          <p><strong>Space weather</strong> refers to conditions on the Sun and in the Earth's magnetosphere that can affect aviation operations. For most GA pilots this is mainly an awareness topic, while for polar, oceanic, and high-latitude operators it can become operationally significant.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['☀️','Solar Flares','Sudden intense bursts of electromagnetic radiation (X-rays, UV, radio). Travel at the speed of light — affect Earth in ~8 minutes. Can cause HF radio blackouts on the sunlit side of Earth for minutes to hours. High-frequency (3–30 MHz) communications used for oceanic/polar flights are most affected.','#FEF3C7','#D97706'],
              ['💨','Coronal Mass Ejections (CME)','Large eruptions of plasma and magnetic field from the Sun. Travel to Earth in 1–4 days. Cause geomagnetic storms when they arrive. Effects: GPS degradation, HF radio disruption, increased radiation exposure on polar routes, auroras.','#FFE4E6','#EF4444'],
              ['🛰️','GPS / Navigation Disruption','Ionospheric storms from space weather cause GPS signal scintillation and position errors. Effects are often most important at high latitudes and on advanced operations that rely heavily on satellite navigation. WAAS-dependent approaches can become unavailable during stronger events.','#E0F2FE','#0284C7'],
              ['☢️','Radiation Exposure','Solar radiation storms increase radiation dose at altitude. Most significant on polar routes above FL300 where less atmospheric shielding exists. SWPC issues Space Weather Advisories with dose rate information. Airlines may reroute to lower latitudes or altitudes during strong events.','#D1FAE5','#059669'],
            ].map(([icon,type,desc,bg,col])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;border-left:4px solid ${col};display:flex;gap:12px">
              <span style="font-size:24px;flex-shrink:0">${icon}</span>
              <div><strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${type}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p></div>
            </div>`).join('')}
          </div>
          <div class="callout">💡 <strong>Space Weather Advisory:</strong> The SWPC (Boulder, CO) issues Space Weather Advisories as part of the ICAO advisory system. They describe the storm type and expected effects on communications, navigation, and radiation. For many GA pilots this is background awareness, but it becomes more operationally important in polar, oceanic, and high-altitude flying.</div>
          <div class="fact-box">
            <span style="font-size:28px">🌞</span>
            <div><strong>Solar Cycle:</strong> Sunspot activity follows an 11-year cycle. Space weather events (flares, CMEs) are most frequent near solar maximum. Even during solar minimum, rare but powerful events can occur. The Space Weather Prediction Center monitors 24/7 and issues forecasts like standard weather forecasts.</div>
          </div>
        `
      },
      {
        id:'s19_2',title:'Surface Analysis Charts — Reading the Map',
        content:`
          <p>The <strong>surface analysis chart</strong> is the foundational weather map — it shows the distribution of sea-level pressure, fronts, pressure centers, and surface boundaries at a specific time.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">SURFACE CHART ELEMENTS</div>
            ${[
              ['Isobars','Lines connecting points of equal sea-level pressure. Standard NWS interval: 4 mb. Closely-spaced isobars = strong pressure gradient = strong winds. Widely-spaced = light winds.','#38BDF8'],
              ['H/L Centers','H = anticyclone (high pressure, clockwise outflow NH). L = cyclone (low pressure, counterclockwise inflow NH). Central pressure labeled in mb.','#F59E0B'],
              ['Trough','Elongated area of low pressure. No closed isobars. Convergent flow — associated with clouds, precip, and possible severe weather development.','#EF4444'],
              ['Ridge','Elongated area of high pressure. No closed isobars. Generally fair weather, but downstream trough often indicates deteriorating conditions.','#10B981'],
              ['Dryline','Boundary between dry and moist air in the Southern Plains. Not a true front — similar temperatures on both sides. Powerful trigger for severe thunderstorms, especially in spring.','#F97316'],
            ].map(([term,def,col])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0">
              <div style="color:${col};font-weight:800;font-size:13px;font-family:var(--font-display);margin-bottom:3px">${term}</div>
              <div style="font-size:12px;color:#94A3B8">${def}</div>
            </div>`).join('')}
          </div>
          <p>The WPC issues surface analysis charts 8 times daily (every 3 hours). Station models on the chart show sky cover, temperature, dewpoint, wind direction/speed, and sea-level pressure for individual observation stations. The chart is the best single product for understanding the large-scale weather pattern driving your flight.</p>
          <div class="callout">📊 <strong>Isopleths Quick Reference:</strong> Isobar (pressure) · Isotherm (temperature) · Isotach (wind speed) · Isohume (humidity) · Contour/Isoheight (height above MSL on constant-pressure charts). All share the same rule: value is constant along the line, and lines never cross.</div>
        `,
        diagram: { type: 'hotspot', svgKey: 'pressure_systems' }
      },
      {
        id:'s19_3',title:'Upper Air Analysis & Analysis Products',
        content:`
          <p>Weather is three-dimensional. Understanding upper-level patterns — jet streams, troughs aloft, and icing/turbulence layers — requires charts that show the atmosphere at various altitudes above the surface.</p>
          <div style="display:grid;gap:12px;margin:16px 0">
            ${[
              ['📈','Upper Air (Constant-Pressure) Charts','Show the atmosphere at specific pressure levels (850, 700, 500, 300, 250 mb). Lines are height contours (isoheights) — like isobars on a surface chart. Used to identify jet streams, troughs/ridges aloft, and atmospheric dynamics. 500 mb chart (~18,000 ft) is the primary "steering level" forecasters use.','#E0F2FE','#0284C7'],
              ['🧊','Current Icing Product (CIP)','Computer-generated analysis of current in-flight icing severity and SLD conditions. Available at 1,000 ft increments. Based on radar, satellite, pilot reports, and NWP model data. Used alongside AIRMETs — more precise spatial resolution than AIRMETs.','#EEF2FF','#6366F1'],
              ['💥','Graphical Turbulence Guidance (GTG)','NWS turbulence analysis and forecast based on algorithm combining multiple CAT indicators. Available hourly. Shows turbulence intensity at flight levels. Good for situational awareness and route planning on IFR flights above FL180.','#FEF3C7','#D97706'],
              ['📍','Real-Time Mesoscale Analysis (RTMA)','High-resolution analysis of surface conditions: temperature, dewpoint, wind, and visibility at 2.5 km grid spacing. Updated hourly. More detailed than standard METARs. Useful for identifying fog boundaries, sea breezes, and mesoscale features.','#D1FAE5','#059669'],
            ].map(([icon,name,desc,bg,col])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;display:flex;gap:12px">
              <span style="font-size:24px;flex-shrink:0">${icon}</span>
              <div><strong style="font-family:var(--font-display);font-size:14px;color:${col}">${name}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p></div>
            </div>`).join('')}
          </div>
        
          <div style="background:#D1FAE5;border-radius:12px;padding:14px;margin-top:14px;border-left:3px solid #059669">
            <strong style="font-family:var(--font-display);font-size:13px;color:var(--navy)">🎈 Radiosonde / Weather Balloon</strong>
            <p style="font-size:13px;color:#475569;margin:6px 0 0">A <strong>radiosonde</strong> is an instrument package carried aloft by a weather balloon that measures temperature, humidity, pressure, and wind at various altitudes during ascent. The NWS launches radiosondes twice daily (00Z and 12Z) from ~92 US stations. Data produces the <strong>atmospheric sounding</strong> — a vertical profile of the atmosphere used by forecasters to assess stability, freezing levels, icing layers, and wind shear. Balloon ascent takes ~90 minutes and reaches ~100,000 ft before bursting. Upper air data is the foundation of all numerical weather prediction models.</p>
          </div>`
      }
    ,
      {
        id:'s19_4',title:'Station Models — Reading Weather Charts',
        content:`
          <p>Surface analysis charts use <strong>station models</strong> — compact coded weather plots at each observation point. Decoding a station model instantly gives you a complete surface weather snapshot.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">STATION MODEL ELEMENTS</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              ${[['Temperature','Upper left — °F (US charts). 72 = 72°F surface temperature.'],['Dewpoint','Lower left — °F. Large T−Td = dry. Small spread = near saturation.'],['Sea Level Pressure','Upper right — last 3 digits in tenths of mb. 132 = 1013.2 mb; 874 = 987.4 mb.'],['Sky Cover','Station circle fill: open=clear, half=SCT, 3/4=BKN, filled=OVC, X=obscured.'],['Wind','Arrow FROM wind direction. Half barb=5kt. Full barb=10kt. Pennant=50kt.'],['Pressure Tendency','3-hr change in tenths mb + tendency symbol. Rapidly falling = approaching low/front.']].map(([name,desc])=>`<div style="background:rgba(255,255,255,.05);border-radius:8px;padding:8px"><div style="color:#38BDF8;font-size:11px;font-weight:700;margin-bottom:3px">${name}</div><div style="color:#94A3B8;font-size:10px;line-height:1.4">${desc}</div></div>`).join('')}
            </div>
          </div>
          <div class="callout">📊 <strong>Pressure Tendency:</strong> The 3-hour pressure change is more useful than the absolute value for forecasting. Rapidly falling pressure (−4 mb or more in 3 hours) indicates an approaching low or front. Watch the altimeter setting trend en route — it tells the same story.</div>
        `
      }],
    quiz:[
      {id:'q_m19_1',type:'mc',question:'A solar flare most immediately affects aviation operations by:',options:['Disrupting GPS satellite signals globally within minutes','Causing HF radio blackouts on the sunlit side of Earth within ~8 minutes of the flare','Generating severe turbulence at high altitudes','Increasing magnetic variation on magnetic compass headings'],correct:1,xp:10,explanation:'Solar flare electromagnetic radiation (X-rays, UV) travels at the speed of light — arriving at Earth approximately 8 minutes after the flare. It immediately increases ionization in the lower ionosphere (below 90 km) on the sunlit side, absorbing HF (3–30 MHz) radio signals and causing radio blackouts. HF communications are critical for oceanic and polar routes. GPS disruption and radiation effects from particle events (CMEs) take 1–4 days to arrive.',faaRef:'Ch. 23',concept:'space_weather'},
      {id:'q_m19_2',type:'mc',question:'On a surface analysis chart, closely-spaced isobars indicate:',options:['A warm air mass with stable conditions','Strong pressure gradient — stronger winds','A temperature inversion — smooth conditions aloft','Low humidity — good VFR visibility'],correct:1,xp:10,explanation:'Isobars are lines of equal sea-level pressure. The closer together (more tightly packed) they are, the stronger the pressure gradient force — and therefore the stronger the wind. Widely-spaced isobars indicate a weak pressure gradient and light winds. This is why tight isobar packing around a deep low means strong surface winds.',faaRef:'Ch. 25',concept:'briefing_products'},
      {id:'q_m19_3',type:'mc',question:'The 500 mb (millibar) constant-pressure chart is important for forecasters because:',options:['It shows sea-level pressure distribution more accurately than surface analysis','It is the primary "steering level" — showing the large-scale flow that guides surface weather systems','It shows where icing conditions exist at 18,000 ft','It is the only chart that shows wind direction above 10,000 ft'],correct:1,xp:10,explanation:'The 500 mb chart (~18,000 ft MSL) is often called the "steering level" because the large-scale flow at this altitude strongly influences the movement of surface weather systems. Troughs and ridges on the 500 mb chart indicate where surface lows will deepen or weaken and where fronts will move. Meteorologists start their forecast analysis at this level.',faaRef:'Ch. 25',concept:'briefing_products'},
      {id:'q_m19_4',type:'timed',timeLimit:10,question:'GPS signal disruption from space weather is most severe:',options:['At the equator — the ITCZ interferes with satellite signals','At polar latitudes — Earth\'s magnetic field allows more charged particles to reach the ionosphere','Below 10,000 ft — signals are blocked by terrain','At solar minimum — when the ionosphere is most stable'],correct:1,xp:15,explanation:'Earth\'s magnetic field lines converge at the poles, allowing charged solar particles to penetrate the atmosphere most deeply at high latitudes. Ionospheric storms cause GPS scintillation and position errors most severely at polar regions. This is a significant concern for polar routes, where airlines monitor SWPC advisories and may reroute or descend to avoid GPS-denied airspace during severe space weather events.',faaRef:'Ch. 23',concept:'space_weather'},
      {id:'q_m19_5',type:'mc',question:'A dryline on a surface analysis chart marks:',options:['A boundary between cold and warm air masses, similar to a cold front','The boundary between dry and moist air — primarily in the Southern Plains — and is a powerful trigger for severe thunderstorm development','A line connecting areas of equal dewpoint across a region','The boundary of the trade wind belt in tropical regions'],correct:1,xp:10,explanation:'A dryline is the boundary between the dry continental air from the Southwest and the moist maritime tropical air from the Gulf of Mexico. It differs from a cold front in that temperatures are similar on both sides — only moisture differs. In spring, the dryline is one of the most powerful triggers for severe thunderstorm development in the central US, often more significant than nearby fronts.',faaRef:'Ch. 11, 25',concept:'briefing_products'}
    ,
      {id:'q_m19_6',type:'mc',question:'On a station model, the wind barb points INTO the station with two full barbs and one half barb. What wind does this represent?',options:['Wind FROM that direction at 25 kt','Wind TOWARD that direction at 25 kt','Wind FROM that direction at 12 kt','Wind FROM that direction at 250 kt'],correct:0,xp:10,explanation:'Wind barbs point FROM the direction the wind is coming from (into the station circle). Speed: each full barb = 10 kt, each half barb = 5 kt, each pennant (flag) = 50 kt. Two full + one half = 10+10+5 = 25 kt. The barb stem points from the station toward the source direction.',faaRef:'Ch. 25',concept:'briefing_products'}
    ,
      {id:'q_m19_7',type:'mc',question:'On a surface analysis chart, a trough is indicated by:',options:['A closed loop of isobars surrounding a center labeled "L"','An elongated area of relatively low pressure without closed isobars, often shown as a dashed line — associated with clouds, precipitation, and wind shift'],correct:1,xp:10,explanation:'A trough is an elongated area of lower pressure extending from a low, without a closed isobar. It appears as isobars bending toward the trough axis. Troughs are convergence zones — winds from opposite sides converge along the axis, forcing air upward. This makes troughs reliable locations for clouds, precipitation, and sometimes severe weather development. On surface charts, they are often shown with a dashed line or the isobars themselves indicate the trough axis.',faaRef:'Ch. 25',concept:'briefing_products'},
      {id:'q_m19_8',type:'timed',timeLimit:10,question:'A surface analysis chart shows isobars spaced 2 mb apart at 4 mb intervals. This tight spacing indicates:',options:['A high-pressure system is nearby — tight isobars always mean high pressure','A strong pressure gradient — expect strong winds in this area','A temperature inversion — tight isobars indicate stable air','Frontal weather is at least 24 hours away'],correct:1,xp:10,explanation:'On surface analysis charts, isobars at standard 4 mb intervals represent lines of equal sea-level pressure. Tightly-packed isobars indicate a large pressure difference over a short horizontal distance — a strong pressure gradient force. Strong PGF produces strong winds. The tighter the isobars, the stronger the winds. This applies whether it’s a high or low pressure system. The same principle applies to contour lines on upper air charts — closely-spaced contours indicate a strong pressure gradient and strong winds at that level.',faaRef:'Ch. 25',concept:'briefing_products'},
      {id:'q_m19_9',type:'mc',question:'The 500 mb constant-pressure chart (approximately 18,000 ft) is particularly useful to forecasters because:',options:['It shows precipitation intensity at 18,000 ft directly','It is the primary "steering level" — the large-scale flow at 500 mb guides the movement of surface low pressure systems, fronts, and storm tracks','It shows icing conditions most accurately at FL180','It is the only pressure level where jet streams are visible on charts'],correct:1,xp:10,explanation:'The 500 mb chart is often called the "steering level" because upper-level troughs and ridges at this height strongly influence the movement of surface weather systems. A trough at 500 mb will often have a surface low or front below it, and the direction of 500 mb flow indicates where those surface features will move. Forecasters analyze 500 mb charts to predict where lows will track, where fronts will move, and whether weather patterns will amplify or flatten. This is why five-day forecasts depend heavily on 500 mb model output.',faaRef:'Ch. 25',concept:'briefing_products'},
      {id:'q_m19_10',type:'scenario',scenario:'Preflight planning: Surface analysis shows a high-pressure system centered over KJQF with tightly-packed isobars to the northwest indicating a strong cold front 200 miles away. 500 mb chart shows a sharp trough approaching from the west.',question:'What does the 500 mb trough tell you about the surface front’s behavior?',options:['500 mb data is irrelevant for surface weather planning','A 500 mb trough behind a surface front indicates the front will likely accelerate and the surface low will deepen. Conditions will deteriorate faster than the surface chart alone suggests. Plan for earlier-than-expected frontal passage.','A 500 mb trough always means improving conditions at the surface','500 mb troughs only affect jet aircraft operations above FL180'],correct:1,xp:20,explanation:'Upper-level trough approaching behind a surface front is a synoptic pattern that typically causes: (1) the surface low to deepen (lower central pressure), (2) the front to accelerate, (3) colder air behind the front to be advected more strongly. This means conditions at KJQF may deteriorate faster than the surface chart timing suggests. When planning a weather-sensitive flight near an approaching front, always check both surface analysis AND 500 mb chart — the upper-level pattern determines how fast and intense the surface system will be.',faaRef:'Ch. 25'},
      {id:'q_m19_11',type:'mc',question:'The Current Icing Product (CIP) differs from AIRMET Zulu in that:',options:['They are the same product with different names','CIP provides a higher-resolution gridded analysis of current icing severity and SLD probability at 1,000 ft increments based on model + observational data, while AIRMET Zulu covers broader geographic areas in general altitude bands','AIRMET Zulu is more precise because it is issued by human forecasters','CIP only covers IFR conditions; AIRMET Zulu only covers icing'],correct:1,xp:10,explanation:'CIP (Current Icing Product) is a computer-generated analysis providing gridded icing probability and severity at 1,000-ft altitude increments, incorporating radar, satellite, PIREPs, and model data. It is updated hourly and provides much finer spatial resolution than AIRMET Zulu. AIRMET Zulu covers large geographic areas in broad altitude bands. Use both: AIRMET Zulu for the big picture and regulatory planning, CIP for detailed altitude/location selection to minimize icing exposure.',faaRef:'Ch. 25',concept:'advisories'},
      {id:'q_m19_12',type:'mc',question:'Solar radiation storms are most hazardous to aviation operations on which routes?',options:['Equatorial routes where solar radiation is strongest','Polar routes above 65° latitude, where Earth’s magnetic field provides less protection and HF communications are critical','Mountain routes where radiation reflects off snow-covered terrain','Night routes where UV radiation is concentrated on the night side of Earth'],correct:1,xp:10,explanation:'Solar radiation storms (high-energy protons) penetrate Earth’s magnetic field most deeply at the polar regions, where field lines are nearly vertical. Aircraft on polar routes (common transatlantic and transpacific routes) experience elevated radiation doses during solar radiation storms. Additionally, HF radio communications — required on polar routes where line-of-sight VHF isn’t possible — are disrupted by the ionospheric effects of these storms. Airlines monitor SWPC advisories and reroute away from polar regions during significant space weather events.',faaRef:'Ch. 23',concept:'space_weather'}
    ]
  },

  // ============================================================
  // M20: ADVANCED PRODUCTS (Ch. 7, 27 gaps, 26 gaps)
  // ============================================================
  {
    id:'m20',act:3,title:'Advanced Weather Products',subtitle:'Winds aloft, SIGWX charts, energy balance & full advisory suite',
    icon:'🗺️',color:'#059669',bgColor:'#ECFDF5',prerequisites:['m11','m12','m13','m14','m15'],
    xpReward:225,estimatedMin:20,faaRef:'FAA-H-8083-28A Chapters 7, 26, 27',
    sections:[
      {
        id:'s20_1',title:'Earth\'s Energy Balance & Weather Drivers',
        content:`
          <p>All weather is ultimately driven by the atmosphere's effort to <strong>redistribute the unequal heating of the Earth</strong>. Understanding this makes the big-picture synoptic patterns predictable.</p>
          <div style="background:var(--navy);border-radius:16px;padding:18px;color:white;margin:16px 0">
            <div style="font-size:11px;color:#94A3B8;margin-bottom:12px;font-family:var(--font-display);font-weight:700">ENERGY BALANCE NUMBERS</div>
            ${[
              ['Incoming solar radiation absorbed by surface','46%','Warms the ground — the primary heat engine'],
              ['Absorbed by water vapor, dust, ozone, clouds','23%','Warms the atmosphere directly'],
              ['Reflected to space by air (8%), clouds (17%), surface (6%)','31%','Does not heat the Earth'],
              ['Heat leaving surface to atmosphere via convection','~7%','Sensible heat — thermals, sea breezes'],
              ['Heat leaving surface via latent heat (evaporation)','~24%','Latent heat — water vapor → clouds → release of heat aloft'],
            ].map(([desc,pct,note])=>`
            <div style="border-bottom:1px solid rgba(255,255,255,.08);padding:9px 0;display:grid;grid-template-columns:2fr .5fr 1.5fr;gap:8px;font-size:12px">
              <span style="color:#CBD5E1">${desc}</span>
              <span style="color:#38BDF8;font-family:var(--font-mono);font-weight:700">${pct}</span>
              <span style="color:#94A3B8">${note}</span>
            </div>`).join('')}
          </div>
          <p><strong>Seasons</strong> are caused by the Earth's 23.5° axial tilt — not distance from the Sun. The Northern Hemisphere is closest to the Sun in January (winter!) because the Southern Hemisphere is tilted toward the Sun at that point.</p>
          <div class="callout">🌡️ <strong>Greenhouse Effect:</strong> Without the atmosphere, Earth's average surface temp would be -18°C (0°F) — like the Moon. The atmosphere traps outgoing infrared radiation, raising average surface temp to +15°C (59°F). Overcast nights are warmer than clear nights because clouds trap more outgoing infrared radiation.</div>
          <p><strong>Diurnal temperature variation</strong> is maximized over land at low latitudes with clear sky, dry air, and light winds. It is minimized over water at high latitudes with cloudy sky, moist air, and strong winds. This is why temperature-sensitive operations (density altitude calculations, fog forecasting) require knowledge of surface type and sky cover.</p>
        `
      },
      {
        id:'s20_2',title:'Winds & Temperatures Aloft Forecast (FB)',
        content:`
          <p>The <strong>Winds and Temperatures Aloft Forecast (FB)</strong> is one of the most useful products for flight planning — it tells you what to expect at cruise altitude before you get there.</p>
          <div style="background:#0C1B33;border-radius:16px;padding:18px;margin:16px 0;font-family:var(--font-mono);font-size:12px;color:white">
            <div style="font-size:10px;color:#94A3B8;margin-bottom:10px;font-family:var(--font-display);font-weight:700">SAMPLE FB FORECAST DECODE</div>
            <div style="color:#38BDF8;margin-bottom:8px">FD KWBC 150950Z  BASED ON 150600Z DATA</div>
            <div style="color:#94A3B8;margin-bottom:4px">TEMP NEG ABV 24000 WIND ABOVE 39000 FT CALM</div>
            <div style="color:white;margin-bottom:8px">FT    3000  6000   9000  12000  18000  24000  30000  34000  39000</div>
            <div style="color:#A5B4FC;margin-bottom:4px">DEN        2920  2932+02  3042+08  3054-10  3148-23  311849  302762</div>
          </div>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['Format at most levels','DDSSFTT — DD = wind direction (true north, tens of degrees), SS = wind speed (knots), TT = temperature (°C, always negative above 24,000 ft so no sign shown).','#E0F2FE','#0284C7'],
              ['3000 ft level','Temperature not shown — too close to surface. Wind only.','#F8FAFC','#94A3B8'],
              ['Calm winds','9900 — "light and variable." Not forecasting usable wind.','#D1FAE5','#059669'],
              ['Winds 100–199 kt','Add 50 to the DD tens and subtract 100 from speed. Example: 731960 = 230° at 119 kt, -60°C.','#FEF3C7','#D97706'],
              ['Temperature','Always °C. Negative sign omitted above 24,000 ft (always negative there). At or below 24,000 ft: + or - sign shown.','#FEF2F2','#EF4444'],
            ].map(([term,desc,bg,col])=>`
            <div style="background:${bg};border-radius:12px;padding:12px 14px">
              <div style="font-family:var(--font-display);font-weight:800;font-size:13px;color:${col};margin-bottom:4px">${term}</div>
              <div style="font-size:13px;color:#475569">${desc}</div>
            </div>`).join('')}
          </div>
          <div class="callout">💡 <strong>Practical uses:</strong> (1) Find most favorable altitude — tailwinds at 9,000 but headwinds at 6,000? Climb. (2) Identify temperature at altitude for icing assessment. (3) Detect jet stream position by tracing high-wind levels. (4) Calculate true airspeed from pressure altitude and temperature. Valid at 3, 6, 12 hours from issuance.</div>
        `
      },
      {
        id:'s20_3',title:'SIGWX Charts & Area Forecasts',
        content:`
          <p><strong>Significant Weather (SIGWX) Charts</strong> provide a forecast of significant weather phenomena at a glance, covering large geographic areas. They are essential for pre-flight route planning on longer flights.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['Low-Level SIGWX (FL100 and below)','12-hour forecast covering surface to FL100. Shows: IFR areas (ceilings/visibility), turbulence, freezing level, icing, and LLWS areas. Best for planning VFR/IFR cross-countries.','#E0F2FE','#0284C7'],
              ['Mid-Level SIGWX (FL100–FL450)','Covers the flight levels used by most GA and commercial operations. Shows: thunderstorm areas, moderate/severe turbulence, icing, tropopause heights, jet streams, and tropical systems.','#EEF2FF','#6366F1'],
              ['High-Level SIGWX (FL250–FL630)','Designed for high-altitude and oceanic operations. Used for ETOPS planning, polar routes, and international flight. Shows jet streams, CB tops, and space weather impacts.','#FEF3C7','#D97706'],
            ].map(([type,desc,bg,col])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;border-left:4px solid ${col}">
              <strong style="font-family:var(--font-display);font-size:14px;color:${col}">${type}</strong>
              <p style="font-size:13px;color:#475569;margin:6px 0 0">${desc}</p>
            </div>`).join('')}
          </div>
          <p><strong>Area Forecasts (FA)</strong> were the traditional text-based forecast for an entire region. The GFA (Graphical Forecasts for Aviation) tool at aviationweather.gov has largely replaced FAs for the CONUS, Gulf, and Caribbean, providing an interactive graphical interface with 1-hour forecast updates out to 15 hours. The FA is still issued for Alaska (and other areas not covered by GFA).</p>
        
          <div style="background:#EEF2FF;border-radius:12px;padding:14px;margin-top:14px;border-left:3px solid #6366F1">
            <strong style="font-family:var(--font-display);font-size:13px;color:var(--navy)">🧊 Forecast Icing Product (FIP)</strong>
            <p style="font-size:13px;color:#475569;margin:6px 0 0">The <strong>FIP</strong> is the forecast counterpart to the CIP (Current Icing Product). While CIP shows where icing exists NOW, FIP shows where icing is <em>forecast</em> to exist at future times (1, 3, 6, 9, 12, 15, 18 hours). Available at 1,000 ft increments, showing icing probability and SLD probability. Use CIP + FIP together: CIP for current conditions, FIP for planning your route timing. Available on aviationweather.gov under the Products → Icing section. AIRMETs for icing are derived in part from FIP guidance.</p>
          </div>`
      },
      {
        id:'s20_4',title:'Complete Advisory Suite',
        content:`
          <p>Beyond AIRMETs and SIGMETs, several other advisory products can matter in specialized operations or unusual weather situations. Most pilots use them as awareness tools within the broader weather picture.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[
              ['Ash','Volcanic Ash Advisory (VAA)','Issued by Volcanic Ash Advisory Centers (VAAC). Washington VAAC covers CONUS/Caribbean; Anchorage VAAC covers Alaska/Russia. Describes ash-cloud location, extent, and projected movement. Particularly important for turbine, international, and Alaska/oceanic operations, but still a serious awareness item for any pilot near suspected ash.','#FEF2F2','#EF4444'],
              ['TCA','Aviation Tropical Cyclone Advisory (TCA)','Issued when tropical cyclones affect or are forecast to affect international flight operations. Includes storm center position, intensity, movement, and forecast track. Most relevant to coastal, oceanic, and international planning rather than routine inland GA flying.','#E0F2FE','#0284C7'],
              ['SWA','Space Weather Advisory','Issued by SWPC under ICAO framework. Describes space-weather event type, severity, affected communications and navigation systems, and radiation levels. Most relevant to polar, oceanic, and high-altitude operators, but useful as awareness for broader strategic planning.','#F5F3FF','#7C3AED'],
              ['💨','LLWS/Microburst Advisories','Low-Level Wind Shear alerts issued by ARTCCs and TRACONs based on Terminal Doppler Weather Radar (TDWR) or other wind shear detection systems. Critical for approach and departure planning when convective activity is near the airport.','#D1FAE5','#059669'],
              ['⚠️','Airport Weather Warning (AWW)','Issued by WFOs for conditions posing hazard to aircraft on the ground or during taxi at a specific airport: heavy snow, freezing rain, ice, thunderstorms, fog. Complement TAFs and METARs for airport operations planning.','#FEF3C7','#D97706'],
            ].map(([icon,type,desc,bg,col])=>`
            <div style="background:${bg};border-radius:14px;padding:14px;display:flex;gap:12px">
              <span style="font-size:24px;flex-shrink:0">${icon}</span>
              <div><strong style="font-family:var(--font-display);font-size:14px;color:${col}">${type}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p></div>
            </div>`).join('')}
          </div>
          <div class="danger-callout"><strong>Volcanic Ash - Severe Hazard:</strong> Volcanic ash can be hard to detect visually and may not appear on radar. It is a specialized but severe hazard because it can damage engines, windscreens, and aircraft systems. Treat suspected ash as a major route-planning threat and use official advisory products to stay clear.</div>
        `
      }
    ,
      {
        id:'s20_5',title:'Pre-Flight Briefing Flow — The Full Process',
        content:`
          <p>A systematic weather briefing is one of the strongest weather risk-management habits a pilot can build. This is a practical study flow, not a regulatory checklist.</p>
          <div style="display:grid;gap:10px;margin:16px 0">
            ${[['1','Big Picture First','Check surface analysis and prog charts for the 12-24 hour period. Where are the fronts? Any lows deepening? This sets context for everything else.'],['2','Significant Hazards','SIGMETs, Convective SIGMETs, and AIRMETs. Check GFA tool at aviationweather.gov for graphical overlay of major hazards along route.'],['3','Current Conditions','METARs along route every 50-100 NM. Flight categories. T-Td spread. Any PIREPs available.'],['4','Forecasts','TAFs for departure, destination, alternates. TEMPO/PROB groups. Winds aloft for cruise altitude optimization. Low-Level SIGWX chart.'],['5','Trend Analysis','Is weather improving or deteriorating? Use satellite loop (not single frame). Compare current METARs to 3-hour-old data.'],['6','Decision & Alternatives','Go / No-Go / Modified route. Know your alternates. If conditions are near your personal or legal limits, reconsider timing, route, altitude, or whether an IFR plan is appropriate for the aircraft, pilot, and mission.']].map(([step,title,desc])=>`<div style="background:white;border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.05);display:flex;gap:12px"><span style="font-size:24px;flex-shrink:0">${step}</span><div><strong style="font-family:var(--font-display);font-size:14px;color:var(--navy)">${title}</strong><p style="font-size:13px;color:#475569;margin:4px 0 0">${desc}</p></div></div>`).join('')}
          </div>
          <div class="fact-box"><span style="font-size:28px">Time</span><div><strong>Time Budget:</strong> A thorough VFR briefing often takes 15-20 minutes. IFR planning may take 20-30 minutes or more. For weather-sensitive flights, that is usually time well spent.</div></div>
        `
      }],
    quiz:[
      {id:'q_m20_1',type:'mc',question:'In a Winds and Temperatures Aloft (FB) forecast, the code "9900" indicates:',options:['Wind from 090 degrees at 0 kt - dead calm','Wind from 990 degrees, which is impossible - data error','Light and variable winds - speed too low to forecast meaningfully','Wind from 099 degrees at 00 kt'],correct:2,xp:10,explanation:'"9900" in FB forecasts means light and variable winds. Wind speed is too low to assign a meaningful direction forecast.',faaRef:'Ch. 27',concept:'briefing_products'},
      {id:'q_m20_2',type:'mc',question:'A volcanic ash cloud is particularly hazardous to aircraft primarily because:',options:['Ash reduces visibility but does not affect aircraft systems','Ash particles are abrasive silica that can severely damage turbine engines and aircraft systems, including possible power loss','Volcanic ash creates severe icing on aircraft surfaces','Ash clouds always contain embedded thunderstorms'],correct:1,xp:10,explanation:'Volcanic ash is made of fine abrasive particles that can damage engines, windscreens, sensors, and other aircraft systems. Turbine aircraft are especially vulnerable, and severe exposure can include power loss. Ash can also be hard to detect visually and may not appear on weather radar, which is why official ash advisories are important.',faaRef:'Ch. 26',concept:'advisories'},
      {id:'q_m20_3',type:'mc',question:'In an FB winds aloft forecast, the group "731960" at FL390 should be decoded as:',options:['Wind from 073° at 19 kt, temperature -60°C','Wind from 230° at 119 kt, temperature -60°C','Wind from 731° — error in the forecast','Wind from 073° at 196 kt, temperature 0°C'],correct:1,xp:15,explanation:'When wind speed is 100–199 kt, 50 is added to the direction tens and 100 is subtracted from the coded speed. 73 - 50 = 23, so direction is 230°. 19 + 100 - 100 = 119 kt. Temperature: -60°C (above 24,000 ft, temperature is always negative so no sign). Wind from 230° at 119 kt at FL390, temperature -60°C.',faaRef:'Ch. 27',concept:'briefing_products'},
      {id:'q_m20_4',type:'timed',timeLimit:10,question:'The SIGWX chart that is most relevant for planning a cross-country at 8,500 ft MSL is:',options:['High-Level SIGWX (FL250–FL630)','Mid-Level SIGWX (FL100–FL450)','Low-Level SIGWX (surface to FL100)','Surface Analysis Chart only'],correct:2,xp:15,explanation:'The Low-Level SIGWX chart covers the surface to FL100 and is specifically designed for the altitudes used by most GA pilots. It shows IFR areas, turbulence, icing, freezing levels, and LLWS — all directly relevant to a typical GA cross-country at 8,500 ft. The Mid-Level and High-Level charts are for FL100 and above.',faaRef:'Ch. 27',concept:'briefing_products'},
      {id:'q_m20_5',type:'scenario',scenario:'You are planning a VFR cross-country at 6,500 ft. The FB winds aloft forecast shows: At 6,000 ft: 1824-05. At 9,000 ft: 2218+02.',question:'What does the temperature data tell you about icing potential?',options:['No concern — temperatures are above 0°C at both levels','No icing at 9,000 ft (+02°C = above freezing). Possible icing at 6,000 ft (-05°C = below freezing) if moisture is present in clouds','Severe icing at both levels — temperatures always indicate icing conditions','At 9,000 ft, +02°C is too warm for flight — VFR not recommended above 7,000 ft'],correct:1,xp:20,explanation:'At 6,000 ft: -05°C (below freezing — icing possible in visible moisture). At 9,000 ft: +02°C (above freezing — no structural icing). The freezing level (0°C) is somewhere between 6,000 and 9,000 ft. If flying at 6,500 ft in visible moisture (clouds, rain), icing is a possibility. If flying VFR, you would be below the freezing level but above it at 9,000 ft. Cross-reference with AIRMETs and PIREPs for confirmation.',faaRef:'Ch. 27'},
      {id:'q_m20_6',type:'mc',question:'The GFA (Graphical Forecasts for Aviation) tool has largely replaced which product for the CONUS?',options:['TAF (Terminal Aerodrome Forecast)','SIGMET (Significant Meteorological Information)','Area Forecast (FA) text product','PIREPs (Pilot Weather Reports)'],correct:2,xp:10,explanation:'The GFA tool at aviationweather.gov provides graphical, interactive aviation weather forecasts for the CONUS, Gulf of Mexico, Caribbean, and Pacific including Hawaii. It updates hourly with forecasts out to 15 hours and has largely replaced the traditional text-based Area Forecast (FA) for those regions. FAs are still issued for Alaska.',faaRef:'Ch. 27',concept:'briefing_products'}
    ,
      {id:'q_m20_7',type:'scenario',scenario:'Planning VFR KJQF→KAVL (90 NM, ~1 hr). Current KAVL METAR: OVC015 BKN009 4SM BR. TAF shows BECMG 2122/2124 VFR. ETD 2100Z, ETA 2200Z.',question:'What is the most appropriate pre-flight decision?',options:['Go — BECMG shows VFR by 2124Z, just before arrival','Go — 4SM is legal VFR','Wait and depart to arrive after 2124Z, verify with fresh METAR, or file IFR with alternate','Cancel — mountain airports are always dangerous in marginal conditions'],correct:2,xp:20,explanation:'Your ETA (2200Z) falls right at the end of the BECMG window (2124Z). BECMG means conditions are becoming VFR somewhere between 2122-2124Z — it could still be IFR at arrival. Current conditions (OVC015, 4SM BR) are borderline. The right call: depart later to arrive after the window and verify with a fresh METAR, or file IFR with alternate. KAVL (2,165 ft MSL) has terrain on all sides — arriving IMC without IFR clearance is extremely dangerous.',faaRef:'Ch. 27'}
    ,
      {id:'q_m20_8',type:'mc',question:'The Aviation Forecast Discussion (AFD) is most useful to pilots because:',options:['It replaces the TAF when conditions are too complex to forecast','It provides a plain-language explanation of the meteorologist’s reasoning behind the forecast — including forecast confidence, uncertainty, and reasoning for controversial calls. Helps pilots understand WHY the forecast is what it is.','AFDs are only issued for airports with airline service','AFDs are required reading under 14 CFR 91.103 for all IFR flights'],correct:1,xp:10,explanation:'The Aviation Forecast Discussion (AFD) is issued by WFOs and provides the forecaster’s reasoning behind the aviation forecast. It discusses forecast confidence, competing model solutions, significant uncertainties, and explains seemingly unusual forecasts. When a TAF shows low confidence (e.g., borderline TEMPO vs BECMG), the AFD explains why. Many experienced pilots read the AFD to understand the thought process behind the forecast — a TAF with high forecaster confidence is more reliable than one with significant uncertainty mentioned in the AFD.',faaRef:'Ch. 27',concept:'briefing_products'},
      {id:'q_m20_9',type:'timed',timeLimit:12,question:'Winds aloft forecast shows at 12,000 ft: 7545. Decode this.',options:['Wind from 075 degrees at 45 kt','Wind from 250 degrees at 145 kt - direction code above 36 means subtract 50 from the direction code and add 100 kt to the speed','Wind from 754 degrees at 5 kt - error in forecast','Wind from 075 degrees at 545 kt'],correct:1,xp:15,explanation:'When the coded direction is greater than 36, subtract 50 from the direction code and add 100 kt to the speed. For 7545: 75 - 50 = 25, so the wind is from 250 degrees. Speed 45 becomes 145 kt. The forecast decodes to wind from 250 degrees at 145 kt.',faaRef:'Ch. 27',concept:'briefing_products'},
      {id:'q_m20_10',type:'mc',question:'The Graphical Turbulence Guidance (GTG) product is most useful for:',options:['Identifying convective turbulence inside thunderstorm cells','Pre-flight planning and altitude selection to avoid clear air turbulence (CAT) — it provides hourly analysis and 1-hour forecasts of CAT at flight levels','Ground turbulence and wind shear on approach','Only applicable to jet aircraft above FL250'],correct:1,xp:10,explanation:'GTG is a computer-generated product combining multiple CAT detection algorithms (based on wind shear, deformation, divergence, etc.) to produce turbulence guidance at flight levels. It is updated hourly and most applicable for en route planning at IFR flight levels. GTG does not capture convective turbulence well — for that, use radar and PIREPs. GTG is available on aviationweather.gov and most EFB applications. Best used in combination with PIREPs to validate the computed turbulence areas.',faaRef:'Ch. 25, 27',concept:'turbulence_types'},
      {id:'q_m20_11',type:'scenario',scenario:'You are planning a 7-hour night IFR flight at FL220. The SIGWX high-level chart shows a jet stream axis with core winds of 140 kt directly on your route, shaded turbulence areas on the northern flank, and CB tops at FL380 100 miles to the south.',question:'What is your altitude optimization strategy?',options:['Fly through the jet core — fastest groundspeed, no turbulence concern in the core','Fly south of the jet core to avoid CAT on the northern shear side, but maintain 20 NM clearance from the CB tops to the south. Consider FL200 or FL240 to find smoother air off the shear zone.','Fly the northern side of the jet for maximum tailwind assistance','Request FL380 to be above both the jet stream and CBs'],correct:1,xp:20,explanation:'Jet stream CAT is most severe on the northern/cyclonic shear side (left side in the NH). Flying through the jet core gives max tailwinds but moderate CAT risk. The northern flank has the most intense CAT. The southern side is generally smoother but you need 20 NM from CB tops (and tops are at FL380 — already above you, so lateral separation matters more than vertical). Best strategy: fly slightly south of the jet core for favorable winds and smoother ride, maintain 20+ NM lateral clearance from the CB area. Check GTG and PIREPs for actual conditions.',faaRef:'Ch. 27'},
      {id:'q_m20_12',type:'mc',question:'Short-range Surface Prognostic (Prog) Charts are useful for pre-flight planning because:',options:['They show real-time (current) surface conditions more accurately than METARs','They show forecast surface pressure patterns, fronts, and precipitation areas 12-48 hours into the future — useful for identifying where fronts will be during your flight and what weather system will dominate your route','Prog charts only show temperature forecasts','They replace the need for a standard weather briefing'],correct:1,xp:10,explanation:'Surface prognostic charts show forecast surface weather patterns at specific valid times (typically 12, 24, 36, 48 hours). They depict forecast positions of fronts, high and low pressure centers, and precipitation areas. For flight planning, they answer: "Where will the cold front be when I arrive at my destination in 6 hours?" Use prog charts to identify the timing and movement of weather systems, then reference TAFs and GFA for terminal conditions. They are particularly useful for multi-day trip planning.',faaRef:'Ch. 27',concept:'briefing_products'}
    ]
  }


];
