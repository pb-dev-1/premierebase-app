import {Component, Input} from '@angular/core'

@Component({
  selector: 'pb-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {
  @Input() public submitted: boolean
  @Input() public field: any

  constructor() { }

}
