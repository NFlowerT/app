import React, {useState, useEffect} from 'react';
import {useRouter} from "next/router";
import Image from 'next/image'
import style from "../styles/product/product.module.scss"
import SellForm from "../components/global/sellForm";


const ProductPage = ({putOnSale, endSale, buyTreeFromSale, account, accountTrees, treesOnSale, trees, contract}) => {
    const [router, setRouter] = useState(useRouter())
    const [treeId, setTreeId] = useState()
    const [owner, setOwner] = useState(undefined)
    const [genes, setGenes] = useState()
    const [price, setPrice] = useState()
    const [birthdate, setBirthdate] = useState()
    const [sale, setSale] = useState(false)
    const [saleId, setSaleId] = useState(undefined)
    const [showForm, setShowForm] = useState(false)

    useEffect(()=>{
        setTreeId(parseInt(router.query.id))
        console.log(router.query.id, "q")
    }, [])

    useEffect(()=>{
        (async () => {
            await ownerOfTree()
            await treeGenes()
                isOnSale()
        })()
    })

    const ownerOfTree = async () => {
        if(contract && treeId!==undefined && account){
            try{
                let owner = await contract.methods.ownerOf(treeId).call()
                if(owner.toLowerCase() == account) {
                    setOwner(account)
                }
                else setOwner(owner)
            }
            catch(err) {
                console.log(err)
            }
        }
    }
    const treeGenes = async () => {
        console.log(account, treeId, contract)
        if(contract && treeId!==undefined && account){
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
        <div className={style.body}>
            {
                (genes)?
                    <div className={style.container}>
                        <div className={style.titleContainer}>
                            <div className={style.title}>
                                <div className={style.titleImageContainer}>
                                    <Image src="/Rectangle14.svg" height={54} width={421}/>
                                </div>
                                <div className={style.tileTextContainer}>
                                    <h1 className={style.titleText}>NAME</h1>
                                </div>
                            </div>
                            {
                                (sale && owner===account && account!==undefined && account!=="0x0")? <button className={style.button} onClick={async () => {await endSale(saleId); setShowForm(false)}}>END SALE</button> : null
                            }
                            {
                                (!sale && owner==account && account!==undefined && account!=="0x0")? <button className={style.button} onClick={()=>setShowForm(!showForm) }>SALE</button> : null
                            }
                            {
                                (sale && owner!=account && account!="0x0" && account!=undefined)? <button className={style.button} onClick={async ()=> await buyTreeFromSale(saleId, price) }>BUY</button> : null
                            }
                        </div>
                        <div className={style.productContainer}>
                            <div className={style.infoContainer}>
                                <div className={style.infoImage}>
                                    <Image src="/Rectangle42.svg" height={185} width={653}></Image>
                                </div>
                                <div className={style.info}>
                                    {(price)? <div>price: {price/1000000000000000000} ETH</div> : null}
                                    <div>owner: {owner}</div>
                                    <div>birthdate: {new Date(birthdate*1000).toLocaleDateString("en-US")}</div>
                                </div>
                                <SellForm putOnSale={putOnSale} treeId={treeId} show={showForm} setShowForm={setShowForm}></SellForm>
                            </div>

                        </div>

                        {/*{treeId}*/}
                    </div> : <div className={style.error}><h2>We could not find this tree :(</h2></div>}

                </div>


    );
};

export default ProductPage;
