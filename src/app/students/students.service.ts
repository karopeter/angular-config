import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
   private students: Student[] = [];
   private studentsUpdated = new Subject<Student[]>();

   getStudents() {
     return [...this.students];
   }

   getStudentUpdateListener() {
     return this.studentsUpdated.asObservable();
   }

   addStudent(name: string, course: string) {
     const student: Student = {name: name, course: course };
     this.students.push(student);
     this.studentsUpdated.next([...this.students]);
   }
}