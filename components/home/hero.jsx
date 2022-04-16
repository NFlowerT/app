import React from "react"
import style from "../../styles/home/hero.module.scss"

const Hero = ({mint}) => {
	return (
		<div className={style.heroMain}>
			<div className={style.heroLogoContainer}>
				<div className={style.heroLogo}>
					<h1>FORESTA</h1>
					<p>MAKE YOUR FOREST FLY</p>
				</div>

			</div>
			<div className={style.heroTreeContainer}>

			</div>
		</div>
	)
}

export default Hero
