import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

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
    tap(illustrations => {if (!illustrations) {this.illustrationService.getIllustrations()}})
  )
  displayedColumns: string[] = ['packshot', 'label', 'collection', 'stock', 'theme', 'category', 'details', 'actions']

  constructor(private illustrationService: IllustrationService) {}

  deleteIllustration(id: string) {
    this.illustrationService.delete(id).subscribe(() => {
      this.illustrationService.deleteObjectInList(id)
    })
  }

}
