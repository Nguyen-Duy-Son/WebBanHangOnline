import SignIn from "~/pages/Users/SignIn/SignIn";
import SignUp from "~/pages/Users/SignUp/SignUp";
import Home from '~/pages/Users/Home/Home';
import { DefaultLayout } from "~/components/layout";
import ProductList from "~/pages/Users/ProductList/ProductList";
import ProductDetail from "~/pages/Users/ProductList/ProductDetail";
import Basket from "~/pages/Users/Basket/Basket";

// Public Routes
const publicRoutes = [
    {path:'/SignIn', component:SignIn,layout: null},
    {path:'/SignUp', component:SignUp,layout: null},
    {path:'/', component:Home,layout: DefaultLayout},
    {path:'/SanPham', component:ProductList,layout: DefaultLayout},
    {path:'/SanPham/:id', component:ProductDetail, layout: DefaultLayout},
    {path:'/cart/:id', component:Basket, layout: DefaultLayout}
]

// Private Routes
const privateRoutes = []
export {publicRoutes,privateRoutes};