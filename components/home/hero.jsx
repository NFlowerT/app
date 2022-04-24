import React, {useContext} from "react"
import style from "../../styles/home/hero.module.scss"
import NTree from "../../nTree/NTree"
import {TreesContext} from "../../pages/_app"
import {BrowserContext} from "../../pages/_app"
import {BsCaretDownFill} from "react-icons/bs"

const Hero =({title, subtitle, trees, scrollToId}) => {
	const {vw, vh, width} = useContext(BrowserContext)
	return (
		<div className={style.heroMain}>
			<div className={style.innerContainer}>
				<div className={style.heroLogoContainer}>
					<div className={style.heroLogo}>
						<h1>{title}</h1>
						<div>{subtitle}</div>
					</div>
				</div>
				{(trees) && <NTree
					dataArray={trees.splice(0, 6)}
					islandSize={10}
					rockAmount={2}
					width={width > 900 ? 39 * vw : 80 * vw}
					height={width > 900 ? 45 * vw : 50 * vh}
					className={style.heroTreeContainer}
					cameraPosition={{x: 15, y: 1, z: 15}}
					y={-3}
					innerRadius={8}
					disabled={true}
				/>}
			</div>
			{scrollToId &&
				<button className={style.scrollButton} onClick={() => document.getElementById(scrollToId).scrollIntoView()}>
					<BsCaretDownFill/>
				</button>
			}
		</div>
	)
}

export default Hero
