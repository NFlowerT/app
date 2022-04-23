import React, {useContext, useEffect, useState} from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { BiUserCircle } from "react-icons/bi"
import style from "../../styles/global/nav.module.scss"
import {TreesContext} from "../../pages/_app"
import {FiMenu} from "react-icons/fi"

const Navbar = () => {
	const [navState, setNavState] = useState(false)
	const router = useRouter()
	const location = router.pathname
	const [scroll, setScroll] = useState(false)
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window.scrollY > 0)
		})
		body.addEventListener("ontouchend", () => {
			setScroll(window.scrollY > 0)
		})
		router.events.on("routeChangeStart", () => {
			setNavState(false)
		})
	}, [])
	const {width} = useContext(TreesContext)
	return (
		<>
			{width > 600 ?
				<nav className={style.nav + " " + ((scroll) && style.navScrolled)}>
					<div className={style.logoContainer}>
						<Link href={"/"} passHref>
							<div className={style.logoTitle }><div>FORESTA</div></div>
						</Link>
					</div>

					<div className={style.categoryContainer}>
						<div>
							<Link href={"/"} passHref><div>SAPPLINGS</div></Link>
						</div>
						<div>
							<Link href={"/gallery"} passHref><div>GALLERY</div></Link>
						</div>
						<div>
							<Link href={"/market"} passHref><div>MARKET</div></Link>
						</div>
						<div className={style.AccountIcon}>
							<Link href={"/user"} passHref>
								<BiUserCircle/>
							</Link>
						</div>
					</div>
				</nav>

				:
				<>
					<nav className={style.mobileNav + " " + ((scroll || navState) && style.navScrolled)}>
						<div className={style.logoContainer}>
							<Link href={"/"} passHref>
								<div className={style.logoTitle}><div>FORESTA</div></div>
							</Link>
						</div>
						<div className={style.expandIcon}>
							<FiMenu onClick={() => setNavState(!navState)}/>
						</div>
					</nav>
					{navState &&
						<div className={style.navBody}>
							<div>
								<Link href={"/"} passHref><h3>SAPPLINGS</h3></Link>
							</div>
							<div>
								<Link href={"/gallery"} passHref><h3>GALLERY</h3></Link>
							</div>
							<div>
								<Link href={"/market"} passHref><h3>MARKET</h3></Link>
							</div>
							<div>
								<Link href={"/user"} passHref>
									<BiUserCircle className={style.userIcon}/>
								</Link>
							</div>
						</div>
					}
				</>

			}
			{(location !== "/" && location !== "/user") && <div className={style.navWrapper}/>}
		</>
	)
}

export default Navbar
