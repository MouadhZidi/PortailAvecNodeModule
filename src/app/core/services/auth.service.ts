import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../models/auth.models';
const AUTH_API = 'http://192.168.2.232/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })

export class AuthenticationService {


  constructor(private http: HttpClient) { }

  login(matpers: string, usepswd: string): Observable<any> {
    return this.http.post("http://192.168.2.232:8080/api/auth/signin", {
      matpers,
      usepswd
    }, httpOptions);
  }
  //'api/auth/signupt'

  register(username: string, email: string, password: string,matricule:string,nom:string,prenom:string): Observable<any> {
    return this.http.post(AUTH_API + 'signuptt33', {
      username,
      email,
      password,
      matricule,
      nom,
      prenom

    }, httpOptions);
  }
  register2(user:any){
    return this.http.post("http://192.168.2.232:8080/api/auth/signupt",user)

  }




  logout() {
    localStorage.clear();
  }





}

