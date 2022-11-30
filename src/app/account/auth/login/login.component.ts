import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  errr:string
  form: any = {
    matpers: null,
    usepswd: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private route: Router,
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { matpers, usepswd } = this.form;

    this.authService.login(matpers, usepswd).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        // localStorage.setItem("us",username);
        this.route.navigate(["/dashboard"])
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        if(data){
        }
        else{

        }
if (data){       
   Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Bienvenu à notre portail RH',
  showConfirmButton: false,
  timer: 3000
});
} 




       /* this.toast.success({
          detail: ' Success Message',
          summary: data.message,
          duration: 5000,
        });*/
      },
      (err) => {
       this.errr="Veuillez vérifier votre matricule ou mot de passe"
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}

/* */
