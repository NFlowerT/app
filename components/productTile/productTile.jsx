import React from 'react';
import Link from 'next/link'
import style from "../../styles/productTile/productTile.module.scss"
const ProductTile = ({ id , putOnSale, genes, saleId, endSale}) => {
    return (
        <Link className={'productPageLink'} href={'/'}>
            <div className={style.productTile}>
                <div className={"productPrice"}>id drzewka: {id}  geny:{genes} }}} {saleId}</div>
                <div className={"drzewkoAleksa"}>
                </div>
                <div className={style.productTitle}>Dąb Maksymiliański</div>
                {/*<button onClick={()=>{putOnSale(id)}}>sale</button>*/}
                {/*{(saleId!==undefined)? <button onClick={()=>{endSale(saleId)}}>end sale</button> :null}*/}
            </div>
        </Link>
    );
};

export default ProductTile;
