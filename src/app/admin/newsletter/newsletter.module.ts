import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FlexModule} from '@angular/flex-layout'

import {NewsletterRoutingModule} from './newsletter-routing.module'
import {ListComponent} from './list/list.component'
import {MaterialModule} from '@resources/material.module'
import {SharedModule} from '@shared/shared.module'
import {TranslateModule} from '@ngx-translate/core'

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    NewsletterRoutingModule,
    FlexModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
  ]
})
export class NewsletterModule { }
