import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {IllustrationService} from '@resources/illustration/illustration.service'

@Component({
  selector: 'pb-illustration-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(
    private illustrationService: IllustrationService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  createIllustration(params) {
    this.illustrationService.create(params).subscribe(async (d) => {
      await this.router.navigate(['admin', 'illustrations'])
    })
  }
}
