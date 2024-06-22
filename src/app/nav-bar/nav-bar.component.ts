import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/UsuarioService.service';
import { Usuario } from '../models/perfil/Usuario';

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
    let usuario:Usuario;
    this.usuarioService.buscarUsuario(localStorage.getItem("email")||"").subscribe({
      next:(response)=>{
        console.log(response);
        usuario = new Usuario(response.usuario.nombre, response.usuario.apellido, 
                              response.usuario.email, response.usuario.contrasenia, 
                              response.usuario.enabled);
        this.nombreApellido = usuario.getNombre + " " +usuario.getApellido;
      },
      error:(err)=>{
        console.log(err);
      }
    });
    
  }
  
}
