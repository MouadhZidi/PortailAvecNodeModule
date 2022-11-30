import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const api=environment.urlServerhichem

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private http: HttpClient) { }
  getbycodesocandmatpers(x:any,y:any){
    return this.http.get(api+"/pers/getbycodesocandmatpers/"+x+"/"+y)
  }
  getetatpaie(x:any,y:any){
    return this.http.get(api+"/pers/get1/"+x+"/"+y)


  }
  getnat(x:any,y:any){
    return this.http.get(api+"/pers/get2/"+x+"/"+y)
  }
  getaffect(x:any,y:any){
    return this.http.get(api+"/pers/get3/"+x+"/"+y)
  }
  getpersonnel=(x:any): Observable<any[]> =>{
  return this.http.post<any[]> (api+"/infoPers/getPers",x)

}
getfamsoc=(x:any,y:any): Observable<any[]> =>{
  return this.http.get<any[]> (api+"/scofam/getscol/"+x+"/"+y)

}}
