

var scene, mixer, model, camera, renderer, actions = [], clock, mode;

init();

function init() {
	const assetPath = './'; // Path to assets
	scene = new THREE.Scene();clock = new THREE.Clock();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


	camera.position.x = 5;
	camera.position.z = -5;
	camera.position.y = 4;
	camera.lookAt(0, 0, 0);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	//renderer.setAnimationLoop(animate);
	document.body.appendChild(renderer.domElement);

	
	//lighting
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

	//orbital control
	const controls = new
		THREE.OrbitControls(camera,
			renderer.domElement);
	controls.target.set(0, 0, 0);
	controls.update();


	// Button to control animations
	mode = 'open';
	const btn = document.getElementById("btn");
	btn.addEventListener('click', function () {
		if (actions.length === 2) {
			if (mode === "open") {
				actions.forEach(action => {
					action.timeScale = 1;
					action.reset();
					action.play();
				});
			}
		}
	});

	// Load the glTF model
	const loader = new THREE.GLTFLoader();
	loader.load(assetPath + 'Assets/OpenCan.glb', function (gltf) {
		const model = gltf.scene;
		scene.add(model);

		// Set up animations 
		mixer = new THREE.AnimationMixer(model);
		const animations = gltf.animations;

		animations.forEach(clip => {
			const action = mixer.clipAction(clip);
			actions.push(action);
			action.setLoop(THREE.LoopOnce);
			action.clampWhenFinished = true;
		});

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

	renderer.render(scene, camera);
}

function resize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
