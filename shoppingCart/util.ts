import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {ShoppingCart, PopulatedShoppingCart} from './model';
import UserCollection from '../user/collection';

// Update this if you add a property to the User type!
type ShoppingCartResponse = {
    _id: string;
    cartOwner: string;
    numberOfItems: string;
    items: string;
    total: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw User object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<User>} user - A user object
 * @returns {UserResponse} - The user object without the password
 */
const constructShoppingCartResponse = (shoppingCart: HydratedDocument<ShoppingCart>): ShoppingCartResponse => {
  const shoppingCartCopy: PopulatedShoppingCart = {
    ...shoppingCart.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
 // delete userCopy.password;
  const {username} = shoppingCartCopy.cartOwner;
  delete shoppingCartCopy.cartOwner;
  return {
    ...shoppingCartCopy,
    _id: shoppingCartCopy._id.toString(),
    cartOwner: username,
    numberOfItems: shoppingCart.numberOfItems.toString(),
    items: shoppingCart.items.toString(),
    total: shoppingCart.total.toString()
    //dateJoined: formatDate(user.dateJoined)
  };
};

export {
  constructShoppingCartResponse
};
