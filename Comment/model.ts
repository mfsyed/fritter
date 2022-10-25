import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../Freet/model';
/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Comment on the backend
export type Comment = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  commentorId: Types.ObjectId;
  originalFreetId: Types.ObjectId;
  dateCreated: Date;
  content: string;
  dateModified: Date;
};

export type PopulatedComment = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  commentorId: User;
  originalFreetId: Freet;
  dateCreated: Date;
  content: string;
  dateModified: Date;
};

// Mongoose schema definition for interfacing with a MongoDB table

const CommentSchema = new Schema<Comment>({
  // commentor
  commentorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  originalFreetId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  },
  // The date the comment was created
  dateCreated: {
    type: Date,
    required: true
  },
  // The content of the comment
  content: {
    type: String,
    required: true
  },
  // The date the comment was modified
  dateModified: {
    type: Date,
    required: true
  }
});

const CommentModel = model<Comment>('Comment', CommentSchema);
export default CommentModel;
