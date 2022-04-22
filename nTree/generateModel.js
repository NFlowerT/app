import {AmbientLight, DirectionalLight, MOUSE, PerspectiveCamera, Scene, WebGL1Renderer} from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export const generateModel = (group, container, width, height, cameraPosition, disabled) => {
	const scene = new Scene()
	const camera = new PerspectiveCamera( 75, width / height, 0.1, 500)
	camera.position.set( cameraPosition.x, cameraPosition.y, cameraPosition.z )

	//light
	const light = new AmbientLight( 0x404040 )
	scene.add( light )
	const lights = [
		{intensity: 1.1, x: 10000, y: 10000, z: 10000},
		{intensity: 0.1, x: 0, y: 10, z: 10},
		{intensity: 0.1, x: 10, y: 10, z: -10},
		{intensity: 0.1, x: -10, y: 10, z: -10},
		{intensity: 0.4, x: 0, y: -20, z: 0},
	]
	lights.forEach(({intensity, x, y, z}) => {
		const directionalLight = new DirectionalLight( "#ffffff", intensity )
		directionalLight.position.set(x, y, z)
		scene.add( directionalLight )
	})
	//renderer
	const renderer = new WebGL1Renderer({alpha: true})
	renderer.setSize( width, height)
	container.current.innerHTML = ""
	container.current.appendChild( renderer.domElement )

	//controls
	let stop = false
	const controls = new OrbitControls( camera, renderer.domElement)
	if (!disabled){
		controls.mouseButtons = {
			LEFT: MOUSE.ROTATE,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.PAN
		}
	} else {
		controls.mouseButtons = {}
	}
	controls.update()
	controls.addEventListener( "change", () => {
		stop = true
		renderer.render(scene, camera)
	})
	// controls.minDistance = 25
	// controls.maxDistance = 200

	const animate = () => {
		if (!stop){
			requestAnimationFrame(animate)
			group.rotateY(0.004)
			renderer.render( scene, camera )
		}
	}
	animate()
	scene.add(group)
	// let image = renderer.domElement.toDataURL()
	// console.log(image)
	// return {image: image}
}
