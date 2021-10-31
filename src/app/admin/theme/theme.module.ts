import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button'
import {FlexModule} from '@angular/flex-layout'
import {MatCardModule} from '@angular/material/card'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatTableModule} from '@angular/material/table'

import {ThemeRoutingModule} from './theme-routing.module'
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
    ThemeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexModule,
    MatSlideToggleModule,
    MatTableModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
  ]
})
export class ThemeModule { }
