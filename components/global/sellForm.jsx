import React, {useState} from 'react';
import Image from "next/image";
import style from "../../styles/global/sellForm.module.scss";

const SellForm = ({putOnSale, treeId, show, setShowForm}) => {
    const [price, setPrice] = useState(0)

    return (
        <div className={(show)? style.containerActive : style.container}>
            <div className={style.image}>
                <Image src="/Rectangle42revert.svg" height={185} width={653}></Image>
            </div>
            <div className={style.info}>
                <div>
                    price:
                </div>
                <input className={style.inputPrice} type="number" step="any" min="0.00000000000000001" value={price} onChange={(event)=> setPrice((event.target.value))}/>
                <div className={style.buttons}>
                    <button className={style.button} onClick={async() => await putOnSale(treeId, price)}>PUT ON SALE</button>
                    <button className={style.button} onClick={()=> {setShowForm(false); setPrice(0)}}>CANCEL</button>
                </div>

            </div>
        </div>
    );
};

export default SellForm;
