import React from "react"
import style from "../../styles/global/loadingPage.module.scss"
import {AiOutlineLoading3Quarters} from "react-icons/ai"

const Loading = () => {
	return (
		<div className={style.page}>
			<div className={style.treeContainer}>
				<img src={"tree.png"} alt={""}/>
			</div>
			<AiOutlineLoading3Quarters className={style.loading}/>
		</div>
	)
}

export default Loading
