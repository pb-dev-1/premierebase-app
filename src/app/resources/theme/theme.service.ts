import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'
import {first} from 'rxjs/operators'

import {environment} from '@env/environment'
import {Theme} from '@resources/theme/theme.model'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(undefined)

  constructor(
    private http: HttpClient,
  ) { }

  getThemes() {
    return this.http.get(environment.api + '/themes')
      .pipe(first())
      .subscribe((themes: Theme[]) => this.themes$.next(themes))
  }

  getTheme(id: string): Observable<Theme> {
    return this.http.get(`${environment.api}/themes/${id}`) as Observable<Theme>
  }

  create(params): Observable<Theme> {
    return this.http.post(`${environment.api}/themes/create`, params) as Observable<Theme>
  }

  update(params): Observable<Theme> {
    return this.http.post(`${environment.api}/themes/${params.id}/update`, params) as Observable<Theme>
  }

  delete(id) {
    return this.http.delete(`${environment.api}/themes/${id}/delete`)
  }
}
