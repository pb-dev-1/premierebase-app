import {Component} from '@angular/core'
import {TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pb-app'

  constructor(
    private translate: TranslateService,
  ) {
    const availableLanguages = ['fr', 'en']
    const browserLang = this.translate.getBrowserLang()
    availableLanguages.includes(browserLang) ? this.translate.use(browserLang) : this.translate.use('en')
  }

}
