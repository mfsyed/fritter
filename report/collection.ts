import type {HydratedDocument, Types} from 'mongoose';
import type {Report} from './model';
import ReportModel from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 */
class ReportCollection {
  /**
   * Add a freet to the collection
   *
   * @param {string} freetId - The freetId of freet to report
   * @param {string} reporterId - The id of the author of the freet
   * @param {string} content - The id of the content of the freet
   * @return {Promise<HydratedDocument<Report>>} - The newly created freet
   */
  static async reportOne(reporterId: Types.ObjectId | string, content: string, freetId: Types.ObjectId | string): Promise<HydratedDocument<Report>> {
    const date = new Date();
    const report = new ReportModel({
      freetId,
      reporterId,
      content,
      dateReported: date
    });
    await report.save(); // Saves freet to MongoDB
    return report.populate('freetId');
  }

//   /**
//    * Find a freet by freetId
//    *
//    * @param {string} freetId - The id of the freet to find
//    * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
//    */
//   static async findOne(freetId: Types.ObjectId | string): Promise<HydratedDocument<Freet>> {
//     return ReportModel.findOne({_id: freetId}).populate('authorId');
//   }

//   /**
//    * Delete a freet with given freetId.
//    *
//    * @param {string} freetId - The freetId of freet to delete
//    * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
//    */
//   static async deleteOne(freetId: Types.ObjectId | string): Promise<boolean> {
//     const freet = await ReportModel.deleteOne({_id: freetId});
//     return freet !== null;
//   }

}

export default ReportCollection;
