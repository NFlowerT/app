import React from "react"
import style from "../../styles/global/footer.module.scss"

const Footer = () => {
	return (
		<footer className={style.footer}>
			<h3>Foresta @</h3>
			<p>All rights reserved.</p>
			<p onClick={() => window.open("https://app-zeta-sage.vercel.app/tree/1", "_blank", "width=300,height=300,frame=false,transparent=true")}> Launch tree </p>
		</footer>
	)
}

export default Footer
