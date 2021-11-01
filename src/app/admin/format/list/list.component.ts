import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

import {Format} from '@resources/format/format.model'
import {FormatService} from '@resources/format/format.service'

@Component({
  selector: 'pb-format-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  formats$: Observable<Format[]> = this.formatService.formats$.pipe(
    tap(formats => {if (!formats) {this.formatService.getFormats()}})
  )
  displayedColumns: string[] = ['format', 'actions']

  constructor(private formatService: FormatService) {}

  deleteFormat(id: string) {
    this.formatService.delete(id).subscribe(() => {
      this.formatService.deleteObjectInList(id)
    })
  }

}
