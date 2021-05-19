import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() menuSelecionado: string;

  // Por padrão, começa como 'empresas'
  @Output() menu: string = "empresas";

  constructor() { }

  ngOnInit(): void {
  }
}
