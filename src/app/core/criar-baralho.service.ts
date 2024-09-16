import { Injectable } from '@angular/core';
import {Carta} from "./model/carta";

@Injectable({
  providedIn: 'root'
})
export class CriarBaralhoService {

  private readonly storageKey = 'baralho';

  getAllbaralhos(): Carta[] {
    const storedBaralho = localStorage.getItem(this.storageKey);
    return storedBaralho ? JSON.parse(storedBaralho) : [];
  }

  savebaralho(baralho: Carta): void {
    const data = []
    const cartas = this.getAllbaralhos();
   if (cartas.length > 0) {
     cartas.forEach(carta => {
       data.push(carta)
     })
   }
    data.push(baralho)
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  deleteBaralho(id: number): void {
    const baralho = this.getAllbaralhos();
    const updated = baralho.filter(product => product.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }
}
