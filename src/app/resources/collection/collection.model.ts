import {Illustration} from '@resources/illustration/illustration.model'
import {Theme} from '@resources/theme/theme.model'

export interface Collection {
  _id: string
  createdAt: Date
  label: string
  description: string
  theme: Theme
  collaboration: boolean
  collaborationDescription?: string
  images: {
    home: any
    collections: any
    details: any[]
  }
  products: Illustration[]
}
