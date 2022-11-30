import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'



@Injectable({
  providedIn: 'root'
})
export class LigbsoinService {
  id!: any;
  constructor(private http: HttpClient) {

   // this.id=new Idbsoin("01","07766",10,"15/12/2012");
  
   }


  
  fetchCession(){

    return this.http.get('http://192.168.2.232:8080/api/auth/getligB/')
  
    
   }
  
   fetchCessionBultsoin(){

    return this.http.get('http://192.168.2.232:8080/api/auth/getM/')
  
    
   }
   bultSoinDet(s:any){

    return this.http.post<any[]>('http://192.168.2.232:8080/bultSoin/bsoindet',s);

   }
   
}
