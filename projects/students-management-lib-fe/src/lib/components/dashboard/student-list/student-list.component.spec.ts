import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { StudentListComponent } from './student-list.component';
import { StudentDataService } from '../../../services/student-data.service';
import { CustomMaterialModule } from '../../../modules/custom-material/custom-material.module';
import { Student } from '../../../interfaces/student';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

const noop = () => { /*empty function*/ };

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;
  let router: Router;
  let studentDataService: StudentDataService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ StudentListComponent, DeleteConfirmDialogComponent],
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
        {provide: 'libEnv', useValue: { baseUrl: ''}}

      ]
    })
      .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    studentDataService = TestBed.get(StudentDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do ngInit', () => {
    const getStudentsSpy = spyOn(studentDataService, 'getStudents');
    getStudentsSpy.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(getStudentsSpy).toHaveBeenCalled();
  });

  it('should show update', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.update(<Student>{});
    expect(navigateSpy).toHaveBeenCalled();
  });
});
