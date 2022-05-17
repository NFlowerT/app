import React, {useContext, useEffect, useState} from "react"
import style from "../../styles/market/market.module.scss"
import Image from "next/image"
import {AccountContext, TreesContext} from "../../pages/_app"
import ProductTile from "../global/productTile"

const TreesOnSale = ({}) => {
	const [saleTrees, setSaleTrees] = useState([])

	const {treesOnSale, contract} = useContext(TreesContext)
	const {accountsTrees, account, accountsFounds} = useContext(AccountContext)

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
		<>
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
	)
}

export default TreesOnSale