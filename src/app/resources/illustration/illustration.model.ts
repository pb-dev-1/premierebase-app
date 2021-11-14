import {Theme} from '@resources/theme/theme.model'
import {Category} from '@resources/category/category.model'
import {Collection} from '@resources/collection/collection.model'

export interface Illustration {
  _id: string
  label: string
  details: string
  category: Category
  collec: Collection
  theme: Theme
  formats: {
    _id: string
    format: string
    label: string
    price: number
  }[]
  stock: number
  images: {
    settingScene: string
    packShot: string
    details: string[]
  }
  createdAt: Date
}
