import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { UserslistComponent } from './components/userslist/userslist.component';
import { UserviewComponent } from './components/userview/userview.component';

const routes: Routes = [
  {path:"",pathMatch:"full",redirectTo:"home"},
  {path:"home",component:UserslistComponent},
  {path:"newuser",component:FormComponent},
  {path:"user/:iduser",component:UserviewComponent},
  {path:"updateuser/:iduser",component:FormComponent},
  {path:"**",redirectTo:"home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }