import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {MatDialog} from '@angular/material/dialog'
import {TranslateService} from '@ngx-translate/core'

import {IllustrationService} from '@resources/illustration/illustration.service'
import {Illustration} from '@resources/illustration/illustration.model'
import {environment} from '@env/environment'
import {ConfirmDialogComponent} from '@app/shared/ui-components/confirm-dialog/confirm-dialog.component'

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

  constructor(
    private illustrationService: IllustrationService,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {}

  confirm(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '300px', data: this.translate.instant('SHARED.DIALOG.CONFIRM_DELETE') })

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deleteIllustration(id)
      }
    })
  }

  deleteIllustration(id: string) {
    this.illustrationService.delete(id).subscribe(() => {
      this.illustrationService.deleteObjectInList(id)
    })
  }

}
