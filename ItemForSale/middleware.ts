//check price
//check if seller exists User Collection
//check if link is empty
//check if item exists

import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ItemForSaleCollection from '../ItemForSale/collection';

/**
 * Checks if a freet with freetId is req.params exists
 */
const isItemForSaleExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.freetId);
  const itemForSale = validFormat ? await ItemForSaleCollection.findOne(req.params.itemForSaleId) : '';
  if (!itemForSale) {
    res.status(404).json({
      error: {
        freetNotFound: `itemForSale does not exist`
      }
    });
    return;
  }

  next();
};

// const isSellerExists = async (req: Request, res: Response, next: NextFunction) => {
//     const validFormat = Types.ObjectId.isValid(req.params.itemForSaleId);
//     const itemForSale =  await ItemForSaleCollection.findOne(req.params.itemForSaleId);
//     const.
//     if (!itemForSale) {
//       res.status(404).json({
//         error: {
//           freetNotFound: `itemForSale does not exist`
//         }
//       });
//       return;
//     }
  
//     next();
//   };


/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidFreetDescription = (req: Request, res: Response, next: NextFunction) => {
  const {description} = req.body as {description: string};
  if (!description.trim()) {
    res.status(400).json({
      error: 'description must be at least one character long.'
    });
    return;
  }

  if (description.length > 140) {
    res.status(413).json({
      error: 'description must be no more than 140 characters.'
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
 const isValidPrice = (req: Request, res: Response, next: NextFunction) => {
    const {price} = req.body as {price: string};
    if (!price.trim()) {
      res.status(400).json({
        error: 'Freet content must be at least one character long.'
      });
      return;
    }

    const priceNumber = parseFloat(price.trim());
    if (priceNumber === NaN || priceNumber < 0){
        res.status(400).json({
            error: 'Pls enter a valid price.'
          });
          return;
    }

    next();
};




/**
 * Checks if the current user is the author of the freet whose freetId is in req.params
 */
const isValidItemForSaleModifier = async (req: Request, res: Response, next: NextFunction) => {
  const itemForSale = await ItemForSaleCollection.findOne(req.params.itemForSaleId);
  const userId = itemForSale.sellerId._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' freets.'
    });
    return;
  }

  next();
};

export {
  isItemForSaleExists,
  isValidFreetDescription,
  isValidPrice,
  isValidItemForSaleModifier
};





