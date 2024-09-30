import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://api.exemplo.com/clientes'; // URL da sua API

  constructor(private http: HttpClient) {}

  getClientById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
