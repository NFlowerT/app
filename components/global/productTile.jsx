import React, {useContext} from "react"
import Link from "next/link"
import Image from "next/image"
import style from "../../styles/global/productTile.module.scss"
import NTree from "../../nTree/NTree"
import {TreesContext} from "../../pages/_app"

// const ProductTile = ({ id, genes, price, contract, account, birthdate}) => {
const ProductTile = ({ id, contract, account, tree, price}) => {
	const {rem} = useContext(TreesContext)
	const ownerOfTreeOnSale = async (saleId)=>{
		if(!contract) return 0
		let tree = await contract.methods.sales(saleId).call()
		let owner = tree.owner
		console.log(owner.toLowerCase(),owner.toLowerCase() === account, saleId)
		return owner.toLowerCase() === account

	}
	const convertWei = (price) =>{
		return price/1000000000000000000+" ETH"
	}
	console.log("genes", tree, "birthdate")

	return (
		<Link className={"productPageLink"} href={"/product/"+id} passHref>
			<div className={style.productTile}>
				{	(tree)?
					((price)?
						<div className={style.priceContainer}>
							<div className={style.priceImge}>
								<Image src="/Rectangle64.svg" height={40} width={170} className={style.image} alt={""}/>
							</div>
							<div className={style.price}>
								<div>{convertWei(price)}</div>
							</div>
						</div> : <p></p>) : null
				}
				<NTree
					dataArray={[tree]}
					className={style.treeContainer}
					disabled={true}
					width={15 * rem}
					height={18 * rem}
					cameraPosition={{x: 8, y: -4, z: 8}}
					y={-5}
				/>
				<div className={style.productTitle}>Ala ma kota</div>
				{/*{(putOnSale)? <button onClick={async()=>await putOnSale(id)}>sale</button>:null}*/}
				{/*<button onClick={()=>{putOnSale(id)}}>sale</button>*/}
				{/*{(saleId!==undefined && ownerOfTreeOnSale(saleId))? <button onClick={async()=>{ await endSale(saleId)}}>end sale</button> :null}*/}
				{/*{(buyTreeFromSale)?<button onClick={async()=>await buyTreeFromSale(saleId, price)}>buy</button>:null}*/}
			</div>
		</Link>
	)
}

export default ProductTile
