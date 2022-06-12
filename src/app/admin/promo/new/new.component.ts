import {Component} from '@angular/core'
import {Router} from '@angular/router'

import {PromoService} from '@resources/promo/promo.service'

@Component({
  selector: 'pb-promo-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  constructor(
    private promoService: PromoService,
    private router: Router,
  ) { }

  createPromo(params) {
    this.promoService.create(params).subscribe(async (t) => {
      this.promoService.updateOrCreateObjectInList(t)
      await this.router.navigate(['admin', 'promos'])
    })
  }
}
