import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'

import {ItemsContainerComponent} from './items-container.component'

describe('ItemsContainerComponent', () => {
  let component: ItemsContainerComponent;
  let fixture: ComponentFixture<ItemsContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsContainerComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
