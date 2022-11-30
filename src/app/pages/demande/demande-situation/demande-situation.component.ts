import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../demande.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { saveAs } from 'file-saver';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-demande-situation',
  templateUrl: './demande-situation.component.html',
  styleUrls: ['./demande-situation.component.scss']
})
export class DemandeSituationComponent implements OnInit {

  dataForm:FormGroup
  rowData:any[]=[]
  file!:File
  constructor(private demandeService:DemandeService,private formBuilder : FormBuilder
    ,private tokenService:TokenStorage) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      id_libre_demande : [''],
      

      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      txtDem: ['',Validators.required],
      reponse:[''],
      typDemande:['S'],
      matPers:[this.tokenService.getUser().matpers],
      codSoc:[this.tokenService.getUser().cod_soc]
    });
    this.getListSituation()
  }

  columnDefs = [
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
    { headerName: "Objet", 
    field: "txtDem", 
    editable: true,
    floatingFilter: true,   
       filter:true,
       width:400,

  },
    { headerName: "Observation Rh", 
    field: "txtReponse", 
    editable: true,
    width:400,
    floatingFilter: true,   
       filter:true,

  },


    {
      headerName: "Réponse RH",
      field: "reponse",
      editable: true,
      filter:true,
      floatingFilter: true,

    },
    
    {
      headerName: "Fichier",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),
width:400,
      editable: true,
      floatingFilter: true,

      
    },
   

  ];
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
  onUpload() {
    const formData = new  FormData();
    const article = this.dataForm.value;
    console.log("elyes : "+this.file)
    formData.append('file',this.file);
    formData.append('demande',JSON.stringify(article));
  
  
    console.log(this.file);
    debugger
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
            this.getListSituation()
          } else {
           // this.toastr.error('Echec ajout', 'Problème de suppression.');
          }
  
                // Short link via api response
  
               // Flag variable 
                // let file = new Blob([event], { type: 'text/plain' });            
                // var fileURL = URL.createObjectURL(file);
                // window.open(fileURL);
            
        }
    );
  }
  getListSituation() {
    this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,
    this.tokenService.getUser().matpers,"S").subscribe(
      (data: any[]) => {
        this.rowData = data;
  
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onChange(event:any) {
    this.file = event.target.files[0];
}
  modules: Module[] = [ClientSideRowModelModule];


}
