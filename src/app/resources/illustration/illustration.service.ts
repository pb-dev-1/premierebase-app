import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable, BehaviorSubject} from 'rxjs'

import {environment} from '@env/environment'
import {Illustration, IllustrationParams} from '@resources/illustration/illustration.model'

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {
  public illustrations$: BehaviorSubject<Illustration[]> = new BehaviorSubject(undefined)
  public maxItems$: BehaviorSubject<number> = new BehaviorSubject(undefined)
  public newestIllustrations$: BehaviorSubject<Illustration[]> = new BehaviorSubject(undefined)

  constructor(
    private http: HttpClient,
  ) { }

  getIllustrations(httpParams?: IllustrationParams) {
    const params = new HttpParams({fromObject: {...httpParams}})

    return this.http.get(environment.api + '/illustrations', {params})
      .subscribe((data: {illustrations: Illustration[], maxItems: number}) => {
        this.illustrations$.next(data.illustrations)
        this.maxItems$.next(data.maxItems)
      })
  }

  getIllustration(id: string): Observable<Illustration> {
    return this.http.get(`${environment.api}/illustrations/${id}`) as Observable<Illustration>
  }

  getNewestIllustrations() {
    const params = new HttpParams().set('perPage', '3')

    return this.http.get(environment.api + '/illustrations', {params})
      .subscribe((data: {illustrations: Illustration[], maxItems: number}) => this.newestIllustrations$.next(data.illustrations))
  }

  getHighlightedIllustration(): Observable<Illustration> {
    return this.http.get(`${environment.api}/illustrations/highlighted`) as Observable<Illustration>
  }

  getSimilarIllustrations(id: string): Observable<Illustration[]> {
    return this.http.get(`${environment.api}/illustrations/${id}/similar`) as Observable<Illustration[]>
  }

  create(params: any): Observable<Illustration> {
    const data: FormData = new FormData()
    const files = [params.settingSceneFile, params.packShotFile, ...params.detailsFile].filter(file => !!file)
    if (files.length) {
      files.forEach(file => data.append('files', file, file.name))
    }
    data.append(`illustration`, JSON.stringify(params.illustration))

    return this.http.post(`${environment.api}/illustrations/create`, data) as Observable<Illustration>
  }

  update(params: any): Observable<Illustration> {
    const data: FormData = new FormData()
    const files = [params.settingSceneFile, params.packShotFile, ...params.detailsFile].filter(file => !!file)
    if (files.length) {
      files.forEach(file => data.append('files', file, file.name))
    }
    data.append(`illustration`, JSON.stringify(params.illustration))

    return this.http.post(`${environment.api}/illustrations/${params.id}/update`, data) as Observable<Illustration>
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/illustrations/${id}/delete`)
  }

  deleteDetail(illustrationId: string, detail: string) {
    return this.http.post(`${environment.api}/illustrations/${illustrationId}/detail/delete`, {detail})
  }

  updateOrCreateObjectInList(illustration: Illustration) {
    const currentIllustrations = this.illustrations$.getValue()
    if (currentIllustrations) {
      const illustrationIndex = currentIllustrations.findIndex(i => illustration._id === i._id)
      currentIllustrations && illustrationIndex !== -1 ? currentIllustrations[illustrationIndex] = illustration : currentIllustrations.push(illustration)
      this.illustrations$.next(currentIllustrations)
    }
  }

  deleteObjectInList(id: string) {
    const currentIllustrations = this.illustrations$.getValue()?.filter(i => i._id !== id)
    this.illustrations$.next(currentIllustrations)
  }
}
