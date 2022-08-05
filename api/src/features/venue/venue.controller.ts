import catchAsync from '../../core/utils/catch-async';
import VenueService from './_lib/venue.service';

const VenueController = {
  store: catchAsync(async (req, res) => {
    const result = await VenueService.create({ ...req.body, ...req.files });

    res.json({ data: result });
  }),

  update: catchAsync(async (req, res) => {
    const result = await VenueService.update(req.params.id, {
      ...req.body,
      ...req.files,
    });

    res.json({ data: result });
  }),
};

export default VenueController;
