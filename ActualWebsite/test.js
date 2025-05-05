//Testing js only

<script src="https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.157.0/examples/js/loaders/GLTFLoader.js"></script>

<script>
const modelConfigs = [
  { id: 'model1', path: 'Assets/Model1.glb' },
  { id: 'model2', path: 'Assets/Model2.glb' },
  { id: 'model3', path: 'Assets/Model3.glb' }
];

const mixers = [];

modelConfigs.forEach((config, index) => {
  const container = document.getElementById(config.id);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(3, 2, 5);
  camera.lookAt(0, 1, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  const loader = new THREE.GLTFLoader();
  loader.load(config.path, gltf => {
    const model = gltf.scene;
    scene.add(model);

    if (gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach(anim => {
        const action = mixer.clipAction(anim);
        action.play();
      });
      mixers.push({ mixer, renderer, scene, camera });
    } else {
      mixers.push({ mixer: null, renderer, scene, camera });
    }
  });
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  mixers.forEach(obj => {
    if (obj.mixer) obj.mixer.update(delta);
    obj.renderer.render(obj.scene, obj.camera);
  });
}
animate();
</script>






































// var scene, camera, renderer, clock, mixer, actions = [], mode, isWireframe = false;
// let loadedModel; // Variable to store the current model
// let secondModelMixer, secondModelActions = []; // Separate mixer and actions for the second model

// init();

// function init() {
// 	const assetPath = './'; // Path to assets
// 	scene = new THREE.Scene(); clock = new THREE.Clock();
// 	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


// 	camera.position.x = 5;
// 	camera.position.z = -5;
// 	camera.position.y = 4;
// 	camera.lookAt(0, 0, 0);
// 	renderer = new THREE.WebGLRenderer();
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	document.body.appendChild(renderer.domElement);


// 	// Lighting
// 	let light

// 	light = new THREE.DirectionalLight();
// 	light.position.set(5, -11, -9);
// 	scene.add(light);

// 	light = new THREE.DirectionalLight();
// 	light.position.set(-17, -11, -12);
// 	scene.add(light);

// 	light = new THREE.DirectionalLight();
// 	light.position.set(12, -9, 16);
// 	scene.add(light);

// 	light = new THREE.DirectionalLight();
// 	light.position.set(2, 10, -0.5);
// 	scene.add(light);

// 	light = new THREE.DirectionalLight();
// 	light.position.set(8, 10, -14);
// 	scene.add(light);

// 	// Orbital control
// 	const controls = new
// 		THREE.OrbitControls(camera,
// 			renderer.domElement);
// 	controls.target.set(0, 0, 0);
// 	controls.update();
// }

//  // Add event listener for the play second model animation button
//   const playSecondModelAnimationBtn = document.getElementById("btn");
//   playSecondModelAnimationBtn.addEventListener('click', function () {
//     if (secondModelActions.length > 0) {
//       secondModelActions.forEach(action => {
//         action.reset();
//         action.setLoop(THREE.LoopOnce); // Play the animation only once
//         action.clampWhenFinished = true; // Stop at the last frame
//         action.play();
//       });
//     } else {
//       console.warn('No animation available for the second model.');
//     }
//   });

//   // Function to load a model
//   const loader = new THREE.GLTFLoader();
//   function loadModel(modelPath) {
//     // Remove the current model if it exists
//     if (loadedModel) {
//       scene.remove(loadedModel);
//     }

//     // Load the new model
//     loader.load(modelPath, function (gltf) {
//       const model = gltf.scene;

//       // Set the position and add it to the scene
//       model.position.set(0, 0, 0); // Same position as the previous model
//       scene.add(model);

//       // Update the reference to the loaded model
//       loadedModel = model;

//       // Reset animations if applicable
//       mixer = new THREE.AnimationMixer(model);
//       const animations = gltf.animations; // Array of animation clips
//       actions = []; // Clear previous actions

//       animations.forEach(clip => {
//         const action = mixer.clipAction(clip);
//         actions.push(action);
//       });

//       // If this is the second model, set up its separate mixer and actions
//       if (modelPath === 'Assets/CanCrush.glb') {
//         secondModelMixer = mixer;
//         secondModelActions = actions; // Store the second model's animations separately
//       }
//     });
//   }

//   // Initial model load
//   loadModel('Assets/OpenCan.glb');

//   // Add event listener for the switch model button
//   const switchBtn = document.getElementById("switchModel");
//   switchBtn.addEventListener('click', function () {
//     loadModel('Assets/CanCrush.glb'); // Path to the new model
//   });


// function animate() {
//   requestAnimationFrame(animate);

//   // Update animations for both models
//   if (mixer) mixer.update(clock.getDelta());
//   if (secondModelMixer) secondModelMixer.update(clock.getDelta());

// }