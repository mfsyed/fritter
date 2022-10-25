import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import CommentCollection from '../Comment/collection';
import FreetCollection from '../freet/collection';
/**
 * Checks if a comment with commentId in req.params exists
 */
const isCommentExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.commentId);
  const freet = validFormat ? await CommentCollection.findOne(req.params.commentId) : '';
  if (!freet) {
    res.status(404).json({
      error: {
        commentNotFound: `does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the comment in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidCommentContent = (req: Request, res: Response, next: NextFunction) => {
  const {content} = req.body as {content: string};
  if (!content.trim()) {
    res.status(400).json({
      error: 'comment content must be at least one character long.'
    });
    return;
  }

  if (content.length > 140) {
    res.status(413).json({
      error: 'comment content must be no more than 140 characters.'
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the commentor/author of the comment whose commentId is in req.params
 */
const isValidCommentModifier = async (req: Request, res: Response, next: NextFunction) => {
  const comment = await CommentCollection.findOne(req.params.commentId);
  const userId = comment.commentorId._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' comments.'
    });
    return;
  }

  next();
};


/**
 * 
 * checks if originalFreet that the comment refers to still exists
 */
const isOriginalFreetExists = async (req: Request, res: Response, next: NextFunction) => {

    const comment = await CommentCollection.findOne(req.params.commentId);
    const ogFreetId = comment.originalFreetId._id;
    const validFormat = Types.ObjectId.isValid(ogFreetId);
    const ogFreet = validFormat ? await FreetCollection.findOne(ogFreetId) : '';
    if (!ogFreet) {
    res.status(404).json({
      error: {
        originalFreetNotFound: `original freet does not exist`
      }
    });
    return;
  }

  next();

  };

export {
  isCommentExists,
  isValidCommentContent,
  isValidCommentModifier,
  isOriginalFreetExists
};
