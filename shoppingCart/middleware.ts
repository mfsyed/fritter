//does shopping cart exists
import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ShoppingCartCollection from '../shoppingCart/collection';
import UserCollection from '../user/collection';





// /**
//  * Checks if a shopping cart exits
//  */
//  const doesUserAlreadyHaveShoppingCart = async (req: Request, res: Response, next: NextFunction) => {
//   const {username} = await UserCollection.findOneByUserId(req.session.userId);
//   const cart = await ShoppingCartCollection.findCartByUsername(username);
//   //console.log(cart.);
//   if (cart) {
//     res.status(404).json({
//       error: {
//         cartNotFound: `Cart for user already exists.`
//       }
//     });
//     return;
//   }

//   next();
// };



/**
 * Checks if a shopping cart exits
 */
const doesShoppingCartExist = async (req: Request, res: Response, next: NextFunction) => {
  const {username} = await UserCollection.findOneByUserId(req.session.userId);
  const cart = await ShoppingCartCollection.findCartByUsername(username);
  //const freet = validFormat ? await ShoppingCartCollection.findOne(req.params.shoppingCartId) : '';
  if (!cart) {
    res.status(404).json({
      error: {
        cartNotFound: `Cart does not exist.`
      }
    });
    return;
  }

  next();
};

// /**
//  * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
//  * spaces and not more than 140 characters
//  */
// const isValidCartContent = (req: Request, res: Response, next: NextFunction) => {
//   const {content} = req.body as {content: string};
//   if (!content.trim()) {
//     res.status(400).json({
//       error: 'Freet content must be at least one character long.'
//     });
//     return;
//   }

//   if (content.length > 140) {
//     res.status(413).json({
//       error: 'Freet content must be no more than 140 characters.'
//     });
//     return;
//   }

//   next();
// };


const isItemInCart = async (req: Request, res: Response, next: NextFunction) => {
  const shoppingCart = await ShoppingCartCollection.findOne(req.params.shoppingCartId);
  const userId = shoppingCart.cartOwner._id;
  const itemId =  req.params.itemId.toString();
  if (shoppingCart.items.has(itemId)) {
    res.status(403).json({
      error: 'item is not in cart!!!!!!!'
    });
    return;
  }

  next();
};

// /**
//  * Checks if the current user is the author of the freet whose freetId is in req.params
//  */
// const isValidCartModifier = async (req: Request, res: Response, next: NextFunction) => {
//   const {username} = await UserCollection.findOneByUserId(req.session.userId);
//   const cart = await ShoppingCartCollection.findCartByUsername(username);

//   const shoppingCart = await ShoppingCartCollection.findOne(req.params.shoppingCartId);
//   const userId = shoppingCart.cartOwner;
//   if (req.session.userId !== userId.toString()) {
//     res.status(403).json({
//       error: 'Cannot modify other users\' carts.'
//     });
//     return;
//   }

//   next();
//};

export {
  doesShoppingCartExist,
  //doesUserAlreadyHaveShoppingCart,
  isItemInCart,
  //isValidCartModifier
};
