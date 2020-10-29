import React, { Component } from 'react';
import CartProduct from './CartProduct';

export default class CartPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products : [
				{
					product  : {
						_id         : { $oid: '5eba48d3afb1421c5c3ba946' },
						likes       : 0,
						title       : 'FINAL FANTASY® VII REMAKE',
						price       : 59.99,
						imgUrl      :
							'https://cdn-prod.scalefast.com/public/assets/img/resized/squareenix-store-v3/df5313d5528cafec58d0163d3c4036e7_KR_350.jpg',
						description :
							'The world has fallen under the control of the Shinra Electric Power Company, a shadowy corporation controlling the planet’s very life force as mako energy. In the sprawling city of Midgar, an anti-Shinra organization calling themselves Avalanche have stepped up their resistance. Cloud Strife, a former member of Shinra’s elite SOLDIER unit now turned mercenary, lends his aid to the group, unaware of the epic consequences that await him.',
						__v         : 0
					},
					quantity : 1
				},
				{
					product  : {
						_id         : { $oid: '5e6b2aaa3d128e4224ce2150' },
						likes       : 0,
						title       : 'PlayStation 4',
						price       : 399.99,
						imgUrl      : 'https://media.gamestop.com/i/gamestop/10114375/PlayStation-4-Black-500GB?$pdp$',
						description :
							'The PlayStation(R)4 system opens the door to an incredible journey through immersive new gaming worlds and a deeply connected gaming community. With an astounding launch lineup and over 180 games in development the PS4 system offers more top-tier blockbusters and inventive indie hits than any other next-gen console. Developer Inspired, Gamer Focus. PlayStation 4. Greatness Awaits',
						__v         : 0
					},
					quantity : 1
				}
			],
			total    : 0,
			hst      : 0,
			subtotal : 0
		};
	}

	componentDidMount() {
		this.calcTotals();
	}

	calcTotals = () => {
		if (this.state.products.length > 0) {
			let stotal = 0;
			let products = this.state.products;
			for (let i = 0; i < products.length; i++) {
				stotal += products[i].product.price * products[i].quantity;
			}
			this.setState({ subtotal: stotal });
			let tax = stotal * 0.13;
			tax = Math.round(tax * 100) / 100;

			this.setState({ hst: tax });

			let tot = stotal + tax;
			this.setState({ total: tot });
		}
	};

	listProducts = () => {
		const listProds = this.state.products.map((item) => <CartProduct key={item._id} data={item} />);
		return listProds;
	};

	render() {
		return (
			<div className="container my-5 text-center">
				<h1>Shopping Cart</h1>
				<hr />
				{this.state.products.length === 0 ? <h3>Your shopping cart is empty.</h3> : this.listProducts()}
				<div className="text-right">
					<p>Subtotal: $ {this.state.subtotal}</p>
					<p>HST: $ {this.state.hst}</p>
					<h3>Total: $ {this.state.total}</h3>
				</div>
			</div>
		);
	}
}
