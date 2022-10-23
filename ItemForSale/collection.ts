import type {HydratedDocument, Types} from 'mongoose';
import type {ItemForSale} from './model';
import ItemForSaleModel from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 */
class ItemForSaleCollection {
  /**
   * Add a freet to the collection
   *
   * @param {string} sellerId - The id of the author of the freet
   * @param {string} description - The id of the content of the freet
   * @param {string} price - The price of itemForSale
   * @param {string} link - external link to the itemForSale
   * @return {Promise<HydratedDocument<Freet>>} - The newly created itemForSale
   */
  static async addItem(sellerId: Types.ObjectId | string, description: string, price:string, link:string): Promise<HydratedDocument<ItemForSale>> {
    const date = new Date();
    const itemForSale = new ItemForSaleModel({
      sellerId,
      dateCreated: date,
      description,
      dateModified: date,
      price,
      link
    });
    await itemForSale.save(); // Saves freet to MongoDB
    return itemForSale.populate('sellerId');
  }

  /**
   * Find a freet by freetId
   *
   * @param {string} itemForSaleId - The id of the freet to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOne(itemForSaleId: Types.ObjectId | string): Promise<HydratedDocument<ItemForSale>> {
    return ItemForSaleModel.findOne({_id: itemForSaleId}).populate('sellerId');
  }

  /**
   * Get all the freets in the database
   *
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAllItems(): Promise<Array<HydratedDocument<ItemForSale>>> {
    // Retrieves freets and sorts them from most to least recent
    return ItemForSaleModel.find({}).sort({dateModified: -1}).populate('sellerId');
  }

  /**
   * Get all items for sale given by seller
   *
   * @param {string} username - The username of author of the freets
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAllItemsByUsername(username: string): Promise<Array<HydratedDocument<ItemForSale>>> {
    const author = await UserCollection.findOneByUsername(username);
    return ItemForSaleModel.find({authorId: author._id}).populate('sellerId');
  }



  /**
   * Update a freet with the new content
   *
   * @param {string} freetId - The id of the freet to be updated
   * @param {string} content - The new content of the freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly updated freet
   */
  static async updateDescription(freetId: Types.ObjectId | string, content: string): Promise<HydratedDocument<ItemForSale>> {
    const item = await ItemForSaleModel.findOne({_id: freetId});
    item.description = content;
    item.dateModified = new Date();
    await item.save();
    return item.populate('sellerId');
  }


  static async getPrice(itemId: Types.ObjectId | string): Promise<string> {
    const item = await ItemForSaleModel.findOne({_id: itemId});
    return item.price;
  }


  static async updatePrice(freetId: Types.ObjectId | string, price: string): Promise<HydratedDocument<ItemForSale>> {
    const item = await ItemForSaleModel.findOne({_id: freetId});
    item.price = price;
    item.dateModified = new Date();
    await item.save();
    return item.populate('sellerId');
  }

  static async updateLink(freetId: Types.ObjectId | string, link: string): Promise<HydratedDocument<ItemForSale>> {
    const item = await ItemForSaleModel.findOne({_id: freetId});
    item.link = link;
    item.dateModified = new Date();
    await item.save();
    return item.populate('sellerId');
  }


  /**
   * Delete a freet with given freetId.
   *
   * @param {string} freetId - The freetId of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
  static async deleteItem(freetId: Types.ObjectId | string): Promise<boolean> {
    const freet = await ItemForSaleModel.deleteOne({_id: freetId});
    return freet !== null;
  }

  /**
   * Delete all the freets by the given author
   *
   * @param {string} authorId - The id of author of freets
   */
  static async deleteManyItems(authorId: Types.ObjectId | string): Promise<void> {
    await ItemForSaleModel.deleteMany({authorId});
  }
}

export default ItemForSaleCollection;
