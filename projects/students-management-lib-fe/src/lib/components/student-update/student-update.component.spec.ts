import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseComponent } from './new-case.component';
import {TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '../../custom-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MycaseDataService } from '../../services/mycase-data.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import {By} from '@angular/platform-browser';
import {MaskComponent} from '../../shared/mask/mask.component';

describe('NewCaseComponent', () => {
  let component: NewCaseComponent;
  let fixture: ComponentFixture<NewCaseComponent>;
  let myCaseDataService: MycaseDataService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCaseComponent, MaskComponent ],
      imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      providers: [
        { provide: 'libEnv', useValue: { baseUrl: '' } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    myCaseDataService = TestBed.get(MycaseDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pushCaseToList() should create new case', () => {
    const pushCaseSpy = spyOn(myCaseDataService, 'addCase');
    pushCaseSpy.and.returnValue(of([]));
    component.pushCaseToList();
    fixture.detectChanges();
    expect(pushCaseSpy).toHaveBeenCalled();
  });

  it('onInit should call getCategories()', () => {
    const newCaseSpy = spyOn(myCaseDataService, 'getCaseCategories');
    newCaseSpy.and.returnValue(of([]));
    component.ngOnInit();
    expect(newCaseSpy).toHaveBeenCalled();
  });

  it('onInit should call createForm()', () => {
    const formSpy = spyOn(component, 'createForm');
    component.ngOnInit();
    expect(formSpy).toHaveBeenCalled();
  });

  it('should update char count', () => {
    component.charCount = 4;
    fixture.detectChanges();
    const charCountLabel = fixture.debugElement.query(By.css('#charCounter'));
    expect(charCountLabel.nativeElement.textContent).toBe('4 / 2500');
  });

});
