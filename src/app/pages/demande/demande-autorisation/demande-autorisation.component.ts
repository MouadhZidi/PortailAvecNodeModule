import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { DemandeService } from '../demande.service';
import { saveAs } from 'file-saver';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-demande-autorisation',
  templateUrl: './demande-autorisation.component.html',
  styleUrls: ['./demande-autorisation.component.scss']
})
export class DemandeAutorisationComponent implements OnInit {

   // breadcrumb items
   formAutorisation!:FormGroup
   ListAutorisation: any[] = [];
   file!: File ; // Variable to store file
   listTypeAutorisation: any[] = [];
 
   constructor(private demandeService:DemandeService,private formBuilder : FormBuilder
     ,private tokenService:TokenStorage) { }
   ngOnInit(): void {
     this.formAutorisation = this.formBuilder.group({
       
       
 
       dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
       heurS : ['',Validators.required],
       heurR:['',Validators.required],
       typDemande: ['A'],
       minR:['',Validators.required],
       minS:['',Validators.required],
       txtDem:['',Validators.required],
       codAut:['',Validators.required],
 
       reponseChef:[''],
       txtChef:[''],
       reponse:[''],
       
 
       matPers:[this.tokenService.getUser().matpers],
       codSoc:[this.tokenService.getUser().cod_soc]
     });
     this.getListAutorisation()
     this.getTypeAutorisation()
   }
   columnAutorisation = [
     
     
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
     
     { headerName: "Heure sortie", 
     field: "heurS", 
     editable: true,
     floatingFilter: true,   
        filter:true,
 
   },
   {
     headerName: "Minute sortie",
     field: "minS",
     editable: true,
     floatingFilter: true,
 
     
   },
 
     {
       headerName: "Heure retour",
       field: "heurR",
       editable: true,
       filter:true,
       floatingFilter: true,
 
     },
 
     {
       headerName: "Minute retour",
       field: "minR",
       editable: true,
       floatingFilter: true,
 
       
     },
 
 
     {
       headerName: "Réponse RH",
       field: "reponse",
       editable: true,
       floatingFilter: true,
 
       
     },
     {
       headerName: "Réponse chef",
       field: "reponseChef",
       editable: true,
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
   onChange(event:any) {
     this.file = event.target.files[0];
 }
 defaultColDef = {
   sortable: true,
   filter: true,
 };
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
 getTypeAutorisation() {
   this.demandeService.GetTypeAutorisation().subscribe(
     (data: any[]) => {
       this.listTypeAutorisation = data;
 
       console.log(data);
     },
     (error) => {
       console.log(error);
     }
   );
 }
 DemandeAutorisation() {
   const formData = new  FormData();
   const article = this.formAutorisation.value;
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
            title: 'Votre demande à été bien enregistrer',
            showConfirmButton: false,
            timer: 2000
          });
           this.getListAutorisation()
         } else {
         //  this.toastr.error('Echec ajout', 'Problème de suppression.');
         }
          
           
       }
   );
 }
 getListAutorisation() {
 
 
   this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"A").subscribe(
     (data: any[]) => {
       this.ListAutorisation = data;
 
       console.log(data);
     },
     (error) => {
       console.log(error);
     }
   );
 }
 modules: Module[] = [ClientSideRowModelModule];

}
