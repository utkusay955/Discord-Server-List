import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsModuleComponent } from './settings-module.component';
import { HttpClientModule } from '@angular/common/http';

describe('SettingsModuleComponent', () => {
  let component: SettingsModuleComponent;
  let fixture: ComponentFixture<SettingsModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsModuleComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});