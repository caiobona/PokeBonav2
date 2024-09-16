import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {
  IgxButtonModule,
  IgxIconModule,
  IgxRippleModule,
  IgxButtonGroupModule
} from "igniteui-angular";
@Component({
  selector: 'app-init',
  standalone: true,
  imports: [  IgxButtonModule,
    IgxIconModule,
    IgxRippleModule,
    IgxButtonGroupModule],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent {
  constructor(private router: Router){

  }
  openMyDecks(){
    this.router.navigate(['/home/list']);
  }

  openNew() {
    this.router.navigate(['/home/create']);
  }
}
