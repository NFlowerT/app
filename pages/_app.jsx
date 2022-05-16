import React, { useState, useEffect, createContext} from "react"

import BaseLayout from "../components/global/baseLayout"
import "../styles/globals.scss"

import Web3 from "web3"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import HelloWorld from "../src/abis/HelloWorld.json"
import detectEthereumProvider from "@metamask/detect-provider"
import {sliceAccount} from "../functions/sliceAccount"

export const TreesContext = createContext()
export const AccountContext = createContext()
export const BrowserContext = createContext()

function MyApp({ Component, pageProps }) {
	const [web3, setWeb3] = useState()
	const [web3M, setWeb3M] = useState()
	const [provider, setProvider] = useState()
	const [account, setAccount] = useState(undefined)
	const [accountFounds, setAccountFounds] = useState(null)
	const [contract, setContract] = useState(undefined)
	const [networkData, setNetworkData] = useState(undefined)
	const [networkId, setNetworkId] = useState(undefined)
	const [trees, setTrees] = useState([])
	const [treesOnSale, setTreesOnSale] = useState([])
	const [accountsTrees, setAccountsTrees] = useState([])
	const [totalSupply, setTotalSupply] = useState(0)
	const [accountBalance, setAccountBalance] = useState(0)
	const [rem, setRem] = useState(0)
	const [vw, setVw] = useState(0)
	const [vh, setVh] = useState(0)
	const [width, setWidth] = useState(0)
	console.log("--------------------render")

	useEffect( () =>{
		(async () =>{
			const web3Modal = new Web3Modal({
				network: "rinkeby", // optional
				cacheProvider: true, // optional
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
				setWeb3M(web3Modal)
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

					(async() => {
						const accounts = await web3.eth.getAccounts()
						console.log(accounts, 'lllllllllllllllllllllllllllll')
						//await connectWalletHandler(accounts[0])
						setAccount(accounts[0])
						console.log(web3)
					})();


					// provider.on("disconnect", (error) => {
					// 	console.log(error);
					// });
				}

			}catch(e){
				//alert(e)
				setWeb3(new Web3( "wss://rinkeby.infura.io/ws/v3/3b919ac686e84d1e80148ea9dddfb52a"))
			}
			console.log("web3")

			// provider.on("accountsChanged", (accounts: string[]) => {
			// 	console.log(accounts);
			// });
			//setWeb3(new Web3( Web3.givenProvider || "wss://rinkeby.infura.io/ws/v3/3b919ac686e84d1e80148ea9dddfb52a"))
			// if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
			// 	// await window.ethereum.enable()
			// 	// const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
			// 	await connectWalletHandler()
			// 	window.ethereum.on("accountsChanged",  async(account) => await connectAutoWalletHandler(account))		}
			// else{
			// 	//console.log("install Metamask")
			// }
			// console.log("load web 3333")
		})()



	}, [])

	// useEffect(()=>{
	// 	(async()=> {
	// 		setWeb3(new Web3( "wss://rinkeby.infura.io/ws/v3/3b919ac686e84d1e80148ea9dddfb52a"))
	// 		// if(web3){
	// 		//
	// 		// 	(async() => {
	// 		// 		const accounts = await web3.eth.getAccounts()
	// 		// 		console.log(accounts, 'lllllllllllllllllllllllllllll')
	// 		// 		//await connectWalletHandler(accounts[0])
	// 		// 		setAccount(accounts[0])
	// 		// 		console.log(web3)
	// 		// 	})();
	// 		//
	// 		// }
	// 	})()
	// })
	const disconnect = async() => {
		setAccount(undefined)
		web3M.clearCachedProvider()
	}

	useEffect(()=>{
		if(provider!== undefined){
			providerListeners()
		}
	}, [provider])

	const providerListeners = () => {
		if(provider!==undefined){
			console.log("listening")
			provider.on("accountsChanged", (accounts) => {
				console.log(accounts, 'accountsChanged');
				setAccount(accounts[0])
			});

// Subscribe to chainId change
			provider.on("chainChanged", async (chainId) => {
				console.log(chainId, 'chainChanged');
				await getNetworkInfo()
			});

// Subscribe to provider connection
			provider.on("connect", (info) => {
				console.log(info, 'connect');
			});

// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
				console.log(error, 'disconnect');
				setAccount(undefined)
			});
		}

	}


	//useEffect( () => {
		// if(provider!== undefined && web3){
		// 	provider.on("accountsChanged", (accounts) => {
		// 		console.log(accounts, "ACCOUNTS");
		// 		setAccount(accounts[0])
		// 	});
		// }
		// if(web3){
		// 	console.log(web3)
		// 	const accounts = (async() => await web3.eth.getAccounts())();
		// 	(async () => await connectWalletHandler(accounts[0]))()
		// }

	//}, [web3])
	// 	if(window.ethereum && provider){
	// 		const accounts = (async () => await window.ethereum.request({ method: "eth_requestAccounts" }))();
	// 		(async () => await connectWalletHandler(accounts[0]))()
	// 		window.ethereum.on("accountsChanged",  async(account) => await connectAutoWalletHandler(account))
	// 		// window.ethereum.on("chainChanged", async()=>await loadBlockChainData())
	// 		// console.log("wallet")
	// 	}
	// }, [provider])
	// useEffect( () => {
	// 	if(window.ethereum && window.ethereum.isMetaMask){
	// 		window.ethereum.on("accountsChanged",  async(account) => await connectAutoWalletHandler(account))
	// 	}
	// }, [])

	useEffect(()=>{
		if (typeof window !== "undefined"){
			console.log("effect")
			setVw(window.innerWidth / 100)
			setVh(window.innerHeight / 100)
			setRem(parseFloat(getComputedStyle(document.documentElement).fontSize))
			setWidth(window.innerWidth)
			window.addEventListener("resize", () => {
				setVw(window.innerWidth / 100)
				setVh(window.innerHeight / 100)
				setRem(parseFloat(getComputedStyle(document.documentElement).fontSize))
				setWidth(window.innerWidth)
			})
		}
		// (async () =>{await loadWeb3(); console.log("load web 3333")})()

	}, [])

	useEffect( () =>{
		(async () =>{await loadActiveAccountTrees()})()

	}, [treesOnSale])

	useEffect(()=>{
		(async () => {
			await getNetworkInfo()
		})()

	}, [web3, web3M])

	useEffect(()=>{
		//console.log(networkData, account)
		if(networkData!==undefined ){
			(async () => {
				await loadBlockChainData()
				console.log("data")
			})()

		}

	}, [networkData])

	useEffect( ()=>{
		(async () => {
			await  loadTrees()
			await  smartContractListener()
			await loadAccountFunds()
		})()


	}, [contract])

	useEffect(()=>{
		(async () => {
			await changeAccountHandler()
		})()
		if(account == undefined || account == "0x0"){
			console.log("undefined")
			setAccountsTrees([])
		}


	}, [account])
	//when user change account in MetaMask wallet
	const connectAutoWalletHandler = (account) => {
		console.log("connectAutoWalletHandler")
		// setAccount(account[0].toLowerCase())
		// setAccount(account[0])
		// sliceAccount(account[0])
	}

	//when user click connection button
	const connectWalletHandler = async() => {
		// if (window.ethereum && window.ethereum.isMetaMask) {
		// 	try{
		// 		await window.ethereum.request({ method: "eth_requestAccounts"})
		// 			.then(async result => {
		// 				setAccount(result[0])
		// 				console.log("then ")
		// 				// setConnButtonText('Connected!');
		// 				// await loadWeb3()
		// 				// sliceAccount(result[0])
		// 			})
		// 			.catch(error => {
		// 				// alert(error.message+"lol")
		// 			})
		// 	}
		// 	catch{
		// 	}
		// } else {
		// 	alert("Please install MetaMask browser extension to interact")
		// }

	}

	const getNetworkInfo = async()=>{
		if(web3!==undefined ){

			try{
				const netId = await web3.eth.getChainId();
				setNetworkId(networkId)
				if(netId!= 4) {
					alert("please change network to rinkebyyy")
					setNetworkData(undefined)
				}
				else {
					const network = HelloWorld.networks[netId]
					setNetworkData(network)

				}
			}
			catch{

			}

			console.log("network")
		}
		else if(web3M!==undefined){
			try{
				//const netId = await web3.eth.getChainId();
				//setNetworkId(4)
				if(netId!= 4) {
					alert("please change network to rinkebyyy")
					setNetworkData(undefined)
				}
				else {
					const network = HelloWorld.networks[4]
					setNetworkData(network)

				}
			}
			catch {}

		}


	}

	const changeAccountHandler = ()=>{
		if(account!==undefined && account!=="" && account!=="0x0"){
			(async () => {
				await loadActiveAccountTrees()
				await loadAccountFunds()
				console.log("change")
			})()
		}

	}

	const loadAccountFunds = async () =>{
		console.log("loadAccountFunds")
		if(account!==undefined && account!=="" && account!=="0x0" && contract){
			let founds = await contract.methods.ownerToFunds(account).call()
			console.log(founds, "founds")
			setAccountFounds(founds)
		}
	}

	const receiveFunds = async () => {
		console.log("receiveFunds")
		if(account!==undefined && account!=="" && account!=="0x0" && contract && accountFounds!=0) {
			await contract.methods.withdraw().send({from: account})
				.once("receipt", async(receipt) => {
					//console.log("zwrocono srodki")
					await loadAccountFunds()
				})
		}
	}

	const loadWeb3 = async () => {
		//setWeb3(new Web3(Web3.givenProvider || "wss://rinkeby.infura.io/ws/v3/3b919ac686e84d1e80148ea9dddfb52a"))
		// if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
		// 	// await window.ethereum.enable()
		// 	// const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
		// 	//await connectWalletHandler()
		// 	//window.ethereum.on("accountsChanged",  async(account) => await connectAutoWalletHandler(account))		}
		// else{
		// 	//console.log("install Metamask")
		// }


		//console.log("account =============", account)

	}

	const smartContractListener = async() =>{
		// console.log("smartContractListener")
		if(contract){

			contract.events.Transfer({}, async(error, data)=>{
				if (error) {
					//console.log("😥 " + error.message);
				} else {
					// setMessage(data.returnValues[1]);
					//console.log("🎉 Your message has been updated!");
					await loadTrees()
					await loadActiveAccountTrees()
				}
			})
			contract.events.TreeRequested({}, async(error, data)=>{
				if (error) {
					//console.log("😥 " + error.message);
				} else {
					// setMessage(data.returnValues[1]);
					//console.log("🎉 Your message has been updated!");
					await loadTrees()
					await loadActiveAccountTrees()
				}
			})
			contract.events.BoughtTreeOnSale({}, async(error, data)=>{
				if (error) {
					//console.log("😥 " + error.message);
				} else {
					// setMessage(data.returnValues[1]);
					//console.log("🎉 Your message has been updated!");
					await loadTrees()
					await loadActiveAccountTrees()
				}
			})
			contract.events.SaleEnded({}, async(error, data)=>{
				if (error) {
					//console.log("😥 " + error.message);
				} else {
					// setMessage(data.returnValues[1]);
					//console.log("🎉 Your message has been updated!");
					await loadTrees()
					await loadActiveAccountTrees()
				}
			})
			contract.events.TreePutOnSale({}, async(error, data)=>{
				if (error) {
					//console.log("😥 " + error.message);
				} else {
					// setMessage(data.returnValues[1]);
					//console.log("🎉 Your message has been updated!");
					await loadTrees()
					await loadActiveAccountTrees()
				}
			})
		}
	}

	const loadActiveAccountTrees = async () => {
		// console.log("load my trees and balance", contract, account)
		if(contract && account!==undefined && account!== "" && account!=="0x0"){
			//console.log("load my trees and balance", contract, account, "jest account")
			let balance = await contract.methods.balanceOf(account).call()
			console.log("balans: ", balance)
			setAccountBalance(balance)


			//add current account's trees

			let treesTab = []
			try{
				for(var i = 0; ; i++){
					let tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call()
					let tree = await contract.methods.trees(tokenId).call()
					let treeObj = {}
					treeObj = {"id":tokenId, "tree":tree}
					treesOnSale.forEach((treeOnsale, saleIndex) => {
						if(treeOnsale.tree.TreeId===tokenId){
							// alert("tak")
							treeObj = {"id":tokenId, "tree":tree, "saleId": treesOnSale[saleIndex].id}
						}
					})
					treesTab.push(treeObj)
				}
			}
			catch {
				//console.log("koniec drzew account")
			}
			finally {
				console.log(treesTab, "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
				setAccountsTrees([...treesTab])
			}
		}
	}

	const loadBlockChainData = async() => {
		// console.log("load blockchaindata", account)
		if(web3===undefined || networkData===undefined) {
			alert("change network to rinkeby")
			return 0
		}

		if(networkData){
			const abi = HelloWorld.abi
			const address = networkData.address

			//load contract
			const contract = new web3.eth.Contract(abi, address)
			setContract(contract)

		}
	}

	const loadTrees = async() =>{
		// console.log("load trees", contract, account)
		if(contract== undefined) return 0
		//console.log("load trees")

		//load totalSupply
		const totalSupply = await contract.methods.totalSupply().call()
		setTotalSupply(totalSupply)
		//console.log("toteal supply", totalSupply)

		//load requests to mint tree
		try{
			for(var i = 0; ; i++){
				let request = await contract.methods.requests(i).call()
			}
		}
		catch {
			//console.log("koniec requestów")
		}


		// load all trees
		let treesTab = []
		try{
			for(var i = 0; ; i++){
				let tree = await contract.methods.trees(i).call()
				let treeObj = {"id":i, "tree":tree}
				treesTab.push(treeObj)
			}
		}
		catch {
			//console.log("koniec drzew")
		}
		finally {
			setTrees([...treesTab])
		}

		//load account's trees
		//console.log(account, "looooooooooll")
		if(account!== undefined && account!== "" && account!=="0x"){
			console.log("load accounts treese")
			await loadActiveAccountTrees()
		}

		//load trees on sale
		let treesTabOnSale = []
		try{
			for(var i = 0; ; i++){
				let tree = await contract.methods.sales(i).call()
				//console.log("===============")
				if(tree.active){
					let treeObj = {"id":i, "tree":tree}
					//console.log("on sale, ", treeObj)
					treesTabOnSale.push(treeObj)
				}
			}
		}
		catch {
			//console.log("koniec drzew on sale")
		}
		finally {
			setTreesOnSale([...treesTabOnSale])
		}
	}

	const mint = async () => {
		//console.log("account ktory kupuje", account)

		if(account!="" && account!== undefined && contract!==undefined){
			console.log(account, "total supply przed", Web3.utils.toWei(String(0.1), "ether"), contract.methods)
			await contract.methods.requestTree().send({ from: account, value: Web3.utils.toWei(String(0.1), "ether")})
				.once("receipt", async(receipt) => {
					//console.log("kupiono drzewk0")

					//console.log(totalSupply, "total supply po")
					await loadWeb3()
				})
		}
		else {
			alert("please connect your wallet")
		}
		await loadWeb3()
	}

	const putOnSale = async (tokenId, price) => {
		try{
			if(account!="" && account!= undefined && tokenId!==undefined && tokenId!==null  && parseFloat(price)>0){
				//console.log("PUT ON SALE")
				await contract.methods.putTreeOnSale(tokenId,Web3.utils.toWei(String(price), "ether")).send({ from: account})
					.once("receipt", async(receipt) => {
						//console.log("put on sale")
						await loadWeb3()
					})
			}
		}
		catch{

		}
		//console.log("PUT ON SALE", tokenId)

	}

	const endSale = async (tokenIdOnSale) => {
		console.log("END SALE", tokenIdOnSale)
		if(account!="" && account!= undefined && tokenIdOnSale!==undefined && tokenIdOnSale!==null){
			//console.log("END SALE")
			await contract.methods.endSale(tokenIdOnSale).send({ from: account})
				.once("receipt", async(receipt) => {
					//console.log("put on sale")
					await loadWeb3()

				})
		}
	}

	const buyTreeFromSale = async (saleId, price) => {
		console.log("BUY FROM SALE", saleId)
		if(account!="" && account!= undefined && saleId!==undefined && saleId!==null && price!==undefined && price!=null){
			await contract.methods.buyTree(saleId).send({ from: account, value: String(price)})
				.once("receipt", async(receipt) => {
					//console.log("put on sale")

					await loadWeb3()

				})


		}
	}


	return (
		<TreesContext.Provider
			value={
				{
					trees: trees,
					treesOnSale:treesOnSale,
					contract:contract,
					setProvider: setProvider,
					setWeb3: setWeb3,
					setContract: setContract
				}
			}>
			<AccountContext.Provider
				value={
					{
						accountsTrees: accountsTrees,
						accountFounds: accountFounds,
						account:account
					}
				}>
				<BrowserContext.Provider
					value={
						{
							rem: rem,
							vw: vw,
							vh: vh,
							width: width
						}
					}>
					<BaseLayout
						setAccount={setAccount}
						loadBlockChainData={loadBlockChainData}
						mint={mint}>
						<Component {...pageProps}
								   mint={mint}
								   putOnSale={putOnSale}
								   endSale={endSale}
								   buyTreeFromSale={buyTreeFromSale}
								   receiveFunds={receiveFunds}
								   setAccount={setAccount}
								   setProvider={setProvider}
								   setWeb3={setWeb3}
								   web3={web3}
								   disconnect={disconnect}
						/>
					</BaseLayout>
				</BrowserContext.Provider>
			</AccountContext.Provider>
		</TreesContext.Provider>

	)
}

export default MyApp
