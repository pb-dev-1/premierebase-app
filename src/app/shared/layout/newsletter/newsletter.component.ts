import {animate, style, transition, trigger} from '@angular/animations'
import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

import {NewsletterService} from '@app/resources/newsletter/newsletter.service'

const leaveTransistion = transition(':leave', [
  style({opacity: 1}),
  animate('1s ease-out', style({opacity: 0}))
])
const fadeOut = trigger('fadeOut', [leaveTransistion])

@Component({
  selector: 'pb-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  animations: [fadeOut]
})
export class NewsletterComponent implements OnInit {
  alreadySub = false
  form: FormGroup

  constructor(
    private newsletterService: NewsletterService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('',  [Validators.required, Validators.email])
    })
  }

  subscribe() {
    const values = this.form.getRawValue()
    this.newsletterService.sub(values).subscribe(() => {
      this.alreadySub = true
      setTimeout(() => this.newsletterService.storeAlreadySub(), 5000)
    })
  }

}
