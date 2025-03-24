

var scene, mixer, model, camera, renderer, actions = [], clock, mode, btnName;
let loadedModel;
let secondMixer, secondAction = [];

init();

function init() {
	const assetPath = './'; // Path to assets
	scene = new THREE.Scene(); clock = new THREE.Clock();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


	camera.position.x = 5;
	camera.position.z = -5;
	camera.position.y = 4;
	camera.lookAt(0, 0, 0);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);


	// Lighting
	let light

	light = new THREE.DirectionalLight();
	light.position.set(5, -11, -9);
	scene.add(light);

	light = new THREE.DirectionalLight();
	light.position.set(-17, -11, -12);
	scene.add(light);

	light = new THREE.DirectionalLight();
	light.position.set(12, -9, 16);
	scene.add(light);

	light = new THREE.DirectionalLight();
	light.position.set(2, 10, -0.5);
	scene.add(light);

	light = new THREE.DirectionalLight();
	light.position.set(8, 10, -14);
	scene.add(light);

	// Orbital control
	const controls = new
		THREE.OrbitControls(camera,
			renderer.domElement);
	controls.target.set(0, 0, 0);
	controls.update();

	// Button to play the second animation
	/*	
		const secondBtn = document.getElementById("switchModel");
		secondBtn.addEventListener('click', function () {
			if (secondAction.length > 0) {
				secondAction.forEach(action => {
					action.reset()
					action.setLoop(THREE.Loop)
				})
			}
		})
	*/
	// Button to control animations
	mode = 'open';
	const btn = document.getElementById('btn');
	btn.addEventListener('click', function () {
		if (actions.length > 0) {
			//if (mode === "open") {
			actions.forEach(action => {
				action.timeScale = 1;
				action.reset();
				action.play();
			});
			//}
		} else {
			console.warn('No animation available for the second model.');
		}
	});

	// Function to load the model
	const loader = new THREE.GLTFLoader();
	function loadModel(modelPath) {
		if (loadedModel) {
			scene.remove(loadedModel);
		}
		loader.load(modelPath, function (gltf) {
			const model = gltf.scene;
			scene.add(model);

			// Update model target
			loadedModel = model;

			// Set up animations 
			mixer = new THREE.AnimationMixer(model);
			const animations = gltf.animations;
			actions = []; // Clears previous animiations

			animations.forEach(clip => {
				const action = mixer.clipAction(clip);
				actions.push(action);
				action.setLoop(THREE.LoopOnce);
				action.clampWhenFinished = true;
			});

			if (modelPath === 'Assets/CanCrush.glb') {
				secondMixer = mixer;
				secondAction = actions;
			}
		});
	}
	// Inital model
	loadModel('Assets/OpenCan.glb');

	// Set the path of the model and correct btn id
	const switchBtn = document.getElementById('switchModel');
	switchBtn.addEventListener('click', function () {
		loadModel('Assets/CanCrush.glb');
	});



	window.addEventListener('resize', resize, false);

	// Start the animation loop
	animate();

}

function animate() {
	requestAnimationFrame(animate);

	// Update animations
	if (mixer) {
		mixer.update(clock.getDelta());
	}
	if (secondMixer) {
		secondMixer.update(clock.getDelta);
	}

	renderer.render(scene, camera);
}

// Website reize
function resize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
