import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://192.168.2.232:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EspaceChefService {
  constructor(private http: HttpClient) { }
  
  GetListDemande = (codSoc:any,matPers:any,codServ:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getListDemandeChef/"+codSoc+"/"+matPers+"/"+codServ);
  };

  UpdateDemande(data:any):Observable<any>{
    return this.http.put<any>("http://192.168.2.232:8080/demande/updateag",data);
  }
  
  GetListDemandeRepChefNull = (codSoc:any,matPers:any,codServ:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getListDemandeByChef/"+codSoc+"/"+matPers+"/"+codServ);
  };
  GetListDemandeRepChefNotNull = (codSoc:any,matPers:any,codServ:any): Observable<any[]> => {
    return this.http.get<any[]>(AUTH_API + "demande/getListDemandeByChefNotNull/"+codSoc+"/"+matPers+"/"+codServ);
  };

}

