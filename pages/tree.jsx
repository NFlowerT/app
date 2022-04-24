import React, {useContext} from "react"
import {useRouter} from "next/router"
import NTree from "../nTree/NTree"
import {BrowserContext} from "./_app"
import style from "../styles/tree/tree.module.scss"
import {BsArrowsMove} from "react-icons/bs";

const Tree = () => {
	const {vw, vh} = useContext(BrowserContext)
	const genes = typeof window !== "undefined" ? window.location.hash : ""
	return (
		<>
			<NTree
				dataArray={[{id: 0, tree: {birthdate: 15, genes: genes}}]}
				width={100 * vw}
				height={100 * vh}
				islandSize={5}
				cameraPosition={{x: 10, y: 0, z: 10}}
				y={-3}
			/>
			<button className={style.moveButton}>
				<BsArrowsMove/>
			</button>
		</>

	)
}

export default Tree
