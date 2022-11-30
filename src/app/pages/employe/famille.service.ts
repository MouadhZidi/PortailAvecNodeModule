import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const api=environment.urlServerhichem
@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  constructor(private http: HttpClient) { }
  getconjoint= (x:any,y:any): Observable<any[]> =>{

return this.http.get<any[]>(api+"/famille/getconjoint/"+x+"/"+y);


  }
  getEnfant= (x:any,y:any): Observable<any[]> =>{

    return this.http.get<any[]>(api+"/famille/getenfant/"+x+"/"+y);


      }
}

