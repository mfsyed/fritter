import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ReportCollection from '../report/collection';



/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidReportContent = (req: Request, res: Response, next: NextFunction) => {
  const {content} = req.body as {content: string};
  if (!content.trim()) {
    res.status(400).json({
      error: 'Freet content must be at least one character long.'
    });
    return;
  }

  next();
};

// /**
//  * Checks if the current user is the author of the freet whose freetId is in req.params
//  */
// const isValidFreetModifier = async (req: Request, res: Response, next: NextFunction) => {
//   const freet = await FreetCollection.findOne(req.params.freetId);
//   const userId = freet.authorId._id;
//   if (req.session.userId !== userId.toString()) {
//     res.status(403).json({
//       error: 'Cannot modify other users\' freets.'
//     });
//     return;
//   }

//   next();
// };

export {
  isValidReportContent,
};
