import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {MatDialog} from '@angular/material/dialog'
import {TranslateService} from '@ngx-translate/core'

import {Newsletter} from '@resources/newsletter/newsletter.model'
import {NewsletterService} from '@resources/newsletter/newsletter.service'
import {ConfirmDialogComponent} from '@app/shared/ui-components/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'pb-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  subscribers$: Observable<Newsletter[]> = this.newsletterService.subscribers$.pipe(
    tap(categories => {if (!categories) {this.newsletterService.getSubscribers()}})
  )
  displayedColumns: string[] = ['email', 'actions']

  constructor(
    private newsletterService: NewsletterService,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {}

  confirm(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '300px', data: this.translate.instant('SHARED.DIALOG.CONFIRM_DELETE') })

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.unsubscribe(id)
      }
    })
  }

  unsubscribe(id: string) {
    this.newsletterService.unsub(id).subscribe(() => {
      this.newsletterService.deleteObjectInList(id)
    })
  }

}
