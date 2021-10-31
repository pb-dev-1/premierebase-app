import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {HttpErrorComponent} from '@resources/http-error/http-error.component'

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  durationInSeconds = 5

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(data) {
    this.snackBar.openFromComponent(HttpErrorComponent, {
      duration: this.durationInSeconds * 1000,
      data,
    })
  }

}
