import React from "react"
import style from "../../styles/home/buySapling.module.scss"
import {RiCloseFill} from "react-icons/ri"

const BuySapling = ({setSapling, mint}) => {
	return (
		<div className={style.background}>
			<div className={style.container}>
				<RiCloseFill className={style.close} onClick={() => setSapling(false)}/>
				<button onClick={async () => await mint()}>buy</button>
			</div>
		</div>
	)
}

export default BuySapling
