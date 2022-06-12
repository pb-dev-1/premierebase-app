import {Component} from '@angular/core'
import {map, switchMap} from 'rxjs/operators'
import {ActivatedRoute, Router} from '@angular/router'
import {Observable} from 'rxjs'

import {Promo} from '@resources/promo/promo.model'
import {PromoService} from '@resources/promo/promo.service'

@Component({
  selector: 'pb-promo-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  promoId$ = this.route.params.pipe(map(param => param.id))
  promo$: Observable<Promo> = this.promoId$.pipe(switchMap(id => this.promoService.getPromo(id)))

  constructor(
    private promoService: PromoService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  updatePromo(params: any) {
    this.promoService.update(params).subscribe(async (p) => {
      this.promoService.updateOrCreateObjectInList(p)
      await this.router.navigate(['admin', 'promos'])
    })
  }

}
