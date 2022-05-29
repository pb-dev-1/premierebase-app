import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

import {Newsletter} from '@resources/newsletter/newsletter.model'
import {NewsletterService} from '@resources/newsletter/newsletter.service'

@Component({
  selector: 'pb-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  subscribers$: Observable<Newsletter[]> = this.newsletterService.subscribers$.pipe(
    tap(categories => {if (!categories) {this.newsletterService.getSubscribers()}})
  )
  displayedColumns: string[] = ['email', 'actions']

  constructor(private newsletterService: NewsletterService) {}

  unsubscribe(id: string) {
    this.newsletterService.unsub(id).subscribe(() => {
      this.newsletterService.deleteObjectInList(id)
    })
  }

}
