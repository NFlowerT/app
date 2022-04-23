import React, {useContext} from "react"
import style from "../../styles/home/hero.module.scss"
import NTree from "../../nTree/NTree"
import {TreesContext} from "../../pages/_app"

const Hero = ({title, subtitle, trees}) => {
	const {vw, vh, width} = useContext(TreesContext)
	return (
		<div className={style.heroMain}>
			<div className={style.innerContainer}>
				<div className={style.heroLogoContainer}>
					<div className={style.heroLogo}>
						<h1>{title}</h1>
						<p>{subtitle}</p>
					</div>
				</div>
				{(trees) && <NTree
					dataArray={trees}
					islandSize={10}
					rockAmount={2}
					width={width > 800 ? 39 * vw : 80 * vw}
					height={width > 800 ? 45 * vw : 50 * vh}
					className={style.heroTreeContainer}
					cameraPosition={{x: 15, y: 1, z: 15}}
					y={-3}
					innerRadius={8}
					disabled={true}
				/>}
			</div>

		</div>
	)
}


export default Hero
