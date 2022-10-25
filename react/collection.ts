import type {HydratedDocument, Types} from 'mongoose';
import type {React} from './model';
import ReactModel from './model';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 */
class ReactCollection {
  /**
   * Add a freet to the collection
   *
   * @param {string} authorId - The id of the author of the freet
   * @param {string} content - The id of the content of the freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly created freet
   */
  static async addOne(reactorId: Types.ObjectId | string, freetId: Types.ObjectId | string, reaction: string): Promise<HydratedDocument<React>> {
    //const date = new Date();
    const freet = await FreetCollection.findOne(freetId);

    const react = new ReactModel({
      freetId,
      reactorId,
      reaction

    });
    await react.save(); // Saves freet to MongoDB
    return react.populate('reactorId');
  }

  /**
   * Find a freet by freetId
   *
   * @param {string} reactId - The id of the freet to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOne(reactId: Types.ObjectId | string): Promise<HydratedDocument<React>> {
    return ReactModel.findOne({_id: reactId}).populate('reactorId');
  }



  static async findOneByUsernameAndFreet(freetId: string, reactorId: string ): Promise<HydratedDocument<React>> {
    return ReactModel.findOne({reactorId: new RegExp(`^${reactorId.trim()}$`, 'i'), freetId: new RegExp(`^${freetId.trim()}$`, 'i')});
  }

//   /**
//    * Get all the freets in the database
//    *
//    * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
//    */
//   static async findAll(): Promise<Array<HydratedDocument<React>>> {
//     // Retrieves freets and sorts them from most to least recent
//     return ReactModel.find({}).sort({dateModified: -1}).populate('authorId');
//   }

//   /**
//    * Get all the freets in by given author
//    *
//    * @param {string} username - The username of author of the freets
//    * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
//    */
//   static async findAllByUsername(username: string): Promise<Array<HydratedDocument<React>>> {
//     const author = await UserCollection.findOneByUsername(username);
//     return ReactModel.find({authorId: author._id}).populate('authorId');
//   }

  /**
   * Update a freet with the new content
   *
   * @param {string} freetId - The id of the freet to be updated
   * @param {string} content - The new content of the freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly updated freet
   */
  static async updateOne(reactId: Types.ObjectId | string, reaction: string): Promise<HydratedDocument<React>> {
    const react = await ReactModel.findOne({_id: reactId});
    react.reaction = reaction;
    await react.save();
    return react.populate('reactorId');
  }

  /**
   * Delete a react with given reactId.
   *
   * @param {string} reactId - The freetId of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
  static async deleteOne(reactId: Types.ObjectId | string): Promise<boolean> {
    const react = await ReactModel.deleteOne({_id: reactId});
    return react !== null;
  }

//   /**
//    * Delete all the freets by the given author
//    *
//    * @param {string} reactId - The id of author of freets
//    */
//   static async deleteMany(reactId: Types.ObjectId | string): Promise<void> {
//     await ReactModel.deleteMany({reactId});
//   }
}

export default ReactCollection;
