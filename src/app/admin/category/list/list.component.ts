import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {map, tap} from 'rxjs/operators'

import {Category} from '@resources/category/category.model'
import {CategoryService} from '@resources/category/category.service'

@Component({
  selector: 'pb-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  categories$: Observable<Category[]> = this.categoryService.categories$.pipe(
    tap(() => this.categoryService.getCategories())
  )
  displayedColumns: string[] = ['category', 'actions']

  constructor(private categoryService: CategoryService) {}

  deleteCategory(id) {
    this.categoryService.delete(id).subscribe(_ => {
      this.categories$ = this.categories$.pipe(map(categories => categories.filter(categorie => categorie._id !== id)))
    })
  }

}
