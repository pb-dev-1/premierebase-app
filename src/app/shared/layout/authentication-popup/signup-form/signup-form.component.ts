import {Component, OnDestroy} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'

import {AuthService} from '@app/resources/auth/auth.service'
import {User} from '@app/resources/user/user.model'

@Component({
  selector: 'pb-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnDestroy {
  signupForm: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      consent: new FormControl(false, [Validators.requiredTrue]),
      emailing: new FormControl(false, []),
    })
  }

  onSubmit(user: Partial<User>) {
    this.submitted = true
    if (this.signupForm.valid) {
      this.auth.signup(user).subscribe(() => this.router.navigate(['/']))
    }
  }

  ngOnDestroy(): void {
    this.submitted = false
    this.signupForm.reset()
  }
}
