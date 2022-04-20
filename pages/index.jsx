import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/home.module.css'
import Hero from "../components/home/hero"
import TreeSection from "../components/home/treeSection"
import React, {useState, useEffect, useContext} from 'react';

import {TreesContext} from "./_app";

const Home = ({mint}) => {
	const {trees} = useContext(TreesContext)

	return (
		<>
			<Hero mint={async()=>await mint()} title={"FORESTA"} subtitle={"MAKE YOUR FOREST FLY"} trees={trees}/>
			<TreeSection/>
		</>
	)
}

export default Home
