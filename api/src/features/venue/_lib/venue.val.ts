import { check, ValidationChain } from 'express-validator';
import validationBuilder from '../../../core/utils/validation-builder';
import VenueService from './venue.service';

type VenueValKey = 'createRules' | 'updateRules';

const VenueVal: Record<VenueValKey, ValidationChain[]> = {
  createRules: [
    validationBuilder(check('name'), 'Name')
      .required()
      .string()
      .custom(
        async (name: string, _: any) =>
          (await VenueService.findName(name)) === null,
        (field: string) => `${field} already exists`,
      )
      .build(),
    validationBuilder(check('latitude'), 'Latitude')
      .required()
      .number()
      .build(),
    validationBuilder(check('longitude'), 'Longitude')
      .required()
      .number()
      .build(),
    validationBuilder(check('capacity'), 'Capacity')
      .required()
      .integer()
      .intGt(0)
      .build(),
  ],

  updateRules: [
    validationBuilder(check('name'), 'Name')
      .required()
      .string()
      .custom(
        async (name: string, req: any) =>
          (await VenueService.findName(name, req.params.id)) === null,
        (field: string) => `${field} already exists`,
      )
      .build(),
    validationBuilder(check('latitude'), 'Latitude')
      .required()
      .number()
      .build(),
    validationBuilder(check('longitude'), 'Longitude')
      .required()
      .number()
      .build(),
    validationBuilder(check('capacity'), 'Capacity')
      .required()
      .integer()
      .intGt(0)
      .build(),
  ],
};

export default VenueVal;
