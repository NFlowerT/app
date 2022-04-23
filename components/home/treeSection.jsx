import React, {useContext, useState} from "react"
import style from "../../styles/home/treeSection.module.scss"
import Image from "next/image"
import NTree from "../../nTree/NTree"
import {TreesContext} from "../../pages/_app"


const TreeSection = () => {
	const {vw, vh, width} = useContext(TreesContext)
	return (
		<section className={style.main}>
			<div className={style.sectionName}>
				<div className={style.tabContainer}>
					<div className={style.tab}>
						<h2>TREES</h2>
						<img className={style.icon} src="/treeIcon.svg"/>
					</div>
					<div className={style.dop}></div>
				</div>
			</div>
			<div className={style.container}>
				<div className={style.textContainer}>
					<div className={style.text}>
						<div className={style.title}>
							<h2>Our trees</h2>
						</div>
						<h3>
							Every tree is generated to be completely random. It grows over time, changes colors depending on the season and has tens of properties like amount of segments, trunk colors and so on.
						</h3>
					</div>
					<div className={style.buttonContainer}>
						{width > 900 && <button className={style.buyButton}><p>Buy</p></button>}
					</div>
				</div>
				{width <= 900 && <button className={style.buyButton}><p>Buy</p></button>}
				<NTree
					islandSize={5}
					rockAmount={2}
					width={width > 900 ? 50 * vw : 90 * vw}
					height={width > 900 ? (80 * vh) : (55 * vh) < (250 * vw) ? (55 * vh) : (250 * vw)}
					className={style.tree}
					cameraPosition={{x: 10, y: 0, z: 10}}
					y={-3}
					innerRadius={2}
					disabled={true}
				/>
			</div>
		</section>
	)
}

export default TreeSection
