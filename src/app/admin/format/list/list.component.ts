import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {MatDialog} from '@angular/material/dialog'
import {TranslateService} from '@ngx-translate/core'

import {Format} from '@resources/format/format.model'
import {FormatService} from '@resources/format/format.service'
import {ConfirmDialogComponent} from '@app/shared/ui-components/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'pb-format-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  formats$: Observable<Format[]> = this.formatService.formats$.pipe(
    tap(formats => {if (!formats) {this.formatService.getFormats()}})
  )
  displayedColumns: string[] = ['format', 'actions']

  constructor(
    private formatService: FormatService,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {}

  confirm(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '300px', data: this.translate.instant('SHARED.DIALOG.CONFIRM_DELETE') })

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deleteFormat(id)
      }
    })
  }

  deleteFormat(id: string) {
    this.formatService.delete(id).subscribe(() => {
      this.formatService.deleteObjectInList(id)
    })
  }

}
