import React from "react"
import style from "../../styles/global/footer.module.scss"

const Footer = () => {
	return (
		<footer className={style.footer}>
			<h3>Foresta @</h3>
			<p>All rights reserved.</p>
			<p onClick={() => window.open("https://app-zeta-sage.vercel.app/tree/#52473e&0.68&0.83&0.33|0.00|0|57.94,0.03|0.80|0|96.48,0.39|1.60|0|33.90,0.26|2.40|0|31.57,0.10|3.20|0|62.56,0.29|4.00|0|6.20^#647a26&3.8&0.1&0.2&4.10|2.46|3.30|-20.00,3.48|2.09|3.30|30.00,2.96|1.78|3.50|30.00,2.52|1.51|3.30|10.00,2.14|1.28|3.30|-30.00&2&0&0", "_blank", "width=300,height=300,frame=false,transparent=true")}> Launch tree </p>
		</footer>
	)
}

export default Footer
