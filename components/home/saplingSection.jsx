import React, {useContext} from "react"
import style from "../../styles/home/saplingSection.module.scss"
import {BsQuestion} from "react-icons/bs"
import NTree from "../../nTree/NTree"
import {BrowserContext} from "../../pages/_app"

const SaplingSection = ({setSapling}) => {
	const {rem} = useContext(BrowserContext)
	return (
		<>
			<section className={style.main} id={"saplingSection"}>
				<div className={style.sectionName}>
					<h2>SAPLINGS</h2>
				</div>
				<div className={style.container}>
					<div className={style.title}>
						<h1>CHOOSE YOUR TREE</h1>
					</div>
					<div className={style.saplingContainer}>
						<div className={style.saplingTile}>
							<div className={style.saplingImg}><BsQuestion/></div>
							<div className={style.saplingName}>
								<h4>Coming soon</h4>
							</div>
						</div>
						<div className={style.saplingTile} onClick={() => setSapling("pine")}>
							<div className={style.saplingImg}>
								<NTree
									disabled={true}
									width={20 * rem}
									height={22 * rem}
									cameraPosition={{x: 6, y: -1, z: 6}}
									y={-1.5}
									age={12}
									innerRadius={1}
								/>
							</div>
							<div className={style.saplingName}>
								<h4>Pine sapling</h4>
							</div>
						</div>
						<div className={style.saplingTile}>
							<div className={style.saplingImg}><BsQuestion/></div>
							<div className={style.saplingName}>
								<h4>Coming soon</h4>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>

	)
}

export default SaplingSection
