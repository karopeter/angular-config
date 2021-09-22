import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {
  enteredCourse = '';
  enteredName = '';

  constructor(public studentsService: StudentsService) { }

  ngOnInit(): void {
  }

  onAddStudent(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.studentsService.addStudent(form.value.id, form.value.name, form.value.course);
  }
}
