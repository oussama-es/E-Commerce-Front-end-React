import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './core/Home';
import Shop from './core/Shop';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Dashboard from './user/Dashboard';
import AdminDashboard from './user/AdminDashboard';
import Menu from './core/Menu';

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import UpdateCategory from './admin/category/UpdateCategory'; // Importez le composant de mise à jour des catégories
import ListCategories from './admin/category/ListCategories'; // Importez le composant pour lister les catégories

import AddCategory from './admin/category/AddCategory'
import AddProduct from './admin/product/AddProduct'
import ListOrders from './admin/order/ListOrders'
import Product from './core/Product'

import Cart from './core/Cart'
import UpdateProduct from './admin/product/UpdateProduct';
import DeleteProduct from './admin/product/DeleteProduct';
import ListProducts from './admin/product/ListProducts';

const Routes = () => {
    return (
        <BrowserRouter>
           <Menu />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/shop' exact component={Shop} />
                <PrivateRoute path='/dashboard' exact component={Dashboard} />
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/category/create' exact component={AddCategory} />
                <AdminRoute path='/product/create' exact component={AddProduct} />
                <AdminRoute path='/admin/order' exact component={ListOrders} />
                <AdminRoute path='/category/update/:categoryId' exact component={UpdateCategory} />

                <AdminRoute path='/category/list' exact component={ListCategories} /> {/* Nouvelle route pour lister les catégories */}

                <AdminRoute path='/product/list' exact component={ListProducts} />
                <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct} />
                <AdminRoute path='/admin/product/delete/:productId' exact component={DeleteProduct} />



                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/cart' exact component={Cart} />
                <Route path='/product/:id' exact component={Product} />
            </Switch>
        
        </BrowserRouter>
    )
}

export default Routes
