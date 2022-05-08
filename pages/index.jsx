import Hero from "../components/home/hero"
import TreeSection from "../components/home/treeSection"
import IslandSection from "../components/home/islandSection"
import React, {useContext, useState} from "react"
import {TreesContext} from "./_app"
import SaplingSection from "../components/home/saplingSection"
import BuySapling from "../components/home/buySapling"

const Home = ({mint, setAccount}) => {
	const {trees} = useContext(TreesContext)
	const [sapling, setSapling] = useState("")
	return (
		<>
			<Hero title={"FORESTA"} subtitle={"MAKE YOUR FOREST FLY"} trees={trees} scrollToId={"treeSection"}/>
			<TreeSection/>
			<IslandSection/>
			<SaplingSection setSapling={setSapling}/>
			{sapling && <BuySapling setSapling={setSapling} mint={mint} setAccount={setAccount}/>}
		</>
	)
}

export default Home
