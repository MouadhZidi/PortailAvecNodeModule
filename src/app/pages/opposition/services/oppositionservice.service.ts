import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
const AUTH_API = 'http://192.168.2.93:8080';

@Injectable({
  providedIn: 'root'
})
export class OppositionserviceService {

  constructor(private http: HttpClient,public token:TokenStorage) { 



  }

  
  fetchCessionPers(params :any){

    return this.http.post<any[]>(AUTH_API + '/api/auth/cessionPersLigPret',params)
  
    
   }

   fetchListCodPret(codSoc : any ,matPers:any){

    return this.http.get<any[]>('http://192.168.2.93:8080' + '/api/auth/getlistpretpers/'+codSoc+"/"+matPers)
   }

    fetchgetlpret(params :any){

      return this.http.post<any[]>(AUTH_API + '/api/auth/getlpret',params)
    
      
     }
    
   
   




}
