import {Component} from '@angular/core'
import {map, switchMap} from 'rxjs/operators'
import {ActivatedRoute, Router} from '@angular/router'
import {Observable} from 'rxjs'

import {Category} from '@resources/category/category.model'
import {CategoryService} from '@resources/category/category.service'

@Component({
  selector: 'pb-category-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  categoryId$ = this.route.params.pipe(map(param => param.id))
  category$: Observable<Category> = this.categoryId$.pipe(switchMap(id => this.categoryService.getCategory(id)))

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  updateCategory(params) {
    this.categoryService.update(params).subscribe(async (c) => {
      await this.router.navigate(['admin', 'categories'])
    })
  }

}
