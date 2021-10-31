import {Component, ViewChild} from '@angular/core'
import {map, switchMap} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {ActivatedRoute} from '@angular/router'
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry'

import {Collection} from '@resources/collection/collection.model'
import {CollectionService} from '@resources/collection/collection.service'
import {environment} from '@env/environment'

@Component({
  selector: 'pb-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent
  
  collectionId$ = this.route.params.pipe(map(param => param.collectionId))
  collection$: Observable<Collection> = this.collectionId$.pipe(switchMap(id => this.collectionService.getCollection(id)))

  env = environment

  masonryOptions: NgxMasonryOptions = {
    gutter: 50,
    fitWidth: true,
  }

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute,
  ) { }

}
