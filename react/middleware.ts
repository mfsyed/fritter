import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ReactCollection from '../react/collection';

// /**
//  * Checks if a freet with freetId is req.params exists
//  */
// const isFreetExists = async (req: Request, res: Response, next: NextFunction) => {
//   const validFormat = Types.ObjectId.isValid(req.params.freetId);
//   const freet = validFormat ? await FreetCollection.findOne(req.params.freetId) : '';
//   if (!freet) {
//     res.status(404).json({
//       error: {
//         freetNotFound: `Freet with freet ID ${req.params.freetId} does not exist.`
//       }
//     });
//     return;
//   }

//   next();
// };

/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidReaction = (req: Request, res: Response, next: NextFunction) => {
  const {content} = req.body as {content: string};
  if (!(content === "Like" || content === "Love" || content === "Wow" || content === "Angry" || content === "Sad")) {
    res.status(400).json({
      error: 'invalid reaction'
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

const previousReactionExists = async (req: Request, res: Response, next: NextFunction) => {
    //const reactorId = React
    const validFormat = Types.ObjectId.isValid(req.params.reactorId);
    const react= validFormat ? await ReactCollection.findOneByUsernameAndFreet(req.session.reactorId, req.params.freetId)  : '';  
    if (!react) {
        res.status(404).json({
          error: {
            freetNotFound: `Freet doesn't exist`
          }
        });
        return;
      }
    
      next();
  };

  const previousReactionNotExists = async (req: Request, res: Response, next: NextFunction) => {
    //const reactorId = React
    const validFormat = Types.ObjectId.isValid(req.params.reactorId);
    const react= validFormat ? await ReactCollection.findOneByUsernameAndFreet(req.session.reactorId, req.params.freetId)  : '';  
    if (react) {
        res.status(404).json({
          error: {
            freetNotFound: `Freet doesn't exist`
          }
        });
        return;
      }
    
      next();
  };


export {
  isValidReaction,
  previousReactionExists,
  previousReactionNotExists
  //isFreetExists,
  //checkPreviousReaction
};
