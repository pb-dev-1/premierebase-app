import {Component} from '@angular/core'
import {map, switchMap} from 'rxjs/operators'
import {ActivatedRoute, Router} from '@angular/router'
import {Observable} from 'rxjs'

import {FormatService} from '@resources/format/format.service'
import {Format} from '@resources/format/format.model'

@Component({
  selector: 'pb-format-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  formatId$ = this.route.params.pipe(map(param => param.id))
  format$: Observable<Format> = this.formatId$.pipe(switchMap(id => this.formatService.getFormat(id)))

  constructor(
    private formatService: FormatService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  updateFormat(params: any) {
    this.formatService.update(params).subscribe(async (f) => {
      this.formatService.updateOrCreateObjectInList(f)
      await this.router.navigate(['admin', 'formats'])
    })
  }

}
