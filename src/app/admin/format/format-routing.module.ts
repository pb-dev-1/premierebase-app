import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {ListComponent} from './list/list.component'
import {EditComponent} from './edit/edit.component'
import {NewComponent} from './new/new.component'

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'new',
    component: NewComponent
  },
  {
    path: ':id/edit',
    component: EditComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatRoutingModule { }
