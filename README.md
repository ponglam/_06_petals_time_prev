# PETALS / TIME v0.2

Open `index.html` directly in a WebGL2 browser, or run `npm start` and visit http://127.0.0.1:8787. No dependencies, build step, network assets, or p5.js are required.

Enter a seed, select one of six moments or scrub continuously. Save this moment exports a 900 × 1200 PNG; Save identity exports JSON. The URL fragment stores type, seed, ageDays, and rendererVersion. One year is 365 virtual days. No real-time clock drives the organism.

## Integration

Load model.js, shaders.js and renderer.js in that order. `new Petals.Renderer(canvas, {width:900,height:1200}).render({type:"PETALS",seed:"PETALS-001",ageDays:365,rendererVersion:"0.2.0"})` returns `{canvas,identity,resolution}`. `resize(width,height)` accepts 3:4 portrait sizes; `dispose()` releases GPU resources. UI code is independent. Preserve this renderer version when adding future versions.

## Render method

Persistent seeded flower anchors and petal descriptors → continuous analytic morphology → local membrane, pigment, fibre and transmission fields in GLSL → six deterministic historical render targets → ping-pong accumulation with directional diffusion → selective optical softness and chromatic ghosting. Each render clears its targets and reconstructs history, so previous browsing and frame rate cannot affect the selected state. RGBA8 targets keep the prototype portable; dense overlaps may saturate. The diffusion is an artistic approximation, not fluid simulation.

`npm test` verifies core determinism, continuity, timeline and validation. `tests/browser.html` checks actual same-context pixel reproducibility across all milestones and arbitrary scrub order.

## Scope

v0.2 is an initial visual study. It establishes membranes, fibres, overlap and age-dependent memory; it does not yet reproduce every reference family. Fixed portrait composition, six memory samples and no canonical cross-GPU pixel guarantee. Higher resolution changes sampled detail. Keep resolution with export metadata. See PETALS_TIME_SPEC.md for the full established foundation and implementation contract. The pre-existing document is preserved as PETALS_TIME_SPEC.original.md.

## Daily animation

Playback starts automatically. Each rendered animation frame advances one virtual day, with no skipped-day catch-up. Pace controls presentation only. Pause, step +1 day, or scrub to inspect a moment. Scrubbing and export pause playback; the 20-year endpoint stops automatically. Daily rhythms change petal arcs, spread, folds, contour fullness and wavy edges in addition to slow lifespan growth.

The previous renderer remains available at `versions/0.1.0/index.html`; append an old identity fragment there to reproduce it.

Birthday and Birth time fields anchor the virtual calendar. Day 1 is the entered date/time; every day advances the calendar by 24 hours. Fields start blank, persist in the local URL fragment, and are included in JSON export. The display uses a floating calendar and does not read the device clock or convert timezones. Stop keeps the selected image; Play resumes from that day.


## v0.3 — Centred time and spectral pigment

Timeline: −20 years, −10 years, Now, +10 years, +20 years. Now sits exactly at 50%. The entered birthday and birth time are the fixed virtual Now anchor, not the wall clock. Random fills a valid date (1940–2025) and minute, then stops at Now. Only this explicit button uses browser cryptographic randomness; selected values persist in the URL and metadata. Seed identity remains unchanged.

Renderer 0.3.0 represents the 40-year window with internal ageDays 1–14601; Now is 7301 and signed offset = ageDays − 7301. Pigment shifts smoothly through 2.35 hue cycles over the window. Historic samples carry their own hues. Daily animation and Stop/scrub remain available. Versions 0.1.0 and 0.2.0 are preserved under versions/.


## Studio UI adapted from _geo_art

The reference folder is unchanged. PETALS now uses its three-column studio layout, local Cormorant Garamond font, origin form, moment previews, artwork details, interpretation text holder, music player, room mockups and recipe controls. Create portrait derives all three takes (Coral / Spectral / Veil) from birthday + time. By chance creates a new random origin and regenerates its takes. Surprise me adds editable prose chosen from the origin and selected moment. Text can be moved, resized and styled; it is included in PNG exports and recipes.

Music and interior files are copied into this project; they do not require the reference server. Audio starts only when Play music is pressed. Save impression exports a 2400 × 3200 PNG; Save/Load recipe preserves seed, selected time, birthday/time and interpretation. The renderer is still 0.3.0; this is a UI revision. The previous interface is backed up under versions/ui-before-geo/.


## Renderer 0.4.0 — Independent palette stories and grounds

Coral: Rose dawn → Apricot tide → Scarlet bloom → Mulberry dusk → Golden ember. Spectral: Cyan prism → Ultraviolet → Iris spectrum → Acid light → Electric dusk. Veil: Silver mist → Sage wash → Blue linen → Dust rose → Ochre memory. Each origin contributes a deterministic colour bias. Cubic interpolation makes the five milestone palettes one continuous colour sequence. Historical layers use their own temporal pigments.

The background is a separate ground colour sequence with changing wash, grain, directional fibre strength and orientation. Background values are never members of the four-pigment petal palette. Swatches show the actual four RGB source pigments sent to the shader; a separate Background label displays the ground. Overlap and transmission still modify visible on-canvas colour.

Previous renderer and studio are preserved under versions/0.3.0/. The new version must be specified in saved identities. A fifteen-image GPU/visual comparison harness is available at tests/palettes.html.


## Renderer 0.5.0 — Warm smooth grounds and floating forms

Supersedes the v0.4 background-texture direction: backgrounds are now spatially uniform, warm-coloured grounds. Paper grain, wash, fibres and output grain have been removed from the background compositor. Petal fibres and diffusion remain. Take-specific warm colours still interpolate through the years, separate from the petal palettes.

Each flower has an independent continuous horizontal/vertical trajectory and rotation. Individual petals have smaller independent offsets and rotations so historical layers no longer share a fixed centre. Petal scaling varies smoothly from 0.80 to 1.30 relative to the underlying life-stage shape. Stems follow the moving flower anchors. All transformations are seed/virtual-age functions; reverse scrubbing reconstructs identical states. Renderer 0.4.0 is archived under versions/0.4.0/.


## Renderer 0.6.0 — Breathing contour strokes

Approximately 44% of petals receive a deterministic continuous contour. Each has 2–5 integer opacity/width cycles around its boundary, with a cosine envelope from 0 to 60% optical opacity and back to 0. Width uses the same tapered envelope; there are no solid constant-width outlines or hard dashes. Contour phase drifts with virtual days. Historical samples evaluate their own phase and soften the strokes. Colours come from the existing petal pigment palette. Warm texture-free backgrounds and independent motion are retained. The previous renderer remains archived under versions/0.5.0/.


## Renderer 0.7.0 — Changing stroke population and richer fill

Stroke coverage smoothly cycles between 35% and 75% over the forty-year window. Seeded ranks select actual petals; the boundary petal fades in/out continuously rather than popping. The summed stroke participation matches the coverage target; finite-petal counts are represented by a fractional transition petal. Existing 2–5 contour cycles and 0–60% local stroke opacity remain. Fill density and internal fibre/vein texture strength increase 15%, with a 15% increase in pigment-noise contrast. Backgrounds remain texture-free and warm. Version 0.6.0 is archived.

Music automatically picks a local track and attempts playback on load. If normal browser autoplay policy blocks it, the first page interaction retries playback. Explicit Pause is respected; Next starts another randomly selected track and finished tracks continue without immediate repeats. This does not change deterministic artwork identity.
