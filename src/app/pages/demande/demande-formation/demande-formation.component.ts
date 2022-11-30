import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';

import { DemandeService } from '../demande.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-demande-formation',
  templateUrl: './demande-formation.component.html',
  styleUrls: ['./demande-formation.component.scss']
})
export class DemandeFormationComponent implements OnInit {
 // breadcrumb items
 formFormation!:FormGroup
 file!:File
 listFormation:any[]=[]
 titreFormation:any[]=[]
 typeFormation:any[]=[]
 themeFormations:any[]=[]
   constructor(private demandeService:DemandeService,private formBuilder : FormBuilder
     ,private tokenService:TokenStorage) { }
   ngOnInit(): void {
     this.formFormation = this.formBuilder.group({
       dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
       annee : ['',Validators.required],
       codTheme:['',Validators.required],
       typDemande: ['F'],
       codTit:['',Validators.required],
 
       codTyp:['',Validators.required],
       datDebut:['',Validators.required],
       datFin:['',Validators.required],
       reponseChef:[''],
       txtChef:[''],
       reponse:[''],
 
       matPers:[this.tokenService.getUser().matpers],
 codSoc:[this.tokenService.getUser().cod_soc]
     });
     this.getTitreFormation()
     this.getListFormation()
   }
   columnFormaton = [
     {
      headerName:"Date demande",
       field: "dateDemande",
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
     { headerName: "Code titre", 
     field: "titre", 
     editable: true,
     width:250,
     floatingFilter: true,   
        filter:true,
 
   },
 
     {
       headerName: "Type formation",
       field: "type_formation",
       editable: true,
       filter:true,
       width:250,
       floatingFilter: true,
 
     },
     {
       headerName: "Code théme",
       field: "theme",
       editable: true,
       filter:true,
       width:320,
       floatingFilter: true,
 
     },
     {
       headerName: "Date début",
       field: "datDebut",
       editable: true,
       filter:true,
       floatingFilter: true,
 
     },
     {
       headerName: "Date fin",
       field: "datFin",
       editable: true,
       filter:true,
       floatingFilter: true,
 
     },
     {
      headerName: "Reponse chef",
      field: "reponseChef",
      editable: true,
      filter:true,
      floatingFilter: true,

    },
     
     {
       headerName: "Fichier",
       field: "fileName",
       cellRenderer: this.createHyperLink.bind(this),
 
       editable: true,
       floatingFilter: true,
 
       
     },
   ];
   onSelect(event:any){
  
     this.demandeService.GetTypeFormation(event.target.value).subscribe(
       (data: any[]) => {
         this.typeFormation = data;
   
         console.log(data);
       },
       (error) => {
         console.log(error);
       }
     );
     this.demandeService.GetThemeFormation(event.target.value,"0104").subscribe(
       (data: any[]) => {
         this.themeFormations = data;
   
         console.log(data);
       },
       (error) => {
         console.log(error);
       }
     );
   }
   
   defaultColDef = {
     sortable: true,
     filter: true,
   };
   onChange(event:any) {
     this.file = event.target.files[0];
 }
   createHyperLink(params:any): any {
     console.log(params.data.id_libre_demande)
   
   
   
     if (!params.data) { return; }
     const spanElement = document.createElement('span');
     spanElement.innerHTML = `<a href="${this.homeUrl}" > ${params.value} </a> `;
     spanElement.addEventListener('click', ($event) => {
       $event.preventDefault();
       // The below code is used to navigate from one page to another page in angular. you can change it          // according to your requirement.
       this.demandeService.download(params.data.id_libre_demande)
         .subscribe(blob => saveAs(blob, params.value));
     });
     return spanElement;
   }
   get homeUrl(): string {
     return 'home';
   }
   DemandeFormation() {
     const formData = new  FormData();
     const article = this.formFormation.value;
     console.log("elyes : "+this.file)
     formData.append('file',this.file);
     formData.append('demande',JSON.stringify(article));
   
   
     console.log(this.file);
   this.demandeService.upload(formData).subscribe(
         (event: any) => {
           if (event) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Votre demande à été bien enregistrer !',
              showConfirmButton: false,
              timer: 2000
            });
             this.getListFormation()
           } else {
            // this.toastr.error('Echec ajout', 'Problème de suppression.');
           }
             
         }
     );
   }
   getTitreFormation() {
     this.demandeService.GetTitreFormation().subscribe(
       (data: any[]) => {
         this.titreFormation = data;
   
         console.log(data);
       },
       (error) => {
         console.log(error);
       }
     );
   }
   getListFormation() {
     this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"F").subscribe(
       (data: any[]) => {
         this.listFormation = data;
   
         console.log(data);
       },
       (error) => {
         console.log(error);
       }
     );
   }
   modules: Module[] = [ClientSideRowModelModule];
 

}
