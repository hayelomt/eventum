import VenueService from '../../venue/_lib/venue.service';
import { EventStatus } from '../events';

type CreateEventDto = {
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
    latitude: number;
    longitude: number;
  };
  venueId: string;
};

const EventsDto = {
  create: async (data: any): Promise<CreateEventDto> => {
    const venue = await VenueService.findOne(data.venueId);

    return {
      name: data.name,
      type: data.type,
      detail: data.detail,
      ageRestriction: data.ageRestriction,
      otherRestriction: data.otherRestriction,
      duration: {
        startDate: data.startDate,
        startTime: data.startTime,
        endDate: data.endDate,
        endTime: data.endTime,
      },
      ticketScanners: [],
      heroImage: data.heroImage,
      images: data.images,
      location: {
        latitude: venue.location.latitude,
        longitude: venue.location.longitude,
      },
      status: EventStatus.Draft,
      venueId: data.venueId,
    };
  },
};

export default EventsDto;
