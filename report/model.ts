import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../Freet/model';
/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type Report = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  freetId: Types.ObjectId;
  reporterId: Types.ObjectId;
  content: string;
  dateReported: Date;
};

export type PopulatedReport = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  freetId: Freet;
  reporterId: User;
  content: string;
  dateReported: Date; // add user reaction
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ReportSchema = new Schema<Report>({
  // The author userId
  freetId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  },
  // The content of the freet
  reporterId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  content: {
    type: String,
    required: true
  },

  dateReported: {
    type: Date,
    required: true
  }
});

const ReportModel = model<Report>('Report', ReportSchema);
export default ReportModel;
