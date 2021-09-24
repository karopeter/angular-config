import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentsService } from '../students.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {
  enteredCourse = '';
  enteredName = '';
  private mode = 'create';
  private studentId!: string;
  isLoading = false;
  student!: Student;

  constructor(public studentsService: StudentsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if (paramMap.has('studentId')) {
          this.mode = 'edit';
          this.studentId !== paramMap.get('studentId');
          this.isLoading = true;
           this.studentsService.getStudent(this.studentId).subscribe(studentData => {
             this.isLoading = false;
             this.student = {id: studentData._id, name: studentData.name, course: studentData.course };
           });
       } else{
         this.mode = 'create';
         this.studentId !== null;
       }
    });
  }

  onSaveStudent(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.studentsService.addStudent(form.value.id, form.value.name, form.value.course);
    } else {
      this.studentsService.updateStudent(this.studentId, form.value.name, form.value.course);
    }
    form.resetForm();
  }
}
