import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorService } from 'students-management-lib-fe';

@Component({
  selector: 'students-management-element',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input()
  lang: string;

  @Output() appError: EventEmitter<any>;

  title = 'students-management-element';

  constructor(
    private translateService: TranslateService,
    private errorService: ErrorService
  ) {
    translateService.setDefaultLang('en');
    this.appError = errorService.$event;
  }

  ngOnInit(): void {
    if (this.lang) {
      this.translateService.use(this.lang);
    }
  }
}
