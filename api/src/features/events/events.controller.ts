import catchAsync from '../../core/utils/catch-async';
import EventsService from './_lib/events.service';

const EventsController = {
  store: catchAsync(async (req, res) => {
    const result = await EventsService.create({ ...req.body });

    res.json({ data: result });
  }),
};

export default EventsController;
