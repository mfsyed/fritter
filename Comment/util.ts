import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Comment, PopulatedComment} from '../Comment/model';


// Update this if you add a property to the Freet type!
type CommentResponse = {
  _id: string;
  commentor: string;
  originalFreetId: string
  dateCreated: string;
  content: string;
  dateModified: string;
};


/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Freet>} freet - A freet
 * @returns {FreetResponse} - The freet object formatted for the frontend
 */
const constructCommentResponse = (comment: HydratedDocument<Comment>): CommentResponse => {
  const commentCopy: PopulatedComment = {
    ...comment.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const {username} = commentCopy.commentorId;
  delete commentCopy.commentorId;
  return {
    ...commentCopy,
    _id: commentCopy._id.toString(),
    commentor: username,
    originalFreetId: commentCopy.originalFreetId._id.toString(),
    dateCreated: formatDate(comment.dateCreated),
    content: commentCopy.content,
    dateModified: formatDate(comment.dateModified)
  };
};

export {
  constructCommentResponse
};
