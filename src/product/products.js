import React, { Component } from 'react';
import HttpService from '../services/http-service';
import Product from './product';
import WishList from '../wishlist/wishlist';

const http = new HttpService();

export default class Products extends Component {
	constructor(props) {
		super(props);
		this.state = { products: [] };

		this.productList = this.productList.bind(this);
		this.loadData = this.loadData.bind(this);
		this.loadData();
	}

	componentWillMount() {
		//console.log('props');
		//console.log(this.props);
		//const { products } = this.props;
		this.setState({ products: this.props.products });
		//this.loadData();
	}

	//loads data from api
	loadData = () => {
		//can't use this in a promise.
		var self = this;
		http.getProducts().then(
			(data) => {
				//setState reloads the entire component
				self.setState({ products: data });
				//console.log(products);
			},
			(err) => {
				console.log('could not load data');
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

	render() {
		//console.log(this.state.products);
		return (
			<div className="container-fluid App-main py-3 text-center">
				<h1>Products</h1>
				<h3>{this.state.name}</h3>
				<div className="row">
					<div className="col-md-8 col-sm-6">
						<div className="row">{this.productList()}</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="sticky-top">
							<WishList />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
