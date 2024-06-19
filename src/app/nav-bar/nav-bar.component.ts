import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/UsuarioService.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  
  nombreApellido :string = "";

  constructor(private usuarioService:UsuarioService){}
  ngOnInit(): void {
    this.nombreApellido = this.usuarioService.usuario.getNombre + " " + this.usuarioService.usuario.getApellido;
  }
  
}
