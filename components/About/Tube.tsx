"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CatmullRomCurve3,
  TubeGeometry,
  MeshPhongMaterial,
  BackSide,
  TextureLoader,
  RepeatWrapping,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  PointLight,
  PCFSoftShadowMap,
  Color,
} from 'three';

gsap.registerPlugin(ScrollTrigger);

interface TubeProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const Tube: React.FC<TubeProps> = ({ sectionRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const targetSection = sectionRef.current;
    if (!canvasRef.current || !targetSection) return;

    const Mathutils = {
      normalize: function ($value: number, $min: number, $max: number): number {
        return ($value - $min) / ($max - $min);
      },
      interpolate: function ($normValue: number, $min: number, $max: number): number {
        return $min + ($max - $min) * $normValue;
      },
      map: function ($value: number, $min1: number, $max1: number, $min2: number, $max2: number): number {
        if ($value < $min1) {
          $value = $min1;
        }
        if ($value > $max1) {
          $value = $max1;
        }
        const res = this.interpolate(this.normalize($value, $min1, $max1), $min2, $max2);
        return res;
      },
    };

    const markers: THREE.Vector3[] = [];
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const canvasElement = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setSize(ww, wh);
    renderer.setClearColor(0x050103, 1);
    const composer: EffectComposer = new EffectComposer(renderer);
    renderer.setSize(ww, wh);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x170207, 0, 95);
    scene.background = new Color(0x050103);
    //const clock = new THREE.Clock();
    let cameraRotationProxyX = 3.14159;
    let cameraRotationProxyY = 0;
    const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 200);
    camera.rotation.y = cameraRotationProxyX;
    camera.rotation.z = cameraRotationProxyY;
    const c = new THREE.Group();
    c.position.z = 400;
    c.add(camera);
    scene.add(c);
    const params = {
      bloomThreshold: 0.5,
      bloomStrength: 1.5,
      bloomRadius: 0.4,
    };
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.renderToScreen = true;
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const pointsData = [
      [10, 89, 0],
      [50, 88, 10],
      [76, 139, 20],
      [126, 141, 12],
      [150, 112, 8],
      [157, 73, 0],
      [180, 44, 5],
      [207, 35, 10],
      [232, 36, 0],
    ];
    let p1: THREE.Vector3, p2: THREE.Vector3;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < pointsData.length; i++) {
      const x = pointsData[i][0];
      const y = pointsData[i][2];
      const z = pointsData[i][1];
      points.push(new THREE.Vector3(x, y, z));
    }
    const path = new CatmullRomCurve3(points);
    path.tension = 0.5;
    const geometry = new TubeGeometry(path, 300, 4, 32, false);
    const mapHeight = new TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/waveform-bump3.jpg', function (texture: THREE.Texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(15, 2);
    });
    const material = new MeshPhongMaterial({
      side: BackSide,
      color: 0x6f0014,
      emissive: 0x230006,
      emissiveIntensity: 0.45,
      shininess: 40,
      bumpMap: mapHeight,
      bumpScale: -0.03,
      specular: 0xff375f,
    });
    const tube = new THREE.Mesh(geometry, material);
    scene.add(tube);
    const geometryInner = new TubeGeometry(path, 150, 3.4, 32, false);
    const geo = new EdgesGeometry(geometryInner);
    const mat = new LineBasicMaterial({
      linewidth: 2,
      opacity: 0.45,
      transparent: true,
      color: 0xff304c,
    });
    const wireframe = new LineSegments(geo, mat);
    scene.add(wireframe);
    const light = new PointLight(0xff5a71, 0.45, 4, 0);
    light.castShadow = true;
    scene.add(light);

    function updateCameraPercentage(percentage: number) {
      p1 = path.getPointAt(percentage);
      p2 = path.getPointAt(percentage + 0.03);
      c.position.set(p1.x, p1.y, p1.z);
      c.lookAt(p2);
      light.position.set(p2.x, p2.y, p2.z);
    }

    let cameraTargetPercentage = 0;
    let currentCameraPercentage = 0;
    gsap.defaults({ ease: 'none' });
    const tubePerc: { percent: number } = { percent: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: targetSection,
        start: 'top top',
        end: '+=200%',
        scrub: 4,
        pin: true,
        pinSpacing: true,
        anticipatePin: 0.8,
        markers: false,
      },
    });
    tl.to(tubePerc, {
      percent: 0.96,
      ease: 'none',
      duration: 10,
      onUpdate: function () {
        cameraTargetPercentage = tubePerc.percent;
      },
    });

    const spikeyTexture = new TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/spikey.png');
    const particleCount = 6800,
      particles1 = new THREE.BufferGeometry(),
      particles2 = new THREE.BufferGeometry(),
      particles3 = new THREE.BufferGeometry(),
      pMaterial = new THREE.PointsMaterial({
        color: 0xff6b8d,
        size: 0.5,
        map: spikeyTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
    const positions1 = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      const pX = Math.random() * 500 - 250;
      const pY = Math.random() * 50 - 25;
      const pZ = Math.random() * 500 - 250;
      positions1[p * 3] = pX;
      positions1[p * 3 + 1] = pY;
      positions1[p * 3 + 2] = pZ;
    }
    particles1.setAttribute('position', new THREE.BufferAttribute(positions1, 3));

    const positions2 = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      const pX = Math.random() * 500;
      const pY = Math.random() * 10 - 5;
      const pZ = Math.random() * 500;
      positions2[p * 3] = pX;
      positions2[p * 3 + 1] = pY;
      positions2[p * 3 + 2] = pZ;
    }
    particles2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));

    const positions3 = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      const pX = Math.random() * 500;
      const pY = Math.random() * 10 - 5;
      const pZ = Math.random() * 500;
      positions3[p * 3] = pX;
      positions3[p * 3 + 1] = pY;
      positions3[p * 3 + 2] = pZ;
    }
    particles3.setAttribute('position', new THREE.BufferAttribute(positions3, 3));

    const particleSystem1 = new THREE.Points(particles1, pMaterial);
    const particleSystem2 = new THREE.Points(particles2, pMaterial);
    const particleSystem3 = new THREE.Points(particles3, pMaterial);
    scene.add(particleSystem1);
    scene.add(particleSystem2);
    scene.add(particleSystem3);

    function render() {
      currentCameraPercentage = cameraTargetPercentage;

      camera.rotation.y += (cameraRotationProxyX - camera.rotation.y) / 15;
      camera.rotation.x += (cameraRotationProxyY - camera.rotation.x) / 15;

      updateCameraPercentage(currentCameraPercentage);

      particleSystem1.rotation.y += 0.00002;
      particleSystem2.rotation.x += 0.00005;
      particleSystem3.rotation.z += 0.00001;

      composer.render();
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    const handleCanvasClick = () => {
      console.clear();
      if (p1) markers.push(p1);
      console.log(JSON.stringify(markers));
    };
    canvasElement?.addEventListener('click', handleCanvasClick);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize, false);

    const handleMouseMove = (evt: MouseEvent) => {
      cameraRotationProxyX = Mathutils.map(evt.clientX, 0, window.innerWidth, 3.24, 3.04);
      cameraRotationProxyY = Mathutils.map(evt.clientY, 0, window.innerHeight, -0.1, 0.1);
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      canvasElement?.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      scene.clear();
      composer.dispose();
      renderer.dispose();
    };
  }, [sectionRef]);

  return (
    <div className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, transparent 60%, black 150%)' }}
      />
    </div>
  );
};

export default Tube;
