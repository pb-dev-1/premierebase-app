import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {MatDialog} from '@angular/material/dialog'
import {TranslateService} from '@ngx-translate/core'

import {Collection} from '@resources/collection/collection.model'
import {CollectionService} from '@resources/collection/collection.service'
import {environment} from '@env/environment'
import {ConfirmDialogComponent} from '@app/shared/ui-components/confirm-dialog/confirm-dialog.component'

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

  constructor(
    private collectionService: CollectionService,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {}

  confirm(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '300px', data: this.translate.instant('SHARED.DIALOG.CONFIRM_DELETE') })

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deleteCollection(id)
      }
    })
  }

  deleteCollection(id: string) {
    this.collectionService.delete(id).subscribe(() => {
      this.collectionService.deleteObjectInList(id)
    })
  }

}
