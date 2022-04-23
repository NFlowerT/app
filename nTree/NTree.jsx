// noinspection JSSuspiciousNameCombination

import {useEffect, useRef} from "react"
import {Group, Vector3} from "three"
import {decoder} from "./decoder"
import {generateTrunk} from "./trunk"
import {generateTop} from "./treeTops"
import {createIsland} from "./island"
import {MeshSurfaceSampler} from "three/examples/jsm/math/MeshSurfaceSampler"
import {rock} from "./rock"
import {generateModel} from "./generateModel"

const NTree = ({
	dataArray = [{id: 0, tree: {birthdate: 15, genes: "#52473e&0.68&0.83&0.33|0.00|0|57.94,0.03|0.80|0|96.48,0.39|1.60|0|33.90,0.26|2.40|0|31.57,0.10|3.20|0|62.56,0.29|4.00|0|6.20^#647a26&3.8&0.1&0.2&4.10|2.46|3.30|-20.00,3.48|2.09|3.30|30.00,2.96|1.78|3.50|30.00,2.52|1.51|3.30|10.00,2.14|1.28|3.30|-30.00&2&0&0"}}],
	rockAmount = 0, islandSize = 3, width = 500, height = 500,
	className = "", cameraPosition = {x: 13, y: 1, z: 13}, y = 0, innerRadius = 1.5,
	disabled = false,
	age=15
}) => {
	const container = useRef(null)

	const growTree = (start, dna, age) => {
		const {trunkData, topData, scale} = decoder(dna, age)
		const {trunkMesh, trunkTop} = generateTrunk(trunkData)
		const topMesh = topData && generateTop(trunkTop, topData)
		const group = new Group()
		group.add(trunkMesh)
		topData && group.add(topMesh)
		group.position.set(start.x, start.y, start.z)
		group.scale.set(scale,scale,scale)
		return {mesh: group, width: topData.data[0].bottomRadius}
	}

	useEffect(() => {
		const islandMesh = createIsland(islandSize)
		const group = new Group()
		group.add(islandMesh)

		const sampler = new MeshSurfaceSampler(islandMesh).build()
		const tempPosition = new Vector3()
		const meshPositions = []

		let treeCounter = 0
		while (treeCounter < dataArray.length){
			sampler.sample(tempPosition)
			if(new Vector3(0,0,0).distanceTo(tempPosition) < (innerRadius)){
				const {mesh, width} = growTree(
					tempPosition,
					dataArray[treeCounter].tree.genes,
					age
				)
				let check = true
				meshPositions.forEach(item => {
					if (item.position.distanceTo(mesh.position) < item.width + 1.5)
						check = false
				})
				if (check){
					group.add(mesh)
					meshPositions.push({position: mesh.position, width: width})
					treeCounter++
				}
			}
		}

		let rockCounter = 0
		while (rockCounter <= rockAmount){
			sampler.sample(tempPosition)
			let mesh = rock(tempPosition)
			if (tempPosition.y > -3 && new Vector3(0,0,0).distanceTo(tempPosition) < (innerRadius)){
				mesh.position.set(tempPosition.x, tempPosition.y, tempPosition.z)
				let check = true
				meshPositions.forEach(item => {
					if (item.position.distanceTo(mesh.position) < 1)
						check = false
				})
				if (check){
					group.add(mesh)
					meshPositions.push({position: mesh.position, width: 1})
					rockCounter++
				}
			}
		}
		group.translateY(y)
		generateModel(group, container, width, height, cameraPosition, disabled)
	}, [dataArray, width, height])

	return (
		<div ref={container} className={className}/>
	)
}

export default NTree
