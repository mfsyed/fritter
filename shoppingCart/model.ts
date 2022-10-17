import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../Freet/model';
import type {ItemForSale} from '../ItemForSale/model';
/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type ShoppingCart = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    cartOwner: Types.ObjectId;
    numberOfItems: Number;
    items: Types.ObjectId;
    total: string;

};

export type PopulatedShoppingCart = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    cartOwner: User;
    numberOfItems: Number;
    items: Set<ItemForSale>;
    total: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ShoppingCartSchema = new Schema<ShoppingCart>({
  // The author userId
  cartOwner: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The content of the freet

  numberOfItems: {
    type: Number,
    required: true
  },

  items: {
    type: Schema.Types.ObjectId,
    required: true
  },


  total: {
    type: String,
    required: true
  }

});

const ShoppingCartModel = model<ShoppingCart>('ShoppingCart', ShoppingCartSchema);
export default ShoppingCartModel;
