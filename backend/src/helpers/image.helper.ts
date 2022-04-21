import { randomUUID } from 'crypto';
import { promises } from 'fs';
import path from 'path';

import { PICTURES_FOLDER } from './consts.helper';

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
