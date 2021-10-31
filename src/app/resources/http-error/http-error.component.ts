import {Component, Inject, OnInit} from '@angular/core'
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar'
import {HttpError} from '@resources/http-error/http-error.model'

@Component({
  selector: 'pb-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.scss']
})
export class HttpErrorComponent implements OnInit {
  errors: HttpError[] = [
    { status: 401, message: 'Unauthorized', class: 'warning'},
    { status: 403, message: 'Forbidden', class: 'warning'},
    { status: 404, message: 'Not found', class: 'warning'},
    { status: 500, message: 'Server error', class: 'error'},
  ]
  selectedError: HttpError

  constructor(@Inject(MAT_SNACK_BAR_DATA) public error: {message: string, status: number}) {
  }

  ngOnInit(): void {
    this.selectedError = this.errors.find(err => err.status === this.error.status)
    this.selectedError.message = this.error.message
  }
}
