import { UserEntity } from '../user/user.entity';
import * as dotenv from 'dotenv';
dotenv.config({
  path: `.env`,
});

export const returnUser = (user: UserEntity) => {
  const { password, ...restUser } = user;
  return restUser;
};
export function isLocalEnv(): boolean {
  return process.env.NODE_ENV.includes('local');
}

export const slugify = (text: string) => {
  return text.toLowerCase().replace(/ /g, '-');
};
