(function() {
    const container = document.getElementById('model1');
  
    // Core Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 3, 0);
    camera.lookAt(0, 0, 0);
  
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  
    // Lights
    const lightPositions = [
      [5, -11, -9],
      [-17, -11, -12],
      [12, -9, 16],
      [2, 10, -0.5],
      [8, 10, -14]
    ];
  
    lightPositions.forEach(pos => {
      const light = new THREE.DirectionalLight();
      light.position.set(...pos);
      scene.add(light);
    });
  
    // Orbit Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(1, 2, 0);
    controls.update();
  
    // Load model
    let model, mixer;
    const loader = new THREE.GLTFLoader();
    loader.load('Assets/BottleSprite.glb', gltf => {
      model = gltf.scene;
      scene.add(model);
  
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach(clip => mixer.clipAction(clip).play());
      }
    });
  
    const clock = new THREE.Clock();
  
    function animate() {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      if (model) model.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
  
    animate();
  
    // Responsive resize
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  
    // Dropdown menu logic
    document.addEventListener('DOMContentLoaded', function () {
      let dropdowns = document.querySelectorAll('.dropdown');
  
      dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('mouseover', function () {
          let menu = this.querySelector('.dropdown-menu');
          menu.classList.add('show');
        });
  
        dropdown.addEventListener('mouseleave', function () {
          let menu = this.querySelector('.dropdown-menu');
          menu.classList.remove('show');
        });
      });
    });
  })();
  