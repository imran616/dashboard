import { Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Store {
  authToken: WritableSignal<string | null> = signal(null);

  constructor(private router: Router) {
    const token = localStorage.getItem('authToken') ?? '';
    this.authToken.set(token);
  }
}
