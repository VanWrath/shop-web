import 'whatwg-fetch';

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
}

export default HttpService;
