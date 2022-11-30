import { Component, OnInit } from "@angular/core";
import { saveAs } from "file-saver";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { DemandeService } from "../demande.service";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import Swal from "sweetalert2";
@Component({
  selector: "app-demande-pret-avance",
  templateUrl: "./demande-pret-avance.component.html",
  styleUrls: ["./demande-pret-avance.component.scss"],
})
export class DemandePretAvanceComponent implements OnInit {
  formPretAvance!: FormGroup;
  Listavance: any[] = [];
  listGroupe: any[] = [];
  listTypePret: any[] = [];
  // breadcrumb items
  breadCrumbItems: Array<{}>;

  image = "";
  file!: File;
  config: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    maxFilesize: 50,
    acceptedFiles: "file/*",
    method: "POST",
    uploadMultiple: false,

    accept: (file) => {
      this.onChange(file);
    },
  };
  constructor(
    public service: DemandeService,
    private formBuilder: FormBuilder,
    private tokenService: TokenStorage
  ) {}

  ngOnInit(): void {
    this.formPretAvance = this.formBuilder.group({
      dateDemande: [
        new Date().toLocaleDateString().substring(0, 10),
        Validators.required,
      ],
      codGrpPret: ["", Validators.required],
      typPret: ["", Validators.required],
      mntDem: ["", Validators.required],
      reponse: [""],
      typDemande: ["P"],

      matPers: [this.tokenService.getUser().matpers],
      codSoc: [this.tokenService.getUser().cod_soc],
    });
    this.getGroupePret();
    this.getListAvance();
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  /**
   * Sort table data
   *
   */
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  DemandePretAvance() {
    const formData = new FormData();
    const article = this.formPretAvance.value;
    console.log("elyes : " + this.file);
    formData.append("file", this.file);
    formData.append("demande", JSON.stringify(article));

    console.log(this.file);
    this.service.upload(formData).subscribe((event: any) => {
      if (event) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Votre demande à été bien enregistrer !',
          showConfirmButton: false,
          timer: 2000
        });
        this.getListAvance();
      } else {
        //  this.toastr.error('Echec ajout', 'Problème de suppression.');
      }
    });
  }
  onSelect1(event1: any) {
    this.service.GetTypePret(event1.target.value).subscribe(
      (data: any[]) => {
        this.listTypePret = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getGroupePret() {
    this.service.GetTitreGroupePret().subscribe(
      (data: any[]) => {
        this.listGroupe = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getListAvance() {
    this.service
      .GetChambreByCode(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers,
        "P"
      )
      .subscribe(
        (data: any[]) => {
          this.Listavance = data;

          console.log(data);
          console.log(data);
          console.log(data);
          console.log(data);
          console.log(data);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  columnAvance = [
    {
      headerName: "Date demande",
      field: "dateDemande",
      filter: "agDateColumnFilter",
      sortable: true,
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
      headerName: "Code groupe prêt",
      field: "group_pret",
      editable: true,
      floatingFilter: true,
      filter: true,
    },

    {
      headerName: "Type prêt",
      field: "lib_pret",
      editable: true,
      filter: true,
      floatingFilter: true,
    },

    {
      headerName: "Montant demandé",
      field: "mntDem",
      editable: true,
      floatingFilter: true,
    },

    {
      headerName: "Réponse",
      field: "reponse",
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: "Réponse chef",
      field: "reponse",
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: "Fichier",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),
      width: 400,
      editable: true,
      floatingFilter: true,
    },
  ];
  createHyperLink(params: any): any {
    console.log(params.data.id_libre_demande);

    if (!params.data) {
      return;
    }
    const spanElement = document.createElement("span");
    spanElement.innerHTML = `<a href="${this.homeUrl}" > ${params.value} </a> `;
    spanElement.addEventListener("click", ($event) => {
      $event.preventDefault();
      // The below code is used to navigate from one page to another page in angular. you can change it          // according to your requirement.
      this.service
        .download(params.data.id_libre_demande)
        .subscribe((blob) => saveAs(blob, params.value));
    });
    return spanElement;
  }
  get homeUrl(): string {
    return "home";
  }
  modules: Module[] = [ClientSideRowModelModule];
}
