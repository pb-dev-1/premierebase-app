import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {MatDialog} from '@angular/material/dialog'
import {TranslateService} from '@ngx-translate/core'

import {Promo} from '@resources/promo/promo.model'
import {PromoService} from '@resources/promo/promo.service'
import {ConfirmDialogComponent} from '@app/shared/ui-components/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'pb-promo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  promos$: Observable<Promo[]> = this.promoService.promos$.pipe(
    tap(promos => {if (!promos) {this.promoService.getPromos()}})
  )
  displayedColumns: string[] = ['promo', 'discount', 'startDate', 'endDate', 'actions']

  constructor(
    private promoService: PromoService,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {}

  confirm(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '300px', data: this.translate.instant('SHARED.DIALOG.CONFIRM_DELETE') })

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deletePromo(id)
      }
    })
  }

  deletePromo(id: string) {
    this.promoService.delete(id).subscribe(() => {
      this.promoService.deleteObjectInList(id)
    })
  }

}
