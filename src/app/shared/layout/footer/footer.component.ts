import {Component, OnDestroy, OnInit} from '@angular/core'
import {tap} from 'rxjs/operators'
import {Observable, Subscription} from 'rxjs'

import {Collection} from '@resources/collection/collection.model'
import {CollectionService} from '@resources/collection/collection.service'
import {environment} from '@env/environment'

@Component({
  selector: 'pb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  env = environment
  backgroundImage = ''
  
  collectionsSubscription$: Subscription

  collections$: Observable<Collection[]> = this.collectionService.collections$.pipe(
    tap(illustrations => {
      if (!illustrations) {
        this.collectionService.getCollections()
      }
    })
  )

  constructor(
    private collectionService: CollectionService,
  ) { }

  ngOnInit(): void {
    this.collectionsSubscription$ = this.collections$.subscribe(collections => {
      if (collections?.length) {
        const collectionImages = collections[Math.floor(Math.random() * collections.length)].images.details
        if (collectionImages?.length) {
          this.backgroundImage = this.env.uploads + encodeURI(collectionImages[Math.floor(Math.random() * collectionImages.length)])
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.collectionsSubscription$.unsubscribe()
  }

}
