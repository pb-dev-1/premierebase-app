import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, BehaviorSubject} from 'rxjs'

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
      .subscribe((formats: Format[]) => this.formats$.next(formats))
  }

  getFormat(id: string): Observable<Format> {
    return this.http.get(`${environment.api}/formats/${id}`) as Observable<Format>
  }

  create(params: any): Observable<Format> {
    return this.http.post(`${environment.api}/formats/create`, params) as Observable<Format>
  }

  update(params: any): Observable<Format> {
    return this.http.post(`${environment.api}/formats/${params.id}/update`, params) as Observable<Format>
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/formats/${id}/delete`)
  }

  updateOrCreateObjectInList(format: Format) {
    const currentFormats = this.formats$.getValue()
    const formatIndex = currentFormats.findIndex(f => format._id === f._id)
    currentFormats && formatIndex !== -1 ? currentFormats[formatIndex] = format : currentFormats.push(format)
    this.formats$.next(currentFormats)
  }

  deleteObjectInList(id: string) {
    const currentFormats = this.formats$.getValue()?.filter(f => f._id !== id)
    this.formats$.next(currentFormats)
  }
}
