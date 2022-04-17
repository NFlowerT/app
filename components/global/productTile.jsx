import React, {useState} from 'react';
import Link from 'next/link'
import style from "../../styles/global/productTile.module.scss"
import NTree from "../../nTree/NTree"
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
    const rem = document && parseFloat(getComputedStyle(document.documentElement).fontSize)
    return (
        <Link className={'productPageLink'} href={'/'}>
            <div className={style.productTile}>
                <div className={"productPrice"}>id drzewka: {id}  geny:{genes} }}} {saleId}</div>
                <NTree
                    dnaArray={[genes]}
                    islandSize={5}
                    rockAmount={2}
                    width={15 * rem}
                    height={20 * rem}
                />
                <div className={style.productTitle}>Dąb Maksymiliański</div>
                {(putOnSale)? <button onClick={async()=>await putOnSale(id)}>sale</button>:null}
                {/*<button onClick={()=>{putOnSale(id)}}>sale</button>*/}
                {
                    (saleId!==undefined && ownerOfTreeOnSale(saleId))? <button onClick={async()=>{ await endSale(saleId)}}>end sale</button> :null}
                {(buyTreeFromSale)?<button onClick={async()=>await buyTreeFromSale(saleId, price)}>buy</button>:null}
            </div>
        </Link>
    );
};

export default ProductTile;
