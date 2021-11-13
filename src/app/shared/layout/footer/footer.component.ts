import {Component} from '@angular/core'

import {environment} from '@env/environment'

@Component({
  selector: 'pb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  env = environment

  constructor() { }

}
