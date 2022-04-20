import React, {useContext, useState} from 'react';
import style from "../../styles/home/treeSection.module.scss"
import Image from "next/image"


const TreeSection = () => {
	return (
		<section className={style.main}>
			<div className={style.sectionName}>
				<img src="/TSName.svg" className={style.image}/>
			</div>
			<div className={style.textContainer}>
				<div className={style.text}>
				</div>

			</div>
		</section>
	);
};

export default TreeSection;
