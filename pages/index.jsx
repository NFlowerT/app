import Hero from "../components/home/hero"
import TreeSection from "../components/home/treeSection"
import IslandSection from "../components/home/islandSection"
import React, {useContext} from "react"
import {TreesContext} from "./_app"
import SaplingSection from "../components/home/saplingSection"

const Home = () => {
	const {trees} = useContext(TreesContext)
	return (
		<>
			<Hero title={"FORESTA"} subtitle={"MAKE YOUR FOREST FLY"} trees={trees} scrollToId={"treeSection"}/>
			<TreeSection/>
			<IslandSection/>
			<SaplingSection/>
		</>
	)
}

export default Home
