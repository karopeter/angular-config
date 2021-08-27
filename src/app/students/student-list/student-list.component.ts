import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from '../student.model';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  //  students = [
  //    { name: 'First post', course: 'This is the first posts content'},
  //    { name: 'Second post', course: 'This is the second posts content'},
  //    { name: 'Third post', course: 'This is the third posts content'}
  //  ];
  students: Student[] = [];
  private studentsSub!: Subscription;


  constructor(public studentsService: StudentsService) {}

  ngOnInit(): void {
    this.students = this.studentsService.getStudents();
    this.studentsSub = this.studentsService.getStudentUpdateListener().subscribe((students: Student[]) => {
       this.students = students;
    });
  }

  ngOnDestroy(): void {
    this.studentsSub.unsubscribe();
  }
}
