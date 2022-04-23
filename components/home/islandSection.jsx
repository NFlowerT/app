import React, {useContext, useState} from "react"
import style from "../../styles/home/islandSection.module.scss"
import NTree from "../../nTree/NTree"
import {TreesContext} from "../../pages/_app"


const IslandSection = () => {
	const {vw, vh, width} = useContext(TreesContext)
	return (
		<section className={style.main}>

			<div className={style.sectionName}>
				<div className={style.tabContainer}>
					<div className={style.tab}>
						<h2>ISLANDS</h2>
						<img className={style.icon} src="/treeIcon.svg"/>
					</div>
					<div className={style.dop}></div>
				</div>
			</div>
			<div className={style.container}>
				<div className={style.textContainer}>
					<div className={style.text}>
						<div className={style.title}>
							<h2>Czym są drzewka?</h2>
						</div>
						<h3>Lorem ipsum dolor sit amet, t, consectetur adipiscing elit. Cipa convallis sollicitudin cursus. In varius, felis vitae facilisis vulputate, kutas enim tincidunt
							us. In varius, felis vitae facilisis vulputate, metus enim tincidunt leo, ut tempus leo lorem s
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
					dataArray={[]}
					width={width > 900 ? 50 * vw : 90 * vw}
					height={width > 900 ? (80 * vh) : (55 * vh) < (250 * vw) ? (55 * vh) : (250 * vw)}
					className={style.tree}
					cameraPosition={{x: 7, y: 1, z: 7   }}
					y={0}
					innerRadius={2}
					disabled={true}
				/>
			</div>
		</section>
	)
}

export default IslandSection
