import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { ListCongeComponent } from './list-conge/list-conge.component';
import { SoldeCongeComponent } from './solde-conge/solde-conge.component';


const routes: Routes = [
    {
        path: 'list',
        component: ListCongeComponent,canActivate:[GuardauthService]
    },
    {
        path: 'solde',
        component: SoldeCongeComponent,canActivate:[GuardauthService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CongeRoutingModule {}
