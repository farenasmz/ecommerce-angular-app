import firebase from 'firebase/firestore';

export interface Job {
  title: string;
  salary: number;
  createdDate: firebase.FieldValue;
  updated?: firebase.FieldValue;
}
