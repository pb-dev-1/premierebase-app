import {Component, Input} from '@angular/core'
import {Router} from '@angular/router'

import {AuthService} from '@resources/auth/auth.service'

@Component({
  selector: 'pb-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent {
  @Input() color = 'black'
  route = ''

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  navigate(route: string) {
    this.route = route
    this.router.navigate([`/${route}`])
  }
}
