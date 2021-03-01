import 'whatwg-fetch';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import config from '../auth_config.json';

var request = require('request');

//encapsulates the getProducts service.
class HttpService {
	getProducts = () => {
		var promise = new Promise((resolve, reject) => {
			fetch('http://localhost:3003/product').then((res) => {
				resolve(res.json());
			});
		});
		return promise;
	};

	//not working!!!!!!!!!!!!!!!!!!
	updateMetadata = (data) => {
		const { user } = useAuth0();
		var options = {
			method: 'PATCH',
			url: config.audience + 'users/' + user.sub,
			headers: {authorization: 'Bearer ABCD', 'content-type': 'application/json'},
			data: {user_metadata: data }
		};

		Axios.request(options).then((response) => {
			console.log(JSON.stringify(response.data));
		}).catch((error) => {
			console.error(error);
		})
	}

	/*Data : {
		token,
		uid,
		metadata	
	}*/
	// updateUser = (data) => {
	// 	var options = {
	// 		method  : 'PATCH',
	// 		url     : 'https://dev-e4xqtzrx.auth0.com/api/v2/users/' + data.uid,
	// 		headers : { authorization: 'Bearer ' + data.token.toString(), 'content-type': 'application/json' },
	// 		body    : { user_metadata: data.metadata },
	// 		json    : true
	// 	};

	// 	request(options, (error, res, body) => {
	// 		if (error) throw new Error(error);

	// 		console.log(body);
	// 	});
	// };
}

export default HttpService;
