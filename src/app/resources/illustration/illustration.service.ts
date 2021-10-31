import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'

import {environment} from '@env/environment'
import {Illustration} from '@resources/illustration/illustration.model'
import {Collection} from '@resources/collection/collection.model'

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {
  public illustrations$: BehaviorSubject<Illustration[]> = new BehaviorSubject(undefined)

  constructor(
    private http: HttpClient,
  ) { }

  getIllustrations() {
    return this.http.get(environment.api + '/illustrations')
      .subscribe((illustrations: Illustration[]) => this.illustrations$.next(illustrations))
  }

  getIllustration(id: string): Observable<Illustration> {
    return this.http.get(`${environment.api}/illustrations/${id}`) as Observable<Illustration>
  }

  getNewestIllustrations(): Observable<Illustration[]> {
    return this.http.get(environment.api + '/illustrations/newest') as Observable<Illustration[]>
  }

  getHighlightedIllustration(): Observable<Illustration> {
    return this.http.get(`${environment.api}/illustrations/highlighted`) as Observable<Illustration>
  }

  getSimilarIllustrations(id: string): Observable<Illustration[]> {
    return this.http.get(`${environment.api}/illustrations/${id}/similar`) as Observable<Illustration[]>
  }

  create(params): Observable<Illustration> {
    const data: FormData = new FormData()
    const files = [params.settingSceneFile, params.packShotFile, ...params.detailsFile].filter(file => !!file)
    if (files.length) {
      files.forEach(file => data.append('files', file, file.name))
    }
    data.append(`illustration`, JSON.stringify(params.illustration))

    return this.http.post(`${environment.api}/illustrations/create`, data) as Observable<Illustration>
  }

  update(params): Observable<Illustration> {
    const data: FormData = new FormData()
    const files = [params.settingSceneFile, params.packShotFile, ...params.detailsFile].filter(file => !!file)
    if (files.length) {
      files.forEach(file => data.append('files', file, file.name))
    }
    data.append(`illustration`, JSON.stringify(params.illustration))

    return this.http.post(`${environment.api}/illustrations/${params.id}/update`, data) as Observable<Illustration>
  }

  delete(id) {
    return this.http.delete(`${environment.api}/illustrations/${id}/delete`)
  }

  deleteDetail(illustrationId, id) {
    return this.http.post(`${environment.api}/illustrations/${illustrationId}/detail/${id}/delete`, {})
  }
}
