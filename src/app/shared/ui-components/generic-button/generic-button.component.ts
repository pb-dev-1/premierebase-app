import {Component, Input} from '@angular/core'

export type color = 'primary' | 'secondary'

@Component({
  selector: 'pb-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.scss']
})
export class GenericButtonComponent {
  @Input() public label: string
  @Input() public color: color = 'primary'
  @Input() public disabled: Boolean = false

}
