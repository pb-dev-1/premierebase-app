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
    path: ':id/edit',
    component: EditComponent
  },
  {
    path: 'new',
    component: NewComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoRoutingModule { }
