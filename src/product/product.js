import React, {Component} from 'react';
import './product.css';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

//Class to represent product information.
class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {onWishList: ds.isItemOnWishList()};

        //Bind Functions
        this.onButtonsClicked = this.onButtonClicked.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }

    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }

    //runs remove observer code when component unmounts to app.
    componentWillUnmount() {
        ns.removeObserver(this. NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList) {
        this.setState({onWishList: ds.isItemOnWishList(this.props.product)});
    }

    onButtonClicked = () => {
        if (this.state.onWishList) {
            ds.removeWishListItem(this.props.product);
        }
        else {
            ds.addWishListItem(this.props.product);
        }
    }

    render() {

        var btnClass;
        if (this.state.onWishList) {
            btnClass = "btn btn-danger";
        }
        else {
            btnClass = "btn btn-primary";
        }

        return(
            <div className="card product">
                <img className="card-img-top" src={this.props.product.imgUrl} alt="Product"></img>
                <div className="card-block">
                    <h4 className="card-title" >{this.props.product.title}</h4>
                    <p className="card-text" >Price: ${this.props.product.price}</p>
                    <a href="#" onClick={() => this.onButtonClicked()} className={btnClass}>
                    {this.state.onWishList ? "Remove From Wishlist" : "Add To Wishlist"}</a>
                </div>
            </div>
        )
    }
}

export default Product;