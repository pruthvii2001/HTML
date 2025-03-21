// script.js

document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('3d-viewer');
    const productCards = document.querySelectorAll('.product-card');

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, viewer.offsetWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(viewer.offsetWidth, 400);
    viewer.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(light);

    let currentModel = null;

    function loadModel(modelPath) {
        const loader = new THREE.GLTFLoader();
        loader.load(
            modelPath,
            (gltf) => {
                if (currentModel) {
                    scene.remove(currentModel);
                }
                currentModel = gltf.scene;
                scene.add(gltf.scene);
                camera.position.z = 5;
            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the 3D model:', error);
            }
        );
    }

    // Rotate the model for a dynamic effect
    function animate() {
        requestAnimationFrame(animate);
        if (currentModel) currentModel.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Add event listeners to product cards
    productCards.forEach((card) => {
        card.addEventListener('click', () => {
            const modelPath = card.dataset.model;
            loadModel(modelPath);
        });
    });
});
