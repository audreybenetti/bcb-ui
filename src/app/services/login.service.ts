import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login.response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080"

  constructor(private httpCliente : HttpClient) { }

  login(email: string, password: string) {
    return this.httpCliente.post<LoginResponse>(this.apiUrl +"/auth/login", {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token),
        sessionStorage.setItem("email", value.email)
        sessionStorage.setItem("name", value.name)
        sessionStorage.setItem("role", value.role)
      }
    ));
  }
}
