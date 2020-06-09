import React, { Component } from 'react';

export default class review extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<a href="#">{this.props.data.user}</a>
				<h5>{this.props.data.title}</h5>
				<p>{this.props.data.date.toDateString()}</p>
				<p>{this.props.data.review}</p>
			</div>
		);
	}
}
