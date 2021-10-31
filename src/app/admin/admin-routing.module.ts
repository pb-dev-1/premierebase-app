import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./illustration/illustration.module').then(m => m.IllustrationModule)
  },
  {
    path: 'illustrations',
    loadChildren: () => import('./illustration/illustration.module').then(m => m.IllustrationModule)
  },
  {
    path: 'collections',
    loadChildren: () => import('./collection/collection.module').then(m => m.CollectionModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'formats',
    loadChildren: () => import('./format/format.module').then(m => m.FormatModule)
  },
  {
    path: 'themes',
    loadChildren: () => import('./theme/theme.module').then(m => m.ThemeModule)
  },
  {
    path: '*',
    loadChildren: () => import('./illustration/illustration.module').then(m => m.IllustrationModule)
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}