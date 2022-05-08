import React, {useEffect, useState, useContext} from "react"
import style from "../../styles/wallet/wallet.module.scss"
import Image from "next/image"
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Authereum from "authereum";
import Web3 from "web3";
import {TreesContext} from "../../pages/_app"

const Wallet = ({ setAccount, loadBlockChainData}) => {
	const [errorMessage, setErrorMessage] = useState(null)
	const [connButtonText, setConnButtonText] = useState("Connect to MetaMask")
	const {setWeb3, setProvider} = useContext(TreesContext)

	useEffect( () => {
		// if(window.ethereum && window.ethereum.isMetaMask){
		// 	const accounts = (async () => await window.ethereum.request({ method: "eth_requestAccounts" }))();
		// 	(async () => await connectWalletHandler(accounts[0]))()
		// 	window.ethereum.on("accountsChanged",  async(account) => await connectAutoWalletHandler(account))
		// 	window.ethereum.on("chainChanged", async()=>await loadBlockChainData())
		// 	console.log("wallertghbt")
		// }
	}, [])
	useEffect( () => {
		// if(window.ethereum && window.ethereum.isMetaMask){
		// 	window.ethereum.on("accountsChanged",  async(account) => await connectAutoWalletHandler(account))
		// }
	}, [])

	//when user change account in MetaMask wallet
	const connectAutoWalletHandler = (account) => {
		console.log("connectAutoWalletHandler")
		// setAccount(account[0].toLowerCase())
		setAccount(account[0])
		sliceAccount(account[0])
	}

	//when user click connection button
	const connectWalletHandler = async() => {
		// if (window.ethereum && window.ethereum.isMetaMask) {
		// 	await window.ethereum.request({ method: "eth_requestAccounts"})
		// 		.then(async result => {
		// 			console.log(result[0], "lol")
		// 			setAccount(result[0])
		// 			// setConnButtonText('Connected!');
		// 			// await loadWeb3()
		// 			sliceAccount(result[0])
		// 		})
		// 		.catch(error => {
		// 			// alert(error.message+"lol")
		// 		})
		// } else {
		// 	alert("Please install MetaMask browser extension to interact")
		// }

			const web3Modal = new Web3Modal({
				network: "rinkeby", // optional
				cacheProvider: false, // optional
				providerOptions:{
					walletconnect: {
						display: {
							// logo: "data:image/gif;base64,INSERT_BASE64_STRING",
							name: "Mobile",
							description: "Scan qrcode with your mobile wallet"
						},
						package: WalletConnectProvider, // required
						options: {
							infuraId: "3b919ac686e84d1e80148ea9dddfb52a" // required
						}
					},
					walletlink: {
						package:  CoinbaseWalletSDK,
						options: {
							appName: "Web 3 Modal Demo",
							infuraId: "3b919ac686e84d1e80148ea9dddfb52a"
						}
					},
					authereum: {
						package: Authereum // required
					}
				}

				// 'custom-walletlink': {
				// 	display: {
				// 		logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
				// 		name: 'Coinbase',
				// 		description: 'Connect to Coinbase Wallet (not Coinbase App)',
				// 	},
				// 	options: {
				// 		appName: 'Coinbase', // Your app name
				// 		networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
				// 		chainId: 1,
				// 	},
				// 	package: WalletLink,
				// 	connector: async (_, options) => {
				// 		const { appName, networkUrl, chainId } = options
				// 		const walletLink = new WalletLink({
				// 			appName,
				// 		})
				// 		const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
				// 		await provider.enable()
				// 		return provider
				// 	},
			});
			try{
				const provider = await web3Modal.connect();
				provider.on("accountsChanged", (accounts) => {
					console.log(accounts)
				})
				setProvider(provider)
				const web3 = new Web3(provider);
				setWeb3(web3)
				// if(provider!== undefined && web3){
				// 	provider.on("accountsChanged", (accounts) => {
				// 		console.log(accounts, "ACCOUNTS");
				// 		setAccount(accounts[0])
				// 	});
				// }
				if(web3){

						const accounts = await web3.eth.getAccounts()
						console.log(accounts, 'lllllllllllllllllllllllllllll')
						//await connectWalletHandler(accounts[0])
						setAccount(accounts[0])
						console.log(web3)



					// provider.on("disconnect", (error) => {
					// 	console.log(error);
					// });
				}

			}catch(e){
				alert(e)
				setWeb3(new Web3( "wss://rinkeby.infura.io/ws/v3/3b919ac686e84d1e80148ea9dddfb52a"))
			}
			console.log("web3")

	}

	const sliceAccount = (account) => {
		if(account!== undefined && account!== "0x0"){
			let short = ""
			short = account.slice(0, 4)
			short+="..."
			short += account.slice(account.length-3, account.length)
			setConnButtonText(short)
		}
	}

	return (
		<div>
			<button onClick={connectWalletHandler} className={style.metaMaskButton}>
				{connButtonText}
				{/*<Image src="/metamask.jpg" height={25} width={25} className={style.metaMaskimage}></Image>*/}
			</button>
		</div>

	)
}

export default Wallet
