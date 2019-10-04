import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaperGameComponent } from './saper-game.component';

describe('SaperGameComponent', () => {
  let component: SaperGameComponent;
  let fixture: ComponentFixture<SaperGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaperGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaperGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
