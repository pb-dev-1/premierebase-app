import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TranslateModule} from '@ngx-translate/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {FlexLayoutModule} from '@angular/flex-layout'
import {NgxMasonryModule} from 'ngx-masonry'

import {MaterialModule} from '@resources/material.module'
import {SharedModule} from '@shared/shared.module'
import {PagesRoutingModule} from './pages-routing.module'
import {JournalComponent} from './journal/journal.component'
import {ContactComponent} from './contact/contact.component'
import {BrandComponent} from './brand/brand.component'
import {AccountComponent} from './account/account.component'
import {BasketComponent} from './basket/basket.component'
import {LoginComponent} from './login/login.component'
import {SignupComponent} from './signup/signup.component'
import {HomeComponent} from './home/home.component'
import {IllustrationsComponent} from './illustrations/illustrations.component'
import {IllustrationComponent} from './illustration/illustration.component'
import {CollectionsComponent} from './collections/collections.component'
import {CollectionComponent} from './collection/collection.component'

@NgModule({
  declarations: [
    JournalComponent,
    ContactComponent,
    BrandComponent,
    AccountComponent,
    BasketComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    IllustrationsComponent,
    CollectionsComponent,
    CollectionComponent,
    IllustrationComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslateModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMasonryModule,
  ]
})
export class PagesModule {
}
