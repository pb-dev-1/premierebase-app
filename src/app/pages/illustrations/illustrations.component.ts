import {Component} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {switchMap, tap} from 'rxjs/operators'

import {IllustrationService} from '@resources/illustration/illustration.service'
import {Illustration, IllustrationParams} from '@resources/illustration/illustration.model'
import {NewsletterService} from '@app/resources/newsletter/newsletter.service'

@Component({
  selector: 'pb-illustrations',
  templateUrl: './illustrations.component.html',
  styleUrls: ['./illustrations.component.scss']
})
export class IllustrationsComponent {
  defaultPerPage = '15'
  alreadySub$ = this.newsletterService.alreadySub$

  illustrationsParams$: BehaviorSubject<IllustrationParams> = new BehaviorSubject({perPage: this.defaultPerPage})
  maxIllustrations$: Observable<number> = this.illustrationService.maxItems$
  illustrations$: Observable<Illustration[]> = this.illustrationsParams$.pipe(
    tap(params => this.illustrationService.getIllustrations(params)),
    switchMap(() => this.illustrationService.illustrations$),
  )

  constructor(
    private illustrationService: IllustrationService,
    private newsletterService: NewsletterService,
  ) { }

  loadMoreProduct() {
    const perPage = (parseInt(this.illustrationsParams$.getValue().perPage) + parseInt(this.defaultPerPage)).toString()
    this.illustrationsParams$.next({'perPage': perPage})
  }

}
