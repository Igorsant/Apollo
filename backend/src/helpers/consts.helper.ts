import { join } from 'path';

export const DEFAULT_USER_PICTURE = 'default_user.jpg';

export const PICTURES_FOLDER = join(
  __dirname,
  '..',
  '..',
  'static',
  'user_pictures'
);

export const PICTURES_PATH = '/pictures';
