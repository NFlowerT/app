import React from 'react';
import ProductTile from "../components/productTile/productTile";
const UserPage = ({account, accountsFounds, accountsTrees, putOnSale, endSale, treesOnSale, receiveFunds}) => {
    const renderProductTileAccount = () => {
        const productTiles = []
        //console.log("tile",accountsTrees)
        for (let i = 0; i<accountsTrees.length; i++) {
            console.log(accountsTrees[i], "tile saleid ")
            productTiles.push(<ProductTile id={accountsTrees[i].id} saleId={accountsTrees[i].saleId} genes={accountsTrees[i].tree.genes} putOnSale={putOnSale} saleId={accountsTrees[i].saleId} endSale={endSale}/>)
        }
        return (
            <section className={"productsContainer"}>
                {productTiles}
            </section>
        )
    }

    return (
        <div>
            {account}
            <div>
                founds{accountsFounds}
                {(accountsFounds!=0 && accountsFounds!=="0" && accountsFounds!=undefined)?<button onClick={async()=> await receiveFunds()}>receive founds</button>:null}
            </div>
            <div>your trees {(accountsTrees.length)?renderProductTileAccount() : null}</div>

        </div>
    );
};

export default UserPage;
