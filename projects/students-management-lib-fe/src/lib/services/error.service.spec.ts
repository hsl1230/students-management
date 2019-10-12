import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpError} from '../interfaces/http-error';

describe('ErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    expect(service).toBeTruthy();
  });

  it('should parse error', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    const error = {};
    const parsedError = service.parse(error);
    expect(parsedError).toBe(error);
  });

  it('should parse error return HttpError', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    const error = { error: { error: { details: [{}]}}, status: 404 };
    const parsedError = service.parse(error);
    expect(parsedError instanceof HttpError).toBeTruthy();
  });

  it('should parse error return HttpError with payload', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    const error = { error: { error: { details: [{parameter: 'item', message: ''}, 1]}}, status: 404 };
    const parsedError = service.parse(error);
    expect(parsedError instanceof HttpError).toBeTruthy();
  });

  it('should handle error emit event', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    const emitSpy = spyOn(service.$event, 'emit');
    service.handleError({});
    expect(emitSpy).toHaveBeenCalled();
  });
});
