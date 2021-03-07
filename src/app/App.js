/* To run api:
* cd ../shop-api
* mongod
* nodemon server.js
*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service';
//Components
import Product from '../product/product';
import WishList from '../wishlist/wishlist';

const http = new HttpService();

class App extends Component {
  //react constructor
  constructor(props) {
    super(props);
    
    this.state = {products:[]};

    //binds function
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);
    this.loadData();
  }

  //loads data from api
  loadData = () => {
    //can't use this in a promise.
    var self = this;
    http.getProducts().then((data) =>{
      //setState reloads the entire component
      self.setState({products: data});
      //console.log(products);
    }, (err) => { });
  }

  //loads data from api into product components.
  productList = () => {
    const list = this.state.products.map((product) =>
      <div className="col-lg-4 col-md-6 col-sm-12" key={product._id}>
        <Product product={product}/>
      </div>
    );

    return (list);
  }

  render() {
    return (
      <div className="App">
     
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Welcome to The Hobby Shop</a>
        </nav>
        <div className="container-fluid App-main">
          <div className="row">
            <div className="col-md-8 col-sm-6">
              <div className="row">
                {this.productList()}
              </div>  
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="sticky-top">
                <WishList />
              </div>
              
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default App;