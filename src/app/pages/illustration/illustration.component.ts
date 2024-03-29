import {Component, OnInit} from '@angular/core'
import {map, switchMap} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {ActivatedRoute} from '@angular/router'
import {NgxMasonryOptions} from 'ngx-masonry'

import {Illustration} from '@resources/illustration/illustration.model'
import {IllustrationService} from '@resources/illustration/illustration.service'
import {BasketService} from '@app/resources/basket/basket.service'
import {environment} from '@env/environment'
import {NewsletterService} from '@app/resources/newsletter/newsletter.service'

@Component({
  selector: 'pb-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.scss']
})
export class IllustrationComponent implements OnInit {
  illustrationId$ = this.route.params.pipe(map(param => param.illustrationId))
  illustration$: Observable<Illustration> = this.illustrationId$.pipe(switchMap(id => this.illustrationService.getIllustration(id)))
  similarIllustrations$: Observable<Illustration[]> = this.illustrationId$.pipe(switchMap(id => this.illustrationService.getSimilarIllustrations(id)))
  illustration: Illustration
  selectedFormat: string
  selectedImage: string
  selectedQuantity: number = 1
  env = environment
  alreadySub$ = this.newsletterService.alreadySub$
  masonryOptions: NgxMasonryOptions = {
    gutter: 50,
    fitWidth: true,
  }

  get imageDisplayed() {
    return this.env.uploads + this.selectedImage
  }

  constructor(
    private illustrationService: IllustrationService,
    private route: ActivatedRoute,
    private basketService: BasketService,
    private newsletterService: NewsletterService,
  ) { }

  ngOnInit() {
    this.illustration$.subscribe(illustration => {
      this.illustration = illustration
      this.selectedImage = this.illustration.images.packShot
      this.selectedFormat = this.illustration.formats[0].format
    })
  }

  selectImage(img: string) {
    this.selectedImage = img
    console.log(this.selectedImage)
  }

  onChangeQuantity(quantity: number) {
    this.selectedQuantity = quantity
  }

  getPrice() {
    const format = this.illustration.formats.filter(format => format.format === this.selectedFormat)[0]
    return `${format.price * this.selectedQuantity} €`
  }

  addToCart() {
    this.basketService.addProduct(this.illustration, this.selectedFormat, this.selectedQuantity)
  }

}
