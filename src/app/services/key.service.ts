import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor() { }

  private API_KEY: string;

  setKey(key: string): void {
    this.API_KEY = key;
  }

  getKey(): string {
    return this.API_KEY;
  }
}
