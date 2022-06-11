import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {MatDialog} from '@angular/material/dialog'
import {TranslateService} from '@ngx-translate/core'

import {Theme} from '@resources/theme/theme.model'
import {ThemeService} from '@resources/theme/theme.service'
import {ConfirmDialogComponent} from '@app/shared/ui-components/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'pb-theme-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  themes$: Observable<Theme[]> = this.themeService.themes$.pipe(
    tap(themes => {if (!themes) {this.themeService.getThemes()}})
  )
  displayedColumns: string[] = ['theme', 'actions']

  constructor(
    private themeService: ThemeService,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {}

  confirm(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '300px', data: this.translate.instant('SHARED.DIALOG.CONFIRM_DELETE') })

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deleteTheme(id)
      }
    })
  }

  deleteTheme(id: string) {
    this.themeService.delete(id).subscribe(() => {
      this.themeService.deleteObjectInList(id)
    })
  }

}
