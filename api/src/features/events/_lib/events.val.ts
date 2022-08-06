import { check, ValidationChain } from 'express-validator';
import validationBuilder from '../../../core/utils/validation-builder';
import VenueService from '../../venue/_lib/venue.service';

type EventsValKeys = 'createRules';

const EventsVal: Record<EventsValKeys, ValidationChain[]> = {
  createRules: [
    validationBuilder(check('name'), 'Name')
      .required()
      .string()
      .maxString(100)
      .build(),
    validationBuilder(check('type'), 'Type').required().string().build(),
    validationBuilder(check('detail'), 'Detail')
      .required()
      .string()
      .maxString(5000)
      .build(),
    validationBuilder(check('ageRestriction'), 'Age restriction')
      .optional()
      .integer()
      .intGte(0)
      .build(),
    validationBuilder(check('otherRestriction'), 'Other restriction')
      .optional()
      .string()
      .maxString(2000)
      .build(),
    validationBuilder(check('startDate'), 'Start date')
      .required()
      .date()
      .build(),
    validationBuilder(check('startTime'), 'Start time')
      .required()
      .time()
      .build(),
    validationBuilder(check('endDate'), 'End date').required().date().build(),
    validationBuilder(check('endTime'), 'End time').required().time().build(),
    validationBuilder(check('venueId'), 'Venue')
      .required()
      .validMongooseId()
      .exists(VenueService)
      .build(),
  ],
};

export default EventsVal;
