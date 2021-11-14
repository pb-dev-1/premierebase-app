import {Component, Input} from '@angular/core'
import {Router} from '@angular/router'
import {TranslateService} from '@ngx-translate/core'
import {OnInit} from '@angular/core'

import {AuthService} from '@resources/auth/auth.service'
import {BasketService} from '@app/resources/basket/basket.service'

@Component({
  selector: 'pb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() color = 'white'

  showAuthenticationPop = false
  route = ''
  currentLang = 'fr'
  countryCodes = ['fr', 'gb']
  savedProducts$ = this.basketService.products$
  navs = [
    {route: 'collections', text: 'NAV.LEFT.COLLECTIONS'},
    {route: 'illustrations', text: 'NAV.LEFT.SHOP'},
    {route: 'brand', text: 'NAV.LEFT.BRAND'},
    // {route: 'studio', text: 'NAV.LEFT.SUTDIO'},
    {route: 'journal', text: 'NAV.LEFT.JOURNAL'},
    // {route: 'contact', text: 'NAV.LEFT.CONTACT'},
  ]

  constructor(
    public authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private basketService: BasketService,
  ) { }

  ngOnInit() {
    const availableLanguages = ['fr', 'en']
    const storedLang = localStorage.getItem('language')
    if (availableLanguages.includes(storedLang)) {
      this.translate.use(storedLang)
      this.currentLang = storedLang === 'en' ? 'gb' : storedLang
    } else {
      const browserLang = this.translate.getBrowserLang()
      if (availableLanguages.includes(browserLang)) {
        this.translate.use(browserLang)
        this.currentLang = browserLang === 'en' ? 'gb' : browserLang
      }  else {
        this.translate.use('en')
        this.currentLang = 'gb'
      } 
    }
    this.route = this.router.url.split('/')[this.router.url.split('/').length - 1]
  }

  navigate(route: string) {
    this.route = route
    this.router.navigate([`/${route}`])
  }

  toggleAuthenticationPopup(shouldShow) {
    this.showAuthenticationPop = shouldShow
  }

  changeLang(lang: string) {
    if (lang === 'gb') {
      lang = 'en'
    }
    this.translate.use(lang)
    localStorage.setItem('language', lang)
  }
}
