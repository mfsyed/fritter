import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {ViewOnlyMode} from '../ViewOnlyMode/model';

// Update this if you add a property to the Freet type!
type ViewOnlyModeResponse = {
  _id: string;
  viewer: string;
  viewee: string;
  viewOnlyModeState: string;
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
const constructViewOnlyModeResponse = (viewOnlyMode: HydratedDocument<ViewOnlyMode>): ViewOnlyModeResponse => {
    const viewOnlyModeCopy: ViewOnlyMode = {
        ...viewOnlyMode.toObject({
          versionKey: false // Cosmetics; prevents returning of __v property
        })
      };
      //delete viewOnlyModeCopy.password;
      return {
        ...viewOnlyModeCopy,
        _id: viewOnlyModeCopy._id.toString(),
        viewer: viewOnlyModeCopy.viewer.toString(),
        viewee: viewOnlyModeCopy.viewee.toString(),
        viewOnlyModeState: viewOnlyModeCopy.viewOnlyModeState.toString()
      };
    };

export {
   constructViewOnlyModeResponse
};
