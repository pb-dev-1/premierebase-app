import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'

import {environment} from '@env/environment'
import {Category} from '@resources/category/category.model'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject(undefined)

  constructor(
    private http: HttpClient,
  ) { }

  getCategories() {
    return this.http.get(environment.api + '/categories')
      .subscribe((categories: Category[]) => this.categories$.next(categories))
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get(`${environment.api}/categories/${id}`) as Observable<Category>
  }

  create(params: any): Observable<Category> {
    return this.http.post(`${environment.api}/categories/create`, params) as Observable<Category>
  }

  update(params: any): Observable<Category> {
    return this.http.post(`${environment.api}/categories/${params.id}/update`, params) as Observable<Category>
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/categories/${id}/delete`)
  }

  updateOrCreateObjectInList(category: Category) {
    const currentCategories = this.categories$.getValue()
    if (currentCategories) {
      const categoryIndex = currentCategories.findIndex(c => category._id === c._id)
      currentCategories && categoryIndex !== -1 ? currentCategories[categoryIndex] = category : currentCategories.push(category)
      this.categories$.next(currentCategories)
    }
  }

  deleteObjectInList(id: string) {
    const currentCategories = this.categories$.getValue()?.filter(c => c._id !== id)
    this.categories$.next(currentCategories)
  }
}
