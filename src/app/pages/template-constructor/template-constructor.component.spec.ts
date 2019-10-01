import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateConstructorComponent } from './template-constructor.component';

describe('TemplateConstructorComponent', () => {
  let component: TemplateConstructorComponent;
  let fixture: ComponentFixture<TemplateConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
