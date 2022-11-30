import { NgModule ,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbNavModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { UIModule } from '../../shared/ui/ui.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogRoutingModule } from './blog-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BloglistComponent } from '../blog/bloglist/bloglist.component';
import { BloggridComponent } from '../blog/bloggrid/bloggrid.component';
import { DetailComponent } from '../blog/detail/detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddEventComponent } from './add-event/add-event.component';
import { EventUpdateComponent } from './evenet-update/event-update/event-update.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
    declarations: [BloglistComponent, BloggridComponent, DetailComponent, AddEventComponent, EventUpdateComponent, CalendarComponent],
    imports: [
        FormsModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        CommonModule,
        BlogRoutingModule,
        NgbNavModule,
        NgbTooltipModule,
        UIModule,
        Ng2SearchPipeModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
})

export class BlogModule { }
