import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAMhHZGjkC-Fvc_rzS70_gMrUbaIzjuxKQ",
  authDomain: "prueba-tecnica-app-developer.firebaseapp.com",
  projectId: "prueba-tecnica-app-developer",
  storageBucket: "prueba-tecnica-app-developer.appspot.com",
  messagingSenderId: "244758119966",
  appId: "1:244758119966:web:d4f5575f949dfb3bdf100f",
  measurementId: "G-TSN3GDYTZP"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIonicAngular({}),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics())
  ]
};
