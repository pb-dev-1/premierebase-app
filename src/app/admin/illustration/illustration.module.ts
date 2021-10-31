import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {FlexModule} from '@angular/flex-layout'

import {IllustrationRoutingModule} from './illustration-routing.module'
import {FormComponent} from './form/form.component'
import {ListComponent} from './list/list.component'
import {EditComponent} from './edit/edit.component'
import {NewComponent} from './new/new.component'
import {MaterialModule} from '@resources/material.module'
import {SharedModule} from '@shared/shared.module'
import {TranslateModule} from '@ngx-translate/core'

@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    EditComponent,
    NewComponent,
  ],
  imports: [
    CommonModule,
    IllustrationRoutingModule,
    ReactiveFormsModule,
    FlexModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
  ]
})
export class IllustrationModule { }
