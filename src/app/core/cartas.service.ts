import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private http: HttpClient) { }
  urlApi = "https://api.pokemontcg.io/v2/";
  pageSize = 18;
  // GET
  getAll(): Observable<any>{
    return this.http.get<any>(`${this.urlApi}cards?pageSize=${this.pageSize}&page=1`);
  }
  getCardByName(name: string): Observable<any>{
    return this.http.get<any>(`https://api.pokemontcg.io/v2/cards?q=name:${name}`);
  }
  getCardByPage(page: any): Observable<any>{
    return this.http.get<any>(`${this.urlApi}cards?pageSize=${this.pageSize}&page=${page}`);
  }

  getCard(id: string): Observable<any> {
    return this.http.get(`${this.urlApi}/cards/${id}`);
  }

}
