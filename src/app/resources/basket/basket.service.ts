import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  products$: BehaviorSubject<any[]> = new BehaviorSubject(undefined)

  constructor() {
    this.products$.next(JSON.parse(localStorage.getItem('products')) || [])
  }

  addProduct(product, selectedFormat, selectedQuantity) {
    const alreadyStoredItems = this.products$.getValue()
    const format = product.formats.filter(format => format.format._id === selectedFormat)[0]
    let item = alreadyStoredItems.find(i => i._id === product._id && i.format.format._id === format.format._id)

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
      ...alreadyStoredItems.filter(i => (i._id === item._id && i.format.format._id !== format.format._id) || i._id !== item._id),
      item
    ]

    this.products$.next(items)
    localStorage.setItem('products', JSON.stringify(items))
  }

  removeProduct(product) {
    const filteredProducts = this.products$.getValue().filter(i => (i._id === product._id && i.format.format._id !== product.format.format._id) || i._id !== product._id)
    this.products$.next(filteredProducts)
    localStorage.setItem('products', JSON.stringify(filteredProducts))
  }

}
