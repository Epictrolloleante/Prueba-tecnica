// Importaciones necesarias de Angular y otras bibliotecas
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

// Importación de los componentes de la aplicación
import { AppComponent } from './app.component';
import { NumberInputComponent } from './numeros/numeros.component';
// Importación del archivo de configuración del entorno
import { environment } from '../environments/environment';

@NgModule({
  // Declaración de los componentes que pertenecen a este módulo
  declarations: [
    AppComponent,
    NumberInputComponent, // Componente números
  ],
  // Importación de otros módulos necesarios para la aplicación
  imports: [
    BrowserModule, // Módulo necesario para aplicaciones que se ejecutan en un navegador
    FormsModule,
    RouterModule.forRoot([]),
    IonicModule.forRoot(), // Módulo de Ionic
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialización de Firebase con la configuración del entorno
    AngularFirestoreModule, // Módulo de Firestore para trabajar con la base de datos
    AngularFireAnalyticsModule, // Módulo de Analytics para Firebase
  ],
  // Esquemas personalizados para permitir el uso de elementos personalizados como los selectores
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  // Componente principal que se debe inicializar al arrancar la aplicación
  bootstrap: [AppComponent],
})
// Exportación de la clase del módulo principal de la aplicación
export class AppModule {}
