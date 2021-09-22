import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
   private students: Student[] = [];
   private studentsUpdated = new Subject<Student[]>();

   constructor(private http: HttpClient) {}

   getStudents() {
     this.http.get<{message: string, students: any}>('http://localhost:5000/api/v1/students').pipe(map((studentData) => {
         return studentData.students.map((student: any) => {
           return {
             name: student.name,
             course: student.course,
             id: student._id
           };
         })
     })).subscribe((transformedStudents) => {
         this.students = transformedStudents;
         this.studentsUpdated.next([...this.students]);
     });
   }

   getStudentUpdateListener() {
     return this.studentsUpdated.asObservable();
   }

   addStudent(id: string, name: string, course: string) {
     const student: Student = {id: id, name: name, course: course };
     this.http.post<{message: string, studentId: string}>('http://localhost:5000/api/v1/students', student).subscribe((responseData) => {
       const id = responseData.studentId;
       student.id = id;
       this.students.push(student);
       this.studentsUpdated.next([...this.students]);
     });
   }

   deleteStudent(studentId: string): void {
      this.http.delete('http://localhost:5000/api/v1/students/' + studentId).subscribe(() => {
        const updatedStudents = this.students.filter(student => student.id !== studentId);
        this.students = updatedStudents;
        this.studentsUpdated.next([...this.students]);
      });
   }
}