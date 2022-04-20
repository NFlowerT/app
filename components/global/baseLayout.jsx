import Navbar from "./navbar"
import {memo} from "react"
// import Footer from "./footer"

// eslint-disable-next-line react/display-name
const BaseLayout = memo(({ children, setAccount, loadBlockChainData, mint }) => {

	return (
		<>
			<Navbar setAccount={setAccount} loadBlockChainData={async()=>{await loadBlockChainData()}}/>
			<main mint={mint}>
				{children}
			</main>
			{/*<Footer/>*/}
		</>
	)
})

export default BaseLayout
