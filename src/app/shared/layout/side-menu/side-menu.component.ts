import {Component, Input, OnChanges, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'pb-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnChanges {
  @Input() color = 'white'

  route = ''
  navs = [
    {route: 'shop', text: 'NAV.LEFT.SHOP'},
    {route: 'custom', text: 'NAV.LEFT.CUSTOM'},
    {route: 'brand', text: 'NAV.LEFT.BRAND'},
    {route: 'journal', text: 'NAV.LEFT.JOURNAL'},
    {route: 'contact', text: 'NAV.LEFT.CONTACT'},
  ]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {}

  ngOnChanges() {
    this.activatedRoute.url.subscribe(url => console.log(url))
  }

  navigate(route: string) {
    this.route = route
    this.router.navigate([`/${route}`])
  }
}
