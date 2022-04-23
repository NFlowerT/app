import React, {useState, useEffect, useContext} from "react"
import ProductTile from "../components/global/productTile"
import Hero from "../components/home/hero"
import UserCollection from "../components/user/userCollection"
import style from "../styles/market/market.module.scss"
import Image from "next/image"
import Search from "../components/global/search"
import {TreesContext} from "./_app"
import Wallet from "../components/wallet/wallet";
const UserPage = ({ putOnSale, endSale, receiveFunds, setAccount}) => {
	const {accountsTrees, treesOnSale, account, contract, accountsFounds} = useContext(TreesContext)
	const [saleTrees, setSaleTrees] = useState([])
	const [shortAccount , setShortAccount] = useState()
	useEffect(()=>{
		renderProductsOnSale()
	}, [accountsTrees])
	useEffect(()=>{
		sliceAccount()
	})

	const renderProductsOnSale = () => {
		const productTiles = []
		for (let i = 0; i < accountsTrees.length; i++) {
			if(accountsTrees[i].saleId !== undefined){
				let treeId = accountsTrees[i].id
				let saleId = accountsTrees[i].saleId
				productTiles.push(<ProductTile tree={accountsTrees[i]} id={treeId} saleId={saleId} contract={contract} account={account}  price={treesOnSale.find(tree=> tree.id===saleId).tree.valueWei}/>)
			}
		}
		setSaleTrees([...productTiles])
	}
	const sliceAccount = () => {
		if(account!== undefined && account!== "0x0"){
			let short = ""
			short = account.slice(0, 4)
			short+="..."
			short += account.slice(account.length-3, account.length)
			setShortAccount(short)
		}
	}

	return (
		<>
			{/*<Wallet setAccount={setAccount} loadBlockChainData={async () =>await loadBlockChainData()}></Wallet>*/}

			{(account && account!== "0x0") &&
				<div>
					<Hero title={"WELCOME"} subtitle={shortAccount} trees={accountsTrees}></Hero>
					<UserCollection
						accountTrees={accountsTrees}
						receiveFunds={receiveFunds}
						endSale={endSale}
						putOnSale={putOnSale}
						accountsFounds={accountsFounds}/>
					{(saleTrees.length !== 0) &&
							<div className={style.container}>
								<div className={style.guideSection}>
									<div className={style.titleImageContainer}>
										<Image src="/Rectangle14.svg" height={55} width={421}/>
									</div>
									<div className={style.tileTextContainer}>
										<h3 className={style.titleText}>YOUR TREES ON SALE</h3>
									</div>
								</div>
								<div className={style.productsContainer}>
									{(treesOnSale.length) && saleTrees.map((tree)=> tree)}
								</div>
							</div>
					}
				</div>
			}
		</>


	)
}

export default UserPage
