import React, { useState, useEffect, createContext} from "react"

import BaseLayout from "../components/global/baseLayout"
import "../styles/globals.css"

import Web3 from "web3"
import HelloWorld from "../src/abis/HelloWorld.json"
import detectEthereumProvider from "@metamask/detect-provider"

export const TreesContext = createContext()

function MyApp({ Component, pageProps }) {
	const [web3, setWeb3] = useState()
	const [account, setAccount] = useState(undefined)
	const [accountFounds, setAccountFounds] = useState(null)
	const [contract, setContract] = useState(undefined)
	const [networkData, setNetworkData] = useState(undefined)
	const [trees, setTrees] = useState([])
	const [treesOnSale, setTreesOnSale] = useState([])
	const [accountsTrees, setAccountsTrees] = useState([])
	const [totalSupply, setTotalSupply] = useState(0)
	const [accountBalance, setAccountBalance] = useState(0)
	const [rem, setRem] = useState(16)
	const [vw, setVw] = useState(1000 / 100)
	const [vh, setVh] = useState(1000 / 100)
	const [width, setWidth] = useState(1000)


	useEffect( () =>{
		(async () =>{await loadWeb3()})()

	}, [])

	useEffect(()=>{
		if (typeof window !== "undefined"){
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
	}, [])

	useEffect( () =>{
		(async () =>{await loadActiveAccountTrees()})()

	}, [treesOnSale])

	useEffect(()=>{
		if(web3!==undefined){
			////console.log(web3)
			(async () =>{const networkId = await web3.eth.net.getId()
				const network = HelloWorld.networks[networkId]
				setNetworkData(network)
			})()

		}

	}, [web3])

	useEffect(()=>{
		//console.log(networkData, account)
		if(networkData!==undefined ){
			(async () => await loadBlockChainData())()

		}

	}, [networkData])

	useEffect( ()=>{
		(async () => {
			await  loadTrees()
			await  smartContractListener()
		})()


	}, [contract])

	useEffect(()=>{
		(async () => {
			await changeAccountHandler()
		})()

	}, [account])

	const changeAccountHandler = ()=>{
		if(account!==undefined && account!=="" && account!=="0x0"){
			(async () => {
				await loadActiveAccountTrees()
				await loadAccountFunds()
			})()
		}
	}

	const loadAccountFunds = async () =>{
		if(account!==undefined && account!=="" && account!=="0x0" && contract){
			let founds = await contract.methods.ownerToFunds(account).call()
			console.log(founds, "founds")
			if(!isNaN(founds))setAccountFounds(founds)
		}
	}

	const receiveFunds = async () => {
		if(account!==undefined && account!=="" && account!=="0x0" && contract && accountFounds!=0) {
			await contract.methods.withdraw().send({from: account})
				.once("receipt", async(receipt) => {
					//console.log("zwrocono srodki")
					await loadAccountFunds()
				})
		}
	}

	const loadWeb3 = async () => {
		if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
			await window.ethereum.enable()
			await window.ethereum.send("eth_requestAccounts")
		}
		else{
			//console.log("install Metamask")
		}

		setWeb3(new Web3(Web3.givenProvider || "wss://rinkeby.infura.io/ws/v3/3b919ac686e84d1e80148ea9dddfb52a"))

		//console.log("account =============", account)

	}

	const smartContractListener = async() =>{
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
		//console.log("load my trees and balance", contract, account)
		if(contract && account!==undefined && account!== "" && account!=="0x0"){
			//console.log("load my trees and balance", contract, account, "jest account")
			let balance = await contract.methods.balanceOf(account).call()
			//console.log("balans: ", balance)
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
				//console.log(treesTab)
				setAccountsTrees([...treesTab])
			}
		}
	}

	const loadBlockChainData = async() => {
		//console.log("load blockchaindata", account)
		if(web3===undefined || networkData===undefined) return 0

		if(networkData){
			const abi = HelloWorld.abi
			const address = networkData.address

			//load contract
			const contract = new web3.eth.Contract(abi, address)
			setContract(contract)

			// const contracts = [{
			//         name: 'HelloWorld',
			//         address: address,
			//         abi:abi,
			//     }];
			// const options = {
			//     pollInterval: 13000, // period between polls in milliseconds (default: 13000)
			//     confirmations: 12,   // n° of confirmation blocks (default: 12)
			//     chunkSize: 10000,    // n° of blocks to fetch at a time (default: 10000)
			//     concurrency: 10,     // maximum n° of concurrent web3 requests (default: 10)
			//     backoff: 1000        // retry backoff in milliseconds (default: 1000)
			// };
			// const ethereumEvents = new EthereumEvents(web3, contracts, options);
			// ethereumEvents.start();
			// alert(ethereumEvents.isRunning())
			// ethereumEvents.on('block.confirmed', (blockNumber, events, done) => {
			//     alert("NOWY BLOK")
			//
			// });
			// ethereumEvents.on('error', err => {
			//
			//     alert("error")
			//
			// });
			// web3.eth.subscribe('newBlockHeaders' , ()=>{
			//     //console.log("looolll")
			// });
			// await loadTrees()

		}
	}

	const loadTrees = async() =>{
		//console.log("load trees", contract, account)
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
			//console.log("dfgvmfdkgjdkic")
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

		if(account!="" && account!= undefined){
			//console.log(totalSupply, "total supply przed")
			await contract.methods.requestTree().send({ from: account, value: Web3.utils.toWei(String(0.1), "ether")})
				.once("receipt", async(receipt) => {
					//console.log("kupiono drzewk0")

					//console.log(totalSupply, "total supply po")
					await loadWeb3()
				})
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
					accountsTrees: accountsTrees,
					treesOnSale:treesOnSale,
					accountFounds: accountFounds,
					account:account,
					contract:contract,
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
				/>
			</BaseLayout>
		</TreesContext.Provider>

	)
}

export default MyApp
