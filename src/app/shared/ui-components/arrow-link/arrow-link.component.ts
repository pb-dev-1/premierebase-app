import {Component, Input} from '@angular/core'

@Component({
  selector: 'pb-arrow-link',
  templateUrl: './arrow-link.component.html',
  styleUrls: ['./arrow-link.component.scss']
})
export class ArrowLinkComponent {
  @Input() public label: string
  @Input() public link: string

}
