import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import {By} from '@angular/platform-browser';
import { StudentUpdateComponent } from './student-update.component';
import { StudentDataService } from '../../services/student-data.service';
import { CustomMaterialModule } from '../../modules/custom-material/custom-material.module';

describe('StudentUpdateComponent', () => {
  let component: StudentUpdateComponent;
  let fixture: ComponentFixture<StudentUpdateComponent>;
  let studentDataService: StudentDataService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentUpdateComponent ],
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
    fixture = TestBed.createComponent(StudentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    studentDataService = TestBed.get(StudentDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update() should update student', () => {
    const pushCaseSpy = spyOn(studentDataService, 'updateStudent');
    pushCaseSpy.and.returnValue(of([]));
    component.update();
    fixture.detectChanges();
    expect(pushCaseSpy).toHaveBeenCalled();
  });

  it('onInit should call getStatus()', () => {
    const formSpy = spyOn(studentDataService, 'getStatuses');
    formSpy.and.returnValue(of([]));
    component.ngOnInit();
    expect(formSpy).toHaveBeenCalled();
  });
});
