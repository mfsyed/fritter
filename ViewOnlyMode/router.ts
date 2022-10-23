import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import UserCollection from './collection';
import ViewOnlyModeCollection from '../ViewOnlyMode/collection';
import * as userValidator from '../user/middleware';
import * as viewOnlyModeValidator from '../ViewOnlyMode/middleware';
import * as util from './util';

const router = express.Router();

// /**
//  * Sign in user.
//  *
//  * @name POST /api/users/session
//  *
//  * @param {string} username - The user's username
//  * @param {string} password - The user's password
//  * @return {UserResponse} - An object with user's details
//  * @throws {403} - If user is already signed in
//  * @throws {400} - If username or password is  not in the correct format,
//  *                 or missing in the req
//  * @throws {401} - If the user login credentials are invalid
//  *
//  */
// router.post(
//   '/session',
//   [
//     userValidator.isUserLoggedOut,
//     userValidator.isValidUsername,
//     userValidator.isValidPassword,
//     userValidator.isAccountExists
//   ],
//   async (req: Request, res: Response) => {
//     const user = await UserCollection.findOneByUsernameAndPassword(
//       req.body.username, req.body.password
//     );
//     req.session.userId = user._id.toString();
//     res.status(201).json({
//       message: 'You have logged in successfully',
//       user: util.constructUserResponse(user)
//     });
//   }
// );

// /**
//  * Sign out a user
//  *
//  * @name DELETE /api/users/session
//  *
//  * @return - None
//  * @throws {403} - If user is not logged in
//  *
//  */
// router.delete(
//   '/session',
//   [
//     userValidator.isUserLoggedIn
//   ],
//   (req: Request, res: Response) => {
//     req.session.userId = undefined;
//     res.status(200).json({
//       message: 'You have been logged out successfully.'
//     });
//   }
// );

/**
 * Create a user account.
 *
 * @name POST /api/users
 *
 * @param {string} username - username of user
 * @param {string} password - user's password
 * @return {UserResponse} - The created user
 * @throws {403} - If there is a user already logged in
 * @throws {409} - If username is already taken
 * @throws {400} - If password or username is not in correct format
 *
 */
router.post(
    '/:viewee?',
  [
    userValidator.isUserLoggedIn,
    viewOnlyModeValidator.previouslyExist
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const viewOnlyMode = await ViewOnlyModeCollection.addOne(userId, req.params.viewee);
    res.status(201).json({
      message: `created view only mode object`,
      user: util.constructViewOnlyModeResponse(viewOnlyMode)
    });
  }
);

/**
 * Update a user's profile.
 *
 * @name PUT /api/users
 *
 * @param {string} username - The user's new username
 * @param {string} password - The user's new password
 * @return {UserResponse} - The updated user
 * @throws {403} - If user is not logged in
 * @throws {409} - If username already taken
 * @throws {400} - If username or password are not of the correct format
 */
router.put(
    '/:viewOnlyModeId?',
  [
    userValidator.isUserLoggedIn,
    viewOnlyModeValidator.isModeExist,
    viewOnlyModeValidator.isValidViewOnlyModeStatusModifier
  ],
  async (req: Request, res: Response) => {
    //const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const viewOnlyMode = await ViewOnlyModeCollection.updateState(req.params.viewOnlyModeId);
    res.status(200).json({
      message: 'ViewOnlyMode Status Changed.',
      user: util.constructViewOnlyModeResponse(viewOnlyMode)
    });
  }
);

// /**
//  * Delete a user.
//  *
//  * @name DELETE /api/users
//  *
//  * @return {string} - A success message
//  * @throws {403} - If the user is not logged in
//  */
// router.delete(
//   '/',
//   [
//     userValidator.isUserLoggedIn
//   ],
//   async (req: Request, res: Response) => {
//     const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
//     await UserCollection.deleteOne(userId);
//     await FreetCollection.deleteMany(userId);
//     req.session.userId = undefined;
//     res.status(200).json({
//       message: 'Your account has been deleted successfully.'
//     });
//   }
// );

export {router as userRouter};