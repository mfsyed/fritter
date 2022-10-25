import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import ReactCollection from './collection';
import * as userValidator from '../user/middleware';
import * as reactValidator from '../react/middleware';
import * as freetValidator from '../freet/middleware';
import * as util from './util';

const router = express.Router();

// /**
//  * Get all the freets
//  *
//  * @name GET /api/freets
//  *
//  * @return {FreetResponse[]} - A list of all the freets sorted in descending
//  *                      order by date modified
//  */
// /**
//  * Get freets by author.
//  *
//  * @name GET /api/freets?authorId=id
//  *
//  * @return {FreetResponse[]} - An array of freets created by user with id, authorId
//  * @throws {400} - If authorId is not given
//  * @throws {404} - If no user has given authorId
//  *
//  */
// router.get(
//   '/',
//   async (req: Request, res: Response, next: NextFunction) => {
//     // Check if authorId query parameter was supplied
//     if (req.query.author !== undefined) {
//       next();
//       return;
//     }

//     const allFreets = await FreetCollection.findAll();
//     const response = allFreets.map(util.constructFreetResponse);
//     res.status(200).json(response);
//   },
//   [
//     userValidator.isAuthorExists
//   ],
//   async (req: Request, res: Response) => {
//     const authorFreets = await FreetCollection.findAllByUsername(req.query.author as string);
//     const response = authorFreets.map(util.constructFreetResponse);
//     res.status(200).json(response);
//   }
// );

/**
 * Create a new freet.
 *
 * @name POST /api/freets
 *
 * @param {string} content - The content of the freet
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.post(
    '/:freetId?',
    ///:reaction?
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    reactValidator.isValidReaction,
    reactValidator.previousReactionNotExists
    //freetValidator.isValidFreetModifier
  ],
  async (req: Request, res: Response) => {
    const reactorId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    //const freetId = (req.session.freetId as string) ?? '';
    const react = await ReactCollection.addOne(reactorId, req.params.freetId, req.body.reaction);

    res.status(201).json({
      message: 'Your reaction was recorded successfully.',
      react: util.constructReactResponse(react)
    });
  }
);

/**
 * Delete a freet
 *
 * @name DELETE /api/freets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
  '/:reactId?',
  [
    userValidator.isUserLoggedIn,
    //freetValidator.isFreetExists,
    reactValidator.previousReactionExists,
    reactValidator.isValidReactModifier
    //freetValidator.isValidFreetModifier
  ],
  async (req: Request, res: Response) => {
    await ReactCollection.deleteOne(req.params.reactId);
    res.status(200).json({
      message: 'Your react was deleted successfully.'
    });
  }
);

/**
 * Modify a freet
 *
 * @name PUT /api/freets/:id
 *
 * @param {string} content - the new content for the freet
 * @return {FreetResponse} - the updated freet
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {404} - If the freetId is not valid
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.put(
  '/:reactId?',
  [
    userValidator.isUserLoggedIn,
    //freetValidator.isFreetExists,
    reactValidator.previousReactionExists,
    reactValidator.isValidReactModifier
    //freetValidator.isValidFreetModifier,
    // freetValidator.isValidFreetContent
  ],
  async (req: Request, res: Response) => {
    const react = await ReactCollection.updateOne(req.params.reactId, req.body.reaction);
    res.status(200).json({
      message: 'Your reacts was changed successfully.',
      freet: util.constructReactResponse(react)
    });
  }
);

export {router as reactRouter};
