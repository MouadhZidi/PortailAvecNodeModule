import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { DemandeService } from '../demande.service';
import { saveAs } from 'file-saver';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.scss']
})
export class DemandeCongeComponent implements OnInit {

  ListConge:any[]=[]
  file!:File
  formConge:FormGroup
  listMotifCng:any[]=[]
  // breadcrumb items
  breadCrumbItems: Array<{}>;
  constructor(private demandeService:DemandeService,private formBuilder : FormBuilder
    ,private tokenService:TokenStorage) { }
  ngOnInit(): void {
    this.formConge = this.formBuilder.group({

      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      datDebut:['',Validators.required],
      datFin:['',Validators.required],
      typDemande: ['C'],
      cngTemps:['',Validators.required],
      cngTempsDebut:['',Validators.required],
      cngTempsFin:['',Validators.required],
      codM:['',Validators.required],
      reponseChef:[''],
      txtChef:[''],
      reponse:[''],
      matPers:[this.tokenService.getUser().matpers],
      codSoc:[this.tokenService.getUser().cod_soc]
    });
    this.getListConge()
    this.getMotifCng()
  }
  columnConge= [
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
    { 
      headerName: "Date début",
      field: "datDebut",
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
    headerName: "Date fin",
    field: "datFin",
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
      headerName: "Motif",
      field: "motif",
      editable: true,
      filter:true,
      floatingFilter: true,

    },

   


    {
      headerName: "Réponse RH",
      field: "reponse",
      editable: true,
      floatingFilter: true,

      
    },
    {
      headerName: "Réponse Chef",
      field: "reponseChef",
      editable: true,
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
DemandeConge() {
  const formData = new  FormData();
  const article = this.formConge.value;
  console.log("elyes : "+this.file)
  formData.append('file',this.file);
  formData.append('demande',JSON.stringify(article));


  console.log(this.file);
this.demandeService.upload(formData).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {
            if (event) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Votre demande à été bien enregistrer !',
                showConfirmButton: false,
                timer: 2000
              });
              this.getListConge()          
              }
               else {
             // this.toastr.error('Echec ajout', 'Problème de suppression.');
            }
              // Short link via api response

          
      }
    }
  );
}
getListConge() {


  this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"C").subscribe(
    (data: any[]) => {
      this.ListConge = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
getMotifCng() {
  this.demandeService.GetMotifCng().subscribe(
    (data: any[]) => {
      this.listMotifCng = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
modules: Module[] = [ClientSideRowModelModule];


}
