import {Component, OnDestroy} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

import {User} from '@resources/user/user.model'
import {AuthService} from '@resources/auth/auth.service'

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy {
  signupForm: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  onSubmit(user: Partial<User>) {
    this.submitted = true
    if (this.signupForm.valid) {
      this.auth.signup(user).subscribe(resp => {
        console.log(resp)
      })
    }
  }

  ngOnDestroy(): void {
    this.submitted = false
    this.signupForm.reset()
  }
}
