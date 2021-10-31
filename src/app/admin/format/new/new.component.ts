import {Component} from '@angular/core'
import {Router} from '@angular/router'

import {FormatService} from '@resources/format/format.service'

@Component({
  selector: 'pb-format-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  constructor(
    private formatService: FormatService,
    private router: Router,
  ) { }

  createFormat(params) {
    this.formatService.create(params).subscribe(async (d) => {
      await this.router.navigate(['admin', 'formats'])
    })
  }
}
