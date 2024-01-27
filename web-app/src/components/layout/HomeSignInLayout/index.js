import React, { useState } from 'react';
import Header from "./Header/Header";
import Slidebar from './Slidebar/Slidebar';
import ProductList from '~/pages/Users/ProductList/ProductList';
import { useLocation } from 'react-router-dom';
function DefaultLayout({ children }) {
    const { state } = useLocation();
    const user =  state && state.user;
    return ( 
        <div className='container'>
            <Header user={user}></Header>
            <div className="content">
                <Slidebar></Slidebar>
                {
                    !children&&<ProductList></ProductList>
                }
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
