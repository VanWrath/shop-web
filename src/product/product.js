import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import DataService from '../services/data-service';
import NotificationService, { NOTIF_WISHLIST_CHANGED } from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

//Component to represent product information.
class Product extends Component {
	constructor(props) {
		super(props);

		this.state = { onWishList: ds.isItemOnWishList() };

		//Bind Functions
		this.onButtonsClicked = this.onButtonClicked.bind(this);
		this.onWishListChanged = this.onWishListChanged.bind(this);
		this.addToCart = this.addToCart.bind(this);
	}

	componentDidMount() {
		ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
	}

	//runs remove observer code when component unmounts to app.
	componentWillUnmount() {
		ns.removeObserver(this.NOTIF_WISHLIST_CHANGED);
	}

	onWishListChanged(newWishList) {
		this.setState({ onWishList: ds.isItemOnWishList(this.props.product) });
	}

	onButtonClicked = () => {
		if (this.state.onWishList) {
			ds.removeWishListItem(this.props.product);
		} else {
			ds.addWishListItem(this.props.product);
		}
	};

	addToCart = () => {
		console.log('added to cart');
	};

	render() {
		var btnClass;
		if (this.state.onWishList) {
			btnClass = 'btn btn-danger';
		} else {
			btnClass = 'btn btn-primary';
		}

		const pathUrl = '/' + this.props.product._id;

		return (
			<div className="card product mx-auto">
				<img className="card-img" src={this.props.product.imgUrl} alt="Product Image" />
				<div className="card-block">
					<Link
						to={{
							pathname : pathUrl,
							state    : {
								product : this.props.product
							}
						}}
					>
						<h5 className="card-title">{this.props.product.title}</h5>
					</Link>

					<p className="card-text">Price: ${this.props.product.price}</p>

					<button onClick={() => this.onButtonClicked()} className={btnClass}>
						{this.state.onWishList ? 'Remove From Wishlist' : 'Add To Wishlist'}
					</button>
					<button onClick={() => this.addToCart()} className="btn btn-primary m-2">
						Add to Cart
					</button>
				</div>
			</div>
		);
	}
}

export default Product;
