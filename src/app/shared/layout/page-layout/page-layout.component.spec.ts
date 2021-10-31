import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import {PageLayoutComponent} from './page-layout.component'

describe('PageLayoutComponent', () => {
  let component: PageLayoutComponent
  let fixture: ComponentFixture<PageLayoutComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLayoutComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
