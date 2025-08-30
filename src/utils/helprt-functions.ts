import { UserEntity } from '../user/user.entity';

export const returnUser = (user: UserEntity) => {
  const { password, ...restUser } = user;
  return restUser;
};
export function isLocalEnv(): boolean {
  return process.env.NODE_ENV.includes('local');
}
