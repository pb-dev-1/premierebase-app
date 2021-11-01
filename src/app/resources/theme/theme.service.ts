import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, BehaviorSubject} from 'rxjs'

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
      .subscribe((themes: Theme[]) => this.themes$.next(themes))
  }

  getTheme(id: string): Observable<Theme> {
    return this.http.get(`${environment.api}/themes/${id}`) as Observable<Theme>
  }

  create(params: any): Observable<Theme> {
    return this.http.post(`${environment.api}/themes/create`, params) as Observable<Theme>
  }

  update(params: any): Observable<Theme> {
    return this.http.post(`${environment.api}/themes/${params.id}/update`, params) as Observable<Theme>
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/themes/${id}/delete`)
  }

  updateOrCreateObjectInList(theme: Theme) {
    const currentThemes = this.themes$.getValue()
    const themeIndex = currentThemes.findIndex(t => theme._id === t._id)
    currentThemes && themeIndex !== -1 ? currentThemes[themeIndex] = theme : currentThemes.push(theme)
    this.themes$.next(currentThemes)
  }

  deleteObjectInList(id: string) {
    const currentThemes = this.themes$.getValue()?.filter(t => t._id !== id)
    this.themes$.next(currentThemes)
  }
}
