import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {map, tap} from 'rxjs/operators'

import {Theme} from '@resources/theme/theme.model'
import {ThemeService} from '@resources/theme/theme.service'

@Component({
  selector: 'pb-theme-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  themes$: Observable<Theme[]> = this.themeService.themes$.pipe(
    tap(illustrations => {
      if (!illustrations) {
        this.themeService.getThemes()
      }
    })
  )
  displayedColumns: string[] = ['theme', 'actions']

  constructor(private themeService: ThemeService) {}

  deleteTheme(id) {
    this.themeService.delete(id).subscribe(_ => {
      this.themes$ = this.themes$.pipe(map(themes => themes.filter(theme => theme._id !== id)))
    })
  }

}
