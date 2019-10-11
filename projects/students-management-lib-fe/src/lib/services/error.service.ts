import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpError } from '../interfaces/http-error';
import { Router, NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  @Output() $event = new EventEmitter<any>();

  constructor(private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationError) {
        this.$event.emit(e);
      }
    });
  }

  /**
   * Parse error into the more manageable object HttpError.
   *
   * @param error from response of type
   * {
   *  error: {
   *    details: ["{code: 'CODE', message: 'MESSAGE'}" (string)]
   *  }
   * }
   */
  parse(error: any): any {
    const parsedError: HttpError = new HttpError();
    if (error.status) {
      parsedError.status = error.status;
    }

    const errorResponse: any = error.error;
    if (errorResponse && errorResponse.error && errorResponse.error.details) {
      let payload: any;
      try {
        payload = JSON.parse(errorResponse.error.details[0]);
      } catch (error) {
        payload = { message: errorResponse.error.details[0] };
      }
      if (payload.parameter) {
        parsedError.invalidParameter = payload.parameter;
      }
      parsedError.code = payload.code || payload.error;
      parsedError.message = payload.message || errorResponse.message;
      parsedError.internalId = errorResponse.error.details[1];
      return parsedError;
    }
    return error;
  }

  handleError(error) {
    console.log('Global error: ', error);
    this.$event.emit(error);
  }
}
