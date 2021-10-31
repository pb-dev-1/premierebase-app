import {Component, Input} from '@angular/core'
import {NgxMasonryOptions} from 'ngx-masonry'

import {environment} from '@env/environment'

@Component({
  selector: 'pb-tumblr-grid',
  templateUrl: './tumblr-grid.component.html',
  styleUrls: ['./tumblr-grid.component.scss']
})
export class TumblrGridComponent {
  @Input() public images: string[]
  @Input() public options: NgxMasonryOptions
  
  env = environment

  constructor() { }

}
