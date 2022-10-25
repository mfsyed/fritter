import type {HydratedDocument, Types} from 'mongoose';
import type {Comment} from './model';
import CommentModel from './model';
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
class CommentCollection {
  /**
   * Add a freet to the collection
   *
   * @param {string} commentorId - The id of the commentor of the comment
   * @param {string} originalFreetId - The id of the orginal freet commentor is commenting on
   * @param {string} content - The id of the content of the freet
   * @return {Promise<HydratedDocument<Comment>>} - The newly created freet
   */
  static async addOne(commentorId: Types.ObjectId | string, originalFreetId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Comment>> {
    const date = new Date();
    const comment = new CommentModel({
      commentorId,
      originalFreetId,
      dateCreated: date,
      content,
      dateModified: date
    });
    await comment.save(); // Saves freet to MongoDB
    return comment.populate('commentorId');
  }

  /**
   * Find a comment by commentId
   *
   * @param {string} freetId - The id of the freet to find
   * @return {Promise<HydratedDocument<Comment>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOne(commentId: Types.ObjectId | string): Promise<HydratedDocument<Comment>> {
    return CommentModel.findOne({_id: commentId}).populate('commentorId');
  }

//   /**
//    * Get all the freets in the database
//    *
//    * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
//    */
//   static async findAll(): Promise<Array<HydratedDocument<Comment>>> {
//     // Retrieves freets and sorts them from most to least recent
//     return CommentModel.find({}).sort({dateModified: -1}).populate('commentorId');
//   }

  // /**
  //  * Get all the freets in by given author
  //  *
  //  * @param {string} username - The username of author of the freets
  //  * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
  //  */
  // static async findAllByFreet(freet: Types.ObjectId | string): Promise<Array<HydratedDocument<Comment>>> {
  //   const originalFreet = await FreetCollection.findOne(freet);
  //   return CommentModel.find({originalFreedId: originalFreet._id}).populate('commentorId');
  // }

  /**
   * Update a freet with the new content
   *
   * @param {string} commenttId - The id of the comment to be updated
   * @param {string} content - The new content of the comment
   * @return {Promise<HydratedDocument<Comment>>} - The newly updated comment
   */
  static async updateOne(commentId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Comment>> {
    const comment = await CommentModel.findOne({_id: commentId});
    comment.content = content;
    comment.dateModified = new Date();
    await comment.save();
    return comment.populate('commentorId');
  }

  /**
   * Delete a comment with given freetId.
   *
   * @param {string} commentId - The freetId of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
  static async deleteOne(commentId: Types.ObjectId | string): Promise<boolean> {
    const comment = await CommentModel.deleteOne({_id: commentId});
    return comment !== null;
  }

  /**
   * Delete all the freets by the given author
   *
   * @param {string} originalFreetId: the id the of the freet the comment referred to.
   */
  static async deleteMany(originalFreetId: Types.ObjectId | string): Promise<void> {
    await CommentModel.deleteMany({originalFreetId});
  }
}

export default CommentCollection;
