import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

import {Illustration} from '../illustration/illustration.model'
import {BasketItem} from './basket.model'

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  products$: BehaviorSubject<BasketItem[]> = new BehaviorSubject(undefined)

  constructor() {
    this.products$.next(JSON.parse(localStorage.getItem('products')) || [])
  }

  addProduct(product: Illustration, selectedFormat: any, selectedQuantity: number) {
    const alreadyStoredItems = this.products$.getValue()
    const format = product.formats.filter(format => format.format === selectedFormat)[0]
    let item = alreadyStoredItems.find(i => i._id === product._id && i.format.format._id === format.format)

    item = !item
    ? {
        _id: product._id,
        label: product.label,
        format: format,
        image: product.images.packShot,
        quantity: selectedQuantity,
      }
    : {
      ...item,
      quantity: item.quantity + selectedQuantity,
    }
     
    const items = [
      ...alreadyStoredItems.filter(i => (i._id === item._id && i.format.format !== format.format) || i._id !== item._id),
      item
    ]

    this.products$.next(items)
    localStorage.setItem('products', JSON.stringify(items))
  }

  updateProducts(products: BasketItem[]) {
    this.products$.next(products)
    localStorage.setItem('products', JSON.stringify(products))
  }

  removeProduct(product: BasketItem) {
    const filteredProducts = this.products$.getValue().filter(i => {
      return (i._id === product._id && i.format.format !== product.format.format) || i._id !== product._id
    })
    this.products$.next(filteredProducts)
    localStorage.setItem('products', JSON.stringify(filteredProducts))
  }

}
