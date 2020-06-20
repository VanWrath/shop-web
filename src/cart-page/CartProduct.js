import React, { Component } from 'react';
import './cart-page.css';

//props: data
export default class CartProduct extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.data);
		return (
			<div>
				<div className="row my-3">
					<div className="col-2">
						<img className="card-img" src={this.props.data.product.imgUrl} alt="Product Image" />
					</div>
					<div className="col-8 text-left">
						<h3>{this.props.data.product.title}</h3>
					</div>
					<div className="col-2 text-right">
						<h3>$ {this.props.data.product.price}</h3>
					</div>
				</div>
				<hr />
			</div>
		);
	}
}
