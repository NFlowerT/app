import Navbar from "./navbar"
import {memo} from "react"
// import Footer from "./footer"
import style from "../../styles/global/baseLayout.module.scss"
import Footer from "./footer"
import Head from "next/head"
import {useRouter} from "next/router"

// eslint-disable-next-line react/display-name
const BaseLayout = ({ children, setAccount, loadBlockChainData, mint,  }) => {
	const router = useRouter()
	if(router.pathname === "/tree"){
		return <>{children}</>
	}
	return (
		<>
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
				<link rel="manifest" href="/favicons/site.webmanifest"/>
				<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5"/>
				<link rel="shortcut icon" href="/favicons/favicon.ico"/>
				<meta name="msapplication-TileColor" content="#da532c"/>
				<meta name="msapplication-config" content="/favicons/browserconfig.xml"/>
				<meta name="theme-color" content="#ffffff"/>
				<title>Foresta</title>
				<meta name="description" content="Make your forest fly"/>
				<meta name="keywords" content="NFT, Tree, Blockchain, Forest"/>
				<meta name="author" content="Foresta team"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			</Head>
			<Navbar setAccount={setAccount} loadBlockChainData={async()=>{await loadBlockChainData()}}/>
			<main mint={mint} className={style.main}>
				{children}
			</main>
			<Footer/>
		</>
	)
}

export default BaseLayout
