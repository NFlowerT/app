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
            productTiles.push(<ProductTile key={null} id={trees[i].id} genes={trees[i].tree.genes} />)
        }
        return (
            <section className={"productsContainer"}>
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
            marketdfdsdfds
            <div className={style.guideSection}>
                <div className={style.title}>
                    <Image src="/../images/Rectangle 14.svg" height={100} width={200}/>
                </div>
                <Search></Search>
            </div>
            <div className={style.productsContainer}>
                {/*<ProductTile id={0} genes={"lol"} ></ProductTile>*/}
                {/*<ProductTile id={0} genes={"lol"} ></ProductTile>*/}
                {/*<ProductTile id={0} genes={"lol"} ></ProductTile>*/}
                {/*<ProductTile id={0} genes={"lol"} ></ProductTile>*/}
                {/*<ProductTile id={0} genes={"lol"} ></ProductTile>*/}
                {(trees.length)?renderProductTileAll():null}

            </div>
        </main>

    );
};

export default Gallery;
