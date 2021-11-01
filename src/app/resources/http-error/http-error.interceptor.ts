import {Injectable} from '@angular/core'
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {catchError} from 'rxjs/operators'

import {AuthService} from '@resources/auth/auth.service'
import {HttpErrorService} from '@resources/http-error/http-error.service'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private error: HttpErrorService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authService.logout()
        location.reload()
      }

      this.error.openSnackBar({message: err.error.message, status: err.status})

      const error = err.error.message || err.statusText
      return throwError(error)
    }))
  }
}
