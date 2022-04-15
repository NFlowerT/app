import React from 'react';
import style from "../styles/market/market.module.scss"
import Image from 'next/image'
//components
import Search from "../components/global/search";
import Filter from "../components/global/filter";
import ProductTile from "../components/global/productTile";

const Market = ({contract, account, treesOnSale, buyTreeFromSale}) => {

    const renderProducts = () => {
        const productTiles = []
        for (let i = 0; i<treesOnSale.length; i++) {
            console.log(treesOnSale, treesOnSale.length)
            productTiles.push(<ProductTile id={treesOnSale[i].tree.TreeId} saleId={treesOnSale[i].id} contract={contract} account={account} buyTreeFromSale={buyTreeFromSale} price={treesOnSale[i].tree.valueWei}/>)
        }
        return (
            <section className={"productsContainer"}>
                {productTiles}
            </section>
        )
    }

    return (
        <main className={style.container}>
            marketdfdsdfds
            <div className={style.guideSection}>
                <div className={style.title}>
                    <Image src="/Rectangle14.svg" height={100} width={200}/>
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

