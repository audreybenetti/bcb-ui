import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login.response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  apiUrl: string = "http://localhost:8080"

  constructor(private httpCliente : HttpClient) { }

  sign(name: string, email: string, password: string) {
    return this.httpCliente.post<LoginResponse>(this.apiUrl +"/auth/register", 
      { name, email,  role: "user", password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token),
        sessionStorage.setItem("email", value.email)
        sessionStorage.setItem("role", value.role)
      }
    ));
  }
}
