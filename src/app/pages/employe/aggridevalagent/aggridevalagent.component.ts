import { Component, OnInit } from '@angular/core';
import { GridApi } from "ag-grid-community";
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { ObjempService } from '../objemp.service';

@Component({
  selector: 'app-aggridevalagent',
  templateUrl: './aggridevalagent.component.html',
  styleUrls: ['./aggridevalagent.component.scss']
})
export class AggridevalagentComponent implements OnInit {

  gouv:any
  title = "grid";
  api!: GridApi;
  rowData: any[] = [];
  codsoc:any
  prs:any=[]
  perso11 :any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers
  };


  constructor(private serv: ObjempService, private token: TokenStorage) {



  }
  columnDefs = [



    {
      headerName: "Année",
      field: "annee",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
    {
      headerName: "Numero objectif",
      field: "num_objectif",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
    {
      headerName: "Libllé objectif",
      field: "lib_objectif",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
    {
      headerName: "Appreciation",
      field: "app",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
    {
      headerName: "Comment. Recom.",
      field: "comment_recom",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },


  ];


  ngOnInit() {

    this.getFacture();
  }
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getFacture() {
    this.serv.getobj(this.token.getUser().cod_soc,this.token.getUser().matpers).subscribe(
      (data: any[]) => {
        this.rowData=data



        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }




  modules: Module[] = [ClientSideRowModelModule];
}
