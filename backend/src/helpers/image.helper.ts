import { randomUUID } from 'crypto';
import { unlink, promises } from 'fs';
import path from 'path';

import {
  DEFAULT_USER_PICTURE,
  PICTURES_FOLDER,
  PICTURES_PATH
} from './consts.helper';

export function saveBase64Image(
  imageBase64: string | null | undefined,
  extension: 'jpg' | 'png' = 'jpg'
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if (!imageBase64) resolve(null);

    const imageBuffer = Buffer.from(imageBase64, 'base64');
    const imageName = randomUUID() + '.' + extension;
    const fileFullPath = path.join(PICTURES_FOLDER, imageName);

    promises
      .writeFile(fileFullPath, imageBuffer)
      .then(() => resolve(imageName))
      .catch((err) => reject(err));
  });
}

export function deletePicture(pictureName: string) {
  unlink(path.join(PICTURES_FOLDER, pictureName), (err) => {
    console.error(err);
  });
}

export function userPicture(imageName?: string): string {
  return `${PICTURES_PATH}/${imageName || DEFAULT_USER_PICTURE}`;
}
