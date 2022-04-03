import {BrowserModule} from '@angular/platform-browser'
import {LOCALE_ID, NgModule} from '@angular/core'
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import {registerLocaleData} from '@angular/common'
import localeFr from '@angular/common/locales/fr'

import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {AuthInterceptor} from '@resources/auth/auth.interceptor'
import {SharedModule} from '@shared/shared.module'
import {HttpErrorInterceptor} from '@resources/http-error/http-error.interceptor'

registerLocaleData(localeFr)

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http)
}
