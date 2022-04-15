import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiUserCircle } from 'react-icons/bi'
import Image from 'next/image'
import style from "../../styles/global/nav.module.scss"
import Wallet from "../wallet/wallet";

const Navbar = ({setAccount, loadBlockChainData}) => {
    const router = useRouter()
    const location = router.pathname
    console.log(location)

    return (
        <nav className={style.nav}>
            <Link className={style.logoContainer} href={'/'}>
                <div>
                    <div className={'logoIcon'}>
                    </div>
                    <div className={style.logoTitle }><h4>FORESTA</h4></div>
                </div>

            </Link>
            <Wallet setAccount={setAccount} loadBlockChainData={async () =>await loadBlockChainData()}></Wallet>
            <div className={style.categoryContainer}>
                <div>
                    <Link className={'router ' + (location === '/' ? 'selected' : ' ')} href={'/'}><h4>HOME</h4></Link>
                </div>
                <div>
                    <Link className={'router ' + (location === '/gallery' ? 'selected' : ' ')} href={'/gallery'}><h4>GALLERY</h4></Link>
                </div>
                <div>
                    <Link className={'router ' + (location === '/market' ? 'selected' : ' ')} href={'/market'}><h4>MARKET</h4></Link>
                </div>
                <div className={style.accountIcon}>
                    <Link className={style.routerAccount} href={'/user'}>
                        <BiUserCircle></BiUserCircle>
                    </Link>
                </div>
            </div>

            {/*<div>*/}
            {/*    <Link className={style.routerAccount} href={'/'}>*/}
            {/*        <BiUserCircle></BiUserCircle>*/}
            {/*    </Link>*/}
            {/*</div>*/}

        </nav>
    );
};

export default Navbar;
