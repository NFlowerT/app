import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/home.module.css'
import Hero from "../components/home/hero"
import TreeSection from "../components/home/treeSection"
import IslandSection from "../components/home/islandSection"
import {TreesContext} from "./_app";
import React, {useContext} from 'react'

const Home = () => {
	const {trees} = useContext(TreesContext)
	return (
		<>
			<Hero title={"FORESTA"} subtitle={"MAKE YOUR FOREST FLY"} trees={trees}/>
			<TreeSection/>
			<IslandSection/>
		</>
	)
}

export default Home
