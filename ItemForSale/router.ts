import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import ItemForSaleCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as ItemForSaleValidator from '../ItemForSale/middleware';
import * as util from './util';
import { previousReactionNotExists } from 'react/middleware';
import e from 'express';

const router = express.Router();

/**
 * Get all the freets
 *
 * @name GET /api/freets
 *
 * @return {FreetResponse[]} - A list of all the freets sorted in descending
 *                      order by date modified
 */
/**
 * Get freets by author.
 *
 * @name GET /api/freets?authorId=id
 *
 * @return {FreetResponse[]} - An array of freets created by user with id, authorId
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if authorId query parameter was supplied
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    if (req.query.seller!== undefined) {
      next();
      return;
    }

    const allItemsForSale = await ItemForSaleCollection.findAllItems();
    const response = allItemsForSale.map(util.constructItemForSaleResponse);
    res.status(200).json(response);
  },

  [
    userValidator.isSellerExists
  ],
  async (req: Request, res: Response) => {
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    const sellerItemsForSale = await ItemForSaleCollection.findAllItemsByUsername(req.query.seller as string);
    const response = sellerItemsForSale.map(util.constructItemForSaleResponse);
    console.log(response);
    res.status(200).json(response);
  }
);

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
  '/',
  [
    userValidator.isUserLoggedIn,
    ItemForSaleValidator.isValidFreetDescription,
    ItemForSaleValidator.isValidPrice
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    console.log(userId);
    const itemForSale = await ItemForSaleCollection.addItem(userId, req.body.description, req.body.price, req.body.link);
    
    res.status(201).json({
      message: 'Your freet was created successfully.',
      itemForSale: util.constructItemForSaleResponse(itemForSale)
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
  '/:itemForSaleId?',
  [
    userValidator.isUserLoggedIn,
    ItemForSaleValidator.isItemForSaleExists,
    ItemForSaleValidator.isValidItemForSaleModifier
  ],
  async (req: Request, res: Response) => {
    await ItemForSaleCollection.deleteItem(req.params.itemForSaleId);
    res.status(200).json({
      message: 'Your freet was deleted successfully.'
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
  '/:itemForSaleId?',
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.price || req.body.description) next('route');
    else next();
  },
  [
      userValidator.isUserLoggedIn,
      ItemForSaleValidator.isItemForSaleExists,
      ItemForSaleValidator.isValidItemForSaleModifier
  ],
  async (req: Request, res: Response) => {
      const itemForSale= await ItemForSaleCollection.updateLink(req.params.itemForSaleId, req.body.link);
      res.status(200).json({
      message: 'Your freet was updated successfully.',
      itemForSale: util.constructItemForSaleResponse(itemForSale)
      });
  }
);


router.put(
  '/:itemForSaleId?',
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.price) next('route');
    else next();
  },
  [
    userValidator.isUserLoggedIn,
    ItemForSaleValidator.isItemForSaleExists,
    ItemForSaleValidator.isValidItemForSaleModifier,
    ItemForSaleValidator.isValidFreetDescription
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    //if(req.body.price !== null || req.body.link !== null) next('route');
    const itemForSale = await ItemForSaleCollection.updateDescription(req.params.itemForSaleId, req.body.description);
    res.status(200).json({
      message: 'Your freet was updated successfully.',
      itemForSale: util.constructItemForSaleResponse(itemForSale)
    });
  }
);

router.put(
    '/:itemForSaleId?',
    [
        userValidator.isUserLoggedIn,
        ItemForSaleValidator.isItemForSaleExists,
        ItemForSaleValidator.isValidItemForSaleModifier,
        ItemForSaleValidator.isValidPrice
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      if(req.body.link !== null) next('route');
      const itemForSale = await ItemForSaleCollection.updatePrice(req.params.itemForSaleId, req.body.price);
      res.status(200).json({
        message: 'Your itemForSale price was updated successfully.',
        itemForSale: util.constructItemForSaleResponse(itemForSale)
      });
    }
  );
  

export {router as itemForSaleRouter};
