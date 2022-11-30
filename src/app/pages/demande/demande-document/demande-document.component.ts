import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { DemandeService } from "../demande.service";
import { saveAs } from "file-saver";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import Swal from "sweetalert2";
@Component({
  selector: "app-demande-document",
  templateUrl: "./demande-document.component.html",
  styleUrls: ["./demande-document.component.scss"],
})
export class DemandeDocumentComponent implements OnInit {
  formDocument: FormGroup;
  file!: File;
  ListDocument: any[] = [];
  constructor(
    private demandeService: DemandeService,
    private formBuilder: FormBuilder,
    private tokenService: TokenStorage
  ) {}
  ngOnInit(): void {
    this.formDocument = this.formBuilder.group({
      dateDemande: [
        new Date().toLocaleDateString().substring(0, 10),
        Validators.required,
      ],
      typDemande: ["D"],
      numAttest: ["", Validators.required],
      txtChef: [""],
      reponse: [""],

      matPers: [this.tokenService.getUser().matpers],
      codSoc: [this.tokenService.getUser().cod_soc],
    });
    this.getListDocument();
  }

  DemandeDocument() {
    const formData = new FormData();
    const article = this.formDocument.value;
    console.log("elyes : " + this.file);
    formData.append("file", this.file);
    formData.append("demande", JSON.stringify(article));

    console.log(this.file);
    this.demandeService.upload(formData).subscribe((event: any) => {
      if (event) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Votre demande à été bien enregistrer !',
          showConfirmButton: false,
          timer: 2000
        });
        this.getListDocument();
      } else {
        //  this.toastr.error('Echec ajout', 'Problème de suppression.');
      }
    });
  }
  getListDocument() {
    console.log();
    this.demandeService
      .GetChambreByCode(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers,
        "D"
      )
      .subscribe(
        (data: any[]) => {
          this.ListDocument = data;

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  defaultColDef = {
    sortable: true,
    filter: true,
  };
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
      this.demandeService
        .download(params.data.id_libre_demande)
        .subscribe((blob) => saveAs(blob, params.value));
    });
    return spanElement;
  }
  get homeUrl(): string {
    return "home";
  }
  columnDocument = [
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
      headerName: "Numéro attestation ",
      field: "numAttest",
      editable: true,
      oatingFilter: true,
      filter: true,
    },

    {
      headerName: "Réponse RH",
      field: "reponse",
      editable: true,
      filter: true,
      floatingFilter: true,
    },

    {
      headerName: "Fichier",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),
width:1000,
      editable: true,
      floatingFilter: true,
    },
  ];

  modules: Module[] = [ClientSideRowModelModule];
}
