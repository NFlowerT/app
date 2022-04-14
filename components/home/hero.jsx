import React from "react"
import style from "../../styles/home/hero.module.scss"

const Hero = ({mint}) => {
	return (
		<div className={style.container}>
			Hero section
			<button onClick={async ()=>await mint()}> buy tree</button>
		</div>
	)
}

export default Hero
