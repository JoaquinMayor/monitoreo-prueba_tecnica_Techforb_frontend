import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/UsuarioService.service';
import { Usuario } from '../models/perfil/Usuario';

/**
 * Componente que sirve para navegar en els sistema, actualiza el nombre de usuario de manera dinámica.
 * Los demás botones no tienen funcionalidad por no especificación ni solicitud de funcionamiento.
 * Utiliza el UsuarioService.
 */

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  //Variable que almacena el nombre completo del usuario logueado
  nombreApellido :string = "";

  constructor(private usuarioService:UsuarioService){}
  //Método que carga la información del usuario para poderlo mostrar de manera dinámica.
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
