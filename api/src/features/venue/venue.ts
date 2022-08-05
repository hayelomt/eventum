import { Schema } from 'mongoose';
import { db } from '../../core/db/connection';
import appConstants from '../../core/utils/app-constants';

export type IVenue = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  capacity: number;
  heroImage: string;
  images: string[];
};

const VenueSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  capacity: Number,
  heroImage: String,
  images: [String],
});

const Venue = db.model(appConstants.models.venue, VenueSchema);

export default Venue;
