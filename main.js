import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RGBELoader } from './js/RGBELoader.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';



import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';



const renderer = new THREE.WebGLRenderer();
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
//renderer.setPixelRatio(1);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

document.body.appendChild(renderer.domElement);

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

let mouseDownPosition = null;
let newTexture;
let originalTexture;
let toyotaTexture;

newTexture = new THREE.TextureLoader().load('/public/arcade2/textures/newTexture.png', (texture) => {
  texture.flipY = true;
  texture.flipX = false;
});
originalTexture = new THREE.TextureLoader().load('/public/arcade2/textures/originalTexture.png', (texture) => {
  texture.flipY = false;
  texture.flipX = false;
});
toyotaTexture = new THREE.TextureLoader().load('/public/arcade2/textures/toyotaImg.png', (texture) => {
  texture.flipY = false;
  texture.flipX = false;
});


function updateTexture(mesh) {
  if (mesh === buttonMeshFwd) {
    // Update with new texture
    screenMesh.material.map = newTexture;
  } else if (mesh === buttonMeshBack) {
    // Revert to original texture
    screenMesh.material.map = originalTexture;
  } else if (mesh === skill1){
    screen4tex.material.map = toyotaTexture;
  }
  screenMesh.material.needsUpdate = true;
}
const onMouseDown = (event) => {
  mouseDownPosition = {
    x: event.clientX,
    y: event.clientY,
  };

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
};





const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(-7, -5, 0);

let buttonMeshFwd = null;
let buttonMeshBack = null;
let screenMesh = null;
let joystick, arcadeMachineBlackBars, arcadeMachineBody, arcadeMachinePinkBars, butBack, butFwd = null;
var mesh;
let neonAboutMe, neonProgramming, neonLatest, neonBlender, neonContact;
let githubMesh, LinkedinMesh, LinkedinMesh_1, gmailMesh, gmailMesh_1, gmailMesh_2, gmailMesh_3, gmailMesh_4, gmailMesh_5, gumroad1;
let wumpusMesh, wumpusMesh_1, wumpusMesh_2, wumpusMesh_3, wumpusMesh_4, wumpusMesh_5, wumpusMesh_6;
let linktreeMesh_1, linktreeMesh, skill1Mesh, skill2Mesh, skill3Meh, skill4Mesh;
let skill1, skill2, skill3, skill4;
let screen1tex, screen2tex, screen3tex, screen4tex;
var loader = new GLTFLoader().setPath('public/arcade2/');
loader.load('scene.gltf', (gltf) => {
  mesh = gltf.scene;
  mesh.traverse((child) => {
    // Set casting and receiving shadows for all meshes
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = true;
    }
  });

  // Log the name of all meshes
  mesh.traverse((child) => {
    if (child.isMesh && child.name) {
      //console.log(`Mesh name: ${child.name}`);

      // Check the name and perform actions
      if (mesh) {
        switch (child.name) {
          case 'butFwd':
            buttonMeshFwd = child;
            break;
          case 'screen':
            screenMesh = child;
            screenMesh.material.map = originalTexture;
            break;
          case 'butBack':
            buttonMeshBack = child;
            break;
          case 'glass1':
          case 'glass2':
          case 'glass3':
          case 'glass4':
          case 'glass5':
          case 'glass6':
          case 'glass7':
            child.material = glassMaterial; 
            break;
          case 'joystick':
            joystick = child;
            break;
          case 'arcadeMachineBlackBars':
            arcadeMachineBlackBars = child;
            break;
          case 'arcadeMachineBody':
            arcadeMachineBody = child;
            break;
          case 'arcadeMachinePinkBars':
            arcadeMachinePinkBars = child;
            break;
          case 'neonAboutMe':
            neonAboutMe = child;
            break;
          case 'neonProgramming':
            neonProgramming = child;
            break;
          case 'neonLatest':
            neonLatest = child;
            break;
          case 'neonBlender':
            neonBlender = child;
            break;
          case 'neonContact':
            neonContact = child;
            break;
          case 'butBack':
            butBack = child;
            break;
          case 'butFwd':
            butFwd = child;
            break;
         case 'githubMesh':
            githubMesh = child;
            break;
          case 'LinkedinMesh':
            LinkedinMesh = child;
            break;
            case 'LinkedinMesh_1':
            LinkedinMesh_1 = child;
            break;
          case 'gmailMesh':
            gmailMesh = child;
            break;
          case 'gmailMesh_1':
            gmailMesh_1 = child;
            break;
          case 'gmailMesh_2':
            gmailMesh_2 = child;
            break;
          case 'gmailMesh_3':
            gmailMesh_3 = child;
            break;
          case 'gmailMesh_4':
            gmailMesh_4 = child;
            break;
          case 'gmailMesh_5':
            gmailMesh_5 = child;
            break;
           case 'gumroad1':
            gumroad1 = child;
            break;
          case 'wumpusMesh':
            wumpusMesh = child;
            break;
          case 'wumpusMesh_1':
            wumpusMesh_1 = child;
            break;
          case 'wumpusMesh_2':
            wumpusMesh_2 = child;
            break;
          case 'wumpusMesh_3':
            wumpusMesh_3 = child;
            break;
          case 'wumpusMesh_4':
            wumpusMesh_4 = child;
            break;
          case 'wumpusMesh_5':
            wumpusMesh_5 = child;
            break;
          case 'wumpusMesh_6':
            wumpusMesh_6 = child;
            break;
          case 'linktreeMesh':
            linktreeMesh = child;
            break;
          case 'linktreeMesh_1':
            linktreeMesh_1 = child;
            break;
            case 'skill1':
            skill1 = child;
            console.log('clicked');
            break;
            case 'skill1Mesh':
            skillMesh = child;
            console.log('clicked');
            break;
            case 'skill3Meh':
            skill3Meh = child;
            break;
            case 'skill4Mesh':
            skill4Mesh = child;
            break;
            case 'screen1tex':
            screen1tex = child;
            break;
            case 'screen2tex':
            screen2tex = child;
            break;
            case 'screen3tex':
            screen3tex = child;
            break;
            case 'screen4tex':
            screen4tex = child;
            break;
            case 'screen5tex':
            screen5tex = child;
            break;
          
        }
      }
    
}});
  const size = 1
  
  mesh.position.set(-2.4, 0, 2.4);
  mesh.rotation.set(0, 0, 0);
  mesh.scale.set(size, size, size);
  scene.add(mesh);

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  document.getElementById('progress').innerHTML = `LOADING ${Math.max(xhr.loaded / xhr.total, 1) * 100}/100`;
});



const onMouseUp = (event) => {
  const mouseUpPosition = {
    x: event.clientX,
    y: event.clientY,
  };

  const positionDelta = {
    x: mouseUpPosition.x - mouseDownPosition.x,
    y: mouseUpPosition.y - mouseDownPosition.y,
  };

  const threshold = 20; 
  const isSignificantMovement = Math.abs(positionDelta.x) > threshold || Math.abs(positionDelta.y) > threshold;
  if (!isSignificantMovement) 
  {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      for (const intersect of intersects) {
        const mesh = intersect.object;
        console.log(`Mesh name: ${mesh.name}`);
        if (mesh === buttonMeshFwd || mesh === buttonMeshBack || mesh === skill1) {
          updateTexture(mesh);
          break; // Stop iterating after handling Fwd or Back
        }
        // Log the mesh's children
        if (mesh.children.length > 0) {
          for (const child of mesh.children) {
            console.log(`  Child name: ${child.name}`);
          }
        }
    
        // Break out of the loop after logging the first mesh
        break;
      }
    }
    if (mesh){
      if (intersects.length >0) {
        if (intersects[0].object === screenMesh || intersects[0].object === arcadeMachineBlackBars || intersects[0].object === arcadeMachineBody || intersects[0].object === arcadeMachinePinkBars || intersects[0].object === butBack || intersects[0].object === butFwd || intersects[0].object === joystick) 
        {
        const timeline = new TimelineMax();
            const center = new THREE.Vector3(0,1,0);
            
            timeline.to(camera.position,1, {
              x:-0.82,
              y:1.6,
              z:4.97,
              onUpdate: function() {
                camera.lookAt( center );
              }
            }, 'easeInOutQuad');
            // Play the timeline
            timeline.play();
          }
      }
    }
    var timeline = null;
    if (mesh) {
      if (intersects.length > 0) {
        switch (intersects[0].object) {
          case neonAboutMe:
            timeline = new TimelineMax();
            timeline.to(camera.position,1, {
              x: -4,
              y: 2,
              z:3,
            }, 'easeInOutQuad');
            // Play the timeline
            timeline.play();
            break;
            case neonProgramming:
            timeline = new TimelineMax();
            timeline.to(camera.position,2.5, {
              x:6.3,
              y:2.31,
              z:1.44,
            }, 'easeInOutQuad');
            // Play the timeline
            timeline.play();
            break;

          case neonLatest:
            timeline = new TimelineMax();
            timeline.to(camera.position,1, {
              x:0,
              y:3,
              z:6,
            }, 'easeInOutQuad');
            // Play the timeline
            timeline.play();
            break;
          case neonBlender:
           timeline = new TimelineMax();
            timeline.to(camera.position,1, {
              x:0,
              y:2,
              z:-6,
            }, 'easeInOutQuad');
            // Play the timeline
            timeline.play();
            break;
          case neonContact:
            timeline = new TimelineMax();
            timeline.to(camera.position,1, {
              x:-5,
              y:1.6,
              z:0.2,
            }, 'easeInOutQuad');
            // Play the timeline
            timeline.play();
            break;
            
        }
      }
    }
    if (intersects.length > 0) {
      if(intersects[0].object === wumpusMesh || intersects[0].object === wumpusMesh_1 || intersects[0].object === wumpusMesh_2 || intersects[0].object === wumpusMesh_3 || intersects[0].object === wumpusMesh_4 || intersects[0].object === wumpusMesh_5 || intersects[0].object === wumpusMesh_6) { window.open("https://www.google.com/")};
      if(intersects[0].object === githubMesh) {window.open("https://github.com/Realm07")};
      if(intersects[0].object === gmailMesh || intersects[0].object === gmailMesh_1 || intersects[0].object === gmailMesh_2 || intersects[0].object === gmailMesh_3 || intersects[0].object === gmailMesh_4 || intersects[0].object === gmailMesh_5 ) {window.open("https://www.google.com/")};
      if(intersects[0].object === gumroad1) {window.open("https://gumroad.com/")};
      if(intersects[0].object === LinkedinMesh || intersects[0].object === LinkedinMesh_1) {window.open("https://www.linkedin.com/in/mohammad-shees-abdullah-25a042291/")};
      if(intersects[0].object === linktreeMesh || intersects[0].object === linktreeMesh_1) {window.open("https://linktr.ee/")};
      //if(intersects[0].object === linktreeMesh_1) {window.open("https://www.google.com/")};
    }
  }
};

window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);



let homeButton = document.getElementById('Home');
  homeButton.addEventListener("click", function() {
  
    console.log('clicked');
    const timeline = new TimelineMax();
    const center = new THREE.Vector3(0, 1,0);
  
    timeline.to(camera.position, 1.5, {
      x:-8.11,
      y:1.85,
      z:-2.67,
      onUpdate: function() {
        camera.lookAt( center );
      }
    }, 'easeInOutQuad');
    timeline.play();
  
  });
  
 /* timeline.to(homeButton, 0.5, {
    rotation: 360*2,
    ease: Power0.easeInOut
  });*/

const renderScene = new RenderPass(scene, camera);
renderScene.clearAlpha = 0;
const composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);
composer.addPass(renderScene);


const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.225,
  0.05,
  0.01
);



renderer.outputColorSpace = THREE.SRGBColorSpace;
composer.addPass(renderScene);
composer.addPass(bloomPass);

/*const bloomComposer = new EffectComposer(renderer);
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);
composer.addPass(bloomPass);*/
//const outputPass = new OutputPass();
//bloomComposer.addPass(outputPass);



const hdrEquirect = new RGBELoader()
				.setPath( '/public/arcade2/textures/' )
				.load( 'autumn_field_1k.hdr', function (texture) {
          texture.mapping = THREE.PlanarReflectionMapping;
          //scene.background = texture;
          scene.environment = texture;
  } 
);
// Create GridHelper
/*const gridHelper = new THREE.GridHelper(10, 10);
gridHelper.position.set(0, 0, 0); // Place the grid at the origin
scene.add(gridHelper);

// Create AxesHelper
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.set(0, 0, 0); // Place the axes at the origin
scene.add(axesHelper);*/


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


window.addEventListener('mousedown', onMouseDown);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enablePan = false;
controls.enableZoom = false;
controls.minDistance = 5.5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.autoRotateSpeed *= -2.5;
controls.target = new THREE.Vector3(0, 1.25, 0);
controls.update();
controls.addEventListener('change', () => {
//console.log(`X = ${Math.round(camera.position.x, 2)},\nY = ${Math.round(camera.position.y,2)},\nZ = ${Math.round(camera.position.z,2)}`);
//console.log(`X = ${camera.position.x},\nY = ${camera.position.y},\nZ = ${camera.position.z}`);
});

const controls2 = new TrackballControls(camera, renderer.domElement);
controls2.noRotate = true;
controls2.noPan = true;
controls2.noZoom = false;
controls2.zoomSpeed = 0.3;

const groundGeometry = new THREE.PlaneGeometry(40, 40, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);

const gui = new GUI();

const autoRotateController = gui.add(controls, 'autoRotate');

autoRotateController.onChange((value) => {
  controls.autoRotate = value;
});


const texture = new THREE.CanvasTexture( generateTexture() );
				texture.magFilter = THREE.NearestFilter;
				texture.wrapT = THREE.RepeatWrapping;
				texture.wrapS = THREE.RepeatWrapping;
				texture.repeat.set( 0.5, 0.5 );


const params = {
  color: 0x404040,
  transmission: 0,
  opacity: 1,
  clearcoat: 1,
  metalness: 0,
  roughness: 0.8,
  ior: 1.5,
  thickness: 0.01,
  specularIntensity: 1,
  specularColor: 0xffffff,
  envMapIntensity: 0.5,
  lightIntensity: 1,
  exposure: 1
};


const params1 = {
  color: 0xffffff,
  transmission: 1,
  opacity: 1,
  clearcoat: 1,
  metalness: 0,
  roughness: 0.05,
  ior: 1.5,
  thickness: 0.01,
  specularIntensity: 1,
  specularColor: 0xffffff,
  envMapIntensity: 1,
  lightIntensity: 1,
  exposure: 1
};

const groundMaterial = new THREE.MeshPhysicalMaterial( {
  color: params.color,
  metalness: params.metalness,
  roughness: params.roughness,
  ior: params.ior,
  clearcoat: params.clearcoat,
  alphaMap: texture,
  envMap: hdrEquirect,
  envMapIntensity: params.envMapIntensity,
  transmission: params.transmission, 
  specularIntensity: params.specularIntensity,
  specularColor: params.specularColor,
  opacity: params.opacity,
  side: THREE.DoubleSide,
  transparent: true
} );

const glassMaterial = new THREE.MeshPhysicalMaterial( {
  color: params1.color,
  metalness: params1.metalness,
  roughness: params1.roughness,
  ior: 1.1,
  clearcoat: params1.clearcoat,
  alphaMap: texture,
  envMap: hdrEquirect,
  envMapIntensity: params1.envMapIntensity,
  transmission: params1.transmission, 
  specularIntensity: params1.specularIntensity,
  specularColor: params1.specularColor,
  opacity: params1.opacity,
  side: THREE.DoubleSide,
  transparent: true
} );


const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

function generateTexture() {

  const canvas = document.createElement( 'canvas' );
  canvas.width = 2;
  canvas.height = 2;

  const context = canvas.getContext( '2d' );
  context.fillStyle = 'white';
  context.fillRect( 0, 1, 2, 1 );

  return canvas;

}



const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.22, 1);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
spotLight.position.set(0, 25, 0);
scene.add(spotLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);


function animate() {
  requestAnimationFrame(animate);
  const target = controls.target;
  controls.update();
  controls2.target.set(target.x, target.y, target.z);
  controls2.update();
  // renderer.render(scene, camera);
  composer.render();
}

animate();