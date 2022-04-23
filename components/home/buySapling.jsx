import React from "react"
import style from "../../styles/home/buySapling.module.scss"
import {RiCloseFill} from "react-icons/ri"

const BuySapling = ({setSapling}) => {
	return (
		<div className={style.background}>
			<div className={style.container}>
				<RiCloseFill className={style.close} onClick={() => setSapling(false)}/>
			</div>
		</div>
	)
}

export default BuySapling
