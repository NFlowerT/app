import React from 'react';
import style from "../styles/market/market.module.scss"
import Image from 'next/image'
//components
import Search from "../components/search/search";
import Filter from "../components/filter/filter";
import ProductTile from "../components/productTile/productTile";

const Gallery = () => {
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
                <ProductTile id={0} genes={"lol"} ></ProductTile>
                <ProductTile id={0} genes={"lol"} ></ProductTile>
                <ProductTile id={0} genes={"lol"} ></ProductTile>
                <ProductTile id={0} genes={"lol"} ></ProductTile>
                <ProductTile id={0} genes={"lol"} ></ProductTile>

            </div>
        </main>

    );
};

export default Gallery;
