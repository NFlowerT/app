import Navbar from "./navbar"
import React from "react";
// import Footer from "./footer"

const BaseLayout = React.memo(({ children, setAccount, loadBlockChainData, mint }) => {

	return (
		<>
			<Navbar setAccount={setAccount} loadBlockChainData={async()=>{await loadBlockChainData()}}/>
			<main
			mint={mint}>
				{children} </main>
			{/*<Footer/>*/}
		</>
	)
})

export default BaseLayout
