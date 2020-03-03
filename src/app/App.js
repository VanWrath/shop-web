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
import Authentication from '../authentication/authentication';

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
			return <div>Loading...</div>;
		}

		return (
			//Navbar
			<Router>
				<div>
					<header>
						<NavBar />
					</header>

					<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
						<Link to="/" className="navbar-brand">
							The Hobby Shop
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon" />
						</button>

						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<form className="form-inline my-2 w-75">
								<input
									className="form-control m-2 w-75"
									type="search"
									placeholder="Search"
									aria-label="Search"
								/>
								<button className="btn btn-outline-success m-2" type="submit">
									Search
								</button>
							</form>

							<ul className="navbar-nav ml-auto">
								<li className="nav-item dropdown">
									<a
										className="nav-link dropdown-toggle"
										href="#"
										id="navbarDropdown"
										role="button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										Account
									</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown">
										<Link to="/login" className="dropdown-item">
											Login
										</Link>
										<Link to="/login" className="dropdown-item">
											Sign Up
										</Link>
									</div>
								</li>
								<li className="nav-item">
									<Link to="/cart" className="nav-link">
										Cart
									</Link>
								</li>
							</ul>
						</div>
					</nav>

					{/*Switch render */}
					<Switch>
						<Route path="/login">
							<Authentication />
						</Route>

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
										<a href="">Products</a>
									</li>
									<li>
										<a href="">Acccount</a>
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
