// ============================================================
// PhysarumAudio — Generative sound system for <physarum>
// Sonifies simulation behavior through A minor pentatonic scale
// ============================================================

// -- Tone.js Lazy Loader ------------------------------------------------

let Tone = null;
let _toneLoadPromise = null;

async function loadTone() {
  if (Tone) return Tone;
  if (_toneLoadPromise) return _toneLoadPromise;
  _toneLoadPromise = import('https://esm.sh/tone@14.7.77')
    .then(mod => { Tone = mod; return Tone; })
    .catch(err => {
      console.warn('[PhysarumAudio] Failed to load Tone.js:', err);
      _toneLoadPromise = null;
      return null;
    });
  return _toneLoadPromise;
}

// -- Scale Constants ----------------------------------------------------

// A minor pentatonic notes per species register
export const ALPHA_NOTES = Object.freeze(['A2', 'C3', 'D3', 'E3', 'G3', 'A3']);
export const BETA_NOTES  = Object.freeze(['A3', 'C4', 'D4', 'E4', 'G4', 'A4']);
export const GAMMA_NOTES = Object.freeze(['A4', 'C5', 'D5', 'E5', 'G5', 'A5']);
export const SIMPLE_NOTES = BETA_NOTES; // Simple mode uses mid register

// Complex ecosystem species registers
export const HERBIVORE_NOTES = Object.freeze(['A2', 'C3', 'D3', 'E3', 'G3', 'A3']); // Low register — bass foundation (like alpha)
export const PREDATOR_NOTES  = Object.freeze(['A3', 'C4', 'D4', 'E4', 'G4', 'A4']); // Mid register — menacing (like beta)
export const SCAVENGER_NOTES = Object.freeze(['A4', 'C5', 'D5', 'E5', 'G5', 'A5']); // Mid-high register — busy (like gamma)
export const SYMBIONT_NOTES  = Object.freeze(['A5', 'C6', 'D6', 'E6', 'G6', 'A6']); // Sparkle register — bright, airy

// All pentatonic notes across the full range (A2–A5)
export const ALL_NOTES = Object.freeze([
  'A2', 'C3', 'D3', 'E3', 'G3',
  'A3', 'C4', 'D4', 'E4', 'G4',
  'A4', 'C5', 'D5', 'E5', 'G5', 'A5',
]);

// All pentatonic notes across the extended range (A2–A6, includes symbiont sparkle)
export const ALL_NOTES_COMPLEX = Object.freeze([
  'A2', 'C3', 'D3', 'E3', 'G3',
  'A3', 'C4', 'D4', 'E4', 'G4',
  'A4', 'C5', 'D5', 'E5', 'G5',
  'A5', 'C6', 'D6', 'E6', 'G6', 'A6',
]);

// Species → note array mapping
const SPECIES_NOTES = Object.freeze({
  alpha: ALPHA_NOTES,
  beta:  BETA_NOTES,
  gamma: GAMMA_NOTES,
  simple: SIMPLE_NOTES,
});

// Complex species → note array mapping
const SPECIES_NOTES_COMPLEX = Object.freeze({
  herbivore: HERBIVORE_NOTES,
  predator:  PREDATOR_NOTES,
  scavenger: SCAVENGER_NOTES,
  symbiont:  SYMBIONT_NOTES,
});

// Max simultaneous voices per species synth
const MAX_VOICES = 4;

// -- Density Grid Constants ------------------------------------------------

// Maximum grid resolution for density sampling
export const DENSITY_COLS = 64;
export const DENSITY_ROWS = 64;

// Sample density every N frames (~15Hz at 60fps)
export const DENSITY_SAMPLE_INTERVAL = 4;

// Minimum agents per cell to be considered a "hot" cell for note triggering
export const DENSITY_THRESHOLD = 3;

// -- Note Triggering Constants ------------------------------------------------

// Max notes triggered per species per density sample cycle
export const MAX_NOTES_PER_CYCLE = 4;

// Density value at which velocity reaches maximum (cells denser than this are capped at 1.0)
export const DENSITY_VELOCITY_CAP = 20;

// Minimum velocity for density-triggered notes (quietest possible note)
export const MIN_NOTE_VELOCITY = 0.3;

// Duration for density-triggered notes (Tone.js time notation: eighth note)
export const NOTE_DURATION = '8n';

// -- Population Dynamics Constants --------------------------------------------

// Population ratio below which a species is considered near extinction (single fragile note)
export const POP_EXTINCTION_RATIO = 0.05;

// Population ratio below which a species has sparse, thin output (fewer notes)
export const POP_LOW_RATIO = 0.25;

// Population ratio above which a species dominates the mix (full voice count)
export const POP_HIGH_RATIO = 0.50;

// Species index → name mapping (matches GPU agent buffer layout)
const SPECIES_INDEX_MAP = Object.freeze(['alpha', 'beta', 'gamma']);

// Complex mode species index → name mapping (4 species, matches complex agent shader)
export const SPECIES_INDEX_MAP_COMPLEX = Object.freeze(['herbivore', 'predator', 'scavenger', 'symbiont']);

// -- Behavioral State Constants -----------------------------------------------

// Behavioral state indices (match GPU agent buffer at offset +10)
export const STATE_FORAGE = 0;
export const STATE_FLEE = 1;
export const STATE_HUNT = 2;

// Envelope presets per behavioral state
export const BEHAVIOR_ENVELOPES = Object.freeze({
  forage: Object.freeze({ attack: 0.2, decay: 0.3, sustain: 0.4, release: 0.8 }),
  flee:   Object.freeze({ attack: 0.05, decay: 0.15, sustain: 0.3, release: 0.4 }),
  hunt:   Object.freeze({ attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.15 }),
});

// Note duration in seconds per behavioral state
export const BEHAVIOR_DURATION_FORAGE = 0.25;   // Sustained (calm)
export const BEHAVIOR_DURATION_FLEE = 0.125;     // Faster triggering (tension)
export const BEHAVIOR_DURATION_HUNT = 0.0625;    // Staccato (aggression)

// Pitch bias per behavioral state (fraction of note range to shift)
export const BEHAVIOR_PITCH_BIAS_FLEE = 0.15;    // Higher pitch tendency
export const BEHAVIOR_PITCH_BIAS_HUNT = -0.15;   // Lower pitch tendency

// -- Environmental Event Constants -------------------------------------------

// Event type identifiers (match parent component's event types)
export const EVENT_BLOOM = 'bloom';
export const EVENT_DROUGHT = 'drought';
export const EVENT_PLAGUE = 'plague';
export const EVENT_CATASTROPHE = 'catastrophe';

// Plague dissonant note arrays — adds b5 (Eb) and b2 (Bb) to each register
export const PLAGUE_NOTES_ALPHA  = Object.freeze(['A2', 'Bb2', 'C3', 'D3', 'Eb3', 'E3', 'G3', 'A3']);
export const PLAGUE_NOTES_BETA   = Object.freeze(['A3', 'Bb3', 'C4', 'D4', 'Eb4', 'E4', 'G4', 'A4']);
export const PLAGUE_NOTES_GAMMA  = Object.freeze(['A4', 'Bb4', 'C5', 'D5', 'Eb5', 'E5', 'G5', 'A5']);
export const PLAGUE_NOTES_SIMPLE = PLAGUE_NOTES_BETA;

// Complex species plague dissonant note arrays
export const PLAGUE_NOTES_HERBIVORE = Object.freeze(['A2', 'Bb2', 'C3', 'D3', 'Eb3', 'E3', 'G3', 'A3']);
export const PLAGUE_NOTES_PREDATOR  = Object.freeze(['A3', 'Bb3', 'C4', 'D4', 'Eb4', 'E4', 'G4', 'A4']);
export const PLAGUE_NOTES_SCAVENGER = Object.freeze(['A4', 'Bb4', 'C5', 'D5', 'Eb5', 'E5', 'G5', 'A5']);
export const PLAGUE_NOTES_SYMBIONT  = Object.freeze(['A5', 'Bb5', 'C6', 'D6', 'Eb6', 'E6', 'G6', 'A6']);

// Bloom: reverb swell + crescendo + note multiplication
export const BLOOM_REVERB_WET = 0.85;
export const BLOOM_VOLUME_BOOST_DB = 6;
export const BLOOM_NOTE_MULTIPLIER = 2;

// Drought: low-pass sweep + sparse notes
export const DROUGHT_FILTER_TARGET = 400;
export const DROUGHT_NOTE_DIVISOR = 2;

// Plague: harsh FM timbre (high modulation index simulates distortion)
export const PLAGUE_MODULATION_INDEX = 30;

// Catastrophe: silence then single-note rebuild
export const CATASTROPHE_SILENCE_FRAMES = 120; // ~2s at 60fps before rebuild
export const CATASTROPHE_REBUILD_VOLUME = 0.15; // Very low volume for rebuild phase

// -- Click/Touch Sonic Pulse Constants ----------------------------------------

// Bell-like envelope for click pulse (fast attack, medium decay, no sustain)
export const CLICK_PULSE_ENVELOPE = Object.freeze({
  attack: 0.005,
  decay: 0.3,
  sustain: 0.0,
  release: 0.6,
});

// Duration for click pulse note (seconds)
export const CLICK_PULSE_DURATION = 0.4;

// Velocity for click pulse (fairly prominent above ambient)
export const CLICK_PULSE_VELOCITY = 0.8;

// Radius in grid cells to search for dominant species around click point
export const CLICK_SPECIES_SEARCH_RADIUS = 2;

// Minimum interval (ms) between drag pulses to avoid saturation
export const DRAG_PULSE_INTERVAL = 80;

// Velocity for drag pulses (slightly softer than click)
export const DRAG_PULSE_VELOCITY = 0.6;

// Duration for drag pulse notes (shorter than click for staccato trail)
export const DRAG_PULSE_DURATION = 0.2;

// Envelope for drag pulses (tighter than click bell)
export const DRAG_PULSE_ENVELOPE = Object.freeze({
  attack: 0.003,
  decay: 0.15,
  sustain: 0.0,
  release: 0.3,
});

// -- Morph Sonic Crossfade Constants -----------------------------------------

// Sonic character per mask type: stereo spread, filter multiplier, note density multiplier
// libre = wide open soundscape; text/image/3d = more concentrated
export const MORPH_SONIC_PROFILES = Object.freeze({
  libre:  Object.freeze({ stereoSpread: 1.0, filterMul: 1.0,  noteDensityMul: 1.0 }),
  text:   Object.freeze({ stereoSpread: 0.5, filterMul: 0.7,  noteDensityMul: 0.6 }),
  image:  Object.freeze({ stereoSpread: 0.6, filterMul: 0.8,  noteDensityMul: 0.8 }),
  '3d':   Object.freeze({ stereoSpread: 0.7, filterMul: 0.8,  noteDensityMul: 0.7 }),
});

// Default sonic profile when mask type is unknown
export const MORPH_SONIC_DEFAULT = MORPH_SONIC_PROFILES.libre;

// -- Mode Crossfade Constants -----------------------------------------------

// Duration in seconds for the volume crossfade when switching simple↔ecosystem
export const MODE_CROSSFADE_DURATION = 0.5;

// Frames to wait before disposing old channels (~0.6s at 60fps, slightly longer than audio ramp)
export const MODE_CROSSFADE_FRAMES = 36;

// Default FM synth options — warm, organic timbre
const FM_SYNTH_OPTIONS = Object.freeze({
  harmonicity: 3,
  modulationIndex: 10,
  oscillator: { type: 'sine' },
  envelope: {
    attack: 0.2,
    decay: 0.3,
    sustain: 0.4,
    release: 0.8,
  },
  modulation: { type: 'sine' },
  modulationEnvelope: {
    attack: 0.3,
    decay: 0.2,
    sustain: 0.5,
    release: 0.8,
  },
});

// -- PhysarumAudio Class ------------------------------------------------

export class PhysarumAudio {

  /**
   * @param {HTMLElement} parentElement — the <physarum> component instance
   */
  constructor(parentElement) {
    this._parent = parentElement;
    this._initialized = false;
    this._muted = true;
    this._paused = false;
    this._mode = 'simple';
    this._destroyed = false;

    // Shared nodes
    this._masterVolume = null;
    this._reverb = null;

    // Per-species channels: { alpha: { synth, panner, filter, volume, notes }, ... }
    this._channels = {};

    // Config state
    this._masterLevel = 0.7;   // 0–1
    this._reverbWet = 0.4;     // 0–1
    this._filterCutoff = 4000; // Hz
    this._speciesLevels = { alpha: 1, beta: 1, gamma: 1, herbivore: 1, predator: 1, scavenger: 1, symbiont: 1 };
    this._speciesMuted = { alpha: false, beta: false, gamma: false, herbivore: false, predator: false, scavenger: false, symbiont: false };

    // Population dynamics state
    this._popCounts = null;         // { alpha: N, beta: N, gamma: N, total: N } from parent

    // Behavioral state proportions per species
    // { alpha: { forage: 0-1, flee: 0-1, hunt: 0-1 }, beta: ..., gamma: ... }
    this._behaviorState = null;

    // Environmental event state
    this._activeEvent = null;       // current event type or null
    this._preEventState = null;     // saved state before event for restoration
    this._catastropheStartFrame = null;
    this._catastropheRebuilding = false;

    // Mode crossfade state
    this._fadingOutChannels = null;       // old channels being faded out during mode switch
    this._modeCrossfadeStartFrame = null; // frame when crossfade started
    this._modeCrossfading = false;        // true while crossfade is in progress
    this._fadingInTargetDb = {};          // target dB for each new channel being faded in

    // Morph sonic crossfade state
    this._morphProgress = 0;        // 0–1, tracks visual morph progress
    this._morphFromType = null;     // mask type of morph source ('libre'|'text'|'image'|'3d')
    this._morphToType = null;       // mask type of morph target
    this._isMorphing = false;       // true while morph transition is active

    // Density grid state
    this._densityGrid = null;       // { species: Uint16Array(COLS*ROWS), ... }
    this._lastDensitySample = -DENSITY_SAMPLE_INTERVAL; // trigger first sample immediately
    this._simState = null;          // fed by parent: { agentData, agentCount, stride, simWidth, simHeight }

    // Drag pulse throttle
    this._lastDragPulseTime = 0;    // timestamp of last drag pulse (ms)
  }

  // -- Initialization ---------------------------------------------------

  /**
   * Initialize audio engine. Requires user gesture for Tone.start().
   * @returns {Promise<boolean>} true if init succeeded
   */
  async init() {
    if (this._initialized || this._destroyed) return this._initialized;

    const T = await loadTone();
    if (!T || this._destroyed) return false;

    try {
      await T.start();
    } catch (err) {
      console.warn('[PhysarumAudio] Tone.start() failed (needs user gesture):', err);
      return false;
    }

    // Shared master chain: Reverb → MasterVolume → Destination
    this._masterVolume = new T.Volume(T.gainToDb(this._masterLevel)).toDestination();
    this._masterVolume.mute = true; // Start muted

    this._reverb = new T.Reverb({ decay: 3, wet: this._reverbWet });
    this._reverb.connect(this._masterVolume);

    // Build channels for current mode
    this._buildChannels();

    this._initialized = true;
    this._muted = true;
    return true;
  }

  // -- Channel Management -----------------------------------------------

  /**
   * Build per-species synth channels based on current mode.
   */
  _buildChannels() {
    // Tear down existing channels
    this._destroyChannels();

    // (Re)initialize density grid for current mode
    this._initDensityGrid();

    if (this._mode === 'complex') {
      this._createChannel('herbivore', HERBIVORE_NOTES);
      this._createChannel('predator', PREDATOR_NOTES);
      this._createChannel('scavenger', SCAVENGER_NOTES);
      this._createChannel('symbiont', SYMBIONT_NOTES);
    } else if (this._mode === 'ecosystem') {
      this._createChannel('alpha', ALPHA_NOTES);
      this._createChannel('beta', BETA_NOTES);
      this._createChannel('gamma', GAMMA_NOTES);
    } else {
      this._createChannel('simple', SIMPLE_NOTES);
    }
  }

  /**
   * Create a single species channel with synth and effects chain.
   * Chain: PolySynth → Panner → Filter → Volume → shared Reverb
   */
  _createChannel(name, notes) {
    if (!Tone) return;

    const panner = new Tone.Panner(0);
    const filter = new Tone.Filter({
      frequency: this._filterCutoff,
      type: 'lowpass',
      rolloff: -12,
    });
    const volume = new Tone.Volume(0);

    // Connect chain: panner → filter → volume → reverb
    panner.connect(filter);
    filter.connect(volume);
    volume.connect(this._reverb);

    const synth = new Tone.PolySynth(Tone.FMSynth, {
      maxPolyphony: MAX_VOICES,
      ...FM_SYNTH_OPTIONS,
    });
    synth.connect(panner);

    // Apply per-species level if applicable
    const speciesLevel = this._speciesLevels[name] ?? 1;
    volume.volume.value = Tone.gainToDb(speciesLevel);
    volume.mute = this._speciesMuted[name] ?? false;

    this._channels[name] = { synth, panner, filter, volume, notes };
  }

  /**
   * Dispose all channels and their audio nodes.
   */
  _destroyChannels() {
    for (const key of Object.keys(this._channels)) {
      const ch = this._channels[key];
      ch.synth.releaseAll();
      ch.synth.dispose();
      ch.panner.dispose();
      ch.filter.dispose();
      ch.volume.dispose();
    }
    this._channels = {};
  }

  // -- Mode Switching ---------------------------------------------------

  /**
   * Switch between 'simple' and 'ecosystem' voice configuration.
   * Crossfades voices: old channels fade out while new channels fade in
   * over MODE_CROSSFADE_DURATION seconds for a smooth transition.
   * @param {'simple'|'ecosystem'|'complex'} mode
   */
  setMode(mode) {
    if (mode === this._mode) return;
    this._mode = mode;
    if (this._initialized) {
      this._crossfadeToMode();
    }
  }

  /**
   * Perform a crossfade from current channels to new mode channels.
   * Old channels fade to silence, new channels fade in from silence.
   */
  _crossfadeToMode() {
    // If already crossfading, dispose old fading channels immediately
    this._disposeFadingChannels();

    // Move current channels to fading-out set
    const oldChannels = this._channels;
    this._channels = {};

    // Release all playing notes and ramp old channels to silence
    for (const ch of Object.values(oldChannels)) {
      ch.synth.releaseAll();
      if (ch.volume.volume.rampTo) {
        ch.volume.volume.rampTo(-60, MODE_CROSSFADE_DURATION);
      } else {
        ch.volume.volume.value = -60;
      }
    }
    this._fadingOutChannels = oldChannels;
    this._modeCrossfadeStartFrame = null; // set on first update()
    this._modeCrossfading = true;

    // Re-initialize density grid for new mode
    this._initDensityGrid();

    // Build new channels for the target mode
    if (this._mode === 'complex') {
      this._createChannel('herbivore', HERBIVORE_NOTES);
      this._createChannel('predator', PREDATOR_NOTES);
      this._createChannel('scavenger', SCAVENGER_NOTES);
      this._createChannel('symbiont', SYMBIONT_NOTES);
    } else if (this._mode === 'ecosystem') {
      this._createChannel('alpha', ALPHA_NOTES);
      this._createChannel('beta', BETA_NOTES);
      this._createChannel('gamma', GAMMA_NOTES);
    } else {
      this._createChannel('simple', SIMPLE_NOTES);
    }

    // Start new channels very quiet and ramp up to target volume
    this._fadingInTargetDb = {};
    for (const [name, ch] of Object.entries(this._channels)) {
      const targetDb = ch.volume.volume.value;
      this._fadingInTargetDb[name] = targetDb;
      ch.volume.volume.value = -60;
      if (ch.volume.volume.rampTo) {
        ch.volume.volume.rampTo(targetDb, MODE_CROSSFADE_DURATION);
      }
    }
  }

  /**
   * Dispose channels that were fading out from a mode switch.
   */
  _disposeFadingChannels() {
    if (!this._fadingOutChannels) return;
    for (const ch of Object.values(this._fadingOutChannels)) {
      ch.synth.releaseAll();
      ch.synth.dispose();
      ch.panner.dispose();
      ch.filter.dispose();
      ch.volume.dispose();
    }
    this._fadingOutChannels = null;
    this._modeCrossfadeStartFrame = null;
    this._modeCrossfading = false;
    this._fadingInTargetDb = {};
  }

  // -- Mute / Unmute ----------------------------------------------------

  /**
   * Unmute audio output. Ensures Tone.js context is started.
   * @returns {Promise<boolean>} true if unmuted successfully
   */
  async unmute() {
    if (!this._initialized) {
      const ok = await this.init();
      if (!ok) return false;
    }

    try {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
    } catch {
      return false;
    }

    this._muted = false;
    if (this._masterVolume) {
      this._masterVolume.mute = false;
    }
    return true;
  }

  /**
   * Mute audio output (audio engine stays alive).
   */
  mute() {
    this._muted = true;
    if (this._masterVolume) {
      this._masterVolume.mute = true;
    }
  }

  /**
   * Toggle mute state.
   * @returns {Promise<boolean>} new muted state
   */
  async toggleMute() {
    if (this._muted) {
      await this.unmute();
    } else {
      this.mute();
    }
    return this._muted;
  }

  // -- Pause / Resume / Device Loss ------------------------------------

  /**
   * Pause audio processing. Stops triggering new notes and suspends
   * the Tone.js context to save CPU. Existing notes decay naturally.
   * Called when the simulation stops or the tab is hidden.
   */
  pause() {
    if (this._paused || this._destroyed) return;
    this._paused = true;
    // Suspend the audio context to save CPU (non-blocking)
    if (Tone && Tone.context && Tone.context.state === 'running') {
      Tone.context.rawContext?.suspend?.();
    }
  }

  /**
   * Resume audio processing after a pause.
   * Called when the simulation restarts or the tab becomes visible again.
   */
  resume() {
    if (!this._paused || this._destroyed) return;
    this._paused = false;
    // Resume the audio context
    if (Tone && Tone.context && Tone.context.state === 'suspended') {
      Tone.context.rawContext?.resume?.();
    }
  }

  /**
   * Handle WebGPU device loss gracefully. Clears stale simulation state
   * to prevent note triggering from outdated density data.
   * Audio engine stays alive — it doesn't depend on the GPU.
   */
  handleDeviceLoss() {
    if (this._destroyed) return;
    // Clear simulation data that came from GPU readbacks
    this._simState = null;
    this._clearDensityGrid();
    // Release any ringing notes
    for (const ch of Object.values(this._channels)) {
      ch.synth.releaseAll();
    }
  }

  // -- Volume & Effects Control -----------------------------------------

  /**
   * Set master volume (0–1).
   */
  setMasterVolume(level) {
    this._masterLevel = Math.max(0, Math.min(1, level));
    if (this._masterVolume && Tone) {
      this._masterVolume.volume.value = Tone.gainToDb(this._masterLevel);
    }
  }

  /**
   * Set per-species volume (0–1).
   */
  setSpeciesVolume(species, level) {
    this._speciesLevels[species] = Math.max(0, Math.min(1, level));
    const ch = this._channels[species];
    if (ch && Tone) {
      ch.volume.volume.value = Tone.gainToDb(this._speciesLevels[species]);
    }
  }

  /**
   * Mute/unmute a specific species channel.
   */
  setSpeciesMuted(species, muted) {
    this._speciesMuted[species] = muted;
    const ch = this._channels[species];
    if (ch) {
      ch.volume.mute = muted;
    }
  }

  /**
   * Set reverb dry/wet (0–1).
   */
  setReverbWet(wet) {
    this._reverbWet = Math.max(0, Math.min(1, wet));
    if (this._reverb) {
      this._reverb.wet.value = this._reverbWet;
    }
  }

  /**
   * Set filter cutoff frequency (200–8000 Hz).
   */
  setFilterCutoff(freq) {
    this._filterCutoff = Math.max(200, Math.min(8000, freq));
    for (const ch of Object.values(this._channels)) {
      ch.filter.frequency.value = this._filterCutoff;
    }
  }

  // -- Getters ----------------------------------------------------------

  get initialized() { return this._initialized; }
  get muted() { return this._muted; }
  get paused() { return this._paused; }
  get mode() { return this._mode; }
  get masterLevel() { return this._masterLevel; }
  get reverbWet() { return this._reverbWet; }
  get filterCutoff() { return this._filterCutoff; }
  get modeCrossfading() { return this._modeCrossfading; }
  get fadingOutChannels() { return this._fadingOutChannels; }

  /**
   * Get the channel names active in the current mode.
   * @returns {string[]}
   */
  get activeChannels() {
    return Object.keys(this._channels);
  }

  /**
   * Get a specific channel's data (synth, panner, filter, volume, notes).
   * @param {string} name
   */
  getChannel(name) {
    return this._channels[name] || null;
  }

  // -- Density Grid Sampling ----------------------------------------------

  /**
   * Allocate density grid typed arrays for the current mode.
   */
  _initDensityGrid() {
    const size = DENSITY_COLS * DENSITY_ROWS;
    if (this._mode === 'complex') {
      this._densityGrid = {
        herbivore: new Uint16Array(size),
        predator:  new Uint16Array(size),
        scavenger: new Uint16Array(size),
        symbiont:  new Uint16Array(size),
      };
    } else if (this._mode === 'ecosystem') {
      this._densityGrid = {
        alpha: new Uint16Array(size),
        beta:  new Uint16Array(size),
        gamma: new Uint16Array(size),
      };
    } else {
      this._densityGrid = {
        simple: new Uint16Array(size),
      };
    }
    this._lastDensitySample = -DENSITY_SAMPLE_INTERVAL;
  }

  /**
   * Clear all density grid cells to zero.
   */
  _clearDensityGrid() {
    if (!this._densityGrid) return;
    for (const grid of Object.values(this._densityGrid)) {
      grid.fill(0);
    }
  }

  /**
   * Feed simulation data for density sampling.
   * Called by the parent component each frame (or when data changes).
   * @param {Object} state
   * @param {Float32Array} state.agentData - Agent position buffer (CPU readback)
   * @param {number} state.agentCount - Number of active agents
   * @param {number} state.stride - Floats per agent (8 simple, 12 ecosystem)
   * @param {number} state.simWidth - Simulation grid width in pixels
   * @param {number} state.simHeight - Simulation grid height in pixels
   */
  setSimulationState(state) {
    this._simState = state;
  }

  /**
   * Sample agent density into the grid. Divides the simulation area into
   * DENSITY_COLS × DENSITY_ROWS cells and counts agents per cell per species.
   * Uses _simState data fed by the parent component.
   */
  _sampleDensity() {
    if (!this._densityGrid || !this._simState) return;

    const { agentData, agentCount, stride, simWidth, simHeight } = this._simState;
    if (!agentData || agentCount <= 0 || simWidth <= 0 || simHeight <= 0) return;

    // Clear grids
    this._clearDensityGrid();

    const cols = DENSITY_COLS;
    const rows = DENSITY_ROWS;
    const cellW = simWidth / cols;
    const cellH = simHeight / rows;
    const maxCol = cols - 1;
    const maxRow = rows - 1;

    const isMultiSpecies = this._mode === 'ecosystem' || this._mode === 'complex';
    const speciesMap = this._mode === 'complex' ? SPECIES_INDEX_MAP_COMPLEX : SPECIES_INDEX_MAP;
    const maxSpeciesIdx = speciesMap.length - 1;

    // Behavioral state counts per species (multi-species only)
    let stateCounts, speciesCounts;
    if (isMultiSpecies) {
      stateCounts = {};
      speciesCounts = {};
      for (const name of speciesMap) {
        stateCounts[name] = [0, 0, 0];
        speciesCounts[name] = 0;
      }
    }

    for (let i = 0; i < agentCount; i++) {
      const off = i * stride;
      const x = agentData[off];
      const y = agentData[off + 1];

      const col = Math.min(Math.max(Math.floor(x / cellW), 0), maxCol);
      const row = Math.min(Math.max(Math.floor(y / cellH), 0), maxRow);
      const idx = row * cols + col;

      if (isMultiSpecies) {
        // Species stored at offset +8 in multi-species stride (eco: 0-2, complex: 0-3)
        const speciesIdx = Math.min(Math.max(Math.floor(agentData[off + 8]), 0), maxSpeciesIdx);
        const name = speciesMap[speciesIdx];
        this._densityGrid[name][idx]++;

        // Behavioral state at offset +10 (0=forage, 1=flee, 2=hunt)
        const stateIdx = Math.min(Math.max(Math.floor(agentData[off + 10]), 0), 2);
        stateCounts[name][stateIdx]++;
        speciesCounts[name]++;
      } else {
        this._densityGrid.simple[idx]++;
      }
    }

    // Compute behavioral state proportions (multi-species only)
    if (isMultiSpecies) {
      this._behaviorState = {};
      for (const name of speciesMap) {
        const total = speciesCounts[name];
        if (total > 0) {
          this._behaviorState[name] = {
            forage: stateCounts[name][STATE_FORAGE] / total,
            flee:   stateCounts[name][STATE_FLEE] / total,
            hunt:   stateCounts[name][STATE_HUNT] / total,
          };
        } else {
          this._behaviorState[name] = { forage: 1, flee: 0, hunt: 0 };
        }
      }
    } else {
      this._behaviorState = null;
    }
  }

  /**
   * Get cells with density above threshold, sorted by density descending.
   * Used by note triggering to determine which cells produce sound.
   * @param {number} [threshold=DENSITY_THRESHOLD]
   * @returns {Array<{col: number, row: number, species: string, density: number}>}
   */
  getHotCells(threshold = DENSITY_THRESHOLD) {
    if (!this._densityGrid) return [];

    const cells = [];
    const cols = DENSITY_COLS;
    const rows = DENSITY_ROWS;

    for (const [species, grid] of Object.entries(this._densityGrid)) {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const density = grid[r * cols + c];
          if (density >= threshold) {
            cells.push({ col: c, row: r, species, density });
          }
        }
      }
    }

    cells.sort((a, b) => b.density - a.density);
    return cells;
  }

  /**
   * Get the density value at a specific grid cell for a specific species.
   * @param {number} col
   * @param {number} row
   * @param {string} species
   * @returns {number} agent count in that cell, or 0
   */
  getDensityAt(col, row, species) {
    const grid = this._densityGrid?.[species];
    if (!grid || col < 0 || col >= DENSITY_COLS || row < 0 || row >= DENSITY_ROWS) return 0;
    return grid[row * DENSITY_COLS + col];
  }

  /**
   * Get the current density grid (read-only access).
   * @returns {Object|null} { species: Uint16Array, ... } or null
   */
  get densityGrid() {
    return this._densityGrid;
  }

  // -- Population Dynamics --------------------------------------------------

  /**
   * Feed population counts from the parent component.
   * @param {Object} popCounts - { alpha: number, beta: number, gamma: number, total: number }
   */
  setPopulationData(popCounts) {
    this._popCounts = popCounts;
  }

  /**
   * Get current population data.
   * @returns {Object|null}
   */
  get populationData() {
    return this._popCounts;
  }

  /**
   * Compute the dynamic note limit for a species based on its population ratio.
   * In simple mode, always returns MAX_NOTES_PER_CYCLE.
   * In ecosystem mode:
   *   - Dead (0 pop)           → 0 notes
   *   - Near extinction (<5%)  → 1 note (fragile, sparse)
   *   - Low (<25%)             → 2 notes (struggling)
   *   - Healthy (25-50%)       → 3 notes
   *   - Dominant (>50%)        → MAX_NOTES_PER_CYCLE (full voice count)
   * When no population data is available, falls back to MAX_NOTES_PER_CYCLE.
   * @param {string} species
   * @returns {number}
   */
  _getPopulationNoteLimit(species) {
    if (this._mode !== 'ecosystem' && this._mode !== 'complex') return MAX_NOTES_PER_CYCLE;

    const pop = this._popCounts;
    if (!pop || pop.total <= 0) return MAX_NOTES_PER_CYCLE;

    const count = pop[species] || 0;
    if (count <= 0) return 0;

    const ratio = count / pop.total;

    if (ratio < POP_EXTINCTION_RATIO) return 1;
    if (ratio < POP_LOW_RATIO) return 2;
    if (ratio < POP_HIGH_RATIO) return 3;
    return MAX_NOTES_PER_CYCLE;
  }

  /**
   * Get population ratio for a species (0–1), or null if no data.
   * @param {string} species
   * @returns {number|null}
   */
  getPopulationRatio(species) {
    const pop = this._popCounts;
    if (!pop || pop.total <= 0) return null;
    return (pop[species] || 0) / pop.total;
  }

  // -- Behavioral State Sonification ----------------------------------------

  /**
   * Get behavioral state proportions for a species.
   * @param {string} species
   * @returns {{ forage: number, flee: number, hunt: number } | null}
   */
  getBehavioralState(species) {
    return this._behaviorState?.[species] ?? null;
  }

  /**
   * Get the full behavioral state data (read-only access).
   * @returns {Object|null}
   */
  get behaviorState() {
    return this._behaviorState;
  }

  /**
   * Compute blended envelope parameters from behavioral state proportions.
   * Weighted average: forage → slow attack, flee → fast attack, hunt → staccato.
   * @param {string} species
   * @returns {{ attack: number, decay: number, sustain: number, release: number }}
   */
  _computeBlendedEnvelope(species) {
    const state = this._behaviorState?.[species];
    if (!state) return BEHAVIOR_ENVELOPES.forage;

    const f = state.forage;
    const fl = state.flee;
    const h = state.hunt;

    return {
      attack:  f * BEHAVIOR_ENVELOPES.forage.attack  + fl * BEHAVIOR_ENVELOPES.flee.attack  + h * BEHAVIOR_ENVELOPES.hunt.attack,
      decay:   f * BEHAVIOR_ENVELOPES.forage.decay   + fl * BEHAVIOR_ENVELOPES.flee.decay   + h * BEHAVIOR_ENVELOPES.hunt.decay,
      sustain: f * BEHAVIOR_ENVELOPES.forage.sustain + fl * BEHAVIOR_ENVELOPES.flee.sustain + h * BEHAVIOR_ENVELOPES.hunt.sustain,
      release: f * BEHAVIOR_ENVELOPES.forage.release + fl * BEHAVIOR_ENVELOPES.flee.release + h * BEHAVIOR_ENVELOPES.hunt.release,
    };
  }

  /**
   * Compute blended note duration from behavioral state proportions.
   * Forage → sustained, Flee → faster, Hunt → staccato.
   * Returns NOTE_DURATION when no behavioral state data is available.
   * @param {string} species
   * @returns {number|string} Duration in seconds (number) or NOTE_DURATION (string)
   */
  _computeBlendedDuration(species) {
    const state = this._behaviorState?.[species];
    if (!state) return NOTE_DURATION;

    return state.forage * BEHAVIOR_DURATION_FORAGE
         + state.flee   * BEHAVIOR_DURATION_FLEE
         + state.hunt   * BEHAVIOR_DURATION_HUNT;
  }

  /**
   * Compute pitch bias from behavioral state proportions.
   * Flee → higher pitch tendency, Hunt → lower pitch tendency, Forage → neutral.
   * @param {string} species
   * @returns {number} Pitch bias (-1 to 1)
   */
  _computePitchBias(species) {
    const state = this._behaviorState?.[species];
    if (!state) return 0;

    return state.flee * BEHAVIOR_PITCH_BIAS_FLEE
         + state.hunt * BEHAVIOR_PITCH_BIAS_HUNT;
  }

  // -- Note Triggering from Density ----------------------------------------

  /**
   * Map a grid row (Y position) to a note within the species' register.
   * Row 0 (top) → highest note, row DENSITY_ROWS-1 (bottom) → lowest note.
   * Optional pitchBias shifts the selection: positive → higher, negative → lower.
   * @param {number} row — grid row (0 to DENSITY_ROWS-1)
   * @param {string[]} notes — species note array
   * @param {number} [pitchBias=0] — pitch shift (-1 to 1)
   * @returns {string} pentatonic note name
   */
  _mapRowToNote(row, notes, pitchBias = 0) {
    const normalizedY = 1 - (row / (DENSITY_ROWS - 1));
    const biasedY = Math.max(0, Math.min(1, normalizedY + pitchBias));
    const noteIndex = Math.round(biasedY * (notes.length - 1));
    return notes[noteIndex];
  }

  /**
   * Map a grid column (X position) to stereo pan value.
   * Col 0 (left) → -1, col DENSITY_COLS-1 (right) → +1.
   * @param {number} col — grid column (0 to DENSITY_COLS-1)
   * @returns {number} pan value (-1 to 1)
   */
  _mapColToPan(col) {
    return (col / (DENSITY_COLS - 1)) * 2 - 1;
  }

  /**
   * Map agent density count to note velocity (volume).
   * DENSITY_THRESHOLD → MIN_NOTE_VELOCITY, DENSITY_VELOCITY_CAP → 1.0.
   * @param {number} density — agent count in cell
   * @returns {number} velocity (MIN_NOTE_VELOCITY to 1.0)
   */
  _mapDensityToVelocity(density) {
    const normalized = Math.min((density - DENSITY_THRESHOLD) / (DENSITY_VELOCITY_CAP - DENSITY_THRESHOLD), 1);
    return MIN_NOTE_VELOCITY + (1 - MIN_NOTE_VELOCITY) * Math.max(normalized, 0);
  }

  /**
   * Trigger notes based on current density grid state.
   * Called after each density sampling cycle.
   * Groups hot cells by species, limits per species, maps to notes.
   */
  _triggerNotes() {
    if (!Tone || !this._initialized || this._muted) return;

    const hotCells = this.getHotCells();
    if (hotCells.length === 0) return;

    // Group by species, cap at population → event → morph note limit chain
    const bySpecies = {};
    for (const cell of hotCells) {
      if (!bySpecies[cell.species]) bySpecies[cell.species] = [];
      const baseLimit = this._getPopulationNoteLimit(cell.species);
      const eventLimit = this._getEventNoteLimit(baseLimit);
      const limit = this._getMorphNoteLimit(eventLimit);
      if (bySpecies[cell.species].length < limit) {
        bySpecies[cell.species].push(cell);
      }
    }

    const now = Tone.now();

    for (const [species, cells] of Object.entries(bySpecies)) {
      const ch = this._channels[species];
      if (!ch || ch.volume.mute) continue;

      // Apply behavioral envelope modulation (optional chaining for backward compat)
      const env = this._computeBlendedEnvelope(species);
      ch.synth.set?.({ envelope: env });

      // Compute behavioral note duration and pitch bias
      const duration = this._computeBlendedDuration(species);
      const pitchBias = this._computePitchBias(species);

      // Compute density-weighted average pan from X positions
      let totalDensity = 0;
      let weightedCol = 0;
      for (const cell of cells) {
        weightedCol += cell.col * cell.density;
        totalDensity += cell.density;
      }
      const avgCol = weightedCol / totalDensity;
      const rawPan = this._mapColToPan(avgCol);
      ch.panner.pan.value = this._getMorphAdjustedPan(rawPan);

      // Trigger notes with behavioral modulation
      for (const cell of cells) {
        const note = this._mapRowToNote(cell.row, ch.notes, pitchBias);
        const velocity = this._mapDensityToVelocity(cell.density);
        ch.synth.triggerAttackRelease(note, duration, now, velocity);
      }
    }
  }

  // -- Click/Touch Sonic Pulse ----------------------------------------------

  /**
   * Find the dominant species near a grid cell by summing density in a
   * neighborhood of CLICK_SPECIES_SEARCH_RADIUS around the target cell.
   * Returns the species name with highest total density, or null if no data.
   * @param {number} col — grid column
   * @param {number} row — grid row
   * @returns {string|null} species name ('alpha', 'beta', 'gamma') or null
   */
  _getDominantSpeciesAtPoint(col, row) {
    if (!this._densityGrid || (this._mode !== 'ecosystem' && this._mode !== 'complex')) return null;

    const r = CLICK_SPECIES_SEARCH_RADIUS;
    const minCol = Math.max(0, col - r);
    const maxCol = Math.min(DENSITY_COLS - 1, col + r);
    const minRow = Math.max(0, row - r);
    const maxRow = Math.min(DENSITY_ROWS - 1, row + r);

    const speciesMap = this._mode === 'complex' ? SPECIES_INDEX_MAP_COMPLEX : SPECIES_INDEX_MAP;
    const totals = {};
    for (const name of speciesMap) totals[name] = 0;

    for (const species of speciesMap) {
      const grid = this._densityGrid[species];
      if (!grid) continue;
      for (let rr = minRow; rr <= maxRow; rr++) {
        for (let cc = minCol; cc <= maxCol; cc++) {
          totals[species] += grid[rr * DENSITY_COLS + cc];
        }
      }
    }

    // Find max
    let best = null;
    let bestCount = 0;
    for (const [species, count] of Object.entries(totals)) {
      if (count > bestCount) {
        best = species;
        bestCount = count;
      }
    }

    return best;
  }

  /**
   * Trigger a sonic pulse from a click/touch interaction.
   * Maps click position to pitch (Y → pentatonic note) and pan (X),
   * selects the dominant species channel near the click point for timbre,
   * and uses a bell-like envelope (fast attack, medium decay).
   *
   * In Simple mode: always uses the single channel.
   * In Ecosystem mode: uses the channel of the dominant species near the click.
   *
   * @param {number} x — click X position in canvas/simulation coordinates
   * @param {number} y — click Y position in canvas/simulation coordinates
   * @param {number} canvasWidth — canvas/simulation width
   * @param {number} canvasHeight — canvas/simulation height
   */
  triggerClickPulse(x, y, canvasWidth, canvasHeight) {
    if (!Tone || !this._initialized || this._muted || this._destroyed) return;
    if (canvasWidth <= 0 || canvasHeight <= 0) return;

    // Normalize position to 0–1
    const normX = Math.max(0, Math.min(1, x / canvasWidth));
    const normY = Math.max(0, Math.min(1, y / canvasHeight));

    // Map to grid coordinates for species lookup
    const col = Math.min(Math.floor(normX * DENSITY_COLS), DENSITY_COLS - 1);
    const row = Math.min(Math.floor(normY * DENSITY_ROWS), DENSITY_ROWS - 1);

    // Determine which channel to use
    let channelName;
    if (this._mode === 'ecosystem' || this._mode === 'complex') {
      const dominant = this._getDominantSpeciesAtPoint(col, row);
      // Fall back to mid register species if no dominant found
      channelName = dominant || (this._mode === 'complex' ? 'herbivore' : 'beta');
    } else {
      channelName = 'simple';
    }

    const ch = this._channels[channelName];
    if (!ch || ch.volume.mute) return;

    // Map Y → pentatonic note (top = high, bottom = low)
    // Use _mapRowToNote with the channel's note array
    const note = this._mapRowToNote(row, ch.notes);

    // Map X → stereo pan (-1 to +1)
    const pan = normX * 2 - 1;

    // Apply bell-like envelope temporarily
    ch.synth.set?.({ envelope: CLICK_PULSE_ENVELOPE });

    // Set panner to click position for this pulse
    const prevPan = ch.panner.pan.value;
    ch.panner.pan.value = pan;

    // Trigger the pulse note
    const now = Tone.now();
    ch.synth.triggerAttackRelease(note, CLICK_PULSE_DURATION, now, CLICK_PULSE_VELOCITY);

    // Restore panner (density-triggered notes will set it next cycle anyway)
    ch.panner.pan.value = prevPan;
  }

  /**
   * Trigger a sonic pulse during pointer drag. Throttled to DRAG_PULSE_INTERVAL
   * to create a staccato trail of notes as the user drags across the canvas.
   * Shorter and softer than click pulses for a continuous arpeggiated feel.
   *
   * @param {number} x — pointer X in canvas coordinates
   * @param {number} y — pointer Y in canvas coordinates
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @returns {boolean} true if a pulse was triggered (not throttled)
   */
  triggerDragPulse(x, y, canvasWidth, canvasHeight) {
    if (!Tone || !this._initialized || this._muted || this._destroyed) return false;
    if (canvasWidth <= 0 || canvasHeight <= 0) return false;

    // Throttle
    const now = performance.now();
    if (now - this._lastDragPulseTime < DRAG_PULSE_INTERVAL) return false;
    this._lastDragPulseTime = now;

    const normX = Math.max(0, Math.min(1, x / canvasWidth));
    const normY = Math.max(0, Math.min(1, y / canvasHeight));

    const col = Math.min(Math.floor(normX * DENSITY_COLS), DENSITY_COLS - 1);
    const row = Math.min(Math.floor(normY * DENSITY_ROWS), DENSITY_ROWS - 1);

    let channelName;
    if (this._mode === 'ecosystem' || this._mode === 'complex') {
      const dominant = this._getDominantSpeciesAtPoint(col, row);
      channelName = dominant || (this._mode === 'complex' ? 'herbivore' : 'beta');
    } else {
      channelName = 'simple';
    }

    const ch = this._channels[channelName];
    if (!ch || ch.volume.mute) return false;

    const note = this._mapRowToNote(row, ch.notes);
    const pan = normX * 2 - 1;

    ch.synth.set?.({ envelope: DRAG_PULSE_ENVELOPE });

    const prevPan = ch.panner.pan.value;
    ch.panner.pan.value = pan;

    const toneNow = Tone.now();
    ch.synth.triggerAttackRelease(note, DRAG_PULSE_DURATION, toneNow, DRAG_PULSE_VELOCITY);

    ch.panner.pan.value = prevPan;
    return true;
  }

  // -- Morph Sonic Crossfade ------------------------------------------------

  /**
   * Get the sonic profile for a given mask type.
   * Falls back to MORPH_SONIC_DEFAULT for unknown types.
   * @param {string|null} maskType
   * @returns {{ stereoSpread: number, filterMul: number, noteDensityMul: number }}
   */
  _getSonicProfile(maskType) {
    return MORPH_SONIC_PROFILES[maskType] || MORPH_SONIC_DEFAULT;
  }

  /**
   * Set morph state for sonic crossfade. Called by the parent component
   * during morph transitions to interpolate audio parameters alongside
   * the visual mask blend.
   *
   * @param {number} progress — morph progress (0 = fully at fromType, 1 = fully at toType)
   * @param {string} fromType — mask type being morphed from ('libre'|'text'|'image'|'3d')
   * @param {string} toType — mask type being morphed to ('libre'|'text'|'image'|'3d')
   */
  setMorphState(progress, fromType, toType) {
    this._morphProgress = Math.max(0, Math.min(1, progress));
    this._morphFromType = fromType;
    this._morphToType = toType;
    this._isMorphing = true;
  }

  /**
   * End morph transition. Snaps audio parameters to the final target state,
   * then clears morph tracking.
   */
  endMorph() {
    this._isMorphing = false;
    this._morphProgress = 0;
    this._morphFromType = null;
    this._morphToType = null;
  }

  /**
   * Get the current interpolated sonic profile from morph state.
   * Linearly blends stereoSpread, filterMul, and noteDensityMul
   * between the from and to profiles based on _morphProgress.
   * Returns null if not morphing.
   * @returns {{ stereoSpread: number, filterMul: number, noteDensityMul: number } | null}
   */
  _getInterpolatedMorphProfile() {
    if (!this._isMorphing) return null;

    const from = this._getSonicProfile(this._morphFromType);
    const to = this._getSonicProfile(this._morphToType);
    const t = this._morphProgress;

    return {
      stereoSpread: from.stereoSpread + (to.stereoSpread - from.stereoSpread) * t,
      filterMul:    from.filterMul    + (to.filterMul    - from.filterMul) * t,
      noteDensityMul: from.noteDensityMul + (to.noteDensityMul - from.noteDensityMul) * t,
    };
  }

  /**
   * Apply morph audio modulation to channels.
   * Called from update() when morphing is active.
   * - Stereo spread: scales panner values toward center (lower spread = more mono)
   * - Filter cutoff: modulates the effective filter cutoff
   */
  _applyMorphAudio() {
    const profile = this._getInterpolatedMorphProfile();
    if (!profile) return;

    // Modulate filter cutoff: base cutoff × morph filter multiplier
    const effectiveCutoff = this._filterCutoff * profile.filterMul;
    for (const ch of Object.values(this._channels)) {
      ch.filter.frequency.value = effectiveCutoff;
    }
  }

  /**
   * Get the morph-adjusted note limit for a species.
   * Scales the base limit by the interpolated noteDensityMul.
   * Returns baseLimit unchanged if not morphing.
   * @param {number} baseLimit
   * @returns {number}
   */
  _getMorphNoteLimit(baseLimit) {
    if (!this._isMorphing) return baseLimit;
    const profile = this._getInterpolatedMorphProfile();
    if (!profile) return baseLimit;
    return Math.max(1, Math.round(baseLimit * profile.noteDensityMul));
  }

  /**
   * Get the morph-adjusted pan value for a column position.
   * Scales pan toward center based on stereoSpread.
   * Returns raw pan if not morphing.
   * @param {number} pan — raw pan value (-1 to 1)
   * @returns {number} adjusted pan
   */
  _getMorphAdjustedPan(pan) {
    if (!this._isMorphing) return pan;
    const profile = this._getInterpolatedMorphProfile();
    if (!profile) return pan;
    return pan * profile.stereoSpread;
  }

  /**
   * Whether a morph transition is currently active.
   * @returns {boolean}
   */
  get isMorphing() { return this._isMorphing; }

  /**
   * Current morph progress (0–1).
   * @returns {number}
   */
  get morphProgress() { return this._morphProgress; }

  // -- Environmental Events ------------------------------------------------

  /**
   * Get the currently active environmental event type (or null).
   * @returns {string|null}
   */
  get activeEvent() { return this._activeEvent; }

  /**
   * Start an environmental event, applying audio texture shifts.
   * If an event is already active, it is ended first.
   * @param {string} type — one of EVENT_BLOOM, EVENT_DROUGHT, EVENT_PLAGUE, EVENT_CATASTROPHE
   */
  startEvent(type) {
    if (!this._initialized || this._destroyed) return;

    // End current event if any
    if (this._activeEvent) this.endEvent();

    // Save pre-event state for restoration
    this._preEventState = {
      reverbWet: this._reverbWet,
      filterCutoff: this._filterCutoff,
      masterVolumeDb: this._masterVolume?.volume.value ?? 0,
      channelNotes: {},
      modulationIndex: FM_SYNTH_OPTIONS.modulationIndex,
    };
    for (const [name, ch] of Object.entries(this._channels)) {
      this._preEventState.channelNotes[name] = ch.notes;
    }

    this._activeEvent = type;

    switch (type) {
      case EVENT_BLOOM:       this._applyBloom(); break;
      case EVENT_DROUGHT:     this._applyDrought(); break;
      case EVENT_PLAGUE:      this._applyPlague(); break;
      case EVENT_CATASTROPHE: this._applyCatastrophe(); break;
    }
  }

  /**
   * End the current environmental event and restore pre-event audio state.
   */
  endEvent() {
    if (!this._activeEvent || !this._preEventState) return;

    const prev = this._preEventState;

    // Restore reverb wet
    if (this._reverb) {
      this._reverb.wet.value = prev.reverbWet;
    }
    this._reverbWet = prev.reverbWet;

    // Restore filter cutoff on all channels
    this._filterCutoff = prev.filterCutoff;
    for (const ch of Object.values(this._channels)) {
      ch.filter.frequency.value = prev.filterCutoff;
    }

    // Restore master volume
    if (this._masterVolume) {
      this._masterVolume.volume.value = prev.masterVolumeDb;
    }

    // Restore channel note arrays
    for (const [name, ch] of Object.entries(this._channels)) {
      if (prev.channelNotes[name]) {
        ch.notes = prev.channelNotes[name];
      }
    }

    // Restore FM modulation index (plague cleanup)
    for (const ch of Object.values(this._channels)) {
      ch.synth.set?.({ modulationIndex: prev.modulationIndex });
    }

    // Clear catastrophe state
    this._catastropheStartFrame = null;
    this._catastropheRebuilding = false;

    this._activeEvent = null;
    this._preEventState = null;
  }

  /**
   * Bloom: massive reverb swell, all voices crescendo, notes multiply.
   */
  _applyBloom() {
    if (this._reverb) {
      this._reverb.wet.value = BLOOM_REVERB_WET;
    }
    if (this._masterVolume) {
      this._masterVolume.volume.value = (this._preEventState.masterVolumeDb ?? 0) + BLOOM_VOLUME_BOOST_DB;
    }
  }

  /**
   * Drought: low-pass filter sweeps down, notes become muffled and sparse.
   */
  _applyDrought() {
    for (const ch of Object.values(this._channels)) {
      ch.filter.frequency.value = DROUGHT_FILTER_TARGET;
    }
  }

  /**
   * Plague: dissonant intervals (b5/b2) added, harsh FM timbre.
   */
  _applyPlague() {
    const plagueNotes = {
      alpha: PLAGUE_NOTES_ALPHA,
      beta:  PLAGUE_NOTES_BETA,
      gamma: PLAGUE_NOTES_GAMMA,
      simple: PLAGUE_NOTES_SIMPLE,
      herbivore: PLAGUE_NOTES_HERBIVORE,
      predator:  PLAGUE_NOTES_PREDATOR,
      scavenger: PLAGUE_NOTES_SCAVENGER,
      symbiont:  PLAGUE_NOTES_SYMBIONT,
    };
    for (const [name, ch] of Object.entries(this._channels)) {
      if (plagueNotes[name]) {
        ch.notes = plagueNotes[name];
      }
    }
    for (const ch of Object.values(this._channels)) {
      ch.synth.set?.({ modulationIndex: PLAGUE_MODULATION_INDEX });
    }
  }

  /**
   * Catastrophe: rapid fade to silence, then slow single-note rebuild.
   */
  _applyCatastrophe() {
    if (this._masterVolume) {
      this._masterVolume.volume.value = -Infinity;
    }
    this._catastropheStartFrame = null; // set on first update() call
    this._catastropheRebuilding = false;
  }

  /**
   * Apply event-based note limit modifier to a base population-derived limit.
   * @param {number} baseLimit — from _getPopulationNoteLimit
   * @returns {number}
   */
  _getEventNoteLimit(baseLimit) {
    if (!this._activeEvent) return baseLimit;
    switch (this._activeEvent) {
      case EVENT_BLOOM:
        return Math.min(baseLimit * BLOOM_NOTE_MULTIPLIER, MAX_VOICES);
      case EVENT_DROUGHT:
        return Math.max(Math.floor(baseLimit / DROUGHT_NOTE_DIVISOR), baseLimit > 0 ? 1 : 0);
      case EVENT_CATASTROPHE:
        return this._catastropheRebuilding ? 1 : 0;
      default:
        return baseLimit;
    }
  }

  // -- Update (called from render loop) ---------------------------------

  /**
   * Called from the main render loop. Orchestrates density sampling,
   * note scheduling, and parameter modulation.
   * @param {number} frameCount
   */
  update(frameCount) {
    if (!this._initialized || this._muted || this._paused || this._destroyed) return;

    // Mode crossfade: track frames and dispose old channels when done
    if (this._modeCrossfading) {
      if (this._modeCrossfadeStartFrame === null) {
        this._modeCrossfadeStartFrame = frameCount;
      } else if (frameCount - this._modeCrossfadeStartFrame >= MODE_CROSSFADE_FRAMES) {
        this._disposeFadingChannels();
      }
    }

    // Catastrophe rebuild phase transition
    if (this._activeEvent === EVENT_CATASTROPHE) {
      if (this._catastropheStartFrame === null) {
        this._catastropheStartFrame = frameCount;
      } else if (!this._catastropheRebuilding &&
                 frameCount - this._catastropheStartFrame >= CATASTROPHE_SILENCE_FRAMES) {
        this._catastropheRebuilding = true;
        if (this._masterVolume && Tone) {
          this._masterVolume.volume.value = Tone.gainToDb(CATASTROPHE_REBUILD_VOLUME);
        }
      }
    }

    // Apply morph audio modulation (filter cutoff) each frame for smooth crossfade
    if (this._isMorphing) {
      this._applyMorphAudio();
    }

    // Sample density every DENSITY_SAMPLE_INTERVAL frames (~15Hz at 60fps)
    if (frameCount - this._lastDensitySample >= DENSITY_SAMPLE_INTERVAL) {
      this._lastDensitySample = frameCount;
      this._sampleDensity();
      this._triggerNotes();
    }
  }

  // -- Cleanup ----------------------------------------------------------

  /**
   * Destroy all audio resources. Call on disconnectedCallback.
   */
  destroy() {
    if (this._destroyed) return;
    this._destroyed = true;
    this._initialized = false;
    this._paused = false;

    this._destroyChannels();
    this._disposeFadingChannels();

    if (this._reverb) {
      this._reverb.dispose();
      this._reverb = null;
    }
    if (this._masterVolume) {
      this._masterVolume.dispose();
      this._masterVolume = null;
    }

    this._densityGrid = null;
    this._simState = null;
    this._popCounts = null;
    this._behaviorState = null;
    this._activeEvent = null;
    this._preEventState = null;
    this._catastropheStartFrame = null;
    this._catastropheRebuilding = false;
    this._morphProgress = 0;
    this._morphFromType = null;
    this._morphToType = null;
    this._isMorphing = false;
    this._fadingOutChannels = null;
    this._modeCrossfadeStartFrame = null;
    this._modeCrossfading = false;
    this._fadingInTargetDb = {};
    this._parent = null;
  }
}
