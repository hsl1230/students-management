import { FaqComponent } from './faq/faq.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CustomMaterialModule } from '../../custom-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MycaseDataService} from '../../services/mycase-data.service';
import { WindowService } from '../../services/window.service';
import { Router } from '@angular/router';
import {of} from 'rxjs';
import { CaseResponse } from '../../interfaces/case-response';
import { CallUsComponent } from './callus/callus.component';
import { MaskComponent } from '../../shared/mask/mask.component';


const noop = () => { /*empty function*/ };

function mockWindowService() {
  const service: any = {
    getWindow: noop
  };

  spyOn(service, 'getWindow').and.returnValue(window);
  return service;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let windowService: any;
  let router: Router;
  let mycaseDataService: MycaseDataService;

  beforeEach(async(() => {
    windowService = mockWindowService();

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, FaqComponent, CallUsComponent, MaskComponent],
      imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        CustomMaterialModule
      ],
      providers: [
        {provide: WindowService, useValue: windowService},
        {provide: 'libEnv', useValue: { baseUrl: '', faqsPath: './assets/data/faqs.json', callUsPath: './assets/data/call-us.json'}}

      ]
    })
      .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.showLoader = false;
    fixture.detectChanges();
    mycaseDataService = TestBed.get(MycaseDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do ngInit', () => {
    const getMyCasesSpy = spyOn(mycaseDataService, 'getMycases');
    getMyCasesSpy.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(getMyCasesSpy).toHaveBeenCalled();
  });

  it('should window.innerWidth < 480', () => {
    windowService.getWindow.and.returnValue({ innerWidth: 400 });
    component.getScreenSize();
    expect(component.displayedColumns.length).toBe(3);
  });

  it('should show details', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.showDetails(<CaseResponse>{});
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should show create a case page', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.createCase();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
