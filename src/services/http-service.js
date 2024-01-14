import 'whatwg-fetch';
import { reject } from 'q';

//encapsulates the getProducts service.
class HttpService {
    getProducts = () => {
        var promise = new Promise((resolve, reject) => {
            //fetch('http://localhost:5000/product')
            fetch('https://shop-api-ak3u.onrender.com/product')
            .then(res => {
                resolve(res.json());
            })
        });
        return promise;
    }
}

export default HttpService;