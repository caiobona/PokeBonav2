import {ChangeDetectorRef, Component, signal, ViewChild, WritableSignal} from '@angular/core';
import { Router } from '@angular/router';
import { CartasService } from '../../core/cartas.service';
import {FormsModule, NgForm} from '@angular/forms';

import Swal from 'sweetalert2';

import {
  IgxButtonGroupModule,
  IgxButtonModule,
  IgxCardModule, IgxCircularProgressBarComponent,
  IgxIconModule,
  IgxInputGroupModule,
  IgxLinearProgressBarComponent,
  IgxPaginatorComponent,
  IgxPaginatorModule, IgxProgressBarModule,
  IgxRippleModule
} from 'igniteui-angular';
import { NgFor } from '@angular/common';
import {Carta} from "../../core/model/carta";
import {NgHttpLoaderModule} from "ng-http-loader";
import {CriarBaralhoService} from "../../core/criar-baralho.service";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IgxPaginatorModule,
    IgxRippleModule,
    IgxButtonGroupModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule, NgFor, IgxInputGroupModule, FormsModule, NgHttpLoaderModule, IgxLinearProgressBarComponent, IgxLinearProgressBarComponent, IgxCircularProgressBarComponent,IgxProgressBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('paginator', { static: true }) public paginator!: IgxPaginatorComponent;
  @ViewChild(NgForm, { static: true })
  public registrationForm: NgForm | undefined;
  constructor(public buscarCartaService: CartasService,public criarBaralhoService:CriarBaralhoService, private router: Router, public cdr: ChangeDetectorRef) {

  }
  cartas: WritableSignal<any[]> = signal([]);
  paginatorOFF: WritableSignal<boolean> = signal(true);
  nameDeck: WritableSignal<string> = signal('');
  nomeCarta: WritableSignal<string> = signal('');
  spinner: WritableSignal<boolean> = signal(true);
  Carta: WritableSignal<any[]> = signal([]);
  contadorCards: WritableSignal<number> = signal(0);
  contadorPage = 1;

  ngOnInit() {
    this.paginatorOFF.set(false);
    this.buscarCartaService.getAll().subscribe((res) => {
      this.spinner.set(false);
      this.cartas.set(res.data);
    });

  }


  getCardByName(){
    this.spinner.set(false);
    if(this.nomeCarta() != "" && this.nomeCarta != undefined){
      this.paginatorOFF.set(false);
      this.buscarCartaService.getCardByName(this.nomeCarta()).subscribe((res)=>{
        this.spinner.set(false);
        this.cartas.set(res.data);
      })
    }else{
      this.buscarCartaService.getAll().subscribe((res)=>{
        this.paginatorOFF.set(false);
        this.spinner.set(false);
        this.cartas.set(res.data);
      })
    }
  }

  addCartas(card: any) {

    const cardWithSameName = this.Carta().filter(
      (c) => c.name === card.name
    );
    if (cardWithSameName.length <= 3) {
      this.Carta.set([...this.Carta(), card]);
      this.contadorCards.set(this.contadorCards() + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Você já atingiu o limite de 4 cartas com o mesmo nome neste Baralho!",
        timer: 1500,
        showConfirmButton: false,
      })
    }
  }


  createDeck() {
    console.log(this.Carta().length, this.nameDeck())
    if ((this.Carta().length >= 24 && this.Carta().length <= 60) && this.validateDeckName()) {
      let baralho: Carta = {
        name: this.nameDeck(),
        id: this.uuidv4(),
        cards: this.Carta()
      }
      this.criarBaralhoService.savebaralho(baralho)
      Swal.fire({
        icon: "success",
        title: "Baralho criado com sucesso!",
        showConfirmButton: true,
        confirmButtonColor: '#004a94',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['home/list']);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "O Baralho deve possuir um nome e ter de 24 á 60 cartas!",
        confirmButtonColor: '#004a94',
      });
    }
  }

  validateDeckName() {
    return (this.nameDeck() != "");
  }
  public navigateToFirstPage() {
    this.paginator.page = 0;
  }

  onNextPage() {
    this.spinner.set(true);
    this.contadorPage++
    this.buscarCartaService.getCardByPage(this.contadorPage).subscribe((res)=>{
      this.spinner.set(false);
      this.cartas.set(res.data);
    })
  }
  onBeforePage() {
    if(this.contadorPage === 1){

    }else{
      this.spinner.set(true);
      this.contadorPage--
      this.buscarCartaService.getCardByPage(this.contadorPage).subscribe((res)=>{
        this.spinner.set(false);
        this.cartas.set(res.data);

      })
    }
  }
  public voltar(){
    this.router.navigate([''])
  }
  public uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }
}

