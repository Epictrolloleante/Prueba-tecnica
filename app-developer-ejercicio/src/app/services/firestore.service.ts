import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  saveNumber(
    input: number,
    numbers: { value: number; color: string; multiples: number[] }[]
  ) {
    return this.firestore.collection('numbers').add({ input, numbers });
  }

  getNumbers() {
    return this.firestore.collection('numbers').valueChanges();
  }
}
