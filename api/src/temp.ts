import { Types } from 'mongoose';
import Venue from './features/venue/venue';

(async () => {
  console.log(
    await Venue.findOne({
      _id: { $not: { $eq: '62eda3ec72d28b7a6c97cfbf' } },
      // id: { $eq: new Types.ObjectId('62eda3ec72d28b7a6c97cfbe') },
      name: 'Stadium',
    }).exec(),
  );
  process.exit(0);
})();
