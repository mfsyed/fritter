import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../Freet/model';
/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type ItemForSale = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    sellerId: Types.ObjectId;
    dateCreated: Date;
    description: string;
    dateModified: Date;
    price: string;
    link: string;

};

export type PopulatedItemForSale = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    sellerId: User;
    dateCreated: Date;
    description: string;
    dateModified: Date;
    price: string;
    link: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ItemForSaleSchema = new Schema<ItemForSale>({
  // The author userId
  sellerId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The content of the freet

  dateCreated: {
    type: Date,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  dateModified: {
    type: Date,
    required: true
  },

  price: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  }

});

const ItemForSaleModel = model<ItemForSale>('ItemForSale', ItemForSaleSchema);
export default ItemForSaleModel;
