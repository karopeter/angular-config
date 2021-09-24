import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
   private students: Student[] = [];
   private studentsUpdated = new Subject<Student[]>();

   constructor(private http: HttpClient, private router: Router) {}

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

   getStudent(id: string) {
     return this.http.get<{_id: string; name: string; course: string}>('http://localhost:5000/api/v1/students/' + id);
   }

   addStudent(id: string, name: string, course: string) {
     const student: Student = {id: id, name: name, course: course };
     this.http.post<{message: string, studentId: string}>('http://localhost:5000/api/v1/students', student).subscribe((responseData) => {
       const id = responseData.studentId;
       student.id = id;
       this.students.push(student);
       this.studentsUpdated.next([...this.students]);
       this.router.navigate(['/']);
     });
   }

   updateStudent(id: string, name: string, course: string){
     const student: Student = {id: id, name: name, course: course };
     this.http.put('http://localhost:5000/api/v1/students/' + id, student).subscribe(response => {
        const updatedStudents = [...this.students];
        const oldStudentIndex = updatedStudents.findIndex(s => s.id === student.id);
        updatedStudents[oldStudentIndex] = student;
        this.students = updatedStudents;
        this.studentsUpdated.next([...this.students]);
        this.router.navigate(['/']);
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