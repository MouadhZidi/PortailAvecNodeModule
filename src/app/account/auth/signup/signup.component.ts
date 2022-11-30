import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { SignupRequest } from 'src/app/core/models/signup-request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user:SignupRequest=new SignupRequest();

  form: any = {
    adrelectronique: null,
    use_lname: null,
    use_psw:null,
    usepswd:null,



  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthenticationService,
    private tokenStorage: TokenStorage,private route:Router) { }

  ngOnInit() {
  }

  add() {

    this.authService.register2(this.user).subscribe(
      data=>{this.route.navigate(['/account/login'])
      },

      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
      )}






       // localStorage.setItem("us",username);








}
