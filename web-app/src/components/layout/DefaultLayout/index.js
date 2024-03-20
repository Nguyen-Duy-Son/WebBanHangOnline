import React from 'react';
import Header from "./Header/Header";
import Slidebar from './Slidebar/Slidebar';
import ProductList from '~/pages/Users/ProductList/ProductList';

// import UserContext from '../../../pages/Users/UserContext/UserContext';
function DefaultLayout({ children }) {
    return ( 
        <div className='container'>
            <Header></Header>
            <div className="content">
                <Slidebar></Slidebar>
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
