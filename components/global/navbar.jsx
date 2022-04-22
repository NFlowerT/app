import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { BiUserCircle } from "react-icons/bi"
import Image from "next/image"
import style from "../../styles/global/nav.module.scss"
import Wallet from "../wallet/wallet"


const Navbar = ({setAccount, loadBlockChainData}) => {
	const router = useRouter()
	const location = router.pathname
	return (
		<>
			<nav className={style.nav}>
				<div className={style.logoContainer}>
					<Link href={"/"}>
						<div className={style.logoTitle }>FORESTA</div>
					</Link>
				</div>

				<Wallet setAccount={setAccount} loadBlockChainData={async () =>await loadBlockChainData()}></Wallet>

				<div className={style.categoryContainer}>
					<div>
						<Link href={"/"}><div>SAPPLINGS</div></Link>
					</div>
					<div>
						<Link href={"/gallery"}><div>GALLERY</div></Link>
					</div>
					<div>
						<Link href={"/market"}><div>MARKET</div></Link>
					</div>
					<div  className={style.AccountIcon}>
						<Link href={"/user"}>
							<BiUserCircle></BiUserCircle>
						</Link>
					</div>
				</div>
			</nav>
			{(location !== "/" && location !== "/user") && <div className={style.navWrapper}/>}
		</>
	)
}

export default Navbar
