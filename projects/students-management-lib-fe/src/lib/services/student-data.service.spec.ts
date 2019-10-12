import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { StudentDataService } from './student-data.service';

describe('StudentDataService', () => {
  let httpMock: HttpTestingController;
  let mycaseDataService: StudentDataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      StudentDataService,
      {provide: 'libEnv', useValue: { baseUrl: '/api/'}}
    ]
  }));

  beforeEach(inject([
      HttpTestingController,
      MycaseDataService
    ],
    (be: HttpTestingController,
     service: MycaseDataService) => {
      httpMock = be;
      mycaseDataService = service;
    }
  ));

  it('should be created', () => {
    const service: StudentDataService = TestBed.get(StudentDataService);
    expect(service).toBeTruthy();
  });

  it('getMessages(10001) should return messages ', () => {
    const responseBody: any = [
      {
        customerComment: true,
        body: 'This is my problem, ',
        commentTime: '2019-02-01 09:01'
      },
      {
        customerComment: true,
        body: 'seems like my prepaid card is not working!',
        commentTime: '2019-02-01 09:02'
      },
      {
        customerComment: false,
        body: 'Very sorry to hear that, we can definitly help you to figure out.',
        commentTime: '2019-02-01 09:06'
      }
    ];

    mycaseDataService.getMessages('10001').subscribe( (response: any) => {
      expect(response).toEqual(responseBody);
    });
    httpMock.expectOne('/api/cases/10001/messages').flush(responseBody, { status: 200, statusText: 'Ok' });
  });

  it('getMycases() should return cases ', () => {
    const responseBody: any = [
      {
        parentId: '344555',
        caseNumber: '10001',
        subject: 'Account-Balance',
        origin: 'Neteller',
        status: 'Closed',
        createdDate: '2016-02-01',
        messages: []
      },
      {
        parentId: '344555',
        caseNumber: '10002',
        subject: 'Payments-Failed transaction amount',
        origin: 'Neteller',
        status: 'Open',
        createdDate: '2016-02-01'
      },
      {
        parentId: '344555',
        caseNumber: '10003',
        subject: 'Card-Skrill card',
        origin: 'Neteller',
        createdDate: '2016-02-01'
      },
      {
        parentId: '344555',
        caseNumber: '10004',
        subject: 'Security-Password',
        origin: 'Neteller',
        createdDate: '2016-02-01'
      },
      {
        parentId: '344555',
        caseNumber: '10005',
        subject: 'Security-Password',
        origin: 'Neteller',
        createdDate: '2016-02-01'
      },
      {
        parentId: '344555',
        caseNumber: '10006',
        subject: 'Account-Balance',
        origin: 'Neteller',
        createdDate: '2016-02-01'
      }
    ];

    mycaseDataService.getMycases().subscribe((response: any) => {
      expect(response).toEqual(responseBody);
    });
    httpMock.expectOne('/api/cases').flush(responseBody, { status: 200, statusText: 'Ok' });
  });

  it('closeCase() should return an object', () => {
    mycaseDataService.closeCase('10001').subscribe( res => {
      expect(typeof res).toEqual('Closed');
    });
    httpMock.expectOne('/api/cases/10001/close').flush('Closed', { status: 200, statusText: 'Ok' });
  });


});
