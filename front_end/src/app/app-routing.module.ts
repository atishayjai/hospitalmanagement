import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DepartmentViewComponent} from './department-view/department-view.component';
import { HospitalViewComponent } from './hospital-view/hospital-view.component';
const routes: Routes = [
	{path:'', component:HospitalViewComponent},
	{path:'hospital', component:HospitalViewComponent},
	{path:'department/:id', component:DepartmentViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
