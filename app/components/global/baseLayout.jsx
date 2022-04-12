import Navbar from "./navbar"
import Footer from "./footer"

const BaseLayout = ({ children }) => {
	return (
		<>
			{/*<Navbar/>*/}
			<main> {children} </main>
			{/*<Footer/>*/}
		</>
	)
}

export default BaseLayout
