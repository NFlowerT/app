import React from "react"
import style from "../../styles/home/buySapling.module.scss"
import {RiCloseFill} from "react-icons/ri"

const BuySapling = ({setSapling, mint}) => {
	return (
		<div className={style.background}>
			<div className={style.container}>
				<RiCloseFill className={style.close} onClick={() => setSapling(false)}/>

				<div className={style.treeContainer}></div>
				<div className={style.textContainer}>
					<h1>
						BUY YOUR
					</h1>
					<h2>
						Pine sapling
					</h2>
					<button onClick={async () => await mint()}>BUY</button>
				</div>
			</div>
		</div>
	)
}

export default BuySapling
