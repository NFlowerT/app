import React from 'react';
import style from "../styles/market/market.module.scss"
import Image from 'next/image'
//components
import Search from "../components/global/search";
import Filter from "../components/global/filter";
import ProductTile from "../components/global/productTile";

const Gallery = ({ trees, accountsTrees, putOnSale, endSale }) => {

    const renderProductTileAll = () => {
        console.log(trees)
        if(trees.length===0) return 0
        const productTiles = []
        for (let i = 0; i<trees.length; i++) {
            //console.log(trees[i].tree.genes, "tilee", trees)
            productTiles.push(<ProductTile key={trees[i].id} id={trees[i].id} genes={trees[i].tree.genes} />)
        }
        return (
            <section className={style.productsContainer}>
                {productTiles}
            </section>
        )
    }

    const renderProductTileAccount = () => {
        const productTiles = []
        //console.log("tile",accountsTrees)
        for (let i = 0; i<accountsTrees.length; i++) {
            console.log(accountsTrees[i], "tile saleid ")
            productTiles.push(<ProductTile id={accountsTrees[i].id} genes={accountsTrees[i].tree.genes} putOnSale={putOnSale} saleId={accountsTrees[i].saleId} endSale={endSale}/>)
        }
        return (
            <section className={"productsContainer"}>
                {productTiles}
            </section>
        )
    }

    return (
        <main className={style.container}>
            <div className={style.guideSection}>
                <div className={style.title}>
                    <div className={style.titleImageContainer}>
                        <Image src="/Rectangle14.svg" height={55} width={421}/>
                    </div>
                    <div className={style.tileTextContainer}>
                        <h1 className={style.titleText}>GALLERY</h1>
                    </div>

                </div>
                <Search></Search>
            </div>
            <div className={style.productsContainer}>
                {(trees.length)?renderProductTileAll():null}
            </div>
        </main>

    );
};

export default Gallery;
