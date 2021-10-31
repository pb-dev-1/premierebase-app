import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'
import {first} from 'rxjs/operators'

import {environment} from '@env/environment'
import {Format} from '@resources/format/format.model'

@Injectable({
  providedIn: 'root'
})
export class FormatService {
  public formats$: BehaviorSubject<Format[]> = new BehaviorSubject(undefined)

  constructor(
    private http: HttpClient,
  ) { }

  getFormats() {
    return this.http.get(environment.api + '/formats')
      .pipe(first())
      .subscribe((formats: Format[]) => this.formats$.next(formats))
  }

  getFormat(id: string): Observable<Format> {
    return this.http.get(`${environment.api}/formats/${id}`) as Observable<Format>
  }

  create(params): Observable<Format> {
    return this.http.post(`${environment.api}/formats/create`, params) as Observable<Format>
  }

  update(params): Observable<Format> {
    return this.http.post(`${environment.api}/formats/${params.id}/update`, params) as Observable<Format>
  }

  delete(id) {
    return this.http.delete(`${environment.api}/formats/${id}/delete`)
  }
}
