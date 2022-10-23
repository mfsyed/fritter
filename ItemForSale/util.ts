import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {ItemForSale, PopulatedItemForSale} from '../ItemForSale/model';

// Update this if you add a property to the Freet type!
type ItemForSaleResponse = {
  _id: string;
  seller: string;
  dateCreated: string;
  description: string;
  dateModified: string;
  price: string;
  link: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Freet>} freet - A freet
 * @returns {FreetResponse} - The freet object formatted for the frontend
 */
const constructItemForSaleResponse = (itemForSale: HydratedDocument<ItemForSale>): ItemForSaleResponse => {
  const itemForSaleCopy: PopulatedItemForSale = {
    ...itemForSale.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const {username} = itemForSaleCopy.sellerId;
  delete itemForSaleCopy.sellerId;
  return {
    ...itemForSaleCopy,
    _id: itemForSaleCopy._id.toString(),
    seller: username,
    dateCreated: formatDate(itemForSale.dateCreated),
    dateModified: formatDate(itemForSale.dateModified),
    price: itemForSale.price.toString(),
    link: itemForSale.link
  };
};

export {
  constructItemForSaleResponse
};
