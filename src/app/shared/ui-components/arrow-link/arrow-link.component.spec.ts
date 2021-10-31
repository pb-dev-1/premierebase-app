import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArrowLinkComponent } from './arrow-link.component';

describe('ArrowLinkComponent', () => {
  let component: ArrowLinkComponent;
  let fixture: ComponentFixture<ArrowLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
