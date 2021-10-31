import {Component} from '@angular/core'
import {Router} from '@angular/router'

import {CategoryService} from '@resources/category/category.service'

@Component({
  selector: 'pb-category-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  createCategory(params) {
    this.categoryService.create(params).subscribe(async (c) => {
      await this.router.navigate(['admin', 'categories'])
    })
  }
}
