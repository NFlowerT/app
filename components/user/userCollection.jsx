import React, {useState, useEffect, useContext} from "react"
import style from "../../styles/user/userCollection.module.scss"
import Image from "next/image"
import ProductTile from "../global/productTile"
import SellForm from "../global/sellForm"
import NTree from "../../nTree/NTree"
import {TreesContext} from "../../pages/_app";


const UserCollection = ({accountTrees, receiveFunds, treesOnSale, endSale, putOnSale}) => {
	const { accountsFounds} = useContext(TreesContext)
	const [activeTreeId, setActiveTreeId] = useState()
	const [activeTree, setActiveTree] = useState((accountTrees)? accountTrees[0] : undefined)

	const [activeTreeGenes, setActiveTreeGenes] = useState()
	const [activeTreeBirthdate, setActiveTreeBirthdate] = useState()
	const [price, setPrice] = useState()
	const [birthdate, setBirthdate] = useState()
	const [sale, setSale] = useState(false)
	const [saleId, setSaleId] = useState(undefined)
	const [showForm, setShowForm] = useState(false)
	const [accountsFound, setAccountFound] = useState(accountsFounds)

	useEffect(()=> {
		setAccountFound(accountsFounds)
	}, accountsFounds)

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
				<div className={style.namesContainer}>
					You do not own any tree
				</div>
			)

		const treesNames = []
		for (let i = 0; i<accountTrees.length; i++) {
			//console.log(trees[i].tree.genes, "tilee", trees)
			treesNames.push(
				<div className={(activeTreeId==accountTrees[i].id)? style.treeNameActive : style.treeName}
					 onClick={()=>{setActiveTreeId(accountTrees[i].id)
						 setActiveTreeGenes(accountTrees[i].tree.genes)
						 setActiveTree(accountTrees[i])
						 setActiveTreeBirthdate(accountTrees[i].tree.birthdate)}}>
					<p >name: {accountTrees[i].id}</p>
					{
						(accountTrees[i].saleId!==undefined) && <button className={style.button} onClick={async() => await endSale(accountTrees[i].saleId)}>END SALE</button>
					}
					{
						(accountTrees[i].saleId==undefined) && <button className={style.button} onClick={() => setShowForm(!showForm)}>SALE</button>
					}
				</div>)
		}
		return (
			<div className={style.namesContainer}>
				{treesNames}
			</div>
		)
	}

	return (
		<div className={style.main}>
			<div className={style.sectionName}>
				<div className={style.foundsContainer}>
					<div className={style.founds}>
						<h2>Your founds: {accountsFound}</h2>
						{/*{(accountsFounds)?*/}
						{/*    ((BigInt(accountsFounds)>0)?*/}
						{/*        <button onClick={async () => await receiveFunds()}>Recieve founds</button> : null)*/}
						{/*    : null}*/}
					</div>
					<div className={style.dop}></div>
				</div>
				<div>
					<img src="/treeSub.svg" className={style.image}/>
				</div>
			</div>

			<div className={style.container} >
				<div className={style.collectionContainer}>
					<div className={style.collectionContainerTitle}>
						<h3>YOUR COLLECTION</h3>
					</div>
					{renderTrees()}
					<div className={style.collectionImage}><Image src="/Rectangle43.svg" height={842} width={838}></Image></div>
					<div className={style.sellForm}>
						<SellForm putOnSale={putOnSale} treeId={activeTreeId} show={showForm} setShowForm={setShowForm}></SellForm>
					</div>
				</div>
				{
					(accountTrees) &&
						((activeTree!==undefined) && <NTree dataArray={[activeTree]}/>)
				}
			</div>


		</div>
	)
}

export default UserCollection
