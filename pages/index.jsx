import Hero from "../components/home/hero"
import TreeSection from "../components/home/treeSection"
import IslandSection from "../components/home/islandSection"
import React from "react"

const Home = () => {
	return (
		<>
			<Hero title={"FORESTA"} subtitle={"MAKE YOUR FOREST FLY"}/>
			<TreeSection/>
			<IslandSection/>
		</>
	)
}

export default Home
