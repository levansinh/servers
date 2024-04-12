import slugify from 'slugify';

export const convertSlug = (name: string) => {
  return slugify(name, {
    replacement: '-',
    remove: undefined,
    lower: false,
    strict: false,
    trim: true
  });
};
