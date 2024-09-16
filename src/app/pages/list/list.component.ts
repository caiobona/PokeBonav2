import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';

import { NgFor } from '@angular/common';
import {
  IgxButtonModule,
  IgxCardModule,
  IgxExpansionPanelComponent,
  IgxExpansionPanelModule,
  IgxIconModule,
  IgxRippleModule,
  IgxSplitterComponent, IgxSplitterModule, SplitterType
} from 'igniteui-angular';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {Carta, Cartas} from "../../core/model/carta";
import {CartasService} from "../../core/cartas.service";
import {CriarBaralhoService} from "../../core/criar-baralho.service";
import {CartaComponent} from "../../core/components/carta/carta.component";
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgFor,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    IgxIconModule,
    IgxExpansionPanelModule,
    IgxSplitterComponent,
    IgxSplitterModule,
    CartaComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  listbaralho: Carta[] = [];

  totalCartas: number | undefined;
  types: Array<any> = [];
  public type = SplitterType.Horizontal;

  @ViewChild(IgxExpansionPanelComponent, { read: IgxExpansionPanelComponent, static: true })
  public panel: IgxExpansionPanelComponent | undefined;
  private id:any ;
  constructor(private router: Router, public criarBaralhoService: CriarBaralhoService) {
  }
  ngOnInit() {
    if (typeof window !== 'undefined') {
    this.getall();
    }
  }
  getall(){
    this.listbaralho =  this.criarBaralhoService.getAllbaralhos();
  }

  public filterTreinador(baralho: Cartas[]){
        const filtro = baralho.filter(item => item.supertype === "Trainer")
        return filtro?.length
  }
  public total(baralho: Cartas[]){
    return this.totalCartas = baralho?.length;
  }

  public tratarTypes(cartas:Cartas[]){
    cartas.map(carta => {
      this.types.push(carta.types);
    })
    const arrayRepted:any = []
    this.types.map((type, i) => {
      arrayRepted.push(type[0])
    })
    let arrUnique: any[];
    arrUnique = [...new Set(arrayRepted)];
    return arrUnique.length;
  }
  deleteBaralho(id: number){

    Swal.fire({
      title: "Deseja Deletar o Baralho?",
      text: "Deseja Deletar o Baralho?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim"
    }).then((result) => {
      if (result.isConfirmed) {
        this.criarBaralhoService.deleteBaralho(id)
        this.getall();
      }
    });
  }
  public voltar(){
    this.router.navigate(['/home/create'])
  }
}
