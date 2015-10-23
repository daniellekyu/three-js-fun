var gui = new dat.GUI();
var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 2, 10);

var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xffffff);

var fieldOfView = 60;
var aspectRatio = innerWidth/innerHeight;
var nearClip = 0.1;
var farClip = 100;

var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearClip, farClip);
camera.position.z = -5;
camera.position.y = 2;
camera.lookAt(new THREE.Vector3(0, 0, 0));

gui.add(camera.position, 'x', -5, 5).onChange(function() {
	camera.lookAt(new THREE.Vector3(0, 0, 0));
});
gui.add(camera.position, 'y', -5, 5).onChange(function() {
	camera.lookAt(new THREE.Vector3(0, 0, 0));
});
gui.add(camera.position, 'z', -5, 5).onChange(function() {
	camera.lookAt(new THREE.Vector3(0, 0, 0));
});

var colorFolder = gui.addFolder('color');

var sphereGeo = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
var sphereMaterial = new THREE.MeshPhongMaterial( {color: 0xff8000, emissive: 0x202020} );
colorFolder.add(sphereMaterial.color, "r", 0, 1);
colorFolder.add(sphereMaterial.color, "r", 0, 1);
colorFolder.add(sphereMaterial.color, "r", 0, 1);

var blank = new THREE.Geometry();
var planets = [];
var satellites = [];
var boxGeo = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);

for (var i = 0; i < 1000; i++) {
	var boxMaterial = new THREE.MeshPhongMaterial({ color: getRandomColor(), shininess: 30, wireframe: false});
	// var sphereGeo = new THREE.SphereGeometry(1, 32, 32);
	var boxMesh = new THREE.Mesh(blank, boxMaterial);
	boxMesh.rotationSpeed = (Math.random() + 1)/100;
	scene.add(boxMesh);
	planets.push(boxMesh);

	var satellite = new THREE.Mesh(boxGeo, boxMaterial);
	satellite.position.x = 2 + Math.random()/2;
	satellite.position.y = Math.random()/2;
	satellite.scale.set(0.1, 0.1, 0.1);
	satellites.push(satellite);

	boxMesh.add(satellite);
}

var sun = new THREE.PointLight(0xffffff, 1);
scene.add(sun);
sun.position.z = -10;
sun.position.x = 10;

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function update(arg) {
	// boxMesh.rotation.y += 0.01;
	// boxMesh.rotation.y += 0.01;
	// boxMesh.position.y = Math.abs(Math.sin(Date.now()/300));
	// satellite.rotation.y += 0.1;
	// satellite.rotation.x += 0.1;
	renderer.render(scene, camera);
	requestAnimationFrame(update);

	for(var i = 0; i < planets.length; i++) {
		var sphereMesh = planets[i];
		sphereMesh.rotation.y += sphereMesh.rotationSpeed;
	}

	for(var i = 0; i < satellites.length; i++) {
		var satellite = satellites[i];
		satellite.rotation.y += (0.1 + Math.random())/10;
		satellite.rotation.x += (0.1 + Math.random())/10;
	}
}

update();
