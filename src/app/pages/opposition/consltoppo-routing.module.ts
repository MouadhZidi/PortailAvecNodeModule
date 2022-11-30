import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsltoppoComponent } from './consltoppo/consltoppo.component';



const routes: Routes = [
    {
        path: 'consltoppo',
        component: ConsltoppoComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsltoppoRoutingModule {

    
}
