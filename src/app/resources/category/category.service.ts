import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'
import {first} from 'rxjs/operators'

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
      .pipe(first())
      .subscribe((themes: Category[]) => this.categories$.next(themes))
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get(`${environment.api}/categories/${id}`) as Observable<Category>
  }

  create(params): Observable<Category> {
    return this.http.post(`${environment.api}/categories/create`, params) as Observable<Category>
  }

  update(params): Observable<Category> {
    return this.http.post(`${environment.api}/categories/${params.id}/update`, params) as Observable<Category>
  }

  delete(id) {
    return this.http.delete(`${environment.api}/categories/${id}/delete`)
  }
}
