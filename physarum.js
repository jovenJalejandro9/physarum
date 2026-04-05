// ============================================================
// <physarum> Unified Web Component
// Single element — all mask modes, simulation modes, render modes
// ============================================================

// -- Constants ---------------------------------------------------------------

export const MAX_AGENTS_SIMPLE = 500_000;
export const AGENT_STRIDE = 8; // x, y, angle, speed, sensorAngle, sensorDist, turnSpeed, energy
export const MAX_AGENTS_ECOSYSTEM = 1_000_000;
export const AGENT_STRIDE_ECOSYSTEM = 12;
export const REFERENCE_AREA = 1920 * 1080;
export const TRAIL_CHANNELS_ECO = 6;
export const ECO_TRAIL_CH = Object.freeze({
  ALPHA: 0,
  BETA: 1,
  GAMMA: 2,
  DANGER: 3,
  REPRO: 4,
  SPARE: 5,
});

export const TRAIL_CHANNELS_COMPLEX = 8;
export const COMPLEX_TRAIL_CH = Object.freeze({
  HERBIVORE: 0,
  PREDATOR: 1,
  SCAVENGER: 2,
  SYMBIONT: 3,
  DANGER: 4,
  REPRO: 5,
  SYMBIONT_FOOD: 6,
  SPARE: 7,
});
export const COMPLEX_SPECIES = Object.freeze(['herbivore', 'predator', 'scavenger', 'symbiont']);

export const DEFAULTS = Object.freeze({
  agentCount: 150_000,
  sensorAngle: 0.45,
  sensorDist: 18.0,
  turnSpeed: 0.35,
  moveSpeed: 0.7,
  deposit: 0.08,
  trailDecay: 0.90,
  trailDiffusion: 0.10,
  foodWeight: 8.0,
  foodConsumptionRate: 0.01,
  foodRegenRate: 0.005,
  energyGain: 0.03,
  energyDrain: 0.02,
  ambientFraction: 0.08,
});

export const ECO_DEFAULTS = Object.freeze({
  agentCount: 300_000,
  sensorAngle: 0.45,
  sensorDist: 18.0,
  turnSpeed: 0.35,
  moveSpeed: 0.7,
  deposit: 0.08,
  trailDecay: 0.90,
  trailDiffusion: 0.10,
  foodWeight: 8.0,
  foodConsumptionRate: 0.008,
  foodRegenRate: 0.007,
  energyGain: 0.06,
  energyDrain: 0.018,
  ambientFraction: 0.08,
});

export const ECO_PANEL_PARAMS = Object.freeze({
  alphaCount:        { fmt: 0 },
  betaCount:         { fmt: 0 },
  gammaCount:        { fmt: 0 },
  alphaSensorAngle:  { fmt: 2 },
  alphaSensorDist:   { fmt: 0 },
  betaSensorAngle:   { fmt: 2 },
  betaSensorDist:    { fmt: 0 },
  gammaSensorAngle:  { fmt: 2 },
  gammaSensorDist:   { fmt: 0 },
  simSpeed:          { fmt: 0 },
});

export const COMPLEX_DEFAULTS = Object.freeze({
  agentCount: 400_000,
  sensorAngle: 0.45,
  sensorDist: 18.0,
  turnSpeed: 0.35,
  moveSpeed: 0.7,
  deposit: 0.08,
  trailDecay: 0.90,
  trailDiffusion: 0.10,
  foodWeight: 8.0,
  foodConsumptionRate: 0.008,
  foodRegenRate: 0.007,
  energyGain: 0.06,
  energyDrain: 0.018,
  ambientFraction: 0.08,
});

export const COMPLEX_PANEL_PARAMS = Object.freeze({
  herbivoreCount:        { fmt: 0 },
  predatorCount:         { fmt: 0 },
  scavengerCount:        { fmt: 0 },
  symbiontCount:         { fmt: 0 },
  herbivoreSensorAngle:  { fmt: 2 },
  herbivoreSensorDist:   { fmt: 0 },
  predatorSensorAngle:   { fmt: 2 },
  predatorSensorDist:    { fmt: 0 },
  scavengerSensorAngle:  { fmt: 2 },
  scavengerSensorDist:   { fmt: 0 },
  symbiontSensorAngle:   { fmt: 2 },
  symbiontSensorDist:    { fmt: 0 },
  simSpeed:              { fmt: 0 },
});

// -- Environmental Events Constants ------------------------------------------

export const POP_READBACK_INTERVAL = 60;

export const EVENT_NONE = 0;
export const EVENT_BLOOM = 1;
export const EVENT_DROUGHT = 2;
export const EVENT_PLAGUE = 3;
export const EVENT_CATASTROPHE = 4;
export const EVENT_WARMUP_FRAMES = 7200;  // ~2 min at 60fps before events can begin
export const EVENT_PROBABILITY = 0.008;   // 0.8% chance per readback check
export const EVENT_DURATION = 180;        // frames an event lasts

// -- Audio Integration Constants -----------------------------------------------

// Map numeric event types to audio module string types
const AUDIO_EVENT_MAP = Object.freeze([null, 'bloom', 'drought', 'plague', 'catastrophe']);

// Max agents to readback for audio density sampling (keeps GPU→CPU transfer ≤2.4MB)
const AUDIO_READBACK_MAX_AGENTS = 50000;

// Readback interval in frames for audio agent data (~7.5Hz at 60fps)
const AUDIO_READBACK_INTERVAL = 8;

// -- Uniform Layout ----------------------------------------------------------

export const U = Object.freeze({
  GRID_WIDTH: 0,
  GRID_HEIGHT: 1,
  AGENT_COUNT: 2,
  FRAME: 3,
  SENSOR_ANGLE: 4,
  SENSOR_DIST: 5,
  TURN_SPEED: 6,
  MOVE_SPEED: 7,
  DEPOSIT: 8,
  TRAIL_DECAY: 9,
  TRAIL_DIFFUSE: 10,
  FOOD_WEIGHT: 11,
  FOOD_CONSUME: 12,
  FOOD_REGEN: 13,
  ENERGY_GAIN: 14,
  ENERGY_DRAIN: 15,
  AMBIENT_FRAC: 16,
  TIME: 17,
  MOUSE_X: 18,
  MOUSE_Y: 19,
  MOUSE_ACTIVE: 20,
  EVENT_DEATH_MULT: 21,
  EVENT_PLAGUE_SPECIES: 22,
});

export const UNIFORM_BUFFER_SIZE = 96; // 24 × 4 bytes, padded to 6 × vec4

export const PARAM_UNIFORM_MAP = Object.freeze({
  agentCount:          { uniform: U.AGENT_COUNT,   u32: true,  fmt: 0 },
  sensorAngle:         { uniform: U.SENSOR_ANGLE,  u32: false, fmt: 2 },
  sensorDist:          { uniform: U.SENSOR_DIST,   u32: false, fmt: 0 },
  turnSpeed:           { uniform: U.TURN_SPEED,    u32: false, fmt: 2 },
  moveSpeed:           { uniform: U.MOVE_SPEED,    u32: false, fmt: 1 },
  deposit:             { uniform: U.DEPOSIT,       u32: false, fmt: 2 },
  trailDecay:          { uniform: U.TRAIL_DECAY,   u32: false, fmt: 2 },
  trailDiffusion:      { uniform: U.TRAIL_DIFFUSE, u32: false, fmt: 2 },
  foodWeight:          { uniform: U.FOOD_WEIGHT,   u32: false, fmt: 1 },
  foodConsumptionRate: { uniform: U.FOOD_CONSUME,  u32: false, fmt: 3 },
  foodRegenRate:       { uniform: U.FOOD_REGEN,    u32: false, fmt: 3 },
  energyGain:          { uniform: U.ENERGY_GAIN,   u32: false, fmt: 3 },
  energyDrain:         { uniform: U.ENERGY_DRAIN,  u32: false, fmt: 3 },
  ambientFraction:     { uniform: U.AMBIENT_FRAC,  u32: false, fmt: 0, scale: 0.01 },
});

// -- WGSL Shaders (Simple Mode) ---------------------------------------------

const WGSL_PARAMS_STRUCT = /* wgsl */`
struct Params {
  gridWidth: u32,
  gridHeight: u32,
  agentCount: u32,
  frame: u32,
  sensorAngle: f32,
  sensorDist: f32,
  turnSpeed: f32,
  moveSpeed: f32,
  deposit: f32,
  trailDecay: f32,
  trailDiffuse: f32,
  foodWeight: f32,
  foodConsume: f32,
  foodRegen: f32,
  energyGain: f32,
  energyDrain: f32,
  ambientFrac: f32,
  time: f32,
  mouseX: f32,
  mouseY: f32,
  mouseActive: u32,
  eventDeathMult: f32,
  eventPlagueSpecies: u32,
  _pad3: u32,
}`;

const WGSL_HASH_FN = /* wgsl */`
fn hash(p: u32) -> f32 {
  var s = p;
  s = s ^ 2747636419u;
  s = s * 2654435769u;
  s = s ^ (s >> 16u);
  s = s * 2654435769u;
  s = s ^ (s >> 16u);
  s = s * 2654435769u;
  return f32(s) / 4294967295.0;
}`;

export const WGSL_AGENT_UPDATE = /* wgsl */`
${WGSL_HASH_FN}
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read_write> agents: array<f32>;
@group(0) @binding(2) var<storage, read_write> trail: array<f32>;
@group(0) @binding(3) var<storage, read> foodMask: array<f32>;
@group(0) @binding(4) var<storage, read_write> food: array<f32>;

const STRIDE = 8u;
const PI2 = 6.28318530;

fn sense(px: f32, py: f32) -> f32 {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let ix = clamp(u32(px), 0u, w - 1u);
  let iy = clamp(u32(py), 0u, h - 1u);
  let idx = iy * w + ix;
  return trail[idx] + food[idx] * params.foodWeight + foodMask[idx] * params.foodWeight * 0.3;
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let id = gid.x;
  if (id >= params.agentCount) { return; }

  let off = id * STRIDE;
  let w = params.gridWidth;
  let h = params.gridHeight;
  let fW = f32(w);
  let fH = f32(h);

  var x = agents[off + 0u];
  var y = agents[off + 1u];
  var angle = agents[off + 2u];
  let speed = agents[off + 3u];
  let sAngle = agents[off + 4u];
  let sDist = agents[off + 5u];
  let tSpeed = agents[off + 6u];
  var energy = agents[off + 7u];

  let isAmbient = f32(id) < f32(params.agentCount) * params.ambientFrac;

  // Sense: forward, left, right
  let fwdX = x + cos(angle) * sDist;
  let fwdY = y + sin(angle) * sDist;
  let leftX = x + cos(angle + sAngle) * sDist;
  let leftY = y + sin(angle + sAngle) * sDist;
  let rightX = x + cos(angle - sAngle) * sDist;
  let rightY = y + sin(angle - sAngle) * sDist;

  let sFwd = sense(fwdX, fwdY);
  let sLeft = sense(leftX, leftY);
  let sRight = sense(rightX, rightY);

  let rng = hash(id * 7919u + params.frame * 997u);
  var turnAmount = (rng - 0.5) * 0.15;

  if (sLeft > sFwd && sLeft > sRight) {
    turnAmount += tSpeed;
  } else if (sRight > sFwd && sRight > sLeft) {
    turnAmount -= tSpeed;
  } else if (sLeft > sRight) {
    turnAmount += tSpeed * 0.5;
  } else if (sRight > sLeft) {
    turnAmount -= tSpeed * 0.5;
  }

  // Mouse attraction
  if (params.mouseActive > 0u) {
    let dx = params.mouseX - x;
    let dy = params.mouseY - y;
    let dist = sqrt(dx * dx + dy * dy);
    if (dist < 200.0 && dist > 1.0) {
      let targetAngle = atan2(dy, dx);
      var angleDiff = targetAngle - angle;
      angleDiff -= floor((angleDiff + 3.14159265) / PI2) * PI2;
      turnAmount += angleDiff * (1.0 - dist / 200.0) * 0.7;
    }
  }

  angle += turnAmount;

  // Move with world wrap
  var nx = x + cos(angle) * speed * params.moveSpeed;
  var ny = y + sin(angle) * speed * params.moveSpeed;
  if (nx < 0.0) { nx += fW; }
  if (nx >= fW) { nx -= fW; }
  if (ny < 0.0) { ny += fH; }
  if (ny >= fH) { ny -= fH; }

  let ix = clamp(u32(nx), 0u, w - 1u);
  let iy = clamp(u32(ny), 0u, h - 1u);
  let idx = iy * w + ix;

  // Deposit trail (ambient agents deposit at 30%)
  let depositAmt = select(params.deposit, params.deposit * 0.3, isAmbient);
  trail[idx] += depositAmt;

  // Consume food
  let currentFood = food[idx];
  let consumed = min(params.foodConsume, currentFood);
  food[idx] = currentFood - consumed;

  // Energy
  energy += consumed * params.energyGain;
  let mask = foodMask[idx];
  if (mask < 0.1 && !isAmbient) {
    energy -= params.energyDrain;
  }
  energy = clamp(energy, 0.0, 1.0);

  // Death → respawn inside food zones
  if (energy <= 0.0) {
    let seed = id * 31u + params.frame * 17u;
    for (var attempt = 0u; attempt < 16u; attempt++) {
      let rx = hash(seed + attempt * 3u) * fW;
      let ry = hash(seed + attempt * 3u + 1u) * fH;
      let rix = clamp(u32(rx), 0u, w - 1u);
      let riy = clamp(u32(ry), 0u, h - 1u);
      if (foodMask[riy * w + rix] > 0.1) {
        nx = rx;
        ny = ry;
        break;
      }
    }
    angle = hash(seed + 100u) * PI2;
    energy = 0.5;
  }

  agents[off + 0u] = nx;
  agents[off + 1u] = ny;
  agents[off + 2u] = angle;
  agents[off + 7u] = energy;
}
`;

export const WGSL_FOOD_REGEN = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> foodMask: array<f32>;
@group(0) @binding(2) var<storage, read_write> food: array<f32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let x = gid.x;
  let y = gid.y;
  if (x >= params.gridWidth || y >= params.gridHeight) { return; }

  let idx = y * params.gridWidth + x;
  let capacity = foodMask[idx];

  if (capacity <= 0.0) {
    food[idx] = 0.0;
    return;
  }

  let current = food[idx];
  food[idx] = current + (capacity - current) * params.foodRegen;
}
`;

export const WGSL_DIFFUSE = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trailIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> trailOut: array<f32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let x = gid.x;
  let y = gid.y;
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (x >= w || y >= h) { return; }

  var sum = 0.0;
  var count = 0.0;

  for (var dy = -1i; dy <= 1i; dy++) {
    for (var dx = -1i; dx <= 1i; dx++) {
      let nx = i32(x) + dx;
      let ny = i32(y) + dy;
      if (nx >= 0 && nx < i32(w) && ny >= 0 && ny < i32(h)) {
        sum += trailIn[u32(ny) * w + u32(nx)];
        count += 1.0;
      }
    }
  }

  let idx = y * w + x;
  let center = trailIn[idx];
  let blurred = sum / count;
  trailOut[idx] = mix(center, blurred, params.trailDiffuse) * params.trailDecay;
}
`;

export const WGSL_RENDER = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trail: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

fn tm(v: f32) -> f32 { return 1.0 - exp(-v * 3.5); }

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;

  let raw = trail[idx];
  let t = tm(raw);

  let lo = colors.slot0.rgb;
  let hi = colors.slot1.rgb;
  let mid = mix(lo, hi, 0.45);

  let color = select(
    mix(mid, hi, (t - 0.5) * 2.0),
    mix(lo, mid, t * 2.0),
    t < 0.5
  );

  return vec4f(color, 1.0);
}
`;

// -- Point Sprites Shaders ---------------------------------------------------

export const WGSL_RENDER_POINTS = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const STRIDE = 8u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) alpha: f32,
}

@vertex fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VOut {
  var o: VOut;

  // Skip agents beyond count
  if (ii >= params.agentCount) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    return o;
  }

  let off = ii * STRIDE;
  let ax = agents[off + 0u];
  let ay = agents[off + 1u];
  let energy = agents[off + 7u];

  // Quad vertex offsets (2 triangles = 6 vertices)
  let quadX = array<f32, 6>(-1.0, 1.0, -1.0, 1.0, 1.0, -1.0);
  let quadY = array<f32, 6>(-1.0, -1.0, 1.0, -1.0, 1.0, 1.0);

  // Sprite size in pixels: 1.0 + energy * 2.0
  let size = 1.0 + clamp(energy, 0.0, 1.0) * 2.0;
  let dx = quadX[vi] * size;
  let dy = quadY[vi] * size;

  // Agent position to NDC
  let ndcX = (ax + dx) / f32(params.gridWidth) * 2.0 - 1.0;
  let ndcY = -((ay + dy) / f32(params.gridHeight) * 2.0 - 1.0);

  o.pos = vec4f(ndcX, ndcY, 0.0, 1.0);
  o.alpha = clamp(energy * 0.8, 0.05, 0.9);
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let color = colors.slot0.rgb;
  return vec4f(color * in.alpha, in.alpha);
}
`;

export const WGSL_RENDER_POINTS_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const STRIDE = 12u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;
@group(0) @binding(2) var<storage, read> alive: array<u32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(3) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) alpha: f32,
  @location(1) @interpolate(flat) species: u32,
}

@vertex fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VOut {
  var o: VOut;

  // Skip agents beyond count or dead
  if (ii >= params.agentCount || alive[ii] == 0u) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    o.species = 0u;
    return o;
  }

  let off = ii * STRIDE;
  let ax = agents[off + 0u];
  let ay = agents[off + 1u];
  let energy = agents[off + 7u];
  let sp = u32(agents[off + 8u]);

  // Quad vertex offsets (2 triangles = 6 vertices)
  let quadX = array<f32, 6>(-1.0, 1.0, -1.0, 1.0, 1.0, -1.0);
  let quadY = array<f32, 6>(-1.0, -1.0, 1.0, -1.0, 1.0, 1.0);

  let size = 1.0 + clamp(energy, 0.0, 1.0) * 2.0;
  let dx = quadX[vi] * size;
  let dy = quadY[vi] * size;

  let ndcX = (ax + dx) / f32(params.gridWidth) * 2.0 - 1.0;
  let ndcY = -((ay + dy) / f32(params.gridHeight) * 2.0 - 1.0);

  o.pos = vec4f(ndcX, ndcY, 0.0, 1.0);
  o.alpha = clamp(energy * 0.8, 0.05, 0.9);
  o.species = min(sp, 2u);
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  var color: vec3f;
  switch in.species {
    case 0u: { color = colors.slot0.rgb; }
    case 1u: { color = colors.slot1.rgb; }
    case 2u: { color = colors.slot2.rgb; }
    default: { color = colors.slot0.rgb; }
  }
  return vec4f(color * in.alpha, in.alpha);
}
`;

// -- SDF Glow Shaders --------------------------------------------------------

// Seed pass: read trail, write (x,y) seed positions for JFA. Simple mode (1 channel).
export const WGSL_SDF_SEED = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trail: array<f32>;
@group(0) @binding(2) var<storage, read_write> seeds: array<i32>;

const THRESHOLD = 0.02;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let idx = gid.y * w + gid.x;
  let val = trail[idx];
  let sIdx = idx * 2u;

  if (val > THRESHOLD) {
    seeds[sIdx]     = i32(gid.x);
    seeds[sIdx + 1u] = i32(gid.y);
  } else {
    seeds[sIdx]     = -1;
    seeds[sIdx + 1u] = -1;
  }
}
`;

// Seed pass for ecosystem: 3 species, 6 ints per pixel (2 per species)
export const WGSL_SDF_SEED_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 6u;
const THRESHOLD = 0.02;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trail: array<f32>;
@group(0) @binding(2) var<storage, read_write> seeds: array<i32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let idx = gid.y * w + gid.x;
  let tBase = idx * CH;
  let sBase = idx * 6u;

  for (var sp = 0u; sp < 3u; sp++) {
    let val = trail[tBase + sp];
    let off = sBase + sp * 2u;
    if (val > THRESHOLD) {
      seeds[off]      = i32(gid.x);
      seeds[off + 1u] = i32(gid.y);
    } else {
      seeds[off]      = -1;
      seeds[off + 1u] = -1;
    }
  }
}
`;

// JFA step: simple mode (2 i32 per pixel). Step size passed via uniform.
export const WGSL_SDF_JFA = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> seedsIn: array<i32>;
@group(0) @binding(2) var<storage, read_write> seedsOut: array<i32>;
@group(0) @binding(3) var<uniform> stepBuf: array<u32, 4>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let step = i32(stepBuf[0]);
  let idx = gid.y * w + gid.x;
  let px = i32(gid.x);
  let py = i32(gid.y);

  var bestX = seedsIn[idx * 2u];
  var bestY = seedsIn[idx * 2u + 1u];
  var bestDist = 999999999.0;
  if (bestX >= 0) {
    let dx = f32(px - bestX);
    let dy = f32(py - bestY);
    bestDist = dx * dx + dy * dy;
  }

  for (var dy = -1; dy <= 1; dy++) {
    for (var dx = -1; dx <= 1; dx++) {
      let nx = px + dx * step;
      let ny = py + dy * step;
      if (nx < 0 || nx >= i32(w) || ny < 0 || ny >= i32(h)) { continue; }

      let nIdx = u32(ny) * w + u32(nx);
      let sx = seedsIn[nIdx * 2u];
      let sy = seedsIn[nIdx * 2u + 1u];
      if (sx < 0) { continue; }

      let ddx = f32(px - sx);
      let ddy = f32(py - sy);
      let d = ddx * ddx + ddy * ddy;
      if (d < bestDist) {
        bestDist = d;
        bestX = sx;
        bestY = sy;
      }
    }
  }

  seedsOut[idx * 2u]      = bestX;
  seedsOut[idx * 2u + 1u] = bestY;
}
`;

// JFA step: ecosystem (6 i32 per pixel, 3 species)
export const WGSL_SDF_JFA_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> seedsIn: array<i32>;
@group(0) @binding(2) var<storage, read_write> seedsOut: array<i32>;
@group(0) @binding(3) var<uniform> stepBuf: array<u32, 4>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let step = i32(stepBuf[0]);
  let idx = gid.y * w + gid.x;
  let px = i32(gid.x);
  let py = i32(gid.y);

  var bestX: array<i32, 3>;
  var bestY: array<i32, 3>;
  var bestDist: array<f32, 3>;

  let sBase = idx * 6u;
  for (var sp = 0u; sp < 3u; sp++) {
    bestX[sp] = seedsIn[sBase + sp * 2u];
    bestY[sp] = seedsIn[sBase + sp * 2u + 1u];
    bestDist[sp] = 999999999.0;
    if (bestX[sp] >= 0) {
      let ddx = f32(px - bestX[sp]);
      let ddy = f32(py - bestY[sp]);
      bestDist[sp] = ddx * ddx + ddy * ddy;
    }
  }

  for (var dy = -1; dy <= 1; dy++) {
    for (var dx = -1; dx <= 1; dx++) {
      let nx = px + dx * step;
      let ny = py + dy * step;
      if (nx < 0 || nx >= i32(w) || ny < 0 || ny >= i32(h)) { continue; }

      let nIdx = u32(ny) * w + u32(nx);
      let nBase = nIdx * 6u;

      for (var sp = 0u; sp < 3u; sp++) {
        let sx = seedsIn[nBase + sp * 2u];
        let sy = seedsIn[nBase + sp * 2u + 1u];
        if (sx < 0) { continue; }

        let ddx = f32(px - sx);
        let ddy = f32(py - sy);
        let d = ddx * ddx + ddy * ddy;
        if (d < bestDist[sp]) {
          bestDist[sp] = d;
          bestX[sp] = sx;
          bestY[sp] = sy;
        }
      }
    }
  }

  let oBase = idx * 6u;
  for (var sp = 0u; sp < 3u; sp++) {
    seedsOut[oBase + sp * 2u]      = bestX[sp];
    seedsOut[oBase + sp * 2u + 1u] = bestY[sp];
  }
}
`;

// SDF Glow render: simple mode. Reads seed buffer, computes distance, applies glow.
export const WGSL_RENDER_SDF = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> seeds: array<i32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;

  let sx = seeds[idx * 2u];
  let sy = seeds[idx * 2u + 1u];

  if (sx < 0) {
    return vec4f(0.003, 0.002, 0.005, 1.0);
  }

  let dx = f32(i32(px) - sx);
  let dy = f32(i32(py) - sy);
  let dist = sqrt(dx * dx + dy * dy);

  let maxDim = f32(max(w, h));
  let normDist = dist / (maxDim * 0.08);

  let core = colors.slot0.rgb;
  let falloff = colors.slot1.rgb;

  let coreGlow = exp(-normDist * normDist * 8.0);
  let outerGlow = exp(-normDist * 1.5);

  let color = core * coreGlow + falloff * outerGlow * 0.6;

  return vec4f(color + vec3f(0.003, 0.002, 0.005), 1.0);
}
`;

// SDF Glow render: ecosystem mode. Per-species SDF with species colors.
export const WGSL_RENDER_SDF_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> seeds: array<i32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;
  let sBase = idx * 6u;

  let maxDim = f32(max(w, h));
  let scale = maxDim * 0.08;

  let speciesColors = array<vec3f, 3>(
    colors.slot0.rgb,
    colors.slot1.rgb,
    colors.slot2.rgb
  );

  var color = vec3f(0.0);

  for (var sp = 0u; sp < 3u; sp++) {
    let sx = seeds[sBase + sp * 2u];
    let sy = seeds[sBase + sp * 2u + 1u];
    if (sx < 0) { continue; }

    let dx = f32(i32(px) - sx);
    let dy = f32(i32(py) - sy);
    let dist = sqrt(dx * dx + dy * dy);
    let normDist = dist / scale;

    let coreGlow = exp(-normDist * normDist * 8.0);
    let outerGlow = exp(-normDist * 1.5);

    color += speciesColors[sp] * (coreGlow + outerGlow * 0.4);
  }

  return vec4f(color + vec3f(0.003, 0.002, 0.005), 1.0);
}
`;

// -- Reaction-Diffusion Shaders -----------------------------------------------

// RD compute: Gray-Scott on secondary grid, seeded by physarum trail. Simple mode (1 channel).
// Ping-pong: reads rdIn (U,V per pixel), writes rdOut. Trail seeds U chemical.
export const WGSL_RD_COMPUTE = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> rdIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> rdOut: array<f32>;
@group(0) @binding(3) var<storage, read> trail: array<f32>;

const Du = 0.21;
const Dv = 0.105;
const FEED = 0.037;
const KILL = 0.06;
const DT = 1.0;
const SEED_STRENGTH = 0.012;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let x = gid.x;
  let y = gid.y;
  let idx = y * w + x;
  let base = idx * 2u;

  let u = rdIn[base];
  let v = rdIn[base + 1u];

  // Laplacian (5-point stencil with diagonal)
  var lapU = 0.0;
  var lapV = 0.0;
  let weights = array<f32, 9>(0.05, 0.2, 0.05, 0.2, -1.0, 0.2, 0.05, 0.2, 0.05);
  var wi = 0u;
  for (var dy = -1i; dy <= 1i; dy++) {
    for (var dx = -1i; dx <= 1i; dx++) {
      let nx = clamp(i32(x) + dx, 0, i32(w) - 1);
      let ny = clamp(i32(y) + dy, 0, i32(h) - 1);
      let nIdx = u32(ny) * w + u32(nx);
      let nb = nIdx * 2u;
      let wt = weights[wi];
      lapU += rdIn[nb] * wt;
      lapV += rdIn[nb + 1u] * wt;
      wi++;
    }
  }

  // Gray-Scott equations + trail seeding
  let uvv = u * v * v;
  let trailVal = trail[idx];
  let seedU = trailVal * SEED_STRENGTH;

  let newU = u + DT * (Du * lapU - uvv + FEED * (1.0 - u) + seedU);
  let newV = v + DT * (Dv * lapV + uvv - (FEED + KILL) * v);

  rdOut[base]      = clamp(newU, 0.0, 1.0);
  rdOut[base + 1u] = clamp(newV, 0.0, 1.0);
}
`;

// RD compute: ecosystem mode (3 species, 6 floats per pixel: U0,V0,U1,V1,U2,V2)
export const WGSL_RD_COMPUTE_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 6u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> rdIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> rdOut: array<f32>;
@group(0) @binding(3) var<storage, read> trail: array<f32>;

const Du = 0.21;
const Dv = 0.105;
const FEED = 0.037;
const KILL = 0.06;
const DT = 1.0;
const SEED_STRENGTH = 0.012;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let x = gid.x;
  let y = gid.y;
  let idx = y * w + x;

  for (var sp = 0u; sp < 3u; sp++) {
    let base = idx * CH + sp * 2u;

    let u = rdIn[base];
    let v = rdIn[base + 1u];

    // Laplacian (9-point weighted stencil)
    var lapU = 0.0;
    var lapV = 0.0;
    let weights = array<f32, 9>(0.05, 0.2, 0.05, 0.2, -1.0, 0.2, 0.05, 0.2, 0.05);
    var wi = 0u;
    for (var dy = -1i; dy <= 1i; dy++) {
      for (var dx = -1i; dx <= 1i; dx++) {
        let nx = clamp(i32(x) + dx, 0, i32(w) - 1);
        let ny = clamp(i32(y) + dy, 0, i32(h) - 1);
        let nIdx = u32(ny) * w + u32(nx);
        let nb = nIdx * CH + sp * 2u;
        let wt = weights[wi];
        lapU += rdIn[nb] * wt;
        lapV += rdIn[nb + 1u] * wt;
        wi++;
      }
    }

    // Trail seeding: species trail channel feeds its U chemical
    let tBase = idx * CH;
    let trailVal = trail[tBase + sp];
    let seedU = trailVal * SEED_STRENGTH;

    let uvv = u * v * v;
    let newU = u + DT * (Du * lapU - uvv + FEED * (1.0 - u) + seedU);
    let newV = v + DT * (Dv * lapV + uvv - (FEED + KILL) * v);

    rdOut[base]      = clamp(newU, 0.0, 1.0);
    rdOut[base + 1u] = clamp(newV, 0.0, 1.0);
  }
}
`;

// RD render: simple mode. Visualize U and V chemical concentrations.
export const WGSL_RENDER_RD = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> rd: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;
  let base = idx * 2u;

  let u = rd[base];
  let v = rd[base + 1u];

  let colorU = colors.slot0.rgb;
  let colorV = colors.slot1.rgb;

  // Nonlinear mapping for visual contrast
  let uI = smoothstep(0.1, 0.9, u);
  let vI = smoothstep(0.0, 0.5, v);

  let color = colorU * uI * (1.0 - vI * 0.5) + colorV * vI;

  return vec4f(color + vec3f(0.003, 0.002, 0.005), 1.0);
}
`;

// RD render: ecosystem mode. 3 species RD channels with species colors.
export const WGSL_RENDER_RD_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 6u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> rd: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;
  let rdBase = idx * CH;

  let speciesColors = array<vec3f, 3>(
    colors.slot0.rgb,
    colors.slot1.rgb,
    colors.slot2.rgb
  );

  var color = vec3f(0.0);

  for (var sp = 0u; sp < 3u; sp++) {
    let u = rd[rdBase + sp * 2u];
    let v = rd[rdBase + sp * 2u + 1u];

    let uI = smoothstep(0.1, 0.9, u);
    let vI = smoothstep(0.0, 0.5, v);
    let intensity = uI * (1.0 - vI * 0.3) + vI * 0.6;

    color += speciesColors[sp] * intensity;
  }

  return vec4f(color + vec3f(0.003, 0.002, 0.005), 1.0);
}
`;

// -- WGSL Shaders (Metaballs Mode) -------------------------------------------

// Metaballs blur compute: simple mode. 5x5 Gaussian blur on trail.
export const WGSL_MB_BLUR = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trailIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> blurOut: array<f32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let x = i32(gid.x);
  let y = i32(gid.y);

  // 5x5 Gaussian kernel (sigma ~1.0), sum=273
  let k = array<f32, 25>(
    1.0,  4.0,  7.0,  4.0, 1.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    7.0, 26.0, 41.0, 26.0, 7.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    1.0,  4.0,  7.0,  4.0, 1.0
  );
  let kSum = 273.0;

  var acc = 0.0;
  var ki = 0u;
  for (var dy = -2i; dy <= 2i; dy++) {
    for (var dx = -2i; dx <= 2i; dx++) {
      let nx = clamp(x + dx, 0, i32(w) - 1);
      let ny = clamp(y + dy, 0, i32(h) - 1);
      let nIdx = u32(ny) * w + u32(nx);
      acc += trailIn[nIdx] * k[ki];
      ki++;
    }
  }

  let idx = gid.y * w + gid.x;
  blurOut[idx] = acc / kSum;
}
`;

// Metaballs blur compute: ecosystem mode. Blurs 3 species trail channels independently.
export const WGSL_MB_BLUR_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const TRAIL_CH = 6u;
const OUT_CH = 3u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trailIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> blurOut: array<f32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let x = i32(gid.x);
  let y = i32(gid.y);

  let k = array<f32, 25>(
    1.0,  4.0,  7.0,  4.0, 1.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    7.0, 26.0, 41.0, 26.0, 7.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    1.0,  4.0,  7.0,  4.0, 1.0
  );
  let kSum = 273.0;

  var acc0 = 0.0;
  var acc1 = 0.0;
  var acc2 = 0.0;
  var ki = 0u;
  for (var dy = -2i; dy <= 2i; dy++) {
    for (var dx = -2i; dx <= 2i; dx++) {
      let nx = clamp(x + dx, 0, i32(w) - 1);
      let ny = clamp(y + dy, 0, i32(h) - 1);
      let nIdx = u32(ny) * w + u32(nx);
      let tBase = nIdx * TRAIL_CH;
      let wt = k[ki];
      acc0 += trailIn[tBase + 0u] * wt;
      acc1 += trailIn[tBase + 1u] * wt;
      acc2 += trailIn[tBase + 2u] * wt;
      ki++;
    }
  }

  let idx = gid.y * w + gid.x;
  let oBase = idx * OUT_CH;
  blurOut[oBase + 0u] = acc0 / kSum;
  blurOut[oBase + 1u] = acc1 / kSum;
  blurOut[oBase + 2u] = acc2 / kSum;
}
`;

// Metaballs re-blur compute: ecosystem mode (pass 2+). Reads 3ch blur, writes 3ch blur.
export const WGSL_MB_REBLUR_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 3u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> blurIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> blurOut: array<f32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let x = i32(gid.x);
  let y = i32(gid.y);

  let k = array<f32, 25>(
    1.0,  4.0,  7.0,  4.0, 1.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    7.0, 26.0, 41.0, 26.0, 7.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    1.0,  4.0,  7.0,  4.0, 1.0
  );
  let kSum = 273.0;

  var acc0 = 0.0;
  var acc1 = 0.0;
  var acc2 = 0.0;
  var ki = 0u;
  for (var dy = -2i; dy <= 2i; dy++) {
    for (var dx = -2i; dx <= 2i; dx++) {
      let nx = clamp(x + dx, 0, i32(w) - 1);
      let ny = clamp(y + dy, 0, i32(h) - 1);
      let nIdx = u32(ny) * w + u32(nx);
      let base = nIdx * CH;
      let wt = k[ki];
      acc0 += blurIn[base + 0u] * wt;
      acc1 += blurIn[base + 1u] * wt;
      acc2 += blurIn[base + 2u] * wt;
      ki++;
    }
  }

  let idx = gid.y * w + gid.x;
  let oBase = idx * CH;
  blurOut[oBase + 0u] = acc0 / kSum;
  blurOut[oBase + 1u] = acc1 / kSum;
  blurOut[oBase + 2u] = acc2 / kSum;
}
`;

// Metaballs render: simple mode. Threshold + smooth edge on blurred trail.
export const WGSL_RENDER_METABALLS = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> blur: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;

  let v = blur[idx];

  let surfaceColor = colors.slot0.rgb;
  let edgeColor = colors.slot1.rgb;

  // Threshold for metaball surface
  let threshold = 0.15;
  let edgeWidth = 0.06;

  // Sharp surface with smooth edge falloff
  let surface = smoothstep(threshold - edgeWidth, threshold, v);
  // Edge highlight at the boundary
  let edge = smoothstep(threshold - edgeWidth, threshold, v) - smoothstep(threshold, threshold + edgeWidth, v);

  let color = surfaceColor * surface + edgeColor * edge * 1.5;

  return vec4f(color, 1.0);
}
`;

// Metaballs render: ecosystem mode. Per-species threshold with species colors.
export const WGSL_RENDER_METABALLS_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const OUT_CH = 3u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> blur: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;
  let bBase = idx * OUT_CH;

  let speciesColors = array<vec3f, 3>(
    colors.slot0.rgb,
    colors.slot1.rgb,
    colors.slot2.rgb
  );

  let threshold = 0.15;
  let edgeWidth = 0.06;

  var color = vec3f(0.0);

  for (var sp = 0u; sp < 3u; sp++) {
    let v = blur[bBase + sp];
    let surface = smoothstep(threshold - edgeWidth, threshold, v);
    color += speciesColors[sp] * surface;
  }

  return vec4f(color, 1.0);
}
`;

// -- WGSL Shaders (Trail Lines Mode) ------------------------------------------

// Trail Lines record compute: simple mode. Copies agent positions to ring buffer.
export const WGSL_LINES_RECORD = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const AGENT_STRIDE = 8u;
const RING_SIZE = 16u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;
@group(0) @binding(2) var<storage, read_write> ring: array<f32>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let idx = gid.x;
  if (idx >= params.agentCount) { return; }

  let off = idx * AGENT_STRIDE;
  let x = agents[off + 0u];
  let y = agents[off + 1u];

  let slot = params.frame % RING_SIZE;
  let ringOff = (idx * RING_SIZE + slot) * 2u;
  ring[ringOff + 0u] = x;
  ring[ringOff + 1u] = y;
}
`;

// Trail Lines record compute: ecosystem mode. Copies positions, writes sentinel for dead agents.
export const WGSL_LINES_RECORD_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const AGENT_STRIDE = 12u;
const RING_SIZE = 16u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;
@group(0) @binding(2) var<storage, read_write> ring: array<f32>;
@group(0) @binding(3) var<storage, read> alive: array<u32>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let idx = gid.x;
  if (idx >= params.agentCount) { return; }

  let slot = params.frame % RING_SIZE;
  let ringOff = (idx * RING_SIZE + slot) * 2u;

  if (alive[idx] == 0u) {
    ring[ringOff + 0u] = -1.0;
    ring[ringOff + 1u] = -1.0;
    return;
  }

  let off = idx * AGENT_STRIDE;
  let x = agents[off + 0u];
  let y = agents[off + 1u];

  ring[ringOff + 0u] = x;
  ring[ringOff + 1u] = y;
}
`;

// Trail Lines render: simple mode. Line strips per agent, brightness by age.
export const WGSL_RENDER_LINES = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const AGENT_STRIDE = 8u;
const RING_SIZE = 16u;
const SEGMENTS = 15u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;
@group(0) @binding(2) var<storage, read> ring: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(3) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) alpha: f32,
}

@vertex fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VOut {
  var o: VOut;

  if (ii >= params.agentCount) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    return o;
  }

  let segIdx = vi / 2u;
  let endPt = vi % 2u;

  if (segIdx >= SEGMENTS) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    return o;
  }

  let pointIdx = segIdx + endPt;
  let currentSlot = params.frame % RING_SIZE;
  let slot = (currentSlot + 1u + pointIdx) % RING_SIZE;

  let ringOff = (ii * RING_SIZE + slot) * 2u;
  let x = ring[ringOff + 0u];
  let y = ring[ringOff + 1u];

  // Sentinel check: skip uninitialized positions
  if (x < 0.0) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    return o;
  }

  // Brightness fades with age: newest=1.0, oldest~=0.06
  let brightness = f32(pointIdx + 1u) / f32(RING_SIZE);

  // Energy modulates overall brightness (proxy for thickness)
  let agentOff = ii * AGENT_STRIDE;
  let energy = agents[agentOff + 7u];

  let ndcX = x / f32(params.gridWidth) * 2.0 - 1.0;
  let ndcY = -(y / f32(params.gridHeight) * 2.0 - 1.0);

  o.pos = vec4f(ndcX, ndcY, 0.0, 1.0);
  o.alpha = brightness * clamp(energy * 0.8, 0.1, 0.9);
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let color = colors.slot0.rgb;
  return vec4f(color * in.alpha, in.alpha);
}
`;

// Trail Lines render: ecosystem mode. Per-species line coloring.
export const WGSL_RENDER_LINES_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const AGENT_STRIDE = 12u;
const RING_SIZE = 16u;
const SEGMENTS = 15u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;
@group(0) @binding(2) var<storage, read> ring: array<f32>;
@group(0) @binding(3) var<storage, read> alive: array<u32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(4) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) alpha: f32,
  @location(1) @interpolate(flat) species: u32,
}

@vertex fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VOut {
  var o: VOut;

  if (ii >= params.agentCount || alive[ii] == 0u) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    o.species = 0u;
    return o;
  }

  let segIdx = vi / 2u;
  let endPt = vi % 2u;

  if (segIdx >= SEGMENTS) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    o.species = 0u;
    return o;
  }

  let pointIdx = segIdx + endPt;
  let currentSlot = params.frame % RING_SIZE;
  let slot = (currentSlot + 1u + pointIdx) % RING_SIZE;

  let ringOff = (ii * RING_SIZE + slot) * 2u;
  let x = ring[ringOff + 0u];
  let y = ring[ringOff + 1u];

  if (x < 0.0) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    o.species = 0u;
    return o;
  }

  let brightness = f32(pointIdx + 1u) / f32(RING_SIZE);

  let agentOff = ii * AGENT_STRIDE;
  let energy = agents[agentOff + 7u];
  let sp = u32(agents[agentOff + 8u]);

  let ndcX = x / f32(params.gridWidth) * 2.0 - 1.0;
  let ndcY = -(y / f32(params.gridHeight) * 2.0 - 1.0);

  o.pos = vec4f(ndcX, ndcY, 0.0, 1.0);
  o.alpha = brightness * clamp(energy * 0.8, 0.1, 0.9);
  o.species = min(sp, 2u);
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  var color: vec3f;
  switch in.species {
    case 0u: { color = colors.slot0.rgb; }
    case 1u: { color = colors.slot1.rgb; }
    case 2u: { color = colors.slot2.rgb; }
    default: { color = colors.slot0.rgb; }
  }
  return vec4f(color * in.alpha, in.alpha);
}
`;

// -- WGSL Shaders (Ecosystem Mode) -------------------------------------------

export const WGSL_AGENT_UPDATE_ECO = /* wgsl */`
${WGSL_HASH_FN}

fn gaussApprox(seed: u32) -> f32 {
  return (hash(seed) + hash(seed + 1u) + hash(seed + 2u) + hash(seed + 3u) - 2.0) * 0.5;
}

fn mutateVal(val: f32, rate: f32, seed: u32) -> f32 {
  return max(val * (1.0 + gaussApprox(seed) * rate), 0.01);
}

${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read_write> agents: array<f32>;
@group(0) @binding(2) var<storage, read_write> trail: array<f32>;
@group(0) @binding(3) var<storage, read> foodMask: array<f32>;
@group(0) @binding(4) var<storage, read_write> food: array<f32>;
@group(0) @binding(5) var<storage, read_write> alive: array<atomic<u32>>;

const STRIDE = 12u;
const CH = 6u;
const PI2 = 6.28318530;

const EVENT_DRAIN_SCALE = 0.07;
const PRED_DAMAGE = 0.010;
const PRED_GAIN = 0.016;
const PREY_CONSUME = 0.94;
const PREY_THRESH = 0.05;
const PRED_KILL_THRESH = 0.8;
const PRED_KILL_RATE = 0.02;
const REPRO_ENERGY_REQ = 0.50;
const MATE_TRAIL_REQ = 0.08;
const CROWDING_THRESH = 1.5;
const REPRO_RATE = 0.005;
const MUTATION_RATE = 0.03;
const CHILD_ENERGY_FRAC = 0.25;
const PARENT_ENERGY_RETAIN = 0.50;
const REPRO_SIGNAL = 2.0;
const CAS_SCAN_COUNT = 64u;
const CORPSE_FOOD_BASE = 0.10;
const CORPSE_FOOD_ENERGY_SCALE = 0.30;
const DANGER_DEPOSIT = 1.0;

fn senseTrail(px: f32, py: f32, ch: u32) -> f32 {
  let ix = clamp(u32(px), 0u, params.gridWidth - 1u);
  let iy = clamp(u32(py), 0u, params.gridHeight - 1u);
  return trail[(iy * params.gridWidth + ix) * CH + ch];
}

fn senseFood(px: f32, py: f32) -> f32 {
  let ix = clamp(u32(px), 0u, params.gridWidth - 1u);
  let iy = clamp(u32(py), 0u, params.gridHeight - 1u);
  let idx = iy * params.gridWidth + ix;
  return food[idx] + foodMask[idx] * 0.3;
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let id = gid.x;
  if (id >= params.agentCount) { return; }
  if (atomicLoad(&alive[id]) == 0u) { return; }

  let off = id * STRIDE;
  let w = params.gridWidth;
  let h = params.gridHeight;
  let fW = f32(w);
  let fH = f32(h);

  var x = agents[off + 0u];
  var y = agents[off + 1u];
  var angle = agents[off + 2u];
  let speed = agents[off + 3u];
  let sAngle = agents[off + 4u];
  let sDist = agents[off + 5u];
  let tSpeed = agents[off + 6u];
  var energy = agents[off + 7u];
  let species = u32(agents[off + 8u]);
  let depositAmt = agents[off + 9u];
  var age = agents[off + 11u];

  age += 1.0;

  let isAmbient = f32(id) < f32(params.agentCount) * params.ambientFrac;

  let preyCh = (species + 1u) % 3u;
  let predCh = (species + 2u) % 3u;

  let fwdX = x + cos(angle) * sDist;
  let fwdY = y + sin(angle) * sDist;
  let leftX = x + cos(angle + sAngle) * sDist;
  let leftY = y + sin(angle + sAngle) * sDist;
  let rightX = x + cos(angle - sAngle) * sDist;
  let rightY = y + sin(angle - sAngle) * sDist;

  let sFwd = senseTrail(fwdX, fwdY, species);
  let sLeft = senseTrail(leftX, leftY, species);
  let sRight = senseTrail(rightX, rightY, species);

  let fFwd = senseFood(fwdX, fwdY) * params.foodWeight;
  let fLeft = senseFood(leftX, leftY) * params.foodWeight;
  let fRight = senseFood(rightX, rightY) * params.foodWeight;

  let predFwd = senseTrail(fwdX, fwdY, predCh);
  let predLeft = senseTrail(leftX, leftY, predCh);
  let predRight = senseTrail(rightX, rightY, predCh);

  let preyFwd = senseTrail(fwdX, fwdY, preyCh);
  let preyLeft = senseTrail(leftX, leftY, preyCh);
  let preyRight = senseTrail(rightX, rightY, preyCh);

  let dFwd = senseTrail(fwdX, fwdY, 3u);
  let dLeft = senseTrail(leftX, leftY, 3u);
  let dRight = senseTrail(rightX, rightY, 3u);

  let predTotal = predFwd + predLeft + predRight;
  let preyTotal = preyFwd + preyLeft + preyRight;

  var bState = 0u;
  if (predTotal > 0.3) {
    bState = 1u;
  } else if (energy > 0.5 && preyTotal > 0.15) {
    bState = 2u;
  }

  var totalFwd = 0.0;
  var totalLeft = 0.0;
  var totalRight = 0.0;
  var speedMod = 1.0;
  var depositMod = 1.0;

  if (bState == 1u) {
    totalFwd = sFwd * 1.5 + fFwd * 0.3 - dFwd * 0.5 - predFwd * 3.0;
    totalLeft = sLeft * 1.5 + fLeft * 0.3 - dLeft * 0.5 - predLeft * 3.0;
    totalRight = sRight * 1.5 + fRight * 0.3 - dRight * 0.5 - predRight * 3.0;
    speedMod = 1.5;
    depositMod = 0.2;
  } else if (bState == 2u) {
    totalFwd = sFwd * 0.3 + fFwd * 0.3 + preyFwd * 2.0 - dFwd * 0.5;
    totalLeft = sLeft * 0.3 + fLeft * 0.3 + preyLeft * 2.0 - dLeft * 0.5;
    totalRight = sRight * 0.3 + fRight * 0.3 + preyRight * 2.0 - dRight * 0.5;
    speedMod = 1.15;
    depositMod = 0.7;
  } else {
    totalFwd = sFwd + fFwd * 0.4 - dFwd * 0.7 - predFwd * 0.8;
    totalLeft = sLeft + fLeft * 0.4 - dLeft * 0.7 - predLeft * 0.8;
    totalRight = sRight + fRight * 0.4 - dRight * 0.7 - predRight * 0.8;
  }

  let rng = hash(id * 7919u + params.frame * 997u);
  var turnAmount = (rng - 0.5) * 0.15;

  if (totalLeft > totalFwd && totalLeft > totalRight) {
    turnAmount += tSpeed;
  } else if (totalRight > totalFwd && totalRight > totalLeft) {
    turnAmount -= tSpeed;
  } else if (totalLeft > totalRight) {
    turnAmount += tSpeed * 0.5;
  } else if (totalRight > totalLeft) {
    turnAmount -= tSpeed * 0.5;
  }

  if (params.mouseActive > 0u) {
    let dx = params.mouseX - x;
    let dy = params.mouseY - y;
    let dist = sqrt(dx * dx + dy * dy);
    if (dist < 200.0 && dist > 1.0) {
      let targetAngle = atan2(dy, dx);
      var angleDiff = targetAngle - angle;
      angleDiff -= floor((angleDiff + 3.14159265) / PI2) * PI2;
      turnAmount += angleDiff * (1.0 - dist / 200.0) * 0.7;
    }
  }

  angle += turnAmount;

  var nx = x + cos(angle) * speed * speedMod * params.moveSpeed;
  var ny = y + sin(angle) * speed * speedMod * params.moveSpeed;
  if (nx < 0.0) { nx += fW; }
  if (nx >= fW) { nx -= fW; }
  if (ny < 0.0) { ny += fH; }
  if (ny >= fH) { ny -= fH; }

  let ix = clamp(u32(nx), 0u, w - 1u);
  let iy = clamp(u32(ny), 0u, h - 1u);
  let pixelIdx = iy * w + ix;
  let trailBase = pixelIdx * CH;

  let depMod = select(depositAmt * depositMod, depositAmt * depositMod * 0.3, isAmbient);
  trail[trailBase + species] += depMod;

  let currentFood = food[pixelIdx];
  let consumed = min(params.foodConsume, currentFood);
  food[pixelIdx] = currentFood - consumed;

  energy += consumed * params.energyGain;

  let predTrail = trail[trailBase + predCh];
  energy -= predTrail * PRED_DAMAGE;

  let preyTrail = trail[trailBase + preyCh];
  energy += preyTrail * PRED_GAIN;
  if (preyTrail > PREY_THRESH) {
    trail[trailBase + preyCh] *= PREY_CONSUME;
  }

  let mask = foodMask[pixelIdx];
  if (mask < 0.1 && !isAmbient) {
    energy -= params.energyDrain;
  }

  if (!isAmbient && params.eventDeathMult > 1.0) {
    let isTargeted = params.eventPlagueSpecies == 0xFFFFFFFFu || params.eventPlagueSpecies == species;
    if (isTargeted) {
      energy -= (params.eventDeathMult - 1.0) * params.energyDrain * EVENT_DRAIN_SCALE;
    }
  }

  energy = clamp(energy, 0.0, 1.0);

  var died = false;
  if (energy <= 0.0) { died = true; }

  if (!died && predTrail > PRED_KILL_THRESH) {
    let killChance = (predTrail - PRED_KILL_THRESH) * PRED_KILL_RATE;
    if (hash(id * 4919u + params.frame * 23u) < killChance) { died = true; }
  }

  if (died) {
    food[pixelIdx] += CORPSE_FOOD_BASE + energy * CORPSE_FOOD_ENERGY_SCALE;
    trail[trailBase + 3u] += DANGER_DEPOSIT;
    atomicStore(&alive[id], 0u);
    agents[off + 0u] = nx;
    agents[off + 1u] = ny;
    agents[off + 2u] = angle;
    agents[off + 7u] = 0.0;
    agents[off + 10u] = 0.0;
    agents[off + 11u] = age;
    return;
  }

  let ownTrail = trail[trailBase + species];
  let hasMates = ownTrail > MATE_TRAIL_REQ;
  let enoughEnergy = energy > REPRO_ENERGY_REQ;

  if (!isAmbient && hasMates && enoughEnergy) {
    let crowding = max(0.0, 1.0 - max(ownTrail - CROWDING_THRESH, 0.0) * 0.5);
    let reproProb = REPRO_RATE * (energy - 0.5) * crowding;
    let reproRng = hash(id * 9371u + params.frame * 1117u);

    if (reproRng < reproProb) {
      var slot = 0xFFFFFFFFu;
      for (var scanOff = 1u; scanOff <= CAS_SCAN_COUNT; scanOff++) {
        let candidate = (id + scanOff * 37u) % params.agentCount;
        let result = atomicCompareExchangeWeak(&alive[candidate], 0u, 1u);
        if (result.exchanged) { slot = candidate; break; }
      }

      if (slot != 0xFFFFFFFFu) {
        let seed = id * 101u + params.frame * 53u;
        var childX = nx + (hash(seed + 1u) - 0.5) * 10.0;
        var childY = ny + (hash(seed + 2u) - 0.5) * 10.0;
        if (childX < 0.0) { childX += fW; }
        if (childX >= fW) { childX -= fW; }
        if (childY < 0.0) { childY += fH; }
        if (childY >= fH) { childY -= fH; }

        var spawnValid = foodMask[clamp(u32(childY), 0u, h - 1u) * w + clamp(u32(childX), 0u, w - 1u)] > 0.1;
        if (!spawnValid) {
          for (var attempt = 0u; attempt < 16u; attempt++) {
            let rx = hash(seed + attempt * 7u + 100u) * fW;
            let ry = hash(seed + attempt * 7u + 101u) * fH;
            let rix = clamp(u32(rx), 0u, w - 1u);
            let riy = clamp(u32(ry), 0u, h - 1u);
            if (foodMask[riy * w + rix] > 0.1) {
              childX = rx;
              childY = ry;
              spawnValid = true;
              break;
            }
          }
        }

        if (spawnValid) {
          let childOff = slot * STRIDE;
          let mr = MUTATION_RATE;
          agents[childOff + 0u] = childX;
          agents[childOff + 1u] = childY;
          agents[childOff + 2u] = hash(seed + 3u) * PI2;
          agents[childOff + 3u] = mutateVal(speed, mr, seed + 10u);
          agents[childOff + 4u] = mutateVal(sAngle, mr, seed + 20u);
          agents[childOff + 5u] = mutateVal(sDist, mr, seed + 30u);
          agents[childOff + 6u] = mutateVal(tSpeed, mr, seed + 40u);
          agents[childOff + 7u] = energy * CHILD_ENERGY_FRAC;
          agents[childOff + 8u] = f32(species);
          agents[childOff + 9u] = mutateVal(depositAmt, mr, seed + 50u);
          agents[childOff + 10u] = 0.0;
          agents[childOff + 11u] = 0.0;

          energy *= PARENT_ENERGY_RETAIN;
          trail[trailBase + 4u] += REPRO_SIGNAL;
        } else {
          atomicStore(&alive[slot], 0u);
        }
      }
    }
  }

  agents[off + 0u] = nx;
  agents[off + 1u] = ny;
  agents[off + 2u] = angle;
  agents[off + 7u] = energy;
  agents[off + 10u] = f32(bState);
  agents[off + 11u] = age;
}
`;

// -- WGSL Shaders (Complex Ecosystem Mode) ------------------------------------

export const WGSL_AGENT_UPDATE_COMPLEX = /* wgsl */`
${WGSL_HASH_FN}

fn gaussApprox(seed: u32) -> f32 {
  return (hash(seed) + hash(seed + 1u) + hash(seed + 2u) + hash(seed + 3u) - 2.0) * 0.5;
}

fn mutateVal(val: f32, rate: f32, seed: u32) -> f32 {
  return max(val * (1.0 + gaussApprox(seed) * rate), 0.01);
}

${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read_write> agents: array<f32>;
@group(0) @binding(2) var<storage, read_write> trail: array<f32>;
@group(0) @binding(3) var<storage, read> foodMask: array<f32>;
@group(0) @binding(4) var<storage, read_write> food: array<f32>;
@group(0) @binding(5) var<storage, read_write> alive: array<atomic<u32>>;

const STRIDE = 12u;
const CH = 8u;
const PI2 = 6.28318530;

// Species indices
const SP_HERBIVORE = 0u;
const SP_PREDATOR  = 1u;
const SP_SCAVENGER = 2u;
const SP_SYMBIONT  = 3u;

// Trail channel indices (beyond species 0-3)
const CH_DANGER       = 4u;
const CH_REPRO        = 5u;
const CH_SYMBIONT_FOOD = 6u;

// Shared constants
const EVENT_DRAIN_SCALE = 0.07;
const CAS_SCAN_COUNT = 64u;
const CORPSE_FOOD_BASE = 0.10;
const CORPSE_FOOD_ENERGY_SCALE = 0.30;
const DANGER_DEPOSIT = 1.0;
const MUTATION_RATE = 0.03;
const CHILD_ENERGY_FRAC = 0.25;
const PARENT_ENERGY_RETAIN = 0.50;
const REPRO_SIGNAL = 2.0;
const CROWDING_THRESH = 1.5;
const REPRO_RATE = 0.005;
const MATE_TRAIL_REQ = 0.08;

// Predator hunting constants
const PRED_GAIN = 0.025;
const PRED_KILL_THRESH = 0.7;
const PRED_KILL_RATE = 0.025;
const PRED_HERB_CONSUME = 0.92;

// Scavenger constants
const SCAV_DANGER_FEED = 0.020;
const SCAV_DANGER_REDUCE = 0.90;
const SCAV_DANGER_THRESH = 0.05;

// Symbiont constants
const SYMB_DEPOSIT_FOOD = 0.04;
const SYMB_HERB_BONUS = 0.012;
const HERB_SYMB_FOOD_BONUS = 0.015;

// Per-species reproduction thresholds
const REPRO_THRESH_HERB = 0.35;
const REPRO_THRESH_PRED = 0.65;
const REPRO_THRESH_SCAV = 0.50;
const REPRO_THRESH_SYMB = 0.50;

fn senseTrail(px: f32, py: f32, ch: u32) -> f32 {
  let ix = clamp(u32(px), 0u, params.gridWidth - 1u);
  let iy = clamp(u32(py), 0u, params.gridHeight - 1u);
  return trail[(iy * params.gridWidth + ix) * CH + ch];
}

fn senseFood(px: f32, py: f32) -> f32 {
  let ix = clamp(u32(px), 0u, params.gridWidth - 1u);
  let iy = clamp(u32(py), 0u, params.gridHeight - 1u);
  let idx = iy * params.gridWidth + ix;
  return food[idx] + foodMask[idx] * 0.3;
}

fn reproThreshold(species: u32) -> f32 {
  switch (species) {
    case 0u: { return REPRO_THRESH_HERB; }
    case 1u: { return REPRO_THRESH_PRED; }
    case 2u: { return REPRO_THRESH_SCAV; }
    case 3u: { return REPRO_THRESH_SYMB; }
    default: { return 0.50; }
  }
}

fn foodEfficiency(species: u32) -> f32 {
  switch (species) {
    case 0u: { return 1.5; }   // Herbivore: high food efficiency
    case 1u: { return 0.3; }   // Predator: poor at eating food directly
    case 2u: { return 0.6; }   // Scavenger: moderate
    case 3u: { return 1.0; }   // Symbiont: moderate
    default: { return 1.0; }
  }
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let id = gid.x;
  if (id >= params.agentCount) { return; }
  if (atomicLoad(&alive[id]) == 0u) { return; }

  let off = id * STRIDE;
  let w = params.gridWidth;
  let h = params.gridHeight;
  let fW = f32(w);
  let fH = f32(h);

  var x = agents[off + 0u];
  var y = agents[off + 1u];
  var angle = agents[off + 2u];
  let speed = agents[off + 3u];
  let sAngle = agents[off + 4u];
  let sDist = agents[off + 5u];
  let tSpeed = agents[off + 6u];
  var energy = agents[off + 7u];
  let species = u32(agents[off + 8u]);
  let depositAmt = agents[off + 9u];
  var age = agents[off + 11u];

  age += 1.0;

  let isAmbient = f32(id) < f32(params.agentCount) * params.ambientFrac;

  // Sensor positions
  let fwdX = x + cos(angle) * sDist;
  let fwdY = y + sin(angle) * sDist;
  let leftX = x + cos(angle + sAngle) * sDist;
  let leftY = y + sin(angle + sAngle) * sDist;
  let rightX = x + cos(angle - sAngle) * sDist;
  let rightY = y + sin(angle - sAngle) * sDist;

  // Own trail sensing (all species)
  let sFwd = senseTrail(fwdX, fwdY, species);
  let sLeft = senseTrail(leftX, leftY, species);
  let sRight = senseTrail(rightX, rightY, species);

  // Food sensing (all species)
  let fFwd = senseFood(fwdX, fwdY) * params.foodWeight;
  let fLeft = senseFood(leftX, leftY) * params.foodWeight;
  let fRight = senseFood(rightX, rightY) * params.foodWeight;

  // Danger channel sensing
  let dFwd = senseTrail(fwdX, fwdY, CH_DANGER);
  let dLeft = senseTrail(leftX, leftY, CH_DANGER);
  let dRight = senseTrail(rightX, rightY, CH_DANGER);

  // ---- Species-specific trail sensing ----

  // Herbivore trail (sensed by predator for hunting, by symbiont for following)
  let herbFwd = senseTrail(fwdX, fwdY, SP_HERBIVORE);
  let herbLeft = senseTrail(leftX, leftY, SP_HERBIVORE);
  let herbRight = senseTrail(rightX, rightY, SP_HERBIVORE);

  // Predator trail (sensed by herbivore to flee, by scavenger to weakly avoid)
  let predFwd = senseTrail(fwdX, fwdY, SP_PREDATOR);
  let predLeft = senseTrail(leftX, leftY, SP_PREDATOR);
  let predRight = senseTrail(rightX, rightY, SP_PREDATOR);

  // Symbiont food channel (sensed by herbivore for bonus)
  let sfFwd = senseTrail(fwdX, fwdY, CH_SYMBIONT_FOOD);
  let sfLeft = senseTrail(leftX, leftY, CH_SYMBIONT_FOOD);
  let sfRight = senseTrail(rightX, rightY, CH_SYMBIONT_FOOD);

  // ---- Species-specific steering ----

  var totalFwd = 0.0;
  var totalLeft = 0.0;
  var totalRight = 0.0;
  var speedMod = 1.0;
  var depositMod = 1.0;
  var bState = 0u; // 0=forage, 1=flee, 2=hunt/seek

  if (species == SP_HERBIVORE) {
    // Herbivore: eats food, flees predators, senses symbiont food zones
    let predTotal = predFwd + predLeft + predRight;

    if (predTotal > 0.3) {
      // Flee state: run from predators
      bState = 1u;
      totalFwd  = sFwd * 1.5 + fFwd * 0.4 + sfFwd * 0.3 - predFwd * 3.5 - dFwd * 0.3;
      totalLeft = sLeft * 1.5 + fLeft * 0.4 + sfLeft * 0.3 - predLeft * 3.5 - dLeft * 0.3;
      totalRight = sRight * 1.5 + fRight * 0.4 + sfRight * 0.3 - predRight * 3.5 - dRight * 0.3;
      speedMod = 1.5;
      depositMod = 0.2;
    } else {
      // Forage: seek food + symbiont food zones
      bState = 0u;
      totalFwd  = sFwd * 0.8 + fFwd * 0.6 + sfFwd * 0.5 - predFwd * 0.8 - dFwd * 0.5;
      totalLeft = sLeft * 0.8 + fLeft * 0.6 + sfLeft * 0.5 - predLeft * 0.8 - dLeft * 0.5;
      totalRight = sRight * 0.8 + fRight * 0.6 + sfRight * 0.5 - predRight * 0.8 - dRight * 0.5;
    }

  } else if (species == SP_PREDATOR) {
    // Predator: hunts herbivores via trail, avoids danger, poor at direct food
    let herbTotal = herbFwd + herbLeft + herbRight;

    if (energy > 0.4 && herbTotal > 0.15) {
      // Hunt state: track herbivore trails
      bState = 2u;
      totalFwd  = sFwd * 0.2 + fFwd * 0.1 + herbFwd * 2.5 - dFwd * 0.5;
      totalLeft = sLeft * 0.2 + fLeft * 0.1 + herbLeft * 2.5 - dLeft * 0.5;
      totalRight = sRight * 0.2 + fRight * 0.1 + herbRight * 2.5 - dRight * 0.5;
      speedMod = 1.2;
      depositMod = 0.7;
    } else {
      // Forage: wander, weakly seek food and herbivore scent
      bState = 0u;
      totalFwd  = sFwd + fFwd * 0.2 + herbFwd * 0.8 - dFwd * 0.7;
      totalLeft = sLeft + fLeft * 0.2 + herbLeft * 0.8 - dLeft * 0.7;
      totalRight = sRight + fRight * 0.2 + herbRight * 0.8 - dRight * 0.7;
    }

  } else if (species == SP_SCAVENGER) {
    // Scavenger: attracted to danger (corpse signal), weakly avoids predator trail
    let dangerTotal = dFwd + dLeft + dRight;

    if (dangerTotal > 0.2) {
      // Seek state: converge on death zones
      bState = 2u;
      totalFwd  = sFwd * 0.3 + fFwd * 0.3 + dFwd * 2.0 - predFwd * 0.4;
      totalLeft = sLeft * 0.3 + fLeft * 0.3 + dLeft * 2.0 - predLeft * 0.4;
      totalRight = sRight * 0.3 + fRight * 0.3 + dRight * 2.0 - predRight * 0.4;
      speedMod = 1.1;
      depositMod = 0.8;
    } else {
      // Forage: general foraging, mild danger attraction
      bState = 0u;
      totalFwd  = sFwd + fFwd * 0.4 + dFwd * 0.5 - predFwd * 0.3;
      totalLeft = sLeft + fLeft * 0.4 + dLeft * 0.5 - predLeft * 0.3;
      totalRight = sRight + fRight * 0.4 + dRight * 0.5 - predRight * 0.3;
    }

  } else {
    // Symbiont (species 3): follows herbivore trails, deposits symbiont food
    let herbTotal = herbFwd + herbLeft + herbRight;

    if (herbTotal > 0.15) {
      // Follow state: track herbivore trails closely
      bState = 2u;
      totalFwd  = sFwd * 0.4 + fFwd * 0.3 + herbFwd * 2.0 - dFwd * 0.5;
      totalLeft = sLeft * 0.4 + fLeft * 0.3 + herbLeft * 2.0 - dLeft * 0.5;
      totalRight = sRight * 0.4 + fRight * 0.3 + herbRight * 2.0 - dRight * 0.5;
      speedMod = 1.0;
      depositMod = 1.2; // deposits more when actively following
    } else {
      // Forage: wander, seek food, mild herbivore attraction
      bState = 0u;
      totalFwd  = sFwd + fFwd * 0.4 + herbFwd * 0.6 - dFwd * 0.5;
      totalLeft = sLeft + fLeft * 0.4 + herbLeft * 0.6 - dLeft * 0.5;
      totalRight = sRight + fRight * 0.4 + herbRight * 0.6 - dRight * 0.5;
    }
  }

  // ---- Steering decision (shared logic) ----

  let rng = hash(id * 7919u + params.frame * 997u);
  var turnAmount = (rng - 0.5) * 0.15;

  if (totalLeft > totalFwd && totalLeft > totalRight) {
    turnAmount += tSpeed;
  } else if (totalRight > totalFwd && totalRight > totalLeft) {
    turnAmount -= tSpeed;
  } else if (totalLeft > totalRight) {
    turnAmount += tSpeed * 0.5;
  } else if (totalRight > totalLeft) {
    turnAmount -= tSpeed * 0.5;
  }

  // Mouse attraction (shared)
  if (params.mouseActive > 0u) {
    let dx = params.mouseX - x;
    let dy = params.mouseY - y;
    let dist = sqrt(dx * dx + dy * dy);
    if (dist < 200.0 && dist > 1.0) {
      let targetAngle = atan2(dy, dx);
      var angleDiff = targetAngle - angle;
      angleDiff -= floor((angleDiff + 3.14159265) / PI2) * PI2;
      turnAmount += angleDiff * (1.0 - dist / 200.0) * 0.7;
    }
  }

  angle += turnAmount;

  // ---- Movement (shared) ----

  var nx = x + cos(angle) * speed * speedMod * params.moveSpeed;
  var ny = y + sin(angle) * speed * speedMod * params.moveSpeed;
  if (nx < 0.0) { nx += fW; }
  if (nx >= fW) { nx -= fW; }
  if (ny < 0.0) { ny += fH; }
  if (ny >= fH) { ny -= fH; }

  let ix = clamp(u32(nx), 0u, w - 1u);
  let iy = clamp(u32(ny), 0u, h - 1u);
  let pixelIdx = iy * w + ix;
  let trailBase = pixelIdx * CH;

  // ---- Trail deposit (own species channel) ----

  let depMod = select(depositAmt * depositMod, depositAmt * depositMod * 0.3, isAmbient);
  trail[trailBase + species] += depMod;

  // ---- Symbiont: deposit to symbiont food channel ----

  if (species == SP_SYMBIONT) {
    trail[trailBase + CH_SYMBIONT_FOOD] += SYMB_DEPOSIT_FOOD * depositMod;
  }

  // ---- Food consumption (species-specific efficiency) ----

  let currentFood = food[pixelIdx];
  let consumed = min(params.foodConsume * foodEfficiency(species), currentFood);
  food[pixelIdx] = currentFood - consumed;
  energy += consumed * params.energyGain;

  // ---- Species-specific energy interactions ----

  if (species == SP_HERBIVORE) {
    // Herbivore: bonus energy from symbiont food zones
    let symbFoodHere = trail[trailBase + CH_SYMBIONT_FOOD];
    energy += symbFoodHere * HERB_SYMB_FOOD_BONUS;

  } else if (species == SP_PREDATOR) {
    // Predator: energy from consuming herbivore trail
    let herbTrail = trail[trailBase + SP_HERBIVORE];
    energy += herbTrail * PRED_GAIN;
    if (herbTrail > 0.05) {
      trail[trailBase + SP_HERBIVORE] *= PRED_HERB_CONSUME;
    }

  } else if (species == SP_SCAVENGER) {
    // Scavenger: feeds on danger channel (corpse signal)
    let dangerHere = trail[trailBase + CH_DANGER];
    if (dangerHere > SCAV_DANGER_THRESH) {
      energy += dangerHere * SCAV_DANGER_FEED;
      trail[trailBase + CH_DANGER] *= SCAV_DANGER_REDUCE;
    }

  } else {
    // Symbiont: energy bonus when near herbivore trail (mutualism)
    let herbTrailHere = trail[trailBase + SP_HERBIVORE];
    energy += herbTrailHere * SYMB_HERB_BONUS;
  }

  // ---- Off-mask energy drain (shared) ----

  let mask = foodMask[pixelIdx];
  if (mask < 0.1 && !isAmbient) {
    energy -= params.energyDrain;
  }

  // ---- Environmental event drain (shared) ----

  if (!isAmbient && params.eventDeathMult > 1.0) {
    let isTargeted = params.eventPlagueSpecies == 0xFFFFFFFFu || params.eventPlagueSpecies == species;
    if (isTargeted) {
      energy -= (params.eventDeathMult - 1.0) * params.energyDrain * EVENT_DRAIN_SCALE;
    }
  }

  energy = clamp(energy, 0.0, 1.0);

  // ---- Death check ----

  var died = false;
  if (energy <= 0.0) { died = true; }

  // Predator kills on herbivores (predator trail at herbivore position)
  if (!died && species == SP_HERBIVORE) {
    let predTrailHere = trail[trailBase + SP_PREDATOR];
    if (predTrailHere > PRED_KILL_THRESH) {
      let killChance = (predTrailHere - PRED_KILL_THRESH) * PRED_KILL_RATE;
      if (hash(id * 4919u + params.frame * 23u) < killChance) { died = true; }
    }
  }

  if (died) {
    food[pixelIdx] += CORPSE_FOOD_BASE + energy * CORPSE_FOOD_ENERGY_SCALE;

    // Death danger deposit varies by species
    if (species == SP_PREDATOR) {
      // Predator kills create extra danger
      trail[trailBase + CH_DANGER] += DANGER_DEPOSIT * 1.5;
    } else if (species == SP_SCAVENGER) {
      // Scavenger death deposits less danger (already processed)
      trail[trailBase + CH_DANGER] += DANGER_DEPOSIT * 0.3;
    } else {
      trail[trailBase + CH_DANGER] += DANGER_DEPOSIT;
    }

    atomicStore(&alive[id], 0u);
    agents[off + 0u] = nx;
    agents[off + 1u] = ny;
    agents[off + 2u] = angle;
    agents[off + 7u] = 0.0;
    agents[off + 10u] = 0.0;
    agents[off + 11u] = age;
    return;
  }

  // ---- Reproduction (species-specific thresholds, shared mechanism) ----

  let ownTrail = trail[trailBase + species];
  let reproThresh = reproThreshold(species);
  let enoughEnergy = energy > reproThresh;

  // Symbiont has additional requirement: needs herbivore trail nearby for mating signal
  var matingSignal = ownTrail > MATE_TRAIL_REQ;
  if (species == SP_SYMBIONT) {
    let herbNearby = trail[trailBase + SP_HERBIVORE];
    matingSignal = matingSignal && herbNearby > MATE_TRAIL_REQ;
  }

  if (!isAmbient && matingSignal && enoughEnergy) {
    let crowding = max(0.0, 1.0 - max(ownTrail - CROWDING_THRESH, 0.0) * 0.5);
    let reproProb = REPRO_RATE * (energy - reproThresh) * crowding;
    let reproRng = hash(id * 9371u + params.frame * 1117u);

    if (reproRng < reproProb) {
      var slot = 0xFFFFFFFFu;
      for (var scanOff = 1u; scanOff <= CAS_SCAN_COUNT; scanOff++) {
        let candidate = (id + scanOff * 37u) % params.agentCount;
        let result = atomicCompareExchangeWeak(&alive[candidate], 0u, 1u);
        if (result.exchanged) { slot = candidate; break; }
      }

      if (slot != 0xFFFFFFFFu) {
        let seed = id * 101u + params.frame * 53u;
        var childX = nx + (hash(seed + 1u) - 0.5) * 10.0;
        var childY = ny + (hash(seed + 2u) - 0.5) * 10.0;
        if (childX < 0.0) { childX += fW; }
        if (childX >= fW) { childX -= fW; }
        if (childY < 0.0) { childY += fH; }
        if (childY >= fH) { childY -= fH; }

        var spawnValid = foodMask[clamp(u32(childY), 0u, h - 1u) * w + clamp(u32(childX), 0u, w - 1u)] > 0.1;
        if (!spawnValid) {
          for (var attempt = 0u; attempt < 16u; attempt++) {
            let rx = hash(seed + attempt * 7u + 100u) * fW;
            let ry = hash(seed + attempt * 7u + 101u) * fH;
            let rix = clamp(u32(rx), 0u, w - 1u);
            let riy = clamp(u32(ry), 0u, h - 1u);
            if (foodMask[riy * w + rix] > 0.1) {
              childX = rx;
              childY = ry;
              spawnValid = true;
              break;
            }
          }
        }

        if (spawnValid) {
          let childOff = slot * STRIDE;
          let mr = MUTATION_RATE;
          agents[childOff + 0u] = childX;
          agents[childOff + 1u] = childY;
          agents[childOff + 2u] = hash(seed + 3u) * PI2;
          agents[childOff + 3u] = mutateVal(speed, mr, seed + 10u);
          agents[childOff + 4u] = mutateVal(sAngle, mr, seed + 20u);
          agents[childOff + 5u] = mutateVal(sDist, mr, seed + 30u);
          agents[childOff + 6u] = mutateVal(tSpeed, mr, seed + 40u);
          agents[childOff + 7u] = energy * CHILD_ENERGY_FRAC;
          agents[childOff + 8u] = f32(species);
          agents[childOff + 9u] = mutateVal(depositAmt, mr, seed + 50u);
          agents[childOff + 10u] = 0.0;
          agents[childOff + 11u] = 0.0;

          energy *= PARENT_ENERGY_RETAIN;
          trail[trailBase + CH_REPRO] += REPRO_SIGNAL;
        } else {
          atomicStore(&alive[slot], 0u);
        }
      }
    }
  }

  agents[off + 0u] = nx;
  agents[off + 1u] = ny;
  agents[off + 2u] = angle;
  agents[off + 7u] = energy;
  agents[off + 10u] = f32(bState);
  agents[off + 11u] = age;
}
`;

// -- Complex Ecosystem Diffuse Shader (8-channel) ----------------------------

export const WGSL_DIFFUSE_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 8u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trailIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> trailOut: array<f32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let x = gid.x;
  let y = gid.y;
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (x >= w || y >= h) { return; }

  var sums: array<f32, 8>;
  var center: array<f32, 8>;
  var count = 0.0;

  for (var dy = -1i; dy <= 1i; dy++) {
    for (var dx = -1i; dx <= 1i; dx++) {
      let nx = i32(x) + dx;
      let ny = i32(y) + dy;
      if (nx >= 0 && nx < i32(w) && ny >= 0 && ny < i32(h)) {
        let base = (u32(ny) * w + u32(nx)) * CH;
        for (var ch = 0u; ch < CH; ch++) {
          sums[ch] += trailIn[base + ch];
        }
        count += 1.0;
      }
    }
  }

  let base = (y * w + x) * CH;
  for (var ch = 0u; ch < CH; ch++) {
    center[ch] = trailIn[base + ch];
  }

  let d = params.trailDecay;

  // Per-channel decay rates:
  // ch 0-3: species trails (standard decay)
  // ch 4: danger (fast decay — corpse signal fades quickly)
  // ch 5: repro (slow decay — reproductive signal lingers)
  // ch 6: symbiont food (medium decay)
  // ch 7: spare (standard decay)
  var decays: array<f32, 8>;
  decays[0] = d;
  decays[1] = d;
  decays[2] = d;
  decays[3] = d;
  decays[4] = min(d + 0.069, 0.999);
  decays[5] = d - 0.03;
  decays[6] = d - 0.015;
  decays[7] = d;

  // Per-channel diffusion rates:
  // ch 0-3: species trails (standard diffusion)
  // ch 4: danger (low diffuse — stays localized)
  // ch 5: repro (high diffuse — spreads widely)
  // ch 6: symbiont food (medium diffuse)
  // ch 7: spare (standard diffusion)
  var diffs: array<f32, 8>;
  diffs[0] = params.trailDiffuse;
  diffs[1] = params.trailDiffuse;
  diffs[2] = params.trailDiffuse;
  diffs[3] = params.trailDiffuse;
  diffs[4] = 0.02;
  diffs[5] = 0.3;
  diffs[6] = 0.15;
  diffs[7] = params.trailDiffuse;

  for (var ch = 0u; ch < CH; ch++) {
    let blurred = sums[ch] / count;
    trailOut[base + ch] = max(mix(center[ch], blurred, diffs[ch]) * decays[ch], 0.0);
  }
}
`;

// -- Complex Ecosystem Population Count Shader --------------------------------

export const WGSL_POP_COUNT_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const STRIDE = 12u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;
@group(0) @binding(2) var<storage, read> alive: array<u32>;
@group(0) @binding(3) var<storage, read_write> counts: array<atomic<u32>, 5>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let id = gid.x;
  if (id >= params.agentCount) { return; }
  if (alive[id] == 0u) { return; }

  let species = u32(agents[id * STRIDE + 8u]);
  let idx = min(species, 3u);
  atomicAdd(&counts[idx], 1u);
  atomicAdd(&counts[4u], 1u);
}
`;

// -- Complex Mode Render Shaders (4 species) ----------------------------------

// Trail render: complex mode. 4 species from 8-channel trail buffer.
export const WGSL_RENDER_TRAIL_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 8u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trail: array<f32>;
@group(0) @binding(2) var<storage, read> food: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(3) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

fn tm(v: f32) -> f32 { return 1.0 - exp(-v * 3.0); }

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;
  let base = idx * CH;

  let herbivore = trail[base];
  let predator = trail[base + 1u];
  let scavenger = trail[base + 2u];
  let symbiont = trail[base + 3u];
  let danger = trail[base + 4u];

  let t0 = tm(herbivore);
  let t1 = tm(predator);
  let t2 = tm(scavenger);
  let t3 = tm(symbiont);

  let palHerb = colors.slot0.rgb;
  let palPred = colors.slot1.rgb;
  let palScav = colors.slot2.rgb;
  let palSymb = colors.slot3.rgb;

  let total = t0 + t1 + t2 + t3 + 0.0001;
  let w0 = t0 / total;
  let w1 = t1 / total;
  let w2 = t2 / total;
  let w3 = t3 / total;
  let speciesColor = palHerb * w0 + palPred * w1 + palScav * w2 + palSymb * w3;

  let peak = max(max(t0, t1), max(t2, t3));
  let intensity = tm(peak * 1.2 + total * 0.12);

  var color = speciesColor * intensity;

  let overlap = min(t0, t1) + min(t1, t2) + min(t2, t3) + min(t0, t3);
  color += vec3f(0.25, 0.22, 0.2) * tm(overlap * 2.0) * 0.25;

  let da = tm(danger);
  color = mix(color, vec3f(0.08, 0.0, 0.0), da * 0.35);

  return vec4f(color, 1.0);
}
`;

// Point Sprites render: complex mode. 4 species colors.
export const WGSL_RENDER_POINTS_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const STRIDE = 12u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;
@group(0) @binding(2) var<storage, read> alive: array<u32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(3) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) alpha: f32,
  @location(1) @interpolate(flat) species: u32,
}

@vertex fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VOut {
  var o: VOut;

  if (ii >= params.agentCount || alive[ii] == 0u) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    o.species = 0u;
    return o;
  }

  let off = ii * STRIDE;
  let ax = agents[off + 0u];
  let ay = agents[off + 1u];
  let energy = agents[off + 7u];
  let sp = u32(agents[off + 8u]);

  let quadX = array<f32, 6>(-1.0, 1.0, -1.0, 1.0, 1.0, -1.0);
  let quadY = array<f32, 6>(-1.0, -1.0, 1.0, -1.0, 1.0, 1.0);

  let size = 1.0 + clamp(energy, 0.0, 1.0) * 2.0;
  let dx = quadX[vi] * size;
  let dy = quadY[vi] * size;

  let ndcX = (ax + dx) / f32(params.gridWidth) * 2.0 - 1.0;
  let ndcY = -((ay + dy) / f32(params.gridHeight) * 2.0 - 1.0);

  o.pos = vec4f(ndcX, ndcY, 0.0, 1.0);
  o.alpha = clamp(energy * 0.8, 0.05, 0.9);
  o.species = min(sp, 3u);
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  var color: vec3f;
  switch in.species {
    case 0u: { color = colors.slot0.rgb; }
    case 1u: { color = colors.slot1.rgb; }
    case 2u: { color = colors.slot2.rgb; }
    case 3u: { color = colors.slot3.rgb; }
    default: { color = colors.slot0.rgb; }
  }
  return vec4f(color * in.alpha, in.alpha);
}
`;

// SDF Seed: complex mode. 4 species, 8 ints per pixel.
export const WGSL_SDF_SEED_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 8u;
const THRESHOLD = 0.02;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trail: array<f32>;
@group(0) @binding(2) var<storage, read_write> seeds: array<i32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let idx = gid.y * w + gid.x;
  let tBase = idx * CH;
  let sBase = idx * 8u;

  for (var sp = 0u; sp < 4u; sp++) {
    let val = trail[tBase + sp];
    let off = sBase + sp * 2u;
    if (val > THRESHOLD) {
      seeds[off]      = i32(gid.x);
      seeds[off + 1u] = i32(gid.y);
    } else {
      seeds[off]      = -1;
      seeds[off + 1u] = -1;
    }
  }
}
`;

// SDF JFA: complex mode. 8 ints per pixel, 4 species.
export const WGSL_SDF_JFA_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> seedsIn: array<i32>;
@group(0) @binding(2) var<storage, read_write> seedsOut: array<i32>;
@group(0) @binding(3) var<uniform> stepBuf: array<u32, 4>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let step = i32(stepBuf[0]);
  let idx = gid.y * w + gid.x;
  let px = i32(gid.x);
  let py = i32(gid.y);

  var bestX: array<i32, 4>;
  var bestY: array<i32, 4>;
  var bestDist: array<f32, 4>;

  let sBase = idx * 8u;
  for (var sp = 0u; sp < 4u; sp++) {
    bestX[sp] = seedsIn[sBase + sp * 2u];
    bestY[sp] = seedsIn[sBase + sp * 2u + 1u];
    bestDist[sp] = 999999999.0;
    if (bestX[sp] >= 0) {
      let ddx = f32(px - bestX[sp]);
      let ddy = f32(py - bestY[sp]);
      bestDist[sp] = ddx * ddx + ddy * ddy;
    }
  }

  for (var dy = -1; dy <= 1; dy++) {
    for (var dx = -1; dx <= 1; dx++) {
      let nx = px + dx * step;
      let ny = py + dy * step;
      if (nx < 0 || nx >= i32(w) || ny < 0 || ny >= i32(h)) { continue; }

      let nIdx = u32(ny) * w + u32(nx);
      let nBase = nIdx * 8u;

      for (var sp = 0u; sp < 4u; sp++) {
        let sx = seedsIn[nBase + sp * 2u];
        let sy = seedsIn[nBase + sp * 2u + 1u];
        if (sx < 0) { continue; }

        let ddx = f32(px - sx);
        let ddy = f32(py - sy);
        let d = ddx * ddx + ddy * ddy;
        if (d < bestDist[sp]) {
          bestDist[sp] = d;
          bestX[sp] = sx;
          bestY[sp] = sy;
        }
      }
    }
  }

  let oBase = idx * 8u;
  for (var sp = 0u; sp < 4u; sp++) {
    seedsOut[oBase + sp * 2u]      = bestX[sp];
    seedsOut[oBase + sp * 2u + 1u] = bestY[sp];
  }
}
`;

// SDF Glow render: complex mode. 4 species SDF glows.
export const WGSL_RENDER_SDF_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> seeds: array<i32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;
  let sBase = idx * 8u;

  let maxDim = f32(max(w, h));
  let scale = maxDim * 0.08;

  let speciesColors = array<vec3f, 4>(
    colors.slot0.rgb,
    colors.slot1.rgb,
    colors.slot2.rgb,
    colors.slot3.rgb
  );

  var color = vec3f(0.0);

  for (var sp = 0u; sp < 4u; sp++) {
    let sx = seeds[sBase + sp * 2u];
    let sy = seeds[sBase + sp * 2u + 1u];
    if (sx < 0) { continue; }

    let dx = f32(i32(px) - sx);
    let dy = f32(i32(py) - sy);
    let dist = sqrt(dx * dx + dy * dy);
    let normDist = dist / scale;

    let coreGlow = exp(-normDist * normDist * 8.0);
    let outerGlow = exp(-normDist * 1.5);

    color += speciesColors[sp] * (coreGlow + outerGlow * 0.4);
  }

  return vec4f(color + vec3f(0.003, 0.002, 0.005), 1.0);
}
`;

// RD compute: complex mode. 4 species, 8 floats per pixel (U0,V0,U1,V1,U2,V2,U3,V3).
export const WGSL_RD_COMPUTE_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 8u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> rdIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> rdOut: array<f32>;
@group(0) @binding(3) var<storage, read> trail: array<f32>;

const Du = 0.21;
const Dv = 0.105;
const FEED = 0.037;
const KILL = 0.06;
const DT = 1.0;
const SEED_STRENGTH = 0.012;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let x = gid.x;
  let y = gid.y;
  let idx = y * w + x;

  for (var sp = 0u; sp < 4u; sp++) {
    let base = idx * CH + sp * 2u;

    let u = rdIn[base];
    let v = rdIn[base + 1u];

    var lapU = 0.0;
    var lapV = 0.0;
    let weights = array<f32, 9>(0.05, 0.2, 0.05, 0.2, -1.0, 0.2, 0.05, 0.2, 0.05);
    var wi = 0u;
    for (var dy = -1i; dy <= 1i; dy++) {
      for (var dx = -1i; dx <= 1i; dx++) {
        let nx = clamp(i32(x) + dx, 0, i32(w) - 1);
        let ny = clamp(i32(y) + dy, 0, i32(h) - 1);
        let nIdx = u32(ny) * w + u32(nx);
        let nb = nIdx * CH + sp * 2u;
        let wt = weights[wi];
        lapU += rdIn[nb] * wt;
        lapV += rdIn[nb + 1u] * wt;
        wi++;
      }
    }

    let tBase = idx * CH;
    let trailVal = trail[tBase + sp];
    let seedU = trailVal * SEED_STRENGTH;

    let uvv = u * v * v;
    let newU = u + DT * (Du * lapU - uvv + FEED * (1.0 - u) + seedU);
    let newV = v + DT * (Dv * lapV + uvv - (FEED + KILL) * v);

    rdOut[base]      = clamp(newU, 0.0, 1.0);
    rdOut[base + 1u] = clamp(newV, 0.0, 1.0);
  }
}
`;

// RD render: complex mode. 4 species RD channels.
export const WGSL_RENDER_RD_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 8u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> rd: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;
  let rdBase = idx * CH;

  let speciesColors = array<vec3f, 4>(
    colors.slot0.rgb,
    colors.slot1.rgb,
    colors.slot2.rgb,
    colors.slot3.rgb
  );

  var color = vec3f(0.0);

  for (var sp = 0u; sp < 4u; sp++) {
    let u = rd[rdBase + sp * 2u];
    let v = rd[rdBase + sp * 2u + 1u];

    let uI = smoothstep(0.1, 0.9, u);
    let vI = smoothstep(0.0, 0.5, v);
    let intensity = uI * (1.0 - vI * 0.3) + vI * 0.6;

    color += speciesColors[sp] * intensity;
  }

  return vec4f(color + vec3f(0.003, 0.002, 0.005), 1.0);
}
`;

// Metaballs blur: complex mode. 8-channel trail → 4-channel blur output.
export const WGSL_MB_BLUR_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const TRAIL_CH = 8u;
const OUT_CH = 4u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trailIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> blurOut: array<f32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let x = i32(gid.x);
  let y = i32(gid.y);

  let k = array<f32, 25>(
    1.0,  4.0,  7.0,  4.0, 1.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    7.0, 26.0, 41.0, 26.0, 7.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    1.0,  4.0,  7.0,  4.0, 1.0
  );
  let kSum = 273.0;

  var acc0 = 0.0;
  var acc1 = 0.0;
  var acc2 = 0.0;
  var acc3 = 0.0;
  var ki = 0u;
  for (var dy = -2i; dy <= 2i; dy++) {
    for (var dx = -2i; dx <= 2i; dx++) {
      let nx = clamp(x + dx, 0, i32(w) - 1);
      let ny = clamp(y + dy, 0, i32(h) - 1);
      let nIdx = u32(ny) * w + u32(nx);
      let tBase = nIdx * TRAIL_CH;
      let wt = k[ki];
      acc0 += trailIn[tBase + 0u] * wt;
      acc1 += trailIn[tBase + 1u] * wt;
      acc2 += trailIn[tBase + 2u] * wt;
      acc3 += trailIn[tBase + 3u] * wt;
      ki++;
    }
  }

  let idx = gid.y * w + gid.x;
  let oBase = idx * OUT_CH;
  blurOut[oBase + 0u] = acc0 / kSum;
  blurOut[oBase + 1u] = acc1 / kSum;
  blurOut[oBase + 2u] = acc2 / kSum;
  blurOut[oBase + 3u] = acc3 / kSum;
}
`;

// Metaballs re-blur: complex mode. 4-channel blur pass.
export const WGSL_MB_REBLUR_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 4u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> blurIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> blurOut: array<f32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (gid.x >= w || gid.y >= h) { return; }

  let x = i32(gid.x);
  let y = i32(gid.y);

  let k = array<f32, 25>(
    1.0,  4.0,  7.0,  4.0, 1.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    7.0, 26.0, 41.0, 26.0, 7.0,
    4.0, 16.0, 26.0, 16.0, 4.0,
    1.0,  4.0,  7.0,  4.0, 1.0
  );
  let kSum = 273.0;

  var acc0 = 0.0;
  var acc1 = 0.0;
  var acc2 = 0.0;
  var acc3 = 0.0;
  var ki = 0u;
  for (var dy = -2i; dy <= 2i; dy++) {
    for (var dx = -2i; dx <= 2i; dx++) {
      let nx = clamp(x + dx, 0, i32(w) - 1);
      let ny = clamp(y + dy, 0, i32(h) - 1);
      let nIdx = u32(ny) * w + u32(nx);
      let base = nIdx * CH;
      let wt = k[ki];
      acc0 += blurIn[base + 0u] * wt;
      acc1 += blurIn[base + 1u] * wt;
      acc2 += blurIn[base + 2u] * wt;
      acc3 += blurIn[base + 3u] * wt;
      ki++;
    }
  }

  let idx = gid.y * w + gid.x;
  let oBase = idx * CH;
  blurOut[oBase + 0u] = acc0 / kSum;
  blurOut[oBase + 1u] = acc1 / kSum;
  blurOut[oBase + 2u] = acc2 / kSum;
  blurOut[oBase + 3u] = acc3 / kSum;
}
`;

// Metaballs render: complex mode. 4 species thresholds.
export const WGSL_RENDER_METABALLS_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const OUT_CH = 4u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> blur: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(2) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;
  let bBase = idx * OUT_CH;

  let speciesColors = array<vec3f, 4>(
    colors.slot0.rgb,
    colors.slot1.rgb,
    colors.slot2.rgb,
    colors.slot3.rgb
  );

  let threshold = 0.15;
  let edgeWidth = 0.06;

  var color = vec3f(0.0);

  for (var sp = 0u; sp < 4u; sp++) {
    let v = blur[bBase + sp];
    let surface = smoothstep(threshold - edgeWidth, threshold, v);
    color += speciesColors[sp] * surface;
  }

  return vec4f(color, 1.0);
}
`;

// Trail Lines render: complex mode. 4 species line coloring.
export const WGSL_RENDER_LINES_COMPLEX = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const AGENT_STRIDE = 12u;
const RING_SIZE = 16u;
const SEGMENTS = 15u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;
@group(0) @binding(2) var<storage, read> ring: array<f32>;
@group(0) @binding(3) var<storage, read> alive: array<u32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(4) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) alpha: f32,
  @location(1) @interpolate(flat) species: u32,
}

@vertex fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VOut {
  var o: VOut;

  if (ii >= params.agentCount || alive[ii] == 0u) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    o.species = 0u;
    return o;
  }

  let segIdx = vi / 2u;
  let endPt = vi % 2u;

  if (segIdx >= SEGMENTS) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    o.species = 0u;
    return o;
  }

  let pointIdx = segIdx + endPt;
  let currentSlot = params.frame % RING_SIZE;
  let slot = (currentSlot + 1u + pointIdx) % RING_SIZE;

  let ringOff = (ii * RING_SIZE + slot) * 2u;
  let x = ring[ringOff + 0u];
  let y = ring[ringOff + 1u];

  if (x < 0.0) {
    o.pos = vec4f(0.0, 0.0, -2.0, 1.0);
    o.alpha = 0.0;
    o.species = 0u;
    return o;
  }

  let brightness = f32(pointIdx + 1u) / f32(RING_SIZE);

  let agentOff = ii * AGENT_STRIDE;
  let energy = agents[agentOff + 7u];
  let sp = u32(agents[agentOff + 8u]);

  let ndcX = x / f32(params.gridWidth) * 2.0 - 1.0;
  let ndcY = -(y / f32(params.gridHeight) * 2.0 - 1.0);

  o.pos = vec4f(ndcX, ndcY, 0.0, 1.0);
  o.alpha = brightness * clamp(energy * 0.8, 0.1, 0.9);
  o.species = min(sp, 3u);
  return o;
}

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  var color: vec3f;
  switch in.species {
    case 0u: { color = colors.slot0.rgb; }
    case 1u: { color = colors.slot1.rgb; }
    case 2u: { color = colors.slot2.rgb; }
    case 3u: { color = colors.slot3.rgb; }
    default: { color = colors.slot0.rgb; }
  }
  return vec4f(color * in.alpha, in.alpha);
}
`;

export const WGSL_DIFFUSE_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 6u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trailIn: array<f32>;
@group(0) @binding(2) var<storage, read_write> trailOut: array<f32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let x = gid.x;
  let y = gid.y;
  let w = params.gridWidth;
  let h = params.gridHeight;
  if (x >= w || y >= h) { return; }

  var sums: array<f32, 6>;
  var center: array<f32, 6>;
  var count = 0.0;

  for (var dy = -1i; dy <= 1i; dy++) {
    for (var dx = -1i; dx <= 1i; dx++) {
      let nx = i32(x) + dx;
      let ny = i32(y) + dy;
      if (nx >= 0 && nx < i32(w) && ny >= 0 && ny < i32(h)) {
        let base = (u32(ny) * w + u32(nx)) * CH;
        for (var ch = 0u; ch < CH; ch++) {
          sums[ch] += trailIn[base + ch];
        }
        count += 1.0;
      }
    }
  }

  let base = (y * w + x) * CH;
  for (var ch = 0u; ch < CH; ch++) {
    center[ch] = trailIn[base + ch];
  }

  let d = params.trailDecay;
  var decays: array<f32, 6>;
  decays[0] = d;
  decays[1] = d;
  decays[2] = d;
  decays[3] = min(d + 0.069, 0.999);
  decays[4] = d - 0.03;
  decays[5] = d;

  var diffs: array<f32, 6>;
  diffs[0] = params.trailDiffuse;
  diffs[1] = params.trailDiffuse;
  diffs[2] = params.trailDiffuse;
  diffs[3] = 0.02;
  diffs[4] = 0.3;
  diffs[5] = params.trailDiffuse;

  for (var ch = 0u; ch < CH; ch++) {
    let blurred = sums[ch] / count;
    trailOut[base + ch] = max(mix(center[ch], blurred, diffs[ch]) * decays[ch], 0.0);
  }
}
`;

export const WGSL_RENDER_ECO = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const CH = 6u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> trail: array<f32>;
@group(0) @binding(2) var<storage, read> food: array<f32>;

struct RenderColors {
  slot0: vec4f,
  slot1: vec4f,
  slot2: vec4f,
  slot3: vec4f,
}
@group(0) @binding(3) var<uniform> colors: RenderColors;

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var o: VOut;
  o.uv = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  o.pos = vec4f(o.uv * 2.0 - 1.0, 0.0, 1.0);
  o.uv.y = 1.0 - o.uv.y;
  return o;
}

fn tm(v: f32) -> f32 { return 1.0 - exp(-v * 3.0); }

@fragment fn fs(in: VOut) -> @location(0) vec4f {
  let w = params.gridWidth;
  let h = params.gridHeight;
  let px = clamp(u32(in.uv.x * f32(w)), 0u, w - 1u);
  let py = clamp(u32(in.uv.y * f32(h)), 0u, h - 1u);
  let idx = py * w + px;
  let base = idx * CH;

  let alpha = trail[base];
  let beta = trail[base + 1u];
  let gamma_val = trail[base + 2u];
  let danger = trail[base + 3u];
  let repro = trail[base + 4u];
  let t0 = tm(alpha);
  let t1 = tm(beta);
  let t2 = tm(gamma_val);

  let palAlpha = colors.slot0.rgb;
  let palBeta = colors.slot1.rgb;
  let palGamma = colors.slot2.rgb;

  let total = t0 + t1 + t2 + 0.0001;
  let w0 = t0 / total;
  let w1 = t1 / total;
  let w2 = t2 / total;
  let speciesColor = palAlpha * w0 + palBeta * w1 + palGamma * w2;

  let peak = max(t0, max(t1, t2));
  let intensity = tm(peak * 1.2 + total * 0.15);

  var color = speciesColor * intensity;

  let overlap = min(t0, t1) + min(t1, t2) + min(t0, t2);
  color += vec3f(0.25, 0.22, 0.2) * tm(overlap * 2.0) * 0.3;

  let da = tm(danger);
  color = mix(color, vec3f(0.08, 0.0, 0.0), da * 0.35);

  return vec4f(color, 1.0);
}
`;

export const WGSL_POP_COUNT = /* wgsl */`
${WGSL_PARAMS_STRUCT}

const STRIDE = 12u;

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> agents: array<f32>;
@group(0) @binding(2) var<storage, read> alive: array<u32>;
@group(0) @binding(3) var<storage, read_write> counts: array<atomic<u32>, 4>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let id = gid.x;
  if (id >= params.agentCount) { return; }
  if (alive[id] == 0u) { return; }

  let species = u32(agents[id * STRIDE + 8u]);
  let idx = min(species, 2u);
  atomicAdd(&counts[idx], 1u);
  atomicAdd(&counts[3u], 1u);
}
`;

// -- Render Mode Config (Phase 1: trail only, others declared for future) ----

export const RENDER_MODE_CONFIG = Object.freeze({
  trail: {
    label: 'Trail',
    colorSlots: {
      simple:    [{ key: 'lo', label: 'Low' }, { key: 'hi', label: 'High' }],
      ecosystem: [{ key: 'alpha', label: 'Alpha' }, { key: 'beta', label: 'Beta' }, { key: 'gamma', label: 'Gamma' }],
      complex:   [{ key: 'herbivore', label: 'Herbivore' }, { key: 'predator', label: 'Predator' }, { key: 'scavenger', label: 'Scavenger' }, { key: 'symbiont', label: 'Symbiont' }],
    },
    defaultColors: {
      simple:    { lo: '#0F0500', hi: '#FFF2D9' },
      ecosystem: { alpha: '#0D59E6', beta: '#F2730D', gamma: '#D91A99' },
      complex:   { herbivore: '#2ECC40', predator: '#E8300D', scavenger: '#F2A30D', symbiont: '#0DC8E8' },
    },
    hasQuality: false,
  },
  points: {
    label: 'Point Sprites',
    colorSlots: {
      simple:    [{ key: 'particle', label: 'Particle' }],
      ecosystem: [{ key: 'alpha', label: 'Alpha' }, { key: 'beta', label: 'Beta' }, { key: 'gamma', label: 'Gamma' }],
      complex:   [{ key: 'herbivore', label: 'Herbivore' }, { key: 'predator', label: 'Predator' }, { key: 'scavenger', label: 'Scavenger' }, { key: 'symbiont', label: 'Symbiont' }],
    },
    defaultColors: {
      simple:    { particle: '#FFFFFF' },
      ecosystem: { alpha: '#0D59E6', beta: '#F2730D', gamma: '#D91A99' },
      complex:   { herbivore: '#2ECC40', predator: '#E8300D', scavenger: '#F2A30D', symbiont: '#0DC8E8' },
    },
    hasQuality: false,
  },
  sdf: {
    label: 'SDF Glow',
    colorSlots: {
      simple:    [{ key: 'core', label: 'Core' }, { key: 'falloff', label: 'Falloff' }],
      ecosystem: [{ key: 'alpha', label: 'Alpha' }, { key: 'beta', label: 'Beta' }, { key: 'gamma', label: 'Gamma' }],
      complex:   [{ key: 'herbivore', label: 'Herbivore' }, { key: 'predator', label: 'Predator' }, { key: 'scavenger', label: 'Scavenger' }, { key: 'symbiont', label: 'Symbiont' }],
    },
    defaultColors: {
      simple:    { core: '#00FFCC', falloff: '#003366' },
      ecosystem: { alpha: '#3399FF', beta: '#FF6633', gamma: '#CC33FF' },
      complex:   { herbivore: '#2ECC40', predator: '#E8300D', scavenger: '#F2A30D', symbiont: '#0DC8E8' },
    },
    hasQuality: true,
  },
  rd: {
    label: 'Reaction-Diffusion',
    colorSlots: {
      simple:    [{ key: 'chemU', label: 'Chemical U' }, { key: 'chemV', label: 'Chemical V' }],
      ecosystem: [{ key: 'alpha', label: 'Alpha' }, { key: 'beta', label: 'Beta' }, { key: 'gamma', label: 'Gamma' }],
      complex:   [{ key: 'herbivore', label: 'Herbivore' }, { key: 'predator', label: 'Predator' }, { key: 'scavenger', label: 'Scavenger' }, { key: 'symbiont', label: 'Symbiont' }],
    },
    defaultColors: {
      simple:    { chemU: '#FF4422', chemV: '#2244FF' },
      ecosystem: { alpha: '#3366FF', beta: '#FF6633', gamma: '#FF33CC' },
      complex:   { herbivore: '#2ECC40', predator: '#E8300D', scavenger: '#F2A30D', symbiont: '#0DC8E8' },
    },
    hasQuality: true,
  },
  metaballs: {
    label: 'Metaballs',
    colorSlots: {
      simple:    [{ key: 'surface', label: 'Surface' }, { key: 'edge', label: 'Edge' }],
      ecosystem: [{ key: 'alpha', label: 'Alpha' }, { key: 'beta', label: 'Beta' }, { key: 'gamma', label: 'Gamma' }],
      complex:   [{ key: 'herbivore', label: 'Herbivore' }, { key: 'predator', label: 'Predator' }, { key: 'scavenger', label: 'Scavenger' }, { key: 'symbiont', label: 'Symbiont' }],
    },
    defaultColors: {
      simple:    { surface: '#FF6600', edge: '#FFFFFF' },
      ecosystem: { alpha: '#0066FF', beta: '#FF8800', gamma: '#CC00FF' },
      complex:   { herbivore: '#2ECC40', predator: '#E8300D', scavenger: '#F2A30D', symbiont: '#0DC8E8' },
    },
    hasQuality: true,
  },
  lines: {
    label: 'Trail Lines',
    colorSlots: {
      simple:    [{ key: 'line', label: 'Line' }],
      ecosystem: [{ key: 'alpha', label: 'Alpha' }, { key: 'beta', label: 'Beta' }, { key: 'gamma', label: 'Gamma' }],
      complex:   [{ key: 'herbivore', label: 'Herbivore' }, { key: 'predator', label: 'Predator' }, { key: 'scavenger', label: 'Scavenger' }, { key: 'symbiont', label: 'Symbiont' }],
    },
    defaultColors: {
      simple:    { line: '#00FF88' },
      ecosystem: { alpha: '#0D59E6', beta: '#F2730D', gamma: '#D91A99' },
      complex:   { herbivore: '#2ECC40', predator: '#E8300D', scavenger: '#F2A30D', symbiont: '#0DC8E8' },
    },
    hasQuality: false,
  },
});

// -- Styles ------------------------------------------------------------------

const STYLES = /* css */`
:host {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #050508;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: crosshair;
}
.config-panel {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: #08080d;
  display: flex;
  flex-direction: column;
  font-family: 'Courier New', monospace;
  color: #bbb;
  font-size: 12px;
}
.config-panel.hidden { display: none; }
.config-scroll {
  flex: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 40px 20px 20px;
}
.config-inner { max-width: 520px; width: 100%; }
.config-title {
  color: #444;
  font-size: 11px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  margin-bottom: 24px;
  text-align: center;
}
.tab-bar {
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 1px solid #1a1a26;
}
.tab-bar button {
  background: none;
  border: none;
  color: #555;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}
.tab-bar button:hover { color: #999; }
.tab-bar button.active {
  color: #e87010;
  border-bottom-color: #e87010;
}
.tab-content { display: none; }
.tab-content.active { display: block; }
.section-label {
  color: #444;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 20px 0 10px;
}
.param-row { margin-bottom: 8px; }
.param-label {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #888;
  margin-bottom: 3px;
}
.param-value { color: #e87010; font-variant-numeric: tabular-nums; }
input[type="range"] {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #1a1a26;
  border-radius: 2px;
  outline: none;
  margin: 4px 0;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: #e87010;
  border-radius: 50%;
  cursor: pointer;
}
select {
  background: #0d0d14;
  color: #bbb;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  padding: 6px 10px;
  font-family: inherit;
  font-size: 11px;
  outline: none;
  cursor: pointer;
}
select:focus { border-color: #e87010; }
select option:disabled { color: #444; }
.mode-toggle {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}
.mode-toggle label {
  font-size: 11px;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
.mode-toggle label:has(input:disabled) { color: #444; cursor: default; }
.mode-toggle input[type="radio"] { accent-color: #e87010; }
.regen-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.regen-row label {
  font-size: 11px;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
.regen-row input[type="checkbox"] { accent-color: #e87010; }
.btn-row {
  flex-shrink: 0;
  background: #08080d;
  border-top: 1px solid #1a1a26;
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.btn-row-inner {
  max-width: 520px;
  width: 100%;
  display: flex;
  gap: 10px;
}
.start-btn, .random-btn {
  flex: 1;
  padding: 12px;
  font-family: inherit;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.start-btn {
  background: #e87010;
  color: #fff;
  border-color: #e87010;
}
.start-btn:hover { background: #ff8020; border-color: #ff8020; }
.random-btn {
  background: transparent;
  color: #888;
}
.random-btn:hover { background: #111; border-color: #333; }
.guardar-btn, .save-btn, .load-btn {
  flex: 0 0 auto;
  padding: 12px 10px;
  font-family: inherit;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: transparent;
  color: #555;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.guardar-btn:hover, .save-btn:hover, .load-btn:hover { color: #bbb; border-color: #333; }
.saved-sim-list { display: flex; flex-direction: column; gap: 6px; padding: 8px 0; }
.saved-sim-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border: 1px solid #1a1a26; border-radius: 4px; }
.saved-sim-name { font-size: 10px; letter-spacing: 0.08em; color: #555; text-transform: uppercase; }
.saved-sim-load { font-family: inherit; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; background: transparent; color: #555; border: 1px solid #1a1a26; border-radius: 4px; padding: 4px 8px; cursor: pointer; }
.saved-sim-load:hover { color: #bbb; border-color: #333; }
.gear-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 5;
  background: none;
  border: none;
  color: #444;
  font-size: 22px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.15s;
  display: none;
}
.gear-btn:hover { color: #888; }
.fallback-message {
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  color: #555;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  text-align: center;
  padding: 20px;
  z-index: 20;
  background: #050508;
}
.mask-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.mask-row span { font-size: 11px; color: #888; }
.render-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.render-row span { font-size: 11px; color: #888; }
.color-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.color-row label { font-size: 11px; color: #888; min-width: 50px; }
.color-row input[type="color"] {
  width: 32px;
  height: 24px;
  border: 1px solid #1a1a26;
  border-radius: 3px;
  background: none;
  cursor: pointer;
  padding: 0;
}
.color-row input[type="text"] {
  width: 72px;
  background: #0d0d14;
  border: 1px solid #1a1a26;
  border-radius: 3px;
  color: #bbb;
  font-family: inherit;
  font-size: 11px;
  padding: 3px 6px;
}
.placeholder-text {
  color: #333;
  font-size: 11px;
  font-style: italic;
  padding: 20px 0;
}
.morph-scroll-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.morph-scroll-row label {
  font-size: 11px;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
.morph-scroll-row input[type="checkbox"] { accent-color: #e87010; }
.audio-mute-toggle, .audio-reactive-toggle { accent-color: #e87010; }
.audio-species-mute-row { margin-bottom: 12px; }
.audio-species-mute-row label { font-size: 11px; color: #888; cursor: pointer; }
.audio-species-mute-row input[type="checkbox"] { accent-color: #e87010; margin-right: 3px; }
.morph-target-list { margin-bottom: 12px; }
.morph-target-entry {
  background: #0d0d14;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 8px;
}
.morph-target-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.morph-target-num {
  font-size: 10px;
  color: #555;
  min-width: 20px;
}
.morph-target-header select {
  flex: 1;
}
.morph-target-up, .morph-target-down, .morph-target-remove {
  background: none;
  border: 1px solid #1a1a26;
  border-radius: 3px;
  color: #555;
  font-size: 11px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.15s, border-color 0.15s;
}
.morph-target-up:hover, .morph-target-down:hover { color: #bbb; border-color: #333; }
.morph-target-remove:hover { color: #e85050; border-color: #e85050; }
.morph-target-params { margin-top: 6px; }
.morph-target-params.hidden { display: none; }
.morph-target-text-params, .morph-target-image-params, .morph-target-3d-params { display: none; }
.morph-target-text-params.visible, .morph-target-image-params.visible, .morph-target-3d-params.visible { display: block; }
.morph-target-text-params input[type="text"],
.morph-target-image-params input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  background: #111118;
  border: 1px solid #1a1a26;
  border-radius: 3px;
  color: #bbb;
  font-family: inherit;
  font-size: 11px;
  padding: 6px 8px;
  outline: none;
}
.morph-target-text-params input:focus,
.morph-target-image-params input:focus { border-color: #e87010; }
.morph-target-image-row { display: flex; gap: 6px; align-items: center; }
.morph-target-image-row input[type="text"] { flex: 1; }
.morph-target-image-pick {
  display: inline-block;
  background: #1a1a26; border: 1px solid #2a2a3a; border-radius: 3px;
  color: #888; font-family: inherit; font-size: 10px; padding: 5px 8px;
  cursor: pointer; white-space: nowrap;
}
.morph-target-image-pick:hover { border-color: #e87010; color: #bbb; }
.morph-target-image-preview {
  display: none; margin-top: 6px; max-width: 100%; max-height: 60px;
  border-radius: 3px; opacity: 0.7;
}
.morph-target-image-preview.visible { display: block; }
.morph-target-3d-params {
  display: none;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.morph-target-3d-params.visible { display: flex; }
.morph-target-3d-params select {
  background: #111118;
  font-size: 11px;
  padding: 4px 8px;
}
.morph-target-3d-params label {
  font-size: 11px;
  color: #bbb;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
}
.morph-target-3d-params input[type="checkbox"] { accent-color: #e87010; }
.morph-target-regen-row {
  margin-top: 6px;
}
.morph-target-regen-row label {
  font-size: 10px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.morph-target-regen-row input[type="checkbox"] { accent-color: #e87010; }
.morph-add-row { margin-bottom: 12px; }
.morph-add-btn {
  width: 100%;
  background: transparent;
  border: 1px dashed #1a1a26;
  border-radius: 4px;
  color: #555;
  font-family: inherit;
  font-size: 11px;
  padding: 8px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.morph-add-btn:hover { color: #e87010; border-color: #e87010; }
.morph-apply-btn {
  width: 100%;
  background: #1a1a26;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  color: #bbb;
  font-family: inherit;
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 10px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.morph-apply-btn:hover { background: #222230; border-color: #e87010; }
.morph-clear-btn {
  width: 100%;
  background: transparent;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  color: #555;
  font-family: inherit;
  font-size: 11px;
  padding: 8px;
  cursor: pointer;
  margin-top: 8px;
  transition: color 0.15s, border-color 0.15s;
}
.morph-clear-btn:hover { color: #e85050; border-color: #e85050; }
.mask-controls { margin-top: 12px; }
.mask-controls.hidden { display: none; }
.text-input-row { margin-bottom: 12px; }
.text-input-row label { font-size: 11px; color: #888; display: block; margin-bottom: 4px; }
.text-input-row input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  background: #0d0d14;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  color: #bbb;
  font-family: inherit;
  font-size: 12px;
  padding: 8px 10px;
  outline: none;
}
.text-input-row input[type="text"]:focus { border-color: #e87010; }
.image-picker-row { margin-bottom: 12px; }
.image-picker-row label { font-size: 11px; color: #888; display: block; margin-bottom: 6px; }
.image-picker-btn {
  display: inline-block;
  background: #0d0d14;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  color: #bbb;
  font-family: inherit;
  font-size: 11px;
  padding: 8px 14px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.image-picker-btn:hover { border-color: #e87010; }
.image-preview {
  margin-top: 8px;
  max-width: 100%;
  max-height: 120px;
  border-radius: 4px;
  display: none;
  object-fit: contain;
  background: #0d0d14;
}
.image-preview.visible { display: block; }
.image-src-row { margin-bottom: 12px; }
.image-src-row label { font-size: 11px; color: #888; display: block; margin-bottom: 4px; }
.image-src-row input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  background: #0d0d14;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  color: #bbb;
  font-family: inherit;
  font-size: 11px;
  padding: 6px 10px;
  outline: none;
}
.image-src-row input[type="text"]:focus { border-color: #e87010; }
.shape-row { margin-bottom: 12px; }
.shape-row label { font-size: 11px; color: #888; display: block; margin-bottom: 4px; }
.shape-row select {
  background: #0d0d14;
  border: 1px solid #1a1a26;
  border-radius: 4px;
  color: #bbb;
  font-family: inherit;
  font-size: 11px;
  padding: 6px 10px;
  outline: none;
  cursor: pointer;
}
.shape-row select:focus { border-color: #e87010; }
.axes-row { margin-bottom: 12px; }
.axes-row > label:first-child { font-size: 11px; color: #888; display: block; margin-bottom: 6px; }
.axes-row label { font-size: 11px; color: #bbb; margin-right: 10px; cursor: pointer; }
.axes-row input[type="checkbox"] { margin-right: 3px; accent-color: #e87010; }
`;

// -- Component ---------------------------------------------------------------

export class Physarum extends HTMLElement {

  static get observedAttributes() {
    return ['mask', 'mode', 'text', 'src', 'shape', 'axes', 'regeneration', 'targets', 'rendermode', 'rendercolors', 'viewport', 'audio', 'audiovolume'];
  }

  static get VALID_RENDER_MODES() {
    return ['trail', 'points', 'sdf', 'rd', 'metaballs', 'lines'];
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    // Canvas and sizing
    this._canvas = null;
    this._resizeObserver = null;
    this._resizeTimeout = null;
    this._width = 0;
    this._height = 0;
    this._simWidth = 0;
    this._simHeight = 0;

    // WebGPU state
    this._adapter = null;
    this._device = null;
    this._ctx = null;
    this._format = null;
    this._gpuReady = false;
    this._initialized = false;
    this._initPromise = null;
    this._restartToken = null;

    // Simulation state
    this._raf = null;
    this._frameCount = 0;
    this._startTime = 0;
    this._simSpeed = 1;
    this._paused = true;
    this._userStarted = false;
    this._userOverrodeAgentCount = false;

    // Mask state
    this._foodMask = null;
    this._foodMasks = [];
    this._importedImageBitmap = null; // Image from file picker
    this._loadedImageBitmap = null;   // Image from src attribute

    // Morph state (Phase 4)
    this._morphTargets = null;        // Parsed+validated targets array
    this._morphMasks = null;          // Pre-generated Float32Array[] for each target
    this._morphIndex = 0;             // Current target index (integer part of scroll progress)
    this._morphT = 0;                 // Interpolation factor 0..1 between morphIndex and morphIndex+1
    this._morphBlendedMask = null;    // Reusable Float32Array for blended mask output
    this._morphImageBitmaps = null;   // ImageBitmaps loaded for image-type targets
    this._morphDirty = false;          // True when morph progress changed, needs blend+upload
    this._lastMorphUploadIndex = -1;   // Last uploaded morph segment index (dirty flag)
    this._lastMorphUploadT = -1;       // Last uploaded morph local t (dirty flag)
    this._morphFlatMasks = null;       // Flattened (silhouette) versions of 3D morph masks
    this._morphTargetTypes = null;     // Mask type per target ('libre'|'text'|'image'|'3d')
    this._morph3DConfigs = null;       // Per-target 3D config {shape, axes} or null for non-3D
    this._morphTargetRegens = null;    // Per-target regeneration booleans (true/false/undefined→component default)

    // Morph tab state
    this._morphTabApplying = false;    // Guard to prevent sync loop when applying from panel

    // Morph scroll binding state
    this._morphScrollEnabled = true;   // Whether morph scroll binding is enabled (panel toggle)
    this._morphScrollSpacer = null;    // Scroll spacer element for morph
    this._morphScrollActive = false;   // Whether morph scroll binding is active
    this._morphScrollRAFPending = false;
    this._morphScrollRAFId = null;
    this._boundMorphScroll = this._onMorphScroll.bind(this);

    // Programmatic morph animation state
    this._morphAnimRAFId = null;       // rAF ID for programmatic morph animation
    this._morphAnimStartTime = null;   // Animation start timestamp (ms)
    this._morphAnimStartProgress = 0;  // Progress at animation start
    this._morphAnimEndProgress = 0;    // Target progress at animation end
    this._morphAnimDuration = 0;       // Duration in ms
    this._morphAnimResolve = null;     // Promise resolve callback
    this._morphAnimReject = null;      // Promise reject callback (for cleanup)

    // 3D mask state
    this._gl = null;
    this._3dCanvas = null;
    this._3dProgram = null;
    this._3dMVPLoc = null;
    this._3dAttribLoc = -1;
    this._3dRotation = { x: 0, y: 0, z: 0 };
    this._3dMeshCache = {};

    // 3D scroll rotation state
    this._scrollSpacer = null;
    this._scrollProgress = 0;
    this._scrollRAFPending = false;
    this._scrollRAFId = null;
    this._scrollDirty = false;
    this._reparenting = false;
    this._lastScrollAngle = -1;
    this._boundScroll = this._onScroll.bind(this);

    // Ecosystem state
    this._ecoSpeciesCounts = null;       // [alpha, beta, gamma] or null for equal
    this._ecoSpeciesSensors = null;      // [{sensorAngle, sensorDist}, ...] or null
    // Complex ecosystem state
    this._complexSpeciesCounts = null;   // [herbivore, predator, scavenger, symbiont] or null for equal
    this._complexSpeciesSensors = null;  // [{sensorAngle, sensorDist}, ...] × 4 or null
    this._eventsEnabled = true;
    this._eventType = EVENT_NONE;
    this._eventFramesLeft = 0;
    this._eventBaseFoodRegen = 0;
    this._popReadbackPending = false;
    this._popCounts = { alpha: 0, beta: 0, gamma: 0, total: 0 };
    this._currentMaxAgents = MAX_AGENTS_SIMPLE;
    this._currentStride = AGENT_STRIDE;
    this._trailChannels = 1;
    this._aliveBuffer = null;
    this._aliveData = null;
    this._popCountBuffer = null;
    this._popCountStagingBuffer = null;

    // Viewport trigger state
    this._viewportObserver = null;
    this._viewportVisible = false;
    this._viewportDeferred = false; // True when simulation start was deferred until visible

    // Audio state
    this._audio = null;               // PhysarumAudio instance (lazy, created when audio attr set)
    this._audioReactive = false;      // Whether audio reactive is enabled (panel toggle)
    this._audioStagingBuffer = null;  // GPU staging buffer for agent readback (audio density)
    this._audioReadbackPending = false; // Guard for async readback in-flight
    this._boundVisibilityChange = () => this._onVisibilityChange();

    // Render state
    this._renderMode = 'trail';
    this._renderColors = null;
    this._renderQuality = 1;

    // GPU buffers
    this._agentBuffer = null;
    this._trailBuffers = null;
    this._trailIndex = 0;
    this._foodMaskBuffer = null;
    this._foodBuffer = null;
    this._uniformBuffer = null;
    this._uniformData = null;
    this._uniformF32 = null;
    this._uniformU32 = null;
    this._renderColorsBuffer = null;
    this._renderColorsData = null;

    // Pipelines
    this._agentUpdatePipeline = null;
    this._agentUpdateBindGroupLayout = null;
    this._foodRegenPipeline = null;
    this._foodRegenBindGroupLayout = null;
    this._diffusePipeline = null;
    this._diffuseBindGroupLayout = null;
    this._renderPipeline = null;
    this._renderBindGroupLayout = null;

    // Ecosystem pipelines
    this._ecoAgentUpdatePipeline = null;
    this._ecoAgentUpdateBindGroupLayout = null;
    this._ecoDiffusePipeline = null;
    this._ecoDiffuseBindGroupLayout = null;
    this._popCountPipeline = null;
    this._popCountBindGroupLayout = null;
    this._popCountBindGroup = null;

    // Bind groups (ping-pong pre-cached)
    this._bindGroupSets = null;

    // Pointer state
    this._pointerDown = false;
    this._boundPointerDown = (e) => this._onPointerDown(e);
    this._boundPointerMove = (e) => this._onPointerMove(e);
    this._boundPointerUp = () => this._onPointerUp();
    this._boundKeydown = (e) => this._onKeydown(e);

    // Panel
    this._panelEl = null;
    this._gearBtn = null;
    this._fallbackEl = null;

    // Suppress flags for attribute callbacks during programmatic updates
    this._suppressRenderModeCallback = false;
    this._suppressRenderColorsCallback = false;

    this._buildDOM();
    this._setupResizeObserver();
  }

  // -- DOM -------------------------------------------------------------------

  _buildDOM() {
    const style = document.createElement('style');
    style.textContent = STYLES;

    this._canvas = document.createElement('canvas');

    this._gearBtn = document.createElement('button');
    this._gearBtn.className = 'gear-btn';
    this._gearBtn.innerHTML = '&#9881;';
    this._gearBtn.addEventListener('click', () => this._togglePanel());

    this._fallbackEl = document.createElement('div');
    this._fallbackEl.className = 'fallback-message';
    this._fallbackEl.textContent = 'WebGPU is not supported in this browser.';

    this._panelEl = document.createElement('div');
    this._panelEl.className = 'config-panel';
    this._panelEl.innerHTML = `
      <div class="config-scroll">
      <div class="config-inner">
        <div class="config-title">physarum</div>

        <div class="tab-bar">
          <button class="tab active" data-tab="sim">Simulation</button>
          <button class="tab" data-tab="mask">Mask</button>
          <button class="tab" data-tab="render">Render</button>
          <button class="tab" data-tab="morph">Morph</button>
          <button class="tab" data-tab="audio">Audio</button>
          <button class="tab" data-tab="saved">Simulaciones guardadas</button>
        </div>

        <!-- Simulation Tab -->
        <div class="tab-content active" data-tab="sim">
          <div class="mode-toggle">
            <label><input type="radio" name="sim-mode" value="simple" checked> Simple</label>
            <label><input type="radio" name="sim-mode" value="ecosystem"> Ecosystem</label>
            <label><input type="radio" name="sim-mode" value="complex"> Complex</label>
          </div>

          <div class="section-label">Agents</div>
          <div class="param-row">
            <div class="param-label"><span>Agent Count</span><span class="param-value" data-val="agentCount">150000</span></div>
            <input type="range" data-param="agentCount" min="1000" max="500000" step="1000" value="150000">
          </div>

          <div class="section-label">Sensors</div>
          <div class="param-row">
            <div class="param-label"><span>Sensor Angle</span><span class="param-value" data-val="sensorAngle">0.45</span></div>
            <input type="range" data-param="sensorAngle" min="0.05" max="1.5" step="0.01" value="0.45">
          </div>
          <div class="param-row">
            <div class="param-label"><span>Sensor Distance</span><span class="param-value" data-val="sensorDist">18</span></div>
            <input type="range" data-param="sensorDist" min="1" max="60" step="1" value="18">
          </div>

          <div class="section-label">Movement</div>
          <div class="param-row">
            <div class="param-label"><span>Turn Speed</span><span class="param-value" data-val="turnSpeed">0.35</span></div>
            <input type="range" data-param="turnSpeed" min="0.05" max="1.0" step="0.01" value="0.35">
          </div>
          <div class="param-row">
            <div class="param-label"><span>Move Speed</span><span class="param-value" data-val="moveSpeed">0.7</span></div>
            <input type="range" data-param="moveSpeed" min="0.1" max="3.0" step="0.1" value="0.7">
          </div>

          <div class="section-label">Trail</div>
          <div class="param-row">
            <div class="param-label"><span>Deposit</span><span class="param-value" data-val="deposit">0.08</span></div>
            <input type="range" data-param="deposit" min="0.01" max="0.30" step="0.01" value="0.08">
          </div>
          <div class="param-row">
            <div class="param-label"><span>Trail Decay</span><span class="param-value" data-val="trailDecay">0.90</span></div>
            <input type="range" data-param="trailDecay" min="0.50" max="0.99" step="0.01" value="0.90">
          </div>
          <div class="param-row">
            <div class="param-label"><span>Trail Diffusion</span><span class="param-value" data-val="trailDiffusion">0.10</span></div>
            <input type="range" data-param="trailDiffusion" min="0.0" max="0.50" step="0.01" value="0.10">
          </div>

          <div class="section-label">Speed</div>
          <div class="param-row">
            <div class="param-label"><span>Sim Speed</span><span class="param-value" data-val="simSpeed">1</span></div>
            <input type="range" data-param="simSpeed" min="1" max="5" step="1" value="1">
          </div>

          <div class="ecosystem-section" style="display:none">
            <div class="section-label">Species Distribution</div>
            <div class="param-row">
              <div class="param-label"><span>Alpha (blue)</span><span class="param-value" data-val="alphaCount">100000</span></div>
              <input type="range" data-param="alphaCount" min="0" max="500000" step="1000" value="100000">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Beta (amber)</span><span class="param-value" data-val="betaCount">100000</span></div>
              <input type="range" data-param="betaCount" min="0" max="500000" step="1000" value="100000">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Gamma (magenta)</span><span class="param-value" data-val="gammaCount">100000</span></div>
              <input type="range" data-param="gammaCount" min="0" max="500000" step="1000" value="100000">
            </div>

            <div class="section-label">Species Sensors</div>
            <div class="param-row">
              <div class="param-label"><span>Alpha Angle</span><span class="param-value" data-val="alphaSensorAngle">0.45</span></div>
              <input type="range" data-param="alphaSensorAngle" min="0.05" max="1.5" step="0.01" value="0.45">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Alpha Dist</span><span class="param-value" data-val="alphaSensorDist">18</span></div>
              <input type="range" data-param="alphaSensorDist" min="3" max="60" step="1" value="18">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Beta Angle</span><span class="param-value" data-val="betaSensorAngle">0.45</span></div>
              <input type="range" data-param="betaSensorAngle" min="0.05" max="1.5" step="0.01" value="0.45">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Beta Dist</span><span class="param-value" data-val="betaSensorDist">18</span></div>
              <input type="range" data-param="betaSensorDist" min="3" max="60" step="1" value="18">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Gamma Angle</span><span class="param-value" data-val="gammaSensorAngle">0.45</span></div>
              <input type="range" data-param="gammaSensorAngle" min="0.05" max="1.5" step="0.01" value="0.45">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Gamma Dist</span><span class="param-value" data-val="gammaSensorDist">18</span></div>
              <input type="range" data-param="gammaSensorDist" min="3" max="60" step="1" value="18">
            </div>

            <div class="section-label">Ecosystem Controls</div>
            <div class="param-row">
              <div class="param-label"><span>Events</span><span class="param-value" data-val="eventsEnabled">ON</span></div>
              <input type="checkbox" class="eco-events-toggle" data-param="eventsEnabled" checked>
            </div>
          </div>

          <div class="complex-section" style="display:none">
            <div class="section-label">Species Distribution</div>
            <div class="param-row">
              <div class="param-label"><span>Herbivore (green)</span><span class="param-value" data-val="herbivoreCount">100000</span></div>
              <input type="range" data-param="herbivoreCount" min="0" max="500000" step="1000" value="100000">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Predator (red)</span><span class="param-value" data-val="predatorCount">100000</span></div>
              <input type="range" data-param="predatorCount" min="0" max="500000" step="1000" value="100000">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Scavenger (amber)</span><span class="param-value" data-val="scavengerCount">100000</span></div>
              <input type="range" data-param="scavengerCount" min="0" max="500000" step="1000" value="100000">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Symbiont (cyan)</span><span class="param-value" data-val="symbiontCount">100000</span></div>
              <input type="range" data-param="symbiontCount" min="0" max="500000" step="1000" value="100000">
            </div>

            <div class="section-label">Species Sensors</div>
            <div class="param-row">
              <div class="param-label"><span>Herbivore Angle</span><span class="param-value" data-val="herbivoreSensorAngle">0.45</span></div>
              <input type="range" data-param="herbivoreSensorAngle" min="0.05" max="1.5" step="0.01" value="0.45">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Herbivore Dist</span><span class="param-value" data-val="herbivoreSensorDist">18</span></div>
              <input type="range" data-param="herbivoreSensorDist" min="3" max="60" step="1" value="18">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Predator Angle</span><span class="param-value" data-val="predatorSensorAngle">0.45</span></div>
              <input type="range" data-param="predatorSensorAngle" min="0.05" max="1.5" step="0.01" value="0.45">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Predator Dist</span><span class="param-value" data-val="predatorSensorDist">18</span></div>
              <input type="range" data-param="predatorSensorDist" min="3" max="60" step="1" value="18">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Scavenger Angle</span><span class="param-value" data-val="scavengerSensorAngle">0.45</span></div>
              <input type="range" data-param="scavengerSensorAngle" min="0.05" max="1.5" step="0.01" value="0.45">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Scavenger Dist</span><span class="param-value" data-val="scavengerSensorDist">18</span></div>
              <input type="range" data-param="scavengerSensorDist" min="3" max="60" step="1" value="18">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Symbiont Angle</span><span class="param-value" data-val="symbiontSensorAngle">0.45</span></div>
              <input type="range" data-param="symbiontSensorAngle" min="0.05" max="1.5" step="0.01" value="0.45">
            </div>
            <div class="param-row">
              <div class="param-label"><span>Symbiont Dist</span><span class="param-value" data-val="symbiontSensorDist">18</span></div>
              <input type="range" data-param="symbiontSensorDist" min="3" max="60" step="1" value="18">
            </div>

            <div class="section-label">Ecosystem Controls</div>
            <div class="param-row">
              <div class="param-label"><span>Events</span><span class="param-value" data-val="complexEventsEnabled">ON</span></div>
              <input type="checkbox" class="complex-events-toggle" data-param="complexEventsEnabled" checked>
            </div>
          </div>
        </div>

        <!-- Mask Tab -->
        <div class="tab-content" data-tab="mask">
          <div class="mask-row">
            <span>Mode</span>
            <select class="mask-mode-select">
              <option value="libre" selected>Libre</option>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="3d">3D</option>
            </select>
          </div>

          <div class="mask-controls mask-controls-text hidden">
            <div class="text-input-row">
              <label>Text</label>
              <input type="text" class="mask-text-input" placeholder="Enter text..." value="">
            </div>
          </div>

          <div class="mask-controls mask-controls-image hidden">
            <div class="image-picker-row">
              <label>Image</label>
              <button type="button" class="image-picker-btn">Import image</button>
              <img class="image-preview" alt="">
            </div>
            <div class="image-src-row">
              <label>Image URL</label>
              <input type="text" class="image-src-input" placeholder="https://..." value="">
            </div>
          </div>

          <div class="mask-controls mask-controls-3d hidden">
            <div class="shape-row">
              <label>Shape</label>
              <select class="shape-select">
                <option value="cube">Cube</option>
                <option value="sphere">Sphere</option>
                <option value="torus" selected>Torus</option>
              </select>
            </div>
            <div class="axes-row">
              <label>Rotation Axes</label>
              <label><input type="checkbox" class="axis-x-checkbox"> X</label>
              <label><input type="checkbox" class="axis-y-checkbox" checked> Y</label>
              <label><input type="checkbox" class="axis-z-checkbox"> Z</label>
            </div>
          </div>

          <div class="regen-row">
            <label><input type="checkbox" class="regen-checkbox" checked> Regeneration</label>
          </div>

          <div class="section-label">Food Economy</div>
          <div class="param-row">
            <div class="param-label"><span>Food Weight</span><span class="param-value" data-val="foodWeight">8.0</span></div>
            <input type="range" data-param="foodWeight" min="0.0" max="20.0" step="0.5" value="8.0">
          </div>
          <div class="param-row">
            <div class="param-label"><span>Food Consumption</span><span class="param-value" data-val="foodConsumptionRate">0.010</span></div>
            <input type="range" data-param="foodConsumptionRate" min="0.001" max="0.05" step="0.001" value="0.01">
          </div>
          <div class="param-row">
            <div class="param-label"><span>Food Regen Rate</span><span class="param-value" data-val="foodRegenRate">0.005</span></div>
            <input type="range" data-param="foodRegenRate" min="0.001" max="0.05" step="0.001" value="0.005">
          </div>

          <div class="section-label">Energy</div>
          <div class="param-row">
            <div class="param-label"><span>Energy Gain</span><span class="param-value" data-val="energyGain">0.030</span></div>
            <input type="range" data-param="energyGain" min="0.001" max="0.10" step="0.001" value="0.03">
          </div>
          <div class="param-row">
            <div class="param-label"><span>Energy Drain</span><span class="param-value" data-val="energyDrain">0.020</span></div>
            <input type="range" data-param="energyDrain" min="0.001" max="0.10" step="0.001" value="0.02">
          </div>
          <div class="param-row">
            <div class="param-label"><span>Ambient %</span><span class="param-value" data-val="ambientFraction">8</span></div>
            <input type="range" data-param="ambientFraction" min="0" max="30" step="1" value="8">
          </div>
        </div>

        <!-- Render Tab -->
        <div class="tab-content" data-tab="render">
          <div class="render-row">
            <span>Mode</span>
            <select class="render-mode-select">
              <option value="trail" selected>Trail</option>
              <option value="points">Point Sprites</option>
              <option value="sdf">SDF Glow</option>
              <option value="rd">Reaction-Diffusion</option>
              <option value="metaballs">Metaballs</option>
              <option value="lines">Trail Lines</option>
            </select>
          </div>
          <div class="render-quality-row" style="display:none;">
            <span>Quality</span>
            <select class="render-quality-select">
              <option value="0">Low</option>
              <option value="1" selected>Med</option>
              <option value="2">High</option>
            </select>
          </div>
          <div class="render-colors"></div>
        </div>

        <!-- Morph Tab -->
        <div class="tab-content" data-tab="morph">
          <div class="morph-scroll-row">
            <label><input type="checkbox" class="morph-scroll-toggle" checked> Scroll binding</label>
          </div>
          <div class="section-label">Targets</div>
          <div class="morph-target-list"></div>
          <div class="morph-add-row">
            <button type="button" class="morph-add-btn">+ Add target</button>
          </div>
          <button type="button" class="morph-apply-btn">Apply targets</button>
          <button type="button" class="morph-clear-btn">Clear targets</button>
        </div>

        <!-- Audio Tab -->
        <div class="tab-content" data-tab="audio">
          <div class="param-row">
            <div class="param-label"><span>Mute</span><span class="param-value audio-mute-label">ON</span></div>
            <input type="checkbox" class="audio-mute-toggle" checked>
          </div>

          <div class="section-label">Volume</div>
          <div class="param-row">
            <div class="param-label"><span>Master Volume</span><span class="param-value" data-val="audioMasterVolume">70</span></div>
            <input type="range" class="audio-master-volume" min="0" max="100" step="1" value="70">
          </div>

          <div class="audio-species-section" style="display:none">
            <div class="section-label">Species Volume</div>
            <div class="audio-eco-species-controls">
              <div class="param-row">
                <div class="param-label"><span>Alpha (blue)</span><span class="param-value" data-val="audioAlphaVolume">100</span></div>
                <input type="range" class="audio-species-volume" data-species="alpha" min="0" max="100" step="1" value="100">
              </div>
              <div class="param-row audio-species-mute-row">
                <label><input type="checkbox" class="audio-species-mute" data-species="alpha"> Mute Alpha</label>
              </div>
              <div class="param-row">
                <div class="param-label"><span>Beta (amber)</span><span class="param-value" data-val="audioBetaVolume">100</span></div>
                <input type="range" class="audio-species-volume" data-species="beta" min="0" max="100" step="1" value="100">
              </div>
              <div class="param-row audio-species-mute-row">
                <label><input type="checkbox" class="audio-species-mute" data-species="beta"> Mute Beta</label>
              </div>
              <div class="param-row">
                <div class="param-label"><span>Gamma (magenta)</span><span class="param-value" data-val="audioGammaVolume">100</span></div>
                <input type="range" class="audio-species-volume" data-species="gamma" min="0" max="100" step="1" value="100">
              </div>
              <div class="param-row audio-species-mute-row">
                <label><input type="checkbox" class="audio-species-mute" data-species="gamma"> Mute Gamma</label>
              </div>
            </div>
            <div class="audio-complex-species-controls" style="display:none">
              <div class="param-row">
                <div class="param-label"><span>Herbivore (green)</span><span class="param-value" data-val="audioHerbivoreVolume">100</span></div>
                <input type="range" class="audio-species-volume" data-species="herbivore" min="0" max="100" step="1" value="100">
              </div>
              <div class="param-row audio-species-mute-row">
                <label><input type="checkbox" class="audio-species-mute" data-species="herbivore"> Mute Herbivore</label>
              </div>
              <div class="param-row">
                <div class="param-label"><span>Predator (red)</span><span class="param-value" data-val="audioPredatorVolume">100</span></div>
                <input type="range" class="audio-species-volume" data-species="predator" min="0" max="100" step="1" value="100">
              </div>
              <div class="param-row audio-species-mute-row">
                <label><input type="checkbox" class="audio-species-mute" data-species="predator"> Mute Predator</label>
              </div>
              <div class="param-row">
                <div class="param-label"><span>Scavenger (amber)</span><span class="param-value" data-val="audioScavengerVolume">100</span></div>
                <input type="range" class="audio-species-volume" data-species="scavenger" min="0" max="100" step="1" value="100">
              </div>
              <div class="param-row audio-species-mute-row">
                <label><input type="checkbox" class="audio-species-mute" data-species="scavenger"> Mute Scavenger</label>
              </div>
              <div class="param-row">
                <div class="param-label"><span>Symbiont (cyan)</span><span class="param-value" data-val="audioSymbiontVolume">100</span></div>
                <input type="range" class="audio-species-volume" data-species="symbiont" min="0" max="100" step="1" value="100">
              </div>
              <div class="param-row audio-species-mute-row">
                <label><input type="checkbox" class="audio-species-mute" data-species="symbiont"> Mute Symbiont</label>
              </div>
            </div>
          </div>

          <div class="section-label">Effects</div>
          <div class="param-row">
            <div class="param-label"><span>Reverb Dry/Wet</span><span class="param-value" data-val="audioReverbWet">40</span></div>
            <input type="range" class="audio-reverb-wet" min="0" max="100" step="1" value="40">
          </div>
          <div class="param-row">
            <div class="param-label"><span>Filter Cutoff</span><span class="param-value" data-val="audioFilterCutoff">4000</span></div>
            <input type="range" class="audio-filter-cutoff" min="200" max="8000" step="100" value="4000">
          </div>

          <div class="section-label">System</div>
          <div class="param-row">
            <div class="param-label"><span>Audio Reactive</span><span class="param-value audio-reactive-label">OFF</span></div>
            <input type="checkbox" class="audio-reactive-toggle">
          </div>
        </div>

        <!-- Simulaciones guardadas Tab -->
        <div class="tab-content" data-tab="saved">
          <div class="section-label">Simulaciones guardadas</div>
          <div class="saved-sim-list">
            <div class="saved-sim-item">
              <span class="saved-sim-name">Simulacion 1</span>
              <button class="saved-sim-load" type="button">cargar</button>
            </div>
            <div class="saved-sim-item">
              <span class="saved-sim-name">Simulacion 2</span>
              <button class="saved-sim-load" type="button">cargar</button>
            </div>
            <div class="saved-sim-item">
              <span class="saved-sim-name">Simulacion 3</span>
              <button class="saved-sim-load" type="button">cargar</button>
            </div>
          </div>
        </div>

      </div>
      </div>
      <div class="btn-row">
        <div class="btn-row-inner">
          <button class="start-btn" type="button">start</button>
          <button class="random-btn" type="button">random</button>
          <button class="guardar-btn" type="button">guardar</button>
          <button class="save-btn" type="button">descargar</button>
          <button class="load-btn" type="button">load</button>
        </div>
      </div>
    `;

    // Hidden file input at shadow root level (not inside panel innerHTML) — same pattern as legacy
    this._fileInput = document.createElement('input');
    this._fileInput.type = 'file';
    this._fileInput.accept = 'image/*';
    this._fileInput.style.display = 'none';
    this._fileInputCallback = null;
    this._fileInput.addEventListener('change', () => {
      const file = this._fileInput.files && this._fileInput.files[0];
      if (file && this._fileInputCallback) this._fileInputCallback(file);
      this._fileInput.value = '';
      this._fileInputCallback = null;
    });

    // Hidden file input for config JSON loading
    this._configFileInput = document.createElement('input');
    this._configFileInput.type = 'file';
    this._configFileInput.accept = '.json,application/json';
    this._configFileInput.style.display = 'none';
    this._configFileInput.addEventListener('change', () => {
      const file = this._configFileInput.files && this._configFileInput.files[0];
      if (file) this._importConfigFromFile(file);
      this._configFileInput.value = '';
    });

    this._shadow.append(style, this._canvas, this._panelEl, this._gearBtn, this._fallbackEl, this._fileInput, this._configFileInput);
    this._setupPanelEvents();
    this._loadSimFromURL();
  }

  _setupPanelEvents() {
    // Tab switching
    const tabs = this._panelEl.querySelectorAll('.tab-bar button');
    const contents = this._panelEl.querySelectorAll('.tab-content');
    for (const tab of tabs) {
      tab.addEventListener('click', () => {
        for (const t of tabs) t.classList.remove('active');
        for (const c of contents) c.classList.remove('active');
        tab.classList.add('active');
        const target = this._panelEl.querySelector(`.tab-content[data-tab="${tab.dataset.tab}"]`);
        if (target) target.classList.add('active');
      });
    }

    // Mode toggle → switch between simple/ecosystem
    const modeRadios = this._panelEl.querySelectorAll('input[name="sim-mode"]');
    for (const radio of modeRadios) {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.mode = e.target.value;
        }
      });
    }

    // Events toggle (eco)
    const eventsToggle = this._panelEl.querySelector('.eco-events-toggle');
    if (eventsToggle) {
      eventsToggle.addEventListener('change', (e) => {
        this._eventsEnabled = e.target.checked;
        const valSpan = this._panelEl.querySelector('[data-val="eventsEnabled"]');
        if (valSpan) valSpan.textContent = e.target.checked ? 'ON' : 'OFF';
      });
    }

    // Events toggle (complex)
    const complexEventsToggle = this._panelEl.querySelector('.complex-events-toggle');
    if (complexEventsToggle) {
      complexEventsToggle.addEventListener('change', (e) => {
        this._eventsEnabled = e.target.checked;
        const valSpan = this._panelEl.querySelector('[data-val="complexEventsEnabled"]');
        if (valSpan) valSpan.textContent = e.target.checked ? 'ON' : 'OFF';
      });
    }

    // Sliders → update display value + live uniform
    const sliders = this._panelEl.querySelectorAll('input[type="range"]');
    for (const slider of sliders) {
      slider.addEventListener('input', (e) => {
        const paramName = e.target.getAttribute('data-param');
        const val = parseFloat(e.target.value);
        const map = PARAM_UNIFORM_MAP[paramName] || ECO_PANEL_PARAMS[paramName] || COMPLEX_PANEL_PARAMS[paramName];
        const valSpan = this._panelEl.querySelector(`[data-val="${paramName}"]`);
        if (valSpan && map) {
          valSpan.textContent = map.fmt === 0 ? String(Math.round(val)) : val.toFixed(map.fmt);
        } else if (valSpan && paramName === 'simSpeed') {
          valSpan.textContent = String(Math.round(val));
        }
        this._applySliderToUniform(paramName, val);
        if (paramName === 'simSpeed') {
          this._simSpeed = Math.max(1, Math.min(5, Math.round(val)));
        }
        if (!this._programmaticSliderUpdate) {
          if (paramName === 'agentCount' || paramName === 'alphaCount' || paramName === 'betaCount' || paramName === 'gammaCount') {
            this._userOverrodeAgentCount = true;
          }
        }
      });
    }

    // Regeneration toggle
    const regenCheckbox = this._panelEl.querySelector('.regen-checkbox');
    if (regenCheckbox) {
      regenCheckbox.addEventListener('change', (e) => {
        if (!this._uniformF32 || !this._device) return;
        if (e.target.checked) {
          const slider = this._panelEl.querySelector('[data-param="foodRegenRate"]');
          const val = slider ? parseFloat(slider.value) : DEFAULTS.foodRegenRate;
          this._uniformF32[U.FOOD_REGEN] = val;
        } else {
          this._uniformF32[U.FOOD_REGEN] = 0;
        }
        this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);
      });
    }

    // Mask mode selector → toggle mode-specific controls + live switch
    const maskSelect = this._panelEl.querySelector('.mask-mode-select');
    if (maskSelect) {
      maskSelect.addEventListener('change', () => {
        this._updateMaskControls();
        this._switchMaskMode(maskSelect.value);
      });
    }

    // Text input in mask tab
    const textInput = this._panelEl.querySelector('.mask-text-input');
    if (textInput) {
      // Sync initial text attribute
      if (this.text) textInput.value = this.text;
    }

    // Image file picker in mask tab — uses shared _fileInput at shadow root
    const imagePickerBtn = this._panelEl.querySelector('.image-picker-btn');
    const imagePreview = this._panelEl.querySelector('.image-preview');
    const imageSrcInput = this._panelEl.querySelector('.image-src-input');

    if (imagePickerBtn) {
      imagePickerBtn.addEventListener('click', () => {
        this._fileInputCallback = (file) => this._loadImageFromFile(file);
        this._fileInput.click();
      });
    }

    if (imageSrcInput) {
      if (this.src) imageSrcInput.value = this.src;
      imageSrcInput.addEventListener('change', () => {
        const url = imageSrcInput.value.trim();
        if (url) this.src = url;
      });
    }

    // 3D shape selector + axes checkboxes in mask tab
    const shapeSelect = this._panelEl.querySelector('.shape-select');
    if (shapeSelect) {
      shapeSelect.value = this.shape;
      shapeSelect.addEventListener('change', () => {
        this.shape = shapeSelect.value;
      });
    }

    const axisXCb = this._panelEl.querySelector('.axis-x-checkbox');
    const axisYCb = this._panelEl.querySelector('.axis-y-checkbox');
    const axisZCb = this._panelEl.querySelector('.axis-z-checkbox');
    const syncAxesFromCheckboxes = () => {
      let axes = '';
      if (axisXCb && axisXCb.checked) axes += 'x';
      if (axisYCb && axisYCb.checked) axes += 'y';
      if (axisZCb && axisZCb.checked) axes += 'z';
      if (!axes) { // At least one must be selected
        axes = 'y';
        if (axisYCb) axisYCb.checked = true;
      }
      this.axes = axes;
    };
    // Sync initial axes state
    const currentAxes = this.axes;
    if (axisXCb) { axisXCb.checked = currentAxes.includes('x'); axisXCb.addEventListener('change', syncAxesFromCheckboxes); }
    if (axisYCb) { axisYCb.checked = currentAxes.includes('y'); axisYCb.addEventListener('change', syncAxesFromCheckboxes); }
    if (axisZCb) { axisZCb.checked = currentAxes.includes('z'); axisZCb.addEventListener('change', syncAxesFromCheckboxes); }

    // START button
    const startBtn = this._panelEl.querySelector('.start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startSimulation());
    }

    // Random button
    const randomBtn = this._panelEl.querySelector('.random-btn');
    if (randomBtn) {
      randomBtn.addEventListener('click', () => this._randomizeParams());
    }

    // Guardar button
    const guardarBtn = this._panelEl.querySelector('.guardar-btn');
    if (guardarBtn) {
      guardarBtn.addEventListener('click', () => this._saveSimulation());
    }

    // Save / Load config buttons
    const saveBtn = this._panelEl.querySelector('.save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this._exportConfig());
    }
    const loadBtn = this._panelEl.querySelector('.load-btn');
    if (loadBtn) {
      loadBtn.addEventListener('click', () => this._configFileInput.click());
    }

    // Populate saved simulations tab
    this._renderSavedSimulations();

    // Render mode selector → live switch
    const renderSelect = this._panelEl.querySelector('.render-mode-select');
    if (renderSelect) {
      renderSelect.addEventListener('change', () => {
        this._switchRenderMode(renderSelect.value);
      });
    }

    // Render quality selector → live switch
    const qualitySelect = this._panelEl.querySelector('.render-quality-select');
    if (qualitySelect) {
      qualitySelect.addEventListener('change', () => {
        this._setRenderQuality(parseInt(qualitySelect.value, 10));
      });
    }

    // Show/hide quality row based on initial render mode
    this._updateQualityRowVisibility();

    // Render color pickers
    this._buildRenderColors();

    // Morph tab: scroll toggle
    const morphScrollToggle = this._panelEl.querySelector('.morph-scroll-toggle');
    if (morphScrollToggle) {
      morphScrollToggle.checked = this._morphScrollEnabled;
      morphScrollToggle.addEventListener('change', (e) => {
        this._morphScrollEnabled = e.target.checked;
        if (e.target.checked) {
          this._activateMorphScroll();
        } else {
          this._deactivateMorphScroll();
        }
      });
    }

    // Morph tab: add target button
    const morphAddBtn = this._panelEl.querySelector('.morph-add-btn');
    if (morphAddBtn) {
      morphAddBtn.addEventListener('click', () => this._addMorphTargetEntry());
    }

    // Morph tab: apply targets button
    const morphApplyBtn = this._panelEl.querySelector('.morph-apply-btn');
    if (morphApplyBtn) {
      morphApplyBtn.addEventListener('click', () => this._applyMorphTargets());
    }

    // Morph tab: clear targets button
    const morphClearBtn = this._panelEl.querySelector('.morph-clear-btn');
    if (morphClearBtn) {
      morphClearBtn.addEventListener('click', () => this._clearMorphTargets());
    }

    // Initialize morph target list from existing targets
    this._syncMorphTabFromTargets();

    // Audio tab: mute toggle (async — unmute may fail if no user gesture)
    const audioMuteToggle = this._panelEl.querySelector('.audio-mute-toggle');
    if (audioMuteToggle) {
      audioMuteToggle.addEventListener('change', async () => {
        const wantMuted = audioMuteToggle.checked;
        if (!this._audio && !wantMuted) {
          // First unmute — bootstrap the audio module
          this.audio = true;
          await this._initAudioModule();
        }
        if (this._audio) {
          if (wantMuted) {
            this._audio.mute();
          } else {
            // Enable reactive readback so density data flows to audio engine
            this._audioReactive = true;
            const ok = await this._audio.unmute();
            if (!ok) {
              // Unmute failed (no user gesture or Tone.js error) — revert UI
              audioMuteToggle.checked = true;
              this._audioReactive = false;
            }
          }
        }
        this._syncAudioTabFromState();
      });
    }

    // Audio tab: master volume
    const audioMasterVol = this._panelEl.querySelector('.audio-master-volume');
    if (audioMasterVol) {
      audioMasterVol.addEventListener('input', () => {
        const val = Number(audioMasterVol.value);
        if (this._audio) this._audio.setMasterVolume(val / 100);
        this._syncAudioTabFromState();
      });
    }

    // Audio tab: per-species volume sliders
    const speciesVolSliders = this._panelEl.querySelectorAll('.audio-species-volume');
    for (const slider of speciesVolSliders) {
      slider.addEventListener('input', () => {
        const species = slider.dataset.species;
        const val = Number(slider.value);
        if (this._audio) this._audio.setSpeciesVolume(species, val / 100);
        this._syncAudioTabFromState();
      });
    }

    // Audio tab: per-species mute toggles
    const speciesMuteToggles = this._panelEl.querySelectorAll('.audio-species-mute');
    for (const toggle of speciesMuteToggles) {
      toggle.addEventListener('change', () => {
        const species = toggle.dataset.species;
        if (this._audio) this._audio.setSpeciesMuted(species, toggle.checked);
        this._syncAudioTabFromState();
      });
    }

    // Audio tab: reverb dry/wet
    const audioReverbWet = this._panelEl.querySelector('.audio-reverb-wet');
    if (audioReverbWet) {
      audioReverbWet.addEventListener('input', () => {
        const val = Number(audioReverbWet.value);
        if (this._audio) this._audio.setReverbWet(val / 100);
        this._syncAudioTabFromState();
      });
    }

    // Audio tab: filter cutoff
    const audioFilterCutoff = this._panelEl.querySelector('.audio-filter-cutoff');
    if (audioFilterCutoff) {
      audioFilterCutoff.addEventListener('input', () => {
        const val = Number(audioFilterCutoff.value);
        if (this._audio) this._audio.setFilterCutoff(val);
        this._syncAudioTabFromState();
      });
    }

    // Audio tab: audio reactive toggle
    const audioReactiveToggle = this._panelEl.querySelector('.audio-reactive-toggle');
    if (audioReactiveToggle) {
      audioReactiveToggle.addEventListener('change', () => {
        this._audioReactive = audioReactiveToggle.checked;
        this._syncAudioTabFromState();
      });
    }
  }

  _updateEcoSectionVisibility() {
    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;
    const ecoSection = this._panelEl.querySelector('.ecosystem-section');
    if (ecoSection) {
      ecoSection.style.display = isEco ? 'block' : 'none';
    }
    const complexSection = this._panelEl.querySelector('.complex-section');
    if (complexSection) {
      complexSection.style.display = isComplex ? 'block' : 'none';
    }
    const audioSpeciesSection = this._panelEl.querySelector('.audio-species-section');
    if (audioSpeciesSection) {
      audioSpeciesSection.style.display = (isEco || isComplex) ? 'block' : 'none';
    }
    const audioEcoControls = this._panelEl.querySelector('.audio-eco-species-controls');
    if (audioEcoControls) {
      audioEcoControls.style.display = isEco ? 'block' : 'none';
    }
    const audioComplexControls = this._panelEl.querySelector('.audio-complex-species-controls');
    if (audioComplexControls) {
      audioComplexControls.style.display = isComplex ? 'block' : 'none';
    }
  }

  /**
   * Lazy-load the audio module and create a PhysarumAudio instance.
   * Called when the `audio` attribute is first set.
   */
  async _initAudioModule() {
    // Guard: already have an audio instance
    if (this._audio) return;

    try {
      const mod = await import('./physarum-audio.js');
      // Guard: attribute may have been removed during async load
      if (!this.hasAttribute('audio')) return;
      // Guard: another call may have already created the instance
      if (this._audio) return;

      const audio = new mod.PhysarumAudio(this);
      this._audio = audio;

      // Apply current mode
      audio.setMode(this.mode || 'simple');

      // Apply audioVolume attribute if set
      const vol = this.audioVolume;
      audio.setMasterVolume(vol);

      // Sync UI
      this._syncAudioTabFromState();
    } catch (err) {
      console.warn('[Physarum] Failed to load audio module:', err);
    }
  }

  /**
   * Handle document visibility change — pause audio when tab is hidden,
   * resume when visible again.
   */
  _onVisibilityChange() {
    if (!this._audio) return;
    if (document.hidden) {
      this._audio.pause();
    } else {
      // Only resume if simulation is actively running
      if (this._userStarted && !this._paused) {
        this._audio.resume();
      }
    }
  }

  /**
   * Sync Audio tab UI controls from the PhysarumAudio instance state.
   * Called after audio init, mode change, or programmatic state change.
   */
  _syncAudioTabFromState() {
    const audio = this._audio;
    if (!this._panelEl) return;

    // Mute toggle
    const muteToggle = this._panelEl.querySelector('.audio-mute-toggle');
    if (muteToggle) {
      muteToggle.checked = audio ? audio.muted : true;
      const label = this._panelEl.querySelector('.audio-mute-label');
      if (label) label.textContent = muteToggle.checked ? 'ON' : 'OFF';
    }

    // Master volume
    const masterSlider = this._panelEl.querySelector('.audio-master-volume');
    if (masterSlider) {
      const val = audio ? Math.round(audio.masterLevel * 100) : 70;
      masterSlider.value = val;
      const display = this._panelEl.querySelector('.param-value[data-val="audioMasterVolume"]');
      if (display) display.textContent = val;
    }

    // Per-species volumes and mutes (eco + complex species)
    for (const species of ['alpha', 'beta', 'gamma', 'herbivore', 'predator', 'scavenger', 'symbiont']) {
      const volSlider = this._panelEl.querySelector(`.audio-species-volume[data-species="${species}"]`);
      if (volSlider) {
        const val = audio ? Math.round((audio._speciesLevels[species] ?? 1) * 100) : 100;
        volSlider.value = val;
        const key = 'audio' + species.charAt(0).toUpperCase() + species.slice(1) + 'Volume';
        const display = this._panelEl.querySelector(`.param-value[data-val="${key}"]`);
        if (display) display.textContent = val;
      }
      const muteCheck = this._panelEl.querySelector(`.audio-species-mute[data-species="${species}"]`);
      if (muteCheck) {
        muteCheck.checked = audio ? (audio._speciesMuted[species] ?? false) : false;
      }
    }

    // Reverb wet
    const reverbSlider = this._panelEl.querySelector('.audio-reverb-wet');
    if (reverbSlider) {
      const val = audio ? Math.round(audio.reverbWet * 100) : 40;
      reverbSlider.value = val;
      const display = this._panelEl.querySelector('.param-value[data-val="audioReverbWet"]');
      if (display) display.textContent = val;
    }

    // Filter cutoff
    const filterSlider = this._panelEl.querySelector('.audio-filter-cutoff');
    if (filterSlider) {
      const val = audio ? audio.filterCutoff : 4000;
      filterSlider.value = val;
      const display = this._panelEl.querySelector('.param-value[data-val="audioFilterCutoff"]');
      if (display) display.textContent = val;
    }

    // Audio reactive toggle
    const reactiveToggle = this._panelEl.querySelector('.audio-reactive-toggle');
    if (reactiveToggle) {
      reactiveToggle.checked = this._audioReactive;
      const label = this._panelEl.querySelector('.audio-reactive-label');
      if (label) label.textContent = this._audioReactive ? 'ON' : 'OFF';
    }
  }

  _buildRenderColors() {
    const container = this._panelEl.querySelector('.render-colors');
    if (!container) return;
    container.innerHTML = '';

    const mode = this._renderMode || 'trail';
    const cfg = RENDER_MODE_CONFIG[mode];
    if (!cfg) return;

    const simMode = (this.mode === 'ecosystem' || this.isComplex) ? 'ecosystem' : 'simple';
    const slots = cfg.colorSlots[simMode] || cfg.colorSlots['ecosystem'];
    const defaults = cfg.defaultColors[simMode] || cfg.defaultColors['ecosystem'];
    const custom = this._renderColors || {};

    for (const slot of slots) {
      const hex = custom[slot.key] || defaults[slot.key] || '#000000';
      const row = document.createElement('div');
      row.className = 'color-row';
      row.innerHTML = `
        <label>${slot.label}</label>
        <input type="color" data-color-key="${slot.key}" value="${hex}">
        <input type="text" data-color-hex="${slot.key}" value="${hex}" maxlength="7">
      `;
      container.appendChild(row);

      const colorInput = row.querySelector('input[type="color"]');
      const hexInput = row.querySelector('input[type="text"]');

      colorInput.addEventListener('input', () => {
        hexInput.value = colorInput.value;
        this._collectRenderColors();
        this._uploadRenderColors();
      });
      hexInput.addEventListener('change', () => {
        const v = hexInput.value;
        if (/^#[0-9a-fA-F]{6}$/.test(v)) {
          colorInput.value = v;
          this._collectRenderColors();
          this._uploadRenderColors();
        }
      });
    }
  }

  _collectRenderColors() {
    const colors = Object.assign({}, this._renderColors);
    const inputs = this._panelEl.querySelectorAll('.render-colors input[type="color"]');
    for (const input of inputs) {
      const key = input.getAttribute('data-color-key');
      if (key) colors[key] = input.value;
    }
    this._renderColors = colors;
    // Sync attribute
    this._suppressRenderColorsCallback = true;
    if (Object.keys(colors).length > 0) {
      this.renderColors = colors;
    } else {
      this.renderColors = null;
    }
    this._suppressRenderColorsCallback = false;
  }

  _updateMaskControls() {
    const maskSelect = this._panelEl.querySelector('.mask-mode-select');
    if (!maskSelect) return;
    const mode = maskSelect.value;

    // Hide all mask-specific control groups
    const allControls = this._panelEl.querySelectorAll('.mask-controls');
    for (const el of allControls) el.classList.add('hidden');

    // Show the active mode's controls
    const activeControls = this._panelEl.querySelector(`.mask-controls-${mode}`);
    if (activeControls) activeControls.classList.remove('hidden');
  }

  /**
   * Live mask mode switch — called when the mask selector changes in the panel.
   * If simulation is running, regenerates the food mask and restarts with agents
   * spawned inside the new food zones. If not running yet, just syncs the attribute.
   */
  _switchMaskMode(newMode) {
    if (newMode === this.mask) return;

    // Sync mode-specific panel inputs to attributes before switching.
    // Since this.mask is still the OLD mode, these attribute changes won't
    // trigger restarts (the guards in attributeChangedCallback check current mask).
    if (newMode === 'text') {
      const textInput = this._panelEl.querySelector('.mask-text-input');
      if (textInput && textInput.value) this.text = textInput.value;
    } else if (newMode === '3d') {
      const shapeSelect = this._panelEl.querySelector('.shape-select');
      if (shapeSelect) this.shape = shapeSelect.value;
      const xCb = this._panelEl.querySelector('.axis-x-checkbox');
      const yCb = this._panelEl.querySelector('.axis-y-checkbox');
      const zCb = this._panelEl.querySelector('.axis-z-checkbox');
      let axes = '';
      if (xCb && xCb.checked) axes += 'x';
      if (yCb && yCb.checked) axes += 'y';
      if (zCb && zCb.checked) axes += 'z';
      if (axes) this.axes = axes;
    }
    // Image mode: bitmap is already loaded from file picker / src attribute — no sync needed

    // Setting mask attribute triggers attributeChangedCallback → _generateMask + _restartSimulation
    // (only restarts if simulation has valid dimensions)
    this.mask = newMode;
  }

  // -- Morph Tab Management ---------------------------------------------------

  /**
   * Sync the morph tab target list from the current _morphTargets state.
   * Called on panel init and when targets attribute changes externally.
   */
  _syncMorphTabFromTargets() {
    const list = this._panelEl.querySelector('.morph-target-list');
    if (!list) return;
    while (list.lastChild) list.removeChild(list.lastChild);

    if (!this._morphTargets || this._morphTargets.length === 0) return;

    for (const target of this._morphTargets) {
      this._addMorphTargetEntry(target);
    }
  }

  /**
   * Add a new target entry to the morph tab list.
   * @param {Object} [target] — optional preset values, defaults to libre
   */
  _addMorphTargetEntry(target) {
    const list = this._panelEl.querySelector('.morph-target-list');
    if (!list) return;

    const entry = document.createElement('div');
    entry.className = 'morph-target-entry';

    const mask = (target && Physarum.VALID_MASKS.includes(target.mask)) ? target.mask : 'libre';
    const text = (target && target.text) || '';
    const src = (target && target.src) || '';
    const shape = (target && Physarum.VALID_SHAPES.includes(target.shape)) ? target.shape : 'torus';
    const axes = (target && typeof target.axes === 'string') ? target.axes : 'y';
    const hasRegen = target && typeof target.regeneration === 'boolean';
    const regen = hasRegen ? target.regeneration : true;

    entry.innerHTML = `
      <div class="morph-target-header">
        <span class="morph-target-num"></span>
        <select class="morph-target-mask">
          <option value="libre"${mask === 'libre' ? ' selected' : ''}>Libre</option>
          <option value="text"${mask === 'text' ? ' selected' : ''}>Text</option>
          <option value="image"${mask === 'image' ? ' selected' : ''}>Image</option>
          <option value="3d"${mask === '3d' ? ' selected' : ''}>3D</option>
        </select>
        <button type="button" class="morph-target-up" title="Move up">\u25B2</button>
        <button type="button" class="morph-target-down" title="Move down">\u25BC</button>
        <button type="button" class="morph-target-remove" title="Remove">\u00D7</button>
      </div>
      <div class="morph-target-params">
        <div class="morph-target-text-params${mask === 'text' ? ' visible' : ''}">
          <input type="text" class="morph-target-text-input" placeholder="Enter text..." value="${text.replace(/"/g, '&quot;')}">
        </div>
        <div class="morph-target-image-params${mask === 'image' ? ' visible' : ''}">
          <div class="morph-target-image-row">
            <input type="text" class="morph-target-image-src" placeholder="Image URL..." value="${src.replace(/"/g, '&quot;')}">
            <button type="button" class="morph-target-image-pick">Browse</button>
          </div>
          <img class="morph-target-image-preview${src ? ' visible' : ''}" ${src ? `src="${src.replace(/"/g, '&quot;')}"` : ''} alt="">
        </div>
        <div class="morph-target-3d-params${mask === '3d' ? ' visible' : ''}">
          <select class="morph-target-shape">
            <option value="cube"${shape === 'cube' ? ' selected' : ''}>Cube</option>
            <option value="sphere"${shape === 'sphere' ? ' selected' : ''}>Sphere</option>
            <option value="torus"${shape === 'torus' ? ' selected' : ''}>Torus</option>
          </select>
          <label><input type="checkbox" class="morph-target-axis-x"${axes.includes('x') ? ' checked' : ''}> X</label>
          <label><input type="checkbox" class="morph-target-axis-y"${axes.includes('y') ? ' checked' : ''}> Y</label>
          <label><input type="checkbox" class="morph-target-axis-z"${axes.includes('z') ? ' checked' : ''}> Z</label>
        </div>
      </div>
      <div class="morph-target-regen-row">
        <label><input type="checkbox" class="morph-target-regen"${regen ? ' checked' : ''}> Regen</label>
      </div>
    `;

    // Wire mask selector to show/hide mode-specific params
    const maskSelect = entry.querySelector('.morph-target-mask');
    if (maskSelect) {
      maskSelect.addEventListener('change', () => this._updateMorphTargetParams(entry));
    }

    // Wire reorder buttons
    const upBtn = entry.querySelector('.morph-target-up');
    if (upBtn) {
      upBtn.addEventListener('click', () => {
        const prev = entry.previousElementSibling;
        if (prev) {
          list.insertBefore(entry, prev);
          this._renumberMorphTargets();
        }
      });
    }
    const downBtn = entry.querySelector('.morph-target-down');
    if (downBtn) {
      downBtn.addEventListener('click', () => {
        const next = entry.nextElementSibling;
        if (next) {
          list.insertBefore(next, entry);
          this._renumberMorphTargets();
        }
      });
    }

    // Wire remove button
    const removeBtn = entry.querySelector('.morph-target-remove');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        entry.remove();
        this._renumberMorphTargets();
      });
    }

    // Wire image file picker — uses shared _fileInput at shadow root
    const imagePickBtn = entry.querySelector('.morph-target-image-pick');
    if (imagePickBtn) {
      imagePickBtn.addEventListener('click', () => {
        this._fileInputCallback = (file) => {
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result;
            const srcInput = entry.querySelector('.morph-target-image-src');
            if (srcInput) srcInput.value = dataUrl;
            const preview = entry.querySelector('.morph-target-image-preview');
            if (preview) {
              preview.src = dataUrl;
              preview.classList.add('visible');
            }
          };
          reader.readAsDataURL(file);
        };
        this._fileInput.click();
      });
    }

    list.appendChild(entry);
    this._renumberMorphTargets();
  }

  /**
   * Update mode-specific param visibility for a morph target entry.
   */
  _updateMorphTargetParams(entry) {
    const mask = entry.querySelector('.morph-target-mask').value;
    const textParams = entry.querySelector('.morph-target-text-params');
    const imageParams = entry.querySelector('.morph-target-image-params');
    const tdParams = entry.querySelector('.morph-target-3d-params');

    textParams.classList.toggle('visible', mask === 'text');
    imageParams.classList.toggle('visible', mask === 'image');
    tdParams.classList.toggle('visible', mask === '3d');
  }

  /**
   * Renumber target entries in the morph tab list (updates #N labels).
   */
  _renumberMorphTargets() {
    const entries = this._panelEl.querySelectorAll('.morph-target-list .morph-target-entry');
    for (let i = 0; i < entries.length; i++) {
      const numEl = entries[i].querySelector('.morph-target-num');
      if (numEl) numEl.textContent = `#${i + 1}`;
    }
  }

  /**
   * Collect morph targets from the panel DOM into an array of target config objects.
   * @returns {Array} — array of validated target objects
   */
  _collectMorphTargets() {
    const entries = this._panelEl.querySelectorAll('.morph-target-list .morph-target-entry');
    const targets = [];

    for (const entry of entries) {
      const maskEl = entry.querySelector('.morph-target-mask');
      if (!maskEl) continue; // skip entries without queryable DOM (e.g. innerHTML-only)
      const mask = maskEl.value;
      const target = { mask };

      if (mask === 'text') {
        const ti = entry.querySelector('.morph-target-text-input');
        target.text = ti ? (ti.value || '') : '';
      } else if (mask === 'image') {
        const si = entry.querySelector('.morph-target-image-src');
        target.src = si ? (si.value || '') : '';
      } else if (mask === '3d') {
        const shapeEl = entry.querySelector('.morph-target-shape');
        target.shape = shapeEl ? (shapeEl.value || 'torus') : 'torus';
        let axes = '';
        const axX = entry.querySelector('.morph-target-axis-x');
        const axY = entry.querySelector('.morph-target-axis-y');
        const axZ = entry.querySelector('.morph-target-axis-z');
        if (axX && axX.checked) axes += 'x';
        if (axY && axY.checked) axes += 'y';
        if (axZ && axZ.checked) axes += 'z';
        target.axes = axes || 'y';
      }

      const regenCb = entry.querySelector('.morph-target-regen');
      target.regeneration = regenCb ? regenCb.checked : true;

      targets.push(target);
    }

    return targets;
  }

  /**
   * Apply morph targets from the panel — sets the targets attribute which triggers
   * the full morph pipeline (parse, pre-generate masks, restart).
   */
  _applyMorphTargets() {
    const targets = this._collectMorphTargets();
    if (targets.length < 2) {
      // Need at least 2 targets for morph; if < 2, clear targets
      this._morphTabApplying = true;
      this.targets = null;
      this._morphTabApplying = false;
      return;
    }
    // Setter handles JSON.stringify — pass array directly
    this._morphTabApplying = true;
    this.targets = targets;
    this._morphTabApplying = false;
  }

  /**
   * Clear all morph targets — removes all entries from the panel and clears the attribute.
   */
  _clearMorphTargets() {
    const list = this._panelEl.querySelector('.morph-target-list');
    if (list) {
      while (list.lastChild) list.removeChild(list.lastChild);
    }
    this.targets = null;
  }

  _togglePanel() {
    const isHidden = this._panelEl.classList.contains('hidden');
    if (isHidden) {
      this._panelEl.classList.remove('hidden');
      this._gearBtn.style.display = 'none';
    } else {
      this._hidePanel();
    }
  }

  _hidePanel() {
    this._panelEl.classList.add('hidden');
    this._gearBtn.style.display = 'block';
  }

  _showFallback() {
    this._fallbackEl.style.display = 'flex';
    this._panelEl.classList.add('hidden');
    this._gearBtn.style.display = 'none';
  }

  // -- ResizeObserver ---------------------------------------------------------

  _setupResizeObserver() {
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        const w = Math.floor(width);
        const h = Math.floor(height);
        if (w !== this._width || h !== this._height) {
          this._width = w;
          this._height = h;
          this._scheduleResize();
        }
      }
    });
  }

  _scheduleResize() {
    clearTimeout(this._resizeTimeout);
    this._resizeTimeout = setTimeout(() => this._onResize(), 300);
  }

  _onResize() {
    this._userOverrodeAgentCount = false;

    const dpr = Math.min(devicePixelRatio, 2);
    this._canvas.width = Math.floor(this._width * dpr);
    this._canvas.height = Math.floor(this._height * dpr);

    this._applyScaledAgentCountToSliders();

    // When morph targets are active, re-generate all masks at new dimensions
    if (this._morphTargets && this._morphTargets.length > 0) {
      this._deactivateScrollRotation();
      // Update morph scroll spacer height for new component dimensions
      this._updateMorphScrollSpacerHeight();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      const token = {};
      this._restartToken = token;
      this._initPromise = (this._initPromise || Promise.resolve())
        .then(() => this._preGenerateTargetMasks())
        .then(() => {
          if (this._restartToken !== token) return;
          this._generateMask();
          return this._doRestart(token);
        });
    } else {
      this._generateMask();
      this._restartSimulation();
    }
  }

  // -- Lifecycle --------------------------------------------------------------

  connectedCallback() {
    if (this._reparenting) return;
    this._resizeObserver.observe(this);
    document.addEventListener('keydown', this._boundKeydown);
    document.addEventListener('visibilitychange', this._boundVisibilityChange);

    // Set up viewport trigger if attribute is present
    if (this.viewport) {
      this._setupViewportObserver();
    }

    const rect = this.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      this._width = Math.floor(rect.width);
      this._height = Math.floor(rect.height);
      if (this.viewport) {
        // Defer simulation start — IntersectionObserver will trigger _onResize when visible
        this._viewportDeferred = true;
      } else {
        this._onResize();
      }
    }
  }

  disconnectedCallback() {
    if (this._reparenting) return;

    this._destroyViewportObserver();

    this._unbindScrollListener();
    this._teardownScrollSpacer();
    this._deactivateMorphScroll();
    this._cancelMorphAnim(true);

    this._resizeObserver.disconnect();
    document.removeEventListener('keydown', this._boundKeydown);
    document.removeEventListener('visibilitychange', this._boundVisibilityChange);

    if (this._canvas) {
      this._canvas.removeEventListener('pointerdown', this._boundPointerDown);
      this._canvas.removeEventListener('pointermove', this._boundPointerMove);
      this._canvas.removeEventListener('pointerup', this._boundPointerUp);
      this._canvas.removeEventListener('pointerleave', this._boundPointerUp);
      this._canvas.removeEventListener('pointercancel', this._boundPointerUp);
    }
    this._pointerDown = false;

    clearTimeout(this._resizeTimeout);
    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }

    this._destroyBuffers();
    if (this._importedImageBitmap) {
      this._importedImageBitmap.close();
      this._importedImageBitmap = null;
    }
    if (this._loadedImageBitmap) {
      this._loadedImageBitmap.close();
      this._loadedImageBitmap = null;
    }
    // Clean up morph image bitmaps
    if (this._morphImageBitmaps) {
      for (const bm of this._morphImageBitmaps) {
        if (bm && typeof bm.close === 'function') bm.close();
      }
      this._morphImageBitmaps = null;
    }
    this._morphTargets = null;
    this._morphMasks = null;
    this._morphBlendedMask = null;
    this._morphFlatMasks = null;
    this._morphTargetTypes = null;
    this._morph3DConfigs = null;
    this._morphTargetRegens = null;

    // Clean up audio
    if (this._audio) {
      this._audio.destroy();
      this._audio = null;
    }

    this._destroy3DRenderer();
    if (this._device) {
      this._device.destroy();
      this._device = null;
    }
    this._adapter = null;
    this._ctx = null;
    this._format = null;
    this._gpuReady = false;
    this._initialized = false;
    this._initPromise = null;
    this._restartToken = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;

    switch (name) {
      case 'mask': {
        // Sync panel selector and mask-specific control visibility
        const maskSel = this._panelEl.querySelector('.mask-mode-select');
        if (maskSel && maskSel.value !== newVal) maskSel.value = newVal;
        this._updateMaskControls();
        // Re-generate mask and restart if simulation has valid dimensions
        if (this._width > 0 && this._height > 0) {
          this._generateMask();
          this._restartSimulation();
        }
        break;
      }
      case 'mode': {
        // Sync mode radio buttons in panel
        const modeRadio = this._panelEl.querySelector(`input[name="sim-mode"][value="${newVal}"]`);
        if (modeRadio && !modeRadio.checked) modeRadio.checked = true;
        // Show/hide ecosystem-specific panel section
        this._updateEcoSectionVisibility();
        // Rebuild render color pickers (slot count differs by sim mode)
        this._buildRenderColors();
        // Notify audio engine of mode switch (crossfades voices)
        this._audio?.setMode(newVal || 'simple');
        // Restart simulation with new mode if running
        if (this._width > 0 && this._height > 0) {
          this._generateMask();
          this._restartSimulation();
        }
        break;
      }
      case 'text':
        // Sync text input in panel
        const textInput = this._panelEl.querySelector('.mask-text-input');
        if (textInput && textInput.value !== (newVal || '')) {
          textInput.value = newVal || '';
        }
        // Re-generate mask if in text mode and running
        if (this.mask === 'text' && this._width > 0 && this._height > 0) {
          this._generateMask();
          this._restartSimulation();
        }
        break;
      case 'src': {
        // Sync src input in panel
        const srcInput = this._panelEl.querySelector('.image-src-input');
        if (srcInput && srcInput.value !== (newVal || '')) {
          srcInput.value = newVal || '';
        }
        // Load the image and re-generate mask if in image mode
        if (newVal) {
          this._loadImageFromSrc(newVal).then(() => {
            if (this.mask === 'image' && this._width > 0 && this._height > 0) {
              this._generateMask();
              this._restartSimulation();
            }
          });
        }
        break;
      }
      case 'shape': {
        // Sync shape selector in panel
        const shapeSelect = this._panelEl.querySelector('.shape-select');
        if (shapeSelect && shapeSelect.value !== (newVal || 'torus')) {
          shapeSelect.value = newVal || 'torus';
        }
        // Re-generate mask if in 3D mode and running
        if (this.mask === '3d' && this._width > 0 && this._height > 0) {
          this._generateMask();
          this._restartSimulation();
        }
        break;
      }
      case 'axes': {
        // Sync axes checkboxes in panel
        const axes = newVal || 'y';
        const xCb = this._panelEl.querySelector('.axis-x-checkbox');
        const yCb = this._panelEl.querySelector('.axis-y-checkbox');
        const zCb = this._panelEl.querySelector('.axis-z-checkbox');
        if (xCb) xCb.checked = axes.includes('x');
        if (yCb) yCb.checked = axes.includes('y');
        if (zCb) zCb.checked = axes.includes('z');
        // Re-generate mask if in 3D mode and running
        if (this.mask === '3d' && this._width > 0 && this._height > 0) {
          this._generateMask();
          this._restartSimulation();
        }
        break;
      }
      case 'regeneration':
        if (this._uniformF32 && this._device) {
          const regen = this.regeneration;
          if (!regen) {
            this._uniformF32[U.FOOD_REGEN] = 0;
          } else {
            const slider = this._panelEl.querySelector('[data-param="foodRegenRate"]');
            this._uniformF32[U.FOOD_REGEN] = slider ? parseFloat(slider.value) : DEFAULTS.foodRegenRate;
          }
          this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);
          // Sync checkbox
          const cb = this._panelEl.querySelector('.regen-checkbox');
          if (cb) cb.checked = regen;
        }
        break;
      case 'targets':
        if (newVal) {
          this._deactivateScrollRotation();
          // Parse and validate targets
          this._morphTargets = this._parseTargets(newVal);
          // Sync morph tab UI from new targets (skip if change came from panel)
          if (!this._morphTabApplying) this._syncMorphTabFromTargets();
          // Pre-generate masks if simulation is initialized
          if (this._morphTargets && this._initialized && this._simWidth > 0 && this._simHeight > 0) {
            this._preGenerateTargetMasks().then(() => {
              if (this._morphTargets && this._morphMasks) {
                this._uploadMorphMask();
              }
            });
          }
        } else {
          // Targets cleared — cancel programmatic morph and deactivate scroll
          this._cancelMorphAnim(true);
          this._deactivateMorphScroll();
          this._audio?.endMorph();
          this._morphTargets = null;
          this._morphMasks = null;
          this._morphBlendedMask = null;
          this._morphFlatMasks = null;
          this._morphTargetTypes = null;
          this._morph3DConfigs = null;
          this._morphTargetRegens = null;
          this._morphIndex = 0;
          this._morphT = 0;
          this._morphDirty = false;
          this._lastMorphUploadIndex = -1;
          this._lastMorphUploadT = -1;
          if (this._morphImageBitmaps) {
            for (const bm of this._morphImageBitmaps) {
              if (bm && typeof bm.close === 'function') bm.close();
            }
            this._morphImageBitmaps = null;
          }
          if (this.mask === '3d' && this._initialized) {
            this._activateScrollRotation();
          }
        }
        break;
      case 'rendermode':
        if (this._suppressRenderModeCallback) return;
        {
          const mode = newVal || 'trail';
          if (Physarum.VALID_RENDER_MODES.includes(mode)) {
            this._switchRenderMode(mode);
          }
        }
        break;
      case 'rendercolors':
        if (this._suppressRenderColorsCallback) return;
        if (newVal) {
          try {
            const parsed = JSON.parse(newVal);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
              this._renderColors = parsed;
              this._uploadRenderColors();
            }
          } catch { /* ignore invalid JSON */ }
        } else {
          this._renderColors = null;
          this._uploadRenderColors();
        }
        break;
      case 'viewport':
        if (newVal !== null) {
          // Viewport attribute added — set up observer and pause if off-screen
          this._setupViewportObserver();
          if (!this._viewportVisible && this._raf) {
            cancelAnimationFrame(this._raf);
            this._raf = null;
          }
        } else {
          // Viewport attribute removed — destroy observer and resume if paused
          this._destroyViewportObserver();
          this._viewportDeferred = false;
          if (!this._raf && this._initialized) {
            if (this.mode === 'ecosystem' || this.isComplex) this._scheduleEcoFrame();
            else this._scheduleFrame();
          }
        }
        break;
      case 'audio':
        if (newVal !== null) {
          // Audio attribute added — lazy-load audio module and create instance
          this._initAudioModule();
        } else {
          // Audio attribute removed — destroy audio engine
          if (this._audio) {
            this._audio.destroy();
            this._audio = null;
          }
          this._syncAudioTabFromState();
        }
        break;
      case 'audiovolume': {
        const vol = parseFloat(newVal);
        if (!isNaN(vol)) {
          const clamped = Math.max(0, Math.min(1, vol));
          if (this._audio) {
            this._audio.setMasterVolume(clamped);
          }
          this._syncAudioTabFromState();
        }
        break;
      }
    }
  }

  // -- Properties -------------------------------------------------------------

  get mask() { return this.getAttribute('mask') || 'libre'; }
  set mask(v) { this.setAttribute('mask', v); }

  get mode() { return this.getAttribute('mode') || 'simple'; }
  set mode(v) { this.setAttribute('mode', v); }

  get isComplex() { return this.mode === 'complex'; }

  get text() { return this.getAttribute('text') || ''; }
  set text(v) { this.setAttribute('text', v); }

  get src() { return this.getAttribute('src') || ''; }
  set src(v) { this.setAttribute('src', v); }

  get shape() { return this.getAttribute('shape') || 'torus'; }
  set shape(v) { this.setAttribute('shape', v); }

  get axes() { return this.getAttribute('axes') || 'y'; }
  set axes(v) { this.setAttribute('axes', v); }

  get regeneration() {
    const val = this.getAttribute('regeneration');
    if (val === null) return true;
    return val !== 'false';
  }
  set regeneration(v) {
    if (v === false) this.setAttribute('regeneration', 'false');
    else this.removeAttribute('regeneration');
  }

  get targets() {
    const val = this.getAttribute('targets');
    if (!val) return null;
    try { return JSON.parse(val); } catch { return null; }
  }
  set targets(v) {
    if (v) this.setAttribute('targets', JSON.stringify(v));
    else this.removeAttribute('targets');
  }

  get renderMode() { return this.getAttribute('rendermode') || 'trail'; }
  set renderMode(v) { this.setAttribute('rendermode', v); }

  get renderColors() {
    const val = this.getAttribute('rendercolors');
    if (!val) return null;
    try { return JSON.parse(val); } catch { return null; }
  }
  set renderColors(v) {
    if (v && typeof v === 'object') this.setAttribute('rendercolors', JSON.stringify(v));
    else this.removeAttribute('rendercolors');
  }

  get viewport() { return this.hasAttribute('viewport'); }
  set viewport(v) {
    if (v) this.setAttribute('viewport', '');
    else this.removeAttribute('viewport');
  }

  get audio() { return this.hasAttribute('audio'); }
  set audio(v) {
    if (v) this.setAttribute('audio', '');
    else this.removeAttribute('audio');
  }

  get audioVolume() {
    const val = this.getAttribute('audiovolume');
    if (val === null) return 0.7;
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0.7 : Math.max(0, Math.min(1, parsed));
  }
  set audioVolume(v) {
    const num = parseFloat(v);
    if (!isNaN(num)) this.setAttribute('audiovolume', String(Math.max(0, Math.min(1, num))));
  }

  // -- Sizing ----------------------------------------------------------------

  _getSimulationSize() {
    const dpr = Math.min(devicePixelRatio, 2);
    let w = Math.floor(this._width * dpr);
    let h = Math.floor(this._height * dpr);
    const area = w * h;
    if (area > REFERENCE_AREA) {
      const scale = Math.sqrt(REFERENCE_AREA / area);
      w = Math.floor(w * scale);
      h = Math.floor(h * scale);
    }
    return { width: Math.max(w, 1), height: Math.max(h, 1) };
  }

  get _resolutionScale() {
    const { width, height } = this._getSimulationSize();
    return Math.sqrt((width * height) / REFERENCE_AREA);
  }

  _scaledAgentCount(baseCount) {
    const { width, height } = this._getSimulationSize();
    const scaled = Math.round(baseCount * (width * height) / REFERENCE_AREA);
    return Math.max(1000, Math.min(500000, scaled));
  }

  _applyScaledAgentCountToSliders() {
    if (this._userOverrodeAgentCount) return;
    this._programmaticSliderUpdate = true;
    const scaled = this._scaledAgentCount(DEFAULTS.agentCount);
    const slider = this._panelEl.querySelector('[data-param="agentCount"]');
    const valSpan = this._panelEl.querySelector('[data-val="agentCount"]');
    if (slider) slider.value = scaled;
    if (valSpan) valSpan.textContent = String(scaled);
    this._programmaticSliderUpdate = false;
  }

  // -- Viewport Trigger -------------------------------------------------------

  _setupViewportObserver() {
    if (this._viewportObserver) return;
    if (typeof IntersectionObserver === 'undefined') return;
    this._viewportObserver = new IntersectionObserver((entries) => {
      this._onViewportChange(entries);
    }, { threshold: 0 });
    this._viewportObserver.observe(this);
  }

  _destroyViewportObserver() {
    if (this._viewportObserver) {
      this._viewportObserver.disconnect();
      this._viewportObserver = null;
    }
  }

  _onViewportChange(entries) {
    const entry = entries[entries.length - 1];
    const wasVisible = this._viewportVisible;
    this._viewportVisible = entry.isIntersecting;

    if (entry.isIntersecting && !wasVisible) {
      // Entered viewport — start or resume
      if (this._viewportDeferred) {
        this._viewportDeferred = false;
        this._onResize();
      } else if (this._initialized && !this._raf) {
        if (this.mode === 'ecosystem' || this.isComplex) this._scheduleEcoFrame();
        else this._scheduleFrame();
      }
    } else if (!entry.isIntersecting && wasVisible) {
      // Left viewport — pause frame loop
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
    }
  }

  // -- WebGPU ----------------------------------------------------------------

  async _initWebGPU() {
    if (this._gpuReady && this._device) return true;

    if (!navigator.gpu) {
      this._gpuReady = false;
      this._showFallback();
      return false;
    }

    const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
    if (!adapter) {
      this._gpuReady = false;
      this._showFallback();
      return false;
    }
    this._adapter = adapter;

    this._device = await adapter.requestDevice({
      requiredLimits: {
        maxStorageBufferBindingSize: adapter.limits.maxStorageBufferBindingSize,
        maxBufferSize: adapter.limits.maxBufferSize,
        maxComputeWorkgroupsPerDimension: adapter.limits.maxComputeWorkgroupsPerDimension,
      },
    });

    this._device.lost.then((info) => {
      this._gpuReady = false;
      this._device = null;
      this._ctx = null;
      this._audio?.handleDeviceLoss();
      if (info.reason !== 'destroyed') {
        this._initPromise = null;
      }
    });

    this._format = navigator.gpu.getPreferredCanvasFormat();
    this._ctx = this._canvas.getContext('webgpu');
    this._ctx.configure({
      device: this._device,
      format: this._format,
      alphaMode: 'opaque',
    });

    // Set up pointer events on canvas
    this._canvas.addEventListener('pointerdown', this._boundPointerDown);
    this._canvas.addEventListener('pointermove', this._boundPointerMove);
    this._canvas.addEventListener('pointerup', this._boundPointerUp);
    this._canvas.addEventListener('pointerleave', this._boundPointerUp);
    this._canvas.addEventListener('pointercancel', this._boundPointerUp);

    this._gpuReady = true;
    return true;
  }

  // -- Mask Generation -------------------------------------------------------

  _generateMask() {
    const { width, height } = this._getSimulationSize();
    if (width <= 0 || height <= 0) return;

    this._simWidth = width;
    this._simHeight = height;

    // If morph targets are set and masks are already pre-generated, use the first target
    if (this._morphTargets && this._morphMasks && this._morphMasks.length > 0) {
      this._foodMask = this._morphMasks[0];
      this._foodMasks = this._morphMasks;
      this._morphIndex = 0;
      this._morphT = 0;
      return;
    }

    const maskMode = this.mask;
    switch (maskMode) {
      case 'text':
        this._foodMask = this._generateTextMask(width, height);
        break;
      case 'image':
        this._foodMask = this._generateImageMask(width, height);
        break;
      case '3d':
        this._foodMask = this._generate3DMask(width, height);
        break;
      case 'libre':
      default:
        this._foodMask = this._generateLibreMask(width, height);
        break;
    }
    this._foodMasks = [this._foodMask];
  }

  // -- Morph Target Parsing ---------------------------------------------------

  static VALID_MASKS = ['libre', 'text', 'image', '3d'];
  static VALID_SHAPES = ['cube', 'sphere', 'torus'];

  /**
   * Parse and validate a targets JSON array. Each entry must have a `mask` field.
   * Invalid entries fall back to libre. Invalid JSON returns null.
   *
   * @param {string|Array|null} input — JSON string or already-parsed array
   * @returns {Array|null} — validated targets array, or null if invalid/empty
   */
  _parseTargets(input) {
    if (!input) return null;

    let arr;
    if (typeof input === 'string') {
      try {
        arr = JSON.parse(input);
      } catch {
        return null;
      }
    } else if (Array.isArray(input)) {
      arr = input;
    } else {
      return null;
    }

    if (!Array.isArray(arr) || arr.length === 0) return null;

    const validated = [];
    for (const entry of arr) {
      validated.push(Physarum._validateTargetEntry(entry));
    }

    return validated;
  }

  /**
   * Validate a single target entry. Returns a normalized target object.
   * Invalid or missing fields fall back to defaults.
   */
  static _validateTargetEntry(entry) {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      return { mask: 'libre' };
    }

    const mask = Physarum.VALID_MASKS.includes(entry.mask) ? entry.mask : 'libre';
    const result = { mask };

    // Text-specific
    if (mask === 'text') {
      result.text = (typeof entry.text === 'string' && entry.text.trim()) ? entry.text : '';
    }

    // Image-specific
    if (mask === 'image') {
      result.src = (typeof entry.src === 'string' && entry.src.trim()) ? entry.src : '';
    }

    // 3D-specific
    if (mask === '3d') {
      result.shape = Physarum.VALID_SHAPES.includes(entry.shape) ? entry.shape : 'torus';
      // Validate axes: keep only valid characters (x, y, z)
      if (typeof entry.axes === 'string') {
        let axes = '';
        if (entry.axes.includes('x')) axes += 'x';
        if (entry.axes.includes('y')) axes += 'y';
        if (entry.axes.includes('z')) axes += 'z';
        result.axes = axes || 'y';
      } else {
        result.axes = 'y';
      }
    }

    // Per-target regeneration (optional, overrides component default)
    if (typeof entry.regeneration === 'boolean') {
      result.regeneration = entry.regeneration;
    } else if (entry.regeneration === 'false') {
      result.regeneration = false;
    } else if (entry.regeneration === 'true' || entry.regeneration === true) {
      result.regeneration = true;
    }
    // If not specified, leave undefined → uses component default

    return result;
  }

  /**
   * Generate a food capacity mask for a single morph target at the given dimensions.
   * Uses the same rasterization pipelines as the main mask generators but
   * operates from a target config object rather than component attributes.
   *
   * @param {Object} target — validated target entry from _parseTargets
   * @param {number} width
   * @param {number} height
   * @param {ImageBitmap|null} bitmap — pre-loaded image bitmap for image targets
   * @returns {Float32Array} — food capacity mask
   */
  _generateMaskForTarget(target, width, height, bitmap) {
    switch (target.mask) {
      case 'text': {
        const text = target.text || '';
        // Empty text falls back to libre (uniform 1.0)
        if (!text.trim()) return this._generateLibreMask(width, height);
        const fontFamily = 'system-ui, -apple-system, sans-serif';
        const offscreen = document.createElement('canvas');
        offscreen.width = width;
        offscreen.height = height;
        const ctx = offscreen.getContext('2d');
        if (!ctx) return this._generateLibreMask(width, height);
        return Physarum._rasterizeSingleText(ctx, text, width, height, fontFamily);
      }

      case 'image': {
        if (!bitmap) {
          return Physarum._generateProceduralFallback(width, height);
        }
        const offscreen = document.createElement('canvas');
        offscreen.width = width;
        offscreen.height = height;
        const ctx = offscreen.getContext('2d');
        if (!ctx) return Physarum._generateProceduralFallback(width, height);
        return Physarum._rasterizeImage(ctx, bitmap, width, height);
      }

      case '3d': {
        // Save and restore current 3D state
        const savedShape = this.shape;
        const savedAxes = this.axes;
        const savedRotation = { ...this._3dRotation };

        // Temporarily set target's shape/axes
        this._attrs = this._attrs || {};
        const origShapeAttr = this.getAttribute('shape');
        const origAxesAttr = this.getAttribute('axes');
        this.setAttribute('shape', target.shape || 'torus');
        this.setAttribute('axes', target.axes || 'y');
        this._3dRotation = { x: 0, y: 0, z: 0 };

        // Initialize 3D renderer if needed and render
        if (!this._init3DRenderer()) {
          // Restore
          if (origShapeAttr) this.setAttribute('shape', origShapeAttr);
          else this.removeAttribute('shape');
          if (origAxesAttr) this.setAttribute('axes', origAxesAttr);
          else this.removeAttribute('axes');
          this._3dRotation = savedRotation;
          return Physarum._generateProceduralFallback(width, height);
        }

        const mask = this._render3DToMask(width, height);

        // Restore original state
        if (origShapeAttr) this.setAttribute('shape', origShapeAttr);
        else this.removeAttribute('shape');
        if (origAxesAttr) this.setAttribute('axes', origAxesAttr);
        else this.removeAttribute('axes');
        this._3dRotation = savedRotation;

        return mask || Physarum._generateProceduralFallback(width, height);
      }

      case 'libre':
      default:
        return this._generateLibreMask(width, height);
    }
  }

  /**
   * Pre-generate all food capacity masks for the current morph targets.
   * Must be called after _parseTargets and after simulation size is known.
   * Image targets with src URLs are loaded asynchronously.
   *
   * @returns {Promise<void>} — resolves when all masks (including async images) are ready
   */
  async _preGenerateTargetMasks() {
    const targets = this._morphTargets;
    if (!targets || targets.length === 0) {
      this._morphMasks = null;
      this._morphBlendedMask = null;
      this._morphImageBitmaps = null;
      this._morphFlatMasks = null;
      this._morphTargetTypes = null;
      this._morph3DConfigs = null;
      this._morphTargetRegens = null;
      return;
    }

    const { width, height } = this._getSimulationSize();
    if (width <= 0 || height <= 0) return;

    // Close any previously loaded image bitmaps
    if (this._morphImageBitmaps) {
      for (const bm of this._morphImageBitmaps) {
        if (bm && typeof bm.close === 'function') bm.close();
      }
    }

    // Load image bitmaps for any image-type targets with src URLs
    const bitmaps = new Array(targets.length).fill(null);
    const loadPromises = [];

    for (let i = 0; i < targets.length; i++) {
      if (targets[i].mask === 'image' && targets[i].src) {
        const idx = i;
        const promise = this._loadImageBitmapFromUrl(targets[i].src)
          .then(bm => { bitmaps[idx] = bm; })
          .catch(() => { bitmaps[idx] = null; });
        loadPromises.push(promise);
      }
    }

    // Wait for all image loads
    if (loadPromises.length > 0) {
      await Promise.all(loadPromises);
    }

    this._morphImageBitmaps = bitmaps;

    // Generate all masks
    const masks = [];
    for (let i = 0; i < targets.length; i++) {
      // For image targets, use the component's imported bitmap as fallback if no target-specific bitmap
      const bitmap = bitmaps[i] || (targets[i].mask === 'image' ? (this._importedImageBitmap || this._loadedImageBitmap) : null);
      masks.push(this._generateMaskForTarget(targets[i], width, height, bitmap));
    }

    this._morphMasks = masks;
    this._morphBlendedMask = new Float32Array(width * height);

    // Store per-target mask types for 3D↔2D detection during morph
    this._morphTargetTypes = targets.map(t => t.mask);

    // Generate flattened silhouette versions of 3D masks for 3D↔2D transitions
    this._morphFlatMasks = masks.map((m, i) =>
      targets[i].mask === '3d' ? Physarum._flattenToSilhouette(m) : m
    );

    // Store per-target 3D config for live re-rendering during 3D↔3D morph
    this._morph3DConfigs = targets.map(t =>
      t.mask === '3d' ? { shape: t.shape || 'torus', axes: t.axes || 'y' } : null
    );

    // Store per-target regeneration values for interpolation during morph
    // undefined → uses component default (this.regeneration)
    this._morphTargetRegens = targets.map(t =>
      typeof t.regeneration === 'boolean' ? t.regeneration : this.regeneration
    );

    // Set the initial food mask to the first target
    this._foodMask = masks[0];
    this._foodMasks = masks;
    this._morphIndex = 0;
    this._morphT = 0;
    this._morphDirty = false;
    this._lastMorphUploadIndex = -1;
    this._lastMorphUploadT = -1;
  }

  /**
   * Load an ImageBitmap from a URL. Used for morph target image sources.
   * @param {string} url
   * @returns {Promise<ImageBitmap|null>}
   */
  async _loadImageBitmapFromUrl(url) {
    if (!url) return null;
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      return await createImageBitmap(img);
    } catch {
      return null;
    }
  }

  _generateLibreMask(width, height) {
    const mask = new Float32Array(width * height);
    mask.fill(1.0);
    return mask;
  }

  // -- Text Mask Generation --------------------------------------------------

  static _parseTextLines(text) {
    if (!text) return ['PHYSARUM'];
    const lines = text
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
    return lines.length > 0 ? lines : ['PHYSARUM'];
  }

  static _computeTextLayout(ctx, text, width, height, fontFamily) {
    const MIN_FONT = Math.max(100, Math.round(Math.sqrt(width * height) * 0.12));
    const MAX_LINES = 10;

    const segments = Physarum._parseTextLines(text);

    const computeFontSize = (lines) => {
      const probe = 200;
      ctx.font = `900 ${probe}px ${fontFamily}`;
      let maxWidth = 0;
      for (const line of lines) {
        maxWidth = Math.max(maxWidth, ctx.measureText(line).width);
      }
      if (maxWidth === 0) return probe;
      let fs = Math.floor(probe * (width * 0.75) / maxWidth);
      fs = Math.min(fs, Math.floor(height * 0.7 / (lines.length * 1.15)));
      return Math.max(fs, 1);
    };

    const wrapSegment = (words, numLines) => {
      if (words.length === 0) return [''];
      const n = Math.min(numLines, words.length);
      const result = [];
      const base = Math.floor(words.length / n);
      const extra = words.length % n;
      let idx = 0;
      for (let i = 0; i < n; i++) {
        const count = base + (i < extra ? 1 : 0);
        result.push(words.slice(idx, idx + count).join(' '));
        idx += count;
      }
      return result;
    };

    const segmentWords = segments.map(s => s.split(/\s+/).filter(Boolean));

    const buildLines = (totalLines) => {
      if (totalLines <= segments.length) return segments.slice();
      const linesPerSeg = segments.map(() => 1);
      let extraLines = totalLines - segments.length;
      for (let e = 0; e < extraLines; e++) {
        let bestIdx = 0;
        let bestRatio = 0;
        for (let s = 0; s < segments.length; s++) {
          const ratio = segmentWords[s].length / linesPerSeg[s];
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = s;
          }
        }
        if (segmentWords[bestIdx].length <= linesPerSeg[bestIdx]) break;
        linesPerSeg[bestIdx]++;
      }
      const result = [];
      for (let s = 0; s < segments.length; s++) {
        result.push(...wrapSegment(segmentWords[s], linesPerSeg[s]));
      }
      return result;
    };

    let bestFontSize = 0;
    let bestLines = segments.slice();

    for (let totalLines = segments.length; totalLines <= MAX_LINES; totalLines++) {
      const candidateLines = buildLines(totalLines);
      const candidateFont = computeFontSize(candidateLines);

      if (candidateFont > bestFontSize) {
        bestFontSize = candidateFont;
        bestLines = candidateLines;
      }

      if (candidateFont >= MIN_FONT) {
        return { fontSize: candidateFont, lines: candidateLines };
      }

      if (candidateFont < bestFontSize) break;
    }

    return { fontSize: bestFontSize, lines: bestLines };
  }

  static _rasterizeSingleText(ctx, text, width, height, fontFamily) {
    ctx.clearRect(0, 0, width, height);

    const { fontSize, lines } = Physarum._computeTextLayout(ctx, text, width, height, fontFamily);

    ctx.font = `900 ${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';

    const lineHeight = fontSize * 1.15;
    const startY = (height - lineHeight * lines.length) / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], width / 2, startY + i * lineHeight);
    }

    const imageData = ctx.getImageData(0, 0, width, height);
    const mask = new Float32Array(width * height);
    for (let j = 0; j < mask.length; j++) {
      mask[j] = imageData.data[j * 4 + 3] / 255;
    }
    return mask;
  }

  _generateTextMask(width, height) {
    const fontFamily = 'system-ui, -apple-system, sans-serif';
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return this._generateLibreMask(width, height);

    // Get text from panel input or attribute
    const textInput = this._panelEl.querySelector('.mask-text-input');
    const text = (textInput && textInput.value) || this.text || '';

    // Empty text falls back to libre (uniform 1.0)
    if (!text.trim()) return this._generateLibreMask(width, height);

    return Physarum._rasterizeSingleText(ctx, text, width, height, fontFamily);
  }

  // -- Image Mask Generation -------------------------------------------------

  /**
   * Convert an ImageBitmap (or any drawable) to a food capacity mask using
   * perceptual luminance grayscale. Draws centered with "contain" scaling.
   */
  static _rasterizeImage(ctx, source, width, height) {
    ctx.clearRect(0, 0, width, height);

    // "contain" scaling: fit image within canvas preserving aspect ratio
    const srcW = source.width;
    const srcH = source.height;
    const scale = Math.min(width / srcW, height / srcH);
    const dstW = Math.round(srcW * scale);
    const dstH = Math.round(srcH * scale);
    const dstX = Math.round((width - dstW) / 2);
    const dstY = Math.round((height - dstH) / 2);

    ctx.drawImage(source, dstX, dstY, dstW, dstH);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const mask = new Float32Array(width * height);

    for (let i = 0; i < mask.length; i++) {
      const off = i * 4;
      const r = data[off] / 255;
      const g = data[off + 1] / 255;
      const b = data[off + 2] / 255;
      const a = data[off + 3] / 255;
      // Perceptual luminance grayscale, scaled by alpha
      mask[i] = (0.299 * r + 0.587 * g + 0.114 * b) * a;
    }

    return mask;
  }

  /**
   * Generate a procedural radial gradient fallback when no image is available.
   */
  /**
   * Flatten a 3D depth-encoded mask to an approximate binary silhouette.
   * 3D masks encode depth as: outside=0, back=0.3, front=1.0.
   * For 3D↔2D morph transitions, this removes the depth gradient so that
   * crossfading with flat 2D masks (text, image, libre) looks natural.
   * Values are mapped: 0→0, ≥0.3→1.0, with a smooth ramp in between.
   * @param {Float32Array} mask - Depth-encoded 3D mask
   * @returns {Float32Array} Flattened silhouette mask
   */
  static _flattenToSilhouette(mask) {
    const out = new Float32Array(mask.length);
    for (let i = 0; i < mask.length; i++) {
      out[i] = Math.min(1.0, mask[i] / 0.3);
    }
    return out;
  }

  static _generateProceduralFallback(width, height) {
    const mask = new Float32Array(width * height);
    const cx = width / 2;
    const cy = height / 2;
    const maxDist = Math.min(cx, cy) * 0.85;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - dist / maxDist);
        mask[y * width + x] = t * t; // quadratic falloff
      }
    }

    return mask;
  }

  _generateImageMask(width, height) {
    // Priority: imported file > loaded src > procedural fallback
    const bitmap = this._importedImageBitmap || this._loadedImageBitmap;

    if (!bitmap) {
      return Physarum._generateProceduralFallback(width, height);
    }

    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return Physarum._generateProceduralFallback(width, height);

    return Physarum._rasterizeImage(ctx, bitmap, width, height);
  }

  /**
   * Load an image from a File object (file picker). Sets _importedImageBitmap
   * and updates the preview.
   */
  async _loadImageFromFile(file) {
    try {
      const bitmap = await createImageBitmap(file);
      this._importedImageBitmap = bitmap;

      // Update preview
      const preview = this._panelEl.querySelector('.image-preview');
      if (preview) {
        const url = URL.createObjectURL(file);
        preview.onload = () => URL.revokeObjectURL(url);
        preview.src = url;
        preview.classList.add('visible');
      }
    } catch {
      // Invalid image file — ignore
    }
  }

  /**
   * Load an image from a URL (src attribute). Sets _loadedImageBitmap.
   * Returns a Promise that resolves when the image is loaded.
   */
  async _loadImageFromSrc(url) {
    if (!url) {
      this._loadedImageBitmap = null;
      return;
    }

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      const bitmap = await createImageBitmap(img);
      this._loadedImageBitmap = bitmap;

      // Update preview if no imported image
      if (!this._importedImageBitmap) {
        const preview = this._panelEl.querySelector('.image-preview');
        if (preview) {
          preview.src = url;
          preview.classList.add('visible');
        }
      }
    } catch {
      this._loadedImageBitmap = null;
    }
  }

  // -- 3D Mesh Generation ---------------------------------------------------

  static _generateCubeMesh() {
    const s = 0.7;
    // 6 faces, 4 vertices each = 24 vertices
    const positions = new Float32Array([
      // Front (z = +s)
      -s, -s,  s,   s, -s,  s,   s,  s,  s,  -s,  s,  s,
      // Back (z = -s)
       s, -s, -s,  -s, -s, -s,  -s,  s, -s,   s,  s, -s,
      // Top (y = +s)
      -s,  s,  s,   s,  s,  s,   s,  s, -s,  -s,  s, -s,
      // Bottom (y = -s)
      -s, -s, -s,   s, -s, -s,   s, -s,  s,  -s, -s,  s,
      // Right (x = +s)
       s, -s,  s,   s, -s, -s,   s,  s, -s,   s,  s,  s,
      // Left (x = -s)
      -s, -s, -s,  -s, -s,  s,  -s,  s,  s,  -s,  s, -s,
    ]);

    const indices = new Uint16Array(36);
    for (let f = 0; f < 6; f++) {
      const b = f * 4;
      const o = f * 6;
      indices[o] = b; indices[o+1] = b+1; indices[o+2] = b+2;
      indices[o+3] = b; indices[o+4] = b+2; indices[o+5] = b+3;
    }

    return { positions, indices, indexCount: 36 };
  }

  static _generateSphereMesh(segments = 32) {
    const rings = segments;
    const sectors = segments;
    const r = 0.7;
    const posArr = [];
    const idxArr = [];

    for (let ri = 0; ri <= rings; ri++) {
      const phi = Math.PI * ri / rings;
      const sp = Math.sin(phi);
      const cp = Math.cos(phi);
      for (let si = 0; si <= sectors; si++) {
        const theta = 2 * Math.PI * si / sectors;
        posArr.push(sp * Math.cos(theta) * r, cp * r, sp * Math.sin(theta) * r);
      }
    }

    for (let ri = 0; ri < rings; ri++) {
      for (let si = 0; si < sectors; si++) {
        const a = ri * (sectors + 1) + si;
        const b = a + sectors + 1;
        idxArr.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }

    return { positions: new Float32Array(posArr), indices: new Uint16Array(idxArr), indexCount: idxArr.length };
  }

  static _generateTorusMesh(majorR = 0.6, tubeR = 0.25, majorSeg = 48, tubeSeg = 24) {
    const posArr = [];
    const idxArr = [];

    for (let i = 0; i <= majorSeg; i++) {
      const u = (2 * Math.PI * i) / majorSeg;
      const cu = Math.cos(u);
      const su = Math.sin(u);
      for (let j = 0; j <= tubeSeg; j++) {
        const v = (2 * Math.PI * j) / tubeSeg;
        posArr.push(
          (majorR + tubeR * Math.cos(v)) * cu,
          tubeR * Math.sin(v),
          (majorR + tubeR * Math.cos(v)) * su
        );
      }
    }

    for (let i = 0; i < majorSeg; i++) {
      for (let j = 0; j < tubeSeg; j++) {
        const a = i * (tubeSeg + 1) + j;
        const b = a + tubeSeg + 1;
        idxArr.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }

    return { positions: new Float32Array(posArr), indices: new Uint16Array(idxArr), indexCount: idxArr.length };
  }

  static _getMesh(shape) {
    switch (shape) {
      case 'cube': return Physarum._generateCubeMesh();
      case 'sphere': return Physarum._generateSphereMesh();
      case 'torus': return Physarum._generateTorusMesh();
      default: return Physarum._generateTorusMesh();
    }
  }

  // -- 4x4 Matrix Utilities (column-major for WebGL) --------------------------

  static _mat4Identity() {
    return new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
  }

  static _mat4Multiply(a, b) {
    const out = new Float32Array(16);
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        out[j * 4 + i] = a[i] * b[j * 4] + a[4 + i] * b[j * 4 + 1] + a[8 + i] * b[j * 4 + 2] + a[12 + i] * b[j * 4 + 3];
      }
    }
    return out;
  }

  static _mat4Ortho(left, right, bottom, top, near, far) {
    const out = new Float32Array(16);
    out[0] = 2 / (right - left);
    out[5] = 2 / (top - bottom);
    out[10] = -2 / (far - near);
    out[12] = -(right + left) / (right - left);
    out[13] = -(top + bottom) / (top - bottom);
    out[14] = -(far + near) / (far - near);
    out[15] = 1;
    return out;
  }

  static _mat4RotateX(angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const out = Physarum._mat4Identity();
    out[5] = c;  out[6] = s;
    out[9] = -s; out[10] = c;
    return out;
  }

  static _mat4RotateY(angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const out = Physarum._mat4Identity();
    out[0] = c;  out[2] = -s;
    out[8] = s;  out[10] = c;
    return out;
  }

  static _mat4RotateZ(angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const out = Physarum._mat4Identity();
    out[0] = c;  out[1] = s;
    out[4] = -s; out[5] = c;
    return out;
  }

  static _mat4Translate(x, y, z) {
    const out = Physarum._mat4Identity();
    out[12] = x; out[13] = y; out[14] = z;
    return out;
  }

  // -- 3D WebGL Renderer -------------------------------------------------------

  _init3DRenderer() {
    if (this._gl) return true;

    this._3dCanvas = document.createElement('canvas');
    const gl = this._3dCanvas.getContext('webgl2', {
      antialias: false,
      depth: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    if (!gl) return false;
    this._gl = gl;

    const vsSource = `#version 300 es
      in vec3 aPosition;
      uniform mat4 uMVP;
      void main() {
        gl_Position = uMVP * vec4(aPosition, 1.0);
      }
    `;

    const fsSource = `#version 300 es
      precision highp float;
      out vec4 fragColor;
      void main() {
        float depth = gl_FragCoord.z;
        float food = 1.0 - 0.7 * depth;
        fragColor = vec4(food, 0.0, 0.0, 1.0);
      }
    `;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      this._gl = null;
      this._3dCanvas = null;
      return false;
    }

    this._3dProgram = program;
    this._3dAttribLoc = gl.getAttribLocation(program, 'aPosition');
    this._3dMVPLoc = gl.getUniformLocation(program, 'uMVP');

    return true;
  }

  _destroy3DRenderer() {
    if (this._gl && this._3dProgram) {
      this._gl.deleteProgram(this._3dProgram);
    }
    this._gl = null;
    this._3dCanvas = null;
    this._3dProgram = null;
    this._3dMVPLoc = null;
    this._3dAttribLoc = -1;
    this._3dMeshCache = {};
  }

  _render3DToMask(width, height) {
    const gl = this._gl;
    if (!gl) return null;

    this._3dCanvas.width = width;
    this._3dCanvas.height = height;
    gl.viewport(0, 0, width, height);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(this._3dProgram);

    // Build MVP matrix: projection * view * model
    const aspect = width / height;
    const extent = 1.0;
    let left, right, bottom, top;
    if (aspect >= 1) {
      left = -extent * aspect; right = extent * aspect;
      bottom = -extent; top = extent;
    } else {
      left = -extent; right = extent;
      bottom = -extent / aspect; top = extent / aspect;
    }

    const proj = Physarum._mat4Ortho(left, right, bottom, top, 0.1, 6.0);
    const view = Physarum._mat4Translate(0, 0, -3);

    // Model: rotation based on current angles and axes
    const rot = this._3dRotation;
    let model = Physarum._mat4Identity();
    if (rot.x !== 0) model = Physarum._mat4Multiply(Physarum._mat4RotateX(rot.x), model);
    if (rot.y !== 0) model = Physarum._mat4Multiply(Physarum._mat4RotateY(rot.y), model);
    if (rot.z !== 0) model = Physarum._mat4Multiply(Physarum._mat4RotateZ(rot.z), model);

    const mv = Physarum._mat4Multiply(view, model);
    const mvp = Physarum._mat4Multiply(proj, mv);

    gl.uniformMatrix4fv(this._3dMVPLoc, false, mvp);

    // Get mesh (cache by shape name)
    const shape = this.shape;
    if (!this._3dMeshCache[shape]) {
      this._3dMeshCache[shape] = Physarum._getMesh(shape);
    }
    const mesh = this._3dMeshCache[shape];

    // Upload mesh to GL
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(this._3dAttribLoc);
    gl.vertexAttribPointer(this._3dAttribLoc, 3, gl.FLOAT, false, 0, 0);

    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);

    gl.drawElements(gl.TRIANGLES, mesh.indexCount, gl.UNSIGNED_SHORT, 0);

    // Read back pixels
    const pixels = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    // Clean up GL buffers
    gl.deleteBuffer(vbo);
    gl.deleteBuffer(ibo);

    // Convert to food mask (red channel → float, flip Y since WebGL is bottom-up)
    const mask = new Float32Array(width * height);
    for (let y = 0; y < height; y++) {
      const srcRow = (height - 1 - y) * width;
      const dstRow = y * width;
      for (let x = 0; x < width; x++) {
        mask[dstRow + x] = pixels[(srcRow + x) * 4] / 255;
      }
    }

    return mask;
  }

  _generate3DMask(width, height) {
    if (!this._init3DRenderer()) {
      return Physarum._generateProceduralFallback(width, height);
    }
    const mask = this._render3DToMask(width, height);
    if (!mask) return Physarum._generateProceduralFallback(width, height);
    return mask;
  }

  // -- GPU Buffers -----------------------------------------------------------

  _createBuffers() {
    this._destroyBuffers();

    const device = this._device;
    const w = this._simWidth;
    const h = this._simHeight;
    const gridSize = w * h;
    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;
    const isMultiSpecies = isEco || isComplex;

    // Agent buffer: mode-dependent size
    const maxAgents = isMultiSpecies ? MAX_AGENTS_ECOSYSTEM : MAX_AGENTS_SIMPLE;
    const stride = isMultiSpecies ? AGENT_STRIDE_ECOSYSTEM : AGENT_STRIDE;
    this._currentMaxAgents = maxAgents;
    this._currentStride = stride;
    this._agentBuffer = device.createBuffer({
      label: 'agents',
      size: maxAgents * stride * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC,
    });

    // Audio density readback staging buffer (capped at AUDIO_READBACK_MAX_AGENTS)
    const audioReadbackAgents = Math.min(maxAgents, AUDIO_READBACK_MAX_AGENTS);
    this._audioStagingBuffer = device.createBuffer({
      label: 'audio-staging',
      size: audioReadbackAgents * stride * 4,
      usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    });
    this._audioReadbackPending = false;

    // Trail ping-pong buffers
    // Simple: 1 channel. Ecosystem: 6 channels. Complex: 8 channels.
    const trailChannels = isComplex ? TRAIL_CHANNELS_COMPLEX : (isEco ? TRAIL_CHANNELS_ECO : 1);
    this._trailChannels = trailChannels;
    const trailBufSize = gridSize * trailChannels * 4;
    this._trailBuffers = [
      device.createBuffer({ label: 'trail-A', size: trailBufSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST }),
      device.createBuffer({ label: 'trail-B', size: trailBufSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST }),
    ];
    this._trailIndex = 0;

    // Food capacity mask
    this._foodMaskBuffer = device.createBuffer({
      label: 'food-mask',
      size: gridSize * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(this._foodMaskBuffer, 0, this._foodMask);

    // Food buffer (initialized to capacity)
    this._foodBuffer = device.createBuffer({
      label: 'food',
      size: gridSize * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(this._foodBuffer, 0, this._foodMask);

    // Alive buffer: atomic u32 per agent slot (multi-species modes)
    this._aliveBuffer = null;
    this._aliveData = null;
    if (isMultiSpecies) {
      this._aliveBuffer = device.createBuffer({
        label: 'alive',
        size: MAX_AGENTS_ECOSYSTEM * 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      });
    }

    // Population count buffers (multi-species modes)
    this._popCountBuffer = null;
    this._popCountStagingBuffer = null;
    if (isEco) {
      this._popCountBuffer = device.createBuffer({
        label: 'pop-count',
        size: 16, // 4 × u32 (alpha, beta, gamma, total)
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
      });
      this._popCountStagingBuffer = device.createBuffer({
        label: 'pop-count-staging',
        size: 16,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
      });
    } else if (isComplex) {
      this._popCountBuffer = device.createBuffer({
        label: 'pop-count',
        size: 20, // 5 × u32 (herbivore, predator, scavenger, symbiont, total)
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
      });
      this._popCountStagingBuffer = device.createBuffer({
        label: 'pop-count-staging',
        size: 20,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
      });
    }

    // Uniform buffer
    this._uniformData = new ArrayBuffer(UNIFORM_BUFFER_SIZE);
    this._uniformF32 = new Float32Array(this._uniformData);
    this._uniformU32 = new Uint32Array(this._uniformData);
    this._uniformBuffer = device.createBuffer({
      label: 'uniforms',
      size: UNIFORM_BUFFER_SIZE,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    this._writeDefaultUniforms();

    // Render colors uniform buffer (4 × vec4 = 64 bytes)
    this._renderColorsData = new Float32Array(16);
    this._renderColorsBuffer = device.createBuffer({
      label: 'render-colors',
      size: 64,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    this._uploadRenderColors();

    // SDF Glow buffers (created on demand by _ensureSdfBuffers)
    this._sdfBuffers = null;
    this._sdfStepBuffers = null;

    // RD buffers (created on demand by _ensureRdBuffers)
    this._rdBuffers = null;
    this._rdIndex = 0;

    // Metaballs buffers (created on demand by _ensureMbBuffers)
    this._mbBuffers = null;
    this._mbBuffer = null;

    // Trail Lines ring buffer (created on demand by _ensureLinesBuffers)
    this._linesRingBuffer = null;
  }

  _writeDefaultUniforms() {
    const d = this.isComplex ? COMPLEX_DEFAULTS : (this.mode === 'ecosystem' ? ECO_DEFAULTS : DEFAULTS);
    const f = this._uniformF32;
    const u = this._uniformU32;
    const rs = this._resolutionScale;

    u[U.GRID_WIDTH] = this._simWidth;
    u[U.GRID_HEIGHT] = this._simHeight;
    u[U.AGENT_COUNT] = d.agentCount;
    u[U.FRAME] = 0;
    f[U.SENSOR_ANGLE] = d.sensorAngle;
    f[U.SENSOR_DIST] = d.sensorDist * rs;
    f[U.TURN_SPEED] = d.turnSpeed;
    f[U.MOVE_SPEED] = d.moveSpeed * rs;
    f[U.DEPOSIT] = d.deposit;
    f[U.TRAIL_DECAY] = d.trailDecay;
    f[U.TRAIL_DIFFUSE] = d.trailDiffusion;
    f[U.FOOD_WEIGHT] = d.foodWeight;
    f[U.FOOD_CONSUME] = d.foodConsumptionRate;
    f[U.FOOD_REGEN] = this.regeneration ? d.foodRegenRate : 0;
    f[U.ENERGY_GAIN] = d.energyGain;
    f[U.ENERGY_DRAIN] = d.energyDrain;
    f[U.AMBIENT_FRAC] = d.ambientFraction;
    f[U.TIME] = 0;
    f[U.MOUSE_X] = 0;
    f[U.MOUSE_Y] = 0;
    u[U.MOUSE_ACTIVE] = 0;
    f[U.EVENT_DEATH_MULT] = 1.0;
    u[U.EVENT_PLAGUE_SPECIES] = 0;

    this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);
  }

  _destroyBuffers() {
    const bufs = [
      this._agentBuffer,
      this._foodMaskBuffer,
      this._foodBuffer,
      this._uniformBuffer,
      this._renderColorsBuffer,
      this._aliveBuffer,
      this._popCountBuffer,
      this._popCountStagingBuffer,
      this._audioStagingBuffer,
    ];
    if (this._trailBuffers) bufs.push(...this._trailBuffers);
    for (const buf of bufs) {
      if (buf) buf.destroy();
    }
    this._agentBuffer = null;
    this._trailBuffers = null;
    this._foodMaskBuffer = null;
    this._foodBuffer = null;
    this._uniformBuffer = null;
    this._uniformData = null;
    this._uniformF32 = null;
    this._uniformU32 = null;
    this._renderColorsBuffer = null;
    this._renderColorsData = null;
    this._aliveBuffer = null;
    this._aliveData = null;
    this._popCountBuffer = null;
    this._popCountStagingBuffer = null;
    this._audioStagingBuffer = null;
    this._audioReadbackPending = false;
    this._bindGroupSets = null;

    // SDF buffers
    if (this._sdfBuffers) {
      for (const buf of this._sdfBuffers) buf.destroy();
    }
    this._sdfBuffers = null;
    if (this._sdfStepBuffers) {
      for (const buf of this._sdfStepBuffers) buf.destroy();
    }
    this._sdfStepBuffers = null;
    this._sdfSeedPipeline = null;
    this._sdfJfaPipeline = null;
    this._sdfSeedBindGroupLayout = null;
    this._sdfJfaBindGroupLayout = null;

    // RD buffers
    if (this._rdBuffers) {
      for (const buf of this._rdBuffers) buf.destroy();
    }
    this._rdBuffers = null;
    this._rdComputePipeline = null;
    this._rdComputeBindGroupLayout = null;
    this._rdIndex = 0;

    // Metaballs buffers
    if (this._mbBuffers) {
      for (const buf of this._mbBuffers) buf.destroy();
    }
    this._mbBuffers = null;
    this._mbBuffer = null;
    this._mbComputePipeline = null;
    this._mbReblurPipeline = null;
    this._mbComputeBindGroupLayout = null;
    this._mbReblurBindGroupLayout = null;

    // Trail Lines buffers
    if (this._linesRingBuffer) {
      this._linesRingBuffer.destroy();
    }
    this._linesRingBuffer = null;
    this._linesComputePipeline = null;
    this._linesComputeBindGroupLayout = null;
  }

  // -- Pipelines -------------------------------------------------------------

  _createAgentUpdatePipeline() {
    const device = this._device;
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'agent-update-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._agentUpdatePipeline = device.createComputePipeline({
      label: 'agent-update-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      compute: { module: device.createShaderModule({ code: WGSL_AGENT_UPDATE }), entryPoint: 'main' },
    });
    this._agentUpdateBindGroupLayout = bindGroupLayout;
  }

  _createFoodRegenPipeline() {
    const device = this._device;
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'food-regen-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._foodRegenPipeline = device.createComputePipeline({
      label: 'food-regen-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      compute: { module: device.createShaderModule({ code: WGSL_FOOD_REGEN }), entryPoint: 'main' },
    });
    this._foodRegenBindGroupLayout = bindGroupLayout;
  }

  _createDiffusePipeline() {
    const device = this._device;
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'diffuse-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._diffusePipeline = device.createComputePipeline({
      label: 'diffuse-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      compute: { module: device.createShaderModule({ code: WGSL_DIFFUSE }), entryPoint: 'main' },
    });
    this._diffuseBindGroupLayout = bindGroupLayout;
  }

  // -- SDF Glow Pipelines & Buffers ------------------------------------------

  _ensureSdfBuffers() {
    if (this._sdfBuffers) return;
    const device = this._device;
    const w = this._simWidth;
    const h = this._simHeight;
    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;

    // 2 i32 per pixel for simple, 6 for eco (3 species × 2), 8 for complex (4 species × 2)
    const intsPerPixel = isComplex ? 8 : (isEco ? 6 : 2);
    const bufSize = w * h * intsPerPixel * 4;

    this._sdfBuffers = [
      device.createBuffer({ label: 'sdf-A', size: bufSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST }),
      device.createBuffer({ label: 'sdf-B', size: bufSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST }),
    ];

    // Pre-create per-step uniform buffers (avoids writeBuffer race within single encoder)
    const maxDim = Math.max(w, h);
    let step = 1;
    while (step < maxDim) step *= 2;
    step = Math.floor(step / 2);

    const stepSizes = [];
    while (step >= 1) { stepSizes.push(step); step = Math.floor(step / 2); }

    this._sdfStepBuffers = stepSizes.map((s, i) => {
      const data = new Uint32Array([s, 0, 0, 0]);
      const buf = device.createBuffer({
        label: `sdf-step-${i}`,
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      device.queue.writeBuffer(buf, 0, data);
      return buf;
    });

    this._sdfResultIndex = stepSizes.length % 2 === 0 ? 0 : 1;
  }

  _destroySdfBuffers() {
    if (this._sdfBuffers) {
      for (const buf of this._sdfBuffers) buf.destroy();
    }
    this._sdfBuffers = null;
    if (this._sdfStepBuffers) {
      for (const buf of this._sdfStepBuffers) buf.destroy();
    }
    this._sdfStepBuffers = null;
  }

  _createSdfPipelines() {
    const device = this._device;
    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;

    // Seed pipeline
    const seedCode = isComplex ? WGSL_SDF_SEED_COMPLEX : (isEco ? WGSL_SDF_SEED_ECO : WGSL_SDF_SEED);
    const seedBGL = device.createBindGroupLayout({
      label: 'sdf-seed-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._sdfSeedPipeline = device.createComputePipeline({
      label: 'sdf-seed-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [seedBGL] }),
      compute: { module: device.createShaderModule({ code: seedCode }), entryPoint: 'main' },
    });
    this._sdfSeedBindGroupLayout = seedBGL;

    // JFA step pipeline
    const jfaCode = isComplex ? WGSL_SDF_JFA_COMPLEX : (isEco ? WGSL_SDF_JFA_ECO : WGSL_SDF_JFA);
    const jfaBGL = device.createBindGroupLayout({
      label: 'sdf-jfa-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
      ],
    });
    this._sdfJfaPipeline = device.createComputePipeline({
      label: 'sdf-jfa-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [jfaBGL] }),
      compute: { module: device.createShaderModule({ code: jfaCode }), entryPoint: 'main' },
    });
    this._sdfJfaBindGroupLayout = jfaBGL;
  }

  _runSdfCompute(encoder, trailBuffer) {
    if (!this._sdfSeedPipeline || !this._sdfJfaPipeline) return;
    if (!this._sdfBuffers || !this._sdfStepBuffers) return;

    const device = this._device;
    const w = this._simWidth;
    const h = this._simHeight;
    const wgX = Math.ceil(w / 16);
    const wgY = Math.ceil(h / 16);

    // 1. Seed pass: trail → sdfBuffers[0]
    const seedBG = device.createBindGroup({
      layout: this._sdfSeedBindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: trailBuffer } },
        { binding: 2, resource: { buffer: this._sdfBuffers[0] } },
      ],
    });
    const seedPass = encoder.beginComputePass();
    seedPass.setPipeline(this._sdfSeedPipeline);
    seedPass.setBindGroup(0, seedBG);
    seedPass.dispatchWorkgroups(wgX, wgY);
    seedPass.end();

    // 2. JFA passes using pre-created step buffers
    // Quality controls how many large steps to skip: High=0, Med=1, Low=2
    const skipSteps = Math.max(0, 2 - (this._renderQuality || 0));
    const totalSteps = this._sdfStepBuffers.length;
    const startStep = Math.min(skipSteps, Math.max(totalSteps - 1, 0));

    let src = 0;
    for (let i = startStep; i < totalSteps; i++) {
      const dst = 1 - src;

      const jfaBG = device.createBindGroup({
        layout: this._sdfJfaBindGroupLayout,
        entries: [
          { binding: 0, resource: { buffer: this._uniformBuffer } },
          { binding: 1, resource: { buffer: this._sdfBuffers[src] } },
          { binding: 2, resource: { buffer: this._sdfBuffers[dst] } },
          { binding: 3, resource: { buffer: this._sdfStepBuffers[i] } },
        ],
      });

      const jfaPass = encoder.beginComputePass();
      jfaPass.setPipeline(this._sdfJfaPipeline);
      jfaPass.setBindGroup(0, jfaBG);
      jfaPass.dispatchWorkgroups(wgX, wgY);
      jfaPass.end();

      src = dst;
    }

    this._sdfResultIndex = src;
    return src;
  }

  // -- Reaction-Diffusion Pipelines & Buffers ---------------------------------

  _ensureRdBuffers() {
    if (this._rdBuffers) return;
    const device = this._device;
    const w = this._simWidth;
    const h = this._simHeight;
    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;

    // 2 floats per pixel for simple (U, V), 6 for eco (3×UV), 8 for complex (4×UV)
    const floatsPerPixel = isComplex ? 8 : (isEco ? 6 : 2);
    const bufSize = w * h * floatsPerPixel * 4;

    // Initialize with U=1.0, V=0.0 (stable Gray-Scott steady state)
    const initData = new Float32Array(w * h * floatsPerPixel);
    const speciesCount = isEco ? 3 : 1;
    for (let i = 0; i < w * h; i++) {
      for (let sp = 0; sp < speciesCount; sp++) {
        initData[i * floatsPerPixel + sp * 2] = 1.0;     // U = 1.0
        initData[i * floatsPerPixel + sp * 2 + 1] = 0.0; // V = 0.0
      }
    }

    this._rdBuffers = [
      device.createBuffer({ label: 'rd-A', size: bufSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST }),
      device.createBuffer({ label: 'rd-B', size: bufSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST }),
    ];

    // Upload initial state to both buffers
    device.queue.writeBuffer(this._rdBuffers[0], 0, initData);
    device.queue.writeBuffer(this._rdBuffers[1], 0, initData);

    this._rdIndex = 0;
  }

  _destroyRdBuffers() {
    if (this._rdBuffers) {
      for (const buf of this._rdBuffers) buf.destroy();
    }
    this._rdBuffers = null;
    this._rdComputePipeline = null;
    this._rdComputeBindGroupLayout = null;
    this._rdIndex = 0;
  }

  _createRdPipelines() {
    const device = this._device;
    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;

    const code = isComplex ? WGSL_RD_COMPUTE_COMPLEX : (isEco ? WGSL_RD_COMPUTE_ECO : WGSL_RD_COMPUTE);
    const bgl = device.createBindGroupLayout({
      label: 'rd-compute-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      ],
    });
    this._rdComputePipeline = device.createComputePipeline({
      label: 'rd-compute-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bgl] }),
      compute: { module: device.createShaderModule({ code }), entryPoint: 'main' },
    });
    this._rdComputeBindGroupLayout = bgl;
  }

  _runRdCompute(encoder, trailBuffer) {
    if (!this._rdComputePipeline || !this._rdBuffers) return;

    const device = this._device;
    const w = this._simWidth;
    const h = this._simHeight;
    const wgX = Math.ceil(w / 16);
    const wgY = Math.ceil(h / 16);

    // Quality controls RD iterations: Low=4, Med=8, High=16
    const RD_STEPS_BY_QUALITY = [4, 8, 16];
    const RD_STEPS = RD_STEPS_BY_QUALITY[this._renderQuality || 0] || 8;
    let src = this._rdIndex || 0;

    for (let i = 0; i < RD_STEPS; i++) {
      const dst = 1 - src;

      const bg = device.createBindGroup({
        layout: this._rdComputeBindGroupLayout,
        entries: [
          { binding: 0, resource: { buffer: this._uniformBuffer } },
          { binding: 1, resource: { buffer: this._rdBuffers[src] } },
          { binding: 2, resource: { buffer: this._rdBuffers[dst] } },
          { binding: 3, resource: { buffer: trailBuffer } },
        ],
      });

      const pass = encoder.beginComputePass();
      pass.setPipeline(this._rdComputePipeline);
      pass.setBindGroup(0, bg);
      pass.dispatchWorkgroups(wgX, wgY);
      pass.end();

      src = dst;
    }

    this._rdIndex = src;
    return src;
  }

  // -- Metaballs compute infrastructure ----------------------------------------

  _ensureMbBuffers() {
    if (this._mbBuffers) return;
    const device = this._device;
    const w = this._simWidth;
    const h = this._simHeight;
    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;

    // Simple: 1 float/pixel, Eco: 3 floats/pixel, Complex: 4 floats/pixel
    const floatsPerPixel = isComplex ? 4 : (isEco ? 3 : 1);
    const bufSize = w * h * floatsPerPixel * 4;

    // Two buffers for ping-pong multi-pass blur (quality > Low)
    this._mbBuffers = [
      device.createBuffer({ label: 'mb-blur-A', size: bufSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST }),
      device.createBuffer({ label: 'mb-blur-B', size: bufSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST }),
    ];
    // Keep _mbBuffer as reference to the result buffer (set after compute)
    this._mbBuffer = this._mbBuffers[0];
  }

  _destroyMbBuffers() {
    if (this._mbBuffers) {
      for (const buf of this._mbBuffers) buf.destroy();
    }
    this._mbBuffers = null;
    this._mbBuffer = null;
    this._mbComputePipeline = null;
    this._mbReblurPipeline = null;
    this._mbComputeBindGroupLayout = null;
    this._mbReblurBindGroupLayout = null;
  }

  _createMbPipelines() {
    const device = this._device;
    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;

    const code = isComplex ? WGSL_MB_BLUR_COMPLEX : (isEco ? WGSL_MB_BLUR_ECO : WGSL_MB_BLUR);
    const bgl = device.createBindGroupLayout({
      label: 'mb-compute-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._mbComputePipeline = device.createComputePipeline({
      label: 'mb-compute-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bgl] }),
      compute: { module: device.createShaderModule({ code }), entryPoint: 'main' },
    });
    this._mbComputeBindGroupLayout = bgl;

    // Reblur pipeline for multi-pass (pass 2+). Multi-species needs separate shader;
    // simple reuses same shader (1ch→1ch, same layout as pass 1)
    const reblurCode = isComplex ? WGSL_MB_REBLUR_COMPLEX : (isEco ? WGSL_MB_REBLUR_ECO : WGSL_MB_BLUR);
    const reblurBgl = device.createBindGroupLayout({
      label: 'mb-reblur-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._mbReblurPipeline = device.createComputePipeline({
      label: 'mb-reblur-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [reblurBgl] }),
      compute: { module: device.createShaderModule({ code: reblurCode }), entryPoint: 'main' },
    });
    this._mbReblurBindGroupLayout = reblurBgl;
  }

  _runMbCompute(encoder, trailBuffer) {
    if (!this._mbComputePipeline || !this._mbBuffers) return;

    const device = this._device;
    const w = this._simWidth;
    const h = this._simHeight;
    const wgX = Math.ceil(w / 16);
    const wgY = Math.ceil(h / 16);

    // Quality determines number of blur passes: Low=1, Med=2, High=3
    const passes = (this._renderQuality || 0) + 1;

    // Pass 1: trail → mbBuffers[0]
    const bg = device.createBindGroup({
      layout: this._mbComputeBindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: trailBuffer } },
        { binding: 2, resource: { buffer: this._mbBuffers[0] } },
      ],
    });
    const pass1 = encoder.beginComputePass();
    pass1.setPipeline(this._mbComputePipeline);
    pass1.setBindGroup(0, bg);
    pass1.dispatchWorkgroups(wgX, wgY);
    pass1.end();

    // Additional blur passes (ping-pong between mbBuffers[0] and mbBuffers[1])
    let resultIdx = 0;
    if (passes > 1 && this._mbReblurPipeline) {
      for (let p = 1; p < passes; p++) {
        const src = (p - 1) % 2;
        const dst = p % 2;
        const rpBg = device.createBindGroup({
          layout: this._mbReblurBindGroupLayout,
          entries: [
            { binding: 0, resource: { buffer: this._uniformBuffer } },
            { binding: 1, resource: { buffer: this._mbBuffers[src] } },
            { binding: 2, resource: { buffer: this._mbBuffers[dst] } },
          ],
        });
        const rp = encoder.beginComputePass();
        rp.setPipeline(this._mbReblurPipeline);
        rp.setBindGroup(0, rpBg);
        rp.dispatchWorkgroups(wgX, wgY);
        rp.end();
        resultIdx = dst;
      }
    }

    // Update _mbBuffer to point to the result buffer
    this._mbBuffer = this._mbBuffers[resultIdx];
  }

  // -- Trail Lines compute infrastructure --------------------------------------

  _ensureLinesBuffers() {
    if (this._linesRingBuffer) return;
    const device = this._device;
    const isMultiSpecies = this.mode === 'ecosystem' || this.isComplex;
    const maxAgents = isMultiSpecies ? MAX_AGENTS_ECOSYSTEM : MAX_AGENTS_SIMPLE;
    const RING_SIZE = 16;

    // 2 floats (x,y) per slot, 16 slots per agent
    const bufSize = maxAgents * RING_SIZE * 2 * 4;

    this._linesRingBuffer = device.createBuffer({
      label: 'lines-ring',
      size: bufSize,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    // Initialize with -1.0 sentinel so unwritten slots are skipped by render shader
    const initData = new Float32Array(maxAgents * RING_SIZE * 2);
    initData.fill(-1.0);
    device.queue.writeBuffer(this._linesRingBuffer, 0, initData);
  }

  _destroyLinesBuffers() {
    if (this._linesRingBuffer) {
      this._linesRingBuffer.destroy();
    }
    this._linesRingBuffer = null;
    this._linesComputePipeline = null;
    this._linesComputeBindGroupLayout = null;
  }

  _createLinesPipelines() {
    const device = this._device;
    const isMultiSpecies = this.mode === 'ecosystem' || this.isComplex;

    const code = isMultiSpecies ? WGSL_LINES_RECORD_ECO : WGSL_LINES_RECORD;
    const bglEntries = [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
    ];
    if (isMultiSpecies) {
      bglEntries.push({ binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } });
    }
    const bgl = device.createBindGroupLayout({
      label: 'lines-compute-bgl',
      entries: bglEntries,
    });
    this._linesComputePipeline = device.createComputePipeline({
      label: 'lines-compute-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bgl] }),
      compute: { module: device.createShaderModule({ code }), entryPoint: 'main' },
    });
    this._linesComputeBindGroupLayout = bgl;
  }

  _runLinesCompute(encoder) {
    if (!this._linesComputePipeline || !this._linesRingBuffer) return;

    const device = this._device;
    const isMultiSpecies = this.mode === 'ecosystem' || this.isComplex;
    const agentCount = this._uniformU32[U.AGENT_COUNT];

    const bgEntries = [
      { binding: 0, resource: { buffer: this._uniformBuffer } },
      { binding: 1, resource: { buffer: this._agentBuffer } },
      { binding: 2, resource: { buffer: this._linesRingBuffer } },
    ];
    if (isMultiSpecies) {
      bgEntries.push({ binding: 3, resource: { buffer: this._aliveBuffer } });
    }

    const bg = device.createBindGroup({
      layout: this._linesComputeBindGroupLayout,
      entries: bgEntries,
    });

    const pass = encoder.beginComputePass();
    pass.setPipeline(this._linesComputePipeline);
    pass.setBindGroup(0, bg);
    pass.dispatchWorkgroups(Math.ceil(agentCount / 256));
    pass.end();
  }

  // -- Render Pipeline -------------------------------------------------------

  _createRenderPipelineForMode(mode) {
    const device = this._device;
    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;
    const isMultiSpecies = isEco || isComplex;
    let shaderCode, entries, label;

    // Multi-species render bind group entries (shared by eco and complex trail/trail-like modes)
    const multiSpeciesTrailEntries = [
      { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
      { binding: 3, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
    ];
    const multiSpeciesPointEntries = [
      { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
      { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
      { binding: 3, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
    ];
    const multiSpecies3BindEntries = [
      { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
    ];
    const multiSpeciesLineEntries = [
      { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
      { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
      { binding: 3, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
      { binding: 4, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
    ];

    switch (mode) {
      case 'trail':
      default:
        if (isComplex) {
          label = 'complex-render';
          shaderCode = WGSL_RENDER_TRAIL_COMPLEX;
          entries = multiSpeciesTrailEntries;
        } else if (isEco) {
          label = 'eco-render';
          shaderCode = WGSL_RENDER_ECO;
          entries = multiSpeciesTrailEntries;
        } else {
          label = 'render';
          shaderCode = WGSL_RENDER;
          entries = [
            { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
            { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
            { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
          ];
        }
        break;
      case 'points':
        if (isComplex) {
          label = 'complex-points';
          shaderCode = WGSL_RENDER_POINTS_COMPLEX;
          entries = multiSpeciesPointEntries;
        } else if (isEco) {
          label = 'eco-points';
          shaderCode = WGSL_RENDER_POINTS_ECO;
          entries = multiSpeciesPointEntries;
        } else {
          label = 'points';
          shaderCode = WGSL_RENDER_POINTS;
          entries = [
            { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
            { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
            { binding: 2, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
          ];
        }
        break;
      case 'sdf':
        if (isComplex) {
          label = 'complex-sdf';
          shaderCode = WGSL_RENDER_SDF_COMPLEX;
          entries = multiSpecies3BindEntries;
        } else if (isEco) {
          label = 'eco-sdf';
          shaderCode = WGSL_RENDER_SDF_ECO;
          entries = multiSpecies3BindEntries;
        } else {
          label = 'sdf';
          shaderCode = WGSL_RENDER_SDF;
          entries = [
            { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
            { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
            { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
          ];
        }
        // Ensure SDF compute infrastructure exists (may not be available on mock instances)
        if (this._ensureSdfBuffers) this._ensureSdfBuffers();
        if (this._createSdfPipelines) this._createSdfPipelines();
        break;
      case 'rd':
        if (isComplex) {
          label = 'complex-rd';
          shaderCode = WGSL_RENDER_RD_COMPLEX;
          entries = multiSpecies3BindEntries;
        } else if (isEco) {
          label = 'eco-rd';
          shaderCode = WGSL_RENDER_RD_ECO;
          entries = multiSpecies3BindEntries;
        } else {
          label = 'rd';
          shaderCode = WGSL_RENDER_RD;
          entries = [
            { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
            { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
            { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
          ];
        }
        // Ensure RD compute infrastructure exists
        if (this._ensureRdBuffers) this._ensureRdBuffers();
        if (this._createRdPipelines) this._createRdPipelines();
        break;
      case 'metaballs':
        if (isComplex) {
          label = 'complex-metaballs';
          shaderCode = WGSL_RENDER_METABALLS_COMPLEX;
          entries = multiSpecies3BindEntries;
        } else if (isEco) {
          label = 'eco-metaballs';
          shaderCode = WGSL_RENDER_METABALLS_ECO;
          entries = multiSpecies3BindEntries;
        } else {
          label = 'metaballs';
          shaderCode = WGSL_RENDER_METABALLS;
          entries = [
            { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
            { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
            { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
          ];
        }
        // Ensure Metaballs compute infrastructure exists
        if (this._ensureMbBuffers) this._ensureMbBuffers();
        if (this._createMbPipelines) this._createMbPipelines();
        break;
      case 'lines':
        if (isComplex) {
          label = 'complex-lines';
          shaderCode = WGSL_RENDER_LINES_COMPLEX;
          entries = multiSpeciesLineEntries;
        } else if (isEco) {
          label = 'eco-lines';
          shaderCode = WGSL_RENDER_LINES_ECO;
          entries = multiSpeciesLineEntries;
        } else {
          label = 'lines';
          shaderCode = WGSL_RENDER_LINES;
          entries = [
            { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
            { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
            { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
            { binding: 3, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
          ];
        }
        // Ensure Trail Lines compute infrastructure exists
        if (this._ensureLinesBuffers) this._ensureLinesBuffers();
        if (this._createLinesPipelines) this._createLinesPipelines();
        break;
    }

    // Additive blending for point sprites and trail lines
    const useAdditive = mode === 'points' || mode === 'lines';
    const blendState = useAdditive ? {
      color: { srcFactor: 'one', dstFactor: 'one', operation: 'add' },
      alpha: { srcFactor: 'one', dstFactor: 'one', operation: 'add' },
    } : undefined;

    const fragmentTargets = useAdditive
      ? [{ format: this._format, blend: blendState }]
      : [{ format: this._format }];

    const bindGroupLayout = device.createBindGroupLayout({ label: `${label}-bgl`, entries });
    const topology = mode === 'lines' ? 'line-list' : 'triangle-list';
    this._renderPipeline = device.createRenderPipeline({
      label: `${label}-pipeline`,
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      vertex: { module: device.createShaderModule({ code: shaderCode }), entryPoint: 'vs' },
      fragment: {
        module: device.createShaderModule({ code: shaderCode }),
        entryPoint: 'fs',
        targets: fragmentTargets,
      },
      primitive: { topology },
    });
    this._renderBindGroupLayout = bindGroupLayout;
  }

  // -- Render Mode Switching -------------------------------------------------

  _switchRenderMode(mode) {
    if (!Physarum.VALID_RENDER_MODES.includes(mode)) {
      mode = 'trail';
    }

    const changed = mode !== this._renderMode;
    this._renderMode = mode;

    if (changed) {
      // Rebuild render pipeline + bind groups if simulation is live
      if (this._initialized && this._device && this._bindGroupSets) {
        this._createRenderPipelineForMode(mode);
        this._rebuildRenderBindGroups();
        this._uploadRenderColors();
      }

      // Rebuild color pickers for the new mode's slot configuration
      this._buildRenderColors();
    }

    // Show/hide quality slider based on hasQuality
    this._updateQualityRowVisibility();

    // Sync attribute (suppress callback to avoid re-entry)
    this._suppressRenderModeCallback = true;
    this.renderMode = mode;
    this._suppressRenderModeCallback = false;

    // Sync dropdown
    const select = this._panelEl.querySelector('.render-mode-select');
    if (select && select.value !== mode) select.value = mode;
  }

  _updateQualityRowVisibility() {
    if (!this._panelEl) return;
    const row = this._panelEl.querySelector('.render-quality-row');
    if (!row) return;
    const cfg = RENDER_MODE_CONFIG[this._renderMode || 'trail'];
    row.style.display = (cfg && cfg.hasQuality) ? '' : 'none';
  }

  _setRenderQuality(quality) {
    quality = Math.max(0, Math.min(2, quality));
    if (quality === this._renderQuality) return;
    this._renderQuality = quality;

    // Rebuild render-specific compute infrastructure at new quality level
    if (this._initialized && this._device && this._bindGroupSets) {
      const mode = this._renderMode;
      if (mode === 'metaballs') {
        this._destroyMbBuffers();
        this._ensureMbBuffers();
        this._createMbPipelines();
        this._rebuildRenderBindGroups();
      }
      // SDF and RD quality changes don't require buffer rebuild — they
      // just change step counts in the compute dispatch
    }

    // Sync dropdown
    const select = this._panelEl && this._panelEl.querySelector('.render-quality-select');
    if (select && select.value !== String(quality)) select.value = String(quality);
  }

  _rebuildRenderBindGroups() {
    if (!this._device || !this._bindGroupSets || !this._renderBindGroupLayout) return;

    const device = this._device;
    const isMultiSpecies = this.mode === 'ecosystem' || this.isComplex;

    for (let i = 0; i < this._bindGroupSets.length; i++) {
      const nxt = 1 - i;
      const entries = this._getRenderBindGroupEntries(nxt, isMultiSpecies);
      this._bindGroupSets[i].render = device.createBindGroup({
        layout: this._renderBindGroupLayout,
        entries,
      });
    }
  }

  _getRenderBindGroupEntries(nxt, isEco) {
    const mode = this._renderMode || 'trail';

    if (mode === 'points') {
      if (isEco) {
        return [
          { binding: 0, resource: { buffer: this._uniformBuffer } },
          { binding: 1, resource: { buffer: this._agentBuffer } },
          { binding: 2, resource: { buffer: this._aliveBuffer } },
          { binding: 3, resource: { buffer: this._renderColorsBuffer } },
        ];
      }
      return [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: this._agentBuffer } },
        { binding: 2, resource: { buffer: this._renderColorsBuffer } },
      ];
    }

    if (mode === 'sdf' && this._sdfBuffers) {
      const sdfBuf = this._sdfBuffers[this._sdfResultIndex || 0];
      return [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: sdfBuf } },
        { binding: 2, resource: { buffer: this._renderColorsBuffer } },
      ];
    }

    if (mode === 'rd' && this._rdBuffers) {
      const rdBuf = this._rdBuffers[this._rdIndex || 0];
      return [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: rdBuf } },
        { binding: 2, resource: { buffer: this._renderColorsBuffer } },
      ];
    }

    if (mode === 'metaballs' && this._mbBuffer) {
      return [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: this._mbBuffer } },
        { binding: 2, resource: { buffer: this._renderColorsBuffer } },
      ];
    }

    if (mode === 'lines') {
      if (!this._linesRingBuffer) this._ensureLinesBuffers();
      if (isEco) {
        return [
          { binding: 0, resource: { buffer: this._uniformBuffer } },
          { binding: 1, resource: { buffer: this._agentBuffer } },
          { binding: 2, resource: { buffer: this._linesRingBuffer } },
          { binding: 3, resource: { buffer: this._aliveBuffer } },
          { binding: 4, resource: { buffer: this._renderColorsBuffer } },
        ];
      }
      return [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: this._agentBuffer } },
        { binding: 2, resource: { buffer: this._linesRingBuffer } },
        { binding: 3, resource: { buffer: this._renderColorsBuffer } },
      ];
    }

    // Default: trail mode (and fallback for other future modes)
    if (isEco) {
      return [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: this._trailBuffers[nxt] } },
        { binding: 2, resource: { buffer: this._foodBuffer } },
        { binding: 3, resource: { buffer: this._renderColorsBuffer } },
      ];
    }
    return [
      { binding: 0, resource: { buffer: this._uniformBuffer } },
      { binding: 1, resource: { buffer: this._trailBuffers[nxt] } },
      { binding: 2, resource: { buffer: this._renderColorsBuffer } },
    ];
  }

  // -- Bind Groups -----------------------------------------------------------

  _createBindGroups() {
    const device = this._device;

    this._bindGroupSets = [0, 1].map(cur => {
      const nxt = 1 - cur;
      return {
        agentUpdate: device.createBindGroup({
          layout: this._agentUpdateBindGroupLayout,
          entries: [
            { binding: 0, resource: { buffer: this._uniformBuffer } },
            { binding: 1, resource: { buffer: this._agentBuffer } },
            { binding: 2, resource: { buffer: this._trailBuffers[cur] } },
            { binding: 3, resource: { buffer: this._foodMaskBuffer } },
            { binding: 4, resource: { buffer: this._foodBuffer } },
          ],
        }),
        foodRegen: device.createBindGroup({
          layout: this._foodRegenBindGroupLayout,
          entries: [
            { binding: 0, resource: { buffer: this._uniformBuffer } },
            { binding: 1, resource: { buffer: this._foodMaskBuffer } },
            { binding: 2, resource: { buffer: this._foodBuffer } },
          ],
        }),
        diffuse: device.createBindGroup({
          layout: this._diffuseBindGroupLayout,
          entries: [
            { binding: 0, resource: { buffer: this._uniformBuffer } },
            { binding: 1, resource: { buffer: this._trailBuffers[cur] } },
            { binding: 2, resource: { buffer: this._trailBuffers[nxt] } },
          ],
        }),
        render: device.createBindGroup({
          layout: this._renderBindGroupLayout,
          entries: this._getRenderBindGroupEntries(nxt, false),
        }),
      };
    });
  }

  // -- Agent Initialization --------------------------------------------------

  _initAgents(count = DEFAULTS.agentCount) {
    const w = this._simWidth;
    const h = this._simHeight;
    const mask = this._foodMask;
    if (!mask || w <= 0 || h <= 0) return null;

    const agentCount = Math.min(count, MAX_AGENTS_SIMPLE);
    const data = new Float32Array(MAX_AGENTS_SIMPLE * AGENT_STRIDE);

    // Determine if libre mode (all food pixels available)
    const isLibre = this.mask === 'libre';

    // Build food pixel list (only for non-libre modes)
    // Use lower threshold for 3D (back faces have food ~0.3)
    let foodPixels = null;
    if (!isLibre) {
      foodPixels = [];
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] > 0.1) foodPixels.push(i);
      }
      if (foodPixels.length === 0) foodPixels = null;
    }

    for (let i = 0; i < agentCount; i++) {
      const off = i * AGENT_STRIDE;

      if (isLibre || !foodPixels) {
        // Random position anywhere
        data[off + 0] = Math.random() * w;
        data[off + 1] = Math.random() * h;
      } else {
        // Random position on food pixel
        const px = foodPixels[Math.floor(Math.random() * foodPixels.length)];
        data[off + 0] = (px % w) + Math.random();
        data[off + 1] = Math.floor(px / w) + Math.random();
      }

      data[off + 2] = Math.random() * Math.PI * 2; // angle
      data[off + 3] = (0.8 + Math.random() * 0.4); // speed (base; scaled by params.moveSpeed in shader)
      data[off + 4] = DEFAULTS.sensorAngle * (0.8 + Math.random() * 0.4); // sensorAngle
      data[off + 5] = DEFAULTS.sensorDist * (0.8 + Math.random() * 0.4); // sensorDist
      data[off + 6] = DEFAULTS.turnSpeed * (0.8 + Math.random() * 0.4); // turnSpeed
      data[off + 7] = 0.5; // energy
    }

    this._device.queue.writeBuffer(this._agentBuffer, 0, data);
    return data;
  }

  // -- Ecosystem Agent Initialization ------------------------------------------

  _initEcosystemAgents(count = ECO_DEFAULTS.agentCount) {
    const w = this._simWidth;
    const h = this._simHeight;
    const mask = this._foodMask;
    if (!mask || w <= 0 || h <= 0) return null;

    // Build list of food pixel indices
    const isLibre = this.mask === 'libre';
    let foodPixels = null;
    if (!isLibre) {
      foodPixels = [];
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] > 0.1) foodPixels.push(i);
      }
      if (foodPixels.length === 0) foodPixels = null;
    }

    // Compute center of food region for spatial wedge assignment
    let cx = w / 2, cy = h / 2;
    if (foodPixels) {
      cx = 0; cy = 0;
      for (const px of foodPixels) {
        cx += px % w;
        cy += Math.floor(px / w);
      }
      cx /= foodPixels.length;
      cy /= foodPixels.length;
    }

    // Assign food pixels to species by 120° wedges from center
    const speciesPixels = [[], [], []];
    const TWO_PI = Math.PI * 2;
    const WEDGE = TWO_PI / 3;
    const sourcePixels = foodPixels || Array.from({ length: w * h }, (_, i) => i);

    for (const px of sourcePixels) {
      const x = px % w;
      const y = Math.floor(px / w);
      let angle = Math.atan2(y - cy, x - cx);
      if (angle < 0) angle += TWO_PI;
      const s = Math.min(Math.floor(angle / WEDGE), 2);
      speciesPixels[s].push(px);
    }

    // Fallback: if any species has no pixels, use all source pixels
    for (let s = 0; s < 3; s++) {
      if (speciesPixels[s].length === 0) speciesPixels[s] = sourcePixels;
    }

    const agentCount = Math.min(count, MAX_AGENTS_ECOSYSTEM);
    const data = new Float32Array(MAX_AGENTS_ECOSYSTEM * AGENT_STRIDE_ECOSYSTEM);
    const d = ECO_DEFAULTS;

    // Per-species counts: from panel or equal distribution
    const sc = this._ecoSpeciesCounts;
    const speciesCounts = sc
      ? [Math.min(sc[0], agentCount), Math.min(sc[1], agentCount), Math.min(sc[2], agentCount)]
      : [Math.floor(agentCount / 3), Math.floor(agentCount / 3), agentCount - 2 * Math.floor(agentCount / 3)];

    // Per-species sensor overrides
    const ss = this._ecoSpeciesSensors;

    let agentIdx = 0;
    for (let species = 0; species < 3; species++) {
      const pixels = speciesPixels[species];
      const sCount = speciesCounts[species];
      const baseSA = ss ? ss[species].sensorAngle : d.sensorAngle;
      const baseSD = ss ? ss[species].sensorDist : d.sensorDist;

      for (let i = 0; i < sCount; i++) {
        const off = agentIdx * AGENT_STRIDE_ECOSYSTEM;
        const px = pixels[Math.floor(Math.random() * pixels.length)];

        data[off + 0] = (px % w) + Math.random();                     // x
        data[off + 1] = Math.floor(px / w) + Math.random();           // y
        data[off + 2] = Math.random() * TWO_PI;                       // angle
        data[off + 3] = (0.8 + Math.random() * 0.4);                 // speed (base; scaled by params.moveSpeed in shader)
        data[off + 4] = baseSA * (0.8 + Math.random() * 0.4);        // sensorAngle
        data[off + 5] = baseSD * (0.8 + Math.random() * 0.4);        // sensorDist
        data[off + 6] = d.turnSpeed * (0.8 + Math.random() * 0.4);   // turnSpeed
        data[off + 7] = 0.5;                                          // energy
        data[off + 8] = species;                                       // species (0, 1, 2)
        data[off + 9] = d.deposit * (0.8 + Math.random() * 0.4);     // deposit (mutable)
        data[off + 10] = 0;                                            // state (0=forage)
        data[off + 11] = 0;                                            // age (0=just born)

        agentIdx++;
      }
    }

    // Initialize alive buffer: 1 for active agents, 0 for dead slots
    const aliveData = new Uint32Array(MAX_AGENTS_ECOSYSTEM);
    for (let i = 0; i < agentCount; i++) {
      aliveData[i] = 1;
    }

    // Upload to GPU
    this._device.queue.writeBuffer(this._agentBuffer, 0, data);
    if (this._aliveBuffer) {
      this._device.queue.writeBuffer(this._aliveBuffer, 0, aliveData);
    }

    this._aliveData = aliveData;
    return data;
  }

  // -- Complex Ecosystem Agent Initialization -----------------------------------

  _initComplexAgents(count = COMPLEX_DEFAULTS.agentCount) {
    const w = this._simWidth;
    const h = this._simHeight;
    const mask = this._foodMask;
    if (!mask || w <= 0 || h <= 0) return null;

    // Build list of food pixel indices
    const isLibre = this.mask === 'libre';
    let foodPixels = null;
    if (!isLibre) {
      foodPixels = [];
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] > 0.1) foodPixels.push(i);
      }
      if (foodPixels.length === 0) foodPixels = null;
    }

    // Compute center of food region for spatial wedge assignment
    let cx = w / 2, cy = h / 2;
    if (foodPixels) {
      cx = 0; cy = 0;
      for (const px of foodPixels) {
        cx += px % w;
        cy += Math.floor(px / w);
      }
      cx /= foodPixels.length;
      cy /= foodPixels.length;
    }

    // Assign food pixels to 4 species by 90° wedges from center
    const speciesPixels = [[], [], [], []];
    const TWO_PI = Math.PI * 2;
    const WEDGE = TWO_PI / 4;
    const sourcePixels = foodPixels || Array.from({ length: w * h }, (_, i) => i);

    for (const px of sourcePixels) {
      const x = px % w;
      const y = Math.floor(px / w);
      let angle = Math.atan2(y - cy, x - cx);
      if (angle < 0) angle += TWO_PI;
      const s = Math.min(Math.floor(angle / WEDGE), 3);
      speciesPixels[s].push(px);
    }

    // Fallback: if any species has no pixels, use all source pixels
    for (let s = 0; s < 4; s++) {
      if (speciesPixels[s].length === 0) speciesPixels[s] = sourcePixels;
    }

    const agentCount = Math.min(count, MAX_AGENTS_ECOSYSTEM);
    const data = new Float32Array(MAX_AGENTS_ECOSYSTEM * AGENT_STRIDE_ECOSYSTEM);
    const d = COMPLEX_DEFAULTS;

    // Per-species counts: from panel or equal distribution
    const sc = this._complexSpeciesCounts;
    const quarter = Math.floor(agentCount / 4);
    const speciesCounts = sc
      ? [Math.min(sc[0], agentCount), Math.min(sc[1], agentCount), Math.min(sc[2], agentCount), Math.min(sc[3], agentCount)]
      : [quarter, quarter, quarter, agentCount - 3 * quarter];

    // Per-species sensor overrides
    const ss = this._complexSpeciesSensors;

    let agentIdx = 0;
    for (let species = 0; species < 4; species++) {
      const pixels = speciesPixels[species];
      const sCount = speciesCounts[species];
      const baseSA = ss ? ss[species].sensorAngle : d.sensorAngle;
      const baseSD = ss ? ss[species].sensorDist : d.sensorDist;

      for (let i = 0; i < sCount; i++) {
        const off = agentIdx * AGENT_STRIDE_ECOSYSTEM;
        const px = pixels[Math.floor(Math.random() * pixels.length)];

        data[off + 0] = (px % w) + Math.random();                     // x
        data[off + 1] = Math.floor(px / w) + Math.random();           // y
        data[off + 2] = Math.random() * TWO_PI;                       // angle
        data[off + 3] = (0.8 + Math.random() * 0.4);                 // speed (base; scaled by params.moveSpeed in shader)
        data[off + 4] = baseSA * (0.8 + Math.random() * 0.4);        // sensorAngle
        data[off + 5] = baseSD * (0.8 + Math.random() * 0.4);        // sensorDist
        data[off + 6] = d.turnSpeed * (0.8 + Math.random() * 0.4);   // turnSpeed
        data[off + 7] = 0.5;                                          // energy
        data[off + 8] = species;                                       // species (0-3)
        data[off + 9] = d.deposit * (0.8 + Math.random() * 0.4);     // deposit (mutable)
        data[off + 10] = 0;                                            // state (0=forage)
        data[off + 11] = 0;                                            // age (0=just born)

        agentIdx++;
      }
    }

    // Initialize alive buffer: 1 for active agents, 0 for dead slots
    const aliveData = new Uint32Array(MAX_AGENTS_ECOSYSTEM);
    for (let i = 0; i < agentCount; i++) {
      aliveData[i] = 1;
    }

    // Upload to GPU
    this._device.queue.writeBuffer(this._agentBuffer, 0, data);
    if (this._aliveBuffer) {
      this._device.queue.writeBuffer(this._aliveBuffer, 0, aliveData);
    }

    this._aliveData = aliveData;
    return data;
  }

  // -- Scaled Agent Count (ecosystem-aware) ------------------------------------

  _scaledEcoAgentCount(baseCount) {
    const { width, height } = this._getSimulationSize();
    const scaled = Math.round(baseCount * (width * height) / REFERENCE_AREA);
    return Math.max(3000, Math.min(MAX_AGENTS_ECOSYSTEM, scaled));
  }

  // -- Simulation Control ----------------------------------------------------

  _restartSimulation() {
    // Deactivate scroll bindings before restart (will be re-activated in _doRestart if needed)
    this._deactivateScrollRotation();
    this._deactivateMorphScroll();

    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }

    if (!this._foodMask || this._simWidth <= 0 || this._simHeight <= 0) return;

    const token = {};
    this._restartToken = token;
    this._initPromise = (this._initPromise || Promise.resolve())
      .then(() => this._doRestart(token));
  }

  async _doRestart(token, agentCount) {
    if (this._restartToken !== token) return;

    const ok = await this._initWebGPU();
    if (!ok || this._restartToken !== token) return;

    // Reconfigure context for current canvas size
    if (this._ctx && this._device && this._format) {
      this._ctx.configure({
        device: this._device,
        format: this._format,
        alphaMode: 'opaque',
      });
    }

    this._createBuffers();

    // Apply panel params if agent count was specified (from START button)
    if (agentCount != null) {
      const params = this.readPanelParams();
      for (const [paramName, value] of Object.entries(params)) {
        this._applySliderToUniform(paramName, value);
      }
    }

    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;

    if (isEco || isComplex) {
      // Initialize agents (12-float layout, 3 or 4 species, spatial distribution)
      if (isComplex) {
        this._initComplexAgents(agentCount || this._scaledEcoAgentCount(COMPLEX_DEFAULTS.agentCount));
      } else {
        this._initEcosystemAgents(agentCount || this._scaledEcoAgentCount(ECO_DEFAULTS.agentCount));
      }
      // Set agentCount to full pool size for dispatch — alive buffer controls active agents
      this._uniformU32[U.AGENT_COUNT] = MAX_AGENTS_ECOSYSTEM;
      this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);

      // Create mode-specific pipelines
      if (isComplex) {
        this._createComplexAgentUpdatePipeline();
        this._createComplexDiffusePipeline();
      } else {
        this._createEcoAgentUpdatePipeline();
        this._createEcoDiffusePipeline();
      }
      this._createFoodRegenPipeline();
      this._createRenderPipelineForMode(this._renderMode || 'trail');
      if (isComplex) {
        this._createComplexPopCountPipeline();
      } else {
        this._createPopCountPipeline();
      }

      // Pre-create bind groups for ping-pong
      if (isComplex) {
        this._createComplexBindGroups();
      } else {
        this._createEcoBindGroups();
      }

      // Reset population readback state
      this._popReadbackPending = false;
      this._popCounts = isComplex
        ? { herbivore: 0, predator: 0, scavenger: 0, symbiont: 0, total: 0 }
        : { alpha: 0, beta: 0, gamma: 0, total: 0 };

      // Reset environmental event state
      this._eventType = EVENT_NONE;
      this._eventFramesLeft = 0;
      this._eventBaseFoodRegen = 0;

      this._initialized = true;
      this._frameCount = 0;
      this._startTime = performance.now();

      // Activate 3D scroll rotation if applicable
      if (this.mask === '3d' && !this.targets) {
        this._activateScrollRotation();
      }

      // Activate morph scroll binding if targets are set
      if (this._morphTargets && this._morphTargets.length >= 2) {
        this._activateMorphScroll();
      }

      // Apply per-target regeneration for initial target (index 0)
      if (this._morphTargetRegens && this._morphTargetRegens.length > 0) {
        this._applyMorphRegeneration(0, 0);
      }

      this._scheduleEcoFrame();
      return;
    }

    this._initAgents(agentCount || this._scaledAgentCount(DEFAULTS.agentCount));

    // Set uniform agent count to match initialized count
    const actualCount = agentCount || this._scaledAgentCount(DEFAULTS.agentCount);
    this._uniformU32[U.AGENT_COUNT] = Math.min(actualCount, MAX_AGENTS_SIMPLE);
    this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);

    // Create pipelines
    this._createAgentUpdatePipeline();
    this._createFoodRegenPipeline();
    this._createDiffusePipeline();
    this._createRenderPipelineForMode(this._renderMode || 'trail');

    // Pre-create bind groups for ping-pong
    this._createBindGroups();

    this._initialized = true;
    this._frameCount = 0;
    this._startTime = performance.now();

    // Activate 3D scroll rotation if applicable
    if (this.mask === '3d' && !this.targets) {
      this._activateScrollRotation();
    }

    // Activate morph scroll binding if targets are set
    if (this._morphTargets && this._morphTargets.length >= 2) {
      this._activateMorphScroll();
    }

    // Apply per-target regeneration for initial target (index 0)
    if (this._morphTargetRegens && this._morphTargetRegens.length > 0) {
      this._applyMorphRegeneration(0, 0);
    }

    this._scheduleFrame();
  }

  startSimulation() {
    const params = this.readPanelParams();
    this._simSpeed = Math.max(1, Math.min(5, Math.round(params.simSpeed || 1)));

    // Read mask mode from panel
    const maskSelect = this._panelEl.querySelector('.mask-mode-select');
    if (maskSelect) this.mask = maskSelect.value;

    // Read text from panel input (for text mask mode)
    if (this.mask === 'text') {
      const textInput = this._panelEl.querySelector('.mask-text-input');
      if (textInput && textInput.value) {
        this.text = textInput.value;
      }
    }

    // Read image src from panel input (for image mask mode)
    if (this.mask === 'image') {
      const srcInput = this._panelEl.querySelector('.image-src-input');
      if (srcInput && srcInput.value.trim()) {
        this.src = srcInput.value.trim();
      }
    }

    // Read shape and axes from panel (for 3D mask mode)
    if (this.mask === '3d') {
      const shapeSelect = this._panelEl.querySelector('.shape-select');
      if (shapeSelect) this.shape = shapeSelect.value;
      const xCb = this._panelEl.querySelector('.axis-x-checkbox');
      const yCb = this._panelEl.querySelector('.axis-y-checkbox');
      const zCb = this._panelEl.querySelector('.axis-z-checkbox');
      let axes = '';
      if (xCb && xCb.checked) axes += 'x';
      if (yCb && yCb.checked) axes += 'y';
      if (zCb && zCb.checked) axes += 'z';
      if (axes) this.axes = axes;
    }

    // Read regeneration from panel
    const regenCheckbox = this._panelEl.querySelector('.regen-checkbox');
    if (regenCheckbox) {
      this.regeneration = regenCheckbox.checked;
    }

    // Read render mode, quality, and colors
    this._suppressRenderModeCallback = true;
    const renderSelect = this._panelEl.querySelector('.render-mode-select');
    this._renderMode = renderSelect ? renderSelect.value : 'trail';
    this.renderMode = this._renderMode;
    this._suppressRenderModeCallback = false;

    const qualitySelect = this._panelEl.querySelector('.render-quality-select');
    if (qualitySelect) {
      this._renderQuality = parseInt(qualitySelect.value, 10) || 1;
    }

    this._suppressRenderColorsCallback = true;
    if (this._renderColors && Object.keys(this._renderColors).length > 0) {
      this.renderColors = this._renderColors;
    } else {
      this.renderColors = null;
    }
    this._suppressRenderColorsCallback = false;

    // Read simulation mode from panel
    const modeRadio = this._panelEl.querySelector('input[name="sim-mode"]:checked');
    if (modeRadio) this.mode = modeRadio.value;

    const isEco = this.mode === 'ecosystem';
    const isComplex = this.isComplex;

    // Read ecosystem-specific params from panel
    if (isEco) {
      const ac = Math.round(params.alphaCount != null ? params.alphaCount : ECO_DEFAULTS.agentCount / 3);
      const bc = Math.round(params.betaCount != null ? params.betaCount : ECO_DEFAULTS.agentCount / 3);
      const gc = Math.round(params.gammaCount != null ? params.gammaCount : ECO_DEFAULTS.agentCount / 3);
      this._ecoSpeciesCounts = [ac, bc, gc];

      this._ecoSpeciesSensors = [
        { sensorAngle: params.alphaSensorAngle || ECO_DEFAULTS.sensorAngle, sensorDist: params.alphaSensorDist || ECO_DEFAULTS.sensorDist },
        { sensorAngle: params.betaSensorAngle || ECO_DEFAULTS.sensorAngle, sensorDist: params.betaSensorDist || ECO_DEFAULTS.sensorDist },
        { sensorAngle: params.gammaSensorAngle || ECO_DEFAULTS.sensorAngle, sensorDist: params.gammaSensorDist || ECO_DEFAULTS.sensorDist },
      ];

      const eventsToggle = this._panelEl.querySelector('.eco-events-toggle');
      this._eventsEnabled = eventsToggle ? eventsToggle.checked : true;
    }

    // Read complex ecosystem params from panel
    if (isComplex) {
      const quarter = COMPLEX_DEFAULTS.agentCount / 4;
      const hc = Math.round(params.herbivoreCount != null ? params.herbivoreCount : quarter);
      const pc = Math.round(params.predatorCount != null ? params.predatorCount : quarter);
      const sc = Math.round(params.scavengerCount != null ? params.scavengerCount : quarter);
      const yc = Math.round(params.symbiontCount != null ? params.symbiontCount : quarter);
      this._complexSpeciesCounts = [hc, pc, sc, yc];

      this._complexSpeciesSensors = [
        { sensorAngle: params.herbivoreSensorAngle || COMPLEX_DEFAULTS.sensorAngle, sensorDist: params.herbivoreSensorDist || COMPLEX_DEFAULTS.sensorDist },
        { sensorAngle: params.predatorSensorAngle || COMPLEX_DEFAULTS.sensorAngle, sensorDist: params.predatorSensorDist || COMPLEX_DEFAULTS.sensorDist },
        { sensorAngle: params.scavengerSensorAngle || COMPLEX_DEFAULTS.sensorAngle, sensorDist: params.scavengerSensorDist || COMPLEX_DEFAULTS.sensorDist },
        { sensorAngle: params.symbiontSensorAngle || COMPLEX_DEFAULTS.sensorAngle, sensorDist: params.symbiontSensorDist || COMPLEX_DEFAULTS.sensorDist },
      ];

      const complexEventsToggle = this._panelEl.querySelector('.complex-events-toggle');
      this._eventsEnabled = complexEventsToggle ? complexEventsToggle.checked : true;
    }

    let agentCount;
    if (isComplex) {
      const sc = this._complexSpeciesCounts;
      agentCount = sc ? (sc[0] + sc[1] + sc[2] + sc[3]) : this._scaledEcoAgentCount(COMPLEX_DEFAULTS.agentCount);
      agentCount = Math.min(agentCount, MAX_AGENTS_ECOSYSTEM);
    } else if (isEco) {
      const sc = this._ecoSpeciesCounts;
      agentCount = sc ? (sc[0] + sc[1] + sc[2]) : this._scaledEcoAgentCount(ECO_DEFAULTS.agentCount);
      agentCount = Math.min(agentCount, MAX_AGENTS_ECOSYSTEM);
    } else {
      agentCount = params.agentCount != null
        ? Math.min(Math.round(params.agentCount), MAX_AGENTS_SIMPLE)
        : this._scaledAgentCount(DEFAULTS.agentCount);
    }

    this._paused = false;
    this._userStarted = true;
    this._audio?.resume();
    this._hidePanel();

    if (this._width > 0 && this._height > 0) {
      this._deactivateScrollRotation();
      this._deactivateMorphScroll();

      // If morph targets are set, pre-generate all target masks before restart
      if (this._morphTargets && this._morphTargets.length > 0) {
        // Cancel any running animation
        if (this._raf) {
          cancelAnimationFrame(this._raf);
          this._raf = null;
        }
        const token = {};
        this._restartToken = token;
        this._initPromise = (this._initPromise || Promise.resolve())
          .then(() => this._preGenerateTargetMasks())
          .then(() => {
            if (this._restartToken !== token) return;
            this._generateMask();
            return this._doRestart(token, agentCount);
          });
      } else {
        this._generateMask();

        // Cancel and restart
        if (this._raf) {
          cancelAnimationFrame(this._raf);
          this._raf = null;
        }
        const token = {};
        this._restartToken = token;
        this._initPromise = (this._initPromise || Promise.resolve())
          .then(() => this._doRestart(token, agentCount));
      }
    }
  }

  // -- Frame Loop ------------------------------------------------------------

  _frame() {
    if (!this._initialized || !this._device) return;

    // Upload updated 3D mask if scroll rotation changed it
    if (this._scrollDirty && this.mask === '3d' && this._gl) {
      this._uploadScrollMask();
    }

    const device = this._device;
    const w = this._simWidth;
    const h = this._simHeight;
    const agentCount = this._uniformU32[U.AGENT_COUNT];
    const steps = this._simSpeed || 1;

    for (let step = 0; step < steps; step++) {
      this._frameCount++;
      this._uniformU32[U.FRAME] = this._frameCount;
      this._uniformF32[U.TIME] = (performance.now() - this._startTime) / 1000;
      device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);

      const cur = this._trailIndex;
      const nxt = 1 - cur;
      const bg = this._bindGroupSets[cur];
      const isLastStep = step === steps - 1;

      const encoder = device.createCommandEncoder();

      // 1. Agent update
      const agentPass = encoder.beginComputePass();
      agentPass.setPipeline(this._agentUpdatePipeline);
      agentPass.setBindGroup(0, bg.agentUpdate);
      agentPass.dispatchWorkgroups(Math.ceil(agentCount / 256));
      agentPass.end();

      // 2. Food regeneration
      const foodPass = encoder.beginComputePass();
      foodPass.setPipeline(this._foodRegenPipeline);
      foodPass.setBindGroup(0, bg.foodRegen);
      foodPass.dispatchWorkgroups(Math.ceil(w / 16), Math.ceil(h / 16));
      foodPass.end();

      // 3. Diffuse (trail[cur] → trail[nxt])
      const diffusePass = encoder.beginComputePass();
      diffusePass.setPipeline(this._diffusePipeline);
      diffusePass.setBindGroup(0, bg.diffuse);
      diffusePass.dispatchWorkgroups(Math.ceil(w / 16), Math.ceil(h / 16));
      diffusePass.end();

      // 4. SDF compute (only on last step, only when sdf mode)
      if (isLastStep && this._renderMode === 'sdf') {
        this._runSdfCompute(encoder, this._trailBuffers[nxt]);
      }

      // 4b. RD compute (only on last step, only when rd mode)
      if (isLastStep && this._renderMode === 'rd') {
        this._runRdCompute(encoder, this._trailBuffers[nxt]);
      }

      // 4c. Metaballs blur compute (only on last step, only when metaballs mode)
      if (isLastStep && this._renderMode === 'metaballs') {
        this._runMbCompute(encoder, this._trailBuffers[nxt]);
      }

      // 4d. Trail Lines record compute (every step when lines mode — builds position history)
      if (this._renderMode === 'lines') {
        this._runLinesCompute(encoder);
      }

      // 5. Render (only on last step)
      if (isLastStep) {
        // Rebuild SDF render bind group with correct result buffer
        if (this._renderMode === 'sdf' && this._sdfBuffers) {
          bg.render = this._device.createBindGroup({
            layout: this._renderBindGroupLayout,
            entries: this._getRenderBindGroupEntries(nxt, false),
          });
        }

        // Rebuild RD render bind group with correct result buffer
        if (this._renderMode === 'rd' && this._rdBuffers) {
          bg.render = this._device.createBindGroup({
            layout: this._renderBindGroupLayout,
            entries: this._getRenderBindGroupEntries(nxt, false),
          });
        }

        // Rebuild Metaballs render bind group with blur buffer
        if (this._renderMode === 'metaballs' && this._mbBuffer) {
          bg.render = this._device.createBindGroup({
            layout: this._renderBindGroupLayout,
            entries: this._getRenderBindGroupEntries(nxt, false),
          });
        }

        // Rebuild Trail Lines render bind group with ring buffer
        if (this._renderMode === 'lines' && this._linesRingBuffer) {
          bg.render = this._device.createBindGroup({
            layout: this._renderBindGroupLayout,
            entries: this._getRenderBindGroupEntries(nxt, false),
          });
        }

        const textureView = this._ctx.getCurrentTexture().createView();
        const renderPass = encoder.beginRenderPass({
          colorAttachments: [{
            view: textureView,
            loadOp: 'clear',
            storeOp: 'store',
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
          }],
        });
        renderPass.setPipeline(this._renderPipeline);
        renderPass.setBindGroup(0, bg.render);
        if (this._renderMode === 'points') {
          renderPass.draw(6, agentCount);
        } else if (this._renderMode === 'lines') {
          renderPass.draw(30, agentCount);
        } else {
          renderPass.draw(3); // fullscreen triangle
        }
        renderPass.end();
      }

      // Audio agent readback (simple mode) — copy agent data on last step at readback interval
      const doAudioReadback = isLastStep && this._audio && this._audioReactive
        && this._audioStagingBuffer && !this._audioReadbackPending
        && (this._frameCount % AUDIO_READBACK_INTERVAL === 0);

      if (doAudioReadback) {
        const readbackAgents = Math.min(agentCount, AUDIO_READBACK_MAX_AGENTS);
        const readbackBytes = readbackAgents * this._currentStride * 4;
        encoder.copyBufferToBuffer(this._agentBuffer, 0, this._audioStagingBuffer, 0, readbackBytes);
      }

      device.queue.submit([encoder.finish()]);
      this._trailIndex = nxt;

      // Async agent readback for audio density sampling
      if (doAudioReadback) {
        this._audioReadbackPending = true;
        const stride = this._currentStride;
        const readbackAgents = Math.min(agentCount, AUDIO_READBACK_MAX_AGENTS);
        const simW = w;
        const simH = h;
        this._audioStagingBuffer.mapAsync(GPUMapMode.READ).then(() => {
          if (!this._audioStagingBuffer || !this._audio) {
            this._audioReadbackPending = false;
            return;
          }
          const mapped = new Float32Array(this._audioStagingBuffer.getMappedRange());
          const copy = new Float32Array(mapped);
          this._audioStagingBuffer.unmap();
          this._audioReadbackPending = false;
          this._audio?.setSimulationState({
            agentData: copy,
            agentCount: readbackAgents,
            stride: stride,
            simWidth: simW,
            simHeight: simH,
          });
        }).catch(() => {
          this._audioReadbackPending = false;
        });
      }
    }

    // Audio update — runs every frame (internal throttling handles density sampling rate)
    this._audio?.update(this._frameCount);

    this._scheduleFrame();
  }

  _scheduleFrame() {
    if (!this._userStarted) return;
    if (this.viewport && !this._viewportVisible) return;
    this._raf = requestAnimationFrame(() => this._frame());
  }

  // -- Render Colors ---------------------------------------------------------

  static _hexToLinearRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const toLinear = (c) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return [toLinear(r), toLinear(g), toLinear(b)];
  }

  _uploadRenderColors() {
    if (!this._device || !this._renderColorsBuffer || !this._renderColorsData) return;

    const mode = this._renderMode || 'trail';
    const cfg = RENDER_MODE_CONFIG[mode];
    if (!cfg) return;

    const simMode = (this.mode === 'ecosystem' || this.isComplex) ? 'ecosystem' : 'simple';
    const slots = cfg.colorSlots[simMode] || cfg.colorSlots['ecosystem'];
    const defaults = cfg.defaultColors[simMode] || cfg.defaultColors['ecosystem'];
    const custom = this._renderColors;
    const data = this._renderColorsData;

    data.fill(0);

    for (let i = 0; i < slots.length && i < 4; i++) {
      const key = slots[i].key;
      const hex = (custom && custom[key]) || defaults[key] || '#000000';
      const [r, g, b] = Physarum._hexToLinearRGB(hex);
      data[i * 4 + 0] = r;
      data[i * 4 + 1] = g;
      data[i * 4 + 2] = b;
      data[i * 4 + 3] = 1.0;
    }

    this._device.queue.writeBuffer(this._renderColorsBuffer, 0, data);
  }

  // -- Config Panel ----------------------------------------------------------

  readPanelParams() {
    const params = {};
    const sliders = this._panelEl.querySelectorAll('input[type="range"]');
    for (const slider of sliders) {
      const name = slider.getAttribute('data-param');
      if (name) params[name] = parseFloat(slider.value);
    }
    return params;
  }

  _applySliderToUniform(paramName, value) {
    if (!this._uniformF32 || !this._uniformU32 || !this._uniformBuffer || !this._device) return;

    const map = PARAM_UNIFORM_MAP[paramName];
    if (!map) return;

    let uniformValue = map.scale ? value * map.scale : value;

    if (paramName === 'sensorDist' || paramName === 'moveSpeed') {
      uniformValue *= this._resolutionScale;
    }

    // If regeneration is off, don't apply foodRegenRate
    if (paramName === 'foodRegenRate') {
      const cb = this._panelEl.querySelector('.regen-checkbox');
      if (cb && !cb.checked) return;
    }

    if (map.u32) {
      this._uniformU32[map.uniform] = uniformValue;
    } else {
      this._uniformF32[map.uniform] = uniformValue;
    }

    this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);
  }

  _randomizeParams() {
    const rand = (min, max) => min + Math.random() * (max - min);
    const sliders = {
      sensorAngle: rand(0.1, 1.2),
      sensorDist: rand(3, 50),
      turnSpeed: rand(0.1, 0.8),
      moveSpeed: rand(0.2, 2.5),
      deposit: rand(0.02, 0.25),
      trailDecay: rand(0.6, 0.98),
      trailDiffusion: rand(0.0, 0.4),
      foodWeight: rand(1, 18),
    };

    this._programmaticSliderUpdate = true;
    for (const [param, value] of Object.entries(sliders)) {
      const slider = this._panelEl.querySelector(`[data-param="${param}"]`);
      const valSpan = this._panelEl.querySelector(`[data-val="${param}"]`);
      if (slider) {
        slider.value = value;
        const map = PARAM_UNIFORM_MAP[param];
        if (valSpan && map) {
          valSpan.textContent = map.fmt === 0 ? String(Math.round(value)) : value.toFixed(map.fmt);
        }
      }
    }
    this._programmaticSliderUpdate = false;
  }

  // -- Config Save / Load -----------------------------------------------------

  /**
   * Convert an ImageBitmap to a data URL by drawing to an offscreen canvas.
   * @param {ImageBitmap} bitmap
   * @returns {string} data URL (PNG)
   */
  static _bitmapToDataURL(bitmap) {
    const c = document.createElement('canvas');
    c.width = bitmap.width;
    c.height = bitmap.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
    return c.toDataURL('image/png');
  }

  /**
   * Collect all current config state into a serializable object.
   * Images are embedded as data URLs.
   */
  _collectConfig() {
    const config = { _version: 1 };

    // Mode
    config.mode = this.mode || 'simple';

    // Simulation params — read from sliders (source of truth for panel state)
    config.params = {};
    const allParams = Object.keys(PARAM_UNIFORM_MAP)
      .concat(Object.keys(ECO_PANEL_PARAMS))
      .concat(Object.keys(COMPLEX_PANEL_PARAMS));
    for (const param of allParams) {
      const slider = this._panelEl.querySelector(`[data-param="${param}"]`);
      if (slider) config.params[param] = parseFloat(slider.value);
    }

    // Regeneration
    const regenCb = this._panelEl.querySelector('.regen-checkbox');
    if (regenCb) config.regeneration = regenCb.checked;

    // Events
    config.eventsEnabled = this._eventsEnabled;

    // Mask
    const maskSelect = this._panelEl.querySelector('.mask-mode-select');
    config.mask = maskSelect ? maskSelect.value : (this.mask || 'libre');

    // Mask text
    const textInput = this._panelEl.querySelector('.mask-text-input');
    if (textInput && textInput.value) config.text = textInput.value;

    // Mask image — serialize from bitmap if available, else from src attribute
    if (this._importedImageBitmap) {
      config.imageSrc = Physarum._bitmapToDataURL(this._importedImageBitmap);
    } else if (this.src) {
      config.imageSrc = this.src;
    }

    // 3D mask
    config.shape = this.shape;
    config.axes = this.axes;

    // Render
    config.renderMode = this._renderMode || 'trail';
    config.renderQuality = this._renderQuality || 1;
    if (this._renderColors && Object.keys(this._renderColors).length > 0) {
      config.renderColors = { ...this._renderColors };
    }

    // Morph targets — collect from panel DOM (includes data URLs for images)
    const targets = this._collectMorphTargets();
    if (targets && targets.length > 0) {
      config.morphTargets = targets;
    }
    const scrollToggle = this._panelEl.querySelector('.morph-scroll-toggle');
    if (scrollToggle) config.morphScroll = scrollToggle.checked;

    // Audio
    if (this._audio) {
      config.audio = {
        masterVolume: this._audio._masterLevel,
        reverbWet: this._audio._reverbWet,
        filterCutoff: this._audio._filterCutoff,
      };
    }

    return config;
  }

  /**
   * Export current config as a JSON file download.
   */
  _exportConfig() {
    const config = this._collectConfig();
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `physarum-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  _githubToken() {
    let token = localStorage.getItem('physarum_gh_token');
    if (!token) {
      token = prompt('Introduce tu token de GitHub para guardar simulaciones:');
      if (token) localStorage.setItem('physarum_gh_token', token.trim());
    }
    return token || null;
  }

  async _saveSimulation() {
    const name = prompt('Nombre de la simulacion:');
    if (!name || !name.trim()) return;
    const token = this._githubToken();
    if (!token) return;

    const filename = name.trim().replace(/[^a-zA-Z0-9_-]/g, '_') + '.json';
    const config = this._collectConfig();
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(config, null, 2))));
    const apiUrl = `https://api.github.com/repos/jovenJalejandro9/physarum/contents/simulaciones/${filename}`;

    // Check if file exists to get SHA (required for updates)
    let sha;
    try {
      const check = await fetch(apiUrl, { headers: { Authorization: `token ${token}` } });
      if (check.ok) { const d = await check.json(); sha = d.sha; }
    } catch {}

    const body = { message: `Guardar simulacion: ${name.trim()}`, content, branch: 'main' };
    if (sha) body.sha = sha;

    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      await this._renderSavedSimulations();
    } else {
      alert('Error al guardar. Comprueba tu token de GitHub.');
    }
  }

  async _renderSavedSimulations() {
    const list = this._panelEl.querySelector('.saved-sim-list');
    if (!list) return;
    list.innerHTML = '<div style="font-size:10px;color:#333;padding:8px 0;letter-spacing:0.08em;">Cargando...</div>';

    try {
      const res = await fetch('https://api.github.com/repos/jovenJalejandro9/physarum/contents/simulaciones');
      if (!res.ok) throw new Error();
      const files = await res.json();
      const sims = files.filter(f => f.name.endsWith('.json'));

      if (sims.length === 0) {
        list.innerHTML = '<div style="font-size:10px;color:#333;padding:8px 0;letter-spacing:0.08em;">No hay simulaciones guardadas.</div>';
        return;
      }

      list.innerHTML = sims.map(f => {
        const name = f.name.replace('.json', '');
        return `
          <div class="saved-sim-item">
            <span class="saved-sim-name">${name}</span>
            <div style="display:flex;gap:6px">
              <button class="saved-sim-load" type="button" data-name="${name}">cargar</button>
              <button class="saved-sim-delete" type="button" data-name="${name}" data-sha="${f.sha}" style="font-family:inherit;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;background:transparent;color:#333;border:1px solid #1a1a26;border-radius:4px;padding:4px 8px;cursor:pointer;">eliminar</button>
            </div>
          </div>`;
      }).join('');

      list.querySelectorAll('.saved-sim-load').forEach(btn => {
        btn.addEventListener('click', () => {
          const url = `${location.origin}${location.pathname}?sim=${encodeURIComponent(btn.dataset.name)}`;
          window.open(url, '_blank');
        });
      });

      list.querySelectorAll('.saved-sim-delete').forEach(btn => {
        btn.addEventListener('click', async () => {
          const token = this._githubToken();
          if (!token) return;
          const filename = btn.dataset.name + '.json';
          await fetch(`https://api.github.com/repos/jovenJalejandro9/physarum/contents/simulaciones/${filename}`, {
            method: 'DELETE',
            headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: `Eliminar simulacion: ${btn.dataset.name}`, sha: btn.dataset.sha, branch: 'main' }),
          });
          await this._renderSavedSimulations();
        });
      });
    } catch {
      list.innerHTML = '<div style="font-size:10px;color:#333;padding:8px 0;letter-spacing:0.08em;">No hay simulaciones guardadas.</div>';
    }
  }

  async _loadSimFromURL() {
    const params = new URLSearchParams(location.search);
    const simName = params.get('sim');
    if (!simName) return;
    try {
      const filename = simName.replace(/[^a-zA-Z0-9_-]/g, '_') + '.json';
      const res = await fetch(`https://raw.githubusercontent.com/jovenJalejandro9/physarum/main/simulaciones/${filename}`);
      if (!res.ok) { console.warn('[Physarum] Simulacion no encontrada:', simName); return; }
      const config = await res.json();
      await this._applyConfig(config);
      // Reset morph targets so hardcoded HTML attributes don't override the loaded config
      this._morphTargets = null;
      if (config.morphTargets && config.morphTargets.length >= 2) {
        this._applyMorphTargets();
      }
      this.startSimulation();
    } catch (e) {
      console.warn('[Physarum] Error al cargar simulacion desde URL', e);
    }
  }

  /**
   * Read a JSON config file and apply it.
   * @param {File} file
   */
  async _importConfigFromFile(file) {
    try {
      const text = await file.text();
      const config = JSON.parse(text);
      await this._applyConfig(config);
    } catch {
      console.warn('[Physarum] Failed to load config file');
    }
  }

  /**
   * Apply a config object to the component. Updates all panel controls,
   * attributes, and internal state to match the saved config.
   * @param {Object} config
   */
  async _applyConfig(config) {
    if (!config || typeof config !== 'object') return;

    // -- Mode --
    if (config.mode) {
      const radio = this._panelEl.querySelector(`input[name="sim-mode"][value="${config.mode}"]`);
      if (radio) radio.checked = true;
      this.mode = config.mode;
    }

    // -- Simulation params --
    if (config.params) {
      this._programmaticSliderUpdate = true;
      for (const [param, value] of Object.entries(config.params)) {
        const slider = this._panelEl.querySelector(`[data-param="${param}"]`);
        if (!slider) continue;
        slider.value = value;
        const map = PARAM_UNIFORM_MAP[param] || ECO_PANEL_PARAMS[param] || COMPLEX_PANEL_PARAMS[param];
        const valSpan = this._panelEl.querySelector(`[data-val="${param}"]`);
        if (valSpan && map) {
          valSpan.textContent = map.fmt === 0 ? String(Math.round(value)) : value.toFixed(map.fmt);
        } else if (valSpan && param === 'simSpeed') {
          valSpan.textContent = String(Math.round(value));
        }
        if (param === 'simSpeed') {
          this._simSpeed = Math.max(1, Math.min(5, Math.round(value)));
        }
      }
      this._programmaticSliderUpdate = false;
    }

    // -- Regeneration --
    if (typeof config.regeneration === 'boolean') {
      const regenCb = this._panelEl.querySelector('.regen-checkbox');
      if (regenCb) regenCb.checked = config.regeneration;
      this.regeneration = config.regeneration;
    }

    // -- Events --
    if (typeof config.eventsEnabled === 'boolean') {
      this._eventsEnabled = config.eventsEnabled;
      const ecoEvToggle = this._panelEl.querySelector('.eco-events-toggle');
      if (ecoEvToggle) ecoEvToggle.checked = config.eventsEnabled;
      const evSpan = this._panelEl.querySelector('[data-val="eventsEnabled"]');
      if (evSpan) evSpan.textContent = config.eventsEnabled ? 'ON' : 'OFF';
      const complexEvToggle = this._panelEl.querySelector('.complex-events-toggle');
      if (complexEvToggle) complexEvToggle.checked = config.eventsEnabled;
      const complexEvSpan = this._panelEl.querySelector('[data-val="complexEventsEnabled"]');
      if (complexEvSpan) complexEvSpan.textContent = config.eventsEnabled ? 'ON' : 'OFF';
    }

    // -- Mask --
    if (config.mask) {
      const maskSelect = this._panelEl.querySelector('.mask-mode-select');
      if (maskSelect) maskSelect.value = config.mask;
      this.mask = config.mask;
    }

    // -- Text --
    if (config.text) {
      const textInput = this._panelEl.querySelector('.mask-text-input');
      if (textInput) textInput.value = config.text;
      this.text = config.text;
    }

    // -- Image --
    if (config.imageSrc) {
      const srcInput = this._panelEl.querySelector('.image-src-input');
      if (srcInput) srcInput.value = config.imageSrc;
      this.src = config.imageSrc;
      await this._loadImageFromSrc(config.imageSrc);
    }

    // -- 3D --
    if (config.shape) this.shape = config.shape;
    if (config.axes) this.axes = config.axes;

    // -- Render mode --
    if (config.renderMode) {
      const renderSelect = this._panelEl.querySelector('.render-mode-select');
      if (renderSelect) renderSelect.value = config.renderMode;
      this._switchRenderMode(config.renderMode);
    }
    if (typeof config.renderQuality === 'number') {
      const qualitySelect = this._panelEl.querySelector('.render-quality-select');
      if (qualitySelect) qualitySelect.value = config.renderQuality;
      this._setRenderQuality(config.renderQuality);
    }

    // -- Render colors --
    if (config.renderColors) {
      this._renderColors = config.renderColors;
      this.renderColors = config.renderColors;
      this._buildRenderColors();
      this._uploadRenderColors();
    }

    // -- Morph targets --
    if (config.morphTargets && config.morphTargets.length > 0) {
      // Clear existing targets from panel
      const list = this._panelEl.querySelector('.morph-target-list');
      if (list) list.innerHTML = '';

      // Add entries to panel DOM and populate values
      for (const target of config.morphTargets) {
        this._addMorphTargetEntry(target);
      }
    }
    if (typeof config.morphScroll === 'boolean') {
      this._morphScrollEnabled = config.morphScroll;
      const scrollToggle = this._panelEl.querySelector('.morph-scroll-toggle');
      if (scrollToggle) scrollToggle.checked = config.morphScroll;
    }

    // -- Audio --
    if (config.audio && this._audio) {
      if (typeof config.audio.masterVolume === 'number') this._audio.setMasterVolume(config.audio.masterVolume);
      if (typeof config.audio.reverbWet === 'number') this._audio.setReverbWet(config.audio.reverbWet);
      if (typeof config.audio.filterCutoff === 'number') this._audio.setFilterCutoff(config.audio.filterCutoff);
      this._syncAudioTabFromState();
    }

    // Update mask-related UI visibility
    this._updateMaskControls();
    this._updateEcoSectionVisibility();
  }

  // -- Pointer Events --------------------------------------------------------

  _onPointerDown(e) {
    this._pointerDown = true;
    this._updateMouseUniform(e);

    // Audio click pulse — map pointer coords to canvas space
    if (this._audio && this._canvas) {
      const rect = this._canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio, 2);
      const canvasX = (e.clientX - rect.left) * dpr;
      const canvasY = (e.clientY - rect.top) * dpr;
      this._audio.triggerClickPulse(canvasX, canvasY, this._canvas.width, this._canvas.height);
    }
  }

  _onPointerMove(e) {
    if (!this._pointerDown) return;
    this._updateMouseUniform(e);

    // Audio drag pulse — continuous sonic trail while dragging
    if (this._audio && this._canvas) {
      const rect = this._canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio, 2);
      const canvasX = (e.clientX - rect.left) * dpr;
      const canvasY = (e.clientY - rect.top) * dpr;
      this._audio.triggerDragPulse(canvasX, canvasY, this._canvas.width, this._canvas.height);
    }
  }

  _onPointerUp() {
    this._pointerDown = false;
    if (this._uniformU32 && this._device) {
      this._uniformU32[U.MOUSE_ACTIVE] = 0;
      this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);
    }
  }

  _updateMouseUniform(e) {
    if (!this._uniformF32 || !this._device || !this._canvas) return;

    const rect = this._canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio, 2);
    const canvasX = (e.clientX - rect.left) * dpr;
    const canvasY = (e.clientY - rect.top) * dpr;

    // Map canvas coords to simulation grid coords
    const simX = (canvasX / this._canvas.width) * this._simWidth;
    const simY = (canvasY / this._canvas.height) * this._simHeight;

    this._uniformF32[U.MOUSE_X] = simX;
    this._uniformF32[U.MOUSE_Y] = simY;
    this._uniformU32[U.MOUSE_ACTIVE] = 1;
    this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);
  }

  // -- 3D Scroll Rotation ----------------------------------------------------

  _setupScrollSpacer() {
    if (this._scrollSpacer) return;
    const spacer = document.createElement('div');
    spacer.style.position = 'relative';
    spacer.style.height = `calc(200vh + ${this._height}px)`;
    this._scrollSpacer = spacer;

    if (this.parentNode) {
      this._reparenting = true;
      this.parentNode.insertBefore(spacer, this);
      spacer.appendChild(this);
      this._reparenting = false;
    }

    this.style.position = 'sticky';
    this.style.top = '0';
    this.style.height = `${this._height}px`;
  }

  _teardownScrollSpacer() {
    if (!this._scrollSpacer) return;
    if (this._scrollSpacer.parentNode) {
      this._reparenting = true;
      this._scrollSpacer.parentNode.insertBefore(this, this._scrollSpacer);
      this._scrollSpacer.parentNode.removeChild(this._scrollSpacer);
      this._reparenting = false;
    }
    this.style.position = '';
    this.style.top = '';
    this.style.height = '';
    this._scrollSpacer = null;
  }

  _bindScrollListener() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this._boundScroll, { passive: true });
    }
  }

  _unbindScrollListener() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this._boundScroll);
    }
    if (this._scrollRAFId) {
      cancelAnimationFrame(this._scrollRAFId);
      this._scrollRAFId = null;
    }
    this._scrollRAFPending = false;
  }

  _onScroll() {
    if (this._scrollRAFPending) return;
    this._scrollRAFPending = true;
    this._scrollRAFId = requestAnimationFrame(() => {
      this._scrollRAFPending = false;
      this._updateScrollProgress();
    });
  }

  _updateScrollProgress() {
    if (!this._scrollSpacer) return;
    const spacerRect = this._scrollSpacer.getBoundingClientRect();
    const spacerHeight = this._scrollSpacer.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = spacerHeight - viewportHeight;
    if (scrollableDistance <= 0) {
      this._scrollProgress = 0;
      return;
    }
    const scrolled = -spacerRect.top;
    this._scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    const newAngle = this._scrollProgress * Math.PI * 2;
    if (newAngle !== this._lastScrollAngle) {
      this._lastScrollAngle = newAngle;
      // Apply rotation to enabled axes
      const axes = this.axes;
      this._3dRotation.x = axes.includes('x') ? newAngle : 0;
      this._3dRotation.y = axes.includes('y') ? newAngle : 0;
      this._3dRotation.z = axes.includes('z') ? newAngle : 0;
      this._scrollDirty = true;
    }
  }

  _activateScrollRotation() {
    if (this.mask !== '3d') return;
    if (this.targets) return; // morph targets take priority
    this._setupScrollSpacer();
    this._bindScrollListener();
    // Initial scroll position
    this._updateScrollProgress();
  }

  _deactivateScrollRotation() {
    this._unbindScrollListener();
    this._teardownScrollSpacer();
    this._scrollProgress = 0;
    this._scrollDirty = false;
    this._lastScrollAngle = -1;
  }

  _uploadScrollMask() {
    if (!this._device || !this._foodMaskBuffer || !this._foodBuffer) return;
    const w = this._simWidth;
    const h = this._simHeight;
    const mask = this._render3DToMask(w, h);
    if (!mask) return;
    this._foodMask = mask;
    this._device.queue.writeBuffer(this._foodMaskBuffer, 0, mask);
    // Only reset food buffer when regeneration is on — in devour mode (regen off),
    // consumed food must stay consumed even when the 3D shape rotates
    if (this.regeneration) {
      this._device.queue.writeBuffer(this._foodBuffer, 0, mask);
    }
    this._scrollDirty = false;
  }

  // -- Morph Scroll Binding ---------------------------------------------------

  /**
   * Set up the scroll spacer for morph scroll binding.
   * Height = (N-1) * 100vh + component height, where N = number of morph targets.
   * Component becomes sticky inside the spacer.
   */
  _setupMorphScrollSpacer() {
    if (this._morphScrollSpacer) return;
    if (!this._morphTargets || this._morphTargets.length < 2) return;

    const n = this._morphTargets.length;
    const spacer = document.createElement('div');
    spacer.style.position = 'relative';
    spacer.style.height = `calc(${(n - 1) * 100}vh + ${this._height}px)`;
    this._morphScrollSpacer = spacer;

    if (this.parentNode) {
      this._reparenting = true;
      this.parentNode.insertBefore(spacer, this);
      spacer.appendChild(this);
      this._reparenting = false;
    }

    this.style.position = 'sticky';
    this.style.top = '0';
    this.style.height = `${this._height}px`;
  }

  /**
   * Tear down the morph scroll spacer and restore component to its original position.
   */
  _teardownMorphScrollSpacer() {
    if (!this._morphScrollSpacer) return;
    if (this._morphScrollSpacer.parentNode) {
      this._reparenting = true;
      this._morphScrollSpacer.parentNode.insertBefore(this, this._morphScrollSpacer);
      this._morphScrollSpacer.parentNode.removeChild(this._morphScrollSpacer);
      this._reparenting = false;
    }
    this.style.position = '';
    this.style.top = '';
    this.style.height = '';
    this._morphScrollSpacer = null;
  }

  _bindMorphScrollListener() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this._boundMorphScroll, { passive: true });
    }
  }

  _unbindMorphScrollListener() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this._boundMorphScroll);
    }
    if (this._morphScrollRAFId) {
      cancelAnimationFrame(this._morphScrollRAFId);
      this._morphScrollRAFId = null;
    }
    this._morphScrollRAFPending = false;
  }

  _onMorphScroll() {
    if (this._morphScrollRAFPending) return;
    this._morphScrollRAFPending = true;
    this._morphScrollRAFId = requestAnimationFrame(() => {
      this._morphScrollRAFPending = false;
      this._updateMorphScrollProgress();
    });
  }

  /**
   * Compute morph progress from scroll position and drive the blend.
   * Progress 0 = first target fully active, 1 = last target fully active.
   */
  _updateMorphScrollProgress() {
    if (!this._morphScrollSpacer) return;
    const spacerRect = this._morphScrollSpacer.getBoundingClientRect();
    const spacerHeight = this._morphScrollSpacer.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = spacerHeight - viewportHeight;
    if (scrollableDistance <= 0) {
      this.setMorphProgress(0);
      return;
    }
    const scrolled = -spacerRect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    this.setMorphProgress(progress);
  }

  /**
   * Activate morph scroll binding — creates spacer, binds scroll listener.
   * Only activates when morph targets with >= 2 entries are set.
   */
  _activateMorphScroll() {
    if (this._morphScrollActive) return;
    if (!this._morphScrollEnabled) return;
    if (!this._morphTargets || this._morphTargets.length < 2) return;

    this._setupMorphScrollSpacer();
    this._bindMorphScrollListener();
    this._morphScrollActive = true;

    // Compute initial scroll position
    this._updateMorphScrollProgress();
  }

  /**
   * Deactivate morph scroll binding — unbinds listener, tears down spacer.
   */
  _deactivateMorphScroll() {
    if (!this._morphScrollActive) return;
    this._unbindMorphScrollListener();
    this._teardownMorphScrollSpacer();
    this._morphScrollActive = false;
  }

  /**
   * Update the morph scroll spacer height (e.g. after resize).
   */
  _updateMorphScrollSpacerHeight() {
    if (!this._morphScrollSpacer || !this._morphTargets) return;
    const n = this._morphTargets.length;
    this._morphScrollSpacer.style.height = `calc(${(n - 1) * 100}vh + ${this._height}px)`;
    this.style.height = `${this._height}px`;
  }

  /**
   * Upload the current morph mask (first target or blended) to the GPU.
   * Called after _preGenerateTargetMasks completes, or when morph progress changes.
   *
   * Food buffer write uses per-target regeneration when morph targets are active:
   * - During mid-transition: always writes food buffer (mask is changing)
   * - At rest on a target: uses that target's regeneration setting
   * - Without morph targets: uses component-level this.regeneration
   */
  _uploadMorphMask() {
    if (!this._device || !this._foodMaskBuffer || !this._foodBuffer) return;
    if (!this._morphMasks || this._morphMasks.length === 0) return;

    const mask = this._foodMask;
    if (!mask) return;

    this._device.queue.writeBuffer(this._foodMaskBuffer, 0, mask);

    // Determine whether to write food buffer
    const regens = this._morphTargetRegens;
    if (regens && regens.length > 0) {
      // Morph-aware: use effective regen from _applyMorphRegeneration
      // During mid-transition (localT not at boundaries), always write food buffer
      // so agents see the evolving food distribution. At boundaries, respect
      // the target's regeneration setting.
      const localT = this._morphT;
      const atBoundaryA = localT < 0.001;
      const atBoundaryB = localT > 0.999;
      const segIndex = this._morphIndex;

      if (atBoundaryA) {
        // Resting at target segIndex
        if (regens[segIndex] !== false) {
          this._device.queue.writeBuffer(this._foodBuffer, 0, mask);
        }
      } else if (atBoundaryB) {
        // Resting at target segIndex+1
        if (regens[segIndex + 1] !== false) {
          this._device.queue.writeBuffer(this._foodBuffer, 0, mask);
        }
      } else {
        // Mid-transition: only update foodMask (capacity).
        // The food regen shader will gradually adjust food toward the new
        // capacity. Writing the food buffer here would reset accumulated
        // food every frame, starving agents during scroll.
      }
    } else if (this.regeneration) {
      // Only reset food buffer at morph boundaries (resting on a target),
      // not during mid-transition — the food regen shader handles gradual
      // adaptation via foodMask capacity changes.
      const localT = this._morphT;
      if (localT < 0.001 || localT > 0.999) {
        this._device.queue.writeBuffer(this._foodBuffer, 0, mask);
      }
    }
  }

  /**
   * Apply per-target regeneration during morph.
   * Interpolates the foodRegen GPU uniform based on the regeneration settings
   * of the two targets being blended.
   *
   * - Both targets regen=true: foodRegen = foodRegenRate
   * - Both targets regen=false: foodRegen = 0
   * - Mixed: linearly interpolate between foodRegenRate and 0
   *
   * @param {number} segIndex - Current morph segment index
   * @param {number} localT - Local blend factor 0..1 within the segment
   */
  _applyMorphRegeneration(segIndex, localT) {
    const regens = this._morphTargetRegens;
    if (!regens || !this._uniformF32 || !this._device) return;

    const regenA = regens[segIndex] !== false;
    const regenB = (segIndex + 1 < regens.length) ? regens[segIndex + 1] !== false : regenA;

    // Get the base food regen rate from the panel slider
    const slider = this._panelEl ? this._panelEl.querySelector('[data-param="foodRegenRate"]') : null;
    const baseRate = slider ? parseFloat(slider.value) : DEFAULTS.foodRegenRate;

    let effectiveRate;
    if (regenA && regenB) {
      effectiveRate = baseRate;
    } else if (!regenA && !regenB) {
      effectiveRate = 0;
    } else if (regenA && !regenB) {
      // Transitioning from regen → devour: ramp down
      effectiveRate = baseRate * (1 - localT);
    } else {
      // Transitioning from devour → regen: ramp up
      effectiveRate = baseRate * localT;
    }

    this._uniformF32[U.FOOD_REGEN] = effectiveRate;
    this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);
  }

  /**
   * Blend two food masks via per-pixel linear interpolation.
   * Operates in-place on the pre-allocated _morphBlendedMask buffer to avoid GC pressure.
   * @param {Float32Array} maskA - Source mask
   * @param {Float32Array} maskB - Target mask
   * @param {number} t - Blend factor in [0, 1]. 0 = full A, 1 = full B
   * @returns {Float32Array} The blended mask (_morphBlendedMask buffer)
   */
  _blendMorphMasks(maskA, maskB, t) {
    const len = maskA.length;

    if (!this._morphBlendedMask || this._morphBlendedMask.length !== len) {
      this._morphBlendedMask = new Float32Array(len);
    }

    const out = this._morphBlendedMask;

    // Staggered max blend: one fade is always 1.0, so max(fadeA, fadeB) = 1.
    // This guarantees identity: blend(A, A, t) = A * max(fadeA, fadeB) = A.
    //
    // First half  (t ≤ 0.5): fadeA = 1.0 (held),  fadeB ramps 0 → 1
    // Second half (t > 0.5):  fadeA ramps 1 → 0,   fadeB = 1.0 (held)
    //
    // Shape B appears above 0.5 threshold at t ≈ 0.25.
    // Shape A drops below 0.5 threshold at t ≈ 0.75.
    // Overlap window: t ∈ [0.25, 0.75] — both shapes simultaneously active.
    const fadeA = t <= 0.5 ? 1.0 : Math.max(0, 1 - (t - 0.5) / 0.5);
    const fadeB = t >= 0.5 ? 1.0 : Math.min(1, t / 0.5);

    for (let i = 0; i < len; i++) {
      out[i] = Math.max(maskA[i] * fadeA, maskB[i] * fadeB);
    }

    return out;
  }

  /**
   * Update the active food mask based on overall morph progress.
   * Computes which two masks are active, extracts the local blend factor,
   * blends them, and uploads the result to the GPU.
   * @param {number} progress - Overall morph progress in [0, 1] across all targets
   */
  _updateMorphBlend(progress) {
    const masks = this._morphMasks;
    if (!masks || masks.length === 0) return;

    const n = masks.length;

    // Single mask — no blending needed
    if (n === 1) {
      if (this._lastMorphUploadIndex !== 0 || this._lastMorphUploadT !== 0) {
        this._foodMask = masks[0];
        this._morphIndex = 0;
        this._morphT = 0;
        this._lastMorphUploadIndex = 0;
        this._lastMorphUploadT = 0;
        this._applyMorphRegeneration(0, 0);
        this._uploadMorphMask();
      }
      return;
    }

    // Clamp progress to [0, 1]
    const p = Math.max(0, Math.min(1, progress));

    // Map progress to segment space: progress * (N-1)
    const segment = p * (n - 1);

    // Determine which two masks to blend
    const segIndex = Math.min(Math.floor(segment), n - 2);
    const localT = segment - segIndex;

    // Dirty check — skip if nothing changed meaningfully
    if (segIndex === this._lastMorphUploadIndex &&
        Math.abs(localT - this._lastMorphUploadT) < 0.0005) {
      return;
    }

    // Store morph state
    this._morphIndex = segIndex;
    this._morphT = localT;

    // Determine mask types for 3D-aware blending
    const types = this._morphTargetTypes;
    const is3dA = types && types[segIndex] === '3d';
    const is3dB = types && types[segIndex + 1] === '3d';
    const isCross3D = (is3dA !== is3dB); // One is 3D, other isn't
    const isBoth3D = is3dA && is3dB;

    // Blend or use raw mask at boundaries
    let mask;
    if (localT < 0.001) {
      // At boundary: use original depth-encoded mask (not flattened)
      mask = masks[segIndex];
    } else if (localT > 0.999) {
      mask = masks[segIndex + 1];
    } else if (isBoth3D) {
      // 3D↔3D: re-render with interpolated config if possible, else blend depth masks
      mask = this._render3DInterpolatedMask(segIndex, localT);
      if (!mask) {
        mask = this._blendMorphMasks(masks[segIndex], masks[segIndex + 1], localT);
      }
    } else if (isCross3D && this._morphFlatMasks) {
      // 3D↔2D: use flattened silhouette for the 3D side
      mask = this._blendMorphMasks(
        this._morphFlatMasks[segIndex],
        this._morphFlatMasks[segIndex + 1],
        localT
      );
    } else {
      // 2D↔2D: standard blend
      mask = this._blendMorphMasks(masks[segIndex], masks[segIndex + 1], localT);
    }

    this._foodMask = mask;

    // Per-target regeneration: update foodRegen uniform based on morph position
    this._applyMorphRegeneration(segIndex, localT);

    // Upload to GPU (uses _morphEffectiveRegen set by _applyMorphRegeneration)
    this._uploadMorphMask();

    // Update dirty tracking
    this._lastMorphUploadIndex = segIndex;
    this._lastMorphUploadT = localT;
    this._morphDirty = false;

    // Audio morph sonic crossfade
    if (this._audio) {
      const mTypes = this._morphTargetTypes;
      if (mTypes && localT > 0.001 && localT < 0.999) {
        this._audio.setMorphState(localT, mTypes[segIndex] || 'libre', mTypes[segIndex + 1] || 'libre');
      } else {
        this._audio.endMorph();
      }
    }
  }

  /**
   * Re-render an interpolated 3D mask for a 3D↔3D morph segment.
   * When both targets are 3D, this interpolates their configurations and
   * re-renders the depth mask(s) live instead of blending pre-generated masks.
   *
   * - Same shape: interpolate rotation angles, render once
   * - Different shapes: render both shapes, blend the depth masks
   *
   * @param {number} segIndex - Morph segment index
   * @param {number} localT - Local blend factor 0..1 within the segment
   * @returns {Float32Array|null} Blended depth mask, or null if rendering unavailable
   */
  _render3DInterpolatedMask(segIndex, localT) {
    const configs = this._morph3DConfigs;
    if (!configs || !configs[segIndex] || !configs[segIndex + 1]) return null;
    if (!this._gl && !this._init3DRenderer()) return null;

    const configA = configs[segIndex];
    const configB = configs[segIndex + 1];
    const w = this._simWidth;
    const h = this._simHeight;

    // Save current state
    const savedShape = this.shape;
    const savedAxes = this.axes;
    const savedRotation = { ...this._3dRotation };

    if (configA.shape === configB.shape) {
      // Same shape: render once at the target shape (rotation interpolation
      // will be driven by scroll binding once implemented; for now renders at 0)
      this.setAttribute('shape', configA.shape);
      this.setAttribute('axes', configA.axes || configB.axes || 'y');
      this._3dRotation = { x: 0, y: 0, z: 0 };

      const mask = this._render3DToMask(w, h);

      // Restore
      this.setAttribute('shape', savedShape);
      this.setAttribute('axes', savedAxes);
      this._3dRotation = savedRotation;

      return mask;
    }

    // Different shapes: render both and blend depth masks
    this.setAttribute('shape', configA.shape);
    this.setAttribute('axes', configA.axes || 'y');
    this._3dRotation = { x: 0, y: 0, z: 0 };
    const maskA = this._render3DToMask(w, h);

    this.setAttribute('shape', configB.shape);
    this.setAttribute('axes', configB.axes || 'y');
    this._3dRotation = { x: 0, y: 0, z: 0 };
    const maskB = this._render3DToMask(w, h);

    // Restore
    this.setAttribute('shape', savedShape);
    this.setAttribute('axes', savedAxes);
    this._3dRotation = savedRotation;

    if (!maskA || !maskB) return maskA || maskB || null;
    return this._blendMorphMasks(maskA, maskB, localT);
  }

  /**
   * Set the overall morph progress across all targets.
   * Progress 0 = first target fully active, 1 = last target fully active.
   * Triggers CPU-side mask blending and GPU upload.
   * Can be called from scroll handlers or programmatic morph API.
   * @param {number} progress - Overall progress in [0, 1]
   */
  setMorphProgress(progress) {
    if (!this._morphTargets || !this._morphMasks || this._morphMasks.length < 2) return;
    this._morphDirty = true;
    this._updateMorphBlend(progress);
  }

  /**
   * Programmatic morph API — animate to a target index over a specified duration.
   * Returns a Promise that resolves when the animation completes.
   * Calling morph() again mid-animation cancels the current animation (the old
   * promise resolves with { interrupted: true }) and starts the new one.
   *
   * @param {number} targetIndex - The target index to morph to (0-based)
   * @param {number} durationMs - Animation duration in milliseconds (default 1000)
   * @returns {Promise<{interrupted: boolean}>} Resolves when animation completes or is interrupted
   */
  morph(targetIndex, durationMs = 1000) {
    // Validate preconditions
    if (!this._morphTargets || !this._morphMasks || this._morphMasks.length < 2) {
      return Promise.reject(new Error('No morph targets configured'));
    }

    const numTargets = this._morphTargets.length;
    if (typeof targetIndex !== 'number' || !Number.isFinite(targetIndex) || targetIndex < 0 || targetIndex >= numTargets) {
      return Promise.reject(new Error(`Invalid target index: ${targetIndex}. Must be 0..${numTargets - 1}`));
    }

    if (typeof durationMs !== 'number' || !Number.isFinite(durationMs) || durationMs < 0) {
      return Promise.reject(new Error(`Invalid duration: ${durationMs}. Must be >= 0`));
    }

    // Cancel any in-progress programmatic morph
    this._cancelMorphAnim(true);

    // Compute target progress: targetIndex maps to targetIndex / (numTargets - 1)
    const endProgress = targetIndex / (numTargets - 1);

    // Compute current progress from morph state
    const startProgress = this._getMorphProgress();

    // If duration is 0 or already at target, jump immediately
    if (durationMs === 0 || Math.abs(endProgress - startProgress) < 0.0001) {
      this.setMorphProgress(endProgress);
      return Promise.resolve({ interrupted: false });
    }

    // Set up animation state
    return new Promise((resolve) => {
      this._morphAnimResolve = resolve;
      this._morphAnimStartProgress = startProgress;
      this._morphAnimEndProgress = endProgress;
      this._morphAnimDuration = durationMs;
      this._morphAnimStartTime = null; // Will be set on first frame

      this._morphAnimRAFId = requestAnimationFrame((ts) => this._morphAnimFrame(ts));
    });
  }

  /**
   * Get the current overall morph progress [0, 1] from internal morph state.
   * @returns {number}
   */
  _getMorphProgress() {
    if (!this._morphTargets || this._morphTargets.length < 2) return 0;
    const numTargets = this._morphTargets.length;
    // Each segment spans 1/(numTargets-1) of the total progress
    return (this._morphIndex + this._morphT) / (numTargets - 1);
  }

  /**
   * rAF callback for programmatic morph animation.
   * Uses linear interpolation from start to end progress over duration.
   * @param {number} timestamp - DOMHighResTimeStamp from requestAnimationFrame
   */
  _morphAnimFrame(timestamp) {
    // Set start time on first frame
    if (this._morphAnimStartTime === null) {
      this._morphAnimStartTime = timestamp;
    }

    const elapsed = timestamp - this._morphAnimStartTime;
    const t = Math.min(1, elapsed / this._morphAnimDuration);

    // Linear interpolation between start and end progress
    const progress = this._morphAnimStartProgress + t * (this._morphAnimEndProgress - this._morphAnimStartProgress);

    this.setMorphProgress(progress);

    if (t >= 1) {
      // Animation complete — ensure we land exactly on the target
      this.setMorphProgress(this._morphAnimEndProgress);
      const resolve = this._morphAnimResolve;
      this._clearMorphAnimState();
      if (resolve) resolve({ interrupted: false });
    } else {
      // Continue animation
      this._morphAnimRAFId = requestAnimationFrame((ts) => this._morphAnimFrame(ts));
    }
  }

  /**
   * Cancel any in-progress programmatic morph animation.
   * @param {boolean} interrupted - If true, resolves the pending promise with { interrupted: true }
   */
  _cancelMorphAnim(interrupted = false) {
    if (this._morphAnimRAFId !== null) {
      cancelAnimationFrame(this._morphAnimRAFId);
    }
    const resolve = this._morphAnimResolve;
    this._clearMorphAnimState();
    if (interrupted && resolve) {
      resolve({ interrupted: true });
    }
  }

  /**
   * Clear all programmatic morph animation state.
   */
  _clearMorphAnimState() {
    this._morphAnimRAFId = null;
    this._morphAnimStartTime = null;
    this._morphAnimStartProgress = 0;
    this._morphAnimEndProgress = 0;
    this._morphAnimDuration = 0;
    this._morphAnimResolve = null;
  }

  // -- Ecosystem Pipelines ---------------------------------------------------

  _createEcoAgentUpdatePipeline() {
    const device = this._device;
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'eco-agent-update-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._ecoAgentUpdatePipeline = device.createComputePipeline({
      label: 'eco-agent-update-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      compute: { module: device.createShaderModule({ code: WGSL_AGENT_UPDATE_ECO }), entryPoint: 'main' },
    });
    this._ecoAgentUpdateBindGroupLayout = bindGroupLayout;
  }

  _createEcoDiffusePipeline() {
    const device = this._device;
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'eco-diffuse-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._ecoDiffusePipeline = device.createComputePipeline({
      label: 'eco-diffuse-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      compute: { module: device.createShaderModule({ code: WGSL_DIFFUSE_ECO }), entryPoint: 'main' },
    });
    this._ecoDiffuseBindGroupLayout = bindGroupLayout;
  }

  _createPopCountPipeline() {
    const device = this._device;
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'pop-count-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._popCountPipeline = device.createComputePipeline({
      label: 'pop-count-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      compute: { module: device.createShaderModule({ code: WGSL_POP_COUNT }), entryPoint: 'main' },
    });
    this._popCountBindGroupLayout = bindGroupLayout;

    this._popCountBindGroup = device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: this._agentBuffer } },
        { binding: 2, resource: { buffer: this._aliveBuffer } },
        { binding: 3, resource: { buffer: this._popCountBuffer } },
      ],
    });
  }

  // -- Ecosystem Bind Groups -------------------------------------------------

  _createEcoBindGroups() {
    const device = this._device;

    this._bindGroupSets = [0, 1].map(cur => {
      const nxt = 1 - cur;
      return {
        ecoAgentUpdate: device.createBindGroup({
          layout: this._ecoAgentUpdateBindGroupLayout,
          entries: [
            { binding: 0, resource: { buffer: this._uniformBuffer } },
            { binding: 1, resource: { buffer: this._agentBuffer } },
            { binding: 2, resource: { buffer: this._trailBuffers[cur] } },
            { binding: 3, resource: { buffer: this._foodMaskBuffer } },
            { binding: 4, resource: { buffer: this._foodBuffer } },
            { binding: 5, resource: { buffer: this._aliveBuffer } },
          ],
        }),
        foodRegen: device.createBindGroup({
          layout: this._foodRegenBindGroupLayout,
          entries: [
            { binding: 0, resource: { buffer: this._uniformBuffer } },
            { binding: 1, resource: { buffer: this._foodMaskBuffer } },
            { binding: 2, resource: { buffer: this._foodBuffer } },
          ],
        }),
        ecoDiffuse: device.createBindGroup({
          layout: this._ecoDiffuseBindGroupLayout,
          entries: [
            { binding: 0, resource: { buffer: this._uniformBuffer } },
            { binding: 1, resource: { buffer: this._trailBuffers[cur] } },
            { binding: 2, resource: { buffer: this._trailBuffers[nxt] } },
          ],
        }),
        render: device.createBindGroup({
          layout: this._renderBindGroupLayout,
          entries: [
            { binding: 0, resource: { buffer: this._uniformBuffer } },
            { binding: 1, resource: { buffer: this._trailBuffers[nxt] } },
            { binding: 2, resource: { buffer: this._foodBuffer } },
            { binding: 3, resource: { buffer: this._renderColorsBuffer } },
          ],
        }),
      };
    });
  }

  // -- Complex Ecosystem Pipelines --------------------------------------------

  _createComplexAgentUpdatePipeline() {
    const device = this._device;
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'complex-agent-update-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._ecoAgentUpdatePipeline = device.createComputePipeline({
      label: 'complex-agent-update-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      compute: { module: device.createShaderModule({ code: WGSL_AGENT_UPDATE_COMPLEX }), entryPoint: 'main' },
    });
    this._ecoAgentUpdateBindGroupLayout = bindGroupLayout;
  }

  _createComplexDiffusePipeline() {
    const device = this._device;
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'complex-diffuse-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._ecoDiffusePipeline = device.createComputePipeline({
      label: 'complex-diffuse-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      compute: { module: device.createShaderModule({ code: WGSL_DIFFUSE_COMPLEX }), entryPoint: 'main' },
    });
    this._ecoDiffuseBindGroupLayout = bindGroupLayout;
  }

  _createComplexPopCountPipeline() {
    const device = this._device;
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'complex-pop-count-bgl',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
      ],
    });
    this._popCountPipeline = device.createComputePipeline({
      label: 'complex-pop-count-pipeline',
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      compute: { module: device.createShaderModule({ code: WGSL_POP_COUNT_COMPLEX }), entryPoint: 'main' },
    });
    this._popCountBindGroupLayout = bindGroupLayout;

    this._popCountBindGroup = device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: this._uniformBuffer } },
        { binding: 1, resource: { buffer: this._agentBuffer } },
        { binding: 2, resource: { buffer: this._aliveBuffer } },
        { binding: 3, resource: { buffer: this._popCountBuffer } },
      ],
    });
  }

  // -- Complex Ecosystem Bind Groups ------------------------------------------

  _createComplexBindGroups() {
    // Complex bind groups use the same buffer structure and key names as ecosystem,
    // since _ecoFrame references the same keys. The bind group layouts are already
    // set by the complex pipeline creators above.
    this._createEcoBindGroups();
  }

  // -- Ecosystem Render Pipeline (trail mode) --------------------------------

  _createEcoRenderPipelineForMode(mode) {
    const device = this._device;
    let shaderCode, entries, label;

    switch (mode) {
      case 'trail':
      default:
        label = 'eco-render';
        shaderCode = WGSL_RENDER_ECO;
        entries = [
          { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
          { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
          { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
          { binding: 3, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
        ];
        break;
    }

    const bindGroupLayout = device.createBindGroupLayout({ label: `${label}-bgl`, entries });
    this._renderPipeline = device.createRenderPipeline({
      label: `${label}-pipeline`,
      layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
      vertex: { module: device.createShaderModule({ code: shaderCode }), entryPoint: 'vs' },
      fragment: {
        module: device.createShaderModule({ code: shaderCode }),
        entryPoint: 'fs',
        targets: [{ format: this._format }],
      },
      primitive: { topology: 'triangle-list' },
    });
    this._renderBindGroupLayout = bindGroupLayout;
  }

  // -- Ecosystem Frame Loop --------------------------------------------------

  _scheduleEcoFrame() {
    if (!this._userStarted) return;
    if (this.viewport && !this._viewportVisible) return;
    this._raf = requestAnimationFrame(() => this._ecoFrame());
  }

  _ecoFrame() {
    if (!this._initialized || !this._device) return;

    // Upload updated 3D mask if scroll rotation changed it
    if (this._scrollDirty && this.mask === '3d' && this._gl) {
      this._uploadScrollMask();
    }

    const device = this._device;
    const w = this._simWidth;
    const h = this._simHeight;
    const agentCount = this._uniformU32[U.AGENT_COUNT];
    const steps = this._simSpeed || 1;

    for (let step = 0; step < steps; step++) {
      this._frameCount++;
      this._uniformU32[U.FRAME] = this._frameCount;
      this._uniformF32[U.TIME] = (performance.now() - this._startTime) / 1000;
      device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);

      const cur = this._trailIndex;
      const nxt = 1 - cur;
      const bg = this._bindGroupSets[cur];
      const isLastStep = step === steps - 1;

      const encoder = device.createCommandEncoder();

      // 1. Ecosystem agent update
      const agentPass = encoder.beginComputePass();
      agentPass.setPipeline(this._ecoAgentUpdatePipeline);
      agentPass.setBindGroup(0, bg.ecoAgentUpdate);
      agentPass.dispatchWorkgroups(Math.ceil(agentCount / 256));
      agentPass.end();

      // 2. Food regeneration
      const foodPass = encoder.beginComputePass();
      foodPass.setPipeline(this._foodRegenPipeline);
      foodPass.setBindGroup(0, bg.foodRegen);
      foodPass.dispatchWorkgroups(Math.ceil(w / 16), Math.ceil(h / 16));
      foodPass.end();

      // 3. Ecosystem diffuse (6-channel)
      const diffusePass = encoder.beginComputePass();
      diffusePass.setPipeline(this._ecoDiffusePipeline);
      diffusePass.setBindGroup(0, bg.ecoDiffuse);
      diffusePass.dispatchWorkgroups(Math.ceil(w / 16), Math.ceil(h / 16));
      diffusePass.end();

      // 4. SDF compute (only on last step, only when sdf mode)
      if (isLastStep && this._renderMode === 'sdf') {
        this._runSdfCompute(encoder, this._trailBuffers[nxt]);
      }

      // 4b. RD compute (only on last step, only when rd mode)
      if (isLastStep && this._renderMode === 'rd') {
        this._runRdCompute(encoder, this._trailBuffers[nxt]);
      }

      // 4c. Metaballs blur compute (only on last step, only when metaballs mode)
      if (isLastStep && this._renderMode === 'metaballs') {
        this._runMbCompute(encoder, this._trailBuffers[nxt]);
      }

      // 4d. Trail Lines record compute (every step when lines mode)
      if (this._renderMode === 'lines') {
        this._runLinesCompute(encoder);
      }

      // 5. Render (only on last step)
      if (isLastStep) {
        // Rebuild SDF render bind group with correct result buffer
        if (this._renderMode === 'sdf' && this._sdfBuffers) {
          bg.render = this._device.createBindGroup({
            layout: this._renderBindGroupLayout,
            entries: this._getRenderBindGroupEntries(nxt, true),
          });
        }

        // Rebuild RD render bind group with correct result buffer
        if (this._renderMode === 'rd' && this._rdBuffers) {
          bg.render = this._device.createBindGroup({
            layout: this._renderBindGroupLayout,
            entries: this._getRenderBindGroupEntries(nxt, true),
          });
        }

        // Rebuild Metaballs render bind group with blur buffer
        if (this._renderMode === 'metaballs' && this._mbBuffer) {
          bg.render = this._device.createBindGroup({
            layout: this._renderBindGroupLayout,
            entries: this._getRenderBindGroupEntries(nxt, true),
          });
        }

        // Rebuild Trail Lines render bind group with ring buffer
        if (this._renderMode === 'lines' && this._linesRingBuffer) {
          bg.render = this._device.createBindGroup({
            layout: this._renderBindGroupLayout,
            entries: this._getRenderBindGroupEntries(nxt, true),
          });
        }

        const textureView = this._ctx.getCurrentTexture().createView();
        const renderPass = encoder.beginRenderPass({
          colorAttachments: [{
            view: textureView,
            loadOp: 'clear',
            storeOp: 'store',
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
          }],
        });
        renderPass.setPipeline(this._renderPipeline);
        renderPass.setBindGroup(0, bg.render);
        if (this._renderMode === 'points') {
          renderPass.draw(6, agentCount);
        } else if (this._renderMode === 'lines') {
          renderPass.draw(30, agentCount);
        } else {
          renderPass.draw(3);
        }
        renderPass.end();
      }

      // 6. Population readback every POP_READBACK_INTERVAL frames
      const doReadback = isLastStep && this._popCountBuffer && this._popCountBindGroup
        && (this._frameCount % POP_READBACK_INTERVAL === 0)
        && !this._popReadbackPending;

      if (doReadback) {
        encoder.clearBuffer(this._popCountBuffer);
        const popPass = encoder.beginComputePass();
        popPass.setPipeline(this._popCountPipeline);
        popPass.setBindGroup(0, this._popCountBindGroup);
        popPass.dispatchWorkgroups(Math.ceil(agentCount / 256));
        popPass.end();
        const popBufSize = this.isComplex ? 20 : 16;
        encoder.copyBufferToBuffer(this._popCountBuffer, 0, this._popCountStagingBuffer, 0, popBufSize);
      }

      // 7. Audio agent readback — copy on same encoder before submit
      const doAudioReadback = isLastStep && this._audio && this._audioReactive
        && this._audioStagingBuffer && !this._audioReadbackPending
        && (this._frameCount % AUDIO_READBACK_INTERVAL === 0);

      if (doAudioReadback) {
        const readbackAgents = Math.min(agentCount, AUDIO_READBACK_MAX_AGENTS);
        const readbackBytes = readbackAgents * this._currentStride * 4;
        encoder.copyBufferToBuffer(this._agentBuffer, 0, this._audioStagingBuffer, 0, readbackBytes);
      }

      device.queue.submit([encoder.finish()]);
      this._trailIndex = nxt;

      // Async population readback
      if (doReadback) {
        this._popReadbackPending = true;
        this._popCountStagingBuffer.mapAsync(GPUMapMode.READ).then(() => {
          if (!this._popCountStagingBuffer) {
            this._popReadbackPending = false;
            return;
          }
          const data = new Uint32Array(this._popCountStagingBuffer.getMappedRange());
          if (this.isComplex) {
            this._popCounts = {
              herbivore: data[0],
              predator: data[1],
              scavenger: data[2],
              symbiont: data[3],
              total: data[4],
            };
          } else {
            this._popCounts = {
              alpha: data[0],
              beta: data[1],
              gamma: data[2],
              total: data[3],
            };
          }
          this._popCountStagingBuffer.unmap();
          this._popReadbackPending = false;
          this._audio?.setPopulationData(this._popCounts);
          this._evaluateEvent();
        }).catch(() => {
          this._popReadbackPending = false;
        });
      }

      // Async audio agent readback
      if (doAudioReadback) {
        this._audioReadbackPending = true;
        const readbackAgents = Math.min(agentCount, AUDIO_READBACK_MAX_AGENTS);
        const stride = this._currentStride;
        const simW = w;
        const simH = h;
        this._audioStagingBuffer.mapAsync(GPUMapMode.READ).then(() => {
          if (!this._audioStagingBuffer || !this._audio) {
            this._audioReadbackPending = false;
            return;
          }
          const mapped = new Float32Array(this._audioStagingBuffer.getMappedRange());
          const copy = new Float32Array(mapped);
          this._audioStagingBuffer.unmap();
          this._audioReadbackPending = false;
          this._audio?.setSimulationState({
            agentData: copy,
            agentCount: readbackAgents,
            stride: stride,
            simWidth: simW,
            simHeight: simH,
          });
        }).catch(() => {
          this._audioReadbackPending = false;
        });
      }

      // Tick active environmental event
      if (this._eventType !== EVENT_NONE) {
        this._eventFramesLeft--;
        if (this._eventFramesLeft <= 0) {
          this._endEvent();
        }
      }
    }

    // Audio update — runs every frame (internal throttling handles density sampling rate)
    this._audio?.update(this._frameCount);

    this._scheduleEcoFrame();
  }

  // -- Environmental Events --------------------------------------------------

  _evaluateEvent() {
    if (!this._eventsEnabled) return;
    if (this._eventType !== EVENT_NONE) return;
    if (this._frameCount < EVENT_WARMUP_FRAMES) return;
    if (Math.random() >= EVENT_PROBABILITY) return;

    const type = Math.floor(Math.random() * 4) + 1;
    this._startEvent(type);
  }

  _startEvent(type) {
    this._eventType = type;
    this._eventFramesLeft = EVENT_DURATION;

    const f = this._uniformF32;
    const u = this._uniformU32;

    switch (type) {
      case EVENT_BLOOM:
        this._eventBaseFoodRegen = f[U.FOOD_REGEN];
        f[U.FOOD_REGEN] = this._eventBaseFoodRegen * 2.0;
        break;
      case EVENT_DROUGHT:
        this._eventBaseFoodRegen = f[U.FOOD_REGEN];
        f[U.FOOD_REGEN] = this._eventBaseFoodRegen * 0.3;
        break;
      case EVENT_PLAGUE: {
        const speciesKeys = this.isComplex
          ? COMPLEX_SPECIES
          : ['alpha', 'beta', 'gamma'];
        const counts = speciesKeys.map(k => this._popCounts[k] || 0);
        let dominant = 0;
        for (let i = 1; i < counts.length; i++) {
          if (counts[i] > counts[dominant]) dominant = i;
        }
        f[U.EVENT_DEATH_MULT] = 2.5;
        u[U.EVENT_PLAGUE_SPECIES] = dominant;
        break;
      }
      case EVENT_CATASTROPHE:
        f[U.EVENT_DEATH_MULT] = 5.0;
        u[U.EVENT_PLAGUE_SPECIES] = 0xFFFFFFFF;
        break;
    }

    if (this._device && this._uniformBuffer) {
      this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);
    }

    // Notify audio engine of environmental event start
    this._audio?.startEvent(AUDIO_EVENT_MAP[type]);
  }

  _endEvent() {
    const type = this._eventType;
    const f = this._uniformF32;
    const u = this._uniformU32;

    switch (type) {
      case EVENT_BLOOM:
      case EVENT_DROUGHT:
        f[U.FOOD_REGEN] = this._eventBaseFoodRegen;
        break;
      case EVENT_PLAGUE:
      case EVENT_CATASTROPHE:
        f[U.EVENT_DEATH_MULT] = 1.0;
        u[U.EVENT_PLAGUE_SPECIES] = 0;
        break;
    }

    this._eventType = EVENT_NONE;
    this._eventFramesLeft = 0;
    this._eventBaseFoodRegen = 0;

    if (this._device && this._uniformBuffer) {
      this._device.queue.writeBuffer(this._uniformBuffer, 0, this._uniformData);
    }

    // Notify audio engine of environmental event end
    this._audio?.endEvent();
  }

  // -- Keyboard --------------------------------------------------------------

  _onKeydown(e) {
    if (e.key === 'Escape') {
      this._togglePanel();
    }
  }
}

// -- Registration ------------------------------------------------------------

customElements.define('physarum-sim', Physarum);
