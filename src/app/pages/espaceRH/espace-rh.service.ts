import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://192.168.2.232:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
@Injectable({
  providedIn: 'root'
})
export class EspaceRhService {

  constructor(private http: HttpClient) { }


  GetListDemande = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getDemandes");
  };

  GetListDemandeByrepRh = (): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getDemandesRepRh");
  };
  UpdateDemande(data:any):Observable<any>{
    return this.http.put<any>("http://192.168.2.232:8080/demande/updateRh",data);
  }
  
}
