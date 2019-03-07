import 'whatwg-fetch';
import { reject } from 'q';

//encapsulates the getProducts service.
class HttpService {
    getProducts = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3003/product')
            .then(res => {
                //console.log(res.json());
                resolve(res.json());
            })
        });
        return promise;
    }
}

export default HttpService;