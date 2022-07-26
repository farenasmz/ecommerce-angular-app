import { Employee, Recruiter } from './roles';
import firebase from 'firebase/firestore';
export * from './roles';

export interface User {
  uid: string;
  name: string | null;
  photoUrl: string | null;
  email: string | null;
  country: string | null;
  about?: string | null;
  roleId?: string | null;
  role?: Employee | Recruiter | null;
  created: firebase.FieldValue;
  updated?: firebase.FieldValue;
}
