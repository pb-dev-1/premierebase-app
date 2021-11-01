import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, BehaviorSubject} from 'rxjs'

import {environment} from '@env/environment'
import {Collection} from '@resources/collection/collection.model'

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  public collections$: BehaviorSubject<Collection[]> = new BehaviorSubject(undefined)

  constructor(
    private http: HttpClient,
  ) { }

  getCollections() {
    return this.http.get(environment.api + '/collections')
      .subscribe((collections: Collection[]) => this.collections$.next(collections))
  }

  getCollection(id: string): Observable<Collection> {
    return this.http.get(`${environment.api}/collections/${id}`) as Observable<Collection>
  }

  create(params: any): Observable<Collection> {
    const data: FormData = new FormData()
    const files = [params.homeFile, params.collectionFile, ...params.detailsFile].filter(file => !!file)
    if (files.length) {
      files.forEach(file => data.append('files', file, file.name))
    }
    data.append(`collection`, JSON.stringify(params.collection))

    return this.http.post(`${environment.api}/collections/create`, data) as Observable<Collection>
  }

  update(params: any): Observable<Collection> {
    const data: FormData = new FormData()
    const files = [params.homeFile, params.collectionFile, ...params.detailsFile].filter(file => !!file)
    if (files.length) {
      files.forEach(file => data.append('files', file, file.name))
    }
    data.append(`collection`, JSON.stringify(params.collection))

    return this.http.post(`${environment.api}/collections/${params.id}/update`, data) as Observable<Collection>
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/collections/${id}/delete`)
  }

  deleteDetail(collectionId: string, detail: string) {
    return this.http.post(`${environment.api}/collections/${collectionId}/detail/delete`, {detail})
  }

  updateOrCreateObjectInList(collection: Collection) {
    const currentCollections = this.collections$.getValue()
    const collectionIndex = currentCollections.findIndex(c => collection._id === c._id)
    currentCollections && collectionIndex !== -1 ? currentCollections[collectionIndex] = collection : currentCollections.push(collection)
    this.collections$.next(currentCollections)
  }

  deleteObjectInList(id: string) {
    const currentCollections = this.collections$.getValue()?.filter(c => c._id !== id)
    this.collections$.next(currentCollections)
  }
}
