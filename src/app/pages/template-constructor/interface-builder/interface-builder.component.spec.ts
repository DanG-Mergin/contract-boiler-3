import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceBuilderComponent } from './interface-builder.component';

describe('InterfaceBuilderComponent', () => {
  let component: InterfaceBuilderComponent;
  let fixture: ComponentFixture<InterfaceBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
