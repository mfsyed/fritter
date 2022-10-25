import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import CommentCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as commentValidator from './middleware';
import * as util from './util';

const router = express.Router();

// /**
//  * Get all the freets
//  *
//  * @name GET /api/comment
//  *
//  * @return {CommentResponse[]} - A list of all the freets sorted in descending
//  *                      order by date modified
//  */
// /**
//  * Get freets by author.
//  *
//  * @name GET /api/freets?authorId=id
//  *
//  * @return {CommentResponse[]} - An array of commentor created by user with id, commentorId
//  * @throws {400} - If commentorId is not given
//  * @throws {404} - If no user has given commentorId
//  *
//  */
// router.get(
//   '/',
//   async (req: Request, res: Response) => {
//     const freetComments = await CommentCollection.findAllByFreet(req.query.freet as string);
//     const response = freetComments.map(util.constructCommentResponse);
//     res.status(200).json(response);
//   }
// );

/**
 * Create a new comment.
 *
 * @name POST /api/comment
 *
 * @param {string} content - The content of the comment
 * @return {CommentResponse} - The created comment
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the comment content is empty or a stream of empty spaces
 * @throws {413} - If the comment content is more than 140 characters long
 */
router.post(
  '/:originalFreetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isValidFreetContent
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const comment = await CommentCollection.addOne(userId, req.params.originalFreetId, req.body.content);

    res.status(201).json({
      message: 'Your comment was created successfully.',
      freet: util.constructCommentResponse(comment)
    });
  }
);

/**
 * Delete a freet
 *
 * @name DELETE /api/freets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the commentor of
 *                 the commentor
 * @throws {404} - If the commenttId is not valid
 */
router.delete(
  '/:commentId?',
  [
    userValidator.isUserLoggedIn,
    commentValidator.isOriginalFreetExists
  ],
  async (req: Request, res: Response) => {
    await CommentCollection.deleteOne(req.params.commentId);
    res.status(200).json({
      message: 'Your comment was deleted successfully.'
    });
  }
);

/**
 * Modify a freet
 *
 * @name PUT /api/freets/:id
 *
 * @param {string} content - the new content for the freet
 * @return {CommentResponse} - the updated comment
 * @throws {403} - if the user is not logged in or not the comment of
 *                 of the comment
 * @throws {404} - If the commenttId is not valid
 * @throws {400} - If the comment content is empty or a stream of empty spaces
 * @throws {413} - If the comment content is more than 140 characters long
 */
router.put(
  '/:commentId?',
  [
    userValidator.isUserLoggedIn,
    commentValidator.isValidCommentModifier,
    commentValidator.isCommentExists,
    commentValidator.isValidCommentContent
  ],
  async (req: Request, res: Response) => {
    const comment = await CommentCollection.updateOne(req.params.commentId, req.body.content);
    res.status(200).json({
      message: 'Your comment was updated successfully.',
      freet: util.constructCommentResponse(comment)
    });
  }
);

export {router as commentRouter};
