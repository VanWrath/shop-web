import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service';

let ns = new NotificationService();
//instance used too store the only instance of DataService.
let instance = null;
//data for items in the wishlist.
var wishList = [];

//Singleton class
class DataService {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    isItemOnWishList = (item) => {
        for (var x = 0; x < wishList.length; x++) {
            if (wishList[x]._id === item._id) {
                return true;
            }
         }
         return false;
    }

    addWishListItem = item => {
        wishList.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
    }

    removeWishListItem = item => {
        for (var x = 0; x < wishList.length; x++){
            if (wishList[x]._id === item._id) {
                wishList.splice(x, 1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
                break;
            }
        }
    }
}

export default DataService;