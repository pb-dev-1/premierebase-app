import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {TranslateService} from '@ngx-translate/core'
import {MatDialog} from '@angular/material/dialog'

import {Category} from '@resources/category/category.model'
import {CategoryService} from '@resources/category/category.service'
import {ConfirmDialogComponent} from '@app/shared/ui-components/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'pb-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  categories$: Observable<Category[]> = this.categoryService.categories$.pipe(
    tap(categories => {if (!categories) {this.categoryService.getCategories()}})
  )
  displayedColumns: string[] = ['category', 'actions']

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {}

  confirm(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '300px', data: this.translate.instant('SHARED.DIALOG.CONFIRM_DELETE') })

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deleteCategory(id)
      }
    })
  }

  deleteCategory(id: string) {
    this.categoryService.delete(id).subscribe(() => {
      this.categoryService.deleteObjectInList(id)
    })
  }

}
