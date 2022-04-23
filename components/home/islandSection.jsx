import React, {useContext} from "react"
import style from "../../styles/home/islandSection.module.scss"
import NTree from "../../nTree/NTree"
import {TreesContext} from "../../pages/_app"


const IslandSection = () => {
	const {rem} = useContext(TreesContext)
	return (
		<section className={style.main}>
			<div className={style.sectionName}>
				<img src="/ISName.svg" className={style.image}/>
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
				<div className={style.tree}>
					<NTree
						dataArray={[]}
						islandSize={10}
						rockAmount={2}
						width={40 * rem}
						height={45 * rem}
						cameraPosition={{x: 15, y: 1, z: 15}}
						y={0}
						innerRadius={8}
						disabled={true}
					/>
				</div>
			</div>
		</section>
	)
}

export default IslandSection
