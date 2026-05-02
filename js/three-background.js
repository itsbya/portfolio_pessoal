// js/three-background.js
// Renderizador de cena 3D com Three.js (Icosaedro Wireframe animado) - Apenas na Hero

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.getElementById('bg-canvas');
  const heroSection = document.getElementById('hero');
  if (!canvas || !heroSection) return;

  const scene = new THREE.Scene();
  
  // Pegar dimensões iniciais da seção Hero
  let width = heroSection.clientWidth;
  let height = heroSection.clientHeight;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);

  const geometry = new THREE.IcosahedronGeometry(2, 1);
  
  const getAccentColor = () => {
    const isLightMode = document.documentElement.classList.contains('light-mode');
    return isLightMode ? 0x0891b2 : 0x8b5cf6;
  };

  const material = new THREE.MeshBasicMaterial({
    color: getAccentColor(),
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });

  const icosahedron = new THREE.Mesh(geometry, material);
  scene.add(icosahedron);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        material.color.setHex(getAccentColor());
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener('mousemove', (event) => {
    if (prefersReducedMotion) return;
    // Pega a posição do mouse na janela
    mouseX = (event.clientX - window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2);
  });

  window.addEventListener('resize', () => {
    // Atualiza dimensões com base no tamanho da hero section
    width = heroSection.clientWidth;
    height = heroSection.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    
    if (window.innerWidth < 768) {
      icosahedron.position.x = 0;
      icosahedron.position.y = 1;
      camera.position.z = 7;
    } else {
      icosahedron.position.x = 2; // À direita do texto
      icosahedron.position.y = 0;
      camera.position.z = 5;
    }
  });

  window.dispatchEvent(new Event('resize'));

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      icosahedron.rotation.x = elapsedTime * 0.1;
      icosahedron.rotation.y = elapsedTime * 0.15;

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      icosahedron.rotation.x += 0.05 * (targetY - icosahedron.rotation.x);
      icosahedron.rotation.y += 0.05 * (targetX - icosahedron.rotation.y);
      
      icosahedron.position.y += Math.sin(elapsedTime) * 0.002;
    } else {
      icosahedron.rotation.x = 0.5;
      icosahedron.rotation.y = 0.5;
    }

    renderer.render(scene, camera);
  }

  animate();
});
