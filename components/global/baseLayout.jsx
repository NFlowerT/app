import Navbar from "./navbar"
import {memo} from "react"
// import Footer from "./footer"
import style from "../../styles/global/baseLayout.module.scss"

// eslint-disable-next-line react/display-name
const BaseLayout = ({ children, setAccount, loadBlockChainData, mint }) => {

	return (
		<>
			<Navbar setAccount={setAccount} loadBlockChainData={async()=>{await loadBlockChainData()}}/>
			<main mint={mint} className={style.main}>
				{children}
			</main>
			{/*<Footer/>*/}
		</>
	)
}

export default BaseLayout
