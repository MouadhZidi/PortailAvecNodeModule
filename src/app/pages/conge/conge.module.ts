import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
 import { UIModule } from '../../shared/ui/ui.module';
import { CongeRoutingModule } from './conge-routing.module';
import { ListCongeComponent } from './list-conge/list-conge.component';
import { SoldeCongeComponent } from './solde-conge/solde-conge.component';
import { AgGridModule } from '@ag-grid-community/angular';

@NgModule({
  declarations: [ListCongeComponent,SoldeCongeComponent],
  imports: [
    CommonModule,
  CongeRoutingModule,
    UIModule,
    NgbTooltipModule,
    AgGridModule
  ]
})
export class CongeModule { }
