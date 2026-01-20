import ImageKit from '@imagekit/nodejs';
import { env } from "../config/createEnv";


export const client = new ImageKit({
  privateKey: env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});
