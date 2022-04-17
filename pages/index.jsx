import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/home.module.css'
import Hero from "../components/home/hero"

const Home = ({mint}) => {
	return (
		<>
			<Hero mint={async()=>await mint()} title={"FORESTA"} subtitle={"MAKE YOUR FOREST FLY"}/>
			<button onClick={async()=>await mint()}>buy</button>
		</>
	)
}

export default Home
