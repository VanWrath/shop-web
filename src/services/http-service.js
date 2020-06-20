import 'whatwg-fetch';
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

	updateUser = (data) => {
		var options = {
			method  : 'PATCH',
			url     : 'https://dev-e4xqtzrx.auth0.com/api/v2/users/user_id',
			headers : { authorization: 'Bearer ABCD', 'content-type': 'application/json' },
			body    : { user_metadata: data },
			json    : true
		};

		request(options, (error, res, body) => {
			if (error) throw new Error(error);

			console.log(body);
		});
	};
}

export default HttpService;
