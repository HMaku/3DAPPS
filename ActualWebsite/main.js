var scene, camera, renderer;

init();

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	
	camera.position.x = 5;
	camera.position.z = -3;
	camera.lookAt(0,0,0);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animate );
	document.body.appendChild( renderer.domElement );

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

	
	const loader = new THREE.GLTFLoader();
	loader.load("Assets/Can.glb", function (gltf) {
		model = gltf.scene;
		scene.add(model);
		//animate();
	});



	window.addEventListener('resize', onResize, false);
	animate();

}

function animate() {
	requestAnimationFrame(animate);
	if(model)
	{
		model.rotation.y += 0.003;
	}
	
	renderer.render(scene,camera);
}

function onResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}