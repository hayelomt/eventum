import Events from '../events';
import EventDto from './events.dto';

const EventsService = {
  create: async (data: any) => {
    const filtered = await EventDto.create(data);

    return Events.create(filtered);
  },
};

export default EventsService;
