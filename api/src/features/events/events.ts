import { Schema, Types } from 'mongoose';
import { db } from '../../core/db/connection';
import appConstants from '../../core/utils/app-constants';

export enum EventStatus {
  Draft = 'Draft',
  Published = 'Published',
  Starting = 'Starting',
  Archived = 'Archived',
}

type IEvents = {
  name: string;
  type: string;
  detail: string;
  ageRestriction?: number;
  otherRestriction?: string;
  duration: {
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
  };
  status: EventStatus;
  ticketScanners: string[];
  heroImage: string;
  images: string[];
  location: {
    name: String;
    latitude: number;
    longitude: number;
  };
  venueId: string;
};

const EventsSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  detail: String,
  ageRestriction: Number,
  otherRestriction: String,
  duration: {
    startDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endDate: { type: Date, required: true },
    endTime: { type: String, required: true },
  },
  status: { type: String, required: true, enum: Object.values(EventStatus) },
  ticketScanners: [Types.ObjectId],
  heroImage: String,
  images: [String],
  location: {
    name: String,
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  venueId: {
    type: Types.ObjectId,
    required: true,
    ref: appConstants.models.venue,
  },
});

const Events = db.model<IEvents>(appConstants.models.event, EventsSchema);

export default Events;
