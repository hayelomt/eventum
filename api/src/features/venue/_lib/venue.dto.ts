import ImageService from '../../../core/services/image';

export type CreateVenueDto = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  capacity: number;
  heroImage: string;
  images: string[];
};

type UpdateVenueDto = {
  name?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  capacity?: number;
  heroImage?: string;
  images?: string[];
};

const VenueDto = {
  create: (data: any): CreateVenueDto => ({
    name: data.name,
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
    },
    capacity: data.capacity,
    heroImage: ImageService.parseImage(data, 'heroImage'),
    images: ImageService.parseImageArray(data, 'images'),
  }),

  update: (data: any): UpdateVenueDto => ({
    name: data.name,
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
    },
    capacity: data.capacity,
    heroImage: ImageService.parseImage(data, 'heroImage'),
    images: ImageService.parseImageArray(data, 'images'),
  }),
};

export default VenueDto;
