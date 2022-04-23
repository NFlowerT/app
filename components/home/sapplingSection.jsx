import React, {useContext, useState} from "react"
import style from "../../styles/home/saplingSection.module.scss"

const SaplingSection = () => {
	return (
		<section className={style.main}>
			<div className={style.sectionName}>
				<h2>SAPLINGS</h2>
			</div>

			<div className={style.container}>
				<div className={style.title}>
					<h1>CHOOSE YOUR TREE</h1>
				</div>
				<div className={style.saplingContainer}>
					<div className={style.saplingTile}>
						<div className={style.saplingImg}></div>
						<div className={style.saplingName}>
							<h4>ORZESZEK</h4>
						</div>
					</div>
					<div className={style.saplingTile}>
						<div className={style.saplingImg}></div>
						<div className={style.saplingName}>
							<h4>ORZESZEK</h4>
						</div>
					</div>
					<div className={style.saplingTile}>
						<div className={style.saplingImg}></div>
						<div className={style.saplingName}>
							<h4>ORZESZEK</h4>
						</div>
					</div>
				</div>

			</div>
		</section>
	)
}

export default SaplingSection
