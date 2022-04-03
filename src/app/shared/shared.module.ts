import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import {HttpClient} from '@angular/common/http'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import {FlexLayoutModule} from '@angular/flex-layout'
import {RouterModule} from '@angular/router'
import {NgxMasonryModule} from 'ngx-masonry'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {HttpErrorComponent} from '@resources/http-error/http-error.component'
import {MaterialModule} from '@resources/material.module'
import {FormErrorComponent} from './ui-components/form-error/form-error.component'
import {SideMenuComponent} from './layout/side-menu/side-menu.component'
import {HeaderComponent} from './layout/header/header.component'
import {ItemCardComponent} from './ui-components/item-card/item-card.component'
import {ItemsContainerComponent} from './ui-components/items-container/items-container.component'
import {HighlightedItemComponent} from './ui-components/highlighted-item/highlighted-item.component'
import {GenericButtonComponent} from './ui-components/generic-button/generic-button.component'
import {PageLayoutComponent} from './layout/page-layout/page-layout.component'
import {ArrowLinkComponent} from './ui-components/arrow-link/arrow-link.component'
import {RadioBannerComponent} from './layout/radio-banner/radio-banner.component'
import {NewsletterComponent} from './layout/newsletter/newsletter.component'
import {FooterComponent} from './layout/footer/footer.component'
import {PageAdminLayoutComponent} from './layout/page-admin-layout/page-admin-layout.component'
import {HeaderAdminComponent} from './layout/header-admin/header-admin.component'
import {TumblrGridComponent} from './ui-components/tumblr-grid/tumblr-grid.component'
import {AuthenticationPopupComponent} from './layout/authentication-popup/authentication-popup.component'
import {LoginFormComponent} from './layout/authentication-popup/login-form/login-form.component'
import {SignupFormComponent} from './layout/authentication-popup/signup-form/signup-form.component'
import {ClickOutsideDirective} from './directive/click-outside.directive'
import {QuantitySelectorComponent} from './ui-components/quantity-selector/quantity-selector.component'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    FormErrorComponent,
    HttpErrorComponent,
    SideMenuComponent,
    HeaderComponent,
    ItemCardComponent,
    ItemsContainerComponent,
    HighlightedItemComponent,
    GenericButtonComponent,
    PageLayoutComponent,
    ArrowLinkComponent,
    RadioBannerComponent,
    NewsletterComponent,
    FooterComponent,
    PageAdminLayoutComponent,
    HeaderAdminComponent,
    TumblrGridComponent,
    AuthenticationPopupComponent,
    LoginFormComponent,
    SignupFormComponent,
    ClickOutsideDirective,
    QuantitySelectorComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'fr'
    }),
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    NgxMasonryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormErrorComponent,
    SideMenuComponent,
    HeaderComponent,
    ItemsContainerComponent,
    HighlightedItemComponent,
    GenericButtonComponent,
    PageLayoutComponent,
    ArrowLinkComponent,
    RadioBannerComponent,
    NewsletterComponent,
    FooterComponent,
    PageAdminLayoutComponent,
    HeaderAdminComponent,
    TumblrGridComponent,
    SignupFormComponent,
    LoginFormComponent,
    ClickOutsideDirective,
    QuantitySelectorComponent,
    NgxMasonryModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
  ]
})
export class SharedModule { }
