// Importaciones necesarias de Angular y otras bibliotecas
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-number-input', // Selector del componente
  templateUrl: './numeros.component.html', // Ruta del archivo de plantilla HTML
  styleUrls: ['./numeros.component.css'], // Ruta del archivo de estilos CSS
})
export class NumberInputComponent {
  // Propieddes del componente
  inputNumber: number = 0; // Número de entrada inicializado en 0
  numbers: { value: number; color: string; multiples: number[] }[] = []; // Arreglo para almacenar los números generados y sus propiedades
  savedNumbers$: Observable<any[]>; // Observable para los números guardados en Firestore

  // Constructor del componente
  constructor(private firestore: AngularFirestore) {
    // Inicializa el observable para obtener los números que ya están guardados en Firestore
    this.savedNumbers$ = this.firestore.collection('numbers').valueChanges();

    // Se suscribe al observable para obtener los datos y mostrarlos en la consola
    this.savedNumbers$.subscribe((data) => {
      console.log(data);
    });
  }

  // Método que se llama al enviar el formulario
  onSubmit() {
    // Genera los números basados en el número de entrada
    this.numbers = this.generateNumbers(this.inputNumber);
    // Guarda los números generados en Firestore
    this.saveToFirestore(this.inputNumber, this.numbers);
  }

  // Método para generar los números  y obtener sus multiplos
  generateNumbers(input: number) {
    const numbers = []; // Array para almacenar los números generados junto con sus propiedades
    for (let i = 0; i <= input; i++) {
      const multiples: number[] = []; // Array para almacenar los múltiplos
      let color = 'black'; // Color inicial de los números,en caso que no tenga multiplo se queda en ese color

      // Verifica si el número es 0
      if (i === 0) {
        numbers.push({ value: i, color, multiples });
        continue; // Salta a la siguiente iteración
      }

      // Verifica si el número es múltiplo de 3
      if (i % 3 === 0) {
        multiples.push(3);
        color = 'green'; // Cambia el color a verde si es múltiplo de 3
      }
      // Verifica si el número es múltiplo de 5
      if (i % 5 === 0) {
        multiples.push(5);
        if (color === 'black') color = 'red'; // Cambia el color a rojo si es múltiplo de 5 y el color aún es negro
      }
      // Verifica si el número es múltiplo de 7
      if (i % 7 === 0) {
        multiples.push(7);
        if (color === 'black') color = 'cyan'; // Cambia el color a azul  si es múltiplo de 7 y el color aún es negro
      }

      // Agrega el número y sus propiedades al array
      numbers.push({ value: i, color, multiples });
    }
    return numbers; // Retorna el array de números generados
  }

  // Método para guardar los números generados en Firestore
  saveToFirestore(
    input: number,
    numbers: { value: number; color: string; multiples: number[] }[]
  ) {
    // Agrega un nuevo documento a la colección 'numbers' en Firestore
    this.firestore.collection('numbers').add({ input, numbers });
  }
}
