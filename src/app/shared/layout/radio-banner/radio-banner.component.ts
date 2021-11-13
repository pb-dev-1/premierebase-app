import {Component} from '@angular/core'

import {environment} from '@env/environment'

@Component({
  selector: 'pb-radio-banner',
  templateUrl: './radio-banner.component.html',
  styleUrls: ['./radio-banner.component.scss']
})
export class RadioBannerComponent {

  constructor() { }

  openSpotify() {
    window.open(environment.spotify, "_blank");
  }

}
