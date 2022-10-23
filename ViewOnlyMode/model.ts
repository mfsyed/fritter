import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type ViewOnlyMode = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  viewer: Types.ObjectId;
  viewee: Types.ObjectId;
  viewOnlyModeState: boolean;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ViewOnlyModeSchema = new Schema({
  // The user's username
  viewer: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The user's password
  viewee: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The date the user joined
  viewOnlyModeState: {
    type: Boolean,
    required: true
  }
});

const ViewOnlyModeModel = model<ViewOnlyMode>('ViewOnlyMode', ViewOnlyModeSchema);
export default ViewOnlyModeModel;
