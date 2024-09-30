import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensagem } from '../model/mensagem';

@Injectable({
    providedIn: 'root'
})
export class MensagemService { 
    private apiUrl = 'http://localhost:8080/mensagens';

    constructor(private http: HttpClient) {}

    enviarMensagem(mensagemRequest: Mensagem): Observable<HttpResponse<any>> {
      const token = sessionStorage.getItem('auth-token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    
      return this.http.post<any>(this.apiUrl, mensagemRequest, { headers, observe: 'response' });
    }
    
}
