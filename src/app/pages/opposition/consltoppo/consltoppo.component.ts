import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { LigbsoinService } from '../../bsoin/services/ligbsoin.service';
import { PersonnelService } from '../../Employe/personnel.service';
import { OppositionserviceService } from '../services/oppositionservice.service';

@Component({
  selector: 'app-consltoppo',
  templateUrl: './consltoppo.component.html',
  styleUrls: ['./consltoppo.component.scss'],
  
})
export class ConsltoppoComponent implements OnInit {
  [x: string]: any;
  idCessionPers:any={
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers,
    cod_pret: 1

  }
  idLpret:any={
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers,
    cod_pret: 1,
    l_pret:0

  }
  list:any;
  list1:any;

  data !:any;
  listPers:any;
  listlig:any;
  listL:any;
  dataL !:any;
  typ_pret:any[];
  perso11 :any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers,
 
  }
  
    array : any;

  constructor(private serv :OppositionserviceService,public token:TokenStorage, private service:PersonnelService,private serv1 : LigbsoinService ) {

  
   }

  ngOnInit() {

    this.perso11.cod_pret=this.codepret
    this.getpers()


 
 
  // this.getCessionPerso()

 
    this.getgouv1()
  }
   anotherFunction(event: Event ) {
   
    if (event){
    console.log(this.listlig.l_pret)
   
    }

    //throw new Error('Function not implemented.');
  }
  action(code :any){

    if (code){
      console.log(code)
      this.idLpret.l_pret=code
      console.log(this.idLpret.l_pret)

      this.getLpret()
      this.getCessionPerso()
      }


  }
  getCessionPerso(){
    this.serv.fetchCessionPers(this.idCessionPers).subscribe(
      
        data => {
          this.list =data;
       //   this.list1=data;
          this.listlig=this.list.ligCession;

          console.log(" 1 :",this.listlig[0].l_pret); 
          

       
      },
      err => {
        console.log(err);
      }
      );

    }
    

    getLpret(){
      this.serv.fetchgetlpret(this.idLpret).subscribe(
        
          dataL => {
            this.listL =dataL;
  
            console.log(" l pret:",dataL); 
  
         
        },
        err => {
          console.log(err);
        }
        );
  
      }





    getpers(){

      this.service.getpersonnel(this.perso11).subscribe(
        data => {
          this.perso11 = data; console.log('exected' + data);
         this.adrpersbycodeandmat=this.perso11.adresses_personnel
         this.rens=this.perso11.rens_pers
          //console.log("dddddddd"+this.perso11.nom_pers)
        },
        err => {
          console.log(err);
        }
        );}

        
        saveCustomer() {}
    


        
  test(){
    this.idCessionPers.cod_pret=this.codepret
    this.getCessionPerso()
    console.log("test : ",this.idCessionPers.cod_pret);
  } 

  getgouv(){
    this.serv1.bultSoinDet(this.idCessionPers).subscribe(
      data => {
        this.list =data;
       this.ligbult =this.list.ligBult
     //  this.array=this.list.numSoinParam
      // console.log("dddd : ",this.array );


       
      },
      err => {
        console.log(err);
      }
      );
}


getgouv1(){
  this.serv.fetchListCodPret(this.token.getUser().cod_soc,this.token.getUser().matpers).subscribe(
    data1 => {
      this.array =data1;
     //this.ligbult =this.list.ligBult
    // this.array=this.list.numSoinParam

      console.log("dddd : ",this.array );
     
    },
    err => {
      console.log(err);
    }
    );

  }

}