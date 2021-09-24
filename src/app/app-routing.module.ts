import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';

const routes: Routes = [
  { path: 'list', component: StudentListComponent },
  { path: 'create', component: StudentCreateComponent },
  { path: 'edit/:studentId', component: StudentCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
