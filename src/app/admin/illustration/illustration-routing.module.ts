import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {ListComponent} from './list/list.component'
import {EditComponent} from './edit/edit.component'
import {NewComponent} from './new/new.component'

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'illustrations/:id/edit', component: EditComponent},
  {path: 'illustrations/new', component: NewComponent},
  {path: '**', component: ListComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IllustrationRoutingModule { }
