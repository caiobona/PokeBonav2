import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ListComponent} from "./list/list.component";
import {InitComponent} from "./init/init.component";

const routes: Routes = [
  {path: '', component: InitComponent},
  {path: 'create', component: HomeComponent},
  { path: 'list', component: ListComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
