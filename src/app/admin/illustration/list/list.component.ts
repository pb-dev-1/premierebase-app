import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {map, tap} from 'rxjs/operators'

import {IllustrationService} from '@resources/illustration/illustration.service'
import {Illustration} from '@resources/illustration/illustration.model'
import {environment} from '@env/environment'

@Component({
  selector: 'pb-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  env = environment
  illustrations$: Observable<Illustration[]> = this.illustrationService.illustrations$.pipe(
    tap(() => this.illustrationService.getIllustrations())
  )
  displayedColumns: string[] = ['packshot', 'label', 'collection', 'stock', 'theme', 'category', 'details', 'actions']

  constructor(private illustrationService: IllustrationService) {}

  deleteIllustration(id) {
    this.illustrationService.delete(id).subscribe(_ => {
      this.illustrations$ = this.illustrations$.pipe(map(illustrations => illustrations.filter(illustration => illustration._id !== id)))
    })
  }

}
