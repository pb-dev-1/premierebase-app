import {Component} from '@angular/core'
import {map, switchMap} from 'rxjs/operators'
import {ActivatedRoute, Router} from '@angular/router'
import {Observable} from 'rxjs'

import {Illustration} from '@resources/illustration/illustration.model'
import {IllustrationService} from '@resources/illustration/illustration.service'

@Component({
  selector: 'pb-illustration-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  illustrationId$ = this.route.params.pipe(map(param => param.id))
  illustration$: Observable<Illustration> = this.illustrationId$.pipe(switchMap(id => this.illustrationService.getIllustration(id)))

  constructor(
    private illustrationService: IllustrationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  updateIllustration(params: any) {
    this.illustrationService.update(params).subscribe(async (i) => {
      this.illustrationService.updateOrCreateObjectInList(i)
      await this.router.navigate(['admin', 'illustrations'])
    })
  }

}
