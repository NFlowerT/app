import React from 'react';
import style from "../../styles/search/searhc.module.scss"
import { BiSearch } from 'react-icons/bi'

const Search = () => {
    return (
        <div className={style.searchBar}>
            <input type={'text'} placeholder={'search'} className={style.search}/>
            <BiSearch className={'searchIcon'}/>
        </div>
    );
};

export default Search;
