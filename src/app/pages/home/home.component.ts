import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {Router} from '@angular/router'

import {Illustration} from '@resources/illustration/illustration.model'
import {IllustrationService} from '@resources/illustration/illustration.service'
import {CollectionService} from '@resources/collection/collection.service'
import {Collection} from '@resources/collection/collection.model'
import {environment} from '@env/environment'

@Component({
  selector: 'pb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  env = environment

  newestItems$: Observable<Illustration[]> =  this.illustrationService.getNewestIllustrations()
  illustrations$: Observable<Illustration[]> = this.illustrationService.illustrations$.pipe(
    tap(illustrations => {
      if (!illustrations) {
        this.illustrationService.getIllustrations()
      }
    })
  )
  collections$: Observable<Collection[]> = this.collectionService.collections$.pipe(
    tap(collections => {
      if (!collections) {
        this.collectionService.getCollections()
      }
    })
  )

  constructor(
    private illustrationService: IllustrationService,
    private collectionService: CollectionService,
    private router: Router,
  ) { }
  
  public async goToCollection(collectionId: string) {
    await this.router.navigate(['collections', collectionId])
  }
}
