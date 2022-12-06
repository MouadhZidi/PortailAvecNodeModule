import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { PointageService } from '../pointage.service';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {

  mat_pers: any;
  nom_pers: any;
  formDocument:FormGroup
  rowData: any[] = [];
  constructor(private serv: PointageService , private tokenService: TokenStorage,private  fb:FormBuilder) { }
 

  ngOnInit() {
    this.formDocument = this.fb.group({
      codeServ:["1F0"],
      matChef:["10326"],
      mat_pers: [""],
      cod_soc: [""],
      nom_prenom:[""],
      
    });
  }

  GetConge() {
    debugger
    this.serv.GetConge(this.formDocument.value).subscribe(
      
      (data: any[]) => {
        this.rowData = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  columnDefs = [




    {
      headerName: "Année congé",
      field: "anne_cng",
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },

    
    {
      headerName: "Code motif",
      field: "code_m",
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },

    {
      headerName: "Libélle congé",
      field: "motif_cng",
      width: 350,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },


    {
      headerName: "Date congé",
      field: "dat_dcng",
      cellRenderer: (data) => {
        return moment(data.createdAt).format('MM/DD/YYYY')
    },
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,
      
      width: 230,

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
      field: "dat_debut",
      cellRenderer: (data) => {
        return moment(data.createdAt).format('MM/DD/YYYY')
    },
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,
      
      width: 230,

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
      field: "dat_fin",
      cellRenderer: (data) => {
        return moment(data.createdAt).format('MM/DD/YYYY')
    },
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,
      
      width: 230,

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
      headerName: "Nbr jour",
      field: "nbr_jours",
      width: 230,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      
      
    },

   
    
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
  };



  modules: Module[] = [ClientSideRowModelModule];

}
