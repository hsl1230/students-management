import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibConfig } from '../interfaces/lib-config';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  studentChanged: EventEmitter<string[]> = new EventEmitter();
  routingArgumentObject: any;

  constructor(
    private http: HttpClient,
    @Inject('libEnv') private config: LibConfig
  ) { }

  getStudents(status: string): Observable<any> {
    const requestUrl = this.config.baseUrl + 'students';
    return this.http.get(requestUrl, {
      // withCredentials: true,
      params: {'status': status}
    });
  }

  getStatuses(): Observable<any> {
    const requestUrl = this.config.baseUrl + 'statuses';
    return this.http.get(requestUrl, {
      // withCredentials: true
    });
  }

  changeStatus(id: number, status: string): Observable<any> {
    const requestUrl = this.config.baseUrl + 'students/' + id;
    return this.http.patch(requestUrl, {'status': status}, {
      // withCredentials: true
    });
  }

  updateStudent(student: Student): Observable<any> {
    if (!student.id) {
      return this.createStudent(student);
    }

    const requestUrl = this.config.baseUrl + 'students/' + student.id;
    return this.http.patch(requestUrl, student, {
      // withCredentials: true
    });
  }

  createStudent(student: Student): Observable<any> {
    const requestUrl = this.config.baseUrl + 'students';
    return this.http.post(requestUrl, student, {
      // withCredentials: true
    });
  }

  deleteStudent(id: number): Observable<any> {
    const requestUrl = this.config.baseUrl + 'students/' + id;
    console.error('changeStatus of ' + id + ' to ' + status)
    return this.http.delete(requestUrl, {
      // withCredentials: true
    });
  }

  publishStatusChangedFor(statuses: string[]) {
    this.studentChanged.emit(statuses);
  }
}
