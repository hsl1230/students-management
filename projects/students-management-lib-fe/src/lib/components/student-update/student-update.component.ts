import { Component, OnInit } from '@angular/core';
import { Student } from '../../interfaces/student';
import { StudentDataService } from '../../services/student-data.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'sm-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss']
})
export class StudentUpdateComponent implements OnInit {
  student: any;
  statuses: any[];

  constructor(
    private studentData: StudentDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.student = { ...this.studentData.routingArgumentObject };
    this.studentData.getStatuses().subscribe(data => {
      this.statuses = data;
    });
  }

  update() {
    this.studentData.updateStudent(this.student).subscribe(data => {
      this.router.navigate(['']);
    });
  }
}
