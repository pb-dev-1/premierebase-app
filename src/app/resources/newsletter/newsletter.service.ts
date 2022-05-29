import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'

import {environment} from '@env/environment'
import {Newsletter} from './newsletter.model'

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  subscribers$: BehaviorSubject<Newsletter[]> = new BehaviorSubject(undefined)
  alreadySub$: BehaviorSubject<string> = new BehaviorSubject('')

  constructor(
    private http: HttpClient,
  ) {
    this.getAlreadySub()
  }

  getSubscribers() {
    return this.http.get(environment.api + '/newsletter')
      .subscribe((subscribers: Newsletter[]) => this.subscribers$.next(subscribers))
  }

  sub(params: {email: string}): Observable<any> {
    return this.http.post(`${environment.api}/newsletter/subscribe`, params) as Observable<any>
  }

  unsub(id: string) {
    return this.http.delete(`${environment.api}/newsletter/${id}/unsubscribe`)
  }

  deleteObjectInList(id: string) {
    const currentSubscribers = this.subscribers$.getValue()?.filter(c => c._id !== id)
    this.subscribers$.next(currentSubscribers)
  }

  getAlreadySub() {
    this.alreadySub$.next(localStorage.getItem('subscribeToNewsletter'))
  }

  storeAlreadySub() {
    localStorage.setItem('subscribeToNewsletter', 'true')
    this.getAlreadySub()
  }
}
