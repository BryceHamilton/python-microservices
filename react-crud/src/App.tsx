import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Main from './main/main';
import Products from './admin/products/products';
import ProductsCreate from './admin/products/products-create';
import ProductsEdit from './admin/products/products-edit';

const App = () => (
  <div className='App'>
    <Router>
      <Route path='/' exact component={Main} />
      <Route path='/admin/products' exact component={Products} />
      <Route path='/admin/products/create' exact component={ProductsCreate} />
      <Route path='/admin/products/:id/edit' exact component={ProductsEdit} />
    </Router>
  </div>
);

export default App;
