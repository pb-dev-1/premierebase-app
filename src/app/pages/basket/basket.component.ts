import {Component} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

import {BasketItem} from '@app/resources/basket/basket.model'
import {BasketService} from '@app/resources/basket/basket.service'
import {environment} from '@env/environment'

@Component({
  selector: 'pb-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  displayedColumns: string[] = ['packshot', 'label', 'format', 'quantity', 'actions', 'total']
  savedProducts$: BehaviorSubject<BasketItem[]> = this.basketService.products$
  env = environment
  code = undefined

  constructor(private basketService: BasketService) { }

  get total() {
    let t = 0
    const savedProducts = this.savedProducts$.getValue()
    if (!savedProducts?.length) return 0
    savedProducts.forEach(product => t += product.format.price[0] * product.quantity)
    return t
  }

  onChangeQuantity(quantity: number, productId: string) {
    const savedProducts = this.savedProducts$.getValue()
    savedProducts.forEach(product => {
      if (product._id === productId) {
        product.quantity = quantity
      } 
    })
    this.basketService.updateProducts(savedProducts)
  }

  removeFromBasket(item: BasketItem) {
    this.basketService.removeProduct(item)
  }

}
