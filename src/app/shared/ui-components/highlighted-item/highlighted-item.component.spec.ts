import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'

import {HighlightedItemComponent} from './highlighted-item.component'

describe('HighlightedItemComponent', () => {
  let component: HighlightedItemComponent
  let fixture: ComponentFixture<HighlightedItemComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightedItemComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightedItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
