import { Component } from '@angular/core';
import { UsuarioService } from '../services/UsuarioService.service';
import { Router } from '@angular/router';


/**
 * Componente destinado a mostrar opciones en la parte izquierda de la pantalla y brindar funcionalidades.
 * Funcionalidad solo la de desloguarse porque no hay especificación de que deberian hacer las demás.
 * Utiliza el USuarioService y el Router
 */

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  
  constructor(private usuarioService:UsuarioService, private router:Router){}
  //Método para desloguear el usuario.
  logOut(){
    this.usuarioService.logout();
    this.router.navigate([""]);
  }

}
