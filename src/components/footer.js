import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class footer extends Component {
	render() {
		return (
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
		);
	}
}
