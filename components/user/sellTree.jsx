import React, {useState} from "react"
import style from "../../styles/global/sellTree.module.scss"
import {RiCloseFill} from "react-icons/ri"

const SellTree = ({putOnSale, treeId, show, setShow}) => {
	const [price, setPrice] = useState(0)
	return (

		<div className={style.background}>
			<div className={style.container}>
				<RiCloseFill onClick={()=>setShow(false)}/>
				<div className={style.info}>
					<div>
						price:
					</div>
					<input className={style.inputPrice}
						   type="number"
						   step="any"
						   min="0.00000000000000001"
						   value={price} onChange={(event)=> setPrice((event.target.value))}/>
					<div className={style.buttons}>
						<button className={style.button} onClick={async() => await putOnSale(treeId, price)}>PUT ON SALE</button>
						<button className={style.button} onClick={()=> {setShow(false); setPrice(16)}}>CANCEL</button>
					</div>

				</div>
			</div>
		</div>

	)
}

export default SellTree
