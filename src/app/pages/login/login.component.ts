import {Component, OnDestroy} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'

import {AuthService} from '@resources/auth/auth.service'
import {Credentials} from '@resources/auth/auth.model'

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  onSubmit(credentials: Credentials) {
    this.submitted = true
    if (this.loginForm.valid) {
      this.auth.login(credentials)
        .subscribe(() => this.router.navigate(['/']))
    }
  }

  ngOnDestroy(): void {
    this.submitted = false
    this.loginForm.reset()
  }

}
