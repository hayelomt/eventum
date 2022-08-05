import Venue from '../venue';
import VenueDto from './venue.dto';

const VenueService = {
  findOne: (id: string) => {
    return Venue.findById(id);
  },

  findName: (name: string, id?: string) => {
    if (id) {
      return Venue.findOne({ name, _id: { $not: { $eq: id } } });
    }

    return Venue.findOne({ name });
  },

  create: (data: any) => {
    const filtered = VenueDto.create(data);

    return Venue.create(filtered);
  },

  update: (id: string, data: any) => {
    const filtered = VenueDto.update(data);

    return Venue.findByIdAndUpdate(id, filtered);
  },
};

export default VenueService;
