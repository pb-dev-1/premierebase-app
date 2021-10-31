import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

import {IllustrationService} from '@resources/illustration/illustration.service'
import {Illustration} from '@resources/illustration/illustration.model'

@Component({
  selector: 'pb-illustrations',
  templateUrl: './illustrations.component.html',
  styleUrls: ['./illustrations.component.scss']
})
export class IllustrationsComponent {
  illustrations$: Observable<Illustration[]> = this.illustrationService.illustrations$.pipe(
    tap(illustrations => {
      if (!illustrations) {
        this.illustrationService.getIllustrations()
      }
    })
  )

  constructor(
    private illustrationService: IllustrationService,
  ) { }

}
