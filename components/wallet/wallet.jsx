import React, {useEffect, useState} from 'react';
import style from "../../styles/wallet/wallet.module.scss";
import Image from "next/image";

const Wallet = ({ setAccount, loadBlockChainData}) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect');

    useEffect( () => {
        if(window.ethereum && window.ethereum.isMetaMask){
            const accounts = (async () => await window.ethereum.request({ method: 'eth_requestAccounts' }))();
            (async () => await connectWalletHandler(accounts[0]))()
            window.ethereum.on('accountsChanged',  connectAutoWalletHandler);
            window.ethereum.on('chainChanged', async()=>await loadBlockChainData());
            console.log("wallet")
        }
    }, []);

    //when user change account in MetaMask wallet
    const connectAutoWalletHandler = (account) => {
        console.log("connectAutoWalletHandler")
        // setAccount(account[0].toLowerCase())
        setAccount(account[0])
    }

    //when user click connection button
    const connectWalletHandler = async() => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            await window.ethereum.request({ method: 'eth_requestAccounts'})
                .then(async result => {
                    console.log(result[0])
                    setAccount(result[0]);
                    setConnButtonText('Connected!');
                    // await loadWeb3()
                })
                .catch(error => {
                    alert(error.message+"lol");
                });
        } else {
            alert('Please install MetaMask browser extension to interact');
        }

    }

    return (
        <div>
            <button onClick={connectWalletHandler} className={style.metaMaskButton}>
                {connButtonText}
                <Image src="/metamask.jpg" height={25} width={25} className={style.metaMaskimage}></Image>
            </button>
        </div>

    );
};

export default Wallet;
