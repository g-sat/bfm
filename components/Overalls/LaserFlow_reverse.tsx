"use client"

import React, { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  wispDensity?: number;
  dpr?: number;
  mouseSmoothTime?: number;
  mouseTiltStrength?: number;
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  flowSpeed?: number;
  verticalSizing?: number;
  horizontalSizing?: number;
  fogIntensity?: number;
  fogScale?: number;
  wispSpeed?: number;
  wispIntensity?: number;
  flowStrength?: number;
  decay?: number;
  falloffStart?: number;
  fogFallSpeed?: number;
  color?: string;
  direction?: 'down' | 'up';
};

// ✅ VERTEX SHADER
const VERT = `
precision highp float;
attribute vec3 position;
void main(){
  gl_Position = vec4(position, 1.0);
}
`;

// ✅ COMPLETE FRAGMENT SHADER (TESTED - NO ERRORS)
const FRAG = `
#ifdef GL_ES
precision mediump float;
#else
precision highp float;
#endif

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform float uWispDensity;
uniform float uTiltScale;
uniform float uFlowTime;
uniform float uFogTime;
uniform float uBeamXFrac;
uniform float uBeamYFrac;
uniform float uFlowSpeed;
uniform float uVLenFactor;
uniform float uHLenFactor;
uniform float uFogIntensity;
uniform float uFogScale;
uniform float uWSpeed;
uniform float uWIntensity;
uniform float uFlowStrength;
uniform float uDecay;
uniform float uFalloffStart;
uniform float uFogFallSpeed;
uniform vec3 uColor;
uniform float uFade;
uniform float uDirection;

// Constants
#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define EPS 1e-6
#define DT_LOCAL 0.0038
#define TAP_RADIUS 6
#define R_H 150.0
#define R_V 150.0
#define FLARE_HEIGHT 16.0
#define FLARE_AMOUNT 8.0
#define FLARE_EXP 2.0
#define TOP_FADE_START 0.1
#define TOP_FADE_EXP 1.0
#define FLOW_PERIOD 0.5
#define FLOW_SHARPNESS 1.5
#define W_BASE_X 1.5
#define W_LAYER_GAP 0.25
#define W_LANES 10
#define W_SIDE_DECAY 0.5
#define W_HALF 0.01
#define W_AA 0.15
#define W_CELL 20.0
#define W_SEG_MIN 0.01
#define W_SEG_MAX 0.55
#define W_CURVE_AMOUNT 15.0
#define W_CURVE_RANGE 13.0
#define W_BOTTOM_EXP 10.0
#define FOG_ON 1
#define FOG_CONTRAST 1.2
#define FOG_OCTAVES 5
#define FOG_BOTTOM_BIAS 0.8
#define FOG_TILT_MAX_X 0.35
#define FOG_TILT_SHAPE 1.5
#define FOG_BEAM_MIN 0.0
#define FOG_BEAM_MAX 0.75
#define FOG_MASK_GAMMA 0.5
#define FOG_EXPAND_SHAPE 12.2
#define FOG_EDGE_MIX 0.5
#define HFOG_EDGE_START 0.20
#define HFOG_EDGE_END 0.98
#define HFOG_EDGE_GAMMA 1.4
#define HFOG_Y_RADIUS 25.0
#define HFOG_Y_SOFT 60.0
#define EDGE_X0 0.22
#define EDGE_X1 0.995
#define EDGE_X_GAMMA 1.25
#define EDGE_LUMA_T0 0.0
#define EDGE_LUMA_T1 2.0
#define DITHER_STRENGTH 1.0
#define EDGE_SOFT (DT_LOCAL*4.0)

// Helper functions
float g(float x) { return x <= 0.00031308 ? 12.92 * x : 1.055 * pow(x, 1.0/2.4) - 0.055; }

float bs(vec2 p, vec2 q, float powr) {
    float d = distance(p, q);
    float f = powr * uFalloffStart;
    float r = (f * f) / (d * d + EPS);
    return powr * min(1.0, r);
}

float bsa(vec2 p, vec2 q, float powr, vec2 s) {
    vec2 d = p - q;
    float dd = (d.x * d.x) / (s.x * s.x) + (d.y * d.y) / (s.y * s.y);
    float f = powr * uFalloffStart;
    float r = (f * f) / (dd + EPS);
    return powr * min(1.0, r);
}

float tri01(float x) { 
    float f = fract(x); 
    return 1.0 - abs(f * 2.0 - 1.0); 
}

float tauWf(float t, float tmin, float tmax) { 
    float a = smoothstep(tmin, tmin + EDGE_SOFT, t);
    float b = 1.0 - smoothstep(tmax - EDGE_SOFT, tmax, t);
    return max(0.0, a * b); 
}

float h21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.123);
    return fract(p.x * p.y);
}

float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = h21(i);
    float b = h21(i + vec2(1.0, 0.0));
    float c = h21(i + vec2(0.0, 1.0));
    float d = h21(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm2(vec2 p) {
    float v = 0.0;
    float amp = 0.6;
    mat2 m = mat2(0.86, 0.5, -0.5, 0.86);
    for(int i = 0; i < FOG_OCTAVES; i++) {
        v += amp * vnoise(p);
        p = m * p * 2.03 + 17.1;
        amp *= 0.52;
    }
    return v;
}

float rGate(float x, float l) { 
    float a = smoothstep(0.0, W_AA, x);
    float b = 1.0 - smoothstep(l, l + W_AA, x);
    return max(0.0, a * b); 
}

float flareY(float y) { 
    float t = clamp(1.0 - (clamp(y, 0.0, FLARE_HEIGHT) / max(FLARE_HEIGHT, EPS)), 0.0, 1.0);
    return pow(t, FLARE_EXP); 
}

// Wisp function
float vWisps(vec2 uv, float topF) {
    float y = uv.y;
    float yf = (y + uFlowTime * uWSpeed) / W_CELL;
    float dRaw = clamp(uWispDensity, 0.0, 2.0);
    float d = dRaw <= 0.0 ? 1.0 : dRaw;
    float lanesF = floor(float(W_LANES) * min(d, 1.0) + 0.5);
    int lanes = int(max(1.0, lanesF));
    float sp = min(d, 1.0);
    float ep = max(d - 1.0, 0.0);
    
    float fm = flareY(max(y, 0.0));
    float rm = clamp(1.0 - (y / max(W_CURVE_RANGE, EPS)), 0.0, 1.0);
    float cm = fm * rm;
    float G = 0.05;
    float xS = 1.0 + (FLARE_AMOUNT * W_CURVE_AMOUNT * G) * cm;
    
    float sPix = clamp(y / R_V, 0.0, 1.0);
    float bGain = pow(1.0 - sPix, W_BOTTOM_EXP);
    float sum = 0.0;
    
    for(int s = 0; s < 2; s++) {
        float sgn = s == 0 ? -1.0 : 1.0;
        for(int i = 0; i < W_LANES; i++) {
            if(i >= lanes) break;
            float off = W_BASE_X + float(i) * W_LAYER_GAP;
            float xc = sgn * (off * xS);
            float dx = abs(uv.x - xc);
            float lat = 1.0 - smoothstep(W_HALF, W_HALF + W_AA, dx);
            float amp = exp(-off * W_SIDE_DECAY);
            
            float seed = h21(vec2(off, sgn * 17.0));
            float yf2 = yf + seed * 7.0;
            float ci = floor(yf2);
            float fy = fract(yf2);
            float seg = mix(W_SEG_MIN, W_SEG_MAX, h21(vec2(ci, off * 2.3)));
            float spR = h21(vec2(ci, off + sgn * 31.0));
            float seg1 = rGate(fy, seg) * step(spR, sp);
            
            if(ep > 0.0) {
                float spR2 = h21(vec2(ci * 3.1 + 7.0, off * 5.3 + sgn * 13.0));
                float f2 = fract(fy + 0.5);
                seg1 += rGate(f2, seg * 0.9) * step(spR2, ep);
            }
            sum += amp * lat * seg1;
        }
    }
    
    float span = smoothstep(-3.0, 0.0, y) * (1.0 - smoothstep(R_V - 6.0, R_V, y));
    return uWIntensity * sum * topF * bGain * span;
    
}

// Main image function
void mainImage(out vec4 fc, in vec2 frag) {
    vec2 C = iResolution.xy * 0.5;
    float invW = 1.0 / max(C.x, 1.0);
    float sc = 512.0 / iResolution.x * 0.4;
    vec2 uv = (frag - C) * sc;
    vec2 off = vec2(uBeamXFrac * iResolution.x * sc, uBeamYFrac * iResolution.y * sc);
    vec2 uvc = uv - off;
    
    float a = 0.0, b = 0.0;
    float basePhase = 1.5 * PI + uDecay * 0.5;
    float tauMin = basePhase - uDecay;
    float tauMax = basePhase;
    
    // Horizontal beam
    float cx = clamp(uvc.x / (R_H * uHLenFactor), -1.0, 1.0);
    float tH = clamp(TWO_PI - acos(cx), tauMin, tauMax);
    for(int k = -TAP_RADIUS; k <= TAP_RADIUS; k++) {
        float tu = tH + float(k) * DT_LOCAL;
        float wt = tauWf(tu, tauMin, tauMax);
        if(wt <= 0.0) continue;
        float spd = max(abs(sin(tu)), 0.02);
        float u = clamp((basePhase - tu) / max(uDecay, EPS), 0.0, 1.0);
        float env = pow(1.0 - abs(u * 2.0 - 1.0), 0.8);
        vec2 p = vec2((R_H * uHLenFactor) * cos(tu), 0.0);
        a += wt * bs(uvc, p, env * spd);
    }
    
    // Vertical beam
    float yPix = uvc.y * uDirection;
    float cy = clamp(-yPix / (R_V * uVLenFactor), -1.0, 1.0);
    float tV = clamp(TWO_PI - acos(cy), tauMin, tauMax);
    for(int k = -TAP_RADIUS; k <= TAP_RADIUS; k++) {
        float tu = tV + float(k) * DT_LOCAL;
        float wt = tauWf(tu, tauMin, tauMax);
        if(wt <= 0.0) continue;
        float yb = (-R_V) * cos(tu);
        float s = clamp(yb / R_V, 0.0, 1.0);
        float spd = max(abs(sin(tu)), 0.02);
        float env = pow(1.0 - s, 0.6) * spd;
        float cap = 1.0 - smoothstep(TOP_FADE_START, 1.0, s);
        cap = pow(cap, TOP_FADE_EXP);
        env *= cap;
        
        float ph = s / max(FLOW_PERIOD, EPS) + uFlowTime * uFlowSpeed;
        float fl = pow(tri01(ph), FLOW_SHARPNESS);
        env *= mix(1.0 - uFlowStrength, 1.0, fl);
        
        float yp = (-R_V * uVLenFactor) * cos(tu);
        float m = pow(smoothstep(FLARE_HEIGHT, 0.0, yp), FLARE_EXP);
        float wx = 1.0 + FLARE_AMOUNT * m;
        vec2 sig = vec2(wx, 1.0);
        vec2 p = vec2(0.0, yp);
        float mask = step(0.0, yp);
        b += wt * bsa(uvc, p, mask * env, sig);
    }
    
    float sPix = clamp(yPix / R_V, 0.0, 1.0);
    float topA = pow(1.0 - smoothstep(TOP_FADE_START, 1.0, sPix), TOP_FADE_EXP);
    float L = a + b * topA;
    float w = vWisps(vec2(uvc.x, yPix), topA);
    
    // Fog
    float fog = 0.0;
    #if FOG_ON
    vec2 fuv = uvc * uFogScale;
    float mAct = step(1.0, length(iMouse.xy));
    float nx = ((iMouse.x - C.x) * invW) * mAct;
    float ax = abs(nx);
    float stMag = mix(ax, pow(ax, FOG_TILT_SHAPE), 0.35);
    float st = sign(nx) * stMag * uTiltScale;
    st = clamp(st, -FOG_TILT_MAX_X, FOG_TILT_MAX_X);
    vec2 dir = normalize(vec2(st, 1.0));
    fuv += uFogTime * uFogFallSpeed * dir;
    vec2 prp = vec2(-dir.y, dir.x);
    fuv += prp * (0.08 * sin(dot(uvc, prp) * 0.08 + uFogTime * 0.9));
    
    float n = fbm2(fuv + vec2(fbm2(fuv + vec2(7.3, 2.1)), fbm2(fuv + vec2(-3.7, 5.9))) * 0.6);
    n = pow(clamp(n, 0.0, 1.0), FOG_CONTRAST);
    
    float pixW = 1.0 / max(iResolution.y, 1.0);
    float wL = pixW;
    float m0 = pow(smoothstep(FOG_BEAM_MIN - wL, FOG_BEAM_MAX + wL, L), FOG_MASK_GAMMA);
    float bm = 1.0 - pow(1.0 - m0, FOG_EXPAND_SHAPE);
    bm = mix(bm * m0, bm, FOG_EDGE_MIX);
    
    float yP = 1.0 - smoothstep(HFOG_Y_RADIUS, HFOG_Y_RADIUS + HFOG_Y_SOFT, abs(yPix));
    float nxF = abs((frag.x - C.x) * invW);
    float hE = 1.0 - smoothstep(HFOG_EDGE_START, HFOG_EDGE_END, nxF);
    hE = pow(clamp(hE, 0.0, 1.0), HFOG_EDGE_GAMMA);
    float hW = mix(1.0, hE, clamp(yP, 0.0, 1.0));
    
    float bBias = mix(1.0, 1.0 - sPix, FOG_BOTTOM_BIAS);
    float browserFogIntensity = uFogIntensity * 1.8;
    float radialFade = 1.0 - smoothstep(0.0, 0.7, length(uvc) / 120.0);
    fog = n * browserFogIntensity * bBias * bm * hW * radialFade;
    #endif
    
    float LF = L + fog;
    float dith = (h21(frag) - 0.5) * (DITHER_STRENGTH / 255.0);
    float tone = g(LF + w);
    vec3 col = tone * uColor + dith;
    
    float alpha = clamp(g(L + w * 0.6) + dith * 0.6, 0.0, 1.0);
    float nxE = abs((frag.x - C.x) * invW);
    float xF = pow(clamp(1.0 - smoothstep(EDGE_X0, EDGE_X1, nxE), 0.0, 1.0), EDGE_X_GAMMA);
    float scene = LF + max(0.0, w) * 0.5;
    float hi = smoothstep(EDGE_LUMA_T0, EDGE_LUMA_T1, scene);
    float eM = mix(xF, 1.0, hi);
    
    col *= eM * uFade;
    alpha *= eM * uFade;
    fc = vec4(col, alpha);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

// ✅ FIXED: PRECISE UNIFORM TYPES (NO .set() ON NUMBERS!)
type NumberUniform = { value: number };
type Vector3Uniform = { value: THREE.Vector3 };
type Vector4Uniform = { value: THREE.Vector4 };

type Uniforms = {
  // Numbers (direct assignment)
  iTime: NumberUniform;
  uWispDensity: NumberUniform;
  uTiltScale: NumberUniform;
  uFlowTime: NumberUniform;
  uFogTime: NumberUniform;
  uBeamXFrac: NumberUniform;
  uBeamYFrac: NumberUniform;
  uFlowSpeed: NumberUniform;
  uVLenFactor: NumberUniform;
  uHLenFactor: NumberUniform;
  uFogIntensity: NumberUniform;
  uFogScale: NumberUniform;
  uWSpeed: NumberUniform;
  uWIntensity: NumberUniform;
  uFlowStrength: NumberUniform;
  uDecay: NumberUniform;
  uFalloffStart: NumberUniform;
  uFogFallSpeed: NumberUniform;
  uFade: NumberUniform;
  uDirection: NumberUniform;
  
  // Vectors (.set() method)
  iResolution: Vector3Uniform;
  iMouse: Vector4Uniform;
  uColor: Vector3Uniform;
};

export const LaserFlow: React.FC<Props> = ({
  className,
  style,
  wispDensity = 1,
  dpr,
  mouseSmoothTime = 0.0,
  mouseTiltStrength = 0.01,
  horizontalBeamOffset = 0.1,
  verticalBeamOffset = 0.0,
  flowSpeed = 0.35,
  verticalSizing = 2.0,
  horizontalSizing = 0.5,
  fogIntensity = 0.45,
  fogScale = 0.3,
  wispSpeed = 50.0,
  wispIntensity = 5.0,
  flowStrength = 0.25,
  decay = 1.1,
  falloffStart = 1.2,
  fogFallSpeed = 0.6,
  color = '#833cc2',
  direction = 'down',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<Uniforms | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.RawShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  
  const [contextLost, setContextLost] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const recoveryAttemptRef = useRef(0);
  const maxRecoveryAttempts = 3;

  const hasFadedRef = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);
  const baseDprRef = useRef<number>(1);
  const currentDprRef = useRef<number>(1);
  const pausedRef = useRef<boolean>(false);
  const inViewRef = useRef<boolean>(true);
  const rafRef = useRef<number>(0);

  const hexToRGB = (hex: string): { r: number; g: number; b: number } => {
    let c = hex.trim();
    if (c[0] === '#') c = c.slice(1);
    if (c.length === 3)
      c = c.split('').map(x => x + x).join('');
    const n = parseInt(c, 16) || 0xffffff;
    return { 
      r: ((n >> 16) & 255) / 255, 
      g: ((n >> 8) & 255) / 255, 
      b: (n & 255) / 255 
    };
  };

  const createRenderer = useCallback((): THREE.WebGLRenderer | null => {
    try {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance',
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
        logarithmicDepthBuffer: false
      });
      
      renderer.setPixelRatio(1);
      renderer.setSize(1, 1);
      rendererRef.current = renderer;
      return renderer;
    } catch (error) {
      console.error('Failed to create WebGL renderer:', error);
      return null;
    }
  }, []);

  const setupScene = useCallback((renderer: THREE.WebGLRenderer): boolean => {
    try {
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      cameraRef.current = camera;

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
      geometryRef.current = geometry;

      // ✅ TYPED UNIFORMS WITH PROPER TYPES
      const uniforms: Uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        uWispDensity: { value: wispDensity },
        uTiltScale: { value: mouseTiltStrength },
        uFlowTime: { value: 0 },
        uFogTime: { value: 0 },
        uBeamXFrac: { value: horizontalBeamOffset },
        uBeamYFrac: { value: verticalBeamOffset },
        uFlowSpeed: { value: flowSpeed },
        uVLenFactor: { value: verticalSizing },
        uHLenFactor: { value: horizontalSizing },
        uFogIntensity: { value: fogIntensity },
        uFogScale: { value: fogScale },
        uWSpeed: { value: wispSpeed },
        uWIntensity: { value: wispIntensity },
        uFlowStrength: { value: flowStrength },
        uDecay: { value: decay },
        uFalloffStart: { value: falloffStart },
        uFogFallSpeed: { value: fogFallSpeed },
        uColor: { value: new THREE.Vector3(1, 1, 1) },
        uFade: { value: hasFadedRef.current ? 1 : 0 },
        uDirection: { value: direction === 'up' ? 1.0 : -1.0 },
      };
      uniformsRef.current = uniforms;

      const material = new THREE.RawShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms,
        transparent: false,
        depthTest: false,
        depthWrite: false,
        blending: THREE.NormalBlending
      });
      materialRef.current = material;

      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      meshRef.current = mesh;
      scene.add(mesh);

      renderer.shadowMap.enabled = false;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 1);

      return true;
    } catch (error) {
      console.error('Failed to setup scene:', error);
      return false;
    }
  }, [
    wispDensity, mouseTiltStrength, horizontalBeamOffset, verticalBeamOffset,
    flowSpeed, verticalSizing, horizontalSizing, fogIntensity, fogScale,
    wispSpeed, wispIntensity, flowStrength, decay, falloffStart, fogFallSpeed
  ]);

  // ✅ FIXED ANIMATION LOOP (TYPE-SAFE UNIFORM UPDATES)
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = createRenderer();
    if (!renderer) {
      setContextLost(true);
      return;
    }

    const success = setupScene(renderer);
    if (!success) {
      setContextLost(true);
      return;
    }

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    mount.appendChild(canvas);

    const setSize = () => {
      if (!renderer || !mount || !uniformsRef.current) return;
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      const pr = currentDprRef.current;
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
      // ✅ TYPE-SAFE: iResolution is Vector3Uniform
      uniformsRef.current.iResolution.value.set(w * pr, h * pr, pr);
      rectRef.current = canvas.getBoundingClientRect();
    };
    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(mount);

    const io = new IntersectionObserver(
      entries => { inViewRef.current = entries[0]?.isIntersecting ?? true; },
      { root: null, threshold: 0 }
    );
    io.observe(mount);

    const onCtxLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
      pausedRef.current = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    const onCtxRestored = () => {
      pausedRef.current = false;
      setContextLost(true);
    };

    canvas.addEventListener('webglcontextlost', onCtxLost, false);
    canvas.addEventListener('webglcontextrestored', onCtxRestored, false);

    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseSmooth = new THREE.Vector2(0, 0);
    
    const updateMouse = (clientX: number, clientY: number) => {
      const rect = rectRef.current;
      if (!rect) return;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const ratio = currentDprRef.current;
      const hb = rect.height * ratio;
      mouseTarget.set(x * ratio, hb - y * ratio);
    };

    const onMove = (ev: PointerEvent | MouseEvent) => updateMouse(ev.clientX, ev.clientY);
    const onLeave = () => mouseTarget.set(0, 0);
    
    canvas.addEventListener('pointermove', onMove, { passive: true });
    canvas.addEventListener('pointerdown', onMove, { passive: true });
    canvas.addEventListener('pointerenter', onMove, { passive: true });
    canvas.addEventListener('pointerleave', onLeave, { passive: true });

    const clock = new THREE.Clock();
    let prevTime = 0;
    let fade = hasFadedRef.current ? 1 : 0;

    const animate = () => {
      if (contextLost || pausedRef.current || !inViewRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const renderer = rendererRef.current;
      if (!renderer || !sceneRef.current || !cameraRef.current || !uniformsRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const t = clock.getElapsedTime();
      const dt = Math.max(0, t - prevTime);
      prevTime = t;

      // ✅ TYPE-SAFE UNIFORM UPDATES
      // Numbers: Direct assignment
      uniformsRef.current.iTime.value = t;
      const cdt = Math.min(0.033, Math.max(0.001, dt));
      uniformsRef.current.uFlowTime.value += cdt;
      uniformsRef.current.uFogTime.value += cdt;

      if (!hasFadedRef.current) {
        fade = Math.min(1, fade + cdt);
        uniformsRef.current.uFade.value = fade;
        if (fade >= 1) hasFadedRef.current = true;
      }

      // Vectors: .set() method
      const tau = Math.max(1e-3, mouseSmoothTime);
      const alpha = 1 - Math.exp(-cdt / tau);
      mouseSmooth.lerp(mouseTarget, alpha);
      // ✅ TYPE-SAFE: iMouse is Vector4Uniform
      uniformsRef.current.iMouse.value.set(mouseSmooth.x, mouseSmooth.y, 0, 0);

      renderer.render(sceneRef.current, cameraRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('webglcontextlost', onCtxLost);
      canvas.removeEventListener('webglcontextrestored', onCtxRestored);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onMove);
      canvas.removeEventListener('pointerenter', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      
      if (geometryRef.current) geometryRef.current.dispose();
      if (materialRef.current) materialRef.current.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
      
      if (mount.contains(canvas)) mount.removeChild(canvas);
    };
  }, [createRenderer, setupScene, mouseSmoothTime]);

  // ✅ FIXED PROPS UPDATE (TYPE-SAFE)
  useEffect(() => {
    const uniforms = uniformsRef.current;
    if (!uniforms) return;

    // Numbers: Direct assignment
    uniforms.uWispDensity.value = wispDensity;
    uniforms.uTiltScale.value = mouseTiltStrength;
    uniforms.uBeamXFrac.value = horizontalBeamOffset;
    uniforms.uBeamYFrac.value = verticalBeamOffset;
    uniforms.uFlowSpeed.value = flowSpeed;
    uniforms.uVLenFactor.value = verticalSizing;
    uniforms.uHLenFactor.value = horizontalSizing;
    uniforms.uFogIntensity.value = fogIntensity;
    uniforms.uFogScale.value = fogScale;
    uniforms.uWSpeed.value = wispSpeed;
    uniforms.uWIntensity.value = wispIntensity;
    uniforms.uFlowStrength.value = flowStrength;
    uniforms.uDecay.value = decay;
    uniforms.uFalloffStart.value = falloffStart;
    uniforms.uFogFallSpeed.value = fogFallSpeed;
    uniforms.uDirection.value = direction === 'up' ? 1.0 : -1.0;

    // Vector: .set() method
    const { r, g, b } = hexToRGB(color || '#FFFFFF');
    // ✅ TYPE-SAFE: uColor is Vector3Uniform
    uniforms.uColor.value.set(r, g, b);
  }, [
    wispDensity, mouseTiltStrength, horizontalBeamOffset, verticalBeamOffset,
    flowSpeed, verticalSizing, horizontalSizing, fogIntensity, fogScale,
    wispSpeed, wispIntensity, flowStrength, decay, falloffStart, fogFallSpeed, color
  ]);

  // Recovery effect (same as before)
  useEffect(() => {
    if (contextLost && !isRecovering && recoveryAttemptRef.current < maxRecoveryAttempts) {
      const timer = setTimeout(() => {
        recoveryAttemptRef.current++;
        setIsRecovering(true);

        const mount = mountRef.current;
        if (mount) {
          const canvas = mount.querySelector('canvas');
          if (canvas) mount.removeChild(canvas);

          const renderer = createRenderer();
          if (renderer) {
            const success = setupScene(renderer);
            if (success) {
              const newCanvas = renderer.domElement;
              newCanvas.style.width = '100%';
              newCanvas.style.height = '100%';
              newCanvas.style.display = 'block';
              mount.appendChild(newCanvas);

              const w = mount.clientWidth || 1;
              const h = mount.clientHeight || 1;
              renderer.setPixelRatio(currentDprRef.current);
              renderer.setSize(w, h, false);
              // ✅ TYPE-SAFE
              uniformsRef.current?.iResolution.value.set(w * currentDprRef.current, h * currentDprRef.current, currentDprRef.current);
              
              setContextLost(false);
              setIsRecovering(false);
              pausedRef.current = false;
            }
          }
          setIsRecovering(false);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [contextLost, isRecovering, createRenderer, setupScene]);

  // Fallback UI
  if (contextLost && recoveryAttemptRef.current >= maxRecoveryAttempts) {
    return (
      <div className={`w-full h-full relative ${className || ''}`} style={style}>
        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-lg mb-2">Graphics temporarily unavailable</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={mountRef} className={`w-full h-full relative ${className || ''}`} style={style}>
      {isRecovering && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
          <div className="text-white text-sm">Recovering graphics...</div>
        </div>
      )}
    </div>
  );
};

export default LaserFlow;