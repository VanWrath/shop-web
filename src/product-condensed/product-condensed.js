import React, { Component } from 'react';
import './product-condensed.css';
import DataService from '../services/data-service';

var ds = new DataService();
//Class to represent product information.
class ProductCondensed extends Component {
	constructor(props) {
		super(props);

		//bind
		this.removeProduct = this.removeProduct.bind(this);
	}

	removeProduct = () => {
		ds.removeWishListItem(this.props.product);
	};

	render() {
		return (
			<li className="list-group-item pc-condensed">
				<button className="btn btn-outline-danger float-left mx-2" onClick={() => this.removeProduct()}>
					X
				</button>
				<p className="d-inline float-left">
					{this.props.product.title} | <b>${this.props.product.price}</b>
				</p>
			</li>
		);
	}
}

export default ProductCondensed;
