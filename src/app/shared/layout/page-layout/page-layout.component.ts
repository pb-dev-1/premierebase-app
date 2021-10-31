import {Component, Input} from '@angular/core'

@Component({
  selector: 'pb-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent {
  @Input() color

  constructor() { }

}
