import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import {PageAdminLayoutComponent} from './page-admin-layout.component'

describe('PageLayoutComponent', () => {
  let component: PageAdminLayoutComponent
  let fixture: ComponentFixture<PageAdminLayoutComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdminLayoutComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdminLayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
