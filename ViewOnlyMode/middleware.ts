import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ViewOnlyModeCollection from '../ViewOnlyMode/collection';

//check if a viewonly mode exists


/**
 * Checks if a freet with freetId is req.params exists
 */
 const isModeExist = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.viewOnlyModeId);
    const viewonlymode = validFormat ? await ViewOnlyModeCollection.findOneByViewOnlyModeId(req.params.viewOnlyModeId) : '';
    if (!viewonlymode) {
      res.status(404).json({
        error: {
          modeNotFound: `this mode does not exist`
        }
      });
      return;
    }
  
    next();
  };


/**
 * Check if user is allowed ot modify the viewOnlymode Status
 */
 const isValidViewOnlyModeStatusModifier = async (req: Request, res: Response, next: NextFunction) => {
    const viewOnlyMode = await ViewOnlyModeCollection.findOneByViewOnlyModeId(req.params.viewOnlyModeId);
    const viewerId = viewOnlyMode.viewer._id;
    if (req.session.userId !== viewerId.toString()) {
      res.status(403).json({
        error: 'Not a viewer!!!'
      });
      return;
    }
  
    next();
  };


/**
 * Check if one doesn't already exist
 */
 const previouslyExist = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.viewOnlyModeId);
    const viewonlymode = validFormat ? await ViewOnlyModeCollection.findOneByUsernames(req.params.viewer, req.params.viewee) : '';
    if (viewonlymode) {
      res.status(404).json({
        error: {
          modeNotFound: `this mode exists!`
        }
      });
      return;
    }
  
    next();
  };


  //check if viewer and viewer exist.


  export {
    isModeExist,
    isValidViewOnlyModeStatusModifier,
    previouslyExist
  };