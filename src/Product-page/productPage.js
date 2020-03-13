import React, { Component } from 'react';
//import { useParams } from 'react-router-dom';

export default class ProductPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgUrl      : 'ImgUrl',
			title       : 'Title',
			seller      : 'Seller',
			price       : 0.0,
			description : 'Description',
			ratings     : 5,
			quantity    : 0,
			_id         : 'id'
		};

		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		const { _id, imgUrl, title, price, description } = this.props.location.state.product;
		this.setState({ _id, imgUrl, title, price, description });
	}

	handleQuantityChange(event) {
		this.setState({ quantity: event.target.value });
	}

	handleSubmit(event) {
		alert('A quantity was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row m-4">
					<div className="col-md-3">
						<img src={this.state.imgUrl} alt="Product" className="img-fluid" />
					</div>

					<div className="col-md-6 text-left px-3">
						<h3>{this.state.title}</h3>
						<p>
							by <a href="#">{this.state.seller}</a> <br />
							Rating: {this.state.ratings}/5
						</p>
						<hr />
						<div>
							<h5>
								Price: $ <span className="text-success">{this.state.price}</span>
							</h5>
							<h5>Product Description</h5>
							<p>{this.state.description}</p>
						</div>
					</div>

					<div className="col-md-3 p-3 text-left">
						<form onSubmit={this.handleSubmit} className="border border-secondary rounded p-3">
							<h5>$ {this.state.price}</h5>
							<div className="form-group">
								<h4 className="text-success">In Stock.</h4>
								<div className="form-inline">
									<label htmlFor="quantity">Quantity: </label>
									<select
										className="form-control m-3"
										value={this.state.quantity}
										onChange={this.handleQuantityChange}
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
									</select>
								</div>
							</div>
							<button id="add" type="submit" className="btn btn-primary m-2">
								Add to cart
							</button>
							<a href="#" className="btn btn-primary m-2">
								Cart
							</a>
						</form>
					</div>
				</div>
				<hr />
				<div>
					<h3>Reviews</h3>
				</div>
			</div>
		);
	}
}
