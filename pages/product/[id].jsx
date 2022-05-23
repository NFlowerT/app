import React, {useState, useEffect, useContext} from "react"
import {useRouter} from "next/router"
import Image from "next/image"
import style from "../../styles/product/product.module.scss"
import SellForm from "../../components/global/sellForm"
import {TreesContext} from "../_app"
import {BrowserContext} from "../_app"
import {AccountContext} from "../_app"
import NTree from "../../nTree/NTree";
import {sliceAccount} from "../../functions/sliceAccount";
import SellTree from "../../components/user/sellTree";


const ProductPage = ({putOnSale, endSale, buyTreeFromSale}) => {
	const [treeId, setTreeId] = useState()
	const [owner, setOwner] = useState(undefined)
	const [genes, setGenes] = useState()
	const [price, setPrice] = useState()
	const [birthdate, setBirthdate] = useState()
	const [sale, setSale] = useState(false)
	const [saleId, setSaleId] = useState(undefined)
	const [showForm, setShowForm] = useState(false)
	const [show, setShow] = useState(false)

	const { treesOnSale, contract, trees} = useContext(TreesContext)
	const {  rem, vw, vh, width } = useContext(BrowserContext)
	const { account } = useContext(AccountContext)


	const router = useRouter()
	const { id } = router.query

	useEffect(()=>{
		setTreeId(parseInt(id))
	})

	useEffect(()=>{
		(async () => {
			await ownerOfTree()
			await treeGenes()
			isOnSale()
		})()
	}, [trees, treesOnSale])
	useEffect(()=>{
		(async () => {
			await ownerOfTree()
			await treeGenes()
			isOnSale()
		})()
	})

	const ownerOfTree = async () => {
		if(contract && treeId!==undefined ){
			try{
				let owner = await contract.methods.ownerOf(treeId).call()
				if(account){
					if(owner.toLowerCase() == account) {
						setOwner(account)
					}
					else setOwner(owner)
				}else {
					setOwner(owner)
				}

			}
			catch(err) {
				//console.log(err)
			}
		}
	}
	const treeGenes = async () => {
		//console.log(account, treeId, contract)
		if(contract && treeId!==undefined){
			try{
				let tree = await contract.methods.trees(treeId).call()
				let genes = tree.genes
				let birthdate = tree.birthdate
				//console.log(tree , birthdate)
				setGenes(genes)
				setBirthdate(birthdate)
			}
			catch(err){
				//console.log(err)
			}
		}
	}
	const isOnSale = () => {
		if(treesOnSale.length !== 0){
			treesOnSale.forEach((tree, index) => {
				if(tree.tree.TreeId == treeId){
					if(tree.tree.active == true){
						setSale(true)
						setSaleId(tree.id)
						setPrice(tree.tree.valueWei)
					}
					else{
						setSale(false)
					}
				}
			})
		}
	}

	return (
		<div className={style.body}>
			{
				(genes)?
					<div className={style.container}>
						<div className={style.titleContainer}>
							<div className={style.title}>
								<div className={style.titleImageContainer}>
									<img src="/Rectangle14.svg"/>
								</div>
								<div className={style.tileTextContainer}>
									<h1 className={style.titleText}> {treeId} </h1>
								</div>
							</div>
							{
								(sale && owner===account && account!==undefined && account!=="0x0")?
									<button className={style.button} onClick={async () => {await endSale(saleId); setShowForm(false)}}>END SALE</button> : null
							}
							{
								(!sale && owner==account && account!==undefined && account!=="0x0")?
									<button className={style.button} onClick={()=>setShow(!show) }>SALE</button> : null
							}
							{
								(sale && owner!=account && account!="0x0" && account!=undefined)?
									<button className={style.button} onClick={async ()=> {await buyTreeFromSale(saleId, price);  }}>BUY</button> : null
							}
						</div>
						<div className={style.middleContainer}>
							<div className={style.productContainer}>
								<div className={style.infoContainer}>
									<div className={style.infoImage}>
										<img src="/Rectangle42.svg" ></img>
									</div>
									<div className={style.info}>
										<h3>Birthdate: {new Date(birthdate*1000).toLocaleDateString("en-US")}</h3>
										<h3>Owner: {sliceAccount(owner)}</h3>
										{(price)? <h3>price: {price/1000000000000000000} ETH</h3> : <h3> Not on sale</h3>}
									</div>
									<SellForm putOnSale={putOnSale} treeId={treeId} show={showForm} setShowForm={setShowForm}></SellForm>
								</div>
							</div>
							<NTree
								dataArray={[{tree: {birthdate: birthdate, genes: genes}}]}
								className={style.treeContainer}
								disabled={false}
								width={width > 800 ? (100 * vw) - (30 * rem) : 90 * vw}
								height={width > 800 ? (100 * vh) - (5 * rem) : 50 * vh}
								cameraPosition={{x: 8, y: -2.6, z: 8}}
								y={-3}
								islandSize={3.5}
								innerRadius={2}
								rockAmount={3}
							/>
						</div>

					</div> : <div className={style.error}><h2>Loading...</h2></div>}
			{(show)&&<SellTree putOnSale={putOnSale} treeId={treeId} show={show} setShow={setShow} ></SellTree>}
		</div>
	)
}

export default ProductPage
