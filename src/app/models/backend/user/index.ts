import { Employee, Recruiter } from './roles';
import firebase from 'firebase/firestore';
export * from './roles';

export interface User {
  uid: string;
  name: string;
  photoUrl: string;
  email: string;
  country: string;
  about?: string;
  roleId: string;
  role: Employee | Recruiter;
  created: firebase.FieldValue;
  updated?: firebase.FieldValue;
}
