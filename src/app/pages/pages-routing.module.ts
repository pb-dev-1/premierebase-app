import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {HomeComponent} from '@app/pages/home/home.component'
import {JournalComponent} from '@app/pages/journal/journal.component'
import {BrandComponent} from '@app/pages/brand/brand.component'
import {CollectionsComponent} from '@app/pages/collections/collections.component'
import {CollectionComponent} from '@app/pages/collection/collection.component'
import {IllustrationsComponent} from '@app/pages/illustrations/illustrations.component'
import {IllustrationComponent} from '@app/pages/illustration/illustration.component'
import {BasketComponent} from '@app/pages/basket/basket.component'
import {AccountComponent} from '@app/pages/account/account.component'
import {AuthGuard } from '@app/resources/auth/auth.guard'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'collections', component: CollectionsComponent},
  {path: 'collections/:collectionId', component: CollectionComponent},
  {path: 'illustrations', component: IllustrationsComponent},
  {path: 'illustrations/:illustrationId', component: IllustrationComponent},
  {path: 'journal', component: JournalComponent},
  {path: 'brand', component: BrandComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  /*{path: 'contact', component: ContactComponent},*/
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
