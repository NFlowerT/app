import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/home.module.css'
import Hero from "../components/home/hero"
import TreeSection from "../components/home/treeSection"
import IslandSection from "../components/home/islandSection"

const Home = ({mint}) => {
	return (
		<>
			<Hero mint={async()=>await mint()} title={"FORESTA"} subtitle={"MAKE YOUR FOREST FLY"}/>
			<TreeSection/>
			<IslandSection/>

		</>
	)
}

export default Home
