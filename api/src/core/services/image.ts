const ImageService = {
  stripPublic: (name: string) =>
    name.startsWith('public/') ? name.replace('public/', '') : '',

  parseImage: (data: any, imageField: string) =>
    ImageService.stripPublic(data[imageField][0]?.path || ''),

  parseImageArray: (data: any, imageField: string) =>
    (data[imageField] || []).map((i: any) =>
      ImageService.stripPublic(i.path || ''),
    ),
};

export default ImageService;
