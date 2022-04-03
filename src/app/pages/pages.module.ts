import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {SharedModule} from '@shared/shared.module'
import {PagesRoutingModule} from './pages-routing.module'
import {JournalComponent} from './journal/journal.component'
import {ContactComponent} from './contact/contact.component'
import {BrandComponent} from './brand/brand.component'
import {AccountComponent} from './account/account.component'
import {BasketComponent} from './basket/basket.component'
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
    HomeComponent,
    IllustrationsComponent,
    CollectionsComponent,
    CollectionComponent,
    IllustrationComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
  ]
})
export class PagesModule {
}
