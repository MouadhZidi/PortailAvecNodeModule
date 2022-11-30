import { Component, OnInit } from '@angular/core';
import { LigbsoinService } from '../services/ligbsoin.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-bsoin',
  templateUrl: './bsoin.component.html',
  styleUrls: ['./bsoin.component.scss']
})
export class BsoinComponent implements OnInit {
  data !: [];
  data1 !: [];
  array : any;
  list:any;
  list1:any=[];
    mat:any
    datesoin:any;
  //idBsoin !: Idbsoin;
  idbesoin:any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers,
    num_soins:6
  }

  ligbult:any=[]
/*
    this.idbesoin.mat_pers=this.token.getUser().matpers
    console.log("teeeeeeeeee"+this.token.getUser().matpers)*/
  
  constructor(private serv : LigbsoinService,private token:TokenStorage) { }

  ngOnInit() {
  
    this.getgouv();
    this.getgouv1();
    
  }


   
  getgouv(){
    this.serv.bultSoinDet(this.idbesoin).subscribe(
      data => {
        this.list =data;
       this.ligbult =this.list.ligBult


       
      },
      err => {
        console.log(err);
      }
      );

    }
    getgouv1(){
      this.serv.bultSoinDet(this.idbesoin).subscribe(
        data1 => {
          this.array =data1;
         //this.ligbult =this.list.ligBult
          console.log("dddd : ",this.token.getUser().matpers);
         
        },
        err => {
          console.log(err);
        }
        );
  
      }

      columnAutorisation = [
        { headerName: "Numéro lig", 
        field: "num_lig", 
        editable: true,
        floatingFilter: true,   
           filter:true,
    
      },
     
        {
         headerName:"Date act",
          field: "dat_soins",
          filter: "agDateColumnFilter",
          sortable:true,
          floatingFilter: true,
          filterParams: {
            // provide comparator function
            comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
              var dateAsString = cellValue;
    
              if (dateAsString == null) {
                return 0;
              }
    
              // In the example application, dates are stored as dd/mm/yyyy
              // We create a Date object for comparison against the filter date
              var dateParts = dateAsString.split("/");
              var year = Number(dateParts[2]);
              var month = Number(dateParts[1]) - 1;
              var day = Number(dateParts[0]);
              var cellDate = new Date(year, month, day);
    
              // Now that both parameters are Date objects, we can compare
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              } else if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
              return 0;
            },
          },
          editable: true,
          cellEditor: "primeCellEditor",
        },
        

      {
        headerName: "Abréviation act",
        field: "abrv_act",
        editable: true,
        floatingFilter: true,
    
        
      },
    
        {
          headerName: "Libelle Act",
          field: "libcact",
          editable: true,
          filter:true,
          floatingFilter: true,
    
        },
    
        {
          headerName: "Nombre vign",
          field: "nbr_vign",
          editable: true,
          floatingFilter: true,
    
          
        },
    
    
        {
          headerName: "Indice",
          field: "indice",
          editable: true,
          floatingFilter: true,
    
          
        },
        {
          headerName: "Libelle bultin",
          field: "libBult",
          editable: true,
          floatingFilter: true,
    
          
        },
        {
          headerName: "Totale remboursement",
          field: "tot_remb_comp",
         // cellRenderer: this.createHyperLink.bind(this),
    
          editable: true,
          floatingFilter: true,
    
          
        },
        {
          headerName: "Libelle org",
          field: "liborg",
         // cellRenderer: this.createHyperLink.bind(this),
    
          editable: true,
          floatingFilter: true,
    
          
        },
        {
          headerName: "Code etablissement",
          field: "cod_etablis",
         // cellRenderer: this.createHyperLink.bind(this),
    
          editable: true,
          floatingFilter: true,
    
          
        },
        {
          headerName: "Observation",
          field: "observ",
         // cellRenderer: this.createHyperLink.bind(this),
    
          editable: true,
          floatingFilter: true,
    
          
        },
      ];
      modules: Module[] = [ClientSideRowModelModule];
      defaultColDef = {
        sortable: true,
        filter: true,
      };
}
