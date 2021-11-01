import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

import {Collection} from '@resources/collection/collection.model'
import {CollectionService} from '@resources/collection/collection.service'
import {environment} from '@env/environment'

@Component({
  selector: 'pb-collection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  collections$: Observable<Collection[]> = this.collectionService.collections$.pipe(
    tap(collections => {if(!collections) {this.collectionService.getCollections()}})
  )
  displayedColumns: string[] = ['collection', 'label', 'theme', 'description', 'actions']
  env = environment

  constructor(private collectionService: CollectionService) {}

  deleteCollection(id: string) {
    this.collectionService.delete(id).subscribe(() => {
      this.collectionService.deleteObjectInList(id)
    })
  }

}
