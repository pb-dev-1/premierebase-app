import {Component} from '@angular/core'
import {map, switchMap} from 'rxjs/operators'
import {ActivatedRoute, Router} from '@angular/router'
import {Observable} from 'rxjs'

import {Collection} from '@resources/collection/collection.model'
import {CollectionService} from '@resources/collection/collection.service'

@Component({
  selector: 'pb-collection-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  collectionId$ = this.route.params.pipe(map(param => param.id))
  collection$: Observable<Collection> = this.collectionId$.pipe(switchMap(id => this.collectionService.getCollection(id)))

  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  updateCollection(params: any) {
    this.collectionService.update(params).subscribe(async (d) => {
      await this.router.navigate(['admin', 'collections'])
    })
  }

}
