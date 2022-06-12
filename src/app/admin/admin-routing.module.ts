import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
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
    path: 'newsletter',
    loadChildren: () => import('./newsletter/newsletter.module').then(m => m.NewsletterModule)
  },
  {
    path: 'promos',
    loadChildren: () => import('./promo/promo.module').then(m => m.PromoModule)
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
