import React, {useContext} from "react"
import style from "../../styles/home/buySapling.module.scss"
import {RiCloseFill} from "react-icons/ri"
import NTree from "../../nTree/NTree"
import {BrowserContext} from "../../pages/_app"

const BuySapling = ({setSapling, mint}) => {
	const {rem, width, vw, vh} = useContext(BrowserContext)
	return (
		<div className={style.background}>
			<div className={style.container}>
				<RiCloseFill className={style.close} onClick={() => setSapling(false)}/>
				<NTree
					disabled={true}
					width={width > 900 ? 20 * vw : 80 * vw}
					height={width > 900 ? 30 * rem : 30 * vh}
					cameraPosition={{x: 6, y: -2, z: 6}}
					className={style.treeContainer}
					y={-2.5}
					age={12}
				/>
				<div className={style.textContainer}>
					<h1>
						BUY YOUR
					</h1>
					<h2>
						Pine sapling
					</h2>
					<button onClick={async () => await mint()}>BUY</button>
				</div>
			</div>
		</div>
	)
}

export default BuySapling
