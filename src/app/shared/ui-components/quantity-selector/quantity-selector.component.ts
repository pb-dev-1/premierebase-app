import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'pb-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss']
})
export class QuantitySelectorComponent {
  @Input() quantity: number = 1
  @Input() maxQuantity: number = 10
  @Input() inline: Boolean = false
  @Input() size: string = 'md'

  @Output() changeQuantity: EventEmitter<number> = new EventEmitter()

  constructor() { }

  increase() {
    this.changeQuantity.emit(this.quantity += 1)
  }

  decrease() {
    this.changeQuantity.emit(this.quantity -= 1)
  }

}
