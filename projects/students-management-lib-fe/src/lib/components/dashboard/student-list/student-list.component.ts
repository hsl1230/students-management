import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Student } from '../../../interfaces/student';
import { Router } from '@angular/router';
import { StudentDataService } from '../../../services/student-data.service';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

const MINIMUM_DISPLAY_COLUMNS = ['name', 'symbol'];
const MAXIMUM_DISPLAY_COLUMNS = ['name', 'phoneNumber', 'symbol'];

@Component({
  selector: 'sm-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  @Input()
  status: string;

  students: Student[];
  displayedColumns: string[] = MAXIMUM_DISPLAY_COLUMNS;
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscription;

  private refresh() {
    this.studentData.getStudents(this.status).subscribe(data => {
      this.students = data;
      this.dataSource = new MatTableDataSource<Student>(this.students);
      this.dataSource.paginator = this.paginator;
    });
  }

  constructor(
    private studentData: StudentDataService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  delete(student: Student): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '350px',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentData.deleteStudent(student.id).subscribe(data => {
          this.studentData.publishStatusChangedFor([student.status]);
        });
      }
    });
  }

  ngOnInit() {
    this.refresh();
    this.getScreenSize();
    this.subscription = this.studentData.studentChanged.subscribe((statuses: string[]) => {
      if (statuses.indexOf(this.status) >= 0) {
        this.refresh();
      }
    });
  }

  update(student: Student): void {
    this.studentData.routingArgumentObject = student;
    this.router.navigate(['update', student]);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    if (window.innerWidth < 968 && window.innerWidth >= 768 || window.innerWidth < 480) {
      this.displayedColumns = MINIMUM_DISPLAY_COLUMNS;
    } else {
      this.displayedColumns = MAXIMUM_DISPLAY_COLUMNS;
    }
  }

  drop(event: CdkDragDrop<Student[]>) {
    if (event.previousContainer !== event.container) {
      const sourceRow = event.previousContainer.data[event.previousIndex];
      console.error(sourceRow.firstName);
      this.studentData.changeStatus(sourceRow.id, this.status).subscribe(data => {
        this.studentData.publishStatusChangedFor([sourceRow.status, this.status]);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
