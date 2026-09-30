# PETALS v0.1 validation

Validated on 2026-09-29 in the Codex in-app browser on this Mac.

- Five core tests passed: stable genome, different seeds, all six timeline milestones, bounded ordered historical samples, continuous morphology, and identity validation.
- WebGL2 shaders compiled and linked; all three framebuffers were complete; no WebGL errors were reported by the browser test.
- At 300 × 400, all six milestone images reproduced pixel-for-pixel after out-of-order age requests. Every milestone was distinct, and a different seed changed the pixels.
- The 900 × 1200 interactive canvas was visually reviewed. Day 1, Year 20, and a fractional scrubber age were exercised through the interface.
- Visual iteration reduced excessive overlap darkness and restrained muddy colour mixing.
- Compact layout was checked and percentage grid spacing was corrected.

## Limits

GPU bitwise reproducibility was tested within one browser/context at one test resolution, not across devices. No performance benchmark or cross-browser compatibility matrix has been completed. The renderer is an initial visual study; it does not yet match all six reference styles. The saved reference images and original specification were preserved.

## v0.2 daily animation

Nine core tests pass, including daily shape changes, continuity, single-day advancement, and leap-day calendar arithmetic. All six GPU milestones reproduce after arbitrary scrubbing. Before the final edge-ramp correction, average adjacent-day RGB differences at 300 × 400 were 2.334 at Day 10, 3.729 at Day 365, and 3.566 at Day 3650 (8-bit channel units). Browser interaction verified Stop, +1 day, forward/backward scrubbing, and birth-date/time calendar labels including February 29. A historical uniform leak into stem length was caught and corrected.

## Studio UI adoption — 2026-09-30

Read the _geo_art HTML, styles and interaction modules directly at the user's request. Copied the local font, four music tracks/playlist, interpretation controls, and interior preview assets into PETALS. Reference source was left unchanged.

Thirteen core tests pass, including reproducible birthday/time-derived Coral, Spectral and Veil seeds. JavaScript syntax, unique element IDs, control bindings, static resources and playlist paths were checked. Browser visual/interaction validation could not run: the browser security policy check was unavailable. High-resolution PNG export, text manipulation, audio playback and recipe upload therefore remain unverified in the browser for this UI revision.


## v0.4 colour and background validation

16 core tests pass. Tests verify fifteen distinct take/moment palettes, five distinct ground colours per take, independently varying material parameters, interpolation continuity, deterministic origin bias, and background exclusion from pigment palettes. The fifteen-image browser harness checks GPU replay and background pixels when opened. Browser visual validation has not yet been completed for this revision.
