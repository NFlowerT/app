import React, {useContext} from "react"
import style from "../../styles/home/hero.module.scss"
import NTree from "../../nTree/NTree"
import {TreesContext} from "../../pages/_app"

const Hero = ({title, subtitle}) => {
	const {rem, trees} = useContext(TreesContext)
	return (
		<div className={style.heroMain}>

			<div className={style.heroLogoContainer}>
				<div className={style.heroLogo}>
					<h1>{title}</h1>
					<p>{subtitle}</p>
				</div>

			</div>
			{(trees) ? <NTree
				dataArray={trees}
				islandSize={10}
				rockAmount={2}
				width={40 * rem}
				height={45 * rem}
				className={style.heroTreeContainer}
				cameraPosition={{x: 15, y: 1, z: 15}}
				y={-3}
				innerRadius={8}
				disabled={true}
			/>: null
			}
		</div>
	)
}


export default Hero
