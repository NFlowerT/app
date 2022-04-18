import React, {useState, useEffect} from 'react';
import style from "../../styles/home/userCollection.module.scss"
import Image from "next/image";
import ProductTile from "../global/productTile";


const UserCollection = ({accountTrees, accountsFounds, receiveFunds, treesOnSale, endSale, putOnSale}) => {
    const [activeTreeId, setActiveTreeId] = useState()
    const [activeTreeGenes, setActiveTreeGenes] = useState()
    const [activeTreeBirthdate, setActiveTreeBirthdate] = useState()
    const [price, setPrice] = useState()
    const [birthdate, setBirthdate] = useState()
    const [sale, setSale] = useState(false)
    const [saleId, setSaleId] = useState(undefined)


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
                     onClick={()=>{setActiveTreeId(accountTrees[i].id);
                                    setActiveTreeGenes(accountTrees[i].tree.genes);
                                    setActiveTreeBirthdate(accountTrees[i].tree.birthdate)}}>
                    <p >name: {accountTrees[i].id}</p>
                    {
                        (accountTrees[i].saleId!==undefined)? <button className={style.button} onClick={async() => await endSale(accountTrees[i].saleId)}>END SALE</button> :null
                    }
                    {
                        (accountTrees[i].saleId==undefined)? <button className={style.button} onClick={async() => await putOnSale(accountTrees[i].id)}>SALE</button> :null
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

                </div>

            </div>
            
        </div>
    );
};

export default UserCollection;
