import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {React} from '../react/model';

// Update this if you add a property to the Freet type!
type ReactResponse = {
  _id: string;
  freetId: string;
  reactorId: string;
  reaction: string

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
 * @param {HydratedDocument<Freet>} react - A freet
 * @returns {ReactResponse} - The freet object formatted for the frontend
 */
const constructReactResponse = (react: HydratedDocument<React>): ReactResponse => {

    const reactCopy: React = {
        ...react.toObject({
            versionKey: false // Cosmetics; prevents returning of __v property
        })
        };
        return {
        ...reactCopy,
        _id: reactCopy._id.toString(),
        reactorId: reactCopy.freetId.toString(),
        freetId: reactCopy.freetId.toString(),
        reaction: reactCopy.reaction.toString()
        };
};


export {
  constructReactResponse
};
