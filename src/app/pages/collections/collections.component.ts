import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

import {Collection} from '@resources/collection/collection.model'
import {CollectionService} from '@resources/collection/collection.service'
import {environment} from '@env/environment'
import {NewsletterService} from '@app/resources/newsletter/newsletter.service'

@Component({
  selector: 'pb-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {
  env = environment
  alreadySub$ = this.newsletterService.alreadySub$
  
  collections$: Observable<Collection[]> = this.collectionService.collections$.pipe(
    tap(illustrations => {
      if (!illustrations) {
        this.collectionService.getCollections()
      }
    })
  )

  constructor(
    private collectionService: CollectionService,
    private newsletterService: NewsletterService,
  ) { }

}
