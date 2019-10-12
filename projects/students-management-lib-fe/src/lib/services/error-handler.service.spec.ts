import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from './error.service';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: ErrorHandlerService = TestBed.get(ErrorHandlerService);
    expect(service).toBeTruthy();
  });

  it('handle error forward request to error service', () => {
    const service: ErrorHandlerService = TestBed.get(ErrorHandlerService);
    const errorService: ErrorService = TestBed.get(ErrorService);
    const handleSpy = spyOn(errorService, 'handleError');
    service.handleError({});
    expect(handleSpy).toHaveBeenCalled();
  });
});
