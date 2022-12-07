import { Component, OnInit } from '@angular/core';
import { GridApi } from "ag-grid-community";
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CompreelService } from '../compreel.service';
import { TokenStorage } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-aggridcomprequise',
  templateUrl: './aggridcomprequise.component.html',
  styleUrls: ['./aggridcomprequise.component.scss']
})
export class AggridcomprequiseComponent implements OnInit {

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


  constructor(private serv: CompreelService, private token: TokenStorage) {



  }
  columnDefs = [



    {
      headerName: "Poste",
      field: "lib_POST",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Libellé Compétence",
      field: "lib_COMP",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Niveau",
      field: "lib_NIV_COMP",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Pourcentage",
      field: "pourcentage",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
    {
      headerName: "Coéf. Pond",
      field: "coef_pond",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
   

  ];


  ngOnInit() {

    this.getcompetancrequise();
  }
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getcompetancrequise() {
    this.serv.getcomprequise(this.token.getUser().matpers).subscribe(
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
