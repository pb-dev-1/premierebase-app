import {Component, Input, OnInit} from '@angular/core'
import {Illustration} from '@resources/illustration/illustration.model'

@Component({
  selector: 'pb-items-container',
  templateUrl: './items-container.component.html',
  styleUrls: ['./items-container.component.scss']
})
export class ItemsContainerComponent implements OnInit {
  @Input() public items: Illustration[]
  @Input() public perLine = 3

  itemSize: string

  constructor() { }

  ngOnInit() {
    this.itemSize = this.getItemSize()
  }

  getItemSize() {
    return 100 / this.perLine + '%'
  }

}
