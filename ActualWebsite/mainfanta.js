var scene, camera, renderer;

init();

function init(){
    const container = document.getElementById('model2');
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	
	camera.position.set(7, 3, 0);
	camera.lookAt(0, 0, 0);
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

	const controls = new
	THREE.OrbitControls(camera,renderer.domElement);
	controls.target.set(1, 2, 0);
	controls.update();
	
	const loader = new THREE.GLTFLoader();
	loader.load("Assets/FantaCan.glb", function (gltf) {
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
		model.rotation.y += 0.001;
	}
	
	renderer.render(scene,camera);
}

function onResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

dropDown();
function dropDown()
{
	document.addEventListener("DOMContentLoaded", function () {
		let dropdowns = document.querySelectorAll(".dropdown");

		dropdowns.forEach(function (dropdown) {
			dropdown.addEventListener("mouseover", function () {
				let menu = this.querySelector(".dropdown-menu");
				menu.classList.add("show");
			});

			dropdown.addEventListener("mouseleave", function () {
				let menu = this.querySelector(".dropdown-menu");
				menu.classList.remove("show");
			});
		});
	});
}