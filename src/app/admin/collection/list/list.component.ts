import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {map, tap} from 'rxjs/operators'

import {Collection} from '@resources/collection/collection.model'
import {CollectionService} from '@resources/collection/collection.service'
import {environment} from '@env/environment'

@Component({
  selector: 'pb-collection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  env = environment
  
  collections$: Observable<Collection[]> = this.collectionService.collections$.pipe(
    tap(() => this.collectionService.getCollections())
  )
  displayedColumns: string[] = ['collection', 'label', 'theme', 'description', 'actions']

  constructor(private collectionService: CollectionService) {}

  deleteCollection(id) {
    this.collectionService.delete(id).subscribe(_ => {
      this.collections$ = this.collections$.pipe(map(collections => collections.filter(collection => collection._id !== id)))
    })
  }

}
