import React, {useState} from 'react';
import Link from 'next/link'
import Image from 'next/image'
import style from "../../styles/global/productTile.module.scss"
const ProductTile = ({ id , putOnSale, genes, saleId, endSale, buyTreeFromSale, price, contract, account}) => {
    // useState(()=>{
    //     (async()=> await ownerOfTreeOnSale(saleId))()
    // }, [account])

    const ownerOfTreeOnSale = async (saleId)=>{
        if(!contract || contract==undefined) return 0
        let tree = await contract.methods.sales(saleId).call()
        let owner = tree.owner
       console.log(owner.toLowerCase(),owner.toLowerCase() == account, saleId)
        if(owner.toLowerCase() == account){
            // alert("tak")
            return true
        }
        return false
    }
    const convertWei = (price) =>{
        return price/1000000000000000000+" ETH"
    }

    return (
        <Link className={'productPageLink'} href={'/product?id='+id}>
            <div className={style.productTile}>
                {(price)?
                    <div className={style.priceContainer}>
                        <div className={style.priceImge}>
                            <Image src="/Rectangle64.svg" height={40} width={170} className={style.image}></Image>

                        </div>
                        <div className={style.price}>
                            <div>{convertWei(price)}</div>
                        </div>
                    </div> : <p>{id}</p>
                }

                {/*<div className={"productPrice"}>id drzewka: {id}  geny:{genes} }}} {saleId}</div>*/}
                <div className={"drzewkoAleksa"}>
                </div>
                <div className={style.productTitle}>{genes}</div>
                {/*{(putOnSale)? <button onClick={async()=>await putOnSale(id)}>sale</button>:null}*/}
                {/*<button onClick={()=>{putOnSale(id)}}>sale</button>*/}
                {/*{(saleId!==undefined && ownerOfTreeOnSale(saleId))? <button onClick={async()=>{ await endSale(saleId)}}>end sale</button> :null}*/}
                {/*{(buyTreeFromSale)?<button onClick={async()=>await buyTreeFromSale(saleId, price)}>buy</button>:null}*/}
            </div>
        </Link>
    );
};

export default ProductTile;
