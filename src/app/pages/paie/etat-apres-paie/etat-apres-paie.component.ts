import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GridApi } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { PaieService } from "../paie.service";
import { Module } from "@ag-grid-community/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { ComptepersService } from "../../Employe/comptepers.service";

@Component({
  selector: 'app-etat-apres-paie',
  templateUrl: './etat-apres-paie.component.html',
  styleUrls: ['./etat-apres-paie.component.scss']
})
export class EtatApresPaieComponent implements OnInit {
list:any=[]
  listInfo: any;
  ListTypeBull!: any[];

  api!: GridApi;
  rowData: any[] = [];
  bul: any = [];
  possVH: any;
  nom: any;
  prenom: any;


  dt_bul: any;
  mat_pers: any;
  nom_pers: any;
  cod_serv: any;
  lib_serv: any;
  adm_tech: any;
  lib_adm_tech: any;
  cod_sit: any;
  cod_cat: any;
  cod_grad: any;
  charg_all: any;
  charg_enf: any;
  cod_ech: any;
  nbr_enf: any;
  formDocument!: FormGroup;
  dateBul?: String;
  cod_typ_bul?: String;
  tab: number = 1;
  x: string = "";
  a!: string;

  constructor(
    private serv: PaieService,
    private serv2: ComptepersService,

    private tokenService: TokenStorage,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.GetConge22()
    this.formDocument = this.formBuilder.group({
      dateBul: [""],
      cod_typ_bul: [""],
      mat_pers: [this.tokenService.getUser().matpers, Validators.required],
      cod_soc: [this.tokenService.getUser().cod_soc],
    });

    this.getTypeBull();
  }

  columnDefs = [
    {
      headerName: "Rubrique",
      field: "abrv_fixe",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
      pinned: true,
      checkboxSelection: true,
    },

    {
      headerName: "Libellé bulletin",
      field: "lib_bul",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 700,
      pinned: true,
    },
    {
      headerName: "Nombre",
      field: "nombre",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },

    {
      headerName: "Taux",
      field: "taux",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },

    {
      headerName: "Prime",
      field: "mnt_gain",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },

    {
      headerName: "Retenue",
      field: "mnt_charge",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },

    {
      headerName: "Montant",
      field: "montant",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },
  ];

  getTypeBull() {
    this.serv.GetTypeBull().subscribe(
      (data: any) => {
        this.ListTypeBull = data;

        console.log(this.ListTypeBull);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addHotel() {
    this.serv.GetBull(this.formDocument.value).subscribe(
      (data: any) => {
        this.listInfo = data;
        this.rowData = this.listInfo.possVH;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  GetConge22() {
    this.serv2.getall().subscribe(
      (data: any[]) => {
        this.list = data;

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

  modules: Module[] = [ClientSideRowModelModule];
}
