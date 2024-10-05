// Importaciones necesarias de Angular y AngularFire
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  // Constructor del servicio
  constructor(private firestore: AngularFirestore) {}

  // Método para guardar un número y sus propiedades en Firestore
  saveNumber(
    input: number, // Número de entrada
    numbers: { value: number; color: string; multiples: number[] }[] // Array de números generados con sus propiedades
  ) {
    // Agrega un nuevo documento a la colección 'numbers' en Firestore
    return this.firestore.collection('numbers').add({ input, numbers });
  }

  // Método para obtener los números guardados desde Firestore
  getNumbers() {
    // Retorna un observable que emite los cambios en la colección 'numbers'
    return this.firestore.collection('numbers').valueChanges();
  }
}
