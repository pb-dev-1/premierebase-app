import {Component} from '@angular/core'
import {map, switchMap} from 'rxjs/operators'
import {ActivatedRoute, Router} from '@angular/router'
import {Observable} from 'rxjs'

import {Theme} from '@resources/theme/theme.model'
import {ThemeService} from '@resources/theme/theme.service'

@Component({
  selector: 'pb-theme-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  themeId$ = this.route.params.pipe(map(param => param.id))
  theme$: Observable<Theme> = this.themeId$.pipe(switchMap(id => this.themeService.getTheme(id)))

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  updateTheme(params: any) {
    this.themeService.update(params).subscribe(async (t) => {
      this.themeService.updateOrCreateObjectInList(t)
      await this.router.navigate(['admin', 'themes'])
    })
  }

}
