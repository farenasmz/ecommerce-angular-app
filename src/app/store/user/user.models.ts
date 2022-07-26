export { User, Recruiter, Employee } from '@app/models/backend/user';
import { User } from '@app/models/backend';

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export type UserCreateRequest = Omit<User, 'uid' | 'email' | 'created'>;
