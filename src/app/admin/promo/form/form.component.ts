import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

import {Promo} from '@resources/promo/promo.model'

@Component({
  selector: 'pb-promo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  promoForm: FormGroup
  submitted = false

  @Input() public promo: Promo
  @Output() public submitForm: EventEmitter<any> = new EventEmitter()

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.promo) {
     this.buildForm()
    }
  }

  onSubmit(promo: Promo) {
    this.submitted = true
    if (this.promoForm.valid) {
      const params = { id: this.promo?._id, promo }
      this.submitForm.emit(params)
    }
  }

  buildForm() {
    this.promoForm = this.formBuilder.group({
      code: new FormControl(this.promo?.code || '', [Validators.required]),
      discount: new FormControl(this.promo?.discount || '', [Validators.required]),
      startDate: new FormControl(this.promo?.startDate || '', [Validators.required]),
      endDate: new FormControl(this.promo?.endDate || '', [Validators.required]),
    })
  }

}
