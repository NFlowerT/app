import React, {useContext, useEffect} from "react"
import style from "../../styles/home/buySapling.module.scss"
import {RiCloseFill} from "react-icons/ri"
import NTree from "../../nTree/NTree"
import {BrowserContext} from "../../pages/_app"
import {AccountContext} from "../../pages/_app"
import Wallet from "../wallet/wallet";

const BuySapling = ({setSapling, mint, setAccount}) => {
	const {rem, width, vw, vh} = useContext(BrowserContext)
	const {account} = useContext(AccountContext)
	useEffect(()=>{

	}, [account])
	return (
		<div className={style.background}>
			<div className={style.container}>
				<RiCloseFill className={style.close} onClick={() => setSapling(false)}/>
				<NTree
					disabled={true}
					width={width > 900 ? 20 * vw : 80 * vw}
					height={width > 900 ? 30 * rem : 30 * vh}
					cameraPosition={{x: 6, y: -1, z: 6}}
					className={style.treeContainer}
					y={-1.5}
					age={12}
				/>
				<div className={style.textContainer}>
					<h1>
						BUY YOUR
					</h1>
					<h2>
						Pine sapling
					</h2>
					{(account!==undefined && account!=="0x0")?<button onClick={async () => await mint()}>BUY</button> : <Wallet setAccount={setAccount}></Wallet>}
				</div>
			</div>
		</div>
	)
}

export default BuySapling
