import {Component} from '@angular/core'
import {Router} from '@angular/router'

import {CollectionService} from '@resources/collection/collection.service'

@Component({
  selector: 'pb-collection-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  constructor(
    private collectionService: CollectionService,
    private router: Router,
  ) { }

  createCollection(params) {
    this.collectionService.create(params).subscribe(async (d) => {
      await this.router.navigate(['admin', 'collections'])
    })
  }
}
