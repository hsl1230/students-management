import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../../services/student-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private studentData: StudentDataService,
    private router: Router

  ) { }

  ngOnInit() {
  }

  createStudent() {
    const student = {};
    this.studentData.routingArgumentObject = student;
    this.router.navigate(['update', student]);
  }
}
