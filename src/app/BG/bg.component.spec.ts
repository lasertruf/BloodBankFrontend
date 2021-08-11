import { ComponentFixture, TestBed } from '@angular/core/testing';

import {BGComponent} from './bg.component'
describe('BGComponent', () => {
  let component: BGComponent;
  let fixture: ComponentFixture<BGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
