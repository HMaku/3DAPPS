let scene, camera, renderer, controls, loader;
let currentModelIndex = 0;
const modelPaths = [
  'Assets/'
];
let currentModel;

init();
loadModel(modelPaths[currentModelIndex]);

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  loader = new THREE.GLTFLoader();

  window.addEventListener('resize', onWindowResize, false);

  // Optional: press space to change model
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      nextModel();
    }
  });

  animate();
}

function loadModel(path) {
  if (currentModel) {
    scene.remove(currentModel);
  }

  loader.load(path, (gltf) => {
    currentModel = gltf.scene;
    scene.add(currentModel);
  });
}

function nextModel() {
  currentModelIndex = (currentModelIndex + 1) % modelPaths.length;
  loadModel(modelPaths[currentModelIndex]);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
