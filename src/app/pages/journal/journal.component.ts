import {Component, OnInit, ViewChild} from '@angular/core'
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry'

@Component({
  selector: 'pb-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent

  masonryOptions: NgxMasonryOptions = {
    gutter: 50,
    fitWidth: true,
  }

  masonryImages = [
    'assets/images/journal/9.png',
    'assets/images/journal/8.png',
    'assets/images/journal/6.png',
    'assets/images/journal/10.png',
    'assets/images/journal/14.png',
    'assets/images/journal/2.png',
    'assets/images/journal/12.png',
    'assets/images/journal/7.png',
    'assets/images/journal/4.png',
    'assets/images/journal/16.png',
    'assets/images/journal/1.png',
    'assets/images/journal/18.png',
    'assets/images/journal/17.png',
    'assets/images/journal/19.png',
    'assets/images/journal/5.png',
    'assets/images/journal/20.png',
    'assets/images/journal/22.png',
    'assets/images/journal/23.png',
    'assets/images/journal/21.png',
    'assets/images/journal/24.png',
  ]


  constructor() { }

  ngOnInit(): void { }

}
