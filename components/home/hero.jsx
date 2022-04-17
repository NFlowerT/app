import React from "react"
import style from "../../styles/home/hero.module.scss"

const Hero = ({mint, title, subtitle}) => {
	return (
		<div className={style.heroMain}>

			<div className={style.heroLogoContainer}>
				<div className={style.heroLogo}>
					<h1>{title}</h1>
					<p>{subtitle}</p>
				</div>

			</div>
			<div className={style.heroTreeContainer}>

			</div>
		</div>
	)
}

export default Hero
