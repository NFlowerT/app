import React, {useState, useEffect, useContext} from "react"
import {useRouter} from "next/router"
import style from "../../styles/product/product.module.scss"
import {TreesContext} from "../_app"
import {BrowserContext} from "../_app"
import {AccountContext} from "../_app"
import NTree from "../../nTree/NTree"
import {BsArrowsMove} from "react-icons/bs"


const TreePage = ({putOnSale, endSale, buyTreeFromSale}) => {
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
		console.log(id, "q")
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
					console.log("owner")
				}

			}
			catch(err) {
				console.log(err)
			}
		}
	}

	const treeGenes = async () => {
		console.log(account, treeId, contract)
		if(contract && treeId!==undefined){
			try{
				let tree = await contract.methods.trees(treeId).call()
				let genes = tree.genes
				let birthdate = tree.birthdate
				console.log(tree , birthdate)
				setGenes(genes)
				setBirthdate(birthdate)
			}
			catch(err){
				console.log(err)
			}
		}
	}
	const isOnSale = () => {
		if(treesOnSale.length !== 0){
			treesOnSale.forEach((tree, index) => {
				console.log(tree)
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
		<>
			{(genes) ?
				<div className={style.container}>
					<NTree
						dataArray={[{tree: {birthdate: birthdate, genes: genes}}]}
						width={100 * vw}
						height={100 * vh}
						islandSize={5}
						cameraPosition={{x: 10, y: -2, z: 10}}
						y={-3}
					/>
					<button className={style.moveButton}>
						<BsArrowsMove/>
					</button>
				</div>
				: <div className={style.error}><h2>Loading...</h2></div>}
		</>
	)
}

export default TreePage
