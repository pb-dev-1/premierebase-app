import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

import {Category} from '@resources/category/category.model'

@Component({
  selector: 'pb-category-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  categoryForm: FormGroup
  submitted = false

  @Input() category: Category
  @Output() submitForm: EventEmitter<any> = new EventEmitter()

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.category) {
     this.buildForm()
    }
  }

  onSubmit(label) {
    this.submitted = true
    if (this.categoryForm.valid) {
      const params = { id: this.category?._id, category: label }
      this.submitForm.emit(params)
    }
  }

  buildForm() {
    this.categoryForm = this.formBuilder.group({
      label: new FormControl(this.category?.label || '', [Validators.required]),
    })
  }

}
