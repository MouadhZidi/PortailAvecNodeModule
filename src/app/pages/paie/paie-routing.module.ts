import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { DeclarationComponent } from './declaration/declaration.component';
import { EtatApresPaieComponent } from './etat-apres-paie/etat-apres-paie.component';



const routes: Routes = [
    {
        path: 'bulletin-paie',
        component: EtatApresPaieComponent,canActivate:[GuardauthService]
    },
    {
        path: 'declaration',
        component: DeclarationComponent,canActivate:[GuardauthService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaieRoutingModule {}
