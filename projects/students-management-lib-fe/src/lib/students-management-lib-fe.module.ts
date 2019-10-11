import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentUpdateComponent } from './components/student-update/student-update.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { LibConfig } from './interfaces/lib-config';
import { ErrorHandlerService } from './services/error-handler.service';
import { CustomMaterialModule } from './modules/custom-material/custom-material.module';
import { RoutingModule } from './modules/routing/routing.module';
import { StudentListComponent } from './components/dashboard/student-list/student-list.component';
import { DeleteConfirmDialogComponent } from './components/dashboard/student-list/delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [DashboardComponent, StudentUpdateComponent, StudentListComponent, DeleteConfirmDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RoutingModule,
    TranslateModule.forChild(),
    CustomMaterialModule
  ],
  entryComponents: [
    DeleteConfirmDialogComponent
  ],
  exports: []
})
export class StudentsManagementLibFeModule {
  static forRoot(config: LibConfig): ModuleWithProviders {
    return {
      ngModule: StudentsManagementLibFeModule,
      providers: [
        {provide: 'libEnv', useValue: config},
        {
          provide: ErrorHandler,
          useClass: ErrorHandlerService
        }
      ]
    };
  }
}
