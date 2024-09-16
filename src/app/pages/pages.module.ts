import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import {NgHttpLoaderModule} from "ng-http-loader";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgHttpLoaderModule.forRoot(),
  ]
})
export class PagesModule { }
