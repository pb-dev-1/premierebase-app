import {Component} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

import {BasketItem} from '@app/resources/basket/basket.model'
import {BasketService} from '@app/resources/basket/basket.service'
import {environment} from '@env/environment'
import {PromoService} from '@app/resources/promo/promo.service'

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
  discount = undefined

  constructor(
    private basketService: BasketService,
    private promoService: PromoService,
  ) { }

  get totalHT() {
    let t = 0
    const savedProducts = this.savedProducts$.getValue()
    if (!savedProducts?.length) return 0
    savedProducts.forEach(product => t += product.format.price * product.quantity)
    return t
  }

  get totalHTWithDiscount() {
    if (this.discount) {
      return this.totalHT - (this.totalHT * this.discount / 100)
    }

    return this.totalHT
  }

  get delivery() {
    return 5
  }

  get total() {
    let t = this.totalHTWithDiscount
    if (t < 200) {
      t += this.delivery
    }
    return t
  }

  onChangeQuantity(quantity: number, product: BasketItem) {
    const savedProducts = this.savedProducts$.getValue()
    savedProducts.forEach(p => {
      if (p._id === product._id && p.format === product.format) {
        p.quantity = quantity
      } 
    })
    this.basketService.updateProducts(savedProducts)
  }

  checkPromoCode() {
    this.promoService.checkPromo(this.code).subscribe(promo => {
      this.discount = promo.discount
      this.code = undefined
    })
  }

  removeFromBasket(item: BasketItem) {
    this.basketService.removeProduct(item)
  }

}
