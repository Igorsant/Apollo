import { randomUUID } from 'crypto';
import { promises } from 'fs';
import path from 'path';

import {
  DEFAULT_USER_PICTURE,
  PICTURES_FOLDER,
  PICTURES_PATH
} from './consts.helper';

export function saveImageFromBase64(
  imageBase64: string,
  extension: 'jpg' | 'png'
): Promise<string> {
  return new Promise((resolve, reject) => {
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    const imageName = randomUUID() + '.' + extension;
    const fileFullPath = path.join(PICTURES_FOLDER, imageName);

    promises
      .writeFile(fileFullPath, imageBuffer)
      .then(() => resolve(imageName))
      .catch((err) => reject(err));
  });
}

export function userPicture(imageName?: string): string {
  return `${PICTURES_PATH}/${imageName || DEFAULT_USER_PICTURE}`;
}
