import {Component, Input, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {environment} from '@env/environment'
import {Illustration} from '@resources/illustration/illustration.model'

@Component({
  selector: 'pb-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() public item: Illustration

  env = environment
  imgUrl = ''

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initFirstImage()
  }

  goToIllustration(id: string) {
    this.router.navigate(['/illustrations', id])
  }

  getImage() {
    return this.env.uploads + this.imgUrl
  }

  minPrice() {
    return this.item?.formats ? Math.min.apply(Math, this.item.formats.map(format => format.price)) : 0
  }

  maxPrice() {
    return this.item?.formats ? Math.max.apply(Math, this.item.formats.map(format => format.price)) : 0
  }

  initFirstImage() {
    this.imgUrl = this.item?.images.packShot
  }

  initSecondImage() {
    this.imgUrl = this.item?.images.settingScene
  }

}
