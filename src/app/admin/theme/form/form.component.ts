import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

import {Theme} from '@resources/theme/theme.model'

@Component({
  selector: 'pb-format-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  themeForm: FormGroup
  submitted = false

  @Input() public theme: Theme
  @Output() public submitForm: EventEmitter<any> = new EventEmitter()

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.theme) {
     this.buildForm()
    }
  }

  onSubmit(label: any) {
    this.submitted = true
    if (this.themeForm.valid) {
      const params = { id: this.theme?._id, theme: label }
      this.submitForm.emit(params)
    }
  }

  buildForm() {
    this.themeForm = this.formBuilder.group({
      label: new FormControl(this.theme?.label || '', [Validators.required]),
    })
  }

}
