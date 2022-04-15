import Navbar from "./navbar"
// import Footer from "./footer"

const BaseLayout = ({ children, setAccount, loadBlockChainData, mint }) => {

	return (
		<>
			<Navbar setAccount={setAccount} loadBlockChainData={async()=>{await loadBlockChainData()}}/>
			<main
			mint={mint}>
				{children} </main>
			{/*<Footer/>*/}
		</>
	)
}

export default BaseLayout
