import React from 'react';
import style from "../styles/market/market.module.scss"
import Image from 'next/image'
//components
import Search from "../components/global/search";
import Filter from "../components/global/filter";
import ProductTile from "../components/global/productTile";

const Market = ({contract, account, treesOnSale, buyTreeFromSale, trees}) => {

    const renderProducts = () => {
        const productTiles = []
        for (let i = 0; i<treesOnSale.length; i++) {
            console.log(treesOnSale, treesOnSale.length)
            let treeId = treesOnSale[i].tree.TreeId
            productTiles.push(<ProductTile market={true} genes={trees[treeId].tree.genes} id={treesOnSale[i].tree.TreeId} saleId={treesOnSale[i].id} contract={contract} account={account} buyTreeFromSale={buyTreeFromSale} price={treesOnSale[i].tree.valueWei}/>)
        }
        return (
            <section className={style.productsContainer}>
                {productTiles}
            </section>
        )
    }

    return (
        <main className={style.container}>
            <div className={style.guideSection}>
                <div className={style.titleImageContainer}>
                    <Image src="/Rectangle14.svg" height={55} width={421}/>
                </div>
                <div className={style.tileTextContainer}>
                    <h1 className={style.titleText}>MARKET</h1>
                </div>
                <Search></Search>
            </div>
            <div className={style.productsContainer}>
                {(treesOnSale.length)?renderProducts() :null}

            </div>
        </main>

    );
};

export default Market;

