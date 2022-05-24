import React, {useContext} from "react"
import style from "../../styles/home/islandSection.module.scss"
import NTree from "../../nTree/NTree"
import {BrowserContext} from "../../pages/_app"


const IslandSection = () => {
	const {vw, vh, width, height} = useContext(BrowserContext)
	return (
		<section className={style.main} id={"islandSection"}>
			<div className={style.sectionName}>
				<div className={style.tabContainer}>
					<div className={style.tab}>
						<h2>ISLANDS</h2>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img className={style.icon} src="/treeIcon.svg" alt={""}/>
					</div>
					<div className={style.dop}></div>
				</div>
			</div>
			<div className={style.container}>
				<div className={style.textContainer}>
					<div className={style.text}>
						<div className={style.title}>
							<h2>The Island</h2>
						</div>
						<h3>
							The island is has been carefully crafted to look ideal. Every tree is placed on it, by drawing a random point on its top face.
						</h3>
					</div>
					<div className={style.buttonContainer}>
						{width > 900 && <button className={style.buyButton} onClick={() => document.getElementById("saplingSection").scrollIntoView()}><p>Scroll</p></button>}
					</div>
				</div>
				{width <= 900 && <button className={style.buyButton} onClick={() => document.getElementById("saplingSection").scrollIntoView()}><p>Scroll</p></button>}
				<NTree
					islandSize={(width > height) ? 5 : 3}
					rockAmount={(width > height) ? 5 : 2}
					dataArray={[]}
					width={width > 900 ? 50 * vw : 90 * vw}
					height={width > 900 ? (80 * vh) : (55 * vh) < (250 * vw) ? (55 * vh) : (250 * vw)}
					className={style.tree}
					cameraPosition={{x: 7, y: 1, z: 7   }}
					y={0}
					innerRadius={(width > height) ? 4 : 2}
					disabled={true}
				/>
			</div>
		</section>
	)
}

export default IslandSection
