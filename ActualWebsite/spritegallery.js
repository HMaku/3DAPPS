

var scene, mixer, model, camera, renderer, actions = [], clock, mode, btnName;
let loadedModel;
let secondMixer, secondAction = [];
let currentModelIndex = 0
let modelPaths = ['Assets/OpenCanSprite.glb', 'Assets/CanCrushSprite.glb'];
init();

function init() {
    scene = new THREE.Scene(); clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const cameraPositions = [
        { x: -4, y: 5, z: 2 },  // For FantaCan
        { x: 30, y: 15, z: -20 } // For CanCrushFanta
    ];
    const newCam = cameraPositions[currentModelIndex];
    camera.position.set(newCam.x, newCam.y, newCam.z);
    camera.lookAt(0, 0, 0);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let wireframeEnabled = false;

    document.getElementById('toggleWireframe').addEventListener('click', function () {
        if (!loadedModel) return;

        wireframeEnabled = !wireframeEnabled;

        loadedModel.traverse(child => {
            if (child.isMesh) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => mat.wireframe = wireframeEnabled);
                } else {
                    child.material.wireframe = wireframeEnabled;
                }
            }
        });
    });

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
      
    // Orbital control
    const controls = new
        THREE.OrbitControls(camera,
            renderer.domElement);
    controls.target.set(0, 2, 0);
    controls.update();

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

            // if (modelPath === 'Assets/Can3Crush2.glb') {
            //     secondMixer = mixer;
            //     secondAction = actions;
            // }
        });
    }
    // Inital model
    loadModel('Assets/OpenCanSprite.glb');

    // Set the path of the model and correct btn id
    const switchBtn = document.getElementById('switchModel');
    switchBtn.addEventListener('click', function () {
        currentModelIndex = (currentModelIndex + 1) % modelPaths.length
        const newPath = modelPaths[currentModelIndex];
        loadModel(newPath);
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
        secondMixer.update(clock.getDelta());
    }

    renderer.render(scene, camera);
}

// Website reize
function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
