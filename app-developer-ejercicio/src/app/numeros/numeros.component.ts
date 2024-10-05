import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-number-input',
  templateUrl: './numeros.component.html',
  styleUrls: ['./numeros.component.css'],
})
export class NumberInputComponent {
  inputNumber: number = 0;
  numbers: { value: number; color: string; multiples: number[] }[] = [];
  savedNumbers$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.savedNumbers$ = this.firestore.collection('numbers').valueChanges();
  }

  onSubmit() {
    this.numbers = this.generateNumbers(this.inputNumber);
    this.saveToFirestore(this.inputNumber, this.numbers);
  }

  generateNumbers(input: number) {
    const numbers = [];
    for (let i = 0; i <= input; i++) {
      const multiples = [];
      let color = 'black';

      if (i % 3 === 0) {
        multiples.push(3);
        color = 'green';
      }
      if (i % 5 === 0) {
        multiples.push(5);
        if (color === 'black') color = 'red';
      }
      if (i % 7 === 0) {
        multiples.push(7);
        if (color === 'black') color = 'blue';
      }

      numbers.push({ value: i, color, multiples });
    }
    return numbers;
  }

  saveToFirestore(
    input: number,
    numbers: { value: number; color: string; multiples: number[] }[]
  ) {
    this.firestore.collection('numbers').add({ input, numbers });
  }
}
