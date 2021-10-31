import {Component, Input} from '@angular/core'
import {Router} from '@angular/router'
import {DomSanitizer} from '@angular/platform-browser'

import {environment} from '@env/environment'
import {Illustration} from '@resources/illustration/illustration.model'

@Component({
  selector: 'pb-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() public item: Illustration
  env = environment

  constructor(
    private router: Router,
    private domSanitizer: DomSanitizer,
  ) { }

  goToIllustration(id: string) {
    this.router.navigate(['/illustrations', id])
  }

  minPrice() {
    return this.item?.formats ? Math.min.apply(Math, this.item.formats.map(format => format.price)) : 0
  }

  maxPrice() {
    return this.item?.formats ? Math.max.apply(Math, this.item.formats.map(format => format.price)) : 0
  }

  imgUrl(item) {
    let base64String = ''
    if (item.images.packShot.data?.data) {
      const TYPED_ARRAY = new Uint8Array(item.images.packShot.data?.data)
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY)
      base64String = btoa(STRING_CHAR)
    } else {
      base64String = item.images.packShot.data
    }

    return this.domSanitizer.bypassSecurityTrustUrl('data:' + item.images.packShot.contentType + ';base64,' + base64String)
  }
}
