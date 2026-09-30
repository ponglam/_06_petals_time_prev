# PETALS / TIME
## Generative Living Botanical Artwork System

**Project folder**  
`~/Desktop/_AI/_Astra/_06_petals_time`

**Document**  
`PETALS_TIME_SPEC.md`

**Status**  
Pre-production / Visual & Technical System Definition

**Primary platform**  
Web / Browser

**Core rendering direction**  
WebGL2 + GLSL + Framebuffer / Render Targets

---

# 1. PROJECT DEFINITION

PETALS is a browser-native generative artwork system based on botanical structures, translucency, pigment, optical softness, temporal accumulation, and growth through time.

It is not intended to generate realistic flowers.

It is not primarily a botanical simulation.

It is not a conventional vector illustration system.

The artistic objective is to create images that retain enough botanical structure to suggest petals, stems, growth, and organic life, while allowing those structures to dissolve into:

- transparency
- pigment
- light
- motion
- blur
- fibre
- temporal traces
- chromatic displacement
- memory

The artwork should exist somewhere between:

- flower
- photographic long exposure
- ink diffusion
- translucent membrane
- generative drawing
- light field
- memory
- abstraction

---

# 2. CORE ARTISTIC IDEA

PETALS should be understood as:

> A deterministic living artwork.

A seed does not merely generate one image.

A seed defines an organism.

Time determines how that organism changes.

Its past may remain visually present in its current state.

The renderer determines how that organism is perceived.

Therefore:

```text
SEED
=
IDENTITY

TIME
=
TRANSFORMATION

MEMORY
=
ACCUMULATED PAST

RENDERER
=
PERCEPTION / MATERIAL
```

The fundamental artwork is therefore not:

```text
seed → image
```

but:

```text
seed
  ↓
organism
  ↓
continuous lifespan
  ↓
time slice
  ↓
visual memory
  ↓
rendered artwork
```

---

# 3. PRIMARY GOAL

The highest priority is aesthetic quality.

Technology is subordinate to the visual result.

The system should be able to generate a wide range of unique artworks while maintaining a recognisable PETALS visual language.

Every output should feel related to the same artistic system without looking like a simple variation of a single template.

The desired output should avoid:

- obvious vector appearance
- flat SVG-like fills
- uniform opacity
- mechanically clean contours
- generic gradient fills
- standard Gaussian blur aesthetics
- simple particle-system appearance
- obvious procedural noise
- random blobs without biological logic
- arbitrary randomness

The desired output should instead contain controlled irregularity, softness, transparency, depth, organic structure and temporal complexity.

---

# 4. VISUAL REFERENCE OBSERVATIONS

The current reference images suggest several recurring properties.

## 4.1 Botanical recognition without realism

The viewer should frequently recognise:

- petals
- flower heads
- stems
- branching
- radial opening
- botanical growth

However, botanical accuracy is not mandatory.

The artwork may transition between:

```text
recognisable flower
       ↓
imaginary flower
       ↓
botanical abstraction
       ↓
organic colour organism
```

The underlying biological logic should survive even when visual representation becomes abstract.

---

# 4.2 Colour does not need to represent natural flower colour

Colour should behave as a field rather than as a simple assigned property.

Instead of:

```text
Petal 01 = Pink
Petal 02 = Purple
```

a petal may contain spatial transitions between:

- coral
- magenta
- violet
- cyan
- yellow
- peach
- translucent white
- muted blue

Colour can be affected by:

- local density
- neighbouring petals
- light transmission
- temporal state
- pigment diffusion
- fibre direction
- overlap
- chromatic displacement

---

# 4.3 Transparency is structural

Opacity should not be globally assigned to a petal.

A single petal may contain:

- highly transparent edges
- dense root regions
- semi-transparent centre
- almost invisible areas
- strongly pigmented intersections
- luminous thin membranes

Transparency is therefore a spatial field.

Conceptually:

```text
Petal opacity ≠ constant

opacity = f(
    position,
    density,
    fibre,
    age,
    pigment,
    overlap,
    deformation
)
```

---

# 4.4 Overlap creates colour and structure

Petal intersections are a major part of the aesthetic.

Visual complexity should emerge from relationships such as:

```text
A
B
C

A ∩ B
B ∩ C
A ∩ C
A ∩ B ∩ C
```

The overlap itself may create:

- new colours
- deeper density
- shadow-like areas
- optical luminosity
- interference
- visual depth

The system should therefore treat compositing as part of the artwork rather than as a final technical step.

---

# 4.5 Edges should not behave uniformly

A single petal may contain:

- sharp edge
- soft edge
- pigment bleed
- dissolved edge
- transparent edge
- displaced edge
- fibre-defined edge

Avoid one consistent contour around the shape.

The boundary should emerge from material behaviour.

---

# 4.6 No conventional outline

Avoid conventional:

```text
stroke + fill
```

graphic construction.

Visible lines should preferably represent:

- fibres
- veins
- pigment flow
- growth directions
- temporal traces

rather than a clean perimeter outline.

---

# 4.7 Fibre structure

Some petals may be constructed partially or almost entirely from large numbers of fine directional fibres.

Possible fibre count:

```text
hundreds
to
thousands
per flower / petal system
```

Each fibre may contain variation in:

- width
- opacity
- curvature
- colour
- spacing
- length
- edge softness
- taper
- root density
- terminal transparency

A dense population of fibres may collectively form the apparent petal surface.

Therefore:

> The surface does not always need to be drawn directly.

The surface may emerge from fibres.

---

# 4.8 Optical softness

Blur should not be treated as one global operation.

PETALS should distinguish between several forms of softness:

### Optical Blur

Out-of-focus or lens-like softness.

### Motion Blur

Movement across time.

### Diffusion

Pigment or light spreading spatially.

### Bloom

Bright areas bleeding into surrounding regions.

### Dissolution

The object itself gradually ceasing to have a defined boundary.

These mechanisms may coexist.

---

# 4.9 Temporal presence

The references imply time.

An artwork may contain several states of the same organism simultaneously.

For example:

```text
current petal
+
petal 30 ms earlier
+
petal 80 ms earlier
+
petal 200 ms earlier
```

These should not merely be translated duplicate layers.

Historical states may differ in:

- bending
- rotation
- opening angle
- deformation
- pigmentation
- transparency
- chromatic position
- diffusion

The objective is not simply motion blur.

The objective is:

> visual memory.

---

# 5. TIME AS PART OF THE ARTWORK

Time is a core parameter of PETALS.

A visitor should be able to examine the same organism at different stages of its deterministic lifespan.

Example states:

```text
DAY 1

DAY 10

DAY 100

YEAR 1

YEAR 3

YEAR 10

YEAR 20
```

These are not separate random artworks.

They are states of the same generative organism.

---

# 6. TIME MODEL

The conceptual function is:

```text
Artwork = F(
    Seed,
    Age,
    RendererVersion
)
```

Potential additional deterministic temporal state:

```text
Artwork = F(
    Seed,
    Age,
    DayState,
    RendererVersion
)
```

Where:

## Seed

Defines long-term identity.

## Age

Defines continuous developmental state.

## DayState

May provide smaller transient variations while remaining deterministic.

## RendererVersion

Ensures historical artworks remain reproducible after the engine evolves.

---

# 7. SEED = DNA

The base seed should determine characteristics that remain recognisable throughout the organism's lifespan.

Examples:

- branching tendency
- flower count tendencies
- petal family
- average petal proportion
- radial organisation
- curvature tendency
- asymmetry
- colour family
- fibre character
- motion character
- transparency character
- pigment behaviour
- compositional preference

The seed should therefore behave more like DNA than like a random-number button.

---

# 8. AGE = DEVELOPMENT

Age modifies the seed-defined organism rather than replacing it.

Age may influence:

- flower size
- branch complexity
- number of petals
- openness
- curvature
- asymmetry
- fibre density
- pigmentation
- transparency
- chromatic separation
- structural complexity
- visual memory
- dissolution
- optical softness

Age progression should be continuous.

Avoid sudden:

```text
Day 99 = A

Day 100 = completely different B
```

Instead:

```text
Day 99
 ↓
Day 99.5
 ↓
Day 100
 ↓
Day 100.5
```

should interpolate naturally.

---

# 9. DAY STATE

A deterministic secondary temporal seed may introduce small day-to-day variations.

For example:

```text
daySeed = hash(baseSeed + dayIndex)
```

Possible DayState variables:

- subtle petal motion
- wind
- pigment migration
- bloom
- fibre movement
- transparency
- colour temperature
- small deformation
- chromatic ghosting

However, adjacent days must interpolate smoothly.

The result should remain recognisably the same organism.

---

# 10. MEMORY

Past states may remain embedded within the current image.

This is one of the central artistic opportunities of PETALS.

Older artworks may contain increasing amounts of historical visual residue.

For example:

```text
Present State
+
Recent State
+
1 Year Memory
+
5 Year Memory
+
10 Year Memory
```

Each historical contribution can use different:

- opacity
- diffusion
- colour separation
- displacement
- blur
- fibre visibility
- blend mode

Therefore age does not simply mean:

> the flower becomes larger.

Age may mean:

> the image contains more history.

---

# 11. POSSIBLE AGE CHARACTER

This is not a fixed rule, but an initial artistic hypothesis.

## Young

- light
- thin
- transparent
- relatively simple
- clear structure
- low memory

## Developing

- increased branching
- richer overlap
- stronger pigmentation
- more complex fibres
- larger variation

## Mature

- strong identity
- rich colour interaction
- deeper layering
- stronger material presence

## Old

Not necessarily dead.

Possible characteristics:

- historical traces
- chromatic memory
- multiple exposures
- partial dissolution
- higher temporal complexity
- fragmented structure
- optical residue

At advanced age:

> memory may become more visually dominant than object.

---

# 12. TIME UI

The visitor should be able to explore the organism through a timeline.

The timeline is not merely an animation controller.

It represents the lifespan of the artwork.

Concept:

```text
TODAY

●────────●────────●────────●────────●────────●

1D      10D      100D      1Y      10Y      20Y
```

The visitor can scrub continuously.

The artwork morphs interactively while the timeline moves.

---

# 13. NON-LINEAR TIME SCALE

A normal linear scale would make early development occupy almost no UI space.

Therefore PETALS should consider perceptual or logarithmic time.

Example:

```text
1 DAY
10 DAYS
100 DAYS
1 YEAR
3 YEARS
10 YEARS
20 YEARS
```

with relatively balanced screen spacing.

This encourages exploration.

It also corresponds more closely to human perception of personal time.

---

# 14. PSYCHOLOGICAL EXPERIENCE

A major experiential goal is to trigger the visitor's natural curiosity about the future.

The interaction should quietly produce questions such as:

> What will this become tomorrow?

> What about one year later?

> What does it look like after ten years?

> What does it become after twenty years?

The interface should not over-explain this.

Ideally the timeline itself invites exploration.

The emotional analogy is connected to the human desire to glimpse:

> what will I become later?

PETALS should suggest this idea rather than literally representing the visitor.

---

# 15. DETERMINISM

Every meaningful source of variation must be reproducible.

Avoid dependence on:

- `Math.random()` without seeded PRNG
- real-time clock
- variable FPS
- uncontrolled frame timing
- device-dependent random inputs

Instead use:

- seeded pseudo-random generation
- deterministic growth functions
- deterministic temporal samples
- fixed simulation steps
- explicit age parameters

---

# 16. ARTWORK IDENTITY

An artwork should not be identified only by its seed.

Recommended identity:

```text
Artwork Type
+
Seed
+
Age
+
Renderer Version
```

Example:

```text
PETALS
Seed: A7C39F
Age: 3650 days
Renderer: 1.0.0
```

This allows a historical state to be reproduced later.

---

# 17. RENDERER VERSIONING

Renderer versioning is mandatory.

Example:

```text
PETALS v1.0
PETALS v1.1
PETALS v2.0
```

If the visual algorithm changes later, an artwork created under v1.0 should still be associated with v1.0.

Otherwise the same seed may unexpectedly produce a different artwork after software updates.

Canonical identity:

```text
PETALS / Renderer 1.2 / Seed A73291 / Day 3650
```

---

# 18. REPRODUCIBILITY TARGET

Two concepts must be separated.

## Visual Determinism

The artwork should reproduce:

- same composition
- same morphology
- same colour structure
- same temporal behaviour
- same visual memory
- same general pixels to human perception

This is required.

## Bit-for-Bit Determinism

Exact identical pixel values across:

- Safari
- Chrome
- macOS
- Windows
- iOS
- Android
- different GPUs

may not always be guaranteed because of GPU floating-point and implementation differences.

The first target is visual determinism.

A future canonical renderer may provide archival consistency for purchased artwork.

---

# 19. TECHNICAL DIRECTION

PETALS should be browser-native.

Preferred stack:

```text
JavaScript / TypeScript
        +
WebGL2
        +
GLSL
        +
Framebuffer / Render Targets
```

p5.js may be used if useful for:

- interaction
- UI
- canvas management
- parameter management
- seed orchestration

However, p5 Canvas 2D should not define the core rendering architecture.

---

# 20. WHY WEBGL / GLSL

The target aesthetic requires operations better suited to GPU field rendering than traditional flat 2D vector rendering.

Potential shader responsibilities:

- pigment field
- density field
- transparency
- optical transmission
- local blur
- diffusion
- edge erosion
- edge softness
- colour contamination
- noise
- displacement
- bloom
- chromatic separation
- framebuffer feedback
- temporal accumulation

The shader is not intended merely as a final visual filter.

It should participate in defining the material of the artwork.

---

# 21. PETAL AS FIELD

Do not conceptualise a petal simply as:

```text
Bezier path
+
fill()
+
opacity
```

Instead:

```text
PETAL
=
SHAPE FIELD
×
DENSITY FIELD
×
PIGMENT FIELD
×
FIBRE FIELD
×
TRANSMISSION FIELD
×
TEMPORAL FIELD
```

Each pixel may therefore contain different:

- density
- colour
- transparency
- fibre contribution
- softness
- temporal history

---

# 22. MATERIAL PIPELINE

Initial conceptual pipeline:

```text
Seed
 │
 ▼
Botanical Grammar
 │
 ▼
Petal / Stem Geometry
 │
 ▼
Density Field
 │
 ▼
Fibre Field
 │
 ▼
Pigment Field
 │
 ▼
Temporal Simulation
 │
 ▼
Material Shader
 │
 ▼
Framebuffer Compositing
 │
 ▼
Optical Processing
 │
 ▼
Final Image
```

---

# 23. BOTANICAL GRAMMAR

The engine should retain internal growth logic.

Potential variables:

```text
flowerCount
branchCount
branchAngle
branchLength
flowerScale
petalCount
petalLength
petalWidth
petalCurl
petalTwist
petalAsymmetry
openingAngle
stemCurvature
growthDirection
```

The generated organism should remain coherent even when heavily abstracted.

---

# 24. FIBRE SYSTEM

Fibre rendering may become one of the signatures of PETALS.

Potential method:

```text
Petal Root
   ↓
Directional Flow
   ↓
Curved Fibre
   ↓
Perimeter / Dissolution
```

Fibre properties:

```text
count
length
thickness
taper
opacity
softness
curvature
colour
spacing
noise
rootDensity
tipDissolution
```

Large populations of extremely fine fibres can produce surfaces without conventional fills.

GPU instancing or procedural shader methods should be investigated.

---

# 25. DENSITY / TRANSMISSION

Petals should behave more like translucent biological membranes than opaque painted surfaces.

Possible relationships:

```text
thin area
→ increased light transmission

dense area
→ stronger pigment

overlap
→ increased density

edge
→ variable dissolution
```

The target visual analogy may include:

- stained glass
- x-ray
- wet ink
- translucent film
- flower membrane
- photographic negative

without literally imitating any one medium.

---

# 26. PIGMENT DIFFUSION

Pigment diffusion should not equal Gaussian blur.

Pigment movement may have:

- direction
- uneven density
- flow
- local accumulation
- boundaries
- internal turbulence
- fibre influence

Possible techniques to explore:

- flow fields
- noise fields
- signed distance fields
- reaction-diffusion-inspired processes
- advection
- iterative framebuffer diffusion

Performance and reproducibility must be considered.

---

# 27. TEMPORAL ACCUMULATION

PETALS may render several deterministic temporal samples of the organism.

Example:

```text
P(t)
+
P(t - 1)
+
P(t - 2)
+
P(t - 4)
+
P(t - 8)
```

Each historical state may receive different:

- alpha
- blur
- displacement
- saturation
- hue
- blend mode
- chromatic channel contribution

This should create time residue rather than generic motion blur.

---

# 28. FEEDBACK BUFFER

Framebuffer feedback should be investigated.

Concept:

```text
CURRENT FRAME
+
PREVIOUS BUFFER × decay
=
NEW BUFFER
```

Before feedback, the previous frame may undergo:

- tiny scale
- translation
- rotation
- blur
- colour shift
- distortion

Possible results:

- afterimage
- smear
- memory
- long exposure
- temporal diffusion
- visual persistence

Feedback must remain deterministic.

---

# 29. CHROMATIC TIME

Chromatic separation may represent different temporal states.

Example concept:

```text
CYAN
=
organism at t - Δ1

MAGENTA
=
organism at t

YELLOW
=
organism at t + Δ2
```

This can produce temporal colour traces more organically than a simple RGB offset.

This technique should be used selectively.

---

# 30. BLENDING

Different layers may use different compositing behaviour.

Potential examples:

```text
Petal Body
→ NORMAL

Pigment
→ MULTIPLY

Transmission / Light
→ SCREEN

Glow
→ ADDITIVE

Temporal Ghost
→ SCREEN / NORMAL

Fibres
→ NORMAL / MULTIPLY

Chromatic Memory
→ SCREEN
```

Blend modes are part of the visual grammar.

---

# 31. COMPOSITION

Avoid default centred flower-generator composition.

The system should support:

- cropping
- partial forms
- off-centre structures
- flowers entering from outside the frame
- asymmetric visual weight
- directional movement
- strong negative space
- large macro petals
- sparse compositions
- dense overlapping compositions

Composition parameters may include:

```text
cropBias
frameEntry
offset
scale
rotation
negativeSpace
topWeight
bottomWeight
diagonalFlow
densityDistribution
```

---

# 32. CONTROLLED VARIANCE

Do not independently randomise every parameter.

Independent randomness usually creates incoherent output.

PETALS should use correlated parameter families.

For example:

```text
if dissolution increases:

    edgeDefinition decreases
    ghost increases
    opacity decreases
    blur increases
    visibleVeins may decrease
```

Another example:

```text
if fibreStyle increases:

    fibreCount increases
    line precision increases
    bodyFill decreases
    blur decreases
    overlap complexity may increase
```

This creates coherent aesthetic states.

---


# 33. STYLE SPACE
The reference material suggests several possible visual archetypes.
These should not become separate engines.
They should occupy different regions of the same parameter space.
Initial archetypes:
Floating / Diffused
- broad petals
- low edge certainty
- vertical temporal movement
- warm transparency
Vein Ghost
- visible internal fibre
- branching
- multiple exposure
- pale body material
Chromatic Bloom
- large macro petals
- strong magenta/orange/cyan interaction
- soft overlaps
Dissolved Botanical
- low botanical recognition
- large blur fields
- abstract organic masses
Fibre Flower
- dense parametric hairlines
- high structural precision
- transparent surfaces
Spectral Flower
- multi-flower composition
- chromatic temporal separation
- strong overlap
- vertical streaks
These should eventually blend continuously rather than exist as presets only.

# 34. BOTANICAL COHERENCE
Potential control:
botanicalCoherence = 0.0 → 1.0
Conceptually:
1.0
recognisable botanical structure

0.7
believable imaginary flower

0.4
botanical abstraction

0.1
organic colour organism
Even at low botanical coherence, retain some growth logic.

# 35. FIRST IMPLEMENTATION GOAL
PETALS v0.1 should not attempt to finish the entire platform.
It should prove that the rendering concept works.
Primary v0.1 success criteria:
1. A deterministic seed produces a consistent organism.
2. Moving time does not generate unrelated artwork.
3. The same organism visibly develops over age.
4. The image does not look like conventional vector illustration.
5. Transparency and overlap produce convincing depth.
6. Fibre structures contribute organically to petals.
7. Selective softness is visible.
8. Temporal accumulation produces convincing memory.
9. The timeline can be scrubbed interactively.
10. The renderer remains usable inside a normal browser.

# 36. V0.1 NON-GOALS
Do not prioritise yet:
- login
- account system
- POD provider
- checkout
- social sharing
- gallery
- database
- cloud render farm
- high-resolution purchase system
- final mobile UX
- commercial onboarding
These belong to later platform integration.
First prove the artwork.

# 37. DEVELOPMENT METHODOLOGY
Development should proceed by visual systems rather than by feature count.
Recommended sequence:
Phase 01 — Deterministic Foundation
Build:
- seeded PRNG
- artwork identity
- deterministic parameter generation
- age system
- renderer version
Success:
Same input produces the same state.

Phase 02 — Botanical Skeleton
Build:
- stem
- branches
- flower anchors
- petal organisation
- growth morphology
Do not focus on visual polish yet.
Success:
The same seed remains recognisably related across time.

Phase 03 — Petal Material
Build:
- density
- transparency
- spatial opacity
- pigment variation
- local edge behaviour
Success:
Petals stop looking like flat vector shapes.

Phase 04 — Fibre Structure
Build:
- fibre direction
- fibre count
- taper
- curvature
- colour variation
- opacity variation
Success:
Surface can partially emerge from fibres.

Phase 05 — Optical System
Build:
- selective blur
- diffusion
- bloom
- dissolution
- edge softness
Success:
Image begins approaching reference softness.

Phase 06 — Temporal System
Build:
- virtual time
- deterministic state interpolation
- age morphing
- historical sampling
Success:
Time produces meaningful organic transformation.

Phase 07 — Memory / Feedback
Build:
- framebuffer feedback
- previous-state accumulation
- decay
- historical traces
Success:
The organism visually contains aspects of its past.

Phase 08 — Chromatic Time
Experiment with:
- channel displacement
- historical colour separation
- spectral overlap
Success:
Colour becomes temporally expressive without looking like a digital glitch effect.

Phase 09 — Timeline UI
Build minimal interface for:
1D
10D
100D
1Y
3Y
10Y
20Y
plus continuous scrub.
Success:
Exploring time becomes intuitive and compelling.

Phase 10 — Visual Calibration
Compare generated output against reference aesthetic.
Evaluate:
- excessive vector appearance
- overly clean edges
- generic generative-art look
- insufficient depth
- excessive noise
- insufficient temporal presence
- weak composition
- weak material behaviour
Iterate until the artwork itself is convincing.

# 38. PERFORMANCE STRATEGY
The browser experience should remain responsive.
Potential strategy:
Interactive Preview
Render at moderate resolution.
Example:
1080 × 1080
or
1440 × 1440
while scrubbing.
Idle Refinement
When the user stops interacting:
- increase sample count
- improve diffusion
- improve temporal accumulation
- increase fibre fidelity
High-Resolution Output
Later:
4096 × 4096
8192 × 8192
using the same seed, age and renderer version.
High-resolution output should ideally be re-rendered, not merely upscaled.

# 39. FUTURE PLATFORM INTEGRATION
PETALS will eventually live inside the broader generative-art / POD platform together with works such as KOI.
The artwork engine should therefore remain modular.
Conceptual API:
PETALS.render({
    seed,
    age,
    resolution,
    rendererVersion
})
Possible output:
canvas
texture
imageBitmap
PNG
metadata
The UI should not be tightly coupled to the rendering engine.

# 40. POSSIBLE PROJECT STRUCTURE
Initial proposal:
_06_petals_time/
│
├── PETALS_TIME_SPEC.md
│
├── index.html
│
├── src/
│   │
│   ├── main.js
│   │
│   ├── core/
│   │   ├── seed.js
│   │   ├── prng.js
│   │   ├── genome.js
│   │   ├── time.js
│   │   └── version.js
│   │
│   ├── botanical/
│   │   ├── organism.js
│   │   ├── stem.js
│   │   ├── branch.js
│   │   ├── flower.js
│   │   └── petal.js
│   │
│   ├── render/
│   │   ├── renderer.js
│   │   ├── framebuffer.js
│   │   ├── fibres.js
│   │   ├── temporal.js
│   │   └── composite.js
│   │
│   ├── shaders/
│   │   ├── petal.vert.glsl
│   │   ├── petal.frag.glsl
│   │   ├── fibre.vert.glsl
│   │   ├── fibre.frag.glsl
│   │   ├── diffusion.frag.glsl
│   │   ├── feedback.frag.glsl
│   │   ├── chromatic.frag.glsl
│   │   └── composite.frag.glsl
│   │
│   └── ui/
│       ├── timeline.js
│       ├── controls.js
│       └── debug.js
│
├── styles/
│   └── main.css
│
├── references/
│
└── tests/
This structure is provisional.
It should remain simple during experimentation and only become more formal where necessary.

# 41. DEBUG / ARTIST CONTROL
During development, expose internal parameters through a debug interface.
Possible controls:
Seed

Age

Botanical Coherence

Petal Count

Petal Length

Petal Width

Opening

Curl

Twist

Fibre Density

Pigment Density

Transparency

Edge Diffusion

Dissolution

Temporal Exposure

Memory Strength

Feedback

Bloom

Chromatic Separation

Colour Drift
The production visitor should not see this complete interface.
It is an artist-development instrument.

# 42. PARAMETER DISCOVERY
The purpose of the debug interface is not to turn PETALS into a manual drawing program.
It is to discover:
- meaningful parameter ranges
- correlated parameter families
- strong visual regions
- unstable combinations
- undesirable output
- aesthetic attractors
The final generator should then encode these discoveries into its generative genome.

# 43. QUALITY PRINCIPLE
A technically complex renderer does not automatically create good art.
For every visual mechanism ask:
Does this improve the PETALS aesthetic?
If not, remove it.
Do not retain techniques merely because they demonstrate technical sophistication.
The priority order is:
AESTHETIC
>
COHERENCE
>
EXPERIENCE
>
PERFORMANCE
>
TECHNICAL NOVELTY
Performance must remain sufficient for browser use, but visual quality is the reason for the system to exist.

# 44. ARTISTIC CONSTRAINT
PETALS should not become:
- a flower illustration app
- a particle toy
- a kaleidoscope
- a generic shader demo
- a random abstract wallpaper generator
- a realistic plant simulator
It should retain a distinctive visual identity centred on:
BOTANY
+
LIGHT
+
TRANSPARENCY
+
PIGMENT
+
TIME
+
MEMORY

# 45. CENTRAL QUESTION
During development, continuously ask:
Does this feel like a living image that has existed through time?
rather than:
Does this look like a technically generated flower?
This distinction should guide the project.

# 46. LONG-TERM EXPERIENCE
Ultimately, a visitor may not simply purchase an image.
They may own a particular generative organism.
For example:
PETALS A73291
could exist as:
Day 1
Day 100
Year 1
Year 5
Year 10
Year 20
A collector could choose different moments in the same artwork's lifespan.
The same organism may therefore produce multiple meaningful physical works over time.
This creates the possibility of a longitudinal artwork rather than a single static generative poster.

# 47. PRODUCT / PLATFORM POSSIBILITY
Future experience:
Create PETALS
      ↓
Receive identity
      ↓
Explore timeline
      ↓
Choose a moment
      ↓
Save to collection
      ↓
Print / purchase
      ↓
Return later
      ↓
Explore another age
This concept may eventually connect:
- generative art
- personal collection
- digital ownership
- POD
- gifting
- long-term engagement
These are later commercial layers and should not compromise the artwork itself.

# 48. FIRST PRINCIPLE
PETALS is not fundamentally about generating flowers.
PETALS is about generating:
the visual memory of a living form moving through time.
The flower provides biological structure.
The renderer provides perception.
Time provides transformation.
Memory provides history.
The visitor provides curiosity.

# 49. V0.1 WORKING STATEMENT
PETALS / TIME v0.1
Build a deterministic, browser-native living botanical artwork in WebGL2 and GLSL in which one seed defines a persistent organism, a continuous timeline reveals its development from days to decades, and translucent material, fibre structure, pigment diffusion, temporal accumulation and optical softness transform the botanical form into a non-vector visual memory.

# 50. NEXT ACTION
Before building the wider platform:
1. Establish deterministic seed architecture.
2. Establish continuous age model.
3. Establish basic botanical morphology.
4. Build first GPU petal material.
5. Build fibre field.
6. Build temporal render accumulation.
7. Build basic timeline scrubber.
8. Conduct visual study against the reference images.
9. Refine until the PETALS visual identity is convincing.
10. Only then expand toward production platform integration.


# 51. v0.1 implementation contract

Renderer version: 0.1.0. Year = 365 virtual days; supported age is 1–7300 days. Age is canonicalized to six decimal places. Identity includes PETALS, exact seed string, ageDays, and rendererVersion. No wall clock or unseeded randomness enters the engine.

The initial renderer uses seeded persistent flower anchors and petal descriptors, continuous analytic growth, procedural GLSL membrane/fibre fields, fixed historical samples, RGBA8 ping-pong render targets, directional diffusion and optical compositing. Buffers are cleared and reconstructed on every requested state, eliminating scrub-history dependence. This is a bounded historical quadrature, not a full daily simulation.

Modules expose a canvas renderer independent of the interface for future KOI/POD integration. Canonical portrait output is 900 × 1200 by default. A URL preserves all identity fields. PNG and JSON exports preserve the selected moment. Cross-GPU bitwise equality is not promised; repeated pixels on the same context and resolution are tested.

Validation: seed/state unit tests; all six age milestones; reverse and out-of-order rendering pixel comparisons; seed variance; shader compilation and framebuffer completeness; browser visual review. Reference convergence remains an artistic iteration, not a claim of matching all six reference styles in v0.1.


# 52. v0.2 — Daily animation and living contours

Requested revision: one animated frame represents one virtual day. Default autoplay, pause/play, single-day stepping, and selectable 6/12/24-day-per-second presentation pace. Each rendered playback step advances to the next integer day; fractional scrub positions resume at the next day boundary. No skipped-day catch-up. Hidden-tab time does not advance the organism. At Day 7300 playback stops; Replay starts again at Day 1. Selecting a milestone, scrubbing, or exporting pauses playback.

Daily deterministic rhythms alter angular sweep, opening range, bending arc, fold, tip length, contour fullness, and edge-wave amplitude and phase. The rhythm phases derive from persistent seed DNA. Every historical sample evaluates these rhythms at its own virtual age. Growth remains a slow developmental envelope, with visible daily contour changes independent of size.

Version is now 0.2.0; the original 0.1.0 renderer and interface remain runnable in versions/0.1.0/ so old identities retain their original appearance. The current renderer rejects unsupported versions.

Birthday and birth-time inputs anchor the displayed virtual calendar: Day 1 is the entered birth date/time, Day 2 is 24 hours later. Calendar labels use floating civil time, without device timezone conversion. No birthday is invented by default. Fields persist in the local URL fragment and identity export; they do not change seed DNA. Stop preserves the current frame and the scrubber can move in either direction.


## v0.3 — Centred time and spectral pigment

Timeline: −20 years, −10 years, Now, +10 years, +20 years. Now sits exactly at 50%. The entered birthday and birth time are the fixed virtual Now anchor, not the wall clock. Random fills a valid date (1940–2025) and minute, then stops at Now. Only this explicit button uses browser cryptographic randomness; selected values persist in the URL and metadata. Seed identity remains unchanged.

Renderer 0.3.0 represents the 40-year window with internal ageDays 1–14601; Now is 7301 and signed offset = ageDays − 7301. Pigment shifts smoothly through 2.35 hue cycles over the window. Historic samples carry their own hues. Daily animation and Stop/scrub remain available. Versions 0.1.0 and 0.2.0 are preserved under versions/.

Life-stage refinement: a continuous correlated shape envelope changes width, length-to-width ratio, contour roundness, curl, fan opening, late folds, opacity and memory over the full 40-year interval. Young forms are narrow and curved; middle stages are broad and rounded; later forms fold and retain more history. Overall scale changes only modestly. Daily rhythms remain superimposed and deterministic.


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


## Renderer 0.8.0 — Late-life membrane dissolution

After Now, stroked-petal fill opacity and its fibre/vein fill contributions decline continuously to zero at +20 years. Contour strokes remain. Unstroked petals keep their fills. The selected age also gates corresponding historical membranes, preventing temporal accumulation from restoring the disappearing fill. Fractionally participating strokes transition smoothly; any participating stroke has zero fill at the endpoint. Previous renderer archived under versions/0.7.0/.
