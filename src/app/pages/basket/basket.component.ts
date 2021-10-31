import {Component} from '@angular/core'

import {BasketService} from '@app/resources/basket/basket.service'
import {environment} from '@env/environment'
@Component({
  selector: 'pb-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  displayedColumns: string[] = ['packshot', 'label', 'price', 'quantity', 'total', 'actions']
  env = environment
  savedProducts$ = this.basketService.products$
  total = 0

  constructor(private basketService: BasketService) { }

  removeFromBasket(item) {
    this.basketService.removeProduct(item)
  }

}
