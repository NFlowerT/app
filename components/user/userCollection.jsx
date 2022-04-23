import React, {useState, useEffect} from "react"
import style from "../../styles/home/userCollection.module.scss"
import Image from "next/image"
import ProductTile from "../global/productTile"
import SellForm from "../global/sellForm"
import NTree from "../../nTree/NTree"


const UserCollection = ({accountTrees, accountsFounds, receiveFunds, treesOnSale, endSale, putOnSale}) => {
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
		(accountTrees)? setActiveTree(accountTrees[0]) : undefined

	}, [accountTrees])


	const renderTrees = () => {
		if(accountTrees.length===0)
			return (
				<div className={style.namesContainer}>
                You do not own any tree
				</div>
			)
		const treesNames = []
		for (let i = 0; i < accountTrees.length; i++) {
			treesNames.push(
				<div className={(activeTreeId === accountTrees[i].id)? style.treeNameActive : style.treeName}
					onClick={()=>{setActiveTreeId(accountTrees[i].id)
						setActiveTreeGenes(accountTrees[i].tree.genes)
						setActiveTree(accountTrees[i])
						setActiveTreeBirthdate(accountTrees[i].tree.birthdate)}}>
					<p>name: {accountTrees[i].id}</p>

					{accountTrees[i].saleId &&
						<button className={style.button} onClick={async() => await endSale(accountTrees[i].saleId)}>END SALE</button> &&
						<button className={style.button} onClick={() => setShowForm(!showForm)}>SALE</button>
					}
				</div>)
		}
		return (
			<div className={style.namesContainer}>
				{treesNames}
			</div>
		)
	}
	console.log(activeTree, "active tree")

	return (
		<div className={style.main}>
			<div className={style.tabContainer}>
				<div className={style.foundsContainer}>
					<h3>Your founds:{accountsFounds}
						{/*{(accountsFounds!==undefined)?*/}
						{/*    ((BigInt(accountsFounds))?*/}
						{/*        accountsFounds/1000000000000000000 +" ETH" : "0 ETH")*/}
						{/*    :  " lol ETH"}</h3>*/}</h3>
					{/*{(accountsFounds)?*/}
					{/*    ((BigInt(accountsFounds)>0)?*/}
					{/*        <button onClick={async () => await receiveFunds()}>Recieve founds</button> : null)*/}
					{/*    : null}*/}
				</div>
				<div className={style.tabImages}>
					<div className={style.tabImage}>
						<Image src="/Rectangle15.svg" height={106} width={183} ></Image>
					</div>
					<div className={style.tabIconContainer}>
						<div className={style.tabIcon}><Image src="/Vector.svg" height={70} width={62} ></Image></div>
					</div>

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
					(accountTrees)?
						((activeTree!==undefined)?<NTree dataArray={[activeTree]}/> : <button>lol</button>):  null
				}
				{/*<NTree dataArray={[activeTree]}/>*/}
			</div>

		</div>
	)
}

export default UserCollection
