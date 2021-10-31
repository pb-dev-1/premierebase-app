import {Component, Input} from '@angular/core'

import {Illustration} from '@resources/illustration/illustration.model'

@Component({
  selector: 'pb-highlighted-item',
  templateUrl: './highlighted-item.component.html',
  styleUrls: ['./highlighted-item.component.scss']
})
export class HighlightedItemComponent {
  @Input() public item: Illustration

  constructor() { }

}
