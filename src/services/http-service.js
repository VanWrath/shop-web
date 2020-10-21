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
