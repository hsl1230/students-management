import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StudentDataService } from './student-data.service';

describe('StudentDataService', () => {
  let httpMock: HttpTestingController;
  let studentDataService: StudentDataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      StudentDataService,
      { provide: 'libEnv', useValue: { baseUrl: '/api/' } }
    ]
  }));

  beforeEach(inject([
    HttpTestingController,
    StudentDataService
  ],
    (be: HttpTestingController,
      service: StudentDataService) => {
      httpMock = be;
      studentDataService = service;
    }
  ));

  it('should be created', () => {
    const service: StudentDataService = TestBed.get(StudentDataService);
    expect(service).toBeTruthy();
  });

  it('getStudents(\'active\') should return active students ', () => {
    const responseBody: any = [
      { "id": 1, "firstName": "henry-0", "lastName": "huang", "phoneNumber": 12345678, "status": "active" },
      { "id": 2, "firstName": "henry-1", "lastName": "huang", "phoneNumber": 12345679, "status": "active" },
      { "id": 3, "firstName": "henry-2", "lastName": "huang", "phoneNumber": 12345680, "status": "active" },
      { "id": 4, "firstName": "henry-3", "lastName": "huang", "phoneNumber": 12345681, "status": "active" },
      { "id": 5, "firstName": "henry-4", "lastName": "huang", "phoneNumber": 12345682, "status": "active" },
      { "id": 6, "firstName": "henry-5", "lastName": "huang", "phoneNumber": 12345683, "status": "active" },
      { "id": 7, "firstName": "henry-6", "lastName": "huang", "phoneNumber": 12345684, "status": "active" },
      { "id": 8, "firstName": "henry-7", "lastName": "huang", "phoneNumber": 12345685, "status": "active" },
      { "id": 9, "firstName": "henry-8", "lastName": "huang", "phoneNumber": 12345686, "status": "active" }
    ];

    studentDataService.getStudents('active').subscribe((response: any) => {
      expect(response).toEqual(responseBody);
    });
    httpMock.expectOne('/api/students?status=active').flush(responseBody, { status: 200, statusText: 'Ok' });
  });

  it('getStatuses() should return all statuses', () => {
    const responseBody: any = [{"status":"active"},{"status":"delinquent"},{"status":"dropped"}];

    studentDataService.getStatuses().subscribe((response: any) => {
      expect(response).toEqual(responseBody);
    });
    httpMock.expectOne('/api/statuses').flush(responseBody, { status: 200, statusText: 'Ok' });
  });
});
