import {Component, Input} from '@angular/core';
import { Cartas} from "../../model/carta";
import {IgxCardComponent, IgxCardMediaDirective} from "igniteui-angular";

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [
    IgxCardMediaDirective,
    IgxCardComponent
  ],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent {
  @Input() cartas!: Cartas;

}
