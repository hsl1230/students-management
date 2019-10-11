import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  /**
   * Global error handler is loaded very early.
   * @param injector the injector
   */
  constructor(private injector: Injector) { }

  private get errorService(): ErrorService {
    return this.injector.get(ErrorService);
  }

  handleError(error) {
    this.errorService.handleError(this.errorService.parse(error));
  }
}
