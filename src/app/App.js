/* To run api:
* cd ../shop-api
* mongod ../shop-api
* nodemon server.js
*/

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service';
//import { useAuth0 } from '../react-auth0-spa';

//Components
import NavBar from '../components/navBar';
import Product from '../product/product';
import WishList from '../wishlist/wishlist';
import Products from '../product/products';
import ProductPage from '../Product-page/productPage';
import CartPage from '../cart-page/cartPage';
import Profile from '../components/Profile';
import PrivateRoute from '../components/PrivateRoute';
import Loading from '../components/Loading';

//Utility
import Authentication from '../authentication/authentication';
import history from '../utils/history';

const http = new HttpService();

class App extends Component {
	//react constructor
	constructor(props) {
		super(props);
		this.state = {
			account         : '',
			isLoggedIn      : false,
			products        : [],
			selectedProduct : {},
			dataLoaded      : false
		};

		//binds function
		this.loadData = this.loadData.bind(this);
		this.productList = this.productList.bind(this);
		this.findProductById = this.findProductById.bind(this);
		this.loadData();
	}

	//loads data from api
	loadData = () => {
		//can't use this in a promise so change to self.
		var self = this;
		http.getProducts().then(
			(data) => {
				//setState reloads the entire component
				console.log('Data loaded.');
				self.setState({
					products   : data,
					dataLoaded : true
				});
				//console.log(products);
			},
			(err) => {
				console.log('could not load data.');
			}
		);
	};

	//loads data from api into product components.
	productList = () => {
		const list = this.state.products.map((product) => (
			<div className="col-lg-4 col-md-6 col-sm-12" key={product._id}>
				<Product product={product} />
			</div>
		));

		return list;
	};

	findProductById(id) {
		for (let i = 0; i < this.state.products.length; i++) {
			if (this.state.products[i]._id == id) {
				return this.state.products[i];
			}
		}
		console.log('Could not find producct with Id' + id);
	}

	render() {
		//const productsData = this.state.products[0];
		console.log(this.state.products);

		if (this.state.loading) {
			return <Loading />;
		}

		return (
			//Navbar
			<Router history={history}>
				<div>
					<header>
						<NavBar />
					</header>

					{/*Switch render */}
					<Switch>
						<Route path="/login">
							<Authentication />
						</Route>

						<PrivateRoute path="/profile" component={Profile} />

						<Route path="/cart">
							<CartPage />
						</Route>

						<Route path="/:id" component={ProductPage} />

						<Route path="/" render={(routeProps) => <Products products={this.state.products} />} />
					</Switch>

					{/*Footer*/}
					<footer className="py-5">
						<div className="container">
							<div className="row">
								<ul>
									<li>
										<b>Navigation</b>
									</li>
									<li>
										<Link to="/">Products</Link>
									</li>
									<li>
										<Link to="/profile">Account</Link>
									</li>
								</ul>
							</div>
						</div>
					</footer>
				</div>
			</Router>
		);
	}
}

export default App;
