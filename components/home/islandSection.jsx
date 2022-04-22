import React, {useContext, useState} from 'react';
import style from "../../styles/home/islandSection.module.scss"


const IslandSection = () => {
	return (
		<section className={style.main}>
			<div className={style.sectionName}>
				<img src="/ISName.svg" className={style.image}/>
			</div>
			<div className={style.container}>
				<div className={style.textContainer}>
					<div className={style.text}>
						<div className={style.title}>
							<h2>Czym są drzewka?</h2>
						</div>

						<h3>Lorem ipsum dolor sit amet, t, consectetur adipiscing elit. Cipa convallis sollicitudin cursus. In varius, felis vitae facilisis vulputate, kutas enim tincidunt
							us. In varius, felis vitae facilisis vulputate, metus enim tincidunt leo, ut tempus leo lorem s
						</h3>
					</div>
					<div className={style.buttonSec}>
						<button className={style.but}>Buy</button>
					</div>
				</div>

				<div className={style.tree}>

				</div>
			</div>
		</section>
	);
};

export default IslandSection;