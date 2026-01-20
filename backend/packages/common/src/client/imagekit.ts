import ImageKit from '@imagekit/nodejs';
import { env } from "../config/createEnv";


export const imageKitClient = new ImageKit({
  privateKey: env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});
