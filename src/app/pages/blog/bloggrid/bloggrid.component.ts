import { Component, OnInit } from '@angular/core';
import { NoteEventService } from '../note-event.service';

@Component({
  selector: 'app-bloggrid',
  templateUrl: './bloggrid.component.html',
  styleUrls: ['./bloggrid.component.scss']
})
export class BloggridComponent implements OnInit {
 // bread crumb items
 breadCrumbItems: Array<{}>;
 list:any=[]
 term:string
 p:any

  constructor(private serv:NoteEventService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Blog' }, { label: 'Blog Grid', active: true }];
    this.getall()

  }
  getall(){  this.serv.getall().subscribe(
    data => {

     this.list=data
    },
    err => {
      console.log(err);
    }
    );






  }

}
