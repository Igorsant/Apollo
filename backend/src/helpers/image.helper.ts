import { randomUUID } from 'crypto';
import { promises } from 'fs';
import path from 'path';

export function saveImageFromBase64(
  imageBase64: string,
  extension: 'jpg' | 'png'
): Promise<string> {
  return new Promise((resolve, reject) => {
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    const imageName = randomUUID() + '.' + extension;
    const fileFullPath = path.join(
      __dirname,
      '..',
      '..',
      'static',
      'user_pictures',
      imageName
    );

    promises
      .writeFile(fileFullPath, imageBuffer)
      .then(() => resolve(`/pictures/${imageName}`))
      .catch((err) => reject(err));
  });
}
