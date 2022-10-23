import type {HydratedDocument, Types} from 'mongoose';
import type {ViewOnlyMode} from './model';
import ViewOnlyModeModel from './model';

/**
 * This file contains a class with functionality to interact with users stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<User> is the output of the UserModel() constructor,
 * and contains all the information in User. https://mongoosejs.com/docs/typescript.html
 */
class ViewOnlyModeCollection {
  /**
   * Add a new user
   *
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @return {Promise<HydratedDocument<User>>} - The newly created user
   */
  static async addOne(viewee: Types.ObjectId | string, viewer: Types.ObjectId | string): Promise<HydratedDocument<ViewOnlyMode>> {
    const dateJoined = new Date();

    const viewonlymode = new ViewOnlyModeModel({
        viewer,
        viewee,
        viewOnlyModeState: false
    });

    await viewonlymode.save(); // Saves user to MongoDB
    return viewonlymode;
  }


  static async findOneByUsernames(viewer: string, viewee: string): Promise<HydratedDocument<ViewOnlyMode>> {
    return ViewOnlyModeModel.findOne({viewer: new RegExp(`^${viewer.trim()}$`, 'i')}, {viewee: new RegExp(`^${viewee.trim()}$`, 'i')});
  }


  /**
   * Find a user by userId.
   *
   * @param {string} userId - The userId of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByViewOnlyModeId(userId: Types.ObjectId | string): Promise<HydratedDocument<ViewOnlyMode>> {
    return ViewOnlyModeModel.findOne({_id: userId});
  }

//   /**
//    * Find a user by username (case insensitive).
//    *
//    * @param {string} username - The username of the user to find
//    * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
//    */
//   static async findOneByUsername(username: string): Promise<HydratedDocument<User>> {
//     return ViewOnlyModeModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
//   }

//   /**
//    * Find a user by username (case insensitive).
//    *
//    * @param {string} username - The username of the user to find
//    * @param {string} password - The password of the user to find
//    * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
//    */
//   static async findOneByUsernameAndPassword(username: string, password: string): Promise<HydratedDocument<User>> {
//     return ViewOnlyModeModel.findOne({
//       username: new RegExp(`^${username.trim()}$`, 'i'),
//       password
//     });
//   }

  /**
   * Update user's information
   *
   * @param {string} userId - The userId of the user to update
   * @param {Object} userDetails - An object with the user's updated credentials
   * @return {Promise<HydratedDocument<User>>} - The updated user
   */
  static async updateState(viewOnlyModeId: Types.ObjectId | string): Promise<HydratedDocument<ViewOnlyMode>> {
    const viewOnlyMode = await ViewOnlyModeModel.findOne({_id: viewOnlyModeId});

    viewOnlyMode.viewOnlyModeState = !viewOnlyMode.viewOnlyModeState;

    await viewOnlyMode.save();
    return viewOnlyMode;
  }

  /**
   * Delete a user from the collection.
   *
   * @param {string} userId - The userId of user to delete
   * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
   */
  static async deleteOne(viewOnlyModeId: Types.ObjectId | string): Promise<boolean> {
    const viewOnlyMode = await ViewOnlyModeModel.deleteOne({_id: viewOnlyModeId});
    return viewOnlyMode !== null;
  }
}

export default ViewOnlyModeCollection;
