import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {catchError, map, shareReplay, tap} from 'rxjs/operators'
import {BehaviorSubject, Observable, throwError} from 'rxjs'
import {Router} from '@angular/router'
import * as moment from 'moment'

import {environment} from '@env/environment'
import {User, UserState} from '../user/user.model'
import {Credentials} from './auth.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Partial<User>>
  public currentUser: Observable<Partial<User>>

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): Partial<User> {
    return this.currentUserSubject.value
  }

  signup(user: Partial<User>) {
    return this.http.post<any>(environment.api + '/users/signup', user).pipe(
      tap(token => this.setSession({token, infos: {...user}, expiresIn: 3600})),
      map(() => user),
      catchError(this.handleError)
    )
  }

  login(credentials: Credentials) {
    return this.http.post<any>(environment.api + '/users/login', credentials).pipe(
      tap((userState: UserState) => this.setSession(userState)),
      map(user => user.infos),
      catchError(this.handleError)
    )
  }

  private setSession(authResult: UserState) {
    const expiresAt = moment().add(authResult.expiresIn, 'second')
    this.currentUserSubject.next(authResult.infos)

    localStorage.setItem('id_token', authResult.token)
    localStorage.setItem('currentUser', JSON.stringify(authResult.infos))
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
  }

  logout() {
    this.currentUserSubject.next(null)
    this.router.navigate(['/'])

    localStorage.removeItem('id_token')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('expires_at')
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at')
    const expiresAt = JSON.parse(expiration)

    return moment(expiresAt)
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error)
  }

}
