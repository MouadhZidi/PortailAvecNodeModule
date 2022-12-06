import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";


const API_URL = environment.urlServerMouadh;
const api = "http://192.168.2.96:8080";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class PointageService {

  host = API_URL;

  private header: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders();
  }



  GetPointageById = (codSoc: any, matPers: any): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      api + "/conge/getpointage/" + codSoc + "/" + matPers
    );
  };

  GetRetardById = (codSoc: any, matPers: any): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      api + "/conge/getretard/" + codSoc + "/" + matPers
    );
  };
  

  GeAutorisationById = (codSoc: any, matPers: any): Observable<any[]> => {
    return this.httpClient.get<any[]>(
      api + "/conge/getauto/" + codSoc + "/" + matPers
    );
  };


  GetConge = (x:any): Observable<any[]> => {
    return this.httpClient.post<any[]>(
     "http://localhost:8080/conge/GetCongeChef", x);
  };



}
