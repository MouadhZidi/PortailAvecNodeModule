import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import { Module } from "@ag-grid-community/core";
import { PointageService } from '../pointage.service';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import * as moment from 'moment';


@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.scss']
})
export class PointageComponent implements OnInit {

 
  rowData: any[] = [];
  constructor(private serv: PointageService , private tokenService: TokenStorage) { }

  ngOnInit() {
    this.GetPointageById();
  }

  GetPointageById() {
    this.serv.GetPointageById(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers).subscribe(
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
      headerName: "Date pointage",
      field: "id.date_point",
      cellRenderer: (data) => {
        return moment(data.createdAt).format('MM/DD/YYYY')
    },
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,
      
      width: 150,

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
      headerName: "Numéro pointage",
      field: "num_point",
      width: 170,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },


    {
      headerName: "Heure pointage",
      field: "id.h_point",
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      
      
    },

    {
      headerName: "Minute pointage",
      field: "id.min_point",
      width: 160,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },

    {
      headerName: "Type pointeuse",
      field: "typ_point",
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    
      
    },

    
    {
      headerName: "Numéro carte",
      field: "n_carte",
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      
      
    },
    
    {
      headerName: "Numéro pointage",
      field: "num_point",
      width: 170,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },


    {
      headerName: "Type régime",
      field: "typ_reg",
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
  
      
    },

    {
      headerName: "C. régime",
      field: "cod_reg",
      width: 120,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
   
      
    },
    {
      headerName: "H. régime",
      field: "h_reg",
      width: 120,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      
      
    },

    {
      headerName: "M. régime",
      field: "m_reg",
      width: 120,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },

    {
      headerName: "Code motif",
      field: "cod_m",
      width: 120,
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
