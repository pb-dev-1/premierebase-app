import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

import {Format} from '@resources/format/format.model'

@Component({
  selector: 'pb-format-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  formatForm: FormGroup
  submitted = false

  @Input() public format: Format
  @Output() public submitForm: EventEmitter<any> = new EventEmitter()

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm()
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.format) {
     this.buildForm()
    }
  }

  onSubmit(label: any) {
    this.submitted = true
    if (this.formatForm.valid) {
      const params = { id: this.format?._id, format: label }
      this.submitForm.emit(params)
    }
  }

  buildForm() {
    this.formatForm = this.formBuilder.group({
      label: new FormControl(this.format?.label || '', [Validators.required]),
    })
  }

}
