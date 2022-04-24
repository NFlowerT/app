import React, {useState, useEffect, useContext} from "react"
import style from "../../styles/user/userCollection.module.scss"
import Image from "next/image"
import ProductTile from "../global/productTile"
import SellForm from "../global/sellForm"
import NTree from "../../nTree/NTree"
import {AccountContext} from "../../pages/_app"
import {BrowserContext} from "../../pages/_app"


const UserCollection = ({accountTrees, receiveFunds, treesOnSale, endSale, putOnSale}) => {
	const {accountFounds} = useContext(AccountContext)
	const {vw, vh, width} = useContext(BrowserContext)
	const [activeTreeId, setActiveTreeId] = useState()
	const [activeTree, setActiveTree] = useState((accountTrees)? accountTrees[0] : undefined)

	const [activeTreeGenes, setActiveTreeGenes] = useState()
	const [activeTreeBirthdate, setActiveTreeBirthdate] = useState()
	const [price, setPrice] = useState()
	const [birthdate, setBirthdate] = useState()
	const [sale, setSale] = useState(false)
	const [saleId, setSaleId] = useState(undefined)
	const [showForm, setShowForm] = useState(false)



	useEffect(()=>{
		if(accountTrees.length>0){
			setActiveTree(accountTrees[0])
			setActiveTreeId(accountTrees[0].id)
			setActiveTreeGenes(accountTrees[0].tree.genes)
			setActiveTree(accountTrees[0])
			setActiveTreeBirthdate(accountTrees[0].tree.birthdate)
		}


	}, [accountTrees])

	const renderTrees = () => {
		if(accountTrees.length===0)
			return (
				<div className={style.list}>
					You do not own any tree
				</div>
			)

		const treesNames = []
		for (let i = 0; i<accountTrees.length; i++) {
			console.log(accountTrees[i].tree.genes, "tilee")
			treesNames.push(
				<div key={i.toString()}
					className={(activeTreeId==accountTrees[i].id)? style.collectionTreeActive : style.collectionTree}
					 onClick={()=>{setActiveTreeId(accountTrees[i].id)
						 setActiveTreeGenes(accountTrees[i].tree.genes)
						 setActiveTree(accountTrees[i])
						 setActiveTreeBirthdate(accountTrees[i].tree.birthdate)}}>
					<p >{accountTrees[i].id}</p>
					{
						(accountTrees[i].saleId!==undefined) && <button className={style.button} onClick={async() => await endSale(accountTrees[i].saleId)}><p>END SALE</p></button>
					}
					{
						(accountTrees[i].saleId==undefined) && <button className={style.button} onClick={() => setShowForm(!showForm)}><p>SALE</p></button>
					}
				</div>)
		}
		return (
			<div className={style.list}>
				{treesNames}
			</div>
		)
	}

	return (
		<div className={style.main} id={"myTrees"}>
			<div className={style.sectionName}>
				<div className={style.foundsContainer}>
					<div className={style.founds}>
						<h3>Your founds: {accountFounds/1000000000000000000}</h3>
						{(accountFounds)?
						    ((BigInt(accountFounds)>0)?
						        <button onClick={async () => await receiveFunds()}>Recieve founds</button> : null)
						    : null}
					</div>
					<div className={style.dop}></div>
				</div>
				<div>
					<img src="/treeSub.svg" className={style.image} alt={""}/>
				</div>
			</div>

			<div className={style.container} >

				<div className={style.collectionContainer}>

					<div className={style.collectionList}>
						<div className={style.collectionTitle}>
							<h3>Your Collection</h3>
						</div>

						{renderTrees()}
						{/*<div className={style.list}>*/}
						{/*	/!*{[214421,2251,5215126,6436,643644643].map((num, i) =>*!/*/}
						{/*	/!*	<div className={style.collectionTree} key={num.toString()+i.toString()}>*!/*/}
						{/*	/!*		<p>{num}</p>*!/*/}
						{/*	/!*	</div>*!/*/}
						{/*	/!*)}*!/*/}
						{/*	{renderTrees()}*/}
						{/*</div>*/}
						{/*{renderTrees()}*/}

						{/*<div className={style.sellForm}>*/}
						{/*	<SellForm putOnSale={putOnSale} treeId={activeTreeId} show={showForm} setShowForm={setShowForm}></SellForm>*/}
						{/*</div>*/}
					</div>

					{width > 900 && <div className={style.dopu}/>}
					{/*<div className={style.sellForm}>*/}
					{/*	<SellForm putOnSale={putOnSale} treeId={activeTreeId} show={showForm} setShowForm={setShowForm}></SellForm>*/}
					{/*</div>*/}
				</div>
				{accountTrees && activeTree &&
					<NTree
						dataArray={[activeTree]}
						className={style.treeContainer}
						width={width > 900 ? 70 * vw : 80 * vw}
						height={width > 900 ? 80 * vh : 40 * vh}
						cameraPosition={{x: 7, y: -2, z: 7}}
						y={-4}
					/>
				}
			</div>


		</div>
	)
}

export default UserCollection
