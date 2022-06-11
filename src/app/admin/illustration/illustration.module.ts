import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {FlexModule} from '@angular/flex-layout'
import {NgxEditorModule} from 'ngx-editor'
import {TranslateModule} from '@ngx-translate/core'

import {IllustrationRoutingModule} from './illustration-routing.module'
import {FormComponent} from './form/form.component'
import {ListComponent} from './list/list.component'
import {EditComponent} from './edit/edit.component'
import {NewComponent} from './new/new.component'
import {MaterialModule} from '@resources/material.module'
import {SharedModule} from '@shared/shared.module'

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
    NgxEditorModule.forRoot({
      locals: {
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
      },
    }),
  ]
})
export class IllustrationModule { }
