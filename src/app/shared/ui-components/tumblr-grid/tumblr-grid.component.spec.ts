import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TumblrGridComponent} from './tumblr-grid.component'

describe('TumblrGridComponent', () => {
  let component: TumblrGridComponent
  let fixture: ComponentFixture<TumblrGridComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TumblrGridComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TumblrGridComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
