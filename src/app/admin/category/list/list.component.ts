import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

import {Category} from '@resources/category/category.model'
import {CategoryService} from '@resources/category/category.service'

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

  constructor(private categoryService: CategoryService) {}

  deleteCategory(id: string) {
    this.categoryService.delete(id).subscribe(() => {
      this.categoryService.deleteObjectInList(id)
    })
  }

}
