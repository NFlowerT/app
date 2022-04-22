import React, {useContext, useState} from "react"
import style from "../../styles/home/treeSection.module.scss"
import Image from "next/image"
import NTree from "../../nTree/NTree"
import {TreesContext} from "../../pages/_app"


const TreeSection = () => {
	const { trees} = useContext(TreesContext)
	const rem = typeof document !== "undefined" ? parseFloat(getComputedStyle(document.documentElement).fontSize) : 20
	return (
		<section className={style.main}>
			<div className={style.sectionName}>
				<img src="/TSName.svg" className={style.image}/>
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
					<div className={style.buttonSec}>
						<button className={style.but}>Buy</button>
					</div>
				</div>
				<NTree
					dataArray={trees}
					islandSize={10}
					rockAmount={2}
					width={40 * rem}
					height={30 * rem}
					className={style.tree}
					cameraPosition={{x: 15, y: 1, z: 15}}
					y={-3}
					innerRadius={8}
					disabled={true}
				/>
			</div>
		</section>
	)
}

export default TreeSection
