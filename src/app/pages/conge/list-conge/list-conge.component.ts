import { Component, OnInit } from "@angular/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { CongeService } from "../conge.service";
import { GridApi } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { reduce } from "rxjs/operators";

@Component({
  selector: "app-list-conge",
  templateUrl: "./list-conge.component.html",
  styleUrls: ["./list-conge.component.scss"],
})
export class ListCongeComponent implements OnInit {
  nom: any;
  prenom: any;
  ListTypeBull: any[] = [];
  rowData: any[] = [];
  api!: GridApi;

  constructor(private serv: CongeService, private tokenService: TokenStorage) {}

  ngOnInit() {
    this.getnom();
    this.getprenom();
    this.GetCongeById();
  }
  getnom() {
    this.serv
      .getNom(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers
      )
      .subscribe(
        (data: any) => {
          this.nom = data;

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getprenom() {
    this.serv
      .getPrenom(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers
      )
      .subscribe(
        (data: any) => {
          this.prenom = data;

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  columnDefs = [
    {
      headerName: "Cumule congé",
      field: "cum_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 300,
      pinned: true,
      checkboxSelection: true,
    },

    {
      headerName: "Conge pris",
      field: "pris_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 300,
      pinned: true,
     
    },

    {
      headerName: "Solde congé",
      field: "sold_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 300,
      pinned: true,
     
    },

    {
      headerName: "Année congé",
      field: "id.annee_cng",
      width: 300,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      pinned: true,
      
    },

    {
      headerName: "Congé injustifier",
      field: "cng_njustif",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 350,
      pinned: true,
      
    },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    minWidth:10,
  };
  /* getFacture() {
    this.factureService.GetChambreByCode().subscribe(
      (data: any[]) => {
        this.rowData = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
 */
  GetCongeById() {
    this.serv
      .GetCongeById(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers
      )
      .subscribe(
        (data: any[]) => {
          this.rowData = data;

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public onQuickFilterChanged($event: any) {
    this.api.setQuickFilter($event.target.value);
  }

  modules: Module[] = [ClientSideRowModelModule];
}
