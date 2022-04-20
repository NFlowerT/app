import React, {useState, useEffect, useContext} from 'react';
import ProductTile from "../components/global/productTile";
import Hero from "../components/home/hero";
import UserCollection from "../components/user/userCollection";
import style from "../styles/market/market.module.scss";
import Image from "next/image";
import Search from "../components/global/search";
import {TreesContext} from "./_app";
const UserPage = ({ putOnSale, endSale, receiveFunds}) => {

    const {accountsTrees, treesOnSale, account, contract, accountsFounds} = useContext(TreesContext)

    const [saleTrees, setSaleTrees] = useState([])
    useEffect(()=>{
        renderProductsOnSale()
    }, [ accountsTrees])

    const renderProductsOnSale = () => {
        console.log(saleTrees)
        const productTiles = []
        for (let i = 0; i<accountsTrees.length; i++) {
            if(accountsTrees[i].saleId !== undefined){
                let treeId = accountsTrees[i].id
                let saleId = accountsTrees[i].saleId
                productTiles.push(<ProductTile birthdate={accountsTrees[i].tree.birthdate} genes={accountsTrees[i].tree.genes} id={treeId} saleId={saleId} contract={contract} account={account}  price={treesOnSale.find(tree=> tree.id===saleId).tree.valueWei}/>)
            }

        }
        setSaleTrees([...productTiles])
    }


    return (
        <>
            {
                (account!==undefined && account!== "0x0" && account!== null)?
                    <div>
                        <Hero title={"WELCOME"} subtitle={account} trees={accountsTrees}></Hero>
                        <UserCollection
                            accountTrees={accountsTrees}
                            receiveFunds={receiveFunds}
                            endSale={endSale}
                            putOnSale={putOnSale}
                            accountsFounds={accountsFounds}/>
                        {/*<div>*/}
                        {/*    {(accountsFounds!=0 && accountsFounds!=="0" && accountsFounds!=undefined)?<button onClick={async()=> await receiveFunds()}>receive founds</button>:null}*/}
                        {/*</div>*/}
                        {/*<div>your trees {(accountsTrees.length)?renderProductTileAccount() : null}</div>*/}
                        {
                            (saleTrees.length!==0)?
                                <div className={style.container}>
                                    <div className={style.guideSection}>
                                        <div className={style.titleImageContainer}>
                                            <Image src="/Rectangle14.svg" height={55} width={421}/>
                                        </div>
                                        <div className={style.tileTextContainer}>
                                            <h3 className={style.titleText}>YOUR TREES ON SALE</h3>
                                        </div>
                                        <Search></Search>
                                    </div>
                                    <div className={style.productsContainer}>
                                        {(treesOnSale.length)? saleTrees.map((tree)=> tree) :null}

                                    </div>
                                </div>: null
                        }


                    </div>  : null
            }
        </>


    );
};

export default UserPage;
