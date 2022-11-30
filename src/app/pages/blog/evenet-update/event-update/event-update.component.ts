import { Component, OnInit } from "@angular/core";
import { NoteEventService } from "../../note-event.service";

@Component({
  selector: "app-event-update",
  templateUrl: "./event-update.component.html",
  styleUrls: ["./event-update.component.scss"],
})
export class EventUpdateComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  list: any = [];
  term: string;
  p: any;

  constructor(private serv: NoteEventService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Blog" },
      { label: "Blog Grid", active: true },
    ];
    this.getbyD();
  }
  getbyD() {
    this.serv.getbyD().subscribe(
      (data) => {
        this.list = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
