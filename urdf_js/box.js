// File: box.js  (ES module, no <script> tags)
import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

export function initMini3D(hostSelector = '#mini3d', { size = [160, 96], cubeSize = 2.6 } = {}) {
  const host = typeof hostSelector === 'string' ? document.querySelector(hostSelector) : hostSelector;
  if (!host) { console.warn('initMini3D: host not found', hostSelector); return null; }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.pointerEvents = 'none'; // why: don't block header links
  host.appendChild(renderer.domElement);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
    new THREE.MeshNormalMaterial()
  );
  scene.add(cube);

  const resize = () => {
    const [fw, fh] = size;
    const w = host.clientWidth || fw;
    const h = host.clientHeight || fh;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  resize();

  let ro;
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(resize);
    ro.observe(host);
  } else {
    window.addEventListener('resize', resize);
  }

  renderer.setAnimationLoop(t => {
    const time = t * 0.001;
    cube.rotation.x = time * 0.9;
    cube.rotation.y = time * 1.35;
    renderer.render(scene, camera);
  });

  return {
    scene, camera, renderer,
    dispose() {
      renderer.setAnimationLoop(null);
      ro?.disconnect?.();
      window.removeEventListener('resize', resize);
      renderer.dispose();
      host.contains(renderer.domElement) && host.removeChild(renderer.domElement);
    }
  };
}

// Auto-init if #mini3d exists
const auto = document.getElementById('mini3d');
if (auto) initMini3D(auto);
