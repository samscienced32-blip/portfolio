import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================================
// CONFIG
// ============================================================
const ATLAS_OF = {
  Floor: 'Room', Wall_Left: 'Walls', Wall_Right: 'Walls', Window_Frame: 'Room', Power_Cord: 'Walls',
  Desk_Main: 'Furniture', Desk_Side: 'Furniture', Shelf_Wall: 'Furniture',
  Sideboard: 'Furniture', Sideboard_Doors: 'Furniture', Chair: 'Furniture',
  Laptop_Base: 'Props1', Laptop_Screen: 'Props1', Laptop_Keys: 'Props1',
  Laptop_Trackpad: 'Props1', Keyboard: 'Props1', Mouse: 'Props1',
  Mousepad: 'Props1', Lamp_Pad: 'Props1', Lamp: 'Props1', Pen: 'Props1', Coffee_Cup: 'Props1',
  Trophy: 'Props2', Books_Shelf: 'Props2', Books_Sideboard: 'Props2',
  Books_Floor: 'Props2', Rocket: 'Props2', Plane: 'Props2', Box: 'Props2', Tray_Floor: 'Tray',
  Chair_Top: 'Furniture',
  Roof_Cap: 'Extra', Grass_Base: 'Extra', Grass_Blades: 'Extra',
  Welcome_Mat: 'Extra', String_Lights: 'Extra', String_Bulbs: 'Extra', Bulb_Stems: 'Extra',
  Curtains: 'Curtain', Shelves_Social: 'Extra',
  Tile_GitHub: 'Tiles', Tile_LinkedIn: 'Tiles',
};

// hotspot groups → panel content (text intentionally blank for now)
const HOTSPOTS = {
  laptop: {
    meshes: ['Laptop_Base','Laptop_Screen','Laptop_Keys','Laptop_Trackpad','Keyboard'],
    title: 'My Work', tip: 'My Work \u2014 experience & projects',
    body: `
      <h2 class="psub">Experience</h2>
      <div class="timeline center">
        <div class="tl-item"><div class="tl-dot"></div><div class="tl-card">
          <span class="tl-date">Apr 2026 \u2013 Present</span>
          <h3>Software Engineer (Probation)</h3>
          <p>CRISS Robotics \u00b7 Navigation team \u00b7 Pilani, on-site.</p></div></div>
        <div class="tl-item"><div class="tl-dot"></div><div class="tl-card">
          <span class="tl-date">Jan 2026</span>
          <h3>Creative Writer & Fundraising Volunteer</h3>
          <p>InAmigos Foundation \u2014 wrote and published blogs for fundraising drives.</p></div></div>
        <div class="tl-item"><div class="tl-dot"></div><div class="tl-card">
          <span class="tl-date">Jul 2022 \u2013 Aug 2025</span>
          <h3>Student Mentor & Tutor</h3>
          <p>Schoolhouse.world \u2014 3 years of free peer tutoring, SAT prep and mentoring, remote.</p></div></div>
        <div class="tl-item"><div class="tl-dot"></div><div class="tl-card">
          <span class="tl-date">Mar 2022 \u2013 Jan 2024</span>
          <h3>Founder & President, Robotics Club</h3>
          <p>Loyola School Jamshedpur \u2014 mentored 100+ students, led 4 teams to state & national stages.</p></div></div>
        <div class="tl-item"><div class="tl-dot"></div><div class="tl-card">
          <span class="tl-date">Jun 2022 \u2013 Jun 2023</span>
          <h3>DexSchool \u00b7 Class of '23</h3>
          <p>The Dexterity Global Group \u2014 leadership & entrepreneurship fellowship (<2% acceptance).</p></div></div>
      </div>
      <h2 class="psub">Projects</h2>
      <div class="pcard"><img src="assets/photos/poster.webp" alt="ISEF project poster">
        <h3>Gradient Sensor for PET Recycling</h3>
        <p>A sensor system that maps volumetric irregularities in PET-bottle strips and corrects pull-rate
        live during pultrusion \u2014 turning landfill plastic into consistent 3D-printer filament.
        IRIS National Fair 2024 winner \u2192 ISEF 2024, Los Angeles.</p></div>
      <div class="pcard"><img src="assets/photos/pultrusion-rig.webp" alt="Pultrusion machine">
        <h3>PET Pultrusion Machine</h3>
        <p>The full recycling rig behind the research \u2014 custom cutter, heated nozzle, geared puller and
        spooler, driven by an Arduino reading the gradient sensor in real time.</p></div>
      <div class="pcard"><img src="assets/photos/printer.webp" alt="DIY 3D printer">
        <h3>DIY 3D Printer <span class="tl-date">May \u2013 Jul 2022</span></h3>
        <p>Designed and constructed from scratch at home in my 11th-grade summer \u2014 AutoCAD design,
        aluminium extrusion frame, custom electronics.</p></div>
      <div class="pcard"><img src="assets/photos/cnc.webp" alt="CNC pen plotter">
        <h3>CNC Pen Plotter</h3>
        <p>A two-axis plotter built from scavenged DVD drives, an SG90 servo and a CNC shield \u2014
        my crash course in motion control and G-code.</p></div>
      <div class="pcard noimg">
        <h3>LeNet-5, From the Paper <span class="tl-date">Dec 2025 \u2013 Jan 2026</span></h3>
        <p>Reimplemented the 1998 LeNet-5 CNN in PyTorch, reaching test accuracy on MNIST nearly equal
        to the original \u2014 <a href="https://github.com/samscienced32-blip/Replication-of-LeNet-5-on-MNIST-using-PyTorch"
        target="_blank">code on GitHub</a>.</p></div>
      <p class="phint">Full repos on my GitHub \u2014 click the cat tile on the wall shelf.</p>`
  },
  trophy: {
    meshes: ['Trophy'],
    title: 'Achievements', tip: 'Achievements & awards',
    body: `
      <div class="pcard"><img src="assets/photos/isef-wall.webp" alt="Sagar pointing at his name at ISEF 2024">
        <h3>ISEF 2024 \u00b7 Los Angeles</h3>
        <p>Selected to represent India at the Regeneron International Science & Engineering Fair 2024
        for my PET-recycling sensor research \u2014 via a top-20 finish at the IRIS National Fair.</p></div>
      <div class="pcard"><img src="assets/photos/isef-selfie.webp" alt="At the ISEF 2024 venue">
        <h3>Team India at ISEF</h3>
        <p>On the grand stage in LA \u2014 the little rocket on my sideboard travelled further than I expected.</p></div>
      <div class="pcard"><img src="assets/photos/jhsic.webp" alt="JH-SIC 2023 award ceremony">
        <h3>Winner \u00b7 JH-SIC 2023, IIT (ISM) Dhanbad</h3>
        <p>Medical VTOL delivery platform for last-mile emergencies \u2014 won the Jharkhand School
        Innovation Challenge and a \u20b950,000 development grant.</p></div>
      <div class="pcard"><img src="assets/photos/debate.webp" alt="Debate win at India Environmental Meet 2023">
        <h3>Winner \u00b7 India Environmental Meet 2023 Debate</h3>
        <p>First place at the TATA Group\u2019s environmental debate; also a state finalist at the
        Frank Anthony Memorial National Debate 2023.</p></div>
      <div class="pcard noimg">
        <h3>National Creativity Olympiad 2022 \u00b7 First Prize</h3>
        <p>Waste-tracking & prediction algorithm, later sponsored by TATA for real-world use in Jamshedpur.</p></div>
      <div class="pcard noimg">
        <h3>Young Creators League \u00b7 Top 30 National</h3>
        <p>Industrial waste-fluid fuel-cell prototype for energy recovery \u2014 Plaksha University YCL and
        IIT Kharagpur Young Innovators Program, 2023.</p></div>
      <div class="pcard noimg">
        <h3>Exams</h3>
        <p>JEE Mains 2025: rank 39,998 of 1.4 million \u00b7 BITSAT 2025: CS at BITS Pilani (<1% acceptance)
        \u00b7 SAT: 1500/1600.</p></div>`
  },
  books: {
    meshes: ['Books_Shelf','Books_Sideboard','Books_Floor'],
    title: 'Education', tip: 'Education & milestones',
    body: `
      <div class="timeline">
        <div class="tl-item"><div class="tl-dot"></div><div class="tl-card">
          <span class="tl-date">2025 \u2013 Present</span>
          <h3>BITS Pilani, Pilani Campus</h3>
          <p>B.E. Computer Science \u2014 freshman year, building toward Robotics & AI.</p></div></div>
        <div class="tl-item"><div class="tl-dot"></div><div class="tl-card">
          <span class="tl-date">2025</span>
          <h3>University of Wisconsin\u2013Madison</h3>
          <p>Accepted into the undergraduate engineering program (Electrical & Communications) \u2014
          chose BITS Pilani instead.</p></div></div>
        <div class="tl-item"><div class="tl-dot"></div><div class="tl-card">
          <span class="tl-date">2023</span>
          <h3>DexSchool \u00b7 Class of 2023</h3>
          <p>100-hour residential leadership & entrepreneurship fellowship (<2% acceptance),
          mentored by Harvard-affiliated faculty.</p></div></div>
        <div class="tl-item"><div class="tl-dot"></div><div class="tl-card">
          <span class="tl-date">2011 \u2013 2024</span>
          <h3>Loyola School, Jamshedpur</h3>
          <p>ISC (PCM + CS) \u2014 92.5%. Founder & President of the Robotics Club \u2014 mentored 100+
          students, led 4 teams to state and national stages. Vice-President, Debate Club.</p></div></div>
      </div>`
  },
  rocket: {
    meshes: ['Rocket','Plane'],
    title: 'Builds and Hobbies', tip: 'Builds & Hobbies',
    body: `
      <div class="pcard"><img src="assets/photos/rocket1.webp" alt="Scratch-built model rocket">
        <h3>Model Rockets <span class="tl-date">2021 \u2013 2022</span></h3>
        <p>Scratch-built airframes \u2014 rolled body tubes, shaped nose cones, foam fins and a lot of sanding.
        Each launch taught more than the last.</p></div>
      <div class="pcard"><img src="assets/photos/rocket2.webp" alt="Model rocket iterations">
        <h3>Custom Solid Rocket Motor <span class="tl-date">Sep \u2013 Oct 2021</span></h3>
        <p>Designed and static-fired my own solid rocket motors to measure impulse \u2014 propulsion,
        the hard (and loud) way.</p></div>
      <div class="pcard"><img src="assets/photos/plane-white.webp" alt="Foam-board RC plane">
        <h3>Surveillance-Mapping UAV <span class="tl-date">Mar \u2013 May 2022</span></h3>
        <p>Custom foam-board UAV with a camera payload for terrain mapping \u2014 built in 10th grade
        during the lockdown.</p></div>
      <div class="pcard"><img src="assets/photos/plane-orange.webp" alt="Orange RC trainer plane">
        <h3>RC Trainer</h3>
        <p>The high-vis successor \u2014 faster to spot, faster to crash, faster to fix.</p></div>`
  },
  box: {
    meshes: ['Box'],
    title: 'About Me', tip: 'About me',
    body: `
      <p>I\u2019m <strong>Sagar Kumar</strong> \u2014 a maker at heart, currently studying Computer
      Science at BITS Pilani. I grew up in Jamshedpur as the kind of kid who couldn\u2019t leave anything
      intact: toys, remote controls and old electronics all got taken apart just to see what made them
      tick. That curiosity never really left \u2014 it just grew up into building rockets, drones, printers
      and robots.</p>
      <p>What drives me is the urge to make things <em>real</em>. There\u2019s a particular kind of joy in
      watching an idea leave my head and become something I can actually hold \u2014 even when, especially
      when, the first ten attempts fall apart. Tinkering has taught me patience, and that the most
      interesting part of any project is usually the part that goes wrong.</p>
      <p>Away from the workbench, I\u2019m happiest with a guitar in my hands or a philosophy book open in
      front of me. I\u2019m drawn to questions that don\u2019t have clean answers and enjoy arguing them out
      \u2014 which is how I fell for debate in the first place. I also spend a lot of my time teaching and
      mentoring; explaining something to someone else is still my favourite way to understand it properly.</p>
      <p>More than anything, I care about building things that <em>matter</em> \u2014 work that leaves the
      world a little better-engineered than I found it, especially when it comes to the environment.
      I\u2019m curious, stubborn in the right ways, and genuinely just getting started.</p>`
  },
  publications: {
    meshes: ['Bulletin_Board'],
    title: 'Research', tip: 'Research & publications',
    body: `
      <div class="pcard"><img src="assets/photos/poster.webp" alt="ISEF research poster">
        <h3>Gradient Sensor for PET Recycling <span class="tl-date">IRIS 2024 → ISEF 2024</span></h3>
        <p>My headline research: a gradient sensor that maps volumetric irregularities in PET-bottle strips
        and corrects the pull-rate live during pultrusion, turning inconsistent landfill plastic into uniform
        3D-printer filament. Top-20 at the IRIS National Fair, selected to represent India at the Regeneron
        International Science & Engineering Fair 2024 in Los Angeles.</p></div>
      <div class="pcard noimg">
        <h3>Medical VTOL Delivery Platform <span class="tl-date">JH-SIC 2023</span></h3>
        <p>A last-mile emergency drone-delivery concept for medical supplies — winner of the Jharkhand
        School Innovation Challenge at IIT (ISM) Dhanbad and a ₹50,000 development grant.</p></div>
      <div class="pcard noimg">
        <h3>Waste-Tracking & Prediction Algorithm <span class="tl-date">2022</span></h3>
        <p>A predictive model for municipal waste flows, first-prize at the National Creativity Olympiad 2022
        and later sponsored by TATA for real-world trials in Jamshedpur.</p></div>
      <p class="phint">More detail lives under the laptop — My Work.</p>`
  },
  github:   { meshes: ['Tile_GitHub'],   tip: 'Visit my GitHub',   url: 'https://github.com/samscienced32-blip' },
  linkedin: { meshes: ['Tile_LinkedIn'], tip: 'Visit my LinkedIn', url: 'https://www.linkedin.com/in/sagar-kumar36' },
};

// ============================================================
// RENDERER / SCENE / CAMERA
// ============================================================
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping; // baked — show as-is

const scene = new THREE.Scene();
const dayBg = new THREE.Color(0xb9b2a6), nightBg = new THREE.Color(0x282a2f);
scene.background = dayBg.clone();

const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.1, 60);
camera.position.set(5.6, 3.4, -5.6); // open corner: blender (+x,+y) -> three (+x,-z)

const controls = new OrbitControls(camera, canvas);
controls.target.set(0.9, 0.85, -0.9);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 2.2;
controls.maxDistance = 9;
controls.minPolarAngle = 0.45;
controls.maxPolarAngle = 1.35;
controls.minAzimuthAngle = 1.75;     // clamped to the open-corner quadrant
controls.maxAzimuthAngle = 2.95;
controls.enablePan = false;

// ============================================================
// LOADING (textures + glb)
// ============================================================
const manager = new THREE.LoadingManager();
const fill = document.getElementById('loader-fill');
manager.onProgress = (u, l, t) => { fill.style.width = `${(l / t) * 100}%`; };
manager.onLoad = () => {
  document.getElementById('loading').classList.add('done');
  introAnim();
};

const texLoader = new THREE.TextureLoader(manager);
function bakeTex(path) {
  const t = texLoader.load(path);
  t.flipY = false;            // GLTF uv convention
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const atlases = {};
for (const k of ['Room','Furniture','Props1','Props2','Extra','Tiles','Board','Curtain','Walls','Tray']) {
  atlases[k] = { day: bakeTex(`assets/Atlas_${k}.webp?v=29`), night: bakeTex(`assets/Atlas_${k}_Night.webp?v=29`) };
}

// blend material: day↔night crossfade + hover glow
function makeBakedMaterial(atlas) {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      mapDay:   { value: atlas.day },
      mapNight: { value: atlas.night },
      uMix:     { value: 0 },   // 0 day → 1 night
      uGlow:    { value: 0 },
      uBright:  { value: 1.0 },
      uBrightN: { value: 1.0 },  // night brightness multiplier (relative to uBright)
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() {
        vUv = uv;             /* BakeUV exported as the primary UV set */
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform sampler2D mapDay, mapNight;
      uniform float uMix, uGlow, uBright, uBrightN;
      varying vec2 vUv;
      void main() {
        vec3 d = texture2D(mapDay, vUv).rgb;
        vec3 n = texture2D(mapNight, vUv).rgb;
        vec3 c = mix(d, n, uMix);
        c *= mix(uBright, uBright * uBrightN, uMix);
        c += uGlow * vec3(1.0, 0.9, 0.7) * 0.35;   /* warm hover glow */
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  return mat;
}

const sharedMats = {};   // one per atlas
const allMats = [];      // every material incl. hotspot clones (for uMix tween)
for (const k of Object.keys(atlases)) {
  sharedMats[k] = makeBakedMaterial(atlases[k]);
  allMats.push(sharedMats[k]);
}

// ============================================================
// MODEL
// ============================================================

// grass: baked color + inertia sway (bends with fast camera moves)
let grassMat = null;
function makeGrassMaterial(atlas) {
  return new THREE.ShaderMaterial({
    uniforms: {
      mapDay:   { value: atlas.day },
      mapNight: { value: atlas.night },
      uMix:     { value: 0 },
      uGlow:    { value: 0 },
      uBright:  { value: 1.0 },
      uSway:    { value: new THREE.Vector2(0, 0) },
      uTime:    { value: 0 },
    },
    vertexShader: /* glsl */`
      uniform vec2 uSway;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        /* bend weight: 0 at pad level, 1 at blade tips (~16cm tall) */
        float w = clamp(p.y / 0.16, 0.0, 1.0);
        w = w * w;
        /* idle breeze + camera-inertia sway */
        float breeze = sin(uTime * 2.2 + p.x * 7.0 + p.z * 5.0) * 0.006;
        p.x += (uSway.x + breeze) * w;
        p.z += (uSway.y + breeze * 0.7) * w;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform sampler2D mapDay, mapNight;
      uniform float uMix, uGlow, uBright;
      varying vec2 vUv;
      void main() {
        vec3 c = mix(texture2D(mapDay, vUv).rgb, texture2D(mapNight, vUv).rgb, uMix);
        c *= uBright;
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
}

// string-light bulbs: clear glass by day, clean warm glow at night
function makeBulbMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uMix: { value: 0 } },
    transparent: true, depthWrite: false,
    vertexShader: /* glsl */`
      varying vec3 vNormalW; varying vec3 vViewW;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vViewW = normalize(cameraPosition - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: /* glsl */`
      uniform float uMix; varying vec3 vNormalW; varying vec3 vViewW;
      void main() {
        float fres = pow(1.0 - max(dot(normalize(vNormalW), normalize(vViewW)), 0.0), 2.0);
        vec3 glass = vec3(0.86, 0.89, 0.93);          // clean clear glass (day)
        vec3 lit   = vec3(1.0, 0.9, 0.66) * 1.6;       // clean warm glow (night, eased down)
        vec3 c = mix(glass + fres * 0.25, lit, uMix);
        float a = mix(0.30 + fres * 0.45, 1.0, uMix);  // see-through by day, solid glow at night
        gl_FragColor = vec4(c, a);
      }`,
  });
}

const meshByName = {};
const hotspotByMesh = {};  // mesh name → hotspot key
for (const [key, h] of Object.entries(HOTSPOTS))
  for (const m of h.meshes) hotspotByMesh[m] = key;

new GLTFLoader(manager).load('assets/room.glb?v=29', (gltf) => {
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    meshByName[o.name] = o;
    const atlasKey = ATLAS_OF[o.name];
    if (o.name === 'Window_Glass') {
      o.material = new THREE.MeshBasicMaterial({ color: 0xcfe4ff, transparent: true, opacity: 0.22 });
      return;
    }
    if (!atlasKey) return;
    if (o.name === 'Grass_Blades') {
      grassMat = makeGrassMaterial(atlases.Extra);
      grassMat.uniforms.uBright.value = 1.22;   // slightly brighter ground
      o.material = grassMat; allMats.push(grassMat);
      return;
    }
    if (o.name === 'Grass_Base') {
      const m = makeBakedMaterial(atlases.Extra);
      m.uniforms.uBright.value = 1.22;           // slightly brighter ground
      o.material = m; allMats.push(m);
      return;
    }
    if (o.name === 'Floor') {
      const m = makeBakedMaterial(atlases.Room);
      m.uniforms.uBright.value = 1.05;           // day: 30% below the 1.5 baseline
      m.uniforms.uBrightN.value = 1.857;         // night: 1.05 * 1.857 ≈ 1.95 (30% above baseline)
      o.material = m; allMats.push(m);
      return;
    }
    if (o.name === 'String_Bulbs') {
      const m = makeBulbMaterial();              // clear glass by day, warm glow at night
      o.material = m; allMats.push(m);
      return;
    }
    if (hotspotByMesh[o.name]) {
      // own material instance so it can glow independently
      const m = makeBakedMaterial(atlases[atlasKey]);
      o.material = m; allMats.push(m);
    } else {
      o.material = sharedMats[atlasKey];
    }
  });
  scene.add(gltf.scene);
});

// bulletin board: separate GLB with its own baked atlas (added after main room)
new GLTFLoader(manager).load('assets/board.glb?v=7', (gltf) => {
  const m = makeBakedMaterial(atlases.Board);   // own instance so it can glow
  allMats.push(m);
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    o.name = 'Bulletin_Board';
    o.material = m;
    meshByName['Bulletin_Board'] = o;
  });
  hotspotByMesh['Bulletin_Board'] = 'publications';
  scene.add(gltf.scene);
});

// ============================================================
// FIREFLIES — subtle drifting glow over the grass, night only
// ============================================================
const flyTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  rg.addColorStop(0, 'rgba(255,244,182,1)');
  rg.addColorStop(0.35, 'rgba(255,224,130,0.5)');
  rg.addColorStop(1, 'rgba(255,214,110,0)');
  g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();
const FLY_N = 22;
const flyBase = [];
const flyPos = new Float32Array(FLY_N * 3);
for (let i = 0; i < FLY_N; i++) {
  const a = -2.3 + Math.random() * 3.1;   // bias to the open-front grass arc
  const r = 2.0 + Math.random() * 1.2;     // tighter band hugging the grass
  flyBase.push({
    x: 1.2 + Math.cos(a) * r, z: -1.2 + Math.sin(a) * r,
    y: 0.08 + Math.random() * 0.42,
    fx: 0.20 + Math.random() * 0.45, fz: 0.18 + Math.random() * 0.40,
    ph: Math.random() * 6.283, amp: 0.20 + Math.random() * 0.34,
    tw: 0.8 + Math.random() * 1.6, tph: Math.random() * 6.283,
  });
}
const flyGeo = new THREE.BufferGeometry();
flyGeo.setAttribute('position', new THREE.BufferAttribute(flyPos, 3));
const flyMat = new THREE.PointsMaterial({
  map: flyTex, color: 0xffe79a, size: 0.1, transparent: true, opacity: 0,
  blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
});
const fireflies = new THREE.Points(flyGeo, flyMat);
fireflies.frustumCulled = false;
scene.add(fireflies);

// ============================================================
// INTERACTION: hover glow + click panel
// ============================================================
const ray = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hovered = null;          // hotspot key
const glowTargets = {};      // hotspot key → 0..1 target
for (const k of Object.keys(HOTSPOTS)) glowTargets[k] = 0;

function pick(e) {
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  ray.setFromCamera(pointer, camera);
  const meshes = Object.keys(hotspotByMesh).map(n => meshByName[n]).filter(Boolean);
  const hit = ray.intersectObjects(meshes, true)[0];
  return hit ? hotspotByMesh[hit.object.name] : null;
}

// cursor tooltip
const tip = document.createElement('div');
tip.id = 'tooltip';
document.body.appendChild(tip);

addEventListener('pointermove', (e) => {
  const k = pick(e);
  if (k !== hovered) {
    if (hovered) glowTargets[hovered] = 0;
    hovered = k;
    if (k) glowTargets[k] = 1;
    canvas.style.cursor = k ? 'pointer' : 'grab';
    if (k) { tip.textContent = HOTSPOTS[k].tip; tip.classList.add('show'); }
    else tip.classList.remove('show');
  }
  if (hovered) {
    tip.style.left = (e.clientX + 16) + 'px';
    tip.style.top  = (e.clientY - 34) + 'px';
  }
});

const panel = document.getElementById('panel');
addEventListener('click', (e) => {
  if (e.target.closest('#panel') || e.target.closest('#daynight') || e.target.closest('#lightbox')) return;
  const k = pick(e);
  if (k && HOTSPOTS[k].url) { window.open(HOTSPOTS[k].url, '_blank'); return; }
  if (k) {
    document.getElementById('panel-title').textContent = HOTSPOTS[k].title;
    document.getElementById('panel-body').innerHTML = HOTSPOTS[k].body || '<p><em>(content coming soon)</em></p>';
    panel.classList.add('open');
  } else {
    panel.classList.remove('open');
  }
});
document.getElementById('panel-close').addEventListener('click', () => panel.classList.remove('open'));

// ---- click-to-enlarge lightbox for panel cards ----
const lightbox = document.createElement('div'); lightbox.id = 'lightbox';
const lbCard = document.createElement('div'); lbCard.className = 'lb-card';
lightbox.appendChild(lbCard); document.body.appendChild(lightbox);
document.getElementById('panel-body').addEventListener('click', (e) => {
  if (e.target.tagName === 'A') return;             // let links work normally
  const card = e.target.closest('.pcard, .tl-card');
  if (!card) return;
  const img = card.querySelector('img');
  const clone = card.cloneNode(true);
  const ci = clone.querySelector('img'); if (ci) ci.remove();
  lbCard.innerHTML = '';
  if (img) {
    const big = document.createElement('img');
    big.src = img.getAttribute('src'); big.alt = img.alt || '';
    lbCard.appendChild(big);
  }
  const txt = document.createElement('div'); txt.className = 'lb-text';
  txt.innerHTML = clone.innerHTML;
  lbCard.appendChild(txt);
  lbCard.scrollTop = 0;
  lightbox.classList.add('open');
});
lightbox.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') return;             // allow link clicks inside
  lightbox.classList.remove('open');
});

// ============================================================
// DAY / NIGHT TOGGLE
// ============================================================
let night = false;
let mixTween = null;                 // { from, to, t, dur }
let mixValue = 0;                    // current 0..1
function easeInOutCubic(x) { return x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3) / 2; }
const sunIcon = document.getElementById('icon-sun');
const moonIcon = document.getElementById('icon-moon');
document.getElementById('daynight').addEventListener('click', () => {
  night = !night;
  mixTween = { from: mixValue, to: night ? 1 : 0, t: 0, dur: 1.4 };
  document.body.classList.toggle('night', night);
  sunIcon.style.display = night ? 'none' : 'block';
  moonIcon.style.display = night ? 'block' : 'none';
});

// ============================================================
// INTRO ANIMATION
// ============================================================
let intro = null;
function introAnim() {
  const from = new THREE.Vector3(8.5, 5.6, -8.5);
  const to = camera.position.clone();
  camera.position.copy(from);
  intro = { t: 0, from, to };
}

// ============================================================
// LOOP
// ============================================================
const clock = new THREE.Clock();
const prevCamPos = new THREE.Vector3();
prevCamPos.copy(camera.position);
const camVel = new THREE.Vector3();
const swaySpring = new THREE.Vector2();
const swayVel = new THREE.Vector2();
function tick() {
  const dt = clock.getDelta();

  if (intro) {
    intro.t = Math.min(1, intro.t + dt * 0.55);
    const e = 1 - Math.pow(1 - intro.t, 3);
    camera.position.lerpVectors(intro.from, intro.to, e);
    if (intro.t >= 1) intro = null;
  }

  // day/night: timed, eased crossfade (apple-smooth)
  if (mixTween) {
    mixTween.t = Math.min(1, mixTween.t + dt / mixTween.dur);
    mixValue = mixTween.from + (mixTween.to - mixTween.from) * easeInOutCubic(mixTween.t);
    if (mixTween.t >= 1) mixTween = null;
  }
  for (const m of allMats) m.uniforms.uMix.value = mixValue;
  scene.background.lerpColors(dayBg, nightBg, mixValue);

  // tween hover glows (only hotspot meshes own their material)
  for (const [k, h] of Object.entries(HOTSPOTS)) {
    for (const name of h.meshes) {
      const mesh = meshByName[name];
      if (!mesh || !mesh.material.uniforms || !mesh.material.uniforms.uGlow) continue;
      const u = mesh.material.uniforms.uGlow;
      u.value += (glowTargets[k] - u.value) * Math.min(1, dt * 8);
    }
  }

  // chair idle swivel
  const chairTop = meshByName['Chair_Top'];
  if (chairTop) chairTop.rotation.y = Math.sin(clock.elapsedTime * 0.45) * 0.28;

  // fireflies: looping drift over the grass, fade in at night
  if (mixValue > 0.01) {
    fireflies.visible = true;
    const t = clock.elapsedTime;
    for (let i = 0; i < FLY_N; i++) {
      const b = flyBase[i];
      flyPos[i * 3]     = b.x + Math.sin(t * b.fx + b.ph) * b.amp;
      flyPos[i * 3 + 1] = b.y + Math.sin(t * b.fz * 1.3 + b.ph) * 0.12;
      flyPos[i * 3 + 2] = b.z + Math.cos(t * b.fz + b.ph) * b.amp;
    }
    flyGeo.attributes.position.needsUpdate = true;
    flyMat.opacity = mixValue * (0.78 + 0.22 * Math.sin(t * 0.9));
  } else {
    fireflies.visible = false;
  }

  // grass inertia: spring-damper driven by camera velocity (disabled during intro)
  if (grassMat && intro) { prevCamPos.copy(camera.position); }
  if (grassMat && !intro) {
    camVel.subVectors(camera.position, prevCamPos).multiplyScalar(1 / Math.max(dt, 1e-4));
    prevCamPos.copy(camera.position);
    swayVel.x += (-camVel.x * 0.012 - swaySpring.x * 30.0 - swayVel.x * 6.0) * dt;
    swayVel.y += (-camVel.z * 0.012 - swaySpring.y * 30.0 - swayVel.y * 6.0) * dt;
    swaySpring.x += swayVel.x * dt * 60;
    swaySpring.y += swayVel.y * dt * 60;
    grassMat.uniforms.uSway.value.set(
      THREE.MathUtils.clamp(swaySpring.x, -0.12, 0.12),
      THREE.MathUtils.clamp(swaySpring.y, -0.12, 0.12));
    grassMat.uniforms.uTime.value = clock.elapsedTime;
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
