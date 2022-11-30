import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
 import { UIModule } from '../../shared/ui/ui.module';

import { AgGridModule } from '@ag-grid-community/angular';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PointageComponent } from './pointage/pointage.component';
import { PointageRoutingModule } from './pointage-routing.module';
import { RetardComponent } from './retard/retard/retard.component';
import { AutorisationComponent } from './autorisation/autorisation/autorisation.component';


@NgModule({
  declarations: [
   PointageComponent,
   RetardComponent,
   AutorisationComponent
  ],
  imports: [
    CommonModule,
PointageRoutingModule,
    UIModule,
    NgbTooltipModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PointageModule { }
