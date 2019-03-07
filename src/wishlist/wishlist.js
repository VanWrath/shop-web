import React, {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ns = new NotificationService();
//Class to represent wishlist information.
class WishList extends Component {

    constructor (props) {
        super(props);
        this.state = {wishList:[]};
        //bind functions
        this.createWishList = this.createWishList.bind(this);
        this. onWishListChanged = this. onWishListChanged.bind(this);
    }
    //runs add observer code when component mounts to app.
    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }
    //runs remove observer code when component unmounts to app.
    componentWillUnmount() {
        ns.removeObserver(this. NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList) {
        //refresh wishlist
        this.setState({wishList: newWishList});
    }

    createWishList = () => {
        const list = this.state.wishList.map((product) =>
        <ProductCondensed product={product} key={product._id} />
        );

        return (list);
    }

    render() {
        return(
            <div className="card mb-1">
                <div className='card-block'>
                    <h4 className="card-title">Wish List</h4>
                    <ul className="list-group">
                        {this.createWishList()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default WishList;