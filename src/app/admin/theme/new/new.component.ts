import {Component} from '@angular/core'
import {Router} from '@angular/router'

import {ThemeService} from '@resources/theme/theme.service'

@Component({
  selector: 'pb-theme-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  constructor(
    private themeService: ThemeService,
    private router: Router,
  ) { }

  createTheme(params) {
    this.themeService.create(params).subscribe(async (t) => {
      await this.router.navigate(['admin', 'themes'])
    })
  }
}
