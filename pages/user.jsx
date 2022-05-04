import React, {useState, useEffect, useContext} from "react"
import ProductTile from "../components/global/productTile"
import Hero from "../components/home/hero"
import UserCollection from "../components/user/userCollection"
import SellTree from "../components/user/sellTree"
import style from "../styles/market/market.module.scss"
import userStyle from "../styles/user/userCollection.module.scss"
import Image from "next/image"
import {TreesContext} from "./_app"
import {AccountContext} from "./_app"
import Wallet from "../components/wallet/wallet"
import {sliceAccount} from "../functions/sliceAccount"

const UserPage = ({ putOnSale, endSale, receiveFunds, setAccount, loadBlockChainData, setWeb3, setProvider}) => {
	const {treesOnSale, contract} = useContext(TreesContext)
	const {accountsTrees, account, accountsFounds} = useContext(AccountContext)
	const [saleTrees, setSaleTrees] = useState([])
	const [activeTreeId, setActiveTreeId] = useState()
	const [show, setShow] = useState(false)

	useEffect(()=>{
		renderProductsOnSale()
	}, [accountsTrees])

	const renderProductsOnSale = () => {
		const productTiles = []
		if(accountsTrees){
			for (let i = 0; i < accountsTrees.length; i++) {
				if(accountsTrees[i].saleId !== undefined){
					let treeId = accountsTrees[i].id
					let saleId = accountsTrees[i].saleId
					productTiles.push(<ProductTile tree={accountsTrees[i]} id={treeId} saleId={saleId} contract={contract} account={account}  price={treesOnSale.find(tree=> tree.id===saleId).tree.valueWei}/>)
				}
			}
			setSaleTrees([...productTiles])
		}


	}

	return (
		<div>
			<Hero title={"WELCOME"}
				  scrollToId={"myTrees"}
				  subtitle={sliceAccount(account) ? sliceAccount(account) : <Wallet setAccount={setAccount} setWeb3={setWeb3} setProvider={setProvider} loadBlockChainData={async () =>await loadBlockChainData()}></Wallet>}
				  trees={accountsTrees}
					setWeb3={setWeb3}
					setProvider={setProvider}>
			</Hero>
			{(account && account!== "0x0") &&
					<>
						<UserCollection
							accountTrees={accountsTrees}
							receiveFunds={receiveFunds}
							endSale={endSale}
							putOnSale={putOnSale}
							accountsFounds={accountsFounds}
							activeTreeId={activeTreeId}
							setActiveTreeId={setActiveTreeId}
							setShow={setShow}
							show={show}
						/>
						{(saleTrees.length !== 0) &&
							<div className={style.container}>
								<div className={style.guideSection}>
									<div className={style.titleImageContainer}>
										<Image src="/Rectangle14.svg" height={55} width={421} alt={""}/>
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

					</>
			}
			{(show)&&<SellTree treeId={activeTreeId} show={show} setShow={setShow} putOnSale={putOnSale}></SellTree>}
		</div>

	)
}

export default UserPage
