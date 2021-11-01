import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

import {Theme} from '@resources/theme/theme.model'
import {ThemeService} from '@resources/theme/theme.service'

@Component({
  selector: 'pb-theme-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  themes$: Observable<Theme[]> = this.themeService.themes$.pipe(
    tap(themes => {if (!themes) {this.themeService.getThemes()}})
  )
  displayedColumns: string[] = ['theme', 'actions']

  constructor(private themeService: ThemeService) {}

  deleteTheme(id: string) {
    this.themeService.delete(id).subscribe(() => {
      this.themeService.deleteObjectInList(id)
    })
  }

}
