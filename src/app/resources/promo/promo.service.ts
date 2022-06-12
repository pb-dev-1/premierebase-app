import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, BehaviorSubject} from 'rxjs'

import {environment} from '@env/environment'
import {Promo} from '@resources/promo/promo.model'

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  public promos$: BehaviorSubject<Promo[]> = new BehaviorSubject(undefined)

  constructor(
    private http: HttpClient,
  ) { }

  getPromos() {
    return this.http.get(environment.api + '/promos')
      .subscribe((promos: Promo[]) => this.promos$.next(promos))
  }

  getPromo(id: string): Observable<Promo> {
    return this.http.get(`${environment.api}/promos/${id}`) as Observable<Promo>
  }

  create(params: Promo): Observable<Promo> {
    return this.http.post(`${environment.api}/promos/create`, params) as Observable<Promo>
  }

  update(params: Promo): Observable<Promo> {
    return this.http.post(`${environment.api}/promos/${params._id}/update`, params) as Observable<Promo>
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/promos/${id}/delete`)
  }

  checkPromo(code: string): Observable<Promo> {
    return this.http.post(`${environment.api}/promos/checkPromo`, {code}) as Observable<Promo>
  }

  updateOrCreateObjectInList(promo: Promo) {
    const currentPromos = this.promos$.getValue()
    if (currentPromos) {
      const promoIndex = currentPromos.findIndex(t => promo._id === t._id)
      currentPromos && promoIndex !== -1 ? currentPromos[promoIndex] = promo : currentPromos.push(promo)
      this.promos$.next(currentPromos)
    }
  }

  deleteObjectInList(id: string) {
    const currentPromos = this.promos$.getValue()?.filter(t => t._id !== id)
    this.promos$.next(currentPromos)
  }
}
