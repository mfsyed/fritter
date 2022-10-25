import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {React, PopulatedReact} from '../react/model';

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

    const reactCopy: PopulatedReact = {
        ...react.toObject({
            versionKey: false // Cosmetics; prevents returning of __v property
        })
        };
        const {_id} = reactCopy.freetId;
        delete reactCopy.freetId;
        const {username} = reactCopy.reactorId;
        delete reactCopy.reactorId;
        return {
        ...reactCopy,
        _id: reactCopy._id.toString(),
        reactorId: username,
        freetId: _id.toString(),
        reaction: reactCopy.reaction.toString()
        };
};


export {
  constructReactResponse
};
