import * as THREE from "three";

/* The building is modelled from the hero elevation drawing (SVG units, 33.3 px = 1 m).
   Front face of every volume sits on z = 0, depth runs toward -z. */
const PX = 1 / 33.33;
const X = (x: number) => (x - 440) * PX;
const Y = (y: number) => (500 - y) * PX;

const BRASS = new THREE.Color("#c9a45c");

type Fade = { mat: THREE.Material & { opacity: number }; from: number; to: number; max: number };

function canvasTexture(w: number, h: number, draw: (c: CanvasRenderingContext2D) => void, repeat?: [number, number]) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  draw(cv.getContext("2d")!);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...repeat);
  }
  return t;
}

function noise(c: CanvasRenderingContext2D, w: number, h: number, base: string, amt: number, n = 4000) {
  c.fillStyle = base;
  c.fillRect(0, 0, w, h);
  for (let i = 0; i < n; i++) {
    const v = Math.random();
    c.fillStyle = v > 0.5 ? `rgba(255,255,255,${amt * Math.random()})` : `rgba(0,0,0,${amt * Math.random()})`;
    c.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
}

export type HeroScene = { setProgress: (p: number) => void; resize: () => void; dispose: () => void };

export function createHeroScene(canvas: HTMLCanvasElement, onReady?: () => void): HeroScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.35));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(13, 1, 0.5, 600);
  const target = new THREE.Vector3(0, 4.2, -4.5);

  /* ---------------------------------------------------------------- textures */
  const plasterTex = canvasTexture(256, 256, (c) => noise(c, 256, 256, "#ece8df", 0.045), [4, 2]);
  const basaltTex = canvasTexture(512, 128, (c) => {
    noise(c, 512, 128, "#2c2e2c", 0.08, 6000);
    c.strokeStyle = "rgba(0,0,0,.55)";
    c.lineWidth = 2;
    for (let r = 0; r < 2; r++) {
      c.beginPath(); c.moveTo(0, r * 64); c.lineTo(512, r * 64); c.stroke();
      for (let x = (r % 2) * 48; x < 512; x += 96) { c.beginPath(); c.moveTo(x, r * 64); c.lineTo(x, r * 64 + 64); c.stroke(); }
    }
  }, [6, 1]);
  const teakTex = canvasTexture(128, 512, (c) => {
    c.fillStyle = "#8c6038"; c.fillRect(0, 0, 128, 512);
    for (let i = 0; i < 70; i++) {
      c.strokeStyle = `rgba(${Math.random() > 0.5 ? "255,220,170" : "40,20,8"},${0.06 + Math.random() * 0.1})`;
      c.lineWidth = 1 + Math.random() * 2;
      const x = Math.random() * 128;
      c.beginPath(); c.moveTo(x, 0); c.bezierCurveTo(x + 6, 170, x - 6, 340, x + 3, 512); c.stroke();
    }
  });
  const jaaliTex = canvasTexture(256, 256, (c) => {
    c.fillStyle = "#b5643c"; c.fillRect(0, 0, 256, 256);
    c.globalCompositeOperation = "destination-out";
    for (let i = -8; i < 16; i++) {
      for (let j = -8; j < 16; j++) {
        c.save(); c.translate(i * 32 + (j % 2) * 16, j * 16); c.rotate(Math.PI / 4); c.fillRect(-7, -7, 14, 14); c.restore();
      }
    }
  }, [5, 4]);

  /* ---------------------------------------------------------------- materials */
  const fades: Fade[] = [];
  const edgesMats: THREE.LineBasicMaterial[] = [];
  const treeMats: THREE.LineBasicMaterial[] = [];
  const std = (opts: THREE.MeshStandardMaterialParameters, from: number, to: number) => {
    const m = new THREE.MeshStandardMaterial({ ...opts, transparent: true, opacity: 0 });
    fades.push({ mat: m, from, to, max: opts.opacity ?? 1 });
    return m;
  };
  const M = {
    basalt: std({ map: basaltTex, roughness: 0.85, color: "#ffffff" }, 0.3, 0.48),
    plaster: std({ map: plasterTex, roughness: 0.95, color: "#ffffff" }, 0.38, 0.58),
    slab: std({ color: "#c9c4b8", roughness: 0.8 }, 0.42, 0.6),
    teak: std({ map: teakTex, roughness: 0.6, color: "#ffffff" }, 0.5, 0.68),
    jaali: std({ map: jaaliTex, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.9, color: "#ffffff" }, 0.5, 0.7),
    glass: std({ color: "#1d2a2a", roughness: 0.08, metalness: 0.6, emissive: new THREE.Color("#e8a45c"), emissiveIntensity: 0 }, 0.55, 0.72),
    brass: std({ color: "#c9a45c", roughness: 0.35, metalness: 0.9 }, 0.55, 0.72),
    recess: std({ color: "#121a17", roughness: 1 }, 0.45, 0.6),
  };

  const building = new THREE.Group();
  scene.add(building);

  function add(geo: THREE.BufferGeometry, mat: THREE.Material, pos: [number, number, number], opts: { edges?: boolean; cast?: boolean } = {}) {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.castShadow = opts.cast ?? true;
    mesh.receiveShadow = true;
    building.add(mesh);
    if (opts.edges !== false) {
      const lm = new THREE.LineBasicMaterial({ color: BRASS, transparent: true, opacity: 0, depthWrite: false });
      edgesMats.push(lm);
      const lines = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), lm);
      lines.position.copy(mesh.position);
      lines.renderOrder = 2;
      building.add(lines);
    }
    return mesh;
  }
  /** Box from SVG rect (x, y, w, h) with a depth and a front z. */
  function box(x: number, y: number, w: number, h: number, depth: number, mat: THREE.Material, zFront = 0, opts?: { edges?: boolean; cast?: boolean }) {
    const g = new THREE.BoxGeometry(w * PX, h * PX, depth);
    return add(g, mat, [X(x + w / 2), Y(y + h), zFront - depth / 2].map((v, i) => (i === 1 ? v + (h * PX) / 2 : v)) as [number, number, number], opts);
  }

  /* ---------------------------------------------------------------- the house */
  box(110, 486, 660, 14, 13.4, M.basalt, 0.25);             // plinth
  box(120, 330, 300, 156, 9, M.plaster);                     // left volume
  box(100, 316, 340, 14, 10.2, M.slab, 0.6);                 // left roof slab
  box(420, 170, 340, 316, 12, M.plaster);                    // right volume
  box(410, 156, 380, 14, 13.2, M.slab, 0.6);                 // right roof slab
  box(420, 326, 344, 8, 12.4, M.slab, 0.2, { edges: false }); // floor band

  // jaali screen with dark recess behind
  box(150, 360, 150, 110, 0.06, M.recess, 0.01, { edges: false, cast: false });
  {
    const g = new THREE.PlaneGeometry(150 * PX, 110 * PX);
    add(g, M.jaali, [X(225), Y(415), 0.12]);
  }
  // left glass door
  box(330, 360, 66, 126, 0.08, M.glass, 0.04);
  box(362, 360, 2, 126, 0.12, M.brass, 0.07, { edges: false });

  // upper glazing and teak fins
  box(444, 190, 300, 120, 0.06, M.glass, 0.02);
  for (let x = 452; x <= 732; x += 14) box(x - 1.5, 190, 3.5, 120, 0.55, M.teak, 0.6, { edges: x % 56 === 4 });

  // pointed arch entrance: teak door with brass frame
  {
    // Two arcs share their centres with the drawing; inset shrinks the radius for the door leaf.
    const arch = (inset: number) => {
      const s = new THREE.Shape();
      const off = 24, R = 64 - inset, half = 40 - inset;
      const rise = Math.sqrt(R * R - off * off);
      s.moveTo(X(560 - half), Y(486));
      s.lineTo(X(560 - half), Y(410));
      s.absarc(X(560 + off), Y(410), R * PX, Math.PI, Math.atan2(rise, -off), true);
      s.absarc(X(560 - off), Y(410), R * PX, Math.atan2(rise, off), 0, true);
      s.lineTo(X(560 + half), Y(486));
      s.closePath();
      return s;
    };
    add(new THREE.ExtrudeGeometry(arch(0), { depth: 0.12, bevelEnabled: false, curveSegments: 32 }), M.brass, [0, 0, 0]);
    add(new THREE.ExtrudeGeometry(arch(5), { depth: 0.1, bevelEnabled: false, curveSegments: 32 }), M.teak, [0, 0, 0.06], { edges: false });
  }

  // right window
  box(640, 360, 100, 110, 0.08, M.glass, 0.04);
  for (const x of [673, 707]) box(x - 1, 360, 2, 110, 0.12, M.brass, 0.08, { edges: false });

  // neem tree, drawn as a brass wire model tree: stays a line drawing while the house becomes real
  {
    const wire = new THREE.LineBasicMaterial({ color: BRASS, transparent: true, opacity: 0 });
    treeMats.push(wire);
    const trunk = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(X(70), 0, 3), new THREE.Vector3(X(70), 3.2, 3),
      new THREE.Vector3(X(70), 2.1, 3), new THREE.Vector3(X(48), 2.9, 3.2),
      new THREE.Vector3(X(70), 2.5, 3), new THREE.Vector3(X(94), 3.3, 2.8),
    ]);
    building.add(new THREE.LineSegments(trunk, wire));
    for (const [cx, cy, r] of [[70, 336, 48], [38, 360, 34], [104, 352, 36], [66, 298, 30]]) {
      const g = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(r * PX, 1), 1);
      const l = new THREE.LineSegments(g, wire);
      l.position.set(X(cx), Y(cy), 3 + (cx % 3) * 0.3);
      l.rotation.set(cx, cy, r);
      building.add(l);
    }
  }

  /* ---------------------------------------------------------------- ground + light */
  const shadowMat = new THREE.ShadowMaterial({ opacity: 0, color: "#000000" });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), shadowMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const grid = new THREE.GridHelper(80, 40, BRASS, BRASS);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material & { opacity: number }).opacity = 0;
  grid.position.y = 0.01;
  scene.add(grid);

  const hemi = new THREE.HemisphereLight("#fff2dc", "#0f2a22", 0);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#ffe2b0", 0);
  sun.position.set(-22, 30, 26);
  sun.castShadow = true;
  sun.shadow.mapSize.set(small ? 768 : 1024, small ? 768 : 1024);
  const sc = sun.shadow.camera;
  sc.left = -22; sc.right = 22; sc.top = 18; sc.bottom = -14; sc.near = 1; sc.far = 100;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const fill = new THREE.DirectionalLight("#9fc2b4", 0);
  fill.position.set(25, 12, 10);
  scene.add(fill);

  /* ---------------------------------------------------------------- progress */
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  const ease = (t: number) => t * t * (3 - 2 * t);
  const range = (p: number, a: number, b: number) => ease(clamp((p - a) / (b - a)));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  let progress = 0;      // rendered value
  let goal = 0;          // value scroll asked for
  let raf = 0;
  let aspect = 1;

  function fitDistance(fovDeg: number, w: number, h: number) {
    const t = Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2);
    return Math.max(h / 2 / t, w / 2 / (t * aspect));
  }

  function apply() {
    const p = progress;
    const orbit = range(p, 0.08, 0.62);
    const fov = lerp(13, 30, orbit);
    const az = lerp(0, -36, orbit);
    const el = lerp(2, 15, orbit);
    const dist = fitDistance(fov, lerp(23, 25, orbit), lerp(12, 15, orbit)) * lerp(1.08, 1.22, orbit);
    camera.fov = fov;
    const a = THREE.MathUtils.degToRad(az), e = THREE.MathUtils.degToRad(el);
    camera.position.set(target.x + dist * Math.sin(a) * Math.cos(e), target.y + dist * Math.sin(e), target.z + dist * Math.cos(a) * Math.cos(e));
    camera.lookAt(target);
    camera.updateProjectionMatrix();

    const lineIn = range(p, 0, 0.1);
    const lineOut = range(p, 0.62, 0.9);
    const lineOpacity = lineIn * lerp(1, 0.14, lineOut);
    for (const m of edgesMats) m.opacity = lineOpacity;
    for (const m of treeMats) m.opacity = lineIn * 0.85;
    (grid.material as THREE.Material & { opacity: number }).opacity = lineIn * lerp(0.14, 0.06, orbit);

    for (const f of fades) {
      const o = range(p, f.from, f.to) * f.max;
      f.mat.opacity = o;
      const solid = o > 0.995;
      if (f.mat.transparent === solid) { f.mat.transparent = !solid; f.mat.needsUpdate = true; }
    }
    const lit = range(p, 0.3, 0.8);
    hemi.intensity = lerp(0, 1.1, lit);
    sun.intensity = lerp(0, 2.6, lit);
    fill.intensity = lerp(0, 0.5, lit);
    shadowMat.opacity = lerp(0, 0.38, range(p, 0.55, 0.85));
    (M.glass as THREE.MeshStandardMaterial).emissiveIntensity = lerp(0, 0.38, range(p, 0.78, 1));
    renderer.render(scene, camera);
  }

  function resize() {
    const r = canvas.parentElement!.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    aspect = r.width / Math.max(1, r.height);
    camera.aspect = aspect;
    apply();
  }

  resize();
  renderer.shadowMap.autoUpdate = true;
  onReady?.();

  // Rendering runs in its own frame loop and eases toward the scroll position,
  // so scroll events never block on WebGL and small wheel steps glide.
  let lastShadow = -1;
  function frame() {
    const d = goal - progress;
    if (Math.abs(d) < 0.0004) { progress = goal; raf = 0; apply(); return; }
    progress += d * 0.16;
    // shadows only need refreshing when the camera has moved noticeably
    const q = Math.round(progress * 120);
    renderer.shadowMap.autoUpdate = q !== lastShadow;
    lastShadow = q;
    apply();
    raf = requestAnimationFrame(frame);
  }

  return {
    setProgress(p: number) {
      goal = p;
      if (!raf) raf = requestAnimationFrame(frame);
    },
    resize,
    dispose() {
      cancelAnimationFrame(raf);
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      [plasterTex, basaltTex, teakTex, jaaliTex].forEach((t) => t.dispose());
    },
  };
}
